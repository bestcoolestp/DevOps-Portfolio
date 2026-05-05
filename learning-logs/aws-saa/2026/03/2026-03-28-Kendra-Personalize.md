# 2026-03-28 — Amazon Kendra & Personalize (DevOps/SRE Lens)

# Part 1 — Amazon Kendra

## Core Mental Model

Kendra = **Enterprise search powered by ML**

- Index documents
- Ask natural-language questions
- Get **answers**, not just file links

👉 “Google for enterprise documents”

---

# 1. What Kendra Solves

Traditional search:

- keyword matching
- poor context understanding

Kendra:

- semantic understanding
- answer extraction
- relevance ranking

---

# 2. Supported Data Sources

Documents:

- PDF
- Word
- PowerPoint
- HTML
- text
- FAQs

Enterprise systems:

- SharePoint
- Confluence
- S3
- databases

---

# 3. Search Flow

Documents → Kendra indexing → Knowledge index → User query → Ranked answers/snippets

Example

Query:

```

Where is the IT support desk?

```

Result:

```

1st floor

```

---

# 4. Key Features

## Natural Language Search

Users ask questions naturally.

---

## Incremental Learning

- improves ranking over time
- learns from interactions

---

## Relevance Tuning

Adjust by:

- freshness
- importance
- metadata filters

---

# 5. Architecture Pattern

S3 / Confluence / SharePoint  
↓  
Kendra index  
↓  
Web portal / chatbot / app

---

# 6. Use Cases

- internal knowledge base
- enterprise search portals
- support desk search
- document discovery

---

# 7. DevOps/SRE Takeaways

Operational focus:

- indexing strategy
- access control
- document freshness
- connector synchronization

Kendra reduces:

- custom search infrastructure
- NLP complexity

---

# One-Line Memory Anchor

> Kendra = ML-powered enterprise document search.

---

# Part 2 — Amazon Personalize

## Core Mental Model

Personalize = **Managed recommendation engine**

👉 “Amazon.com recommendation system as a service”

---

# 1. What It Does

Learns from:

- clicks
- purchases
- ratings
- interactions

Produces:

- personalized recommendations
- ranking predictions

---

# 2. Architecture Pattern

User activity data → S3 / Personalize dataset → Model training → Real-time recommendation API

---

# 3. Recommendation Types

- product suggestions
- content recommendations
- re-ranked search results
- targeted marketing

---

# 4. Real-Time Personalization

Website/app:

User visits  
↓  
Personalize API  
↓  
Recommended items returned

---

# 5. Why It Matters

Without Personalize:

- build ML pipelines manually
- training + serving complexity

With Personalize:

- managed ML workflow
- deploy in days

---

# 6. Use Cases

## Retail

- “customers also bought”

---

## Media

- movie/music recommendations

---

## Marketing

- personalized campaigns

---

# 7. DevOps/SRE Takeaways

Focus areas:

- event quality (clickstream accuracy)
- cold-start handling
- latency for recommendation APIs
- retraining cadence

Pipeline example:

App events → Kinesis/S3 → Personalize → API recommendations

---

# 8. Kendra vs Personalize

| Service | Purpose |
|--------|---------|
| Kendra | Find answers in documents |
| Personalize | Recommend relevant items |

👉 Search vs recommendation

---

# 9. Service Positioning

| Need | Service |
|------|---------|
| Enterprise document search | Kendra |
| Recommendations | Personalize |
| NLP analysis | Comprehend |
| Custom ML | SageMaker |

---

# Combined Insight

Enterprise app example:

User searches docs → Kendra provides answers  

User browses products/content → Personalize recommends next actions

👉 Knowledge + recommendation ecosystem

---

# One-Line Memory Anchor

> Kendra finds information; Personalize predicts preferences.

---