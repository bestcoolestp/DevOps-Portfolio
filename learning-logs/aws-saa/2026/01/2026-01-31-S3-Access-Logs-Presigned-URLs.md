2026-01-31 — S3 Access Logs & Pre-Signed URLs  
Perspective: DevOps / SRE Notes  
Theme: observability of object access + controlled external sharing

“Good storage systems record every access and expose data only briefly.”

---

# 📊 S3 Access Logs

## Purpose

S3 Access Logs provide **request-level visibility** into bucket activity.

Logged events include:

- authorized requests
- denied requests
- GET / PUT / DELETE operations
- requester identity
- timestamps
- HTTP status codes

Used for:

- security auditing
- compliance
- traffic analysis
- incident investigations

---

## Architecture

Access logs are written **to another S3 bucket**.

Flow:

```

Client → Source Bucket → Access Log → Logging Bucket

```

Important constraint:

- destination logging bucket **must be in the same region**

---

## Critical Operational Rule

Never log into the **same bucket**.

```

Bucket → logs itself → new log event → another log

```

Result:

- infinite logging loop
- runaway storage growth
- unexpected costs

Best practice:

```

Source Bucket → Dedicated Logging Bucket

```

---

## Log Delivery

Logs are **not real-time**.

Delivery delay:

```

minutes → hours

```

Logs appear as text objects inside the logging bucket.

Typical fields:

- requester
- operation
- object key
- response status
- request time

---

## Analysis Strategy

Raw logs are difficult to read directly.

Typical processing stack:

```

S3 Access Logs → Athena / EMR / Spark

```

Common patterns:

- Athena queries for access patterns
- security analysis for denied requests
- traffic analytics

---

## Operational Best Practices

- use a **dedicated log bucket**
- restrict access with IAM
- apply lifecycle rules
- partition logs for Athena queries

Example lifecycle pattern:

```

Logs → Glacier after 30 days
Delete after 365 days

```

---

# 🔗 S3 Pre-Signed URLs

## Core Idea

A **temporary signed URL** granting access to a specific object.

The object remains **private**, but access is allowed temporarily.

Typical structure:

```

URL + signature + expiration

```

---

## Expiration Limits

Maximum durations:

| Method | Max Expiration |
|------|------|
| S3 Console | 12 hours |
| CLI / SDK | 7 days |

After expiration:

```

Access automatically denied

```

---

## Permission Model

Critical concept:

The URL inherits the **permissions of the creator**.

Examples:

Creator permission | Result
---|---
`s3:GetObject` | URL allows download
`s3:PutObject` | URL allows upload

The URL **does not bypass IAM**.

---

## Access Types

### GET Pre-Signed URL

Temporary **download** link.

Example use cases:

- share private files
- authenticated user downloads
- premium content delivery

---

### PUT Pre-Signed URL

Temporary **upload endpoint**.

Allows external users to upload **directly to S3**.

Typical architecture:

```

Client → App backend → Generate URL → Client uploads directly to S3

```

Benefits:

- reduces backend load
- secure controlled upload

---

## Security Model

Access scope is tightly limited:

- one object
- one operation
- one expiration time

Important limitation:

```

Anyone with the URL can use it until it expires

```

To revoke access early:

- remove object
- change IAM policy
- rotate credentials

---

# 🧠 DevOps / SRE Mental Model

Two different operational problems:

Access Logs solve:

```

Who accessed my data?

```

Pre-Signed URLs solve:

```

How do I safely share private data?

```

One provides **observability**.

The other provides **controlled exposure**.

---

# 🎯 High-Value Exam Signals

S3 Access Logs

- track all bucket requests
- delivered to **separate bucket**
- delivery delay expected
- best analyzed with Athena

Pre-Signed URLs

- temporary access to private objects
- inherits creator permissions
- expiration enforced
- supports GET and PUT operations

---

# One-Line Summaries

Access Logs

```

S3 Access Logs record all bucket requests and store them in a separate S3 bucket for auditing and analysis.

```

Pre-Signed URLs

```

Pre-signed URLs grant temporary access to private S3 objects using the permissions of the URL creator.

```
