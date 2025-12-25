'use client'

import Link from 'next/link'
import { useState } from 'react'
import { siteConfig } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              {/* Shovel icon */}
              <svg className="w-6 h-6 text-bates-navy" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.1 1.81l-2.83 2.83c-.77.78-.77 2.05 0 2.83l1.41 1.41-4.24 4.24-1.41-1.41c-.78-.78-2.05-.78-2.83 0L2.37 14.54c-1.56 1.56-1.56 4.09 0 5.66 1.56 1.56 4.09 1.56 5.66 0l2.83-2.83c.78-.78.78-2.05 0-2.83l-1.41-1.41 4.24-4.24 1.41 1.41c.78.78 2.05.78 2.83 0l2.83-2.83c.78-.78.78-2.05 0-2.83l-2.83-2.83c-.78-.78-2.05-.78-2.83 0z"/>
              </svg>
              {/* Brick wall - matches business card layout */}
              <div className="mx-1 flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                </div>
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-2 h-2 bg-bates-orange rounded-sm"></div>
                </div>
                <div className="flex gap-0.5">
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                  <div className="w-4 h-2 bg-bates-orange rounded-sm"></div>
                </div>
              </div>
              {/* Fork icon */}
              <svg className="w-6 h-6 text-bates-navy" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3v18h2v-7h4v7h2V3h-2v7H7V3H5zm12 0v6h-2V3h-2v8h6V3h-2zm0 10v8h2v-8h-2z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-bates-navy leading-tight">Bates Groundworks</span>
              <span className="text-xs text-bates-orange font-medium">Landscaping & Construction</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-bates-navy font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn bg-bates-orange hover:bg-bates-orange-light text-white px-6"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-bates-navy font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn bg-bates-orange hover:bg-bates-orange-light text-white w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
