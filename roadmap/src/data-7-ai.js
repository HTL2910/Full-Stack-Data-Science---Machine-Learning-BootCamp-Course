/* Làm việc với AI cho từng chủ đề.
   p: prompt mẫu cụ thể | flags: dấu hiệu AI đề xuất sai hoặc mơ hồ | ask: câu hỏi phản biện AI
   check: cách tự kiểm chứng | decide: quyết định bạn phải tự đưa ra, không giao cho AI */
window.ROADMAP_AI = {
  "crisp-dm": {
    p: "Tôi cần giảm tỉ lệ khách rời bỏ 2% trong quý tới. Dữ liệu có: lịch sử giao dịch 24 tháng, khiếu nại, gói cước. Đội chăm sóc gọi được 5% khách mỗi tháng. Đề xuất 2–3 cách đóng khung thành bài toán ML, mỗi cách nêu target, metric, baseline và rủi ro. Chưa viết code.",
    flags: ["Nhảy thẳng vào chọn mô hình khi chưa hỏi mục tiêu kinh doanh và ràng buộc vận hành.", "Không nhắc đến baseline hoặc cách đo tác động thật (A/B test)."],
    ask: ["Nếu mô hình đúng 100%, doanh nghiệp sẽ làm gì khác đi?", "Làm sao biết mô hình tạo ra giá trị chứ không chỉ tăng metric offline?"],
    check: ["Viết ra một câu: ai dùng dự đoán, dùng lúc nào, để quyết định việc gì.", "Có sẵn baseline đơn giản (quy tắc, trung vị) để so sánh."],
    decide: ["Mục tiêu kinh doanh và tiêu chí thành công.", "Dừng dự án khi nào."]
  },
  "framing": {
    p: "Tôi muốn dự đoán giá vé máy bay tại thời điểm người dùng tìm vé. Các cột: Airline, Source, Destination, Dep_Time, Arrival_Time, Duration, Total_Stops, Price. Cột nào chỉ biết SAU thời điểm dự đoán? Đây là bài toán gì, nên dùng metric nào để người dùng hiểu được sai số?",
    flags: ["Dùng cột chỉ biết sau sự kiện làm đặc trưng.", "Chọn metric theo thói quen (accuracy, R²) thay vì theo chi phí của sai số."],
    ask: ["Tại đúng thời điểm dự đoán, cột này đã có giá trị chưa?", "Sai số lớn một phía (dự đoán cao hay thấp) thì bên nào tốn kém hơn?"],
    check: ["Vẽ dòng thời gian: thời điểm dự đoán và thời điểm mỗi cột được ghi nhận.", "So sánh với một bài toán thay thế đơn giản hơn (quy tắc, xếp hạng)."],
    decide: ["Target, đơn vị dự đoán và metric.", "Có cần ML hay không."]
  },
  "linear-algebra": {
    p: "Giải thích vì sao X @ w cho ra dự đoán của hồi quy tuyến tính, với X shape (1000, 5). Chỉ ra shape của từng biến ở mỗi bước. Cho tôi một ví dụ số 3×2 tính tay được.",
    flags: ["Dùng * thay cho @ (nhân từng phần tử thay vì nhân ma trận).", "Không nói rõ shape, hoặc transpose sai chiều."],
    ask: ["Shape của kết quả là bao nhiêu và vì sao?", "Nếu thêm một đặc trưng, những shape nào thay đổi?"],
    check: ["In .shape sau mỗi bước.", "So với ví dụ nhỏ tính tay hoặc np.allclose với cách tính khác."],
    decide: ["Có cần chuẩn hoá vector trước khi so sánh độ tương đồng không."]
  },
  "calculus": {
    p: "Loss của mô hình tôi ra NaN sau 3 epoch, learning rate 0.1, dữ liệu chưa chuẩn hoá. Liệt kê các nguyên nhân có thể theo thứ tự khả năng, và cách kiểm tra từng nguyên nhân mà không đổi nhiều thứ cùng lúc.",
    flags: ["Đề xuất đổi nhiều thứ cùng lúc (mô hình, optimizer, dữ liệu) nên không biết cái nào có tác dụng.", "Bỏ qua việc chuẩn hoá đặc trưng và learning rate."],
    ask: ["Nếu chỉ được đổi một thứ, bạn đổi gì trước và vì sao?", "Dấu hiệu nào trong log cho biết learning rate quá lớn?"],
    check: ["Vẽ đường loss theo bước.", "Chạy thử overfit một batch nhỏ: loss phải về gần 0."],
    decide: ["Khi nào dừng huấn luyện (early stopping, ngân sách thời gian)."]
  },
  "probability": {
    p: "Mô hình gian lận có recall 95% và tỉ lệ báo động giả 2%. Gian lận chiếm 0,2% giao dịch. Trong 100.000 giao dịch, có bao nhiêu cảnh báo và bao nhiêu trong đó là gian lận thật? Trình bày từng bước tính.",
    flags: ["Bỏ qua tỉ lệ nền (base rate) khi diễn giải xác suất.", "Nhầm P(A|B) với P(B|A)."],
    ask: ["Con số này thay đổi thế nào nếu tỉ lệ gian lận là 2%?", "Giả định phân phối chuẩn ở đây có hợp lý không?"],
    check: ["Tự tính lại bằng bảng 2×2 với số tuyệt đối.", "Mô phỏng nhanh bằng NumPy để đối chiếu."],
    decide: ["Mức báo động giả chấp nhận được với đội vận hành."]
  },
  "statistics": {
    p: "Tôi chạy A/B test nút mua hàng: A 10.000 lượt, 420 chuyển đổi; B 10.000 lượt, 481 chuyển đổi. Kiểm định phù hợp là gì? Tính p-value và khoảng tin cậy của chênh lệch. Liệt kê các giả định và những điều có thể làm kết quả sai.",
    flags: ["Kết luận khi dừng thí nghiệm sớm lúc p < 0,05.", "Kiểm định nhiều chỉ số mà không hiệu chỉnh.", "Diễn giải p-value là xác suất H0 đúng."],
    ask: ["Cỡ mẫu này có đủ power để phát hiện mức chênh mong muốn không?", "Mức chênh này có ý nghĩa kinh doanh không, hay chỉ có ý nghĩa thống kê?"],
    check: ["Tính lại bằng statsmodels.", "Kiểm tra tỉ lệ chia nhóm có đúng 50/50 không (SRM)."],
    decide: ["MDE, thời gian chạy và tiêu chí dừng, đặt TRƯỚC khi chạy."]
  },
  "python-core": {
    p: "Viết hàm Python đọc mọi file .xlsx trong một thư mục, chuẩn hoá tên cột về chữ thường, gộp thành một DataFrame. Dùng pathlib, có type hints, không dùng đường dẫn tuyệt đối. Giải thích từng dòng quan trọng.",
    flags: ["Đường dẫn tuyệt đối viết cứng (như D:/... trong app.py của repo).", "Tham số mặc định là list hoặc dict.", "except bắt mọi lỗi rồi bỏ qua."],
    ask: ["Hàm xử lý thế nào khi thư mục rỗng hoặc một file bị hỏng?", "Có cách nào không cần vòng lặp không?"],
    check: ["Tự chạy với dữ liệu nhỏ và trường hợp biên.", "Đọc lại code và giải thích được từng dòng mà không cần AI."],
    decide: ["Cấu trúc thư mục dự án và quy ước đặt tên."]
  },
  "numpy": {
    p: "Tôi có mảng giá (250, 20). Tính lợi suất log theo ngày và ma trận hiệp phương sai năm hoá bằng NumPy, không dùng vòng lặp. Ghi rõ axis và shape ở mỗi bước.",
    flags: ["axis sai chiều.", "Viết vòng lặp Python cho phép tính vector hoá được.", "Sửa view làm thay đổi mảng gốc mà không nói rõ."],
    ask: ["Nếu đổi axis=0 thành axis=1 thì kết quả nghĩa là gì?", "Đoạn này tạo bản sao hay view?"],
    check: ["Kiểm tra shape và vài giá trị bằng tay.", "So sánh với pandas .pct_change() hoặc cách tính khác."],
    decide: ["Kiểu dữ liệu (float32 hay float64) theo yêu cầu bộ nhớ và độ chính xác."]
  },
  "pandas": {
    p: "DataFrame có cột Duration dạng '2h 50m', '19h', '45m'. Chuyển thành số phút bằng các phép vector hoá của pandas, không dùng vòng lặp hay apply. Cho 5 ví dụ kiểm tra, gồm trường hợp chỉ có giờ và chỉ có phút.",
    flags: ["Dùng apply hoặc vòng lặp cho mọi thứ.", "merge không kiểm tra khoá, làm nhân bản dòng.", "Gán vào bản sao gây SettingWithCopyWarning."],
    ask: ["Số dòng trước và sau merge có bằng nhau không?", "Nếu có giá trị không đúng định dạng thì đoạn code làm gì?"],
    check: ["df.shape, df.isna().sum(), df.describe() trước và sau mỗi bước.", "merge(..., validate='one_to_one')."],
    decide: ["Giữ hay bỏ dòng lỗi định dạng."]
  },
  "viz": {
    p: "Tôi muốn biết giá vé khác nhau thế nào theo số điểm dừng và hãng bay. Đề xuất 2 biểu đồ phù hợp, giải thích mỗi biểu đồ trả lời câu hỏi gì, rồi viết code seaborn (không dùng hàm đã bị loại bỏ).",
    flags: ["Dùng hàm đã bị loại bỏ (sns.distplot).", "Biểu đồ đẹp nhưng không trả lời câu hỏi nào.", "Trục y của bar chart không bắt đầu từ 0."],
    ask: ["Biểu đồ này có thể gây hiểu nhầm ở điểm nào?", "Với dữ liệu lệch phải, có nên dùng thang log không?"],
    check: ["Đọc biểu đồ và viết một câu kết luận; nếu không viết được thì biểu đồ chưa đạt."],
    decide: ["Câu hỏi mà biểu đồ cần trả lời, và người đọc là ai."]
  },
  "git-env": {
    p: "Tạo requirements.txt cho dự án dùng pandas, scikit-learn, flask. Ghim phiên bản. Giải thích vì sao file .pkl của scikit-learn phụ thuộc phiên bản, và viết .gitignore phù hợp cho dự án data science.",
    flags: ["Gợi ý package không tồn tại hoặc tên gần giống package thật (rủi ro slopsquatting).", "Commit secret, dữ liệu lớn hoặc file mô hình nặng."],
    ask: ["Package này có trên PyPI không, ai phát triển, tải bao nhiêu lượt?", "Lệnh này có ghi đè hay xoá gì không thể hoàn tác không?"],
    check: ["Tìm package trên pypi.org trước khi pip install.", "git diff trước khi commit; tạo venv mới và cài lại từ đầu."],
    decide: ["Chấp nhận thêm dependency nào vào dự án."]
  },
  "sql": {
    p: "Bảng orders(order_id, customer_id, order_date, amount, status). Viết truy vấn PostgreSQL tính recency, frequency, monetary cho mỗi khách, chỉ đơn completed. Sau đó viết một truy vấn kiểm tra: tổng monetary phải bằng tổng amount của đơn completed.",
    flags: ["JOIN làm nhân bản dòng rồi SUM ra số sai.", "So sánh NULL bằng =.", "Dùng cú pháp của hệ quản trị khác (MySQL thay vì PostgreSQL)."],
    ask: ["Nếu một khách có 0 đơn completed thì họ có xuất hiện trong kết quả không?", "Truy vấn này quét bao nhiêu dữ liệu, tốn bao nhiêu nếu chạy trên BigQuery?"],
    check: ["Đối chiếu tổng với một truy vấn độc lập.", "Chạy thử trên vài khách đã biết đáp án."],
    decide: ["Định nghĩa metric (khách hoạt động là gì), không để AI tự định nghĩa."]
  },
  "collection": {
    p: "Viết hàm gọi API có phân trang, timeout 10 giây, retry với backoff khi gặp 429 hoặc 5xx, tôn trọng header Retry-After, lưu dữ liệu thô ra Parquet theo ngày. Không crawl trang web khi đã có API.",
    flags: ["Không có timeout và retry.", "Scraping trang cấm crawl hoặc có dữ liệu cá nhân.", "Không lưu dữ liệu thô để xử lý lại."],
    ask: ["Điều khoản sử dụng của nguồn này có cho phép không?", "Nếu API đổi định dạng, code sẽ báo lỗi hay lặng lẽ lưu dữ liệu sai?"],
    check: ["Kiểm tra số bản ghi và schema của mỗi lần lấy.", "Đọc robots.txt và điều khoản sử dụng."],
    decide: ["Nguồn dữ liệu nào được phép dùng (pháp lý, đạo đức)."]
  },
  "cleaning": {
    p: "Đây là kết quả df.isna().mean() và df.describe(). Đề xuất cách xử lý giá trị thiếu và ngoại lệ cho từng cột, nêu lý do. Mọi imputer phải fit trên tập train, không fit trên toàn bộ dữ liệu.",
    flags: ["fillna(mean) trên toàn bộ dữ liệu trước khi chia tập (rò rỉ).", "Xoá ngoại lệ chỉ vì giá trị lớn.", "Không đánh dấu dòng bị điền giá trị."],
    ask: ["Giá trị thiếu này là ngẫu nhiên hay có lý do?", "Ngoại lệ này là lỗi nhập hay giá trị thật hiếm (tín hiệu quan trọng)?"],
    check: ["So sánh phân phối trước và sau khi xử lý.", "Kiểm tra đơn vị và định dạng giữa các nguồn."],
    decide: ["Giữ, sửa hay xoá dữ liệu bất thường, sau khi hỏi người hiểu nghiệp vụ."]
  },
  "eda": {
    p: "Tôi đang làm EDA cho bài toán dự đoán giá vé. Đề xuất 6 câu hỏi EDA theo thứ tự ưu tiên, mỗi câu kèm một biểu đồ hoặc bảng và điều cần tìm. Nhắc tôi dấu hiệu rò rỉ dữ liệu cần để ý.",
    flags: ["EDA trên cả tập test.", "Kết luận nhân quả từ tương quan.", "Sinh báo cáo tự động rồi dừng, không có kết luận."],
    ask: ["Tương quan này có thể do biến thứ ba gây ra không?", "Cột nào tương quan gần như tuyệt đối với target, và vì sao?"],
    check: ["Mỗi phát hiện ghi thành một câu giả thuyết cho đặc trưng hoặc mô hình."],
    decide: ["Giả thuyết nào đáng theo đuổi tiếp."]
  },
  "encoding": {
    p: "Tôi có các cột: Airline (12 giá trị), Total_Stops (non-stop..4 stops), Route (128 giá trị). Mô hình là Ridge. Đề xuất cách mã hoá cho từng cột, giải thích vì sao, và viết ColumnTransformer có handle_unknown.",
    flags: ["get_dummies riêng trên train và test làm lệch cột.", "Mã hoá số cho biến danh nghĩa (tạo thứ tự giả).", "Target encoding không có cross-fitting."],
    ask: ["Khi gặp một hãng bay mới lúc dự đoán thì code làm gì?", "Cách mã hoá này có phù hợp nếu đổi sang LightGBM không?"],
    check: ["So sánh số cột của train và dữ liệu mới.", "Gửi một dòng có giá trị chưa từng gặp vào pipeline."],
    decide: ["Xử lý giá trị hiếm và giá trị mới thế nào."]
  },
  "scaling": {
    p: "Đây là đoạn code tính Duration trong app.py: dur_hour = abs(Arrival_hour - Dep_hour). Tìm các trường hợp sai và viết lại bằng datetime, kèm 3 test (bay trong ngày, qua nửa đêm, đúng 24 giờ).",
    flags: ["Fit scaler trên toàn bộ dữ liệu trước khi chia.", "Scale cho mô hình cây (không cần).", "Tính đặc trưng thời gian bỏ qua trường hợp qua nửa đêm."],
    ask: ["Đặc trưng này có sẵn tại thời điểm dự đoán không?", "Mô hình tôi dùng có cần chuẩn hoá không?"],
    check: ["Viết test cho trường hợp biên.", "So sánh đặc trưng tự tính với cột gốc (ví dụ Duration trong dữ liệu)."],
    decide: ["Đặc trưng nào có ý nghĩa nghiệp vụ, đáng thêm vào."]
  },
  "feature-selection": {
    p: "Mô hình có 80 đặc trưng. Tính permutation importance trên tập validation (không phải tập train), vẽ top 15, và chỉ ra đặc trưng nào đáng ngờ là rò rỉ dữ liệu.",
    flags: ["Tin tuyệt đối vào feature_importances_ của cây.", "Chọn đặc trưng trên toàn bộ dữ liệu rồi mới cross-validation."],
    ask: ["Nếu bỏ đặc trưng này, metric validation thay đổi bao nhiêu?", "Hai đặc trưng tương quan mạnh chia nhau importance thế nào?"],
    check: ["Huấn luyện lại không có đặc trưng đó và so sánh metric."],
    decide: ["Đánh đổi giữa độ chính xác và chi phí thu thập, bảo trì đặc trưng."]
  },
  "imbalanced": {
    p: "Tôi có 0,2% gian lận. Đội kiểm tra xem được 300 giao dịch mỗi ngày. Đề xuất metric, cách xử lý mất cân bằng, và cách chọn ngưỡng để đúng năng lực 300 giao dịch/ngày. Không dùng SMOTE trước khi chia tập.",
    flags: ["Báo cáo accuracy 99%.", "Oversample trước khi chia train/test.", "Giữ ngưỡng 0,5 mặc định."],
    ask: ["Precision và recall ở ngưỡng đề xuất là bao nhiêu?", "Metric được tính trên dữ liệu gốc hay dữ liệu đã resample?"],
    check: ["So với baseline dự đoán toàn lớp âm.", "Vẽ đường precision-recall trên tập validation."],
    decide: ["Chi phí của bỏ sót so với báo động giả, và ngưỡng vận hành."]
  },
  "pipelines": {
    p: "Chuyển đoạn tiền xử lý trong notebook này thành sklearn Pipeline + ColumnTransformer, lưu bằng joblib. Viết code API chỉ nhận DataFrame thô một dòng và gọi pipeline.predict. Đảm bảo không còn bước tiền xử lý nào nằm ngoài pipeline.",
    flags: ["Tiền xử lý trong notebook một kiểu, trong API một kiểu.", "Lưu mô hình mà quên lưu encoder/scaler.", "Mô hình lưu bằng một phiên bản scikit-learn, load bằng phiên bản khác."],
    ask: ["Bước nào đang được fit trên dữ liệu ngoài fold train?", "Nếu thêm cột mới vào dữ liệu đầu vào thì pipeline làm gì?"],
    check: ["So sánh dự đoán của notebook và API trên cùng 10 dòng.", "cross_validate trên toàn bộ pipeline."],
    decide: ["Định dạng lưu mô hình và cách quản lý phiên bản."]
  },
  "linear-regression": {
    p: "Tôi cần giải thích tác động của chi tiêu từng kênh quảng cáo lên doanh số cho ban giám đốc. So sánh OLS, Ridge và Lasso cho trường hợp này, nêu giả định cần kiểm tra, và cách diễn giải hệ số sau khi chuẩn hoá.",
    flags: ["Diễn giải hệ số như quan hệ nhân quả.", "Không chuẩn hoá trước Ridge/Lasso.", "So sánh hệ số của các đặc trưng khác thang đo."],
    ask: ["Nếu hai kênh luôn chạy cùng lúc, hệ số có còn tin được không?", "Residual plot có cho thấy quan hệ phi tuyến không?"],
    check: ["Vẽ residual theo dự đoán và theo từng đặc trưng.", "So với baseline trung bình."],
    decide: ["Mô hình dùng để giải thích hay để dự đoán (ảnh hưởng lựa chọn)."]
  },
  "logistic-regression": {
    p: "Xây mô hình logistic chấm điểm tín dụng. Chuẩn hoá trong pipeline, class_weight phù hợp. Trình bày odds ratio của 5 đặc trưng mạnh nhất và cách chọn ngưỡng duyệt vay dựa trên chi phí nợ xấu so với lợi nhuận mỗi khoản vay.",
    flags: ["Dùng ngưỡng 0,5 cho mọi bài toán.", "Không kiểm tra xác suất có được hiệu chỉnh tốt không.", "Dùng biến nhạy cảm (giới tính, dân tộc) hoặc biến thay thế cho chúng."],
    ask: ["Xác suất 0,3 của mô hình có nghĩa là 30% khách như vậy vỡ nợ thật không?", "Đặc trưng nào có thể gây phân biệt đối xử?"],
    check: ["Calibration curve.", "Kiểm tra metric theo từng nhóm khách hàng."],
    decide: ["Ngưỡng duyệt và các biến được phép dùng theo quy định."]
  },
  "knn": {
    p: "Tôi muốn gợi ý căn hộ tương tự bằng KNN. Có nên chuẩn hoá không, khoảng cách nào phù hợp khi có cả diện tích, số phòng và toạ độ? Với 2 triệu căn, KNN chính xác có đủ nhanh không, nếu không thì dùng gì?",
    flags: ["Không chuẩn hoá đặc trưng.", "Dùng KNN chính xác cho hàng triệu điểm nhiều chiều."],
    ask: ["Đặc trưng nào đang chi phối khoảng cách?", "Độ trễ dự đoán là bao nhiêu với dữ liệu thật?"],
    check: ["Xem vài láng giềng gần nhất và tự đánh giá có hợp lý không."],
    decide: ["Định nghĩa 'tương tự' theo nghiệp vụ."]
  },
  "decision-tree": {
    p: "Huấn luyện cây quyết định sâu tối đa 3 tầng cho bài toán định tuyến ticket, in luật bằng export_text và giải thích từng luật bằng lời. So sánh độ chính xác với cây không giới hạn độ sâu trên tập validation.",
    flags: ["Để cây mọc tối đa và báo cáo điểm trên tập train."],
    ask: ["Luật này có hợp lý với người vận hành không?", "Cây có thay đổi nhiều khi dữ liệu đổi một chút không?"],
    check: ["So sánh điểm train và validation.", "Nhờ người nghiệp vụ đọc luật."],
    decide: ["Đánh đổi giữa dễ giải thích và độ chính xác."]
  },
  "random-forest": {
    p: "Notebook lưu reg_rf thay vì mô hình đã tuning rf_random. Viết lại đoạn tuning và lưu mô hình tốt nhất, dùng max_features hợp lệ với scikit-learn hiện tại (không dùng 'auto'), in OOB score, nén file mô hình.",
    flags: ["Dùng tham số đã bị loại bỏ (max_features='auto').", "Lưu nhầm mô hình chưa tuning.", "Dùng Random Forest để dự đoán xu hướng ngoài khoảng dữ liệu đã thấy."],
    ask: ["Điểm OOB và điểm test có khớp nhau không?", "File mô hình nặng bao nhiêu, có ảnh hưởng triển khai không?"],
    check: ["Kiểm tra phiên bản scikit-learn và tài liệu tham số.", "Load lại file mô hình đã lưu và dự đoán thử."],
    decide: ["Ngân sách thời gian cho tuning."]
  },
  "boosting": {
    p: "Huấn luyện LightGBM cho dự đoán giá vé với early stopping trên tập validation riêng (không phải tập test), biến phân loại dạng category. So sánh với Random Forest hiện tại bằng MAE trên cùng tập test.",
    flags: ["Early stopping trên tập test.", "learning_rate cao với nhiều cây mà không có early stopping.", "Tham số sai tên giữa các thư viện (XGBoost và LightGBM đặt tên khác nhau)."],
    ask: ["Tập nào dùng cho early stopping, tập nào dùng để báo cáo kết quả?", "Cải thiện có lớn hơn độ dao động giữa các lần chạy không?"],
    check: ["Chạy lại với vài random seed.", "Đối chiếu tên tham số với tài liệu chính thức."],
    decide: ["Mức cải thiện đủ lớn để đổi mô hình trong sản phẩm."]
  },
  "svm": {
    p: "Phân loại 20.000 bài báo vào 12 chuyên mục. So sánh TF-IDF + LinearSVC với TF-IDF + LogisticRegression. Tôi có cần xác suất cho từng lớp không, và nếu có thì với SVM phải làm thêm gì?",
    flags: ["Dùng SVC kernel RBF cho dữ liệu hàng trăm nghìn mẫu.", "Dùng predict_proba của SVM mà không hiệu chỉnh."],
    ask: ["Thời gian huấn luyện tăng thế nào khi dữ liệu gấp 10?"],
    check: ["Đo thời gian huấn luyện và dự đoán với dữ liệu thật."],
    decide: ["Cần xác suất hay chỉ cần nhãn."]
  },
  "naive-bayes": {
    p: "Xây bộ lọc spam bằng MultinomialNB cho tin nhắn tiếng Việt. Xử lý tách từ thế nào? So với baseline LogisticRegression. Giải thích vai trò của alpha.",
    flags: ["Dùng xác suất của Naive Bayes như xác suất thật (thường quá tự tin)."],
    ask: ["Giả định độc lập có ảnh hưởng gì đến xếp hạng so với xác suất?"],
    check: ["Xem các tin nhắn bị phân loại sai."],
    decide: ["Chấp nhận bao nhiêu tin nhắn thật bị chặn nhầm."]
  },
  "metrics": {
    p: "Mô hình giá vé có MAE 1.174, RMSE 2.085, R² 0,798. Diễn giải từng con số cho người không chuyên. Metric nào nên dùng để so sánh mô hình mới, và vì sao RMSE lớn hơn nhiều so với MAE?",
    flags: ["Chọn metric không gắn với chi phí sai số.", "So sánh mô hình trên các tập test khác nhau.", "Báo cáo một metric duy nhất."],
    ask: ["Metric này có bị chi phối bởi vài giá trị cực lớn không?", "Người dùng cuối hiểu con số này thế nào?"],
    check: ["Tính metric theo từng nhóm (hãng bay, tuyến bay).", "Xem 20 dự đoán sai nhiều nhất."],
    decide: ["Metric chính dùng để ra quyết định, chốt trước khi thử mô hình."]
  },
  "validation": {
    p: "Dữ liệu giá vé từ tháng 3 đến tháng 6/2019. Đề xuất cách chia train/validation/test phù hợp với việc dự đoán giá cho các tháng sau. So với chia ngẫu nhiên, kết quả dự kiến khác thế nào và vì sao?",
    flags: ["Chia ngẫu nhiên với dữ liệu có thứ tự thời gian.", "Cùng một khách hàng nằm ở cả train và test.", "Tiền xử lý trước khi chia tập."],
    ask: ["Bước nào trong code đang nhìn thấy dữ liệu test?", "Kết quả có còn giữ khi chia theo thời gian không?"],
    check: ["Chạy cả hai cách chia và so sánh metric.", "Tìm các dòng trùng lặp giữa train và test."],
    decide: ["Cách chia phản ánh đúng cách mô hình được dùng."]
  },
  "bias-variance": {
    p: "Mô hình có R² train 0,953 và test 0,798. Đây là underfit hay overfit? Đề xuất 3 cách khắc phục, sắp xếp theo chi phí thực hiện, và cách kiểm tra từng cách bằng learning curve.",
    flags: ["Luôn đề xuất 'dùng mô hình phức tạp hơn'.", "Không phân biệt vấn đề dữ liệu với vấn đề mô hình."],
    ask: ["Thêm dữ liệu có giúp được không, dựa trên learning curve?"],
    check: ["Vẽ learning curve và validation curve."],
    decide: ["Đầu tư thêm dữ liệu hay thêm thời gian cho mô hình."]
  },
  "tuning": {
    p: "Viết Optuna study tối ưu MAE cho RandomForestRegressor bằng 3-fold CV trên tập train, 50 lần thử, cố định seed. Sau khi xong, huấn luyện lại mô hình với best_params trên toàn bộ train và đánh giá một lần trên test.",
    flags: ["Tuning dựa trên tập test.", "Không cố định random seed.", "Không gian tìm kiếm quá hẹp hoặc chứa giá trị không hợp lệ."],
    ask: ["Cải thiện sau tuning có lớn hơn độ lệch chuẩn giữa các fold không?"],
    check: ["So sánh với tham số mặc định trên cùng các fold."],
    decide: ["Khi nào dừng tuning và quay lại làm đặc trưng."]
  },
  "explainability": {
    p: "Tính SHAP cho mô hình duyệt vay. Với một hồ sơ bị từ chối, liệt kê 3 lý do chính bằng ngôn ngữ khách hàng hiểu được. Kiểm tra xem mô hình có dựa vào đặc trưng thay thế cho giới tính hoặc nơi ở không.",
    flags: ["Diễn giải SHAP như quan hệ nhân quả.", "Bỏ qua đặc trưng tương quan mạnh khi giải thích."],
    ask: ["Nếu đổi giá trị đặc trưng này, dự đoán thay đổi đúng hướng như lời giải thích không?", "Kết quả có khác nhau giữa các nhóm khách hàng không?"],
    check: ["Đổi thử một đặc trưng và xem dự đoán.", "Tính metric theo từng nhóm nhạy cảm."],
    decide: ["Mô hình có đủ công bằng và minh bạch để dùng hay không."]
  },
  "kmeans": {
    p: "Phân khúc khách hàng bằng RFM và K-Means. Biến đổi log, chuẩn hoá, thử K từ 2 đến 8 với inertia và silhouette. Mô tả từng cụm bằng giá trị trung vị gốc (chưa chuẩn hoá) và đề xuất tên cụm.",
    flags: ["Không chuẩn hoá.", "Coi K 'tối ưu' về toán học là đáp án nghiệp vụ."],
    ask: ["Chạy lại với seed khác, các cụm có giữ nguyên không?", "Đội marketing có hành động khác nhau cho từng cụm không?"],
    check: ["Kiểm tra độ ổn định của cụm.", "Xem vài khách cụ thể trong mỗi cụm."],
    decide: ["Số cụm và tên cụm dựa trên hành động kinh doanh."]
  },
  "dbscan": {
    p: "Gom các điểm đón GPS bằng HDBSCAN. Dùng khoảng cách haversine, min_cluster_size nên chọn thế nào? Báo cáo tỉ lệ nhiễu và cách kiểm tra cụm có hợp lý trên bản đồ.",
    flags: ["Dùng khoảng cách Euclid trực tiếp trên độ kinh vĩ.", "Chọn eps tuỳ tiện."],
    ask: ["Tỉ lệ điểm bị coi là nhiễu là bao nhiêu, có hợp lý không?"],
    check: ["Vẽ cụm lên bản đồ."],
    decide: ["Kích thước cụm tối thiểu có ý nghĩa với nghiệp vụ."]
  },
  "pca": {
    p: "Giảm chiều 200 cảm biến bằng PCA giữ 95% phương sai. Chuẩn hoá trước, fit chỉ trên dữ liệu vận hành bình thường. Dùng sai số tái tạo để phát hiện bất thường và giải thích cách chọn ngưỡng.",
    flags: ["Không chuẩn hoá trước PCA.", "Dùng t-SNE hoặc UMAP làm đầu vào cho mô hình.", "Diễn giải khoảng cách giữa các cụm trên biểu đồ t-SNE."],
    ask: ["Thành phần chính đầu tiên chủ yếu đến từ những cảm biến nào?"],
    check: ["Xem explained_variance_ratio_ và loadings."],
    decide: ["Đánh đổi giữa số chiều và mức mất thông tin."]
  },
  "anomaly": {
    p: "Phát hiện đăng nhập bất thường bằng Isolation Forest. Tôi không có nhãn. Đề xuất cách chọn ngưỡng cảnh báo sao cho đội an ninh xem được 50 cảnh báo mỗi ngày, và cách đánh giá khi dần có nhãn.",
    flags: ["Đặt contamination tuỳ tiện.", "Không có kế hoạch đánh giá sau khi có nhãn."],
    ask: ["Cảnh báo mẫu này có hợp lý với chuyên gia không?"],
    check: ["Cho chuyên gia gán nhãn một mẫu cảnh báo và tính precision."],
    decide: ["Số lượng cảnh báo đội vận hành xử lý được."]
  },
  "recsys": {
    p: "Xây gợi ý 'mua kèm' bằng item-item collaborative filtering từ bảng orders. Đánh giá offline bằng Recall@10 theo thời gian (train trên quá khứ, test trên tuần sau). Xử lý sản phẩm mới chưa có lịch sử thế nào?",
    flags: ["Chỉ đánh giá offline rồi kết luận.", "Chia ngẫu nhiên thay vì theo thời gian.", "Bỏ qua cold start và vòng phản hồi (chỉ gợi ý sản phẩm đã phổ biến)."],
    ask: ["Gợi ý có khác gì so với danh sách bán chạy nhất?", "Làm sao đo tác động thật lên doanh thu?"],
    check: ["So với baseline 'phổ biến nhất'.", "A/B test trước khi triển khai rộng."],
    decide: ["Mục tiêu tối ưu: doanh thu, đa dạng hay trải nghiệm."]
  },
  "ts-basics": {
    p: "Dự báo doanh số theo ngày 28 ngày tới. So sánh seasonal naive, ETS và Prophet bằng backtesting cửa sổ mở rộng. Báo cáo MAE của từng mô hình và khoảng dự báo 80%.",
    flags: ["Chia ngẫu nhiên thay vì theo thời gian.", "Không so sánh với seasonal naive.", "Chỉ đưa ra dự báo điểm, không có khoảng."],
    ask: ["Mô hình có tốt hơn seasonal naive một cách rõ ràng không?"],
    check: ["Backtesting nhiều điểm cắt.", "Vẽ dự báo chồng lên dữ liệu thật."],
    decide: ["Chấp nhận mức sai số nào khi đặt hàng và xếp ca."]
  },
  "ts-ml": {
    p: "Tạo đặc trưng lag 7/14/28 và rolling mean cho LightGBM dự báo 14 ngày tới. Đảm bảo mọi đặc trưng chỉ dùng dữ liệu có trước thời điểm dự báo. Viết một test chứng minh không có rò rỉ.",
    flags: ["Rolling không shift nên dùng giá trị của chính ngày cần dự đoán.", "Dùng lag nhỏ hơn tầm dự báo."],
    ask: ["Khi dự báo ngày t+14, đặc trưng lag_7 lấy giá trị từ ngày nào?"],
    check: ["Test: đổi giá trị tương lai, đặc trưng hiện tại không được đổi."],
    decide: ["Tầm dự báo và tần suất huấn luyện lại."]
  },
  "nn-basics": {
    p: "Viết vòng lặp huấn luyện PyTorch cho MLP phân loại, có model.train()/model.eval(), torch.no_grad() khi đánh giá, early stopping theo loss validation, cố định seed. Giải thích mỗi dòng trong một bước huấn luyện.",
    flags: ["Quên model.eval() hoặc zero_grad().", "Đánh giá trên tập train.", "Dùng deep learning cho dữ liệu bảng nhỏ khi GBDT làm tốt hơn."],
    ask: ["Vì sao chọn mạng nơ-ron thay vì gradient boosting cho dữ liệu này?", "Mô hình overfit được một batch nhỏ không?"],
    check: ["Overfit một batch nhỏ để kiểm tra code.", "So với baseline đơn giản hơn."],
    decide: ["Có đáng dùng deep learning với chi phí huấn luyện và vận hành không."]
  },
  "cnn": {
    p: "Tinh chỉnh ResNet50 pretrained cho 3 lớp ảnh bo mạch với 2.000 ảnh. Dùng đúng transforms của weights, đóng băng backbone ban đầu, augmentation phù hợp. Chia tập theo lô sản xuất để tránh ảnh gần giống nhau lọt sang tập test.",
    flags: ["Tiền xử lý khác với lúc pretrain.", "Ảnh gần giống nhau nằm ở cả train và test.", "Chỉ đánh giá trong điều kiện phòng lab."],
    ask: ["Mô hình có hoạt động với ảnh từ camera và ánh sáng khác không?", "Mô hình đang nhìn vào vùng nào của ảnh?"],
    check: ["Thử trên ảnh từ dây chuyền thật.", "Grad-CAM để xem vùng ảnh mô hình dựa vào."],
    decide: ["Ngưỡng chấp nhận lỗi và quy trình khi mô hình không chắc chắn."]
  },
  "rnn": {
    p: "Tôi có chuỗi gia tốc kế 6 kênh, cửa sổ 5 giây. So sánh GRU nhỏ với 1D-CNN và LightGBM trên đặc trưng thống kê cho bài toán nhận dạng hoạt động chạy trên đồng hồ. Tiêu chí: độ chính xác, kích thước mô hình, độ trễ.",
    flags: ["Đề xuất Transformer lớn cho thiết bị biên.", "Chia cửa sổ chồng lấn rồi chia tập ngẫu nhiên (rò rỉ)."],
    ask: ["Các cửa sổ của cùng một người có nằm ở cả train và test không?"],
    check: ["Chia tập theo người dùng."],
    decide: ["Giới hạn bộ nhớ và pin trên thiết bị."]
  },
  "transformer": {
    p: "Tinh chỉnh PhoBERT phân loại 15 ý định tin nhắn tiếng Việt. Có cần tách từ trước không? Độ dài tối đa bao nhiêu? So sánh với TF-IDF + LogisticRegression và báo cáo F1 macro.",
    flags: ["Tokenizer không khớp với mô hình.", "Bỏ qua bước tiền xử lý mà mô hình yêu cầu (PhoBERT cần văn bản đã tách từ).", "Không so với baseline đơn giản."],
    ask: ["Chênh lệch với baseline có đáng với chi phí GPU không?"],
    check: ["Đọc model card trên Hugging Face.", "Xem các tin nhắn bị phân loại sai."],
    decide: ["Chấp nhận độ trễ và chi phí suy luận nào."]
  },
  "nlp-embeddings": {
    p: "Tôi cần tìm kiếm ngữ nghĩa trên 50.000 câu hỏi hỗ trợ bằng tiếng Việt. Đề xuất mô hình embedding đa ngôn ngữ phù hợp, cách đánh giá bằng 50 truy vấn có đáp án, và khi nào cần thêm tìm kiếm từ khoá BM25.",
    flags: ["Dùng mô hình embedding chỉ hỗ trợ tiếng Anh.", "Đổi mô hình embedding mà không tính lại vector cũ.", "Bỏ qua tiền tố yêu cầu (query:/passage:) của một số mô hình."],
    ask: ["Truy vấn chứa mã sản phẩm có tìm đúng không?"],
    check: ["Bộ truy vấn chuẩn và Recall@5."],
    decide: ["Chấp nhận chi phí và độ trễ của mô hình embedding nào."]
  },
  "llm-prompting": {
    p: "Trích xuất ngày, địa điểm, biển số, mô tả thiệt hại từ biên bản bồi thường thành JSON theo schema này. Nếu thiếu thông tin thì để null, không suy đoán. Tôi sẽ kiểm tra bằng Pydantic và 30 biên bản đã có đáp án.",
    flags: ["Tin đầu ra mà không kiểm tra schema.", "Để mô hình tự điền khi thiếu thông tin.", "Gửi dữ liệu nhạy cảm khi chưa có thoả thuận xử lý dữ liệu."],
    ask: ["Mô hình trả lời thế nào khi tài liệu không có thông tin?", "Kết quả có ổn định khi chạy lại nhiều lần không?"],
    check: ["Bộ đánh giá có đáp án.", "Validate đầu ra bằng schema."],
    decide: ["Trường hợp nào cần người duyệt."]
  },
  "rag": {
    p: "Thiết kế RAG hỏi đáp 500 trang chính sách nhân sự. Nêu cách chia đoạn, hybrid search, rerank, prompt bắt buộc trích dẫn và được phép nói 'không biết'. Đề xuất bộ 30 câu hỏi đánh giá, gồm câu không có trong tài liệu.",
    flags: ["Không đánh giá riêng khâu truy xuất.", "Không cho phép mô hình trả lời 'không biết'.", "Không kiểm soát quyền truy cập theo tài liệu."],
    ask: ["Câu trả lời có trích dẫn đúng đoạn chứa thông tin không?", "Với câu hỏi không có trong tài liệu, hệ thống trả lời gì?"],
    check: ["Recall@k của truy xuất.", "Kiểm tra từng trích dẫn."],
    decide: ["Câu hỏi nào phải chuyển cho người trả lời."]
  },
  "finetuning": {
    p: "Tôi có 3.000 cặp (hợp đồng, tóm tắt do luật sư viết). Trước khi fine-tune, đề xuất cách thử prompt + RAG và bộ đánh giá. Nếu vẫn chưa đạt, lập kế hoạch LoRA gồm chia tập, tiêu chí dừng và chi phí ước tính.",
    flags: ["Đề xuất fine-tune ngay khi chưa thử prompt và RAG.", "Không có bộ đánh giá trước và sau.", "Dữ liệu đánh giá lọt vào dữ liệu huấn luyện."],
    ask: ["Vấn đề là thiếu kiến thức hay sai định dạng, hành vi?", "Chi phí fine-tune và vận hành so với gọi API là bao nhiêu?"],
    check: ["So sánh với mô hình gốc có prompt tốt trên cùng bộ đánh giá."],
    decide: ["Có đáng fine-tune không, xét chi phí và rủi ro."]
  },
  "agents-eval": {
    p: "Thiết kế agent text-to-SQL chỉ đọc. Liệt kê công cụ, quyền của từng công cụ, bước nào cần người xác nhận, và bộ 50 câu hỏi có đáp án để chạy lại mỗi khi đổi prompt hoặc mô hình.",
    flags: ["Cho agent quyền ghi hoặc xoá dữ liệu thật.", "Dùng agent cho quy trình cố định mà workflow đơn giản làm được.", "Chỉ đánh giá bằng vài ví dụ thủ công."],
    ask: ["Điều gì xảy ra nếu agent chạy sai lệnh?", "Tỉ lệ đúng trên bộ đánh giá trước và sau thay đổi là bao nhiêu?"],
    check: ["Bộ đánh giá hồi quy.", "Log và đọc lại trace của các lần chạy sai."],
    decide: ["Hành động nào agent được tự làm, hành động nào cần người duyệt."]
  },
  "serving-api": {
    p: "Viết FastAPI endpoint /predict cho pipeline giá vé: Pydantic kiểm tra đầu vào (stops 0–4, arrival sau departure hoặc hôm sau), load mô hình một lần khi khởi động, ghi log đầu vào và dự đoán. Viết pytest cho đầu vào sai và chuyến qua đêm.",
    flags: ["Load mô hình trong mỗi request.", "Không kiểm tra đầu vào.", "Lộ thông tin lỗi nội bộ ra ngoài; thiếu kiểm tra bảo mật."],
    ask: ["Endpoint trả gì khi đầu vào sai?", "Có dữ liệu cá nhân nào bị ghi vào log không?"],
    check: ["pytest với đầu vào sai và trường hợp biên.", "So dự đoán API với notebook trên cùng dữ liệu."],
    decide: ["Yêu cầu độ trễ và dữ liệu nào được phép ghi log."]
  },
  "docker": {
    p: "Viết Dockerfile cho FastAPI + scikit-learn: image cơ sở slim, ghim phiên bản, không chạy bằng root, không đưa secret vào image. Giải thích từng lệnh và cách giảm kích thước image.",
    flags: ["Đưa secret vào image.", "Không ghim phiên bản thư viện.", "Chạy container bằng root khi không cần."],
    ask: ["Image nặng bao nhiêu, lớp nào chiếm nhiều nhất?"],
    check: ["docker build rồi chạy thử, gọi API từ bên ngoài container.", "Quét lỗ hổng image (ví dụ trivy)."],
    decide: ["Nền tảng triển khai theo chi phí và lưu lượng."]
  },
  "tracking": {
    p: "Thêm MLflow vào train.py: log tham số, metric validation, phiên bản dữ liệu (hash file), commit Git, và đăng ký pipeline vào registry. Giải thích cách chọn phiên bản đưa vào production.",
    flags: ["Chỉ log metric, không log phiên bản dữ liệu và code."],
    ask: ["Từ một mô hình đang chạy, có truy ngược được dữ liệu và code đã dùng không?"],
    check: ["Tái tạo lại một lần chạy từ thông tin đã log."],
    decide: ["Tiêu chí đưa mô hình lên production."]
  },
  "pipelines-cicd": {
    p: "Viết GitHub Actions: chạy pytest, kiểm tra dữ liệu, huấn luyện, và chỉ cho qua nếu MAE mới tốt hơn mô hình hiện tại ít nhất 1% trên cùng tập kiểm tra. Mô tả các bước shadow và canary trước khi chuyển 100% lưu lượng.",
    flags: ["Không có cổng chặn mô hình kém hơn.", "Tự động triển khai không có đường rollback."],
    ask: ["Nếu dữ liệu đầu vào hỏng, pipeline dừng ở bước nào?"],
    check: ["Chạy thử pipeline với dữ liệu lỗi có chủ đích."],
    decide: ["Ngưỡng cải thiện và ai duyệt triển khai."]
  },
  "monitoring": {
    p: "Viết hàm tính PSI cho từng đặc trưng giữa dữ liệu huấn luyện và dữ liệu tuần gần nhất, cảnh báo khi PSI > 0,25. Đề xuất quy trình điều tra: phân biệt lỗi pipeline dữ liệu với thay đổi thật của thị trường.",
    flags: ["Huấn luyện lại tự động mỗi khi có drift mà không điều tra.", "Không log dự đoán để nối với nhãn thật sau này."],
    ask: ["Drift này đến từ thay đổi thật hay lỗi dữ liệu?", "Hiệu năng thật có giảm không, hay chỉ phân phối đầu vào đổi?"],
    check: ["Kiểm tra nguồn dữ liệu ngay khi có cảnh báo.", "So sánh metric trên dữ liệu có nhãn mới."],
    decide: ["Ngưỡng cảnh báo, và khi nào dừng mô hình."]
  },
  "spark": {
    p: "Dữ liệu 8 GB Parquet. Tôi có nên dùng Spark không, hay DuckDB/Polars đủ? Nếu cần Spark, viết job groupBy tránh collect() về driver và giải thích chỗ nào xảy ra shuffle.",
    flags: ["Đề xuất dựng cluster Spark cho dữ liệu vài GB.", "collect() toàn bộ dữ liệu về driver.", "UDF Python thay cho hàm có sẵn."],
    ask: ["Chi phí và độ phức tạp so với chạy trên một máy là bao nhiêu?"],
    check: ["Chạy thử với DuckDB trước và đo thời gian."],
    decide: ["Công cụ phù hợp với kích thước dữ liệu và đội ngũ."]
  },
  "warehouse": {
    p: "Viết model dbt tính đặc trưng khách hàng 90 ngày từ fct_orders và dim_customers, kèm test not_null và unique. Giải thích vì sao đặt định nghĩa metric trong dbt thay vì trong từng notebook.",
    flags: ["Mỗi notebook tự định nghĩa metric khác nhau.", "Không có test dữ liệu."],
    ask: ["Metric này có khớp với báo cáo hiện tại của công ty không?"],
    check: ["Đối chiếu với con số trên dashboard chính thức."],
    decide: ["Định nghĩa chính thức của các metric quan trọng."]
  },
  "case-current": {
    p: "Đọc app.py và flight_price.ipynb trong repo. Liệt kê các bước từ dữ liệu đến dự đoán, những giả định ngầm, và những chỗ có thể sai. Chưa sửa code.",
    flags: ["Đề xuất viết lại toàn bộ khi chưa hiểu code hiện tại."],
    ask: ["Chỗ nào trong app.py xử lý khác với notebook?"],
    check: ["Tự chạy notebook và app với cùng một chuyến bay."],
    decide: ["Sửa từng phần hay viết lại."]
  },
  "case-issues": {
    p: "Với từng vấn đề trong app.py (đường dẫn D:/, thời lượng qua đêm, one-hot viết tay, lưu nhầm mô hình), viết test chứng minh lỗi trước, sau đó mới viết bản sửa để test chuyển sang đạt.",
    flags: ["Sửa code mà không có test chứng minh lỗi.", "Sửa nhiều lỗi trong một lần thay đổi lớn."],
    ask: ["Test này có thất bại với code cũ không?"],
    check: ["Chạy test trước và sau khi sửa."],
    decide: ["Thứ tự ưu tiên sửa theo mức ảnh hưởng."]
  },
  "case-upgrade": {
    p: "Lập kế hoạch nâng cấp dự án Flight Fare thành 8 commit nhỏ, mỗi commit có mục tiêu, file thay đổi và cách kiểm tra. Tôi sẽ làm và review từng commit.",
    flags: ["Một commit khổng lồ thay đổi mọi thứ.", "Thêm công cụ MLOps khi phần lõi chưa ổn định."],
    ask: ["Bước nào có thể bỏ nếu thiếu thời gian?"],
    check: ["Mỗi commit đều chạy được và có test."],
    decide: ["Phạm vi dự án portfolio."]
  }
};

