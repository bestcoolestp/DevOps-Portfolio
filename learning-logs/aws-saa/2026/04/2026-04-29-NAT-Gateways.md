
# 2026-04-29 — NAT Gateway

# Why NAT Gateway Exists

AWS originally provided:

```text id="natgw1"
NAT Instance is for private subnet Internet access.

```

---

Problem:

```text id="natgw2"
You manage everything.
```

Including:

- EC2 patching
- Security Groups
- Scaling
- Availability
- Monitoring

---

AWS solution:

```text id="natgw3"
NAT Gateway
```

---

# What is a NAT Gateway?

A NAT Gateway is:

```text id="natgw4"
AWS-managed Network Address Translation service
```

that allows:

```text id="natgw5"
Private EC2 → Internet
```

---

while preventing:

```text id="natgw6"
Internet → Private EC2
```

---

Exactly like a NAT Instance. But fully managed.

---

# Core Purpose

Private instances often need:

- Software updates
- Package downloads
- Docker image pulls
- External API calls

---

But should NOT have:

```text id="natgw7"
Public IP Addresses
```

---

NAT Gateway solves this problem.

---

# Architecture

```text id="natgw8"
Internet
    ▲
    │
Internet Gateway
    ▲
    │
NAT Gateway
(Public Subnet)
    ▲
    │
Private EC2
(Private Subnet)
```

---

# Traffic Flow

Private EC2:

```text id="natgw9"
10.0.16.20
```

wants:

```text id="natgw10"
google.com
```

---

Request:

```text id="natgw11"
Private EC2 → NAT Gateway → Internet Gateway → Internet
```

---

Response:

```text id="natgw12"
Internet → Internet Gateway → NAT Gateway → Private EC2
```

---

# Key AWS Exam Rule

NAT Gateway provides:

```text id="natgw13"
Outbound Internet Access
```

---

NAT Gateway does NOT provide:

```text id="natgw14"
Inbound Internet Access
```

---

Exam favorite:

```text id="natgw15"
Private instances initiate connections.

External systems cannot initiate connections.
```

---

# NAT Gateway Requirements

## Requirement 1

Must be deployed in:

```text id="natgw16"
Public Subnet
```

---

Because it needs:

```text id="natgw17"
Internet Gateway Connectivity
```

---

## Requirement 2

Requires:

```text id="natgw18"
Elastic IP
```

---

AWS allocates:

```text id="natgw19"
One Public Address
```

for outbound traffic.

---

## Requirement 3

Requires:

```text id="natgw20"
Internet Gateway
```

attached to the VPC.

---

Without Internet Gateway(IGW):

```text id="natgw21"
NAT Gateway
Cannot Reach Internet
```

---

# Route Table Configuration

Private Route Table:

Before:

```text id="natgw22"
10.0.0.0/16 → local
```

---

After:

```text id="natgw23"
10.0.0.0/16 → local

0.0.0.0/0 → NAT Gateway
```

---

Meaning:

```text id="natgw24"
Everything outside VPC
goes to NAT Gateway
```

---

# Security Groups

Huge exam difference.

---

NAT Instance:

```text id="natgw25"
Requires Security Groups
```

---

NAT Gateway:

```text id="natgw26"
No Security Groups
```

---

AWS manages everything.

---

# Bandwidth

NAT Instance:

```text id="natgw27"
Depends on EC2 Size
```

---

Examples:

```text id="natgw28"
t2.micro
m5.large
c5.xlarge
```

all different.

---

NAT Gateway:

```text id="natgw29"
Starts around 5 Gbps
```

and automatically scales.

---

Up to:

```text id="natgw30"
100 Gbps
```

---

No tuning required.

---

# Availability

## NAT Instance

Single EC2.

```text id="natgw31"
Instance Failure = NAT Failure
```

---

Need:

- Auto Scaling
- Scripts
- Failover

---

Manual effort.

---

## NAT Gateway

AWS-managed.

```text id="natgw32"
Highly Available
Within One AZ
```

---

No patching.

No failover scripts.

---

# AZ Scope

Important exam topic.

---

NAT Gateway:

```text id="natgw33"
AZ-specific resource
```

---

Created in:

```text id="natgw34"
One Availability Zone
```

---

Example:

```text id="natgw35"
eu-central-1a
```

---

# Multi-AZ Best Practice

Deploy:

