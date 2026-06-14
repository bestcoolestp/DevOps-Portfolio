# 2026-05-06 — AWS Transit Gateway (TGW)

# Why Do We Need Transit Gateway?

As AWS environments grow, networking becomes complicated.

Example:

```text
VPC-A ↔ VPC-B

VPC-A ↔ VPC-C

VPC-B ↔ VPC-C
```

This works for a few VPCs.

But what about:

```text
10 VPCs?
50 VPCs?
100 VPCs?
```

The number of peering connections explodes.

---

# VPC Peering Problem

For N VPCs:

```text
N × (N - 1) / 2
```

connections are required.

Example:

| VPCs | Peering Connections |
|--------|--------|
| 2 | 1 |
| 3 | 3 |
| 5 | 10 |
| 10 | 45 |
| 100 | 4,950 |

---

Clearly:

```text
Not Scalable
```

---

# Transit Gateway Solution

Transit Gateway acts as:

```text
Network Hub
```

for AWS networking.

---

Instead of:

```text
VPC-A ↔ VPC-B
VPC-A ↔ VPC-C
VPC-B ↔ VPC-C
```

you create:

```text
          Transit Gateway
                │
    ┌───────────┼───────────┐
    │           │           │
 VPC-A       VPC-B       VPC-C
```

---

This is called:

```text
Hub-and-Spoke Architecture
```

---

# What Can Transit Gateway Connect?

Transit Gateway can connect:

### AWS Resources

- VPCs
- Transit Gateways in other regions

---

### On-Premises Networks

- Site-to-Site VPN
- Direct Connect

---

### Multi-Account Environments

- VPCs in different AWS accounts

---

Architecture:

```text
Corporate DC
      │
      ▼
Direct Connect
      │
      ▼
Transit Gateway
 ┌────┼────┐
 │    │    │
VPC1 VPC2 VPC3
```

---

# Key Benefit: Transitive Routing

VPC Peering:

```text
Non-Transitive
```

---

Example:

```text
A ↔ B
B ↔ C
```

Does NOT mean:

```text
A ↔ C
```

---

Transit Gateway:

```text
Transitive
```

---

Example:

```text
          TGW
        /  |  \
       /   |   \
      A    B    C
```

All VPCs communicate through TGW.

---

# Massive Scalability

Transit Gateway supports:

```text
Thousands of VPCs
```

---

Much better than:

```text
Thousands of Peering Connections
```

---

# Regional Resource

Important exam point.

Transit Gateway is:

```text
Regional
```

---

Example:

```text
eu-central-1
```

TGW exists only in:

```text
eu-central-1
```

---

# Cross-Region Peering

Transit Gateways can peer across regions.

Example:

```text
TGW Frankfurt
       │
       │
       ▼
TGW Virginia
```

---

Architecture:

```text
eu-central-1
      │
     TGW
      │
Cross-Region Peering
      │
     TGW
      │
us-east-1
```

---

# Resource Access Manager (RAM)

Often appears on exams.

---

Need to share TGW across accounts?

Use:

```text
AWS RAM
(Resource Access Manager)
```

---

Example:

```text
Account A
     │
 Transit Gateway
     │
AWS RAM
     │
     ▼
Account B
Account C
Account D
```

---

# Transit Gateway Route Tables

TGW has its own:

```text
Route Tables
```

---

Used to control:

```text
Who can talk to whom
```

---

Example:

```text
Dev VPC ↔ Transit Gateway ↔ Shared Services VPC
```

Allowed.

---

But:

```text
Dev VPC ↔ Production VPC
```

Blocked.

---

Controlled through TGW route tables.

---

# Transit Gateway + VPN

Common architecture:

```text
Corporate DC
      │
Site-to-Site VPN
      │
Transit Gateway
      │
VPCs
```

---

Instead of:

```text
VPN → VPC-A
VPN → VPC-B
VPN → VPC-C
```

you only connect once:

```text
VPN → TGW
```

---

Much simpler.

---

# ECMP (Equal-Cost Multi-Path Routing)

One of the most important TGW exam topics.

---

# What is ECMP?

Allows:

```text
Multiple VPN Tunnels
```

to be used simultaneously.

---

Without ECMP:

```text
Tunnel 1 Active
Tunnel 2 Standby
```

---

With ECMP:

```text
Tunnel 1 Active
Tunnel 2 Active
```

---

Result:

```text
Higher Throughput
```

---

# Site-to-Site VPN Limitation

Normal VPN:

```text
2 tunnels
```

but usually:

```text
One Active
One Standby
```

