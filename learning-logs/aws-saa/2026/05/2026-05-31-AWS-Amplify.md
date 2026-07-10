
# 2026-05-31

# AWS Amplify

---

# What is AWS Amplify?

AWS Amplify is a:

```text
Full-Stack Development Platform
```

for building:

```text
Web Applications & Mobile Applications
```

using AWS services.

---

Think:

```text
Elastic Beanstalk for Frontend Developers
```

---

Amplify simplifies:

```text
Development, Integration, Deployment, & Hosting
```

---

# Main Goal

Without Amplify:

```text
Frontend → Configure Cognito → Configure API Gateway → Configure Lambda → Configure S3 → Configure → CloudFront → Configure CI/CD
```

---

Lots of manual work.

---

With Amplify:

```text
Frontend → Amplify → AWS Services
```

---

Much simpler.

---

# Core Architecture

```text
Frontend App → AWS Amplify → AWS Backend Services
```

---

Example:

```text
React App → Amplify → Cognito → DynamoDB → Lambda → S3
```

---

# Amplify CLI

Developer tool.

---

Install:

```bash
npm install -g @aws-amplify/cli
```

---

Initialize project:

```bash
amplify init
```

---

Add authentication:

```bash
amplify add auth
```

---

Deploy backend:

```bash
amplify push
```

---

Amplify automatically provisions AWS resources.

---

# Backend Services

Amplify can provision many AWS services.

---

## Authentication

Uses:

```text
Amazon Cognito
```

---

Features:

```text
Sign Up, Sign In, MFA, & Social Login
```

---

Architecture:

```text
User → Amplify → Cognito
```

---

## Storage

Uses:

```text
Amazon S3
```

---

Examples:

```text
Profile Pictures, Documents, & Media Files
```

---

Architecture:

```text
Web App → Amplify → S3
```

---

## APIs

Supports:

```text
REST APIs & GraphQL APIs
```

---

REST:

```text
API Gateway + Lambda
```

---

GraphQL:

```text
AWS AppSync
```

---

Architecture:

```text
Frontend → Amplify → AppSync → DynamoDB
```

---

## Database

Most common:

```text
Amazon DynamoDB
```

---

Used for:

```text
Users, Posts, Comments, & Application Data
```

---

## Serverless Functions

Uses:

```text
AWS Lambda
```

---

Example:

```text
Image Processing, Notifications, & Business Logic
```

---

## AI & ML

Supports:

```text
Amazon SageMaker, Amazon Rekognition, & Amazon Lex
```

---

Examples:

```text
Predictions, Image Analysis, & Chatbots
```

---

# Amplify Features

| Feature | AWS Service |
|-----------|-----------|
| Authentication | Cognito |
| Storage | S3 |
| REST APIs | API Gateway |
| GraphQL APIs | AppSync |
| Functions | Lambda |
| Database | DynamoDB |
| AI/ML | SageMaker |
| Chatbots | Lex |

---

# CI/CD Integration

Amplify includes:

```text
Built-In CI/CD
```

---

Supported repositories:

| Source Control |
|--------------|
| GitHub |
| GitLab |
| Bitbucket |
| AWS CodeCommit |

---

Workflow:

```text
Git Push → Amplify Build → Deploy → CloudFront
```

---

Automatic deployment.

---

# Amplify Hosting

Amplify Console hosts:

```text
Frontend Applications
```

---

Examples:

```text
React, Angular, Vue, & Next.js
```

---

Deployment:

```text
Git Repository → Amplify Console → CloudFront → Users
```

---

# Global Distribution

Amplify uses:

```text
Amazon CloudFront
```

---

Benefits:

```text
Low Latency, Global Reach, & HTTPS
```

---

# Example Architecture

## Social Media App

```text
React Frontend → Amplify → Cognito → AppSync → DynamoDB → Lambda
```

---

Authentication:

```text
Cognito
```

---

API:

```text
GraphQL (AppSync)
```

---

Database:

```text
DynamoDB
```

---

Business Logic:

```text
Lambda
```

---

# Mobile App Example

```text
Flutter App → Amplify → Cognito → S3 → DynamoDB
```

---

Features:

```text
Login, File Upload, & User Data
```

---

# Amplify vs Elastic Beanstalk

Common exam comparison.

---

# Elastic Beanstalk

Focus:

```text
Backend Applications
```

---

Examples:

```text
Java, .NET, Node.js, Python
```

---

You deploy:

```text
Application Server
```

---

# Amplify

Focus:

```text
Frontend + Mobile + Full Stack
```

---

You deploy:

```text
Web Apps & Mobile Apps
```

---

# Comparison

| Feature | Amplify | Elastic Beanstalk |
|----------|----------|----------|
| Frontend Hosting | ✅ | ❌ |
| Mobile Apps | ✅ | ❌ |
| Cognito Integration | ✅ | Manual |
| GraphQL Support | ✅ | Manual |
| CI/CD | Built-in | Limited |
| Web Servers | Limited | ✅ |
| Java/.NET Apps | ❌ | ✅ |

---

# Amplify vs App Runner

---

# App Runner

Purpose:

```text
Run Containers and Web Services
```

---

# Amplify

Purpose:

```text
Frontend and Mobile Apps
```

---

# Typical Exam Questions

Question:

```text
A developer wants to build a React app with authentication, storage, and APIs using AWS services.
```

Answer:

```text
AWS Amplify
```

---

Question:

```text
A mobile application requires Cognito, DynamoDB, and CI/CD integration.
```

Answer:

```text
AWS Amplify
```

---

Question:

```text
A developer wants GitHub commits to automatically deploy a frontend application.
```

Answer:

```text
AWS Amplify
```

---

# Architecture Example

```text
GitHub → Amplify Console → Build → Deploy → CloudFront → Users
```

---

Backend:

```text
Amplify → Cognito, AppSync, Lambda, DynamoDB, S3
```

---

# Exam Keywords

If you see:

```text
Web App, Mobile App, React, Vue, Authentication, GraphQL, & CI/CD
```

Answer:

```text
AWS Amplify
```

---

# Memory Anchors

```text
Amplify = Frontend
```

---

```text
Amplify = Mobile Apps
```

---

```text
Amplify = Cognito + AppSync + DynamoDB
```

---

```text
Amplify = Full-Stack Development
```

---

```text
GitHub → Amplify → CloudFront
```

---

# DevOps Interview Insight

Amplify is often used by frontend teams that don't want to manage infrastructure.

Typical architecture:

```text
React → Amplify → Cognito → AppSync → DynamoDB → CloudFront
```

Benefits:

- Fast development
- Managed backend services
- Integrated authentication
- Built-in CI/CD
- Global hosting
- Minimal infrastructure management

For AWS exams, the strongest association is:

```text
Amplify = Build & Deploy Web/Mobile Apps Quickly
```
