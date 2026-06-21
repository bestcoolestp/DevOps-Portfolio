# 2026-05-13 — AWS Disaster Recovery (DR)

# What is Disaster Recovery?

Disaster Recovery (DR) means:

```text
Preparing systems to recover from events that interrupt business operations.
```

Examples:

```text
Datacenter outage

Cyber attack

Ransomware

Region failure

Power outage

Hardware failure

Human error
```

Goal:

```text
Minimize: Data loss, Downtime, & Financial impact
```

---

# Two Core Metrics

Every DR question starts with:

```text
RPO & RTO
```

---

# RPO

```text
Recovery Point Objective
```

Question:

```text
How much data loss can we tolerate?
```

---

Example:

```text
RPO = 5 minutes
```

means:

```text
Maximum 5 minutes of data can be lost.
```

---

Smaller RPO:

```text
More replication & Higher cost
```

---

# RTO

```text
Recovery Time Objective
```

Question:

```text
How long can the system be down?
```

---

Example:

```text
RTO = 15 minutes
```

means:

```text
The system must be restored within 15 minutes.
```

---

Smaller RTO:

```text
Faster recovery & Higher cost
```

---

# Relationship

```text
Smaller RPO + Smaller RTO  = Higher Cost
```

---

# Disaster Recovery Strategies

There are four major strategies.

---

# 1. Backup & Restore

Cheapest option.

Architecture:

```text
Production → Backup → S3 → Glacier
```

---

During disaster:

```text
Restore → Rebuild → Resume
```

---

Characteristics:

```text
High RPO & High RTO
```

---

Pros:

```text
Cheap & Simple
```

---

Cons:

```text
Slow recovery
```

---

Common services:

```text
S3, Glacier, EBS Snapshots, AWS Backup, Snowball
```

---

# 2. Pilot Light

Only critical systems remain running.

Architecture:

```text
RDS(Running) + EC2(Off) 
```

---

During disaster:

```text
Launch EC2

Attach services

Scale up
```

---

Characteristics:

```text
Medium RPO & Medium RTO
```

---

Pros:

```text
Faster recovery

Lower cost
```

---

Cons:

```text
Some setup still required
```

---

Example:

```text
Database always running

Application servers created only during disaster
```

---

# 3. Warm Standby

Small production environment always running.

Architecture:

```text
Production → Reduced Production
```

---

During disaster:

```text
Scale Out → Full Production
```

---

Characteristics:

```text
Low RPO & Low RTO
```

---

Pros:

```text
Fast recovery
```

---

Cons:

```text
More expensive
```

---

Example:

```text
1 EC2 → 10 EC2
```

---

# 4. Multi-Site (Hot Site)

Full production in multiple locations.

Architecture:

```text
Region A ↔ Region B
```

Both active.

---

Characteristics:

```text
Very Low RPO & Very Low RTO
```

---

Pros:

```text
Near zero downtime
```

---

Cons:

```text
Most expensive
```

---

# Strategy Comparison

| Strategy | Cost | RPO | RTO |
|----------|------|-----|-----|
| Backup & Restore | Lowest | High | High |
| Pilot Light | Low | Medium | Medium |
| Warm Standby | Medium | Low | Low |
| Multi-Site | Highest | Very Low | Very Low |

---

# AWS Services for DR

## Storage Backups

```text
S3, Glacier, & EBS Snapshots
```

---

## Database Protection

```text
RDS Multi-AZ

Aurora Global Database

Cross-Region Replicas
```

---

## DNS Failover

```text
Route53
```

---

## High Availability

```text
EFS, ElastiCache, & RDS Multi-AZ
```

---

## Infrastructure Automation

```text
CloudFormation

Elastic Beanstalk
```

---

## Monitoring

```text
CloudWatch & Lambda
```

---

# Chaos Engineering

Netflix invented:

```text
Simian Army
```

---

Most famous tool:

```text
Chaos Monkey
```

Purpose:

```text
Randomly terminate instances
```

Goal:

```text
Test resilience before disasters occur.
```

---

# Elastic Disaster Recovery (DRS)

Formerly:

```text
CloudEndure
```

---

Purpose:

```text
Continuous disaster recovery
```

---

# Supported Sources

```text
Physical servers

VMware

Hyper-V

AWS

Other cloud providers
```

---

# DRS Architecture

```text
Corporate Datacenter → Replication Agent → AWS Staging Area → Continuous Block Replication → Low-cost EC2 + EBS
```

---

# During Disaster

AWS automatically:

```text
Launch Production EC2

Attach EBS

Bring system online
```

Recovery:

```text
Minutes
```

---

# Failback

Once datacenter recovers:

```text
AWS → Corporate Datacenter
```

Operations return.

---

# Typical DRS Use Cases

```text
Oracle

MySQL

SQL Server

SAP

Enterprise Applications
```

---

# Ransomware Protection

Since replication is continuous:

```text
Recovery points
```

can be selected.

This helps recover before infection.

---

# Exam Decision Table

| Requirement | Answer |
|-------------|--------|
| Cheapest DR | Backup & Restore |
| Critical DB always running | Pilot Light |
| Small production always running | Warm Standby |
| Active-active architecture | Multi-Site |
| Continuous replication | Elastic DRS |
| Fast failover in minutes | Elastic DRS |
| Cross-region DNS failover | Route53 |
| Test resilience automatically | Chaos Engineering |

---

# Architecture Examples

## Backup & Restore

```text
Production → Backup → S3 → Glacier
```

---

## Pilot Light

```text
RDS(Running) → Launch EC2 During Disaster
```

---

## Warm Standby

```text
1 EC2 → 10 EC2
```

---

## Multi-Site

```text
Region A ↔ Region B
```

---

## Elastic DRS

```text
Datacenter → Replication Agent → AWS Staging → Failover → Production
```

---

# SAA Exam Traps

### Scenario 1

Question:

```text
Lowest cost DR?
```

Answer:

```text
Backup & Restore
```

---

### Scenario 2

Question:

```text
Core services always running.
```

Answer:

```text
Pilot Light
```

---

### Scenario 3

Question:

```text
Entire application running at reduced scale.
```

Answer:

```text
Warm Standby
```

---

### Scenario 4

Question:

```text
Near-zero downtime.
```

Answer:

```text
Multi-Site
```

---

### Scenario 5

Question:

```text
Continuous block-level replication.
```

Answer:

```text
Elastic DRS
```

---

# Memory Anchors

```text
RPO = Data Loss
```

---

```text
RTO = Downtime
```

---

```text
Backup & Restore = Cheap but Slow
```

---

```text
Pilot Light = Core Systems Running
```

---

```text
Warm Standby = Mini Production Running
```

---

```text
Multi-Site = Full Production Everywhere
```

---

```text
Elastic DRS = Continuous Replication
```

---

# Final Memory Anchor

> Disaster Recovery is a tradeoff between cost, acceptable data loss (RPO), and acceptable downtime (RTO). Backup & Restore is the cheapest but slowest. Pilot Light keeps critical components running. Warm Standby runs a reduced production environment. Multi-Site runs full production in multiple locations. Elastic Disaster Recovery (DRS) provides continuous replication with failover in minutes.
