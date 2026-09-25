/* Các nhánh nghề AI và dữ liệu. Tổng hợp từ báo cáo reports/Lộ trình các nhánh ngành AI.md (9/2026).
   Nhãn độ tin cậy giữ nguyên theo báo cáo: (qua snippet), (vendor/blog), (số liệu cũ), (chưa kiểm chứng).
   Cây kỹ năng, dự án mốc và thời lượng là đề xuất tổng hợp, không phải số liệu đo lường. */
window.ROADMAP_FAMILIES = {
  analytics: { name: "Họ phân tích", hint: "Thích trả lời câu hỏi kinh doanh và thuyết phục người khác", track: "data" },
  infra: { name: "Họ hạ tầng", hint: "Thích hệ thống chạy đúng, rẻ, bền", track: "ops" },
  product: { name: "Họ sản phẩm AI", hint: "Thích xây tính năng AI cho người dùng cuối", track: "dl" },
  research: { name: "Nghiên cứu", hint: "Thích tìm phương pháp mới, chịu được con đường học vị dài", track: "ml" }
};

window.ROADMAP_BRANCHES = [
  {
    id: "da", name: "Data Analyst", family: "analytics",
    question: "Chuyện gì đã xảy ra, vì sao?", deliver: "Dashboard, phân tích ad-hoc, memo", measure: "Quyết định đúng và kịp thời", neighbor: "Analytics Engineer, Product DS",
    math: 1, swe: 1, degree: "Không cần", vn: "Nhiều tin tuyển nhất, nhưng dễ bị AI thay thế nhất. Glassdoor: DA ở TP.HCM trung bình khoảng 21,8 triệu đồng/tháng, P25–P75 từ 15,1 đến 32,4 triệu (tự báo cáo, mẫu nhỏ).",
    summary: "Trả lời câu hỏi kinh doanh bằng SQL, dashboard và memo ngắn, dựa trên dữ liệu đã được chuẩn bị. SQL là bộ lọc cứng, hiểu grain là kỹ năng sống còn.",
    daily: "Viết SQL, dựng và bảo trì dashboard, định nghĩa KPI, trả lời câu hỏi \"vì sao số này khác số kia\", viết memo cho người không chuyên.",
    levels: [
      ["0 – Nền chung", "Bảng tính (pivot, lookup), SQL I (SELECT/JOIN/GROUP BY, hiểu grain), thống kê mô tả, Python và pandas cơ bản, diễn đạt câu hỏi thành metric", "Trả lời 15 câu hỏi kinh doanh bằng SQL trên một bộ dữ liệu công khai"],
      ["1 – Analyst lõi", "SQL II (window, CTE, ngày giờ, NULL, khử trùng lặp), một công cụ BI (Power BI/Tableau/Looker), metric tỷ lệ, cohort, funnel, retention, memo một trang", "Dashboard thương mại điện tử (ví dụ dữ liệu Olist) kèm từ điển KPI; phân tích cohort retention bằng SQL"],
      ["2 – Analyst vững", "Kiểm tra Simpson's paradox theo segment, trình bày độ bất định, kiến thức nghiệp vụ một ngành (ngân hàng, TMĐT, viễn thông)", "Phân tích funnel có kiểm tra Simpson; tự kiểm toán một báo cáo SQL do AI viết có cài sẵn ít nhất 3 lỗi"]
    ],
    order: "SQL trước công cụ BI, thống kê trước ML.",
    resources: [["Google Data Analytics Certificate (9 khoá, hơn 180 giờ)", "https://www.coursera.org/professional-certificates/google-data-analytics"], ["Kaggle Learn — SQL", "https://www.kaggle.com/learn/intro-to-sql"], ["OpenIntro Statistics (miễn phí)", "https://www.openintro.org/book/os/"]],
    stable: ["SQL", "Bảng tính", "Một công cụ BI", "pandas"],
    churn: ["Agent phân tích trong notebook", "Hàm AI gọi LLM trong SQL"],
    cases: [
      ["Benchmark Spider 2.0 (ICLR 2025) dùng workflow doanh nghiệp thật: o1-preview chỉ giải được 21,3%, GPT-4o 10,1%, trong khi GPT-4o đạt 86,6% trên Spider 1.0 cũ. \"AI viết SQL\" chỉ đáng tin khi có người mã hoá sẵn định nghĩa nghiệp vụ (số liệu đầu 2025).", "https://proceedings.iclr.cc/paper_files/paper/2025/file/46c10f6c8ea5aa6f267bcdabcb123f97-Paper-Conference.pdf"]
    ],
    critique: [
      ["Join bảng một dòng mỗi đơn với bảng nhiều dòng mỗi đơn (order_items, payments) rồi SUM doanh thu", "So COUNT(*) với COUNT(DISTINCT key) trước và sau join; ghi rõ grain"],
      ["Sai mẫu số; nhầm tỷ lệ của trung bình với trung bình của tỷ lệ", "Tự viết định nghĩa metric trước rồi đối chiếu"],
      ["Ngữ nghĩa NULL: COUNT(col) khác COUNT(*); NOT IN gặp NULL trả rỗng; WHERE trên bảng phải biến LEFT JOIN thành INNER JOIN", "Test với dữ liệu nhỏ có NULL"],
      ["Lẫn múi giờ UTC và Asia/Ho_Chi_Minh; kỳ hiện tại chưa đủ dữ liệu; BETWEEN với timestamp", "Đối soát tổng theo ngày với một nguồn đã biết"],
      ["Tự đặt định nghĩa \"active user\" thay vì dùng metric đã quản trị", "Bắt AI dùng metric có sẵn trong semantic layer"],
      ["Quên lọc tài khoản test, đơn hoàn tiền, đơn huỷ", "Liệt kê sẵn bộ lọc bắt buộc trong đặc tả"],
      ["Xu hướng tổng đảo chiều khi tách segment (Simpson)", "Luôn tách theo thiết bị, kênh, vùng"]
    ],
    core: ["framing", "probability", "statistics", "python-core", "pandas", "viz", "git-env", "sql", "cleaning", "eda", "metrics"],
    useful: ["crisp-dm", "collection", "warehouse", "ts-basics", "kmeans", "llm-prompting"]
  },
  {
    id: "ae", name: "Analytics Engineer", family: "analytics",
    question: "Mọi người có tin và dùng lại được dữ liệu này không?", deliver: "Model dbt có test và tài liệu, metric trong semantic layer", measure: "Độ tin cậy, độ phủ test, số người tự phục vụ", neighbor: "Data Analyst, Data Engineer",
    math: 1, swe: 2, degree: "Không cần", vn: "Chưa có số liệu lương Việt Nam đã kiểm chứng. Nhóm nghiên cứu nhận định đây là nhánh có đòn bẩy lớn nhất cho mục tiêu \"cầm lái AI\" trong họ phân tích.",
    summary: "Làm chữ \"T\" trong ELT: biến bảng thô thành model sạch, có test và tài liệu. Họ viết ra ngữ cảnh nghiệp vụ giúp AI viết SQL đúng.",
    daily: "Viết và review model dbt, thêm test, xử lý khi schema nguồn đổi, định nghĩa metric một lần để dùng mọi nơi, tối ưu chi phí warehouse.",
    levels: [
      ["1", "Nền của Data Analyst, cộng Git và pull request", "Đưa một bộ truy vấn phân tích vào repo Git có review"],
      ["2", "Dimensional modeling (Kimball: quy trình → grain → dimension → fact), star schema, SCD 1/2/3, surrogate key; dbt: source, staging → intermediate → marts, test, docs, macro", "Dự án dbt trên DuckDB/BigQuery với ít nhất 20 test và trang tài liệu"],
      ["3", "Incremental model, snapshot (SCD2), slim CI bằng GitHub Actions, semantic layer (MetricFlow/Cube/LookML), nhận biết chi phí", "Metric trong semantic layer được BI dùng; post-mortem một sự cố fan-out do khoá trùng được cài sẵn"]
    ],
    order: "SQL và grain → Git → Kimball → dbt → test và CI → semantic layer.",
    resources: [["dbt Learn — dbt Fundamentals", "https://learn.getdbt.com/"], ["Coursera — Analytics Engineering with dbt", "https://www.coursera.org/specializations/analytics-engineering-with-dbt"], ["The Data Warehouse Toolkit (Kimball)", "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/"]],
    stable: ["SQL", "Mô hình Kimball", "dbt", "Git", "Một warehouse"],
    churn: ["Sản phẩm semantic layer", "Công cụ data observability", "AI trong IDE dữ liệu"],
    cases: [
      ["Airbnb Minerva: hơn 12.000 metric và 4.000 dimension theo nguyên tắc \"định nghĩa một lần, dùng mọi nơi\" (2021).", "https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70"],
      ["Benchmark mở của Cube: thêm khoảng 4 KB mô tả semantic layer làm độ chính xác text-to-SQL tăng 17–23 điểm phần trăm (vendor).", "https://github.com/cubedevinc/semantic-layer-benchmark"],
      ["Báo cáo dbt 2026: 72% đội ưu tiên AI viết code, chỉ 24% ưu tiên AI cho kiểm thử và giám sát; tỷ lệ coi niềm tin vào dữ liệu là quan trọng tăng từ 66% lên 83%.", "https://www.hpcwire.com/bigdatawire/2026/04/15/dbt-labs-report-72-of-data-teams-use-ai-71-fear-bad-data-data-systems-cant-keep-up/"],
      ["Fivetran và dbt Labs hoàn tất sáp nhập ngày 1/6/2026, doanh thu định kỳ gần 600 triệu USD/năm, hơn 80.000 đội dữ liệu.", "https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents"]
    ],
    critique: [
      ["Không khai báo grain; mart bị nhân dòng", "Test unique trên khoá chính của mọi model"],
      ["Join fact với dimension SCD2 không có điều kiện thời điểm", "Bắt buộc valid_from <= event_ts < valid_to"],
      ["Incremental dùng now() thay mốc logic; không có lookback cho dữ liệu đến muộn", "Chạy lại cùng ngày hai lần, so kết quả"],
      ["SELECT * từ nguồn vào mart", "Khoá schema bằng dbt contracts"],
      ["Định nghĩa lại metric ngay trong model", "Metric chỉ định nghĩa ở một nơi"],
      ["Full refresh bảng lớn theo lịch", "Ước tính số byte quét trước khi merge"]
    ],
    core: ["framing", "python-core", "pandas", "git-env", "sql", "cleaning", "eda", "metrics", "statistics", "warehouse", "pipelines-cicd"],
    useful: ["viz", "collection", "spark", "monitoring", "llm-prompting"]
  },
  {
    id: "pds", name: "Data Scientist (product/decision)", family: "analytics",
    question: "Nên làm gì, và việc đó có hiệu quả thật (nhân quả) không?", deliver: "Thiết kế và kết quả thí nghiệm, phân tích nhân quả, định nghĩa metric", measure: "Mức tăng (lift) được chứng minh", neighbor: "Analyst, nhà kinh tế học",
    math: 3, swe: 1, degree: "Thường có thạc sĩ nhưng không bắt buộc", vn: "Chưa tách được số liệu riêng; nhóm DA/DS theo ITviec khoảng 40,65 triệu đồng/tháng (qua snippet, chưa rõ trung vị hay theo kinh nghiệm).",
    summary: "Thiết kế metric, thí nghiệm A/B và suy luận nhân quả để ra quyết định sản phẩm. Đây là nơi AI sai âm thầm nhất, và cũng là kỹ năng kiểm chứng dùng được cho mọi nhánh.",
    daily: "Viết tài liệu thiết kế thí nghiệm, đọc kết quả A/B, phân tích nhân quả khi không random hoá được, viết memo chiến lược.",
    levels: [
      ["1", "Nền của Data Analyst, cộng kiểm định giả thuyết, khoảng tin cậy, bootstrap", "Phân tích A/B có tính power trước khi chạy"],
      ["2", "Thí nghiệm: đơn vị random hoá, guardrail, kiểm tra SRM, novelty effect, CUPED, rủi ro peeking, so sánh bội", "Phân tích A/B có kiểm tra SRM và CUPED"],
      ["3", "Nhân quả khi không random hoá được: DiD, regression discontinuity, biến công cụ, synthetic control, propensity score; cây metric", "DiD trên dữ liệu chính sách công khai; cây metric cho một ứng dụng kiểu Grab/Shopee"]
    ],
    order: "Học nhánh thống kê và thí nghiệm TRƯỚC ML: các khái niệm đánh giá ở đây sau này dùng để kiểm chứng mô hình.",
    resources: [["Trustworthy Online Controlled Experiments (Kohavi, Tang, Xu)", "https://experimentguide.com/"], ["Causal Inference: The Mixtape (miễn phí)", "https://mixtape.scunning.com/"], ["Causal Inference for the Brave and True (miễn phí)", "https://matheusfacure.github.io/python-causality-handbook/"]],
    stable: ["SQL", "Python/R", "statsmodels", "Nền tảng thí nghiệm nội bộ"],
    churn: ["Notebook tích hợp AI", "Thư viện causal ML", "SaaS experimentation"],
    cases: [
      ["Bing: một ý tưởng kéo dài tiêu đề quảng cáo nằm trong backlog nhiều tháng, khi A/B test làm doanh thu tăng 12%, hơn 100 triệu USD/năm.", "https://hbr.org/2017/09/the-surprising-power-of-online-experiments"],
      ["Microsoft: khoảng 6% thí nghiệm có sample ratio mismatch (3% đến 13–14% tuỳ sản phẩm) trên hơn 10.000 thí nghiệm (KDD 2019).", "https://www.microsoft.com/en-us/research/publication/diagnosing-sample-ratio-mismatch-in-online-controlled-experiments-a-taxonomy-and-rules-of-thumb-for-practitioners/"],
      ["Tại Microsoft chỉ khoảng một phần ba thí nghiệm được thiết kế tốt thực sự cải thiện metric đích (số liệu cũ, 2009).", "https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf"],
      ["Netflix dùng DiD, double ML, A/B Bayes và công cụ quasi-experiment khi không A/B được.", "https://netflixtechblog.com/a-survey-of-causal-inference-applications-at-netflix-b62d25175e6f"]
    ],
    critique: [
      ["Đọc kết quả mà không kiểm tra SRM", "Kiểm định chi-square tỷ lệ chia trước khi xem kết quả"],
      ["Xem p-value nhiều lần rồi dừng khi \"có ý nghĩa\"", "Cố định thời lượng hoặc dùng phương pháp sequential đúng cách"],
      ["Thử nhiều metric/segment không hiệu chỉnh; \"thắng\" ở segment chọn sau khi thấy kết quả", "Khai báo trước metric chính"],
      ["Random hoá theo user nhưng tính phương sai theo session", "Delta method hoặc sai số chuẩn theo cụm"],
      ["Kết luận \"không khác biệt\" từ test thiếu power", "Tính MDE và power trước khi chạy"],
      ["Biến tương quan quan sát thành \"tác động\"; kiểm soát biến xảy ra sau can thiệp", "Hỏi: cơ chế random hoá hoặc giả định nhận dạng ở đâu?"]
    ],
    core: ["crisp-dm", "framing", "probability", "statistics", "python-core", "pandas", "viz", "sql", "cleaning", "eda", "metrics", "validation", "linear-regression", "logistic-regression"],
    useful: ["explainability", "ts-basics", "kmeans", "boosting", "warehouse", "git-env"]
  },
  {
    id: "mlds", name: "Data Scientist (ML)", family: "analytics",
    question: "Có dự đoán hoặc tối ưu tự động được không?", deliver: "Mô hình, feature, đánh giá offline/online", measure: "Lift online, chi phí sai số", neighbor: "ML Engineer",
    math: 2, swe: 2, degree: "Không bắt buộc", vn: "BLS Mỹ dự báo việc làm data scientist tăng 34% giai đoạn 2024–2034, lương trung vị 112.590 USD (qua snippet). Lương DS ở Mỹ theo phân tích thứ cấp Stack Overflow 2025 giảm khoảng 8,8% (chưa kiểm chứng).",
    summary: "Xây mô hình dự đoán hoặc dự báo đưa vào sản phẩm; gần ML Engineer nhưng thường ít chịu trách nhiệm vận hành production. Lộ trình 14 giai đoạn của repo này bám sát nhánh này.",
    daily: "Làm feature, huấn luyện và so sánh mô hình, phân tích lỗi theo lát cắt, lên kế hoạch A/B cho mô hình.",
    levels: [
      ["1", "Nền của Data Analyst, cộng bias/variance, cross-validation, leakage", "Kiểm toán leakage cho dự án Flight Fare của repo"],
      ["2", "Hồi quy tuyến tính/logistic → cây và gradient boosting → mạng nơ-ron khi cần; calibration; chọn metric theo chi phí sai số", "Dự đoán churn có kiểm toán leakage và ngưỡng theo chi phí"],
      ["3", "Dự báo: seasonal naive, ETS/ARIMA, Prophet/Orbit, GBM toàn cục, reconciliation phân cấp, backtest cuộn", "Dự báo bán hàng phân cấp kiểu M5, backtest so với seasonal naive"]
    ],
    order: "Giai đoạn 0 → 8 của lộ trình này, sau đó giai đoạn 11 để đưa mô hình vào vận hành.",
    resources: [["An Introduction to Statistical Learning (miễn phí)", "https://www.statlearning.com/"], ["Forecasting: Principles and Practice (miễn phí)", "https://otexts.com/fpp3/"], ["scikit-learn — Common pitfalls", "https://scikit-learn.org/stable/common_pitfalls.html"]],
    stable: ["SQL", "Python", "scikit-learn", "XGBoost/LightGBM", "statsmodels"],
    churn: ["Notebook tích hợp AI", "AutoML", "Thư viện dự báo mới"],
    cases: [
      ["Cuộc thi M5 (Walmart): dự báo 42.840 chuỗi thời gian phân cấp; phần lớn đội top dùng LightGBM.", "https://www.sciencedirect.com/science/article/pii/S0169207021001874"],
      ["Uber dùng Orbit (dự báo Bayes) cho kế hoạch ngân sách marketing và dung lượng hạ tầng (2021).", "https://www.uber.com/us/en/blog/orbit/"],
      ["Booking.com giả định chỉ khoảng 10% thí nghiệm thành công với mức tăng trung bình khoảng 1% (số liệu cũ, 2017; nguồn thứ cấp).", "https://arxiv.org/pdf/1710.08217"]
    ],
    critique: [
      ["Leakage từ feature suy ra từ target; chia ngẫu nhiên chuỗi thời gian; fit tiền xử lý trước khi chia", "Chia theo thời gian, Pipeline bên trong CV"],
      ["Không có baseline; accuracy cho dữ liệu mất cân bằng; MAPE khi giá trị thực gần 0", "Luôn so với baseline naive; chọn metric theo chi phí sai số"],
      ["Chọn feature (feature importance) trên toàn bộ dữ liệu trước khi chia, như notebook Flight Fare", "Chỉ fit trên train"],
      ["Báo cáo một lần chia duy nhất", "Báo cáo độ dao động qua nhiều fold hoặc seed"]
    ],
    core: ["crisp-dm", "framing", "linear-algebra", "calculus", "probability", "statistics", "python-core", "numpy", "pandas", "viz", "git-env", "sql", "cleaning", "eda", "encoding", "scaling", "feature-selection", "imbalanced", "pipelines", "linear-regression", "logistic-regression", "decision-tree", "random-forest", "boosting", "metrics", "validation", "bias-variance", "tuning", "explainability", "kmeans", "ts-basics", "ts-ml", "case-current", "case-issues", "case-upgrade"],
    useful: ["knn", "svm", "naive-bayes", "pca", "dbscan", "anomaly", "recsys", "nn-basics", "tracking", "serving-api"]
  },
  {
    id: "de", name: "Data Engineer", family: "infra",
    question: "Dữ liệu có đến đúng, đủ, kịp, rẻ không?", deliver: "Pipeline ingest/transform/serve, lakehouse, streaming", measure: "Độ tươi, độ đúng, chi phí, uptime", neighbor: "Analytics Engineer, ML Engineer",
    math: 1, swe: 3, degree: "Không cần", vn: "ITviec 2025–26: trung vị 41,3 triệu đồng/tháng, 56,9 triệu ở mức 3–4 năm; tin tuyển tăng khoảng 38% so với năm trước, trong khi IT chung tăng khoảng 12% (qua snippet).",
    summary: "Phụ trách vòng đời dữ liệu từ nguồn đến phục vụ, nay gồm cả pipeline cho RAG. Giá trị nằm ở idempotency, test và độ tin cậy, không còn ở việc viết code pipeline (AI đã viết nhanh).",
    daily: "Xử lý DAG lỗi hoặc chậm, cảnh báo chất lượng dữ liệu, thêm connector, xử lý thay đổi schema, backfill, tối ưu partition và chi phí, quản lý quyền và PII.",
    levels: [
      ["Nền (~2–3 tháng)", "SQL (window, CTE, NULL, EXPLAIN), mô hình hoá (3NF, Kimball, SCD), Python và pytest, Linux/shell/Git, Docker", "Star schema trên DuckDB kèm 15 truy vấn đúng grain, không fan-out"],
      ["Lõi (~3–4 tháng)", "ETL/ELT, batch và streaming, CDC; orchestration (idempotency, retry, backfill); warehouse cột; dbt; Parquet/Avro; một cloud, IAM, Terraform", "ELT API → Parquet → warehouse → dbt bằng Airflow 3: chạy lại một ngày hai lần ra cùng kết quả; backfill 30 ngày"],
      ["Nâng cao (~4–6 tháng+)", "Lakehouse (Iceberg/Delta/Hudi), Spark (shuffle, skew), Kafka/Flink (event time, watermark, exactly-once), data contract, lineage, FinOps", "CDC → SCD2; lakehouse có rollback; streaming có sự kiện muộn và trùng; pipeline ingest cho RAG xử lý đổi embedder như migration"]
    ],
    order: "Đọc Fundamentals of Data Engineering để có bản đồ, học theo DE Zoomcamp, sau đó đọc DDIA bản 2 để hiểu cơ chế.",
    resources: [["DataTalksClub — Data Engineering Zoomcamp (miễn phí)", "https://github.com/DataTalksClub/data-engineering-zoomcamp"], ["Fundamentals of Data Engineering (O'Reilly 2022)", "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/"], ["Designing Data-Intensive Applications, 2e (3/2026)", "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/"]],
    stable: ["SQL", "Mô hình hoá chiều", "Parquet", "Spark", "Kafka (khái niệm)", "Airflow", "dbt", "Iceberg", "Docker", "Terraform"],
    churn: ["Công cụ ingest SaaS", "Orchestrator mới (Dagster, Prefect, Kestra…)", "Vendor observability", "Vector DB"],
    cases: [
      ["Unity (2022): công cụ nhắm quảng cáo bằng ML giảm độ chính xác sau khi ingest dữ liệu xấu; thiệt hại khoảng 110 triệu USD, khoảng 8% doanh thu năm.", "https://www.sec.gov/Archives/edgar/data/1810806/000181080622000052/a2022q2ex-991.htm"],
      ["Public Health England (10/2020): 15.841 ca COVID bị bỏ sót vì pipeline dùng định dạng .XLS cũ có giới hạn dòng.", "https://www.theregister.com/2020/10/05/excel_england_coronavirus_contact_error/"],
      ["Uber: khoảng 6 nghìn tỷ dòng mỗi ngày vào khoảng 350 PB dữ liệu trên Hudi (1/2026, qua snippet).", "https://www.uber.com/us/en/blog/apache-hudi-at-uber/"],
      ["Khảo sát Joe Reis 2026 (n=1.101): 82% data engineer dùng AI hằng ngày; nỗi khổ lớn nhất là áp lực phải nhanh (59%) và thiếu người chịu trách nhiệm (51%) (qua snippet).", "https://joereis.substack.com/p/the-2026-state-of-data-engineering"]
    ],
    critique: [
      ["INSERT append không có khoá; CURRENT_DATE() thay ngày logic; ROW_NUMBER() không phá hoà", "Chạy lại cùng ngày hai lần, so từng dòng"],
      ["High-water mark theo thời điểm ingest thay vì event time; không lookback; streaming không watermark", "Chèn thử sự kiện muộn và trùng"],
      ["SELECT * vào bảng production; không xử lý upstream đổi tên hoặc kiểu cột", "Contract hoặc schema registry"],
      ["Fan-out khi join; SCD2 thiếu mốc thời điểm", "Đối soát số dòng nguồn và đích"],
      ["Hàm bọc cột partition làm mất pruning; quá nhiều file nhỏ", "Xem số byte quét; dry-run"],
      ["Spark hoặc Kafka cho vài GB dữ liệu và SLA theo ngày", "Hỏi: DuckDB/Polars cộng batch hằng ngày có đủ không?"],
      ["Credential trong code, IAM quá rộng, PII trong log, xoá không lan xuống embedding", "Checklist bảo mật; truy vết lineage"],
      ["Pipeline không test, không cảnh báo, lỗi trôi qua im lặng", "Test khoá, freshness, volume; cảnh báo cho người trực"]
    ],
    core: ["python-core", "git-env", "sql", "collection", "cleaning", "pandas", "spark", "warehouse", "docker", "pipelines-cicd", "monitoring"],
    useful: ["eda", "nlp-embeddings", "rag", "serving-api", "tracking", "numpy"]
  },
  {
    id: "mle", name: "ML Engineer", family: "infra",
    question: "Mô hình này có chạy tin cậy trong sản phẩm không?", deliver: "Mô hình production cùng pipeline train/serve", measure: "Metric online, latency, độ tin cậy", neighbor: "Data Scientist, MLOps",
    math: 2, swe: 3, degree: "Không bắt buộc; thị trường lệch về người có kinh nghiệm", vn: "Chưa có số liệu lương riêng tại Việt Nam. Toàn cầu: phân tích hơn 10.000 tin cho thấy 78% yêu cầu từ 5 năm kinh nghiệm (qua snippet); Levels.fyi trung vị ML Engineer ở Mỹ khoảng 280.000 USD (nghiêng về big tech).",
    summary: "Đưa một mô hình cụ thể từ dữ liệu thành dịch vụ production tin cậy: feature, huấn luyện, đánh giá, serving, giám sát. Code mô hình thường chỉ khoảng 5% hệ thống.",
    daily: "Xử lý dữ liệu và feature, huấn luyện, triển khai, debug, đọc dashboard và kết quả A/B.",
    levels: [
      ["A – Nền (~2–4 tháng)", "Python cho kỹ sư (package, typing, logging, config), Git/pytest/lint, SQL, pandas/Polars, Parquet, đánh giá đúng, Linux, HTTP, Docker", "Repo huấn luyện có src/, pyproject.toml, pytest (gồm test leakage), seed cố định, một lệnh tái tạo mô hình"],
      ["B – Lõi (~3–4 tháng)", "MLflow tracking và registry; serving batch và online (FastAPI/BentoML); orchestration; kiểm tra dữ liệu và drift (Evidently); CI/CD cho ML; một cloud, Terraform", "Mô hình dạng dịch vụ có schema, load test p50/p95; pipeline retrain cấp 1 có cổng so với mô hình production"],
      ["C – Nâng cao (~4–6 tháng+)", "Kubernetes, KServe/Triton; feature store (point-in-time join); DDP/FSDP; canary/shadow; safetensors thay pickle; tối ưu chi phí (lượng tử hoá, ONNX)", "Triển khai lên K8s có autoscale, canary, ước tính chi phí mỗi 1 triệu dự đoán"]
    ],
    order: "Google MLCC (phần production) → Designing ML Systems → Made With ML → MLOps Zoomcamp → Rules of ML và Hidden Technical Debt.",
    resources: [["Google ML Crash Course — Production ML systems", "https://developers.google.com/machine-learning/crash-course/production-ml-systems"], ["Chip Huyen — Designing Machine Learning Systems", "https://github.com/chiphuyen/dmls-book"], ["Made With ML", "https://github.com/GokuMohandas/Made-With-ML"], ["MLOps Zoomcamp (miễn phí, 9 tuần)", "https://github.com/DataTalksClub/mlops-zoomcamp"]],
    stable: ["Python", "SQL", "Git", "Docker", "pytest", "Kubernetes cơ bản", "MLflow", "PyTorch", "FastAPI"],
    churn: ["Feature store thương mại", "SaaS experiment tracking", "Công cụ LLMOps/eval"],
    cases: [
      ["Uber Michelangelo (2024): khoảng 400 dự án, hơn 5.000 mô hình production, đỉnh 10 triệu dự đoán/giây (qua snippet).", "https://www.uber.com/us/en/blog/from-predictive-to-generative-ai/"],
      ["Zillow Offers ghi giảm tồn kho 304,4 triệu USD Q3/2021 rồi đóng mảng; thất bại đến từ cả mô hình lẫn quy trình.", "https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm"],
      ["Google Play: làm mới một bảng dữ liệu bị cũ 6 tháng làm tỷ lệ cài đặt tăng 2% (Rules of ML, số liệu cũ).", "https://github.com/thundergolfer/google-rules-of-machine-learning"],
      ["JFrog tìm thấy hơn 100 mô hình độc hại trên Hugging Face (2/2024), khoảng 95% là PyTorch dạng pickle.", "https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/"]
    ],
    critique: [
      ["fit (scaler, imputer, encoder, SMOTE, chọn feature) trên toàn bộ dữ liệu trước khi chia", "Tìm mọi lời gọi fit, xem nằm trước hay sau lời chia; Pipeline trong CV"],
      ["Chia ngẫu nhiên dữ liệu thời gian; cùng user ở cả train và test; feature dùng thông tin tương lai", "Chia theo thời gian/nhóm; kiểm tra point-in-time"],
      ["Logic feature viết hai lần (notebook và API), đúng như app.py của Flight Fare", "Một module feature dùng chung; schema đầu vào"],
      ["Không seed, không khoá phiên bản, đường dẫn tuyệt đối", "Tái tạo mô hình trên máy khác bằng một lệnh"],
      ["pickle.load / torch.load file không rõ nguồn; trust_remote_code=True", "safetensors/ONNX, kiểm tra hash"],
      ["Nạp mô hình mỗi request; không timeout, health probe, resource limit", "Review manifest; load test"],
      ["GPU cho mô hình chạy tốt trên CPU; endpoint bật liên tục cho việc chỉ cần batch", "Ước tính chi phí mỗi 1.000 dự đoán"],
      ["Không cổng kiểm tra trước khi promote, không rollback/canary, không giám sát drift", "Mô phỏng drift xem có cảnh báo không"]
    ],
    core: ["python-core", "numpy", "pandas", "git-env", "sql", "encoding", "scaling", "pipelines", "random-forest", "boosting", "metrics", "validation", "bias-variance", "tuning", "nn-basics", "serving-api", "docker", "tracking", "pipelines-cicd", "monitoring", "case-issues", "case-upgrade"],
    useful: ["linear-algebra", "calculus", "spark", "warehouse", "cnn", "transformer", "recsys", "ts-ml", "explainability"]
  },
  {
    id: "mlops", name: "MLOps / ML Platform", family: "infra",
    question: "Mọi đội có đưa mô hình lên production nhanh và an toàn không?", deliver: "Nền tảng dùng chung: registry, feature store, serving, monitoring", measure: "Mức sử dụng, thời gian ra production, chi phí", neighbor: "ML Engineer, DevOps/SRE",
    math: 1, swe: 3, degree: "Không cần; cần kinh nghiệm backend/DevOps", vn: "Chưa có số liệu lương Việt Nam đã kiểm chứng. Nhóm nghiên cứu nhận định phần lớn startup Việt đang ở MLOps cấp 0–1.",
    summary: "Xây phần dùng chung cho nhiều đội ML: pipeline, feature store, model registry, serving, giám sát, GPU. Gần với SRE và backend.",
    daily: "Kubernetes, CI/CD, lập lịch GPU, trực sự cố, migration nền tảng, thiết kế SDK nội bộ cho các đội ML.",
    levels: [
      ["Nền", "Như giai đoạn A của ML Engineer, cộng Linux và mạng cơ bản", "Đóng gói một mô hình thành image có thể tái tạo"],
      ["Lõi", "Ba cấp MLOps của Google (0: thủ công, 1: tự động huấn luyện liên tục có cổng kiểm tra, 2: CI/CD cho chính pipeline); registry, orchestration, giám sát", "Pipeline cấp 1: retrain theo lịch, cổng kiểm tra dữ liệu và mô hình, registry, metadata"],
      ["Platform", "Kubernetes, Helm, KServe/Triton, KubeRay, feature store, GPU scheduling, governance, FinOps", "Nền tảng serving nhiều mô hình có canary, autoscale và báo cáo chi phí theo đội"]
    ],
    order: "Làm ML Engineer vững trước, sau đó chuyển dần sang phần dùng chung khi đã thấy nhiều đội lặp lại cùng một việc.",
    resources: [["Google Cloud — MLOps: CD và tự động hoá pipeline", "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"], ["NeurIPS 2015 — Hidden Technical Debt in ML Systems", "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems"], ["MLOps Zoomcamp", "https://github.com/DataTalksClub/mlops-zoomcamp"]],
    stable: ["Docker", "Kubernetes", "Terraform", "Prometheus/Grafana", "MLflow", "Các khái niệm cấp 0/1/2"],
    churn: ["Kubeflow (đổi tên thành AI Reference Platform)", "Feature store thương mại (Databricks mua Tecton 8/2025)", "W&B (CoreWeave mua 5/2025)"],
    cases: [
      ["Grab chuyển nền tảng serving Catwalk sang NVIDIA Triton: hơn 50% triển khai online migrate trong 10 ngày, độ trễ đuôi giảm 50% ở một số hệ, chi phí giảm tới 90% với một số mô hình, trung bình 20% (10/2025, qua snippet).", "https://engineering.grab.com/modernising-grab-model-serving-platform"],
      ["DoorDash Sibyl đạt đỉnh khoảng 900.000 lượt đánh giá/giây; Fabricator tăng tốc pipeline feature tới 12 lần.", "https://careersatdoordash.com/blog/introducing-fabricator-a-declarative-feature-engineering-framework/"],
      ["Spotify Hendrix: tỷ lệ kỹ sư ML dùng nền tảng tăng từ 16% lên 71% (tóm tắt thứ cấp).", "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-hendrix-unified-ml-platform-consolidating-feature-workflow-and-model-serving-with"],
      ["Airbnb 2016: mỗi mô hình mất 8–12 tuần mới lên production, lý do ra đời nền tảng nội bộ (số liệu cũ).", "https://conferences.oreilly.com/strata/strata-ny-2018/public/schedule/detail/69383.html"]
    ],
    critique: [
      ["Không có cổng kiểm tra dữ liệu và mô hình trước khi promote", "Pipeline cấp 1 phải có cổng tự động"],
      ["Manifest thiếu resource limit, health probe, timeout", "Review manifest; chaos test đơn giản"],
      ["Secret trong image hoặc biến môi trường lộ ra log", "Quét image; dùng secret manager"],
      ["Tự động retrain mỗi khi có drift mà không điều tra", "Phân biệt lỗi pipeline dữ liệu với thay đổi thật"],
      ["Chi phí GPU không được gắn nhãn theo đội", "Báo cáo chi phí theo đội và theo mô hình"]
    ],
    core: ["python-core", "git-env", "sql", "pipelines", "validation", "metrics", "serving-api", "docker", "tracking", "pipelines-cicd", "monitoring", "spark", "warehouse"],
    useful: ["boosting", "nn-basics", "rag", "agents-eval", "case-upgrade"]
  },
  {
    id: "aie", name: "AI Engineer", family: "product",
    question: "Sản phẩm dùng LLM này có đúng, an toàn, rẻ không?", deliver: "Tính năng hoặc agent dựa trên foundation model", measure: "Điểm eval, chi phí mỗi request, sự cố", neighbor: "Software Engineer, ML Engineer",
    math: 1, swe: 3, degree: "Không cần", vn: "TopDev 2024–25: kỹ sư AI nhận 1.110–2.060 USD/tháng, đứng đầu 5 vị trí khó tuyển nhất; mới tốt nghiệp 11–20 triệu đồng/tháng. CareerViet: nhu cầu kỹ sư AI năm 2025 tăng gấp đôi (qua snippet).",
    summary: "Xây sản phẩm trên foundation model: context, RAG, tool và agent, eval, guardrail; chỉ fine-tune khi thật cần. Đánh giá đầu ra mang tính xác suất là kỹ năng khó nhất, và cũng là kỹ năng để kiểm chứng code AI viết.",
    daily: "Viết và version prompt cùng schema tool, xây retrieval, đọc trace và phân tích lỗi, duy trì bộ eval và LLM judge, chọn mô hình theo chi phí và độ trễ, thêm guardrail, và nhiều việc backend thông thường.",
    levels: [
      ["0 – Tiên quyết", "Python (async, typing, Pydantic), HTTP/JSON, Git, SQL, FastAPI, Docker, quản lý secret; thống kê cho eval (tỷ lệ, khoảng tin cậy, cỡ mẫu, precision/recall)", "Đo chi phí và độ trễ trên 3 mô hình × 3 temperature × 20 prompt, báo cáo phương sai"],
      ["1 – Lõi", "Token, context, sampling, giá; structured output; tool calling; RAG (chunk, embedding, hybrid BM25 + vector, rerank, trích dẫn, recall@k); eval (phân tích lỗi trên trace, golden set, tiêu chí nhị phân, judge đối chiếu nhãn người); 5 mẫu workflow; OWASP LLM Top 10", "Trích xuất có cấu trúc trên 100 tài liệu tiếng Việt có nhãn; RAG trên văn bản quy chế có trích dẫn và biết từ chối"],
      ["2 – Nâng cao", "Agent có memory, MCP, compaction, tracing OpenTelemetry GenAI, caching, rate limit, human-in-the-loop, eval online", "Mini text-to-SQL role chỉ đọc; agent kèm MCP server quyền tối thiểu và bộ test prompt injection; eval chạy trong CI"],
      ["3 – Chuyên sâu", "LoRA/QLoRA, distillation, vLLM, lượng tử hoá, multimodal, DSPy, multi-agent", "Fine-tune hoặc distil mô hình nhỏ, serve bằng vLLM, so với API cộng prompt về chất lượng, chi phí, độ trễ"]
    ],
    order: "Gọi API trực tiếp (2 tuần) → eval ngay sau prototype đầu tiên (2 tuần) → RAG (3 tuần) → tool, workflow, agent, MCP (3 tuần) → bảo mật và observability (2 tuần) → fine-tune và serving (tuỳ chọn). Tổng khoảng 4–6 tháng bán thời gian (ước lượng).",
    resources: [["Chip Huyen — AI Engineering (O'Reilly 2025)", "https://github.com/chiphuyen/aie-book"], ["Anthropic — Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents"], ["Hugging Face — Agents course", "https://huggingface.co/learn/agents-course/en/unit0/introduction"], ["OWASP Top 10 for LLM Applications 2025", "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"], ["Husain & Shankar — Evals FAQ", "https://hamel.dev/blog/posts/evals-faq/evals-faq.pdf"]],
    stable: ["Tokenization, sampling", "Embedding, BM25/hybrid, rerank", "Phương pháp eval", "Mẫu workflow, thiết kế tool", "OWASP", "JSON Schema/Pydantic"],
    churn: ["Tên và giá mô hình", "API framework agent (LangChain đã đổi create_react_agent sau khoảng một năm)", "Vendor vector DB", "SaaS observability", "Mẹo prompt theo phiên bản mô hình"],
    cases: [
      ["Klarna: 2,3 triệu hội thoại tháng đầu, tương đương 700 nhân viên; đến 5/2025 thừa nhận đã \"đi quá xa\" và tuyển lại người.", "https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/"],
      ["Morgan Stanley: hơn 98% đội cố vấn dùng trợ lý; bộ eval xây từ câu hỏi thật và do cố vấn chấm.", "https://openai.com/index/morgan-stanley/"],
      ["Anthropic Contextual Retrieval: giảm lỗi truy xuất top-20 49%, 67% khi thêm reranker.", "https://www.anthropic.com/engineering/contextual-retrieval"],
      ["Replit: agent xoá database production trong lúc đang đóng băng code rồi báo cáo sai về việc mình đã làm (7/2025).", "https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/"],
      ["Duolingo ra 148 khoá học làm bằng GenAI trong chưa đầy một năm, trong khi 100 khoá đầu mất khoảng 12 năm.", "https://investors.duolingo.com/news-releases/news-release-details/duolingo-launches-148-new-language-courses"]
    ],
    critique: [
      ["Nội dung người dùng hoặc tài liệu truy xuất nối thẳng vào chỉ dẫn; hội đủ \"bộ ba chết người\": dữ liệu riêng tư + nội dung không tin cậy + kênh gửi ra ngoài", "OWASP LLM01; Simon Willison — lethal trifecta"],
      ["Output LLM đưa thẳng vào SQL, shell, eval, HTML; text-to-SQL không dùng role chỉ đọc", "OWASP LLM05; structured output và validate schema"],
      ["Tool quyền rộng, không dry-run, không người duyệt hành động không đảo ngược được", "OWASP LLM06; sự cố Replit"],
      ["Secret trong system prompt; PII ghi vào trace", "OWASP LLM02, LLM07"],
      ["Không max_tokens, không giới hạn số bước agent, retry không trần", "OWASP LLM10 — unbounded consumption"],
      ["Không trích nguồn, không đường từ chối, không phân quyền lúc truy xuất", "Air Canada, NYC MyCity; OWASP LLM08"],
      ["Không golden set, judge chưa đối chiếu nhãn người, cỡ mẫu nhỏ, lẫn ví dụ eval vào prompt", "Husain & Shankar; Morgan Stanley"],
      ["Test giả định output giống hệt nhau; dùng API đã deprecate; không khoá phiên bản", "LangChain 1.0"],
      ["Nhồi toàn bộ kho tài liệu vào prompt", "Context rot (Anthropic)"],
      ["Không có đường chuyển cho người thật", "Klarna, Air Canada"]
    ],
    core: ["framing", "probability", "statistics", "python-core", "git-env", "sql", "metrics", "validation", "nlp-embeddings", "transformer", "llm-prompting", "rag", "finetuning", "agents-eval", "serving-api", "docker", "monitoring"],
    useful: ["pandas", "collection", "knn", "recsys", "nn-basics", "tracking", "pipelines-cicd"]
  },
  {
    id: "spec", name: "CV / NLP / RecSys", family: "product",
    question: "Mô hình chuyên biệt cho ảnh, ngôn ngữ, gợi ý có chạy tốt ngoài đời không?", deliver: "Mô hình fine-tune, hệ retrieve-rank", measure: "mAP/WER/NDCG, rồi A/B online", neighbor: "ML Engineer, Research Engineer",
    math: 2, swe: 2, degree: "Ứng dụng: portfolio là đủ; lab nghiên cứu: thường cần thạc sĩ/tiến sĩ", vn: "Hệ sinh thái Việt: PhoBERT, PhoGPT, PhoWhisper (VinAI), VT-Super-120B (Viettel, tự công bố). Qualcomm mua bộ phận GenAI của VinAI ngày 1/4/2025.",
    summary: "Ba nhánh dùng chung lõi PyTorch và kỷ luật chia dữ liệu, khác nhau ở kiểu dữ liệu và metric. Điểm offline cao chưa bảo đảm kết quả ngoài đời.",
    daily: "CV: fine-tune backbone có sẵn (ViT/DINOv2, CLIP, SAM, YOLO), làm dữ liệu và gán nhãn. NLP/Speech: phần lớn đã hoà vào LLM engineering, NLP cổ điển vẫn có giá trị cho tiếng Việt. RecSys: hệ hai tầng retrieve rồi rank, cuối cùng phán xét bằng A/B.",
    levels: [
      ["CV", "OpenCV → CNN từ đầu (CS231n) → transfer learning → YOLO/SAM → ViT/CLIP/VLM → ONNX/TensorRT", "Phát hiện lỗi trên MVTec AD kèm phân tích nhầm lẫn; fine-tune YOLO, xuất ONNX, đo độ trễ CPU"],
      ["NLP/Speech", "Tokenization (BPE, tách từ tiếng Việt) → embedding → Transformer (CS224n) → Hugging Face → fine-tune PhoBERT/ViT5 → LoRA, RAG → Whisper/PhoWhisper", "Phân loại hate speech UIT-ViHSD so sánh PhoBERT (tách từ đúng) với XLM-R; fine-tune PhoWhisper, báo WER theo vùng giọng"],
      ["RecSys", "Baseline độ phổ biến → item-item CF → matrix factorization → LightGBM lambdarank → two-tower + FAISS → DLRM/DCN → SASRec → real-time → A/B", "Hệ hai tầng trên MovieLens chia theo thời gian, NDCG@10 so với baseline độ phổ biến"]
    ],
    order: "Giai đoạn 0–6 và 9 của lộ trình, sau đó đi sâu một trong ba nhánh.",
    resources: [["Stanford CS231n", "https://cs231n.github.io/"], ["Stanford CS224n", "https://web.stanford.edu/class/cs224n/"], ["GitHub — VinAIResearch/PhoBERT", "https://github.com/VinAIResearch/PhoBERT"], ["Google — Recommendation Systems course", "https://developers.google.com/machine-learning/recommendation"]],
    stable: ["PyTorch", "Transfer learning", "Metric: mAP/IoU, WER/CER, NDCG/Recall@K", "Kỷ luật chia dữ liệu theo nhóm/thời gian"],
    churn: ["Backbone mới", "Mô hình nền đa phương thức", "Framework recsys"],
    cases: [
      ["Google võng mạc tiểu đường: AUC 0,991 (JAMA 2016); triển khai ở 11 phòng khám Thái Lan từ chối khoảng 21% trong khoảng 1.840 ảnh vì không đủ chất lượng.", "https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376718"],
      ["Waymo: qua 56,7 triệu dặm, giảm 85% va chạm có thương tích nghiêm trọng so với người lái (khoảng tin cậy 39–99%).", "https://www.tandfonline.com/doi/full/10.1080/15389588.2025.2499887"],
      ["PhoWhisper: fine-tune Whisper trên 844 giờ tiếng Việt nhiều vùng giọng.", "https://arxiv.org/abs/2406.02555"],
      ["YouTube xếp hạng theo thời gian xem thay vì CTR vì CTR đẩy clickbait lên.", "https://blog.acolyer.org/2016/09/19/deep-neural-networks-for-youtube-recommendations/"],
      ["PinSage (Pinterest): đồ thị 3 tỷ nút, 18 tỷ cạnh, tăng 25–30% tương tác trong A/B.", "https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48"]
    ],
    critique: [
      ["CV: augment trước khi chia; ảnh cùng bệnh nhân hoặc cùng video ở cả train và test; nhầm mAP@0.5 với mAP@[.5:.95]; tiền xử lý ONNX lệch lúc train; không đánh giá lại sau INT8", "GroupKFold; so tiền xử lý hai phía; đánh giá lại sau lượng tử hoá"],
      ["NLP: đưa text thô vào PhoBERT không tách từ; tính WER khi chưa chuẩn hoá Unicode (NFC/NFD), dấu câu, số; cùng người nói ở cả hai tập", "Đọc model card; chuẩn hoá trước khi tính metric"],
      ["RecSys: chia ngẫu nhiên thay vì theo thời gian; NDCG trên 100 negative lấy mẫu; feature từ tương lai; không baseline độ phổ biến", "Chia theo thời gian; tính trên toàn catalog"],
      ["Chung: tuning trên tập test; không báo độ dao động theo seed; benchmark bị nhiễm dữ liệu", "Tập test khoá lại; nhiều seed; kiểm tra nhiễm"]
    ],
    core: ["linear-algebra", "calculus", "probability", "python-core", "numpy", "pandas", "metrics", "validation", "bias-variance", "nn-basics", "cnn", "rnn", "transformer", "nlp-embeddings", "recsys", "knn", "pca"],
    useful: ["finetuning", "rag", "serving-api", "docker", "tracking", "boosting", "dbscan", "tuning"]
  },
  {
    id: "research", name: "Research Scientist / Engineer", family: "research",
    question: "Có phương pháp mới tốt hơn không?", deliver: "Bài báo, phương pháp, hạ tầng thí nghiệm", measure: "Công bố, khả năng tái lập, tác động", neighbor: "Applied Scientist",
    math: 3, swe: 2, degree: "Research Scientist: gần như cần tiến sĩ. Research Engineer: portfolio có thể đủ", vn: "Blog hướng nghiệp cho rằng tỷ lệ trúng tuyển Research Scientist ở lab hàng đầu dưới 0,5%, Research Engineer cao hơn 2–5 lần (chỉ mang tính gợi ý). Evals engineering là lối vào gần nghiên cứu đang tăng.",
    summary: "Research Scientist đề xuất phương pháp và viết bài báo; Research Engineer xây hạ tầng huấn luyện và eval, tái lập kết quả. Với người không có bằng tiến sĩ, Research Engineer hoặc evals engineer là cửa khả thi.",
    daily: "Đọc và tái lập bài báo, thiết kế thí nghiệm, huấn luyện ở quy mô lớn, viết hạ tầng eval, viết bài.",
    levels: [
      ["Nền", "Toán (đại số tuyến tính, giải tích, xác suất, tối ưu) vững; PyTorch; đọc bài báo theo ba lượt", "Tái lập bảng kết quả chính của một bài báo"],
      ["Lõi", "Transformer, huấn luyện phân tán, phương pháp eval, ablation, báo độ dao động theo seed", "Đóng góp open-source vào một thư viện nghiên cứu"],
      ["Nâng cao", "Chủ đề chuyên sâu (alignment, evals, hiệu năng CUDA, robotics)", "Bài workshop hoặc blog kỹ thuật có thí nghiệm tái lập được"]
    ],
    order: "Toàn bộ lộ trình, đặc biệt giai đoạn 1, 9, 10; đọc bài báo song song. Khi đọc luôn hỏi: baseline có được tinh chỉnh công bằng, có tuning trên test, có báo độ dao động, benchmark có bị nhiễm không.",
    resources: [["Dive into Deep Learning", "https://d2l.ai/"], ["Chip Huyen — AI Engineering (chương eval)", "https://github.com/chiphuyen/aie-book"], ["Hugging Face — LLM course", "https://huggingface.co/learn/llm-course/"]],
    stable: ["Toán nền", "PyTorch", "Phương pháp thí nghiệm và eval"],
    churn: ["Kiến trúc mô hình mới", "Benchmark theo mùa"],
    cases: [
      ["AI evals engineering: khoảng 39,6% tin tuyển của công ty AI-first ghi kỹ năng eval; vị trí Research Engineer, Model Evaluations của Anthropic đăng mức 500.000–850.000 USD/năm (nguồn thứ cấp, cần đối chiếu).", "https://jobsbyculture.com/blog/ai-evals-engineer-career-guide-2026"],
      ["Qualcomm mua MovianAI, bộ phận GenAI cũ của VinAI, ngày 1/4/2025: edge AI có nhu cầu cụ thể liên quan tới Việt Nam.", "https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai"],
      ["Robotics foundation model (GR00T N1, Gemini Robotics, π0) là nghiên cứu thật nhưng tổng kết ngành 2026 cho rằng robot hình người còn vụng về và đắt đỏ: nên theo dõi hơn là chọn làm cửa vào.", "https://arxiv.org/abs/2503.14734"]
    ],
    critique: [
      ["Baseline không được tinh chỉnh công bằng", "Tinh chỉnh baseline với cùng ngân sách"],
      ["Tinh chỉnh siêu tham số trên tập test", "Tập test chỉ dùng một lần"],
      ["Chỉ báo kết quả một seed", "Báo trung bình và độ lệch qua nhiều seed"],
      ["Benchmark bị nhiễm dữ liệu huấn luyện (GSM1k cho thấy một số mô hình tụt tới 8–13 điểm so với GSM8K)", "Dùng benchmark mới hoặc kiểm tra nhiễm"]
    ],
    core: ["linear-algebra", "calculus", "probability", "statistics", "numpy", "python-core", "git-env", "metrics", "validation", "bias-variance", "tuning", "nn-basics", "cnn", "rnn", "transformer", "finetuning"],
    useful: ["agents-eval", "nlp-embeddings", "recsys", "tracking", "explainability"]
  }
];

