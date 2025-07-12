# XTS-TXNG - Hệ thống Truy xuất Nguồn gốc Sản phẩm

Đây là dự án ứng dụng web được xây dựng để quản lý truy xuất nguồn gốc sản phẩm, với ba phân hệ người dùng chính: Quản trị viên (Admin), Công ty (Company) và Khách (Guest).

## Các Phân hệ và Tính năng chính:

### 1. Quản trị viên (Admin):

- **Tổng quan (Overview):** Trang tổng quan cho quản trị viên.
- **Quản lý Khách hàng (Customers):**
  - Danh sách và chi tiết Hồ sơ đang chờ duyệt (Pending Profiles).
  - Quản lý và chi tiết các Công ty Sản xuất (Production Entities).
  - Quản lý Chung các đơn vị (Manage Entities).
- **Quản lý Dịch vụ (Services):**
  - Quản lý Gói dịch vụ (Service Packages): Danh sách, thêm mới, chỉnh sửa, chi tiết.
  - Quản lý Tham số (Parameters).
- **Quản lý Thanh toán (Payments):**
  - Danh sách và chi tiết các khoản Thanh toán (Payments).

### 2. Công ty (Company):

- **Tổng quan (Overview):** Bảng điều khiển tổng quan cho công ty.
- **Quản lý Dịch vụ (Services):**
  - Danh sách Dịch vụ hiện tại (Current Services).
  - Quản lý Đơn hàng và Thanh toán (Orders & Payments): Danh sách, thêm mới, chi tiết.
- **Truy xuất Nguồn gốc (Traceability):**
  - Quản lý Nhật ký (Diary): Danh sách, thêm mới.
  - Quản lý Sản phẩm (Products): Danh sách.

### 3. Khách (Guest):

- **Tìm kiếm QR (Search QR):** Trang tìm kiếm thông tin sản phẩm qua mã QR.
- **Thông tin Công ty (Company Information):** Giới thiệu, Truyền thông, Đối tác, Hồ sơ.
- **Thông tin Sản phẩm (Product Information):** Giới thiệu, Hồ sơ, Điểm bán, Nhật ký.

Dự án được xây dựng sử dụng HTML, CSS và JavaScript.