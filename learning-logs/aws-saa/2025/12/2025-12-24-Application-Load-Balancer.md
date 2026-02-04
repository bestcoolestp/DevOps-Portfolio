# 2025-12-24 — Application Load Balancer (ALB)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** Layer 7 traffic routing for modern applications

> “A load balancer is not just about scale — it’s about intelligent traffic decisions.”

---

## What I learned (wrap-up)

### 1) What ALB really does
An **Application Load Balancer (ALB)** operates at **Layer 7 (HTTP/HTTPS)**.

Its role is not only to distribute traffic, but to **inspect requests** and route them
based on application-level information.

Key idea:
- one ALB can route traffic to **multiple applications**
- routing is done using **rules**, not just ports

---

## Core ALB capabilities

### Layer 7 routing features
ALB can route traffic based on:
- **Path**  
  `/users` → user service  
  `/posts` → post service
- **Host**  
  `api.example.com` vs `shop.example.com`
- **Query string & headers**  
  `?Platform=Mobile` vs `?Platform=Desktop`

**Insight:**  
Routing logic lives at the load balancer, not inside the application.

---

### Protocol & connection support
- supports **HTTP/2**
- supports **WebSockets** (persistent connections)
- can perform **HTTP → HTTPS redirection**

**Use case:**  
chat apps, real-time dashboards, or any app needing long-lived connections.

---

## Target Groups: where traffic actually goes

ALB routes traffic to **Target Groups**, not directly to instances.

Target groups can contain:
- EC2 instances (often with Auto Scaling)
- ECS tasks (containers)
- Lambda functions
- private IP addresses (including on-prem servers)

Each target group:
- has its own **health checks**
- independently determines which targets receive traffic

**Insight:**  
Health checks protect the system by isolating failed components automatically.

---

## Example routing patterns I learned

- **Microservices**
  - `/users` → EC2 service A
  - `/search` → EC2 service B

- **Hybrid architecture**
  - `?Platform=Mobile` → EC2 in AWS
  - `?Platform=Desktop` → on-prem servers

- **Multi-environment**
  - `api.example.com` → ECS tasks
  - `shop.example.com` → EC2 instances

---

## Networking & request handling details

- ALB provides a **fixed DNS hostname**
- client connection is **terminated at the ALB**
- backend servers do not see the client IP directly

Instead, ALB adds headers:
- `X-Forwarded-For` → original client IP
- `X-Forwarded-Port` → client port
- `X-Forwarded-Proto` → HTTP or HTTPS

**Insight:**  
Applications must read forwarded headers to understand the real client context.

---

## Common exam scenarios (how I answer them)

- **Instance fails health check**  
  → ALB stops routing traffic to it automatically

- **Force HTTPS everywhere**  
  → configure ALB listener rules to redirect HTTP → HTTPS

- **Route by URL path**  
  → path-based routing

- **Route by domain name**  
  → host-based routing

- **Route by query string**  
  → query string–based routing

- **Need persistent connections**  
  → WebSockets support

- **Need app-layer protection**  
  → integrate **AWS WAF** with ALB

---

## My takeaway

ALB is not just a traffic distributor.  
It’s an **application-aware control plane** that enables clean microservice design,
safe scaling, and flexible routing — all without changing application code.
