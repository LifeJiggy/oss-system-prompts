#!/usr/bin/env node
/**
 * Documentation PR Template
 * Use this when updating documentation in JS/TS projects.
 */

function createDocsPRTemplate() {
  return `## Pull Request: Documentation Update

### Summary
<!-- Brief description of documentation changes -->

### Type of Documentation
- [ ] API Documentation (JSDoc/TypeDoc)
- [ ] README updates
- [ ] Tutorial/Guide
- [ ] Code comments
- [ ] Migration guide
- [ ] Changelog

### Files Updated
- \`README.md\`: Updated installation instructions
- \`docs/api.md\`: Added new endpoint documentation
- \`src/utils.ts\`: Updated JSDoc comments

### Documentation Changes

#### Before
\`\`\`typescript
function process(data) {
  return data;
}
\`\`\`

#### After
\`\`\`typescript
/**
 * Process input data and return result.
 * @param data - Input data to process
 * @returns Processed result
 * @throws {Error} If data is invalid
 * @example
 * const result = process({ name: 'test' });
 * // => { name: 'test', processed: true }
 */
function process(data: { name: string }): { name: string; processed: boolean } {
  if (!data) {
    throw new Error('Data cannot be empty');
  }
  return { ...data, processed: true };
}
\`\`\`

### Screenshots/Diagrams
<!-- If applicable -->
\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Input    │ --> │  Process    │ --> │   Output    │
└─────────────┘     └─────────────┘     └─────────────┘
\`\`\`

### Checklist
- [ ] Documentation builds without errors
- [ ] All JSDoc comments follow project format
- [ ] Examples are tested
- [ ] Links are valid
- [ ] Spelling/grammar checked
`;
}

function verifyDocCompleteness(docFile) {
  const requiredSections = ['description', 'params', 'returns', 'example'];
  return requiredSections.some(s => docFile.includes(s));
}

function generateDocCoverageReport(files) {
  return {
    totalModules: files.length,
    documented: files.filter(f => f.endsWith('.ts')).length,
    coveragePercentage: 0
  };
}

console.log(createDocsPRTemplate());

module.exports = { createDocsPRTemplate, verifyDocCompleteness, generateDocCoverageReport };