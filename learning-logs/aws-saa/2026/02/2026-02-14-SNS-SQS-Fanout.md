# 2026-02-14 — SNS + SQS Fan-Out Pattern (DevOps/SRE Lens)

## Core Mental Model
SNS + SQS Fan-Out = **Event distribution + durable buffering**

- SNS → distributes events
- SQS → buffers and protects consumers

👉 Together: **fan-out without fragility**

---

## 1. The Real Problem

Direct multi-queue publishing:

Producer → Queue A  
Producer → Queue B  
Producer → Queue C  

### Risks
- Partial delivery if producer crashes
- Tight coupling to consumers
- Hard to scale
- Hard to add new consumers

---

## 2. Fan-Out Pattern

Producer → **SNS Topic** → Multiple SQS Queues

Example:

Buying Service → SNS →  
- Fraud Service (SQS)  
- Shipping Service (SQS)  
- Analytics Service (SQS)

Each consumer:
- processes independently
- scales independently
- fails independently

---

## 3. Why This Architecture Wins

### Decoupling
Producer unaware of consumers

### Reliability
SQS adds:
- persistence
- retries
- delayed processing

### Scalability
Add consumers without touching producer

### Extensibility
Add:
- Lambda
- Email
- HTTP
- Analytics pipeline

---

## 4. S3 Event Limitation (Classic Exam Scenario)

S3 restriction:
- One event rule per prefix

Example:
- ObjectCreated + images/

Cannot send directly to:
- Queue A
- Queue B
- Queue C

### Solution

S3 → SNS → Multiple SQS Queues

Now:
- One event
- Multiple consumers

---

## 5. SNS → Analytics Pattern

Architecture:

Application → SNS → Kinesis Firehose → S3

Use Case:
- Logging
- Analytics
- Data lake ingestion

---

## 6. SNS FIFO + SQS FIFO

When ordering matters:

Producer → SNS FIFO → SQS FIFO queues

Guarantees:
- ordering
- deduplication
- controlled throughput

Example:
Payment → SNS FIFO →  
- Fraud FIFO queue  
- Settlement FIFO queue

---

## 7. Message Filtering (Power Feature)

Without filtering:
- all consumers receive everything

With filtering:
- subscribers receive only relevant events

Example:

Placed Orders Queue
```json
{
  "state": ["placed"]
}
````

Canceled Orders Queue

```json
{
  "state": ["canceled"]
}
```

Result:

* no consumer-side filtering
* lower processing cost
* cleaner architecture

---

## 8. Cross-Region Fan-Out

SNS Region A → SQS Region B

Use Cases:

* DR architecture
* multi-region processing
* geo-distributed systems

---

## 9. Required Security Configuration

Important:
SQS must allow SNS to publish

Required:

* SQS Queue Policy
* SNS Topic permission

Without this:

* delivery silently fails

---

## 10. Failure Isolation (Why SREs Prefer This)

If one consumer fails:

* its queue grows
* others unaffected

Without fan-out:

* entire pipeline impacted

---

## 11. Decision Framework

Use SNS + SQS when:

* multiple consumers
* need durability
* event-driven architecture
* independent scaling required

---

## 12. One-Line Memory Anchor

> SNS distributes events, SQS protects consumers.

