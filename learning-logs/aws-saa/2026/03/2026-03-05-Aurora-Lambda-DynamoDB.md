# 2026-03-05 — Aurora Lambda Integration & DynamoDB Basics (DevOps/SRE Lens)

# Part 1 — Aurora / RDS → Lambda Integration

## Core Mental Model

Database → Event → Lambda → Automation

Instead of:

Application layer triggers events

Use:

**Database-level event-driven architecture**

---

# 1. Direct Lambda Invocation from Database

Supported

- Aurora MySQL
- RDS PostgreSQL

Workflow

Insert Data → Database Trigger → Lambda → Action

Example

User registers

```

INSERT INTO users

```

Database invokes:

Lambda → Send welcome email

---

# 2. Architecture

Application → Database  
Database → Lambda  
Lambda → External Services

Example

Aurora → Lambda → SNS → Email

---

# 3. Setup Requirements

Must configure:

### Network Access

Database must reach Lambda

Options

- Public internet access
- NAT Gateway
- VPC Endpoints

---

### IAM Permissions

Database instance role must allow:

- lambda:InvokeFunction

Without IAM:

Invocation fails

---

# 4. Direct Invocation vs RDS Event Notifications

## Direct Lambda Invocation

Triggers:

- Data-level events
- Insert
- Update
- Delete

Example

New order inserted → Lambda triggered

---

## RDS Event Notifications

Triggers:

- Instance-level events

Examples

- Instance created
- Snapshot created
- Failover occurred

Important

RDS events:

- NOT data-level
- Up to 5-minute delay

---

# 5. RDS Event Architecture

RDS → SNS  
SNS → Lambda / SQS / Email

Or

RDS → EventBridge → Multiple Targets

---

# DevOps/SRE Takeaway

Use:

Direct Lambda Invocation

- data-driven automation

Use:

RDS Event Notifications

- infrastructure monitoring

---

# One-Line Memory Anchor

> Database triggers Lambda for data events; RDS events monitor infrastructure.

---

# Part 2 — DynamoDB Basics

## Core Mental Model

DynamoDB = **Serverless NoSQL Database**

- Fully managed
- Auto scaling
- Multi-AZ replication

---

# 1. Core Characteristics

- No servers
- Single-digit millisecond latency
- Massive scalability
- Highly available

Capacity

- Millions requests/sec
- Trillions rows
- Hundreds TB

---

# 2. Table Structure

DynamoDB uses:

Tables → Items → Attributes

Example

Table

```

Users

```

Item

```

UserID: 123
Name: John
Age: 30

```


---

# 3. Primary Key Types

## Partition Key

Simple key

Example

```

UserID

```

---

## Partition + Sort Key

Composite key

Example

```

UserID + Timestamp

```

Use case

User activity logs

---

# 4. Schema Flexibility

DynamoDB:

- Schema-less
- Attributes optional
- Fields added anytime

Example

Item 1

```

Name
Email

```

Item 2

```

Name
Phone
Location

```

---

# 5. Data Types

## Scalar

- String
- Number
- Boolean
- Binary
- Null

---

## Collections

- List
- Map
- Set

---

# 6. Item Size Limit

Max item size:

400 KB

Large data

Use:

- S3
- Store pointer in DynamoDB

---

# 7. Table Classes

## Standard

Frequent access

Default

---

## Infrequent Access

Lower cost

Less frequently accessed

---

# 8. Capacity Modes

## Provisioned Mode

Predefine:

- RCU
- WCU

Best for:

- predictable workloads
- steady traffic

---

## On-Demand Mode

No capacity planning

Best for:

- unpredictable traffic
- sudden spikes

---

# 9. Provisioned vs On-Demand

| Feature | Provisioned | On-Demand |
|--------|-------------|-----------|
| Cost | Lower | Higher |
| Predictability | Required | Not required |
| Scaling | Auto scaling | Automatic |

---

# 10. When to Use DynamoDB

Use DynamoDB when:

- high scale
- unpredictable load
- flexible schema
- serverless architecture

Avoid DynamoDB when:

- complex joins
- relational data
- transactions-heavy workloads

---

# DevOps/SRE Takeaways

DynamoDB provides:

- serverless database
- extreme scalability
- high availability

Best paired with:

- Lambda
- API Gateway
- Serverless architectures

---

# One-Line Memory Anchor

> DynamoDB = serverless NoSQL built for scale.

---