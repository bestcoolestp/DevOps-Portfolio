2026-02-03 — CloudFront Origins, Geo Restriction & Cache Invalidation  
Perspective: DevOps / SRE Notes  
Theme: secure origin connectivity, regional control, and cache lifecycle management

“CDNs improve performance, but you must control where traffic goes and when caches refresh.”

---

# 🔗 CloudFront Origins for Applications

CloudFront commonly sits **in front of application backends**.

Typical architecture:

```

User → CloudFront → Origin (ALB / EC2 / S3)

```

Two origin connectivity models exist.

---

# 🟢 Modern Approach — VPC Origins

VPC Origins allow CloudFront to connect **directly to private resources inside a VPC**.

Supported origins:

- Application Load Balancer (ALB)
- Network Load Balancer (NLB)
- EC2 instances

Architecture:

```

User
↓
CloudFront Edge
↓
VPC Origin
↓
Private ALB / EC2

```

Key advantages:

- backend infrastructure remains **private**
- no public internet exposure
- simplified security model

Security model:

```

CloudFront → private VPC origin → private subnets

```

This is now the **recommended architecture**.

---

# 🔴 Legacy Approach — Public Origins

Before VPC origins existed, origins had to be **publicly reachable**.

Typical setup:

```

User → CloudFront → Public ALB → EC2

```

Security workaround:

- restrict inbound traffic to **CloudFront IP ranges**

Steps required:

1. obtain CloudFront IP list  
2. whitelist those IPs in security groups  
3. continuously update IP lists

Problems:

- operational overhead
- fragile security configuration
- risk of unintended exposure

---

# 🧠 Architecture Insight

Modern best practice:

```

CloudFront + Private Origins

```

Benefits:

- zero public exposure
- simpler security posture
- fewer network configuration errors

---

# 🌍 CloudFront Geo Restriction

Geo restriction allows **country-level traffic filtering**.

Purpose:

- licensing restrictions
- regional compliance
- content distribution control

---

## How It Works

CloudFront uses a **Geo-IP database**.

User request flow:

```

User IP → Geo lookup → country detected

```

Then policy decides:

- allow access
- deny access

---

## Configuration Modes

Allow List

```

Only selected countries can access

```

Block List

```

Specified countries are denied

```

---

## Example

Block access from:

```

Country A
Country B
Country C

```

Requests from those regions receive **access denied responses**.

---

## Use Cases

Typical scenarios:

- video streaming rights
- regional licensing
- legal compliance

---

# 🔄 CloudFront Cache Invalidation

## The Problem

CloudFront caches objects at edge locations.

Cache lifecycle:

```

Edge cache → TTL expires → fetch new content

```

If origin content changes **before TTL expires**, users still see old data.

---

## The Solution — Cache Invalidation

Invalidation forces edge locations to **delete cached objects early**.

Effect:

```

Next request → fetch fresh content from origin

```

---

## How Invalidation Works

Specify paths to invalidate.

Examples:

Single file:

```

/index.html

```

Directory wildcard:

```

/images/*

```

CloudFront instructs all edge locations to remove these objects.

---

## Example Scenario

Setup:

```

Origin: S3
TTL: 1 day

```

Admin updates:

```

index.html
/images/*

```

Invalidation request:

```

/index.html
/images/*

```

Result:

- edge caches drop old files
- next request fetches fresh content

Users immediately see updates.

---

# 🧠 DevOps / SRE Mental Model

These CloudFront capabilities address three operational concerns.

Origin connectivity

```

secure access to backend infrastructure

```

Geo restriction

```

control where traffic is allowed

```

Cache invalidation

```

control when content refreshes

```

Together they ensure:

- secure architecture
- regulatory compliance
- predictable content updates

---

# 🎯 High-Value Exam Signals

VPC Origins

- secure connection to private ALB / EC2
- preferred modern architecture

Geo Restriction

- country-based access filtering
- allow list or block list

Cache Invalidation

- removes cached objects before TTL expiry
- ensures immediate content refresh

---

# One-Line Summaries

VPC Origins

```

CloudFront VPC origins allow secure delivery from private ALB, NLB, or EC2 resources without exposing them to the internet.

```

Geo Restriction

```

CloudFront geo restriction limits access to content based on the user's country using allow or block lists.

```

Cache Invalidation

```

CloudFront cache invalidation removes cached objects from edge locations so updated origin content is served immediately.