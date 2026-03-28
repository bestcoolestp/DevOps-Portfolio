# 2026-02-17 — Amazon Data Firehose (DevOps/SRE Lens)

## Core Mental Model

Firehose = **Streaming delivery pipeline (no infrastructure management)**

- Kinesis Streams → collect
- **Firehose → deliver**
- S3 / Redshift / OpenSearch → store/analyze

👉 Kinesis = stream processing  
👉 Firehose = stream **delivery**

---

# 1. Architecture Role

Producers → Firehose → Destinations

Example

Application → Firehose →  
- S3 (data lake)  
- OpenSearch (search/analytics)  
- Redshift (warehouse)

Firehose removes:
- consumer management
- scaling logic
- delivery code

---

# 2. Data Sources

Firehose can ingest from:

- Kinesis Data Streams
- CloudWatch Logs
- AWS IoT
- Direct SDK ingestion
- Kinesis Agent

### Observability Pattern

Servers → CloudWatch Logs → Firehose → S3

Result:
- centralized log storage
- analytics ready

---

# 3. Buffering Behavior (Important)

Firehose buffers:

- By size
- By time

Then flushes to destination.

Example
- 5 MB buffer
- or 60 seconds

### SRE Insight

Firehose is:
- **near real-time**
- not true real-time

Tradeoff:
- better compression
- lower cost
- slight latency

---

# 4. Data Processing

Firehose supports:

### Lambda Transform

Example
- JSON → Parquet
- Enrich records
- Filter events

### Format Conversion

- JSON → Parquet
- JSON → ORC

### Compression

- Gzip
- Snappy

👉 Insight

Firehose acts as **light ETL pipeline**

---

# 5. Destinations

AWS

- S3
- Redshift
- OpenSearch

Third-Party

- Datadog
- Splunk
- New Relic
- MongoDB

Custom

- HTTP endpoint

### Architecture Example

Application → Firehose →  
- S3 (archive)  
- OpenSearch (search)  
- Datadog (monitoring)

---

# 6. Backup Strategy

Firehose supports:

- Failed records → S3
- All records → S3

### SRE Insight

S3 backup = **safety net**

Useful for:
- replay
- debugging
- analytics

---

# 7. Scaling Model

Firehose:

- Serverless
- Auto scaling
- No shard management

Unlike:

Kinesis Streams:
- shards
- scaling
- consumers

Firehose:
- managed delivery only

---

# 8. Kinesis Streams vs Firehose

| Feature | Kinesis Streams | Firehose |
|---------|----------------|---------|
| Purpose | Real-time streaming | Delivery pipeline |
| Scaling | Manual / on-demand | Automatic |
| Replay | Yes | No |
| Processing | Custom consumers | Lambda transform |
| Storage | Up to 365 days | No storage |

---

# 9. Real Architecture Patterns

### Logging Pipeline

Servers → CloudWatch → Firehose → S3

### Analytics Pipeline

Application → Kinesis → Firehose → Redshift

### Observability Pipeline

App Metrics → Firehose → Datadog

---

# 10. When to Use Firehose

Use Firehose when:

- streaming logs
- streaming analytics
- ETL pipelines
- observability pipelines

Avoid Firehose when:

- replay required
- complex streaming logic
- strict real-time processing

---

# DevOps/SRE Takeaways

Firehose simplifies:

- ingestion
- transformation
- delivery
- scaling

It removes:
- infrastructure
- consumer logic
- scaling complexity

---

# One-Line Memory Anchor

> Firehose = managed streaming delivery to destinations