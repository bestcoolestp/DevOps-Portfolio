# 2026-04-12 — Encryption (DevOps/SRE Lens)

# Core Mental Model

Encryption protects data in three major states:

1. ✈️ In Transit (In Flight)
2. 🗄️ At Rest
3. 💻 On the Client Side

---

# 1. Encryption in Flight (TLS/SSL)

## What It Means

Data is encrypted while traveling across networks.

---

# Workflow

Client → Encrypt with TLS → 🌐 Internet → Server decrypts

---

# Common Example

```text
HTTPS
```

Browser lock icon = TLS encryption active.

---

# Why It Matters

Without TLS:

❌ passwords visible  
❌ session hijacking possible  
❌ MITM attacks possible

---

# Main Protection

## 👤 Man-in-the-Middle (MITM) Defense

Only intended server can decrypt traffic.

---

# AWS Services Commonly Using TLS

| Service | TLS Support |
|---|---|
| API Gateway | HTTPS |
| ALB | TLS termination |
| CloudFront | HTTPS |
| S3 | HTTPS |
| RDS | SSL/TLS connections |

---

# Key Terms

| Term | Meaning |
|---|---|
| TLS | modern encryption protocol |
| SSL | older predecessor |
| HTTPS | HTTP over TLS |

---

# DevOps/SRE Insight

TLS is foundational for:

- zero trust networking
- secure APIs
- identity protection
- secure service-to-service communication

---

# 2. Server-Side Encryption at Rest

## What It Means

Data stored on servers is encrypted automatically.

---

# Workflow

Client uploads plaintext  
↓  
Server encrypts using data key  
↓  
Encrypted storage

---

# Retrieval

Encrypted object → Server decrypts → Client receives plaintext

---

# Example

## Amazon S3 SSE

Object stored encrypted automatically.

---

# Common AWS Services Supporting At-Rest Encryption

| Service | Encryption |
|---|---|
| S3 | SSE-S3 / SSE-KMS |
| EBS | volume encryption |
| RDS | storage encryption |
| DynamoDB | KMS encryption |
| EFS | encrypted file system |

---

# Benefits

✅ stolen disks useless  
✅ compliance support  
✅ transparent to applications

---

# Key Characteristic

Server CAN decrypt data.

Because server manages encryption keys.

---

# DevOps/SRE Perspective

At-rest encryption protects against:

- physical theft
- disk exposure
- infrastructure compromise

---

# 3. Client-Side Encryption

## What It Means

Data encrypted BEFORE reaching server.

---

# Workflow

Client encrypts locally  
↓  
Encrypted blob sent to server  
↓  
Server stores ciphertext only

---

# Retrieval

Encrypted object downloaded → Client decrypts locally

---

# Critical Property

## 🔒 Server Cannot Decrypt

Because server never has encryption key.

---

# Common Use Cases

- highly sensitive data
- zero-trust architectures
- healthcare
- finance
- end-to-end encryption

---

# Examples

| Example | Type |
|---|---|
| PGP/GPG | client-side |
| Signal messaging | client-side |
| custom encrypted S3 uploads | client-side |

---

# 4. Comparison Table

| Encryption Type | Protects | Who Can Decrypt |
|---|---|---|
| In Flight | network traffic | server |
| At Rest | stored data | server |
| Client-Side | even from server | client only |

---

# 5. Security Layering Concept

Modern architectures often combine ALL THREE:

```text id="enc2"
Client-Side Encryption
+
TLS in Transit
+
Server-Side Encryption at Rest
````

👉 layered security model.

---

# 6. AWS Security Architecture Examples

## S3 Secure Upload Pattern

Client → HTTPS/TLS → S3 SSE-KMS Encryption

---

## Zero-Trust Pattern

Client encrypts locally
↓ HTTPS
↓
Encrypted object stored in S3

AWS cannot read contents.

---

# 7. KMS Connection (Important)

Many AWS encryption services integrate with:

```text
AWS KMS
```

for centralized key management.

---

# 8. Compliance Perspective

Encryption helps satisfy:

- HIPAA
- PCI-DSS
- GDPR
- ISO 27001

---

# 9. Common Exam Keywords

| Keyword | Think |
|---|---|
| HTTPS | encryption in flight |
| SSE-S3 | server-side encryption |
| KMS | managed encryption keys |
| zero trust | client-side encryption |
| server cannot decrypt | client-side encryption |

---

# 10. DevOps/SRE Takeaways

Encryption strategy should cover:

✅ network traffic  
✅ storage  
✅ client trust boundaries

Golden principle:

👉 “Encrypt everywhere possible.”

---

# Real Enterprise Pattern

Browser/App  
↓ TLS  
API Gateway  
↓  
Lambda  
↓  
RDS encrypted with KMS

---

# One-Line Final Memory Anchor

> In-flight encryption protects data traveling, at-rest encryption protects stored data, and client-side encryption protects data even from the server.

---
