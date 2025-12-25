import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// Environment variables
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || ''
const SENDER_EMAIL = process.env.SENDER_EMAIL || ''
const AWS_REGION = process.env.AWS_REGION || 'eu-west-2'

// Initialize SES client
const sesClient = new SESClient({ region: AWS_REGION })

// Types
interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  honeypot?: string
}

interface ValidationError {
  field: string
  message: string
}

// CORS headers for API Gateway
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Response helpers
function successResponse(body: object): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(body),
  }
}

function errorResponse(statusCode: number, message: string, errors?: ValidationError[]): APIGatewayProxyResult {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify({ error: message, errors }),
  }
}

// Validation
function validateFormData(data: unknown): { valid: true; data: ContactFormData } | { valid: false; errors: ValidationError[] } {
  const errors: ValidationError[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: [{ field: 'body', message: 'Invalid request body' }] }
  }

  const formData = data as Record<string, unknown>

  // Check honeypot (spam prevention)
  if (formData.honeypot && typeof formData.honeypot === 'string' && formData.honeypot.trim() !== '') {
    // Silently reject spam - return success to not tip off bots
    return { valid: true, data: { name: '', email: '', message: '', honeypot: formData.honeypot as string } }
  }

  // Required fields
  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' })
  }

  if (!formData.email || typeof formData.email !== 'string' || formData.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim() === '') {
    errors.push({ field: 'message', message: 'Message is required' })
  } else if (formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    data: {
      name: (formData.name as string).trim(),
      email: (formData.email as string).trim().toLowerCase(),
      phone: formData.phone ? (formData.phone as string).trim() : undefined,
      service: formData.service ? (formData.service as string).trim() : undefined,
      message: (formData.message as string).trim(),
    },
  }
}

// Sanitize input to prevent injection
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// Build email content
function buildEmailContent(data: ContactFormData): { subject: string; textBody: string; htmlBody: string } {
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  const subject = `New Contact Form Submission - ${sanitize(data.name)}`

  const textBody = `
New contact form submission:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${data.service || 'Not specified'}

Message:
${data.message}

---
Submitted: ${timestamp}
`.trim()

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1e3a5f; }
    .message { background-color: white; padding: 15px; border-left: 4px solid #e07c3e; margin-top: 10px; }
    .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${sanitize(data.name)}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${sanitize(data.email)}">${sanitize(data.email)}</a>
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${data.phone ? `<a href="tel:${sanitize(data.phone)}">${sanitize(data.phone)}</a>` : 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Service Interested In:</span> ${data.service ? sanitize(data.service) : 'Not specified'}
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message">${sanitize(data.message).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Submitted: ${timestamp}
    </div>
  </div>
</body>
</html>
`.trim()

  return { subject, textBody, htmlBody }
}

// Send email via SES
async function sendEmail(data: ContactFormData): Promise<void> {
  const { subject, textBody, htmlBody } = buildEmailContent(data)

  const command = new SendEmailCommand({
    Source: SENDER_EMAIL,
    Destination: {
      ToAddresses: [RECIPIENT_EMAIL],
    },
    ReplyToAddresses: [data.email],
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
      },
    },
  })

  await sesClient.send(command)
}

// Main handler
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('Contact form submission received')

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return successResponse({})
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return errorResponse(405, 'Method not allowed')
  }

  // Parse body
  let body: unknown
  try {
    body = event.body ? JSON.parse(event.body) : null
  } catch {
    return errorResponse(400, 'Invalid JSON in request body')
  }

  // Validate
  const validation = validateFormData(body)
  if (!validation.valid) {
    return errorResponse(400, 'Validation failed', validation.errors)
  }

  // Check for honeypot (spam)
  if (validation.data.honeypot) {
    console.log('Honeypot triggered - spam detected')
    // Return success to not tip off bots
    return successResponse({ message: 'Message sent successfully' })
  }

  // Send email
  try {
    await sendEmail(validation.data)
    console.log('Email sent successfully')
    return successResponse({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Failed to send email:', error)
    return errorResponse(500, 'Failed to send message. Please try again or contact us directly.')
  }
}
