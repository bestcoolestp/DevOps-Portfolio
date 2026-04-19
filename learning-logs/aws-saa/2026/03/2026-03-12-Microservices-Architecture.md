# 2026-03-12 — Microservices Architecture (DevOps/SRE Lens)

## Core Mental Model

Microservices = **Many small services, each owning its domain**

- Each service:
  - deploys independently
  - scales independently
  - fails independently

👉 Monolith → tightly coupled  
👉 Microservices → loosely coupled

---

# 1. Microservices vs Serverless

| Aspect | Microservices | Serverless |
|--------|--------------|------------|
| Structure | Many services | Event-driven functions |
| Control | High | Lower |
| Scaling | Per service | Automatic |
| Infra | You manage (often) | AWS manages |

### Reality

They are not opposites.

👉 Serverless = **implementation style**  
👉 Microservices = **architecture style**

---

# 2. Why Microservices

- Independent deployments
- Faster iteration per team
- Service-level scaling
- Fault isolation

Example

Auth service fails  
→ Payments still work

---

# 3. Example Architecture (Mixed Stack)

## Service 1 (Containers)

User → Route53 → ALB → ECS → DynamoDB

- Docker-based
- horizontally scalable

---

## Service 2 (Serverless)

User → API Gateway → Lambda → ElastiCache

- event-driven
- low ops overhead

---

## Service 3 (Traditional)

User → Route53 → EC2 ASG → RDS

- stateful workloads
- relational database

---

## Key Insight

👉 Real systems are **hybrid**

- ECS + Lambda + EC2
- DynamoDB + RDS + Cache

---

# 4. Communication Patterns

## Synchronous (Request/Response)

Service A → Service B (HTTP)

- API Gateway
- ALB

Pros

- simple
- immediate response

Cons

- tight coupling
- cascading failures

---

## Asynchronous (Event-Driven)

Service A → Queue/Event → Service B

Tools

- SQS
- SNS
- Kinesis
- S3 events
- Lambda triggers

Pros

- decoupled
- resilient
- scalable

Cons

- eventual consistency
- harder debugging

---

# 5. Service-to-Service Flow

### Sync Example

Frontend → API Gateway → Service A → Service B

---

### Async Example

Frontend → API Gateway → SQS  
→ Worker Service → DB

---

# 6. Core Challenges

## 1. Operational Overhead

- many services
- deployments
- monitoring

---

## 2. Versioning

- multiple API versions
- backward compatibility

---

## 3. Distributed Complexity

- tracing requests
- debugging failures

---

## 4. Client Complexity

Client may call:

- service1.example.com  
- service2.example.com  
- service3.example.com  

---

## 5. Resource Utilization

- underutilized services
- inefficient scaling

---

# 7. Serverless in Microservices

Serverless improves:

- scaling
- cost model
- operational overhead

Example

Replace:

EC2 service

With:

Lambda + API Gateway

---

# 8. Best Practices

- Prefer async communication
- Use API Gateway as entry point
- Isolate data per service
- Implement retries & DLQ
- Use centralized logging (CloudWatch/X-Ray)
- Version APIs carefully

---

# 9. DevOps/SRE Takeaways

Microservices require:

- observability (logs, traces, metrics)
- resilience (retry, fallback)
- automation (CI/CD)
- clear boundaries

Success depends on:

👉 discipline, not tools

---

# 10. When NOT to Use Microservices

- small team
- simple application
- early-stage product

Start with monolith → evolve later

---

# One-Line Memory Anchor

> Microservices scale teams; serverless scales execution.

---