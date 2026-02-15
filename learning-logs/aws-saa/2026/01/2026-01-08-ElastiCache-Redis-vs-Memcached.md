# 2026-01-08 — Amazon ElastiCache (Redis vs Memcached)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** in-memory caching for read scalability and session management

> “The fastest database query is the one you don’t have to run.”

---

## Core Concept
**Amazon ElastiCache** is a fully managed in-memory caching service for:

- Redis  
- Memcached  

Purpose:
- reduce load on primary databases (e.g., RDS)
- serve frequently accessed data with very low latency

Caches are optimized for **read-heavy workloads**.

---

## Why it matters

### Performance
- frequently requested data served from memory
- fewer round trips to RDS
- significantly lower latency

### Scalability
- absorbs high read traffic
- protects backend databases

### Stateless applications
- store user sessions in cache
- any app instance can retrieve session
- enables horizontal scaling

### Managed service
AWS handles:
- patching
- monitoring
- failure recovery
- backups (engine dependent)

---

## Application integration (important!)

Unlike RDS, ElastiCache requires **application changes**.

Typical flow:

**Cache hit**
App → Cache → Return data


**Cache miss**
App → Cache (miss) → DB → Cache write → Return data


⚠️ Cache invalidation strategy is critical for data freshness.

---

## Common architectures

### Query caching
- cache frequently read DB results
- reduces read pressure on RDS

### Session storage
- store login/session state in cache
- keeps application tier stateless
- improves horizontal scalability

---

## Redis vs Memcached

| Feature | Redis | Memcached |
|-------------------|--------------------------------|--------------------------|
| High availability | Multi-AZ + auto failover       | ❌ None                 |
| Read scaling      | Read replicas                  | Client-side sharding     |
| Durability        | Persistence supported          | ❌ No persistence       |
| Data structures   | Rich (sets, sorted sets, etc.) | Simple key-value         |
| Architecture      | Replication-based              | Multi-threaded           |
| Best for          | Complex, HA workloads          | Simple lightweight cache |

---

## Exam signals

Think **ElastiCache** when you see:

- reduce read load on RDS
- cache hit vs cache miss pattern
- session storage for stateless apps
- in-memory performance requirement

Engine hints:
- need HA, persistence, or advanced structures → **Redis**
- simple ultra-fast cache → **Memcached**

---

## My takeaway

ElastiCache is not about storing data permanently — it’s about **avoiding unnecessary database work**.

Redis fits complex, highly available caching layers.  
Memcached fits simple, high-speed ephemeral caching.
