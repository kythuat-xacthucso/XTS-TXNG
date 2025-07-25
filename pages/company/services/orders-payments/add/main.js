// Service Order Add Page JavaScript
document.addEventListener('contentLoaded', function() {
    console.log('Service Order Add page loaded');
    initializeServiceOrderAdd();
});

// Sample services data (in real app, this would come from API)
const availableServices = [
    { id: 1, name: 'Gói Cơ bản', parameter: 'Mã doanh nghiệp', quantity: 5, price: 1000000, type: 'Gói chính' },
    { id: 2, name: 'Gói Nâng cao', parameter: 'Mã truyền thông sản phẩm', quantity: 10, price: 3000000, type: 'Gói chính' },
    { id: 3, name: 'Gói Doanh nghiệp', parameter: 'Mã định danh', quantity: 15, price: 6000000, type: 'Gói chính' },
    { id: 4, name: 'Gói VIP', parameter: 'Dung lượng (MB)', quantity: 100, price: 12000000, type: 'Gói bổ sung' },
    { id: 5, name: 'Gói Starter', parameter: 'Lượt kích hoạt', quantity: 50, price: 500000, type: 'Gói bổ sung' }
];

let serviceCounter = 0;
let services = [];

function initializeServiceOrderAdd() {
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize service management
    initializeServiceManagement();
    
    // Initialize cost calculation
    initializeCostCalculation();
    
    // Add first service row by default
    addService();
}

function initializeFormValidation() {
    const confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            if (validateForm()) {
                showConfirmPurchaseModal();
            }
        });
    }
}

function initializeServiceManagement() {
    // Desktop add service button
    document.getElementById('addServiceDesktop').addEventListener('click', addService);
    
    // Mobile add service button
    document.getElementById('addServiceMobile').addEventListener('click', addService);
}

function initializeCostCalculation() {
    // No discount or total cost section, just table footer total
}

function addService() {
    serviceCounter++;
    const serviceId = `service_${serviceCounter}`;
    
    // Add to desktop table
    addServiceToTable(serviceId);
    
    // Add to mobile cards
    addServiceToMobile(serviceId);
    
    // Add to services array
    services.push({
        id: serviceId,
        serviceId: null,
        price: 0,
        quantity: 1,
        type: 'Gói chính' // Default to main package
    });
    
    calculateCosts();
}

function addServiceToTable(serviceId) {
    const tableBody = document.getElementById('servicesTableBody');
    const rowIndex = tableBody.children.length + 1;
    
    const row = document.createElement('tr');
    row.className = 'service-row new-row';
    row.dataset.serviceId = serviceId;
    
    row.innerHTML = `
        <td class="text-center">${rowIndex}</td>
        <td>
            <select class="form-select service-select" name="service_${serviceId}" required>
                <option value="">Chọn tên gói</option>
                ${availableServices.map(service => 
                    `<option value="${service.id}" data-parameter="${service.parameter}" data-quantity="${service.quantity}" data-price="${service.price}" data-type="${service.type}">${service.name}</option>`
                ).join('')}
            </select>
        </td>
        <td>
            <input type="text" class="form-control parameter-input" name="parameter_${serviceId}" readonly>
        </td>
        <td>
            <input type="number" class="form-control quantity-input" name="quantity_${serviceId}" min="1" value="1" ${availableServices.some(s => s.id === 1 && s.type === 'Gói chính') ? 'readonly' : ''}>
        </td>
        <td>
            <input type="text" class="form-control price-input" name="price_${serviceId}" readonly placeholder="0">
        </td>
        <td class="text-center">
            <button type="button" class="btn-view me-1" onclick="viewServiceDetails('${serviceId}')">
                <i class="fas fa-eye"></i>
            </button>
            <button type="button" class="btn-remove" onclick="removeService('${serviceId}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    
    // Add event listener
    const serviceSelect = row.querySelector('.service-select');
    serviceSelect.addEventListener('change', function() {
        updateServiceDetails(serviceId, this);
    });
    
    // Highlight animation
    setTimeout(() => {
        row.classList.add('fade-highlight');
    }, 100);
}

function addServiceToMobile(serviceId) {
    const mobileList = document.getElementById('mobileServicesList');
    const cardIndex = mobileList.children.length + 1;
    
    const card = document.createElement('div');
    card.className = 'service-card new-card';
    card.dataset.serviceId = serviceId;
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-title">Gói dịch vụ ${cardIndex}</div>
            <div>
                <button type="button" class="view-btn me-2" onclick="viewServiceDetails('${serviceId}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button type="button" class="remove-btn" onclick="removeService('${serviceId}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        
        <div class="mb-3">
            <label class="form-label">Tên gói <span class="text-danger">*</span></label>
            <select class="form-select service-select" name="service_${serviceId}" required>
                <option value="">Chọn tên gói</option>
                ${availableServices.map(service => 
                    `<option value="${service.id}" data-parameter="${service.parameter}" data-quantity="${service.quantity}" data-price="${service.price}" data-type="${service.type}">${service.name}</option>`
                ).join('')}
            </select>
        </div>
        
        <div class="row mb-3">
            <div class="col-6">
                <label class="form-label">Tham số</label>
                <input type="text" class="form-control parameter-input" name="parameter_${serviceId}" readonly>
            </div>
            <div class="col-6">
                <label class="form-label">Số lượng</label>
                <input type="number" class="form-control quantity-input" name="quantity_${serviceId}" min="1" value="1" ${availableServices.some(s => s.id === 1 && s.type === 'Gói chính') ? 'readonly' : ''}>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-6">
                <label class="form-label">Giá tiền</label>
                <input type="text" class="form-control price-input" name="price_${serviceId}" readonly placeholder="0">
            </div>
        </div>
    `;
    
    mobileList.appendChild(card);
    
    // Add event listener
    const serviceSelect = card.querySelector('.service-select');
    serviceSelect.addEventListener('change', function() {
        updateServiceDetails(serviceId, this);
        // Sync with desktop
        const desktopSelect = document.querySelector(`tr[data-service-id="${serviceId}"] .service-select`);
        if (desktopSelect) {
            desktopSelect.value = this.value;
            updateServiceDetails(serviceId, desktopSelect);
        }
    });
    
    // Highlight animation
    setTimeout(() => {
        card.classList.add('fade-highlight');
    }, 100);
}

