# =============================================================================
# IAM User for CI/CD and Project Deployment
# =============================================================================
# This creates a dedicated IAM user with minimal permissions needed to:
# - Deploy static site to S3
# - Invalidate CloudFront cache
# - Update Lambda function code
# - Access CloudWatch logs

# IAM User for CI/CD deployments
resource "aws_iam_user" "cicd" {
  name = "robbie-cicd"
  path = "/system/"

  tags = {
    Description = "CI/CD user for ${var.app_name} deployments"
  }
}

# IAM Policy for S3 and CloudFront (static site deployment)
resource "aws_iam_user_policy" "cicd_deploy" {
  name = "robbie-deploy-policy"
  user = aws_iam_user.cicd.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3WebsiteBucket"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.website.arn,
          "${aws_s3_bucket.website.arn}/*"
        ]
      },
      {
        Sid    = "CloudFrontInvalidation"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations"
        ]
        Resource = aws_cloudfront_distribution.website.arn
      },
      {
        Sid    = "LambdaUpdateCode"
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction"
        ]
        Resource = aws_lambda_function.contact_handler.arn
      }
    ]
  })
}

# Access key for CI/CD (store in GitHub Secrets)
resource "aws_iam_access_key" "cicd" {
  user = aws_iam_user.cicd.name
}
