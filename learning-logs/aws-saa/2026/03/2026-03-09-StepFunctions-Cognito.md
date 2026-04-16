# 2026-03-09 — Step Functions & Cognito (DevOps/SRE Lens)

# Part 1 — AWS Step Functions

## Core Mental Model

Step Functions = **Serverless workflow orchestrator**

- Lambda executes logic  
- Step Functions **controls the flow**

👉 Lambda = compute  
👉 Step Functions = **control plane**

---

# 1. Why Step Functions Exist

Problem:

Multiple Lambdas = messy orchestration

```

Lambda A → Lambda B → Lambda C

```

Hard to manage:
- retries
- failures
- branching
- state

---

## Solution

Step Functions

Define workflow as:

- state machine
- visual graph

---

# 2. State Machine Model

Each step defines:

- action
- next state
- success/failure path

Example

Start → Process → Validate → Complete

---

# 3. Core Capabilities

## Sequencing

Run steps in order

---

## Parallel Execution

Run multiple branches

---

## Conditional Logic

If / Else branching

---

## Error Handling

Retry / fallback logic

---

## Timeouts

Prevent stuck workflows

---

## Human Approval

Manual step

Example

Approval → Continue / Reject

---

# 4. Integrations

Step Functions can orchestrate:

- Lambda
- ECS / Fargate
- EC2
- API Gateway
- SQS
- On-prem systems

---

# 5. Real Architecture Example

Order Processing

User → API Gateway → Step Functions

Workflow

1. Validate order  
2. Charge payment  
3. Update inventory  
4. Send confirmation  

---

# 6. DevOps/SRE Takeaways

Step Functions provide:

- reliability (retry logic)
- observability (visual workflow)
- maintainability (no nested Lambda calls)

---

# One-Line Memory Anchor

> Step Functions orchestrate; Lambda executes.

---

# Part 2 — Amazon Cognito

## Core Mental Model

Cognito = **Identity system for external users**

- IAM → internal users  
- Cognito → external users  

👉 Cognito = **Auth + Identity + Access**

---

# 1. Cognito Components

Two main parts:

- User Pools → authentication  
- Identity Pools → authorization (AWS access)

---

# 2. User Pools (Authentication)

User directory

Features

- Sign-up / Sign-in
- Password reset
- MFA
- Email / phone verification
- Social login

---

## Authentication Flow

User → Cognito User Pool → Token → API Gateway

Token used for:

- authentication
- authorization

---

# 3. Identity Pools (Authorization)

Purpose:

- provide AWS credentials

Flow

User logs in → gets token  
↓  
Identity Pool exchanges token  
↓  
Temporary AWS credentials issued  

---

# 4. What Users Can Do

With credentials:

- Access S3
- Access DynamoDB
- Call APIs

---

# 5. Fine-Grained Access

Example

DynamoDB row-level access

User:

```

user_id = 123

```

Policy:

- can only read items with user_id = 123

---

# 6. Cognito vs IAM

| Feature | IAM | Cognito |
|--------|-----|--------|
| Users | Internal | External |
| Scale | Small | Massive |
| Use Case | Admins | App users |

---

# 7. Integration Patterns

## API Gateway

User → Cognito → API Gateway → Lambda

---

## ALB

User → ALB → Cognito → Backend

---

## Direct AWS Access

User → Cognito → Identity Pool → S3/DynamoDB

---

# 8. Real-World Architecture

Mobile App

User → Cognito →  
- API Gateway → Lambda  
- S3 (direct upload)  
- DynamoDB  

---

# 9. DevOps/SRE Takeaways

Cognito provides:

- authentication (User Pools)
- authorization (Identity Pools)
- token-based security

Removes:

- custom auth systems
- password management burden

---

# One-Line Memory Anchor

> User Pools authenticate; Identity Pools authorize.

---

# Combined Architecture Insight

User → Cognito → API Gateway → Step Functions → Lambda → DynamoDB

This is:

- fully serverless
- event-driven
- scalable
- secure

---
