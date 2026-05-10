# 2026-04-02 — CloudWatch Network Synthetic Monitor & EventBridge (DevOps/SRE Lens)

# Part 1 — CloudWatch Network Synthetic Monitor

## Core Mental Model

Network Synthetic Monitor = **active network path monitoring**

👉 Continuously validates connectivity between:

- on-prem data center
- AWS (DX/VPN)

without installing agents.

---

# 1. What It Detects

## Packet Loss

- dropped traffic
- unstable links

---

## Latency

- slow response time

---

## Jitter

- inconsistent latency
- critical for voice/video/real-time traffic

---

# 2. Supported Protocols

- ICMP
- TCP
- IPv4

---

# 3. Architecture Pattern

On-Prem DC ⇄ Direct Connect / VPN ⇄ AWS  

Synthetic probes  
↓  
CloudWatch Metrics

---

# 4. Operational Value

Enables:

- proactive troubleshooting
- hybrid connectivity validation
- WAN health monitoring

---

# 5. Why It Matters

Without monitoring:

❌ network degradation discovered too late

With Synthetic Monitor:

✅ visibility into path health in real time

---

# 6. DevOps/SRE Takeaways

Hybrid/cloud operations require:

- network observability
- latency baselines
- packet-loss detection

Key advantage:

👉 agentless monitoring

---

# 7. Common Use Cases

- Direct Connect validation
- VPN monitoring
- hybrid workload health checks
- MPLS/WAN troubleshooting

---

# One-Line Memory Anchor

> Network Synthetic Monitor = agentless hybrid network observability.

---

# Part 2 — Amazon EventBridge

## Core Mental Model

EventBridge = **event routing backbone for AWS**

👉 “If X happens → trigger Y”

---

# 1. What EventBridge Does

Sources generate events  
↓  
EventBridge matches rules  
↓  
Routes to targets

---

# 2. Core Components

| Component | Purpose |
|----------|---------|
| Event | JSON payload |
| Rule | filter logic |
| Target | action destination |
| Event Bus | event channel |

---

# 3. Event Sources

## AWS Services

- EC2
- S3
- IAM
- CloudTrail
- ECS
- CodePipeline

---

## SaaS Partners

- Datadog
- Zendesk
- Auth0

---

## Custom Apps

Applications publish custom events.

---

# 4. Targets

- Lambda
- SNS/SQS
- Step Functions
- ECS Tasks
- Kinesis
- CodeBuild
- EC2 actions
- SSM Automation

---

# 5. Scheduling (Critical)

EventBridge supports cron/rate rules.

Example:

```text
rate(1 hour)
```

👉 Serverless cron replacement.

---

# 6. Event Pattern Matching

Example:

Only react when:

- root account login
- specific S3 bucket event
- failed deployment

---

# 7. Event Buses

| Bus Type | Purpose |
|----------|---------|
| Default | AWS service events |
| Partner | SaaS integrations |
| Custom | application events |

---

# 8. Schema Registry

Automatically:

- discovers event structure
- versions schemas
- generates bindings/code

👉 Strongly typed event-driven development.

---

# 9. Cross-Account Event Routing

Using resource policies:

Account A → EventBridge → Account B

Use cases:

- centralized security monitoring
- org-wide observability

---

# 10. Archive & Replay (Critical)

EventBridge can:

- archive events
- replay later

Used for:

- debugging
- disaster recovery
- testing workflows

---

# 11. Architecture Patterns

## Event-Driven Automation

CloudTrail event → EventBridge → Lambda → remediation

---

## Scheduled Tasks

EventBridge cron → ECS task / Lambda

---

## Centralized Security Hub

Multi-account events → central bus → analytics/alerts

---

# 12. DevOps/SRE Takeaways

EventBridge enables:

- decoupled architectures
- automation-first operations
- reactive infrastructure

Golden principle:

👉 Systems communicate through events, not direct coupling.

---

# 13. EventBridge vs SNS vs SQS

| Service | Purpose |
|---------|---------|
| EventBridge | event routing/filtering |
| SNS | pub/sub fanout |
| SQS | buffering/queueing |

👉 EventBridge is orchestration-oriented.

---

# 14. Example Reliability Pattern

EC2 failure event  
↓  
EventBridge rule  
↓  
Lambda remediation  
↓  
SNS notification  
↓  
ticket creation

---

# Combined Insight

Observability + automation loop:

Metrics / Logs / Network Signals  
↓  
CloudWatch / EventBridge  
↓  
Automation workflows  
↓  
Self-healing infrastructure

👉 Core modern SRE pattern.

---

# One-Line Memory Anchor

> EventBridge routes events; Synthetic Monitor validates the network carrying them.

---
