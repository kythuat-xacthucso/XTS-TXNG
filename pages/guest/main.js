// TXNG Stamp Lookup JavaScript

// Sample data for different stamp statuses
const sampleData = {
    valid: {
        trace_code: "TXNG123456789",
        trace_status: "valid",
        product_name: "Gạo ST25 hữu cơ",
        product_image: "https://images.pexels.com/photos/33239/rice-symbol-asia-asian.jpg?auto=compress&cs=tinysrgb&w=300",
        production_date: "01/06/2024",
        expiry_date: "01/06/2025",
        batch_code: "LOT123",
        production_log: [
            { stage: "Gieo trồng", date: "01/01/2024" },
            { stage: "Thu hoạch", date: "15/03/2024" }
        ],
        product_type: "Nông sản",
        specification: "5kg/túi",
        ingredients: "Gạo ST25 100%",
        notes: "Sản phẩm được trồng theo tiêu chuẩn hữu cơ, không sử dụng hóa chất",
        certificate_name: "Hữu cơ USDA",
        certificate_code: "USDA123",
        certificate_type: "Hữu cơ",
        valid_until: "31/12/2025",
        standard: "USDA Organic Standards",
        certificate_image: "https://images.pexels.com/photos/6962023/pexels-photo-6962023.jpeg?auto=compress&cs=tinysrgb&w=200",
        nsxkd_name: "Công ty CP Nông Nghiệp Xanh",
        nsxkd_address: "Q12, TPHCM",
        nsxkd_hotline: "0988123456",
        nsxkd_verified: "Đã xác thực bởi SPC ngày 01/01/2024",
        spc_name: "Trung tâm xác thực SPC Việt Nam",
        spc_logo: "https://images.pexels.com/photos/7681087/pexels-photo-7681087.jpeg?auto=compress&cs=tinysrgb&w=100",
        spc_description: "Tổ chức uy tín cấp chứng nhận nông sản theo tiêu chuẩn quốc tế",
        spc_website: "www.spc.vn",
        spc_contact: "097.345.6789"
    },
    not_activated: {
        trace_code: "TXNG987654321",
        trace_status: "not_activated",
        product_name: "Rau xà lách hữu cơ",
        product_image: "https://images.pexels.com/photos/1359791/pexels-photo-1359791.jpeg?auto=compress&cs=tinysrgb&w=300",
        production_date: "15/01/2024",
        expiry_date: "22/01/2024",
        batch_code: "LOT456",
        production_log: [
            { stage: "Gieo trồng", date: "01/12/2023" },
            { stage: "Thu hoạch", date: "15/01/2024" }
        ],
        product_type: "Rau củ quả",
        specification: "500g/khay",
        ingredients: "Xà lách hữu cơ",
        notes: "Rau xanh tươi, không thuốc trừ sâu",
        certificate_name: "VietGAP",
        certificate_code: "VG2024001",
        certificate_type: "An toàn thực phẩm",
        valid_until: "31/12/2024",
        standard: "VietGAP Standards",
        certificate_image: "https://images.pexels.com/photos/6962023/pexels-photo-6962023.jpeg?auto=compress&cs=tinysrgb&w=200",
        nsxkd_name: "HTX Rau sạch Đồng Nai",
        nsxkd_address: "Đồng Nai",
        nsxkd_hotline: "0977123456",
        nsxkd_verified: "Đã xác thực bởi SPC ngày 15/12/2023",
        spc_name: "Trung tâm xác thực SPC Việt Nam",
        spc_logo: "https://images.pexels.com/photos/7681087/pexels-photo-7681087.jpeg?auto=compress&cs=tinysrgb&w=100",
        spc_description: "Tổ chức uy tín cấp chứng nhận nông sản theo tiêu chuẩn quốc tế",
        spc_website: "www.spc.vn",
        spc_contact: "097.345.6789"
    }
};

// Initialize tooltips and setup
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-hide warning after 10 seconds
    setTimeout(() => {
        closeWarning();
    }, 10000);

    // Initialize with default data or URL parameter
    initializeData();
});

// Initialize data based on URL parameter or default
function initializeData() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        // Load data based on URL parameter
        let data;
        if (code.includes('987') || code.toLowerCase().includes('test')) {
            data = sampleData.not_activated;
        } else {
            data = sampleData.valid;
        }
        loadProductData(data);
    } else {
        // Load default valid data
        loadProductData(sampleData.valid);
    }
}

