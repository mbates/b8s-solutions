import Link from 'next/link'
import { BrickLogo } from '@/components/ui/BrickLogo'

export function Hero() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Company Name */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-b8s-navy mb-4">
          B8S Solutions
        </h1>

        {/* Main Logo - The Focus */}
        <div className="mb-6">
          <BrickLogo size="hero" showTools={true} showNavLinks={true} animated={true} />
        </div>

        {/* Tagline */}
        <p className="font-heading text-2xl md:text-3xl text-b8s-orange mb-6">
          Home & Garden Services
        </p>

        {/* Services List */}
        <p className="text-lg text-gray-600 mb-2">
          Landscape gardening • Garden maintenance • General building
        </p>

        {/* Slogan */}
        <p className="text-xl md:text-2xl font-heading text-b8s-navy mb-8">
          Small jobs, Big jobs!
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-b8s-orange hover:bg-b8s-orange-light text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:07773552028"
            className="bg-b8s-navy hover:bg-blue-900 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
          >
            Call 07773 552028
          </a>
        </div>
      </div>
    </section>
  )
}
