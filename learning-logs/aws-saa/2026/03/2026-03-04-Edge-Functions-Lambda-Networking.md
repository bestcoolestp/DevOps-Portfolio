# 2026-03-04 — Edge Functions & Lambda Networking (DevOps/SRE Lens)

# Part 1 — Customization at the Edge

## Core Mental Model

Edge Computing = **Run logic close to users**

Instead of:

User → Region → Response

Use:

User → Edge Location → Response

Benefits:

- Lower latency
- Reduced origin load
- Better global performance

---

# 1. Edge Function Types

AWS provides two Edge compute options:

- CloudFront Functions (lightweight)
- Lambda@Edge (full compute)

---

# 2. CloudFront Functions

Lightweight Edge Compute

Characteristics

- JavaScript only
- Ultra-fast (<1 ms)
- Millions of requests/sec
- Viewer request/response only

Execution Flow

User → Edge → CloudFront Function → Response

---

## CloudFront Functions Use Cases

- Header manipulation
- URL redirects
- Cache key normalization
- JWT validation
- Geo-based routing

Example

Redirect mobile users:

```

example.com → m.example.com

```

---

# 3. Lambda@Edge

Full Edge Compute

Characteristics

- Node.js / Python
- 5–10 second execution
- AWS SDK access
- External libraries supported

Execution Locations

Functions authored in:

- us-east-1

Replicated globally to:

- Edge locations

---

# Lambda@Edge Trigger Points

Lambda@Edge supports:

- Viewer Request
- Viewer Response
- Origin Request
- Origin Response

This provides:

Full request lifecycle control

---

# Lambda@Edge Use Cases

- Authentication
- A/B testing
- SEO optimization
- Bot mitigation
- Image transformation
- Intelligent routing

Example

User → Edge  
→ Lambda@Edge resizes image  
→ Return optimized image

---

# CloudFront Functions vs Lambda@Edge

| Feature | CloudFront Functions | Lambda@Edge |
|--------|----------------------|-------------|
| Runtime | JavaScript | Node.js / Python |
| Latency | Ultra low | Low |
| Scale | Millions/sec | Thousands/sec |
| Execution | <1 ms | Up to 10s |
| Complexity | Lightweight | Advanced logic |

---

# DevOps/SRE Takeaway

Use:

CloudFront Functions

- simple logic
- ultra-low latency

Use:

Lambda@Edge

- complex processing
- external integrations

---

# One-Line Memory Anchor

> CloudFront Functions = lightweight edge logic  
> Lambda@Edge = full compute at the edge

---

# Part 2 — Lambda Networking Fundamentals

## Default Lambda Networking

By default:

Lambda runs in:

- AWS-managed VPC

Capabilities

- Access public internet
- Access AWS public services

Examples

Lambda → DynamoDB  
Lambda → S3  
Lambda → Public API

---

## Default Lambda Limitations

Cannot access:

- Private RDS
- Private ElastiCache
- Internal Load Balancers

Because:

Lambda not inside your VPC

---

# Lambda Inside VPC

To access private resources:

Configure:

- VPC
- Subnets
- Security Groups

Lambda receives:

- ENI (Elastic Network Interface)

Architecture

Lambda → ENI → VPC → Private Resources

---

# Lambda + RDS Problem

Lambda scaling creates:

- Many short-lived connections

Example

1000 Lambda invocations  
→ 1000 DB connections

Database overwhelmed

Results

- timeouts
- failures
- degraded performance

---

# RDS Proxy Solution

Architecture

Lambda → RDS Proxy → RDS

Benefits

- Connection pooling
- Reduced DB load
- Improved scalability

---

# RDS Proxy Benefits

## 1. Scalability

Shared connection pool

Lambda → Proxy → Shared DB connections

---

## 2. Availability

Failover improvements

- Faster recovery
- Connection preservation

---

## 3. Security

Supports:

- IAM authentication
- Secrets Manager

No hardcoded credentials

---

# Lambda + RDS Architecture

Lambda (VPC)  
↓  
RDS Proxy  
↓  
RDS / Aurora

---

# DevOps/SRE Takeaways

Lambda networking decisions impact:

- performance
- scalability
- reliability

Best Practice

- Use VPC for private resources
- Use RDS Proxy for database access
- Avoid direct Lambda → RDS connections

---

# One-Line Memory Anchor

> Lambda outside VPC for public services  
> Lambda inside VPC + RDS Proxy for databases

---