function updateServiceDetails(serviceId, selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    const parameter = selectedOption ? selectedOption.dataset.parameter || '-' : '-';
    const quantity = selectedOption ? parseInt(selectedOption.dataset.quantity) || 1 : 1;
    const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
    const type = selectedOption ? selectedOption.dataset.type || 'Gói chính' : 'Gói chính';
    const isMainPackage = type === 'Gói chính';
    
    // Update parameter, quantity, and price inputs
    const parameterInputs = document.querySelectorAll(`input[name="parameter_${serviceId}"]`);
    parameterInputs.forEach(input => {
        input.value = parameter;
    });

    const quantityInputs = document.querySelectorAll(`input[name="quantity_${serviceId}"]`);
    quantityInputs.forEach(input => {
        input.value = isMainPackage ? quantity : 1;
        input.readOnly = isMainPackage;
    });

    const priceInputs = document.querySelectorAll(`input[name="price_${serviceId}"]`);
    priceInputs.forEach(input => {
        input.value = price > 0 ? formatCurrency(price) : '';
    });
    
    // Update service in array
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
        services[serviceIndex].serviceId = selectedOption ? selectedOption.value : null;
        services[serviceIndex].price = price;
        services[serviceIndex].quantity = isMainPackage ? quantity : parseInt(quantityInputs[0].value) || 1;
        services[serviceIndex].type = type;
    }
    
    calculateCosts();
}

function viewServiceDetails(serviceId) {
    console.log('viewServiceDetails called with serviceId:', serviceId); // Debug log
    
    const filePaths = window.companyLayout.getFilePaths('view-system-service');
    console.log('filePaths:', filePaths); // Debug log
    
    if (filePaths && filePaths.html) {
        const modalBody = document.getElementById('viewServiceModalBody');
        modalBody.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
        
        const modal = new bootstrap.Modal(document.getElementById('viewServiceModal'));
        modal.show();
        
        // Load view-system-service content directly
        fetch(filePaths.html)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load HTML: ${filePaths.html}`);
                }
                return response.text();
            })
            .then(data => {
                modalBody.innerHTML = data;
                
                // Load CSS if not already loaded
                if (filePaths.css && !document.querySelector(`link[href="${filePaths.css}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = filePaths.css;
                    document.head.appendChild(link);
                }
                
                // Load JS if not already loaded
                if (filePaths.js && !document.querySelector(`script[src="${filePaths.js}"]`)) {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = filePaths.js;
                    document.body.appendChild(script);
                }
            })
            .catch(error => {
                console.error('Error loading view-system-service:', error);
                modalBody.innerHTML = '<p class="text-danger">Lỗi tải chi tiết gói dịch vụ.</p>';
            });
    } else {
        window.companyLayout.showNotification('Không thể tải trang chi tiết', 'danger');
    }
}

function removeService(serviceId) {
    // Remove from desktop table
    const desktopRow = document.querySelector(`tr[data-service-id="${serviceId}"]`);
    if (desktopRow) {
        desktopRow.remove();
        updateTableRowNumbers();
    }
    
    // Remove from mobile cards
    const mobileCard = document.querySelector(`div[data-service-id="${serviceId}"]`);
    if (mobileCard) {
        mobileCard.remove();
        updateMobileCardNumbers();
    }
    
    // Remove from services array
    services = services.filter(s => s.id !== serviceId);
    
    calculateCosts();
}

