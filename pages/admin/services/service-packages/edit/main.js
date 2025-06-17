(function () {
    // Fake data for edit page (scoped within IIFE)
    const editableServicePackages = [
        {
            id: 1,
            name: 'Gói Cơ bản',
            code: 'BASIC001',
            duration: 1,
            durationUnit: 'month',
            createdAt: '2025-06-01 10:00',
            createdBy: 'Admin1',
            status: 'active',
            parameters: [
                { id: 1, name: 'Kiểm tra chất lượng', price: 50000, quantity: 2 },
                { id: 2, name: 'Phân tích thành phần', price: 75000, quantity: 1 },
            ],
            discount: 50000,
        },
        {
            id: 2,
            name: 'Gói Nâng cao',
            code: 'ADV001',
            duration: 3,
            durationUnit: 'month',
            createdAt: '2025-06-02 14:30',
            createdBy: 'Admin2',
            status: 'locked',
            parameters: [{ id: 3, name: 'Kiểm tra an toàn', price: 100000, quantity: 3 }],
            discount: 100000,
        },
    ];

    const availableParameters = [
        { id: 1, name: 'Kiểm tra chất lượng', price: 50000 },
        { id: 2, name: 'Phân tích thành phần', price: 75000 },
        { id: 3, name: 'Kiểm tra an toàn', price: 100000 },
        { id: 4, name: 'Chứng nhận xuất xứ', price: 120000 },
        { id: 5, name: 'Kiểm tra vi sinh', price: 80000 },
        { id: 6, name: 'Phân tích dinh dưỡng', price: 90000 },
    ];

    let parameterCounter = 0;
    let parameters = [];

    // Initialize when content is loaded
    document.addEventListener('contentLoaded', ({ detail }) => {
        if (detail.contentId === 'edit-service-package') {
            console.log('Initializing edit-service-package');
            initializeEdit();
        }
    });

    // Main initialization function
    const initializeEdit = () => {
        const pkg = editableServicePackages[0]; // Default to first package

        if (!pkg) {
            showError('Không có gói dịch vụ nào để hiển thị');
            return;
        }

        populateForm(pkg);
        initializeFormValidation();
        initializeParameterManagement();
        initializeCostCalculation();
        initializeFieldSync();
        pkg.parameters.forEach(addParameter);
        calculateCosts();
    };

    // Populate form fields
    const populateForm = ({ name, code, duration, durationUnit, createdAt, createdBy, status, discount }) => {
        const fields = {
            packageName: name,
            packageCode: code,
            duration,
            durationUnit,
            createdAt,
            createdBy,
            status,
            mobileDiscount: discount,
            packageNameDesktop: name,
            packageCodeDesktop: code,
            durationDesktop: duration,
            durationUnitDesktop: durationUnit,
            createdAtDesktop: createdAt,
            createdByDesktop: createdBy,
            statusDesktop: status,
            desktopDiscount: discount,
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.value = value || '';
        });
    };

    // Initialize form validation
    const initializeFormValidation = () => {
        const form = document.getElementById('servicePackageForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) submitForm();
        });

        ['packageCode', 'packageCodeDesktop'].forEach((id) => {
            document.getElementById(id).addEventListener('input', function () {
                this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
                syncField(id, this.value);
            });
        });
    };

    // Initialize parameter management
    const initializeParameterManagement = () => {
        document.getElementById('addParameterDesktop').addEventListener('click', () => addParameter());
        document.getElementById('addParameterMobile').addEventListener('click', () => addParameter());
    };

    // Initialize cost calculation
    const initializeCostCalculation = () => {
        ['desktopDiscount', 'mobileDiscount'].forEach((id) => {
            document.getElementById(id).addEventListener('input', function () {
                syncField(id, this.value);
                calculateCosts();
            });
        });
    };

    // Sync fields between mobile and desktop
    const initializeFieldSync = () => {
        const fieldPairs = [
            ['packageName', 'packageNameDesktop'],
            ['packageCode', 'packageCodeDesktop'],
            ['duration', 'durationDesktop'],
            ['durationUnit', 'durationUnitDesktop'],
            ['status', 'statusDesktop'],
        ];

        fieldPairs.forEach(([mobileId, desktopId]) => {
            const mobileEl = document.getElementById(mobileId);
            const desktopEl = document.getElementById(desktopId);
            mobileEl.addEventListener('input', () => (desktopEl.value = mobileEl.value));
            desktopEl.addEventListener('input', () => (mobileEl.value = desktopEl.value));
        });
    };

    // Add parameter to desktop and mobile
    const addParameter = (existingParam = null) => {
        parameterCounter++;
        const parameterId = `param_${parameterCounter}`;
        addParameterToTable(parameterId, existingParam);
        addParameterToMobile(parameterId, existingParam);
        parameters.push({
            id: parameterId,
            parameterId: existingParam?.id || null,
            quantity: existingParam?.quantity || 1,
            price: existingParam?.price || 0,
            total: existingParam ? existingParam.price * existingParam.quantity : 0,
        });
        calculateCosts();
    };

    // Add parameter to desktop table
    const addParameterToTable = (parameterId, existingParam) => {
        const tableBody = document.getElementById('parametersTableBody');
        const rowIndex = tableBody.children.length + 1;
        const row = document.createElement('tr');
        row.className = 'parameter-row new-row';
        row.dataset.parameterId = parameterId;
        row.innerHTML = `
        <td class="text-center">${rowIndex}</td>
        <td>
          <select class="form-select parameter-select" name="parameter_${parameterId}" required>
            <option value="">Chọn tham số</option>
            ${availableParameters
                .map(
                    (param) =>
                        `<option value="${param.id}" data-price="${param.price}" ${existingParam && existingParam.id === param.id ? 'selected' : ''
                        }>${param.name}</option>`
                )
                .join('')}
          </select>
        </td>
        <td><input type="text" class="form-control price-input" name="price_${parameterId}" readonly value="${existingParam ? formatCurrency(existingParam.price) : ''
            }"></td>
        <td><input type="number" class="form-control quantity-input" name="quantity_${parameterId}" min="1" value="${existingParam ? existingParam.quantity : '1'
            }" required></td>
        <td><input type="text" class="form-control total-input" name="total_${parameterId}" readonly value="${existingParam ? formatCurrency(existingParam.price * existingParam.quantity) : ''
            }"></td>
        <td class="text-center">
          <button type="button" class="btn-remove" onclick="removeParameter('${parameterId}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
        tableBody.appendChild(row);

        row.querySelector('.parameter-select').addEventListener('change', (e) => updateParameterPrice(parameterId, e.target));
        row.querySelector('.quantity-input').addEventListener('input', (e) => {
            updateParameterTotal(parameterId);
            syncMobileQuantity(parameterId, e.target.value);
        });

        setTimeout(() => row.classList.add('fade-highlight'), 100);
    };

    // Add parameter to mobile cards
    const addParameterToMobile = (parameterId, existingParam) => {
        const mobileList = document.getElementById('mobileParametersList');
        const cardIndex = mobileList.children.length + 1;
        const card = document.createElement('div');
        card.className = 'parameter-card new-card';
        card.dataset.parameterId = parameterId;
        card.innerHTML = `
        <div class="card-header">
          <div class="card-title">Tham số ${cardIndex}</div>
          <button type="button" class="remove-btn" onclick="removeParameter('${parameterId}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mb-3">
          <label class="form-label">Tham số <span class="text-danger">*</span></label>
          <select class="form-select parameter-select" name="parameter_${parameterId}" required>
            <option value="">Chọn tham số</option>
            ${availableParameters
                .map(
                    (param) =>
                        `<option value="${param.id}" data-price="${param.price}" ${existingParam && existingParam.id === param.id ? 'selected' : ''
                        }>${param.name}</option>`
                )
                .join('')}
          </select>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <label class="form-label">Đơn giá</label>
            <input type="text" class="form-control price-input" name="price_${parameterId}" readonly value="${existingParam ? formatCurrency(existingParam.price) : ''
            }">
          </div>
          <div class="col-6">
            <label class="form-label">Số lượng</label>
            <input type="number" class="form-control quantity-input" name="quantity_${parameterId}" min="1" value="${existingParam ? existingParam.quantity : '1'
            }" required>
          </div>
        </div>
        <div class="mb-0">
          <label class="form-label">Thành tiền</label>
          <input type="text" class="form-control total-input" name="total_${parameterId}" readonly value="${existingParam ? formatCurrency(existingParam.price * existingParam.quantity) : ''
            }">
        </div>
      `;
        mobileList.appendChild(card);

        card.querySelector('.parameter-select').addEventListener('change', (e) => {
            updateParameterPrice(parameterId, e.target);
            syncDesktopSelect(parameterId, e.target.value);
        });
        card.querySelector('.quantity-input').addEventListener('input', (e) => {
            updateParameterTotal(parameterId);
            syncDesktopQuantity(parameterId, e.target.value);
        });

        setTimeout(() => card.classList.add('fade-highlight'), 100);
    };

    // Update parameter price
    const updateParameterPrice = (parameterId, selectElement) => {
        const price = parseInt(selectElement.selectedOptions[0]?.dataset.price) || 0;
        document
            .querySelectorAll(`input[name="price_${parameterId}"]`)
            .forEach((input) => (input.value = price ? formatCurrency(price) : ''));
        const param = parameters.find((p) => p.id === parameterId);
        if (param) {
            param.parameterId = selectElement.value || null;
            param.price = price;
        }
        updateParameterTotal(parameterId);
    };

    // Update parameter total
    const updateParameterTotal = (parameterId) => {
        const quantity = parseInt(document.querySelector(`input[name="quantity_${parameterId}"]`)?.value) || 1;
        const param = parameters.find((p) => p.id === parameterId);
        if (param) {
            const total = param.price * quantity;
            param.quantity = quantity;
            param.total = total;
            document
                .querySelectorAll(`input[name="total_${parameterId}"]`)
                .forEach((input) => (input.value = total ? formatCurrency(total) : ''));
        }
        calculateCosts();
    };

    // Remove parameter
    const removeParameter = (parameterId) => {
        document.querySelector(`tr[data-parameter-id="${parameterId}"]`)?.remove();
        document.querySelector(`div[data-parameter-id="${parameterId}"]`)?.remove();
        parameters = parameters.filter((p) => p.id !== parameterId);
        updateTableRowNumbers();
        updateMobileCardNumbers();
        calculateCosts();
    };

    // Update table row numbers
    const updateTableRowNumbers = () => {
        document
            .querySelectorAll('#parametersTableBody .parameter-row')
            .forEach((row, index) => (row.querySelector('td:first-child').textContent = index + 1));
    };

    // Update mobile card numbers
    const updateMobileCardNumbers = () => {
        document
            .querySelectorAll('.parameter-card')
            .forEach((card, index) => (card.querySelector('.card-title').textContent = `Tham số ${index + 1}`));
    };

    // Calculate costs
    const calculateCosts = () => {
        const totalCost = parameters.reduce((sum, param) => sum + param.total, 0);
        const discount = parseInt(document.getElementById('desktopDiscount').value) || 0;
        const finalCost = Math.max(0, totalCost - discount);

        ['desktopTotalCost', 'mobileTotalCost'].forEach(
            (id) => (document.getElementById(id).textContent = formatCurrency(totalCost))
        );
        ['desktopFinalCost', 'mobileFinalCost'].forEach(
            (id) => (document.getElementById(id).textContent = formatCurrency(finalCost))
        );
    };

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount);

    // Validate form
    const validateForm = () => {
        const form = document.getElementById('servicePackageForm');
        const fields = ['packageName', 'packageCode', 'duration', 'durationUnit', 'status'];
        for (const id of fields) {
            if (!document.getElementById(id).value.trim()) {
                showError(`Vui lòng nhập ${document.querySelector(`label[for="${id}"]`).textContent}`);
                return false;
            }
        }
        if (parameters.length === 0) {
            showError('Vui lòng thêm ít nhất một tham số');
            return false;
        }
        if (parameters.some((p) => !p.parameterId)) {
            showError('Vui lòng chọn tham số cho tất cả các dòng');
            return false;
        }
        form.classList.add('was-validated');
        return true;
    };

    // Submit form
    const submitForm = () => {
        const formData = {
            id: editableServicePackages[0].id, // Use the default package ID
            packageName: document.getElementById('packageName').value.trim(),
            packageCode: document.getElementById('packageCode').value.trim(),
            duration: parseInt(document.getElementById('duration').value),
            durationUnit: document.getElementById('durationUnit').value,
            createdAt: document.getElementById('createdAt').value,
            createdBy: document.getElementById('createdBy').value,
            status: document.getElementById('status').value,
            parameters: parameters
                .filter((p) => p.parameterId)
                .map((p) => ({
                    id: parseInt(p.parameterId),
                    name: availableParameters.find((ap) => ap.id === parseInt(p.parameterId)).name,
                    price: p.price,
                    quantity: p.quantity,
                })),
            discount: parseInt(document.getElementById('desktopDiscount').value) || 0,
            totalCost: parameters.reduce((sum, param) => sum + param.total, 0),
            finalCost: Math.max(
                0,
                parameters.reduce((sum, param) => sum + param.total, 0) - (parseInt(document.getElementById('desktopDiscount').value) || 0)
            ),
        };

        console.log('Submitting form data:', formData);

        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
        submitBtn.disabled = true;

        setTimeout(() => {
            window.adminLayout.showNotification('Gói dịch vụ đã được cập nhật thành công!', 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => window.adminLayout.loadContent('service-packages'), 1000);
        }, 2000);
    };

    // Sync field value
    const syncField = (id, value) => {
        const otherId = id.includes('Desktop') ? id.replace('Desktop', '') : `${id}Desktop`;
        const otherEl = document.getElementById(otherId);
        if (otherEl) otherEl.value = value;
    };

    // Sync mobile quantity
    const syncMobileQuantity = (parameterId, value) => {
        const mobileInput = document.querySelector(`div[data-parameter-id="${parameterId}"] .quantity-input`);
        if (mobileInput) mobileInput.value = value;
    };

    // Sync desktop quantity
    const syncDesktopQuantity = (parameterId, value) => {
        const desktopInput = document.querySelector(`tr[data-parameter-id="${parameterId}"] .quantity-input`);
        if (desktopInput) desktopInput.value = value;
    };

    // Sync desktop select
    const syncDesktopSelect = (parameterId, value) => {
        const desktopSelect = document.querySelector(`tr[data-parameter-id="${parameterId}"] .parameter-select`);
        if (desktopSelect) {
            desktopSelect.value = value;
            updateParameterPrice(parameterId, desktopSelect);
        }
    };

    // Show error notification
    const showError = (message) => {
        window.adminLayout.showNotification(message, 'danger');
        setTimeout(() => window.adminLayout.loadContent('service-packages'), 2000);
    };

    // Export functions
    window.servicePackageEdit = {
        addParameter,
        removeParameter,
        calculateCosts,
        validateForm,
        submitForm,
    };
})();