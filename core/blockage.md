# Blockage Patterns — Complete Rejection Prevention Guide

> Every blockage pattern here caused a real review finding across 14+ OSS PRs.
> **This is the definitive list of what NOT to do.**
> Each entry has: the pattern, why it's a blockage, where it was observed, and the fix.

---

## SECTION 1 — CRITICAL BLOCKERS (P1 — Automatic Rejection)

### B1.1 — SQL Injection via f-string
**Observed:** Database tool PRs across multiple projects
**The Problem:** `cursor.execute(f"PRAGMA table_info(\"{table_name}\")")` — table_name from user input directly embedded in SQL with no validation or parameterization. This is the most severe security vulnerability possible in a database module.
**Why It's A Blocker:** SQL injection can drop tables, read arbitrary data, and compromise the entire database. Reviewers flagged this as BLOCKER immediately.
**The Fix:**
```python
if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", table_name):
    return json.dumps({"success": False, "error": "Invalid table name"})
cursor.execute(f"PRAGMA table_info(\"{table_name}\")")  # Safe AFTER validation
```
**Detection:** `grep -rn 'f"\|f\'' --include="*.py" | grep -i "cursor.execute\|WHERE\|INSERT\|DELETE"`

### B1.2 — Fake/Placeholder Implementation
**Observed:** A tool that claimed "semantic search" but used hash-based matching
**The Problem:** `_embed()` function used SHA256 hash of text, converted to floats, and called it "semantic embeddings." Two texts with identical meaning but different wording produce completely unrelated vectors. Cosine similarity of SHA256 hashes is essentially random.
**Why It's A Blocker:** The module claims a capability but delivers a completely different (and broken) implementation. This is misrepresentation. The reviewer's verdict was: "DO NOT SUBMIT — fake implementations are misleading."
**The Fix:** Either use real embeddings (e.g., via an LLM client call) for actual functionality, or rename the tool to match what it actually does.
**Detection:** `grep -rn "hashlib\|sha256\|_embed\|_encode" --include="*.py"` — check if these are used for claimed "embeddings" or "search"

### B1.3 — Phantom References to Non-Existent Modules
**Observed:** A project's registry referencing tools that never existed in the codebase
**The Problem:** The central module registry referenced `rest_api_call` and `data_processor`, but no corresponding source files existed in the branch. The reviewer confirmed "404 on the main branch, and no matching files in this PR's diff."
**Why It's A Blocker:** When the registry system loads, it tries to discover these modules. Since no files register them, the resolver either silently skips them (making the registry empty/broken) or raises a `KeyError` at runtime.
**The Fix:** Only reference modules that exist in the current branch. Keep each PR self-contained.
**Detection:** Cross-reference every name in the project's central registry against existing module files

### B1.4 — Dead Code Causing IndentationError/ImportError
**Observed:** Multiple PRs with orphan code blocks that prevented module import
**The Problem:** Leftover dead code from an old implementation referenced undefined variables and had orphan `except` blocks. This caused `IndentationError` — the file couldn't even be imported. Another case had an unreachable branch inside a code path where an earlier condition already returned early.
**Why It's A Blocker:** If the file can't be imported or parsed, nothing works. Dead code also signals incomplete refactoring.
**The Fix:** Run a compile check on EVERY file:
```bash
python -c "import py_compile; py_compile.compile('path/to/module.py', doraise=True)"
```
Remove orphan code blocks, unreachable branches, and unused variables.
**Detection:** `python -c "import py_compile; py_compile.compile('src/YourModule.py', doraise=True)"`

### B1.5 — Resource/Connection Leak (No try/finally)
**Observed:** Multiple database-related PRs across several projects
**The Problem:** `conn.close()` was inside `try` blocks. If an error occurred before `close()`, execution jumped to `except`, skipping cleanup. This left database connections open — a resource leak that can exhaust connection pools. This pattern appeared in THREE different PRs and was flagged every single time.
**Why It's A Blocker:** Resource leaks degrade production stability. This is the most common HIGH priority finding across OSS projects.
**The Fix:**
```python
conn = None
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    ...
except Exception as e:
    return error(str(e))
finally:
    if conn:
        conn.close()
```
**Detection:** `grep -n "\.connect\|\sqlite3\.connect\|\.open\|connect(" --include="*.py" | grep -v "finally"`

### B1.6 — Merge Pollution (Wrong Base Branch)
**Observed:** Feature branch created from an outdated local main
**The Problem:** Branch was created from local `main` which was hundreds of commits behind `origin/main`. The diff showed hundreds of thousands of additions and deletions across thousands of files. The PR was impossible to review.
**Why It's A Blocker:** The reviewer cannot determine which changes belong to the PR vs which are from the outdated base.
**The Fix:** Always branch from the latest remote target:
```bash
git fetch origin main
git checkout -b feat/your-branch origin/main
```
**Detection:** `git log --oneline origin/main..HEAD | wc -l` — should be a small number of commits

### B1.7 — PR Description Doesn't Match Diff
**Observed:** PR describing 4 features with only a handful of lines changed
**The Problem:** PR body described 4 features (verbose mode, distributed tracing, debug command, diagnose feature) but the diff was ~16 LOC across 2 files. None of the described features were actually implemented. The reviewer said: "the body and the diff don't match."
**Why It's A Blocker:** The reviewer expected working implementations of 4 features and got almost nothing. This erodes trust immediately.
**The Fix:** Only describe what's actually in the diff. One feature per PR.
**Detection:** Read the PR body. Does every sentence correspond to a code change?

---

## SECTION 2 — HIGH PRIORITY (P2 — Major Rework Required)

### B2.1 — Unused Import (import os without use)
**Observed:** Multiple PRs in various projects
**The Problem:** `import os` was at the top of files that never called any `os.*` function. Dead import signals unused code paths and suggests copy-paste from another file.
**Detection:** `grep -n "^import os" --include="*.py"` — then check if `os.` is used anywhere in the file
**The Fix:** Remove unused imports. Use `ruff check --select=F401` for automated detection.

### B2.2 — Duplicate Code Inlined Multiple Times
**Observed:** Module with the same dictionary literal appearing in two branches
**The Problem:** The same dictionary literal appeared twice — once in one conditional branch and once in the else branch. This is copy-paste code that will inevitably diverge.
**The Fix:** Extract to module-level constant:
```python
QUALITY_SCORES = {"model-alpha": 0.95, "model-beta": 0.9, ...}
```
**Detection:** `grep -n "quality_score\|scoring_map\|weights\|config_dict" --include="*.py"` — if the same literal appears more than once, extract it

### B2.3 — Version Constraint Not Enforcing Upper Bound
**Observed:** A dependency version resolver with a broken caret constraint
**The Problem:** `^1` with installed version `2.0.0` returned `True` instead of `False`. The `len(c) < 2` guard skipped the upper-bound check entirely when the constraint had only a major version component.
```python
# WRONG — allows ^1 to match 2.0.0
if constraint.startswith("^"):
    c = _parse_version(constraint[1:])
    return iv >= c and (len(c) < 2 or iv < (c[0] + 1, 0, 0))
```
**The Fix:**
```python
if constraint.startswith("^"):
    c = _parse_version(constraint[1:])
    return iv >= c and iv < (c[0] + 1, 0, 0)
```

### B2.4 — Context Manager Doesn't Work On Windows
**Observed:** A timeout guard using Unix-only signals
**The Problem:** `signal.SIGALRM` only exists on Unix. On Windows, importing `signal.SIGALRM` raises `AttributeError`. The guard used `if sys.platform == "win32": yield; return` with no warning.
**The Fix:**
```python
if sys.platform == "win32":
    logger.warning("Timeout not available on Windows")
    yield
    return
```

### B2.5 — Unvalidated Enum/YAML Fields
**Observed:** Configuration fields parsed from YAML with no validation
**The Problem:** Fields parsed from configuration files were accepted as-is with no validation. Invalid values silently caused unexpected behavior.
**The Fix:**
```python
VALID_CHANNELS = {"stable", "beta", "dev"}
raw = data.get("update_channel", "stable")
channel = raw if raw in VALID_CHANNELS else "stable"
if raw != channel:
    logger.warning("Invalid channel '%s', falling back to 'stable'")
```

### B2.6 — Naming Mismatch (Parameter != Field)
**Observed:** A plugin installer where parameter names didn't match config field names
**The Problem:** `def install_plugin(self, name: str, source_url: str = "", ...)` wrote to `registry_url` field in the YAML. The parameter `source_url` and field `registry_url` had different names for the same concept.
**The Fix:** Parameter names must match field names.

### B2.7 — Directory Creation On Property Access
**Observed:** A property that created directories as a side effect of reading
**The Problem:** `@property def state_dir(self): ... mkdir(parents=True, exist_ok=True)` created a directory every time the property was read, not just when writing. Reading state should not have side effects.
**The Fix:** `mkdir` belongs in the save method, not the property.

