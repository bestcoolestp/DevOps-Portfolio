# 2026-04-06 — AWS Organizations & SCPs (DevOps/SRE Lens)

## Core Mental Model

AWS Organizations = **multi-account governance layer for AWS**

👉 Centralized control for:

- billing
- security
- compliance
- account isolation
- governance

---

# 1. Why Multiple AWS Accounts Matter

Using multiple accounts provides stronger isolation than:

- multiple VPCs
- IAM separation alone

---

# Common Isolation Patterns

| OU | Purpose |
|----|---------|
| Dev | experimentation |
| Test | staging |
| Prod | production |
| Security | centralized security tooling |
| Shared Services | CI/CD, DNS, logging |

---

# 2. Organization Structure

Management Account  
↓  
Root OU  
↓  
Sub-OUs  
↓  
Member Accounts

---

# 3. Key Benefits

## Consolidated Billing

Single payer account.

Benefits:

- centralized billing
- simplified finance operations

---

## Aggregated Discounts

Usage shared across accounts:

- Reserved Instances
- Savings Plans

👉 Higher overall utilization/cost savings.

---

## Centralized Governance

Apply policies/org standards globally.

---

# 4. Organizational Units (OUs)

OUs group accounts logically.

Examples:

- by environment
- by department
- by compliance boundary

---

# Example Structure

Root  
├── Security  
├── Shared Services  
├── Dev  
├── Staging  
└── Production

---

# 5. Service Control Policies (SCPs)

## Core Mental Model

SCPs = **guardrails for AWS accounts**

They define:

👉 maximum allowed permissions

---

# Important Distinction

| Policy Type | Purpose |
|-------------|---------|
| IAM Policy | grants permissions |
| SCP | restricts permissions |

---

# 6. SCP Evaluation Logic

Permissions require:

✅ IAM Allow  
AND  
✅ SCP Allow

If SCP denies:

❌ action blocked

---

# 7. SCP Characteristics

- applied at:
  - root
  - OU
  - account
- inherited downward
- explicit deny overrides everything

---

# 8. Critical Exam Point

Management account:

✅ NOT affected by SCPs

Always retains full admin authority.

---

# 9. Common SCP Use Cases

## Region Restriction

Deny all regions except:

- ap-northeast-2
- us-east-1

---

## Prevent Expensive Services

Block:

- Redshift
- SageMaker
- GPU instances

---

## Security Hardening

Prevent:

- disabling CloudTrail
- deleting Config rules
- removing GuardDuty

---

## Production Protection

Prevent:

- root usage
- EC2 termination
- public S3 buckets

---

# 10. Operational Security Pattern

AWS Organizations  
↓  
SCP guardrails  
↓  
Accounts remain compliant automatically

👉 Preventive governance.

---

# 11. Organizations + Centralized Logging

Typical enterprise setup:

All accounts  
↓  
Central CloudTrail/S3 bucket  
↓  
Security account

Benefits:

- centralized audit
- compliance visibility
- forensic analysis

---

# 12. Cross-Account Administration

Pattern:

Admin account  
↓ AssumeRole  
↓  
Member accounts

Benefits:

- centralized operations
- reduced credential sprawl

---

# 13. DevOps/SRE Takeaways

AWS Organizations enables:

- environment isolation
- blast-radius reduction
- governance at scale
- centralized operations

Golden principle:

👉 “Separate workloads by account, not just by VPC.”

---

# 14. SCP Strategy (Important)

Best practice:

- use SCPs as guardrails
- keep IAM flexible inside boundaries

Avoid:

❌ overly restrictive SCPs causing operational deadlocks

---

# 15. Multi-Account SRE Pattern

Organizations  
↓  
SCPs enforce standards  
↓  
CloudTrail centralized  
↓  
Config Aggregators monitor compliance  
↓  
Security tooling in dedicated account

👉 Enterprise-scale AWS governance model.

---

# 16. Organizations vs IAM

| Feature | IAM | AWS Organizations |
|---------|-----|------------------|
| Scope | single account | multiple accounts |
| Purpose | permissions | governance |
| Isolation | limited | strong |
| Billing | none | consolidated |

---

# 17. High-Value Exam Keywords

| Keyword | Think |
|---------|------|
| multi-account governance | Organizations |
| consolidated billing | Organizations |
| restrict services | SCP |
| OU hierarchy | Organizations |
| prevent API actions | SCP |

---

# Combined Insight

AWS Organizations + SCPs create:

- centralized governance
- preventive security
- scalable cloud operations
- enterprise account management

👉 Foundation of large-scale AWS platform engineering.

---

# One-Line Memory Anchor

> AWS Organizations manage accounts; SCPs define the guardrails around them.

---