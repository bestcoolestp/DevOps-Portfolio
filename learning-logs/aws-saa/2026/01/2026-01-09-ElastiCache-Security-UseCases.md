2026-01-09 — ElastiCache Security & Use Cases  
Source: Stephane Maarek — AWS SAA  
Theme: cache security model and pattern selection

“Cache is a performance tool, but also a consistency trade-off.”

---

## 🔐 Security Model

### Redis

- Supports IAM authentication (Redis only).
- Redis AUTH provides password/token protection.
- Supports in-transit SSL/TLS encryption.
- IAM policies apply at AWS API level — **not inside Redis commands**.

**Typical EC2 → Redis connection**

Option 1 (most common)  
- Security Groups  
- Redis AUTH  
- SSL/TLS  

Option 2 (newer pattern)  
- IAM authentication  

👉 Exam heuristic: advanced security requirements → **Redis**

---

### Memcached

- Supports SASL authentication (mainly exam memory).
- Fewer security and operational features than Redis.
- Designed for simple distributed caching.

---

## 📦 Caching Patterns

### Lazy Loading (Cache Aside)

- Cache populated only on read miss.
- Application manages cache writes.
- Risk: stale data.

**Flow**

Cache hit → return  
Cache miss → DB read → cache write → return

**Best for**

- Read-heavy workloads  
- Cost-sensitive caching  

---

### Write Through

- Cache updated whenever DB is written.
- Improves read freshness.
- Increases write latency and cache usage.

**Best for**

- Consistency-sensitive reads  
- Frequently accessed data  

⚠️ Exam trap: write-through improves freshness but increases write cost.

---

### Session Store

- Cache holds user session state.
- Expiration controlled via TTL.
- Keeps application tier stateless.

**Common uses**

- Login sessions  
- Shopping carts  
- Temporary user state  

---

## 🎮 Redis Leaderboard Pattern

**Sorted Sets**

Provide:

- guaranteed uniqueness  
- automatic ordering  
- real-time ranking  

**Typical operations**

- ZADD → update score  
- ZRANGE / ZREVRANGE → fetch rankings  

**Architectural value**

Ranking logic stays in Redis memory, reducing application complexity and latency.

✅ Exam trigger: **real-time leaderboard → Redis Sorted Sets**

---

## 🧠 My Takeaway

ElastiCache design is primarily about **freshness vs cost vs complexity**:

- Redis → richer security and data structures  
- Memcached → lightweight ephemeral cache  
- Lazy loading → cheaper but potentially stale  
- Write through → fresher but more expensive  
- Session store → high-ROI real-world pattern  

The real skill is selecting the **right caching pattern for access behavior**, not just choosing the engine.
