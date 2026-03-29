# 2026-02-19 — AWS SQS vs SNS vs Kinesis (DevOps/SRE Lens)

## Core Mental Model

These three services solve **different event problems**

- **SQS** → Buffer work  
- **SNS** → Broadcast events  
- **Kinesis** → Stream data continuously  

👉 Think:

- SQS = queue  
- SNS = fan-out  
- Kinesis = streaming log  

---

# 1. Amazon SQS — Work Queue

## Model
Consumers **pull** messages

Producer → SQS → Workers

Message lifecycle:
1. Receive
2. Process
3. Delete

If not deleted:
→ message reappears

---

## Characteristics

- Unlimited scale
- Multiple workers
- FIFO optional
- Delay messages supported
- Fully managed

### SRE Insight

SQS converts:

Traffic spike → Queue backlog  
instead of  
Traffic spike → System outage

---

## Best Use Cases

- Background jobs
- Order processing
- Image/video processing
- Database write buffering

---

# 2. Amazon SNS — Event Fan-Out

## Model

Push-based pub/sub

Producer → SNS → Multiple subscribers

Example

Application → SNS →  
- Lambda  
- SQS  
- Email  
- HTTP  

---

## Characteristics

- Push delivery
- No storage
- Near real-time fan-out
- Massive scale

### SRE Insight

SNS removes:

Producer → Consumer dependencies

SNS enables:

Event-driven architecture

---

## Best Use Cases

- Notifications
- Fan-out messaging
- Event broadcasting
- Alerting systems

---

# 3. Amazon Kinesis — Streaming Platform

## Model

Continuous event streaming

Producer → Kinesis → Consumers

---

## Characteristics

- Real-time streaming
- Data retention (1–365 days)
- Ordered per shard
- High throughput

Consumption Modes

### Standard

Consumers pull  
2 MB/s per shard

### Enhanced Fan-Out

Push model  
2 MB/s per shard **per consumer**

---

## Capacity Modes

Provisioned
- Manual shard scaling

On-Demand
- Automatic scaling

---

## Best Use Cases

- Clickstream analytics
- IoT telemetry
- Log streaming
- Real-time analytics

---

# 4. Side-By-Side Comparison

| Feature | SQS | SNS | Kinesis |
|--------|-----|-----|---------|
| Model | Queue | Pub/Sub | Streaming |
| Delivery | Pull | Push | Pull/Push |
| Persistence | Yes | No | Yes |
| Ordering | FIFO optional | No | Per shard |
| Throughput | Unlimited | Unlimited | Shard-based |
| Replay | No | No | Yes |
| Scaling | Automatic | Automatic | Provisioned/On-Demand |

---

# 5. Architecture Positioning

### Queue Architecture

Application → SQS → Workers

---

### Fan-Out Architecture

Application → SNS →  
- SQS  
- Lambda  
- HTTP  

---

### Streaming Architecture

Application → Kinesis →  
- Lambda  
- Analytics  
- Firehose  

---

# 6. Real-World Pattern

Combine Services

Application → SNS → SQS → Workers

Application → Kinesis → Firehose → S3

Application → SNS → Lambda

---

# 7. Decision Framework

Use **SQS** when:
- buffering required
- async processing
- worker scaling

Use **SNS** when:
- broadcast events
- multiple subscribers
- decoupling

Use **Kinesis** when:
- real-time analytics
- streaming data
- replay capability

---

# DevOps/SRE Takeaways

These services represent:

- decoupling primitives
- scaling primitives
- reliability primitives

Understanding them enables:

- event-driven systems
- resilient architectures
- scalable pipelines

---

# One-Line Memory Anchor

> SQS buffers, SNS broadcasts, Kinesis streams.

---
