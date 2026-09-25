/* Giai đoạn 0–3: Tư duy, Toán, Lập trình, Dữ liệu */
window.ROADMAP = window.ROADMAP || [];
window.ROADMAP.push(
{
  id: "s0", track: "found", title: "Tư duy Data Science & quy trình dự án",
  subtitle: "Biết mình đang giải bài toán gì trước khi viết dòng code đầu tiên",
  weeks: "1 tuần",
  goal: "Chuyển một câu hỏi kinh doanh thành bài toán dữ liệu đo lường được, và biết vòng đời của một dự án ML.",
  modules: [
    {
      id: "crisp-dm", title: "Quy trình CRISP-DM và vòng đời dự án ML", level: 1, hours: 4,
      summary: "Sáu bước lặp: hiểu nghiệp vụ, hiểu dữ liệu, chuẩn bị dữ liệu, mô hình hoá, đánh giá, triển khai.",
      concept: "CRISP-DM (Cross-Industry Standard Process for Data Mining) là khung quy trình phổ biến nhất cho dự án dữ liệu. Nó không tuyến tính: bạn sẽ quay lại bước trước nhiều lần. Phiên bản hiện đại thêm bước giám sát (monitoring) và huấn luyện lại sau khi triển khai, tạo thành vòng đời ML (ML lifecycle).",
      why: [
        "Giữ dự án bám vào mục tiêu kinh doanh thay vì tối ưu một con số không ai cần.",
        "Tạo ngôn ngữ chung giữa data scientist, kỹ sư và người quản lý sản phẩm.",
        "Giúp ước lượng thời gian: thực tế 60–80% công sức nằm ở hiểu và chuẩn bị dữ liệu."
      ],
      when: [
        "Bắt đầu bất kỳ dự án phân tích hay mô hình dự đoán nào.",
        "Khi cần viết đề xuất dự án hoặc báo cáo tiến độ cho stakeholder.",
        "Khi dự án bị kẹt: xác định mình đang ở bước nào và vì sao phải quay lại."
      ],
      whenNot: [
        "Truy vấn ad-hoc trả lời một câu hỏi đơn lẻ trong vài phút; áp dụng đầy đủ quy trình là thừa."
      ],
      example: {
        domain: "Viễn thông",
        title: "Dự đoán khách hàng rời mạng (churn)",
        text: "Nghiệp vụ: giảm tỉ lệ rời mạng 2% trong quý. Dữ liệu: lịch sử cước, khiếu nại, số lần rớt cuộc gọi. Chuẩn bị: gộp theo thuê bao-tháng. Mô hình: gradient boosting xếp hạng rủi ro. Đánh giá: precision trong top 5% rủi ro, vì đội chăm sóc chỉ gọi được 5% khách mỗi tháng. Triển khai: đẩy danh sách hằng tuần vào CRM, theo dõi tỉ lệ giữ chân bằng nhóm đối chứng."
      },
      pitfalls: [
        "Chọn metric kỹ thuật (accuracy) không gắn với chi phí thật của lỗi.",
        "Nhảy thẳng vào mô hình khi chưa hiểu cột dữ liệu nghĩa là gì.",
        "Không định nghĩa baseline (quy tắc đơn giản) để so sánh."
      ],
      tools: ["Notion/Confluence cho project brief", "Jira/Trello", "Miro vẽ luồng dữ liệu"],
      resources: [
        ["Google — Rules of Machine Learning", "https://developers.google.com/machine-learning/guides/rules-of-ml"],
        ["Made With ML — Product & Design", "https://madewithml.com/"]
      ]
    },
    {
      id: "framing", title: "Đóng khung bài toán (Problem framing)", level: 1, hours: 3,
      summary: "Xác định đầu ra, loại bài toán, metric, baseline và ràng buộc trước khi chọn thuật toán.",
      concept: "Đóng khung là chuyển câu hỏi mơ hồ (\"tăng doanh thu\") thành bài toán cụ thể: dự đoán cái gì (target), tại thời điểm nào, với dữ liệu nào có sẵn tại thời điểm đó, đo thành công ra sao. Loại bài toán quyết định họ thuật toán: hồi quy (số liên tục), phân loại (nhãn), phân cụm (không nhãn), xếp hạng, dự báo chuỗi thời gian, sinh nội dung.",
      why: [
        "Sai khung thì mô hình tốt đến đâu cũng vô dụng.",
        "Phát hiện sớm rò rỉ dữ liệu: dùng thông tin mà lúc dự đoán thật chưa có.",
        "Quyết định có cần ML không: nhiều bài toán giải bằng quy tắc hoặc SQL là đủ."
      ],
      when: [
        "Khi nhận yêu cầu từ phía kinh doanh.",
        "Trước khi thu thập hoặc gán nhãn dữ liệu (tốn kém)."
      ],
      whenNot: [
        "Không có trường hợp nào nên bỏ qua; chỉ khác nhau ở mức chi tiết."
      ],
      example: {
        domain: "Hàng không (dự án trong repo)",
        title: "Dự đoán giá vé máy bay",
        text: "Target: Price (số liên tục) nên là bài toán hồi quy. Đặc trưng khả dụng lúc đặt vé: hãng bay, điểm đi, điểm đến, giờ khởi hành, số điểm dừng. Metric: MAE tính bằng rupee để người dùng hiểu sai số. Baseline: giá trung vị theo hãng + tuyến bay."
      },
      pitfalls: [
        "Dùng đặc trưng chỉ biết sau sự kiện (ví dụ 'số ngày trễ hạn' để dự đoán 'có trễ hạn không').",
        "Không thống nhất đơn vị dự đoán (theo đơn hàng hay theo khách hàng)."
      ],
      tools: ["ML Canvas", "Bảng định nghĩa metric"],
      resources: [
        ["Google — Introduction to ML Problem Framing", "https://developers.google.com/machine-learning/problem-framing"]
      ]
    }
  ]
},
{
  id: "s1", track: "found", title: "Nền tảng Toán học",
  subtitle: "Đủ toán để hiểu mô hình làm gì, không cần chứng minh định lý",
  weeks: "4–6 tuần",
  goal: "Đọc được công thức trong tài liệu ML, hiểu gradient descent, phân phối xác suất và kiểm định thống kê.",
  modules: [
    {
      id: "linear-algebra", title: "Đại số tuyến tính", level: 1, hours: 20,
      summary: "Vector, ma trận, phép nhân ma trận, chuẩn (norm), trị riêng, SVD: ngôn ngữ của dữ liệu và mô hình.",
      concept: "Mỗi dòng dữ liệu là một vector, cả tập dữ liệu là ma trận X (n mẫu × p đặc trưng). Hồi quy tuyến tính là tìm w sao cho Xw ≈ y. Mạng nơ-ron là chuỗi phép nhân ma trận xen kẽ hàm phi tuyến. Tích vô hướng đo độ tương đồng (nền tảng của cosine similarity và embeddings). Phân rã trị riêng và SVD là cơ sở của PCA và hệ gợi ý.",
      why: [
        "NumPy, PyTorch đều tính toán theo vector hoá; hiểu shape ma trận giúp debug nhanh.",
        "Giải thích được PCA, embeddings, attention trong Transformer.",
        "Vector hoá thay vòng lặp Python nhanh hơn 10–100 lần."
      ],
      when: [
        "Khi gặp lỗi shape mismatch trong NumPy/PyTorch.",
        "Khi giảm chiều dữ liệu, tìm kiếm tương đồng, xây hệ gợi ý."
      ],
      whenNot: [
        "Không cần học chứng minh sâu (không gian Hilbert…) ở giai đoạn đầu."
      ],
      example: {
        domain: "Thương mại điện tử",
        title: "Tìm sản phẩm tương tự bằng cosine similarity",
        text: "Mỗi sản phẩm được biểu diễn bằng vector embedding 384 chiều. Sản phẩm tương tự là các vector có cosine lớn nhất. Với 1 triệu sản phẩm, phép nhân ma trận chuẩn hoá cho ra điểm tương đồng của cả danh mục trong một lần tính."
      },
      code: { lang: "python", src: `import numpy as np

X = np.random.rand(1000, 384)            # 1000 sản phẩm, embedding 384 chiều
X = X / np.linalg.norm(X, axis=1, keepdims=True)   # chuẩn hoá L2
query = X[42]
scores = X @ query                        # cosine similarity (vì đã chuẩn hoá)
top5 = np.argsort(-scores)[1:6]           # bỏ chính nó
print(top5, scores[top5])` },
      pitfalls: [
        "Nhầm phép nhân từng phần tử (*) với nhân ma trận (@).",
        "Quên chuẩn hoá vector trước khi so sánh cosine."
      ],
      tools: ["NumPy", "3Blue1Brown", "Khan Academy"],
      resources: [
        ["3Blue1Brown — Essence of Linear Algebra", "https://www.3blue1brown.com/topics/linear-algebra"],
        ["Mathematics for Machine Learning (sách miễn phí)", "https://mml-book.github.io/"]
      ]
    },
    {
      id: "calculus", title: "Giải tích & Tối ưu hoá", level: 2, hours: 15,
      summary: "Đạo hàm, gradient, quy tắc chuỗi và gradient descent: cách mọi mô hình \"học\".",
      concept: "Huấn luyện mô hình là tìm tham số làm hàm mất mát (loss) nhỏ nhất. Gradient chỉ hướng tăng nhanh nhất của loss; đi ngược gradient từng bước nhỏ (learning rate) là gradient descent. Quy tắc chuỗi (chain rule) cho phép tính gradient qua nhiều lớp, chính là backpropagation. Các biến thể: SGD, Momentum, Adam.",
      why: [
        "Hiểu vì sao learning rate quá lớn làm loss phân kỳ, quá nhỏ thì học chậm.",
        "Đọc hiểu log huấn luyện và chẩn đoán vấn đề (vanishing/exploding gradient).",
        "Là nền tảng cho deep learning."
      ],
      when: [
        "Khi tinh chỉnh learning rate, chọn optimizer.",
        "Khi mô hình không hội tụ hoặc loss ra NaN."
      ],
      whenNot: [
        "Với mô hình cây (Random Forest, XGBoost) bạn ít cần chỉnh optimizer trực tiếp."
      ],
      example: {
        domain: "Bất động sản",
        title: "Tự cài gradient descent cho hồi quy giá nhà",
        text: "Với giá nhà theo diện tích, gradient descent điều chỉnh độ dốc w và hệ số chặn b sau mỗi vòng. Sau khoảng 1000 vòng, w hội tụ về giá trị gần bằng nghiệm đóng của bình phương tối thiểu."
      },
      code: { lang: "python", src: `import numpy as np
rng = np.random.default_rng(0)
x = rng.uniform(30, 150, 200)                 # diện tích m2
y = 25 * x + 300 + rng.normal(0, 150, 200)    # giá (triệu)
x_s = (x - x.mean()) / x.std()                # chuẩn hoá để hội tụ nhanh

w, b, lr = 0.0, 0.0, 0.1
for epoch in range(500):
    y_hat = w * x_s + b
    grad_w = 2 * np.mean((y_hat - y) * x_s)
    grad_b = 2 * np.mean(y_hat - y)
    w -= lr * grad_w
    b -= lr * grad_b
print(w / x.std(), b - w * x.mean() / x.std())  # ~25 và ~300` },
      pitfalls: [
        "Không chuẩn hoá đặc trưng làm gradient descent hội tụ rất chậm.",
        "Nhầm local minimum với vấn đề thực sự; với deep learning thường là saddle point hoặc learning rate."
      ],
      tools: ["NumPy", "PyTorch autograd"],
      resources: [
        ["3Blue1Brown — Neural Networks (backprop)", "https://www.3blue1brown.com/topics/neural-networks"],
        ["Dive into Deep Learning — Optimization", "https://d2l.ai/chapter_optimization/index.html"]
      ]
    },
    {
      id: "probability", title: "Xác suất", level: 1, hours: 15,
      summary: "Biến ngẫu nhiên, phân phối, xác suất có điều kiện, định lý Bayes, kỳ vọng và phương sai.",
      concept: "Dữ liệu là mẫu từ một quá trình ngẫu nhiên. Các phân phối cần biết: Bernoulli/Binomial (có/không), Poisson (đếm sự kiện), Normal (sai số, chiều cao), Exponential (thời gian chờ), phân phối lệch như log-normal (thu nhập, giá). Định lý Bayes P(A|B) = P(B|A)P(A)/P(B) là nền của Naive Bayes, lọc spam và suy luận Bayes.",
      why: [
        "Mô hình phân loại trả về xác suất; cần hiểu để chọn ngưỡng quyết định.",
        "Giúp nhận ra phân phối lệch để biến đổi log trước khi mô hình hoá.",
        "Tránh các sai lầm trực giác (base rate fallacy)."
      ],
      when: [
        "Khi diễn giải output predict_proba.",
        "Khi mô phỏng rủi ro (Monte Carlo), tính kỳ vọng lợi nhuận.",
        "Khi dữ liệu mất cân bằng: xác suất tiên nghiệm rất nhỏ."
      ],
      whenNot: [
        "Không cần lý thuyết độ đo ở mức ứng dụng."
      ],
      example: {
        domain: "Y tế",
        title: "Xét nghiệm dương tính có đáng lo?",
        text: "Bệnh có tỉ lệ 1%. Xét nghiệm có độ nhạy 99% và tỉ lệ dương tính giả 5%. Theo Bayes, P(bệnh | dương tính) = 0.99·0.01 / (0.99·0.01 + 0.05·0.99) ≈ 16.7%. Cùng logic áp dụng cho mô hình phát hiện gian lận: phần lớn cảnh báo sẽ là báo động giả khi gian lận hiếm."
      },
      code: { lang: "python", src: `from scipy import stats
# Poisson: trung bình 3 đơn hàng/phút, xác suất có >= 6 đơn trong 1 phút?
print(1 - stats.poisson.cdf(5, mu=3))      # ~0.084

# Monte Carlo: lợi nhuận kỳ vọng của chiến dịch
import numpy as np
conv = np.random.binomial(10000, 0.021, 100_000)   # số khách chuyển đổi
profit = conv * 150_000 - 25_000_000
print(profit.mean(), np.percentile(profit, [5, 95]))` },
      pitfalls: [
        "Giả định mọi thứ là phân phối chuẩn.",
        "Nhầm P(A|B) với P(B|A)."
      ],
      tools: ["SciPy.stats", "NumPy random"],
      resources: [
        ["Seeing Theory — xác suất trực quan", "https://seeing-theory.brown.edu/"],
        ["StatQuest (YouTube)", "https://www.youtube.com/@statquest"]
      ]
    },
    {
      id: "statistics", title: "Thống kê suy luận & A/B testing", level: 2, hours: 20,
      summary: "Ước lượng, khoảng tin cậy, kiểm định giả thuyết, p-value, cỡ mẫu và thiết kế thí nghiệm.",
      concept: "Thống kê mô tả tóm tắt dữ liệu (trung bình, trung vị, độ lệch chuẩn, tứ phân vị). Thống kê suy luận kết luận về tổng thể từ mẫu. Kiểm định giả thuyết so sánh H0 (không có khác biệt) với H1; p-value là xác suất thấy kết quả cực đoan như vậy nếu H0 đúng. A/B testing áp dụng điều này để đánh giá thay đổi sản phẩm. Cần tính cỡ mẫu trước dựa trên hiệu ứng nhỏ nhất muốn phát hiện (MDE) và power (thường 80%).",
      why: [
        "Phân biệt khác biệt thật với nhiễu ngẫu nhiên.",
        "Là kỹ năng được hỏi nhiều nhất trong phỏng vấn Data Scientist ở các công ty sản phẩm.",
        "Đánh giá tác động thật của mô hình ML sau triển khai (online evaluation)."
      ],
      when: [
        "Thử nghiệm giao diện, giá, email marketing.",
        "So sánh mô hình mới với mô hình cũ trên người dùng thật.",
        "Báo cáo chỉ số có kèm khoảng tin cậy."
      ],
      whenNot: [
        "Không nên dừng thí nghiệm sớm ngay khi p < 0.05 (peeking) vì làm tăng dương tính giả.",
        "Khi không thể ngẫu nhiên hoá, dùng phương pháp nhân quả quan sát (diff-in-diff, propensity score)."
      ],
      example: {
        domain: "Thương mại điện tử",
        title: "Nút \"Mua ngay\" màu cam có tăng chuyển đổi?",
        text: "Nhóm A (cũ) 10.000 lượt, 420 chuyển đổi (4.2%). Nhóm B (mới) 10.000 lượt, 481 chuyển đổi (4.81%). Kiểm định hai tỉ lệ cho p ≈ 0.035, nhỏ hơn 0.05 nên bác bỏ H0. Trước khi chạy, đội đã tính cần khoảng 9.000 lượt/nhóm để phát hiện mức tăng 0.6 điểm phần trăm với power 80%."
      },
      code: { lang: "python", src: `from statsmodels.stats.proportion import proportions_ztest
from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize

stat, p = proportions_ztest(count=[481, 420], nobs=[10000, 10000])
print(f"z={stat:.2f}, p={p:.4f}")

# Cỡ mẫu cần cho mỗi nhóm
es = proportion_effectsize(0.048, 0.042)
n = NormalIndPower().solve_power(effect_size=es, alpha=0.05, power=0.8)
print(round(n))` },
      pitfalls: [
        "Hiểu sai p-value là \"xác suất H0 đúng\".",
        "Kiểm định nhiều chỉ số cùng lúc mà không hiệu chỉnh (Bonferroni, FDR).",
        "Có ý nghĩa thống kê nhưng hiệu ứng quá nhỏ để có ý nghĩa kinh doanh."
      ],
      tools: ["SciPy", "statsmodels", "pingouin", "GrowthBook/Optimizely"],
      resources: [
        ["OpenIntro Statistics (sách miễn phí)", "https://www.openintro.org/book/os/"],
        ["Evan Miller — A/B testing tools", "https://www.evanmiller.org/ab-testing/"],
        ["Trustworthy Online Controlled Experiments (Kohavi)", "https://experimentguide.com/"]
      ]
    }
  ]
},
{
  id: "s2", track: "found", title: "Lập trình Python cho dữ liệu",
  subtitle: "Công cụ làm việc hằng ngày của mọi Data Scientist",
  weeks: "4–6 tuần",
  goal: "Viết code Python sạch, xử lý bảng dữ liệu bằng Pandas, tính toán bằng NumPy, vẽ biểu đồ, quản lý môi trường và Git.",
  modules: [
    {
      id: "python-core", title: "Python cốt lõi", level: 1, hours: 30,
      summary: "Kiểu dữ liệu, cấu trúc điều khiển, hàm, list/dict comprehension, OOP cơ bản, xử lý lỗi, module.",
      concept: "Python là ngôn ngữ chính của hệ sinh thái dữ liệu nhờ cú pháp dễ đọc và thư viện phong phú. Cần nắm: list, dict, set, tuple; hàm và tham số mặc định; comprehension; lớp (class) để đóng gói logic; try/except; đọc ghi file; virtual environment; type hints để code dễ bảo trì.",
      why: [
        "Mọi thư viện ML chủ đạo (scikit-learn, PyTorch, Hugging Face) đều dùng Python.",
        "Viết được pipeline tái sử dụng thay vì notebook rời rạc.",
        "Dễ chuyển code notebook thành API (Flask/FastAPI)."
      ],
      when: ["Luôn luôn: đây là nền tảng cho mọi giai đoạn sau."],
      whenNot: ["Xử lý tính toán nặng từng phần tử bằng vòng lặp thuần; hãy dùng NumPy/Pandas vector hoá."],
      example: {
        domain: "Vận hành",
        title: "Tự động gộp báo cáo Excel hằng ngày",
        text: "Một script 30 dòng đọc 50 file Excel từ các chi nhánh, chuẩn hoá tên cột, gộp lại và gửi tổng hợp. Thay cho 2 giờ copy-paste thủ công mỗi ngày."
      },
      code: { lang: "python", src: `from pathlib import Path
from dataclasses import dataclass

@dataclass
class Flight:
    airline: str
    stops: int
    price: float

    def price_per_leg(self) -> float:
        return self.price / (self.stops + 1)

flights = [Flight("IndiGo", 0, 3897), Flight("Air India", 2, 7662)]
cheap = [f.airline for f in flights if f.price_per_leg() < 3000]
by_airline = {f.airline: f.price for f in flights}
print(cheap, by_airline)` },
      pitfalls: [
        "Dùng list/dict làm tham số mặc định có thể thay đổi (def f(x=[])).",
        "Đường dẫn file tuyệt đối viết cứng (như app.py trong repo này dùng D:/...). Dùng pathlib và đường dẫn tương đối."
      ],
      tools: ["Python 3.11+", "VS Code", "Jupyter", "uv / pip / conda", "ruff (lint)"],
      resources: [
        ["Tài liệu Python chính thức (tutorial)", "https://docs.python.org/3/tutorial/"],
        ["Kaggle Learn — Python", "https://www.kaggle.com/learn/python"]
      ]
    },
    {
      id: "numpy", title: "NumPy", level: 1, hours: 10,
      summary: "Mảng nhiều chiều, broadcasting, vector hoá, số ngẫu nhiên: nền tảng tính toán của mọi thư viện khác.",
      concept: "ndarray là mảng đồng nhất kiểu, lưu liên tục trong bộ nhớ, tính toán bằng C. Broadcasting cho phép cộng mảng khác shape theo quy tắc. Các thao tác cần biết: indexing/slicing, boolean mask, reshape, axis trong sum/mean, np.where, random Generator.",
      why: [
        "Nhanh hơn vòng lặp Python nhiều bậc.",
        "Pandas, scikit-learn, PyTorch đều dựa trên hoặc tương thích NumPy."
      ],
      when: ["Tính toán số học trên ma trận, mô phỏng, xử lý ảnh dạng mảng, viết thuật toán từ đầu."],
      whenNot: ["Dữ liệu bảng có kiểu hỗn hợp và nhãn cột: dùng Pandas/Polars."],
      example: {
        domain: "Tài chính",
        title: "Tính lợi suất và độ biến động danh mục",
        text: "Ma trận giá 250 ngày × 20 mã cổ phiếu. Một dòng NumPy tính lợi suất log hằng ngày, một dòng nữa tính ma trận hiệp phương sai để ra rủi ro danh mục theo trọng số."
      },
      code: { lang: "python", src: `import numpy as np
prices = np.cumprod(1 + np.random.normal(0.0005, 0.02, (250, 20)), axis=0)
ret = np.diff(np.log(prices), axis=0)          # lợi suất log
w = np.full(20, 1 / 20)                         # trọng số đều
cov = np.cov(ret, rowvar=False) * 252           # năm hoá
vol = np.sqrt(w @ cov @ w)
print(f"Độ biến động năm: {vol:.2%}")` },
      pitfalls: ["Quên axis nên tính trung bình sai chiều.", "Slicing trả về view: sửa view làm thay đổi mảng gốc."],
      tools: ["NumPy"],
      resources: [["NumPy — Absolute beginners guide", "https://numpy.org/doc/stable/user/absolute_beginners.html"]]
    },
    {
      id: "pandas", title: "Pandas (và Polars)", level: 1, hours: 25,
      summary: "Đọc, lọc, biến đổi, gộp nhóm, nối bảng, xử lý thời gian: 80% công việc thực tế.",
      concept: "DataFrame là bảng có nhãn cột và chỉ mục. Các thao tác cốt lõi: read_csv/read_excel/read_parquet, loc/iloc, query, assign, groupby().agg(), merge/join, pivot_table, melt, xử lý thiếu (isna, fillna), kiểu category, datetime (dt accessor, resample). Polars là thư viện mới viết bằng Rust, nhanh hơn nhiều với dữ liệu lớn nhờ lazy evaluation và đa luồng.",
      why: [
        "Là công cụ chuẩn để làm sạch và khám phá dữ liệu bảng.",
        "Tích hợp trực tiếp với scikit-learn, matplotlib, seaborn.",
        "Pandas 2.x hỗ trợ backend Apache Arrow giúp tiết kiệm bộ nhớ."
      ],
      when: [
        "Dữ liệu vừa bộ nhớ RAM (đến vài GB).",
        "Chuẩn bị dữ liệu, feature engineering, phân tích nhanh."
      ],
      whenNot: [
        "Dữ liệu hàng chục GB trở lên: dùng Polars, DuckDB hoặc Spark.",
        "Dữ liệu nằm sẵn trong kho dữ liệu: tổng hợp bằng SQL trước rồi mới kéo về."
      ],
      example: {
        domain: "Hàng không (repo)",
        title: "Tách ngày giờ và thời lượng chuyến bay",
        text: "Notebook flight_price.ipynb dùng pd.to_datetime để tách Journey_day, Journey_month, Dep_hour, Arrival_hour, và phân tích chuỗi '2h 50m' thành giờ và phút. Có thể viết gọn bằng các phép vector hoá như đoạn code bên dưới."
      },
      code: { lang: "python", src: `import pandas as pd
df = pd.read_excel("Data_Train.xlsx").dropna()

d = pd.to_datetime(df["Date_of_Journey"], format="%d/%m/%Y")
df = df.assign(
    Journey_day=d.dt.day,
    Journey_month=d.dt.month,
    Dep_hour=pd.to_datetime(df["Dep_Time"], format="%H:%M").dt.hour,
    # "2h 50m" -> 170 phút, không cần vòng lặp
    Duration_min=(df["Duration"].str.extract(r"(?:(\\d+)h)?\\s*(?:(\\d+)m)?")
                  .astype(float).fillna(0) @ [60, 1]),
)
print(df.groupby("Airline")["Price"].agg(["median", "count"]).sort_values("median"))` },
      pitfalls: [
        "SettingWithCopyWarning do gán vào bản sao; dùng .loc hoặc assign.",
        "Dùng apply với hàm Python cho mọi thứ: chậm. Ưu tiên phép vector hoá và .str/.dt.",
        "merge tạo trùng dòng khi khoá không duy nhất; luôn kiểm tra số dòng sau merge (validate='one_to_one')."
      ],
      tools: ["pandas 2.x", "Polars", "DuckDB", "PyArrow"],
      resources: [
        ["Pandas — User Guide", "https://pandas.pydata.org/docs/user_guide/index.html"],
        ["Python for Data Analysis, 3E (miễn phí online)", "https://wesmckinney.com/book/"],
        ["Polars User Guide", "https://docs.pola.rs/"]
      ]
    },
    {
      id: "viz", title: "Trực quan hoá dữ liệu", level: 1, hours: 12,
      summary: "Matplotlib, Seaborn, Plotly và nguyên tắc chọn biểu đồ đúng để kể chuyện bằng dữ liệu.",
      concept: "Chọn biểu đồ theo câu hỏi: phân phối (histogram, boxplot, violin), so sánh nhóm (bar), xu hướng theo thời gian (line), quan hệ hai biến (scatter), tương quan nhiều biến (heatmap), thành phần (stacked bar). Matplotlib là nền, Seaborn cho biểu đồ thống kê nhanh, Plotly cho biểu đồ tương tác, Power BI/Tableau/Looker cho dashboard doanh nghiệp.",
      why: [
        "EDA không có biểu đồ dễ bỏ sót ngoại lệ, phân phối lệch, quan hệ phi tuyến.",
        "Người ra quyết định đọc biểu đồ nhanh hơn bảng số."
      ],
      when: ["EDA, báo cáo, chẩn đoán mô hình (residual plot, learning curve), dashboard giám sát."],
      whenNot: ["Biểu đồ tròn nhiều hơn 5 phần, trục y cắt không từ 0 với bar chart, 3D không cần thiết."],
      example: {
        domain: "Hàng không (repo)",
        title: "Boxen plot giá vé theo hãng",
        text: "Notebook dùng sns.catplot(kind='boxen') để thấy Jet Airways Business có giá cao vượt trội, còn các hãng khác có trung vị tương tự. Phát hiện này giải thích vì sao đặc trưng Airline quan trọng trong mô hình."
      },
      code: { lang: "python", src: `import seaborn as sns, matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.histplot(df["Price"], bins=50, ax=axes[0])          # phân phối lệch phải
sns.boxplot(data=df, x="Total_Stops", y="Price", ax=axes[1])
axes[0].set_title("Phân phối giá vé")
axes[1].set_title("Giá theo số điểm dừng")
plt.tight_layout(); plt.show()
# Lưu ý: sns.distplot trong notebook cũ đã bị loại bỏ, dùng histplot/kdeplot` },
      pitfalls: ["Dùng hàm đã bị loại bỏ (sns.distplot).", "Quá nhiều màu, không có tiêu đề và đơn vị trục."],
      tools: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau", "Streamlit"],
      resources: [
        ["From Data to Viz — chọn biểu đồ", "https://www.data-to-viz.com/"],
        ["Seaborn tutorial", "https://seaborn.pydata.org/tutorial.html"]
      ]
    },
    {
      id: "git-env", title: "Git, môi trường và code tái lập", level: 1, hours: 8,
      summary: "Quản lý phiên bản code, môi trường ảo, requirements, cấu trúc dự án, notebook sạch.",
      concept: "Git lưu lịch sử thay đổi và cho phép làm việc nhóm qua branch và pull request. Môi trường ảo (venv, conda, uv) cô lập phiên bản thư viện; requirements.txt hoặc pyproject.toml ghi lại chúng để người khác tái tạo. Không commit dữ liệu lớn hay file mô hình nặng vào Git; dùng Git LFS hoặc DVC.",
      why: [
        "Kết quả tái lập được là yêu cầu cơ bản của khoa học dữ liệu.",
        "Tránh lỗi \"máy tôi chạy được\" khi triển khai.",
        "Nhà tuyển dụng xem GitHub như portfolio."
      ],
      when: ["Mọi dự án, kể cả dự án cá nhân."],
      whenNot: ["Không commit secret (API key, mật khẩu) hay dữ liệu cá nhân."],
      example: {
        domain: "Repo này",
        title: "Làm cho Flight Fare App chạy được trên máy khác",
        text: "app.py hiện load mô hình từ đường dẫn D:/... nên chỉ chạy trên máy tác giả. Cần đổi sang đường dẫn tương đối theo __file__, thêm requirements.txt ghi rõ phiên bản scikit-learn (pickle phụ thuộc phiên bản) và README hướng dẫn chạy."
      },
      code: { lang: "bash", src: `python -m venv .venv && source .venv/bin/activate
pip install pandas scikit-learn flask flask-cors openpyxl
pip freeze > requirements.txt
git checkout -b feature/relative-paths
git add app.py requirements.txt && git commit -m "Dùng đường dẫn tương đối"
git push -u origin feature/relative-paths` },
      pitfalls: ["Commit file .pkl hàng chục MB và dữ liệu thô.", "Notebook chạy các ô không theo thứ tự nên không tái lập được."],
      tools: ["Git", "GitHub", "uv", "conda", "DVC", "pre-commit"],
      resources: [
        ["Pro Git book", "https://git-scm.com/book/en/v2"],
        ["Cookiecutter Data Science", "https://cookiecutter-data-science.drivendata.org/"]
      ]
    }
  ]
},
{
  id: "s3", track: "data", title: "Dữ liệu: thu thập, SQL, làm sạch, EDA",
  subtitle: "Mô hình chỉ tốt bằng dữ liệu đưa vào",
  weeks: "4–5 tuần",
  goal: "Lấy dữ liệu từ database, API, web; làm sạch và khám phá để hiểu cấu trúc và vấn đề của dữ liệu.",
  modules: [
    {
      id: "sql", title: "SQL", level: 1, hours: 25,
      summary: "SELECT, JOIN, GROUP BY, subquery, CTE, window function: kỹ năng bắt buộc trong gần như mọi tin tuyển dụng.",
      concept: "SQL truy vấn dữ liệu trong cơ sở dữ liệu quan hệ (PostgreSQL, MySQL, SQL Server) và kho dữ liệu (BigQuery, Snowflake, Redshift, Databricks SQL). Thứ tự thực thi logic: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Window function (ROW_NUMBER, LAG, SUM OVER) giúp tính chỉ số theo nhóm mà không mất chi tiết dòng, rất hữu ích cho feature engineering.",
      why: [
        "Dữ liệu doanh nghiệp nằm trong database; SQL là đường ngắn nhất để lấy nó.",
        "Tổng hợp ngay tại kho dữ liệu nhanh hơn kéo hàng triệu dòng về Pandas.",
        "Là vòng phỏng vấn kỹ thuật phổ biến nhất."
      ],
      when: ["Trích xuất, lọc, tổng hợp dữ liệu; tạo đặc trưng theo thời gian; kiểm tra chất lượng dữ liệu."],
      whenNot: ["Logic thống kê hoặc ML phức tạp: làm trong Python sau khi đã tổng hợp."],
      example: {
        domain: "Bán lẻ",
        title: "Đặc trưng RFM cho phân khúc khách hàng",
        text: "Một truy vấn tính Recency (số ngày từ lần mua cuối), Frequency (số đơn), Monetary (tổng chi) cho từng khách. Kết quả dùng trực tiếp cho K-means phân khúc hoặc mô hình churn."
      },
      code: { lang: "sql", src: `WITH orders_clean AS (
  SELECT customer_id, order_date, amount
  FROM orders
  WHERE status = 'completed'
)
SELECT
  customer_id,
  CURRENT_DATE - MAX(order_date)             AS recency_days,
  COUNT(*)                                   AS frequency,
  SUM(amount)                                AS monetary,
  AVG(amount) FILTER (WHERE order_date >= CURRENT_DATE - 90) AS avg_90d
FROM orders_clean
GROUP BY customer_id;

-- Window function: đơn hàng thứ mấy của khách và khoảng cách với đơn trước
SELECT customer_id, order_date,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS nth,
       order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS gap
FROM orders_clean;` },
      pitfalls: [
        "JOIN làm nhân bản dòng rồi SUM ra số sai.",
        "So sánh với NULL bằng = thay vì IS NULL.",
        "SELECT * trên bảng hàng tỉ dòng trong kho dữ liệu tính phí theo lượng quét."
      ],
      tools: ["PostgreSQL", "DuckDB", "BigQuery", "Snowflake", "dbt"],
      resources: [
        ["SQLBolt — bài tập tương tác", "https://sqlbolt.com/"],
        ["Mode SQL Tutorial", "https://mode.com/sql-tutorial/"],
        ["Kaggle Learn — Advanced SQL", "https://www.kaggle.com/learn/advanced-sql"]
      ]
    },
    {
      id: "collection", title: "Thu thập dữ liệu: API, web scraping, file", level: 2, hours: 12,
      summary: "Gọi REST API, crawl web có trách nhiệm, đọc CSV/Excel/JSON/Parquet.",
      concept: "Nguồn dữ liệu phổ biến: database nội bộ, REST/GraphQL API (requests, httpx), web scraping (BeautifulSoup cho HTML tĩnh, Playwright cho trang render bằng JavaScript), dữ liệu mở (Kaggle, data.gov, UCI), file. Parquet là định dạng cột nén tốt, đọc nhanh, nên dùng thay CSV cho dữ liệu trung gian.",
      why: [
        "Bổ sung dữ liệu bên ngoài (thời tiết, giá đối thủ, ngày lễ) thường cải thiện mô hình nhiều hơn đổi thuật toán.",
        "Tự động hoá việc cập nhật dữ liệu định kỳ."
      ],
      when: ["Cần dữ liệu không có sẵn nội bộ; theo dõi giá, tin tức, đánh giá sản phẩm."],
      whenNot: [
        "Trang cấm crawl trong robots.txt hoặc điều khoản sử dụng; dữ liệu cá nhân không có sự đồng ý.",
        "Khi có API chính thức: dùng API thay vì scraping."
      ],
      example: {
        domain: "Du lịch",
        title: "Theo dõi giá vé hằng ngày",
        text: "Một job chạy lúc 6h sáng gọi API của đối tác để lấy giá vé 30 tuyến bay, lưu thành Parquet theo ngày. Sau 6 tháng có đủ dữ liệu để mô hình hoá giá theo số ngày trước khi bay."
      },
      code: { lang: "python", src: `import time, requests, pandas as pd

def fetch(page: int) -> list[dict]:
    r = requests.get("https://api.example.com/fares",
                     params={"page": page}, timeout=10)
    r.raise_for_status()
    return r.json()["items"]

rows = []
for p in range(1, 6):
    rows += fetch(p)
    time.sleep(1)                         # tôn trọng rate limit
pd.DataFrame(rows).to_parquet("fares_2026-09-25.parquet")` },
      pitfalls: ["Không có timeout và retry.", "Scraping quá nhanh bị chặn IP.", "Không lưu dữ liệu thô gốc để xử lý lại."],
      tools: ["requests/httpx", "BeautifulSoup", "Playwright", "Scrapy", "Airflow"],
      resources: [
        ["Requests docs", "https://requests.readthedocs.io/"],
        ["Kaggle Datasets", "https://www.kaggle.com/datasets"],
        ["UCI ML Repository", "https://archive.ics.uci.edu/"]
      ]
    },
    {
      id: "cleaning", title: "Làm sạch dữ liệu", level: 1, hours: 15,
      summary: "Giá trị thiếu, trùng lặp, ngoại lệ, sai kiểu, sai định dạng, dữ liệu không nhất quán.",
      concept: "Các vấn đề thường gặp: missing (MCAR, MAR, MNAR), trùng lặp, ngoại lệ (lỗi nhập hoặc giá trị thật hiếm), kiểu sai (số lưu dạng chuỗi), đơn vị không đồng nhất, chính tả khác nhau của cùng một nhãn. Cách xử lý thiếu: xoá dòng (khi ít và ngẫu nhiên), điền trung vị hoặc mode, điền theo nhóm, KNN/Iterative imputer, hoặc thêm cờ 'bị thiếu' như một đặc trưng.",
      why: [
        "Garbage in, garbage out: lỗi dữ liệu làm sai mọi bước sau.",
        "Nhiều thuật toán (Linear, SVM, KNN) không chấp nhận giá trị NaN."
      ],
      when: ["Ngay sau khi nhận dữ liệu, và mỗi lần có nguồn dữ liệu mới."],
      whenNot: [
        "Đừng xoá ngoại lệ chỉ vì nó lớn: trong phát hiện gian lận, ngoại lệ chính là tín hiệu.",
        "Đừng điền thiếu trước khi chia train/test (gây rò rỉ)."
      ],
      example: {
        domain: "Hàng không (repo)",
        title: "Dòng thiếu Route và Total_Stops",
        text: "Data_Train có 1 dòng thiếu Route và Total_Stops; notebook dùng dropna() là hợp lý vì chỉ mất 1/10.683 dòng. Cột Additional_Info có khoảng 80% là 'No info' nên bị loại. Lưu ý thêm: nhãn 'No info' và 'No Info' khác nhau về chữ hoa, cần chuẩn hoá trước khi đếm."
      },
      code: { lang: "python", src: `print(df.isna().mean().sort_values(ascending=False).head())
df = df.drop_duplicates()
df["Additional_Info"] = df["Additional_Info"].str.strip().str.lower()

# Ngoại lệ theo IQR: đánh dấu thay vì xoá ngay
q1, q3 = df["Price"].quantile([0.25, 0.75])
iqr = q3 - q1
df["price_outlier"] = ~df["Price"].between(q1 - 1.5 * iqr, q3 + 1.5 * iqr)
print(df["price_outlier"].mean())` },
      pitfalls: ["Điền thiếu bằng trung bình toàn bộ dữ liệu trước khi chia tập.", "Không ghi lại các bước làm sạch nên không áp dụng lại được cho dữ liệu mới."],
      tools: ["pandas", "pyjanitor", "Great Expectations", "pandera"],
      resources: [
        ["scikit-learn — Imputation", "https://scikit-learn.org/stable/modules/impute.html"],
        ["Kaggle Learn — Data Cleaning", "https://www.kaggle.com/learn/data-cleaning"]
      ]
    },
    {
      id: "eda", title: "Phân tích khám phá (EDA)", level: 1, hours: 15,
      summary: "Hiểu phân phối, quan hệ giữa các biến, tương quan với target và đặt giả thuyết cho mô hình.",
      concept: "EDA gồm: phân tích đơn biến (phân phối, ngoại lệ), hai biến (quan hệ với target), đa biến (tương quan, tương tác), kiểm tra theo thời gian, và kiểm tra chất lượng dữ liệu. Mục tiêu là hiểu dữ liệu và đặt giả thuyết về đặc trưng, không phải vẽ thật nhiều biểu đồ.",
      why: [
        "Phát hiện rò rỉ dữ liệu (một cột tương quan gần 1 với target là dấu hiệu đáng ngờ).",
        "Định hướng feature engineering và chọn mô hình.",
        "Phát hiện dữ liệu lệch cần biến đổi log."
      ],
      when: ["Trước khi mô hình hoá; khi mô hình cho kết quả bất thường."],
      whenNot: ["Không dùng tập test cho EDA: bạn sẽ vô tình fit theo tập test."],
      example: {
        domain: "Hàng không (repo)",
        title: "Số điểm dừng quyết định giá",
        text: "Boxplot cho thấy giá tăng rõ theo Total_Stops; ExtraTreesRegressor trong notebook cũng xếp Total_Stops và Duration vào nhóm đặc trưng quan trọng nhất. Phân phối Price lệch phải, gợi ý thử dự đoán log(Price)."
      },
      code: { lang: "python", src: `df.describe(include="all").T
df.select_dtypes("number").corr(method="spearman")["Price"].sort_values()

# Báo cáo EDA tự động (dùng để khởi đầu, không thay thế suy nghĩ)
# pip install ydata-profiling
from ydata_profiling import ProfileReport
ProfileReport(df, minimal=True).to_file("eda.html")` },
      pitfalls: ["Chỉ nhìn tương quan Pearson, bỏ sót quan hệ phi tuyến.", "Kết luận nhân quả từ tương quan."],
      tools: ["pandas", "seaborn", "ydata-profiling", "Sweetviz", "D-Tale"],
      resources: [["Kaggle — Comprehensive data exploration with Python", "https://www.kaggle.com/code/pmarcelino/comprehensive-data-exploration-with-python"]]
    }
  ]
}
);
