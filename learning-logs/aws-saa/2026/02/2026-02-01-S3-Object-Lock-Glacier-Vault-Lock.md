2026-02-01 — S3 Glacier Vault Lock & S3 Object Lock  
Perspective: DevOps / SRE Notes  
Theme: immutability and regulatory data retention

“Backups protect against failure. Immutability protects against humans.”

---

# 🔒 Immutable Storage in S3

AWS provides **WORM (Write Once Read Many)** mechanisms to guarantee data cannot be altered or deleted.

Two primary mechanisms:

- **Glacier Vault Lock**
- **S3 Object Lock**

Both enforce immutability but operate at different scopes.

---

# 🧊 S3 Glacier Vault Lock

## Core Idea

Vault Lock enforces **immutable storage policies** on a Glacier vault.

Once the Vault Lock policy is finalized:

```

Policy cannot be changed or deleted

```

Even by:

- administrators
- root users
- AWS support

---

## Operational Behavior

Objects stored in the vault:

- cannot be modified
- cannot be deleted
- remain protected permanently according to policy rules

This creates a **true WORM storage system**.

---

## Typical Use Cases

Vault Lock is designed for **strict regulatory compliance**.

Common examples:

- financial regulatory archives
- SEC / FINRA retention rules
- healthcare record preservation

Key property:

```

Irreversible compliance enforcement

```

---

# 📦 S3 Object Lock

## Core Idea

Object Lock applies WORM protection **at the object level** inside an S3 bucket.

Requirement:

```

Bucket versioning must be enabled

```

Object Lock protects **specific object versions**.

---

# Retention Modes

Two enforcement models exist.

---

## 1️⃣ Compliance Mode

Maximum protection.

Rules:

- object versions cannot be deleted
- retention cannot be shortened
- root users cannot bypass protection

Effect:

```

Absolute immutability

```

Used for:

- strict legal compliance
- regulatory retention policies

---

## 2️⃣ Governance Mode

More flexible.

Behavior:

- most users cannot modify locked objects
- authorized admins **can override restrictions**

This requires special IAM permissions.

Use cases:

- internal compliance
- operational governance policies

---

# ⏱ Retention Period

Both modes require a **retention duration**.

Example:

```

Retain object for 7 years

```

Rules:

- retention can be extended
- retention cannot be shortened

---

# ⚖️ Legal Hold

Legal Hold provides **indefinite protection**.

Key characteristics:

- independent of retention mode
- no expiration date
- protects object until explicitly removed

Typical scenario:

```

Legal investigation or audit

```

Permission required:

```

s3:PutObjectLegalHold

```

---

# 🧠 DevOps / SRE Mental Model

These features protect against **destructive events**.

Threat categories they address:

- accidental deletion
- malicious insider actions
- ransomware attacks
- regulatory non-compliance

Immutable storage is a key part of **modern backup strategies**.

---

# 🔑 Key Differences

| Feature | Glacier Vault Lock | S3 Object Lock |
|------|------|------|
| Scope | Entire vault | Individual objects |
| Model | WORM | WORM |
| Enforcement | Vault-level policy | Object-level retention |
| Retention Modes | N/A | Compliance / Governance |
| Legal Hold | ❌ | ✅ |
| Admin Override | ❌ | Only in Governance mode |

---

# 🎯 Operational Takeaways

Use **Glacier Vault Lock** when:

```

Absolute regulatory immutability is required

```

Use **S3 Object Lock** when:

```

Object-level retention and governance control are needed

```

Both are foundational for **compliance-grade storage architectures**.

---

# One-Line Summary

Glacier Vault Lock enforces irreversible WORM policies at the vault level, while S3 Object Lock protects individual object versions with retention rules and optional legal holds.
