# 2026-02-09 — AWS DataSync & Storage (DevOps/SRE Lens)

## 1. Core Mental Model (What problem this actually solves)
DataSync is not just “data transfer.”  
It is a **controlled, observable, repeatable data pipeline for file systems**.

Think in SRE terms:
- **State replication with guarantees** (metadata, permissions)
- **Throughput-optimized bulk sync**
- **Scheduled convergence, not real-time consistency**

---

## 2. Where DataSync Fits (Architecture Positioning)

| Layer | Tool | Role |
|------|------|------|
| Ingestion | DataSync | Bulk file movement with integrity |
| Hybrid Bridge | Storage Gateway | Continuous access + caching |
| Transfer Interface | Transfer Family | Protocol compatibility (FTP/SFTP) |
| Offline Transfer | Snow Family | Physical migration |
| Storage | S3 / EFS / FSx | Final state |

👉 Insight:  
**DataSync = batch pipeline**  
**Storage Gateway = near-real-time bridge**

---

## 3. Operational Characteristics (SRE-Relevant)

### Consistency Model
- Scheduled sync → **eventual consistency**
- Not suitable for:
  - real-time apps
  - low-latency systems

### Reliability
- Built-in:
  - checksum validation
  - retry mechanisms
- Preserves:
  - POSIX permissions
  - SMB ACLs
  - timestamps

👉 This is critical for:
- compliance workloads
- lift-and-shift migrations

---

## 4. Performance Engineering

- Single agent → up to **10 Gbps**
- Tunable:
  - bandwidth throttling
  - task scheduling

### SRE Takeaway
- Treat DataSync like a **network-intensive batch job**
- Plan for:
  - network saturation
  - cost spikes (per GB transfer)

---

## 5. Agent Strategy (Hidden Design Lever)

| Scenario | Agent Required |
|----------|--------------|
| On-prem → AWS | ✅ |
| Other cloud → AWS | ✅ |
| AWS → AWS | ❌ |

👉 Insight:
- Agent = **control plane extension into your infra**
- Placement matters:
  - close to data source
  - stable network path

---

## 6. Failure Modes (Real-World)

- Partial sync due to:
  - network interruption
  - permission mismatch
- Silent issues:
  - wrong directory mapping
  - stale scheduled tasks

### Mitigation
- CloudWatch monitoring
- Task logs validation
- Incremental dry runs

---

## 7. Storage Strategy (What to choose and why)

### Object (S3)
- Default landing zone
- Durable, cheap, scalable
- Best for:
  - logs
  - backups
  - data lakes

### Block (EBS / Instance Store)
- EBS:
  - persistent
  - single EC2 attachment
- Instance Store:
  - ultra-fast
  - ephemeral

👉 SRE rule:
- Never rely on Instance Store for recovery-critical data

### File (EFS / FSx)
- EFS:
  - Linux, POSIX, multi-AZ
- FSx:
  - Windows / HPC / enterprise compatibility

👉 Insight:
- File systems = **shared state layer**
- Harder to scale than object storage

---

## 8. Hybrid Patterns (What actually works in production)

### Pattern A — Migration
- On-prem → DataSync → S3 → lifecycle → Glacier

### Pattern B — Lift & Shift
- On-prem → DataSync → FSx (Windows workloads)

### Pattern C — HPC
- S3 ↔ FSx for Lustre ↔ compute cluster

---

## 9. Snow Family (When network fails you)

| Device | Use |
|--------|-----|
| Snowcone | Edge / small jobs + DataSync agent |
| Snowball | TB–PB scale |
| Snowmobile | Exabyte scale |

👉 Insight:
- Physical transfer = **last resort, but often fastest**

---

## 10. Decision Framework (Exam + Real World)

Ask 3 questions:

1. **Is it continuous or batch?**
   - Continuous → Storage Gateway
   - Batch → DataSync

2. **Do I need protocol compatibility?**
   - Yes → Transfer Family

3. **Is network a bottleneck?**
   - Yes → Snow Family

---

## 11. DevOps/SRE Takeaways

- DataSync = **data pipeline, not just transfer tool**
- Prioritize:
  - observability (logs, metrics)
  - scheduling discipline
- Treat data movement as:
  - **infrastructure workload**
  - not a one-off task

---

## 12. Sharp Edges (Contrarian Notes)

- Overused for simple S3 uploads  
  → CLI/SDK is often enough

- Not real-time  
  → don’t misuse for sync-critical apps

- Hidden cost risk  
  → large transfers + frequent schedules = expensive

---

## 13. One-Line Memory Anchor

> DataSync = **scheduled, high-throughput, metadata-preserving file sync across environments**