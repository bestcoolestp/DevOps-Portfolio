# 2025-12-23 — Scalability & High Availability (Core Concepts)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** handling growth vs surviving failure

> “Scaling handles success. Availability handles failure.”

---

## What I learned (wrap-up)

Scalability and High Availability are closely related concepts, but they solve **different problems**.  
Understanding the difference matters both for exams and for real system design.

---

## Scalability: handling more load

**Scalability** is the ability of a system to adapt when demand increases.

### 1) Vertical Scalability (Scale Up)
- increase the capacity of a **single instance**
- example: upgrade EC2 from `t2.micro` → `t2.large`
- common for non-distributed systems (databases, caches)

**Analogy:**  
a junior call-center operator handling 5 calls/min → a senior operator handling 10 calls/min

**Limitations:**
- hardware limits
- downtime often required
- no redundancy by itself

---

### 2) Horizontal Scalability (Scale Out / In)
- increase or decrease the **number of instances**
- requires distributed systems
- common for web applications

**AWS example:**
- Auto Scaling Groups add or remove EC2 instances
- Load Balancers distribute traffic

**Terminology I remember:**
- **Scale out** → add instances
- **Scale in** → remove instances

**Analogy:**  
hire more operators to answer calls

---

## High Availability: surviving failures

**High Availability (HA)** is the ability of a system to remain operational even when part of it fails.

Key idea:
- run systems across **multiple Availability Zones**
- avoid single points of failure

**Analogy:**  
operators split between New York and San Francisco — one site can fail without stopping service.

---

### HA patterns
- **Passive HA**
  - standby system takes over on failure
  - example: RDS Multi-AZ

- **Active HA**
  - multiple systems serve traffic at the same time
  - example: EC2 instances across AZs behind a Load Balancer

**Goal:**  
survive data center loss while maintaining service continuity.

---

## AWS context (how it shows up in practice)

- **Vertical scaling**
  - increase instance size (`t2.nano` → `u-12tb1.metal`)
- **Horizontal scaling**
  - Auto Scaling Groups + Load Balancers
- **High Availability**
  - deploy across multiple AZs with redundancy

---

## My takeaway

Scalability answers **“How do we handle more traffic?”**  
High Availability answers **“What happens when something breaks?”**
They often work together — but they are not the same problem.
