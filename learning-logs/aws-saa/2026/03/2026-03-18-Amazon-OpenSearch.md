# 2026-03-18 — Amazon OpenSearch Service (DevOps/SRE Lens)

## Core Mental Model

OpenSearch = **Search + analytics engine over indexed data**

- Databases store truth  
- **OpenSearch stores searchable views**

👉 Pattern: **System of record → index → search**

---

# 1. What It’s For

- Full-text search
- Partial matches, fuzzy queries
- Aggregations over indexed fields
- Log analytics & dashboards

Example queries:

- “posts containing *kubern*”
- “top 10 errors last hour by service”

---

# 2. OpenSearch vs DynamoDB

| Capability | DynamoDB | OpenSearch |
|------------|----------|------------|
| Access pattern | Key-based | Field-based search |
| Partial match | No | Yes |
| Text search | Limited | Advanced |
| Analytics | Basic | Rich aggregations |

👉 Use both together: **DynamoDB (write) + OpenSearch (search)**

---

# 3. Deployment Models

## Managed Cluster

- You choose instance types
- Visible nodes
- More control

Use when:

- predictable workload
- custom tuning needed

---

## Serverless

- No node management
- Auto scaling

Use when:

- variable workload
- minimal ops

---

# 4. Data Ingestion Patterns

## 1) DynamoDB → OpenSearch (Common)

DynamoDB  
↓ (Streams)  
Lambda  
↓  
OpenSearch index

Query flow:

App → OpenSearch → get IDs → DynamoDB (full item)

---

## 2) CloudWatch Logs → OpenSearch

- Subscription filter → Lambda → OpenSearch (real-time)
- or → Firehose → OpenSearch (near real-time)

---

## 3) Kinesis → OpenSearch

- Firehose → OpenSearch (managed, near real-time)
- Streams → Lambda → OpenSearch (custom, real-time)

---

# 5. Query Model

- Native DSL (JSON-based)
- SQL plugin available (optional)

Example (conceptual):

```

match: "error"

```

Supports:

- full-text
- fuzzy
- aggregations

---

# 6. Visualization

**OpenSearch Dashboards**

- charts
- logs exploration
- time-series views

Use cases:

- observability
- BI-lite analytics

---

# 7. Security

- IAM integration
- Cognito for user auth
- Encryption:
  - at rest
  - in transit

---

# 8. Architecture Patterns

## Search Layer Pattern

App → OpenSearch → IDs → DynamoDB

---

## Logging / Observability

Apps → CloudWatch Logs → OpenSearch → Dashboards

---

## Streaming Analytics

Producers → Kinesis → OpenSearch → Dashboards

---

# 9. DevOps/SRE Takeaways

OpenSearch is:

- **index-first system**
- optimized for **read/search, not writes**

Key considerations:

- index design (mappings, shards)
- ingestion pipeline reliability
- eventual consistency vs source DB
- storage & retention (logs grow fast)

---

# 10. Tradeoffs

Pros

- powerful search
- flexible analytics
- near real-time ingestion

Cons

- operational tuning (clusters)
- eventual consistency
- storage cost for indexes

---

# 11. When NOT to Use OpenSearch

Avoid when:

- simple key-value queries
- transactional workloads
- strong consistency required

Use instead:

- DynamoDB (NoSQL)
- Aurora (relational)

---

# One-Line Memory Anchor

> OpenSearch = fast search on indexed data, not the source of truth.

---