window.ROADMAP_FOUNDATION = [
  ["SQL và mô hình dữ liệu", "JOIN, GROUP BY, window, CTE, NULL; biết mỗi bảng \"một dòng là gì\" (grain); star schema", "Join fan-out làm phồng tổng, sai mẫu số, LEFT JOIN vô tình thành INNER JOIN"],
  ["Thống kê suy luận", "Phân phối, khoảng tin cậy, kiểm định, cỡ mẫu và power, precision/recall", "\"Prompt B thắng prompt A trên 50 ví dụ\" có thật không; A/B thiếu power; kết luận nhân quả từ tương quan"],
  ["Kỷ luật đánh giá mô hình", "Chia theo thời gian/nhóm, fit tiền xử lý sau khi chia, baseline, metric gắn mục tiêu kinh doanh", "Leakage, điểm offline đẹp nhưng thực tế hỏng, accuracy trên dữ liệu mất cân bằng"],
  ["Kỹ thuật phần mềm", "Git, pytest, môi trường và khoá phiên bản, cấu hình không hard-code, Docker, HTTP/JSON, quản lý secret", "Code chỉ chạy trên máy tác giả, không tái lập được, lộ API key, gọi hàm không tồn tại"],
  ["Hệ thống, chi phí, bảo mật", "Ước tính chi phí truy vấn và suy luận, quyền tối thiểu, nạp mô hình an toàn, log và giám sát", "Cluster Spark cho 2 GB, agent có quyền xoá DB production, pickle.load file lạ"]
];

