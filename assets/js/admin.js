const menuConfig = {
    overview: {
        title: 'Tổng quan',
        submenu: null,
        defaultContent: 'overview',
        files: {
            html: '../../pages/admin/overview/index.html',
            css: '../../pages/admin/overview/style.css',
            js: '../../pages/admin/overview/main.js'
        }
    },
    customers: {
        title: 'Khách hàng',
        submenu: [
            { 
                id: 'pending-profiles', 
                name: 'Hồ sơ chờ duyệt', 
                icon: 'fas fa-user-clock',
                files: {
                    html: '../../pages/admin/customers/pending-profiles/list/index.html',
                    css: '../../pages/admin/customers/pending-profiles/list/style.css',
                    js: '../../pages/admin/customers/pending-profiles/list/main.js'
                },
                submenu: [
                    { 
                        id: 'pending-profiles-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/customers/pending-profiles/list/index.html',
                            css: '../../pages/admin/customers/pending-profiles/list/style.css',
                            js: '../../pages/admin/customers/pending-profiles/list/main.js'
                        }
                    },
                    { 
                        id: 'pending-profiles-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/customers/pending-profiles/add/index.html',
                            css: '../../pages/admin/customers/pending-profiles/add/style.css',
                            js: '../../pages/admin/customers/pending-profiles/add/main.js'
                        }
                    },
                    { 
                        id: 'pending-profiles-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/customers/pending-profiles/detail/index.html',
                            css: '../../pages/admin/customers/pending-profiles/detail/style.css',
                            js: '../../pages/admin/customers/pending-profiles/detail/main.js'
                        }
                    },
                    { 
                        id: 'pending-profiles-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/customers/pending-profiles/edit/index.html',
                            css: '../../pages/admin/customers/pending-profiles/edit/style.css',
                            js: '../../pages/admin/customers/pending-profiles/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'pending-profiles-list'
            },
            { 
                id: 'manage-entities', 
                name: 'Chủ thể quản lý', 
                icon: 'fas fa-building',
                files: {
                    html: '../../pages/admin/customers/manage-entities/list/index.html',
                    css: '../../pages/admin/customers/manage-entities/list/style.css',
                    js: '../../pages/admin/customers/manage-entities/list/main.js'
                },
                submenu: [
                    { 
                        id: 'manage-entities-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/customers/manage-entities/list/index.html',
                            css: '../../pages/admin/customers/manage-entities/list/style.css',
                            js: '../../pages/admin/customers/manage-entities/list/main.js'
                        }
                    },
                    { 
                        id: 'manage-entities-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/customers/manage-entities/add/index.html',
                            css: '../../pages/admin/customers/manage-entities/add/style.css',
                            js: '../../pages/admin/customers/manage-entities/add/main.js'
                        }
                    },
                    { 
                        id: 'manage-entities-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/customers/manage-entities/detail/index.html',
                            css: '../../pages/admin/customers/manage-entities/detail/style.css',
                            js: '../../pages/admin/customers/manage-entities/detail/main.js'
                        }
                    },
                    { 
                        id: 'manage-entities-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/customers/manage-entities/edit/index.html',
                            css: '../../pages/admin/customers/manage-entities/edit/style.css',
                            js: '../../pages/admin/customers/manage-entities/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'manage-entities-list'
            },
            { 
                id: 'production-entities', 
                name: 'Chủ thể sản xuất', 
                icon: 'fas fa-industry',
                files: {
                    html: '../../pages/admin/customers/production-entities/list/index.html',
                    css: '../../pages/admin/customers/production-entities/list/style.css',
                    js: '../../pages/admin/customers/production-entities/list/main.js'
                },
                submenu: [
                    { 
                        id: 'production-entities-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/customers/production-entities/list/index.html',
                            css: '../../pages/admin/customers/production-entities/list/style.css',
                            js: '../../pages/admin/customers/production-entities/list/main.js'
                        }
                    },
                    { 
                        id: 'production-entities-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/customers/production-entities/add/index.html',
                            css: '../../pages/admin/customers/production-entities/add/style.css',
                            js: '../../pages/admin/customers/production-entities/add/main.js'
                        }
                    },
                    { 
                        id: 'production-entities-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/customers/production-entities/detail/index.html',
                            css: '../../pages/admin/customers/production-entities/detail/style.css',
                            js: '../../pages/admin/customers/production-entities/detail/main.js'
                        }
                    },
                    { 
                        id: 'production-entities-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/customers/production-entities/edit/index.html',
                            css: '../../pages/admin/customers/production-entities/edit/style.css',
                            js: '../../pages/admin/customers/production-entities/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'production-entities-list'
            }
        ],
        defaultContent: 'pending-profiles'
    },
    services: {
        title: 'Dịch vụ',
        submenu: [
            { 
                id: 'parameters', 
                name: 'Tham số', 
                icon: 'fas fa-sliders-h',
                files: {
                    html: '../../pages/admin/services/parameters/index.html',
                    css: '../../pages/admin/services/parameters/style.css',
                    js: '../../pages/admin/services/parameters/main.js'
                },
                submenu: [
                    { 
                        id: 'parameters-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/services/parameters/list/index.html',
                            css: '../../pages/admin/services/parameters/list/style.css',
                            js: '../../pages/admin/services/parameters/list/main.js'
                        }
                    },
                    { 
                        id: 'parameters-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/services/parameters/add/index.html',
                            css: '../../pages/admin/services/parameters/add/style.css',
                            js: '../../pages/admin/services/parameters/add/main.js'
                        }
                    },
                    { 
                        id: 'parameters-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/services/parameters/detail/index.html',
                            css: '../../pages/admin/services/parameters/detail/style.css',
                            js: '../../pages/admin/services/parameters/detail/main.js'
                        }
                    },
                    { 
                        id: 'parameters-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/services/parameters/edit/index.html',
                            css: '../../pages/admin/services/parameters/edit/style.css',
                            js: '../../pages/admin/services/parameters/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'parameters-list'
            },
            { 
                id: 'service-packages', 
                name: 'Gói dịch vụ', 
                icon: 'fas fa-box',
                files: {
                    html: '../../pages/admin/services/service-packages/list/index.html',
                    css: '../../pages/admin/services/service-packages/list/style.css',
                    js: '../../pages/admin/services/service-packages/list/main.js'
                },
                submenu: [
                    { 
                        id: 'service-packages-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/services/service-packages/list/index.html',
                            css: '../../pages/admin/services/service-packages/list/style.css',
                            js: '../../pages/admin/services/service-packages/list/main.js'
                        }
                    },
                    { 
                        id: 'add-service-package', 
                        name: 'Thêm gói dịch vụ', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/services/service-packages/add/index.html',
                            css: '../../pages/admin/services/service-packages/add/style.css',
                            js: '../../pages/admin/services/service-packages/add/main.js'
                        }
                    },
                    { 
                        id: 'view-service-package', 
                        name: 'Xem chi tiết gói dịch vụ', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/services/service-packages/detail/index.html',
                            css: '../../pages/admin/services/service-packages/detail/style.css',
                            js: '../../pages/admin/services/service-packages/detail/main.js'
                        }
                    },
                    { 
                        id: 'edit-service-package', 
                        name: 'Sửa gói dịch vụ', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/services/service-packages/edit/index.html',
                            css: '../../pages/admin/services/service-packages/edit/style.css',
                            js: '../../pages/admin/services/service-packages/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'service-packages-list'
            }
        ],
        defaultContent: 'parameters'
    },
    payments: {
        title: 'Thanh toán',
        submenu: [
            { 
                id: 'payments', 
                name: 'Thanh toán', 
                icon: 'fas fa-credit-card',
                files: {
                    html: '../../pages/admin/payments/payments/list/index.html',
                    css: '../../pages/admin/payments/payments/list/style.css',
                    js: '../../pages/admin/payments/payments/list/main.js'
                },
                submenu: [
                    { 
                        id: 'payments-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/payments/payments/list/index.html',
                            css: '../../pages/admin/payments/payments/list/style.css',
                            js: '../../pages/admin/payments/payments/list/main.js'
                        }
                    },
                    { 
                        id: 'payments-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/payments/payments/add/index.html',
                            css: '../../pages/admin/payments/payments/add/style.css',
                            js: '../../pages/admin/payments/payments/add/main.js'
                        }
                    },
                    { 
                        id: 'view-order-payment', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/payments/payments/view/index.html',
                            css: '../../pages/admin/payments/payments/view/style.css',
                            js: '../../pages/admin/payments/payments/view/main.js'
                        }
                    },
                    { 
                        id: 'payments-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/payments/payments/edit/index.html',
                            css: '../../pages/admin/payments/payments/edit/style.css',
                            js: '../../pages/admin/payments/payments/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'payments-list'
            },
            { 
                id: 'invoices', 
                name: 'Hóa đơn', 
                icon: 'fas fa-file-invoice',
                files: {
                    html: '../../pages/admin/payments/invoices/list/index.html',
                    css: '../../pages/admin/payments/invoices/list/style.css',
                    js: '../../pages/admin/payments/invoices/list/main.js'
                },
                submenu: [
                    { 
                        id: 'invoices-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/payments/invoices/list/index.html',
                            css: '../../pages/admin/payments/invoices/list/style.css',
                            js: '../../pages/admin/payments/invoices/list/main.js'
                        }
                    },
                    { 
                        id: 'invoices-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/payments/invoices/add/index.html',
                            css: '../../pages/admin/payments/invoices/add/style.css',
                            js: '../../pages/admin/payments/invoices/add/main.js'
                        }
                    },
                    { 
                        id: 'invoices-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/payments/invoices/detail/index.html',
                            css: '../../pages/admin/payments/invoices/detail/style.css',
                            js: '../../pages/admin/payments/invoices/detail/main.js'
                        }
                    },
                    { 
                        id: 'invoices-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/payments/invoices/edit/index.html',
                            css: '../../pages/admin/payments/invoices/edit/style.css',
                            js: '../../pages/admin/payments/invoices/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'invoices-list'
            }
        ],
        defaultContent: 'payments'
    },
    admin: {
        title: 'Quản trị',
        submenu: [
            { 
                id: 'company-info', 
                name: 'Thông tin', 
                icon: 'fas fa-info-circle',
                files: {
                    html: '../../pages/admin/admin/company-info/list/index.html',
                    css: '../../pages/admin/admin/company-info/list/style.css',
                    js: '../../pages/admin/admin/company-info/list/main.js'
                },
                submenu: [
                    { 
                        id: 'company-info-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/admin/company-info/list/index.html',
                            css: '../../pages/admin/admin/company-info/list/style.css',
                            js: '../../pages/admin/admin/company-info/list/main.js'
                        }
                    },
                    { 
                        id: 'company-info-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/admin/company-info/add/index.html',
                            css: '../../pages/admin/admin/company-info/add/style.css',
                            js: '../../pages/admin/admin/company-info/add/main.js'
                        }
                    },
                    { 
                        id: 'company-info-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/admin/company-info/detail/index.html',
                            css: '../../pages/admin/admin/company-info/detail/style.css',
                            js: '../../pages/admin/admin/company-info/detail/main.js'
                        }
                    },
                    { 
                        id: 'company-info-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/admin/company-info/edit/index.html',
                            css: '../../pages/admin/admin/company-info/edit/style.css',
                            js: '../../pages/admin/admin/company-info/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'company-info-list'
            },
            { 
                id: 'user-groups', 
                name: 'Nhóm quyền', 
                icon: 'fas fa-users-cog',
                files: {
                    html: '../../pages/admin/admin/user-groups/list/index.html',
                    css: '../../pages/admin/admin/user-groups/list/style.css',
                    js: '../../pages/admin/admin/user-groups/list/main.js'
                },
                submenu: [
                    { 
                        id: 'user-groups-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/admin/user-groups/list/index.html',
                            css: '../../pages/admin/admin/user-groups/list/style.css',
                            js: '../../pages/admin/admin/user-groups/list/main.js'
                        }
                    },
                    { 
                        id: 'user-groups-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/admin/user-groups/add/index.html',
                            css: '../../pages/admin/admin/user-groups/add/style.css',
                            js: '../../pages/admin/admin/user-groups/add/main.js'
                        }
                    },
                    { 
                        id: 'user-groups-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/admin/user-groups/detail/index.html',
                            css: '../../pages/admin/admin/user-groups/detail/style.css',
                            js: '../../pages/admin/admin/user-groups/detail/main.js'
                        }
                    },
                    { 
                        id: 'user-groups-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/admin/user-groups/edit/index.html',
                            css: '../../pages/admin/admin/user-groups/edit/style.css',
                            js: '../../pages/admin/admin/user-groups/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'user-groups-list'
            },
            { 
                id: 'employees', 
                name: 'Nhân viên', 
                icon: 'fas fa-user-tie',
                files: {
                    html: '../../pages/admin/admin/employees/list/index.html',
                    css: '../../pages/admin/admin/employees/list/style.css',
                    js: '../../pages/admin/admin/employees/list/main.js'
                },
                submenu: [
                    { 
                        id: 'employees-list', 
                        name: 'Danh sách', 
                        icon: 'fas fa-list',
                        files: {
                            html: '../../pages/admin/admin/employees/list/index.html',
                            css: '../../pages/admin/admin/employees/list/style.css',
                            js: '../../pages/admin/admin/employees/list/main.js'
                        }
                    },
                    { 
                        id: 'employees-add', 
                        name: 'Thêm mới', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/admin/admin/employees/add/index.html',
                            css: '../../pages/admin/admin/employees/add/style.css',
                            js: '../../pages/admin/admin/employees/add/main.js'
                        }
                    },
                    { 
                        id: 'employees-view', 
                        name: 'Xem chi tiết', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/admin/admin/employees/detail/index.html',
                            css: '../../pages/admin/admin/employees/detail/style.css',
                            js: '../../pages/admin/admin/employees/detail/main.js'
                        }
                    },
                    { 
                        id: 'employees-edit', 
                        name: 'Sửa', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/admin/admin/employees/edit/index.html',
                            css: '../../pages/admin/admin/employees/edit/style.css',
                            js: '../../pages/admin/admin/employees/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'employees-list'
            }
        ],
        defaultContent: 'company-info'
    }
};

