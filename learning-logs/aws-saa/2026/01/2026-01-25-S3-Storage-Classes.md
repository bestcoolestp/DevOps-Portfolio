2026-01-25 — Amazon S3 Storage Classes  
Perspective: DevOps / SRE Notes  
Theme: cost optimization vs availability vs retrieval latency

“Durability is constant. Cost and latency are the trade-offs.”

---

# 🧱 Core Principles

## Durability

- 99.999999999% (11 nines)
- Same across all S3 storage classes.
- Protects against data loss.

Durability ≠ Availability.

---

## Availability

Varies by class.

Example:
- S3 Standard → 99.99%
- Lower-cost tiers → lower availability or fewer AZs.

Availability = how often you can access data.

---

# 📦 Storage Class Decision Matrix

## 🟢 S3 Standard

- Multi-AZ
- Low latency
- No retrieval fee

Use for:
- Frequently accessed data
- Active workloads
- Static assets behind CloudFront

---

## 🟡 S3 Standard-IA

- Multi-AZ
- Retrieval fee
- Lower storage cost

Use for:
- Backups
- DR copies
- Data accessed occasionally

---

## 🟠 S3 One Zone-IA

- Single AZ
- Retrieval fee
- Lower cost

Risk:
- Data lost if AZ fails.

Use only for:
- Re-creatable data
- Secondary backups

---

## 🔵 Glacier Instant Retrieval

- Millisecond access
- Minimum 90-day retention
- Retrieval fee

Use for:
- Rare access but instant recovery needed.

---

## 🟣 Glacier Flexible Retrieval

- Expedited: 1–5 min
- Standard: 3–5 hrs
- Bulk: 5–12 hrs (cheap/free)
- Minimum 90 days

Use for:
- Archival with occasional restore.

---

## ⚫ Glacier Deep Archive

- 12–48 hrs retrieval
- Minimum 180 days
- Lowest cost

Use for:
- Long-term compliance storage
- Rarely accessed historical data

---

## 🧠 S3 Intelligent-Tiering

Auto-moves objects based on usage.

Tiers include:
- Frequent
- Infrequent (30+ days)
- Archive Instant (90+ days)
- Optional Archive / Deep Archive tiers

Costs:
- Small monitoring fee
- No retrieval charges

Best for:
- Unpredictable access patterns

---

# 🔄 Lifecycle Management

Automate transitions:

- Standard → IA → Glacier
- Based on object age

Common pattern:
- 30 days → Standard-IA
- 90 days → Glacier
- 365 days → Deep Archive

Reduces storage cost without manual action.

---

# 🧠 Architecture Insight

Durability is constant across classes.  
What changes:

- Availability
- Redundancy (Multi-AZ vs Single AZ)
- Retrieval latency
- Cost
- Minimum retention period

---

# 🎯 Quick Decision Map

Frequent access → **S3 Standard**  
Infrequent but rapid → **Standard-IA**  
Single AZ backup → **One Zone-IA**  
Archive, instant restore → **Glacier Instant**  
Archive, flexible restore → **Glacier Flexible**  
Long-term cold storage → **Deep Archive**  
Unpredictable access → **Intelligent-Tiering**

---

Cost optimization in S3 is a lifecycle design problem, not a storage problem.