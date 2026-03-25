# 2026-02-15 — Amazon SNS Hands-On (DevOps/SRE Lens)

## Core Mental Model
SNS Topic = **Event Entry Point**  
Subscription = **Delivery Routing**  
Filter Policy = **Event Router**

SNS is effectively **event infrastructure**, not just notifications.

---

# 1. Topic Types (Operational Tradeoff)

| Feature | Standard | FIFO |
|--------|----------|------|
| Ordering | Best-effort | Strict |
| Delivery | At-least-once | Exactly-once |
| Throughput | Very High | ~300 msg/sec |
| Subscribers | Many types | SQS FIFO only |
| Use Case | Event fan-out | Ordered workflows |

### SRE Insight
Use **Standard** by default  
Use **FIFO** only when ordering is critical

---

# 2. Topic Creation

Example  
Topic Name:
```

MyFirstTopic

```

Options:
- Encryption (KMS)
- Access Policy
- Delivery retries

### Architecture Insight
Topic = **event boundary**

Services publish events into SNS  
Consumers subscribe independently

---

# 3. Subscription Model

Supported Protocols

- SQS
- Lambda
- HTTP / HTTPS
- Email
- SMS
- Kinesis Firehose
- Mobile Push

### Real Architecture

SNS Topic →  
- Queue A (workers)  
- Lambda (real-time logic)  
- Email (alerting)  
- Firehose (analytics)

This becomes **event-driven architecture**

---

# 4. Subscription Confirmation

Email / HTTP endpoints require confirmation

Flow:
1. Create subscription
2. Status = Pending
3. Confirm via link
4. Status = Active

### SRE Insight
This prevents:
- accidental subscriptions
- malicious endpoints

---

# 5. Publishing Flow

Producer → SNS Topic → Subscribers

Example
```

Hello World

````

SNS pushes message to:
- Email
- Queue
- Lambda
- HTTP

No polling required

---

# 6. Message Filtering (Advanced Routing)

Example

Subscriber A
```json
{
  "env": ["prod"]
}
````

Subscriber B

```json
{
  "env": ["dev"]
}
```

Result:

* same topic
* different consumers

### Insight

SNS becomes **lightweight event router**

---

# 7. Access Policies

Similar to:

* S3 bucket policy
* SQS queue policy

Controls:

* who can publish
* cross-account integration
* AWS service integrations

Example:

* S3 publishes events to SNS
* SNS distributes to SQS

---

# 8. Fan-Out Pattern (Operationally Important)

Producer → SNS → Multiple Subscribers

Benefits:

* decoupling
* scalability
* reliability
* extensibility

Common Pattern

Application → SNS →

* SQS workers
* Lambda functions
* Analytics pipeline

---

# 9. Cleanup (Operational Hygiene)

Remove:

* Subscriptions
* Topic

Why this matters:

* avoid orphan resources
* avoid cost leakage
* reduce event noise

---

# 10. DevOps/SRE Takeaways

SNS is:

* event router
* decoupling layer
* scaling primitive

Use SNS when:

* multiple consumers
* event-driven architecture
* real-time fan-out

Avoid SNS when:

* strict ordering required (use FIFO carefully)
* persistence required without queue (use SNS + SQS)

---

# One-Line Memory Anchor

> SNS = publish once, route everywhere.