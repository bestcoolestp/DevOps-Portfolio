# Topology Spread Constraints

## Scenario

An Nginx Deployment had **2 replicas**, but both Pods were scheduled on the same node.

First, I checked the cluster nodes and current Pod placement.

```bash
kubectl get node -o wide
kubectl get pod -o wide
kubectl get deploy -o wide
```

![Pods scheduled on the same node](./images/01-before-pods-same-node.png)

The cluster had two available nodes:

```text
controlplane
node01
```

However, both Nginx Pods were running on `controlplane`.

```text
nginx-7899d8bdcb-cgrm2   controlplane
nginx-7899d8bdcb-mqpsg   controlplane
```

So although the Deployment had two replicas, the replicas were **not distributed across the available nodes**.

---

## Root Cause

The Deployment had no scheduling rule requiring Kubernetes to spread the Nginx Pods across nodes.

Having multiple replicas does not automatically guarantee that each replica will run on a different node.

The scheduler was therefore allowed to place both Pods on `controlplane`.

---

## Fix

I edited the Deployment:

```bash
kubectl edit deploy nginx
```

Then added a `topologySpreadConstraints` rule to the Pod template:

```yaml
topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: "kubernetes.io/hostname"
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: nginx
```

![Topology Spread Constraints configuration](./images/02-topology-spread-config.png)

The important configuration is:

```yaml
topologyKey: "kubernetes.io/hostname"
```

This tells Kubernetes to use individual nodes as topology domains.

The selector:

```yaml
labelSelector:
  matchLabels:
    app: nginx
```

matches the Nginx Pods controlled by the Deployment.

And:

```yaml
maxSkew: 1
whenUnsatisfiable: DoNotSchedule
```

prevents the scheduler from creating an excessive imbalance between eligible nodes.

---

## Recreate the Pods

After updating the Deployment, I deleted the existing Nginx Pods:

```bash
kubectl delete pod -l app=nginx
```

The Deployment controller automatically created replacement Pods.

I then checked their placement:

```bash
kubectl get pod -o wide
```

![Pods distributed across controlplane and node01](./images/03-after-pods-spread.png)

The result showed:

```text
NAME                     READY   STATUS    NODE
nginx-68dd8d7799-tzz4v   1/1     Running   node01
nginx-68dd8d7799-wchnj   1/1     Running   controlplane
```

The two replicas were now running on different nodes.

---

## Before vs After

### Before

```text
controlplane
├── nginx Pod
└── nginx Pod

node01
└── no nginx Pod
```

### After

```text
controlplane
└── nginx Pod

node01
└── nginx Pod
```

---

## Verification

```bash
kubectl get node -o wide
kubectl get pod -o wide
kubectl get deploy -o wide
```

Final state:

```text
nginx Deployment
Replicas: 2/2

controlplane -> nginx Pod
node01       -> nginx Pod
```

Both replicas were `Running` and distributed across the two nodes.

---

## Key Lesson

**Deployment replicas provide redundancy at the Pod level, but they do not by themselves guarantee redundancy at the node level.**

`topologySpreadConstraints` can instruct the Kubernetes scheduler to distribute matching Pods across topology domains.

For node-level distribution:

```yaml
topologyKey: kubernetes.io/hostname
```

This is useful when multiple replicas should not all depend on the same node.

---

## Troubleshooting Flow

```text
2 replicas configured
        ↓
kubectl get pod -o wide
        ↓
Both Pods on controlplane
        ↓
Check Deployment scheduling configuration
        ↓
No topology spread constraint
        ↓
Add topologySpreadConstraints
        ↓
Delete existing Pods
        ↓
Deployment recreates Pods
        ↓
kubectl get pod -o wide
        ↓
controlplane → nginx Pod
node01       → nginx Pod
        ↓
Resolved
```

## Result

✅ Identified that both Deployment replicas were concentrated on one node.

✅ Added `topologySpreadConstraints` using `kubernetes.io/hostname`.

✅ Recreated the Pods.

✅ Verified that Kubernetes distributed the replicas across `controlplane` and `node01`.