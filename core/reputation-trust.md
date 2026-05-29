# Reputation & Trust — Building Project Maintainer Confidence

> Trust is the currency of open source. Every PR either builds it or burns it.
> This guide documents how contributors build, maintain, and repair trust with project maintainers.
> Every lesson here was earned through real interactions with project maintainers across multiple OSS projects.

---

## THE TRUST EQUATION

```
Trust = (Consistency × Reliability × Responsiveness) / (Surprises × Defensiveness)
```

**Consistency:** Every PR follows the same patterns. No surprises.
**Reliability:** Code compiles, tests pass, no regressions.
**Responsiveness:** Review comments addressed promptly and professionally.
**Surprises:** Unexpected scope creep, force pushes, phantom features.
**Defensiveness:** Arguing with reviewers, rejecting feedback.

The goal: **merge rate → reliability → maintainer trust → long-term subsystem ownership.**

---

## PHASE 1 — EARNING INITIAL TRUST (First PRs)

### What Builds Trust
- Following existing project patterns and conventions
- Fixing every review finding promptly
- Maintaining professional communication
- Keeping PRs small and focused on a single concern

### Common Pitfalls (Real Examples)
- Early PR submitted with phantom references (imports and functions not in the branch)
- PR had dead code causing compilation/syntax errors
- PR introduced a security vulnerability (BLOCKER — SQL injection, shell injection, etc.)
- PR pushed without going through proper review process

### Trust Impact
- Initial trust is LOW. Every early PR typically requires 2-3 review rounds.
- The reviewer is checking for basic competence — syntax, patterns, testing.
- Contributors often fail the "basic competence" test multiple times before passing it.

### Lesson
New contributors are evaluated on: **does the code compile? Does it follow patterns? Does it have tests?** Until these are consistently right, maintainers won't trust anything else.

---

## PHASE 2 — BUILDING CONSISTENCY (Early PRs)

### What Builds Trust
- Creating detailed documentation of every review finding to track progress
- Fixing ALL review issues before re-requesting (no skipped items)
- Responding with clear "Fixed X by doing Y" format
- Keeping each PR to a single focused concern

### Common Pitfalls (Real Examples)
- Early PR contained placeholder/fake implementation — "DO NOT SUBMIT" verdict from reviewers
- Early PR had naming inconsistencies (inconsistent variable naming across files)
- Early PR had a critical change silently missing (BLOCKER — missing error handling, dropped validation)
- PR pushed without proper approval process

### Trust Impact
- Trust can STALL. Contributors may fix issues but keep making new ones.
- Maintainers start saying "This PR also addresses X" — showing they're tracking contributions.
- But contributors may still make basic mistakes that should be caught by self-review.

### Lesson
Consistency means **zero regression.** Fixing a security vulnerability in one PR means subsequent PRs should NEVER have that same class of vulnerability again. The trap is making NEW mistakes instead of fixing entire categories.

---

## PHASE 3 — PROFESSIONAL RESPONSE (Mature PRs)

### What Builds Trust
- Creating CONTRIBUTING.md and development guidelines with full self-review protocols
- Splitting closed/rejected PRs into focused single-feature branches
- Following a pre-commit checklist before every submission
- Adding comprehensive automated quality checks

### What Contributors Learn
- A PR can be CLOSED by maintainers — a significant trust setback
- The PR body may describe multiple features but deliver minimal LOC
- The reviewer may say "none of those features are actually implemented here"
- References to non-existent functions/methods erode trust

### Trust Recovery Strategy
1. **Acknowledge the mistake openly** — "The PR body was misleading. Here's what actually changed."
2. **Fix the root cause** — Create/review checklists that prevent the same mistake
3. **Deliver smaller, verified PRs** — Split the closed PR into focused branches, each verified against a checklist
4. **Prove improvement over time** — Each subsequent PR must be cleaner than the last

### Lesson
Trust that took 10 PRs to build can be lost in 1 PR. A closed PR is the biggest trust setback. Recovery requires: acknowledge, fix the system, deliver consistently.

---

## THE MAINTAINER PERSPECTIVE

### How Maintainers Evaluate Contributors

Based on actual maintainer review comments across OSS projects:

**What they check first:**
1. Does the PR body match the diff? (Misaligned PRs — FAILED)
2. Does the code compile/build? (Syntax errors — FAILED)
3. Does it follow existing patterns? (Phantom references — FAILED)
4. Is it secure? (Security vulnerabilities — FAILED)
5. Does it have tests? (Most PRs — PASSED)

**What they check after basic trust is established:**
1. Is the architecture right? Are we choosing the right abstraction?
2. Will this require maintenance? Or does it just work?
3. Does this fit the long-term project vision?
4. Does the contributor understand WHY the pattern exists?

**What they NEVER check (because they trust it):**
- Syntax (assumed to compile)
- Tests passing (assumed to pass)
- Security basics (assumed to be secure)

### Actual Reviewer Quotes (Anonymized from Real OSS Projects)

> "The PR body describes 4 features but the diff is minimal. The body and the diff don't match — none of those features are actually implemented here." — Project maintainer

> "This implementation doesn't provide the functionality described. This is a misrepresentation." — Maintainer review

> "Fake implementation — the tool/function doesn't deliver what it promises." — Review feedback

> "Resource leak: connection not closed on error path. If an exception occurs before cleanup, resources leak." — Code review finding

> "Nice infrastructure! Found a logic bug in version checking logic." — Positive open + specific feedback from maintainer

---

## COMMUNICATION PROTOCOLS

### When Submitting A PR
- Title follows project conventions: typically `feat(scope): description` or equivalent
- Body matches diff exactly — every paragraph corresponds to code changes
- Checklist items are honest (don't check things that aren't done)
- Include exact reproduction steps for bugs
- Include exact test commands for features

### When A Review Comes In
1. Read every finding carefully
2. Prioritize: P1 (must fix before merge), P2 (should fix), P3 (nice to have)
3. Fix every P1 and P2 before re-requesting
4. Respond to EACH finding with:
   ```
   > **\[P1] Title of finding** ✅
   > Changed X to Y because Z. Added test for regression.
   ```
5. NEVER argue — ask clarifying questions if unclear
6. Re-run the full pre-submission checklist after fixing

### When Contributors Disagree
Framework for respectful disagreement:
1. **Acknowledge** — "Thanks for catching that. I see your point about X."
2. **Evidence** — "Looking at the existing code, I see that Y uses a different pattern. Here's why I thought Z was appropriate: [specific reason]."
3. **Ask** — "Would Z pattern cause issues I'm not seeing? Happy to change if so."
4. **Accept** — If maintainer insists, change it. They have more context.

