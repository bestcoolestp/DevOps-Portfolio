# Pending Pod – Untolerated Taint

## Scenario

A pod remained in the `Pending` state because the target node had a taint that the pod did not tolerate.

---

## Environment

- Kubernetes v1.35
- Single-node control plane
- kubectl

---

## Symptoms

The pod never started.

```bash
kubectl get pod