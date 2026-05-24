# 2026-04-16 — AWS SSM Parameter Store (DevOps/SRE Lens)

# Core Mental Model

SSM Parameter Store = centralized secure configuration & secret management service for AWS workloads.

👉 Store:

- application configs
- database passwords
- API keys
- environment variables
- AMI IDs
- feature flags

securely and centrally.

---

# 1. Why Parameter Store Exists

Without centralized config management:

❌ hardcoded secrets  
❌ duplicated configs  
❌ inconsistent environments  
❌ difficult secret rotation

Parameter Store solves:

✅ centralized configuration  
✅ secure secret storage  
✅ IAM-controlled access  
✅ version tracking

---

# 2. Core Capabilities

Parameter Store provides:

✅ serverless architecture  
✅ durable storage  
✅ hierarchical organization  
✅ optional KMS encryption  
✅ versioning  
✅ IAM integration

---

# 3. Plaintext vs Encrypted Parameters

## Plaintext Parameters

Stored normally.

Example:

```text id="ps1"
/app/prod/api-endpoint
````

---

## SecureString Parameters

Encrypted using:

```text id="ps2"
AWS KMS
```

---

# Workflow

Application
↓
SSM Parameter Store
↓
KMS decrypts SecureString
↓
Application receives plaintext

---

# 4. Hierarchical Structure (Critical)

Parameters support path-based hierarchy.

Example:

```text id="ps3"
/department/application/environment/secret
```

---

# Real Example

```text id="ps4"
/finance/payroll/prod/db-password
```

---

# Why This Matters

Enables:

✅ cleaner organization
✅ scalable governance
✅ path-based IAM permissions

---

# 5. IAM Access Control

Example IAM policy:

```text id="ps5"
Allow access only to:
/finance/*
```

---

# Enterprise Benefit

Fine-grained secret isolation across teams/environments.

---

# 6. Versioning

Every parameter update creates new version.

---

# Benefits

✅ rollback capability
✅ auditability
✅ safer deployments

---

# Example

```text id="ps6"
Version 1 → old DB password
Version 2 → rotated DB password
```

---

# 7. Parameter Tiers

# Standard Tier

## Characteristics

✅ free
✅ 4 KB max size
✅ unlimited standard usage

---

# Limitations

❌ no advanced policies

---

# 8. Advanced Tier

## Characteristics

💵 approximately:

```text id="ps7"
$0.05/month per parameter
```

---

# Benefits

✅ 8 KB size
✅ parameter policies
✅ advanced lifecycle controls

---

# 9. Advanced Parameter Policies

## Expiration Policy

Automatically expire/delete parameter.

---

# No-Change Notification

Alert if parameter not updated within defined time.

---

# Example

Database password unchanged for:

```text id="ps8"
90 days
```

→ EventBridge alert triggered.

---

# 10. EventBridge Integration

Parameter Store emits events for:

* expiration
* updates
* policy violations

---

# Common Automation Pattern

```text id="ps9"
Parameter Store
↓
EventBridge
↓
SNS / Lambda / SSM Automation
```

---

# 11. Public Parameters

AWS publishes useful public parameters.

Example:

```text id="ps10"
/aws/service/ami-amazon-linux-latest
```

---

# Common Use Cases

* latest AMI IDs
* service metadata
* AWS-managed configs

---

# 12. Secrets Manager Integration

Parameter Store can reference:

```text id="ps11"
AWS Secrets Manager
```

secrets directly.

---

# Important Distinction

| Service         | Purpose                       |
| --------------- | ----------------------------- |
| Parameter Store | configs + lightweight secrets |
| Secrets Manager | advanced secret rotation      |

---

# 13. CloudFormation Integration

Parameters can be consumed directly in:

```text id="ps12"
CloudFormation
```

---

# Benefits

✅ environment abstraction
✅ reusable templates
✅ secure deployments

---

# Example

CloudFormation stack references:

```text id="ps13"
/prod/rds/password
```

instead of hardcoded credentials.

---

# 14. DevOps/SRE Perspective

Parameter Store is foundational for:

* GitOps
* CI/CD pipelines
* infrastructure-as-code
* secret centralization
* multi-environment deployments

---

# 15. Common Enterprise Pattern

```text id="ps14"
Application
↓
IAM Role
↓
SSM Parameter Store
↓
KMS-encrypted secrets
```

---

# Security Advantage

Applications never hardcode credentials.

---

# 16. Parameter Store vs Secrets Manager

| Feature | Parameter Store | Secrets Manager |
|---|---|
| Cost | cheaper/free | more expensive |
| Rotation | limited | built-in |
| Secret Focus | moderate | strong |
| Config Storage | excellent | less focused |

---

# 17. Real-World Usage Examples

## Kubernetes/ECS/Lambda Configs

* DB_HOST
* API_KEY
* REDIS_URL

---

## CI/CD Pipelines

Store deployment variables securely.

---

## Multi-Environment Separation

```text id="ps15"
/dev/
/test/
/prod/
```

---

# 18. High-Value Exam Keywords

| Keyword                      | Think                   |
| ---------------------------- | ----------------------- |
| hierarchical config storage  | Parameter Store         |
| SecureString                 | KMS-encrypted parameter |
| no-change notification       | Advanced tier           |
| public AMI parameter         | Parameter Store         |
| serverless config management | Parameter Store         |

---

# 19. Common AWS Automation Pattern

```text id="ps16"
Lambda
↓
Reads SecureString
↓
KMS decrypts
↓
Application uses credential
```

---

# 20. Operational Best Practice

Golden principle:

👉 “Store secrets centrally, never inside code repositories.”

---

# One-Line Final Memory Anchor

> SSM Parameter Store provides centralized, secure, versioned configuration and secret management integrated with IAM and KMS.

---