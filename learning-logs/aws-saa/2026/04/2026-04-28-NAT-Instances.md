# 2026-04-28 — NAT Instances

# Why NAT Exists

We already have:

```text id="nat1"
Public Subnet → Internet Access
```

because:

```text id="nat2"
0.0.0.0/0 → Internet Gateway
```

---

But private subnets have:

```text id="nat3"
No Internet Gateway Route
```

---

Result:

```text id="nat4"
Private EC2 Cannot Access Internet
```

---

# The Problem

Example:

```text id="nat5"
Private EC2 = 10.0.16.20
```

needs to:

- Download packages
- Run updates
- Access APIs
- Pull Docker images

---

But:

```text id="nat6"
Private EC2 = No Public IP
```

---

Therefore:

```text id="nat7"
Internet cannot reach it
```

and

```text id="nat8"
it cannot directly reach Internet resources.
```

---

# What is NAT?

NAT stands for:

```text id="nat9"
Network Address Translation
```

---

Purpose:

```text id="nat10"
Allow private instances to access the Internet without becoming public.
```

---

# Important AWS Exam Concept

NAT provides:

```text id="nat11"
Outbound Internet Access
```

---

NAT does NOT provide:

```text id="nat12"
Inbound Internet Access
```

---

Exam favorite:

```text id="nat13"
Private EC2 can initiate connections.

Internet cannot initiate connections.
```

---

# NAT Instance

A NAT Instance is:

```text id="nat14"
A special EC2 instance that performs NAT.
```

---

Location:

```text id="nat15"
Public Subnet
```

---

Because it needs:

```text id="nat16"
Internet Gateway Access
```

---

# Architecture

```text id="nat17"
Internet
    ▲
    │
Internet Gateway
    ▲
    │
NAT Instance
(Public Subnet)
    ▲
    │
Private EC2
(Private Subnet)
```

---

# Traffic Flow

Private EC2:

```text id="nat18"
10.0.16.20
```

wants to reach:

```text id="nat19"
50.60.4.10
```

---

Request path:

```text id="nat20"
Private EC2 → NAT Instance → Internet
```

---

Response path:

```text id="nat21"
Internet → NAT Instance → Private EC2
```

---

# The Translation Process

Original packet:

```text id="nat22"
Source:
10.0.16.20

Destination:
50.60.4.10
```

---

Internet routers reject:

```text id="nat23"
Private IP Addresses
```

---

So NAT rewrites:

```text id="nat24"
Source: 12.34.56.78 (NAT Public IP)

Destination: 50.60.4.10
```

---

Remote server sees:

```text id="nat25"
12.34.56.78
```

not:

```text id="nat26"
10.0.16.20
```

---

# Reply Traffic

Server responds:

```text id="nat27"
50.60.4.10 → 12.34.56.78
```

---

NAT translates back:

```text id="nat28"
12.34.56.78 → 10.0.16.20
```

---

Private EC2 receives response.

---

# Why Disable Source/Destination Check?

Normal EC2 behavior:

```text id="nat29"
Only process packets for itself.
```

---

NAT behavior:

```text id="nat30"
Forward packets for other instances.
```

---

Therefore:

```text id="nat31"
Source/Destination Check MUST be disabled
```

---

Exam favorite:

```text id="nat32"
NAT Instance = Disable Source/Destination Check
```

---

# Elastic IP Requirement

NAT needs:

```text id="nat33"
Fixed Public IP
```

---

Solution:

```text id="nat34"
Elastic IP
```

---

Architecture:

```text id="nat35"
Elastic IP → NAT Instance → Private EC2
```

---

# Route Table Configuration

Private subnet route table:

Before:

```text id="nat36"
10.0.0.0/16 → local
```

---

After:

```text id="nat37"
10.0.0.0/16 → local

0.0.0.0/0 → NAT Instance
```

---

Meaning:

```text id="nat38"
All non-local traffic goes to NAT
```

---

# Security Group Requirements

## NAT Security Group

Inbound:

| Protocol | Source |
|-----------|----------|
| HTTP | VPC CIDR |
| HTTPS | VPC CIDR |
| ICMP | VPC CIDR |
| SSH | Trusted IP |

