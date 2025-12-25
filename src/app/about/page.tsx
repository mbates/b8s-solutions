import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/constants'
import { CallToAction } from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: 'Learn about Bates Groundworks - your trusted local landscaping and building experts serving Surrey and Hampshire.',
}

const valueIcons: Record<string, React.ReactNode> = {
  quality: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  reliability: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  communication: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  customer: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function AboutPage() {
  const { about, contact } = siteConfig

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-bates-navy mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional landscaping and building services you can trust.
            Serving Surrey and Hampshire with pride.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-bates-navy mb-6">
                {about.story.title}
              </h2>
              <div className="space-y-4 text-gray-600">
                {about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Placeholder for team photo */}
            <div className="aspect-[4/3] bg-gradient-to-br from-bates-navy to-bates-orange/80 rounded-xl flex items-center justify-center">
              <div className="text-center text-white/60">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm">Team photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-bates-navy mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from the smallest garden tidy-up
              to the largest construction project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bates-orange/10 text-bates-orange mb-4">
                  {valueIcons[value.icon]}
                </div>
                <h3 className="font-heading text-lg font-semibold text-bates-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-bates-navy mb-4">
              Meet {contact.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The driving force behind Bates Groundworks.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Placeholder for photo */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-bates-navy to-bates-orange/80 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white/60 text-4xl font-heading font-bold">
                    {contact.name.charAt(0)}
                  </span>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-heading text-xl font-bold text-bates-navy mb-2">
                    {contact.name}
                  </h3>
                  <p className="text-bates-orange font-semibold mb-3">
                    Founder & Lead Tradesman
                  </p>
                  <p className="text-gray-600 text-sm">
                    With extensive experience in landscaping and construction, {contact.name} leads
                    every project with hands-on expertise and a commitment to quality that our
                    customers have come to rely on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Service Area */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Credentials */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-bates-navy mb-6">
                Why Choose Us
              </h2>
              <ul className="space-y-4">
                {about.credentials.map((credential) => (
                  <li key={credential} className="flex items-center">
                    <svg className="w-6 h-6 text-bates-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-bates-navy mb-6">
                Areas We Serve
              </h2>
              <p className="text-gray-600 mb-4">
                We proudly serve customers across Surrey and Hampshire, including:
              </p>
              <div className="flex flex-wrap gap-2">
                {about.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Not listed? Get in touch - we may still be able to help!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-bates-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                Ready to discuss your project?
              </h2>
              <p className="text-gray-300">
                Give us a call or drop us a message for a free, no-obligation quote.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-bates-orange hover:bg-bates-orange-light text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contact.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-bates-navy font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
