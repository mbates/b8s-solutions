variable "aws_region" {
  description = "AWS region for S3 bucket"
  type        = string
  default     = "eu-west-2"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "b8s-solutions"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "b8s.bates-solutions.com"
}

variable "hosted_zone_name" {
  description = "Route53 hosted zone name (parent domain)"
  type        = string
  default     = "bates-solutions.com"
}

variable "contact_email" {
  description = "Email address to receive contact form submissions"
  type        = string
  default     = "b8ssolutions@gmail.com"
}

variable "sender_email" {
  description = "Email address to send contact form notifications from"
  type        = string
  default     = "noreply@bates-solutions.com"
}
