# 2026-04-05 — EventBridge + CloudTrail & AWS Config (DevOps/SRE Lens)

# Part 1 — EventBridge + CloudTrail Integration

## Core Mental Model

CloudTrail records AWS API activity.  
EventBridge reacts to those events in real time.

👉 Together they create:

- event-driven security
- operational automation
- real-time compliance alerting

---

# 1. Event Flow

AWS API Call  
↓  
CloudTrail logs event  
↓  
EventBridge matches rule  
↓  
SNS / Lambda / SSM / remediation

---

# 2. Why This Matters

Without automation:

❌ humans manually inspect logs

With EventBridge + CloudTrail:

✅ instant operational/security response

---

# 3. Example — DynamoDB Table Deletion

DeleteTable API  
↓  
CloudTrail event  
↓  
EventBridge rule  
↓  
SNS alert

Use case:

- accidental deletion detection
- security monitoring
- production safety

---

# 4. Example — IAM AssumeRole

AssumeRole API  
↓  
CloudTrail  
↓  
EventBridge  
↓  
alert/remediation

Use case:

- privilege escalation monitoring
- cross-account access auditing
- SOC visibility

---

# 5. Example — Security Group Changes

AuthorizeSecurityGroupIngress  
↓  
CloudTrail  
↓  
EventBridge  
↓  
SNS/Lambda

Use case:

- detect public SSH exposure
- auto-revert insecure changes

---

# 6. Common Security Automation Pattern

Unauthorized API activity  
↓  
CloudTrail  
↓  
EventBridge  
↓  
Lambda remediation  
↓  
SNS/Slack notification

---

# 7. DevOps/SRE Takeaways

This integration enables:

- real-time governance
- security automation
- infrastructure event processing
- compliance monitoring

Golden principle:

👉 Infrastructure changes become actionable events.

---

# 8. CloudTrail vs EventBridge

| Service | Role |
|---------|------|
| CloudTrail | records API activity |
| EventBridge | reacts to events |

👉 Audit + automation.

---

# One-Line Memory Anchor

> CloudTrail records the event; EventBridge operationalizes it.

---

# Part 2 — AWS Config

## Core Mental Model

AWS Config = **continuous configuration compliance monitoring**

👉 Answers:

- Is infrastructure compliant?
- What changed?
- When did it drift?
- Who modified it?

---

# 1. What AWS Config Tracks

Configuration history of:

- EC2
- Security Groups
- S3 buckets
- IAM
- ALBs
- RDS
- almost all AWS resources

---

# 2. Key Difference

| Service | Purpose |
|---------|---------|
| CloudTrail | API activity |
| AWS Config | resource configuration state |

---

# 3. Example Questions

- Is SSH open to the internet?
- Is S3 bucket public?
- Did ALB config change?
- Are EBS volumes encrypted?

---

# 4. Config Rules

## AWS Managed Rules

Prebuilt compliance checks.

Examples:

- restricted SSH
- encrypted EBS
- S3 public access blocked

---

## Custom Rules

Lambda-powered logic.

Examples:

- only t3.micro allowed
- enforce gp3 EBS volumes
- tag validation

---

# 5. Evaluation Modes

## Change-Based

Triggered when resources change.

---

## Scheduled

Periodic validation:

- every hour
- every 24 hours

---

# 6. Important Limitation

AWS Config:

❌ does NOT block actions

It:

✅ detects non-compliance

👉 Detection, not prevention.

---

# 7. Notification Flow

Non-compliant resource  
↓  
AWS Config  
↓  
EventBridge/SNS  
↓  
alert/remediation

---

# 8. Automated Remediation

AWS Config → SSM Automation / Lambda

Example:

- disable stale IAM keys
- remove public SSH access
- enforce encryption

---

# 9. Operational Pattern

Infrastructure drift  
↓  
Config rule violation  
↓  
EventBridge event  
↓  
SSM automation  
↓  
resource corrected automatically

---

# 10. Multi-Account Governance

AWS Config Aggregators:

- centralize compliance
- multi-region visibility
- org-wide governance

Critical for:

- enterprise governance
- security teams
- platform engineering

---

# 11. Historical Tracking

AWS Config stores:

- configuration timeline
- compliance history
- resource drift history

Combined with CloudTrail:

👉 Full forensic visibility.

---

# 12. DevOps/SRE Takeaways

AWS Config is foundational for:

- drift detection
- governance
- compliance automation
- security posture management

Golden principle:

👉 “Desired state vs actual state.”

---

# 13. CloudTrail + Config Together

| Service | Focus |
|---------|------|
| CloudTrail | who changed it |
| AWS Config | what changed |

👉 Together = complete auditability.

---

# 14. Example SRE Workflow

Security Group modified  
↓  
CloudTrail identifies actor  
↓  
Config flags non-compliance  
↓  
EventBridge triggers remediation  
↓  
SNS notifies security team

---

# 15. High-Value Exam Keywords

| Keyword | Think |
|---------|------|
| compliance | AWS Config |
| drift detection | AWS Config |
| unrestricted SSH | AWS Config |
| audit history | CloudTrail |
| remediation automation | Config + SSM |

---

# Combined Insight

CloudTrail + EventBridge + AWS Config create:

- governance
- observability
- compliance
- self-healing operations

👉 Core cloud security & SRE automation pattern.

---

# One-Line Final Memory Anchor

> CloudTrail records actions, Config evaluates state, EventBridge automates response.

---