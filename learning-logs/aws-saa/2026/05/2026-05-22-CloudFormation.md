
# 2026-05-22

# AWS CloudFormation

---

# What Problem Does CloudFormation Solve?

Without CloudFormation:

```text
Create VPC → Create Subnets → Create Security Groups → Create EC2 → Create Load Balancer → Create Route53
```

Everything done manually.

---

Problems:

```text
Slow, Error-prone, Hard to reproduce, & Hard to audit
```

---

# CloudFormation Solution

CloudFormation lets you define infrastructure as code.

---

You write:

```yaml
Resources:

  MyEC2:
    Type: AWS::EC2::Instance

  MyBucket:
    Type: AWS::S3::Bucket
```

---

CloudFormation creates everything automatically.

---

# Infrastructure as Code (IaC)

Infrastructure becomes:

```text
Code instead of Mouse Clicks
```

---

Benefits:

```text
Version Control, Automation, & Repeatability
```

---

Exactly the same idea as:

```text
Application Code → Git Repository → CI/CD
```

---

but for infrastructure.

---

# Declarative Model

CloudFormation is:

```text
Declarative
```

---

You describe:

```text
WHAT
```

you want.

---

Not:

```text
HOW
```

to build it.

---

Example:

```yaml
Resources:
  WebServer:
    Type: AWS::EC2::Instance
```

---

You don't specify:

```text
Create Network, Allocate Resources, & Configure APIs
```

---

AWS handles that.

---

# Automatic Dependency Handling

Example:

```text
ALB → Target Group → EC2
```

---

CloudFormation understands dependencies.

---

Creates resources in the correct order.

---

No manual sequencing required.

---

# CloudFormation Stack

A deployment is called:

```text
Stack
```

---

Example:

```text
Production Stack, Development Stack, & Testing Stack
```

---

Each stack contains:

```text
EC2, RDS, S3, ALB, & IAM
```

---

# Stack Lifecycle

Create

```text
CREATE
```

---

Modify

```text
UPDATE
```

---

Remove

```text
DELETE
```

---

Everything managed as one unit.

---

# Example Architecture

CloudFormation Template → Creates

```text
VPC → Subnets → Security Groups → ALB → EC2 → RDS
```

---

Entire architecture deployed with one action.

---

# Benefits

---

## Infrastructure as Code

Everything documented.

---

Example:

```text
Git Repository → CloudFormation Template → Production Environment
```

---

# Version Control

Track changes.

---

Example:

```bash
git diff
```

shows:

```text
Added Load Balancer, Changed Instance Size, & Updated Security Group
```

---

# Code Review

Infrastructure changes become:

```text
Pull Requests
```

---

Same process used for application code.

---

# Repeatability

Deploy identical environments.

---

Example:

```text
Development, Testing, & Production
```

---

Same template.

---

Different parameters.

---

# Faster Deployments

Instead of:

```text
Hours of Clicking
```

---

Use:

```bash
aws cloudformation deploy
```

---

Minutes.

---

# Cost Management

Tag resources automatically.

---

Example:

```yaml
Tags:
  Environment: Production
  Team: DevOps
```

---

Useful for:

```text
Cost Allocation, Charge-back, & Reporting
```

---

# Temporary Environments

Create:

```text
Dev Environment
```

Morning.

---

Delete:

```text
Dev Environment
```

Evening.

---

Only pay when running.

---

# CloudFormation Templates

Formats:

```yaml
YAML
```

or

```json
JSON
```

---

Most engineers prefer:

```yaml
```

because it is easier to read.

---

# Example Template

```yaml
AWSTemplateFormatVersion: "2010-09-09"

Resources:

  MyBucket:
    Type: AWS::S3::Bucket
```

---

This creates:

```text
One S3 Bucket
```

---

# Parameters

Allow customization.

---

Example:

```yaml
Parameters:

  InstanceType:
    Type: String
```

---

Deploy:

```text
t3.micro, t3.small, & t3.medium
```

without changing code.

---

# Outputs

Export useful values.

---

Example:

```yaml
Outputs:

  WebsiteURL:
```

---

Returns:

```text
Load Balancer URL, S3 Website URL, & Database Endpoint
```

---

# Stack Updates

Modify template.

---

CloudFormation calculates:

```text
Change Set
```

---

Shows:

```text
Create, Update, & Delete
```

before execution.

---

Very useful in production.

---

# Drift Detection

Problem:

Someone changes resources manually.

---

Example:

```text
Security Group modified in Console
```

---

Template:

```text
Port 80
```

Actual Resource:

```text
Port 80

Port 22
```

---

CloudFormation detects:

```text
Drift
```

---

Exam keyword:

```text
Detect manual changes
```

Answer:

```text
Drift Detection
```

---

# Nested Stacks

Large environments become huge.

---

Split into:

```text
Network Stack, Database Stack, & Application Stack
```

---

Reuse components.

---

# Cross-Region Deployments

Same template.

---

Deploy to:

```text
us-east-1, eu-west-1, & ap-northeast-2
```

---

Consistent infrastructure globally.

---

# StackSets

Deploy CloudFormation stacks across:

```text
Multiple Accounts & Multiple Regions
```

---

Very common with:

```text
AWS Organizations
```

---

Exam keyword:

```text
Deploy CloudFormation to many accounts
```

Answer:

```text
StackSets
```

---

# Custom Resources

Sometimes AWS resource not supported.

---

Use:

```text
Lambda-backed & Custom Resource
```

---

CloudFormation invokes Lambda.

---

Lambda creates custom configuration.

---

# Infrastructure Composer

Visual builder.

---

Shows:

```text
ALB → EC2 → RDS
```

---

Generates CloudFormation automatically.

---

Useful for learning.

---

# CloudFormation vs Terraform

CloudFormation:

```text
AWS Native
```

---

Terraform:

```text
Multi-Cloud
```

---

Interview Comparison

| Feature | CloudFormation | Terraform |
|----------|----------|----------|
| AWS Support | Excellent | Excellent |
| Azure Support | No | Yes |
| GCP Support | No | Yes |
| Native AWS Features | Fastest | Slight Delay |
| Multi-Cloud | No | Yes |

---

# Exam Decision Table

| Requirement | Service |
|------------|----------|
| Infrastructure as Code | CloudFormation |
| Deploy AWS resources automatically | CloudFormation |
| Detect manual changes | Drift Detection |
| Preview infrastructure changes | Change Sets |
| Reuse stacks | Nested Stacks |
| Deploy across accounts | StackSets |
| Unsupported resources | Custom Resources |

---

# Real DevOps Usage

Typical workflow:

```text
Git → Pull Request → CloudFormation Template → Code Review → CI/CD Pipeline → AWS
```

---

No engineers logging into AWS Console.

Everything controlled by code.

---

# Memory Anchors

```text
Infrastructure as Code = CloudFormation
```

---

```text
Preview Changes = Change Sets
```

---

```text
Manual Modification Detection = Drift Detection
```

---

```text
Multiple Accounts = StackSets
```

---

# Interview Memory Anchor

If asked:

"How do you create identical AWS environments repeatedly?"

Answer:

```text
CloudFormation templates.

Store them in Git.

Deploy through CI/CD.

Use parameters for environment-specific values.
```

That is exactly how many AWS environments are managed in production.
