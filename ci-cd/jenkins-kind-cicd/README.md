# Jenkins → kind → Kubernetes CI/CD (Local Case Study)

This project demonstrates a minimal but complete CI/CD loop:

1) build a container image
2) load it into a local Kubernetes cluster (kind)
3) deploy Kubernetes manifests
4) verify with an automated smoke test

**Why it matters:** it shows reproducible delivery + operational validation, not “it works on my machine”.

---

## Architecture

GitHub push  
→ Jenkins Pipeline pulls repo  
→ `docker build`  
→ `kind load docker-image`  
→ `kubectl apply` + `rollout status`  
→ port-forward smoke test (`curl /health`)

---

## Pipeline stages

- **Info**: verifies toolchain + cluster connectivity
- **Build Docker Image**: builds `k8s-sample-app:1.0`
- **Load Image into kind**: loads image into the kind node
- **Deploy to Kubernetes**: applies namespace/deployment/service + waits for rollout
- **Smoke Test**: port-forward + HTTP 200 check

---

## Proof

![Green Jenkins pipeline](./images/pipeline-green.png)

---

## Repo layout

- `Jenkinsfile` — pipeline definition
- `docker-compose.yml` — reproducible local Jenkins runtime
- `Dockerfile` — Jenkins image with docker/kubectl/kind installed

---

## How to run (Windows + Docker Desktop)

### 1) Start Jenkins

```bash
cd ci-cd/jenkins-kind-cicd
docker compose up -d --build
