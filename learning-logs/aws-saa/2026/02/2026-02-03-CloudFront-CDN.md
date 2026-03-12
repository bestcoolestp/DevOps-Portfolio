2026-02-03 — Amazon CloudFront  
Perspective: DevOps / SRE Notes  
Theme: global content delivery, caching, and edge security

“Move content closer to users, not users closer to content.”

---

# 🌍 Amazon CloudFront

## Core Idea

CloudFront is AWS’s **Content Delivery Network (CDN)**.

Purpose:

```

Reduce latency by caching content at edge locations worldwide.

```

Instead of every request hitting the origin server, content is served from **global edge caches**.

---

# ⚡ How CloudFront Works

Request flow:

```

User → nearest Edge Location → (cache hit?) → return content
↓
cache miss
↓
Origin fetch
↓
cache response

```

After the first request:

```

subsequent users → served directly from edge cache

```

Result:

- lower latency
- reduced origin load
- faster global delivery

---

# 📦 Supported Origins

CloudFront retrieves content from **origins**.

Common origin types:

### S3 Bucket

Most common for static content.

Examples:

- images
- videos
- HTML
- JavaScript
- CSS

Security handled with:

```

Origin Access Control (OAC)

```

This keeps S3 objects **private** while allowing CloudFront access.

---

### VPC Origins

Private infrastructure inside AWS.

Examples:

- ALB
- NLB
- EC2 applications

Used when applications run inside **private subnets**.

---

### Custom HTTP Origins

Public HTTP backends.

Examples:

- public load balancers
- on-prem servers
- external web servers

---

# 🚀 Performance Benefit Example

Scenario:

```

S3 bucket in Australia
User in United States

```

First request:

```

US Edge → fetch from Australia → cache

```

Second request:

```

US Edge → serve cached object

```

Latency drops dramatically.

---

# 🛡 Security Features

CloudFront integrates with several AWS security services.

Built-in protections:

- **AWS Shield** → DDoS mitigation
- **AWS WAF** → application-layer filtering
- **TLS termination** → secure HTTPS delivery
- **Origin Access Control (OAC)** → private S3 access

Result:

```

Edge security + origin protection

```

---

# 📊 CloudFront vs S3 Replication

These services solve **different problems**.

| Feature | CloudFront | S3 Cross-Region Replication |
|------|------|------|
| Purpose | Global caching (CDN) | Regional data replication |
| Scale | ~200+ edge locations | Specific AWS regions |
| Data | Temporary cached copies | Permanent replicated objects |
| Best For | Static content delivery | Multi-region durability |
| Performance | Global latency optimization | Regional availability |

Mental model:

```

CloudFront → performance
Replication → redundancy

```

---

# 🧪 CloudFront + S3 Deployment Pattern

Typical architecture:

```

User → CloudFront → Private S3 Bucket

```

Steps:

1️⃣ Create S3 bucket  
2️⃣ Upload static assets  
3️⃣ Keep bucket **private**  
4️⃣ Create CloudFront distribution  
5️⃣ Enable **Origin Access Control (OAC)**  
6️⃣ CloudFront automatically updates bucket policy

Result:

```

Public access → CloudFront
Private storage → S3

```

---

# ⚡ Caching Behavior

First request:

```

Edge → Origin → cache

```

Subsequent requests:

```

Edge → serve instantly

```

Caching dramatically reduces:

- origin load
- response time
- bandwidth cost

---

# 🧠 DevOps / SRE Mental Model

CloudFront solves three operational problems:

**Performance**

```

Serve content from edge locations

```

**Security**

```

Hide origin infrastructure

```

**Scalability**

```

Absorb global traffic spikes

```

It is a foundational component of **modern web architectures**.

---

# 🎯 High-Value Exam Signals

- CDN in AWS → **CloudFront**
- improves **read performance**
- caches content at **edge locations**
- integrates with **WAF and Shield**
- used with **private S3 buckets via OAC**

---

# One-Line Summary

```

CloudFront is AWS’s global CDN that caches content at edge locations to deliver faster, secure access to data stored in origins such as S3 or load balancers.
