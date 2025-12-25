# 🚧 Testing Setup Plan

**Status: IN PROGRESS**

## Objective
Set up Vitest for unit and component testing to enable Dependabot auto-merge with confidence.

## Implementation

### Dependencies
- vitest - Fast Vite-native test runner
- @vitejs/plugin-react - React support for Vitest
- jsdom - DOM environment for tests
- @testing-library/react - React testing utilities
- @testing-library/dom - DOM testing utilities
- @testing-library/jest-dom - DOM matchers (works with Vitest)

### Configuration Files
- `vitest.config.ts` - Vitest configuration with jsdom, React plugin, path aliases
- `vitest.setup.ts` - Test setup with cleanup and jest-dom matchers

### Test Scripts
```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

## Completed Tasks
- [x] Install Vitest and testing dependencies
- [x] Create vitest.config.ts with React and jsdom setup
- [x] Create vitest.setup.ts with cleanup and matchers
- [x] Add test scripts to package.json
- [x] Create basic tests for siteConfig
- [x] Create component tests for BrickLogo
- [x] Update CI workflow to run tests
- [x] Update Dependabot auto-merge to approve PRs

## Pending Tasks
- [ ] Add more component tests as features are built
- [ ] Consider adding coverage thresholds
- [ ] Add integration tests for pages

## Test Structure
```
src/
  __tests__/
    constants.test.ts    # siteConfig tests
    BrickLogo.test.tsx   # Component tests
```

## Notes
- Using Vitest instead of Jest for faster performance and native ESM support
- Tests run in CI before build step
- Dependabot PRs auto-merge after CI passes (minor/patch updates only)
