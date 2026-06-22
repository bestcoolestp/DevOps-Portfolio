# 2026-05-15 — AWS Migration to Aurora

# Aurora Migration Methods

Aurora migration differs depending on:

```text
MySQL or PostgreSQL
```

and

```text
RDS or External Database
```

---

# MySQL → Aurora MySQL

There are 5 methods.

---

# 1. Snapshot Restore

```text
RDS MySQL → Snapshot → Aurora MySQL
```

Advantages:

```text
Fast & Simple
```

Disadvantages:

```text
Requires downtime
```

---

# 2. Aurora Read Replica

```text
RDS MySQL → Aurora Read Replica → Replica Lag = 0 → Promote Cluster
```

Advantages:

```text
Minimal downtime
```

Disadvantages:

```text
Slower & Additional network cost
```

---

# 3. Percona XtraBackup

Used for:

```text
External MySQL
```

Architecture:

```text
External MySQL → Percona XtraBackup → S3 → Aurora MySQL
```

Important:

```text
Only Percona is supported
```

---

# 4. MySQL Dump

Uses:

```bash
mysqldump
```

Architecture:

```text
MySQL → mysqldump → Aurora
```

Disadvantages:

```text
Very slow & No S3 support
```

Only suitable for:

```text
Small databases
```

---

# 5. Amazon DMS

Architecture:

```text
MySQL → DMS → Aurora MySQL
```

Advantages:

```text
Continuous replication & Minimal downtime
```

Requirements:

```text
Both databases must be running.
```

---

# PostgreSQL → Aurora PostgreSQL

4 methods.

---

# 1. Snapshot Restore

```text
RDS PostgreSQL → Snapshot → Aurora PostgreSQL
```

---

# 2. Aurora Read Replica

```text
RDS PostgreSQL → Aurora Read Replica → Lag = 0 → Promote
```

---

# 3. Backup + S3 Import

Used for:

```text
External PostgreSQL
```

Architecture:

```text
PostgreSQL → Backup → S3 → Aurora PostgreSQL
```

Uses:

```text
AWS S3 Aurora Extension
```

---

# 4. Amazon DMS

```text
PostgreSQL → DMS → Aurora PostgreSQL
```

---

# Aurora Migration Decision Table

| Scenario | Best Choice |
|----------|-------------|
| Fastest migration | Snapshot Restore |
| Minimal downtime | Aurora Read Replica |
| External MySQL | Percona XtraBackup |
| External PostgreSQL | S3 Aurora Extension |
| Continuous replication | DMS |
| Small DB | mysqldump |

---

# AWS On-Premise Migration Services

---

# Amazon Linux 2 On-Premise

Purpose:

```text
Run Amazon Linux locally
```

Supported hypervisors:

```text
VMware, KVM, VirtualBox, & Hyper-V
```

---

Architecture:

```text
ISO Download → Install Locally → Run Amazon Linux 2
```

---

# VM Import / Export

Purpose:

```text
Move VMs between On-Prem and AWS
```

---

Import:

```text
On-Prem VM → EC2
```

---

Export:

```text
EC2 → On-Prem VM
```

---

Also useful for:

```text
Disaster Recovery
```

---

# AWS Application Discovery Service

Purpose:

```text
Analyze servers before migration
```

Collects:

```text
CPU, Memory, Storage, Dependencies, & Utilization
```

---

Output:

```text
Dependency Mapping
```

Useful for:

```text
Migration planning
```

---

# AWS Migration Hub

Purpose:

```text
Track migrations
```

Provides:

```text
Single dashboard
```

for:

```text
DMS, MGN, & Other migration services
```

---

# Amazon DMS

Purpose:

```text
Database migration
```

Supports:

```text
On-Prem → AWS

AWS → AWS

AWS → On-Prem
```

---

Examples:

```text
Oracle → Aurora
```

---

```text
MySQL → DynamoDB
```

---

```text
SQL Server → PostgreSQL
```

---

# AWS Application Migration Service (MGN)

Purpose:

```text
Migrate entire servers
```

---

Architecture:

```text
On-Prem Server → Continuous Replication → AWS
```

---

Features:

```text
Live replication, Incremental sync, & Minimal downtime
```

---

# Service Comparison

| Service | Purpose |
|---------|---------|
| Amazon Linux 2 ISO | Run Amazon Linux locally |
| VM Import/Export | Move VMs |
| Application Discovery Service | Analyze infrastructure |
| Migration Hub | Track migrations |
| DMS | Migrate databases |
| MGN | Migrate servers |

---

# What Migrates What?

## DMS

```text
Database → Database
```

---

## MGN

```text
Server → Server
```

---

## VM Import/Export

```text
Virtual Machine → EC2 → Virtual Machine
```

---

## Discovery Service

```text
Analyze → Plan Migration
```

---

# Exam Decision Tree

Question:

```text
Move Oracle to Aurora?
```

Answer:

```text
DMS
```

---

Question:

```text
Convert Oracle schema to PostgreSQL?
```

Answer:

```text
SCT
```

---

Question:

```text
Replicate entire Linux server?
```

Answer:

```text
MGN
```

---

Question:

```text
Analyze 500 on-prem servers?
```

Answer:

```text
Application Discovery Service
```

---

Question:

```text
Track all migrations?
```

Answer:

```text
Migration Hub
```

---

Question:

```text
Move VMware VM to EC2?
```

Answer:

```text
VM Import/Export
```

---

# Memory Anchors

```text
DMS = Database
```

---

```text
MGN = Machine
```

---

```text
SCT = Schema
```

---

```text
Migration Hub = Monitor
```

---

```text
Discovery Service = Discover
```

---

```text
VM Import/Export = Virtual Machine
```

---

# Aurora Memory Anchor

```text
Fastest = Snapshot
```

---

```text
Minimal Downtime = Read Replica
```

---

```text
External MySQL = Percona
```

---

```text
External PostgreSQL = S3 Extension
```

---

```text
Continuous Sync = DMS
```

---

# Final Memory Anchor

> Aurora migration has five approaches for MySQL and four for PostgreSQL. Snapshot restore is fastest but requires downtime. Read Replicas minimize downtime. External databases use Percona (MySQL) or S3 extensions (PostgreSQL). DMS provides continuous replication.

> For AWS migration services: DMS migrates databases, MGN migrates servers, Application Discovery Service analyzes infrastructure, Migration Hub tracks migrations, and VM Import/Export moves virtual machines.