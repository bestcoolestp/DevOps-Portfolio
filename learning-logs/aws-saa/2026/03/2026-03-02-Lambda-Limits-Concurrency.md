# 2026-03-02 — AWS Lambda Limits, Concurrency & Cold Starts (DevOps/SRE Lens)

## Core Mental Model

Lambda = **Auto-scaling compute with guardrails**

- Scales automatically  
- But **bounded by limits**  
- Reliability depends on **concurrency control**

This is where **SRE thinking matters most**

---

# 1. Lambda Execution Limits

## Resource Limits

| Resource | Limit |
|----------|------|
| Memory | 128 MB – 10 GB |
| Execution Time | 15 minutes |
| Temp Storage (/tmp) | Up to 10 GB |
| Environment Variables | 4 KB |
| Concurrency (default) | 1,000 per region |

### Performance Insight

Memory affects:

- CPU
- Network
- Disk throughput

More memory = faster execution

Sometimes **higher memory = cheaper execution**

---

# 2. Deployment Limits

| Type | Limit |
|------|------|
| Zip package | 50 MB |
| Unzipped package | 250 MB |
| Large files | Use `/tmp` or S3 |

---

# 3. When Lambda is NOT Suitable

Lambda is not ideal when:

- >10 GB memory required  
- >15 minutes runtime  
- Large binary dependencies (>250MB)  
- Long-running background jobs  

Better alternatives:

- ECS
- Fargate
- EC2
- Batch

---

# 4. Concurrency Basics

Lambda scales automatically:

1 request → 1 execution

1000 requests → 1000 executions

Default limit:

- 1,000 concurrent executions per region

---

# 5. Account-Level Concurrency

Concurrency shared across:

- API Gateway Lambdas
- S3-triggered Lambdas
- SQS Lambdas

Example

Function A uses all 1000

Function B → throttled

This creates **service-wide outages**

---

# 6. Reserved Concurrency

Solution: isolate functions

Example

Function A → reserved 200

Remaining → 800 for others

Benefits

- workload isolation
- prevent noisy neighbor issues
- protect critical functions

---

# 7. Throttling Behavior

## Synchronous Invocation

Example

API Gateway → Lambda

Over limit:

- returns **429 Throttle Error**

User sees failure

---

## Asynchronous Invocation

Example

S3 → Lambda

Over limit:

- Lambda retries automatically
- exponential backoff

Retry Duration:

- Up to 6 hours

---

# 8. Dead Letter Queue (DLQ)

If retries fail:

Events sent to:

- SQS
- SNS

Benefits

- No data loss
- Retry later
- Debug failures

---

# 9. Cold Starts

Cold Start occurs when:

- New Lambda instance created
- Runtime initialized
- Dependencies loaded

Impact

First request slower

Example

Cold start: 3s  
Warm start: 50ms

---

# 10. Cold Start Causes

- New traffic spike
- Deployment
- Idle timeout
- VPC networking

---

# 11. Provisioned Concurrency

Solution: Pre-warm Lambdas

Benefits

- eliminate cold starts
- consistent latency
- predictable performance

Example

Provisioned concurrency = 10

10 Lambdas always ready

---

# 12. Provisioned Concurrency Scaling

Managed via:

- Application Auto Scaling
- Scheduled scaling
- Target tracking

Example

Morning traffic:

- scale provisioned concurrency

Night:

- scale down

---

# 13. Lambda in VPC Improvements

Before 2019:

- slow cold starts in VPC

Now:

- ENI reuse
- much faster cold starts

---

# 14. DevOps/SRE Takeaways

Lambda reliability depends on:

- concurrency limits
- throttling strategy
- retry behavior
- cold start mitigation

Production Best Practices

- Reserved concurrency
- DLQ configuration
- Provisioned concurrency (critical paths)
- CloudWatch monitoring

---

# Real Production Example

API Gateway → Lambda

Traffic spike

Without limits:

- concurrency exhausted
- API failures

With reserved concurrency:

- critical API protected

---

# One-Line Memory Anchor

> Lambda scales automatically, but concurrency controls reliability.

---
