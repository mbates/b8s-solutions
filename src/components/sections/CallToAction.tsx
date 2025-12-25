import Link from 'next/link'
import { siteConfig } from '@/lib/constants'

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-b8s-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {siteConfig.cta}. Whether it&apos;s a small repair or a complete garden makeover, we&apos;re here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="btn bg-white text-b8s-orange hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Contact Us
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
          >
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
