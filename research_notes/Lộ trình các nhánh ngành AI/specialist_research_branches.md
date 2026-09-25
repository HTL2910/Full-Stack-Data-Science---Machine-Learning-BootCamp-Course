# Specialist and Research-Oriented AI Career Branches (2025–2026)

Scope: Computer Vision (CV), NLP/Speech, Recommender systems / search & ranking, Research Scientist vs Research Engineer vs Applied Scientist, and emerging roles (AI evals/safety, AI PM, edge/embedded AI, robotics foundation models). Audience: a Vietnamese learner on a DS/ML roadmap whose main goal is to direct, verify and critique AI coding assistants.

Method note: arxiv.org and karpathy.github.io were blocked by the egress proxy during this session, so paper figures come from search-result snippets, publisher pages (ACM, T&F, ScienceDirect), GitHub READMEs and company blogs. Anything drawn from my background knowledge and not checked in this session is labeled "(background, not verified this session)" and kept in Inferences or Gaps, not in Cited Findings.

---

## 1. Per-branch scope, skills, tools, datasets and portfolio projects (CV, NLP/Speech, RecSys)

### Takeaway
All three branches share the same core (Python, PyTorch, linear algebra, probability, optimization, train/val/test discipline). The difference is the data type and the evaluation metric: CV works with pixels and uses mAP/IoU; NLP/Speech works with tokens and audio and uses F1/EM/WER; RecSys works with sparse user–item interactions, the two-stage "retrieve then rank" design and ranking metrics (NDCG, Recall@K), and it is judged in the end by online A/B tests. RecSys is the branch most tied to direct business impact. CV and NLP/Speech are most affected by foundation models: fine-tuning pretrained models has largely replaced training from scratch.

### Cited Findings

