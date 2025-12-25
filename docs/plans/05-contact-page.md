# 🚧 Contact Page Plan

**Status: IN PROGRESS**

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

---

## PR Breakdown

### PR 1: Contact Page Frontend (Static)
**Branch:** `feature/contact-page`
**Files:**
- `src/app/contact/page.tsx` - Contact page with form UI
- `src/lib/constants.ts` - Add contact page content

**Scope:**
- Contact page layout with hero
- Static contact form (no submission yet)
- Contact info sidebar (phone, email, hours)
- Service area info
- Form validation (client-side)
- Loading/success/error states (mocked)
- Responsive design

---

### PR 2: SES Domain Verification (Terraform)
**Branch:** `feature/contact-ses`
**Files:**
- `terraform/ses.tf` - SES domain identity and verification

**Scope:**
- SES domain identity for bates-solutions.com
- DNS verification records in Route53
- Email identity for sending
- Note: May need manual verification step

---

### PR 3: Lambda Function + IAM (Terraform + Code)
**Branch:** `feature/contact-lambda`
**Files:**
- `terraform/lambda.tf` - Lambda function and IAM role
- `terraform/variables.tf` - New variables
- `lambda/contact-handler/` - Lambda source code
  - `index.ts` - Handler
  - `package.json` - Dependencies
  - `tsconfig.json` - TypeScript config

**Scope:**
- Lambda function (Node.js 20.x)
- IAM role with SES send permissions
- Environment variables (recipient email)
- Input validation
- SES email sending
- Error handling

---

### PR 4: API Gateway (Terraform)
**Branch:** `feature/contact-api`
**Files:**
- `terraform/api-gateway.tf` - HTTP API configuration
- `terraform/outputs.tf` - API endpoint output

**Scope:**
- HTTP API with CORS
- Lambda integration
- POST /contact route
- Rate limiting (throttling)
- Stage deployment

---

### PR 5: Frontend Integration
**Branch:** `feature/contact-integration`
**Files:**
- `src/app/contact/page.tsx` - Connect to real API
- `src/lib/api.ts` - API client
- `.env.example` - API endpoint variable

**Scope:**
- Connect form to API Gateway
- Real submission handling
- Error handling
- Success feedback

---

### PR 6: DynamoDB Storage (Optional, Future)
**Branch:** `feature/contact-dynamodb`
**Files:**
- `terraform/dynamodb.tf` - Table for submissions
- Lambda updates for storage

**Scope:**
- Store submissions as backup
- View submission history
- Analytics potential

---

## Current Progress

### Completed
- [x] PR 1: Contact page frontend (PR #19)

### In Progress
- [ ] Waiting for PR 1 review

### Pending
- [ ] PR 2: SES setup
- [ ] PR 3: Lambda function
- [ ] PR 4: API Gateway
- [ ] PR 5: Integration
- [ ] PR 6: DynamoDB (optional)

---

## Contact Form Fields
- Name (required)
- Email (required)
- Phone (optional)
- Service interested in (dropdown, optional)
- Message (required, textarea)
- Honeypot field (hidden, spam prevention)

## Contact Info Sidebar
- Phone: 07773 552028 (click-to-call)
- Email: b8ssolutions@gmail.com
- Business hours
- Service areas

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

### Customer Confirmation (Future)
```
Subject: Thanks for contacting Bates Groundworks

Hi {name},

Thank you for getting in touch! We've received your message and will get back to you within 24 hours.

If your enquiry is urgent, please call us on 07773 552028.

Best regards,
Bates Groundworks
```

## Security
- Input sanitization in Lambda
- Honeypot field for spam prevention
- API Gateway rate limiting
- CORS restricted to production domain

## Cost Estimates
- API Gateway: ~$3.50 per million requests
- Lambda: Free tier likely sufficient
- SES: $0.10 per 1,000 emails
- DynamoDB: Pay per request, minimal cost

Total estimated: < $5/month for low traffic
