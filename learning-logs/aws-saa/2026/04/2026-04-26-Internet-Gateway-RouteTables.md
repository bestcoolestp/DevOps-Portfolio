# 2026-04-26 — Internet Gateway (IGW) & Route Tables

# Core Mental Model

Many AWS exam questions can be solved with one idea:

```text id="igw1"
Internet access is determined by routing.
```

Not by:

- Security Groups
- NACLs
- Public IPs

alone.

---

# The Formula for Internet Access

For an EC2 instance to access the Internet:

```text id="igw2"
Public IP + Route to Internet Gateway + Internet Gateway Attached to VPC = Internet Access
```

Missing any one of these:

```text id="igw3"
No Internet Access
```

---

# 1. What is an Internet Gateway?

Internet Gateway (IGW) is a managed AWS service that connects a VPC to the Internet.

Think:

```text id="igw4"
VPC Doorway to the Internet
```

---

# Characteristics

✅ Horizontally scaled

✅ Highly available

✅ Fully managed

✅ Redundant

---

# AWS Exam Memory

```text id="igw5"
IGW = Internet Access for a VPC
```

---

# 2. Internet Gateway Relationship

One IGW can only attach to:

```text id="igw6"
One VPC
```

at a time.

---

Relationship:

```text id="igw7"
1 VPC ↔ 1 IGW
```

---

# Example

```text id="igw8"
DemoVPC → DemoIGW → Internet
```

---

# 3. IGW Alone Does Nothing

This is an extremely common exam trap.

---

Wrong assumption:

```text id="igw9"
Attach IGW = Internet Works
```

❌ False

---

You must also configure:

```text id="igw10"
Route Table
```

---

# Without Route

```text id="igw11"
EC2 → Router → ???
```

Traffic has nowhere to go.

---

# 4. Route Tables

A Route Table controls:

```text id="igw12"
Where network traffic goes
```

---

Think:

```text id="igw13"
GPS for packets
```

---

Example:

```text id="igw14"
Destination → Target
```

---

# Local Route

Every route table automatically contains:

```text id="igw15"
10.0.0.0/16 → local
```

---

Meaning:

```text id="igw16"
Traffic inside the VPC
```

stays inside the VPC.

---

# 5. Internet Route

To reach the Internet:

```text id="igw17"
0.0.0.0/0 → Internet Gateway
```

---

Meaning:

```text id="igw18"
Everything else → Internet
```

---

# Exam Favorite

What does:

```text id="igw19"
0.0.0.0/0
```

mean?

Answer:

```text id="igw20"
All IPv4 addresses
```

---

# 6. Public Subnet Definition

A subnet becomes public when:

```text id="igw21"
Its route table contains: 0.0.0.0/0 → IGW
```

---

Nothing else is required.

---

# Exam Memory

```text id="igw22"
Public Subnet = Route to Internet Gateway
```

---

# Example

```text id="igw23"
PublicSubnetA → PublicRouteTable → 0.0.0.0/0 → IGW
```

---

# Result

Internet access available.

---

# 7. Private Subnet Definition

A subnet is private when:

```text id="igw24"
No route exists to IGW
```

---

Example:

```text id="igw25"
PrivateSubnetA → PrivateRouteTable → Only Local Route
```

---

Result:

```text id="igw26"
No direct Internet access
```

---

# AWS Exam Shortcut

```text id="igw27"
Route to IGW? → Public

No Route to IGW? → Private
```

---

# 8. Demo Architecture

Initial State

```text id="igw28"
DemoVPC

PublicSubnetA
PublicSubnetB

PrivateSubnetA
PrivateSubnetB

No IGW
No Internet Route
```

---

Result:

```text id="igw29"
No Internet Connectivity
```

---

# 9. Launching EC2

Instance launched in:

```text id="igw30"
PublicSubnetA
```

---

Configuration:

```text id="igw31"
Public IPv4 = Enabled
```

---

But:

```text id="igw32"
Internet still fails
```

---

Why?

Because:

```text id="igw33"
No IGW
No Route
```

---

# Exam Trap

Public IP alone:

```text id="igw34"
≠ Internet Access
```

---

# 10. Creating Internet Gateway

Create:

```text id="igw35"
DemoIGW
```

---

Attach to:

```text id="igw36"
DemoVPC
```

---

Still:

```text id="igw37"
No Internet
```

---

Why?

Missing route.

---

# 11. Creating Route Tables

AWS best practice:

Separate route tables.

---

### PublicRouteTable

Associated with:

```text id="igw38"
PublicSubnetA

PublicSubnetB
```

---

### PrivateRouteTable

Associated with:

```text id="igw39"
PrivateSubnetA

PrivateSubnetB
```

---

# Architecture

```text id="igw40"
PublicSubnetA
┐
├── PublicRouteTable
┘

PublicSubnetB
┘


PrivateSubnetA
┐
├── PrivateRouteTable
┘

PrivateSubnetB
┘
```

---

# 12. Adding Internet Route

PublicRouteTable:

```text id="igw41"
10.0.0.0/16 → local

0.0.0.0/0 → DemoIGW
```

---

Now traffic flows:

```text id="igw42"
EC2 → Subnet → Route Table → IGW → Internet
```

---

# Success

Internet works.

---

# 13. Connectivity Test

EC2 Instance Connect:

Before:

```text id="igw43"
Connection Failed
```

---

After:

```text id="igw44"
Connection Successful
```

---

Test:

```bash
ping google.com
```

Result:

```text id="igw45"
Successful
```

---

# 14. Public Subnet Requirements

For Internet connectivity:

| Requirement | Needed |
|-------------|---------|
| Public IP | ✅ |
| Route to IGW | ✅ |
| IGW Attached | ✅ |

---

Missing any one:

```text id="igw46"
No Internet Access
```

---

# 15. Common AWS Exam Scenarios

### Scenario 1

EC2 has public IP.

Cannot access Internet.

---

Check:

```text id="igw47"
Route Table
```

---

### Scenario 2

EC2 has route:

```text id="igw48"
0.0.0.0/0 → IGW
```

but still fails.

---

Check:

```text id="igw49"
Internet Gateway attached?
```

---

### Scenario 3

IGW attached.

Route configured.

Still no Internet.

---

Check:

```text id="igw50"
Public IP assigned?
```

---

# 16. Public vs Private Summary

| Feature | Public | Private |
|----------|---------|----------|
| Route to IGW | ✅ | ❌ |
| Public IP | Usually | Usually No |
| Internet Access | ✅ | ❌ |
| RDS Placement | ❌ | ✅ |
| ALB Placement | ✅ | Sometimes |

---

# AWS SAA Exam Memory Anchors

### Internet Gateway

```text id="igw51"
Connects VPC to Internet
```

---

### Public Subnet

```text id="igw52"
0.0.0.0/0 → IGW
```

---

### Private Subnet

```text id="igw53"
No route to IGW
```

---

### Route Table

```text id="igw54"
Controls packet destination
```

---

### Public IP Alone

```text id="igw55"
Not sufficient
```

---

### Internet Access Formula

```text id="igw56"
Public IP + IGW + Route
```

---

# Final Memory Anchor

> An Internet Gateway provides Internet connectivity for a VPC, but only subnets whose route tables contain 0.0.0.0/0 pointing to the IGW become public. Public IPs alone do not guarantee Internet access.

---