# 2025-12-10 ~ 2025-12-13 — EC2 Spot Instances, IP Addressing, Placement Groups

**Source:** Stephane Maarek — AWS SAA  
**Theme:** cost-efficient compute, networking basics, and physical placement strategy

> “Cheap resources are only cheap if you can afford to lose them.”

---

## What I learned (wrap-up)

### 1) EC2 Spot Instances: cheap by design, unreliable by nature
Spot Instances let you use spare EC2 capacity at a **deep discount (up to ~90%)**, but with one tradeoff:  
AWS can take them back when capacity is needed.

Key behavior:
- you set a **maximum Spot price**
- instance runs while market price ≤ your max
- when price exceeds:
  - **2-minute interruption notice**
  - instance may **stop** (state preserved) or **terminate** (state lost)

**Takeaway:**  
Spot is not “cheap EC2” — it is **interruptible compute**.

---

### Spot Blocks (limited stability)
- request uninterrupted Spot capacity for **1–6 hours**
- interruptions are rare, but still possible

**Use when:** you need a predictable short window, not long-running services.

---

### Spot Requests (important lifecycle detail)
- **One-time request** → fulfilled once, then ends
- **Persistent request** → AWS keeps trying to maintain capacity

⚠️ To fully stop Spot usage:
1. **Cancel the Spot request**
2. **Terminate the instance**

**Exam insight:**  
If you terminate the instance *without* canceling the request, AWS will relaunch it.

---

### Spot Fleets: managing Spot at scale
Spot Fleets let AWS choose the best mix of:
- instance types
- Availability Zones
- Spot + optional On-Demand capacity

Allocation strategies:
- **Lowest Price** → cheapest, short workloads
- **Diversified** → spread across pools for resilience
- **Capacity Optimized** → fewer interruptions
- **Price-Capacity Optimized** → balance of cost + stability (recommended)

**Takeaway:**  
Spot Fleets shift the problem from “which instance?” to “which strategy?”

---

## IP addressing: what changes, what doesn’t

- **Private IP** → internal AWS network only
- **Public IP** → internet-accessible, changes after stop/start
- **Elastic IP** → fixed public IPv4 (generally discouraged)

**Key rule I remember:**  
Every EC2 instance has a **private IP**.  
Public IPs are temporary unless you pin them — and pinning usually doesn’t scale well.

---

## Placement Groups: performance vs resilience vs scale

Placement groups control **how EC2 instances are physically placed**.

### Cluster placement group
- **Pros:** ultra-low latency, high network throughput
- **Cons:** single AZ failure = total failure
- **Use:** big data jobs, HPC, low-latency workloads

---

### Spread placement group
- **Pros:** maximum isolation, reduced blast radius
- **Cons:** limited to 7 instances per AZ
- **Use:** critical workloads needing high availability

---

### Partition placement group
- **Pros:** scale to hundreds of instances across partitions
- **Use:** large distributed systems (Hadoop, Cassandra, Kafka)

---

## My takeaway

Spot Instances, IP design, and placement groups all force the same question:  
**what can I afford to lose — performance, availability, or control?**

Good architecture starts by answering that honestly.