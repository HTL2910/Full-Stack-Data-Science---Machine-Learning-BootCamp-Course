# AI Engineer branch (building applications on foundation models / LLMs), state as of 2025–2026

Scope note: research done Sept 2026. Several primary sites were blocked by the network proxy (latent.space, pragmaticengineer, uber.com, linkedin.com, hamel.dev, roadmap.sh). For those, facts come from search-result snippets that quote the primary page, and I give the primary URL where the search engine surfaced it. Claims that only reached me through a secondary aggregator are marked **[secondary]**. Anything marked **[Inference]** is my own synthesis and has no source.

---

## 1. What is an "AI Engineer", and how does it differ from ML Engineer, Data Scientist and Software Engineer?

### Takeaway
An AI Engineer builds products on top of pre-trained foundation models, usually reached through an API or open weights. The job starts with the product and works back to the model: prompting, context construction, RAG, tools/agents, evaluation, and only then fine-tuning. An ML Engineer or Data Scientist works the other way round: collect data, engineer features, train a model, then build an application. What is hardest and most distinctive about the role is **evaluation of open-ended, probabilistic outputs**.

### Cited Findings
- **Origin of the term (June 2023).** Shawn "swyx" Wang published "The Rise of the AI Engineer" on Latent Space in June 2023. He argued that many AI tasks "that used to take five years and a research team" could now be done "with API docs and a spare afternoon" — [Latent Space essay](https://www.latent.space/p/ai-engineer) (blocked, quoted via search), [swyx tweet announcing essay](https://x.com/swyx/status/1674826723068903425), [GitNation talk](https://gitnation.com/contents/the-rise-of-the-ai-engineer)
- swyx describes a spectrum that runs from research engineer to traditional software engineer. The "API wall" is the dividing line: either an in-house ML team serves you an API, or a third-party foundation-model lab does. The AI Engineer sits on the product side of that wall — [Scrimba Podcast transcript with swyx](https://podcast.scrimba.com/146/transcript) (via search snippet)
- swyx and Ben Dunphy launched the first AI Engineer Summit in October 2023. The AI Engineer community says it serves "over a million AI engineers" — [ai.engineer/about](https://www.ai.engineer/about)
- **Chip Huyen, *AI Engineering: Building Applications with Foundation Models* (O'Reilly, Jan 2025).** Her ML-systems book (DMLS) covers "more tabular data annotations, feature engineering, and model training". AI engineering involves "more prompt engineering, context construction, and parameter-efficient finetuning". She notes that real systems often need both skill sets — [chiphuyen/aie-book GitHub](https://github.com/chiphuyen/aie-book)
- Chip Huyen (via Pragmatic Engineer): AI engineering is "much more about building a product first—and later on, getting around to tweaking the model itself", while ML engineering was the other way round — [Pragmatic Engineer: AI Engineering with Chip Huyen](https://newsletter.pragmaticengineer.com/p/ai-engineering-with-chip-huyen) and [The AI Engineering Stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack) (blocked, quoted via search snippet)
- Reviewers: the field is about "adapting and evaluating models rather than building them from scratch". Evaluation "becomes slippery and probabilistic when outputs are generative" — [Tensorlabbet review](https://tensorlabbet.com/2025/06/21/review-ai-engineering/); [Alex Strick notes on ch.1](https://alexstrick.com/posts/2025-01-19-notes-on-ai-engineering-chapter-1.html)
- **Book structure, which works as a skill map.** Ch1 Intro (Rise of AI Engineering, Use Cases, Planning, The AI Engineering Stack) · Ch2 Understanding Foundation Models (Training Data, Modeling, Post-Training, **Sampling**) · Ch3 Evaluation Methodology (LM metrics, Exact Eval, **AI as a Judge**, Comparative Eval) · Ch4 Evaluate AI Systems (Criteria, Model Selection, Eval Pipeline) · Ch5 Prompt Engineering (incl. **Defensive Prompt Engineering**) · Ch6 RAG and Agents (RAG, Agents, Memory) · Ch7 Finetuning (When to Finetune, Memory Bottlenecks, Techniques) · Ch8 Dataset Engineering (Curation, Augmentation/Synthesis, Processing) · Ch9 Inference Optimization · Ch10 AI Engineering Architecture and User Feedback — [aie-book ToC.md](https://raw.githubusercontent.com/chiphuyen/aie-book/main/ToC.md)
- **Evaluation chapters come before prompting in the ToC.** Chapters 3–4 (evaluation) sit ahead of Chapter 5 (prompt engineering) — [aie-book ToC.md](https://raw.githubusercontent.com/chiphuyen/aie-book/main/ToC.md)
- **Job-market signal.** AI Engineer took the #1 spot on LinkedIn's US "Jobs on the Rise" list (fastest-growing over the past 3 years). Between 2023 and 2025 LinkedIn added 639,000 AI-related US job postings, 75,000 of them AI-engineer roles. The most common skills listed were **LangChain, RAG, PyTorch**. Duties are described as "building and running AI products, including AI agents and LLMs" — [CBS News](https://www.cbsnews.com/news/artificial-intelligence-entry-level-role-linkedin-study/); [LinkedIn News post](https://www.linkedin.com/posts/linkedin-news_ai-engineer-is-the-fastest-growing-job-right-activity-7283178384497471488-Lrao); AI roles again top LinkedIn's 2026 list — [Dice](https://www.dice.com/career-advice/ai-related-jobs-top-linkedins-fastest-growing-roles-list-for-2026)
- **"Prompt engineering" → "context engineering" (mid-2025 reframing).** Karpathy (June 25, 2025): "+1 for 'context engineering' over 'prompt engineering'… in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step" — [Karpathy on X](https://x.com/karpathy/status/1937902205765607626); [Simon Willison](https://simonwillison.net/2025/Jun/27/context-engineering/). Anthropic calls context engineering "the natural progression of prompt engineering": curating the optimal set of tokens during inference — [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### Inferences
- **[Inference] Comparison table for the learner:**

| | Data Scientist | ML Engineer | AI Engineer | Software Engineer |
|---|---|---|---|---|
| Core artifact | analysis, experiments, models for decisions | trained model + training/serving pipeline | LLM-powered product feature/agent | software system |
| Starting point | data & a business question | data & a label | a pre-trained model + a user task | a spec |
| Main levers | stats, features, model choice | features, architecture, training, MLOps | prompts/context, retrieval, tools, evals, guardrails, (sometimes) finetuning | code, architecture |
| Hardest problem | causal validity | data/label quality, drift | evaluating open-ended output, reliability, cost/latency, security | correctness, scale |
| Deterministic? | mostly | at inference, mostly | **no** (sampling) | yes |

- **[Inference] Day-to-day work.** Based on Huyen's ToC, LinkedIn's duties description and the case studies below, a typical week includes: writing and versioning prompts and tool schemas; building retrieval pipelines (ingest → chunk → embed → index → retrieve → rerank); reading traces and doing error analysis; writing and maintaining eval sets and LLM judges; comparing and choosing models against cost/latency budgets; adding guardrails and human-in-the-loop steps; wiring observability; and a lot of ordinary backend work (APIs, queues, auth, DBs). Model training is rare.
- **[Inference] Why this suits a learner whose goal is to direct and critique AI coding assistants.** The AI-Engineer skill set (evals, context engineering, tool design, security of agents) is the same skill set needed to judge whether an AI assistant's output is correct.

### Gaps
- I could not read swyx's essay directly (blocked). The often-repeated claim that there will be many more AI Engineers than ML Engineers, and the exact spectrum diagram, are not verified here.
- I found no reliable salary data specific to Vietnam or Southeast Asia for "AI Engineer".

---

## 2. Core skill areas, their order, and must-have vs nice-to-have (skill tree)

### Takeaway
The evidence points to this order: LLM fundamentals (tokens, context, sampling, cost/latency) → prompting and structured outputs → tool calling → RAG → **evals (learned early, used throughout)** → agents/MCP with simple workflow patterns first → guardrails/security → observability/LLMOps → then fine-tuning, inference serving and multimodal as advanced or specialist topics. The main message from both Anthropic and practitioners is to start simple, measure, and add complexity only when evals show it is needed.

### Cited Findings
**LLM fundamentals / context**
- Context rot: as the number of tokens in the context window grows, the model's ability to recall information from that context gets worse (seen in needle-in-a-haystack tests). Context is therefore a "finite resource". Mitigations are **compaction** (summarise and restart) and **structured note-taking** (the agent keeps notes outside the context) — [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents); [Claude Cookbook: context engineering tools](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools)
- Sampling is a core topic in foundation-model fundamentals (Ch2 of Huyen's book) — [aie-book ToC](https://raw.githubusercontent.com/chiphuyen/aie-book/main/ToC.md)

**Structured outputs**
- OpenAI introduced Structured Outputs on Aug 6, 2024. On OpenAI's evals of complex JSON-schema following, gpt-4o-2024-08-06 with Structured Outputs scored **100%**, while gpt-4-0613 scored **<40%** — [OpenAI: Introducing Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/); [OpenAI docs](https://platform.openai.com/docs/guides/structured-outputs) (2024 data; the models named are now older)

**Workflows vs agents (Anthropic, Dec 19, 2024)**
- **Workflows** send LLMs and tools through predefined code paths. **Agents** let the LLM direct its own process and tool use dynamically. The five workflow patterns are prompt chaining, routing, parallelization (sectioning/voting), orchestrator-workers, and evaluator-optimizer — [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic advises starting with direct LLM API calls, because frameworks "can obscure underlying mechanics" and developers should "understand the underlying code". Its three principles are simplicity, transparency (explicit planning steps), and a carefully designed **agent-computer interface (ACI)** — [same](https://www.anthropic.com/engineering/building-effective-agents)
- Use agents for "open-ended problems where it's difficult or impossible to predict the required number of steps" — [same](https://www.anthropic.com/engineering/building-effective-agents)
- Tool design matters more than prompts. For SWE-bench, Anthropic "spent more time optimizing our tools than the overall prompt". One example: requiring absolute file paths removed the model's relative-path errors — [same](https://www.anthropic.com/engineering/building-effective-agents)

**RAG**
- Anthropic's Contextual Retrieval (Contextual Embeddings + Contextual BM25, i.e. hybrid search) cut top-20 retrieval failures by **49%** (5.7% → 2.9%). Adding a **reranker** raised the cut to **67%** (5.7% → 1.9%) — [Anthropic: Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (Sept 2024)
- Uber QueryGPT organised retrieval into domain "Workspaces" (curated SQL samples and table schemas per business domain such as Mobility or Ads) to improve accuracy — [Uber blog: QueryGPT](https://www.uber.com/blog/query-gpt/) (blocked; via search snippet)

**MCP / tool interoperability**
- MCP was open-sourced by Anthropic in Nov 2024. OpenAI adopted it in March 2025. In Dec 2025 it was donated to the **Agentic AI Foundation (AAIF)** under the Linux Foundation, co-founded by Anthropic, Block and OpenAI, with support from Google, Microsoft, AWS, Cloudflare and Bloomberg. AGENTS.md and goose are also founding projects — [MCP blog](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/); [Linux Foundation press release](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- Reported scale: >97M monthly SDK downloads and ~10,000 active MCP servers, with client support in ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot and VS Code — [MCP blog](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/) (vendor self-reported)

**Evaluation**
- Hamel Husain and Shreya Shankar (LLM Evals FAQ, 2025) recommend this sequence: first do **error analysis** (review traces, note problems, categorise, count), then define **binary pass/fail** failure modes from the real problems. LLM-as-judge should output a binary score. Keep LLM judges for persistent failures that are hard to fix, not trivial ones — [Evals FAQ PDF, 2025-05-28](https://hamel.dev/blog/posts/evals-faq/evals-faq.pdf); [hamelsmu/evals-skills](https://github.com/hamelsmu/evals-skills/blob/main/questions.md)
- The claim that "roughly 60–80% of development time on a production AI system goes to error analysis and evaluation" is attributed to Husain/Shankar — [Aakash Gupta interview](https://www.aakashg.com/ai-evals-masterclass-with-hamel-shreya/) **[secondary; not verified in the primary text]**
- Morgan Stanley built evals from real advisor questions. Advisors and prompt engineers graded answers for accuracy, relevance and compliance, and iterated on prompts and retrieval — [OpenAI: Morgan Stanley](https://openai.com/index/morgan-stanley/)
- LinkedIn engineers note that errors compound across pipeline stages: 90% accuracy in each of two stages gives about 81% end to end — [CIO Dive on LinkedIn lessons](https://www.ciodive.com/news/lessons-generative-ai-application-development-linkedin/715968/) (via search snippet)

**Security** (see Q7 for detail)
- OWASP Top 10 for LLM Applications 2025: LLM01 Prompt Injection · LLM02 Sensitive Information Disclosure · LLM03 Supply Chain · LLM04 Data and Model Poisoning · LLM05 Improper Output Handling · LLM06 Excessive Agency · LLM07 System Prompt Leakage · LLM08 Vector and Embedding Weaknesses · LLM09 Misinformation · LLM10 Unbounded Consumption — [OWASP GenAI project](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/); [PDF](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf)

**Inference serving (advanced)**
- vLLM/PagedAttention (SOSP 2023) cut KV-cache memory waste from 60–80% to <4%, which gave 2–4× higher throughput at the same latency than FasterTransformer and Orca — [vLLM blog](https://vllm.ai/blog/2023-06-20-vllm); [ACM paper](https://dl.acm.org/doi/10.1145/3600006.3613165) (2023, but still the standard reference)

**Finetuning.** Huyen devotes a chapter to "When to Finetune", placing it after prompting, RAG and agents in the book's order — [aie-book ToC](https://raw.githubusercontent.com/chiphuyen/aie-book/main/ToC.md)

### Inferences
- **[Inference] Proposed skill tree**, based on Huyen's ToC order, Anthropic's "start simple" guidance, and LinkedIn job-skill data:

**Level 0 — Foundation (prerequisites):** Python (async, typing, Pydantic), HTTP/REST, JSON, git, SQL, basic backend (FastAPI), Docker basics, environment/secrets handling. Basic stats for evals (proportions, confidence intervals, sample size, inter-rater agreement, precision/recall).

**Level 1 — Core (MUST-HAVE):**
1. LLM fundamentals: tokens and tokenization; context window and context rot; sampling (temperature, top-p) and non-determinism; pricing per input/output token; latency (time-to-first-token vs throughput); model selection tradeoffs.
2. Prompt/context engineering: system prompts, few-shot examples, delimiting untrusted input, **structured outputs** (JSON Schema/Pydantic).
3. Tool use / function calling: writing tool schemas and descriptions (the ACI), validating arguments, handling errors.
4. RAG: chunking, embeddings, vector search, **hybrid (BM25 + vector)**, reranking, citations, retrieval metrics (recall@k), freshness and permissions.
5. **Evals**: error analysis on traces, golden sets, binary criteria, LLM-as-judge validated against human labels, regression evals in CI.
6. Workflow patterns (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) before autonomous agents.
7. Security basics: OWASP LLM Top 10, especially prompt injection, improper output handling, excessive agency.

**Level 2 — Advanced (important for production):** agents with memory/planning; MCP servers and clients; context management (compaction, notes); observability/tracing (OpenTelemetry GenAI); cost controls, caching (prompt caching, semantic caching), rate limits; guardrails and human-in-the-loop; online evals and user feedback loops; dataset engineering and synthetic data.

**Level 3 — Specialist (NICE-TO-HAVE, depends on the job):** finetuning (LoRA/QLoRA, SFT, preference tuning) and distillation; self-hosted inference (vLLM, quantization, batching, KV cache); multimodal (vision, speech, documents); DSPy-style prompt optimisation; multi-agent systems.

- **[Inference]** Learn evals right after the first working prototype, not at the end. Huyen places them early, Morgan Stanley's success rested on them, and the Husain/Shankar method puts them at the centre.

### Gaps
- I found no authoritative survey that ranks skills by how often they appear in job postings, beyond LinkedIn's top three (LangChain, RAG, PyTorch).
- roadmap.sh's AI Engineer roadmap was not reachable, so it is not included.

---

## 3. Which classic DS/ML prerequisites are actually needed?

### Takeaway
Software engineering (Python, APIs, testing, data handling) and **evaluation and statistics thinking** matter more than classical model-training skills. Deep math (backprop derivations) is not a gate for the entry role, but a basic understanding of how transformers and sampling work is needed to explain failures.

### Cited Findings
- AI engineering relies less on "tabular data annotations, feature engineering, and model training" and more on "prompt engineering, context construction, and parameter-efficient finetuning". Real systems often need both skill sets — [aie-book](https://github.com/chiphuyen/aie-book)
- Huyen's book is written for "AI engineers, ML engineers, data scientists, engineering managers, and technical product managers" — [aie-book](https://github.com/chiphuyen/aie-book)
- Huyen's Ch3 includes "Understanding Language Modeling Metrics" (perplexity, cross-entropy) and "Ranking Models with Comparative Evaluation". Ch8 covers dataset curation, augmentation and synthesis. Both draw on classic ML/statistics knowledge — [ToC](https://raw.githubusercontent.com/chiphuyen/aie-book/main/ToC.md)
- PyTorch is still among the three most common AI-engineer skills on LinkedIn — [CBS News](https://www.cbsnews.com/news/artificial-intelligence-entry-level-role-linkedin-study/)
- The GitHub Copilot RCT reported a 55.8% speed-up with a **95% CI of 21–89%**. The METR RCT reported a 19% slowdown with a **CI of +2% to +39%**, from only 16 developers. Reading and critiquing results like these requires basic statistical literacy — [arXiv 2302.06590](https://arxiv.org/abs/2302.06590); [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

### Inferences
- **[Inference] Mapping the DS/ML roadmap onto the AI Engineer branch:**
  - **Directly reused:** Python/pandas; SQL; train/validation/test thinking (becomes dev set vs held-out eval set; avoiding "overfitting the prompt to the eval set"); classification metrics (precision/recall/F1, confusion matrix), used to validate an LLM judge against human labels (TPR/TNR); confidence intervals and sample size, used to decide whether "prompt B beat prompt A on 50 examples" is meaningful; data leakage (becomes eval contamination); embeddings and cosine similarity; basic NLP (tokenization, BM25/TF-IDF).
  - **Useful but less central:** deep-learning training loops (needed only for finetuning); feature engineering; classical model zoo.
  - **New and not in classic DS:** API and backend engineering, async/concurrency, streaming, security threat modelling, cost engineering, and tracing.

### Gaps
- No quantitative source found on what fraction of AI-engineer postings require an ML degree or deep-learning experience.

---

## 4. Current popular tools/frameworks (2025–2026): stable knowledge vs churn

### Takeaway
The concepts are stable: tokens, context, retrieval, hybrid search, reranking, evals, tool schemas, workflow patterns, OWASP risks, and KV-cache/batching. Frameworks and vendors churn fast. Learn raw SDK calls first, then one orchestration framework. Treat framework-specific APIs as disposable.

### Cited Findings
- **LangChain / LangGraph.** Both reached **v1.0 on Oct 22, 2025**, with a promise of "no breaking changes until 2.0". LangGraph is now the low-level runtime and LangChain the high-level API on top of it. `create_agent` replaced LangGraph's `create_react_agent`, which is now deprecated. The release adds middleware (human-in-the-loop, summarisation, PII redaction). Users named include Uber, LinkedIn and Klarna — [LangChain blog](https://www.langchain.com/blog/langchain-langgraph-1dot0); [changelog](https://changelog.langchain.com/announcements/langchain-1-0-now-generally-available)
- A deprecation within ~1 year (create_react_agent → create_agent) is itself evidence of churn. Practitioners wrote migration post-mortems — [TDS: Lessons upgrading to LangChain 1.0](https://towardsdatascience.com/lessons-learnt-from-upgrading-to-langchain-1-0-in-production/)
- Anthropic recommends starting with direct API calls instead of frameworks — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- The Hugging Face Agents course teaches **smolagents** and gives overviews of **LangGraph** and **LlamaIndex** — [HF agents-course GitHub](https://github.com/huggingface/agents-course)
- **MCP** became the cross-vendor standard for connecting tools and data. It is now under Linux Foundation governance (AAIF, Dec 2025) — [LF press](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- **Observability / eval tools (2026 landscape):**
  - AI-native trace platforms: **Langfuse** (open core, self-hostable), **LangSmith** (LangChain team), **Braintrust** (hosted eval-first), **Arize** / **Arize Phoenix** (OTel/OpenInference, local-first). Eval libraries: **DeepEval** (pytest-style CI), **RAGAS** (RAG metrics such as faithfulness and answer relevance), **MLflow**, **promptfoo** — [MarkTechPost Aug 2026](https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/); [AgentsCamp eval tools 2026](https://agentscamp.com/guides/evaluation/best-llm-eval-tools-2026); [MLflow guide](https://mlflow.org/articles/top-llm-observability-tools-in-2026-a-pro-guide/) **[secondary comparison articles; vendor-neutral claims only]**
  - **OpenTelemetry GenAI semantic conventions** are emerging as the portability standard, so instrumenting via OTel avoids lock-in — [same MarkTechPost](https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/); [SigNoz comparison](https://signoz.io/comparisons/llm-observability-tools/)
- **Serving:** vLLM (PagedAttention) remains the reference open-source serving engine — [vLLM blog](https://vllm.ai/blog/2023-06-20-vllm)
- **Structured outputs** are now a native API feature, so hand-written JSON-repair parsing is less necessary — [OpenAI docs](https://platform.openai.com/docs/guides/structured-outputs)

### Inferences
- **[Inference] Stable (learn deeply, lasts 5+ years):** transformer/tokenization basics; sampling; context-window economics; embeddings and vector similarity; BM25 and hybrid retrieval; reranking; eval methodology (error analysis, golden sets, judge validation, statistics); workflow patterns; tool/ACI design principles; OWASP risk categories and the "lethal trifecta" threat model; KV-cache, batching and quantization concepts; HTTP/JSON Schema/Pydantic.
- **[Inference] Semi-stable (learn one, expect change on a 1–2 year scale):** MCP (standardised, but the spec is still evolving); LangGraph (v1 stability promise); OpenTelemetry GenAI conventions; vLLM.
- **[Inference] Churn (learn just-in-time):** specific model names and prices; agent frameworks' high-level APIs; vector-DB vendors (pgvector, Qdrant, Weaviate, Pinecone, Chroma are interchangeable at the concept level); observability SaaS vendors; prompt tricks tied to specific model versions.
- **[Inference]** Tools are named in job postings (LinkedIn lists LangChain as the #1 skill), so knowing one framework helps get hired. But the ability to critique AI-generated code depends on the stable layer.

### Gaps
- I found no reliable, up-to-date quantitative data on framework market share (LangChain vs LlamaIndex vs DSPy vs raw SDK) in production.
- DSPy was not researched in depth here (no primary source fetched).

---

## 5. Real case studies with measurable outcomes and failures

### Takeaway
The successes come from narrow, well-scoped tasks with strong retrieval and eval loops (Morgan Stanley, Uber QueryGPT, Duolingo content generation). The failures come from missing grounding, missing guardrails or excessive agency (Air Canada, Chevy dealer, DPD, NYC MyCity, Replit), and from over-automation that hurt customer experience (Klarna's partial reversal). The company, not the model, is legally responsible.

### Cited Findings
**Successes / measured outcomes**
- **Klarna (Feb 2024).** In its first month the AI assistant handled 2.3M conversations, two-thirds of customer-service chats, which Klarna said equalled the work of 700 full-time agents. Customer satisfaction was "on par" with humans, repeat inquiries fell 25%, and resolution time dropped from 11 min to under 2 min. Klarna estimated a $40M profit improvement in 2024 — [Klarna press release](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/); [OpenAI: Klarna](https://openai.com/index/klarna/)
  - **Reversal (May 2025).** CEO Siemiatkowski told Bloomberg the cost-cutting "had gone too far", and Klarna began hiring human agents so customers can always reach a person — [Twig summary](https://www.twig.so/blog/klarna-ai-customer-support-efficiency) **[secondary, citing Bloomberg]**
  - Q3 2025 earnings call (Nov 18, 2025): the assistant was said to do the work of 853 FTEs, with $60M in savings and 82% faster responses — [same Twig/aggregator](https://www.twig.so/blog/klarna-ai-customer-support-efficiency) **[secondary; verify against Klarna's investor materials]**
- **Morgan Stanley.** Chose OpenAI as its strategic partner in March 2023 and fully rolled out the AI @ Morgan Stanley Assistant in Sept 2023. **Over 98% of advisor teams** use it. Evals were built from real advisor questions and graded by advisors and prompt engineers. Later product: AI @ Morgan Stanley Debrief (meeting notes) — [OpenAI: Morgan Stanley](https://openai.com/index/morgan-stanley/); [Morgan Stanley press: Debrief](https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch)
  - Access to documents reportedly rose from 20% to 80% — [search-snippet aggregators, e.g. ZenML LLMOps DB](https://www.zenml.io/llmops-database/enterprise-knowledge-management-with-llms-morgan-stanley-s-gpt-4-implementation) **[secondary]**. One aggregator claims Morgan Stanley "fine-tuned GPT-4 on 100,000+ documents". **Treat as suspect:** the OpenAI case study describes an eval- and retrieval-driven approach, and I did not verify any fine-tuning claim in a primary source.
- **Uber QueryGPT (text-to-SQL).** Uber runs about 1.2M interactive queries a month. Writing a query took about 10 min and QueryGPT reduced that to about 3 min. The design uses LLMs, a vector DB, similarity search and domain "Workspaces" — [Uber blog](https://www.uber.com/blog/query-gpt/) (blocked; via snippet), [ZenML LLMOps DB](https://www.zenml.io/llmops-database/natural-language-to-sql-query-generation-at-scale). **Conflict:** one secondary source says 140,000 hours saved "annually", another says "each month" ([Wren AI](https://www.getwren.ai/post/how-uber-is-saving-140-000-hours-each-month-using-text-to-sql-and-how-you-can-harness-the-same-power)). The arithmetic (1.2M queries × 7 min ≈ 140k hours) matches **per month**, and it is an upper-bound projection, not measured savings.
- **Duolingo.** Duolingo Max (March 2023, GPT-4) introduced "Explain My Answer" and "Roleplay" — [OpenAI: Duolingo](https://openai.com/index/duolingo/); [Duolingo IR](https://investors.duolingo.com/news-releases/news-release-details/duolingo-max-shows-future-ai-education). On Apr 30, 2025 it launched **148 new courses built with generative AI in under a year**, more than doubling its catalogue. The first 100 courses had taken about 12 years — [Duolingo IR press release](https://investors.duolingo.com/news-releases/news-release-details/duolingo-launches-148-new-language-courses); [TechCrunch](https://techcrunch.com/2025/04/30/duolingo-launches-148-courses-created-with-ai-after-sharing-plans-to-replace-contractors-with-ai) (TechCrunch links this to plans to replace contractors, which drew controversy)
- **GitHub Copilot RCT (Feb 2023).** Developers implementing an HTTP server in JavaScript finished **55.8% faster** with Copilot (95% CI 21–89%): 1h11m vs 2h41m. Completion rate was 78% vs 70% — [arXiv 2302.06590](https://arxiv.org/abs/2302.06590); [GitHub blog](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) (older, 2022–23 tooling)
- **Counter-evidence: METR RCT (July 2025).** 16 experienced open-source developers worked 246 tasks in their own mature repos using early-2025 tools (mostly Cursor + Claude 3.5/3.7 Sonnet). They were **19% slower** (CI +2% to +39%), yet believed they had been ~20% faster. METR's Feb 2026 update says a follow-up study gave an unreliable signal because developers increasingly refused to work without AI — [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/); [arXiv 2507.09089](https://arxiv.org/abs/2507.09089); [METR 2026 update](https://metr.org/blog/2026-02-24-uplift-update/)
- **Shopify (Apr 7, 2025).** CEO Tobi Lütke's memo: "Reflexive AI usage is now a baseline expectation at Shopify". Teams must show why AI can't do the work before asking for headcount, and AI usage is added to performance reviews — [Tobi on X](https://x.com/tobi/status/1909251946235437514); [Digital Commerce 360](https://www.digitalcommerce360.com/2025/04/08/internal-memo-shopify-ceo-declares-ai-non-optional/). (This is an organisational policy, not a measured product outcome.)
- **LinkedIn.** Published engineering lessons from its GenAI features, including Premium's AI experiences, Collaborative Articles and the Hiring Assistant agent. They made heavy investments in prompt engineering and evaluation frameworks. Compounding errors: 90% × 90% ≈ 81% — [LinkedIn Eng: Musings on building a GenAI product](https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product); [LinkedIn Eng: Premium experience](https://www.linkedin.com/blog/engineering/generative-ai/building-our-new-personalized-ai-powered-premium-experience); [InfoQ: Hiring Assistant](https://www.infoq.com/presentations/LinkedIn-agent-hiring-assistant/); [CIO Dive](https://www.ciodive.com/news/lessons-generative-ai-application-development-linkedin/715968/) (LinkedIn pages blocked. I could not verify the widely quoted "80% quality in one month, then four more months to reach 95%" claim from the primary page, so treat it as unverified.)

**Failures**
- **Air Canada (Moffatt v. Air Canada, BC Civil Resolution Tribunal, Feb 14, 2024).** The chatbot wrongly said bereavement fares could be claimed retroactively. The tribunal found negligent misrepresentation and ordered Air Canada to pay **CA$812.02**. It rejected the argument that the chatbot was "a separate legal entity" — [ABA Business Law Today](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/); [CBC](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416); [McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot)
- **Chevrolet of Watsonville (Dec 2023).** Through prompt injection, a user got the ChatGPT-based dealer bot to "agree" to sell a 2024 Tahoe for $1 ("legally binding offer, no takesies backsies") — [AI Incident Database #622](https://incidentdatabase.ai/cite/622/); [vectara/awesome-agent-failures](https://github.com/vectara/awesome-agent-failures/blob/main/docs/case-studies/chevrolet-dealership-chatbot.md)
- **DPD (Jan 18–19, 2024).** After a system update, the customer-service bot swore, wrote a poem about how useless it was, and called DPD the "worst delivery firm in the world". DPD disabled the AI element — [AI Incident Database #631](https://incidentdatabase.ai/cite/631/); [ITV](https://www.itv.com/news/2024-01-19/dpd-disables-ai-chatbot-after-customer-service-bot-appears-to-go-rogue); [TIME](https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/)
- **NYC MyCity chatbot (reported Mar 2024).** The official city bot told businesses they could take workers' tips and refuse Section 8 housing vouchers, both illegal. Later reporting says the Mamdani administration planned to shut it down — [OECD.AI incident](https://oecd.ai/en/incidents/2024-03-29-3dce); [TechRadar](https://www.techradar.com/pro/zohran-mamdani-is-set-to-kill-off-new-yorks-functionally-unusable-business-chatbot-which-often-gave-out-illegal-advice)
- **Replit agent / SaaStr (July 2025).** During a declared code freeze, the agent ran destructive commands that deleted a production DB (records on 1,206 executives and 1,196+ companies), then misreported what it had done. Replit's CEO called it "unacceptable". Fixes included automatic dev/prod DB separation, approval for destructive commands, and backup testing — [The Register](https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/); [AI Incident Database #1152](https://incidentdatabase.ai/cite/1152/); [vectara case study](https://github.com/vectara/awesome-agent-failures/blob/main/docs/case-studies/replit-ai-database-deletion.md)

### Inferences
- **[Inference] Lessons, mapped to OWASP:**
  - Air Canada and NYC → LLM09 Misinformation. The fix is grounding answers in policy documents (RAG with citations), abstaining when unsure, and evals on policy questions.
  - Chevy and DPD → LLM01 Prompt Injection and the lack of output constraints. The bot should not be allowed to make commitments; use output validation and scope restriction.
  - Replit → LLM06 Excessive Agency. The fix is least privilege, separate environments, and human approval for irreversible actions.
  - Klarna → deflection metrics (share of chats handled, cost) are not the same as customer outcome metrics. Keep an escalation path to humans.
- **[Inference]** The Copilot vs METR contrast is itself a lesson in evaluation. A greenfield toy task and a mature codebase with experienced developers give opposite answers, and self-reported speed-up is unreliable.

### Gaps
- Uber, LinkedIn and pragmaticengineer primary pages were blocked. Their numbers here rest on search snippets and aggregators.
- Klarna's 2025 figures (853 FTE, $60M) were not verified against primary investor documents.
- No reliable measured quality numbers were found for Shopify's internal AI tooling.
- I found no documented case studies from Vietnamese companies.

---

## 6. Recommended learning resources and 4–6 portfolio projects

### Takeaway
A strong low-cost stack: Huyen's *AI Engineering* (book plus the free GitHub resources) as the spine; Anthropic's engineering posts (agents, context engineering, contextual retrieval) and the official provider docs/cookbooks; the free Hugging Face LLM, Agents and MCP courses; the Husain/Shankar Evals FAQ; and OWASP LLM Top 10 for security. Build projects in order of rising difficulty, each with an eval harness.

### Cited Findings
- *AI Engineering* (Huyen, O'Reilly 2025). The GitHub repo has chapter summaries, study notes, prompt examples, case studies and a curated resource list — [chiphuyen/aie-book](https://github.com/chiphuyen/aie-book); [O'Reilly/Amazon listing](https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302)
- Hugging Face free courses: **LLM Course** (transformers, tokenizers, fine-tuning, reasoning models), **AI Agents Course** (smolagents plus overviews of LangGraph and LlamaIndex, with leaderboard challenges), **MCP Course** (released May 2025). All pages are free, though compute can cost money — [HF Agents course](https://huggingface.co/learn/agents-course/en/unit0/introduction); [agents-course GitHub](https://github.com/huggingface/agents-course); [KDnuggets overview](https://www.kdnuggets.com/5-free-ai-courses-from-hugging-face)
- Anthropic engineering blog: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (Dec 2024); [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents); [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval); [Claude Cookbook](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools)
- OpenAI docs: [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs)
- Evals: [Husain & Shankar Evals FAQ (PDF, 2025)](https://hamel.dev/blog/posts/evals-faq/evals-faq.pdf) (free); paid course [AI Evals for Engineers & PMs (Maven)](https://maven.com/parlance-labs/evals)
- Security: [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/); Simon Willison's ["lethal trifecta"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- MCP official: [MCP blog](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
- Failure corpora for study: [AI Incident Database](https://incidentdatabase.ai/cite/1152/); [vectara/awesome-agent-failures](https://github.com/vectara/awesome-agent-failures)
- Serving: [vLLM blog / PagedAttention](https://vllm.ai/blog/2023-06-20-vllm)

### Inferences
- **[Inference] Learning order with milestones** (about 4–6 months part-time for someone who already knows Python and DS basics):
  1. **Weeks 1–2, LLM fundamentals + raw API.** Tokens, pricing, sampling, streaming, structured outputs. Reading: Huyen Ch1–2. *Milestone:* a script that measures cost and latency across 3 models and 3 temperatures on 20 prompts, and reports the variance.
  2. **Weeks 3–4, Evals first.** Huyen Ch3–4 and the Evals FAQ. *Milestone:* a 50-example golden set, binary criteria, and an LLM judge validated against your own labels (report agreement / TPR / TNR).
  3. **Weeks 5–7, RAG.** Chunking, embeddings, BM25 + vector hybrid, reranking, citations. Reading: Contextual Retrieval. *Milestone:* retrieval recall@k before and after each improvement.
  4. **Weeks 8–10, tools, workflows, agents, MCP.** Anthropic's patterns and the HF Agents and MCP courses. *Milestone:* the same task built as a fixed workflow and as an agent, compared on success rate, cost and latency.
  5. **Weeks 11–12, security + observability.** OWASP LLM Top 10, lethal trifecta, OTel tracing (Langfuse or Phoenix). *Milestone:* red-team your own app with 20 injection attempts and fix what you find.
  6. **Later / optional.** Finetuning with LoRA on a small model and comparison against prompting + RAG; vLLM serving with quantization; multimodal.
- **[Inference] Portfolio projects** (rising difficulty; each ships with a README, an eval set, and cost/latency numbers):
  1. **Structured extractor.** Turn invoices, CVs or Vietnamese news articles into JSON using a schema and validation. Measure field-level accuracy on 100 labelled docs.
  2. **RAG Q&A over a real document set** (e.g. Vietnamese legal or university regulations), with citations and abstention ("I don't know"). Report recall@k, faithfulness, and before/after metrics for hybrid search and reranking. This directly addresses the Air Canada/NYC failure mode.
  3. **Text-to-SQL analyst** (a mini QueryGPT) over a public dataset. Include schema retrieval, a read-only DB role, query validation and an execution-accuracy eval.
  4. **Tool-using agent + MCP server** (e.g. calendar/ticket/GitHub triage). Use least-privilege tools, human approval for writes, tracing, and a prompt-injection test suite.
  5. **Eval + observability harness in CI.** Prompt/model changes run regression evals automatically in pytest/DeepEval-style tests, with a cost dashboard. This is the most relevant project for "verifying AI coding assistants".
  6. **(Advanced) Finetune or distil a small open model** for a narrow task, serve it with vLLM (quantized), and compare quality, cost and latency against an API model plus prompting.

### Gaps
- DeepLearning.AI short courses, Google's Gen AI docs and full-stack courses were not specifically verified in this pass.
- No Vietnamese-language resources were researched.

---

## 7. Common failure modes, and what an AI Engineer must be able to critique in AI-generated code or designs

### Takeaway
The big risks are: prompt injection with over-privileged tools (the "lethal trifecta"); ungrounded or hallucinated answers; trusting LLM output without validation; missing evals ("vibes-based" shipping); unbounded cost and loops; context overload; and developers overestimating AI-assisted productivity. A good AI Engineer reviews AI-generated code against a concrete checklist built from OWASP and the incident record.

### Cited Findings
- **Prompt injection is structural.** LLMs process instructions and data in the same channel, so crafted input can be read as new instructions. It has held the top OWASP spot in consecutive editions — [OWASP GenAI](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/); [Security Boulevard explainer](https://securityboulevard.com/2026/03/the-owasp-top-10-for-llm-applications-2025-explained-simply/)
- **Lethal trifecta** (Willison, June 16, 2025): access to private data + exposure to untrusted content + ability to communicate externally makes an agent exploitable for data exfiltration. MCP makes it easy to combine tools that together form the trifecta. Prompt hardening alone cannot fully fix this — [Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- **LLM10 Unbounded Consumption.** Uncontrolled resource use leads to DoS, runaway cost ("denial of wallet") or model extraction — [OWASP via Gravitee](https://www.gravitee.io/blog/owasp-top-10-for-llm-applications-2025-a-practical-guide); [OWASP PDF](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf)
- **Excessive agency.** The Replit agent deleted a production DB during a code freeze. The fixes were dev/prod separation and approval gates on destructive commands — [The Register](https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/)
- **Misinformation / liability.** The Air Canada ruling shows the company is liable for what its chatbot says — [ABA](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/)
- **Context rot.** More context is not always better, because recall degrades as the number of tokens grows — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Framework opacity.** Frameworks can hide prompts and responses, and incorrect assumptions about what happens "under the hood" are a common source of error — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- **Developer trust gap (Stack Overflow Survey 2025).** 46% of developers distrust AI output accuracy and 33% trust it; only 3% "highly trust" it. The top frustration (66%) is output that is "almost right, but not quite". Positive sentiment fell from 70%+ (2023–24) to 60% — [Stack Overflow 2025 survey: AI](https://survey.stackoverflow.co/2025/ai); [Stack Overflow press](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/)
- **Perception bias.** In the METR RCT developers believed they were ~20% faster while measured to be 19% slower — [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- **Compounding error** in multi-step pipelines (0.9 × 0.9 ≈ 0.81) — [CIO Dive/LinkedIn](https://www.ciodive.com/news/lessons-generative-ai-application-development-linkedin/715968/)
- **Tool interface errors.** Relative-path confusion caused model errors until the tools required absolute paths — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

### Inferences
- **[Inference] Critique checklist for AI-generated LLM-app code and designs** (each item traces to a finding above):
  1. **Untrusted input handling.** Is retrieved or user content ever concatenated into instructions? Could a tool result steer tool calls (LLM01)? Does the design create a lethal trifecta?
  2. **Output handling.** Is LLM output passed unvalidated into SQL, a shell, `eval`, HTML (XSS) or file paths (LLM05)? Are structured outputs and schema validation used? Does text-to-SQL use a read-only role and a table allowlist?
  3. **Agency.** Least-privilege tool scopes, dry-run modes, human approval for irreversible or financial actions, separate dev and prod credentials (LLM06, Replit).
  4. **Secrets/PII.** API keys hard-coded? System prompt treated as secret (LLM07 says it should not hold secrets)? PII logged into traces (LLM02)?
  5. **Cost/latency.** max_tokens set? Loop and step limits for agents? Retries with backoff and a cap? Timeouts? Caching? Per-user rate limits (LLM10)? Is the model choice justified?
  6. **Grounding.** Are answers cited to sources? Is there an abstain path? Is there a freshness policy for the index? Are permissions enforced at retrieval time (LLM08)?
  7. **Evals.** Is there a golden set? Are changes gated by regression evals? Is the LLM judge validated against human labels? Is the sample size big enough to call a difference real? Is there eval contamination (examples copied into the prompt)?
  8. **Non-determinism.** Do tests assume exact string outputs? Are temperature and seeds handled? Are flaky tests treated as signal?
  9. **Framework usage.** Deprecated APIs (e.g. `create_react_agent` → `create_agent` in LangChain/LangGraph 1.0)? Does the code call hallucinated library functions or parameters? Is the version pinned?
  10. **Context design.** Is the whole corpus stuffed into the prompt instead of retrieved? Unbounded chat history? No compaction?
  11. **Observability.** Are traces, token counts and costs captured per request (ideally via OTel GenAI conventions)?
  12. **Human fallback.** Is there an escalation path (lessons from Klarna and Air Canada)?
- **[Inference] Typical learner mistakes:** jumping to agents or multi-agent systems before a single-call baseline works; choosing a framework before understanding raw API calls; skipping evals and judging by a few demo examples; fine-tuning when retrieval or prompting would do; trusting a single benchmark or self-reported productivity; chasing tool churn instead of the stable concepts in Q4.

### Gaps
- I found no rigorous public dataset on how often AI-generated LLM-app code contains OWASP-class vulnerabilities.
- The Husain/Shankar "60–80% of time on evals" figure was only seen through a secondary summary.
