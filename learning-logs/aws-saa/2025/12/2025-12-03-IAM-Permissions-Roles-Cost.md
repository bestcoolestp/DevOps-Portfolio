# 2025-11-28 ~ 2025-12-03 — IAM Permissions + Roles + Cost Guardrails (Budgets)

**Source:** Stephane Maarek — AWS SAA
**Theme:** IAM permission evaluation + least privilege + basic cost controls

---

## What I learned (wrap-up)

### 1) IAM permissions are **additive**
A user’s effective permissions are the **sum** of:
- policies attached **directly to the user**
- policies inherited from **groups**
- permissions granted through **roles they assume** (temporary)

✅ In the course example, the user “Stephane” ended up with **3 permission sources**:
- **AdministratorAccess** (via `admin` group)
- **AlexaForBusiness** (via `developers` group)
- **IAMReadOnlyAccess** (directly attached)

**Insight:** There is no “deny-by-removing one policy” unless that policy was the only thing granting the action.

---

### 2) Group membership changes apply immediately
When Stephane was removed from the `admin` group:
- trying to list users failed right away with **Access Denied**
- missing permission was **`iam:ListUsers`**

**Insight:** IAM is not “eventually consistent” in daily usage—permission changes can break workflows instantly, so group management must be done carefully.

---

### 3) Custom IAM policies are the real path to least privilege
I practiced creating a custom policy using the **Visual Editor**, choosing only required actions like:
- `iam:ListUsers`
- `iam:GetUser`

Then I verified the generated JSON, which looked like:

```json
{
  "Effect": "Allow",
  "Action": ["iam:ListUsers", "iam:GetUser"],
  "Resource": "*"
}
```
**Insight:** The console makes policy writing feel “easy,” but the important skill is reading the final JSON and 
confirming:
	- exact actions
	- exact resources
	- least privilege intent

---

### 4) IAM Users vs IAM Roles (the mental model I’m building)
IAM Users 👤
- represent people or applications that need direct access
- use long-term credentials (password / access keys)
- typical usage: developer console login or app using access keys

IAM Roles 🎭
- represent a temporary permission set
- have no permanent credentials
- issue temporary tokens when assumed

Example I keep in mind:
- EC2 needs to read S3 → attach a role allowing s3:GetObject
- EC2 uses the role securely without hardcoding credentials

**Insight:** Roles are the default “secure-by-design” path in AWS because they avoid static credentials.

---

### 5) Cost control habit (so I don’t learn AWS the expensive way)
AWS Budgets setup (practical checklist)
- enable IAM billing access (for visibility)
- monitor Free Tier dashboard
- set Budgets + Alerts early
- check Bills regularly for service-level breakdown

**Insight:** Cost visibility is part of architecture. A “working system” that surprises you with bills is still a broken system.

## My takeaway 
“Small permissions. Small blast radius.”
