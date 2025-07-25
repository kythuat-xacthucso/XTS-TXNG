(function () {
    let initialized = false;
    let serviceCounter = 0;
    let services = [
        { id: 1, name: 'Gói Cơ bản', type: 'Gói chính', params: '10 người dùng', quantity: 1, price: 1000000 },
        { id: 2, name: 'Gói Nâng cao', type: 'Gói bổ sung', params: '50 người dùng', quantity: 2, price: 3000000 }
    ];

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    function initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    function initializeTabFunctionality() {
        const tabButtons = document.querySelectorAll('#serviceTab button[data-bs-toggle="tab"]');
        tabButtons.forEach(button => {
            button.addEventListener('shown.bs.tab', function (event) {
                const targetTab = event.target.getAttribute('data-bs-target');
                console.log('Switched to tab:', targetTab);
                if (targetTab === '#service-info' && !initialized) {
                    checkExpiration();
                    initialized = true;
                }
            });
        });
    }

    function initializeResponsiveHandlers() {
        window.addEventListener('resize', () => setTimeout(initializeTooltips, 100));
    }

    function checkExpiration() {
        const expirationDate = new Date('2025-07-01');
        const today = new Date('2025-07-24T14:26:00+07:00');
        const timeDiff = expirationDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const warningDesktop = document.getElementById('expiration-warning');
        const warningMobile = document.getElementById('mobile-expiration-warning');
        const renewButtonDesktop = document.createElement('button');
        renewButtonDesktop.className = 'btn btn-primary';
        renewButtonDesktop.innerHTML = '<i class="fas fa-refresh me-2"></i>Gia hạn';
        renewButtonDesktop.onclick = showRenewPopup;

        const renewButtonMobile = document.createElement('button');
        renewButtonMobile.className = 'btn btn-primary btn-sm';
        renewButtonMobile.innerHTML = '<i class="fas fa-refresh me-2"></i>Gia hạn';
        renewButtonMobile.onclick = showRenewPopup;

        const headerDesktop = document.getElementById('service-params-header');
        const headerMobile = document.getElementById('mobile-service-params-header');

        if (warningDesktop && warningMobile && headerDesktop && headerMobile) {
            if (daysDiff < 45) {
                warningDesktop.style.display = 'block';
                warningMobile.style.display = 'block';
                if (!headerDesktop.querySelector('.btn-primary')) headerDesktop.appendChild(renewButtonDesktop);
                if (!headerMobile.querySelector('.btn-primary')) headerMobile.appendChild(renewButtonMobile);
            } else {
                warningDesktop.style.display = 'none';
                warningMobile.style.display = 'none';
                if (headerDesktop.querySelector('.btn-primary')) headerDesktop.querySelector('.btn-primary').remove();
                if (headerMobile.querySelector('.btn-primary')) headerMobile.querySelector('.btn-primary').remove();
            }
        }
    }

    function initialize() {
        const serviceInfoTab = document.getElementById('service-info');
        const serviceParamsHeader = document.getElementById('service-params-header');
        const mobileServiceParamsHeader = document.getElementById('mobile-service-params-header');

        if (serviceInfoTab && serviceParamsHeader && mobileServiceParamsHeader) {
            initializeTooltips();
            initializeTabFunctionality();
            initializeResponsiveHandlers();
            checkExpiration();
            initialized = true;
        } else {
            let retryCount = 0, maxRetries = 10;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retry ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        const newServiceInfoTab = document.getElementById('service-info');
                        const newServiceParamsHeader = document.getElementById('service-params-header');
                        const newMobileServiceParamsHeader = document.getElementById('mobile-service-params-header');
                        if (newServiceInfoTab && newServiceParamsHeader && newMobileServiceParamsHeader) {
                            initializeTooltips();
                            initializeTabFunctionality();
                            initializeResponsiveHandlers();
                            checkExpiration();
                            initialized = true;
                        } else retryInitialize();
                    }, 200);
                } else window.companyLayout.showNotification('Không thể tải giao diện dịch vụ hiện tại', 'danger');
            }
            retryInitialize();
        }
    }

    function showRenewPopup() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'renewPopup';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'renewPopupLabel');
        modal.setAttribute('aria-hidden', 'true');

        const modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog modal-dialog-centered';
        if (window.innerWidth < 768) {
            modalDialog.style.margin = '24px 12px';
            modalDialog.className += ' modal-dialog-scrollable';
        } else {
            modalDialog.style.width = '60%';
            modalDialog.style.height = '60vh';
            modalDialog.style.maxWidth = 'none';
        }

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content h-100';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <h5 class="modal-title" id="renewPopupLabel">Gia hạn dịch vụ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body p-4 flex-grow-1';
        modalBody.innerHTML = `
            <div class="mb-3">
                <div><strong>Ngày bắt đầu mới:</strong> ${new Date().toLocaleDateString('vi-VN')}</div>
                <div><strong>Ngày hết hạn mới:</strong> ${new Date(new Date().setMonth(new Date().getMonth() + 3)).toLocaleDateString('vi-VN')}</div>
            </div>
            <div class="mb-3 flex-grow-1">
                <h6>Danh sách gói dịch vụ đang sử dụng</h6>
                <div class="d-none d-md-block">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th width="60">STT</th>
                                    <th>Tên gói</th>
                                    <th width="120">Loại gói</th>
                                    <th width="100">Tham số</th>
                                    <th width="100">Số lượng</th>
                                    <th width="120">Giá tiền</th>
                                    <th width="150">Hành động</th>
                                </tr>
                            </thead>
                            <tbody id="servicesTableBody"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6" class="text-end"><strong>Tổng tiền:</strong></td>
                                    <td class="text-end"><strong id="totalCostFooter">0</strong> VNĐ</td>
                                </tr>
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <button type="button" class="btn btn-outline-primary" id="addServiceDesktop">
                                            <i class="fas fa-plus me-2"></i>Thêm gói dịch vụ
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="d-md-none" id="mobileServicesList"></div>
            </div>
        `;

        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" id="confirmRenew">Xác nhận</button>
        `;

        modalContent.append(modalHeader, modalBody, modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        document.body.appendChild(modal);

        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        renderServices();
        initializePopupEvents();

        modal.addEventListener('hidden.bs.modal', () => modal.remove());
    }

    function renderServices() {
        const tableBody = document.getElementById('servicesTableBody');
        const mobileList = document.getElementById('mobileServicesList');
        tableBody.innerHTML = '';
        mobileList.innerHTML = '';

        services.forEach((service, index) => {
            const stt = index + 1;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${stt}</td>
                <td>${service.name}</td>
                <td>${service.type}</td>
                <td>${service.params}</td>
                <td class="text-center">${service.quantity}</td>
                <td class="text-end">${formatCurrency(service.price)}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="window.serviceInfo.removeService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);

            const card = document.createElement('div');
            card.className = 'service-card mb-3';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title">Gói ${stt}</div>
                    <button type="button" class="btn btn-danger btn-sm remove-btn" onclick="window.serviceInfo.removeService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p><strong>Tên gói:</strong> ${service.name}</p>
                <p><strong>Loại gói:</strong> ${service.type}</p>
                <p><strong>Tham số:</strong> ${service.params}</p>
                <p><strong>Số lượng:</strong> ${service.quantity}</p>
                <p><strong>Giá tiền:</strong> ${formatCurrency(service.price)}</p>
            `;
            mobileList.appendChild(card);
        });

        calculateTotalCost();
    }

    function removeService(id) {
        services = services.filter(s => s.id !== id);
        renderServices();
    }

    function calculateTotalCost() {
        const totalCost = services.reduce((sum, s) => sum + s.price * s.quantity, 0);
        document.getElementById('totalCostFooter').textContent = formatCurrency(totalCost);
    }

    function initializePopupEvents() {
        document.getElementById('addServiceDesktop').addEventListener('click', () => {
            serviceCounter++;
            services.push({ id: serviceCounter, name: 'Gói mới', type: 'Gói bổ sung', params: 'N/A', quantity: 1, price: 0 });
            renderServices();
        });
        document.getElementById('confirmRenew').addEventListener('click', confirmRenew);
    }

    function confirmRenew() {
        window.companyLayout.showNotification('Gia hạn thành công!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('renewPopup')).hide();
    }

    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'current-services') initialize();
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('services/current-services/list')) initialize();
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(initialize, 0);

    window.serviceInfo = {
        initializeTooltips,
        initializeTabFunctionality,
        initializeResponsiveHandlers,
        checkExpiration,
        removeService
    };
})();