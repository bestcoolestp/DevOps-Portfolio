# Jenkins → kind → Kubernetes CI/CD (Local Case Study)

This project demonstrates a minimal but complete CI/CD loop:

1. Build a container image  
2. Load it into a local Kubernetes cluster (kind)  
3. Deploy Kubernetes manifests  
4. Verify with an automated smoke test  

**Why it matters:** it shows reproducible delivery + operational validation, not just “it works on my machine”.

---

## ⚙️ Architecture

GitHub push  
→ Jenkins Pipeline pulls repo  
→ `docker build`  
→ `kind load docker-image`  
→ `kubectl apply` + `rollout status`  
→ port-forward smoke test (`curl /health`)

---

## 🧩 Pipeline Stages

- **Info**: verifies toolchain + cluster connectivity  
- **Build Docker Image**: builds `k8s-sample-app:1.0`  
- **Load Image into kind**: loads image into the kind node  
- **Deploy to Kubernetes**: applies namespace/deployment/service + waits for rollout  
- **Smoke Test**: port-forward + HTTP 200 check  

---

## ✅ Proof

![Green Jenkins pipeline](./images/pipeline-green.png)

---

## 📂 Repo Layout

- `Jenkinsfile` — pipeline definition  
- `docker-compose.yml` — reproducible local Jenkins runtime  
- `Dockerfile` — Jenkins image with docker/kubectl/kind installed  

---

## 🚀 How to Run (Windows + Docker Desktop)

### Prerequisites
- Windows 11  
- Docker Desktop  
- kind cluster already created (`devops-portfolio`)  
- `kubectl` working on the host  

Example check:
```bash
kubectl get nodes
```

### 1) Start Jenkins (local)
```bash
cd ci-cd/jenkins-kind-cicd
docker compose up -d --build
```
Jenkins UI: [http://localhost:8081](http://localhost:8081)

### 2) Provide kubeconfig to Jenkins
Copy kubeconfig into Jenkins:
```bash
docker cp %USERPROFILE%\.kube\config-jenkins-insecure jenkins:/var/jenkins_home/kubeconfig
```

Verify connectivity:
```bash
docker exec -it jenkins bash -lc "KUBECONFIG=/var/jenkins_home/kubeconfig kubectl get nodes"
```
Expected: `devops-portfolio-control-plane` in Ready state.

### 3) Create Jenkins Pipeline Job
- New Item → Name: `jenkins-kind-cicd` → Type: Pipeline  
- Pipeline script from SCM → Git → Repo URL: `https://github.com/bestcoolestp/DevOps-Portfolio.git`  
- Branch: `*/main`  
- Script Path: `ci-cd/jenkins-kind-cicd/Jenkinsfile`  
- Save → Build Now  

### 4) What the Pipeline Deploys
Deploys sample app from:
- `k8s-projects/sample-app-deploy/app`  
- `k8s-projects/sample-app-deploy/k8s`  

Check resources:
```bash
kubectl get pods -n sample-app
kubectl get svc -n sample-app
```

### 5) Smoke Test Logic
```bash
kubectl port-forward svc/sample-app -n sample-app 8080:80
curl -sSf http://localhost:8080/health
```
Confirms:
- Deployment rolled out successfully  
- Service routing is correct  
- App responds with HTTP 200  

---

## 🛠️ Problem Solving Notes

This project wasn’t “copy/paste success” — I debugged real integration issues between Windows + Docker Desktop + Jenkins container + kind Kubernetes.

1. **Docker not found in Jenkins**  
   - Root cause: Jenkins container had Docker socket mounted but no CLI.  
   - Fix: Custom Jenkins image with Docker CLI, kubectl, kind, curl.

2. **Kubernetes API connection refused**  
   - Root cause: `127.0.0.1` inside container pointed to itself.  
   - Fix: Updated kubeconfig to use `host.docker.internal:<port>`.

3. **TLS certificate mismatch (x509 error)**  
   - Root cause: kind API server cert SAN didn’t include `host.docker.internal`.  
   - Fix (local demo only): `insecure-skip-tls-verify: true`.

4. **Smoke test failed (HTTP 403)**  
   - Root cause: wrong endpoint.  
   - Fix: Updated smoke test to hit `/health`.

---

## 🔒 Security Note (Local Only)

For this demo, kubeconfig uses `insecure-skip-tls-verify: true` so Jenkins can reach the kind API server.  

**In production, use:**
- Service accounts + RBAC  
- Proper CA/TLS verification  
- Least privilege credentials per namespace  
- Centralized secrets management  
```

---

This version is **structured, scannable, and professional**. It keeps all your troubleshooting notes (which are super valuable for others) but organizes them into clear sections.  

Would you like me to also create a **short summary version** (like an “executive README”) for the `ci-cd/README.md` index so readers don’t have to scroll through all the details unless they dive into this subfolder?
