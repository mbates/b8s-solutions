# 📋 Testing Setup with Vitest

**Status: PLANNED**

## Objective
Set up a comprehensive testing framework using Vitest for unit tests and component tests.

## Why Vitest
- Fast execution with native ESM support
- Compatible with Vite ecosystem
- Jest-compatible API (easy migration)
- Built-in TypeScript support
- Excellent React Testing Library integration
- Watch mode with instant feedback

## Dependencies to Install

```bash
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @vitest/coverage-v8  # For code coverage
```

## Configuration

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### src/test/setup.ts

```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

### package.json scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### tsconfig.json additions

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

## Test Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── BrickLogo.tsx
│   │   └── BrickLogo.test.tsx
│   └── sections/
│       ├── Hero.tsx
│       └── Hero.test.tsx
├── lib/
│   ├── constants.ts
│   └── constants.test.ts
└── test/
    ├── setup.ts
    └── utils.tsx          # Custom render, mocks
```

## Implementation Tasks

### Phase 1: Setup
- [ ] Install Vitest and dependencies
- [ ] Create vitest.config.ts
- [ ] Create test setup file
- [ ] Add npm scripts
- [ ] Update tsconfig.json

### Phase 2: Test Utilities
- [ ] Create custom render function with providers
- [ ] Create common mocks (next/router, next/image)
- [ ] Create test data factories

### Phase 3: Initial Tests
- [ ] Write tests for utility functions (constants.ts)
- [ ] Write tests for BrickLogo component
- [ ] Write tests for Hero component
- [ ] Write tests for form validation (when contact form exists)

### Phase 4: CI Integration
- [ ] Add test step to GitHub Actions workflow
- [ ] Configure coverage reporting
- [ ] Add coverage badge to README

## Example Tests

### Component Test Example

```typescript
// src/components/ui/BrickLogo.test.tsx
import { render, screen } from '@testing-library/react'
import { BrickLogo } from './BrickLogo'

describe('BrickLogo', () => {
  it('renders bricks', () => {
    render(<BrickLogo />)
    // Verify brick elements are present
  })

  it('shows title when showTitle is true', () => {
    render(<BrickLogo showTitle={true} />)
    expect(screen.getByText('Bates')).toBeInTheDocument()
    expect(screen.getByText('Groundworks')).toBeInTheDocument()
  })

  it('shows navigation links when showNavLinks is true', () => {
    render(<BrickLogo showNavLinks={true} />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('scales correctly based on scale prop', () => {
    const { container } = render(<BrickLogo scale={2} />)
    // Check computed styles or element sizes
  })
})
```

### Utility Test Example

```typescript
// src/lib/constants.test.ts
import { describe, it, expect } from 'vitest'
import { siteConfig } from './constants'

describe('siteConfig', () => {
  it('has valid contact phone', () => {
    expect(siteConfig.contact.phone).toMatch(/^\d{5}\s?\d{6}$/)
  })

  it('has required navigation items', () => {
    const navLabels = siteConfig.navigation.map(n => n.label)
    expect(navLabels).toContain('Services')
    expect(navLabels).toContain('Contact')
  })
})
```

## Turbo Integration

Update turbo.json:

```json
{
  "tasks": {
    "test": {
      "inputs": ["src/**", "vitest.config.ts"],
      "cache": true
    }
  }
}
```

## Coverage Thresholds (Future)

```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80,
  }
}
```

## Notes

- Start with utility/logic tests (easier)
- Component tests focus on user behavior, not implementation
- Mock Next.js router and image components
- Use `userEvent` over `fireEvent` for realistic interactions
- Consider snapshot tests for UI regression (use sparingly)