/* Tình huống luyện phản biện: AI đề xuất, bạn đánh giá.
   ans: "accept" = chấp nhận được, "fix" = đúng hướng nhưng phải sửa, "reject" = bác bỏ */
window.ROADMAP_QUIZ = [
  { mod: "cleaning", ai: "Để xử lý giá trị thiếu, tôi điền trung bình cho toàn bộ DataFrame rồi mới chia train/test.", code: "df = df.fillna(df.mean())\nX_train, X_test, y_train, y_test = train_test_split(X, y)", ans: "fix",
    why: "Trung bình được tính cả trên tập test, nên thông tin của test lọt vào lúc huấn luyện (rò rỉ). Chia tập trước, dùng SimpleImputer trong Pipeline để chỉ fit trên train." },
  { mod: "imbalanced", ai: "Mô hình phát hiện gian lận đạt accuracy 99,8%, rất tốt, có thể triển khai.", ans: "reject",
    why: "Gian lận chỉ chiếm 0,2%: dự đoán 'không gian lận' cho mọi giao dịch cũng đạt 99,8%. Cần precision, recall, PR-AUC và so với baseline." },
  { mod: "validation", ai: "Dữ liệu doanh số theo ngày, tôi dùng train_test_split(shuffle=True) để chia 80/20.", ans: "reject",
    why: "Chia ngẫu nhiên cho phép mô hình học từ tương lai để đoán quá khứ. Dữ liệu theo thời gian phải chia theo thời gian (TimeSeriesSplit hoặc cắt theo ngày)." },
  { mod: "random-forest", ai: "Dùng RandomForestRegressor(max_features='auto') như trong notebook.", ans: "fix",
    why: "max_features='auto' đã bị loại bỏ từ scikit-learn 1.3 và sẽ báo lỗi. Với hồi quy, dùng 1.0 (hành vi cũ) hoặc 'sqrt', hoặc một tỉ lệ như 0.5." },
  { mod: "scaling", ai: "Thời lượng bay = abs(giờ đến - giờ đi).", code: "dur_hour = abs(Arrival_hour - Dep_hour)", ans: "reject",
    why: "Chuyến 22:20 đến 01:10 hôm sau bị tính thành 21 giờ. Phải trừ hai datetime đầy đủ và cộng một ngày khi giờ đến nhỏ hơn giờ đi." },
  { mod: "git-env", ai: "Cài thư viện này để tự động làm sạch dữ liệu: pip install pandas-autoclean-pro", ans: "reject",
    why: "Tên package có thể là do AI bịa ra. Nghiên cứu năm 2025 cho thấy khoảng 20% package mà các mô hình sinh code đề xuất không tồn tại, và kẻ xấu có thể đăng ký trước các tên đó. Luôn kiểm tra trên pypi.org trước khi cài." },
  { mod: "boosting", ai: "Dùng early stopping trên tập test để chọn số cây tối ưu, rồi báo cáo MAE trên chính tập test đó.", ans: "reject",
    why: "Tập test đã được dùng để chọn mô hình nên kết quả bị lạc quan. Cần tập validation riêng cho early stopping, tập test chỉ dùng một lần ở cuối." },
  { mod: "metrics", ai: "RMSE của mô hình mới thấp hơn nên mô hình mới tốt hơn.", ans: "fix",
    why: "Chỉ đúng nếu RMSE là metric bạn đã chọn từ đầu và hai mô hình được đánh giá trên cùng tập. Trong notebook, mô hình tuning có RMSE thấp hơn nhưng MAE cao hơn: phải quay về metric gắn với chi phí sai số." },
  { mod: "pipelines", ai: "Trong API, tôi tạo lại các cột one-hot bằng if/elif cho từng hãng bay giống notebook.", ans: "fix",
    why: "Chạy được nhưng dễ lệch với lúc huấn luyện và lỗi khi có hãng bay mới. Lưu Pipeline có OneHotEncoder(handle_unknown='ignore') và gọi predict trên DataFrame thô." },
  { mod: "statistics", ai: "Sau 2 ngày A/B test, p-value = 0,04 nên ta dừng và triển khai phiên bản B.", ans: "reject",
    why: "Dừng sớm ngay khi p < 0,05 (peeking) làm tăng dương tính giả. Cỡ mẫu và thời gian chạy phải được định trước, thường tối thiểu đủ một chu kỳ tuần." },
  { mod: "linear-regression", ai: "Hệ số của kênh TV là 3,2 nên cứ chi thêm 1 triệu cho TV sẽ tăng 3,2 triệu doanh số.", ans: "fix",
    why: "Hệ số hồi quy là tương quan có điều kiện, không phải nhân quả; có thể bị ảnh hưởng bởi đa cộng tuyến, mùa vụ, và không ngoại suy được khi chi tiêu vượt khoảng đã thấy. Cần thử nghiệm hoặc MMM có kiểm chứng." },
  { mod: "rag", ai: "Prompt: 'Hãy trả lời câu hỏi của nhân viên thật đầy đủ.' kèm các đoạn tài liệu.", ans: "fix",
    why: "Thiếu ràng buộc chỉ dùng tài liệu, trích dẫn nguồn và được phép nói 'không biết'. Case Air Canada cho thấy doanh nghiệp chịu trách nhiệm cho câu trả lời sai của bot." },
  { mod: "finetuning", ai: "Mô hình chưa biết chính sách mới của công ty, ta nên fine-tune lại mỗi khi chính sách đổi.", ans: "reject",
    why: "Thiếu kiến thức thay đổi thường xuyên là việc của RAG. Fine-tune phù hợp để thay đổi hành vi, định dạng hoặc chưng cất, không phải để cập nhật tài liệu." },
  { mod: "nn-basics", ai: "Dữ liệu bảng 5.000 dòng, 20 cột: dùng mạng nơ-ron 6 tầng sẽ cho kết quả tốt nhất.", ans: "reject",
    why: "Với dữ liệu bảng cỡ nhỏ và vừa, gradient boosting thường tốt hơn và rẻ hơn. Bắt đầu bằng baseline và GBDT; chỉ thử mạng nơ-ron khi có lý do." },
  { mod: "ts-ml", ai: "Đặc trưng rolling_mean_7 = trung bình 7 ngày gần nhất tính bằng rolling(7).mean().", code: "df['roll7'] = df.groupby('sku')['sales'].transform(lambda s: s.rolling(7).mean())", ans: "fix",
    why: "Cửa sổ gồm cả ngày hiện tại, tức giá trị cần dự đoán (rò rỉ). Phải shift ít nhất bằng tầm dự báo trước khi rolling, ví dụ s.shift(7).rolling(7).mean() khi dự báo trước 7 ngày." },
  { mod: "serving-api", ai: "Trong hàm predict, mỗi request tôi đọc file mô hình bằng pickle.load rồi dự đoán.", ans: "fix",
    why: "Load mô hình mỗi request làm tăng độ trễ rất nhiều. Load một lần khi ứng dụng khởi động; dùng đường dẫn tương đối và kiểm tra phiên bản thư viện." },
  { mod: "encoding", ai: "Mã hoá thành phố: Hà Nội=1, Đà Nẵng=2, TP.HCM=3 rồi đưa vào hồi quy tuyến tính.", ans: "reject",
    why: "Tạo ra thứ tự và khoảng cách giả giữa các thành phố. Với mô hình tuyến tính dùng one-hot; với nhiều giá trị dùng target encoding có cross-fitting hoặc để CatBoost/LightGBM xử lý." },
  { mod: "sql", ai: "SELECT c.customer_id, SUM(o.amount) FROM customers c JOIN orders o ON ... JOIN tickets t ON t.customer_id = c.customer_id GROUP BY 1", ans: "fix",
    why: "Join thêm bảng tickets (một khách nhiều ticket) làm nhân bản dòng đơn hàng, SUM(amount) bị nhân lên. Tổng hợp từng bảng trong CTE riêng rồi mới join." },
  { mod: "monitoring", ai: "PSI của Duration vượt 0,25, hãy tự động huấn luyện lại mô hình ngay.", ans: "fix",
    why: "Cần điều tra trước: drift có thể do lỗi pipeline (đổi đơn vị, cột bị null) chứ không phải thay đổi thật. Huấn luyện lại trên dữ liệu lỗi sẽ làm mô hình tệ hơn." },
  { mod: "logistic-regression", ai: "Chọn ngưỡng 0,5 để duyệt vay vì đó là ngưỡng chuẩn.", ans: "reject",
    why: "0,5 chỉ là mặc định. Ngưỡng phải chọn theo chi phí nợ xấu so với lợi nhuận mỗi khoản vay và khẩu vị rủi ro, sau khi kiểm tra xác suất đã được hiệu chỉnh." },
  { mod: "explainability", ai: "SHAP cho thấy 'số năm làm việc' có đóng góp lớn nhất, vậy tăng số năm làm việc sẽ làm khách được duyệt.", ans: "fix",
    why: "SHAP giải thích mô hình dựa vào gì, không nói về quan hệ nhân quả ngoài đời thực. Cũng cần kiểm tra các đặc trưng tương quan với nhau." },
  { mod: "agents-eval", ai: "Cho agent quyền chạy mọi câu lệnh SQL để trả lời linh hoạt hơn.", ans: "reject",
    why: "Agent có thể chạy UPDATE/DELETE sai. Chỉ cấp quyền đọc, giới hạn bảng, và yêu cầu người duyệt với hành động có ảnh hưởng." },
  { mod: "tuning", ai: "Dùng GridSearchCV với 6 tham số, mỗi tham số 10 giá trị, 5-fold.", ans: "fix",
    why: "10^6 tổ hợp × 5 fold là quá lớn. Dùng RandomizedSearch hoặc Optuna với số lần thử giới hạn, và làm tốt đặc trưng trước khi tuning." },
  { mod: "pca", ai: "Dùng t-SNE giảm xuống 2 chiều rồi đưa vào mô hình phân loại.", ans: "reject",
    why: "t-SNE dùng để trực quan hoá, không có phép transform ổn định cho dữ liệu mới và làm méo khoảng cách. Dùng PCA hoặc giữ nguyên đặc trưng cho mô hình." }
];

