# Core Rules — Universal Open Source Contribution Framework

> Every rule here was earned through real PR failures across 100+ PRs and 300+ review cycles across multiple OSS ecosystems.
> Violating any of these guarantees a re-review round. **Know them. Follow them. Never repeat the same mistake twice.**
> 
> These rules cover every subsystem: modules, extensions, CLI, gateway, agent loop, logging, config, testing, security, and cross-platform.
> Each rule includes: the rule, why it matters (which common PR pattern it came from), the specific check to run, and the fix to apply.
>
> Language-agnostic by design — Python, TypeScript/JavaScript, Rust, Go, Java, Ruby, and C/C++ examples are provided where relevant.

---

## SECTION A — BRANCH & GIT HYGIENE

### A1 — Always Branch From origin/main
**Why:** A common PR mistake is branching from a local main that is hundreds or thousands of commits behind origin/main. The diff then includes every file changed in those commits — "merge pollution" that guarantees rejection.
**Check:** `git log --oneline origin/main..HEAD` should show only YOUR commits, not hundreds.
**Fix:** `git fetch origin main; git checkout -b feat/your-branch origin/main`

### A2 — One Concern Per PR, One Commit
**Why:** Multiple features in one PR = confusion, scope creep, rejection. One commit per branch (squash if needed).
**Check:** `git log --oneline origin/main...HEAD | wc -l` — must be 1.
**Fix:** `git reset --soft origin/main; git commit -m "feat: single feature"`

### A3 — Self-Review Every File In Your Diff
**Why:** Common mistake: submitting SQL injection, credential leaks, or silently dropped parameters because the diff wasn't read carefully.
**Check:** `git diff --stat origin/main...HEAD` — read EVERY file, not just new ones.
**Fix:** Read each file from top to bottom before pushing.

### A4 — Wait For Push Approval
**Why:** Pushing without user approval damages trust. The user must explicitly say "commit" or "push" before action is taken.
**Check:** Did you get permission to push?
**Fix:** If unsure, ask. Never push unsolicited.

### A5 — PR Body Must Match Diff
**Why:** A PR body describing 4 features but containing only 16 LOC of changes will be rejected. The body and diff must correspond.
**Check:** Does every sentence in the PR description correspond to a line in the diff?
**Fix:** If you describe 4 features, all 4 must have code changes. Otherwise, reduce scope.

### A6 — No Force Push Without Authorization
**Why:** Force pushing rewrites history on shared branches and frustrates reviewers. Only force push when explicitly authorized.
**Check:** Are you using `--force-with-lease`? Is the branch yours alone?
**Fix:** Use `git push` (without force) on branches others may have pulled.

### A7 — Rebase, Don't Merge, To Update Branches
**Why:** Merge commits create non-linear history that is harder to review. Use rebase to keep history clean.
**Fix:** `git rebase origin/main` instead of `git merge main`

### A8 — Meaningful Branch Naming
**Why:** Branches like `patch-1`, `fix`, or `update` don't convey intent. Use scoped names.
**Good:** `feat/auth-oidc-support`, `fix/regression-null-ptr-deref`, `docs/api-rate-limiting`
**Bad:** `patch-1`, `changes`, `my-branch`

---

## SECTION B — CODE QUALITY (Language-Agnostic)

### B1 — Code Must Compile Cleanly
**Why:** Dead code with syntax errors cannot merge. Every file in your diff must parse successfully.
**Python Check:** `python -c "import py_compile; py_compile.compile('your_file.py', doraise=True)"`
**JS/TS Check:** `npx tsc --noEmit your_file.ts` or `node --check your_file.js`
**Rust Check:** `cargo check`
**Go Check:** `go vet ./...`
**Fix:** Run language-appropriate compilation check on EVERY file in your diff before committing.

### B2 — Type Annotations On Every Function
**Why:** Without type annotations, callers don't know what a function expects or returns. Type annotations are the contract.
**Python (CORRECT):**
```python
def save_session_state(session_id: str, messages: list[dict], metadata: dict | None = None) -> bool:
```
**Python (WRONG):**
```python
def save_session_state(session_id, messages, metadata=None):
```
**TypeScript (CORRECT):**
```typescript
function saveSessionState(sessionId: string, messages: Message[], metadata?: Record<string, unknown>): boolean
```
**Rust (CORRECT):**
```rust
fn save_session_state(session_id: &str, messages: &[Message], metadata: Option<&Metadata>) -> Result<bool, DbError>
```
**Go (CORRECT):**
```go
func SaveSessionState(ctx context.Context, sessionID string, messages []Message, metadata map[string]any) (bool, error)
```

### B3 — No Unused Imports or Variables
**Why:** Unused imports signal incomplete code. Compilers warn about these in Rust, Go, and TypeScript.
**Python Check:** `ruff check --select F401 your_file.py`
**TS Check:** `npx tsc --noEmit --noUnusedLocals`
**Rust Check:** `cargo check` (unused imports are warnings by default)
**Go Check:** `go vet` (unused variables are compilation errors)
**Fix:** Remove unused imports or use them.

### B4 — try/finally Or Defer For ALL Resources
**Why:** Connection leaks from missing cleanup code are a HIGH priority finding in every review. If you open a connection, file handle, or lock, you MUST close it, even on error.
**Python (CORRECT):**
```python
conn = None
try:
    conn = sqlite3.connect(db_path)
    ...
except Exception as e:
    return error(str(e))
finally:
    if conn:
        conn.close()
```
**Python (WRONG):**
```python
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute(query)  # If this fails, conn never closes
conn.close()
```
**Go (CORRECT):**
```go
f, err := os.Open(path)
if err != nil {
    return err
}
defer f.Close()
```
**JS (CORRECT):**
```javascript
let conn;
try {
    conn = await pool.connect();
    // ...
} finally {
    if (conn) conn.release();
}
```

### B5 — Atomic Writes (tmp + replace)
**Why:** If the process crashes mid-write, partial data corrupts the file. The tmp + replace pattern ensures the target file is never partially written.
**Python (CORRECT):**
```python
tmp = path.with_suffix(f".{os.getpid()}.tmp")
try:
    tmp.write_text(data)
    tmp.replace(path)
except Exception:
    if tmp.exists():
        tmp.unlink()
    raise
```
**Python (WRONG):**
```python
path.write_text(data)  # Partial write on crash = corruption
```
**Node.js (CORRECT):**
```javascript
const tmp = path + '.' + process.pid + '.tmp';
fs.writeFileSync(tmp, data);
fs.renameSync(tmp, path);
```

### B6 — No Dead Code
**Why:** Dead code signals incomplete work. Orphaned branches, unreachable conditions, and never-called functions should be removed.
**Check:** Run linter with dead-code detection. Review all paths in conditionals.
**Fix:** Remove orphan blocks. Verify all paths are reachable and used.

### B7 — No Hardcoded Constants Without Documentation
**Why:** Magic numbers and undocumented constants confuse reviewers and accumulate stale values.
**CORRECT (Python):**
```python
# Pricing in $ per million tokens. Approximate — check provider docs.
MODEL_COST_PER_MTOK = {"claude-sonnet-4": {"input": 15.0, "output": 75.0}}
```
**CORRECT (Rust):**
```rust
/// Request timeout in seconds. Matches upstream API SLA of 30s.
const REQUEST_TIMEOUT_S: u64 = 30;
```

