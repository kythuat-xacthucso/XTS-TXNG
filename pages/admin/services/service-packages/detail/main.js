(function () {
    // Fake data for view page (scoped within IIFE)
    const viewServicePackages = [
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

    // Initialize when content is loaded
    document.addEventListener('contentLoaded', ({ detail }) => {
        if (detail.contentId === 'view-service-package') {
            console.log('Initializing view-service-package');
            initializeView();
        }
    });

    // Main initialization function
    const initializeView = () => {
        const pkg = viewServicePackages[0]; // Default to first package

        if (!pkg) {
            showError('Không có gói dịch vụ nào để hiển thị');
            return;
        }

        populateForm(pkg);
        populateParameters(pkg.parameters);
        calculateCosts(pkg);
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
            status: status === 'active' ? 'Đang hoạt động' : 'Khóa',
            mobileDiscount: discount,
            packageNameDesktop: name,
            packageCodeDesktop: code,
            durationDesktop: duration,
            durationUnitDesktop: durationUnit,
            createdAtDesktop: createdAt,
            createdByDesktop: createdBy,
            statusDesktop: status === 'active' ? 'Đang hoạt động' : 'Khóa',
            desktopDiscount: discount,
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.value = value || '';
        });
    };

    // Populate parameters for desktop and mobile
    const populateParameters = (parameters) => {
        const tableBody = document.getElementById('parametersTableBody');
        const mobileList = document.getElementById('mobileParametersList');

        parameters.forEach((param, index) => {
            // Desktop table row
            const row = document.createElement('tr');
            row.className = 'parameter-row';
            row.innerHTML = `
          <td class="text-center">${index + 1}</td>
          <td><input type="text" class="form-control" value="${param.name}" readonly></td>
          <td><input type="text" class="form-control" value="${formatCurrency(param.price)}" readonly></td>
          <td><input type="number" class="form-control" value="${param.quantity}" readonly></td>
          <td><input type="text" class="form-control" value="${formatCurrency(param.price * param.quantity)}" readonly></td>
        `;
            tableBody.appendChild(row);

            // Mobile card
            const card = document.createElement('div');
            card.className = 'parameter-card';
            card.innerHTML = `
          <div class="card-header">
            <div class="card-title">Tham số ${index + 1}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Tham số</label>
            <input type="text" class="form-control" value="${param.name}" readonly>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <label class="form-label">Đơn giá</label>
              <input type="text" class="form-control" value="${formatCurrency(param.price)}" readonly>
            </div>
            <div class="col-6">
              <label class="form-label">Số lượng</label>
              <input type="number" class="form-control" value="${param.quantity}" readonly>
            </div>
          </div>
          <div class="mb-0">
            <label class="form-label">Thành tiền</label>
            <input type="text" class="form-control" value="${formatCurrency(param.price * param.quantity)}" readonly>
          </div>
        `;
            mobileList.appendChild(card);
        });
    };

    // Calculate and display costs
    const calculateCosts = ({ parameters, discount }) => {
        const totalCost = parameters.reduce((sum, param) => sum + param.price * param.quantity, 0);
        const finalCost = Math.max(0, totalCost - discount);

        ['desktopTotalCost', 'mobileTotalCost'].forEach((id) => {
            document.getElementById(id).textContent = formatCurrency(totalCost);
        });
        ['desktopFinalCost', 'mobileFinalCost'].forEach((id) => {
            document.getElementById(id).textContent = formatCurrency(finalCost);
        });
    };

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount);

    // Navigate to edit page
    const navigateToEdit = () => {
        window.adminLayout.loadContent('edit-service-package');
    };

    // Show error notification
    const showError = (message) => {
        window.adminLayout.showNotification(message, 'danger');
        setTimeout(() => window.adminLayout.loadContent('service-packages'), 2000);
    };
})();