### B2.8 — Misleading Method Name
**Observed:** A method that claimed to check for updates but only listed what was configured
**The Problem:** The method named `list_available_updates()` didn't check any remote sources for updates — it only listed items that had a registry URL configured. The name implied remote checking.
**The Fix:** Rename to `list_registry_items()` or implement actual update checking.

---

## SECTION 3 — MEDIUM PRIORITY (Rework Required)

### B3.1 — Empty Candidates After Filter (No Fallback)
**Observed:** A provider filtering system with no empty-state handling
**The Problem:** If a filter removed all candidate models, the result set became an empty list, producing empty recommendations with no explanation.
**The Fix:** Add fallback — if no candidates match the filter, show all options with a note explaining why.

### B3.2 — YAML List Causes AttributeError On .items()
**Observed:** A field that could be either a list or dict in user config
**The Problem:** User writes `depends_on: [item_a]` (a YAML list), but the code expects a dict and calls `.items()`. This raises `AttributeError`.
**The Fix:**
```python
def _normalize_depends(deps):
    if isinstance(deps, list):
        return {d: "" for d in deps}
    if isinstance(deps, dict):
        return deps
    return {}
```

### B3.3 — stderr Not Captured In Debug Output
**Observed:** A debug capture function that only captured stdout
**The Problem:** `sys.stdout` was captured but `sys.stderr` was not. If the target function wrote errors to stderr, they were lost.
**The Fix:**
```python
old_stderr = sys.stderr
sys.stderr = capture  # Capture both stdout and stderr
```

### B3.4 — Header Not Forwarded To Request
**Observed:** An HTTP client where custom headers were silently dropped
**The Problem:** Custom headers were set in a local `headers` variable, but the internal request method called its own header builder, ignoring the custom headers. The custom header feature was silently broken.
**The Fix:** Pass extra headers to the request method via a dedicated parameter or merge them before calling.

### B3.5 — No Caching On Config Read
**Observed:** A config reader that re-read and re-parsed YAML from disk on every call
**The Problem:** `_read_config()` read and parsed YAML from disk on every call. For frequently-called paths, this is wasted I/O.
**The Fix:** Add a simple cache with TTL:
```python
_config_cache = {"ts": 0, "val": (None, None, None)}
now = time.time()
if _config_cache["ts"] and now - _config_cache["ts"] < 60:
    return _config_cache["val"]
```

### B3.6 — Dead Function Parameter
**Observed:** A state persistence function with a never-used parameter
**The Problem:** A function had a `force: bool = False` parameter that was never used. Dead parameter signals incomplete implementation.
**The Fix:** Remove unused parameters.

### B3.7 — Module-Level Constant Never Used
**Observed:** A module with an unreferenced constant
**The Problem:** A constant like `AUTO_SAVE_INTERVAL = 30` was defined at module level but never referenced anywhere in the code.
**The Fix:** Remove unused constants or implement the feature that uses them.

---

## SECTION 4 — LOW PRIORITY (Should Fix)

### B4.1 — `import os` Unused (see B2.1)

### B4.2 — Docstring Missing Or Incomplete
**Observed:** Multiple PRs across many projects
**The Fix:** Every public function needs Args, Returns, and Raises sections in docstrings.

### B4.3 — Broad Exception Instead Of Specific
**Observed:** Multiple PRs across many projects
```python
# WRONG
except Exception as e:
# CORRECT
except (OSError, TypeError) as e:
```

### B4.4 — Return Type Hint Missing
**Observed:** Multiple PRs across many projects
**The Fix:** `def func() -> str:` not just `def func():`

### B4.5 — Version Parser Returns Weak Sentinels
**Observed:** A version parser that returned a valid-seeming sentinel on failure
**The Problem:** Returns `(0,)` on failure, which could match valid versions.
**The Fix:** Return `()` (empty tuple) — comparison with any non-empty tuple returns False.

---

## SECTION 5 — BLOCKAGE MASTER LIST (Quick Reference)

| ID | Blockage | Severity | Detection Command |
|----|----------|----------|-------------------|
| 01 | SQL injection via f-string | BLOCKER | `grep -rn 'f"\|f\'' --include="*.py" \| grep -i "execute\|WHERE"` |
| 02 | Fake/placeholder implementation | BLOCKER | `grep -rn "hashlib\|sha256\|_embed" --include="*.py"` |
| 03 | Phantom references | BLOCKER | Cross-ref central registry vs actual source files |
| 04 | Dead code / IndentationError | BLOCKER | `python -c "import py_compile; py_compile.compile(...)"` |
| 05 | Connection/resource leak | BLOCKER | `grep "\.connect\|\.open(" \| grep -v "finally"` |
| 06 | Merge pollution (thousands of files) | BLOCKER | `git diff --stat origin/main...HEAD` |
| 07 | PR body != diff | BLOCKER | Read PR body vs diff |
| 08 | Unused import os | HIGH | `grep "^import os" --include="*.py"` |
| 09 | Duplicate code inlined | HIGH | Check for repeated literal patterns |
| 10 | Version constraint bug | HIGH | Test edge cases in constraint parser |
| 11 | Windows SIGALRM crash | HIGH | `grep "SIGALRM" --include="*.py"` |
| 12 | Unvalidated config fields | HIGH | `grep "data.get(" --include="*.py"` without validation |
| 13 | Naming mismatch | HIGH | Compare param names to field names |
| 14 | Directory creation on read | HIGH | Check property side effects |
| 15 | Misleading method name | HIGH | Check method name vs implementation |
| 16 | Empty candidates after filter | MEDIUM | Check fallback logic |
| 17 | YAML list AttributeError | MEDIUM | Check type normalization guards |
| 18 | stderr not captured | MEDIUM | Check stream capture in debug functions |
| 19 | Header not forwarded | MEDIUM | Check header passing flow in HTTP clients |
| 20 | Config read no cache | MEDIUM | Check config read frequency |
| 21 | Dead function parameter | MEDIUM | `grep "force:\|unused_param" --include="*.py"` |
| 22 | Unused constant | MEDIUM | `grep "UNUSED_CONSTANT" --include="*.py"` |

---

## SECTION 6 — PREVENTION CHECKLIST (Run Before Every PR)

```bash
# 1. SYNTAX — All files must compile
for f in $(git diff --name-only origin/main...HEAD); do
  python -c "import py_compile; py_compile.compile('$f', doraise=True)" || exit 1
done

# 2. SECURITY — No SQL injection
grep -rn 'f"\|f\'' --include="*.py" | grep -i "execute\|WHERE\|INSERT\|DELETE" && exit 1

# 3. SECURITY — No shell injection
grep -rn "os\.system\|shell=True" --include="*.py" && exit 1

# 4. RELIABILITY — No connection leaks
grep -rn "\.connect\|\.open(" --include="*.py" | grep -v "finally" && exit 1

# 5. QUALITY — No unused imports
grep -rn "^import os" --include="*.py" | while read f; do
  grep -q "os\." "${f##*:}" || echo "WARNING: $f has unused import os"
done

# 6. CROSS-PLATFORM — No POSIX-only on Windows
grep -rn "SIGALRM\|SIGTERM\|SIGHUP" --include="*.py" && echo "WARNING: Signals need Windows fallback"

# 7. DIFF INTEGRITY — Only intended files
git diff --stat origin/main...HEAD | tail -1
# Check total file count

# 8. COMMIT HYGIENE — Atomic commits
git log --oneline origin/main..HEAD

# 9. TESTS — All pass
python -m pytest tests/ -v --tb=short -n 4

# 10. LINT — No lint errors
ruff check . --select=E,F,I,N,W

# 11. SECURITY — Check for committed secrets
git diff --cached | grep -E "(api_key|password|secret|token|credential)\s*[:=]\s*['\"][^'\"]+"
```

---

## SECTION 7 — GLOBAL ECOSYSTEM BLOCKAGES (Any Contributor, Any Project)

These blockages apply to ANYONE contributing to ANY OSS project. They are derived from patterns observed across multiple projects and communities.

### B7.1 — Circular Import Between Core Modules
**Severity:** BLOCKER
**Why:** Importing the core agent loop from a tool file creates a circular dependency through the orchestration layer. The main loop cannot initialize.
**Detection:** `grep -rn "from core import\|import core" src/tools/ --include="*.py"`
**Fix:** Use callbacks or dependency injection instead of direct imports.

### B7.2 — Breaking Public API of a Plugin/Extension System
**Severity:** BLOCKER
**Why:** A plugin context or public API class is the contract for all extensions. Changing method signatures or removing methods breaks ALL plugins that depend on them.
**Detection:** Check if any changes to the plugin/extension API module modify public method signatures like `register()`, `configure()`, `execute()`, or `initialize()`.
**Fix:** Add new parameters with defaults. Never remove or rename parameters.

### B7.3 — Missing Module Registration In Central Registry
**Severity:** HIGH
**Why:** API adapters, CLI layers, and third-party integrations rely on a central registry to discover available modules. Modules not registered there are invisible to clients.
**Detection:** Check the central adapter's module listing for your new module's name.
**Fix:** Register your module in the central registry after adding it.

