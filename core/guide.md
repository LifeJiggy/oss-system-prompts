# Zero-Blockage PR Guide — Clean PRs Every Time

## Overview

This comprehensive guide ensures every PR you submit to any open source project passes review without any blockers. It is based on real failures across dozens of projects and hundreds of review cycles, distilled into universal principles.

The goal is simple: **Every PR merge-ready. Every review successful. Zero blockages.**

---

## Table of Contents

1.  [Introduction](#introduction)
2.  [Phase 1: Before You Code](#phase-1-before-you-code)
3.  [Phase 2: While Coding](#phase-2-while-coding)
4.  [Phase 3: Before Push](#phase-3-before-push)
5.  [Phase 4: After Push](#phase-4-after-push)
6.  [Phase 5: Long-Term Success](#phase-5-long-term-success)
7.  [Quick Reference](#quick-reference)
8.  [Emergency Procedures](#emergency-procedures)
9.  [The Zero-Blocker Formula](#the-zero-blocker-formula)
10. [Global OSS Ecosystem Workflow Reference](#global-oss-ecosystem-workflow-reference)
11. [Language-Specific Considerations](#language-specific-considerations)
12. [Tool & Framework Adaptation Guide](#tool--framework-adaptation-guide)

---

## Introduction

### Why This Guide Exists

Blocked PRs share the same root causes regardless of project size, language, or community. SQL injection rejections, resource leak blockers, fake implementation accusations, merge pollution closures — these patterns recur across every ecosystem. This guide encapsulates everything learned from those failures so you never repeat them.

The recommendations here are project-agnostic. Every command, checklist item, and workflow maps to any OSS project by substituting the project's specific tools and conventions.

### The Goal

The goal is not just to get one PR merged. The goal is to develop a systematic approach that:
- Works every time, on any project
- Builds your reputation as a reliable contributor
- Creates positive relationships with maintainers
- Makes review easy for everyone involved

### Who This Guide Is For

- First-time contributors to any OSS project
- Experienced developers contributing to a new codebase
- Open source maintainers who want to guide contributors
- Teams establishing PR quality standards

---

## Phase 1: Before You Code

This is the most important phase. Most PR rejections happen because contributors skip this phase.

### 1.1 Research First — The Mandatory First Step

NEVER start coding without doing research first. This is non-negotiable regardless of how well you know the domain.

#### What to Research

**1. Read CONTRIBUTING.md**

Every well-maintained project has a CONTRIBUTING.md covering conventions, architecture, and the PR process. Most rejected PRs fail because the contributor didn't read it.

```bash
cat CONTRIBUTING.md
```

If the project lacks CONTRIBUTING.md, check `.github/CONTRIBUTING.md`, the project wiki, or look for a `DEVELOPMENT.md`. When none exist, examine the README thoroughly and study the CI configuration directly.

**2. Check Existing Issues**

Look for issues related to what you want to work on.

```bash
# Generic approach — substitute the project's issue tracker
gh issue list --repo owner/repo
gh issue list --repo owner/repo --label "good first issue"
gh issue list --repo owner/repo --search "keyword"

# GitLab equivalent
glab issue list --repo owner/repo

# Manual fallback (any platform)
open https://github.com/owner/repo/issues
```

**3. Check Existing PRs**

Someone else might already be working on this.

```bash
gh pr list --repo owner/repo
gh pr list --repo owner/repo --search "keyword"
```

**4. Understand the Architecture**

Every project has a specific file dependency chain. Breaking it causes circular imports, compilation errors, or runtime failures — all BLOCKERS.

Map the architecture by:
- Reading project documentation and ADRs (Architecture Decision Records)
- Following import/require/include chains from entry points
- Running a dependency graph tool (`pipdeptree`, `cargo tree`, `go mod graph`, `madge`)
- Examining the module or package structure
- Asking in a discussion issue if the architecture isn't documented

```bash
# Language-specific exploration
ls src/           # or app/ lib/ cmd/ pkg/
cat Cargo.toml    # Rust
cat package.json  # Node/JS
cat go.mod        # Go
cat pyproject.toml # Python
cat CMakeLists.txt # C/C++

# Trace dependency chains
rg "import\|require\|use" --include="*.py" src/main.py  # entry point imports
rg "import\|require\|use" --include="*.rs" src/main.rs
rg "import\|require\|use" --include="*.go" cmd/main.go
```

**5. Study Existing Code**

Before implementing anything, understand how similar functionality is implemented.

```bash
# Find related implementations across any language
rg "def my_feature\|fn my_feature\|function myFeature" src/ --include="*.{py,rs,go,ts,js}"

# Study the registration or plugin system
cat src/registry.py   # or src/registry.rs, src/registry.go, src/registry.ts

# Look at test files
ls tests/            # or __tests__/ spec/ test/
cat tests/test_example.py  # or test_example.rs, example_test.go, example.test.ts
```

#### Quick Architecture Survey by Language

| Language | Entry Point | Build Config | Module System | Dependency Tool |
|----------|-------------|-------------|---------------|-----------------|
| Python | `run_agent.py`, `main.py`, `__init__.py` | `pyproject.toml`, `setup.py` | `import` / packages | `pip`, `uv`, `poetry` |
| JavaScript/TypeScript | `src/index.ts`, `src/app.ts` | `package.json`, `tsconfig.json` | `import` / `require` | `npm`, `yarn`, `pnpm` |
| Rust | `src/main.rs`, `src/lib.rs` | `Cargo.toml` | `mod` / `use` | `cargo` |
| Go | `cmd/*/main.go` | `go.mod` | `import` / packages | `go mod` |
| Ruby | `lib/`, `bin/`, `config/` | `Gemfile` | `require` | `bundler` |
| Java/Kotlin | `src/main/java/`, `src/main/kotlin/` | `pom.xml`, `build.gradle` | `package` / `import` | `maven`, `gradle` |
| C/C++ | `src/main.c`, `src/main.cpp` | `CMakeLists.txt` | `#include` | `cmake`, `meson` |
| .NET/C# | `Program.cs`, `Startup.cs` | `.csproj` | `using` / namespaces | `dotnet` |

### 1.2 Open Discussion — The Critical Step

After research, before coding, you MUST open a discussion.

#### Why Discussion is Mandatory

- **Alignment:** You might be solving the wrong problem
- **Timing:** They might already be working on it
- **Approach:** Your approach might be wrong for the project's conventions
- **Approval:** You need buy-in before spending effort — especially for large changes

#### How to Open a Discussion

Create an issue with this structure:

```
Title: [Feature Request] Add Database Schema Inspection Tool

Problem:
- Describe the gap or pain point

Proposed Solution:
- What the feature does (concise description)
- Why it's useful (use case, user benefit)
- How it fits the project vision (alignment check)
- Technical approach sketch (optional but helpful)

Context:
- Reference to similar implementations (if any)
- Links to relevant discussions or issues

Ask: "Would this be welcome? Should I proceed?"
```

#### Wait for Acknowledgment

**Do NOT assume approval.** Wait for a response before writing any code. The response might be:

- **Positive:** "Yes, please proceed!"
- **Conditional:** "Yes, but with these modifications..."
- **Negative:** "No, not aligned with our vision" or "We prefer not to add this"

Any response is a good response. It means you have clarity. If you don't hear back within a week, leave a polite follow-up comment.

#### Alternative: Discuss in Community Channels

Some projects prefer discussion in:
- Discord / Slack community channels
- Discourse or GitHub Discussions tab
- Mailing lists
- Weekly maintainer calls

Read the CONTRIBUTING.md to find the project's preferred communication channel.

### 1.3 Plan Your Change

Once you have acknowledgment, plan your change carefully.

#### Scope Constraints

- **ONE feature per PR** — Not two, not three. One.
- **Under 10 files changed** — Ideally under 5
- **Under 500 lines added** — The smaller the better
- **One logical change** — Even if it touches multiple files, the change must tell one story

#### Implementation Plan

Write a brief implementation plan:

1. What files will you create/modify?
2. What is the exact change in each file?
3. What tests will you add and what will they cover?
4. How will you verify it works (manual + automated)?
5. What could go wrong? (pre-mortem thinking)

Share this plan in the issue for early feedback on implementation approach.

---

## Phase 2: While Coding

Now you are coding. This is where you apply quality standards, follow patterns, and test continuously.

### 2.1 Follow Existing Patterns Exactly

When in doubt, copy exactly. The codebase has patterns for a reason. Deviating from established patterns is one of the most common review complaints.

#### Finding Patterns

```bash
# Find similar implementations
rg "fn handle\|def process\|async function" src/modules/ --include="*.{rs,py,ts,go}" -l

# Look at the test patterns
ls tests/
cat tests/test_existing_feature.py

# Study handler / controller / service patterns
cat src/modules/similar_module.py
```

#### Copying Guidelines

- **Copy structure exactly** — File organization, exports, module boundaries
- **Copy naming conventions** — Check for snake_case, camelCase, PascalCase, kebab-case
- **Copy style** — Indentation (2 vs 4 spaces, tabs), bracket placement, imports ordering
- **Copy imports** — Import grouping style (stdlib, third-party, local)
- **Copy test conventions** — Test structure, assertion style, mocking approach, test fixtures

**Deviate only with justification.** If you must deviate from a pattern, explain why in your PR description and ideally in the code comments.

### 2.2 Quality Standards

Quality is non-negotiable. Every line of code you write reflects on you.

#### Universal Quality Checklist

- [ ] All public functions/modules have clear, documented interfaces
- [ ] Function signatures are explicit about parameter types (typed parameters or JSDoc/ docstrings)
- [ ] No `any`, `object`, `interface{}` where concrete types exist
- [ ] Proper error handling with specific error types
- [ ] Resources managed with RAII, `try/finally`, `defer`, or `using` statements
- [ ] Edge cases handled (empty collections, null/undefined, boundary values)
- [ ] No hardcoded values that should be configuration
- [ ] Logging at appropriate levels (debug vs info vs error)

```python
# CORRECT — Full typing, proper error handling
def fetch_user(user_id: str) -> Optional[User]:
    try:
        response = requests.get(f"/api/users/{user_id}")
        if not response.ok:
            return None
        return User(**response.json())
    except requests.RequestException as e:
        logger.error(f"Failed to fetch user: {e}")
        return None

# WRONG — No types, no error handling
def fetch_user(user_id):
    response = requests.get("/api/users/" + user_id)
    return response.json()
```

```rust
// CORRECT — Result type, proper error propagation
fn fetch_user(user_id: &str) -> Result<Option<User>, ApiError> {
    let response = client.get(format!("/api/users/{}", user_id))
        .send()
        .map_err(ApiError::Http)?;
    if !response.status().is_success() {
        return Ok(None);
    }
    response.json::<User>().map(Some).map_err(ApiError::Deserialize)
}

// WRONG — Panic on failure, no type discipline
fn fetch_user(user_id: &str) -> User {
    let text = ureq::get(&format!("/api/users/{}", user_id))
        .call().unwrap().into_string().unwrap();
    serde_json::from_str(&text).unwrap()
}
```

```go
// CORRECT — Explicit error handling
func FetchUser(userID string) (*User, error) {
    resp, err := http.Get(fmt.Sprintf("/api/users/%s", userID))
    if err != nil {
        return nil, fmt.Errorf("fetch user: %w", err)
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return nil, nil
    }
    var user User
    if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
        return nil, fmt.Errorf("decode user: %w", err)
    }
    return &user, nil
}

// WRONG — Ignoring errors
func FetchUser(userID string) *User {
    resp, _ := http.Get(fmt.Sprintf("/api/users/%s", userID))
    var user User
    json.NewDecoder(resp.Body).Decode(&user)
    return &user
}
```

#### Security Quality (Language-Agnostic)

These checks apply to every project regardless of language:

- [ ] No SQL injection (use parameterized queries, prepared statements, or ORM)
- [ ] No command injection (use argv arrays, not `shell=True`, `exec`, or string building)
- [ ] No `os.system()`, `subprocess(shell=True)`, `exec()`, `eval()` calls
- [ ] No hardcoded secrets (API keys, passwords, tokens, connection strings)
- [ ] All user inputs validated — type, length, range, format
- [ ] SQL identifiers validated against a regex allowlist
- [ ] Cross-site scripting (XSS) prevention for web projects
- [ ] No path traversal vulnerabilities (validate file paths)
- [ ] No unsafe deserialization (`pickle`, `eval`, `JSON.parse` on untrusted data)

```python
# CORRECT — Parameterized query
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# WRONG — SQL injection vulnerability
cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")
```

```javascript
// CORRECT — Parameterized query (Node/TS with mysql2 or pg)
await db.query("SELECT * FROM users WHERE id = $1", [userId]);

// WRONG — SQL injection
await db.query(`SELECT * FROM users WHERE id = '${userId}'`);
```

```go
// CORRECT — Parameterized query
db.QueryContext(ctx, "SELECT * FROM users WHERE id = $1", userID)

// WRONG — SQL injection
db.QueryContext(ctx, fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", userID))
```

```rust
// CORRECT — Parameterized query (sqlx)
sqlx::query!("SELECT * FROM users WHERE id = $1", user_id)
    .fetch_optional(&pool).await?

// WRONG — SQL injection
sqlx::query(&format!("SELECT * FROM users WHERE id = '{}'", user_id))
```

#### Resource Management (Language-Agnostic)

| Language | Resource Pattern | Anti-Pattern |
|----------|-----------------|--------------|
| Python | `try/finally`, `with` statement, context managers | No cleanup on exception |
| JavaScript/TypeScript | `try/finally`, `using` (ES2023), `DisposableStack` | Unclosed connections |
| Rust | RAII, `Drop` trait, `?` operator | `mem::forget`, leaked `Box` |
| Go | `defer` | Forgotten `resp.Body.Close()` |
| Java | `try-with-resources`, `finally` | Manual close without guard |
| C# | `using` statement, `IDisposable` | Missing Dispose |
| C++ | RAII, smart pointers, destructors | Raw `new`/`delete`, manual cleanup |

```python
# CORRECT — Proper cleanup
conn = None
try:
    conn = sqlite3.connect(db_path)
    return cursor.execute(query).fetchall()
except Exception as e:
    return error(str(e))
finally:
    if conn:
        conn.close()

# WRONG — No cleanup
conn = sqlite3.connect(db_path)
result = conn.execute(query).fetchall()  # If this fails, conn never closes
conn.close()
```

```go
// CORRECT — defer cleanup
func QueryDB(db *sql.DB, query string) ([]Row, error) {
    rows, err := db.QueryContext(ctx, query)
    if err != nil {
        return nil, fmt.Errorf("query: %w", err)
    }
    defer rows.Close()
    // ... process rows
}

// WRONG — Forgotten close
func QueryDB(db *sql.DB, query string) ([]Row, error) {
    rows, _ := db.QueryContext(ctx, query)  // error ignored!
    // rows never closed if this panics
}
```

### 2.3 Test As You Go

Don't wait until the end to test. Test continuously as you code. The test framework varies by language, but the principle is universal.

#### Testing Strategy

**1. Test your specific change**
```bash
# Python
python -m pytest tests/path/to/test_your_feature.py -v

# Rust
cargo test -p your_crate test_your_feature

# Go
go test ./... -run TestYourFeature -v

# JavaScript/TypeScript
npx jest --testPathPattern="yourFeature" --verbose

# Ruby
bundle exec rspec spec/your_feature_spec.rb
```

**2. Run related tests**
```bash
# Python
python -m pytest tests/path/ -v

# Rust
cargo test -p your_crate

# Go
go test ./pkg/your_package/...

# JavaScript/TypeScript
npx jest tests/your_module/
```

**3. Check for regressions**
```bash
# Python
python -m pytest tests/ -q -n 4

# Rust
cargo test

# Go
go test ./...

# JavaScript/TypeScript
npx jest
```

#### Test Requirements Across Languages

| Aspect | Python | Rust | Go | JS/TS |
|--------|--------|------|----|-------|
| Framework | pytest | built-in `#[test]` | built-in `testing` | Jest, Vitest |
| Assertions | `assert`, `pytest.raises` | `assert_eq!`, `assert!` | `t.Errorf`, `t.Fatal` | `expect()`, `assert.*` |
| Mocks | `unittest.mock`, `pytest-mock` | `mockall`, `mockito` | `gomock`, `testify/mock` | `jest.mock`, `vi.mock` |
| Fixtures | pytest fixtures | `#[fixture]` (third-party) | `TestMain`, setup funcs | `beforeEach`, `describe` |
| Coverage | `pytest-cov` | `tarpaulin`, `llvm-cov` | `go test -cover` | `jest --coverage`, `c8` |

#### Test Requirements for Every Change

Every new feature needs:

- **Unit tests** — Test individual functions/modules in isolation
- **Error path tests** — Test what happens when things go wrong (network failure, bad input, auth denied)
- **Edge case tests** — Test boundaries, empty collections, null values, overflow conditions
- **Security tests** — Test injection prevention, validation bypass attempts
- **Regression tests** — Test that previously fixed bugs stay fixed (if applicable)

```python
def test_query_success(self):
    result = tool.execute({"query": "SELECT 1"})
    assert result["success"] is True

def test_query_invalid_table(self):
    result = tool.execute({"query": "SELECT * FROM invalid"})
    assert result["success"] is False

def test_sql_injection_prevention(self):
    result = tool.execute({"query": "'; DROP TABLE users; --"})
    assert result["success"] is False  # Must be rejected
```

```rust
#[test]
fn test_query_success() {
    let result = tool.execute("SELECT 1");
    assert!(result.is_ok());
}

#[test]
fn test_sql_injection_prevention() {
    let result = tool.execute("'; DROP TABLE users; --");
    assert!(result.is_err());  // Must be rejected
}

#[test]
fn test_empty_input() {
    let result = tool.execute("");
    assert!(result.is_err());
}
```

```go
func TestQuerySuccess(t *testing.T) {
    result, err := tool.Execute("SELECT 1")
    assert.NoError(t, err)
    assert.True(t, result.Success)
}

func TestSQLInjectionPrevention(t *testing.T) {
    _, err := tool.Execute("'; DROP TABLE users; --")
    assert.Error(t, err)  // Must be rejected
}
```

### 2.4 Keep Your Diff Clean

While coding, keep track of what you change. Avoid:
- Refactoring unrelated code — no matter how much it needs it
- Changing styles you don't like or indentation you disagree with
- Adding "while I'm here" improvements — open a separate issue
- Fixing bugs you find unrelated to your change — file a separate issue

Use `git status` and `git diff` frequently to see what you've changed.

```bash
# Check what's changed before every commit
git status
git diff --stat

# Check staged changes
git diff --cached --stat
```

#### Formatting and Linting

Run the project's formatter before committing. Every ecosystem has one:

```bash
# Python
ruff format .          # or: black .
ruff check .           # or: flake8, pylint

# Rust
cargo fmt
cargo clippy

# Go
go fmt ./...
go vet ./...

# JavaScript/TypeScript
npx prettier --write .
npx eslint . --fix

# Java
./mvnw spotless:apply

# C#
dotnet format
```

---

## Phase 3: Before Push

This is your final verification phase. Before you push, verify everything.

### 3.1 Pre-Flight Checklist

Run through every item before pushing.

#### Step 1: Check What Changed

```bash
# See what files changed (substitute main/master/develop as needed)
git diff --stat origin/main...HEAD

# See the actual diff
git diff origin/main...HEAD

# Count commits
git log --oneline origin/main..HEAD | wc -l  # Should be 1

# Show changed file types
git diff --stat origin/main...HEAD | awk -F. '{print $NF}' | sort | uniq -c | sort -rn
```

**Verify:**
- Under 10 files changed
- Only intended files changed — no editor artifacts, no build output
- No unrelated changes in the diff
- Single commit (or as required by the project's convention)
- No merge commits in your branch

#### Step 2: Run Syntax & Type Check

```bash
# Python — compile check
for f in $(git diff --name-only origin/main...HEAD); do
  python -c "import py_compile; py_compile.compile('$f', doraise=True)" || exit 1
done

# Rust
cargo check
cargo clippy -- -D warnings

# Go
go vet ./...

# JavaScript/TypeScript
npx tsc --noEmit
npx eslint .

# Java
./mvnw compile
```

#### Step 3: Run Language-Specific Lint

```bash
# Python
ruff check .
mypy . --strict

# Rust
cargo clippy --all-targets -- -D warnings

# Go
golangci-lint run ./...

# JavaScript/TypeScript
npx eslint . --max-warnings=0
npx prettier --check .

# Ruby
rubocop --fail-level=warning
```

#### Step 4: Run Security Scan

Universal security checks that apply to any language:

```bash
# ===== INJECTION DETECTION =====
# SQL injection via string interpolation
rg -n 'f"|f'\''|format\(|\$"|sprintf' --include="*.{py,js,ts,rs,go,java}" | rg -i "execute|query|WHERE|INSERT|DELETE" && echo "POTENTIAL SQL INJECTION"

# ===== COMMAND INJECTION =====
# Shell execution with user-controlled input
rg -n "shell=True|os\.system|subprocess\(|exec\(" --include="*.{py,js,ts}" && echo "POTENTIAL COMMAND INJECTION"
rg -n "exec\.Command.*fmt|exec\.Command.*\+" --include="*.go" && echo "POTENTIAL COMMAND INJECTION"
rg -n "Command::new.*format|Command::new.*\+" --include="*.rs" && echo "POTENTIAL COMMAND INJECTION"

# ===== SECRETS DETECTION =====
# Common secret patterns (git-secrets or truffleHog for production use)
rg -n "sk_live|pk_live|AKIA|-----BEGIN.*PRIVATE KEY-----|ghp_" . --include="*.{py,js,ts,rs,go,java,yaml,yml,toml,json}" && echo "POTENTIAL SECRET LEAK"

# ===== UNSAFE EVAL =====
rg -n "\beval\b|\bexec\b" --include="*.{py,js,ts}" | rg -v "test|spec" && echo "POTENTIAL UNSAFE EVAL"

# ===== PATH TRAVERSAL =====
rg -n "\.\./" --include="*.{py,js,ts,rs,go,java}" | rg -v "test|spec|__pycache__" && echo "POTENTIAL PATH TRAVERSAL"

# ===== UNSAFE DESERIALIZATION =====
rg -n "\bpickle\b|\bmarshal\b" --include="*.py" && echo "UNSAFE DESERIALIZATION (Python)"
rg -n "JSON\.parse" --include="*.{js,ts}" | rg -v "try|catch" && echo "UNSAFE JSON PARSE (unsafe input)"
```

#### Step 5: Run Test Suite

```bash
# Python
python -m pytest tests/ -q -n 4

# Rust
cargo test

# Go
go test ./... -count=1

# JavaScript/TypeScript
npx jest --ci

# Java
./mvnw test

# C#
dotnet test
```

All tests must pass. If existing tests fail, investigate before pushing — either your change broke them, or they were already broken (in which case note it).

#### Step 6: Self-Review

- Read every file in your diff from top to bottom as if you were a reviewer
- Does the PR body match the diff exactly?
- Is every feature described actually implemented?
- Are there any TODO, FIXME, DEBUG, or test-only comments?
- Are error messages user-friendly and consistent with the project's style?
- Have you checked for off-by-one errors, race conditions, and edge cases?

#### Step 7: Merge with Latest

```bash
git fetch origin
git rebase origin/main   # or origin/master, origin/develop
# Resolve any conflicts
git add .
git rebase --continue
```

After rebasing, re-run tests on the resolved code. Conflicts can introduce subtle bugs.

#### Step 8: Verify Single Commit (if required)

Many projects require a single commit per PR:

```bash
# Check commit count
git log --oneline origin/main..HEAD | wc -l

# If more than 1, squash interactively
git rebase -i origin/main
# Change all but the first "pick" to "squash"
```

### 3.2 The Zero-Blocker Gate

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| Files | `git diff --stat` | Under 10 files |
| Lines | `git diff --stat` | Under 500 lines |
| Commits | `git log --oneline` | 1 commit (or project norm) |
| Syntax | Language compiler | 0 errors |
| Lint | Project linter | 0 errors |
| Tests | Project test runner | 0 failures |
| Format | Project formatter | Already formatted |
| Type check | Type checker (tsc/mypy/cargo check) | 0 errors |
| SQL injection | `rg execute\|query + interpolation` | 0 matches |
| Resource leaks | `rg .connect + missing cleanup pattern` | 0 matches |
| Command injection | `rg shell=True\|exec.Command\|exec(` | 0 matches |
| Secrets | `rg sk_live\|AKIA\|PRIVATE KEY` | 0 matches |
| Path traversal | `rg ../` | 0 matches |
| Eval/unsafe | `rg eval\|pickle\|unsafe` | 0 matches (or guarded) |
| Merge | `git rebase` | No conflicts |

**If ANY check fails, DON'T push. Fix first.**

### 3.3 Write PR Description

Before pushing, write a clear PR description.

#### PR Description Template

```markdown
## Summary
- What changed: [Brief description]
- Why it changed: [Context, link to issue]

## Related Issues
Closes #<issue>

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] Lint/format checks pass
- [ ] Security scan: no injection, no leaks, no secrets
- [ ] Manual testing done: [Description]

## Checklist
- [ ] Code follows project style and conventions
- [ ] Self-review completed
- [ ] Documentation updated (if applicable)
- [ ] No new warnings from linter/compiler

## Notes
- Limitations: [Any known limitations, future work]
- Breaking changes: [List if any]
```

#### CRITICAL: PR Body Must Match Diff

Every sentence in the PR description must correspond to actual code changes. If you describe 4 features, all 4 must have code changes. Otherwise, reduce scope.

**WRONG:** "Added database schema inspection, semantic search, and code indexing" when the diff only has schema inspection.

**CORRECT:** "Added database schema inspection tool. Implements PRAGMA table_info with identifier validation."

### 3.4 Final PR Push Checklist

- [ ] PR body written and matches the diff
- [ ] All tests pass
- [ ] Security scan passed
- [ ] Branch rebased on latest main
- [ ] Single commit (or project convention)
- [ ] Issue referenced in PR description
- [ ] Draft PR first (optional but recommended for large changes)

---

## Phase 4: After Push

Your PR is submitted. Now the real work begins: responding to review.

### 4.1 Monitor for Feedback

Check your PR regularly:
- At least once per day for the first week
- At least every 2-3 days after that
- Enable GitHub/notifications if possible

### 4.2 Respond to Review

When reviewers comment, respond within 48 hours. This is non-negotiable. Long radio silence is the fastest way to get your PR ignored or closed.

#### Response Framework

For each comment:

1. **Thank them** — "Thanks for the feedback!"
2. **Categorize** — Is it a blocker (P1) or a suggestion (P2)?
3. **Fix or discuss** — Fix blockers immediately, discuss suggestions
4. **Respond** — Tell them what you did or why you disagree

Response format:

```
> **[P1] SQL injection via string interpolation** ✅
> Fixed by adding regex validation and parameterized query.
> Changed from f-string interpolation to prepared statement with
> regex identifier validation.
```

```
> **[P2] Consider using a builder pattern** 💭
> I considered that approach, but the current design is simpler
> for this use case. Happy to refactor if you feel strongly.
> Can we defer this to a follow-up PR?
```

#### Code Review Response Etiquette

| Do | Don't |
|----|-------|
| Thank reviewers for their time | Argue with every comment |
| Ask clarifying questions | Take feedback personally |
| Explain your reasoning politely | Ignore comments or mark resolved without action |
| Accept final maintainer decision | Push back repeatedly after decision is made |
| Push follow-up commits for fixes | Force-push over review history |
| Re-request review when ready | Assume silence means approval |

### 4.3 Fix Promptly

When you need to make fixes:

```bash
# Make the fix
# ... edit files ...

# Re-run the relevant checks
cargo test     # or python -m pytest, go test, npx jest
cargo fmt      # or ruff format, go fmt, prettier
cargo clippy   # or ruff check, golangci-lint, eslint

# Commit with clear message using Conventional Commits
git add .
git commit -m "fix: address P1 feedback - add SQL parameterization"

# Rebase again if main has moved
git fetch origin
git rebase origin/main

# Push
git push --force-with-lease
```

Force-push is acceptable on feature branches. Use `--force-with-lease` (not `--force`) to avoid accidentally overwriting someone else's work.

### 4.4 Accept Rejection Gracefully

If your PR is rejected:

1. **Thank them** — "Thanks for the detailed feedback"
2. **Ask why** — "What specifically would make this acceptable?"
3. **Learn** — Apply the feedback to your next PR
4. **Move on** — Don't take it personally. Not every feature belongs in every project.

Sometimes rejection means:
- The feature doesn't align with the project's direction
- The timing isn't right
- The approach needs fundamental rethinking
- The project has limited maintenance bandwidth

None of these reflect on your value as a developer.

---

## Phase 5: Long-Term Success

### 5.1 Build Your Reputation

Each successful PR builds your reputation. Over time:
- You get more complex PRs accepted with less scrutiny
- Maintainers trust your work and give you more autonomy
- You become a known and respected contributor
- Your future PRs get reviewed faster

### 5.2 Learn Continuously

After each PR (merged or rejected), reflect on:
- What worked well in this cycle?
- What didn't work or caused friction?
- What would you do differently next time?

Keep a personal log of lessons learned. After 5-10 PRs you'll have a mental model of the project's expectations.

### 5.3 Contribute Beyond PRs

- Help triage issues and answer questions
- Review other people's PRs (builds reviewer relationships)
- Improve documentation where you find gaps
- Report bugs you discover (even unrelated to your work)
- Participate in design discussions and RFCs
- Help onboard new contributors

### 5.4 Track Your Progress

| Milestone | Approximate PRs | What Changes |
|-----------|-----------------|--------------|
| First-time contributor | 1 | Submit anything |
| Known contributor | 3-5 | Less initial scrutiny |
| Trusted contributor | 10+ | Maintainers ping you for reviews |
| Core contributor | 25+ | You get write access |
| Maintainer | 50+ | You review and merge others' PRs |

---

## Quick Reference

### Common Blockage Patterns

| Pattern | What It Is | How to Avoid |
|---------|------------|--------------|
| SQL injection | String interpolation in queries | Parameterized queries + input validation |
| Resource leaks | No cleanup on error path | RAII, defer, try-with-resources, context managers |
| Fake implementation | Placeholder that doesn't actually work | Implement real logic or rename feature |
| Phantom references | Code references things that don't exist | Verify every import, reference, and config entry |
| Merge pollution | Wrong base branch or extra commits | Branch from latest main, rebase before push |
| PR body != diff | Describing features not in the diff | Every sentence = actual code change |
| No prior discussion | Coding before asking | Issue first, wait for acknowledgment |
| Missing tests | No test coverage for new code | Add tests before push |
| Large diff | 20+ files changed, 1000+ lines added | Keep PR focused on one change |
| Cross-platform crash | Using platform-specific APIs without guards | Guard with conditional compilation or runtime checks |
| Hardcoded paths | Absolute paths or OS-specific paths | Use config, environment variables, or project root |
| Ignoring CI failures | "Works on my machine" | Replicate CI environment locally |
| Missed code review style | Not matching project conventions | Run the project's formatter and linter |
| Wrong commit messages | "fix" or "Update file.js" | Use Conventional Commits: `feat:`, `fix:`, `chore:`, etc. |

### The Perfect PR Flow

```
1. Open issue → Wait for acknowledgment from maintainers
2. Get approval → Create branch from latest main/master
3. Read CONTRIBUTING.md → Understand conventions and expectations
4. Study existing code → Find the right patterns to follow
5. Code ONE feature → Follow existing patterns exactly
6. Add comprehensive tests → Cover success, error, and edge cases
7. Run linter + formatter → Match project style
8. Security scan → No injection, no leaks, no secrets
9. Self-review → Read every file in your diff as a reviewer
10. Rebase on latest main → Resolve conflicts if any
11. Write PR description → Must match diff exactly
12. Push (with approval if required) → Wait for CI
13. Respond to review → Fix findings promptly, professionally
14. Merge → Delete branch, celebrate responsibly
```

### Required Commands by Ecosystem

```bash
# ===== RESEARCH =====
gh issue list --repo owner/repo
cat CONTRIBUTING.md
git fetch origin main

# ===== TESTING =====
# Python
python -m pytest tests/ -q -n 4
# Rust
cargo test
# Go
go test ./...
# JS/TS
npx jest

# ===== LINTING =====
# Python
ruff check .
ruff format . --check
# Rust
cargo clippy -- -D warnings
cargo fmt --check
# Go
golangci-lint run ./...
gofmt -l .
# JS/TS
npx eslint . --max-warnings=0
npx prettier --check .

# ===== TYPE CHECKING =====
# Python
mypy .
# Rust
cargo check
# Go
go vet ./...
# JS/TS
npx tsc --noEmit

# ===== SECURITY =====
# SQL injection
rg -n 'f"|format|sprintf|\+.*\$' --include="*.{py,rs,go,js,ts}" | rg -i "execute|query|WHERE"
# Connection leaks
rg -n "\.connect|new.*Client|NewClient" --include="*.{py,rs,go,js,ts}" | grep -v "defer\|finally\|using\|Drop"
# Secrets
rg -n "sk_live|AKIA|PRIVATE KEY|ghp_" . --include="*.{py,js,ts,rs,go,yaml,json}"
# Shell injection
rg -n "shell=True|os\.system|\bexec\b" --include="*.{py,js,ts}"

# ===== DIFF REVIEW =====
git diff --stat origin/main...HEAD
git diff origin/main...HEAD

# ===== BEFORE PUSH =====
git fetch origin
git rebase origin/main
git push --force-with-lease
```

---

## Emergency Procedures

### If CI Fails

1. **Don't push more commits to "fix" it** — This makes it worse and adds noise
2. **Pull the failing CI logs locally** — Examine the exact failure
3. **Reproduce the failure** — Run the same commands CI runs
4. **Understand what's broken** — Is it your code? A flaky test? A CI config issue?
5. **Fix in a new commit** — One fix per commit with a clear message
6. **Push the fix** — Verify it passes
7. **Respond to any reviewer comments** — If the CI failure generated comments, address them

If CI failures are pre-existing (not caused by your change), note this in your PR description: "CI test X was already failing before this change."

### If Reviewer Requests Changes

1. **Read ALL feedback carefully** — Read every comment, not just the first few
2. **Categorize each finding** — P1 (blocker — must fix) vs P2 (suggestion — optional)
3. **Fix every P1** — Address all blocking issues before re-requesting review
4. **Respond to every finding** — Even if it's just "acknowledged, will fix in follow-up"
5. **Re-run full checklist** — Verify nothing broke during the fixes
6. **Re-request review** — Use GitHub's re-request review button, don't just push

### If PR is Stale (No Response in 2+ Weeks)

1. **Politely bump** — "Hi team, any chance someone could take a look at this? Happy to make adjustments."
2. **Check for merge conflicts** — Rebase if needed
3. **Consider the project's activity** — If the project is dormant, your PR may not get attention regardless
4. **Move on** — Some projects have limited review bandwidth; it's not personal

### If PR is Rejected

1. **Don't argue** — This never helps and damages your reputation
2. **Ask why** — "Could you help me understand what would make this acceptable?"
3. **Extract lessons** — Understand what feedback applies to future contributions
4. **Learn from feedback** — Apply the knowledge to your next PR in any project
5. **Accept and move on** — Not every feature is a good fit for every project

### If Merge Conflicts Arise During Review

```bash
git fetch origin
git rebase origin/main
# For each conflicting file:
#   1. Open the file
#   2. Decide which changes to keep
#   3. Remove conflict markers (<<<<<<, ======, >>>>>>)
git add .
git rebase --continue
# Re-run tests
cargo test  # or your test runner
git push --force-with-lease
```

### If You Need to Close and Restart

Sometimes a branch is too polluted to salvage. When that happens:

1. **Acknowledge in the PR** — "This branch has gotten messy, I'll close and reopen fresh."
2. **Close the PR** — Don't delete the branch yet
3. **Create a fresh branch from main**
4. **Cherry-pick or re-apply your changes cleanly**
5. **Open a new PR** — Reference the old one

---

## The Zero-Blocker Formula

```
SUCCESS = (PRIOR_DISCUSSION × ONE_CHANGE × QUALITY × TESTS × SECURITY × COMMUNICATION) / BLOCKAGES
```

### Success Factors

- **PRIOR_DISCUSSION** — Always discuss before coding
- **ONE_CHANGE** — One feature per PR, one story per diff
- **QUALITY** — Follow patterns, proper types, clean code
- **TESTS** — Full coverage, all pass, cover edge cases
- **SECURITY** — No injection, no leaks, no secrets, no traversal
- **COMMUNICATION** — Respond within 48 hours, be polite

### Blockers to Eliminate

- ❌ SQL injection
- ❌ Resource leaks
- ❌ Fake/placeholder implementations
- ❌ Phantom references (referencing nonexistent code)
- ❌ Merge pollution (wrong base, extra commits)
- ❌ PR body != diff
- ❌ No prior discussion
- ❌ Missing tests
- ❌ Large diffs (20+ files, 1000+ lines)
- ❌ Cross-platform crashes (Windows/Linux/Mac)
- ❌ Hardcoded paths or secrets
- ❌ Ignoring CI failures
- ❌ Review comments left unaddressed
- ❌ Stale branches with merge conflicts

### Final Reminder

**Every PR merge-ready. Every review successful. Zero blockages.**

Follow this guide systematically. It works.

---

## Global OSS Ecosystem Workflow Reference

### Common CI/CD Patterns Across Projects

Most OSS projects use one of three CI/CD systems:

| System | Config Location | Key File |
|--------|----------------|----------|
| GitHub Actions | `.github/workflows/` | `*.yml` |
| GitLab CI | `.gitlab-ci.yml` | `gitlab-ci.yml` |
| CircleCI | `.circleci/config.yml` | `config.yml` |

**GitHub Actions** is the most common. Typical workflow stages: lint → typecheck → test → build → deploy. Jobs run on `ubuntu-latest` by default. Matrix builds test multiple language versions across OS runners.

```yaml
# Typical GitHub Actions workflow
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

**GitLab CI** uses YAML pipelines with stages (`.pre`, `build`, `test`, `deploy`). Runners can be shared or self-hosted. Cache keyed by branch + dependencies.

```yaml
# Typical GitLab CI pipeline
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test
  cache:
    key: $CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
```

**CircleCI** uses orbs for reusable config. Pipelines are defined per-branch with workflow filters. Resource classes control CPU/RAM per job.

```yaml
# Typical CircleCI config
version: 2.1
orbs:
  node: circleci/node@5
jobs:
  test:
    executor: node/default
    steps:
      - checkout
      - node/install-packages
      - run: npm test
workflows:
  test-workflow:
    jobs:
      - test
```

### Common CI Job Types by Language

| Language | Lint | Test | Build | Coverage | Other |
|----------|------|------|-------|----------|-------|
| Python | ruff/flake8 | pytest | `pip install -e .` | pytest-cov | mypy, safety |
| JavaScript/TS | eslint | jest/vitest | `npm run build` | c8/istanbul | tsc, bundle-size |
| Rust | clippy | cargo test | cargo build | tarpaulin | rustfmt, audit |
| Go | golangci-lint | go test | go build | go test -cover | go vet, staticcheck |
| Ruby | rubocop | rspec | gem build | simplecov | brakeman, bundler-audit |
| Java | checkstyle | mvn test | mvn package | jacoco | spotbugs, owasp |
| C# | dotnet format | dotnet test | dotnet build | coverlet | roslyn-analyzers |

### Universal Branch Naming Conventions

```
├── main          # Production-ready code
├── develop       # Integration branch (git-flow)
├── feat/         # New features (feat/add-login, feat/api-v2)
├── fix/          # Bug fixes (fix/null-pointer, fix/typo-readme)
├── chore/        # Maintenance (chore/deps-update, chore/lint-fix)
├── docs/         # Documentation (docs/api-refresh, docs/contrib-guide)
├── refactor/     # Code restructuring (refactor/auth-flow, refactor/db-layer)
├── test/         # Test additions (test/auth-middleware, test/api-contract)
├── perf/         # Performance improvements (perf/cache-query, perf/render)
├── style/        # Formatting (style/indent, style/import-order)
├── build/        # Build system changes (build/dockerfile, build/webpack)
├── ci/           # CI config changes (ci/actions-update, ci/test-split)
├── revert/       # Reverting previous commits
└── release/      # Release branches (release/v2.0, release/1.5.1)
```

Convention: `<type>/<short-description>`, lower-kebab-case. Most repos use a subset of these. Always check the project's conventions — some use `feature/` instead of `feat/`, or `/` notation differently.

### Cross-Project PR Templates and Conventions

A strong PR template answers three questions:

1. **What** does this change do?
2. **Why** is this change needed?
3. **How** was this change tested?

Common template sections:

```
## Summary
<1-3 sentence description>

## Related Issues
Closes #<issue>

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

Many projects also require:
- Linear commit history (no merge commits)
- Linking to a tracking issue
- Conventional Commits format for commit messages
- Signed commits (GPG or SSH)
- DCO (Developer Certificate of Origin) sign-off

### Adapting This Guide to Any Project

This guide is intentionally generic. To adapt it to a specific project:

1. **Read the project's CONTRIBUTING.md** — start here every time
2. **Examine the test suite** — understand the testing framework (pytest, jest, go test, cargo test, rspec, etc.)
3. **Check CI configuration** — look at `.github/workflows/` or equivalent for the exact commands and checks
4. **Review recent merged PRs** — pattern-match commit style, description format, review density, review turnaround time
5. **Identify the linter/formatter** — eslint, ruff, clippy, golangci-lint, prettier, black, gofmt
6. **Find code ownership** — CODEOWNERS file reveals who reviews what, shows which reviewers to tag
7. **Check the issue tracker** — labels, milestone structure, triage process, stale-bot behavior
8. **Identify the type system** — TypeScript, mypy, Rust, Go, or dynamic (Python, Ruby, JS)
9. **Find the build system** — cargo, go build, npm run build, webpack, esbuild, maven, gradle
10. **Check supported platforms** — does CI run on Linux only, or also macOS and Windows?

The checklist structure (`tests/`, `lint/`, `docs/`, `review/`, `merge/`) maps to any project's pipeline. Substitute the tool names with that project's equivalents.

### Universal Merge Strategies

| Strategy | Command | When to Use |
|----------|---------|-------------|
| **Squash merge** | `gh pr merge --squash` | Feature branches, single-commit PRs |
| **Rebase merge** | `gh pr merge --rebase` | Maintaining linear history, small fixes |
| **Merge commit** | `gh pr merge --merge` | Preserving full branch context, collaborative branches |

**Best practice:** squash merge for feature work, rebase for small fixes, merge commit for collaborative branches. Always verify the target branch merge settings in the repo — some projects enforce a specific strategy.

### Reading Any Project's CONTRIBUTING.md Effectively

A CONTRIBUTING.md typically follows this structure:

1. **Welcome / Code of Conduct** — community norms and expectations
2. **Getting Started** — setup instructions, dependency installation, prerequisites
3. **Development Workflow** — branch strategy, commit message format (often Conventional Commits)
4. **Coding Standards** — linter, formatter, type checker configuration and commands
5. **Testing Requirements** — how to run tests, coverage expectations, test data setup
6. **PR Process** — template, review timeline, merge criteria, who can merge
7. **Release Process** — versioning scheme (semver), changelog generation, release cadence

Quick-scan method: search for `##` headers, then read subsections 3-6 in detail. Look for a `CONTRIBUTING.md` in the project root — if missing, check `.github/CONTRIBUTING.md` or the project wiki. When no CONTRIBUTING.md exists, fall back to the repo's README, examine the CI config directly, and check how other recent contributors structured their PRs.

### Developer Certificate of Origin (DCO)

Some projects require every commit to be signed off:

```bash
git commit -s -m "feat: add database schema inspection tool"
```

This adds `Signed-off-by: Your Name <email>` to the commit, certifying that you have the right to submit the code under the project's license.

### Conventional Commits

Most projects expect commit messages following the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `style`, `build`, `ci`, `revert`

Examples:
```
feat(api): add user authentication endpoint
fix(db): prevent SQL injection in user search
docs(readme): update installation instructions
refactor(core): extract validation logic into separate module
test(api): add integration tests for auth middleware
```

### Security Disclosure

If you discover a security vulnerability:
- **DO NOT** file a public issue
- **DO NOT** mention it in a PR
- Find and follow the project's SECURITY.md or security policy
- Report via the project's preferred channel (email, private issue tracker, security.txt)
- Wait for the maintainers to confirm and patch before public disclosure

---

## Language-Specific Considerations

### Python Projects

**Standard tooling:**
- Format: `ruff format` or `black`
- Lint: `ruff check` or `flake8`
- Type check: `mypy` or `pyright`
- Test: `pytest`
- Build: `setuptools`, `poetry`, `uv`
- Dependency: `pip`, `uv`, `poetry`, `pdm`

**Common pitfalls:**
- Circular imports from tightly coupled modules
- Missing `__init__.py` in packages
- `except: pass` swallowing errors
- Mutable default arguments (`def foo(x=[])`)
- Not using `__slots__` in hot-path classes
- Forgetting `__all__` in `__init__.py` exports

**Python-specific quality checks:**
```bash
ruff check . --select ALL
mypy . --strict
python -m pytest tests/ -q -n auto --cov=src/
safety check
bandit -r src/
```

### JavaScript / TypeScript Projects

**Standard tooling:**
- Format: `prettier`
- Lint: `eslint`
- Type check: `tsc` (TypeScript projects)
- Test: `jest`, `vitest`, `mocha`
- Build: `webpack`, `esbuild`, `vite`, `tsup`
- Dependency: `npm`, `yarn`, `pnpm`

**Common pitfalls:**
- Missing `@types/*` packages for libraries
- `any` types everywhere
- Callback/Promise memory leaks (unhandled rejections)
- Large `node_modules` from missing `.npmignore`
- Not pinning dependency versions
- Mixing `import` and `require` syntax

**JS/TS-specific quality checks:**
```bash
npx eslint . --max-warnings=0
npx prettier --check .
npx tsc --noEmit  # TypeScript only
npx jest --coverage
npx audit-ci --high  # security audit
```

### Rust Projects

**Standard tooling:**
- Format: `cargo fmt`
- Lint: `cargo clippy`
- Test: `cargo test`
- Build: `cargo build`
- Docs: `cargo doc`
- Dependency: `cargo`

**Common pitfalls:**
- `unwrap()` in production code (use `?` or proper error handling)
- Not implementing `Error` trait for custom errors
- Missing `#[derive]` macros (Debug, Clone, PartialEq)
- Over-using `Rc<RefCell<>>` instead of proper ownership
- Not using features for optional dependencies
- `unsafe` blocks without safety comments

**Rust-specific quality checks:**
```bash
cargo clippy --all-targets -- -D warnings
cargo fmt --check
cargo test
cargo audit
cargo deny check licenses
```

### Go Projects

**Standard tooling:**
- Format: `gofmt`
- Lint: `golangci-lint`, `staticcheck`
- Test: `go test`
- Build: `go build`
- Dependency: `go mod`

**Common pitfalls:**
- Ignoring errors with `_`
- Not using context for cancellation/timeouts
- Global state / package-level variables
- Missing `defer` for resource cleanup
- `interface{}` everywhere instead of concrete types
- Not handling `Close()` errors

**Go-specific quality checks:**
```bash
gofmt -l .
golangci-lint run ./...
go vet ./...
go test ./... -count=1 -race -coverprofile=coverage.out
staticcheck ./...
```

### Ruby Projects

**Standard tooling:**
- Format: `rubocop -A`
- Lint: `rubocop`
- Test: `rspec`, `minitest`
- Build: `gem build`
- Dependency: `bundler`

**Common pitfalls:**
- Dynamic typing surprises
- Monkey-patching core classes
- Not freezing string literals
- N+1 queries in ActiveRecord
- Missing `attr_reader`/`attr_accessor` for class state

**Ruby-specific quality checks:**
```bash
rubocop --fail-level=warning
bundle exec rspec
bundle exec brakeman -q  # security scan for Rails
bundle-audit check --update
```

### Java / Kotlin Projects

**Standard tooling:**
- Format: `spotless:apply` (Maven/Gradle), `ktlint` (Kotlin)
- Lint: `checkstyle`, `detekt` (Kotlin)
- Test: `JUnit 5`, `TestNG`, `Mockito`
- Build: `Maven`, `Gradle`
- Dependency: `mvn`, `gradle`

**Common pitfalls:**
- Null pointer exceptions from missing null checks
- Checked exceptions not handled or declared
- Mutability when immutability is expected
- Missing `@Override` annotations
- Long parameter lists (use builder pattern)
- Not using try-with-resources

**Java-specific quality checks:**
```bash
./mvnw verify  # includes checkstyle, tests, coverage
./mvnw spotbugs:check
./mvnw dependency-check:check  # OWASP dependency check
```

### .NET / C# Projects

**Standard tooling:**
- Format: `dotnet format`
- Lint: `dotnet format --verify-no-changes`, `Roslyn analyzers`
- Test: `dotnet test`, `xUnit`, `NUnit`
- Build: `dotnet build`
- Dependency: `dotnet restore`

**Common pitfalls:**
- `async void` methods (use `async Task`)
- Not disposing `IDisposable` resources
- `null` reference exceptions (use nullable reference types)
- `Exception` swallowing in catch blocks
- Thread safety issues with static state

**.NET-specific quality checks:**
```bash
dotnet restore
dotnet build --warningsAsErrors
dotnet format --verify-no-changes
dotnet test --collect:"XPlat Code Coverage"
dotnet list package --vulnerable
```

### C / C++ Projects

**Standard tooling:**
- Format: `clang-format`
- Lint: `clang-tidy`
- Test: `CTest`, `Google Test`, `Catch2`
- Build: `CMake`, `Meson`, `Make`
- Dependency: `vcpkg`, `conan`

**Common pitfalls:**
- Buffer overflows and memory corruption
- Use-after-free and double-free
- Missing null checks on allocated memory
- Not checking return values of syscalls
- Preprocessor macros instead of `constexpr`/inline functions
- Undefined behavior (signed overflow, uninitialized variables)

**C/C++-specific quality checks:**
```bash
cmake --build build --target clang-tidy
cmake --build build --target format
ctest --test-dir build --output-on-failure
cmake -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_C_COMPILER=clang -S . -B build-san -DCMAKE_BUILD_TYPE=Sanitize
cmake --build build-san
ctest --test-dir build-san
```

### C / C++ Sanitizers

Always build and test with sanitizers for memory safety:

```bash
# Address Sanitizer (ASan) — detects buffer overflows, use-after-free
cmake -DCMAKE_CXX_FLAGS="-fsanitize=address -fno-omit-frame-pointer" -DCMAKE_C_FLAGS="-fsanitize=address -fno-omit-frame-pointer" -DCMAKE_EXE_LINKER_FLAGS="-fsanitize=address" ..
make && ctest

# Undefined Behavior Sanitizer (UBSan)
cmake -DCMAKE_CXX_FLAGS="-fsanitize=undefined" -DCMAKE_C_FLAGS="-fsanitize=undefined" ..
make && ctest

# Thread Sanitizer (TSan) — data race detection
cmake -DCMAKE_CXX_FLAGS="-fsanitize=thread" -DCMAKE_C_FLAGS="-fsanitize=thread" ..
make && ctest

# Memory Sanitizer (MSan) — uninitialized memory reads
cmake -DCMAKE_CXX_FLAGS="-fsanitize=memory -fsanitize-memory-track-origins" -DCMAKE_C_FLAGS="-fsanitize=memory -fsanitize-memory-track-origins" ..
make && ctest
```

---

## Tool & Framework Adaptation Guide

### How to Find a Project's Tools

When you first approach a project, discover its tooling in this order:

1. **Read CONTRIBUTING.md** — should list all required tools and commands
2. **Check package.json / Cargo.toml / go.mod / pyproject.toml** — scripts section reveals common commands
3. **Examine CI config** — `.github/workflows/*.yml` shows exact commands the project runs
4. **Look at Makefile / Justfile** — common commands wrapped in targets
5. **Check the README badge section** — often shows CI status, coverage, etc.
6. **Review the last 5 merged PRs** — see what checks they passed and how they were formatted

### Common Tool Mapping by Ecosystem

| Need | Python | Rust | Go | JS/TS | Ruby | Java |
|------|--------|------|----|-------|------|------|
| Formatter | ruff/black | rustfmt | gofmt | prettier | rubocop -A | spotless |
| Linter | ruff/flake8 | clippy | golangci-lint | eslint | rubocop | checkstyle |
| Type checker | mypy | rustc | go vet | tsc | Sorbet (rare) | javac |
| Test runner | pytest | cargo test | go test | jest/vitest | rspec | mvn test |
| Coverage | pytest-cov | tarpaulin | go test -cover | c8/istanbul | simplecov | jacoco |
| Build | setuptools | cargo build | go build | tsc/webpack | gem build | mvn package |
| Security audit | safety | cargo audit | n/a | npm audit | bundler-audit | owasp check |
| Deps | pip/uv | cargo | go mod | npm/yarn | bundler | maven/gradle |

### Debugging Tools by Language

| Scenario | Python | Rust | Go | JS/TS |
|----------|--------|------|----|-------|
| Print debugging | `print()` / `logging` | `println!()` / `log` crate | `fmt.Println` / `log` | `console.log` / `debugger` |
| Interactive debugger | `pdb` / `ipdb` | `rust-gdb` / `rust-lldb` | `dlv` (Delve) | Chrome DevTools / `node inspect` |
| Profiling | `cProfile` / `py-spy` | `perf` / `flamegraph` | `pprof` | Chrome DevTools Profiler |
| Memory | `memory_profiler` / `tracemalloc` | `heaptrack` / `valgrind` | `pprof` heap | Chrome DevTools Memory |
| Tracing | `opentelemetry` | `tracing` crate | `otel` / `opentracing` | `opentelemetry-js` |

### Makingfile / Justfile Convention

Many projects provide a `Makefile` or `Justfile` with convenience targets:

```makefile
# Typical Python Makefile targets
.PHONY: test lint format typecheck clean

test:
    pytest tests/ -q -n auto

lint:
    ruff check .

format:
    ruff format .

typecheck:
    mypy src/

clean:
    rm -rf build/ dist/ .mypy_cache/ .pytest_cache/
```

```makefile
# Typical Rust Makefile or just targets
test:
    cargo test

lint:
    cargo clippy -- -D warnings

format:
    cargo fmt --check

build:
    cargo build --release
```

Always check if the project has a `Makefile` — it's the most common shortcut for running all required commands with `make test`, `make lint`, `make all`.

### Using `just` Instead of `make`

Some projects use `just` (a command runner) instead of `make`:

```bash
just test     # run tests
just lint     # run linter
just ci       # run everything CI does
just setup    # install dependencies
```

Check for a `justfile` in the project root if there's no `Makefile`.

---

*Last updated: May 2026*
*Location: AI-Code/Jiggy-2026-PR/core/guide.md*
*Purpose: Zero-blockage PR guide for any open source project*
*Note: Adapted from real Hermes Agent experience, generalized for universal OSS contribution*
