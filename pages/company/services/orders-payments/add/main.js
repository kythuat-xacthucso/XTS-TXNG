// Service Order Add Page JavaScript
document.addEventListener('contentLoaded', function() {
    console.log('Service Order Add page loaded');
    initializeServiceOrderAdd();
});

// Sample services data (in real app, this would come from API)
const availableServices = [
    { id: 1, name: 'Gói Cơ bản', duration: '3 tháng', price: 1000000 },
    { id: 2, name: 'Gói Nâng cao', duration: '6 tháng', price: 3000000 },
    { id: 3, name: 'Gói Doanh nghiệp', duration: '1 năm', price: 6000000 },
    { id: 4, name: 'Gói VIP', duration: '1 năm', price: 12000000 },
    { id: 5, name: 'Gói Starter', duration: '3 tháng', price: 500000 }
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
    
    // Sync notes between mobile and desktop
    initializeFieldSync();
    
    // Add first service row by default
    addService();
}

function initializeFormValidation() {
    const form = document.getElementById('serviceOrderForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

function initializeServiceManagement() {
    // Desktop add service button
    document.getElementById('addServiceDesktop').addEventListener('click', addService);
    
    // Mobile add service button
    document.getElementById('addServiceMobile').addEventListener('click', addService);
}

function initializeCostCalculation() {
    // Discount input change handlers
    document.getElementById('desktopDiscount').addEventListener('input', calculateCosts);
    document.getElementById('mobileDiscount').addEventListener('input', function() {
        // Sync discount values
        document.getElementById('desktopDiscount').value = this.value;
        calculateCosts();
    });
    
    document.getElementById('desktopDiscount').addEventListener('input', function() {
        document.getElementById('mobileDiscount').value = this.value;
        calculateCosts();
    });
}

function initializeFieldSync() {
    // Sync notes
    document.getElementById('mobileNotes').addEventListener('input', function() {
        document.getElementById('desktopNotes').value = this.value;
    });
    document.getElementById('desktopNotes').addEventListener('input', function() {
        document.getElementById('mobileNotes').value = this.value;
    });
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
        price: 0
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
                <option value="">Chọn gói dịch vụ</option>
                ${availableServices.map(service => 
                    `<option value="${service.id}" data-duration="${service.duration}" data-price="${service.price}">${service.name}</option>`
                ).join('')}
            </select>
        </td>
        <td>
            <input type="text" class="form-control duration-input" name="duration_${serviceId}" 
                   readonly placeholder="-">
        </td>
        <td>
            <input type="text" class="form-control price-input" name="price_${serviceId}" 
                   readonly placeholder="0">
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
            <label class="form-label">Gói dịch vụ <span class="text-danger">*</span></label>
            <select class="form-select service-select" name="service_${serviceId}" required>
                <option value="">Chọn gói dịch vụ</option>
                ${availableServices.map(service => 
                    `<option value="${service.id}" data-duration="${service.duration}" data-price="${service.price}">${service.name}</option>`
                ).join('')}
            </select>
        </div>
        
        <div class="row mb-3">
            <div class="col-6">
                <label class="form-label">Thời hạn</label>
                <input type="text" class="form-control duration-input" name="duration_${serviceId}" 
                       readonly placeholder="-">
            </div>
            <div class="col-6">
                <label class="form-label">Giá tiền</label>
                <input type="text" class="form-control price-input" name="price_${serviceId}" 
                       readonly placeholder="0">
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
    const duration = selectedOption ? selectedOption.dataset.duration || '-' : '-';
    const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
    
    // Update duration and price inputs
    const durationInputs = document.querySelectorAll(`input[name="duration_${serviceId}"]`);
    durationInputs.forEach(input => {
        input.value = duration;
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
    const totalCost = services.reduce((sum, service) => sum + service.price, 0);
    const discount = parseInt(document.getElementById('desktopDiscount').value) || 0;
    const finalCost = Math.max(0, totalCost - discount);
    
    // Update desktop display
    document.getElementById('desktopTotalCost').textContent = formatCurrency(totalCost);
    document.getElementById('desktopFinalCost').textContent = formatCurrency(finalCost);
    
    // Update mobile display
    document.getElementById('mobileTotalCost').textContent = formatCurrency(totalCost);
    document.getElementById('mobileFinalCost').textContent = formatCurrency(finalCost);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

function validateForm() {
    const form = document.getElementById('serviceOrderForm');
    
    if (services.length === 0) {
        window.companyLayout.showNotification('Vui lòng thêm ít nhất một gói dịch vụ', 'danger');
        return false;
    }
    
    // Check if all services are selected
    const unselectedServices = services.filter(s => !s.serviceId);
    if (unselectedServices.length > 0) {
        window.companyLayout.showNotification('Vui lòng chọn gói dịch vụ cho tất cả các dòng', 'danger');
        return false;
    }
    
    form.classList.add('was-validated');
    return true;
}

function submitForm() {
    const formData = {
        services: services.filter(s => s.serviceId),
        notes: document.getElementById('desktopNotes').value.trim(),
        discount: parseInt(document.getElementById('desktopDiscount').value) || 0,
        totalCost: services.reduce((sum, service) => sum + service.price, 0),
        finalCost: Math.max(0, services.reduce((sum, service) => sum + service.price, 0) - (parseInt(document.getElementById('desktopDiscount').value) || 0))
    };
    
    console.log('Form data to submit:', formData);
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        window.companyLayout.showNotification('Đơn hàng đã được tạo thành công!', 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect to list page
        setTimeout(() => {
            window.companyLayout.loadContent('orders-payments');
        }, 1000);
    }, 2000);
}

// Export functions for external use
window.serviceOrderAdd = {
    addService,
    removeService,
    viewServiceDetails,
    calculateCosts,
    validateForm,
    submitForm
};