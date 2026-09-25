# Data Engineer Career Branch (incl. AI-era data engineering for ML/LLM systems), 2025–2026

Research date: 2026-09-25. Audience: Vietnamese learner on a Data Science & ML roadmap whose main goal is to understand fundamentals well enough to direct, verify and critique AI coding assistants.

Method note: several primary sites were blocked by the research proxy (uber.com, hudi.apache.org, joereis.substack.com, martin.kleppmann.com). For those, figures come from search-engine extracts of the primary page. The URL given is the primary page, but I could not open the full text. These figures are marked "(search extract)". Conceptual background with no fetched source is placed under **Inferences** and labelled "background knowledge", as the research rules require.

---

## 1. Definition, scope, how it differs from Analytics Engineer / ML Engineer, and day-to-day work

### Takeaway
A data engineer owns the **data engineering lifecycle**: generating data, storing it, ingesting it, transforming it and serving it to analysts, ML models and now LLM/agent systems. Beneath the lifecycle run "undercurrents": security, data management, DataOps, architecture, orchestration and software engineering. In 2026 the job is shaped less by tooling and more by organizational problems (pressure to move fast, unclear ownership) and by trust in data as AI speeds up how much gets produced.

### Cited Findings
- *Fundamentals of Data Engineering* (Reis & Housley, O'Reilly, June 2022) is built around the "data engineering lifecycle": data generation, storage, ingestion, transformation, and serving data to end users. Undercurrents run beneath these stages, and the book also covers cloud economics, data models, schema and security. — [O'Reilly book page](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/); [Xebia summary](https://xebia.com/blog/fundamentals-of-data-engineering/)
- The book aims to show how to "stitch together a variety of cloud technologies to serve the needs of downstream data consumers" and to teach concepts "regardless of the underlying technology". — [Amazon listing](https://www.amazon.com/Fundamentals-Data-Engineering-Robust-Systems/dp/1098108302)
- Joe Reis's 2026 State of Data Engineering survey (n = 1,101, published Feb 2026): 82% of data engineers use AI tools daily or more, and only 3.7% find them unhelpful. At the organization level, 64% are still experimenting or using AI only for tactical tasks. — [2026 State of Data Engineering (Joe Reis)](https://joereis.substack.com/p/the-2026-state-of-data-engineering) (search extract); interactive data: [survey explorer](https://joereis.github.io/practical_data_data_eng_survey/)
- Same survey: the top pain point is "pressure to move fast" (59%), followed by "lack of ownership" (51%). The main bottlenecks are legacy systems (25%), lack of leadership direction (21%) and poor requirements (19%). — [Joe Reis 2026 survey](https://joereis.substack.com/p/the-2026-state-of-data-engineering) (search extract)
- dbt Labs 2026 State of Analytics Engineering (n = 363, surveyed 5 Dec 2025 – 1 Feb 2026): 72% prioritize AI-assisted coding, but only 24% prioritize AI-assisted pipeline management (testing and observability). 53% still cite poor data quality and 41% ambiguous data ownership. "Increasing trust in data" rose from 66% (2025) to 83% (2026). 57% report higher warehouse/compute spend, against only 36% reporting team budget growth. — [dbt Labs press release](https://www.getdbt.com/blog/new-dbt-labs-report-finds-ai-driven-acceleration-is-outpacing-trust-and-governance); [BigDATAwire summary](https://www.hpcwire.com/bigdatawire/2026/04/15/dbt-labs-report-72-of-data-teams-use-ai-71-fear-bad-data-data-systems-cant-keep-up/); [report page](https://www.getdbt.com/resources/state-of-analytics-engineering-2026)

### Inferences
- **Role boundaries** (background knowledge, synthesized from the lifecycle framing above):
  - **Data Engineer (DE):** builds and operates ingestion, storage, compute and orchestration. Owns reliability, freshness, cost and security of pipelines. Works "left" of the warehouse (sources, CDC, streaming, lake/lakehouse) and in the platform itself.
  - **Analytics Engineer (AE):** works mostly *inside* the warehouse. Turns raw tables into tested, documented, business-ready models using SQL/dbt, a semantic layer or metrics. The core skills are dimensional modeling and business logic, not infrastructure. The dbt "State of Analytics Engineering" report is this role's reference survey.
  - **ML Engineer (MLE):** productionizes models (training pipelines, feature stores, serving, monitoring). Consumes the DE's data and overlaps on feature pipelines. In the LLM era, the DE ↔ MLE/AI-engineer overlap is the RAG ingestion/indexing pipeline and the curation of training/eval datasets.
- **Typical day-to-day** (background knowledge): triage failed or late DAG runs and data-quality alerts. Add or modify a source connector (API, CDC from an OLTP database, event stream). Write or review SQL/dbt models and PRs. Handle schema changes from upstream teams. Run backfills. Tune partitioning, clustering or file compaction for cost and speed. Answer "why does this number differ?" questions. Manage access and PII policies.
- The 2026 surveys suggest the differentiator is no longer writing pipeline code, which AI now speeds up for most practitioners. It is modeling, testing, ownership and trust. This matches the learner's goal of being able to verify AI output.

### Gaps
- I found no reliable 2025–2026 salary or job-count data specific to Vietnam for data engineers in this pass.
- I could not open the full Joe Reis survey post. Data-modeling approach breakdowns (Kimball vs One Big Table vs Data Vault) were not captured.

---

## 2. Core concepts, skill tree by level, and learning order

### Takeaway
Learn in this order: SQL and data modeling → Python → Linux/shell/Git/Docker → batch ETL/ELT with an orchestrator → a cloud warehouse and dbt → lakehouse and open table formats → Spark → streaming (Kafka/Flink) → data quality/contracts, governance/lineage, FinOps and DataOps/CI. This is also the order the DataTalksClub DE Zoomcamp follows. The concepts (idempotency, partitioning, modeling, delivery semantics) outlast any specific tool.

### Cited Findings
- **DE Zoomcamp 2026 module order:** (1) Containerization & IaC with Docker, Docker Compose, Terraform and GCP. (2) Workflow orchestration with Kestra. Workshop 1: data ingestion with dlt. (3) Data warehousing with BigQuery. (4) Analytics engineering with dbt, DuckDB and BigQuery. (5) Data platforms with Bruin. (6) Batch processing with Apache Spark. (7) Streaming with Kafka, Kafka Streams, KSQL and Avro. Then a final project with peer review; a certificate requires completing the project in a live cohort. The repo lists the next cohort as starting January 2027. — [DataTalksClub/data-engineering-zoomcamp (GitHub)](https://github.com/DataTalksClub/data-engineering-zoomcamp)
- The course is described as 7 weeks of modules plus 3 weeks of final project. Module 1 gets 2 weeks because environment setup is the hardest part. The orchestration module covers scheduling, retries and backfills into GCS and BigQuery. — [DataTalksClub docs: DE Zoomcamp](https://datatalksclub.github.io/docs/courses/data-engineering-zoomcamp/); [curriculum](https://datatalksclub.github.io/docs/courses/data-engineering-zoomcamp/curriculum/)
- The Fundamentals of DE lifecycle gives the conceptual order: generation → storage → ingestion → transformation → serving, plus undercurrents. — [O'Reilly](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/)
- **Airflow 3.0** has been GA since 22 April 2025. It is the biggest change since 2.0 and adds DAG versioning (older Airflow always ran the latest code even for past runs, causing "execution drift"), first-class **assets** (data-aware scheduling), a Task Execution API for remote execution, and a new React UI. — [Apache Airflow blog](https://airflow.apache.org/blog/airflow-three-point-oh-is-here/); [release notes](https://airflow.apache.org/docs/apache-airflow/3.0.0/release_notes.html)

### Inferences
**Skill tree** (background knowledge organized for this learner; tools marked [stable] or [churn]):

**Foundation (≈ 2–3 months)**
- SQL [stable]: joins, GROUP BY, window functions, CTEs, NULL semantics, set operations, reading EXPLAIN plans. Practice until you can spot a join fan-out (duplicate-inflated sums) on sight.
- Data modeling [stable]: normalization (3NF) for OLTP versus dimensional modeling for OLAP. **Kimball**: business process → declare the grain → dimensions → facts. Star schema versus snowflake schema. Fact types: transaction, periodic snapshot, accumulating snapshot. Conformed dimensions. **SCD** Type 1 (overwrite), Type 2 (new row with valid_from/valid_to/is_current), Type 3 (previous-value column). Surrogate versus natural keys.
- Python [stable]: data structures, functions, typing, virtualenv/uv, requests/JSON, pandas, then Polars. pytest.
- Linux/shell/Git [stable]: bash, pipes, cron, env vars, ssh, file permissions, Git branching and PRs.
- Docker [stable] and basic networking.

**Core (≈ 3–4 months)**
- ETL vs ELT; batch vs streaming; full vs incremental loads; CDC (Debezium) [stable concept].
- Orchestration: Airflow 3 [stable, dominant], Dagster (asset-centric), Prefect, Kestra [churn among the newer ones]. Concepts: DAG, idempotent tasks, retries, backfills, sensors, SLAs.
- Cloud warehouse: BigQuery / Snowflake / Redshift. Columnar storage, partitioning and clustering, separation of storage and compute, and pricing models (bytes scanned versus credits).
- dbt [stable-ish, now part of Fivetran]: models, refs, tests, snapshots (SCD2), incremental models, docs and lineage.
- File formats: CSV vs JSON vs Parquet/Avro. Compression. Small-file problems.
- Cloud basics (one of GCP/AWS/Azure): object storage, IAM, VPC, Terraform.

**Advanced (≈ 4–6 months and beyond)**
- Lakehouse and open table formats: Delta Lake, Apache Iceberg, Apache Hudi. Snapshots and time travel, ACID on object storage, schema/partition evolution, compaction, catalogs (Unity Catalog, Polaris/Iceberg REST).
- Spark [stable]: lazy evaluation, partitions, shuffles, skew, broadcast joins, AQE.
- Streaming: Kafka (topics, partitions, consumer groups, offsets, retention, schema registry), Flink or Spark Structured Streaming. Event time vs processing time, watermarks, late data, exactly-once vs at-least-once.
- Data quality and contracts: dbt tests, Great Expectations/Soda, freshness/volume/schema/distribution monitors, and data contracts at the producer boundary.
- Governance and lineage: catalogs, OpenLineage, RBAC/ABAC, column masking, PII tagging, retention/GDPR-style deletes.
- FinOps: cost per query or pipeline, warehouse auto-suspend, partition pruning, cutting unnecessary compute.
- DataOps/CI: dev/staging/prod environments, CI running dbt build on changed models (slim CI), data diffs, IaC, code review.

### Gaps
- No authoritative source was found for how long each stage "should" take. The month estimates above are my inference.

---

## 3. Key takeaways from *Fundamentals of Data Engineering* and *Designing Data-Intensive Applications*

### Takeaway
Read FoDE first for the map: the lifecycle, its undercurrents, and choosing technology by trade-off rather than hype. Read DDIA, now in a 2nd edition (March 2026, Kleppmann & Riccomini), for the mechanics: storage engines, replication, partitioning, transactions, batch/stream processing and consistency. That mechanical knowledge is what lets you judge whether AI-generated designs are correct.

### Cited Findings
- FoDE (June 2022) connects the end-to-end lifecycle. It argues that people struggle not with individual tools but with "how to assemble these components into a coherent whole". — [O'Reilly](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/); [Goodreads](https://www.goodreads.com/en/book/show/61218623-fundamentals-of-data-engineering)
- DDIA 2nd edition by Martin Kleppmann **and Chris Riccomini** was published by O'Reilly in March 2026. It covers relational DBs, NoSQL, data warehouses, data lakes, cloud versus on-prem services and embedded databases. Its focus is trade-offs in scalability, consistency, reliability, efficiency and maintainability. — [O'Reilly DDIA 2e](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/); [Kleppmann announcement](https://martin.kleppmann.com/2026/03/24/designing-data-intensive-applications-2e.html) (page blocked; date taken from the URL)
- The 1st edition (2017) is older information. Prefer the 2e for cloud, warehouse and lake content. — [O'Reilly DDIA 2e](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/)

### Inferences
- **FoDE learner takeaways** (background knowledge):
  1. Think in lifecycle stages plus undercurrents, not tools.
  2. Choose "reversible decisions" and avoid premature complexity.
  3. Understand total cost of ownership and cloud economics.
  4. Security and data management are part of the job, not add-ons.
  5. Serve the downstream consumer: analytics, ML or reverse ETL.
- **DDIA learner takeaways** (background knowledge from the 1st edition's structure):
  1. Reliability, scalability and maintainability as design goals.
  2. Data models and query languages.
  3. Storage engines: LSM-trees vs B-trees; row vs column storage, which explains why Parquet and warehouses are fast for analytics.
  4. Encoding and schema evolution: Avro/Protobuf, forward/backward compatibility.
  5. Replication and replication lag.
  6. Partitioning/sharding and hot spots.
  7. Transactions and isolation levels.
  8. Distributed-system pitfalls: clocks, partial failures.
  9. Batch processing (MapReduce → dataflow engines) and stream processing (logs, CDC, event sourcing, exactly-once via idempotence).
- For an AI-assisted learner, DDIA's chapters on encoding/evolution, stream processing and idempotence map directly onto the critique checklist in section 8.

### Gaps
- The exact chapter-level changes in DDIA 2e could not be verified because Kleppmann's page was blocked.

---

## 4. Tools in 2025–2026, stable vs churn, the modern data stack's evolution, and single-node DuckDB/Polars

### Takeaway
The "modern data stack" of 2016–2022 (many point tools around a cloud warehouse) is **consolidating**. Fivetran and dbt Labs merged in 2026. Databricks bought Tabular (the Iceberg creators) in 2024. Open table formats, especially Iceberg, plus REST catalogs are becoming the shared layer. Meanwhile, single-node engines (DuckDB, Polars) cover most real workloads. Stable: SQL, Parquet, Spark, Kafka, Airflow, the major warehouses, and table-format concepts. Churn: ingestion SaaS, newer orchestrators, observability vendors, and AI/agent tooling.

### Cited Findings
- **Fivetran + dbt Labs**: all-stock merger announced 13 Oct 2025 and **completed 1 June 2026**. George Fraser is CEO and Tristan Handy President. The combined company is near **$600M ARR** and serves more than **80,000 data teams**. It is positioned as an open ingestion + transformation + metadata layer built on SQL and Iceberg, competing with Snowflake, Databricks and Microsoft Fabric. The dbt Fusion engine is part of dbt Core v2.0 (alpha, Apache 2.0). — [Fivetran press release](https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents); [dbt Labs blog](https://www.getdbt.com/blog/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents); [TechTarget](https://www.techtarget.com/data-technologies/news/366643590/Fivetran-DBT-Labs-complete-merger-to-form-data-layer-for-AI)
- Analysts read the merger as a move away from tool sprawl toward integrated stacks. — [Everest Group](https://www.everestgrp.com/convergence-of-the-data-stack-what-the-dbt-fivetran-merger-signals-blog/)
- **Databricks acquired Tabular for over $1B** (June 2024). Tabular was founded by Iceberg's creators, Ryan Blue and Dan Weeks, who built it at Netflix. Snowflake and Confluent also bid. The deal was announced during Snowflake's summit, where Snowflake launched the **Polaris** open Iceberg catalog, a rival to Databricks Unity Catalog. Tabular had about 40 employees. — [CNBC](https://www.cnbc.com/2024/06/04/databricks-is-buying-data-optimization-startup-tabular.html); [TechTarget](https://www.techtarget.com/searchdatamanagement/news/366588032/Databricks-1B-plus-Tabular-acquisition-adds-Iceberg-support); [SiliconANGLE](https://siliconangle.com/2024/06/04/databricks-acquires-tabular-big-move-close-compatibility-gap-apache-iceberg/)
- **Airflow 3.0** GA on 22 April 2025 with DAG versioning, assets, a remote Task Execution API and a new UI. The search extract also mentions Airflow 3.3.0 adding a state store for tasks and assets (not verified on the primary page). — [Apache Airflow blog](https://airflow.apache.org/blog/airflow-three-point-oh-is-here/)
- **DuckDB**: on 9 Oct 2025, v1.4 LTS reached #1 on ClickBench (top open-source system in hot runs, behind the closed research prototype Umbra). 1.4.0 LTS added database encryption and `MERGE`. — [MotherDuck Oct 2025 newsletter](https://motherduck.com/blog/duckdb-ecosystem-newsletter-october-2025/); [MotherDuck OLAP comparison](https://motherduck.com/learn/fastest-olap-databases-compared/) (vendor source; treat benchmark claims with care)
- **Polars benchmark (PDS-H, May 2025)**: at SF-10 and SF-100, Polars and DuckDB are "an order of magnitude faster than Dask and PySpark" on a single node. — [Polars benchmarks](https://pola.rs/posts/benchmarks/) (vendor-run benchmark)
- **"Big Data is Dead"** (Jordan Tigani, ex-BigQuery, MotherDuck CEO, Feb 2023, older): among heavy users of a cloud warehouse, median data storage was well under 100 GB. Queries usually touch recent data. The thesis is that *big compute* (distributed processing) is unnecessary for about 99% of workloads, not that big datasets don't exist. — [MotherDuck: Big Data is Dead](https://motherduck.com/blog/big-data-is-dead/) (vendor with a stake in the thesis)
- dbt 2026 report: 57% of organizations report rising warehouse/compute spend, so cost is a first-class concern. — [dbt Labs](https://www.getdbt.com/blog/new-dbt-labs-report-finds-ai-driven-acceleration-is-outpacing-trust-and-governance)

### Inferences
- **Stable, learn deeply:** SQL; dimensional modeling; Parquet/columnar storage; one warehouse (BigQuery is the easiest free start); Spark; Kafka concepts; Airflow; dbt; one open table format (Iceberg is the de facto interop standard after the Tabular deal and Polaris; Delta if you work in Databricks); Docker; Terraform; one cloud.
- **Churn, learn on demand:** SaaS ingestion tools (Fivetran, Airbyte, dlt), newer orchestrators (Dagster, Prefect, Kestra, Bruin, Mage), observability vendors, semantic layers, vector DB products, agent frameworks.
- **Stack evolution** (background knowledge):
  - Hadoop/Hive on-prem (≈2008–2015).
  - Cloud warehouse + ELT "modern data stack" (Snowflake/BigQuery/Redshift + Fivetran + dbt + Looker, ≈2016–2022).
  - Lakehouse with open table formats and a separate catalog, with multiple engines over the same data (2020–now).
  - Consolidation plus an "AI-ready data" framing (2024–2026).
- For learners: default to DuckDB or Polars locally for anything under about 100 GB. Reach for Spark only when data or organizational constraints require it. An AI assistant that proposes a Spark cluster for 2 GB of CSVs is a red flag.

### Gaps
- No neutral (non-vendor) 2025–2026 market-share survey of warehouses or orchestrators was captured.
- Snowflake's and Databricks' 2025–2026 acquisitions (e.g., Postgres-related deals) were not verified in this pass.

---

## 5. Real case studies with numbers, and data-quality incidents

### Takeaway
Hyperscale companies built the table formats and streaming systems everyone now uses (Uber → Hudi, Netflix → Iceberg, LinkedIn → Kafka), in each case to get freshness and correctness at scale. Incidents like Unity (2022, about $110M) and PHE (2020, about 16k missing COVID cases) show that ingesting bad data unchecked and choosing formats and limits carelessly cause real business and public harm.

### Cited Findings
**Uber: Apache Hudi / transactional data lake**
- Hudi was created at Uber in 2016 for incremental processing on Hadoop. It became an Apache Top-Level Project (Uber blog, June 2020). — [Uber: Building a large-scale transactional data lake with Hudi](https://www.uber.com/us/en/blog/apache-hudi-graduation/); [Uber: original Hoodie post](https://www.uber.com/us/en/blog/hoodie/)
- Uber blog, Jan 2026 (search extract): the world's largest Hudi deployment. About **6 trillion rows ingested per day**, **~350 logical PB** on HDFS + GCS, ~**10 PB/day ingested** with over **3 PB/day written** to the lake. Tables exceed 400 billion rows under continuous update. **~350,000 commits/day** and **~70,000 table-service operations/day**. Hudi powers tens of thousands of datasets. Many teams need data accurate "within minutes, not hours". — [Uber: Apache Hudi at Uber – Trillion-Record-Scale](https://www.uber.com/us/en/blog/apache-hudi-at-uber/) (page blocked; figures from search extract)
- March 2023: Uber's Global Data Warehouse team runs a petabyte-scale, centrally modeled lake with incremental ETL on Hudi. — [Uber: Incremental ETL using Hudi](https://www.uber.com/us/en/blog/ubers-lakehouse-architecture/)

**Netflix: Apache Iceberg**
- Iceberg was created at Netflix by Ryan Blue and Dan Weeks, who later founded Tabular, which Databricks bought for over $1B in 2024. — [CNBC](https://www.cnbc.com/2024/06/04/databricks-is-buying-data-optimization-startup-tabular.html)
- AWS re:Invent 2023 (NFX306): Netflix described moving an exabyte-scale data lake from Hive to Iceberg-only, migrating about **1.5 million Hive tables** and roughly **300 PB** off Hive. Custom tooling included secure Iceberg tables and an Iceberg REST catalog. — [AWS video page](https://aws.amazon.com/video/watch/3db41488539/); [Class Central listing](https://www.classcentral.com/course/youtube-aws-re-invent-2023-netflix-s-journey-to-an-apache-iceberg-only-data-lake-nfx306-405862) (the 1.5M/300 PB figures come from secondary summaries of the talk, e.g. [Factor House](https://factorhouse.io/resources/iceberg/use-cases/netflix/); verify against the video)

**LinkedIn: Apache Kafka (older, 2019–2022)**
- Kafka was created at LinkedIn. In 2015 it passed 1.1 trillion messages/day. — [Confluent blog](https://www.confluent.io/blog/apache-kafka-hits-1-1-trillion-messages-per-day-joins-the-4-comma-club/)
- In 2019 LinkedIn handled **over 7 trillion messages/day** across 100+ clusters, 4,000+ brokers, 100,000+ topics and 7 million partitions. — [LinkedIn Engineering: How LinkedIn customizes Kafka for 7 trillion messages per day](https://www.linkedin.com/blog/engineering/open-source/apache-kafka-trillion-messages)

**Airbnb: data quality program (Midas, Minerva, DQ Score)**
- Midas certification has four reviews: Spec, Data (quality checks), Code, and Minerva (source-of-truth metric definitions in Airbnb's metrics service). Airbnb says certified models take much longer to build. It certifies only critical subsets and uses a **Data Quality Score** to extend the principles across the warehouse. — [Airbnb Tech Blog: Data Quality Part 2](https://medium.com/airbnb-engineering/data-quality-at-airbnb-870d03080469); [Data Quality Score](https://medium.com/airbnb-engineering/data-quality-score-the-next-chapter-of-data-quality-at-airbnb-851dccda19c3); [Minerva: metric consistency](https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70)

**Incident: Unity Software, 2022 (bad data into ML)**
- Unity's ML ad-targeting tool Audience Pinpointer lost accuracy after ingesting **bad data from a large customer**, which cost Unity part of its training data. Unity estimated a **~$110M impact on 2022**, about 8% of the ~$1.4B expected 2022 revenue. The news (10 May 2022) triggered a roughly 33% stock drop. The problem was noticed only after revenue fell. — [Monte Carlo: bad data quality examples](https://montecarlo.ai/blog-bad-data-quality-examples); [Arize: When AI attacks earnings](https://arize.com/blog/when-ai-attacks-earnings/); Unity's SEC filing, Q2 2022 8-K exhibit: [SEC](https://www.sec.gov/Archives/edgar/data/1810806/000181080622000052/a2022q2ex-991.htm) (the $110M estimate originated in the Q1 2022 results; Monte Carlo and Arize are vendors whose products address this problem)

**Incident: Public Health England, Oct 2020 (format and row limits)**
- **15,841 positive COVID cases** (25 Sep – 2 Oct 2020) were left out of national statistics and contact tracing. The pipeline used the legacy **.XLS** format, whose sheet limit is about 65k rows; the modern .xlsx limit is 1,048,576. Up to **~48,000 contacts** may not have been traced in time. — [The Register](https://www.theregister.com/2020/10/05/excel_england_coronavirus_contact_error/); [Digital Health](https://www.digitalhealth.net/2020/10/how-using-excel-may-have-caused-thousands-of-unreported-covid-cases/); [The Conversation](https://theconversation.com/why-you-should-never-use-microsoft-excel-to-count-coronavirus-cases-147681). Note: one secondary source attributes the loss to the 1,048,576-row limit ([encyclopedia-excel](https://www.encyclopedia-excel.com/uk-covid-cases-lost-excel-row-limit)). Most reporting blames the older XLS format (about 65k rows), so treat the exact limit as disputed.

**Aggregate cost of bad data**
- Gartner: poor data quality costs organizations **at least $12.9M per year on average**. This is a 2020 figure (older), based on reference customers of data-quality vendors, so it is likely biased upward. — [Gartner data quality topic page](https://www.gartner.com/en/data-analytics/topics/data-quality)

### Inferences
- Pattern across the cases: Hudi and Iceberg both exist because plain Hive-on-files could not provide upserts, ACID, fast metadata or schema evolution at scale. Kafka exists because point-to-point integrations did not scale. The incidents share one pattern: nothing checked the data before it was used (volume or row-count reconciliation, schema/distribution checks, input validation for ML training).
- Teaching use: pair each tool with the failure it prevents, e.g. Iceberg snapshots → rollback after a bad write; row-count reconciliation → PHE; training-data validation and drift monitoring → Unity.

### Gaps
- I could not open Uber's 2026 blog for cost or freshness *improvement* numbers (before/after). The 2023 incremental-ETL post's efficiency numbers were also not captured.
- Netflix's 1.5M-table/300 PB figures come from secondary summaries, not the talk transcript.
- No current (2024–2026) LinkedIn Kafka volume figure was found. The 7T/day figure is from 2019.

---

## 6. Learning resources and 4–6 portfolio projects of increasing difficulty

### Takeaway
One free spine (DataTalksClub DE Zoomcamp), two books (FoDE, then DDIA 2e), official docs for dbt, Airflow, Spark, Kafka and Iceberg/Delta, and the Kimball techniques cover the path. Portfolio projects should each demonstrate a specific *property* (idempotency, SCD2, incremental loads, streaming correctness, data quality, cost), not just "it runs".

### Cited Findings
- DataTalksClub DE Zoomcamp (free; Docker/Terraform/GCP → Kestra → dlt → BigQuery → dbt/DuckDB → Bruin → Spark → Kafka → final project with peer review). — [GitHub repo](https://github.com/DataTalksClub/data-engineering-zoomcamp); [course page 2026](https://courses.datatalks.club/de-zoomcamp-2026/); [FAQ](https://datatalksclub.github.io/faq/data-engineering-zoomcamp.html)
- DataTalksClub also runs free ML, MLOps, LLM and AI Dev Tools Zoomcamps, which are natural follow-ons for the ML roadmap. — [DataTalks.Club course guide](https://datatalks.club/blog/guide-to-free-online-courses-at-datatalks-club.html)
- Books: *Fundamentals of Data Engineering* — [O'Reilly](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/); *DDIA 2e* (2026) — [O'Reilly](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/)
- Official docs to read: Airflow 3 — [airflow.apache.org](https://airflow.apache.org/blog/airflow-three-point-oh-is-here/); Databricks guide to an unstructured-data pipeline for RAG — [Databricks docs](https://docs.databricks.com/aws/en/generative-ai/tutorials/ai-cookbook/quality-data-pipeline-rag)
- Company blogs worth following for case studies: Uber ([Hudi](https://www.uber.com/us/en/blog/apache-hudi-at-uber/)), Airbnb ([data quality](https://medium.com/airbnb-engineering/data-quality-at-airbnb-870d03080469)), LinkedIn ([Kafka](https://www.linkedin.com/blog/engineering/open-source/apache-kafka-trillion-messages)).

### Inferences
**Suggested portfolio ladder** (my synthesis; each project names the property to prove):
1. **SQL + dimensional model, local (DuckDB).** Take a public dataset (e.g., NYC taxi, the Zoomcamp dataset, or Vietnamese e-commerce/open-government CSVs). Design a star schema with a declared grain. Write 15 analytic queries with window functions. *Prove:* correct grain, no join fan-out, and documented assumptions.
2. **Batch ELT with an orchestrator.** API or CSV → object storage (Parquet, partitioned by date) → BigQuery or Postgres → dbt staging/marts, run by Airflow 3 or Dagster in Docker. *Prove:* idempotent reruns (the same date rerun twice gives the same result), a backfill of 30 days, and dbt tests (unique, not_null, relationships, accepted_values).
3. **Change data and SCD2.** Postgres OLTP → CDC (Debezium) or daily snapshots → dbt snapshots or `MERGE` into an SCD2 customer dimension. *Prove:* point-in-time correct joins of facts to dimension versions, and deletes and late updates handled.
4. **Lakehouse with an open table format + Spark.** Land raw data into Iceberg or Delta on S3/GCS/MinIO. Run a Spark job with partitioning and compaction. Demonstrate schema evolution, time travel and a rollback of a bad write. *Prove:* partition pruning (bytes scanned before and after), small-file compaction, and cost notes.
5. **Streaming.** Kafka (or Redpanda) → Flink or Spark Structured Streaming → Iceberg or a warehouse. Use event-time windows with watermarks, inject late and duplicate events, and deduplicate with keys. *Prove:* the delivery semantics you chose and why, and the results under replay.
6. **AI-era capstone: RAG ingestion/indexing pipeline.** Documents (PDF/HTML) → parse → chunk → embed → vector store (pgvector, or a lakehouse table plus a vector index), with incremental re-indexing driven by content hashes. Use stable chunk IDs, doc versions, deletion propagation, ACL metadata and PII redaction. Add an eval set to measure retrieval quality before and after changes. *Prove:* re-running is cheap and idempotent, an embedding-model change is handled as a migration, and PII never reaches the index.
- Each project README should include: an architecture diagram, data contract/schema, tests, a cost estimate, a failure-mode section, and "what I rejected from the AI assistant and why".

### Gaps
- No Vietnam-specific curated DE resources or datasets were researched in this pass.

---

## 7. How GenAI/LLMs change data engineering: vector pipelines, unstructured data, data for RAG and training

### Takeaway
LLMs add a new class of pipeline: **unstructured document → parsed elements → chunks → embeddings → vector index**. It needs the same discipline as classic ETL (incremental processing, stable IDs, lineage, access control, quality tests) plus new concerns: embedding-model versioning, chunking strategy and retrieval evaluation. At the same time, AI coding tools are now used daily by most data engineers, but testing and governance have not kept pace, so the risk of "fast but untrusted" data is rising.

### Cited Findings
- The RAG indexing pipeline turns source documents into chunks and embeddings stored in a vector database. Databricks calls this data pipeline "the foundation of any RAG application with unstructured data". — [Databricks docs: quality data pipeline for RAG](https://docs.databricks.com/aws/en/generative-ai/tutorials/ai-cookbook/quality-data-pipeline-rag); [Azure Databricks version](https://learn.microsoft.com/en-us/azure/databricks/agents/tutorials/ai-cookbook/quality-data-pipeline-rag)
- The Databricks community guide explains why chunking decisions set the granularity the retriever can find. — [Databricks community: chunking strategies](https://community.databricks.com/t5/technical-blog/the-ultimate-guide-to-chunking-strategies-for-rag-applications/ba-p/113089)
- Unstructured.io's production guidance:
  - Reliable systems need **incremental indexing, not periodic rebuilds**. Detect changes with a trustworthy last-modified marker, falling back to **content hashing**.
  - Keep **stable chunk IDs** (derived from document ID + location) and **document versions**, so you can purge old versions and audit "what the model saw".
  - Connectors should keep source identifiers and **access rules**. Parsers should keep layout signals (titles, tables).
  - Changing the embedding model usually means re-embedding the corpus. **Treat embedder changes as schema migrations.**
  - [Unstructured: RAG best practices](https://unstructured.io/insights/rag-systems-best-practices-unstructured-data-pipeline); [RAG pipeline challenges](https://unstructured.io/insights/rag-pipeline-challenges-from-data-ingestion-to-retrieval) (vendor source)
- Cost framing: incremental embedding pipelines exist to avoid "melting your cloud bill" from full re-embeds. — [NStarX blog](https://nstarxinc.com/blog/from-data-lake-to-rag-factory-the-technical-view-building-incremental-embedding-pipelines-without-melting-your-cloud-bill/) (vendor blog)
- The Fivetran–dbt merger is explicitly marketed as "data infrastructure for trusted AI agents". The data-platform market is repositioning around AI-ready data. — [Fivetran press](https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents)
- AI-assisted DE work: 82% use AI tools daily ([Joe Reis 2026](https://joereis.substack.com/p/the-2026-state-of-data-engineering), search extract). 72% prioritize AI coding but only 24% AI-assisted testing and observability ([dbt Labs 2026](https://www.getdbt.com/blog/new-dbt-labs-report-finds-ai-driven-acceleration-is-outpacing-trust-and-governance)).
- The Unity 2022 incident shows training data as a failure point: bad customer data degraded a production ML model and cost about $110M. — [Monte Carlo](https://montecarlo.ai/blog-bad-data-quality-examples)

### Inferences
- **What changes for the DE** (synthesis):
  1. Unstructured data (PDF, HTML, images, audio transcripts) becomes a first-class source. Parsing and OCR quality is now a data-quality dimension.
  2. New artifacts need lineage: chunk → document version → source ACL, and embedding → model version.
  3. Access control must flow into retrieval (row- or document-level permissions as metadata filters). Otherwise RAG leaks data users shouldn't see.
  4. Deletion and retention ("right to be forgotten") must propagate to vector indexes and derived training sets.
  5. Training/fine-tuning data curation (dedup, decontamination against eval sets, licensing/provenance, PII scrubbing) is ETL with extra rules.
  6. Evaluation datasets are data products with versioning.
  7. Semantic layers and metric definitions matter more when LLM agents write SQL: an agent without governed metric definitions will produce plausible but wrong numbers.
- What stays the same: idempotency, incremental processing, schema contracts, tests, observability and cost control. These are exactly the skills the dbt 2026 survey shows teams under-investing in.

### Gaps
- No rigorous (non-vendor) benchmark numbers on chunking strategies or re-indexing costs were captured.
- No primary-source case study with measured outcomes for an enterprise RAG ingestion pipeline was found in this pass.

---

## 8. What a DE must be able to critique in AI-generated pipelines/SQL, and common mistakes

### Takeaway
AI assistants produce pipelines that look right on the happy path. The reviewer's job is to check the properties that only fail later: idempotency and reruns, late and duplicate data, schema evolution, partitioning and cost, NULL and join semantics, PII and security, and testing and observability. The 2026 surveys show exactly this gap: fast AI-assisted code generation with weak testing and governance.

### Cited Findings
- 72% of teams prioritize AI-assisted coding against only 24% for AI-assisted testing and observability. 53% cite poor data quality. Rising compute spend (57%) outpaces team budgets (36%). — [dbt Labs 2026](https://www.getdbt.com/blog/new-dbt-labs-report-finds-ai-driven-acceleration-is-outpacing-trust-and-governance)
- "Pressure to move fast" (59%) is the top DE pain point. — [Joe Reis 2026](https://joereis.substack.com/p/the-2026-state-of-data-engineering) (search extract)
- Airflow before 3.0 applied the latest DAG code even to past runs ("execution drift"). Reviewers should know whether a backfill runs old or new logic. — [Airflow 3 blog](https://airflow.apache.org/blog/airflow-three-point-oh-is-here/)
- Embedding-model changes require corpus re-embedding and should be handled as migrations. RAG pipelines need stable IDs, versioning and ACL propagation. — [Unstructured](https://unstructured.io/insights/rag-systems-best-practices-unstructured-data-pipeline)
- Legacy format and size limits silently dropped about 16k records at PHE. Validate row counts end to end. — [The Register](https://www.theregister.com/2020/10/05/excel_england_coronavirus_contact_error/)
- Unvalidated input data corrupted ML training at Unity (about $110M). — [Arize](https://arize.com/blog/when-ai-attacks-earnings/)

### Inferences
**Review checklist for AI-generated pipelines/SQL** (synthesized; background knowledge grounded in the cited incidents):

1. **Idempotency and reruns.** Does running the job twice for the same logical date produce identical output? Red flags: `INSERT` without `MERGE`/dedup keys, "append" into targets, `CURRENT_DATE()`/`now()` instead of the run's logical date, non-deterministic `ROW_NUMBER()` without a tiebreaker. Is the load a partition overwrite or an upsert keyed on a natural/business key?
2. **Incremental logic and late data.** Is the high-water mark based on event time or ingestion time? Is there a lookback window for late-arriving records? Streaming: are watermarks, allowed lateness and dedup by event ID defined? What delivery semantics are assumed (at-least-once plus idempotent sink, or exactly-once)?
3. **Schema evolution and contracts.** What happens when upstream adds, renames or changes a column type? Avoid `SELECT *` into production tables. Pin schemas (Avro/Protobuf with a registry, dbt contracts). Know whether the table format supports additive evolution, and how rename or partition changes are handled.
4. **Grain and join correctness.** Is the grain declared? Can joins fan out (many-to-many) and inflate SUM/COUNT? Are LEFT JOIN filters in `WHERE` quietly turning it into an INNER JOIN? Are `NULL`s handled in `NOT IN`, in comparisons, and in `COUNT(col)` vs `COUNT(*)`? Timezones and DST? Is SCD2 joined with point-in-time conditions (`valid_from <= event_ts < valid_to`)?
5. **Partitioning, clustering and file layout.** Is the partition key actually used in filters (pruning)? Watch for over-partitioning (millions of small files) and functions on partition columns that disable pruning. Check that compaction is scheduled.
6. **Cost blowups.** Look for full-table scans in scheduled jobs, `SELECT *` on wide columnar tables, cross joins, unbounded retries, streaming jobs with no auto-scale limits, warehouses without auto-suspend, and full re-embeds of an entire corpus. Estimate bytes scanned or credits before merging; BigQuery dry-run is a good habit.
7. **Data quality and observability.** Look for tests on keys (unique/not null), referential integrity, accepted values, row-count reconciliation source vs target, freshness SLAs, and anomaly checks on volume and distribution. Check that failures page someone and do not silently pass.
8. **PII, security and governance.** Watch for credentials in code (use a secret manager) and over-broad IAM roles. PII should be masked, hashed or tokenized before analytics and RAG layers. Logs must not dump raw rows. Access rules should propagate into vector-store metadata filters. Deletion must propagate (GDPR/Vietnam's personal-data rules) to derived tables, backups, training sets and embeddings. Watch for SQL injection in dynamically built queries. Is lineage recorded?
9. **Operability.** Retries with backoff, timeouts, alerting, clear ownership, runbooks, backfill strategy, and dev/prod separation. CI should run tests on changed models.
10. **Right-sizing.** Is Spark or Kafka justified, or would DuckDB/Polars plus a daily batch do? Remember the "Big Data is Dead" argument ([MotherDuck](https://motherduck.com/blog/big-data-is-dead/)).

**Common learner/junior mistakes** (background knowledge):
- Tool-hopping instead of mastering SQL and modeling.
- Building pipelines without tests or idempotency.
- Choosing streaming when hourly batch meets the SLA.
- Ignoring cost until the bill arrives.
- CSV/Excel as interchange formats (the PHE lesson).
- One-big-table everywhere without declaring the grain.
- Not versioning schemas or embeddings.
- Trusting AI-generated SQL because it runs and "looks reasonable" without reconciling against a known total.

### Gaps
- I found no published, quantified study of error rates in AI-generated SQL or pipelines specific to data engineering in this pass. The checklist is expert synthesis, not survey-backed.
- Vietnam's personal data protection regulation (Decree 13/2023 and the later PDP Law) was not researched here. The reference above is a pointer only.