### B8 — No Broad Exception Silencing
**Why:** Catching broad exceptions everywhere hides bugs. Be specific about what you catch.
**Python (CORRECT):** `except sqlite3.Error as e:` or `except (OSError, TypeError) as e:`
**Python (WRONG):** `except:` or `except Exception:`
**JS (CORRECT):** Handle specific error types
**JS (WRONG):** `catch (e) { /* silently ignore */ }`

### B9 — Follow Language-Specific Naming Conventions
**Why:** Inconsistent naming confuses reviewers and breaks tooling.
| Language | Functions/Variables | Classes/Constructors | Constants | Files |
|----------|-------------------|---------------------|-----------|-------|
| Python | `snake_case` | `CamelCase` | `UPPER_CASE` | `snake_case.py` |
| JS/TS | `camelCase` | `CamelCase` | `UPPER_CASE` or `camelCase` | `kebab-case.ts` |
| Rust | `snake_case` | `CamelCase` | `SCREAMING_SNAKE_CASE` | `snake_case.rs` |
| Go | `camelCase` / `CamelCase` (exported) | `CamelCase` | `camelCase` | `snake_case.go` |
| Java | `camelCase` | `CamelCase` | `UPPER_CASE` | `CamelCase.java` |

### B10 — Docstrings / Docs On All Public APIs
**Why:** Without documentation, callers can't understand what a function does without reading its entire implementation.
**Python (CORRECT):**
```python
def save_session_state(session_id: str, messages: list) -> bool:
    """Save conversation state to disk for crash recovery.
    
    Args:
        session_id: Current session identifier
        messages: Messages in API format
        
    Returns:
        True if state was saved successfully
    """
```
**Rust (CORRECT):**
```rust
/// Saves session state to durable storage for crash recovery.
///
/// # Arguments
/// - `session_id` — Current session identifier
/// - `messages` — Messages in API format
///
/// # Returns
/// `Ok(true)` if state was saved successfully
pub fn save_session_state(session_id: &str, messages: &[Message]) -> Result<bool, StorageError>
```

### B11 — No Module-Level Side Effects
**Why:** Side effects at import time (creating directories, starting threads, reading config) are surprising and bug-prone.
**CORRECT:**
```python
@property
def state_dir(self) -> Path:
    return get_project_home() / "extensions" / self.manifest.name

def save_state(self, key, data):
    self.state_dir.mkdir(parents=True, exist_ok=True)  # Create on write
```
**WRONG:**
```python
# Module level — runs on import
state_dir.mkdir(parents=True, exist_ok=True)
```

### B12 — No Mutable Default Arguments
**Why:** Mutable default values (lists, dicts) are shared across all calls unless wrapped in a factory.
**Python (CORRECT):** `def process(items: list[str] | None = None): items = items or []`
**Python (WRONG):** `def process(items: list[str] = []):`
**Rust (CORRECT):** Use `Option<Vec<T>>` — no mutable default issue

### B13 — Functions Should Do One Thing
**Why:** Functions that validate input, process data, write to DB, and send notifications are too complex to review or test.
**Check:** Can you describe what the function does in one sentence without using "and"?
**Fix:** Extract helper functions. Each public function should have a single responsibility.

---

## SECTION C — SECURITY

### C1 — Parameterized Queries Only — ABSOLUTE
**Why:** SQL injection via f-string construction is a BLOCKER — the most severe finding possible. SQL injection can drop tables, leak data, and compromise the entire system.
**Python (CORRECT):**
```python
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
cursor.execute("INSERT INTO test (name, value) VALUES (:name, :value)", {"name": "x", "value": 1})
```
**Python (WRONG — NEVER DO THIS):**
```python
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
```
**Node.js (CORRECT):** Use parameterized queries with `?` placeholders
```javascript
db.query("SELECT * FROM users WHERE id = ?", [userId])
```
**Go (CORRECT):**
```go
db.QueryContext(ctx, "SELECT * FROM users WHERE id = $1", userID)
```
**Check:** `grep -rn 'f"\|f''' --include="*.py" | grep -i "execute\|WHERE\|INSERT\|DELETE"` (Python)
**Check:** `grep -rn '`  --include="*.js" | grep -i "query\|exec"` (Node.js — string interpolation in queries)

### C2 — Validate Identifiers Used In SQL
**Why:** Even with parameterized queries for values, table/column names can't be parameterized. They must be validated against a regex.
**CORRECT:**
```python
if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", table_name):
    return json.dumps({"success": False, "error": "Invalid table name"})