### Response Templates

**Fixing a finding:**
```
> **\[P1] Fixed security vulnerability by parameterizing user input** ✅
> Changed `f"PRAGMA table_info(\"{table_name}\")"` to use regex validation
> (`re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", table_name)`) before the f-string.
> This ensures only valid identifiers reach the SQL statement.
```

**Acknowledging a mistake:**
```
> **\[P1] PR body was misleading — acknowledged** ✅
> The PR body described 4 features but the diff only implements one feature.
> I've updated the PR body to match the diff. The remaining 3 features will be
> submitted as separate focused PRs.
```

**Disagreeing respectfully:**
```
> Regarding the concern about [specific issue]:
> I see where you're coming from. Looking at the existing implementation at
> [file:line], it follows a similar pattern. However, I understand your concern
> about [specific risk]. I've adjusted the approach to address it by [specific change].
> Let me know if this resolves the concern.
```

---

## TRUST-BUILDING ACTIONS

### Actions That BUILD Trust

| Action | Why It Builds Trust | Evidence |
|--------|---------------------|----------|
| Single focused PR | Reviewer understands scope immediately | Every merged PR follows this |
| PR body matches diff | No surprises, no disappointment | Misaligned PRs get closed immediately |
| All tests pass | No regression risk | Consistent PRs pass tests |
| Self-review before push | Catches issues before reviewer | Development guidelines mandate this |
| Professional responses | Maintainers want to work with you | Response format consistency |
| Fixing root causes, not symptoms | Contributor learns and improves | Process improvement after closed PRs |
| Splitting large changes | Easier to review each piece | Split rejected PRs into focused branches |
| Acknowledging mistakes openly | Shows maturity | "The body and diff don't match — fixed" |

### Actions That BURN Trust

| Action | Why It Burns Trust | Evidence |
|--------|---------------------|----------|
| PR body doesn't match diff | Feels like wasting reviewer's time | PRs closed immediately |
| Security vulnerabilities | Fundamental security failure | BLOCKER — merge halted |
| Fake/placeholder implementation | Dishonest work product | "DO NOT SUBMIT" verdict |
| Pushing without proper process | Ignores contributor protocol | Trust damage across multiple PRs |
| Force pushing shared branches | Destroys history, frustrates team | Best avoided entirely |
| Arguing with every finding | Makes review adversarial | Relationship damage |
| Submitting uncompilable code | Wastes first review pass | Basic competence failure |
| Massive merge pollution | Impossible to review | PR closed without review |

---

## TRUST METRICS — TRACKING PROGRESS

| Metric | First PRs | Early PRs | Mature PRs | Goal |
|--------|-----------|-----------|------------|------|
| Review rounds per PR | 2-3 | 1-2 | 1 | 1 |
| P1 findings per PR | 2+ | 1 | 0 | 0 |
| Closed/rejected PRs | Varies | Rare | 0 | 0 |
| Force pushes | Common | Rare | 0 | 0 |
| Process violations | Common | Rare | 0 | 0 |
| Tests written | Growing | Growing | Growing | Consistent |

### What 1 Review Round Looks Like
1. Submit PR with clean code
2. Reviewer approves or has 1-2 minor nits
3. Fix nits, re-request, approve and merge
4. **Total: 1 round**

### What 3 Review Rounds Look Like (What Early Contributors Start With)
1. Submit PR with issues
2. Reviewer finds 5+ issues
3. Fix issues, re-submit with NEW issues
4. Reviewer finds 2-3 more issues
5. Fix again, finally clean
6. **Total: 3 rounds — 3x maintainer time wasted**

---

## LONG-TERM SUBSYSTEM OWNERSHIP

### The Progression

```
Phase 1 — Newcomer
  Submit → Fix → Submit → Fix → ... → Trust?
  
Phase 2 — Established Contributor
  Submit clean PR → Minor fix → Merge
  Reviewer trusts: code compiles, follows patterns, secure
  
Phase 3 — Subsystem Owner
  Reviewer says: "You own the X subsystem. I trust your design decisions."
  Reviewer approves without reading every line.
