# 2025-12-30 ~ 2025-12-31 — AWS Auto Scaling Groups (ASG)

**Source:** Stephane Maarek — AWS SAA  
**Theme:** automatic capacity management and cost-efficient scaling

> “Good systems grow when needed — and shrink when they don’t.”

---

## What I learned (wrap-up)

## 1) Purpose of Auto Scaling Groups
An **Auto Scaling Group (ASG)** automatically adjusts the number of EC2 instances based on demand.

- **Scale out** → add instances when load increases  
- **Scale in** → remove instances when load decreases  
- keeps applications responsive while optimizing cost

**Important:**  
ASG itself is free — you only pay for EC2, storage, and networking.

---

## 2) Core ASG concepts

### Capacity settings
- **Minimum** → lowest allowed instance count
- **Desired** → target number of instances
- **Maximum** → upper limit

ASG continuously works to keep the **desired capacity** satisfied.

---

### Health management
- ASG monitors instance health
- unhealthy instances are **terminated and replaced automatically**
- integrates with load balancer health checks

**Insight:**  
ASG treats instances as disposable, not precious.

---

## 3) Integration with Load Balancers
- ASG can register instances with **ELB / ALB**
- load balancer distributes traffic across healthy instances
- unhealthy targets are removed automatically
- newly launched instances are added seamlessly

**Result:**  
scaling and traffic distribution work together without manual intervention.

---

## 4) Launch Templates (how instances are created)
ASGs use **Launch Templates** (launch configurations are deprecated).

Templates define:
- AMI
- instance type
- user data scripts
- EBS volumes
- security groups
- IAM role
- networking (VPC, subnets)
- load balancer configuration

**Insight:**  
A good launch template directly affects how fast scaling reacts.

---

## 5) Scaling policies

### Dynamic scaling
- **Target tracking**
  - set a target metric (e.g., CPU at 40%)
  - ASG automatically adjusts capacity to stay near the target
- **Simple / Step scaling**
  - triggered by CloudWatch alarms
  - scale by fixed steps

---

### Scheduled scaling
- scale based on known time patterns
- example: increase capacity every Friday evening

---

### Predictive scaling
- forecasts future demand from historical data
- schedules scaling actions ahead of time
- useful for recurring workloads

---

## 6) Metrics commonly used
- **CPU Utilization** → general-purpose workloads
- **RequestCountPerTarget** → ALB-based applications
- **Network In / Out** → network-heavy workloads
- **Custom metrics** → app-specific scaling logic

---

## 7) Cooldown period
- cooldown prevents rapid, repeated scaling
- default: **300 seconds**
- allows metrics to stabilize and instances to become effective

**Logic:**
- cooldown active → ignore scaling triggers
- cooldown expired → allow scaling

---

## Best practices I noted
- use **pre-baked AMIs** for faster instance readiness
- reduce cooldown if instances start quickly
- enable **detailed monitoring (1-minute metrics)** for faster scaling response

---

## My takeaway

Auto Scaling Groups turn EC2 instances into **replaceable capacity units**.  
Good scaling comes from combining the right metrics, cooldowns, and launch templates — not from manual control.
