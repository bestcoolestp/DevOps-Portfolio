# 2026-01-04 — Amazon Aurora (MySQL/PostgreSQL Compatible)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** cloud-optimized relational DB with fast replication + failover

> “Aurora is what happens when the database is designed for the cloud first.”

---

## What I learned (quick wrap-up)

### What Aurora is
- AWS **proprietary** database engine (not open source)
- **MySQL-** and **PostgreSQL-compatible** (apps use the same drivers)

### Why it matters
- performance: ~**5×** faster than RDS MySQL, ~**3×** faster than RDS PostgreSQL
- very low replica lag (often sub-10ms)
- faster failover than typical RDS Multi-AZ

### Storage & durability
- starts at **10 GB**, auto-scales up to **256 TB**
- **6 copies across 3 AZs**
  - writes need **4/6**
  - reads need **3/6**
- self-healing replication + data striped across many volumes

### HA + scaling
- 1 writer (master) for writes
- up to **15 read replicas**
- cross-region replication supported
- failover typically **< 30 seconds** (a replica can become writer)

### Endpoints (exam favorite)
- **Writer endpoint** → always points to current writer (survives failover)
- **Reader endpoint** → load-balances connections across replicas  
  *(connection-level, not per SQL statement)*

### Extra feature to remember
- **Backtrack** → rewind to a previous point in time without restoring from backup

### Cost
- roughly ~**20%** more than RDS, but can be more cost-efficient at scale

---

## Small configuration notes I logged
- choose MySQL-compatible or PostgreSQL-compatible engine
- storage: **Standard** vs **I/O Optimized**
- can use **Serverless v2** (ACUs) depending on version/features
- clean-up order to avoid charges: **delete readers → writer → cluster**
