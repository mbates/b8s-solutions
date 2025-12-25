# =============================================================================
# Lambda Function for Contact Form Handler
# =============================================================================

# IAM Role for Lambda
resource "aws_iam_role" "contact_lambda" {
  name = "${var.app_name}-contact-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy for Lambda - CloudWatch Logs
resource "aws_iam_role_policy_attachment" "contact_lambda_logs" {
  role       = aws_iam_role.contact_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# IAM Policy for Lambda - SES Send Email
resource "aws_iam_role_policy" "contact_lambda_ses" {
  name = "${var.app_name}-contact-lambda-ses"
  role = aws_iam_role.contact_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "ses:FromAddress" = var.sender_email
          }
        }
      }
    ]
  })
}

# Lambda Function
resource "aws_lambda_function" "contact_handler" {
  function_name = "${var.app_name}-contact-handler"
  description   = "Handles contact form submissions and sends emails via SES"

  runtime     = "nodejs20.x"
  handler     = "index.handler"
  timeout     = 10
  memory_size = 128

  role = aws_iam_role.contact_lambda.arn

  # The deployment package - initially use a placeholder
  # In CI/CD, this would be built and deployed separately
  filename         = "${path.module}/../lambda/contact-handler/function.zip"
  source_code_hash = fileexists("${path.module}/../lambda/contact-handler/function.zip") ? filebase64sha256("${path.module}/../lambda/contact-handler/function.zip") : null

  environment {
    variables = {
      RECIPIENT_EMAIL = var.contact_email
      SENDER_EMAIL    = var.sender_email
      ALLOWED_ORIGIN  = "https://${var.domain_name}"
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.contact_lambda_logs,
    aws_iam_role_policy.contact_lambda_ses,
  ]
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "contact_lambda" {
  name              = "/aws/lambda/${aws_lambda_function.contact_handler.function_name}"
  retention_in_days = 14
}