window.ROADMAP_TRANSITIONS = [
  ["da", "ae", "dbt, mô hình hoá dữ liệu, test, Git/CI", "Thấp"],
  ["da", "pds", "Thống kê suy luận, thí nghiệm, nhân quả", "Trung bình"],
  ["da", "aie", "Kỹ thuật phần mềm, ML, triển khai", "~9–12 tháng (vendor/blog)"],
  ["swe", "aie", "LLM API, RAG, eval", "~3–6 tháng (vendor/blog)"],
  ["swe", "de", "SQL và mô hình hoá dữ liệu", "Trung bình"],
  ["de", "mle", "Nền ML, feature store, serving", "Trung bình"],
  ["mlds", "mle", "Kỹ thuật phần mềm, system design, triển khai", "Trung bình"],
  ["mle", "mlops", "Kubernetes, nền tảng dùng chung, SRE", "Trung bình"],
  ["mle", "research", "Chiều sâu nghiên cứu, thường qua thạc sĩ/tiến sĩ hoặc công bố", "Cao"]
];

window.ROADMAP_INTERVIEWS = [
  ["Data Analyst", "Bài SQL; phân tích tình huống kinh doanh hoặc phê bình dashboard; bài về nhà từ dataset ra slide insight"],
  ["Analytics Engineer", "Mô hình hoá dữ liệu (star schema, SCD); biến nguồn lộn xộn thành mart; dự án dbt"],
  ["Product DS", "Xác suất, thống kê, A/B test; product sense và tình huống metric"],
  ["Data Engineer", "SQL và Python; mô hình hoá dữ liệu; thiết kế pipeline hoặc nền tảng dữ liệu"],
  ["ML Engineer", "Coding; lý thuyết ML; ML system design (gợi ý, xếp hạng, gian lận)"],
  ["MLOps", "Docker/K8s, CI/CD; thiết kế serving và giám sát drift"],
  ["AI Engineer", "Thiết kế hệ LLM, eval, đánh đổi chi phí và độ trễ"],
  ["Research", "Sàng lọc qua công bố; đào sâu một bài báo; trình bày nghiên cứu"]
];

