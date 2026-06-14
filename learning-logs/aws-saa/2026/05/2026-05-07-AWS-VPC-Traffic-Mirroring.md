# 2026-05-07 — AWS VPC Traffic Mirroring

# What is VPC Traffic Mirroring?

AWS VPC Traffic Mirroring allows you to:

```text
Capture
Copy
Inspect
```

network traffic from EC2 instances without affecting production workloads.

---

Think of it like:

```text
Network Packet Copy/Paste
```

for security and troubleshooting.

---

# The Core Idea

Normal traffic:

```text
Client → EC2 Instance
```

---

With Traffic Mirroring:

```text
Client → EC2 Instance → Application & Security Appliance
```

---

Traffic is:

```text
Duplicated
```

not redirected.

---

Therefore:

```text
Production traffic continues normally.
```

---

# Why Use Traffic Mirroring?

Without Traffic Mirroring:

```text
Hard to inspect packets
```

inside AWS.

---

With Traffic Mirroring:

```text
Deep Packet Inspection
```

becomes possible.

---

Useful for:

- IDS
- IPS
- Threat Detection
- Packet Analysis
- Compliance Monitoring
- Network Troubleshooting

---

# Main Components

Traffic Mirroring consists of:

### Source

### Target

### Filter (Optional)

### Session

---

# Source

Source defines:

```text
Which traffic to copy
```

---

Sources are:

```text
Elastic Network Interfaces (ENIs)
```

attached to EC2 instances.

---

Example:

```text
EC2 Web Server
      │
     ENI
```

The ENI becomes the mirror source.

---

# Target

Target defines:

```text
Where mirrored packets go
```

---

Supported targets:

### ENI

Send traffic directly to:

```text
Security Appliance EC2
```

---

### Network Load Balancer (NLB)

Send traffic to:

```text
Auto Scaling Group
```

of security appliances.

---

Architecture:

```text
Source ENI → Traffic Mirror → Network Load Balancer → Security Appliances
```

---

# Traffic Mirror Filter

Optional component.

---

Without filters:

```text
Everything is copied
```

---

With filters:

```text
Only selected traffic
```

is copied.

---

Examples:

### Only SSH

```text
Port 22
```

---

### Only HTTPS

```text
Port 443
```

---

### Only Traffic from Specific CIDR

```text
10.0.0.0/16
```

---

### Only Inbound

```text
Ingress
```

---

### Only Outbound

```text
Egress
```

---

# Traffic Mirror Session

A session ties together:

```text
Source + Target + Filter
```

---

Architecture:

```text
ENI → Session → Target
```

---

# Example Architecture

Suppose you have:

```text
Web Server
```

inside a VPC.

---

Normal traffic:

```text
Users → Web Server
```

---

With Traffic Mirroring:

```text
Users → Web Server → Application & Security Monitoring System
```

---

Application remains unaffected.

---

# Security Monitoring Architecture

Common enterprise setup:

```text
EC2 Instances → Traffic Mirroring → Network Load Balancer → Auto Scaling Group → Security Appliances
```

---

Security tools may include:

- IDS
- IPS
- Packet Capture Systems
- Threat Detection Systems

---

# Why Use an NLB?

Because:

```text
Many Sources
```

may generate traffic.

---

Example:

```text
EC2-1
EC2-2
EC2-3
EC2-4
```

all mirror traffic.

---

Architecture:

```text
EC2-1 ─┐
EC2-2 ─┼──► NLB
EC2-3 ─┤
EC2-4 ─┘
```

---

NLB distributes traffic.

---

# Multiple Source ENIs

Traffic Mirroring supports:

```text
Many Sources
```

---

Example:

```text
Web Tier
App Tier
Database Tier
```

---

All can mirror traffic simultaneously.

---

Architecture:

```text
Web ENI
      \
       \
App ENI ----► NLB
       /
      /
DB ENI
```

---

# Cross-VPC Support

Important exam point.

---

Traffic Mirroring can work:

```text
Within Same VPC
```

or

```text
Across Peered VPCs
```

