variable "aws_region" {
  type    = string
  default = "ap-northeast-2"
}

variable "project_name" {
  type    = string
  default = "devops-portfolio-ec2"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "my_ip_cidr" {
  type        = string
  description = "Your public IP in CIDR form, e.g. 1.2.3.4/32"
}

variable "allowed_http_cidr" {
  type        = string
  description = "CIDR allowed to access HTTP (80). Use 0.0.0.0/0 for demo."
  default     = "0.0.0.0/0"
}

variable "ssh_public_key_path" {
  type    = string
  default = "../ansible/keys/devops_portfolio.pub"
}
