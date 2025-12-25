# 🚧 About Page Plan

**Status: IN PROGRESS**

## Objective
Create an about page that builds trust and showcases the people behind Bates Groundworks.

## Completed

- [x] Create `/src/app/about/page.tsx`
- [x] Hero section with intro
- [x] Company story section with placeholder photo
- [x] Values grid (Quality, Reliability, Communication, Customer Focus)
- [x] Meet the Team section with founder profile
- [x] Credentials section (insurance, waste carrier licence, etc.)
- [x] Service areas list (Surrey, Hampshire, specific towns)
- [x] Quick contact section with phone CTA
- [x] Reuse CallToAction component
- [x] Add about content to siteConfig
- [x] SEO meta tags
- [x] Responsive design

## Pending

- [ ] Add real team photos to `/public/team/`
- [ ] Optional: Google Maps embed for service area
- [ ] Optional: Customer testimonials
- [ ] Optional: Years in business / projects completed counters

## Files Created/Modified

- `src/app/about/page.tsx` - About page with all sections
- `src/lib/constants.ts` - Added `about` config with story, values, service areas, credentials

## Design Notes

- All sections inline in page (no separate components needed for MVP)
- Using gradient placeholders for photos
- Values use inline SVG icons matching site style
- Mobile-first responsive design
