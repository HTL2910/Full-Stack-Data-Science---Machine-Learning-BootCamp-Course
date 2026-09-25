# Data Analyst, Analytics Engineer, Product/Decision Data Scientist, ML Data Scientist: career branches (2025–2026)

Research date: 2026-09-25. Access note: several primary sites were blocked by the egress proxy in this session (getdbt.com, docs.getdbt.com, medium.com / Airbnb Tech Blog, netflixtechblog.com, metacareers.com, bls.gov, hex.tech, arxiv.org). For those sources the claims below come from search-result snippets of the primary page (URL given) rather than full-page reads. Treat exact wording as close paraphrase, not verbatim quotes, unless marked.

---

## Q1. How do companies define the four roles, and how do they differ and overlap?

### Takeaway
The four roles sit on one pipeline: **Analytics Engineer** (builds clean, tested, documented data models) → **Data Analyst** (answers business questions and builds dashboards/reports from those models) → **Product/Decision Data Scientist** (metrics design, experimentation, causal inference to drive product decisions; Airbnb's "Analytics" + "Inference" tracks, Meta's "Data Scientist, Product Analytics") → **ML Data Scientist** (builds predictive models that go into the product; Airbnb's "Algorithms" track). The boundaries overlap heavily at small companies. The main difference is *what the output is*: a trusted dataset, an answer or dashboard, a decision backed by causal evidence, or a model in production.

### Cited Findings
**Analytics Engineer (dbt Labs definition)**
- dbt Labs: analytics engineers "provide clean data sets to end users, modeling data in a way that empowers end users to answer their own questions." — [dbt Labs, "What is analytics engineering?"](https://www.getdbt.com/blog/what-is-analytics-engineering) (via search snippet; page blocked)
- dbt Labs contrast: "While a data analyst spends their time analyzing data, an analytics engineer spends their time transforming, testing, deploying, and documenting data." Analytics engineers apply software-engineering practices such as version control and continuous integration to the analytics codebase. — [dbt Labs, "What is analytics engineering?"](https://www.getdbt.com/blog/what-is-analytics-engineering)
- In practice the analytics engineer owns the "T" in ELT. dbt projects are usually layered as staging → intermediate → marts, with built-in data tests. — [DataCamp, What is dbt?](https://www.datacamp.com/tutorial/what-is-dbt); [Datadog, Understanding dbt](https://www.datadoghq.com/blog/understanding-dbt/) (secondary sources)

**Airbnb's three tracks (2018; older but still the standard reference taxonomy)**
- Elena Grewal (then Head of Data Science, Airbnb), "One Data Science Job Doesn't Fit All" (July 2018), splits data science into three tracks:
  - **Analytics**: for people "skilled at asking a great question, exploring cuts of the data in a revealing way, automating analysis through dashboards and visualizations, and driving changes in the business as a result of recommendations."
  - **Algorithms**: for people with "expertise in machine learning, passionate about creating business value by infusing data in our product and processes."
  - **Inference**: for people "well versed in Statistics, who help Airbnb measure and interpret the impact of changes, leading to improved decision-making."
  - Sources: [LinkedIn repost of Grewal's article](https://www.linkedin.com/pulse/one-data-science-job-doesnt-fit-all-elena-grewal); [FlowingData summary, 2018-08-02](https://flowingdata.com/2018/08/02/three-flavors-of-data-scientist/); original on [Airbnb Tech Blog / Medium](https://medium.com/airbnb-engineering/one-data-science-job-doesnt-fit-all-5555c9e24ab1) (blocked in this session)

**Meta "Data Scientist, Product Analytics" (current postings, 2025–2026)**
- The role is framed as providing "data-driven insights that will help improve user experience across Meta's products," applying "advanced quantitative analysis, experimentation, and data storytelling." Responsibilities include designing experiments with engineers, structuring ambiguous product questions, and "identify[ing] and measur[ing] success through goal setting, forecasting, and monitoring of key product metrics," in partnership with Product and Engineering. — [Meta Careers: Data Scientist, Product Analytics](https://www.metacareers.com/profile/job_details/1070147800777577/) (via search snippet; page blocked)
- A senior/"Technical Leadership" variant requires 6+ years applying "statistical analysis, experimentation design, and predictive modeling" to product problems. — [Meta Careers: Data Scientist, Analytics (Technical Leadership)](https://www.metacareers.com/profile/job_details/613354727793690/) (via snippet)
- Interview-prep guides say Meta product DS interviews test A/B testing concepts: power, significance, MDE, p-values, guardrail metrics. — [DataLemur Meta DS guide](https://datalemur.com/blog/meta-data-scientist-interview-guide); [DataInterview Meta guide 2026](https://www.datainterview.com/blog/meta-data-scientist-interview) (secondary, commercial prep sites)

**Experimentation / causal inference as its own sub-specialty (Netflix)**
- Netflix relies heavily on A/B testing and uses quasi-experiments where A/B tests are limited. Its published methods include difference-in-differences, double machine learning, Bayesian A/B testing and a CausalImpact-like internal tool, "Quasimodo". — [Netflix TechBlog, A Survey of Causal Inference Applications at Netflix](https://netflixtechblog.com/a-survey-of-causal-inference-applications-at-netflix-b62d25175e6f); [Round 2 survey](https://netflixtechblog.com/round-2-a-survey-of-causal-inference-applications-at-netflix-fd78328ee0bb); [Netflix Research: Experimentation & Causal Inference](https://research.netflix.com/research-area/experimentation-and-causal-inference)
- Netflix's experimentation platform lets data scientists contribute production code directly in Python and R. — [Netflix, Engineering for a Science-Centric Experimentation Platform (arXiv 1910.03878)](https://arxiv.org/pdf/1910.03878)

**Labor market context (US)**
- BLS: data scientist employment is projected to grow 34% from 2024 to 2034 (4th-fastest-growing occupation), with about 23,400 openings per year. Median pay was $112,590 in May 2024 (bottom 10% under $63,650; top 10% over $194,410). — [BLS OOH: Data Scientists](https://www.bls.gov/ooh/math/data-scientists.htm?id=1940) (via search snippet); [BioSpace summary](https://www.biospace.com/job-trends/data-scientist-fourth-fastest-growing-u-s-job-says-bls)
- One secondary source gives total employment going from 245,900 to 328,300 (+82,500). — [GeneOnline](https://www.geneonline.com/data-scientist-employment-in-the-us-projected-to-grow-33-5-percent-from-2024-to-2034/) (secondary; BLS page itself not read)

### Inferences
- **Comparison table (synthesized from the definitions above):**

| | Data Analyst | Analytics Engineer | Product/Decision DS (Airbnb Analytics + Inference; Meta Product Analytics) | ML Data Scientist (Airbnb Algorithms) |
|---|---|---|---|---|
| Core question | "What happened / why?" | "Can everyone trust and reuse this data?" | "What should we do, and did it work (causally)?" | "Can we predict or optimize this automatically?" |
| Main output | Dashboards, ad-hoc analyses, reports | dbt models, tests, docs, semantic-layer metrics | Metric definitions, experiment designs and readouts, causal analyses, strategy memos | Trained models, features, offline/online evaluation, sometimes production code |
| Primary tools | SQL, Excel/Sheets, Power BI/Tableau/Looker | SQL, dbt, Git, warehouse (Snowflake/BigQuery/Databricks), orchestration, semantic layer | SQL, Python/R, stats libraries, experimentation platform, notebooks | Python, pandas, scikit-learn, XGBoost/LightGBM, PyTorch, MLflow, cloud |
| Key math | Descriptive stats | Relational modeling (star schema, grain) | Inferential stats, experiment design, causal inference | Probability, linear algebra, ML theory, evaluation |
| Closest neighbour | Product DS (upward), AE (sideways) | Data engineer, analyst | Analyst, economist | ML engineer |

- Overlaps: analyst and AE share SQL and business context; AE and data engineer share pipelines and Git. Product DS and ML DS share Python and statistics. Product DS and analyst share dashboards and metrics. At startups one person often covers analyst + AE + product DS.
- Title inflation: at many companies (Meta especially) "Data Scientist" means the product-analytics/inference role, not ML modeling. Learners should read the job description, not the title.

### Gaps
- I could not read the full dbt Labs "What is analytics engineering" page or the original Airbnb post (both blocked). The quotes are from search snippets.
- No reliable current salary data specific to analytics engineers or product-analytics DS was found. BLS does not separate these titles. No Vietnam-specific market data was researched.

---

## Q2. Skill areas and learning order (skill tree by level), tools, milestone projects

### Takeaway
Across job postings, SQL is the non-negotiable base skill. After it come spreadsheets/BI, statistics and experimentation, Python/pandas, data modeling (dbt/semantic layers), and communication. ML modeling and forecasting come on top. The recommended order is: shared foundation → Data Analyst → branch to either Analytics Engineer (engineering-leaning) or Product DS (statistics-leaning) → ML DS last.

### Cited Findings
- Job-posting analyses (secondary, methodology not independently verified): over 80% of data analyst postings mention SQL, over 60% mention Excel/Sheets, about 50% mention Python or R, and more than half mention BI tools. — [Jobright Blog, Data Analyst Jobs 2026](https://jobright.ai/blog/data-analyst-jobs-2026/) (commercial blog; treat as indicative)
- Another analysis of 1,000+ 2025 postings: Excel + SQL make up ~70% of skill requirements, Tableau + Power BI ~30%, Python + R ~22%. — [M. Adeel, Medium, Sep 2025](https://muhammadadeelai.medium.com/the-2025-data-analyst-skills-hierarchy-what-1-000-job-postings-reveal-about-your-career-path-1c9bbb38b327) (low-authority source; methodology unclear)
- Hiring managers commonly use SQL take-home or live-coding tasks as a hard filter for analyst roles. — [Jobright Blog](https://jobright.ai/blog/data-analyst-jobs-2026/) (secondary)
- Meta product DS interviews centre on product sense + SQL + A/B testing (power, MDE, guardrails). — [DataLemur](https://datalemur.com/blog/meta-data-scientist-interview-guide)
- Analytics engineering skills: SQL transformations, version control, CI, testing, documentation. — [dbt Labs](https://www.getdbt.com/blog/what-is-analytics-engineering)
- Forecasting tooling example: Uber's open-source **Orbit** package (Bayesian time series; DLT/LGT models) decomposes KPIs into trend, seasonality, regression (e.g., marketing channel) effects. Uber used it for marketing budget planning (cost curves, ROAS), payment-fraud detection (Risk team) and multi-year compute/storage capacity planning. — [Uber Blog: Introducing Orbit (May 2021; older)](https://www.uber.com/us/en/blog/orbit/); [GitHub uber/orbit](https://github.com/uber/orbit)

### Inferences
**Skill tree by level (synthesized; the ordering is my recommendation based on the cited demand signals)**

*Level 0 – Shared foundation (all four branches, ~2–3 months)*
1. Spreadsheets: pivot tables, lookups, basic charts.
2. SQL I: SELECT/WHERE/GROUP BY/JOINs, understanding a table's **grain** (what one row represents).
3. Descriptive statistics: mean/median, distributions, variance, percentiles.
4. Python basics + pandas (read, filter, groupby, merge).
5. Business framing: turning a vague question into a metric and a comparison.

*Level 1 – Data Analyst core*
- SQL II: window functions, CTEs, date handling, NULL semantics, deduplication.
- BI: one of Power BI / Tableau / Looker. Build dashboards with drill-downs and a data dictionary.
- Metrics basics: ratio metrics, numerators/denominators, cohorts, funnels, retention.
- Communication: 1-page memo, "so what" charts, clear caveats.
- Milestone: publish a dashboard + memo that answers a real business question from a public dataset.

*Level 2a – Analytics Engineer branch*
- Dimensional modeling (facts/dimensions, star schema, slowly changing dimensions), declared grain, primary-key tests.
- dbt: sources, staging/intermediate/marts, tests (unique, not_null, relationships), docs, macros. Git + pull requests + CI.
- Warehouse concepts (BigQuery/Snowflake/DuckDB), incremental models, cost awareness.
- Semantic layer / metrics layer (dbt Semantic Layer/MetricFlow, Cube, LookML): define metrics once.
- Milestone: a dbt project on a public dataset with 20+ tests, docs site, and a semantic layer consumed by a BI tool.

*Level 2b – Product/Decision Data Scientist branch*
- Inferential stats: hypothesis tests, confidence intervals, power/MDE, multiple testing, bootstrap.
- Experimentation: randomization unit, guardrail metrics, SRM checks, novelty effects, variance reduction (CUPED), sequential testing pitfalls (peeking).
- Causal inference for when you can't randomize: DiD, regression discontinuity, instrumental variables, synthetic control, propensity scores.
- Metric design: North Star / input metrics, metric trees, sensitivity vs. directionality.
- Milestone: full experiment design doc + analysis of a (simulated or public) A/B test, including power calculation and SRM check.

*Level 3 – ML Data Scientist branch*
- ML fundamentals: bias/variance, train/validation/test splits, leakage, cross-validation, calibration, metric choice (AUC vs. precision/recall vs. business cost).
- Models: linear/logistic regression → trees/gradient boosting (XGBoost/LightGBM) → neural nets as needed.
- Forecasting: baselines (naive/seasonal naive), ETS/ARIMA, Prophet/Orbit, global gradient-boosted models, hierarchical reconciliation, backtesting.
- Experiment-based evaluation of models (offline metric ≠ online impact).
- Milestone: an end-to-end model with a leakage audit, baseline comparison, error analysis and an A/B-test plan for deployment.

**Recommended order for the Vietnamese learner (goal: direct/verify AI assistants):** Foundation → Data Analyst → (Product DS stats/experimentation) → Analytics Engineer → ML DS. Reasoning: stats and experimentation are what AI tools get wrong most silently (see Q5/Q6), and verifying ML output depends on the evaluation and leakage concepts learned in the stats track.

**Portfolio projects per branch (4–6 each; suggestions, not sourced)**
- *Data Analyst:* (1) E-commerce sales dashboard (e.g., Olist Brazilian e-commerce dataset on Kaggle) with a KPI dictionary. (2) Cohort retention analysis in SQL. (3) Funnel conversion analysis with segment breakdowns and a Simpson's-paradox check. (4) Excel/Sheets financial model with scenario analysis. (5) "Executive memo" rewriting of an analysis for a non-technical audience. (6) Audit of an AI-generated SQL report: find and fix 3+ planted bugs.
- *Analytics Engineer:* (1) dbt + DuckDB/BigQuery project on the jaffle-shop-style dataset or a public dataset, with staging/marts. (2) Tests + CI with GitHub Actions. (3) Slowly changing dimension (snapshot) implementation. (4) Semantic-layer metrics served to a BI tool. (5) Data-quality incident post-mortem (planted duplicate keys causing fan-out). (6) Cost/performance optimization with incremental models.
- *Product/Decision DS:* (1) A/B test analysis with power analysis, SRM check, CUPED. (2) Metric-tree design for a real app (e.g., Grab/Shopee-style marketplace). (3) Difference-in-differences on a public policy dataset. (4) Synthetic control replication (e.g., Mixtape examples). (5) Experiment-review critique of a published case study. (6) Heterogeneous treatment effect exploration with honest caveats.
- *ML DS:* (1) Churn prediction with leakage audit and cost-based threshold. (2) M5-style hierarchical sales forecast with backtesting vs. seasonal-naive baseline. (3) Credit-risk model with calibration and fairness checks. (4) Recommendation baseline (popularity vs. matrix factorization). (5) Model monitoring/drift notebook. (6) Uplift model tied to an experiment.

### Gaps
- No high-quality (academic or large-vendor) 2025–2026 job-posting skill analysis was found. The two cited analyses are commercial/individual blogs with unclear methodology.
- I did not verify the official dbt Learn curriculum (site blocked).

---

## Q3. How is generative AI changing these roles (2025–2026)? What stays human?

### Takeaway
AI assistance is now the norm: about 70–80% of analytics practitioners use AI for code, and 84% of developers use or plan to use AI tools. But trust is falling. Real-world text-to-SQL on enterprise schemas remains unreliable without curated context: Spider 2.0 success is roughly 10–25% for raw LLMs, and semantic layers or business documentation raise accuracy substantially. The work is shifting from *writing* SQL and boilerplate toward *defining metrics, curating semantic context, reviewing AI output, and owning causal/decision judgments*. Headcount has not shrunk according to the surveys: dbt reports team sizes growing, and BLS projects 34% DS growth.

### Cited Findings
**Adoption surveys**
- dbt Labs 2025 State of Analytics Engineering (survey Oct 8–Dec 27, 2024; n=459; 70% ICs): 70% of analytics professionals use AI to assist code development, 50% use it for documentation, 80% use AI in some way. 30% reported budget growth (vs. 9% the year before). 45% ranked AI tooling their top investment priority, 56% cited poor data quality as the most frequent challenge. Data team sizes are increasing despite displacement fears. — [dbt Labs 2025 report](https://www.getdbt.com/resources/state-of-analytics-engineering-2025); [BigDATAwire, 2025-04-18](https://www.hpcwire.com/bigdatawire/2025/04/18/dbt-labs-report-reveals-how-ai-is-boosting-data-budgets-and-team-growth/); [PR Newswire](https://www.prnewswire.com/news-releases/ai-is-driving-a-surge-in-data-budgets-according-to-new-report-from-dbt-labs-302429579.html)
- dbt Labs 2026 State of Analytics Engineering (released April 2026):
  - 72% of teams prioritize AI-assisted coding and >77% of leaders use it for productivity, but only 24% prioritize AI-assisted pipeline management (testing, observability, quality controls).
  - The share rating "increasing trust in data" as important rose from 66% (2025) to 83% (2026). Speed rose from 50% to 71%.
  - 57% report higher warehouse/compute spend vs. 36% reporting team budget growth.
  - 41% report ambiguous data ownership and 53% cite poor data quality.
  - Headline theme: "AI-driven acceleration is outpacing trust and governance."
  - Sources: [dbt Labs 2026 report](https://www.getdbt.com/resources/state-of-analytics-engineering-2026); [dbt press release](https://www.getdbt.com/blog/new-dbt-labs-report-finds-ai-driven-acceleration-is-outpacing-trust-and-governance); [BigDATAwire, 2026-04-15: "72% of Data Teams Use AI. 71% Fear Bad Data"](https://www.hpcwire.com/bigdatawire/2026/04/15/dbt-labs-report-72-of-data-teams-use-ai-71-fear-bad-data-data-systems-cant-keep-up/)
- Stack Overflow Developer Survey 2025 (49,000+ respondents, 177 countries):
  - 84% use or plan to use AI tools, up from 76% in 2024.
  - 46% distrust AI output accuracy vs. 33% who trust it; only 3% "highly trust" it. Distrust was 31% the prior year.
  - 66% struggle with AI solutions that are "almost right, but not quite."
  - Sources: [Stack Overflow 2025 survey – AI section](https://survey.stackoverflow.co/2025/ai); [Stack Overflow press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/)
- Hex "State of Data Teams" (2026 edition; survey Dec 2025, 65+ data leaders, 80 to 1,000+ employee companies; small sample):
  - The share citing AI as a top goal jumped from 4% to 27% in one year.
  - 52% say AI is "a great tool for builders or a centerpiece of self-serve."
  - Data trust was the #1 AI concern, cited nearly twice as often as any other concern.
  - Sources: [Hex State of Data Teams 2026](https://hex.tech/state-of-data-teams/); [Hex State of Data Teams 2025](https://hex.tech/blog/state-of-data-teams-2025/) (via snippets; blocked)
- Anaconda:
  - 2024 report: 87% of data scientists use AI as much or more than the prior year, but 43% feel unprepared. 49% of companies are adding "AI Data Analyst" roles. — [Anaconda 2024 key findings](https://www.anaconda.com/blog/state-of-data-science-2024-key-findings)
  - 2025 (8th) report (n≈214 engineers/data scientists): only 22% of organizations have strategic AI deployment, data-quality issues derail 45% of scaling efforts, and over half lack an AI governance framework. — [Anaconda 8th Annual State of Data Science & AI](https://www.anaconda.com/resources/report/8th-annual-state-of-data-science)

**Text-to-SQL reality check**
- Spider 2.0 (ICLR 2025 oral) tests real enterprise workflows (large schemas, multiple SQL dialects). o1-preview solved 21.3% of tasks and GPT-4o 10.1%, versus 86.6% for GPT-4o on the older Spider 1.0. The best early results were ~23.8% (Spider 2.0-Snow) and ~23.4% (Spider 2.0-Lite). — [Spider 2.0 paper (ICLR 2025)](https://proceedings.iclr.cc/paper_files/paper/2025/file/46c10f6c8ea5aa6f267bcdabcb123f97-Paper-Conference.pdf); [Spider 2.0 site/leaderboard](https://spider2-sql.github.io/); [GitHub xlang-ai/Spider2](https://github.com/xlang-ai/Spider2). These are early-2025 numbers. The leaderboard has since improved with agentic systems, and I did not verify the current top score.
- Semantic layers improve LLM accuracy:
  - dbt Labs (2023; older) reported 83% accuracy on the "addressable" subset of natural-language questions via its Semantic Layer. Adding natural-language docs moved some questions from 0% to 100% correct. — [dbt Labs, Semantic Layer as the Data Interface for LLMs](https://www.getdbt.com/blog/semantic-layer-as-the-data-interface-for-llms) (snippet)
  - A 2026 dbt Developer Blog benchmark update reportedly shows GPT-5.3-Codex moving from 84.1% (text-to-SQL) to 100% (semantic layer). — [dbt Developer Blog, Semantic Layer vs. Text-to-SQL: 2026 Benchmark Update](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026) (blocked; number from search summary, so verify before use; vendor benchmark)
  - Cube's open benchmark: adding ~4KB of semantic-layer markdown (business conventions, calculated metrics) to the raw DDL raised text-to-SQL accuracy by +17 to +23 percentage points across Claude Opus 4.7, Claude Sonnet 4.6 and GPT-5.4 (paired McNemar tests). — [GitHub cubedevinc/semantic-layer-benchmark](https://github.com/cubedevinc/semantic-layer-benchmark) (vendor benchmark)
- Tooling trend: AI notebook agents (e.g., Hex Notebook Agent writes SQL with schema context and shows intermediate steps). Databricks SQL added native AI functions in 2025 so analysts can call LLMs inside SQL. — [Hex](https://hex.tech/state-of-data-teams/); [Databricks, SQL on the Lakehouse in 2025](https://www.databricks.com/blog/sql-databricks-lakehouse-2025)

### Inferences
- **What gets automated (increasingly):** boilerplate SQL on well-documented models, first-draft pandas/EDA code, chart generation, dbt documentation and tests scaffolding, summarizing results, simple dashboards, translating between SQL dialects.
- **What stays human (and becomes more valuable):**
  1. *Metric definition*: what counts as an "active user" or "revenue," and which denominator. The semantic-layer benchmarks show AI is accurate only once humans have encoded these definitions.
  2. *Grain and join logic on messy real schemas*: Spider 2.0 shows raw-schema accuracy is low.
  3. *Experiment design*: randomization unit, power/MDE, guardrails, stopping rules.
  4. *Causal claims*: whether a correlation supports a decision.
  5. *Data trust and ownership*: dbt 2026 shows trust rising as the top priority, while testing and governance lag AI adoption.
  6. *Framing the business question and communicating uncertainty.*
- The analytics engineer's value is rising: the semantic layer and documentation they build is exactly the context that makes AI-generated SQL correct. For a learner aiming to "direct and verify AI," AE + stats skills give the most leverage.
- For junior analysts, the risk is that routine ad-hoc SQL requests get absorbed by self-serve AI. Differentiation comes from verification skill, domain knowledge and communication. This is my inference; no survey found directly measures junior-analyst hiring changes.

### Gaps
- No rigorous study found that measures productivity or accuracy of analysts using AI text-to-SQL in production (only benchmarks and vendor surveys).
- Current (Sept 2026) Spider 2.0 leaderboard top score not verified.
- No reliable data on whether entry-level analyst hiring has declined because of GenAI.

---

## Q4. Real case studies with measurable outcomes

### Takeaway
The best-documented cases come from experimentation (Bing/Microsoft, Booking.com, Netflix), metric layers (Airbnb Minerva) and forecasting (Uber Orbit, Walmart M5). The consistent lessons: most ideas fail, so you have to test; data-quality checks catch many broken experiments; and metrics must be defined once and centrally.

### Cited Findings
**Microsoft / Bing experimentation**
- A Bing employee's idea to lengthen ad headlines (merging the ad's second line into the title) sat in the backlog for months. An engineer finally A/B tested it: revenue rose 12%, over $100M per year in the US alone, without hurting user-experience metrics. It became the best revenue idea in Bing's history. It first triggered a "too good to be true" alert (Twyman's law in action). — [Kohavi & Thomke, "The Surprising Power of Online Experiments," HBR, Sept 2017](https://hbr.org/2017/09/the-surprising-power-of-online-experiments)
- At Microsoft, only about one third of well-designed experiments aimed at improving a key metric actually improved it. — [Kohavi et al., "Online Experimentation at Microsoft" (2009; older)](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf); [ExP case studies PDF](https://exp-platform.com/Documents/ExP_DMCaseStudies.pdf)
- About 6% of Microsoft experiments exhibit a **sample ratio mismatch** (SRM), varying by product from about 3% to 13–14%. The source paper drew on more than 10,000 experiments across Microsoft, Booking.com, Outreach.io and Online Dialog. — [Fabijan et al., KDD 2019, Diagnosing SRM](https://www.microsoft.com/en-us/research/publication/diagnosing-sample-ratio-mismatch-in-online-controlled-experiments-a-taxonomy-and-rules-of-thumb-for-practitioners/); [Microsoft Research article](https://www.microsoft.com/en-us/research/articles/diagnosing-sample-ratio-mismatch-in-a-b-testing/); [Lukas Vermeer SRM FAQ](https://www.lukasvermeer.nl/srm/docs/faq/)

**Booking.com**
- Booking.com runs 1,000+ concurrent experiments and more than 25,000 tests per year. Its program assumes roughly a 10% success rate at an average ~1% uplift per winning test. Experimentation is "democratized" so product teams run their own tests. — [Booking.com, "Democratizing online controlled experiments at Booking.com" (arXiv 1710.08217, 2017; older)](https://arxiv.org/pdf/1710.08217); [VWO blog on Booking culture](https://vwo.com/blog/cro-best-practices-booking/) (secondary, for the 25,000 and 10% figures)

**Airbnb Minerva (metric/semantic layer)**
- Minerva holds 12,000+ metrics and 4,000+ dimensions, with 200+ data producers across teams. Its principle is "define metrics once, use them everywhere." It takes fact and dimension tables as input, denormalizes them, and serves A/B testing, exploration and dashboards. — [Airbnb Tech Blog, How Airbnb achieved metric consistency at scale (Robert Chang, 2021)](https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70); [Airbnb Tech Blog, How Airbnb standardized metric computation at scale](https://medium.com/airbnb-engineering/how-airbnb-standardized-metric-computation-at-scale-9afe6695b486); [Databricks talk PDF "Democratizing Metrics at Airbnb" (2022)](https://microsites.databricks.com/sites/default/files/2022-07/Democratizing-Metrics-at-Airbnb.pdf); [dbt Analytics Engineering Podcast Ep 1 with Robert Chang](https://roundup.getdbt.com/p/ep-1-robert-chang-on-scaling-metrics)

**Netflix**
- Causal-inference methods in production: DiD, double ML, Bayesian A/B testing, Quasimodo (multi-region quasi-experiments, comparable to Google's CausalImpact). — [Netflix TechBlog survey](https://netflixtechblog.com/a-survey-of-causal-inference-applications-at-netflix-b62d25175e6f); [Key Challenges with Quasi Experiments at Netflix](https://netflixtechblog.com/key-challenges-with-quasi-experiments-at-netflix-89b4f234b852)

**Forecasting: Uber and Walmart**
- Uber Orbit (2021): Bayesian forecasting used for marketing budget planning (ROAS, cost curves), payment-fraud detection and multi-year capacity planning. — [Uber Blog](https://www.uber.com/us/en/blog/orbit/)
- Uber also published extreme-event (holiday) forecasting with LSTMs. — [Uber Blog, Engineering Extreme Event Forecasting (2017; older)](https://eng.uber.com/neural-networks/)
- Walmart M5 competition (2020): forecast 42,840 hierarchical time series (3,049 products; 12 aggregation levels by category, department, store and state), scored by WRMSSE. — [Makridakis et al., M5 accuracy competition: Results, findings, and conclusions, IJF 2022](https://www.sciencedirect.com/science/article/pii/S0169207021001874); [PDF mirror](https://statmodeling.stat.columbia.edu/wp-content/uploads/2021/10/M5_accuracy_competition.pdf)

### Inferences
- These cases map to roles:
  - Bing, Booking and Netflix → Product/Decision DS (experimentation, inference).
  - Airbnb Minerva → Analytics Engineer (metric layer).
  - Uber and Walmart → ML DS (forecasting).
  - Across all of them, the analyst's job is turning these numbers into decisions.
- The low base rate of winning ideas (about one third at Microsoft, ~10% assumed at Booking) plus a 6% SRM rate is the strongest argument that an AI-drafted "the feature worked" analysis must be checked for data-quality and statistical validity before anyone trusts it.

### Gaps
- I could not access the M5 paper's full text to cite exact findings (e.g., that LightGBM-based methods dominated the top ranks and by how much they beat benchmarks). This is widely reported but not verified here.
- No 2025–2026 quantified case study of GenAI/text-to-SQL deployment at a named company with outcome metrics was found.
- No Walmart-internal forecasting results (beyond the M5 dataset) were found.

---

## Q5. Recommended learning resources

### Takeaway
A free-to-cheap path exists for each branch. Analyst: Google Data Analytics certificate + Kaggle Learn SQL/pandas. AE: dbt Learn. Product DS: OpenIntro Statistics, then Kohavi et al. *Trustworthy Online Controlled Experiments*, then *Causal Inference: The Mixtape*. ML/forecasting: Kaggle Learn ML plus Hyndman's *Forecasting: Principles and Practice*.

### Cited Findings
- Google Data Analytics Professional Certificate (Coursera): 9 courses, 180+ hours of instruction, under 6 months at under 10 hrs/week. Graduates can apply to Google and 150+ US employers in its consortium. Google also offers Advanced Data Analytics and Business Intelligence certificates. — [Coursera: Google Data Analytics](https://www.coursera.org/professional-certificates/google-data-analytics); [Google Advanced Data Analytics](https://www.coursera.org/professional-certificates/google-advanced-data-analytics); [Google Business Intelligence](https://www.coursera.org/professional-certificates/google-business-intelligence)
- Coursera also hosts an "Analytics Engineering with dbt" specialization. — [Coursera](https://www.coursera.org/specializations/analytics-engineering-with-dbt)
- *Trustworthy Online Controlled Experiments* by Kohavi, Tang & Xu (Cambridge University Press, 2020) is the standard A/B testing reference. Kohavi was VP of Analysis & Experimentation at Microsoft and also worked at Amazon and Airbnb. — [AB Tasty interview with Ronny Kohavi](https://www.abtasty.com/blog/1000-experiments-club-ronny-kohavi/); [GrowthBook: A/B Testing Best Practices with Ronny Kohavi](https://www.growthbook.io/blog/designing-a-b-testing-experiments-for-long-term-growth)

### Inferences
Suggested sequence (URLs are canonical project URLs from general knowledge; I did not fetch them this session):
1. SQL: Kaggle Learn "Intro to SQL" / "Advanced SQL" (https://www.kaggle.com/learn), plus practice on DataLemur/LeetCode SQL.
2. Analyst: Google Data Analytics certificate (above). Then one BI tool's free official training (Microsoft Learn for Power BI, Tableau Public).
3. Stats: *OpenIntro Statistics* (free PDF, https://www.openintro.org/book/os/).
4. Python/pandas: Kaggle Learn Python + Pandas; *Python for Data Analysis* (Wes McKinney, free online 3rd ed.).
5. AE: dbt Learn "dbt Fundamentals" (https://learn.getdbt.com) + *The Data Warehouse Toolkit* (Kimball) for dimensional modeling.
6. Product DS: Kohavi et al. (2020); Udacity A/B testing (Google); *Causal Inference: The Mixtape* (Cunningham, free at https://mixtape.scunning.com); *Causal Inference for the Brave and True* (Facure, free online).
7. ML DS: Kaggle Learn Intro/Intermediate ML; *An Introduction to Statistical Learning* (free, https://www.statlearning.com); *Forecasting: Principles and Practice* 3rd ed. (Hyndman & Athanasopoulos, free at https://otexts.com/fpp3); M5 dataset on Kaggle for practice.

### Gaps
- Current prices, free-access status and 2025–2026 curriculum changes (e.g., whether Google's certificate added GenAI modules) were not verified. The Coursera page snippet didn't mention an AI module.
- dbt Learn, Kaggle Learn, OpenIntro, Mixtape and FPP3 URLs were not fetched in this session.

---

## Q6. What must these roles be able to critique in AI-generated SQL/analysis? Common mistakes

### Takeaway
AI output fails most often in ways that look plausible ("almost right" is the #1 developer complaint at 66%). The high-value review skills are: checking grain and join fan-out, denominators and NULL handling, metric-definition drift, experiment validity (SRM, peeking, multiple comparisons), aggregation paradoxes (Simpson's), causal overreach, and ML leakage. Most of these are invisible from the code's syntax and require the fundamentals.

### Cited Findings
- 66% of developers struggle with AI solutions that are "almost right, but not quite." 46% distrust AI accuracy. — [Stack Overflow 2025 AI survey](https://survey.stackoverflow.co/2025/ai)
- Enterprise text-to-SQL with raw schemas has low success (GPT-4o 10.1% on Spider 2.0 vs. 86.6% on Spider 1.0). The difficulty comes from large schemas, dialects and multi-step workflows. — [Spider 2.0 (ICLR 2025)](https://proceedings.iclr.cc/paper_files/paper/2025/file/46c10f6c8ea5aa6f267bcdabcb123f97-Paper-Conference.pdf)
- Missing business context (metric conventions) is a large share of text-to-SQL errors. Adding semantic-layer documentation improved accuracy by 17–23 pp. — [Cube semantic-layer-benchmark](https://github.com/cubedevinc/semantic-layer-benchmark)
- About 6% of experiments at Microsoft have SRM, which invalidates naive results. — [Fabijan et al., KDD 2019](https://www.microsoft.com/en-us/research/publication/diagnosing-sample-ratio-mismatch-in-online-controlled-experiments-a-taxonomy-and-rules-of-thumb-for-practitioners/)
- "Too good to be true" results should trigger scrutiny: the Bing +12% result first set off an alert and was validated before acceptance. — [HBR 2017](https://hbr.org/2017/09/the-surprising-power-of-online-experiments)
- Only about 1/3 of ideas improve their target metric, so a prior of "most changes don't work" is appropriate. — [Kohavi et al., Microsoft](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf)
- dbt 2026: only 24% prioritize AI-assisted testing/observability/quality while 72% prioritize AI-assisted coding. Review and testing is the bottleneck. — [BigDATAwire 2026-04-15](https://www.hpcwire.com/bigdatawire/2026/04/15/dbt-labs-report-72-of-data-teams-use-ai-71-fear-bad-data-data-systems-cant-keep-up/)

### Inferences
**Review checklist for AI-generated SQL/analysis** (synthesized from standard practice; concepts supported by the sources above):

*SQL / data modeling (Analyst, AE)*
1. **Join fan-out:** joining a one-row-per-order table to a many-rows-per-order table (e.g., order_items, payments) and then SUMming order revenue inflates totals. Check: compare `COUNT(*)` against `COUNT(DISTINCT key)` before and after the join, and declare the grain.
2. **Wrong denominator:** conversion computed as purchases/sessions instead of purchasers/visitors. Ratio-of-averages vs. average-of-ratios. Users counted in the denominator who were never eligible.
3. **NULL semantics:** `COUNT(col)` vs `COUNT(*)`; `AVG` ignores NULLs; `NOT IN` with NULLs returns nothing; LEFT JOIN turned into an INNER JOIN by a WHERE filter on the right table.
4. **Time issues:** timezone mismatches (UTC vs. Asia/Ho_Chi_Minh), incomplete current period, off-by-one date boundaries (`BETWEEN` with timestamps), late-arriving data.
5. **Duplicates / SCD:** snapshot tables double-counting entities; the "latest record" chosen without a deterministic ORDER BY.
6. **Metric-definition drift:** the AI invents its own "active user" definition instead of using the governed semantic-layer metric.
7. **Filters silently dropped:** test/internal accounts, refunds, cancelled orders.

*Statistics / experimentation (Product DS)*
8. **Simpson's paradox:** an aggregate trend that reverses within segments (e.g., mobile vs. desktop mix shift). Always check key segment breakdowns.
9. **p-hacking / multiple comparisons:** many metrics or segments tested with no correction; post-hoc segment "wins."
10. **Peeking / optional stopping:** repeated significance checks on a fixed-horizon test.
11. **SRM:** check the observed vs. expected assignment ratio with a chi-square test before reading results.
12. **Wrong randomization unit / variance:** randomizing by user but analyzing per session without delta-method or clustered SEs.
13. **Underpowered tests:** "no significant difference" presented as "no effect."
14. **Novelty/primacy effects, network interference** (marketplaces like Grab/Shopee), and guardrail metrics that were never checked.
15. **Causal overreach:** observational correlation reported as an effect; regression "controls" for post-treatment variables; survivorship bias.

*ML / forecasting (ML DS)*
16. **Data leakage:** target-derived features, random split on time series, fitting preprocessing before the split.
17. **Baseline missing:** no comparison against naive/seasonal-naive or logistic regression.
18. **Wrong metric:** accuracy on imbalanced data; MAPE with near-zero actuals; offline AUC gain assumed to become online impact.
19. **Distribution shift / no backtesting:** a single holdout period, no rolling-origin evaluation.

**Common learner mistakes (inferred):**
- Learning tools (Power BI, dbt) before SQL grain/join fundamentals.
- Skipping statistics and jumping to ML.
- Portfolio projects on Titanic/Iris with no business question.
- Trusting AI output that runs without error, when "runs" is not the same as "correct."
- Not writing down metric definitions.
- Presenting findings without uncertainty or caveats.
- Chasing "Data Scientist" titles without checking whether the role is product analytics or ML.

### Gaps
- No empirical study was found that ranks which error types (fan-out, denominator, etc.) are most frequent in LLM-generated SQL specifically. The checklist is based on established practice, not a measured error taxonomy.
- No source was found quantifying Simpson's-paradox or p-hacking incidence in industry analyses.
