const Auth = {
    // Login page functionality
    login: {
        handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const remember = document.getElementById('rememberMe').checked;

            // Reset error messages
            emailError.textContent = '';
            passwordError.textContent = '';

            // Validation
            let isValid = true;

            if (!email.value.trim() || !email.checkValidity()) {
                emailError.textContent = 'Vui lòng nhập email hợp lệ!';
                isValid = false;
            }

            if (!password.value.trim()) {
                passwordError.textContent = 'Mật khẩu không được để trống!';
                isValid = false;
            }

            if (isValid) {
                // Simulate login success
                Utils.showToast('Đăng nhập thành công!', 'success', true);
                window.location.href = './roleSelect.html';

                // Handle "Remember Me" functionality
                if (remember) {
                    localStorage.setItem('email', email.value);
                } else {
                    localStorage.removeItem('email');
                }
            } else {
                Utils.showToast('Đăng nhập thất bại!', 'error');
            }
        },

        loginWithGoogle() {
            Utils.showToast('Đăng nhập bằng Google (Mô phỏng)', 'success');
        },

        loginWithFacebook() {
            Utils.showToast('Đăng nhập bằng Facebook (Mô phỏng)', 'success');
        },

        loginWithZalo() {
            Utils.showToast('Đăng nhập bằng Zalo (Mô phỏng)', 'success');
        },

        init() {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) {
                document.getElementById('loginEmail').value = savedEmail;
                document.getElementById('rememberMe').checked = true;
            }
        }
    },

    // Register page functionality
    register: {
        handleRegister(event) {
            event.preventDefault();
            const name = document.getElementById('registerName');
            const email = document.getElementById('registerEmail');
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');

            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';

            // Validation
            let isValid = true;

            if (!name.value.trim()) {
                nameError.textContent = 'Họ và tên không được để trống!';
                isValid = false;
            }

            if (!email.value.trim() || !email.checkValidity()) {
                emailError.textContent = 'Vui lòng nhập email hợp lệ!';
                isValid = false;
            }

            if (!password.value.trim() || password.value.length < 6) {
                passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự!';
                isValid = false;
            }

            if (!confirmPassword.value.trim() || confirmPassword.value !== password.value) {
                confirmPasswordError.textContent = 'Mật khẩu xác nhận không khớp!';
                isValid = false;
            }

            if (isValid) {
                Utils.showConfirmPopup(
                    'Xác nhận đăng ký',
                    'Bạn có chắc chắn muốn đăng ký tài khoản này?',
                    () => {
                        console.log('Register:', { name: name.value, email: email.value, password: password.value });
                        Utils.showToast('Đăng ký thành công!', 'success', true);
                        window.location.href = './login.html';
                    },
                    () => {
                        Utils.showToast('Đã hủy đăng ký!', 'error');
                    }
                );
            } else {
                Utils.showToast('Đăng ký thất bại!', 'error');
            }
        }
    },

    // Forgot Password page functionality
    forgotPassword: {
        handleForgotPassword(event) {
            event.preventDefault();
            const email = document.getElementById('forgotEmail');
            const emailError = document.getElementById('emailError');

            // Reset error message
            emailError.textContent = '';

            // Validation
            let isValid = true;

            if (!email.value.trim() || !email.checkValidity()) {
                emailError.textContent = 'Vui lòng nhập email hợp lệ!';
                isValid = false;
            }

            if (isValid) {
                Utils.showConfirmPopup(
                    'Xác nhận gửi liên kết khôi phục',
                    'Bạn có chắc chắn muốn gửi liên kết khôi phục đến email này?',
                    () => {
                        console.log('Forgot Password:', { email: email.value });
                        Utils.showToast('Liên kết khôi phục đã được gửi!', 'success', true);
                        window.location.href = './reset-password.html';
                    },
                    () => {
                        Utils.showToast('Đã hủy gửi liên kết khôi phục!', 'error');
                    }
                );
            } else {
                Utils.showToast('Gửi liên kết khôi phục thất bại!', 'error');
            }
        }
    },

    // Reset Password page functionality
    resetPassword: {
        handleResetPassword(event) {
            event.preventDefault();
            const newPassword = document.getElementById('newPassword');
            const confirmNewPassword = document.getElementById('confirmNewPassword');
            const newPasswordError = document.getElementById('newPasswordError');
            const confirmNewPasswordError = document.getElementById('confirmNewPasswordError');

            // Reset error messages
            newPasswordError.textContent = '';
            confirmNewPasswordError.textContent = '';

            // Validation
            let isValid = true;

            if (!newPassword.value.trim() || newPassword.value.length < 6) {
                newPasswordError.textContent = 'Mật khẩu mới phải có ít nhất 6 ký tự!';
                isValid = false;
            }

            if (!confirmNewPassword.value.trim() || confirmNewPassword.value !== newPassword.value) {
                confirmNewPasswordError.textContent = 'Mật khẩu xác nhận không khớp!';
                isValid = false;
            }

            if (isValid) {
                Utils.showConfirmPopup(
                    'Xác nhận cập nhật mật khẩu',
                    'Bạn có chắc chắn muốn cập nhật mật khẩu mới này?',
                    () => {
                        console.log('Reset Password:', { newPassword: newPassword.value });
                        Utils.showToast('Mật khẩu đã được cập nhật thành công!', 'success', true);
                        window.location.href = './login.html';
                    },
                    () => {
                        Utils.showToast('Đã hủy cập nhật mật khẩu!', 'error');
                    }
                );
            } else {
                Utils.showToast('Cập nhật mật khẩu thất bại!', 'error');
            }
        }
    }
};

// Initialize based on current page
window.onload = function() {
    const path = window.location.pathname;
    if (path.includes('login.html')) {
        Auth.login.init();
    }
};