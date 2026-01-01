'use client'

import { BrickLogo } from '@/components/ui/BrickLogo'

export default function LogoConceptsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Logo Integration Concepts
        </h1>

        {/* Concept 1: Replace title text with BG monogram */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 1: Replace Title with BG Monogram
          </h2>
          <p className="text-gray-500 mb-6">
            The BG monogram sits above the bricks instead of the "Bates Groundworks" text.
          </p>
          <div className="flex justify-center border-t pt-8">
            <div className="inline-flex items-center gap-3">
              <img
                src="/shovel.svg"
                alt="Shovel"
                className="h-48"
              />
              <div className="flex flex-col items-center gap-3">
                {/* BG Monogram instead of title */}
                <img
                  src="/logo.svg"
                  alt="BG Logo"
                  className="h-24"
                />
                {/* Brick wall */}
                <BrickLogo
                  scale={1.5}
                  showTools={false}
                  showNavLinks={true}
                  showTitle={false}
                  animated={false}
                />
              </div>
              <img
                src="/garden-fork.svg"
                alt="Garden Fork"
                className="h-48"
              />
            </div>
          </div>
          <p className="text-center font-heading text-4xl text-bates-navy mt-4">
            Landscaping & Construction
          </p>
        </section>

        {/* Concept 2: Watermark/backdrop */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 2: Watermark Behind Bricks
          </h2>
          <p className="text-gray-500 mb-6">
            A faded BG monogram shows behind the brick wall as subtle brand reinforcement.
          </p>
          <div className="flex justify-center border-t pt-8">
            <div className="relative inline-flex items-center gap-3">
              <img
                src="/shovel.svg"
                alt="Shovel"
                className="h-64"
              />
              <div className="relative flex flex-col items-center gap-3">
                {/* Watermark behind */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src="/logo.svg"
                    alt="BG Watermark"
                    className="h-48 opacity-10"
                  />
                </div>
                {/* Content on top */}
                <BrickLogo
                  scale={1.5}
                  showTools={false}
                  showNavLinks={true}
                  showTitle={true}
                  animated={false}
                />
              </div>
              <img
                src="/garden-fork.svg"
                alt="Garden Fork"
                className="h-64"
              />
            </div>
          </div>
          <p className="text-center font-heading text-4xl text-bates-navy mt-4">
            Landscaping & Construction
          </p>
        </section>

        {/* Concept 3: Center brick replacement - just showing the idea */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 3: Logo in Center (No Nav Links)
          </h2>
          <p className="text-gray-500 mb-6">
            The BG monogram replaces the middle brick row. Works if nav links are elsewhere.
          </p>
          <div className="flex justify-center border-t pt-8">
            <div className="inline-flex items-center gap-3">
              <img
                src="/shovel.svg"
                alt="Shovel"
                className="h-48"
              />
              <div className="flex flex-col items-center gap-2">
                {/* Top row of bricks */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-32 h-11 bg-bates-orange rounded-md"
                    />
                  ))}
                </div>
                {/* Middle row - logo instead of bricks */}
                <div className="flex items-center justify-center py-1">
                  <img
                    src="/logo.svg"
                    alt="BG Logo"
                    className="h-16"
                  />
                </div>
                {/* Bottom row of bricks */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-32 h-11 bg-bates-orange rounded-md"
                    />
                  ))}
                </div>
              </div>
              <img
                src="/garden-fork.svg"
                alt="Garden Fork"
                className="h-48"
              />
            </div>
          </div>
          <p className="text-center font-heading text-4xl text-bates-navy mt-4">
            Landscaping & Construction
          </p>
        </section>

        {/* Concept 4: Footer accent */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 4: Footer Brand Stamp
          </h2>
          <p className="text-gray-500 mb-6">
            Keep header as-is, use the BG monogram in the footer as a brand stamp.
          </p>
          <div className="border-t pt-8">
            <p className="text-center text-gray-500 mb-4 italic">
              (Header stays the same - current BrickLogo)
            </p>
            {/* Mock footer */}
            <div className="bg-bates-navy text-white p-8 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/logo.svg"
                  alt="BG Logo"
                  className="h-20 brightness-0 invert opacity-80"
                />
                <p className="font-heading text-xl">Bates Groundworks</p>
                <p className="text-gray-300 text-sm">
                  © 2024 Bates Groundworks. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept 5: Small logo with title */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 5: Small Logo Next to Title
          </h2>
          <p className="text-gray-500 mb-6">
            The BG monogram appears small next to or above the "Bates Groundworks" text.
          </p>
          <div className="flex justify-center border-t pt-8">
            <div className="inline-flex items-center gap-3">
              <img
                src="/shovel.svg"
                alt="Shovel"
                className="h-64"
              />
              <div className="flex flex-col items-center gap-3">
                {/* Logo + Title side by side */}
                <div className="flex items-center gap-4">
                  <img
                    src="/logo.svg"
                    alt="BG Logo"
                    className="h-16"
                  />
                  <h1 className="font-logo font-bold text-bates-navy text-5xl flex flex-col" style={{ lineHeight: 1.1 }}>
                    <span style={{ letterSpacing: '0.35em' }}>Bates</span>
                    <span>Groundworks</span>
                  </h1>
                </div>
                {/* Brick wall */}
                <BrickLogo
                  scale={1.5}
                  showTools={false}
                  showNavLinks={true}
                  showTitle={false}
                  animated={false}
                />
              </div>
              <img
                src="/garden-fork.svg"
                alt="Garden Fork"
                className="h-64"
              />
            </div>
          </div>
          <p className="text-center font-heading text-4xl text-bates-navy mt-4">
            Landscaping & Construction
          </p>
        </section>

        {/* Concept 5b: Logo above title */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Concept 5b: Small Logo Above Title
          </h2>
          <p className="text-gray-500 mb-6">
            The BG monogram appears centered above the "Bates Groundworks" text.
          </p>
          <div className="flex justify-center border-t pt-8">
            <div className="inline-flex items-center gap-3">
              <img
                src="/shovel.svg"
                alt="Shovel"
                className="h-72"
              />
              <div className="flex flex-col items-center gap-2">
                {/* Logo above title */}
                <img
                  src="/logo.svg"
                  alt="BG Logo"
                  className="h-14"
                />
                <h1 className="font-logo font-bold text-bates-navy text-5xl flex flex-col items-center" style={{ lineHeight: 1.1 }}>
                  <span style={{ letterSpacing: '0.35em' }}>Bates</span>
                  <span>Groundworks</span>
                </h1>
                {/* Brick wall */}
                <div className="mt-2">
                  <BrickLogo
                    scale={1.5}
                    showTools={false}
                    showNavLinks={true}
                    showTitle={false}
                    animated={false}
                  />
                </div>
              </div>
              <img
                src="/garden-fork.svg"
                alt="Garden Fork"
                className="h-72"
              />
            </div>
          </div>
          <p className="text-center font-heading text-4xl text-bates-navy mt-4">
            Landscaping & Construction
          </p>
        </section>

      </div>
    </div>
  )
}
