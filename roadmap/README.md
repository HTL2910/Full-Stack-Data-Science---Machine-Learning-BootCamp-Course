# Lộ trình Data Science & Machine Learning

Website roadmap tiếng Việt: 14 giai đoạn, 59 chủ đề, từ toán và Python đến ML, Deep Learning, LLM/RAG và MLOps.
Mỗi chủ đề gồm: khái niệm, lý do sử dụng, khi nào dùng / không nên dùng, ví dụ ứng dụng thực tế, code mẫu,
lỗi thường gặp, công cụ và tài liệu học. Giai đoạn cuối là case study dự án `AI/Flight_Fare_Prediction` trong repo.

## Mở website

Mở trực tiếp `roadmap/index.html` bằng trình duyệt (không cần server).

## Xuất PDF

Nút **Xuất PDF** (thanh trên cùng, mỗi giai đoạn, mỗi chủ đề) tạo file A4 có bìa, mục lục bấm được,
số trang và liên kết tài liệu. Phạm vi: toàn bộ lộ trình, các giai đoạn đã chọn, hoặc các chủ đề chưa học.
Thư viện `html2canvas` và `jsPDF` được tải từ cdnjs khi bấm xuất, nên cần kết nối mạng.
Nút **In / Lưu PDF bằng trình duyệt** tạo PDF có chữ chọn và tìm kiếm được.

## Sửa nội dung

Nội dung nằm trong `roadmap/src/data-*.js`, giao diện trong `src/template.html`, `src/styles.css`, `src/app.js`.
Sau khi sửa, chạy:

```bash
python roadmap/build.py
```
