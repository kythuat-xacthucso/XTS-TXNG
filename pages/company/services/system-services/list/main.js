// Sample data for service packages (replace with actual API call)
const servicePackages = [
    { id: 1, name: "Gói Cơ bản", price: 1000000, duration: "3 tháng" },
    { id: 2, name: "Gói Nâng cao", price: 3000000, duration: "6 tháng" },
    { id: 3, name: "Gói Doanh nghiệp", price: 6000000, duration: "1 năm" },
    { id: 4, name: "Gói VIP", price: 12000000, duration: "1 năm" },
    { id: 5, name: "Gói Starter", price: 500000, duration: "3 tháng" },
    { id: 6, name: "Gói Pro", price: 8000000, duration: "6 tháng" },
    { id: 7, name: "Gói Lite", price: 2000000, duration: "3 tháng" },
    { id: 8, name: "Gói Premium", price: 15000000, duration: "1 năm" },
    { id: 9, name: "Gói Basic Plus", price: 2500000, duration: "6 tháng" },
    { id: 10, name: "Gói Elite", price: 18000000, duration: "1 năm" },
    { id: 11, name: "Gói Starter Plus", price: 700000, duration: "3 tháng" },
    { id: 12, name: "Gói Advanced", price: 4000000, duration: "6 tháng" },
    { id: 13, name: "Gói Ultimate", price: 20000000, duration: "1 năm" }
];

// State for pagination
let currentPage = 1;
let itemsPerPage = 10;

// Render table for desktop with pagination
function renderTable(data) {
    const tableBody = document.getElementById('servicePackageTableBody');
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
                <td colspan="5" class="text-center">Không có dữ liệu</td>
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
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm" onclick="navigateTo('view-system-service', ${pkg.id})">
                            <i class="fas fa-eye"></i> Xem
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

    paginatedData.forEach(pkg => {
        const card = `
            <div class="col-12 service-package-card" onclick="navigateTo('view-system-service', ${pkg.id})">
                <h5 class="card-title">${pkg.name}</h5>
                <p class="card-text">Giá: ${pkg.price.toLocaleString('vi-VN')} VND</p>
                <p class="card-text">Kỳ hạn: ${pkg.duration}</p>
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

    const filteredData = servicePackages.filter(pkg => {
        return (
            (!name || pkg.name.toLowerCase().includes(name)) &&
            (!price || pkg.price === parseInt(price)) &&
            (!duration || pkg.duration === duration)
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

    const filteredData = servicePackages.filter(pkg => {
        return (
            (!name || pkg.name.toLowerCase().includes(name)) &&
            (!price || pkg.price === parseInt(price)) &&
            (!duration || pkg.duration === duration)
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

// Navigation function (updated to use centralized paths)
function navigateTo(page, id = null) {
    const filePaths = window.companyLayout.getFilePaths(page);
    if (filePaths && filePaths.html) {
        const path = id ? `${filePaths.html}?id=${id}` : filePaths.html;
        window.companyLayout.loadContent(page, { html: path });
    } else {
        window.companyLayout.showNotification('Trang không tồn tại', 'danger');
    }
}

// Initialize
function initialize() {
    const tableBody = document.getElementById('servicePackageTableBody');
    const cardBody = document.getElementById('servicePackageCardBody');
    
    if (tableBody && cardBody) {
        renderTable(servicePackages);
        renderCards(servicePackages);
    } else {
        console.error('Required DOM elements not found.');
        let retryCount = 0;
        const maxRetries = 3;
        function retryInitialize() {
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                setTimeout(() => {
                    if (document.getElementById('servicePackageTableBody') && 
                        document.getElementById('servicePackageCardBody')) {
                        renderTable(servicePackages);
                        renderCards(servicePackages);
                    } else {
                        retryInitialize();
                    }
                }, 100);
            } else {
                window.companyLayout.showNotification('Không thể tải giao diện danh sách gói dịch vụ. Vui lòng thử lại.', 'danger');
            }
        }
        retryInitialize();
    }
}

// Ensure initialization after content is loaded
document.addEventListener('contentLoaded', (e) => {
    if (e.detail.contentId === 'system-services') {
        initialize();
    }
});

// Fallback in case contentLoaded event is missed
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('ssystem-services/list')) {
        initialize();
    }
});