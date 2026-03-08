2026-01-30 — S3 CORS & MFA Delete  
Perspective: DevOps / SRE Notes  
Theme: browser access control + destructive-operation protection

“Most S3 issues in production are not storage problems — they’re access-control misunderstandings.”

---

# 🌐 CORS (Cross-Origin Resource Sharing)

## Core Idea

Browsers enforce a **same-origin security model**.

Origin =

```

scheme + host + port

```

Example:

```

[https://www.example.com](https://www.example.com)

```

Requests between **different origins** require explicit permission.

---

## Same vs Cross Origin

Same origin → allowed automatically

```

[https://www.example.com/app1](https://www.example.com/app1)
[https://www.example.com/app2](https://www.example.com/app2)

```

Different origin → requires CORS

```

[https://www.example.com](https://www.example.com)
[https://otherexample.com](https://otherexample.com)

```

---

## How CORS Works

1️⃣ Browser sends request to another origin  
2️⃣ Browser may send **preflight request**

```

OPTIONS

```

3️⃣ Server replies with headers

```

Access-Control-Allow-Origin
Access-Control-Allow-Methods

```

4️⃣ Browser decides:

- allowed → request proceeds
- not allowed → browser blocks request

Important:

CORS is enforced **by the browser**, not by the server.

---

# ☁️ CORS in Amazon S3

Typical architecture:

```

Bucket A → website
Bucket B → images / assets

```

Browser loads page from Bucket A and requests assets from Bucket B.

Without CORS:

```

Cross-Origin Request Blocked

```

Fix: configure CORS on **Bucket B**.

Example rule:

```

[
{
"AllowedOrigins": ["[https://www.example.com](https://www.example.com)"],
"AllowedMethods": ["GET"],
"AllowedHeaders": ["*"]
}
]

```

Result:

Browser receives headers:

```

Access-Control-Allow-Origin
Access-Control-Allow-Methods

```

Request succeeds.

---

## Operational Debugging

When CORS fails:

Check **browser developer tools**:

Console tab:

```

Cross-Origin Request Blocked

```

Network tab:

missing CORS headers.

---

## Architecture Rule

CORS must be configured on:

```

The destination resource

```

Not the origin site.

Common exam trap.

---

# 🔐 S3 MFA Delete

## Core Idea

Adds **MFA protection to destructive operations** in versioned buckets.

Think of it as:

```

A lock on permanent data destruction

```

---

## Operations Requiring MFA

- Permanently deleting an object version
- Suspending versioning on a bucket

These actions can cause **irreversible data loss**.

---

## Operations NOT Requiring MFA

- Enable versioning
- Read objects
- List object versions
- Standard delete (creates delete marker)

---

## Requirements

MFA Delete only works when:

```

Versioning is enabled

```

And it can only be enabled by:

```

Root account

```

IAM users and roles cannot enable it.

Classic exam question.

---

## Enabling MFA Delete

Important limitation:

```

Cannot be enabled in the AWS Console

```

Must use **AWS CLI**.

Typical workflow:

1️⃣ Create bucket with versioning  
2️⃣ Configure root credentials in CLI  
3️⃣ Enable MFA Delete with bucket versioning command  
4️⃣ Provide MFA device ARN + current MFA code

---

## Operational Behavior

With MFA Delete enabled:

Permanent deletion requires:

```

CLI request + MFA code

```

Without MFA:

Request is rejected.

---

# 🧠 DevOps / SRE Mental Models

CORS solves:

```

browser security boundaries

```

MFA Delete solves:

```

human error and credential compromise

```

Both protect systems in different layers.

---

# 🎯 High-Value Takeaways

CORS

- Browser security feature
- Required for cross-origin requests
- Configured on **destination bucket**
- Debug via browser console

MFA Delete

- Protects permanent deletion
- Requires versioning
- Root account only
- CLI configuration only

---

# One-Line Summaries

CORS

```

Allows a browser app in one origin to access S3 resources in another origin via explicit CORS rules.

```

MFA Delete

```

Adds MFA verification before permanently deleting object versions or disabling versioning in S3.

```
```

---

