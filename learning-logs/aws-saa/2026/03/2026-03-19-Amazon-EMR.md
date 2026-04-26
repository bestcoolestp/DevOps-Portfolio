# 2026-03-19 — Amazon EMR (DevOps/SRE Lens)

## Core Mental Model

EMR = **Managed big-data cluster (Hadoop/Spark) on EC2**

- You define a cluster
- AWS provisions + configures
- You run **distributed jobs** (Spark, Hive, Flink)

👉 EMR = **batch/stream processing at scale**, not a database

---

# 1. Where EMR Fits

Data pipeline:

Producers → S3 / Streams → **EMR (compute)** → S3 / Warehouse

Use when:

- TB–PB scale processing
- complex transforms (joins, aggregations)
- Spark/Hadoop ecosystem required

---

# 2. What You Get Out of the Box

- Apache **Spark** (primary engine)
- **Hadoop** (HDFS/YARN)
- **Hive / Presto (Trino)** (SQL on big data)
- **HBase** (NoSQL on HDFS)
- **Flink** (stream processing)

👉 EMR = **platform for multiple engines**

---

# 3. Cluster Architecture

## Master Node (Primary)

- cluster manager
- job coordination
- health monitoring

👉 must be stable (On-Demand/Reserved)

---

## Core Nodes

- execute tasks
- **store data (HDFS)**

👉 long-running, reliable

---

## Task Nodes (Optional)

- **compute only**
- no data storage

👉 ideal for **Spot** (cheap, interruptible)

---

# 4. Storage Strategy (Critical)

Two patterns:

## HDFS (on Core nodes)

- fast local storage
- tied to cluster lifecycle

---

## S3 (Recommended)

- durable
- decoupled from cluster

Pattern:

S3 (data lake) ↔ EMR (compute)

👉 “**compute is ephemeral, data is durable**”

---

# 5. Deployment Models

## Long-Running Cluster

- always on
- good for:
  - steady pipelines
  - interactive queries

---

## Transient Cluster (Best Practice)

- spin up → run job → terminate

Benefits:

- cost savings
- no idle compute

---

# 6. Pricing Strategy

Mix instance types:

| Node | Recommended |
|------|-------------|
| Master | On-Demand / Reserved |
| Core | On-Demand / Reserved |
| Task | **Spot** |

👉 maximize savings without risking cluster stability

---

# 7. Auto Scaling

- add/remove nodes based on load
- scale Task nodes aggressively
- keep Core/Master stable

---

# 8. Ingestion & Output

## Input

- S3 (most common)
- Kinesis / Kafka (via connectors)

---

## Output

- S3 (data lake)
- Redshift (warehouse)
- OpenSearch (search/analytics)

---

# 9. EMR vs Alternatives

| Use Case | Service |
|----------|---------|
| Ad hoc SQL on S3 | Athena |
| Warehouse analytics | Redshift |
| Big data processing (Spark) | **EMR** |
| Streaming analytics (managed) | Kinesis/Flink (managed) |

👉 EMR when you need **custom Spark/Hadoop control**

---

# 10. EMR vs Athena (Exam Trap)

| Feature | EMR | Athena |
|--------|-----|--------|
| Setup | Cluster | Serverless |
| Flexibility | High | Low |
| Cost | Node-based | Per query |
| Use Case | Complex pipelines | Ad hoc queries |

---

# 11. DevOps/SRE Takeaways

EMR introduces:

- cluster lifecycle management
- cost optimization (Spot + transient)
- job orchestration (steps)

Best practices:

- prefer **S3 over HDFS**
- use **transient clusters**
- separate compute from storage
- monitor with CloudWatch

---

# 12. When NOT to Use EMR

Avoid when:

- simple SQL → use Athena
- managed warehouse → use Redshift
- low data volume

---

# One-Line Memory Anchor

> EMR = managed Spark/Hadoop cluster for large-scale data processing.

---