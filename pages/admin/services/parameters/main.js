// main.js (parameters)
// Sample data for parameters (replace with actual API call)
const parameters = [
    { id: 1, name: "Tham số A", unit: "kg", unitPrice: 100000 },
    { id: 2, name: "Tham số B", unit: "m²", unitPrice: 200000 },
    { id: 3, name: "Tham số C", unit: "lít", unitPrice: 150000 },
    { id: 4, name: "Tham số D", unit: "km", unitPrice: 300000 },
    { id: 5, name: "Tham số E", unit: "giờ", unitPrice: 500000 },
    { id: 6, name: "Tham số F", unit: "m³", unitPrice: 250000 },
    { id: 7, name: "Tham số G", unit: "kg", unitPrice: 120000 },
    { id: 8, name: "Tham số H", unit: "lít", unitPrice: 180000 },
    { id: 9, name: "Tham số I", unit: "km", unitPrice: 400000 },
    { id: 10, name: "Tham số J", unit: "giờ", unitPrice: 600000 },
    { id: 11, name: "Tham số K", unit: "m²", unitPrice: 220000 },
    { id: 12, name: "Tham số L", unit: "kg", unitPrice: 130000 },
    { id: 13, name: "Tham số M", unit: "lít", unitPrice: 170000 }
];

// State for pagination
let currentPage = 1;
let itemsPerPage = 10;

// Render table for desktop with pagination
function renderTable(data) {
    const tableBody = document.getElementById('parameterTableBody');
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
                <td colspan="4" class="text-center">Không có dữ liệu</td>
            </tr>
        `;
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    paginatedData.forEach((param, index) => {
        const row = `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${param.name}</td>
                <td>${param.unit}</td>
                <td>${param.unitPrice.toLocaleString('vi-VN')} VND</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    renderPagination(data, 'pagination');
}

// Render cards for tablet/mobile with pagination
function renderCards(data) {
    const cardBody = document.getElementById('parameterCardBody');
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

    paginatedData.forEach(param => {
        const card = `
            <div class="col-12 parameter-card">
                <h5 class="card-title">${param.name}</h5>
                <p class="card-text">Đơn vị tính: ${param.unit}</p>
                <p class="card-text">Đơn giá: ${param.unitPrice.toLocaleString('vi-VN')} VND</p>
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
    const totalPages = Math.ceil(parameters.length / itemsPerPage);
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
    const unit = document.getElementById('filterUnit')?.value.toLowerCase() || '';
    const unitPrice = document.getElementById('filterUnitPrice')?.value || '';

    const filteredData = parameters.filter(param => {
        return (
            (!name || param.name.toLowerCase().includes(name)) &&
            (!unit || param.unit.toLowerCase().includes(unit)) &&
            (!unitPrice || param.unitPrice === parseInt(unitPrice))
        );
    });

    renderTable(filteredData);
    renderCards(filteredData);
}

// Apply filters for mobile
function applyFiltersMobile() {
    const name = document.getElementById('filterNameMobile')?.value.toLowerCase() || '';
    const unit = document.getElementById('filterUnitMobile')?.value.toLowerCase() || '';
    const unitPrice = document.getElementById('filterUnitPriceMobile')?.value || '';

    const filteredData = parameters.filter(param => {
        return (
            (!name || param.name.toLowerCase().includes(name)) &&
            (!unit || param.unit.toLowerCase().includes(unit)) &&
            (!unitPrice || param.unitPrice === parseInt(unitPrice))
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
    renderTable(parameters);
    renderCards(parameters);
}

// Reset filters for mobile
function resetFiltersMobile() {
    const form = document.getElementById('filterFormMobile');
    if (form) form.reset();
    currentPage = 1;
    renderTable(parameters);
    renderCards(parameters);
}

// Navigation function (kept for potential future use)
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
    const tableBody = document.getElementById('parameterTableBody');
    const cardBody = document.getElementById('parameterCardBody');
    
    if (tableBody && cardBody) {
        renderTable(parameters);
        renderCards(parameters);
    } else {
        console.error('Required DOM elements not found.');
        let retryCount = 0;
        const maxRetries = 3;
        function retryInitialize() {
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                setTimeout(() => {
                    if (document.getElementById('parameterTableBody') && 
                        document.getElementById('parameterCardBody')) {
                        renderTable(parameters);
                        renderCards(parameters);
                    } else {
                        retryInitialize();
                    }
                }, 100);
            } else {
                window.companyLayout.showNotification('Không thể tải giao diện danh sách tham số. Vui lòng thử lại.', 'danger');
            }
        }
        retryInitialize();
    }
}

// Ensure initialization after content is loaded
document.addEventListener('contentLoaded', (e) => {
    if (e.detail.contentId === 'parameters') {
        initialize();
    }
});

// Fallback in case contentLoaded event is missed
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('parameters/list')) {
        initialize();
    }
});