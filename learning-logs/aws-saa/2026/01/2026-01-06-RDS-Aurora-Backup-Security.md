# 2026-01-06 — RDS & Aurora Backups, Restore, Cloning, and Security

**Source:** Stephane Maarek — AWS SAA  
**Theme:** recovery mechanics + security controls for managed databases

> “Backups save data. Security saves careers.”

---

## Backups

### RDS backups
**Automated backups**
- Daily full backup during the backup window.
- Transaction logs every ~5 minutes → point-in-time recovery (as close as ~5 minutes).
- Retention: **1–35 days**.
- Can be disabled by setting retention to **0**.

**Manual snapshots**
- User-triggered.
- Retained indefinitely.
- Useful for “use occasionally” cost pattern: snapshot → delete DB → restore when needed.

---

### Aurora backups
**Automated backups**
- Retention: **1–35 days**.
- **Cannot be disabled**.
- Point-in-time recovery within retention.

**Manual snapshots**
- User-triggered.
- Retained indefinitely.

---

## Restore paths

### Restore from backups/snapshots
- Restoring creates a **new** DB/cluster (RDS or Aurora).

### Restore from S3
- **RDS MySQL**: on-prem backup → upload to S3 → restore to RDS MySQL.
- **Aurora MySQL**: requires **Percona XtraBackup** → backup → S3 → restore to Aurora cluster.

---

## Aurora database cloning
Purpose: fast copy of a cluster (e.g., staging from prod).

How it works:
- **copy-on-write**
- clone initially shares storage with source (fast, minimal cost)
- storage diverges only when changes occur

Why it matters:
- faster than snapshot + restore
- cost-efficient for test/staging without impacting production

---

## Exam anchors (backup/restore)
- RDS automated backups: **can be disabled**
- Aurora automated backups: **cannot be disabled**
- Manual snapshots: retained indefinitely (both)
- Aurora cloning: fast alternative to snapshot restore
- S3 restore: Aurora MySQL needs **Percona XtraBackup**

---

## Security

### Encryption
**At-rest**
- encrypts storage volumes (master + replicas) using **KMS**
- must be defined at launch time for new DBs
- encryption inheritance rule:
  - if the master is unencrypted, replicas can’t be encrypted
- to encrypt an existing unencrypted DB:
  1) snapshot
  2) restore snapshot as encrypted DB

**In-flight**
- TLS between client and DB
- clients use AWS TLS root certificates

---

### Authentication
- classic username/password
- IAM-based authentication (AWS-native)
  - good fit for EC2 with IAM roles
  - reduces static credential usage

---

### Network access
- controlled by **Security Groups** (ports, CIDRs, SG-to-SG rules)

---

### Managed service constraints
- no SSH access to standard RDS/Aurora
- exception: **RDS Custom** supports OS access

---

### Audit logs
- enable database audit logs to track activity
- logs are temporary by default
- send to **CloudWatch Logs** for retention/analysis

---

## My takeaway
Recovery and security are two sides of the same reliability story:
- backups + PITR define how you recover
- encryption + IAM + SGs define what you can safely operate
Aurora cloning is the “fast lane” for safe staging and testing.
