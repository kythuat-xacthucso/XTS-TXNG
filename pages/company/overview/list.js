function init() {
    console.log('Trang Tổng quan đã được load thành công');
    updateTime();
}

function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    console.log('Thời gian đã được cập nhật:', timeElement.textContent);
}

window.addEventListener('load', init);