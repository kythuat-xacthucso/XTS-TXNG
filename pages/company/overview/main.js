function init() {
  // Dữ liệu mẫu (thay bằng API thực tế nếu cần)
  const dashboardData = {
    userName: 'Nguyễn Văn A', // Tên người dùng
    totalProducts: 150,
    activeProducts: 120,
    lockedProducts: 30,
    totalStamps: 10000,
    whiteStamps: 3000,
    activatedStamps: 5000,
    soldStamps: 1500,
    canceledStamps: 500,
    internalUsers: 25,
    invitedUsers: 50,
    activationUsed: 50, // Số lượt kích hoạt đã dùng
    activationTotal: 100, // Tổng số lượt kích hoạt
    storageUsed: 2, // Dung lượng đã dùng (GB)
    storageTotal: 5, // Tổng dung lượng (GB)
    renewalDate: '01/08/2025' // Ngày làm mới
  };

  // Cập nhật giao diện
  try {
    // Cập nhật vùng chào mừng
    document.getElementById('userName').textContent = dashboardData.userName;

    // Cập nhật thông tin sản phẩm
    document.getElementById('totalProducts').textContent = dashboardData.totalProducts;
    document.getElementById('activeProducts').textContent = dashboardData.activeProducts;
    document.getElementById('lockedProducts').textContent = dashboardData.lockedProducts;

    // Cập nhật thông tin tem
    document.getElementById('totalStamps').textContent = dashboardData.totalStamps;
    document.getElementById('whiteStamps').textContent = dashboardData.whiteStamps;
    document.getElementById('activatedStamps').textContent = dashboardData.activatedStamps;
    document.getElementById('soldStamps').textContent = dashboardData.soldStamps;
    document.getElementById('canceledStamps').textContent = dashboardData.canceledStamps;

    // Cập nhật thông tin người dùng
    document.getElementById('internalUsers').textContent = dashboardData.internalUsers;
    document.getElementById('invitedUsers').textContent = dashboardData.invitedUsers;

    // Cập nhật Gói Cộng đồng
    const activationProgress = document.getElementById('activationProgress');
    const activationPercentage = (dashboardData.activationUsed / dashboardData.activationTotal) * 100;
    activationProgress.style.width = `${activationPercentage}%`;
    document.getElementById('activationText').textContent = `${dashboardData.activationUsed}/${dashboardData.activationTotal}`;
    activationProgress.classList.add(activationPercentage >= 80 ? 'bg-danger' : 'bg-success');

    const storageProgress = document.getElementById('storageProgress');
    const storagePercentage = (dashboardData.storageUsed / dashboardData.storageTotal) * 100;
    storageProgress.style.width = `${storagePercentage}%`;
    document.getElementById('storageText').textContent = `${dashboardData.storageUsed}GB/${dashboardData.storageTotal}GB`;
    storageProgress.classList.add(storagePercentage >= 80 ? 'bg-danger' : 'bg-success');

    document.getElementById('renewalDate').textContent = dashboardData.renewalDate;
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