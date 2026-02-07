# 2025-12-28 — Cross-Zone Load Balancing & SSL/TLS with Load Balancers

**Source:** Stephane Maarek — AWS SAA  
**Theme:** traffic distribution across AZs and secure client connections

> “Even traffic keeps systems healthy. Encrypted traffic keeps them trustworthy.”

---

## What I learned (wrap-up)

## Cross-Zone Load Balancing

### What it solves
**Cross-zone load balancing** allows each load balancer node to distribute traffic
**evenly across all registered instances in all AZs**.

Without it:
- traffic stays within the same AZ
- uneven EC2 counts across AZs lead to traffic imbalance

**Key idea:**  
Cross-zone balancing equalizes load **per instance**, not per AZ.

---

### Behavior by load balancer type

| Load Balancer | Default  | Inter-AZ Data Charges |
|---------------|----------|-----------------------|
| ALB           | Enabled  | No                    |
| NLB           | Disabled | Yes (if enabled)      |
| Gateway LB    | Disabled | Yes (if enabled)      |
| Classic LB    | Disabled | No (legacy)           |

**Exam focus:** ALB, NLB, Gateway LB  
(CL B is deprecated and low priority)

---

### Configuration notes
- **ALB**
  - enabled by default
  - can be overridden at target group level
- **NLB / Gateway LB**
  - must be enabled manually
  - may incur data transfer costs

---

## SSL / TLS and Load Balancers

### SSL vs TLS
- **TLS** is the modern standard (still commonly called “SSL”)
- provides **in-flight encryption**
- protects data between client and server

---

### Certificates & load balancers
- certificates are issued by trusted **Certificate Authorities (CA)**
- load balancers perform **SSL termination**:
  - decrypt traffic at the load balancer
  - forward traffic to backends inside the VPC
- certificates are managed via **AWS Certificate Manager (ACM)**
  - upload your own
  - define a default certificate for HTTPS listeners
  - attach multiple certificates if needed

---

### SNI (Server Name Indication)
**SNI** allows multiple SSL/TLS certificates on a single load balancer.

How it works:
- client sends hostname during TLS handshake
- load balancer selects the correct certificate

Supported by:
- ALB
- NLB
- CloudFront

Not supported by:
- Classic Load Balancer

---

### Certificate support by load balancer

| Load Balancer | Certificate Support         |
|---------------|-----------------------------|
| Classic LB    | One certificate only        |
| ALB           | Multiple certificates (SNI) |
| NLB           | Multiple certificates (SNI) |

---

## My takeaway

Cross-zone load balancing protects you from uneven capacity across AZs.  
TLS and SNI protect users while allowing **one load balancer to serve many domains**.

Traffic distribution and encryption are **infrastructure concerns**, not application logic.
