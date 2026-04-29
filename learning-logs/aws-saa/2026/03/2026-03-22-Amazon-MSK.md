# 2026-03-22 — Amazon MSK (Managed Kafka) (DevOps/SRE Lens)

## Core Mental Model

MSK = **Managed Apache Kafka (event log / streaming backbone)**

- Producers write events → **topics**
- Brokers persist & replicate
- Consumers read at their own pace

👉 Kafka/MSK = **durable, ordered event log**

---

# 1. Where MSK Fits

Streaming pipeline:

Producers → **MSK (Kafka)** → Consumers → Storage/Analytics

Use when:

- high-throughput event ingestion
- multiple independent consumers
- replayable event history

---

# 2. Core Kafka Concepts (Minimal)

- **Topic**: named stream
- **Partition**: ordered shard of a topic
- **Broker**: Kafka node
- **Consumer group**: parallel readers
- **Offset**: position in the log

Ordering:

- guaranteed **per partition**

---

# 3. MSK Deployment Options

## Provisioned (Cluster)

- choose broker types/count
- control partitions & storage (EBS)
- Zookeeper managed by AWS

Best for:

- steady workloads
- fine control

---

## MSK Serverless

- no brokers to manage
- auto-scale compute & storage

Best for:

- spiky / unpredictable traffic
- low ops

---

# 4. High Availability & Durability

- Deploy across **up to 3 AZs**
- Replication across brokers
- Data on **EBS** with recovery

👉 Survives broker/AZ failures

---

# 5. Data Flow

Producers (apps, IoT, DB CDC)  
↓  
MSK topics (partitioned, replicated)  
↓  
Consumers (Lambda, Flink, Glue, custom)  
↓  
S3 / Redshift / OpenSearch / ML

---

# 6. Integrations

- **Managed Flink** → stream processing
- **AWS Glue (Streaming ETL)** → transform
- **Lambda** → event-driven consumers
- **ECS/EKS/EC2** → custom Kafka consumers

---

# 7. MSK vs Kinesis Data Streams

| Feature | Kinesis | MSK (Kafka) |
|--------|--------|-------------|
| Model | AWS-native | Open-source Kafka |
| Scaling | Shards split/merge | **Add partitions only** |
| Retention | Limited | **Configurable / long** |
| Ecosystem | AWS | Kafka ecosystem |
| Ops | Simpler | More control/complexity |

👉 Choose:

- Kinesis → simpler, AWS-native  
- MSK → Kafka compatibility / ecosystem  

---

# 8. Scaling Characteristics

- Scale by **adding partitions**
- Consumers scale via **consumer groups**

⚠️ Constraint:

- cannot easily reduce partitions

---

# 9. Security

- VPC deployment (private)
- TLS in-flight (optional/plaintext also possible)
- Encryption at rest (EBS)
- IAM / SASL auth options

---

# 10. DevOps/SRE Takeaways

MSK is:

- **stateful streaming system**
- requires **capacity planning (partitions, storage)**
- emphasizes **durability + replayability**

Key concerns:

- partition strategy (parallelism vs ordering)
- retention policy (storage cost)
- consumer lag monitoring
- backpressure handling

---

# 11. Common Patterns

## Event Backbone

Services → MSK → multiple consumers

---

## Stream Processing

MSK → Flink → aggregates → S3/Redshift

---

## CDC (Change Data Capture)

DB → Kafka → downstream systems

---

# 12. When NOT to Use MSK

Avoid when:

- simple queue → use SQS
- basic pub/sub → use SNS
- minimal ops needed → use Kinesis

---

# One-Line Memory Anchor

> MSK = managed Kafka for durable, replayable event streams.

---