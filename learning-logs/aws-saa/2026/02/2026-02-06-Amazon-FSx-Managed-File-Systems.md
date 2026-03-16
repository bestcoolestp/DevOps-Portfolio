2026-02-06 — Amazon FSx (Managed File Systems)  
Perspective: DevOps / SRE Notes  
Theme: choosing the right managed file system for workloads

“Storage choice is architecture. Pick wrong, and everything hurts later.”

---

# 📂 Amazon FSx — Core Idea

FSx = **managed file systems on AWS**.

Analogy:

```

RDS → managed databases
FSx → managed file systems

```

You choose the file system based on **protocol + workload pattern**.

---

# 🧭 Decision Framework (What matters)

Pick FSx based on:

- protocol (SMB / NFS / iSCSI)
- workload type (HPC, enterprise, legacy NAS)
- performance pattern (IOPS vs throughput)
- ecosystem (Windows, NetApp, ZFS)

---

# 🪟 FSx for Windows File Server

## When to Use

```

Windows workloads + SMB + Active Directory

```

Key features:

- SMB + NTFS permissions
- deep AD integration (ACLs, users, quotas)
- supports DFS (hybrid with on-prem)

Architecture:

```

EC2 / On-Prem → SMB → FSx Windows

```

Storage options:

- SSD → low latency
- HDD → cost-efficient

Operational highlights:

- Multi-AZ HA
- automated backups (S3)
- can be mounted on Linux (less common but possible)

---

# ⚡ FSx for Lustre

## When to Use

```

HPC / ML / Big data / high throughput workloads

```

Performance profile:

- hundreds of GB/s throughput
- sub-millisecond latency
- millions of IOPS

---

## Key Feature — S3 Integration

```

S3 ↔ FSx Lustre

```

Use case:

- load data from S3 into Lustre
- process at high speed
- write results back to S3

---

## Deployment Types

### Scratch

- temporary
- no replication
- very high burst performance (~6×)

Use for:

```

short-lived workloads

```

---

### Persistent

- replicated within AZ
- durable

Use for:

```

long-running workloads

```

---

# 🧩 FSx for NetApp ONTAP

## When to Use

```

Enterprise NAS migration

```

Supports:

- NFS
- SMB
- iSCSI

---

## Key Capabilities

- snapshots & replication
- compression + deduplication
- auto-scaling storage
- instant cloning (dev/test environments)

Architecture flexibility:

```

Linux / Windows / VMware / EKS / ECS → ONTAP

```

---

## Exam Signal

If you see:

```

NetApp / NAS / deduplication / enterprise storage

```

→ choose **FSx ONTAP**

---

# 🧪 FSx for OpenZFS

## When to Use

```

ZFS workloads migration

```

Protocol:

- NFS only

---

## Features

- high performance (~1M IOPS)
- very low latency (<0.5 ms)
- snapshots & cloning
- compression

Important limitation:

```

No deduplication

```

---

## Exam Signal

If you see:

```

ZFS workloads

```

→ choose **FSx OpenZFS**

---

# 🧠 DevOps / SRE Mental Model

Each FSx option maps to a **specific ecosystem**.

| Workload | FSx Choice |
|------|------|
| Windows + AD | FSx Windows |
| HPC / ML | FSx Lustre |
| Enterprise NAS | FSx ONTAP |
| ZFS workloads | FSx OpenZFS |

---

# ⚖️ Performance vs Purpose

- Lustre → performance-first (throughput)
- Windows → enterprise integration
- ONTAP → feature-rich NAS
- OpenZFS → performance + ZFS semantics

---

# 🎯 High-Value Exam Signals

- SMB + AD → **FSx Windows**
- HPC / ML → **FSx Lustre**
- NAS / NetApp → **FSx ONTAP**
- ZFS → **FSx OpenZFS**
- Lustre + S3 integration = key differentiator
- ONTAP = deduplication + cloning
- OpenZFS = no deduplication

---

# One-Line Summary

```

Amazon FSx provides managed file systems tailored to specific workloads—Windows (SMB), Lustre (HPC), ONTAP (enterprise NAS), and OpenZFS (ZFS-based systems).
