# 2026-05-09 — Egress-Only Internet Gateway (EOIGW)

# Why Does EOIGW Exist?

With IPv4, private subnets use:

```text
NAT Gateway
```

to access the internet without exposing EC2 instances.

---

But IPv6 is different.

In AWS:

```text
Every IPv6 address is public.
```

---

Problem:

If an EC2 instance has an IPv6 address, the internet can directly reach it.

---

We need a way to:

```text
Allow outbound traffic
```

while

```text
Blocking inbound traffic
```

---

AWS created:

```text
Egress-Only Internet Gateway
```

---

# What is EOIGW?

EOIGW means:

```text
Egress-Only Internet Gateway
```

---

Purpose:

```text
Outbound IPv6 Access Only
```

---

Think of it as:

```text
NAT Gateway
```

for

```text
IPv6
```

---

# EOIGW vs NAT Gateway

| Feature | NAT Gateway | EOIGW |
|---------|-------------|-------|
| Protocol | IPv4 | IPv6 |
| Outbound Internet | ✅ | ✅ |
| Inbound Internet | ❌ | ❌ |
| Requires Public Subnet | ✅ | ❌ |
| Address Translation | ✅ | ❌ |

---

# Why No NAT Translation?

IPv4:

```text
Private Address → NAT Translation → Public Address
```

---

IPv6:

```text
Already Public → No Translation Needed
```

---

EOIGW simply:

```text
Blocks inbound traffic
```

---

# EOIGW Behavior

Allowed:

```text
EC2 → Internet
```

---

Blocked:

```text
Internet → EC2
```

---

Diagram:

```text
EC2 → EOIGW → Internet
```

---

Return traffic is allowed.

---

New inbound connections are blocked.

---

# Public Subnet Architecture

Public subnet:

```text
EC2 → Internet Gateway → Internet
```

---

Traffic allowed:

```text
Outbound ✅
Inbound ✅
```

---

The EC2 instance is publicly reachable.

---

# Private Subnet Architecture

Private subnet:

```text
EC2 → EOIGW → Internet
```

---

Traffic allowed:

```text
Outbound ✅
```

---

Traffic blocked:

```text
Inbound ❌
```

---

# Architecture Comparison

## Public Subnet

```text
Internet
    │
Internet Gateway
    │
   EC2
```

Internet can initiate connections.

---

## Private Subnet

```text
Internet
    │
EOIGW
    │
   EC2
```

Internet cannot initiate connections.

---

# Route Tables

EOIGW requires:

```text
Route Table Updates
```

---

# Public Subnet Route Table

Local routes:

```text
10.0.0.0/16 → local

2600:abcd::/56 → local
```

---

Internet routes:

```text
0.0.0.0/0 → IGW

::/0 → IGW
```

---

Explanation:

```text
0.0.0.0/0
```

means:

```text
All IPv4 Traffic
```

---

```text
::/0
```

means:

```text
All IPv6 Traffic
```

---

# Private Subnet Route Table

Local routes:

```text
10.0.0.0/16 → local

2600:abcd::/56 → local
```

---

Internet routes:

```text
0.0.0.0/0 → NAT Gateway

::/0 → EOIGW
```

---

Architecture:

```text
IPv4 → NAT Gateway

IPv6 → EOIGW
```

---

# Typical Dual-Stack Private Subnet

```text
EC2 Instance
```

IPv4:

```text
10.0.1.25 → NAT Gateway → Internet
```

---

IPv6:

```text
2600:abcd::100 → EOIGW → Internet
```

---

# How Return Traffic Works

Example:

```text
EC2
```

requests:

```text
https://google.com
```

---

Flow:

```text
EC2 → EOIGW → Google
```

---

Google replies:

```text
Google → EOIGW → EC2
```

---

Allowed because:

```text
Connection was initiated internally.
```

---

# What Gets Blocked?

Attacker:

```text
Internet
```

tries:

```text
SSH → EC2
```

---

Flow:

```text
Internet → EOIGW = Blocked
```

---

No connection established.

---

# Security Groups Still Apply

EOIGW does NOT replace:

```text
Security Groups
```

---

Layers:

```text
Security Group + EOIGW
```

work together.

---

# EOIGW vs Internet Gateway

| Feature | Internet Gateway | EOIGW |
|---------|-----------------|-------|
| IPv4 Support | ✅ | ❌ |
| IPv6 Support | ✅ | ✅ |
| Outbound Access | ✅ | ✅ |
| Inbound Access | ✅ | ❌ |
| Public Subnet | ✅ | ❌ |
| Private Subnet | ❌ | ✅ |

---

# EOIGW vs NAT Gateway

| Feature | NAT Gateway | EOIGW |
|---------|-------------|-------|
| Protocol | IPv4 | IPv6 |
| Translation | Yes | No |
| Outbound Access | ✅ | ✅ |
| Inbound Access | ❌ | ❌ |
| Used in Private Subnets | ✅ | ✅ |

---

# Exam Scenarios

### Scenario 1

Question:

```text
Private subnet needs IPv6 internet access.
```

Answer:

```text
EOIGW
```

---

### Scenario 2

Question:

```text
Block inbound IPv6 connections from internet.
```

Answer:

```text
EOIGW
```

---

### Scenario 3

Question:

```text
Provide outbound-only IPv4 internet access.
```

Answer:

```text
NAT Gateway
```

---

### Scenario 4

Question:

```text
Provide full IPv6 internet access.
```

Answer:

```text
Internet Gateway
```

---

### Scenario 5

Question:

```text
Dual-stack private subnet.
```

Answer:

```text
0.0.0.0/0 → NAT Gateway

::/0 → EOIGW
```

---

# Memory Anchors

```text
Internet Gateway = IPv4 + IPv6 = Inbound + Outbound
```

---

```text
NAT Gateway = IPv4 = Outbound Only
```

---

```text
EOIGW = IPv6 = Outbound Only
```

---

```text
EOIGW = Private IPv6 Subnets
```

---

```text
::/0 = All IPv6 Traffic
```

---

```text
0.0.0.0/0 = All IPv4 Traffic
```

---

# Final Memory Anchor

> An Egress-Only Internet Gateway (EOIGW) provides outbound-only internet access for IPv6 traffic from private subnets. It is conceptually similar to a NAT Gateway for IPv4, except no address translation occurs because AWS IPv6 addresses are already public. EOIGW allows EC2 instances to initiate IPv6 connections while preventing the internet from initiating inbound connections.