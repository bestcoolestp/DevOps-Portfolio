# 2026-05-28

# AWS Systems Manager (SSM) Extra Services

| Service | Purpose | Key Features | Typical Use Cases |
|----------|----------|----------|----------|
| Run Command | Execute commands remotely | No SSH, SSM Agent, SNS notifications, CloudWatch/S3 logs | Run scripts, restart services, collect logs |
| Patch Manager | Automate patching | Security updates, compliance reports, Maintenance Windows | OS patching, vulnerability remediation |
| Maintenance Windows | Schedule operations | Define targets, tasks, duration, recurrence | Nightly maintenance, patch schedules |
| Automation | Execute runbooks | AMI creation, snapshots, remediation workflows | Infrastructure operations and self-healing |

---

# SSM Run Command

## Purpose

Execute commands on:

- EC2 Instances
- On-Prem Servers
- Hybrid Environments

without:

```text
SSH, RDP, & Bastion Hosts
```

---

## Architecture

```text
Administrator → SSM Run Command → SSM Agent → Managed Instances
```

---

## Outputs

| Destination | Purpose |
|------------|------------|
| CloudWatch Logs | Centralized logging |
| Amazon S3 | Long-term storage |
| SNS | Success/failure notifications |

---

## Example

Restart Apache on 100 servers:

```bash
aws ssm send-command \
  --document-name "AWS-RunShellScript" \
  --parameters commands="systemctl restart httpd"
```

---

## Exam Keywords

| Requirement | Answer |
|------------|------------|
| Execute commands on many EC2s | Run Command |
| No SSH access | Run Command |
| Centralized script execution | Run Command |

---

# Patch Manager

## Purpose

Automate patching.

Supported:

| Platform |
|----------|
| Linux |
| Windows |
| macOS |
| EC2 |
| On-Prem Servers |

---

## Modes

| Mode | Description |
|--------|--------|
| Scan | Detect missing patches |
| Install | Apply patches |

---

## Process

```text
Patch Manager → AWS-RunPatchBaseline → Managed Nodes
```

---

## Benefits

- Security compliance
- Reduced operational effort
- Centralized reporting

---

## Exam Keywords

```text
Automated OS patching, Compliance reports, & Patch Baselines
```

Answer:

```text
Patch Manager
```

---

# Maintenance Windows

## Purpose

Schedule operational tasks.

---

## Components

| Component | Meaning |
|------------|------------|
| Schedule | When |
| Duration | How long |
| Targets | Which servers |
| Tasks | What to run |

---

## Example

```text
Every Sunday, 02:00 AM, Patch all production servers
```

---

## Architecture

```text
Maintenance Window → Run Command → Patch Manager → Instances
```

---

## Exam Keywords

```text
Scheduled maintenance, Recurring operations, & Controlled execution time
```

Answer:

```text
Maintenance Windows
```

---

# SSM Automation

## Purpose

Execute predefined operational workflows.

---

## Examples

| Task |
|--------|
| Restart EC2 |
| Create AMI |
| Create EBS Snapshot |
| Stop Instances |
| Patch Systems |
| Remediation Actions |

---

## Automation Runbooks

AWS provides:

```text
Predefined Documents
```

called:

```text
Automation Runbooks
```

---

Example:

```text
AWS-CreateImage
```

Creates AMIs automatically.

---

## Integration

Automation can be triggered from:

| Source |
|----------|
| Console |
| CLI |
| SDK |
| EventBridge |
| Maintenance Windows |
| AWS Config |

---

## Self-Healing Example

```text
AWS Config → Non-Compliant Resource → SSM Automation → Fix Resource → Compliant
```

---

## Exam Keywords

```text
Automatic remediation, Runbooks, & Operational workflows
```

Answer:

```text
SSM Automation
```

---

# Systems Manager Summary

| Service | Main Purpose |
|----------|----------|
| Session Manager | Secure shell access |
| Run Command | Execute commands |
| Patch Manager | Patch operating systems |
| Maintenance Windows | Schedule operations |
| Automation | Execute runbooks |

---

# AWS Cost Explorer

---

# What is Cost Explorer?

AWS Cost Explorer helps:

```text
Understand, Analyze, Optimize, & Forecast
```

AWS spending.

---

# Architecture

```text
AWS Resources → Billing Data → Cost Explorer → Reports & Forecasts
```

---

# Main Features

| Feature | Description |
|----------|----------|
| Cost Analysis | Review spending |
| Usage Analysis | Review consumption |
| Forecasting | Predict future costs |
| Recommendations | Savings opportunities |
| Custom Reports | Flexible dashboards |

---

# Cost Breakdown Examples

## By Service

| Service | Cost |
|----------|----------|
| EC2 | $300 |
| RDS | $150 |
| S3 | $50 |

---

## By Account

| Account | Cost |
|----------|----------|
| Dev | $500 |
| Prod | $1,500 |

---

## By Resource

| Resource | Cost |
|----------|----------|
| EC2 i-123 | $40 |
| EC2 i-456 | $80 |

---

# Forecasting

Cost Explorer can forecast:

```text
Up to 18 Months
```

using historical data.

---

Example:

```text
Current Spend → Trend Analysis → Future Cost Prediction
```

---

# Savings Plan Recommendations

Cost Explorer can suggest:

```text
Savings Plans
```

based on usage.

---

Example:

```text
Current EC2 Usage → Analyze → Recommend 1-Year Savings Plan
```

---

# Optimization Questions

Cost Explorer helps answer:

| Question |
|----------|
| Are instances oversized? |
| Are instances underutilized? |
| Are resources idle? |
| Can Savings Plans reduce costs? |

---

# Common Use Cases

| Use Case | Service |
|------------|------------|
| Forecast AWS bill | Cost Explorer |
| Analyze EC2 costs | Cost Explorer |
| Savings Plan recommendations | Cost Explorer |
| Monthly spending reports | Cost Explorer |

---

# Exam Keywords

If you see:

```text
Forecast AWS costs, Analyze spending, Savings Plan recommendations, & Cost trends
```

Answer:

```text
AWS Cost Explorer
```

---

# Systems Manager vs Cost Explorer

| Requirement | Service |
|------------|------------|
| Run commands remotely | Run Command |
| Patch servers | Patch Manager |
| Schedule maintenance | Maintenance Windows |
| Self-healing workflows | Automation |
| Forecast AWS spending | Cost Explorer |
| Analyze cloud costs | Cost Explorer |

---

# Memory Anchors

| Service | Remember As |
|------------|------------|
| Session Manager | No SSH |
| Run Command | Remote scripts |
| Patch Manager | Automated updates |
| Maintenance Windows | Scheduled tasks |
| Automation | Runbooks |
| Cost Explorer | Billing analytics |

---

# DevOps Interview Insight

A mature AWS operations team commonly combines these services:

```text
EventBridge → SSM Automation → Run Command → Patch Manager → CloudWatch Logs → Cost Explorer
```

Result:

- Automated operations
- Reduced manual work
- Better compliance
- Centralized auditing
- Lower operational costs
- Improved visibility into infrastructure spending