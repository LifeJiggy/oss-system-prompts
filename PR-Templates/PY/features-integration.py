#!/usr/bin/env python3
"""
Integration Feature PR Template
Use this when implementing features that integrate multiple components.
"""

def create_integration_pr_template():
    return '''## Pull Request: Integration Feature

### Summary
<!-- Brief description of the integration feature -->

### Motivation
<!-- Why is this needed? What problem does it solve? -->

### Approach
<!-- How was this implemented? -->

### Architecture
```
<!-- Diagram or description of the integration -->
Component A <--> Component B <--> Component C
```

### Files Changed
- `src/api.py`: New API endpoints
- `src/service.py`: Business logic
- `src/models.py`: Data models
- `tests/test_integration.py`: Integration tests

### Dependencies
<!-- New dependencies added -->
- `package-a`: ^1.0.0

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass: `pytest tests/integration/`
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
'''

def check_integration_tests(test_files: list) -> bool:
    """Verify integration tests are included."""
    integration_keywords = ['integration', 'e2e', 'endtoend']
    for test_file in test_files:
        if any(kw in test_file.lower() for kw in integration_keywords):
            return True
    return False

def get_integration_points(changes: list) -> list:
    """Identify integration points in the changes."""
    integration_types = ['api', 'service', 'client', 'database', 'cache']
    points = []
    for change in changes:
        for ipt in integration_types:
            if ipt in change.lower():
                points.append(ipt)
    return list(set(points))

if __name__ == "__main__":
    print(create_integration_pr_template())