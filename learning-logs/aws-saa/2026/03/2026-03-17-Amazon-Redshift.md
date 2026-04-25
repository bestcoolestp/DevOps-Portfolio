# 2026-03-17 — Amazon Redshift (DevOps/SRE Lens)

## Core Mental Model

Redshift = **Managed columnar data warehouse for OLAP**

- Optimized for **analytics, joins, aggregations**
- Not for transactional workloads (OLTP)

👉 Think: “fast SQL over large, structured datasets”

---

# 1. Where Redshift Fits

Analytics stack:

Producers → S3 / Streams → **Redshift** → BI tools

Best for:

- dashboards
- reporting
- complex joins
- historical analytics

---

# 2. Engine Characteristics

- Based on PostgreSQL (but heavily modified)
- **Columnar storage** → scan only needed columns
- **Massively Parallel Processing (MPP)**

Result:

- high performance at scale (TB → PB)

---

# 3. Cluster Architecture

## Leader Node

- parses SQL
- builds execution plan
- aggregates results

---

## Compute Nodes

- execute queries
- process data in parallel

---

## Flow

Client → Leader → Compute Nodes → Leader → Client

---

# 4. Deployment Models

## Provisioned

- choose instance type
- control cluster size
- reserved instances for savings

Best for:

- predictable workloads

---

## Serverless

- no cluster management
- auto-scaling compute
- pay-per-use

Best for:

- variable workloads
- minimal ops

---

# 5. Performance Drivers

- columnar storage
- parallel execution
- data distribution & sort keys

👉 Data modeling matters more than hardware

---

# 6. Data Ingestion Patterns

## Firehose → S3 → COPY

Kinesis Firehose  
↓  
S3  
↓  
COPY → Redshift

Best for:

- streaming ingestion

---

## COPY from S3

```

COPY table FROM 's3://bucket/file'

```

- fast bulk load
- preferred ingestion method

---

## JDBC / Direct Inserts

- app writes to Redshift

Use for:

- batch inserts only

Avoid:

- row-by-row writes (slow)

---

# 7. Redshift Spectrum

## What It Does

Query S3 **without loading data**

---

## Flow

Redshift → Spectrum nodes → S3 → Results → Redshift

---

## Use Cases

- data lake + warehouse hybrid
- rarely accessed data stays in S3
- avoid storage duplication

---

# 8. Redshift vs Athena

| Feature | Redshift | Athena |
|--------|---------|--------|
| Setup | Cluster/serverless | Fully serverless |
| Performance | Faster for joins | Slower for heavy joins |
| Storage | Internal | S3 |
| Use Case | Data warehouse | Ad hoc queries |

👉 Rule of thumb:

- repeated analytics → Redshift  
- ad hoc queries → Athena  

---

# 9. Backup & Disaster Recovery

## Snapshots

- incremental
- stored in S3
- automated or manual

Frequency:

- every 8 hours or 5 GB change

---

## Restore

- point-in-time restore
- creates new cluster

---

## Cross-Region DR

- snapshot copy across regions

---

## Multi-AZ (limited)

- some configurations support HA

---

# 10. Security

- VPC deployment
- IAM + database credentials
- encryption at rest & in transit

---

# 11. Integrations

- QuickSight → dashboards
- Tableau → BI
- Glue → catalog/ETL
- S3 → data lake

---

# 12. DevOps/SRE Takeaways

Redshift success depends on:

- schema design (distribution/sort keys)
- ingestion strategy (COPY, batch)
- cost control (cluster sizing or serverless)

Operational focus:

- monitor query performance
- manage storage vs Spectrum usage
- plan DR (snapshots)

---

# 13. When NOT to Use Redshift

Avoid when:

- OLTP workloads
- low-latency single-row queries
- simple key-value access

Use instead:

- DynamoDB (NoSQL)
- Aurora (relational OLTP)

---

# One-Line Memory Anchor

> Redshift = fast SQL analytics on big data with columnar + parallel execution.

---