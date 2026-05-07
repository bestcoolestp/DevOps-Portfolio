# 2026-03-30 — CloudWatch Metrics & Logs (DevOps/SRE Lens)

# Part 1 — CloudWatch Metrics

## Core Mental Model

CloudWatch Metrics = **time-series observability data**

👉 Metrics answer:

- Is the system healthy?
- Is it scaling correctly?
- Are resources overloaded?

---

# 1. Core Components

| Component | Meaning |
|-----------|---------|
| Metric | value to monitor |
| Namespace | service grouping |
| Dimension | metric attributes |
| Timestamp | time-based datapoint |

---

# 2. Common Examples

| Service | Example Metric |
|---------|----------------|
| EC2 | CPUUtilization |
| ALB | RequestCount |
| Lambda | Duration |
| SQS | QueueDepth |
| DynamoDB | ThrottledRequests |

---

# 3. Dimensions (Critical)

Dimensions add context.

Examples:

- InstanceId
- Environment
- AutoScalingGroup

👉 Same metric, different resources.

---

# 4. Monitoring Granularity

| Mode | Frequency |
|------|------------|
| Default | 5 min |
| Detailed | 1 min |

Tradeoff:

- faster visibility
- higher cost

---

# 5. Dashboards

Combine metrics visually:

- CPU
- latency
- errors
- queue depth

👉 Single-pane operational visibility.

---

# 6. Custom Metrics

Publish your own metrics:

Examples:

- memory usage
- active users
- app latency

---

# 7. Metric Streaming

CloudWatch → Firehose → S3 / Redshift / OpenSearch / SIEM

Use for:

- long-term analytics
- external monitoring platforms

---

# 8. Visualization Types

- line chart
- stacked area
- pie
- single-value number

---

# 9. DevOps/SRE Takeaways

Metrics are for:

- alerting
- autoscaling
- SLO/SLA monitoring
- trend analysis

Golden signals:

- latency
- traffic
- errors
- saturation

---

# One-Line Memory Anchor

> Metrics tell you “how the system behaves over time.”

---

# Part 2 — CloudWatch Logs

## Core Mental Model

CloudWatch Logs = **centralized log storage & analysis**

👉 Logs explain *why* something happened.

---

# 1. Structure

| Component | Meaning |
|----------|---------|
| Log Group | application/service |
| Log Stream | instance/container/function |

---

# 2. Sources

- Lambda
- ECS
- EC2 agents
- API Gateway
- VPC Flow Logs
- Route53
- CloudTrail

---

# 3. Retention Policies

Retention:

- 1 day → 10 years
- or indefinite

Used for:

- compliance
- cost control

---

# 4. Encryption

- encrypted by default
- optional KMS keys

---

# 5. Export & Streaming

## Batch Export

Logs → S3

---

## Real-Time Streaming

Logs → Kinesis / Firehose / Lambda / OpenSearch

Use cases:

- SIEM pipelines
- analytics
- alerting

---

# 6. CloudWatch Logs Insights (Critical)

Serverless log query engine.

Capabilities:

- filtering
- aggregation
- visualization
- cross-log-group analysis

---

## Example Queries

Count errors:

```sql
fields @timestamp, @message
| filter @message like /ERROR/
| stats count() as errors
```

---

Top IPs:

```sql
stats count(*) by sourceIP
| sort count desc
```

---

# 7. Metrics vs Logs

| Metrics | Logs |
|---------|------|
| numeric trends | raw events |
| lightweight | verbose |
| alerting | debugging |
| “what happened” | “why it happened” |

👉 Use both together.

---

# 8. Common Observability Pattern

Applications → CloudWatch Logs → Logs Insights / OpenSearch  

Metrics  
→ Dashboards / Alarms / Auto Scaling

---

# 9. DevOps/SRE Takeaways

Observability stack:

- Metrics → health
- Logs → debugging
- Alarms → action
- Dashboards → visibility

Key practices:

- structured logging (JSON)
- retention policies
- centralized aggregation
- metric extraction from logs

---

# 10. Example Operational Workflow

High CPU alarm  
↓  
Check metrics dashboard  
↓  
Open related logs  
↓  
Query errors with Logs Insights  
↓  
Identify root cause

---

# One-Line Memory Anchor

> Metrics show symptoms; logs reveal causes.

---

# Combined Insight

CloudWatch provides:

- Metrics → monitoring
- Logs → investigation
- Dashboards → visibility
- Streaming → external analytics

👉 Foundation of AWS observability.

---