cursor.execute(f"PRAGMA table_info(\"{table_name}\")")  # Safe after validation
```
**Check:** Every string containing `table_name`, `column_name`, or identifier must have regex validation before it.

### C3 — Path Traversal Prevention
**Why:** Users could pass `../../etc/passwd` as a file path. Always validate paths using project security utilities.
**Check:** `grep -n "open(\|Path(" modules/*.py | grep -v "validate_within_dir\|path_security"`
**Fix:** Use a dedicated path validation function:
```python
def safe_path(base: Path, user_path: str) -> Path:
    resolved = (base / user_path).resolve()
    if not str(resolved).startswith(str(base.resolve())):
        raise SecurityError("Path traversal detected")
    return resolved
```

### C4 — No Hardcoded Credentials
**Why:** Secret keys in tests trigger GitHub's secret scanning. The push will be blocked.
**Check:** `grep -rn "sk_live\|AKIA\|api_key.*=" --include="*.py" --include="*.ts" --include="*.js" --include="*.rs" --include="*.go"`
**Fix:** Use clearly fake test values like `"TEST_KEY_123"` — never real-looking secret formats.

### C5 — No Phantom References
**Why:** Referencing modules, types, or functions that don't exist in the branch causes runtime errors.
**Check:** Every name in your module registry and config sets must have a corresponding implementation file in the branch.
**Fix:** If the module is from another PR, don't reference it. Each PR must be self-contained.

### C6 — No Fake/Placeholder Implementations
**Why:** Using a hash as "semantic embeddings" or a stub as a real feature is misleading. The reviewer will mark it DO NOT SUBMIT.
**Check:** Does the implementation actually do what the name and description claim?
**Fix:** Either implement real functionality or rename the code to match what it does.

### C7 — Secrets Scanning In Tests
**Why:** GitHub's secret scanning runs on every push. Fake-looking secrets (`sk_live_...`, `AKIA...`) in test data trigger push blocks.
**Fix:** Use `TEST_KEY_` prefix for all fake credentials in tests. Never use real-looking formats.

### C8 — OS-Specific Signal Handling
**Why:** `SIGALRM`, `SIGTERM`, `SIGHUP` only exist on Unix. On Windows, these raise `AttributeError`.
**Python (CORRECT):**
```python
if sys.platform == "win32":
    logger.warning("Feature not available on Windows")
    yield
    return
import signal as _signal
_signal.signal(_signal.SIGALRM, handler)
```
**Check:** `grep -rn "SIGALRM\|SIGKILL\|SIGHUP" --include="*.py" --include="*.rs" --include="*.go"`

### C9 — Command Injection Prevention
**Why:** Passing unsanitized user input to shell commands enables arbitrary code execution.
**Python (CORRECT):**
```python
import subprocess
subprocess.run(["ls", "-la", safe_path], check=True)  # No shell=True
```
**Python (WRONG):**
```python
subprocess.run(f"ls -la {user_input}", shell=True)  # Command injection!
```
**Node.js (CORRECT):**
```javascript
const { execFile } = require('child_process');
execFile('ls', ['-la', safePath]);
```
**Check:** `grep -rn "shell=True" --include="*.py"` (Python), `grep -rn "exec(\|execSync(" --include="*.js" --include="*.ts"`

---

## SECTION D — CROSS-PLATFORM

### D1 — Use Project-Home Paths
**Why:** Hardcoding home directories breaks when profiles or environments are active.
**CORRECT:** `from project_constants import get_project_home; get_project_home() / "state"`
**WRONG:** `Path.home() / ".project" / "state"`
**Check:** `grep -rn "Path.home()\|'/home/\|~/" --include="*.py"`

### D2 — No POSIX-Only Paths
**Why:** `/tmp`, `~/Desktop`, `/dev/null`, `/proc` don't exist on Windows.
**CORRECT:** `tempfile.gettempdir()`, `get_project_home()`, `os.devnull`
**Check:** `grep -rn "/tmp\|/dev/\|/proc\|~/Desktop" --include="*.py"`

### D3 — File Encoding Must Be Explicit
**Why:** Windows may use UTF-16 or cp1252 for file encoding. `open()` defaults to system encoding.
**CORRECT:** `open(path, "r", encoding="utf-8", errors="replace")`
**Check:** Every `open()` call must specify `encoding="utf-8"`.

### D4 — Signal Handling On Windows
**Why:** `signal.SIGTERM`, `signal.SIGHUP`, `signal.SIGALRM` don't exist on Windows. Guard all signal usage.
**CORRECT:** `if hasattr(signal, "SIGALRM"): signal.signal(signal.SIGALRM, handler)`
**Check:** `grep -rn "signal\." --include="*.py" | grep -v "hasattr\|getattr\|test_"`

### D5 — Line Endings
**Why:** Git on Windows converts LF to CRLF. This causes "CRLF will be replaced by LF" warnings.
**Fix:** Use `.editorconfig` with `end_of_line = lf` for code files. The `.gitattributes` should handle conversion.

### D6 — File Path Separator
**Why:** Hardcoding `/` as path separator breaks on Windows. Use `os.path.join()` or `pathlib.Path` (Python), `path.join()` (Node.js), `std::path::PathBuf` (Rust).
**Python (CORRECT):** `os.path.join("data", "subdir", "file.json")` or `Path("data") / "subdir" / "file.json"`
**Check:** `grep -rn "'/\|'data/\|\.json'" --include="*.py" | grep -v "join\|Path\|/"` — find hardcoded separators

### D7 — Environment Variable Case Sensitivity
**Why:** Windows env vars are case-insensitive (`PATH` = `Path` = `path`). Unix is case-sensitive. Use upper case consistently.
**Fix:** Always use UPPER_CASE for env var names. Never rely on case-sensitive comparison.

---

## SECTION E — TESTING

### E1 — Test All Execution Paths
**Why:** Every function has success path, error path, edge cases, and security boundaries. Each must be tested.
**CORRECT:** For each function:
- Test success with valid input
- Test error with invalid input
- Test boundary conditions (empty, max size)
- Test security (injection, traversal)

### E2 — Tests Must Validate Actual Values
**Why:** `assert result.success is True` only checks one field. Tests should verify the actual data shape and content.
**CORRECT (Python):**
```python
assert data["success"] is True
assert data["count"] == 3
assert data["rows"][0]["name"] == "alpha"
```
**CORRECT (TypeScript):**
```typescript
expect(result.success).toBe(true);
expect(result.count).toBe(3);
expect(result.rows[0].name).toBe('alpha');
```

### E3 — No Module State Pollution Between Tests
**Why:** Mutating module-level variables in one test affects subsequent tests. Test frameworks don't reset module state.
**Fix:** Capture initial state at module level, or use `@pytest.fixture(autouse=True)` / `beforeEach()` to reset state.

### E4 — Mock External Dependencies
**Why:** Tests that call real APIs or read real files are flaky and slow.
**Python (CORRECT):**
```python
@patch("module.client.call_api")
def test_api_call(self, mock_call):
    mock_call.return_value = {"status": "ok"}
```
**TypeScript (CORRECT):**
```typescript
jest.spyOn(apiClient, 'call').mockResolvedValue({ status: 'ok' });
```
**Go (CORRECT):** Use interfaces with mock implementations for testing.

### E5 — Test Edge Cases
**Why:** Empty input, None values, negative numbers, max length, special characters — these are where bugs hide.
**Check:** For every parameter, test what happens with: empty string, None/null, very long value, unicode, special characters.

### E6 — Test Security Boundaries
**Why:** SQL injection, path traversal, XSS — test these explicitly. A test that proves injection is blocked is worth more than 10 happy-path tests.

### E7 — Run Tests Without Parallel Execution When Debugging
**Why:** Parallel test runners (`xdist`, `jest --maxWorkers`) split tests across workers, making output confusing. Use `-n 0` (pytest) or `--runInBand` (jest) to disable during development.

### E8 — Snapshot Tests Must Be Reviewed
**Why:** Snapshot/approval tests can pass with wrong output if the snapshot was accepted without verification.
**Fix:** Review every snapshot diff before committing. Never blindly `--updateSnapshot`.

---

## SECTION F — NAMING & SCHEMA

### F1 — Parameter Names Must Match Field Names
**Why:** Inconsistency between parameter names and field names causes signaling failures. Parameter `source_url` writing to field `registry_url` is a MEDIUM priority issue.
**CORRECT:** parameter `registry_url` writes to field `registry_url`
**WRONG:** parameter `source_url` writes to field `registry_url`

### F2 — Method/Function Names Describe What They Actually Do
**Why:** A function named `list_available_updates()` that only lists registered modules without checking for updates is misleading.
**CORRECT:** `list_registry_modules()` — accurately describes listing modules from the registry
**WRONG:** `list_available_updates()` — implies it checks remotes for updates

### F3 — Schema Describes What's Implemented
**Why:** Describing "semantic search" but implementing hash-based keyword matching is misleading. The schema/description must match the implementation exactly.
**Check:** Every parameter in the schema must be handled in the implementation. Every format mentioned must be parsed.
**Fix:** If it's not implemented, remove it from the schema.

### F4 — Context/ID In Both Signature AND Handler
**Why:** The task/request ID must be in the function signature AND passed through in the handler callback. Missing from either causes tracking failures.
**CORRECT (Python):**
```python
def your_module(..., task_id: str | None = None) -> str: ...

registry.register(
    handler=lambda args, **kw: your_module(
        ...,
        task_id=kw.get("task_id"),
    ),
)
```

### F5 — Boolean Parameters Should Use Named Constants
**Why:** Calling `process(data, True)` is unreadable. Use keyword arguments or named constants.
**CORRECT:** `process(data, use_cache=True)` or `process(data, CacheMode.ENABLED)`
**WRONG:** `process(data, True)`

---

## SECTION G — VERSION & DEPENDENCY MANAGEMENT

### G1 — Version Constraints Must Enforce Upper Bounds
**Why:** Bare lower bounds (`>=1.2.3`) allow future major versions that may break. Enforce `<next_major` for all dependencies.
**CORRECT:** `httpx>=0.28.1,<1` (Python), `"express": "^4.18.0"` (npm — the `^` means compatible with 4.x)
**WRONG:** `httpx>=0.28.1` (Python — allows 5.0)

### G2 — YAML/JSON Input Must Be Normalized
**Why:** User-provided config may pass a list where a dict is expected (or vice versa). Normalize before processing.
**CORRECT:**
```python
def _normalize_depends(deps):
    if isinstance(deps, list):
        return {d: "" for d in deps}
    if isinstance(deps, dict):
        return deps
    return {}
```
**Check:** Every config parsing path must normalize input types.

### G3 — New Config Fields Must Register in DEFAULT_CONFIG
**Why:** Adding a new config key without registering it in the defaults means the config UI won't surface it and `config set` won't persist it properly.
**Check:** If you add a new config key, add it to the `DEFAULT_CONFIG` equivalent in your project's config module.

### G4 — Pin Git Dependencies To Commit SHAs
**Why:** Branch references (`#main`) can change under you. Tag references (`#v1.0`) can be force-pushed over. Only commit SHAs are immutable.
**CORRECT:** `git+https://...@a1b2c3d4e5f6...`  — full 40-character SHA

### G5 — No Circular Dependencies
**Why:** Circular imports cause runtime errors. The dependency graph must be acyclic.
**Check:** `python -c "import your_module"` — verify no ImportError. For other languages, use dependency analysis tools.

---

## SECTION H — REVIEW RESPONSE

### H1 — Fix Every Issue Before Re-Requesting
**Why:** Leaving P2 or MEDIUM issues unfixed signals carelessness. The reviewer must re-review everything, so fix everything.

### H2 — Respond With Clear Format
**CORRECT:**
```
> **\[P1] Fixed SQL injection by parameterizing table_name** ✅
> Changed f-string to parameterized query. Added regex validation.
```

### H3 — Never Argue Defensively
**Why:** Reviewers have more context about the codebase than we do. If you disagree, provide evidence and ask clarifying questions. Never say "that's not a bug" without proof.

### H4 — Re-Run Full Checklist After Fixes
**Why:** Fixes often introduce new issues. After fixing review findings, run syntax check, tests, and security scan again.

### H5 — Respond To Every Comment
**Why:** Unaddressed comments will be re-raised. Even a "Thanks, fixed!" response closes the loop.
**Check:** Review the PR conversation — are there any comments without a response?

### H6 — One Re-Request Per Fix Cycle
**Why:** Submitting partial fixes multiple times frustrates reviewers. Fix everything, then re-request.
**Fix:** Keep a checklist of findings. Check each one off. Submit only when all are resolved.

---

## SECTION I — ZERO-TOLERANCE (Automatic Rejection)

| ID | Violation | How To Check |
|----|-----------|-------------|
| Z1 | SQL injection via string interpolation | `grep -rn 'f"\|f\'' --include="*.py" \| grep -i "execute\|WHERE\|INSERT\|DELETE"` |
| Z2 | Connection leak (no finally/defer) | `grep -n "\.connect\|\sqlite3\.connect" --include="*.py" \| grep -v "finally"` |
| Z3 | Fake implementation | Verify the implementation actually does what the name/description claims |
| Z4 | Phantom references | Check every name in module registries exists in the branch |
| Z5 | Dead code / ImportError | Run language-appropriate compile/check on every file in diff |
| Z6 | Merge pollution | `git diff --stat origin/main...HEAD` — verify only intended files |
| Z7 | Missing context/ID passthrough | `grep -A5 "handler=lambda" modules/*.py \| grep "task_id"` |
| Z8 | Cross-platform crash | `grep -rn "SIGALRM\|os\.kill\|os\.setsid" --include="*.py"` |
| Z9 | Naming mismatch | Compare parameter names to field names in the implementation |
| Z10 | Pushing without command | Did the user say "push" or "commit"? |
| Z11 | PR body != diff | Every sentence in PR body must correspond to code changes |
| Z12 | Nonexistent function call | `grep -rn "nonexistent_func"` — verify they exist |
| Z13 | Command injection | `grep -rn "shell=True\|exec(user_input\|eval(\\|os\.system"` |
| Z14 | Hardcoded credentials | `grep -rn "sk_live\|AKIA\|api_key.*=" --include="*.py"` |

---

## SECTION J — SUBSYSTEM-SPECIFIC RULES

### J1 — Module Registry
- Must use `registry.register(name=..., namespace=..., schema=..., handler=...)`
- Must add to `_CORE_MODULES` AND `MODULE_SETS` dict in `module_sets.py`
- Request ID in both function signature AND handler lambda
- Schema parameters must match function parameters
- Handler must pass through all context parameters

### J2 — Extension System
- Manifest fields should include: `sandbox`, `capabilities`, `registry_url`, `update_channel`, `depends_on`
- Context methods should include: `register_tool()`, `register_hook()`, `register_command()`
- Always normalize YAML/JSON input (list → dict)
- Validate enum values against allowed sets
- Use atomic writes for state persistence
- Never import core modules from extension code

### J3 — API Server
- Rate limiter must have periodic cleanup (bounded buckets)
- All routes should maintain backward-compatible aliases for version migration
- Request IDs must be properly forwarded through middleware
- OpenAPI/Swagger spec should document all routes
- CORS configuration must not use broad wildcards in production

### J4 — Logging
- Config loading should cache results (60s TTL)
- Verbose/debug logging must be opt-in (env var gated)
- Rotating file handlers prevent disk space issues
- Structured logging (JSON) preferred for production
- Log levels must be configurable at runtime

### J5 — Delegation / Subprocess Management
- `KeyboardInterrupt` and `SystemExit` must be re-raised, never swallowed
- `executor.shutdown(wait=False)` prevents deadlock on stuck threads
- Use `time.monotonic()` for elapsed time, not `time.time()`
- Return structured errors with typed error taxonomy
- Set timeouts on all child processes

### J6 — Configuration System
- All config keys must have defaults registered
- Config merge must be deep (not shallow)
- Environment variable overrides must follow convention
- Config validation must happen at load time, not first use
- Deprecated keys must produce warnings with migration path

### J7 — State/Persistence
- Use atomic writes for all file-based state
- Database sessions must use connection pooling
- Schema migrations must be backward-compatible
- All state must survive process restarts
- In-memory caches are acceptable for ephemeral data only

---

## SECTION K — GLOBAL ECOSYSTEM RULES (Any Contributor, Any Subsystem)

These rules apply to EVERYONE contributing to any open source project — regardless of subsystem, experience level, or role.

### K1 — Read The Contributing Guide First
**Why:** Most projects have CONTRIBUTING.md covering conventions, architecture, and PR process. Most rejected PRs fail because the contributor didn't read these.
**Read:** `CONTRIBUTING.md`, project wiki, docs/developer-guide/

### K2 — Match The Codebase's Language Version
**Why:** A project targeting Python 3.11 will reject 3.13-only features. A project targeting Node 18 will reject 20-only APIs. Check `pyproject.toml`, `package.json`, `go.mod`, `Cargo.toml` for version requirements.
**Check:** `grep "requires-python" pyproject.toml` or `grep "engines" package.json` or `grep "edition" Cargo.toml`

### K3 — Respect The Dependency Chain
**Why:** Low-level modules have zero dependencies and are imported by ALL other modules. Breaking the import chain causes circular imports and runtime errors.
**Check:** Never import high-level modules from low-level files. Keep the dependency graph acyclic.

### K4 — Don't Add Dependencies Without Discussion
**Why:** Every dependency is a security risk, maintenance burden, and potential compatibility issue. Projects pin ALL dependencies with upper bounds.
**Check:** `grep -r "^import\|^from\|^use\|^extern crate" your_file` — are all imports from stdlib or existing deps?

### K5 — Modules Must Be Self-Contained
**Why:** Each module file must be importable without triggering the entire application initialization. Module discovery must not have side effects at import time.
**CORRECT:**
```python
# modules/my_module.py — imports at module level are safe
import json, os
from typing import Optional
```
**WRONG:**
```python
# modules/my_module.py — triggers app initialization at import
from core_agent import Agent  # Circular import risk!
```

### K6 — Module Registration Must Include All Required Fields
**Why:** Registry `register()` calls require: `name`, `namespace`, `schema`, `handler`, `check_fn`. Missing any field causes silent registration failure.
**Check:** Every `registry.register()` call must have all required fields.

### K7 — Extension Changes Must Be Backward-Compatible
**Why:** Users have installed extensions that depend on the existing public API. Breaking changes break user extensions without warning.
**CORRECT:** Add new parameters with defaults. Don't remove or rename existing methods.
**Check:** Are any existing public method signatures changing?

### K8 — Platform Adapters Must Handle Disconnect
**Why:** Network drops, process restarts, and token expirations happen. Every platform adapter must implement cleanup that releases resources.
**Check:** Is there a disconnect/close/shutdown method that properly cleans up?

### K9 — Session Data Must Survive Restarts
**Why:** Session stores must persist across process restarts. In-memory caches are acceptable for ephemeral data but session records must be durable.
**Check:** Is new session data written to durable storage before being acknowledged to the user?

### K10 — All Public Hooks Must Be Registered
**Why:** Extension systems validate hook/event names against a known set. Custom names not in this set produce warnings and won't be invoked.
**Check:** Add new hook/event names to the allowed list before registering them from extensions.

### K11 — Config Keys Must Be Added To Defaults
**Why:** The config system has a `DEFAULT_CONFIG` dict or equivalent. Missing keys aren't surfaced in the config UI and won't persist properly.
**Check:** Does your new config key appear in the default config?

### K12 — Project-Home Paths Are Not Optional
**Why:** Hardcoded home paths break profiles and multi-instance deployments.
**CORRECT:** `from project_constants import get_project_home; get_project_home() / "state"`
**WRONG:** `Path.home() / ".project" / "state"`
**Check:** `grep -rn 'Path.home()\|"\.project"\|"~/"' --include="*.py" | grep -v "get_project_home\|test_\|\.pyc"`

### K13 — Errors Must Return Structured Results (Modules) or Raise Properly (Infrastructure)
**Why:** Module handlers return structured results. Infrastructure code should raise specific exceptions. Mixing these patterns confuses callers.
**Module CORRECT:** `return json.dumps({"success": False, "error": "reason"})`
**Infrastructure CORRECT:** `raise ValueError("reason")`

### K14 — Test Files Must Follow Naming Convention
**Why:** Test frameworks discover files matching `test_*.py`, `*.test.ts`, `*_test.go`, etc. Follow the project convention.
**Python:** `tests/**/test_*.py`
**TypeScript:** `**/*.test.ts` or `**/*.spec.ts`
**Go:** `*_test.go` (same directory)
**Rust:** `tests/` directory or `#[cfg(test)] mod tests` inline