```

### What Subsystem Ownership Entails
- Deep understanding of the subsystem's architecture and history
- Making design decisions, not just implementation decisions
- Reviewing other people's PRs in the subsystem
- Being the go-to person for questions about that area

### Common OSS Subsystems for Long-Term Ownership

| Subsystem | Contribution Pattern | Readiness Path |
|-----------|---------------------|----------------|
| Plugin/Extension System | Multiple extension-point contributions | High — build custom extensions, then core |
| Core Utilities & APIs | Many library-level contributions | High — contribute utilities, then maintain |
| Testing Infrastructure | Test framework, fixtures, CI | Medium — write tests, then improve infrastructure |
| Documentation & Guides | Docs, tutorials, examples | Medium — fix docs, then own documentation |
| Build & Deployment | Build scripts, packaging, releases | Medium — fix builds, then own release process |
| CLI/Tooling | Command-line tools, developer tooling | Medium — contribute tools, then own toolchain |
| Web/API Layer | REST/GraphQL APIs, webhooks | Medium — add endpoints, then own API design |
| Data Layer | Database, storage, caching | Medium — optimize queries, then own data architecture |
| Security & Auth | Authentication, authorization, audit | Low to Medium — secure basics, then own security |
| Performance | Optimization, profiling, benchmarking | Low to Medium — profile hotspots, then own perf |

---

## REPUTATION RECOVERY PLAN

After a significant trust setback (e.g., a closed/rejected PR), here's the recovery plan:

### Immediate (Done)
- [x] Create strict self-review protocols
- [x] Split rejected PR into focused branches
- [x] Each branch verified against a quality checklist
- [x] PR body now matches diff exactly

### Short-term (Next 3 PRs)
- [ ] Every PR must have exactly 1 review round — zero findings
- [ ] No PRs submitted without proper self-review
- [ ] Every PR body matches diff with no exaggeration

### Medium-term (Next 10 PRs)
- [ ] Build trust in a specific subsystem
- [ ] Start reviewing other people's code in that subsystem
- [ ] Propose design documents for major changes

---

## FINAL RULE

**One review round per PR.** If the reviewer finds issues, the quality gate failed. Perfect code on first submission builds trust. Fixing issues after review costs trust.

**Zero findings means:** the reviewer sees clean code, understands the change, approves immediately, and moves on. That's the goal for every PR.

**The bar is not "mostly correct." The bar is "merge immediately."**

---

## GLOBAL ECOSYSTEM TRUST LEVELS

Trust in the OSS ecosystem is tiered. Every contributor starts at the bottom and works up. These levels apply to ANY contributor, regardless of which subsystem they work on.

### Level 0 — First-Time Contributor
**Characteristics:**
- First PR to the project
- No history, no proven patterns
- Reviewer checks EVERY line carefully

**Expectations:**
- PR must be small and focused (bug fix, docs, test coverage)
- Must follow CONTRIBUTING.md and PR template exactly
- Tests must pass on first submission
- Code must compile/build on first submission

**Trust Level:** Minimal — reviewer assumes nothing works until proven otherwise.

**How to advance:** 2-3 clean PRs with zero findings. Professional response to review.

### Level 1 — Regular Contributor
**Characteristics:**
- 3+ merged PRs
- Consistent pattern following
- Tests included with every PR

**Expectations:**
- Can submit moderate features (new utilities, integrations)
- Reviewer skips basic checks (syntax, tests)
- Reviewer focuses on architecture and design decisions

**Trust Level:** Moderate — reviewer trusts basic competence but verifies design choices.

**How to advance:** 10+ clean PRs. Start reviewing others' PRs. Show subsystem knowledge.

### Level 2 — Subsystem Expert
**Characteristics:**
- Deep knowledge of one or more subsystems
- Owns the subsystem — makes design decisions
- Reviews other people's PRs in that subsystem

**Expectations:**
- Can submit major changes (core architecture, new abstractions)
- Reviewer trusts: "if they say it's right, it probably is"
- Reviewer may approve without reading every line

**Trust Level:** High — reviewer trusts judgment, not just correctness.

**How to advance:** Consistent PRs over 6+ months. Mentoring new contributors. Driving subsystem improvements.

### Level 3 — Core Maintainer
**Characteristics:**
- Write access to the repository
- Merges other people's PRs
- Sets technical direction for the project

**Trust Level:** Full — trusted with all aspects of the codebase.

### Trust Level Indicators

| Indicator | L0 | L1 | L2 | L3 |
|-----------|----|----|----|----|
| Reviewer reads every line | ✅ | ❌ | ❌ | ❌ |
| Reviewer checks tests | ✅ | ✅ | ❌ | ❌ |
| Reviewer trusts syntax compiles | ❌ | ✅ | ✅ | ✅ |
| Reviewer trusts design decisions | ❌ | ❌ | ✅ | ✅ |
| Can merge PRs | ❌ | ❌ | ❌ | ✅ |
| Can review PRs | ❌ | ❌ | ✅ | ✅ |

### How Maintainers Decide Your Level

Based on observed maintainer behavior across OSS projects:

**Indicators you're still L0:**
- PR gets detailed line-by-line comments
- Reviewer asks "did you test this?"
- Reviewer finds basic issues (syntax, patterns, imports)

**Indicators you're L1:**
- Reviewer says "approach looks right" rather than "fix line 47"
- Reviewer focuses on architecture, not syntax
- Reviewer trusts your tests cover the right things

**Indicators you're L2:**
- Reviewer defers to your judgment: "if you think this is the right approach, go with it"
- Reviewer asks you to review other PRs in your area
- Reviewer says "you own the X subsystem"

### OSS Ecosystem-Specific Trust Builders

**Actions that fast-track trust:**
- Write tests for existing untested code
- Fix bugs in your subsystem before adding features
- Review other people's PRs constructively
- Document architecture decisions (ADR-style)
- Respond to issues in your subsystem

**Actions that stall trust at L0:**
- Large PRs touching multiple subsystems
- PR body that doesn't match diff
- Pushing without CI passing
- Ignoring review comments
- Multiple review rounds for the same issue type

### The Ecosystem Contract

```
As a project contributor, I commit to:
1. Reading CONTRIBUTING.md and development guidelines before my first PR
2. Keeping PRs small, focused, and self-contained
3. Including tests with every feature
4. Following existing patterns exactly
5. Responding professionally to all review comments
6. Building trust gradually through consistent, reliable contributions
7. Eventually helping others as I was helped

