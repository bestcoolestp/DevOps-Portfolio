# 2026-05-18 — VMware Cloud on AWS

# What is VMware Cloud on AWS?

VMware Cloud on AWS allows you to:

```text
Run VMware inside AWS
```

without changing how you manage your VMware environment.

---

Think of it as:

```text
Your VMware Data Center → Extended → AWS Cloud
```

---

# Core Idea

Instead of migrating VMs into EC2,

you simply move your VMware environment into AWS.

```text
vSphere → AWS
```

---

You continue using familiar VMware tools.

---

# VMware Components

VMware Cloud on AWS includes:

```text
vSphere
```

Virtual machine management.

---

```text
vSAN
```

Storage.

---

```text
NSX
```

Networking and security.

---

AWS manages the infrastructure underneath.

---

# Hybrid Cloud Architecture

```text
On-Premises VMware → VMware Cloud on AWS → AWS Services
```

---

Everything is managed together.

---

# Unified Management

Administrators continue using:

```text
vCenter
```

instead of learning entirely new AWS management tools.

---

One interface manages:

```text
On-Prem + AWS VMware
```

---

# Main Use Cases

## 1. Capacity Expansion

Need more compute?

```text
Data Center → VMware Cloud on AWS → Extra Capacity
```

No new hardware required.

---

## 2. Workload Migration

Move existing VMware workloads.

```text
VMware VM → VMware Cloud on AWS
```

No application redesign.

---

## 3. Hybrid Cloud

Applications run in both:

```text
On-Prem + AWS
```

simultaneously.

---

## 4. Disaster Recovery

Primary site:

```text
On-Prem
```

Backup site:

```text
AWS
```

During disaster:

```text
Failover → AWS
```

---

# AWS Service Integration

VMware Cloud can directly access:

```text
EC2, S3, RDS, FSx, & Redshift
```

---

```text
AWS Direct Connect
```

---

Example:

```text
VMware VM → Read files from S3 → Store backups in FSx → Connect to RDS
```

---

# Architecture

```text
Corporate Data Center → VMware → VMware Cloud on AWS → AWS Services
```

---

# VMware Cloud vs Amazon EC2

## VMware Cloud

```text
Keep VMware

Keep vCenter

Keep existing VMs
```

---

Best for:

```text
Lift-and-shift VMware customers
```

---

## Amazon EC2

```text
Native AWS

New infrastructure
```

---

Best for:

```text
Cloud-native workloads
```

---

# Benefits

```text
No hardware purchase

Rapid scaling

Unified management

Hybrid cloud

Disaster Recovery
```

---

# Typical Workflow

```text
Existing VMware → Extend into AWS → Use AWS storage → Use AWS databases → Scale when needed
```

---

# Exam Decision Table

| Scenario | Answer |
|----------|--------|
| Extend VMware into AWS | VMware Cloud on AWS |
| Continue using vCenter | VMware Cloud on AWS |
| Hybrid VMware environment | VMware Cloud on AWS |
| VMware Disaster Recovery | VMware Cloud on AWS |
| VMware + AWS services | VMware Cloud on AWS |

---

# Service Comparison

| Service | Purpose |
|---------|---------|
| VMware Cloud on AWS | VMware infrastructure in AWS |
| EC2 | Native virtual machines |
| MGN | Server migration |
| DMS | Database migration |
| Direct Connect | Dedicated network |

---

# Architecture Comparison

## VMware Cloud

```text
VMware → AWS → Continue VMware
```

---

## MGN

```text
Physical Server → AWS EC2
```

---

## VM Import/Export

```text
VM → EC2
```

---

# Decision Tree

Question:

```text
Already using VMware?
```

Answer:

```text
VMware Cloud on AWS
```

---

Question:

```text
Need hybrid VMware infrastructure?
```

Answer:

```text
VMware Cloud on AWS
```

---

Question:

```text
Need VMware Disaster Recovery?
```

Answer:

```text
VMware Cloud on AWS
```

---

Question:

```text
Need to keep vCenter?
```

Answer:

```text
VMware Cloud on AWS
```

---

# Memory Anchors

```text
VMware = vSphere
```

---

```text
Storage = vSAN
```

---

```text
Networking = NSX
```

---

```text
Hybrid Cloud = VMware Cloud on AWS
```

---

```text
Keep vCenter = VMware Cloud on AWS
```

---

```text
Existing VMware = No Rebuild
```

---

# SAA Exam Traps

Question:

```text
Customer already has hundreds of VMware VMs and wants AWS.
```

Answer:

```text
VMware Cloud on AWS
```

---

Question:

```text
Need hybrid cloud using VMware tools.
```

Answer:

```text
VMware Cloud on AWS
```

---

Question:

```text
Need to use vSphere inside AWS.
```

Answer:

```text
VMware Cloud on AWS
```

---

# Final Memory Anchor

> VMware Cloud on AWS extends an existing VMware environment into AWS without requiring applications or management tools to change. It supports **vSphere**, **vSAN**, and **NSX**, while integrating with AWS services such as **EC2**, **S3**, **FSx**, **RDS**, **Redshift**, and **Direct Connect**. It is ideal for hybrid cloud, disaster recovery, and VMware lift-and-shift migrations.