// Current state
let currentMainMenu = 'overview';
let currentSubMenu = null;
let loadedStyles = new Set(); // Track loaded CSS files
let loadedScripts = new Set(); // Track loaded JS files

// DOM Elements
const desktopSidebarContent = document.getElementById('desktopSidebarContent');
const contentArea = document.getElementById('contentArea');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    switchMainMenu(document.querySelector('[data-menu="overview"]'), 'overview');
});

// Switch main menu
function switchMainMenu(element, menuKey) {
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
    
    currentMainMenu = menuKey;
    const menuData = menuConfig[menuKey];
    
    updateSidebar(menuData);
    loadContent(menuData.defaultContent);
}

// Update sidebar based on current menu
function updateSidebar(menuData) {
    if (!menuData.submenu) {
        desktopSidebarContent.innerHTML = '';
        return;
    }
    
    const submenuHTML = `
        <nav class="sidebar-nav">
            <ul class="sidebar-menu nav flex-column">
                ${menuData.submenu.map(item => `
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-content="${item.id}" onclick="loadContent('${item.id}')">
                            <i class="${item.icon}"></i>
                            ${item.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    `;
    
    desktopSidebarContent.innerHTML = submenuHTML;
    
    const firstLink = desktopSidebarContent.querySelector('.nav-link');
    if (firstLink) {
        firstLink.classList.add('active');
        currentSubMenu = firstLink.getAttribute('data-content');
    }
}

// Load content dynamically from external files
async function loadContent(contentId, options = {}) {
    try {
        showLoading(true);
        
        updateSidebarActive(contentId);
        updateMobileNavActive(contentId);
        
        const filePaths = getFilePaths(contentId);
        if (!filePaths) {
            throw new Error(`No file configuration found for content: ${contentId}`);
        }
        
        cleanupScripts();
        cleanupStyles();
        
        let htmlContent = '';
        const htmlPath = options.html || filePaths.html;
        if (htmlPath) {
            console.log(`Loading HTML: ${htmlPath}`);
            const htmlResponse = await fetch(htmlPath);
            if (htmlResponse.ok) {
                htmlContent = await htmlResponse.text();
            } else {
                throw new Error(`HTML file not found: ${htmlPath}`);
            }
        } else {
            throw new Error(`No HTML file path configured for content: ${contentId}`);
        }
        
        if (filePaths.css && !loadedStyles.has(filePaths.css)) {
            console.log(`Loading CSS: ${filePaths.css}`);
            await loadCSS(filePaths.css);
            loadedStyles.add(filePaths.css);
        }
        
        contentArea.innerHTML = htmlContent;
        contentArea.classList.add('fade-in');
        
        if (filePaths.js && !loadedScripts.has(filePaths.js)) {
            console.log(`Loading JS: ${filePaths.js}`);
            await loadJS(filePaths.js);
            loadedScripts.add(filePaths.js);
        }
        
        showLoading(false);
        
        currentSubMenu = contentId;
        
        console.log(`Triggering contentLoaded event for: ${contentId}`);
        document.dispatchEvent(new CustomEvent('contentLoaded', { 
            detail: { contentId, filePaths: { ...filePaths, ...options } } 
        }));
        
    } catch (error) {
        console.error('Error loading content:', error);
        contentArea.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Có lỗi xảy ra khi tải nội dung "${contentId}". Vui lòng thử lại.
                <br><small class="text-muted">Chi tiết lỗi: ${error.message}</small>
            </div>
        `;
        showLoading(false);
    }
}

