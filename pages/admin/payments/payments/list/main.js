(function () {
    // Sample data for payments (replace with actual API call)
    const payments = [
        { id: 1, code: "PAY001", customerName: "Nguyễn Văn A", amount: 1000000, createdAt: "2025-06-01 10:00", paidAt: "", approvedBy: "", status: "new" },
        { id: 2, code: "PAY002", customerName: "Trần Thị B", amount: 3000000, createdAt: "2025-06-02 14:30", paidAt: "2025-06-02 15:00", approvedBy: "", status: "awaiting" },
        { id: 3, code: "PAY003", customerName: "Lê Văn C", amount: 6000000, createdAt: "2025-06-03 09:15", paidAt: "2025-06-03 10:00", approvedBy: "Admin1", status: "approved" },
        { id: 4, code: "PAY004", customerName: "Phạm Thị D", amount: 12000000, createdAt: "2025-06-04 11:00", paidAt: "", approvedBy: "", status: "new" },
        { id: 5, code: "PAY005", customerName: "Hoàng Văn E", amount: 500000, createdAt: "2025-06-05 13:00", paidAt: "2025-06-05 14:00", approvedBy: "", status: "awaiting" },
        { id: 6, code: "PAY006", customerName: "Ngô Thị F", amount: 8000000, createdAt: "2025-06-06 15:00", paidAt: "2025-06-06 16:00", approvedBy: "Admin2", status: "approved" },
        { id: 7, code: "PAY007", customerName: "Đinh Văn G", amount: 2000000, createdAt: "2025-06-07 09:00", paidAt: "", approvedBy: "", status: "rejected" },
        { id: 8, code: "PAY008", customerName: "Bùi Thị H", amount: 15000000, createdAt: "2025-06-08 10:30", paidAt: "2025-06-08 11:00", approvedBy: "", status: "awaiting" },
        { id: 9, code: "PAY009", customerName: "Vũ Văn I", amount: 2500000, createdAt: "2025-06-09 14:00", paidAt: "2025-06-09 15:00", approvedBy: "Admin3", status: "approved" },
        { id: 10, code: "PAY010", customerName: "Lý Thị K", amount: 18000000, createdAt: "2025-06-10 11:15", paidAt: "", approvedBy: "", status: "new" },
        { id: 11, code: "PAY011", customerName: "Mai Văn L", amount: 700000, createdAt: "2025-06-11 13:00", paidAt: "2025-06-11 14:00", approvedBy: "", status: "awaiting" },
        { id: 12, code: "PAY012", customerName: "Nguyễn Thị M", amount: 4000000, createdAt: "2025-06-12 09:45", paidAt: "", approvedBy: "", status: "rejected" },
        { id: 13, code: "PAY013", customerName: "Trần Văn N", amount: 20000000, createdAt: "2025-06-13 15:30", paidAt: "2025-06-13 16:00", approvedBy: "Admin4", status: "approved" }
    ];

    // State for pagination
    let currentPage = 1;
    let itemsPerPage = 10;

    // Render table for desktop with pagination
    function renderTable(data) {
        const tableBody = document.getElementById('paymentTableBody');
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
                    <td colspan="9" class="text-center">Không có dữ liệu</td>
                </tr>
            `;
            document.getElementById('pagination').innerHTML = '';
            return;
        }

        paginatedData.forEach((payment, index) => {
            const statusText = payment.status === 'new' ? 'Mới tạo' : payment.status === 'awaiting' ? 'Chờ duyệt' : payment.status === 'approved' ? 'Đã duyệt' : 'Từ chối';
            const statusClass = payment.status === 'new' ? 'bg-secondary' : payment.status === 'awaiting' ? 'bg-warning' : payment.status === 'approved' ? 'bg-success' : 'bg-danger';
            const row = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${payment.code}</td>
                    <td>${payment.customerName}</td>
                    <td>${payment.amount.toLocaleString('vi-VN')} VND</td>
                    <td>${payment.createdAt}</td>
                    <td>${payment.paidAt || '-'}</td>
                    <td>${payment.approvedBy || '-'}</td>
                    <td>
                        <span class="badge ${statusClass}">${statusText}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary btn-sm" onclick="viewPaymentDetails(${payment.id})">
                                <i class="fas fa-eye"></i>
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
        const cardBody = document.getElementById('paymentCardBody');
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

        paginatedData.forEach(payment => {
            const statusText = payment.status === 'new' ? 'Mới tạo' : payment.status === 'awaiting' ? 'Chờ duyệt' : payment.status === 'approved' ? 'Đã duyệt' : 'Từ chối';
            const statusClass = payment.status === 'new' ? 'bg-secondary' : payment.status === 'awaiting' ? 'bg-warning' : payment.status === 'approved' ? 'bg-success' : 'bg-danger';
            const card = `
                <div class="col-12 payment-card">
                    <h5 class="card-title">${payment.code}</h5>
                    <p class="card-text">Mã đơn: ${payment.code}</p>
                    <p class="card-text">Chủ thể: ${payment.customerName}</p>
                    <p class="card-text">Số tiền: ${payment.amount.toLocaleString('vi-VN')} VND</p>
                    <p class="card-text">Thời gian tạo: ${payment.createdAt}</p>
                    <p class="card-text">Thời gian thanh toán: ${payment.paidAt || '-'}</p>
                    <p class="card-text">Người duyệt: ${payment.approvedBy || '-'}</p>
                    <p class="card-text">
                        <span class="badge ${statusClass}">${statusText}</span>
                    </p>
                    <div class="action-buttons">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="viewPaymentDetails(${payment.id})">
                            <i class="fas fa-eye"></i> Xem
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
        const totalPages = Math.ceil(payments.length / itemsPerPage);
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
        const code = document.getElementById('filterCode')?.value.toLowerCase() || '';
        const customerName = document.getElementById('filterCustomerName')?.value.toLowerCase() || '';
        const amount = document.getElementById('filterAmount')?.value || '';
        const status = document.getElementById('filterStatus')?.value || '';

        const filteredData = payments.filter(payment => {
            return (
                (!code || payment.code.toLowerCase().includes(code)) &&
                (!customerName || payment.customerName.toLowerCase().includes(customerName)) &&
                (!amount || payment.amount === parseInt(amount)) &&
                (!status || payment.status === status)
            );
        });

        renderTable(filteredData);
        renderCards(filteredData);
    }

    // Apply filters for mobile
    function applyFiltersMobile() {
        const code = document.getElementById('filterCodeMobile')?.value.toLowerCase() || '';
        const customerName = document.getElementById('filterCustomerNameMobile')?.value.toLowerCase() || '';
        const amount = document.getElementById('filterAmountMobile')?.value || '';
        const status = document.getElementById('filterStatusMobile')?.value || '';

        const filteredData = payments.filter(payment => {
            return (
                (!code || payment.code.toLowerCase().includes(code)) &&
                (!customerName || payment.customerName.toLowerCase().includes(customerName)) &&
                (!amount || payment.amount === parseInt(amount)) &&
                (!status || payment.status === status)
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
        renderTable(payments);
        renderCards(payments);
    }

    // Reset filters for mobile
    function resetFiltersMobile() {
        const form = document.getElementById('filterFormMobile');
        if (form) form.reset();
        currentPage = 1;
        renderTable(payments);
        renderCards(payments);
    }

    // View payment details by navigating to view-order-payment
    function viewPaymentDetails(paymentId) {
        const payment = payments.find(p => p.id === paymentId);
        if (!payment) {
            window.adminLayout.showNotification('Không tìm thấy thanh toán', 'danger');
            return;
        }

        payment.status = payment.status === 'paid' ? 'awaiting' : payment.status;

        window.adminLayout.loadContent('view-order-payment');
        history.pushState(null, '', `?id=${paymentId}`);
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
        const tableBody = document.getElementById('paymentTableBody');
        const cardBody = document.getElementById('paymentCardBody');
        
        if (tableBody && cardBody) {
            renderTable(payments);
            renderCards(payments);
        } else {
            console.error('Required DOM elements not found.');
            let retryCount = 0;
            const maxRetries = 3;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        if (document.getElementById('paymentTableBody') && 
                            document.getElementById('paymentCardBody')) {
                            renderTable(payments);
                            renderCards(payments);
                        } else {
                            retryInitialize();
                        }
                    }, 100);
                } else {
                    window.adminLayout.showNotification('Không thể tải giao diện danh sách thanh toán. Vui lòng thử lại.', 'danger');
                }
            }
            retryInitialize();
        }
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'payments') {
            initialize();
        }
    });

    // Fallback in case contentLoaded event is missed
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('payments/list')) {
            initialize();
        }
    });

    // Expose functions to global scope
    window.changePage = changePage;
    window.changeItemsPerPage = changeItemsPerPage;
    window.applyFilters = applyFilters;
    window.applyFiltersMobile = applyFiltersMobile;
    window.resetFilters = resetFilters;
    window.resetFiltersMobile = resetFiltersMobile;
    window.viewPaymentDetails = viewPaymentDetails;
})();