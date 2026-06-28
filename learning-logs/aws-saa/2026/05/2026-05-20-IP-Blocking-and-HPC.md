
# 2026-05-20

# Blocking an IP Address in AWS

---

# Layered Security Model

Think:

```text
Internet → NACL → Load Balancer → Security Group → EC2 Firewall → Application
```

Multiple layers.

Never rely on a single layer.

---

# First Line of Defense

## Network ACL (NACL)

Works at:

```text
Subnet Level
```

---

Supports:

```text
ALLOW or DENY
```

rules.

---

Example:

```text
203.0.113.25
```

attacking your application.

Block it:

```text
Inbound Rule

DENY

203.0.113.25/32
```

---

Exam keyword:

```text
Need explicit deny
```

Answer:

```text
NACL
```

---

# Security Groups

Works at:

```text
Instance Level
```

---

Supports:

```text
ALLOW only
```

No deny rules.

---

Example:

Allow SSH only from company network.

```text
203.0.113.0/24
```

---

Rule:

```text
TCP 22

ALLOW

203.0.113.0/24
```

---

Exam keyword:

```text
Whitelist
```

Answer:

```text
Security Group
```

---

# Instance Firewall

Examples:

```text
iptables

firewalld

ufw
```

---

Runs directly inside EC2.

---

Pros:

```text
Very Flexible
```

---

Cons:

```text
Consumes CPU 

Harder to manage
```

---

# ALB Architecture

```text
Internet → ALB → Private EC2
```

---

Benefits:

```text
No public EC2
```

---

Security Group:

```text
EC2 accepts ALB only
```

---

Example:

```text
EC2 SG 

ALLOW

Source = ALB SG
```

---

Very common exam architecture.

---

# NLB Architecture

```text
Internet → NLB → Private EC2
```

---

Same security principle.

---

# AWS WAF

Purpose:

```text
Layer 7 Protection
```

---

Protects against:

```text
SQL Injection, XSS, Bots, Bad IPs, & Country Blocks
```

---

Supports:

```text
IP Filtering, Geo Filtering, & Rate Limiting
```

---

Exam keyword:

```text
Block a country
```

Answer:

```text
AWS WAF
```

---

# CloudFront Security

Architecture:

```text
Users → CloudFront → ALB → EC2
```

---

Traffic source becomes:

```text
CloudFront Edge Locations
```

not users.

---

Therefore:

```text
Allow CloudFront IPs in ALB Security Group
```

---

Combine with:

```text
WAF
```

for maximum protection.

---

# Security Services Decision Table

| Requirement | Service |
|------------|----------|
| Block specific IP | NACL |
| Allow specific IP | Security Group |
| Block country | WAF |
| Block SQL Injection | WAF |
| Deep packet inspection | Instance Firewall |
| Protect ALB | WAF |
| Protect CloudFront | WAF |

---

# Memory Anchor

```text
DENY = NACL
```

---

```text
ALLOW = Security Group
```

---

```text
Layer 7 Filtering = WAF
```

---

# High Performance Computing (HPC)

---

# What is HPC?

HPC means:

```text
High Performance Computing
```

Large-scale parallel computing.

---

Examples:

```text
Genomics, Weather Simulation, Risk Analysis, AI Training, & Autonomous Driving
```

---

# Why AWS for HPC?

Traditional approach:

```text
Buy Hardware

Wait Months
```

---

AWS:

```text
Launch Thousands of Servers in Minutes
```

---

# Data Transfer Services

---

## Direct Connect

```text
Private, High-Speed, & Dedicated Link
```

---

Best for:

```text
Continuous HPC workloads
```

---

## Snowball

Physical appliance.

---

Best for:

```text
Petabytes of Data
```

---

## DataSync

Purpose:

```text
Continuous Sync
```

---

Architecture:

```text
On-Prem → DataSync → S3, EFS, & FSx
```

---

# Compute Services

---

## EC2

Core HPC service.

---

Examples:

```text
Compute Optimized, Memory Optimized, & GPU Instances
```

---

## Spot Fleet

Use spare AWS capacity.

---

Benefit:

```text
Huge Cost Savings
```

---

## Auto Scaling

Automatically add/remove nodes.

---

# Placement Groups

---

## Cluster Placement Group

Purpose:

```text
Lowest Latency

Highest Throughput
```

---

Architecture:

```text
EC2

EC2

EC2

same rack area
```

---

Very common HPC requirement.

---

# Enhanced Networking

---

# ENI

Elastic Network Interface

---

Think:

```text
Virtual Network Card
```

---

# ENA

Elastic Network Adapter

---

Performance:

```text
Up to 100 Gbps
```

---

Modern standard.

---

# Intel 82599 VF

Older generation.

---

Performance:

```text
Up to 10 Gbps
```

---

# EFA

Elastic Fabric Adapter

---

Most important HPC networking service.

---

Purpose:

```text
Ultra Low Latency
```

---

Uses:

```text
MPI

Message Passing Interface
```

---

Bypasses much of Linux networking stack.

---

Architecture:

```text
Node A ⇄ Node B ⇄ Node C
```

Very fast inter-node communication.

---

Exam keyword:

```text
MPI

HPC

Lowest Latency
```

Answer:

```text
EFA
```

---

# HPC Storage

---

## EBS io2 Block Express

Performance:

```text
256,000 IOPS
```

---

Best for:

```text
High-performance databases
```

---

## Instance Store

Performance:

```text
Millions of IOPS
```

---

Limitation:

```text
Ephemeral
```

Data disappears when instance stops.

---

## EFS

Shared file system.

---

Best for:

```text
Linux Shared Storage
```

---

## FSx for Lustre

Most important HPC storage service.

---

Purpose:

```text
High Performance File System
```

---

Features:

```text
Millions of IOPS

Massive Throughput

S3 Integration
```

---

Exam keyword:

```text
HPC Storage
```

Answer:

```text
FSx for Lustre
```

---

# HPC Automation

---

## AWS Batch

Purpose:

```text
Run Jobs Automatically
```

---

Example:

```text
1000 Simulations
```

---

AWS Batch distributes work.

---

## AWS ParallelCluster

Purpose:

```text
Create HPC Clusters
```

---

Automatically creates:

```text
VPC, Subnets, EC2, EFA, & Storage
```

---

Open source.

---

Exam keyword:

```text
Build HPC Cluster Quickly
```

Answer:

```text
AWS ParallelCluster
```

---

# HPC Exam Decision Table

| Requirement | Service |
|------------|----------|
| HPC Storage | FSx for Lustre |
| Ultra Low Latency | EFA |
| Virtual NIC | ENI |
| Up to 100Gbps | ENA |
| Job Scheduling | AWS Batch |
| HPC Cluster Deployment | ParallelCluster |
| Large Data Transfer | Snowball |
| Continuous Sync | DataSync |
| Dedicated Connection | Direct Connect |
| Cost Savings | Spot Fleet |

---

# Memory Anchors

```text
ENI = Network Card
```

---

```text
ENA = 100 Gbps
```

---

```text
EFA = MPI + HPC
```

---

```text
FSx Lustre = HPC Storage
```

---

```text
Batch = Jobs
```

---

```text
ParallelCluster = HPC Cluster
```

---

# Final Memory Anchor

> For blocking traffic in AWS, think NACL (deny), Security Group (allow), and WAF (Layer 7 filtering). For HPC, remember the core trio: EFA for ultra-low latency networking, FSx for Lustre for storage, and ParallelCluster for cluster deployment.
