FROM jenkins/jenkins:lts-jdk17

USER root

# Base tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl gnupg lsb-release \
 && rm -rf /var/lib/apt/lists/*

# Docker CLI
RUN mkdir -p /etc/apt/keyrings \
 && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
 && echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list \
 && apt-get update && apt-get install -y --no-install-recommends docker-ce-cli \
 && rm -rf /var/lib/apt/lists/*

# kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
 && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl \
 && rm -f kubectl

# kind
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-amd64 \
 && chmod +x /usr/local/bin/kind

# Allow Jenkins user to use docker socket (group is typically root on Docker Desktop)
RUN usermod -aG root jenkins

USER jenkins
