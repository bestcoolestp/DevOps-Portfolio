# 2025-12-19 ~ 2025-12-20 — EC2 Instance Store, EBS Volume Types, Multi-Attach, Encryption

**Source:** Stephane Maarek — AWS SAA  
**Theme:** storage performance, durability trade-offs, and data protection

> “Fast storage is easy. Durable storage is a design choice.”

---

## What I learned (wrap-up)

### 1) EC2 Instance Store: speed with no safety net
**Instance Store** provides extremely high I/O performance because the storage is
**physically attached to the host machine**.

Key characteristics:
- very low latency, very high throughput
- **ephemeral**: data is lost when the instance stops or terminates
- no built-in durability or backup

**Use cases:**
- caches
- buffers
- scratch data
- temporary workloads

**Insight:**  
Instance Store is about performance, not persistence.  
If data must survive failures, Instance Store is the wrong choice.

---

## EBS volumes: matching storage type to workload

EBS volumes trade raw speed for **durability and flexibility**.

### General Purpose SSD
- **gp2**
  - IOPS tied to volume size (~3 IOPS/GB)
  - burst up to 3,000 IOPS
  - max 16,000 IOPS

- **gp3**
  - IOPS and throughput configured independently
  - baseline: 3,000 IOPS / 125 MB/s
  - scales to 16,000 IOPS / 1,000 MB/s

**Insight:**  
gp3 gives predictable performance without over-provisioning storage.

---

### Provisioned IOPS SSD (io1 / io2)
Designed for **latency-sensitive, mission-critical workloads**.

- provision IOPS directly
- consistent, predictable performance
- **io2 Block Express**
  - up to ~256,000 IOPS
  - sub-millisecond latency
  - supports Multi-Attach

**Typical use:** databases and high-performance transactional systems.

---

### HDD volumes (cost-driven)
- **st1** — throughput-optimized HDD  
  - big data, log processing, data warehousing

- **sc1** — cold HDD  
  - lowest cost
  - infrequently accessed or archival data

**Rule I remember:**  
SSD = latency / performance  
HDD = cost / throughput

---

### Boot volume reminder
Only these can be used as boot volumes:
- gp2, gp3
- io1, io2

---

## EBS Multi-Attach: shared block storage (with limits)

**Multi-Attach** allows one EBS volume to attach to multiple EC2 instances.

Key rules:
- only **io1 and io2**
- same Availability Zone only
- max **16 instances**
- requires a **cluster-aware file system**
  (not EXT4 or XFS)

**Use case:**  
clustered Linux applications that handle concurrent writes correctly.

**Insight:**  
Multi-Attach improves availability, but correctness is the application’s responsibility.

---

## EBS Encryption: secure by default behavior

When EBS encryption is enabled:
- data at rest is encrypted
- data in transit is encrypted
- snapshots are encrypted
- volumes created from encrypted snapshots stay encrypted
- encryption is transparent (no app changes)

Technical notes:
- uses **AWS KMS** with **AES-256**
- negligible performance impact

---

### Encrypting an existing unencrypted volume
Steps:
1. create a snapshot
2. **copy snapshot** and enable encryption
3. create a new volume from the encrypted snapshot
4. attach the new volume

**Important:**  
Snapshots inherit encryption status — copying with encryption is required to convert.

---

## My takeaway

EC2 storage is about choosing **where you accept risk**:  
performance vs durability, cost vs consistency, speed vs safety.

Good designs make those trade-offs explicit.
