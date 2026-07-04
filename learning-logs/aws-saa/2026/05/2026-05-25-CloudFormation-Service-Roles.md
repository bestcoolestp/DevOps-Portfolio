# 2026-05-25

# CloudFormation & Security

---

# Why CloudFormation Needs Permissions

CloudFormation creates resources such as:

```text
EC2, S3, RDS, IAM, & Lambda
```

---

Question:

```text
Who actually creates these resources?
```

Answer:

```text
CloudFormation
```

But CloudFormation must have permissions.

---

# Option 1: Use User Permissions

Architecture:

```text
User → CloudFormation → AWS Resources
```

---

CloudFormation uses:

```text
The User's IAM Permissions
```

---

Problem:

```text
Users often need too many permissions
```

---

Example:

```text
EC2 Full Access, S3 Full Access, RDS Full Access, & IAM Access
```

---

Violates:

```text
Least Privilege
```

---

# Option 2: Use Service Roles

Recommended approach.

---

Architecture:

```text
User → CloudFormation → Service Role → AWS Resources
```

---

CloudFormation assumes:

```text
IAM Service Role
```

and uses its permissions.

---

# What Is a CloudFormation Service Role?

A special IAM Role used by:

```text
AWS CloudFormation
```

---

Trust relationship:

```json
{
  "Principal": {
    "Service": "cloudformation.amazonaws.com"
  }
}
```

---

CloudFormation can:

```text
AssumeRole
```

and execute actions.

---

# Example Scenario

Developer creates stack:

```yaml
Resources:
  DemoBucket:
    Type: AWS::S3::Bucket
```

---

Developer permissions:

```text
CloudFormation Access IAM PassRole
```

---

Developer does NOT have:

```text
S3 Full Access
```

---

CloudFormation Service Role:

```text
S3 Full Access
```

---

Result:

```text
Stack Creation Works
```

---

Because:

```text
CloudFormation uses Service Role
```

---

# Real Permission Flow

```text
Developer → Create Stack → CloudFormation → Assume Service Role → Create S3 Bucket
```

---

# Required Permission

Most important exam topic.

User must have:

```json
iam:PassRole
```

---

Without it:

```text
Access Denied
```

---

Even if the role exists.

---

# Why PassRole Exists

Without PassRole:

```text
Any User could use Any Role
```

---

Huge security risk.

---

AWS requires explicit permission:

```json
{
  "Action": "iam:PassRole"
}
```

---

# Typical Policy

Example:

```json
{
  "Effect": "Allow",
  "Action": "iam:PassRole",
  "Resource": "arn:aws:iam::*:role/CFN-ServiceRole"
}
```

---

Allows:

```text
Passing CFN-ServiceRole
```

only.

---

# Least Privilege Design

Developer:

```text
CloudFormation Access + PassRole
```

---

Service Role:

```text
EC2, S3, & RDS
```

permissions.

---

Result:

```text
Developers cannot directly modify resources
```

---

Only CloudFormation can.

---

# Failure Scenario

Service Role contains:

```text
S3 Full Access
```

only.

---

Template creates:

```yaml
EC2 Instance
```

---

Result:

```text
Stack Creation Fails
```

---

Error:

```text
Unauthorized Operation
```

---

Because role lacks:

```text
ec2:RunInstances
```

---

# Security Advantage

Without Service Role:

```text
Developer needs many permissions
```

---

With Service Role:

```text
Developer needs CloudFormation + PassRole
```

---

Much safer.

---

# CloudFormation Security Model

```text
User → CloudFormation → Service Role → AWS Resources
```

---

Never:

```text
User → AWS Resources
```

directly.

---

# Common Interview Question

Question:

```text
Why use a CloudFormation service role?
```

Answer:

```text
To implement least privilege.

Users only need CloudFormation permissions and iam:PassRole.

CloudFormation assumes a service role that has the permissions required to create resources.
```

---

# Exam Keywords

If you see:

```text
CloudFormation cannot create resources although user can create stacks
```

Check:

```text
Service Role Permissions
```

---

If you see:

```text
User cannot specify CloudFormation role
```

Check:

```text
iam:PassRole
```

---

# Comparison

| Item | User Permissions | Service Role |
|--------|--------|--------|
| Security | Lower | Higher |
| Least Privilege | Difficult | Easy |
| Auditing | Harder | Easier |
| Recommended | No | Yes |
| AWS Best Practice | ❌ | ✅ |

---

# Architecture Example

```text
Developer → CloudFormation → CFN-ServiceRole → EC2, S3, RDS, Lambda, & IAM
```

---

# Memory Anchor

```text
CloudFormation does not need YOUR permissions
```

---

```text
CloudFormation can use ITS OWN role
```

---

```text
Service Role = CloudFormation's Identity
```

---

```text
PassRole = Permission to let CloudFormation use that identity
```

---

# DevOps Interview Insight

A mature production environment rarely gives engineers:

```text
AdministratorAccess
```

---

Instead:

```text
Engineer → CloudFormation → Service Role → Infrastructure
```

---

This enables:

- Infrastructure as Code
- Separation of duties
- Least privilege
- Better auditing
- Safer production deployments