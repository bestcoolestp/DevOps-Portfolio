2026-01-19 — Solution Architecture Progression  
Source: Stephane Maarek — AWS SAA  
Theme: evolving from single instance to resilient, scalable architecture

“Architecture is the story of removing bottlenecks and single points of failure.”

---

# 🎯 Big Picture

Shift focus from individual services to **how services work together**.

Goal:

- build mental models of real AWS architectures  
- understand trade-offs at each scaling stage  
- recognize common exam patterns  

Learning path uses incremental case studies:

- whatisthetime.com  
- myclothes.com  
- mywordpress.com  
- Elastic Beanstalk quick deploy  

---

# 🧱 Phase 1 — Basic Proof of Concept (PoC)

**Setup**

- Single EC2 (t2.micro)  
- Public IP + Elastic IP  

**Why Elastic IP**

- keeps address stable across stop/start  

**Pros**

- simplest possible deployment  

**Cons**

- single point of failure  
- no scaling  
- manual operations  

👉 Classic beginner architecture.

---

# 📈 Phase 2 — Vertical Scaling

**Action**

- upgrade instance (t2.micro → m5.large)

**Result**

- more compute power  
- but requires downtime  

**Limitation**

- capped by max instance size  
- still single machine  

👉 Vertical scaling does not solve availability.

---

# 🌐 Phase 3 — Horizontal Scaling (Naive)

**Action**

- multiple EC2 instances  
- each with Elastic IP  

**Problems**

- users must track multiple IPs  
- EIP soft limit (~5 per region)  
- operational complexity  

👉 Scaling compute without traffic abstraction fails.

---

# 🧭 Phase 4 — Introduce DNS (Route 53)

**Action**

- Route 53 A record → multiple instance IPs  

**New problem: TTL**

If an instance dies:

- DNS cache still points to dead IP  
- users experience failures until TTL expires  

👉 DNS alone cannot provide health-aware routing.

---

# ⚖️ Phase 5 — Add ELB (Major Shift)

**Architecture upgrade**

- ELB in public subnet  
- EC2 in private subnet  
- Route 53 **Alias → ELB**

**Key improvements**

- ELB health checks remove bad instances  
- no more manual IP management  
- automatic traffic distribution  
- tighter security (EC2 accepts only ELB traffic)

👉 This is the first **production-grade pattern**.

---

# 🔁 Phase 6 — Auto Scaling + Multi-AZ

**Action**

- replace fixed instances with ASG  
- deploy across multiple AZs  

**Benefits**

Elasticity  
- scale out during traffic spikes  
- scale in during low demand  

Resilience  
- survives AZ failure  

Operational maturity  
- no manual capacity planning  

---

## 💰 Cost Strategy

Typical production mix:

- Reserved Instances → baseline capacity  
- On-Demand / Spot → burst capacity  

👉 Common SAA exam pattern.

---

# 🔑 Architecture Mapping

| Concept           | AWS Solution        | Benefit             |
|-------------------|---------------------|---------------------|
| Static IP         | Elastic IP          | stable address      |
| DNS routing       | Route 53 Alias      | AWS-aware mapping   |
| Load balancing    | ELB + health checks | masks failures      |
| Scaling           | Auto Scaling Group  | elastic capacity    |
| Reliability       | Multi-AZ            | AZ fault tolerance  |
| Cost optimization | Reserved Instances  | lower baseline cost |

---

# 🧠 My Takeaway

This progression shows the **natural evolution of cloud architecture**:

1. Single instance (fragile)  
2. Bigger instance (still fragile)  
3. Multiple instances (messy)  
4. DNS (still blind to health)  
5. ELB (traffic intelligence appears)  
6. ASG + Multi-AZ (true cloud-native design)

The exam repeatedly tests whether you recognize **which stage solves which problem**.

That pattern recognition is the real skill.