(function () {
    // Sample user data (replace with actual API call)
    let users = [
        { id: 1, name: "Nguyễn Văn A", phone: "0901234567", email: "nguyenva@example.com", address: "123 Đường ABC, Hà Nội", status: "active" },
        { id: 2, name: "Trần Thị B", phone: "0912345678", email: "tranthi@example.com", address: "456 Đường DEF, TP.HCM", status: "inactive" }
    ];

    // Initialize users list
    window.initializeUsers = function(entityData) {
        const tableBody = document.getElementById('usersTableBody');
        const cardContainer = document.getElementById('usersCardContainer');
        if (!tableBody || !cardContainer) {
            console.warn('Users table or card container not found');
            return;
        }

        tableBody.innerHTML = '';
        cardContainer.innerHTML = '';

        users.forEach((user, index) => {
            // Desktop Table Row
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.status === 'active' ? 'Đang hoạt động' : 'Hủy liên kết'}</td>
                <td>
                    <button class="action-btn ${user.status === 'active' ? 'unlink' : 'link'}" data-user-id="${user.id}" title="${user.status === 'active' ? 'Hủy liên kết' : 'Liên kết lại'}">
                        <i class="fas ${user.status === 'active' ? 'fa-unlink' : 'fa-link'}"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tableRow);

            // Mobile/Tablet Card
            const card = document.createElement('div');
            card.className = 'col user-card';
            card.innerHTML = `
                <div class="card-title">${user.name}</div>
                <div class="card-text">SĐT: ${user.phone}</div>
                <div class="card-text">Email: ${user.email}</div>
                <div class="card-text">Địa chỉ: ${user.address}</div>
                <div class="card-text">Trạng thái: ${user.status === 'active' ? 'Đang hoạt động' : 'Hủy liên kết'}</div>
                <div>
                    <button class="action-btn ${user.status === 'active' ? 'unlink' : 'link'}" data-user-id="${user.id}" title="${user.status === 'active' ? 'Hủy liên kết' : 'Liên kết lại'}">
                        <i class="fas ${user.status === 'active' ? 'fa-unlink' : 'fa-link'}"></i>
                    </button>
                </div>
            `;
            cardContainer.appendChild(card);
        });

        // Add event listeners for action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', handleActionClick);
        });
    };

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div id="${toastId}" class="toast toast-${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
                <div class="toast-header">
                    <strong class="me-auto">Thông báo</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;
        toastContainer.innerHTML += toastHTML;
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
    }

    // Handle action button click (Unlink/Link)
    function handleActionClick(event) {
        const userId = event.target.getAttribute('data-user-id');
        const user = users.find(u => u.id === parseInt(userId));
        const action = event.target.classList.contains('unlink') ? 'hủy liên kết' : 'liên kết lại';
        const modalTitle = action === 'hủy liên kết' ? 'Xác nhận hủy liên kết' : 'Xác nhận liên kết lại';
        const confirmButtonClass = action === 'hủy liên kết' ? 'btn-danger' : 'btn-success';

        document.getElementById('confirmActionModalLabel').textContent = modalTitle;
        document.getElementById('confirmActionText').textContent = action;
        document.getElementById('confirmUserName').textContent = user.name;
        document.getElementById('confirmActionButton').className = `btn ${confirmButtonClass}`;

        const modal = new bootstrap.Modal(document.getElementById('confirmActionModal'));
        modal.show();

        document.getElementById('confirmActionButton').onclick = () => {
            user.status = action === 'hủy liên kết' ? 'inactive' : 'active';
            modal.hide();
            showToast(`Đã ${action} người dùng ${user.name} thành công`, 'success');
            window.initializeUsers(entityData); // Refresh the list
        };
    }

    // Handle Add User Modal
    function handleAddUserModal() {
        const phoneRadio = document.getElementById('phoneRadio');
        const emailRadio = document.getElementById('emailRadio');
        const contactInput = document.getElementById('contactInput');
        const checkButton = document.getElementById('checkButton');
        const linkButton = document.getElementById('linkButton');
        const userDetails = document.getElementById('userDetails');
        const userName = document.getElementById('userName');
        const userPhone = document.getElementById('userPhone');
        const userEmail = document.getElementById('userEmail');
        const userAddress = document.getElementById('userAddress');

        if (!phoneRadio || !emailRadio || !contactInput || !checkButton || !linkButton || !userDetails) {
            console.warn('Add user modal elements not found');
            return;
        }

        phoneRadio.addEventListener('change', () => {
            contactInput.placeholder = 'Nhập số điện thoại';
            contactInput.value = '';
            userDetails.style.display = 'none';
            checkButton.disabled = false;
            linkButton.style.display = 'none';
        });

        emailRadio.addEventListener('change', () => {
            contactInput.placeholder = 'Nhập email';
            contactInput.value = '';
            userDetails.style.display = 'none';
            checkButton.disabled = false;
            linkButton.style.display = 'none';
        });

        checkButton.addEventListener('click', () => {
            const contactValue = contactInput.value.trim();
            if (!contactValue) {
                showToast('Vui lòng nhập thông tin', 'warning');
                return;
            }

            // Simulate API check (replace with actual API call)
            const isLinked = Math.random() < 0.33; // 33% chance linked
            const exists = Math.random() < 0.66; // 66% chance exists

            if (isLinked) {
                showToast('Người dùng này đã được liên kết với chủ thể này rồi', 'warning');
            } else if (!exists) {
                showToast('Người dùng không tồn tại trong hệ thống', 'warning');
            } else {
                // Simulate user data
                const newUser = {
                    id: users.length + 1,
                    name: `Người dùng ${contactValue}`,
                    phone: phoneRadio.checked ? contactValue : '0901234567',
                    email: emailRadio.checked ? contactValue : 'user@example.com',
                    address: '123 Đường XYZ, Hà Nội',
                    status: 'active'
                };
                userName.textContent = newUser.name;
                userPhone.textContent = newUser.phone;
                userEmail.textContent = newUser.email;
                userAddress.textContent = newUser.address;
                userDetails.style.display = 'block';
                checkButton.disabled = true;
                linkButton.style.display = 'inline-block';
            }
        });

        linkButton.addEventListener('click', () => {
            const contactValue = contactInput.value.trim();
            const newUser = {
                id: users.length + 1,
                name: `Người dùng ${contactValue}`,
                phone: phoneRadio.checked ? contactValue : '0901234567',
                email: emailRadio.checked ? contactValue : 'user@example.com',
                address: '123 Đường XYZ, Hà Nội',
                status: 'active'
            };

            document.getElementById('confirmActionModalLabel').textContent = 'Xác nhận liên kết';
            document.getElementById('confirmActionText').textContent = 'liên kết';
            document.getElementById('confirmUserName').textContent = newUser.name;
            document.getElementById('confirmActionButton').className = 'btn btn-success';

            const modal = new bootstrap.Modal(document.getElementById('confirmActionModal'));
            modal.show();

            document.getElementById('confirmActionButton').onclick = () => {
                users.push(newUser);
                modal.hide();
                bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
                showToast(`Đã liên kết người dùng ${newUser.name} thành công`, 'success');
                window.initializeUsers(entityData); // Refresh the list
            };
        });
    }

    // Initialize (only setup event listeners, initialization deferred to loadTabContent)
    function initialize() {
        const entityNameElement = document.getElementById('entityName');
        if (entityNameElement) {
            entityNameElement.textContent = entityData.entityName;
        }
        updateEntityStatusUI();

        // Load the default tab (entity-info) with proper initialization
        loadTabContent('entity-info').then(() => {
            // Update active tab manually
            document.querySelectorAll('#entityTabs .nav-link').forEach(t => t.classList.remove('active'));
            document.getElementById('entity-info-tab').classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
            document.getElementById('entity-info').classList.add('show', 'active');
        });

        const tabs = document.querySelectorAll('#entityTabs .nav-link');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default tab behavior
                const tabId = tab.getAttribute('data-tab-id');
                loadTabContent(tabId).then(() => {
                    // Update active tab manually
                    document.querySelectorAll('#entityTabs .nav-link').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
                    document.getElementById(tabId).classList.add('show', 'active');
                });
            });
        });
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'production-entities-view') {
            console.log('contentLoaded event triggered for production-entities-view with entityId:', e.detail.filePaths.entityId);
            const entityId = e.detail.filePaths.entityId;
            if (entityId) {
                entityData = {
                    id: entityId,
                    entityName: `Công ty ${entityId}`,
                    status: entityData.status || 'active'
                };
            }
            initialize();
        }
    });

    // Fallback in case contentLoaded event is missed
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('production-entities-view')) {
            console.log('DOMContentLoaded triggered, initializing...');
            initialize();
        } else if (document.getElementById('entityTabs')) {
            console.log('Manual initialization due to missing event');
            initialize();
        }
    });

    // Immediate initialization check (as a fallback)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document ready, initializing immediately');
        initialize();
    }

    // Initialize modal logic when tab is loaded
    if (document.getElementById('addUserModal')) {
        handleAddUserModal();
    }

    window.editEntity = editEntity;
    window.toggleLockEntity = toggleLockEntity;
})();