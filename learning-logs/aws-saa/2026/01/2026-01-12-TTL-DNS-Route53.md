````markdown
2026-01-12 / 2026-01-13 — TTL (Time To Live) in DNS — Route 53  
Source: Stephane Maarek — AWS SAA  
Theme: DNS caching behavior and propagation control

“TTL determines how fast the internet forgets.”

---

## 🌐 Core Concept

**TTL (Time To Live)** defines how long a DNS response is cached by resolvers and clients before re-querying DNS.

It directly controls:

- propagation speed  
- DNS query volume  
- Route 53 cost  

---

## ⚖️ TTL Trade-off

**High TTL (e.g., 24 hours)**

Pros  
- fewer DNS queries  
- lower cost  
- better cache efficiency  

Cons  
- slow propagation of changes  

---

**Low TTL (e.g., 60 seconds)**

Pros  
- fast record updates  
- easier traffic cutovers  

Cons  
- higher DNS query volume  
- higher cost  

---

## 🧭 Safe Change Strategy (Important)

Before modifying a DNS record:

1. Lower TTL (well ahead of change window)  
2. Wait for caches to expire under the new TTL  
3. Update the record value  
4. After stabilization, raise TTL again  

👉 This minimizes stale DNS during migrations.

---

## 📌 Mandatory Rule

- TTL is required for standard records  
- **Alias records do NOT require TTL** (Route 53 manages it)

⚠️ Common exam trap.

---

## 🖥️ Demo Flow

### Step 1 — Create Record

- Name: `demo.stephanetheteacher.com`  
- Type: A  
- Value: EC2 IP (eu-central-1)  
- TTL: 120 seconds  

Result: domain resolves to the EC2 instance.

---

### Step 2 — Verify

```bash
nslookup demo.stephanetheteacher.com
dig demo.stephanetheteacher.com
```

**Observed behavior**

* TTL countdown visible (e.g., 115 → 98 seconds)
* Confirms active caching

---

### Step 3 — Update Record

Change A record to a different EC2 IP (ap-southeast-1).

**Important behavior**

* Clients still return OLD IP
* Cache persists until TTL expiry

👉 DNS is eventually consistent.

---

### Step 4 — After TTL Expiry

* Browser refresh returns new IP
* `dig` shows updated record and fresh TTL

Propagation completes.

---

## ✅ Exam Signals

Think TTL when you see:

* DNS change propagation delay
* stale IP after record update
* need faster DNS cutover
* Alias record TTL exception

---

## 🧠 My Takeaway

TTL is a **control knob for DNS consistency vs cost**:

* low TTL → agility
* high TTL → efficiency

Production systems typically:

* lower TTL before planned cutovers
* perform the change
* restore higher TTL afterward

Understanding TTL behavior is essential for safe DNS migrations and Route 53 design.

```
```
