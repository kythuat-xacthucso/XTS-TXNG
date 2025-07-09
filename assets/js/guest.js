const menuConfig = {
    product: {
        title: 'Sản phẩm',
        submenu: [
            { 
                id: 'product-profile', 
                name: 'Hồ sơ', 
                files: {
                    html: '../../pages/guest/product/profile/index.html',
                    css: '../../pages/guest/product/profile/style.css',
                    js: '../../pages/guest/product/profile/main.js'
                }
            },
            { 
                id: 'product-intro', 
                name: 'Giới thiệu', 
                files: {
                    html: '../../pages/guest/product/intro/index.html',
                    css: '../../pages/guest/product/intro/style.css',
                    js: '../../pages/guest/product/intro/main.js'
                }
            },
            { 
                id: 'product-import', 
                name: 'NKĐT', 
                files: {
                    html: '../../pages/guest/product/diary/index.html',
                    css: '../../pages/guest/product/diary/style.css',
                    js: '../../pages/guest/product/diary/main.js'
                }
            },
            { 
                id: 'product-store', 
                name: 'Điểm bán', 
                files: {
                    html: '../../pages/guest/product/sale-point/index.html',
                    css: '../../pages/guest/product/sale-point/style.css',
                    js: '../../pages/guest/product/sale-point/main.js'
                }
            }
        ],
        defaultContent: 'product-profile'
    },
    company: {
        title: 'Doanh nghiệp',
        submenu: [
            { 
                id: 'company-profile', 
                name: 'Hồ sơ', 
                files: {
                    html: '../../pages/guest/company/profile/index.html',
                    css: '../../pages/guest/company/profile/style.css',
                    js: '../../pages/guest/company/profile/main.js'
                }
            },
            { 
                id: 'company-intro', 
                name: 'Giới thiệu', 
                files: {
                    html: '../../pages/guest/company/intro/index.html',
                    css: '../../pages/guest/company/intro/style.css',
                    js: '../../pages/guest/company/intro/main.js'
                }
            },
            { 
                id: 'company-media', 
                name: 'Truyền thông', 
                files: {
                    html: '../../pages/guest/company/media/index.html',
                    css: '../../pages/guest/company/media/style.css',
                    js: '../../pages/guest/company/media/main.js'
                }
            },
            { 
                id: 'company-partner', 
                name: 'Đối tác', 
                files: {
                    html: '../../pages/guest/company/partner/index.html',
                    css: '../../pages/guest/company/partner/style.css',
                    js: '../../pages/guest/company/partner/main.js'
                }
            }
        ],
        defaultContent: 'company-profile'
    }
};

// Current state
let currentMainTab = 'product';
let currentSubTab = 'product-profile';
let loadedStyles = new Set();
let loadedScripts = new Set();

// DOM Elements
const mainTabs = document.getElementById('mainTabs');
const subTabs = document.getElementById('subTabs');
const contentArea = document.getElementById('contentArea');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchCodeInput = document.getElementById('searchCode');
const cameraBtn = document.getElementById('cameraBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load default content and set active state
    loadContent('product-profile');
    updateSubTabActive('product-profile'); // Ensure sub-tab is active on load
});

// Switch main tab
function switchTab(element, tabKey) {
    // Update active state for main tab
    mainTabs.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
    
    currentMainTab = tabKey;
    const tabData = menuConfig[tabKey];
    
    // Update sub tabs
    updateSubTabs(tabData);
    
    // Load default content for this tab
    loadContent(tabData.defaultContent);
}

// Update sub tabs based on current main tab
function updateSubTabs(tabData) {
    subTabs.innerHTML = tabData.submenu.map(item => `
        <li class="nav-item" style="width: 25%;">
            <a class="nav-link ${item.id === tabData.defaultContent ? 'active' : ''} text-center" href="#" data-subtab="${item.id}" onclick="loadContent('${item.id}')" style="padding-left: 0; padding-right: 0; padding-top: 0.75rem; padding-bottom: 0.75rem;">
                ${item.name}
            </a>
        </li>
    `).join('');
}

// Load content dynamically from external files
async function loadContent(contentId) {
    try {
        // Show loading spinner
        showLoading(true);
        
        // Update active state in sub tabs
        updateSubTabActive(contentId);
        
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
        const htmlPath = filePaths.html;
        if (htmlPath) {
            const htmlResponse = await fetch(htmlPath);
            if (htmlResponse.ok) {
                htmlContent = await htmlResponse.text();
            } else {
                throw new Error(`HTML file not found: ${htmlPath}`);
            }
        }
        
        // Load CSS file
        if (filePaths.css && !loadedStyles.has(filePaths.css)) {
            await loadCSS(filePaths.css);
            loadedStyles.add(filePaths.css);
        }
        
        // Update content area
        contentArea.innerHTML = htmlContent;
        contentArea.classList.add('fade-in');
        
        // Load and execute JS file
        if (filePaths.js && !loadedScripts.has(filePaths.js)) {
            await loadJS(filePaths.js);
            loadedScripts.add(filePaths.js);
        }
        
        // Hide loading spinner
        showLoading(false);
        
        currentSubTab = contentId;
        
        // Gửi sự kiện contentLoaded để tái khởi tạo script nếu có
        if (filePaths.js) {
            const script = document.querySelector(`script[src="${filePaths.js}"]`);
            if (script) script.dispatchEvent(new Event('contentLoaded'));
        }
        
    } catch (error) {
        contentArea.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Có lỗi xảy ra khi tải nội dung "${contentId}". Vui lòng thử lại.
            </div>
        `;
        showLoading(false);
    }
}

// Get file paths for a content ID
function getFilePaths(contentId) {
    for (const [tabKey, tabData] of Object.entries(menuConfig)) {
        const submenuItem = tabData.submenu.find(item => item.id === contentId);
        if (submenuItem && submenuItem.files) {
            return submenuItem.files;
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
        script.onload = () => resolve();
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

// Update sub tab active state
function updateSubTabActive(contentId) {
    subTabs.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-subtab') === contentId) {
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

// Setup camera functionality
function setupCamera() {
    cameraBtn.addEventListener('click', function() {
        // Trigger camera (simplified, requires actual camera API integration)
        alert('Mở máy ảnh để quét mã. (Tích hợp API camera thực tế cần thêm xử lý.)');
        // Example: Use navigator.mediaDevices.getUserMedia for real implementation
        // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        //     // Handle camera stream
        // }).catch(err => console.error('Camera access denied:', err));
    });
}

// Search code function
function searchCode() {
    const code = searchCodeInput.value.trim();
    if (code) {
        // Redirect or load content based on code (example logic)
        loadContent(`product-profile?code=${code}`); // Adjust based on your routing logic
    } else {
        alert('Vui lòng nhập hoặc quét mã tem!');
    }
}