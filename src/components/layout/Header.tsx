'use client'

import { BrickLogo } from '@/components/ui/BrickLogo'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:block py-6">
          <div className="flex flex-col items-center">
            {/* BrickLogo with nav links - full size */}
            <BrickLogo
              scale={1.5}
              showTools={true}
              showNavLinks={true}
              showTitle={true}
              animated={true}
            />
            {/* Tagline */}
            <p className="font-heading text-5xl text-bates-navy mt-4">
              Landscaping & Construction
            </p>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden py-4">
          <div className="flex flex-col items-center">
            {/* Full BrickLogo scaled down uniformly for mobile */}
            <BrickLogo
              scale={0.6}
              showTools={true}
              showNavLinks={true}
              showTitle={true}
              animated={true}
            />
            {/* Tagline */}
            <p className="font-heading text-xl text-bates-navy mt-2">
              Landscaping & Construction
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
