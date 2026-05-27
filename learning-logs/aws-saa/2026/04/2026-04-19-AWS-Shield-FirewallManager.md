# 2026-04-19 — AWS Shield & AWS Firewall Manager

# Core Mental Model

AWS security at scale is layered.

```text id="shield1"
Shield → WAF → Firewall Manager
```

---

# Meaning

| Service          | Purpose                       |
| ---------------- | ----------------------------- |
| Shield           | DDoS protection               |
| WAF              | Layer 7 filtering             |
| Firewall Manager | Centralized policy management |

---

# 1. Understanding DDoS

# What is DDoS?

```text id="shield2"
Distributed Denial of Service
```

Attackers use many distributed systems to flood a target.

---

# Goal of Attackers

❌ exhaust bandwidth
❌ overload compute
❌ overwhelm applications
❌ deny service to legitimate users

---

# 2. DDoS Attack Layers

| Layer   | Example               |
| ------- | --------------------- |
| Layer 3 | ICMP flood            |
| Layer 4 | SYN flood, UDP flood  |
| Layer 7 | HTTP flood, API abuse |

---

# Important Distinction

# Shield Standard

Mainly protects:

```text id="shield3"
Layer 3 + Layer 4
```

---

# WAF

Protects:

```text id="shield4"
Layer 7
```

---

# 3. AWS Shield Standard

# Included Automatically

AWS Shield Standard is:

✅ free
✅ automatically enabled

for all AWS customers.

---

# Protection Scope

Protects against:

* SYN floods
* UDP floods
* reflection attacks
* volumetric attacks

---

# Protected Services

Core AWS infrastructure services like:

* CloudFront
* Route 53
* ELB

already benefit from baseline Shield protection.

---

# Major Benefit

No configuration required.

---

# 4. Reflection Attack Concept

Common DDoS amplification technique.

---

# Example

Attacker spoofs victim IP.

Third-party servers send massive responses to victim.

---

# Result

Traffic amplification overwhelms target.

---

# Shield helps mitigate these attacks automatically.

---

# 5. AWS Shield Advanced

Enterprise-grade DDoS protection service.

---

# Cost

Approximately:

```text id="shield5"
$3,000/month
```

per organization.

---

# Protected Services

| Service            | Protected |
| ------------------ | --------- |
| EC2                | ✅         |
| ELB                | ✅         |
| CloudFront         | ✅         |
| Global Accelerator | ✅         |
| Route 53           | ✅         |

---

# 6. Key Shield Advanced Benefits

# DDoS Response Team (DRT)

```text id="shield6"
24/7 AWS DDoS experts
```

available during attacks.

---

# Huge Enterprise Value

Especially for:

* SaaS platforms
* fintech
* gaming
* public APIs
* e-commerce

---

# 7. Cost Protection

Shield Advanced helps protect against:

```text id="shield7"
unexpected scaling costs
```

caused by DDoS attacks.

---

# Example

Massive attack triggers:

* EC2 scaling
* bandwidth spikes
* CloudFront traffic increases

AWS may provide financial protection.

---

# 8. Layer 7 Mitigation

Shield Advanced integrates with:

```text id="shield8"
AWS WAF
```

---

# Important Capability

Automatic deployment of WAF rules during attacks.

---

# Example

```text id="shield9"
Attack detected → Shield Advanced → Deploy temporary WAF mitigation rules
↓
Block malicious HTTP requests
```

---

# Very Important Exam Concept

Shield Advanced can automate Layer 7 mitigation.

---

# 9. Shield vs WAF

| Feature | Shield | WAF |
|---------|--------|-----|
| DDoS protection | ✅ | partial |
| Layer 7 filtering | limited | ✅ |
| SQL injection filtering | ❌ | ✅ |
| XSS filtering | ❌ | ✅ |
| Rate limiting | limited | ✅ |

---

# Key Insight

Shield ≠ WAF.

They complement each other.

---

# 10. Common Production Security Stack

```text id="shield10"
CloudFront + Shield Advanced + WAF
↓
ALB / API Gateway
↓
Application
```

---

# Benefits

✅ global DDoS protection
✅ Layer 7 filtering
✅ edge security
✅ reduced backend load

---

# 11. AWS Firewall Manager

# Core Purpose

Centralized security policy management across:

```text id="shield11"
AWS Organizations
```

---

# Main Problem It Solves

Without Firewall Manager:

❌ manually configure WAF in every account
❌ inconsistent security policies
❌ operational drift

---

# 12. Firewall Manager Core Capability

```text id="shield12"
Define once → Apply everywhere
```

---

# Huge Enterprise Benefit

Security governance at scale.

---

# 13. Firewall Manager Supported Policies

| Policy Type                   | Supported |
| ----------------------------- | --------- |
| WAF                           | ✅         |
| Shield Advanced               | ✅         |
| Security Groups               | ✅         |
| Network Firewall              | ✅         |
| Route53 Resolver DNS Firewall | ✅         |

---

# 14. Automatic Policy Propagation

Example:

```text id="shield13"
New ALB created → Firewall Manager automatically applies WAF policy
```

---

# Major Advantage

No manual security onboarding.

---

# 15. Regional Nature

Firewall Manager policies are:

```text id="shield14"
Region-based
```

---

# But

Can still manage organization-wide governance patterns.

---

# 16. Firewall Manager + Organizations

Requires:

```text id="shield15"
AWS Organizations
```

---

# Why?

Because Firewall Manager manages multiple AWS accounts centrally.

---

# 17. Security Group Governance

Firewall Manager can standardize:

* inbound rules
* outbound rules
* allowed ports
* approved CIDRs

---

# Example

```text id="shield16"
Only allow:
443/tcp
```

across all accounts.

---

# 18. Network Firewall Integration

Firewall Manager can deploy:

```text id="shield17"
AWS Network Firewall
```

policies consistently.

---

# Important Distinction

| Service          | OSI Layer |
| ---------------- | --------- |
| WAF              | Layer 7   |
| Network Firewall | Layer 3/4 |

---

# 19. DNS Firewall Integration

Can enforce Route 53 Resolver DNS Firewall rules.

---

# Example

Block access to:

* malicious domains
* crypto mining domains
* phishing infrastructure

---

# 20. Real Enterprise Architecture

```text id="shield18"
AWS Organizations
↓
Firewall Manager
↓
Deploy WAF + Shield + SG rules
↓
All accounts/resources protected consistently
```

---

# 21. High-Value Exam Keywords

| Keyword                     | Think            |
| --------------------------- | ---------------- |
| free DDoS protection        | Shield Standard  |
| enterprise DDoS support     | Shield Advanced  |
| automatic WAF mitigation    | Shield Advanced  |
| centralized WAF governance  | Firewall Manager |
| apply WAF across accounts   | Firewall Manager |
| security policy propagation | Firewall Manager |

---

# 22. Common Exam Trap

# WAF

Protects:

```text id="shield19"
specific resources
```

---

# Firewall Manager

Manages security policies:

```text id="shield20"
across AWS Organizations
```

---

# 23. Security Philosophy

Modern AWS security is layered:

```text id="shield21"
Shield → volumetric protection
WAF → application filtering
Firewall Manager → governance
```

---

# One-Line Final Memory Anchor

> Shield protects against DDoS, WAF filters Layer 7 attacks, and Firewall Manager centrally enforces security policies across AWS Organizations.

---