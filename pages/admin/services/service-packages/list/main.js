// Sample data for service packages (replace with actual API call)
const servicePackages = [
    { id: 1, name: "Gói Cơ bản", price: 1000000, duration: "1 tháng", createdAt: "2025-06-01 10:00", createdBy: "Admin1", status: "active" },
    { id: 2, name: "Gói Nâng cao", price: 3000000, duration: "3 tháng", createdAt: "2025-06-02 14:30", createdBy: "Admin2", status: "locked" },
    { id: 3, name: "Gói Doanh nghiệp", price: 6000000, duration: "6 tháng", createdAt: "2025-06-03 09:15", createdBy: "Admin3", status: "active" },
    { id: 4, name: "Gói VIP", price: 12000000, duration: "12 tháng", createdAt: "2025-06-04 11:00", createdBy: "Admin4", status: "active" },
    { id: 5, name: "Gói Starter", price: 500000, duration: "1 tháng", createdAt: "2025-06-05 13:00", createdBy: "Admin5", status: "locked" },
    { id: 6, name: "Gói Pro", price: 8000000, duration: "9 tháng", createdAt: "2025-06-06 15:00", createdBy: "Admin6", status: "active" },
    { id: 7, name: "Gói Lite", price: 2000000, duration: "2 tháng", createdAt: "2025-06-07 09:00", createdBy: "Admin7", status: "locked" },
    { id: 8, name: "Gói Premium", price: 15000000, duration: "12 tháng", createdAt: "2025-06-08 10:30", createdBy: "Admin8", status: "active" },
    { id: 9, name: "Gói Basic Plus", price: 2500000, duration: "3 tháng", createdAt: "2025-06-09 14:00", createdBy: "Admin9", status: "active" },
    { id: 10, name: "Gói Elite", price: 18000000, duration: "12 tháng", createdAt: "2025-06-10 11:15", createdBy: "Admin10", status: "locked" },
    { id: 11, name: "Gói Starter Plus", price: 700000, duration: "1 tháng", createdAt: "2025-06-11 13:00", createdBy: "Admin11", status: "active" },
    { id: 12, name: "Gói Advanced", price: 4000000, duration: "4 tháng", createdAt: "2025-06-12 09:45", createdBy: "Admin12", status: "locked" },
    { id: 13, name: "Gói Ultimate", price: 20000000, duration: "12 tháng", createdAt: "2025-06-13 15:30", createdBy: "Admin13", status: "active" }
];

// State for pagination
let currentPage = 1;
let itemsPerPage = 10;

// Render table for desktop with pagination
function renderTable(data) {
    const tableBody = document.getElementById('servicePackageTableBody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    if (paginatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">Không có dữ liệu</td>
            </tr>
        `;
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    paginatedData.forEach((pkg, index) => {
        const row = `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${pkg.name}</td>
                <td>${pkg.price.toLocaleString('vi-VN')} VND</td>
                <td>${pkg.duration}</td>
                <td>${pkg.createdAt}</td>
                <td>${pkg.createdBy}</td>
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

    renderPagination(data, 'pagination');
}

// Render cards for tablet/mobile with pagination
function renderCards(data) {
    const cardBody = document.getElementById('servicePackageCardBody');
    if (!cardBody) {
        console.error('Card body element not found');
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

    paginatedData.forEach(pkg => {
        const card = `
            <div class="col-12 service-package-card">
                <h5 class="card-title">${pkg.name}</h5>
                <p class="card-text">Giá: ${pkg.price.toLocaleString('vi-VN')} VND</p>
                <p class="card-text">Thời gian: ${pkg.duration}</p>
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
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">&lt;</a>`;
    pagination.appendChild(prevLi);

    // Page numbers
    const maxVisiblePages = 5; // Số trang tối đa hiển thị
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
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">&gt;</a>`;
    pagination.appendChild(nextLi);
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(servicePackages.length / itemsPerPage);
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
    const name = document.getElementById('filterName')?.value.toLowerCase() || '';
    const price = document.getElementById('filterPrice')?.value || '';
    const duration = document.getElementById('filterDuration')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';

    const filteredData = servicePackages.filter(pkg => {
        return (
            (!name || pkg.name.toLowerCase().includes(name)) &&
            (!price || pkg.price === parseInt(price)) &&
            (!duration || pkg.duration === duration) &&
            (!status || pkg.status === status)
        );
    });

    renderTable(filteredData);
    renderCards(filteredData);
}

// Apply filters for mobile
function applyFiltersMobile() {
    const name = document.getElementById('filterNameMobile')?.value.toLowerCase() || '';
    const price = document.getElementById('filterPriceMobile')?.value || '';
    const duration = document.getElementById('filterDurationMobile')?.value || '';
    const status = document.getElementById('filterStatusMobile')?.value || '';

    const filteredData = servicePackages.filter(pkg => {
        return (
            (!name || pkg.name.toLowerCase().includes(name)) &&
            (!price || pkg.price === parseInt(price)) &&
            (!duration || pkg.duration === duration) &&
            (!status || pkg.status === status)
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
    renderTable(servicePackages);
    renderCards(servicePackages);
}

// Reset filters for mobile
function resetFiltersMobile() {
    const form = document.getElementById('filterFormMobile');
    if (form) form.reset();
    currentPage = 1;
    renderTable(servicePackages);
    renderCards(servicePackages);
}

// Navigation function
function navigateTo(page, id = null) {
    const paths = {
        'add-service-package': '../../pages/admin/service-packages/add.html',
        'view-service-package': `../../pages/admin/service-packages/view.html?id=${id}`,
        'edit-service-package': `../../pages/admin/service-packages/edit.html?id=${id}`
    };
    if (paths[page]) {
        window.adminLayout.loadContent(page, { html: paths[page] });
        window.adminLayout.showNotification(`Chuyển tới trang ${page}`, 'info');
    } else {
        window.adminLayout.showNotification('Trang không tồn tại', 'danger');
    }
}

// Initialize
function initialize() {
    if (document.getElementById('servicePackageTableBody') && document.getElementById('servicePackageCardBody')) {
        renderTable(servicePackages);
        renderCards(servicePackages);
    } else {
        console.error('Required DOM elements not found. Retrying...');
        setTimeout(initialize, 100);
    }
}

// Ensure initialization after content is loaded
document.addEventListener('contentLoaded', () => {
    initialize();
});

// Fallback in case contentLoaded event is missed
document.addEventListener('DOMContentLoaded', () => {
    initialize();
});