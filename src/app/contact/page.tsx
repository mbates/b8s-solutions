'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/constants'
import { CallToAction } from '@/components/sections/CallToAction'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  honeypot: string // Spam prevention
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

export default function ContactPage() {
  const { contact: contactInfo, about, contactPage } = siteConfig

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate single field on blur
    const fieldErrors = validateForm(formData)
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check honeypot
    if (formData.honeypot) {
      // Bot detected, silently succeed
      setStatus('success')
      return
    }

    // Validate all fields
    const formErrors = validateForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setTouched({ name: true, email: true, message: true })
      return
    }

    setStatus('submitting')

    // TODO: Connect to real API in PR 5
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success (in real implementation, this would be an API call)
    setStatus('success')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      honeypot: '',
    })
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-bates-navy mb-6">
            {contactPage.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contactPage.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h2 className="font-heading text-2xl font-bold text-bates-navy mb-6">
                  Send Us a Message
                </h2>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-bates-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for getting in touch. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center px-6 py-3 bg-bates-orange hover:bg-bates-orange-light text-white font-semibold rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      className="absolute -left-[9999px]"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name && touched.name
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-bates-orange'
                          } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                          placeholder="Your name"
                          disabled={status === 'submitting'}
                        />
                        {errors.name && touched.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email && touched.email
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-bates-orange'
                          } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                          placeholder="your.email@example.com"
                          disabled={status === 'submitting'}
                        />
                        {errors.email && touched.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bates-orange focus:border-transparent transition-colors"
                          placeholder="07xxx xxxxxx"
                          disabled={status === 'submitting'}
                        />
                      </div>

                      {/* Service */}
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Interested In <span className="text-gray-400">(optional)</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bates-orange focus:border-transparent transition-colors bg-white"
                          disabled={status === 'submitting'}
                        >
                          <option value="">Select a service...</option>
                          {contactPage.form.services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message && touched.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-bates-orange'
                        } focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none`}
                        placeholder="Tell us about your project..."
                        disabled={status === 'submitting'}
                      />
                      {errors.message && touched.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">
                          Sorry, there was an error sending your message. Please try again or call us directly.
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full md:w-auto px-8 py-4 bg-bates-orange hover:bg-bates-orange-light disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-md sticky top-8">
                <h2 className="font-heading text-2xl font-bold text-bates-navy mb-6">
                  Contact Info
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bates-orange/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-bates-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-bates-navy">Phone</h3>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        className="text-bates-orange hover:text-bates-orange-light transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bates-orange/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-bates-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-bates-navy">Email</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-bates-orange hover:text-bates-orange-light transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bates-orange/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-bates-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-bates-navy">Business Hours</h3>
                      <div className="text-gray-600 text-sm whitespace-pre-line">
                        {contactPage.info.hours}
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      {contactPage.info.response}
                    </p>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-bates-navy mb-3">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.serviceAreas.slice(0, 6).map((area) => (
                      <span
                        key={area}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {area}
                      </span>
                    ))}
                    {about.serviceAreas.length > 6 && (
                      <span className="px-2 py-1 text-gray-500 text-xs">
                        +{about.serviceAreas.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