### B7.4 — Adding Dependency Without Upper Bound
**Severity:** BLOCKER
**Why:** After multiple supply-chain compromises in the OSS ecosystem, most responsible projects now enforce `>=floor,<next_major` for ALL package dependencies. Bare `>=X.Y.Z` is rejected by security-conscious reviewers.
**Detection:** `grep ">=" requirements.txt pyproject.toml Cargo.toml package.json | grep -v "<"` — every `>=` must have a `<` ceiling.
**Fix:** Pin to `>=X.Y.Z,<N` where N is next major version.

### B7.5 — Skipping Lockfile Regeneration
**Severity:** HIGH
**Why:** After modifying dependency definitions (`pyproject.toml`, `Cargo.toml`, `package.json`), the relevant lockfile must be regenerated. CI checks lockfile consistency. Outdated lockfiles fail CI.
**Detection:** `git diff --name-only HEAD | grep "pyproject.toml\|Cargo.toml\|package.json"` — was the corresponding lockfile also changed?
**Fix:** Always run the appropriate lockfile generator (`uv lock`, `npm install`, `cargo update`) after dependency changes.

### B7.6 — Message/Event Without Persistence Before Acknowledgement
**Severity:** HIGH
**Why:** Messages and events received by a service must be persisted before being acknowledged to the sender. Losing messages on crash is unacceptable for any messaging or event-driven system.
**Detection:** Trace the message flow in the entry point — is the message saved before or after ACK?

### B7.7 — Platform/Service Adapter Missing Critical Error Handling
**Severity:** HIGH
**Why:** Network disconnects, API rate limits, and auth failures are normal for any service integration. Adapters must handle: disconnect/reconnect, rate limiting, token expiry, message send failures.
**Detection:** Check the adapter file for `try/except` around all network calls.

### B7.8 — Config Key Added But Not In Default Config
**Severity:** MEDIUM
**Why:** The project's `DEFAULT_CONFIG` (or equivalent canonical config source) must contain every recognized config key. Keys not in DEFAULT_CONFIG can't be validated and cause silent misconfiguration.
**Detection:** Search the default config definition for your new key.
**Fix:** Add to the default config with description and default value.

### B7.9 — Description Exceeds Character Limit For Skills/Plugins
**Severity:** MEDIUM
**Why:** Many projects enforce a description character limit (e.g., 60 chars) for skills, plugins, or CLI commands. Longer descriptions break listing layouts.
**Detection:** Check character count of descriptions in the project's manifest files.
**Fix:** Keep descriptions concise, ending with a period.

### B7.10 — Using Hardcoded Paths Instead Of Configurable Paths
**Severity:** HIGH
**Why:** Hardcoded paths like `Path.home() / ".myapp"` break when the project supports multiple instances, alternate configurations, or test isolation. Every project should use a configurable base path.
**Detection:** `grep -rn "Path.home()\|os.path.expanduser" --include="*.py" | grep -v test | grep -v ".pyc"`
**Fix:** Replace with a configurable path function that respects environment variables or config settings.

### B7.11 — Missing try/except On Asyncio Gather
**Severity:** MEDIUM
**Why:** `asyncio.gather()` without `return_exceptions=True` causes all tasks to fail if one fails. In multi-platform dispatch, one failed service can crash all services.
**CORRECT:** `asyncio.gather(*tasks, return_exceptions=True)`
**Detection:** `grep -rn "asyncio\.gather" --include="*.py" | grep -v "return_exceptions"`

### B7.12 — Signal Handler Without Windows Guard
**Severity:** HIGH
**Why:** `signal.SIGTERM`, `signal.SIGHUP`, `signal.SIGALRM` don't exist on Windows. Direct usage crashes application on Windows.
**CORRECT:** `if hasattr(signal, "SIGTERM"): signal.signal(signal.SIGTERM, handler)`
**Detection:** `grep -rn "signal\.SIG" --include="*.py" | grep -v hasattr | grep -v "sys.platform\|platform"`

### B7.13 — Missing Distribution Manifest
**Severity:** MEDIUM
**Why:** Plugins, profiles, and extended modules distributed via a project's install system require a manifest file (e.g., `distribution.yaml`, `plugin.yaml`). Missing manifest causes silent failure.
**Fix:** Ensure distribution directory includes the required manifest with `version`, `description`, and dependency metadata.

### B7.14 — External Process Without Timeout
**Severity:** HIGH
**Why:** Subprocess calls can hang indefinitely. Every `subprocess.Popen()` or `asyncio.create_subprocess_exec()` must have a timeout or the process monitor must handle hung children.
**Detection:** `grep -rn "subprocess\.Popen\|asyncio\.create_subprocess_exec" --include="*.py"` — is there a timeout mechanism?
**Fix:** Add `timeout` parameter to subprocess calls or implement a watchdog timer.

### B7.15 — Background Job Without Error Handling
**Severity:** MEDIUM
**Why:** Background/scheduled jobs run unattended. If a job fails, the error must be logged and the scheduler must continue. Unhandled exceptions in jobs crash the entire scheduler loop.
**Detection:** Check the scheduler or job runner for `try/except` around job execution.
**Fix:** Wrap each job execution in a try/except that logs errors without crashing the scheduler.

### B7.16 — Knowledge/Resource File Without Discovery Metadata
**Severity:** LOW
**Why:** Knowledge base files or resource bundles may require magic comments or metadata headers for the system to discover them. Files without this are ignored.
**Fix:** Add required metadata headers to the first lines of resource/knowledge files.

### B7.17 — Module With Missing Standard Directories
**Severity:** MEDIUM
**Why:** The project loader may expect standard directory structure (`scripts/`, `references/`, `templates/`, `tests/`). Missing directories may cause installation failures.
**Check:** Verify that your module follows the project's standard directory structure.

### B7.18 — Premature Optimization Without Benchmark
**Severity:** LOW
**Why:** Optimization changes without benchmark data are impossible to evaluate. Always include benchmark results with performance changes.
**Check:** Does the PR include a way to measure the performance improvement?

### B7.19 — Removing Deprecated Code Without Migration Path
**Severity:** HIGH
**Why:** Deprecated functions and classes must have a migration guide and sunset period. Removing them without notice breaks downstream users.
**Fix:** Add deprecation warning with suggested replacement. Keep for at least one minor version per semantic versioning.

### B7.20 — Ignoring Test Fixtures / Test Configuration
**Severity:** MEDIUM
**Why:** The project's test configuration provides hermetic environment fixtures that isolate tests from the real environment. Tests that don't use these fixtures may leak credentials or write to the real filesystem.
**Fix:** ALWAYS extend from the project's test fixtures. Never write tests that access the real filesystem or network.

### B7.21 — New Module Not Registered In API/Integration Adapter
**Severity:** MEDIUM
**Why:** Modules added to a project must also be registered in the API adapter's module mapping. Otherwise, API clients (IDE extensions, web UIs, third-party tools) can't discover or call them.
**Detection:** Search the API adapter's tool/module listing for your new component's name.

### B7.22 — Breaking Internal RPC/API Protocol
**Severity:** BLOCKER
**Why:** Many projects communicate between processes via JSON-RPC, gRPC, or a custom protocol over stdio. Changing method signatures or response formats breaks the communication channel.
**Fix:** New RPC methods must be additive. Never change existing method signatures.

### B7.23 — Missing or Wrong License Header
**Severity:** LOW
**Why:** Most OSS projects require a specific license header on every source file. CI may enforce this. Missing or incorrect headers fail automated checks.
**Check:** `head -3 your_new_file.py | grep "Copyright\|License\|SPDX"`

### B7.24 — Using `os.system()` or `subprocess.run(shell=True)`
**Severity:** BLOCKER
**Why:** Shell injection vulnerability. All command execution must use argv arrays.
**CORRECT:** `subprocess.run(["git", "branch", "-a"], capture_output=True)`
**WRONG:** `os.system("git branch -a")` or `subprocess.run("git branch -a", shell=True)`
**Detection:** `grep -rn "os\.system\|shell=True" --include="*.py"`

### B7.25 — Shared State Not Thread-Safe
**Severity:** HIGH
**Why:** Applications handling multiple concurrent sessions/requests must ensure shared state operations are thread-safe (use locks, thread-local storage, or immutable data structures).
**Detection:** Review all shared state mutations for unprotected accesses.
**Fix:** Use `threading.Lock`, `asyncio.Lock`, or migrate to thread-local storage.

### B7.26 — Hardcoded Provider/Service List Without Refresh
**Severity:** MEDIUM
**Why:** Lists of providers, models, or services go stale. Names change, new options appear. Hardcoded lists should have a mechanism for refresh.
**Fix:** Add a `--refresh` flag or periodic auto-refresh from the upstream API.