/* Bằng chứng về AI khi viết code (dùng trong phần Học để làm chủ AI) */
window.ROADMAP_AI_EVIDENCE = [
  { n: "−19%", t: "Lập trình viên giàu kinh nghiệm chậm hơn 19% khi dùng AI trên dự án quen thuộc, dù chính họ tin mình nhanh hơn khoảng 20%.", src: ["METR, 2025 — thử nghiệm ngẫu nhiên, 16 lập trình viên, 246 task", "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"] },
  { n: "+55,8%", t: "Với một task mới, được mô tả rõ (viết HTTP server), nhóm dùng Copilot hoàn thành nhanh hơn 55,8%.", src: ["GitHub Copilot controlled experiment (arXiv 2302.06590)", "https://arxiv.org/abs/2302.06590"] },
  { n: "66%", t: "Lập trình viên nói nỗi khó chịu lớn nhất là code AI viết 'gần đúng nhưng chưa hẳn'. 46% không tin độ chính xác của AI, chỉ 3% tin cao.", src: ["Stack Overflow Developer Survey 2025", "https://survey.stackoverflow.co/2025/ai"] },
  { n: "19,7%", t: "Trong 576.000 mẫu code của 16 mô hình, 19,7% package được đề xuất không tồn tại; 43% tên bịa lặp lại khi hỏi lại, nên kẻ xấu có thể đăng ký trước.", src: ["Spracklen et al. — We Have a Package for You! (USENIX Security 2025)", "https://www.helpnetsecurity.com/2025/04/14/package-hallucination-slopsquatting-malicious-code/"] },
  { n: "45%", t: "Code do hơn 100 mô hình sinh ra cho 80 task thực tế có lỗ hổng bảo mật OWASP Top 10 trong 45% trường hợp.", src: ["Veracode — 2025 GenAI Code Security Report", "https://www.veracode.com/blog/genai-code-security-report/"] },
  { n: "65% vs <40%", t: "Người mới học thư viện mới: nhóm dùng AI để hỏi khái niệm đạt từ 65% trở lên trong bài kiểm tra hiểu biết, nhóm giao hết việc viết code cho AI dưới 40%. Khoảng cách lớn nhất nằm ở kỹ năng debug.", src: ["Anthropic — How AI assistance impacts the formation of coding skills (2026)", "https://www.anthropic.com/research/AI-assistance-coding-skills"] }
];
