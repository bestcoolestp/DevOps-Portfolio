2026-02-04 — AWS Global Accelerator  
Perspective: DevOps / SRE Notes  
Theme: global network acceleration and intelligent routing

“Performance problems are often routing problems.”

---

# 🌍 AWS Global Accelerator

## Core Idea

Global Accelerator improves **global application performance** by routing traffic through the **AWS private backbone network** instead of the public internet.

Users connect to **two static Anycast IP addresses**, and AWS routes traffic to the **nearest healthy endpoint**.

Architecture:

```

User → AWS Edge → AWS Global Network → Regional Endpoint

```

This reduces latency and improves reliability.

---

# 🚦 The Problem It Solves

Without Global Accelerator:

```

User → Public Internet → Region

```

Issues:

- unpredictable internet routing
- multiple hops
- higher latency
- packet loss risk

With Global Accelerator:

```

User → Nearest AWS Edge → AWS Global Backbone → Application

```

Result:

- faster routing
- more stable connections
- better global performance

---

# 🌐 Unicast vs Anycast

## Unicast

Traditional model:

```

1 IP → 1 server

```

Clients connect to a specific destination.

Example:

```

app.example.com → 3.5.8.10

```

---

## Anycast

Multiple servers share **one IP address**.

Routing sends the client to the **nearest healthy endpoint**.

Global Accelerator provides:

```

2 static Anycast IPs globally

```

Benefits:

- global entry point
- simplified firewall rules
- automatic geographic routing

---

# ⚙️ Supported Endpoints

Global Accelerator can route traffic to:

- EC2 instances
- Elastic IPs
- Application Load Balancers (ALB)
- Network Load Balancers (NLB)

Endpoints may exist in **multiple AWS regions**.

Example architecture:

```

User
↓
Global Accelerator
↓
US-East-1 ALB
EU-West-1 ALB

```

Traffic is automatically routed to the closest healthy region.

---

# 🛡 Reliability & Failover

Global Accelerator continuously performs **health checks**.

If a region fails:

```

Traffic automatically shifts to another region

```

Failover time:

```

typically under 1 minute

```

This supports **multi-region disaster recovery**.

---

# 🔐 Security Benefits

Global Accelerator reduces the attack surface.

Only two public IP addresses exist.

Advantages:

- easier firewall rules
- simpler allowlists
- AWS Shield DDoS protection

Architecture example:

```

Internet → Global Accelerator (2 IPs) → Backend services

```

---

# 🧠 Global Accelerator vs CloudFront

Both use AWS edge infrastructure, but solve different problems.

| Feature | CloudFront | Global Accelerator |
|------|------|------|
| Purpose | CDN caching | Network acceleration |
| Content | HTTP/HTTPS | TCP/UDP |
| Edge behavior | Serves cached content | Proxies traffic |
| Static IPs | No | Yes |
| Primary use | websites & APIs | real-time apps |

Mental shortcut:

```

CloudFront → content delivery
Global Accelerator → network routing

```

---

# 🧪 Example Deployment

Multi-region EC2 setup:

```

Region 1 → US-East-1 EC2
Region 2 → EU-West-1 EC2

```

Each instance runs a simple web server.

Health check configuration:

```

Protocol: HTTP
Port: 80
Interval: 10s
Threshold: 2

```

Traffic behavior:

- Europe user → EU-West-1
- US user → US-East-1

Routing automatically follows **network proximity**.

---

# 🧠 DevOps / SRE Mental Model

Global Accelerator solves three operational problems:

**Global routing**

```

direct users to nearest healthy region

```

**Network stability**

```

use AWS backbone instead of public internet

```

**Static entry points**

```

two Anycast IPs simplify networking

```

Typical use cases:

- gaming platforms
- VoIP systems
- IoT platforms
- latency-sensitive APIs
- multi-region architectures

---

# 🎯 High-Value Exam Signals

Global Accelerator:

- uses **Anycast IPs**
- provides **two static global IPs**
- routes traffic via **AWS backbone network**
- supports **EC2, ALB, NLB**
- enables **fast regional failover**

---

# One-Line Summary

```

AWS Global Accelerator provides two static Anycast IPs that route users to the nearest healthy application endpoint using the AWS global network.