### B7.27 — Missing Pagination Handling In API Calls
**Severity:** HIGH
**Why:** External API calls that return lists often paginate results. Code that only processes the first page silently drops data. This is a common source of hard-to-find bugs.
**Detection:** Check API calls that return lists for pagination loop logic.
**Fix:** Implement cursor/offset pagination with configurable page size:
```python
all_results = []
page = 1
while True:
    data = api_call(page=page)
    all_results.extend(data["results"])
    if not data.get("has_more"):
        break
    page += 1
```

### B7.28 — No Rate Limiting On External API Calls
**Severity:** HIGH
**Why:** Calling external APIs without rate limiting causes 429 errors, IP bans, and violates service terms of use. Every external API call must respect rate limits.
**Detection:** `grep -rn "requests\.get\|requests\.post\|httpx\.\|aiohttp\.\|urllib" --include="*.py" | grep -v "ratelimit\|throttle\|backoff\|retry"`
**Fix:** Use a rate limiting decorator or library (`ratelimit`, `backoff`, `tenacity`):
```python
from ratelimit import limits
@limits(calls=10, period=1)  # 10 calls per second
def call_api(): ...
```

### B7.29 — No Health Check Endpoint
**Severity:** MEDIUM
**Why:** Services without health check endpoints cannot be monitored by orchestration systems (Kubernetes, Docker Compose, load balancers). Every long-running service needs at minimum a `/health` or `/ping` endpoint.
**Fix:** Add a health check endpoint that returns service status with dependency connectivity checks.

### B7.30 — No Graceful Shutdown Handler
**Severity:** MEDIUM
**Why:** Applications that don't handle SIGTERM/SIGINT for graceful shutdown leave connections open, tasks incomplete, and data in an inconsistent state on restart.
**Detection:** `grep -rn "signal\.signal\|loop\.add_signal_handler\|atexit\.register" --include="*.py"` — if server has no signal handler, add one.
**Fix:**
```python
import signal
def shutdown(signum, frame):
    logger.info("Shutting down gracefully...")
    cleanup_resources()
    sys.exit(0)
signal.signal(signal.SIGTERM, shutdown)
```

### B7.31 — Logging Without Structured Format
**Severity:** MEDIUM
**Why:** Unstructured log messages are difficult to search, filter, and aggregate in production monitoring systems. JSON-structured logging is the standard for modern applications.
**Fix:** Use structured logging (JSON format) with consistent fields: `timestamp`, `level`, `module`, `message`, `correlation_id`.
```python
logger.info({"event": "request_complete", "duration_ms": 42, "status": 200})
```

### B7.32 — Hardcoded Timeouts Instead Of Configurable
**Severity:** MEDIUM
**Why:** Timeouts hardcoded as magic numbers in the source code cannot be tuned per deployment. Every timeout should be configurable through a config file or environment variable.
**Detection:** `grep -rn "timeout\s*=\s*[0-9]\{2,\}" --include="*.py"` — check if these are configurable.
**Fix:** Move timeouts to configuration with sensible defaults:
```python
# In config: "timeout_seconds": 30
timeout = config.get("timeout_seconds", 30)
```

### B7.33 — API Versioning Not Considered
**Severity:** HIGH
**Why:** Public APIs without versioning cannot evolve without breaking existing clients. Breaking changes in unversioned APIs cause production incidents for downstream consumers.
**Detection:** Check if the PR adds or modifies public endpoints and whether those endpoints are versioned.
**Fix:** Use URL-based (`/api/v1/`) or header-based (`Accept: application/vnd.app.v1+json`) versioning for public APIs.

### B7.34 — Missing Correlation/Trace ID In Service Calls
**Severity:** MEDIUM
**Why:** Without a correlation ID passed through service call chains, debugging production issues across distributed services is nearly impossible.
**Fix:** Generate a correlation ID at the entry point and propagate it through all downstream calls in headers.

### B7.35 — Using Deprecated Dependencies
**Severity:** MEDIUM
**Why:** Pulling in deprecated or unmaintained dependencies introduces security vulnerabilities and compatibility risks. Every new dependency should be actively maintained.
**Detection:** Check each new dependency against libraries.io, PyPI status, or the project's dependency policy.
**Fix:** Prefer well-maintained alternatives. Document why a specific version is needed.

---

## SECTION 8 — GLOBAL PREVENTION CHECKLIST (Ecosystem-Wide)

```bash
# 1. CIRCULAR IMPORTS
grep -rn "from core import\|import core" src/tools/ --include="*.py"

# 2. SHELL INJECTION
grep -rn "os\.system\|shell=True" --include="*.py"

# 3. MISSING UPPER BOUNDS
grep ">=" requirements.txt pyproject.toml package.json | grep -v "<"

# 4. HARDCODED PATHS
grep -rn "Path\.home()\|os\.path\.expanduser" --include="*.py" | grep -v test

# 5. WINDOWS-UNSAFE SIGNALS
grep -rn "signal\.SIG" --include="*.py" | grep -v hasattr | grep -v "sys.platform"

# 6. MISSING PLUGIN/TOOL REGISTRATION
grep "your_module_name" path/to/central/registry.py

# 7. CONFIG KEYS NOT IN DEFAULT CONFIG
grep "your_new_key" path/to/default_config.py

# 8. LOCKFILE SYNC
git diff --name-only HEAD | grep -E "pyproject\.toml|Cargo\.toml|package\.json" && echo "Regenerate lockfile"

# 9. API/ADAPTER COMPATIBILITY
grep -rn "def handle\|async def" path/to/api/adapter.py | grep -v "test_" | head -20

# 10. SECRETS DETECTION
git diff --cached | grep -E "(api_key|password|secret|token|credential)\s*[:=]\s*['\"][^'\"]{16,}"

# 11. PAGINATION CHECK
grep -rn "\.get(" --include="*.py" | grep "page\|offset\|limit\|cursor" || echo "Check for pagination"

# 12. RATE LIMITING CHECK
grep -rn "requests\.\|httpx\.\|aiohttp" --include="*.py" | grep -v "retry\|ratelimit\|backoff\|throttle" | head -10
```

---

## SECTION 9 — CROSS-PROJECT ECOSYSTEM BLOCKAGES (Any OSS Project)

These blockages apply to ANY open source project, regardless of language, framework, or community standards. They are universal patterns that reviewers in every ecosystem will flag.

### B9.1 — Missing or Incomplete README in New Modules
**Severity:** MEDIUM
**Why:** Any new module, tool, or package added to a project must have its own README explaining purpose, usage, and API. Without it, other contributors cannot understand or use the module.
**Detection:** `ls module_name/README.md module_name/README.rst 2>/dev/null || echo "MISSING"`
**Fix:** Write a README with at minimum: purpose, installation, API reference, and one usage example.

### B9.2 — No .gitignore Entries for Generated Files
**Severity:** MEDIUM
**Why:** Compiled assets, cache directories, virtual environments, and IDE config files do not belong in version control. Missing .gitignore entries cause these to be accidentally committed.
**Common Missed Patterns:**
- `__pycache__/`, `*.pyc` (Python)
- `node_modules/` (JavaScript)
- `.venv/`, `venv/` (Virtual environments)
- `.idea/`, `*.iml` (JetBrains IDEs)
- `.vscode/` (VS Code — unless project-wide settings)
- `.DS_Store` (macOS)
- `*.env`, `.env.local` (Secrets)
- `dist/`, `build/`, `*.egg-info/` (Build artifacts)
- `.terraform/`, `*.tfstate` (Terraform)
- `target/` (Rust)
- `vendor/` (Go — unless checked in intentionally)
**Detection:** `git status --porcelain | grep -E "^\\?\\?" | grep -E "(pyc|__pycache__|node_modules|\.env$|\.DS_Store|\.idea|target)"`
**Fix:** Add to `.gitignore` before committing generated files.

### B9.3 — License Header Missing or Wrong
**Severity:** LOW
**Why:** Many projects require a specific license header on every source file. CI may enforce this. Missing or incorrect headers fail automated checks.
**Detection:** `head -5 src/file.py | grep "Copyright\|License\|SPDX" || echo "MISSING HEADER"`
**Fix:** Add the project's standard license header as the first comment block:
```python
# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2026, Project Contributors
# Licensed under the Apache License, Version 2.0 ...
```

### B9.4 — Not Rebasing Before PR Submission (Merge Conflicts)
**Severity:** HIGH
**Why:** Submitting a PR from a branch that is behind the target branch creates merge conflicts for the reviewer. The reviewer must resolve conflicts before they can evaluate the change.
**The Fix:**
```bash
git fetch origin main
git rebase origin/main
# Resolve conflicts, then:
git push --force-with-lease
```
**Detection:** `git merge-base --is-ancestor origin/main HEAD && echo "UP TO DATE" || echo "BEHIND — REBASE NEEDED"`

