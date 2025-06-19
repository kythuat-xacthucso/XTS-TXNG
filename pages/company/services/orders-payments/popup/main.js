// Mock data source (thay thế bằng API thực tế nếu cần)
const mockOrderData = {
    orderId: 'DH001',
    createdAt: new Date().toLocaleString('vi-VN'),
    customerName: 'Nguyễn Văn A',
    customerId: 'KH001',
    paymentType: 'Mua mới',
    finalCost: 0
};

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Utility: Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

// Initialize payment modal
function initializeConfirmPayment(orderData = mockOrderData) {
    setupFormElements();
    populateForm(orderData);
    setupEventListeners();
}

// Setup form elements
function setupFormElements() {
    const form = document.getElementById('confirmPaymentForm');
    if (!form) {
        console.error('Confirm Payment Form not found');
        return;
    }
    form.classList.add('needs-validation');
}

// Populate form with data
function populateForm(orderData) {
    try {
        document.getElementById('orderId').value = orderData.orderId || '';
        document.getElementById('createdAt').value = orderData.createdAt || '';
        document.getElementById('customerName').value = orderData.customerName || '';
        document.getElementById('customerId').value = orderData.customerId || '';
        document.getElementById('paymentType').value = orderData.paymentType || '';
        document.getElementById('finalCost').value = orderData.finalCost != null 
            ? `${formatCurrency(orderData.finalCost)} VNĐ` 
            : '0 VNĐ';
    } catch (error) {
        console.error('Error populating form:', error);
        window.companyLayout?.showNotification?.('Lỗi khi tải dữ liệu đơn hàng', 'danger');
    }
}

// Setup event listeners
function setupEventListeners() {
    const form = document.getElementById('confirmPaymentForm');
    const proofImageInput = document.getElementById('proofImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');

    // Image preview with validation
    proofImageInput?.addEventListener('change', debounce(function () {
        const file = this.files[0];
        const maxSizeMB = 5; // Giới hạn 5MB
        if (file) {
            if (!file.type.startsWith('image/')) {
                window.companyLayout?.showNotification?.('Vui lòng chọn file ảnh hợp lệ', 'warning');
                imagePreview.style.display = 'none';
                this.value = '';
                return;
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                window.companyLayout?.showNotification?.(`Ảnh không được vượt quá ${maxSizeMB}MB`, 'warning');
                imagePreview.style.display = 'none';
                this.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.style.opacity = '0';
                imagePreview.style.display = 'block';
                setTimeout(() => { imagePreview.style.opacity = '1'; }, 10);
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    }, 300));

    // Form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (await validateForm()) {
            submitPayment();
        }
    });
}

// Validate form
async function validateForm() {
    const form = document.getElementById('confirmPaymentForm');
    const transactionCode = document.getElementById('transactionCode').value.trim();
    const proofImage = document.getElementById('proofImage').files[0];

    // Kiểm tra định dạng mã giao dịch (ví dụ: ít nhất 6 ký tự)
    if (!transactionCode || transactionCode.length < 6) {
        window.companyLayout?.showNotification?.('Mã giao dịch phải có ít nhất 6 ký tự', 'danger');
        return false;
    }

    if (!proofImage) {
        window.companyLayout?.showNotification?.('Vui lòng chọn ảnh chứng minh', 'danger');
        return false;
    }

    form.classList.add('was-validated');
    return form.checkValidity();
}

// Submit payment
async function submitPayment() {
    const submitBtn = document.querySelector('#confirmPaymentForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
    submitBtn.disabled = true;

    try {
        const paymentData = {
            orderId: document.getElementById('orderId').value,
            transactionCode: document.getElementById('transactionCode').value.trim(),
            proofImage: document.getElementById('proofImage').files[0]?.name || null,
            createdAt: document.getElementById('createdAt').value,
            customerName: document.getElementById('customerName').value,
            customerId: document.getElementById('customerId').value,
            paymentType: document.getElementById('paymentType').value,
            finalCost: document.getElementById('finalCost').value.replace(' VNĐ', '').replace(/\./g, '')
        };

        console.log('Payment data to submit:', paymentData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.companyLayout?.showNotification?.('Thanh toán đã được xác nhận thành công!', 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmPaymentModal'));
        modal?.hide();

        // Redirect
        setTimeout(() => {
            window.serviceOrderAdd?.redirectToListPage?.();
        }, 1000);
    } catch (error) {
        console.error('Error submitting payment:', error);
        window.companyLayout?.showNotification?.('Lỗi khi xác nhận thanh toán', 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Confirm Payment Modal loaded');
    initializeConfirmPayment();
});

// Export functions
window.confirmPayment = {
    initializeConfirmPayment,
    populateForm,
    validateForm,
    submitPayment,
    formatCurrency
};