# 2026-02-18 — Amazon Data Firehose Demo (DevOps/SRE Lens)

## Core Mental Model

Firehose Demo shows the **end-to-end streaming ingestion pipeline**

Kinesis Stream → Firehose → S3

This is a **near real-time data lake ingestion architecture**

---

# 1. Architecture Overview

Producer → Kinesis Data Stream → Firehose → S3

Example

Application Events:
- user signup
- user login
- user logout

Flow:
Application → Kinesis → Firehose → S3 → Analytics

---

# 2. Source Configuration

Source:
- Kinesis Data Stream (DemoStream)

Firehose:
- Pulls records from Kinesis
- Buffers data
- Delivers to destination

### DevOps Insight

This pattern decouples:

- ingestion layer (Kinesis)
- delivery layer (Firehose)
- storage layer (S3)

---

# 3. Transform & Convert Records

Optional Lambda Transformation

Lambda can:

- Transform records
- Filter events
- Decompress logs
- Convert formats

Supported Format Conversion

- JSON → Parquet
- JSON → ORC

### SRE Insight

Firehose becomes:

**Streaming ETL pipeline**

Without managing:

- Spark
- Kafka
- ETL infrastructure

---

# 4. Destination Configuration

Destination:
- Amazon S3 bucket

Example:
```

demo-firehose-stephane-V3

```

Options

- Dynamic partitioning (optional)
- Prefix (optional)
- Error prefix (recommended)

Example

```

logs/
errors/

```

### SRE Best Practice

Always configure:
- error prefix
- backup bucket

---

# 5. Buffering Configuration

Default:

- Buffer size: 5 MB
- Buffer time: 300 seconds

Demo:

- Buffer time: 60 seconds

Tradeoff

| Smaller Buffer | Larger Buffer |
|----------------|---------------|
| Faster delivery | Lower cost |
| More S3 objects | Better compression |

---

# 6. Compression Options

Supported:

- GZIP
- Snappy
- ZIP
- Hadoop Snappy

### SRE Insight

Use:

- GZIP → general use
- Snappy → analytics workloads

---

# 7. Encryption

Optional:

- SSE-S3
- SSE-KMS

Best Practice:
- Enable encryption for logs
- Enable encryption for analytics data

---

# 8. IAM Role

Firehose automatically creates:

- S3 write permissions
- Kinesis read permissions
- CloudWatch logging permissions

### DevOps Insight

Firehose is:

- serverless
- managed
- low operational overhead

---

# 9. Metrics & Monitoring

Metrics available:

- Delivery success
- Delivery failure
- Throughput
- Buffer size

Logs:

- CloudWatch Logs

### SRE Insight

Watch:

- delivery failures
- buffer delays
- throttling

---

# 10. Testing Workflow

Send records to:

```

DemoStream

```

Example:

- user signup
- user login
- user logout

After buffer interval:

Records appear in:

- S3 bucket
- partitioned text files

---

# 11. Real-World Use Cases

Logging Pipeline

Servers → Kinesis → Firehose → S3

Analytics Pipeline

Application → Firehose → Data Lake

Observability Pipeline

Metrics → Firehose → OpenSearch

---

# 12. Cleanup (Important)

Delete:

- Firehose delivery stream
- Kinesis stream

Why:

- avoid ongoing charges
- prevent orphan infrastructure

---

# DevOps/SRE Takeaways

Firehose simplifies:

- ingestion
- transformation
- delivery
- scaling

Best used for:

- log pipelines
- analytics ingestion
- event archiving

---

# One-Line Memory Anchor

> Firehose = near-real-time streaming delivery to S3
