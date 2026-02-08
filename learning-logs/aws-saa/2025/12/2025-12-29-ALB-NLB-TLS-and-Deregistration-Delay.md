# 2025-12-29 — SSL/TLS on ALB & NLB + Connection Draining / Deregistration Delay

**Source:** Stephane Maarek — AWS SAA  
**Theme:** secure traffic termination and graceful instance removal

> “Encryption protects users. Graceful shutdown protects trust.”

---

## What I learned (wrap-up)

## Enabling SSL/TLS on Load Balancers

### Application Load Balancer (ALB)
To enable HTTPS:
- add an **HTTPS listener** (port 443)
- forward traffic to a target group
- choose an **SSL security policy** (controls TLS versions & ciphers)

Certificate sources:
- **ACM** (recommended)
- IAM (supported, not preferred)
- manual import (private key + cert + chain)

**Insight:**  
ALB handles SSL termination cleanly at Layer 7, keeping backends simpler.

---

### Network Load Balancer (NLB)
To enable TLS:
- add a **TLS listener**
- forward traffic to a target group
- choose a TLS security policy

Certificate options:
- ACM
- IAM
- manual import

Advanced note:
- **ALPN** is supported for TLS (advanced use case)

**Insight:**  
NLB handles encrypted traffic at high scale without HTTP awareness.

---

## Connection Draining / Deregistration Delay

### What it solves
Allows **in-flight requests to finish** before an instance is removed.

Behavior:
- stop sending new requests to the instance
- allow existing connections to complete
- close remaining connections after the delay

---

### Naming by load balancer
- **Classic Load Balancer** → *Connection Draining*
- **ALB / NLB** → *Deregistration Delay*

---

### Configuration
- range: **1 – 3,600 seconds**
- default: **300 seconds**
- disable: set to **0**

---

### Practical guidance
- short requests → short delay (e.g., 30s)
- long requests / streaming → longer delay
- trade-off: faster replacement vs smoother user experience

**Insight:**  
Graceful shutdown is part of reliability, not an optional tweak.

---

## My takeaway

TLS secures the connection.  
Deregistration delay secures the user experience.

Both are small settings with **outsized impact**.
