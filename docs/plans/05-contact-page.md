# Contact Page Plan

## Objective
Create a contact page with a working contact form that sends emails via AWS SES.

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Contact   │────▶│    API      │────▶│   Lambda    │────▶│    SES      │
│    Form     │     │   Gateway   │     │  Function   │     │   (Email)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  DynamoDB   │
                                        │ (Optional)  │
                                        └─────────────┘
```

## Page Features

### Contact Form Fields
- Name (required)
- Email (required)
- Phone (optional)
- Service interested in (dropdown, optional)
- Message (required, textarea)
- Preferred contact method (email/phone)

### Additional Content
- Phone number with click-to-call
- Email address
- Business hours
- Service area
- Optional: Google Maps embed

## Technical Implementation

### Frontend

```
/src/app/contact/page.tsx           # Contact page
/src/components/forms/
  ContactForm.tsx                    # Form component
  FormField.tsx                      # Reusable form field
/src/lib/
  api.ts                             # API client
  validation.ts                      # Form validation
```

### Form Validation
- Client-side validation with native HTML5 + custom
- Server-side validation in Lambda
- Honeypot field for spam prevention
- Rate limiting

### API Route (Optional Proxy)
```
/src/app/api/contact/route.ts       # Next.js API route
```
Could proxy to API Gateway or call Lambda directly if deploying to a server.

## AWS Infrastructure

### API Gateway
- REST API or HTTP API
- CORS configuration for frontend domain
- Request validation
- Rate limiting (throttling)

### Lambda Function
- Runtime: Node.js 20.x
- Handler for form submission
- Validate input
- Send email via SES
- Optional: Store in DynamoDB
- Return success/error response

### SES (Simple Email Service)
- Verify sender email/domain
- Email template for notifications
- Consider both:
  - Notification to business owner
  - Confirmation to customer

### DynamoDB (Optional)
- Store contact submissions
- Enables viewing history
- Backup if email fails

## Terraform Resources

```hcl
# API Gateway
resource "aws_apigatewayv2_api" "contact" {
  name          = "b8s-contact-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["https://b8s.bates-solutions.com"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

# Lambda Function
resource "aws_lambda_function" "contact_handler" {
  function_name = "b8s-contact-handler"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  # ...
}

# SES
resource "aws_ses_domain_identity" "main" {
  domain = "bates-solutions.com"
}

# Optional: DynamoDB
resource "aws_dynamodb_table" "contact_submissions" {
  name         = "b8s-contact-submissions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  # ...
}
```

## Implementation Tasks

### Phase 1: Frontend
- [ ] Create contact page layout
- [ ] Build contact form component
- [ ] Add form validation
- [ ] Style form elements
- [ ] Add loading/success/error states

### Phase 2: AWS Infrastructure (Terraform)
- [ ] Create API Gateway
- [ ] Create Lambda function
- [ ] Set up SES domain verification
- [ ] Configure IAM roles and policies
- [ ] Add environment variables

### Phase 3: Lambda Function
- [ ] Create Lambda project structure
- [ ] Implement form validation
- [ ] Implement SES email sending
- [ ] Add error handling
- [ ] Write tests

### Phase 4: Integration
- [ ] Connect frontend to API
- [ ] Test end-to-end flow
- [ ] Add monitoring/alerts
- [ ] Deploy to production

## Email Templates

### Business Notification
```
Subject: New Contact Form Submission - {name}

New contact form submission:

Name: {name}
Email: {email}
Phone: {phone}
Service: {service}

Message:
{message}

---
Submitted: {timestamp}
```

### Customer Confirmation
```
Subject: Thanks for contacting Bates Groundworks

Hi {name},

Thank you for getting in touch! We've received your message and will get back to you within 24 hours.

If your enquiry is urgent, please call us on 07773 552028.

Best regards,
Bates Groundworks
```

## Security Considerations

- [ ] Input sanitization
- [ ] CAPTCHA or honeypot spam prevention
- [ ] Rate limiting (API Gateway throttling)
- [ ] CORS restricted to production domain
- [ ] Lambda in VPC (optional)
- [ ] No sensitive data in logs

## Monitoring

- [ ] CloudWatch Logs for Lambda
- [ ] API Gateway metrics
- [ ] SES sending metrics
- [ ] Error alerting via SNS

## Cost Estimates

- API Gateway: ~$3.50 per million requests
- Lambda: Free tier likely sufficient
- SES: $0.10 per 1,000 emails
- DynamoDB: Pay per request, minimal cost

Total estimated: < $5/month for low traffic
