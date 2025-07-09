(function() {
    // Hàm khởi tạo modal
    function initializeModal() {
        console.log('Khởi tạo modal...');
        const processCards = document.querySelectorAll('.process-card');
        if (processCards.length === 0) {
            console.log('Không tìm thấy process-cards.');
            return;
        }

        const modalElement = document.getElementById('processModal');
        const modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static', // Ngăn đóng modal khi click ngoài
            keyboard: true // Cho phép đóng bằng ESC
        });
        const processName = document.getElementById('processName');
        const processDate = document.getElementById('processDate');
        const processDescription = document.getElementById('processDescription');

        if (!processName || !processDate || !processDescription) {
            console.log('Một hoặc nhiều phần tử modal không tồn tại:', { processName, processDate, processDescription });
            return;
        }

        processCards.forEach(card => {
            card.addEventListener('click', function() {
                console.log('Click vào card với processId:', this.getAttribute('data-process-id'));
                const processId = this.getAttribute('data-process-id');
                let name, date, description;

                switch (processId) {
                    case '1':
                        name = 'Chuẩn bị nguyên liệu';
                        date = '15/03/2025';
                        description = '<span style="color: #28a745; font-family: \'Verdana\', sans-serif;">Quy trình chuẩn bị nguyên liệu <i class="fas fa-leaf"></i> bao gồm chọn lọc và làm sạch các thành phần cần thiết cho sản xuất trà Kombucha.</span> <strong>Chú ý:</strong> Đảm bảo nguyên liệu tươi sạch. <em>Thời gian:</em> 2 giờ.';
                        break;
                    case '2':
                        name = 'Phát triển SCOBY';
                        date = '20/03/2025';
                        description = '<span style="color: #17a2b8; font-family: \'Georgia\', serif;">Quá trình nuôi cấy và phát triển SCOBY <i class="fas fa-flask"></i> trong môi trường thích hợp để đảm bảo chất lượng lên men.</span> <u>Lưu ý:</u> Nhiệt độ phải ổn định. <em>Thời gian:</em> 5 ngày.';
                        break;
                    case '3':
                        name = 'Lên men chính';
                        date = '25/03/2025';
                        description = '<span style="color: #dc3545; font-family: \'Arial Black\', sans-serif;">Giai đoạn lên men chính <i class="fas fa-tint"></i> để tạo ra hương vị đặc trưng của trà Kombucha với thời gian kiểm soát chặt chẽ.</span> <strong>Quan trọng:</strong> Theo dõi pH thường xuyên. <em>Thời gian:</em> 10 ngày.';
                        break;
                }

                // Cập nhật thông tin vào modal
                processName.textContent = name;
                processDate.textContent = date;
                processDescription.innerHTML = description;

                // Hiển thị modal
                modal.show();
            });
        });

        // Đảm bảo các nút đóng hoạt động
        const closeButton = modalElement.querySelector('.btn-close');
        const closeFooterButton = modalElement.querySelector('.btn-secondary');
        if (closeButton) closeButton.addEventListener('click', () => modal.hide());
        if (closeFooterButton) closeFooterButton.addEventListener('click', () => modal.hide());
    }

    // Chạy khởi tạo ngay khi script được load
    console.log('Script main.js được load.');
    initializeModal();

    // Fallback để kiểm tra lại khi DOM thay đổi
    const observer = new MutationObserver((mutations) => {
        if (document.querySelectorAll('.process-card').length > 0) {
            console.log('DOM thay đổi, tái khởi tạo modal.');
            initializeModal();
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('contentArea'), { childList: true, subtree: true });
})();