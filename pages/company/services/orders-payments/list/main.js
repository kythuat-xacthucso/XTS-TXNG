// Sample data for invoices (replace with actual API call)
const invoices = [
    { id: 1, code: "INV001", amount: 1000000, createdAt: "2025-06-01 10:00", paidAt: null, creator: "Nguyễn Văn A", status: "Chưa thanh toán" },
    { id: 2, code: "INV002", amount: 3000000, createdAt: "2025-06-02 14:30", paidAt: "2025-06-03 09:00", creator: "Trần Thị B", status: "Đã thanh toán" },
    { id: 3, code: "INV003", amount: 6000000, createdAt: "2025-06-03 16:00", paidAt: "2025-06-04 11:00", creator: "Lê Văn C", status: "Đã duyệt" },
    { id: 4, code: "INV004", amount: 12000000, createdAt: "2025-06-04 08:00", paidAt: null, creator: "Phạm Thị D", status: "Chưa thanh toán" },
    { id: 5, code: "INV005", amount: 500000, createdAt: "2025-06-05 12:00", paidAt: "2025-06-06 15:00", creator: "Hoàng Văn E", status: "Đã thanh toán" },
    { id: 6, code: "INV006", amount: 8000000, createdAt: "2025-06-06 09:00", paidAt: "2025-06-07 10:00", creator: "Nguyễn Thị F", status: "Đã duyệt" },
    { id: 7, code: "INV007", amount: 2000000, createdAt: "2025-06-07 11:00", paidAt: null, creator: "Trần Văn G", status: "Chưa thanh toán" },
    { id: 8, code: "INV008", amount: 15000000, createdAt: "2025-06-08 13:00", paidAt: "2025-06-09 14:00", creator: "Lê Thị H", status: "Đã duyệt" },
    { id: 9, code: "INV009", amount: 2500000, createdAt: "2025-06-09 15:00", paidAt: null, creator: "Phạm Văn I", status: "Chưa thanh toán" },
    { id: 10, code: "INV010", amount: 18000000, createdAt: "2025-06-10 17:00", paidAt: "2025-06-11 08:00", creator: "Hoàng Thị K", status: "Đã thanh toán" },
    { id: 11, code: "INV011", amount: 700000, createdAt: "2025-06-11 10:00", paidAt: null, creator: "Nguyễn Văn L", status: "Chưa thanh toán" },
    { id: 12, code: "INV012", amount: 4000000, createdAt: "2025-06-12 12:00", paidAt: "2025-06-13 16:00", creator: "Trần Thị M", status: "Đã duyệt" },
    { id: 13, code: "INV013", amount: 20000000, createdAt: "2025-06-13 14:00", paidAt: null, creator: "Lê Văn N", status: "Chưa thanh toán" }
];

// State for pagination
let currentPage = 1;
let itemsPerPage = 10;

// Format date
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Render table for desktop with pagination
function renderTable(data) {
    const tableBody = document.getElementById('invoiceTableBody');
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
                <td colspan="8" class="text-center">Không có dữ liệu</td>
            </tr>
        `;
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    paginatedData.forEach((invoice, index) => {
        const row = `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${invoice.code}</td>
                <td>${invoice.amount.toLocaleString('vi-VN')} VND</td>
                <td>${formatDate(invoice.createdAt)}</td>
                <td>${formatDate(invoice.paidAt)}</td>
                <td>${invoice.creator}</td>
                <td>${invoice.status}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm" onclick="navigateTo('view-order-payment', ${invoice.id})">
                            <i class="fas fa-eye"></i> Xem
                        </button>
                        ${invoice.status === 'Chưa thanh toán' ? `
                            <button class="btn btn-outline-warning btn-sm ms-1" onclick="navigateTo('edit-order-payment', ${invoice.id})">
                                <i class="fas fa-edit"></i> Sửa
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
    const cardBody = document.getElementById('invoiceCardBody');
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

    paginatedData.forEach(invoice => {
        const card = `
            <div class="col-12 invoice-card" onclick="navigateTo('view-order-payment', ${invoice.id})">
                <h5 class="card-title">${invoice.code}</h5>
                <p class="card-text">Số tiền: ${invoice.amount.toLocaleString('vi-VN')} VND</p>
                <p class="card-text">Thời gian tạo: ${formatDate(invoice.createdAt)}</p>
                <p class="card-text">Trạng thái: ${invoice.status}</p>
                ${invoice.status === 'Chưa thanh toán' ? `
                    <button class="btn btn-outline-warning btn-sm mt-2" onclick="event.stopPropagation(); navigateTo('edit-order-payment', ${invoice.id})">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                ` : ''}
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
    const maxVisiblePages = 3;
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
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
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
    const code = document.getElementById('filterInvoiceCode')?.value.toLowerCase() || '';
    const status = document.getElementById('filterStatus')?.value || '';
    const creator = document.getElementById('filterCreator')?.value.toLowerCase() || '';

    const filteredData = invoices.filter(invoice => {
        return (
            (!code || invoice.code.toLowerCase().includes(code)) &&
            (!status || invoice.status === status) &&
            (!creator || invoice.creator.toLowerCase().includes(creator))
        );
    });

    renderTable(filteredData);
    renderCards(filteredData);
}

// Apply filters for mobile
function applyFiltersMobile() {
    const code = document.getElementById('filterInvoiceCodeMobile')?.value.toLowerCase() || '';
    const status = document.getElementById('filterStatusMobile')?.value || '';
    const creator = document.getElementById('filterCreatorMobile')?.value.toLowerCase() || '';

    const filteredData = invoices.filter(invoice => {
        return (
            (!code || invoice.code.toLowerCase().includes(code)) &&
            (!status || invoice.status === status) &&
            (!creator || invoice.creator.toLowerCase().includes(creator))
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
    renderTable(invoices);
    renderCards(invoices);
}

// Reset filters for mobile
function resetFiltersMobile() {
    const form = document.getElementById('filterFormMobile');
    if (form) form.reset();
    currentPage = 1;
    renderTable(invoices);
    renderCards(invoices);
}

// Navigation function
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
    const tableBody = document.getElementById('invoiceTableBody');
    const cardBody = document.getElementById('invoiceCardBody');
    
    if (tableBody && cardBody) {
        renderTable(invoices);
        renderCards(invoices);
    } else {
        console.error('Required DOM elements not found.');
        let retryCount = 0;
        const maxRetries = 5;
        function retryInitialize() {
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retry ${retryCount}/${maxRetries}`);
                setTimeout(() => {
                    if (document.getElementById('invoiceTableBody') && 
                        document.getElementById('invoiceCardBody')) {
                        renderTable(invoices);
                        renderCards(invoices);
                    } else {
                        retryInitialize();
                    }
                }, 100);
            } else {
                window.companyLayout.showNotification('Không thể tải giao diện danh sách hóa đơn', 'danger');
            }
        }
        retryInitialize();
    }
}

// Ensure initialization after content is loaded
document.addEventListener('contentLoaded', (e) => {
    if (e.detail.contentId === 'orders-payments') {
        initialize();
    }
});

// Fallback
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('orders-payments/list')) {
        initialize();
    }
});