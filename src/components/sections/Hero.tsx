import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Services List */}
        <p className="text-lg text-gray-600 mb-2">
          Landscape gardening • Garden maintenance • General building
        </p>

        {/* Slogan */}
        <p className="text-xl md:text-2xl font-heading text-bates-navy mb-8">
          Excellence in every project
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="bg-bates-orange hover:bg-bates-orange-light text-white px-8 h-14 text-lg font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:07773552028"
            className="bg-bates-navy hover:bg-blue-900 text-white px-8 h-14 text-lg font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
          >
            Call 07773 552028
          </a>
        </div>
      </div>
    </section>
  )
}
