2026-01-24 — Amazon S3 Versioning & Replication  
Perspective: DevOps / SRE
Theme: durability, recovery, and cross-region data strategy

“Versioning protects from humans. Replication protects from regions.”

---

# 📦 S3 Versioning

## 🎯 What It Solves

Protects against:

- accidental overwrites  
- unintended deletes  
- bad deployments  

Enabled at **bucket level**.

---

## ⚙️ How It Works

- Each object gets a unique `VersionId`.
- Upload same key → new version created.
- Delete operation → adds **delete marker** (object not permanently removed).

Important:

- Objects uploaded before enabling versioning → `VersionId = null`
- Suspending versioning stops new versions, but existing versions remain.

👉 Safe to suspend; nothing is deleted.

---

## 🔁 Operational Benefits

- Restore previous object version instantly.
- Roll back bad deploy artifacts.
- Recover from accidental delete.
- Support auditability.

Production default: **Enable versioning on critical buckets.**

---

# 🌍 S3 Replication

Replication copies objects between buckets.

Two types:

- **CRR** → Cross-Region
- **SRR** → Same-Region

---

## ⚙️ Requirements

- Versioning enabled on source & destination
- Proper IAM permissions
- Replication configured at bucket level

Replication is:

- asynchronous
- background process
- near real-time (not immediate)

---

# 🎯 Use Cases

## Cross-Region (CRR)

- Compliance / data residency
- Disaster recovery
- Latency optimization
- Cross-account replication

## Same-Region (SRR)

- Log aggregation
- Prod → Test sync
- Data isolation within same region

---

# 🔍 Important Behavior

## Only New Objects Replicate

After enabling replication:

- Existing objects are NOT copied automatically.

To fix:

Use **S3 Batch Replication**.

---

## Delete Behavior

- Delete markers can be replicated (optional).
- Permanent deletes (specific VersionId) are NOT replicated.

This prevents cascading destructive deletes.

---

## No Replication Chaining

If:

```

Bucket A → Bucket B
Bucket B → Bucket C

```

Objects from A do NOT automatically replicate to C.

Replication is strictly source → destination.

---

# 🧠 Architecture Insight

Versioning = protection from logical errors.  
Replication = protection from regional failure.

Together they form:

- durability strategy
- compliance strategy
- DR foundation

Design pattern for critical workloads:

- Enable versioning
- Enable CRR
- Control delete marker replication
- Use batch replication when needed

S3 durability is high by default.  
Versioning + replication make it operationally resilient.