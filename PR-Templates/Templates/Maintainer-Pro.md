# Pull Request: Project Maintainer

> Maintenance and governance PR template for OSS projects.

---

## PR Overview

### Summary
<!-- Description of maintenance changes -->

### Type of Maintenance
- [ ] Dependency update
- [ ] Security patch
- [ ] Performance improvement
- [ ] Code cleanup (refactor)
- [ ] Documentation update
- [ ] CI/CD update
- [ ] Configuration change
- [ ] Bug fix

### Priority
- [ ] Critical - Security vulnerability
- [ ] High - Breaking functionality
- [ ] Medium - Enhancement
- [ ] Low - Optimization

---

## Changes Details

### Dependency Updates
| Package | Old Version | New Version | Type |
|---------|-------------|-------------|------|
| requests | 2.28.0 | 2.31.0 | Security |
| numpy | 1.23.0 | 1.24.0 | Major |
| pytest | 7.0.0 | 7.4.0 | Minor |

### Deprecations
| Item | Deprecated In | Removed In | Replacement |
|------|---------------|-------------|--------------|
| old_function | v1.0.0 | v2.0.0 | new_function |

### Configuration Changes
```yaml
# Before
setting:
  value: old_value

# After
setting:
  value: new_value
```

---

## Security Changes

### Vulnerabilities Fixed
| CVE | Severity | Affected | Fixed In |
|-----|----------|----------|----------|
| CVE-2023-1234 | High | <1.5.0 | 1.5.0 |
| CVE-2023-5678 | Medium | <1.4.0 | 1.4.0 |

### Security Checklist
- [ ] Dependencies audited
- [ ] No known vulnerabilities
- [ ] Security scan passed
- [ ] Secrets rotated

---

## Performance Impact

### Benchmarks
| Operation | Before | After | Change |
|-----------|--------|-------|--------|
| Query time | 100ms | 50ms | -50% |
| Memory | 100MB | 80MB | -20% |
| CPU | 50% | 40% | -20% |

### Optimization Details
- [ ] Caching added
- [ ] Queries optimized
- [ ] Algorithms improved
- [ ] Lazy loading implemented

---

## Testing

### Test Results
```bash
$ pytest -v
======================== test session =========================
50 passed in 2.5s
========================

$ npm test
========================
100 passed in 5s
========================
```

### Coverage
- [ ] Tests still passing
- [ ] Coverage maintained
- [ ] No regressions

---

## Migration Guide

### For Users
```bash
# Update command
pip install --upgrade package-name

# Or in package.json
npm install package@latest
```

### For Developers
```python
# Old (deprecated)
import old_module

# New
import new_module
```

### Breaking Changes
- [ ] No breaking changes
- [ ] Breaking with migration path
- [ ] Migration script provided

---

## Checklist

### Pre-Merge
- [ ] All tests passing
- [ ] Security scan clean
- [ ] Performance verified
- [ ] Documentation updated

### Release Preparation
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Package published

### Post-Merge
- [ ] Tag created
- [ ] Release published
- [ ] Announcement sent
- [ ] Dependencies monitored

---

## Documentation Updates

### Updated Files
- [ ] CHANGELOG.md
- [ ] README.md
- [ ] CONTRIBUTING.md
- [ ] API documentation

### New Documentation
- [ ] Migration guide
- [ ] Upgrade guide
- [ ] Breaking changes doc

---

## Governance

### Review Requirements
- [ ] Requires 2 maintainers
- [ ] Security review required
- [ ] Performance review required

### Consensus
- [ ] Maintainers approve
- [ ] No objections
- [ ] Community feedback incorporated

---

## Related Issues

- Closes #XXX
- Fixes #XXX
- Related to #XXX

---

## Additional Notes

### Long-term Impact
- Improves maintainability
- Reduces technical debt
- Improves security posture

### Monitoring Plan
- [ ] Monitor for issues
- [ ] Track performance
- [ ] Gather user feedback

---

*End of Project Maintainer PR Template*