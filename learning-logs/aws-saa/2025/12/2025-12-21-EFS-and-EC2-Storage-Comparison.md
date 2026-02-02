# 2025-12-21 — Amazon EFS & EC2 Storage Comparison (EBS vs EFS vs Instance Store)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** shared storage, scalability, and choosing the right storage abstraction

> “Storage choice defines how your system scales, fails, and recovers.”

---

## What I learned (wrap-up)

### 1) What Amazon EFS really is
**Amazon EFS (Elastic File System)** is a fully managed **Network File System (NFS)**.

Key characteristics:
- multiple EC2 instances can mount it **at the same time**
- instances can be in **different Availability Zones**
- storage grows automatically (up to petabytes)
- pay only for what you use (no pre-provisioning)

**Mental model:**  
EBS is a personal hard drive for one EC2.  
EFS is a shared drive for many EC2s.

---

### 2) Core EFS features
- **Highly available & scalable** by default
- **Linux-only** (POSIX-compliant, not for Windows)
- **Encryption at rest** using AWS KMS
- Uses standard Linux file system APIs
- More expensive than EBS (roughly ~3× gp2)

**Insight:**  
EFS trades cost for simplicity and multi-instance access.

---

### 3) Common EFS use cases
- content management systems (e.g., WordPress)
- web servers sharing uploads
- data sharing across application servers
- media processing and big data workloads

**Takeaway:**  
If multiple instances must read/write the same files, EFS is usually the cleanest answer.

---

## Performance & throughput choices

### Performance modes
Chosen at creation time:
- **General Purpose** (default)
  - low latency
  - web servers, CMS
- **Max I/O**
  - higher latency, higher throughput
  - big data, parallel workloads

---

### Throughput modes
- **Bursting**
  - throughput scales with storage size
  - burst up to ~100 MB/s
- **Provisioned**
  - fixed throughput independent of size
- **Elastic**
  - automatically scales
  - up to ~3 GB/s reads, ~1 GB/s writes

**Insight:**  
Throughput choice is about **workload behavior**, not just file size.

---

## Cost optimization with storage classes
EFS supports lifecycle-based tiering:
- **Standard** → frequent access
- **EFS-IA** → infrequent access (lower cost, retrieval fee)
- **Archive** → rarely accessed, lowest cost

Lifecycle policies (e.g., move to IA after 60 days) can reduce costs **up to ~90%**.

---

## Availability options
- **Standard (Multi-AZ)**  
  - best for production
  - highest durability
- **One Zone**
  - cheaper
  - suitable for dev/test
- **One Zone-IA**
  - lowest cost option
  - infrequent access + single AZ

**Insight:**  
Availability is a pricing decision as much as a reliability decision.

---

## Big picture: EBS vs EFS vs Instance Store

### EBS (Elastic Block Store)
- block storage
- attached to one EC2 at a time (except Multi-Attach for io1/io2)
- **AZ-bound**
- performance configurable (gp3 / io1 / io2)
- snapshot required to move across AZs
- root volume deleted on termination by default

---

### EFS (Elastic File System)
- network file system
- mounted by **many EC2 instances**
- works **across AZs**
- Linux-only
- higher cost, but shared and scalable
- storage tiers for cost optimization

---

### Instance Store
- physical storage on the EC2 host
- **ephemeral** (data lost on stop/terminate)
- extremely high performance
- used for temporary or scratch data

---

## My takeaway

EBS, EFS, and Instance Store are not competing services —  
they solve **different problems**:

- EBS → single-instance, durable block storage
- EFS → shared, multi-instance file storage
- Instance Store → fast, disposable local storage

Good architecture starts by choosing the right storage *behavior*, not just capacity.