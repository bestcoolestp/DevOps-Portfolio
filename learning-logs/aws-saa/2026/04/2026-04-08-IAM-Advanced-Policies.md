# 2026-04-08 — IAM Advanced Policies & Resource-Based Access (DevOps/SRE Lens)

# Part 1 — IAM Advanced Policies

## Core Mental Model

IAM Conditions = **context-aware authorization**

👉 Not just:

“Can user access resource?”

But:

- from where?
- under what conditions?
- with which tags?
- in which region?
- with MFA enabled?

---

# 1. Why IAM Conditions Matter

IAM conditions enable:

- zero-trust security
- least privilege
- governance
- contextual authorization

---

# 2. Common IAM Conditions

## 🌍 aws:SourceIP

Restrict access by IP range.

Example:

```text
Only allow API calls from corporate office IPs
```

Use cases:

- admin access restriction
- VPN-only operations
- compliance boundaries

---

## 📍 aws:RequestedRegion

Restrict actions by AWS region.

Example:

```text
Deny EC2 creation outside ap-northeast-2
```

Use cases:

- data sovereignty
- cost control
- compliance enforcement

---

## 🏷️ ec2:ResourceTag

Control access using EC2 tags.

Example:

```text
Allow stop/start only if Project=Analytics
```

👉 Resource-level governance.

---

## 👤 aws:PrincipalTag

Authorization based on user tags.

Example:

```text
Department=Data
```

Use cases:

- ABAC
- scalable enterprise authorization

---

## 🔐 aws:MultiFactorAuthPresent

Require MFA for sensitive operations.

Example:

- terminate EC2
- delete S3 bucket
- modify IAM

---

# 3. Security Engineering Perspective

IAM conditions are foundational for:

- defense-in-depth
- contextual security
- privileged access management

Golden principle:

👉 “Who + context” determines authorization.

---

# 4. S3 Bucket Policy Scope (Critical)

## Bucket-Level ARN

```text
arn:aws:s3:::my-bucket
```

Used for:

- ListBucket

---

## Object-Level ARN

```text
arn:aws:s3:::my-bucket/*
```

Used for:

- GetObject
- PutObject
- DeleteObject

---

# 5. Organization-Aware Policies

## aws:PrincipalOrgID

Restrict access to AWS Organization members only.

Example:

```text
Only organization accounts can access bucket
```

Use cases:

- centralized data sharing
- multi-account governance
- secure org-wide access

---

# 6. DevOps/SRE Takeaways

IAM conditions help enforce:

- regional governance
- MFA requirements
- tag-driven authorization
- organization boundaries
- network restrictions

👉 Advanced cloud security posture.

---

# One-Line Memory Anchor

> IAM conditions make authorization context-aware.

---

# Part 2 — IAM Roles vs Resource-Based Policies

## Core Mental Model

Two main ways for cross-account/service access:

1. IAM Role assumption
2. Resource-based policy grants

---

# 1. IAM Role Flow

User/Service  
↓ AssumeRole  
↓  
Temporary credentials  
↓  
Access target resources

---

# Important Behavior

When assuming role:

❌ original permissions lost temporarily  
✅ assumed-role permissions active

---

# Example

Account A user  
↓  
Assume role in Account B  
↓  
Can access S3 in B  
❌ may lose DynamoDB permissions from A

---

# 2. Resource-Based Policy Flow

Resource itself grants access.

Example:

S3 Bucket Policy  
↓  
Allows Account A access

---

# Important Behavior

With resource-based policies:

✅ original permissions retained  
✅ additional permissions added

---

# Example

User in Account A:

- keeps DynamoDB access in A
- gains S3 access in B

👉 additive permissions model.

---

# 3. Resource-Based Policy Supported Services

| Service | Supports Resource Policy |
|---------|--------------------------|
| S3 | ✅ |
| SNS | ✅ |
| SQS | ✅ |
| Lambda | ✅ |
| API Gateway | ✅ |

---

# 4. Services Requiring IAM Roles

| Service | Access Method |
|---------|---------------|
| ECS Tasks | IAM role |
| EC2 Auto Scaling | IAM role |
| SSM Run Command | IAM role |
| Kinesis | mostly IAM role integrations |

---

# 5. EventBridge Integration Pattern

## Resource Policy Targets

EventBridge attaches:

- Lambda permissions
- SNS policies
- SQS policies

---

## IAM Role Targets

EventBridge assumes IAM role for:

- ECS tasks
- Auto Scaling
- Kinesis integrations

---

# 6. Security Perspective

## IAM Roles

Best for:

- temporary privilege elevation
- workload identity
- service-to-service auth

---

## Resource Policies

Best for:

- cross-account sharing
- event integrations
- public/private resource access

---

# 7. Operational Comparison

| Feature | IAM Role | Resource Policy |
|---------|-----------|----------------|
| Permission model | replacement | additive |
| Credential switch | yes | no |
| Cross-account | yes | yes |
| Service-centric | less | more |

---

# 8. Common SRE Patterns

## ECS Task Role

Task  
→ IAM Role  
→ S3/DynamoDB access

---

## Cross-Account S3 Sharing

Bucket Policy  
→ allow analytics account access

---

## EventBridge Automation

EventBridge  
→ Lambda/SNS/SQS resource policy

---

# 9. Governance Insight

IAM Roles:

👉 identity-centric authorization

Resource Policies:

👉 resource-centric authorization

Modern AWS security combines both.

---

# 10. High-Value Exam Keywords

| Keyword | Think |
|---------|------|
| MFA enforcement | aws:MultiFactorAuthPresent |
| restrict by IP | aws:SourceIP |
| org-only access | aws:PrincipalOrgID |
| additive permissions | resource-based policy |
| permission replacement | AssumeRole |

---

# Combined Insight

Advanced IAM + resource policies provide:

- contextual authorization
- cross-account governance
- least privilege security
- scalable cloud access patterns

👉 Core AWS identity architecture.

---

# One-Line Final Memory Anchor

> IAM roles replace permissions; resource-based policies extend them.

---