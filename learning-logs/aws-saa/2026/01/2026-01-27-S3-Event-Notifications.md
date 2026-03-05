2026-01-27 — Amazon S3 Event Notifications  
Perspective: DevOps / SRE Notes  
Theme: event-driven architectures with object storage

“Storage events are signals. Good architectures react automatically.”

---

# 📦 S3 Event Notifications

S3 can emit events whenever objects change.

Common triggers:

- ObjectCreated
- ObjectRemoved
- ObjectRestore
- Replication events

Events can be filtered by:

- prefix (`images/`)
- suffix (`.jpeg`, `.csv`, etc.)

Example:

```

Trigger only when *.jpeg uploaded to images/

```

This allows precise automation.

---

# 🎯 Typical Use Cases

Event-driven workflows:

- image thumbnail generation
- media transcoding
- data ingestion pipelines
- log processing
- ML dataset preprocessing

Example architecture:

```

User uploads image → S3
S3 event → Lambda
Lambda → generate thumbnail → store in another bucket

```

---

# 📬 Supported Destinations

S3 can send notifications to:

**SNS**

- fan-out notifications
- multiple subscribers

**SQS**

- queue-based processing
- decoupled workloads

**Lambda**

- serverless event processing

**EventBridge**

- advanced routing
- large ecosystem integration

---

# ⚡ Event Delivery

Events typically delivered:

- within seconds

But may occasionally take:

- ~1 minute

Design systems to tolerate small delays.

---

# 🔐 Permissions Model

S3 must be allowed to publish to the destination.

Important:

This uses **resource policies**, not IAM roles.

Examples:

- SQS → queue policy
- SNS → topic policy
- Lambda → resource policy

S3 is granted permission to invoke or send messages.

---

# 🌉 EventBridge Integration

All S3 events can be routed to **Amazon EventBridge**.

Advantages:

- advanced filtering
- routing to **18+ AWS services**
- event archiving
- replay capability
- better reliability

Example integrations:

- Step Functions
- Kinesis Streams
- Firehose
- ECS tasks
- multiple Lambdas

EventBridge turns S3 into a powerful event source.

---

# 🧪 Demo Architecture (S3 → SQS)

## Step 1 — Bucket Creation

Created bucket:

```

stephane-v3-events-notifications
Region: eu-west-1 (Ireland)

```

---

## Step 2 — Configure Event Notification

Location:

```

Bucket → Properties → Event Notifications

```

Configured:

- Event: **ObjectCreatedPut**
- No prefix/suffix filters
- Destination: **SQS**

Notification name:

```

DemoEventNotification

```

---

## Step 3 — Create SQS Queue

Queue name:

```

DemoS3Notification

```

Required update:

Add queue **access policy** allowing S3 to publish.

Example permission:

```

Allow s3.amazonaws.com → SendMessage → Queue ARN

```

---

## Step 4 — Link S3 → SQS

Initial configuration failed due to missing permissions.

After updating queue policy:

Configuration saved successfully.

S3 immediately sent a **test event**.

---

## Step 5 — Upload Test Object

Uploaded:

```

coffee.jpeg

```

S3 generated event.

---

## Step 6 — Verify in SQS

Polling queue returned message:

Example fields:

```

eventName: ObjectCreatedPut
key: coffee.jpeg
bucket: stephane-v3-events-notifications

```

Confirmed event pipeline works.

---

# 🧠 Architecture Insight

S3 events enable **event-driven systems**.

Instead of polling storage:

```

Old model → application checks bucket
New model → bucket emits event

```

Benefits:

- reactive systems
- scalable automation
- decoupled microservices

---

# 🎯 Operational Takeaway

Use S3 events for:

- automated pipelines
- async workflows
- scalable serverless architectures

Typical production pattern:

```

S3 → EventBridge → Lambda / Step Functions / Queue

```