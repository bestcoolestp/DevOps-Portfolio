2025-01-20 — Stateless vs Stateful Web Architectures  
Subject: Cloud Architecture & Scalability  
Case Study: MyClothes.com (E-commerce)

“State is the enemy of horizontal scaling.”

---

# 🎯 Core Problem — Maintaining State

Stateless app (e.g., clock):
- Each request independent.
- No memory of previous interactions.

Stateful app (e.g., shopping cart):
- System must remember user actions.

Problem with ELB + multiple EC2:

- Request 1 → Instance A  
- Request 2 → Instance B  
- Instance B has no cart data → user loses items  

👉 Horizontal scaling breaks naive session handling.

---

# 🧠 Three Session Management Patterns

## 1️⃣ ELB Stickiness (Session Affinity)

**How**

- Load balancer sets cookie.
- User always routed to same EC2.

**Pros**

- Simple to enable.

**Cons**

- Instance failure = session loss.
- Reduces effective load distribution.

👉 Temporary workaround, not true stateless design.

---

## 2️⃣ Client-Side Cookies

**How**

- Full cart stored in browser cookie.
- Sent with every request.

**Pros**

- EC2 becomes stateless.

**Cons**

- 4KB size limit.
- Security risk (tampering).
- Larger HTTP payloads.

👉 Rarely ideal for complex apps.

---

## 3️⃣ External Session Store (Recommended)

**How**

- Browser stores only Session ID.
- Session data stored in:
  - ElastiCache (Redis/Memcached)
  - DynamoDB

**Pros**

- Sub-millisecond performance.
- Secure.
- EC2 instances fully stateless.
- Enables true horizontal scaling.

👉 Production-grade pattern.

---

# 📈 Scaling the Database Tier

As traffic grows → RDS becomes bottleneck.

## 🔹 Read Replicas

- Up to 15 replicas.
- Reads distributed.
- Master handles writes.

👉 Improves read scalability.

---

## 🔹 Lazy Loading (Cache Aside)

Flow:

1. Check cache.
2. Cache miss → read RDS.
3. Store in cache.
4. Future reads served from memory.

Result:

- Lower RDS CPU.
- Faster response time.

👉 High exam frequency pattern.

---

# 🛡 High Availability & DR

## Multi-AZ Strategy

- ELB + ASG across AZs.
- RDS Multi-AZ (synchronous standby).
- Redis Multi-AZ (if used).

Protects against:

- single AZ failure.
- infrastructure outage.

---

# 🔐 Security Group Chaining

Layered network restriction:

- ALB → public HTTP/HTTPS.
- EC2 → allow traffic only from ALB SG.
- RDS / Cache → allow traffic only from EC2 SG.

👉 Limits blast radius and enforces tier isolation.

---

# 🏗 Architecture Mapping

| Component        | Purpose                               | AWS Service            |
|------------------|---------------------------------------|------------------------|
| DNS              | Entry point routing                   | Route 53               |
| Load Balancer    | Traffic distribution / stickiness     | ALB                    |
| Compute          | Application runtime                   | EC2 + ASG              |
| Session Store    | Fast temporary session data           | ElastiCache / DynamoDB |
| Permanent Store  | Durable user data                     | RDS                    |
| Read Scaling     | Offload DB read pressure              | Read Replicas / Cache  |

---

# 🧠 My Takeaway

The architectural evolution:

- Stateful app → scaling problem.
- External session store → stateless compute.
- Read replicas + caching → scalable data tier.
- Multi-AZ + SG chaining → resilient & secure.

The key insight:

> Cloud scalability requires removing state from compute and distributing it intelligently.