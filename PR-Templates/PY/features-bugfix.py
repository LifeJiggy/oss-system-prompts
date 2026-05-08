#!/usr/bin/env python3
"""
Bug Fix PR Template
Use this when fixing bugs in Python projects.
"""

def create_bugfix_pr_template():
    return '''## Pull Request: Bug Fix

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
```bash
# Reproducing the bug
1. python -c "from src import bug_trigger"
2. Observe error

# After fix
1. python -c "from src import bug_trigger"
2. Verify no error
3. pytest tests/ -v
```

### Test Cases Added
- `test_bug_scenario_xyz()`: Tests the specific bug case
- `test_edge_case_xyz()`: Tests related edge cases

### Before/After
```python
# Before (broken)
def broken_function():
    return None  # Bug here

# After (fixed)
def fixed_function():
    return default_value
```

### Checklist
- [ ] Bug reproduced locally
- [ ] Fix verified
- [ ] Regression tests pass
- [ ] Edge cases handled
- [ ] No new warnings/errors
'''

def verify_bugfix(fix_description: str) -> bool:
    """Verify fix addresses the root cause."""
    required_elements = ['cause', 'solution', 'test']
    return all(el in fix_description.lower() for el in required_elements)

def generate_bug_summary(bug_id: str, severity: str, description: str) -> dict:
    """Generate bug report summary."""
    return {
        'id': bug_id,
        'severity': severity,
        'description': description,
        'status': 'fixed'
    }

if __name__ == "__main__":
    print(create_bugfix_pr_template())