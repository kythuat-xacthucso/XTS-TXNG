(function () {
    // Fake data for order payment details page (scoped within IIFE)
    const viewOrderPayments = [
        {
            id: 3,
            code: 'INV003',
            amount: 300000,
            createdAt: '2025-06-02 14:30',
            paymentTime: '2025-06-02 15:00',
            approvedTime: '2025-06-02 16:00',
            approvedBy: 'Admin',
            createdBy: 'User2',
            status: 'approved',
            transactionCode: 'TXN123',
            transactionImage: 'https://thebank.vn/uploads/2023/04/24/thebank_hinhanhbillchuyentienvietcombankvacachtaobill2_1682330269.jpg',
            note: 'Hóa đơn cho gói nâng cao',
            packages: [
                { id: 3, name: 'Gói Cao cấp', duration: '6 tháng', price: 300000, expiryDate: '2025-12-02' },
            ],
        },
        {
            id: 2,
            code: 'INV002',
            amount: 175000,
            createdAt: '2025-06-01 10:00',
            paymentTime: '',
            approvedTime: '',
            approvedBy: '',
            createdBy: 'User1',
            status: 'pending',
            transactionCode: '',
            transactionImage: '',
            note: 'Hóa đơn cho gói cơ bản',
            packages: [
                { id: 1, name: 'Gói Cơ bản', duration: '1 tháng', price: 100000, expiryDate: '2025-07-01' },
                { id: 2, name: 'Gói Nâng cao', duration: '3 tháng', price: 75000, expiryDate: '2025-09-01' },
            ],
        },
        {
            id: 1,
            code: 'INV001',
            amount: 200000,
            createdAt: '2025-06-03 09:00',
            paymentTime: '2025-06-03 10:00',
            approvedTime: '',
            approvedBy: '',
            createdBy: 'User3',
            status: 'awaiting',
            transactionCode: 'TXN124',
            transactionImage: 'https://thebank.vn/uploads/2023/04/24/thebank_hinhanhbillchuyentienvietcombankvacachtaobill2_1682330269.jpg',
            note: 'Hóa đơn chờ duyệt',
            packages: [
                { id: 4, name: 'Gói Tiêu chuẩn', duration: '2 tháng', price: 200000, expiryDate: '2025-08-03' },
            ],
        },
    ];

    // Main initialization function
    const initializeView = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = parseInt(urlParams.get('id'));
        const orderPayment = viewOrderPayments.find(p => p.id === paymentId) || viewOrderPayments[0];

        if (!orderPayment) {
            adminLayout.showNotification('Không có hóa đơn nào để hiển thị', 'danger');
            setTimeout(() => adminLayout.loadContent('payments'), 2000);
            return;
        }

        populateForm(orderPayment);
        populatePackages(orderPayment.packages);
        updateButtonVisibility(orderPayment.status);
    };

    // Populate form fields
    const populateForm = ({ code, amount, createdAt, paymentTime, approvedTime, approvedBy, createdBy, status, transactionCode, transactionImage, note }) => {
        const statusText = {
            pending: 'Mới tạo',
            awaiting: 'Chờ duyệt',
            approved: 'Đã duyệt',
            rejected: 'Từ chối',
        }[status] || status;

        const fields = {
            invoiceCode: code,
            amount: formatCurrency(amount),
            createdAt,
            createdBy,
            status: statusText,
            note,
            invoiceCodeDesktop: code,
            amountDesktop: formatCurrency(amount),
            createdAtDesktop: createdAt,
            createdByDesktop: createdBy,
            statusDesktop: statusText,
            noteDesktop: note,
        };

        if (status !== 'pending') {
            fields.paymentTime = paymentTime || '-';
            fields.paymentTimeDesktop = paymentTime || '-';
            fields.transactionCode = transactionCode || '-';
            fields.transactionCodeDesktop = transactionCode || '-';
        }

        if (status === 'approved' || status === 'rejected') {
            fields.approvedTime = approvedTime || '-';
            fields.approvedTimeDesktop = approvedTime || '-';
            fields.approvedBy = approvedBy || '-';
            fields.approvedByDesktop = approvedBy || '-';
        }

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value || '';
        });

        // Handle transaction image
        const transactionImageMobile = document.getElementById('transactionImageMobile');
        const transactionImageDesktop = document.getElementById('transactionImageDesktop');
        if (transactionImage && status !== 'pending') {
            transactionImageMobile.innerHTML = `<img src="${transactionImage}" alt="Ảnh giao dịch" class="img-fluid">`;
            transactionImageDesktop.innerHTML = `<img src="${transactionImage}" alt="Ảnh giao dịch" class="img-fluid">`;
        } else {
            transactionImageMobile.innerHTML = '<p>Không có ảnh</p>';
            transactionImageDesktop.innerHTML = '<p>Không có ảnh</p>';
        }

        ['paymentTimeContainer', 'transactionCodeContainer', 'transactionImageContainer'].forEach(id => {
            document.getElementById(id).style.display = status === 'pending' ? 'none' : 'block';
        });
        ['paymentTimeContainerDesktop', 'transactionCodeContainerDesktop', 'transactionImageContainerDesktop'].forEach(id => {
            document.getElementById(id).style.display = status === 'pending' ? 'none' : 'block';
        });
        ['approvedTimeContainer', 'approvedTimeContainerDesktop', 'approvedByContainer', 'approvedByContainerDesktop'].forEach(id => {
            document.getElementById(id).style.display = (status === 'approved' || status === 'rejected') ? 'block' : 'none';
        });
    };

    // Populate packages for desktop and mobile
    const populatePackages = (packages) => {
        const tableBody = document.getElementById('packagesTableBody');
        const mobileList = document.getElementById('mobilePackagesList');

        tableBody.innerHTML = '';
        mobileList.innerHTML = '';

        packages.forEach((pkg, index) => {
            // Desktop table row
            const row = document.createElement('tr');
            row.className = 'package-row';
            row.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td>${pkg.name}</td>
                <td>${pkg.duration}</td>
                <td>${formatCurrency(pkg.price)}</td>
                <td>${pkg.expiryDate}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm me-1" onclick="viewPackageDetails(${pkg.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);

            // Mobile card
            const card = document.createElement('div');
            card.className = 'package-card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title">Gói ${index + 1}</div>
                    <div>
                        <button type="button" class="btn btn-outline-primary btn-sm me-2" onclick="viewPackageDetails(${pkg.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="mb-3"><label class="form-label">Gói dịch vụ:</label> <p>${pkg.name}</p></div>
                <div class="mb-3"><label class="form-label">Thời hạn:</label> <p>${pkg.duration}</p></div>
                <div class="mb-3"><label class="form-label">Giá tiền:</label> <p>${formatCurrency(pkg.price)}</p></div>
                <div class="mb-3"><label class="form-label">Ngày hết hạn:</label> <p>${pkg.expiryDate}</p></div>
            `;
            mobileList.appendChild(card);
        });
    };

    // Update button visibility based on status
    const updateButtonVisibility = (status) => {
        const approveButton = document.getElementById('approveButton');
        const rejectButton = document.getElementById('rejectButton');
        const viewInvoiceButton = document.getElementById('viewInvoiceButton');
        const reapproveButton = document.getElementById('reapproveButton');

        approveButton.style.display = status === 'awaiting' ? 'block' : 'none';
        rejectButton.style.display = status === 'awaiting' ? 'block' : 'none';
        viewInvoiceButton.style.display = status === 'approved' ? 'block' : 'none';
        reapproveButton.style.display = status === 'rejected' ? 'block' : 'none';
    };

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + ' VND';

    // Show toast notification
    const showToast = (message) => {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div id="${toastId}" class="toast toast-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
                <div class="toast-header">
                    <strong class="me-auto">Thông báo</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;
        toastContainer.innerHTML += toastHTML;

        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
    };

    // Approve payment
    const approvePayment = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = parseInt(urlParams.get('id'));
        const payment = viewOrderPayments.find(p => p.id === paymentId);

        if (!payment || payment.status !== 'awaiting') {
            adminLayout.showNotification('Không thể duyệt thanh toán', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmApproveModal'));
        document.getElementById('confirmApproveCode').textContent = `Mã đơn: ${payment.code}`;

        const confirmButton = document.getElementById('confirmApproveButton');
        const confirmHandler = () => {
            payment.status = 'approved';
            payment.approvedBy = 'Admin';
            payment.approvedTime = new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
            populateForm(payment);
            updateButtonVisibility(payment.status);
            modal.hide();
            showToast(`Thanh toán ${payment.code} đã được duyệt`);
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    };

    // Reject payment
    const rejectPayment = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = parseInt(urlParams.get('id'));
        const payment = viewOrderPayments.find(p => p.id === paymentId);

        if (!payment || payment.status !== 'awaiting') {
            adminLayout.showNotification('Không thể từ chối thanh toán', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmRejectModal'));
        document.getElementById('confirmRejectCode').textContent = `Mã đơn: ${payment.code}`;

        const confirmButton = document.getElementById('confirmRejectButton');
        const confirmHandler = () => {
            const reason = document.getElementById('rejectReason').value;
            if (!reason) {
                adminLayout.showNotification('Vui lòng nhập lý do từ chối', 'warning');
                return;
            }
            payment.status = 'rejected';
            payment.note = `${payment.note ? payment.note + '\n' : ''}Lý do từ chối: ${reason}`;
            populateForm(payment);
            updateButtonVisibility(payment.status);
            modal.hide();
            showToast(`Thanh toán ${payment.code} đã bị từ chối`);
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    };

    // Reapprove payment
    const reapprovePayment = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = parseInt(urlParams.get('id'));
        const payment = viewOrderPayments.find(p => p.id === paymentId);

        if (!payment || payment.status !== 'rejected') {
            adminLayout.showNotification('Không thể duyệt lại thanh toán', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmReapproveModal'));
        document.getElementById('confirmReapproveCode').textContent = `Mã đơn: ${payment.code}`;

        const confirmButton = document.getElementById('confirmReapproveButton');
        const confirmHandler = () => {
            payment.status = 'approved';
            payment.approvedBy = 'Admin';
            payment.approvedTime = new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
            populateForm(payment);
            updateButtonVisibility(payment.status);
            modal.hide();
            showToast(`Thanh toán ${payment.code} đã được duyệt lại`);
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    };

    // View invoice PDF
    const viewInvoice = () => {
        window.open('../../../../assets/pdf/invoice.pdf', '_blank');
    };

    // View package details in modal
    const viewPackageDetails = (packageId) => {
        console.log('viewPackageDetails called with packageId:', packageId);
        const filePaths = window.adminLayout.getFilePaths('view-service-package');
        if (filePaths && filePaths.html) {
            const modalBody = document.getElementById('viewPackageModalBody');
            modalBody.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';

            const modal = new bootstrap.Modal(document.getElementById('viewPackageModal'));
            modal.show();

            fetch(filePaths.html)
                .then(response => response.text())
                .then(data => modalBody.innerHTML = data)
                .catch(error => {
                    console.error('Error loading view-service-package:', error);
                    modalBody.innerHTML = '<p class="text-danger">Lỗi tải chi tiết gói dịch vụ.</p>';
                });
        } else {
            adminLayout.showNotification('Không thể tải trang chi tiết', 'danger');
        }
    };

    // Run initialization when the DOM is fully loaded and content is loaded
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.service-package-form')) initializeView();
    });
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'view-order-payment' && document.querySelector('.service-package-form')) initializeView();
    });

    // Expose functions to global scope
    window.approvePayment = approvePayment;
    window.rejectPayment = rejectPayment;
    window.reapprovePayment = reapprovePayment;
    window.viewInvoice = viewInvoice;
    window.viewPackageDetails = viewPackageDetails;
})();