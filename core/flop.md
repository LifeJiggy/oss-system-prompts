# Flop Documentation — Real OSS PR Failures (Global Edition)

## Overview

This document catalogs real failures in OSS contribution that occurred across multiple projects. Every pattern here comes from actual rejected PRs, blocker findings, and wasted effort across different ecosystems. Use this document to avoid making the same mistakes — regardless of which project you contribute to.

The purpose is not to embarrass or discourage — it is to educate. Every failure here is a learning opportunity. Names have been generalized to focus on the patterns, not the individuals.

---

## Table of Contents

1. [Real-World Failure Catalog](#part-1-real-world-failure-catalog)
2. [Common Process Flops](#part-2-common-process-flops)
3. [Quality Flops](#part-3-quality-flops)
4. [Communication Flops](#part-4-communication-flops)
5. [Alignment Flops](#part-5-alignment-flops)
6. [Technical Flops](#part-6-technical-flops)
7. [The Flop Formula](#part-7-the-flop-formula)
8. [Recovery After Flop](#part-8-recovery-after-flop)
9. [Prevention Checklist](#part-9-prevention-checklist)
10. [Global OSS Failure Case Studies](#part-10-global-oss-failure-case-studies)

---

## Part 1: Real-World Failure Catalog

### The Timeline — 14 PRs, 30+ Review Rounds

These PR submissions span contributions to various popular open-source projects. Every failure is documented here. The project names, contributor identities, and exact file paths have been generalized, but the failure patterns are real and directly observed.

| PR # | Branch | Scope | Key Failure | Result |
|------|--------|-------|-------------|--------|
| A | schema-update | Database tools | Did not follow existing patterns | ❌ Rework |
| B | test-runner | Testing tools | Phantom references to non-existent modules | ❌ Rework |
| C | secret-scanner | Secret detection | Dead code + IndentationError | ❌ Re-review |
| D | schema-update-v2 | Database tools | **SQL injection via f-string** — BLOCKER | ❌ BLOCKER |
| E | code-indexer | Code indexing | Connection leak (no `finally`) | ❌ HIGH |
| F | semantic-search | Semantic search | **Hash-based fake embeddings** — "DO NOT SUBMIT" | ❌ DO NOT SUBMIT |
| G | model-ranker | Model ranking | Unused imports, duplicate code, empty fallback | ❌ Rework |
| H | plugin-registry | Plugin system | SIGALRM on Windows, mkdir on property read | ❌ HIGH |
| I | plugin-versioning | Version/registry | Version constraint bug, naming mismatch | ❌ Rework |
| J | api-client | REST client | Session identifier header silently dropped | ❌ BLOCKER |
| K | debug-tools | Debug endpoint | Pushed without maintainer approval | ❌ Trust damage |
| L | mega-diagnostics | 4 features in 1 PR | **Merge pollution (large diff) + body != diff** | ❌ CLOSED |
| M | crash-recovery | State persistence | Dead function parameter, unused constant | ❌ MEDIUM |
| N | task-timeout | Timeout handler | Mixed concerns, scope creep | ❌ Rework |

### The 7 Deadly Mistakes

#### Mistake 1: SQL Injection via f-string (PR #D)

**What we did:**
```python
cursor.execute(f"PRAGMA table_info(\"{table_name}\")")
```

**Why it failed:** BLOCKER — immediate rejection. SQL injection can drop tables, read arbitrary data, and compromise the entire database.

**The fix:**
```python
if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", table_name):
    return json.dumps({"success": False, "error": "Invalid table name"})
cursor.execute(f"PRAGMA table_info(\"{table_name}\")")  # Safe AFTER validation
```

**Detection:** `grep -rn 'f"\|f\'' src/ | grep -i "execute\|WHERE\|INSERT\|DELETE"`

#### Mistake 2: Connection Leak (PR #D, #E, #F)

**What we did:**
```python
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute(query)
conn.close()  # If error occurs before this, conn never closes!
```

**Why it failed:** This pattern appeared in THREE different PRs and was flagged every single time. The most common HIGH priority finding.

**The fix:**
```python
conn = None
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
    return results
except Exception as e:
    return error(str(e))
finally:
    if conn:
        conn.close()
```

#### Mistake 3: Fake/Placeholder Implementation (PR #F)

**What we did:** Used SHA256 hash as "semantic embeddings."
```python
def _embed(text: str) -> List[float]:
    hash_obj = hashlib.sha256(text.encode())
    return [int(hash_obj.hexdigest()[i:i+2], 16) / 255.0 for i in range(0, 256, 2)]
```

**Why it failed:** The tool claimed "semantic search" but delivered hash-based keyword matching. Two texts with identical meaning but different wording produce completely unrelated vectors. The reviewer's verdict: "DO NOT SUBMIT — fake embeddings are misleading."

**The fix:** Use real embeddings (e.g., via a proper embedding API or library) or rename the tool to match what it actually does.

#### Mistake 4: Phantom References (PR #B)

**What we did:** Added `api_fetcher` and `csv_processor` to the core module registry in the project's toolset configuration, but neither module file existed in the branch.

**Why it failed:** When the registry resolver tried to load them, either silently skipped or raised `KeyError`. The reviewer said "confirmed 404 on the main branch."

**The fix:** Every module name referenced must have a corresponding source file. Each PR must be self-contained.

#### Mistake 5: Merge Pollution (PR #L)

**What we did:** Branch was created from local `main` which was thousands of commits behind `origin/main`. The diff showed massive additions across thousands of files.

**Why it failed:** The reviewer could not determine which changes belonged to the PR. Impossible to review.

**The fix:** Always branch from `origin/main`:
```bash
git fetch origin main
git checkout -b feat/your-branch origin/main
```

#### Mistake 6: PR Body Doesn't Match Diff (PR #L)

**What we did:** PR body described 4 features (verbose mode, distributed tracing, debug command, diagnostics) but the diff was very small. None of the described features were actually implemented.

**The reviewer said:** "The body and the diff don't match — none of those features are actually implemented here."

**The fix:** Only describe what's actually in the diff. One feature per PR.

#### Mistake 7: Pushing Without Approval (PR #E, #K)

**What we did:** Pushed commits without waiting for the project maintainer to say "push" or "commit."

**Why it failed:** Damages trust. The maintainer must explicitly authorize pushes.

**The fix:** Never push unsolicited. Wait for explicit "push" or "commit" command.

---

## Part 2: Common Process Flops

### The "Kitchen Sink" PR

**What it looks like:** Combining multiple unrelated features in one PR.

**Why it fails:** Reviewers cannot assess coherence. If any part is problematic, the entire PR is rejected.

**The fix:** Split into focused PRs, one per feature.

### The "Surprise" PR

**What it looks like:** Big changes without any prior discussion.

**Why it fails:** May conflict with project direction. Maintainers hate surprises.

**The fix:** Always discuss first. Get buy-in before coding.

### The "Mega-Merge"

**What it looks like:** 100+ files changed in one PR.

**Why it fails:** Impossible to review. High risk of regressions.

**The fix:** Incremental changes. Each PR should be reviewable in 15-30 minutes.

### The "Drive-By" Contribution

**What it looks like:** Submitting a PR and disappearing.

**Why it fails:** Leaves maintainers with incomplete code. PR becomes stale.

**The fix:** Stay engaged. Respond within 48 hours.

### The "Rebase Nightmare"

**What it looks like:** Branch that is 50 commits behind main.

**Why it fails:** Massive merge conflicts. Potential for introducing bugs.

**The fix:** Keep your branch up to date. Rebase frequently.

### The "No-Issue" Drive-By

**What it looks like:** Submitting a significant feature PR without ever opening an issue or discussing it with the community.

**Why it fails:** Maintainers may have already rejected this idea, have a different implementation in progress, or consider it out of scope. All that effort is wasted.

**The fix:** Always open an issue first. Describe what you want to do and wait for acknowledgment before writing code.

### The "Friday 5 PM" PR

**What it looks like:** Submitting a complex PR late on a Friday afternoon.

**Why it fails:** It sits over the weekend, accumulates negative sentiment, and is likely to be reviewed hastily or ignored.

**The fix:** Submit early in the week, early in the day. Give reviewers time and energy to give your PR proper attention.

---

## Part 3: Quality Flops

### The "Test-Free" PR

**What it looks like:** No tests included.

**Why it fails:** No confidence in correctness. High regression risk.

**The fix:** Include tests for all new code — success paths, error paths, edge cases.

### The "Security-Neglect" PR

**What it looks like:** SQL injection, command injection, hardcoded secrets.

**Why it fails:** Immediate rejection. Potential to damage users.

**The fix:** Use parameterized queries. Validate all inputs. Never hardcode secrets.

### The "Copy-Paste" PR

**What it looks like:** Code without understanding. Wrong idioms, incompatible styles.

**Why it fails:** Doesn't fit project patterns. May contain bugs.

**The fix:** Study existing code. Match patterns exactly. Understand WHY code is written that way.

### The "Build-Breaker"

**What it looks like:** Code that does not compile. Syntax errors, indentation errors, name errors.

**Why it fails:** Cannot merge broken code. Wastes reviewer time.

**The fix:** Run syntax validation on every file before pushing.

### The "Test-Failer"

**What it looks like:** Breaking existing tests.

**Why it fails:** Introduces regressions. Shows poor verification.

**The fix:** Run full test suite before submit.

### The "Linter-Aggressor"

**What it looks like:** Code that introduces hundreds of new lint warnings or reformats existing lines unnecessarily.

**Why it fails:** Lint noise hides the real changes. Reviewers cannot distinguish your actual contribution from formatting changes.

**The fix:** Never mix formatting changes with functional changes. If the project needs reformatting, do it in a separate, dedicated PR with zero functional changes.

### The "Untested Edge Case" PR

**What it looks like:** Tests pass for the happy path but the code crashes on empty inputs, None values, network timeouts, or corrupted data.

**Why it fails:** The PR works in the contributor's controlled environment but fails in production under real-world conditions.

**The fix:** Test empty states, error states, boundary conditions, and concurrent access. A test suite that only covers success paths gives false confidence.

---

## Part 4: Communication Flops

### The "Argumentative" Contributor

**What it looks like:** Arguing with reviewers, defending code.

**Why it fails:** Creates hostile environment. Damages relationship permanently.

**The fix:** Accept feedback professionally. Ask clarifying questions.

### The "Vague" PR

**What it looks like:** Poor PR description. "Fixed some bugs" with no details.

**Why it fails:** No context for reviewers.

**The fix:** Explain what changed, why, and how to test.

### The "Ghost"

**What it looks like:** Not responding to review feedback for weeks.

**Why it fails:** Wastes maintainer time. PR becomes stale.

**The fix:** Respond within 48 hours. If you need time, communicate.

### The "PR-Description Exaggerator"

**What it looks like:** Describing features that aren't implemented.

**Why it failed:** The reviewer said: "The body and the diff don't match."

**The fix:** Every sentence in the PR body must correspond to a code change.

### The "Drive-By Reviewer Comment Ignorer"

**What it looks like:** A reviewer leaves 3 comments. The contributor addresses 2, clicks "Resolve conversation" on the third without any reply or fix.

**Why it fails:** It signals that the contributor cherry-picks feedback. Maintainers notice and lose trust.

**The fix:** Address every single comment. If you disagree, explain why respectfully. If you agree, fix it. Leaving comments unresolved — or resolving them without action — is a communication failure.

### The "Me Too" Commenter

**What it looks like:** Adding "+1", "this please", "any updates?" comments to issues and PRs without adding value.

**Why it fails:** It creates noise for maintainers who must sift through notifications. GitHub already has reaction emojis for upvoting.

**The fix:** Use reactions instead of comments for simple agreement. Reserve comments for technical contributions, reproduction steps, or offers to help.

---

## Part 5: Alignment Flops

### The "Not-In-Vision" PR

**What it looks like:** Adding features that don't fit the product direction.

**Why it fails:** Does not match project vision.

**The fix:** Check roadmap. Discuss in issue first.

### The "Scope-Creep" PR

**What it looks like:** Starting with one fix and ending with 10 changes.

**Why it fails:** Expands scope beyond what was discussed.

**The fix:** Stay focused. Submit one change at a time.

### The "Vendor-Lock-In" PR

**What it looks like:** Adding a feature that depends on a specific cloud provider, proprietary service, or commercial product — either as a hard dependency or as the only supported backend.

**Why it fails:** OSS projects generally avoid vendor lock-in. The PR violates the project's commitment to portability and neutrality.

**The fix:** Design abstractions that support multiple backends. If the feature genuinely requires a specific service, make it optional and clearly documented as such.

### The "Bikeshed" PR

**What it looks like:** A PR that changes variable naming conventions, comment style, whitespace formatting, or other subjective aesthetics without functional improvement.

**Why it fails:** It consumes disproportionate review time relative to its value. Maintainers resent wasting cycles on style debates.

**The fix:** Focus on functional improvements. Leave style to the auto-formatter and the project's CONTRIBUTING.md guidance.

---

## Part 6: Technical Flops

### Windows-Unsafe Signals

**What we did:** Used `signal.SIGALRM` without Windows guard.

**The fix:**
```python
if sys.platform == "win32":
    logger.warning("Timeout not available on Windows")
    yield
    return
```

### Version Constraint Bug

**What we did:** `^1` matched `2.0.0` because the upper-bound check had a bug.

**The fix:** Always check upper bound: `iv >= c and iv < (c[0] + 1, 0, 0)`

### Naming Mismatch

**What we did:** Parameter `source_url` wrote to field `registry_url`.

**The fix:** Parameter names must match field names.

### Directory Creation on Property Read

**What we did:** `@property` created a directory every time it was read.

**The fix:** `mkdir` belongs in the write method, not the property.

### Global Mutable State

**What we did:** Used a module-level list to cache results between function calls, assuming the module would be imported once per process.

**Why it failed:** In multi-threaded contexts (web servers, async frameworks), the shared state caused race conditions. In test suites, state leaked between test cases.

**The fix:**
```python
_cache = threading.local()  # or contextvars.ContextVar

def get_cache():
    if not hasattr(_cache, "data"):
        _cache.data = {}
    return _cache.data
```

### Hardcoded Timeouts

**What we did:** Used a 30-second hardcoded timeout for an HTTP call.

**Why it failed:** The downstream service occasionally took 45 seconds under load. The tool silently failed for users in regions with higher latency or during peak hours.

**The fix:**
```python
DEFAULT_TIMEOUT = 30  # configurable in constructor
```

Also: expose the timeout as a constructor parameter or config option. Never hardcode network timeouts.

### Unicode Encoding Assumption

**What we did:** Wrote `open(filename, "r")` assuming UTF-8.

**Why it failed:** On Windows, the default encoding may be cp1252. On Linux without a UTF-8 locale, it may be ASCII. Files with non-ASCII characters caused `UnicodeDecodeError`.

**The fix:**
```python
with open(filename, "r", encoding="utf-8") as f:
    data = f.read()
```

### Accidental Large File Loading

**What we did:** Used `file.read()` to load an entire file into memory.

**Why it failed:** When the file was a multi-GB log or dataset, the process ran out of memory and was OOM-killed.

**The fix:**
```python
with open(filename, "r") as f:
    for line in f:  # lazy iteration
        process(line)
```

---

## Part 7: The Flop Formula

### Understanding Why PRs Fail

```
FLOP = (BULK + NO_DISCUSSION + POOR_QUALITY + BAD_COMMUNICATION + WRONG_ALIGNMENT) / TRUST
```

Where:
- **BULK** = Number of files changed (target: under 10)
- **NO_DISCUSSION** = 1 if no prior issue, 0 if discussed (target: 0)
- **POOR_QUALITY** = 1 if SQL injection, leaks, fake impl (target: 0)
- **BAD_COMMUNICATION** = 1 if no response, defensive (target: 0)
- **WRONG_ALIGNMENT** = 1 if not in vision, scope creep (target: 0)
- **TRUST** = Contributor reputation (target: high)

### The Path to Success

1. **One change per PR** — Minimize BULK
2. **Always discuss first** — Minimize NO_DISCUSSION
3. **High quality code** — Minimize POOR_QUALITY
4. **Professional communication** — Minimize BAD_COMMUNICATION
5. **Align with vision** — Minimize WRONG_ALIGNMENT
6. **Build trust over time** — Maximize TRUST

### The Anti-Flop Checklist

- [ ] Did I open an issue first?
- [ ] Did I get acknowledgment before coding?
- [ ] Is this ONE change (under 10 files)?
- [ ] Are there tests for new code?
- [ ] Do the tests pass?
- [ ] No SQL injection?
- [ ] No connection leaks?
- [ ] Does it follow existing patterns?
- [ ] Is my PR description honest (matches diff)?
- [ ] Did I run the full checklist?
- [ ] Did I branch from origin/main?
- [ ] Am I accepting feedback professionally?

---

## Part 8: Recovery After Flop

### If Your PR Had Blocker Findings

#### Step 1: Accept the Feedback

Do not argue, defend, or explain. The feedback is given. Accept it.

#### Step 2: Understand the Reason

Read the feedback carefully. Make sure you understand exactly why it was flagged.

#### Step 3: Learn the Lesson

Determine what you would do differently. Add it to your checklist.

#### Step 4: Start Fresh

Apply the lesson. Start with discussion. Submit a proper PR.

### If You've Been Flagged as "Problem Contributor"

#### Phase 1: Stop (Weeks 1-2)
- Do NOT submit more problematic PRs
- Do NOT argue or push back
- Observe the project and contribution patterns

#### Phase 2: Acknowledge (Weeks 3-4)
- Accept the feedback publicly
- Demonstrate understanding of the issue

#### Phase 3: Reset (Weeks 5-8)
- Start fresh with small changes
- Focus on simple fixes
- Submit one PR at a time

#### Phase 4: Prove (Months 2-4)
- Medium contributions with thorough testing
- Never repeat past mistakes
- Always respond fast

#### Phase 5: Rebuild (Months 4-6)
- Feature contributions with prior approval
- Full trust restored if consistent

### Recovery Anti-Patterns to Avoid

#### The "Rebrand and Resubmit"

**What it looks like:** After a PR is rejected, renaming it and submitting it again without addressing the underlying issues. Changing the name of a variable from "dangerous_operation" to "safe_operation" while keeping the same SQL injection vulnerability.

**Why it fails:** Maintainers recognize the same code. Trust plummets further.

**The fix:** Address the actual feedback. Every resubmission must be visibly improved.

#### The "Maintainer Shopping"

**What it looks like:** PR rejected by one maintainer, so the contributor opens a new issue attempting to get a different maintainer to approve the same change.

**Why it fails:** Projects have shared communication channels. The second maintainer will see the earlier rejection and be even less inclined to approve.

**The fix:** Accept the rejection gracefully. If you genuinely believe the decision was wrong, ask respectfully for clarification — don't try to bypass it.

#### The "Blame the CI"

**What it looks like:** "The CI is flaky, my code is fine" — ignoring that CI found real issues in the PR that happen to be timing-sensitive or platform-specific.

**Why it fails:** CI is the project's source of truth, not your local environment. Flaky CI does exist, but dismissing failures without investigation is a red flag.

**The fix:** Investigate every CI failure. If you can prove it's unrelated to your changes, provide evidence. Don't just re-run and hope.

---

## Part 9: Prevention Checklist

### Before You Submit

#### Scope Check
- [ ] Only 1 change in this PR
- [ ] Under 10 files changed
- [ ] Under 500 lines added
- [ ] No unrelated files changed

#### Discussion Check
- [ ] Did you open an issue first?
- [ ] Did you wait for acknowledgment?
- [ ] Is the change aligned with project vision?

#### Security Check
- [ ] No SQL injection (`grep -rn 'f"' src/ | grep -i execute`)
- [ ] No connection leaks (`grep "\.connect" | grep -v "finally"`)
- [ ] No shell injection (`grep "os.system\|shell=True"`)
- [ ] No hardcoded secrets (`grep "sk_live\|AKIA"`)
- [ ] No Windows-unsafe signals (`grep "SIGALRM" | grep -v hasattr`)

#### Quality Check
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] New code has tests
- [ ] No unused imports
- [ ] No dead code

#### Pattern Check
- [ ] Follows existing code style
- [ ] Uses correct naming conventions
- [ ] File organization matches project

#### Communication Check
- [ ] PR description matches diff exactly
- [ ] Will respond within 48 hours

---

## Summary

The 7 deadly mistakes:

1. **SQL injection via f-string** — BLOCKER
2. **Connection leaks** — No `try/finally`
3. **Fake implementation** — SHA256 as "embeddings"
4. **Phantom references** — Non-existent modules in toolset config
5. **Merge pollution** — Wrong base branch, thousands of files
6. **PR body != diff** — Describing unimplemented features
7. **Pushing without approval** — Trust damage

The key takeaways:

1. **Security first** — No SQL injection, no leaks, no shell injection
2. **One change per PR** — Never bundle multiple features
3. **Discuss first** — Open an issue before coding
4. **Tests required** — Every new feature needs tests
5. **Follow patterns** — Copy exactly from existing code
6. **Small diffs** — Under 10 files, under 500 lines
7. **Honest PR body** — Every sentence must match the diff
8. **Respond fast** — Within 48 hours to reviews
9. **Accept feedback** — Never argue with reviewers

---

## Part 10: Global OSS Failure Case Studies

While Parts 1-9 focus on specific generalized failures, this section documents failure patterns that apply to **any** open source contribution, across any ecosystem. These are drawn from real incidents in the broader OSS world.

---

### 10.1 Famous OSS Failures (Generalizable Lessons)

The following well-known incidents contain lessons that directly apply to everyday OSS contribution. Each case is distilled into actionable takeaways.

#### The Left-Pad Incident (npm, March 2016)

**What happened:** A developer named Azer Koçulu unpublished all his npm packages — including `left-pad`, a simple 11-line package that string-padded characters. Thousands of projects (including Babel, Node.js tooling, and React Native builds) immediately broke because they depended on `left-pad` either directly or transitively.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Dependency fragility | A single 11-line function can break the entire JavaScript ecosystem. Never treat third-party dependencies as "free." |
| Package removal permissions | npm allowed unpublishing packages others depended on. The policy was changed after this incident. Always audit publisher permissions. |
| Minimal dependency principle | Ask: "Do I really need a package for this?" Don't import a library for one utility function you could write in 2 lines. |

**Project parallel:** Every review of new dependencies should ask: "Can we write this ourselves in 3 lines of code?" If yes, write it. If no, scrutinize the dependency's maintenance, security, and license.

#### Heartbleed (OpenSSL, April 2014)

**What happened:** A buffer over-read vulnerability in OpenSSL's TLS heartbeat extension (CVE-2014-0160) exposed up to 64KB of server memory per request — including private keys, passwords, and session data. OpenSSL at the time was maintained by a tiny team of volunteers, with minimal funding despite being the encryption backbone of the internet.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Underfunded critical infrastructure | The most critical OSS is often the most under-resourced. Contribute to infrastructure, not just shiny features. |
| Missing automated testing | Heartbleed went undetected for ~2 years. Comprehensive fuzz testing would have caught it. |
| Security review culture | A single maintainer reviewing their own commits is insufficient. Always seek second reviews on security-sensitive code. |

**Project parallel:** The SQL injection via f-string example in PR #D is the project's Heartbleed moment — a security vulnerability that should have been caught by basic review patterns. Every project has its own version of this: a security-critical fix that was one review away from being caught.

#### Log4j / CVE-2021-44228 (December 2021)

**What happened:** A critical remote code execution vulnerability in Apache Log4j 2.x allowed attackers to execute arbitrary code via crafted log messages. The flaw propagated through every Java application using the library — Minecraft servers, enterprise platforms, cloud services. The industry-wide response cost billions in remediation.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Supply chain propagation | A vulnerability in one dependency infects everything downstream. Any code you submit becomes part of someone's supply chain. |
| Default behavior matters | Log4j's JNDI lookup feature was enabled by default and rarely needed. Disable insecure defaults in your code. |
| Patch velocity | Projects that responded fastest (days vs weeks) suffered less damage. Always prioritize security patch reviews. |

**Project parallel:** SQL injection via f-string is a supply-chain vulnerability — any user of the tool would have had their database compromised. Never assume "it's just a tool" — your code is someone else's dependency.

#### Colors.js / Faker.js Sabotage (January 2022)

**What happened:** Marak Squires, maintainer of Faker.js (weekly downloads: 2.8M) and Colors.js (weekly downloads: 20M+), intentionally pushed malicious updates that caused infinite loops and gibberish output. His stated reason: corporate users were profiting from his free work while sending him cease-and-desist letters.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Maintainer burnout is real | OSS maintainers are humans. Burnout, resentment, and protestware are consequences of unsustainable maintenance. |
| Dependency trust model | You trust every maintainer in your dependency tree. Vet critical dependencies and consider pinning by hash. |
| Corporate responsibility | Companies consuming OSS must contribute back — via funding, maintenance, or at minimum respectful interaction. |

**Project parallel:** If a maintainer seems unresponsive or confrontational, they may be burned out. Be patient, kind, and offer help rather than demands. This applies to every project you contribute to.

#### PyPI Typosquatting Attacks (Ongoing)

**What happened:** Attackers upload packages to PyPI with names similar to popular packages: `requsts` (vs `requests`), `urlllib3` (vs `urllib3`), `python-dateutil` (vs `python-dateutil`). These packages often contain malware that steals SSH keys, environment variables, or installs backdoors. This class of attack extends to npm (e.g., `crossenv` vs `cross-env`), RubyGems, and every other package registry.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Name confusion is a security vector | When naming new tools or packages, choose names unlikely to be typosquatted. Avoid common misspellings. |
| Verify checksums | Always verify package hashes in CI/CD. Use lockfiles with hash verification. |
| Inspect unfamiliar imports | If a PR adds a new dependency you've never heard of, verify its legitimacy and maintainer. |

**Project parallel:** Dependency pinning policies (locking versions and hashes) directly address this threat. Every project should have an explicit policy on upper-bound pins and hash verification.

#### Linux Kernel Coding Style Rejection

**What happened:** Countless kernel contributors have had patches rejected not for technical correctness, but for violating Linus Torvalds' strict coding style guidelines — tabs vs spaces, 80-column limits, brace placement. Even trivial style violations result in automatic rejection, sometimes with harsh feedback.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Style is not optional | In many projects, style violations are treated as bugs. Read the style guide before writing a single line. |
| Maintainer tone | Some communities are intentionally harsh. Don't take it personally — the code is what matters. |
| Tooling helps | Use auto-formatters (`black`, `rustfmt`, `clang-format`, `prettier`) to eliminate style as a rejection vector. |

**Project parallel:** The first PR (#A) was rejected for not following existing patterns — the equivalent of style rejection. Every project has its own "tabs vs spaces" equivalent. Find it before you write code.

#### The Curl Project's Feature Scope Rejection

**What happened:** A contributor submitted a PR to add DRM removal features to curl. Daniel Stenberg (curl's maintainer) rejected it on the grounds that curl is a transfer tool, not a media-pirating utility. The scope simply didn't belong in the project.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Scope creep is a rejection magnet | Adding features outside the project's stated mission guarantees rejection, regardless of code quality. |
| Read the project vision first | Check CONTRIBUTING.md, README, and existing issues to understand what the project considers "in scope." |
| Propose before building | Open an issue asking "Would the project accept a PR that does X?" before writing code. |

**Project parallel:** PR #L bundled 4 features into 1 PR, each in different areas — scope creep that led to immediate closure. Always ask: "Is this in scope?" before writing a single line.

#### Kubernetes API Breaking Changes

**What happened:** As Kubernetes evolved, its API went through multiple deprecation cycles. Several early PRs introduced API changes that broke backward compatibility, forcing the project to adopt rigorous deprecation policies (e.g., GA APIs must be stable for 12 months before removal).

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Backward compatibility is sacred | Changing existing behavior breaks users. Always preserve the old API when adding a new one. |
| Deprecation takes patience | A deprecation cycle may span multiple releases. Don't rush to remove "old" code. |
| Versioning strategy matters | Projects without clear versioning (SemVer, date-based, etc.) struggle with compatibility discussions. |

**Project parallel:** The merge pollution incident (PR #L) with its massive diff from wrong base branching is the ultimate backward-compatibility violation — it touched files it had no business changing. Respect the boundaries of what your PR should touch.

#### The XZ Utils Backdoor (CVE-2024-3094, March 2024)

**What happened:** A sophisticated supply chain attack was introduced into XZ Utils (liblzma) over a period of ~2 years. The attacker (Jia Tan) gradually earned maintainer trust through legitimate contributions, then introduced a backdoor that allowed remote code execution via SSH. It was caught before widespread deployment due to performance anomalies noticed by a developer at Microsoft.

**Lesson for contributors:**

| Aspect | Takeaway |
|--------|----------|
| Trust must be earned slowly | The attacker spent 2 years building trust before introducing malicious code. Projects should be suspicious of rapid trust escalation. |
| Performance anomalies matter | Unusual performance regressions can indicate malicious code. Monitor these as a security signal. |
| Single points of failure | A single maintainer with unlimited commit rights is a security risk. Require multiple approvals on sensitive code. |

**Project parallel:** This extends the lesson from PR #E and #K about trust. Building trust is essential, but from a project perspective, trust must be verified — not assumed — at every level. Two-factor reviews, signed commits, and CI security scanning are bare-minimum defenses.

---

### 10.2 Contributor-Level Real Failures (Universal)

The following failures are not specific to any project. They happen to new contributors everywhere.

#### Forking with Wrong Settings

**The failure:** Forking a public repo as private (or vice versa). A private fork cannot create pull requests against the upstream public repo. A public fork of a security-sensitive repo exposes unreleased work.

**Prevention:**
- Double-check visibility before clicking "Fork"
- On GitHub: the fork dialog defaults to your organization — verify the owner and visibility
- If you accidentally create the wrong fork type, delete it and re-fork

#### Using Wrong Branch Protection

**The failure:** Force-pushing to `main` on a shared fork, losing teammates' work. Or pushing to `main` on the upstream repo if you somehow have write access.

**Prevention:**
- Never force-push to shared branches without coordination
- Use `git push --force-with-lease` instead of `--force`
- Protect `main` on your fork via GitHub branch protection rules
- Consider working in `feat/*` branches exclusively

#### Not Reading the Room

**The failure:** Submitting a 3000-line PR to a project where the maintainer has 5 open issues and clearly limited bandwidth. Or submitting to a project that hasn't accepted an external PR in 2 years.

**Prevention:**
- Check the project's recent activity before contributing
- Look at the average PR size and frequency
- Read recent closed PRs to see typical rejection patterns
- Check when the maintainer last merged an external contribution

#### Ignoring CI Failures

**The failure:** Submitting a PR, seeing red CI checks, and commenting "it passes locally" or "please re-run CI" without investigating. CI is the project's truth — not your local environment.

**Prevention:**
- Never assume "it works on my machine" is acceptable
- Examine every CI failure log, even if you think it's unrelated
- CI may catch environment-specific bugs, linting differences, or race conditions
- If CI is flaky, ask how to handle it — don't ignore it

#### Not Joining the Community

**The failure:** Submitting PRs blindly without joining the project's community channels (Discord, Slack, mailing list, forum). This means missing context: ongoing design discussions, maintainer availability, planned breaking changes, and community norms.

**Prevention:**
- Join the community channel before your first PR
- Introduce yourself and your intended contribution
- Follow discussions for at least a week to absorb project culture
- Ask "Is anyone already working on X?" before starting work

#### Submitting During Maintainer Hiatus

**The failure:** Submitting a PR during the maintainer's vacation, conference season, or known break period. The PR sits untouched for weeks, accumulating merge conflicts and frustration.

**Prevention:**
- Check the project's status page, community channels, or social media for maintainer availability
- Look at commit history — if no commits in 3+ weeks, the maintainer may be on break
- If a PR goes stale, wait patiently or ask when they'll be able to review
- Never ping aggressively — maintainers owe you nothing

#### Multiple PRs from the Same Branch

**The failure:** Creating multiple PRs from the same feature branch. When the first PR's commits change (rebase, amend, squash), the second PR automatically pulls those changes — often creating a confusing mess of duplicate or conflicting commits.

**Prevention:**
- Each PR gets its own branch
- If a branch already has an open PR, create a new branch for additional work
- Use `git branch <new-branch>` before making additional changes

#### Not Squashing Commits Before Merge

**The failure:** Leaving a trail of "fix typo", "oops", "actually fix it for real", "WIP", "address review 1", "address review 2" commits. The project maintainer has to squash-merge, losing the ability to cherry-pick individual meaningful commits.

**Prevention:**
- Squash your own commits into logical units before the review
- Each commit should be a self-contained, reviewable unit
- If the project requires a single commit, use `git rebase -i` or `git merge --squash`
- For multi-commit PRs, each commit message must be meaningful

#### Not Checking for Duplicate Work

**The failure:** Spending days implementing a feature that someone else is already working on, or that was already rejected in a previous issue.

**Prevention:**
- Search closed issues and PRs for similar work before starting
- Ask in the community channel if anyone is working on the feature
- Check the project's roadmap or project board for in-progress items

#### The "I'll Add Tests Later" Trap

**The failure:** Submitting a PR with a promise to add tests "in a follow-up PR." The follow-up never happens, and the untested code becomes a maintenance burden.

**Prevention:**
- Write tests alongside code, not after
- A PR without tests is incomplete — do not submit it
- If a reviewer asks for tests, add them before merging, not "later"

---

### 10.3 The "Flop Thermodynamics" — A General Theory

We can model the probability of a contribution failing across **any** project with the following relationship:

```
Flop Probability = (Scope × Complexity × Novelty) / (PriorDiscussion × PatternMatch × Tests)
```

#### Variable Definitions

| Variable | Range | Description | Example (High Value = Risky) |
|----------|-------|-------------|------------------------------|
| **Scope** | 1-10 | Number of changes bundled in one contribution | A single bugfix = 1; a 4-feature mega-PR = 10 |
| **Complexity** | 1-10 | Technical difficulty of the change | Updating a docstring = 1; adding a new database engine = 10 |
| **Novelty** | 1-10 | How new/unfamiliar the approach is to the project | Following an existing pattern = 1; inventing a new architecture = 10 |
| **PriorDiscussion** | 1-10 | How much you discussed before coding | Opened an issue + got maintainer approval = 10; submitted cold = 1 |
| **PatternMatch** | 1-10 | How well the change matches existing code patterns | Exact copy of existing pattern = 10; completely novel structure = 1 |
| **Tests** | 1-10 | Quality and coverage of tests | Comprehensive tests + CI passing = 10; no tests = 1 |

#### Examples Across Ecosystems

**Example A: The Well-Prepared Contribution (Low Flop Risk)**

```
Scope: 1 (single bugfix)
Complexity: 2 (one-line change)
Novelty: 1 (follows existing pattern exactly)
PriorDiscussion: 8 (issue filed, discussed, approved)
PatternMatch: 9 (copy-paste from sibling code)
Tests: 8 (added 2 test cases, all CI green)

FP = (1 × 2 × 1) / (8 × 9 × 8) = 2 / 576 = 0.003 (0.3% flop risk)
```

**Example B: The Rookie Blunder (High Flop Risk)**

```
Scope: 8 (3 features + refactoring)
Complexity: 7 (new subsystem)
Novelty: 9 (novel architecture disagreement)
PriorDiscussion: 1 (no issue, no community presence)
PatternMatch: 2 ("I'll do it my way")
Tests: 1 (no tests, CI red)

FP = (8 × 7 × 9) / (1 × 2 × 1) = 504 / 2 = 252 (near-certain flop)
```

**Example C: The Kubernetes API Change**

```
Scope: 3 (one API change + deprecation notice)
Complexity: 6 (touches core API server code)
Novelty: 4 (follows existing deprecation patterns)
PriorDiscussion: 7 (KEP approved, community discussion held)
PatternMatch: 8 (follows previous deprecation exactly)
Tests: 9 (integration + e2e tests, conformance suite)

FP = (3 × 6 × 4) / (7 × 8 × 9) = 72 / 504 = 0.14 (14% flop risk — reasonable)
```

**Example D: The Left-Pad Package**

```
Scope: 1 (one utility function)
Complexity: 1 (11 lines)
Novelty: 0.1 (string padding — well-trodden problem)
PriorDiscussion: 1 (no discussion, just publishing)
PatternMatch: 10 (standard utility pattern)
Tests: 1 (no tests published)

FP = (1 × 1 × 0.1) / (1 × 10 × 1) = 0.1 / 10 = 0.01

But note: this formula measures *contribution* flop, not *ecosystem* damage.
The contribution succeeded (the package was used), but the ecosystem damage
was catastrophic. An "Ecosystem Impact Modifier" is needed for shared dependencies.
```

**Example E: The XZ Backdoor (Malicious Contribution)**

```
Scope: 1 (minimal changes per commit)
Complexity: 6 (subtle backdoor via binary blobs)
Novelty: 9 (novel infiltration technique)
PriorDiscussion: 9 (active community participation over 2 years)
PatternMatch: 10 (matched code style perfectly)
Tests: 8 (added tests and CI passed)

FP = (1 × 6 × 9) / (9 × 10 × 8) = 54 / 720 = 0.075

This shows a critical limitation of the model: it measures *good-faith* contribution
flop risk. A malicious contributor who invests in discussion, pattern matching, and
tests can achieve a low Flop Probability while delivering harmful code. Security
review must go beyond the formula — verify intent through behavioral signals,
binary diff analysis, and build provenance.
```

**Example F: The Node.js `undici` Fetch Takeover**

```
Scope: 2 (update fetch implementation)
Complexity: 5 (networking edge cases)
Novelty: 4 (follows WHATWG spec)
PriorDiscussion: 6 (noted in issue tracker)
PatternMatch: 7 (follows existing HTTP patterns)
Tests: 6 (mostly happy-path tests, missing error cases)

FP = (2 × 5 × 4) / (6 × 7 × 6) = 40 / 252 = 0.16

This contribution actually landed — the flop risk was moderate because the
discussion and pattern match were strong, even though tests were incomplete.
Edge cases surfaced later as production bugs.
```

#### The Thermodynamics Insight

The formula reveals two key insights:

1. **The numerator is multiplicative** — a single high value in Scope, Complexity, or Novelty can be mitigated by low values in the other two. But all three being high is a multiplicative catastrophe.

2. **The denominator is also multiplicative** — PriorDiscussion, PatternMatch, and Tests compound. A failed PriorDiscussion score (1) with low PatternMatch and Tests results in a denominator so small the flop probability explodes.

**Practical rule of thumb:** Never submit any PR where any term in the denominator is below 5. If you haven't discussed it (PriorDiscussion ≤ 5), go discuss before coding. If you don't have tests (Tests ≤ 5), write tests first.

**Extended insight — The "Ecosystem Impact Modifier":**

The base Flop Probability measures whether *your* contribution will be accepted. But some contributions, even when accepted, have catastrophic ecosystem-level impact. An additional modifier should be applied for shared dependencies:

```
Ecosystem Impact = Flop Probability × DownstreamCount × TrustLevel
```

Where:
- **DownstreamCount** = Number of packages/projects depending on your code
- **TrustLevel** = How deeply embedded your code is (runtime dependency vs dev dependency)

A low Flop Probability does not guarantee a safe contribution. The left-pad, colors.js, and XZ backdoor examples all demonstrate contributions that "succeeded" but caused disproportionate damage.

---

### 10.4 Recovery Playbook (Any Project)

When a contribution flops — and it will — follow these 5 steps. They work for any project, any ecosystem.

#### Step 1: Stop and Assess (0-24 hours)

Do not react immediately. Do not argue. Do not "defend" your code.

- Read the rejection/review feedback three times
- Identify which Flop Thermodynamics variable(s) failed
- Determine if the rejection is about **what** you did or **how** you did it
- Ask yourself: "If I were the maintainer, would I accept this PR?"

**Checklist:**
```
☐ Have I read all comments at least twice?
☐ Can I identify the primary rejection reason?
☐ Is this salvageable (resubmit) or terminal (abandon)?
☐ Would continuing damage my relationship with this community?
```

#### Step 2: Acknowledge Publicly (24-48 hours)

Respond to the maintainer with grace. This is the most important step.

**Good response template:**
```
Thank you for the thorough review. I understand the issues raised.
I should have [opened an issue first / written tests / discussed the approach].
I'll address the feedback and resubmit. Lessons learned.
```

**Bad response (do not use):**
```
I disagree. This is actually a really useful feature and here's why
you're wrong about the approach. Also CI failures are unrelated.
```

Rule: **You are not your code.** A rejected PR is not a personal attack.

#### Step 3: Extract Patterns (24-72 hours)

Document what you learned for next time:

- What specific pattern caused the rejection? (Scope, approach, style, tests?)
- What would you do differently?
- What project-specific conventions did you miss?
- What would you look for before starting the next contribution?

**File a personal log entry** (like this very document). Track patterns across projects to identify your systemic weaknesses.

#### Step 4: Small Rebuild (Week 1-2)

Do not resubmit the same PR immediately. Instead:

- Fix ONE small, unrelated issue in the same project (typo, docs, trivial bug)
- This demonstrates good faith and that you read the feedback
- It re-establishes a positive interaction before the difficult resubmission
- Small fixes also help you learn the project's workflow without pressure

**Only then**, if the project is open to it, resubmit the original contribution with all issues addressed.

#### Step 5: Systemic Fix (Ongoing)

Change your contribution process to prevent the same failure:

| If you failed on... | Fix for next time |
|---------------------|-------------------|
| Scope | Enforce "one change per PR" — use `git diff --stat` before opening |
| Tests | Write tests alongside code, not after |
| Discussion | Join community, open issue first, wait for green light |
| Style | Install auto-formatter, run lint before every PR |
| Communication | Draft PR body before writing code, verify every claim |
| Timing | Check maintainer availability, never submit during holidays |
| Security | Run security linters (bandit, semgrep) before every push |

### Recovery Anti-Patterns: Extended Case Studies

#### The "Angry Rebuttal" (Real Example)

**Scenario:** A contributor submitted a PR to a popular web framework. The reviewer flagged that the approach was incompatible with the framework's middleware architecture. The contributor responded with a 2000-word defense arguing that the reviewer "just doesn't understand the use case."

**Outcome:** The maintainer closed the PR with a note saying "The tone of this discussion is not productive." The contributor was subsequently banned from the project's community channels.

**Lesson:** Even if you are technically correct, an angry rebuttal ensures your code never ships. Write your response, then wait 24 hours before posting. If you still feel angry after 24 hours, don't post at all.

#### The "Well, Actually" (Common Pattern)

**Scenario:** Contributor receives 5 review comments. They address 4 but leave the 5th with a comment: "This is fine actually, it works in my testing."

**Outcome:** The maintainer insists on the change. The contributor eventually complies, but the interaction leaves a negative impression. On the next PR, the maintainer is more critical.

**Lesson:** "This is fine" is never a sufficient response to a reviewer concern. Either make the change, or explain — with code evidence, not opinion — why the current approach is correct. Even then, defer to the maintainer's judgment.

---

### 10.5 Cross-Project Prevention Dashboard

Use this template to track your flops across multiple projects. Copy it into your personal tracking system.

#### Project Flop Tracker

| Project | PR # | Date | Scope Score | Complexity | Novelty | Discussion | Pattern Match | Tests | Flop Factor | Recovery Status |
|---------|------|------|-------------|------------|---------|------------|---------------|-------|-------------|-----------------|
| Project X | D | Apr 2026 | 2 | 4 | 2 | 3 | 4 | 1 | 2.67 | Resolved |
| Project X | F | Apr 2026 | 1 | 3 | 8 | 1 | 1 | 1 | 24.0 | Abandoned |
| Project Y | L | May 2026 | 10 | 6 | 2 | 1 | 4 | 2 | 15.0 | Closed |
| <project> | <n> | <date> | <1-10> | <1-10> | <1-10> | <1-10> | <1-10> | <1-10> | <calc> | <status> |

#### Personal Metrics Dashboard

Track these metrics monthly to measure improvement:

| Metric | Target | Month 1 | Month 2 | Month 3 | Trend |
|--------|--------|---------|---------|---------|-------|
| PRs accepted | ≥ 80% | | | | |
| Average flop factor | < 1.0 | | | | |
| Pre-discussion ratio | ≥ 90% | | | | |
| Test coverage on new code | ≥ 90% | | | | |
| Time to first response | ≤ 48h | | | | |
| Resubmission success rate | ≥ 70% | | | | |
| Branches per PR | 1.0 | | | | |
| Community joins per project | ≥ 1 | | | | |

#### Weekly Prevention Ritual

Before any contribution week, run through this 5-minute checklist:

```
[ ] Read the project's CONTRIBUTING.md again (yes, again)
[ ] Check maintainer activity in the last week
[ ] Browse 3 recent accepted PRs for patterns
[ ] Run `git diff --stat` — verify single scope
[ ] Run lint/format on your branch
[ ] Verify all tests pass locally
[ ] Draft PR body and cross-check against diff
[ ] Confirm issue discussion exists and has maintainer acknowledgment
[ ] Ensure community channel has been joined
[ ] Run security scanner on new code
```

#### Root Cause Decision Tree

When a PR flops, trace through this tree to identify the root cause:

```
PR Rejected?
├── Did you discuss first?
│   ├── No → Root Cause: NO DISCUSSION. Fix: Open issue first next time.
│   └── Yes
│       └── Did maintainer agree to the approach?
│           ├── No → Root Cause: WRONG APPROACH. Fix: Get explicit approval.
│           └── Yes
│               └── Does the code match project patterns?
│                   ├── No → Root Cause: POOR PATTERN MATCH. Fix: Study existing code.
│                   └── Yes
│                       └── Are there adequate tests?
│                           ├── No → Root Cause: MISSING TESTS. Fix: TDD next time.
│                           └── Yes
│                               └── Is the scope single-feature?
│                                   ├── No → Root Cause: SCOPE CREEP. Fix: Split into separate PRs.
│                                   └── Yes
│                                       └── Did CI pass?
│                                           ├── No → Root Cause: CI FAILURE. Fix: Investigate logs.
│                                           └── Yes
│                                               └── Did you check for security issues?
│                                                   ├── No → Root Cause: SECURITY NEGLECT. Fix: Run security linters.
│                                                   └── Yes
│                                                       └── Possible: Maintainer preference / subjective rejection.
│                                                           Accept and move on to another contribution.
```

#### Per-Project Culture Reference

Different OSS communities have different norms. These must be learned per project:

| Project Type | Typical Norms | How to Adapt |
|--------------|---------------|--------------|
| Large foundation (Kubernetes, Apache) | Heavy process, multiple approvals, KEPs/RFCs | Read governance docs, join SIG meetings, expect slow process |
| BDFL-led (curl, Linux, SQLite) | One decision-maker, strong style opinions | Read maintainer's past reviews, match style exactly |
| Small team (most projects) | Informal, variable bandwidth | Check activity first, be patient, small changes first |
| Corporate-backed (VS Code, Docker) | Employee-driven, external PRs secondary | Focus on bug fixes, not features; align with public roadmap |
| Unmaintained (archived/no commits) | Do not contribute — project is dead | Search for forks, adopt or contribute to the fork instead |

---

## Appendix A: Security Vulnerability Catalog — Patterns Found in Real PRs

This appendix catalogs security vulnerabilities actually found during PR reviews of various OSS projects. Each pattern is documented with the vulnerable code pattern, why it's dangerous, and the fix.

### A.1 SQL Injection

**Vulnerable:**
```python
cursor.execute(f"SELECT * FROM {table_name} WHERE id = {user_id}")
```

**Why:** An attacker controlling `table_name` or `user_id` can inject arbitrary SQL. Even if the input appears "safe," the database will interpret user-controlled content as SQL syntax, not data.

**Fix:**
```python
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

### A.2 Command Injection

**Vulnerable:**
```python
os.system(f"ffmpeg -i {input_file} {output_file}")
```

**Why:** An attacker controlling `input_file` could pass `; rm -rf /` or `$(malicious_command)`. The shell interprets the entire string as a command.

**Fix:**
```python
import subprocess
subprocess.run(["ffmpeg", "-i", input_file, output_file], check=True)
```

### A.3 Path Traversal

**Vulnerable:**
```python
with open(f"/data/{user_filename}", "r") as f:
    data = f.read()
```

**Why:** An attacker providing `../../etc/passwd` as `user_filename` can read arbitrary files outside the intended directory.

**Fix:**
```python
import os
base = "/data"
safe_path = os.path.normpath(os.path.join(base, user_filename))
if not safe_path.startswith(os.path.normpath(base)):
    raise ValueError("Path traversal detected")
with open(safe_path, "r") as f:
    data = f.read()
```

### A.4 Insecure Deserialization

**Vulnerable:**
```python
import pickle
data = pickle.loads(untrusted_bytes)
```

**Why:** Pickle deserialization can execute arbitrary code. An attacker crafts a malicious pickle payload that runs `os.system("rm -rf /")` during deserialization.

**Fix:**
```python
import json
data = json.loads(untrusted_string)  # JSON is safe
```

Or use a safe serialization format (JSON, msgpack, etc.) for untrusted data.

### A.5 Timing Attacks

**Vulnerable:**
```python
if user_input == secret_key:
    grant_access()
```

**Why:** String comparison in Python short-circuits on the first non-matching character. An attacker can measure response times to guess the secret key character by character.

**Fix:**
```python
import hmac
if hmac.compare_digest(user_input, secret_key):
    grant_access()
```

### A.6 Hardcoded Secrets

**Vulnerable:**
```python
API_KEY = "sk-live-abc123def456"
```

**Why:** Anyone with access to the source code (including all users of the package) can use the API key. It will be scraped by automated tools that search public repositories for credential patterns.

**Fix:** Use environment variables or a secrets manager:
```python
import os
API_KEY = os.environ["API_KEY"]
```

Add the key to `.env` (which is in `.gitignore`), not to committed source code.

---

## Appendix B: Review Etiquette — A Reference for All Projects

### When You Are the Contributor

| Situation | What to Do |
|-----------|-----------|
| Reviewer asks for changes | Make the changes promptly. Ask clarifying questions if needed. |
| Reviewer rejects the approach | Do not argue. Ask for guidance on what approach would be acceptable. |
| Reviewer does not respond | Wait 1 week, then politely bump the thread. Never ping aggressively. |
| Reviewer is harsh | Do not take it personally. Focus on the technical feedback, not the tone. |
| Multiple reviewers disagree | Ask the maintainer for a final decision. Do not take sides. |
| CI fails | Investigate before responding. Do not say "it passes on my machine." |

### When You Are the Reviewer

| Situation | What to Do |
|-----------|-----------|
| Contributor's code has issues | Be specific about what needs to change. Provide examples. |
| Contributor does not understand | Explain the concept, not just the fix. Teach. |
| Contributor argues | Stay calm. State your position once. If they persist, tag another maintainer. |
| PR is clearly wrong | Close politely with an explanation. Do not shame. |
| Contributor is new | Be patient. Welcome them. Explain project conventions. |

### Tone Guidelines Across Cultures

| Culture | Communication Style | Adapt By |
|---------|-------------------|----------|
| US/Western | Direct, informal, friendly | Match tone, don't over-interpret directness as hostility |
| Northern European | Direct, formal, minimal small talk | Respect efficiency, don't expect pleasantries |
| East Asian | Indirect, highly polite, hierarchical | Read between the lines, show deference to senior maintainers |
| Russian/Eastern European | Blunt, direct, no-nonsense | Do not mistake bluntness for rudeness |

---

*Last updated: May 2026*
*Purpose: Global failure documentation for ANY OSS project*
*Note: Based on real experiences across multiple open-source projects. Every pattern here cost review rounds, trust, or contributions. Names and project specifics have been generalized to focus on transferable lessons.*
