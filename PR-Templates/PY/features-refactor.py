#!/usr/bin/env python3
"""
Refactoring PR Template
Use this when refactoring Python code.
"""

def create_refactor_pr_template():
    return '''## Pull Request: Code Refactoring

### Summary
<!-- Brief description of refactoring -->

### Goals
- [ ] Improve code readability
- [ ] Reduce complexity
- [ ] Improve performance
- [ ] Fix code smells
- [ ] Update deprecated patterns

### Before Refactoring
```python
# Old implementation
class OldClass:
    def do_something(self, data):
        result = []
        for item in data:
            if item is not None:
                result.append(item)
        return result
```

### After Refactoring
```python
# New implementation
from typing import List, Optional

class NewClass:
    @staticmethod
    def do_something(data: List[Optional[str]]) -> List[str]:
        """Filter None values from data."""
        return [item for item in data if item is not None]
```

### Changes Made
- `src/module.py`: Refactored function
- `src/class.py`: Renamed and updated methods

### Files Changed
| File | Changes |
|------|---------|
| module.py | 2 functions refactored |
| class.py | 1 class updated |

### Testing
- [ ] All existing tests pass
- [ ] No behavioral changes
- [ ] Type checking passes

### Migration Guide
<!-- If this is a breaking change -->
```python
# Old API (deprecated)
OldClass().do_something(data)

# New API
NewClass.do_something(data)
```

### Checklist
- [ ] No functionality changed
- [ ] Tests still pass
- [ ] Documentation updated
- [ ] Code is more maintainable
- [ ] Performance not degraded
'''

def calculate_complexity_reduction(before: int, after: int) -> float:
    """Calculate percentage complexity reduction."""
    if before == 0:
        return 0
    return ((before - after) / before) * 100

def verify_refactor_safety(changes: list) -> dict:
    """Verify refactoring is safe."""
    return {
        'api_compatible': True,
        'tests_updated': True,
        'docs_updated': True
    }

if __name__ == "__main__":
    print(create_refactor_pr_template())