2026-01-21 — MyWordPress.com Architecture  
Source: Stephane Maarek — AWS SAA  
Theme: scalable WordPress design (database + shared storage)

“Stateless compute requires shared state elsewhere.”

---

# 🎯 Application Context

Goal: run WordPress in a horizontally scalable AWS architecture.

WordPress stores:

- blog content  
- user data  
- uploaded images  

Challenge: multiple EC2 instances must access the **same media files**.

---

# 🗄 Database Layer

## Option 1 — RDS MySQL (Multi-AZ)

- Managed relational database  
- Synchronous standby in another AZ  
- Good baseline HA solution  

---

## Option 2 — Aurora MySQL

Advantages:

- Built-in Multi-AZ  
- Read replicas  
- Global database capability  
- Better scalability  
- Reduced operational overhead  

Trade-off:

- Higher cost  

👉 Aurora fits high-growth or global workloads.

---

# 🖼 Image Storage Problem

## Single Instance

- EC2 + EBS  
- Works fine  
- Images stored locally  

---

## Scaling Across AZs

- Multiple EC2 instances  
- Each instance has its own EBS  

Problem:

- Images uploaded to Instance A  
- Instance B cannot see them  

👉 Leads to inconsistent user experience.

EBS is tied to a single instance in one AZ.

---

# 📁 Solution — Amazon EFS

EFS provides:

- Shared NFS file system  
- Multi-AZ accessibility  
- Mounted by multiple EC2 instances  

Benefits:

- All instances read/write same storage  
- Automatic scaling  
- Consistent image handling  

Trade-off:

- More expensive than EBS  

---

# ⚖️ Storage Comparison

| Storage  | Scope                      | Use Case            | Cost   |
|----------|----------------------------|---------------------|--------|
| EBS      | Single instance, single AZ | Simple setup        | Lower  |
| EFS      | Multi-instance, multi-AZ   | Shared file storage | Higher |

---

# 🧠 Architecture Pattern

Scalable WordPress stack:

- Route 53 → DNS  
- ALB → Traffic distribution  
- EC2 + ASG → Stateless compute  
- Aurora MySQL → Scalable database  
- EFS → Shared media storage  

This separates:

- Compute  
- Database  
- Shared file system  

---

# 🔑 Main Insight

EBS works only for single-instance deployments.

For true horizontal scaling:

- Database → Aurora or Multi-AZ RDS  
- Media storage → EFS  

The architect’s job is balancing:

- scalability  
- consistency  
- cost  

WordPress becomes cloud-native only when state is externalized from compute.