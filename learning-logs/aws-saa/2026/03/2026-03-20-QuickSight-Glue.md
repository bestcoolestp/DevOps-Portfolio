# 2026-03-20 — Amazon QuickSight & AWS Glue (DevOps/SRE Lens)

# Part 1 — Amazon QuickSight

## Core Mental Model

QuickSight = **Serverless BI over your data**

- Connect → visualize → share
- No servers, no clusters
- Pay per session / capacity

👉 “Last mile” of analytics

---

# 1. Where QuickSight Fits

Data flow:

Sources → (optional ETL) → Warehouse/Lake → **QuickSight**

Examples

- Redshift → QuickSight (dashboards)
- Athena → QuickSight (ad hoc BI)
- S3 → QuickSight (via Athena/Glue)

---

# 2. Data Source Integrations

AWS

- S3 (via Athena/Glue)
- Athena
- Redshift
- RDS / Aurora
- OpenSearch
- Timestream

External

- Salesforce, Jira
- JDBC (on-prem DBs)

Files

- CSV, Excel, JSON, logs

---

# 3. SPICE Engine (Critical)

SPICE = **in-memory acceleration layer**

- imports data into QuickSight
- ultra-fast queries
- reduces load on source

Limitation

- **only for imported datasets**
- not used with live queries

---

# 4. Live vs SPICE

| Mode | Behavior |
|------|----------|
| Live | Queries source directly |
| SPICE | Queries in-memory dataset |

👉 Tradeoff:

- Live → fresh data  
- SPICE → fast + scalable  

---

# 5. Dashboards vs Analysis

## Analysis

- interactive workspace
- filters, controls, edits

---

## Dashboard

- published, read-only
- shared with users/groups

👉 Analysis = build  
👉 Dashboard = consume  

---

# 6. Security Model

- Column-Level Security (CLS)
- Row-level filtering (via datasets)
- Users/Groups managed in QuickSight

IAM:

- admin access only

---

# 7. DevOps/SRE Takeaways

QuickSight shifts focus to:

- data modeling upstream
- dataset refresh strategy
- access control

No infra to manage

---

# One-Line Memory Anchor

> QuickSight = serverless BI with SPICE for speed.

---

# Part 2 — AWS Glue

## Core Mental Model

Glue = **Serverless ETL + Metadata Catalog**

- Extract → Transform → Load
- No cluster management

👉 Glue = **data preparation layer**

---

# 1. ETL Workflows

Example

S3 (CSV)  
↓  
Glue ETL  
↓  
Parquet  
↓  
S3 / Redshift  
↓  
Athena / QuickSight

---

# 2. Glue Jobs

- Run Spark-based ETL
- Transform data
- Load to target

Triggering

- scheduled
- event-driven (S3, EventBridge)

---

# 3. Glue Data Catalog (Critical)

Central metadata store

Stores:

- databases
- tables
- schemas

Used by:

- Athena
- Redshift Spectrum
- EMR

---

# 4. Glue Crawlers

Auto-discover schema

Sources:

- S3
- RDS
- DynamoDB
- JDBC

Output:

- tables in Data Catalog

---

# 5. Streaming ETL

Supports:

- Kinesis Data Streams
- Kafka / MSK

Based on:

- Spark Structured Streaming

Use cases:

- real-time pipelines
- event processing

---

# 6. Glue Features

## Job Bookmarks

- track processed data
- avoid reprocessing

---

## Glue Studio

- GUI for ETL pipelines

---

## Glue DataBrew

- no-code data cleaning
- transformations

---

# 7. Common Patterns

## Data Lake Pipeline

Raw (S3)  
→ Glue ETL  
→ Curated (Parquet)  
→ Athena / QuickSight  

---

## Warehouse Pipeline

S3 / RDS  
→ Glue  
→ Redshift  

---

## Streaming Pipeline

Kinesis  
→ Glue Streaming  
→ S3 / Redshift  

---

# 8. DevOps/SRE Takeaways

Glue responsibilities:

- schema management (Catalog)
- data transformation
- pipeline orchestration

Best practices:

- convert to Parquet/ORC
- partition datasets
- use bookmarks
- trigger on events

---

# 9. Glue vs EMR vs Athena

| Service | Role |
|--------|------|
| Glue | ETL |
| EMR | custom big data compute |
| Athena | query S3 |

👉 They complement each other

---

# One-Line Memory Anchor

> Glue prepares data; Athena queries it; QuickSight visualizes it.

---