// Update status display based on stamp status
function updateStatus(status) {
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const warningAlert = document.getElementById('warningAlert');
    const warningText = document.getElementById('warningText');
    const statusHeader = document.querySelector('.status-header');

    // Clear existing status classes
    statusHeader.className = 'status-header';
    statusIcon.className = 'bi status-icon';

    switch (status) {
        case 'valid':
            statusIcon.classList.add('bi-check-circle-fill', 'text-primary');
            statusText.textContent = 'Tem hợp lệ';
            statusText.nextElementSibling.textContent = 'Sản phẩm đã được xác thực';
            warningAlert.style.display = 'none';
            updateCardColors('valid');
            break;
        case 'not_activated':
            statusHeader.classList.add('status-warning');
            statusIcon.classList.add('bi-exclamation-triangle-fill', 'text-warning');
            statusText.textContent = 'Tem chưa kích hoạt';
            statusText.nextElementSibling.textContent = 'Cần kiểm tra với người bán';
            warningText.textContent = 'Tem này chưa được kích hoạt. Vui lòng kiểm tra với người bán/NSXKD.';
            warningAlert.style.display = 'block';
            updateCardColors('not_activated');
            break;
        case 'sold':
            statusHeader.classList.add('status-warning');
            statusIcon.classList.add('bi-exclamation-triangle-fill', 'text-warning');
            statusText.textContent = 'Tem đã bán';
            statusText.nextElementSibling.textContent = 'Kiểm tra nguồn gốc nếu nghi ngờ';
            warningText.textContent = 'Sản phẩm đã bán, kiểm tra nguồn gốc nếu nghi ngờ.';
            warningAlert.style.display = 'block';
            updateCardColors('sold');
            break;
        case 'expired':
            statusHeader.classList.add('status-danger');
            statusIcon.classList.add('bi-x-circle-fill', 'text-danger');
            statusText.textContent = 'Tem hết hạn';
            statusText.nextElementSibling.textContent = 'Không nên sử dụng sản phẩm';
            warningText.textContent = 'Tem đã hết hạn hoặc bị thu hồi. Không nên sử dụng sản phẩm này.';
            warningAlert.style.display = 'block';
            warningAlert.querySelector('.alert').className = 'alert alert-danger alert-dismissible';
            updateCardColors('expired');
            break;
    }
}

