# 2026-02-25 — Amazon ECR (Elastic Container Registry) (DevOps/SRE Lens)

## Core Mental Model

Amazon ECR = **Private Docker Registry inside AWS**

- Docker Hub → public registry  
- **ECR → AWS-native registry**

👉 ECR = **Image Storage for Containers**

---

# 1. Where ECR Fits

Container Workflow

Developer → Build Docker Image → Push to ECR → ECS/EKS Pull → Run Containers

Example

Docker Build → ECR → ECS Service → Running Containers

---

# 2. Repository Types

## Private Repository

- Default option
- IAM-controlled access
- Used for production workloads

Use Cases

- internal services
- microservices
- private containers

---

## Public Repository

Amazon ECR Public Gallery

Use Cases

- open-source containers
- shared images
- public base images

---

# 3. ECS Integration

ECR integrates natively with:

- ECS
- Fargate
- EKS

Flow

ECS Task → Pull Image → Run Container

Behind the scenes

ECR stores images in:

- Amazon S3
- Highly durable storage

---

# 4. IAM Access Control

Access controlled via:

IAM Roles

Example

EC2 Instance Role:

- Pull images from ECR

Fargate Task Execution Role:

- Pull images from ECR

Common Failure

Container fails to start:

Cause:
- IAM permission missing

Typical Required Permissions

- ecr:GetAuthorizationToken  
- ecr:BatchCheckLayerAvailability  
- ecr:GetDownloadUrlForLayer  
- ecr:BatchGetImage  

---

# 5. Image Versioning & Tagging

Example

```

myapp:latest
myapp:v1
myapp:v2

```

Best Practice

Avoid:

```

latest

```

Prefer:

- version tags
- commit SHA tags

Example

```

myapp:2026-02-25
myapp:commit-abc123

```

---

# 6. Vulnerability Scanning

ECR supports:

- image scanning
- CVE detection
- security recommendations

Use Cases

- DevSecOps pipelines
- security audits
- compliance checks

---

# 7. Lifecycle Policies

Example

Delete:

- images older than 30 days
- keep last 10 images

Benefits

- reduce storage cost
- prevent image sprawl

---

# 8. Architecture Example

CI/CD Pipeline

GitHub → Build Docker Image → Push to ECR →  
ECS Service → Pull New Image → Deploy

---

# 9. ECR vs Docker Hub

| Feature | ECR | Docker Hub |
|--------|-----|------------|
| AWS integration | Native | External |
| IAM | Yes | No |
| Private repos | Yes | Limited |
| Vulnerability scanning | Yes | Limited |

---

# 10. DevOps/SRE Takeaways

ECR provides

- secure image storage
- IAM integration
- lifecycle management
- vulnerability scanning

ECR is core for:

- ECS
- EKS
- container-based architecture

---

# One-Line Memory Anchor

> ECR stores Docker images for AWS containers.

---
