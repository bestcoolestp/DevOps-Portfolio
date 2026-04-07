# 2026-02-28 — Serverless Computing (AWS) (DevOps/SRE Lens)

## Core Mental Model

Serverless = **No servers to manage, only services to compose**

You manage:
- code
- configuration
- permissions

AWS manages:
- infrastructure
- scaling
- availability
- patching

👉 Serverless = **Operational burden shifted to AWS**

---

# 1. Serverless Evolution

Originally

- Function as a Service (FaaS)
- AWS Lambda

Now includes:

- Databases
- Messaging
- Containers
- Storage
- Orchestration

Serverless = **Architecture style**, not just Lambda

---

# 2. Serverless Characteristics

- No server provisioning
- Auto scaling
- Pay-per-use
- High availability
- Event-driven

### DevOps Insight

Serverless reduces:

- infrastructure management
- scaling complexity
- operational overhead

But increases:

- service integration complexity

---

# 3. AWS Serverless Reference Architecture

Typical Flow

User → CloudFront → S3 (Static UI)

User → API Gateway → Lambda → DynamoDB

Authentication

User → Cognito → API Gateway

Architecture Overview

CloudFront  
→ S3 (frontend)  
→ API Gateway  
→ Lambda  
→ DynamoDB  

---

# 4. Core Serverless Services

## AWS Lambda

- Run code
- Event-driven
- Auto scaling

Use Cases

- API backend
- processing jobs
- event-driven workloads

---

## Amazon DynamoDB

- Serverless NoSQL database
- Auto scaling
- High availability

---

## API Gateway

- REST APIs
- HTTP APIs
- WebSocket APIs

---

## Amazon Cognito

- Authentication
- User pools
- Identity federation

---

## Amazon S3

- Static hosting
- Event triggers
- Storage

---

# 5. Serverless Messaging Services

## SNS

- Pub/Sub
- Event fan-out

## SQS

- Queue
- Async processing

---

# 6. Serverless Streaming

## Kinesis Data Firehose

- Streaming ingestion
- Auto scaling

---

# 7. Serverless Databases

## Aurora Serverless

- Auto scaling database
- Pay per use

---

# 8. Serverless Containers

## AWS Fargate

- ECS serverless compute
- No EC2 instances

---

# 9. Serverless Workflow

## Step Functions

- Orchestrate workflows
- State machine

Example

Lambda → DynamoDB → SNS → Lambda

---

# 10. Serverless Architecture Example

User → CloudFront → S3

API → API Gateway → Lambda

Data → DynamoDB

Events → SNS / SQS

Workflow → Step Functions

---

# 11. Serverless vs Traditional

| Feature | Traditional | Serverless |
|--------|-------------|------------|
| Server management | Yes | No |
| Scaling | Manual | Automatic |
| Cost | Always running | Pay-per-use |
| Availability | Self-managed | Built-in |

---

# 12. DevOps/SRE Takeaways

Serverless enables:

- event-driven systems
- microservices architecture
- low-ops deployments

Tradeoffs:

- cold start latency
- vendor lock-in
- observability complexity

---

# One-Line Memory Anchor

> Serverless = deploy code, AWS runs everything.

---