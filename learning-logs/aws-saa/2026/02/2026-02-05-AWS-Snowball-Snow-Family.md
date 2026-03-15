2026-02-05 — AWS Snowball & Snow Family  
Perspective: DevOps / SRE Notes  
Theme: large-scale data transfer and edge processing

“Sometimes the fastest network is a truck.”

---

# 📦 AWS Snowball

## Core Idea

AWS Snowball is a **physical data transfer device** used when moving large datasets over the internet is impractical.

Instead of transferring data over the network:

```

Ship the data physically.

```

Architecture:

```

Data Center → Snowball Device → Ship to AWS → Data imported into S3

```

This bypasses bandwidth constraints.

---

# 🚧 The Problem It Solves

Large data migrations over the internet are often limited by:

- bandwidth constraints
- long transfer times
- unstable connections
- high transfer costs

Example:

```

100 TB over 1 Gbps ≈ 12 days

```

In real environments this is often slower.

Snowball replaces the network with **physical transfer logistics**.

---

# 📦 AWS Snow Family Devices

Two primary devices are relevant for exams.

### Snowball Edge Storage Optimized

Designed for **large-scale data migration**.

Specifications:

```

≈210 TB usable storage

```

Typical use cases:

- data center migrations
- backup archives
- bulk ingestion pipelines

---

### Snowball Edge Compute Optimized

Designed for **edge processing workloads**.

Specifications:

```

≈28 TB storage

```

Supports:

- EC2 instances
- AWS Lambda functions

Use cases:

- local analytics
- data preprocessing
- media processing
- machine learning inference

---

# 🌐 Edge Computing with Snowball

Snowball devices can operate in **disconnected environments**.

Examples:

- ships at sea
- mining sites
- remote oil rigs
- military deployments

Processing workflow:

```

Data → Snowball Edge → Local compute → Results sent to AWS

```

This reduces the amount of data transferred back to the cloud.

---

# 📑 Snowball Job Workflow

Typical import process:

1️⃣ Create job in AWS console  
2️⃣ AWS ships Snowball device  
3️⃣ Load data locally  
4️⃣ Ship device back to AWS  
5️⃣ AWS imports data into S3

Architecture:

```

Local Storage → Snowball → AWS Import → S3

```

---

# 🔐 Security Model

Snowball devices include multiple security controls.

Key protections:

- tamper-resistant hardware
- automatic data encryption
- secure shipping
- device wipe after import

Encryption is handled via **AWS KMS keys**.

---

# 💰 Pricing Model

Snowball pricing includes:

- device usage per day
- shipping fees
- standard S3 data transfer charges

The service is optimized for **bulk transfer economics**.

---

# 🧠 DevOps / SRE Mental Model

Snowball solves two operational challenges.

Large-scale data movement:

```

Move petabytes efficiently

```

Remote compute environments:

```

Run workloads where connectivity is limited

```

This makes Snowball a key component of **hybrid cloud architectures**.

---

# ⚠️ Glacier Import Rule (Important Exam Concept)

Snowball **cannot import directly into Glacier**.

Correct workflow:

```

Snowball → Amazon S3 → Lifecycle Policy → Glacier

```

Process:

1️⃣ Import data into S3  
2️⃣ Configure lifecycle rule  
3️⃣ Transition objects to Glacier

This is a **classic exam scenario**.

---

# 🎯 High-Value Exam Signals

Snowball:

- used for **large-scale data migration**
- supports **edge computing**
- avoids internet bandwidth limitations

Device types:

```

Storage Optimized → migration
Compute Optimized → edge workloads

```

Glacier rule:

```

Snowball → S3 → Lifecycle → Glacier

```

Never directly to Glacier.

---

# One-Line Summary

```

AWS Snowball is a physical data transfer device used to migrate large datasets and run edge workloads when network transfers are slow or unreliable.

