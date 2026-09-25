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

## 1. Mục tiêu: hiểu đủ để làm chủ AI

Bộ tài liệu này giúp bạn hiểu đủ nền tảng để **giao việc cho AI rõ ràng, tự kiểm chứng code AI viết,
ra quyết định và phản biện được đề xuất của AI**. Các nghiên cứu cho thấy AI chỉ giúp khi người dùng hiểu việc mình làm:

${window.ROADMAP_AI_EVIDENCE.map(e => `- **${e.n}**: ${e.t} ([${e.src[0]}](${e.src[1]}))`).join("\n")}

**Ba mức hiểu cần đạt ở mỗi chủ đề**

1. **Đọc hiểu:** giải thích được từng dòng code AI viết.
2. **Nhận diện lỗi:** biết lỗi AI hay mắc ở chủ đề đó (rò rỉ dữ liệu, chia tập sai, metric sai, tham số đã bị loại bỏ, package không tồn tại).
3. **Quyết định:** chọn phương án dựa trên đánh đổi và nói được vì sao không chọn phương án khác.

**Quy trình làm việc với AI**

\`\`\`mermaid
sequenceDiagram
  participant B as Bạn
  participant AI as Trợ lý AI
  participant C as Code và dữ liệu
  B->>B: Đóng khung mục tiêu, dữ liệu có lúc dự đoán, metric, ràng buộc
  B->>AI: Hỏi 2–3 phương án kèm đánh đổi, chưa cần code
  AI-->>B: Phương án và giả định
  B->>AI: Phản biện - giả định nào sai thì phương án hỏng?
  B->>B: Chọn phương án (quyết định của bạn)
  B->>AI: Yêu cầu code cho một bước nhỏ, nêu rõ thư viện và phiên bản
  AI-->>B: Code nháp
  B->>C: Đọc từng dòng, chạy trên dữ liệu nhỏ, so với baseline
  alt Kết quả hợp lý và bạn giải thích được
    B->>C: Commit kèm test
  else Có dấu hiệu sai
    B->>AI: Gửi lỗi và output, hỏi nguyên nhân, không nhận bản sửa mù
  end
\`\`\`

**10 câu hỏi kiểm tra mọi đề xuất của AI**

1. Đặc trưng này có sẵn tại thời điểm dự đoán không?
2. Bước nào đang fit trên dữ liệu, có chạm vào tập test không?
3. Cách chia tập có khớp cách mô hình được dùng (theo thời gian, theo nhóm) không?
4. Metric có gắn với chi phí thật của sai số không, đã so với baseline chưa?
5. Hàm và tham số có tồn tại trong phiên bản thư viện đang dùng không? Đối chiếu tài liệu chính thức.
6. Package được đề xuất có thật trên PyPI không, ai phát triển, bao nhiêu lượt tải?
7. Kết quả có tốt đến mức đáng ngờ không (accuracy 99%, R² 0,99)?
8. Có giả định ngầm nào về phân phối, đơn vị, tính độc lập của dữ liệu không?
9. Code có chạy được trên máy khác không (đường dẫn, secret, phiên bản)?
10. Tôi có tự giải thích được từng dòng không? Nếu không, hỏi AI giải thích trước khi dùng.

**Quyết định không giao cho AI:** mục tiêu, target và metric chính; ngưỡng quyết định theo chi phí thật; dữ liệu nào được phép dùng
(pháp lý, quyền riêng tư, công bằng); mức rủi ro khi triển khai và khi nào dừng mô hình; hành động không thể hoàn tác.

**Prompt mơ hồ và prompt cụ thể**

| Mơ hồ | Cụ thể |
|---|---|
| Viết code dự đoán giá vé cho tôi. | Dữ liệu Data_Train.xlsx, target Price, dự đoán lúc người dùng tìm vé. Dùng scikit-learn 1.5, Pipeline + ColumnTransformer, chia theo thời gian (train tháng 3–5, test tháng 6), so với baseline trung vị theo tuyến, báo cáo MAE. Làm từng bước và giải thích lý do. |
| Làm sao cải thiện mô hình? | R² train 0,95, test 0,80, MAE 1.174. Liệt kê 3 giả thuyết theo thứ tự khả năng, mỗi giả thuyết kèm cách kiểm chứng tốn ít thời gian nhất. Chưa viết code. |

**Luyện phản biện:** tự đánh giá mỗi đề xuất là *Chấp nhận*, *Cần sửa* hay *Bác bỏ*, rồi mới mở đáp án.

${window.ROADMAP_QUIZ.map((q, i) => `${i + 1}. AI đề xuất: ${q.ai}${q.code ? " `" + q.code.replace(/\n/g, "; ") + "`" : ""}\n   <details><summary>Đáp án</summary>${({ accept: "Chấp nhận", fix: "Cần sửa", reject: "Bác bỏ" })[q.ans]}. ${q.why}</details>`).join("\n")}

## 2. Sáu bước học từ con số 0

1. **Kiểm tra đầu vào.** Cần dùng được máy tính, cài được phần mềm, đọc được tài liệu tiếng Anh kỹ thuật cơ bản
   và nhớ toán phổ thông. Nếu đã biết một phần, làm lại code mẫu của chủ đề đó mà không nhìn: làm được thì đánh
   "Đã xong", chưa chắc thì đánh "Cần ôn lại".
2. **Đặt nhịp học.** Người đi làm nên giữ 8–12 giờ/tuần; học toàn thời gian 25–35 giờ/tuần. Trên website, nhập số
   giờ mỗi tuần và ngày bắt đầu để biểu đồ Gantt tự tính lịch.
3. **Học theo thứ tự giai đoạn.** Giai đoạn 0 → 6 là phần lõi bắt buộc. Sau đó chọn nhánh: dữ liệu bảng và dự báo
   (7, 8), AI và LLM (9, 10), hoặc triển khai (11, 12). Giai đoạn 13 áp dụng tất cả vào dự án của repo.
4. **Mỗi chủ đề đi qua sáu việc:** đọc khái niệm → xem sơ đồ và tự vẽ lại → chạy code mẫu (Jupyter/Colab) →
   dùng prompt mẫu nhờ AI làm lại với dữ liệu khác rồi tự kiểm chứng → làm tình huống luyện phản biện →
   tự giải thích dùng khi nào, không dùng khi nào, vì sao, và AI hay sai ở đâu.
5. **Làm dự án ở mỗi mốc** (bảng ở mục 5) trước khi đi tiếp.
6. **Ôn định kỳ.** Cuối tuần lọc "Cần ôn lại" để làm lại; cuối tháng xuất PDF "Chủ đề chưa xong" để in và ghi chú.

## 3. Bốn trạng thái và khi nào đổi

| Ký hiệu | Trạng thái | Khi nào dùng |
|---|---|---|
| ⬜ | Chưa học | Chưa mở chủ đề này. |
| 🟦 | Đang học | Đang đọc, xem sơ đồ, chạy code hoặc làm bài tập. |
| ✅ | Đã xong | Giải thích được khái niệm, tự chạy và sửa được code, chỉ ra được lỗi AI hay mắc ở chủ đề này. |
| 🟧 | Cần ôn lại | Đã học nhưng làm lại sau 1–2 tuần thì chưa chắc. |

Vòng đời thường gặp của một chủ đề:

\`\`\`mermaid
flowchart LR
  A["⬜ Chưa học"] -->|"Bắt đầu đọc"| B["🟦 Đang học"]
  B -->|"Xong 5 việc"| C["✅ Đã xong"]
  C -->|"Làm lại sau 1–2 tuần thấy chưa chắc"| D["🟧 Cần ôn lại"]
  D -->|"Làm lại code, tự giải thích được"| C
\`\`\`

## 4. Lộ trình và lịch mẫu

Thứ tự và phụ thuộc giữa các giai đoạn:

\`\`\`mermaid
${window.ROADMAP_OVERVIEW.src}
  classDef hl fill:#DCE7FB,stroke:#1F5FD1,stroke-width:2px
\`\`\`

Lịch mẫu với 10 giờ/tuần, bắt đầu 01/10/2026 (trên website lịch tự tính theo số giờ của bạn và tô màu theo trạng thái):

\`\`\`mermaid
${gantt.join("\n")}
\`\`\`

## 5. Dự án ở các mốc

| Sau giai đoạn | Dự án | Chứng minh được |
|---|---|---|
| 3. Dữ liệu | Phân tích EDA bộ \`AI/Flight_Fare_Prediction/Data_Train.xlsx\`, báo cáo một trang về yếu tố ảnh hưởng giá vé | pandas, SQL, trực quan hoá |
| 6. Đánh giá | Mô hình dự đoán giá vé: Pipeline, chia theo thời gian, so sánh baseline, Ridge, Random Forest, LightGBM | Feature engineering, validation, tuning |
| 7. Không giám sát | Phân khúc khách hàng RFM với bộ Online Retail (UCI) | K-Means, diễn giải cụm |
| 8. Chuỗi thời gian | Dự báo doanh số 8 tuần, so với seasonal naive bằng backtesting | Lag features, đánh giá theo thời gian |
| 10. NLP và GenAI | Chatbot RAG hỏi đáp tài liệu khoá học, có trích dẫn và 30 câu hỏi đánh giá | Embeddings, vector search, đánh giá LLM |
| 11 → 13. MLOps | Flight Fare lên FastAPI + Docker, CI bằng GitHub Actions, báo cáo drift | Triển khai, MLflow, giám sát |

## 6. Bảng theo dõi trạng thái

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
