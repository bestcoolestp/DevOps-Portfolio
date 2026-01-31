# 2025-12-18 — AMI Fundamentals & AMI vs Docker Images

**Source:** Stephane Maarek — AWS SAA  
**Theme:** EC2 image strategy, reuse, and abstraction boundaries

> “Good infrastructure starts with good templates.”

---

## What I learned (wrap-up)

### 1) AMI: the blueprint behind every EC2 instance
An **Amazon Machine Image (AMI)** is the template used to launch EC2 instances.

It can include:
- the Operating System
- installed software
- system and application configuration

In practice, an AMI represents a **ready-to-run machine state**, not just an OS.

---

### 2) Types of AMIs
There are three main AMI sources:

- **Public AMIs**  
  Provided by AWS (e.g., Amazon Linux).  
  Good defaults, minimal customization.

- **Custom AMIs**  
  Built and maintained by you.  
  Software and configuration are preinstalled.

- **Marketplace AMIs**  
  Created by third-party vendors.  
  Used to deploy specialized or commercial software quickly.

**Insight:**  
The more predictable your environment needs to be, the more value custom AMIs provide.

---

### 3) Why custom AMIs matter
Benefits I noted:
- faster instance boot (less user-data work)
- consistent configuration across environments
- monitoring tools, OS tuning, and app setup baked in
- AMIs can be copied across regions

**Insight:**  
Custom AMIs trade build-time effort for runtime speed and consistency.

---

### 4) AMI creation flow (what actually happens)
Typical process:
1. launch and configure an EC2 instance
2. stop the instance (for data integrity)
3. create an AMI  
   → AWS automatically creates **EBS snapshots**
4. use the AMI to launch new instances
   - same region, different AZs
   - or copied to other regions

**Insight:**  
An AMI is not just an image — it’s a snapshot-backed artifact.

---

### 5) AMIs and business value
- vendors sell AMIs via AWS Marketplace
- AMIs can be versioned, shared, and reused
- even individuals can package and monetize AMIs

**Takeaway:**  
AMIs are not only technical assets — they can be products.

---

## AMI vs Docker image (how I think about it)

### What they have in common
- both are reusable templates
- both enable fast, repeatable deployments
- both are central to automation

### Key differences
- **Abstraction level**
  - AMI → full virtual machine (OS + environment)
  - Docker image → application/process level

- **Portability**
  - AMIs are AWS-specific
  - Docker images run almost anywhere

- **Performance & isolation**
  - containers are lighter and faster to start
  - AMIs give full OS control and isolation

---

### When to use which
- Use **AMIs** when:
  - you need OS or kernel control
  - you run legacy or tightly coupled software
  - you require deep system customization

- Use **Docker images** when:
  - portability matters
  - microservices or rapid iteration are needed

In practice, they often **work together**:
- launch EC2 from an AMI
- run Docker containers inside it

---

## My takeaway

AMIs define the **machine**, Docker images define the **application**.  
Knowing where that boundary sits helps avoid over-engineering — or under-designing.
