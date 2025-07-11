(function () {
    // Sample data for entity details (replace with actual API call)
    const entity = {
        id: 1,
        code: "CT001",
        name: "Công ty ABC",
        fullName: "Công ty TNHH ABC",
        englishName: "ABC Ltd.",
        shortName: "ABC",
        taxCode: "123456789",
        phone: "0901234567",
        email: "info@abc.com",
        regDate: "01/01/2020",
        gcpCode: "GCP123456",
        regPlace: "Hà Nội",
        regAddress: "123 Đường ABC, Quận XYZ, Hà Nội",
        website: "https://abc.com",
        youtube: "https://youtube.com/abc",
        mapUrl: "https://maps.google.com/maps?q=Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed",
        description: "Đây là mô tả ngắn về chủ thể...",
        type: "Tổ chức",
        status: "active",
        createdAt: "15/01/2023",
        createdBy: "admin01",
        owner: {
            name: "Nguyễn Văn A",
            phone: "0912345678",
            email: "nguyenva@example.com",
            address: "99 Đường DEF, TP.HCM",
            avatar: "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
        },
        logo: "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
        dkkdImages: [
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
        ],
        otherImages: [
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
            "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
        ]
    };

    // Sample data for users tab
    const users = [
        { id: 1, name: "Nguyễn Văn B", phone: "0912345679", email: "user1@example.com", address: "123 Đường Láng, Hà Nội", status: "active" },
        { id: 2, name: "Trần Thị C", phone: "0912345680", email: "user2@example.com", address: "456 Đường Giải Phóng, Hà Nội", status: "unlinked" }
    ];

    // Sample data for entities tab
    const linkedEntities = [
        { id: 1, code: "CT002", name: "Công ty XYZ", taxCode: "987654321", phone: "0908765432", status: "active" },
        { id: 2, code: "CT003", name: "Công ty DEF", taxCode: "456789123", phone: "0908765433", status: "locked" }
    ];

    // Sample data for services tab
    const services = [
        { id: 1, name: "Gói cơ bản", price: "1,000,000 VNĐ", duration: "1 năm", purchasedAt: "01/01/2023", expiredAt: "01/01/2024", status: "expired" },
        { id: 2, name: "Gói nâng cao", price: "2,000,000 VNĐ", duration: "1 năm", purchasedAt: "01/06/2023", expiredAt: "01/06/2024", status: "active" }
    ];

    // Sample data for stamps tab
    const stamps = [
        {
            id: 1, quantity: 100, from: "000001", to: "000100", printTime: "01/07/2023 10:00", printer: "admin01", entity: "Công ty ABC", status: "fetched",
            details: [
                { serial: "000001", code: "STAMP001", status: "white" },
                { serial: "000002", code: "STAMP002", status: "activated" }
            ]
        },
        {
            id: 2, quantity: 50, from: "000101", to: "000150", printTime: "02/07/2023 14:00", printer: "admin02", entity: "Công ty XYZ", status: "not_fetched",
            details: [
                { serial: "000101", code: "STAMP101", status: "sold" },
                { serial: "000102", code: "STAMP102", status: "canceled" }
            ]
        }
    ];

    // Sample data for payments tab
    const payments = [
        {
            id: 1, code: "PAY001", amount: "1,500,000 VNĐ", createdAt: "01/01/2023", paidAt: "01/01/2023", approver: "admin01", status: "approved",
            packages: [
                { id: 1, name: "Gói cơ bản", duration: "1 năm", price: "1,000,000 VNĐ", expiredAt: "01/01/2024" },
                { id: 2, name: "Gói phụ", duration: "6 tháng", price: "500,000 VNĐ", expiredAt: "01/07/2023" }
            ]
        },
        {
            id: 2, code: "PAY002", amount: "2,000,000 VNĐ", createdAt: "01/06/2023", paidAt: "", approver: "", status: "pending",
            packages: [
                { id: 3, name: "Gói nâng cao", duration: "1 năm", price: "2,000,000 VNĐ", expiredAt: "01/06/2024" }
            ]
        }
    ];

    // Pagination states
    const paginationStates = {
        users: { currentPage: 1, itemsPerPage: 10 },
        entities: { currentPage: 1, itemsPerPage: 10 },
        services: { currentPage: 1, itemsPerPage: 10 },
        stamps: { currentPage: 1, itemsPerPage: 10 },
        payments: { currentPage: 1, itemsPerPage: 10 }
    };

    // Render entity info
    function renderEntityInfo() {
        document.getElementById('entityName').innerText = entity.name;
        document.getElementById('entityStatus').innerText = entity.status === 'active' ? 'Đang hoạt động' : 'Khóa';
        document.getElementById('entityCode').innerText = entity.code;
        document.getElementById('entityNameInfo').innerText = entity.name;
        document.getElementById('entityPhone').innerText = entity.phone;
        document.getElementById('entityEmail').innerText = entity.email;
        document.getElementById('entityFullName').innerText = entity.fullName;
        document.getElementById('entityEnglishName').innerText = entity.englishName;
        document.getElementById('entityShortName').innerText = entity.shortName;
        document.getElementById('entityTaxCode').innerText = entity.taxCode;
        document.getElementById('entityRegDate').innerText = entity.regDate;
        document.getElementById('entityGCPCode').innerText = entity.gcpCode;
        document.getElementById('entityRegPlace').innerText = entity.regPlace;
        document.getElementById('entityRegAddress').innerText = entity.regAddress;
        document.getElementById('entityWebsite').href = entity.website;
        document.getElementById('entityWebsite').innerText = entity.website.replace('https://', '');
        document.getElementById('entityYoutube').href = entity.youtube;
        document.getElementById('entityYoutube').innerText = entity.youtube.replace('https://', '');
        document.getElementById('entityMap').src = entity.mapUrl;
        document.getElementById('entityDescription').innerText = entity.description;
        document.getElementById('entityType').innerText = entity.type;
        document.getElementById('entityStatusInfo').innerText = entity.status === 'active' ? 'Đang hoạt động' : 'Khóa';
        document.getElementById('entityCreatedAt').innerText = entity.createdAt;
        document.getElementById('entityCreatedBy').innerText = entity.createdBy;
        document.getElementById('ownerName').innerText = entity.owner.name;
        document.getElementById('ownerPhone').innerText = entity.owner.phone;
        document.getElementById('ownerEmail').innerText = entity.owner.email;
        document.getElementById('ownerAddress').innerText = entity.owner.address;
        document.getElementById('ownerAvatar').src = entity.owner.avatar;
        document.querySelector('.logo-img').src = entity.logo;
        document.querySelectorAll('.dkkd-img').forEach((img, index) => {
            img.src = entity.dkkdImages[index] || entity.dkkdImages[0];
        });
        document.querySelectorAll('.other-img').forEach((img, index) => {
            img.src = entity.otherImages[index] || entity.otherImages[0];
        });

        // Update lock button
        const lockButton = document.getElementById('lockButton');
        lockButton.innerText = entity.status === 'active' ? 'Khóa' : 'Mở khóa';
        lockButton.className = `btn btn-${entity.status === 'active' ? 'danger' : 'success'}`;
    }

    // Render table for a given tab
    function renderTable(data, tableBodyId, paginationId, tab) {
        const tableBody = document.getElementById(tableBodyId);
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const state = paginationStates[tab];
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="${tab === 'entities' ? 6 : tab === 'services' ? 7 : tab === 'stamps' ? 9 : 8}" class="text-center">Không có dữ liệu</td></tr>`;
            document.getElementById(paginationId).innerHTML = '';
            return;
        }

        paginatedData.forEach((item, index) => {
            let row = '';
            if (tab === 'users') {
                const statusText = item.status === 'active' ? 'Đang hoạt động' : 'Hủy liên kết';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                row = `
                    <tr>
                        <td>${startIndex + index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td>${item.email}</td>
                        <td>${item.address}</td>
                        <td><span class="badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <div class="action-buttons">
                                ${item.status === 'active' ? `
                                    <button class="btn btn-outline-danger btn-sm" title="Hủy liên kết" onclick="unlinkUser(${item.id})">
                                        <i class="fas fa-unlink"></i>
                                    </button>
                                ` : `
                                    <button class="btn btn-outline-success btn-sm" title="Liên kết lại" onclick="linkUser(${item.id})">
                                        <i class="fas fa-link"></i>
                                    </button>
                                `}
                            </div>
                        </td>
                    </tr>
                `;
            } else if (tab === 'entities') {
                const statusText = item.status === 'active' ? 'Đang hoạt động' : 'Khóa';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                row = `
                    <tr>
                        <td>${startIndex + index + 1}</td>
                        <td>${item.code}</td>
                        <td>${item.name}</td>
                        <td>${item.taxCode}</td>
                        <td>${item.phone}</td>
                        <td><span class="badge ${statusClass}">${statusText}</span></td>
                    </tr>
                `;
            } else if (tab === 'services') {
                const statusText = item.status === 'active' ? 'Đang sử dụng' : 'Hết hạn';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                row = `
                    <tr>
                        <td>${startIndex + index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.duration}</td>
                        <td>${item.purchasedAt}</td>
                        <td>${item.expiredAt}</td>
                        <td><span class="badge ${statusClass}">${statusText}</span></td>
                    </tr>
                `;
            } else if (tab === 'stamps') {
                const statusText = item.status === 'fetched' ? 'Đã lấy file in' : 'Chưa lấy file in';
                const statusClass = item.status === 'fetched' ? 'bg-success' : 'bg-warning';
                row = `
                    <tr>
                        <td>${startIndex + index + 1}</td>
                        <td>${item.quantity}</td>
                        <td>${item.from}</td>
                        <td>${item.to}</td>
                        <td>${item.printTime}</td>
                        <td>${item.printer}</td>
                        <td>${item.entity}</td>
                        <td><span class="badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-outline-primary btn-sm me-1" title="Xem chi tiết" onclick="viewStampDetails(${item.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-outline-success btn-sm me-1" title="Tải file Excel" onclick="downloadStampExcel(${item.id})">
                                    <i class="fas fa-file-excel"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm" title="Tải file PDF" onclick="downloadStampPDF(${item.id})">
                                    <i class="fas fa-file-pdf"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            } else if (tab === 'payments') {
                const statusText = item.status === 'pending' ? 'Chưa thanh toán' : item.status === 'paid' ? 'Đã thanh toán' : 'Đã duyệt';
                const statusClass = item.status === 'pending' ? 'bg-warning' : item.status === 'paid' ? 'bg-success' : 'bg-primary';
                row = `
                    <tr>
                        <td>${startIndex + index + 1}</td>
                        <td>${item.code}</td>
                        <td>${item.amount}</td>
                        <td>${item.createdAt}</td>
                        <td>${item.paidAt || '-'}</td>
                        <td>${item.approver || '-'}</td>
                        <td><span class="badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết" onclick="viewPaymentDetails(${item.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            tableBody.innerHTML += row;
        });

        renderPagination(data, paginationId, tab);
    }

    // Render cards for a given tab (tablet/mobile)
    function renderCards(data, cardBodyId, paginationId, tab) {
        const cardBody = document.getElementById(cardBodyId);
        if (!cardBody) return;
        cardBody.innerHTML = '';
        const state = paginationStates[tab];
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            cardBody.innerHTML = `<div class="col-12 text-center">Không có dữ liệu</div>`;
            document.getElementById(paginationId).innerHTML = '';
            return;
        }

        paginatedData.forEach(item => {
            let card = '';
            if (tab === 'users') {
                const statusText = item.status === 'active' ? 'Đang hoạt động' : 'Hủy liên kết';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                card = `
                    <div class="col-12 profile-card">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Tên người dùng: ${item.name}</p>
                        <p class="card-text">Số điện thoại: ${item.phone}</p>
                        <p class="card-text">Email: ${item.email}</p>
                        <p class="card-text">Địa chỉ: ${item.address}</p>
                        <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                        <div class="action-buttons">
                            ${item.status === 'active' ? `
                                <button class="btn btn-outline-danger btn-sm me-2" title="Hủy liên kết" onclick="unlinkUser(${item.id})">
                                    <i class="fas fa-unlink"></i>
                                </button>
                            ` : `
                                <button class="btn btn-outline-success btn-sm me-2" title="Liên kết lại" onclick="linkUser(${item.id})">
                                    <i class="fas fa-link"></i>
                                </button>
                            `}
                        </div>
                    </div>
                `;
            } else if (tab === 'entities') {
                const statusText = item.status === 'active' ? 'Đang hoạt động' : 'Khóa';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                card = `
                    <div class="col-12 profile-card">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Mã chủ thể: ${item.code}</p>
                        <p class="card-text">Tên chủ thể: ${item.name}</p>
                        <p class="card-text">Mã số thuế: ${item.taxCode}</p>
                        <p class="card-text">Số điện thoại: ${item.phone}</p>
                        <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                    </div>
                `;
            } else if (tab === 'services') {
                const statusText = item.status === 'active' ? 'Đang sử dụng' : 'Hết hạn';
                const statusClass = item.status === 'active' ? 'bg-success' : 'bg-danger';
                card = `
                    <div class="col-12 profile-card">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Tên gói dịch vụ: ${item.name}</p>
                        <p class="card-text">Giá tiền: ${item.price}</p>
                        <p class="card-text">Thời gian: ${item.duration}</p>
                        <p class="card-text">Thời gian mua: ${item.purchasedAt}</p>
                        <p class="card-text">Thời gian hết hạn: ${item.expiredAt}</p>
                        <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                    </div>
                `;
            } else if (tab === 'stamps') {
                const statusText = item.status === 'fetched' ? 'Đã lấy file in' : 'Chưa lấy file in';
                const statusClass = item.status === 'fetched' ? 'bg-success' : 'bg-warning';
                card = `
                    <div class="col-12 profile-card">
                        <h5 class="card-title">Lô tem ${item.from} - ${item.to}</h5>
                        <p class="card-text">Số lượng: ${item.quantity}</p>
                        <p class="card-text">Từ số: ${item.from}</p>
                        <p class="card-text">Đến số: ${item.to}</p>
                        <p class="card-text">Thời gian in: ${item.printTime}</p>
                        <p class="card-text">Người in: ${item.printer}</p>
                        <p class="card-text">Chủ thể in: ${item.entity}</p>
                        <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm me-2" title="Xem chi tiết" onclick="viewStampDetails(${item.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-success btn-sm me-2" title="Tải file Excel" onclick="downloadStampExcel(${item.id})">
                                <i class="fas fa-file-excel"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" title="Tải file PDF" onclick="downloadStampPDF(${item.id})">
                                <i class="fas fa-file-pdf"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (tab === 'payments') {
                const statusText = item.status === 'pending' ? 'Chưa thanh toán' : item.status === 'paid' ? 'Đã thanh toán' : 'Đã duyệt';
                const statusClass = item.status === 'pending' ? 'bg-warning' : item.status === 'paid' ? 'bg-success' : 'bg-primary';
                card = `
                    <div class="col-12 profile-card">
                        <h5 class="card-title">${item.code}</h5>
                        <p class="card-text">Mã đơn: ${item.code}</p>
                        <p class="card-text">Số tiền: ${item.amount}</p>
                        <p class="card-text">Thời gian tạo: ${item.createdAt}</p>
                        <p class="card-text">Thời gian thanh toán: ${item.paidAt || '-'}</p>
                        <p class="card-text">Người duyệt: ${item.approver || '-'}</p>
                        <p class="card-text"><span class="badge ${statusClass}">${statusText}</span></p>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết" onclick="viewPaymentDetails(${item.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `;
            }
            cardBody.innerHTML += card;
        });

        renderPagination(data, paginationId, tab);
    }

    // Render pagination
    function renderPagination(data, paginationId, tab) {
        const state = paginationStates[tab];
        const totalPages = Math.ceil(data.length / state.itemsPerPage);
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${state.currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${tab}', ${state.currentPage - 1}); return false;"><</a>`;
        pagination.appendChild(prevLi);

        const maxVisiblePages = 5;
        let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            const firstLi = document.createElement('li');
            firstLi.className = 'page-item';
            firstLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${tab}', 1)">1</a>`;
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
            li.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage('${tab}', ${i}); return false;">${i}</a>`;
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
            lastLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${tab}', ${totalPages})">${totalPages}</a>`;
            pagination.appendChild(lastLi);
        }

        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${state.currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${tab}', ${state.currentPage + 1}); return false;">></a>`;
        pagination.appendChild(nextLi);
    }

    // Change page
    function changePage(tab, page) {
        const state = paginationStates[tab];
        const totalPages = Math.ceil((tab === 'users' ? users : tab === 'entities' ? linkedEntities : tab === 'services' ? services : tab === 'stamps' ? stamps : payments).length / state.itemsPerPage);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        state.currentPage = page;
        renderTab(tab);
    }

    // Change items per page
    function changeItemsPerPage(tab) {
        const desktopSelect = document.getElementById(`${tab}ItemsPerPage`);
        const mobileSelect = document.getElementById(`${tab}MobileItemsPerPage`);
        const state = paginationStates[tab];
        state.itemsPerPage = parseInt(desktopSelect ? desktopSelect.value : mobileSelect.value);
        state.currentPage = 1;
        renderTab(tab);
    }

    // Render specific tab
    function renderTab(tab) {
        if (tab === 'users') {
            renderTable(users, 'usersTableBody', 'usersPagination', 'users');
            renderCards(users, 'usersCardBody', 'usersMobilePagination', 'users');
        } else if (tab === 'entities') {
            renderTable(linkedEntities, 'entitiesTableBody', 'entitiesPagination', 'entities');
            renderCards(linkedEntities, 'entitiesCardBody', 'entitiesMobilePagination', 'entities');
        } else if (tab === 'services') {
            renderTable(services, 'servicesTableBody', 'servicesPagination', 'services');
            renderCards(services, 'servicesCardBody', 'servicesMobilePagination', 'services');
        } else if (tab === 'stamps') {
            renderTable(stamps, 'stampsTableBody', 'stampsPagination', 'stamps');
            renderCards(stamps, 'stampsCardBody', 'stampsMobilePagination', 'stamps');
        } else if (tab === 'payments') {
            renderTable(payments, 'paymentsTableBody', 'paymentsPagination', 'payments');
            renderCards(payments, 'paymentsCardBody', 'paymentsMobilePagination', 'payments');
        }
    }

    // Go back to list
    function goBack() {
        window.adminLayout.loadContent('pending-profiles-list');
    }

    // Edit entity
    function editEntity() {
        window.adminLayout.loadContent('manage-entities-edit', { entityId: entity.id });
    }

    // Lock/Unlock entity
    function lockEntity() {
        const modal = new bootstrap.Modal(document.getElementById('confirmLockModal'));
        const message = document.getElementById('confirmLockMessage');
        const confirmButton = document.getElementById('confirmLockButton');
        message.innerText = `Bạn có chắc chắn muốn ${entity.status === 'active' ? 'khóa' : 'mở khóa'} chủ thể này không?`;
        document.getElementById('confirmLockName').innerText = `Tên chủ thể: ${entity.name}`;

        const confirmHandler = () => {
            entity.status = entity.status === 'active' ? 'locked' : 'active';
            renderEntityInfo();
            modal.hide();
            showToast(`Chủ thể ${entity.name} đã được ${entity.status === 'active' ? 'mở khóa' : 'khóa'} thành công`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Unlink user
    function unlinkUser(userId) {
        const user = users.find(u => u.id === userId);
        if (!user || user.status !== 'active') {
            showToast('Không thể hủy liên kết người dùng', 'error');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmUserLinkModal'));
        document.getElementById('confirmUserLinkModalLabel').innerText = 'Xác nhận hủy liên kết';
        document.getElementById('confirmUserLinkMessage').innerText = 'Bạn có chắc chắn muốn hủy liên kết người dùng này không?';
        document.getElementById('confirmUserLinkName').innerText = `Tên người dùng: ${user.name}`;

        const confirmButton = document.getElementById('confirmUserLinkButton');
        const confirmHandler = () => {
            user.status = 'unlinked';
            renderTab('users');
            modal.hide();
            showToast(`Đã hủy liên kết người dùng ${user.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Link user
    function linkUser(userId) {
        const user = users.find(u => u.id === userId);
        if (!user || user.status !== 'unlinked') {
            showToast('Không thể liên kết lại người dùng', 'error');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmUserLinkModal'));
        document.getElementById('confirmUserLinkModalLabel').innerText = 'Xác nhận liên kết lại';
        document.getElementById('confirmUserLinkMessage').innerText = 'Bạn có chắc chắn muốn liên kết lại người dùng này không?';
        document.getElementById('confirmUserLinkName').innerText = `Tên người dùng: ${user.name}`;

        const confirmButton = document.getElementById('confirmUserLinkButton');
        const confirmHandler = () => {
            user.status = 'active';
            renderTab('users');
            modal.hide();
            showToast(`Đã liên kết lại người dùng ${user.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Add new user
    function addNewUser() {
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        const form = document.getElementById('addUserForm');
        const userInfo = document.getElementById('userInfo');
        const checkButton = document.getElementById('checkUserButton');
        const linkButton = document.getElementById('linkUserButton');
        form.reset();
        userInfo.classList.add('d-none');
        checkButton.classList.remove('d-none');
        linkButton.classList.add('d-none');
        modal.show();
    }

    // Check user
    function checkUser() {
        const searchType = document.querySelector('input[name="searchType"]:checked').value;
        const searchInput = document.getElementById('searchInput').value;
        if (!searchInput) {
            showToast('Vui lòng nhập số điện thoại hoặc email', 'error');
            return;
        }

        // Simulate API call
        const user = users.find(u => (searchType === 'phone' ? u.phone === searchInput : u.email === searchInput));
        const userInfo = document.getElementById('userInfo');
        const checkButton = document.getElementById('checkUserButton');
        const linkButton = document.getElementById('linkUserButton');

        if (!user) {
            showToast('Người dùng không tồn tại trong hệ thống', 'error');
            return;
        }

        if (user.status === 'active') {
            showToast('Người dùng này đã được liên kết với chủ thể', 'error');
            return;
        }

        // Show user info
        document.getElementById('userName').value = user.name;
        document.getElementById('userPhone').value = user.phone;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userAddress').value = user.address;
        userInfo.classList.remove('d-none');
        checkButton.classList.add('d-none');
        linkButton.classList.remove('d-none');
    }

    // Confirm link user
    function confirmLinkUser() {
        const searchType = document.querySelector('input[name="searchType"]:checked').value;
        const searchInput = document.getElementById('searchInput').value;
        const user = users.find(u => (searchType === 'phone' ? u.phone === searchInput : u.email === searchInput));
        if (!user) return;

        const modal = new bootstrap.Modal(document.getElementById('confirmUserLinkModal'));
        document.getElementById('confirmUserLinkModalLabel').innerText = 'Xác nhận liên kết';
        document.getElementById('confirmUserLinkMessage').innerText = 'Bạn có chắc chắn muốn liên kết người dùng này không?';
        document.getElementById('confirmUserLinkName').innerText = `Tên người dùng: ${user.name}`;

        const confirmButton = document.getElementById('confirmUserLinkButton');
        const confirmHandler = () => {
            user.status = 'active';
            renderTab('users');
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
            modal.hide();
            showToast(`Đã liên kết người dùng ${user.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Create entity link
    function createEntityLink() {
        const modal = new bootstrap.Modal(document.getElementById('createEntityLinkModal'));
        const form = document.getElementById('createEntityLinkForm');
        const entityInfo = document.getElementById('entityInfo');
        const checkButton = document.getElementById('checkEntityButton');
        const linkButton = document.getElementById('linkEntityButton');
        form.reset();
        entityInfo.classList.add('d-none');
        checkButton.classList.remove('d-none');
        linkButton.classList.add('d-none');
        modal.show();
    }

    // Check entity
    function checkEntity() {
        const searchType = document.querySelector('input[name="searchEntityType"]:checked').value;
        const searchInput = document.getElementById('searchEntityInput').value;
        if (!searchInput) {
            showToast('Vui lòng nhập số điện thoại hoặc email', 'error');
            return;
        }

        // Simulate API call
        const linkedEntity = linkedEntities.find(e => (searchType === 'phone' ? e.phone === searchInput : e.email === searchInput));
        const entityInfo = document.getElementById('entityInfo');
        const checkButton = document.getElementById('checkEntityButton');
        const linkButton = document.getElementById('linkEntityButton');

        if (!linkedEntity) {
            showToast('Chủ thể sản xuất không tồn tại trong hệ thống', 'error');
            return;
        }

        if (linkedEntity.status === 'active') {
            showToast('Chủ thể sản xuất này đã được liên kết với chủ thể quản lý', 'error');
            return;
        }

        // Show entity info
        document.getElementById('linkedEntityCode').value = linkedEntity.code;
        document.getElementById('linkedEntityName').value = linkedEntity.name;
        document.getElementById('linkedEntityPhone').value = linkedEntity.phone;
        document.getElementById('linkedEntityEmail').value = linkedEntity.email || '';
        document.getElementById('linkedEntityAddress').value = linkedEntity.address || '';
        entityInfo.classList.remove('d-none');
        checkButton.classList.add('d-none');
        linkButton.classList.remove('d-none');
    }

    // Confirm link entity
    function confirmLinkEntity() {
        const searchType = document.querySelector('input[name="searchEntityType"]:checked').value;
        const searchInput = document.getElementById('searchEntityInput').value;
        const linkedEntity = linkedEntities.find(e => (searchType === 'phone' ? e.phone === searchInput : e.email === searchInput));
        if (!linkedEntity) return;

        const modal = new bootstrap.Modal(document.getElementById('confirmEntityLinkModal'));
        document.getElementById('confirmEntityLinkMessage').innerText = 'Bạn có chắc chắn muốn liên kết chủ thể này không?';
        document.getElementById('confirmEntityLinkName').innerText = `Tên chủ thể: ${linkedEntity.name}`;

        const confirmButton = document.getElementById('confirmEntityLinkButton');
        const confirmHandler = () => {
            linkedEntity.status = 'active';
            renderTab('entities');
            bootstrap.Modal.getInstance(document.getElementById('createEntityLinkModal')).hide();
            modal.hide();
            showToast(`Đã liên kết chủ thể ${linkedEntity.name}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Add new stamp
    function addNewStamp() {
        const modal = new bootstrap.Modal(document.getElementById('addStampModal'));
        document.getElementById('addStampForm').reset();
        modal.show();
    }

    // Confirm add stamp
    function confirmAddStamp() {
        const quantity = document.getElementById('stampQuantity').value;
        if (!quantity || quantity <= 0) {
            showToast('Vui lòng nhập số lượng tem hợp lệ', 'error');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmAddStampModal'));
        document.getElementById('confirmStampQuantity').innerText = `Số lượng: ${quantity}`;
        
        const confirmButton = document.getElementById('confirmAddStampButton');
        const confirmHandler = () => {
            const newStamp = {
                id: stamps.length + 1,
                quantity: parseInt(quantity),
                from: `000${stamps.length * 100 + 1}`.slice(-6),
                to: `000${stamps.length * 100 + parseInt(quantity)}`.slice(-6),
                printTime: new Date().toLocaleString('vi-VN'),
                printer: 'admin01', // Replace with actual user
                entity: entity.name,
                status: 'fetched',
                details: Array.from({ length: parseInt(quantity) }, (_, i) => ({
                    serial: `000${stamps.length * 100 + 1 + i}`.slice(-6),
                    code: `STAMP${stamps.length * 100 + 1 + i}`,
                    status: 'white'
                }))
            };
            stamps.push(newStamp);
            renderTab('stamps');
            bootstrap.Modal.getInstance(document.getElementById('addStampModal')).hide();
            modal.hide();
            showToast(`Đã tạo lô tem với số lượng ${quantity}`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // View stamp details
    function viewStampDetails(stampId) {
        const stamp = stamps.find(s => s.id === stampId);
        if (!stamp) {
            showToast('Không tìm thấy lô tem', 'error');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('stampDetailModal'));
        document.getElementById('stampDetailQuantity').innerText = stamp.quantity;
        document.getElementById('stampDetailFrom').innerText = stamp.from;
        document.getElementById('stampDetailTo').innerText = stamp.to;
        document.getElementById('stampDetailPrintTime').innerText = stamp.printTime;
        document.getElementById('stampDetailPrinter').innerText = stamp.printer;
        document.getElementById('stampDetailStatus').innerText = stamp.status === 'fetched' ? 'Đã lấy file in' : 'Chưa lấy file in';

        const tableBody = document.getElementById('stampDetailTableBody');
        tableBody.innerHTML = '';
        stamp.details.forEach(detail => {
            const statusText = detail.status === 'white' ? 'Tem trắng' : 
                              detail.status === 'activated' ? 'Đã kích hoạt' : 
                              detail.status === 'sold' ? 'Đã bán' : 'Đã hủy';
            const statusClass = detail.status === 'white' ? 'bg-secondary' : 
                               detail.status === 'activated' ? 'bg-success' : 
                               detail.status === 'sold' ? 'bg-primary' : 'bg-danger';
            tableBody.innerHTML += `
                <tr>
                    <td>${detail.serial}</td>
                    <td>${detail.code}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        });

        modal.show();
    }

    // Download stamp Excel
    function downloadStampExcel(stampId) {
        showToast(`Đã tải file Excel cho lô tem ${stampId}`, 'success');
        // Implement actual download logic here
    }

    // Download stamp PDF
    function downloadStampPDF(stampId) {
        showToast(`Đã tải file PDF cho lô tem ${stampId}`, 'success');
        // Implement actual download logic here
    }

    // View payment details
    function viewPaymentDetails(paymentId) {
        const payment = payments.find(p => p.id === paymentId);
        if (!payment) {
            showToast('Không tìm thấy thanh toán', 'error');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('paymentDetailModal'));
        document.getElementById('paymentDetailCode').innerText = payment.code;
        document.getElementById('paymentDetailAmount').innerText = payment.amount;
        document.getElementById('paymentDetailCreatedAt').innerText = payment.createdAt;
        document.getElementById('paymentDetailPaidAt').innerText = payment.paidAt || '-';
        document.getElementById('paymentDetailApprover').innerText = payment.approver || '-';
        document.getElementById('paymentDetailStatus').innerText = payment.status === 'pending' ? 'Chưa thanh toán' : 
                                                                payment.status === 'paid' ? 'Đã thanh toán' : 'Đã duyệt';

        const tableBody = document.getElementById('paymentDetailTableBody');
        tableBody.innerHTML = '';
        payment.packages.forEach((pkg, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${pkg.name}</td>
                    <td>${pkg.duration}</td>
                    <td>${pkg.price}</td>
                    <td>${pkg.expiredAt}</td>
                </tr>
            `;
        });

        modal.show();
    }

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
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        toastContainer.innerHTML += toastHTML;

        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Handle image preview
    function setupImagePreview() {
        document.querySelectorAll('.avatar-img, .logo-img, .dkkd-img, .other-img').forEach(img => {
            img.addEventListener('click', () => {
                document.getElementById('previewImage').src = img.src;
                const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
                modal.show();
            });
        });
    }

    // Initialize
    function initialize() {
        renderEntityInfo();
        renderTab('users');
        renderTab('entities');
        renderTab('services');
        renderTab('stamps');
        renderTab('payments');
        setupImagePreview();

        // Expose functions to global scope
        window.goBack = goBack;
        window.editEntity = editEntity;
        window.lockEntity = lockEntity;
        window.unlinkUser = unlinkUser;
        window.linkUser = linkUser;
        window.addNewUser = addNewUser;
        window.checkUser = checkUser;
        window.confirmLinkUser = confirmLinkUser;
        window.createEntityLink = createEntityLink;
        window.checkEntity = checkEntity;
        window.confirmLinkEntity = confirmLinkEntity;
        window.addNewStamp = addNewStamp;
        window.confirmAddStamp = confirmAddStamp;
        window.viewStampDetails = viewStampDetails;
        window.downloadStampExcel = downloadStampExcel;
        window.downloadStampPDF = downloadStampPDF;
        window.viewPaymentDetails = viewPaymentDetails;
        window.changePage = changePage;
        window.changeUsersItemsPerPage = () => changeItemsPerPage('users');
        window.changeEntitiesItemsPerPage = () => changeItemsPerPage('entities');
        window.changeServicesItemsPerPage = () => changeItemsPerPage('services');
        window.changeStampsItemsPerPage = () => changeItemsPerPage('stamps');
        window.changePaymentsItemsPerPage = () => changeItemsPerPage('payments');
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'manage-entities-view') {
            initialize();
        }
    });

    // Fallback initialization
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('manage-entities-view')) {
            initialize();
        }
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    }
})();