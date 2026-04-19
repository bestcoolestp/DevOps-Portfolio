# 2026-03-11 — Serverless Website Architecture (MyBlog.com) (DevOps/SRE Lens)

## Core Mental Model

Website = **Static at the edge + Event-driven backend**

- Reads dominate → push content to CDN
- Writes trigger workflows → Lambda + events

👉 Pattern:

User → CloudFront → S3 (static)  
User → API Gateway → Lambda → DynamoDB (dynamic)  
Events → Lambda → SES / Image processing

---

# 1. Global Static Content

## S3 + CloudFront

S3:

- Stores HTML, CSS, JS, images

CloudFront:

- Caches at edge locations
- Global low-latency delivery

---

## Secure Origin Access

Use:

- **Origin Access Control (OAC)**

Bucket policy:

- deny public access
- allow only CloudFront

👉 S3 is private; CloudFront is the only entry

---

# 2. Dynamic REST API

## Core Flow

User → API Gateway → Lambda → DynamoDB

---

## Components

API Gateway

- HTTPS endpoints
- auth, throttling, caching

Lambda

- business logic

DynamoDB

- blog posts
- comments
- subscribers

---

## Read Optimization

### DynamoDB DAX

- in-memory cache
- microsecond latency
- ideal for read-heavy blogs

---

## Global Performance

### DynamoDB Global Tables

- multi-region replication
- low-latency reads worldwide

---

# 3. Welcome Email Flow (Event-Driven)

## Flow

User subscribes  
↓  
DynamoDB write  
↓  
DynamoDB Streams  
↓  
Lambda triggered  
↓  
SES sends email  

---

## Why This Matters

- async processing
- no impact on API latency
- scalable email delivery

---

# 4. Image Upload & Thumbnail Generation

## Upload Flow

User → S3 upload

Optional:

- S3 Transfer Acceleration (faster global uploads)

---

## Processing Flow

S3 upload  
↓  
S3 Event Trigger  
↓  
Lambda  
↓  
Generate thumbnail  
↓  
Store in S3  

---

## Optional Extensions

- SNS → fan-out
- SQS → buffering
- Step Functions → complex pipelines

---

# 5. Full Architecture

### Static

User → CloudFront → S3

---

### API

User → API Gateway → Lambda → DynamoDB

---

### Events

- DynamoDB Streams → Lambda → SES  
- S3 Events → Lambda → Thumbnail  

---

# 6. Caching Strategy

Layered caching:

1. CloudFront (static content)
2. API Gateway cache (optional)
3. DAX (database cache)

👉 Multi-layer caching = low latency + low cost

---

# 7. Security Model

- OAC → protects S3
- Cognito (optional) → user auth
- IAM roles → service permissions
- HTTPS everywhere (ACM)

---

# 8. Scaling Characteristics

All services auto-scale:

- CloudFront → global traffic
- Lambda → concurrency
- DynamoDB → throughput
- SES → email volume
- S3 → storage + requests

---

# 9. DevOps/SRE Takeaways

This is a **reference serverless architecture**

Strengths:

- globally scalable
- cost-efficient
- event-driven
- low ops overhead

Key design principles:

- push reads to CDN
- async everything (events)
- isolate workloads
- cache aggressively

---

# 10. Tradeoffs

- eventual consistency (Global Tables)
- debugging distributed flows
- cold starts (Lambda)

---

# One-Line Memory Anchor

> Static via CloudFront; dynamic via API Gateway; events via Lambda.

---

## References