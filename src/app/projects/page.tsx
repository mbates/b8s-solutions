import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/constants'
import { CallToAction } from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: `Our Projects | ${siteConfig.name}`,
  description: 'Browse our portfolio of landscaping, garden maintenance, and building projects. See examples of our quality workmanship.',
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

export default function ProjectsPage() {
  const featuredProjects = siteConfig.projects.filter((p) => p.featured)
  const allProjects = siteConfig.projects

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-bates-navy mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a look at some of our recent work. From complete garden transformations
            to patios, driveways, and regular maintenance - we take pride in every project.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-bates-navy mb-8">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Placeholder image */}
                <div className="aspect-video bg-gradient-to-br from-bates-navy to-bates-orange/80 flex items-center justify-center">
                  <span className="text-white/50 text-sm">Project Image</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[project.category]}`}>
                      {categoryLabels[project.category]}
                    </span>
                    <span className="text-xs text-gray-500">{project.location}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-bates-navy mb-2 group-hover:text-bates-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center text-bates-orange font-semibold text-sm group-hover:text-bates-orange-light transition-colors">
                    View Project
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-bates-navy mb-8">
            All Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Small placeholder */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-bates-navy to-bates-orange/80 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>
                      {categoryLabels[project.category]}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-bates-navy group-hover:text-bates-orange transition-colors truncate">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {project.location} &bull; {new Date(project.completedDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
