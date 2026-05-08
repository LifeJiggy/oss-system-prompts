#!/usr/bin/env python3
"""
Documentation PR Template
Use this when updating documentation in Python projects.
"""

def create_docs_pr_template():
    return '''## Pull Request: Documentation Update

### Summary
<!-- Brief description of documentation changes -->

### Type of Documentation
- [ ] API Documentation (docstrings)
- [ ] README updates
- [ ] Tutorial/Guide
- [ ] Code comments
- [ ] Migration guide
- [ ] Changelog

### Files Updated
- `README.md`: Updated installation instructions
- `docs/api.md`: Added new endpoint documentation
- `src/module.py`: Updated docstrings

### Documentation Changes

#### Before
```python
def process(data):
    return data
```

#### After
```python
def process(data: dict) -> dict:
    """Process input data and return result.

    Args:
        data: Input dictionary containing user data.

    Returns:
        Processed dictionary with results.

    Raises:
        ValueError: If data is invalid.

    Example:
        >>> process({'name': 'test'})
        {'result': 'processed'}
    """
    if not data:
        raise ValueError("Data cannot be empty")
    return {'result': 'processed', **data}
```

### Screenshots/Diagrams
<!-- If applicable -->
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Input    │ --> │  Process    │ --> │   Output    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Checklist
- [ ] Documentation builds without errors
- [ ] All docstrings follow project format
- [ ] Examples are tested
- [ ] Links are valid
- [ ] Spelling/grammar checked
'''

def verify_doc_completeness(doc_file: str) -> bool:
    """Verify documentation is complete."""
    required_sections = ['description', 'parameters', 'returns', 'examples']
    return all(section in doc_file for section in required_sections)

def generate_doc_coverage_report(files: list) -> dict:
    """Generate documentation coverage report."""
    return {
        'total_modules': len(files),
        'documented': sum(1 for f in files if '.py' in f),
        'coverage_percentage': 0
    }

if __name__ == "__main__":
    print(create_docs_pr_template())