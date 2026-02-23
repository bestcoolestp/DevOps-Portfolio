2026-01-18 — Domain Registrar vs DNS Service & Route 53 Resolver  
Source: Stephane Maarek — AWS SAA  
Theme: domain ownership vs DNS control and hybrid resolution

“Buying a domain and answering DNS queries are separate jobs.”

---

# 🌐 Domain Registrar vs DNS Service

## 🔑 Core Distinction

**Domain Registrar**

- Where you **purchase and own** a domain  
- Annual fee required  
- Examples: Amazon Registrar, GoDaddy  

**DNS Service**

- Where you **manage DNS records**  
- Translates names → IPs  
- Example: Route 53  

👉 Ownership and resolution are independent.

---

## 💡 Key Reality

Most registrars bundle DNS, but you can mix providers.

**Common patterns**

- Register at GoDaddy → DNS in Route 53  
- Register at Amazon → DNS in Route 53  
- Register at Google → DNS anywhere  

---

## ⚙️ Using Route 53 with Third-Party Registrar

**Steps**

1. Register domain at registrar  
2. Create **Public Hosted Zone** in Route 53  
3. Copy Route 53 **NS records**  
4. Update registrar name servers  
5. Route 53 becomes authoritative DNS  

⚠️ The NS update is the critical switch.

---

## 🧠 Mental Model

> Registrar = ownership  
> DNS service = traffic directory

---

# 🧭 Route 53 Resolver

## 🔑 Core Idea

Route 53 Resolver is the **default DNS resolver inside AWS**.

It resolves:

- EC2 internal hostnames  
- private hosted zones  
- public hosted zones  

Runs automatically in every VPC.

---

# 🌉 Hybrid DNS Problem

When environments mix:

- AWS DNS  
- on-prem DNS  

You need controlled query paths.

Requires:

- VPN or Direct Connect  
- Resolver endpoints  

---

# ⚙️ Resolver Endpoints

## 📥 Inbound Endpoint (On-prem → AWS)

Allows on-prem systems to resolve AWS names.

**Flow**

```

On-prem DNS → Inbound endpoint → Route 53 Resolver → AWS records

```

**Use case**

- on-prem app resolves `service.aws.private`

---

## 📤 Outbound Endpoint (AWS → On-prem)

Allows AWS resources to resolve on-prem names.

**Flow**

```

EC2 → Route 53 Resolver → Outbound endpoint → On-prem DNS

```

**Use case**

- EC2 resolves `db.onprem.private`

---
## ✅ Exam Signals

Think:

- buy domain vs manage DNS → Registrar vs DNS  
- change NS at registrar → Route 53 becomes authoritative  
- on-prem resolving AWS → Inbound endpoint  
- EC2 resolving on-prem → Outbound endpoint  

---
# 🔑 My Takeaway

Two separate but related layers:

- Registrar controls **who owns the name**  
- Route 53 Resolver controls **how names resolve inside AWS**

In hybrid architectures:

- inbound endpoints expose AWS DNS outward  
- outbound endpoints extend AWS DNS inward  

Mastering this boundary is essential for real enterprise networking scenarios.

```
