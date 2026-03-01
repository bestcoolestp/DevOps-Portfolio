2026-01-24 — Amazon S3 Security Model  
Perspective: DevOps / SRE Notes  
Theme: access control, encryption, and blast-radius reduction

“S3 breaches are almost never technical failures — they’re policy failures.”

---

# 🔐 Two Authorization Models

S3 access is controlled by **identity-based** and **resource-based** policies.

Access is allowed only if:

- At least one policy allows it  
- AND there is no explicit deny  

Deny always wins.

---

# 1️⃣ Identity-Based (IAM Policies)

Attached to:

- IAM users  
- IAM groups  
- IAM roles  

Defines what actions a principal can perform:

- `s3:GetObject`
- `s3:PutObject`
- `s3:ListBucket`
- etc.

Used for:

- Internal access control  
- EC2 instance roles  
- Application-level permissions  

👉 Standard least-privilege enforcement layer.

---

# 2️⃣ Resource-Based (Bucket Policies)

JSON policies attached directly to buckets.

Can grant access to:

- Specific IAM users
- Cross-account principals
- Entire internet (`"Principal": "*"`)  

Common use cases:

- Public read access
- Enforcing encryption
- Cross-account sharing
- Restricting source IPs or VPC endpoints

---

## Policy Structure

Core elements:

- `Effect`: Allow / Deny  
- `Principal`: Who  
- `Action`: What API  
- `Resource`: Which bucket/object  

Example (public read):

```json
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::example-bucket/*"
}
````

This makes all objects publicly readable.

---

# 3️⃣ ACLs (Legacy)

* Object ACLs
* Bucket ACLs

Modern stance:

* Disabled by default
* Avoid unless legacy system requires it

👉 Prefer IAM + bucket policies.

---

# 🛡 Block Public Access (Critical Safeguard)

Safety override layer.

Can be enabled:

* Per bucket
* Per account (recommended)

If enabled:

* Public bucket policies are ignored
* Prevents accidental exposure

Best practice:

Keep enabled unless explicitly building a public website.

---

# 🔒 Encryption Options

S3 supports server-side encryption:

* SSE-S3 → AWS-managed keys (default)
* SSE-KMS → KMS-managed keys (auditable, fine-grained control)
* SSE-C → customer-provided keys

Production default pattern:

* SSE-S3 baseline
* SSE-KMS for regulated workloads

---

# 🧠 Common Security Patterns

## EC2 → S3 Access

* Use IAM Role attached to instance
* Never embed access keys

---

## Cross-Account Access

* Bucket policy grants external account role access
* Combine with least privilege IAM in target account

---

## Public Website

* Bucket policy allows public read
* Block Public Access must be disabled intentionally

---

# 🔑 Operational Takeaways

* IAM controls *who can call S3 APIs*.
* Bucket policies control *who can access this bucket*.
* Explicit deny overrides everything.
* Block Public Access prevents most accidental leaks.
* Avoid ACLs in modern designs.
* Use IAM roles, not static credentials.

S3 security failures are almost always misconfigured policies — not platform flaws.

```
