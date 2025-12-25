/**
 * Local test script for the contact handler Lambda
 * Run with: npx ts-node src/test-local.ts
 */

import { handler } from './index'
import type { APIGatewayProxyEvent } from 'aws-lambda'

// Mock environment variables
process.env.RECIPIENT_EMAIL = 'b8ssolutions@gmail.com'
process.env.SENDER_EMAIL = 'noreply@bates-solutions.com'
process.env.ALLOWED_ORIGIN = 'https://b8s.bates-solutions.com'
process.env.AWS_REGION = 'eu-west-2'

// Create a mock API Gateway event
function createMockEvent(body: object | null, method = 'POST'): APIGatewayProxyEvent {
  return {
    httpMethod: method,
    body: body ? JSON.stringify(body) : null,
    headers: {},
    multiValueHeaders: {},
    isBase64Encoded: false,
    path: '/contact',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as APIGatewayProxyEvent['requestContext'],
    resource: '/contact',
  }
}

async function runTests() {
  console.log('🧪 Testing Contact Handler Lambda Locally\n')
  console.log('=' .repeat(50))

  // Test 1: Valid submission (will fail SES but validates logic)
  console.log('\n📧 Test 1: Valid form submission')
  const validEvent = createMockEvent({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '07777123456',
    service: 'Landscape Gardening',
    message: 'I would like a quote for my garden please.',
  })

  try {
    const result = await handler(validEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    if (result.statusCode === 500) {
      console.log('   ⚠️  Expected - SES not configured locally')
    }
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 2: Missing required fields
  console.log('\n❌ Test 2: Missing required fields')
  const missingFieldsEvent = createMockEvent({
    name: '',
    email: '',
    message: '',
  })

  try {
    const result = await handler(missingFieldsEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    console.log(result.statusCode === 400 ? '   ✅ Correctly rejected' : '   ❌ Should have been rejected')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 3: Invalid email format
  console.log('\n❌ Test 3: Invalid email format')
  const invalidEmailEvent = createMockEvent({
    name: 'John Doe',
    email: 'not-an-email',
    message: 'This is a test message for validation.',
  })

  try {
    const result = await handler(invalidEmailEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    console.log(result.statusCode === 400 ? '   ✅ Correctly rejected' : '   ❌ Should have been rejected')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 4: Message too short
  console.log('\n❌ Test 4: Message too short')
  const shortMessageEvent = createMockEvent({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hi',
  })

  try {
    const result = await handler(shortMessageEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    console.log(result.statusCode === 400 ? '   ✅ Correctly rejected' : '   ❌ Should have been rejected')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 5: Honeypot triggered (spam)
  console.log('\n🍯 Test 5: Honeypot triggered (spam detection)')
  const honeypotEvent = createMockEvent({
    name: 'Spammer',
    email: 'spam@spam.com',
    message: 'Buy my products!',
    honeypot: 'I am a bot',
  })

  try {
    const result = await handler(honeypotEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    console.log(result.statusCode === 200 ? '   ✅ Silently accepted (no email sent)' : '   ❌ Unexpected response')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 6: OPTIONS request (CORS preflight)
  console.log('\n🔄 Test 6: CORS preflight (OPTIONS)')
  const optionsEvent = createMockEvent(null, 'OPTIONS')

  try {
    const result = await handler(optionsEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Headers: ${JSON.stringify(result.headers)}`)
    console.log(result.statusCode === 200 ? '   ✅ CORS headers returned' : '   ❌ Unexpected response')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  // Test 7: Invalid HTTP method
  console.log('\n🚫 Test 7: Invalid HTTP method (GET)')
  const getEvent = createMockEvent(null, 'GET')

  try {
    const result = await handler(getEvent)
    console.log(`   Status: ${result.statusCode}`)
    console.log(`   Body: ${result.body}`)
    console.log(result.statusCode === 405 ? '   ✅ Correctly rejected' : '   ❌ Should have been rejected')
  } catch (error) {
    console.log(`   Error: ${error}`)
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ Local tests complete!')
  console.log('\nNote: The SES email sending will fail locally.')
  console.log('Deploy to AWS to test actual email delivery.')
}

runTests()
