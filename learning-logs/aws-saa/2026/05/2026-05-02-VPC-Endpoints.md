# 2026-05-02 — AWS VPC Endpoints

# Why Do We Need VPC Endpoints?

Suppose an EC2 instance is running inside a private subnet.

It needs to access:

- Amazon S3
- DynamoDB
- CloudWatch
- Secrets Manager
- Systems Manager

Without a VPC Endpoint:

```text
Private EC2 → NAT Gateway → Internet Gateway → Public AWS Service Endpoint
```

Even though the destination is another AWS service, traffic leaves the VPC routing path.

This introduces:

- NAT Gateway costs
- Additional network hops
- More complex architecture

---

# What Is a VPC Endpoint?

A VPC Endpoint allows private communication between a VPC and AWS services.

Traffic never traverses the public internet.

```text
EC2 → VPC Endpoint → AWS Service
```

Benefits:

- No Internet Gateway required
- No NAT Gateway required
- Traffic stays on AWS backbone
- Better security
- Lower cost
- Simpler architecture

---

# AWS PrivateLink

Most VPC Endpoints are powered by:

```text
AWS PrivateLink
```

PrivateLink provides private connectivity to:

- AWS services
- Third-party SaaS services
- Services hosted in another VPC

without exposing traffic to the public internet.

---

# Types of VPC Endpoints

Two major endpoint types appear in the SAA exam.

---

# 1. Gateway Endpoints

Supported Services:

```text
Amazon S3
Amazon DynamoDB
```

Only these two.

---

Architecture:

```text
EC2 → Route Table → Gateway Endpoint → S3
```

---

Characteristics

- Free
- No ENI created
- No Security Group
- Route table based
- Automatically scales

---

Exam Rule

If the service is:

```text
Amazon S3
Amazon DynamoDB
```

the answer is usually:

```text
Gateway Endpoint
```

---

# Gateway Endpoint Example

Private EC2 needs S3 access.

Without Endpoint:

```text
EC2 → NAT Gateway → Internet Gateway → S3
```

---

With Endpoint:

```text
EC2 → Gateway Endpoint → S3
```

---

Result:

```text
No NAT Cost
No Internet Access Required
```

---

# 2. Interface Endpoints

Used for almost every other AWS service.

Examples:

- CloudWatch
- Systems Manager
- Secrets Manager
- KMS
- SNS
- SQS
- EC2 API
- ECR
- Lambda
- API Gateway

and many more.

---

Architecture:

```text
EC2 → Private IP (ENI) → AWS Service
```

---

Characteristics

- Creates an ENI
- Gets a private IP address
- Requires Security Groups
- Powered by AWS PrivateLink
- Hourly cost
- Data processing cost

---

# Interface Endpoint Example

Private EC2 needs Secrets Manager.

Without Endpoint:

```text
EC2 → NAT Gateway → Internet Gateway → Secrets Manager
```

---

With Endpoint:

```text
EC2 → Interface Endpoint (Private ENI) → Secrets Manager
```

---

Traffic remains private.

---

# Gateway Endpoint vs Interface Endpoint

| Feature | Gateway Endpoint | Interface Endpoint |
|-----------|----------------|-------------------|
| Services | S3, DynamoDB only | Most AWS services |
| Cost | Free | Hourly + Data |
| Uses ENI | No | Yes |
| Security Group | No | Yes |
| Route Table Entry | Yes | No |
| Private IP Address | No | Yes |

---

# Exam Shortcut

Question:

```text
Private EC2 needs S3 access.
No NAT Gateway.
Lowest cost.
```

Answer:

```text
Gateway Endpoint
```

---

Question:

```text
Private EC2 needs Secrets Manager.
No Internet access.
```

Answer:

```text
Interface Endpoint
```

---

Question:

```text
Private EC2 needs CloudWatch Logs.
```

Answer:

```text
Interface Endpoint
```

---

Question:

```text
Private EC2 needs DynamoDB.
```

Answer:

```text
Gateway Endpoint
```

---

# Route Table Behavior

Gateway Endpoints require route updates.

Example:

```text
Destination:
pl-xxxxxxxx

Target:
S3 Gateway Endpoint
```

AWS automatically inserts these routes.

---

Interface Endpoints do not use route tables.

Instead:

```text
DNS → Private IP (ENI) → Service
```

---

# Security Groups

Gateway Endpoint:

```text
No Security Group
```

---

Interface Endpoint:

```text
Security Group Required
```

Example:

```text
Allow HTTPS 443
From VPC CIDR
```

---

# Endpoint Policies

VPC Endpoints can have policies.

Example:

Allow access only to:

```text
my-company-bucket
```

---

Example Policy

```json
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::my-company-bucket",
        "arn:aws:s3:::my-company-bucket/*"
      ]
    }
  ]
}
```

---

# On-Premises Access

Interface Endpoints support:

```text
On-Premises → VPN / Direct Connect → Interface Endpoint → AWS Service
```

Very common enterprise design.

---

Gateway Endpoints cannot be used from on-premises networks.

---

# Troubleshooting Checklist

If endpoint access fails:

### Check DNS

```text
enableDnsHostnames
enableDnsSupport
```

should be enabled.

---

### Check Security Groups

For Interface Endpoints:

```text
HTTPS 443 allowed?
```

---

### Check Route Tables

For Gateway Endpoints:

```text
Endpoint Route Exists?
```

---

### Check Endpoint Policy

May be denying access.

---

# Architecture Example

Without Endpoint

```text
Private EC2 → NAT Gateway → Internet Gateway → S3
```

Cost:

```text
NAT Hourly Cost + Data Processing Cost
```

---

With Gateway Endpoint

```text
Private EC2 → Gateway Endpoint → S3
```

Cost:

```text
Free
```

---

# AWS SAA Exam Memory Anchors

### S3

```text
Gateway Endpoint
```

---

### DynamoDB

```text
Gateway Endpoint
```

---

### Everything Else

```text
Interface Endpoint
```

---

### Interface Endpoint

```text
Creates ENI
Uses Security Group
Costs Money
```

---

### Gateway Endpoint

```text
Route Table Based
Free
No Security Group
```

---

### Private Access

```text
No NAT Gateway
No Internet Gateway
Traffic Stays on AWS Network
```

---

# Final Memory Anchor

> VPC Endpoints provide private access to AWS services without using the public internet. Use Gateway Endpoints for S3 and DynamoDB (free, route-table based), and Interface Endpoints for most other AWS services (ENI-based, PrivateLink-powered, hourly cost).