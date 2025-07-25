(function () {
    // Fake data for order payment details page (scoped within IIFE)
    const viewOrderPayments = [
        {
            id: 1,
            code: 'INV001',
            amount: 175000,
            createdAt: '2025-06-01 10:00',
            paymentTime: '',
            approvedTime: '',
            createdBy: 'User1',
            customerId: 'KH001',
            status: 'pending',
            transactionCode: '',
            transactionImage: '',
            note: 'Hóa đơn cho gói cơ bản',
            packages: [
                { id: 1, name: 'Gói Cơ bản', type: 'Gói trả phí', parameter: 'Basic', quantity: 2, price: 100000, expiryDate: '2025-07-01' },
                { id: 2, name: 'Gói Nâng cao', type: 'Gói bổ sung', parameter: 'Advanced', quantity: 1, price: 75000, expiryDate: '2025-09-01' },
            ],
        },
        {
            id: 2,
            code: 'INV002',
            amount: 300000,
            createdAt: '2025-06-02 14:30',
            paymentTime: '2025-06-02 15:00',
            approvedTime: '2025-06-02 16:00',
            createdBy: 'User2',
            customerId: 'KH002',
            status: 'approved',
            transactionCode: 'TXN123',
            transactionImage: 'https://thebank.vn/uploads/2023/04/24/thebank_hinhanhbillchuyentienvietcombankvacachtaobill2_1682330269.jpg',
            note: 'Hóa đơn cho gói nâng cao',
            packages: [
                { id: 3, name: 'Gói Cao cấp', type: 'Gói trả phí', parameter: 'Standard', quantity: 1, price: 300000, expiryDate: '2025-12-02' },
            ],
        },
        
        {
            id: 3,
            code: 'INV003',
            amount: 200000,
            createdAt: '2025-06-03 09:00',
            paymentTime: '2025-06-03 10:00',
            approvedTime: '',
            createdBy: 'User3',
            customerId: 'KH003',
            status: 'awaiting',
            transactionCode: 'TXN124',
            transactionImage: 'https://thebank.vn/uploads/2023/04/24/thebank_hinhanhbillchuyentienvietcombankvacachtaobill2_1682330269.jpg',
            note: 'Hóa đơn chờ duyệt',
            packages: [
                { id: 4, name: 'Gói Tiêu chuẩn', type: 'Gói trả phí', parameter: 'Standard', quantity: 1, price: 200000, expiryDate: '2025-08-03' },
            ],
        },
    ];

    // Fake data for package details modal (kept for reference, not used in viewPackageDetails)
    const packageDetailsData = {
        1: { name: 'Gói Cơ bản', description: 'Gói dịch vụ cơ bản cho người dùng mới.', duration: '1 tháng', price: 100000, expiryDate: '2025-07-01', features: ['Hỗ trợ cơ bản', 'Truy cập hạn chế'] },
        2: { name: 'Gói Nâng cao', description: 'Gói nâng cao với nhiều tính năng bổ sung.', duration: '3 tháng', price: 75000, expiryDate: '2025-09-01', features: ['Hỗ trợ nâng cao', 'Truy cập mở rộng'] },
        3: { name: 'Gói Cao cấp', description: 'Gói cao cấp dành cho doanh nghiệp lớn.', duration: '6 tháng', price: 300000, expiryDate: '2025-12-02', features: ['Hỗ trợ 24/7', 'Tất cả tính năng'] },
        4: { name: 'Gói Tiêu chuẩn', description: 'Gói tiêu chuẩn với hiệu suất tốt.', duration: '2 tháng', price: 200000, expiryDate: '2025-08-03', features: ['Hỗ trợ tiêu chuẩn', 'Truy cập trung bình'] },
    };

    // Main initialization function
    const initializeView = () => {
        const orderPayment = viewOrderPayments.find(p => {
            const urlParams = new URLSearchParams(window.location.search);
            return p.id === parseInt(urlParams.get('id'));
        }) || viewOrderPayments[0];

        if (!orderPayment) {
            companyLayout.showNotification('Không có đơn hàng/thanh toán nào để hiển thị', 'danger');
            setTimeout(() => companyLayout.loadContent('orders-payments'), 2000);
            return;
        }

        populateForm(orderPayment);
        populatePackages(orderPayment.packages);
        updateButtonVisibility(orderPayment.status);
        initializeTooltips();
    };

    // Populate form fields
    const populateForm = ({ code, amount, createdAt, paymentTime, approvedTime, createdBy, customerId, status, transactionCode, transactionImage, note }) => {
        const statusText = {
            pending: 'Chưa thanh toán',
            approved: 'Đã thanh toán',
            awaiting: 'Chờ duyệt',
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
            modalPaymentAmountDesktop: formatCurrency(amount),
            modalTransferContentDesktop: code,
        };

        if (status !== 'pending') {
            fields.paymentTime = paymentTime;
            fields.paymentTimeDesktop = paymentTime;
            fields.transactionCode = transactionCode;
            fields.transactionCodeDesktop = transactionCode;
            fields.transactionImage = transactionImage;
            fields.transactionImageDesktop = transactionImage;
        }
        if (status === 'approved') {
            fields.approvedTime = approvedTime;
            fields.approvedTimeDesktop = approvedTime;
        }

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                if (id.includes('Image')) {
                    element.src = value || '';
                    element.parentElement.style.display = value ? 'block' : 'none';
                } else {
                    element.textContent = value || '';
                }
            }
        });

        // Populate payment modal fields
        document.getElementById('modalInvoiceCode').textContent = code;
        document.getElementById('modalCreatedAt').textContent = createdAt;
        document.getElementById('modalCreatedBy').textContent = createdBy;
        document.getElementById('modalCustomerId').textContent = customerId || '-';
        document.getElementById('modalAmount').textContent = formatCurrency(amount);
        document.getElementById('modalPaymentAmount').textContent = formatCurrency(amount);
        document.getElementById('modalTransferContent').textContent = code;

        // Hide fields based on status
        ['paymentTimeContainer', 'approvedTimeContainer', 'transactionCodeContainer', 'transactionImageContainer'].forEach(id => {
            document.getElementById(id).style.display = (status === 'pending' && !['createdAt', 'createdBy', 'status', 'note'].some(field => id.includes(field))) ? 'none' : 'block';
        });
        ['paymentTimeContainerDesktop', 'approvedTimeContainerDesktop', 'transactionCodeContainerDesktop', 'transactionImageContainerDesktop'].forEach(id => {
            document.getElementById(id).style.display = (status === 'pending' && !['createdAt', 'createdBy', 'status', 'note'].some(field => id.includes(field))) ? 'none' : 'block';
        });
        if (status !== 'approved') {
            ['approvedTimeContainer', 'approvedTimeContainerDesktop'].forEach(id => {
                document.getElementById(id).style.display = 'none';
            });
        }
    };

    // Populate packages for desktop and mobile
    const populatePackages = (packages) => {
        const tableBody = document.getElementById('packagesTableBody');
        const mobileList = document.getElementById('mobilePackagesList');

        packages.forEach((pkg, index) => {
            // Desktop table row
            const row = document.createElement('tr');
            row.className = 'package-row';
            row.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td><span class="text-content">${pkg.name}</span></td>
                <td><span class="text-content">${pkg.type}</span></td>
                <td><span class="text-content">${pkg.parameter}</span></td>
                <td><span class="text-center">${pkg.quantity}</span></td>
                <td><span class="text-content">${formatCurrency(pkg.price)}</span></td>
                <td class="text-center">
                    <button type="button" class="btn-view me-1" onclick="viewPackageDetails(${pkg.id})">
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
                        <button type="button" class="view-btn me-2" onclick="viewPackageDetails(${pkg.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tên gói</label>
                    <span class="text-content">${pkg.name}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Loại gói</label>
                    <span class="text-content">${pkg.type}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tham số</label>
                    <span class="text-content">${pkg.parameter}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Số lượng</label>
                    <span class="text-content">${pkg.quantity}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Giá tiền</label>
                    <span class="text-content">${formatCurrency(pkg.price)}</span>
                </div>
            `;
            mobileList.appendChild(card);
        });
    };

    // Update button visibility based on status
    const updateButtonVisibility = (status) => {
        const editButton = document.getElementById('editButton');
        const payButton = document.getElementById('payButton');
        const downloadButton = document.getElementById('downloadButton');

        editButton.style.display = (status === 'pending') ? 'block' : 'none';
        payButton.style.display = (status === 'pending') ? 'block' : 'none';
        downloadButton.style.display = (status === 'approved') ? 'block' : 'none';
    };

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    // Preview transaction image
    const previewTransactionImage = () => {
        const input = document.getElementById('modalTransactionImage');
        const preview = document.getElementById('modalTransactionImagePreviewImg');
        const previewContainer = document.getElementById('modalTransactionImagePreview');

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(input.files[0]);
            previewContainer.style.display = 'block';
        }
    };

    // Preview invoice
    const previewInvoice = () => {
        const modal = new bootstrap.Modal(document.getElementById('invoicePreviewModal'));
        const iframe = document.getElementById('invoicePreview');
        const downloadLink = document.getElementById('downloadInvoiceLink');
        iframe.src = '../../../../../assets/pdf/invoice.pdf';
        downloadLink.href = '../../../../../assets/pdf/invoice.pdf';
        modal.show();
    };

    // View package details in modal
    const viewPackageDetails = (packageId) => {
        const filePaths = window.companyLayout.getFilePaths('view-system-service');

        if (filePaths && filePaths.html) {
            const modalBody = document.getElementById('viewPackageModalBody');
            modalBody.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';

            const modal = new bootstrap.Modal(document.getElementById('viewPackageModal'));
            modal.show();

            fetch(filePaths.html)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load HTML: ${filePaths.html}`);
                    }
                    return response.text();
                })
                .then(data => {
                    modalBody.innerHTML = data;

                    if (filePaths.css && !document.querySelector(`link[href="${filePaths.css}"]`)) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.type = 'text/css';
                        link.href = filePaths.css;
                        document.head.appendChild(link);
                    }

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
            companyLayout.showNotification('Không thể tải trang chi tiết', 'danger');
        }
    };

    // Initialize tooltips
    const initializeTooltips = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    };

    // Handle payment submission
    const handlePaymentSubmit = () => {
        const submitButton = document.getElementById('submitPayment');
        const spinner = submitButton.querySelector('.spinner-border');
        const submitText = submitButton.querySelector('.submit-text');

        submitText.classList.add('d-none');
        spinner.classList.remove('d-none');

        setTimeout(() => {
            spinner.classList.add('d-none');
            submitText.classList.remove('d-none');
            companyLayout.showNotification('Thanh toán thành công!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
        }, 2000); // Simulate processing
    };

    document.getElementById('submitPayment').addEventListener('click', handlePaymentSubmit);

    // Run initialization when the DOM is fully loaded and content is loaded
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('orderPaymentForm')) {
            initializeView();
        }
    });
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'view-order-payment' && document.getElementById('orderPaymentForm')) {
            initializeView();
        }
    });

    // Expose functions to global scope if needed
    window.downloadInvoice = previewInvoice;
    window.viewPackageDetails = viewPackageDetails;
    window.previewTransactionImage = previewTransactionImage;
})();