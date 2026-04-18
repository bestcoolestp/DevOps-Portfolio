# 2026-03-10 — Serverless Mobile App Architecture (MyTodoList) (DevOps/SRE Lens)

## Core Mental Model

Mobile App = **Client → Serverless Backend → Managed Data**

No servers. Only services.

👉 Pattern:

User → API Gateway → Lambda → DynamoDB  
User → Cognito → S3 (direct access)

---

# 1. Architecture Overview

## Core Flow

Mobile App  
↓  
API Gateway (HTTPS)  
↓  
Lambda  
↓  
DynamoDB  

Parallel Path

User → Cognito → Temporary Credentials → S3

---

# 2. Components & Roles

## API Gateway

- REST API entry point
- HTTPS endpoints
- Auth integration (Cognito)

---

## Lambda

- Business logic
- CRUD for to-do items

---

## DynamoDB

- Serverless database
- High scalability
- Optimized for read-heavy workloads

---

## Cognito

- User authentication
- Token issuance
- Temporary AWS credentials

---

## S3

- User-specific storage
- Direct client access via Cognito

---

# 3. Authentication & Access Flow

Login Flow

User → Cognito User Pool  
↓  
JWT Token issued  
↓  
API Gateway validates token  

---

## S3 Access Flow

User logs in  
↓  
Identity Pool issues temporary credentials  
↓  
User accesses:

```

s3://bucket/user-123/*

```

👉 No hardcoded credentials

---

# 4. Data Access Pattern

To-do CRUD

- Create → Lambda → DynamoDB
- Read → Lambda → DynamoDB
- Update/Delete → Lambda → DynamoDB

---

# 5. Performance Optimization

## DynamoDB DAX

- In-memory cache
- Microsecond latency

Use case:

- frequent reads
- repeated queries

---

## API Gateway Caching

- Cache responses at API layer
- Reduce Lambda/DynamoDB calls

Best for:

- read-heavy endpoints
- static/semi-static responses

---

# 6. Scaling Characteristics

All components auto-scale:

- API Gateway → request volume
- Lambda → concurrency
- DynamoDB → throughput
- Cognito → user base
- S3 → storage & access

👉 No infrastructure bottlenecks

---

# 7. Security Model

## Authentication

- Cognito User Pools

---

## Authorization

- IAM roles via Identity Pools

---

## API Protection

- API Gateway authorizers

---

## S3 Isolation

Per-user access

Example policy:

```

user can access only their folder

```

---

# 8. Why This Architecture Works

- Fully serverless
- High scalability
- Fine-grained security
- Cost-efficient (pay-per-use)
- Minimal operational overhead

---

# 9. Real-World Behavior

Heavy read traffic:

- API Gateway cache hit → no Lambda call  
- DAX hit → microsecond response  

Spike traffic:

- Lambda scales automatically  
- DynamoDB handles load  

---

# 10. DevOps/SRE Takeaways

This pattern is:

- AWS reference architecture
- production-proven
- interview favorite

Key focus areas:

- auth (Cognito)
- scaling (Lambda/DynamoDB)
- caching (DAX/API Gateway)
- least-privilege access (S3/IAM)

---

# 11. Tradeoffs

- Debugging distributed systems is harder
- Cold starts (Lambda)
- Vendor lock-in (AWS-native services)

---

# One-Line Memory Anchor

> Serverless mobile app = Cognito auth + API Gateway + Lambda + DynamoDB + S3.

---
