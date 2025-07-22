(function () {
    // Sample data for service packages (replace with actual API call)
    const servicePackages = [
        { id: 1, name: "Gói Cơ bản", parameters: "Dung lượng", quantity: 100, price: 1000000, status: "active" },
        { id: 2, name: "Gói Nâng cao", parameters: "Dung lượng", quantity: 50, price: 3000000, status: "locked" },
        { id: 3, name: "Gói Doanh nghiệp", parameters: "Dung lượng", quantity: 30, price: 6000000, status: "active" },
        { id: 4, name: "Gói VIP", parameters: "Mã tem", quantity: 20, price: 12000000, status: "active" },
        { id: 5, name: "Gói Starter", parameters: "Mã tem", quantity: 200, price: 500000, status: "locked" },
        { id: 6, name: "Gói Pro", parameters: "Mã truyền thông", quantity: 25, price: 8000000, status: "active" },
        { id: 7, name: "Gói Lite", parameters: "Mã tem", quantity: 80, price: 2000000, status: "locked" },
        { id: 8, name: "Gói Premium", parameters: "Mã truyền thông", quantity: 15, price: 15000000, status: "active" },
        { id: 9, name: "Gói Basic Plus", parameters: "Mã truyền thông", quantity: 60, price: 2500000, status: "active" },
        { id: 10, name: "Gói Elite", parameters: "Mã truyền thông", quantity: 10, price: 18000000, status: "locked" },
        { id: 11, name: "Gói Starter Plus", parameters: "Mã truyền thông", quantity: 150, price: 700000, status: "active" },
        { id: 12, name: "Gói Advanced", parameters: "Mã truyền thông", quantity: 40, price: 4000000, status: "locked" },
        { id: 13, name: "Gói Ultimate", parameters: "Mã truyền thông", quantity: 5, price: 20000000, status: "active" }
    ];

    // State for pagination
    let currentPage = 1;
    let itemsPerPage = 10;

    // Cache DOM elements
    const tableBody = document.getElementById('servicePackageTableBody');
    const cardBody = document.getElementById('servicePackageCardBody');
    const pagination = document.getElementById('pagination');
    const mobilePagination = document.getElementById('mobilePagination');

    // Render table for desktop
    function renderTable(data) {
        if (!tableBody) {
            console.warn('Table body element not found');
            return;
        }
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>';
            if (pagination) pagination.innerHTML = '';
            return;
        }

        paginatedData.forEach((pkg, index) => {
            const row = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${pkg.name}</td>
                    <td>${pkg.parameters}</td>
                    <td>${pkg.quantity}</td>
                    <td>${pkg.price.toLocaleString('vi-VN')} VND</td>
                    <td>
                        <span class="badge ${pkg.status === 'active' ? 'bg-success' : 'bg-danger'}">
                            ${pkg.status === 'active' ? 'Đang hoạt động' : 'Khóa'}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm me-2" onclick="navigateTo('view-service-package', ${pkg.id})">
                                <i class="fas fa-eye"></i> Xem
                            </button>
                            <button class="btn btn-outline-warning btn-sm" onclick="navigateTo('edit-service-package', ${pkg.id})">
                                <i class="fas fa-edit"></i> Sửa
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        if (pagination) renderPagination(data, pagination);
    }

    // Render cards for tablet/mobile
    function renderCards(data) {
        if (!cardBody) {
            console.warn('Card body element not found');
            return;
        }
        cardBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            cardBody.innerHTML = '<div class="col-12 text-center">Không có dữ liệu</div>';
            if (mobilePagination) mobilePagination.innerHTML = '';
            return;
        }

        paginatedData.forEach(pkg => {
            const card = `
                <div class="col-12 service-package-card">
                    <h5 class="card-title">${pkg.name}</h5>
                    <p class="card-text">Tham số: ${pkg.parameters}</p>
                    <p class="card-text">Số lượng: ${pkg.quantity}</p>
                    <p class="card-text">Giá: ${pkg.price.toLocaleString('vi-VN')} VND</p>
                    <p class="card-text">
                        <span class="badge ${pkg.status === 'active' ? 'bg-success' : 'bg-danger'}">
                            ${pkg.status === 'active' ? 'Đang hoạt động' : 'Khóa'}
                        </span>
                    </p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="navigateTo('view-service-package', ${pkg.id})">
                            <i class="fas fa-eye"></i> Xem
                        </button>
                        <button class="btn btn-outline-warning btn-sm" onclick="navigateTo('edit-service-package', ${pkg.id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                    </div>
                </div>
            `;
            cardBody.innerHTML += card;
        });

        if (mobilePagination) renderPagination(data, mobilePagination);
    }

    // Render pagination
    function renderPagination(data, paginationElement) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        paginationElement.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;"><</a>`;
        paginationElement.appendChild(prevLi);

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
            paginationElement.appendChild(firstLi);
            if (startPage > 2) {
                const ellipsisLi = document.createElement('li');
                ellipsisLi.className = 'page-item disabled';
                ellipsisLi.innerHTML = '<a class="page-link">...</a>';
                paginationElement.appendChild(ellipsisLi);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>`;
            paginationElement.appendChild(li);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsisLi = document.createElement('li');
                ellipsisLi.className = 'page-item disabled';
                ellipsisLi.innerHTML = '<a class="page-link">...</a>';
                paginationElement.appendChild(ellipsisLi);
            }
            const lastLi = document.createElement('li');
            lastLi.className = 'page-item';
            lastLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a>`;
            paginationElement.appendChild(lastLi);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">></a>`;
        paginationElement.appendChild(nextLi);
    }

    // Change page
    function changePage(page) {
        const totalPages = Math.ceil(servicePackages.length / itemsPerPage);
        currentPage = Math.max(1, Math.min(page, totalPages));
        applyFilters();
    }

    // Change items per page
    function changeItemsPerPage() {
        const select = document.getElementById('itemsPerPage') || document.getElementById('mobileItemsPerPage');
        itemsPerPage = parseInt(select.value, 10);
        currentPage = 1;
        applyFilters();
    }

    // Apply filters (unified for desktop and mobile)
    function applyFilters() {
        const name = (document.getElementById('filterName') || document.getElementById('filterNameMobile'))?.value.toLowerCase() || '';
        const price = (document.getElementById('filterPrice') || document.getElementById('filterPriceMobile'))?.value || '';
        const duration = (document.getElementById('filterDuration') || document.getElementById('filterDurationMobile'))?.value || '';
        const status = (document.getElementById('filterStatus') || document.getElementById('filterStatusMobile'))?.value || '';

        const filteredData = servicePackages.filter(pkg => {
            return (
                (!name || pkg.name.toLowerCase().includes(name)) &&
                (!price || pkg.price === parseInt(price)) &&
                (!duration || pkg.parameters.includes(`${duration} tháng`)) &&
                (!status || pkg.status === status)
            );
        });

        renderTable(filteredData);
        renderCards(filteredData);
    }

    // Reset filters (unified for desktop and mobile)
    function resetFilters() {
        const form = document.getElementById('filterFormDesktop') || document.getElementById('filterFormMobile');
        if (form) form.reset();
        currentPage = 1;
        renderTable(servicePackages);
        renderCards(servicePackages);
    }

    // Navigation function
    function navigateTo(page, id = null) {
        console.log(`Navigating to ${page}, id: ${id}`);
        const filePaths = window.adminLayout.getFilePaths(page);
        if (filePaths && filePaths.html) {
            const path = id ? `${filePaths.html}?id=${id}` : filePaths.html;
            window.adminLayout.loadContent(page, { html: path });
        } else {
            window.adminLayout.showNotification('Trang không tồn tại', 'danger');
        }
    }

    // Initialize
    function initialize() {
        if (tableBody && cardBody) {
            console.log('Initializing service package list...');
            renderTable(servicePackages);
            renderCards(servicePackages);
        } else {
            console.error('Required DOM elements not found.');
        }
    }

    // Ensure initialization
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'service-packages') {
            initialize();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('service-packages/list')) {
            initialize();
        }
    });

    // Expose functions to global scope
    window.applyFilters = applyFilters;
    window.resetFilters = resetFilters;
    window.changePage = changePage;
    window.changeItemsPerPage = changeItemsPerPage;
    window.navigateTo = navigateTo;
})();