(function () {
    // Sample parameters data
    const availableParameters = [
        { id: 1, name: 'Kiểm tra chất lượng', price: 50000 },
        { id: 2, name: 'Phân tích thành phần', price: 75000 },
        { id: 3, name: 'Kiểm tra an toàn', price: 100000 },
        { id: 4, name: 'Chứng nhận xuất khẩu', price: 120000 },
        { id: 5, name: 'Kiểm tra vi sinh', price: 80000 },
        { id: 6, name: 'Phân tích dinh dưỡng', price: 90000 }
    ];

    let parameterCounter = 0;
    let parameters = [];

    // Cache DOM elements
    const domElements = {
        form: document.getElementById('servicePackageForm'),
        addParameterDesktop: document.getElementById('addParameterDesktop'),
        addParameterMobile: document.getElementById('addParameterMobile'),
        parametersTableBody: document.getElementById('parametersTableBody'),
        mobileParametersList: document.getElementById('mobileParametersList'),
        desktopDiscount: document.getElementById('desktopDiscount'),
        mobileDiscount: document.getElementById('mobileDiscount'),
        desktopTotalCost: document.getElementById('desktopTotalCost'),
        mobileTotalCost: document.getElementById('mobileTotalCost'),
        desktopFinalCost: document.getElementById('desktopFinalCost'),
        mobileFinalCost: document.getElementById('mobileFinalCost')
    };

    // Initialize
    function initializeServicePackageAdd() {
        console.log('Initializing Service Package Add page...');
        console.log('DOM Elements:', domElements);

        if (Object.values(domElements).some(el => !el)) {
            console.error('Missing required DOM elements:', domElements);
            return;
        }

        initializeFormValidation();
        initializeParameterManagement();
        initializeCostCalculation();
        initializeFieldSync();
        addParameter(); // Add first parameter by default
    }

    // Form validation
    function initializeFormValidation() {
        if (!domElements.form) {
            console.error('Form element not found');
            return;
        }
        const packageCodeInputs = domElements.form.querySelectorAll('input[name="packageCode"]');
        packageCodeInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
                const otherInput = input.id.includes('Desktop') ? domElements.form.querySelector('#packageCode') : domElements.form.querySelector('#packageCodeDesktop');
                if (otherInput) otherInput.value = this.value;
            });
        });

        // Fallback to attach submit event after DOM is fully injected
        const attachSubmitEvent = () => {
            if (domElements.form) {
                domElements.form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    console.log('Form submit triggered');
                    if (validateForm()) submitForm();
                });
            } else {
                console.warn('Form not found, retrying in 100ms');
                setTimeout(attachSubmitEvent, 100);
            }
        };
        attachSubmitEvent();
    }

    // Parameter management
    function initializeParameterManagement() {
        if (domElements.addParameterDesktop) {
            domElements.addParameterDesktop.addEventListener('click', () => {
                console.log('Clicked Add Parameter Desktop');
                addParameter();
            });
        }
        if (domElements.addParameterMobile) {
            domElements.addParameterMobile.addEventListener('click', () => {
                console.log('Clicked Add Parameter Mobile');
                addParameter();
            });
        }
    }

    // Cost calculation
    function initializeCostCalculation() {
        [domElements.desktopDiscount, domElements.mobileDiscount].forEach(discountInput => {
            discountInput.addEventListener('input', function () {
                const otherDiscount = discountInput === domElements.desktopDiscount ? domElements.mobileDiscount : domElements.desktopDiscount;
                otherDiscount.value = this.value;
                calculateCosts();
            });
        });
    }

    // Field synchronization
    function initializeFieldSync() {
        const syncFields = [
            { mobile: 'packageName', desktop: 'packageNameDesktop' },
            { mobile: 'duration', desktop: 'durationDesktop' },
            { mobile: 'durationUnit', desktop: 'durationUnitDesktop' }
        ];

        syncFields.forEach(field => {
            const mobileInput = domElements.form.querySelector(`#${field.mobile}`);
            const desktopInput = domElements.form.querySelector(`#${field.desktop}`);
            if (mobileInput && desktopInput) {
                [mobileInput, desktopInput].forEach(input => {
                    input.addEventListener('input', () => {
                        const other = input === mobileInput ? desktopInput : mobileInput;
                        other.value = input.value;
                    });
                    input.addEventListener('change', () => {
                        const other = input === mobileInput ? desktopInput : mobileInput;
                        other.value = input.value;
                    });
                });
            }
        });
    }

    // Add parameter
    function addParameter() {
        parameterCounter++;
        const parameterId = `param_${parameterCounter}`;

        addParameterToTable(parameterId);
        addParameterToMobile(parameterId);

        parameters.push({
            id: parameterId,
            parameterId: null,
            quantity: 1,
            price: 0,
            total: 0
        });

        calculateCosts();
    }

    // Add parameter to desktop table
    function addParameterToTable(parameterId) {
        const rowIndex = domElements.parametersTableBody.children.length + 1;
        const row = document.createElement('tr');
        row.className = 'parameter-row new-row';
        row.dataset.parameterId = parameterId;

        row.innerHTML = `
            <td class="text-center">${rowIndex}</td>
            <td><select class="form-select parameter-select" name="parameter_${parameterId}" required><option value="">Chọn tham số</option>${availableParameters.map(param => `<option value="${param.id}" data-price="${param.price}">${param.name}</option>`).join('')}</select></td>
            <td><input type="text" class="form-control price-input" name="price_${parameterId}" readonly placeholder="0"></td>
            <td><input type="number" class="form-control quantity-input" name="quantity_${parameterId}" min="1" value="1" required></td>
            <td><input type="text" class="form-control total-input" name="total_${parameterId}" readonly placeholder="0"></td>
            <td class="text-center"><button type="button" class="btn-remove" onclick="window.servicePackageAdd.removeParameter('${parameterId}')"><i class="fas fa-trash"></i></button></td>
        `;

        domElements.parametersTableBody.appendChild(row);

        const parameterSelect = row.querySelector('.parameter-select');
        const quantityInput = row.querySelector('.quantity-input');

        parameterSelect.addEventListener('change', () => updateParameterPrice(parameterId, parameterSelect));
        quantityInput.addEventListener('input', () => {
            updateParameterTotal(parameterId);
            const mobileQuantity = domElements.mobileParametersList.querySelector(`[data-parameter-id="${parameterId}"] .quantity-input`);
            if (mobileQuantity) mobileQuantity.value = quantityInput.value;
        });

        setTimeout(() => row.classList.add('fade-highlight'), 100);
    }

    // Add parameter to mobile cards
    function addParameterToMobile(parameterId) {
        const cardIndex = domElements.mobileParametersList.children.length + 1;
        const card = document.createElement('div');
        card.className = 'parameter-card new-card';
        card.dataset.parameterId = parameterId;

        card.innerHTML = `
            <div class="card-header"><div class="card-title">Tham số ${cardIndex}</div><button type="button" class="remove-btn" onclick="window.servicePackageAdd.removeParameter('${parameterId}')"><i class="fas fa-times"></i></button></div>
            <div class="mb-3"><label class="form-label">Tham số <span class="text-danger">*</span></label><select class="form-select parameter-select" name="parameter_${parameterId}" required><option value="">Chọn tham số</option>${availableParameters.map(param => `<option value="${param.id}" data-price="${param.price}">${param.name}</option>`).join('')}</select></div>
            <div class="row mb-3"><div class="col-6"><label class="form-label">Đơn giá</label><input type="text" class="form-control price-input" name="price_${parameterId}" readonly placeholder="0"></div><div class="col-6"><label class="form-label">Số lượng</label><input type="number" class="form-control quantity-input" name="quantity_${parameterId}" min="1" value="1" required></div></div>
            <div class="mb-0"><label class="form-label">Thành tiền</label><input type="text" class="form-control total-input" name="total_${parameterId}" readonly placeholder="0"></div>
        `;

        domElements.mobileParametersList.appendChild(card);

        const parameterSelect = card.querySelector('.parameter-select');
        const quantityInput = card.querySelector('.quantity-input');

        parameterSelect.addEventListener('change', () => {
            updateParameterPrice(parameterId, parameterSelect);
            const desktopSelect = domElements.parametersTableBody.querySelector(`tr[data-parameter-id="${parameterId}"] .parameter-select`);
            if (desktopSelect) {
                desktopSelect.value = parameterSelect.value;
                updateParameterPrice(parameterId, desktopSelect);
            }
        });
        quantityInput.addEventListener('input', () => {
            updateParameterTotal(parameterId);
            const desktopQuantity = domElements.parametersTableBody.querySelector(`tr[data-parameter-id="${parameterId}"] .quantity-input`);
            if (desktopQuantity) desktopQuantity.value = quantityInput.value;
        });

        setTimeout(() => card.classList.add('fade-highlight'), 100);
    }

    // Update parameter price
    function updateParameterPrice(parameterId, selectElement) {
        const selectedOption = selectElement.selectedOptions[0];
        const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
        document.querySelectorAll(`input[name="price_${parameterId}"]`).forEach(input => input.value = price > 0 ? formatCurrency(price) : '');

        const paramIndex = parameters.findIndex(p => p.id === parameterId);
        if (paramIndex !== -1) {
            parameters[paramIndex].parameterId = selectedOption ? selectedOption.value : null;
            parameters[paramIndex].price = price;
        }

        updateParameterTotal(parameterId);
    }

    // Update parameter total
    function updateParameterTotal(parameterId) {
        const quantity = parseInt(document.querySelector(`input[name="quantity_${parameterId}"]`)?.value) || 1;
        const paramIndex = parameters.findIndex(p => p.id === parameterId);
        if (paramIndex !== -1) {
            const price = parameters[paramIndex].price;
            const total = price * quantity;
            parameters[paramIndex].quantity = quantity;
            parameters[paramIndex].total = total;
            document.querySelectorAll(`input[name="total_${parameterId}"]`).forEach(input => input.value = total > 0 ? formatCurrency(total) : '');
        }
        calculateCosts();
    }

    // Remove parameter
    function removeParameter(parameterId) {
        console.log('Removing parameter:', parameterId);
        const desktopRow = domElements.parametersTableBody.querySelector(`tr[data-parameter-id="${parameterId}"]`);
        if (desktopRow) {
            desktopRow.remove();
            updateTableRowNumbers();
        }
        const mobileCard = domElements.mobileParametersList.querySelector(`div[data-parameter-id="${parameterId}"]`);
        if (mobileCard) {
            mobileCard.remove();
            updateMobileCardNumbers();
        }
        parameters = parameters.filter(p => p.id !== parameterId);
        calculateCosts();
    }

    // Update table row numbers
    function updateTableRowNumbers() {
        const rows = domElements.parametersTableBody.querySelectorAll('.parameter-row');
        rows.forEach((row, index) => row.querySelector('td:first-child').textContent = index + 1);
    }

    // Update mobile card numbers
    function updateMobileCardNumbers() {
        const cards = domElements.mobileParametersList.querySelectorAll('.parameter-card');
        cards.forEach((card, index) => card.querySelector('.card-title').textContent = `Tham số ${index + 1}`);
    }

    // Calculate costs
    function calculateCosts() {
        const totalCost = parameters.reduce((sum, param) => sum + param.total, 0);
        const discount = parseInt(domElements.desktopDiscount.value) || 0;
        const finalCost = Math.max(0, totalCost - discount);
        [domElements.desktopTotalCost, domElements.mobileTotalCost].forEach(el => el.textContent = formatCurrency(totalCost));
        [domElements.desktopFinalCost, domElements.mobileFinalCost].forEach(el => el.textContent = formatCurrency(finalCost));
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount);
    }

    // Validate form
    function validateForm() {
        const packageName = domElements.form.querySelector('#packageName').value.trim();
        const packageCode = domElements.form.querySelector('#packageCode').value.trim();
        const duration = domElements.form.querySelector('#duration').value;
        const durationUnit = domElements.form.querySelector('#durationUnit').value;

        if (!packageName || !packageCode || !duration || !durationUnit) {
            console.log('Validation failed: Missing required fields');
            return false;
        }

        if (parameters.length === 0) {
            console.log('Validation failed: No parameters added');
            return false;
        }

        const unselectedParams = parameters.filter(p => !p.parameterId);
        if (unselectedParams.length > 0) {
            console.log('Validation failed: Unselected parameters');
            return false;
        }

        domElements.form.classList.add('was-validated');
        return true;
    }

    // Submit form
    function submitForm() {
        const formData = {
            packageName: domElements.form.querySelector('#packageName').value.trim(),
            packageCode: domElements.form.querySelector('#packageCode').value.trim(),
            duration: parseInt(domElements.form.querySelector('#duration').value),
            durationUnit: domElements.form.querySelector('#durationUnit').value,
            parameters: parameters.filter(p => p.parameterId),
            discount: parseInt(domElements.desktopDiscount.value) || 0,
            totalCost: parameters.reduce((sum, param) => sum + param.total, 0),
            finalCost: Math.max(0, parameters.reduce((sum, param) => sum + param.total, 0) - (parseInt(domElements.desktopDiscount.value) || 0))
        };

        console.log('Form data to submit:', formData);

        const submitBtn = domElements.form.querySelector('button[type="submit"]');
        if (!submitBtn) {
            console.error('Submit button not found');
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            if (Math.random() > 0.2) { // 80% chance of success
                console.log('Submission successful');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                window.adminLayout.loadContent('service-packages');
            } else {
                console.error('Submission failed: Simulated server error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 2000);
    }

    // Export initialization function and removeParameter
    window.servicePackageAdd = {
        init: function () {
            console.log('Service Package Add page initialized via admin.js');
            initializeServicePackageAdd();
        },
        removeParameter: removeParameter
    };

    // Auto-initialize when DOM is ready or content is loaded
    function autoInit() {
        if (domElements.form) {
            window.servicePackageAdd.init();
        } else {
            console.warn('Form not found, retrying in 100ms');
            setTimeout(autoInit, 100);
        }
    }
    autoInit();

    // Listen to contentLoaded event as fallback
    document.addEventListener('contentLoaded', (e) => {
        console.log('contentLoaded event received:', e.detail);
        if (e.detail?.contentId === 'add-service-package') {
            autoInit();
        }
    });
})();