As a project maintainer, I commit to:
1. Reviewing PRs promptly and constructively
2. Explaining the reasoning behind requests
3. Recognizing consistent contributors with increasing trust
4. Mentoring new contributors through their first PRs
```

---

## GLOBAL TRUST FRAMEWORKS (Any OSS Project)

Trust isn't unique to any single project ecosystem. Every open source project follows the same underlying pattern — only the labels change. This section maps the universal trust dynamics that govern contributions to ANY open source project.

### The Universal Trust Ladder

Regardless of project size, language, or community norms, contributor trust follows a predictable six-rung ladder:

```
Rung 6 — Write Access / Maintainer
Rung 5 — Design Decision Consultation
Rung 4 — Code Reviewer for Others
Rung 3 — Multiple Clean PRs in Same Area
Rung 2 — One Small, Clean PR Merged
Rung 1 — Bug Reporter / Documentation Contributor
```

#### Rung 1: Bug Reporter / Documentation Contributor

**What it looks like:**
- Filing well-documented bug reports with reproduction steps
- Fixing typos in documentation
- Adding examples or clarifying confusing docs
- Participating in issue triage

**How to advance to Rung 2:**
1. Find a `good-first-issue` or `help-wanted` label
2. Read the contributing guide thoroughly
3. Submit a small, focused PR that addresses ONE thing
4. Respond to all review feedback within 48 hours
5. Never submit code you haven't tested

**Concrete behaviors across projects:**
| Project | Rung 1 Behavior | Path to Rung 2 |
|---------|-----------------|----------------|
| Large OSS Project | Report a bug with reproduction steps | Fix the bug in a 20-50 LOC PR |
| Kubernetes | File a detailed issue with logs | Submit a docs PR fixing a typo |
| Linux Kernel | Report a regression with `bisect` | Fix a checkpatch warning |
| Rust | Open an RFC discussion | Fix a documentation example |
| curl | Report a build failure on your OS | Fix a compiler warning |
| PostgreSQL | Report a query planner regression | Fix a documentation error |
| Django | Report a compatibility issue | Fix a test or docs issue |
| React | Open a bug report with minimal repro | Submit a docs clarification PR |
| Homebrew | Report a formula build failure | Fix a formula version/checksum |

#### Rung 2: One Small, Clean PR Merged

**What it looks like:**
- First contribution accepted and merged
- Reviewer spent minimal time on it (1 round or fewer)
- Code followed project patterns exactly

**How to advance to Rung 3:**
1. Pick another small issue in the SAME area as your first PR
2. Study the existing code patterns more deeply before writing
3. Include tests with your second PR
4. Respond to review comments using the project's conventions
5. Aim for zero findings on the second PR

**Concrete behaviors:**
- You know the project's PR template by heart
- You run the linter before every commit
- You understand what "done" means in this project
- Reviewer no longer asks "did you test this?"

#### Rung 3: Multiple Clean PRs in the Same Area

**What it looks like:**
- 3-5 merged PRs, all in the same subsystem or area
- Review rounds per PR consistently at 1
- You understand the subsystem's architecture
- You can predict how maintainers will react to changes

**How to advance to Rung 4:**
1. Offer to review someone ELSE'S small PR in your area
2. Be specific: "I can review the changes to the module loader — I worked on that recently"
3. When reviewing, focus on: does the code follow patterns? Are tests adequate?
4. Tag the maintainer only on things you're unsure about
5. Build a reputation for thorough, kind reviews

**Concrete behaviors:**
- You stop reading CONTRIBUTING.md — you've internalized it
- You can quote specific line numbers from the codebase
- Maintainers recognize your GitHub handle
- You start thinking "how would this scale?" not "does this compile?"

#### Rung 4: Code Reviewer for Others

**What it looks like:**
- Maintainers ask you to review PRs in your area
- Your review comments are constructive and specific
- You catch issues maintainers would have caught
- You're listed as a reviewer in the project's `CODEOWNERS` or equivalent

**How to advance to Rung 5:**
1. Start participating in design discussions (issues, RFCs, mailing lists)
2. Propose small design improvements before implementing them
3. Write ADRs (Architecture Decision Records) for changes you make
4. Attend community meetings if the project has them
5. Show you understand the trade-offs, not just the implementation

**Concrete behaviors:**
- PRs in your area get tagged with your handle automatically
- New contributors thank you for your helpful reviews
- Your review standard is: "would I want this code running in production?"

#### Rung 5: Design Decision Consultation

**What it looks like:**
- Maintainers ping you on design discussions before implementation starts
- Your opinion carries weight on architectural decisions
- You're consulted on whether a change belongs in the project at all
- You attend or lead design sessions

**How to advance to Rung 6:**
1. Take on mentorship of 1-2 new contributors
2. Write documentation for your subsystem's architecture
3. Propose a significant road map item and drive it
4. Show reliability during crunch times (release cycles, security fixes)
5. Get formal recognition (TSC membership, maintainer status, commit bit)

**Concrete behaviors:**
- You decline features because they don't fit the project's scope
- You're the person who says "we tried that in 2019, here's why it didn't work"
- Maintainers forward questions to you without reading them first
- Your GitHub avatar appears on design doc co-author lists

#### Rung 6: Write Access / Maintainer

**What it looks like:**
- You have merge rights to the repository
- You're listed in MAINTAINERS or CODEOWNERS
- You set technical direction and enforce standards
- You're accountable for the subsystem's health

**Concrete behaviors:**
- You merge other people's PRs, not just your own
- You say "no" to changes that don't meet the bar
- You spend more time reviewing than writing code
- You think about sustainability: bus factor, documentation, onboarding

### Trust Indicators Across Projects

Different projects use different signals to indicate trust levels:

| Project | Rung 1-2 Indicator | Rung 3-4 Indicator | Rung 5-6 Indicator |
|---------|-------------------|-------------------|-------------------|
| **Linux Kernel** | First patch accepted | Signed-off-by chain growing | Subsystem maintainer in MAINTAINERS file |
| **Kubernetes** | First PR merged | OWNERS file approval | SIG chair / tech lead |
| **Python** | First bug fix committed | Triager or contributor status | Core developer status (commit bit) |
| **Node.js** | First PR merged | Collaborator status | TSC membership |
| **Rust** | First PR merged | Team membership (e.g. libs team) | Core team / RFC approval authority |
| **TensorFlow/PyTorch** | First PR merged | Regular reviewer | Module maintainer |
| **Homebrew** | First formula fix | Triage access | Maintainer with commit access |
| **VSCode** | First bug fix | Extension reviewer | Core team member |
| **curl** | First patch merged | Regular contributor listed in THANKS | curl developer (commit access) |
| **Nginx** | First contribution | Regular contributor | Core team member |
| **PostgreSQL** | First bug fix committed | Committer status for specific area | Core team member |
| **Django** | First PR merged | Triager/contributor status | Fellow or core developer |
| **React** | First PR merged | Core contributor status | React core team member |
| **Apache HTTPD** | First patch accepted | Listed as contributor | PMC member / committer |
| **Blender** | First bug fix | Module owner | Blender developer |
| **Redis** | First PR merged | Regular contributor | Core maintainer |

**Key patterns across projects:**
- **Rung 1-2** is always about competence: does the code work?
- **Rung 3-4** is about consistency and judgment: can we trust your decisions?
- **Rung 5-6** is about leadership and stewardship: will you help others and safeguard the project?

### Cross-Project Trust Transferability

Trust in one OSS project does NOT automatically transfer to another. But there are transferable signals:

#### What Transfers

| Signal | Transfers? | Why |
|--------|-----------|-----|
| GitHub profile contributions | Partially | Visible on your profile, shows you contribute to open source |
| Code quality reputation | Strongly | Good code is good code regardless of project |
| Communication style | Strongly | Professional, responsive contributors are valuable everywhere |
| Referrals from maintainers | Strongly | "I worked with X on Project A, they're reliable" |
| Reviewing ability | Strongly | The skill of constructive review transfers directly |
| Domain expertise | Depends | Kernel expertise transfers between kernel-adjacent projects |
| Pattern recognition | Strongly | Knowing how OSS projects work is universal |

#### What Does NOT Transfer

| Signal | Doesn't Transfer? | Why |
|--------|------------------|-----|
| Specific tool/subsystem knowledge | No | Each project has its own codebase, patterns, and quirks |
| Maintainer relationships | No | You have to build new relationships in each community |
| Previous commit bit | No | Each project has its own trust evaluation process |
| Past contributions (same project, different area) | Partially | You're known but not trusted in the new area |

#### The Real-World Dynamic

```
Experienced OSS Contributor
  → Joins NEW project
  → Starts at Rung 1 in THAT project
  → Advances faster because of transferable skills (rung 2 in 1 PR, not 3 PRs)
  → Still has to PROVE competence in the new project's patterns
  → Maintainers recognize "this person knows how to do open source"
  → But: "do they know how to do open source in OUR project?"
