# Pull Request: Python Build Engineer

> Python build and packaging PR template.

---

## PR Overview

### Summary
<!-- Description of build changes -->

### Build System
- [ ] setuptools
- [ ] Poetry
- [ ] pipenv
- [ ] pyinstaller
- [ ] hatch

---

## Build Configuration

### pyproject.toml Changes
```toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "package-name"
version = "1.0.0"
```

### Package Distribution
- [ ] wheel created
- [ ] sdist created
- [ ] Executable (pyinstaller) created

---

## Testing

```bash
python -m build
pip install dist/*.whl
pytest -v
```

---

*End of Python Build PR Template*