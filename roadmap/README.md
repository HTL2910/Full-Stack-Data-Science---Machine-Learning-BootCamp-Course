# Lộ trình Data Science & Machine Learning

Website roadmap tiếng Việt: 19 giai đoạn, 82 chủ đề, 53 sơ đồ Mermaid (flowchart và sequence diagram), từ toán và Python đến ML, Deep Learning, LLM/RAG và MLOps, cùng mảng Full-stack Web (React, Remix / React Router, Prisma).
Mỗi chủ đề gồm: khái niệm, lý do sử dụng, khi nào dùng / không nên dùng, ví dụ ứng dụng thực tế, code mẫu,
lỗi thường gặp, công cụ và tài liệu học. Giai đoạn cuối là case study dự án `AI/Flight_Fare_Prediction` trong repo.

## Mảng Full-stack Web

Giai đoạn 14–18 (`src/data-9-fullstack.js`): HTTP, HTML/CSS và accessibility, JavaScript, TypeScript + Zod; React
(component, hook, khi nào không cần `useEffect`, state trên URL, React 19, Testing Library); React Router v8 framework mode,
tức Remix sau khi gộp (route lồng nhau, loader/action, pending và optimistic UI, middleware xác thực, chọn cách render);
Prisma 7 (thiết kế schema, migration, truy vấn, N+1, index); production (OWASP Top 10:2025, Playwright, Docker, CI/CD,
gắn mô hình ML và stream LLM). Có nhánh nghề **Full-stack Web** riêng để lọc lộ trình và xuất PDF.

## Làm chủ AI

Mục tiêu của lộ trình là hiểu đủ để dùng AI viết code đúng hướng: giao việc rõ ràng, tự kiểm chứng, ra quyết định và phản biện
đề xuất của AI. Website có mục **Học để làm chủ AI** (số liệu nghiên cứu, quy trình, 10 câu hỏi kiểm tra, 32 tình huống luyện
phản biện). Mỗi chủ đề có phần **Làm việc với AI** gồm prompt mẫu, dấu hiệu AI sai, câu hỏi phản biện, cách tự kiểm chứng và các quyết định
bạn phải tự đưa ra. Dữ liệu nằm ở `src/data-7-ai.js`.

## Ứng dụng thực tế

120 case doanh nghiệp đã công bố (Netflix, Amazon, Airbnb, Uber, DoorDash, Stripe, Booking.com, Morgan Stanley,
Klarna, Google, DeepMind, Grab, MoMo, VinAI…), gồm 19 thất bại kèm bài học (Zillow Offers, Google Flu Trends,
công cụ tuyển dụng của Amazon, chatbot Air Canada, GitLab, Knight Capital…). Mỗi case có cách làm, kết quả đo được và nguồn.
Xem trong từng chủ đề hoặc bảng **Ứng dụng thực tế theo ngành**. Dữ liệu nằm ở `src/data-6-applications.js`.

## Học từ đầu và theo dõi trạng thái

- Trên website, mục **Hướng dẫn học từ đầu** gồm sáu bước học, định nghĩa bốn trạng thái, bảng dự án ở các mốc
  và biểu đồ Gantt tự tính lịch theo số giờ mỗi tuần và ngày bắt đầu bạn nhập.
- Mỗi chủ đề có ô **trạng thái**: Chưa học, Đang học, Đã xong, Cần ôn lại. Trạng thái hiện trên thẻ, mục lục bên trái,
  thanh tiến độ của từng giai đoạn, biểu đồ Gantt, và có bộ lọc theo trạng thái. Nút đầu trang gợi ý chủ đề nên học tiếp.
- Trạng thái lưu trong trình duyệt khi mở file trực tiếp; khi mở trong Claude, trạng thái lưu theo tài khoản và đồng bộ giữa các thiết bị.
- Muốn theo dõi ngay trên GitHub: dùng [HUONG-DAN-HOC.md](HUONG-DAN-HOC.md) (sinh bằng `node roadmap/gen_guide.js`,
  thêm `--force` để tạo lại từ đầu, lệnh này ghi đè các trạng thái đã sửa trong file).

## Mở website

Mở trực tiếp `roadmap/index.html` bằng trình duyệt (không cần server).

## Xuất PDF

Nút **Xuất PDF** (thanh trên cùng, mỗi giai đoạn, mỗi chủ đề) tạo file A4 có bìa, mục lục bấm được,
số trang và liên kết tài liệu. Phạm vi: toàn bộ lộ trình, các giai đoạn đã chọn, hoặc các chủ đề chưa xong.
Có thể kèm trang kế hoạch học (Gantt) và bảng theo dõi trạng thái có cột ghi chú để in.
Sơ đồ được đưa vào PDF (có thể tắt). Thư viện `html2canvas`, `jsPDF` và `mermaid` được tải từ CDN (cdnjs, jsDelivr) nên cần kết nối mạng.
Nút **In / Lưu PDF bằng trình duyệt** tạo PDF có chữ chọn và tìm kiếm được.

## Sửa nội dung

Nội dung nằm trong `roadmap/src/data-*.js`, giao diện trong `src/template.html`, `src/styles.css`, `src/app.js`.
Sau khi sửa, chạy:

```bash
python roadmap/build.py
```