### K15 — No Print / Console.log In Production Code
**Why:** Use logger for all logging. `print()` / `console.log()` cannot be filtered by log level.
**Python CORRECT:** `logger.info("Processing complete")`
**Python WRONG:** `print("Processing complete")`
**JS CORRECT:** `logger.info('Processing complete')`
**JS WRONG:** `console.log('Processing complete')`

### K16 — Async Code Must Follow Project Patterns
**Why:** Direct runtime management (e.g., `asyncio.run()` in tool handlers) causes event loop conflicts.
**Check:** `grep -rn "asyncio\.run\|loop\.run_until_complete" modules/` — these should be in adapters only.

### K17 — Skills/Extensions Must Follow Standard Format
**Why:** If the project has a skills/extension marketplace, it validates against a standard format: frontmatter, description constraints, platforms gating, section order.
**Check:** Does your extension metadata follow the project's standard format?

### K18 — Dependency Pins Must Have Upper Bounds
**Why:** After the litellm compromise (supply-chain attack), projects enforce `>=floor,<next_major` for all PyPI deps, or equivalent for npm/crates.io.
**PyPI CORRECT:** `httpx>=0.28.1,<1`
**PyPI WRONG:** `httpx>=0.28.1`
**npm CORRECT:** `"express": "^4.18.0"` (^ means `>=4.18.0 <5.0.0`)
**npm WRONG:** `"express": ">=4.18.0"` (no upper bound)

