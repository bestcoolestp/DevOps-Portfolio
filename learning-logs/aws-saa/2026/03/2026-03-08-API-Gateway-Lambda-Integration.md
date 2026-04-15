# 2026-03-08 — API Gateway + Lambda (Serverless Integration & Demo) (DevOps/SRE Lens)

## Core Mental Model

API Gateway + Lambda = **Serverless application runtime**

Client → API Gateway → Lambda → DynamoDB

👉 This is the **default AWS serverless architecture**

---

# 1. Why API Gateway (vs other options)

## Option 1 — Direct → Lambda

Client → Lambda

Problems:
- IAM complexity
- not public-friendly
- no throttling / auth / caching

---

## Option 2 — ALB → Lambda

Client → ALB → Lambda

Good for:
- simple HTTP exposure

Missing:
- API features (versioning, usage plans, auth richness)

---

## Option 3 — API Gateway (Recommended)

Client → API Gateway → Lambda

Provides:
- security
- throttling
- versioning
- transformation

👉 API Gateway = **production-grade API layer**

---

# 2. Serverless Architecture

Frontend

- S3 + CloudFront

Backend

- API Gateway → Lambda

Database

- DynamoDB

Flow

User → API Gateway → Lambda → DynamoDB

---

# 3. API Gateway Features (Why it matters)

- Authentication (IAM, Cognito, Custom)
- Rate limiting / throttling
- API keys / usage plans
- Versioning (v1, v2, v3)
- Stages (dev, test, prod)
- Request/response transformation
- Caching
- SDK generation
- OpenAPI import/export

---

# 4. Integration Types

## Lambda (Most Common)

API → Lambda → Business Logic

---

## HTTP Integration

API → ALB / EC2 / On-Prem

---

## AWS Service Integration

API → SQS / Kinesis / Step Functions

👉 No compute required

---

# 5. Endpoint Types (Quick Recall)

| Type | Use Case |
|------|--------|
| Edge | Global clients |
| Regional | Same-region clients |
| Private | Internal VPC APIs |

---

# 6. Security Model

- IAM → internal systems
- Cognito → user authentication
- Custom Authorizer → custom logic
- HTTPS via ACM
- Route53 → custom domain

---

# 7. Demo Walkthrough (What actually happened)

## Step 1 — Create API

Example

```

MyFirstAPI

```

Type:

- REST API
- Regional endpoint

---

## Step 2 — Add Method

Resource:

```

/

```

Method:

```

GET

```

Integration:

- Lambda function

---

## Step 3 — Lambda Setup

Function:

```

api-gateway-route-gets

```

Returns:

```

{
"statusCode": 200,
"body": "hello from Lambda"
}

```

---

## Step 4 — Proxy Integration

Lambda Proxy = enabled

API Gateway passes:

- headers
- query params
- path
- body

👉 Lambda receives full HTTP request context

---

## Step 5 — Testing

Test via console

Result:

```

hello from Lambda

```

Logs:

- CloudWatch Logs
- Full request/response visibility

---

## Step 6 — Add Resource

New path:

```

/houses

```

Method:

```

GET

```

New Lambda:

```

hello from my pretty house

```

---

## Step 7 — Deployment

Stage:

```

dev

```

Invoke URL generated

---

# 8. Final Endpoints

```

/dev
/dev/houses

```

Behavior

- `/dev` → hello from Lambda  
- `/houses` → house response  
- invalid path →  

```

missing authentication token

```

---

# 9. Key Operational Insights

## API Gateway Timeout

- Max: **29 seconds**

Implication:

- long tasks → use async (SQS, Step Functions)

---

## Logging

- CloudWatch Logs
- request tracing
- debugging

---

## Permissions

API Gateway automatically adds:

- Lambda invoke permission

IAM resource policy updated

---

# 10. DevOps/SRE Takeaways

API Gateway + Lambda gives:

- fully serverless backend
- auto scaling
- built-in security
- API lifecycle management

Production Pattern

- API Gateway (entry)
- Lambda (compute)
- DynamoDB (data)
- CloudWatch (observability)

---

# One-Line Memory Anchor

> API Gateway exposes Lambda as a production-ready API.

---
