#!/usr/bin/env node
/**
 * Integration Feature PR Template
 * Use this when implementing features that integrate multiple components.
 */

function createIntegrationPRTemplate() {
  return `## Pull Request: Integration Feature

### Summary
<!-- Brief description of the integration feature -->

### Motivation
<!-- Why is this needed? What problem does it solve? -->

### Approach
<!-- How was this implemented? -->

### Architecture
\`\`\`
<!-- Diagram or description of the integration -->
Component A <--> Component B <--> Component C
\`\`\`

### Files Changed
- \`src/api.ts\`: New API endpoints
- \`src/services/\`: Business logic
- \`src/types/\`: Type definitions
- \`tests/integration.test.ts\`: Integration tests

### Dependencies
<!-- New dependencies added -->
- \`package-a\`: ^1.0.0

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass: \`npm run test:integration\`
- [ ] End-to-end tests pass
- [ ] Performance benchmarks completed

### Breaking Changes
- [ ] Yes - migration guide attached
- [ ] No

### Checklist
- [ ] Code follows project patterns
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] All CI checks passing
- [ ] Reviewed by at least one maintainer
`;
}

function checkIntegrationTests(testFiles) {
  const integrationKeywords = ['integration', 'e2e', 'endtoend', 'integration'];
  return testFiles.some(f => integrationKeywords.some(k => f.toLowerCase().includes(k)));
}

function getIntegrationPoints(changes) {
  const integrationTypes = ['api', 'service', 'client', 'database', 'cache', 'store', 'hook'];
  return [...new Set(changes.filter(c => integrationTypes.some(t => c.toLowerCase().includes(t))))];
}

console.log(createIntegrationPRTemplate());

module.exports = { createIntegrationPRTemplate, checkIntegrationTests, getIntegrationPoints };