### K19 — Avoid Over-Engineering
**Why:** Adding abstract base classes, factory patterns, and generic interfaces where a simple function would do creates complexity without value.
**Check:** Is the abstraction justified by actual (not hypothetical) future needs?
**Fix:** Start simple. Abstract when you have at least two real use cases.

### K20 — Document Design Decisions
**Why:** When you choose one approach over another, leave a comment explaining why. Future contributors (and reviewers) need context.
**CORRECT:**
```python
# Using polling instead of webhooks because the target API
# doesn't support webhook delivery guarantees.
```

---

## SECTION L — GLOBAL ECOSYSTEM RULES (Any OSS Project)

These rules apply to EVERY open source contribution, regardless of project, language, or community. They are derived from patterns observed across thousands of OSS projects.

### L1 — Always Read CONTRIBUTING.md First
**Why:** Every project has its own contribution rules. Violating them shows disrespect and guarantees rejection. 90% of rejected PRs fail because the contributor didn't read the contributing guide.
**Check:** `cat CONTRIBUTING.md` — did you read it?
**Fix:** Read it before writing a single line of code.

### L2 — One PR = One Concern
**Why:** Maintainers review one thing at a time. Multiple features in one PR creates cognitive overload. The PR either gets rejected outright or takes weeks to review.
**Check:** `git diff --stat origin/main...HEAD` — under 10 files, under 500 lines.
**Fix:** Split multi-feature work into separate branches.

### L3 — Discuss Before Coding (The Golden Rule)
**Why:** The #1 reason PRs get rejected. Coding before asking wastes everyone's time. The maintainer may have already started, may not want the feature, or may have a different approach.
**Check:** Is there an issue or discussion thread acknowledging your plan?
**Fix:** Open an issue. Describe your approach. Wait for a response.

### L4 — Tests Are Non-Negotiable
**Why:** Without tests, reviewers cannot verify correctness. Tests prove your code works. Tests prevent regressions. Tests document expected behavior.
**Check:** Does your PR include tests for the new code?
**Fix:** Write tests for success path, error path, and edge cases.

### L5 — Follow Existing Patterns Exactly
**Why:** Projects have internal consistency for a reason. Deviating from patterns creates maintenance burden and signals you didn't study the codebase.
**Check:** Does your code look like the code around it?
**Fix:** Copy from existing files. Match naming, structure, and style.

