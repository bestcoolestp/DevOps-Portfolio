# 2026-04-10 — Microsoft Active Directory & AWS Directory Services

# Part 1 — Microsoft Active Directory (AD)

## Core Mental Model

Microsoft Active Directory = centralized identity & access management for Windows environments.

👉 One central authority controls:

- users
- computers
- groups
- authentication
- permissions

---

# 1. Why Active Directory Exists

Without AD:

❌ local accounts everywhere  
❌ duplicated credentials  
❌ difficult permission management  
❌ no centralized authentication

AD solves:

✅ centralized identity  
✅ centralized authentication  
✅ centralized authorization  
✅ enterprise single sign-on

---

# 2. Core Components

## Domain Controller (DC)

The brain of Active Directory.

Stores:

- usernames
- passwords
- security policies
- permissions
- group memberships

---

## Domain

Logical boundary of users/computers.

Example:

```text
corp.example.com
````

---

## Forest

Collection of domains/trees.

Largest AD boundary.

---

# 3. Example Workflow

User:

```text
John
Password123
```

created on Domain Controller.

---

Windows laptop joins domain:

```text
corp.example.com
```

---

User logs in anywhere:

```text
Authentication → Domain Controller
```

instead of local machine.

---

# 4. Enterprise Benefits

## Centralized Authentication

Single identity across organization.

---

## Group Policies

Push configurations centrally:

* password policies
* software installs
* desktop restrictions

---

## Single Sign-On (SSO)

One login → multiple systems.

---

# 5. Common Enterprise Objects

| Object      | Purpose             |
| ----------- | ------------------- |
| Users       | employee identities |
| Computers   | managed devices     |
| Groups      | permission grouping |
| Printers    | shared resources    |
| File Shares | centralized storage |

---

# 6. DevOps/SRE Perspective

AD is foundational in:

* enterprise authentication
* Windows infrastructure
* hybrid cloud identity
* corporate access governance

---

# One-Line Memory Anchor

> Active Directory centralizes identity and authentication for enterprise Windows environments.

---

# Part 2 — AWS Directory Services

## Core Mental Model

AWS Directory Services bring Microsoft AD-style authentication into AWS.

---

# 1. Why AWS Directory Services Exist

Cloud workloads still need:

* Windows authentication
* centralized users
* domain joining
* enterprise SSO

AWS provides managed AD solutions.

---

# 2. AWS Managed Microsoft AD

## What It Is

Fully managed Microsoft Active Directory running in AWS.

AWS manages:

* domain controllers
* patching
* backups
* availability

---

# Key Features

✅ real Microsoft AD
✅ supports MFA
✅ supports Group Policy
✅ supports trusts
✅ multi-AZ deployment

---

# Major Capability

## Two-Way Trust with On-Prem AD

Allows seamless identity federation between:

```text
On-Prem AD ↔ AWS Managed AD
```

Users authenticate across both environments.

---

# Use Cases

* hybrid enterprise identity
* AWS Windows workloads
* enterprise SSO
* EC2 domain joining

---

# Exam Trigger

👉 “Need full Microsoft AD in AWS”

= AWS Managed Microsoft AD

---

# 3. AD Connector

## What It Is

Proxy service to existing on-premises AD.

AWS does NOT store users.

---

# Authentication Flow

```text
AWS Service
↓
AD Connector
↓
On-Prem AD
```

---

# Characteristics

✅ supports MFA
✅ lightweight
✅ no user replication
✅ no AD management in AWS

---

# Limitation

Depends on connectivity to on-premises AD.

Possible:

* latency
* VPN dependency
* Direct Connect dependency

---

# Exam Trigger

👉 “Proxy to on-prem AD”

= AD Connector

---

# 4. Simple AD

## What It Is

AD-compatible directory.

NOT actual Microsoft AD.

Built using Samba.

---

# Characteristics

✅ inexpensive
✅ standalone AWS environments

❌ cannot trust on-prem AD
❌ fewer enterprise features

---

# Best For

* small AWS-only workloads
* basic authentication needs

---

# Exam Trigger

👉 “No on-prem AD, simple AWS directory”

= Simple AD

---

# 5. Comparison Table

| Service                  | Real Microsoft AD | Trust On-Prem AD | Stores Users in AWS |
| ------------------------ | ----------------- | ---------------- | ------------------- |
| AWS Managed Microsoft AD | ✅                 | ✅                | ✅                   |
| AD Connector             | ❌                 | Proxy only       | ❌                   |
| Simple AD                | ❌                 | ❌                | ✅                   |

---

# Part 3 — IAM Identity Center Integration

## Integration Pattern

AWS Managed Microsoft AD integrates naturally with:

```text
IAM Identity Center
```

---

# Enterprise Architecture

```text
On-Prem AD
↕
AWS Managed Microsoft AD
↕
IAM Identity Center
↕
AWS Accounts & Applications
```

---

# Benefits

✅ centralized SSO
✅ hybrid identity
✅ unified authentication
✅ enterprise governance

---

# Alternative Pattern

Instead of trust relationship:

```text
AD Connector
↓
On-Prem AD
```

Works, but introduces dependency/latency.

---

# 6. Exam-Oriented Decision Matrix

| Scenario                       | Best Answer                      |
| ------------------------------ | -------------------------------- |
| Need real Microsoft AD in AWS  | AWS Managed Microsoft AD         |
| Need proxy to on-prem AD       | AD Connector                     |
| Small standalone AWS directory | Simple AD                        |
| Need trust relationship        | AWS Managed Microsoft AD         |
| Need hybrid SSO                | Managed AD + IAM Identity Center |

---

# 7. Real-World Enterprise Pattern

Employees
↓
Corporate AD
↓
AWS Managed Microsoft AD
↓
IAM Identity Center
↓
AWS Accounts / Apps / EC2

---

# 8. DevOps/SRE Takeaways

These services matter heavily for:

* hybrid cloud identity
* enterprise Windows workloads
* centralized authentication
* secure AWS federation
* multi-account enterprise operations

---

# One-Line Final Memory Anchor

> AWS Directory Services extend enterprise Active Directory authentication into the AWS cloud.

---
