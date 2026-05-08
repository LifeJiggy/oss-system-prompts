# Pull Request: JavaScript Contributor

> JavaScript/TypeScript contribution PR template for JS OSS projects.

---

## PR Overview

### Summary
<!-- Description of JavaScript changes -->

### Project Type
- [ ] Node.js library
- [ ] React application
- [ ] Vue application
- [ ] Angular application
- [ ] Vanilla JS
- [ ] Full-stack (Next.js/Nuxt)

### Framework Version
- [ ] Node.js 16.x
- [ ] Node.js 18.x
- [ ] Node.js 20.x

---

## JavaScript-Specific Changes

### ES Standards
- [ ] ES2020 features used
- [ ] ES Modules (import/export)
- [ ] Async/await used
- [ ] Optional chaining used
- [ ] Nullish coalescing used

### Modern JavaScript Features
```javascript
// Optional chaining
const value = obj?.nested?.property;

// Nullish coalescing
const result = nullValue ?? 'default';

// Dynamic imports
const module = await import('./module');

// BigInt
const bigNumber = 123n;
```

### TypeScript
- [ ] TypeScript used
- [ ] Strict mode enabled
- [ ] Interfaces defined
- [ ] Types exported

---

## Files Changed

### JavaScript/TypeScript Files
| File | Extension | Purpose |
|------|-----------|---------|
| src/index.ts | .ts | Main entry |
| src/utils.ts | .ts | Utilities |
| src/components/* | .tsx | React components |

### Package Changes
```json
{
  "dependencies": {
    "new-package": "^1.0.0"
  }
}
```

---

## Testing

### Test Framework
- [ ] Jest
- [ ] Vitest
- [ ] Mocha
- [ ] Cypress
- [ ] Playwright

### Test Commands
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Type checking
npx tsc --noEmit
npx tsc --strict

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

### Test Results
```
PASS  src/utils.test.ts
  ✓ should return correct value
  ✓ should handle errors

Test Suites: 5 passed, 5 total
Tests: 50 passed, 50 total
```

---

## Build System

### Build Tools
- [ ] Webpack
- [ ] Vite
- [ ] Rollup
- [ ] esbuild
- [ ] Parcel

### Build Commands
```bash
npm run build
npm run dev
npm run preview
```

---

## Dependencies

### Package Managers
- [ ] npm
- [ ] pnpm
- [ ] yarn
- [ ] bun

---

## Security

### Security Checklist
- [ ] No secrets in code
- [ ] Dependencies audited
- [ ] npm audit passed
- [ ] Snyk/Dependabot clean

---

## Checklist

### Code Quality
- [ ] ESLint passes
- [ ] Prettier formatted
- [ ] Types valid
- [ ] No console.log

### Testing
- [ ] Tests pass
- [ ] Coverage maintained
- [ ] Edge cases covered

### Documentation
- [ ] JSDoc comments
- [ ] README updated
- [ ] Examples added

---

## Related Issues

- Closes #XXX
- Related to #XXX

---

*End of JavaScript Contributor PR Template*