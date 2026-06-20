# 2026-05-12 — AWS Networking Costs

# Golden Rule

AWS networking follows one simple principle:

```text
Ingress = Free

Egress = Charged
```

---

# Ingress vs Egress

## Ingress

Traffic entering AWS.

Examples:

```text
Laptop → EC2

Corporate DC → S3

Internet → CloudFront
```

Cost:

```text
FREE
```

---

## Egress

Traffic leaving AWS.

Examples:

```text
EC2 → Internet

S3 → Internet

RDS → On-premises
```

Cost:

```text
Charged
```

---

# Data Transfer Inside One Region

## Same AZ + Private IP

```text
EC2 A → EC2 B
```

Cost:

```text
FREE
```

Best practice:

```text
Use private IP whenever possible.
```

---

## Different AZ + Private IP

```text
AZ-A → AZ-B
```

Cost:

```text
$0.01/GB
```

---

## Different AZ + Public IP

```text
Public IP → Public IP
```

Cost:

```text
$0.02/GB
```

Avoid this.

Always prefer:

```text
Private IP
```

---

## Cross-Region

```text
us-east-1 → eu-west-1
```

Cost:

```text
≈ $0.02/GB
```

---

# Architecture Comparison

## Cheap

```text
EC2 → Private IP → EC2

Same AZ
```

```text
FREE
```

---

## Expensive

```text
EC2 → Public IP → Internet → EC2
```

```text
Charged
```

---

# RDS Read Replica Costs

## Same AZ

```text
Primary → Replica
```

Cost:

```text
FREE
```

---

## Different AZ

```text
Primary → Replica
```

Cost:

```text
$0.01/GB
```

---

Tradeoff:

```text
Cheaper
```

vs

```text
Higher Availability
```

---

# Egress Optimization

Bad:

```text
Corporate DC → 100 MB → AWS
```

↓

```text
100 MB → Corporate DC
```

---

Charged twice.

---

Better:

```text
Corporate DC → Request → AWS EC2 → Process internally → Small result back
```

---

Only small output leaves AWS.

---

# Direct Connect Cost Optimization

Choose:

```text
Nearest DX location
```

Benefits:

```text
Lower latency

Lower egress cost
```

---

# S3 Data Transfer Costs

## Upload to S3

```text
Laptop → S3
```

Cost:

```text
FREE
```

---

## Download from S3

```text
S3 → Internet
```

Cost:

```text
≈ $0.09/GB
```

---

# S3 Transfer Acceleration

Uses:

```text
CloudFront Edge Locations
```

Benefits:

```text
Faster uploads
```

Extra cost:

```text
$0.04~0.08/GB
```

---

# CloudFront Optimization

Without CloudFront:

```text
S3 → Internet
```

Cost:

```text
$0.09/GB
```

---

With CloudFront:

```text
S3 → CloudFront → Internet
```

Costs:

```text
S3 → CloudFront

FREE
```

---

```text
CloudFront → Internet

≈ $0.085/GB
```

---

Benefits:

```text
Cheaper

Caching

Faster
```

---

# Cross-Region Replication

```text
S3 → Another Region
```

Cost:

```text
≈ $0.02/GB
```

---

# NAT Gateway Costs

Two charges:

## Hourly

```text
$0.045/hour
```

---

## Data Processing

```text
$0.045/GB
```

---

## Cross-Region Traffic

```text
$0.09/GB
```

---

# NAT Gateway Example

Private EC2:

```text
EC2 → NAT Gateway → S3
```

Costs:

```text
NAT hourly + NAT data processing
```

---

# Better Solution: Gateway Endpoint

For:

```text
S3

DynamoDB
```

---

Architecture:

```text
EC2 → Gateway Endpoint → S3
```

---

No NAT involved.

Costs:

```text
No hourly charge
```

Only:

```text
≈ $0.01/GB
```

within same region.

---

# NAT vs Gateway Endpoint

| Feature | NAT Gateway | Gateway Endpoint |
|---------|-------------|-----------------|
| Hourly cost | $0.045/hr | $0 |
| Data processing | $0.045/GB | $0 |
| Same region traffic | Charged | Very cheap |
| S3 support | Yes | Yes |
| DynamoDB support | Yes | Yes |

---

# Architecture Comparison

## Expensive

```text
EC2 → NAT Gateway → Internet → S3
```

---

## Cheap

```text
EC2 → Gateway Endpoint → S3
```

---

# Cost Optimization Strategies

## Strategy 1

Keep workloads in one AZ.

```text
FREE traffic
```

Tradeoff:

```text
Lower HA
```

---

## Strategy 2

Use private IPs.

Avoid:

```text
Public IP

Elastic IP
```

---

## Strategy 3

Use CloudFront.

```text
Cheaper

Caching

Global performance
```

---

## Strategy 4

Use VPC Endpoints.

Especially:

```text
S3

DynamoDB
```

---

## Strategy 5

Minimize outbound traffic.

Keep processing inside AWS.

---

# Architecture Cheat Sheet

## Cheap Architecture

```text
EC2 → Private IP → EC2 → Gateway Endpoint → S3 → CloudFront → Internet
```

---

## Expensive Architecture

```text
EC2 → Public IP → NAT Gateway → Internet → S3
```

---

# SAA Exam Traps

### Scenario 1

Question:

```text
Cheapest private access to S3?
```

Answer:

```text
Gateway Endpoint
```

Not:

```text
NAT Gateway
```

---

### Scenario 2

Question:

```text
Reduce data transfer costs
between EC2 instances.
```

Answer:

```text
Private IP

Same AZ
```

---

### Scenario 3

Question:

```text
Cheapest global content delivery?
```

Answer:

```text
CloudFront
```

---

### Scenario 4

Question:

```text
Reduce outbound internet traffic costs.
```

Answer:

```text
Keep workloads inside AWS
```

---

### Scenario 5

Question:

```text
Optimize hybrid connectivity.
```

Answer:

```text
Nearest Direct Connect location
```

---

# Memory Anchors

```text
Ingress = FREE
```

---

```text
Egress = Charged
```

---

```text
Same AZ + Private IP = FREE
```

---

```text
CloudFront = Cheaper than S3
```

---

```text
S3 + DynamoDB = Gateway Endpoint
```

---

```text
NAT Gateway = Expensive
```

---

# Final Memory Anchor

> AWS networking costs are primarily driven by egress traffic. To minimize costs, use private IPs, keep workloads in the same Availability Zone when appropriate, use CloudFront for content delivery, use Gateway Endpoints for S3 and DynamoDB access, and keep data processing inside AWS instead of transferring large datasets out to external systems.
