# 2026-05-16 — AWS Backup

# What is AWS Backup?

AWS Backup is a:

```text
Fully Managed Backup Service
```

Purpose:

```text
Centralize, Automate, Manage, & all backups
```

across AWS.

---

Without AWS Backup:

```text
Custom scripts

Cron jobs

Lambda functions

Manual schedules
```

---

With AWS Backup:

```text
One dashboard

One policy

One strategy
```

for all backups.

---

# Core Idea

```text
Resources → Backup Plan → Backup Vault → Restore
```

---

# Supported Services

Compute:

```text
EC2 & EBS
```

---

Databases:

```text
RDS, Aurora, DynamoDB, DocumentDB, & Neptune
```

---

Storage:

```text
S3, EFS, FSx, & Storage Gateway
```

---

The list continues growing.

---

# Backup Types

## 1. On-Demand Backup

Manual backup.

```text
Click → Backup Now
```

---

Useful for:

```text
Before upgrades

Before deployments

Before maintenance
```

---

## 2. Scheduled Backup

Automatic backup.

Examples:

```text
Every 12 hours
```

---

```text
Daily, Weekly, & Monthly
```

---

```text
Cron expressions
```

---

# Backup Plan

A Backup Plan defines:

```text
When, How often, & How long
```

backups are kept.

---

Components:

```text
Frequency, Backup Window, Cold Storage Transition, Retention Period
```

---

# Example Backup Plan

```text
Production Backup Plan → Daily at 1 AM → Move to Cold Storage after 30 days → Delete after 365 days
```

---

# Backup Window

Backup window =

```text
Allowed time to start a backup
```

Example:

```text
1 AM - 5 AM
```

AWS chooses a time.

---

# Cold Storage

Move older backups to cheaper storage.

Example:

```text
30 days → Cold Storage → 365 days retention
```

---

Benefits:

```text
Lower cost
```

---

# Retention Period

Defines:

```text
How long backups exist
```

Examples:

```text
30 days, 365 days, & 7 years
```

---

# Tag-Based Backup Policies

Backup resources automatically.

Example:

```text
Environment = Production
```

---

AWS automatically backs up:

```text
EC2, RDS, & EBS
```

with:

```text
Environment = Production
```

---

# Cross-Region Backup

Purpose:

```text
Disaster Recovery
```

Architecture:

```text
Primary Region → Backup → Secondary Region
```

---

Example:

```text
us-east-1 → eu-central-1
```

---

Benefits:

```text
Protect against regional disasters
```

---

# Cross-Account Backup

Architecture:

```text
Account A → Backup → Account B
```

---

Benefits:

```text
Isolation, Security, & Compliance
```

---

# Point-In-Time Recovery

Supported services:

```text
Aurora & RDS
```

---

Allows:

```text
Restore to an exact second
```

---

Example:

```text
10:17:23 AM
```

---

# Backup Vault

All backups are stored inside:

```text
Backup Vault
```

---

Architecture:

```text
Resource → Backup Plan → Backup Vault
```

---

# AWS Backup Vault Lock

Purpose:

```text
Protect backups
```

using:

```text
WORM
```

---

# WORM

Means:

```text
Write Once Read Many
```

---

Once locked:

```text
Cannot delete & Cannot modify
```

---

Even:

```text
Root user
```

cannot override.

---

# Vault Lock Use Cases

Protection against:

```text
Human mistakes, Malicious deletion, & Ransomware attacks
```

---

Compliance:

```text
SEC, FINRA, Healthcare, & Government
```

---

# Backup Architecture

```text
EC2, EBS, RDS, Aurora, & DynamoDB → Backup Plan → Backup Vault → Cold Storage → Restore
```

---

# Disaster Recovery Example

```text
Production RDS → Backup → Secondary Region → Restore during disaster
```

---

# AWS Backup vs Native Backups

## Native Backup

Example:

```text
RDS Snapshot, EBS Snapshot, & DynamoDB Backup
```

Each service managed separately.

---

## AWS Backup

```text
One dashboard, One policy, & One strategy
```

for all services.

---

# Exam Decision Table

| Scenario | Answer |
|----------|--------|
| Centralized backups | AWS Backup |
| Cross-region backups | AWS Backup |
| Cross-account backups | AWS Backup |
| Tag-based backup automation | AWS Backup |
| Protect backups from deletion | Vault Lock |
| WORM requirement | Vault Lock |
| Point-in-time recovery | Aurora/RDS |
| Scheduled backups | Backup Plan |

---

# Backup Workflow

```text
Resources → Backup Plan → Backup Vault → Cold Storage → Restore
```

---

# Memory Anchors

```text
AWS Backup = Centralized Backups
```

---

```text
Vault Lock = WORM
```

---

```text
WORM = Write Once Read Many
```

---

```text
Tag = Automatic Backup
```

---

```text
Cross Region = Disaster Recovery
```

---

```text
Cross Account = Isolation
```

---

```text
Cold Storage = Cost Savings
```

---

# SAA Exam Traps

Question:

```text
Centralize backups

across AWS services
```

Answer:

```text
AWS Backup
```

---

Question:

```text
Prevent backup deletion

even by root user
```

Answer:

```text
Vault Lock
```

---

Question:

```text
Immutable backups
```

Answer:

```text
WORM
```

---

Question:

```text
Backup only production resources
```

Answer:

```text
Tag-Based Backup Policy
```

---

Question:

```text
Disaster Recovery

in another region
```

Answer:

```text
Cross-Region Backup
```

---

# Final Memory Anchor

> AWS Backup is the centralized backup service for AWS resources. Backup Plans automate schedules, retention, and cold storage transitions. Cross-region backups support disaster recovery, cross-account backups improve isolation, and Vault Lock enforces immutable WORM protection that even the root user cannot override.
