# 2026-04-15 — Sharing an Encrypted AMI Across AWS Accounts

# Core Mental Model

Encrypted AMI sharing requires BOTH:

1. 🖥️ AMI launch permission
2. 🔑 KMS key permission

👉 Sharing only the AMI is NOT enough.

Because encrypted EBS snapshots behind the AMI still require KMS access.

---

# 1. Why This Matters

Common enterprise scenarios:

- centralized golden AMIs
- security-hardened base images
- multi-account Organizations
- platform engineering
- shared Dev/Prod image pipelines

---

# 2. Underlying Architecture

Encrypted AMI contains:

```text
AMI → EBS Snapshot → Encrypted with KMS Key
```

---

# Important Insight

Launching EC2 from AMI requires:

✅ access to AMI
✅ access to encrypted snapshot
✅ access to KMS key

---

# 3. Step 1 — Share AMI Launch Permissions

In Account A:

Modify AMI launch permissions.

Add:

```text id="ami1"
Account B ID
```

---

# Purpose

Allows Account B to:

✅ see AMI
✅ launch instances from AMI

---

# Important Limitation

This alone is NOT sufficient for encrypted AMIs.

---

# 4. Step 2 — Share KMS Key

Must update KMS key policy in Account A.

Grant Account B permissions.

---

# Common Required Permissions

| Permission  | Purpose                    |
| ----------- | -------------------------- |
| DescribeKey | view key metadata          |
| Decrypt     | decrypt snapshot data      |
| ReEncrypt   | optional re-encryption     |
| CreateGrant | temporary delegated access |

---

# Why CreateGrant Matters

EC2/EBS internally use grants during launch operations.

Without it:

❌ launch failures occur

---

# 5. Step 3 — Configure IAM in Account B

Account B IAM user/role must allow:

* EC2 launch permissions
* KMS usage permissions

---

# Example Pattern

```text id="ami2"
EC2 Role → Can use shared KMS key → Can launch shared encrypted AMI
```

---

# 6. Step 4 — Launch EC2 Instance

Now Account B can:

✅ launch EC2 instance
✅ attach encrypted EBS volume
✅ boot successfully

---

# 7. Optional Best Practice — Re-Encrypt

After launch:

Re-encrypt EBS volumes using:

```text id="ami3"
Account B KMS Key
```

---

# Why?

Benefits:

✅ ownership separation
✅ independent key lifecycle
✅ easier governance
✅ reduced dependency on Account A

---

# 8. Enterprise Golden AMI Pattern

```text id="ami4"
Security Account
↓
Creates hardened AMI
↓
Encrypts with KMS
↓
Shares AMI + KMS
↓
Dev / Prod Accounts launch EC2
```

---

# 9. Common Failure Scenario

## AMI Visible but Launch Fails

Usually caused by:

❌ missing KMS permissions

NOT AMI permissions.

---

# Common Error Examples

* AccessDeniedException
* KMS Access Denied
* UnauthorizedOperation

---

# 10. DevOps/SRE Perspective

Encrypted AMI sharing is foundational for:

* multi-account AWS environments
* centralized image pipelines
* platform engineering
* enterprise security baselines

---

# 11. Security Insight

KMS acts as final security gatekeeper.

Even if AMI is shared:

❌ encrypted snapshot unusable without KMS access

---

# 12. High-Value Exam Keywords

| Keyword                            | Think                   |
| ---------------------------------- | ----------------------- |
| shared encrypted AMI not launching | KMS permissions missing |
| launch encrypted AMI cross-account | AMI + KMS sharing       |
| CreateGrant permission             | required for EC2 launch |
| centralized golden image           | shared encrypted AMI    |

---

# 13. Permission Layers

Cross-account encrypted AMI launch requires:

| Layer                            | Required |
| -------------------------------- | -------- |
| AMI Launch Permission            | ✅        |
| KMS Key Policy                   | ✅        |
| IAM Permission in Target Account | ✅        |

---

# 14. Real Workflow Summary

```text id="ami5"
Account A
↓
Encrypted AMI + KMS Key
↓
Share AMI
+
Share KMS permissions
↓
Account B launches EC2
↓
Optional re-encryption with local KMS
```

---

# 15. Comparison — Unencrypted vs Encrypted AMI Sharing

| Type            | Extra KMS Setup Required |
| --------------- | ------------------------ |
| Unencrypted AMI | ❌                        |
| Encrypted AMI   | ✅                        |

---

# 16. Governance Best Practice

Large organizations commonly:

✅ centralize AMI creation
✅ decentralize EC2 ownership
✅ re-encrypt with account-local KMS keys

---

# One-Line Final Memory Anchor

> Sharing an encrypted AMI requires both AMI launch permissions and KMS key access permissions.

---