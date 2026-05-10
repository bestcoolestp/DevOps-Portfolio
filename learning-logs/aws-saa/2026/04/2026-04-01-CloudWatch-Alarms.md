# 2026-04-01 — CloudWatch Alarms (DevOps/SRE Lens)

## Core Mental Model

CloudWatch Alarm = **automated reaction to metric conditions**

👉 Metrics become actions.

Not just monitoring:

- notify
- scale
- recover
- terminate
- automate remediation

---

# 1. Alarm States

| State | Meaning |
|------|---------|
| OK | healthy |
| INSUFFICIENT_DATA | not enough datapoints |
| ALARM | threshold breached |

---

# 2. Core Components

| Component | Purpose |
|-----------|---------|
| Metric | signal being monitored |
| Threshold | trigger condition |
| Period | evaluation window |
| Evaluation periods | consecutive checks |

---

# 3. Example

CPUUtilization:

- threshold = 95%
- period = 5 min
- evaluation periods = 3

👉 Alarm triggers after ~15 minutes.

---

# 4. Alarm Targets

## Notifications

CloudWatch Alarm → SNS → Email / Lambda / webhook

---

## Infrastructure Actions

### EC2

- stop
- reboot
- terminate
- recover

---

### Auto Scaling

- scale out
- scale in

---

# 5. Composite Alarms (Critical)

Combine alarms with:

- AND
- OR

Example:

- CPU high
- IOPS high

Only alert if BOTH happen.

👉 Reduces alert fatigue/noise.

---

# 6. EC2 Recovery (Exam Favorite)

Checks:

- instance health
- system health
- EBS health

If failure detected:

Alarm → recover instance → move to healthy host

Preserved:

- IPs
- metadata
- placement group
- EBS volumes

---

# 7. Logs → Metrics → Alarms

Pattern:

CloudWatch Logs → Metric Filter → Alarm → SNS/Lambda

Example:

```

ERROR

```

appears in logs  
↓  
metric increments  
↓  
alarm triggers

---

# 8. High-Resolution Metrics

Supports:

- 10s
- 30s
- 1m

Use cases:

- low-latency workloads
- rapid scaling

Tradeoff:

- faster detection
- higher cost

---

# 9. Alarm Testing (Critical)

Force alarm state via CLI:

```bash
aws cloudwatch set-alarm-state \
  --alarm-name "Terminate EC2 on High CPU" \
  --state-value ALARM \
  --state-reason "Testing"
```

👉 Essential for validating automation safely.

---

# 10. Operational Patterns

## Auto Recovery

Metrics → Alarm → EC2 recover

---

## Auto Scaling

High CPU → Alarm → ASG scale-out

---

## Incident Alerting

Errors in logs → Alarm → SNS/PagerDuty/Slack

---

# 11. DevOps/SRE Takeaways

CloudWatch Alarms are:

- observability + automation bridge
- foundational for self-healing systems

Golden principle:

👉 Monitoring without action is incomplete.

---

# 12. Reliability Engineering Perspective

Alarms should be:

- actionable
- low-noise
- threshold-tuned
- tied to runbooks/automation

Avoid:

- alert spam
- overly sensitive thresholds
- non-actionable alerts

---

# 13. Metrics vs Logs vs Alarms

| Service | Purpose |
|---------|---------|
| Metrics | observe trends |
| Logs | explain events |
| Alarms | trigger action |

👉 Together = operational feedback loop.

---

# 14. Common Architecture

Applications/Infra → CloudWatch Metrics & Logs → Alarms → SNS/Lambda/ASG/EC2 Actions

---

# 15. Real-World SRE Pattern

High latency  
↓  
Alarm triggers  
↓  
ASG scales out  
↓  
SNS notifies team  
↓  
Logs Insights used for RCA

---

# One-Line Memory Anchor

> CloudWatch Alarms turn observability into automated operations.

---
