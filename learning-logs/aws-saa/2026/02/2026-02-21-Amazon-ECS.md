# 2026-02-21 — Amazon ECS Overview (DevOps/SRE Lens)

## Core Mental Model

ECS = **Container orchestration without managing Kubernetes**

- ECS Cluster → Infrastructure pool  
- Task Definition → Container blueprint  
- Tasks / Services → Running containers  

👉 ECS = **AWS-native container scheduler**

---

# 1. ECS Architecture

Container Image → Task Definition → ECS Cluster → Tasks

Example

Docker Image → Task Definition →  
ECS Cluster →  
- Task 1  
- Task 2  
- Task 3  

---

# 2. ECS Launch Types

## 1. EC2 Launch Type (You Manage Infrastructure)

Architecture

ECS Cluster → EC2 Instances → Containers

Each EC2 runs:

- ECS Agent
- Docker runtime
- Containers

### Responsibilities

You manage:

- instance size
- scaling
- patching
- AMIs
- networking

### When to Use

- cost optimization (spot instances)
- GPU workloads
- custom networking
- daemon workloads

---

## 2. Fargate Launch Type (Serverless Containers)

Architecture

Task Definition → Fargate → Running Tasks

You define:

- CPU
- Memory
- Container image

AWS manages:

- infrastructure
- scaling
- patching
- availability

---

## EC2 vs Fargate

| Feature | EC2 | Fargate |
|--------|-----|---------|
| Server management | Required | None |
| Scaling | EC2 scaling | Task scaling |
| Cost control | More flexible | Simpler |
| Operational overhead | Higher | Lower |

### SRE Insight

- EC2 = flexibility
- Fargate = simplicity

---

# 3. IAM Roles in ECS

## EC2 Instance Profile Role

Used by:

- ECS Agent

Permissions:

- ECS API
- CloudWatch Logs
- ECR pulls
- Secrets Manager
- SSM

Only used in:

EC2 Launch Type

---

## ECS Task Role

Used by:

Containers themselves

Example

Task A:
- Access S3

Task B:
- Access DynamoDB

Granular security per task

---

# 4. Load Balancer Integration

## Application Load Balancer (Recommended)

Best for:

- HTTP / HTTPS
- Microservices
- Path-based routing

Works with:

- EC2
- Fargate

---

## Network Load Balancer

Best for:

- High throughput
- Low latency
- TCP workloads

Also used with:

- PrivateLink

---

## Classic Load Balancer

- Legacy
- Avoid
- Not supported with Fargate

---

# 5. Data Persistence in ECS

Containers are ephemeral

Need external storage

Solution:

Amazon EFS

---

# 6. ECS + EFS Architecture

Tasks across AZs share:

Amazon EFS

Example

ECS Tasks → EFS → Shared Data

Benefits:

- multi-AZ storage
- persistent storage
- serverless compatible

---

# 7. Serverless Container Stack

Fargate + EFS

Results:

- No servers
- Persistent storage
- Auto scaling
- Multi-AZ

👉 Fully serverless containers

---

# 8. ECS vs Kubernetes (Mental Positioning)

| Feature | ECS | Kubernetes |
|--------|-----|------------|
| Complexity | Low | High |
| AWS integration | Native | External |
| Control | Limited | Full |

---

# 9. Real-World Architecture

ALB → ECS Service → Tasks

Tasks:

- API containers
- worker containers
- background jobs

---

# DevOps/SRE Takeaways

ECS provides:

- container orchestration
- auto scaling
- load balancing
- IAM security

Launch Type Decision:

- EC2 → control
- Fargate → simplicity

---

# One-Line Memory Anchor

> ECS runs containers; Fargate removes servers.

---
