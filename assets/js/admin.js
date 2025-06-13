// Menu structure with English file names and sub-actions
const menuStructure = {
    overview: ['overview/list.html'],
    customers: [
        'customers/pending-profiles/list.html',
        'customers/managed-entities/list.html',
        'customers/producer-entities/list.html'
    ],
    services: [
        'services/parameters/list.html',
        'services/service-packages/list.html'
    ],
    payments: [
        'payments/invoices/list.html',
        'payments/payments/list.html'
    ],
    admin: [
        'admin/info/list.html',
        'admin/permission-groups/list.html',
        'admin/staff/list.html'
    ]
};

// Vietnamese labels for sub-menus
const vietnameseLabels = {
    'pending-profiles': 'Hồ sơ chờ duyệt',
    'managed-entities': 'Chủ thể quản lý',
    'producer-entities': 'Chủ thể sản xuất',
    'parameters': 'Tham số',
    'service-packages': 'Gói dịch vụ',
    'invoices': 'Hóa đơn',
    'payments': 'Thanh toán',
    'info': 'Thông tin',
    'permission-groups': 'Nhóm quyền',
    'staff': 'Nhân viên'
};

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
    loading.classList.add('active');

    // Remove existing styles and scripts
    document.querySelectorAll('link[data-page], script[data-page]').forEach(el => el.remove());

    fetch(`../pages/admin/${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File không tìm thấy: ${page}`);
            }
            return response.text();
        })
        .then(html => {
            // Extract CSS and JS references
            const cssMatch = html.match(/<!-- CSS: ([\w-\/]+\.css) -->/);
            const jsMatch = html.match(/<!-- JS: ([\w-\/]+\.js) -->/);

            // Load CSS
            if (cssMatch && cssMatch[1]) {
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = `../pages/admin/${cssMatch[1]}`;
                cssLink.setAttribute('data-page', page);
                document.head.appendChild(cssLink);
            }

            // Load JS
            if (jsMatch && jsMatch[1]) {
                const script = document.createElement('script');
                script.src = `../pages/admin/${jsMatch[1]}`;
                script.setAttribute('data-page', page);
                document.body.appendChild(script);
            }

            // Load HTML content
            content.innerHTML = html.replace(/<!-- CSS: [\w-\/]+\.css -->|<!-- JS: [\w-\/]+\.js -->/g, '');
            loading.classList.remove('active');
            updateTitle(page);
        })
        .catch(error => {
            console.error('Lỗi khi tải trang:', error);
            content.innerHTML = '<p>Lỗi khi tải nội dung: ' + error.message + '</p>';
            loading.classList.remove('active');
        });
}

function updateTitle(page) {
    const title = page.replace('.html', '').replace(/\//g, ' - ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.title = `Admin - ${title}`;
}

function updateSidebar(menu) {
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = '';

    // Không hiển thị menu con khi chọn "Tổng quan" và load trang mặc định
    if (menu === 'overview' && menuStructure[menu].length > 0) {
        loadPage(menuStructure[menu][0]);
        return; // Thoát khỏi hàm, không hiển thị menu con
    }

    const subMenu = menuStructure[menu] || [];
    if (menu !== 'overview' && subMenu.length > 0) {
        subMenu.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const baseName = item.replace('../pages/admin/', '').replace('/list.html', '');
            const vietnameseName = vietnameseLabels[baseName.split('/')[1]] || baseName;
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = '#';
            a.textContent = vietnameseName; // Hiển thị tên tiếng Việt đúng chuẩn
            a.onclick = (e) => {
                e.preventDefault();
                loadSubAction(menu, baseName.split('/')[1], 'list');
                document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => link.classList.remove('active'));
                a.classList.add('active');
            };
            if (subMenu.indexOf(item) === 0) a.classList.add('active');
            li.appendChild(a);
            sidebarMenu.appendChild(li);
        });
        loadSubAction(menu, subMenu[0].replace('../pages/admin/', '').replace('/list.html', '').split('/')[1]);
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

function toggleChat() {
    document.getElementById('chat-ai').classList.toggle('open');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = '';
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai';
            aiMessage.textContent = 'Đây là phản hồi từ trợ lý AI (giả lập)';
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
}

function showSettingsModal() {
    const modal = new bootstrap.Modal(document.getElementById('settingsModal'));
    modal.show();
}

function hideSettingsModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    modal.hide();
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
        });
    });

    // Set default active menu
    document.querySelector('.nav-link').classList.add('active');
    updateSidebar('overview');

    // Handle hamburger for mobile
    document.querySelector('.hamburger')?.addEventListener('click', toggleSidebar);
});