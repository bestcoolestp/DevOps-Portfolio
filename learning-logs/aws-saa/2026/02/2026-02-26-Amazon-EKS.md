# 2026-02-26 — Amazon EKS Summary (DevOps/SRE Lens)

## Core Mental Model

EKS = **Managed Kubernetes on AWS**

- ECS → AWS-native container orchestration  
- EKS → Kubernetes-based container orchestration  
- Kubernetes → Industry standard container platform  

👉 ECS = simpler  
👉 EKS = more portable + more control

---

# 1. ECS vs EKS (Mental Model)

| Feature | ECS | EKS |
|--------|-----|-----|
| Platform | AWS proprietary | Kubernetes (open-source) |
| Portability | AWS only | Multi-cloud |
| Complexity | Lower | Higher |
| Control | Limited | Full Kubernetes control |

### DevOps Insight

Choose:

- ECS → simplicity
- EKS → portability / Kubernetes standardization

---

# 2. EKS Architecture

Cluster Components

Control Plane (AWS Managed)  
Worker Nodes → Pods → Containers

Architecture

EKS Cluster → Worker Nodes → Pods → Containers

Example

EKS Cluster  
→ Node 1 → Pods  
→ Node 2 → Pods  
→ Node 3 → Pods

---

# 3. Launch Modes

## 1. EC2 Mode

Worker nodes:

- EC2 instances
- Kubernetes runs on nodes
- Pods scheduled onto nodes

Responsibilities

You manage:

- instance sizing
- scaling
- networking

---

## 2. Fargate Mode

Serverless Kubernetes

You define:

- Pod configuration

AWS manages:

- nodes
- infrastructure
- scaling

---

## EC2 vs Fargate (EKS)

| Feature | EC2 | Fargate |
|--------|-----|---------|
| Node management | Required | None |
| Control | Full | Limited |
| Ops overhead | Higher | Lower |

---

# 4. Node Types

## Managed Node Groups

AWS manages:

- EC2 provisioning
- Auto Scaling
- upgrades

Supports:

- On-Demand
- Spot instances

Recommended default

---

## Self-Managed Nodes

You manage:

- AMIs
- scaling
- configuration

Use cases:

- custom networking
- custom AMIs
- special workloads

---

## Fargate Nodes

Serverless Pods

- no visible nodes
- no infrastructure management

---

# 5. Networking Architecture

EKS runs in:

- VPC
- Multiple AZs

Services exposed via:

- Application Load Balancer
- Network Load Balancer

Example

Internet → ALB → EKS Service → Pods

---

# 6. Storage Options

Kubernetes uses:

StorageClass + CSI drivers

Supported Storage

### Amazon EBS

- Block storage
- Node-attached

---

### Amazon EFS

- Shared filesystem
- Multi-AZ
- Required for Fargate

---

### Amazon FSx

- FSx for Lustre
- FSx for NetApp ONTAP

Use cases:

- HPC workloads
- enterprise storage

---

# 7. Kubernetes Terminology Mapping

| Kubernetes | ECS Equivalent |
|------------|---------------|
| Pod | Task |
| Node | EC2 Instance |
| Cluster | Cluster |
| Deployment | Service |

---

# 8. Real-World Architecture

Internet → Load Balancer →  
EKS Cluster →  
Worker Nodes →  
Pods → Containers

---

# 9. When to Use EKS

Use EKS when:

- multi-cloud strategy
- Kubernetes expertise exists
- large microservices platform
- portability required

Avoid EKS when:

- simple workloads
- small teams
- minimal ops preference

---

# DevOps/SRE Takeaways

EKS provides:

- Kubernetes standardization
- multi-cloud portability
- advanced container orchestration

Tradeoff:

- higher complexity
- steeper learning curve

---

# One-Line Memory Anchor

> EKS = Kubernetes on AWS.

---