window.ROADMAP_MARKET = {
  global: [
    ["Top 3", "WEF 2025: chuyên gia big data, kỹ sư fintech, chuyên gia AI/ML là ba nghề tăng nhanh nhất đến 2030.", "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-the-fastest-growing-and-declining-jobs/"],
    ["#1", "LinkedIn: AI Engineer là chức danh tăng nhanh nhất ở Mỹ năm 2025 và 2026.", "https://www.dice.com/career-advice/ai-related-jobs-top-linkedins-fastest-growing-roles-list-for-2026"],
    ["2,5%", "Stanford AI Index 2026: kỹ năng AI có trong 2,5% tin tuyển ở Mỹ năm 2025, tăng 55%.", "https://lightcast.io/resources/blog/stanford-ai-2026"],
    ["−16 đến −19%", "Stanford: việc làm nhóm 22–25 tuổi trong nghề dễ bị AI thay thế thấp hơn nhóm ít bị tác động (bản 8/2026, qua snippet).", "https://digitaleconomy.stanford.edu/news/canariesaug26/"]
  ],
  vn: [
    ["1.110–2.060 USD", "Lương tháng kỹ sư AI (TopDev 2024–25, qua snippet); AI Engineer khó tuyển nhất.", "https://e.vnexpress.net/news/business/data-speaks/ai-engineers-monthly-pay-exceeds-2-000-but-few-qualify-4796918.html"],
    ["41,3 triệu", "Trung vị lương tháng Data Engineer; 56,9 triệu ở 3–4 năm (ITviec, qua snippet).", "https://itviec.com/report/vietnam-it-salary-and-recruitment-market"],
    ["+38%", "Tin tuyển Data Engineer so với năm trước (ITviec blog, qua snippet).", "https://itviec.com/blog/luong-data-engineer/"],
    ["1/3/2026", "Luật Trí tuệ nhân tạo 134/2025/QH15 có hiệu lực; mục tiêu 50.000 người ứng dụng AI và 10.000 chuyên gia vào 2030.", "https://mst.gov.vn/quoc-hoi-thong-qua-luat-tri-tue-nhan-tao-hoan-thien-hanh-lang-phap-ly-cho-ky-nguyen-so-197251210165544671.htm"]
  ],
  ladder: [
    ["Fresher/junior DA hoặc AI", "~11–25 triệu đồng (~420–960 USD)", "Các nguồn lệch nhau ở cấp này"],
    ["Mid DS/DE/AI (2–4 năm)", "~30–57 triệu đồng (~1.150–2.200 USD)", "DE 3–4 năm: 56,9 triệu (ITviec)"],
    ["Senior/lead", "~50–90 triệu đồng trở lên", "Big tech, FDI, làm từ xa cho công ty nước ngoài ở đầu trên"],
    ["Analytics Engineer, MLOps, Research Scientist", "Chưa có số liệu Việt Nam đã kiểm chứng", "Không nên tự ước lượng"]
  ],
  note: "Doanh nghiệp Việt năm 2026 mô tả \"thiếu người giỏi, dư người code cơ bản\": tin entry-level đòi 2–5 năm kinh nghiệm và phỏng vấn kiểm tra khả năng làm việc cùng AI (VnExpress, 6/2026).",
  noteSrc: "https://vnexpress.net/thi-truong-it-viet-thieu-nguoi-gioi-du-nguoi-code-co-ban-5059102.html"
};

