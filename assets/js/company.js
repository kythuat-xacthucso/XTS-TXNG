// Menu structure for Company role
const menuStructure = {
    overview: ['overview/dashboard.html'],
    traceability: [
        'traceability/products/list.html',
        'traceability/label-templates/list.html',
        'traceability/label-printing/list.html',
        'traceability/activation/list.html',
        'traceability/sales/list.html',
        'traceability/cancellation/list.html',
        'traceability/search/list.html'
    ],
    services: [
        'services/service-packages/list.html',
        'services/payments/list.html',
        'services/tracking/list.html'
    ],
    logs: [
        'logs/cultivation-areas/list.html',
        'logs/processes/list.html',
        'logs/logs/list.html'
    ],
    admin: [
        'admin/entities/list.html',
        'admin/sales-points/list.html',
        'admin/partners/list.html',
        'admin/invite-users/list.html',
        'admin/staff/list.html'
    ]
};

// Vietnamese labels for sub-menus
const vietnameseLabels = {
    'dashboard': 'Tổng quan',
    'products': 'Sản phẩm',
    'label-templates': 'Mẫu tem',
    'label-printing': 'In tem',
    'activation': 'Kích hoạt',
    'sales': 'Bán',
    'cancellation': 'Hủy',
    'search': 'Tra cứu',
    'service-packages': 'Gói dịch vụ',
    'payments': 'Thanh toán',
    'tracking': 'Theo dõi',
    'cultivation-areas': 'Vùng trồng',
    'processes': 'Quy trình',
    'logs': 'Nhật ký',
    'entities': 'Chủ thể',
    'sales-points': 'Điểm bán',
    'partners': 'Đối tác',
    'invite-users': 'Mời người dùng',
    'staff': 'Nhân sự'
};

// Mobile and Tablet menu structure
const mobileTabletMenuStructure = [
    { key: 'overview', path: 'overview/dashboard.html' },
    ...menuStructure.traceability.filter(path => ['activation', 'sales', 'cancellation', 'search'].some(sub => path.includes(sub))).map(path => ({ key: 'traceability', path })),
    { key: 'logs', path: 'logs/logs/list.html' }
];

// Function to load sub-actions dynamically
function loadSubAction(menu, subMenu, action = 'list') {
    const basePath = menuStructure[menu]?.find(path => path.includes(subMenu.replace('-', '')));
    if (basePath) {
        const filePath = basePath.replace('list.html', `${action}.html`);
        loadPage(filePath);
    } else {
        console.warn(`Không tìm thấy đường dẫn cho menu: ${menu}, subMenu: ${subMenu}`);
    }
}

function loadPage(page) {
    const content = document.getElementById('content');
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    // Remove existing styles and scripts
    document.querySelectorAll('link[data-page], script[data-page]').forEach(el => el.remove());

    fetch(`../pages/company/${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File không tìm thấy: ${page}`);
            }
            return response.text();
        })
        .then(html => {
            // Extract and load CSS
            const cssMatch = html.match(/<!-- CSS: ([\w-\/]+\.css) -->/);
            if (cssMatch && cssMatch[1]) {
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = `../pages/company/${cssMatch[1]}`;
                cssLink.setAttribute('data-page', page);
                document.head.appendChild(cssLink);
            }

            // Extract and load JS
            const jsMatch = html.match(/<!-- JS: ([\w-\/]+\.js) -->/);
            if (jsMatch && jsMatch[1]) {
                const script = document.createElement('script');
                script.src = `../pages/company/${jsMatch[1]}`;
                script.setAttribute('data-page', page);
                document.body.appendChild(script);
            }

            // Load HTML content
            content.innerHTML = html.replace(/<!-- CSS: [\w-\/]+\.css -->|<!-- JS: [\w-\/]+\.js -->/g, '');
            loading.style.display = 'none';
            updateTitle(page);
        })
        .catch(error => {
            console.error('Lỗi khi tải trang:', error);
            content.innerHTML = '<p>Lỗi khi tải nội dung: ' + error.message + '</p>';
            loading.style.display = 'none';
        });
}

