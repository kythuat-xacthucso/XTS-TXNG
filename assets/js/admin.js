// admin.js (layout)
// Menu configuration with file paths
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
                    html: '../../pages/admin/customers/pending-profiles/index.html',
                    css: '../../pages/admin/customers/pending-profiles/style.css',
                    js: '../../pages/admin/customers/pending-profiles/main.js'
                }
            },
            { 
                id: 'manage-entities', 
                name: 'Chủ thể quản lý', 
                icon: 'fas fa-building',
                files: {
                    html: '../../pages/admin/customers/manage-entities/index.html',
                    css: '../../pages/admin/customers/manage-entities/style.css',
                    js: '../../pages/admin/customers/manage-entities/main.js'
                }
            },
            { 
                id: 'production-entities', 
                name: 'Chủ thể sản xuất', 
                icon: 'fas fa-industry',
                files: {
                    html: '../../pages/admin/customers/production-entities/index.html',
                    css: '../../pages/admin/customers/production-entities/style.css',
                    js: '../../pages/admin/customers/production-entities/main.js'
                }
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
                }
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
                defaultContent: 'service-packages'
            }
        ],
        defaultContent: 'parameters'
    },
    payments: {
        title: 'Thanh toán',
        submenu: [
            { 
                id: 'invoices', 
                name: 'Hóa đơn', 
                icon: 'fas fa-file-invoice',
                files: {
                    html: '../../pages/admin/payments/invoices/index.html',
                    css: '../../pages/admin/payments/invoices/style.css',
                    js: '../../pages/admin/payments/invoices/main.js'
                }
            },
            { 
                id: 'payments', 
                name: 'Thanh toán', 
                icon: 'fas fa-credit-card',
                files: {
                    html: '../../pages/admin/payments/payments/index.html',
                    css: '../../pages/admin/payments/payments/style.css',
                    js: '../../pages/admin/payments/payments/main.js'
                }
            }
        ],
        defaultContent: 'invoices'
    },
    admin: {
        title: 'Quản trị',
        submenu: [
            { 
                id: 'company-info', 
                name: 'Thông tin', 
                icon: 'fas fa-info-circle',
                files: {
                    html: '../../pages/admin/admin/company-info/index.html',
                    css: '../../pages/admin/admin/company-info/style.css',
                    js: '../../pages/admin/admin/company-info/main.js'
                }
            },
            { 
                id: 'user-groups', 
                name: 'Nhóm quyền', 
                icon: 'fas fa-users-cog',
                files: {
                    html: '../../pages/admin/admin/user-groups/index.html',
                    css: '../../pages/admin/admin/user-groups/style.css',
                    js: '../../pages/admin/admin/user-groups/main.js'
                }
            },
            { 
                id: 'employees', 
                name: 'Nhân viên', 
                icon: 'fas fa-user-tie',
                files: {
                    html: '../../pages/admin/admin/employees/index.html',
                    css: '../../pages/admin/admin/employees/style.css',
                    js: '../../pages/admin/admin/employees/main.js'
                }
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
    // Load default content
    switchMainMenu(document.querySelector('[data-menu="overview"]'), 'overview');
});

// Switch main menu
function switchMainMenu(element, menuKey) {
    // Update active state for main menu
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
    
    currentMainMenu = menuKey;
    const menuData = menuConfig[menuKey];
    
    // Update sidebar
    updateSidebar(menuData);
    
    // Load default content for this menu
    loadContent(menuData.defaultContent);
}

// Update sidebar based on current menu
function updateSidebar(menuData) {
    if (!menuData.submenu) {
        // No submenu (like overview)
        desktopSidebarContent.innerHTML = '';
        return;
    }
    
    // Create submenu HTML
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
    
    // Set first item as active
    const firstLink = desktopSidebarContent.querySelector('.nav-link');
    if (firstLink) {
        firstLink.classList.add('active');
        currentSubMenu = firstLink.getAttribute('data-content');
    }
}

// Load content dynamically from external files
async function loadContent(contentId, options = {}) {
    try {
        // Show loading spinner
        showLoading(true);
        
        // Update active state in sidebar
        updateSidebarActive(contentId);
        
        // Update mobile nav active state
        updateMobileNavActive(contentId);
        
        // Get file paths for the content
        const filePaths = getFilePaths(contentId);
        
        if (!filePaths) {
            throw new Error(`No file configuration found for content: ${contentId}`);
        }
        
        // Clean up previously loaded scripts and styles
        cleanupScripts();
        cleanupStyles();
        
        // Load HTML content
        let htmlContent = '';
        const htmlPath = options.html || filePaths.html;
        if (htmlPath) {
            try {
                console.log(`Loading HTML: ${htmlPath}`); // Debug log
                const htmlResponse = await fetch(htmlPath);
                if (htmlResponse.ok) {
                    htmlContent = await htmlResponse.text();
                } else {
                    throw new Error(`HTML file not found: ${htmlPath}`);
                }
            } catch (error) {
                console.warn(`Error loading HTML file: ${htmlPath}`, error);
                throw error;
            }
        } else {
            throw new Error(`No HTML file path configured for content: ${contentId}`);
        }
        
        // Load CSS file
        if (filePaths.css && !loadedStyles.has(filePaths.css)) {
            try {
                console.log(`Loading CSS: ${filePaths.css}`); // Debug log
                await loadCSS(filePaths.css);
                loadedStyles.add(filePaths.css);
            } catch (error) {
                console.warn(`Error loading CSS file: ${filePaths.css}`, error);
            }
        }
        
        // Update content area
        contentArea.innerHTML = htmlContent;
        contentArea.classList.add('fade-in');
        
        // Load and execute JS file
        if (filePaths.js && !loadedScripts.has(filePaths.js)) {
            try {
                console.log(`Loading JS: ${filePaths.js}`); // Debug log
                await loadJS(filePaths.js);
                loadedScripts.add(filePaths.js);
            } catch (error) {
                console.warn(`Error loading JS file: ${filePaths.js}`, error);
            }
        }
        
        // Hide loading spinner
        showLoading(false);
        
        currentSubMenu = contentId;
        
        // Trigger custom event for content loaded
        console.log(`Triggering contentLoaded event for: ${contentId}`); // Debug log
        document.dispatchEvent(new CustomEvent('contentLoaded', { 
            detail: { contentId, filePaths } 
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
    // Check if it's a main menu item
    for (const [menuKey, menuData] of Object.entries(menuConfig)) {
        if (menuData.defaultContent === contentId && menuData.files) {
            return menuData.files;
        }
        
        // Check submenu items
        if (menuData.submenu) {
            const submenuItem = menuData.submenu.find(item => item.id === contentId);
            if (submenuItem && submenuItem.files) {
                return submenuItem.files;
            }
            // Check nested submenu (e.g., service-packages submenu)
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
        // Check if CSS is already loaded
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
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${jsPath}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsPath;
        
        script.onload = () => {
            console.log(`JS loaded successfully: ${jsPath}`); // Debug log
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
        if (script) {
            script.remove();
        }
    });
    loadedScripts.clear();
}

// Clean up previously loaded styles
function cleanupStyles() {
    loadedStyles.forEach(cssPath => {
        const link = document.querySelector(`link[href="${cssPath}"]`);
        if (link) {
            link.remove();
        }
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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 90px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Clean up loaded resources when needed
function cleanupResources() {
    // Remove dynamically loaded CSS and JS files
    cleanupStyles();
    cleanupScripts();
}

// Handle responsive menu changes
window.addEventListener('resize', function() {
    // Close mobile menu when switching to desktop
    if (window.innerWidth >= 992) {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileSidebar'));
        if (offcanvas) {
            offcanvas.hide();
        }
    }
});

// Export functions for external use
window.adminLayout = {
    loadContent,
    showNotification,
    cleanupResources,
    getFilePaths
};