'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const content = contentRef.current
    if (!content) return

    // Simple fade in animation
    content.style.opacity = '0'
    content.style.transform = 'translateY(8px)'

    // Trigger reflow
    content.offsetHeight

    // Animate in
    content.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out'
    content.style.opacity = '1'
    content.style.transform = 'translateY(0)'
  }, [pathname])

  return (
    <div ref={contentRef} style={{ opacity: 1 }}>
      {children}
    </div>
  )
}
