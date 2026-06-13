# 2026-05-05 — AWS Direct Connect (DX)

# What is AWS Direct Connect?

AWS Direct Connect (DX) provides a:

```text
Dedicated Private Network Connection
```

between:

```text
Corporate Data Center
        ↕
AWS
```

without traversing the public internet.

---

Instead of:

```text
Corporate Network → Public Internet → AWS
```

you get:

```text
Corporate Network → Direct Connect Circuit → AWS
```

---

# Why Use Direct Connect?

Benefits:

### Higher Bandwidth

Large transfers become faster.

Examples:

- Database replication
- Backups
- Data lake ingestion
- Media workloads

---

### Lower Network Costs

Traffic avoids internet transit.

Useful when moving:

```text
TBs or PBs of data.
```

---

### Consistent Performance

Internet:

```text
Variable Latency
Variable Routing
```

Direct Connect:

```text
Predictable
Stable
Low Latency
```

---

### Hybrid Cloud

Perfect for:

```text
On-Premises + AWS
```

architectures.

---

# Direct Connect Architecture

```text
Corporate Data Center
          │
Customer Router
          │
Direct Connect Circuit
          │
AWS DX Location
          │
AWS Network
          │
VGW / DX Gateway
          │
VPC
```

---

# Direct Connect Location

AWS does not bring cables into your office.

Instead:

```text
AWS Direct Connect Location
```

acts as a meeting point.

---

You connect:

```text
Your Router
```

to

```text
AWS Router
```

inside the DX facility.

---

# Virtual Interfaces (VIF)

Traffic is separated using:

```text
Virtual Interfaces
```

or

```text
VIFs
```

---

Two important types appear on the exam.

---

# Private VIF

Used to access:

```text
VPC Resources
```

Examples:

- EC2
- RDS
- Internal Load Balancers

---

Architecture:

```text
On-Prem → Private VIF → VGW → VPC
```

---

# Public VIF

Used to access:

```text
AWS Public Services
```

Examples:

- S3
- Glacier
- DynamoDB Public Endpoints

---

Architecture:

```text
On-Prem → Public VIF → AWS Public Services
```

---

Important:

```text
Still stays on AWS backbone
```

not the public internet.

---

# Direct Connect Gateway

Allows one Direct Connect connection to access:

```text
Multiple VPCs
```

and

```text
Multiple Regions
```

---

Example:

```text
Corporate DC
       │
       ▼
DX Gateway
   /     \
  /       \
VPC-A    VPC-B
us-east-1 eu-west-1
```

---

# Connection Types

# 1. Dedicated Connection

Provisioned directly by AWS.

Speeds:

```text
1 Gbps
10 Gbps
100 Gbps
400 Gbps
```

---

Best for:

```text
Large Enterprises
```

---

# 2. Hosted Connection

Provisioned through a partner.

Speeds:

```text
50 Mbps
100 Mbps
500 Mbps
1 Gbps
25 Gbps
```

---

Best for:

```text
Smaller Organizations
```

---

# Direct Connect Setup Time

Important exam point.

---

VPN:

```text
Hours
```

---

Direct Connect:

```text
Weeks
Sometimes > 1 Month
```

---

Therefore:

```text
Not suitable for urgent migrations
```

---

# Security

Common exam trap.

---

Direct Connect provides:

```text
Private Connectivity
```

but

```text
NOT Encryption
```

---

Traffic is isolated.

However:

```text
Packets are NOT encrypted.
```

---

If encryption is required:

```text
VPN over Direct Connect
```

---

Architecture:

```text
Corporate DC
      │
IPSec VPN
      │
Direct Connect
      │
AWS
```

---

Best of both worlds:

```text
Private + Encrypted
```

---

# Direct Connect vs Site-to-Site VPN

| Feature | Direct Connect | Site-to-Site VPN |
|-----------|--------------|----------------|
| Transport | Dedicated Circuit | Public Internet |
| Encryption | No | Yes |
| Latency | Consistent | Variable |
| Throughput | Very High | Internet dependent |
| Setup Time | Weeks | Hours |
| Cost | Higher | Lower |
| Reliability | Higher | Lower |

---

# Exam Shortcut

Requirement:

```text
Fast Deployment
```

Answer:

```text
Site-to-Site VPN
```

---

Requirement:

```text
Dedicated Connection
Predictable Performance
```

Answer:

```text
Direct Connect
```

---

# Direct Connect Resiliency

Single DX connection:

```text
Single Point of Failure
```

---

AWS recommends redundancy.

---

# High Resiliency

```text
DX Location A
      │
Connection 1

DX Location B
      │
Connection 2
```

---

# Maximum Resiliency

Four connections.

```text
Location A
 ├─ Connection 1
 └─ Connection 2

Location B
 ├─ Connection 3
 └─ Connection 4
```

---

Protects against:

- Router failure
- Circuit failure
- Facility failure
- Regional issues

---

# Direct Connect + VPN Backup

One of the most common SAA exam questions.

---

Architecture:

```text
          Direct Connect
Corporate ───────────── AWS
      │
      │
      └──── VPN Backup ──── AWS
```

---

Normal operation:

```text
Traffic uses DX
```

---

DX failure:

```text
Traffic automatically uses VPN
```

---

Benefits:

```text
High Availability
Lower Cost
Fast Recovery
```

---

# Why Not Two Direct Connects?

Possible.

But:

```text
Very Expensive
```

---

VPN backup:

```text
Cheap
Easy
Common
```

---

Therefore many companies use:

```text
DX + VPN
```

instead of:

```text
DX + DX
```

---

# Exam Scenario

Question:

```text
Company needs a dedicated
private connection
between AWS and on-premises.
```

Answer:

```text
Direct Connect
```

---

Question:

```text
Connection must be encrypted.
```

Answer:

```text
VPN over Direct Connect
```

---

Question:

```text
Need backup if Direct Connect fails.
```

Answer:

```text
Site-to-Site VPN
```

---

Question:

```text
Need access to EC2
inside VPC.
```

Answer:

```text
Private VIF
```

---

Question:

```text
Need access to S3
without internet.
```

Answer:

```text
Public VIF
```

---

Question:

```text
Need one DX connection
for multiple VPCs
and regions.
```

Answer:

```text
Direct Connect Gateway
```

---

# Direct Connect Components Summary

### Customer Side

```text
Customer Router
```

---

### AWS Entry Point

```text
Direct Connect Location
```

---

### VPC Connectivity

```text
Private VIF
```

---

### Public AWS Services

```text
Public VIF
```

---

### Multiple VPCs

```text
Direct Connect Gateway
```

---

### Encryption

```text
VPN over DX
```

---

### Backup

```text
Site-to-Site VPN
```

---

# AWS SAA-C03 Memory Anchors

```text
DX = Dedicated Circuit
```

```text
VPN = Encrypted Internet
```

```text
Private VIF = VPC
```

```text
Public VIF = S3 / Public AWS Services
```

```text
DX Gateway = Multiple VPCs
```

```text
Need Encryption?
→ VPN over DX
```

```text
Need Backup?
→ Site-to-Site VPN
```

---

# Final Memory Anchor

> AWS Direct Connect provides a dedicated private connection between an on-premises environment and AWS. It offers predictable latency, high bandwidth, and lower network costs than internet-based connectivity. Direct Connect uses Private VIFs for VPC access, Public VIFs for AWS public services, and Direct Connect Gateways for multi-VPC and multi-region connectivity. Because Direct Connect is not encrypted by default, VPN over Direct Connect is commonly used when encryption is required. For resiliency, the most common architecture is Direct Connect as the primary connection and Site-to-Site VPN as the backup.