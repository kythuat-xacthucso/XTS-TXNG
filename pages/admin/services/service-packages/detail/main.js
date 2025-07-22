(function () {
    // Fake data for view page
    const viewServicePackages = [
        {
            id: 1,
            name: 'Gói Cơ bản',
            code: 'BASIC001',
            duration: '12 tháng',
            parameter: { id: 1, name: 'Kiểm tra chất lượng', price: 50000 },
            quantity: 2,
            discount: 50000,
            status: 'active',
            createdAt: '2025-06-01 10:00',
            createdBy: 'Admin1'
        },
        {
            id: 2,
            name: 'Gói Nâng cao',
            code: 'ADV001',
            duration: '12 tháng',
            parameter: { id: 3, name: 'Kiểm tra an toàn', price: 100000 },
            quantity: 3,
            discount: 100000,
            status: 'locked',
            createdAt: '2025-06-02 14:30',
            createdBy: 'Admin2'
        }
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
        // Simulate getting package ID from URL or context
        const pkg = viewServicePackages[0]; // Default to first package

        if (!pkg) {
            showError('Không có gói dịch vụ nào để hiển thị');
            return;
        }

        populateForm(pkg);
        calculateCosts(pkg);
    };

    // Populate form fields
    const populateForm = ({ name, code, duration, parameter, quantity, discount, status, createdAt, createdBy }) => {
        const fields = {
            packageName: name,
            packageCode: code,
            duration: duration,
            parameter: parameter ? parameter.name : '',
            price: parameter ? formatCurrency(parameter.price) + ' VNĐ' : '',
            quantity: quantity,
            total: parameter ? formatCurrency(parameter.price * quantity) + ' VNĐ' : '',
            mobileDiscount: formatCurrency(discount) + ' VNĐ',
            mobileFinalCost: formatCurrency(Math.max(0, (parameter ? parameter.price * quantity : 0) - discount)) + ' VNĐ',
            status: status === 'active' ? 'Đang hoạt động' : 'Khóa',
            createdAt: createdAt,
            createdBy: createdBy,
            packageNameDesktop: name,
            packageCodeDesktop: code,
            durationDesktop: duration,
            parameterDesktop: parameter ? parameter.name : '',
            priceDesktop: parameter ? formatCurrency(parameter.price) + ' VNĐ' : '',
            quantityDesktop: quantity,
            totalDesktop: parameter ? formatCurrency(parameter.price * quantity) + ' VNĐ' : '',
            desktopDiscount: formatCurrency(discount) + ' VNĐ',
            desktopFinalCost: formatCurrency(Math.max(0, (parameter ? parameter.price * quantity : 0) - discount)) + ' VNĐ',
            statusDesktop: status === 'active' ? 'Đang hoạt động' : 'Khóa',
            createdAtDesktop: createdAt,
            createdByDesktop: createdBy
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value || '';
        });
    };

    // Calculate and display costs
    const calculateCosts = ({ parameter, quantity, discount }) => {
        const totalCost = parameter ? parameter.price * quantity : 0;
        const finalCost = Math.max(0, totalCost - discount);

        ['mobileTotalCost', 'desktopTotalCost'].forEach((id) => {
            const element = document.getElementById(id);
            if (element) element.textContent = formatCurrency(totalCost) + ' VNĐ';
        });
        ['mobileFinalCost', 'desktopFinalCost'].forEach((id) => {
            const element = document.getElementById(id);
            if (element) element.textContent = formatCurrency(finalCost) + ' VNĐ';
        });
    };

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount);

    // Navigate to edit page
    window.navigateTo = (page) => {
        window.adminLayout.loadContent(page);
    };

    // Show error notification
    const showError = (message) => {
        window.adminLayout.showNotification(message, 'danger');
        setTimeout(() => window.adminLayout.loadContent('service-packages'), 2000);
    };
})();