### L6 — Respond Within 48 Hours
**Why:** Stale PRs get closed. Silence frustrates maintainers. Quick response shows professionalism and keeps momentum.
**Check:** Are you checking notifications daily?
**Fix:** Set notifications to email. Respond within 48 hours.

### L7 — Small Diffs Get Merged Faster
**Why:** A 5-file PR can be reviewed in 15 minutes. A 50-file PR takes 2 hours. Reviewers have limited time.
**Check:** `git diff --stat origin/main...HEAD | tail -1`
**Fix:** Keep PRs under 10 files. Under 500 lines.

### L8 — Write Clear PR Descriptions
**Why:** The PR description is your pitch. A vague description makes reviewers work harder. A clear description makes them trust you.
**Template:**
```markdown
## Summary
- What changed: [one sentence]
- Why it changed: [one sentence]

## Testing
- [ ] All tests pass
- [ ] Manual testing: [what you did]

## Notes
- Limitations: [any]
- Follow-up: [any]
```

### L9 — Accept Feedback Gracefully
**Why:** Reviewers have more context. Arguing with feedback damages relationships and reputation.
**CORRECT:** "Thanks for catching that. I'll fix it."
**WRONG:** "This is actually correct because..."

### L10 — Don't Submit Multiple PRs at Once
**Why:** Submitting 5 PRs simultaneously overwhelms reviewers. Each PR competes for attention. They all get slower reviews.
**Fix:** One PR at a time. Wait for resolution before submitting the next.

### L11 — Keep Branch Up to Date
**Why:** Stale branches cause merge conflicts. The longer your branch lives, the harder it is to merge.
**Fix:** `git fetch origin; git rebase origin/main` — do this weekly.

### L12 — Don't Force Push Shared Branches
**Why:** Force pushing rewrites history. If others have pulled your branch, you break their work.
**Fix:** Use `git push --force-with-lease` on solo branches only.

### L13 — No Relying on CI Alone
**Why:** CI can be slow, flaky, or misconfigured. Always run tests locally before pushing.
**Fix:** Run tests, compilation checks, and lint locally.

### L14 — Document Breaking Changes
**Why:** Silent breaking changes anger users and create maintenance burden.
**Fix:** Add deprecation warnings. Provide migration paths. Document in PR.

### L15 — Don't Mix Refactoring with Features
**Why:** Refactoring + new feature in one PR makes review impossible. The reviewer can't tell what's what.
**Fix:** One PR for refactoring. One PR for the feature.

### L16 — Don't Add Dependencies Without Discussion
**Why:** Every dependency is a security risk, maintenance burden, and potential compatibility issue.
**Fix:** Ask in the issue before adding any new dependency.

### L17 — No Dead Code, No Debug Code
**Why:** Dead code signals incomplete work. Debug code (`print`, `console.log`) clutters production output.
**Fix:** Remove TODOs, debug prints, and unused functions before push.

### L18 — Commit Messages Tell a Story
**Why:** Good commit messages help reviewers understand intent. Bad messages ("fix", "update") waste time.
**CORRECT:**
```
feat(tools): add database schema inspection module

Implements PRAGMA table_info with identifier validation.
Required for database debugging workflows.
```
**WRONG:** `update` or `fix` or `changes`

### L19 — Security Is Everyone's Responsibility
**Why:** SQL injection, command injection, and hardcoded secrets are not just "the security team's problem."
**Fix:** Run security scans on every PR. Parameterize all queries. Validate all inputs.

### L20 — Know When to Withdraw
**Why:** If a PR is clearly not aligned, don't fight it. Withdraw gracefully and learn.
**CORRECT:** "I understand this doesn't fit the project vision. Thanks for the feedback."
**WRONG:** "But this is really useful! You should accept it."

### L21 — Credit Prior Work
**Why:** Building on someone else's work without credit is poor form. Always acknowledge prior contributions.
**Fix:** In the PR description, mention if your work is inspired by or builds upon another PR or issue.

### L22 — License Compatibility
**Why:** Your contribution must be compatible with the project's license. GPL code cannot be contributed to Apache-2.0 projects.
**Check:** `cat LICENSE` — understand the project's license before contributing.

---

## SECTION M — GLOBAL ANTI-PATTERNS (Guaranteed Rejection)

These anti-patterns guarantee rejection in ANY OSS project. Avoid them at all costs.

### M1 — The "Kitchen Sink" PR
Multiple unrelated features in one PR. Shows poor planning.
**Fix:** Split into one PR per feature.

### M2 — The "Drive-By" PR
Submit and disappear. Don't respond to feedback.
**Fix:** Stay engaged. Respond within 48 hours.

### M3 — The "I Know Best" PR
Ignore maintainer feedback. Argue every point.
**Fix:** Accept feedback. Maintainers have more context.

### M4 — The "Forklift" PR
Massive refactoring without discussion. 100+ files changed.
**Fix:** Incremental changes. Discuss first.

### M5 — The "Test-Free" PR
No tests for new code. "It works on my machine."
**Fix:** Tests are mandatory. No exceptions.

### M6 — The "Copy-Paste" PR
Code copied from tutorials or other projects without adaptation.
**Fix:** Study the codebase. Write idiomatic code.

### M7 — The "Feature Creep" PR
Scope expands during implementation. "While I was in there..."
**Fix:** Stick to the original scope. Save extras for new PRs.

### M8 — The "Blog Post" PR Description
Vague description with no substance. "Fixed things."
**Fix:** Use the PR template. Explain what and why.

### M9 — The "Surprise" PR
Big changes with no prior discussion. No issue. No acknowledgment.
**Fix:** Always open an issue first.

### M10 — The "Ghost" PR
Perfect initial submission, then disappear when changes are requested.
**Fix:** Complete what you start.

### M11 — The "Stealth Change" PR
Making functional changes without updating tests, docs, or types.
**Fix:** Every functional change must include test + doc + type updates.

### M12 — The "YOLO" PR
"I didn't test it but it should work." No testing, no verification.
**Fix:** Test every change before submitting. Verify compilation.

### M13 — The "Bikeshed" PR
Spending 90% of the review cycle arguing about formatting, naming, or trivial details.
**Fix:** Follow existing conventions. Don't debate style in PRs.

---

## SECTION N — GLOBAL PROJECT TYPE GUIDELINES

Different project sizes have different expectations:

### Small Projects (<1k stars)
- More flexible on process
- Direct communication with maintainers is easier
- May accept larger changes
- Faster review times
- Less formal PR templates
- Good for first-time contributors

### Medium Projects (1k-10k stars)
- Growing process requirements
- CONTRIBUTING.md is essential
- PR templates expected
- Multiple reviewers possible
- CI checks expected
- Code of conduct typically enforced

### Large Projects (10k-50k stars)
- Strict process adherence required
- RFCs for major features
- Multiple review cycles expected
- Longer review times (3-7 days)
- Code ownership areas
- Usually have dedicated maintainer teams

### Enterprise Projects (50k+ stars)
- Maximum process adherence
- Legal/compliance considerations
- Security reviews required
- Very selective about features
- May have CLA requirements
- Governance processes (TSC, RFCs)
- Regular release cadence with breaking change windows

### Language-Specific Considerations

**Python projects:**
- PEP 8 compliance expected
- Type hints increasingly required
- `pyproject.toml` over `setup.py`
- Virtual environments for development
- ruff/flake8 for linting, mypy/pyright for type checking
- pytest preferred over unittest

