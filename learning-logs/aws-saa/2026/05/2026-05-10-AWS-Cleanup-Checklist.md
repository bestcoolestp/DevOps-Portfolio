# 2026-05-10 — AWS Cleanup Checklist

# Why Is Cleanup Important?

AWS is:

```text
Pay-as-you-go
```

---

Resources continue charging if you forget to remove them.

Some services charge even when:

```text
Nothing is running.
```

Examples:

```text
NAT Gateway, Elastic IP, VPC Endpoints
```

---

# Cleanup Priority

Always delete resources in this order:

```text
1. EC2 Instances

2. NAT Gateways

3. Elastic IPs

4. VPC Endpoints

5. Peering Connections

6. Route Tables

7. Internet Gateways

8. EOIGWs

9. Subnets

10. VPC
```

---

# Step 1: EC2 Instances

Go to:

```text
EC2 Console → Instances
```

---

Options:

```text
Stop
```

or

```text
Terminate
```

---

Stop if:

```text
You'll reuse them later.
```

---

Terminate if:

```text
You're finished.
```

---

Remember:

```text
Stopped instances
```

still incur charges for:

```text
EBS Volumes
```

---

# Step 2: Delete NAT Gateway

Go to:

```text
VPC → NAT Gateways
```

---

Select:

```text
DemoNATGW
```

↓

```text
Delete
```

---

Wait until:

```text
Deleted
```

---

# Step 3: Release Elastic IP

Very important.

Deleting NAT Gateway ≠ Deleting Elastic IP

---

Go to:

```text
EC2 → Elastic IPs
```

---

Select:

```text
Release Elastic IP
```

---

Otherwise:

```text
Charges continue.
```

---

# Step 4: Delete VPC Endpoints

Go to:

```text
VPC → Endpoints
```

---

Delete:

```text
Gateway Endpoints

Interface Endpoints
```

---

Reason:

```text
Interface Endpoints

charge per hour.
```

---

# Step 5: Delete VPC Peering

Go to:

```text
VPC → Peering Connections
```

---

Delete:

```text
All Peering Connections
```

---

# Step 6: Delete Route Tables

Go to:

```text
VPC → Route Tables
```

---

Delete:

```text
PublicRouteTable

PrivateRouteTable
```

---

Cannot delete:

```text
Main Route Table
```

until VPC is deleted.

---

# Step 7: Detach Internet Gateway

Go to:

```text
VPC → Internet Gateway
```

---

Actions:

```text
Detach
```

↓

```text
Delete
```

---

Order matters.

---

Wrong:

```text
Delete
```

---

Correct:

```text
Detach → Delete
```

---

# Step 8: Delete EOIGW

Go to:

```text
VPC → Egress-only Internet Gateways
```

---

Actions:

```text
Detach → Delete
```

---

# Step 9: Delete Subnets

Go to:

```text
VPC → Subnets
```

---

Delete:

```text
PublicSubnetA

PublicSubnetB

PrivateSubnetA

PrivateSubnetB
```

---

Cannot delete if:

```text
Resources still exist.
```

Examples:

```text
EC2

NAT Gateway

Endpoints
```

---

# Step 10: Delete VPC

Go to:

```text
VPC → Your VPCs
```

---

Delete:

```text
DemoVPC
```

---

AWS automatically deletes:

```text
Default NACL

Main Route Table
```

---

# Resources That Commonly Generate Surprise Charges

## NAT Gateway

```text
≈ $0.045/hour
```

plus

```text
Data processing fees
```

---

## Elastic IP

Free only when:

```text
Attached to a running instance.
```

---

Otherwise:

```text
Charges apply.
```

---

## Interface Endpoints

```text
Hourly charge
```

plus

```text
Data processing charge
```

---

## EBS Volumes

Stopped EC2:

```text
Still charged.
```

---

## Snapshots

Stored in S3 internally.

```text
Still charged.
```

---

# Resources That Do NOT Cost Money

Generally free:

```text
Route Tables

Network ACLs

Security Groups

Internet Gateway

EOIGW
```

---

But they must still be cleaned up.

---

# AWS Billing Dashboard

Go to:

```text
Billing → Cost Explorer
```

or

```text
Billing → Bills
```

---

Example:

```text
EC2

$1.25
```

---

```text
NAT Gateway

$1.25
```

---

```text
Data Transfer

$0.70
```

---

# Cost Prevention Checklist

Before logging out of AWS:

```text
☐ EC2 terminated

☐ NAT Gateway deleted

☐ Elastic IP released

☐ VPC Endpoints deleted

☐ Peering deleted

☐ EOIGW deleted

☐ Internet Gateway detached

☐ Subnets deleted

☐ VPC deleted

☐ Billing checked
```

---

# Architecture Before Cleanup

```text
Internet
     │
CloudFront
     │
Internet Gateway
     │
Public Subnets
     │
NAT Gateway
     │
Private Subnets
     │
EC2
```

---

# Architecture After Cleanup

```text
AWS Account → No billable resources
```

---

# SAA Exam Traps

### Trap 1

Question:

```text
Unexpected charges continue
after deleting NAT Gateway.
```

Answer:

```text
Elastic IP was not released.
```

---

### Trap 2

Question:

```text
Cheapest way to connect
to S3 privately?
```

Answer:

```text
Gateway Endpoint
```

---

### Trap 3

Question:

```text
Resource incurring hourly VPC charges?
```

Answer:

```text
NAT Gateway

Interface Endpoint
```

---

### Trap 4

Question:

```text
Delete Internet Gateway from a VPC.
```

Correct order:

```text
Detach → Delete
```

---

# Memory Anchors

```text
NAT Gateway = Delete
```

+

```text
Release Elastic IP
```

---

```text
Stopped EC2 ≠ Free
```

---

```text
Interface Endpoint = Hourly Charge
```

---

```text
Detach IGW → Delete IGW
```

---

# Final Memory Anchor

> Before ending an AWS lab, always terminate EC2 instances, delete NAT Gateways, release Elastic IPs, remove VPC Endpoints, detach Internet Gateways, and finally delete subnets and the VPC itself. The most common surprise charges come from NAT Gateways, Elastic IPs, Interface Endpoints, and forgotten EBS volumes.