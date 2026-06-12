# 2026-05-04 — AWS Site-to-Site VPN & VPN CloudHub

# What is a Site-to-Site VPN?

A Site-to-Site VPN securely connects:

```text
Corporate Data Center <------> AWS VPC
```

using encrypted tunnels over the public internet.

---

Instead of:

```text
Employees → Internet → AWS
```

you create:

```text
Corporate Network <--> Encrypted VPN Tunnel <--> AWS VPC
```

---

# Why Use Site-to-Site VPN?

Common use cases:

- Hybrid cloud
- Datacenter migration
- Backup environments
- Disaster recovery
- Extending on-premises applications into AWS

---

Example:

```text
Corporate LAN
192.168.1.0/24

AWS VPC
10.0.0.0/16
```

Resources communicate privately.

---

# High-Level Architecture

```text
On-Premises
      │
Customer Gateway (CGW)
      │
═══════════════════════
 Encrypted VPN Tunnel
═══════════════════════
      │
Virtual Private Gateway (VGW)
      │
AWS VPC
```

---

# Key Components

Two components always appear.

---

# 1. Customer Gateway (CGW)

Customer side VPN device.

Located:

```text
On-Premises
```

Examples:

- Cisco
- Juniper
- Fortinet
- pfSense
- StrongSwan

---

Requirements:

```text
Public IP Address
```

or

```text
Behind NAT + NAT-T Enabled
```

---

# 2. Virtual Private Gateway (VGW)

AWS side VPN concentrator.

Attached to:

```text
One VPC
```

---

Acts as:

```text
VPN Endpoint
```

inside AWS.

---

# VPN Tunnel

Traffic flows through:

```text
Internet
```

but remains encrypted.

---

Visual:

```text
On-Prem → Encrypted Tunnel → AWS
```

---

Unlike Direct Connect:

```text
Uses Public Internet
```

---

# Site-to-Site VPN Workflow

Step 1

Create:

```text
Customer Gateway
```

---

Step 2

Create:

```text
Virtual Private Gateway
```

---

Step 3

Attach VGW to VPC.

---

Step 4

Create VPN Connection.

---

Step 5

Download vendor configuration.

Example:

```text
Cisco
Fortinet
Juniper
Palo Alto
```

---

Step 6

Configure on-premises router/firewall.

---

Step 7

Verify connectivity.

---

# Dynamic vs Static Routing

Two options.

---

## Static Routing

Manually define routes.

Example:

```text
192.168.1.0/24
```

---

## Dynamic Routing

Uses:

```text
BGP (Border Gateway Protocol)
```

Recommended.

---

Advantages:

```text
Automatic Route Updates
Failover
Better Scalability
```

---

# Route Propagation

Very important exam topic.

---

VGW learns routes.

However:

```text
Route Tables
```

must receive them.

---

Enable:

```text
Route Propagation
```

on VPC route tables.

---

Without propagation:

```text
VPN Tunnel = UP
Connectivity = FAIL
```

---

# Example Route Table

Before:

```text
10.0.0.0/16 → Local
```

---

After propagation:

```text
10.0.0.0/16 → Local

192.168.1.0/24 → VGW
```

---

Now AWS knows how to reach:

```text
Corporate Network
```

---

# Security Group Requirements

Another common exam trap.

---

VPN works.

Routes work.

Still cannot ping.

Why?

---

Security Group.

Must allow:

```text
ICMP
```

if testing with ping.

---

Example:

```text
Inbound ICMP
Source:
192.168.1.0/24
```

---

Without this:

```text
Ping Fails
```

even though VPN is healthy.

---

# Common Troubleshooting

Problem:

```text
VPN Tunnel UP
Cannot Ping
```

Check:

### Route Propagation

```text
Enabled?
```

---

### Security Groups

```text
ICMP Allowed?
```

---

### NACLs

```text
Traffic Blocked?
```

---

### BGP

```text
Routes Learned?
```

---

# Site-to-Site VPN vs Direct Connect

Very common comparison.

---

| Feature | Site-to-Site VPN | Direct Connect |
|-----------|----------------|----------------|
| Uses Internet | Yes | No |
| Encryption | Yes | No (optional VPN over DX) |
| Setup Speed | Fast | Slower |
| Cost | Lower | Higher |
| Latency | Variable | Consistent |
| Bandwidth | Internet dependent | Dedicated |
| Reliability | Lower | Higher |

---

# Exam Shortcut

Requirement:

```text
Quick Hybrid Connectivity
```

Answer:

```text
Site-to-Site VPN
```

---

Requirement:

```text
Dedicated Private Connection
Predictable Performance
```

Answer:

```text
Direct Connect
```

---

# AWS VPN CloudHub

CloudHub extends Site-to-Site VPN.

---

Problem:

Multiple branch offices.

```text
Branch A
Branch B
Branch C
```

Need communication.

---

Traditional:

```text
A ↔ B
A ↔ C
B ↔ C
```

Many tunnels.

---

CloudHub:

```text
         AWS VGW
        /   |   \
       /    |    \
      A     B     C
```

---

Single central hub.

---

# CloudHub Requirements

### Multiple VPN Connections

```text
Same VGW
```

---

### Dynamic Routing

```text
BGP Required
```

---

### Route Propagation

Must be enabled.

---

# CloudHub Traffic Flow

Example:

```text
Branch A → VPN → VGW → VPN → Branch B
```

---

Traffic still uses:

```text
Public Internet
```

but remains encrypted.

---

# CloudHub Use Cases

- Branch office connectivity
- Small WAN replacement
- Multi-site communication
- Hybrid networking

---

# Architecture Example

```text
Branch Office A
192.168.1.0/24
       │
       ▼
     VPN
       │
       ▼
      VGW
       ▲
       │
     VPN
       │
       ▼
Branch Office B
192.168.2.0/24
```

---

# AWS SAA Exam Memory Anchors

### AWS Side

```text
VGW
Virtual Private Gateway
```

---

### Customer Side

```text
CGW
Customer Gateway
```

---

### Encryption

```text
Always Encrypted
```

---

### Transport

```text
Public Internet
```

---

### Route Propagation

```text
Must Be Enabled
```

---

### Ping Testing

```text
Allow ICMP
```

---

### Multiple Sites

```text
VPN CloudHub
```

---

### Dynamic Routing

```text
BGP
```

---

# Common Exam Questions

Question:

```text
Hybrid connectivity
Fast deployment
Encrypted
```

Answer:

```text
Site-to-Site VPN
```

---

Question:

```text
VPN tunnel UP
Cannot ping EC2
```

Check:

```text
Route Propagation
ICMP Rules
```

---

Question:

```text
Connect multiple branches
through one AWS hub
```

Answer:

```text
AWS VPN CloudHub
```

---

Question:

```text
AWS-side VPN endpoint
```

Answer:

```text
VGW
```

---

Question:

```text
Customer-side VPN device
```

Answer:

```text
CGW
```

---

# Final Memory Anchor

> Site-to-Site VPN connects an AWS VPC to an on-premises network using an encrypted tunnel over the public internet. The AWS side uses a Virtual Private Gateway (VGW), the customer side uses a Customer Gateway (CGW), and route propagation plus proper security group rules are essential for connectivity. VPN CloudHub extends this model by connecting multiple sites through a shared VGW using BGP.