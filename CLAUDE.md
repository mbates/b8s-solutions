# CLAUDE.md - Project Guidelines

## Project Overview
B8S Solutions website for Bates Groundworks - a landscaping and construction business.

**Live site:** https://b8s.bates-solutions.com

## Development Workflow

### Git Strategy: GitHub Flow
- **main** - production branch, auto-deploys on push
- Create feature branches from main: `git checkout -b feature/my-feature`
- Open PRs to merge back to main
- CI runs on all PRs and pushes to main
- Deploy runs automatically on push to main

### Branch Naming
- `feature/` - new features
- `fix/` - bug fixes
- `chore/` - maintenance tasks

## Project Plans
All planned work is documented in `/docs/plans/`. Before starting work:
1. Check if a plan exists for the task
2. Follow the plan structure and tasks
3. Mark items complete as you finish them

Current plans:
- `01-github-setup.md` - ✅ Complete
- `02-services-page.md` - Services page implementation
- `03-projects-page.md` - Projects gallery with Google Drive integration
- `04-about-page.md` - About page
- `05-contact-page.md` - Contact form with AWS Lambda/SES
- `06-update-service-icons.md` - Service icons
- `07-setup-testing.md` - Vitest testing setup

## Commands

```bash
npm run dev          # Start dev server (Turbo)
npm run build        # Production build (Turbo cached)
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check
```

## AWS Deployment
- Uses `bates` AWS profile for local deployments
- S3 bucket: `b8s.bates-solutions.com`
- CloudFront distribution for CDN
- GitHub Actions deploys automatically on push to main

### Manual Deploy
```bash
AWS_PROFILE=bates bash scripts/deploy.sh
```

## Tech Stack
- Next.js 14 (static export)
- React 18
- TypeScript
- Tailwind CSS
- Turbo for build caching
- AWS S3 + CloudFront for hosting

## Key Files
- `/src/components/ui/BrickLogo.tsx` - Animated logo component
- `/src/lib/constants.ts` - Site configuration
- `/terraform/` - AWS infrastructure
- `/.github/workflows/` - CI/CD pipelines
