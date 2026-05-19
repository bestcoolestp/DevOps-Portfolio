# 2026-04-11 — AWS Control Tower (DevOps/SRE Lens)

# Core Mental Model

AWS Control Tower = **automated multi-account AWS governance platform**

👉 Built on top of:

- AWS Organizations
- SCPs
- AWS Config
- IAM Identity Center
- CloudTrail

---

# 1. Why Control Tower Exists

Managing many AWS accounts manually causes:

❌ inconsistent security  
❌ policy drift  
❌ compliance gaps  
❌ operational overhead

Control Tower solves:

✅ standardized environments  
✅ centralized governance  
✅ automated account provisioning  
✅ continuous compliance monitoring

---

# 2. What Control Tower Automates

## Multi-Account Setup

Automatically creates and manages:

- organizational units (OUs)
- accounts
- guardrails
- logging
- auditing

---

# 3. Landing Zone (Critical Concept)

Landing Zone = pre-configured secure AWS environment.

Includes:

- centralized logging
- account structure
- identity integration
- governance controls
- security baselines

---

# 4. Built on AWS Organizations

Control Tower uses:

```text
AWS Organizations
````

behind the scenes.

Accounts are automatically enrolled into governance.

---

# 5. Key Governance Feature — Guardrails

Guardrails = governance controls.

Two major types:

* Preventive
* Detective

---

# Part 1 — Preventive Guardrails

## What They Do

Block actions BEFORE they happen.

---

# Technology Used

```text
Service Control Policies (SCPs)
```

---

# Example

Only allow regions:

```text
us-east-1
eu-west-2
```

All other regions denied.

---

# Characteristics

✅ proactive
✅ enforcement-based
✅ organization-wide restrictions

---

# DevOps/SRE Perspective

Preventive guardrails reduce:

* accidental misconfiguration
* shadow infrastructure
* compliance violations

---

# Part 2 — Detective Guardrails

## What They Do

Detect violations AFTER they occur.

---

# Technology Used

```text
AWS Config
```

---

# Example

Detect:

❌ untagged EC2 instances
❌ public S3 buckets
❌ unrestricted SSH access

---

# Common Automation Pattern

```text
AWS Config
↓
EventBridge
↓
SNS / Lambda / SSM Automation
```

---

# Example Remediation Flow

Untagged EC2 instance
↓
AWS Config detects violation
↓
SNS alert OR Lambda remediation

---

# 6. Compliance Dashboard

Control Tower provides centralized visibility into:

* compliance status
* violations
* account health
* governance posture

---

# Benefits

✅ centralized monitoring
✅ organization-wide visibility
✅ easier audits

---

# 7. Account Factory

Control Tower can automatically provision accounts with:

* predefined baselines
* networking
* IAM setup
* security controls

---

# Example

Developer requests new AWS account.

Control Tower automatically creates:

* account
* OU placement
* SCP attachment
* logging setup
* security baseline

---

# 8. Real Enterprise Pattern

```text
AWS Organizations
↓
Control Tower
↓
Landing Zone
↓
Guardrails
↓
Automated Governance
```

---

# 9. DevOps/SRE Takeaways

Control Tower is critical for:

* enterprise AWS governance
* platform engineering
* security standardization
* regulated environments
* multi-account operations

---

# 10. Control Tower vs Organizations

| Service           | Purpose                       |
| ----------------- | ----------------------------- |
| AWS Organizations | account grouping & SCPs       |
| Control Tower     | automated governance platform |

👉 Control Tower extends Organizations with automation and governance.

---

# 11. Common Enterprise Use Cases

## Secure Multi-Account Setup

* Dev
* Test
* Prod
* Security
* Shared Services

---

## Compliance Automation

* tagging enforcement
* region restrictions
* encryption enforcement

---

## Centralized Security

* centralized CloudTrail
* centralized Config
* centralized audit logging

---

# 12. Exam-Oriented Keywords

| Keyword                  | Think         |
| ------------------------ | ------------- |
| landing zone             | Control Tower |
| automated governance     | Control Tower |
| multi-account compliance | Control Tower |
| preventive guardrail     | SCP           |
| detective guardrail      | AWS Config    |

---

# 13. Real-World Governance Flow

Developer
↓
Requests AWS account
↓
Control Tower provisions account
↓
Guardrails applied automatically
↓
Compliance continuously monitored

---

# 14. Important Distinction

| Type                 | Timing           |
| -------------------- | ---------------- |
| Preventive Guardrail | before violation |
| Detective Guardrail  | after violation  |

---

# One-Line Final Memory Anchor

> AWS Control Tower automates secure multi-account governance using Organizations, SCPs, and AWS Config.

---