```

**Key insight:** Transferable skills get you from Rung 1 to Rung 2 faster (maybe 1 PR instead of 3), but they don't skip Rung 1. Every project requires proving yourself in their specific context.

**Real-world example:** A contributor with 100 merged PRs in Kubernetes still starts at Level 0 in a new project. But their Kubernetes experience means they:
- Understand PR review cycles
- Write better commit messages
- Respond professionally to feedback
- Understand why patterns matter

These behaviors accelerate trust building but don't eliminate the need for it.

---

## BUILDING TRUST WITHOUT CODE CONTRIBUTIONS

Not everyone can or should start with code. Non-code contributions build just as much trust — sometimes more, because they show commitment to the project's health, not just your own features.

### The Hierarchy of Non-Code Trust Building

```
Highest Trust Impact:
  Review others' PRs thoroughly
  Triage issues with reproductions
  Write tests for untested code
  Fix CI/build infrastructure
  Improve documentation
  Answer questions
  Participate in community meetings
  Help with releases
Lowest Trust Impact (but still valuable):
```

### 1. Triage Issues

| Action | Trust Impact | How to Do It |
|--------|-------------|--------------|
| Reproduce reported bugs | High — saves maintainer time | Comment: "I reproduced this on v2.1.0 on Ubuntu 24.04" |
| Label issues correctly | Medium — helps organization | Learn the project's label taxonomy |
| Close duplicates | Medium — reduces noise | Link to the original issue |
| Ask for missing info | High — improves issue quality | "Can you share the full error log and your configuration?" |
| Identify critical vs cosmetic | High — helps prioritization | "This affects the auth flow, should be P1" |

**How to start:**
1. Watch the project's issue tracker for 1 hour
2. Look for issues without reproduction steps — ask for them
3. Try to reproduce issues locally
4. Comment with your findings
5. Do this for 2-3 issues per week

### 2. Improve Documentation

| Type of Doc Fix | Trust Impact |
|----------------|-------------|
| Fixing typos | Low — but it's a start |
| Clarifying ambiguous instructions | Medium — prevents future issues |
| Adding examples | High — helps new contributors |
| Writing migration guides | Very High — helps the whole ecosystem |
| Creating architecture docs | Very High — preserves project knowledge |

**Pro tip:** Look at recent issues where users were confused. Fix the documentation that caused their confusion. That's targeted, high-impact doc work.

### 3. Review Others' PRs

Anyone can review PRs, not just maintainers:

1. Read the diff
2. Check for obvious issues (typos, broken links, missing imports)
3. Test the changes locally if possible
4. Leave constructive comments
5. Tag the maintainer ONLY if you're unsure

```markdown
### Review Template for Non-Maintainers

**Checked:**
- [ ] Code compiles / builds
- [ ] Tests pass
- [ ] Follows existing patterns
- [ ] No obvious security issues

**Notes:**
- Line 42: Missing null check — is this intentional?
- Line 87: This pattern is different from the rest of the file — should it match?

**Uncertain about:**
- The architectural decision in the design — deferring to @maintainer
```

### 4. Answer Questions

Active question-answering in issues, discussions, or chat builds trust because:
- It shows you know the project
- It shows you care about helping others
- It reduces load on maintainers
- It exposes you to edge cases and use cases you hadn't considered

### 5. Write Tests for Existing Untested Code

This is one of the highest-impact non-code contributions:
- Most projects have untested code
- Tests don't change functionality, so review is straightforward
- Tests make the project more robust
- You learn the codebase deeply by writing tests

**Strategy:**
1. Run the test suite — note what's NOT covered
2. Look for files with low coverage (most projects have coverage reports)
3. Write tests for ONE function or module at a time
4. Submit small, focused test PRs

### 6. Fix CI/Build Issues

CI is the project's canary in the coal mine. Fixing CI shows:
- Technical proficiency with the build system
- Care for project infrastructure
- Willingness to do the unglamorous work

### 7. Participate in Community Meetings

If the project has public meetings (standups, SIG meetings, contributor calls):
- Attend consistently
- Listen more than you speak initially
- Take notes and share them
- Volunteer for action items

### 8. Help with Releases

Release management is painful and thankless. Helping with it:
- Tags, changelogs, version bumps, announce posts
- Shows you care about users getting the software
- Gets you working directly with maintainers
- Builds trust faster than almost any code contribution

### Non-Code Trust-Building Trajectory

```
Week 1-2:  Triage 5 issues, fix 2 documentation typos
Week 3-4:  Write tests for 2 untested modules
Week 5-6:  Review 3 small PRs from other contributors
Week 7-8:  Help with the next release (changelog + tagging)
Week 9-10: Answer 5+ questions in discussions
Week 11-12: Propose a documentation restructuring

Result: You are now trusted enough that your first code PR
        will get a warm, constructive review — not suspicion.
```

---

## TRUST REPAIR ACROSS PROJECTS

Trust damage happens. The question isn't "if" but "when." Here's a universal framework for recovery that works in ANY open source project.

### The Trust Repair Timeline

```
Day 0-1:   Incident occurs
Day 1:     Acknowledge publicly (within 24 hours)
Day 2-7:   Fix the issue with clear communication
Day 8-14:  Add systemic prevention
Day 15-90: 3-5 clean contributions to demonstrate change
Day 90:    Ask for feedback on improvement
```

### Step 1: Acknowledge Within 24 Hours

The single most important step. Silence destroys trust faster than the original mistake.

```markdown
### Acknowledgment Template

Subject: [Acknowledgment] Issue with [PR/commit/behavior]

I made a mistake with [specific thing]. Here's what happened:
- [What I did wrong]
- [Why it was wrong]
- [What impact it had]

I'm sorry for the extra work this caused. I'm fixing it now and
putting safeguards in place so it doesn't happen again.

