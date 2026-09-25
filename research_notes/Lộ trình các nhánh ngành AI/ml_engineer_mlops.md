# Machine Learning Engineer & MLOps / ML Platform Engineer — career branch notes (state as of Sep 2026)

> Research context: written for a Vietnamese learner on a Data Science & ML roadmap whose main goal is to understand the fundamentals well enough to **direct, verify and critique AI coding assistants**.
> Method note: many primary sites were blocked by the research proxy (uber.com, eng.lyft.com, engineering.grab.com, docs.cloud.google.com, evidentlyai.com, zenml.io, 365datascience.com, arxiv.org). Where a primary page could not be fetched, the figure below comes from the **search-engine snippet of that primary page**, and it is marked "(snippet)". Figures read directly from GitHub-hosted primary sources (Metaflow README, MLOps Zoomcamp README, Made With ML README, Chip Huyen's DMLS repo, a mirror of Google's "Rules of ML") are marked "(read directly)". Items marked **[older]** are from before 2023 and should be treated as history or fundamentals, not as the current state.

---

## 1. Definition and scope: ML Engineer vs MLOps/ML Platform Engineer vs Data Scientist vs AI Engineer

### Takeaway
An **ML Engineer (MLE)** owns getting *a specific model/use case* from data to a reliable production service: features, training, evaluation, serving, and iteration. An **MLOps / ML Platform Engineer** builds the *shared, reusable infrastructure* (pipelines, feature store, model registry, serving, monitoring, GPU compute) that many MLEs and data scientists use. A **Data Scientist** focuses on analysis, experimentation and modeling, with less production ownership. An **AI Engineer** (the 2023+ title) builds applications on top of *foundation models someone else trained* (prompting, RAG, agents, fine-tuning, evals). In practice the boundaries blur, and in 2025–2026 job postings increasingly expect MLEs to know MLOps.

