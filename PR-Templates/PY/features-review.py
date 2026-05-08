#!/usr/bin/env python3
"""
Code Review PR Template
Use this template when submitting code for review.
"""

def create_review_pr_template():
    return '''## Pull Request: Code Review Request

### Overview
<!-- Quick summary of changes -->

### Change Type
- [ ] Feature addition
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests

### Self-Review Checklist
- [ ] Code follows style guidelines
- [ ] No debug code left
- [ ] Error handling included
- [ ] Logging added where appropriate
- [ ] Type hints added (if using Python)
- [ ] Docstrings added to new functions

### Testing Done
```bash
# Run tests
pytest -v

# Run type checker
mypy src/

# Run linter
flake8 src/
```

### Areas Needing Focus
<!-- Specific areas you'd like reviewers to pay attention to -->

### Related Issues
- Closes #XXX
- Related to #XXX

### Additional Context
<!-- Screenshots, diagrams, or notes that help reviewers understand -->
'''

def generate_review_comments(code_changes: list) -> dict:
    """Generate suggested review areas."""
    return {
        'complexity': 'Consider simplifying complex logic',
        'performance': 'Check for performance implications',
        'security': 'Review for security vulnerabilities',
        'maintainability': 'Ensure code is maintainable'
    }

def check_review_readiness(files: list) -> bool:
    """Check if PR is ready for review."""
    required = ['tests/', 'CHANGELOG.md']
    return all(any(r in f for r in required) for f in files[:2])

if __name__ == "__main__":
    print(create_review_pr_template())