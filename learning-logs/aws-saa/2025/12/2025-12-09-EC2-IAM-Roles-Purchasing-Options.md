# 2025-12-08 ~ 2025-12-09 — IAM Roles for EC2 & EC2 Purchasing Options

**Source:** Stephane Maarek — AWS SAA  
**Theme:** Secure instance permissions + cost-aware EC2 usage

> “Cost, security, and flexibility are design decisions, not afterthoughts.”

---

## What I learned (wrap-up)

### 1) IAM Role for EC2: permissions without credentials
An EC2 instance should not use hardcoded access keys.

Instead:
- attach an **IAM Role** to the instance
- AWS provides **temporary credentials automatically**
- permissions can be changed **without stopping the instance**

Console path I practiced:
  EC2 → Instances → Select instance → Actions → Security → Modify IAM role


**Takeaway:**  
IAM Roles are the default and safest way for EC2 to access AWS services.  
They remove credential management from the application entirely.

---

## EC2 purchasing options (how I now think about them)

### On-Demand
- Pay only for what you use
- No commitment, highest cost
- Best for short-term or unpredictable workloads

**Exam anchor:** use when usage cannot be predicted

---

### Reserved Instances (RI)
- 1 or 3 year commitment
- Large discounts (up to ~72%)
- Best for steady, predictable workloads (e.g., databases)

Types:
- **Standard RI** → highest discount, least flexible
- **Convertible RI** → more flexible, slightly lower discount

**Exam anchor:** predictable + long-term → RI

---

### Savings Plans
- Commit to a fixed **$/hour spend**
- Automatically applies across instance sizes, OS, tenancy
- Similar savings to RI but more flexible

**Takeaway:**  
Savings Plans optimize **spend**, not a specific instance.

---

### Spot Instances
- Very cheap (up to ~90% discount)
- Can be terminated at any time
- Best for fault-tolerant workloads:
  batch jobs, analytics, image processing

**Not suitable for:** databases or critical services

**Exam anchor:** cheap but unreliable

---

### Dedicated Hosts
- Entire physical server dedicated to you
- Required for certain compliance or licensing (BYOL)
- Full visibility into sockets and cores

**Use when:** licensing is tied to physical hardware

---

### Dedicated Instances
- Hardware dedicated to you
- No control over physical placement
- Less visibility than Dedicated Hosts

**Difference to remember:**  
Host = you control the building  
Instance = you get a private room

---

### Capacity Reservations
- Reserve EC2 capacity in a specific AZ
- Charged at On-Demand rates
- No discount, but guarantees availability

**Use when:** availability matters more than cost

---

## Mental model that helps me remember

Hotel analogy:
- **On-Demand** → walk-in guest, pay full price
- **Reserved** → long stay, big discount
- **Savings Plan** → commit to spending, flexible room choice
- **Spot** → cheap room, can be kicked out anytime
- **Dedicated Host** → rent the entire building
- **Dedicated Instance** → private room on dedicated hardware
- **Capacity Reservation** → reserve a room even if you don’t stay

---

## My takeaway

EC2 pricing is not about finding the cheapest option —  
it’s about matching **predictability, risk tolerance, and flexibility** to the workload.