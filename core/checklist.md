# Pre-Submission Checklist — Every PR Must Pass

## Overview

This checklist must be completed before every single PR submission. No exceptions. This is a comprehensive guide designed to catch 99% of issues before reviewers see your code. Each phase builds on the previous, so work through them in order.

---

## The Golden Rule

**If you cannot check every item in this list, DO NOT SUBMIT YOUR PR.**

This checklist exists because contributors learned it the hard way. Contributors submitted many PRs with blocker findings before getting it right. Every failure on this list has caused a PR rejection in the past. Use it as your shield, not your afterthought.

---

## Phase 1: Code Quality — The Foundation

### 1.1 Syntax and Compilation Verification

Before anything else, your code must compile. Never assume your code works because it "looks right."

#### Python Specific
- [ ] `python -c "import py_compile; py_compile.compile('your_file.py', doraise=True)"` succeeds
- [ ] `python -m mypy your_file.py` passes (if type checking enabled)
- [ ] `python -m flake8 your_file.py` shows no issues
- [ ] All imports can be executed without errors
- [ ] No `IndentationError` or `NameError` in any file

#### The Compilation Test Protocol
Run these commands in order. Stop at the first failure and fix it before proceeding.

```bash
# For every file in your diff
for f in $(git diff --name-only origin/main...HEAD); do
  python -c "import py_compile; py_compile.compile('$f', doraise=True)" || exit 1
done

# Run type checker
python -m mypy your_file.py

# Run linter
python -m flake8 your_file.py
```

### 1.2 Import Management

Imports are the most common source of build failures and runtime errors. Every import must be necessary, correct, and properly scoped.

#### Import Necessity
- [ ] Every imported symbol is actually used in the file
- [ ] No wildcard imports (`from module import *`) unless absolutely necessary
- [ ] No unused imports (especially `import os` without `os.` usage)
- [ ] No duplicate imports of the same symbol

#### Import Correctness
- [ ] All relative imports resolve correctly
- [ ] No circular imports
- [ ] No importing from non-existent paths

#### Import Style
- [ ] Standard library imports come first
- [ ] Third-party imports come second
- [ ] Local/application imports come last
- [ ] Groups are separated by blank lines
- [ ] Imports are sorted alphabetically within groups

Example of proper import ordering:
```python
# 1. Standard library
import json
import os
from pathlib import Path
from typing import Any, Dict, Optional

# 2. Third-party
import yaml

# 3. Project internal
from project_constants import get_project_home
from project.registry import registry
```

### 1.3 Type Safety and Language Best Practices

The project is a large codebase with established conventions. Type hints are the contract between functions.

#### Function Types
- [ ] All function parameters have explicit type annotations
- [ ] All function return types are explicitly declared
- [ ] No use of `Any` unless absolutely necessary
- [ ] Optional parameters use `Optional[Type]` or `Type | None`

#### Variable Types
- [ ] All variables have proper type annotations
- [ ] No broad `except Exception` without specific exception types
- [ ] No mutable default arguments (`def foo(x: list = [])`)

#### Code Structure
- [ ] Functions use `snake_case` (Python), `camelCase` (JS/TS), or project convention
- [ ] Classes use `CamelCase`
- [ ] Constants use `UPPER_CASE`
- [ ] No hardcoded magic numbers without named constants

### 1.4 Code Structure and Architecture

The structure of your code matters as much as the content. Well-structured code is easier to review and maintain.

#### Pattern Compliance
- [ ] Code follows existing patterns in the codebase exactly
- [ ] Tool/module registration uses the project's module registry with all required fields
- [ ] Plugin code uses plugin context methods correctly
- [ ] File organization matches project conventions

#### Refactoring Prohibition
- [ ] No refactoring mixed with new features in the same PR
- [ ] No renaming of variables/functions unless part of the fix
- [ ] No moving code between files unless necessary for the change
- [ ] No style changes unless explicitly requested

#### Code Cleanliness
- [ ] No debug code (print, logging for debugging)
- [ ] No TODO comments without corresponding issue
- [ ] No commented-out code left behind
- [ ] No empty catch blocks (`except: pass`)
- [ ] No print statements in production code (use `logger`)

#### Dead Code Detection
- [ ] No unused functions
- [ ] No unused variables
- [ ] No unreachable code
- [ ] No orphan `except` blocks
- [ ] No unused constants

### 1.5 Security Best Practices

Security vulnerabilities are the fastest way to get a PR rejected.

#### Injection Prevention
- [ ] No SQL injection vulnerabilities — use parameterized queries
- [ ] No command injection — use argv arrays, not `shell=True`
- [ ] No `os.system()` calls
- [ ] No f-strings in SQL queries (`cursor.execute(f"...")`)

#### Secret Management
- [ ] No hardcoded API keys
- [ ] No hardcoded passwords
- [ ] No hardcoded tokens or secrets
- [ ] No fake-looking secrets in tests (`sk_live_...`, `AKIA...`)
- [ ] Use `TEST_KEY_` prefix for all fake credentials in tests

#### Input Validation
- [ ] All user inputs are validated
- [ ] SQL identifiers validated against regex (`^[a-zA-Z_][a-zA-Z0-9_]*$`)
- [ ] Path traversal prevented (use validated paths, not raw user input)
- [ ] Enum/YAML fields validated against allowed values