### Cited Findings
- Chip Huyen's *AI Engineering* (O'Reilly, 2025) defines AI engineering as building applications on foundation models "made available as a service", in contrast to ML engineering, "which involves building and deploying models developed in-house". ML engineering involves "more tabular data annotations, feature engineering, and model training", while AI engineering involves "more prompt engineering, context construction, and parameter-efficient finetuning". She notes most real systems combine both. For example, a support chatbot uses a generative model plus locally trained classifiers or scorers. — [Wikipedia: Artificial intelligence engineering (summarising Huyen)](https://en.wikipedia.org/wiki/Artificial_intelligence_engineering); [Book repo chiphuyen/aie-book](https://github.com/chiphuyen/aie-book); [Huyen on X: "AI Engineering builds upon Machine Learning Systems Design, but with a focus on large scale, ready made models"](https://x.com/chipro/status/1782876713938280822)
- Chip Huyen's *Designing Machine Learning Systems* (DMLS, 2022) addresses "ML engineers, data scientists, data engineers, ML platform engineers, and engineering managers". Its motivating scenarios include "Each ML use case in your organization has been deployed using its own workflow, and you want to lay down the foundation (e.g., model store, feature store, monitoring tools) that can be shared and reused across use cases". That shared-foundation work is the ML platform role. — [chiphuyen/dmls-book README (read directly)](https://github.com/chiphuyen/dmls-book)
- DMLS ch.10: "ML platform is a team that has emerged recently as ML adoption matures… there are still disagreements on what an ML platform should consist of". The book focuses on three essentials: **deployment, model store, feature store**. It also covers the build-vs-buy decision. — [DMLS chapter summaries (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- Uber's 2017 description of the problem a platform solves: before Michelangelo, "it was not possible to train models larger than what would fit on data scientists' desktop machines", there was "neither a standard place to store the results of training experiments nor an easy way to compare one experiment to another", and "there was no established path to deploying a model into production". Each team built "a custom serving container". **[older, 2017]** — [Uber: Meet Michelangelo (snippet)](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/)
- Shopee (SEA e-commerce) platform-type postings: "Machine Learning Platform R&D Expert Engineer (Parameter Server Direction)" in the EGO team builds and optimises "distributed Parameter Server systems in C++ for large-scale sparse model training and inference" for search/ads/recommendation. Listed languages: Java, Python, Golang, C++. MLE postings ask for "solid understanding of data structures, algorithms, and basic machine learning principles". — [freehire: Shopee Expert Backend Engineer (ML Server Parameter) (snippet)](https://freehire.me/jobs/expert-backend-engineer-machine-learning-server-parameter-ego-team-shopee-6btl6g4a); [Shopee careers: Algo/ML Engineer (snippet)](https://careers.shopee.sg/job-detail/J00381154/1)
- Job-posting analysis (365 Data Science, ML Engineer outlook): in 2025 **Java (21%) overtook SQL (18%)** in MLE postings, interpreted as a shift toward production implementation. **Kubernetes (17.6%)** is the most requested MLOps tool, followed by **Docker (15.4%)**. — [365 Data Science: ML Engineer Job Outlook (snippet; page blocked)](https://365datascience.com/career-advice/career-guides/machine-learning-engineer-job-outlook-2025/)
- Axial Search analysis of 10,000+ AI/ML engineering posts (2026): 78% of positions target 5+ years of experience, and the median salary is $187,500 (US). The same search summary says "only 3% of ML engineer job postings are entry level, and 36% list a PhD as preferred", but I could not confirm which of the two sources (Axial or 365 Data Science) that sentence comes from. — [Axial Search: AI/ML Engineering Jobs in 2026 (snippet)](https://axialsearch.com/insights/ai-ml-engineering-jobs/)
- Interview-prep sources say FAANG recruiters "now assess MLOps literacy even for core ML engineering roles" (end-to-end flow from ingestion to post-deployment monitoring). This is a commercial blog, so treat it as opinion. — [InterviewNode: MLOps vs ML Engineering 2025](https://interviewnode.com/post/mlops-vs-ml-engineering-what-interviewers-expect-you-to-know-in-2025)
- LinkedIn: **AI engineer** is the fastest-growing job title in the US *Jobs on the Rise 2025*. LinkedIn added 639,000 AI-related US postings between 2023 and 2025, of which 75,000 were AI engineer roles (CBS summary). — [LinkedIn Jobs on the Rise 2025](https://www.linkedin.com/pulse/linkedin-jobs-rise-2025-25-fastest-growing-us-linkedin-news-gryie); [CBS News](https://www.cbsnews.com/news/artificial-intelligence-entry-level-role-linkedin-study/)
- Claims such as "MLOps 9.8× growth in five years (LinkedIn Emerging Jobs)" and "~20% YoY compensation jump" appear only in recruiter blogs and LinkedIn posts. They are **low-reliability**; do not cite them as fact. — [People In AI (recruiter blog)](https://www.peopleinai.com/blog/the-job-market-for-mlops-engineers-in-2025)

### Inferences
- A comparison table the writer can use (synthesised from the sources above):

| | Data Scientist | ML Engineer | MLOps / ML Platform Eng. | AI Engineer |
|---|---|---|---|---|
| Main output | Insight, experiment result, prototype model | A model running reliably in a product | Shared platform / "paved road" for many models | LLM/foundation-model-based application |
| Customer | Business / product | End users (via the product) | Internal DS/MLE teams | End users |
| Core skills | Stats, SQL, experimentation, modeling | SWE + ML + data pipelines + serving | SWE/DevOps/SRE, Kubernetes, cloud, distributed systems | SWE + LLM APIs, RAG, evals, fine-tuning |
| Typical languages | Python, SQL | Python + Java/Scala/Go | Python, Go, Java, C++, IaC (Terraform), YAML | Python/TypeScript |
| Measured by | Correct decisions, lift | Online metric lift, latency, reliability | Adoption, time-to-production, cost, uptime | Product quality, eval scores, cost per request |

- The MLE market is **senior-skewed**, with very few entry-level postings. A realistic entry path for a Vietnamese learner is Data Analyst/DS/backend SWE → MLE, or MLE at smaller companies. The platform role usually comes *after* SWE/DevOps experience.
- For "directing AI coding assistants", the MLE/MLOps knowledge that matters most is *system-level judgment*: skew, leakage, reproducibility, cost, security. Assistants generate boilerplate code quickly, so tool syntax matters less.

### Gaps
- No reliable Vietnam-specific data on MLE/MLOps posting counts or salaries was found; the Shopee results were Singapore-based.
- I could not open the 365 Data Science methodology (sample size, dates) because the page was blocked.
- Google, Netflix and Spotify official job-ladder definitions of MLE vs platform engineer were not retrieved.

---

## 2. What do these engineers actually do day-to-day? (company framing)

### Takeaway
Company platform write-ups show the same division of labour. MLEs on product teams frame the business problem as an ML problem, build features and training pipelines, run offline evaluation plus A/B tests, deploy, and monitor. Platform engineers build and operate the shared layers: compute (Kubernetes/Ray/SageMaker), orchestration, feature store, registry, serving (low-latency gRPC/Triton), and monitoring. They also run migrations (for example, to Ray or Triton) that cut latency and cost.

### Cited Findings
- Michelangelo scope: "manage data, train, evaluate, and deploy models, make predictions, and monitor predictions". This is the canonical end-to-end workflow list. **[older, 2017]** — [Uber: Meet Michelangelo (snippet)](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/)
- DMLS ch.2: projects must start from **business objectives translated into ML objectives**. The four general requirements are reliability, scalability, maintainability, adaptability, and ML system development is iterative. — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- DMLS ch.7–9: MLEs choose between **online vs batch prediction** and edge vs cloud. They monitor **data distribution shifts** (covariate shift, label shift, concept drift) and move toward **continual learning**, which needs streaming infrastructure for online evaluation. Huyen: "I used to think that an ML project is done after the model is deployed… I was seriously mistaken." — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- DMLS: natural labels (for example, delivery-time estimation) are delayed. The "feedback loop length" is the time between serving a prediction and getting its label. — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- Platform-team work at Grab: Catwalk (the model serving platform) carried "technical debt, degraded performance, and rising costs" from maintaining multiple inference engines for "hundreds of production ML models". The platform team built a "Triton manager" for zero-downtime, backward-compatible migration to NVIDIA Triton. — [Grab Engineering: Modernising Grab's model serving platform with NVIDIA Triton (snippet, Oct 2025)](https://engineering.grab.com/modernising-grab-model-serving-platform)
- Platform-team work at Spotify: the team consolidated five separate products into the **Hendrix** platform with one Python SDK. The products were feature serving (Jukebox), workflow orchestration (Spotify Kubeflow Platform), model serving (Salem) and others. Hendrix serves 600+ ML practitioners and adds managed Ray on GKE. — [ZenML MLOps Database summary of Spotify talks/blogs (snippet; aggregator)](https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-hendrix-unified-ml-platform-consolidating-feature-workflow-and-model-serving-with); [Anyscale: How Spotify built a Ray platform](https://www.anyscale.com/blog/how-spotify-built-a-robust-ray-platform-with-a-frictionless-developer); [Kubernetes Podcast ep. 237: Spotify AI Platform](https://kubernetespodcast.com/episode/237-spotify-ai-platform/)
- DoorDash's platform split: **Sibyl** is a centralised prediction service that "separates prediction from feature calculation and model training", using gRPC, a Redis feature store and in-memory model caching. **Fabricator** is a declarative (YAML + Protobuf) feature-engineering framework. — [DoorDash: Meet Sibyl](https://careersatdoordash.com/blog/doordashs-new-prediction-service/); [DoorDash: Introducing Fabricator](https://careersatdoordash.com/blog/introducing-fabricator-a-declarative-feature-engineering-framework/)
- Google "Rules of ML", Rule 8: "Know the freshness requirements of your system". If Google Play Search's model is not updated, "it can have an impact on revenue in under a month". An MLE's job includes deciding the retraining cadence and monitoring priority. **[older, ~2016–2017, still canonical]** — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning); [Google original](https://developers.google.com/machine-learning/guides/rules-of-ml)
- Rules of ML, Rule 9: "Detect problems before exporting models". Run sanity checks such as AUC on held-out data before export. "Issues about models that haven't been exported require an e-mail alert, but issues on a user-facing model may require a page." — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)

### Inferences
- A typical MLE week: about 30–50% data/feature work, some modeling, a large share of pipeline, deployment and debugging work, plus reading dashboards and A/B results. A platform engineer's week looks like SRE/backend work: Kubernetes, CI/CD, capacity and GPU scheduling, on-call, migrations, internal SDK design and user support. These proportions are inferred from the case studies and DMLS; I found no time-use survey that measures them.

### Gaps
- No quantitative "time spent" survey of MLE tasks from 2025–2026 was found.

---

## 3. Canonical frameworks: Google MLOps maturity (levels 0/1/2), "Hidden Technical Debt in ML Systems", Chip Huyen's DMLS, Google "Rules of ML"

### Takeaway
Together these four sources make the conceptual core that stays stable while tools change. Google's maturity model says: automate the **training pipeline** first (continuous training, level 1), then automate **building and deploying the pipeline itself** (CI/CD, level 2). Sculley et al. show that ML code is a small box inside a large system that builds up ML-specific debt. Huyen and Zinkevich give practical rules: split by time, avoid leakage, log serving features, and monitor skew and freshness.

### Cited Findings
**Google Cloud — "MLOps: Continuous delivery and automation pipelines in machine learning"** (page last updated Aug 28, 2024, per search snippet; moved to docs.cloud.google.com)
- "Only a small fraction of a real-world ML system is composed of the ML code. The required surrounding elements are vast and complex." — [Google Cloud Architecture Center (snippet)](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- **Level 0, manual process:** "manual, script-driven, and interactive". Every step (data analysis, prep, training, validation) is manual. Data scientists hand artifacts to engineers, and releases are infrequent. — [Google Cloud (snippet)](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning); [TDS: MLOps Level 0](https://towardsdatascience.com/mlops-level-0-manual-pipelines-7278b9949e59/)
- **Level 1, ML pipeline automation:** "The goal of level 1 is to perform continuous training of the model by automating the ML pipeline". This requires "automated data and model validation steps… as well as pipeline triggers and metadata management". A **feature store** is an "optional additional component": a "centralized repository where you standardize the definition, storage, and access of features for training and serving". — [Google Cloud (snippet)](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- **Level 2, CI/CD pipeline automation:** automates both the training pipeline and the *deployment of pipelines*. The distinction: level 1 automates *what the pipeline does*, level 2 automates *how the pipeline is built and deployed*. — [ml4devs summary](https://www.ml4devs.com/articles/mlops-maturity-for-continuous-integration-delivery-and-training-of-machine-learning-models/); [InfraSketch summary](https://infrasketch.net/blog/mlops-system-design)
- Google ML Crash Course (2024 refresh) "Production ML systems" module: static vs dynamic training, static vs dynamic inference, data transformation, deployment testing and monitoring. It states that ML model code is often "5% or less" of a production ML system's codebase. — [Google MLCC: Production ML systems](https://developers.google.com/machine-learning/crash-course/production-ml-systems); [Google blog: MLCC updates](https://blog.google/innovation-and-ai/technology/developers-tools/machine-learning-crash-course/)

**Sculley et al., "Hidden Technical Debt in Machine Learning Systems", NIPS 2015** **[older, but still the canonical reference]**
- Real-world ML systems commonly "incur massive ongoing maintenance costs". Risk factors: boundary erosion, entanglement, hidden feedback loops, undeclared consumers, data dependencies, configuration issues, changes in the external world, and system-level anti-patterns. — [NeurIPS proceedings](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems); [Semantic Scholar](https://www.semanticscholar.org/paper/Hidden-Technical-Debt-in-Machine-Learning-Systems-Sculley-Holt/1eb131a34fbb508a9dd8b646950c65901d6f1a5b)
- Named concepts from the paper (paper text not fetchable here; these terms are well-known from it): **CACE** ("Changing Anything Changes Everything", entanglement), **glue code**, **pipeline jungles**, **dead experimental codepaths**, **configuration debt**, **unstable/underutilized data dependencies**, and the "small black box of ML code" figure. — [NeurIPS proceedings](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)

**Chip Huyen, *Designing Machine Learning Systems* (O'Reilly 2022; a Vietnamese translation exists, published by Nhã Nam)**
- 11 chapters: overview; ML systems design; data engineering fundamentals; training data; feature engineering; model development and offline evaluation; deployment and prediction service; data distribution shifts and monitoring; continual learning and test in production; infrastructure and tooling for MLOps; the human side of ML. — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- Feature-engineering best practices, quoted: "Split data by time into train/valid/test splits instead of doing it randomly"; "If you oversample your data, do it after splitting"; "Scale and normalize your data after splitting to avoid data leakage"; "Use statistics from only the train split"; "Keep track of your data's lineage"; "Remove no longer useful features". — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- Ch.10: resource management evolved from cron to schedulers to orchestrators, with a comparison of Airflow, Argo and Metaflow. Standardising the dev environment is the first productivity step. Cloud cost "becomes prohibitive as this company grows", and some large companies are repatriating to private data centres. — [DMLS summary (read directly)](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- The book has been translated into 10+ languages, **including Vietnamese**, which is directly useful for this learner. — [dmls-book README (read directly)](https://github.com/chiphuyen/dmls-book)

**Martin Zinkevich, Google "Rules of Machine Learning" (43 rules)** **[older, still canonical]**
- Training-serving skew has three causes: (1) "a discrepancy between how you handle data in the training and serving pipelines", (2) "a change in the data between when you train and when you serve", (3) "a feedback loop between your model and your algorithm". — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)
- Rule 29: "The best way to make sure that you train like you serve is to save the set of features used at serving time, and then pipe those features to a log to use them at training time." Result: "YouTube home page switched to logging features at serving time with significant quality improvements and a reduction in code complexity." — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)
- Rule 32 corollary: "try not to use two different programming languages between training and serving… that decision will make it nearly impossible for you to share code". — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)
- Rule 10, silent failures: "Play once had a table that was stale for 6 months, and refreshing the table alone gave a boost of 2% in install rate." A feature's coverage can silently drop from 90% to 60%. — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)
- Rule 1 heuristic: "If machine learning is not absolutely required for your product, don't use it until you have data." — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)

### Inferences
- A learner should be able to place any company or project on the 0/1/2 scale. Most small teams, and most Vietnamese startups, sit at level 0 to 1. Level 2 needs a platform team. Using this vocabulary lets the learner tell an AI assistant exactly what to build ("give me a level-1 pipeline: scheduled retrain, data validation gate, model validation gate, registry, metadata").

### Gaps
- I could not fetch the full Google page text for exact wording of each level's "challenges" section. The level summaries come from search snippets and secondary summaries.
- I could not fetch the Sculley paper PDF. The named concepts are listed from well-established knowledge of the paper, and the first bullet is confirmed by abstract snippets.

---

## 4. Skill tree (foundation → core → advanced) and learning order with milestone projects

### Takeaway
Learn in this order: **software engineering and data fundamentals → the single-model production loop (track, package, serve, monitor) → automation (pipelines, CI/CD/CT, IaC) → scale and platform (Kubernetes, distributed training/serving, feature stores, GPUs, cost, governance)**. Every course reviewed (MLOps Zoomcamp, Made With ML, Google MLCC) follows the same order. Courses also assume Python, Docker basics, an ML workflow and about a year of programming before MLOps.

### Cited Findings
- MLOps Zoomcamp (DataTalksClub): free, 9 weeks, self-paced only (no live cohort planned for 2026). Prerequisites: "Python, Docker basics, and the machine learning workflow… plus about a year of programming experience". Modules: 1 Intro → 2 Experiment tracking & model management (MLflow) → 3 Orchestration & ML pipelines → 4 Deployment (online web/streaming vs offline batch; Flask; AWS Kinesis & Lambda streaming) → 5 Monitoring (Prometheus, Evidently, Grafana; batch monitoring with Prefect, MongoDB, Evidently) → 6 Best practices (tests, Infrastructure as Code with Terraform, CI/CD) → final project. — [DataTalksClub/mlops-zoomcamp README (read directly)](https://github.com/DataTalksClub/mlops-zoomcamp)
- Made With ML (Goku Mohandas; 40K+ subscribers): the arc is "Design · Develop · Deploy · Iterate". It emphasises first principles, SWE best practices, scaling data/train/tune/serve in Python with **Ray**, MLflow tracking, CI/CD "to continuously train and deploy", and running unchanged from dev to prod (laptop, Anyscale, or KubeRay). — [GokuMohandas/Made-With-ML README (read directly)](https://github.com/GokuMohandas/Made-With-ML)
- Google MLCC production modules: static vs dynamic training and inference, transformations, deployment testing, monitoring. — [Google MLCC](https://developers.google.com/machine-learning/crash-course/production-ml-systems)
- Job-posting skill frequencies (Java 21%, SQL 18%, Kubernetes 17.6%, Docker 15.4%) show which production skills employers screen for. — [365 Data Science (snippet)](https://365datascience.com/career-advice/career-guides/machine-learning-engineer-job-outlook-2025/)
- ML system design interviews: Aminian & Xu, *Machine Learning System Design Interview* (ByteByteGo, Jan 2023) gives a 7-step framework, 10 worked questions and 211 diagrams. **[older but standard]** — [Google Books](https://books.google.com/books/about/Machine_Learning_System_Design_Interview.html?id=iYDHzwEACAAJ)

### Inferences (proposed skill tree and order, synthesised from the courses above)
**Stage A: Foundation (≈2–4 months, overlaps with the DS roadmap)**
1. Python for engineers: modules/packages, virtual envs (uv/pip/poetry), type hints, logging, config (no hard-coded paths), CLI.
2. Git and code review; testing with pytest (unit tests for feature functions; data tests); linting/formatting.
3. SQL plus a dataframe tool (pandas/Polars); basic data modeling; Parquet.
4. ML fundamentals with correct evaluation: splits (time-based), leakage, baselines, metrics tied to a business metric (DMLS ch.2, 5, 6).
5. Linux shell, HTTP/REST basics, Docker basics.
- *Milestone 1:* a packaged, tested training repo (`src/` layout, `pyproject.toml`, pytest, Makefile, pinned deps, seeded runs) that reproduces a model from raw data with one command.

**Stage B: Core MLE / MLOps (≈3–4 months)**
6. Experiment tracking and model registry (MLflow).
7. Serving: batch scoring job vs online REST/gRPC (FastAPI; BentoML or similar), and the latency/throughput trade-off. Streaming is optional here.
8. Orchestration (Airflow / Prefect / Dagster): DAGs, retries, backfills, idempotency.
9. Data validation and monitoring: schema checks, drift (Evidently), service metrics (Prometheus/Grafana).
10. CI/CD for ML: GitHub Actions running tests, training smoke tests, image builds; model validation gates before promotion (Google level 1).
11. One cloud (AWS/GCP/Azure) at associate level: object storage, IAM, a managed ML service (SageMaker / Vertex AI / Azure ML), and Terraform basics.
- *Milestone 2:* the Zoomcamp-style end-to-end project (tracked training → registry → containerised API + batch job → monitoring dashboard → CI/CD → Terraform).

**Stage C: Advanced / Platform (≈4–6+ months, usually on the job)**
12. Kubernetes (deployments, HPA, jobs, resource requests/limits, GPUs), Helm; KServe/Triton for serving; KubeRay.
13. Feature stores (Feast; online/offline consistency; point-in-time joins).
14. Distributed training basics: data vs model parallelism, PyTorch DDP/FSDP, mixed precision, checkpointing, GPU utilisation and cost; Ray Train/Tune.
15. Continual learning and online experimentation (A/B tests, shadow/canary deployments).
16. Governance: model cards, lineage, access control, audit, safe model serialisation (safetensors vs pickle), PII handling.
17. Cost engineering: right-sizing, batching, quantisation/ONNX/TensorRT, spot instances, autoscaling to zero.
18. ML system design interviews (Huyen DMLS; Aminian & Xu).
- *Milestone 3+:* see the portfolio projects in section 7.

- Order rationale: each later layer automates the one before it. You cannot do CI/CD (level 2) for a pipeline you cannot run by hand, and you cannot debug drift without understanding evaluation. AI assistants can produce stage C YAML quickly, but only stage A–B understanding lets the learner judge whether that YAML is correct.

### Gaps
- No source gives validated time estimates per stage. The durations above are my estimates.
- The exact 7 steps of the Aminian & Xu framework were not retrieved. Commonly cited: clarify requirements → frame as ML task → data prep → model development → evaluation → deployment and serving → monitoring. This is unverified here.

---

## 5. Tools in 2025–2026: what is stable vs churning

### Takeaway
Stable: **the concepts** (tracking, registry, orchestration, feature store, serving, monitoring) and the **substrate** (Python, Git, Docker, Kubernetes, one major cloud, SQL, Parquet). The ML tooling layer has consolidated and pivoted to GenAI in 2025: W&B was acquired by CoreWeave, Tecton by Databricks, MLflow 3 is GenAI-first, and Kubeflow was rebranded as an "AI Reference Platform". Open standards on Kubernetes (KServe, Kubeflow) gained CNCF maturity. Learn one tool per category and focus on the interfaces between them.

### Cited Findings
- **MLflow 3.0**: released June 2025 at Databricks Data + AI Summit. It introduces a **LoggedModel** entity (a model-centric rather than run-centric design that links to a Git commit, config, traces and evals). It adds first-class GenAI (tracing, evaluation, prompt management) while staying compatible with classic ML, and the docs are split into GenAI and classic-ML journeys. — [MLflow blog: Announcing MLflow 3.0](https://mlflow.org/blog/mlflow-3-0-launch); [Databricks blog](https://www.databricks.com/blog/mlflow-30-unified-ai-experimentation-observability-and-governance)
- **Weights & Biases**: CoreWeave announced the acquisition Mar 4, 2025 and completed it May 5, 2025 (~$1.7B per The Information). W&B now also ships **Weave** for GenAI evaluation and observability. — [CoreWeave IR: completes acquisition](https://investors.coreweave.com/news/news-details/2025/CoreWeave-Completes-Acquisition-of-Weights--Biases/default.aspx); [TechCrunch](https://www.techcrunch.com/2025/03/04/coreweave-acquires-ai-developer-platform-weights-biases/)
- **Tecton** (commercial feature platform, founded by Michelangelo's creators): acquired by **Databricks, Aug 22, 2025**, to power real-time data for AI agents (Agent Bricks). Terms were undisclosed; Tecton was last valued at $900M (2022). — [PYMNTS](https://www.pymnts.com/acquisitions/2025/databricks-to-purchase-tecton-to-boost-ai-agent-offerings/); [Perficient](https://blogs.perficient.com/2025/09/26/databricks-acquires-tecton/)
- **Feast** (open-source feature store): community-maintained and "still under active development". — [feast-dev/feast GitHub](https://github.com/feast-dev/feast); [Feast blog: The Future of Feast](https://feast.dev/blog/future-of-feast/)
- **Apache Airflow 3.0**: GA on April 22, 2025. It is "the biggest release in Airflow's history", with data-asset-centric features aimed at MLOps and GenAI; 3.1 followed. — [Apache Airflow blog: Airflow 3 is GA](https://airflow.apache.org/blog/airflow-three-point-oh-is-here/); [Astronomer: Airflow 3.1](https://www.astronomer.io/events/webinars/airflow-3-1-release-video/)
- **KServe**: accepted as a **CNCF incubating** project (Sept 29, 2025; announced Nov 11, 2025). It started in 2019 as KFServing under Kubeflow (Google, IBM, Bloomberg, NVIDIA, Seldon), was renamed KServe in Sept 2022, and now positions itself as "generative and predictive AI inference". — [CNCF blog](https://www.cncf.io/blog/2025/11/11/kserve-becomes-a-cncf-incubating-project/); [kserve GitHub](https://github.com/kserve/kserve)
- **Kubeflow**: 1.10 (Mar 2025) added Trainer 2.0, a Model Registry UI and the Spark Operator. 1.11 (Dec 2025) rebranded it as the **"Kubeflow AI Reference Platform"** with a unified TrainJob API and LLM fine-tuning blueprints. CNCF incubating since July 2023. The search snippet says it moved to **Graduated on July 24, 2026**; I did not verify this against the CNCF page, so treat it as unconfirmed. — [Kubeflow releases](https://www.kubeflow.org/docs/kubeflow-platform/releases/); [CNCF: Kubeflow](https://www.cncf.io/projects/kubeflow/)
- **Metaflow**: originated at Netflix and is now supported by Outerbounds. Adopters include Amazon, DoorDash, Dyson, Goldman Sachs, Ramp. — [Netflix/metaflow README (read directly)](https://github.com/Netflix/metaflow)
- **Ray**: Made With ML builds on Ray; Spotify (Hendrix) and Uber (Michelangelo on Ray + Kubernetes) run it in production. — [Made With ML (read directly)](https://github.com/GokuMohandas/Made-With-ML); [Anyscale/Spotify](https://www.anyscale.com/blog/how-spotify-built-a-robust-ray-platform-with-a-frictionless-developer)
- **Triton Inference Server**: Grab migrated more than half of its online deployments to it (see section 6). — [Grab Engineering (snippet)](https://engineering.grab.com/modernising-grab-model-serving-platform)
- **Managed vs self-hosted trend**: Lyft moved **LyftLearn Compute** (training, batch, HPO, notebooks) from self-run Kubernetes to **AWS SageMaker**, while LyftLearn Serving remains in-house. — [Lyft Engineering: LyftLearn Evolution (snippet)](https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1)
- DMLS keeps a curated MLOps tools list, and Goku Mohandas calls the book a way "to navigate the ephemeral landscape of tooling". — [dmls-book mlops-tools.md](https://github.com/chiphuyen/dmls-book/blob/main/mlops-tools.md); [dmls-book README (read directly)](https://github.com/chiphuyen/dmls-book)

### Inferences
- Stability ranking for the learner:
  - **Very stable (learn deeply):** Python, SQL, Git, Docker, Linux, HTTP, pytest, Kubernetes basics, one cloud, Parquet, the level 0/1/2 concepts.
  - **Stable leaders (learn one well):** MLflow (tracking/registry), Airflow (orchestration), PyTorch, Ray, FastAPI, Prometheus/Grafana, Terraform.
  - **Solid but more specialised:** KServe, Triton, Feast, Evidently, BentoML, Dagster/Prefect, Kubeflow Pipelines, Metaflow.
  - **Churning / consolidating:** commercial feature stores, experiment-tracking SaaS (acquisitions), LLMOps/eval tools (MLflow 3 tracing, W&B Weave, many startups).
- 2025–2026 direction: MLOps tools are absorbing LLMOps (tracing, prompt versioning, evals, GPU inference for LLMs), so the lines between MLOps and AI engineering are blurring.

### Gaps
- BentoML, Evidently, Dagster and Prefect 2025–2026 changes were not individually verified.
- I have no reliable usage-share survey (for example, % of companies using MLflow vs W&B) for 2025–2026.

---

## 6. Real company platform case studies (with numbers) and failures/incidents

### Takeaway
The case studies share a pattern: a platform makes model deployment standard and self-serve, and cuts time-to-production from weeks or months to days. Later generations migrate to **Kubernetes + Ray**, **Triton**, or **managed cloud** to reduce ops burden and cost. The failure cases show that model risk is business risk: Zillow's $304M write-down, stale tables silently hurting metrics, and supply-chain attacks through pickled models.

### Cited Findings
**Uber — Michelangelo**
- 2017 launch; it covers the end-to-end workflow. Palette feature store: features are fetched by canonical name in both training and serving to ensure consistency (skew prevention) and "hosts more than 20,000 features". **[older]** — [Uber: Meet Michelangelo (snippet)](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/)
- 2024 state: about **400 active ML projects, 5,000+ models in production, 10 million real-time predictions per second at peak, 20,000+ training jobs per month**. It evolved over about 8 years from tree models to deep learning to GenAI (2023–present) and was modernised onto Ray on Kubernetes. — [Uber blog: From Predictive to Generative – How Michelangelo Accelerates Uber's AI Journey (snippet; page blocked)](https://www.uber.com/us/en/blog/from-predictive-to-generative-ai/); [Uber: Scaling Michelangelo](https://www.uber.com/dk/en/blog/scaling-michelangelo/)

**Lyft — LyftLearn**
- "Thousands of production models making hundreds of millions of real-time predictions per day, supported by thousands of daily training jobs". Use cases: price optimisation, ETA, fraud. — [Lyft Engineering: LyftLearn Evolution (snippet)](https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1)
- The original LyftLearn ran every training job, batch prediction, HPO and notebook as Kubernetes workloads, with containers that "spin up in seconds" and free choice of libraries. The compute side has since moved to SageMaker. — [Lyft: LyftLearn on Kubernetes](https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb); [LyftLearn Evolution (snippet)](https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1)
- Feature store: 60+ production use cases. After five years: **33% lower P95 latency**, 12% YoY growth in batch features, 25% more distinct service callers, and over a trillion additional read/write operations. — [ZenML summary of Lyft feature store post (snippet; aggregator)](https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-lyftlearn-homegrown-feature-store-for-batch-streaming-and-on-demand-ml-features-at-trillion)

**Grab — Catwalk (Southeast Asia, relevant to Vietnam)**
- Catwalk is a "self-serve machine learning model serving platform" (the original post and an Oct 2024 "Evolution of Catwalk" post). — [Grab: Catwalk](https://engineering.grab.com/catwalk-serving-machine-learning-models-at-scale); [Grab: Evolution of Catwalk](https://engineering.grab.com/catwalk-evolution)
- Triton migration (Oct 2025 post): **>50% of online deployments migrated within 10 days**, **50% tail-latency improvement** on some critical systems, **up to 90% cost reduction** for certain models, and an **average 20% infrastructure-spend decrease** across migrated services. A transformer model handled **≥5× traffic** in testing. — [Grab Engineering: Modernising Grab's model serving platform with NVIDIA Triton (snippet)](https://engineering.grab.com/modernising-grab-model-serving-platform)

**Netflix — Metaflow**
- At Netflix, "Metaflow supports over 3000 AI and ML projects, executes hundreds of millions of data-intensive high-performance compute jobs processing petabytes of data and manages tens of petabytes of models and artifacts for hundreds of users". — [Netflix/metaflow README (read directly)](https://github.com/Netflix/metaflow)
- Dec 2024: Netflix uses Metaflow for diverse ML/AI systems and "thousands of unique Metaflow flows". A "Configurable Metaflow" feature was added. — [Netflix TechBlog: Supporting Diverse ML Systems at Netflix](https://netflixtechblog.com/supporting-diverse-ml-systems-at-netflix-2d2e6b6d205d); [Netflix TechBlog: Introducing Configurable Metaflow](https://netflixtechblog.com/introducing-configurable-metaflow-d2fb8e9ba1c6)

**Spotify — Hendrix / Spotify-Ray**
- Before 2018 teams used ad-hoc Scala tools (Scio ML). An integration of Kubeflow Pipelines and TFX reduced ML iteration time "from weeks to days". Five products were consolidated into Hendrix, which serves 600+ practitioners. Adoption among ML engineers rose **from 16% to 71% by 2023**, driven by supporting PyTorch alongside TensorFlow, managed Ray and integrations. — [ZenML MLOps DB summaries of Spotify sources (aggregator; snippet)](https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-hendrix-unified-ml-platform-consolidating-feature-workflow-and-model-serving-with); [ZenML: Spotify Kubeflow+TFX weeks→days](https://www.zenml.io/mlops-database/spotify-spotifys-ml-platfrom-spotify-integration-of-kubeflow-pipelines-and-tfx-to-reduce-ml-iteration-time-from-weeks-to)

**DoorDash — Sibyl & Fabricator**
- Sibyl Prediction Service peaks at **~900,000 ML evaluations/second**. In load testing it exceeded 100,000 predictions/s with **3× lower latency** than the prior system. — [DoorDash: Meet Sibyl](https://careersatdoordash.com/blog/doordashs-new-prediction-service/) (figures via ZenML summary snippet)
- Fabricator: **100+ pipelines, 500 unique features, 100+ billion daily feature values**, up to **12× pipeline speedups**, and backfills cut from days to hours. — [DoorDash: Introducing Fabricator](https://careersatdoordash.com/blog/introducing-fabricator-a-declarative-feature-engineering-framework/)
- Client-side caching improved feature-store performance by 70%. DoorDash also built a "clusterless" feature store. — [DoorDash: client-side caching](https://doordash.engineering/2022/05/03/how-we-applied-client-side-caching/); [DoorDash: clusterless feature store](https://careersatdoordash.com/blog/doordash-clusterless-ml-feature-store/)

**Airbnb — Bighead** **[older, 2018]**
- In 2016 Airbnb had few models in production, and each took **8–12 weeks** to build. Bighead aimed to cut development time "from months to days". — [Strata NY 2018 talk page](https://conferences.oreilly.com/strata/strata-ny-2018/public/schedule/detail/69383.html); [Acing AI summary (secondary)](https://medium.com/acing-ai/airbnbs-end-to-end-ml-platform-8f9cb8ba71d8)

**Meta — FBLearner Flow** **[older, 2016–2020]**
- Home-grown platform automating hyperparameter tuning, distributed training, validation, drift detection, packaging and registration. No reliable current numbers were found. — [TWIML: Evolution of ML Platforms at Facebook](https://twimlai.com/article/the-evolution-of-machine-learning-platforms-at-facebook-webcast-recap/)

**Failures / incidents**
- **Zillow Offers (2021)**: a **$304.4M inventory write-down in Q3 2021** from buying homes above current estimates of future selling prices. Zillow expected a further $240–265M in charges and shut down Zillow Offers in Nov 2021, with a ~25% workforce reduction. Commentators blame the valuation model's failure under post-pandemic volatility (concept drift). Bloomberg reported that staff overlays raised offers by up to ~7% to hit volume targets, which is a human/process failure on top of the model. — [Zillow 8-K Q3 2021 (SEC)](https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm); [Stanford GSB](https://www.gsb.stanford.edu/insights/flip-flop-why-zillows-algorithmic-home-buying-venture-imploded); [CNN](https://edition.cnn.com/2021/11/09/tech/zillow-ibuying-home-zestimate)
- **Stale-data silent failure at Google Play**: a 6-month-stale table; refreshing it gave **+2% install rate**. — [Rules of ML mirror (read directly)](https://github.com/thundergolfer/google-rules-of-machine-learning)
- **Malicious pickled models (ML supply chain)**: JFrog found **100+ malicious models on Hugging Face (Feb 2024)**, some with backdoors giving remote access on load. About 95% were PyTorch (pickle-based). In **Dec 2025** JFrog disclosed three **PickleScan bypass CVEs** (CVE-2025-10155/10156/10157: alternate extensions, ZIP CRC tricks, subclassed module paths). Separately, >96% of HF "unsafe" pickle flags are false positives, so scanning is noisy. — [JFrog: malicious HF models with silent backdoor](https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/); [JFrog + Hugging Face](https://jfrog.com/blog/jfrog-and-hugging-face-join-forces/); [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-malicious-ai-model-repositories-attack-sur/); [arXiv 2508.15987 PickleBall](https://arxiv.org/pdf/2508.15987)

### Inferences
- Common outcome metrics to quote: time-to-production (weeks → days: Spotify, Airbnb), p95/p99 latency (Grab −50%, Lyft −33%), cost (Grab −20% avg, up to −90%), scale (Uber 10M pred/s; DoorDash 900K eval/s), adoption (Spotify 16% → 71%). These are the numbers a platform engineer is measured on.
- The recurring architecture: offline store + online store (feature store); a registry; a central low-latency prediction service; K8s/Ray compute; monitoring. That matches DMLS ch.10's "deployment, model store, feature store" core.

### Gaps
- Uber 2024 and Lyft 2025 figures come from search snippets of the primary pages (both blocked), not full-text reads.
- I did not find a post-2020 quantitative Meta FBLearner update, and no Airbnb Bighead update after 2019.
- Public post-mortems of ML *platform outages* (not business failures) are rare. None with numbers were found.

---

## 7. Recommended learning resources and 4–6 portfolio projects

### Takeaway
Core path: **Google MLCC (production modules) → DMLS (Vietnamese translation available) → Made With ML → MLOps Zoomcamp final project → Rules of ML + Hidden Tech Debt paper → an ML system design book**. Build 5 projects of increasing difficulty, each adding one production layer.

### Cited Findings
- **Google Machine Learning Crash Course** (refreshed 2024; free) — production ML systems and real-world ML modules. — [MLCC](https://developers.google.com/machine-learning/crash-course)
- **MLOps Zoomcamp** — free, 9 weeks, self-paced, MLflow → orchestration → deployment → monitoring (Evidently/Grafana) → Terraform/CI/CD → final project. No live cohort planned for 2026, so certificates are only awarded in live cohorts. — [GitHub README (read directly)](https://github.com/DataTalksClub/mlops-zoomcamp)
- **Made With ML** — Design/Develop/Deploy/Iterate with Ray, MLflow, CI/CD, first principles. — [GitHub (read directly)](https://github.com/GokuMohandas/Made-With-ML); [madewithml.com](https://madewithml.com/)
- **Designing Machine Learning Systems** (Huyen 2022; Vietnamese translation available). — [dmls-book](https://github.com/chiphuyen/dmls-book)
- **AI Engineering** (Huyen 2025) — for the adjacent AI-engineer branch. — [aie-book](https://github.com/chiphuyen/aie-book)
- **Rules of ML** (Zinkevich) and **Hidden Technical Debt** (Sculley 2015). — [Google](https://developers.google.com/machine-learning/guides/rules-of-ml); [NeurIPS](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)
- **Machine Learning System Design Interview** (Aminian & Xu 2023). — [Google Books](https://books.google.com/books/about/Machine_Learning_System_Design_Interview.html?id=iYDHzwEACAAJ)
- **Full Stack Deep Learning**: I found no 2025–2026 source confirming a new edition. The last well-known course (2022) and LLM Bootcamp (2023) materials remain online. Treat it as **[older]** reference material.
- Company case-study index: Evidently's "How to build an ML platform? Lessons from 10 tech companies" and the ZenML MLOps/LLMOps Database (both blocked here but surfaced in search). — [Evidently](https://www.evidentlyai.com/blog/how-to-build-ml-platform); [ZenML MLOps Database](https://www.zenml.io/mlops-database)

### Inferences — portfolio ladder (each project adds one layer; tools chosen from section 5)
1. **Reproducible training package** (tabular, e.g. churn or house prices): `src/` layout, pytest (including a leakage test and a time-based split), config file, fixed seeds, pinned deps, MLflow tracking, model card README. *Proves:* SWE hygiene and evaluation discipline.
2. **Model-as-a-service**: FastAPI (or BentoML) + Docker, with input schema validation (pydantic), health endpoint, load test (latency p50/p95), and a batch-scoring CLI that reuses the **same feature code**. Save as safetensors/ONNX or a self-built format, and document why pickle loading from untrusted sources is unsafe. *Proves:* serving and skew awareness.
3. **Automated retraining pipeline (Google level 1)**: an Airflow/Prefect/Dagster DAG that ingests → validates data → trains → evaluates against the current prod model → registers or promotes in the MLflow registry. GitHub Actions runs tests plus a training smoke test on each PR. *Proves:* CT, validation gates, metadata.
4. **Monitoring and drift**: log serving features and predictions (Rule 29), run Evidently drift reports, a Prometheus/Grafana dashboard and alert thresholds, simulate drift, and trigger retrain. *Proves:* production ownership.
5. **Cloud + IaC + Kubernetes**: deploy project 2/3 to a managed K8s (or a local kind/minikube cluster) with Terraform/Helm, autoscaling, resource limits, a canary or shadow deployment (KServe optional), and a cost estimate per 1M predictions. *Proves:* platform readiness.
6. *(Optional, advanced)* **Distributed/GPU or streaming**: fine-tune a small model with PyTorch DDP or Ray Train on 2+ GPUs (cloud credits), measure GPU utilisation and cost. Alternatively, build a streaming feature pipeline (Kafka/Redpanda → Feast online store) with point-in-time-correct training data.
- For a Vietnamese portfolio, using a local dataset (for example Vietnamese e-commerce reviews, ride demand, or house prices from public Vietnamese sources) makes the projects stand out. I have no source on this; it is a suggestion.

### Gaps
- I could not verify the 2025–2026 status of Full Stack Deep Learning (fsdl.me).
- I found no Vietnamese-language MLOps course with verifiable quality.

---

## 8. What an ML Engineer must be able to critique in AI-generated ML / infra code (plus common mistakes)

### Takeaway
AI assistants produce code that *runs* but is often *wrong for production* in ML-specific ways that tests do not catch. Common problems: **leakage, training-serving skew, non-reproducibility, unsafe deserialisation, missing validation/monitoring, and wasteful resource use**. The learner's value lies in reviewing these systematically. The checklist below maps each item to a canonical source.

### Cited Findings (principles the checklist is based on)
- Leakage and splitting: split by time; oversample after splitting; scale/normalise after splitting; compute statistics on the train split only. — [DMLS summary](https://github.com/chiphuyen/dmls-book/blob/main/summary.md)
- Skew: three causes (pipeline discrepancy, data change, feedback loop). Log serving features for training (Rule 29). Do not use different languages for training and serving (Rule 32). Measure skew (Rule 37). — [Rules of ML mirror](https://github.com/thundergolfer/google-rules-of-machine-learning)
- A feature store uses canonical feature definitions shared by training and serving (Uber Palette; Google level 1). — [Uber Michelangelo (snippet)](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/); [Google Cloud MLOps (snippet)](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- Validation gates before export or promotion (Rule 9; Google level 1 automated data and model validation). — [Rules of ML](https://github.com/thundergolfer/google-rules-of-machine-learning); [Google Cloud](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- Silent failures and stale data (Rule 10: 90% → 60% feature coverage; stale table cost 2% installs). — [Rules of ML](https://github.com/thundergolfer/google-rules-of-machine-learning)
- ML debt: glue code, pipeline jungles, dead experimental codepaths, configuration debt, undeclared consumers, hidden feedback loops. — [Sculley et al. 2015](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems)
- Pickle and supply-chain risk: malicious HF models with backdoors, and PickleScan bypass CVEs in 2025. — [JFrog](https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/); [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-malicious-ai-model-repositories-attack-sur/)
- Distribution shift and business risk (Zillow). — [Zillow 8-K](https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm)
- Cost: cloud cost becomes prohibitive at scale (DMLS ch.10). Serving-engine choice changed Grab's costs by up to 90% on some models. — [DMLS summary](https://github.com/chiphuyen/dmls-book/blob/main/summary.md); [Grab (snippet)](https://engineering.grab.com/modernising-grab-model-serving-platform)

### Inferences — review checklist for AI-generated ML/infra code
**Data and evaluation**
- Is `fit`/`fit_transform` (scaler, imputer, encoder, target encoding, SMOTE, feature selection) done *before* the split or on the full dataset? → leakage. Is a `Pipeline` used inside CV?
- Random split on time-dependent data? Are there duplicate users or entities across train and test (group leakage)? Are features computed with information from after the prediction time (point-in-time correctness)?
- Is the metric chosen for the business goal (not accuracy on imbalanced data)? Is there a baseline or heuristic comparison (Rule 1)?

**Training-serving consistency**
- Is feature logic duplicated between a notebook/training script and the API (two implementations, or pandas vs SQL vs Java)? It should be one shared function or module, or a feature store.
- Does the serving path handle missing/unseen categories, dtype differences and default values the same way training did? Is there an input schema (pydantic/pandera) at the boundary?
- Are serving features and predictions logged for monitoring and future training (Rule 29)?

**Reproducibility**
- Seeds, pinned dependency versions (lockfile), data version or snapshot ID, code commit hash, and config logged to MLflow/W&B. Does the model artifact record its training data and feature schema?
- No hard-coded absolute paths, no notebook-only steps, idempotent pipeline tasks (safe to retry or backfill).

**Security and governance**
- `pickle.load`, `joblib.load`, `torch.load` (without `weights_only=True`) on files from untrusted sources → arbitrary code execution. Prefer safetensors/ONNX and verify hashes. `trust_remote_code=True` needs review.
- Secrets in code, YAML or Docker images; overly broad IAM roles; public buckets; PII in logs or training data; containers running as root.

**Serving and infra**
- Is the model loaded per request instead of once at startup? Are there timeouts, batching, health/readiness probes, and resource requests/limits in K8s manifests?
- GPU requested for a model that runs fine on CPU; oversized instances; no autoscaling; no spot/preemptible for batch; always-on endpoints for batch workloads → cost. Estimate cost per 1K predictions.
- Is there a rollback, canary or shadow path, and a validation gate before promotion (Rule 9)?

**Monitoring**
- Data drift and schema checks, prediction distribution, delayed-label performance (feedback loop length), service latency/error rate, feature freshness and coverage (Rule 10).

**Common mistakes (learner and junior-MLE level)**
- Treating deployment as the end of the project (Huyen's "I was seriously mistaken").
- Jumping to Kubernetes/Kubeflow before a level-0 pipeline works end to end, and over-engineering for scale that is not needed. Sculley's debt and the Rules of ML "don't use ML until you have data" apply here.
- Tool-collecting (knowing 15 tool names) instead of understanding the interfaces: artifact, schema, registry, contract.
- No time-based validation, and offline metrics that do not correlate with online metrics.
- Ignoring data quality and freshness (stale tables), and having no alerts.
- Letting human overrides or business pressure bypass model guardrails (Zillow's reported offer overlays).
- Unsafe model loading from hubs, and ignoring cost until the cloud bill arrives.

### Gaps
- No empirical study was found that measures how often AI coding assistants introduce leakage or skew bugs specifically. The checklist is derived from the canonical principles above, not from a measured error distribution.
- PyTorch's change of the `torch.load` default to `weights_only=True` (reported for PyTorch 2.6) was not verified against a source in this session.
