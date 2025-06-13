(function() {
    window.Utils = {
        // Show toast notification
        showToast(message, type = 'success', persist = false) {
            if (persist) {
                // Lưu toast vào sessionStorage để hiển thị trên trang đích
                sessionStorage.setItem('toastMessage', JSON.stringify({ message, type }));
                return; // Không hiển thị ngay, để trang đích xử lý
            }

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                ${message}
                <span class="close">×</span>
            `;
            document.body.appendChild(toast);

            // Show toast
            setTimeout(() => toast.classList.add('show'), 100);

            // Auto hide after 5 seconds
            const timeout = setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 5000);

            // Close button event
            toast.querySelector('.close').addEventListener('click', () => {
                clearTimeout(timeout);
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            });
        },

        // Show confirmation popup
        showConfirmPopup(title, message, onConfirm, onCancel) {
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';
            overlay.innerHTML = `
                <div class="popup">
                    <h4>${title}</h4>
                    <p>${message}</p>
                    <div class="popup-buttons">
                        <button class="confirm">Xác nhận</button>
                        <button class="cancel">Hủy</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Show popup
            setTimeout(() => overlay.style.display = 'flex', 10);

            // Event listeners
            const confirmBtn = overlay.querySelector('.confirm');
            const cancelBtn = overlay.querySelector('.cancel');

            confirmBtn.addEventListener('click', () => {
                if (onConfirm) onConfirm();
                overlay.remove();
            });

            cancelBtn.addEventListener('click', () => {
                if (onCancel) onCancel();
                overlay.remove();
            });
        },

        // Initialize toast from sessionStorage
        initToast() {
            const toastData = sessionStorage.getItem('toastMessage');
            if (toastData) {
                const { message, type } = JSON.parse(toastData);
                Utils.showToast(message, type);
                sessionStorage.removeItem('toastMessage'); // Xóa sau khi hiển thị
            }
        }
    };

    // Gọi initToast khi trang tải
    window.addEventListener('load', Utils.initToast);
})();