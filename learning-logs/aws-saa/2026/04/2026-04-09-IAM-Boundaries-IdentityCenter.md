# 2026-04-09 — IAM Permission Boundaries & IAM Identity Center (DevOps/SRE Lens)

# Part 1 — IAM Permission Boundaries

## Core Mental Model

Permission Boundary = **maximum permission ceiling for users/roles**

👉 It does NOT grant permissions.

It limits how powerful attached policies can become.

---

# 1. Why Permission Boundaries Exist

Problem:

Delegated admins/developers may accidentally or intentionally escalate privileges.

Solution:

Permission boundaries enforce hard limits.

---

# 2. Evaluation Logic

Effective permissions =

```text
Identity Policy
∩
Permission Boundary
```

👉 Only permissions allowed by BOTH survive.

---

# 3. Example

## Attached Policy

```text
AdministratorAccess
```

---

## Boundary

```text
AmazonS3FullAccess
```

---

## Final Result

✅ S3 allowed  
❌ IAM/EC2/DynamoDB denied

Even with admin policy attached.

---

# 4. Key Characteristic

Permission boundaries:

✅ supported for:

- users
- roles

❌ NOT supported for groups

---

# 5. Common Enterprise Use Cases

## Delegated Administration

Allow teams to:

- create roles
- create users
- manage resources

WITHOUT:

- privilege escalation
- org-wide admin access

---

## Self-Service IAM

Developers can create roles safely within limits.

---

## Sandbox Governance

Restrict experimentation to approved services only.

---

# 6. Permission Boundaries vs SCPs

| Feature | Permission Boundary | SCP |
|---------|--------------------|-----|
| Scope | user/role | account/OU |
| Granularity | fine | broad |
| Purpose | delegated admin safety | org governance |

👉 Boundaries are surgical; SCPs are organizational.

---

# 7. Full AWS Permission Evaluation Flow

AWS evaluates:

1. Explicit Deny
2. SCP
3. Resource Policy
4. Identity Policy
5. Permission Boundary
6. Session Policy

👉 ALL layers must allow access.

---

# 8. Explicit Deny Rule (Critical)

Example:

```text
Deny: sqs:*
Allow: sqs:DeleteQueue
```

Result:

❌ denied

Because:

👉 Explicit deny always wins.

---

# 9. Implicit Deny

If permission not explicitly allowed:

❌ denied automatically

---

# 10. DevOps/SRE Takeaways

Permission boundaries are critical for:

- platform engineering
- delegated cloud operations
- multi-team AWS governance

Golden principle:

👉 “Grant flexibility without losing control.”

---

# 11. Common Security Pattern

Platform Team  
↓  
Creates permission boundary  
↓  
Developers create IAM roles/users  
↓  
Cannot exceed approved scope

---

# One-Line Memory Anchor

> Permission boundaries define the maximum blast radius of IAM entities.

---

# Part 2 — AWS IAM Identity Center

## Core Mental Model

IAM Identity Center = **centralized SSO for AWS and business apps**

👉 One login for:

- multiple AWS accounts
- SaaS applications
- enterprise identities

---

# 1. Why It Matters

Without centralized identity:

❌ account sprawl  
❌ credential duplication  
❌ operational complexity

Identity Center solves:

- centralized authentication
- federated access
- multi-account SSO

---

# 2. Supported Access Targets

## AWS Accounts

Across Organizations.

---

## Business Applications

Examples:

- Salesforce
- Box
- Microsoft 365

via SAML 2.0.

---

## EC2 Windows Instances

Centralized Windows access.

---

# 3. Identity Providers

## Built-In Identity Store

Managed directly in AWS.

---

## External Identity Providers

- Active Directory
- Okta
- OneLogin

---

# 4. Login Flow

User  
↓  
Identity Center Portal  
↓  
Chooses account/app  
↓  
SSO access granted

---

# 5. Permission Sets (Critical)

Permission Set = collection of IAM permissions.

Examples:

- Admin
- ReadOnly
- Developer

---

# What Happens Behind the Scenes

Identity Center automatically creates:

- IAM roles
- trust relationships

inside target accounts.

---

# 6. Multi-Account Access Pattern

Organizations  
↓  
Identity Center  
↓  
Permission Sets  
↓  
Users/Groups  
↓  
SSO into accounts

👉 Enterprise-scale AWS access model.

---

# 7. ABAC Integration

Access based on user attributes:

Examples:

- department
- cost center
- region
- job title

---

# Example

```text
Senior engineers → production access
Junior engineers → dev only
```

👉 Dynamic authorization without rewriting policies.

---

# 8. DevOps/SRE Takeaways

IAM Identity Center is foundational for:

- enterprise SSO
- centralized identity governance
- secure multi-account operations

Golden principle:

👉 “Identity should be centralized, permissions distributed.”

---

# 9. Identity Center vs IAM Users

| Feature | IAM Users | Identity Center |
|---------|------------|----------------|
| Scope | single account | multi-account |
| Federation | limited | strong |
| SSO | manual | built-in |
| Enterprise-ready | less | yes |

---

# 10. Real-World Platform Engineering Pattern

Employees  
↓  
Okta/AD  
↓  
IAM Identity Center  
↓  
Permission Sets  
↓  
AWS Accounts

---

# 11. High-Value Exam Keywords

| Keyword | Think |
|---------|------|
| permission ceiling | Permission Boundary |
| delegated admin | Permission Boundary |
| centralized SSO | IAM Identity Center |
| one login multiple accounts | IAM Identity Center |
| ABAC identity federation | Identity Center |

---

# Combined Insight

Permission Boundaries + IAM Identity Center provide:

- scalable identity governance
- delegated administration
- enterprise-grade access control
- safer multi-account operations

👉 Core AWS enterprise security architecture.

---

# One-Line Final Memory Anchor

> Permission boundaries limit privilege; Identity Center centralizes identity.

---

## References
