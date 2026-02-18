2026-01-11 — Creating Records in Route 53  
Source: Stephane Maarek — AWS SAA  
Theme: basic DNS record creation and verification

“DNS answers the question ‘where,’ not ‘what is running there.’”

---

## 🗂 Accessing the Hosted Zone

- Open Route 53 → Hosted Zones  
- Select your domain  
- Click **Create record**

This is where DNS mappings are defined.

---

## 📝 Record Setup (A Record)

**Example configuration**

- Record name: `test.stephanetheteacher.com`  
- Record type: **A** (IPv4 mapping)  
- Value: `11.22.33.44` (placeholder IP)  
- TTL: `300 seconds` (default)  
- Routing policy: **Simple**

✅ Record creation succeeds immediately.

---

## 🌐 Expected Behavior

When DNS is queried:
test.stephanetheteacher.com → 11.22.33.44

Important distinction:

- DNS resolution **will work**
- Browser access **will fail** (no server at that IP)

👉 DNS only provides the address.  
It does **not** guarantee a running service.

---

## 💻 Command-Line Verification

### Using CloudShell (Linux)

Install tools:

```bash
sudo yum install -y bind-utils
````

Provides:

* `nslookup`
* `dig`

---

### nslookup (Windows/Linux)

```bash
nslookup test.stephanetheteacher.com
```

**What to check**

* Returned IP = `11.22.33.44`

---

### dig (Mac/Linux)

```bash
dig test.stephanetheteacher.com
```

**Key sections**

* ANSWER → confirms A record
* TTL → caching duration
* Record type → A

---

## ✅ Exam Signals

Think Route 53 record creation when you see:

* hostname must resolve to IP
* need to verify with dig/nslookup
* DNS works but website unreachable

---

## 🧠 My Takeaway

Creating a Route 53 record is straightforward, but the key mental model is:

* DNS = name → IP mapping
* DNS ≠ application availability

Verification with `nslookup` and `dig` confirms resolution independently of browser behavior.

In real architectures, these records typically point to:

* EC2 public IPs
* Load balancers
* CloudFront distributions