# 2026-02-11 — Amazon SQS Core (DevOps/SRE Lens)

## Core Mental Model
SQS is not a queue.  
It is a **load absorber + failure isolation layer**.

- Producers → push work
- Queue → buffers work
- Consumers → pull work

👉 System becomes **eventually consistent, not tightly coupled**

---

## 1. Architecture Primitive
**Queue → Messages → Producers → Consumers**

- Queue = elastic buffer
- Messages = units of work (≤ 1 MB)
- Producers = write-only
- Consumers = poll + process + delete

---

## 2. Delivery Semantics (Critical)
- **At-least-once delivery**
- **Best-effort ordering (Standard)**

👉 Implication:
- duplicates WILL happen
- ordering is NOT guaranteed

### SRE Rule
> Consumers must be **idempotent** or the system will break.

---

## 3. Message Lifecycle
1. Consumer polls
2. Receives (≤10 messages)
3. Processes
4. Deletes

If step 4 fails:
→ message reappears

👉 This is not a bug.  
It is a **reliability feature**.

---

## 4. Visibility Timeout (Hidden Control Lever)
- Default ~30s
- Message becomes invisible during processing

If processing > timeout:
→ duplicate delivery occurs

### Strategy
- Tune based on job duration
- Extend dynamically if needed

---

## 5. Scaling Pattern (Exam + Real World)

### Classic Pattern
- SQS + EC2 Auto Scaling Group

### Signal
- `ApproximateNumberOfMessages`

### Behavior
- Queue grows → scale OUT
- Queue drains → scale IN

👉 Insight:
Queue depth = **backpressure signal**

---

## 6. Performance Characteristics
- Unlimited throughput
- Low latency (<10 ms)
- Highly durable

👉 But:
- Polling inefficiency exists
- Long polling should be used (cost + latency optimization)

---

## 7. Failure Handling (What actually matters)

### Common Failures
- Consumer crash mid-processing
- Duplicate message execution
- Poison messages

### Mitigation
- Idempotent logic
- Dead-Letter Queue (DLQ)
- Retry strategy with limits

---

## 8. Real Architecture (Video Processing)

### Without SQS
- Frontend processes directly
- Tight coupling
- User latency spikes
- System collapses under burst

### With SQS
1. Frontend → enqueue job
2. Workers → process async
3. Output → S3

👉 Result:
- frontend stays fast
- backend scales independently
- failures isolated

---

## 9. Security Model
- In-flight: HTTPS
- At-rest:
  - SSE-SQS (default)
  - KMS (fine-grained control)
- Access:
  - IAM (who calls API)
  - Queue Policy (who can interact cross-service)

---

## 10. SQS vs Others (Quick Positioning)

| Service | Role |
|---|---|
| SQS | Work queue (decoupling + buffering) |
| SNS | Fan-out events |
| Kinesis | Ordered streaming |

---

## 11. Sharp Edges (Real Insights)

- Not real-time → polling delay exists
- Not exactly-once → duplicates inevitable
- Not ordered → unless FIFO used
- Over-polling → cost inefficiency

---

## 12. One-Line Memory Anchor
> SQS turns traffic spikes into queues, not outages.