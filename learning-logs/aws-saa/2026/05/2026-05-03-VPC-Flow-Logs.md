# 2026-05-03 — AWS VPC Flow Logs

# What Are VPC Flow Logs?

VPC Flow Logs capture network traffic metadata inside a VPC.

They record:

```text
Who talked to whom
Which ports were used
Whether traffic was accepted or rejected
```

---

Flow Logs do NOT capture:

```text
Packet contents
Payload data
HTTP requests
SQL queries
```

They only capture metadata.

Think:

```text
Network Traffic Metadata
```

not packet inspection.

---

# Why Use VPC Flow Logs?

Common use cases:

- Connectivity troubleshooting
- Security investigations
- Compliance auditing
- Detecting suspicious traffic
- Understanding network behavior

---

Example:

```text
EC2 cannot connect to RDS
```

Flow Logs can show:

```text
ACCEPT or REJECT
```

and identify where the failure occurs.

---

# Where Can Flow Logs Be Enabled?

Three scopes exist.

---

## 1. VPC Level

Captures traffic for:

```text
Entire VPC
```

Example:

```text
DemoVPC
```

Every subnet and ENI is monitored.

---

## 2. Subnet Level

Captures traffic only for:

```text
Selected Subnet
```

Example:

```text
PrivateSubnetA
```

---

## 3. ENI Level

Captures traffic only for:

```text
Specific Network Interface
```

Example:

```text
EC2 Instance
```

---

# Supported Destinations

Flow Logs can be sent to:

### CloudWatch Logs

```text
Real-time analysis
```

---

### Amazon S3

```text
Long-term storage
Athena analysis
```

---

### Kinesis Data Firehose

```text
Streaming analytics pipelines
```

---

# AWS Services Covered

Flow Logs also capture traffic involving AWS-managed interfaces.

Examples:

- Elastic Load Balancer
- RDS
- ElastiCache
- Redshift
- WorkSpaces
- NAT Gateway
- Transit Gateway

---

# Flow Log Record Format

Example:

```text
123456789012
eni-abc123
10.0.1.15
172.31.10.5
443
51824
20
1450
1714710000
1714710060
ACCEPT
OK
```

---

# Important Fields

## Account ID

```text
123456789012
```

Identifies AWS account.

---

## ENI ID

```text
eni-abc123
```

Identifies network interface.

---

## Source IP

```text
10.0.1.15
```

---

## Destination IP

```text
172.31.10.5
```

---

## Source Port

```text
51824
```

Usually ephemeral port.

---

## Destination Port

```text
443
```

HTTPS.

---

## Protocol

Common values:

```text
6 = TCP
17 = UDP
1 = ICMP
```

---

## Packets

Number of packets.

---

## Bytes

Amount of data transferred.

---

## Action

Most important field.

Values:

```text
ACCEPT
REJECT
```

---

## Log Status

Common values:

```text
OK
NODATA
SKIPDATA
```

---

# ACCEPT vs REJECT

Example:

```text
10.0.1.15 → 10.0.2.10 → 3306 → ACCEPT
```

Traffic allowed.

---

Example:

```text
10.0.1.15 → 10.0.2.10 → 3306 → REJECT
```

Traffic blocked.

---

# Security Group vs NACL Troubleshooting

Very common SAA exam topic.

---

# Security Groups

Characteristics:

```text
Stateful
Allow Only
```

---

If inbound traffic is allowed:

```text
Response traffic automatically allowed
```

---

# Network ACLs

Characteristics:

```text
Stateless
Allow + Deny
```

---

Inbound and outbound rules evaluated independently.

---

# Scenario 1

```text
Inbound REJECT
```

Possible causes:

```text
Security Group or NACL
```

Cannot know immediately.

---

# Scenario 2

```text
Inbound ACCEPT
Outbound REJECT
```

Must be:

```text
NACL
```

Because Security Groups are stateful.

---

# Scenario 3

