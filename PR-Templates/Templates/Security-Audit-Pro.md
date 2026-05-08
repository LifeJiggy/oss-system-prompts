# Pull Request: Security Auditor

> Security audit and vulnerability fix PR template.

---

## PR Overview

### Summary
<!-- Description of security changes -->

### Vulnerability Type
- [ ] XSS
- [ ] SQL Injection
- [ ] CSRF
- [ ] Authentication bypass
- [ ] Information disclosure

---

## Security Fixes

### Vulnerability Details
| CVE | Severity | Location | Fix Applied |
|-----|----------|----------|-------------|
| N/A | High | src/auth.py | Input validation added |

### Before
```python
# Vulnerable code
query = f"SELECT * FROM users WHERE id = {user_id}"
```

### After
```python
# Fixed code
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

---

## Security Testing

### Tools Used
- [ ] OWASP ZAP
- [ ] Bandit
- [ ] npm audit
- [ ] SNYK

---

## Checklist

- [ ] Security scan passed
- [ ] No vulnerabilities
- [ ] Dependencies audited

---

*End of Security PR Template*