# 2026-02-16 — Kinesis Data Streams (DevOps/SRE Lens)

## Core Mental Model

Kinesis Data Streams = **Real-time event ingestion pipeline**

- SQS → buffering
- SNS → fan-out
- **Kinesis → continuous streaming**

👉 SQS handles **bursts**  
👉 Kinesis handles **continuous streams**

---

# 1. Where Kinesis Fits

Typical Real-Time Data

- Clickstream analytics
- IoT telemetry
- Application logs
- Metrics streaming
- Event sourcing pipelines

Architecture

Producers → Kinesis Stream → Consumers

Example

Web App → Kinesis →  
- Lambda (processing)  
- Analytics (Flink)  
- Firehose (S3 storage)

---

# 2. Producers

Options

- Application SDK
- Kinesis Agent (logs/metrics)
- Kinesis Producer Library (KPL)

### DevOps Insight

Kinesis Agent is common for:

- log streaming
- metrics ingestion
- observability pipelines

---

# 3. Consumers

Options

- Lambda
- Kinesis Client Library (KCL)
- Kinesis Firehose
- Apache Flink (analytics)

### Architecture Pattern

Kinesis → Lambda → DynamoDB  
Kinesis → Firehose → S3  
Kinesis → Flink → Analytics

---

# 4. Data Characteristics

- Real-time ingestion
- Immutable records
- Retention: up to 365 days
- Ordered per partition key
- Max record size: 10 MB

### SRE Insight

Kinesis acts like:
- append-only log
- distributed commit log

Similar mental model:
- Kafka
- Pulsar

---

# 5. Partition Key (Important)

Ordering guaranteed:

**Only within same partition key**

Example

Partition Key:
- user-1 → ordered
- user-2 → ordered

But:
- user-1 vs user-2 → not ordered

### Insight

Partition key = **scaling + ordering control**

---

# 6. Capacity Modes

## Provisioned Mode

Manual shard management

1 shard:
- 1 MB/s write
- 2 MB/s read
- 1,000 records/sec

Scaling:
- add shards
- remove shards

Cost:
- per shard/hour

### SRE Tradeoff

Predictable cost  
Manual scaling overhead

---

## On-Demand Mode

Auto scaling

Default:
- ~4 MB/s write
- ~4,000 records/sec

Max:
- 200 MB/s write
- 400 MB/s read (enhanced fan-out)

Cost:
- pay per throughput

### SRE Tradeoff

Simple  
Less predictable cost

---

# 7. Enhanced Fan-Out

Multiple consumers reading simultaneously

Without fan-out:
- consumers share read throughput

With enhanced fan-out:
- dedicated throughput per consumer

### Use Case

High-scale analytics pipelines

---

# 8. Monitoring & Scaling

CloudWatch Metrics

- Incoming records
- Write throttling
- Read throttling
- Iterator age

### SRE Insight

Iterator Age = **lag indicator**

If iterator age increases:
- consumers falling behind
- scale consumers

---

# 9. CLI Hands-On Flow

Producer

```

put-record

```

Consumer

```

describe-stream
get-shard-iterator
get-records

```

Data returned:
- Base64 encoded
- decode to original message

---

# 10. SQS vs SNS vs Kinesis

| Service | Purpose |
|--------|---------|
| SQS | Queue / buffering |
| SNS | Fan-out events |
| Kinesis | Real-time streaming |

---

# 11. Real-World Architecture

Application → Kinesis →  
- Lambda (real-time processing)  
- Firehose (S3 storage)  
- Analytics (Flink)

Result:
- real-time analytics
- scalable ingestion
- event-driven architecture

---

# 12. DevOps/SRE Takeaways

Kinesis is best for:

- real-time pipelines
- observability pipelines
- log ingestion
- event streaming architectures

Not ideal for:

- simple queue workloads
- batch processing

---

# One-Line Memory Anchor

> Kinesis = real-time streaming at scale.