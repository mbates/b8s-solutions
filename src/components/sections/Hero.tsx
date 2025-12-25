import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-b8s-navy to-slate-800 text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Home & Garden Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Professional landscape gardening, garden maintenance, and general building services.
          </p>
          <p className="text-2xl md:text-3xl font-heading text-b8s-brick-light mb-8">
            Small jobs, Big jobs!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="btn bg-b8s-brick hover:bg-b8s-brick-light text-white px-8 py-3 text-lg font-semibold"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 text-lg font-semibold"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
      {/* Decorative brick pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex gap-1 overflow-hidden opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-12 h-4 bg-b8s-brick flex-shrink-0"></div>
        ))}
      </div>
    </section>
  )
}
