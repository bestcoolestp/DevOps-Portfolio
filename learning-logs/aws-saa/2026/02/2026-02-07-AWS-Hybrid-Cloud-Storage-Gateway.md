2026-02-07 — AWS Hybrid Cloud & Storage Gateway  
Perspective: DevOps / SRE Notes  
Theme: bridging on-prem systems with cloud storage without rewriting everything

“Hybrid isn’t a compromise. It’s a phase—and often a permanent one.”

---

# 🌐 Hybrid Cloud — Reality First

Most systems are not fully cloud-native.

```

On-Prem ↔ AWS Cloud

Drivers:

- legacy systems
- compliance / data residency
- gradual migration
- cost control for predictable workloads

---

# 🧱 Storage Landscape (Mental Map)

| Type | AWS Service |
|------|------|
| Block | EBS, Instance Store |
| File | EFS, FSx |
| Object | S3, Glacier |

👉 Storage Gateway = **bridge into S3-backed storage**

---

# 🔌 Storage Gateway — Core Idea

```

On-Prem Apps → Gateway (VM) → AWS Storage (S3/Glacier)


It abstracts cloud storage behind familiar protocols:

- NFS / SMB (file)
- iSCSI (block / tape)

---

# 📂 1. S3 File Gateway

## When to Use

```

“Make S3 look like a file system”



---

## Architecture

```

On-Prem Server → NFS/SMB → File Gateway → HTTPS → S3



---

## Key Capabilities

- local cache → low-latency reads
- lifecycle → S3 → Glacier
- IAM-backed access
- SMB + Active Directory integration

---

## SRE Take

- perfect for **lift-and-shift file workloads**
- decouples compute from storage
- reduces local storage dependency

---

# 💾 2. Volume Gateway (Block)

## When to Use

```

“Extend block storage to the cloud”



---

## Protocol

- iSCSI

---

## Modes

### Cached Volumes

```

Primary = S3
Cache = On-Prem


- low latency for hot data
- scalable backend

---

### Stored Volumes

```

Primary = On-Prem
Backup = S3 (snapshots)


- full dataset local
- async backup to AWS

---

## SRE Take

- DR pattern, not primary storage
- snapshot-based recovery model
- think: **on-prem → cloud backup pipeline**

---

# 📼 3. Tape Gateway

## When to Use

```

“Replace physical tapes without changing backup software”


---

## Architecture

```

Backup Software → iSCSI VTL → Tape Gateway → S3 → Glacier


---

## Key Value

- no change to legacy workflows
- cheap archival (Glacier / Deep Archive)
- eliminates physical tape ops

---

## SRE Take

- classic enterprise migration path
- “don’t touch the app, replace the backend”

---

# 🧠 Deployment Model

Gateway runs as:

- VMware / Hyper-V / KVM (on-prem)
- or EC2 (cloud-hosted gateway)

---

## Key Insight

```

Placement = latency decision


- on-prem → better local access
- EC2 → tighter AWS integration

---

# ⚖️ Decision Table

| Requirement | Gateway |
|------|------|
| File access (NFS/SMB) → S3 | File Gateway |
| Block storage + backup | Volume Gateway |
| Replace tape backups | Tape Gateway |

---

# 🧩 Architectural Patterns

## 1. Backup Modernization

```

On-Prem → Volume Gateway → S3 → Glacier


---

## 2. Hybrid File System

```

On-Prem Apps → File Gateway → S3 (+ lifecycle → Glacier)


---

## 3. Legacy Tape Replacement

```

Backup Software → Tape Gateway → Glacier


---

# ⚠️ Operational Realities

- cache sizing matters → performance bottleneck
- IAM roles → required for access control
- lifecycle policies → critical for cost control
- network bandwidth still a constraint

---

# 🎯 High-Value Exam Signals

- NFS/SMB + S3 → **File Gateway**
- iSCSI + block + snapshots → **Volume Gateway**
- tape / VTL → **Tape Gateway**
- Glacier integration → lifecycle or tape gateway
- hybrid = VM-based gateway

---

# One-Line Summary

```

AWS Storage Gateway enables hybrid architectures by exposing S3-backed storage to on-prem systems using familiar protocols (NFS, SMB, iSCSI) with caching and lifecycle integration.