window.ROADMAP_BRANCH_MAP = {
  title: "Bản đồ nhánh nghề: một nền chung, bốn họ, mười nhánh",
  src: `flowchart LR
  F["Nền chung: SQL và grain, thống kê, kỷ luật đánh giá, kỹ thuật phần mềm, chi phí và bảo mật"]:::hl
  F --> A["Họ phân tích"]
  F --> I["Họ hạ tầng"]
  F --> P["Họ sản phẩm AI"]
  F --> R["Nghiên cứu"]
  A --> DA["Data Analyst"]
  A --> AE["Analytics Engineer"]
  A --> PDS["Data Scientist product"]
  A --> MLDS["Data Scientist ML"]
  I --> DE["Data Engineer"]
  I --> MLE["ML Engineer"]
  I --> OPS["MLOps / Platform"]
  P --> AIE["AI Engineer"]
  P --> SPEC["CV / NLP / RecSys"]
  R --> RS["Research Scientist / Engineer"]`
};

window.ROADMAP_TRANSITION_MAP = {
  title: "Các hướng chuyển nhánh phổ biến (đi từ kỹ năng liền kề)",
  src: `flowchart LR
  SWE["Software Engineer"]
  DA["Data Analyst"] -->|"thấp"| AE["Analytics Engineer"]
  DA -->|"trung bình"| PDS["Product DS"]
  DA -->|"~9–12 tháng"| AIE["AI Engineer"]
  SWE -->|"~3–6 tháng"| AIE
  SWE --> DE["Data Engineer"]
  DE --> MLE["ML Engineer"]
  MLDS["Data Scientist ML"] --> MLE
  MLE --> OPS["MLOps / Platform"]
  MLE -->|"cao, thường cần học vị"| RS["Research / Applied Scientist"]:::hl`
};
