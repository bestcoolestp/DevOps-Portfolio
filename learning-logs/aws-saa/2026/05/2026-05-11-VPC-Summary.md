# 2026-05-11 — Amazon VPC Summary

# Core Mental Model

VPC is AWS networking.

It controls:

```text
IP ranges
Subnets
Routing
Internet access
Private access
Security boundaries
Hybrid connectivity
```

---

# 1. CIDR & VPC

```text
CIDR = IP range
VPC = private network in AWS
```

VPC supports:

```text
IPv4 + IPv6
```

IPv4 is mandatory.

IPv6 is optional.

---

# 2. Subnets

Subnets divide a VPC into smaller networks.

```text
One subnet = One Availability Zone
```

Public subnet:

```text
0.0.0.0/0 → Internet Gateway
```

Private subnet:

```text
No direct Internet Gateway route
```

---

# 3. Route Tables

Route tables decide where traffic goes.

Common targets:

```text
Internet Gateway
NAT Gateway
VPC Endpoint
VPC Peering
Transit Gateway
Virtual Private Gateway
```

Memory anchor:

```text
Routing defines subnet behavior.
```

---

# 4. Bastion Host

A Bastion Host is:

```text
Public EC2 used to access private EC2
```

Flow:

```text
Admin → Bastion Host → Private EC2
```

Best practice:

```text
Private EC2 allows SSH only from Bastion SG
```

Modern alternative:

```text
AWS Systems Manager Session Manager
```

---

# 5. NAT

NAT gives private subnets outbound internet access.

## NAT Instance

```text
Legacy EC2-based NAT
```

Requires:

```text
Disable source/destination check
Elastic IP
Manual scaling
Manual patching
```

## NAT Gateway

```text
Managed IPv4 outbound internet access
```

Used for:

```text
Private EC2 → Internet
```

Not for:

```text
Internet → Private EC2
```

---

# 6. Security

## Security Groups

```text
Instance level
Stateful
Allow only
```

## NACLs

```text
Subnet level
Stateless
Allow + Deny
```

Exam shortcut:

```text
Block specific IP → NACL
```

---

# 7. VPC Connectivity

## VPC Peering

Connects two VPCs privately.

Rules:

```text
No overlapping CIDRs
Non-transitive
Route tables required
```

## VPC Endpoints

Private access to AWS services.

```text
S3 + DynamoDB → Gateway Endpoint

Most other services → Interface Endpoint
```

---

# 8. Flow Logs

VPC Flow Logs capture:

```text
Network metadata
```

Examples:

```text
Source IP
Destination IP
Ports
Protocol
ACCEPT / REJECT
Bytes
Packets
```

They do NOT capture:

```text
Packet payloads
```

Analysis options:

```text
S3 + Athena
CloudWatch Logs Insights
Contributor Insights
```

---

# 9. Hybrid Connectivity

## Site-to-Site VPN

```text
Encrypted tunnel over public internet
```

Components:

```text
Customer Gateway = customer side
Virtual Private Gateway = AWS side
```

## VPN CloudHub

```text
Multiple sites connected through AWS hub
```

## Direct Connect

```text
Dedicated private connection
```

Best for:

```text
Consistent latency
High bandwidth
Hybrid workloads
```

## Direct Connect Gateway

```text
One DX connection → multiple VPCs across regions
```

---

# 10. PrivateLink

PrivateLink exposes services privately.

Pattern:

```text
Service Provider → NLB → PrivateLink → Consumer ENI
```

No need for:

```text
Public internet
NAT
VPC peering
```

---

# 11. Advanced / Legacy

## ClassicLink

```text
Deprecated EC2-Classic to VPC connectivity
```

## Transit Gateway

```text
Large-scale network hub
```

Supports:

```text
Transitive routing
VPCs
VPN
Direct Connect
Cross-account sharing via RAM
```

Exam keyword:

```text
IP multicast → Transit Gateway
```

## Traffic Mirroring

Copies ENI traffic for deep inspection.

```text
VPC Flow Logs = metadata
Traffic Mirroring = packets
```

---

# 12. IPv6

AWS VPC supports dual-stack:

```text
IPv4 + IPv6
```

AWS IPv6 is:

```text
Public and internet-routable
```

For outbound-only IPv6:

```text
Egress-Only Internet Gateway
```

Comparison:

```text
NAT Gateway → IPv4 outbound only
EOIGW       → IPv6 outbound only
IGW         → IPv4/IPv6 inbound + outbound
```

---

# 13. VPC Exam Decision Table

| Requirement | Answer |
|---|---|
| Public subnet internet access | Internet Gateway |
| Private subnet IPv4 outbound internet | NAT Gateway |
| Private subnet IPv6 outbound internet | EOIGW |
| Connect 2 VPCs | VPC Peering |
| Connect many VPCs | Transit Gateway |
| Private S3/DynamoDB access | Gateway Endpoint |
| Private access to most AWS services | Interface Endpoint |
| Hybrid encrypted connection | Site-to-Site VPN |
| Dedicated private hybrid link | Direct Connect |
| Packet metadata | VPC Flow Logs |
| Full packet inspection | Traffic Mirroring |

---

# Final Memory Anchor

> VPC is the foundation of AWS networking. CIDR defines address space, subnets divide it by Availability Zone, route tables control traffic paths, gateways provide internet or hybrid access, and Security Groups/NACLs enforce traffic control. For small networks use peering; for large networks use Transit Gateway. For private AWS service access, use VPC Endpoints.
