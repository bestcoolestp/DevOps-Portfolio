2026-01-29 — Amazon S3 Encryption Models  
Perspective: DevOps / SRE Notes  
Theme: protecting data at rest and in transit in object storage

“Encryption in S3 is simple until compliance arrives.”

---

# 🔐 S3 Encryption Options (4 Models)

S3 supports four encryption approaches.  
The difference is **who controls the key** and **where encryption happens**.

---

# 1️⃣ SSE-S3 (S3-Managed Keys)

Server-side encryption handled entirely by S3.

Properties:

- Algorithm: AES-256
- Keys managed by AWS
- No key management overhead

Header example:

```

x-amz-server-side-encryption: AES256

```

Default behavior:

- Enabled automatically on all new buckets.

Best for:

- general workloads
- simple encryption requirements

---

# 2️⃣ SSE-KMS (KMS-Managed Keys)

Encryption still occurs server-side, but keys are managed in **AWS KMS**.

Benefits:

- auditability (CloudTrail logs key usage)
- granular IAM control
- key rotation support

Header example:

```

x-amz-server-side-encryption: aws:kms

```

Access requirements:

To read an object you need:

- S3 permission
- KMS key permission

---

## ⚠️ Operational Consideration

SSE-KMS uses KMS APIs:

- `GenerateDataKey`
- `Decrypt`

These calls are subject to **KMS rate limits**.

Typical limits:

```

~5,000 – 30,000 requests/sec per region

```

High-throughput S3 workloads may hit throttling.

This is a classic exam trap.

---

# 3️⃣ SSE-C (Customer-Provided Keys)

Encryption still happens server-side, but **you provide the key**.

Properties:

- AWS does NOT store the key
- Key must be sent with every request
- HTTPS required

Operational reality:

- fragile
- difficult to operate at scale

Rarely used in production systems.

---

# 4️⃣ Client-Side Encryption

Encryption occurs **before data reaches S3**.

Flow:

```

Client encrypts → upload encrypted object → S3 stores ciphertext

```

Key ownership:

- entirely managed by the client

Implication:

- AWS never sees plaintext
- AWS never sees the keys

Use cases:

- highly regulated environments
- external key management systems

---

# 🚚 Encryption in Transit

Data must also be encrypted **during transfer**.

Protocols:

- HTTP → unencrypted
- HTTPS (TLS) → encrypted

Best practice:

Always require HTTPS.

Mandatory when using **SSE-C**, since keys travel with requests.

---

# 🔒 Enforcing HTTPS

A bucket policy can deny insecure requests.

Example condition:

```

"aws:SecureTransport": "false"

```

Policy effect:

- HTTP requests → denied
- HTTPS requests → allowed

---

# 🛡 Default Encryption vs Bucket Policies

## Default Encryption

Automatically encrypts objects at upload.

Example:

- default = SSE-S3
- can change to SSE-KMS

Goal:

Convenience and baseline security.

---

## Bucket Policies

Used for **strict enforcement**.

Example rules:

- reject uploads without SSE-KMS
- reject uploads without encryption header
- enforce HTTPS-only access

Important behavior:

Bucket policies are evaluated **before object storage occurs**.

---

# 🧠 Architecture Insight

Encryption design balances:

- operational simplicity
- compliance requirements
- performance limits

Typical production choices:

| Scenario             | Recommended Encryption |
|----------------------|------------------------|
| General workloads    | SSE-S3                 |
| Compliance / audit   | SSE-KMS                |
| External key control | Client-side            |
| Rare specialized use | SSE-C                  |

---

# 🎯 High-Value Exam Signals

- Default encryption → **SSE-S3**
- Auditable encryption → **SSE-KMS**
- KMS has **API throttling limits**
- SSE-C requires **HTTPS**
- Client-side encryption → AWS never sees keys
- Bucket policies can enforce **encryption and HTTPS**
```

---