```text
Outbound ACCEPT
Inbound REJECT
```

Again:

```text
NACL
```

because return traffic should have been automatically allowed by SG.

---

# Exam Memory Table

| Observation | Likely Cause |
|-------------|--------------|
| Inbound REJECT | SG or NACL |
| Outbound REJECT | SG or NACL |
| Inbound ACCEPT + Outbound REJECT | NACL |
| Outbound ACCEPT + Inbound REJECT | NACL |

---

# Example Troubleshooting

EC2:

```text
10.0.1.10
```

tries to connect to:

```text
RDS
10.0.2.20
Port 3306
```

---

Flow Log:

```text
10.0.1.10
10.0.2.20
3306
REJECT
```

---

Investigation:

1. Check Security Groups
2. Check NACLs
3. Check Route Tables

---

# Athena Queries

If logs are stored in S3:

```sql
SELECT *
FROM flow_logs
WHERE action='REJECT';
```

---

Top rejected IPs:

```sql
SELECT srcaddr,
       COUNT(*)
FROM flow_logs
WHERE action='REJECT'
GROUP BY srcaddr
ORDER BY COUNT(*) DESC;
```

---

# CloudWatch Logs Insights

Example:

Find rejected traffic.

```sql
fields srcAddr,dstAddr,dstPort
| filter action="REJECT"
| sort @timestamp desc
```

---

Top source IPs:

```sql
stats count(*) by srcAddr
| sort count desc
```

---

# Detecting Port Scans

Flow Logs help identify:

```text
One Source IP → Many Ports
```

Example:

```text
1.2.3.4 → 22
1.2.3.4 → 80
1.2.3.4 → 443
1.2.3.4 → 3389
1.2.3.4 → 1433
```

Potential:

```text
Port Scan
```

---

# CloudWatch Contributor Insights

Can automatically identify:

```text
Top Talkers
Top Source IPs
Top Destination Ports
```

Useful for large environments.

---

# Flow Logs + CloudWatch Alarms

Architecture:

```text
VPC Flow Logs → CloudWatch Logs → Metric Filter → CloudWatch Alarm → SNS
```

---

Example:

```text
Detect excessive SSH attempts
```

Port:

```text
22
```

Action:

```text
SNS Alert
```

---

# Required IAM Permissions

When publishing to CloudWatch Logs:

```text
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
```

---

Without these permissions:

```text
Flow Logs Fail
```

---

# Common Exam Scenarios

Question:

```text
Need network metadata.
Need source IP.
Need destination IP.
Need ACCEPT/REJECT information.
```

Answer:

```text
VPC Flow Logs
```

---

Question:

```text
Need packet payload.
Need HTTP request body.
```

Answer:

```text
NOT VPC Flow Logs
```

Use:

```text
Packet Capture Tools
Application Logs
```

---

Question:

```text
Find top IPs generating traffic.
```

Answer:

```text
VPC Flow Logs + Contributor Insights
```

---

Question:

```text
Query years of flow logs with SQL.
```

Answer:

```text
S3 + Athena
```

---

# AWS SAA Exam Memory Anchors

### VPC Flow Logs

```text
Network Metadata
```

---

### Captures

```text
IP
Ports
Protocol
ACCEPT/REJECT
Bytes
Packets
```

---

### Does NOT Capture

```text
Packet Contents
```

---

### Destinations

```text
CloudWatch Logs
S3
Kinesis Firehose
```

---

### Troubleshooting

```text
ACCEPT / REJECT
```

---

### Analytics

```text
Athena
CloudWatch Logs Insights
Contributor Insights
```

---

# Final Memory Anchor

> VPC Flow Logs capture network traffic metadata at the VPC, subnet, or ENI level. They record source/destination IPs, ports, protocols, bytes, packets, and ACCEPT/REJECT decisions, making them one of the primary tools for AWS network troubleshooting, security investigations, and traffic analysis.