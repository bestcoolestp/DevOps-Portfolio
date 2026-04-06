# 2026-02-27 — AWS App Runner & App2Container (DevOps/SRE Lens)

# Part 1 — AWS App Runner

## Core Mental Model

App Runner = **Simplest way to run containers on AWS**

- ECS → more control
- EKS → Kubernetes complexity
- **App Runner → zero infrastructure deployment**

👉 App Runner = **Heroku-like platform on AWS**

---

# 1. What App Runner Actually Does

You provide:

- Source code OR
- Docker container image

AWS handles:

- Build
- Deploy
- Scaling
- Load balancing
- TLS
- High availability

Result:

Public URL generated automatically


---

# 2. Configuration Options

Minimal configuration:

- vCPU
- Memory
- Autoscaling
- Health checks

No need to configure:

- load balancer
- cluster
- containers
- networking

---

# 3. Architecture (Behind the Scenes)

Internet → App Runner → Containers

App Runner internally provides:

- Load balancer
- Auto scaling
- TLS encryption
- Multi-AZ deployment

---

# 4. Deployment Sources

App Runner supports:

## Source Code

- GitHub
- Bitbucket

Auto Build:

- Detect runtime
- Build container
- Deploy automatically

---

## Container Images

From:

- Amazon ECR
- Docker Hub

Deploy existing containers directly

---

# 5. Scaling Model

App Runner supports:

- Automatic scaling
- Scale to zero (depending config)
- High availability

Example

Traffic increases:

- New containers launched

Traffic decreases:

- Containers scaled down

---

# 6. VPC Access

App Runner can connect to:

- RDS
- ElastiCache
- SQS
- DynamoDB (via IAM)

Architecture

App Runner → VPC Connector → Private AWS Services

---

# 7. When to Use App Runner

Best for:

- APIs
- Web applications
- Microservices
- Rapid prototypes

Avoid when:

- complex networking
- custom container orchestration
- Kubernetes needed

---

# App Runner vs ECS vs EKS

| Feature | App Runner | ECS | EKS |
|--------|------------|-----|-----|
| Complexity | Lowest | Medium | Highest |
| Control | Low | Medium | High |
| Setup time | Minutes | Moderate | Long |

---

# One-Line Memory Anchor

> App Runner = deploy container, get URL instantly

---

# Part 2 — AWS App2Container (A2C)

## Core Mental Model

App2Container = **Legacy App → Container Migration Tool**

Used for:

- Java apps
- .NET apps

No code changes required

---

# 1. Migration Workflow

Step 1

Discover applications

Step 2

Containerize

Step 3

Generate artifacts

Step 4

Deploy to AWS

---

# 2. Generated Artifacts

App2Container creates:

- Dockerfiles
- Docker images
- CloudFormation templates
- ECS / EKS configs
- App Runner deployment configs
- CI/CD pipelines

---

# 3. Migration Architecture

Legacy App → App2Container → Docker Image → ECR → ECS/EKS/App Runner

---

# 4. Migration Type

Lift-and-Shift

- No application rewrite
- Minimal modification
- Fast migration

---

# 5. When to Use App2Container

Use when:

- migrating legacy Java apps
- migrating legacy .NET apps
- modernization without rewrite

Avoid when:

- new cloud-native app
- already containerized app

---

# DevOps/SRE Takeaways

App Runner:

- fastest deployment
- lowest ops overhead

App2Container:

- fastest migration
- modernization bridge

Together:

- App2Container → Containerize
- App Runner → Deploy

---

# One-Line Memory Anchor

> App Runner deploys containers; App2Container creates them.

---
