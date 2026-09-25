/* Ứng dụng thực tế đã được công bố (tra cứu tháng 9/2026).
   kind: "win" = thành công có số liệu, "fail" = thất bại / bài học.
   Số liệu lấy theo nguồn gốc; các con số do bên thứ ba tổng hợp được ghi rõ "theo báo cáo". */
window.ROADMAP_APPS = {
  "crisp-dm": [
    { org: "Booking.com", ind: "Du lịch", kind: "win", title: "150 mô hình ML đưa vào sản phẩm",
      text: "Hàng chục đội đã đưa khoảng 150 mô hình đến tay hàng trăm triệu người dùng, mô hình nào cũng được kiểm chứng bằng thử nghiệm ngẫu nhiên có đối chứng (RCT). Mô hình được chia thành các họ như mô hình sở thích (mức linh hoạt về ngày, giá) và mô hình bối cảnh (đi gia đình hay công tác).",
      result: "Kết luận chính: quy trình lặp, đặt giả thuyết trước, phối hợp với các bộ phận khác là yếu tố quyết định.",
      lesson: "Tăng hiệu năng offline của mô hình không nhất thiết làm tăng giá trị kinh doanh.",
      src: ["KDD 2019 — 150 Successful ML Models (Booking.com)", "https://dl.acm.org/doi/10.1145/3292500.3330744"] },
    { org: "Netflix", ind: "Giải trí", kind: "fail", title: "Giải thưởng Netflix Prize 1 triệu USD",
      text: "Đội thắng năm 2009 cải thiện RMSE 10% bằng cách kết hợp hơn 100 mô hình. Netflix chỉ đưa vào sản phẩm một phần (SVD và RBM), vì phần cải thiện còn lại không đáng với chi phí kỹ thuật. Trong khi đó, cách xem phim đã chuyển từ gửi đĩa DVD sang streaming.",
      result: "Mục tiêu nghiệp vụ thay đổi trong lúc đội ngũ đang tối ưu metric cũ.",
      lesson: "Luôn quay lại bước Hiểu nghiệp vụ: bài toán có còn đúng không?",
      src: ["Netflix TechBlog — Netflix Recommendations: Beyond the 5 stars", "https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429"] }
  ],
  "framing": [
    { org: "Zillow", ind: "Bất động sản", kind: "fail", title: "Zillow Offers: định giá tốt chưa đủ để mua nhà",
      text: "Zillow dùng mô hình định giá để tự mua rồi bán lại nhà. Khi thị trường biến động sau đại dịch, mô hình trả giá quá cao và công ty mua quá nhiều nhà. Dự đoán giá đúng ở mức trung bình không giống với quyết định mua nhà có lãi: người bán chỉ nhận lời khi Zillow trả cao hơn giá trị thật (lựa chọn bất lợi).",
      result: "Đóng mảng kinh doanh tháng 11/2021, cắt khoảng 25% nhân sự, lỗ hơn 500 triệu USD.",
      lesson: "Đóng khung bài toán theo quyết định và rủi ro (sai số một phía, độ bất định), không chỉ theo metric dự đoán.",
      src: ["Stanford GSB — Why Zillow's Algorithmic Home Buying Venture Imploded", "https://www.gsb.stanford.edu/insights/flip-flop-why-zillows-algorithmic-home-buying-venture-imploded"] },
    { org: "Booking.com", ind: "Du lịch", kind: "win", title: "Cách đặt bài toán quan trọng hơn thuật toán",
      text: "Một bài học trong bài báo của Booking.com: cùng một mục tiêu kinh doanh có thể được biến thành nhiều bài toán ML khác nhau. Việc đổi cách đặt bài toán (target nào, đơn vị dự đoán nào) thường mang lại nhiều hơn là tinh chỉnh thuật toán.",
      result: "Nhiều cải thiện lớn nhất đến từ việc đặt lại bài toán chứ không phải từ việc đổi mô hình.",
      src: ["The Morning Paper — 150 successful ML models", "https://blog.acolyer.org/2019/10/07/150-successful-machine-learning-models/"] }
  ],
  "linear-algebra": [
    { org: "Google", ind: "Tìm kiếm", kind: "win", title: "PageRank là một bài toán vector riêng",
      text: "PageRank coi web là một ma trận chuyển tiếp giữa các trang; điểm của mỗi trang là thành phần của vector riêng chính của ma trận đó, tính bằng phép lặp luỹ thừa (power iteration).",
      result: "Là nền tảng xếp hạng của Google Search thời kỳ đầu.",
      src: ["Brin & Page — The Anatomy of a Large-Scale Hypertextual Web Search Engine", "http://infolab.stanford.edu/~backrub/google.html"] },
    { org: "Netflix Prize", ind: "Giải trí", kind: "win", title: "Phân rã ma trận cho hệ gợi ý",
      text: "Ma trận người dùng × phim được phân rã thành hai ma trận vector ẩn có hạng thấp (giống SVD). Tích vô hướng của hai vector cho ra điểm dự đoán.",
      result: "Là thành phần cốt lõi của các đội dẫn đầu Netflix Prize, và Netflix đã đưa kỹ thuật này vào sản phẩm.",
      src: ["Koren, Bell, Volinsky — Matrix Factorization Techniques for Recommender Systems (IEEE Computer 2009)", "https://ieeexplore.ieee.org/document/5197422"] }
  ],
  "calculus": [
    { org: "DeepMind / Google", ind: "Năng lượng", kind: "win", title: "Giảm điện làm mát trung tâm dữ liệu",
      text: "Mạng nơ-ron học từ dữ liệu của hàng nghìn cảm biến (nhiệt độ, điện năng, tốc độ bơm), được huấn luyện bằng gradient descent để dự đoán nhiệt độ và PUE trong giờ tới, từ đó đề xuất cách vận hành hệ thống làm mát.",
      result: "Giảm 40% năng lượng dùng cho làm mát, tương đương giảm 15% phần PUE vượt mức.",
      src: ["DeepMind — AI reduces Google data centre cooling bill by 40%", "https://deepmind.google/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/"] },
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "Hàm loss tự thiết kế cho gợi ý giá",
      text: "Airbnb không dùng MSE mà thiết kế loss riêng phạt khác nhau khi gợi ý giá quá cao (mất booking) và quá thấp (mất doanh thu), rồi tối ưu bằng gradient.",
      result: "Là nền tảng của tính năng Price Tips và Smart Pricing, được kiểm chứng bằng A/B test.",
      src: ["KDD 2018 — Customized Regression Model for Airbnb Dynamic Pricing", "https://dl.acm.org/doi/10.1145/3219819.3219830"] }
  ],
  "probability": [
    { org: "Paul Graham", ind: "Email", kind: "win", title: "Lọc thư rác bằng xác suất Bayes",
      text: "Mỗi từ có xác suất xuất hiện trong thư rác và thư thường; định lý Bayes kết hợp các xác suất này thành xác suất một thư là rác.",
      result: "Tác giả báo cáo lọc được khoảng 99,75% thư rác trong một tháng mà không chặn nhầm thư thường; kỹ thuật này được SpamBayes và nhiều bộ lọc khác áp dụng.",
      src: ["Paul Graham — A Plan for Spam (2002)", "http://www.paulgraham.com/spam.html"] },
    { org: "Duolingo", ind: "Giáo dục", kind: "win", title: "Birdbrain ước lượng xác suất trả lời đúng",
      text: "Mô hình theo tinh thần Item Response Theory ước lượng đồng thời độ khó của từng bài tập và trình độ của người học. Sau mỗi câu trả lời, cả hai ước lượng được cập nhật.",
      result: "Chọn bài tập ở vùng vừa sức cho khoảng 1 tỉ bài tập mỗi ngày (theo báo cáo).",
      src: ["Duolingo Blog — Learning how to help you learn: introducing Birdbrain", "https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain"] }
  ],
  "statistics": [
    { org: "Microsoft Bing", ind: "Quảng cáo", kind: "win", title: "Đổi cách hiển thị tiêu đề quảng cáo",
      text: "Một ý tưởng nhỏ bị xếp ưu tiên thấp suốt nhiều tháng, cho đến khi một kỹ sư chạy A/B test.",
      result: "Doanh thu tăng 12%, hơn 100 triệu USD/năm tại Mỹ, không làm giảm các chỉ số trải nghiệm.",
      lesson: "Trực giác về giá trị của một ý tưởng thường sai: hãy thử nghiệm.",
      src: ["HBR — The Surprising Power of Online Experiments (Kohavi & Thomke, 2017)", "https://hbr.org/2017/09/the-surprising-power-of-online-experiments"] },
    { org: "Chiến dịch Obama 2008", ind: "Chính trị", kind: "win", title: "Thử nghiệm đa biến trên trang đăng ký",
      text: "Thử 4 kiểu nút và 6 loại ảnh hoặc video trên trang chào. Tổ hợp ảnh gia đình và nút \"Learn More\" thắng.",
      result: "Tỉ lệ đăng ký tăng 40,6%, ước tính thêm khoảng 2,8 triệu email và khoảng 60 triệu USD quyên góp.",
      src: ["Optimizely — Obama's $60 million dollar experiment", "https://www.optimizely.com/insights/blog/how-obama-raised-60-million-by-running-a-simple-experiment/"] }
  ],
  "python-core": [
    { org: "Instagram", ind: "Mạng xã hội", kind: "win", title: "Chạy backend Python ở quy mô rất lớn",
      text: "Instagram vận hành phần lớn backend bằng Django (Python) và tối ưu dần thay vì viết lại bằng ngôn ngữ khác.",
      result: "Cho thấy Python đủ dùng trong sản phẩm quy mô lớn nếu biết đo đạc và tối ưu đúng chỗ.",
      src: ["Instagram Engineering — Python at Scale: Strict Modules", "https://instagram-engineering.com/python-at-scale-strict-modules-c0bb9245c834"] },
    { org: "Hệ sinh thái ML", ind: "Công nghệ", kind: "win", title: "Ngôn ngữ chung của Data Science",
      text: "scikit-learn, PyTorch, TensorFlow, Hugging Face, pandas, Spark (PySpark) đều lấy Python làm giao diện chính.",
      result: "Nắm Python cốt lõi là điều kiện để dùng được mọi công cụ ở các giai đoạn sau.",
      src: ["PyTorch — giao diện Python chính", "https://pytorch.org/"] }
  ],
  "numpy": [
    { org: "Event Horizon Telescope", ind: "Khoa học", kind: "win", title: "Ảnh đầu tiên của lỗ đen (2019)",
      text: "Quy trình xử lý dữ liệu của EHT dùng NumPy cùng SciPy, Matplotlib. Việc phát hiện sóng hấp dẫn của LIGO cũng dựa trên NumPy.",
      result: "Bài báo trên Nature (2020) nêu đây là các ví dụ tiêu biểu về vai trò của NumPy trong khoa học.",
      src: ["Nature — Array programming with NumPy (Harris et al., 2020)", "https://www.nature.com/articles/s41586-020-2649-2"] }
  ],
  "pandas": [
    { org: "AQR Capital", ind: "Tài chính", kind: "win", title: "pandas ra đời từ nhu cầu phân tích tài chính",
      text: "Wes McKinney bắt đầu viết pandas năm 2008 tại quỹ AQR để xử lý chuỗi thời gian tài chính, căn chỉnh chỉ mục và dữ liệu thiếu, rồi mở mã nguồn.",
      result: "Trở thành thư viện chuẩn cho phân tích dữ liệu bảng trong Python.",
      src: ["Wes McKinney — Python for Data Analysis 3E (lời nói đầu)", "https://wesmckinney.com/book/"] },
    { org: "Anaconda (khảo sát)", ind: "Công nghệ", kind: "win", title: "Phần lớn thời gian dành cho chuẩn bị dữ liệu",
      text: "Khảo sát State of Data Science của Anaconda cho thấy người làm dữ liệu dành nhiều thời gian nạp và làm sạch dữ liệu hơn cả việc huấn luyện, chọn và triển khai mô hình cộng lại.",
      result: "Khoảng 45% thời gian cho chuẩn bị dữ liệu (2020), 39% (2021).",
      src: ["BigDATAwire — Data Prep Still Dominates Data Scientists' Time", "https://www.bigdatawire.com/2020/07/06/data-prep-still-dominates-data-scientists-time-survey-finds/"] }
  ],
  "viz": [
    { org: "Florence Nightingale", ind: "Y tế", kind: "win", title: "Biểu đồ hoa hồng về tử vong trong Chiến tranh Krym",
      text: "Nightingale vẽ biểu đồ cho thấy phần lớn binh sĩ chết vì bệnh có thể phòng tránh chứ không phải vì vết thương.",
      result: "Biểu đồ thuyết phục chính phủ Anh cải cách vệ sinh trong bệnh viện quân đội.",
      src: ["Wikipedia — Florence Nightingale: Statistics and sanitary reform", "https://en.wikipedia.org/wiki/Florence_Nightingale"] },
    { org: "Airbnb", ind: "Công nghệ", kind: "win", title: "Apache Superset",
      text: "Airbnb xây Superset làm công cụ khám phá dữ liệu và dashboard nội bộ, sau đó tặng cho Apache Software Foundation.",
      result: "Trở thành một trong những công cụ BI mã nguồn mở phổ biến nhất.",
      src: ["Apache Superset", "https://superset.apache.org/"] }
  ],
  "git-env": [
    { org: "Microsoft", ind: "Công nghệ", kind: "win", title: "Chuyển mã nguồn Windows sang Git",
      text: "Microsoft chuyển kho mã Windows (khoảng 300 GB, 3,5 triệu file) sang Git và xây thêm công cụ ảo hoá hệ thống file để Git chạy được ở quy mô đó.",
      result: "Khoảng 4.000 kỹ sư làm việc trên cùng một repo Git.",
      src: ["Microsoft DevBlogs — The largest Git repo on the planet", "https://devblogs.microsoft.com/bharry/the-largest-git-repo-on-the-planet/"] },
    { org: "NeurIPS", ind: "Nghiên cứu", kind: "win", title: "Danh mục kiểm tra khả năng tái lập",
      text: "Từ năm 2019, NeurIPS yêu cầu tác giả điền danh mục kiểm tra khả năng tái lập (code, dữ liệu, siêu tham số, môi trường) khi nộp bài.",
      result: "Tỉ lệ bài báo có kèm code tăng rõ sau khi áp dụng.",
      src: ["Pineau et al. — Improving Reproducibility in ML Research (NeurIPS 2019 program)", "https://arxiv.org/abs/2003.12206"] }
  ],
  "sql": [
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "Minerva: định nghĩa metric một lần, dùng mọi nơi",
      text: "Metric và dimension được định nghĩa trong cấu hình; Minerva tự sinh SQL để phục vụ dashboard, thử nghiệm A/B và các pipeline ML.",
      result: "Chấm dứt tình trạng mỗi đội tính \"số booking\" một kiểu; số metric được quản lý tăng hơn gấp đôi sau khi ra mắt.",
      src: ["Airbnb Tech Blog — How Airbnb achieved metric consistency at scale", "https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70"] },
    { org: "Uber", ind: "Gọi xe", kind: "win", title: "QueryGPT: hỏi bằng tiếng Anh, nhận SQL",
      text: "Nền tảng dữ liệu của Uber có khoảng 1,2 triệu truy vấn tương tác mỗi tháng. QueryGPT dùng LLM, vector search và các \"workspace\" theo lĩnh vực để sinh SQL từ câu hỏi.",
      result: "Uber ước tính tiết kiệm khoảng 140.000 giờ mỗi năm; người dùng vẫn cần hiểu SQL để kiểm tra kết quả.",
      src: ["Uber Blog — QueryGPT: Natural Language to SQL", "https://www.uber.com/blog/query-gpt/"] }
  ],
  "collection": [
    { org: "Common Crawl", ind: "AI", kind: "win", title: "Dữ liệu web mở để huấn luyện mô hình ngôn ngữ",
      text: "Tổ chức phi lợi nhuận Common Crawl thu thập hàng tỉ trang web mỗi tháng và phát hành miễn phí.",
      result: "Là một trong các nguồn dữ liệu chính của nhiều LLM (sau khi lọc kỹ chất lượng).",
      src: ["Common Crawl", "https://commoncrawl.org/"] },
    { org: "Google Flu Trends", ind: "Y tế", kind: "fail", title: "Dữ liệu tìm kiếm không phải số ca bệnh",
      text: "GFT ước lượng số ca cúm từ lượng tìm kiếm. Hành vi tìm kiếm thay đổi (truyền thông gây hoang mang, thuật toán tìm kiếm thay đổi) nhưng mô hình không được cập nhật.",
      result: "Mùa cúm 2012–2013, GFT ước lượng gần gấp đôi số liệu của CDC.",
      lesson: "Hiểu rõ quá trình sinh ra dữ liệu thu thập được; nguồn dữ liệu bên ngoài có thể đổi mà không báo trước.",
      src: ["Science — The Parable of Google Flu: Traps in Big Data Analysis", "https://www.science.org/doi/10.1126/science.1248506"] }
  ],
  "cleaning": [
    { org: "NASA", ind: "Hàng không vũ trụ", kind: "fail", title: "Mars Climate Orbiter mất tích vì lệch đơn vị",
      text: "Một nhóm gửi dữ liệu xung lực theo đơn vị pound-lực·giây, nhóm kia hiểu là newton·giây. Không có bước kiểm tra đơn vị nào phát hiện ra sai lệch.",
      result: "Tàu vũ trụ trị giá khoảng 125 triệu USD bị mất năm 1999.",
      lesson: "Chuẩn hoá và kiểm tra đơn vị, định dạng giữa các nguồn là bước bắt buộc của làm sạch dữ liệu.",
      src: ["Wikipedia — Mars Climate Orbiter", "https://en.wikipedia.org/wiki/Mars_Climate_Orbiter"] },
    { org: "Lyft", ind: "Gọi xe", kind: "win", title: "Kiểm tra dữ liệu đầu vào ngay khi dự đoán",
      text: "Lyft dùng Great Expectations để kiểm tra từng request dự đoán (kiểu, khoảng giá trị, giá trị thiếu) trước khi đưa vào mô hình.",
      result: "Là một trong bốn lớp giám sát giúp phát hiện hơn 15 sự cố nghiêm trọng trong 9 tháng đầu.",
      src: ["Lyft Engineering — Full-Spectrum ML Model Monitoring at Lyft", "https://eng.lyft.com/full-spectrum-ml-model-monitoring-at-lyft-a4cdaf828e8f"] }
  ],
  "eda": [
    { org: "John Snow", ind: "Y tế", kind: "win", title: "Bản đồ dịch tả London 1854",
      text: "Snow đánh dấu các ca tử vong trên bản đồ và thấy chúng tập trung quanh máy bơm nước ở phố Broad Street.",
      result: "Tay cầm máy bơm bị tháo, số ca mới giảm; đây là nền móng của dịch tễ học hiện đại.",
      src: ["UCLA — John Snow and the Broad Street pump", "https://www.ph.ucla.edu/epi/snow.html"] },
    { org: "Google Flu Trends", ind: "Y tế", kind: "fail", title: "Tương quan giả do không khám phá kỹ",
      text: "Từ 50 triệu từ khoá, mô hình chọn ra những từ tương quan với mùa cúm; một số chỉ tương quan với mùa đông (ví dụ từ khoá về bóng rổ trường học).",
      result: "Mô hình dự báo sai lệch kéo dài từ trước năm 2013.",
      lesson: "Khi EDA thấy tương quan, hãy hỏi cơ chế nào sinh ra nó.",
      src: ["Science — The Parable of Google Flu", "https://www.science.org/doi/10.1126/science.1248506"] }
  ],
  "encoding": [
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "Embedding cho mã phòng thay vì one-hot",
      text: "Có hàng triệu listing nên one-hot không khả thi. Airbnb học vector embedding cho mỗi listing từ chuỗi click trong phiên tìm kiếm (giống word2vec) và dùng làm đặc trưng xếp hạng.",
      result: "Cải thiện gợi ý \"phòng tương tự\" và tìm kiếm cá nhân hoá theo thời gian thực; đoạt giải bài báo tốt nhất KDD 2018.",
      src: ["KDD 2018 — Real-time Personalization using Embeddings for Search Ranking at Airbnb", "https://dl.acm.org/doi/10.1145/3219819.3219885"] },
    { org: "Yandex", ind: "Tìm kiếm", kind: "win", title: "CatBoost xử lý biến phân loại trực tiếp",
      text: "Yandex phát triển CatBoost với kỹ thuật ordered target statistics để mã hoá biến phân loại mà không rò rỉ target, rồi mở mã nguồn năm 2017.",
      result: "Dùng trong nhiều dịch vụ của Yandex và được nhiều công ty khác áp dụng cho dữ liệu bảng có nhiều biến phân loại.",
      src: ["CatBoost — tài liệu chính thức", "https://catboost.ai/"] }
  ],
  "scaling": [
    { org: "Uber Eats", ind: "Giao đồ ăn", kind: "win", title: "Đặc trưng lịch sử và gần thời gian thực",
      text: "Mô hình thời gian giao hàng dùng ba nhóm đặc trưng: thông tin đơn (giờ, địa điểm), đặc trưng lịch sử (thời gian chuẩn bị trung bình 7 ngày) và đặc trưng gần thời gian thực (trung bình 1 giờ qua).",
      result: "Mô hình GBDT chạy trên nền tảng Michelangelo; theo các báo cáo tổng hợp, độ chính xác ETA cải thiện khoảng 26%.",
      src: ["Uber Blog — Meet Michelangelo", "https://www.uber.com/blog/michelangelo-machine-learning-platform/"] },
    { org: "DoorDash", ind: "Giao đồ ăn", kind: "win", title: "Tín hiệu thời gian thực là đặc trưng mạnh nhất",
      text: "Thời gian tài xế chờ ở nhà hàng và số đơn đang đặt nằm trong top 10 đặc trưng quan trọng nhất của mô hình ETA.",
      result: "Đặc trưng thời gian thực giúp mô hình phản ứng với tình trạng quá tải tại từng nhà hàng.",
      src: ["DoorDash — Supercharging marketplace decision-making with real-time knowledge", "https://careersatdoordash.com/blog/supercharging-doordashs-marketplace-decision-making-with-real-time-knowledge/"] }
  ],
  "feature-selection": [
    { org: "Google", ind: "Công nghệ", kind: "win", title: "Dọn đặc trưng không còn dùng",
      text: "Rules of ML khuyên xoá đặc trưng không còn đóng góp: chúng làm pipeline phức tạp, tốn tính toán và có thể hỏng khi dữ liệu nguồn thay đổi.",
      result: "Là một trong các nguyên tắc vận hành ML được Google công bố từ kinh nghiệm nội bộ.",
      src: ["Google — Rules of Machine Learning (rule #22)", "https://developers.google.com/machine-learning/guides/rules-of-ml"] },
    { org: "Lyft", ind: "Gọi xe", kind: "win", title: "Feature service với hàng nghìn đặc trưng",
      text: "Lyft xây dịch vụ đặc trưng dùng chung cho nhiều mô hình, để đặc trưng lúc huấn luyện và lúc phục vụ được tính giống nhau.",
      result: "Hàng nghìn đặc trưng được chia sẻ, giảm việc mỗi đội tự tính lại.",
      src: ["Lyft Engineering — LyftLearn", "https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1"] }
  ],
  "imbalanced": [
    { org: "Stripe", ind: "Thanh toán", kind: "win", title: "Radar chấm điểm gian lận từng giao dịch",
      text: "Mỗi giao dịch nhận điểm rủi ro 0–100 từ mô hình học trên dữ liệu của toàn mạng lưới Stripe, dựa trên hàng trăm tín hiệu (thiết bị, IP, tốc độ giao dịch, lịch sử thẻ). Merchant có thể thêm luật riêng dựa trên điểm này.",
      result: "Stripe báo cáo giảm gian lận trung bình khoảng 32% và đồng thời giảm chặn nhầm.",
      src: ["Stripe — How we built it: Stripe Radar", "https://stripe.dev/blog/how-we-built-it-stripe-radar"] },
    { org: "ULB / Worldline", ind: "Ngân hàng", kind: "win", title: "Bộ dữ liệu gian lận thẻ tín dụng châu Âu",
      text: "284.807 giao dịch trong 2 ngày, chỉ 492 giao dịch gian lận (0,172%). Đây là bộ dữ liệu chuẩn để luyện kỹ thuật cho dữ liệu mất cân bằng.",
      result: "Tác giả khuyến nghị đánh giá bằng AUPRC vì accuracy không có ý nghĩa với dữ liệu này.",
      src: ["Kaggle — Credit Card Fraud Detection", "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud"] }
  ],
  "pipelines": [
    { org: "Uber", ind: "Gọi xe", kind: "win", title: "Michelangelo: một pipeline từ dữ liệu đến dự đoán",
      text: "Michelangelo chuẩn hoá quy trình quản lý dữ liệu, huấn luyện, đánh giá, triển khai, dự đoán và giám sát; feature store dùng chung cho cả huấn luyện và phục vụ.",
      result: "Trở thành nền tảng cho hàng nghìn mô hình tại Uber.",
      src: ["Uber Blog — Meet Michelangelo", "https://www.uber.com/blog/michelangelo-machine-learning-platform/"] }
  ],
  "linear-regression": [
    { org: "Meta", ind: "Marketing", kind: "win", title: "Robyn: Marketing Mix Model bằng Ridge",
      text: "Robyn dùng hồi quy Ridge để ước lượng đóng góp của từng kênh quảng cáo vào doanh số, xử lý đa cộng tuyến giữa các kênh, kết hợp tối ưu tiến hoá để chọn siêu tham số adstock và độ bão hoà.",
      result: "Mã nguồn mở, được nhiều đội marketing dùng thay cho MMM của các hãng tư vấn.",
      src: ["Meta Robyn", "https://facebookexperimental.github.io/Robyn/"] },
    { org: "Google", ind: "Marketing", kind: "win", title: "Meridian: MMM Bayesian",
      text: "Meridian (2024) là mô hình hồi quy Bayes cho marketing mix, cho phép đưa kiến thức trước (prior) và kết quả thử nghiệm vào mô hình.",
      result: "Mở mã nguồn, minh bạch hơn các MMM đóng của bên thứ ba.",
      src: ["Google Meridian", "https://developers.google.com/meridian"] }
  ],
  "logistic-regression": [
    { org: "Google Ads", ind: "Quảng cáo", kind: "win", title: "Dự đoán tỉ lệ click quảng cáo",
      text: "Google mô tả hệ thống dự đoán CTR dựa trên hồi quy logistic, huấn luyện online bằng thuật toán FTRL-Proximal trên hàng tỉ ví dụ với đặc trưng rất thưa.",
      result: "Bài báo \"View from the Trenches\" là tài liệu kinh điển về vận hành logistic regression ở quy mô lớn.",
      src: ["KDD 2013 — Ad Click Prediction: a View from the Trenches", "https://research.google/pubs/ad-click-prediction-a-view-from-the-trenches/"] },
    { org: "MoMo", ind: "Fintech Việt Nam", kind: "win", title: "Chấm điểm tín dụng bằng dữ liệu thay thế",
      text: "MoMo xây mô hình chấm điểm tín dụng dùng dữ liệu thay thế (lịch sử thanh toán hoá đơn, hành vi giao dịch) cho người chưa có lịch sử tín dụng ở CIC, rồi kết nối với các tổ chức tài chính.",
      result: "Mô hình vào top 3 hạng mục Giải pháp AI xuất sắc tại AI Awards 2025.",
      src: ["MoMo — MoMo nhận cú đúp giải thưởng tại AI Awards 2025", "https://www.momo.vn/tin-tuc/thong-cao-bao-chi/momo-nhan-cu-dup-giai-thuong-tai-ai-awards-2025-8158"] }
  ],
  "knn": [
    { org: "Spotify", ind: "Âm nhạc", kind: "win", title: "Annoy: tìm láng giềng gần đúng",
      text: "Spotify viết và mở mã nguồn Annoy để tìm các bài hát có vector gần nhau trong hàng triệu bài, với bộ nhớ và độ trễ thấp.",
      result: "Được dùng cho gợi ý nhạc và trở thành thư viện ANN phổ biến.",
      src: ["GitHub — spotify/annoy", "https://github.com/spotify/annoy"] },
    { org: "Meta", ind: "Mạng xã hội", kind: "win", title: "FAISS: tìm kiếm vector tỉ phần tử",
      text: "FAISS tìm láng giềng gần nhất trên hàng tỉ vector bằng GPU, dùng cho tìm ảnh tương tự, phát hiện trùng lặp và RAG.",
      result: "Là nền tảng của nhiều vector database hiện nay.",
      src: ["Meta Engineering — Faiss: A library for efficient similarity search", "https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/"] }
  ],
  "decision-tree": [
    { org: "Microsoft Kinect", ind: "Game", kind: "win", title: "Nhận dạng tư thế cơ thể theo thời gian thực",
      text: "Kinect dùng rừng cây quyết định phân loại từng điểm ảnh độ sâu thành bộ phận cơ thể; mỗi cây chỉ so sánh chênh lệch độ sâu giữa các điểm, đủ nhanh để chạy trên máy chơi game.",
      result: "Chạy khoảng 200 khung hình/giây trên GPU của Xbox; đoạt giải bài báo tốt nhất CVPR 2011.",
      src: ["Shotton et al. — Real-Time Human Pose Recognition in Parts from Single Depth Images", "https://www.microsoft.com/en-us/research/publication/real-time-human-pose-recognition-in-parts-from-a-single-depth-image/"] }
  ],
  "random-forest": [
    { org: "Microsoft Kinect", ind: "Game", kind: "win", title: "Random decision forest trên hàng trăm nghìn ảnh",
      text: "Huấn luyện ba cây sâu 20 tầng trên khoảng 1 triệu ảnh độ sâu tổng hợp; trung bình dự đoán của các cây giúp ổn định kết quả.",
      result: "Công nghệ nhận dạng người chơi của Kinect.",
      src: ["Microsoft Research — Real-Time Human Pose Recognition", "https://www.microsoft.com/en-us/research/publication/real-time-human-pose-recognition-in-parts-from-a-single-depth-image/"] },
    { org: "Repo này", ind: "Hàng không", kind: "win", title: "Dự đoán giá vé bằng RandomForestRegressor",
      text: "Notebook flight_price.ipynb đạt R² 0,798 trên tập test với MAE 1.174 rupee.",
      result: "Baseline tốt cho dữ liệu bảng; xem giai đoạn 13 để nâng cấp.",
      src: ["AI/Flight_Fare_Prediction", "https://github.com/htl2910/Full-Stack-Data-Science---Machine-Learning-BootCamp-Course/tree/main/AI/Flight_Fare_Prediction"] }
  ],
  "boosting": [
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "GBDT cho xếp hạng tìm kiếm",
      text: "Thay hàm chấm điểm viết tay bằng mô hình GBDT là một trong những bước tăng booking lớn nhất lịch sử Airbnb. Khi GBDT chững lại, họ chuyển dần sang mạng nơ-ron và dùng chỉ số lá của cây GBDT làm đặc trưng cho mạng.",
      result: "GBDT là baseline khó vượt; mạng nơ-ron đơn giản đầu tiên chỉ hoà.",
      src: ["arXiv — Applying Deep Learning To Airbnb Search", "https://arxiv.org/abs/1810.09591"] },
    { org: "Walmart (cuộc thi M5)", ind: "Bán lẻ", kind: "win", title: "LightGBM thắng cuộc thi dự báo bán lẻ",
      text: "Dự báo doanh số 42.840 chuỗi sản phẩm của Walmart. Người thắng dùng tổ hợp trọng số đều của nhiều mô hình LightGBM; phần lớn đội top đều dùng LightGBM.",
      result: "Các phương pháp ML, đặc biệt LightGBM, vượt rõ các benchmark thống kê.",
      src: ["International Journal of Forecasting — M5 accuracy competition: Results, findings, and conclusions", "https://www.sciencedirect.com/science/article/pii/S0169207021001874"] },
    { org: "Uber Eats", ind: "Giao đồ ăn", kind: "win", title: "GBDT dự đoán thời gian giao hàng",
      text: "Mô hình hồi quy GBDT dự đoán tổng thời gian giao, và tính lại ở mỗi chặng của đơn hàng.",
      result: "Chạy trên Michelangelo cùng các mô hình xếp hạng nhà hàng và autocomplete.",
      src: ["Uber Blog — Meet Michelangelo", "https://www.uber.com/blog/michelangelo-machine-learning-platform/"] }
  ],
  "svm": [
    { org: "Nghiên cứu (Joachims)", ind: "Văn bản", kind: "win", title: "SVM cho phân loại văn bản",
      text: "Joachims chỉ ra SVM tuyến tính phù hợp với văn bản vì không gian đặc trưng rất nhiều chiều và thưa, ít đặc trưng thừa, và các lớp thường tách được tuyến tính.",
      result: "SVM vượt các phương pháp thời đó trên bộ Reuters; LinearSVC với TF-IDF vẫn là baseline mạnh đến nay.",
      src: ["Joachims — Text Categorization with Support Vector Machines (ECML 1998)", "https://link.springer.com/chapter/10.1007/BFb0026683"] }
  ],
  "naive-bayes": [
    { org: "SpamBayes / Paul Graham", ind: "Email", kind: "win", title: "Bộ lọc thư rác Bayes",
      text: "Sau bài viết \"A Plan for Spam\", các bộ lọc Naive Bayes như SpamBayes, và bộ lọc tích hợp trong nhiều trình đọc thư, được triển khai rộng rãi.",
      result: "Tỉ lệ lọc trên 99% với rất ít thư bị chặn nhầm; kẻ gửi rác chuyển sang chèn từ ngữ vô hại để đánh lừa bộ lọc.",
      lesson: "Mô hình phải cập nhật liên tục khi đối thủ thay đổi hành vi (adversarial drift).",
      src: ["Wikipedia — SpamBayes", "https://en.wikipedia.org/wiki/SpamBayes"] }
  ],
  "metrics": [
    { org: "Booking.com", ind: "Du lịch", kind: "fail", title: "Metric offline tăng, kinh doanh không tăng",
      text: "Booking.com thấy nhiều mô hình cải thiện metric offline nhưng không làm tăng chỉ số kinh doanh trong A/B test, có trường hợp còn giảm, do metric offline không đo đúng giá trị hoặc do độ trễ của mô hình.",
      result: "Chuyển trọng tâm sang đo tác động kinh doanh bằng RCT.",
      src: ["KDD 2019 — 150 Successful ML Models", "https://dl.acm.org/doi/10.1145/3292500.3330744"] },
    { org: "Google (y tế)", ind: "Y tế", kind: "win", title: "Chọn điểm vận hành theo độ nhạy và độ đặc hiệu",
      text: "Hệ thống sàng lọc võng mạc báo cáo AUC 0,99, nhưng khi vận hành phải chọn ngưỡng: ưu tiên độ nhạy cao (bỏ sót ít) và chấp nhận thêm ca chuyển tuyến.",
      result: "Tại Thái Lan: độ nhạy 0,97 so với 0,74 của chuyên viên đọc ảnh, độ đặc hiệu 0,96 so với 0,98.",
      src: ["npj Digital Medicine — Deep learning vs human graders (Thailand)", "https://www.nature.com/articles/s41746-019-0099-8"] }
  ],
  "validation": [
    { org: "Google Flu Trends", ind: "Y tế", kind: "fail", title: "Không kiểm chứng theo thời gian",
      text: "Mô hình fit trên dữ liệu CDC 2003–2008 và không được huấn luyện lại. Nếu đánh giá bằng cách chia theo thời gian với các mùa sau, sai lệch sẽ lộ ra sớm.",
      result: "Dự báo gần gấp đôi thực tế mùa 2012–2013.",
      lesson: "Dữ liệu có thứ tự thời gian phải được chia theo thời gian, và phải theo dõi liên tục.",
      src: ["Science — The Parable of Google Flu", "https://www.science.org/doi/10.1126/science.1248506"] }
  ],
  "bias-variance": [
    { org: "Netflix Prize", ind: "Giải trí", kind: "win", title: "Kết hợp nhiều mô hình để giảm phương sai",
      text: "Các đội dẫn đầu blend hàng trăm mô hình (SVD, RBM, kNN…) để giảm phương sai. Ban tổ chức giữ một tập test bí mật để phát hiện đội overfit leaderboard.",
      result: "Cải thiện 10% RMSE nhưng mô hình kết hợp quá phức tạp để triển khai toàn bộ.",
      src: ["Netflix TechBlog — Beyond the 5 stars", "https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429"] }
  ],
  "tuning": [
    { org: "Google", ind: "Công nghệ", kind: "win", title: "Vizier: tối ưu hộp đen làm dịch vụ",
      text: "Google xây Vizier để tinh chỉnh siêu tham số và cấu hình cho nhiều sản phẩm bằng tối ưu Bayes và các thuật toán khác, dùng chung toàn công ty.",
      result: "Trở thành nền tảng của Vertex AI Vizier; phiên bản mã nguồn mở OSS Vizier ra mắt năm 2022.",
      src: ["KDD 2017 — Google Vizier: A Service for Black-Box Optimization", "https://research.google/pubs/google-vizier-a-service-for-black-box-optimization/"] },
    { org: "Preferred Networks", ind: "AI", kind: "win", title: "Optuna",
      text: "Optuna do công ty Nhật Preferred Networks phát triển, cho phép định nghĩa không gian tìm kiếm ngay trong code và cắt sớm các lần thử kém.",
      result: "Là thư viện tuning phổ biến trong cộng đồng Kaggle và nghiên cứu.",
      src: ["KDD 2019 — Optuna: A Next-generation Hyperparameter Optimization Framework", "https://arxiv.org/abs/1907.10902"] }
  ],
  "explainability": [
    { org: "Amazon", ind: "Tuyển dụng", kind: "fail", title: "Công cụ sàng lọc CV thiên vị nữ giới",
      text: "Mô hình học từ 10 năm hồ sơ, phần lớn của nam giới, nên trừ điểm hồ sơ có từ \"women's\" hoặc tên một số trường nữ sinh. Việc kiểm tra xem mô hình dựa vào đặc trưng nào đã làm lộ ra vấn đề.",
      result: "Amazon dừng dự án năm 2018 vì không chắc chắn loại bỏ được thiên vị.",
      lesson: "Giải thích mô hình và kiểm tra công bằng là bắt buộc với quyết định ảnh hưởng tới con người.",
      src: ["MIT Technology Review — Amazon ditched AI recruitment software", "https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/"] },
    { org: "Ngân hàng (Mỹ)", ind: "Tín dụng", kind: "win", title: "Nghĩa vụ nêu lý do từ chối tín dụng",
      text: "Luật ECOA/Regulation B yêu cầu bên cho vay nêu lý do cụ thể khi từ chối, kể cả khi dùng mô hình phức tạp. CFPB nhấn mạnh việc dùng \"thuật toán hộp đen\" không phải lý do để miễn nghĩa vụ này.",
      result: "Các đội tín dụng dùng SHAP hoặc scorecard để sinh lý do từ chối cho từng hồ sơ.",
      src: ["CFPB — Circular 2022-03: Adverse action notification with complex algorithms", "https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/"] }
  ],
  "kmeans": [
    { org: "Netflix", ind: "Giải trí", kind: "win", title: "Cộng đồng sở thích (taste communities)",
      text: "Netflix nhóm người xem thành vài nghìn cộng đồng sở thích dựa trên hành vi xem, thay vì theo tuổi hay quốc gia.",
      result: "Các cộng đồng này là một đầu vào của hệ gợi ý và việc chọn ảnh bìa cho từng người.",
      src: ["Wired — How Netflix's algorithms work", "https://www.wired.co.uk/article/how-do-netflixs-algorithms-work-machine-learning-helps-to-predict-what-viewers-will-like"] },
    { org: "UCI Online Retail II", ind: "Bán lẻ", kind: "win", title: "Bộ dữ liệu thực hành phân khúc RFM",
      text: "Giao dịch thật của một nhà bán lẻ trực tuyến ở Anh giai đoạn 2009–2011, thường dùng để thực hành RFM + K-Means.",
      result: "Dự án mốc sau giai đoạn 7 trong hướng dẫn học.",
      src: ["UCI — Online Retail II", "https://archive.ics.uci.edu/dataset/502/online+retail+ii"] }
  ],
  "dbscan": [
    { org: "BERTopic", ind: "Văn bản", kind: "win", title: "HDBSCAN để gom chủ đề văn bản",
      text: "BERTopic tạo embedding câu, giảm chiều bằng UMAP rồi gom cụm bằng HDBSCAN; văn bản không thuộc cụm nào được coi là nhiễu thay vì bị ép vào một chủ đề.",
      result: "Là công cụ phổ biến để phân tích phản hồi khách hàng, tin tức, đánh giá sản phẩm.",
      src: ["BERTopic docs", "https://maartengr.github.io/BERTopic/"] }
  ],
  "pca": [
    { org: "MIT (Turk & Pentland)", ind: "Thị giác máy", kind: "win", title: "Eigenfaces",
      text: "Dùng PCA biểu diễn khuôn mặt bằng vài chục thành phần chính, rồi nhận dạng bằng khoảng cách trong không gian đó.",
      result: "Một trong những hệ nhận dạng khuôn mặt tự động đầu tiên (1991).",
      src: ["Turk & Pentland — Eigenfaces for Recognition", "https://doi.org/10.1162/jocn.1991.3.1.71"] }
  ],
  "anomaly": [
    { org: "Netflix", ind: "Giải trí", kind: "win", title: "RAD phát hiện bất thường trong thanh toán và đăng ký",
      text: "Các cách dựa trên trung bình trượt không đủ ổn định với dữ liệu nhiều chiều. Netflix chuyển sang Robust PCA: tách dữ liệu thành phần hạng thấp, nhiễu và điểm bất thường.",
      result: "Mở mã nguồn trong dự án Surus.",
      src: ["Netflix TechBlog — RAD: Outlier Detection on Big Data", "http://techblog.netflix.com/2015/02/rad-outlier-detection-on-big-data.html"] },
    { org: "Stripe", ind: "Thanh toán", kind: "win", title: "Kết hợp mô hình có giám sát và không giám sát",
      text: "Radar kết hợp mô hình học từ các khiếu nại gian lận đã biết với tín hiệu bất thường về hành vi, để phát hiện cả kiểu gian lận mới.",
      result: "Chấm điểm mỗi giao dịch trong khoảng 100 ms (theo báo cáo).",
      src: ["Stripe — A primer on machine learning for fraud detection", "https://stripe.com/guides/primer-on-machine-learning-for-fraud-protection"] }
  ],
  "recsys": [
    { org: "Netflix", ind: "Giải trí", kind: "win", title: "Gợi ý quyết định phần lớn thời gian xem",
      text: "Netflix dùng nhiều thuật toán (xếp hạng cá nhân hoá, top-N, trending, xem tiếp, phim tương tự…) cho từng hàng trên trang chủ.",
      result: "Gợi ý ảnh hưởng khoảng 80% số giờ xem; giảm rời bỏ nhờ cá nhân hoá được ước tính giúp tiết kiệm hơn 1 tỉ USD/năm.",
      src: ["ACM TMIS — The Netflix Recommender System (Gomez-Uribe & Hunt, 2015)", "https://dl.acm.org/doi/10.1145/2843948"] },
    { org: "Amazon", ind: "Thương mại điện tử", kind: "win", title: "Item-to-item collaborative filtering",
      text: "Thay vì tìm người dùng giống nhau, Amazon tính trước độ liên quan giữa các sản phẩm, nên mở rộng được cho hàng chục triệu khách.",
      result: "Bài báo năm 2003 được IEEE Internet Computing chọn là bài đứng vững nhất trước thử thách thời gian.",
      src: ["Amazon Science — The history of Amazon's recommendation algorithm", "https://www.amazon.science/the-history-of-amazons-recommendation-algorithm"] },
    { org: "Pinterest", ind: "Mạng xã hội", kind: "win", title: "PinSage: mạng nơ-ron đồ thị",
      text: "Đồ thị 3 tỉ nút (pin, board) và 18 tỉ cạnh; mô hình học embedding kết hợp ảnh, văn bản và cấu trúc đồ thị.",
      result: "Tăng 25% lượt hiển thị cho tính năng Shop the Look.",
      src: ["Pinterest Engineering — PinSage", "https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48"] },
    { org: "Spotify", ind: "Âm nhạc", kind: "win", title: "Discover Weekly",
      text: "Kết hợp ba nguồn: collaborative filtering từ playlist của người dùng, NLP trên văn bản nói về bài hát, và CNN phân tích âm thanh cho bài mới chưa có lượt nghe (xử lý cold start).",
      result: "Playlist cá nhân hoá hằng tuần cho hàng trăm triệu người dùng.",
      src: ["The Sound of AI — Spotify's Discover Weekly explained", "https://medium.com/the-sound-of-ai/spotifys-discover-weekly-explained-breaking-from-your-music-bubble-or-maybe-not-b506da144123"] }
  ],
  "ts-basics": [
    { org: "Meta (Facebook)", ind: "Công nghệ", kind: "win", title: "Prophet: dự báo ở quy mô tổ chức",
      text: "Prophet được xây để nhiều nhà phân tích không chuyên chuỗi thời gian dự báo được các chỉ số kinh doanh có mùa vụ nhiều tầng và ngày lễ, với tham số dễ hiểu.",
      result: "Mở mã nguồn năm 2017, trở thành công cụ dự báo phổ biến trong doanh nghiệp.",
      src: ["Taylor & Letham — Forecasting at Scale", "https://peerj.com/preprints/3190/"] }
  ],
  "ts-ml": [
    { org: "Walmart (M5)", ind: "Bán lẻ", kind: "win", title: "Mô hình toàn cục LightGBM",
      text: "Giải pháp thắng M5 huấn luyện 220 mô hình LightGBM theo cửa hàng, nhóm hàng, ngành hàng rồi lấy trung bình.",
      result: "Chứng minh mô hình toàn cục học trên nhiều chuỗi hiệu quả với dữ liệu bán lẻ.",
      src: ["M5 accuracy competition: Results, findings, and conclusions", "https://www.sciencedirect.com/science/article/pii/S0169207021001874"] },
    { org: "Amazon", ind: "Thương mại điện tử", kind: "win", title: "DeepAR: dự báo xác suất",
      text: "Mạng hồi quy tự động học chung trên hàng nghìn chuỗi sản phẩm, cho ra phân phối dự báo thay vì một con số, để tính tồn kho an toàn.",
      result: "Chính xác hơn khoảng 15% so với các phương pháp tốt nhất lúc đó; có sẵn trong SageMaker.",
      src: ["arXiv — DeepAR: Probabilistic Forecasting with Autoregressive Recurrent Networks", "https://arxiv.org/abs/1704.04110"] }
  ],
  "nn-basics": [
    { org: "DoorDash", ind: "Giao đồ ăn", kind: "win", title: "Chuyển ETA từ cây sang mạng nơ-ron",
      text: "Mô hình cây gặp giới hạn về độ đa dạng dự đoán và số chiều. DoorDash chuyển sang mạng nơ-ron đa nhiệm, có dự báo xác suất.",
      result: "Dự đoán ETA chính xác và ổn định hơn cho hơn 2 tỉ đơn/năm.",
      src: ["DoorDash — Improving ETAs with multi-task models, deep learning, and probabilistic forecasts", "https://careersatdoordash.com/blog/improving-etas-with-multi-task-models-deep-learning-and-probabilistic-forecasts/"] },
    { org: "DeepMind / Google", ind: "Năng lượng", kind: "win", title: "Tổ hợp mạng nơ-ron dự đoán PUE",
      text: "Nhiều mạng nơ-ron sâu được huấn luyện để dự đoán PUE, nhiệt độ và áp suất trong giờ tới.",
      result: "Giảm 40% năng lượng làm mát.",
      src: ["Google Blog — DeepMind AI reduces energy used for cooling", "https://blog.google/company-news/outreach-and-initiatives/environment/deepmind-ai-reduces-energy-used-for/"] }
  ],
  "cnn": [
    { org: "Google Health", ind: "Y tế", kind: "win", title: "Sàng lọc bệnh võng mạc tiểu đường",
      text: "Mạng CNN đọc ảnh đáy mắt (JAMA 2016: AUC 0,99), sau đó được thử nghiệm tiến cứu trong chương trình sàng lọc quốc gia của Thái Lan.",
      result: "Độ nhạy 0,97 so với 0,74 của chuyên viên đọc ảnh.",
      src: ["JAMA 2016 — Gulshan et al.", "https://pubmed.ncbi.nlm.nih.gov/27898976/"] },
    { org: "Google Health", ind: "Y tế", kind: "fail", title: "Mô hình tốt, phòng khám thật thì khó",
      text: "Khi triển khai ở 11 phòng khám Thái Lan, ánh sáng kém và mạng chậm khiến nhiều ảnh bị hệ thống từ chối, làm bệnh nhân phải chờ hoặc phải chuyển đi nơi khác.",
      result: "Nghiên cứu CHI 2020 cho thấy độ chính xác trong phòng lab chưa đủ; quy trình thực tế quyết định thành công.",
      lesson: "Đánh giá mô hình trong điều kiện triển khai thật, cùng người dùng thật.",
      src: ["CHI 2020 — A Human-Centered Evaluation of a Deep Learning System Deployed in Clinics", "https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376718"] },
    { org: "BMW Group", ind: "Sản xuất ô tô", kind: "win", title: "Kiểm tra lắp ráp bằng thị giác máy",
      text: "BMW huấn luyện mô hình nhận dạng đúng loại ốp ngưỡng cửa và phát hiện đường chỉ thiếu hoặc sai màu trên đồ da; mỗi tác vụ chỉ cần vài ảnh mẫu nhờ transfer learning.",
      result: "Huấn luyện dưới 1 giờ với tối đa 5 ảnh mỗi tác vụ; hệ thống báo động khi lắp sai mẫu.",
      src: ["NVIDIA — BMW optimizes production with AI", "https://www.nvidia.com/en-in/case-studies/bmw-optimizes-production-with-ai-and-dgx-systems/"] }
  ],
  "rnn": [
    { org: "Google Translate", ind: "Ngôn ngữ", kind: "win", title: "Dịch máy nơ-ron GNMT (2016)",
      text: "Thay hệ dịch theo cụm từ bằng mạng LSTM 8 tầng encoder–decoder có attention.",
      result: "Giảm lỗi dịch trung bình khoảng 60% so với hệ cũ trên các cặp ngôn ngữ chính (đánh giá bởi người).",
      src: ["arXiv — Google's Neural Machine Translation System", "https://arxiv.org/abs/1609.08144"] }
  ],
  "transformer": [
    { org: "Google Search", ind: "Tìm kiếm", kind: "win", title: "BERT hiểu câu truy vấn",
      text: "BERT đọc cả hai phía của mỗi từ để hiểu nghĩa, ví dụ phân biệt \"người Brazil đi Mỹ\" với \"người Mỹ đi Brazil\".",
      result: "Ảnh hưởng khoảng 1/10 truy vấn tiếng Anh ở Mỹ khi ra mắt năm 2019.",
      src: ["Google Blog — Understanding searches better than ever before", "https://blog.google/products-and-platforms/products/search/search-language-understanding-bert/"] },
    { org: "VinAI", ind: "AI Việt Nam", kind: "win", title: "PhoBERT và PhoGPT cho tiếng Việt",
      text: "PhoBERT là mô hình ngôn ngữ đơn ngữ quy mô lớn đầu tiên cho tiếng Việt; PhoGPT-4B là LLM sinh văn bản tiếng Việt mã nguồn mở.",
      result: "PhoBERT đạt kết quả tốt nhất thời điểm ra mắt ở gán nhãn từ loại, NER, suy luận ngôn ngữ; có hơn 200.000 lượt tải mỗi tháng trên Hugging Face (theo báo cáo).",
      src: ["GitHub — VinAIResearch/PhoBERT", "https://github.com/VinAIResearch/PhoBERT"] },
    { org: "DeepMind", ind: "Sinh học", kind: "win", title: "AlphaFold 2 dự đoán cấu trúc protein",
      text: "Kiến trúc Evoformer dựa trên attention xử lý thông tin tiến hoá và cặp axit amin.",
      result: "Đạt độ chính xác gần thực nghiệm ở CASP14; tác giả nhận giải Nobel Hoá học 2024.",
      src: ["Nature — Highly accurate protein structure prediction with AlphaFold", "https://www.nature.com/articles/s41586-021-03819-2"] }
  ],
  "nlp-embeddings": [
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "Listing embeddings từ phiên click",
      text: "Coi chuỗi phòng mà người dùng click trong một phiên như một câu, rồi học embedding bằng skip-gram.",
      result: "Dùng cho gợi ý phòng tương tự và cá nhân hoá tìm kiếm theo thời gian thực.",
      src: ["KDD 2018 — Real-time Personalization using Embeddings for Search Ranking at Airbnb", "https://dl.acm.org/doi/10.1145/3219819.3219885"] },
    { org: "Spotify", ind: "Âm nhạc", kind: "win", title: "Vector từ văn bản nói về âm nhạc",
      text: "Spotify dùng văn bản trên web, blog và mô tả nghệ sĩ nói về bài hát để tạo vector mô tả, dùng làm đặc trưng tương đồng cho gợi ý.",
      result: "Giúp gợi ý được cả bài hát và nghệ sĩ còn ít dữ liệu nghe.",
      src: ["The Sound of AI — Discover Weekly explained", "https://medium.com/the-sound-of-ai/spotifys-discover-weekly-explained-breaking-from-your-music-bubble-or-maybe-not-b506da144123"] }
  ],
  "llm-prompting": [
    { org: "Klarna", ind: "Fintech", kind: "win", title: "Trợ lý AI chăm sóc khách hàng",
      text: "Ra mắt tháng 2/2024, trợ lý xử lý 2,3 triệu cuộc hội thoại trong tháng đầu, chiếm 2/3 số cuộc chat chăm sóc khách hàng.",
      result: "Thời gian giải quyết giảm từ 11 phút xuống dưới 2 phút; khối lượng tương đương 700 nhân viên toàn thời gian.",
      src: ["Klarna — AI assistant handles two-thirds of customer service chats", "https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/"] },
    { org: "Klarna", ind: "Fintech", kind: "fail", title: "Quay lại tuyển người cho ca phức tạp",
      text: "Tháng 5/2025 Klarna công khai tuyển lại nhân viên chăm sóc khách hàng, vì khách hàng phàn nàn câu trả lời chung chung và AI không xử lý tốt trường hợp phức tạp.",
      result: "Mô hình lai: AI xử lý câu hỏi phổ biến, người xử lý ca phức tạp và khách hàng cao cấp.",
      lesson: "Đo cả chất lượng và mức hài lòng, không chỉ tỉ lệ tự động hoá.",
      src: ["CX Dive — Klarna changes its AI tune and again recruits humans", "https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/"] },
    { org: "GitHub", ind: "Phần mềm", kind: "win", title: "Copilot và năng suất lập trình",
      text: "Thử nghiệm có đối chứng: hai nhóm lập trình viên cùng viết một HTTP server bằng JavaScript, một nhóm dùng Copilot.",
      result: "Nhóm dùng Copilot hoàn thành nhanh hơn 55,8%.",
      src: ["arXiv — The Impact of AI on Developer Productivity: Evidence from GitHub Copilot", "https://arxiv.org/abs/2302.06590"] }
  ],
  "rag": [
    { org: "Morgan Stanley", ind: "Ngân hàng đầu tư", kind: "win", title: "Trợ lý tra cứu cho cố vấn tài chính",
      text: "Trợ lý dùng GPT-4 trả lời dựa trên kho khoảng 100.000 tài liệu nghiên cứu và quy trình nội bộ đã được kiểm duyệt, có trích dẫn nguồn. Mọi thay đổi đều qua bộ đánh giá (evals) trước khi triển khai.",
      result: "Hơn 98% đội cố vấn sử dụng hằng ngày.",
      src: ["OpenAI — Morgan Stanley uses AI evals to shape the future of financial services", "https://openai.com/index/morgan-stanley/"] },
    { org: "Air Canada", ind: "Hàng không", kind: "fail", title: "Chatbot trả lời sai chính sách hoàn tiền",
      text: "Chatbot trên website nói khách có thể xin giá vé tang lễ hồi tố sau chuyến bay, trái với chính sách thật. Hãng lập luận chatbot là \"thực thể riêng\" nhưng không được chấp nhận.",
      result: "Tòa giải quyết tranh chấp dân sự British Columbia (2024) buộc hãng bồi thường cho khách.",
      lesson: "Trả lời phải dựa trên tài liệu chính thức, có trích dẫn, và doanh nghiệp chịu trách nhiệm cho câu trả lời của bot.",
      src: ["Moffatt v. Air Canada, 2024 BCCRT 149", "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html"] }
  ],
  "finetuning": [
    { org: "VinAI", ind: "AI Việt Nam", kind: "win", title: "PhoGPT-4B-Chat",
      text: "Mô hình nền PhoGPT-4B (3,7 tỉ tham số, huấn luyện trên 102 tỉ token tiếng Việt) được tinh chỉnh theo chỉ dẫn để tạo bản chat.",
      result: "LLM tiếng Việt mã nguồn mở, làm nền cho nghiên cứu và ứng dụng hội thoại tiếng Việt.",
      src: ["arXiv — PhoGPT: Generative Pre-training for Vietnamese", "https://arxiv.org/abs/2311.02945"] },
    { org: "TensorZero (thử nghiệm)", ind: "AI", kind: "win", title: "Chưng cất mô hình lớn sang mô hình nhỏ",
      text: "Tinh chỉnh mô hình nhỏ trên các đầu ra chất lượng cao đã được lọc từ mô hình lớn, cho các tác vụ hẹp.",
      result: "Chi phí suy luận rẻ hơn 5–30 lần, độ trễ thấp hơn tới 4 lần, chất lượng ngang hoặc tốt hơn trên tác vụ đó.",
      src: ["TensorZero — Distillation with programmatic data curation", "https://www.tensorzero.com/blog/distillation-programmatic-data-curation-smarter-llms-5-30x-cheaper-inference/"] },
    { org: "Bloomberg", ind: "Tài chính", kind: "fail", title: "BloombergGPT: tự huấn luyện có đáng không?",
      text: "Bloomberg huấn luyện mô hình 50 tỉ tham số trên dữ liệu tài chính (2023). Các nghiên cứu sau đó cho thấy những mô hình đa năng mới hơn (GPT-4) đạt kết quả tương đương hoặc tốt hơn ở nhiều tác vụ tài chính.",
      result: "Tự huấn luyện hoặc tinh chỉnh sâu tốn kém và dễ bị mô hình đa năng thế hệ sau vượt qua.",
      lesson: "Thử prompt và RAG với mô hình mạnh trước; chỉ tinh chỉnh khi có lý do rõ về chi phí, định dạng hoặc dữ liệu riêng.",
      src: ["arXiv — BloombergGPT", "https://arxiv.org/abs/2303.17564"] }
  ],
  "agents-eval": [
    { org: "Uber", ind: "Gọi xe", kind: "win", title: "QueryGPT thành hệ nhiều agent",
      text: "Qua hơn 20 phiên bản, QueryGPT được tách thành các agent: nhận diện ý định, chọn bảng, lọc cột, sinh SQL; người dùng xác nhận bảng trước khi chạy.",
      result: "Thời gian viết truy vấn giảm xuống khoảng 3 phút mỗi truy vấn.",
      src: ["Uber Blog — QueryGPT", "https://www.uber.com/blog/query-gpt/"] },
    { org: "Morgan Stanley", ind: "Ngân hàng đầu tư", kind: "win", title: "Đánh giá trước khi mở rộng",
      text: "Mỗi ứng dụng được kiểm tra bằng bộ đánh giá: chuyên gia chấm câu trả lời, so sánh với tài liệu nguồn, kiểm tra tuân thủ, trước khi mở cho toàn bộ cố vấn.",
      result: "Mở rộng từ khoảng 7.000 câu hỏi lên kho khoảng 100.000 tài liệu với tỉ lệ sử dụng cao.",
      src: ["OpenAI — Morgan Stanley case study", "https://openai.com/index/morgan-stanley/"] }
  ],
  "serving-api": [
    { org: "Grab", ind: "Siêu ứng dụng Đông Nam Á", kind: "win", title: "Catwalk: nền tảng phục vụ mô hình",
      text: "Trước đây mỗi đội tự dựng hạ tầng phục vụ mô hình; Catwalk chuẩn hoá việc đưa mô hình thành API. Riêng ETA, hơn 200 mô hình riêng lẻ được gộp lại.",
      result: "Với ETA: chi phí tính toán giảm 95%, độ chính xác tăng 5%; nền tảng phục vụ hàng trăm mô hình.",
      src: ["Inside Grab — More accurate ETAs while pushing down tech costs", "https://www.grab.com/inside-grab/how-we-got-more-accurate-estimated-time-of-arrivals-in-the-app-while-pushing-down-tech-costs/"] },
    { org: "Uber", ind: "Gọi xe", kind: "win", title: "DeepETA phục vụ với độ trễ thấp",
      text: "Mô hình Transformer dự đoán phần hiệu chỉnh cho ETA của hệ định tuyến, được phục vụ online cho mọi yêu cầu ETA.",
      result: "Cân bằng độ chính xác với yêu cầu độ trễ rất thấp khi phục vụ.",
      src: ["Uber Blog — DeepETA: How Uber Predicts Arrival Times", "https://www.uber.com/blog/deepeta-how-uber-predicts-arrival-times/"] }
  ],
  "docker": [
    { org: "Spotify", ind: "Âm nhạc", kind: "win", title: "Từ Docker tự quản sang Kubernetes",
      text: "Spotify dùng container từ sớm với hệ điều phối tự viết (Helios), sau đó chuyển sang Kubernetes từ cuối năm 2017.",
      result: "Dịch vụ lớn nhất chạy trên Kubernetes nhận khoảng 10 triệu request/giây nhờ autoscaling.",
      src: ["CNCF — Spotify case study", "https://www.cncf.io/case-studies/spotify/"] },
    { org: "Grab", ind: "Siêu ứng dụng Đông Nam Á", kind: "win", title: "Chuyển sang NVIDIA Triton",
      text: "Grab hiện đại hoá nền tảng phục vụ mô hình bằng Triton Inference Server chạy trong container.",
      result: "Hỗ trợ nhiều framework mô hình trên cùng một hạ tầng.",
      src: ["Grab Engineering — Modernising Grab's model serving platform with NVIDIA Triton", "https://engineering.grab.com/modernising-grab-model-serving-platform"] }
  ],
  "tracking": [
    { org: "Databricks", ind: "Công nghệ", kind: "win", title: "MLflow ra đời (2018)",
      text: "Databricks tạo MLflow để giải quyết việc thí nghiệm ML khó theo dõi, khó tái lập và khó triển khai, rồi mở mã nguồn.",
      result: "Trở thành chuẩn phổ biến cho tracking và model registry, được tích hợp vào nhiều nền tảng cloud.",
      src: ["MLflow docs", "https://mlflow.org/docs/latest/"] },
    { org: "Booking.com", ind: "Du lịch", kind: "win", title: "Mỗi mô hình gắn với một thí nghiệm",
      text: "Mỗi mô hình đưa vào sản phẩm được gắn với kết quả RCT, nhờ vậy biết mô hình nào thực sự tạo giá trị.",
      result: "Là cơ sở để tổng hợp bài học từ khoảng 150 mô hình.",
      src: ["KDD 2019 — 150 Successful ML Models", "https://dl.acm.org/doi/10.1145/3292500.3330744"] }
  ],
  "pipelines-cicd": [
    { org: "Lyft", ind: "Gọi xe", kind: "win", title: "LyftLearn trên Kubernetes",
      text: "LyftLearn gom huấn luyện, triển khai và phục vụ mô hình trên Kubernetes; pipeline được điều phối bằng Flyte (do Lyft phát triển rồi mở mã nguồn).",
      result: "Phục vụ hàng trăm triệu dự đoán mỗi ngày (theo báo cáo).",
      src: ["Lyft Engineering — LyftLearn evolution", "https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1"] },
    { org: "Google", ind: "Công nghệ", kind: "win", title: "Nợ kỹ thuật ẩn trong hệ thống ML",
      text: "Bài báo chỉ ra code mô hình chỉ là phần nhỏ; phần lớn là thu thập dữ liệu, kiểm tra, cấu hình, phục vụ, giám sát. Thiếu tự động hoá thì nợ kỹ thuật tích tụ rất nhanh.",
      result: "Là cơ sở lý luận của MLOps hiện đại.",
      src: ["NeurIPS 2015 — Hidden Technical Debt in Machine Learning Systems", "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems"] }
  ],
  "monitoring": [
    { org: "Zillow", ind: "Bất động sản", kind: "fail", title: "Không phản ứng kịp khi thị trường đổi chiều",
      text: "Thị trường nhà đảo chiều nhanh giữa năm 2021 nhưng mô hình và quy trình mua vẫn dựa trên dữ liệu cũ; giá tiếp tục được đẩy lên để đạt mục tiêu số lượng.",
      result: "Lỗ hơn 500 triệu USD, đóng mảng Zillow Offers.",
      lesson: "Cần giám sát concept drift và có cơ chế dừng khi sai số tăng.",
      src: ["Zillow 8-K Q3 2021", "https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm"] },
    { org: "Lyft", ind: "Gọi xe", kind: "win", title: "Giám sát toàn diện bốn lớp",
      text: "Theo dõi điểm dự đoán theo thời gian, kiểm tra đặc trưng online, phát hiện bất thường và so với nhãn thật offline.",
      result: "Hơn 90% mô hình dùng giám sát online; phát hiện hơn 15 sự cố nghiêm trọng trong 9 tháng đầu.",
      src: ["Lyft Engineering — Full-Spectrum ML Model Monitoring", "https://eng.lyft.com/full-spectrum-ml-model-monitoring-at-lyft-a4cdaf828e8f"] },
    { org: "Google Flu Trends", ind: "Y tế", kind: "fail", title: "Mô hình không bao giờ được huấn luyện lại",
      text: "Hành vi tìm kiếm và thuật toán tìm kiếm thay đổi nhiều năm nhưng mô hình giữ nguyên.",
      result: "Sai số tăng dần đến mức gấp đôi thực tế.",
      src: ["Science — The Parable of Google Flu", "https://www.science.org/doi/10.1126/science.1248506"] }
  ],
  "spark": [
    { org: "Uber", ind: "Gọi xe", kind: "win", title: "Nền tảng big data hơn 100 PB",
      text: "Uber xây data lake trên Hadoop, dùng Spark và Hive để xử lý, và phát triển Apache Hudi để cập nhật dữ liệu gần thời gian thực.",
      result: "Hơn 100 petabyte dữ liệu phục vụ phân tích và ML với độ trễ tính bằng phút.",
      src: ["Uber Blog — Uber's Big Data Platform: 100+ Petabytes with Minute Latency", "https://www.uber.com/blog/uber-big-data-platform/"] }
  ],
  "warehouse": [
    { org: "Netflix", ind: "Giải trí", kind: "win", title: "Apache Iceberg ra đời",
      text: "Netflix tạo định dạng bảng Iceberg để quản lý các bảng hàng petabyte trên object storage với giao dịch, schema evolution và time travel, rồi tặng cho Apache.",
      result: "Trở thành một trong hai định dạng lakehouse phổ biến nhất (cùng Delta Lake).",
      src: ["Apache Iceberg", "https://iceberg.apache.org/"] },
    { org: "Airbnb", ind: "Du lịch", kind: "win", title: "Một nguồn sự thật cho metric",
      text: "Minerva tách định nghĩa metric khỏi code của từng dashboard, để thử nghiệm, báo cáo và ML dùng chung một định nghĩa.",
      result: "Chấm dứt tình trạng các đội có con số khác nhau cho cùng một metric.",
      src: ["Airbnb Tech Blog — How Airbnb standardized metric computation at scale", "https://medium.com/airbnb-engineering/airbnb-metric-computation-with-minerva-part-2-9afe6695b486"] }
  ],
  "case-current": [
    { org: "Hopper", ind: "Du lịch", kind: "win", title: "Dự đoán giá vé và thời điểm nên mua",
      text: "Hopper phân tích hàng tỉ mức giá vé mỗi ngày để dự báo giá sẽ tăng hay giảm và khuyên người dùng nên mua ngay hay chờ.",
      result: "Là sản phẩm thương mại gần nhất với dự án Flight Fare trong repo, nhưng dùng thêm đặc trưng quan trọng: số ngày trước khi bay.",
      src: ["Wikipedia — Hopper (company)", "https://en.wikipedia.org/wiki/Hopper_(company)"] }
  ]
};