Here's my plan:
1. [Immediate fix — within 24 hours]
2. [Root cause fix — within 1 week]
3. [Systemic prevention — checklist, automation, etc.]
```

**Rules:**
- No excuses, no explanations, no "but"
- Acknowledge the impact on OTHERS (maintainer time, blocked PRs)
- Don't defend yourself — you can explain context AFTER acknowledging
- Do it publicly (in the PR, issue, or mailing list)
- Do it within 24 hours

### Step 2: Fix the Issue with Clear Communication

| Fix Type | Communication Pattern |
|----------|----------------------|
| Code fix | "Fixed [specific issue] by [specific change]. Added a test that catches regression." |
| Documentation fix | "Updated [doc] to clarify [ambiguous section]. Added [example]." |
| Process fix | "I've updated my workflow to [specific change]. Here's the commit in my config: [link]." |
| Behavioral fix | "I've updated my personal contributing guide. I will [new behavior] going forward." |

### Step 3: Add Systemic Prevention

A mistake you learn from is forgivable. A mistake you repeat is a pattern.

**Systemic prevention techniques:**
```yaml
# Personal pre-submission checklist
pre_submission_checks:
  - "Run linter: [project command]"
  - "Run tests: [project command]"
  - "Check PR body matches diff: diff | head -50 vs PR body"
  - "Check for security issues: grep for unsafe patterns, injection vectors, eval usage"
  - "Check for dead code: verify every class/function referenced is defined"
  - "Verify no phantom references: grep all imports used in diff"

post_review_checks:
  - "Respond to every finding with [P1/P2/P3] markers"
  - "Fix all P1s and P2s before re-requesting"
  - "Re-run full test suite after fixes"
  - "Update PR body if scope changed during review"
```

### Step 4: 3-5 Consecutive Clean Contributions

This is the hardest part. After a trust setback, every subsequent contribution is scrutinized more closely.

**The post-repair contribution strategy:**
1. **Start small** — aim for trivial fixes (typos, test improvements)
2. **Be boring** — no new features, no creative solutions, just clean code
3. **Over-communicate** — explain every decision in the PR body
4. **Over-test** — include tests for edge cases the reviewer didn't ask for
5. **Be patient** — expect more review rounds than usual; don't get defensive

```python
# Metrics tracker for post-repair period
repair_metrics = {
    "PRs_merged_without_incident": 0,
    "review_rounds_current": 0,
    "target_clean_prs": 5,
    "trust_restored": False,
}

while repair_metrics["PRs_merged_without_incident"] < repair_metrics["target_clean_prs"]:
    submit_small_focused_pr()
    handle_review_professionally()
    repair_metrics["PRs_merged_without_incident"] += 1
```

### Step 5: Ask for Feedback on Improvement

After 3-5 clean PRs, ask the maintainer:

> "I wanted to check in on my contributions since the [incident]. Are you seeing the improvements I was aiming for? Is there anything else I should focus on?"

This shows:
- You care about the project's perception of you
- You're self-aware about your growth
- You value the maintainer's opinion
- You're committed to long-term health, not just getting your PRs merged

### Timeline for Full Trust Recovery

| Damage Severity | Recovery Timeline | Clean PRs Needed |
|----------------|-------------------|------------------|
| Minor (typo in PR body) | 1-2 weeks | 1-2 |
| Moderate (compiler error, missing test) | 2-4 weeks | 2-3 |
| Significant (security issue, broken build) | 1-2 months | 3-5 |
| Severe (malicious code, data loss) | 3-6 months | 10+ |
| Catastrophic (license violation, leaked credentials) | 6-12 months | 20+ or permanent ban |

---

## CASE STUDIES: TRUST BUILDING AND RECOVERY IN MAJOR PROJECTS

### Linux Kernel: Greg Kroah-Hartman's Guidelines

Greg Kroah-Hartman, one of the Linux kernel's top maintainers, has documented how to get patches accepted. Key lessons:

**The kernel's trust progression:**
1. **First patch:** Fix a checkpatch warning or a trivial bug
2. **Established contributor:** 5-10 clean patches, follow subsystem maintainer's style
3. **Recognized developer:** Patches accepted without detailed review (maintainer trusts coding style)
4. **Subsystem maintainer:** Listed in MAINTAINERS file, responsible for a subsystem

**Greg's rules for getting patches accepted:**
- Always split changes into logical, minimal patches
- Always include a clear rationale in the commit message
- Always run checkpatch.pl before submitting
- Never mix bug fixes with new features
- Respond to every review comment, even if just "acknowledged"

**Trust recovery in the kernel:**
- If a patch is rejected, fix the ISSUE not the SYMPTOM
- Resubmit improved patches promptly — don't disappear for months
- Build relationships with specific subsystem maintainers
- Attend kernel maintainer summits if possible

### Rust: The Rust Community Approach to Mentorship

Rust's community is known for being welcoming while maintaining high standards:

**Trust-building mechanisms:**
- **Rust Bridge / Rust Foundation:** Structured mentorship programs
- **RFC process:** Anyone can propose, but acceptance requires community consensus
- **Team-based governance:** Each area (libs, compiler, cargo) has its own team with its own trust standards
- **Clippy:** Automated linting removes "style argument" trust barriers

**Trust recovery patterns:**
- **Transparency:** All team discussions are public
- **Mentorship-first:** "Here's how to fix this" not just "this is wrong"
- **Multiple paths to contribution:** Docs, diagnostics, tooling, not just compiler patches

**Case study — Rust RFC acceptance:**
1. Author posts a pre-RFC for discussion
2. Community feedback shapes the proposal
3. RFC submitted for formal review
4. Team members assign reviewers from relevant areas
5. RFC either accepted (with conditions) or closed
6. If closed, author is encouraged to iterate and resubmit

### Kubernetes: From Contributor to SIG Chair

Kubernetes has one of the most structured contributor progression paths in open source:

**The Kubernetes contributor ladder:**
1. **Community member:** File issues, comment on PRs, attend meetings
2. **Contributor:** 5+ meaningful PRs merged, ICLA signed
3. **Reviewer:** demonstrated review competence in one or more areas
4. **Approver:** deep knowledge of a SIG area, OWNERS file listing
5. **SIG chair / tech lead:** Leadership of a Special Interest Group
6. **Steering committee:** Overall project governance

**Case study — contributor to SIG chair:**
- Started by fixing e2e test flakes (high-impact, low-risk)
- Joined SIG Testing meetings consistently for 3 months
- Volunteered to write test framework documentation
- Became a reviewer for test-related PRs
- Proposed and drove a test infrastructure redesign
- Was nominated as SIG Testing co-chair after 18 months

**Trust recovery in Kubernetes:**
- Retract broken PRs immediately — don't let them sit
- Use the `/retest` command pattern — acknowledge CI failures publicly
- Participate in retrospectives after incidents
- Prefer small, safe changes post-incident

### curl: Daniel Stenberg's Guide to Getting Code into curl

Daniel Stenberg, curl's founder and lead developer, has a famously direct style. His trust system:

**Trust levels in curl:**
1. **First-time contributor:** Submit a patch — maintainers WILL scrutinize
2. **Regular contributor:** 3-5 accepted patches — maintainers trust your style
3. **Trusted contributor:** 20+ patches — maintainers trust your judgment
4. **curl developer:** Commit access granted after 50+ patches and demonstrated responsibility

**Daniel's specific advice:**
- "Write good commit messages. They're not optional."
- "Test your code on at least 2 platforms before submitting"
- "Don't mix cosmetic changes with functional changes"
- "If your patch is rejected, don't argue — improve it and resubmit"
- "The smaller the patch, the more likely it is to be accepted"

```c
// Daniel's ideal commit message format:
// (from https://curl.se/dev/contribute.html)

