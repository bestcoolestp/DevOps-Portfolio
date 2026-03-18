2026-02-08 — AWS Transfer Family  
Perspective: DevOps / SRE Notes  
Theme: bridging legacy file transfer protocols with cloud-native storage

“Don’t rewrite the client. Change the endpoint.”

---

# 🔌 Core Idea


Legacy Protocols (FTP/SFTP/FTPS) → AWS Transfer → S3 / EFS


Transfer Family is a **protocol translation layer**.

- Clients speak: FTP / FTPS / SFTP  
- AWS stores: S3 (object) or EFS (file)

---

# 📡 Why It Exists

Most enterprise systems still depend on:

- FTP pipelines
- batch file drops
- vendor integrations (ERP, banking, logistics)

Rewriting them is expensive.

👉 Transfer Family avoids that rewrite.

---

# 🔐 Supported Protocols

| Protocol | Security |
|------|------|
| FTP | ❌ Unencrypted |
| FTPS | ✅ TLS |
| SFTP | ✅ SSH |

---

## SRE Reality


Use SFTP by default

- simpler
- firewall-friendly (single port)
- widely supported

---

# 🧠 Architecture


Client → Transfer Endpoint → IAM Role → S3 / EFS


Key components:

- endpoint (public or VPC)
- identity provider (auth)
- IAM role (data access)

---

# 🔑 Authentication Models

## 1. Service-managed users

- simple
- fast setup
- limited scalability

---

## 2. External identity

- Active Directory
- LDAP
- Okta / Cognito
- custom auth (Lambda)

---

## SRE Take


Enterprise → external identity
POC / small → service-managed


---

# 📂 Storage Targets

## S3 (most common)

- scalable
- cheap
- object-based

---

## EFS

- POSIX file system
- shared file access
- low-latency workloads

---

## Decision

| Need | Choose |
|------|------|
| scalable storage | S3 |
| shared file system semantics | EFS |

---

# 🧩 Typical Architecture Pattern


External Partner → SFTP → Transfer → S3 → (Lambda / ETL / Analytics)

👉 classic ingestion pipeline

---

# 💰 Cost Model

* endpoint hourly cost
* per GB transferred

---

## Optimization Insight

Idle endpoints still cost money


→ shut down non-production endpoints

---

# ⚠️ Operational Considerations

- IAM role must match user path access
- directory mapping matters (virtual folders)
- logging via CloudWatch
- IP allowlists for security

---

# 🔐 Security Model

- protocol-level encryption (SFTP / FTPS)
- IAM controls actual data access
- optional VPC endpoints for private access

---

## Mental Model


Auth ≠ Authorization


- Transfer handles login
- IAM controls S3/EFS access

---

# 🎯 High-Value Exam Signals

- “FTP to S3” → Transfer Family
- “legacy system file upload” → Transfer Family
- “secure file transfer without rewriting app” → Transfer Family
- SFTP preferred over FTP
- IAM role always involved

---

# 🧠 DevOps / SRE Insight

Transfer Family is not about storage.

It’s about **compatibility**.

- keeps legacy alive
- enables gradual migration
- decouples protocol from storage

---

# One-Line Summary


AWS Transfer Family enables secure file transfers (SFTP/FTPS/FTP) into S3 or EFS by acting as a managed protocol translation layer backed by IAM-controlled storage access.