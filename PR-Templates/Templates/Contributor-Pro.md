# Pull Request: Contributor

> General contribution guidelines PR template for OSS projects.

---

## PR Overview

### Summary
<!-- Brief description of contribution -->

### Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation
- [ ] Test update
- [ ] Code refactor
- [ ] CI/CD update

### Scope
- [ ] Single file fix
- [ ] Multiple files
- [ ] Entire module
- [ ]跨域更改

---

## Files Changed

### Summary Table
| File | Changes | Type | Purpose |
|------|---------|------|---------|
| src/module.py | +30, -5 | .py | Core functionality |
| tests/test_module.py | +20 | .py | Test coverage |
| README.md | +10 | .md | Documentation |

### Changes Breakdown
```diff
# Statistics
+100 lines added
-20 lines removed
3 files changed
```

---

## Contribution Checklist

### Pre-Contribution
- [ ] Read CONTRIBUTING.md
- [ ] Read CODE_OF_CONDUCT.md
- [ ] Understood license (MIT/Apache/etc)
- [ ] Joined community (Discord/Slack/Forum)

### Code Quality
- [ ] Follows project style guide
- [ ] No linting errors
- [ ] Types properly defined
- [ ] Docstrings added
- [ ] No code duplication

### Testing
- [ ] Tests written for new code
- [ ] Tests pass locally
- [ ] Test coverage maintained/increased
- [ ] Edge cases covered

### Documentation
- [ ] README updated (if needed)
- [ ] API docs updated (if needed)
- [ ] Examples added (if needed)
- [ ] Comments added for complex logic

### Commit Standards
- [ ] Commit messages are clear
- [ ] Commits are atomic
- [ ] No merge commits in PR
- [ ] Rebased on main branch

---

## Testing

### Local Testing
```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Run tests
pytest -v
npm test

# Run linting
flake8 .
npm run lint

# Type checking
mypy src/
npx tsc --noEmit
```

### Test Results
```
======================== test session =========================
Platform: Linux
Python: 3.11.0
pytest: 7.4.0
========================
collected 50 items

test_module.py::test_one PASSED                           [  2%]
test_module.py::test_two PASSED                           [  4%]
========================
50 passed in 2.5s
========================
```

### Coverage Report
| Module | Coverage | Change |
|--------|----------|--------|
| src/core | 85% | +2% |
| src/utils | 92% | +1% |
| Overall | 88% | +1.5% |

---

## Additional Notes

### Motivation
Why this contribution was made:
- Fixes bug #123
- Adds requested feature
- Improves performance

### Approach
How the contribution was implemented:
1. Analyzed existing code
2. Implemented solution
3. Added tests
4. Verified functionality

### Alternatives Considered
- Approach A: [why not chosen]
- Approach B: [why not chosen]

---

## Breaking Changes

### API Changes
- [ ] No breaking changes
- [ ] Breaking changes with migration path
- [ ] Deprecation notices added

### Migration Guide
```python
# Old API (deprecated in X.Y.Z)
old_function()

# New API (available in X.Y.Z)
new_function()
```

---

## Related Issues

- Fixes #123
- Closes #456
- Related to #789
- Part of #101

---

## Additional Context

### Environment
- OS: Ubuntu 22.04
- Python: 3.11
- Node: 18.x

### Dependencies
| Package | Version | Reason |
|---------|---------|--------|
| dependency-a | ^1.0 | Required for X |
| dependency-b | ^2.0 | Used in Y |

---

## Author Information

### First Contribution?
- [ ] Yes - first PR to this project
- [ ] No - has contributed before

### Availability
- Available for questions
- Can iterate on feedback
- Willing to make changes

---

## License Agreement

- [x] I confirm that my contribution is made under the terms of the project license
- [x] I confirm I have the rights to submit this contribution

---

## Checklist Final

- [ ] All tests passing
- [ ] Code is reviewed
- [ ] Documentation complete
- [ ] Ready for merge

---

*End of Contributor PR Template*