// Get file paths for a content ID
function getFilePaths(contentId) {
    for (const [menuKey, menuData] of Object.entries(menuConfig)) {
        if (menuData.defaultContent === contentId && menuData.files) {
            return menuData.files;
        }
        
        if (menuData.submenu) {
            const submenuItem = menuData.submenu.find(item => item.id === contentId);
            if (submenuItem && submenuItem.files) {
                return submenuItem.files;
            }
            if (menuData.submenu.some(item => item.submenu)) {
                for (const subItem of menuData.submenu) {
                    if (subItem.submenu) {
                        const nestedItem = subItem.submenu.find(nested => nested.id === contentId);
                        if (nestedItem && nestedItem.files) {
                            return nestedItem.files;
                        }
                    }
                }
            }
        }
    }
    return null;
}

// Load CSS file dynamically
function loadCSS(cssPath) {
    return new Promise((resolve, reject) => {
        const existingLink = document.querySelector(`link[href="${cssPath}"]`);
        if (existingLink) {
            resolve();
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssPath;
        
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));
        
        document.head.appendChild(link);
    });
}

// Load JS file dynamically
function loadJS(jsPath) {
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${jsPath}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsPath;
        
        script.onload = () => {
            console.log(`JS loaded successfully: ${jsPath}`);
            resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load JS: ${jsPath}`));
        
        document.body.appendChild(script);
    });
}

// Clean up previously loaded scripts
function cleanupScripts() {
    loadedScripts.forEach(scriptPath => {
        const script = document.querySelector(`script[src="${scriptPath}"]`);
        if (script) script.remove();
    });
    loadedScripts.clear();
}

// Clean up previously loaded styles
function cleanupStyles() {
    loadedStyles.forEach(cssPath => {
        const link = document.querySelector(`link[href="${cssPath}"]`);
        if (link) link.remove();
    });
    loadedStyles.clear();
}

// Update sidebar active state
function updateSidebarActive(contentId) {
    const sidebarLinks = desktopSidebarContent.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('data-content') === contentId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update mobile nav active state
function updateMobileNavActive(contentId) {
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileLinks.forEach(link => {
        if (link.getAttribute('onclick')?.includes(contentId)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('d-none');
        contentArea.style.opacity = '0.5';
    } else {
        loadingSpinner.classList.add('d-none');
        contentArea.style.opacity = '1';
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 90px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 5000);
}

// Clean up loaded resources when needed
function cleanupResources() {
    cleanupStyles();
    cleanupScripts();
}

// Handle responsive menu changes
window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileSidebar'));
        if (offcanvas) offcanvas.hide();
    }
});

window.adminLayout = {
    loadContent,
    showNotification,
    cleanupResources,
    getFilePaths
};