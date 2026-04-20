# 2026-03-13 — Amazon Neptune (DevOps/SRE Lens)

## Core Mental Model

Neptune = **Managed graph database for relationship-heavy queries**

- RDS/Aurora → tables & joins  
- DynamoDB → key-value / NoSQL  
- **Neptune → nodes + edges (relationships)**  

👉 Use Neptune when **relationships are first-class data**

---

# 1. What “Graph” Means (Practically)

Data modeled as:

- **Nodes** (entities)
- **Edges** (relationships)
- **Properties** (attributes)

Example

```

(User)-[FRIEND_OF]->(User)
(User)-[LIKES]->(Post)

```

Why it matters:

- Traversals (e.g., “friends of friends”) are fast
- Complex joins become simple graph walks

---

# 2. Engine & Query Model

Neptune supports:

- **Gremlin** (property graph traversal)
- **SPARQL** (RDF / semantic queries)

👉 Pick based on data model:
- Gremlin → app graphs (social, recommendations)
- SPARQL → knowledge graphs / ontologies

---

# 3. High Availability & Scaling

- Replicated across **3 AZs**
- Up to **15 read replicas**
- Writer + multiple readers

Topology

Writer (primary)  
↓  
Read Replicas (scale-out reads)

---

# 4. Performance Characteristics

- **Millisecond latency**
- Optimized for:
  - deep traversals
  - multi-hop queries
- Handles **billions of edges**

---

# 5. When Neptune Wins

Use Neptune when queries look like:

- “Friends of friends who liked X”
- “Shortest path between A and B”
- “Find suspicious transaction rings”

If you’re doing:

- heavy joins in RDS  
- recursive queries  

👉 consider Neptune

---

# 6. Core Use Cases

## Social Networks

- users, friendships, interactions

---

## Recommendation Engines

- “users who liked X also liked Y”

---

## Fraud Detection

- detect cycles / abnormal patterns

---

## Knowledge Graphs

- entities + relationships (e.g., Wikipedia-like graphs)

---

# 7. Neptune Streams (Event-Driven Graph)

## What It Does

- Emits **ordered change log** of graph updates
- No duplicates
- Strict ordering

Access:

- HTTP REST API

---

## Architecture Pattern

Neptune → Streams → Consumer (Lambda / app)

---

## Common Uses

- Trigger notifications on changes
- Sync to other systems:
  - S3 (data lake)
  - OpenSearch (search)
  - ElastiCache (fast reads)

---

## Multi-Region Strategy

Primary region:

- write data

Secondary region:

- replay stream

👉 Event-based replication

---

# 8. DevOps/SRE Takeaways

Neptune introduces:

- new data modeling (graph-first)
- different query patterns (traversal, not joins)
- read scaling via replicas
- event-driven integration via Streams

Operational focus:

- choose correct model (don’t force graph DB)
- monitor query latency (deep traversals)
- design for read scaling (replicas)

---

# 9. When NOT to Use Neptune

Avoid if:

- simple CRUD app
- no relationship-heavy queries
- key-value or document fits better

Use instead:

- DynamoDB (NoSQL)
- Aurora (relational)

---

# 10. Quick Comparison

| Use Case | Service |
|----------|--------|
| Relationships / graph | Neptune |
| Relational / joins | Aurora |
| Key-value / scale | DynamoDB |

---

# One-Line Memory Anchor

> Neptune = graph database for relationships, not tables.

---