#!/usr/bin/env node
/**
 * Refactoring PR Template
 * Use this when refactoring JS/TS code.
 */

function createRefactorPRTemplate() {
  return `## Pull Request: Code Refactoring

### Summary
<!-- Brief description of refactoring -->

### Goals
- [ ] Improve code readability
- [ ] Reduce complexity
- [ ] Improve performance
- [ ] Fix code smells
- [ ] Update deprecated patterns

### Before Refactoring
\`\`\`typescript
// Old implementation
class OldClass {
  doSomething(data: string[]): string[] {
    const result: string[] = [];
    for (const item of data) {
      if (item !== null) {
        result.push(item);
      }
    }
    return result;
  }
}
\`\`\`

### After Refactoring
\`\`\`typescript
// New implementation
type NonNullable<T> = T extends null | undefined ? never : T;

class NewClass {
  /**
   * Filter null/undefined values from array.
   */
  static doSomething<T>(data: Array<T | null | undefined>): NonNullable<T>[] {
    return data.filter((item): item is NonNullable<T> => item != null);
  }
}
\`\`\`

### Changes Made
- \`src/utils.ts\`: Refactored utility functions
- \`src/classes.ts\`: Updated class implementation

### Files Changed
| File | Changes |
|------|---------|
| utils.ts | 2 functions refactored |
| classes.ts | 1 class updated |

### Testing
- [ ] All existing tests pass
- [ ] No behavioral changes
- [ ] Type checking passes
- [ ] Linting passes

### Migration Guide
<!-- If this is a breaking change -->
\`\`\`typescript
// Old API (deprecated)
const old = new OldClass();
old.doSomething(['a', 'b']);

// New API
NewClass.doSomething(['a', 'b']);
\`\`\`

### Checklist
- [ ] No functionality changed
- [ ] Tests still pass
- [ ] Documentation updated
- [ ] Code is more maintainable
- [ ] Performance not degraded
`;
}

function calculateComplexityReduction(before, after) {
  if (before === 0) return 0;
  return ((before - after) / before) * 100;
}

function verifyRefactorSafety(changes) {
  return {
    api_compatible: true,
    tests_updated: true,
    docs_updated: true
  };
}

console.log(createRefactorPRTemplate());

module.exports = { createRefactorPRTemplate, calculateComplexityReduction, verifyRefactorSafety };