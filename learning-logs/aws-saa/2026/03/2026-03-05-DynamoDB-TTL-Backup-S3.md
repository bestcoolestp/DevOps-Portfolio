# 2026-03-05 (Part 2) — DynamoDB TTL, Backup & S3 Integration (DevOps/SRE Lens)

## Core Mental Model

DynamoDB = **Serverless database with built-in lifecycle & DR**

Key capabilities:

- TTL → automatic data lifecycle  
- PITR → point-in-time recovery  
- On-demand backup → manual snapshot  
- S3 export/import → analytics & migration  

---

# 1. Time To Live (TTL)

## What TTL Does

TTL automatically deletes items after:

- expiration timestamp
- no manual cleanup required

Example Attribute

```

ExpTime: 1710000000

```

Timestamp:

- Unix epoch format
- background deletion

---

# TTL Architecture

Application writes:

Item + Expiration timestamp

DynamoDB:

- Automatically deletes expired items
- No extra cost for deletion

---

# TTL Use Cases

## Web Sessions

User login

```

SessionID
ExpTime = now + 1 hour

```

Automatic session cleanup

---

## Regulatory Compliance

Example

- Delete logs after 2 years
- GDPR / compliance retention

---

## Cache Pattern

Temporary items

- API responses
- temporary tokens
- short-lived data

---

# DevOps/SRE Takeaway

TTL reduces:

- storage cost
- cleanup jobs
- operational overhead

---

# 2. DynamoDB Backup & Disaster Recovery

DynamoDB provides 3 backup mechanisms

- PITR (Continuous backup)
- On-demand backup
- AWS Backup integration

---

# 3. Continuous Backup (PITR)

Point-in-Time Recovery

Features

- Retention: 35 days
- Restore to any second
- No performance impact

Important

Restore creates:

- New table
- Original table unchanged

---

# PITR Example

Accidental delete

10:01 AM delete

Restore:

10:00:59 AM

Recovered table created

---

# 4. On-Demand Backup

Manual snapshot

Characteristics

- Retained indefinitely
- No performance impact
- Full table backup

Use Cases

- before schema changes
- before deployments
- compliance snapshots

---

# 5. AWS Backup Integration

Enterprise backup solution

Features

- Backup schedules
- Lifecycle policies
- Cross-region replication

Example

Daily backup  
30-day retention  
Cross-region copy

Disaster recovery ready

---

# 6. DynamoDB ↔ S3 Export

Export table data to S3

Requirements

- PITR enabled

Export formats

- DynamoDB JSON
- Amazon ION

---

# Export Use Cases

- Analytics
- ETL pipelines
- Auditing
- Data lake ingestion

Example

DynamoDB → S3 → Athena

Query DynamoDB data using SQL

---

# 7. Import from S3

Create new DynamoDB table

Supported formats

- CSV
- JSON
- ION

Workflow

S3 → Import → DynamoDB table created

---

# Import Use Cases

- Data migration
- bulk loading
- ETL workflows

---

# Error Handling

Import errors logged in:

- CloudWatch Logs

---

# DevOps/SRE Takeaways

DynamoDB provides:

- Built-in lifecycle management
- Built-in disaster recovery
- Built-in analytics integration

Operationally:

No cron jobs  
No backup servers  
No maintenance

---

# One-Line Memory Anchor

> TTL manages lifecycle, PITR handles recovery, S3 enables analytics.

---