---

Maximum throughput:

```text
~1.25 Gbps
```

---

# VPN + Transit Gateway

With ECMP enabled:

```text
Tunnel 1 Active
Tunnel 2 Active
```

---

Maximum throughput:

```text
~2.5 Gbps
```

---

# Multiple VPN Attachments

Even more bandwidth:

```text
VPN #1
VPN #2
VPN #3
```

all attached to TGW.

---

Example:

```text
VPN1 ─┐
VPN2 ─┼─ Transit Gateway
VPN3 ─┘
```

---

Bandwidth increases.

---

Exam shortcut:

```text
Need VPN bandwidth scaling?
```

Answer:

```text
Transit Gateway + ECMP
```

---

# Direct Connect + Transit Gateway

Large enterprises commonly use:

```text
Corporate DC
      │
Direct Connect
      │
DX Gateway
      │
Transit Gateway
      │
Multiple VPCs
```

---

Benefits:

- One DX connection
- Multiple VPCs
- Multiple accounts

---

Architecture:

```text
Corporate DC
      │
      ▼
Direct Connect
      │
      ▼
DX Gateway
      │
      ▼
Transit Gateway
 ┌────┼────┬────┐
 │    │    │    │
VPC1 VPC2 VPC3 VPC4
```

---

# Multi-Account Architecture

Very common exam scenario.

---

Without TGW:

```text
Account A → VPC
Account B → VPC
Account C → VPC

Separate networking
```

---

With TGW:

```text
Transit Gateway
   │    │    │
   ▼    ▼    ▼
AcctA AcctB AcctC
```

---

Centralized connectivity.

---

# Transit Gateway Cost

Important exam note.

Transit Gateway is NOT free.

You pay for:

### Attachments

Examples:

- VPC attachment
- VPN attachment

---

### Data Processing

Charged:

```text
Per GB
```

through TGW.

---

# Transit Gateway vs VPC Peering

| Feature | Transit Gateway | VPC Peering |
|-----------|-----------|-----------|
| Scales to many VPCs | ✅ | ❌ |
| Transitive routing | ✅ | ❌ |
| Central hub | ✅ | ❌ |
| Multi-account sharing | ✅ | Limited |
| Cross-region | ✅ | ✅ |
| IP Multicast | ✅ | ❌ |
| Cost | Higher | Lower |

---

# Transit Gateway vs Direct Connect Gateway

Many students confuse these.

---

### Direct Connect Gateway

Purpose:

```text
Share Direct Connect
```

---

### Transit Gateway

Purpose:

```text
Connect Networks
```

---

Common architecture:

```text
Direct Connect Gateway
         │
         ▼
Transit Gateway
         │
         ▼
Many VPCs
```

---

# Transit Gateway and IP Multicast

Very famous exam keyword.

---

Question:

```text
Which AWS service supports IP multicast?
```

Answer:

```text
Transit Gateway
```

---

No other AWS networking service supports multicast.

---

# Exam Scenarios

### Scenario 1

Need to connect:

```text
100 VPCs
```

Answer:

```text
Transit Gateway
```

---

### Scenario 2

Need:

```text
Transitive Routing
```

Answer:

```text
Transit Gateway
```

---

### Scenario 3

Need:

```text
Share networking across multiple AWS accounts
```

Answer:

```text
Transit Gateway + RAM
```

---

### Scenario 4

Need:

```text
IP Multicast
```

Answer:

```text
Transit Gateway
```

---

### Scenario 5

Need:

```text
Higher VPN Throughput
```

Answer:

```text
Transit Gateway + ECMP
```

---

### Scenario 6

Need:

```text
One Direct Connect for many VPCs
```

Answer:

```text
Direct Connect Gateway + Transit Gateway
```

---

# Memory Anchors

```text
VPC Peering = Small Scale
```

```text
Transit Gateway = Large Scale
```

```text
Transit Gateway = Hub-and-Spoke
```

```text
Transit Gateway = Transitive Routing
```

```text
Transit Gateway = IP Multicast
```

```text
Transit Gateway + ECMP = VPN Bandwidth Scaling
```

```text
Transit Gateway + RAM = Multi-Account Networking
```

---

# Final Memory Anchor

> AWS Transit Gateway is a regional hub-and-spoke networking service that provides transitive connectivity between VPCs, VPNs, Direct Connect connections, and on-premises networks. It simplifies large-scale AWS networking, supports cross-account sharing through AWS RAM, enables ECMP for higher VPN throughput, and is the only AWS networking service that supports IP multicast.