### B9.5 — Large Binary Files Committed
**Severity:** HIGH
**Why:** Binary files (images, PDFs, compiled binaries, datasets) bloat the Git repository forever. Every clone pays the cost. Most projects ban files over 1-10 MB.
**Detection:** `git diff --stat origin/main...HEAD | grep -E "\.(png|jpg|jpeg|gif|pdf|zip|tar|gz|exe|dmg|iso|bin|pkl|parquet)"`
**Fix:** Remove from commit and add to `.gitignore`. Use Git LFS or external storage for large assets.
```bash
git rm --cached large_file.bin
echo "large_file.bin" >> .gitignore
```

### B9.6 — No CHANGELOG Entry When Project Requires It
**Severity:** MEDIUM
**Why:** Projects following Keep a Changelog or similar conventions require entries for every PR. Missing entries break release automation and confuse downstream consumers.
**Detection:** `grep -c "your-pr-title\|your-feature" CHANGELOG.md || echo "MISSING ENTRY"`
**Fix:** Add a changelog entry following the project's convention (`Added`, `Changed`, `Fixed`, `Deprecated`, `Removed`, `Security`).

### B9.7 — Failing Linter on CI (Not Running Lint Locally)
**Severity:** HIGH
**Why:** CI runs linters on every PR. If the linter fails, CI fails. Relying on CI to catch lint errors is wasteful — run lint locally first.
**Detection:** Run the project's lint command locally. Common commands:
```bash
ruff check .          # Python (ruff)
npm run lint          # JavaScript/TypeScript
cargo clippy          # Rust
golint ./...          # Go
./gradlew check       # Java
```
**Fix:** Configure a pre-commit hook to run lint before every commit.

### B9.8 — Committing Credentials/Tokens in Any Form
**Severity:** BLOCKER
**Why:** API keys, tokens, passwords, and secrets committed to Git are compromised forever. Even a single commit that is later removed leaves the secret in the Git history.
**Detection:** Use `git diff --cached` to review all staged files. Also use automated tools:
```bash
# Check for common secret patterns
git diff --cached | grep -E "(api_key|api_secret|password|token|secret|credential)\s*[:=]\s*['\"][^'\"]+"
grep -rn "sk-[a-zA-Z0-9]\{20,\}\|AIza[a-zA-Z0-9_-]\{35,\}\|ghp_[a-zA-Z0-9]\{36,\}" .
```
**Fix:** Use environment variables or secret management tools (`.env`, vault, CI secrets). Remove secrets from history with `git filter-branch` or `git filter-repo`.

### B9.9 — Platform-Specific Code Without Fallback
**Severity:** HIGH
**Why:** Code that only works on Linux, macOS, or Windows without fallbacks breaks the developer experience for contributors on other platforms. Cross-platform support is expected for most OSS projects.
**The Fix:**
```python
import sys
if sys.platform == "win32":
    fallback_implementation()
else:
    posix_implementation()
```
**Detection:** `grep -rn "sys\.platform\|platform\.system\|os\.name" --include="*.py" | grep -v "win32\|darwin\|linux"`

### B9.10 — Not Following the Issue/PR Template
**Severity:** LOW
**Why:** Project templates exist to capture essential information. Skipping sections makes the reviewer's job harder and may cause the PR to be automatically rejected.
**The Fix:** Fill out every section of the template. If a section is not applicable, write "N/A" rather than deleting it.
**Check:** Does the PR body include all template sections (description, motivation, testing, checklist, etc.)?

### B9.11 — Single Commit with 50+ Unrelated Changes
**Severity:** MEDIUM
**Why:** A commit that touches 50+ unrelated files is impossible to review. Reviewers cannot determine which changes are related to the feature and which are incidental formatting or noise.
**The Fix:** Use atomic commits. Each commit should do exactly one thing:
```bash
git add file1.py file2.py          # Feature changes
git commit -m "feat: add new parser"
git add file3.py tests/test_file.py # Test changes in a separate commit
git commit -m "test: add parser tests"
```
**Detection:** `git diff --stat origin/main...HEAD | tail -1` — if the stat line shows 30+ files, the commit is too large.

### B9.12 — No Issue Reference in PR Description
**Severity:** LOW
**Why:** PR descriptions without issue references make it impossible to trace the change back to the original bug report or feature request. This breaks project traceability.
**The Fix:** Include `Fixes #123` or `Closes #123` or `Related to #123` in the PR description. GitHub auto-links these.
**Detection:** Check if the PR description references any issue number or URL.

### B9.13 — Not Updating Documentation with Code Changes
**Severity:** MEDIUM
**Why:** When the API surface changes (new parameters, changed return types, new endpoints, modified configuration), the documentation must be updated in the same PR. Outdated docs are worse than no docs.
**Detection:** If the PR adds/changes any public function, parameter, or config key, ensure:
- Docstrings are updated
- README or docs site is updated
- API reference is updated (if the project has one)
- Breaking changes are noted in changelog

### B9.14 — Not Considering Backward Compatibility
**Severity:** HIGH
**Why:** Breaking changes without a deprecation path break downstream users. Projects with semantic versioning must respect: for minor/patch releases, no breaking changes; for major releases, provide migration guides.
**Checklist:**
- Does the change break any existing public API?
- Can the old behavior be preserved with a default parameter?
- Is there a deprecation warning for removed functionality?
- Does the PR description mention backward compatibility?
**Fix:** Add backward-compatible wrappers or deprecation warnings.

### B9.15 — Overwriting Others' Work Without Coordination
**Severity:** HIGH
**Why:** Submitting a PR that duplicates or conflicts with someone else's open PR wastes reviewer time and creates merge conflicts. Always check existing open PRs before starting work.
**Detection:**
```bash
gh pr list --state open --search "related keyword"
# Or check project board/discussions
```
**Fix:** Comment on the existing PR offering to collaborate, or pivot to a different part of the codebase.

### B9.16 — Not Signing Commits When Project Requires DCO or GPG
**Severity:** MEDIUM
**Why:** Many projects (Linux Foundation, CNCF, Apache) require signed commits via DCO (`Signed-off-by`) or GPG signatures. Unsigned commits fail the project's DCO bot.
**DCO Fix:**
```bash
git commit -s  # Adds Signed-off-by trailer
```
**GPG Fix:**
```bash
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
git commit -S  # Signs with GPG
```
**Detection:** `git log --format="%H %ae %G?" -1` — if `G` is not `G` (Good), the commit is not properly signed.

### B9.17 — CI Matrix Not Covering OS Variations
**Severity:** MEDIUM
**Why:** Running CI only on Ubuntu misses platform-specific bugs on macOS and Windows. Projects with cross-platform users should test on all supported platforms.
**Detection:** Check `.github/workflows/` for OS matrix coverage. Minimum recommended: ubuntu-latest, macos-latest, windows-latest.
**Fix:** Add matrix strategy to CI:
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest, windows-latest]
runs-on: ${{ matrix.os }}
```

### B9.18 — Missing `CODEOWNERS` File
**Severity:** LOW
**Why:** Without a `CODEOWNERS` file, the right reviewers may not be automatically assigned to PRs. This causes delays in the review process.
**Detection:** `ls .github/CODEOWNERS .gitlab/CODEOWNERS 2>/dev/null || echo "MISSING"`
**Fix:** Add a `CODEOWNERS` file mapping directories to responsible maintainers.

### B9.19 — PR Without Self-Review
**Severity:** MEDIUM
**Why:** Submitting a PR without reviewing your own diff first wastes reviewer time on trivial issues. Self-review catches formatting errors, leftover debug prints, and incomplete changes before a human reviewer sees them.
**Self-Review Checklist:**
- Reread the entire diff before requesting review
- Remove debugging print statements, TODO comments, commented-out code
- Verify all tests pass locally
- Check for typos in variable names, comments, and docs
- Ensure error messages are clear and actionable

### B9.20 — Ignoring Deprecation Warnings
**Severity:** MEDIUM
**Why:** Running tests or the application with deprecation warnings means the code will break on the next dependency upgrade. Deprecation warnings are advance notice of breakage.
**Detection:** Run the project's test suite with `-W error::DeprecationWarning` (Python) or equivalent strict mode in other languages.
**Fix:** Update code to use the recommended replacement for any deprecated API.

### B9.21 — No Performance Regression Baseline
**Severity:** LOW
**Why:** Performance changes without a before/after benchmark cannot be evaluated. A PR claiming "improved performance" must include evidence.
**Fix:** Include a benchmark script and run it before and after the change. Report the results in the PR description.

### B9.22 — No Fuzzing/Property-Based Tests For Parsers
**Severity:** MEDIUM
**Why:** Parsers (config files, data formats, user input) are a common source of security vulnerabilities and crashes. Fuzz testing catches edge cases that unit tests miss.
**Fix:** Use property-based testing (Hypothesis for Python, QuickCheck for Rust, fast-check for JS) for all parsers.
```python
from hypothesis import given, strategies as st
@given(st.text())
def test_parser_never_crashes(text):
    try:
        parse(text)
    except (ValueError, ParseError):
        pass  # Expected parse failures are OK
