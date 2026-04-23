# 2026-03-16 — Amazon Athena (DevOps/SRE Lens)

## Core Mental Model

Athena = **Serverless SQL on data in S3**

- No clusters, no servers
- Query **in place** (no load step)
- Pay **per TB scanned**

👉 Think: “SELECT * FROM s3://…” at scale

---

# 1. Where Athena Fits

Data lake pattern:

Producers → S3 (raw/curated) → **Athena** → BI/Reports

Good for:

- ad hoc analysis
- log analytics
- BI over data lake

---

# 2. Supported Formats (Cost/Perf Critical)

- CSV / JSON (easy, expensive)
- **Parquet / ORC (columnar, recommended)**

Why columnar?

- scan only needed columns
- far less data scanned → lower cost, faster queries

---

# 3. Pricing Model

- Charged by **data scanned**
- ~$ per TB scanned (region-dependent)

👉 Optimization = **scan less**

---

# 4. Performance & Cost Levers

## Columnar Formats

Use:

- Parquet / ORC

Benefit:

- column pruning
- predicate pushdown

---

## Compression

- gzip / snappy / zstd

Benefit:

- fewer bytes read from S3

---

## Partitioning

S3 layout example:

```

s3://logs/year=2026/month=03/day=16/

```

Query filter:

```

WHERE year=2026 AND month=03

```

Benefit:

- skip entire folders (partitions)

---

## File Size

- Target: **≥128 MB per file**

Too many small files:

- higher overhead
- slower queries

---

# 5. Typical Use Cases

## Log Analytics

- VPC Flow Logs
- ALB/ELB logs
- CloudTrail

---

## Ad Hoc Queries

- one-off analysis
- debugging datasets

---

## BI / Reporting

- QuickSight dashboards
- scheduled reports

---

# 6. Integrations

## AWS Glue (Data Catalog + ETL)

- define schemas (tables)
- convert formats (CSV → Parquet)

---

## Amazon QuickSight

- dashboards
- visual analytics

---

# 7. Federated Query

Athena can query beyond S3:

- DynamoDB
- RDS / Aurora
- CloudWatch Logs
- on-prem DBs

How:

- **Lambda connectors**

Flow:

Athena → Lambda → Data Source → Results → S3

---

# 8. Query Lifecycle

1. Define table (Glue/Data Catalog)
2. Run SQL query
3. Athena reads S3
4. Results written to S3

---

# 9. Architecture Patterns

## Data Lake

Producers → S3 → Athena → QuickSight

---

## ETL Optimization

Raw (CSV) → Glue → Parquet → Athena

---

## Cross-Source Query

Athena → Lambda connector → DB + S3 → unified results

---

# 10. DevOps/SRE Takeaways

Athena shifts focus from:

- infrastructure → **data layout**

Key responsibilities:

- partitioning strategy
- file format (Parquet/ORC)
- compression
- schema management (Glue)

Observability:

- query metrics (scan size, duration)
- cost per query

---

# 11. When NOT to Use Athena

Avoid when:

- low-latency OLTP needed
- frequent small queries (costly)
- heavy joins on hot data (consider Redshift)

Use instead:

- DynamoDB (OLTP)
- Aurora (relational)
- Redshift (warehouse)

---

# One-Line Memory Anchor

> Athena = serverless SQL on S3; optimize by scanning less.

---
