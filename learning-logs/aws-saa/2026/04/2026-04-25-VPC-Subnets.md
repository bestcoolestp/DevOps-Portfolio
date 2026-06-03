# 2026-04-25 — Amazon VPC Subnets

# Core Mental Model

A subnet is simply:

```text id="sub1"
A smaller network carved out of a VPC
```

Think of it like:

```text id="sub2"
VPC = Entire Office Building

Subnet = Individual Floor
```

---

# 1. What is a Subnet?

A subnet is a portion of the IP address range assigned to a VPC.

Example:

```text id="sub3"
VPC
10.0.0.0/16
```

contains:

```text id="sub4"
10.0.0.0/24

10.0.1.0/24

10.0.2.0/24

10.0.16.0/20
```

and many more.

---

# Hierarchy

```text id="sub5"
AWS Region → VPC → Subnet → EC2 / RDS / ELB
```

---

# 2. Why Subnets Exist

Subnets allow:

- Network segmentation
- Security separation
- High availability
- Routing control

---

# Example

Public resources:

```text id="sub6"
ALB
Bastion Host
```

Private resources:

```text id="sub7"
RDS
Application Servers
```

---

# 3. AWS Reserved IP Addresses

AWS reserves:

```text id="sub8"
5 IP addresses inside every subnet.
```

---

# Reserved Addresses

| Address | Purpose |
|----------|----------|
| .0 | Network Address |
| .1 | VPC Router |
| .2 | Amazon DNS |
| .3 | Reserved |
| Last IP | Reserved |

---

# Example

Subnet:

```text id="sub9"
10.0.0.0/24
```

---

Total IPs:

```text id="sub10"
256
```

---

Usable:

```text id="sub11"
251
```

---

# AWS Exam Favorite

Question:

```text id="sub12"
How many usable IPs in /24?
```

Answer:

```text id="sub13"
251
```

NOT:

```text id="sub14"
254
```

because AWS reserves 5.

---

# 4. Subnet Sizing Cheat Sheet

| CIDR | Total IPs | AWS Usable |
|--------|-----------|------------|
| /28 | 16 | 11 |
| /27 | 32 | 27 |
| /26 | 64 | 59 |
| /25 | 128 | 123 |
| /24 | 256 | 251 |
| /23 | 512 | 507 |
| /22 | 1024 | 1019 |
| /20 | 4096 | 4091 |

---

# Important Exam Trap

Need:

```text id="sub15"
29 usable IPs
```

---

Would:

```text id="sub16"
/27
```

work?

---

No.

Because:

```text id="sub17"
/27
=
32 total
=
27 usable
```

---

Correct answer:

```text id="sub18"
/26
```

because:

```text id="sub19"
64 total
59 usable
```

---

# 5. Availability Zones and Subnets

Each subnet belongs to:

```text id="sub20"
One Availability Zone only
```

---

Example:

```text id="sub21"
PublicSubnetA → eu-central-1a
```

---

Cannot span:

```text id="sub22"
eu-central-1a
and
eu-central-1b
```

---

# Exam Memory

```text id="sub23"
One subnet = One AZ
```

---

# 6. DemoVPC Architecture

VPC:

```text id="sub24"
10.0.0.0/16
```

---

Created Subnets:

```text id="sub25"
PublicSubnetA
10.0.0.0/24

PublicSubnetB
10.0.1.0/24

PrivateSubnetA
10.0.16.0/20

PrivateSubnetB
10.0.32.0/20
```

---

Visual Layout

```text id="sub26"
DemoVPC
10.0.0.0/16

├── PublicSubnetA
│   10.0.0.0/24
│   AZ-a
│
├── PublicSubnetB
│   10.0.1.0/24
│   AZ-b
│
├── PrivateSubnetA
│   10.0.16.0/20
│   AZ-a
│
└── PrivateSubnetB
    10.0.32.0/20
    AZ-b
```

---

# 7. High Availability Design

AWS best practice:

```text id="sub27"
At least 2 AZs
```

---

Why?

Because:

```text id="sub28"
AZ-A failure → AZ-B still operational
```

---

Example:

```text id="sub29"
PublicSubnetA
PublicSubnetB
```

used by:

```text id="sub30"
Application Load Balancer
```

---

# Exam Favorite

Question:

```text id="sub31"
How do you make an application highly available?
```

Answer:

```text id="sub32"
Deploy resources across multiple AZs
```

---

# 8. Public vs Private Subnets

At creation time:

```text id="sub33"
All subnets are identical
```

---

Nothing makes a subnet public yet.

---

Public/private status depends on:

```text id="sub34"
Route Tables
```

---

# Public Subnet

Contains route:

```text id="sub35"
0.0.0.0/0 → Internet Gateway
```

---

# Private Subnet

No direct route to Internet Gateway.

Typically uses:

```text id="sub36"
NAT Gateway
```

for outbound Internet access.

---

# Exam Memory

```text id="sub37"
Public = Internet Gateway Route

Private = No Internet Gateway Route
```

---

# 9. Overlapping CIDRs

Never overlap subnet ranges.

---

Bad:

```text id="sub38"
10.0.0.0/24

10.0.0.0/24
```

---

Bad:

```text id="sub39"
10.0.0.0/24

10.0.0.128/25
```

(overlap)

---

Good:

```text id="sub40"
10.0.0.0/24

10.0.1.0/24
```

---

# Exam Favorite

AWS prevents overlapping subnets inside a VPC.

---

# 10. Why Use Different Sizes?

Public Subnets

Often smaller:

```text id="sub41"
/24
```

because:

- Load balancers
- Bastion hosts
- NAT gateways

need fewer addresses.

---

Private Subnets

Often larger:

```text id="sub42"
/20
```

because:

- EC2 fleets
- Containers
- Databases

consume more IPs.

---

# Example Capacity

### PublicSubnetA

```text id="sub43"
10.0.0.0/24
```

Usable:

```text id="sub44"
251
```

---

### PrivateSubnetA

```text id="sub45"
10.0.16.0/20
```

Usable:

```text id="sub46"
4091
```

---

# 11. Production Architecture

Typical AWS production layout:

```text id="sub47"
Internet
↓
ALB

├── PublicSubnetA
├── PublicSubnetB

↓

Application Tier

├── PrivateSubnetA
├── PrivateSubnetB

↓

Database Tier

├── PrivateSubnetA
├── PrivateSubnetB
```

---

# AWS SAA Exam Memory Anchors

### Subnet

```text id="sub48"
Subdivision of VPC
```

---

### One Subnet

```text id="sub49"
One AZ
```

---

### Reserved IPs

```text id="sub50"
5
```

---

### Public Subnet

```text id="sub51"
Route to Internet Gateway
```

---

### Private Subnet

```text id="sub52"
No Internet Gateway route
```

---

### High Availability

```text id="sub53"
Multiple AZs
```

---

### Need 29 Usable IPs

```text id="sub54"
/26
```

NOT:

```text id="sub55"
/27
```

---

# Final Memory Anchor

> A subnet is a slice of a VPC's IP range that exists in a single Availability Zone. AWS reserves 5 IP addresses in every subnet, and whether a subnet is public or private depends entirely on its route table configuration.

---