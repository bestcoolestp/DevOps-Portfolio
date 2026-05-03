# 2026-03-25 — Amazon Polly & AWS Translate (DevOps/SRE Lens)

# Part 1 — Amazon Polly

## Core Mental Model

Polly = **Text → Speech (TTS)**

- Input: text / SSML  
- Output: **audio (MP3/OGG/PCM)**

👉 Completes the loop:  
Transcribe (speech→text) ⇄ Polly (text→speech)

---

# 1. Capabilities

## Neural Voices

- natural, human-like speech
- multiple languages/voices

---

## SSML (Critical)

Fine-grained control:

- pauses
- emphasis
- tone/style (e.g., newscaster)
- whispering, breathing

Example

```

<break time="3s"/>
```

---

## Pronunciation Lexicons

Custom dictionary:

* fix names / acronyms
* branding consistency

Example

```
AWS → Amazon Web Services
```

---

# 2. Architecture Patterns

## Content-to-Audio

Text (S3/DB)  
→ Polly  
→ Audio (S3)  
→ CDN / App playback

---

## Real-Time Voice

App → Polly API → stream audio → user

---

# 3. Use Cases

- accessibility (screen readers)
- voice assistants
- media narration
- branded voice UX

---

# 4. DevOps/SRE Takeaways

- cache generated audio (avoid recompute cost)
- store in S3 + CloudFront
- version lexicons for consistency
- monitor latency for real-time apps

---

# One-Line Memory Anchor

> Polly = text-to-speech with SSML control.

---

# Part 2 — AWS Translate

## Core Mental Model

Translate = **Text → Text (language conversion)**

- neural machine translation
- real-time or batch

---

# 1. Capabilities

- multi-language translation
- high scalability
- API-driven

---

## Custom Terminology

- preserve domain-specific terms
- brand-safe translations

Example

```

“EC2” stays “EC2”

```

---

# 2. Architecture Patterns

## Serverless Translation Pipeline

S3 (text)  
→ Lambda  
→ Translate  
→ S3 (translated)  

---

## Real-Time App

User input  
→ Translate API  
→ localized output

---

# 3. Integrations

- S3 (storage)
- Lambda (processing)
- CloudWatch (monitoring)

---

# 4. Use Cases

- website localization
- multilingual chatbots
- product catalogs
- documentation translation

---

# 5. Cost Model

- pay **per character**

👉 optimize by:

- batching requests
- avoiding duplicate translations

---

# 6. DevOps/SRE Takeaways

- stateless API → easy scaling
- cache translations where possible
- use custom terminology for consistency
- design for latency in real-time UX

---

# 7. Service Positioning (Exam Core)

| Service | Purpose |
|--------|--------|
| Translate | Text → Text |
| Polly | Text → Speech |
| Transcribe | Speech → Text |
| Comprehend | NLP analysis |

---

# Combined Architecture Insight

Global app flow:

User input  
→ Translate (localization)  
→ Process  
→ Polly (voice output)  

👉 End-to-end multilingual + voice experience

---

# One-Line Memory Anchor

> Translate localizes text; Polly gives it a voice.

---
