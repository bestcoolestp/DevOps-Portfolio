# 2026-04-27 — Bastion Hosts & Private EC2 Access

# The Problem

You have:

```text id="bastion1"
Internet → Public Subnet → Private Subnet
```

---

Private EC2 instances:

```text id="bastion2"
No Public IP
No Route to Internet Gateway
```

---

Result:

```text id="bastion3"
Cannot SSH directly
```

from the Internet.

---

# Why Private Instances Exist

Private instances usually host:

- Databases
- Internal applications
- Backend services
- Sensitive workloads

---

AWS best practice:

```text id="bastion4"
Never expose these systems directly
to the Internet.
```

---

# Solution: Bastion Host

A Bastion Host is:

```text id="bastion5"
An EC2 instance located in a Public Subnet used as a jump server.
```

---

Think:

```text id="bastion6"
Internet → Bastion Host → Private EC2
```

---

# Alternative Names

You may also see:

```text id="bastion7"
Jump Host, Jump Box, Bastion Server
```

---

All mean essentially the same thing.

---

# Architecture

```text id="bastion8"
Internet
    │
    ▼
Bastion Host
(Public Subnet)
    │
    ▼
Private EC2
(Private Subnet)
```

---

# Public Subnet

Bastion Host requirements:

```text id="bastion9"
Public IP, Route to IGW, Internet Access
```

---

Because administrators must be able to reach it.

---

# Private Subnet

Private EC2:

```text id="bastion10"
No Public IP, No Internet Access
```

---

Only reachable through:

```text id="bastion11"
Bastion Host
```

---

# SSH Flow

Step 1

SSH into Bastion Host.

```text id="bastion12"
Laptop → SSH → Bastion Host
```

---

Step 2

SSH from Bastion Host to Private EC2.

```text id="bastion13"
Bastion Host → SSH → Private EC2
```

---

Result:

```text id="bastion14"
Internet → Bastion → Private Instance
```

---

# Security Groups

## Bastion Security Group

Should allow:

```text id="bastion15"
Inbound SSH
Port 22
```

---

Example:

```text id="bastion16"
Source:
203.0.113.0/24
```

Corporate network.

---

Avoid:

```text id="bastion17"
0.0.0.0/0
```

whenever possible.

---

AWS exam favorite:

```text id="bastion18"
Restrict SSH access to trusted IP ranges.
```

---

# Bastion SG Example

Inbound

| Port | Source |
|--------|---------|
| 22 | Corporate CIDR |

---

Outbound

```text id="bastion19"
Allow All
```

Usually acceptable.

---

# Private EC2 Security Group

Never allow:

```text id="bastion20"
SSH from Internet
```

---

Instead:

```text id="bastion21"
SSH from Bastion SG
```

---

Example:

| Port | Source |
|--------|---------|
| 22 | Bastion Security Group |

---

Best practice:

```text id="bastion22"
Reference Security Group instead of IP address.
```

---

# Why SG References Are Better

Instead of:

```text id="bastion23"
10.0.0.5
```

Use:

```text id="bastion24"
sg-bastion
```

---

Benefits:

- Easier maintenance
- Dynamic
- More secure

---

# Demo Environment

VPC:

```text id="bastion25"
DemoVPC
```

---

Public Subnet:

```text id="bastion26"
PublicSubnetA
```

Contains:

```text id="bastion27"
Bastion Host
```

---

Private Subnet:

```text id="bastion28"
PrivateSubnetA
```

Contains:

```text id="bastion29"
Private EC2
```

---

# Key Pair

Created:

```text id="bastion30"
demo-key-pair.pem
```

---

Used for:

```text id="bastion31"
SSH Authentication
```

---

# Linux Permissions

Before SSH:

```bash
chmod 400 demo-key-pair.pem
```

---

Why?

SSH refuses keys that are too open.

---

Example error:

```text id="bastion32"
UNPROTECTED PRIVATE KEY FILE
```

---

# SSH to Bastion

Command:

```bash
ssh -i demo-key-pair.pem ec2-user@<public-ip>
```

---

Flow:

```text id="bastion33"
Laptop → Public IP → Bastion Host
```

---

# SSH to Private Instance

From Bastion Host:

```bash
ssh -i demo-key-pair.pem ec2-user@10.0.x.x
```

---

Flow:

```text id="bastion34"
Bastion Host → Private IP → Private EC2
```

---

# Important Detail

Private instance is accessed through:

```text id="bastion35"
Private IP Address
```

not public IP.

---

Because:

```text id="bastion36"
No Public IP Exists
```

---

# Common SSH Problems

## Problem 1

Incorrect permissions.

---

Fix:

```bash
chmod 400 demo-key-pair.pem
```

---

## Problem 2

Broken PEM formatting.

---

Symptoms:

```text id="bastion37"
Invalid format
```

---

Fix:

```bash
vi demo-key-pair.pem
```

or

```bash
nano demo-key-pair.pem
```

and preserve original line breaks.

---

## Problem 3

Security Group mismatch.

---

Check:

```text id="bastion38"
Port 22 allowed?
```

---

## Problem 4

Wrong Private IP.

---

Verify:

```text id="bastion39"
Private IPv4 Address
```

inside EC2 Console.

---

# Verification

Successfully connected:

```text id="bastion40"
Laptop → Bastion → Private EC2
```

---

# Private Instance Test

Inside private EC2:

```bash
ping google.com
```

---

Result:

```text id="bastion41"
Failed
```

---

Why?

Private subnet:

```text id="bastion42"
No Internet Route
No NAT Gateway
```

---

This is expected.

---

# Bastion Host Advantages

✅ Simple

✅ Easy to understand

✅ Works in all VPCs

✅ Common exam architecture

---

# Bastion Host Disadvantages

❌ Publicly exposed

❌ Requires maintenance

❌ Requires patching

❌ Single attack point

❌ Additional EC2 cost

---

# Modern AWS Alternatives

AWS often prefers:

### AWS Systems Manager Session Manager

```text id="bastion43"
No Bastion Host
No Public IP
No SSH Port
```

---

Administrators connect through:

```text id="bastion44"
AWS Console or AWS CLI
```

---

Exam questions may compare:

| Feature | Bastion | Session Manager |
|----------|----------|----------|
| Public IP Required | Yes | No |
| Port 22 Required | Yes | No |
| EC2 Maintenance | Yes | No |
| More Secure | No | Yes |

---

# AWS SAA Exam Memory Anchors

### Bastion Host

```text id="bastion45"
Public EC2 used to access private EC2
```

---

### Location

```text id="bastion46"
Public Subnet
```

---

### Private EC2

```text id="bastion47"
Allow SSH only from Bastion SG
```

---

### SSH Flow

```text id="bastion48"
Internet → Bastion → Private EC2
```

---

### Security Best Practice

```text id="bastion49"
Restrict SSH to trusted CIDRs
```

---

### Modern Alternative

```text id="bastion50"
AWS Systems Manager Session Manager
```

---

# Final Memory Anchor

> A Bastion Host is an EC2 instance in a public subnet that acts as a secure jump server for accessing EC2 instances in private subnets. Private instances should allow SSH only from the Bastion Host security group, not from the Internet.

---