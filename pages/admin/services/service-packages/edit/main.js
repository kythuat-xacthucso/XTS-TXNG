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

    // Fake data for edit page (pre-filled)
    const editServicePackages = [
        {
            id: 1,
            name: 'Gói Cơ bản',
            code: 'BASIC001',
            duration: '12 tháng',
            parameterId: 1,
            quantity: 2,
            discount: 50000,
            status: 'active',
            createdBy: 'Admin1',
            createdAt: '2025-07-01 10:00'
        },
        {
            id: 2,
            name: 'Gói Nâng cao',
            code: 'ADV001',
            duration: '12 tháng',
            parameterId: 3,
            quantity: 3,
            discount: 100000,
            status: 'locked',
            createdBy: 'Admin2',
            createdAt: '2025-07-02 14:30'
        }
    ];

    // Cache DOM elements
    const domElements = {
        form: document.getElementById('servicePackageForm'),
        parameter: document.getElementById('parameter'),
        parameterDesktop: document.getElementById('parameterDesktop'),
        price: document.getElementById('price'),
        priceDesktop: document.getElementById('priceDesktop'),
        quantity: document.getElementById('quantity'),
        quantityDesktop: document.getElementById('quantityDesktop'),
        total: document.getElementById('total'),
        totalDesktop: document.getElementById('totalDesktop'),
        mobileDiscount: document.getElementById('mobileDiscount'),
        desktopDiscount: document.getElementById('desktopDiscount'),
        mobileFinalCost: document.getElementById('mobileFinalCost'),
        desktopFinalCost: document.getElementById('desktopFinalCost'),
        packageName: document.getElementById('packageName'),
        packageNameDesktop: document.getElementById('packageNameDesktop'),
        packageCode: document.getElementById('packageCode'),
        packageCodeDesktop: document.getElementById('packageCodeDesktop'),
        duration: document.getElementById('duration'),
        durationDesktop: document.getElementById('durationDesktop'),
        statusActive: document.getElementById('statusActive'),
        statusLocked: document.getElementById('statusLocked'),
        statusActiveDesktop: document.getElementById('statusActiveDesktop'),
        statusLockedDesktop: document.getElementById('statusLockedDesktop'),
        createdBy: document.getElementById('createdBy'),
        createdByDesktop: document.getElementById('createdByDesktop'),
        createdAt: document.getElementById('createdAt'),
        createdAtDesktop: document.getElementById('createdAtDesktop')
    };

    // Initialize
    function initializeServicePackageEdit() {
        console.log('Initializing Service Package Edit page...');
        if (Object.values(domElements).some(el => !el)) {
            console.error('Missing required DOM elements:', domElements);
            return;
        }

        const pkg = editServicePackages[0]; // Default to first package
        if (!pkg) {
            showError('Không có gói dịch vụ nào để chỉnh sửa');
            return;
        }

        populateForm(pkg);
        populateParameterOptions();
        initializeFormValidation();
        initializeFieldSync();
        initializeCostCalculation();
    }

    // Populate parameter options and preselect
    function populateParameterOptions() {
        const optionHTML = `<option value="">Chọn tham số</option>` +
            availableParameters.map(param => `<option value="${param.id}" data-price="${param.price}">${param.name}</option>`).join('');
        domElements.parameter.innerHTML = optionHTML;
        domElements.parameterDesktop.innerHTML = optionHTML;

        // Preselect parameter based on package data
        if (domElements.parameter && domElements.parameterDesktop) {
            domElements.parameter.value = editServicePackages[0].parameterId || '';
            domElements.parameterDesktop.value = editServicePackages[0].parameterId || '';
            updatePrice();
            calculateCosts();
        }
    }

    // Populate form fields with pre-filled data
    function populateForm({ name, code, duration, parameterId, quantity, discount, status, createdBy, createdAt }) {
        const fields = {
            packageName: name,
            packageCode: code,
            duration: duration,
            quantity: quantity,
            mobileDiscount: discount,
            packageNameDesktop: name,
            packageCodeDesktop: code,
            durationDesktop: duration,
            quantityDesktop: quantity,
            desktopDiscount: discount,
            createdBy: createdBy,
            createdAt: createdAt,
            createdByDesktop: createdBy,
            createdAtDesktop: createdAt
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = domElements[id];
            if (element) element.value = value || '';
        });

        // Set status radiobox
        if (status === 'active') {
            domElements.statusActive.checked = true;
            domElements.statusActiveDesktop.checked = true;
        } else {
            domElements.statusLocked.checked = true;
            domElements.statusLockedDesktop.checked = true;
        }
    }

    // Form validation
    function initializeFormValidation() {
        const packageCodeInputs = domElements.form.querySelectorAll('input[name="packageCode"]');
        packageCodeInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
                const otherInput = input.id.includes('Desktop') ? domElements.packageCode : domElements.packageCodeDesktop;
                if (otherInput) otherInput.value = this.value;
            });
        });

        domElements.form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm()) submitForm();
        });
    }

    // Field synchronization
    function initializeFieldSync() {
        const syncFields = [
            { mobile: 'packageName', desktop: 'packageNameDesktop' },
            { mobile: 'parameter', desktop: 'parameterDesktop' },
            { mobile: 'quantity', desktop: 'quantityDesktop' },
            { mobile: 'mobileDiscount', desktop: 'desktopDiscount' },
            { mobile: 'statusActive', desktop: 'statusActiveDesktop' },
            { mobile: 'statusLocked', desktop: 'statusLockedDesktop' }
        ];

        syncFields.forEach(field => {
            const mobileInput = domElements[field.mobile];
            const desktopInput = domElements[field.desktop];
            if (mobileInput && desktopInput) {
                [mobileInput, desktopInput].forEach(input => {
                    input.addEventListener('input', () => {
                        const other = input === mobileInput ? desktopInput : mobileInput;
                        other.checked = input.checked; // For radiobox
                        other.value = input.value; // For other inputs
                        if (field.mobile === 'parameter') updatePrice();
                        if (field.mobile === 'quantity' || field.mobile === 'mobileDiscount') calculateCosts();
                    });
                    input.addEventListener('change', () => {
                        const other = input === mobileInput ? desktopInput : mobileInput;
                        other.checked = input.checked; // For radiobox
                        other.value = input.value; // For other inputs
                        if (field.mobile === 'parameter') updatePrice();
                        if (field.mobile === 'quantity' || field.mobile === 'mobileDiscount') calculateCosts();
                    });
                });
            }
        });
    }

    // Cost calculation
    function initializeCostCalculation() {
        [domElements.quantity, domElements.quantityDesktop].forEach(input => {
            input.addEventListener('input', calculateCosts);
        });
        [domElements.parameter, domElements.parameterDesktop].forEach(select => {
            select.addEventListener('change', () => {
                updatePrice();
                calculateCosts();
            });
        });
        [domElements.mobileDiscount, domElements.desktopDiscount].forEach(input => {
            input.addEventListener('input', calculateCosts);
        });
    }

    // Update price based on selected parameter
    function updatePrice() {
        const selectedOption = domElements.parameter.selectedOptions[0];
        const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
        [domElements.price, domElements.priceDesktop].forEach(input => {
            input.value = price > 0 ? formatCurrency(price) + ' VNĐ' : '';
        });
    }

    // Calculate costs
    function calculateCosts() {
        const selectedOption = domElements.parameter.selectedOptions[0];
        const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
        const quantity = parseInt(domElements.quantity.value) || 1;
        const total = price * quantity;
        const discount = parseInt(domElements.mobileDiscount.value) || 0;
        const finalCost = Math.max(0, total - discount);

        [domElements.total, domElements.totalDesktop].forEach(input => {
            input.value = total > 0 ? formatCurrency(total) + ' VNĐ' : '';
        });
        [domElements.mobileFinalCost, domElements.desktopFinalCost].forEach(input => {
            input.value = finalCost > 0 ? formatCurrency(finalCost) + ' VNĐ' : '';
        });
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount);
    }

    // Validate form
    function validateForm() {
        const packageName = domElements.packageName.value.trim();
        const packageCode = domElements.packageCode.value.trim();
        const parameter = domElements.parameter.value;
        const status = domElements.form.querySelector('input[name="status"]:checked');

        if (!packageName || !packageCode || !parameter || !status) {
            console.log('Validation failed: Missing required fields');
            domElements.form.classList.add('was-validated');
            return false;
        }

        if (parseInt(domElements.quantity.value) < 1) {
            console.log('Validation failed: Invalid quantity');
            domElements.form.classList.add('was-validated');
            return false;
        }

        return true;
    }

    // Submit form
    function submitForm() {
        const formData = {
            packageName: domElements.packageName.value.trim(),
            packageCode: domElements.packageCode.value.trim(),
            duration: domElements.duration.value.trim(),
            parameterId: domElements.parameter.value,
            quantity: parseInt(domElements.quantity.value),
            price: parseInt(domElements.parameter.selectedOptions[0]?.dataset.price) || 0,
            total: parseInt(domElements.parameter.selectedOptions[0]?.dataset.price) * parseInt(domElements.quantity.value),
            discount: parseInt(domElements.mobileDiscount.value) || 0,
            finalCost: Math.max(0, (parseInt(domElements.parameter.selectedOptions[0]?.dataset.price) * parseInt(domElements.quantity.value)) - (parseInt(domElements.mobileDiscount.value) || 0)),
            status: domElements.form.querySelector('input[name="status"]:checked').value,
            createdBy: domElements.createdBy.value.trim(),
            createdAt: domElements.createdAt.value.trim()
        };

        console.log('Form data to submit:', formData);

        const submitBtn = domElements.form.querySelector('button[type="submit"]');
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

    // Export initialization function
    window.servicePackageEdit = {
        init: function () {
            console.log('Service Package Edit page initialized via admin.js');
            initializeServicePackageEdit();
        }
    };

    // Auto-initialize
    function autoInit() {
        if (domElements.form) {
            window.servicePackageEdit.init();
        } else {
            console.warn('Form not found, retrying in 100ms');
            setTimeout(autoInit, 100);
        }
    }
    autoInit();

    // Listen to contentLoaded event as fallback
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail?.contentId === 'edit-service-package') {
            autoInit();
        }
    });

    // Show error notification
    function showError(message) {
        window.adminLayout.showNotification(message, 'danger');
        setTimeout(() => window.adminLayout.loadContent('service-packages'), 2000);
    }
})();