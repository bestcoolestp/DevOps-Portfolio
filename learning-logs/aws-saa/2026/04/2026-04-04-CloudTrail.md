# 2026-04-04 — AWS CloudTrail (DevOps/SRE Lens)

## Core Mental Model

CloudTrail = **AWS account activity audit log**

👉 Answers:

- Who did it?
- What changed?
- When did it happen?
- From where?
- Using which API/service?

---

# 1. What CloudTrail Captures

CloudTrail records:

- Console actions
- AWS CLI commands
- SDK/API calls
- Service-to-service actions

Across:

- IAM
- EC2
- S3
- Lambda
- DynamoDB
- almost all AWS services

---

# 2. Why It Matters

Critical for:

- security auditing
- compliance
- forensic analysis
- troubleshooting
- incident response

---

# 3. Default Behavior

✅ Enabled by default

Retention:

- 90 days event history

For longer retention:

- S3
- Athena
- CloudWatch Logs

---

# 4. Trail Scope

| Scope | Meaning |
|-------|---------|
| Single-region trail | logs one region |
| Multi-region trail | logs all AWS regions |

👉 Multi-region is usually preferred for governance/security.

---

# 5. Event Categories

## A. Management Events (Critical)

Control-plane operations.

Examples:

- create subnet
- modify IAM policy
- terminate EC2
- delete DynamoDB table

---

### Read Events

Examples:

- DescribeInstances
- ListUsers

---

### Write Events

Examples:

- RunInstances
- DeleteBucket

---

## B. Data Events

High-volume object/resource activity.

Examples:

### S3

- GetObject
- PutObject
- DeleteObject

### Lambda

- InvokeFunction

---

⚠️ Not enabled by default.

Reason:

- potentially massive volume/cost

---

## C. CloudTrail Insights Events

ML/anomaly-based detection.

Detects unusual patterns:

- sudden API spikes
- abnormal IAM activity
- service-limit anomalies

---

# 6. Common Operational Workflow

Incident occurs  
↓  
CloudTrail investigation  
↓  
Identify:

- IAM user/role
- source IP
- API call
- timestamp

---

# 7. Example Scenario

EC2 terminated unexpectedly.

CloudTrail reveals:

- who terminated it
- CLI vs console
- exact API
- originating IP
- timestamp

👉 Essential for RCA (Root Cause Analysis).

---

# 8. CloudTrail + S3 + Athena Pattern

CloudTrail → S3 archive → Athena SQL queries

Used for:

- compliance audits
- historical investigations
- long-term analytics

---

# 9. CloudTrail + CloudWatch Pattern

CloudTrail → CloudWatch Logs → Metric Filters → Alarms

Example:

Detect:

- root account login
- IAM policy changes
- unauthorized API calls

---

# 10. CloudTrail + EventBridge Pattern

CloudTrail event  
↓  
EventBridge rule  
↓  
Lambda remediation / SNS alert

Example:

Unauthorized security group change  
↓  
Auto-remediate immediately

---

# 11. Security & Compliance Perspective

CloudTrail is foundational for:

- SOC operations
- governance
- PCI/HIPAA compliance
- forensic investigations

Without CloudTrail:

❌ limited accountability/auditability

---

# 12. DevOps/SRE Takeaways

CloudTrail provides:

- infrastructure accountability
- immutable operational history
- automation triggers
- incident reconstruction

Golden principle:

👉 “If it happened in AWS, CloudTrail probably recorded it.”

---

# 13. CloudTrail vs CloudWatch

| Service | Purpose |
|---------|---------|
| CloudWatch | metrics/logs/monitoring |
| CloudTrail | API activity auditing |

👉 Observability vs governance.

---

# 14. Common SRE Use Cases

## Security Monitoring

Detect:

- root logins
- IAM changes
- unusual API usage

---

## Operational Debugging

Find:

- who changed infrastructure
- deployment timelines
- accidental deletions

---

## Automated Remediation

CloudTrail event → EventBridge → Lambda rollback/remediation

---

# 15. High-Value Exam Keywords

| Keyword | Think |
|---------|------|
| audit | CloudTrail |
| who changed resource | CloudTrail |
| API history | CloudTrail |
| governance/compliance | CloudTrail |
| unusual API activity | CloudTrail Insights |

---

# One-Line Memory Anchor

> CloudTrail is the audit backbone of AWS operations and security.

---