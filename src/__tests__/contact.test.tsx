import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '@/app/contact/page'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('ContactPage', () => {
  it('renders the hero section', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<ContactPage />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders contact info sidebar', () => {
    render(<ContactPage />)
    // Phone appears in sidebar and CTA, so use getAllBy
    expect(screen.getAllByText(/07773 552028/).length).toBeGreaterThan(0)
    expect(screen.getByText(/b8ssolutions@gmail.com/)).toBeInTheDocument()
    expect(screen.getByText(/business hours/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('shows error for short message', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const messageInput = screen.getByLabelText(/message/i)
    await user.type(messageInput, 'Hi')
    fireEvent.blur(messageInput)

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument()
    })
  })

  it('clears error when user starts typing in a field', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    // Trigger validation error
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })

    // Start typing in name field
    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'J')

    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '07777123456')
    await user.selectOptions(screen.getByLabelText(/service/i), 'Landscape Gardening')
    await user.type(screen.getByLabelText(/message/i), 'I would like a quote for my garden.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/sending.../i)).toBeInTheDocument()
    })

    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument()
      expect(screen.getByText(/thank you for getting in touch/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('allows sending another message after success', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message for submission.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument()
    }, { timeout: 3000 })

    // Click send another message
    await user.click(screen.getByRole('button', { name: /send another message/i }))

    // Form should be reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders service area tags', () => {
    render(<ContactPage />)
    expect(screen.getByText('Herefordshire')).toBeInTheDocument()
    expect(screen.getByText('Worcestershire')).toBeInTheDocument()
  })
})
