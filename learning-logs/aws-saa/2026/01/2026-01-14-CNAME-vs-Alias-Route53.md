2026-01-14 — CNAME vs Alias Records in Route 53  
Source: Stephane Maarek — AWS SAA  
Theme: DNS aliasing and AWS-native routing

“CNAME is standard DNS. Alias is Route 53 intelligence.”

---

## 🌐 CNAME Record

**Definition**

Maps one hostname to another hostname.

**Example**

```

app.mydomain.com → target.example.com

```

**Key properties**

- Standard DNS feature (not AWS-specific)  
- Works only for **subdomains**  
- ❌ Cannot be used at zone apex (`mydomain.com`)  

**When to use**

- Simple hostname-to-hostname mapping  
- Non-root domains  

---

## ⚡ Alias Record (Route 53 Specific)

**Definition**

Route 53 extension that maps a hostname directly to an AWS resource.

**Example**

```

app.mydomain.com → ALB / CloudFront / etc.

```

**Record type**

- Always **A** (IPv4) or **AAAA** (IPv6)

---

## ✅ Alias Advantages

- Free DNS queries  
- Native health check support  
- Automatically tracks IP changes of AWS resources  
- Works at **root and subdomain** levels  
- TTL managed automatically by Route 53  

👉 Designed for AWS service integration.

---

## 🎯 Supported Alias Targets

Common AWS resources:

- Application / Classic Load Balancer  
- CloudFront distribution  
- API Gateway  
- Elastic Beanstalk  
- S3 static website  
- VPC Interface Endpoint  
- Global Accelerator  
- Route 53 record (same hosted zone)

---

## ⚠️ Important Restrictions

- ❌ Cannot point to EC2 instance DNS names  
- Must target supported AWS resources  
- TTL cannot be manually set  

---

## 🖥️ Practical Patterns

**CNAME (subdomain only)**

```

myapp.example.com → external hostname

```

**Alias (preferred for AWS)**

```

myapp.example.com → ALB (Alias A record)

```

**Zone apex requirement**

```

example.com → ALB

```

👉 CNAME not allowed → **Alias required**

---

## ✅ Exam Signals

Think:

- root domain mapping → Alias  
- need health checks + free queries → Alias  
- simple hostname redirect → CNAME  
- EC2 DNS name target → CNAME (not Alias)  

---

## 🧠 My Takeaway

The decision is structural:

- CNAME = generic DNS aliasing  
- Alias = AWS-aware routing primitive  

In AWS architectures:

- use CNAME for external hostname mapping  
- use Alias for AWS resources and root domains  

Understanding the **zone apex limitation** is the key exam differentiator.

```
