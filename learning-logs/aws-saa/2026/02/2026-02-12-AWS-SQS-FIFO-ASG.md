# 2026-02-12 — SQS FIFO + ASG Patterns (DevOps/SRE Lens)

## Core Mental Model
FIFO is not “better SQS.”  
It is **controlled ordering at the cost of throughput**.

- Standard = scale-first
- FIFO = correctness-first

---

## 1. FIFO vs Standard (Real Tradeoff)

| Feature | Standard | FIFO |
|---|---|---|
| Ordering | Best-effort | Strict (per group) |
| Delivery | At-least-once | Exactly-once (dedup window) |
| Throughput | Unlimited | Limited (~300 / ~3,000 batched) |

👉 Insight:
Use FIFO only when **ordering is a hard requirement**, not a preference.

---

## 2. Ordering Model (Important Detail)

Ordering is NOT global.

- Guaranteed **per Message Group ID**
- Multiple groups → parallelism possible

### Design Pattern
- `group-id = user-id` → per-user ordering
- `group-id = order-id` → per-transaction ordering

👉 Insight:
Message Group ID = **sharding key for ordering**

---

## 3. Deduplication (Exactly-Once Send)

- Deduplication window: **5 minutes**
- Requires:
  - Deduplication ID OR
  - Content-based deduplication

### Behavior
- Same dedup ID within window → ignored

👉 SRE implication:
- Prevents duplicate enqueue
- Does NOT remove need for idempotent consumers

---

## 4. Throughput Constraints

- ~300 msg/sec (no batching)
- ~3,000 msg/sec (batching)

### Scaling Strategy
- Increase number of **message groups**
- Use batching aggressively

👉 Insight:
FIFO scales via **parallel ordered lanes**, not raw throughput

---

## 5. Queue Configuration

- Must end with `.fifo`
- Requires:
  - Message Group ID
  - Deduplication strategy

---

## 6. SQS + ASG (Production Pattern)

### Signal
- `ApproximateNumberOfMessages` (CloudWatch)

### Behavior
- Backlog ↑ → scale OUT
- Backlog ↓ → scale IN

👉 Queue depth = **system pressure indicator**

---

## 7. Pattern A — Buffering Database Writes

### Problem
- Direct DB writes under load → failures, throttling

### Solution
1. App → enqueue (SQS)
2. Worker ASG → dequeue
3. Write to DB
4. Delete message

### Result
- No data loss
- Controlled write rate
- Retry safety

👉 Insight:
SQS becomes a **transaction durability layer**

---

## 8. Pattern B — Decoupled Architecture

### Flow
- Frontend → SQS → Backend workers

### Effects
- Frontend latency stable
- Backend scales independently
- Failures isolated

👉 System shifts from:
- synchronous fragility → asynchronous resilience

---

## 9. Failure Modes (Real-World)

- Hot partition:
  - single message group bottlenecks throughput
- Visibility timeout misconfig:
  - duplicate processing
- DLQ neglect:
  - poison messages loop forever

### Mitigation
- distribute group IDs
- tune visibility timeout
- configure DLQ early

---

## 10. Decision Framework

### Use FIFO when:
- strict ordering is mandatory
- duplicates must be avoided at enqueue level
- workload fits throughput limits

### Use Standard when:
- scale matters more than order
- high-throughput systems
- event-driven architectures

---

## 11. One-Line Memory Anchor
> FIFO = ordered lanes with limits; Standard = chaos with scale.