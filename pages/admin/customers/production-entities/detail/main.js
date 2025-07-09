(function () {
    // Sample entity data (replace with actual API call)
    let entityData = {
        id: 1,
        entityName: "Công ty X",
        status: "active"
    };

    // Tab configuration (adjusted to match actual directory structure)
    const tabConfig = {
        "entity-info": {
            html: "../../pages/admin/customers/production-entities/detail/info/index.html",
            css: "../../pages/admin/customers/production-entities/detail/info/style.css",
            js: "../../pages/admin/customers/production-entities/detail/info/main.js"
        },
        "users": {
            html: "../../pages/admin/customers/production-entities/detail/users/index.html",
            css: "../../pages/admin/customers/production-entities/detail/users/style.css",
            js: "../../pages/admin/customers/production-entities/detail/users/main.js"
        },
        "products": {
            html: "./products/index.html",
            css: "./products/style.css",
            js: "./products/main.js"
        },
        "services": {
            html: "./services/index.html",
            css: "./services/style.css",
            js: "./services/main.js"
        },
        "labels": {
            html: "./labels/index.html",
            css: "./labels/style.css",
            js: "./labels/main.js"
        },
        "payments": {
            html: "./payments/index.html",
            css: "./payments/style.css",
            js: "./payments/main.js"
        }
    };

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

    // Show loading overlay
    function showLoading(tabId) {
        const tabPane = document.getElementById(tabId);
        if (tabPane) {
            tabPane.innerHTML = '<div class="loading-overlay"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        }
    }

    // Load tab content with enhanced error handling and loading effect
    function loadTabContent(tabId) {
        const tabPane = document.getElementById(tabId);
        if (!tabPane) {
            console.warn(`Tab pane ${tabId} not found`);
            showToast(`Không thể tải nội dung tab ${tabId}`, 'danger');
            return Promise.resolve(); // Return resolved promise to avoid unhandled rejection
        }

        // Clear previous content of the current tab pane
        tabPane.innerHTML = '';

        const config = tabConfig[tabId];
        if (!config) {
            console.warn(`No configuration found for tab ${tabId}`);
            showToast(`Không tìm thấy cấu hình cho tab ${tabId}`, 'danger');
            return Promise.resolve();
        }

        // Show loading overlay
        showLoading(tabId);

        // Simulate minimum 1-second loading
        return new Promise(resolve => {
            setTimeout(() => {
                // Log the fetch request for debugging
                console.log(`Attempting to load HTML from: ${config.html}`);
                fetch(config.html)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load ${config.html}: ${response.status} - ${response.statusText}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        tabPane.innerHTML = html;

                        // Load CSS
                        const existingCss = document.querySelector(`link[data-tab-id="${tabId}"]`);
                        if (!existingCss) {
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = config.css;
                            link.dataset.tabId = tabId;
                            document.head.appendChild(link);
                            console.log(`Loaded CSS: ${config.css}`);
                        }

                        // Load JS
                        const existingJs = document.querySelector(`script[data-tab-id="${tabId}"]`);
                        if (!existingJs) {
                            const script = document.createElement('script');
                            script.src = config.js;
                            script.dataset.tabId = tabId;
                            script.onload = () => {
                                console.log(`Loaded JS: ${config.js}`);
                                // Initialize tab-specific content
                                if (tabId === 'entity-info' && window.initializeEntityInfo) {
                                    window.initializeEntityInfo(entityData);
                                } else if (tabId === 'users' && window.initializeUsers) {
                                    window.initializeUsers(entityData); // Pass entityData if needed
                                }
                                // Add more tab-specific initialization here as needed
                            };
                            script.onerror = () => console.error(`Failed to load JS: ${config.js}`);
                            document.body.appendChild(script);
                        } else {
                            // Re-initialize if JS is already loaded
                            if (tabId === 'entity-info' && window.initializeEntityInfo) {
                                window.initializeEntityInfo(entityData);
                            } else if (tabId === 'users' && window.initializeUsers) {
                                window.initializeUsers(entityData);
                            }
                        }

                        showToast(`Đã tải nội dung tab ${tabId}`, 'success');
                        resolve();
                    })
                    .catch(error => {
                        console.error(`Error loading tab ${tabId}:`, error);
                        tabPane.innerHTML = `<div class="alert alert-danger">Lỗi khi tải nội dung: ${error.message}</div>`;
                        showToast(`Lỗi khi tải nội dung tab ${tabId}: ${error.message}`, 'danger');
                        resolve();
                    });
            }, 1000); // Minimum 1-second delay
        });
    }

    // Edit entity
    function editEntity() {
        window.adminLayout.loadContent('edit-production-entity', {
            html: '../../pages/admin/customers/production-entities/edit/index.html',
            entityId: entityData.id
        });
    }

    // Toggle lock/unlock entity
    function toggleLockEntity() {
        const lockButton = document.getElementById('lockButton');
        const isLocked = entityData.status === 'locked';

        if (isLocked) {
            const modal = new bootstrap.Modal(document.getElementById('confirmUnlockModal'));
            document.getElementById('confirmUnlockEntityName').textContent = entityData.entityName;

            const confirmButton = document.getElementById('confirmUnlockButton');
            const confirmHandler = () => {
                entityData.status = 'active';
                updateEntityStatusUI();
                modal.hide();
                showToast(`Đã mở khóa chủ thể ${entityData.entityName}`, 'success');
                confirmButton.removeEventListener('click', confirmHandler);
            };

            confirmButton.removeEventListener('click', confirmHandler);
            confirmButton.addEventListener('click', confirmHandler);

            modal.show();
        } else {
            const modal = new bootstrap.Modal(document.getElementById('confirmLockModal'));
            document.getElementById('confirmLockEntityName').textContent = entityData.entityName;

            const confirmButton = document.getElementById('confirmLockButton');
            const confirmHandler = () => {
                entityData.status = 'locked';
                updateEntityStatusUI();
                modal.hide();
                showToast(`Đã khóa chủ thể ${entityData.entityName}`, 'success');
                confirmButton.removeEventListener('click', confirmHandler);
            };

            confirmButton.removeEventListener('click', confirmHandler);
            confirmButton.addEventListener('click', confirmHandler);

            modal.show();
        }
    }

    // Update entity status UI
    function updateEntityStatusUI() {
        const entityStatusElement = document.getElementById('entityStatus');
        const lockButton = document.getElementById('lockButton');
        if (entityStatusElement && lockButton) {
            const statusText = entityData.status === 'active' ? 'Đang hoạt động' : 'Khóa';
            const statusClass = entityData.status === 'active' ? 'bg-success' : 'bg-danger';
            const buttonText = entityData.status === 'active' ? 'Khóa' : 'Mở khóa';
            const buttonClass = entityData.status === 'active' ? 'btn-danger' : 'btn-success';

            entityStatusElement.textContent = statusText;
            entityStatusElement.className = `badge ${statusClass}`;
            lockButton.textContent = buttonText;
            lockButton.className = `btn ${buttonClass}`;
        }
    }

    // Initialize
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

    window.editEntity = editEntity;
    window.toggleLockEntity = toggleLockEntity;
})();