/*
  TITLE: One line, max 70 chars, starts with capital letter
  BODY: Blank line, then detailed explanation
         - Why the change is needed
         - What the change does
         - How it was tested
         - Limitations, if any
         - Closes #bugnumber if applicable
*/
```

### PostgreSQL: Contributor to Committer

PostgreSQL has one of the oldest and most structured contributor paths in open source:

**Trust levels in PostgreSQL:**
1. **Casual contributor:** Submits occasional patches
2. **Regular contributor:** Multiple patches accepted, participates in discussions
3. **Reviewer:** Regularly reviews patches in specific areas
4. **Committer:** Has commit access for specific subsystem areas
5. **Core team member:** Overall project governance

**PostgreSQL's specific trust-building mechanisms:**
- **Commitfests:** Quarterly patch review events where contributors present work
- **CF bot:** Automated patch tracking — shows who reviewed, who committed, patch status
- **Review culture:** Every patch requires at least one reviewer before commit
- **Commit then review:** Committers can commit their own patches but they're reviewed afterward

**Key lessons from PostgreSQL:**
- Persistence matters more than brilliance — contributors who attend multiple commitfests advance faster
- Reviewing is the fastest path to commit access — reviewers become committers
- Documentation patches are highly valued — they show project understanding
- Consensus building is a trust signal — contributors who address all concerns before commit are trusted more

### Django: From User to Core Developer

Django's contributor progression is well-documented through its Fellows and core developer system:

**Trust levels in Django:**
1. **User/Bug reporter:** File bugs, ask questions
2. **Triager:** Triage issues, verify bug reports
3. **Contributor:** Submit patches that get merged
4. **Django Fellow:** Paid part-time contributor with merge rights
5. **Core developer:** Long-term contributor with full merge access

**Django's trust-building lessons:**
- **Ticket triage is the entry point** — Django's massive issue tracker needs constant triage
- **Deprecation path design** — contributors who understand Django's deprecation policy are trusted more
- **Backwards compatibility consciousness** — Django values stability above all
- **Documentation is first-class** — Django's docs are legendary; doc improvements are highly valued

### TensorFlow/PyTorch: ML Framework Contributor Paths

Large ML frameworks have unique trust dynamics due to their scale and corporate involvement:

**Trust building in ML frameworks:**
- **Start with ops/kernels** — new operations are relatively isolated and follow clear patterns
- **Write benchmarks** — performance regression testing is critical
- **Fix documentation examples** — ML examples go stale quickly
- **Contribute to model gardens** — porting/improving models shows domain expertise

**Unique challenges:**
- Corporate maintainers may have different priorities than community contributors
- GPU/testing infrastructure requirements create barriers
- Review velocity is often slower due to specialized knowledge requirements

### Trust Recovery Themes Across All Case Studies

| Theme | Linux | Rust | Kubernetes | curl | PostgreSQL | Django |
|-------|-------|------|------------|------|-----------|--------|
| Start small | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Respond to feedback | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Don't mix concerns | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Include tests | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Be patient | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Build relationships | ✅ | ✅ | ✅ | Implicitly | ✅ | ✅ |
| Document your learning | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Resubmit improved work | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Review before committing | ✅ | ✅ | ✅ | ❌ (single maintainer) | ✅ | ✅ |
| Community participation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## THE GLOBAL TRUST-BUILDING ACTION PLAN

This is a concrete 90-day plan for ANY developer starting in ANY open source project. It assumes 5-10 hours per week available for contribution.

### Days 1-7: Setup and Community Listening

**Goals:**
- Set up your development environment
- Understand the project's community norms
- Find your first contribution target

**Daily breakdown:**

| Day | Action | Deliverable |
|-----|--------|-------------|
| 1 | Clone the repo, build from source | Successful build |
| 2 | Read CONTRIBUTING.md, PR template, CODE_OF_CONDUCT | Notes on key rules |
| 3 | Read the last 10 merged PRs (especially review discussions) | Understanding of review style |
| 4 | Run the test suite, check test coverage | Known baseline |
| 5 | Browse open issues — label `good-first-issue`, `help-wanted` | 3 candidate issues saved |
| 6 | Join the community chat / mailing list / forum | Lurking membership |
| 7 | Pick your first target issue | Issue selected, assigned to self if possible |

**Checklist for Day 7:**
```markdown
- [ ] Can build the project from source
- [ ] Can run the test suite (and it passes)
- [ ] Understand the PR submission process
- [ ] Have read 10+ PR review threads
- [ ] Joined the community communication channel
- [ ] Selected a first issue to work on
- [ ] Set up the linter/pre-commit hooks
```

### Days 8-30: First Small Contribution

**Goals:**
- Submit your first PR
- Respond to all review feedback
- Get the PR merged

**Weekly breakdown:**

| Week | Action | Milestone |
|------|--------|-----------|
| 2 | Study the code around your issue — understand the patterns | Deep understanding of one module |
| 2 | Write the fix/feature — keep it under 100 LOC | Working implementation |
| 3 | Test thoroughly — add tests if not already covered | Tests passing locally |
| 3 | Self-review: run linter, check for dead code, verify PR body | Clean submission ready |
| 4 | Submit PR with excellent PR body | PR submitted |
| 4 | Respond to review within 24 hours | First review cycle |

**PR submission checklist:**
```markdown
## Pre-Submission Verification

### Code Quality
- [ ] Code compiles with zero warnings
- [ ] All existing tests pass
- [ ] New tests cover the change
- [ ] Linter passes (no new warnings)
- [ ] No debug code, commented code, or TODOs
- [ ] No phantom references (every import is used)

### PR Body
- [ ] Title follows project conventions
- [ ] Body describes WHAT changed and WHY
- [ ] Body matches diff EXACTLY (line count match)
- [ ] No exaggerations or claims not in the diff
- [ ] Checklist items are ALL honest