```

### B9.23 — Missing Integration Tests for External Dependencies
**Severity:** MEDIUM
**Why:** Mocked unit tests don't verify that code works with real external services (databases, APIs, message queues). Integration tests catch version mismatches, protocol changes, and network issues.
**Fix:** Add at minimum one integration test per external dependency, even if it's a basic connectivity check.

---

## SECTION 10 — LANGUAGE-SPECIFIC ECOSYSTEM BLOCKAGES

Blockages that are specific to particular programming languages. These patterns cause review failures in their respective ecosystems.

### Python Blockages

#### B10.1 — Missing `__init__.py` in Package Directory
**Severity:** BLOCKER
**Why:** Without `__init__.py`, Python does not treat the directory as a package. Imports from that directory silently fail or produce confusing errors.
**Detection:** `find src/your_module -maxdepth 0 -type d ! -exec test -f '{}/__init__.py' \; -print`
**Fix:** Add `__init__.py` (can be empty) to every package directory.

#### B10.2 — Wrong Import Style (Relative vs Absolute)
**Severity:** MEDIUM
**Why:** Mixing relative and absolute imports within the same project creates confusion and can cause `ImportError` when running from different working directories.
**CORRECT:** `from project.tools import base_tool` (absolute, following project convention)
**WRONG:** `from ..tools import base_tool` (relative, unless project uses relative imports)
**Detection:** `grep -rn "^from \." --include="*.py"` — check if relative imports are the project convention.

#### B10.3 — Mutable Default Arguments
**Severity:** MEDIUM
**Why:** Mutable default arguments (lists, dicts, sets) are evaluated once at function definition time, not each call. This causes shared state bugs.
```python
# WRONG — same list shared across all calls
def process(items: list = []) -> list:

# CORRECT — new list created each call
def process(items: list = None) -> list:
    if items is None:
        items = []
```
**Detection:** `grep -rn "def .*=\s*\[\]\|def .*=\s*{}\|def .*=\s*set()" --include="*.py"`

#### B10.4 — Missing or Wrong Virtual Environment
**Severity:** HIGH
**Why:** Running `pip install` without an active virtual environment installs packages globally, polluting the system Python. CI and other developers expect isolated dependency management.
**Detection:** `echo $VIRTUAL_ENV` — if empty, no venv is active.
**Fix:** Always activate the project's virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
```

#### B10.5 — `except: pass` Silently Swallowing Errors
**Severity:** HIGH
**Why:** Bare `except: pass` catches ALL exceptions including `KeyboardInterrupt` and `SystemExit`, and silently discards them. This hides bugs and makes debugging impossible.
```python
# WRONG
except:
    pass

# CORRECT
except SpecificError:
    logger.exception("Operation failed")
```
**Detection:** `grep -rn "except:\s*$\|except:\s*pass" --include="*.py"`

#### B10.6 — Using `is` for Value Comparison
**Severity:** MEDIUM
**Why:** `is` compares object identity (memory address), not value equality. `is` should only be used for `None`, `True`, `False`, and singletons.
```python
# WRONG — may fail for large integers or strings
if result is 100:

# CORRECT
if result == 100:
```
**Detection:** `grep -rn "is [0-9]\|is '[^']*'\|is \"[^\"]*\"" --include="*.py"`

#### B10.7 — Not Using `pathlib` Instead of `os.path`
**Severity:** MEDIUM
**Why:** `os.path` string manipulation is error-prone and platform-inconsistent. `pathlib.Path` is the modern Python standard and produces more readable, safer code.
```python
# WRONG
import os
path = os.path.join(os.getcwd(), "data", "config.yaml")

# CORRECT
from pathlib import Path
path = Path.cwd() / "data" / "config.yaml"
```
**Detection:** `grep -rn "os\.path\.join\|os\.path\.exists\|os\.path\.isfile\|os\.path\.isdir" --include="*.py"`

#### B10.8 — Missing Type Hints for Public API
**Severity:** MEDIUM
**Why:** Python type hints enable static analysis, better IDE support, and self-documenting code. Public API functions without type hints force callers to guess parameter and return types.
**Detection:** `grep -rn "^def " --include="*.py" | grep -v "->"` — check for functions without return type hints.
**Fix:** Add type hints to all public functions.

### JavaScript/TypeScript Blockages

#### B10.9 — Missing package-lock.json / yarn.lock
**Severity:** HIGH
**Why:** Lockfiles ensure deterministic installations across environments. Without them, different developers get different dependency versions, causing "works on my machine" bugs.
**Detection:** `ls package-lock.json yarn.lock pnpm-lock.yaml 2>/dev/null || echo "MISSING LOCKFILE"`
**Fix:** Always commit the lockfile generated by your package manager.

#### B10.10 — Wrong Module System (CJS vs ESM)
**Severity:** MEDIUM
**Why:** Using `require()` in an `"type": "module"` project or `import` in a CommonJS project causes `ReferenceError` or `SyntaxError`. The module system must match `package.json`.
**Detection:**
```json
// package.json
{ "type": "module" }  // → use import/export
// no "type" field     // → use require/module.exports
```
**Fix:** Be consistent — if the project uses ESM, use `import`/`export` everywhere.

#### B10.11 — Missing .npmignore or Wrong Files Published
**Severity:** LOW
**Why:** Without `.npmignore`, npm publishes all files including tests, source maps, and config. This bloats package downloads and may leak sensitive configuration.
**Detection:** `ls .npmignore 2>/dev/null || echo "MISSING .npmignore"`
**Fix:** Create `.npmignore` that includes at minimum: `tests/`, `*.test.js`, `*.spec.js`, `.env`, `node_modules/`.

#### B10.12 — Using `var` Instead of `const`/`let`
**Severity:** LOW
**Why:** `var` has function scoping (not block scoping), which causes subtle bugs in loops and closures. Modern JavaScript uses `const` by default, `let` for reassignment.
**Detection:** `grep -rn "\bvar\b" src/ --include="*.js" --include="*.ts"`
**Fix:** Replace with `const` or `let` as appropriate.

#### B10.13 — Missing TypeScript Strict Mode
**Severity:** MEDIUM
**Why:** TypeScript without `strict: true` in `tsconfig.json` disables many type-checking features, allowing unsafe code patterns that defeat the purpose of using TypeScript.
**Detection:** `grep "strict" tsconfig.json` — must be `true`.
**Fix:** Enable strict mode:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Rust Blockages

