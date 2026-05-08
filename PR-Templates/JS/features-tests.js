#!/usr/bin/env node
/**
 * Test PR Template
 * Use this when adding or updating tests in JS/TS projects.
 */

function createTestsPRTemplate() {
  return `## Pull Request: Test Update

### Summary
<!-- Brief description of test changes -->

### Type of Tests Added/Updated
- [ ] Unit tests
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Snapshot tests
- [ ] Performance tests

### Test Coverage
\`\`\`
File: src/utils.ts
├── utils.test.ts
│   ├── doSomething()          ✓
│   ├── handleError()          ✓
│   └── edgeCase()             ✓
\`\`\`

### New Tests Added

\`\`\`typescript
describe('FeatureX', () => {
  describe('basic functionality', () => {
    it('should return result when valid input', () => {
      const result = featureX.doSomething({ value: 'test' });
      expect(result).toEqual({ value: 'test', processed: true });
    });
  });

  describe('edge cases', () => {
    it('should throw error for null input', () => {
      expect(() => featureX.doSomething(null)).toThrow('Invalid input');
    });

    it('should handle large input efficiently', () => {
      const largeData = { value: 'x'.repeat(10000) };
      const start = performance.now();
      featureX.doSomething(largeData);
      expect(performance.now() - start).toBeLessThan(100);
    });
  });
});
\`\`\`

### Test Execution Results
\`\`\`bash
$ npm test

PASS  src/utils.test.ts
  FeatureX
    basic functionality
      ✓ should return result when valid input
    edge cases
      ✓ should throw error for null input
      ✓ should handle large input efficiently

========================
Test Suites:  5 passed, 5 total
Tests:       50 passed, 50 total
========================
\`\`\`

### Coverage Report
| File | Coverage |
|------|----------|
| src/utils.ts | 85% |
| src/services/a.ts | 92% |
| src/services/b.ts | 78% |

### Testing Framework
- **Framework:** Jest / Vitest
- **Version:** Jest 29+ / Vitest 1.0+
- **Additional:** @testing-library/react, @testing-library/jest-dom

### Checklist
- [ ] Tests follow project naming conventions
- [ ] Tests are isolated (no dependencies)
- [ ] Tests have clear assertions
- [ ] Edge cases covered
- [ ] Tests are maintainable
- [ ] Coverage increased or maintained
`;
}

function calculateCoverage(oldCoverage, newCoverage) {
  return {
    before: \`\${oldCoverage}%\`,
    after: \`\${newCoverage}%\`,
    change: \`+\${newCoverage - oldCoverage}%\`
  };
}

function suggestTestImprovements(testCode) {
  const suggestions = [];
  if (testCode.includes('expect(true)')) {
    suggestions.push('Use meaningful assertions');
  }
  if (testCode.includes('setTimeout')) {
    suggestions.push('Use fake timers');
  }
  if (!testCode.includes('describe') && !testCode.includes('it')) {
    suggestions.push('Follow test structure conventions');
  }
  return suggestions;
}

console.log(createTestsPRTemplate());

module.exports = { createTestsPRTemplate, calculateCoverage, suggestTestImprovements };