---

Outbound:

```text id="nat39"
Allow Internet Traffic
```

---

# Demo Environment

VPC:

```text id="nat40"
DemoVPC
```

---

Public subnet:

```text id="nat41"
PublicSubnetA
```

contains:

```text id="nat42"
NAT Instance
```

---

Private subnet:

```text id="nat43"
PrivateSubnetA
```

contains:

```text id="nat44"
Private EC2
```

---

# Before NAT

From private EC2:

```bash
ping google.com
```

---

Result:

```text id="nat45"
Failed
```

---

Also:

```bash
curl google.com
```

---

Result:

```text id="nat46"
Failed
```

---

Because:

```text id="nat47"
No Internet Route
```

---

# NAT Deployment Steps

## Step 1

Launch NAT AMI.

---

AWS Community AMI:

```text id="nat48"
Amazon VPC NAT
```

---

## Step 2

Assign Elastic IP.

---

## Step 3

Disable:

```text id="nat49"
Source/Destination Check
```

---

## Step 4

Update private route table.

```text id="nat50"
0.0.0.0/0 → NAT Instance
```

---

# After NAT

Private EC2:

```bash
ping google.com
```

---

Result:

```text id="nat51"
Success
```

---

Test:

```bash
curl google.com
```

---

Result:

```text id="nat52"
HTML Returned
```

---

Private EC2 now has:

```text id="nat53"
Outbound Internet Access
```

---

while remaining:

```text id="nat54"
Private
```

---

# NAT Instance Limitations

AWS heavily emphasizes these.

---

## Limitation 1

Not highly available.

```text id="nat55"
Single EC2 Failure = Internet Failure
```

---

## Limitation 2

Bandwidth limited.

```text id="nat56"
Performance depends on instance size
```

---

Example:

```text id="nat57"
t2.micro ≠ m5.large
```

---

## Limitation 3

Manual maintenance.

Need:

- Patching
- Monitoring
- Scaling

---

## Limitation 4

Manual HA design.

Need:

```text id="nat58"
Multiple NAT Instances
```

plus:

```text id="nat59"
Auto Scaling
```

---

# AWS Deprecation

Official support ended:

```text id="nat60"
December 31, 2020
```

---

AWS recommendation:

```text id="nat61"
Use NAT Gateway
```

---

# NAT Gateway vs NAT Instance

| Feature | NAT Instance | NAT Gateway |
|-----------|-------------|-------------|
| Managed | ❌ | ✅ |
| High Availability | ❌ | ✅ |
| Scaling | Manual | Automatic |
| Bandwidth | Instance Size | AWS Managed |
| Security Groups | Required | Not Used |
| Maintenance | Required | None |
| Recommended | ❌ | ✅ |

---

# Exam Memory Anchors

### NAT Instance

```text id="nat62"
EC2 performing NAT
```

---

### Location

```text id="nat63"
Public Subnet
```

---

### Requirement

```text id="nat64"
Elastic IP
```

---

### Requirement

```text id="nat65"
Disable Source/Destination Check
```

---

### Route Table

```text id="nat66"
Private Route Table

0.0.0.0/0 → NAT Instance
```

---

### Purpose

```text id="nat67"
Private EC2 → Internet
```

---

### Does NOT Allow

```text id="nat68"
Internet → Private EC2
```

---

### Modern AWS Answer

```text id="nat69"
NAT Gateway
```

---

# Most Important Exam Question

If a question says:

> Private EC2 instances need Internet access for updates, but must not be publicly reachable.

Answer:

```text id="nat70"
NAT Gateway
```

---

If the question specifically discusses:

```text id="nat71"
Disable Source/Destination Check
```

or

```text id="nat72"
Elastic IP on EC2
```

then it is referring to:

```text id="nat73"
NAT Instance
```

---

# Final Memory Anchor

> A NAT Instance is an EC2 instance in a public subnet that performs Network Address Translation, allowing EC2 instances in private subnets to initiate outbound Internet connections. It requires an Elastic IP, disabled source/destination checks, and route table entries pointing private subnet traffic to the NAT instance. Today, NAT Gateway is the preferred AWS solution.

---