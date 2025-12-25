# 🚧 Projects Page Plan

**Status: IN PROGRESS (Phase 1 Complete)**

## Objective
Create a portfolio/gallery page showcasing completed projects with images sourced from Google Drive.

## Phase 1: Static Implementation ✅

### Completed
- [x] Create `/src/app/projects/page.tsx` with project grid
- [x] Create `/src/app/projects/[slug]/page.tsx` for project details
- [x] Add project data to siteConfig (6 placeholder projects)
- [x] Featured projects section
- [x] Category badges (landscaping, maintenance, building)
- [x] Related projects section
- [x] Services used sidebar
- [x] Breadcrumb navigation
- [x] SEO meta tags
- [x] Responsive design

### Placeholder Images
Currently using gradient placeholders. Will be replaced with real images in Phase 2.

## Phase 2: Google Drive Integration (Pending)

### Option A: Google Drive API (Recommended)
- Use Google Drive API to fetch images from a shared folder
- Requires Google Cloud project and API key
- Can dynamically update when new images are added
- Need to handle:
  - API authentication
  - Rate limiting
  - Image caching
  - Thumbnail generation

### Option B: Sync Script
- Script to download images from Google Drive to `/public/projects/`
- Run manually or via CI/CD
- Best performance (local images)
- Requires periodic manual sync

### Tasks
- [ ] Set up Google Cloud project
- [ ] Create service account
- [ ] Implement Drive API client or sync script
- [ ] Add to Terraform (API keys in Secrets Manager)

## Phase 3: Enhancements (Pending)

- [ ] Image lightbox/carousel
- [ ] Category filtering
- [ ] Next.js Image optimization
- [ ] Blur placeholder generation
- [ ] Pagination or infinite scroll
- [ ] Before/after comparison slider

## Current Data Structure

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'landscaping' | 'maintenance' | 'building';
  location: string;
  completedDate: string;
  services: string[];
  featured: boolean;
}
```

## Files Created
- `src/app/projects/page.tsx` - Project listing page
- `src/app/projects/[slug]/page.tsx` - Project detail page
- Updated `src/lib/constants.ts` with projects array

## Notes
- Using static generation with `generateStaticParams`
- All 6 projects are pre-rendered at build time
- Images will need real content before Phase 2
