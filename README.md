# Một số lưu ý đối với project Frontend của [C0323G1] - Module6 - Sprint 1:

## Git structure: (theo thứ tự quan trọng trên xuống)

    ### main: nhánh chính - nơi lưu source code phiên bản cuối cùng trước khi deploy
    ### dev: nhánh dev - nơi lưu trữ source code chung của tất cả members sau khi đáp ứng yêu cầu và được approve merge request.
    ### <nhánh cá nhân> (ví dụ customer_QuyenHT): Nhánh cá nhân của từng member, dùng để push source code phần cá nhân của mình.
    Tên nhánh cá nhân tương tự phần back-end để tránh nhầm lẫn.

## Git rules (Quy tắc):

    ### Các quy tắc cơ bản tương tự thao tác tại back-end. (git status, git add, git commit, git push origin <tên nhánh cá nhân>)
    ### Đầu phiên làm việc nhớ git pull để update code mới (git status để kiểm tra trước khi pull).
    ### Trước khi commit và push để làm cơ sở merge vào dev, phải kiểm tra file chạy được, không xảy ra lỗi run-time và các lỗi khác. Ai vi phạm sẽ phạt nhé.

## Package structure:

    ### components: Mọi người lưu tất cả components của mình vào đây, lưu theo chức năng. Ví dụ components/customer/CustomerList.js. Các file css, js liên quan mọi người lưu vào package này luôn cho dễ quản lý.
    ### services: Mọi người lưu service liên quan. Ví dụ: services/CustomerService.js
    ### js, css: Các file js, css thư viện dùng chung. Ví dụ bootstrap, swiper,.. nếu có.
    ### img: Các file ảnh xài chung như logo, background.

## Các thư viện đã build:

Lưu ý: Mọi người muốn build thư viện thì liên hệ HuyL để build chung.

    "axios": "^1.5.0",
    "bootstrap": "^5.2.3",
    "bootstrap-icons": "^1.11.0",
    "formik": "^2.4.4",
    "json-server": "^0.17.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.11.0",
    "react-redux": "^8.1.2",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.3",
    "redux-persist": "^6.0.0",
    "redux-saga": "^1.2.3",
    "sweetalert2": "^11.7.28",
    "swiper": "^10.2.0",
    "yup": "^1.2.0"
    "jwt-decode": "^3.1.2",

## Các script quan trọng:

In the project directory, you can run:

### `npm start`: Đã mặc định cổng port là 3000.