**TypeScript/JavaScript projects:**
- ESLint + Prettier standard
- TypeScript strict mode common
- Package manager varies (npm, yarn, pnpm, bun)
- Test framework varies (jest, vitest, bun:test, mocha)
- Build tools vary (webpack, vite, esbuild, tsc)
- Avoid CommonJS/ESM interop issues

**Rust projects:**
- `cargo fmt` + `cargo clippy` mandatory
- Documentation tests expected
- Feature gates for optional functionality
- `#![deny(unsafe_code)]` common for pure Rust
- Cargo workspaces for multi-crate repos

**Go projects:**
- `gofmt` is non-negotiable
- Interface-based design
- Vendor directory management (go vendor)
- `go mod tidy` before commits
- Context propagation through first parameter

**Java/Kotlin projects:**
- Build system varies (Gradle, Maven, Bazel)
- Checkstyle/SpotBugs for code quality
- JUnit 5 for testing
- Dependency management varies (Maven Central, private registries)

**Ruby projects:**
- RuboCop for style enforcement
- RSpec for testing
- Bundler for dependency management
- Gemfile.lock must be committed

**C/C++ projects:**
- Build system varies (CMake, Meson, Make)
- Compiler warnings as errors common
- Static analysis (clang-tidy, cppcheck)
- Address sanitizer for testing
- Header-only vs compiled library patterns

---

## SECTION O — GLOBAL CONTRIBUTION WORKFLOW

This workflow applies to ALL OSS projects:

### Phase 1: Discovery
1. Find an issue or feature you want to work on
2. Study the codebase and understand existing patterns
3. Read the contributing guide thoroughly
4. Verify the issue isn't already assigned

### Phase 2: Discussion
1. Open an issue or discussion thread
2. Describe your proposed change and approach
3. Wait for maintainer acknowledgment
4. Ask clarifying questions if needed
5. Get consensus on approach before coding

### Phase 3: Implementation
1. Branch from the latest main (or specified base)
2. Make the smallest possible change
3. Follow existing patterns exactly
4. Write tests as you go (TDD recommended)
5. Keep commits focused and descriptive
6. Update documentation alongside code changes

### Phase 4: Verification
1. Run full test suite locally
2. Run linting and type checking
3. Run security scans
4. Self-review your entire diff
5. Verify PR description matches the diff
6. Check for any new warnings introduced

### Phase 5: Submission
1. Push your branch
2. Open a PR with a clear description
3. Reference the issue number
4. Link to relevant documentation
5. Explain testing approach and results
6. @mention maintainers if project policy allows

### Phase 6: Review Response
1. Monitor for comments (check daily)
2. Respond within 48 hours
3. Fix all P1/P2 findings before re-requesting
4. Communicate timelines if you need more time
5. Never argue or get defensive
6. Re-run tests after each fix cycle

### Phase 7: Merge and Follow-up
1. Thank the reviewer
2. Delete your feature branch
3. Update any related documentation
4. Monitor for regressions
5. Plan your next contribution
6. Consider reviewing others' PRs to reciprocate

---

## SECTION P — GLOBAL COMMUNICATION STANDARDS

### Issue Etiquette
- Search existing issues before opening a new one
- Use the issue template if provided
- Be specific: include error messages, versions, reproduction steps
- Don't comment "me too" without additional information
- Don't bump issues ("any update?") within 48 hours
- Close your own issue if you find the solution
- Provide minimal reproduction steps (not your entire codebase)

### PR Etiquette
- Use the PR template
- Keep descriptions concise but complete
- Link to related issues
- Explain your approach, not just what changed
- Acknowledge all review comments
- Don't force-push during active review (makes it hard to see what changed)
- Use fixup commits during review; squash before merge

### Review Etiquette
- Thank reviewers for their time
- Address every comment
- Ask clarifying questions if needed
- Explain reasoning for design choices
- Accept final decisions gracefully
- If a reviewer asks for a change, either make it or explain why not

### Community Etiquette
- Be helpful in discussions
- Review others' PRs constructively
- Answer questions you know the answer to
- Report bugs with reproduction steps
- Credit others' work and ideas
- Assume good intent
- Follow the project's Code of Conduct

### Code Review Etiquette (For Reviewers)
- Be specific in your feedback
- Explain *why* something is wrong, not just *what*
- Separate blocking issues from suggestions
- Acknowledge good code when you see it
- Respond to re-requests promptly
- Use "nit:" prefix for non-blocking style suggestions

---

## SECTION Q — GLOBAL TOOLING CHECKLIST

### Pre-Push Commands (Every Project, Every PR)

**For Python projects:**
```bash
# 1. Syntax check
for f in $(git diff --name-only origin/main...HEAD); do
  python -c "import py_compile; py_compile.compile('$f', doraise=True)" || exit 1
done

# 2. Run tests
python -m pytest tests/ -q -n 4 || exit 1

# 3. Lint
python -m ruff check your_file.py || exit 1
python -m mypy your_file.py || exit 1

# 4. Security scan
grep -rn 'f"\|f\'' . --include="*.py" | grep -i "execute\|WHERE\|INSERT\|DELETE" && exit 1
grep -rn "os\.system\|shell=True" . --include="*.py" && exit 1
grep -rn "sk_live\|AKIA" . --include="*.py" && exit 1

# 5. Diff check
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD | wc -l  # Should be 1

# 6. Self-review
echo "Read every file in:"
git diff --name-only origin/main...HEAD
```

**For Node.js/TypeScript projects:**
```bash
# 1. Build
npm run build || exit 1

# 2. Test
npm test || exit 1

# 3. Lint
npm run lint || exit 1

# 4. Type check
npx tsc --noEmit || exit 1

# 5. Security
npm audit || exit 1
grep -rn "exec(\|execSync(" . --include="*.ts" --include="*.js" | grep -v "const\|let\|var" || exit 1

# 6. Diff check
git diff --stat origin/main...HEAD
```

**For Rust projects:**
```bash
# 1. Build
cargo build || exit 1

# 2. Test
cargo test || exit 1

# 3. Format check
cargo fmt --check || exit 1

# 4. Lint
cargo clippy -- -D warnings || exit 1

# 5. Security
cargo audit || exit 1
```

**For Go projects:**
```bash
# 1. Build
go build ./... || exit 1

# 2. Test
go test ./... || exit 1

# 3. Format
gofmt -l . || exit 1

# 4. Vet
go vet ./... || exit 1
```

**For Java/Kotlin projects:**
```bash
# 1. Build
./gradlew build || exit 1

# 2. Test
./gradlew test || exit 1

# 3. Lint
./gradlew checkstyleMain || exit 1
```

**For Ruby projects:**
```bash
# 1. Install deps
bundle install || exit 1

# 2. Test
bundle exec rspec || exit 1

# 3. Lint
rubocop || exit 1
```

### Universal Pre-Push Checklist

```bash
# These commands work for ANY language/project:
# 1. Check what's changed
git diff --stat origin/main...HEAD

# 2. Check commit count
git log --oneline origin/main..HEAD | wc -l

# 3. Self-review
git diff origin/main...HEAD | less

# 4. Security check (universal)
grep -rn "password\|secret\|token\|key.*=" . --include="*.py" --include="*.ts" --include="*.js" --include="*.rs" --include="*.go" --include="*.java" | grep -v "\.env\|test\|mock\|\.git" | grep "="
```

