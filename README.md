# Full Stack Data Science & Machine Learning BootCamp Course

Repo học tập theo khoá Udemy **Full Stack Data Science & Machine Learning BootCamp**. Repo gồm hai phần:

1. **[Lộ trình Data Science & Machine Learning](roadmap/)**: website tiếng Việt, học từ con số 0 đến triển khai mô hình. Có theo dõi trạng thái học và xuất PDF.
2. **[Flight Fare Prediction](AI/Flight_Fare_Prediction/)**: dự án dự đoán giá vé máy bay, gồm notebook phân tích, huấn luyện mô hình và web app Flask.

## Bắt đầu nhanh

| Bạn muốn | Mở |
|---|---|
| Xem lộ trình học đầy đủ | [`roadmap/index.html`](roadmap/index.html): tải về rồi mở bằng trình duyệt, không cần server |
| Biết nên học gì trước, mỗi tuần học bao nhiêu | [`roadmap/HUONG-DAN-HOC.md`](roadmap/HUONG-DAN-HOC.md) |
| Theo dõi tiến độ ngay trên GitHub | Bảng trạng thái cuối file [`HUONG-DAN-HOC.md`](roadmap/HUONG-DAN-HOC.md) |
| Chạy dự án dự đoán giá vé | Mục [Flight Fare Prediction](#flight-fare-prediction) bên dưới |

## Lộ trình Data Science & Machine Learning

Toàn bộ lộ trình gồm **14 giai đoạn, 59 chủ đề, khoảng 585 giờ học**. Học 10 giờ/tuần thì mất khoảng 59 tuần; 20 giờ/tuần thì khoảng 30 tuần.

```mermaid
flowchart TD
  S0["0 · Tư duy, quy trình"] --> S1["1 · Toán"]
  S0 --> S2["2 · Python"]
  S1 --> S3["3 · Dữ liệu: SQL, EDA"]
  S2 --> S3
  S3 --> S4["4 · Feature Engineering"]
  S4 --> S5["5 · ML có giám sát"]
  S5 --> S6["6 · Đánh giá, tinh chỉnh"]
  S4 --> S7["7 · Không giám sát"]
  S6 --> S8["8 · Chuỗi thời gian"]
  S6 --> S9["9 · Deep Learning"]
  S1 --> S9
  S9 --> S10["10 · NLP, GenAI"]
  S6 --> S11["11 · MLOps"]
  S10 --> S11
  S3 --> S12["12 · Big Data"]
  S11 --> S13["13 · Case study repo"]
  S12 --> S13
```

| GĐ | Giai đoạn | Thời lượng | Chủ đề | Giờ | Sơ đồ | Case doanh nghiệp |
|---|---|---|---|---|---|---|
| 0 | Tư duy Data Science & quy trình dự án | 1 tuần | 2 | ~7 | 2 | 4 |
| 1 | Nền tảng Toán học | 4–6 tuần | 4 | ~70 | 2 | 8 |
| 2 | Lập trình Python cho dữ liệu | 4–6 tuần | 5 | ~85 | 1 | 9 |
| 3 | Dữ liệu: thu thập, SQL, làm sạch, EDA | 4–5 tuần | 4 | ~67 | 4 | 8 |
| 4 | Feature Engineering | 2–3 tuần | 5 | ~30 | 3 | 9 |
| 5 | Machine Learning có giám sát | 6–8 tuần | 8 | ~54 | 4 | 14 |
| 6 | Đánh giá, tinh chỉnh và giải thích mô hình | 3 tuần | 5 | ~33 | 3 | 8 |
| 7 | Học không giám sát & Hệ gợi ý | 3 tuần | 5 | ~29 | 2 | 10 |
| 8 | Chuỗi thời gian & Dự báo | 2–3 tuần | 2 | ~20 | 1 | 3 |
| 9 | Deep Learning | 6–8 tuần | 4 | ~53 | 3 | 9 |
| 10 | NLP & Generative AI | 5–6 tuần | 5 | ~48 | 5 | 12 |
| 11 | MLOps & Triển khai | 5–6 tuần | 5 | ~42 | 5 | 11 |
| 12 | Big Data & Data Engineering cho DS | 3 tuần | 2 | ~20 | 2 | 3 |
| 13 | Case study: Flight Fare Prediction (repo này) | 1–2 tuần | 3 | ~27 | 3 | 1 |

### Mỗi chủ đề có gì

- **Khái niệm**: giải thích bằng tiếng Việt, kèm mức độ (cơ bản, trung cấp, nâng cao) và số giờ ước tính.
- **Sơ đồ Mermaid**: flowchart hoặc sequence diagram cho các bước và các bên tương tác. Tổng cộng 42 sơ đồ.
- **Lý do sử dụng, khi nào dùng, khi nào không nên dùng.**
- **Ví dụ ứng dụng** và **case doanh nghiệp đã công bố**: 109 case của Netflix, Amazon, Airbnb, Uber, Stripe, Booking.com, Morgan Stanley, Grab, MoMo, VinAI… Trong đó có 14 thất bại kèm bài học (Zillow Offers, Google Flu Trends, công cụ tuyển dụng của Amazon, chatbot Air Canada…). Mỗi case có link nguồn.
- **Code mẫu** (Python, SQL, Docker, YAML), **lỗi thường gặp**, **công cụ** và **tài liệu học**.

### Tính năng của website

- **Hướng dẫn học từ đầu**: sáu bước học, dự án cần làm ở mỗi mốc, và biểu đồ Gantt tự tính lịch theo số giờ học mỗi tuần.
- **Trạng thái học** cho từng chủ đề: Chưa học, Đang học, Đã xong, Cần ôn lại. Trạng thái hiện trên thẻ chủ đề, mục lục, thanh tiến độ và biểu đồ Gantt. Nút đầu trang gợi ý chủ đề nên học tiếp.
- **Chọn thuật toán nhanh**: cây quyết định và bảng tra "nhu cầu → thuật toán".
- **Ứng dụng thực tế theo ngành**: bảng tra 109 case, lọc theo 9 nhóm ngành hoặc chỉ xem thất bại.
- **Tìm kiếm và lọc** theo từ khoá, tên doanh nghiệp, trình độ và trạng thái.
- **Xuất PDF khổ A4**. Có thể xuất toàn bộ lộ trình, từng giai đoạn, từng chủ đề hoặc chỉ các chủ đề chưa xong. File PDF gồm:
  - bìa và mục lục bấm được;
  - kế hoạch học và bảng theo dõi trạng thái;
  - sơ đồ, case doanh nghiệp, code và nguồn.
- **Giao diện sáng/tối**, dùng được trên điện thoại.

Trạng thái học lưu trong trình duyệt khi mở file `index.html`. Khi mở bản đăng trên Claude, trạng thái lưu theo tài khoản và đồng bộ giữa các thiết bị. Website cần kết nối mạng để tải font, thư viện vẽ sơ đồ (Mermaid) và thư viện tạo PDF từ CDN.

### Cấu trúc thư mục `roadmap/`

```
roadmap/
├── index.html              # website đã build, mở trực tiếp bằng trình duyệt
├── HUONG-DAN-HOC.md        # hướng dẫn học + bảng theo dõi trạng thái trên GitHub
├── build.py                # ghép src/ thành index.html
├── gen_guide.js            # sinh HUONG-DAN-HOC.md từ dữ liệu
└── src/
    ├── data-1-foundations.js   # GĐ 0–3: tư duy, toán, Python, dữ liệu
    ├── data-2-ml.js            # GĐ 4–7: feature engineering, ML, đánh giá, không giám sát
    ├── data-3-dl.js            # GĐ 8–10: chuỗi thời gian, deep learning, NLP & GenAI
    ├── data-4-mlops.js         # GĐ 11–13: MLOps, big data, case study
    ├── data-5-diagrams.js      # 42 sơ đồ Mermaid
    ├── data-6-applications.js  # 109 case doanh nghiệp có nguồn
    ├── template.html, styles.css, app.js
```

Sửa nội dung trong `roadmap/src/`, sau đó build lại:

```bash
python roadmap/build.py              # tạo lại roadmap/index.html
node roadmap/gen_guide.js --force    # tạo lại HUONG-DAN-HOC.md (xoá trạng thái bạn đã đánh trong file)
```

## Flight Fare Prediction

Dự án dự đoán giá vé máy bay nội địa Ấn Độ năm 2019 (thư mục [`AI/Flight_Fare_Prediction/`](AI/Flight_Fare_Prediction/)).

| File | Nội dung |
|---|---|
| `Data_Train.xlsx`, `Test_set.xlsx` | 10.683 chuyến bay có giá (tập train) và 2.671 chuyến không có giá (tập test) |
| `flight_price.ipynb` | EDA, tạo đặc trưng ngày giờ, one-hot hãng bay và tuyến, Random Forest, RandomizedSearchCV |
| `flight_rf.pkl` | Mô hình Random Forest đã huấn luyện |
| `app.py`, `templates/home.html` | Web app Flask nhận form và trả giá dự đoán |

Kết quả trong notebook: **R² = 0,798** trên tập test, **MAE ≈ 1.174 rupee** (khoảng 14% giá vé trung vị), RMSE ≈ 2.085.

### Chạy web app

```bash
cd AI/Flight_Fare_Prediction
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install flask flask-cors pandas scikit-learn openpyxl
python app.py                                           # mở http://127.0.0.1:5000
```

`app.py` đang load mô hình từ đường dẫn tuyệt đối `D:/...`. Trước khi chạy, sửa dòng đó thành:

```python
from pathlib import Path
model = pickle.load(open(Path(__file__).parent / "flight_rf.pkl", "rb"))
```

File `.pkl` phụ thuộc phiên bản scikit-learn đã dùng để lưu. Nếu gặp lỗi khi load, chạy lại notebook để huấn luyện và lưu lại mô hình.

### Các vấn đề đã biết

Các điểm này được phân tích chi tiết trong giai đoạn 13 của lộ trình:

- Thời lượng bay tính bằng `abs(Arrival_hour - Dep_hour)` nên sai với chuyến qua nửa đêm (22:20 → 01:10 bị tính thành 21 giờ 10 phút).
- Mã hoá one-hot trong `app.py` viết tay bằng chuỗi if/elif dài, dễ lệch với lúc huấn luyện. Nên dùng `Pipeline` + `OneHotEncoder`.
- Notebook lưu `reg_rf` (mô hình mặc định) chứ không lưu mô hình đã tinh chỉnh `rf_random.best_estimator_`.
- `max_features='auto'` và `sns.distplot` đã bị loại bỏ trong các phiên bản thư viện mới.
- Chỉ chia train/test ngẫu nhiên, chưa kiểm tra theo thời gian.

## Nguồn tham khảo chính

- [An Introduction to Statistical Learning](https://www.statlearning.com/)
- [Forecasting: Principles and Practice](https://otexts.com/fpp3/)
- [Dive into Deep Learning](https://d2l.ai/)
- [Google — Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Booking.com — 150 Successful Machine Learning Models (KDD 2019)](https://dl.acm.org/doi/10.1145/3292500.3330744)
- [The Netflix Recommender System](https://dl.acm.org/doi/10.1145/2843948)

Danh sách đầy đủ nằm trong website, ở mục **Nguồn tham khảo** và trong từng chủ đề.
