# 2026-04-20 — AWS DDoS Protection & Security Architecture Best Practices

# Core Mental Model

AWS DDoS defense is layered.

```text id="ddos1"
Edge Protection → Infrastructure Protection → Application Protection → Backend Isolation
```

---

# Key Philosophy

The closer attacks are stopped to the AWS Edge:

✅ the safer
✅ the cheaper
✅ the more scalable

your architecture becomes.

---

# 1. High-Level Architecture

Typical enterprise DDoS-resistant architecture:

```text id="ddos2"
Users → Route 53 → CloudFront / Global Accelerator → AWS Shield + WAF → ALB / API Gateway → Auto Scaling EC2 / ECS / Lambda
```

---

# Goal

Absorb and filter malicious traffic BEFORE it reaches compute resources.

---

# 2. Why Edge Services Matter

AWS Edge services provide:

✅ global traffic absorption
✅ Anycast routing
✅ distributed mitigation capacity
✅ reduced origin exposure

---

# Main Edge Services

| Service            | Purpose             |
| ------------------ | ------------------- |
| CloudFront         | CDN + Edge security |
| Global Accelerator | static Anycast IPs  |
| Route 53           | global DNS          |
| Shield             | DDoS protection     |

---

# 3. Route 53 Protection

# Why Route 53 Matters

DNS itself is often attacked.

---

# Route 53 Advantages

✅ globally distributed
✅ highly resilient
✅ Shield-integrated

---

# Security Benefit

DNS resolution continues even during attacks.

---

# 4. CloudFront as Security Layer

CloudFront is NOT just a CDN.

It is also:

```text id="ddos3"
A security boundary
```

---

# Major Security Benefits

✅ cache absorbs requests
✅ backend IPs hidden
✅ Edge filtering
✅ WAF integration
✅ Shield integration

---

# Huge Performance Benefit

Static content served from Edge locations.

Backend traffic reduced dramatically.

---

# 5. Global Accelerator

# Core Purpose

Provides:

```text id="ddos4"
Fixed Anycast IP addresses
```

with global routing optimization.

---

# Important Difference vs CloudFront

| Service            | Main Focus           |
| ------------------ | -------------------- |
| CloudFront         | HTTP/HTTPS content   |
| Global Accelerator | TCP/UDP acceleration |

---

# Security Benefit

Global Accelerator integrates directly with:

```text id="ddos5"
AWS Shield
```

---

# 6. Infrastructure Layer Defense

# Core Services

| Service      | Role               |
| ------------ | ------------------ |
| ELB          | distribute traffic |
| Auto Scaling | absorb surges      |
| Shield       | DDoS mitigation    |
| Route 53     | resilient DNS      |

---

# Important Concept

Elastic infrastructure helps survive traffic spikes.

---

# Example

```text id="ddos6"
Attack traffic spikes
↓
ELB distributes traffic
↓
ASG launches more EC2 instances
↓
Service remains available
```

---

# 7. ELB as Protection Layer

Load Balancers provide:

✅ traffic distribution
✅ health checks
✅ backend isolation

---

# Security Advantage

Clients interact with:

```text id="ddos7"
Load Balancer
```

NOT directly with EC2 instances.

---

# 8. Auto Scaling as Defense Mechanism

Auto Scaling supports:

```text id="ddos8"
Resilience under attack
```

---

# Important Insight

Not all traffic spikes are attacks.

Auto Scaling helps absorb both:

* legitimate traffic surges
* attack traffic

---

# 9. Application Layer Defense

Layer 7 attacks target:

* HTTP
* APIs
* login endpoints
* expensive queries

---

# Main Defenses

| Service         | Protection          |
| --------------- | ------------------- |
| WAF             | Layer 7 filtering   |
| Shield Advanced | advanced mitigation |
| API Gateway     | throttling          |
| CloudFront      | Edge caching        |

---

# 10. WAF Security Controls

WAF filters requests using:

* IP reputation
* signatures
* URI inspection
* body inspection
* geo restrictions
* rate limiting

---

# Example

```text id="ddos9"
Block requests:
>1000 req / 5 min
```

---

# Important Protection Types

✅ SQL injection
✅ XSS
✅ bot mitigation
✅ brute-force mitigation

---

# 11. Shield Advanced + WAF Synergy

Very important enterprise concept.

---

# Workflow

```text id="ddos10"
Attack detected → Shield Advanced → Automatic WAF rule deployment → Layer 7 mitigation
```

---

# Huge Benefit

Semi-automated attack response.

---

# 12. API Gateway Security Benefits

API Gateway adds:

✅ throttling
✅ burst limits
✅ API keys
✅ request validation
✅ header filtering

---

# Security Advantage

Protects backend Lambda/API systems from abuse.

---

# 13. Edge-Optimized API Gateway

Best for:

```text id="ddos11"
Global public APIs
```

---

# Internally Uses

```text id="ddos12"
CloudFront
```

---

# Result

Better global resilience and lower latency.

---

# 14. Backend Isolation Principle

Critical AWS security best practice:

```text id="ddos13"
Never expose backend resources directly
```

---

# Instead Use

* CloudFront
* API Gateway
* ALB
* Global Accelerator

---

# Huge Security Benefit

Attackers never see:

* EC2 IPs
* internal services
* database endpoints

---

# 15. Security Groups & NACLs

# Security Groups

Instance-level firewall.

---

# NACLs

Subnet-level stateless firewall.

---

# Role in DDoS Defense

Filter unnecessary traffic paths early.

---

# 16. Elastic IP Protection

Elastic IPs can be protected using:

```text id="ddos14"
Shield Advanced
```

---

# Useful For

* public EC2 workloads
* NAT gateways
* legacy public endpoints

---

# 17. Layered Defense Strategy

Best AWS security architectures follow:

```text id="ddos15"
Defense in depth
```

---

# Typical Layers

| Layer                | Service                         |
| -------------------- | ------------------------------- |
| DNS                  | Route 53                        |
| Edge                 | CloudFront / Global Accelerator |
| DDoS                 | Shield                          |
| Application          | WAF                             |
| Traffic Distribution | ELB                             |
| Compute Resilience   | Auto Scaling                    |

---

# 18. Enterprise SaaS Architecture Example

```text id="ddos16"
Users → Route 53 → CloudFront → Shield Advanced → WAF → ALB → ECS / EC2 / Lambda
```

---

# Benefits

✅ global scalability
✅ DDoS resilience
✅ Layer 7 filtering
✅ backend isolation

---

# 19. High-Value Exam Keywords

| Keyword               | Think                     |
| --------------------- | ------------------------- |
| Edge protection       | CloudFront / GA / Route53 |
| Layer 7 protection    | WAF                       |
| DDoS mitigation       | Shield                    |
| fixed global IPs      | Global Accelerator        |
| hide backend servers  | CloudFront / ALB          |
| absorb traffic spikes | Auto Scaling              |

---

# 20. Core AWS Security Principle

```text id="ddos17"
Protect at the Edge whenever possible
```

because Edge capacity is vastly larger than individual workloads.

---

# One-Line Final Memory Anchor

> Strong AWS DDoS protection combines Edge services, Shield, WAF, load balancing, auto scaling, and backend isolation into a layered defense architecture.

---