# 2026-03-24 — Rekognition & Transcribe (DevOps/SRE Lens)

# Part 1 — Amazon Rekognition

## Core Mental Model

Rekognition = **Managed computer vision API**

- Input: image/video (S3 or stream)
- Output: **labels, faces, text, moderation signals**

👉 No ML training required (unless custom collections)

---

# 1. Capabilities

## Image Analysis

- object/scene detection (labels)
- text detection (OCR)
- content moderation

---

## Face Analysis

- attributes: age range, gender, emotions
- face search / verification
- celebrity recognition
- custom face collections

---

## Video Analysis

- object tracking (pathing)
- activity detection
- frame-by-frame labeling

---

# 2. Content Moderation (High-Value Pattern)

Flow

User upload → S3  
↓  
Lambda trigger  
↓  
Rekognition moderation  
↓  
Decision:
- allow
- flag for review (A2I)
- block

---

## Confidence Threshold

- higher → stricter filtering  
- lower → more false positives  

👉 Tune per use case (compliance vs UX)

---

# 3. Human-in-the-Loop (A2I)

When confidence is uncertain:

Rekognition → A2I → human review

---

# 4. Architecture Pattern

Upload (S3)  
→ Lambda  
→ Rekognition  
→ Store results (DB/OpenSearch)  

---

# 5. DevOps/SRE Takeaways

- stateless, API-driven
- scale via Lambda/S3 events
- cost per request → batch where possible
- monitor confidence thresholds & false positives

---

# One-Line Memory Anchor

> Rekognition = vision-as-API (detect, label, moderate).

---

# Part 2 — Amazon Transcribe

## Core Mental Model

Transcribe = **Speech → Text (ASR)**

- batch or streaming
- produces searchable text

---

# 1. Modes

## Batch

- upload audio → get transcript later

---

## Streaming

- real-time transcription
- low latency output

---

# 2. Key Features

## PII Redaction

- removes sensitive data:
  - names
  - phone numbers
  - SSNs

👉 critical for compliance

---

## Language Identification

- auto-detect language
- supports multilingual audio

---

## Accuracy Enhancers

- custom vocabularies (domain terms)
- speaker separation (diarization)

---

# 3. Architecture Patterns

## Call Center Analytics

Audio → Transcribe → S3  
→ Athena / OpenSearch → insights

---

## Real-Time Captions

Stream → Transcribe (streaming)  
→ UI captions

---

## Media Indexing

Video/audio → Transcribe  
→ store text → searchable archive

---

# 4. Pipeline Integration

Common flow:

S3 (audio)  
→ Transcribe  
→ S3 (text)  
→ Athena / OpenSearch / QuickSight

---

# 5. DevOps/SRE Takeaways

- choose batch vs streaming carefully
- store transcripts in S3 (data lake)
- apply PII redaction early
- monitor latency (streaming use cases)

---

# 6. When NOT to Use

Avoid when:

- offline, custom ML needed → build model
- extremely domain-specific speech (needs heavy tuning)

---

# One-Line Memory Anchor

> Transcribe = speech-to-text with PII-aware processing.

---

# Combined Insight

Rekognition + Transcribe:

- images/video → Rekognition  
- audio → Transcribe  

Together:

👉 **unstructured media → structured, searchable data**

---