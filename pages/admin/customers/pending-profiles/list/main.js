(function () {
    // Sample data for pending profiles (replace with actual API call)
    const profiles = [
        {
            id: 1,
            spcName: "Công ty A",
            taxCode: "1234567890",
            phone: "0123456789",
            email: "contact@a.com",
            representative: { name: "Nguyễn Văn A", phone: "0987654321", avatar: "https://via.placeholder.com/40" },
            address: "123 Đường Láng, Hà Nội",
            submittedAt: "2025-07-01 10:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "pending"
        },
        {
            id: 2,
            spcName: "Công ty B",
            taxCode: "0987654321",
            phone: "0123456790",
            email: "info@b.com",
            representative: { name: "Trần Thị B", phone: "0987654322", avatar: "https://via.placeholder.com/40" },
            address: "456 Nguyễn Trãi, TP.HCM",
            submittedAt: "2025-07-02 14:30",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "approved"
        },
        {
            id: 3,
            spcName: "Công ty C",
            taxCode: "1122334455",
            phone: "0123456791",
            email: "support@c.com",
            representative: { name: "Lê Văn C", phone: "0987654323", avatar: "https://via.placeholder.com/40" },
            address: "789 Hai Bà Trưng, Đà Nẵng",
            submittedAt: "2025-07-03 09:15",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "rejected"
        },
        {
            id: 4,
            spcName: "Công ty D",
            taxCode: "5566778899",
            phone: "0123456792",
            email: "admin@d.com",
            representative: { name: "Phạm Thị D", phone: "0987654324", avatar: "https://via.placeholder.com/40" },
            address: "101 Lê Lợi, Huế",
            submittedAt: "2025-07-04 11:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "entity_created"
        },
        {
            id: 5,
            spcName: "Công ty E",
            taxCode: "2233445566",
            phone: "0123456793",
            email: "contact@e.com",
            representative: { name: "Hoàng Văn E", phone: "0987654325", avatar: "https://via.placeholder.com/40" },
            address: "202 Trần Phú, Nha Trang",
            submittedAt: "2025-07-05 13:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "pending"
        },
        {
            id: 6,
            spcName: "Công ty F",
            taxCode: "7788990011",
            phone: "0123456794",
            email: "info@f.com",
            representative: { name: "Nguyễn Thị F", phone: "0987654326", avatar: "https://via.placeholder.com/40" },
            address: "303 Lý Thái Tổ, Cần Thơ",
            submittedAt: "2025-07-06 15:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "approved"
        },
        {
            id: 7,
            spcName: "Công ty G",
            taxCode: "3344556677",
            phone: "0123456795",
            email: "support@g.com",
            representative: { name: "Trần Văn G", phone: "0987654327", avatar: "https://via.placeholder.com/40" },
            address: "404 Nguyễn Huệ, Hải Phòng",
            submittedAt: "2025-07-07 09:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "rejected"
        },
        {
            id: 8,
            spcName: "Công ty H",
            taxCode: "8899001122",
            phone: "0123456796",
            email: "admin@h.com",
            representative: { name: "Lê Thị H", phone: "0987654328", avatar: "https://via.placeholder.com/40" },
            address: "505 Ba Tháng Hai, Vũng Tàu",
            submittedAt: "2025-07-08 10:30",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "pending"
        },
        {
            id: 9,
            spcName: "Công ty I",
            taxCode: "4455667788",
            phone: "0123456797",
            email: "contact@i.com",
            representative: { name: "Phạm Văn I", phone: "0987654329", avatar: "https://via.placeholder.com/40" },
            address: "606 Phạm Văn Đồng, Đà Lạt",
            submittedAt: "2025-07-09 14:00",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "entity_created"
        },
        {
            id: 10,
            spcName: "Công ty K",
            taxCode: "9900112233",
            phone: "0123456798",
            email: "info@k.com",
            representative: { name: "Hoàng Thị K", phone: "0987654330", avatar: "https://via.placeholder.com/40" },
            address: "707 Hùng Vương, Vinh",
            submittedAt: "2025-07-10 11:15",
            file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            status: "pending"
        }
    ];

    // State for pagination
    let currentPage = 1;
    let itemsPerPage = 10;
    let currentLogoFile = null;

    // Render table for desktop with pagination
    function renderTable(data) {
        const tableBody = document.getElementById('profileTableBody');
        if (!tableBody) {
            console.warn('Table body element not found');
            return;
        }
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">Không có dữ liệu</td>
                </tr>
            `;
            document.getElementById('pagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((profile, index) => {
            const statusText = profile.status === 'pending' ? 'Chờ duyệt' :
                              profile.status === 'approved' ? 'Đã duyệt' :
                              profile.status === 'rejected' ? 'Từ chối' : 'Đã tạo chủ thể';
            const statusClass = profile.status === 'pending' ? 'bg-warning' :
                               profile.status === 'approved' ? 'bg-success' :
                               profile.status === 'rejected' ? 'bg-danger' : 'bg-primary';
            const row = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${profile.spcName}</td>
                    <td>${profile.taxCode}</td>
                    <td>${profile.email}</td>
                    <td>${profile.submittedAt}</td>
                    <td>
                        <span class="badge ${statusClass}">${statusText}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm me-1" title="Xem chi tiết" onclick="viewProfileDetails(${profile.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${profile.status === 'pending' ? `
                                <button class="btn btn-outline-success btn-sm me-1" title="Duyệt" onclick="approveProfile(${profile.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm" title="Từ chối" onclick="rejectProfile(${profile.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : profile.status === 'approved' ? `
                                <button class="btn btn-outline-primary btn-sm" title="Tạo chủ thể" onclick="createEntity(${profile.id})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            ` : profile.status === 'entity_created' ? `
                                <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết chủ thể" onclick="viewEntityDetails(${profile.id})">
                                    <i class="fas fa-building"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        renderPagination(data, 'pagination');
    }

    // Render cards for tablet/mobile with pagination
    function renderCards(data) {
        const cardBody = document.getElementById('profileCardBody');
        if (!cardBody) {
            console.warn('Card body element not found');
            return;
        }
        cardBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            cardBody.innerHTML = `
                <div class="col-12 text-center">Không có dữ liệu</div>
            `;
            document.getElementById('mobilePagination').innerHTML = '';
            return;
        }

        paginatedData.forEach(profile => {
            const statusText = profile.status === 'pending' ? 'Chờ duyệt' :
                              profile.status === 'approved' ? 'Đã duyệt' :
                              profile.status === 'rejected' ? 'Từ chối' : 'Đã tạo chủ thể';
            const statusClass = profile.status === 'pending' ? 'bg-warning' :
                               profile.status === 'approved' ? 'bg-success' :
                               profile.status === 'rejected' ? 'bg-danger' : 'bg-primary';
            const card = `
                <div class="col-12 profile-card">
                    <h5 class="card-title">${profile.spcName}</h5>
                    <p class="card-text">Tên SPC: ${profile.spcName}</p>
                    <p class="card-text">Mã số thuế: ${profile.taxCode}</p>
                    <p class="card-text">Email: ${profile.email}</p>
                    <p class="card-text">Ngày gửi: ${profile.submittedAt}</p>
                    <p class="card-text">
                        <span class="badge ${statusClass}">${statusText}</span>
                    </p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm me-2" title="Xem chi tiết" onclick="viewProfileDetails(${profile.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${profile.status === 'pending' ? `
                            <button class="btn btn-outline-success btn-sm me-2" title="Duyệt" onclick="approveProfile(${profile.id})">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" title="Từ chối" onclick="rejectProfile(${profile.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : profile.status === 'approved' ? `
                            <button class="btn btn-outline-primary btn-sm" title="Tạo chủ thể" onclick="createEntity(${profile.id})">
                                <i class="fas fa-plus"></i>
                            </button>
                        ` : profile.status === 'entity_created' ? `
                            <button class="btn btn-outline-primary btn-sm" title="Xem chi tiết chủ thể" onclick="viewEntityDetails(${profile.id})">
                                <i class="fas fa-building"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        renderPagination(data, 'mobilePagination');
    }

    // Render pagination
    function renderPagination(data, paginationId) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;"><</a>`;
        pagination.appendChild(prevLi);

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            const firstLi = document.createElement('li');
            firstLi.className = 'page-item';
            firstLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(1)">1</a>`;
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
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>`;
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
            lastLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a>`;
            pagination.appendChild(lastLi);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">></a>`;
        pagination.appendChild(nextLi);
    }

    // Change page
    function changePage(page) {
        const totalPages = Math.ceil(profiles.length / itemsPerPage);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        currentPage = page;
        applyFilters();
    }

    // Change items per page
    function changeItemsPerPage() {
        const desktopSelect = document.getElementById('itemsPerPage');
        const mobileSelect = document.getElementById('mobileItemsPerPage');
        itemsPerPage = parseInt(desktopSelect ? desktopSelect.value : mobileSelect.value);
        currentPage = 1; // Reset to first page
        applyFilters();
    }

    // Apply filters for desktop
    function applyFilters() {
        const spcName = document.getElementById('filterSpcName')?.value.toLowerCase() || '';
        const taxCode = document.getElementById('filterTaxCode')?.value.toLowerCase() || '';
        const status = document.getElementById('filterStatus')?.value || '';

        const filteredData = profiles.filter(profile => {
            return (
                (!spcName || profile.spcName.toLowerCase().includes(spcName)) &&
                (!taxCode || profile.taxCode.toLowerCase().includes(taxCode)) &&
                (!status || profile.status === status)
            );
        });

        renderTable(filteredData);
        renderCards(filteredData);
    }

    // Apply filters for mobile
    function applyFiltersMobile() {
        const spcName = document.getElementById('filterSpcNameMobile')?.value.toLowerCase() || '';
        const taxCode = document.getElementById('filterTaxCodeMobile')?.value.toLowerCase() || '';
        const status = document.getElementById('filterStatusMobile')?.value || '';

        const filteredData = profiles.filter(profile => {
            return (
                (!spcName || profile.spcName.toLowerCase().includes(spcName)) &&
                (!taxCode || profile.taxCode.toLowerCase().includes(taxCode)) &&
                (!status || profile.status === status)
            );
        });

        renderTable(filteredData);
        renderCards(filteredData);
    }

    // Reset filters for desktop
    function resetFilters() {
        const form = document.getElementById('filterFormDesktop');
        if (form) form.reset();
        currentPage = 1;
        renderTable(profiles);
        renderCards(profiles);
    }

    // Reset filters for mobile
    function resetFiltersMobile() {
        const form = document.getElementById('filterFormMobile');
        if (form) form.reset();
        currentPage = 1;
        renderTable(profiles);
        renderCards(profiles);
    }

    // View profile details
    function viewProfileDetails(profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile) {
            window.adminLayout.showNotification('Không tìm thấy hồ sơ', 'danger');
            return;
        }
        // Navigate to pending-profiles-view detail page
        window.adminLayout.loadContent('pending-profiles-view', {
            html: '../../pages/admin/customers/pending-profiles/detail/index.html'
        });
    }

    // Approve profile
    function approveProfile(profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile || profile.status !== 'pending') {
            window.adminLayout.showNotification('Không thể duyệt hồ sơ', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmApproveModal'));
        const confirmName = document.getElementById('confirmApproveName');
        confirmName.innerHTML = `Tên SPC: ${profile.spcName}`;

        const confirmButton = document.getElementById('confirmApproveButton');
        const confirmHandler = () => {
            profile.status = 'approved';
            applyFilters();
            modal.hide();
            showToast(`Hồ sơ ${profile.spcName} đã được duyệt`, 'success');
            // Immediately show create entity modal
            createEntity(profileId);
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Reject profile
    function rejectProfile(profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile || profile.status !== 'pending') {
            window.adminLayout.showNotification('Không thể từ chối hồ sơ', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmRejectModal'));
        const confirmName = document.getElementById('confirmRejectName');
        confirmName.innerHTML = `Tên SPC: ${profile.spcName}`;

        const confirmButton = document.getElementById('confirmRejectButton');
        const confirmHandler = () => {
            profile.status = 'rejected';
            applyFilters();
            modal.hide();
            showToast(`Hồ sơ ${profile.spcName} đã bị từ chối`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Create entity
    function createEntity(profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile || profile.status !== 'approved') {
            window.adminLayout.showNotification('Không thể tạo chủ thể', 'danger');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('createEntityModal'));
        document.getElementById('entitySpcName').value = profile.spcName;
        document.getElementById('entityTaxCode').value = profile.taxCode;
        document.getElementById('entityPhone').value = profile.phone;
        document.getElementById('entityEmail').value = profile.email;
        document.getElementById('entityAvatar').src = profile.representative.avatar;
        document.getElementById('entityRepresentativeName').textContent = profile.representative.name;
        document.getElementById('entityRepresentativePhone').textContent = profile.representative.phone;
        document.getElementById('entityAddress').value = profile.address;
        document.getElementById('entitySubmittedAt').value = profile.submittedAt;
        document.getElementById('entityFileLink').href = profile.file;

        // Reset additional info fields
        document.getElementById('entitySlogan').value = '';
        document.getElementById('entityIntroduction').value = '';
        document.getElementById('entityOrgCode').value = '';
        document.getElementById('entityLogo').value = '';
        document.getElementById('logoPreview').classList.add('d-none');
        currentLogoFile = null;

        // Handle file preview click
        const fileLink = document.getElementById('entityFileLink');
        fileLink.onclick = (e) => {
            e.preventDefault();
            const pdfModal = new bootstrap.Modal(document.getElementById('pdfPreviewModal'));
            document.getElementById('pdfPreviewIframe').src = profile.file;
            pdfModal.show();
        };

        // Handle logo upload
        const logoInput = document.getElementById('entityLogo');
        logoInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                currentLogoFile = file;
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.getElementById('logoImage').src = event.target.result;
                    document.getElementById('logoPreview').classList.remove('d-none');
                    logoInput.classList.add('d-none');
                };
                reader.readAsDataURL(file);
            } else {
                showToast('Vui lòng chọn file hình ảnh hợp lệ', 'error');
            }
        };

        // Handle logo removal
        const removeLogoButton = document.getElementById('removeLogoButton');
        removeLogoButton.onclick = () => {
            document.getElementById('entityLogo').value = '';
            document.getElementById('logoPreview').classList.add('d-none');
            logoInput.classList.remove('d-none');
            currentLogoFile = null;
        };

        // Handle create entity confirmation
        const confirmButton = document.getElementById('confirmCreateEntityButton');
        const confirmHandler = () => {
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmCreateEntityModal'));
            document.getElementById('confirmCreateEntityName').innerHTML = `Tên SPC: ${profile.spcName}`;

            const finalCreateButton = document.getElementById('finalCreateEntityButton');
            const finalCreateHandler = () => {
                const slogan = document.getElementById('entitySlogan').value;
                const introduction = document.getElementById('entityIntroduction').value;
                const orgCode = document.getElementById('entityOrgCode').value;

                if (!orgCode) {
                    showToast('Vui lòng nhập mã tổ chức', 'error');
                    confirmModal.hide();
                    return;
                }

                profile.status = 'entity_created';
                profile.slogan = slogan;
                profile.introduction = introduction;
                profile.orgCode = orgCode;
                profile.logo = currentLogoFile ? URL.createObjectURL(currentLogoFile) : null;

                applyFilters();
                modal.hide();
                confirmModal.hide();
                showToast(`Chủ thể ${profile.spcName} đã được tạo`, 'success');
                finalCreateButton.removeEventListener('click', finalCreateHandler);
            };

            finalCreateButton.removeEventListener('click', finalCreateHandler);
            finalCreateButton.addEventListener('click', finalCreateHandler);

            confirmModal.show();
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // View entity details
    function viewEntityDetails(profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (!profile || profile.status !== 'entity_created') {
            window.adminLayout.showNotification('Không tìm thấy chủ thể', 'danger');
            return;
        }
        // Navigate to manage-entities-view
        window.adminLayout.loadContent('manage-entities-view');
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            console.warn('Toast container not found');
            return;
        }

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

    // Initialize
    function initialize() {
        const tableBody = document.getElementById('profileTableBody');
        const cardBody = document.getElementById('profileCardBody');
        
        if (tableBody && cardBody) {
            console.log('Initializing with profiles data:', profiles); // Debug log
            renderTable(profiles);
            renderCards(profiles);
        } else {
            console.error('Required DOM elements not found.');
            let retryCount = 0;
            const maxRetries = 3;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        if (document.getElementById('profileTableBody') && 
                            document.getElementById('profileCardBody')) {
                            renderTable(profiles);
                            renderCards(profiles);
                        } else {
                            retryInitialize();
                        }
                    }, 100);
                } else {
                    window.adminLayout.showNotification('Không thể tải giao diện danh sách hồ sơ. Vui lòng thử lại.', 'danger');
                }
            }
            retryInitialize();
        }
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'pending-profiles-list') {
            console.log('contentLoaded event triggered for pending-profiles-list'); // Debug log
            initialize();
        }
    });

    // Fallback in case contentLoaded event is missed
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('pending-profiles-list')) {
            console.log('DOMContentLoaded triggered, initializing...'); // Debug log
            initialize();
        } else if (document.getElementById('profileTableBody') && document.getElementById('profileCardBody')) {
            console.log('Manual initialization due to missing event'); // Debug log
            initialize();
        }
    });

    // Immediate initialization check (as a fallback)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document ready, initializing immediately'); // Debug log
        initialize();
    }

    // Expose functions to global scope
    window.viewProfileDetails = viewProfileDetails;
    window.approveProfile = approveProfile;
    window.rejectProfile = rejectProfile;
    window.createEntity = createEntity;
    window.viewEntityDetails = viewEntityDetails;
    window.changePage = changePage;
    window.changeItemsPerPage = changeItemsPerPage;
    window.applyFilters = applyFilters;
    window.applyFiltersMobile = applyFiltersMobile;
    window.resetFilters = resetFilters;
    window.resetFiltersMobile = resetFiltersMobile;
})();