```text id="natgw36"
NAT Gateway A
```

in:

```text id="natgw37"
AZ A
```

---

Deploy:

```text id="natgw38"
NAT Gateway B
```

in:

```text id="natgw39"
AZ B
```

---

Architecture:

```text id="natgw40"
PrivateSubnetA → NATGW-A

PrivateSubnetB → NATGW-B
```

---

Benefits:

```text id="natgw41"
Traffic stays inside its own AZ
```

---

# Demo Problem

NAT Instance removed.

---

Private Route Table:

```text id="natgw42"
0.0.0.0/0 → NAT Instance
```

---

Result:

```text id="natgw43"
Black Hole Route
```

---

Meaning:

```text id="natgw44"
Route target no longer exists.
```

---

Internet access fails.

---

# Demo Solution

Create:

```text id="natgw45"
DemoNATGW
```

---

Configuration:

```text id="natgw46"
Public Subnet A
```

---

Connectivity:

```text id="natgw47"
Public
```

---

Attach:

```text id="natgw48"
Elastic IP
```

---

Create.

---

# Activation

Initially:

```text id="natgw49"
Pending
```

---

Wait until:

```text id="natgw50"
Available
```

---

# Update Route Table

Remove:

```text id="natgw51"
Black Hole Route
```

---

Add:

```text id="natgw52"
0.0.0.0/0 → DemoNATGW
```

---

Save.

---

# Connectivity Test

From private EC2:

```bash
curl google.com
```

---

Result:

```text id="natgw53"
Success
```

---

Test:

```bash
ping google.com
```

---

Result:

```text id="natgw54"
Success
```

---

Private instance now has:

```text id="natgw55"
Outbound Internet Access
```

---

while remaining:

```text id="natgw56"
Private
```

---

# NAT Gateway Limitation

Very common exam trick.

---

Question:

Can a NAT Gateway serve EC2 instances in the same subnet?

Answer:

```text id="natgw57"
No
```

---

AWS recommendation:

```text id="natgw58"
NAT Gateway in Public Subnet

EC2 in Private Subnet
```

---

# NAT Gateway vs Bastion Host

Another exam favorite.

---

NAT Gateway:

```text id="natgw59"
Cannot SSH Into Instances
```

---

Purpose:

```text id="natgw60"
Outbound Internet Access
```

only.

---

Bastion Host:

```text id="natgw61"
Allows SSH Access
```

to private EC2.

---

Purpose:

```text id="natgw62"
Administrative Access
```

---

# NAT Gateway vs NAT Instance

| Feature | NAT Gateway | NAT Instance |
|----------|-------------|-------------|
| Managed Service | ✅ | ❌ |
| Scaling | Automatic | Manual |
| Availability | High in AZ | Manual |
| Security Groups | Not Used | Required |
| Elastic IP | Required | Required |
| Maintenance | None | Required |
| Patching | AWS | Customer |
| Bandwidth | Up to 100 Gbps | EC2 Size |
| Bastion Capability | ❌ | ✅ |
| Recommended | ✅ | ❌ |

---

# AWS Exam Memory Anchors

### NAT Gateway

```text id="natgw63"
Managed NAT Service
```

---

### Location

```text id="natgw64"
Public Subnet
```

---

### Requires

```text id="natgw65"
Elastic IP
```

---

### Requires

```text id="natgw66"
Internet Gateway
```

---

### Route Table

```text id="natgw67"
Private Subnet

0.0.0.0/0
→ NAT Gateway
```

---

### Security Groups

```text id="natgw68"
None
```

---

### Availability

```text id="natgw69"
Highly Available
Within One AZ
```

---

### Production Recommendation

```text id="natgw70"
NAT Gateway
```

---

# Most Important Exam Question

If a question says:

> Private EC2 instances need Internet access for software updates, package downloads, and API calls, while remaining inaccessible from the Internet.

Answer:

```text id="natgw71"
NAT Gateway
```

---

If the question says:

> Managed, scalable, highly available NAT solution

Answer:

```text id="natgw72"
NAT Gateway
```

---

# Final Memory Anchor

> A NAT Gateway is an AWS-managed service deployed in a public subnet with an Elastic IP. It allows EC2 instances in private subnets to initiate outbound Internet connections while remaining unreachable from the Internet. It is the recommended replacement for NAT Instances in production environments.

---