# 2026-01-01 ~ 2026-01-02 — AWS RDS Overview + Read Replicas vs Multi-AZ

**Source:** Stephane Maarek — AWS SAA  
**Theme:** managed relational databases, scaling reads, and disaster recovery

> “Scaling and recovery look similar until production breaks.”

---

## What I learned (wrap-up)

## 1) RDS: managed SQL databases
**RDS (Relational Database Service)** is AWS’s managed service for SQL-based databases.

Supported engines:
- PostgreSQL, MySQL, MariaDB
- Oracle, Microsoft SQL Server, IBM DB2
- **Aurora** (AWS proprietary engine)

**Why RDS over running a DB on EC2**
RDS removes a lot of operational overhead:
- provisioning + OS patching
- automated backups + Point-in-Time Restore
- monitoring dashboards
- maintenance windows
- scaling options:
  - vertical: bigger instance
  - horizontal: add read replicas
- storage backed by EBS

**Important limitation:**  
You can’t SSH into an RDS instance. AWS abstracts the underlying host away.

---

## 2) RDS Storage Auto Scaling (practical safety net)
You set initial storage (e.g., 20GB), and RDS can automatically grow it if needed.

Benefits:
- prevents “disk full” outages
- no manual intervention
- no downtime during storage growth (typical expectation in exam scenarios)

Auto-scaling triggers when:
- free storage < 10%
- condition lasts > 5 minutes
- at least 6 hours since last modification
- you must set a **max storage** to avoid infinite growth

**Takeaway:**  
Storage auto-scaling is for unpredictable growth—guardrails still matter.

---

## 3) Read Replicas vs Multi-AZ (the exam split)

### RDS Read Replicas (scaling reads)
- goal: **read scalability**
- replication: **asynchronous** (eventual consistency)
- up to **15** replicas
- can be in same AZ, cross-AZ, or cross-region
- can be **promoted** to standalone DB
- app must point reads to replica endpoints (connection strings)

**Restrictions:**  
read replicas are for SELECT-heavy use; not for writes.

**Cost note:**  
cross-region replication incurs network costs; same-region replication is typically treated as managed.

---

### RDS Multi-AZ (disaster recovery / high availability)
- goal: **failover**, not scaling
- replication: **synchronous**
- primary in one AZ, standby in another AZ
- single DNS endpoint for the application
- automatic failover on instance/storage/AZ issues
- standby is not used for reads/writes

**Takeaway:**  
Multi-AZ protects uptime. It does not increase read capacity.

---

### Combining both
You can have:
- Multi-AZ for HA
- plus Read Replicas for read scaling (and even replicas configured with Multi-AZ)

---

## 4) Exam detail: Single-AZ → Multi-AZ conversion
Key point:
- enabling Multi-AZ can be done with **zero downtime** in typical exam framing

High-level flow:
- enable Multi-AZ
- RDS snapshots the primary
- restores snapshot to create standby
- establishes synchronous replication

---

## My takeaway

- **Read Replicas** = performance scaling (reads), async, eventually consistent.
- **Multi-AZ** = availability (failover), sync, standby not for reads.

Same service, different goal. Mixing them up is how designs fail.
