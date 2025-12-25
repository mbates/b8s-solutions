export const siteConfig = {
  name: 'Bates Groundworks',
  tagline: 'Landscaping & Construction',
  description: 'Professional landscape gardening, garden maintenance, and general building services. Small jobs, Big jobs!',
  contact: {
    name: 'Robbie',
    phone: '07773 552028',
    email: 'b8ssolutions@gmail.com',
  },
  cta: 'Get in touch for a free quote',
  services: [
    {
      title: 'Landscape Gardening',
      slug: 'landscape-gardening',
      description: 'Transform your outdoor space with professional garden design, planting, and hardscaping.',
      longDescription: 'Whether you want a complete garden transformation or just need help with specific areas, we bring your vision to life. From initial design concepts through to final planting, we handle every aspect of your landscaping project.',
      features: [
        'Garden design and planning',
        'Planting schemes',
        'Lawn installation (turf/seed)',
        'Hedging and screening',
        'Water features',
        'Garden lighting',
      ],
    },
    {
      title: 'Garden Maintenance',
      slug: 'garden-maintenance',
      description: 'Keep your garden looking its best with regular maintenance and seasonal care.',
      longDescription: 'A beautiful garden needs regular care. We offer flexible maintenance packages to keep your outdoor space looking pristine all year round, from weekly visits to seasonal one-off tidy-ups.',
      features: [
        'Regular maintenance contracts',
        'One-off garden tidy-ups',
        'Hedge trimming',
        'Lawn care (mowing, feeding, aeration)',
        'Seasonal planting',
        'Weed control',
      ],
    },
    {
      title: 'General Building',
      slug: 'general-building',
      description: 'Quality building work from extensions to repairs. No job too small.',
      longDescription: 'From patios and driveways to fencing and retaining walls, we deliver quality construction work that stands the test of time. Every project is completed to the highest standards with attention to detail.',
      features: [
        'Patios and paving',
        'Decking',
        'Fencing and gates',
        'Retaining walls',
        'Drainage solutions',
        'Driveways',
      ],
    },
  ],
  process: [
    {
      step: 1,
      title: 'Free Consultation',
      description: 'We visit your property to discuss your requirements and provide expert advice.',
    },
    {
      step: 2,
      title: 'Quote & Design',
      description: 'You receive a detailed quote with clear pricing. For larger projects, we provide design plans.',
    },
    {
      step: 3,
      title: 'Project Execution',
      description: 'Our skilled team completes the work efficiently, keeping you informed throughout.',
    },
    {
      step: 4,
      title: 'Final Walkthrough',
      description: 'We walk through the completed work together to ensure your complete satisfaction.',
    },
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}
