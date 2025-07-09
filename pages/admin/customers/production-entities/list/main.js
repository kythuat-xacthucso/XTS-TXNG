(function () {
    // Sample data for production entities (replace with actual API call)
    const entities = [
        { id: 1, entityCode: "ENT001", entityName: "Công ty X", taxCode: "1234567890", phone: "0901234567", status: "active" },
        { id: 2, entityCode: "ENT002", entityName: "Công ty Y", taxCode: "0987654321", phone: "0912345678", status: "locked" },
        { id: 3, entityCode: "ENT003", entityName: "Công ty Z", taxCode: "1122334455", phone: "0923456789", status: "active" },
        { id: 4, entityCode: "ENT004", entityName: "Công ty W", taxCode: "5566778899", phone: "0934567890", status: "locked" },
        { id: 5, entityCode: "ENT005", entityName: "Công ty V", taxCode: "2233445566", phone: "0945678901", status: "active" },
    ];

    // State for pagination
    let currentPage = 1;
    let itemsPerPage = 10;

    // Render table for desktop with pagination
    function renderTable(data) {
        const tableBody = document.getElementById('entityTableBody');
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

        paginatedData.forEach((entity, index) => {
            const statusText = entity.status === 'active' ? 'Đang hoạt động' : 'Khóa';
            const statusClass = entity.status === 'active' ? 'bg-success' : 'bg-danger';
            const row = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${entity.entityCode}</td>
                    <td>${entity.entityName}</td>
                    <td>${entity.taxCode}</td>
                    <td>${entity.phone}</td>
                    <td>
                        <span class="badge ${statusClass}">${statusText}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm me-2" onclick="viewEntityDetails(${entity.id})">
                                <i class="fas fa-eye"></i> Xem chi tiết
                            </button>
                            <button class="btn btn-outline-warning btn-sm" onclick="editEntity(${entity.id})">
                                <i class="fas fa-edit"></i> Sửa
                            </button>
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
        const cardBody = document.getElementById('entityCardBody');
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

        paginatedData.forEach(entity => {
            const statusText = entity.status === 'active' ? 'Đang hoạt động' : 'Khóa';
            const statusClass = entity.status === 'active' ? 'bg-success' : 'bg-danger';
            const card = `
                <div class="col-12 entity-card">
                    <h5 class="card-title">${entity.entityCode}</h5>
                    <p class="card-text">Mã chủ thể: ${entity.entityCode}</p>
                    <p class="card-text">Tên chủ thể: ${entity.entityName}</p>
                    <p class="card-text">Mã số thuế: ${entity.taxCode}</p>
                    <p class="card-text">Số điện thoại: ${entity.phone}</p>
                    <p class="card-text">
                        <span class="badge ${statusClass}">${statusText}</span>
                    </p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="viewEntityDetails(${entity.id})">
                            <i class="fas fa-eye"></i> Xem chi tiết
                        </button>
                        <button class="btn btn-outline-warning btn-sm" onclick="editEntity(${entity.id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
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
        const totalPages = Math.ceil(entities.length / itemsPerPage);
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
        const entityCode = document.getElementById('filterEntityCode')?.value.toLowerCase() || '';
        const entityName = document.getElementById('filterEntityName')?.value.toLowerCase() || '';
        const taxCode = document.getElementById('filterTaxCode')?.value.toLowerCase() || '';
        const status = document.getElementById('filterStatus')?.value || '';

        const filteredData = entities.filter(entity => {
            return (
                (!entityCode || entity.entityCode.toLowerCase().includes(entityCode)) &&
                (!entityName || entity.entityName.toLowerCase().includes(entityName)) &&
                (!taxCode || entity.taxCode.toLowerCase().includes(taxCode)) &&
                (!status || entity.status === status)
            );
        });

        renderTable(filteredData);
        renderCards(filteredData);
    }

    // Apply filters for mobile
    function applyFiltersMobile() {
        const entityCode = document.getElementById('filterEntityCodeMobile')?.value.toLowerCase() || '';
        const entityName = document.getElementById('filterEntityNameMobile')?.value.toLowerCase() || '';
        const taxCode = document.getElementById('filterTaxCodeMobile')?.value.toLowerCase() || '';
        const status = document.getElementById('filterStatusMobile')?.value || '';

        const filteredData = entities.filter(entity => {
            return (
                (!entityCode || entity.entityCode.toLowerCase().includes(entityCode)) &&
                (!entityName || entity.entityName.toLowerCase().includes(entityName)) &&
                (!taxCode || entity.taxCode.toLowerCase().includes(taxCode)) &&
                (!status || entity.status === status)
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
        renderTable(entities);
        renderCards(entities);
    }

    // Reset filters for mobile
    function resetFiltersMobile() {
        const form = document.getElementById('filterFormMobile');
        if (form) form.reset();
        currentPage = 1;
        renderTable(entities);
        renderCards(entities);
    }

    // View entity details
    function viewEntityDetails(entityId) {
        const entity = entities.find(e => e.id === entityId);
        if (!entity) {
            window.adminLayout.showNotification('Không tìm thấy chủ thể', 'danger');
            return;
        }
        window.adminLayout.loadContent('production-entities-view', { html: '../../pages/admin/customers/production-entities/detail/index.html' });
    }

    // Edit entity
    function editEntity(entityId) {
        const entity = entities.find(e => e.id === entityId);
        if (!entity) {
            window.adminLayout.showNotification('Không tìm thấy chủ thể', 'danger');
            return;
        }
        window.adminLayout.loadContent('edit-production-entity', { html: '../../pages/admin/production-entities/edit/index.html' });
    }

    // Show toast notification
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            console.warn('Toast container not found');
            return;
        }

        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div id="${toastId}" class="toast toast-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
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
        const tableBody = document.getElementById('entityTableBody');
        const cardBody = document.getElementById('entityCardBody');
        const filterFormDesktop = document.getElementById('filterFormDesktop');
        const filterFormMobile = document.getElementById('filterFormMobile');
        const pagination = document.getElementById('pagination');
        const mobilePagination = document.getElementById('mobilePagination');

        if (tableBody && cardBody && filterFormDesktop && filterFormMobile && pagination && mobilePagination) {
            console.log('Initializing with entities data:', entities); // Debug log
            renderTable(entities);
            renderCards(entities);
        } else {
            console.error('Required DOM elements not found:', {
                tableBody: !!tableBody,
                cardBody: !!cardBody,
                filterFormDesktop: !!filterFormDesktop,
                filterFormMobile: !!filterFormMobile,
                pagination: !!pagination,
                mobilePagination: !!mobilePagination
            });
            let retryCount = 0;
            const maxRetries = 3;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        if (document.getElementById('entityTableBody') && 
                            document.getElementById('entityCardBody') && 
                            document.getElementById('filterFormDesktop') && 
                            document.getElementById('filterFormMobile') && 
                            document.getElementById('pagination') && 
                            document.getElementById('mobilePagination')) {
                            renderTable(entities);
                            renderCards(entities);
                        } else {
                            retryInitialize();
                        }
                    }, 100);
                } else {
                    window.adminLayout.showNotification('Không thể tải giao diện danh sách chủ thể. Vui lòng thử lại.', 'danger');
                }
            }
            retryInitialize();
        }
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'production-entities-list') {
            console.log('contentLoaded event triggered for production-entities-list'); // Debug log
            initialize();
        }
    });

    // Fallback in case contentLoaded event is missed
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('production-entities/list')) {
            console.log('DOMContentLoaded triggered, initializing...'); // Debug log
            initialize();
        } else if (document.getElementById('entityTableBody') && document.getElementById('entityCardBody') && 
                   document.getElementById('filterFormDesktop') && document.getElementById('filterFormMobile') && 
                   document.getElementById('pagination') && document.getElementById('mobilePagination')) {
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
    window.viewEntityDetails = viewEntityDetails;
    window.editEntity = editEntity;
    window.changePage = changePage;
    window.changeItemsPerPage = changeItemsPerPage;
    window.applyFilters = applyFilters;
    window.applyFiltersMobile = applyFiltersMobile;
    window.resetFilters = resetFilters;
    window.resetFiltersMobile = resetFiltersMobile;
})();