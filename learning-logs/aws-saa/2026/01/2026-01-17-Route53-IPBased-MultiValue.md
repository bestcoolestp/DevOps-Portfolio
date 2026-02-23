2026-01-17 — Route 53 Routing (IP-Based & Multi-Value)  
Source: Stephane Maarek — AWS SAA  
Theme: client-aware routing and health-aware multi-endpoint responses

“Good DNS answers depend on knowing who is asking and who is healthy.”

---

# 🟢 IP-Based Routing

## 🎯 Concept

Routes DNS responses based on the **client’s IP range (CIDR)**.

You define:

- CIDR block → endpoint mapping  
- Route 53 matches requester IP → returns mapped record  

---

## ⚙️ How It Works

Example:

- `203.x.x.x/…` → EC2 at `1.2.3.4`  
- `200.x.x.x/…` → EC2 at `5.6.7.8`  

**Behavior**

- Client IP ∈ CIDR A → returns endpoint A  
- Client IP ∈ CIDR B → returns endpoint B  

---

## 📌 When It Fits

- ISP-specific routing  
- cost-aware traffic steering  
- predictable client networks  

⚠️ Requires you to know client IP ranges in advance.

---

## 🧠 Mental Model

> IP-based routing = “Match the requester’s network.”

---

# 🟢 Multi-Value Routing

## 🎯 Concept

Returns **multiple healthy endpoints** for client-side load distribution.

Key properties:

- up to **8 healthy records** returned  
- integrates with health checks  
- provides basic load spreading  

⚠️ Not a replacement for ELB.

---

## ⚙️ Behavior

With health checks attached:

- all healthy → multiple IPs returned  
- one unhealthy → excluded automatically  
- client randomly chooses an IP  

---

## 🔍 Multi-Value vs Simple

| Feature           | Simple    | Multi-Value       |
|-------------------|-----------|-------------------|
| Multiple IPs      | ✅ Yes    | ✅ Yes           |
| Health checks     | ❌ No     | ✅ Yes           |
| Filters unhealthy | ❌ No     | ✅ Yes           |
| Max answers       | unlimited | **8 healthy max** |

👉 This distinction is a common exam trap.

---

## 📌 When It Fits

- lightweight DNS load spreading  
- small multi-region setups  
- need health filtering without ELB  

---

## 🧠 Mental Model

> Multi-value = “Return several healthy options.”

---

# 🔑 My Takeaway

These policies refine DNS intelligence in different ways:

- IP-based → decision based on **who the client is**  
- Multi-value → decision based on **which endpoints are healthy**

Together they show Route 53 evolving from simple name resolution into a **policy-driven answer engine**.

The key exam skill is recognizing whether the question is about:

- client identity → IP-based  
- endpoint health filtering → Multi-value 