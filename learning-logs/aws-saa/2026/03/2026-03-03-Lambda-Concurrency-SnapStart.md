# 2026-03-03 — Lambda Concurrency, Provisioned Concurrency & SnapStart (DevOps/SRE Lens)

## Core Mental Model

Lambda scaling has **three layers of control**

1. Account Concurrency (global limit)
2. Reserved Concurrency (function isolation)
3. Provisioned Concurrency (cold-start elimination)

Plus:

4. SnapStart (fast initialization optimization)

---

# 1. Unreserved Account Concurrency

Default:

- 1,000 concurrent executions per region

Shared across:

- All Lambda functions
- API Gateway
- S3 triggers
- EventBridge
- SQS

Example

Account limit = 1000

Function A reserved = 20  
Remaining pool = 980

This pool is:

**Unreserved concurrency**

---

# 2. Reserved Concurrency

Reserved concurrency:

- Guarantees execution capacity
- Protects critical workloads

Example

Function A

Reserved = 50

Guarantees:

- Always 50 available
- Other functions cannot consume it

---

# 3. Reserved Concurrency = 0

Special Case

Set concurrency to: 0


Result

- Function always throttled
- No executions allowed

Use Cases

- testing throttling
- emergency shutdown
- disable event processing

Error Example

```

Invoke API action failed because rate exceeded

```

---

# 4. Provisioned Concurrency

Purpose

Eliminate cold starts

Provisioned concurrency:

- Pre-warms Lambda instances
- Keeps them ready

Example

Provisioned = 5

5 instances always warm

---

# Provisioned Concurrency Requirements

- Must publish version
- Cannot use `$LATEST`
- Apply to:

- Version
- Alias

Example

```

version 1
alias: production

```

---

# Provisioned Concurrency Tradeoffs

Benefits

- No cold start
- predictable latency
- better API performance

Costs

- Additional charges
- always-running warm instances

---

# 5. Cold Starts

Cold start occurs when:

- new instance created
- runtime initialized
- dependencies loaded

Impact

First request slower

Example

Cold: 2 seconds  
Warm: 50 ms

---

# 6. Lambda SnapStart

Purpose

Reduce initialization latency

Up to:

- 10x faster startup

---

# SnapStart Lifecycle

Normal Lambda

Initialize → Invoke → Shutdown

With SnapStart

Initialize (once)  
Snapshot created  

Invocation

Restore snapshot → Invoke

Initialization skipped

---

# SnapStart Flow

Publish Version  
↓  
Lambda Pre-initializes  
↓  
Snapshot created  
↓  
Invocation restores snapshot  
↓  
Fast execution

---

# SnapStart Requirements

- Works only on published versions
- Not available for `$LATEST`
- Best for heavy initialization

Example

- Java Spring Boot
- .NET applications
- heavy dependency loading

---

# SnapStart vs Provisioned Concurrency

| Feature | SnapStart | Provisioned Concurrency |
|---------|-----------|-------------------------|
| Cost | No extra cost | Additional cost |
| Cold Start | Reduced | Eliminated |
| Always Warm | No | Yes |
| Best For | heavy init apps | latency-sensitive APIs |

---

# When to Use SnapStart

Use SnapStart when:

- Java Lambda
- .NET Lambda
- slow initialization

Use Provisioned Concurrency when:

- strict latency requirements
- production APIs
- predictable traffic

---

# DevOps/SRE Takeaways

Concurrency controls:

- reliability
- isolation
- performance

Production Strategy

- Reserved concurrency for critical services
- Provisioned concurrency for APIs
- SnapStart for heavy runtimes

---

# Production Example

API Gateway → Lambda

Without controls:

Traffic spike  
→ concurrency exhaustion  
→ failures

With controls:

Reserved concurrency  
+ provisioned concurrency  
+ SnapStart

→ stable performance

---

# One-Line Memory Anchor

> Reserved concurrency protects, provisioned concurrency warms, SnapStart accelerates.

---