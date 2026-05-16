# Wind

Ứng dụng web PWA cho chỉnh sửa ảnh, tạo video và ghép video bằng Windy. Dự án này được xây dựng để hoạt động trên máy tính và điện thoại dưới dạng Progressive Web App.

## Tính năng chính

- Upload ảnh và xem trước trực tiếp.
- Áp dụng bộ lọc và hiệu ứng màu sắc bằng cách nhấn nút.
- Mục Windy Enhance giả lập quá trình xử lý ảnh.
- Tạo video Windy demo theo prompt.
- Trợ lý Windy gợi ý kế hoạch sáng tạo và hoàn thành mục tiêu.
- Hỗ trợ cài đặt app như PWA trên điện thoại và desktop.

## Cấu trúc dự án

- `index.html` - giao diện chính.
- `style.css` - kiểu dáng trang.
- `app.js` - tương tác người dùng và mô phỏng chức năng Windy.
- `manifest.webmanifest` - cấu hình PWA.
- `service-worker.js` - cache nội dung để app offline.
- `images/` - hình ảnh, icon và preview.

## Chạy thử local

1. Mở thư mục `ai-media-studio` bằng VS Code hoặc trình quản lý file.
2. Tạo file `.env` từ `.env.example` và điền `OPENAI_API_KEY` nếu bạn muốn kết nối AI thật.
3. Cài dependencies:
   - `npm install`
4. Chạy ứng dụng với lệnh:
   - `npm start`
5. Mở `http://localhost:4000` trên trình duyệt.

## Kết nối AI thật

1. Tạo file `.env` từ `.env.example`.
2. Nhập `OPENAI_API_KEY` và `OPENAI_API_URL` bằng API key của bạn.
3. Chạy lại `npm start`.
4. Các nút Windy sẽ gọi `/api/ai/text` và `/api/ai/image` qua server gốc.

## Nâng cấp thành app thật với AI

Để kết nối với AI thật và xử lý ảnh/video thực tế, bạn có thể làm thêm:

1. Tạo backend Node hoặc PHP để gọi API AI.
2. Kết nối với API như OpenAI, Stable Diffusion, hoặc dịch vụ video AI.
3. Thay thế phần demo trong `app.js` bằng các request đến API.
4. Lưu trữ dữ liệu người dùng, dự án, và lịch sử chỉnh sửa.
5. Triển khai lên hosting có HTTPS để public.

## Triển khai

- Dùng hosting tĩnh hoặc Node/VPS.
- Nếu muốn app install trên điện thoại, dùng HTTPS và deploy qua domain.
- Nếu cần backend AI, triển khai thêm server và bảo mật API key.

## Public ngay bây giờ

### Dùng Docker (nhanh nhất)

1. Tại thư mục `ai-media-studio`, xây dựng image:
   - `docker build -t wind .`
2. Chạy container:
   - `docker run -p 4000:4000 --env OPENAI_API_KEY=your_openai_api_key wind`
3. Truy cập `http://localhost:4000`.

### Dùng docker-compose

1. Chạy:
   - `docker compose up --build`
2. Mở `http://localhost:4000`.

### Public ngay lên Render

1. Tạo một repo GitHub chứa dự án này.
2. Mở Render và chọn "New Web Service".
3. Kết nối GitHub, chọn repo và branch `main`.
4. Render sẽ dùng `render.yaml` để tự động cấu hình.
5. Thêm biến môi trường `OPENAI_API_KEY` trong Render settings.
6. Sau khi build xong, app sẽ public qua URL Render.

### Nếu muốn public lên hosting khác

- Đưa toàn bộ thư mục dự án lên dịch vụ như Railway, Vercel, hoặc VPS.
- Nếu dùng Render/Railway, chọn repo chứa project và để `web: node server.js` làm lệnh khởi chạy.
- Đảm bảo thêm biến môi trường `OPENAI_API_KEY` vào cấu hình deploy.

### Cách kiểm tra nhanh local

- App chạy ở `http://localhost:4000`
- Nếu bạn cần truy cập ngoài mạng nội bộ, dùng dịch vụ tunnel như ngrok trên máy của bạn:
  - `ngrok http 4000`

---

Chúc bạn xây dựng được ứng dụng chỉnh sửa ảnh/video AI thật ấn tượng! Nếu anh/chị muốn, tôi có thể tiếp tục mở rộng dự án này với backend thực, đăng nhập người dùng và kết nối API AI thật sự.
