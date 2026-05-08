#!/usr/bin/env node
/**
 * File Feature PR Template
 * Use this when adding/modifying single files in JS/TS projects.
 */

function createFilePRTemplate() {
  return `## Pull Request: File Feature

### Summary
<!-- Brief description of what this PR does -->

### Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that causes existing functionality to change)

### Files Changed
<!-- List files changed -->
- \`src/utils.ts\`: Added new utility function

### Changes Made
<!-- Detailed description of changes -->

### Testing
- [ ] Unit tests added/updated
- [ ] Tests pass locally: \`npm test\`
- [ ] Type checking passed: \`npx tsc --noEmit\`
- [ ] Linting passed: \`npm run lint\`

### Checklist
- [ ] Code follows project style guide
- [ ] TypeScript types updated
- [ ] Documentation updated
- [ ] Commit messages are meaningful

### Additional Notes
<!-- Any additional context or notes -->
`;
}

function validateFileChanges(files) {
  const allowedExtensions = ['.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.yml'];
  return files.every(file => allowedExtensions.some(ext => file.endsWith(ext)));
}

function getAffectedModules(filePath) {
  const parts = filePath.split('/');
  return parts.filter(p => p.endsWith('.ts') || p.endsWith('.js'));
}

console.log(createFilePRTemplate());

module.exports = { createFilePRTemplate, validateFileChanges, getAffectedModules };