# 2026-03-01 — AWS Lambda (DevOps/SRE Lens)

## Core Mental Model

AWS Lambda = **Event-Driven Compute Without Servers**

You deploy:
- functions

AWS manages:
- infrastructure
- scaling
- availability
- execution

👉 Lambda = **Compute on demand**

---

# 1. Lambda vs EC2

| Feature | EC2 | Lambda |
|--------|-----|--------|
| Provisioning | Manual | None |
| Execution | Always running | On demand |
| Scaling | Auto Scaling setup | Automatic |
| Billing | Pay for uptime | Pay per execution |

### DevOps Insight

EC2 = long-running compute  
Lambda = short-lived event compute

---

# 2. Core Characteristics

- Execution limit: **15 minutes**
- Auto scaling concurrency
- Stateless execution
- Event-driven architecture

### Lambda Execution Model

Event → Lambda → Response

Example

S3 Upload → Lambda → Process file

---

# 3. Resource Allocation

Lambda supports:

- Up to **10 GB RAM**
- CPU scales with memory
- Network performance scales with memory

### Performance Insight

More RAM:

- Faster execution
- Lower runtime cost (sometimes)

---

# 4. Supported Languages

Native

- Node.js
- Python
- Java
- C#
- Ruby
- PowerShell

Custom Runtime

- Rust
- Go
- Others

Container Support

- Lambda container images supported
- But ECS / Fargate preferred for large containers

---

# 5. Monitoring

Integrated with:

- CloudWatch Logs
- CloudWatch Metrics
- CloudWatch Alarms

Observability

- invocation count
- duration
- errors
- throttling

---

# 6. Lambda Event Sources

Common Triggers

## API Gateway

REST API backend

User → API Gateway → Lambda

---

## S3

File Upload Processing

S3 Upload → Lambda

---

## DynamoDB

Stream processing

DynamoDB Update → Lambda

---

## EventBridge / CloudWatch

Scheduled jobs

Cron → Lambda

---

## SNS

Event fan-out

SNS → Lambda

---

## SQS

Queue processing

SQS → Lambda

---

## Kinesis

Real-time streaming

Kinesis → Lambda

---

## Cognito

Auth triggers

User Login → Lambda

---

# 7. Lambda@Edge

CloudFront integration

CloudFront → Lambda@Edge

Use Cases

- header modification
- authentication
- content routing

---

# 8. Common Use Cases

Thumbnail Generator

S3 Upload → Lambda → Thumbnail → S3

---

Scheduled Jobs

EventBridge → Lambda → Processing

---

API Backend

API Gateway → Lambda → DynamoDB

---

Event Processing

SNS → Lambda → Processing

---

# 9. Pricing Model

Billing Components

- Request count
- Execution duration

Free Tier

- 1M requests
- 400,000 GB-seconds

Example

- 128 MB functions → more execution time
- 1 GB functions → faster execution

---

# 10. Lambda Architecture Example

User → API Gateway → Lambda → DynamoDB

Events

S3 → Lambda

Streaming

Kinesis → Lambda

Queue

SQS → Lambda

---

# 11. Lambda Limitations

- 15 min execution limit
- Cold start latency
- Stateless execution

Solutions

- Step Functions (workflow)
- ECS / Fargate (long running)
- DynamoDB / S3 (state storage)

---

# DevOps/SRE Takeaways

Lambda is best for:

- event-driven workloads
- short-lived processing
- serverless APIs
- automation

Avoid Lambda when:

- long-running jobs
- heavy compute
- persistent state required

---

# One-Line Memory Anchor

> Lambda runs code only when needed.

---