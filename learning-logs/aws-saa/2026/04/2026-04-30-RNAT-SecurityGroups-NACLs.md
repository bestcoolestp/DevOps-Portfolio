# 2026-04-30 — Regional NAT Gateways, Security Groups & NACLs

# Part 1 — Regional NAT Gateways (RNAT)

# Why AWS Introduced RNAT

Traditional NAT Gateway architecture:

```text id="rnat1"
AZ-A - NAT Gateway A
AZ-B - NAT Gateway B
AZ-C - NAT Gateway C
```

---

Problems:

- More resources
- More route tables
- More cost
- More management

---

AWS solution:

```text id="rnat2"
Regional NAT Gateway (RNAT)
```

---

# What is RNAT?

Regional NAT Gateway is:

```text id="rnat3"
A VPC-level NAT service
```

instead of:

```text id="rnat4"
Subnet-level NAT service
```

---

Think:

Old model:

```text id="rnat5"
One NAT per AZ
```

---

New model:

```text id="rnat6"
One NAT per VPC
```

---

# Architecture Before RNAT

```text id="rnat7"
AZ-A
 PrivateSubnetA → NATGW-A → Internet

AZ-B
 PrivateSubnetB → NATGW-B → Internet
```

---

Multiple NAT Gateways.

Multiple Elastic IPs.

Multiple routes.

---

# Architecture With RNAT

```text id="rnat8"
PrivateSubnetA, PrivateSubnetB, PrivateSubnetC
      ▼
 Regional NAT Gateway
      ▼
 Internet Gateway
      ▼
 Internet
```

---

# Benefits

## Simpler Design

```text id="rnat9"
One NAT
One Configuration
```

---

## Easier Scaling

Adding:

```text id="rnat10"
New Availability Zone
```

requires:

```text id="rnat11"
No Additional NAT Deployment
```

---

## Fewer Public Subnets

Traditional design:

```text id="rnat12"
Need Public Subnet
for NAT Gateway
```

---

RNAT reduces that complexity.

---

## Better Governance

Prevents:

```text id="rnat13"
Accidental Resource Creation
```

inside unnecessary public subnets.

---

# Route Table Example

Private subnet route:

```text id="rnat14"
10.0.0.0/16 → local

0.0.0.0/0 → RNAT
```

---

Traffic flow:

```text id="rnat15"
Private EC2 → RNAT → IGW → Internet
```

---

# AWS SAA Exam Memory

If AWS asks:

> Simplify NAT architecture across multiple AZs

Think:

```text id="rnat16"
Regional NAT Gateway
```

---

# Part 2 — Security Groups (SG)

# What is a Security Group?

Security Group is:

```text id="sg1"
A virtual firewall attached to an EC2 instance.
```

---

Works at:

```text id="sg2"
Instance Level
```

---

Example:

```text id="sg3"
Security Group → EC2 Instance
```

---

# Security Groups are Stateful

Most important exam fact.

---

Meaning:

```text id="sg4"
Inbound Allowed = Return Traffic Allowed Automatically
```

---

Example:

```text id="sg5"
Client → Port 443 → EC2
```

---

Response:

```text id="sg6"
EC2 → Client
```

---

Allowed automatically.

No outbound rule required.

---

# Security Groups Only Support ALLOW

You can write:

```text id="sg7"
Allow SSH
Allow HTTPS
Allow MySQL
```

---

You cannot write:

```text id="sg8"
Deny 1.2.3.4
```

---

Exam memory:

```text id="sg9"
Security Groups = Allow Only
```

---

# Security Group Evaluation

AWS evaluates:

```text id="sg10"
All Rules
```

before making a decision.

---

If any rule matches:

```text id="sg11"
Traffic Allowed
```

---

Otherwise:

```text id="sg12"
Implicit Deny
```

---

# Example

Inbound:

| Port | Source |
|--------|---------|
| 22 | Corporate CIDR |
| 443 | 0.0.0.0/0 |

---

Result:

```text id="sg13"
SSH → Corporate Only

HTTPS → Everyone
```

---

# Part 3 — Network ACLs (NACL)

# What is a NACL?

NACL is:

```text id="nacl1"
A firewall attached to a subnet.
```

---

Works at:

```text id="nacl2"
Subnet Level
```

---

Architecture:

```text id="nacl3"
Network ACL → Subnet
```

---

# NACLs are Stateless

Critical exam topic.

---

Meaning:

```text id="nacl4"
Inbound and Outbound evaluated separately
```

---

Example:

Inbound:

```text id="nacl5"
Allow 443
```

---

Response traffic:

```text id="nacl6"
NOT Automatically Allowed
```

---

Must explicitly allow:

```text id="nacl7"
Outbound Rule
```

---

Exam memory:

```text id="nacl8"
NACL = Stateless
```

---

# NACL Supports ALLOW and DENY

Unlike Security Groups.

---

Examples:

```text id="nacl9"
ALLOW 443
DENY 1.2.3.4
```

---

Very common exam answer.

---

If asked:

> Block specific IP address

Answer:

```text id="nacl10"
NACL
```

not Security Group.

---

# Rule Numbers

NACL rules use priorities.

---

Example:

| Rule | Action |
|--------|--------|
| 100 | Allow |
| 200 | Deny |

---

AWS processes:

```text id="nacl11"
Lowest Number First
```

---

First match wins.

---

Exam memory:

```text id="nacl12"
Lower Number = Higher Priority
```

---

# Default vs Custom NACL

## Default NACL

```text id="nacl13"
Allow All Inbound
Allow All Outbound
```

---

## Custom NACL

```text id="nacl14"
Deny All
```

until rules are added.

---

# Security Group vs NACL

| Feature | Security Group | NACL |
|----------|---------------|-------|
| Scope | Instance | Subnet |
| Stateful | ✅ | ❌ |
| Allow Rules | ✅ | ✅ |
| Deny Rules | ❌ | ✅ |
| Rule Order | Not Important | Important |
| Default | Implicit Deny | Depends on NACL Type |

---

# Ephemeral Ports

Extremely common AWS exam topic.

---

# What are Ephemeral Ports?

Client initiates connection:

```text id="eph1"
Source Port
Random
```

---

Example:

```text id="eph2"
49152
```

---

Server responds back:

```text id="eph3"
Port 49152
```

---

This is called:

```text id="eph4"
Ephemeral Port
```

---

# Windows Range

```text id="eph5"
49152–65535
```

---

# Linux Range

```text id="eph6"
32768–60999
```

---

# Why Exam Questions Use Them

NACLs are stateless.

---

Example:

Inbound:

```text id="eph7"
Allow HTTPS 443
```

---

Outbound response:

```text id="eph8"
Blocked
```

unless ephemeral ports are allowed.

---

Correct rule:

```text id="eph9"
Allow 32768–65535
```

(or appropriate range)

---

# AWS SAA Memory Anchors

### Security Group

```text id="mem1"
Instance Level
Stateful
Allow Only
```

---

### NACL

```text id="mem2"
Subnet Level
Stateless
Allow + Deny
```

---

### Security Group

```text id="mem3"
Return Traffic Automatic
```

---

### NACL

```text id="mem4"
Return Traffic Requires Rule
```

---

### Ephemeral Ports

```text id="mem5"
Client Reply Ports
```

---

### Block Specific IP

```text id="mem6"
Use NACL
```

---

# Final Memory Anchor

> Security Groups are stateful instance-level firewalls that support allow rules only. Network ACLs are stateless subnet-level firewalls that support both allow and deny rules and require explicit inbound and outbound permissions, including ephemeral ports for return traffic.

---