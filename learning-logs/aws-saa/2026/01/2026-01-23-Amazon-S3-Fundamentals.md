2026-01-23 — Amazon S3 Fundamentals  
Perspective: DevOps / SRE Notes  
Theme: object storage as AWS foundation

“S3 is not just storage — it’s infrastructure glue.”

---

# 🌍 Why S3 Matters

S3 is a core primitive in AWS:

- virtually unlimited storage
- highly durable (11 9’s durability)
- backbone for many AWS services
- default landing zone for data

If you design on AWS, you design with S3.

---

# 🎯 Primary Use Cases

- Backups & disk snapshots
- Cross-region disaster recovery
- Archival (Glacier tiers)
- Static website hosting
- Media storage (images, video)
- Data lake for analytics
- Software distribution (binaries, updates)

Real-world pattern:
S3 = durable object store  
Glacier = cost-optimized cold archive

---

# 🪣 Buckets

Bucket = global namespace container for objects.

Key properties:

- Name must be globally unique (all AWS accounts).
- Bucket itself lives in a specific region.
- Naming rules:
  - 3–63 chars
  - lowercase only
  - no underscores
  - cannot look like IP address

👉 Region determines latency and compliance boundaries.

---

# 📦 Objects

Object = file stored in bucket.

Identified by:

```

bucket-name + key

```

Important:

- S3 has no real folders.
- “Folders” are prefixes in object keys.

---

## Object Constraints

- Max size: 5 TB
- > 5 GB → must use multipart upload
- Metadata: key-value pairs
- Tags: up to 10 (useful for lifecycle & IAM policies)
- Version ID (if versioning enabled)

---

# 🔐 Default Security Model

Modern S3 defaults are secure:

- ACLs disabled (recommended)
- Public access blocked
- Server-side encryption (SSE-S3)
- Bucket keys enabled (cost optimization)

👉 Public access must be intentional.

---

# 🔗 Access Patterns

## Public URL

- Requires bucket/object to be public.
- Otherwise → Access Denied.

## Pre-signed URL

- Temporary signed access.
- Includes credentials in URL.
- Common for:
  - secure file downloads
  - temporary uploads
  - controlled sharing

SRE note:
Pre-signed URLs are preferred over making buckets public.

---

# 📁 Folder Illusion

Creating a “folder”:

- actually creates an object prefix.

Deleting a folder:

- deletes all objects with that prefix.

There is no directory tree — only key structure.

---

# 🧠 Architectural Insight

S3 is:

- region-scoped
- globally addressable
- object-based (not block, not file in traditional sense)

It integrates with:

- CloudFront
- Lambda
- Athena
- Backup
- EMR
- Glacier lifecycle rules

In production systems:

- static assets → S3 + CloudFront
- logs → S3
- backups → S3
- artifacts → S3

---

# 🔑 Practical Takeaways

- Buckets: region-specific, globally unique names.
- Objects: key-based, prefix-driven.
- Default posture: private + encrypted.
- Pre-signed URLs = secure temporary access.
- Multipart upload required for large files.
- Lifecycle policies move data to cheaper tiers.

S3 is the foundation.  
Almost every mature AWS architecture touches it.
