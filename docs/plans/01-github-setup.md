# GitHub Setup Plan

## Objective
Set up GitHub repository with CI/CD using GitHub Flow (single main branch + feature branches).

## Branch Strategy: GitHub Flow
- `main` - production-ready code, auto-deploys to production
- `feature/*` - feature branches created from main
- PRs merge directly to main after review/CI passes

## Status

### 1. Repository Setup ✅
- [x] Create GitHub repository
- [x] Add remote origin to local git
- [x] Push existing code to GitHub
- [x] Set main as default branch
- [x] Remove develop branch (switched to GitHub Flow)

### 2. CI/CD Pipeline ✅
- [x] Create `.github/workflows/ci.yml` for:
  - Linting (`npm run lint`)
  - Type checking (`tsc --noEmit`)
  - Build verification (`npm run build`)
  - Run on all PRs and pushes to main
- [x] Create `.github/workflows/deploy.yml` for:
  - Build static export
  - Sync to S3 bucket
  - Invalidate CloudFront cache
  - Run on push to main only

### 3. Repository Configuration ✅
- [x] Add README.md with project overview
- [x] Add .github/pull_request_template.md
- [x] Add GitHub Secrets for AWS credentials:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `S3_BUCKET`
  - `CLOUDFRONT_DISTRIBUTION_ID`
- [ ] Add .github/CODEOWNERS file (optional)
- [ ] Configure Dependabot for dependency updates (optional)

### 4. Branch Protection (Optional)
- [ ] Require PR reviews before merging
- [ ] Require status checks to pass
- [ ] Require branches to be up to date

## Workflow

```
main ─────●─────●─────●─────●─────●───▶ (production)
           \         / \         /
            ●───●───●   ●───●───●
           feature/x    feature/y
```

1. Create feature branch from main: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push and create PR to main
4. CI runs automatically
5. Review and merge
6. Deploy runs automatically on main

## Dependencies
- AWS credentials with S3 and CloudFront permissions
- Existing Terraform infrastructure

## Notes
- Consider using OIDC for AWS authentication instead of static credentials
- Turbo caching speeds up CI builds
