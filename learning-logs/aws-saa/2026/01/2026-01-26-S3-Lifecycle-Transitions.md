2026-01-26 — Amazon S3 Lifecycle & Storage Transitions  
Perspective: DevOps / SRE Notes  
Theme: automated cost optimization for object storage

“Cold data should automatically become cheaper.”

---

# 🧠 Core Idea

S3 Lifecycle Rules automate:

- **storage class transitions** (cost optimization)
- **object expiration** (cleanup)

This removes the need for manual storage management.

Lifecycle rules operate on:

- object **age**
- object **prefix**
- object **tags**
- object **version state**

---

# 🔄 Storage Class Transitions

Objects can move across tiers automatically.

Typical flow:

```

Standard → Standard-IA → Glacier → Deep Archive

```

Purpose:

- Reduce cost as data becomes colder.

Example timeline:

| Age     | Storage Class        |
|---------|----------------------|
| Day 0   | S3 Standard          |
| Day 30  | Standard-IA          |
| Day 90  | Glacier              |
| Day 365 | Glacier Deep Archive |

---

# ⚙️ Lifecycle Rule Components

Rules can target:

- **Entire bucket**
- **Prefix**
  - `images/`
  - `logs/`
- **Tags**
  - `department=finance`
  - `project=analytics`

---

# 📦 Lifecycle Actions

## 1️⃣ Transition Current Versions

Move the latest version of an object to cheaper tiers.

Example:

- 30 days → Standard-IA
- 60 days → Intelligent-Tiering
- 90 days → Glacier Instant Retrieval
- 180 days → Glacier Flexible Retrieval
- 365 days → Glacier Deep Archive

---

## 2️⃣ Transition Noncurrent Versions

Applies when **versioning is enabled**.

Noncurrent = previous versions.

Example:

- 90 days → Glacier Flexible Retrieval

Useful for reducing cost of historical versions.

---

## 3️⃣ Expire Current Objects

Automatically deletes objects.

Example:

- delete after **700 days**

Common for:

- access logs
- temporary assets
- analytics exports

---

## 4️⃣ Delete Noncurrent Versions

Prevents infinite version growth.

Example:

- delete old versions after **700 days**

---

## 5️⃣ Cleanup Operations

Automatically removes:

- expired delete markers
- incomplete multipart uploads

Example:

- delete incomplete uploads older than **14 days**

---

# 📊 S3 Storage Class Analytics

Helps determine **optimal lifecycle transitions**.

Capabilities:

- analyze object access patterns
- recommend Standard → Standard-IA transitions
- produce **daily CSV reports**

Important limitation:

Works only for:

- Standard
- Standard-IA

Report generation:

- appears after **24–48 hours**

---

# 🧩 Example Architecture Scenario

## Image Processing Application

EC2 app generates thumbnails.

### Source Images

- stored in **Standard**
- transition → Glacier after **60 days**

### Thumbnails

- stored in **One-Zone IA**
- deleted after **60 days**

Objects separated by prefix:

```

images/source/
images/thumbnails/

```

Lifecycle rules apply per prefix.

---

# 🧠 Versioning Recovery Pattern

Requirement:

- instant recovery within **30 days**
- slower recovery up to **1 year**

Architecture:

1️⃣ Enable **S3 Versioning**

2️⃣ Lifecycle:

```

Noncurrent → Standard-IA
→ Glacier Deep Archive

```

Delete markers allow quick restore.

---

# 🎯 Operational Insight

Lifecycle policies are **the primary mechanism for S3 cost control**.

They automate:

- tiering
- retention
- cleanup

Design pattern for production buckets:

- Enable versioning
- Define lifecycle transitions
- Define expiration policy
- Clean incomplete uploads

---

Storage optimization in S3 is not manual — it is policy-driven automation.
```