#### B10.14 — Missing Cargo.lock
**Severity:** HIGH
**Why:** For application crates (not libraries), `Cargo.lock` must be committed to ensure deterministic builds. Without it, different builds may pull different dependency versions.
**Detection:** `ls Cargo.lock 2>/dev/null || echo "MISSING LOCKFILE"`
**Fix:** Add `Cargo.lock` to version control (it's in `.gitignore` only for libraries).

#### B10.15 — Wrong Edition in Cargo.toml
**Severity:** MEDIUM
**Why:** Rust editions (2015, 2018, 2021, 2024) enable different language features. Using an outdated edition blocks access to modern Rust features and may produce confusing compiler errors.
**Detection:** `grep "edition" Cargo.toml` — ensure it matches the project's standard edition.
**Fix:** Update `edition = "2021"` (or the project's target edition) in `Cargo.toml`.

#### B10.16 — `unwrap()` in Production Code
**Severity:** HIGH
**Why:** `unwrap()` panics on `None`/`Err`, crashing the application. Production code must handle all failure cases gracefully.
```rust
// WRONG — crashes on None
let value = option.unwrap();

// CORRECT — explicit error handling
let value = option.ok_or("missing value")?;
// or
let value = option.unwrap_or_default();
```
**Detection:** `grep -rn "\.unwrap()" src/ --include="*.rs"` — each `.unwrap()` must be justified or replaced.

#### B10.17 — Not Using `?` Operator for Error Propagation
**Severity:** MEDIUM
**Why:** Manually matching `Result` types with `match` or `.unwrap()` instead of using the `?` operator produces verbose, error-prone code.
```rust
// VERBOSE
let data = match file.read_to_string() {
    Ok(s) => s,
    Err(e) => return Err(e.into()),
};

// CONCISE
let data = file.read_to_string()?;
```
**Detection:** `grep -rn "match.*Ok\|match.*Err\|\.unwrap()" src/ --include="*.rs"` — check if `?` could be used instead.

#### B10.18 — Missing Integration Tests
**Severity:** MEDIUM
**Why:** Rust has first-class integration test support (`tests/` directory). Relying only on unit tests misses end-to-end behavior validation.
**Detection:** `ls tests/ 2>/dev/null || echo "MISSING integration test directory"`
**Fix:** Add integration tests in `tests/` for public API functions.

### Go Blockages

#### B10.19 — Wrong Package Naming
**Severity:** MEDIUM
**Why:** Go package names should be short, lowercase, and match the directory name. Wrong package names confuse imports and violate Go conventions.
**CORRECT:** `package db` (in `db/` directory)
**WRONG:** `package database_helpers` (in `db/` directory)
**Detection:** `grep -rn "^package " --include="*.go" | grep -v "_test"` — package names should match directory names.

#### B10.20 — Missing go.mod
**Severity:** HIGH
**Why:** Go modules (go.mod) are required for dependency management in modern Go. Projects without go.mod cannot pin dependency versions and break in CI.
**Detection:** `ls go.mod 2>/dev/null || echo "MISSING go.mod"`
**Fix:** Run `go mod init <module-name>` and `go mod tidy` to create and populate `go.mod`.

#### B10.21 — Ignoring Error Return Values
**Severity:** BLOCKER
**Why:** Go uses explicit error returns. Ignoring errors with `_` silently discards failure information, leading to undefined program state.
```go
// WRONG
result, _ := doSomething()

// CORRECT
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doSomething failed: %w", err)
}
```
**Detection:** `grep -rn "_, _\|_, err :=.*_\|\.\s*_\s*:=" --include="*.go"`

#### B10.22 — Not Using `context.Context` for Cancellation
**Severity:** MEDIUM
**Why:** Long-running operations (HTTP calls, DB queries, file I/O) should accept `context.Context` for cancellation and deadlines. Without it, goroutines may leak on shutdown.
**Detection:** `grep -rn "func.*http\.Request\|func.*\*sql\.DB\|func.*time\.Sleep" --include="*.go" | grep -v "context.Context"`

#### B10.23 — Not Running `gofmt` / `go vet`
**Severity:** LOW
**Why:** Go has official formatting (`gofmt`) and vetting (`go vet`) tools. Not running them before submitting a PR signals inattention to basic tooling.
**Fix:** Run `gofmt -s -w .` and `go vet ./...` before committing.

### Java Blockages

#### B10.24 — Wrong Package Structure (Maven/Gradle)
**Severity:** HIGH
**Why:** Java packages must follow the project's Maven/Gradle directory structure (`src/main/java/...`). Files placed in the wrong directory are not compiled and cause `ClassNotFoundException`.
**Detection:** Ensure all Java source files are under `src/main/java/` and test files under `src/test/java/`.
**Fix:** Move files to the correct Maven/Gradle-standard directories.

#### B10.25 — Missing Maven/Gradle Wrapper
**Severity:** MEDIUM
**Why:** The Maven Wrapper (`mvnw`) or Gradle Wrapper (`gradlew`) ensures that all contributors and CI use the same build tool version. Without it, builds may fail due to tool version mismatches.
**Detection:** `ls mvnw gradlew 2>/dev/null || echo "MISSING BUILD WRAPPER"`
**Fix:** Generate the wrapper:
```bash
mvn -N wrapper:wrapper   # Maven
gradle wrapper           # Gradle
```

#### B10.26 — Using Raw Types Instead of Generics
**Severity:** MEDIUM
**Why:** Raw types (e.g., `List` instead of `List<String>`) bypass compile-time type checking, risking `ClassCastException` at runtime.
```java
// WRONG — raw type
List items = new ArrayList();

// CORRECT — parameterized
List<String> items = new ArrayList<>();
```
**Detection:** `grep -rn "List\|Map\|Set\|ArrayList\|HashMap" --include="*.java"` — check for missing type parameters.

#### B10.27 — Overusing Null Instead of Optional
**Severity:** MEDIUM
**Why:** Using `null` to represent absent values leads to `NullPointerException`. Java 8+ provides `Optional<T>` for safe absent-value handling.
```java
// WRONG
public String findName() { return null; }

// CORRECT
public Optional<String> findName() { return Optional.empty(); }
```
**Detection:** `grep -rn "return null;" --include="*.java"` — check if `Optional` would be more appropriate.

---

## SECTION 11 — GLOBAL PREVENTION AUTOMATION

How to set up automated blockage prevention that catches these patterns before they ever reach a reviewer. These systems work for ANY project.

### 11.1 — Pre-commit Hooks (pre-commit Framework)

The `pre-commit` framework runs checks before every commit, catching blockages at the earliest possible point.

```yaml
# .pre-commit-config.yaml — install with: pre-commit install
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
        args: ["--maxkb=500"]
      - id: check-merge-conflict
      - id: detect-private-key
      - id: check-case-conflict
      - id: mixed-line-ending
      - id: check-toml
      - id: check-json
      - id: pretty-format-json
        args: ["--autofix"]

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.9.0
    hooks:
      - id: ruff
      - id: ruff-format

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.15.0
    hooks:
      - id: mypy
        args: ["--strict"]

  - repo: https://github.com/psf/black-pre-commit-mirror
    rev: 25.1.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/bandit
    rev: 1.8.3
    hooks:
      - id: bandit
        args: ["-r", "src"]
```

**Installation:**
```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files  # Run on all files for first time
```

**Blockages prevented:** B9.2 (missing .gitignore), B9.5 (large files), B9.4 (merge conflicts), B9.8 (credentials), B9.7 (lint failures), B10.5 (bare except), B10.12 (var usage), B10.8 (type hints), B10.7 (pathlib)

### 11.2 — CI Pipeline Checks

Automated checks that run on every PR, preventing blockages from ever merging.

```yaml
# .github/workflows/pr-checks.yml
name: PR Quality Checks
on: [pull_request]

jobs:
  lint:
    name: Linting
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: pip install ruff
      - run: ruff check --output-format=github

  type-check:
    name: Type Checking
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: pip install mypy
      - run: mypy src/ --strict

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Secrets detection
        uses: trufflesecurity/trufflehog@v3
        with:
          extra_args: --only-verified
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3

  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4

  lockfile-check:
    name: Lockfile Consistency
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check lockfile consistency
        run: |
          if [ -f pyproject.toml ] && [ -f uv.lock ]; then
            uv lock --check
          elif [ -f package.json ] && [ -f package-lock.json ]; then
            npm ci --dry-run
          fi

  commit-sign-check:
    name: Commit Signature Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Check commits are signed
        run: |
          git log --format="%H %ae %G?" origin/main..HEAD | while read hash email sig; do
            if [ "$sig" != "G" ]; then
              echo "UNSIGNED: $hash by $email"
              exit 1
            fi
          done

  test:
    name: Tests (${{ matrix.os }})
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: pip install -e ".[dev]"
      - run: python -m pytest tests/ -v --tb=short -n 4
```

**Blockages prevented:** B9.7 (lint), B9.8 (secrets), B9.16 (commit signing), B9.5 (large files), B9.17 (cross-platform compatibility), all language-specific patterns (via linters)

### 11.3 — Local Git Hooks

Lightweight hooks that run without external dependencies. Place in `.git/hooks/` or use `core.hooksPath`.

```bash
#!/bin/sh
# .git/hooks/pre-commit — No-dependency client-side guard

# Prevent large files
if git diff --cached --name-only | xargs ls -l 2>/dev/null | awk '{if($5>1048576) print $NF}' | grep .; then
  echo "ERROR: Files larger than 1MB detected in commit."
  exit 1
fi

# Prevent secrets
if git diff --cached | grep -E "(api_key|password|secret|token|credential)\s*[:=]\s*['\"][^'\"]{16,}" > /dev/null; then
  echo "ERROR: Potential secret detected in staged changes."
  exit 1
fi

# Prevent merge conflict markers
if git diff --cached | grep "^[+].*<<<<<<< \|^[+].*=======\|^[+].*>>>>>>> " > /dev/null; then
  echo "ERROR: Merge conflict markers detected."
  exit 1
fi

# Prevent debug print statements
if git diff --cached | grep "^[+].*print(" > /dev/null; then
  echo "WARNING: Debug print() detected in staged changes."
fi

# Prevent binary file commits
if git diff --cached --name-only | grep -E "\.(png|jpg|jpeg|gif|pdf|zip|exe|dmg|iso|bin)$" > /dev/null; then
  echo "WARNING: Binary files in commit. Use Git LFS instead."
fi
```

**Installation:**
```bash
cp pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Alternative — shared hooks directory:**
```bash
# .githooks/pre-commit (checked into repo)
git config core.hooksPath .githooks
```

**Blockages prevented:** B9.5 (large files), B9.8 (secrets), B9.4 (merge conflicts), B1.2 (debug prints), binary files

### 11.4 — Linting and Formatting Automation

Integrate linting into the editor and build pipeline for instant feedback.

| Tool | Language | Purpose | Install |
|------|----------|---------|---------|
| Ruff | Python | Linter + formatter | `pip install ruff` |
| Black | Python | Formatter | `pip install black` |
| mypy | Python | Type checker | `pip install mypy` |
| ESLint | JS/TS | Linter | `npm install -D eslint` |
| Prettier | JS/TS/MD/YAML | Formatter | `npm install -D prettier` |
| Clippy | Rust | Linter | `rustup component add clippy` |
| rustfmt | Rust | Formatter | `rustup component add rustfmt` |
| golangci-lint | Go | Linter suite | `go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest` |
| Checkstyle | Java | Style checker | Maven/Gradle plugin |
| shellcheck | Shell | Script linter | `apt install shellcheck` |
| actionlint | GitHub Actions | Workflow validator | `go install github.com/rhysd/actionlint/cmd/actionlint@latest` |

**VS Code integration** — add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[rust]": {
    "editor.defaultFormatter": "rust-lang.rust-analyzer"
  },
  "[go]": {
    "editor.defaultFormatter": "golang.go"
  },
  "python.analysis.typeCheckingMode": "strict",
  "files.exclude": {
    "**/__pycache__": true,
    "**/.pyc": true
  }
}
```

**Blockages prevented:** B9.7 (lint), B10.12 (var), B10.16 (unwrap), B10.22 (context), B2.1 (unused imports), B3.4 (type errors), B10.23 (gofmt)

### 11.5 — Automated Test Coverage Gates

Prevent untested code from merging by enforcing coverage thresholds.

```yaml
# .github/workflows/coverage.yml
name: Coverage Gate
on: [pull_request]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: pip install pytest pytest-cov
      - run: python -m pytest tests/ --cov=src/ --cov-fail-under=80
```

**Python coverage configuration** (`pyproject.toml`):
```toml
[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/migrations/*"]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "if __name__ == .__main__.",
    "raise NotImplementedError",
    "if typing.TYPE_CHECKING:",
]
fail_under = 80

[tool.coverage.paths]
source = ["src"]
```

**Blockages prevented:** Untested code paths, dead code (B1.4), missing edge case handling

### 11.6 — Automated Dependency Updates (Dependabot / Renovate)

Keep dependencies up to date and secure with automated PRs.

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
    commit-message:
      prefix: "deps"

  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10

  - package-ecosystem: "cargo"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

**Renovate alternative** (`.github/renovate.json`):
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "labels": ["dependencies"],
  "prConcurrentLimit": 5,
  "rangeStrategy": "bump",
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ]
}
```

**Blockages prevented:** B7.4 (missing upper bounds), B2.3 (version constraint bugs), B9.20 (deprecation warnings), CVE vulnerabilities

### 11.7 — Security Scanning Integration

Add security scanning at multiple points in the pipeline.

| Tool | What It Detects | Integration Point |
|------|----------------|-------------------|
| TruffleHog | Secrets, API keys, tokens | CI (pre-commit, GitHub Actions) |
| Bandit | Python security issues | pre-commit, CI |
| CodeQL | Code vulnerabilities | GitHub Actions |
| Snyk | Dependency vulnerabilities | CI (PR check) |
| OSV-Scanner | OSS vulnerability matching | CI |
| Semgrep | Custom security patterns | CI, pre-commit |
| Hadolint | Dockerfile issues | pre-commit, CI |

**Semgrep example** for custom security rules:
```yaml
# .github/workflows/semgrep.yml
  semgrep:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: semgrep/semgrep-action@v1
        with:
          config: p/python
