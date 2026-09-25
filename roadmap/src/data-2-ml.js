/* Giai đoạn 4–7: Feature engineering, ML có giám sát, Đánh giá, Không giám sát */
window.ROADMAP = window.ROADMAP || [];
window.ROADMAP.push(
{
  id: "s4", track: "data", title: "Feature Engineering",
  subtitle: "Biến dữ liệu thô thành tín hiệu mô hình học được",
  weeks: "2–3 tuần",
  goal: "Mã hoá biến phân loại, chuẩn hoá, tạo đặc trưng thời gian, chọn đặc trưng, xử lý mất cân bằng, và gói tất cả vào Pipeline.",
  modules: [
    {
      id: "encoding", title: "Mã hoá biến phân loại", level: 1, hours: 6,
      summary: "One-hot, ordinal, target encoding, native categorical: chọn theo loại biến và số lượng giá trị.",
      concept: "Biến danh nghĩa (nominal) không có thứ tự như hãng bay, thành phố: dùng one-hot. Biến thứ bậc (ordinal) như số điểm dừng, trình độ học vấn: dùng mã số theo thứ tự. Biến có rất nhiều giá trị (high cardinality) như mã sản phẩm, mã bưu chính: dùng target encoding (có cross-fitting), hashing, hoặc embedding. LightGBM và CatBoost xử lý biến phân loại trực tiếp.",
      why: [
        "Mô hình chỉ làm việc với số; mã hoá sai tạo ra thứ tự giả (Hà Nội=1 < HCM=2).",
        "Chọn đúng cách mã hoá giảm số chiều và tránh overfit."
      ],
      when: [
        "One-hot: dưới khoảng 15–20 giá trị, dùng cho mô hình tuyến tính, KNN, SVM.",
        "Ordinal: biến có thứ tự tự nhiên; hoặc cho mô hình cây.",
        "Target encoding: hàng trăm đến hàng nghìn giá trị."
      ],
      whenNot: [
        "Target encoding không có cross-fitting sẽ rò rỉ target và overfit mạnh.",
        "pd.get_dummies riêng lẻ trên train và test: số cột lệch nhau khi test có giá trị mới."
      ],
      example: {
        domain: "Hàng không (repo)",
        title: "Airline, Source, Destination và Total_Stops",
        text: "Notebook dùng get_dummies(drop_first=True) cho Airline, Source, Destination (nominal) và map 'non-stop'→0, '1 stop'→1… cho Total_Stops (ordinal). Đúng về khái niệm, nhưng app.py phải viết hàng trăm dòng if/elif để tái tạo one-hot. Dùng OneHotEncoder trong Pipeline sẽ loại bỏ toàn bộ đoạn code đó và tránh lệch cột."
      },
      code: { lang: "python", src: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, TargetEncoder

pre = ColumnTransformer([
    ("nominal", OneHotEncoder(handle_unknown="ignore", min_frequency=20),
        ["Airline", "Source", "Destination"]),
    ("ordinal", OrdinalEncoder(categories=[["non-stop", "1 stop", "2 stops",
                                            "3 stops", "4 stops"]]),
        ["Total_Stops"]),
    ("high_card", TargetEncoder(target_type="continuous"), ["Route"]),  # cross-fitting sẵn
], remainder="passthrough")` },
      pitfalls: ["Quên handle_unknown='ignore' khiến API lỗi khi gặp hãng bay mới.", "One-hot biến có 10.000 giá trị làm bùng nổ bộ nhớ."],
      tools: ["scikit-learn", "category_encoders", "CatBoost"],
      resources: [["scikit-learn — Encoding categorical features", "https://scikit-learn.org/stable/modules/preprocessing.html#encoding-categorical-features"]]
    },
    {
      id: "scaling", title: "Chuẩn hoá, biến đổi và đặc trưng mới", level: 1, hours: 8,
      summary: "StandardScaler, MinMax, log/Box-Cox, binning, đặc trưng thời gian, tương tác và đặc trưng tổng hợp.",
      concept: "Chuẩn hoá (scaling) đưa các đặc trưng về cùng thang đo. StandardScaler (trung bình 0, độ lệch 1) cho mô hình tuyến tính, SVM, KNN, mạng nơ-ron; RobustScaler khi có ngoại lệ. Biến đổi log giảm độ lệch. Đặc trưng thời gian: giờ, thứ, ngày lễ, mã hoá chu kỳ sin/cos. Đặc trưng tổng hợp: trung bình theo nhóm, tỉ lệ, số ngày kể từ sự kiện. Kiến thức nghiệp vụ tạo ra đặc trưng tốt nhất.",
      why: [
        "Một đặc trưng tốt thường giá trị hơn việc đổi thuật toán.",
        "Thuật toán dựa trên khoảng cách hoặc gradient bị chi phối bởi đặc trưng có thang lớn nếu không chuẩn hoá."
      ],
      when: [
        "Scaling: Linear/Logistic có regularization, SVM, KNN, K-means, PCA, neural net.",
        "Log: target hoặc đặc trưng lệch phải như giá, thu nhập, lượt xem."
      ],
      whenNot: ["Mô hình cây (Decision Tree, Random Forest, XGBoost) không cần scaling."],
      example: {
        domain: "Hàng không (repo)",
        title: "Sửa lỗi tính thời lượng bay qua nửa đêm",
        text: "app.py tính dur_hour = abs(Arrival_hour - Dep_hour). Chuyến bay 22:00 đến 01:30 hôm sau cho ra 21 giờ thay vì 3,5 giờ. Cách đúng là trừ hai datetime đầy đủ. Ngoài ra, đặc trưng 'số ngày trước khi bay' (ngày đặt đến ngày bay) thường là yếu tố giá mạnh nhất trong thực tế nhưng dữ liệu hiện chưa có."
      },
      code: { lang: "python", src: `import numpy as np, pandas as pd
dep = pd.to_datetime("2026-10-01T22:00")
arr = pd.to_datetime("2026-10-02T01:30")
duration_min = (arr - dep).total_seconds() / 60      # 210, không phải 1290

df["dep_hour_sin"] = np.sin(2 * np.pi * df["Dep_hour"] / 24)   # 23h gần 0h
df["dep_hour_cos"] = np.cos(2 * np.pi * df["Dep_hour"] / 24)
df["is_weekend"] = pd.to_datetime(df["Date_of_Journey"], dayfirst=True).dt.dayofweek >= 5
df["log_price"] = np.log1p(df["Price"])              # dự đoán log rồi expm1` },
      pitfalls: ["Fit scaler trên toàn bộ dữ liệu trước khi chia tập (rò rỉ).", "Dự đoán log(y) nhưng báo cáo metric trên thang log mà không đổi ngược."],
      tools: ["scikit-learn preprocessing", "Featuretools", "tsfresh"],
      resources: [
        ["Feature Engineering and Selection (Kuhn & Johnson, miễn phí)", "https://www.feat.engineering/"],
        ["Kaggle Learn — Feature Engineering", "https://www.kaggle.com/learn/feature-engineering"]
      ]
    },
    {
      id: "feature-selection", title: "Lựa chọn đặc trưng", level: 2, hours: 6,
      summary: "Filter (tương quan, mutual information), wrapper (RFE), embedded (L1, feature importance), permutation importance.",
      concept: "Chọn đặc trưng giảm nhiễu, tăng tốc và làm mô hình dễ giải thích. Filter: đánh giá từng đặc trưng độc lập với mô hình. Wrapper: thử tập con bằng mô hình (RFE). Embedded: chọn trong lúc huấn luyện (Lasso đẩy hệ số về 0, importance của cây). Permutation importance đo mức giảm hiệu năng khi xáo trộn một cột, đáng tin hơn impurity importance vốn thiên vị đặc trưng có nhiều giá trị.",
      why: ["Loại đặc trưng gây rò rỉ hoặc nhiễu.", "Mô hình nhỏ hơn, nhanh hơn khi phục vụ."],
      when: ["Hàng trăm đến hàng nghìn đặc trưng; cần giải thích; chi phí thu thập đặc trưng cao."],
      whenNot: ["Chọn đặc trưng trên toàn bộ dữ liệu rồi mới cross-validation: kết quả bị lạc quan quá mức."],
      example: {
        domain: "Hàng không (repo)",
        title: "ExtraTreesRegressor để xếp hạng đặc trưng",
        text: "Notebook dùng feature_importances_ của ExtraTreesRegressor. Để kiểm chứng, dùng permutation_importance trên tập validation: nếu Journey_day vẫn quan trọng, có thể do giá theo mùa, cần kiểm tra thêm để chắc đó không phải đặc thù của tập dữ liệu."
      },
      code: { lang: "python", src: `from sklearn.inspection import permutation_importance
r = permutation_importance(model, X_val, y_val, n_repeats=10,
                           scoring="neg_mean_absolute_error", random_state=0)
imp = pd.Series(r.importances_mean, index=X_val.columns).sort_values()
print(imp.tail(10))` },
      pitfalls: ["Tin tuyệt đối vào impurity importance.", "Loại đặc trưng tương quan cao nhau khi dùng mô hình cây (thường không cần)."],
      tools: ["scikit-learn feature_selection", "Boruta", "SHAP"],
      resources: [["scikit-learn — Permutation importance", "https://scikit-learn.org/stable/modules/permutation_importance.html"]]
    },
    {
      id: "imbalanced", title: "Dữ liệu mất cân bằng", level: 2, hours: 5,
      summary: "Khi lớp quan tâm chỉ chiếm 0,1–5%: class weight, resampling, chọn ngưỡng và metric phù hợp.",
      concept: "Trong gian lận, bệnh hiếm, churn, lớp dương rất ít. Accuracy vô nghĩa (dự đoán toàn âm vẫn đạt 99%). Giải pháp theo thứ tự ưu tiên: dùng metric đúng (PR-AUC, recall ở precision cố định), class_weight='balanced', điều chỉnh ngưỡng quyết định theo chi phí, và cuối cùng mới đến resampling (undersampling, SMOTE) chỉ trên tập train.",
      why: ["Tránh mô hình bỏ qua hoàn toàn lớp hiếm.", "Tối ưu theo chi phí thật: bỏ sót gian lận đắt hơn nhiều so với cảnh báo nhầm."],
      when: ["Tỉ lệ lớp hiếm dưới khoảng 10%."],
      whenNot: ["Không oversample trước khi chia train/test hoặc trước cross-validation.", "Không báo cáo metric trên dữ liệu đã resample."],
      example: {
        domain: "Ngân hàng",
        title: "Phát hiện giao dịch thẻ gian lận",
        text: "0,17% giao dịch là gian lận. Mô hình XGBoost với scale_pos_weight và ngưỡng chọn sao cho precision ≥ 80% bắt được khoảng 75% gian lận, trong khi đội kiểm tra chỉ phải xem xét vài trăm giao dịch mỗi ngày."
      },
      code: { lang: "python", src: `from sklearn.metrics import precision_recall_curve, average_precision_score
proba = clf.predict_proba(X_val)[:, 1]
print("PR-AUC:", average_precision_score(y_val, proba))

prec, rec, thr = precision_recall_curve(y_val, proba)
ok = prec[:-1] >= 0.80
best_thr = thr[ok][rec[:-1][ok].argmax()]   # ngưỡng recall cao nhất với precision >= 80%
print("Ngưỡng:", best_thr)` },
      pitfalls: ["Dùng accuracy và ROC-AUC khi lớp cực hiếm (ROC-AUC trông đẹp một cách lừa dối)."],
      tools: ["imbalanced-learn", "scikit-learn class_weight", "XGBoost scale_pos_weight"],
      resources: [["imbalanced-learn docs", "https://imbalanced-learn.org/stable/"]]
    },
    {
      id: "pipelines", title: "Pipeline trong scikit-learn", level: 2, hours: 5,
      summary: "Gói tiền xử lý và mô hình thành một đối tượng duy nhất để huấn luyện, đánh giá và triển khai.",
      concept: "Pipeline nối các bước transform và estimator. ColumnTransformer áp dụng xử lý khác nhau cho từng nhóm cột. Khi fit Pipeline trong cross-validation, mọi bước (imputer, scaler, encoder) chỉ học từ fold train, nên loại bỏ rò rỉ. Lưu Pipeline bằng joblib, và phía API chỉ cần gọi predict trên DataFrame thô.",
      why: [
        "Loại bỏ lệch giữa xử lý lúc huấn luyện và lúc phục vụ (training-serving skew).",
        "Tuning siêu tham số cho cả tiền xử lý lẫn mô hình.",
        "Code API ngắn và ít lỗi."
      ],
      when: ["Mọi dự án scikit-learn định đưa vào sử dụng."],
      whenNot: ["Bước biến đổi phụ thuộc thứ tự thời gian phức tạp: có thể cần feature store hoặc code riêng."],
      example: {
        domain: "Hàng không (repo)",
        title: "Thay 300 dòng if/elif trong app.py",
        text: "Toàn bộ khối mã hoá hãng bay, điểm đi, điểm đến trong app.py được thay bằng một Pipeline lưu cùng mô hình. API chỉ còn dựng DataFrame một dòng từ form và gọi pipe.predict."
      },
      code: { lang: "python", src: `from sklearn.pipeline import make_pipeline
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.compose import TransformedTargetRegressor
import joblib, numpy as np

pipe = make_pipeline(pre, HistGradientBoostingRegressor(random_state=0))
model = TransformedTargetRegressor(pipe, func=np.log1p, inverse_func=np.expm1)
model.fit(X_train, y_train)
joblib.dump(model, "flight_model.joblib")

# Trong API
model = joblib.load("flight_model.joblib")
price = model.predict(pd.DataFrame([form_dict]))[0]` },
      pitfalls: ["Lưu mô hình nhưng quên lưu encoder.", "Khác phiên bản scikit-learn giữa lúc lưu và lúc load."],
      tools: ["scikit-learn Pipeline", "joblib", "skops (lưu an toàn hơn pickle)"],
      resources: [["scikit-learn — Pipelines and composite estimators", "https://scikit-learn.org/stable/modules/compose.html"]]
    }
  ]
},
{
  id: "s5", track: "ml", title: "Machine Learning có giám sát",
  subtitle: "Học từ dữ liệu có nhãn để dự đoán số hoặc lớp",
  weeks: "6–8 tuần",
  goal: "Hiểu trực giác, giả định, ưu nhược điểm và trường hợp áp dụng của các thuật toán cốt lõi; biết chọn thuật toán cho bài toán cụ thể.",
  modules: [
    {
      id: "linear-regression", title: "Hồi quy tuyến tính, Ridge, Lasso, ElasticNet", level: 1, hours: 10,
      summary: "Mô hình cơ sở cho bài toán dự đoán số; dễ giải thích, nhanh, là baseline bắt buộc.",
      concept: "ŷ = w₀ + w₁x₁ + … + wₚxₚ, tìm w tối thiểu tổng bình phương sai số. Giả định: quan hệ tuyến tính, sai số độc lập, phương sai đồng nhất, ít đa cộng tuyến. Regularization thêm phạt vào loss: Ridge (L2) co hệ số, xử lý đa cộng tuyến; Lasso (L1) đẩy hệ số về 0, tự chọn đặc trưng; ElasticNet kết hợp cả hai.",
      why: ["Hệ số diễn giải trực tiếp: tăng 1 đơn vị x thì y đổi w đơn vị.", "Baseline nhanh để biết mô hình phức tạp có đáng không.", "Ít overfit với dữ liệu nhỏ."],
      when: ["Cần giải thích cho người ra quyết định; dữ liệu ít; quan hệ gần tuyến tính; dự báo nhu cầu, định giá cơ bản, phân tích marketing mix."],
      whenNot: ["Quan hệ phi tuyến mạnh và tương tác phức tạp (dùng mô hình cây).", "Ngoại lệ nhiều (dùng HuberRegressor)."],
      example: {
        domain: "Marketing",
        title: "Marketing Mix Model",
        text: "Doanh số tuần được hồi quy theo chi tiêu TV, Facebook, Google Ads (đã biến đổi adstock) và mùa vụ. Hệ số cho biết mỗi 1 triệu chi thêm vào kênh nào mang lại bao nhiêu doanh thu, từ đó phân bổ lại ngân sách."
      },
      code: { lang: "python", src: `from sklearn.linear_model import RidgeCV, LassoCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ridge = make_pipeline(StandardScaler(), RidgeCV(alphas=np.logspace(-3, 3, 20)))
ridge.fit(X_train, y_train)
print("R2 test:", ridge.score(X_test, y_test))

lasso = make_pipeline(StandardScaler(), LassoCV(cv=5)).fit(X_train, y_train)
coef = pd.Series(lasso[-1].coef_, index=X_train.columns)
print("Đặc trưng bị loại:", list(coef[coef == 0].index))` },
      pitfalls: ["Không chuẩn hoá trước Ridge/Lasso.", "Diễn giải hệ số như quan hệ nhân quả.", "Ngoại suy ngoài khoảng dữ liệu đã thấy."],
      tools: ["scikit-learn", "statsmodels (p-value, khoảng tin cậy)"],
      resources: [
        ["An Introduction to Statistical Learning (ISLP, miễn phí)", "https://www.statlearning.com/"],
        ["StatQuest — Linear Regression", "https://www.youtube.com/watch?v=nk2CQITm_eo"]
      ]
    },
    {
      id: "logistic-regression", title: "Hồi quy Logistic", level: 1, hours: 8,
      summary: "Baseline cho phân loại: trả về xác suất đã hiệu chỉnh tốt, hệ số diễn giải được qua odds ratio.",
      concept: "Áp dụng hàm sigmoid lên tổ hợp tuyến tính: P(y=1) = 1 / (1 + e^-(w·x)). Huấn luyện bằng tối thiểu log-loss. exp(w) là odds ratio: tăng 1 đơn vị x nhân odds lên exp(w) lần. Mở rộng cho nhiều lớp bằng softmax (multinomial).",
      why: ["Nhanh, ổn định, xác suất đáng tin để ra quyết định theo ngưỡng.", "Được chấp nhận trong ngành có quản lý (ngân hàng, bảo hiểm) nhờ khả năng giải thích."],
      when: ["Chấm điểm tín dụng, dự đoán click, churn, phân loại văn bản với TF-IDF (rất mạnh khi dữ liệu thưa)."],
      whenNot: ["Ranh giới quyết định phi tuyến phức tạp mà không có feature engineering."],
      example: {
        domain: "Ngân hàng",
        title: "Scorecard tín dụng",
        text: "Ngân hàng xây mô hình logistic trên các biến đã được binning và mã hoá WoE. Mỗi bin tương ứng một số điểm; nhân viên thẩm định và cơ quan quản lý đọc được vì sao hồ sơ bị từ chối."
      },
      code: { lang: "python", src: `from sklearn.linear_model import LogisticRegression
clf = make_pipeline(StandardScaler(),
                    LogisticRegression(C=1.0, class_weight="balanced", max_iter=1000))
clf.fit(X_train, y_train)
proba = clf.predict_proba(X_test)[:, 1]
odds = pd.Series(np.exp(clf[-1].coef_[0]), index=X_train.columns).sort_values()
print(odds.tail())    # đặc trưng làm tăng odds nhiều nhất` },
      pitfalls: ["Dùng ngưỡng 0,5 mặc định cho mọi bài toán.", "Đa cộng tuyến làm hệ số không ổn định."],
      tools: ["scikit-learn", "statsmodels", "optbinning"],
      resources: [["scikit-learn — Logistic regression", "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"]]
    },
    {
      id: "knn", title: "K-Nearest Neighbors (KNN)", level: 1, hours: 4,
      summary: "Dự đoán dựa trên K điểm gần nhất; không có giai đoạn huấn luyện thực sự.",
      concept: "Với điểm mới, tìm K điểm gần nhất theo khoảng cách (Euclid, Manhattan, cosine) và lấy đa số (phân loại) hoặc trung bình (hồi quy). K nhỏ dễ overfit, K lớn làm mịn quá mức. Hiệu năng giảm mạnh khi số chiều cao (curse of dimensionality).",
      why: ["Đơn giản, trực quan, dễ giải thích bằng ví dụ ('giống các khách hàng này').", "Nền tảng của tìm kiếm vector (ANN) trong RAG và hệ gợi ý."],
      when: ["Dữ liệu nhỏ, ít chiều; gợi ý dựa trên độ tương tự; điền giá trị thiếu (KNNImputer)."],
      whenNot: ["Dữ liệu lớn (dự đoán chậm), nhiều chiều, không chuẩn hoá."],
      example: {
        domain: "Bất động sản",
        title: "Định giá theo căn tương tự",
        text: "Định giá căn hộ bằng trung bình giá 5 căn đã bán gần nhất về vị trí, diện tích, số phòng. Người mua thấy ngay các căn đối chiếu, giống cách môi giới vẫn làm."
      },
      code: { lang: "python", src: `from sklearn.neighbors import KNeighborsRegressor
knn = make_pipeline(StandardScaler(), KNeighborsRegressor(n_neighbors=5, weights="distance"))
knn.fit(X_train, y_train)` },
      pitfalls: ["Quên chuẩn hoá: đặc trưng giá trị lớn chi phối khoảng cách."],
      tools: ["scikit-learn", "FAISS", "hnswlib"],
      resources: [["scikit-learn — Nearest Neighbors", "https://scikit-learn.org/stable/modules/neighbors.html"]]
    },
    {
      id: "decision-tree", title: "Cây quyết định", level: 1, hours: 6,
      summary: "Chia dữ liệu bằng chuỗi câu hỏi if/else; nền tảng của Random Forest và Gradient Boosting.",
      concept: "Tại mỗi nút, chọn đặc trưng và ngưỡng chia làm giảm nhiều nhất độ hỗn tạp (Gini, entropy cho phân loại; MSE cho hồi quy). Cây sâu dễ overfit; kiểm soát bằng max_depth, min_samples_leaf, hoặc cost-complexity pruning (ccp_alpha).",
      why: ["Dễ giải thích bằng sơ đồ, xử lý phi tuyến và tương tác tự nhiên.", "Không cần scaling, chịu được ngoại lệ."],
      when: ["Cần luật quyết định minh bạch; khám phá phân khúc; làm khối xây dựng cho ensemble."],
      whenNot: ["Cần độ chính xác cao nhất (một cây đơn lẻ không ổn định, hãy dùng ensemble)."],
      example: {
        domain: "Chăm sóc khách hàng",
        title: "Luật định tuyến ticket hỗ trợ",
        text: "Cây sâu 3 tầng học từ lịch sử cho ra luật: nếu khách VIP và ticket về thanh toán thì chuyển tầng 2. Luật đủ đơn giản để đưa vào hệ thống ticket mà không cần phục vụ mô hình."
      },
      code: { lang: "python", src: `from sklearn.tree import DecisionTreeClassifier, export_text
tree = DecisionTreeClassifier(max_depth=3, min_samples_leaf=50).fit(X_train, y_train)
print(export_text(tree, feature_names=list(X_train.columns)))` },
      pitfalls: ["Để cây mọc tối đa (train 100%, test kém)."],
      tools: ["scikit-learn", "dtreeviz"],
      resources: [["StatQuest — Decision Trees", "https://www.youtube.com/watch?v=_L39rN6gz7Y"]]
    },
    {
      id: "random-forest", title: "Random Forest", level: 1, hours: 6,
      summary: "Trung bình hàng trăm cây trên mẫu bootstrap và tập con đặc trưng; mạnh, ổn định, ít cần tinh chỉnh.",
      concept: "Bagging: mỗi cây học trên một mẫu bootstrap, mỗi lần chia chỉ xét ngẫu nhiên một tập con đặc trưng (max_features). Trung bình nhiều cây ít tương quan giúp giảm phương sai. Có sẵn ước lượng out-of-bag (OOB) như một dạng validation miễn phí.",
      why: ["Hiệu năng tốt ngay với tham số mặc định.", "Chịu nhiễu, ngoại lệ, không cần scaling.", "Huấn luyện song song."],
      when: ["Baseline mạnh cho dữ liệu bảng; dữ liệu cỡ vừa; cần kết quả nhanh."],
      whenNot: ["Cần ngoại suy xu hướng (cây không dự đoán ngoài khoảng target đã thấy).", "Cần mô hình nhỏ, độ trễ rất thấp: file mô hình có thể rất lớn (flight_rf.pkl trong repo khá nặng)."],
      example: {
        domain: "Hàng không (repo)",
        title: "RandomForestRegressor dự đoán giá vé",
        text: "Notebook đạt R² = 0,798 trên tập test (MAE 1.174 rupee) với RandomForest và dùng RandomizedSearchCV để tìm tham số. Lưu ý: notebook lưu reg_rf (mô hình mặc định) thay vì rf_random.best_estimator_, nên mô hình đã tuning không được triển khai. Ngoài ra max_features='auto' đã bị loại bỏ từ scikit-learn 1.3, dùng 1.0 hoặc 'sqrt'."
      },
      code: { lang: "python", src: `from sklearn.ensemble import RandomForestRegressor
rf = RandomForestRegressor(n_estimators=400, max_features=0.5, min_samples_leaf=2,
                           oob_score=True, n_jobs=-1, random_state=42)
rf.fit(X_train, y_train)
print("OOB R2:", rf.oob_score_, "| Test R2:", rf.score(X_test, y_test))
joblib.dump(rf, "flight_rf.joblib", compress=3)     # nén file mô hình` },
      pitfalls: ["Tin feature_importances_ mà không kiểm tra permutation importance.", "Triển khai nhầm mô hình chưa tuning."],
      tools: ["scikit-learn"],
      resources: [["scikit-learn — Forests of randomized trees", "https://scikit-learn.org/stable/modules/ensemble.html#forest"]]
    },
    {
      id: "boosting", title: "Gradient Boosting: XGBoost, LightGBM, CatBoost", level: 2, hours: 12,
      summary: "Chuẩn vàng cho dữ liệu bảng: cây nối tiếp, mỗi cây sửa lỗi của các cây trước.",
      concept: "Boosting xây cây tuần tự; mỗi cây mới khớp với gradient (phần dư) của loss. Tham số chính: learning_rate, n_estimators (dùng early stopping), max_depth hoặc num_leaves, subsample, colsample, regularization. XGBoost: ổn định, phổ biến. LightGBM: rất nhanh với dữ liệu lớn nhờ histogram và chia theo lá. CatBoost: xử lý biến phân loại tốt nhất, ít cần tinh chỉnh. HistGradientBoosting của scikit-learn là lựa chọn gọn nhẹ không cần cài thêm.",
      why: [
        "Các benchmark cho thấy GBDT thắng hoặc hoà deep learning trên phần lớn bài toán dữ liệu bảng cỡ vừa.",
        "Hỗ trợ giá trị thiếu, biến phân loại, loss tuỳ chỉnh, GPU."
      ],
      when: ["Hầu hết bài toán dự đoán trên dữ liệu bảng: churn, rủi ro tín dụng, định giá, dự báo nhu cầu, xếp hạng (LambdaMART)."],
      whenNot: ["Ảnh, âm thanh, văn bản thô (dùng deep learning).", "Dữ liệu rất nhỏ (vài trăm dòng): mô hình tuyến tính có thể tốt và ổn định hơn."],
      example: {
        domain: "Logistics",
        title: "Dự đoán thời gian giao hàng (ETA)",
        text: "Các nền tảng giao đồ ăn dùng LightGBM với đặc trưng khoảng cách, thời tiết, giờ cao điểm, tải của quán để dự đoán ETA. Mô hình huấn luyện lại hằng ngày và phục vụ với độ trễ vài mili giây."
      },
      code: { lang: "python", src: `import lightgbm as lgb
from sklearn.metrics import mean_absolute_error

cat_cols = ["Airline", "Source", "Destination"]
for c in cat_cols:
    X_train[c] = X_train[c].astype("category"); X_val[c] = X_val[c].astype("category")

model = lgb.LGBMRegressor(n_estimators=5000, learning_rate=0.03, num_leaves=63,
                          subsample=0.8, subsample_freq=1, colsample_bytree=0.8)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], eval_metric="l1",
          callbacks=[lgb.early_stopping(200), lgb.log_evaluation(500)])
print("MAE:", mean_absolute_error(y_val, model.predict(X_val)))` },
      pitfalls: ["Không dùng early stopping nên overfit.", "Early stopping trên chính tập test (rò rỉ): cần tập validation riêng.", "learning_rate cao với ít cây."],
      tools: ["XGBoost", "LightGBM", "CatBoost", "scikit-learn HistGradientBoosting"],
      resources: [
        ["XGBoost — Introduction to Boosted Trees", "https://xgboost.readthedocs.io/en/stable/tutorials/model.html"],
        ["LightGBM — Parameters Tuning", "https://lightgbm.readthedocs.io/en/latest/Parameters-Tuning.html"],
        ["Tabular Data: Deep Learning is Not All You Need (arXiv)", "https://arxiv.org/abs/2106.03253"]
      ]
    },
    {
      id: "svm", title: "Support Vector Machine (SVM)", level: 2, hours: 5,
      summary: "Tìm siêu phẳng có lề lớn nhất; kernel trick cho ranh giới phi tuyến.",
      concept: "SVM tối đa hoá khoảng cách (margin) giữa hai lớp; C điều khiển mức chấp nhận điểm vi phạm lề. Kernel (RBF, polynomial) ánh xạ ngầm dữ liệu lên không gian nhiều chiều hơn. Độ phức tạp tăng nhanh theo số mẫu (khoảng O(n²) đến O(n³)).",
      why: ["Hiệu quả với dữ liệu nhiều chiều, ít mẫu.", "LinearSVC rất mạnh cho phân loại văn bản."],
      when: ["Phân loại văn bản TF-IDF, dữ liệu sinh học (gene), bộ dữ liệu vài nghìn đến vài chục nghìn mẫu."],
      whenNot: ["Hàng triệu mẫu với kernel RBF.", "Cần xác suất đã hiệu chỉnh (phải bật calibration)."],
      example: {
        domain: "Truyền thông",
        title: "Phân loại chủ đề bài báo",
        text: "TF-IDF + LinearSVC phân loại bài báo vào 12 chuyên mục với độ chính xác trên 90%, huấn luyện trong vài giây trên CPU. Đây vẫn là baseline tốt trước khi thử mô hình Transformer."
      },
      code: { lang: "python", src: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
text_clf = make_pipeline(TfidfVectorizer(ngram_range=(1, 2), min_df=2), LinearSVC(C=0.5))
text_clf.fit(train_texts, train_labels)` },
      pitfalls: ["Không chuẩn hoá đặc trưng.", "Tìm C và gamma bằng tay thay vì grid search."],
      tools: ["scikit-learn SVC, LinearSVC"],
      resources: [["scikit-learn — SVM", "https://scikit-learn.org/stable/modules/svm.html"]]
    },
    {
      id: "naive-bayes", title: "Naive Bayes", level: 1, hours: 3,
      summary: "Áp dụng định lý Bayes với giả định các đặc trưng độc lập; cực nhanh cho văn bản.",
      concept: "P(lớp | đặc trưng) tỉ lệ với P(lớp) × ∏P(đặc trưngᵢ | lớp). Giả định độc lập hiếm khi đúng nhưng mô hình vẫn xếp hạng tốt. Biến thể: MultinomialNB (đếm từ), BernoulliNB (có/không), GaussianNB (số liên tục), ComplementNB (văn bản mất cân bằng).",
      why: ["Huấn luyện và dự đoán gần như tức thì, cần ít dữ liệu.", "Baseline tốt cho văn bản."],
      when: ["Lọc spam, phân loại cảm xúc đơn giản, hệ thống cần cập nhật liên tục (partial_fit)."],
      whenNot: ["Cần xác suất chính xác (NB thường quá tự tin).", "Đặc trưng tương quan mạnh."],
      example: {
        domain: "Email",
        title: "Bộ lọc spam",
        text: "Các bộ lọc spam đời đầu dùng Naive Bayes trên tần suất từ như 'khuyến mãi', 'trúng thưởng'. Đến nay vẫn là thành phần trong nhiều hệ thống lọc nhiều tầng nhờ tốc độ."
      },
      code: { lang: "python", src: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
spam = make_pipeline(CountVectorizer(), MultinomialNB(alpha=0.5)).fit(emails, labels)
spam.predict(["Chúc mừng bạn trúng thưởng iPhone, bấm link ngay"])` },
      pitfalls: ["Xác suất 0 khi từ chưa gặp (cần smoothing alpha)."],
      tools: ["scikit-learn naive_bayes"],
      resources: [["scikit-learn — Naive Bayes", "https://scikit-learn.org/stable/modules/naive_bayes.html"]]
    }
  ]
},
{
  id: "s6", track: "ml", title: "Đánh giá, tinh chỉnh và giải thích mô hình",
  subtitle: "Biết mô hình tốt đến đâu, vì sao, và có tin được không",
  weeks: "3 tuần",
  goal: "Chọn metric đúng, validation đúng cách, tránh rò rỉ, tinh chỉnh siêu tham số và giải thích dự đoán.",
  modules: [
    {
      id: "metrics", title: "Metric cho hồi quy và phân loại", level: 1, hours: 8,
      summary: "MAE, RMSE, MAPE, R²; accuracy, precision, recall, F1, ROC-AUC, PR-AUC, log-loss; và cách chọn.",
      concept: "Hồi quy: MAE (sai số trung bình tuyệt đối, dễ hiểu, ít nhạy ngoại lệ), RMSE (phạt nặng sai số lớn), MAPE (theo phần trăm, lỗi khi y gần 0), R² (tỉ lệ phương sai giải thích được). Phân loại: ma trận nhầm lẫn là gốc. Precision = trong số dự đoán dương, bao nhiêu đúng. Recall = trong số dương thật, bắt được bao nhiêu. F1 cân bằng hai cái. ROC-AUC đo khả năng xếp hạng; PR-AUC phù hợp dữ liệu mất cân bằng. Log-loss và Brier score đánh giá chất lượng xác suất.",
      why: ["Metric sai dẫn đến tối ưu sai mục tiêu kinh doanh.", "Giúp giao tiếp: 'sai trung bình 1.200 rupee' dễ hiểu hơn 'RMSE 2.090'."],
      when: [
        "Recall ưu tiên: sàng lọc bệnh, gian lận (bỏ sót rất đắt).",
        "Precision ưu tiên: gửi ưu đãi tốn chi phí, lọc spam (chặn nhầm email quan trọng rất tệ).",
        "MAE: báo cáo cho người dùng; RMSE: khi sai số lớn gây hậu quả nặng."
      ],
      whenNot: ["Accuracy với dữ liệu mất cân bằng.", "MAPE khi target có giá trị bằng hoặc gần 0."],
      example: {
        domain: "Hàng không (repo)",
        title: "Diễn giải MAE, RMSE, R² của mô hình giá vé",
        text: "Notebook báo cáo RMSE khoảng 2.090 và chia cho khoảng (max - min) của giá để chuẩn hoá. Kết quả thực tế trong notebook: MAE 1.174, RMSE 2.085, R² 0,798. Diễn giải dễ hiểu hơn: dự đoán lệch trung bình khoảng 1.170 rupee, tức khoảng 14% so với giá vé trung vị (khoảng 8.370). Mô hình sau RandomizedSearchCV có RMSE thấp hơn (1.975) nhưng MAE cao hơn (1.264): chọn mô hình nào phụ thuộc vào metric bạn đã cam kết từ đầu."
      },
      code: { lang: "python", src: `from sklearn.metrics import (mean_absolute_error, root_mean_squared_error, r2_score,
                             classification_report, confusion_matrix, roc_auc_score)
print("MAE", mean_absolute_error(y_test, y_pred),
      "RMSE", root_mean_squared_error(y_test, y_pred),
      "R2", r2_score(y_test, y_pred))

print(confusion_matrix(y_true, y_hat))
print(classification_report(y_true, y_hat, digits=3))` },
      pitfalls: ["Báo cáo một metric duy nhất.", "So sánh mô hình trên các tập test khác nhau."],
      tools: ["scikit-learn.metrics"],
      resources: [
        ["Google ML Crash Course — Classification metrics", "https://developers.google.com/machine-learning/crash-course/classification"],
        ["scikit-learn — Model evaluation", "https://scikit-learn.org/stable/modules/model_evaluation.html"]
      ]
    },
    {
      id: "validation", title: "Train/validation/test, Cross-validation và Data leakage", level: 2, hours: 8,
      summary: "Chia dữ liệu đúng cách theo cấu trúc của nó để ước lượng hiệu năng thật trên dữ liệu tương lai.",
      concept: "Tập train để học, validation để chọn mô hình và tham số, test để đánh giá cuối cùng (chỉ nhìn một lần). K-fold CV dùng hiệu quả dữ liệu ít. Chọn kiểu chia theo cấu trúc dữ liệu: StratifiedKFold (giữ tỉ lệ lớp), GroupKFold (cùng khách hàng hay bệnh nhân không nằm ở cả hai phía), TimeSeriesSplit (luôn huấn luyện trên quá khứ, kiểm tra trên tương lai). Data leakage là khi thông tin không có lúc dự đoán thật lọt vào lúc huấn luyện.",
      why: ["Rò rỉ dữ liệu là nguyên nhân số một của mô hình 'đạt 99% khi thử, thất bại khi chạy thật'."],
      when: ["Mọi lần đánh giá mô hình."],
      whenNot: ["Chia ngẫu nhiên khi dữ liệu có thứ tự thời gian hoặc có nhóm."],
      example: {
        domain: "Y tế",
        title: "Rò rỉ theo bệnh nhân",
        text: "Một mô hình đọc X-quang đạt kết quả rất cao vì ảnh của cùng bệnh nhân nằm ở cả train và test, mô hình học nhận dạng bệnh nhân thay vì bệnh. Chia theo GroupKFold với nhóm là mã bệnh nhân cho ra con số thấp hơn nhưng trung thực. Tương tự, dữ liệu giá vé nên được kiểm tra thêm bằng cách chia theo thời gian (train tháng 3–5, test tháng 6)."
      },
      code: { lang: "python", src: `from sklearn.model_selection import cross_validate, TimeSeriesSplit, GroupKFold
cv = TimeSeriesSplit(n_splits=5)                  # dữ liệu theo thời gian
res = cross_validate(model, X, y, cv=cv,
                     scoring=["neg_mean_absolute_error", "r2"], return_train_score=True)
print(pd.DataFrame(res).mean())

# Dữ liệu có nhóm (khách hàng, bệnh nhân)
cross_validate(model, X, y, cv=GroupKFold(5), groups=df["customer_id"])` },
      pitfalls: ["Chuẩn hoá, chọn đặc trưng, oversample trên toàn bộ dữ liệu trước khi chia.", "Tinh chỉnh nhiều lần dựa trên tập test."],
      tools: ["scikit-learn model_selection"],
      resources: [["scikit-learn — Common pitfalls (data leakage)", "https://scikit-learn.org/stable/common_pitfalls.html"]]
    },
    {
      id: "bias-variance", title: "Bias–Variance, Overfitting và Regularization", level: 2, hours: 5,
      summary: "Chẩn đoán mô hình quá đơn giản (underfit) hay quá khớp (overfit) và cách khắc phục.",
      concept: "Sai số = bias² + variance + nhiễu. Underfit: sai số train và validation đều cao, cần mô hình phức tạp hơn hoặc thêm đặc trưng. Overfit: train rất tốt nhưng validation kém, cần thêm dữ liệu, regularization, giảm độ phức tạp, dropout, early stopping. Learning curve (hiệu năng theo lượng dữ liệu) cho biết thêm dữ liệu có giúp không.",
      why: ["Chọn đúng hướng cải thiện thay vì thử ngẫu nhiên."],
      when: ["Sau mỗi lần huấn luyện: so sánh điểm train và validation."],
      whenNot: [],
      example: {
        domain: "Hàng không (repo)",
        title: "Khoảng cách train/test của Random Forest",
        text: "Notebook có reg_rf.score(X_train) = 0,953 và score(X_test) = 0,798: dấu hiệu overfit vừa phải. Tăng min_samples_leaf, giảm max_depth hoặc chuyển sang gradient boosting có early stopping thường thu hẹp khoảng cách này."
      },
      code: { lang: "python", src: `from sklearn.model_selection import learning_curve
sizes, tr, va = learning_curve(model, X, y, cv=5, scoring="neg_mean_absolute_error",
                               train_sizes=np.linspace(0.1, 1, 6), n_jobs=-1)
plt.plot(sizes, -tr.mean(1), label="train"); plt.plot(sizes, -va.mean(1), label="validation")
plt.legend(); plt.ylabel("MAE"); plt.show()` },
      pitfalls: ["Cố đạt điểm train 100%."],
      tools: ["scikit-learn learning_curve, validation_curve"],
      resources: [["Google ML Crash Course — Overfitting", "https://developers.google.com/machine-learning/crash-course/overfitting"]]
    },
    {
      id: "tuning", title: "Tinh chỉnh siêu tham số", level: 2, hours: 6,
      summary: "Grid search, Random search, Bayesian optimization (Optuna), successive halving.",
      concept: "Siêu tham số (số cây, độ sâu, learning rate) không học từ dữ liệu mà phải chọn. Grid search thử mọi tổ hợp, tốn kém. Random search hiệu quả hơn khi chỉ vài tham số thực sự quan trọng. Bayesian optimization (Optuna, TPE) dùng kết quả các lần thử trước để chọn lần thử tiếp. HalvingRandomSearchCV loại dần cấu hình kém.",
      why: ["Thường cải thiện vài phần trăm metric.", "Tự động hoá thay vì chỉnh tay."],
      when: ["Sau khi đã có đặc trưng tốt và pipeline ổn định (tuning là bước cuối, không phải đầu)."],
      whenNot: ["Khi vấn đề nằm ở dữ liệu hoặc đặc trưng: tuning không cứu được."],
      example: {
        domain: "Hàng không (repo)",
        title: "Từ RandomizedSearchCV sang Optuna",
        text: "Notebook thử 10 tổ hợp ngẫu nhiên cho Random Forest. Với Optuna, 50 lần thử có pruning thường tìm được cấu hình tốt hơn trong cùng thời gian, và lưu lại lịch sử để phân tích tham số nào quan trọng."
      },
      code: { lang: "python", src: `import optuna
from sklearn.model_selection import cross_val_score

def objective(trial):
    params = dict(n_estimators=trial.suggest_int("n_estimators", 200, 1200),
                  max_depth=trial.suggest_int("max_depth", 5, 30),
                  min_samples_leaf=trial.suggest_int("min_samples_leaf", 1, 10),
                  max_features=trial.suggest_float("max_features", 0.2, 1.0))
    m = RandomForestRegressor(**params, n_jobs=-1, random_state=0)
    return -cross_val_score(m, X_train, y_train, cv=3,
                            scoring="neg_mean_absolute_error").mean()

study = optuna.create_study(direction="minimize")
study.optimize(objective, n_trials=50)
best = RandomForestRegressor(**study.best_params).fit(X_train, y_train)  # lưu mô hình NÀY` },
      pitfalls: ["Tuning trên tập test.", "Không cố định random_state nên không tái lập được."],
      tools: ["Optuna", "scikit-learn GridSearchCV/RandomizedSearchCV", "Ray Tune"],
      resources: [["Optuna docs", "https://optuna.readthedocs.io/"]]
    },
    {
      id: "explainability", title: "Giải thích mô hình (XAI): SHAP, PDP", level: 3, hours: 6,
      summary: "Giải thích vì sao mô hình đưa ra dự đoán, ở mức toàn cục và từng mẫu.",
      concept: "SHAP phân bổ đóng góp của từng đặc trưng vào một dự đoán dựa trên giá trị Shapley của lý thuyết trò chơi. Tổng đóng góp cộng giá trị cơ sở bằng đúng dự đoán. Partial Dependence Plot (PDP) và ICE cho thấy dự đoán thay đổi thế nào khi một đặc trưng thay đổi. LIME xấp xỉ cục bộ bằng mô hình tuyến tính.",
      why: ["Yêu cầu pháp lý (quyền được giải thích trong tín dụng, bảo hiểm).", "Phát hiện mô hình học sai tín hiệu (ví dụ học watermark trong ảnh).", "Tạo niềm tin với người dùng nghiệp vụ."],
      when: ["Ngành có quản lý; debug mô hình; trình bày kết quả cho stakeholder."],
      whenNot: ["Không dùng SHAP để kết luận nhân quả."],
      example: {
        domain: "Bảo hiểm",
        title: "Giải thích phí bảo hiểm xe",
        text: "Biểu đồ waterfall SHAP cho một hồ sơ: tuổi tài xế 22 cộng thêm 1,8 triệu, xe 2 năm tuổi trừ 0,4 triệu, lịch sử 1 tai nạn cộng 2,1 triệu. Nhân viên tư vấn dùng biểu đồ này để giải thích cho khách."
      },
      code: { lang: "python", src: `import shap
explainer = shap.TreeExplainer(model)
sv = explainer(X_test.iloc[:500])
shap.plots.beeswarm(sv)          # toàn cục
shap.plots.waterfall(sv[0])      # một dự đoán cụ thể` },
      pitfalls: ["Diễn giải SHAP khi các đặc trưng tương quan mạnh mà không cân nhắc."],
      tools: ["SHAP", "scikit-learn inspection (PDP)", "LIME", "InterpretML"],
      resources: [["Interpretable Machine Learning (Molnar, miễn phí)", "https://christophm.github.io/interpretable-ml-book/"]]
    }
  ]
},
{
  id: "s7", track: "ml", title: "Học không giám sát & Hệ gợi ý",
  subtitle: "Tìm cấu trúc trong dữ liệu không có nhãn",
  weeks: "3 tuần",
  goal: "Phân cụm, giảm chiều, phát hiện bất thường và xây dựng hệ gợi ý cơ bản.",
  modules: [
    {
      id: "kmeans", title: "Phân cụm K-Means", level: 1, hours: 5,
      summary: "Chia dữ liệu thành K cụm hình cầu bằng cách tối thiểu khoảng cách đến tâm cụm.",
      concept: "Lặp hai bước: gán mỗi điểm cho tâm gần nhất, cập nhật tâm bằng trung bình. Cần chọn K trước (elbow, silhouette score, và quan trọng nhất là ý nghĩa nghiệp vụ). Nhạy với scaling và ngoại lệ. MiniBatchKMeans cho dữ liệu lớn.",
      why: ["Nhanh, dễ hiểu, dễ giải thích từng cụm bằng tâm cụm."],
      when: ["Phân khúc khách hàng, nén màu ảnh, nhóm cửa hàng tương tự."],
      whenNot: ["Cụm có hình dạng bất kỳ, mật độ khác nhau, nhiều nhiễu (dùng DBSCAN/HDBSCAN).", "Biến phân loại (dùng K-Prototypes)."],
      example: {
        domain: "Bán lẻ",
        title: "Phân khúc khách hàng theo RFM",
        text: "K-means với K=5 trên đặc trưng RFM đã log và chuẩn hoá cho ra các nhóm như 'VIP trung thành', 'mới mua lần đầu', 'sắp rời bỏ'. Mỗi nhóm nhận chiến dịch email khác nhau."
      },
      code: { lang: "python", src: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
Xs = StandardScaler().fit_transform(np.log1p(rfm[["recency_days", "frequency", "monetary"]]))
for k in range(2, 9):
    km = KMeans(n_clusters=k, n_init="auto", random_state=0).fit(Xs)
    print(k, round(km.inertia_), round(silhouette_score(Xs, km.labels_), 3))` },
      pitfalls: ["Không chuẩn hoá.", "Coi số cụm 'tối ưu' về toán học là đáp án nghiệp vụ."],
      tools: ["scikit-learn"],
      resources: [["scikit-learn — Clustering", "https://scikit-learn.org/stable/modules/clustering.html"]]
    },
    {
      id: "dbscan", title: "Phân cụm theo mật độ và phân cấp (DBSCAN, HDBSCAN, Hierarchical)", level: 2, hours: 4,
      summary: "Tìm cụm hình dạng bất kỳ và tự nhận diện nhiễu; hoặc xây cây phân cấp các cụm.",
      concept: "DBSCAN gom các điểm có đủ hàng xóm trong bán kính eps; điểm không thuộc cụm nào là nhiễu. HDBSCAN tự chọn mật độ, ít tham số hơn. Phân cụm phân cấp (agglomerative) gộp dần các cụm gần nhau, trực quan hoá bằng dendrogram.",
      why: ["Không cần biết trước số cụm.", "Tách được nhiễu và cụm có hình dạng phức tạp."],
      when: ["Dữ liệu địa lý (điểm GPS), phát hiện điểm nóng, gom nhóm văn bản theo embedding (HDBSCAN trong BERTopic)."],
      whenNot: ["Dữ liệu rất nhiều chiều mà không giảm chiều trước."],
      example: {
        domain: "Gọi xe",
        title: "Tìm điểm đón khách phổ biến",
        text: "DBSCAN trên toạ độ GPS các lượt đón với eps khoảng 50 m tìm ra các điểm đón tự nhiên (cổng trung tâm thương mại, lối ra ga) để gợi ý cho người dùng."
      },
      code: { lang: "python", src: `from sklearn.cluster import HDBSCAN
labels = HDBSCAN(min_cluster_size=30).fit_predict(coords_radians)
print("Số cụm:", labels.max() + 1, "| Tỉ lệ nhiễu:", (labels == -1).mean())` },
      pitfalls: ["Chọn eps tuỳ tiện (dùng k-distance plot)."],
      tools: ["scikit-learn", "hdbscan"],
      resources: [["HDBSCAN docs", "https://hdbscan.readthedocs.io/"]]
    },
    {
      id: "pca", title: "Giảm chiều: PCA, t-SNE, UMAP", level: 2, hours: 5,
      summary: "Nén nhiều đặc trưng thành ít chiều hơn để trực quan hoá, khử nhiễu, tăng tốc.",
      concept: "PCA tìm các hướng có phương sai lớn nhất (thành phần chính), tuyến tính, có thể đảo ngược, dùng làm tiền xử lý. t-SNE và UMAP là phi tuyến, giữ cấu trúc lân cận, chủ yếu để trực quan hoá 2D/3D; khoảng cách giữa các cụm trên biểu đồ t-SNE không có nhiều ý nghĩa.",
      why: ["Trực quan hoá dữ liệu nhiều chiều (embeddings).", "Giảm đa cộng tuyến, tăng tốc mô hình."],
      when: ["PCA: trước KNN/SVM/K-means với nhiều đặc trưng; nén dữ liệu cảm biến. UMAP: khám phá embeddings văn bản, ảnh."],
      whenNot: ["Cần giải thích từng đặc trưng gốc (thành phần chính khó diễn giải).", "Dùng t-SNE làm đầu vào cho mô hình."],
      example: {
        domain: "Sản xuất",
        title: "Giám sát 200 cảm biến dây chuyền",
        text: "PCA nén 200 cảm biến còn 10 thành phần giữ 95% phương sai. Sai số tái tạo (reconstruction error) tăng đột biến là dấu hiệu máy vận hành bất thường."
      },
      code: { lang: "python", src: `from sklearn.decomposition import PCA
pca = PCA(n_components=0.95).fit(Xs)          # giữ 95% phương sai
print(pca.n_components_, pca.explained_variance_ratio_.cumsum()[-1])

import umap
emb2d = umap.UMAP(n_neighbors=15, min_dist=0.1).fit_transform(embeddings)` },
      pitfalls: ["Không chuẩn hoá trước PCA."],
      tools: ["scikit-learn", "umap-learn", "openTSNE"],
      resources: [["Understanding UMAP (Google PAIR)", "https://pair-code.github.io/understanding-umap/"]]
    },
    {
      id: "anomaly", title: "Phát hiện bất thường", level: 2, hours: 5,
      summary: "Isolation Forest, Local Outlier Factor, One-Class SVM, autoencoder, phương pháp thống kê.",
      concept: "Khi hầu như không có nhãn bất thường, học 'bình thường' trông như thế nào rồi đánh dấu điểm khác biệt. Isolation Forest cô lập điểm bất thường bằng ít lần chia ngẫu nhiên. LOF so sánh mật độ cục bộ. Với chuỗi thời gian: z-score theo cửa sổ trượt, phân rã STL, hoặc sai số dự báo.",
      why: ["Nhãn gian lận, lỗi máy rất hiếm và đến chậm.", "Phát hiện kiểu tấn công hoặc lỗi chưa từng thấy."],
      when: ["Gian lận, an ninh mạng, bảo trì dự đoán, giám sát chất lượng dữ liệu, giám sát KPI."],
      whenNot: ["Khi đã có đủ nhãn: mô hình có giám sát thường chính xác hơn."],
      example: {
        domain: "An ninh mạng",
        title: "Phát hiện đăng nhập bất thường",
        text: "Isolation Forest trên đặc trưng giờ đăng nhập, quốc gia, thiết bị, số lần thất bại gắn điểm rủi ro cho mỗi phiên. Phiên có điểm cao yêu cầu xác thực hai lớp."
      },
      code: { lang: "python", src: `from sklearn.ensemble import IsolationForest
iso = IsolationForest(contamination=0.01, random_state=0).fit(X_train)
score = -iso.score_samples(X_new)      # càng cao càng bất thường
alerts = X_new[score > np.quantile(score, 0.99)]` },
      pitfalls: ["Đặt contamination tuỳ tiện mà không kiểm tra với chuyên gia."],
      tools: ["scikit-learn", "PyOD", "Prophet/STL cho chuỗi thời gian"],
      resources: [["PyOD docs", "https://pyod.readthedocs.io/"]]
    },
    {
      id: "recsys", title: "Hệ gợi ý (Recommender Systems)", level: 3, hours: 10,
      summary: "Content-based, collaborative filtering, matrix factorization, two-tower và mô hình xếp hạng.",
      concept: "Content-based: gợi ý món giống món người dùng đã thích dựa trên thuộc tính. Collaborative filtering: người giống bạn thích gì thì bạn cũng có thể thích. Matrix factorization (ALS, SVD) phân rã ma trận người dùng × sản phẩm thành vector ẩn. Hệ thống quy mô lớn thường có hai tầng: truy xuất ứng viên (two-tower + tìm kiếm vector) rồi xếp hạng (GBDT hoặc deep model với nhiều đặc trưng).",
      why: ["Một phần lớn doanh thu và thời lượng xem của các nền tảng thương mại, video, nhạc đến từ gợi ý."],
      when: ["Thương mại điện tử, nội dung, việc làm, khoá học."],
      whenNot: ["Quá ít người dùng hoặc tương tác (cold start): bắt đầu bằng phổ biến theo phân khúc và content-based."],
      example: {
        domain: "Thương mại điện tử",
        title: "\"Khách mua sản phẩm này cũng mua\"",
        text: "Từ lịch sử đơn hàng, tính đồng xuất hiện item-item, lọc theo tồn kho và biên lợi nhuận. Đánh giá offline bằng Recall@10 và NDCG@10, sau đó A/B test đo doanh thu mỗi phiên."
      },
      code: { lang: "python", src: `# Item-item collaborative filtering đơn giản
from sklearn.metrics.pairwise import cosine_similarity
ui = pd.crosstab(orders["user_id"], orders["item_id"]).clip(upper=1)   # ma trận user x item
sim = pd.DataFrame(cosine_similarity(ui.T), index=ui.columns, columns=ui.columns)
def similar_items(item, k=5):
    return sim[item].drop(item).nlargest(k)` },
      pitfalls: ["Chỉ đánh giá offline; gợi ý phổ biến luôn thắng offline nhưng nhàm chán với người dùng.", "Vòng phản hồi (feedback loop) khiến mô hình chỉ gợi ý những gì đã phổ biến."],
      tools: ["implicit", "LightFM", "Surprise", "RecBole", "FAISS"],
      resources: [["Google — Recommendation Systems course", "https://developers.google.com/machine-learning/recommendation"]]
    }
  ]
}
);
