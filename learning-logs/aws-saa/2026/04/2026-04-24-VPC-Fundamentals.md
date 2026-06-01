# 2026-04-24 — Amazon VPC Fundamentals

# Core Mental Model

Think of a VPC as:

```text id="vpc1"
Your own private network inside AWS
```

Just like a company has its own network:

```text id="vpc2"
Office Network → Subnets → Servers
```

AWS provides:

```text id="vpc3"
VPC → Subnets → EC2 / RDS / Load Balancers
```

---

# 1. What is a VPC?

VPC stands for:

```text id="vpc4"
Virtual Private Cloud
```

A VPC is an isolated virtual network inside AWS.

Everything starts with a VPC.

---

# AWS Resources Typically Live Inside a VPC

- EC2
- RDS
- Elastic Load Balancers
- ECS
- EKS
- Lambda (optional)
- ElastiCache

---

# Exam Memory

```text id="vpc5"
No VPC = No Network
```

---

# 2. Default VPC

Every AWS account automatically receives:

```text id="vpc6"
One Default VPC
```

in every region.

Purpose:

```text id="vpc7"
Make AWS easy for beginners
```

---

# Default VPC Characteristics

### Internet Connectivity

Built-in:

```text id="vpc8"
Internet Gateway attached
```

---

### Public Subnets

Usually:

```text id="vpc9"
One subnet per Availability Zone
```

---

### Public IP Assignment

Enabled by default.

Launching an EC2 instance automatically gives:

```text id="vpc10"
Public IPv4 Address
```

---

# Why Beginners Love Default VPC

Launch EC2 →

```text id="vpc11"
Immediately reachable from Internet
```

No networking configuration required.

---

# 3. Default VPC Architecture

```text id="vpc12"
Default VPC
│
├── Subnet A (AZ-1)
├── Subnet B (AZ-2)
└── Subnet C (AZ-3)

↓

Main Route Table → Internet Gateway → Internet
```

---

# Components Included Automatically

### VPC

```text id="vpc13"
172.31.0.0/16
```

(typical default)

---

### Subnets

3+

Across multiple AZs.

---

### Route Table

Automatically created.

---

### Network ACL

Automatically created.

---

### Internet Gateway

Automatically attached.

---

# 4. Internet Connectivity

Default Route Table contains:

```text id="vpc14"
0.0.0.0/0 → Internet Gateway
```

Meaning:

```text id="vpc15"
Send all Internet traffic outside the VPC
```

---

# Exam Favorite

Without:

```text id="vpc16"
Internet Gateway
```

there is:

```text id="vpc17"
No Internet Access
```

---

# 5. Public IP Assignment

Default VPC enables:

```text id="vpc18"
Auto Assign Public IP
```

for subnets.

---

# Result

EC2 receives:

- Private IP
- Public IP
- Public DNS

Example:

```text id="vpc19"
ec2-12-34-56-78.compute.amazonaws.com
```

---

# 6. Why Production Rarely Uses Default VPC

AWS exam best practice:

```text id="vpc20"
Create a Custom VPC
```

instead.

Reasons:

- Better security
- Better subnet design
- Better IP planning
- Better compliance

---

# 7. Creating a Custom VPC

Example:

```text id="vpc21"
DemoVPC
```

CIDR:

```text id="vpc22"
10.0.0.0/16
```

---

# CIDR Limits

Minimum:

```text id="vpc23"
/28
```

16 IPs

---

Maximum:

```text id="vpc24"
/16
```

65,536 IPs

---

# AWS Exam Memory

```text id="vpc25"
VPC CIDR

Smallest:
/28

Largest:
/16
```

---

# 8. Allowed Private Ranges

AWS VPCs must use private IP ranges.

---

### Range #1

```text id="vpc26"
10.0.0.0/8
```

---

### Range #2

```text id="vpc27"
172.16.0.0/12
```

---

### Range #3

```text id="vpc28"
192.168.0.0/16
```

---

# Exam Question

Can you create:

```text id="vpc29"
8.8.8.0/24
```

for a VPC?

❌ No

Public address range.

---

# 9. Recommended VPC Sizes

### Small Environment

```text id="vpc30"
10.0.0.0/24
```

256 IPs

---

### Typical Production

```text id="vpc31"
10.0.0.0/16
```

65,536 IPs

---

### Large Enterprise

Multiple VPCs.

Example:

```text id="vpc32"
10.0.0.0/16
10.1.0.0/16
10.2.0.0/16
```

---

# 10. Avoid CIDR Overlap

Critical AWS networking rule:

```text id="vpc33"
Never overlap CIDRs
```

---

# Bad Example

VPC-A

```text id="vpc34"
10.0.0.0/16
```

VPC-B

```text id="vpc35"
10.0.0.0/16
```

---

Problem:

```text id="vpc36"
Routing ambiguity
```

---

# Good Example

VPC-A

```text id="vpc37"
10.0.0.0/16
```

VPC-B

```text id="vpc38"
10.1.0.0/16
```

---

# Exam Favorite

If VPC Peering is required:

```text id="vpc39"
CIDRs must not overlap
```

---

# 11. Additional CIDRs

A VPC can contain:

```text id="vpc40"
Up to 5 IPv4 CIDRs
```

Example:

```text id="vpc41"
10.0.0.0/16
10.1.0.0/16
10.2.0.0/16
```

---

Useful when:

```text id="vpc42"
VPC outgrows original CIDR
```

---

# 12. VPC Components Created Automatically

When DemoVPC is created:

AWS automatically creates:

---

### Main Route Table

```text id="vpc43"
Controls routing
```

---

### Main Network ACL

```text id="vpc44"
Controls subnet traffic
```

---

# Subnets Are NOT Created

Unlike Default VPC.

You must create them manually.

---

# 13. Typical Production Design

```text id="vpc45"
VPC
10.0.0.0/16

├── Public Subnet AZ-A
│   10.0.1.0/24
│
├── Public Subnet AZ-B
│   10.0.2.0/24
│
├── Private Subnet AZ-A
│   10.0.11.0/24
│
└── Private Subnet AZ-B
    10.0.12.0/24
```

---

# Public Resources

- ALB
- Bastion Host

---

# Private Resources

- RDS
- ECS
- Internal Applications

---

# 14. AWS Reserved Addresses

Every subnet reserves:

```text id="vpc46"
5 IP addresses
```

---

Example:

```text id="vpc47"
10.0.1.0/24
```

Total:

```text id="vpc48"
256
```

Usable:

```text id="vpc49"
251
```

---

# Exam Trap

Question:

```text id="vpc50"
How many usable IPs in AWS /24 subnet?
```

Answer:

```text id="vpc51"
251
```

NOT 254.

---

# AWS SAA Exam Memory Anchors

### Default VPC

```text id="vpc52"
Internet ready
```

---

### Production

```text id="vpc53"
Custom VPC
```

---

### VPC CIDR Size

```text id="vpc54"
/28 → smallest

/16 → largest
```

---

### Allowed Private Ranges

```text id="vpc55"
10.0.0.0/8

172.16.0.0/12

192.168.0.0/16
```

---

### Peering Requirement

```text id="vpc56"
No CIDR overlap
```

---

### Reserved Addresses

```text id="vpc57"
5 per subnet
```

---

# Final Memory Anchor

> A VPC is your private network in AWS. The default VPC is Internet-ready and beginner-friendly, while production environments should use custom VPCs with carefully planned CIDR ranges, subnets, routing, and security controls.

---