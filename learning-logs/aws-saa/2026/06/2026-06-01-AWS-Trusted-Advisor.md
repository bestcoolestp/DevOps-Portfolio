
# 2026-06-01

# AWS Trusted Advisor

---

# What is AWS Trusted Advisor?

AWS Trusted Advisor is:

```text
An AWS Best Practices Advisor
```

that analyzes your AWS account and provides:

```text
Recommendations, Warnings, & Optimization Opportunities
```

---

No installation required.

```text
Enable AWS Account → Trusted Advisor Analyzes Resources → Recommendations Generated
```

---

# Main Purpose

Trusted Advisor helps answer:

```text
Am I secure?

Am I wasting money?

Am I approaching limits?

Is my architecture resilient?
```

---

# Categories of Checks

Trusted Advisor evaluates resources in six major categories.

---

## 💰 Cost Optimization

Finds resources costing money unnecessarily.

Examples:

```text
Idle EC2 Instances, Unused Elastic IPs, Underutilized Load Balancers, & Unattached EBS Volumes
```

---

Typical Recommendation:

```text
Terminate, Resize, & Remove
```

---

## ⚡ Performance

Improves AWS service performance.

Examples:

```text
High Utilization Resources, CloudFront Optimization, & Service Performance Recommendations
```

---

Goal:

```text
Faster Applications & Better Resource Usage
```

---

## 🔒 Security

Most commonly tested category.

Checks:

```text
S3 Bucket Permissions, Root Account Usage, MFA Status, Security Groups, & Public Snapshots
```

---

Examples:

```text
Security Group  0.0.0.0/0  Port 22 Open
```

---

```text
S3 Bucket Publicly Accessible
```

---

```text
Root User Recently Used
```

---

## 🛡️ Fault Tolerance

Improves availability and resiliency.

Examples:

```text
Multi-AZ RDS, Auto Scaling, Backup Configurations, Route53 Health Checks
```

---

Goal:

```text
Reduce Single Points of Failure
```

---

## 📈 Service Limits

Monitors AWS quotas.

Examples:

```text
VPC Limits, EC2 Limits, EBS Limits, & IAM Limits
```

---

Example:

```text
EC2 Running Instances 95% Of Account Limit
```

---

Warning generated before outage occurs.

---

## 🧑‍💼 Operational Excellence

Based on AWS Well-Architected Framework.

Examples:

```text
Monitoring, Logging, Automation, Operations Practices
```

---

Goal:

```text
Operate Systems Efficiently
```

---

# Trusted Advisor Architecture

```text
AWS Account → Trusted Advisor → Analyze Resources → Generate Findings → Recommendations
```

---

# Example Security Findings

## Public S3 Bucket

```text
Bucket → Public Access Enabled → Security Warning
```

---

## Public EBS Snapshot

```text
EBS Snapshot → Shared Publicly → Security Risk
```

---

## Public RDS Snapshot

```text
RDS Snapshot → Publicly Shared → Security Finding
```

---

## Root Account Usage

```text
Root User Used Recently → Recommendation: Use IAM Users Instead
```

---

# Example Cost Findings

## Idle EC2

```text
Low CPU → Wasted Cost
```

---

Recommendation:

```text
Resize or Terminate
```

---

## Unused Elastic IP

```text
Elastic IP → Not Attached → Cost Generated
```

---

Recommendation:

```text
Release EIP
```

---

# Example Fault Tolerance Findings

## Single-AZ RDS

```text
Production Database → Single AZ → Risk of Outage
```

---

Recommendation:

```text
Enable Multi-AZ
```

---

## Missing Backups

```text
Database → No Backup Strategy → Risk
```

---

# Support Plan Requirements

Trusted Advisor functionality depends on support plan.

---

## Basic / Developer Support

Limited checks only.

Mostly:

```text
Security & Service Limits
```

---

Examples:

```text
Root Account Usage, Security Groups, & Service Quotas
```

---

## Business Support

Full Trusted Advisor.

Access to:

```text
Cost Optimization

Performance

Security

Fault Tolerance

Service Limits

Operational Excellence
```

---

## Enterprise Support

Everything in Business Support plus enterprise support features.

---

# Programmatic Access

Available with higher support plans.

---

Use:

```text
AWS Support API
```

---

Example:

```bash
aws support describe-trusted-advisor-checks
```

---

Retrieve:

```text
Checks, Recommendations, & Statuses
```

---

Useful for:

```text
Automation, Reporting, & Dashboards
```

---

# Common Exam Scenarios

## Scenario 1

Question:

```text
How can you identify publicly accessible S3 buckets?
```

Answer:

```text
AWS Trusted Advisor
```

---

## Scenario 2

Question:

```text
How can you identify idle resources causing unnecessary cost?
```

Answer:

```text
AWS Trusted Advisor
```

---

## Scenario 3

Question:

```text
How can you monitor approaching AWS service limits?
```

Answer:

```text
AWS Trusted Advisor
```

---

## Scenario 4

Question:

```text
How can you receive best-practice recommendations for your AWS account?
```

Answer:

```text
AWS Trusted Advisor
```

---

# Trusted Advisor vs AWS Config

Very common confusion.

---

## AWS Trusted Advisor

Focus:

```text
Best Practices & Recommendations
```

Examples:

```text
Cost, Performance, & Security
```

---

## AWS Config

Focus:

```text
Compliance & Configuration Tracking
```

Examples:

```text
Resource History, Compliance Rules, & Configuration Changes
```

---

Comparison:

| Service | Primary Purpose |
|----------|----------|
| Trusted Advisor | Best Practice Recommendations |
| AWS Config | Compliance & Configuration Auditing |

---

# Trusted Advisor vs Security Hub

---

## Trusted Advisor

```text
Best Practices
```

Examples:

```text
Unused Resources, Public Buckets, & Service Limits
```

---

## Security Hub

```text
Central Security Dashboard
```

Aggregates:

```text
GuardDuty, Inspector, Macie, & Partner Tools
```

---

# Real-World DevOps Use Cases

Before production release:

```text
Run Trusted Advisor → Review Security Findings → Review Cost Findings → Review Service Limits → Deploy
```

---

Monthly Operations Review:

```text
Trusted Advisor → Unused Resources → Cost Reduction
```

---

Cloud Migration Review:

```text
Trusted Advisor → Architecture Review → Resilience Improvements
```

---

# Memory Anchors

```text
Trusted Advisor = AWS Best Practices
```

---

```text
Trusted Advisor = Cost Optimization
```

---

```text
Trusted Advisor = Security Recommendations
```

---

```text
Trusted Advisor = Service Limits Monitoring
```

---

```text
Trusted Advisor = High-Level AWS Health Check
```

---

# Exam Keywords

If you see:

```text
Best Practices

Recommendations

Security Risks

Cost Savings

Service Limits

Unused Resources
```

Answer:

```text
AWS Trusted Advisor
```

---

# DevOps / SRE Perspective

Trusted Advisor is often one of the first tools used during:

```text
Cloud Cost Reviews

Security Audits

AWS Account Health Checks

Production Readiness Reviews
```

A common monthly workflow:

```text
Trusted Advisor → Identify Waste → Fix Security Findings → Review Service Quotas → Reduce AWS Bill
```

Think of Trusted Advisor as:

```text
AWS Solution Architect inside your AWS Account
```

continuously looking for:

```text
Cost Problems

Security Problems

Performance Problems

Availability Problems
```
