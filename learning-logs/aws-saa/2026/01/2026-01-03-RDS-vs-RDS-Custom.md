# 2026-01-03 — RDS vs RDS Custom

**Source:** Stephane Maarek — AWS SAA  
**Theme:** managed database vs controlled customization

> “The more control you take, the more responsibility you own.”

---

## What I learned (wrap-up)

## Standard RDS
Fully managed database service.

- No OS access.
- No deep database customization.
- AWS handles:
  - provisioning
  - patching
  - backups
  - scaling
  - maintenance

**User responsibility:** minimal.

Best for:
- most production workloads
- teams that want automation over control

---

## RDS Custom
Available only for:
- **Oracle**
- **Microsoft SQL Server**

Provides:
- full OS access
- database-level customization
- ability to SSH or use SSM into underlying EC2

Allows:
- installing patches
- enabling native DB features
- modifying internal settings

**User responsibility:** high.

---

## Important best practices
Before customization:
- disable automation mode
- take a snapshot

Reason:
AWS automation can override changes, and mistakes can be irreversible.

---

## Quick Comparison

| Feature | Standard RDS | RDS Custom |
|------------------|--------------|---------------------|
| OS Access        | ❌No        | ✅ Yes              |
| DB Customization | ❌Limited   | ✅ Full             |
| Automation       | ✅Full AWS  | ⚠️ Limited          |
| Engines          | Many         | Oracle, SQL Server  |
| Responsibility   | Low          | High                |

---

## My takeaway

Standard RDS = convenience and automation.  
RDS Custom = control and responsibility.

Choose based on compliance and customization needs, not preference.
