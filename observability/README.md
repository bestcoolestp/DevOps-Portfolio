# Kubernetes Observability Case Study

Built an end-to-end observability workflow for a Kubernetes-hosted Node.js service, using Prometheus for metric collection, Grafana for visualization, and a live pod-failure drill to validate self-healing and service visibility.

## Overview

This project extends a simple Node.js application into an observable Kubernetes workload.

The goal was not just to deploy an app, but to make its behavior visible:
- traffic
- route-level request patterns
- latency
- pod availability
- pod-level memory usage
- request distribution across replicas

I deployed the app to a local `kind` cluster, exposed Prometheus metrics from the application itself, installed the monitoring stack with Helm, and visualized the resulting signals in Grafana.

I then simulated a pod failure to verify that:
- Kubernetes replaced the failed pod
- Prometheus continued scraping healthy targets
- Grafana reflected the temporary reduction in available pods

## Stack

- Windows 11
- Docker Desktop
- kind
- Kubernetes
- Node.js
- Prometheus
- Grafana
- Helm
- kube-prometheus-stack

## Project Structure

```text
observability/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── images/
│   ├── grafana-dashboard-overview-bottom.png
│   ├── grafana-dashboard-overview-top.png
│   ├── grafana-pod-availability-during-incident.png
│   ├── kubernetes-monitoring-stack-status.png
│   ├── prometheus-latency-or-memory-query.png
│   ├── prometheus-query-app-metrics.png
│   └── prometheus-target-health-sample-app.png
├── k8s/
│   ├── deployment.yaml
│   ├── namespace.yaml
│   ├── service.yaml
│   └── servicemonitor.yaml
└── README.md