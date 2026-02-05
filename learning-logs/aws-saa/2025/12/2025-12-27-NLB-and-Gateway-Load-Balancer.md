# 2025-12-25 ~ 2025-12-27 — Network Load Balancer (NLB) & Gateway Load Balancer (GWLB)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** non-HTTP load balancing and network-level traffic control

> “When HTTP rules aren’t enough, traffic moves down the stack.”

---

## What I learned (wrap-up)

### Network Load Balancer (NLB)
**NLB operates at Layer 4 (TCP/UDP)** and is built for extreme performance.

Key points:
- handles **TCP and UDP**
- millions of requests per second
- ultra-low latency
- provides **static IPs per AZ**
  - Elastic IPs can be assigned

Target groups can include:
- EC2 instances
- private IP addresses
- **ALB** (NLB for static IPs, ALB for HTTP routing)

Health checks:
- TCP, HTTP, or HTTPS  
(even though traffic is Layer 4)

**When I think NLB:**  
static IPs, TCP/UDP, extreme throughput.

---

### Gateway Load Balancer (GWLB)
**GWLB is for network traffic inspection**, not application routing.

Purpose:
- deploy and scale **third-party network appliances**
  (firewalls, IDS/IPS, deep packet inspection)
- force traffic through inspection before reaching apps

How traffic flows:
- User → **GWLB**
- GWLB → appliance fleet
- appliance inspects traffic:
  - allow → back to GWLB → application
  - deny → drop

Key characteristics:
- operates at **Layer 3**
- acts as both:
  - transparent gateway
  - load balancer
- uses **GENEVE (UDP 6081)**

Target groups:
- EC2 instances
- private IP addresses (including on-prem)

**When I think GWLB:**  
traffic inspection, firewalls, transparent network control.

---

## My takeaway

- **NLB** is about speed, scale, and static IPs.
- **GWLB** is about security and traffic inspection.
- Both solve problems that ALB is not designed for.