---

## SECTION R — GLOBAL DECISION FRAMEWORK

When deciding whether to contribute, ask:

### Should I work on this?
- [ ] Does the project need this feature?
- [ ] Is there an existing issue requesting it?
- [ ] Does it align with the project's roadmap?
- [ ] Is someone else already working on it?
- [ ] Is there a simpler approach?
- [ ] Do I have time to see this through review?

### Is my PR ready?
- [ ] Did I discuss this before coding?
- [ ] Is this ONE change?
- [ ] Are there tests?
- [ ] Is the code clean (no TODOs, no debug)?
- [ ] Does the description match the diff?
- [ ] Did I self-review every file?
- [ ] Did I run tests and lint locally?
- [ ] Did I update documentation?
- [ ] Are all dependencies justified?

### How should I respond to review?
- [ ] Did I thank the reviewer?
- [ ] Did I fix every P1 finding?
- [ ] Did I respond to every comment?
- [ ] Did I re-run tests after fixes?
- [ ] Did I keep my response professional?
- [ ] Did I explain my reasoning for any decisions I kept?

### Should I start contributing to this project?
- [ ] Is the project actively maintained (recent commits, responsive maintainers)?
- [ ] Are there good first issues labeled?
- [ ] Is the contributing guide clear?
- [ ] Is the community welcoming (check recent PR discussions)?
- [ ] Does the project's tech stack match my skills?

---

## SECTION S — GLOBAL COMMIT MESSAGE REFERENCE

### Conventional Commits Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
| Type | When to Use | Example |
|------|-------------|---------|
| feat | New feature | `feat(tools): add database schema inspection` |
| fix | Bug fix | `fix(agent): handle null user input` |
| docs | Documentation | `docs: update CONTRIBUTING.md` |
| style | Code style (formatting) | `style: fix indentation` |
| refactor | Code restructuring | `refactor(plugins): extract validation` |
| test | Adding tests | `test(tools): add SQL injection tests` |
| chore | Maintenance | `chore: update dependencies` |
| perf | Performance | `perf(agent): cache config reads` |
| security | Security fix | `security: parameterize SQL queries` |
| ci | CI/CD changes | `ci: update GitHub Actions` |
| build | Build system | `build: update cargo dependencies` |
| revert | Revert previous change | `revert: remove experimental feature` |

### Good vs Bad Examples

**GOOD:**
```
feat(tools): add database schema inspection tool

Implements PRAGMA table_info and schema listing for SQLite.
Handles identifier validation and parameterized queries.
Required for database debugging workflows.

Fixes #123
```

**BAD:** `update` — Too vague, no context
**BAD:** `fix` — Doesn't say what was fixed
**BAD:** `changes` — Doesn't describe anything
**BAD:** `asdf` — Clearly rushed or automated
**BAD:** `WIP` — Should not be on main branch

### Footer References
- `Fixes #123` — Closes issue on merge
- `Closes #456` — Closes issue on merge
- `Refs #789` — References related issue
- `BREAKING CHANGE:` — Marks breaking API change
- `Co-authored-by: Name <email>` — Credit co-authors
- `Signed-off-by: Name <email>` — DCO sign-off

---

## SECTION T — GLOBAL RESOURCES

### Essential Reading for Every Contributor

1. **How to Contribute to Open Source** — https://opensource.guide/how-to-contribute/
2. **GitHub Pull Request Tutorial** — https://docs.github.com/en/pull-requests
3. **Conventional Commits** — https://www.conventionalcommits.org/
4. **Semantic Versioning** — https://semver.org/
5. **Keep a Changelog** — https://keepachangelog.com/
6. **Open Source Guides** — https://opensource.guide/
7. **Pro Git Book** — https://git-scm.com/book/
8. **Writing Good Commit Messages** — https://cbea.ms/git-commit/

### Project-Specific (Check Your Project's Docs)

- `CONTRIBUTING.md` — Contribution rules (START HERE)
- `README.md` — Project overview and setup
- `CODE_OF_CONDUCT.md` — Community standards
- `SECURITY.md` — Security reporting process
- `CHANGELOG.md` — Release history
- `LICENSE` — License information
- `GOVERNANCE.md` — Project governance (if exists)
- `ROADMAP.md` — Upcoming plans (if exists)

### Language-Specific Tooling References

**Python:**
- `ruff` — Fast Python linter (replaces flake8 + isort)
- `mypy` / `pyright` — Static type checking
- `pytest` — Testing framework
- `pre-commit` — Git hook framework

**TypeScript/JavaScript:**
- `ESLint` — Linting
- `Prettier` — Formatting
- `TypeScript` — Type checking
- `jest` / `vitest` — Testing

**Rust:**
- `clippy` — Linting
- `rustfmt` — Formatting
- `cargo-audit` — Security auditing

**Go:**
- `gofmt` / `go vet` — Formatting and analysis
- `staticcheck` — Advanced linting

### Security Tools
- GitHub Secret Scanning — Built-in credential detection
- Socket.dev / Dependabot — Dependency vulnerability scanning
- `bandit` (Python) — Security linter
- `npm audit` (Node.js) — Known vulnerability check
- `cargo audit` (Rust) — Security auditing

---

## SECTION U — FINAL REMINDERS

### The Ten Non-Negotiables

1. **Discuss before coding** — Always. Every time.
2. **One change per PR** — No exceptions.
3. **Tests required** — Every feature, every fix.
4. **Follow patterns** — Copy exactly from existing code.
5. **Small diffs** — Under 10 files, under 500 lines.
6. **PR body = diff** — Every sentence corresponds to code.
7. **Respond fast** — Within 48 hours to all feedback.
8. **Self-review** — Read your own diff before pushing.
9. **Security first** — No SQL injection, no leaks, no secrets.
10. **Be professional** — Accept feedback, never argue.

### The Three Commitments

1. **I will not submit code I haven't tested.**
2. **I will not submit code I don't understand.**
3. **I will respond to feedback within 48 hours.**

### If You Remember Nothing Else

> **Discuss first. One change. Tests included. Patterns followed. Respond fast.**

That's it. Five rules. Follow them and your PRs will be merged.

---

### Quick Reference: Language-Specific Checks

| Language | Compile/Check | Lint | Test | Format | Security |
|----------|--------------|------|------|--------|----------|
| Python | `py_compile` | `ruff` | `pytest` | `ruff format` | `bandit` |
| TypeScript | `tsc --noEmit` | `eslint` | `jest`/`vitest` | `prettier` | `npm audit` |
| Rust | `cargo check` | `clippy` | `cargo test` | `rustfmt` | `cargo audit` |
| Go | `go build` | `go vet` | `go test` | `gofmt` | `staticcheck` |
| Java | `./gradlew build` | `checkstyle` | `./gradlew test` | — | `spotbugs` |
| Ruby | `ruby -c` | `rubocop` | `rspec` | — | `bundler-audit` |

---

*Last updated: 2026-05-18*
*Covers lessons from: 100+ PR patterns across Python, TypeScript, Rust, Go, Java, Ruby, and C/C++ ecosystems*
*Total rules: 120+ across 21 sections (A through U)*

*Global ecosystem sections (K through U) apply to ANY OSS contributor, ANY project, ANY language.*