---

Example:

```text
VPC A
   │
 Source ENI
   │
VPC Peering
   │
VPC B
   │
 Security Appliance
```

---

# Traffic Mirroring vs VPC Flow Logs

Very common exam comparison.

---

# VPC Flow Logs

Provides:

```text
Metadata
```

---

Example:

```text
Source IP
Destination IP
Port
Protocol
Accept/Reject
Bytes
```

---

But NOT:

```text
Packet Contents
```

---

# Traffic Mirroring

Provides:

```text
Actual Packets
```

---

Including:

```text
Payload
Headers
Full Network Traffic
```

---

Comparison:

| Feature | VPC Flow Logs | Traffic Mirroring |
|----------|----------|----------|
| Source IP | ✅ | ✅ |
| Destination IP | ✅ | ✅ |
| Port Information | ✅ | ✅ |
| Accept/Reject | ✅ | ❌ |
| Packet Payload | ❌ | ✅ |
| Security Analysis | Limited | Deep Inspection |
| Troubleshooting | Basic | Advanced |

---

# Example: Threat Detection

Flow Logs show:

```text
10.0.1.10 → 185.45.22.1
```

---

But cannot tell:

```text
What data was sent
```

---

Traffic Mirroring shows:

```text
Full Packet Content
```

allowing:

- Malware detection
- Data exfiltration detection
- Threat hunting

---

# Example: IDS/IPS

Traffic Mirroring commonly feeds:

```text
Snort
```

or

```text
Suricata
```

---

Architecture:

```text
EC2 → Traffic Mirror → IDS Appliance
```

---

IDS analyzes:

```text
Real Packets
```

without affecting production traffic.

---

# Example: Troubleshooting

Problem:

```text
Application randomly fails
```

---

Flow Logs show:

```text
Connection Exists
```

---

But why?

Unknown.

---

Traffic Mirroring reveals:

```text
Malformed Packets
TLS Issues
Application Errors
```

---

# Non-Intrusive Monitoring

Most important benefit.

---

Traffic Mirroring:

```text
Copies Traffic
```

---

NOT:

```text
Redirect Traffic
```

---

Therefore:

```text
No interruption
No latency impact
No application changes
```

---

# Traffic Mirroring Workflow

Step 1

```text
Choose Source ENI
```

↓

Step 2

```text
Create Filter
(Optional)
```

↓

Step 3

```text
Choose Target
(ENI or NLB)
```

↓

Step 4

```text
Create Mirror Session
```

↓

Step 5

```text
Analyze Packets
```

---

# Exam Scenarios

### Scenario 1

Need:

```text
Deep packet inspection
```

Answer:

```text
Traffic Mirroring
```

---

### Scenario 2

Need:

```text
IDS / IPS
```

Answer:

```text
Traffic Mirroring
```

---

### Scenario 3

Need:

```text
Capture packet payloads
```

Answer:

```text
Traffic Mirroring
```

---

### Scenario 4

Need:

```text
Network troubleshooting
```

with full packets.

Answer:

```text
Traffic Mirroring
```

---

### Scenario 5

Need:

```text
Source IP
Destination IP
Accept/Reject
```

only.

Answer:

```text
VPC Flow Logs
```

---

# Memory Anchors

```text
Flow Logs = Metadata
```

---

```text
Traffic Mirroring = Actual Packets
```

---

```text
Source = ENI
```

---

```text
Target = ENI or NLB
```

---

```text
Traffic Mirroring = Non-Intrusive
```

---

```text
Security Monitoring = Traffic Mirroring
```

---

```text
IDS / IPS = Traffic Mirroring
```

---

# Final Memory Anchor

> AWS VPC Traffic Mirroring captures and duplicates network packets from EC2 ENIs and sends them to monitoring or security appliances for deep packet inspection. Unlike VPC Flow Logs, which only provide metadata, Traffic Mirroring delivers full packet contents, making it ideal for IDS/IPS systems, threat monitoring, content inspection, forensic analysis, and advanced network troubleshooting.