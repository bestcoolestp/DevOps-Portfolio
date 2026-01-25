# 2025-11-23 — Global vs Regional Services (IAM, Route 53, CloudFront, WAF)

**Source:** Stephane Maarek — AWS SAA course
**SAA domains:** Security • Resilient Architectures • High-Performing Architectures

## Key takeaways
- IAM is **global**: users/groups/roles/policies aren’t created “in a region.”
- Route 53 is **global DNS** with multiple routing policies (latency, geolocation, failover, etc.).
- CloudFront is a **global CDN** using edge locations; you don’t “deploy it to a region.”
- WAF scope depends on attachment:
  - CloudFront → effectively global
  - ALB / regional resources → regional

## Exam traps / gotchas
- “Choose a region for IAM” is a trick; IAM has global scope.
- WAF questions often hinge on **where** you attach it (CloudFront vs ALB).
- Global user traffic + low latency usually implies **CloudFront + Route 53 latency-based** (or Geo routing depending on wording).

## Micro-scenarios (how I’d answer)
- “Route users worldwide to nearest region with lowest latency”  
  → Route 53 latency routing + CloudFront in front (if content is cacheable).
- “Block SQLi/XSS for a global site served via CDN”  
  → WAF on CloudFront distribution (global edge enforcement).

## Hands-on proof (small but real)
- Console path: **Route 53 → Hosted zones → Create record → Routing policy**
- Console path: **CloudFront → Distributions → Behaviors / Origins**
- Follow-up lab idea: Put S3 behind CloudFront, add WAF managed rule group, test blocked patterns.

## My practical insight (what I want to remember)
- In most real designs, “global services” are the **front door** (Route 53 / CloudFront),
  while the actual workload still runs in a **specific region** (ALB/EC2/EKS/RDS).
- WAF questions usually become easy once I decide **where it attaches**:
  CloudFront = global edge protection, ALB = regional protection.
- When an exam scenario says “worldwide users + low latency”, I now mentally think:
  **Route 53 routing choice + CloudFront caching strategy**, then choose the simplest option.
