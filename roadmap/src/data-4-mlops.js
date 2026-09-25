/* Giai đoạn 11–13: MLOps, Big Data, Case study */
window.ROADMAP = window.ROADMAP || [];
window.ROADMAP.push(
{
  id: "s11", track: "ops", title: "MLOps & Triển khai",
  subtitle: "Đưa mô hình từ notebook vào sản phẩm và giữ nó hoạt động tốt",
  weeks: "5–6 tuần",
  goal: "Đóng gói mô hình thành API, container hoá, theo dõi thí nghiệm, tự động hoá pipeline, giám sát drift và huấn luyện lại.",
  modules: [
    {
      id: "serving-api", title: "Phục vụ mô hình qua API: Flask, FastAPI", level: 2, hours: 10,
      summary: "Biến mô hình thành dịch vụ web nhận request và trả dự đoán; kiểm tra đầu vào, xử lý lỗi, tài liệu API.",
      concept: "Mô hình được load một lần khi khởi động, mỗi request được kiểm tra dữ liệu rồi đưa vào pipeline. Flask đơn giản, phù hợp trang web nhỏ (như app trong repo). FastAPI hiện đại hơn: kiểm tra kiểu dữ liệu bằng Pydantic, tự sinh tài liệu OpenAPI (/docs), hỗ trợ async. Các chế độ phục vụ: online (real-time, độ trễ thấp), batch (chạy định kỳ cho hàng triệu dòng), streaming.",
      why: ["Mô hình chỉ tạo giá trị khi hệ thống khác gọi được nó.", "Tách mô hình khỏi ứng dụng giúp cập nhật độc lập."],
      when: ["Dự đoán theo yêu cầu: định giá khi người dùng tìm vé, chấm điểm giao dịch."],
      whenNot: ["Dự đoán không cần tức thì (điểm churn hằng tuần): dùng batch job ghi kết quả vào bảng, rẻ và đơn giản hơn."],
      example: {
        domain: "Hàng không (repo)",
        title: "Nâng cấp Flask app thành FastAPI",
        text: "app.py hiện nhận form HTML, tự mã hoá one-hot bằng if/elif, tính thời lượng sai qua nửa đêm và load mô hình từ đường dẫn D:/. Phiên bản FastAPI dưới đây nhận JSON có kiểm tra kiểu, dùng Pipeline đã lưu, và trả lỗi 422 rõ ràng khi dữ liệu sai."
      },
      code: { lang: "python", src: `from pathlib import Path
from datetime import datetime
import joblib, pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field

MODEL = joblib.load(Path(__file__).parent / "flight_model.joblib")
app = FastAPI(title="Flight Fare API")

class Flight(BaseModel):
    airline: str
    source: str
    destination: str
    stops: int = Field(ge=0, le=4)
    dep_time: datetime
    arrival_time: datetime

@app.post("/predict")
def predict(f: Flight):
    row = pd.DataFrame([{
        "Airline": f.airline, "Source": f.source, "Destination": f.destination,
        "Total_Stops": f.stops, "Journey_day": f.dep_time.day, "Journey_month": f.dep_time.month,
        "Dep_hour": f.dep_time.hour, "Dep_min": f.dep_time.minute,
        "Arrival_hour": f.arrival_time.hour, "Arrival_min": f.arrival_time.minute,
        "Duration_min": (f.arrival_time - f.dep_time).total_seconds() / 60,
    }])
    return {"price": round(float(MODEL.predict(row)[0]))}
# Chạy: uvicorn api:app --reload  ->  mở http://localhost:8000/docs` },
      pitfalls: ["Load mô hình trong mỗi request.", "Không kiểm tra đầu vào.", "Không ghi log đầu vào và dự đoán (sau này không giám sát được)."],
      tools: ["FastAPI", "Flask", "BentoML", "Ray Serve", "KServe", "NVIDIA Triton"],
      resources: [["FastAPI docs", "https://fastapi.tiangolo.com/"], ["Flask docs", "https://flask.palletsprojects.com/"]]
    },
    {
      id: "docker", title: "Docker và triển khai lên cloud", level: 2, hours: 10,
      summary: "Đóng gói ứng dụng và môi trường thành container chạy giống nhau ở mọi nơi; triển khai lên dịch vụ cloud.",
      concept: "Dockerfile mô tả image: hệ điều hành cơ sở, thư viện, code, lệnh chạy. Container chạy image đó một cách cô lập. Triển khai: nền tảng serverless container (Cloud Run, AWS App Runner, Azure Container Apps), PaaS (Render, Railway, Hugging Face Spaces), hoặc Kubernetes khi cần quy mô lớn. Nền tảng ML trọn gói: SageMaker, Vertex AI, Azure ML, Databricks.",
      why: ["Loại bỏ lỗi khác môi trường.", "Mở rộng theo tải, triển khai và rollback nhanh."],
      when: ["Mọi dịch vụ đưa vào sản phẩm."],
      whenNot: ["Demo nội bộ nhanh: Streamlit Cloud hoặc Hugging Face Spaces có thể đủ mà không cần tự viết Dockerfile."],
      example: {
        domain: "Hàng không (repo)",
        title: "Container hoá Flight Fare API",
        text: "Image khoảng 400 MB chứa Python, scikit-learn đúng phiên bản đã huấn luyện, mô hình và API. Triển khai lên Cloud Run, tự tắt khi không có request nên chi phí gần như bằng 0 với lưu lượng thấp."
      },
      code: { lang: "dockerfile", src: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY api.py flight_model.joblib ./
EXPOSE 8000
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

# docker build -t flight-fare . && docker run -p 8000:8000 flight-fare` },
      pitfalls: ["Image quá nặng do dùng image cơ sở đầy đủ.", "Đưa secret vào image.", "Không ghim phiên bản thư viện."],
      tools: ["Docker", "Kubernetes", "Cloud Run", "AWS SageMaker", "Vertex AI", "Azure ML"],
      resources: [["Docker — Get started", "https://docs.docker.com/get-started/"], ["Full Stack Deep Learning", "https://fullstackdeeplearning.com/"]]
    },
    {
      id: "tracking", title: "Theo dõi thí nghiệm & Model Registry", level: 2, hours: 6,
      summary: "Ghi lại tham số, metric, dữ liệu và artifact của mỗi lần huấn luyện; quản lý phiên bản mô hình.",
      concept: "Mỗi lần chạy lưu: phiên bản code (commit), phiên bản dữ liệu, siêu tham số, metric, biểu đồ, file mô hình. Model Registry quản lý vòng đời mô hình (ứng viên, đang chạy, lưu trữ) và cho phép rollback. DVC quản lý phiên bản dữ liệu song song với Git.",
      why: ["Trả lời được câu hỏi 'mô hình đang chạy được huấn luyện thế nào, bằng dữ liệu nào'.", "So sánh hàng trăm lần thử có hệ thống."],
      when: ["Làm việc nhóm; dự án kéo dài; yêu cầu kiểm toán."],
      whenNot: ["Bài tập nhỏ một lần: một bảng ghi chép có thể đủ."],
      example: {
        domain: "Hàng không (repo)",
        title: "Tránh nhầm mô hình như trong notebook",
        text: "Notebook lưu reg_rf thay vì mô hình đã tuning. Với MLflow, mỗi lần chạy có metric kèm theo, và mô hình đưa vào production được chọn từ registry theo metric validation, không phụ thuộc biến nào đang nằm trong notebook."
      },
      code: { lang: "python", src: `import mlflow
mlflow.set_experiment("flight-fare")
with mlflow.start_run():
    mlflow.log_params(study.best_params)
    model.fit(X_train, y_train)
    mlflow.log_metric("val_mae", mean_absolute_error(y_val, model.predict(X_val)))
    mlflow.sklearn.log_model(model, name="model", registered_model_name="flight-fare")` },
      pitfalls: ["Chỉ log metric mà không log phiên bản dữ liệu."],
      tools: ["MLflow", "Weights & Biases", "DVC", "Neptune", "Comet"],
      resources: [["MLflow docs", "https://mlflow.org/docs/latest/"]]
    },
    {
      id: "pipelines-cicd", title: "Pipeline tự động, CI/CD và Feature Store", level: 3, hours: 10,
      summary: "Tự động hoá chuỗi thu thập, huấn luyện, đánh giá, triển khai; kiểm thử dữ liệu và mô hình.",
      concept: "Orchestrator (Airflow, Prefect, Dagster, Kubeflow) chạy các bước theo lịch hoặc sự kiện. CI kiểm thử code, kiểm tra dữ liệu (Great Expectations, pandera) và chạy bộ đánh giá mô hình; CD triển khai khi mô hình mới vượt ngưỡng so với mô hình hiện tại. Chiến lược triển khai an toàn: shadow (chạy song song không trả kết quả), canary (vài phần trăm lưu lượng), A/B. Feature store (Feast, Tecton) đảm bảo đặc trưng lúc huấn luyện và phục vụ được tính giống nhau.",
      why: ["Mô hình cần được huấn luyện lại thường xuyên; làm tay thì dễ lỗi và bị bỏ quên.", "Phát hiện dữ liệu hỏng trước khi nó làm hỏng mô hình."],
      when: ["Mô hình chạy thật lâu dài; nhiều mô hình; dữ liệu cập nhật thường xuyên."],
      whenNot: ["Prototype đang tìm product-market fit: tránh xây hạ tầng quá sớm."],
      example: {
        domain: "Fintech",
        title: "Huấn luyện lại mô hình chấm điểm hằng tháng",
        text: "Airflow chạy ngày 1 hằng tháng: lấy dữ liệu mới, kiểm tra chất lượng, huấn luyện, so sánh với mô hình hiện tại trên cùng tập kiểm tra. Nếu tốt hơn, triển khai chế độ shadow 1 tuần rồi mới chuyển lưu lượng thật."
      },
      code: { lang: "yaml", src: `# .github/workflows/train.yml (rút gọn)
name: train-and-evaluate
on:
  schedule: [{ cron: "0 2 1 * *" }]
  workflow_dispatch:
jobs:
  train:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: python -m pytest tests/            # test code + kiểm tra dữ liệu
      - run: python train.py --out model.joblib
      - run: python evaluate.py --candidate model.joblib --min-improvement 0.01` },
      pitfalls: ["Không có tiêu chí tự động để chặn mô hình kém hơn.", "Đặc trưng tính khác nhau giữa huấn luyện và phục vụ."],
      tools: ["Airflow", "Prefect", "Dagster", "Kubeflow", "GitHub Actions", "Feast", "Great Expectations"],
      resources: [["Made With ML — MLOps", "https://madewithml.com/"], ["Google — MLOps: Continuous delivery and automation", "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"]]
    },
    {
      id: "monitoring", title: "Giám sát mô hình: Data drift, Concept drift", level: 3, hours: 6,
      summary: "Phát hiện khi dữ liệu hoặc quan hệ thay đổi làm mô hình kém đi, và quyết định khi nào huấn luyện lại.",
      concept: "Data drift: phân phối đầu vào thay đổi (hãng bay mới, mùa cao điểm). Concept drift: quan hệ giữa đầu vào và target thay đổi (chính sách giá mới). Giám sát ba tầng: hệ thống (độ trễ, lỗi), dữ liệu (thiếu, ngoài khoảng, drift đo bằng PSI hoặc kiểm định Kolmogorov–Smirnov), và hiệu năng (khi nhãn thật về, thường bị trễ). Đặt ngưỡng cảnh báo và quy trình huấn luyện lại.",
      why: ["Mô hình không hỏng ồn ào như phần mềm: nó lặng lẽ dự đoán sai dần.", "Các báo cáo MLOps 2026 coi giám sát real-time là yêu cầu cơ bản."],
      when: ["Mọi mô hình đang chạy thật."],
      whenNot: ["Không huấn luyện lại tự động mù quáng khi có drift: kiểm tra nguyên nhân (có thể là lỗi pipeline dữ liệu)."],
      example: {
        domain: "Hàng không",
        title: "Giá vé sau biến động nhiên liệu",
        text: "Sau khi giá nhiên liệu tăng mạnh, các hãng tăng giá đồng loạt. Phân phối đầu vào không đổi nhiều nhưng sai số dự đoán tăng: đây là concept drift. Dashboard MAE theo tuần phát hiện sau 5 ngày và kích hoạt huấn luyện lại với dữ liệu mới."
      },
      code: { lang: "python", src: `import numpy as np
def psi(expected, actual, bins=10):
    """Population Stability Index: <0.1 ổn định, 0.1-0.25 cần chú ý, >0.25 drift đáng kể"""
    cuts = np.quantile(expected, np.linspace(0, 1, bins + 1))
    cuts[0], cuts[-1] = -np.inf, np.inf
    e = np.histogram(expected, cuts)[0] / len(expected)
    a = np.histogram(actual, cuts)[0] / len(actual)
    e, a = np.clip(e, 1e-6, None), np.clip(a, 1e-6, None)
    return np.sum((a - e) * np.log(a / e))

print(psi(train["Duration_min"], last_week["Duration_min"]))
# Hoặc dùng Evidently: Report(metrics=[DataDriftPreset()]).run(reference, current)` },
      pitfalls: ["Không log dự đoán kèm định danh để nối với nhãn thật sau này.", "Cảnh báo quá nhiều khiến mọi người bỏ qua."],
      tools: ["Evidently", "NannyML", "Arize", "WhyLabs", "Prometheus + Grafana"],
      resources: [["Evidently — What is data drift", "https://www.evidentlyai.com/ml-in-production/data-drift"]]
    }
  ]
},
{
  id: "s12", track: "ops", title: "Big Data & Data Engineering cho DS",
  subtitle: "Khi dữ liệu không còn vừa một máy",
  weeks: "3 tuần",
  goal: "Xử lý dữ liệu lớn bằng Spark và DuckDB, hiểu kiến trúc kho dữ liệu và lakehouse, viết pipeline ETL/ELT cơ bản.",
  modules: [
    {
      id: "spark", title: "Apache Spark (PySpark) và DuckDB", level: 3, hours: 12,
      summary: "Xử lý phân tán hàng trăm GB đến PB; DuckDB cho phân tích cực nhanh trên một máy.",
      concept: "Spark chia dữ liệu thành partition xử lý song song trên cluster, đánh giá lười (lazy) và tối ưu kế hoạch thực thi. DataFrame API giống Pandas và SQL. Tránh shuffle không cần thiết (groupBy, join lớn), dùng broadcast join cho bảng nhỏ. DuckDB là database phân tích nhúng, chạy SQL trực tiếp trên file Parquet/CSV, thường đủ cho dữ liệu vài chục đến vài trăm GB trên một máy mạnh.",
      why: ["Dữ liệu log, giao dịch, sự kiện ở doanh nghiệp lớn vượt xa bộ nhớ một máy.", "Spark MLlib huấn luyện mô hình phân tán."],
      when: ["Dữ liệu trên 100 GB, xử lý ETL định kỳ quy mô lớn, nền tảng Databricks hoặc EMR."],
      whenNot: ["Dữ liệu vài GB: Pandas, Polars hoặc DuckDB nhanh hơn và đơn giản hơn nhiều so với dựng cluster."],
      example: {
        domain: "Viễn thông",
        title: "Tổng hợp 5 tỉ bản ghi cuộc gọi mỗi tháng",
        text: "Job PySpark trên Databricks tổng hợp CDR thành đặc trưng theo thuê bao (số phút gọi, số lần rớt cuộc gọi, số người liên lạc) để đưa vào mô hình churn."
      },
      code: { lang: "python", src: `from pyspark.sql import SparkSession, functions as F
spark = SparkSession.builder.appName("cdr-features").getOrCreate()
cdr = spark.read.parquet("s3://bucket/cdr/2026-08/")
feat = (cdr.groupBy("subscriber_id")
           .agg(F.sum("duration_sec").alias("total_sec"),
                F.countDistinct("callee").alias("n_contacts"),
                F.avg(F.col("dropped").cast("int")).alias("drop_rate")))
feat.write.mode("overwrite").parquet("s3://bucket/features/churn/2026-08/")

# DuckDB: SQL trực tiếp trên Parquet, không cần server
import duckdb
duckdb.sql("SELECT Airline, median(Price) FROM 'flights.parquet' GROUP BY 1").df()` },
      pitfalls: ["collect() toàn bộ dữ liệu về driver.", "Dùng UDF Python thay cho hàm có sẵn (chậm)."],
      tools: ["PySpark", "Databricks", "DuckDB", "Polars", "Dask"],
      resources: [["Spark — PySpark docs", "https://spark.apache.org/docs/latest/api/python/"], ["DuckDB docs", "https://duckdb.org/docs/"]]
    },
    {
      id: "warehouse", title: "Kho dữ liệu, Lakehouse và ETL/ELT", level: 2, hours: 8,
      summary: "Data warehouse, data lake, lakehouse (Delta, Iceberg), mô hình hoá dữ liệu, dbt.",
      concept: "Data warehouse (BigQuery, Snowflake, Redshift) lưu dữ liệu có cấu trúc đã làm sạch cho phân tích. Data lake lưu mọi dạng dữ liệu thô trên object storage giá rẻ. Lakehouse kết hợp hai thứ với định dạng bảng mở (Delta Lake, Apache Iceberg) hỗ trợ giao dịch và time travel. ELT: nạp dữ liệu thô vào kho rồi biến đổi bằng SQL (dbt). Mô hình hoá dạng sao (bảng fact và dimension) giúp truy vấn nhanh và dễ hiểu.",
      why: ["Data scientist dành nhiều thời gian lấy dữ liệu; hiểu kiến trúc giúp làm việc hiệu quả với data engineer.", "Đặc trưng tái sử dụng được viết một lần trong dbt."],
      when: ["Doanh nghiệp có nhiều nguồn dữ liệu cần hợp nhất; báo cáo và ML dùng chung một nguồn sự thật."],
      whenNot: ["Startup giai đoạn đầu với một database: đọc bản sao chỉ đọc (read replica) là đủ."],
      example: {
        domain: "Bán lẻ đa kênh",
        title: "Một nguồn sự thật cho doanh thu",
        text: "Dữ liệu từ website, app, POS cửa hàng, sàn thương mại điện tử được nạp vào BigQuery; các model dbt tạo bảng fact_orders và dim_customers. Dashboard doanh thu và mô hình churn cùng đọc từ đó nên con số khớp nhau."
      },
      code: { lang: "sql", src: `-- models/marts/fct_customer_features.sql (dbt)
{{ config(materialized='table') }}
select
  c.customer_id,
  c.region,
  count(o.order_id)                          as n_orders_90d,
  sum(o.amount)                              as revenue_90d,
  date_diff(current_date, max(o.order_date), day) as recency_days
from {{ ref('dim_customers') }} c
left join {{ ref('fct_orders') }} o
  on o.customer_id = c.customer_id
 and o.order_date >= date_sub(current_date, interval 90 day)
group by 1, 2` },
      pitfalls: ["Mỗi nhóm tự định nghĩa 'khách hàng hoạt động' khác nhau."],
      tools: ["BigQuery", "Snowflake", "Databricks", "dbt", "Airbyte", "Delta Lake", "Apache Iceberg"],
      resources: [["dbt — Learn", "https://docs.getdbt.com/docs/introduction"]]
    }
  ]
},
{
  id: "s13", track: "ops", title: "Case study: Flight Fare Prediction (repo này)",
  subtitle: "Áp dụng toàn bộ roadmap vào dự án có sẵn trong AI/Flight_Fare_Prediction",
  weeks: "1–2 tuần",
  goal: "Đọc hiểu dự án hiện tại, xác định các điểm cần cải thiện, và nâng cấp thành một dự án portfolio đạt chuẩn sản phẩm.",
  modules: [
    {
      id: "case-current", title: "Dự án hiện tại làm gì", level: 1, hours: 3,
      summary: "Notebook EDA + feature engineering + Random Forest, và Flask app nhận form để dự đoán giá vé.",
      concept: "Dữ liệu: Data_Train.xlsx gồm 10.683 chuyến bay (Test_set.xlsx 2.671 chuyến, không có Price) nội địa Ấn Độ năm 2019 với các cột Airline, Date_of_Journey, Source, Destination, Route, Dep_Time, Arrival_Time, Duration, Total_Stops, Additional_Info, Price. Quy trình trong flight_price.ipynb: bỏ dòng thiếu → tách ngày, giờ, phút → đổi Duration thành giờ và phút → one-hot Airline/Source/Destination → map Total_Stops → bỏ Route và Additional_Info → ExtraTrees để xem độ quan trọng → RandomForestRegressor → RandomizedSearchCV → lưu pickle. app.py (Flask) render home.html, nhận form, tự tạo các cột one-hot và gọi model.predict.",
      why: ["Là ví dụ trọn vẹn từ dữ liệu đến web app, rất phù hợp để học vòng đời dự án."],
      when: ["Dùng làm bài thực hành tổng hợp sau khi học xong giai đoạn 5 và 11."],
      whenNot: ["Không dùng mô hình này để định giá thật: dữ liệu năm 2019, chỉ thị trường Ấn Độ, thiếu đặc trưng số ngày đặt trước."],
      example: {
        domain: "Hàng không",
        title: "Luồng dữ liệu",
        text: "Excel → pandas (làm sạch, tạo đặc trưng) → X (29 đặc trưng, 10.682 dòng) và y (Price) → train_test_split 80/20 → RandomForestRegressor (R² train 0,953, test 0,798; MAE 1.174 rupee) → flight_rf.pkl → Flask /predict → HTML hiển thị giá."
      },
      pitfalls: [],
      tools: ["pandas", "scikit-learn", "Flask", "flask-cors", "seaborn"],
      resources: [["Tìm bộ dữ liệu Flight Fare trên Kaggle", "https://www.kaggle.com/search?q=flight+fare+prediction"]]
    },
    {
      id: "case-issues", title: "Các vấn đề phát hiện được và cách sửa", level: 2, hours: 4,
      summary: "Bảy điểm cụ thể trong code hiện tại, mỗi điểm gắn với một chủ đề của roadmap.",
      concept: "1) Đường dẫn tuyệt đối D:/... trong app.py và notebook nên không chạy được trên máy khác (Git & môi trường). 2) Thời lượng tính bằng abs(Arrival_hour - Dep_hour) sai với chuyến qua nửa đêm (Feature engineering). 3) Mã hoá one-hot viết tay bằng if/elif dài, dễ lệch với lúc huấn luyện (Pipeline). 4) Lưu reg_rf chưa tuning thay vì rf_random.best_estimator_ (Theo dõi thí nghiệm). 5) max_features='auto' và sns.distplot đã bị loại bỏ trong phiên bản thư viện mới (Môi trường). 6) Chỉ chia ngẫu nhiên, chưa kiểm tra theo thời gian (Validation). 7) Pickle không an toàn khi load file không tin cậy và phụ thuộc phiên bản scikit-learn (Triển khai).",
      why: ["Mỗi lỗi là một bài học thực tế thường gặp ở dự án đầu tiên."],
      when: ["Trước khi đưa dự án vào portfolio hoặc triển khai."],
      whenNot: [],
      example: {
        domain: "Hàng không (repo)",
        title: "Kiểm chứng lỗi thời lượng",
        text: "Chuyến IndiGo khởi hành 22:20, đến 01:10 hôm sau (Duration thực tế 2h 50m). app.py tính dur_hour = |1 - 22| = 21 và dur_min = |10 - 20| = 10, tức 21 giờ 10 phút. Mô hình nhận đặc trưng sai nên dự đoán giá cao bất thường."
      },
      code: { lang: "python", src: `# Trước (app.py)
dur_hour = abs(Arrival_hour - Dep_hour)
dur_min = abs(Arrival_min - Dep_min)

# Sau
dep = pd.to_datetime(request.form["Dep_Time"], format="%Y-%m-%dT%H:%M")
arr = pd.to_datetime(request.form["Arrival_Time"], format="%Y-%m-%dT%H:%M")
if arr <= dep:
    arr += pd.Timedelta(days=1)          # đến vào ngày hôm sau
total_min = int((arr - dep).total_seconds() // 60)
dur_hour, dur_min = divmod(total_min, 60)

# Đường dẫn tương đối
from pathlib import Path
model = pickle.load(open(Path(__file__).parent / "flight_rf.pkl", "rb"))` },
      pitfalls: [],
      tools: [],
      resources: []
    },
    {
      id: "case-upgrade", title: "Lộ trình nâng cấp thành dự án portfolio", level: 3, hours: 20,
      summary: "Tám bước nâng cấp, mỗi bước áp dụng một giai đoạn trong roadmap.",
      concept: "B1: Tạo requirements.txt, cấu trúc src/, notebooks/, data/, models/; đường dẫn tương đối. B2: Viết lại tiền xử lý thành Pipeline + ColumnTransformer; thêm Duration_min và cờ qua đêm. B3: Chia validation theo thời gian (train tháng 3–5, test tháng 6). B4: So sánh baseline (trung vị theo tuyến), Ridge, Random Forest, LightGBM/CatBoost với log(Price); tuning bằng Optuna. B5: Giải thích bằng SHAP; viết phần nhận xét nghiệp vụ. B6: Log thí nghiệm bằng MLflow, lưu Pipeline tốt nhất bằng joblib. B7: FastAPI + Pydantic, Dockerfile, test bằng pytest, CI bằng GitHub Actions. B8: Ghi log dự đoán và báo cáo drift bằng Evidently; README có sơ đồ kiến trúc và kết quả.",
      why: ["Nhà tuyển dụng đánh giá cao dự án cho thấy tư duy sản phẩm hơn là điểm số cao trên notebook."],
      when: ["Sau khi hoàn thành các giai đoạn 0–11."],
      whenNot: [],
      example: {
        domain: "Portfolio",
        title: "Kết quả mong đợi",
        text: "Một repo có thể chạy bằng một lệnh docker run, API có tài liệu /docs, bảng so sánh mô hình kèm MAE trên tập kiểm tra theo thời gian, biểu đồ SHAP, và báo cáo drift mẫu. README giải thích lựa chọn và giới hạn của mô hình."
      },
      code: { lang: "bash", src: `flight-fare/
├── data/raw/                # Data_Train.xlsx, Test_set.xlsx (DVC hoặc tải script)
├── notebooks/01_eda.ipynb
├── src/features.py          # Pipeline, ColumnTransformer
├── src/train.py             # Optuna + MLflow, lưu models/flight_model.joblib
├── src/api.py               # FastAPI
├── tests/test_api.py        # pytest: đầu vào sai trả 422, chuyến qua đêm đúng thời lượng
├── Dockerfile
├── requirements.txt
└── .github/workflows/ci.yml` },
      pitfalls: ["Cố làm tất cả cùng lúc: hãy commit từng bước để lịch sử Git kể lại quá trình."],
      tools: ["scikit-learn", "LightGBM", "Optuna", "SHAP", "MLflow", "FastAPI", "Docker", "GitHub Actions", "Evidently"],
      resources: [["Made With ML", "https://madewithml.com/"]]
    }
  ]
}
);

/* Bảng chọn thuật toán nhanh */
window.ROADMAP_GUIDE = [
  ["Dự đoán số, dữ liệu bảng, cần giải thích", "Hồi quy tuyến tính / Ridge / Lasso", "linear-regression"],
  ["Dự đoán số hoặc lớp, dữ liệu bảng, cần độ chính xác cao", "LightGBM / XGBoost / CatBoost", "boosting"],
  ["Baseline mạnh, ít thời gian tinh chỉnh", "Random Forest", "random-forest"],
  ["Phân loại có xác suất, ngành có quản lý", "Hồi quy Logistic", "logistic-regression"],
  ["Phân loại văn bản, ít tài nguyên", "TF-IDF + LinearSVC / Naive Bayes", "svm"],
  ["Phân loại văn bản, cần độ chính xác cao", "Tinh chỉnh Transformer (PhoBERT, XLM-R)", "transformer"],
  ["Lớp cần phát hiện rất hiếm", "GBDT + class weight + chọn ngưỡng theo PR", "imbalanced"],
  ["Không có nhãn, muốn chia nhóm", "K-Means (cầu) / HDBSCAN (hình dạng bất kỳ)", "kmeans"],
  ["Không có nhãn, tìm điểm lạ", "Isolation Forest / LOF", "anomaly"],
  ["Quá nhiều đặc trưng, muốn trực quan hoá", "PCA (tiền xử lý) / UMAP (trực quan)", "pca"],
  ["Dự báo một vài chuỗi thời gian", "Seasonal naive → ETS / ARIMA / Prophet", "ts-basics"],
  ["Dự báo hàng nghìn chuỗi có đặc trưng ngoại sinh", "LightGBM toàn cục với lag features", "ts-ml"],
  ["Ảnh: phân loại, phát hiện lỗi", "Transfer learning CNN / ViT, YOLO", "cnn"],
  ["Hỏi đáp trên tài liệu nội bộ", "RAG (hybrid search + rerank)", "rag"],
  ["Định dạng, giọng văn cố định, khối lượng lớn", "Fine-tuning LoRA (thường kết hợp RAG)", "finetuning"],
  ["Gợi ý sản phẩm", "Item-item CF → Matrix factorization → Two-tower + ranking", "recsys"]
];

window.ROADMAP_SOURCES = [
  ["Dataquest — Data Scientist Roadmap for Beginners (2026–2027)", "https://www.dataquest.io/blog/data-scientist-roadmap-for-beginners/"],
  ["KDnuggets — The 2026 Data Science Starter Kit", "https://www.kdnuggets.com/the-2026-data-science-starter-kit-what-to-learn-first-and-what-to-ignore"],
  ["365 Data Science — The Ultimate Data Science Roadmap (2026)", "https://365datascience.com/career-advice/career-guides/data-science-roadmap/"],
  ["lakeFS — 26 MLOps Tools for 2026", "https://lakefs.io/mlops/mlops-tools/"],
  ["DeviDevs — MLOps Tools Comparison 2026", "https://devidevs.com/blog/mlops-tools-comparison-2026-complete-stack"],
  ["Winder.ai — RAG vs Fine-Tuning in 2026: A Decision Framework", "https://winder.ai/rag-vs-fine-tuning-2026-decision-framework/"],
  ["Databricks — RAG vs Fine Tuning", "https://www.databricks.com/blog/rag-vs-fine-tuning"],
  ["Shwartz-Ziv & Armon — Tabular Data: Deep Learning is Not All You Need", "https://arxiv.org/abs/2106.03253"],
  ["MLAIA — Tabular Data in 2026: Do GBDTs Still Beat Deep Learning?", "https://www.mlaia.com/blog-tabular-data-ml-vs-dl.html"],
  ["An Introduction to Statistical Learning (ISLP)", "https://www.statlearning.com/"],
  ["Forecasting: Principles and Practice (fpp3)", "https://otexts.com/fpp3/"],
  ["Dive into Deep Learning", "https://d2l.ai/"]
];
