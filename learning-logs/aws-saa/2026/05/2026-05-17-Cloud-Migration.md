# 2026-05-17 — Cloud Migration Use Cases

# Cloud Migration

Two situations exist.

---

## Scenario 1

```text
New Application
```

Architecture:

```text
AWS → Deploy
```

No migration required.

---

## Scenario 2

```text
Existing Data Center → AWS
```

Requires:

```text
Assessment → Migration → Cutover
```

---

# Step 1 — Discover

Use:

```text
AWS Application Discovery Service
```

Purpose:

```text
Understand what must be migrated
```

---

# Information Collected

Application Discovery gathers:

```text
CPU, Memory, Disk, Performance, Processes, Dependencies, & Network Connections
```

---

# Discovery Methods

## Agentless Discovery

Uses:

```text
VMware Connector
```

Collects:

```text
VM Configuration, Performance, & History
```

---

Advantages:

```text
Easy deployment
```

---

## Agent-Based Discovery

Install an agent.

Collects:

```text
Processes, Network Dependencies, Operating System, & Application Details
```

---

Advantages:

```text
More detailed analysis
```

---

# Discovery Output

Results appear in:

```text
AWS Migration Hub
```

---

Architecture:

```text
Servers → Discovery → Migration Hub
```

---

# Step 2 — Migrate

Use:

```text
AWS Application Migration Service (MGN)
```

---

Former name:

```text
CloudEndure Migration
```

---

Purpose:

```text
Lift and Shift = Move server without redesign
```

---

# MGN Architecture

```text
On-Prem Server → Continuous Replication → AWS Staging Area → Cutover → Production EC2
```

---

# During Migration

MGN continuously replicates:

```text
Disks → EBS
```

---

until:

```text
Cutover Day
```

---

# Cutover

On cutover:

```text
Stop On-Prem → Start EC2 → Production
```

---

Benefits:

```text
Minimal downtime
```

---

# MGN Advantages

```text
Automation, Lower Cost, Minimal Downtime, & Many Operating Systems Supported
```

---

# Migration Workflow

```text
Discovery → Migration Hub → MGN → EC2
```

---

# Large Data Transfer

Suppose:

```text
200 TB
```

must move to AWS.

---

# Option 1

Internet or Site-to-Site VPN

---

Architecture:

```text
Data Center → Internet → AWS
```

---

Advantages:

```text
Immediate & Simple
```

---

Disadvantages:

```text
Very slow
```

---

Example:

```text
200 TB

100 Mbps → 185 Days
```

---

# Option 2

AWS Direct Connect

---

Architecture:

```text
Data Center → Dedicated Line → AWS
```

---

Advantages:

```text
Reliable, Fast, & Private
```

---

Disadvantages:

```text
Requires setup ≈ 1 month
```

---

Example:

```text
200 TB

1 Gbps → 18.5 Days
```

---

# Option 3

AWS Snowball

---

Architecture:

```text
AWS → Ships Device → Customer → Load Data → Ship Back → AWS
```

---

Advantages:

```text
Very fast & Huge datasets
```

---

Typical duration:

```text
≈ 1 Week
```

---

Best for:

```text
One-time migration
```

---

# Continuous Replication

For ongoing synchronization:

---

## VPN

```text
Small workloads
```

---

## Direct Connect

```text
Enterprise workloads
```

---

## AWS DataSync

Purpose:

```text
Files
```

---

Architecture:

```text
On-Prem → DataSync → S3 → EFS → FSx
```

---

Supports:

```text
Continuous & Scheduled
```

transfers.

---

## AWS DMS

Purpose:

```text
Databases
```

---

Architecture:

```text
Oracle → DMS → Aurora
```

---

Uses:

```text
CDC
```

for continuous synchronization.

---

# Which AWS Service?

| Need | AWS Service |
|------|-------------|
| Analyze servers | Application Discovery Service |
| Track migration | Migration Hub |
| Move servers | MGN |
| Move databases | DMS |
| Move files | DataSync |
| One-time massive transfer | Snowball |
| Dedicated network | Direct Connect |
| Small transfer | Internet / VPN |

---

# Decision Tree

Question:

```text
Need dependency mapping?
```

Answer:

```text
Application Discovery Service
```

---

Question:

```text
Need lift-and-shift?
```

Answer:

```text
MGN
```

---

Question:

```text
Move Oracle database?
```

Answer:

```text
DMS
```

---

Question:

```text
Move 200 TB once?
```

Answer:

```text
Snowball
```

---

Question:

```text
Synchronize NAS every day?
```

Answer:

```text
DataSync
```

---

Question:

```text
Need private dedicated connection?
```

Answer:

```text
Direct Connect
```

---

Question:

```text
Migration dashboard?
```

Answer:

```text
Migration Hub
```

---

# Architecture Comparison

## Server Migration

```text
On-Prem → MGN → EC2
```

---

## Database Migration

```text
Oracle → DMS → Aurora
```

---

## File Migration

```text
NAS → DataSync → S3
```

---

## Massive Data

```text
200 TB → Snowball → S3
```

---

# Memory Anchors

```text
Discovery = Discover
```

---

```text
Migration Hub = Monitor
```

---

```text
MGN = Machine
```

---

```text
DMS = Database
```

---

```text
DataSync = Files
```

---

```text
Snowball = Ship Device
```

---

```text
Direct Connect = Dedicated Line
```

---

# SAA Exam Traps

Question:

```text
Analyze applications before migration
```

Answer:

```text
Application Discovery Service
```

---

Question:

```text
Lift-and-shift servers
```

Answer:

```text
MGN
```

---

Question:

```text
Transfer hundreds of terabytes once
```

Answer:

```text
Snowball
```

---

Question:

```text
Ongoing file synchronization
```

Answer:

```text
DataSync
```

---

Question:

```text
Ongoing database replication
```

Answer:

```text
DMS
```

---

# Final Memory Anchor

> AWS migration follows a simple sequence: **discover → plan → migrate → cut over**. Use **Application Discovery Service** to analyze workloads, **Migration Hub** to track progress, **MGN** for server migrations, **DMS** for database migrations, **DataSync** for file synchronization, **Snowball** for massive one-time transfers, and **Direct Connect** for long-term private connectivity.
