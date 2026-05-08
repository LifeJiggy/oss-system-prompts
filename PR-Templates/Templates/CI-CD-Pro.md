# Pull Request: CI/CD Engineer

> CI/CD pipeline PR template.

---

## PR Overview

### Summary
<!-- Description of CI/CD changes -->

### Pipeline Type
- [ ] GitHub Actions
- [ ] GitLab CI
- [ ] Jenkins
- [ ] CircleCI
- [ ] Travis CI

---

## Pipeline Changes

### .github/workflows/ci.yml
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
```

---

## Verification

- [ ] Pipeline runs successfully
- [ ] Tests pass in CI
- [ ] Artifacts created

---

*End of CI/CD PR Template*