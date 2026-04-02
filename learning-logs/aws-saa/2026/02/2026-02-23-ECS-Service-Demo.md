# 2026-02-23 — ECS Service (Fargate + ALB) Demo (DevOps/SRE Lens)

## Core Mental Model

ECS Service = **Long-running container workload with auto-healing + scaling**

- Task Definition → container blueprint  
- Service → keeps tasks running  
- Load Balancer → traffic distribution  

👉 ECS Service = **Kubernetes Deployment equivalent (conceptually)**

---

# 1. Task Definition

Example

Task Definition:
```

nginxdemos-hello

```

Container Image:
```

nginxdemoshello/hello

```

Configuration

- Launch type: Fargate
- CPU: 0.5 vCPU
- Memory: 1 GB
- OS: Linux
- Ephemeral storage: 21 GB

---

## IAM Roles

Execution Role  
Used by ECS:

- Pull container image
- Send logs to CloudWatch

Task Role  
Used by container:

Example:

- Access S3
- Access DynamoDB

Not required in demo

---

# 2. Container Configuration

Container

- Name: nginxdemos-hello
- Port mapping: 80 → 80

Optional (not used)

- environment variables
- logging config
- resource limits

---

# 3. ECS Service Creation

Cluster

```

DemoCluster

```

Service Config

- Launch type: Fargate
- Desired tasks: 1
- Deployment: Replica

---

# 4. Networking

Configuration

- Default subnets
- Security group:
  - Allow inbound HTTP (80)
- Public IP:
  - Enabled

Result

Task gets:

- Public IP
- Internet accessibility

---

# 5. Load Balancer Integration

Application Load Balancer

```

DemoALBForECS

```

Target Group

```

nginxdemosTG

```

Flow

Internet → ALB → ECS Tasks

---

# 6. Verification

Service Status

- Desired: 1
- Running: 1
- Status: Active

ALB registers:

- Container IP
- Health checks

DNS

ALB DNS resolves:

- nginx hello page

---

# 7. Scaling

Scale Up

Desired Tasks:

```

1 → 3

```

ECS:

- launches 2 additional tasks
- registers targets to ALB
- distributes traffic

Load Balancer

- round-robin traffic
- multiple container IPs

---

# 8. Scale Down

Desired Tasks:

```

3 → 0

```

Result

- Tasks stopped
- Service remains
- No compute cost

👉 Fargate advantage:
No idle infrastructure

---

# 9. Monitoring

Tasks Tab

- container status
- IP addresses
- logs

Events Tab

Lifecycle Events

- Task started
- Target registered
- Deployment completed
- Steady state reached

---

# 10. Architecture Overview

Internet → ALB → ECS Service → Fargate Tasks

Benefits

- Auto healing
- Auto scaling
- Load balancing
- Serverless compute

---

# 11. DevOps/SRE Takeaways

ECS Service provides

- container orchestration
- auto healing
- load balancing
- rolling deployments

Fargate provides

- serverless containers
- no infrastructure management
- scale to zero

---

# One-Line Memory Anchor

> ECS Service keeps containers alive; Fargate removes servers.

---