function updateTableRowNumbers() {
    const rows = document.querySelectorAll('#servicesTableBody .service-row');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

function updateMobileCardNumbers() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.querySelector('.card-title').textContent = `Gói dịch vụ ${index + 1}`;
    });
}

function calculateCosts() {
    const totalCost = services.reduce((sum, service) => sum + (service.price * service.quantity), 0);
    
    // Update desktop table footer
    document.getElementById('totalCostFooter').textContent = formatCurrency(totalCost);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

function validateForm() {
    if (services.length === 0) {
        window.companyLayout.showNotification('Vui lòng thêm ít nhất một gói dịch vụ', 'danger');
        return false;
    }
    
    // Check if all services are selected
    const unselectedServices = services.filter(s => !s.serviceId);
    if (unselectedServices.length > 0) {
        window.companyLayout.showNotification('Vui lòng chọn tên gói cho tất cả các dòng', 'danger');
        return false;
    }
    
    return true;
}

function showConfirmPurchaseModal() {
    if (validateForm()) {
        const totalCost = parseInt(document.getElementById('totalCostFooter').textContent.replace(/\D/g, '')) || 0;
        document.getElementById('confirmPurchaseTotal').textContent = formatCurrency(totalCost);

        const modalElement = document.getElementById('confirmPurchaseModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
            if (confirmPurchaseButton) {
                confirmPurchaseButton.addEventListener('click', function() {
                    modal.hide();
                    openPaymentModal();
                }, { once: true });
            }
        }
    }
}

function openPaymentModal() {
    const orderData = {
        orderId: `DH${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, // Random order ID
        createdAt: new Date().toLocaleString('vi-VN'),
        customerName: 'Nguyễn Văn A', // Replace with actual user data
        customerId: 'KH001', // Replace with actual user data
        paymentType: 'Mua mới',
        finalCost: parseInt(document.getElementById('totalCostFooter').textContent.replace(/\D/g, '')) || 0
    };

    // Populate payment modal
    document.getElementById('modalInvoiceCode').textContent = orderData.orderId;
    document.getElementById('modalCreatedAt').textContent = orderData.createdAt;
    document.getElementById('modalCreatedBy').textContent = orderData.customerName;
    document.getElementById('modalCustomerId').textContent = orderData.customerId;
    document.getElementById('modalAmount').textContent = formatCurrency(orderData.finalCost);
    document.getElementById('modalPaymentAmount').textContent = formatCurrency(orderData.finalCost);
    document.getElementById('modalTransferContent').textContent = orderData.orderId;

    // Show modal
    const modalElement = document.getElementById('confirmPaymentModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        // Add event listener for payment confirmation
        const confirmPaymentButton = document.getElementById('confirmPaymentButton');
        if (confirmPaymentButton) {
            confirmPaymentButton.addEventListener('click', function(e) {
                e.preventDefault();
                const form = document.getElementById('confirmPaymentModal').querySelector('form');
                if (form.checkValidity()) {
                    showConfirmPaymentPopup(orderData.orderId);
                } else {
                    form.classList.add('was-validated');
                }
            }, { once: true });
        }

        // Add image preview handler
        const proofImage = document.getElementById('modalTransactionImage');
        const imagePreview = document.getElementById('modalTransactionImagePreview');
        const previewImg = document.getElementById('modalTransactionImagePreviewImg');
        if (proofImage && imagePreview && previewImg) {
            proofImage.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                    imagePreview.style.display = 'block';
                }
            });
        }
    }
}

function showConfirmPaymentPopup(orderId) {
    if (confirm('Bạn có chắc chắn muốn xác nhận thanh toán cho đơn hàng ' + orderId + '?')) {
        completePayment();
    }
}

function completePayment() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmPaymentModal'));
    if (modal) {
        modal.hide();
    }

    // Simulate success and redirect
    setTimeout(() => {
        navigateTo('view-order-payment', document.getElementById('modalInvoiceCode').textContent);
        showSuccessToast();
    }, 500);
}

function navigateTo(page, id = null) {
    const filePaths = window.companyLayout.getFilePaths(page);
    if (filePaths && filePaths.html) {
        const path = id ? `${filePaths.html}?id=${id}` : filePaths.html;
        window.companyLayout.loadContent(page, { html: path });
    } else {
        window.companyLayout.showNotification('Trang không tồn tại', 'danger');
    }
}

function showSuccessToast() {
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
}

window.serviceOrderAdd = {
    addService,
    removeService,
    viewServiceDetails,
    calculateCosts,
    validateForm,
    redirectToListPage: () => window.companyLayout.loadContent('orders-payments')
};

// Mock layout functions
window.companyLayout = {
    showNotification: (message, type) => console.log(`Notification: ${message} (${type})`),
    loadContent: (contentId, options) => console.log(`Loading content: ${contentId}`, options),
    getFilePaths: () => ({ html: '/view-system-service.html', css: '/view-system-service.css', js: '/view-system-service.js' })
};