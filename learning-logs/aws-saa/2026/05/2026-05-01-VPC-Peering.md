# 2026-05-01 — AWS VPC Peering

# What is VPC Peering?

VPC Peering creates a private network connection between two VPCs.

After peering is established:

```text
VPC A  <------>  VPC B
```

resources can communicate using private IP addresses.

No Internet Gateway.

No NAT Gateway.

No VPN.

No public internet.

---

# Why Use VPC Peering?

Typical scenarios:

- Separate development and production VPCs
- Different AWS accounts
- Different AWS regions
- Shared services architecture

Example:

```text
Account A
 └─ VPC A

Account B
 └─ VPC B
```

Communication occurs over AWS's private backbone network.

---

# Supported Connections

VPC Peering supports:

```text
Same Account
Same Region
```

```text
Same Account
Different Region
```

```text
Different Accounts
Same Region
```

```text
Different Accounts
Different Region
```

All are supported.

---

# CIDR Blocks Must Not Overlap

Most common exam question.

---

Valid:

```text
VPC A
10.0.0.0/16

VPC B
172.16.0.0/16
```

---

Invalid:

```text
VPC A
10.0.0.0/16

VPC B
10.0.0.0/16
```

or

```text
VPC A
10.0.0.0/16

VPC B
10.0.1.0/24
```

because the address ranges overlap.

---

AWS will reject the peering request.

---

# VPC Peering Workflow

Step 1

Create peering request.

```text
Requester VPC → Accepter VPC
```

---

Step 2

Accept the request.

---

Step 3

Update route tables.

---

Step 4

Update Security Groups and NACLs if required.

---

Step 5

Communication works.

---

# Route Tables Are Required

Peering alone does not create connectivity.

This is heavily tested.

---

Example:

```text
VPC A
10.0.0.0/16

VPC B
172.16.0.0/16
```

---

VPC A Route Table:

```text
Destination:
172.16.0.0/16

Target:
Peering Connection
```

---

VPC B Route Table:

```text
Destination:
10.0.0.0/16

Target:
Peering Connection
```

---

Without route updates:

```text
Peering Exists ≠ Connectivity
```

---

# Security Groups

Security Groups still control traffic.

Example:

```text
EC2-A
10.0.1.10

EC2-B
172.16.1.20
```

---

Peering exists.

Routes exist.

---

But if SG blocks traffic:

```text
Communication Fails
```

---

Must allow required ports.

Example:

```text
TCP 80
TCP 443
TCP 3306
```

depending on workload.

---

# Security Group References

Very common exam topic.

---

Within the same region:

Security Groups can reference a Security Group in a peered VPC.

Example:

```text
Security Group A

Allow MySQL 3306
Source:
Security Group B
```

instead of:

```text
172.16.0.0/16
```

---

Benefits:

- Cleaner configuration
- No hardcoded CIDRs
- Automatically follows instance changes

---

Supported:

```text
Same Region
Peered VPCs
Cross Accounts
```

---

# Non-Transitive Routing

The most important VPC Peering rule.

---

Example:

```text
VPC A <----> VPC B

VPC B <----> VPC C
```

---

Question:

Can VPC A reach VPC C?

Answer:

```text
NO
```

---

Why?

VPC Peering is:

```text
Non-Transitive
```

---

AWS will not forward traffic.

---

Visual:

```text
A <---> B <---> C

A ----X----> C
```

---

To communicate:

```text
A <---> C
```

must be created separately.

---

# Exam Example

Given:

```text
A ↔ B

B ↔ C
```

Need:

```text
A ↔ C
```

Solution:

```text
Create Another Peering Connection
```

not:

```text
Update Route Table
```

---

# Cross-Region Peering

Supported.

Example:

```text
eu-central-1
      ↕

us-east-1
```

---

Traffic stays on AWS backbone.

Benefits:

- Lower latency
- Better security
- No public internet exposure

---

# VPC Peering Limits

Every peering connection is:

```text
1-to-1
```

---

Large architectures can become:

```text
Full Mesh
```

Example:

```text
A ↔ B
A ↔ C
A ↔ D
B ↔ C
B ↔ D
C ↔ D
```

Complex and difficult to manage.

---

In large environments AWS usually recommends:

```text
Transit Gateway
```

instead of many peering connections.

---

# VPC Peering vs Transit Gateway

| Feature | VPC Peering | Transit Gateway |
|-----------|------------|----------------|
| Setup | Simple | More Advanced |
| Cost | Lower | Higher |
| Scalability | Poor at Scale | Excellent |
| Transitive Routing | No | Yes |
| Full Mesh Required | Yes | No |

---

# Architecture Example

```text
Production VPC
10.0.0.0/16
        │
        │ Peering
        ▼
Shared Services VPC
172.16.0.0/16
```

Shared services:

```text
AD Servers
Monitoring
Logging
DNS
```

can be accessed privately.

---

# AWS SAA Exam Memory Anchors

### VPC Peering

```text
Private VPC-to-VPC Connectivity
```

---

### CIDR Requirement

```text
No Overlapping CIDRs
```

---

### Routing

```text
Update Route Tables
```

---

### Security

```text
Security Groups Still Apply
```

---

### Peering

```text
Non-Transitive
```

---

### Large Multi-VPC Environment

```text
Use Transit Gateway
```

---

# Final Memory Anchor

> VPC Peering creates a private, non-transitive connection between two VPCs. CIDR ranges must not overlap, route tables must be updated on both sides, and security groups continue to control traffic. For many interconnected VPCs, Transit Gateway is usually preferred over multiple peering connections.

---