// Update card border colors based on status
function updateCardColors(status) {
    const cards = document.querySelectorAll('.card.border-start');
    
    cards.forEach(card => {
        // Reset to default primary border
        card.className = card.className.replace(/border-(primary|warning|danger|secondary)/g, '');
        
        if (status === 'valid') {
            card.classList.add('border-primary');
        } else if (status === 'not_activated') {
            if (card.id === 'certificateCard' || card.id === 'spcCard') {
                card.classList.add('border-warning');
            } else if (card.id === 'productUnitCard' || card.id === 'productCard' || card.id === 'manufacturerCard') {
                card.classList.add('border-secondary');
            }
        } else if (status === 'sold') {
            if (card.id === 'productUnitCard' || card.id === 'productCard' || card.id === 'manufacturerCard') {
                card.classList.add('border-warning');
            } else if (card.id === 'certificateCard' || card.id === 'spcCard') {
                card.classList.add('border-warning');
            }
        } else if (status === 'expired') {
            if (card.id === 'productUnitCard') {
                card.classList.add('border-danger');
            } else if (card.id === 'manufacturerCard') {
                card.classList.add('border-primary'); // Manufacturer stays valid
            } else if (card.id === 'certificateCard' || card.id === 'spcCard') {
                card.classList.add('border-warning');
            }
        }
    });
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép mã tem: ' + text, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Đã sao chép mã tem: ' + text, 'success');
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 start-50 translate-middle-x p-3';
    toastContainer.style.zIndex = '9999';
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    
    const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
    
    toast.innerHTML = `
        <div class="toast-body ${bgClass} text-white">
            <i class="bi bi-check-circle-fill me-2"></i>${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toastContainer);
    });
}

// Show image in modal
function showImageModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
    new bootstrap.Modal(document.getElementById('imageModal')).show();
}

// Open scan modal
function openScanModal() {
    new bootstrap.Modal(document.getElementById('scanModal')).show();
}

// Close warning alert
function closeWarning() {
    const warningAlert = document.getElementById('warningAlert');
    if (warningAlert) {
        warningAlert.style.display = 'none';
    }
}

// Start camera (placeholder function)
function startCamera() {
    showToast('Chức năng camera đang được phát triển. Vui lòng nhập mã thủ công.', 'info');
}

// Lookup manual code
function lookupManualCode() {
    const code = document.getElementById('manualCode').value.trim();
    const button = event.target;
    const spinner = document.getElementById('loadingSpinner');
    const icon = button.querySelector('.bi-search');
    
    if (!code) {
        showToast('Vui lòng nhập mã tem', 'danger');
        return;
    }

    // Show loading state
    spinner.classList.remove('d-none');
    icon.classList.add('d-none');
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        spinner.classList.add('d-none');
        icon.classList.remove('d-none');
        button.disabled = false;

        // Determine data based on code
        let data;
        if (code.includes('987') || code.toLowerCase().includes('test')) {
            data = sampleData.not_activated;
        } else {
            data = sampleData.valid;
        }

        // Update display
        loadProductData(data);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('scanModal')).hide();
        
        // Clear input
        document.getElementById('manualCode').value = '';
        
        showToast('Đã tra cứu thành công mã: ' + code, 'success');
    }, 1500);
}

// Load product data and update UI
function loadProductData(data) {
    // Update status
    updateStatus(data.trace_status);

    // Update all fields
    document.getElementById('productName').textContent = data.product_name;
    document.getElementById('traceCode').textContent = data.trace_code;
    document.getElementById('productionDate').textContent = data.production_date;
    document.getElementById('expiryDate').textContent = data.expiry_date;
    document.getElementById('batchCode').textContent = data.batch_code;

    // Update production log
    const logContainer = document.getElementById('productionLog');
    logContainer.innerHTML = data.production_log.map(log => 
        `<div>• ${log.stage}: ${log.date}</div>`
    ).join('');

    // Update product information
    document.getElementById('productType').textContent = data.product_type;
    document.getElementById('specification').textContent = data.specification;
    document.getElementById('ingredients').textContent = data.ingredients;
    document.getElementById('notes').textContent = data.notes;

    // Update certificate information
    document.getElementById('certificateName').textContent = data.certificate_name;
    document.getElementById('certificateCode').textContent = data.certificate_code;
    document.getElementById('certificateType').textContent = data.certificate_type;
    document.getElementById('validUntil').textContent = data.valid_until;
    document.getElementById('standard').textContent = data.standard;

    // Update manufacturer information
    document.getElementById('nsxkdName').textContent = data.nsxkd_name;
    document.getElementById('nsxkdAddress').textContent = data.nsxkd_address;
    document.getElementById('nsxkdHotline').textContent = data.nsxkd_hotline;
    document.getElementById('nsxkdHotline').href = 'tel:' + data.nsxkd_hotline;
    document.getElementById('nsxkdVerified').textContent = data.nsxkd_verified;

    // Update SPC information
    document.getElementById('spcName').textContent = data.spc_name;
    document.getElementById('spcDescription').textContent = data.spc_description;
    document.getElementById('spcWebsite').textContent = data.spc_website;
    document.getElementById('spcWebsite').href = 'https://' + data.spc_website;
    document.getElementById('spcContact').textContent = data.spc_contact;
    document.getElementById('spcContact').href = 'tel:' + data.spc_contact;

    // Update status badge
    const badge = document.getElementById('traceStatusBadge');
    badge.className = 'badge';
    switch (data.trace_status) {
        case 'valid':
            badge.classList.add('bg-primary');
            badge.textContent = 'Hợp lệ';
            break;
        case 'not_activated':
            badge.classList.add('bg-warning', 'text-dark');
            badge.textContent = 'Chưa kích hoạt';
            break;
        case 'sold':
            badge.classList.add('bg-warning', 'text-dark');
            badge.textContent = 'Đã bán';
            break;
        case 'expired':
            badge.classList.add('bg-danger');
            badge.textContent = 'Hết hạn';
            break;
    }

    // Update copy button
    document.querySelector('.btn-outline-secondary').onclick = () => copyToClipboard(data.trace_code);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle Enter key in manual input
document.addEventListener('DOMContentLoaded', function() {
    const manualCodeInput = document.getElementById('manualCode');
    if (manualCodeInput) {
        manualCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                lookupManualCode();
            }
        });
    }
});