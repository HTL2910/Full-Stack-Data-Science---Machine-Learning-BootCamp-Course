/* Sơ đồ Mermaid: flowchart và sequence diagram cho từng chủ đề.
   Nút đánh dấu :::hl được tô màu nhấn khi hiển thị. */
window.ROADMAP_OVERVIEW = {
  title: "Thứ tự học và phụ thuộc giữa các giai đoạn",
  src: `flowchart TD
  S0["0 · Tư duy, quy trình"] --> S1["1 · Toán"]
  S0 --> S2["2 · Python"]
  S1 --> S3["3 · Dữ liệu: SQL, EDA"]
  S2 --> S3
  S3 --> S4["4 · Feature Engineering"]
  S4 --> S5["5 · ML có giám sát"]:::hl
  S5 --> S6["6 · Đánh giá, tinh chỉnh"]
  S4 --> S7["7 · Không giám sát"]
  S6 --> S8["8 · Chuỗi thời gian"]
  S6 --> S9["9 · Deep Learning"]
  S1 --> S9
  S9 --> S10["10 · NLP, GenAI"]:::hl
  S6 --> S11["11 · MLOps"]
  S10 --> S11
  S3 --> S12["12 · Big Data"]
  S11 --> S13["13 · Case study repo"]:::hl
  S12 --> S13`
};

window.ROADMAP_GUIDE_TREE = {
  title: "Cây quyết định chọn hướng tiếp cận",
  src: `flowchart TD
  Q0{"Dữ liệu có nhãn?"} -->|Có| Q1{"Dữ liệu dạng gì?"}
  Q0 -->|Không| U1{"Mục tiêu?"}
  U1 -->|Chia nhóm| K["K-Means / HDBSCAN"]
  U1 -->|Tìm điểm lạ| ISO["Isolation Forest"]
  U1 -->|Giảm chiều| PCA["PCA / UMAP"]
  Q1 -->|Bảng| Q2{"Target là gì?"}
  Q1 -->|Ảnh| CNN["CNN / ViT pretrained"]
  Q1 -->|Văn bản| Q3{"Có tài liệu cần tra cứu?"}
  Q1 -->|Chuỗi thời gian| TS["ETS / ARIMA hoặc LightGBM + lag"]
  Q3 -->|Có| RAG["RAG"]:::hl
  Q3 -->|Không| TXT["TF-IDF + Linear hoặc fine-tune Transformer"]
  Q2 -->|Số| Q4{"Cần giải thích hệ số?"}
  Q2 -->|Lớp| Q5{"Lớp rất hiếm?"}
  Q4 -->|Có| LIN["Linear / Ridge / Lasso"]
  Q4 -->|Không| GB["LightGBM / XGBoost / CatBoost"]:::hl
  Q5 -->|Có| IMB["GBDT + class weight + chọn ngưỡng PR"]
  Q5 -->|Không| LOG["Logistic baseline rồi GBDT"]`
};