#### Path Safety
- [ ] No path traversal vulnerabilities (`../` attacks)
- [ ] File paths use project home path, not hardcoded user home directory
- [ ] All paths use `encoding="utf-8"` in `open()` calls
- [ ] No POSIX-only paths (`/tmp`, `/dev/null`, `~/Desktop`)
- [ ] No Windows-only paths (`C:\`, `\Users\`) in cross-platform code

### 1.6 Resource Management

Resources are finite. Memory, file handles, network connections all need proper management.

#### Connection Management
- [ ] Every network connection has proper error handling
- [ ] Every database connection uses `try/finally` pattern
- [ ] Connections are properly closed on errors
- [ ] Connection pools are properly configured and limited

#### File Operations
- [ ] All file operations use atomic writes (tmp + replace pattern)
- [ ] File handles are closed in `finally` blocks
- [ ] Temporary files are cleaned up

#### Signal Handling
- [ ] All signal usage has platform guards (`if hasattr(signal, "SIGALRM")`)
- [ ] No POSIX-only signals on Windows
- [ ] No Windows-only API calls on POSIX

---

## Phase 2: Testing — Prove It Works

### 2.1 Test Coverage Requirements

New code without tests is incomplete code. Tests are not optional.

#### Coverage Mandates
- [ ] New code has corresponding tests
- [ ] Tests cover the success path (happy path)
- [ ] Tests cover error paths (what happens when things go wrong)
- [ ] Tests cover edge cases (boundaries, empty inputs, nulls)
- [ ] Tests cover security boundaries (injection, traversal)

#### Test File Organization
- [ ] Test files are in `tests/` directory matching source structure
- [ ] Test files follow naming convention: `test_*.py`
- [ ] Tests for `src/my_module.py` go in `tests/test_my_module.py`

### 2.2 Test Quality Standards

A test that always passes is worse than no test at all.

#### Behavioral Verification
- [ ] Tests actually verify the behavior, not just "no error thrown"
- [ ] Assertions check specific values, not just types
- [ ] Tests verify state changes when applicable
- [ ] Tests verify data shape and content

#### Test Isolation
- [ ] Each test runs independently
- [ ] Tests do not depend on execution order
- [ ] Tests clean up after themselves
- [ ] No module state pollution between tests

#### External Dependencies
- [ ] Tests do not depend on external services
- [ ] Tests use mocking (`unittest.mock.patch()`) for external calls
- [ ] Tests use isolated environment fixture from test configuration
- [ ] Tests do not write to real user home directory or production paths

#### Flakiness Prevention
- [ ] No sleep-based timing in tests
- [ ] No network-dependent tests
- [ ] No tests that depend on system time
- [ ] No tests that depend on file system state

### 2.3 Regression Testing

Your changes must not break existing functionality.

#### Pre-Existing Test Verification
- [ ] All existing tests pass before making changes
- [ ] Tests in the same module pass after changes
- [ ] Tests in dependent modules pass after changes

#### Full Test Suite
- [ ] Full test suite passes (`python -m pytest tests/ -q`)
- [ ] Any test failures are pre-existing and documented
- [ ] No new warnings are introduced

---

## Phase 3: Change Management — What Actually Changed

### 3.1 Diff Integrity

The diff is what reviewers see. Keep it small, focused, and clean.

#### Scope Control
- [ ] Only intended files are changed
- [ ] Under 10 files changed (ideally under 5)
- [ ] Under 500 lines added (ideally under 200)
- [ ] No changes to files from other subsystems
- [ ] No changes to files unrelated to the issue

#### Change Categories
- [ ] New files are properly added
- [ ] Modified files contain only relevant changes
- [ ] Deleted files are actually unused
- [ ] No unintentional whitespace changes

### 3.2 Commit Quality

Commits tell the story of your changes.

#### Commit Structure
- [ ] Single commit (or clear reason for multiple)
- [ ] Each commit is self-contained and functional
- [ ] No merge commits in the PR branch
- [ ] Rebased if necessary to clean up history

#### Commit Messages
- [ ] First line is under 72 characters
- [ ] First line describes what changed, not how
- [ ] Body explains why the change was made
- [ ] Body references issue numbers if applicable

```
feat(tools): add database schema inspection tool

Implements PRAGMA table_info and schema listing for SQLite.
Handles identifier validation and parameterized queries.
Required for database debugging workflows.

Fixes #123
```

### 3.3 Branch Management

The branch is your workspace. It should be clean, up-to-date, and based on the correct starting point.

#### Branch Basics
- [ ] Branched from origin/main (not local stale main)
- [ ] Branch is up to date with origin/main
- [ ] No unresolved conflicts
- [ ] Branch name follows convention (e.g., `feat/tool-name`, `fix/issue-description`)

#### Update Protocol
```bash
git fetch origin
git rebase origin/main
# Resolve any conflicts
git add .
git rebase --continue
git push --force-with-lease
```

### 3.4 Phantom Reference Check

- [ ] Every tool name in the core tools list has a corresponding module file
- [ ] Every name in the toolset definitions dict resolves to an existing module
- [ ] No references to tools from other PRs that aren't in this branch

---

## Phase 4: Documentation — Explain Your Work

### 4.1 PR Description Requirements

The PR description is your first communication with reviewers.

#### Description Components
- [ ] PR body matches diff — every paragraph corresponds to code changes
- [ ] Explains WHAT changed (concise summary)
- [ ] Explains WHY it changed (rationale)
- [ ] Lists user-facing impact
- [ ] Lists developer impact (API changes, etc.)
- [ ] Includes screenshots for UI changes

#### Description Quality
- [ ] No exaggeration — don't describe features not implemented
- [ ] Links to related issues/PRs
- [ ] Explains testing approach
- [ ] Documents any limitations or trade-offs

### 4.2 Code Documentation

Code documents itself through clear naming, but complex logic needs explicit documentation.

#### Required Documentation
- [ ] Public functions have docstrings (Args, Returns, Raises)
- [ ] Complex logic has explanatory comments
- [ ] Non-obvious code has comments explaining why
- [ ] Constants have comments explaining their purpose

```python
def save_conversation_state(session_id: str, messages: list) -> bool:
    """Save conversation state to disk for crash recovery.

    Args:
        session_id: Current session identifier
        messages: Conversation messages in OpenAI format

    Returns:
        True if state was saved successfully
    """
```

### 4.3 Additional Documentation

- [ ] New config options documented in PR
- [ ] Environment variables documented if added
- [ ] Breaking changes documented prominently

---

## Phase 5: Communication — Professional Engagement

### 5.1 Pre-Push Communication

- [ ] No unaddressed feedback from previous PRs
- [ ] All requested changes are implemented
- [ ] Self-reviewed your own diff
- [ ] Walked through the code as if reviewing it

### 5.2 Post-Push Commitment

- [ ] Will respond within 48 hours to any review comments
- [ ] Will accept feedback professionally
- [ ] Will fix issues promptly
- [ ] Will NOT push without user approval

---

## Quick Reference Commands

### Syntax and Type Checking
```bash
python -c "import py_compile; py_compile.compile('file.py', doraise=True)"
python -m mypy file.py
python -m flake8 file.py
```

### Test Execution
```bash
python -m pytest tests/path/to/test_file.py -v
python -m pytest tests/ -q -n 4
python -m pytest tests/ -q -n 0  # No xdist for debugging
```

### Security Scanning
```bash
# SQL injection
grep -rn 'f"\|f\'' src/ --include="*.py" | grep -i "execute\|WHERE\|INSERT\|DELETE"

# Connection leaks
grep -rn "\.connect\|\sqlite3\.connect" src/ --include="*.py" | grep -v "finally"

# Shell injection
grep -rn "os\.system\|shell=True" src/ --include="*.py"

# Secrets in tests
grep -rn "sk_live\|AKIA" tests/ --include="*.py"

# Hardcoded paths
grep -rn "Path\.home()\|~/" . --include="*.py" | grep -v test | grep -v ".pyc"

# Platform-unsafe signals
grep -rn "signal\.SIG" . --include="*.py" | grep -v hasattr | grep -v "sys.platform"
```

### Diff Analysis
```bash
git diff --stat origin/main...HEAD
git diff origin/main...HEAD
git log --oneline origin/main..HEAD | wc -l  # Should be 1
```

---

## Pass Criteria — The Final Gate

### Before You Submit

Every single item in this checklist must be checked YES. If any item is NO:

1. DO NOT SUBMIT
2. Fix the NO item
3. Re-run the checklist
4. Only submit when everything is YES

### The 10 Absolute Rules

1. **Code compiles** — No syntax errors, no type errors, no lint errors
2. **Tests exist** — New code has corresponding tests
3. **Tests pass** — All tests pass, no regressions
4. **Diff is small** — Under 10 files, under 500 lines
5. **Only relevant changes** — No unrelated modifications
6. **PR body matches diff** — No exaggeration, no phantom features
7. **Security checked** — No SQL injection, no connection leaks, no secrets
8. **Resources managed** — Proper cleanup, no leaks
9. **Patterns followed** — Exact match to existing code style
10. **Communication ready** — Will respond within 48 hours

---

## Common Rejection Reasons

From collective contributor experience:

1. **SQL injection via f-string** — BLOCKER, immediate rejection
2. **Connection leaks** — No `try/finally` on resources
3. **Fake/placeholder implementation** — SHA256 as "embeddings"
4. **Phantom references** — Referencing non-existent modules
5. **Merge pollution** — 2559 files from wrong base branch
6. **PR body doesn't match diff** — Describing unimplemented features
7. **Missing tests** — New code without tests
8. **Wrong patterns** — Did not follow existing code style
9. **Pushing without approval** — Damages trust
10. **Platform crashes** — OS-specific code without guards

---

## Emergency Protocol

### If Reviewer Requests Changes

1. Read the feedback completely
2. Categorize: P1 (must fix) vs P2 (should fix) vs P3 (nice to have)
3. Fix every P1 and P2 before re-requesting
4. Re-run full checklist after fixes
5. Respond with clear format: `> **[P1] Fixed X by doing Y** ✅`

### If PR Is Rejected

1. Read the rejection reason carefully
2. Do not argue or defend
3. Ask what would make it acceptable
4. Fix the issues
5. Start fresh with proper process

---

## Summary Checklist

Run through this final summary before pushing:

- [ ] Syntax check passes (compilation on every file)
- [ ] Type check passes
- [ ] Tests pass
- [ ] Diff under 10 files
- [ ] Diff under 500 lines
- [ ] No SQL injection in code
- [ ] No connection leaks
- [ ] No shell injection
- [ ] No secrets in code
- [ ] All imports resolved
- [ ] No dead code
- [ ] No unused imports
- [ ] Tests added for new code
- [ ] Branch from origin/main
- [ ] Single commit
- [ ] PR body matches diff
- [ ] Will respond within 48 hours
- [ ] User approved push

---

## Final Reminder

**If you cannot check every item in this checklist, DO NOT SUBMIT YOUR PR.**

This checklist exists because contributors learned it the hard way. Every failed item has caused a PR rejection in the past. Use it to protect yourself from rejection.

---

## Phase 6: Cross-Project Verification Checklist

This section provides a **universal checklist** that applies to any open source project. Use it when contributing to repositories outside the project's specific ecosystem — it covers the common expectations across Python, JavaScript, Rust, Go, Java, C/C++, Ruby, C#, Swift, and other ecosystems.

### 6.1 Universal Pre-Submission Checklist

These items apply to **every** pull request in **any** open source project.

#### Project Setup Verification
- [ ] Project-specific `CONTRIBUTING.md` read and followed
- [ ] Code of Conduct acknowledged and adhered to
- [ ] Issue or feature request linked in PR description
- [ ] PR template (if one exists) filled out completely — no sections left blank
- [ ] Correct base branch selected (`main`, `master`, `develop`, or as specified)
- [ ] Developer Certificate of Origin (DCO) signed if project requires it
- [ ] Required CLA (Contributor License Agreement) signed and on file

#### CI and Build
- [ ] All CI checks pass on the PR branch (wait for green status)
- [ ] Build completes without errors in local environment
- [ ] Dependencies are up-to-date and compatible with project requirements
- [ ] No regressions in build output (size, warnings, deprecation notices)
- [ ] No flaky CI jobs — all failures are real, not intermittent
- [ ] CI cache is warm (or cache-busting logic is verified)

#### Documentation
- [ ] Inline code comments added for non-obvious logic
- [ ] Public API documented (docstrings, JSDoc, godoc, etc.)
- [ ] README updated if behavior or setup changes
- [ ] Wiki pages or docs site updated if applicable
- [ ] `CHANGELOG.md` or equivalent release notes entry added if required by project
- [ ] Migration guide or upgrade notes written for breaking changes
- [ ] Example code or usage snippets updated in documentation
- [ ] Configuration documentation updated if new options introduced
- [ ] API reference docs regenerated if applicable (OpenAPI, Sphinx, TypeDoc)

#### Compatibility and Safety
- [ ] Backward compatibility maintained wherever possible
- [ ] Breaking changes justified and clearly documented
- [ ] Deprecation notices added for removed functionality (with migration path)
- [ ] Deprecated code paths warned with a versioned removal timeline
- [ ] Feature flags used for risky new functionality (flag gating)
- [ ] Unicode and internationalization considered (UTF-8 everywhere, locale-aware formatting)
- [ ] Timezone handling verified (UTC storage with local display)
- [ ] Cross-platform compatibility verified (Windows, macOS, Linux)

#### Performance
- [ ] Performance impact of changes considered and benchmarked
- [ ] No obvious performance regressions (extra allocations, N+1 queries, etc.)
- [ ] Resource usage (memory, CPU, disk I/O) evaluated for hot paths
- [ ] Large refactors avoid unnecessary recomputation
- [ ] Lazy loading used for expensive resources when possible
- [ ] Caching strategy considered for repeated computations
- [ ] Async/non-blocking I/O used for long operations (if applicable)

#### Security
- [ ] Security implications of changes reviewed
- [ ] No secrets, credentials, or tokens committed (check using scanner)
- [ ] No hardcoded IP addresses, URLs pointing to internal infrastructure
- [ ] No large binary files (`.exe`, `.dll`, `.so`, `.whl`, `.jar`) in the diff
- [ ] `.gitignore` updated if new generated artifacts were produced
- [ ] No accidentally tracked lockfiles or build artifacts
- [ ] Cryptographic operations use standard libraries (no custom crypto)
- [ ] Rate limiting considered for exposed endpoints or APIs
- [ ] CSRF/XSS/SQLi protections verified for web-facing changes
- [ ] Log sanitization — no sensitive data in logs (PII, tokens, passwords)
- [ ] Dependency vulnerability scan passed (`npm audit`, `cargo audit`, `pip audit`)

#### Accessibility and Usability
- [ ] UI changes have appropriate ARIA labels or accessibility attributes
- [ ] Keyboard navigation works for all new UI elements
- [ ] Color contrast meets WCAG 2.1 AA standards for UI changes
- [ ] Error messages are user-friendly and actionable
- [ ] Loading states and empty states handled in UI components

#### Git Hygiene
- [ ] Signed commits if project requires DCO or GPG signing
- [ ] Branch is up to date with the target branch (rebased, not merged)
- [ ] No merge conflicts with target branch
- [ ] No unintentional submodule changes or vendor directory modifications
- [ ] No large files in commit history (>10MB) — use Git LFS if needed
- [ ] `.gitattributes` respected (LF vs CRLF, binary file handling)

### 6.2 Language-Specific Checklist Extensions

Different languages have different tooling expectations. Select your language below.

#### Python
- [ ] Virtual environment activated (`.venv` / `venv` / `virtualenv`)
- [ ] `requirements.txt`, `Pipfile`, or `pyproject.toml` updated with new dependencies
- [ ] `uv.lock` / `poetry.lock` / `Pipfile.lock` regenerated
- [ ] Ruff passes (`ruff check .`)
- [ ] `mypy` passes in strict mode (`mypy --strict`)
- [ ] `flake8` passes if configured (`flake8 .`)
- [ ] `pylint` passes if configured (`pylint my_package/`)
- [ ] `pytest` coverage at or above project threshold (`pytest --cov=my_package`)
- [ ] `bandit` security scanner passes (`bandit -r my_package/`)
- [ ] No `print()` calls left in production code — use `logging`
- [ ] Type hints added for all new public functions
- [ ] No mutable default arguments (`def foo(x=[])`)
- [ ] Async functions use proper `async`/`await` patterns
- [ ] Context managers used for resource management (`with` statements)

#### JavaScript / TypeScript
- [ ] Lockfile (`package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`) updated
- [ ] `eslint` passes with project config (`npx eslint src/`)
- [ ] `prettier` formatting applied (`npx prettier --check src/`)
- [ ] TypeScript compiles with `strict: true` (`npx tsc --noEmit`)
- [ ] No `any` types in new code (exceptions documented)
- [ ] No `console.log()` left in production code
- [ ] Bundle size impact evaluated (`npx vite build` or `npx webpack --json`)
- [ ] Tests pass (`npm test` / `yarn test` / `pnpm test`)
- [ ] Type definitions exported if library code changed
- [ ] ESM/CJS compatibility maintained if dual-package
- [ ] Tree-shaking verified — no unnecessary side effects in imports
- [ ] React hooks dependency arrays correct (exhaustive-deps rule)
- [ ] No memory leaks from event listeners or subscriptions
- [ ] Browser compatibility verified (polyfills if targeting older browsers)

#### Rust
- [ ] `cargo check` passes with no warnings
- [ ] `cargo clippy` passes with no warnings (`cargo clippy -- -D warnings`)
- [ ] `cargo fmt` applied (`cargo fmt --check`)
- [ ] `cargo test` passes with full suite (`cargo test --all-features`)
- [ ] `cargo audit` passes for dependency vulnerabilities
- [ ] No `unwrap()` or `expect()` in production code (use `?` or proper error handling)
- [ ] `unsafe` blocks documented with safety invariants
- [ ] Public API has `#[must_use]` annotations where appropriate
- [ ] Feature flags are additive (Cargo convention)
- [ ] Documentation tests pass (`cargo test --doc`)
- [ ] MSRV (Minimum Supported Rust Version) maintained
- [ ] No `#[allow(dead_code)]` without justification
- [ ] No `dbg!()` calls left in production code
- [ ] Error types implement `std::error::Error` for library crates

#### Go
- [ ] `go fmt ./...` passes (formatting is non-negotiable)
- [ ] `go vet ./...` passes with no warnings
- [ ] `go mod tidy` run — `go.mod` and `go.sum` clean
- [ ] `golangci-lint` passes (`golangci-lint run ./...`)
- [ ] All tests pass (`go test ./...`)
- [ ] Race detector enabled (`go test -race ./...`)
- [ ] No `context.Background()` where `context.TODO()` would be more honest
- [ ] No global state mutation in tests (parallel-safe)
- [ ] Error handling uses idiomatic Go (`if err != nil`)
- [ ] Exported symbols have doc comments
- [ ] Interface satisfaction verified (compile-time check with `var _ Interface = &Type{}`)
- [ ] No `init()` functions unless absolutely necessary
- [ ] `go mod verify` passes (checksums match)
- [ ] No `//nolint` directives without justification comment

#### Java / Kotlin (JVM)
- [ ] Maven Wrapper (`mvnw`) or Gradle Wrapper (`gradlew`) used — no system-installed builds
- [ ] `mvn clean verify` or `./gradlew build` passes
- [ ] Checkstyle passes (`mvn checkstyle:check` or configured Gradle task)
- [ ] SpotBugs / PMD / Error Prone passes if configured
- [ ] No `System.out.println()` in production code
- [ ] Logging framework used consistently (SLF4J, Log4j, etc.)
- [ ] Integration tests pass (`mvn verify -Pintegration` or `./gradlew integrationTest`)
- [ ] No raw `null` returns — use `Optional` or `@Nullable` annotations
- [ ] Public APIs annotated with `@NonNull` / `@Nullable` where applicable
- [ ] No checked exceptions swallowed without logging or rethrow
- [ ] Lombok annotations used correctly (no `@Data` on JPA entities without careful review)
- [ ] Reactive streams / coroutines handled correctly (no blocking calls in reactive chains)
- [ ] No `Thread.sleep()` in tests — use awaitility or similar

#### C / C++
- [ ] Builds pass with CMake / Make / Meson (`cmake --build build`)
- [ ] `clang-format` or `clang-tidy` passes with project config
- [ ] No compiler warnings with `-Wall -Wextra -Wpedantic` (or equivalent)
- [ ] Valgrind / ASan / UBSan passes for memory safety
- [ ] No buffer overflows, format string vulnerabilities, or use-after-free
- [ ] Header-only changes verified for ODR violations
- [ ] Public headers have `extern "C"` guards for C++ consumers
- [ ] `#pragma once` or traditional include guards consistently used
- [ ] No `#define` constants where `constexpr` or `enum` would work
- [ ] RAII used for resource management (no raw `new`/`delete`)
- [ ] Move semantics considered for performance-critical paths
- [ ] No `using namespace std;` in header files
- [ ] No C-style casts in C++ code — use `static_cast`, `dynamic_cast`, etc.

#### Ruby
- [ ] `rubocop` passes with project config (`rubocop --parallel`)
- [ ] `bundle exec rspec` passes with full test suite
- [ ] No `puts` or `p` calls left in production code — use Rails logger or `Logging`
- [ ] Database migrations reversible (`change` method or `up`/`down` pair)
- [ ] `bundler` audit passes (`bundle audit check --update`)
- [ ] N+1 query check completed (use `bullet` gem in development)
- [ ] I18n strings externalized — no hardcoded text in views/controllers
- [ ] Strong parameters configured for mass assignment protection
- [ ] `db/migrate` schema version matches `schema.rb`
- [ ] No commented-out code in migration files
- [ ] Route ordering verified — RESTful routes follow convention
- [ ] `yarn build` or `webpack` passes if frontend assets bundled
- [ ] `brakeman` security scan passes (`brakeman -q`)
- [ ] `ruby -c` syntax check passes for all changed files

#### C# / .NET
- [ ] `dotnet build` passes with no warnings (`dotnet build --no-restore`)
- [ ] `dotnet test` passes with full suite (`dotnet test --no-build`)
- [ ] `dotnet format` passes (`dotnet format --verify-no-changes`)
- [ ] NuGet packages restored and `packages.lock.json` updated
- [ ] No `Console.WriteLine()` in production code — use `ILogger<T>`
- [ ] Async all the way — no `.Result` or `.Wait()` in async code paths
- [ ] `ConfigureAwait(false)` used in library code
- [ ] `IDisposable` implemented correctly for unmanaged resources
- [ ] Nullable reference types enabled (`#nullable enable`) in new files
- [ ] No magic strings — use `nameof()` where applicable
- [ ] LINQ queries reviewed for performance (avoid unintended client-side evaluation)
- [ ] CA (Code Analysis) warnings treated as errors where configured
- [ ] `appsettings.json` / `appsettings.Development.json` not committed with secrets
- [ ] `Serilog` / `NLog` / `Microsoft.Extensions.Logging` used consistently

#### Swift (iOS / macOS)
- [ ] `xcodebuild` or `swift build` passes with no warnings
- [ ] `swiftlint` passes with project config (`swiftlint --strict`)
- [ ] `swift test` passes with full suite
- [ ] No `print()` or `debugPrint()` in production code — use `os_log`
- [ ] Optionals handled safely — no forced unwrapping (`!`) in production code
- [ ] `Codable` / `Encodable` / `Decodable` conformances verified
- [ ] Memory leak check (strong reference cycles with closures/delegates)
- [ ] `weak` / `unowned` used appropriately to break retain cycles
- [ ] Main thread checks for UIKit updates (`DispatchQueue.main.async`)
- [ ] `@available` guards used for newer API calls
- [ ] Localization strings externalized to `.strings` / `.xcstrings`
- [ ] Swift Package Manager resolved — `Package.resolved` updated
- [ ] No deprecated API usage without migration plan
- [ ] `access control` reviewed (`public`, `internal`, `fileprivate`, `private`)

#### Docker / Container
- [ ] `docker build` passes with no errors
- [ ] Dockerfile follows best practices (multi-stage builds, layer caching order)
- [ ] No secrets baked into image layers (use build args or secrets mount)
- [ ] Image size evaluated — unnecessary packages or files removed
- [ ] `.dockerignore` present and correctly configured
- [ ] `docker-compose` (if applicable) updated for new services
- [ ] Container runs as non-root user
- [ ] Health check configured for long-running containers
- [ ] `SHELL` form used over `exec` form where appropriate
- [ ] Base image pinned to specific digest, not `latest`

### 6.3 CI/CD Verification Checklist

Every CI pipeline is different, but the expectations are universal.

#### Pipeline Health
- [ ] All CI jobs pass (lint, test, build, deploy, docs)
- [ ] No new warnings introduced (check the "warnings" tab in CI output)
- [ ] CI run time is reasonable — no unnecessary bottlenecks added
- [ ] Pipeline completes within expected SLA (< 30 minutes typically)
- [ ] Matrix builds pass across all target OS/version combinations
- [ ] No flaky tests in the suite — failures consistently reproduce
- [ ] CI caching configured correctly (dependency cache, build cache)
- [ ] Parallelism configured optimally for the project's runner capacity

#### Coverage and Quality Gates
- [ ] Code coverage maintained or increased (failing a coverage drop is acceptable)
- [ ] Quality gate thresholds met (complexity, duplication, maintainability index)
- [ ] Mutation testing passed if configured (e.g., Stryker, PIT)
- [ ] Public API surface change reviewed (no accidental `pub` / `export` / `public`)
- [ ] Code complexity reviewed — cyclomatic complexity under project threshold
- [ ] No new technical debt items introduced (SonarQube / CodeClimate thresholds)
- [ ] Documentation coverage met (if project enforces doc coverage)

#### Integration and E2E
- [ ] Integration tests pass against real dependencies (DB, API, cache)
- [ ] End-to-end tests pass if the project maintains them
- [ ] Smoke tests pass for critical user workflows
- [ ] Contract tests pass if microservice ecosystem (Pact, Spring Cloud Contract)
- [ ] Cross-browser tests pass for frontend changes (Playwright, Cypress)
- [ ] API contract / OpenAPI spec is up to date with implementation
- [ ] Database migration tests pass (rollforward + rollback verified)
- [ ] Load tests pass if performance SLAs are enforced
- [ ] Chaos/resilience tests pass if the project uses them

#### Artifact and Release
- [ ] Build artifacts are reproducible (no timestamps, no randomly generated IDs)
- [ ] Docker image builds successfully (if applicable)
- [ ] Package version bumped correctly (semver: `MAJOR.MINOR.PATCH`)
- [ ] Release notes draft prepared (if this PR will be the release)
- [ ] Artifact signing configured if project signs releases (GPG, cosign)
- [ ] SBOM (Software Bill of Materials) generated if required
- [ ] Canary / blue-green deployment considerations documented
- [ ] Rollback plan documented for the changes in this PR
- [ ] Database migration backward-compatible (or migration plan documented)

### 6.4 Repository Hygiene Checklist

These checks keep the repository history clean and maintainable.

#### Branch and Commit Hygiene
- [ ] No merge commits in branch history — rebase-only workflow preferred
- [ ] Commit messages follow the project's convention (Conventional Commits, etc.)
- [ ] Branch name follows project naming convention (`feat/`, `fix/`, `chore/`, `docs/`, etc.)
- [ ] Fork is up to date with upstream (`git remote add upstream <url> && git fetch upstream && git rebase upstream/main`)
- [ ] Rebased onto latest target branch — no stale history
- [ ] No fixup or squash commits left in final PR branch
- [ ] No WIP commits in final submission
- [ ] Sign-off line present if DCO is required (`Signed-off-by: Name <email>`)
- [ ] No co-author lines without explicit attribution consent
- [ ] Commit timestamps are coherent (no future dates from rebase issues)

#### Diff Quality
- [ ] Diff contains only the changes necessary for the feature or fix
- [ ] No whitespace-only changes (trailing spaces, tabs vs spaces, line endings)
- [ ] No stylistic changes mixed with functional changes
- [ ] No accidentally committed generated files (compiled assets, `.pyc`, `node_modules/`)
- [ ] No files with platform-specific permissions accidentally changed
- [ ] No changes to auto-generated files (protobuf, OpenAPI clients, GraphQL types)
- [ ] No files larger than the project's size limit in a single diff
- [ ] Line ending normalization consistent (LF for cross-platform projects)

#### Dependency Hygiene
- [ ] New dependencies are necessary and justified in PR description
- [ ] License of new dependencies is compatible with project license
- [ ] Dependency version pinned appropriately (SHA or semver range with upper bound)
- [ ] No dependency with known CVEs (use `dependabot` / `renovate` / `cargo audit` / `npm audit`)
- [ ] Transitive dependency footprint evaluated (no ballooning install size)
- [ ] No duplicate dependencies (same package at different versions)
- [ ] Peer dependencies updated if applicable (npm peerDependencies, etc.)
- [ ] Dependency review done — supply chain posture checked
- [ ] No experimental or unmaintained dependencies added to production code

### 6.5 Communication Readiness Checklist

Post-submission professionalism matters as much as code quality.

#### PR Presentation
- [ ] PR title is descriptive and follows project convention (`type(scope): description`)
- [ ] PR description is complete and accurately matches the diff
- [ ] PR description explains the motivation, approach, and testing strategy
- [ ] Screenshots, GIFs, or screen recordings attached for UI/UX changes
- [ ] Performance benchmarks attached for performance-critical changes
- [ ] Reviewer(s) assigned if the project uses explicit assignment
- [ ] Labels applied correctly (`bug`, `enhancement`, `documentation`, `breaking`, etc.)
- [ ] Milestone set if the project uses milestone-based releases
- [ ] Related issues linked with closing keywords (`Fixes #123`, `Closes #456`)
- [ ] Breaking change label or `!` notation used in Conventional Commits title
- [ ] Draft PR used for work-in-progress; converted to ready when complete
- [ ] PR template checklist filled out (if the project provides one)
- [ ] Self-review completed before requesting maintainer review

#### Code Review Etiquette
- [ ] Respond to each review comment (even if just acknowledging)
- [ ] Request clarification on unclear feedback before assuming intent
- [ ] Avoid defensive responses — focus on the code, not the author
- [ ] Push fixup commits during review (squash before merge)
- [ ] Re-request review after addressing all feedback
- [ ] Do not force-push during active review without notification
- [ ] Keep discussion threads focused on technical merit
- [ ] Accept alternative approaches with grace

#### Post-Submission Commitment
- [ ] Ready to respond within 48 hours to any review feedback
- [ ] All review comments addressed (reply to each, even if just "acknowledged")
- [ ] Requested changes implemented before re-requesting review
- [ ] Follow-up PRs planned for any out-of-scope improvements discovered
- [ ] Changelog updated if new review revealed user-facing changes
- [ ] Maintainer feedback incorporated gracefully — no arguing or dismissing
- [ ] Timeline communicated if delayed response is anticipated (vacation, etc.)
- [ ] Post-merge monitoring planned if the change affects production systems
- [ ] Rollback procedure understood for the changed component

### 6.6 Pre-Submit Automation Workflow

Run these automation steps in order before creating your PR. Each step builds on the previous.

#### Step 1: Pre-Flight Checks (Local)
```bash
# Save current work
git stash -u   # Stash untracked files too

# Verify base branch
git fetch origin
git checkout main
git pull origin main
git checkout -

# Rebase onto latest
git rebase origin/main
```

#### Step 2: Build and Lint
```bash
# Language-agnostic: just run what the project uses
npm run build        # JS/TS
cargo build          # Rust
go build ./...       # Go
dotnet build         # C#
python setup.py build  # Python (or `pip install -e .`)

# Lint checks
npm run lint
cargo clippy -- -D warnings
golangci-lint run ./...
dotnet format --verify-no-changes
```

#### Step 3: Test Suite
```bash
# Run the full test suite
npm test
cargo test --all-features
go test -race ./...
dotnet test
python -m pytest tests/ -q -n auto
```

#### Step 4: Security Scan
```bash
# Dependency audit
npm audit
cargo audit
go mod verify
pip audit

# Secret scanning
gitleaks detect --verbose
trufflehog filesystem .

# SAST
semgrep --config=auto
bandit -r src/
```

#### Step 5: Final Diff Review
```bash
# Review the complete diff
git diff main...HEAD --stat
git diff main...HEAD | less

# Check for accidental inclusions
git diff main...HEAD --name-only | grep -E '\.(exe|dll|so|pyc|log|env)$'
```

### Summary: Verification Command Table

Use this reference table to find the exact command or tool for each checklist item.

| Category | Check Item | Command / Tool |
|---|---|---|
| **Syntax** | Python syntax check | `python -c "import py_compile; py_compile.compile('file.py', doraise=True)"` |
| **Syntax** | TypeScript compile check | `npx tsc --noEmit --strict` |
| **Syntax** | Rust compile check | `cargo check` |
| **Syntax** | Go compile check | `go build ./...` |
| **Syntax** | C# compile check | `dotnet build` |
| **Syntax** | Ruby syntax check | `ruby -c file.rb` |
| **Syntax** | Swift compile check | `swift build` |
| **Lint** | Python linter | `ruff check .` or `flake8 .` |
| **Lint** | ESLint | `npx eslint src/` |
| **Lint** | Rust Clippy | `cargo clippy -- -D warnings` |
| **Lint** | Go vet | `go vet ./...` |
| **Lint** | Rubocop | `rubocop --parallel` |
| **Lint** | SwiftLint | `swiftlint --strict` |
| **Lint** | .NET format | `dotnet format --verify-no-changes` |
| **Format** | Python formatter | `ruff format --check .` or `black --check .` |
| **Format** | Prettier | `npx prettier --check src/` |
| **Format** | Rust fmt | `cargo fmt --check` |
| **Format** | Go fmt | `gofmt -l .` |
| **Format** | Clang-format | `clang-format --dry-run --Werror <file>` |
| **Tests** | Python tests | `pytest tests/ -q` |
| **Tests** | JS/TS tests | `npm test` / `yarn test` / `pnpm test` |
| **Tests** | Rust tests | `cargo test --all-features` |
| **Tests** | Go tests | `go test -race ./...` |
| **Tests** | Java tests | `mvn test` or `./gradlew test` |
| **Tests** | C# tests | `dotnet test` |
| **Tests** | Ruby tests | `bundle exec rspec` |
| **Tests** | Swift tests | `swift test` |
| **Security** | Python security scan | `bandit -r my_package/` |
| **Security** | Rust audit | `cargo audit` |
| **Security** | npm audit | `npm audit` |
| **Security** | Ruby audit | `bundle audit check --update` |
| **Security** | .NET security | `dotnet list package --vulnerable` |
| **Security** | Secrets scanner | `gitleaks detect` or `trufflehog` |
| **Security** | SAST scan | `semgrep` or `sonar-scanner` |
| **Deps** | Python deps | `pip freeze > requirements.txt` or `uv lock` |
| **Deps** | JS deps | `npx npm-check-updates` or `npx synk test` |
| **Deps** | Rust deps | `cargo update` + `cargo audit` |
| **Deps** | Go deps | `go mod tidy` |
| **Deps** | Java deps | `mvn dependency:tree` |
| **Deps** | .NET deps | `dotnet list package --outdated` |
| **Coverage** | Python coverage | `pytest --cov=my_package --cov-report=term-missing` |
| **Coverage** | JS coverage | `npx jest --coverage` or `npx vitest --coverage` |
| **Coverage** | Rust coverage | `cargo tarpaulin` or `cargo llvm-cov` |
| **Coverage** | Go coverage | `go test -coverprofile=coverage.out` |
| **Coverage** | C# coverage | `dotnet test --collect:"XPlat Code Coverage"` |
| **Diff** | Check diff size | `git diff --stat origin/main...HEAD` |
| **Diff** | Check diff content | `git diff origin/main...HEAD` |
| **Commits** | Check commit count | `git log --oneline origin/main..HEAD` |
| **Commits** | Conventional commit check | `npx commitlint --from origin/main` |
| **Commits** | DCO sign-off check | `git log --format="%an <%ae> %s%n%b" origin/main..HEAD \| grep "Signed-off-by"` |
| **Hygiene** | Check for secrets | `grep -rn "sk_live\|AKIA\|ghp_" . --include="*.py" --include="*.js" --include="*.ts" --include="*.rs" --include="*.go"` |
| **Hygiene** | Check for large files | `find . -size +1M -not -path './.git/*'` |
| **Hygiene** | Check for merge commits | `git log --merges origin/main..HEAD` |
| **Hygiene** | Merge conflict check | `git merge --no-commit --no-ff origin/main` then `git merge --abort` |
| **Hygiene** | License check | `npx license-checker --summary` or `cargo license` |

### Cross-Project Readiness Scorecard

Use this quick scorecard to assess your PR readiness across all dimensions before submission.

| Dimension | Status | Notes |
|---|---|---|
| **Correctness** (syntax + types + tests) | ☐ Pass / ☐ Fail | |
| **Style** (lint + format + conventions) | ☐ Pass / ☐ Fail | |
| **Security** (secrets + injection + audit) | ☐ Pass / ☐ Fail | |
| **Documentation** (code + README + changelog) | ☐ Pass / ☐ Fail | |
| **Performance** (benchmarks + regressions) | ☐ Pass / ☐ Fail | |
| **Hygiene** (branch + commits + deps) | ☐ Pass / ☐ Fail | |
| **Communication** (PR body + responsiveness) | ☐ Pass / ☐ Fail | |
| **Compatibility** (cross-platform + backward) | ☐ Pass / ☐ Fail | |
| **Accessibility** (UI changes only) | ☐ Pass / ☐ Fail | |
| **Automation** (CI + pre-submit checks) | ☐ Pass / ☐ Fail | |

**Final universal rule:** If **any** dimension above is marked "Fail", do not submit. Fix it first, re-check, and only proceed when all ten are green.

---

### Appendix A: Quick Reference for Common PR Workflows

#### Bug Fix PR
1. Create branch from `main`: `git checkout -b fix/issue-123-description`
2. Write a failing test first (TDD)
3. Implement the fix
4. Verify the test passes
5. Run full test suite
6. Rebase onto latest `main`
7. Submit PR with `Fixes #123` in description

#### Feature PR
1. Create branch from `main`: `git checkout -b feat/my-feature`
2. Discuss design in the issue tracker first (if non-trivial)
3. Implement feature with tests
4. Update documentation (README, API docs, changelog)
5. Run full CI suite locally
6. Rebase onto latest `main`
7. Submit PR linking to feature request issue

#### Refactoring PR (standalone)
1. Create branch from `main`: `git checkout -b refactor/area-description`
2. NO behavior changes — only structural changes
3. Run full test suite before and after (identical results)
4. Rebase onto latest `main`
5. Submit PR with "No functional changes" in description

#### Documentation PR
1. Create branch from `main`: `git checkout -b docs/update-readme`
2. Build documentation site locally to verify rendering
3. Check spelling and grammar
4. Rebase onto latest `main`
5. Submit PR with docs label

---

### Appendix B: PR Review Checklist for Reviewers

When reviewing a PR, use this complementary checklist to ensure thorough coverage.

#### Structural Review
- [ ] PR description matches the diff exactly
- [ ] Branch and commit history are clean
- [ ] No unrelated changes mixed in
- [ ] CI is green (or failures are pre-existing and documented)

#### Code Review
- [ ] Logic is correct and handles edge cases
- [ ] No security vulnerabilities introduced
- [ ] Error handling is comprehensive
- [ ] Performance implications considered
- [ ] Tests cover the changes adequately
- [ ] Documentation is updated

#### Process Review
- [ ] Contributor responded to all comments
- [ ] All requested changes were made
- [ ] No force-push during active review without notice
- [ ] CLA / DCO signed if required

---

*Last updated: May 2026*
*Location: AI-Code/Jiggy-2026-PR/core/checklist.md*
*Covers: real OSS contribution experience*
