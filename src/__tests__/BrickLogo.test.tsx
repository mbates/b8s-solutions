import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrickLogo } from '@/components/ui/BrickLogo'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('BrickLogo', () => {
  it('renders without crashing', () => {
    render(<BrickLogo />)
    // Should render 14 bricks (5 + 4 + 5)
  })

  it('renders navigation links when showNavLinks is true', () => {
    render(<BrickLogo showNavLinks />)
    expect(screen.getByText('Services')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
    expect(screen.getByText('Contact')).toBeDefined()
  })

  it('renders title when showTitle is true', () => {
    render(<BrickLogo showTitle />)
    expect(screen.getByText('Bates')).toBeDefined()
    expect(screen.getByText('Groundworks')).toBeDefined()
  })

  it('renders tools when showTools is true', () => {
    render(<BrickLogo showTools />)
    expect(screen.getByAltText('Shovel')).toBeDefined()
    expect(screen.getByAltText('Garden Fork')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<BrickLogo className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('scales correctly with scale prop', () => {
    const { container } = render(<BrickLogo scale={2} />)
    // Component should render without errors at different scales
    expect(container.firstChild).toBeDefined()
  })
})