function updateTitle(page) {
    const title = page.replace('.html', '').replace(/\//g, ' - ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.title = `Company - ${title}`;
}

function updateSidebar(menu) {
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = '';

    // Do not show sub-menus for 'overview'
    if (menu && menuStructure[menu] && menu !== 'overview') {
        menuStructure[menu].forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const baseName = item.replace('../pages/company/', '').replace('/list.html', '').split('/')[1];
            const vietnameseName = vietnameseLabels[baseName] || baseName;
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = '#';
            a.textContent = vietnameseName;
            a.onclick = (e) => {
                e.preventDefault();
                loadSubAction(menu, baseName, 'list');
                document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => link.classList.remove('active'));
                a.classList.add('active');
            };
            if (item === menuStructure[menu][0]) a.classList.add('active');
            li.appendChild(a);
            sidebarMenu.appendChild(li);
        });
        loadSubAction(menu, menuStructure[menu][0].replace('../pages/company/', '').replace('/list.html', '').split('/')[1]);
    } else if (menu === 'overview') {
        loadSubAction('overview', 'dashboard');
    }
}

function updateMobileTabletSidebar() {
    const mobileSidebarMenu = document.getElementById('mobile-sidebar-menu');
    mobileSidebarMenu.innerHTML = '';

    mobileTabletMenuStructure.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const baseName = item.path.replace('../pages/company/', '').replace('/list.html', '').split('/')[1];
        const vietnameseName = vietnameseLabels[baseName] || baseName;
        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = '#';
        a.textContent = vietnameseName;
        a.onclick = (e) => {
            e.preventDefault();
            loadSubAction(item.key, baseName, 'list');
            document.querySelectorAll('#mobile-sidebar-menu .nav-link').forEach(link => link.classList.remove('active'));
            a.classList.add('active');
            bootstrap.Offcanvas.getInstance(document.getElementById('sidebarOffcanvas')).hide();
        };
        if (item.path === mobileTabletMenuStructure[0].path) a.classList.add('active');
        li.appendChild(a);
        mobileSidebarMenu.appendChild(li);
    });

    // Add Logout for tablet and mobile
    const logoutLi = document.createElement('li');
    logoutLi.className = 'nav-item';
    const logoutA = document.createElement('a');
    logoutA.className = 'nav-link text-danger';
    logoutA.href = '#';
    logoutA.textContent = 'Đăng xuất';
    logoutA.onclick = (e) => {
        e.preventDefault();
        logout();
        bootstrap.Offcanvas.getInstance(document.getElementById('sidebarOffcanvas')).hide();
    };
    logoutLi.appendChild(logoutA);
    mobileSidebarMenu.appendChild(logoutLi);

    loadSubAction(mobileTabletMenuStructure[0].key, mobileTabletMenuStructure[0].path.replace('../pages/company/', '').replace('/list.html', '').split('/')[1]);
}

function logout() {
    alert('Đăng xuất thành công!');
    // Thêm logic đăng xuất thực tế nếu cần
}

// Initialize
window.addEventListener('load', () => {
    // Handle header menu clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const menu = link.getAttribute('data-menu');
            updateSidebar(menu);
            document.getElementById('breadcrumb-item').textContent = vietnameseLabels[menu] || menu;
        });
    });

    // Set default active menu
    document.querySelector('.nav-link').classList.add('active');
    updateSidebar('overview');
    document.getElementById('breadcrumb-item').textContent = 'Tổng quan';

    // Handle hamburger for tablet and mobile
    document.querySelector('[data-bs-toggle="offcanvas"]')?.addEventListener('click', () => {
        updateMobileTabletSidebar();
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('sidebarOffcanvas'));
        offcanvas.show();
    });
});

function showSettingsModal() {
    new bootstrap.Modal(document.getElementById('settingsModal')).show();
}

function hideSettingsModal() {
    bootstrap.Modal.getInstance(document.getElementById('settingsModal'))?.hide();
}