**Recommender systems / search & ranking**
- YouTube's 2016 paper (Covington, Adams, Sargin, RecSys 2016) splits the system into a deep **candidate generation** network that retrieves hundreds of candidates from the corpus and a separate deep **ranking** network. This is the classic two-stage IR design that underlies today's "two-tower + ranker" stacks — [ACM DL](https://dl.acm.org/doi/10.1145/2959100.2959190); [The Morning Paper summary](https://blog.acolyer.org/2016/09/19/deep-neural-networks-for-youtube-recommendations/)
- YouTube ranked by **watch time rather than CTR**, because ranking by CTR promotes "clickbait" videos that users don't finish. It also fed "example age" in as a training feature and set it to 0 at serving time to correct a bias toward the past — [The Morning Paper](https://blog.acolyer.org/2016/09/19/deep-neural-networks-for-youtube-recommendations/)
- Pinterest **PinSage** (KDD 2018) is a random-walk-based GCN on a graph of **3 billion nodes and 18 billion edges** (about 2B pins and 1B boards), which the authors describe as about 10,000x larger than typical GCN applications. It combines graph structure with visual and text features — [Pinterest Engineering blog](https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48); [Paper PDF (Stanford)](https://cs.stanford.edu/people/jure/pubs/pinsage-kdd18.pdf)
- PinSage produced **25–30% improvements in user engagement** in A/B tests over previous deep learning approaches, and a **25% increase in impressions** for Shop the Look. It powers related pins, ads and shopping — [Pinterest Engineering blog](https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48); [VentureBeat](https://venturebeat.com/ai/pinterest-labs-created-a-graph-convolutional-network-for-better-pin-recommendations)
- **Netflix (2015, older data):** the recommender drove about **80% of hours streamed**, and Netflix valued personalization plus recommendation at about **US$1 billion per year** — Gomez-Uribe & Hunt, ACM TMIS 6(4) — [ACM DL](https://dl.acm.org/doi/10.1145/2843948); figures as quoted by [New America case study](https://www.newamerica.org/insights/why-am-i-seeing-this/case-study-netflix/)
- **TikTok/ByteDance Monolith** (ORSUM@RecSys 2022) is a real-time recommender with **online training**. It uses a collisionless embedding hash table (Cuckoo HashMap), expirable embeddings and frequency filtering to reduce memory, and it deliberately trades some system reliability for real-time learning. The motivation is that batch-training frameworks keep training and serving apart, so the model cannot react to user feedback in real time — [arXiv 2209.07663](https://arxiv.org/abs/2209.07663); [CEUR-WS PDF](https://ceur-ws.org/Vol-3303/paper8.pdf)

**Computer Vision**
- **Google diabetic retinopathy (Gulshan et al., JAMA 2016;316(22):2402–2410):** for referable DR, **AUC 0.991** (95% CI 0.988–0.993) on EyePACS-1 and **AUC 0.990** (0.986–0.995) on Messidor-2, comparable to board-certified ophthalmologists — [Review of Ophthalmology](https://www.reviewofophthalmology.com/article/machine-learning-for-diabetic-retinopathy); [Google Research PDF](https://research.google.com/pubs/archive/45732.pdf)
- **The same system deployed in Thailand (Beede et al., CHI 2020):** fieldwork ran at **11 clinics** (Pathum Thani, Chiang Mai) from November 2018 to August 2019. The system rejected **about 21% of roughly 1,840 images** as ungradable, mostly because of poor clinic lighting. Workflows varied between clinics and internet connections were unreliable. When an image was rejected, nurses sometimes used their own judgment to send patients home — [ACM DL (CHI '20)](https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376718); [TechCrunch](https://techcrunch.com/2020/04/27/google-medical-researchers-humbled-when-ai-screening-tool-falls-short-in-real-life-testing/)
- A later prospective study of real-time DR screening by deep learning in a multisite national screening programme appeared in The Lancet Digital Health (2022) — [Lancet Digital Health](https://www.thelancet.com/journals/landig/article/PIIS2589-7500(22)00017-6/fulltext) (headline numbers not extracted this session)
- **Waymo perception/driving stack outcome (2025 peer-reviewed):** Kusano et al., Traffic Injury Prevention 26(sup1):S8–S20, covering **56.7 million rider-only miles** through January 2025. It found an **85% reduction in suspected-serious-injury+ crashes** (95% CI 39–99%) versus human benchmarks, with 100% in Phoenix and 76% in San Francisco — [Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/15389588.2025.2499887); [Waymo research page](https://waymo.com/research/comparison-of-waymo-rider-only-crash-rates-by-crash-type-to-human-benchmarks/)
- Waymo's own safety hub reports ~82% fewer injury crashes and ~83% fewer airbag-deployment crashes; later updates cite larger mileage (170M+ and 270M miles). These are company-reported running figures and change over time — [Waymo Safety Impact](https://waymo.com/safety/impact/); [Waymo blog May 2025](https://waymo.com/blog/2025/05/waymo-making-streets-safer-for-vru/)

**NLP / Speech**
- **Whisper (OpenAI, Dec 2022):** trained on **680,000 hours** of multilingual and multitask weakly supervised web data. It is robust to accents, noise and technical language, and zero-shot it is often competitive with fully supervised models without fine-tuning. It supports multilingual transcription and X→English translation — [OpenAI "Introducing Whisper"](https://openai.com/index/whisper/); [alphaXiv 2212.04356](https://www.alphaxiv.org/abs/2212.04356)
- **PhoWhisper (VinAI, ICLR 2024 Tiny Papers):** Whisper fine-tuned on an **844-hour** Vietnamese dataset with diverse accents (private data covering about 26K speakers in 63 provinces). It comes in 5 sizes (tiny to large), is usable via Hugging Face `transformers` and `openai-whisper`, and reports state-of-the-art Vietnamese ASR — [arXiv 2406.02555](https://arxiv.org/abs/2406.02555); [GitHub](https://github.com/VinAIResearch/PhoWhisper/blob/main/README.md); [HF model](https://huggingface.co/vinai/PhoWhisper-large)
- **PhoBERT (VinAI):** base (135M parameters) and large (370M), pretrained on 20GB of Wikipedia and news. PhoBERT-base-v2 adds 120GB from OSCAR-2301. **Input must be word-segmented with VnCoreNLP RDRSegmenter**, the tool used on the pretraining corpus. It claims SOTA on POS tagging, dependency parsing, NER and NLI — [GitHub VinAIResearch/PhoBERT](https://github.com/VinAIResearch/PhoBERT)

### Inferences
(Tool lists, learning order and projects below are my synthesis for curriculum design. Reference links point to canonical homes and were not fetched this session.)

**Computer Vision engineer**
- *Scope/tasks:* classification, detection, segmentation, OCR/document AI, tracking, medical imaging, industrial defect inspection, video analytics. In 2025–26 the work is mostly fine-tuning and adapting pretrained backbones (ViT/DINOv2, CLIP, SAM, YOLO family) plus a lot of data and labeling work.
- *Math beyond the core:* convolution as linear operation, image geometry (homography, camera models) for 3D/AR/robotics, IoU/NMS, and the basics of attention for ViT.
- *Learning order:* (1) OpenCV and image basics (color spaces, filtering, augmentations) → (2) CNNs from scratch in PyTorch (CS231n: https://cs231n.stanford.edu/) → (3) transfer learning with timm/torchvision → (4) detection and segmentation (Ultralytics YOLO: https://github.com/ultralytics/ultralytics; SAM: https://github.com/facebookresearch/segment-anything) → (5) ViT/CLIP/VLMs → (6) deployment (ONNX/TensorRT) and monitoring for drift.
- *Benchmarks:* ImageNet, COCO (mAP@[.5:.95]), Pascal VOC, ADE20K, Cityscapes; for medical, EyePACS and Messidor (DR case above).
- *Portfolio projects:* (a) defect detection on a public industrial dataset (e.g., MVTec AD), with a confusion analysis per defect type; (b) Vietnamese OCR, for example receipts or ID-card style documents using **synthetic** data only (never real IDs), with a detector and a recognizer; (c) fine-tune YOLO on a custom dataset, report COCO-style mAP, then export to ONNX and measure latency on CPU; (d) a "lab vs field" robustness study: evaluate a model on degraded images (blur, low light) to mirror the Thailand DR lesson.

**NLP / Speech engineer**
- *Scope/tasks:* classification, NER, QA/RAG, summarization, MT, ASR, TTS, speaker diarization. Since 2023 much of this has merged into "LLM engineering" (prompting, RAG, fine-tuning with LoRA, evals). Classic NLP skills remain valuable for low-resource languages such as Vietnamese.
- *Math beyond the core:* information theory (cross-entropy, perplexity), sequence models and attention, CTC and seq2seq for ASR, and signal processing basics (STFT, mel spectrograms).
- *Learning order:* tokenization (BPE/SentencePiece; Vietnamese word segmentation) → embeddings → Transformers (CS224n: https://web.stanford.edu/class/cs224n/) → Hugging Face `transformers`/`datasets`/`evaluate` → fine-tuning PhoBERT/ViT5 → LLM fine-tuning (PEFT/LoRA) and RAG → speech (Whisper/PhoWhisper, WER/CER) → evaluation design.
- *Benchmarks:* GLUE/SuperGLUE (older), MMLU and similar LLM benchmarks (with contamination caveats, see §6), LibriSpeech and Common Voice for ASR. For Vietnamese, see §5.
- *Portfolio projects:* (a) Vietnamese hate-speech or sentiment classifier (UIT-ViHSD/UIT-VSFC) comparing PhoBERT (with correct segmentation) against multilingual XLM-R; (b) Vietnamese RAG QA over a document set, with an eval set and a report of faithfulness errors; (c) fine-tune Whisper-small/PhoWhisper on an accent or domain slice and report WER by region or accent; (d) small Vietnamese summarization with ViT5, reporting ROUGE plus human evaluation.

**RecSys / search & ranking engineer**
- *Scope/tasks:* candidate retrieval (two-tower, ANN search), ranking (GBDT/LambdaMART, deep CTR models such as DLRM, DCN), re-ranking for diversity and business rules, feature pipelines, online A/B testing, cold start, feedback loops. E-commerce, ads, feed and search companies hire heavily, including Shopee, Tiki, Lazada, Zalo, MoMo and VNG in the Vietnamese market (background, not verified this session).
- *Math beyond the core:* matrix factorization, implicit feedback losses (BPR, sampled softmax), learning-to-rank (pointwise, pairwise, listwise; LambdaMART), approximate nearest neighbor (FAISS: https://github.com/facebookresearch/faiss), causal inference and statistics for A/B tests, position/exposure bias.
- *Learning order:* popularity baselines → item-item collaborative filtering → matrix factorization (implicit ALS) → learning-to-rank with LightGBM `lambdarank` → two-tower retrieval plus FAISS → deep ranking (DLRM/DCN) → sequence recommenders (SASRec/BERT4Rec) → online and real-time systems (Monolith) → A/B testing and metrics.
- *Benchmarks:* MovieLens, Amazon Reviews, Criteo (CTR), MS MARCO (search ranking), Yelp.
- *Portfolio projects:* (a) MovieLens two-stage system (two-tower retrieval + LightGBM LambdaMART ranker) with a **time-based split** and NDCG@10/Recall@100 against a popularity baseline; (b) a semantic search engine (bi-encoder + FAISS + cross-encoder re-ranker) evaluated on MS MARCO subsets or a hand-labeled Vietnamese query set; (c) an offline A/B simulation that shows how position bias inflates CTR; (d) a cold-start study using content features (PinSage-style idea: combine graph and content).

**Shared learner insight:** for someone whose main goal is to *direct and critique AI coding assistants*, the most transferable skill across all three branches is **evaluation design**: correct splits, the right metric, and baselines. The case studies show the same pattern each time: offline metrics (AUC 0.99) did not guarantee field success (21% ungradable images), and CTR was the wrong objective at YouTube.

### Gaps
- Could not fetch the Gulshan 2016 sensitivity/specificity numbers directly (commonly quoted as ~97.5%/93.4% on EyePACS-1 at the high-sensitivity point). The search snippet did not confirm them, so only the AUCs are cited.
- No verified 2025–26 job-posting counts split by CV vs NLP vs RecSys were found.
- No verified public outcome numbers for Tesla's vision-only perception stack. Tesla does not publish peer-reviewed crash comparisons comparable to Waymo's.
- The YouTube 2016 paper's quantitative gains were not extracted.

---

## 2. Research Scientist vs Research Engineer vs Applied Scientist

### Takeaway
At frontier labs, **Research Scientist (RS)** remains mostly a PhD plus top-venue publications track with extremely low acceptance rates. **Research Engineer (RE)** does not require a PhD, has roughly 2–5x higher acceptance, and has 2–4x more openings. It rewards strong engineering plus demonstrated research output such as reproductions, open-source work or workshop papers. **Applied Scientist** (Amazon/Microsoft title) sits between the two: it applies ML to product problems, and a Master's or PhD is typical. For a Vietnamese learner without a PhD, **RE or ML Engineer is the realistic door**. RS is realistic only through a PhD or a sustained publication record.

### Cited Findings
- For RS roles at frontier labs, a PhD remains the dominant credential, but it is not universal. OpenAI's RS listing reportedly asks only for "a track record of coming up with new ideas in machine learning" and optionally "past experience creating high-performance implementations" — [Sundeep Teki](https://www.sundeepteki.org/advice/research-engineer-vs-research-scientist-at-frontier-ai-labs); [DeepSun AI Substack](https://deepsunai.substack.com/p/research-engineer-vs-research-scientist)
- Claimed hiring stats (secondary source, not primary data): **RS acceptance below 0.5%** at frontier labs; RE acceptance roughly **2–5x higher**; RE roles outnumber RS roles by **2–4x** at most labs — [Sundeep Teki](https://www.sundeepteki.org/advice/research-engineer-vs-research-scientist-at-frontier-ai-labs) / [techinterview](https://www.techinterview.org/post/3233474924/research-scientist-vs-research-engineer-track/) (career-advice blogs; treat as indicative)
- The same source's guidance: with a strong PhD and publications at NeurIPS/ICML/ICLR/ACL, RS is the natural lane. With a Master's or a PhD in a less relevant field, RE is the higher-probability entry point, with a path toward research over time. "You do not need a PhD [for RE] — you need demonstrated research output" — [DeepSun AI](https://deepsunai.substack.com/p/research-engineer-vs-research-scientist); [jobsbyculture 2026](https://jobsbyculture.com/blog/becoming-ai-research-engineer-2026)
- RS role description: designs experiments, writes papers, shapes the technical direction of the lab. Most have PhDs in ML or related fields (math, physics, theory CS, computational neuroscience), or equivalent industry research track records — [DeepSun AI](https://deepsunai.substack.com/p/research-engineer-vs-research-scientist)
- Example of a non-traditional path: John Schulman (OpenAI co-founder) is often cited, though he did hold a PhD (UC Berkeley) — [Wikipedia](https://en.wikipedia.org/wiki/John_Schulman). A 2026 recruiting guide on hiring ML research engineers and scientists exists — [Recruiting from Scratch](https://www.recruitingfromscratch.com/blog/how-to-hire-an-ml-research-engineer-or-research-scientist-2026)

### Inferences
- **Role comparison (synthesis):**
  | | Research Scientist | Research Engineer | Applied Scientist / MLE |
  |---|---|---|---|
  | Main output | Papers, new methods, research agenda | Scalable training/eval infrastructure, experiment implementation, reproductions | Models shipped in products, measured by online metrics |
  | Degree | PhD typical | BS/MS plus strong engineering | MS/PhD common (Amazon AS); MLE is BS/MS |
  | Proof of competence | First-author papers at NeurIPS/ICML/ICLR/ACL/CVPR | Open-source contributions, paper reproductions, performance work (CUDA, distributed training) | Portfolio with business impact, system design |
  | Math depth | Deep (optimization, probability, theory) | Solid (must debug numerics, scaling) | Solid applied (stats, experimentation) |
- **How people enter:** PhD → RS; SWE or MLE → RE via internal transfer or open-source; residency and fellowship programs (e.g., AI safety fellowships, Google/Meta residencies historically) are bridges; Vietnamese researchers have historically entered via VinAI residency → PhD abroad (background, not verified this session).
- **Paper-reading workflow (synthesis of common practice):** three passes: (1) title, abstract, figures and conclusion; (2) method and experiments, focusing on baselines, datasets, splits and ablations; (3) reproduce the key table from official code, or re-implement a minimal version. Keep a log with columns *claim / evidence / weakness*. Critique checklist: are the baselines tuned equally? Is there test-set tuning? Are variance and seeds reported? Is the benchmark contaminated?
- **Which branches need a Master's/PhD:** RS at labs and top research groups needs a PhD in practice. Research-heavy CV/NLP roles such as VinAI-style research labs and publication-oriented roles strongly prefer MS/PhD. Applied CV/NLP engineering, RecSys engineering, MLE, evals engineering, edge AI deployment and AI PM are accessible through a portfolio plus experience.

### Gaps
- No primary data (from the labs themselves) on RS vs RE acceptance rates. The <0.5% and 2–5x figures come from career-advice blogs.
- Could not verify Amazon's official Applied Scientist degree requirements this session.
- Could not fetch Karpathy's "A Recipe for Training Neural Networks" (the domain was blocked), so it is not cited as a source.

---

## 3. Emerging roles: real demand vs hype (2025–2026)

### Takeaway
**AI evals engineering is the most clearly real and fast-growing new specialization**: evaluation skills appear in a large share of AI job postings, and frontier labs pay top-tier salaries for it. **Edge AI / inference optimization** shows steady, concrete demand from chip, auto and device makers (NVIDIA, Tesla, NXP, Qualcomm). **AI PM** is growing (postings roughly tripled from 2022 to 2025), but it requires prior product experience. **Robotics foundation models (VLAs)** are real R&D with open weights, but deployment is early and expensive. That is hype-adjacent for job seekers, and roles are concentrated in a few well-funded companies.

### Cited Findings

**AI evals / safety**
- Roughly **39.6% of AI-first job postings** list evaluation-related skills. Anthropic's "Research Engineer, Model Evaluations" is advertised at **US$500,000–850,000** per year, for a role that "barely existed as a titled job two years ago" — [jobsbyculture AI Evals career guide 2026](https://jobsbyculture.com/blog/ai-evals-engineer-career-guide-2026) (secondary; salary band should be checked against the live Anthropic posting)
- Driver: frontier model releases now come every few weeks rather than yearly, so teams need eval suites that tell them within an afternoon whether swapping in a new model helped. Applied-AI companies (Perplexity, Cursor, Harvey, Sierra, Decagon, Cognition) reportedly hire evals engineers among their first 10 technical staff. Stripe, Shopify and Databricks are building evals teams — [HeroHunt 2026](https://www.herohunt.ai/blog/how-to-recruit-ai-evals-engineers-2026/); [jobsbyculture](https://jobsbyculture.com/blog/ai-evals-engineer-career-guide-2026) (recruiter/blog sources)
- LinkedIn's 2026 Jobs on the Rise ranked **AI Engineer** as the #1 fastest-growing US job title, with postings up **143% YoY in 2025** — as reported by [365 Data Science](https://365datascience.com/career-advice/career-guides/ai-engineer-job-outlook-2025/) / [futureproofing.dev](https://www.futureproofing.dev/resources/ai-talent-gap/ai-engineer-demand-2026) (secondary report of LinkedIn data)

**AI product manager**
- Job postings explicitly requiring AI PM experience **roughly tripled from 2022 to 2025**. AI PM roles are about **8–10% of open PM positions**, nearly half of them US-based — [Axial Search, 12,400 postings](https://axialsearch.com/insights/ai-product-jobs)
- The most-requested skill in AI product postings is Agile (**29%**), followed by foundation models (**19%**). Most postings ask for a technical degree and about **7 years** of experience — [Axial Search](https://axialsearch.com/insights/ai-product-jobs)
- "Evals are replacing PRDs as the AI PM's core artifact"; the ability to write good evals is described as the defining AI PM skill of 2025 — [Axial Search](https://axialsearch.com/insights/ai-product-jobs); [Ant Murphy](https://antmurphy.medium.com/how-product-is-changing-in-2026-78a08f150aca)

**Edge / embedded AI**
- Live 2026 postings: NVIDIA "Deep Learning Software Engineer, TensorRT Performance – New College Grad 2026" — [NVIDIA jobs](https://jobs.nvidia.com/careers/job/893394114012); Tesla "AI Engineer, ML Inference Optimization" — [Tesla Careers](https://www.tesla.com/careers/search/job/ai-engineer-ml-inference-optimization-tesla-ai-255357); NXP "Senior Quantization Engineer – Edge AI Model Optimization" — [NXP Workday](https://nxp.wd3.myworkdayjobs.com/en-US/careers/job/Senior-Quantization-Engineer----Edge-AI-Model-Optimization_R-10063480)
- Skills repeatedly listed: TensorRT and ONNX Runtime, INT8/INT4 post-training quantization and calibration, quantization-aware training, pruning, distillation, TFLite, Qualcomm SNPE, C++ and CUDA — [PropelGrad Edge AI](https://propelgrad.com/ai-jobs/edge-ai-engineer); [ZipRecruiter listing aggregate](https://www.ziprecruiter.com/Jobs/The-Edge-Ai)
- Claimed entry-level edge AI salaries of **US$110K–165K** at Qualcomm, Apple, Google, NVIDIA, ARM and Samsung — [PropelGrad](https://propelgrad.com/ai-jobs/edge-ai-engineer) (aggregator; indicative)
- Qualcomm acquired **MovianAI**, VinAI's former generative AI division, on **1 April 2025** to strengthen on-device AI for phones, PCs and vehicles. Terms were not disclosed — [TechCrunch](https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai); [Edge AI & Vision Alliance](https://www.edge-ai-vision.com/2025/04/qualcomm-expands-generative-ai-capabilities-with-acquisition-of-vinai-division/)

**Robotics foundation models**
- NVIDIA **GR00T N1** (March 2025) is an open foundation model for generalist humanoid robots with public weights for fine-tuning. The series has continued through N1.5, N1.6 and N1.7 — [arXiv 2503.14734](https://arxiv.org/abs/2503.14734); [Pebblous comparison](https://blog.pebblous.ai/report/vla-architecture-comparison/en/)
- **Gemini Robotics** and Gemini Robotics-ER launched in March 2025. Gemini Robotics ER 2 was reportedly announced on 30 July 2026, with developer access via the Gemini API — [Wikipedia: Gemini Robotics](https://en.wikipedia.org/wiki/Gemini_Robotics)
- Physical Intelligence **π0/π0.5** is a partly open VLA — [Pebblous](https://blog.pebblous.ai/report/vla-architecture-comparison/en/); [MarkTechPost 2026](https://www.marktechpost.com/2026/04/28/top-10-physical-ai-models-powering-real-world-robots-in-2026/)
- Reality check from 2026 landscape summaries: "foundation models are working, but they're still clunky; humanoids are deployed, but they're expensive" — [Humanoid Hub](https://humanoid-world.com/en/foundation-models/) (industry summary)

### Inferences
- **Real vs hype ranking for a newcomer (2025–26):** (1) Evals: real, portfolio-accessible, and aligned with the learner's goal of verifying AI output. (2) Edge AI: real, niche, needs C++/hardware skills, and fits Vietnam's growing semiconductor and device outsourcing work (Qualcomm acquired a Vietnamese team). (3) AI PM: real, but usually needs prior PM or domain experience, so it is not an entry job. (4) Robotics FMs: real research, but hiring is concentrated in labs and well-funded startups and usually requires MS/PhD plus robotics hardware experience. For most learners it is a "watch and experiment" area (LeRobot, GR00T fine-tuning in simulation).
- **AI safety/alignment research** (interpretability, RLHF, red-teaming) sits closer to the RS/RE track (§2). Evals engineering is the most accessible safety-adjacent entry point.
- **Suggested portfolio projects:** Evals: build an eval harness for a Vietnamese QA/RAG system with a golden set, an LLM-as-judge validated against human labels, and regression tracking across two model versions. Edge: take a YOLO or PhoBERT model, export it to ONNX, quantize to INT8 and report the accuracy drop vs speedup on CPU or Jetson. AI PM: write an eval-driven spec for a feature, including a failure taxonomy. Robotics: fine-tune a small policy in simulation (LeRobot/Isaac) and report success rate over N seeds.

### Gaps
- The 39.6% evals-skill figure and the US$500K–850K Anthropic band come from secondary blogs; I did not verify them against a primary job-posting dataset or the live posting.
- No reliable 2025–26 job-count data was found for AI safety/alignment roles specifically, or for robotics-FM roles.
- The Gemini Robotics ER 2 (July 2026) date comes from Wikipedia and was not verified against a DeepMind primary post.

---

## 4. Case studies with measurable outcomes (summary table)

### Takeaway
The most instructive case studies pair a strong offline metric with a real-world outcome. Sometimes the outcome confirmed the metric (PinSage +25–30% engagement, Waymo −85% serious-injury crashes). Sometimes the outcome exposed a gap (Google DR: AUC 0.99 in the lab, 21% of images ungradable in Thai clinics).

### Cited Findings
| Branch | Case | Measured outcome | Source |
|---|---|---|---|
| CV / medical | Google DR (JAMA 2016) | AUC 0.991 (EyePACS-1), 0.990 (Messidor-2) | [Review of Ophthalmology](https://www.reviewofophthalmology.com/article/machine-learning-for-diabetic-retinopathy) |
| CV / deployment | Google DR in Thailand (CHI 2020) | 11 clinics; ~21% of ~1,840 images rejected as ungradable | [ACM](https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376718); [TechCrunch](https://techcrunch.com/2020/04/27/google-medical-researchers-humbled-when-ai-screening-tool-falls-short-in-real-life-testing/) |
| CV / autonomy | Waymo (Traffic Injury Prevention 2025) | 56.7M rider-only miles; −85% suspected-serious-injury+ crashes (CI 39–99%) | [T&F](https://www.tandfonline.com/doi/full/10.1080/15389588.2025.2499887) |
| Speech | Whisper (2022) | 680,000 h training data; competitive zero-shot | [OpenAI](https://openai.com/index/whisper/) |
| Speech / VN | PhoWhisper (2024) | 844 h Vietnamese fine-tuning data, 5 sizes | [arXiv](https://arxiv.org/abs/2406.02555) |
| RecSys | PinSage (KDD 2018) | 3B nodes / 18B edges; +25–30% engagement in A/B | [Pinterest Eng](https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48) |
| RecSys | Netflix (2015, older) | ~80% of hours streamed; ~US$1B/yr value | [ACM TMIS](https://dl.acm.org/doi/10.1145/2843948); [New America](https://www.newamerica.org/insights/why-am-i-seeing-this/case-study-netflix/) |
| RecSys | YouTube DNN (2016) | Two-stage design; watch-time objective beats CTR | [Morning Paper](https://blog.acolyer.org/2016/09/19/deep-neural-networks-for-youtube-recommendations/) |
| RecSys | TikTok Monolith (2022) | Real-time online training; collisionless embeddings | [arXiv](https://arxiv.org/abs/2209.07663) |

### Inferences
- Teaching point: split each case into **offline metric → online/field outcome → the gap and why**. This gives the learner the frame they need to critique AI-generated evaluation code.
- Netflix's 2015 figures are more than a decade old and should be presented as historical.

### Gaps
- No recent (2024–26) public Netflix, TikTok or YouTube numbers of comparable specificity were found.
- No numeric Tesla FSD outcome data from a peer-reviewed or independent source.

---

## 5. Vietnam-relevant ecosystem

### Takeaway
Vietnam has a real, publicly usable Vietnamese AI stack: VinAI's PhoBERT, PhoGPT and PhoWhisper, the UIT and VLSP datasets, and Viettel's sovereign LLM. The organizational landscape shifted in 2025: VinAI's generative AI division became part of Qualcomm (MovianAI). The large conglomerates (Viettel, FPT, VNPT, Vingroup) run AI centers, but their products mostly stay within their own ecosystems.

### Cited Findings
- **PhoBERT:** base 135M and large 370M parameters; 20GB pretraining data, with the v2 base adding 120GB of OSCAR; requires RDRSegmenter word segmentation — [GitHub](https://github.com/VinAIResearch/PhoBERT)
- **PhoGPT (2023):** PhoGPT-4B and PhoGPT-4B-Chat (3.7B parameters), pretrained from scratch on **102B Vietnamese tokens** (2 epochs, 482GB) with an **8,192** context length. The chat version was tuned on 70K instruction pairs plus 290K conversations. BSD-3-Clause license. The authors state it "is not good at tasks involving reasoning, coding or mathematics" — [GitHub VinAIResearch/PhoGPT](https://github.com/VinAIResearch/PhoGPT); [arXiv 2311.02945](https://arxiv.org/pdf/2311.02945)
- **PhoWhisper:** see §1; 844 hours; 5 sizes; on Hugging Face — [HF](https://huggingface.co/vinai/PhoWhisper-large)
- **VinAI → Qualcomm:** Qualcomm acquired MovianAI (VinAI's former GenAI division, led by Dr. Hung Bui, formerly of Google DeepMind) on 1 April 2025 — [TechCrunch](https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai); [TNGlobal](https://technode.global/2025/04/02/qualcomm-expands-generative-ai-capabilities-with-acquisition-of-vinai-division/)
- **Viettel AI:** developed **VT-Super-120B-A12B**, a 120B-parameter Vietnamese sovereign LLM (MoE, about 12B active parameters per the name) built on the NVIDIA Nemotron 3 Super architecture. Viettel claims it leads in accuracy among models of similar size — [Viettel AI news](https://viettelai.vn/en/tin-tuc/viettel-trains-120-billion-parameter-vietnamese-sovereign-ai-model) (company claim)
- **Ecosystem structure:** FPT, Viettel, VNPT and Vingroup run dedicated AI centers with substantial R&D budgets, but their products "largely remain confined within their own ecosystems" — [B-Company Vietnam AI landscape 2025](https://b-company.jp/vietnam-ai-landscape-2025-government-policy-key-players-and-startup-ecosystem/)
- **Datasets:** **UIT-ViQuAD** has 23,000+ QA pairs from 5,109 passages in 174 Wikipedia articles. **UIT-ViQuAD 2.0** (VLSP 2021 shared task) has 24,489 answerable and 11,501 unanswerable questions. **UIT-ViHSD** has 30,000 comments labeled CLEAN/OFFENSIVE/HATE. Others include ViNewsQA, UIT-VSFC (student feedback sentiment), UIT-VSMEC (emotion), UIT-ViIC and ViMMRC — [UIT NLP datasets](https://nlp.uit.edu.vn/datasets/); [VLSP 2021 MRC](https://vlsp.org.vn/vlsp2021/eval/mrc); [GitHub kietnv/VietnameseDatasets](https://github.com/kietnv/VietnameseDatasets)
- **Benchmarks:** VLUE (Vietnamese NLU benchmark) — [arXiv 2403.15882](https://arxiv.org/pdf/2403.15882); SMTCE (social media text classification benchmark) — [arXiv 2209.10482](https://arxiv.org/pdf/2209.10482)
- **ViT5:** a Vietnamese T5 encoder-decoder from VietAI (arXiv 2205.06457) is widely used for summarization (background; repo not fetched this session)

### Inferences
- Practical Vietnamese stack for learner projects: PhoBERT or XLM-R for classification and NER, ViT5 for generation and summarization, PhoWhisper for ASR, and a modern multilingual open LLM (Qwen/Llama/Gemma family) for chat and RAG. PhoGPT-4B is useful historically, but its stated weaknesses in reasoning and coding limit it.
- **Vietnamese-specific pitfall:** syllables are space-separated, but words are multi-syllable ("học sinh"). Feeding raw text into PhoBERT without RDRSegmenter silently degrades performance, and AI assistants often generate such code.
- Other names in the Vietnamese AI industry include Zalo AI (VNG), FPT AI/FPT Smart Cloud, VinBigData, VNPT AI and Viettel AI (background, not verified this session). Speech datasets commonly used are VIVOS (~15 h), VLSP ASR sets, Common Voice vi and FLEURS vi (background, not verified this session).

### Gaps
- No verified 2025–26 public model releases from **Zalo AI** or **FPT AI** on Hugging Face were found in search.
- No verified current status of **VinBigData** (it has previously run VinDr medical imaging datasets such as VinDr-CXR; not verified this session).
- VIVOS size and license were not verified this session.
- Viettel's accuracy-leadership claim is self-reported. No independent benchmark was found.

---

## 6. What a specialist must be able to critique in AI-generated code

### Takeaway
The recurring failure modes are **evaluation failures, not syntax failures**: leakage (split after augmentation, patient or user overlap, random rather than temporal splits), metric misuse (mAP definitions, WER without normalization, NDCG computed over the wrong candidate set), preprocessing mismatches between training and deployment, and benchmark contamination. The case studies are real examples of each.

### Cited Findings
- **Benchmark contamination (GSM1k, Scale AI):** a new hand-written grade-school math set in GSM8K style showed some model families scoring noticeably worse than on GSM8K. Mistral and Phi families showed consistent overfitting, while Gemini/GPT/Claude showed little. The drop correlated with how often a model regurgitated GSM8K items. **Magnitude conflict:** "up to 8 percentage points" per a survey citing Zhang et al. vs "as much as 13 points" per a blog summary (likely different paper versions) — [CapBencher (arXiv 2505.18102) citing Zhang et al.](https://arxiv.org/pdf/2505.18102); [Acing AI](https://acingai.com/articles/llm-evaluation-crisis); [awesome-data-contamination list](https://github.com/lyy1994/awesome-data-contamination)
- Contamination speeds up benchmark saturation: scores pile up near 100% and the benchmark stops separating models — [Survey on data contamination, arXiv 2502.14425](https://arxiv.org/html/2502.14425v2); [arXiv 2502.17521](https://arxiv.org/html/2502.17521v2)
- **Lab vs field distribution shift:** the Google DR model with AUC 0.99 rejected about 21% of real clinic images because of lighting and capture conditions — [ACM CHI '20](https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376718)
- **Wrong objective/metric:** CTR-based ranking promoted clickbait at YouTube, and watch time was chosen instead. Training-time bias toward the past was handled with an "example age" feature set to 0 at serving — [Morning Paper](https://blog.acolyer.org/2016/09/19/deep-neural-networks-for-youtube-recommendations/)
- **Preprocessing mismatch:** PhoBERT requires the same RDRSegmenter segmentation used during pretraining — [PhoBERT GitHub](https://github.com/VinAIResearch/PhoBERT)
- **Grader variability in reference labels** affects DR model evaluation (Krause et al., "Grader variability and the importance of reference standards…") — [arXiv 1710.01711](https://arxiv.org/pdf/1710.01711)

### Inferences
Checklist for reviewing AI-assistant code, by branch (synthesis):
- **CV:** (1) Is augmentation applied **only to the training split**, after splitting? (2) Are near-duplicate images, or images of the same patient, object or video, split by *group* (GroupKFold)? Frames from one video must not appear in both train and test. (3) Is the mAP definition stated (VOC mAP@0.5 vs COCO mAP@[.5:.95]) and compared like-for-like? (4) Do ImageNet normalization stats and resize/letterbox preprocessing match between training and ONNX/TensorRT inference? (5) Is accuracy used on an imbalanced defect or medical dataset where sensitivity/specificity or PR-AUC is needed? (6) Is the INT8-quantized model re-evaluated on the same test set?
- **NLP/Speech:** (1) Tokenizer or segmenter mismatch (PhoBERT and RDRSegmenter). (2) Is WER computed after consistent text normalization (case, punctuation, numbers, Vietnamese diacritics and tone-mark Unicode normalization NFC vs NFD)? Is CER also reported for Vietnamese? (3) Is the speaker or recording session split across train and test? (4) For LLM evals: contamination checks, test prompts leaking into few-shot examples, LLM-as-judge not validated against human labels, and a single-seed result with no confidence interval. (5) Are ROUGE or BLEU alone used for generative quality?
- **RecSys:** (1) A **random split instead of a temporal split** leaks the future. (2) Negative sampling at evaluation: is NDCG or HitRate computed against 100 sampled negatives instead of the full catalog? The numbers are then not comparable and can flip model rankings. (3) Are features computed with data after the prediction timestamp (target leakage via user aggregates)? (4) Does the popularity baseline exist? (5) Is position bias ignored when treating logged clicks as labels? (6) Is the offline NDCG gain presented as if it guaranteed an online A/B gain?
- **Cross-cutting:** hyperparameters tuned on the test set, missing seeds and variance, a metric that doesn't match the business objective, and no error analysis by slice (region, accent, lighting, device).

### Gaps
- No single authoritative source was found that quantifies how often AI coding assistants introduce leakage bugs specifically. This remains a practitioner observation, not a measured statistic.
- The sampled-metrics critique for RecSys (Krichene & Rendle, "On Sampled Metrics for Item Recommendation", KDD 2020) is background knowledge, not fetched this session.
