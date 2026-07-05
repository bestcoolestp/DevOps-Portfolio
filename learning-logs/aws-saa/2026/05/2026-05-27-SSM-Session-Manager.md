# 2026-05-27

# AWS Systems Manager Session Manager

---

# What is Session Manager?

AWS Systems Manager Session Manager allows you to:

```text
Securely connect to EC2 instances without SSH
```

---

Traditional access:

```text
Laptop → SSH → EC2
```

---

Session Manager:

```text
Laptop → AWS Console / CLI → Session Manager → EC2
```

---

# Why It Exists

Traditional SSH creates problems:

```text
Port 22 exposed, SSH keys, Key rotation, Bastion hosts, & Audit difficulties
```

---

Session Manager removes all of them.

---

# Main Benefits

## No SSH Keys

No need for:

```text
.pem files, authorized_keys, & key rotation
```

---

## No Port 22

Security Group:

```text
Inbound Rules NONE
```

---

Port:

```text
22 Closed
```

---

Huge security improvement.

---

## No Bastion Host

Traditional:

```text
Internet → Bastion Host → Private EC2
```

---

Session Manager:

```text
Internet → AWS Session Manager → Private EC2
```

---

No jump box required.

---

# Architecture

```text
Administrator → AWS Console / CLI → SSM Session Manager → SSM Agent → EC2 Instance
```

---

# Core Components

## 1. SSM Agent

Runs on:

```text
Amazon Linux, Ubuntu, Windows, & macOS
```

---

Agent establishes:

```text
Outbound Connection
```

to AWS.

---

Important:

```text
No inbound SSH needed
```

---

# 2. IAM Role

Instance must have:

```text
AmazonSSMManagedInstanceCore
```

policy.

---

Example:

```json
AmazonSSMManagedInstanceCore
```

---

Without it:

```text
Instance cannot register
```

with Systems Manager.

---

# 3. Systems Manager Service

AWS-managed service.

---

Handles:

```text
Authentication, Authorization, Session Creation, & Auditing
```

---

# Setup Steps

## Step 1

Launch EC2.

Example:

```text
Amazon Linux 2

t2.micro
```

---

## Step 2

Attach IAM Role:

```text
AmazonSSMManagedInstanceCore
```

---

## Step 3

Verify SSM Agent.

Most AWS AMIs already include:

```text
SSM Agent
```

---

## Step 4

Wait for registration.

---

Instance appears inside:

```text
Systems Manager → Fleet Manager
```

---

Status:

```text
Managed Node
```

---

# Starting a Session

Console:

```text
EC2 → Connect → Session Manager
```

---

Or:

```text
Systems Manager → Session Manager → Start Session
```

---

AWS creates:

```text
Interactive Shell
```

---

Example:

```bash
hostname

ping google.com

df -h

top
```

---

Works exactly like SSH.

---

# CLI Access

Install:

```bash
awscli

session-manager-plugin
```

---

Start session:

```bash
aws ssm start-session \
    --target i-1234567890abcdef
```

---

Result:

```text
Interactive Shell
```

---

# Security Comparison

## SSH

Requires:

```text
Port 22, Security Group, & Key Pair
```

---

Risk:

```text
Brute Force, Key Leakage, & Misconfiguration
```

---

## Session Manager

Requires:

```text
IAM Permissions, SSM Agent
```

---

No exposed port.

---

Much safer.

---

# Logging Sessions

One of the biggest advantages.

---

Session activity can be stored in:

```text
CloudWatch Logs, Amazon S3
```

---

Example:

```text
Who connected? When? Which commands executed?
```

---

All auditable.

---

Very useful for:

```text
Compliance, Security, & Forensics
```

---

# Session Manager vs SSH

| Feature | SSH | Session Manager |
|----------|----------|----------|
| Port 22 Required | ✅ | ❌ |
| Key Pair Required | ✅ | ❌ |
| Bastion Host Needed | Sometimes | ❌ |
| IAM Authentication | ❌ | ✅ |
| Session Logging | Manual | ✅ |
| Audit Trail | Limited | Excellent |
| Public IP Required | Often | ❌ |

---

# Session Manager vs EC2 Instance Connect

## EC2 Instance Connect

Uses:

```text
Temporary SSH Keys
```

---

Still requires:

```text
Port 22
```

---

Flow:

```text
User → EC2 Instance Connect → SSH → EC2
```

---

# Session Manager

Uses:

```text
SSM Agent
```

---

Requires:

```text
No Port 22
```

---

Flow:

```text
User → Session Manager → SSM Agent → EC2
```

---

# Typical Production Design

Private EC2:

```text
No Public IP, No SSH, & No Bastion Host
```

---

Access:

```text
Session Manager Only
```

---

Common in:

```text
Security-focused, DevOps, Enterprise, & Financial Services
```

---

# Networking Requirement

Instance must reach:

```text
Systems Manager Endpoints
```

---

Possible through:

```text
Internet Gateway, NAT Gateway, & VPC Endpoint
```

---

Best practice:

```text
SSM VPC Endpoints
```

---

Then:

```text
No Internet Access Needed
```

---

Architecture:

```text
Private EC2 → VPC Endpoint → SSM Service
```

---

Fully private.

---

# Common Interview Question

Question:

```text
How can you access an EC2 instance without opening port 22?
```

Answer:

```text
AWS SSM Session Manager
```

---

Question:

```text
How do you audit all commands executed on EC2 instances?
```

Answer:

```text
Session Manager + CloudWatch Logs or S3 Logging
```

---

Question:

```text
How do you remove the need for bastion hosts?
```

Answer:

```text
Session Manager
```

---

# Exam Keywords

If you see:

```text
No SSH, No Bastion, No Port 22, Centralized Access, & Audit Commands
```

Answer:

```text
SSM Session Manager
```

---

# Memory Anchor

```text
SSH = Keys + Port 22
```

---

```text
EC2 Instance Connect = Temporary SSH Keys
```

---

```text
Session Manager = No Keys, No Port 22, No Bastion
```

---

# DevOps Interview Insight

Modern AWS environments increasingly disable:

```text
SSH, RDP
```

completely.

Instead:

```text
Engineer → IAM Authentication → Session Manager → Private EC2
```

Benefits:

- Better security
- Centralized auditing
- No key management
- No bastion hosts
- Simpler operations
