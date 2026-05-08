# Pull Request: Code Review

> Comprehensive code review PR template for OSS projects.

---

## PR Overview

### Summary
<!-- Brief description of changes -->

### Type of Change
- [ ] Feature addition
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Test update

### Scope
- [ ] Single file
- [ ] Multiple files
- [ ] Full module
- [ ] Cross-cutting

---

## Changes Overview

### Files Changed
| File | Type | Lines Changed | Purpose |
|------|------|---------------|---------|
| file1.py | .py | +50 | Core functionality |
| file2.py | .py | +20 | Helper functions |

### Summary of Changes
```diff
- removed_function()
+ new_function()

# Added features:
- Feature A
- Feature B

# Removed:
- Deprecated method
```

---

## Code Quality Assessment

### Style Compliance
- [ ] Follows project style guide
- [ ] No linting errors (flake8/pylint)
- [ ] Format code (black/prettier)
- [ ] Naming conventions followed

### Type Safety
- [ ] Type hints added (Python)
- [ ] Types defined (TypeScript)
- [ ] No `any` types
- [ ] Interfaces used

### Documentation
- [ ] Docstrings complete
- [ ] README updated
- [ ] Inline comments clear
- [ ] API docs updated

---

## Security Review

### Security Checklist
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens present
- [ ] Authentication checks

### Potential Issues
| Issue | Severity | Location | Recommended Fix |
|-------|----------|----------|-----------------|
| None found | - | - | - |

---

## Performance Review

### Performance Considerations
- [ ] No N+1 queries
- [ ] Proper indexing
- [ ] Caching implemented
- [ ] Efficient algorithms

### Benchmark Results
```python
# Before: 100ms
# After: 50ms
# Improvement: 50%
```

---

## Testing

### Test Coverage
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Edge cases covered
- [ ] Error cases tested

### Test Results
```bash
$ pytest -v
======================== test session =========================
collected 50 items

test_file.py::TestClass::test_one PASSED                 [  2%]
test_file.py::TestClass::test_two PASSED                 [  4%]

======================== 50 passed in 2.5s =========================
```

### Test Commands Run
```bash
# Unit tests
pytest -v

# Type checking
mypy src/

# Linting
flake8 src/

# Security
bandit -r src/
```

---

## Areas Needing Focus

### Priority Review Areas
- [ ] **Security:** Authentication/authorization logic
- [ ] **Performance:** Database queries
- [ ] **Edge Cases:** Error handling
- [ ] **API:** Response format consistency

### Questions for Reviewer
1. Is the error handling sufficient?
2. Are there any race conditions?
3. Is the API backward compatible?

---

## Self-Review Checklist

### Pre-Submission
- [ ] No debug code (console.log, print statements)
- [ ] No hardcoded secrets/credentials
- [ ] Tests included for new code
- [ ] Documentation updated
- [ ] Commit messages are meaningful

### Code Standards
- [ ] Functions are small (< 50 lines)
- [ ] No code duplication
- [ ] DRY principle followed
- [ ] Single responsibility principle

### Error Handling
- [ ] Exceptions properly caught
- [ ] Error messages are helpful
- [ ] Logging present for errors

---

## Breaking Changes

### API Changes
- [ ] No breaking changes
- [ ] Deprecation notice added
- [ ] Migration guide included
- [ ] Version bumped

### Migration Example
```python
# Old (deprecated)
result = old_function(data)

# New
result = new_function(data)
# or
result = await new_function_async(data)
```

---

## Related Issues

- Closes #XXX
- Related to #XXX
- Blocks #XXX

---

## Additional Context

### Screenshots
<!-- If applicable, add screenshots of UI changes -->

### Diagrams
```
┌─────────────────────────────────────────┐
│           Request Flow                  │
├─────────────────────────────────────────┤
│ Client -> API -> Service -> Database    │
└─────────────────────────────────────────┘
```

### Testing Notes
- Test environment: [description]
- Test data: [description]
- Test credentials: [use secrets]

---

## Reviewer Notes

### For Maintainers
- Please verify security implications
- Check performance impact
- Ensure backward compatibility

### For Contributors
- Happy to iterate on feedback
- Available for questions
- Can provide additional context

---

## Approval Requirements

### Required Approvals
- [ ] Code review (1-2 reviewers)
- [ ] Security review (if applicable)
- [ ] Performance review (if applicable)

### Nice to Have
- [ ] Documentation review
- [ ] UX review (if UI changes)
- [ ] Product approval

---

## Post-Merge Tasks

- [ ] Delete feature branch
- [ ] Update related documentation
- [ ] Monitor CI/CD pipeline
- [ ] Close linked issues

---

*End of Code Review PR Template*