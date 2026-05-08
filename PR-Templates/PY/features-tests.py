#!/usr/bin/env python3
"""
Test PR Template
Use this when adding or updating tests in Python projects.
"""

def create_tests_pr_template():
    return '''## Pull Request: Test Update

### Summary
<!-- Brief description of test changes -->

### Type of Tests Added/Updated
- [ ] Unit tests
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Property-based tests
- [ ] Performance tests

### Test Coverage
```
File: src/module.py
├── test_module.py
│   ├── TestClass::test_method_one    ✓
│   ├── TestClass::test_method_two    ✓
│   └── TestClass::test_edge_case     ✓
```

### New Tests Added

```python
class TestFeatureX:
    """Tests for Feature X."""

    def test_basic_functionality(self):
        """Test basic feature works."""
        result = feature_x.do_something()
        assert result is not None

    def test_edge_case_empty_input(self):
        """Test edge case with empty input."""
        with pytest.raises(ValueError):
            feature_x.do_something(None)

    def test_edge_case_large_input(self):
        """Test edge case with large input."""
        large_data = 'x' * 10000
        result = feature_x.do_something(large_data)
        assert len(result) == 10000
```

### Test Execution Results
```bash
$ pytest tests/ -v

======================== test session starts =========================
collected 50 items

tests/test_module.py::TestClass::test_method_one PASSED       [  2%]
tests/test_module.py::TestClass::test_method_two PASSED       [  4%]
tests/test_module.py::TestClass::test_edge_case PASSED        [  6%]

======================== 50 passed in 2.5s =========================
```

### Coverage Report
| Module | Coverage |
|--------|----------|
| src/a.py | 85% |
| src/b.py | 92% |
| src/c.py | 78% |

### Testing Framework
- **Framework:** pytest
- **Version:** pytest 7.0+
- **Additional:** pytest-cov, pytest-mock

### Checklist
- [ ] Tests follow project naming conventions
- [ ] Tests are isolated (no dependencies)
- [ ] Tests have clear assertions
- [ ] Edge cases covered
- [ ] Tests are maintainable
- [ ] Coverage increased
'''

def calculate_coverage(old: int, new: int) -> dict:
    """Calculate coverage change."""
    return {
        'before': f'{old}%',
        'after': f'{new}%',
        'change': f'+{new - old}%'
    }

def suggest_test_improvements(test_code: str) -> list:
    """Suggest test improvements."""
    suggestions = []
    if 'assert True' in test_code:
        suggestions.append('Use meaningful assertions')
    if 'time.sleep' in test_code:
        suggestions.append('Use mocking instead of sleep')
    return suggestions

if __name__ == "__main__":
    print(create_tests_pr_template())