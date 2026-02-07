output "public_ip" {
  value = aws_instance.this.public_ip
}

output "ssh_user" {
  value = "ubuntu"
}

output "ssh_command" {
  value = "ssh -i ../ansible/keys/devops_portfolio ubuntu@${aws_instance.this.public_ip}"
}

output "http_url" {
  value = "http://${aws_instance.this.public_ip}/"
}
