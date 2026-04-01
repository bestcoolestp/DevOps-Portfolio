# 2026-02-22 — Amazon ECS Cluster Setup (DevOps/SRE Lens)

## Core Mental Model

ECS Cluster = **Compute Pool for Containers**

You define:
- Cluster (compute pool)
- Capacity Providers (where containers run)
- Tasks / Services (what runs)

👉 ECS Cluster = **Container Infrastructure Layer**

---

# 1. Creating the Cluster

Example:

```

DemoCluster

```

Cluster initially contains:
- No tasks
- No services
- Only infrastructure configuration

---

# 2. Infrastructure Options

## 1. Fargate Only (Serverless)

AWS manages:
- servers
- scaling
- patching

You manage:
- task definition
- scaling tasks

### When to Use
- simplest setup
- minimal ops overhead
- most exam-friendly

---

## 2. Fargate + Managed Instances

AWS manages:

- EC2 lifecycle
- scaling
- patching

Requires:

- ecsInstanceRole
- infrastructure role

### Use Case

Hybrid:
- serverless tasks
- managed EC2 tasks

---

## 3. Fargate + Self-Managed Instances

You manage:

- EC2 instances
- Auto Scaling Group
- instance types
- AMIs

Architecture

ECS Cluster → ASG → EC2 Instances → Containers

---

# 3. Instance Selection

Default (Recommended)

ECS automatically chooses:
- CPU
- Memory
- instance types

Custom

Specify:
- instance type (t3.micro)
- CPU constraints
- memory constraints

---

# 4. Self-Managed Instance Example

Configuration

- Instance: t3.micro
- Max instances: 2
- Root volume: 30 GB
- SSH: disabled

ECS creates:

Auto Scaling Group:
```

Infra-ECS-Cluster

```

Example

- Min: 0
- Max: 5

---

# 5. Capacity Providers

Capacity providers define **where tasks run**

Available Providers

### FARGATE
- Serverless
- Reliable
- Default choice

---

### FARGATE_SPOT

- Cheaper
- Interruptible
- Best for stateless workloads

---

### ASG Provider

- Uses EC2 instances
- Full control
- Cost optimization possible

---

# 6. Container Instance Registration

Flow

1. Increase desired capacity
2. ECS launches EC2 instance
3. ECS Agent starts
4. Instance registers to cluster

Example

Instance:

- t2.micro
- CPU: 1024 units
- Memory: ~982 MB

Now cluster can run tasks

---

# 7. Cluster State (After Setup)

Example

- Services: 0
- Tasks: 0
- Capacity Providers: 3

Cluster ready for:

- Task deployment
- Service deployment
- Load balancer integration

---

# 8. Capacity Strategy (Real World)

Mix providers

Example

- 70% Fargate
- 30% Fargate Spot

Benefits

- Cost optimization
- high availability
- flexible scaling

---

# 9. DevOps/SRE Takeaways

Cluster = Infrastructure  
Capacity Providers = Compute choices  
Tasks = Workloads  

Key decision:

- Fargate → simplicity
- EC2 → control
- Spot → cost savings

---

# One-Line Memory Anchor

> ECS Cluster = container compute pool

---