FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Intall dependencies
RUN sudo apt-get update
RUN sudo apt-get install -y apt-transport-https ca-certificates gnupg curl
RUN sudo apt-get install -y gnupg software-properties-common
RUN sudo apt-get install -y openjdk-17-jdk

# Install Firebase CLI
RUN npm install -g firebase-tools

# Install gcloud CLI
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN sudo apt-get update && sudo apt-get install -y google-cloud-cli

# Install Terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
RUN gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
RUN sudo apt-get update && sudo apt-get install -y terraform
