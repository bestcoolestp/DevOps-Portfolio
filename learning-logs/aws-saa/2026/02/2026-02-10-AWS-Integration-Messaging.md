# 2026-02-10 — AWS Integration & Messaging (DevOps/SRE Lens)

## Core Mental Model
Service-to-service communication is a **reliability choice**, not just an app design choice.

- **Synchronous** = direct dependency
- **Asynchronous** = buffered dependency

---

## 1. Synchronous Communication
One service calls another directly.

**Example**
- Buying service → Shipping service

### Strengths
- Simple request/response flow
- Immediate result
- Easy to reason about at small scale

### Risks
- Tight coupling
- Latency propagates downstream
- Failure cascades
- Traffic spikes can overload dependent services

### SRE View
Synchronous systems are more fragile under burst traffic because:
- caller availability depends on callee health
- retries can amplify load
- p95/p99 latency gets worse fast

---

## 2. Asynchronous Communication
Services communicate through middleware.

**Example**
- Buying service → queue/topic/stream → Shipping service

### Strengths
- Decouples producers and consumers
- Smooths burst traffic
- Consumers scale independently
- Better fault isolation

### Tradeoff
- More operational complexity
- Eventual processing instead of immediate completion
- Need idempotency and retry handling

### SRE View
Async messaging improves resilience by turning traffic spikes into **backlog** instead of **outage**.

---

## 3. AWS Messaging Choices

| Service | Model | Best Use |
|---|---|---|
| **SQS** | Queue | Buffer work, decouple apps |
| **SNS** | Pub/Sub | Fan-out notifications to many subscribers |
| **Kinesis** | Stream | Real-time data pipelines, analytics, telemetry |

---

## 4. Practical Selection Logic

### Use **SQS** when:
- one message should be processed by one consumer
- you need buffering and backpressure control
- workers can process later

### Use **SNS** when:
- one event must notify many targets
- fan-out is the main requirement
- loose coupling between publisher and subscribers matters

### Use **Kinesis** when:
- ordering and continuous stream ingestion matter
- data is high-volume and near real-time
- analytics/monitoring pipeline is needed

---

## 5. DevOps/SRE Takeaways

- **Sync** optimizes for simplicity
- **Async** optimizes for resilience and scale

### Operational insight
Messaging middleware helps:
- absorb spikes
- reduce cascading failures
- improve recovery behavior
- scale producers and consumers independently

### But you still must design for:
- retries
- duplicate events
- dead-letter handling
- lag monitoring
- idempotent consumers

---

## 6. One-Line Memory Anchor
> SQS buffers work, SNS broadcasts events, Kinesis streams data in real time.