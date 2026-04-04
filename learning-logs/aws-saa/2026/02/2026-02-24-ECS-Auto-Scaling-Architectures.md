# 2026-02-24 — ECS Service Auto Scaling & Architectures (DevOps/SRE Lens)

## Core Mental Model

ECS Auto Scaling = **Containers scale based on demand**

Not:
- Scaling servers

But:
- Scaling **tasks (containers)**

With Fargate:
- Scale tasks only

With EC2:
- Scale tasks **and** instances

---

# 1. ECS Service Auto Scaling

Manual Scaling

```

Desired Tasks: 2 → 5

```

Automatic Scaling

AWS Application Auto Scaling adjusts automatically.

---

# 2. Scaling Metrics

Common Metrics

### CPU Utilization

- Most common
- Example: target 50%

### Memory Utilization

- Useful for memory-heavy workloads

### ALB Request Count Per Target

- HTTP services
- Scale based on traffic

---

# 3. Scaling Policies

## Target Tracking (Recommended)

Example

- Maintain CPU at 50%
- Automatically scale in/out

Best for:
- Most applications

---

## Step Scaling

Example

- CPU > 70% → +1 task
- CPU > 90% → +3 tasks

Best for:
- predictable burst patterns

---

## Scheduled Scaling

Example

- 9 AM scale up
- 6 PM scale down

Best for:
- predictable traffic

---

# 4. Important Distinction

Scaling ECS Tasks ≠ Scaling Infrastructure

## Fargate

Simple:

- scale tasks
- AWS handles infrastructure

---

## EC2 Launch Type

Requires:

- scaling tasks
- scaling instances

Otherwise:

Tasks may remain pending

---

# 5. EC2 Scaling Options

## Auto Scaling Group

Basic

- scale EC2
- scale tasks separately

Not optimal

---

## Capacity Provider (Preferred)

Smart scaling:

ECS Tasks Need Capacity →  
Capacity Provider →  
Scale EC2 Instances

---

# 6. Scaling Workflow Example

Initial

- 2 tasks

Traffic spike

- CPU increases

CloudWatch Alarm

- triggers scaling

Application Auto Scaling

- desired tasks: 2 → 5

If EC2:

- capacity provider scales instances

Result:

- 5 running containers

---

# 7. ECS Architecture Patterns

---

# Architecture 1 — EventBridge + ECS (S3 Processing)

Flow

User → S3 Upload → EventBridge → ECS Task → DynamoDB

Benefits

- serverless containers
- event-driven processing
- scalable architecture

---

# Architecture 2 — Scheduled Batch Jobs

EventBridge Schedule

Example

- every hour

Flow

EventBridge → ECS Task → S3 Processing

Use Cases

- batch jobs
- ETL pipelines
- scheduled analytics

---

# Architecture 3 — ECS + SQS

Flow

Producer → SQS → ECS Service

Tasks

- poll queue
- process messages

Auto Scaling

- scale tasks based on queue size

Benefits

- scalable worker architecture

---

# Architecture 4 — ECS Monitoring with EventBridge

Flow

ECS Task State Change → EventBridge → SNS

Example

- task stopped
- failure detected
- send alert

Use Cases

- alerting
- automation
- observability

---

# 8. Architecture Overview

Event Sources

- S3
- EventBridge
- SQS

Compute

- ECS (Fargate)

Outputs

- DynamoDB
- S3
- Notifications

---

# DevOps/SRE Takeaways

ECS + EventBridge enables:

- event-driven containers
- scheduled containers
- auto scaling containers
- serverless containers

Combine with:

- SQS (queue workloads)
- SNS (notifications)
- CloudWatch (metrics)

---

# One-Line Memory Anchor

> ECS scales containers; EventBridge triggers them.

---
