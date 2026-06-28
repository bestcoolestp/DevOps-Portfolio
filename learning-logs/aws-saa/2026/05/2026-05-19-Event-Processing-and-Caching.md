# 2026-05-19 — Event Processing in AWS

# Event-Driven Architecture

Core idea:

```text
Something Happens → Event Generated → AWS Service Processes Event
```

---

Examples:

```text
File Uploaded, Order Created, Image Added, & Payment Completed
```

---

# SQS + Lambda

Architecture:

```text
Producer → SQS Queue → Lambda → Processing
```

---

# Success Scenario

```text
Message → Lambda → Success → Delete Message
```

---

# Failure Scenario

```text
Message → Lambda → Failure → Return to Queue
```

---

Message becomes visible again.

Lambda retries.

---

# Problem

Bad message:

```text
Always fails
```

Result:

```text
Infinite Retry Loop
```

---

# Solution

Dead Letter Queue

(DLQ)

---

Architecture:

```text
SQS → Retry → Retry → Retry → DLQ
```

---

Example:

```text
MaxReceiveCount = 5
```

After 5 failures:

```text
Message → DLQ
```

---

# SQS FIFO + Lambda

FIFO means:

```text
First In First Out
```

Strict ordering.

---

Architecture:

```text
Message A → Message B → Message C
```

---

Problem:

```text
Message B fails
```

---

Result:

```text
Message C cannot execute
```

Queue blocks.

---

Solution:

```text
DLQ
```

Move bad messages away.

---

# SNS + Lambda

Architecture:

```text
SNS Topic → Lambda
```

---

SNS pushes messages.

Lambda processes asynchronously.

---

# Retry Behavior

Lambda automatically retries:

```text
3 Times
```

---

If still failing:

```text
Discard
```

unless configured.

---

# Lambda DLQ

Architecture:

```text
SNS → Lambda → Failure → SQS DLQ
```

---

Difference:

## SQS DLQ

Configured on:

```text
SQS
```

---

## Lambda DLQ

Configured on:

```text
Lambda
```

---

# Fan-Out Pattern

Problem:

```text
Application → Queue A → Queue B → Queue C
```

---

Application crashes halfway.

Some queues receive messages.

Others don't.

---

Solution:

```text
Application → SNS → Queue A, Queue B, & Queue C
```

---

SNS guarantees delivery.

---

# Fan-Out Architecture

```text
Application → SNS Topic 

↙ ↓ ↘

SQS A, SQS B, SQS C
```

---

One message. Multiple consumers.

---

# S3 Event Notifications

Trigger when:

```text
Object Created

Object Deleted

Object Restored

Replication Complete
```

---

Architecture:

```text
S3 → Event → Lambda
```

---

Example:

```text
Image Upload → Thumbnail Generator
```

---

Destinations:

```text
Lambda, SNS, & SQS
```

---

# EventBridge

More powerful than S3 notifications.

---

Architecture:

```text
S3 → EventBridge → 18+ Destinations
```

---

Supported targets:

```text
Lambda, SNS, SQS, Step Functions, Kinesis, & Firehose
```

---

# Event Filtering

Filter based on:

```text
Filename, Metadata, Size, Bucket
```

---

Example:

```text
Only JPG larger than 5MB
```

---

# EventBridge Features

## Archive

Store events.

---

## Replay

Replay events later.

---

Useful for:

```text
Testing, Debugging, & Recovery
```

---

# CloudTrail + EventBridge

Architecture:

```text
API Call → CloudTrail → EventBridge → SNS Alert
```

---

Example:

```text
Delete DynamoDB Table → Alert
```

---

# Event Services Comparison

| Service | Purpose |
|----------|----------|
| SQS | Queue |
| SNS | Pub/Sub |
| Lambda | Processing |
| EventBridge | Routing |
| CloudTrail | API Logging |

---

# Caching Strategies

# Why Cache?

Without caching:

```text
User → Application → Database
```

every request.

---

Result:

```text
Slow, Expensive
```

---

# CloudFront Caching

Architecture:

```text
User → CloudFront Edge → Origin
```

---

Benefit:

```text
Fastest
```

because cache is near users.

---

# TTL

TTL means:

```text
Time To Live
```

---

Example:

```text
TTL = 1 Hour
```

CloudFront keeps data:

```text
60 Minutes
```

---

Tradeoff:

Long TTL:

```text
Fast, Possibly stale
```

---

Short TTL:

```text
Fresh, Less cache benefit
```

---

# API Gateway Cache

Architecture:

```text
User → API Gateway Cache → Backend
```

---

Benefit:

```text
Reduces API calls
```

---

Limitation:

```text
Regional, Not Edge
```

---

# Application-Level Cache

Architecture:

```text
Application → Redis → Database
```

---

Popular services:

```text
Redis, Memcached, & DAX
```

---

# Redis

Best for:

```text
General Applications
```

---

# Memcached

Best for:

```text
Simple Key Value Cache
```

---

# DAX

Means:

```text
DynamoDB Accelerator
```

---

Purpose:

```text
Cache DynamoDB Reads
```

---

Architecture:

```text
Application → DAX → DynamoDB
```

---

# Database Caching

Important:

```text
RDS, Aurora, DynamoDB, & S3
```

do NOT automatically cache.

---

Need:

```text
Redis, Memcached, DAX, & CloudFront
```

---

# Caching Layers

Closest to User:

```text
CloudFront
```

Fastest.

---

Middle:

```text
API Gateway Cache
```

---

Closest to Database:

```text
Redis & DAX
```

---

# Tradeoff

Closer to User:

```text
Lower Latency, Higher Staleness Risk
```

---

Closer to Database:

```text
Fresher Data, Higher Latency
```

---

# Architecture Comparison

## Edge Cache

```text
User → CloudFront → Origin
```

---

## API Cache

```text
User → API Gateway → Backend
```

---

## DB Cache

```text
User → Application → Redis → Database
```

---

# Exam Decision Table

| Scenario | Answer |
|----------|--------|
| Ordered messages | SQS FIFO |
| Bad message blocks queue | FIFO + DLQ |
| One message to many consumers | SNS Fan-Out |
| React to S3 upload | S3 Event Notification |
| Advanced event routing | EventBridge |
| Replay events | EventBridge |
| Global caching | CloudFront |
| API response cache | API Gateway Cache |
| DynamoDB cache | DAX |
| General cache | Redis |

---

# Memory Anchors

```text
SQS = Queue
```

---

```text
SNS = Broadcast
```

---

```text
FIFO = Ordered
```

---

```text
DLQ = Failed Messages
```

---

```text
EventBridge = Router
```

---

```text
CloudFront = Edge Cache
```

---

```text
Redis = App Cache
```

---

```text
DAX = DynamoDB Cache
```

---

```text
TTL = Freshness Control
```

---

# Final Memory Anchor

> Event processing in AWS follows a simple pattern: SQS queues events, SNS broadcasts events, Lambda processes events, and EventBridge routes events. Use DLQs to prevent endless retries. For caching, CloudFront provides edge caching, API Gateway offers regional caching, and Redis/DAX reduce database load. The closer the cache is to users, the faster responses become, but the greater the risk of stale data.
