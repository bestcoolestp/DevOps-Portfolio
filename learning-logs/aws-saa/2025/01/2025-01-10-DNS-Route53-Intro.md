2025-01-10 — DNS and Route 53 Introduction  
Source: Stephane Maarek — AWS SAA  
Theme: DNS resolution fundamentals and hierarchy

“DNS is the phonebook of the internet.”

---

## 🌐 What is DNS?

- DNS (Domain Name System) translates human-readable hostnames into IP addresses.
- Example: `www.google.com` → DNS returns IP → browser connects to server.
- Acts as the core naming system of the internet.

**Primary purpose**

- enable users to access services via names instead of IPs  
- decouple service location from hostname  

---

## 🏗️ DNS Hierarchy

DNS is structured as a global distributed hierarchy:

- Root: `.`
- Top-Level Domain (TLD): `.com`, `.org`, `.gov`, `.us`
- Second-Level Domain: `example.com`, `google.com`
- Subdomain: `www.example.com`, `api.example.com`
- FQDN: fully qualified domain name (e.g., `api.www.example.com`)
- URL = protocol + FQDN (e.g., `https://api.www.example.com`)

---

## 📖 Key Terminology

**Domain Registrar**

- Service where domains are registered  
- Examples: Route 53, GoDaddy  

**DNS Records**

Common types:

- A → maps to IPv4  
- AAAA → maps to IPv6  
- CNAME → hostname alias  
- NS → authoritative name servers  

**Zone File**

- Collection of DNS records for a domain  

**Name Servers**

- Servers that answer DNS queries  

---

## 🔄 DNS Resolution Flow

**Step-by-step (recursive lookup)**

1. Browser requests `example.com`.
2. Local DNS resolver checks cache.
3. If cache miss:

   - Query Root Server  
   - Root returns TLD server for `.com`

4. Resolver queries TLD server.
   - TLD returns authoritative server for `example.com`

5. Resolver queries authoritative server.
   - Returns final A record (IP address)

6. Resolver caches the response.
7. Browser connects to returned IP.

---

## ⚡ Why Caching Matters

- Reduces DNS lookup latency  
- Lowers global DNS traffic  
- Improvers user-perceived performance  

⚠️ Trade-off: cached records can become stale until TTL expires.

---

## 🧠 My Takeaway

DNS is a **distributed, hierarchical lookup system**, not a flat database.

Key mental model:

- root → TLD → authoritative server  
- heavy reliance on caching  
- every web request depends on DNS resolution  

Understanding this flow is foundational before working with **Amazon Route 53 routing policies and health checks**.

---

## ✅ Exam Signals

Think DNS when you see:

- hostname → IP translation  
- recursive query flow  
- TTL and caching behavior  
- Route 53 domain routing questions  
