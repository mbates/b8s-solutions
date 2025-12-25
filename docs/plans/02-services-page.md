# Services Page Plan

## Objective
Create a comprehensive services page showcasing all services offered by Bates Groundworks.

## Services to Feature

### Landscape Gardening
- Garden design and planning
- Planting schemes
- Lawn installation (turf/seed)
- Hedging and screening
- Water features
- Lighting installation

### Garden Maintenance
- Regular garden maintenance contracts
- One-off garden tidy-ups
- Hedge trimming
- Lawn care (mowing, feeding, aeration)
- Seasonal planting
- Weed control

### General Building
- Patios and paving
- Decking
- Fencing and gates
- Retaining walls
- Drainage solutions
- Driveways

## Page Structure

### 1. Hero Section
- Page title: "Our Services"
- Brief intro text
- Decorative BrickLogo (smaller scale, no nav links)

### 2. Services Grid
- Card-based layout (3 columns on desktop, 1 on mobile)
- Each card includes:
  - Icon or image
  - Service category title
  - Brief description
  - List of sub-services
  - "Get a Quote" CTA linking to contact with service pre-selected

### 3. Process Section
- How we work:
  1. Initial consultation (free)
  2. Quote and design
  3. Project execution
  4. Final walkthrough

### 4. Call to Action
- Reuse existing CallToAction component

## Technical Tasks

- [ ] Create `/src/app/services/page.tsx`
- [ ] Create `/src/components/sections/ServiceCard.tsx`
- [ ] Create `/src/components/sections/ProcessSteps.tsx`
- [ ] Add service icons to `/public/icons/`
- [ ] Update `siteConfig` with service data
- [ ] Add meta tags for SEO

## Design Notes
- Use consistent orange/navy color scheme
- Cards should have subtle hover effects
- Consider parallax or scroll animations
