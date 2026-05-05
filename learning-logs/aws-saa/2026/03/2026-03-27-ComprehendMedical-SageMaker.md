# 2026-03-27 — Comprehend Medical & SageMaker (DevOps/SRE Lens)

# Part 1 — Amazon Comprehend Medical

## Core Mental Model

Comprehend Medical = **NLP specialized for clinical text**

- Input: unstructured medical text  
- Output: **structured medical entities + PHI detection**

👉 Think: **“clinical notes → structured data”**

---

# 1. What It Extracts

- patient info (age, traits)
- conditions, procedures
- medications:
  - name
  - dosage
  - frequency
- dates, times

---

## PHI Detection (Critical)

API:

- `DetectPHI`

Finds:

- names
- addresses
- identifiers

👉 Used for **compliance (HIPAA)**

---

# 2. Architecture Pattern

S3 (medical text)  
→ Comprehend Medical  
→ Structured output  
→ Store (DB / S3 / OpenSearch)

---

## Voice Pipeline (Common)

Audio  
→ Transcribe  
→ Text  
→ Comprehend Medical  
→ Insights

---

## Streaming Pattern

Kinesis  
→ Firehose / Lambda  
→ Comprehend Medical  
→ Storage/alerts

---

# 3. Use Cases

- clinical note analysis
- medical coding assistance
- compliance (PHI redaction)
- research data structuring

---

# 4. DevOps/SRE Takeaways

- highly regulated domain → security first
- integrate with:
  - S3 (storage)
  - Transcribe (speech input)
  - analytics tools
- design for:
  - auditability
  - data governance

---

# One-Line Memory Anchor

> Comprehend Medical = NLP for healthcare + PHI detection.

---

# Part 2 — Amazon SageMaker

## Core Mental Model

SageMaker = **End-to-end ML platform**

👉 Unlike other AI services:

- Translate / Polly / Comprehend → **prebuilt models**  
- SageMaker → **you build your own models**

---

# 1. ML Lifecycle (Managed)

1. Data collection  
2. Labeling  
3. Training  
4. Tuning  
5. Deployment  

SageMaker manages:

- infrastructure
- scaling
- pipelines

---

# 2. Workflow

Data (S3)  
→ Training job  
→ Model artifact  
→ Endpoint deployment  
→ Predictions (real-time/batch)

---

# 3. Key Components

## Training

- run ML jobs (distributed)
- use built-in or custom algorithms

---

## Tuning

- hyperparameter optimization
- improves accuracy

---

## Deployment

- real-time endpoints
- batch inference

---

## Labeling

- Ground Truth for data annotation

---

# 4. Use Cases

- prediction models (e.g., scoring)
- recommendation systems
- anomaly detection
- custom NLP/vision models

---

# 5. Architecture Patterns

## Batch ML

S3 data  
→ SageMaker training  
→ batch predictions  
→ S3

---

## Real-Time ML

App  
→ SageMaker endpoint  
→ prediction

---

## MLOps Pipeline

S3 → SageMaker → Model → Endpoint → Monitoring

---

# 6. DevOps/SRE Takeaways

SageMaker introduces:

- **MLOps discipline**
- pipeline automation
- model lifecycle management

Key concerns:

- data quality
- training cost
- model drift
- endpoint scaling

---

# 7. When NOT to Use SageMaker

Avoid when:

- simple ML task exists in AWS services
  - Translate
  - Comprehend
  - Rekognition

👉 Prefer managed ML APIs first

---

# 8. Service Positioning

| Service | Role |
|--------|------|
| Comprehend Medical | healthcare NLP |
| Comprehend | general NLP |
| SageMaker | custom ML |

---

# Combined Insight

Pipeline example:

Audio  
→ Transcribe  
→ Comprehend Medical  
→ Structured data  
→ SageMaker model → predictions

👉 From **raw signals → insights → predictions**

---

# One-Line Memory Anchor

> SageMaker = build your own ML; others = ready-made ML.

---