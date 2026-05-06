# 2026-03-29 — Textract & AWS ML Services Overview (DevOps/SRE Lens)

# Part 1 — Amazon Textract

## Core Mental Model

Textract = **Document OCR + structure extraction**

👉 Not just text extraction.

It understands:

- forms
- tables
- key-value relationships
- handwriting

---

# 1. What Textract Solves

Traditional OCR:

- extracts raw text only

Textract:

- extracts **structured document data**

Example:

Driver’s license  
↓  
Textract  
↓  
JSON:

- name
- DOB
- ID number

---

# 2. Supported Inputs

- scanned PDFs
- forms
- images
- handwritten documents

---

# 3. Core Capabilities

## OCR

- printed text
- handwriting

---

## Forms

Extracts:

- key-value pairs

Example:

```

Name: John
DOB: 1990-01-01

```

---

## Tables

Understands:

- rows
- columns
- cell relationships

---

# 4. Architecture Pattern

Upload (S3) → Textract → Structured JSON → Store/Search/Analytics

---

# 5. Use Cases

## Finance

- invoices
- statements

---

## Healthcare

- claims
- medical records

---

## Government

- IDs
- passports
- tax forms

---

# 6. DevOps/SRE Takeaways

Textract reduces:

- manual entry
- OCR pipeline complexity

Key concerns:

- document quality
- async processing for large files
- downstream validation

Common integrations:

- S3
- Lambda
- Comprehend
- OpenSearch

---

# 7. Example Intelligent Pipeline

PDF upload → Textract → Comprehend → OpenSearch / DB

👉 From scanned document → searchable insights

---

# One-Line Memory Anchor

> Textract = OCR + forms/tables understanding.

---

# Part 2 — AWS ML Services Overview

## Core Mental Model

AWS ML services fall into two categories:

| Category | Purpose |
|----------|---------|
| Specialized AI APIs | Ready-made intelligence |
| SageMaker | Build custom ML |

---

# 1. Vision

| Service | Purpose |
|--------|---------|
| Rekognition | Image/video analysis |
| Textract | Document extraction |

---

# 2. Speech

| Service | Purpose |
|--------|---------|
| Transcribe | Speech → text |
| Polly | Text → speech |

---

# 3. Language

| Service | Purpose |
|--------|---------|
| Translate | Text translation |
| Comprehend | NLP/text analysis |
| Comprehend Medical | Clinical NLP |

---

# 4. Conversational AI

| Service | Purpose |
|--------|---------|
| Lex | Chatbots / voice bots |
| Connect | Cloud contact center |

---

# 5. Search & Recommendations

| Service | Purpose |
|--------|---------|
| Kendra | Enterprise search |
| Personalize | Recommendations |

---

# 6. Custom Machine Learning

| Service | Purpose |
|--------|---------|
| SageMaker | Build/train/deploy ML models |

---

# 7. High-Level Architecture View

## AI-Enhanced Enterprise Pipeline

Documents → Textract → Comprehend → Kendra search  

---

## Media Pipeline

Audio → Transcribe → Translate → Polly  

---

## Recommendation Platform

User activity → Personalize → recommendations

---

# 8. DevOps/SRE Perspective

Modern cloud architecture increasingly includes:

- AI APIs as infrastructure components
- event-driven ML pipelines
- serverless AI integrations

Operational concerns:

- latency
- cost per inference
- security/compliance
- pipeline observability

---

# 9. Exam Strategy

When reading exam scenarios:

| Clue | Service |
|------|---------|
| scanned forms/tables | Textract |
| speech-to-text | Transcribe |
| text-to-speech | Polly |
| NLP | Comprehend |
| enterprise search | Kendra |
| recommendations | Personalize |
| chatbot | Lex |
| image analysis | Rekognition |
| custom ML | SageMaker |

---

# One-Line Memory Anchor

> AWS ML services = specialized AI building blocks + SageMaker for custom models.

---