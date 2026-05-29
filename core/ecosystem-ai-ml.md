# AI/ML in Open Source — Frameworks, Models, Data & Governance — Universal Reference

> A comprehensive global reference covering open source AI/ML frameworks, models, datasets,
> tooling, governance, ethical considerations, policy, and contribution best practices.
>
> **Version:** 2026-05-19 | **Maintainer:** Hermes Agent OSS Reference Library
> **License:** CC0-1.0 (public domain) — freely share, adapt, and redistribute.

---

## Table of Contents

1. [Part 1: OSS AI/ML Framework Landscape](#part-1-oss-aiml-framework-landscape)
   - [1.1 Deep Learning Frameworks](#11-deep-learning-frameworks)
   - [1.2 ML Pipelines & Orchestration](#12-ml-pipelines--orchestration)
   - [1.3 LLM Frameworks](#13-llm-frameworks)
   - [1.4 Reinforcement Learning](#14-reinforcement-learning)
   - [1.5 Time Series](#15-time-series)
   - [1.6 Computer Vision](#16-computer-vision)
   - [1.7 NLP](#17-nlp)
   - [1.8 Audio / Speech](#18-audio--speech)
   - [1.9 Framework Comparison Tables](#19-framework-comparison-tables)
2. [Part 2: Open Models & Weights](#part-2-open-models--weights)
   - [2.1 Open-Weight Model Families](#21-open-weight-model-families)
   - [2.2 Model Licensing Deep-Dive](#22-model-licensing-deep-dive)
   - [2.3 Model Cards & Documentation](#23-model-cards--documentation)
   - [2.4 Model Distribution](#24-model-distribution)
   - [2.5 Fine-Tuned & Merged Model Ecosystem](#25-fine-tuned--merged-model-ecosystem)
   - [2.6 Quantization & Optimization](#26-quantization--optimization)
   - [2.7 Open Model Benchmarks](#27-open-model-benchmarks)
3. [Part 3: Open Datasets](#part-3-open-datasets)
   - [3.1 Dataset Licensing](#31-dataset-licensing)
   - [3.2 Dataset Discovery Platforms](#32-dataset-discovery-platforms)
   - [3.3 Synthetic Data Generation](#33-synthetic-data-generation)
   - [3.4 Privacy in Datasets](#34-privacy-in-datasets)
   - [3.5 Dataset Documentation](#35-dataset-documentation)
   - [3.6 Curation & Quality Assessment](#36-curation--quality-assessment)
4. [Part 4: AI/ML Governance & Ethics](#part-4-aiml-governance--ethics)
   - [4.1 Responsible AI Frameworks](#41-responsible-ai-frameworks)
   - [4.2 AI Safety in OSS](#42-ai-safety-in-oss)
   - [4.3 Open Source AI Regulation](#43-open-source-ai-regulation)
   - [4.4 US Executive Order on AI](#44-us-executive-order-on-ai)
   - [4.5 Transparency Requirements](#45-transparency-requirements)
   - [4.6 Bias Detection & Mitigation](#46-bias-detection--mitigation)
   - [4.7 Reproducibility in ML Research](#47-reproducibility-in-ml-research)
5. [Part 5: MLOps & Infrastructure](#part-5-mlops--infrastructure)
   - [5.1 Experiment Tracking](#51-experiment-tracking)
   - [5.2 Feature Stores](#52-feature-stores)
   - [5.3 Model Serving](#53-model-serving)
   - [5.4 Model Registries](#54-model-registries)
   - [5.5 Data Version Control](#55-data-version-control)
   - [5.6 CI/CD for ML](#56-cicd-for-ml)
   - [5.7 GPU/TPU Scheduling](#57-gputpu-scheduling)
   - [5.8 Monitoring](#58-monitoring)
6. [Part 6: Contributing to AI/ML OSS Projects](#part-6-contributing-to-aiml-oss-projects)
   - [6.1 ML Contributions](#61-ml-contributions)
   - [6.2 Data Contributions](#62-data-contributions)
   - [6.3 Documentation](#63-documentation)
   - [6.4 Benchmarks](#64-benchmarks)
   - [6.5 Testing ML Code](#65-testing-ml-code)
   - [6.6 Reproducibility](#66-reproducibility)
   - [6.7 CI for ML Projects](#67-ci-for-ml-projects)
7. [Part 7: Open Source AI Policy & Advocacy](#part-7-open-source-ai-policy--advocacy)
   - [7.1 Open vs Closed AI Models](#71-open-vs-closed-ai-models)
   - [7.2 OSI's Open Source AI Definition](#72-osis-open-source-ai-definition)
   - [7.3 Government AI Policy Affecting OSS](#73-government-ai-policy-affecting-oss)
   - [7.4 Coalition for Open AI](#74-coalition-for-open-ai)
   - [7.5 Foundation Models & Regulatory Compliance](#75-foundation-models--regulatory-compliance)
8. [Part 8: Templates](#part-8-templates)
   - [8.1 Model Card Template](#81-model-card-template)
   - [8.2 Dataset Card Template](#82-dataset-card-template)
   - [8.3 ML Experiment Tracking Setup Guide](#83-ml-experiment-tracking-setup-guide)
   - [8.4 GPU CI/CD Pipeline Template](#84-gpu-cicd-pipeline-template)
   - [8.5 Model Release Checklist](#85-model-release-checklist)
   - [8.6 ML Reproducibility Checklist](#86-ml-reproducibility-checklist)
   - [8.7 AI Ethics Review Checklist](#87-ai-ethics-review-checklist)
   - [8.8 Benchmark Submission Template](#88-benchmark-submission-template)
9. [References & Further Reading](#9-references--further-reading)

---

## Part 1: OSS AI/ML Framework Landscape

### 1.1 Deep Learning Frameworks

The deep learning framework landscape is dominated by three major open-source ecosystems:
PyTorch, TensorFlow, and JAX. Each has distinct design philosophies, governance models,
and community cultures.

#### PyTorch

- **Initial Release:** September 2016 (v0.1), stable 1.0 in December 2018
- **Governance:** Originally Facebook AI Research (now Meta); moved to the Linux Foundation
  as part of the PyTorch Foundation in September 2022
- **License:** BSD-3-Clause (core framework); individual submodules may vary
- **Design Philosophy:** Imperative, Pythonic, eager execution by default with
  `torch.compile` for JIT optimization since PyTorch 2.0 (December 2022)
- **Key Strengths:** Research-friendly, dynamic computation graphs, excellent debugging,
  largest model ecosystem (Hugging Face primarily targets PyTorch)
- **GPU Support:** CUDA, ROCm (AMD), Apple Metal Performance Shaders (MPS), Intel XPU,
  OpenXLA (TPU support via torch-xla)
- **Distributed Training:** `DistributedDataParallel` (DDP), `FullyShardedDataParallel` (FSDP),
  `DeepSpeed` integration, `TorchDistributed` (native elastic training)
- **Deployment:** TorchScript, TorchServe, ONNX export, ExecuTorch (mobile/edge),
  torch.compile AOT
- **Ecosystem:** torchvision, torchaudio, torchtext, torch-geometric, PyTorch Lightning,
  Hugging Face Transformers (PyTorch-first)
- **Community:** 80k+ GitHub stars, ~3,500+ contributors, ~4M monthly PyPI downloads
- **Notable Users:** Meta (production AI), Tesla (Autopilot), OpenAI, Stability AI,
  most academic ML research

#### TensorFlow

- **Initial Release:** November 2015 (v0.1), v1.0 February 2017, v2.0 September 2019
- **Governance:** Google (open-source with community TF SIGs for subprojects)
- **License:** Apache-2.0
- **Design Philosophy:** Originally static graphs (TF 1.x), shifted to eager + `tf.function`
  with TF 2.x. Strong emphasis on production deployment, mobile (TFLite), and web (TF.js).
- **Key Strengths:** Mature production ecosystem, TFX for end-to-end pipelines, TensorBoard
  (industry-leading visualization), TFLite (edge/mobile), TF.js (browser), TF Serving
- **GPU Support:** CUDA, ROCm (community), Apple Metal, OpenXLA
- **Distributed Training:** `tf.distribute.Strategy` (MirroredStrategy,
  MultiWorkerMirroredStrategy, TPUStrategy, ParameterServerStrategy)
- **Deployment:** TF Serving, TFLite, TF.js, TFX, ONNX (via tf2onnx)
- **Community:** 185k+ GitHub stars, ~3,800+ contributors, ~2M monthly PyPI downloads
- **Notable Users:** Google (Search, Ads, Gmail, Photos, Translate), DeepMind (AlphaFold),
  Airbnb, Twitter, ByteDance (TikTok)

#### JAX

- **Initial Release:** December 2018 (open-sourced)
- **Governance:** Google Research (Google Brain), open-source community contributions
- **License:** Apache-2.0
- **Design Philosophy:** Functional programming for numerical computing with composable
  transformations: `jit` (JIT compilation), `grad` (autodiff), `vmap` (auto-vectorization),
  `pmap` (SPMD parallelism). XLA compiler backend. Immutable arrays.
- **Key Strengths:** Fast compilation via XLA, explicit hardware control (TPU-first design),
  functional purity enables advanced optimization, excellent for large-scale training
  (100B+ parameter models), native pjit/shard_map for model parallelism
- **GPU Support:** CUDA, ROCm (via XLA), native TPU support (best-in-class)
- **Distributed Training:** pmap, pjit, pathway, XLA SPMD, GSPMD
- **Deployment:** Limited vs PyTorch/TF. jax2tf, SavedModel export, PJRT runtime
- **Ecosystem:** Flax, Haiku, Optax, Orbax, Elegy, Equinox, PennyLane
- **Community:** 30k+ GitHub stars, ~700+ contributors
- **Notable Users:** DeepMind (flagship papers), Google Research, Cohere, Anthropic

#### Keras

- **Initial Release:** March 2015, Keras 3.0 (multi-backend) November 2023
- **Governance:** NumFOCUS-affiliated project (François Chollet)
- **License:** Apache-2.0
- **Design Philosophy:** "Deep learning for humans" — minimalistic, readable, high-level API.
  Keras 3 supports JAX, TensorFlow, and PyTorch backends interchangeably.
- **Community:** 62k+ GitHub stars. Widely used in education (Stanford CS231n, fast.ai),
  Kaggle competitions, research prototyping.

#### Deep Learning Framework Comparison

| Feature | PyTorch | TensorFlow | JAX |
|---------|---------|------------|-----|
| Governance | Linux Foundation | Google | Google Research |
| License | BSD-3 | Apache-2.0 | Apache-2.0 |
| Year created | 2016 | 2015 | 2018 |
| GitHub Stars | ~80k | ~185k | ~30k |
| Contributors | ~3,500 | ~3,800 | ~700 |
| Design | Imperative/eager | Eager + graph | Functional |
| GPU (CUDA) | Yes | Yes | Yes |
| GPU (AMD ROCm) | Yes | Yes | Partial |
| TPU | Via XLA | Via XLA | Native |
| Mobile | ExecuTorch | TFLite | None |
| Web | None | TF.js | None |
| Distributed | DDP, FSDP | tf.distribute | pmap, pjit |
| Hugging Face | Primary | Partial | Supported |
| Research share | ~80% | ~10% | ~10% |

---

### 1.2 ML Pipelines & Orchestration

#### scikit-learn

- **Initial Release:** June 2007 (Google Summer of Code); v1.0 December 2021
- **Governance:** NumFOCUS sponsored; core team of ~30 from academia/industry
- **License:** BSD-3-Clause
- **Key Capabilities:** Classification, regression, clustering, dimensionality reduction,
  model selection, preprocessing, feature extraction, ensemble methods
- **Design Philosophy:** Consistent API (`fit`, `predict`, `transform`), accessible docs,
  classical ML (no GPU acceleration for most estimators), numpy/scipy-based
- **Community:** 60k+ GitHub stars, ~2,400+ contributors. De facto standard for classical
  ML in Python.
- **Limitations:** Not for deep learning; no native GPU; single-machine memory-bound

#### MLflow

- **Initial Release:** June 2018 (Databricks); v1.0 October 2019
- **Governance:** Linux Foundation (LF AI & Data, since June 2022)
- **License:** Apache-2.0
- **Key Capabilities:** Experiment tracking (runs, params, metrics, artifacts), model
  registry (versioning, stage transitions), model packaging (MLflow Models format),
  deployment (MLflow Serving, cloud integrations), projects (Conda/Docker envs)
- **Community:** 19k+ GitHub stars, ~700+ contributors. Most widely adopted OSS experiment
  tracking + registry system.

#### Kubeflow

- **Initial Release:** December 2017; v1.0 March 2021
- **Governance:** CNCF (graduated May 2022), originally by Google
- **License:** Apache-2.0
- **Key Capabilities:** ML workflows on Kubernetes: notebook management, pipeline
  orchestration (Kubeflow Pipelines), training operators (TFJob, PyTorchJob, MPIJob),
  serving (KServe), Katib (hyperparameter tuning)
- **Community:** 14k+ GitHub stars, ~700+ contributors. Standard for enterprise ML on K8s.
- **Challenges:** High operational complexity, steep learning curve, heavy resource footprint

#### TFX (TensorFlow Extended)

- **Initial Release:** February 2017 (internal at Google); open-sourced September 2019
- **Governance:** Google (open-source, TF SIGs)
- **License:** Apache-2.0
- **Key Capabilities:** End-to-end ML pipelines: ExampleGen, StatisticsGen, SchemaGen,
  ExampleValidator, Transform, Trainer, Tuner, Evaluator, Pusher
- **Key Differentiator:** Orchestrator-agnostic (Apache Beam, Kubeflow, Airflow, local),
  strong data validation pipeline (ExampleValidator)

#### ZenML

- **Initial Release:** 2021
- **Governance:** ZenML GmbH (open-core, Apache-2.0)
- **Key Capabilities:** "Pipelines as code" — framework-agnostic pipelines with stack
  abstraction (pluggable orchestrators, artifact stores, metadata stores). `@step` and
  `@pipeline` decorators, YAML configs, integration with MLflow, Seldon Core, BentoML.

---
### 1.3 LLM Frameworks

#### LangChain

- **Initial Release:** October 2022 (v0.0.1); v0.3 March 2025
- **Governance:** LangChain Inc. (Harrison Chase, Ankush Gola). Apache-2.0.
- **Key Capabilities:** LLM application dev framework: model I/O (100+ providers), chains,
  agents (ReAct, OpenAI Function Calling), RAG (loaders, splitters, vector stores, embeddings),
  memory, callbacks. LangGraph (graph-based agent orchestration), LangServe (REST API
  deployment), LangSmith (observability/commercial).
- **Community:** 100k+ GitHub stars (Python), ~18k (JS). ~3,000+ contributors.
- **Criticisms:** Over-engineering, rapid API churn, "magic" wrappers, prompt leakage

#### LlamaIndex

- **Initial Release:** November 2022 (v0.1); v0.10 major refactor January 2024
- **Governance:** LlamaIndex Inc. (Jerry Liu). MIT license. LlamaCloud (commercial).
- **Key Capabilities:** Data framework for LLM apps specializing in data ingestion/indexing/
  retrieval: 160+ data connectors, document processing (parsing, chunking, metadata extraction),
  indexing strategies (vector, summary, tree, keyword, structured), retrieval (hybrid search,
  reranking, agentic retrieval), query/chat engines, LlamaParse (PDF parsing)
- **Community:** 38k+ GitHub stars, ~400+ contributors. Leading RAG framework.
- **Differentiator vs LangChain:** Stronger data ingestion, more sophisticated indexing,
  better RAG evals, lighter footprint

#### Haystack (deepset)

- **Initial Release:** 2020; v2.0 April 2024 (major rewrite)
- **Governance:** deepset GmbH (Berlin). Apache-2.0. deepset Cloud (commercial SaaS).
- **Key Capabilities:** NLP for production: document pipelines, retrieval (BM25, dense,
  hybrid), reading/Q&A (extractive, generative), RAG, summarization, eval pipelines.
  Component-based architecture (typed inputs/outputs, YAML serializable).
- **Community:** 17k+ GitHub stars, ~200+ contributors. Strong in European enterprise.
- **Key Differentiator:** Production-ready pipeline framework with baked-in evaluation,
  OpenAPI-compatible REST API, document stores (Elasticsearch, OpenSearch, Qdrant, etc.)

#### DSPy

- **Initial Release:** 2023 (Stanford NLP: Omar Khattab, Christopher Potts)
- **Governance:** Stanford NLP / community. MIT license.
- **Key Capabilities:** "Programming — not prompting" — algorithmically optimize LM prompts
  and weights. Modules (CoT, ReAct, RAG), teleprompters (COPRO, MIPROv2, BootstrapFewShot,
  Ensemble), signatures (typed I/O specs), compilers (optimize against metrics).
- **Design Philosophy:** Treats LM programs as optimizable computation graphs where prompt
  templates, few-shot examples, and chain structures are learned parameters.
- **Community:** 20k+ GitHub stars, ~200+ contributors. 50+ research papers citing DSPy.
- **Differentiator:** Only framework treating prompts as optimizable parameters. 20-60%
  improvement over hand-crafted prompts on published evaluations.

#### LLM Framework Comparison

| Feature | LangChain | LlamaIndex | Haystack | DSPy |
|---------|-----------|------------|----------|------|
| Governance | LangChain Inc. | LlamaIndex Inc. | deepset GmbH | Stanford/Community |
| License | Apache-2.0 | MIT | Apache-2.0 | MIT |
| GitHub Stars | ~100k | ~38k | ~17k | ~20k |
| Release year | 2022 | 2022 | 2020 | 2023 |
| Core focus | Composability | Data/RAG | Production NLP | Prompt optimization |
| RAG support | Strong | Best-in-class | Strong | Basic |
| Agent support | LangGraph | Agent abstractions | Pipeline agents | ReAct module |
| Eval tools | LangSmith | llamaindex-eval | Haystack Eval | Built-in metrics |
| Learning curve | Steep | Moderate | Moderate | High |

---

### 1.4 Reinforcement Learning

#### Stable-Baselines3

- **Initial Release:** 2020; v2.0 April 2024
- **Governance:** INRIA (Antonin Raffin). MIT license.
- **Algorithms:** A2C, DDPG, DQN, PPO, SAC, TD3, ARS, TRPO, HER. CNN/MLP/RNN policies,
  Gymnasium/Gym API, vectorized envs, HPO (Optuna).
- **Community:** 10k+ GitHub stars, ~200+ contributors. De facto standard RL library in
  academia (cited in 1,000+ papers).
- **Design Philosophy:** "Reliable, clean implementations" — verified against published results.

#### RLlib (Ray)

- **Initial Release:** 2018 (part of Ray); Ray v1.0 September 2020
- **Governance:** Anyscale (Ray ecosystem). Apache-2.0.
- **Algorithms:** PPO, IMPALA, DQN, DDPG, SAC, APEX, ES, MARL (multi-agent PPO, QMIX, VDN,
  MADDPG), offline RL (CQL, BC). Distributed training with horizontal scaling.
- **Key Differentiator:** Distributed-first design, multi-agent RL, production-grade fault
  tolerance, integration with Ray Tune for HPO.

#### Garage (formerly rllab)

- **Initial Release:** 2015 (rllab by UC Berkeley RAIL); rebranded to Garage 2019
- **Licensing:** MIT
- **Key Capabilities:** 50+ algorithm implementations, 400+ environments (MuJoCo, DM Control,
  gym), experiment tracking, distributed training. Focus on research reproducibility.

---

### 1.5 Time Series

#### Prophet (Facebook/Meta)

- **Initial Release:** February 2017. MIT License.
- **Key Capabilities:** Additive model for time series forecasting: automatic seasonality,
  holiday effects, changepoint detection, trend decomposition, uncertainty intervals.
- **Design Philosophy:** Business forecasting at scale — works well with minimal tuning.
- **Limitations:** No GPU, no multivariate, no high-frequency data. ~18k GitHub stars.

#### Kats (Meta)

- **Initial Release:** 2021. MIT License.
- **Key Capabilities:** Time series analysis: forecasting (Prophet, ARIMA, Theta, LSTM),
  detection (changepoint, trend, outlier), feature extraction, simulation, decomposition.
- **Limitations:** Limited development since 2023. ~5k GitHub stars.

#### sktime

- **Initial Release:** 2019; v0.30+ stable as of 2026
- **Governance:** Community (UK AISI, UCL). BSD-3-Clause.
- **Key Capabilities:** Unified interface: forecasting (50+ algorithms), classification
  (30+: Rocket, HIVE-COTE, TDE), regression, clustering, annotation.
- **Design Philosophy:** "scikit-learn for time series" — consistent API across all tasks.
  ~8k GitHub stars.

#### Darts (Unit8)

- **Initial Release:** 2020; v0.10+ stable
- **Governance:** Unit8 SA. Apache-2.0.
- **Key Capabilities:** Forecasting: classical (ARIMA, Prophet), ML (RandomForest, XGBoost,
  LightGBM), deep learning (RNN, TFT, N-BEATS, NHiTS, TCN, Transformer, TiDE, PatchTST).
  Probabilistic forecasting, backtesting, GPU support via PyTorch.
- **Key Differentiator:** Best PyTorch-native deep time series library. ~8k GitHub stars.

#### Time Series Comparison

| Feature | Prophet | Kats | sktime | Darts |
|---------|---------|------|--------|-------|
| Governance | Meta | Meta | Community | Unit8 |
| License | MIT | MIT | BSD-3 | Apache-2.0 |
| Stars | ~18k | ~5k | ~8k | ~8k |
| Forecasting | Yes | Yes | Yes | Yes |
| Classification | No | No | Yes | No |
| Deep learning | No | No | No (via reduction) | Yes (PyTorch) |
| GPU support | No | No | No | Yes |
| Probabilistic | Yes | No | Yes | Yes (NLL) |
| Best for | Business forecasting | Exploration | Research/academic | Deep time series |

---

### 1.6 Computer Vision

#### OpenCV

- **Initial Release:** June 2000; v4.10 2025
- **Governance:** OpenCV Foundation (Intel, Google, AMD, Microsoft). Apache-2.0.
- **Key Capabilities:** 2,500+ optimized algorithms: image processing, feature detection
  (SIFT, SURF, ORB, FAST), object detection (Haar cascades, HOG+SVM, DNN module),
  video analysis (optical flow, Kalman filters, background subtraction), camera calibration,
  3D reconstruction, DNN inference (PyTorch, TF, Caffe, Darknet, ONNX).
- **Community:** 80k+ GitHub stars, ~2,800+ contributors. 20M+ monthly PyPI downloads.
- **Notable Case Study — ROS Robotics:** The Robot Operating System uses OpenCV as its
  primary vision library for SLAM, object manipulation, and navigation on tens of thousands
  of robots (PR2, TurtleBot, industrial arms).

#### Detectron2

- **Initial Release:** October 2019 (FAIR). Apache-2.0.
- **Key Capabilities:** Object detection and segmentation (Faster/Mask R-CNN, RetinaNet,
  DensePose, Cascade R-CNN, PointRend, Panoptic FPN, FCOS, Deformable DETR). Modular
  design, YAML configuration, distributed training, TorchScript/ONNX export.
- **Community:** 30k+ GitHub stars, ~400+ contributors.
- **Use Case — Meta:** Detectron2 processes billions of geospatial images for Marketplace,
  and DensePose provides AR effects at 40+ FPS on mobile via TorchScript.

#### MMDetection (OpenMMLab)

- **Initial Release:** 2019; v3.0 2023
- **Governance:** OpenMMLab (Shanghai AI Laboratory). Apache-2.0.
- **Key Capabilities:** 300+ models, 60+ algorithms: RetinaNet, YOLO series, Mask R-CNN,
  DETR, Swin Transformer detectors. Related projects: MMSegmentation, MMPose, MMTracking.
- **Community:** 30k+ GitHub stars, ~1,000+ contributors. Dominant in Chinese CV research.
- **Differentiator vs Detectron2:** Larger model zoo, wider algorithm coverage, more backbones
  (ResNet, Swin, PVT, ConvNeXt), better deployment options (ONNX, TensorRT, ncnn, OpenVINO).

#### YOLO (Ultralytics)

- **Initial Release:** YOLOv1 June 2015 (Redmon); YOLOv5+ maintained by Ultralytics
- **Governance:** Ultralytics Inc. AGPL-3.0 (commercial license available).
- **Key Capabilities:** Real-time detection, segmentation, classification, pose estimation,
  OBB, tracking. CLI (`yolo detect predict`), ONNX/TFLite/OpenVINO export, MLflow/Comet/W&B integration.
- **Community:** 30k+ GitHub stars (ultralytics/ultralytics), ~800+ contributors.
- **Licensing Controversy:** AGPL-3.0 requires commercial users to open-source their entire
  codebase. Alternatives: YOLOX (Apache-2.0, Megvii), YOLOv6 (Apache-2.0, Meituan).

---

### 1.7 NLP

#### spaCy

- **Initial Release:** February 2015; v3.0 January 2021
- **Governance:** Explosion AI (Matthew Honnibal, Ines Montani). MIT license.
- **Key Capabilities:** Industrial NLP: tokenization, POS tagging, dependency parsing, NER,
  lemmatization, text classification, entity linking. 75+ languages. Cython-based.
  Pipeline architecture (tokenizer -> tagger -> parser -> NER -> ...).
- **Community:** 30k+ GitHub stars, ~800+ contributors. 10M+ monthly PyPI downloads.
- **Key Differentiator:** Best-in-class tokenization (URLs, emoji, hashtags), efficient
  Cython core, excellent docs + course, 400+ plugins (spaCy Universe).

#### Hugging Face Transformers

- **Initial Release:** October 2018 (pytorch-transformers); v4.0 November 2021
- **Governance:** Hugging Face Inc. Apache-2.0.
- **Key Capabilities:** 200,000+ model architectures, unified API (AutoModel, AutoTokenizer,
  pipeline), Trainer, distributed training, quantization, all frameworks (PyTorch/TF/JAX).
  Ecosystem: datasets, accelerate, tokenizers, optimum, safetensors.
- **Community:** 140k+ GitHub stars, ~3,500+ contributors. Hugging Face Hub hosts 1M+ models
  and 300k+ datasets. Central to the modern ML ecosystem.
- **Notable — French Government:** The French national AI initiative uses Transformers +
  Datasets to power public-sector AI deployments under their "AI for Public Service" framework.

#### NLTK

- **Initial Release:** 2001; v3.9 2024
- **Governance:** Community (originally Steven Bird, Edward Loper at UPenn). Apache-2.0.
- **Key Capabilities:** Comprehensive NLP for education: tokenization, stemming, lemmatization,
  POS tagging, NER, chunking, parsing, classification, 50+ corpora.
- **Community:** 14k+ GitHub stars, ~600+ contributors. Standard university NLP textbook.
- **Limitations:** Not production-ready, slower, no GPU, Python 2 legacy in some parts.

#### Stanza (Stanford NLP)

- **Initial Release:** 2020. Apache-2.0.
- **Key Capabilities:** Tokenization, lemmatization, POS tagging, dependency parsing, NER,
  sentiment, constituency parsing, coreference, relation extraction. 70+ languages.
  PyTorch-based neural models, Universal Dependencies framework.
- **Key Differentiator:** Best accuracy on UD treebank benchmarks, BERT-based NER, clinical
  NLP models (Stanza BioMed). 8k+ GitHub stars.

---

### 1.8 Audio / Speech

#### Whisper (OpenAI)

- **Initial Release:** September 2022. MIT License.
- **Key Capabilities:** ASR in 100+ languages, translation, language ID. Model sizes: tiny
  (39M) to large-v3 (1.55B). Encoder-decoder transformer trained on 680k hours of data.
- **Community:** 75k+ GitHub stars. Community forks: whisper.cpp, WhisperX, faster-whisper,
  distil-whisper. Hugging Face integration.
- **Limitations:** Not streaming-friendly, memory-hungry for long audio, hallucinates on
  silence, no speaker diarization.
- **Case Study — Medical Transcription (MIT):** MIT Division of Clinical Informatics
  fine-tuned Whisper large-v2 on de-identified doctor-patient encounters, achieving <10% WER.
  Critical: open-source nature enabled HIPAA compliance (data never left controlled infra).

#### SpeechBrain

- **Initial Release:** 2021; v1.0 December 2023
- **Governance:** SpeechBrain Foundation. Apache-2.0.
- **Key Capabilities:** All-in-one speech: ASR (CTC, seq2seq, transformer, Whisper FT),
  speaker recognition, diarization, enhancement, TTS, language ID, emotion recognition, SLU.
- **Key Differentiator:** Most comprehensive speech toolkit in one framework, YAML-based
  recipes for 100+ tasks, Hugging Face Hub integration. 10k+ GitHub stars.

#### pyannote-audio

- **Initial Release:** 2019; v3.0 2023
- **Governance:** IRISA, Université de Rennes 1. MIT license.
- **Key Capabilities:** Speaker diarization: VAD, speaker segmentation, speaker embedding,
  clustering, overlapped speech detection. Pre-trained `pyannote/speaker-diarization-3.1`.
- **Key Differentiator:** Best DIHARD benchmark accuracy, seamless Whisper integration.
  De facto standard for transcription + speaker labeling.

---
## Part 2: Open Models & Weights

### 2.1 Open-Weight Model Families

#### Llama Family (Meta)

- **Llama 1** (February 2023): 7B-65B params, 1.4T tokens. Research-only license.
  Pivotal — showed open models could approach GPT-3 quality.
- **Llama 2** (July 2023): 7B-70B, 2T tokens, 4k context. Commercial license (>700M MAU
  clause for 70B). RLHF chat variant.
- **Llama 3** (April 2024): 8B, 70B. 15T tokens. 8k context (128k extended via RoPE).
  GQA, 128k-token tokenizer. Llama 3.1 (July 2024): 405B dense, 128k context.
  Llama 3.2 (Sep 2024): 1B/3B text, 11B/90B multimodal. Llama 3.3 (Dec 2024): 70B refined.
- **Llama 4** (April 2026): MoE architecture. Scout (109B/17B active, 10M context),
  Maverick (402B/17B active, 1M context, interleaved attention, MoE guardrails),
  Behemoth (2T/288B active, still training).
- **License Evolution:** Research-only -> Commercial (MAU cap) -> Commercial (no cap,
  attribution) -> Llama 3.1 (clarified AUP). **Not OSI-approved open source.**
- **Community Impact:** Spawned Alpaca, Vicuna, Guanaco, Nous Hermes, TinyLlama, Code
  Llama. Architectural choices (GQA, SwiGLU, RoPE) became de facto standards.

#### Mistral Family (Mistral AI)

- **Mistral 7B** (Sep 2023): 7.3B, Apache-2.0. Sliding window attention, outperformed
  Llama 2 13B. First "fully open" major model.
- **Mixtral 8x7B** (Dec 2023): 46.7B/12.9B active, Apache-2.0. First popular open MoE.
  Outperformed Llama 2 70B and GPT-3.5. 32k context.
- **Mistral Large 2** (July 2024): 123B. Custom Mistral Research/Commercial License. 128k
  context. Competitive with GPT-4 on many tasks.
- **Mixtral 8x22B** (Apr 2024): 141B/39B active, Apache-2.0.
- **Licensing Strategy:** Apache-2.0 for smaller models; custom restricted for larger.
  Praised for actual openness on small models, criticized for gatekeeping the best ones.
- **Differentiators:** Innovative architecture (sliding window, MoE at scale), European AI
  ecosystem, strong performance-per-compute.

#### Gemma Family (Google)

- **Gemma 2B, 7B** (Feb 2024): 2B/7B. Custom Gemma license (permissive most use, Google AUP
  compliance, attribution for commercial). 8k context. PyTorch + JAX (Keras 3).
- **Gemma 2 9B, 27B** (June 2024): 13T training tokens. >2x inference speed vs Llama 3.
  Knowledge distillation for 9B model.
- **RecurrentGemma** (Apr 2024): Griffin architecture (linear recurrent + local attention).
- **PaliGemma** (May 2024): Visual language model (SigLIP + Gemma).
- **Differentiators:** Google infra quality, JAX-native, safety-focused release process,
  extensive published red-teaming.

#### Falcon Family (TII, UAE)

- **Falcon 7B, 40B** (May 2023): 1.5T tokens (RefinedWeb). Apache-2.0. Top of Open LLM
  Leaderboard at release. ALiBi position encoding (extrapolates to longer sequences).
- **Falcon 2 11B** (Mar 2024): Apache-2.0. 6T tokens. Multilingual.
- **Falcon Mamba 7B** (May 2024): State-space model (Mamba), non-transformer. Apache-2.0.
- **Differentiators:** Truly Apache-2.0 throughout, RefinedWeb dataset, Mamba architecture
  exploration.

#### Qwen Family (Alibaba)

- **Qwen 7B-72B** (Aug-Sep 2023): 3T tokens. Custom Qwen license (commercial with
  registration). Proficient in Chinese and English.
- **Qwen 1.5** (Feb 2024): 0.5B-110B MoE. 32k context. SwiGLU, RoPE, GQA.
- **Qwen 2** (June 2024): 0.5B-72B + MoE 57B-A14B. 7T tokens. Top of leaderboard.
- **Qwen 2.5** (Sep 2024): 0.5B-236B (dense + MoE). 128k context. VL and Coder variants.
- **Differentiators:** Strong multilingual (Chinese + English + many others), active release
  cadence, extensive MoE exploration, strong vision-language integration.

#### DeepSeek Family (Deep Seek / High-Flyer)

- **DeepSeek LLM** (Nov 2023): 7B, 67B. Multi-Head Latent Attention (MLA) — architectural
  innovation for KV cache efficiency.
- **DeepSeek V2** (May 2024): 236B/21B active MoE. Matched GPT-4 level in open-weight model.
- **DeepSeek V3** (Dec 2024): 671B/37B active MoE, 256 experts, top-1 routing. 14.8T tokens.
  FP8 mixed precision training (industry first). ~$5.5M training cost on 2048 H800 GPUs.
  Multi-Token Prediction (MTP).
- **DeepSeek R1** (Jan 2025): 660B reasoning model. First fully open reasoning model with
  CoT. Uses GRPO RL to discover reasoning behaviors. Matches OpenAI o1 on math/coding.
- **Differentiators:** MLA (KV cache innovation), R1 (first open reasoning model), FP8
  training at scale, exceptionally efficient training costs.

---

### 2.2 Model Licensing Deep-Dive

#### True Open-Source (OSI-Approved License)

| Model | License | Notes |
|-------|---------|-------|
| Mistral 7B | Apache-2.0 | — |
| Mixtral 8x7B | Apache-2.0 | — |
| Mixtral 8x22B | Apache-2.0 | — |
| Falcon 7B/40B/2 11B | Apache-2.0 | Falcon Mamba too |
| OLMo (AI2) | Apache-2.0 | Fully open: weights, data, code, logs |
| Pythia (EleutherAI) | Apache-2.0 | — |
| BLOOM (BigScience) | Apache-2.0 | — |
| Dolly (Databricks) | Apache-2.0 | — |
| MPT (MosaicML) | Apache-2.0 | — |
| Phi-3 (Microsoft) | MIT | 3.8B, 14B |
| SmolLM (Hugging Face) | Apache-2.0 | 135M-1.7B |

#### Custom License (Not OSI-Approved)

| Model | License | Key Restrictions |
|-------|---------|-----------------|
| Llama 3/4 | Meta Llama (custom) | Behavioral use restrictions, attribution |
| Gemma 2 | Gemma License | Google AUP compliance, attribution |
| Qwen 2.5 | Qwen License | Commercial registration required |
| DeepSeek V3/R1 | DeepSeek License | General restrictions |
| Mistral Large 2 | Mistral Commercial | Commercial tiered |

#### Key Open Questions

1. **Behavioral restrictions:** The OSD does not allow field-of-use restrictions.
   The OSAID debate centers partly on this.
2. **Training data transparency:** Open-source requires open data. Most "open-weight"
   models don't disclose training data fully.
3. **Derived model distribution:** Custom license requirements create patchwork
   incompatibilities in the merged model ecosystem.
4. **>700M MAU clauses:** Usage-based triggers are incompatible with open source
   (removed in Llama 3).
5. **AUPs:** External AUP documents changeable by licensor — incompatible with
   stable open-source licensing.

---

### 2.3 Model Cards & Documentation

Model Cards for Model Reporting (Mitchell et al., 2019) is the standard framework.
Hugging Face Hub mandates model cards for all uploaded models.

#### Standard Components

1. **Model Details:** Architecture, version, date, developer, funding
2. **Intended Use:** Primary uses, out-of-scope, target users
3. **Factors:** Demographic/environmental factors affecting performance
4. **Metrics:** Evaluation metrics with confidence intervals
5. **Evaluation Data:** Datasets used, links, preprocessing
6. **Training Data:** Sources, filtering, composition
7. **Quantitative Analyses:** Performance breakdowns by factors
8. **Ethical Considerations:** Biases, fairness, ethical concerns
9. **Caveats & Recommendations:** Limitations, deployment guidance
10. **Environmental Impact:** Compute, carbon, energy source

#### Community Tools

- **Hugging Face Hub** — auto-generates from YAML + Markdown
- **model-card-toolkit (Google)** — programmatic generation from MLMD
- **Weights & Biases** — versioned model cards in registry

---

### 2.4 Model Distribution

#### Hugging Face Hub

- **Scale:** 1,000,000+ models, 300,000+ datasets, 500,000+ Spaces
- **Features:** Git-based LFS, versioning, browser inference widget, Dataset Preview API,
  ONNX viewer, AutoTrain, Inference Endpoints. 3M+ users, 500M+ daily inference requests.
- **Python Client:** `huggingface_hub` (Apache-2.0). Hub UI/api proprietary.

#### GitHub Releases

- Used by early open-weight releases (Llama 1, Falcon, Mistral). 2GB file size limit.
  Most now use HF Hub as primary; GitHub for code + indices.

#### ONNX Format

- **Open Neural Network Exchange:** Started by Microsoft + Facebook (2017), now Linux
  Foundation (LF AI & Data). Framework-interoperable intermediate representation.
- **onnxruntime:** Cross-platform inference CPU, GPU, DirectML, CUDA, TensorRT, OpenVINO,
  CoreML. Used by Azure ML, Windows ML.
- **Optimum (HF):** ONNX export from transformers. Limitations: not all architectures
  export cleanly, no training support, some advanced ops lack ONNX equivalents.

---

### 2.5 Fine-Tuned & Merged Model Ecosystem

#### Community Fine-Tune Families

| Family | Base | Creator | Specialty |
|--------|------|---------|-----------|
| Alpaca | Llama 1 7B | Stanford | Instruction-following |
| Vicuna | Llama 1 13B | LMSYS | Chat |
| Nous Hermes | Llama/Mistral/Yi | Nous Research | General instruction |
| Zephyr | Mistral 7B | Hugging Face H4 | DPO-aligned |
| Code Llama | Llama 2 | Meta | Code generation |
| WizardLM | Llama 2 | WizardLM Team | Evol-instruct |
| Orca | Llama 2 | Microsoft | Progressive learning |
| Platypus | Various | Garage Open Platypus | Knowledge merging |

#### Model Merging Methods

- **Linear (SLERP):** Spherical linear interpolation between model weights
- **TIES-Merging:** Trim, Elect Sign, and Merge (Yadav et al., 2023)
- **DARE:** Drop And REscale delta parameters (Yu et al., 2023)
- **Model Stock:** Pareto-optimal weight averaging (Jang et al., 2024)
- **Evolutionary:** CMA-ES for optimal coefficients (Sakana AI, 2024)

**Tools:** `mergekit` (Charles Goddard, Apache-2.0) — de facto standard. Supports SLERP,
TIES, DARE, passthrough, linear, model stock. YAML configs, Hugging Face Space.

**Controversy:** Merged models dominate leaderboards but legal status of merges across
differently-licensed bases is unresolved. Are they derivative works requiring copyleft
propagation, or transformative and non-copyrightable?

**Notable Merges:** Goliath 120B, Tulu 2 DPO 70B, SauerkrautLM, Beagle-7B, Miqu 70B
(suspected Mistral Large leak), Magnum 72B.

---

### 2.6 Quantization & Optimization

#### Quantization Formats

| Format | Bits | Tooling | Best For |
|--------|------|---------|----------|
| FP32 | 32 | Native | Training, reference |
| FP16/BF16 | 16 | Native | Training, inference (Ampere+) |
| INT8 | 8 | bitsandbytes, ONNX | Inference, memory savings |
| INT4 | 4 | GPTQ, AWQ | Memory-constrained inference |
| NF4 | 4 | bitsandbytes (QLoRA) | QLoRA fine-tuning |
| GGUF | 2-8 | llama.cpp | CPU inference (consumer) |
| FP8 | 8 | DeepSpeed, H800 | Training + inference (H100/H800) |

#### Key Tools

- **bitsandbytes** (Tim Dettmers / HF): 8/4-bit quantization for PyTorch. NF4 for QLoRA.
  CUDA-only.
- **GPTQ** (Frantar et al., 2022): Post-training quantization via OBQ framework. Layer-wise
  reconstruction. `auto-gptq` + `exllamav2` inference.
- **AWQ** (Lin et al., 2023): Activation-aware quantization, protects 1% salient channels.
  Better accuracy than GPTQ. `autoawq`, integrated into vLLM, TGI, llama.cpp.
- **GGUF** (GGML Universal Format): Multiple levels (q2_k through q8_0). Mixed quantization.
  Excellent CPU inference. Runs on consumer hardware (MacBook, Steam Deck, RPi).

#### Quality Impact (Approximate, Llama 3 70B)

| Format | Bits | Size (GB) | Quality Loss | Speed vs FP16 |
|--------|------|-----------|--------------|---------------|
| FP16 | 16 | ~140 GB | None | 1.0x |
| INT8 | 8 | ~70 GB | ~0.5% | 1.3x |
| GPTQ 4-bit | 4 | ~37 GB | ~1-2% | 1.7x |
| AWQ 4-bit | 4 | ~37 GB | ~0.8-1.5% | 1.8x |
| GGUF Q4_K_M | ~4.5 | ~41 GB | ~1.5% | 0.7x (CPU) |
| GGUF Q2_K | ~2.6 | ~25 GB | ~5-8% | 0.9x (CPU) |

---

### 2.7 Open Model Benchmarks

#### Open LLM Leaderboard (Hugging Face)

- **Original** (2023-2024): ARC, HellaSwag, MMLU, TruthfulQA. Criticized for contamination,
  saturation, single-number ranking.
- **v2** (September 2024): GPQA, MuSR, MATH Lvl 5, MMLU-Pro, BBH, IFEval, Arena-Hard-Auto.
  Contamination-resistant tasks.
- **Current Top (May 2026):** DeepSeek V3/R1, Llama 4 Maverick, Qwen 2.5-110B, Gemma 2 27B,
  Mistral Large 2.

#### LMSys Chatbot Arena

- **Method:** Crowdsourced A/B comparisons, Elo from 1M+ human votes.
- **Advantage:** Captures real-world quality, hard to game/overfit.
- **Categories:** Overall, Coding, Math, Creative Writing, Long Query, Multi-turn, Safety.
- **Current Elo (May 2026):** Llama 4 Maverick (~1350), GPT-4o/Claude 3.5 (~1300),
  DeepSeek V3/R1 (~1270), Gemma 2 27B (~1200), Mistral Large 2 (~1180).

#### Other Benchmarks

- **HumanEval / MBPP:** Code generation (functional correctness)
- **GSM8K / MATH:** Mathematical reasoning
- **Big-Bench:** 150+ general reasoning tasks
- **HELM (Stanford):** Holistic evaluation (accuracy, calibration, robustness, fairness, bias)
- **MT-Bench:** Multi-turn conversation quality (GPT-4 judged)
- **AlpacaEval 2.0:** Length-controlled win rate (saturated at 95%+)
- **SWE-bench Verified:** Real-world software engineering (current SOTA ~70%)
- **SimpleQA / SimpleBench:** Factuality (OpenAI, 2025-2026)

---
## Part 3: Open Datasets

### 3.1 Dataset Licensing

#### Common Open Dataset Licenses

| License | Permissions | Restrictions | Used By |
|---------|-------------|--------------|---------|
| CC0-1.0 | Any use | None | Open Images, many small datasets |
| CC-BY-4.0 | Any use with attribution | Attribution required | LAION-5B subsets, HF datasets |
| CC-BY-SA-4.0 | Any use + attribution + SA | Attribution, share-alike | Wikipedia dumps |
| ODC-BY | Any use with attribution | Attribution | OpenStreetMap data |
| ODbL | Any use + attr + SA | Attribution, share-alike for DBs | OpenStreetMap, Wikidata |
| CDLA-Permissive | Any use | Attribution | Some LF AI datasets |
| Custom | Varies | Varies | Common Crawl, The Stack |

#### Problematic Scenarios

1. **No license specified:** "All rights reserved" by default — cannot use the dataset
2. **Mixed licenses in composites:** Inherits most restrictive requirements
3. **CC-BY-NC (non-commercial):** Cannot be used for commercial model training
4. **Data without copyright:** Facts/measurements may not be copyrightable, but EU
   Database Directive may apply
5. **Privacy-compliant data:** PII in datasets creates GDPR/CCPA operational liability

---

### 3.2 Dataset Discovery Platforms

#### Hugging Face Datasets

- **Scale:** 300,000+ datasets (May 2026)
- **Features:** Versioned (Git-based), streaming, multi-modal, 100+ languages, automatic
  data card generation, `datasets` library for loading/preprocessing
- **Search:** By task, language, license, size, benchmark. 3M+ users.
- **Community uploading:** Any user can create a dataset repo. Peer review for community datasets.

#### Kaggle Datasets

- **Scale:** 250,000+ datasets (primarily tabular). Competition infrastructure, notebook
  integration, upvote/curation system.
- **Limitations:** No versioning, no streaming, varying/absent licensing, primarily tabular.
  Acquired by Google (2017), integrated with Colab/BigQuery.

#### Papers with Code Datasets

- **Scale:** 100,000+ datasets linked to ML research papers
- **Features:** Dataset-task benchmarking, leaderboards per dataset, SOTA tracking, code links
- **Owned by Meta AI.**

#### UCI ML Repository

- **Scale:** 600+ datasets (est. 1987 at UC Irvine). Carefully curated, well-documented,
  mostly classical small/medium datasets (Iris, Wine, Adult, Mushroom).

---

### 3.3 Synthetic Data Generation

#### Tools

| Tool | Description | License | Best For |
|------|-------------|---------|----------|
| SDV (Synthetic Data Vault) | Tabular (GANs, VAEs, copulas) | BUSL/MIT | Tabular, relational |
| Gretel Synthetics | Text + tabular | Apache-2.0/commercial | Privacy-safe synthetic data |
| CTGAN (SDV) | Conditional tabular GAN | MIT | Tabular categorical |
| DataDreamer (NVIDIA) | LLM-based synthetic | Apache-2.0 | Text data from LLMs |
| distilabel (Argilla) | LLM labeling/generation | Apache-2.0 | Preference/instruction data |
| Self-Instruct (Stanford) | LLM self-generated instructions | Apache-2.0 | Instruction-tuning data |

#### LLM-Based Techniques

- **Self-Instruct** (Wang et al., 2022): Bootstrap instruction data from LLM. Generated
  Alpaca (52k instructions from GPT-3.5).
- **Evol-Instruct** (WizardLM, 2023): Iteratively evolve instructions for complexity/diversity.
- **Constitutional AI** (Anthropic, 2022): LLM critiques/revises its own harmful outputs.
- **DPO Data Generation:** Generate preference pairs from base + stronger model.
- **Code Exercise Generation:** Coding problems with tests (Code Alpaca).

#### Quality Pitfalls

- **Model collapse:** Training on same-distribution synthetic data causes recursive
  degradation (Shumailov et al., 2023 — "The Curse of Recursion")
- **Bias amplification:** Synthetic data inherits and amplifies generating model biases
- **Missing edge cases:** Poor generalization on long-tail distributions
- **Quality filtering essential:** Deduplication, reward model scoring, manual review

---

### 3.4 Privacy in Datasets

#### Legal Frameworks

| Regulation | Jurisdiction | Key Requirements |
|------------|-------------|-----------------|
| GDPR | EU | Lawful basis, minimization, right to deletion, PII protection |
| CCPA/CPRA | California | Right to know, right to delete, opt-out of sale |
| LGPD | Brazil | Similar to GDPR |
| China PIPL | China | Consent, minimal necessary, cross-border rules |
| EU AI Act | EU | Training data governance (high-risk AI systems) |

#### Anonymization Techniques

- **k-anonymity:** Each record indistinguishable from k-1 others on quasi-identifiers.
  Weak against background knowledge attacks.
- **l-diversity:** Extends k-anonymity — each group has l well-represented values for
  sensitive attributes. Prevents homogeneity attacks.
- **t-closeness:** Distribution of sensitive attributes close to overall distribution.
- **Differential Privacy (DP):** Formal guarantee. epsilon-DP: changing one record changes
  output by at most exp(epsilon). Industry standard: epsilon ~1-8.
  - Local DP: Noise per individual (Apple, Google, Microsoft telemetry)
  - Global/Central DP: Noise per query (US Census 2020, LinkedIn)
  - DP-SGD: DP during training (Abadi et al., 2016) — Apple, Google Gboard
- **Pseudonymization:** Not true anonymization under GDPR

#### OSS Privacy Tools

- **OpenDP** (Harvard/Microsoft): DP library. Python + Rust. MIT.
- **Diffprivlib** (IBM): DP for ML. MIT.
- **PipelineDP** (Google/OpenMined): DP for data pipelines. Apache-2.0.
- **PySyft** (OpenMined): Privacy-preserving ML (FL, DP, SMPC). Apache-2.0.
- **FATE** (WeBank): Federated learning framework. Apache-2.0.
- **ARX** (TU Dresden): Anonymization with GUI. LGPL.

---

### 3.5 Dataset Documentation

#### Datasheets for Datasets (Gebru et al., 2021)

Standard questionnaire required by many ML conferences (NeurIPS, ICML):

1. **Motivation:** Why created? Who funded?
2. **Composition:** Instances, count, fields, PII?
3. **Collection Process:** How acquired? By whom? Ethical review?
4. **Preprocessing:** Cleaning, labeling, normalization, filtering
5. **Uses:** Suitable tasks? Should NOT be used for?
6. **Distribution:** How distributed? License? Maintenance?
7. **Maintenance:** Who maintains? Updates/errata?

#### HF Data Cards (YAML Frontmatter)

```yaml
dataset_info:
  features:
  - name: text
    dtype: string
  splits:
  - name: train
    num_examples: 10000
license: cc-by-4.0
task_categories:
- text-classification
language:
- en
```

#### Dataset Nutrition Labels (MIT Media Lab)

Proposed standard showing: size, format, annotations, provenance, collection method,
consent, privacy, license, benchmark performance.

---

### 3.6 Curation & Quality Assessment

#### Data Quality Dimensions

| Dimension | Definition | Measurement |
|-----------|------------|-------------|
| Accuracy | Correctly reflects real world | Sampling, validation |
| Completeness | All required data present | Missing rate analysis |
| Consistency | Consistent across records | Cross-field validation |
| Timeliness | Current state | Freshness metrics |
| Uniqueness | No duplicates | Deduplication ratio |
| Validity | Conforms to schema | Schema validation |

#### OSS Curation Tools

- **Great Expectations:** Expectation-based data quality validation. Apache-2.0. 10k+ stars.
- **ydata-profiling:** Automated EDA and quality reports. MIT. 12k+ stars.
- **Deequ (Amazon):** Large-scale data quality on Spark. Apache-2.0.
- **TFX Data Validation:** Statistics, schema, anomaly detection. Apache-2.0.

#### Dataset Deduplication

- **MinHash LSH:** Approximate near-duplicates. `datasketch` (MIT), `text-dedup` (Apache-2.0).
- **Exact dedup:** SHA256/MD5 hashing. Simple, miss near-identical.
- **Semantic dedup:** Embedding-based clustering.
- **Substring dedup:** Remove examples sharing long substrings (GPT-3 contamination filter).

---
## Part 4: AI/ML Governance & Ethics

### 4.1 Responsible AI Frameworks

#### Google AI Principles (2018)

1. Be socially beneficial
2. Avoid creating or reinforcing unfair bias
3. Be built and tested for safety
4. Be accountable to people
5. Incorporate privacy design principles
6. Uphold high standards of scientific excellence
7. Be made available for uses that accord with these principles

**Implementation:** Centralized AI Responsibility team, internal review process for
all AI products and research publications. External Advisory Council (reformed after
2019 disbandment controversy).

#### Microsoft Responsible AI Standard (2022)

- **Framework:** Governs all Microsoft AI systems. Version 2 (2022) is public.
- **Key Pillars:** Accountability, Transparency, Fairness, Reliability & Safety, Privacy &
  Security, Inclusiveness
- **Implementation:** Impact assessments, AI Review Board (senior leadership), Fairlearn,
  InterpretML, red-teaming for all generative AI launches

#### IBM AI Ethics Board

- **Structure:** Centralized board chaired at executive level. External advisory panel.
- **Tools:** AI Fairness 360, AI Explainability 360, Adversarial Robustness 360 (all OSS)
- **Policy:** Advocates "precision regulation" — sector-specific over broad horizontal rules

#### Open Source RAI Toolkits

| Toolkit | Creator | Focus | License |
|---------|---------|-------|---------|
| AI Fairness 360 | IBM | Bias detection/mitigation (70+ metrics, 10+ algorithms) | Apache-2.0 |
| AI Explainability 360 | IBM | Model interpretability | Apache-2.0 |
| Fairlearn | Microsoft | Fairness metrics, grid search for fair models | MIT |
| InterpretML | Microsoft | Glass-box models | MIT |
| What-If Tool | Google | Interactive model analysis | Apache-2.0 |
| Captum | Meta | PyTorch interpretability | BSD-3 |
| SHAP | Lundberg/Suid | Feature importance | MIT |
| LIME | Ribeiro et al. | Local explanations | BSD-2 |

#### Open Source AI Regulation: Ethical Framework Comparison

| Framework | Year | Key Principles | OSS Applicability |
|-----------|------|----------------|-------------------|
| OECD AI Principles | 2019/2024 | Inclusive growth, human-centered, transparency, robustness, accountability | Non-binding, influences national laws |
| EU AI Act | 2024 | Risk-based (unacceptable/high/limited/minimal), transparency, human oversight | OSS carve-out for components, GPAI rules apply |
| UNESCO Recommendation | 2021 | Proportionality, safety, fairness, sustainability | Soft law, member state implementation |
| G7 Hiroshima Process | 2023 | International guiding principles, code of conduct for advanced AI | Voluntary, 2024 code of conduct |
| Beijing AI Principles | 2019 | Human values, privacy, fairness, sharing | Influences Chinese regulation |

---

### 4.2 AI Safety in OSS

#### Red-Teaming

- **Definition:** Systematic adversarial testing to identify vulnerabilities, harmful outputs,
  and failure modes.
- **OSS Tools:**
  - `garak` (LLM vulnerability scanner): Probes for hallucination, toxicity, jailbreaking,
    encoding attacks. Apache-2.0. 3k+ stars.
  - `Giskard` (Giskard AI): Testing framework for LLMs and ML models. Fairness, robustness,
    security. AGPL-3.0 / commercial.
  - `LangChain Red-Teaming`: Automated adversary simulation module.
  - `PurpleLlama` (Meta): Guardrails, CyberSecEval, Code Shield. Custom license.
- **Methodologies:** Manual (expert testers), Automated (RL-based, gradient-based, brute-force),
  Crowdsourced (Scale AI Red Team, HF challenges), Benchmark-driven (SafetyBench).

#### RLHF (Reinforcement Learning from Human Feedback)

- **Pipeline:**
  1. SFT: Fine-tune on high-quality instruction data
  2. Reward Model: Train on human preference comparisons
  3. RL: PPO to optimize policy against reward model
- **OSS Libraries:**
  - `TRL` (HF): SFTTrainer, RewardTrainer, PPOTrainer, DPOTrainer. Apache-2.0.
  - `DeepSpeed Chat` (Microsoft): End-to-end RLHF. Apache-2.0.
  - `NVIDIA NeMo-Aligner`: RLHF/alignment toolkit. Apache-2.0.
  - `Axolotl`: Fine-tuning with RLHF support. Apache-2.0.
- **Challenges:** Expensive human data, reward model quality limits effectiveness, PPO
  instability, massive compute requirements.

#### Constitutional AI (Anthropic)

- **Approach:** AI-generated self-critique replaces human preference labeling. Model given
  a "constitution" (principles) and revises its own harmful outputs.
- **Steps:** Supervised (harmful -> critique -> revision pairs) -> RL/DPO (prefer revised).
- **OSS Implementations:** TRL Constitutional AI module, axolotl self-critique pipelines,
  LMSys reproduction (open weights + data).

#### DPO (Direct Preference Optimization)

- **Alternative to RLHF:** Directly optimize policy on preference pairs without explicit
  reward model or PPO. Simpler, more stable, less compute-intensive.
- **OSS Libraries:** TRL (DPOTrainer), axolotl, Hugging Face alignment handbook.

#### Agentic AI Safety Concerns

- **Prompt injection:** Malicious instructions in agent-accessible content
- **Sandbox escape:** Commands breaking out of constraints
- **Tool misuse:** Harmful parameter settings
- **Goal misalignment:** Proxy goals diverging from user intent
- **Permission escalation:** Bypassing permission systems

---

### 4.3 Open Source AI Regulation

#### EU AI Act

- **Adopted:** March 2024, enacted August 2024, phased implementation through 2027
- **Risk Categories:**
  1. **Unacceptable:** Prohibited (social scoring, real-time biometric surveillance).
     Effective Feb 2025.
  2. **High-risk:** Regulated (medical, critical infra, employment, credit, law enforcement).
     Risk mgmt, data governance, transparency, human oversight. Effective 2026-2027.
  3. **Limited risk:** Transparency (chatbot disclosure, deepfake labeling). Effective Aug 2026.
  4. **Minimal risk:** Unregulated (most OSS models for research/development).
- **Key OSS Provisions:**
  - **Article 2(12):** OSS AI components exempt unless placed on market as part of high-risk
    system. The "open-source carve-out."
  - **GPAI Model Rules:** Open-source GPAI models exempt from some transparency and copyright
    requirements (Article 53) IF: released under "free and open-source" license, parameters
    publicly available, no systemic risk (<10^25 FLOPs training compute).
  - **Systemic risk trigger:** >10^25 FLOPs triggers additional obligations (incident reporting,
    evaluation, cybersecurity) regardless of open-source status.
  - **Copyright policy:** All GPAI models (including OSS) must implement policy to respect
    EU copyright law and document training data for opt-out.
- **Impact:** Creates regulatory advantage for truly open models (lower downstream compliance).
  But carve-out is narrower than expected — downstream commercial deployment IS regulated.
  Compliance costs may disincentivize some OSS AI in the EU.

#### Other Regulations

| Region | Regulation | Status | OSS Implications |
|--------|-----------|--------|-----------------|
| Canada | AIDA | Proposed (C-27) | Similar to EU AI Act, OSS carve-out expected |
| UK | AI Regulation | White paper 2023 | Light-touch, favorable to OSS |
| China | Generative AI Measures | August 2023 | Registration, security assessment for public-facing AI |
| Japan | AI Guidelines | Non-binding (2024) | Pro-innovation, favorable to OSS |
| Brazil | Bill 2338/2023 | Under discussion | Risk-based, similar to EU |
| OECD | AI Principles | 2019/2024 | Non-binding, influences national regulation |

---

### 4.4 US Executive Order on AI

#### Executive Order 14110 (October 30, 2023)

- **Title:** "Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence"
- **Key Provisions:**

1. **Safety/Security (Section 4):**
   - Developers of "dual-use foundation models" (>10^26 FLOPs) must report training info
   - NIST develops red-teaming standards and safety testing guidelines
   - Development of watermarking and synthetic content detection

2. **Open-Source Specific (Section 4.6, 11.1):**
   - Assessment of open-source AI models for malicious use potential
   - Direction that EO should not "restrict the availability or use of open-source AI models"
   - NTIA public RFC on "Open-Weight AI Models" (April 2024) — most direct government
     inquiry into OSS AI regulation

3. **Privacy:** R&D into DP, FL, HE — supports OSS privacy tools

4. **Civil Rights:** Guidance to prevent AI-driven discrimination — impacts OSS models in
   housing, employment, benefits

5. **Federal Use (OMB Memo M-24-10):** Agencies designate Chief AI Officer, conduct impact
   assessments, adopt minimum practices

#### State-Level US AI Regulation

- **Colorado:** AI Act (SB 24-205, May 2024) — first comprehensive US state AI regulation.
  Regulates high-risk AI systems including OSS components. Effective 2026.
- **California:** SB 1047 (vetoed 2024) would have required safety testing for large models
  including OSS. AB 3211 (watermarking), AB 2930 (AI safety) — under discussion.
- **Utah:** AI Policy Act (SB 149, 2024) — regulates AI in regulated occupations
  (medicine, law), impacts OSS AI in those contexts.

---

### 4.5 Transparency Requirements

#### Dimensions of AI Transparency

| Dimension | OSS Implementation | Example |
|-----------|-------------------|---------|
| Training data | Dataset card, datasheet | OLMo releases full training data |
| Architecture | Paper, code | All OSS models publish |
| Training methodology | Config, logs | OLMo publishes full training logs |
| Evaluation | Model card, leaderboard | Hugging Face metrics |
| Limitations | Caveats section | GPT-2 model card |
| Environmental impact | Compute/carbon disclosure | BLOOM carbon accounting |
| Safety testing | Red-teaming report | Llama 3 safety paper |
| Copyright/legal | Data provenance | The Stack legal review |

#### OSS Transparency Tools

- **Model Cards** (Mitchell et al., 2019) — standard model documentation
- **Dataset Cards / Datasheets** (Gebru et al., 2021) — standard dataset documentation
- **AI System Cards** (Google) — extended for AI systems with multiple models + deployment
- **AI FactSheets** (IBM) — nutrition labels for AI services
- **EU AI Act Transparency Checklist** (Article 13):
  - [ ] System purpose and intended use documented
  - [ ] Model architecture described
  - [ ] Training data sources/preprocessing documented
  - [ ] Evaluation methodology and results published
  - [ ] Known limitations and edge cases documented
  - [ ] Bias and fairness evaluation published
  - [ ] Environmental impact disclosed
  - [ ] Intended audience and out-of-scope uses stated
  - [ ] Maintenance/update policy described
  - [ ] Contact for questions/concerns provided

---

### 4.6 Bias Detection & Mitigation

#### Types of ML Bias

| Bias Type | Definition | Example |
|-----------|------------|---------|
| Historical bias | Existing societal bias in data | Profession prediction: F->secretary, M->engineer |
| Representation bias | Group under/over-representation | 95% white faces -> poor non-white recognition |
| Measurement bias | Features/labels imperfectly measure target | Crime rate predictions biased by unequal policing |
| Aggregation bias | One-size model for heterogeneous groups | Speech recognition worse for non-native accents |
| Evaluation bias | Benchmark doesn't reflect real use | ImageNet accuracy vs wildlife photo ID |
| Deployment bias | System used differently than intended | Recidivism prediction for sentencing |
| Feedback loop bias | Outputs influence future data | Recommendation filter bubbles |

#### OSS Bias Detection Tools

**Pre-Training (Data):**
- **Fairness Indicators** (Google): Evaluate across slices. Apache-2.0.
- **DataProfiler** (Capital One): Data bias detection. Apache-2.0.
- **TFDV:** Training-serving skew detection. Apache-2.0.

**Post-Training (Model):**
- **AI Fairness 360** (IBM): 70+ metrics, 10+ mitigation algorithms. Apache-2.0.
- **Fairlearn** (Microsoft): Fairness metrics, mitigation. MIT.
- **What-If Tool** (Google): Interactive analysis. Apache-2.0.
- **SHAP / LIME:** Explainability for bias analysis.

**LLM-Specific:**
- **BBQ:** Social bias benchmark (race, gender, SES, disability, etc.)
- **WinoBias / WinoGender:** Coreference resolution bias
- **BOLD:** 23k prompts across 5 domains for LLM bias evaluation
- **TruthfulQA:** Truthfulness evaluation
- **SafetyBench:** Chinese-context LLM safety

#### Bias Mitigation Strategies

| Stage | Strategy | OSS Tools |
|-------|----------|-----------|
| Data collection | Balanced sampling, inclusive data | AIF360 preprocessing |
| Data preprocessing | Reweighting, resampling, attribute suppression | Fairlearn, AIF360 |
| Training | Adversarial debiasing, fairness constraints | AIF360 AdversarialDebiasing |
| Training | Fair representation learning | AIF360 LearningFairRepresentation |
| Post-processing | Equalized odds post-processing | Fairlearn, AIF360 |
| Post-training | Rejection option classification | AIF360 |

---

### 4.7 Reproducibility in ML Research

#### The Reproducibility Crisis

Estimates: 50-80% of ML papers are not reproducible. Causes:
- Undisclosed hyperparameters
- GPU non-determinism (CUDA non-deterministic operations)
- Environment differences (CUDA, cuDNN, package versions)
- Random seed not fixed or reported
- Training data not available or differently processed
- Code not released or incomplete
- Metric computation differences (macro vs micro, different tokenization)

#### OSS Reproducibility Tools

- **DVC:** Version ML experiments (data + code + params -> metrics). Apache-2.0.
- **MLflow Projects:** Conda/Docker-env-capsulated experiments. Apache-2.0.
- **Conda / conda-lock:** Reproducible environments with exact pinning.
- **NVIDIA NGC Containers:** Reproducible CUDA/cuDNN environments.
- **Weights & Biases:** Full environment capture. Free tier.
- **Pachyderm:** Data provenance for ML pipelines. Apache-2.0.
- **SeedBank** (NVIDIA): Seed management for GPU ML. MIT.

#### Reproducibility Checklist

- [ ] All hyperparameters reported (lr, batch size, optimizer, scheduler, etc.)
- [ ] All random seeds reported and fixed
- [ ] GPU deterministic mode enabled (`torch.use_deterministic_algorithms(True)`)
- [ ] CUDA deterministic algorithms (`CUBLAS_WORKSPACE_CONFIG=:4096:8`)
- [ ] Training/evaluation datasets exactly specified (version, preprocessing)
- [ ] Environment fully specified (OS, CUDA, Python packages with versions)
- [ ] Evaluation metrics precisely specified (implementation, exact metric)
- [ ] Statistical significance reported (confidence intervals, multiple runs)
- [ ] Code made available (with reproduction README)
- [ ] Model checkpoints published
- [ ] Training logs (loss curves, eval metrics) published

---
## Part 5: MLOps & Infrastructure

### 5.1 Experiment Tracking

#### MLflow Tracking

- **Core:** Log params, metrics, artifacts, source code per "run" organized into "experiments"
- **API:** `mlflow.log_param("lr", 0.001)`, `mlflow.log_metric("acc", 0.95)`,
  `mlflow.log_artifact("model.pth")`, `mlflow.autolog()` for auto-tracking
- **Storage:** Local, SQLite, MySQL, PostgreSQL, S3/GCS/Azure
- **UI:** `mlflow ui` — web dashboard for compare, visualize, download
- **Deployment:** `mlflow models serve` — REST API from MLflow format (with conda.yaml)
- **Auto-logging:** Supports PyTorch, TF, scikit-learn, XGBoost, LightGBM, etc.

#### Weights & Biases (W&B)

- **Type:** Commercial (generous free tier); `wandb` Python client is MIT. Server proprietary.
- **Features:** Tracking, sweeps, artifact storage, model registry, reports, team collab,
  LLM monitoring (prompt/response logging), model evaluation
- **Differentiator:** Visualization quality (interactive charts, parallel coordinates),
  artifact lineage (DAG-based "who trained what on which data"), production dashboards
- **Self-hosted alternative:** W&B Open Source (less feature-rich)

#### DVC Experiments

- **Type:** Open-source (Apache-2.0). Git-integrated experiment tracking.
- **Core:** `dvc exp run` executes pipeline -> `dvc exp show` compares experiments ->
  `dvc exp apply <id>` promotes to main branch. Git-native branches for each experiment.
- **Differentiator:** No external tracking server needed, Git-native, data versioning
  (large files via Git-LFS-like storage), fully offline

#### Neptune

- **Type:** Commercial (free tier) with OSS Python client (Apache-2.0)
- **Features:** Experiment tracking with metadata search, model registry, hardware/GPU
  monitoring, project management, custom dashboards

#### Comparison

| Tool | Type | Server | License | Git Integration | HPO | Artifact Storage |
|------|------|--------|---------|-----------------|-----|-----------------|
| MLflow | OSS | Self-hosted | Apache-2.0 | Commit tracked | Via Optuna | S3/GCS/local |
| W&B | Commercial | SaaS/self-hosted | MIT (client) | Commit tracked | Built-in sweeps | W&B Cloud/local |
| DVC | OSS | None (Git) | Apache-2.0 | Native (branches) | Via Optuna | DVC remote |
| Neptune | Commercial | SaaS | Apache-2.0 (client) | Commit tracked | Integration | Neptune Cloud |

---

### 5.2 Feature Stores

#### Feast

- **Initial Release:** 2020. Linux Foundation (LF AI & Data). Apache-2.0.
- **Core Concepts:**
  - Feature Repository: Git-based, YAML-defined feature definitions
  - Online serving: Redis/DynamoDB/Cassandra (low-latency)
  - Offline serving: BigQuery/Redshift/Spark (batch)
  - Feature Registry: Central catalog with lineage and ownership
  - Point-in-Time Joins: Historical feature retrieval for training data
- **API:**
  ```python
  import feast
  store = feast.FeatureStore(".")
  features = store.get_online_features(
      features=["driver:avg_rating"],
      entity_rows=[{"driver_id": 1234}]
  ).to_dict()
  ```
- **Community:** 5k+ stars, ~250+ contributors. Most widely adopted OSS feature store.
- **Differentiator:** Cloud-agnostic, code-defined features, any compute backend.

#### Hopsworks

- **Type:** Open-source (Apache-2.0) + Enterprise (commercial). Logical Clocks AB (Sweden).
- **Features:** Full ML platform with feature store core: engineering, serving (online/
  offline), training data creation, model management, serving (KServe), monitoring.
- **Differentiator:** RonDB (MySQL NDB fork) for sub-millisecond online serving, pre-computed
  feature vectors, Python API (hsfs), feature view templating.

#### Tecton

- **Type:** Commercial (by Feast creators). Enterprise feature platform.
- **Features:** Serverless, streaming features, automatic point-in-time joins, monitoring,
  governance, discovery. Feast is the OSS upstream of Tecton concepts.

---

### 5.3 Model Serving

#### BentoML

- **Initial Release:** 2019; v1.0 April 2023. BentoML Inc. Apache-2.0.
- **Concepts:** Bento (standardized packaging: env + model + logic + schemas + deps),
  Service (@bentoml.api), Runner (adaptive batching, GPU utilization), bentoctl (deploy
  to AWS/GCP/Azure/Lambda/SageMaker).
- **Differentiator:** Framework-agnostic, adaptive batching (microbatches for GPU), Python-native
  API (no Docker/K8s YAML needed), OpenAPI/gRPC, model monitoring.

#### Ray Serve

- **Initial Release:** 2020 (Ray v2.0 2022). Anyscale. Apache-2.0. LF AI & Data since 2023.
- **Concepts:** Python-first, built on Ray distributed computing. Model composition
  (pipeline multiple models), request batching, dynamic scaling (scale-to-zero), A/B testing.
- **Differentiator:** Ray ecosystem integration (same infra for training, serving, data
  processing), best-in-class model composition, native LLM + vision serving.
- **Performance:** 100+ node horizontal scaling, sub-10ms overhead, 100k+ QPS.

#### NVIDIA Triton Inference Server

- **Initial Release:** 2018 (as TensorRT Inference Server). NVIDIA. BSD-3-Clause.
- **Capabilities:** High-performance inference for DL + ML models. Dynamic batching, model
  pipelines (ensemble, BLS), model concurrency, GPU scheduling (MPS, MIG), Prometheus
  metrics, model repository (local/S3/GCS/Azure).
- **Formats:** TensorRT, ONNX, PyTorch (TorchScript), TF, TF SavedModel, OpenVINO, custom
  backends (Python, C++), DALI.
- **Differentiator:** Best GPU utilization (dynamic batching + concurrent execution),
  NVIDIA ecosystem (TensorRT, CUDA, NCCL), enterprise-grade reliability. 100x throughput
  improvement vs naive PyTorch/TF serving.

#### KServe (formerly KFServing)

- **Initial Release:** 2019. CNCF (incubating). Apache-2.0.
- **Capabilities:** Standardized K8s-based model serving with CRDs. Supports all major
  frameworks. Features: canary deployments, A/B testing, auto-scaling (Knative), request
  logging, metrics, transformers/explainers/outlier detectors.
- **Key Differentiator:** K8s-native, framework-agnostic, integrates with Istio/Knative
  for traffic splitting and autoscaling, built-in explainability and monitoring.

#### Model Serving Comparison

| Feature | BentoML | Ray Serve | Triton | KServe |
|---------|---------|-----------|--------|--------|
| Governance | BentoML Inc. | Anyscale | NVIDIA | CNCF |
| License | Apache-2.0 | Apache-2.0 | BSD-3 | Apache-2.0 |
| Stars | ~7k | Part of Ray (~40k) | ~8k | ~4k |
| GPU optimized | Yes (batching) | Yes | Yes (best-in-class) | Via backends |
| Model composition | Yes | Yes (pipelines) | Yes (ensembles) | Yes (transforms) |
| Python-native | Yes | Yes | Custom backends | Yes |
| K8s requirement | Optional | Optional | Optional | Required |
| Multi-framework | Yes | Yes | Yes | Yes |

---

### 5.4 Model Registries

#### MLflow Model Registry

- **Features:** Model versioning, stage transitions (Staging/Production/Archived), model
  lineage (source run), annotations, webhook integrations. `mlflow.register_model()`.
- **API:** REST API for CI/CD integration. Deploy-to-target with `mlflow.<target>.deploy()`.
- **Integration:** MLflow Tracking + Model Registry covers tracking and registry in one tool.

#### Hugging Face Hub

- **Features:** Full model hosting with Git-LFS, versioning, model card rendering, browser
  inference widget, ONNX weights viewer, tags/license/dataset metadata.
- **Registry Features:** Model tags, library filtering, pipeline tag (text-generation,
  image-classification, etc.), datasets used, metrics, model comparison.
- **API:** `huggingface_hub` Python library: `HfApi.create_repo()`, `upload_file()`,
  `list_models()`, `model_info()`.

#### Docker + OCI Registries for Models

- Emerging practice: Package models as OCI container images and store in container registries
  (Docker Hub, ECR, GCR, GHCR). Enables standard container tooling for ML.

---

### 5.5 Data Version Control

#### DVC (Data Version Control)

- **Initial Release:** 2017. Apache-2.0. 14k+ stars.
- **Core:** Git-based data and ML experiment management. DVC tracks datasets and ML models
  as pointers in Git (`.dvc` files), stores content in external storage (S3, GCS, Azure,
  SSH, local). `dvc pull/push` for data transfer. `dvc repro` for pipeline reproducibility.
- **DVC Pipeline:** `dvc.yaml` defines stages (cmd, deps, outs, params, metrics). Directed
  acyclic graph (DAG) of ML steps. `dvc exp run` for experiment tracking.
- **Use Case — ML Pipeline:** data_prep -> train -> evaluate as DVC stages. Change params
  or data, `dvc repro` runs only changed stages. Metrics compared across experiments.

#### LakeFS

- **Initial Release:** 2020. Apache-2.0. 10k+ stars.
- **Core:** Git-like operations on data lakes (S3, GCS, Azure Blob). Branch/commit/merge/
  revert for data. Enables CI/CD for data — create branch, modify, validate, merge to main.
  Atomic commits, zero-copy branching.
- **Use Case — ML Data Branching:** Data scientist branches training dataset, modifies it
  (clean, augment), validates with pipeline, merges to main. Rollback if issues detected.

#### Delta Lake

- **Initial Release:** 2019 (Databricks). Linux Foundation (since 2022). Apache-2.0.
- **Core:** ACID transactions on data lakes, scalable metadata handling, unified batch/
  streaming. Parquet-based with transaction log. Schema enforcement, time travel (data
  versioning).
- **ML Use Case:** Feature engineering with time travel — query data "as of" a specific
  version for reproducible training datasets.

---

### 5.6 CI/CD for ML

#### CML (Continuous Machine Learning, Iterative.ai)

- **Initial Release:** 2020. Apache-2.0.
- **Core:** CI/CD for ML in GitHub Actions, GitLab CI, Bitbucket. Auto-generate reports
  (metrics + visualizations as PR comments). `cml runner` for GPU runners. `cml publish`
  for report publishing.
- **Workflow:**
  1. PR with code changes triggers CI
  2. `cml runner` provisions GPU runner
  3. Train model, evaluate metrics
  4. CML compares metrics to main branch, generates report
  5. Report posted as PR comment. Merge if metrics OK.

#### Jenkins X for ML

- **Core:** Cloud-native CI/CD for Kubernetes with ML-specific pipelines. Preview environments,
  GitOps promotion, Tekton-based pipeline engine.
- **ML extension:** GPU pod templates, model promotion across environments (dev/ staging/
  production), automated model validation gates.

#### ML Pipeline Orchestrators (CI/CD Integration)

| Tool | CI Integration | GPU Support | Model Validation Gates |
|------|---------------|-------------|----------------------|
| CML | GitHub/GitLab/Bitbucket | Yes (CML runner) | Metric comparison |
| DVC | Any (Git-based) | Via scripts | Metric thresholds |
| Kubeflow Pipelines | K8s-native | Yes | Component validation |
| Tekton | K8s-native | Via GPU pods | Custom gates |
| Airflow | Time-based triggers | Via K8s PodOperator | Operator-level checks |

---

### 5.7 GPU/TPU Scheduling

#### SkyPilot (UC Berkeley)

- **Initial Release:** 2022. Apache-2.0. 7k+ stars.
- **Core:** Framework for running ML workloads on any cloud (AWS, GCP, Azure, GKE, EKS,
  AKS, Lambda, runpod, etc.). Automatic provisioning, cost optimization, failover.
  `sky launch` to run on cheapest available GPU region. `sky spot` for spot/preemptible
  instances with auto-recovery.
- **Key Feature:** Cost savings of 3-10x by selecting cheapest region/instance type for
  given GPU needs. Supports job queues, storage mounting, and multi-node clusters.

#### Runhouse

- **Initial Release:** 2022. Apache-2.0.
- **Core:** "Python-first, infrastructure-last" — define GPU compute as Python objects.
  `rh.cluster("gcp", instance_type="A100:4")` -> deploy function to cluster. Supports
  on-prem, cloud, and hybrid. `runhouse` library maps Python to distributed computing.
- **Key Differentiator:** Minimal infrastructure code, Python-native API, function-based
  GPU execution, state management, data locality support.

#### Kubernetes GPU Operators

- **NVIDIA GPU Operator:** Manages GPU resources on K8s. Drivers, CUDA toolkit, MPS, MIG,
  GPU monitoring (DCGM), node labeling. Automates GPU infrastructure on Kubernetes.
- **AMD GPU Operator:** Similar for AMD GPUs on K8s. ROCm drivers, GPU monitoring.
- **Volcano (CNCF):** Batch scheduling for K8s ML workloads. Gang scheduling, fair-share,
  resource reservation. Used by many K8s ML platforms.

---

### 5.8 Monitoring

#### Evidently

- **Initial Release:** 2021. Apache-2.0. 7k+ stars.
- **Core:** ML model monitoring and observability. Data drift (distribution changes), target
  drift, model performance degradation, regression/classification/ranking performance.
  Generates HTML reports, JSON profiles, integrates with MLflow, Airflow, Grafana.
- **Features:** `EvidentlyProfile` (statistical tests), `EvidentlyDashboard` (interactive
  reports), column-level drift detection, model quality monitoring, data quality monitoring.
- **Use Case — Production Model Monitoring:** Deploy Evidently to run after each batch
  prediction. If data drift exceeds threshold, trigger retraining pipeline via webhook.

#### WhyLabs

- **Type:** Commercial (free tier). OSS Python client (`whylogs`) is Apache-2.0.
- **Core:** `whylogs` profiles data (statistical summaries, distribution sketches) and ships
  to WhyLabs platform for monitoring. Supports data drift, model performance, data quality.
  Integrates with MLflow, Airflow, Kafka, Spark, streaming.
- **Key Differentiator:** Roll-up of data profiles over time, mergeable profiles (distributed
  logging), rich visualization on WhyLabs platform, pre-built monitors.

#### Arize

- **Type:** Commercial (free tier). OSS Python client is Apache-2.0.
- **Core:** ML observability platform. Model performance monitoring, data drift, LLM
  monitoring (embedding drift, prompt/response tracking), tracing, debugging. Integration
  with Jupyter (notebook-based debugging).
- **Key Differentiator:** Embedding drift analysis (UMAP visualization), LLM evaluation
  monitors (hallucination, toxicity, response quality), auto-generated insights.

#### Prometheus + Grafana for ML

- **Standard stack:** Prometheus collects metrics -> Grafana dashboards. Extend for ML with:
  - Custom exporters: Model prediction latency, throughput, GPU utilization (DCGM), data
    drift scores, model accuracy (if ground truth available)
  - ML metrics: Prediction distribution, feature value distributions, anomaly scores
  - Alerting: Prometheus rules -> Alertmanager -> PagerDuty/Slack
- **Advantages:** Battle-tested infra monitoring stack, scales to enterprise, integrates
  with Kubernetes, open-source (Apache-2.0 for both).

---
## Part 6: Contributing to AI/ML OSS Projects

### 6.1 ML Contributions

#### Model Contributions

- **New architectures:** Implementing novel architectures (transformers, SSMs, GNNs) in
  PyTorch/TF/JAX. Requires: paper understanding, reference implementation (often JAX or
  TF), PyTorch port, unit tests matching paper metrics, benchmark validation.
- **Model improvements:** Layer modifications, attention variants (Flash Attention, GQA,
  MLA, sliding window), activation functions (SwiGLU, GeGLU, ReGLU), normalization
  (RMSNorm, LayerNorm, GroupNorm).
- **Model compression:** Pruning (structured, unstructured), distillation, quantization
  contributions (new quantization formats, improved calibration).

**PR Checklist for Model Contributions:**
- [ ] Architecture implementation with docstrings
- [ ] Forward pass matches reference output (numerical comparison)
- [ ] Parameter count matches paper
- [ ] Training script with hyperparameters
- [ ] Pre-trained weights linked
- [ ] Integration test (model loads, forward pass works)
- [ ] Benchmark results vs paper claims
- [ ] Model card included (for standalone model contributions)

#### Optimizer Contributions

- **New optimizers:** AdamW, Lion, Sophia, LOMO, GaLore, DoGE. Implementation in
  PyTorch `torch.optim` style or Optax for JAX. Requires: convergence tests, memory
  footprint comparison, training speed benchmarks, stability testing across architectures.
- **Learning rate schedulers:** Cosine, cosine with warmup, linear, polynomial, inverse
  square root, WSD (warmup-stable-decay). Requires: scheduler unit tests, compatibility
  with optimizer, training curve validation.

#### Loss Function Contributions

- **New losses:** Contrastive (InfoNCE, NT-Xent), ranking (Triplet, MarginRanking),
  distributional (KL, JS, Wasserstein), adversarial (GAN losses), RL (PPO clip, policy
  gradient variants). Requires: numerical stability tests, gradient correctness (gradcheck),
  forward/backward integration tests.

---

### 6.2 Data Contributions

#### Dataset Creation

- **Data collection:** Web scraping (Common Crawl, custom crawlers), API collection,
  sensor data capture, human annotation (Prodigy, Label Studio, Doccano).
- **Data preprocessing:** Cleaning (deduplication, filtering, normalization), formatting
  (JSON Lines, Parquet, TFRecord), splitting (train/val/test with stratification).

#### Dataset Augmentation

- **Image:** torchvision transforms, Albumentations, imgaug. Geometry: flip, rotate, crop.
  Color: brightness, contrast, hue. Noise: Gaussian, speckle. Advanced: MixUp, CutMix,
  CutOut, RandAugment.
- **Text:** Back-translation, EDA (easy data augmentation: synonym replacement, random
  insertion/swap/delete), contextual augmentation (mask-fill with BERT), GPT-based
  paraphrasing.
- **Audio:** SpecAugment (frequency/time masking), noise injection, pitch shift, time
  stretch, room impulse response simulation.

#### Data Contribution Checklist

- [ ] Dataset follows project format standards
- [ ] License clearly specified (compatible with project)
- [ ] Dataset card/datasheet completed (see Template section)
- [ ] Data splits documented (train/val/test)
- [ ] Preprocessing pipeline reproducible (code or config)
- [ ] Privacy review (no PII in public datasets)
- [ ] Statistics published (size, class distribution, feature ranges)
- [ ] Benchmark baseline results provided
- [ ] Example usage code in README
- [ ] Known limitations and biases documented

---

### 6.3 Documentation

#### Types of ML Documentation Contributions

- **Tutorials:** Step-by-step guides for specific tasks (fine-tuning Llama, deploying with
  BentoML, setting up experiment tracking). Include: colab notebooks, example data,
  expected outputs.
- **API documentation:** Docstrings (numpy/google style), type hints, usage examples.
  Cross-references to related APIs, papers, tutorials.
- **Model cards:** Standard model documentation (see template). Required for all HF model
  contributions.
- **Dataset cards:** Standard dataset documentation (see template).
- **Cookbook/recipes:** Reproducible end-to-end examples for common tasks.
- **Architecture overviews:** Diagrams, explanations of model internals, comparison to
  related work.

#### Documentation Best Practices

- **Jupyter notebooks** for tutorials: Clear markdown cells, executable code, visualizations,
  saved outputs. Use `nbqa` for notebook linting.
- **Sphinx/MkDocs** for project docs: reStructuredText or Markdown, autodoc for API,
  intersphinx for cross-project references. Host on Read the Docs.
- **diagrams.net / Mermaid** for architecture diagrams. Mermaid is version-controllable
  (text-based diagram language).
- **Readability:** Code examples should be minimal, runnable, and tested.

---

### 6.4 Benchmarks

#### Evaluation Suite Contributions

- **New benchmark tasks:** Creating evaluation datasets for new capabilities (code
  execution, agentic tasks, multilingual reasoning, long-context understanding). Requires:
  dataset creation, ground truth labeling, evaluation metric implementation, baseline
  results.
- **Leaderboard contributions:** Adding new models to open leaderboards (HF Open LLM
  Leaderboard, LMSys Arena). Requires: running evaluation suite on target hardware,
  submitting results, model card updates.
- **Metric implementations:** New evaluation metrics (semantic similarity, factual
  consistency, instruction following, code functional correctness). Requires: metric
  definition, implementation, validation against human judgments.

#### Benchmark Submission Template

```
## Benchmark Submission

**Model Name:** [model name + version]
**Model Type:** [dense/MoE/SSM]
**Parameters (total):** [param count]
**Parameters (active):** [for MoE models]
**Context Length:** [tokens]
**Training Data:** [dataset description]
**Precision:** [FP16/int8/FP8/quant format]
**Hardware:** [GPU type + count]
**Framework:** [PyTorch/TF/JAX + version]
**Submission Date:** [YYYY-MM-DD]

### Results

| Benchmark | Metric | Score | 95% CI | # Shots |
|-----------|--------|-------|--------|---------|
| MMLU | Accuracy | X.X% | ±Y.Y | 5-shot |
| HumanEval | pass@1 | X.X% | ±Y.Y | 0-shot |
| GSM8K | Accuracy | X.X% | ±Y.Y | 5-shot |
| ... | ... | ... | ... | ... |

### Reproduction Commands
```bash
# Commands to reproduce results
```

### Notes
[Any relevant details about evaluation setup, data contamination checks, etc.]
```

---

### 6.5 Testing ML Code

#### Types of Tests

**Unit Tests:**
- **Numerical correctness:** Test layer outputs against reference implementations.
  `torch.allclose(output, expected, atol=1e-5)`. Seed-managed for deterministic comparison.
- **Shape correctness:** Output tensor shapes match specification.
- **Gradient correctness:** `torch.autograd.gradcheck` verifies analytical gradients match
  numerical approximations.
- **Edge cases:** Empty inputs, single-element batches, extreme values (inf, NaN), zero
  gradients.
- **Initialization:** Weight stats (mean, std) within expected range.

**Integration Tests:**
- **Training loop:** Train for N steps, verify loss decreases (or matches expected curve).
- **Overfit test:** Overfit on small batch (model should achieve near-zero loss on a single
  batch of data).
- **Checkpoint / resume:** Save mid-training, reload, continue. Training loss should match
  at same step.
- **Multi-GPU:** DDP/FSDP training produces same loss as single GPU (seed-controlled).
- **Mixed precision:** FP16/BF16 training produces same direction as FP32 (allowing small
  numerical differences).

**System / End-to-End Tests:**
- **Inference pipeline:** Raw input -> preprocessing -> model -> postprocessing -> output.
  Tests full pipeline integration.
- **Serving:** Deploy model, send request, verify response format and latency.
- **CI pipeline:** Merge gate — all above tests run on PR, model accuracy on eval set
  doesn't regress beyond tolerance.

#### Testing Tools

- **pytest:** Primary test framework. `pytest tests/ -v --tb=long`. Parametrized tests for
  hyperparameter sweeps. Fixtures for model/config/data.
- **torch.testing:** `torch.testing.assert_close()` (allclose with better error messages).
  `assert_close(actual, expected, rtol=1e-5, atol=1e-8)`.
- **hypothesis:** Property-based testing for ML. Generate random valid inputs, verify
  invariants (output type, range, shape).
- **coverage:** `pytest --cov=src/` for test coverage. Minimum 70-80% for core ML code.
- **pytest-benchmark:** Benchmarking tests for performance regression detection.

#### ML Testing Best Practices

```python
# Numerical correctness test example
import torch
import pytest

def test_attention_output():
    torch.manual_seed(42)
    model = MultiHeadAttention(d_model=512, n_heads=8)
    x = torch.randn(2, 10, 512)  # (batch, seq, dim)
    output = model(x, x, x)
    assert output.shape == (2, 10, 512)
    assert torch.isfinite(output).all()

def test_gradient_flow():
    model = SimpleTransformer(...)
    x = torch.randn(2, 10, 512, requires_grad=True)
    loss = model(x).mean()
    loss.backward()
    for name, param in model.named_parameters():
        assert param.grad is not None, f"No gradient for {name}"
        assert param.grad.isfinite().all(), f"NaN/Inf gradient for {name}"

@pytest.mark.slow
def test_overfit_single_batch():
    model = TransformerLM(vocab_size=1000, d_model=256)
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)
    data = torch.randint(0, 1000, (4, 32))
    for step in range(100):
        logits = model(data)
        loss = F.cross_entropy(logits.view(-1, 1000), data.view(-1))
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
    assert loss < 0.1, f"Model failed to overfit: loss={loss:.4f}"
```

---

### 6.6 Reproducibility

#### Seed Management

```python
import random, numpy as np, torch

def set_seed(seed: int = 42, deterministic: bool = True):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    if deterministic:
        torch.use_deterministic_algorithms(True, warn_only=True)
        os.environ["CUBLAS_WORKSPACE_CONFIG"] = ":4096:8"
        os.environ["CUDA_LAUNCH_BLOCKING"] = "1"
```

Note: Deterministic mode can be 10-50% slower than non-deterministic. Use `warn_only=True`
to log non-deterministic operations without crashing.

#### Environment Pinning

```bash
# Python package pinning
pip freeze > requirements.txt

# Conda environment export
conda env export > environment.yml

# Better: conda-lock for reproducible installs
conda-lock -f environment.yml -p linux-64
conda create -n myenv --file conda-linux-64.lock

# Even better: Docker with pinned base image
FROM nvidia/cuda:12.4.1-devel-ubuntu22.04
RUN pip install torch==2.5.0 --index-url https://download.pytorch.org/whl/cu124
```

#### Experiment Configs

Use structured config files (YAML, JSON, Hydra, or OmegaConf):

```yaml
# config.yaml
model:
  name: llama
  d_model: 4096
  n_layers: 32
  n_heads: 32
training:
  batch_size: 128
  learning_rate: 3e-4
  optimizer: adamw
  scheduler: cosine
  warmup_steps: 2000
  total_steps: 50000
data:
  dataset: fineweb-edu
  max_seq_len: 2048
  tokenizer: gpt2
logging:
  project: my-experiment
  run_name: test-run-001
seed: 42
```

**Register every config** with the experiment (mlflow.log_params, wandb.config.update).

---

### 6.7 CI for ML Projects

#### GitHub Actions for ML

```yaml
name: ML CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v5
      with:
        python-version: "3.11"
    - name: Install dependencies
      run: pip install -e ".[dev]"
    - name: Lint
      run: ruff check src/
    - name: Type check
      run: python -m mypy src/
    - name: Unit tests
      run: pytest tests/unit/ -v --timeout=60 -x
    - name: Integration tests
      run: pytest tests/integration/ -v --timeout=300

  gpu-tests:
    runs-on: [self-hosted, gpu]
    if: github.event.pull_request.draft == false
    steps:
    - uses: actions/checkout@v4
    - name: GPU tests
      run: |
        nvidia-smi
        pytest tests/gpu/ -v --timeout=600

  benchmark:
    runs-on: [self-hosted, gpu]
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v4
    - name: Run benchmarks
      run: |
        python benchmarks/run_all.py --output results.json
    - name: Check for regression
      run: |
        python scripts/check_regression.py \
          --current results.json \
          --baseline benchmarks/baseline.json \
          --tolerance 0.02
```

#### Key ML CI Patterns

- **Fast feedback:** Unit tests + lint/type check run on CPU (fast, cheap). GPU tests only
  on non-draft PRs or main merge.
- **Model accuracy gate:** Before merging, compare model accuracy against a baseline. If
  more than X% regression, block merge.
- **Benchmark comparison:** Periodic (nightly) benchmark suite comparing current main vs
  previous release. Publish results to dashboard.
- **GPU runner management:** Self-hosted runners for GPU tests (cost-effective vs cloud).
  Use `nvidia-smi` check as pre-step. Pre-pulled Docker images for fast startup.
- **Artifact caching:** Cache `~/.cache/huggingface/hub` and `~/.cache/torch` for faster CI.
- **Parallelism:** Run CPU and GPU tests in parallel where possible. Use `pytest -n auto`
  for parallel CPU tests.

---
## Part 7: Open Source AI Policy & Advocacy

### 7.1 Open vs Closed AI Models

#### The Core Debate

- **Pro-open argument:** Open-weight models democratize AI access, enable independent safety
  research, allow customization for underserved languages/domains, prevent power concentration,
  accelerate scientific progress (reproducible research), foster competition.
- **Pro-closed argument:** Open weights increase risks of misuse (bioterrorism, disinformation,
  surveillance by authoritarian regimes), make it harder to enforce safety guardrails,
  reduce incentive for safety investment (no liability for downstream harms), enable bad
  actors to circumvent export controls.
- **Gradient positions:** "Open where safe, closed where risky" — tiered release (open small
  models, controlled large models), capability-based restrictions, staged release with
  increasing openness over time.

#### Key Incidents

- **GPT-2 Staged Release (2019):** OpenAI initially withheld full GPT-2 over misuse concerns,
  released incrementally as safety mitigations improved. Set precedent for staged model release.
- **Stable Diffusion v1 (2022):** Released without filtering — used for non-consensual deepfakes
  and CSAM. Led to LAION-5B refiltering and ongoing platform moderation debates.
- **Llama 1 Leak (2023):** Originally research-only, weights leaked via torrent within a week.
  Demonstrated that "controlled release" is practically impossible — once weights are shared,
  distribution cannot be controlled.
- **Miqu 70B Leak (2024):** Anonymous release of a Mistral Large-quality model. Showed that
  even commercial model weights can be leaked or recreated.

#### The Leak-Proof Reality

Once model weights are distributed to even a small number of recipients, they WILL be
shared publicly. This makes "controlled open-weight" releases (research-only, audit-only)
practically unenforceable. The choice is effectively: fully open vs fully closed.

---

### 7.2 OSI's Open Source AI Definition

#### OSAID (Open Source AI Definition) v1.0

- **Approved:** October 2024 (by OSI board, after 2+ years of community process)
- **Status:** Still debated within OSS community. Multiple OSI-approved versions may coexist.
- **Key Requirements for "Open Source AI":**
  1. **Freedom to use** the system for any purpose (no behavioral restrictions)
  2. **Freedom to study** the system (requires access to: model architecture, training code,
     training data, evaluation methodology, model weights, tokenizer, inference code)
  3. **Freedom to modify** the system (same access requirements)
  4. **Freedom to share** (distribute original and modified versions)
  5. **No discrimination** against persons, groups, or fields of endeavor
  6. **License must not restrict** other software
  7. **License must be technology-neutral**
- **Implications:** Most current "open-weight" models (Llama, Gemma, Qwen, DeepSeek) do NOT
  meet this definition because they lack training data access, have behavioral use restrictions,
  or use custom non-OSI-approved licenses.
- **Criticisms of OSAID:**
  - Training data requirement is too strict (many legitimate reasons for non-public data:
    copyright, privacy, competitive advantage)
  - Risk-based approach is more practical than absolute openness requirements
  - OSI may not have jurisdiction over AI-specific licensing (vs software licensing)
  - May create confusion between "OSI-approved open source AI" and "open-weight models"
    that the public already calls "open source"

#### Contested Definitions

- **"Open Weights":** Model weights publicly available under some license (may have restrictions)
- **"Open Model":** Weights + architecture + inference code available (most fine-tuned HF models)
- **"Open Source AI" (OSAID):** Weights + data + code + no restrictions (very few models qualify)
- **"Fully Open":** All weights, data, code, training logs, evaluation results, and research
  papers (OLMo, Pythia, BLOOM)

---

### 7.3 Government AI Policy Affecting OSS

#### Current Policy Landscape

**United States:**
- No comprehensive federal AI law as of 2026. Executive Order 14110 (2023) is the primary
  federal action. NTIA RFC on open-weight models (2024) may lead to recommendations.
- NIST AI Risk Management Framework (RMF, January 2023) — voluntary guidance applicable to
  OSS AI. NIST is developing a companion "AI RMF Generative AI Profile" (2024-2025).
- Defense Production Act invoked (2023) to require AI model training reporting (>10^26 FLOPs).
- Export controls on advanced AI chips (October 2022, updated 2023, 2024) — restricts GPU
  sales to China, affecting global OSS AI development access.

**European Union:**
- EU AI Act (2024) — comprehensive regulation with tiered risk approach. OSS carve-out but
  with significant obligations for GPAI models and high-risk applications.
- Digital Services Act (DSA, 2022) — affects AI content moderation systems (includes OSS).
- Copyright Directive (2019) — text and data mining exception affects training data legality.
- General Data Protection Regulation (GDPR, 2018) — affects training data with PII.

**United Kingdom:**
- Pro-innovation approach (2023 white paper) — no binding legislation yet. Principles-based.
- AI Safety Summit (Bletchley Park, November 2023) — international agreement on AI safety
  testing, including for open-source models. Led to Bletchley Declaration.
- UK AI Safety Institute (AISI) — tests both closed and open models for safety.

**China:**
- Generative AI Measures (August 2023, updated 2024) — requires registration, security
  assessment, and content moderation for all public-facing generative AI. Open-source models
  hosted in China must comply. Restricts certain training data (state secrets, national security).
- Algorithm Regulation (2022) — transparency requirements for recommendation algorithms.
- Deep Synthesis Provisions (2023) — regulates AI-generated content (deepfakes, synthetic
  media). Labeling requirements.

**Japan:**
- Pro-innovation stance (2024 guidelines) — specifically notes that open-source AI development
  should not be hindered. Considering copyright exception for training data.
- Hiroshima AI Process (2023) — G7 leadership on AI governance. International Code of Conduct
  for organizations developing advanced AI systems (including OSS).

#### Where OSS AI Advocacy is Needed

| Issue | Current Status | Advocacy Need |
|-------|---------------|---------------|
| Export controls | GPU restrictions to China | Ensure OSS AI dev in restricted countries not collateral damage |
| Training data disclosure | Proposed requirements in EU/US | Support practical standards (not full data release) |
| Liability for downstream use | Unclear in most regimes | OSS AI liability protections (similar to software) |
| Model weight classification | Some want weights as "arms" (ITAR) | Weights = information, not munitions |
| Open-source carve-outs | EU AI Act has limited carve-out | Broader, clearer exemptions for OSS AI |

---

### 7.4 Coalition for Open AI

#### Key Organizations

| Organization | Focus | Key Actions |
|-------------|-------|-------------|
| OSI (Open Source Initiative) | Open source AI definition | OSAID v1.0, model license evaluation |
| Open Source AI Coalition | Broad OSS AI advocacy | Policy papers, lobbying, coalition building |
| Mozilla Foundation | Trustworthy AI | Mozilla.ai startup, AI policy advocacy |
| EleutherAI | OSS AI research | GPT-Neo/X, Pythia, open LLM research |
| BigScience/BigCode | Collaborative OSS AI | BLOOM, The Stack, responsible AI licensing |
| Nous Research | Open model training | Hermes series, fine-tuning innovations |
| Hugging Face | OSS AI infrastructure | Hub, transformers, policy advocacy |
| LAION | Open dataset creation | LAION-5B, Open Assistant, ethical dataset work |
| Allen AI (AI2) | Open AI research | OLMo (fully open model), AI policy research |
| Stanford HAI | AI policy research | AI Index Report, policy recommendations |
| Future of Life Institute | AI safety (includes OSS concerns) | Open letter on AI pauses, OSS risk analysis |

#### Notable Open Letters and Actions

- **Pause Giant AI Experiments (March 2023):** FLI open letter calling for 6-month pause on
  training models >GPT-4. Signed by 30k+ (including Musk, Wozniak, Bengio). Controversial in
  OSS community — would have disproportionately affected open research.
- **Open Source AI Letter to EU (2023):** Coalition of OSS orgs successfully advocated for
  OSS carve-out in EU AI Act.
- **NTIA RFC Response (2024):** Multiple OSS organizations submitted detailed responses about
  open-weight model regulation. Key themes: don't restrict weights-as-code, support responsible
  disclosure, fund safety research.
- **Bletchley Declaration (2023):** International agreement at UK AI Safety Summit. 28 countries
  agreed on shared AI safety concerns. Open-source models discussed as both risk vectors and
  safety-enabling tools.

---

### 7.5 Foundation Models & Regulatory Compliance

#### Compliance Challenges for OSS Foundation Models

**Training Data Compliance:**
- EU AI Act requires documented data governance policy
- GDPR requires lawful basis for processing (including training data)
- Copyright opt-out regime being developed (EU, Japan, others)
- Many OSS model developers lack legal infrastructure to comply

**Safety Documentation:**
- EU AI Act requires model documentation (GPAI models)
- Model cards partially address this but may not meet regulatory requirements
- Systemic risk models (>10^25 FLOPs) need incident reporting, cybersecurity, evaluation

**Downstream Liability:**
- If an OSS model is deployed in a high-risk system, the deployer is regulated
- Model provider can be held responsible if they "intended" high-risk use
- Open-source liability shields are uncertain for AI models

#### Compliance Strategy for OSS AI Projects

1. **Document everything** — training data sources, preprocessing, filtering, deduplication,
   contamination checks, evaluation methodology, safety testing
2. **Choose permissive license** — avoid custom licenses with complex compliance chains
3. **Release under OSI-approved license** if possible — accessing EU Act OSS carve-out
4. **Publish model card** with full transparency (including limitations and biases)
5. **Conduct and document safety testing** — red-teaming, bias evaluation, misuse assessment
6. **Implement usage monitoring** (optional) — for downstream visibility (HF Hub download
   stats, Spaces usage)
7. **Engage with regulators** — submit comments on proposed rules, participate in standards
   development (NIST, ISO/IEC 42001, CEN/CENELEC)
8. **Join industry coalitions** — influence policy development collectively

---
## Part 8: Templates

### 8.1 Model Card Template

```markdown
---
license: apache-2.0
language:
- en
- fr
- de
- es
tags:
- text-generation
- transformers
- pytorch
datasets:
- organization/dataset-name
metrics:
- accuracy
- f1
- perplexity
---

# Model Card: [Model Name]

## Model Details

- **Model Name:** [Model name and version]
- **Model Architecture:** [e.g., Decoder-only transformer with GQA, SwiGLU, RoPE]
- **Parameters:** [Total params / active params for MoE]
- **Context Length:** [Maximum sequence length in tokens]
- **Training Framework:** [PyTorch/TensorFlow/JAX + version]
- **Hardware Used:** [GPU type + count, training duration]
- **Release Date:** [YYYY-MM-DD]
- **Developed by:** [Organization/individual]
- **Model License:** [License name and link]
- **Model Card Author(s):** [Names]

## Intended Use

### Primary Intended Uses
- [Use case 1: e.g., Chatbot, code generation, text summarization]
- [Use case 2]
- [Use case 3]

### Out-of-Scope Uses
- [Use case the model should NOT be used for]
- [Known failure modes or high-risk applications]

## Factors

### Relevant Factors
- **Language:** [Languages supported, with proficiency notes]
- **Domain:** [Domains the model was trained on, performs well on]
- **Demographic:** [Any demographic factors affecting performance]

### Evaluation Factors
- Factors the model was evaluated on, with rationale

## Metrics

### Model Performance

| Benchmark | Metric | Score | 95% CI | Notes |
|-----------|--------|-------|--------|-------|
| MMLU | Accuracy | XX.X% | ±Y.Y | 5-shot |
| HumanEval | pass@1 | XX.X% | ±Y.Y | 0-shot |
| GSM8K | Accuracy | XX.X% | ±Y.Y | 5-shot |
| HellaSwag | Accuracy | XX.X% | ±Y.Y | 0-shot |
| [Other] | [Metric] | XX.X% | ±Y.Y | [N-shot] |

### Fairness & Bias Evaluation

| Evaluation | Result | Methodology |
|------------|--------|-------------|
| BBQ | XX.X% accuracy across groups | Standard BBQ protocol |
| WinoBias | XX.X% coreference accuracy | Type 1 + Type 2 |
| BOLD (sentiment) | Mean sentiment: X.XX ± Y.YY | Per-group analysis |
| [Other] | [Result] | [Methodology] |

## Evaluation Data

- **Primary Evaluation Datasets:** [Links to datasets used]
- **Evaluation Methodology:** [Detailed methodology, few-shot settings, exact prompts used]
- **Data Contamination Check:** [Method used to check overlap, results]

## Training Data

- **Dataset(s):** [List of training datasets, sizes, sources]
- **Data Composition:** [Language breakdown, domain breakdown, data sources]
- **Data Filtering:** [Deduplication method, quality filtering, PII removal, NSFW filtering]
- **Token Count:** [Total training tokens]
- **Data Freshness:** [Time period of training data]

## Quantitative Analyses

### Performance by Language
| Language | MMLU | Other Benchmark | Notes |
|----------|------|-----------------|-------|
| English | XX% | XX% | Primary training language |
| French | XX% | XX% | — |
| German | XX% | XX% | — |
| [Other] | XX% | XX% | — |

### Performance by Domain
[Breakdown by training domain, if applicable]

## Ethical Considerations

- **Known Biases:** [Documented biases from evaluation]
- **Potential Harms:** [Misuse scenarios, dual-use concerns]
- **Mitigations Implemented:** [RLHF, DPO, content filtering, system prompts, guardrails]
- **Residual Risks:** [Remaining risks after mitigations]

## Caveats and Recommendations

- **Known Limitations:** [Specific known failure modes, edge cases]
- **Recommended Deployment:** [Recommended use cases, deployment guidelines]
- **Safety Guardrails:** [Recommended safety measures for deployment]
- **Further Evaluation Needed:** [Areas where more testing is required before deployment]

## Environmental Impact

- **Compute Provider:** [Cloud provider or data center]
- **Hardware:** [GPU/TPU type, count]
- **Training Duration:** [Wall-clock time]
- **Total Compute:** [GPU-hours or TPU-hours]
- **Estimated Carbon Emissions:** [kg CO2e, with methodology]
- **Carbon Intensity:** [g CO2e/kWh for the grid used]
- **Offset:** [Any carbon offset measures taken]

## Citation

```bibtex
@article{organization2024modelname,
  title={[Model Name]},
  author={[Author List]},
  journal={[Journal/Preprint]},
  year={2024}
}
```

---

### 8.2 Dataset Card Template

```yaml
---
dataset_info:
  features:
  - name: text
    dtype: string
  - name: label
    dtype:
      class_label:
        names:
          0: negative
          1: positive
  - name: source
    dtype: string
  splits:
  - name: train
    num_bytes: 123456789
    num_examples: 100000
  - name: validation
    num_bytes: 12345678
    num_examples: 10000
  - name: test
    num_bytes: 12345678
    num_examples: 10000
  download_size: 45678901
  dataset_size: 135802469
license: cc-by-4.0
task_categories:
- text-classification
- sentiment-analysis
language:
- en
- fr
pretty_name: My Great Dataset
tags:
- social-media
- user-generated-content
size_categories:
- 100K<n<1M
---
```

# Dataset Card: [Dataset Name]

## Dataset Description

- **Dataset Name:** [Full name and version]
- **Developed by:** [Organization/individual]
- **Dataset License:** [License name and link]
- **Dataset Size:** [Number of examples, size on disk]
- **Languages:** [Languages included]
- **Task Categories:** [Classification, generation, QA, etc.]

## Dataset Composition

- **Total Instances:** [XXX,XXX]
- **Splits:** Train (XX%), Validation (Y%), Test (Z%)
- **Feature Description:**
  - `text`: [Description of text field]
  - `label`: [Description of label field, label names]
  - `metadata`: [Any additional fields]
- **Class Distribution:** [Per-class counts and percentages]
- **Data Sources:** [Where the data was collected from]

## Data Collection

- **Collection Method:** [Web scraping, crowdsourcing, sensor data, etc.]
- **Collection Period:** [Start date - End date]
- **Ethical Review:** [Was ethical review conducted?]
- **Consent:** [How was consent obtained?]
- **Annotator Demographics:** [For human-annotated datasets]

## Data Preprocessing

- **Cleaning Steps:** [Deduplication, filtering, normalization]
- **Annotation Process:** [How labels were created/verified]
- **Quality Control:** [Inter-annotator agreement, validation methods]
- **PII Removal:** [Methods used to remove personal information]
- **License Compliance:** [Only data with compatible licenses included]

## Dataset Uses

### Intended Uses
- [Task 1]: [Description]
- [Task 2]: [Description]

### Out-of-Scope Uses
- [Use cases the dataset should NOT be used for]
- [Known coverage gaps or biases]

## Bias and Fairness

- **Known Biases:** [Demographic, geographic, temporal biases]
- **Representation Analysis:** [Coverage across groups, languages, domains]
- **Potential Impact:** [How biases might affect downstream applications]

## Maintenance

- **Maintainer:** [Entity responsible for maintenance]
- **Update Policy:** [How and when updates are made]
- **Errata:** [How errors are reported and corrected]
- **Versioning:** [Version history and changelog]

## Citation

```bibtex
@dataset{organization2024datasetname,
  title={[Dataset Name]},
  author={[Author List]},
  year={2024},
  publisher={[Publisher]},
  url={[Dataset URL]}
}
```

## Contact

- [Contact email or issue tracker for questions]

---

### 8.3 ML Experiment Tracking Setup Guide

#### MLflow Setup

```bash
# Install
pip install mlflow

# Start tracking server (with PostgreSQL backend and S3 artifact store)
mlflow server \
  --backend-store-uri postgresql://user:pass@host:5432/mlflow \
  --default-artifact-root s3://my-bucket/mlflow-artifacts \
  --host 0.0.0.0 \
  --port 5000
```

```python
# Experiment tracking in code
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("transformer-benchmark")

with mlflow.start_run(run_name="run-v1-lr-3e-4"):
    # Log parameters
    mlflow.log_params({
        "model": "transformer",
        "d_model": 512,
        "n_layers": 6,
        "n_heads": 8,
        "learning_rate": 3e-4,
        "optimizer": "adamw",
        "batch_size": 64,
        "scheduler": "cosine",
        "warmup_steps": 2000,
    })

    # Log metrics during training
    for epoch in range(10):
        train_loss = train_epoch()
        val_loss = evaluate()
        mlflow.log_metrics({
            "train_loss": train_loss,
            "val_loss": val_loss,
            "perplexity": exp(val_loss),
        }, step=epoch)

    # Log model artifacts
    mlflow.pytorch.log_model(model, "model")
    mlflow.log_artifact("config.yaml")
    mlflow.log_artifact("tokenizer.json")

    # Log dataset info
    mlflow.log_input(
        mlflow.data.from_pandas(train_df, source="s3://bucket/train.parquet")
    )

    # Auto-log git commit
    mlflow.log_param("git_commit", mlflow.get_git_commit())
```

#### Weights & Biases Setup

```bash
pip install wandb
wandb login  # API key from https://wandb.ai/authorize
```

```python
import wandb

wandb.init(
    project="transformer-benchmark",
    config={
        "model": "transformer",
        "d_model": 512,
        "n_layers": 6,
        "learning_rate": 3e-4,
        "batch_size": 64,
    },
    tags=["baseline", "adamw"],
    notes="First benchmark run with default settings",
)

# Log metrics (auto-logged by wandb.watch() for gradients)
for epoch in range(10):
    train_loss = train_epoch()
    val_loss = evaluate()
    wandb.log({
        "train/loss": train_loss,
        "val/loss": val_loss,
        "val/perplexity": exp(val_loss),
        "epoch": epoch,
    })

# Log model artifact
wandb.log_artifact("model.pt", type="model", metadata={"epochs": 10})
wandb.finish()
```

#### DVC + Git Experiments Setup

```bash
# Initialize DVC
git init
dvc init
dvc remote add -d myremote s3://my-bucket/dvc-store

# Create pipeline stages
dvc run -n prepare -d src/prepare.py -d data/raw \
        -o data/processed \
        python src/prepare.py

dvc run -n train -d src/train.py -d data/processed \
        -p train.lr,train.epochs \
        -M metrics.json \
        python src/train.py --lr $PARAM_LR --epochs $PARAM_EPOCHS

# Run experiments
dvc exp run --set-param train.lr=1e-3  # Experiment 1
dvc exp run --set-param train.lr=3e-4  # Experiment 2

# Compare
dvc exp show

# Apply best experiment to workspace
dvc exp apply <experiment-id>
```

---

### 8.4 GPU CI/CD Pipeline Template

```yaml
# .github/workflows/ml-ci.yml
name: ML CI/CD Pipeline

on:
  pull_request:
    paths:
      - "src/**"
      - "tests/**"
      - "requirements.txt"
  push:
    branches: [main]

env:
  PYTHON_VERSION: "3.11"
  PYTORCH_VERSION: "2.5.0"
  CACHE_DIR: /tmp/.cache

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4  # v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      - name: Install dev dependencies
        run: |
          python -m pip install --upgrade pip
          pip install ruff mypy pytest
      - name: Lint
        run: ruff check src/ tests/
      - name: Type check
        run: mypy src/

  unit-tests:
    needs: lint-and-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      - name: Install dependencies
        run: |
          pip install torch==${{ env.PYTORCH_VERSION }} --index-url https://download.pytorch.org/whl/cpu
          pip install -e ".[dev]"
      - name: Cache model weights
        uses: actions/cache@v4
        with:
          path: ~/.cache/huggingface
          key: hf-cache-${{ hashFiles('tests/conftest.py') }}
      - name: Run unit tests
        run: |
          pytest tests/unit/ \
            -v \
            --timeout=120 \
            --cov=src/ \
            --cov-report=xml \
            -n auto
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage.xml

  gpu-tests:
    needs: unit-tests
    runs-on: [self-hosted, gpu, Linux]
    if: github.event.pull_request.draft == false
    container:
      image: pytorch/pytorch:2.5.0-cuda12.4-cudnn9-devel
      options: --gpus all
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: |
          pip install -e ".[dev]"
      - name: Run GPU tests
        run: |
          nvidia-smi
          pytest tests/gpu/ \
            -v \
            --timeout=600 \
            -k "not slow"
      - name: Run integration tests
        run: |
          pytest tests/integration/ \
            -v \
            --timeout=900

  benchmark:
    needs: gpu-tests
    if: github.ref == 'refs/heads/main'
    runs-on: [self-hosted, gpu, Linux]
    container:
      image: pytorch/pytorch:2.5.0-cuda12.4-cudnn9-devel
      options: --gpus all
    steps:
      - uses: actions/checkout@v4
      - name: Install
        run: pip install -e ".[dev]"
      - name: Run benchmarks
        run: |
          python benchmarks/run_all.py \
            --output results.json \
            --device cuda
      - name: Check regression
        run: |
          python scripts/check_regression.py \
            --current results.json \
            --baseline benchmarks/baseline.json \
            --tolerance 0.02 \
            --fail-on-regression
      - name: Upload benchmark results
        uses: actions/upload-artifact@v4
        with:
          name: benchmark-results
          path: results.json
      - name: Update baseline (if significant improvements)
        if: success()
        run: |
          python scripts/update_baseline.py \
            --current results.json \
            --baseline benchmarks/baseline.json \
            --improvement-threshold 0.05
```

#### GitLab CI GPU Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - gpu-test
  - benchmark

variables:
  PIP_CACHE_DIR: "$CI_PROJECT_DIR/.pip-cache"

lint:
  stage: lint
  image: python:3.11
  script:
    - pip install ruff mypy
    - ruff check src/ tests/
    - mypy src/
  cache:
    paths:
      - .pip-cache/

unit-tests:
  stage: test
  image: python:3.11
  script:
    - pip install torch --index-url https://download.pytorch.org/whl/cpu
    - pip install -e ".[dev]"
    - pytest tests/unit/ -v --timeout=120 --cov=src/
  cache:
    paths:
      - .pip-cache/

gpu-tests:
  stage: gpu-test
  tags:
    - gpu
    - nvidia
  image: pytorch/pytorch:2.5.0-cuda12.4-cudnn9-devel
  script:
    - nvidia-smi
    - pip install -e ".[dev]"
    - pytest tests/gpu/ -v --timeout=600
    - pytest tests/integration/ -v --timeout=900

benchmark:
  stage: benchmark
  tags:
    - gpu
    - nvidia
  image: pytorch/pytorch:2.5.0-cuda12.4-cudnn9-devel
  only:
    - main
  script:
    - pip install -e ".[dev]"
    - python benchmarks/run_all.py --output results.json
    - python scripts/check_regression.py --current results.json --baseline benchmarks/baseline.json
  artifacts:
    paths:
      - results.json
```

---

### 8.5 Model Release Checklist

#### Pre-Release

- [ ] Model weights fully trained and evaluated
- [ ] Final evaluation on held-out test sets completed
- [ ] Benchmark results documented and comparable to published baselines
- [ ] Model card drafted and reviewed
- [ ] Safety evaluation completed (red-teaming, bias testing, harmful output testing)
- [ ] Known limitations and risks documented
- [ ] Legal review of model license completed
- [ ] Training data compliance verified (licenses, copyright, privacy)
- [ ] Opt-out process for training data rightsholders (if applicable)
- [ ] Compute/carbon footprint documented
- [ ] Export control review completed
- [ ] Third-party dependencies audited (for supply chain security)
- [ ] License compatibility matrix reviewed (if merged/fine-tuned model)

#### Release Preparation

- [ ] Model converted to deployment formats (ONNX, GGUF, safetensors)
- [ ] Quantized versions prepared (FP16, INT8, INT4, AWQ, GPTQ)
- [ ] Tokenizer/config published alongside model
- [ ] Model uploaded to Hugging Face Hub (or distribution platform)
- [ ] GitHub release created (code + model card + license + README)
- [ ] Model card published with all required sections
- [ ] Dataset card published (if releasing training data)
- [ ] Blog post / release announcement drafted
- [ ] Leaderboard submission prepared (Open LLM Leaderboard, LMSys Arena)
- [ ] Community communication channels prepared (Discord, Twitter, mailing list)
- [ ] Inference example code published (Colab notebook, minimal script)
- [ ] Fine-tuning guide (if applicable)
- [ ] API/serving compatibility tested (vLLM, TGI, llama.cpp, ONNX Runtime)

#### Post-Release

- [ ] Monitor community feedback and issues
- [ ] Track downloads and usage statistics
- [ ] Respond to safety/bug reports
- [ ] Plan version updates (bug fixes, security patches, improvements)
- [ ] Engage with downstream developers (documentation, support)
- [ ] Update model card if new information emerges
- [ ] Periodic safety re-evaluation (as deployment patterns evolve)
- [ ] Compliance monitoring (regulatory changes affecting model)

---

### 8.6 ML Reproducibility Checklist

#### Environment

- [ ] Python version specified (e.g., `python == 3.11.5`)
- [ ] All dependencies listed with versions (`pip freeze > requirements.txt`)
- [ ] GPU drivers and CUDA version documented (`nvidia-smi`, `nvcc --version`)
- [ ] cuDNN version documented
- [ ] OS and kernel version documented
- [ ] Container image specified (if Docker/Singularity used)
- [ ] Conda environment exported (`conda env export > environment.yml`)
- [ ] Hardware configuration documented (CPU, RAM, GPU model and count)

#### Code

- [ ] All source code committed to version control
- [ ] Git commit hash captured in experiment logs
- [ ] No uncommitted changes in critical code paths
- [ ] Code dependencies pinned (not just `requirements.txt` but exact versions)
- [ ] Random seed management: `random.seed()`, `np.random.seed()`,
  `torch.manual_seed()`, `torch.cuda.manual_seed_all()`
- [ ] GPU determinism enabled where possible:
  ```python
  torch.use_deterministic_algorithms(True)
  os.environ["CUBLAS_WORKSPACE_CONFIG"] = ":4096:8"
  ```
- [ ] Data loading uses deterministic ordering (no shuffle without fixed seed)

#### Data

- [ ] Training dataset version specified (URL, commit hash, or exact download date)
- [ ] Data preprocessing code committed and versioned
- [ ] Preprocessing steps fully automated (no manual steps)
- [ ] Dataset splits fixed and documented (train/val/test)
- [ ] Data augmentation fixed (seeded, deterministic)
- [ ] Tokenizer version specified
- [ ] Data contamination check performed (train/test overlap)

#### Training

- [ ] All hyperparameters reported and committed:
  - Learning rate, scheduler, warmup, optimizer (with hyperparams), batch size, gradient
    accumulation steps, weight decay, dropout, label smoothing, layer norm epsilon
- [ ] Model architecture precisely specified (config file in git)
- [ ] Number of training steps/epochs specified
- [ ] Evaluation frequency and metric computation documented
- [ ] Training loss curves logged and available
- [ ] Checkpoints saved at regular intervals
- [ ] Best checkpoint selection criteria documented

#### Evaluation

- [ ] Evaluation script committed and versioned
- [ ] Evaluation metric implementation specified (library, version, exact function)
- [ ] Evaluation batch size specified
- [ ] Inference hyperparameters documented (temperature, top_p, top_k, repetition penalty)
- [ ] Few-shot prompts documented and committed
- [ ] Metrics reported with confidence intervals (bootstrapped or multiple runs)
- [ ] Statistical significance testing for comparisons
- [ ] Multiple runs reported (mean ± std over ≥3 runs with different seeds)

#### Results

- [ ] All results in the paper/README are reproducible with the provided code/config
- [ ] Ablation studies have reproducible code paths
- [ ] Figures can be regenerated from logged data
- [ ] Trained model weights published (with license)
- [ ] Leaderboard submissions documented (exact submission command)
- [ ] Human evaluation setup documented (if applicable)

---

### 8.7 AI Ethics Review Checklist

#### System Overview

- [ ] What is the AI system's intended purpose?
- [ ] Who are the intended users and beneficiaries?
- [ ] What decisions or actions will the system influence or automate?
- [ ] Is there human oversight? How is it implemented?
- [ ] What is the scope of deployment (domain, geography, population)?

#### Data Ethics

- [ ] Was training data collected with appropriate consent?
- [ ] Is there PII in the training data? How is it handled?
- [ ] Are data subjects' rights respected (deletion, correction, opt-out)?
- [ ] Does the data represent diverse demographics adequately?
- [ ] Have data sources been checked for license compatibility?
- [ ] Is the data free from known discriminatory patterns?
- [ ] Has the data been checked for representativeness of intended use populations?
- [ ] Is synthetic data used? If so, has quality been validated?

#### Fairness & Bias

- [ ] Has the model been evaluated for bias across demographic groups?
- [ ] What fairness metrics were used?
- [ ] Are there statistically significant performance differences between groups?
- [ ] If disparities exist, are they acceptable given the use case?
- [ ] Have mitigation strategies been applied for identified biases?
- [ ] Is there ongoing monitoring for disparate impact in production?
- [ ] Have affected communities been consulted about the system?

#### Transparency

- [ ] Is the model card published with full documentation?
- [ ] Are known limitations and failure modes documented?
- [ ] Is the system capable of explaining its decisions (interpretability)?
- [ ] Are users informed they are interacting with an AI system?
- [ ] Is the training data provenance documented?
- [ ] Are the model's capabilities and limitations accurately represented in marketing?

#### Safety & Security

- [ ] Has the model been red-teamed for harmful outputs?
- [ ] Are there guardrails against misuse?
- [ ] Is there a vulnerability disclosure policy?
- [ ] Is the model robust to adversarial inputs?
- [ ] Are there content filters for harmful generation?
- [ ] Is the model tested for prompt injection attacks (for LLMs)?
- [ ] Is the model evaluated for dual-use concerns?

#### Accountability

- [ ] Who is responsible for the system's outputs?
- [ ] Is there a mechanism for affected parties to seek redress?
- [ ] Are system decisions auditable?
- [ ] Are there processes for incident response?
- [ ] Is there a mechanism for stakeholders to raise concerns?
- [ ] Have external experts been consulted on ethical implications?

#### Privacy

- [ ] Does the system comply with applicable privacy regulations (GDPR, CCPA, etc.)?
- [ ] Is user data protected during inference (no data leakage)?
- [ ] Are model outputs free of training data memorization (tested)?
- [ ] Is differential privacy considered?
- [ ] Are users' rights to access, correct, and delete their data supported?
- [ ] Is inference done on-device or server-side? Privacy implications documented?

#### Environmental Impact

- [ ] Is the training compute/carbon footprint documented?
- [ ] Are energy-efficient training/inference methods used?
- [ ] Is the deployment energy-optimized?
- [ ] Are there plans to offset carbon emissions?

#### Deployment & Monitoring

- [ ] Is there a plan for monitoring model behavior in production?
- [ ] Are there clear criteria for model rollback if issues detected?
- [ ] Is there a process for updating the model as new data becomes available?
- [ ] Are there mechanisms for user feedback on harmful outputs?
- [ ] Is there a sunset/discontinuation plan for the system?
- [ ] Are downstream users informed of model limitations?

#### Long-Term Considerations

- [ ] Could the system contribute to concentration of power?
- [ ] Could the system be used for surveillance or social control?
- [ ] Could the system have negative environmental impacts at scale?
- [ ] Are there potential effects on employment or economic inequality?
- [ ] Is the system aligned with human rights frameworks?
- [ ] Have interdisciplinary perspectives been included in the review?

---

### 8.8 Benchmark Submission Template

```markdown
---
submission_type: benchmark
benchmark: open_llm_leaderboard_v2
date: YYYY-MM-DD
---

# Benchmark Submission

## Model Information

- **Model Name:** [Full model name]
- **Model Version:** [Version or hash]
- **Model Type:** [Dense / MoE / SSM / Other]
- **Total Parameters:** [Number of parameters]
- **Active Parameters (MoE only):** [Number of active parameters per token]
- **Context Length:** [Maximum tokens supported]
- **Training Data:** [Brief data description]
- **Training Compute:** [GPU-hours, GPU type]
- **Base Model (if fine-tuned):** [Base model name]
- **Quantization (if applicable):** [FP16, INT8, AWQ, GPTQ, GGUF]
- **License:** [Model license]

## Submission Details

- **Submission Date:** [YYYY-MM-DD]
- **Submitting Organization:** [Organization name]
- **Submitter Name:** [Optional: Name]
- **Hardware Used for Evaluation:** [GPU type, count, memory]
- **Framework:** [PyTorch version, transformers version, etc.]
- **Inference Engine:** [vLLM, TGI, llama.cpp, Hugging Face, etc.]
- **Precision for Evaluation:** [FP16, INT8, FP8, etc.]

## Results

### Main Benchmarks

| Benchmark | Metric | Score | 95% CI | # Shots | Few-shot Template | Notes |
|-----------|--------|-------|--------|---------|-------------------|-------|
| GPQA | Accuracy | XX.X% | ±Y.Y | 0-shot | [Template] | — |
| MuSR | Accuracy | XX.X% | ±Y.Y | 0-shot | [Template] | — |
| MATH Lvl 5 | Accuracy | XX.X% | ±Y.Y | 4-shot | [Template] | — |
| MMLU-Pro | Accuracy | XX.X% | ±Y.Y | 5-shot | [Template] | — |
| BBH | Accuracy | XX.X% | ±Y.Y | 3-shot | [Template] | — |
| IFEval | Strict Acc | XX.X% | ±Y.Y | 0-shot | [Template] | — |

### Additional Benchmarks

| Benchmark | Metric | Score | 95% CI | Notes |
|-----------|--------|-------|--------|-------|
| HumanEval | pass@1 | XX.X% | ±Y.Y | — |
| MBPP | pass@1 | XX.X% | ±Y.Y | — |
| GSM8K | Accuracy | XX.X% | ±Y.Y | — |
| MMLU | Accuracy | XX.X% | ±Y.Y | 5-shot |
| ARC-Challenge | Accuracy | XX.X% | ±Y.Y | 25-shot |
| HellaSwag | Accuracy | XX.X% | ±Y.Y | 10-shot |
| TruthfulQA (MC2) | Accuracy | XX.X% | ±Y.Y | 0-shot |

### Safety / Bias Evaluation

| Benchmark | Metric | Score | Notes |
|-----------|--------|-------|-------|
| BBQ (overall) | Accuracy | XX.X% | Across all bias categories |
| BBQ (bias score) | Score | ±X.XX | Across all bias categories |
| WinoBias (aggregate) | Accuracy | XX.X% | Coreference resolution |
| BOLD (mean sentiment) | Score | X.XX | Across demographic groups |
| Toxicity (RealToxicityPrompts) | Mean max toxicity | X.XX | — |

## Reproduction Commands

```bash
# Set up environment
git clone https://github.com/organization/repo
cd repo
pip install -e .[eval]

# Run evaluation
python run_eval.py \
  --model organization/model-name \
  --output results.json \
  --benchmarks gpqa musr math-lvl-5 mmlu-pro bbh ifeval \
  --precision fp16 \
  --batch-size 4
```

## Data Contamination Checks

- [ ] N-gram overlap analysis performed (training vs. evaluation data)
- [ ] Any overlapping examples identified: [Yes/No, count]
- [ ] Anomalous benchmark scores (much higher than expected): [None / List]
- [ ] Contamination mitigation: [e.g., removed overlapping examples]

## Notes

[Any additional information about the evaluation setup, caveats, or unusual findings]

---

## 9. References & Further Reading

### Foundational Papers
- Vaswani et al. (2017). "Attention Is All You Need." NeurIPS.
- Devlin et al. (2019). "BERT: Pre-training of Deep Bidirectional Transformers." NAACL.
- Brown et al. (2020). "Language Models are Few-Shot Learners." NeurIPS.
- Mitchell et al. (2019). "Model Cards for Model Reporting." FAccT.
- Gebru et al. (2021). "Datasheets for Datasets." Communications of the ACM.
- Abadi et al. (2016). "Deep Learning with Differential Privacy." CCS.
- Wang et al. (2022). "Self-Instruct: Aligning Language Models with Self-Generated Instructions."
- Rafailov et al. (2023). "Direct Preference Optimization." NeurIPS.
- Shazeer et al. (2017). "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts
  Layer." ICLR.
- Touvron et al. (2023, 2024). "Llama 1/2/3." Meta AI.

### Open Source AI Policy
- EU AI Act (Regulation 2024/1689). Official Journal of the European Union.
- Executive Order 14110 (2023). "Safe, Secure, and Trustworthy Development and Use of AI."
- OSI (2024). "Open Source AI Definition v1.0."
- NIST (2023). "AI Risk Management Framework."

### Framework Documentation
- PyTorch: pytorch.org/docs
- TensorFlow: tensorflow.org/guide
- JAX: jax.readthedocs.io
- Hugging Face Transformers: huggingface.co/docs/transformers
- LangChain: python.langchain.com/docs
- LlamaIndex: docs.llamaindex.ai

### Datasets and Benchmarks
- Hugging Face Datasets: huggingface.co/docs/datasets
- Open LLM Leaderboard: huggingface.co/spaces/open-llm-leaderboard
- LMSys Chatbot Arena: lmarena.ai
- HELM (Stanford): crfm.stanford.edu/helm

### Organizations
- Open Source Initiative: opensource.org
- Linux Foundation AI & Data: lfaidata.foundation
- MLCommons: mlcommons.org
- Partnership on AI: partnershiponai.org
- Future of Life Institute: futureoflife.org

---

*This reference document is maintained as a living resource. Updates, corrections, and
contributions are welcome. Last updated: 2026-05-19.*
