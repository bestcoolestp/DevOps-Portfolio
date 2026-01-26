# 2025-12-04 ~ 2025-12-06 — EC2 Fundamentals (Instances, Storage, SG, Lifecycle, Instance Types)

**Source:** Stephane Maarek — AWS SAA 
**Theme:** EC2 as AWS IaaS core + launching an instance + choosing the right instance family

> “Elasticity is only useful when you know what you’re optimizing for.”

---

## What I learned (wrap-up)

Amazon EC2 is the backbone of AWS **Infrastructure as a Service (IaaS)**.  
It’s basically “rent a server,” but with cloud speed and flexibility:

- spin up virtual machines (instances) on demand
- attach storage (EBS / EFS / instance store)
- expose traffic with Load Balancers
- scale with Auto Scaling Groups (ASG)
- control network access with Security Groups (firewall rules)
- bootstrap configuration using **User Data** on first boot

**My takeaway:** EC2 is “elastic” because you can pick the exact compute shape you need (OS / CPU / memory / storage / networking) and provision it instantly.

---

## Hands-on summary (Launch Instance flow)

I practiced the full EC2 launch cycle from console → live web access:

1. **Launch Instance**  
2. **Name & Tags**: `My First Instance`
3. **AMI**: Amazon Linux 2023 (Free Tier eligible)
4. **Instance Type**: `t3.micro` (Free Tier eligible)
5. **Key Pair**: created a new one (RSA, `.pem`)
6. **Network / Security Group**: inbound rules included:
   - SSH access
   - HTTP access from the internet
7. **Storage**: default `8 GiB gp3` root volume
   - confirmed **Delete on termination** enabled
8. (Optional) **User Data** for first boot automation  
9. **Review → Launch**

---

## Instance lifecycle behavior (the parts that matter)

After launch, I validated how EC2 behaves operationally:

- **Accessing the web server**  
  → visit `http://<Public IPv4>` in a browser

- **Stop**  
  → instance becomes unavailable (server down)

- **Start**  
  → instance comes back online

- **Terminate**  
  → instance is permanently deleted  
  → default attached volumes are deleted if “Delete on termination” was enabled

### Public vs Private IP (important detail)
- **Public IPv4 can change** after Stop → Start  
- **Private IPv4 stays the same**

**My takeaway:** for stable public access, relying on a raw public IP is fragile.  
(You need a stable layer like an Elastic IP or a DNS name in real setups.)

---

## EC2 instance types (how I remember the naming)

Example format: `m5.2xlarge`

- `m` → instance class (what it’s optimized for)
- `5` → generation (newer usually = better price/perf)
- `2xlarge` → size (more vCPU + memory than `large`)

---

## Choosing the right instance family (quick mental map)

### Common families
- **T / M** → General purpose (balanced default)
- **C** → Compute optimized (CPU-heavy workloads)
- **R** → Memory optimized (RAM-heavy workloads)
- **I / D / H** → Storage optimized (fast local disk needs)

### GPU / ML-related families
- **P-family** → GPU for ML training / HPC (ex: P3, P4)
- **G-family** → GPU for graphics / rendering / visualization (ex: G5)
- **Inf-family** → ML inference at scale (ex: Inf1)

**My takeaway:** instance choice is a business decision as much as a technical one:  
pick the family that matches the bottleneck (CPU vs RAM vs Disk vs GPU).

---
