// Menu configuration with file paths
const menuConfig = {
    overview: {
        title: 'Tổng quan',
        submenu: null,
        defaultContent: 'overview',
        files: {
            html: '../../pages/company/overview/index.html',
            css: '../../pages/company/overview/style.css',
            js: '../../pages/company/overview/main.js'
        }
    },
    traceability: {
        title: 'Truy xuất',
        submenu: [
            { 
                id: 'products', 
                name: 'Sản phẩm', 
                icon: 'fas fa-boxes',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'stamp-template', 
                name: 'Mẫu tem', 
                icon: 'fas fa-stamp',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'print-stamp', 
                name: 'In tem', 
                icon: 'fas fa-print',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'activate', 
                name: 'Kích hoạt', 
                icon: 'fas fa-check-circle',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'sell', 
                name: 'Bán', 
                icon: 'fas fa-shopping-cart',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'cancel', 
                name: 'Hủy', 
                icon: 'fas fa-ban',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'lookup', 
                name: 'Tra cứu', 
                icon: 'fas fa-search',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            }
        ],
        defaultContent: 'products'
    },
    services: {
        title: 'Dịch vụ',
        submenu: [
            { 
                id: 'service-packages', 
                name: 'Gói dịch vụ', 
                icon: 'fas fa-box',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'payments', 
                name: 'Thanh toán', 
                icon: 'fas fa-credit-card',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'tracking', 
                name: 'Theo dõi', 
                icon: 'fas fa-eye',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            }
        ],
        defaultContent: 'service-packages'
    },
    logs: {
        title: 'Nhật ký',
        submenu: [
            { 
                id: 'planting-areas', 
                name: 'Vùng trồng', 
                icon: 'fas fa-leaf',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'processes', 
                name: 'Quy trình', 
                icon: 'fas fa-cogs',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'logs', 
                name: 'Nhật ký', 
                icon: 'fas fa-book',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            }
        ],
        defaultContent: 'planting-areas'
    },
    admin: {
        title: 'Quản trị',
        submenu: [
            { 
                id: 'entities', 
                name: 'Chủ thể', 
                icon: 'fas fa-building',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'sales-points', 
                name: 'Điểm bán', 
                icon: 'fas fa-store',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'partners', 
                name: 'Đối tác', 
                icon: 'fas fa-handshake',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'invite-users', 
                name: 'Mời người dùng', 
                icon: 'fas fa-user-plus',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            },
            { 
                id: 'personnel', 
                name: 'Nhân sự', 
                icon: 'fas fa-user-tie',
                files: {
                    html: '', // Path to HTML file - to be filled later
                    css: '',  // Path to CSS file - to be filled later
                    js: ''    // Path to JS file - to be filled later
                }
            }
        ],
        defaultContent: 'entities'
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
async function loadContent(contentId) {
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
        
        // Load HTML content
        let htmlContent = '';
        if (filePaths.html) {
            try {
                const htmlResponse = await fetch(filePaths.html);
                if (htmlResponse.ok) {
                    htmlContent = await htmlResponse.text();
                } else {
                    throw new Error(`HTML file not found: ${filePaths.html}`);
                }
            } catch (error) {
                console.warn(`Error loading HTML file: ${filePaths.html}`, error);
                throw error;
            }
        } else {
            throw new Error(`No HTML file path configured for content: ${contentId}`);
        }
        
        // Load CSS file
        if (filePaths.css && !loadedStyles.has(filePaths.css)) {
            try {
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
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load JS: ${jsPath}`));
        
        document.body.appendChild(script);
    });
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
    // Remove dynamically loaded CSS files
    loadedStyles.forEach(cssPath => {
        const link = document.querySelector(`link[href="${cssPath}"]`);
        if (link) {
            link.remove();
        }
    });
    loadedStyles.clear();
    
    // Note: JS files are not removed as they may contain needed functions
    // If you need to remove JS files, you can implement similar logic
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
window.companyLayout = {
    loadContent,
    showNotification,
    cleanupResources,
    getFilePaths
};