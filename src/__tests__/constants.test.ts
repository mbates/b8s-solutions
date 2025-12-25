import { describe, it, expect } from 'vitest'
import { siteConfig } from '@/lib/constants'

describe('siteConfig', () => {
  it('has correct site name', () => {
    expect(siteConfig.name).toBe('Bates Groundworks')
  })

  it('has contact information', () => {
    expect(siteConfig.contact.phone).toBeDefined()
    expect(siteConfig.contact.email).toBeDefined()
  })

  it('has at least 3 services', () => {
    expect(siteConfig.services.length).toBeGreaterThanOrEqual(3)
  })

  it('has navigation items', () => {
    expect(siteConfig.navigation.length).toBeGreaterThan(0)
    expect(siteConfig.navigation.some((nav) => nav.href === '/')).toBe(true)
  })

  it('has projects with required fields', () => {
    expect(siteConfig.projects.length).toBeGreaterThan(0)
    siteConfig.projects.forEach((project) => {
      expect(project.id).toBeDefined()
      expect(project.slug).toBeDefined()
      expect(project.title).toBeDefined()
      expect(project.category).toMatch(/landscaping|maintenance|building/)
    })
  })

  it('has featured projects', () => {
    const featured = siteConfig.projects.filter((p) => p.featured)
    expect(featured.length).toBeGreaterThan(0)
  })
})
