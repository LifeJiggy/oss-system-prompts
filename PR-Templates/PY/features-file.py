#!/usr/bin/env python3
"""
File Feature PR Template
Use this when adding/modifying single files in Python projects.
"""

def create_file_pr_template():
    return '''## Pull Request: File Feature

### Summary
<!-- Brief description of what this PR does -->

### Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that causes existing functionality to change)

### Files Changed
<!-- List files changed -->
- `src/module.py`: Added new function

### Changes Made
<!-- Detailed description of changes -->

### Testing
- [ ] Unit tests added/updated
- [ ] Tests pass locally: `python -m pytest`
- [ ] Type checking passed: `mypy src/`

### Checklist
- [ ] Code follows PEP 8 style guide
- [ ] Documentation updated
- [ ] Commit messages are meaningful
- [ ] PR title follows conventional commits

### Additional Notes
<!-- Any additional context or notes -->
'''

def validate_file_changes(files: list) -> bool:
    """Validate that file changes are appropriate."""
    allowed_extensions = ['.py', '.pyi', '.txt', '.md', '.yml', '.yaml']
    for file in files:
        if not any(file.endswith(ext) for ext in allowed_extensions):
            return False
    return True

def get_affected_modules(file_path: str) -> list:
    """Get list of affected Python modules."""
    parts = file_path.split('/')
    modules = []
    for i in range(len(parts)):
        if parts[i].endswith('.py'):
            module = '.'.join(parts[:i+1])
            modules.append(module)
    return modules

if __name__ == "__main__":
    print(create_file_pr_template())