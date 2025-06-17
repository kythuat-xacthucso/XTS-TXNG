// main.js (add)
// Service Package Add Page JavaScript
document.addEventListener('contentLoaded', function() {
    console.log('Service Package Add page loaded');
    initializeServicePackageAdd();
});

// Sample parameters data (in real app, this would come from API)
const availableParameters = [
    { id: 1, name: 'Kiểm tra chất lượng', price: 50000 },
    { id: 2, name: 'Phân tích thành phần', price: 75000 },
    { id: 3, name: 'Kiểm tra an toàn', price: 100000 },
    { id: 4, name: 'Chứng nhận xuất xứ', price: 120000 },
    { id: 5, name: 'Kiểm tra vi sinh', price: 80000 },
    { id: 6, name: 'Phân tích dinh dưỡng', price: 90000 }
];

let parameterCounter = 0;
let parameters = [];

function initializeServicePackageAdd() {
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize parameter management
    initializeParameterManagement();
    
    // Initialize cost calculation
    initializeCostCalculation();
    
    // Sync form fields between mobile and desktop
    initializeFieldSync();
    
    // Add first parameter row by default
    addParameter();
}

function initializeFormValidation() {
    const form = document.getElementById('servicePackageForm');
    
    // Custom validation for package code (alphanumeric only)
    const packageCodeInputs = document.querySelectorAll('input[name="packageCode"]');
    packageCodeInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-alphanumeric characters
            this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
            
            // Sync with other input
            const otherInput = input.id.includes('Desktop') ? 
                document.getElementById('packageCode') : 
                document.getElementById('packageCodeDesktop');
            if (otherInput) {
                otherInput.value = this.value;
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

function initializeParameterManagement() {
    // Desktop add parameter button
    document.getElementById('addParameterDesktop').addEventListener('click', addParameter);
    
    // Mobile add parameter button
    document.getElementById('addParameterMobile').addEventListener('click', addParameter);
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
    // Sync package name
    document.getElementById('packageName').addEventListener('input', function() {
        document.getElementById('packageNameDesktop').value = this.value;
    });
    document.getElementById('packageNameDesktop').addEventListener('input', function() {
        document.getElementById('packageName').value = this.value;
    });
    
    // Sync duration
    document.getElementById('duration').addEventListener('input', function() {
        document.getElementById('durationDesktop').value = this.value;
    });
    document.getElementById('durationDesktop').addEventListener('input', function() {
        document.getElementById('duration').value = this.value;
    });
    
    // Sync duration unit
    document.getElementById('durationUnit').addEventListener('change', function() {
        document.getElementById('durationUnitDesktop').value = this.value;
    });
    document.getElementById('durationUnitDesktop').addEventListener('change', function() {
        document.getElementById('durationUnit').value = this.value;
    });
}

function addParameter() {
    parameterCounter++;
    const parameterId = `param_${parameterCounter}`;
    
    // Add to desktop table
    addParameterToTable(parameterId);
    
    // Add to mobile cards
    addParameterToMobile(parameterId);
    
    // Add to parameters array
    parameters.push({
        id: parameterId,
        parameterId: null,
        quantity: 1,
        price: 0,
        total: 0
    });
    
    calculateCosts();
}

function addParameterToTable(parameterId) {
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
                ${availableParameters.map(param => 
                    `<option value="${param.id}" data-price="${param.price}">${param.name}</option>`
                ).join('')}
            </select>
        </td>
        <td>
            <input type="text" class="form-control price-input" name="price_${parameterId}" 
                   readonly placeholder="0">
        </td>
        <td>
            <input type="number" class="form-control quantity-input" name="quantity_${parameterId}" 
                   min="1" value="1" required>
        </td>
        <td>
            <input type="text" class="form-control total-input" name="total_${parameterId}" 
                   readonly placeholder="0">
        </td>
        <td class="text-center">
            <button type="button" class="btn-remove" onclick="removeParameter('${parameterId}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    
    // Add event listeners
    const parameterSelect = row.querySelector('.parameter-select');
    const quantityInput = row.querySelector('.quantity-input');
    
    parameterSelect.addEventListener('change', function() {
        updateParameterPrice(parameterId, this);
    });
    
    quantityInput.addEventListener('input', function() {
        updateParameterTotal(parameterId);
        // Sync with mobile
        const mobileQuantity = document.querySelector(`[data-parameter-id="${parameterId}"] .quantity-input`);
        if (mobileQuantity) {
            mobileQuantity.value = this.value;
        }
    });
    
    // Highlight animation
    setTimeout(() => {
        row.classList.add('fade-highlight');
    }, 100);
}

function addParameterToMobile(parameterId) {
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
                ${availableParameters.map(param => 
                    `<option value="${param.id}" data-price="${param.price}">${param.name}</option>`
                ).join('')}
            </select>
        </div>
        
        <div class="row mb-3">
            <div class="col-6">
                <label class="form-label">Đơn giá</label>
                <input type="text" class="form-control price-input" name="price_${parameterId}" 
                       readonly placeholder="0">
            </div>
            <div class="col-6">
                <label class="form-label">Số lượng</label>
                <input type="number" class="form-control quantity-input" name="quantity_${parameterId}" 
                       min="1" value="1" required>
            </div>
        </div>
        
        <div class="mb-0">
            <label class="form-label">Thành tiền</label>
            <input type="text" class="form-control total-input" name="total_${parameterId}" 
                   readonly placeholder="0">
        </div>
    `;
    
    mobileList.appendChild(card);
    
    // Add event listeners
    const parameterSelect = card.querySelector('.parameter-select');
    const quantityInput = card.querySelector('.quantity-input');
    
    parameterSelect.addEventListener('change', function() {
        updateParameterPrice(parameterId, this);
        // Sync with desktop
        const desktopSelect = document.querySelector(`tr[data-parameter-id="${parameterId}"] .parameter-select`);
        if (desktopSelect) {
            desktopSelect.value = this.value;
            updateParameterPrice(parameterId, desktopSelect);
        }
    });
    
    quantityInput.addEventListener('input', function() {
        updateParameterTotal(parameterId);
        // Sync with desktop
        const desktopQuantity = document.querySelector(`tr[data-parameter-id="${parameterId}"] .quantity-input`);
        if (desktopQuantity) {
            desktopQuantity.value = this.value;
        }
    });
    
    // Highlight animation
    setTimeout(() => {
        card.classList.add('fade-highlight');
    }, 100);
}

function updateParameterPrice(parameterId, selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    const price = selectedOption ? parseInt(selectedOption.dataset.price) || 0 : 0;
    
    // Update price inputs
    const priceInputs = document.querySelectorAll(`input[name="price_${parameterId}"]`);
    priceInputs.forEach(input => {
        input.value = price > 0 ? formatCurrency(price) : '';
    });
    
    // Update parameter in array
    const paramIndex = parameters.findIndex(p => p.id === parameterId);
    if (paramIndex !== -1) {
        parameters[paramIndex].parameterId = selectedOption ? selectedOption.value : null;
        parameters[paramIndex].price = price;
    }
    
    updateParameterTotal(parameterId);
}

function updateParameterTotal(parameterId) {
    const quantityInputs = document.querySelectorAll(`input[name="quantity_${parameterId}"]`);
    const quantity = parseInt(quantityInputs[0]?.value) || 1;
    
    const paramIndex = parameters.findIndex(p => p.id === parameterId);
    if (paramIndex !== -1) {
        const price = parameters[paramIndex].price;
        const total = price * quantity;
        
        parameters[paramIndex].quantity = quantity;
        parameters[paramIndex].total = total;
        
        // Update total inputs
        const totalInputs = document.querySelectorAll(`input[name="total_${parameterId}"]`);
        totalInputs.forEach(input => {
            input.value = total > 0 ? formatCurrency(total) : '';
        });
    }
    
    calculateCosts();
}

function removeParameter(parameterId) {
    // Remove from desktop table
    const desktopRow = document.querySelector(`tr[data-parameter-id="${parameterId}"]`);
    if (desktopRow) {
        desktopRow.remove();
        updateTableRowNumbers();
    }
    
    // Remove from mobile cards
    const mobileCard = document.querySelector(`div[data-parameter-id="${parameterId}"]`);
    if (mobileCard) {
        mobileCard.remove();
        updateMobileCardNumbers();
    }
    
    // Remove from parameters array
    parameters = parameters.filter(p => p.id !== parameterId);
    
    calculateCosts();
}

function updateTableRowNumbers() {
    const rows = document.querySelectorAll('#parametersTableBody .parameter-row');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

function updateMobileCardNumbers() {
    const cards = document.querySelectorAll('.parameter-card');
    cards.forEach((card, index) => {
        card.querySelector('.card-title').textContent = `Tham số ${index + 1}`;
    });
}

function calculateCosts() {
    const totalCost = parameters.reduce((sum, param) => sum + param.total, 0);
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
    const form = document.getElementById('servicePackageForm');
    
    // Check required fields
    const packageName = document.getElementById('packageName').value.trim();
    const packageCode = document.getElementById('packageCode').value.trim();
    const duration = document.getElementById('duration').value;
    const durationUnit = document.getElementById('durationUnit').value;
    
    if (!packageName) {
        window.adminLayout.showNotification('Vui lòng nhập tên gói dịch vụ', 'danger');
        return false;
    }
    
    if (!packageCode) {
        window.adminLayout.showNotification('Vui lòng nhập mã gói dịch vụ', 'danger');
        return false;
    }
    
    if (!duration || !durationUnit) {
        window.adminLayout.showNotification('Vui lòng nhập thời gian hợp lệ', 'danger');
        return false;
    }
    
    if (parameters.length === 0) {
        window.adminLayout.showNotification('Vui lòng thêm ít nhất một tham số', 'danger');
        return false;
    }
    
    // Check if all parameters are selected
    const unselectedParams = parameters.filter(p => !p.parameterId);
    if (unselectedParams.length > 0) {
        window.adminLayout.showNotification('Vui lòng chọn tham số cho tất cả các dòng', 'danger');
        return false;
    }
    
    form.classList.add('was-validated');
    return true;
}

function submitForm() {
    const formData = {
        packageName: document.getElementById('packageName').value.trim(),
        packageCode: document.getElementById('packageCode').value.trim(),
        duration: parseInt(document.getElementById('duration').value),
        durationUnit: document.getElementById('durationUnit').value,
        parameters: parameters.filter(p => p.parameterId),
        discount: parseInt(document.getElementById('desktopDiscount').value) || 0,
        totalCost: parameters.reduce((sum, param) => sum + param.total, 0),
        finalCost: Math.max(0, parameters.reduce((sum, param) => sum + param.total, 0) - (parseInt(document.getElementById('desktopDiscount').value) || 0))
    };
    
    console.log('Form data to submit:', formData);
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        window.adminLayout.showNotification('Gói dịch vụ đã được tạo thành công!', 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect to list page
        setTimeout(() => {
            window.adminLayout.loadContent('service-packages');
        }, 1000);
    }, 2000);
}

// Export functions for external use
window.servicePackageAdd = {
    addParameter,
    removeParameter,
    calculateCosts,
    validateForm,
    submitForm
};