```

**Blockages prevented:** B1.1 (SQL injection), B7.24 (shell injection), B9.8 (secrets), B7.4 (dependency vulnerabilities)

### 11.8 — Performance Regression Detection

```yaml
# .github/workflows/benchmark.yml
name: Benchmark
on:
  pull_request:
    paths:
      - 'src/**'
      - '!src/**/*.md'

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: pip install pytest pytest-benchmark
      - name: Run benchmarks
        run: python -m pytest benchmarks/ --benchmark-json output.json
      - name: Compare with baseline
        uses: benchmark-action/github-action-benchmark@v1
        with:
          tool: 'pytest'
          output-file-path: output.json
          alert-threshold: '200%'
          comment-on-alert: true
```

**Blockages prevented:** B7.18 (premature optimization), B9.21 (no baseline), performance regressions

### 11.9 — Integrated Prevention Pipeline

Combine all automation into a single gate pipeline:

```
Developer workstation
  ├── Editor (lint-on-save + formatting)
  │   ├── Ruff (Python lint + format)
  │   ├── ESLint (JS/TS lint)
  │   ├── Prettier (format)
  │   └── mypy (type check)
  ├── Pre-commit hook (pre-commit framework)
  │   ├── Large file check
  │   ├── Secret detection
  │   ├── Merge conflict check
  │   ├── Lint (ruff, mypy, ESLint)
  │   ├── Format (black, ruff-format, prettier)
  │   └── Security (bandit, semgrep)
  └── Pre-push hook
      ├── Test suite (pytest, jest, cargo test)
      ├── Coverage gate (80%+)
      └── Integration tests

CI Pipeline (per PR)
  ├── Lint job (matrix: ubuntu, macos, windows)
  ├── Type check job
  ├── Security job
  │   ├── Secrets scan (TruffleHog)
  │   ├── Dependency scan (Snyk / Dependabot)
  │   └── CodeQL analysis
  ├── Test job (matrix: ubuntu, macos, windows)
  │   ├── Unit tests
  │   └── Integration tests
  ├── Coverage gate
  ├── Lockfile consistency
  ├── Commit sign check (DCO/GPG)
  ├── License header check
  ├── Changelog entry check
  ├── Benchmark comparison
  └── Dependency review

Release Pipeline
  ├── Full test suite (all platforms)
  ├── Security audit
  ├── Changelog generation
  ├── Version bump validation
  └── Publishing (PyPI, npm, crates.io)
```

**Setup script** for bootstrapping a new project:
```bash
# scripts/setup-gates.sh
set -euo pipefail

echo "=== Setting up prevention gates ==="

# 1. Install pre-commit
pip install pre-commit && pre-commit install

# 2. Install dev dependencies
pip install -e ".[dev]" && npm install

# 3. Run all checks once
pre-commit run --all-files && ruff check . && python -m pytest tests/

# 4. Configure git hooks path
git config core.hooksPath .githooks

# 5. Install language-specific tools
python -m pip install ruff mypy bandit
if [ -f package.json ]; then
  npm install -D eslint prettier
fi
if [ -f Cargo.toml ]; then
  rustup component add clippy rustfmt
fi
if [ -f go.mod ]; then
  go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
fi

echo "=== All gates active ==="
```

**Blockages prevented:** Every pattern in this document — from B1.1 (SQL injection) through B10.27 (Java null patterns)

### 11.10 — AI-Assisted Code Review Integration

Use automated code review tools to catch patterns before human review.

| Tool | What It Does | Integration |
|------|-------------|-------------|
| GitHub Code Review | AI-powered PR review | Native to GitHub |
| CodeRabbit | Automated PR review with custom rules | GitHub App |
| SonarCloud | Static analysis + quality gates | GitHub Actions |
| DeepSource | Automated code review | GitHub App |
| Reviewdog | Runs linters on PR diffs | GitHub Actions |

**Reviewdog setup example:**
```yaml
# .github/workflows/reviewdog.yml
name: reviewdog
on: [pull_request]
jobs:
  reviewdog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: reviewdog/action-setup@v1
      - name: Run reviewdog with ruff
        uses: reviewdog/action-ruff@v1
        with:
          reporter: github-pr-review
          level: warning
```

**Blockages prevented:** All patterns — AI review catches inconsistencies, security issues, and style violations automatically.

---

## SECTION 12 — EMERGENCY RECOVERY: WHAT TO DO WHEN A PR IS BLOCKED

When a reviewer marks your PR as blocked, follow this recovery protocol:

### 12.1 — Assess the Blockage Severity

| Severity | What It Means | Response Time |
|----------|---------------|---------------|
| BLOCKER | PR cannot merge under any circumstances | Immediate fix required |
| HIGH | Major rework needed before approval | Fix within 24 hours |
| MEDIUM | Rework recommended, not blocking final approval | Fix before next review cycle |
| LOW | Should fix, not blocking | Fix before merge if possible |

### 12.2 — Recovery Steps For Each Severity

**BLOCKER recovery:**
1. Immediately close the PR (do not keep a broken PR open)
2. Fix every BLOCKER issue identified
3. Re-run the full prevention checklist (Section 6)
4. Re-submit with a summary of what was fixed
5. Apologize to the reviewer for wasted time

**HIGH recovery:**
1. Fix all HIGH issues before re-requesting review
2. Comment on the PR listing each fix with a commit reference
3. Do not re-request review until all HIGH issues are resolved

**MEDIUM recovery:**
1. Fix before the next review cycle
2. Document in the PR which MEDIUM items were addressed
3. For items left unfixed, explain why in the PR thread

**LOW recovery:**
1. Fix before merge if you have time
2. Create a follow-up issue for LOW items you skip

### 12.3 — Prevention for Next Time

After a blocked PR is resolved:
1. Add the patterns you missed to your personal checklist
2. Run the prevention checklist (Section 6) before every future PR
3. Consider adding automated checks for the patterns you missed
4. If the same pattern appears in two PRs, automate the check permanently

---

*End of Blockage Patterns Guide — Sections 1-12*
*Total patterns documented: 100+ across 12 sections*
*Apply these automated gates to prevent every pattern before review*
*Last updated: 2026-05-18*