### Security
- [ ] No SQL injection vectors
- [ ] No shell injection via user input
- [ ] No hardcoded secrets or credentials
- [ ] No unsafe deserialization (eval, pickle, etc.)
- [ ] Input validation on all user-facing parameters

### Patterns
- [ ] Follows existing code patterns exactly
- [ ] Naming consistent with the rest of the codebase
- [ ] Error handling follows project conventions
- [ ] Logging follows project conventions
- [ ] Test structure follows project conventions
```

### Days 31-60: Build Consistency

**Goals:**
- Submit PRs #2 and #3
- Move from Rung 1 to Rung 2
- Get to 1 review round per PR

**Strategy:**
- Second PR: Another small fix in the same area as the first
- Third PR: A slightly larger change — maybe a test improvement or a minor feature
- Between PRs: Review 1-2 other contributors' small PRs

**For each PR, track:**
```
PR tracking:
- Review rounds: [1 / 2 / 3+]
- P1 findings: [count]
- Days from submission to merge: [number]
- Lessons learned: [notes]
```

**Trust milestone — end of day 60:**
```markdown
- [ ] 3 clean PRs merged
- [ ] 0 PRs closed or rejected
- [ ] 1 review round per PR on average
- [ ] Can navigate the codebase without guidance
- [ ] Maintainers use your name in review comments
- [ ] You've reviewed at least 1 other person's PR
```

### Days 61-90: Expand Scope and Start Reviewing

**Goals:**
- Expand to slightly larger changes
- Become an active reviewer for other contributors
- Start participating in design discussions
- Identify your target subsystem for long-term ownership

**Weekly breakdown:**

| Week | Action | Milestone |
|------|--------|-----------|
| 9 | Pick a larger issue — one that spans multiple files | Committed to a meaningful change |
| 9-10 | Implement with design documentation | PR with architecture notes |
| 10-11 | Review 2-3 PRs from new contributors | Build review reputation |
| 11 | Participate in 1 design discussion (issue, RFC, mailing list) | Voice in community |
| 12 | Submit PR #4 — your largest PR yet | Demonstrates growth |
| 12 | Reflect on 90-day journey — write a retrospective | Self-awareness |

**Post-90-day assessment:**
```
╔═══════════════════════════════════════════════════════╗
║            90-DAY CONTRIBUTOR ASSESSMENT              ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║ PRs Merged:          [4+]                              ║
║ Review Rounds/PR:    1 (target)                        ║
║ PRs Reviewed:        [2+]                              ║
║ Issues Triage:       [5+]                              ║
║ Design Discussions:  [1+]                              ║
║                                                       ║
║ Current Rung:        [1-2]                             ║
║ Target Subsystem:    [identified?]                     ║
║                                                       ║
║ Next 90-Day Plan:                                      ║
║ - Get to Rung 3 (multiple clean PRs in same area)     ║
║ - Regularly review PRs in your subsystem               ║
║ - Propose a small design improvement                   ║
║ - Mentor 1 new contributor through their first PR      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### Continuing Beyond 90 Days

Once the initial 90-day plan is complete, the cycle repeats with higher expectations:

| Period | Focus | Trust Level |
|--------|-------|-------------|
| Days 1-30 | First contribution | Rung 1 → Rung 2 |
| Days 31-60 | Build consistency | Rung 2 |
| Days 61-90 | Expand scope, start reviewing | Rung 2 → Rung 3 |
| Days 91-180 | Subsystem depth, regular reviews | Rung 3 → Rung 4 |
| Days 181-365 | Design decisions, mentoring | Rung 4 → Rung 5 |
| Year 2+ | Leadership, stewardship, governance | Rung 5 → Rung 6 |

### Project-Specific Considerations

While the core trust dynamics are universal, certain project types have unique considerations:

**Corporate-backed projects (Kubernetes, TensorFlow, VS Code):**
- Maintainers may be paid employees — their incentives differ from community-driven projects
- Road map is often driven by the company's needs, not the community's
- Contribution paths may be more structured (SIGs, working groups)
- Trust with corporate maintainers can build faster if you align with their priorities

**Community-governed projects (Python, Rust, PostgreSQL):**
- Trust is built through consensus and peer recognition
- Governance structures (PEPs, RFCs, CF processes) provide clear advancement paths
- Long review cycles are normal — patience is required
- Community participation (mailing lists, meetings) matters more than in corporate projects

**Single-maintainer projects (curl, many smaller projects):**
- Trust with one person is faster to build but more fragile
- The maintainer's quirks and preferences matter enormously
- Burnout risk: one overworked maintainer means slower reviews
- Stepping up to help is the fastest path to co-maintainer status

**Foundation-managed projects (Apache projects, Eclipse):**
- Formal governance processes (PMC, committer votes)
- Trust is formalized through votes, not informal delegation
- Mentorship programs are often available
- Legal and license compliance may add review layers

### The Universal Principles

Across all projects, all communities, all contribution types:

1. **Show up consistently** — showing up for 3 months beats intensity for 3 weeks
2. **Respond to feedback** — it's the single strongest trust signal
3. **Make maintainers' lives easier** — clear PRs, tested code, professional communication
4. **Be humble** — you don't know the codebase as well as you think you do
5. **Be helpful** — review others, answer questions, triage issues
6. **Be patient** — trust takes time, there are no shortcuts
7. **Be honest** — don't exaggerate PR scope, don't fake implementations
8. **Keep learning** — every PR teaches you something about the project and yourself

### Automating Trust Building

Modern tools can help accelerate trust building by eliminating human-error-prone checks:

**Pre-commit hooks (works with any project):**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
      - id: detect-private-key
```

**Self-review checklist automation:**
- Create a personal PR checklist script that runs before every submission
- Use CI linters locally before pushing (not just after)
- Set up branch protection rules on your forks to prevent mistakes
- Use commit signing to verify authenticity

**What automation should NOT replace:**
- Understanding WHY the automation catches what it catches
- The human element in review communication
- Design judgment and architectural thinking
- Community participation and relationship building

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRUST = (Consistency × Reliability × Responsiveness)│
│           / (Surprises × Defensiveness)              │
│                                                     │
│  This equation holds true for EVERY open source     │
│  project. The labels change. The game doesn't.       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

*Last updated: 2026-05-18*
*Framework: Global OSS Trust-Building Guide*
*Lessons drawn from real interactions with project maintainers across multiple open source ecosystems*
*Trust levels apply to ANY OSS contributor, in ANY project, at ANY stage*
