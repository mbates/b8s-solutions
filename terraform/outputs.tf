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
