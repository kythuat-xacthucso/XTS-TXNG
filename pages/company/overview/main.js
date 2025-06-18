function init() {
  // Dữ liệu mẫu (thay bằng API thực tế nếu cần)
  const dashboardData = {
    authStatus: 'Đã xác thực cấp 2',
    totalProducts: 150,
    activeProducts: 120,
    lockedProducts: 30,
    totalStamps: 10000,
    whiteStamps: 3000,
    activatedStamps: 5000,
    soldStamps: 1500,
    canceledStamps: 500,
    internalUsers: 25,
    invitedUsers: 50
  };

  // Cập nhật giao diện
  try {
    document.getElementById('authStatus').textContent = dashboardData.authStatus;
    document.getElementById('totalProducts').textContent = dashboardData.totalProducts;
    document.getElementById('activeProducts').textContent = dashboardData.activeProducts;
    document.getElementById('lockedProducts').textContent = dashboardData.lockedProducts;
    document.getElementById('totalStamps').textContent = dashboardData.totalStamps;
    document.getElementById('whiteStamps').textContent = dashboardData.whiteStamps;
    document.getElementById('activatedStamps').textContent = dashboardData.activatedStamps;
    document.getElementById('soldStamps').textContent = dashboardData.soldStamps;
    document.getElementById('canceledStamps').textContent = dashboardData.canceledStamps;
    document.getElementById('internalUsers').textContent = dashboardData.internalUsers;
    document.getElementById('invitedUsers').textContent = dashboardData.invitedUsers;
  } catch (error) {
    console.error('Error updating dashboard UI:', error);
  }
}

// Lắng nghe sự kiện contentLoaded từ layout.js
document.addEventListener('contentLoaded', (event) => {
  if (event.detail.contentId === 'overview') {
    init();
  }
});

// Gọi init ngay khi script được tải (trường hợp loadJS từ layout.js)
init();