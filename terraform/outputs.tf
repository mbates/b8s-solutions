output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for uploads"
  value       = aws_s3_bucket.website.id
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

# Lambda Outputs
output "contact_lambda_arn" {
  description = "Contact handler Lambda ARN"
  value       = aws_lambda_function.contact_handler.arn
}

output "contact_lambda_name" {
  description = "Contact handler Lambda function name"
  value       = aws_lambda_function.contact_handler.function_name
}

# CI/CD User Outputs
output "cicd_user_name" {
  description = "CI/CD IAM user name"
  value       = aws_iam_user.cicd.name
}

output "cicd_access_key_id" {
  description = "CI/CD IAM access key ID (add to GitHub Secrets)"
  value       = aws_iam_access_key.cicd.id
}

output "cicd_secret_access_key" {
  description = "CI/CD IAM secret access key (add to GitHub Secrets)"
  value       = aws_iam_access_key.cicd.secret
  sensitive   = true
}
