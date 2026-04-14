# 2026-03-07 — Amazon API Gateway (DevOps/SRE Lens)

## Core Mental Model

API Gateway = **Managed front door for serverless & microservices**

Client → API Gateway → Backend

- Lambda (most common)
- HTTP services (ALB, on-prem)
- AWS services (SQS, Kinesis, Step Functions)

👉 API Gateway = **control plane for APIs (security, throttling, routing)**

---

# 1. Where API Gateway Fits

Typical Serverless Flow

User → API Gateway → Lambda → DynamoDB

Alternative

User → API Gateway → HTTP Backend  
User → API Gateway → AWS Service (no Lambda)

---

# 2. Integration Types

## 1. Lambda Integration (Default Pattern)

API → Lambda → Logic → DB

Benefits

- Fully serverless
- Auto scaling
- Minimal ops

---

## 2. HTTP Integration

API → ALB / EC2 / On-Prem

Benefits

- add rate limiting
- add auth layer
- unify access point

---

## 3. AWS Service Integration

API → SQS / Kinesis / Step Functions

Example

API → Kinesis → Firehose → S3

👉 No compute layer required

---

# 3. Endpoint Types (Critical Exam Topic)

## Edge-Optimized (Default)

- Uses CloudFront
- Global clients
- Lower latency worldwide

Requirement

- ACM cert in **us-east-1**

---

## Regional

- Same-region clients
- Can attach custom CloudFront

Requirement

- ACM cert in **same region**

---

## Private

- Only inside VPC
- Uses VPC endpoints (ENI)

Use Case

- internal APIs
- microservices communication

---

# 4. Security Model

## IAM

- For internal AWS services
- Example: EC2 → API Gateway

---

## Cognito

- User authentication
- Mobile / web apps

---

## Custom Authorizer (Lambda)

- Custom logic
- JWT validation
- fine-grained control

---

## TLS / HTTPS

- Managed via ACM
- Required for production APIs

---

# 5. Traffic Control

## Usage Plans

- API keys
- quotas
- throttling

Example

- 1000 requests/day
- 100 requests/sec

---

## Throttling

Protect backend:

- prevent overload
- mitigate abuse

---

# 6. Performance Features

## Caching

- Cache responses
- Reduce backend load
- Improve latency

---

## Request/Response Transformation

- Modify payloads
- Map inputs/outputs

---

# 7. Versioning & Stages

Stages

- dev
- test
- prod

Versioning

- v1
- v2
- v3

Example

```

/prod/v1/users

```

---

# 8. API Lifecycle

Design → Deploy → Version → Monitor

Supports

- OpenAPI / Swagger
- SDK generation

---

# 9. Real Architecture Patterns

## Serverless API

User → API Gateway → Lambda → DynamoDB

---

## Event Ingestion

User → API Gateway → SQS → Workers

---

## Streaming Pipeline

User → API Gateway → Kinesis → Firehose → S3

---

# 10. DevOps/SRE Takeaways

API Gateway provides:

- centralized API control
- security enforcement
- traffic shaping
- version management

Best for:

- serverless APIs
- microservices gateway
- public API exposure

Avoid when:

- ultra-low latency (use ALB directly)
- simple internal service-to-service (use private ALB)

---

# One-Line Memory Anchor

> API Gateway = secure, managed entry point for APIs.

---
