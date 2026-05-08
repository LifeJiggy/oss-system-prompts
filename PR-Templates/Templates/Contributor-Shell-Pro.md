# Pull Request: Shell Contributor

> Shell/Bash contribution PR template for shell script projects.

---

## PR Overview

### Summary
<!-- Description of shell script changes -->

### Shell Type
- [ ] Bash
- [ ] Zsh
- [ ] POSIX sh
- [ ] Dash

---

## Shell-Specific Changes

### POSIX Compliance
- [ ] POSIX compatible
- [ ] #!/bin/sh shebang used
- [ ] No bashisms
- [ ] Works on multiple shells

### Error Handling
```bash
#!/bin/bash
set -euo pipefail

# Exit on error
set -e

# Exit on undefined variable
set -u

# Exit on pipe failure
set -o pipefail
```

---

## Files Changed

### Shell Scripts
| File | Purpose | Executable |
|------|---------|------------|
| scripts/build.sh | Build script | Yes |
| scripts/deploy.sh | Deploy script | Yes |
| scripts/utils.sh | Utilities | No |

### Permissions
- [ ] Executable bit set (chmod +x)
- [ ] Proper ownership

---

## Testing

### ShellCheck
```bash
# Run shellcheck
shellcheck scripts/*.sh

# Fix issues
shellcheck -x scripts/*.sh
```

### Test Results
```
✓ No shellcheck errors
✓ POSIX compliance verified
✓ Works on: bash, zsh, dash
```

---

## Checklist

- [ ] ShellCheck passes
- [ ] POSIX compatible
- [ ] Error handling present
- [ ] Help message (-h/--help)
- [ ] Exit codes appropriate

---

## Related Issues

- Closes #XXX
- Related to #XXX

---

*End of Shell Contributor PR Template*