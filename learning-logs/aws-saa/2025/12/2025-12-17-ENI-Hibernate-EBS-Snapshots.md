# 2025-12-14 ~ 2025-12-17 — ENI, EC2 Hibernate, Instance Storage, EBS Snapshots

**Source:** Stephane Maarek — AWS SAA  
**Theme:** network identity, instance state preservation, and durable storage

> “In the cloud, identity, state, and data all have different lifecycles.”

---

## What I learned (wrap-up)

### 1) Elastic Network Interface (ENI): network identity decoupled from compute
An **ENI** is a virtual network card inside a VPC.

Each ENI can have:
- one primary private IPv4 (and optional secondary IPv4s)
- public IPs or Elastic IPs mapped to private addresses
- one or more security groups
- its own MAC address and attributes

Important characteristics:
- ENIs are **bound to a specific AZ**
- they can be **attached, detached, and reattached** to EC2 instances
- they can move between instances *within the same AZ*

**Insight:**  
ENIs allow network identity (IP + security groups) to outlive an instance, which makes them useful for failover and replacement scenarios.

---

### 2) EC2 Hibernate: pause without losing memory state
EC2 Hibernate lets you stop an instance while preserving its **in-memory state**.

Key points:
- RAM contents are written to the **encrypted root EBS volume**
- root volume must be large enough to store the RAM dump
- supported on specific instance families and OSs (not bare metal)
- works with On-Demand, Reserved, and Spot
- supported for hibernation periods of up to **60 days**

**Use when:**  
you want fast resume and don’t want to reinitialize applications or long-running processes.

**Insight:**  
Hibernate preserves *state*, not just data — but storage requirements and limits matter.

---

### 3) EC2 instance storage: EBS as durable network storage
**EBS volumes** are network-attached block storage that persist independently of an EC2 instance.

Key properties:
- bound to a specific AZ
- attached to one instance at a time (at the SAA level)
- multiple EBS volumes can attach to one instance
- performance and size must be provisioned in advance
- billed based on capacity and performance

**Delete on Termination**
- root volume → deleted by default
- additional volumes → preserved unless configured otherwise

**Insight:**  
EBS volumes survive instances, but not AZs — snapshots are required to move data safely.

---

### 4) EBS Snapshots: backups, mobility, and recovery
An **EBS Snapshot** is a point-in-time backup of a volume.

Core behavior:
- volumes don’t need to be detached (though detaching improves consistency)
- snapshots can be copied across AZs and Regions
- snapshots are the bridge between **durability and portability**

#### Snapshot features I learned
- **Snapshot Archive**
  - up to ~75% cost savings
  - restore time: 24–72 hours

- **Recycle Bin**
  - protects against accidental deletion
  - retention configurable (1 day → 1 year)

- **Fast Snapshot Restore (FSR)**
  - eliminates first-read latency
  - useful for large volumes or rapid recovery
  - comes with **high cost**

**Insight:**  
Snapshots are not just backups — they are cost, safety, and recovery design tools.

---

## My takeaway

EC2 compute, memory, networking, and storage all have **separate lifecycles**.  
Good AWS design comes from knowing which parts should persist — and which should not.
