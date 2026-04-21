# 2026-03-14 — Amazon Keyspaces (DevOps/SRE Lens)

## Core Mental Model

Amazon Keyspaces = **Serverless Apache Cassandra on AWS**

- Cassandra → distributed wide-column DB  
- Keyspaces → **Cassandra without cluster management**

👉 Use Keyspaces when you need **Cassandra semantics without ops burden**

---

# 1. Where Keyspaces Fits

Database Spectrum

| Type | Service |
|------|--------|
| Relational | Aurora / RDS |
| Key-Value | DynamoDB |
| Graph | Neptune |
| Wide-Column | **Keyspaces (Cassandra)** |

👉 Keyspaces = **wide-column, high-ingest, time-series friendly**

---

# 2. Core Characteristics

- Fully managed (no nodes, no cluster setup)
- Multi-AZ replication (3 copies)
- Serverless scaling
- Cassandra-compatible (CQL)

Performance

- Single-digit millisecond latency
- Handles thousands of requests/sec

---

# 3. Data Model (Cassandra Style)

Keyspaces uses:

- Tables
- Partition keys
- Clustering columns

Example

```

PRIMARY KEY (device_id, timestamp)

```

Meaning:

- Partition → device_id
- Sort → timestamp

👉 Ideal for time-series queries

---

# 4. Capacity Modes

## On-Demand

- No planning
- Auto scales instantly

Best for:

- unpredictable workloads
- burst traffic

---

## Provisioned + Auto Scaling

- define throughput
- auto-adjust capacity

Best for:

- predictable workloads
- cost optimization

---

# 5. High Availability & Durability

- Data replicated across **3 AZs**
- No single point of failure
- Built-in fault tolerance

👉 No need to configure replication manually (unlike Cassandra)

---

# 6. Backup & Recovery

## Point-In-Time Recovery (PITR)

- Up to 35 days
- Restore to any second

👉 Similar to DynamoDB PITR

---

# 7. Security

- Encryption at rest (default)
- Encryption in transit
- IAM-based access control

---

# 8. Key Use Cases

## IoT Data

- sensor readings
- high ingestion rate

---

## Time-Series Data

- logs
- metrics
- events

---

## Cassandra Migration

- lift-and-shift Cassandra apps
- no cluster management

---

# 9. Keyspaces vs DynamoDB

| Feature | Keyspaces | DynamoDB |
|--------|----------|----------|
| API | Cassandra (CQL) | AWS native |
| Model | Wide-column | Key-value |
| Ecosystem | Cassandra tools | AWS-native tools |
| Use Case | Cassandra workloads | General NoSQL |

👉 Choose based on ecosystem compatibility

---

# 10. Keyspaces vs Self-Managed Cassandra

| Feature | Self-Managed | Keyspaces |
|--------|-------------|----------|
| Cluster mgmt | Required | None |
| Scaling | Manual | Automatic |
| Replication | Manual | Built-in |
| Ops overhead | High | Low |

👉 Keyspaces removes:

- node management
- replication setup
- scaling complexity

---

# 11. DevOps/SRE Takeaways

Keyspaces is about:

- **operational simplicity**
- **Cassandra compatibility**
- **massive write scalability**

Best for:

- event ingestion systems
- time-series workloads
- Cassandra migrations

---

# 12. When NOT to Use Keyspaces

Avoid when:

- simple key-value → use DynamoDB
- relational queries → use Aurora
- graph queries → use Neptune

---

# One-Line Memory Anchor

> Keyspaces = Cassandra without clusters.

---