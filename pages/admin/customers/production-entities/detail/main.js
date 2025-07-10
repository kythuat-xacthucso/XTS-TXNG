(function () {
    // Sample data
    const entityData = {
        id: 1,
        code: 'CT001',
        name: 'Công ty ABC',
        phone: '0901234567',
        email: 'info@abc.com',
        fullName: 'Công ty TNHH ABC',
        englishName: 'ABC Ltd.',
        shortName: 'ABC',
        taxCode: '123456789',
        regDate: '01/01/2020',
        gcpCode: 'GCP123456',
        regPlace: 'Hà Nội',
        regAddress: '123 Đường ABC, Quận XYZ, Hà Nội',
        website: 'https://abc.com',
        youtube: 'https://youtube.com/abc',
        mapUrl: 'https://maps.google.com/maps?q=Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        description: 'Đây là mô tả ngắn về chủ thể...',
        type: 'Tổ chức',
        status: 'active',
        createdAt: '15/01/2023',
        createdBy: 'admin01',
        owner: {
            name: 'Nguyễn Văn A',
            phone: '0912345678',
            email: 'nguyenva@example.com',
            address: '99 Đường DEF, TP.HCM',
            avatar: 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png'
        },
        images: {
            logo: 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
            dkkd: [
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png'
            ],
            others: [
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png',
                'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png'
            ]
        }
    };

    const usersData = [
        { id: 1, name: 'Nguyễn Văn B', phone: '0912345679', email: 'userb@example.com', address: '123 Đường XYZ, Hà Nội', status: 'active' },
        { id: 2, name: 'Trần Thị C', phone: '0923456780', email: 'userc@example.com', address: '456 Đường DEF, TP.HCM', status: 'unlinked' }
    ];

    const productsData = [
        { id: 1, code: 'SP001', name: 'Sản phẩm A', gtin: '1234567890123', lookupStatus: 'allowed', status: 'active' },
        { id: 2, code: 'SP002', name: 'Sản phẩm B', gtin: '9876543210987', lookupStatus: 'disallowed', status: 'locked' }
    ];

    const servicesData = [
        { id: 1, name: 'Gói cơ bản', price: '1,000,000 VNĐ', duration: '12 tháng', purchaseDate: '01/01/2025', expiryDate: '01/01/2026', status: 'active' },
        { id: 2, name: 'Gói nâng cao', price: '2,000,000 VNĐ', duration: '6 tháng', purchaseDate: '01/06/2024', expiryDate: '01/12/2024', status: 'expired' }
    ];

    const stampsData = [
        { id: 1, quantity: 100, from: 'T001', to: 'T100', printedAt: '01/07/2025 10:00', printedBy: 'admin01', status: 'downloaded', stamps: [
            { number: 'T001', identifier: 'ID001', status: 'blank' },
            { number: 'T002', identifier: 'ID002', status: 'activated' }
        ]},
        { id: 2, quantity: 50, from: 'T101', to: 'T150', printedAt: '02/07/2025 14:00', printedBy: 'admin02', status: 'not_downloaded', stamps: [
            { number: 'T101', identifier: 'ID101', status: 'sold' }
        ]}
    ];

    const paymentsData = [
        { id: 1, orderCode: 'DH001', amount: '1,500,000 VNĐ', createdAt: '01/07/2025 09:00', paidAt: '01/07/2025 10:00', approvedBy: 'admin01', status: 'approved', services: [
            { id: 1, name: 'Gói cơ bản', duration: '12 tháng', price: '1,000,000 VNĐ', expiryDate: '01/01/2026' }
        ]},
        { id: 2, orderCode: 'DH002', amount: '500,000 VNĐ', createdAt: '02/07/2025 11:00', paidAt: '', approvedBy: '', status: 'pending', services: [
            { id: 2, name: 'Gói nâng cao', duration: '6 tháng', price: '500,000 VNĐ', expiryDate: '02/01/2026' }
        ]}
    ];

    // State for pagination
    const paginationState = {
        users: { currentPage: 1, itemsPerPage: 10 },
        products: { currentPage: 1, itemsPerPage: 10 },
        services: { currentPage: 1, itemsPerPage: 10 },
        stamps: { currentPage: 1, itemsPerPage: 10 },
        payments: { currentPage: 1, itemsPerPage: 10 }
    };

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div id="${toastId}" class="toast toast-${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
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
    }

    // Navigation
    function goBack() {
        window.adminLayout.loadContent('manage-entities-list');
    }

    function editEntity() {
        window.adminLayout.loadContent('edit-entity');
    }

    function toggleLock() {
        const isLocked = entityData.status === 'locked';
        const modalId = isLocked ? 'confirmUnlockModal' : 'confirmLockModal';
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        document.getElementById(isLocked ? 'confirmUnlockEntityName' : 'confirmLockEntityName').textContent = entityData.name;

        const confirmButton = document.getElementById(isLocked ? 'confirmUnlockButton' : 'confirmLockButton');
        const confirmHandler = () => {
            entityData.status = isLocked ? 'active' : 'locked';
            document.getElementById('companyStatus').textContent = isLocked ? 'Đang hoạt động' : 'Đã khóa';
            document.getElementById('companyStatus').className = `badge ${isLocked ? 'bg-success' : 'bg-danger'}`;
            document.getElementById('lockButton').textContent = isLocked ? 'Khóa' : 'Mở khóa';
            document.getElementById('lockButton').className = `btn btn-${isLocked ? 'danger' : 'success'}`;
            modal.hide();
            showToast(`Chủ thể ${entityData.name} đã được ${isLocked ? 'mở khóa' : 'khóa'} thành công`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    }

    // Image Preview
    function setupImagePreview() {
        document.querySelectorAll('[data-img-src]').forEach(img => {
            img.addEventListener('click', () => {
                document.getElementById('previewImage').src = img.dataset.imgSrc;
            });
        });
    }

    // Render Entity Info
    function renderEntityInfo() {
        document.getElementById('companyName').textContent = entityData.name;
        document.getElementById('companyStatus').textContent = entityData.status === 'active' ? 'Đang hoạt động' : 'Đã khóa';
        document.getElementById('companyStatus').className = `badge ${entityData.status === 'active' ? 'bg-success' : 'bg-danger'}`;
        document.getElementById('lockButton').textContent = entityData.status === 'active' ? 'Khóa' : 'Mở khóa';
        document.getElementById('lockButton').className = `btn btn-${entityData.status === 'active' ? 'danger' : 'success'}`;

        document.getElementById('entityCode').textContent = entityData.code;
        document.getElementById('entityName').textContent = entityData.name;
        document.getElementById('entityPhone').textContent = entityData.phone;
        document.getElementById('entityEmail').textContent = entityData.email;
        document.getElementById('entityFullName').textContent = entityData.fullName;
        document.getElementById('entityEnglishName').textContent = entityData.englishName;
        document.getElementById('entityShortName').textContent = entityData.shortName;
        document.getElementById('entityTaxCode').textContent = entityData.taxCode;
        document.getElementById('entityRegDate').textContent = entityData.regDate;
        document.getElementById('entityGCP').textContent = entityData.gcpCode;
        document.getElementById('entityRegPlace').textContent = entityData.regPlace;
        document.getElementById('entityRegAddress').textContent = entityData.regAddress;
        document.getElementById('entityWebsite').href = entityData.website;
        document.getElementById('entityWebsite').textContent = entityData.website;
        document.getElementById('entityYoutube').href = entityData.youtube;
        document.getElementById('entityYoutube').textContent = entityData.youtube;
        document.getElementById('entityMap').src = entityData.mapUrl;
        document.getElementById('entityDescription').textContent = entityData.description;
        document.getElementById('entityType').textContent = entityData.type;
        document.getElementById('entityCreatedAt').textContent = entityData.createdAt;
        document.getElementById('entityCreatedBy').textContent = entityData.createdBy;
        document.getElementById('ownerName').textContent = entityData.owner.name;
        document.getElementById('ownerPhone').textContent = entityData.owner.phone;
        document.getElementById('ownerEmail').textContent = entityData.owner.email;
        document.getElementById('ownerAddress').textContent = entityData.owner.address;
    }

    // Render Users
    function renderUsers(data) {
        const tableBody = document.getElementById('userTableBody');
        const cardBody = document.getElementById('userCardBody');
        if (!tableBody || !cardBody) return;

        tableBody.innerHTML = '';
        cardBody.innerHTML = '';
        const startIndex = (paginationState.users.currentPage - 1) * paginationState.users.itemsPerPage;
        const endIndex = startIndex + paginationState.users.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>`;
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById('userPagination').innerHTML = '';
            document.getElementById('userMobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((user, index) => {
            const statusText = user.status === 'active' ? 'Đang hoạt động' : 'Hủy liên kết';
            const statusClass = user.status === 'active' ? 'bg-success' : 'bg-danger';
            const tableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                    <td>${user.address}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-buttons">
                            ${user.status === 'active' ? `
                                <button class="btn btn-outline-danger btn-sm" title="Hủy liên kết" onclick="unlinkUser(${user.id})">
                                    <i class="fas fa-unlink"></i>
                                </button>
                            ` : `
                                <button class="btn btn-outline-success btn-sm" title="Liên kết lại" onclick="linkUser(${user.id})">
                                    <i class="fas fa-link"></i>
                                </button>
                            `}
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;

            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">Tên người dùng: ${user.name}</p>
                    <p class="card-text">Số điện thoại: ${user.phone}</p>
                    <p class="card-text">Email: ${user.email}</p>
                    <p class="card-text">Địa chỉ: ${user.address}</p>
                    <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                    <div class="action-buttons">
                        ${user.status === 'active' ? `
                            <button class="btn btn-outline-danger btn-sm" title="Hủy liên kết" onclick="unlinkUser(${user.id})">
                                <i class="fas fa-unlink"></i>
                            </button>
                        ` : `
                            <button class="btn btn-outline-success btn-sm" title="Liên kết lại" onclick="linkUser(${user.id})">
                                <i class="fas fa-link"></i>
                            </button>
                        `}
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'userPagination', 'users', changeUserPage);
        renderPagination(data, 'userMobilePagination', 'users', changeUserPage);
    }

    // Render Products
    function renderProducts(data) {
        const tableBody = document.getElementById('productTableBody');
        const cardBody = document.getElementById('productCardBody');
        if (!tableBody || !cardBody) return;

        tableBody.innerHTML = '';
        cardBody.innerHTML = '';
        const startIndex = (paginationState.products.currentPage - 1) * paginationState.products.itemsPerPage;
        const endIndex = startIndex + paginationState.products.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>`;
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById('productPagination').innerHTML = '';
            document.getElementById('productMobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((product, index) => {
            const lookupText = product.lookupStatus === 'allowed' ? 'Cho phép' : 'Không cho phép';
            const lookupClass = product.lookupStatus === 'allowed' ? 'bg-success' : 'bg-danger';
            const statusText = product.status === 'active' ? 'Đang hoạt động' : 'Khóa';
            const statusClass = product.status === 'active' ? 'bg-success' : 'bg-danger';
            const tableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${product.code}</td>
                    <td>${product.name}</td>
                    <td>${product.gtin}</td>
                    <td><span class="badge ${lookupClass}">${lookupText}</span></td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-buttons">
                            ${product.status === 'locked' ? '' : product.lookupStatus === 'allowed' ? `
                                <button class="btn btn-outline-danger btn-sm" title="Không cho phép tra cứu" onclick="disallowLookup(${product.id})">
                                    <i class="fas fa-ban"></i>
                                </button>
                            ` : `
                                <button class="btn btn-outline-success btn-sm" title="Cho phép tra cứu" onclick="allowLookup(${product.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                            `}
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;

            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Mã sản phẩm: ${product.code}</p>
                    <p class="card-text">Mã GTIN: ${product.gtin}</p>
                    <p class="card-text">Trạng thái tra cứu: <span class="badge ${lookupClass}">${lookupText}</span></p>
                    <p class="card-text">Trạng thái: <span class="badge ${statusClass}">${statusText}</span></p>
                    <div class="action-buttons">
                        ${product.status === 'locked' ? '' : product.lookupStatus === 'allowed' ? `
                            <button class="btn btn-outline-danger btn-sm" title="Không cho phép tra cứu" onclick="disallowLookup(${product.id})">
                                <i class="fas fa-ban"></i>
                            </button>
                        ` : `
                            <button class="btn btn-outline-success btn-sm" title="Cho phép tra cứu" onclick="allowLookup(${product.id})">
                                <i class="fas fa-check"></i>
                            </button>
                        `}
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'productPagination', 'products', changeProductPage);
        renderPagination(data, 'productMobilePagination', 'products', changeProductPage);
    }

    // Render Services
    function renderServices(data) {
        const tableBody = document.getElementById('serviceTableBody');
        const cardBody = document.getElementById('serviceCardBody');
        if (!tableBody || !cardBody) return;

        tableBody.innerHTML = '';
        cardBody.innerHTML = '';
        const startIndex = (paginationState.services.currentPage - 1) * paginationState.services.itemsPerPage;
        const endIndex = startIndex + paginationState.services.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>`;
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById('servicePagination').innerHTML = '';
            document.getElementById('serviceMobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((service, index) => {
            const statusText = service.status === 'active' ? 'Đang sử dụng' : 'Hết hạn';
            const statusClass = service.status === 'active' ? 'bg-success' : 'bg-danger';
            const tableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${service.name}</td>
                    <td>${service.price}</td>
                    <td>${service.duration}</td>
                    <td>${service.purchaseDate}</td>
                    <td>${service.expiryDate}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;

            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">Giá tiền: ${service.price}</p>
                    <p class="card-text">Thời gian: ${service.duration}</p>
                    <p class="card-text">Thời gian mua: ${service.purchaseDate}</p>
                    <p class="card-text">Thời gian hết hạn: ${service.expiryDate}</p>
                    <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'servicePagination', 'services', changeServicePage);
        renderPagination(data, 'serviceMobilePagination', 'services', changeServicePage);
    }

    // Render Stamps
    function renderStamps(data) {
        const tableBody = document.getElementById('stampTableBody');
        const cardBody = document.getElementById('stampCardBody');
        if (!tableBody || !cardBody) return;

        tableBody.innerHTML = '';
        cardBody.innerHTML = '';
        const startIndex = (paginationState.stamps.currentPage - 1) * paginationState.stamps.itemsPerPage;
        const endIndex = startIndex + paginationState.stamps.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="8" class="text-center">Không có dữ liệu</td></tr>`;
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById('stampPagination').innerHTML = '';
            document.getElementById('stampMobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((stamp, index) => {
            const statusText = stamp.status === 'downloaded' ? 'Đã lấy file in' : 'Chưa lấy file in';
            const statusClass = stamp.status === 'downloaded' ? 'bg-success' : 'bg-warning';
            const tableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${stamp.quantity}</td>
                    <td>${stamp.from}</td>
                    <td>${stamp.to}</td>
                    <td>${stamp.printedAt}</td>
                    <td>${stamp.printedBy}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm me-1" title="Xem chi tiết" onclick="viewStampDetails(${stamp.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-success btn-sm me-1" title="Tải xuống file Excel" onclick="downloadStampExcel(${stamp.id})">
                                <i class="fas fa-file-excel"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" title="Tải xuống file PDF" onclick="downloadStampPDF(${stamp.id})">
                                <i class="fas fa-file-pdf"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;

            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">Lượt in #${stamp.id}</h5>
                    <p class="card-text">Số lượng: ${stamp.quantity}</p>
                    <p class="card-text">Từ số: ${stamp.from}</p>
                    <p class="card-text">Đến số: ${stamp.to}</p>
                    <p class="card-text">Thời gian in: ${stamp.printedAt}</p>
                    <p class="card-text">Người in: ${stamp.printedBy}</p>
                    <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm me-1" title="Xem chi tiết" onclick="viewStampDetails(${stamp.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-success btn-sm me-1" title="Tải xuống file Excel" onclick="downloadStampExcel(${stamp.id})">
                            <i class="fas fa-file-excel"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" title="Tải xuống file PDF" onclick="downloadStampPDF(${stamp.id})">
                            <i class="fas fa-file-pdf"></i>
                        </button>
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'stampPagination', 'stamps', changeStampPage);
        renderPagination(data, 'stampMobilePagination', 'stamps', changeStampPage);
    }

    // Render Payments
    function renderPayments(data) {
        const tableBody = document.getElementById('paymentTableBody');
        const cardBody = document.getElementById('paymentCardBody');
        if (!tableBody || !cardBody) return;

        tableBody.innerHTML = '';
        cardBody.innerHTML = '';
        const startIndex = (paginationState.payments.currentPage - 1) * paginationState.payments.itemsPerPage;
        const endIndex = startIndex + paginationState.payments.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="8" class="text-center">Không có dữ liệu</td></tr>`;
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById('paymentPagination').innerHTML = '';
            document.getElementById('paymentMobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((payment, index) => {
            const statusText = payment.status === 'approved' ? 'Đã duyệt' : payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán';
            const statusClass = payment.status === 'approved' ? 'bg-success' : payment.status === 'paid' ? 'bg-primary' : 'bg-warning';
            const tableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${payment.orderCode}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.createdAt}</td>
                    <td>${payment.paidAt || '-'}</td>
                    <td>${payment.approvedBy || '-'}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết" onclick="viewPaymentDetails(${payment.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;

            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">${payment.orderCode}</h5>
                    <p class="card-text">Số tiền: ${payment.amount}</p>
                    <p class="card-text">Thời gian tạo: ${payment.createdAt}</p>
                    <p class="card-text">Thời gian thanh toán: ${payment.paidAt || '-'}</p>
                    <p class="card-text">Người duyệt: ${payment.approvedBy || '-'}</p>
                    <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết" onclick="viewPaymentDetails(${payment.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'paymentPagination', 'payments', changePaymentPage);
        renderPagination(data, 'paymentMobilePagination', 'payments', changePaymentPage);
    }

    // Render Pagination
    function renderPagination(data, paginationId, stateKey, changePageFn) {
        const totalPages = Math.ceil(data.length / paginationState[stateKey].itemsPerPage);
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${paginationState[stateKey].currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="${changePageFn.name}(${paginationState[stateKey].currentPage - 1}); return false;"><</a>`;
        pagination.appendChild(prevLi);

        const maxVisiblePages = 5;
        let startPage = Math.max(1, paginationState[stateKey].currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            const firstLi = document.createElement('li');
            firstLi.className = 'page-item';
            firstLi.innerHTML = `<a class="page-link" href="#" onclick="${changePageFn.name}(1)">1</a>`;
            pagination.appendChild(firstLi);

            if (startPage > 2) {
                const ellipsisLi = document.createElement('li');
                ellipsisLi.className = 'page-item disabled';
                ellipsisLi.innerHTML = '<a class="page-link" href="#">...</a>';
                pagination.appendChild(ellipsisLi);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === paginationState[stateKey].currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="${changePageFn.name}(${i}); return false;">${i}</a>`;
            pagination.appendChild(li);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsisLi = document.createElement('li');
                ellipsisLi.className = 'page-item disabled';
                ellipsisLi.innerHTML = '<a class="page-link" href="#">...</a>';
                pagination.appendChild(ellipsisLi);
            }

            const lastLi = document.createElement('li');
            lastLi.className = 'page-item';
            lastLi.innerHTML = `<a class="page-link" href="#" onclick="${changePageFn.name}(${totalPages})">${totalPages}</a>`;
            pagination.appendChild(lastLi);
        }

        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${paginationState[stateKey].currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="${changePageFn.name}(${paginationState[stateKey].currentPage + 1}); return false;">></a>`;
        pagination.appendChild(nextLi);
    }

    // Change Page Functions
    function changeUserPage(page) {
        if (page < 1) page = 1;
        if (page > Math.ceil(usersData.length / paginationState.users.itemsPerPage)) page = Math.ceil(usersData.length / paginationState.users.itemsPerPage);
        paginationState.users.currentPage = page;
        renderUsers(usersData);
    }

    function changeProductPage(page) {
        if (page < 1) page = 1;
        if (page > Math.ceil(productsData.length / paginationState.products.itemsPerPage)) page = Math.ceil(productsData.length / paginationState.products.itemsPerPage);
        paginationState.products.currentPage = page;
        renderProducts(productsData);
    }

    function changeServicePage(page) {
        if (page < 1) page = 1;
        if (page > Math.ceil(servicesData.length / paginationState.services.itemsPerPage)) page = Math.ceil(servicesData.length / paginationState.services.itemsPerPage);
        paginationState.services.currentPage = page;
        renderServices(servicesData);
    }

    function changeStampPage(page) {
        if (page < 1) page = 1;
        if (page > Math.ceil(stampsData.length / paginationState.stamps.itemsPerPage)) page = Math.ceil(stampsData.length / paginationState.stamps.itemsPerPage);
        paginationState.stamps.currentPage = page;
        renderStamps(stampsData);
    }

    function changePaymentPage(page) {
        if (page < 1) page = 1;
        if (page > Math.ceil(paymentsData.length / paginationState.payments.itemsPerPage)) page = Math.ceil(paymentsData.length / paginationState.payments.itemsPerPage);
        paginationState.payments.currentPage = page;
        renderPayments(paymentsData);
    }

    // Change Items Per Page
    function changeUserItemsPerPage() {
        const select = document.getElementById('userItemsPerPage') || document.getElementById('userMobileItemsPerPage');
        paginationState.users.itemsPerPage = parseInt(select.value);
        paginationState.users.currentPage = 1;
        renderUsers(usersData);
    }

    function changeProductItemsPerPage() {
        const select = document.getElementById('productItemsPerPage') || document.getElementById('productMobileItemsPerPage');
        paginationState.products.itemsPerPage = parseInt(select.value);
        paginationState.products.currentPage = 1;
        renderProducts(productsData);
    }

    function changeServiceItemsPerPage() {
        const select = document.getElementById('serviceItemsPerPage') || document.getElementById('serviceMobileItemsPerPage');
        paginationState.services.itemsPerPage = parseInt(select.value);
        paginationState.services.currentPage = 1;
        renderServices(servicesData);
    }

    function changeStampItemsPerPage() {
        const select = document.getElementById('stampItemsPerPage') || document.getElementById('stampMobileItemsPerPage');
        paginationState.stamps.itemsPerPage = parseInt(select.value);
        paginationState.stamps.currentPage = 1;
        renderStamps(stampsData);
    }

    function changePaymentItemsPerPage() {
        const select = document.getElementById('paymentItemsPerPage') || document.getElementById('paymentMobileItemsPerPage');
        paginationState.payments.itemsPerPage = parseInt(select.value);
        paginationState.payments.currentPage = 1;
        renderPayments(paymentsData);
    }

    // User Actions
    function linkUser(userId) {
        const user = usersData.find(u => u.id === userId);
        if (!user) {
            showToast('Không tìm thấy người dùng', 'error');
            return;
        }
        const modal = new bootstrap.Modal(document.getElementById('confirmLinkUserModal'));
        document.getElementById('confirmLinkUserName').textContent = user.name;

        const confirmButton = document.getElementById('confirmLinkUserButton');
        const confirmHandler = () => {
            user.status = 'active';
            renderUsers(usersData);
            modal.hide();
            showToast(`Đã liên kết lại người dùng ${user.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    }

    function unlinkUser(userId) {
        const user = usersData.find(u => u.id === userId);
        if (!user) {
            showToast('Không tìm thấy người dùng', 'error');
            return;
        }
        const modal = new bootstrap.Modal(document.getElementById('confirmUnlinkUserModal'));
        document.getElementById('confirmUnlinkUserName').textContent = user.name;

        const confirmButton = document.getElementById('confirmUnlinkUserButton');
        const confirmHandler = () => {
            user.status = 'unlinked';
            renderUsers(usersData);
            modal.hide();
            showToast(`Đã hủy liên kết người dùng ${user.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    }

    function setupAddUserModal() {
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        const searchTypeRadios = document.getElementsByName('userSearchType');
        const searchInput = document.getElementById('userSearchInput');
        const userInfo = document.getElementById('userInfo');
        const userWarning = document.getElementById('userWarning');
        const checkButton = document.getElementById('checkUserButton');
        const linkButton = document.getElementById('linkUserButton');

        searchTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                searchInput.placeholder = radio.value === 'phone' ? 'Nhập số điện thoại' : 'Nhập email';
                searchInput.value = '';
                userInfo.classList.add('d-none');
                userWarning.classList.add('d-none');
                checkButton.classList.remove('d-none');
                linkButton.classList.add('d-none');
            });
        });

        checkButton.addEventListener('click', () => {
            const searchValue = searchInput.value.trim();
            if (!searchValue) {
                showToast('Vui lòng nhập số điện thoại hoặc email', 'error');
                return;
            }

            const searchType = document.querySelector('input[name="userSearchType"]:checked').value;
            const existingUser = usersData.find(u => (searchType === 'phone' ? u.phone === searchValue : u.email === searchValue));

            if (existingUser && existingUser.status === 'active') {
                userWarning.textContent = 'Người dùng này đã được liên kết với chủ thể này';
                userWarning.classList.remove('d-none');
                userInfo.classList.add('d-none');
                checkButton.classList.remove('d-none');
                linkButton.classList.add('d-none');
            } else if (!existingUser) {
                userWarning.textContent = 'Người dùng không tồn tại trong hệ thống';
                userWarning.classList.remove('d-none');
                userInfo.classList.add('d-none');
                checkButton.classList.remove('d-none');
                linkButton.classList.add('d-none');
            } else {
                userWarning.classList.add('d-none');
                userInfo.classList.remove('d-none');
                document.getElementById('userName').value = existingUser.name;
                document.getElementById('userPhone').value = existingUser.phone;
                document.getElementById('userEmail').value = existingUser.email;
                document.getElementById('userAddress').value = existingUser.address;
                checkButton.classList.add('d-none');
                linkButton.classList.remove('d-none');
            }
        });

        linkButton.addEventListener('click', () => {
            const searchValue = searchInput.value.trim();
            const searchType = document.querySelector('input[name="userSearchType"]:checked').value;
            const user = usersData.find(u => (searchType === 'phone' ? u.phone === searchValue : u.email === searchValue));
            if (!user) return;

            const confirmModal = new bootstrap.Modal(document.getElementById('confirmLinkUserModal'));
            document.getElementById('confirmLinkUserName').textContent = user.name;

            const confirmButton = document.getElementById('confirmLinkUserButton');
            const confirmHandler = () => {
                user.status = 'active';
                renderUsers(usersData);
                modal.hide();
                confirmModal.hide();
                showToast(`Đã liên kết người dùng ${user.name}`, 'success');
                confirmButton.removeEventListener('click', confirmHandler);
            };

            confirmButton.removeEventListener('click', confirmHandler);
            confirmButton.addEventListener('click', confirmHandler);
            confirmModal.show();
        });
    }

    // Product Actions
    function allowLookup(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) {
            showToast('Không tìm thấy sản phẩm', 'error');
            return;
        }
        const modal = new bootstrap.Modal(document.getElementById('confirmAllowLookupModal'));
        document.getElementById('confirmAllowLookupProductName').textContent = product.name;

        const confirmButton = document.getElementById('confirmAllowLookupButton');
        const confirmHandler = () => {
            product.lookupStatus = 'allowed';
            renderProducts(productsData);
            modal.hide();
            showToast(`Đã cho phép tra cứu sản phẩm ${product.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    }

    function disallowLookup(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) {
            showToast('Không tìm thấy sản phẩm', 'error');
            return;
        }
        const modal = new bootstrap.Modal(document.getElementById('confirmDisallowLookupModal'));
        document.getElementById('confirmDisallowLookupProductName').textContent = product.name;

        const confirmButton = document.getElementById('confirmDisallowLookupButton');
        const confirmHandler = () => {
            product.lookupStatus = 'disallowed';
            renderProducts(productsData);
            modal.hide();
            showToast(`Đã không cho phép tra cứu sản phẩm ${product.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);
        modal.show();
    }

    // Stamp Actions
    function viewStampDetails(stampId) {
        const stamp = stampsData.find(s => s.id === stampId);
        if (!stamp) {
            showToast('Không tìm thấy lượt in', 'error');
            return;
        }

        document.getElementById('stampDetailQuantity').textContent = stamp.quantity;
        document.getElementById('stampDetailFrom').textContent = stamp.from;
        document.getElementById('stampDetailTo').textContent = stamp.to;
        document.getElementById('stampDetailPrintedAt').textContent = stamp.printedAt;
        document.getElementById('stampDetailPrintedBy').textContent = stamp.printedBy;
        document.getElementById('stampDetailStatus').textContent = stamp.status === 'downloaded' ? 'Đã lấy file in' : 'Chưa lấy file in';

        const tableBody = document.getElementById('stampDetailTableBody');
        tableBody.innerHTML = '';
        stamp.stamps.forEach(s => {
            const statusText = s.status === 'blank' ? 'Tem trắng' : s.status === 'activated' ? 'Đã kích hoạt' : s.status === 'sold' ? 'Đã bán' : 'Đã hủy';
            const statusClass = s.status === 'blank' ? 'bg-secondary' : s.status === 'activated' ? 'bg-success' : s.status === 'sold' ? 'bg-primary' : 'bg-danger';
            tableBody.innerHTML += `
                <tr>
                    <td>${s.number}</td>
                    <td>${s.identifier}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        });

        new bootstrap.Modal(document.getElementById('stampDetailModal')).show();
    }

    function downloadStampExcel(stampId) {
        showToast(`Đã tải xuống file Excel cho lượt in #${stampId}`, 'success');
    }

    function downloadStampPDF(stampId) {
        showToast(`Đã tải xuống file PDF cho lượt in #${stampId}`, 'success');
    }

    function setupAddStampModal() {
        const modal = new bootstrap.Modal(document.getElementById('addStampModal'));
        const confirmButton = document.getElementById('confirmAddStampButton');

        confirmButton.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('stampQuantity').value);
            if (!quantity || quantity <= 0) {
                showToast('Vui lòng nhập số lượng hợp lệ', 'error');
                return;
            }

            const confirmModal = new bootstrap.Modal(document.getElementById('confirmAddStampModal'));
            document.getElementById('confirmAddStampQuantity').textContent = quantity;

            const confirmExcelButton = document.getElementById('confirmAddStampExcelButton');
            const confirmHandler = () => {
                const newStamp = {
                    id: stampsData.length + 1,
                    quantity,
                    from: `T${String(stampsData.length * 100 + 1).padStart(3, '0')}`,
                    to: `T${String(stampsData.length * 100 + quantity).padStart(3, '0')}`,
                    printedAt: new Date().toLocaleString('vi-VN'),
                    printedBy: 'admin01',
                    status: 'downloaded',
                    stamps: Array.from({ length: quantity }, (_, i) => ({
                        number: `T${String(stampsData.length * 100 + i + 1).padStart(3, '0')}`,
                        identifier: `ID${String(stampsData.length * 100 + i + 1).padStart(3, '0')}`,
                        status: 'blank'
                    }))
                };
                stampsData.push(newStamp);
                renderStamps(stampsData);
                modal.hide();
                confirmModal.hide();
                showToast(`Đã tạo và tải file Excel cho ${quantity} tem`, 'success');
                confirmExcelButton.removeEventListener('click', confirmHandler);
            };

            confirmExcelButton.removeEventListener('click', confirmHandler);
            confirmExcelButton.addEventListener('click', confirmHandler);
            confirmModal.show();
        });
    }

    // Payment Actions
    function viewPaymentDetails(paymentId) {
        const payment = paymentsData.find(p => p.id === paymentId);
        if (!payment) {
            showToast('Không tìm thấy thanh toán', 'error');
            return;
        }

        document.getElementById('paymentDetailOrderCode').textContent = payment.orderCode;
        document.getElementById('paymentDetailAmount').textContent = payment.amount;
        document.getElementById('paymentDetailCreatedAt').textContent = payment.createdAt;
        document.getElementById('paymentDetailPaidAt').textContent = payment.paidAt || '-';
        document.getElementById('paymentDetailApprovedBy').textContent = payment.approvedBy || '-';
        document.getElementById('paymentDetailStatus').textContent = payment.status === 'approved' ? 'Đã duyệt' : payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán';

        const tableBody = document.getElementById('paymentDetailServiceTableBody');
        tableBody.innerHTML = '';
        payment.services.forEach((service, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${service.name}</td>
                    <td>${service.duration}</td>
                    <td>${service.price}</td>
                    <td>${service.expiryDate}</td>
                </tr>
            `;
        });

        new bootstrap.Modal(document.getElementById('paymentDetailModal')).show();
    }

    // Initialize
    function initialize() {
        if (!document.getElementById('companyName')) {
            console.error('Required DOM elements not found.');
            let retryCount = 0;
            const maxRetries = 3;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        if (document.getElementById('companyName')) {
                            initialize();
                        } else {
                            retryInitialize();
                        }
                    }, 100);
                } else {
                    showToast('Không thể tải giao diện chi tiết chủ thể. Vui lòng thử lại.', 'error');
                }
            }
            retryInitialize();
            return;
        }

        renderEntityInfo();
        renderUsers(usersData);
        renderProducts(productsData);
        renderServices(servicesData);
        renderStamps(stampsData);
        renderPayments(paymentsData);
        setupImagePreview();
        setupAddUserModal();
        setupAddStampModal();
    }

    // Event Listeners
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'production-entities-view') {
            initialize();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('production-entities-view')) {
            initialize();
        }
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    }

    // Expose functions to global scope
    window.goBack = goBack;
    window.editEntity = editEntity;
    window.toggleLock = toggleLock;
    window.linkUser = linkUser;
    window.unlinkUser = unlinkUser;
    window.allowLookup = allowLookup;
    window.disallowLookup = disallowLookup;
    window.viewStampDetails = viewStampDetails;
    window.downloadStampExcel = downloadStampExcel;
    window.downloadStampPDF = downloadStampPDF;
    window.viewPaymentDetails = viewPaymentDetails;
    window.changeUserPage = changeUserPage;
    window.changeProductPage = changeProductPage;
    window.changeServicePage = changeServicePage;
    window.changeStampPage = changeStampPage;
    window.changePaymentPage = changePaymentPage;
    window.changeUserItemsPerPage = changeUserItemsPerPage;
    window.changeProductItemsPerPage = changeProductItemsPerPage;
    window.changeServiceItemsPerPage = changeServiceItemsPerPage;
    window.changeStampItemsPerPage = changeStampItemsPerPage;
    window.changePaymentItemsPerPage = changePaymentItemsPerPage;
})();