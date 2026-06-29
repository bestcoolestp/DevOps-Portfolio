# 2026-05-21

# Highly Available EC2 Architectures

---

# Core Problem

Default EC2 deployment:

```text
Users → EC2 (AZ-A)
```

---

Failure:

```text
AZ Failure or EC2 Failure → Application Down

---

Single Point of Failure (SPOF)

---

# High Availability Goal

Application should survive:

```text
EC2 Failure, AZ Failure, & Hardware Failure
```

without significant downtime.

---

# Architecture 1

## Elastic IP + Standby EC2

### Normal Operation

```text
Internet → Elastic IP → Primary EC2
```

---

Standby EC2 remains stopped.

```text
Primary EC2

(Active)

Standby EC2

(Stopped)
```

---

# Failure Detection

CloudWatch monitors:

```text
EC2 Termination

Instance Status Check

CPU Problems

Custom Metrics
```

---

CloudWatch triggers:

```text
Lambda Function
```

---

# Automated Failover

Lambda performs:

```text
Start Standby EC2

Detach Elastic IP

Attach Elastic IP
```

---

Result:

```text
Internet → Elastic IP → Standby EC2
```

---

Users continue using:

```text
Same IP Address
```

---

# Advantages

Simple, Cheap, & Easy to understand

---

# Limitations

Recovery takes time.

```text
Boot EC2, Attach EIP, & Application Startup
```

---

Not ideal for mission-critical systems.

---

# Architecture 2

## Auto Scaling Group

---

Architecture:

```text
AZ-A EC2 → Auto Scaling Group → AZ-B Replacement EC2
```

---

Configuration:

```text
Min = 1, Desired = 1, & Max = 1
```

---

Meaning:

```text
Always Keep 1 Instance Running
```

---

# Failure Scenario

Current EC2 dies.

```text
EC2 → Terminated
```

---

ASG detects:

```text
Desired = 1, Current = 0
```

---

ASG launches replacement.

```text
Replacement EC2
```

---

# Elastic IP Automation

User Data script:

```bash
aws ec2 associate-address \
  --allocation-id eipalloc-xxxx
```

---

Requires:

```text
IAM Instance Role
```

---

# Advantages

No Lambda, No CloudWatch, & Self-healing

---

Exam keyword:

```text
Automatically replace failed EC2
```

Answer:

```text
Auto Scaling Group
```

---

# Architecture 3

## Stateful EC2 + EBS

---

Problem:

```text
EBS Volumes Cannot Move Across AZs
```

---

Example:

```text
AZ-A EC2 → EBS Volume
```

---

AZ-A fails.

Volume unavailable.

---

# Solution

Use:

```text
Snapshots
```

---

# Lifecycle Hook

Before termination:

```text
ASG Lifecycle Hook → Lambda → Create Snapshot
```

---

Snapshot stored in S3 internally.

---

# Recovery

Replacement launches in AZ-B.

```text
ASG → Launch EC2 → Restore EBS → Attach Volume
```

---

Architecture:

```text
Snapshot → New EBS → New EC2
```

---

Attach:

```text
Elastic IP
```

---

Application restored.

---

# Required Components

---

## Elastic IP

Provides:

```text
Stable Public Endpoint
```

---

Without EIP:

```text
Public IP Changes
```

during failover.

---

## CloudWatch

Provides:

```text
Monitoring & Alerting
```

---

Monitors:

```text
CPU, Status Checks, & Termination Events
```

---

## Lambda

Provides:

```text
Automation
```

---

Examples:

```text
Start Standby, Move EIP, & Create Snapshots
```

---

## Auto Scaling Group

Provides:

```text
Self Healing
```

---

Automatically replaces:

```text
Failed Instances
```

---

## Lifecycle Hooks

Provides:

```text
Actions Before, Launch, & Terminate
```

---

Examples:

```text
Backup, Snapshot, & Notification
```

---

## IAM Role

Allows EC2 to call:

```text
EC2 APIs, CloudWatch APIs, & S3 APIs
```

---

# Architecture Comparison

| Solution | Complexity | Cost | Recovery |
|-----------|------------|-------|----------|
| Elastic IP + Standby | Low | Low | Minutes |
| Auto Scaling Group | Medium | Low | Minutes |
| ASG + EBS Snapshot | High | Medium | Minutes |
| Multi-AZ Load Balancer | Medium | Medium | Seconds |

---

# What AWS Architects Prefer

In production:

```text
ALB → ASG → Multiple AZs
```

instead of:

```text
Elastic IP → Single EC2
```

---

Because:

```text
Load Balancer removes Single Point of Failure
```

---

# Modern Highly Available Architecture

```text
Users → Route53 → ALB → AZ-A EC2, AZ-B EC2 → RDS Multi-AZ
```

---

AWS automatically handles:

```text
Instance Failure, AZ Failure, & Traffic Routing
```

---

# Exam Decision Table

| Requirement | Best Answer |
|------------|-------------|
| Replace failed EC2 automatically | Auto Scaling Group |
| Fixed public IP | Elastic IP |
| Monitor failures | CloudWatch |
| Automate actions | Lambda |
| Execute action before termination | Lifecycle Hook |
| Persistent block storage | EBS |
| Backup EBS | Snapshot |
| True HA Web Application | ALB + ASG Multi-AZ |

---

# Interview Memory Anchor

```text
Single EC2 = Not Highly Available
```

---

```text
ASG = Self Healing
```

---

```text
ALB + ASG + Multi-AZ = Production HA Architecture
```

---

```text
EBS = AZ Bound
```

---

```text
Snapshot = Cross-AZ Recovery
```

---

# Real DevOps Interview Insight

If asked:

"How would you make an EC2-based web application highly available?"

A strong answer is:

1. Deploy instances across at least two Availability Zones.
2. Place them behind an Application Load Balancer.
3. Use an Auto Scaling Group.
4. Store application state externally (RDS, ElastiCache, S3).
5. Monitor with CloudWatch.
6. Automate recovery with Auto Scaling and lifecycle hooks.

That answer is much closer to how production AWS systems are actually designed than using Elastic IP failover alone.