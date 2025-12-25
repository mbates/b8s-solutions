import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/constants'
import { CallToAction } from '@/components/sections/CallToAction'

interface PageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  landscaping: 'Landscaping',
  maintenance: 'Maintenance',
  building: 'Building',
}

const categoryColors: Record<string, string> = {
  landscaping: 'bg-green-100 text-green-800',
  maintenance: 'bg-blue-100 text-blue-800',
  building: 'bg-orange-100 text-orange-800',
}

export async function generateStaticParams() {
  return siteConfig.projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = siteConfig.projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = siteConfig.projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = siteConfig.projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-bates-orange">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-bates-orange">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-bates-navy">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColors[project.category]}`}>
              {categoryLabels[project.category]}
            </span>
            <span className="text-gray-500">{project.location}</span>
            <span className="text-gray-400">&bull;</span>
            <span className="text-gray-500">
              {new Date(project.completedDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-bates-navy mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Image Gallery Placeholder */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main image placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-bates-navy to-bates-orange/80 rounded-xl flex items-center justify-center md:col-span-2">
              <div className="text-center text-white/60">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Project images coming soon</p>
              </div>
            </div>

            {/* Thumbnail placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg hidden md:flex items-center justify-center">
                <span className="text-white/50 text-sm">Image {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-bates-navy mb-4">
                About This Project
              </h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  This project showcases our expertise in {categoryLabels[project.category].toLowerCase()}.
                  Working closely with the client, we delivered a solution that exceeded expectations
                  and transformed their outdoor space.
                </p>
                <p>
                  Every project we undertake is completed to the highest standards, using quality
                  materials and skilled craftsmanship. We take pride in our attention to detail
                  and commitment to customer satisfaction.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-bates-navy mb-4">
                  Services Used
                </h3>
                <ul className="space-y-2">
                  {project.services.map((service) => (
                    <li key={service} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-bates-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href={`/contact?service=${project.category}`}
                    className="block w-full bg-bates-orange hover:bg-bates-orange-light text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get a Similar Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-bates-navy mb-8">
              Similar Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/projects/${related.slug}`}
                  className="group flex items-start gap-4 bg-white p-4 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-bates-navy to-bates-orange/80 flex-shrink-0" />

                  <div>
                    <h3 className="font-heading text-lg font-semibold text-bates-navy group-hover:text-bates-orange transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {related.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction />
    </>
  )
}
