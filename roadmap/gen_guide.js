// Sinh roadmap/HUONG-DAN-HOC.md từ dữ liệu trong src/data-*.js.
//   node roadmap/gen_guide.js           -> chỉ tạo khi file chưa có (giữ trạng thái bạn đã đánh)
//   node roadmap/gen_guide.js --force   -> ghi đè
const fs = require("fs"), path = require("path");
const dir = __dirname, out = path.join(dir, "HUONG-DAN-HOC.md");
if (fs.existsSync(out) && !process.argv.includes("--force")) { console.log("Đã có", out, "(dùng --force để ghi đè)"); process.exit(0); }
global.window = {};
fs.readdirSync(path.join(dir, "src")).filter(f => /^data-.*\.js$/.test(f)).sort()
  .forEach(f => eval(fs.readFileSync(path.join(dir, "src", f), "utf8")));
const R = window.ROADMAP, LV = { 1: "Cơ bản", 2: "Trung cấp", 3: "Nâng cao" };
const TR = { found: "Nền tảng", data: "Dữ liệu", ml: "Machine Learning", dl: "Deep Learning và GenAI", ops: "MLOps và Sản phẩm" };
const hours = ms => ms.reduce((a, m) => a + m.hours, 0);
const all = R.flatMap(s => s.modules), total = hours(all);
const clean = t => t.replace(/[:;#,]/g, " ").replace(/&/g, "và").replace(/\s+/g, " ").trim();

// Gantt mẫu: 10 giờ/tuần, bắt đầu 01/10/2026
let d = new Date("2026-10-01T00:00:00"), track = null;
const iso = x => x.toISOString().slice(0, 10);
const gantt = ["gantt", "  title Kế hoạch mẫu - 10 giờ mỗi tuần", "  dateFormat YYYY-MM-DD", "  axisFormat %m/%Y"];
R.forEach((s, i) => {
  if (s.track !== track) { track = s.track; gantt.push("  section " + TR[track]); }
  const days = Math.max(3, Math.ceil(hours(s.modules) / 10 * 7));
  gantt.push(`  GĐ ${i} ${clean(s.title).slice(0, 44)} :g${i}, ${iso(d)}, ${days}d`);
  d = new Date(d.getTime() + days * 864e5);
});

const md = [];
md.push(`# Hướng dẫn học Data Science & Machine Learning từ đầu

Tài liệu này đi kèm website [roadmap/index.html](index.html). Website có đầy đủ nội dung từng chủ đề, sơ đồ,
code mẫu, ô chọn trạng thái và xuất PDF. File này dùng để theo dõi tiến độ ngay trên GitHub: sửa cột **Trạng thái**
trong bảng cuối file rồi commit.

Tổng cộng **${R.length} giai đoạn, ${all.length} chủ đề, khoảng ${total} giờ học**.
Với 10 giờ/tuần là khoảng ${Math.ceil(total / 10)} tuần; 20 giờ/tuần là khoảng ${Math.ceil(total / 20)} tuần.

## 1. Sáu bước học từ con số 0

1. **Kiểm tra đầu vào.** Cần dùng được máy tính, cài được phần mềm, đọc được tài liệu tiếng Anh kỹ thuật cơ bản
   và nhớ toán phổ thông. Nếu đã biết một phần, làm lại code mẫu của chủ đề đó mà không nhìn: làm được thì đánh
   "Đã xong", chưa chắc thì đánh "Cần ôn lại".
2. **Đặt nhịp học.** Người đi làm nên giữ 8–12 giờ/tuần; học toàn thời gian 25–35 giờ/tuần. Trên website, nhập số
   giờ mỗi tuần và ngày bắt đầu để biểu đồ Gantt tự tính lịch.
3. **Học theo thứ tự giai đoạn.** Giai đoạn 0 → 6 là phần lõi bắt buộc. Sau đó chọn nhánh: dữ liệu bảng và dự báo
   (7, 8), AI và LLM (9, 10), hoặc triển khai (11, 12). Giai đoạn 13 áp dụng tất cả vào dự án của repo.
4. **Mỗi chủ đề đi qua năm việc:** đọc khái niệm → xem sơ đồ và tự vẽ lại → chạy code mẫu (Jupyter/Colab) →
   làm lại với bộ dữ liệu khác trên Kaggle → tự giải thích dùng khi nào, không dùng khi nào, vì sao.
5. **Làm dự án ở mỗi mốc** (bảng ở mục 4) trước khi đi tiếp.
6. **Ôn định kỳ.** Cuối tuần lọc "Cần ôn lại" để làm lại; cuối tháng xuất PDF "Chủ đề chưa xong" để in và ghi chú.

## 2. Bốn trạng thái và khi nào đổi

| Ký hiệu | Trạng thái | Khi nào dùng |
|---|---|---|
| ⬜ | Chưa học | Chưa mở chủ đề này. |
| 🟦 | Đang học | Đang đọc, xem sơ đồ, chạy code hoặc làm bài tập. |
| ✅ | Đã xong | Giải thích được khái niệm, đã chạy code và tự làm lại với dữ liệu khác. |
| 🟧 | Cần ôn lại | Đã học nhưng làm lại sau 1–2 tuần thì chưa chắc. |

Vòng đời thường gặp của một chủ đề:

\`\`\`mermaid
flowchart LR
  A["⬜ Chưa học"] -->|"Bắt đầu đọc"| B["🟦 Đang học"]
  B -->|"Xong 5 việc"| C["✅ Đã xong"]
  C -->|"Làm lại sau 1–2 tuần thấy chưa chắc"| D["🟧 Cần ôn lại"]
  D -->|"Làm lại code, tự giải thích được"| C
\`\`\`

## 3. Lộ trình và lịch mẫu

Thứ tự và phụ thuộc giữa các giai đoạn:

\`\`\`mermaid
${window.ROADMAP_OVERVIEW.src}
  classDef hl fill:#DCE7FB,stroke:#1F5FD1,stroke-width:2px
\`\`\`

Lịch mẫu với 10 giờ/tuần, bắt đầu 01/10/2026 (trên website lịch tự tính theo số giờ của bạn và tô màu theo trạng thái):

\`\`\`mermaid
${gantt.join("\n")}
\`\`\`

## 4. Dự án ở các mốc

| Sau giai đoạn | Dự án | Chứng minh được |
|---|---|---|
| 3. Dữ liệu | Phân tích EDA bộ \`AI/Flight_Fare_Prediction/Data_Train.xlsx\`, báo cáo một trang về yếu tố ảnh hưởng giá vé | pandas, SQL, trực quan hoá |
| 6. Đánh giá | Mô hình dự đoán giá vé: Pipeline, chia theo thời gian, so sánh baseline, Ridge, Random Forest, LightGBM | Feature engineering, validation, tuning |
| 7. Không giám sát | Phân khúc khách hàng RFM với bộ Online Retail (UCI) | K-Means, diễn giải cụm |
| 8. Chuỗi thời gian | Dự báo doanh số 8 tuần, so với seasonal naive bằng backtesting | Lag features, đánh giá theo thời gian |
| 10. NLP và GenAI | Chatbot RAG hỏi đáp tài liệu khoá học, có trích dẫn và 30 câu hỏi đánh giá | Embeddings, vector search, đánh giá LLM |
| 11 → 13. MLOps | Flight Fare lên FastAPI + Docker, CI bằng GitHub Actions, báo cáo drift | Triển khai, MLflow, giám sát |

## 5. Bảng theo dõi trạng thái

Đổi ký hiệu ở cột **Trạng thái** (⬜ 🟦 ✅ 🟧) và ghi ngày khi bạn đổi.
`);
R.forEach((s, i) => {
  md.push(`### Giai đoạn ${i}. ${s.title}\n\n${s.subtitle}. Thời lượng ${s.weeks}, khoảng ${hours(s.modules)} giờ. Mục tiêu: ${s.goal}\n`);
  md.push("| # | Chủ đề | Trình độ | Giờ | Trạng thái | Ngày | Ghi chú |\n|---|---|---|---|---|---|---|");
  s.modules.forEach((m, k) => md.push(`| ${i}.${k + 1} | ${m.title} | ${LV[m.level]} | ${m.hours} | ⬜ Chưa học |  |  |`));
  md.push("");
});
fs.writeFileSync(out, md.join("\n"));
console.log("->", out);
