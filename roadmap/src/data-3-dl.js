/* Giai đoạn 8–10: Chuỗi thời gian, Deep Learning, NLP & GenAI */
window.ROADMAP = window.ROADMAP || [];
window.ROADMAP.push(
{
  id: "s8", track: "ml", title: "Chuỗi thời gian & Dự báo",
  subtitle: "Dự đoán tương lai từ dữ liệu có thứ tự thời gian",
  weeks: "2–3 tuần",
  goal: "Phân rã chuỗi, xây baseline, dùng mô hình thống kê và ML cho dự báo, đánh giá đúng theo thời gian.",
  modules: [
    {
      id: "ts-basics", title: "Thành phần chuỗi thời gian và mô hình thống kê", level: 2, hours: 10,
      summary: "Xu hướng, mùa vụ, tính dừng, tự tương quan; baseline naive, ETS, ARIMA/SARIMA, Prophet.",
      concept: "Chuỗi = xu hướng + mùa vụ + phần dư. Tính dừng (stationarity): trung bình và phương sai không đổi theo thời gian; kiểm tra bằng ADF test, xử lý bằng sai phân. ACF/PACF cho thấy mức phụ thuộc vào quá khứ. Baseline bắt buộc: seasonal naive (giá trị cùng kỳ trước). ETS (Holt-Winters) làm mượt theo hàm mũ; ARIMA mô hình hoá tự hồi quy và trung bình trượt; Prophet phù hợp dữ liệu kinh doanh có ngày lễ và nhiều mùa vụ.",
      why: ["Dự báo nhu cầu, tồn kho, nhân sự, dòng tiền là nhu cầu cốt lõi của mọi doanh nghiệp.", "Mô hình thống kê cho khoảng dự báo (prediction interval) rõ ràng."],
      when: ["Một hoặc vài chuỗi, dữ liệu vừa đủ, cần khoảng tin cậy và giải thích."],
      whenNot: ["Hàng nghìn chuỗi có đặc trưng ngoại sinh phong phú: dùng mô hình ML toàn cục (LightGBM) hoặc deep learning."],
      example: {
        domain: "Chuỗi cà phê",
        title: "Dự báo lượng khách theo giờ",
        text: "Mỗi cửa hàng có mùa vụ theo giờ trong ngày và theo thứ trong tuần. Mô hình ETS và Prophet dự báo 7 ngày tới để xếp ca nhân viên, giảm tình trạng thiếu người giờ cao điểm."
      },
      code: { lang: "python", src: `from statsmodels.tsa.holtwinters import ExponentialSmoothing
y = sales.asfreq("D")
model = ExponentialSmoothing(y, trend="add", seasonal="add", seasonal_periods=7).fit()
fc = model.forecast(28)

# Baseline: seasonal naive
naive = y.shift(7)
print("MAE naive:", (y - naive).abs().mean())` },
      pitfalls: ["Chia train/test ngẫu nhiên thay vì theo thời gian.", "Không so sánh với baseline naive."],
      tools: ["statsmodels", "Prophet", "StatsForecast (Nixtla)", "sktime", "Darts"],
      resources: [["Forecasting: Principles and Practice (Hyndman, miễn phí)", "https://otexts.com/fpp3/"]]
    },
    {
      id: "ts-ml", title: "Dự báo bằng Machine Learning và Deep Learning", level: 3, hours: 10,
      summary: "Đặc trưng lag và rolling, mô hình toàn cục LightGBM, backtesting, mô hình nền tảng chuỗi thời gian.",
      concept: "Biến chuỗi thành bài toán hồi quy: đặc trưng lag (y tại t-1, t-7), thống kê cửa sổ trượt, lịch, khuyến mãi, thời tiết. Một mô hình toàn cục học chung trên nhiều chuỗi (sản phẩm × cửa hàng) thường tốt hơn nhiều mô hình riêng lẻ. Đánh giá bằng backtesting với cửa sổ mở rộng. Deep learning: N-BEATS, TFT, và các mô hình nền tảng (TimesFM, Chronos) dự báo zero-shot.",
      why: ["Tận dụng đặc trưng ngoại sinh và học chéo giữa các chuỗi.", "Các cuộc thi dự báo bán lẻ lớn (như M5) cho thấy LightGBM với đặc trưng tốt rất cạnh tranh."],
      when: ["Hàng nghìn SKU, có dữ liệu khuyến mãi, giá, sự kiện."],
      whenNot: ["Chỉ có một chuỗi ngắn: mô hình thống kê đơn giản an toàn hơn."],
      example: {
        domain: "Siêu thị",
        title: "Dự báo nhu cầu 10.000 sản phẩm × 200 cửa hàng",
        text: "Một mô hình LightGBM với lag 7/14/28 ngày, trung bình trượt, giá, khuyến mãi, ngày lễ dự báo 14 ngày tới. Kết quả đưa vào hệ thống đặt hàng tự động, giảm hàng tồn và hàng hết."
      },
      code: { lang: "python", src: `df = df.sort_values(["store", "sku", "date"])
g = df.groupby(["store", "sku"])["sales"]
for lag in (7, 14, 28):
    df[f"lag_{lag}"] = g.shift(lag)
df["roll_mean_28"] = g.transform(lambda s: s.shift(7).rolling(28).mean())
df["dow"] = df["date"].dt.dayofweek

train = df[df.date < "2026-08-01"]; valid = df[df.date >= "2026-08-01"]
# shift(7) đảm bảo mọi đặc trưng đều có sẵn tại thời điểm dự báo 7 ngày trước` },
      pitfalls: ["Rolling không shift nên dùng giá trị của chính ngày cần dự đoán (rò rỉ)."],
      tools: ["LightGBM", "MLForecast", "NeuralForecast", "Darts", "Chronos/TimesFM"],
      resources: [["Nixtla — MLForecast", "https://nixtlaverse.nixtla.io/mlforecast/"]]
    }
  ]
},
{
  id: "s9", track: "dl", title: "Deep Learning",
  subtitle: "Mạng nơ-ron cho ảnh, chuỗi và dữ liệu phi cấu trúc",
  weeks: "6–8 tuần",
  goal: "Xây, huấn luyện và tinh chỉnh mạng nơ-ron bằng PyTorch; hiểu CNN, RNN và Transformer; dùng transfer learning.",
  modules: [
    {
      id: "nn-basics", title: "Mạng nơ-ron cơ bản & PyTorch", level: 2, hours: 20,
      summary: "Perceptron, MLP, hàm kích hoạt, loss, backpropagation, optimizer, vòng lặp huấn luyện PyTorch.",
      concept: "Mỗi lớp tính h = activation(Wx + b). Hàm kích hoạt phi tuyến (ReLU, GELU) giúp mạng xấp xỉ hàm phức tạp. Loss: MSE (hồi quy), cross-entropy (phân loại). Backpropagation tính gradient qua quy tắc chuỗi, optimizer (AdamW) cập nhật trọng số. Kỹ thuật chống overfit: dropout, weight decay, batch normalization, data augmentation, early stopping. PyTorch là framework phổ biến nhất trong nghiên cứu và ngày càng phổ biến trong sản phẩm.",
      why: ["Là nền tảng cho thị giác máy tính, NLP, LLM, âm thanh.", "Học đặc trưng tự động từ dữ liệu thô thay vì thiết kế tay."],
      when: ["Ảnh, âm thanh, văn bản, video; dữ liệu rất lớn; bài toán cần học biểu diễn (embeddings)."],
      whenNot: ["Dữ liệu bảng cỡ nhỏ và vừa: gradient boosting thường tốt hơn và rẻ hơn.", "Ít dữ liệu mà không có mô hình pretrained để transfer learning."],
      example: {
        domain: "Giáo dục",
        title: "Nhận dạng chữ số viết tay (MNIST)",
        text: "Bài tập kinh điển: MLP 2 lớp đạt khoảng 98% độ chính xác. Cùng nguyên lý được dùng trong hệ thống đọc số tiền trên séc ngân hàng và mã bưu chính trên phong bì."
      },
      code: { lang: "python", src: `import torch, torch.nn as nn
model = nn.Sequential(nn.Flatten(), nn.Linear(784, 256), nn.ReLU(),
                      nn.Dropout(0.2), nn.Linear(256, 10))
opt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(5):
    model.train()
    for xb, yb in train_loader:
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        opt.step()
    model.eval()
    with torch.no_grad():
        acc = sum((model(x).argmax(1) == y).sum().item() for x, y in val_loader) / len(val_ds)
    print(epoch, round(acc, 4))` },
      pitfalls: ["Quên model.eval() khi đánh giá (dropout, batchnorm vẫn chạy).", "Quên zero_grad nên gradient cộng dồn.", "Learning rate không phù hợp: hãy dùng LR finder hoặc scheduler."],
      tools: ["PyTorch", "PyTorch Lightning", "Keras 3", "JAX", "Weights & Biases"],
      resources: [
        ["Dive into Deep Learning (d2l.ai)", "https://d2l.ai/"],
        ["fast.ai — Practical Deep Learning", "https://course.fast.ai/"],
        ["PyTorch Tutorials", "https://pytorch.org/tutorials/"]
      ]
    },
    {
      id: "cnn", title: "Thị giác máy tính: CNN và Vision Transformer", level: 3, hours: 15,
      summary: "Tích chập, pooling, kiến trúc ResNet/EfficientNet/ViT, transfer learning, phát hiện và phân đoạn đối tượng.",
      concept: "Lớp tích chập (convolution) học bộ lọc phát hiện cạnh, hoạ tiết, rồi bộ phận đối tượng, chia sẻ trọng số nên hiệu quả với ảnh. Tác vụ: phân loại ảnh, phát hiện đối tượng (YOLO), phân đoạn (U-Net, SAM), OCR. Vision Transformer chia ảnh thành patch và dùng attention. Transfer learning: lấy mô hình đã học trên ImageNet, thay lớp cuối và tinh chỉnh với vài trăm ảnh của bạn.",
      why: ["Tự động hoá kiểm tra bằng mắt: chất lượng sản phẩm, chẩn đoán hình ảnh, nhận dạng giấy tờ."],
      when: ["Có dữ liệu ảnh và nhãn; bài toán lặp lại quy mô lớn."],
      whenNot: ["Chỉ vài chục ảnh và không thể thu thập thêm: cân nhắc mô hình đa phương thức zero-shot hoặc quy trình thủ công."],
      example: {
        domain: "Sản xuất điện tử",
        title: "Phát hiện lỗi bo mạch",
        text: "Camera chụp từng bo mạch trên băng chuyền; mô hình YOLO phát hiện mối hàn lỗi, linh kiện lệch. Tinh chỉnh từ mô hình pretrained với khoảng 2.000 ảnh đã gán nhãn."
      },
      code: { lang: "python", src: `import torchvision
from torchvision.models import resnet50, ResNet50_Weights
weights = ResNet50_Weights.DEFAULT
model = resnet50(weights=weights)
for p in model.parameters():
    p.requires_grad = False                     # đóng băng backbone
model.fc = nn.Linear(model.fc.in_features, 3)   # 3 lớp: OK / trầy xước / nứt
preprocess = weights.transforms()               # dùng đúng tiền xử lý của pretrained` },
      pitfalls: ["Tiền xử lý khác với lúc pretrain.", "Ảnh train và ảnh thật khác điều kiện ánh sáng, camera (domain shift)."],
      tools: ["torchvision", "timm", "Ultralytics YOLO", "OpenCV", "Albumentations", "Label Studio"],
      resources: [["Stanford CS231n", "https://cs231n.github.io/"]]
    },
    {
      id: "rnn", title: "Mô hình chuỗi: RNN, LSTM, GRU", level: 3, hours: 6,
      summary: "Xử lý dữ liệu tuần tự bằng trạng thái ẩn; nền tảng lịch sử trước khi Transformer thống trị.",
      concept: "RNN đọc chuỗi từng bước và mang trạng thái ẩn. LSTM và GRU thêm các cổng để nhớ phụ thuộc dài hạn, giảm vanishing gradient. Ngày nay Transformer thay thế trong đa số tác vụ ngôn ngữ, nhưng LSTM/GRU vẫn gọn nhẹ cho chuỗi cảm biến, thiết bị biên và dự báo đơn giản.",
      why: ["Hiểu lịch sử và động lực dẫn đến attention.", "Vẫn hữu ích khi tài nguyên tính toán hạn chế."],
      when: ["Dữ liệu cảm biến IoT, nhận dạng hoạt động từ gia tốc kế, chuỗi ngắn trên thiết bị biên."],
      whenNot: ["Xử lý ngôn ngữ tự nhiên hiện đại: dùng Transformer pretrained."],
      example: {
        domain: "Thiết bị đeo",
        title: "Nhận dạng hoạt động từ đồng hồ thông minh",
        text: "GRU nhỏ chạy trên đồng hồ phân loại đi bộ, chạy, đạp xe từ cửa sổ 5 giây dữ liệu gia tốc kế, tiêu thụ rất ít pin."
      },
      code: { lang: "python", src: `class HAR(nn.Module):
    def __init__(self, n_feat=6, hidden=64, n_cls=4):
        super().__init__()
        self.gru = nn.GRU(n_feat, hidden, batch_first=True)
        self.head = nn.Linear(hidden, n_cls)
    def forward(self, x):            # x: (batch, time, feat)
        _, h = self.gru(x)
        return self.head(h[-1])` },
      pitfalls: ["Chuỗi quá dài làm huấn luyện chậm và khó học."],
      tools: ["PyTorch"],
      resources: [["Colah — Understanding LSTM Networks", "https://colah.github.io/posts/2015-08-Understanding-LSTMs/"]]
    },
    {
      id: "transformer", title: "Transformer và Attention", level: 3, hours: 12,
      summary: "Self-attention, positional encoding, encoder (BERT) và decoder (GPT): kiến trúc của LLM.",
      concept: "Self-attention cho mỗi token nhìn đến mọi token khác, trọng số tính từ Query · Key, chuẩn hoá softmax, rồi lấy tổng có trọng số của Value. Multi-head attention học nhiều kiểu quan hệ cùng lúc. Encoder-only (BERT) mạnh cho hiểu văn bản: phân loại, trích xuất. Decoder-only (GPT, Claude, Llama) sinh văn bản theo từng token. Encoder-decoder (T5) cho dịch và tóm tắt. Song song hoá tốt trên GPU nên mở rộng được đến hàng trăm tỉ tham số.",
      why: ["Nền tảng của LLM, mô hình đa phương thức, và nhiều mô hình ảnh, âm thanh, chuỗi thời gian hiện đại."],
      when: ["Mọi tác vụ ngôn ngữ; khi có mô hình pretrained phù hợp để tinh chỉnh."],
      whenNot: ["Tài nguyên tính toán rất hạn chế và bài toán đơn giản: TF-IDF + mô hình tuyến tính có thể đủ."],
      example: {
        domain: "Chăm sóc khách hàng",
        title: "Phân loại ý định tin nhắn tiếng Việt",
        text: "Tinh chỉnh PhoBERT trên 20.000 tin nhắn đã gán nhãn 15 ý định (đổi trả, hỏi giá, khiếu nại). Mô hình chạy trên CPU với độ trễ khoảng 30 ms và định tuyến tin nhắn tự động."
      },
      code: { lang: "python", src: `from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
tok = AutoTokenizer.from_pretrained("vinai/phobert-base")
model = AutoModelForSequenceClassification.from_pretrained("vinai/phobert-base", num_labels=15)
# Huấn luyện bằng transformers.Trainer với dataset đã token hoá...

# Attention thu gọn:
def attention(Q, K, V):
    w = torch.softmax(Q @ K.transpose(-2, -1) / K.shape[-1] ** 0.5, dim=-1)
    return w @ V` },
      pitfalls: ["Vượt độ dài ngữ cảnh tối đa của mô hình.", "Tokenizer không khớp với mô hình."],
      tools: ["Hugging Face Transformers", "PyTorch"],
      resources: [
        ["The Illustrated Transformer (Jay Alammar)", "https://jalammar.github.io/illustrated-transformer/"],
        ["Hugging Face — LLM Course", "https://huggingface.co/learn/llm-course/"]
      ]
    }
  ]
},
{
  id: "s10", track: "dl", title: "NLP & Generative AI",
  subtitle: "Xây ứng dụng trên mô hình ngôn ngữ lớn",
  weeks: "5–6 tuần",
  goal: "Hiểu embeddings, dùng LLM qua API, xây RAG, biết khi nào fine-tune, xây agent và đánh giá hệ thống LLM.",
  modules: [
    {
      id: "nlp-embeddings", title: "Tiền xử lý văn bản và Embeddings", level: 2, hours: 8,
      summary: "Tokenization, TF-IDF, word2vec, sentence embeddings, tìm kiếm ngữ nghĩa.",
      concept: "Văn bản cần chuyển thành số. Cách cổ điển: bag-of-words, TF-IDF (tăng trọng số cho từ hiếm nhưng đặc trưng). Embedding là vector dày biểu diễn ý nghĩa: câu có nghĩa gần nhau có vector gần nhau. Sentence-transformers và API embedding tạo vector cho cả câu hoặc đoạn văn. Tiếng Việt cần lưu ý tách từ (underthesea, pyvi) với mô hình cổ điển, còn mô hình đa ngôn ngữ hiện đại xử lý tốt văn bản thô.",
      why: ["Tìm kiếm theo ý nghĩa thay vì từ khoá.", "Là đầu vào cho phân cụm văn bản, phân loại, RAG, phát hiện trùng lặp."],
      when: ["Tìm kiếm tài liệu nội bộ, gom nhóm phản hồi khách hàng, phát hiện câu hỏi trùng lặp."],
      whenNot: ["Cần khớp chính xác mã sản phẩm, số hợp đồng: kết hợp tìm kiếm từ khoá (BM25) với tìm kiếm vector (hybrid search)."],
      example: {
        domain: "Thương mại điện tử",
        title: "Gom nhóm 50.000 đánh giá sản phẩm",
        text: "Embedding mọi đánh giá, phân cụm bằng HDBSCAN, rồi nhờ LLM đặt tên cho từng cụm: 'giao hàng chậm', 'pin yếu', 'đóng gói kỹ'. Đội sản phẩm có bức tranh tổng thể trong một buổi thay vì đọc thủ công hàng tuần."
      },
      code: { lang: "python", src: `from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer("intfloat/multilingual-e5-base")
docs = ["passage: Chính sách đổi trả trong 30 ngày", "passage: Phí vận chuyển nội thành"]
q = model.encode("query: tôi muốn trả lại hàng", normalize_embeddings=True)
d = model.encode(docs, normalize_embeddings=True)
print(util.cos_sim(q, d))` },
      pitfalls: ["Dùng mô hình embedding chỉ hỗ trợ tiếng Anh cho văn bản tiếng Việt.", "Đổi mô hình embedding nhưng không tính lại vector cũ."],
      tools: ["sentence-transformers", "scikit-learn TfidfVectorizer", "underthesea", "BM25 (rank_bm25)"],
      resources: [["SBERT docs", "https://www.sbert.net/"], ["MTEB leaderboard", "https://huggingface.co/spaces/mteb/leaderboard"]]
    },
    {
      id: "llm-prompting", title: "LLM và Prompt Engineering", level: 2, hours: 8,
      summary: "Gọi LLM qua API, thiết kế prompt, đầu ra có cấu trúc, tool use, chi phí và độ trễ.",
      concept: "LLM dự đoán token tiếp theo; qua huấn luyện theo chỉ dẫn, chúng làm theo yêu cầu bằng ngôn ngữ tự nhiên. Prompt tốt gồm: vai trò và bối cảnh, nhiệm vụ rõ ràng, ví dụ mẫu (few-shot), định dạng đầu ra (JSON schema), ràng buộc. Tool use (function calling) cho phép mô hình gọi hàm của bạn như tra cứu database. Cân nhắc chi phí theo token, độ trễ, context window, và prompt caching cho phần prompt lặp lại.",
      why: ["Giải quyết nhiều tác vụ NLP (trích xuất, phân loại, tóm tắt) mà không cần dữ liệu huấn luyện.", "Rút ngắn thời gian từ ý tưởng đến prototype từ vài tháng xuống vài ngày."],
      when: ["Trích xuất thông tin từ văn bản tự do, phân loại ít dữ liệu nhãn, tóm tắt, sinh nội dung, trợ lý hội thoại."],
      whenNot: ["Tính toán số học chính xác hoặc logic nghiệp vụ cố định: dùng code.", "Khối lượng cực lớn, tác vụ đơn giản mà một mô hình nhỏ đã tinh chỉnh làm tốt với chi phí thấp hơn nhiều."],
      example: {
        domain: "Bảo hiểm",
        title: "Trích xuất thông tin từ hồ sơ bồi thường",
        text: "LLM đọc biên bản tai nạn dạng văn bản tự do và trả về JSON gồm ngày, địa điểm, biển số, mô tả thiệt hại. Hệ thống kiểm tra JSON theo schema rồi đưa vào quy trình duyệt, giảm thời gian nhập liệu thủ công."
      },
      code: { lang: "python", src: `import anthropic, json
client = anthropic.Anthropic()          # đọc ANTHROPIC_API_KEY từ biến môi trường
msg = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    system="Bạn trích xuất dữ liệu từ biên bản bồi thường. Chỉ trả về JSON hợp lệ.",
    messages=[{"role": "user", "content":
        "Trả về JSON với các khoá ngay, dia_diem, bien_so, thiet_hai.\\n\\n" + claim_text}],
)
data = json.loads(msg.content[0].text)` },
      pitfalls: ["Không kiểm tra đầu ra (schema validation).", "Đưa dữ liệu nhạy cảm vào prompt khi chưa có thoả thuận xử lý dữ liệu.", "Không đo lường nên không biết thay đổi prompt tốt hơn hay tệ hơn."],
      tools: ["Anthropic API", "OpenAI API", "Hugging Face", "Ollama / vLLM (mô hình mở)", "Pydantic"],
      resources: [
        ["Anthropic — Prompt engineering overview", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"],
        ["Prompt Engineering Guide", "https://www.promptingguide.ai/"]
      ]
    },
    {
      id: "rag", title: "RAG: Retrieval-Augmented Generation", level: 3, hours: 12,
      summary: "Cho LLM trả lời dựa trên tài liệu của bạn: chunking, embedding, vector DB, hybrid search, reranking, trích dẫn.",
      concept: "Quy trình: (1) chia tài liệu thành đoạn (chunk) có chồng lấn, (2) tạo embedding và lưu vào vector database, (3) khi có câu hỏi, truy xuất top-k đoạn liên quan (thường kết hợp BM25 và vector, sau đó rerank), (4) đưa các đoạn vào prompt để LLM trả lời có trích dẫn nguồn. Chất lượng phụ thuộc chủ yếu vào khâu truy xuất.",
      why: [
        "Kiến thức luôn cập nhật mà không cần huấn luyện lại mô hình.",
        "Có trích dẫn nguồn, phục vụ kiểm toán và giảm bịa đặt (hallucination).",
        "Kiểm soát quyền truy cập theo tài liệu."
      ],
      when: ["Chatbot hỏi đáp tài liệu nội bộ, chính sách, sản phẩm; hỗ trợ khách hàng; tra cứu pháp lý, y khoa."],
      whenNot: ["Muốn thay đổi giọng văn, định dạng, hành vi của mô hình: đó là việc của prompt hoặc fine-tuning.", "Tổng hợp trên toàn bộ kho tài liệu (ví dụ 'đếm tất cả hợp đồng hết hạn'): dùng truy vấn dữ liệu có cấu trúc."],
      example: {
        domain: "Nhân sự",
        title: "Trợ lý chính sách công ty",
        text: "500 trang sổ tay nhân viên, quy chế lương, nghỉ phép được chia đoạn và đánh chỉ mục. Nhân viên hỏi 'nghỉ phép năm còn lại có được cộng dồn sang năm sau không' và nhận câu trả lời kèm trích dẫn điều khoản. Bộ phận nhân sự giảm đáng kể số câu hỏi lặp lại."
      },
      code: { lang: "python", src: `# RAG tối giản với sentence-transformers + numpy (thay bằng vector DB khi mở rộng)
chunks = split_into_chunks(handbook_text, size=800, overlap=120)
E = embedder.encode(["passage: " + c for c in chunks], normalize_embeddings=True)

def answer(question, k=4):
    q = embedder.encode("query: " + question, normalize_embeddings=True)
    top = np.argsort(-(E @ q))[:k]
    context = "\\n\\n".join(f"[{i}] {chunks[i]}" for i in top)
    prompt = (f"Chỉ dựa vào tài liệu dưới đây để trả lời, trích dẫn [số]. "
              f"Nếu không có thông tin, nói không biết.\\n\\n{context}\\n\\nCâu hỏi: {question}")
    return llm(prompt)` },
      pitfalls: ["Chunk quá nhỏ mất ngữ cảnh, quá lớn gây nhiễu.", "Không đánh giá riêng khâu truy xuất (recall@k).", "Không cho mô hình quyền nói 'không biết'."],
      tools: ["pgvector", "Qdrant", "Weaviate", "Chroma", "LlamaIndex", "LangChain", "Ragas"],
      resources: [
        ["Anthropic — Contextual Retrieval", "https://www.anthropic.com/news/contextual-retrieval"],
        ["Databricks — RAG vs Fine-tuning", "https://www.databricks.com/blog/rag-vs-fine-tuning"]
      ]
    },
    {
      id: "finetuning", title: "Fine-tuning LLM (LoRA, QLoRA)", level: 3, hours: 10,
      summary: "Huấn luyện tiếp mô hình trên dữ liệu của bạn để thay đổi hành vi, định dạng, hoặc chưng cất sang mô hình nhỏ.",
      concept: "Full fine-tuning cập nhật mọi tham số, rất tốn kém. PEFT như LoRA chỉ học các ma trận hạng thấp bổ sung (thường dưới 1% tham số); QLoRA kết hợp lượng tử hoá 4-bit để tinh chỉnh mô hình vài tỉ tham số trên một GPU. Dữ liệu là cặp (chỉ dẫn, câu trả lời mong muốn), chất lượng quan trọng hơn số lượng. Preference tuning (DPO) dạy mô hình ưu tiên câu trả lời tốt hơn.",
      why: ["Giữ ổn định định dạng, giọng văn, quy trình mà prompt không giữ được.", "Chưng cất: mô hình nhỏ đã tinh chỉnh có thể thay mô hình lớn cho một tác vụ hẹp, giảm chi phí và độ trễ."],
      when: ["Khối lượng gọi lớn cho một tác vụ cố định; yêu cầu định dạng nghiêm ngặt; ngôn ngữ chuyên ngành; triển khai tại chỗ vì yêu cầu bảo mật."],
      whenNot: ["Muốn mô hình 'biết' tài liệu thường xuyên thay đổi: dùng RAG.", "Chưa thử prompt engineering và RAG kỹ lưỡng.", "Không có bộ đánh giá để so sánh trước và sau."],
      example: {
        domain: "Pháp lý",
        title: "Soạn tóm tắt hợp đồng theo mẫu công ty",
        text: "Hệ thống kết hợp: RAG cung cấp điều khoản liên quan, còn một mô hình mở 8B đã tinh chỉnh LoRA trên khoảng 3.000 bản tóm tắt do luật sư viết đảm bảo đúng cấu trúc và thuật ngữ nội bộ. Đây là mô hình lai mà nhiều nhóm sử dụng: fine-tune cho hành vi, RAG cho kiến thức."
      },
      code: { lang: "python", src: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM
base = AutoModelForCausalLM.from_pretrained(BASE_MODEL, load_in_4bit=True, device_map="auto")
cfg = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                 target_modules=["q_proj", "k_proj", "v_proj", "o_proj"], task_type="CAUSAL_LM")
model = get_peft_model(base, cfg)
model.print_trainable_parameters()     # thường < 1% tổng tham số
# Huấn luyện bằng TRL SFTTrainer trên dữ liệu (instruction, response)` },
      pitfalls: ["Dữ liệu huấn luyện chứa lỗi thì mô hình học luôn lỗi.", "Catastrophic forgetting: mô hình kém đi ở kỹ năng chung.", "Rò rỉ dữ liệu đánh giá vào tập huấn luyện."],
      tools: ["Hugging Face TRL", "PEFT", "Unsloth", "Axolotl", "bitsandbytes"],
      resources: [["Hugging Face — PEFT docs", "https://huggingface.co/docs/peft/"]]
    },
    {
      id: "agents-eval", title: "AI Agents và đánh giá hệ thống LLM", level: 3, hours: 10,
      summary: "Agent dùng công cụ nhiều bước, MCP, guardrails; đánh giá bằng bộ test, LLM-as-judge và quan sát vận hành.",
      concept: "Agent là vòng lặp: LLM lập kế hoạch, gọi công cụ (tìm kiếm, SQL, API), đọc kết quả rồi quyết định bước tiếp theo đến khi hoàn thành. Model Context Protocol (MCP) chuẩn hoá cách kết nối công cụ và dữ liệu. Đánh giá là phần bắt buộc: bộ câu hỏi chuẩn (golden set) có đáp án, metric tự động (độ chính xác, faithfulness, context recall), LLM-as-judge có hiệu chỉnh với đánh giá của người, và theo dõi trace khi vận hành. Guardrails: kiểm tra đầu vào và đầu ra, giới hạn quyền của công cụ, người duyệt cho hành động quan trọng.",
      why: ["Tự động hoá quy trình nhiều bước, không chỉ trả lời câu hỏi.", "Không có đánh giá thì mọi thay đổi prompt hay mô hình đều là đoán mò."],
      when: ["Tác vụ cần tra cứu nhiều nguồn và thao tác hệ thống: phân tích dữ liệu bằng ngôn ngữ tự nhiên, xử lý ticket, nghiên cứu."],
      whenNot: ["Quy trình cố định, có thể viết thành workflow xác định: đơn giản, rẻ và dễ kiểm soát hơn agent.", "Hành động không thể hoàn tác mà không có người duyệt."],
      example: {
        domain: "Phân tích dữ liệu",
        title: "Trợ lý hỏi đáp dữ liệu bằng tiếng Việt (text-to-SQL)",
        text: "Người quản lý hỏi 'doanh thu tháng 8 theo miền so với cùng kỳ'. Agent đọc schema, viết SQL chỉ đọc, chạy, kiểm tra kết quả, vẽ biểu đồ. Bộ 200 câu hỏi có đáp án chuẩn được chạy lại mỗi khi thay đổi prompt hoặc mô hình."
      },
      code: { lang: "python", src: `tools = [{
    "name": "run_sql",
    "description": "Chạy truy vấn SELECT chỉ đọc trên kho dữ liệu bán hàng",
    "input_schema": {"type": "object",
                     "properties": {"query": {"type": "string"}}, "required": ["query"]},
}]
# Vòng lặp agent: gửi messages + tools, nếu stop_reason == "tool_use" thì chạy tool,
# gửi tool_result trở lại, lặp đến khi mô hình trả lời cuối cùng.

# Đánh giá hồi quy
results = [grade(agent(q["question"]), q["expected"]) for q in golden_set]
print("Độ chính xác:", np.mean(results))` },
      pitfalls: ["Cho agent quyền ghi hoặc xoá trên hệ thống thật khi chưa có kiểm soát.", "Chỉ đánh giá bằng vài ví dụ thủ công."],
      tools: ["Anthropic Agent SDK", "MCP", "LangGraph", "DeepEval", "Ragas", "Langfuse", "Arize Phoenix"],
      resources: [
        ["Anthropic — Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents"],
        ["Model Context Protocol", "https://modelcontextprotocol.io/"]
      ]
    }
  ]
}
);
