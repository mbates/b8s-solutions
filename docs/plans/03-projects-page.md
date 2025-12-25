# Projects Page Plan

## Objective
Create a portfolio/gallery page showcasing completed projects with images sourced from Google Drive.

## Google Drive Integration

### Option A: Google Drive API (Recommended)
- Use Google Drive API to fetch images from a shared folder
- Requires Google Cloud project and API key
- Can dynamically update when new images are added
- Need to handle:
  - API authentication
  - Rate limiting
  - Image caching
  - Thumbnail generation

### Option B: Google Drive Direct Links
- Manually add direct links to images
- Simpler but requires manual updates
- Less reliable (links can break)

### Option C: Sync Script
- Script to download images from Google Drive to `/public/projects/`
- Run manually or via CI/CD
- Best performance (local images)
- Requires periodic manual sync

## Recommended Architecture

```
/src/app/projects/page.tsx          # Main projects page
/src/app/projects/[slug]/page.tsx   # Individual project detail
/src/components/gallery/
  ProjectCard.tsx                    # Project thumbnail card
  ProjectGallery.tsx                 # Grid of projects
  ImageLightbox.tsx                  # Full-size image viewer
/src/lib/
  google-drive.ts                    # Google Drive API wrapper
  projects.ts                        # Project data/types
```

## Project Data Structure

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'landscaping' | 'maintenance' | 'building';
  location: string;
  completedDate: string;
  images: ProjectImage[];
  featured: boolean;
}

interface ProjectImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  isCover: boolean;
}
```

## Page Features

### Projects List Page
- [ ] Filter by category
- [ ] Sort by date/featured
- [ ] Responsive grid layout
- [ ] Lazy loading images
- [ ] Search functionality (optional)

### Project Detail Page
- [ ] Image carousel/gallery
- [ ] Before/after comparison slider (if applicable)
- [ ] Project description
- [ ] Services used
- [ ] Location (optional map integration)
- [ ] Related projects
- [ ] CTA to contact

## Technical Tasks

### Phase 1: Static Implementation
- [ ] Create project pages with hardcoded data
- [ ] Implement gallery components
- [ ] Add lightbox functionality
- [ ] Style and responsive design

### Phase 2: Google Drive Integration
- [ ] Set up Google Cloud project
- [ ] Create service account
- [ ] Implement Drive API client
- [ ] Create image sync mechanism
- [ ] Add to Terraform (API keys in Secrets Manager)

### Phase 3: Enhancements
- [ ] Image optimization (Next.js Image component)
- [ ] Blur placeholder generation
- [ ] Category filtering
- [ ] Pagination or infinite scroll

## Google Cloud Setup Required

1. Create Google Cloud project
2. Enable Google Drive API
3. Create service account
4. Share Google Drive folder with service account email
5. Store credentials securely (AWS Secrets Manager)

## Dependencies
- `googleapis` npm package
- Sharp for image processing (optional)
- Next.js Image optimization

## Security Considerations
- Never expose API keys in client-side code
- Use server-side API routes for Drive access
- Implement rate limiting
- Cache responses aggressively
