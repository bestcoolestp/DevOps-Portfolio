2026-01-16 — Route 53 Health Checks & Advanced Routing  
Source: Stephane Maarek — AWS SAA  
Theme: DNS failover and location-aware routing

“Health checks turn DNS from static mapping into resilient routing.”

---

# 🩺 Route 53 Health Checks

## 🌍 Purpose

Health checks let Route 53 **detect endpoint failures** and adjust DNS answers.

Used for:

- multi-region HA  
- DNS failover  
- availability monitoring  

⚠️ Endpoint checks require **publicly reachable targets** (unless using CloudWatch).

---

## ⚙️ Health Check Types

### 1) Endpoint Health Check

Monitors a public endpoint.

**Checks**

- HTTP / HTTPS / TCP  
- 2xx or 3xx status  
- optional text match (first 5,120 bytes)

**Mechanics**

- ~15 global checkers  
- Standard: 30s  
- Fast: 10s (higher cost)  
- Healthy if ≥18% report success  

⚠️ Must allow Route 53 health checker IP ranges.

---

### 2) Calculated Health Check

Aggregates multiple checks using logic.

Supports:

- AND  
- OR  
- NOT  

Limits:

- up to 256 child checks  

**Use case**

- tolerate partial failures  
- maintenance windows  

---

### 3) CloudWatch Alarm Health Check

Monitors a **CloudWatch alarm** instead of an endpoint.

Best for:

- private VPC resources  
- on-prem systems  
- custom app metrics  

**Flow**

Metric → Alarm → Health check status.

---

## 🧠 Health Check Takeaway

- Endpoint = public resource  
- Calculated = logic layer  
- CloudWatch = private monitoring  

---

# 🔴 Failover Routing

## 🎯 Concept

Primary/secondary DNS failover based on health.

**Rules**

- Primary **must** have health check  
- Secondary health check optional  
- Only one primary + one secondary  

---

## ⚙️ Behavior

- Primary healthy → DNS returns primary  
- Primary unhealthy → DNS returns secondary  

TTL controls failover speed.

---

## 📌 When It Fits

- disaster recovery  
- active–passive setups  
- regional backup  

---

## 🧠 Mental Model

> Failover = DNS-level active/passive switch.

---

# 🌍 Geolocation Routing

## 🎯 Concept

Routes based on **user geographic location**.

Priority of matching:

```

State (US) → Country → Continent → Default

```

Most specific match wins.

---

## 📌 Use Cases

- localized content  
- regulatory control  
- region-specific apps  

⚠️ Always configure a **Default** record.

---

## 🧠 Mental Model

> Geolocation = “Who is the user?”

(Not performance-based.)

---

# 🧭 Geoproximity Routing

## 🎯 Concept

Routes based on **location + bias adjustment**.

Requires **Route 53 Traffic Flow**.

---

## ⚙️ Bias Behavior

- Bias = 0 → normal closest routing  
- Positive bias → expands region influence  
- Negative bias → shrinks influence  

---

## 📍 Resource Types

- AWS → specify region  
- Non-AWS → provide lat/long  

---

## 📌 When It Fits

- capacity steering  
- traffic shaping  
- hybrid cloud routing  

---

## 🧠 Mental Model

> Geoproximity = “Shift the map.”

(Not just closest region.)

---

# 🔑 Comparative Snapshot

| Policy        | Decision Basis       | Best For        |
|---------------|----------------------|-----------------|
| Failover      | health status        | DR              |
| Geolocation   | user location        | localization    |
| Geoproximity  | location + bias      | traffic shaping |

---
## ✅ Exam Signals

Think:

- active/passive DR → Failover  
- serve country-specific content → Geolocation  
- shift traffic geographically → Geoproximity  
- private resource monitoring → CloudWatch health check 

---

## 🧠 My Takeaway

Route 53 becomes powerful when **health awareness and geography** are combined.

- Health checks enable automated resilience  
- Failover provides DR safety  
- Geolocation serves the right content  
- Geoproximity gives fine traffic control  

The real design skill is choosing the policy that matches **failure model, user distribution, and capacity strategy**.
 
```