window.ROADMAP_DIAGRAMS = {
  "crisp-dm": [{
    title: "Vòng lặp CRISP-DM mở rộng với giám sát sau triển khai",
    src: `flowchart LR
  A["Hiểu nghiệp vụ"] --> B["Hiểu dữ liệu"]
  B --> A
  B --> C["Chuẩn bị dữ liệu"]
  C --> D["Mô hình hoá"]
  D --> C
  D --> E["Đánh giá"]
  E -->|"Chưa đạt mục tiêu"| A
  E -->|"Đạt"| F["Triển khai"]:::hl
  F --> G["Giám sát, huấn luyện lại"]
  G -->|"Drift / mục tiêu mới"| A`
  }],
  "framing": [{
    title: "Từ câu hỏi kinh doanh đến loại bài toán",
    src: `flowchart TD
  A["Câu hỏi kinh doanh"] --> B{"Quy tắc hoặc SQL đủ trả lời?"}
  B -->|Có| R["Không cần ML: báo cáo / luật"]
  B -->|Không| C{"Có nhãn lịch sử?"}
  C -->|Không| U["Không giám sát: phân cụm, bất thường"]
  C -->|Có| D{"Target là gì?"}
  D -->|"Số liên tục"| H["Hồi quy"]:::hl
  D -->|"Nhãn / lớp"| P["Phân loại"]:::hl
  D -->|"Giá trị tương lai theo thời gian"| F["Dự báo chuỗi thời gian"]
  D -->|"Thứ tự ưu tiên"| K["Xếp hạng / gợi ý"]
  H --> M["Chọn metric + baseline"]
  P --> M
  F --> M
  K --> M`
  }],
  "calculus": [{
    title: "Vòng lặp gradient descent",
    src: `flowchart LR
  A["Khởi tạo tham số w"] --> B["Dự đoán ŷ = f(x, w)"]
  B --> C["Tính loss L(ŷ, y)"]
  C --> D["Tính gradient ∂L/∂w"]:::hl
  D --> E["Cập nhật w = w - lr · gradient"]
  E --> F{"Loss hội tụ?"}
  F -->|Chưa| B
  F -->|Rồi| G["Mô hình đã học"]`
  }],
  "statistics": [{
    title: "Luồng một thí nghiệm A/B",
    src: `sequenceDiagram
  participant U as Người dùng
  participant W as Website
  participant A as Dịch vụ phân nhóm
  participant L as Kho sự kiện
  participant D as Data Scientist
  D->>A: Cấu hình 50/50, MDE, cỡ mẫu cần
  U->>W: Truy cập trang sản phẩm
  W->>A: Người dùng này thuộc nhóm nào?
  A-->>W: Nhóm B (nút màu cam)
  W-->>U: Hiển thị phiên bản B
  U->>W: Bấm Mua ngay
  W->>L: Ghi sự kiện chuyển đổi kèm nhóm
  Note over L: Chờ đủ cỡ mẫu, không dừng sớm
  D->>L: Truy vấn tỉ lệ chuyển đổi mỗi nhóm
  L-->>D: A 4.20%, B 4.81%
  D->>D: Kiểm định z hai tỉ lệ, p ≈ 0.035
  D-->>W: Triển khai B cho 100% người dùng`
  }],
  "git-env": [{
    title: "Quy trình làm việc với Git và pull request",
    src: `sequenceDiagram
  participant Dev as Bạn
  participant Loc as Repo máy bạn
  participant GH as GitHub
  participant CI as CI
  participant Rev as Người review
  Dev->>Loc: git checkout -b feature/relative-paths
  Dev->>Loc: sửa code, git commit
  Loc->>GH: git push -u origin feature/relative-paths
  Dev->>GH: Mở pull request
  GH->>CI: Chạy test, lint
  CI-->>GH: Kết quả xanh
  GH->>Rev: Yêu cầu review
  Rev-->>GH: Góp ý
  Dev->>Loc: Sửa theo góp ý, commit
  Loc->>GH: git push
  Rev-->>GH: Approve
  GH->>GH: Merge vào main`
  }],
  "sql": [{
    title: "Thứ tự thực thi logic của một câu SELECT",
    src: `flowchart LR
  A["FROM / JOIN"] --> B["WHERE"]
  B --> C["GROUP BY"]
  C --> D["HAVING"]
  D --> E["SELECT"]:::hl
  E --> F["DISTINCT"]
  F --> G["ORDER BY"]
  G --> H["LIMIT"]`
  }],
  "collection": [{
    title: "Thu thập dữ liệu từ API có giới hạn tốc độ",
    src: `sequenceDiagram
  participant J as Job hằng ngày
  participant API as API đối tác
  participant S as Kho Parquet
  loop Mỗi trang kết quả
    J->>API: GET /fares?page=n (timeout 10s)
    alt 200 OK
      API-->>J: Danh sách giá vé
      J->>J: sleep 1s (tôn trọng rate limit)
    else 429 Too Many Requests
      API-->>J: Retry-After: 30
      J->>J: Chờ rồi thử lại
    end
  end
  J->>S: Ghi fares_YYYY-MM-DD.parquet (dữ liệu thô)`
  }],
  "cleaning": [{
    title: "Xử lý giá trị thiếu",
    src: `flowchart TD
  A["Cột có giá trị thiếu"] --> B{"Tỉ lệ thiếu?"}
  B -->|"Rất ít, ngẫu nhiên"| C["Xoá dòng"]
  B -->|"Vừa phải"| D{"Kiểu dữ liệu?"}
  B -->|"Rất nhiều > 60%"| E["Cân nhắc bỏ cột"]
  D -->|Số| F["Trung vị / theo nhóm / IterativeImputer"]
  D -->|"Phân loại"| G["Mode hoặc nhãn 'Không rõ'"]
  F --> H["Thêm cờ is_missing"]:::hl
  G --> H
  H --> I["Fit imputer chỉ trên tập train"]`
  }],
  "eda": [{
    title: "Các bước EDA",
    src: `flowchart LR
  A["Tổng quan: shape, kiểu, thiếu"] --> B["Đơn biến: phân phối, ngoại lệ"]
  B --> C["Hai biến: quan hệ với target"]
  C --> D["Đa biến: tương quan, tương tác"]
  D --> E["Theo thời gian"]
  E --> F["Giả thuyết cho đặc trưng"]:::hl
  C -->|"Tương quan gần 1?"| G["Nghi rò rỉ dữ liệu"]`
  }],
  "encoding": [{
    title: "Chọn cách mã hoá biến phân loại",
    src: `flowchart TD
  A["Biến phân loại"] --> B{"Có thứ tự tự nhiên?"}
  B -->|Có| O["OrdinalEncoder"]
  B -->|Không| C{"Số giá trị khác nhau?"}
  C -->|"Ít, dưới ~20"| OH["OneHotEncoder"]:::hl
  C -->|"Hàng trăm trở lên"| D{"Mô hình?"}
  D -->|"LightGBM / CatBoost"| N["Để mô hình xử lý trực tiếp"]
  D -->|"Khác"| T["TargetEncoder có cross-fitting"]`
  }],
  "imbalanced": [{
    title: "Chiến lược với dữ liệu mất cân bằng",
    src: `flowchart LR
  A["Lớp dương hiếm"] --> B["Dùng PR-AUC, recall@precision"]
  B --> C["class_weight / scale_pos_weight"]
  C --> D["Chọn ngưỡng theo chi phí"]:::hl
  D --> E{"Vẫn chưa đủ?"}
  E -->|Có| F["Resampling chỉ trên tập train"]
  E -->|Không| G["Triển khai + theo dõi"]`
  }],
  "pipelines": [{
    title: "Cùng một Pipeline cho huấn luyện và phục vụ",
    src: `sequenceDiagram
  participant T as train.py
  participant P as Pipeline
  participant CT as ColumnTransformer
  participant M as Mô hình
  participant A as API
  T->>P: fit(X_train, y_train)
  P->>CT: fit_transform(X_train)
  CT-->>P: Ma trận đặc trưng
  P->>M: fit(đặc trưng, y)
  T->>T: joblib.dump(pipeline)
  Note over A: Khởi động: joblib.load(pipeline)
  A->>P: predict(DataFrame thô 1 dòng)
  P->>CT: transform (dùng tham số đã học)
  CT-->>P: Đặc trưng cùng thứ tự cột
  P->>M: predict
  M-->>A: Giá dự đoán`
  }],
  "linear-regression": [{
    title: "Regularization: chọn Ridge hay Lasso",
    src: `flowchart TD
  A["Hồi quy tuyến tính"] --> B{"Overfit hoặc đa cộng tuyến?"}
  B -->|Không| OLS["OLS thường"]
  B -->|Có| C{"Muốn tự loại đặc trưng?"}
  C -->|Có| L["Lasso (L1)"]:::hl
  C -->|Không| R["Ridge (L2)"]:::hl
  C -->|"Nhiều đặc trưng tương quan"| E["ElasticNet"]`
  }],
  "decision-tree": [{
    title: "Ví dụ cây quyết định dự đoán giá vé",
    src: `flowchart TD
  A{"Total_Stops = 0?"} -->|Có| B{"Airline = Jet Airways Business?"}
  A -->|Không| C{"Duration > 10 giờ?"}
  B -->|Có| B1["~ 55.000"]
  B -->|Không| B2["~ 5.000"]:::hl
  C -->|Có| C1["~ 12.500"]
  C -->|Không| C2["~ 9.800"]`
  }],
  "random-forest": [{
    title: "Bagging: nhiều cây độc lập rồi lấy trung bình",
    src: `flowchart LR
  D["Dữ liệu train"] --> B1["Mẫu bootstrap 1"]
  D --> B2["Mẫu bootstrap 2"]
  D --> B3["Mẫu bootstrap n"]
  B1 --> T1["Cây 1 (tập con đặc trưng)"]
  B2 --> T2["Cây 2"]
  B3 --> T3["Cây n"]
  T1 --> AVG["Trung bình / bỏ phiếu"]:::hl
  T2 --> AVG
  T3 --> AVG
  AVG --> Y["Dự đoán"]`
  }],
  "boosting": [{
    title: "Boosting: mỗi cây mới sửa phần dư của các cây trước",
    src: `flowchart LR
  F0["Dự đoán ban đầu = trung bình y"] --> R1["Phần dư r1 = y - F0"]
  R1 --> T1["Cây 1 học r1"]
  T1 --> F1["F1 = F0 + lr · cây 1"]
  F1 --> R2["Phần dư r2 = y - F1"]
  R2 --> T2["Cây 2 học r2"]
  T2 --> F2["F2 = F1 + lr · cây 2"]
  F2 --> ES{"Loss validation còn giảm?"}
  ES -->|Có| R2
  ES -->|"Không (early stopping)"| FM["Mô hình cuối"]:::hl`
  }],
  "validation": [{
    title: "Chia dữ liệu và cross-validation",
    src: `flowchart TD
  A["Toàn bộ dữ liệu"] --> T["Tập test (khoá lại, dùng 1 lần)"]
  A --> TV["Train + validation"]
  TV --> K{"Cấu trúc dữ liệu?"}
  K -->|"Độc lập"| KF["KFold / StratifiedKFold"]
  K -->|"Theo nhóm (khách, bệnh nhân)"| GK["GroupKFold"]
  K -->|"Theo thời gian"| TS["TimeSeriesSplit: train quá khứ, test tương lai"]:::hl
  KF --> S["Chọn mô hình + tham số"]
  GK --> S
  TS --> S
  S --> F["Huấn luyện lại trên train + validation"]
  F --> T`
  }],
  "bias-variance": [{
    title: "Chẩn đoán underfit và overfit",
    src: `flowchart TD
  A["So sánh sai số train và validation"] --> B{"Sai số train cao?"}
  B -->|Có| U["Underfit: thêm đặc trưng, mô hình phức tạp hơn"]
  B -->|Không| C{"Validation kém xa train?"}
  C -->|Có| O["Overfit: thêm dữ liệu, regularization, early stopping"]:::hl
  C -->|Không| G["Cân bằng tốt"]`
  }],
  "tuning": [{
    title: "Tối ưu Bayesian với Optuna",
    src: `sequenceDiagram
  participant S as Optuna Study
  participant O as objective(trial)
  participant CV as Cross-validation
  loop n_trials lần
    S->>O: Đề xuất tham số (TPE dựa trên lịch sử)
    O->>CV: Huấn luyện + đánh giá 3 fold
    CV-->>O: MAE trung bình
    O-->>S: Trả điểm
    S->>S: Cập nhật mô hình xác suất, cắt thử kém
  end
  S-->>S: best_params → huấn luyện và lưu mô hình này`
  }],
  "kmeans": [{
    title: "Thuật toán K-Means",
    src: `flowchart LR
  A["Chuẩn hoá dữ liệu"] --> B["Chọn K tâm ban đầu (k-means++)"]
  B --> C["Gán mỗi điểm cho tâm gần nhất"]
  C --> D["Cập nhật tâm = trung bình cụm"]:::hl
  D --> E{"Tâm còn thay đổi?"}
  E -->|Có| C
  E -->|Không| F["Diễn giải từng cụm"]`
  }],
  "recsys": [{
    title: "Hệ gợi ý hai tầng",
    src: `sequenceDiagram
  participant U as Người dùng
  participant APP as Ứng dụng
  participant R as Truy xuất (two-tower + ANN)
  participant K as Xếp hạng (GBDT / deep)
  participant F as Bộ lọc nghiệp vụ
  U->>APP: Mở trang chủ
  APP->>R: Vector người dùng
  R-->>APP: 500 ứng viên gần nhất
  APP->>K: Ứng viên + đặc trưng ngữ cảnh
  K-->>APP: Điểm xác suất mua
  APP->>F: Lọc hết hàng, đa dạng hoá
  F-->>APP: Top 20
  APP-->>U: Danh sách gợi ý
  U->>APP: Click / mua (dữ liệu huấn luyện lại)`
  }],
  "ts-ml": [{
    title: "Backtesting với cửa sổ mở rộng",
    src: `flowchart LR
  A["Train đến T1"] --> A2["Dự báo T1 → T1+h"]
  B["Train đến T2"] --> B2["Dự báo T2 → T2+h"]
  C["Train đến T3"] --> C2["Dự báo T3 → T3+h"]
  A2 --> M["Trung bình sai số các lần"]:::hl
  B2 --> M
  C2 --> M`
  }],
  "nn-basics": [{
    title: "Một bước huấn luyện trong PyTorch",
    src: `sequenceDiagram
  participant DL as DataLoader
  participant M as Model
  participant L as Loss
  participant O as Optimizer
  loop Mỗi batch
    DL->>M: xb (batch đầu vào)
    M->>M: Forward: tính logits
    M->>L: logits, yb
    L-->>L: loss = CrossEntropy
    O->>O: zero_grad()
    L->>M: loss.backward() tính gradient
    O->>M: step() cập nhật trọng số
  end
  Note over M: model.eval() + no_grad() khi đánh giá`
  }],
  "cnn": [{
    title: "Transfer learning cho phân loại ảnh",
    src: `flowchart LR
  I["Ảnh bo mạch"] --> P["Tiền xử lý như lúc pretrain"]
  P --> B["Backbone ResNet (đóng băng)"]
  B --> F["Vector đặc trưng 2048 chiều"]
  F --> H["Lớp mới: Linear 3 lớp"]:::hl
  H --> O["OK / trầy xước / nứt"]`
  }],
  "transformer": [{
    title: "Self-attention cho một token",
    src: `flowchart LR
  X["Embedding các token"] --> Q["Query = X·Wq"]
  X --> K["Key = X·Wk"]
  X --> V["Value = X·Wv"]
  Q --> S["Điểm = Q·Kᵀ / √d"]
  K --> S
  S --> SM["softmax → trọng số"]:::hl
  SM --> O["Tổng có trọng số của V"]
  V --> O
  O --> FF["Feed-forward + residual"]`
  }],
  "llm-prompting": [{
    title: "Tool use: LLM gọi hàm của ứng dụng",
    src: `sequenceDiagram
  participant U as Người dùng
  participant APP as Ứng dụng
  participant LLM as LLM
  participant DB as Database
  U->>APP: Đơn hàng 1234 đang ở đâu?
  APP->>LLM: Câu hỏi + mô tả tool tra_don_hang
  LLM-->>APP: tool_use tra_don_hang(id=1234)
  APP->>DB: SELECT trạng thái WHERE id=1234
  DB-->>APP: Đang giao, dự kiến 27/09
  APP->>LLM: tool_result
  LLM-->>APP: Câu trả lời tự nhiên
  APP-->>U: Đơn 1234 đang giao, dự kiến 27/09`
  }],
  "rag": [
    {
      title: "Giai đoạn đánh chỉ mục (chạy khi tài liệu thay đổi)",
      src: `flowchart LR
  D["Tài liệu PDF, wiki, chính sách"] --> C["Chia đoạn 500–1000 token, có chồng lấn"]
  C --> E["Tạo embedding"]
  C --> BM["Chỉ mục từ khoá BM25"]
  E --> V[("Vector DB")]:::hl
  C --> MD["Metadata: nguồn, quyền, ngày"]
  MD --> V`
    },
    {
      title: "Giai đoạn trả lời câu hỏi",
      src: `sequenceDiagram
  participant U as Nhân viên
  participant APP as Ứng dụng RAG
  participant EMB as Mô hình embedding
  participant VDB as Vector DB + BM25
  participant RR as Reranker
  participant LLM as LLM
  U->>APP: Phép năm có cộng dồn không?
  APP->>EMB: Embedding câu hỏi
  EMB-->>APP: Vector truy vấn
  APP->>VDB: Hybrid search top 20 (lọc theo quyền)
  VDB-->>APP: 20 đoạn ứng viên
  APP->>RR: Xếp hạng lại
  RR-->>APP: 4 đoạn liên quan nhất
  APP->>LLM: Prompt: chỉ dựa vào tài liệu, trích dẫn [số]
  LLM-->>APP: Câu trả lời + [2][4]
  APP-->>U: Trả lời kèm liên kết điều khoản`
    }
  ],
  "finetuning": [{
    title: "Nên prompt, RAG hay fine-tune?",
    src: `flowchart TD
  A["Vấn đề với LLM"] --> B{"Thiếu kiến thức / dữ liệu mới?"}
  B -->|Có| RAG["RAG"]:::hl
  B -->|Không| C{"Prompt tốt + few-shot đã đủ?"}
  C -->|Có| P["Giữ prompt engineering"]
  C -->|Không| D{"Cần định dạng / giọng văn ổn định, khối lượng lớn?"}
  D -->|Có| FT["Fine-tune LoRA"]:::hl
  D -->|Không| E["Thử mô hình mạnh hơn"]
  FT --> H["Thường kết hợp: fine-tune hành vi + RAG kiến thức"]
  RAG --> H`
  }],
  "agents-eval": [{
    title: "Vòng lặp agent text-to-SQL",
    src: `sequenceDiagram
  participant U as Quản lý
  participant AG as Agent (LLM)
  participant SC as Tool đọc schema
  participant SQL as Tool run_sql (chỉ đọc)
  U->>AG: Doanh thu tháng 8 theo miền so với cùng kỳ?
  AG->>SC: Lấy schema bảng bán hàng
  SC-->>AG: fct_orders, dim_region
  AG->>SQL: SELECT ... GROUP BY region
  SQL-->>AG: Lỗi: cột order_month không tồn tại
  AG->>SQL: Sửa truy vấn dùng date_trunc
  SQL-->>AG: Bảng kết quả 3 miền
  AG-->>U: Bảng + nhận xét + SQL đã chạy
  Note over AG: Mỗi thay đổi prompt chạy lại bộ 200 câu chuẩn`
  }],
  "serving-api": [{
    title: "Một request dự đoán giá vé qua FastAPI",
    src: `sequenceDiagram
  participant C as Trình duyệt / app
  participant API as FastAPI
  participant PY as Pydantic
  participant P as Pipeline đã load
  participant LOG as Log dự đoán
  C->>API: POST /predict {airline, stops, dep_time, ...}
  API->>PY: Kiểm tra kiểu, stops trong 0..4
  alt Dữ liệu sai
    PY-->>C: 422 kèm thông báo lỗi
  else Hợp lệ
    API->>API: Tính Duration_min = arrival - dep
    API->>P: predict(DataFrame 1 dòng)
    P-->>API: 5.230
    API->>LOG: Ghi đầu vào + dự đoán + thời gian
    API-->>C: {"price": 5230}
  end`
  }],
  "docker": [{
    title: "Từ code đến dịch vụ chạy trên cloud",
    src: `flowchart LR
  A["Code + requirements + mô hình"] --> B["docker build"]
  B --> C["Image"]
  C --> D["docker push → Registry"]
  D --> E["Cloud Run / Kubernetes"]:::hl
  E --> F["HTTPS endpoint"]
  E -->|"Tải tăng"| G["Tự mở rộng số container"]`
  }],
  "tracking": [{
    title: "Theo dõi thí nghiệm và đưa mô hình vào registry",
    src: `sequenceDiagram
  participant T as train.py
  participant ML as MLflow Tracking
  participant REG as Model Registry
  participant API as Dịch vụ dự đoán
  T->>ML: start_run, log_params
  T->>ML: log_metric(val_mae)
  T->>ML: log_model (Pipeline)
  ML->>REG: Đăng ký flight-fare phiên bản 7
  Note over REG: So sánh với phiên bản đang chạy
  REG->>REG: Gắn alias champion cho v7
  API->>REG: Tải models:/flight-fare@champion
  REG-->>API: Pipeline v7`
  }],
  "pipelines-cicd": [{
    title: "Huấn luyện lại tự động và triển khai an toàn",
    src: `flowchart LR
  S["Lịch / dữ liệu mới"] --> V["Kiểm tra chất lượng dữ liệu"]
  V -->|Lỗi| X["Dừng + cảnh báo"]
  V -->|OK| T["Huấn luyện"]
  T --> E{"Tốt hơn mô hình hiện tại?"}
  E -->|Không| K["Giữ mô hình cũ"]
  E -->|Có| SH["Shadow 1 tuần"]
  SH --> CA["Canary 5% lưu lượng"]
  CA --> P["100% lưu lượng"]:::hl
  CA -->|"Chỉ số xấu"| RB["Rollback"]`
  }],
  "monitoring": [{
    title: "Vòng giám sát mô hình",
    src: `flowchart TD
  P["Dự đoán trong production"] --> L["Log đầu vào + dự đoán"]
  L --> D1["Drift đầu vào: PSI, KS test"]
  L --> J["Nối với nhãn thật khi có"]
  J --> D2["Hiệu năng: MAE theo tuần"]
  D1 --> A{"Vượt ngưỡng?"}
  D2 --> A
  A -->|Không| P
  A -->|Có| I["Điều tra: lỗi pipeline hay thay đổi thật?"]:::hl
  I -->|"Lỗi dữ liệu"| FX["Sửa pipeline"]
  I -->|"Thay đổi thật"| RT["Huấn luyện lại"]
  RT --> P`
  }],
  "spark": [{
    title: "Kiến trúc thực thi Spark",
    src: `flowchart LR
  DR["Driver: lập kế hoạch, tối ưu"] --> E1["Executor 1: partition 1..k"]
  DR --> E2["Executor 2"]
  DR --> E3["Executor n"]
  E1 <-->|"Shuffle khi groupBy / join"| E2
  E2 <--> E3
  E1 --> O[("Parquet trên S3")]:::hl
  E2 --> O
  E3 --> O`
  }],
  "warehouse": [{
    title: "Luồng dữ liệu ELT trong doanh nghiệp",
    src: `flowchart LR
  W["Website"] --> I["Airbyte / Fivetran"]
  M["App"] --> I
  POS["POS cửa hàng"] --> I
  I --> RAW[("Raw / Lake")]
  RAW --> DBT["dbt: staging → marts"]:::hl
  DBT --> FACT["fct_orders, dim_customers"]
  FACT --> BI["Dashboard BI"]
  FACT --> ML["Đặc trưng cho ML"]`
  }],
  "case-current": [{
    title: "Luồng hiện tại của dự án Flight Fare trong repo",
    src: `flowchart LR
  X["Data_Train.xlsx"] --> NB["flight_price.ipynb: làm sạch, tạo đặc trưng"]
  NB --> RF["RandomForestRegressor"]
  RF --> PKL[("flight_rf.pkl")]
  PKL --> APP["app.py (Flask)"]:::hl
  H["templates/home.html"] --> APP
  U["Người dùng nhập form"] --> APP
  APP --> OUT["Giá dự đoán hiển thị trên trang"]`
  }],
  "case-issues": [{
    title: "Một request hiện tại và các điểm lỗi",
    src: `sequenceDiagram
  participant U as Người dùng
  participant F as Flask app.py
  participant M as flight_rf.pkl
  Note over F,M: Load từ D:/... chỉ chạy trên máy tác giả
  U->>F: POST /predict (22:20 → 01:10)
  F->>F: dur_hour = abs(1 - 22) = 21 (sai, đúng là 2h50)
  F->>F: If/elif tự tạo 30 cột one-hot
  F->>M: predict([[...30 giá trị...]])
  Note over M: reg_rf chưa tuning
  M-->>F: Giá cao bất thường
  F-->>U: Hiển thị kết quả`
  }],
  "case-upgrade": [{
    title: "Kiến trúc mục tiêu sau khi nâng cấp",
    src: `flowchart LR
  D["data/raw"] --> FE["src/features.py: Pipeline"]
  FE --> TR["src/train.py: Optuna + MLflow"]
  TR --> REG[("Model registry")]
  REG --> API["src/api.py: FastAPI"]:::hl
  API --> DK["Docker → Cloud Run"]
  CI["GitHub Actions: pytest"] --> DK
  API --> LOG["Log dự đoán"]
  LOG --> EV["Evidently: báo cáo drift"]
  EV -->|"Drift"| TR`
  }]
};
