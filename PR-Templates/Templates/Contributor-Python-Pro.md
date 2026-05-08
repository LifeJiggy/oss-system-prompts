# Pull Request: Python Contributor

> Python-specific contribution PR template for Python OSS projects.

---

## PR Overview

### Summary
<!-- Description of Python changes -->

### Project Type
- [ ] Library
- [ ] Framework (Django/Flask/FastAPI)
- [ ] CLI Tool
- [ ] Web Application
- [ ] Data Science

### Python Version Support
- [ ] Python 3.7
- [ ] Python 3.8
- [ ] Python 3.9
- [ ] Python 3.10
- [ ] Python 3.11
- [ ] Python 3.12

---

## Python-Specific Changes

### PEP 8 Compliance
- [ ] Code follows PEP 8
- [ ] Line length < 88 characters (Black default)
- [ ] Naming conventions followed
- [ ] No trailing whitespace

### Type Hints
- [ ] Type hints added to functions
- [ ] Return types specified
- [ ] No `Any` types used unnecessarily
- [ ] Generic types used where appropriate

### Docstrings
- [ ] Google/NumPy style docstrings
- [ ] Parameters documented
- [ ] Returns documented
- [ ] Raises documented
- [ ] Examples included

### Example Docstring
```python
def process_data(data: dict) -> dict:
    """Process input data and return result.

    Args:
        data: Input dictionary containing user data.

    Returns:
        Processed dictionary with results.

    Raises:
        ValueError: If data is invalid.

    Example:
        >>> process_data({'name': 'test'})
        {'name': 'test', 'status': 'processed'}
    """
    if not data:
        raise ValueError("Data cannot be empty")
    return {**data, 'status': 'processed'}
```

---

## Files Changed

### Python Files
| File | Purpose | Type Hints | Tests |
|------|---------|------------|-------|
| src/module.py | Core module | Yes | Yes |
| src/utils.py | Utilities | Yes | Yes |
| tests/test_module.py | Tests | N/A | Yes |

### Dependencies
| Package | Version | Use |
|---------|---------|-----|
| package-a | ^1.0 | Feature X |
| package-b | ^2.0 | Feature Y |

---

## Testing

### Test Framework
- [ ] pytest
- [ ] unittest
- [ ] nose2
- [ ] hypothesis

### Test Commands
```bash
# Run all tests
pytest -v

# Run with coverage
pytest --cov=src --cov-report=html

# Run specific tests
pytest tests/test_module.py -v

# Type checking
mypy src/
mypy --strict src/

# Linting
flake8 src/
pylint src/
isort --check src/
```

### Test Results
```
======================== test session =========================
collected 50 items

test_module.py::test_process_data PASSED                    [  2%]
test_module.py::test_process_data_error PASSED              [  4%]
========================
50 passed in 2.5s
========================

mypy src/
Success: no issues found
```

---

## Virtual Environment

### Requirements Files
- [ ] requirements.txt updated
- [ ] requirements-dev.txt updated
- [ ] setup.py updated
- [ ] pyproject.toml updated

### Package Managers
- [ ] pip
- [ ] Poetry
- [ ] pipenv
- [ ] conda

---

## Security Considerations

### Security Checklist
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Dependency audit passed

---

## Documentation

### Documentation Type
- [ ] Docstrings updated
- [ ] README updated
- [ ] API documentation updated
- [ ] Examples added

### Sphinx/Docstring Tools
- [ ] sphinx.ext.autodoc
- [ ] sphinx.ext.napoleon
- [ ] ReadTheDocs configuration

---

## Checklist

### Code Quality
- [ ] PEP 8 compliant
- [ ] Type hints present
- [ ] Docstrings complete
- [ ] No linting errors

### Testing
- [ ] Tests pass
- [ ] Coverage maintained
- [ ] Edge cases covered
- [ ] Error cases tested

### Dependencies
- [ ] Works with Python 3.7+
- [ ] Works with dependencies
- [ ] No version conflicts
- [ ] PyPI package available

---

## Related Issues

- Closes #XXX
- Related to #XXX

---

## Additional Notes

### Implementation Details
- Uses Python 3.10+ features: match/case
- Async compatible: Yes/No
- Thread-safe: Yes/No

---

*End of Python Contributor PR Template*