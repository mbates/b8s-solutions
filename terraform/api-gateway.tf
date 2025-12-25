# =============================================================================
# API Gateway for Contact Form Handler
# =============================================================================
# HTTP API (v2) for the contact form Lambda function
# Provides CORS-enabled REST endpoint for frontend integration

# HTTP API
resource "aws_apigatewayv2_api" "contact" {
  name          = "${var.app_name}-contact-api"
  protocol_type = "HTTP"
  description   = "API Gateway for contact form submissions"

  cors_configuration {
    allow_origins = [
      "https://${var.domain_name}",
      "http://localhost:3000" # For local development
    ]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
    max_age       = 300
  }

  tags = {
    Name        = "${var.app_name}-contact-api"
    Environment = var.environment
  }
}

# Lambda Integration
resource "aws_apigatewayv2_integration" "contact_lambda" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_handler.invoke_arn
  payload_format_version = "2.0"
}

# POST /contact Route
resource "aws_apigatewayv2_route" "contact_post" {
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact_lambda.id}"
}

# Default Stage with Auto-Deploy
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  # Throttling to prevent abuse
  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 5
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      ip               = "$context.identity.sourceIp"
      requestTime      = "$context.requestTime"
      httpMethod       = "$context.httpMethod"
      routeKey         = "$context.routeKey"
      status           = "$context.status"
      protocol         = "$context.protocol"
      responseLength   = "$context.responseLength"
      integrationError = "$context.integrationErrorMessage"
    })
  }

  tags = {
    Name        = "${var.app_name}-contact-api-stage"
    Environment = var.environment
  }
}

# Lambda Permission for API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*"
}

# CloudWatch Log Group for API Gateway
resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = "/aws/apigateway/${var.app_name}-contact-api"
  retention_in_days = 14

  tags = {
    Name        = "${var.app_name}-api-gateway-logs"
    Environment = var.environment
  }
}
