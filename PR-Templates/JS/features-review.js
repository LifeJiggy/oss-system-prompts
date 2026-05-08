#!/usr/bin/env node
/**
 * Code Review PR Template
 * Use this template when submitting code for review.
 */

function createReviewPRTemplate() {
  return `## Pull Request: Code Review Request

### Overview
<!-- Quick summary of changes -->

### Change Type
- [ ] Feature addition
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests

### Self-Review Checklist
- [ ] Code follows style guidelines
- [ ] No debug code left (console.log, etc.)
- [ ] Error handling included
- [ ] Logging added where appropriate
- [ ] TypeScript types added/updated
- [ ] JSDoc added to new functions

### Testing Done
\`\`\`bash
# Run tests
npm test

# Run type checker
npx tsc --noEmit

# Run linter
npm run lint

# Run formatter
npm run format:check
\`\`\`

### Areas Needing Focus
<!-- Specific areas you'd like reviewers to pay attention to -->

### Related Issues
- Closes #XXX
- Related to #XXX

### Additional Context
<!-- Screenshots, diagrams, or notes that help reviewers understand -->
`;
}

function generateReviewComments(codeChanges) {
  return {
    complexity: 'Consider simplifying complex logic',
    performance: 'Check for performance implications',
    security: 'Review for security vulnerabilities',
    maintainability: 'Ensure code is maintainable'
  };
}

function checkReviewReadiness(files) {
  const required = ['test', 'spec'];
  return files.some(f => required.some(r => f.toLowerCase().includes(r)));
}

console.log(createReviewPRTemplate());

module.exports = { createReviewPRTemplate, generateReviewComments, checkReviewReadiness };