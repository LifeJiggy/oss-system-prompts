#!/usr/bin/env node
/**
 * Bug Fix PR Template
 * Use this when fixing bugs in JS/TS projects.
 */

function createBugfixPRTemplate() {
  return `## Pull Request: Bug Fix

### Bug Description
**Issue:** <!-- Link to issue -->
**Severity:** Critical/High/Medium/Low

### Problem
<!-- Description of the bug -->

### Root Cause
<!-- What caused the bug? -->

### Solution Implemented
<!-- How was it fixed? -->

### Verification Steps
\`\`\`bash
# Reproducing the bug
1. npm run dev
2. Click the bug trigger
3. Observe error in console

# After fix
1. npm run dev
2. Verify bug is fixed
3. npm test
\`\`\`

### Test Cases Added
- \`test('bug scenario xyz', () => {...})\`: Tests the specific bug case
- \`test('edge case xyz', () => {...})\`: Tests related edge cases

### Before/After
\`\`\`typescript
// Before (broken)
function brokenFunction(data: any): any {
  return data.value; // Bug: no null check
}

// After (fixed)
function fixedFunction(data: any): any {
  return data?.value ?? 'default';
}
\`\`\`

### Checklist
- [ ] Bug reproduced locally
- [ ] Fix verified
- [ ] Regression tests pass
- [ ] Edge cases handled
- [ ] No new warnings/errors
`;
}

function verifyBugfix(fixDescription) {
  const requiredElements = ['cause', 'solution', 'test'];
  return requiredElements.every(el => fixDescription.toLowerCase().includes(el));
}

function generateBugSummary(bugId, severity, description) {
  return {
    id: bugId,
    severity,
    description,
    status: 'fixed'
  };
}

console.log(createBugfixPRTemplate());

module.exports = { createBugfixPRTemplate, verifyBugfix, generateBugSummary };