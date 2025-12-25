# ✅ Services Page Plan

**Status: COMPLETED**

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
- Regular maintenance contracts
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

### 1. Hero Section ✅
- Page title: "Our Services"
- Brief intro text

### 2. Services Grid ✅
- Card-based layout (3 columns on desktop, 1 on mobile)
- Each card includes:
  - Icon
  - Service category title
  - Long description
  - List of all features
  - "Get a Quote" CTA linking to contact with service pre-selected

### 3. Process Section ✅
- How we work (4 steps with numbered circles):
  1. Free Consultation
  2. Quote & Design
  3. Project Execution
  4. Final Walkthrough

### 4. Call to Action ✅
- Reuses existing CallToAction component

## Technical Tasks

- [x] Create `/src/app/services/page.tsx`
- [x] Update `siteConfig` with expanded service data (longDescription, more features)
- [x] Add `process` steps to siteConfig
- [x] Add meta tags for SEO
- [x] Build passes successfully

## Implementation Notes
- Services and process steps inline in page (no separate components needed)
- Icons are inline SVGs matching existing ServicesPreview style
- Responsive grid: 1 column mobile, 3 columns desktop
- Process section uses connector lines on desktop
