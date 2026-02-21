2026-01-15 — Route 53 Routing Policies (Simple, Weighted, Latency)  
Source: Stephane Maarek — AWS SAA  
Theme: DNS response strategies in Route 53

“DNS answers which endpoint to try — the client sends the traffic.”

---

## 🌐 What Routing Policy Means

A Route 53 routing policy controls **how DNS answers are returned**.

Important distinction:

- DNS does NOT route traffic  
- DNS only returns endpoints (IP or AWS resource)  
- The client chooses and connects

---

## 📑 Common Routing Policies

- Simple  
- Weighted  
- Failover  
- Latency  
- Geolocation  
- Multi-value  
- Geoproximity  

---

# 🟢 Simple Routing

## 🎯 Concept

Returns one or more records **without traffic control logic**.

**Behavior**

- Single IP → always returned  
- Multiple IPs → all returned  
- Client randomly chooses one  

⚠️ No health checks supported.

---

## ⚙️ Characteristics

- Basic DNS mapping  
- No failover awareness  
- No traffic weighting  
- Alias → can point to only one AWS resource  

---

## 📌 When It Fits

- Single-endpoint apps  
- Basic DNS needs  
- Non-critical workloads  

---

## 🧠 Mental Model

> Simple routing = “Here are the IPs — good luck.”

---

# 🟡 Weighted Routing

## 🎯 Concept

Controls **percentage of DNS responses** per resource.

**Formula**

```

traffic share = record weight / total weights

```

Weights are relative (do NOT need to sum to 100).

---

## ⚙️ How It Works

Requirements:

- Same record name  
- Same record type  
- Different weights  

**Example**

- us-east-1 → weight 70  
- eu-central-1 → weight 20  
- ap-southeast-1 → weight 10  

Approximate distribution follows weights.

---

## ✅ Key Capabilities

- Supports health checks  
- Fine-grained traffic shifting  
- Canary deployments  
- A/B testing  

---

## 🎯 Special Behaviors

- Weight = 0 → no traffic  
- All weights = 0 → equal distribution  

⚠️ Exam favorite.

---

## 📌 When It Fits

- Gradual rollout  
- Regional balancing  
- Blue/green deployments  

---

## 🧠 Mental Model

> Weighted routing = “Control the probability of answers.”

---

# 🔵 Latency-Based Routing

## 🎯 Concept

Routes users to the region with **lowest network latency** (as measured by AWS).

Goal: best user performance.

---

## ⚙️ How It Works

You create multiple records:

- Same name  
- Same type  
- Different **AWS regions**

Route 53 evaluates user location → returns lowest-latency region.

---

## 📍 Requirements

- Region must be explicitly specified  
- Works well with health checks  
- Designed for multi-region deployments  

---

## 🌍 Example Behavior

- User in Europe → Frankfurt  
- User in Canada → US East  
- User in Hong Kong → Singapore  

⚠️ Lowest latency ≠ geographically closest (important nuance).

---

## 📌 When It Fits

- Global applications  
- Latency-sensitive systems  
- Multi-region active deployments  

---

## 🧠 Mental Model

> Latency routing = “Send user to fastest region.”

---

# 🔑 Comparative Snapshot

| Policy   | Control Level | Health Checks | Primary Use |
|----------|--------------|--------------|-------------|
| Simple   | None         | ❌ No        | Basic DNS |
| Weighted | Percentage   | ✅ Yes       | Traffic shifting |
| Latency  | Performance  | ✅ Yes       | Global apps |

---

## ✅ Exam Signals

Think:

- gradual rollout → Weighted  
- fastest regional response → Latency  
- basic DNS mapping → Simple  
- needs health checks → NOT Simple  

---

## 🧠 My Takeaway

Route 53 routing policies are **DNS answer strategies**, not traffic routers.

- Simple = minimal logic  
- Weighted = traffic control lever  
- Latency = performance optimization  

The architectural skill is choosing the policy that matches the **deployment topology and user distribution**.
