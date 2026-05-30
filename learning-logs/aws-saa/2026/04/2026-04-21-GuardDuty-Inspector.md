# 2026-04-21 — Amazon GuardDuty & Amazon Inspector

# Core Mental Model

These two services solve different security problems.

```text id="sec1"
GuardDuty = Threat Detection

Inspector = Vulnerability Assessment
```

---

# Easy Exam Memory

Ask yourself:

```text id="sec2"
Am I looking for an active threat?

→ GuardDuty
```

or

```text id="sec3"
Am I looking for vulnerabilities?

→ Inspector
```

---

# PART 1 — Amazon GuardDuty

# 1. What is GuardDuty?

Amazon GuardDuty is AWS's managed threat detection service.

Uses:

* Machine Learning
* Anomaly Detection
* Threat Intelligence Feeds

to identify suspicious behavior.

---

# Core Purpose

```text id="sec4"
Detect attacks already happening or Detect signs of compromise
```

inside AWS environments.

---

# 2. Setup

Extremely simple:

```text id="sec6"
Enable GuardDuty → Start receiving findings
```

---

# Benefits

✅ one-click activation

✅ no agents required

✅ no infrastructure to manage

---

# 3. Main Data Sources

GuardDuty continuously analyzes:

| Source            | Required |
| ----------------- | -------- |
| VPC Flow Logs     | ✅        |
| CloudTrail Events | ✅        |
| DNS Logs          | ✅        |

---

# Exam Favorite Question

If you see:

```text id="sec7"
CloudTrail + VPC Flow Logs + DNS Logs
```

Think:

```text id="sec8"
GuardDuty
```

---

# 4. Optional Data Sources

Additional visibility:

| Source                  | Optional |
| ----------------------- | -------- |
| S3 Data Events          | ✅        |
| EBS Volumes             | ✅        |
| Lambda Network Activity | ✅        |
| RDS Login Activity      | ✅        |
| EKS Runtime Monitoring  | ✅        |

---

# 5. Threat Detection Examples

# Suspicious API Calls

Example:

```text id="sec9"
CreateAccessKey
DeleteTrail
```

from unusual locations.

---

# Example

Developer normally logs in from:

```text id="sec10"
Seoul
```

Suddenly:

```text id="sec11"
Russia
```

attempts IAM modifications.

---

# GuardDuty generates finding.

---

# 6. Suspicious Network Activity

Examples:

* known malicious IPs
* command-and-control traffic
* unusual port scanning

---

# Example

```text id="sec12"
EC2 instance → Unexpected outbound connections → GuardDuty finding
```

---

# 7. DNS Exfiltration Detection

Very popular exam scenario.

---

# Example

Compromised EC2 instance sends:

```text id="sec13"
encoded data
```

inside DNS requests.

---

# Why?

Attackers attempt stealth data exfiltration.

---

# GuardDuty can detect this behavior.

---

# 8. Cryptocurrency Mining Detection

Extremely common exam keyword.

---

# Example

Compromised EC2 instance starts:

```text id="sec14"
Bitcoin / Monero mining
```

---

# GuardDuty contains dedicated detections.

---

# Exam Shortcut

If question mentions:

```text id="sec15"
crypto mining
```

Think:

```text id="sec16"
GuardDuty
```

---

# 9. Automation Integration

GuardDuty findings flow into:

```text id="sec17"
EventBridge
```

---

# Common Workflow

```text id="sec18"
GuardDuty Finding → EventBridge → Lambda → Auto-remediation
```

---

# Example

Automatically isolate compromised EC2.

---

# 10. GuardDuty Summary

# Detects

✅ attacks

✅ suspicious behavior

✅ compromised resources

---

# Uses

✅ CloudTrail

✅ DNS logs

✅ VPC flow logs

---

# Does NOT perform

❌ vulnerability scanning

---

# PART 2 — Amazon Inspector

# 11. What is Inspector?

Amazon Inspector performs:

```text id="sec19"
Continuous Vulnerability Assessment
```

---

# Core Purpose

Find weaknesses BEFORE attackers exploit them.

---

# Think

```text id="sec20"
What could be hacked? rather than Am I currently under attack?
```

---

# 12. Inspector Coverage

Inspector evaluates only:

| Resource         | Supported |
| ---------------- | --------- |
| EC2              | ✅         |
| ECR Images       | ✅         |
| Lambda Functions | ✅         |

---

# Extremely Important Exam Fact

Only these three.

---

# 13. EC2 Vulnerability Scanning

Inspector scans:

* operating system packages
* known CVEs
* exposed ports
* network reachability

---

# Example

```text id="sec22"
OpenSSH vulnerability discovered
```

---

# Inspector identifies affected instances.

---

# 14. ECR Container Image Scanning

Triggered when image is pushed.

---

# Workflow

```text id="sec23"
Docker Image → Push to ECR → Inspector Scan → Vulnerability Report
```

---

# Common Findings

* vulnerable libraries
* outdated packages
* CVEs

---

# 15. Lambda Security Assessment

Inspector evaluates:

* package dependencies
* runtime vulnerabilities

---

# Example

```text id="sec24"
Known vulnerable Python package
```

inside Lambda deployment package.

---

# Inspector flags issue.

---

# 16. CVE Integration

Inspector continuously compares workloads against:

```text id="sec25"
CVE Database
```

---

# Important Benefit

When new CVEs appear:

Inspector automatically rescans.

---

# No manual action required.

---

# 17. Risk Scoring

Inspector assigns:

```text id="sec26"
severity scores
```

to findings.

---

# Helps prioritize:

* critical
* high
* medium
* low

vulnerabilities.

---

# 18. Security Hub Integration

Inspector findings feed into:

```text id="sec27"
AWS Security Hub
```

---

# Benefit

Centralized security dashboard.

---

# 19. EventBridge Integration

Inspector findings can trigger:

* Lambda
* SNS
* remediation workflows

---

# Example

```text id="sec28"
Critical CVE found → EventBridge → SNS → Security Team Alert
```

---

# 20. GuardDuty vs Inspector

| Feature                | GuardDuty | Inspector |
| ---------------------- | --------- | --------- |
| Threat Detection       | ✅         | ❌         |
| Vulnerability Scanning | ❌         | ✅         |
| Machine Learning       | ✅         | ❌         |
| CVE Assessment         | ❌         | ✅         |
| CloudTrail Analysis    | ✅         | ❌         |
| VPC Flow Log Analysis  | ✅         | ❌         |
| EC2 Assessment         | Limited   | ✅         |
| ECR Assessment         | ❌         | ✅         |
| Lambda Assessment      | ❌         | ✅         |

---

# 21. Common Exam Scenarios

### "Detect cryptocurrency mining"

✅ GuardDuty

---

### "Detect suspicious API calls"

✅ GuardDuty

---

### "Analyze VPC Flow Logs for threats"

✅ GuardDuty

---

### "Scan EC2 for vulnerabilities"

✅ Inspector

---

### "Scan ECR images"

✅ Inspector

---

### "Check Lambda dependencies for CVEs"

✅ Inspector

---

# 22. Security Workflow Example

```text id="sec29"
Inspector → Find vulnerability → Patch system → GuardDuty → Monitor for attacks
```

---

# Enterprise Security View

Inspector prevents attacks.

GuardDuty detects attacks.

---

# One-Line Final Memory Anchor

> GuardDuty detects threats and suspicious activity, while Inspector continuously scans EC2, ECR, and Lambda for vulnerabilities and CVEs.

---