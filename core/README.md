# Open Source Contribution PR Knowledge Base

> Comprehensive documentation for contributing to any open-source project.
> Built from real failures, successes, and hard-earned lessons across 14+ PRs and 30+ review cycles on a major OSS project, then generalized into universal principles that apply everywhere.

---

## Welcome to the Knowledge Base

This is not a typical contribution guide. This is a living document built from real experience—every rule, every pattern, every warning comes from actual PRs that were reviewed, rejected, or merged across multiple open-source projects. We submitted PRs to a major Python OSS project (25k+ stars). We learned everything the hard way through SQL injection rejections, connection leak blockers, merge pollution disasters, and fake implementation verdicts. Then we generalized those lessons so they apply to any OSS project.

This knowledge base contains the lessons we learned, the patterns we discovered, and the strategies that led to successful contributions. Use it as your guide, your checklist, and your safety net. Whether you are contributing to a web framework, a CLI tool, a data science library, or a documentation project, the principles here will serve you.

---

## Table of Contents

1. [Quick Start Guide](#quick-start-guide)
2. [Common Failure Patterns](#common-failure-patterns)
3. [The Files Explained](#the-files-explained)
4. [Core Philosophy](#core-philosophy)
5. [Getting Started](#getting-started)
6. [Common Pitfalls](#common-pitfalls)
7. [The Contribution Workflow](#the-contribution-workflow)
8. [Common OSS Project Types](#common-oss-project-types-and-how-to-contribute)
9. [The Universal Contribution Maturity Model](#the-universal-contribution-maturity-model)
10. [Resources](#resources)

---

## Quick Start Guide

If you only have 5 minutes, read this section. It contains the absolute minimum you need to avoid immediate rejection on any OSS project.

### The Five Rules That Will Save Your PR

1. **ONE change per PR** — One tool, one fix, one feature. Never more.
2. **Discuss first** — Open an issue, wait for acknowledgment, then code. Never submit without prior discussion.
3. **Tests required** — Always add tests. No exceptions. No excuses.
4. **Copy exactly** — Follow existing patterns exactly. Do not innovate on style.
5. **Respond fast** — Within 48 hours to any review comments. Always.

### The Quick Checklist

Before pushing any PR, verify:

- [ ] Build passes (project's build command)
- [ ] Tests pass (project's test command)
- [ ] Under 10 files changed
- [ ] Under 500 lines added (adjust per project norms)
- [ ] Only relevant files changed
- [ ] Tests added for new code
- [ ] PR description complete with issue reference
- [ ] No injection vulnerabilities (SQL, XSS, command injection)
- [ ] No resource leaks (connections, file handles, memory)
- [ ] No dead code, unused imports, or duplicate code

If you cannot check all boxes, DO NOT SUBMIT.

---

## Common Failure Patterns

Every OSS contributor faces rejection at some point. The patterns below are universal — they happen on every project, to every contributor, regardless of skill level. Understanding them is the first step to avoiding them.

### The Failure Catalog

Here is a representative catalog of failures from real OSS contribution attempts, showing the range of mistakes that even motivated contributors make:

| Attempt | What We Did | Result | Pattern |
|---------|-------------|--------|---------|
| #1-2 | New features without matching existing patterns | ❌ Re-review | Pattern mismatch |
| #3 | Dead code + syntax error in submission | ❌ Re-review | Insufficient self-review |
| #4 | SQL injection via string interpolation | ❌ BLOCKER | Security vulnerability |
| #5-6 | Connection leaks + fake implementation stubs | ❌ DO NOT SUBMIT | Resource management + dishonesty |
| #7 | Unused imports + duplicated code | ❌ Re-review | Code quality |
| #8 | Platform-specific crash (missing abstraction) | ❌ HIGH | Cross-platform failure |
| #9 | Version constraint bug + naming inconsistencies | ❌ Re-review | Attention to detail |
| #10 | Data silently dropped in edge case | ❌ BLOCKER | Logic error |
| #11 | Pushed without maintainer approval | ❌ Trust damage | Process violation |
| #12 | Merge pollution (2000+ files) + description mismatch | ❌ CLOSED | Scope + communication |
| #13-14 | Dead parameters + unused constants | ❌ MEDIUM | Code quality |

**Key insight:** Every single one of these failures could have been prevented by:
- Reading the contributing guide first
- Discussing the change before coding
- Self-reviewing the diff carefully
- Running automated checks before pushing
- Keeping the change small and focused

### The Lesson

The lesson was simple but painful:

- **ONE change per PR** — Not 5, not 10. ONE.
- **Discuss FIRST** — Open an issue, get acknowledgment, THEN code
- **Small diffs** — Under 10 files, under 500 lines (adjust per project)
- **Tests mandatory** — Always include tests
- **Copy existing patterns exactly** — No innovation on style
- **Self-review every file** — Read your own diff before pushing

### The Recovery

After the rejections, we changed our approach completely. We:

1. Created this knowledge base documenting every single failure
2. Built strict self-review protocols into our workflow
3. Added automated blockage detection commands
4. Started submitting ONE change per PR
5. Verified every file against the checklist before pushing

Our subsequent PRs were different. They were small, focused, and followed the rules. The same approach will work for you.

---

## The Files Explained

This knowledge base consists of **23 files** (16 core + 7 ecosystem) in the `core/` directory, organized into three layers:

<div align="center">

**Layer 1: Contribution Workflow** (9 files — the individual contributor journey)  
**Layer 2: Ecosystem Knowledge** (7 files — cross-project, organization, and ecosystem topics)  
**Layer 3: Specialized Domains** (7 files — AI/ML, a11y, legal, i18n, community, docs, anti-duplication)

</div>

---

## Layer 1 — Contribution Workflow (Individual Focus)

### [rule.md](rule.md) — 1440+ lines

The comprehensive rulebook. 100+ specific rules covering every aspect of OSS contribution: branch hygiene, code patterns, security, testing, communication, review, and ecosystem governance. Organized into 20+ sections (A–U) with universal categories that transfer to any codebase.

**Best for:** Understanding the complete rule set before you start coding.

### [blockage.md](blockage.md) — 1670+ lines

The anti-pattern collection. 90+ blockage patterns across 11 sections — critical blockers (P1), high priority, medium, low, cross-project, language-specific, and prevention automation. Each pattern includes detection commands and fixes.

**Best for:** Checking if your approach might cause rejection.

### [guide.md](guide.md) — 1760+ lines

The step-by-step zero-blockage PR workflow. Covers the full contribution lifecycle: before you code → while coding → before push → after push → long-term success. Includes global OSS ecosystem workflow reference (CI/CD patterns, branch naming, PR templates).

**Best for:** Following a proven process from start to merge.

### [checklist.md](checklist.md) — 1110+ lines

The pre-submission verification. 6-phase checklist with 80+ items covering syntax, imports, types, security, resources, testing, diff integrity, documentation, communication, and cross-project verification. Includes language-specific extensions for Python, JS/TS, Rust, Go, Java, C/C++, Ruby, C#, Swift.

**Best for:** Final verification before pushing any PR.

### [patterns.md](patterns.md) — 1770+ lines

The multi-language code pattern reference. Covers Python, TypeScript, Rust, and Go patterns for: module registration, error handling, async code, testing, configuration, security, and project structure. Each pattern includes the "why" so you can apply the reasoning in any language.

**Best for:** Writing code that matches any project's style.

### [flop.md](flop.md) — 1330+ lines

The failure documentation. 14 real PR failures analyzed with causes and fixes. Includes the "Flop Thermodynamics" formula for predicting contribution success, a universal recovery playbook, and a cross-project prevention dashboard with root cause decision tree.

**Best for:** Learning from real mistakes without making them yourself.

### [reputation-trust.md](reputation-trust.md) — 1360+ lines

The trust-building guide. Covers the universal trust ladder (6 rungs: newcomer to core maintainer), trust indicators across major projects (Linux, Kubernetes, Python, Rust, Node.js, curl), building trust without code contributions, reputation repair strategies, and a 90-day action plan.

**Best for:** Understanding the long-term relationship game of OSS.

### [review-response.md](review-response.md) — 1000+ lines

The review communication guide. Covers every review scenario with templates: accepting changes, asking for clarification, disagreeing respectfully, handling rejection. Includes universal review etiquette, cultural differences across projects, code review abbreviations, automated bot responses, and expectations by project size.

**Best for:** Communicating professionally during code review.

### [README.md](README.md) — This file

The overview, quick start guide, and table of contents for the entire knowledge base.

**Best for:** Getting the big picture before diving into specific files.

---

## Layer 2 — Ecosystem Knowledge (Cross-Project & Organizational)

### [oss-ecosystem-governance.md](oss-ecosystem-governance.md) — 2830+ lines

Deep dive into OSS governance models (BDFL, meritocracy, corporate, foundation, elected teams), licensing (copyleft vs permissive, compatibility matrix, license change controversies), codes of conduct, decision-making frameworks (RFC, PEP, KEP), fork governance, and ecosystem metrics. Includes 7 governance templates.

**Best for:** Understanding how OSS projects are governed and how to participate.

### [ecosystem-collaboration.md](ecosystem-collaboration.md) — 3340+ lines

Cross-project collaboration patterns: foundations landscape (Apache, Linux, CNCF, Mozilla, Rust, Python, Eclipse, OpenJS), standards bodies (IETF, W3C, ISO, OASIS, OpenAPI, OWASP), shared dependency maintenance, interop testing, joint releases, conflict resolution between projects, and legal frameworks for collaboration.

**Best for:** Working across OSS projects and understanding the foundation ecosystem.

### [ecosystem-metrics.md](ecosystem-metrics.md) — 3080+ lines

OSS metrics and analytics: individual contributor KPIs, project health metrics (CHAOSS framework), bus factor calculation (with formula and code), contributor retention analytics, code quality metrics, impact measurement, tools comparison (GrimoireLab, Augur, LFX, Cauldron), and building a metrics-driven culture.

**Best for:** Measuring and improving OSS project health and contributor experience.

### [ecosystem-security-supply-chain.md](ecosystem-security-supply-chain.md) — 3190+ lines

Software supply chain security: dependency confusion attacks, malicious package case studies (event-stream, SolarWinds, Log4Shell, xz backdoor), dependency management best practices, vulnerability management (CVE, CVSS 4.0, EPSS), secure coding patterns (OWASP Top 10 across ecosystems), CI/CD security, incident response workflows, and compliance frameworks (NIST SSDF, SLSA, ISO 27001).

**Best for:** Securing OSS projects and preventing supply chain attacks.

### [ecosystem-strategy.md](ecosystem-strategy.md) — 2370+ lines

Strategic OSS: corporate open source strategies (open core, SaaS, dual license, sponsor-backed), community building from zero to scale, sustainability models beyond funding, ecosystem strategy (standards adoption, foundation placement, competitive positioning), risk management, and playbooks for launching, open-sourcing, reviving, and scaling OSS projects.

**Best for:** Organizations building or investing in OSS strategy.

### [ecosystem-sustainability.md](ecosystem-sustainability.md) — 2520+ lines

OSS sustainability: funding models (10 models compared), maintainer burnout prevention (5 strategies, famous burnout cases), contributor pipeline and succession planning, community building and retention, project lifecycle management, legal and tax considerations, and a 6-dimension sustainability scorecard. Includes 6 templates.

**Best for:** Ensuring long-term OSS project health and avoiding maintainer burnout.

### [oss-ecosystem-tooling.md](oss-ecosystem-tooling.md) — 2810+ lines

Global tooling reference: CI/CD platforms (GitHub Actions, GitLab CI, CircleCI, Jenkins, Drone, Buildkite, Azure Pipelines, SourceHut), package managers across 8+ ecosystems, code quality tools, testing frameworks, monitoring and observability, collaboration platforms, security tooling, development environments, and tool selection decision frameworks.

**Best for:** Choosing the right tools for any OSS project.

---

## Layer 3 — Specialized Domains (Advanced Topics)

### [avoid-duplicate-ecosystem.md](avoid-duplicate-ecosystem.md) — 2870+ lines

Avoiding duplication in OSS: the discovery-first mindset, how to search across all ecosystems (GitHub operators, package registries, discovery platforms), evaluating existing solutions (feature comparison, community health, license compatibility), upstream-first contribution strategy, discovery tools and automation, and preventing duplication in your own work.

**Best for:** Finding existing solutions before building new ones.

### [ecosystem-documentation.md](ecosystem-documentation.md) — 2470+ lines

OSS documentation best practices: documentation types (README, CONTRIBUTING, API docs, tutorials, ADRs, changelogs), docs-as-code toolchain (Docusaurus, MkDocs, Sphinx, Hugo), writing for OSS audiences (inclusive language, code examples, i18n), documentation maintenance (CI integration, deprecation, community contributions), and measuring documentation quality. Includes 9 templates.

**Best for:** Creating and maintaining excellent OSS documentation.

### [ecosystem-accessibility.md](ecosystem-accessibility.md) — 3140+ lines

Accessibility in OSS: WCAG 2.2 standards (POUR principles, A/AA/AAA conformance), accessibility in UI frameworks (React, Vue, Angular, Web Components), non-UI project accessibility (CLI, data viz, docs, API), inclusive communities, automated and manual testing (axe-core, Lighthouse, screen readers), and documentation accessibility. Includes 6 templates.

**Best for:** Making OSS projects accessible and inclusive.

### [ecosystem-community-culture.md](ecosystem-community-culture.md) — 2040+ lines

OSS community culture: communication norms by platform (GitHub, Discord, mailing lists, forums), community roles and responsibilities, conflict resolution (de-escalation, mediation, bans), building inclusive communities (CoC enforcement, onboarding, mentorship), community etiquette guide, and measuring community health (CHAOSS metrics, surveys).

**Best for:** Building healthy, thriving OSS communities.

### [ecosystem-localization.md](ecosystem-localization.md) — 4320+ lines

Internationalization and localization: i18n fundamentals (Unicode, ICU, CLDR plurals, RTL/bidi), l10n workflows (Crowdin, Weblate, Transifex, Lokalise), i18n by ecosystem (Python, JavaScript, Rust, Go, Java, mobile), non-code artifact localization, community-driven translation management, and testing i18n/l10n in CI/CD. Includes 7 templates.

**Best for:** Making OSS projects globally accessible across languages.

### [ecosystem-legal.md](ecosystem-legal.md) — 3680+ lines

OSS legal and compliance: copyright law in open source, patent law (OIN, LOT Network, standard-essential patents), trademark protection and disputes, licensing strategy (decision tree, compatibility matrix, AGPL implications), compliance auditing (FOSSA, SBOM, SPDX), export controls (EAR, encryption exemptions), privacy and GDPR, and contributor agreements (DCO vs CLA). Includes 10 legal templates.

**Best for:** Navigating OSS legal, licensing, and compliance questions.

### [ecosystem-ai-ml.md](ecosystem-ai-ml.md) — 3110+ lines

AI/ML in open source: framework landscape (PyTorch, TensorFlow, JAX, LangChain, Hugging Face), open models and weights (Llama, Mistral, Gemma, Falcon), open datasets and licensing, AI governance and ethics (EU AI Act, US Executive Order, bias detection, reproducibility), MLOps infrastructure (MLflow, DVC, feature stores, model serving), contributing to AI/ML OSS, and OSI's Open Source AI Definition.

**Best for:** Working with AI/ML in the OSS ecosystem.

---

## Core Philosophy

### The Fundamental Principle

> **One merge-ready PR is worth more than ten fix-up PRs.**

This single idea guides everything in this knowledge base. It means:

- Take the time to do it right the first time
- Before you code, understand the exact change needed
- Write tests before you write the implementation
- Verify everything before you push

### The Five Pillars

#### 1. Minimal Scope

Every PR should do exactly one thing. Not two. Not "a few related things." One thing.

Why? Because small PRs are:
- Easier to review
- Less likely to introduce bugs
- Easier to test
- Faster to merge
- Less likely to conflict with other work
- More likely to be accepted

#### 2. Prior Discussion

Never submit code without first discussing it. Open an issue, describe your plan, wait for acknowledgment, THEN code.

Why? Because:
- You might be solving the wrong problem
- Your approach might be wrong
- The maintainer might have already started working on it
- You might be told "we don't want this feature"
- You might waste weeks on something that gets rejected in minutes

#### 3. Exact Copying

When in doubt, copy exactly. Find similar code in the codebase and replicate it precisely. Do not improvise, do not innovate, do not "improve" the style.

Why? Because:
- You don't know why existing code is written that way
- Innovation leads to inconsistency
- Reviewers notice style differences
- The project has a specific vision and conventions
- Consistency is more valuable than cleverness in collaborative code

#### 4. Complete Testing

Every change requires tests. Not optional tests. Not "I'll add them later" tests. Tests that verify the exact behavior.

Why? Because:
- Tests prove your code works
- Tests catch regressions
- Tests document expected behavior
- Tests give confidence to reviewers
- Tests save maintainers time

#### 5. Fast Response

When reviewers comment, respond within 48 hours. Implement requested changes quickly. Keep the conversation moving.

Why? Because:
- Stale PRs get closed
- Quick response shows professionalism
- It builds trust with maintainers
- It keeps momentum going
- It reduces cognitive load for reviewers

---

## Getting Started

### Step 1: Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/project-name.git
cd project-name
git remote add upstream https://github.com/UPSTREAM_ORG/project-name.git
```

### Step 2: Understand the Codebase

Before contributing, spend time understanding the project:

1. Read CONTRIBUTING.md, GOVERNANCE.md, and CODE_OF_CONDUCT.md
2. Explore the directory structure
3. Look at existing implementations and their patterns
4. Run the application and understand its behavior
5. Find similar code to what you want to add
6. Read recent PRs to understand review expectations
7. Check the issue tracker for current priorities

### Step 3: Find Something to Work On

Options for finding work:

1. **Issues:** Look for issues tagged `good first issue` or `help wanted`
2. **Discussion:** Check if there are accepted proposals not yet implemented
3. **Bugs:** Find bugs in the existing code and fix them
4. **Improvements:** Find areas that could be improved
5. **Documentation:** Always a good starting point
6. **Test coverage:** Improving tests is low-risk and valued

### Step 4: Discuss First

Before writing any code:

1. Open an issue describing what you want to do
2. Explain your approach and why it solves the problem
3. Wait for acknowledgment from a maintainer
4. Only then start coding
5. If the issue already exists, comment that you're working on it

### Step 5: Implement

When implementing:

1. Create a branch from the main branch
2. Make ONE change
3. Add tests that cover success paths, error paths, and edge cases
4. Follow existing patterns exactly
5. Keep the diff small and focused
6. Self-review every file before staging

### Step 6: Submit

Before pushing:

1. Run syntax/type check on every file
2. Run full test suite (not just your new tests)
3. Run security scan appropriate to the project (injection, leaks, etc.)
4. Check your diff size
5. Write a clear PR description referencing the issue
6. Be ready to respond quickly to feedback

---

## Common Pitfalls

### The Bulk Addition Trap

**What it looks like:** "I'll add 10 features at once because they're related"

**Why it fails:** Reviewers see a massive diff and get overwhelmed. They cannot review multiple features simultaneously. The PR stalls or gets closed.

**The solution:** One change per PR. Even if 10 things are "related."

### The Skip Discussion Trap

**What it looks like:** "I found a bug, I'll just fix it and submit"

**Why it fails:** The maintainer might have already fixed it, might be working on it, or might not want it fixed that way. You might also be fixing a symptom rather than the root cause.

**The solution:** Open an issue, wait for acknowledgment, THEN code.

### The No Tests Trap

**What it looks like:** "The code works, I tested it manually"

**Why it fails:** Manual testing is not reproducible. Reviewers cannot verify the fix. Future changes might break it without anyone noticing.

**The solution:** Always add automated tests that can run in CI.

### The Wrong Pattern Trap

**What it looks like:** "I'll use my preferred style, it's cleaner"

**Why it fails:** Every project has a specific style. Inconsistency is a red flag to reviewers. It suggests you didn't study the codebase.

**The solution:** Copy exactly from existing code. Match the project's style, not your own.

### The Big Diff Trap

**What it looks like:** "I'll refactor a bunch of stuff while I'm in there"

**Why it fails:** Refactoring mixed with new features makes review impossible. Reviewers cannot tell what is functional change versus cosmetic change.

**The solution:** Only change what is necessary for the fix. Do separate refactoring PRs.

### The Security Vulnerability Trap

**What it looks like:** String interpolation in queries, unvalidated user input, hardcoded credentials, missing authentication checks

**Why it fails:** BLOCKER — immediate rejection. Security vulnerabilities can compromise the entire system.

**The solution:** Use parameterized queries, validate all input, follow least-privilege principle, and never hardcode secrets.

### The Resource Leak Trap

**What it looks like:** Opening connections, files, or handles without guaranteed cleanup

**Why it fails:** If an error occurs before cleanup, resources stay open forever. This exhausts connection pools, fills disk space, or crashes the system.

**The solution:** Always use `try/finally` or context managers (`with` statements) for resource management.

### The Merge Pollution Trap

**What it looks like:** Unrelated files appear in your diff, or you have commits from other branches mixed in

**Why it fails:** Reviewers cannot trust the diff. They close the PR and ask you to resubmit cleanly.

**The solution:** Always branch from the latest main. Verify your diff only contains your changes. Use `git diff main...HEAD` to check.

### The Dishonesty Trap

**What it looks like:** Submitting stubs, fake implementations, or code you haven't actually tested

**Why it fails:** Trust is the currency of open source. Once broken, it is extremely hard to rebuild.

**The solution:** Never submit code you haven't tested. If something is incomplete, mark it as WIP/draft.

### The Abandonment Trap

**What it looks like:** Submitting a PR and then disappearing for weeks

**Why it fails:** Reviewers cannot merge code if the author is unavailable to address feedback. Stale PRs get closed.

**The solution:** Stay engaged. Respond within 48 hours. If you need more time, communicate that clearly.

---

## The Contribution Workflow

### Phase 1: Discovery

1. Browse issues, discussions, and code
2. Find something you want to work on
3. Understand the current implementation and its context
4. Check if someone else is already working on it
5. Assess whether it's the right scope for your skill level

### Phase 2: Discussion

1. Open an issue with your plan
2. Describe your approach and why it solves the problem
3. Wait for acknowledgment from a maintainer
4. Ask clarifying questions if needed
5. Discuss alternative approaches if your first idea gets pushback

### Phase 3: Implementation

1. Create a branch from the latest main
2. Make the smallest possible change to address the issue
3. Add tests as you go — success path, error path, edge cases
4. Keep the diff focused on exactly what needs to change
5. Follow existing patterns exactly
6. Self-review every file before staging

### Phase 4: Verification

1. Run syntax/type check (`python -c "import py_compile; py_compile.compile('file.py', doraise=True)"` or equivalent for your language)
2. Run full test suite
3. Run security scan for project-relevant vulnerabilities
4. Check diff size (files changed, lines added/removed)
5. Self-review every file by reading your own diff
6. Verify PR description matches the actual diff

### Phase 5: Submission

1. Write a clear PR description with issue reference
2. Explain your approach and any design decisions
3. Note what testing was done
4. Mention any edge cases considered
5. Be explicit about anything reviewers should focus on

### Phase 6: Response

1. Monitor for review comments (GitHub notifications, email)
2. Respond within 48 hours
3. Implement requested changes quickly
4. If you disagree, explain your reasoning respectfully
5. Keep the PR active by commenting if there's a delay
6. Follow up if you haven't heard back in a week

### Phase 7: Post-Merge

1. Celebrate your merged PR
2. Offer to help with follow-up issues
3. Review other people's PRs
4. Update your knowledge with what you learned
5. Plan your next contribution based on feedback received

---

## Common OSS Project Types and How to Contribute

Not all open-source projects review contributions the same way. A PR that would pass in a documentation repo might be instantly rejected in a Kubernetes repository. Understanding the contribution culture of different project types is essential.

### Large Frameworks (React, Django, Kubernetes, PyTorch)

These are the most challenging projects to contribute to. They have established processes, large maintainer teams, and thousands of active PRs.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 2–12 weeks for initial review |
| CI requirements | Must pass 100% — no exceptions |
| CLA | Almost always required |
| Commit style | Conventional commits strictly enforced |
| Issue requirement | Mandatory — no PR without prior issue |
| Change scope | Extremely narrow — often single-file changes |

**What reviewers check first:**
- Does this have a linked issue with prior discussion?
- Does it break any existing test?
- Does the approach match the project's roadmap?
- Is the diff minimal (< 200 lines typically)?

**Common rejection reasons:**
- No prior discussion — the maintainers may be planning a different approach
- Too broad — trying to fix multiple things in one PR
- Missing test coverage for edge cases
- Does not follow the established pattern for similar features
- Performance regression not addressed

**How to prepare:**
1. Read the project's CONTRIBUTING.md and GOVERNANCE.md thoroughly
2. Sign the CLA before submitting anything
3. Start with `good first issue` labels — they exist for a reason
4. Expect to iterate 3–5 review rounds before merge
5. Be patient — maintainers are overloaded
6. Study the project's RFC process if one exists

### Middleware and Libraries (Express, Flask, Lodash, Requests)

These projects sit between frameworks and simple tools. Backward compatibility is the highest priority.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 1–4 weeks |
| Backward compat | Absolutely critical |
| Deprecation policy | Strict — no breaking changes without deprecation cycle |
| Testing | Must cover existing behavior + new behavior |
| API surface | Minimal additions — every new export is scrutinized |

**What reviewers check first:**
- Does this break existing code? (They will test this)
- Is the API surface increase justified?
- Are there existing alternatives in the ecosystem?
- Is the implementation consistent with the rest of the library?

**Common rejection reasons:**
- Acceptable but unnecessary — "why add this?"
- Break in edge case behavior
- New dependency added to keep the library lightweight
- Incomplete handling of error states
- API inconsistency with existing patterns

**How to prepare:**
1. Study the existing API surface — your addition must feel like it belongs
2. Write tests for backward compatibility first, then new behavior
3. Keep dependencies at zero — use only stdlib and existing dependencies
4. Document the deprecation path if changing existing behavior
5. Prepare a migration guide for the PR description
6. Check if the feature can be implemented as a plugin/extension instead

### CLI Tools (curl, git, ripgrep, gh)

CLI tool contributions focus on user experience, performance, and POSIX compatibility.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 1–3 weeks |
| UX testing | Manual testing required before submission |
| POSIX compat | Must work on Linux, macOS, BSD |
| Performance | No regressions — benchmark if applicable |
| Flags/options | Must follow POSIX conventions |

**What reviewers check first:**
- Does this change the user experience? For better or worse?
- Are there existing workarounds or alternatives users have?
- Is the behavior consistent with other CLI tools (POSIX standard)?
- Does it break existing scripts or pipelines?

**Common rejection reasons:**
- New flag that conflicts with common conventions (e.g., `-v` for something other than verbose)
- Non-standard output format that breaks script parsing
- Behavior differs across platforms
- Performance regression in common use cases
- UI change not justified by user research

**How to prepare:**
1. Test on at least two platforms (Linux + macOS minimum)
2. Check POSIX conventions for any new flags or options
3. Manual test with common use cases and edge cases
4. Verify no breaking changes to scriptable output formats
5. Prepare benchmark results if performance is relevant
6. Check exit codes and error output conventions

### Developer Tools (ESLint, Prettier, mypy, pytest)

These are configuration-heavy projects with plugin architectures. Contributions often involve adding new rules or options.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 1–6 weeks |
| Configuration | Every new option needs default + rationale |
| Plugin architecture | Must extend cleanly through plugin system |
| Documentation | Required — options need docs before merge |
| Breaking changes | Very rare — config migration path required |

**What reviewers check first:**
- Does this need to be a core feature, or can it be a plugin?
- Is the configuration surface justified (is one option enough)?
- Are the defaults sensible for most users?
- Does it integrate with the existing plugin system correctly?

**Common rejection reasons:**
- Feature should be a plugin, not core
- Too many configuration options — keep it simple
- Default behavior is surprising or inconsistent
- No documentation for the new rule or option
- Plugin API violated or insufficient for extension

**How to prepare:**
1. Start by implementing as a plugin first, then propose core integration
2. Keep the configuration surface minimal — one option if possible
3. Default must be sensible for >90% of users
4. Document everything before submission
5. Test with existing plugin ecosystem
6. Provide migration path if changing existing behavior

### Documentation Projects

Documentation contributions have the lowest barrier to entry but still require attention to detail.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | Hours to days |
| Code review | Minimal — mostly style checks |
| Style guide | Must be followed precisely |
| Screenshots | Often need to be updated if content changes |
| Broken links | Absolutely unacceptable |

**What reviewers check first:**
- Does it follow the project's style guide?
- Are there broken links or formatting errors?
- Is the information accurate?
- Does it fit with the existing documentation structure?

**Common rejection reasons:**
- Typos or grammar errors
- Does not match the documentation style guide
- Outdated screenshots without updating the description
- Link rot — new links that may break in the future
- Missing translation strings (for multi-language projects)

**How to prepare:**
1. Read the project's documentation style guide carefully
2. Use a spell checker and grammar checker before submission
3. If updating screenshots, ensure they match the current UI
4. Check all links work
5. Keep changes focused — one document per PR
6. Verify any code examples actually work

### Data Science and AI Projects (PyTorch, TensorFlow, scikit-learn, Hugging Face)

These projects have unique requirements around performance benchmarking and reproducibility.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 2–8 weeks |
| Performance | Benchmarks required for any algorithm change |
| Reproducibility | Seeded random, exact versions noted |
| Hardware tests | May require GPU/TPU testing |
| Numerical stability | Must match existing results within tolerance |

**What reviewers check first:**
- Does the change affect numerical accuracy?
- Are benchmark results provided and reproducible?
- Does it maintain backward compatibility of models/trained checkpoints?
- Is the change consistent with the project's design philosophy?

**Common rejection reasons:**
- Numerical results differ from baseline without explanation
- Benchmarks not provided or not reproducible
- Training speed regression without significant accuracy gain
- API change that breaks existing model loading
- Incomplete handling of hardware variants (CPU vs GPU vs TPU)

**How to prepare:**
1. Run complete benchmark suite and include results in the PR
2. Test on multiple hardware configurations if possible
3. Verify numerical stability with seeded random
4. Document any accuracy-speed tradeoffs
5. If adding new ops, verify gradient correctness
6. Check mixed-precision compatibility if applicable

### Infrastructure and Infrastructure-as-Code (Terraform, Ansible, Pulumi, Kubernetes Operators)

Infrastructure contributions have strict API compatibility requirements and often involve generated code.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 1–6 weeks |
| API compat | Must match upstream API exactly |
| Acceptance tests | Required — often against real services |
| Generated code | Regenerate after changes, don't edit manually |
| State management | Must handle drift, import, and destroy |

**What reviewers check first:**
- Does the resource schema match the upstream API?
- Are acceptance tests passing?
- Is the state management correct (create, read, update, delete, import)?
- Does it handle errors gracefully and return useful messages?

**Common rejection reasons:**
- Resource schema does not match the actual API
- Missing or incorrect CRUD operations
- State not properly handled during plan/apply
- Acceptance tests not included or not running
- Manual edit of generated code

**How to prepare:**
1. Study the upstream API documentation thoroughly
2. If generated code, only modify the generator, not the output
3. Write acceptance tests that run against a real service (or mock)
4. Test import, drift detection, and destroy scenarios
5. Verify error messages are clear and actionable for end users
6. Check idempotency of all operations

### Mobile Apps (Android, iOS, React Native, Flutter)

Mobile contributions have platform-specific review requirements and app store considerations.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 1–4 weeks |
| Platform guidelines | Must follow Google/Apple guidelines |
| API level | Minimum API level / deployment target |
| Performance | Memory, battery, and UI responsiveness |
| Accessibility | Required for UI changes |

**What reviewers check first:**
- Does this comply with app store guidelines?
- Does it work on the minimum supported OS version?
- Are there memory leaks or performance regressions?
- Is the UI accessible (screen reader support, contrast, touch targets)?

**Common rejection reasons:**
- Incompatible with the minimum supported OS version
- App store guideline violation (permissions, data collection, etc.)
- UI not tested on different screen sizes
- Accessibility not considered
- Memory leak in the new feature

**How to prepare:**
1. Test on the minimum supported OS version, not just the latest
2. Review app store guidelines relevant to your change
3. Test on multiple screen sizes and orientations
4. Enable accessibility testing tools (TalkBack, VoiceOver)
5. Profile memory usage before and after the change
6. Test on both light and dark mode if applicable

### Security Tools and Libraries

Security projects have the highest bar for correctness and the most rigorous review process.

| Aspect | Expectation |
|--------|-------------|
| Review timeline | 2–12 weeks |
| Security audit | May require third-party review |
| Fuzz testing | Often required for parsing code |
| Side-channel resistance | Required for crypto code |
| Dependency audit | All new dependencies scrutinized |

**What reviewers check first:**
- Does this introduce any security vulnerability?
- Are there constant-time comparisons where needed?
- Is the cryptographic implementation correct?
- Are edge cases handled securely?

**Common rejection reasons:**
- Timing side-channel in comparison code
- Insufficient input validation
- Missing bounds checking
- Insecure defaults
- Insufficient test coverage for edge cases

**How to prepare:**
1. Run fuzz testing on any parsing code
2. Use constant-time operations for comparisons
3. Follow the principle of least privilege
4. Document threat model and assumptions
5. Review OWASP guidelines for the relevant category

---

## Cross-Referencing This Knowledge Base

This knowledge base was built from real experience contributing to a major OSS project, but every principle has been generalized to apply universally. Here is how to use these files with any OSS project.

### Sections That Apply Universally

The following sections contain knowledge that transfers to any OSS project:

| Section | Universal? | Rationale |
|---------|------------|-----------|
| The Five Pillars | ✅ Yes | One change per PR, prior discussion, testing — universal principles |
| Common Pitfalls | ✅ Yes | Security vulnerabilities, resource leaks, big diffs — all projects reject these |
| Contribution Workflow | ✅ Yes | Discovery → Discussion → Implementation → Verification → Submission → Response |
| Universal Contribution Maturity Model | ✅ Yes | Contributor progression is universal across all OSS projects |
| Common Questions | ✅ Yes | General questions apply everywhere (timing may vary per project) |
| OSS Project Types | ✅ Yes | Framework, library, CLI, data science, etc. — patterns transfer to any project |
| Resources Section | ✅ Yes | Tools, communities, books, articles — all project-agnostic |

### Sections That Reference Specific Project Patterns

These files use examples from specific projects to illustrate universal principles:

| File | How to Adapt |
|------|-------------|
| [rule.md](rule.md) | Replace project-specific subsystem references with your project's equivalents |
| [blockage.md](blockage.md) | Replace detection commands with project-specific equivalents; the blockage categories are universal |
| [reputation-trust.md](reputation-trust.md) | Replace maintainer names with your project's maintainers; the trust-building strategies are universal |
| [patterns.md](patterns.md) | Replace language-specific examples with your project's language/patterns; the pattern categories are universal |
| [checklist.md](checklist.md) | Replace project-specific commands with your project's equivalents (build, test, lint) |
| [flop.md](flop.md) | The failure categories (security, scope, quality, communication) are universal; add your own failures |
| [review-response.md](review-response.md) | The communication templates are entirely universal with no modifications needed |

### How to Adapt the Checklist for Another Project

To take the checklist and adapt it for project X:

1. **Copy the structure** — the categories (syntax, tests, scope, security, communication, documentation) are universal
2. **Replace project-specific commands:**
   - Install command → project's install command (e.g., `npm install`, `cargo build`, `go build ./...`)
   - Test command → project's test command (e.g., `npm test`, `cargo test`, `go test ./...`)
   - Security patterns → project's security concerns (e.g., XSS for web projects, injection for database projects)
3. **Remove irrelevant checks:**
   - Project-specific patterns that don't apply to your project
   - Language-specific tools that don't apply
4. **Add project-specific checks:**
   - Check if the project uses linters, formatters, type checkers
   - Check if the project requires specific commit message formats
   - Check if the project has performance benchmark requirements
   - Check if the project has specific platform requirements
5. **Adjust thresholds:**
   - The guide says <10 files, <500 lines — adjust based on project norms
   - Some projects accept larger PRs with discussion; some are stricter
   - Check recent merged PRs to understand actual norms

### How to Create a Similar Knowledge Base for Another Project

The process we used to build this knowledge base:

1. **Contribute first** — you cannot write a contribution guide without experience
2. **Document every failure** — each rejection is a data point. Write down what happened and why
3. **Categorize patterns** — group rejections by type (security, scope, testing, communication, process)
4. **Infer rules** — from the patterns, derive specific actionable rules
5. **Write detection commands** — for each rule, write a command that checks compliance
6. **Build incrementally** — start with one file, expand as you contribute more
7. **Live document** — update as you learn new lessons and as the project evolves

The universal template structure we recommend:
```
oss-contribution-knowledge-base/
  README.md          — Overview, quick start, table of contents
  rule.md            — All rules with examples (project-agnostic categories)
  blockage.md        — Rejection patterns with detection commands
  guide.md           — Step-by-step workflow (project-agnostic)
  checklist.md       — Pre-submission verification
  patterns.md        — Code patterns specific to the project
  flop.md            — Real failures documented
  review-response.md — Communication templates (completely universal)
  reputation-trust.md — Building relationships with maintainers
```

---

## The Universal Contribution Maturity Model

Not all contributors are equal, and every project treats you differently depending on where you are in your contribution journey. This model applies to virtually every open-source project, from small utilities to large frameworks.

### Level 1: Drive-By Contributor

| Attribute | Description |
|-----------|-------------|
| **Definition** | Someone who submits one PR and may never return |
| **Typical contribution** | Bug fix, typo fix, or small documentation improvement |
| **Review treatment** | High scrutiny — reviewer assumes low project familiarity |
| **Success rate** | ~10–20% without preparation, ~60% with preparation |
| **Common mistakes** | No prior discussion, no tests, wrong branch, big diff |

**Expectations on you:**
- Follow contribution guidelines exactly
- Respond to all feedback quickly
- Accept that your PR may be closed without merging
- Do not expect relationship building — this is a transaction
- Be gracious even if rejected

**How to advance to Level 2:**
- Submit a clean, well-tested PR that requires minimal iteration
- Follow up after merge — offer to help with related issues
- Show interest beyond the single PR
- Leave a positive impression through professionalism

### Level 2: Occasional Contributor

| Attribute | Description |
|-----------|-------------|
| **Definition** | Someone who submits 2–5 PRs over several months |
| **Typical contribution** | Feature additions, moderate-scope improvements |
| **Review treatment** | Moderate scrutiny — reviewer knows the name |
| **Success rate** | ~60–80% |
| **Common mistakes** | Still occasionally over-scope or miss tests |

**Expectations on you:**
- Increasingly consistent quality
- Proactive communication about your PRs
- Willingness to participate in discussions beyond your own PRs
- Some understanding of project roadmap and priorities

**How to advance to Level 3:**
- Become a reliable reviewer for others' PRs
- Participate in project discussions and issue triage
- Submit consistently high-quality PRs
- Help with documentation and community support
- Show up regularly in the project's communication channels

### Level 3: Regular Contributor

| Attribute | Description |
|-----------|-------------|
| **Definition** | Someone who contributes weekly or bi-weekly |
| **Typical contribution** | Features, bug fixes, code review, documentation, community help |
| **Review treatment** | Low scrutiny — high trust |
| **Success rate** | ~90–95% |
| **Common mistakes** | Overconfidence, taking on too much at once |

**Expectations on you:**
- Consistent, reliable contributions
- Active code review participation
- Understanding of project architecture and conventions
- Ability to self-review before submitting
- Mentoring of Level 1 and 2 contributors
- Helping maintain project health

**How to advance to Level 4:**
- Develop deep expertise in one subsystem or area
- Become the go-to person for that area in discussions
- Propose and drive significant changes
- Participate in governance discussions (if applicable)
- Help maintain CI, infrastructure, and tooling
- Write design documents and RFCs

### Level 4: Subsystem Owner

| Attribute | Description |
|-----------|-------------|
| **Definition** | Someone who owns or co-owns a specific area of the project |
| **Typical contribution** | Architecture decisions, major features, code review for their area |
| **Review treatment** | Minimal — trusted implicitly for their area |
| **Success rate** | ~98%+ |
| **Common mistakes** | Burnout, gatekeeping, not delegating |

**Expectations on you:**
- Code review for your subsystem — first response within 48 hours
- Architecture decisions and roadmap input for your area
- Mentoring new contributors in your subsystem
- Writing design documents and migration guides
- Maintaining CI and test infrastructure for your area

**How to advance to Level 5:**
- Demonstrate project-wide thinking, not just subsystem focus
- Help resolve cross-subsystem conflicts and decisions
- Contribute to project governance and strategic planning
- Onboard new subsystem owners
- Build a healthy contributor pipeline
- Focus on sustainability, not just features

### Level 5: Core Maintainer

| Attribute | Description |
|-----------|-------------|
| **Definition** | Someone with commit access and project governance authority |
| **Typical contribution** | Strategic direction, release management, governance, conflict resolution |
| **Review treatment** | N/A — they are the reviewers |
| **Success rate** | N/A — they set the standards |
| **Common mistakes** | Burnout, over-centralization, losing touch with community |

**Expectations on you:**
- Project health and sustainability
- Strategic planning and roadmap
- Release management and versioning
- Community health and conflict resolution
- Governance and decision-making
- Mentoring subsystem owners
- Ensuring the project survives beyond yourself
- Building a diverse and inclusive community

**How core maintainers are selected (typical path):**
- Sustained contribution over 12+ months
- Deep project knowledge across multiple subsystems
- Consistent good judgment in technical decisions
- Positive community presence and conflict resolution skills
- Demonstrated ability to mentor and delegate
- Typically nominated by existing maintainers, voted by the team
- Proven track record of putting project interest above personal interest

### Key Insight: The Trust Ceiling

At every level, there is a **trust ceiling** — a limit to how much responsibility you will be given until you demonstrate capability at the next level. The ceiling is invisible but real:

- **L1 → L2:** Trust that you will follow through. Proved by submitting 2+ clean PRs.
- **L2 → L3:** Trust in consistent quality. Proved by submitting reliably for months.
- **L3 → L4:** Trust in architectural judgment. Proved by making good decisions in discussions.
- **L4 → L5:** Trust in people skills and sustainability. Proved by mentoring and governance.

You cannot skip levels. Each level requires time, demonstration, and relationship building. There are no shortcuts.

### The Trust Equation

Trust in OSS can be expressed as:

```
Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
```

Where:
- **Credibility** — Do you know what you're talking about? (Demonstrated through quality PRs)
- **Reliability** — Do you do what you say? (Demonstrated through follow-through)
- **Intimacy** — Do you understand the project's context? (Demonstrated through participation in discussions)
- **Self-Orientation** — Are you acting for the project's benefit or your own? (Lower is better)

Every interaction either adds to or subtracts from each of these variables. Maximize the first three, minimize the last.

---

## Common Questions

### Q: How do I find something to work on?
A: Look for issues tagged "good first issue" or "help wanted." You can also propose new features via issues. Check the project's discussion board or roadmap. Start where maintainers have explicitly asked for help.

### Q: What if my PR is rejected?
A: Don't take it personally. Ask for clarification, learn from feedback, and try again properly. Most successful contributors have multiple rejected PRs. The key is learning from each rejection.

### Q: How long does review take?
A: Varies by project size and maintainer availability. Small projects: hours to days. Large frameworks: weeks to months. Follow up respectfully after a week if no response. Check the project's typical review time in their contributing guide.

### Q: Can I submit multiple PRs at once?
A: Generally no. Submit one at a time. Wait for review before starting next. Some large projects allow concurrent PRs in different areas, but this is the exception, not the rule.

### Q: What if I disagree with feedback?
A: Ask clarifying questions respectfully. Explain your reasoning with evidence. If you still disagree after discussion, accept the decision and comply gracefully. Maintainers have final authority, and arguing damages trust.

### Q: What if my PR is ignored?
A: Wait at least one week, then leave a polite comment bumping the PR. If still ignored after two weeks, consider opening a discussion or reaching out on the project's community channel. Do not @-mention maintainers repeatedly.

### Q: How do I handle conflicting feedback?
A: If two reviewers give conflicting feedback, ask for clarification from both. If they disagree with each other, ask a core maintainer to resolve the conflict. Do not pick whichever feedback is easier to implement.

### Q: Should I squash my commits?
A: Follow the project's guidelines. Some projects want squashed commits for clean history; others prefer keeping the commit trail for review context. Check recent merged PRs to see the pattern.

### Q: What if I can't finish a PR?
A: Communicate clearly. Comment on the PR saying you're unable to continue. Offer to let someone else take over. Close the PR yourself rather than leaving it hanging. Maintainers appreciate the honesty.

---

## The Success Path

Our journey: 14 PRs with blocker findings across a major OSS project → Learned the rules → Generalized to universal principles → Clean PRs with 1 review round.

Your journey: Read the rules → Follow the process → Adapt to your specific project → Get your PRs merged.

The path is clear. The rules are documented. Success is yours to achieve.

---

## Complete File Summary

### Layer 1: Contribution Workflow (9 files)
| File | Lines | Purpose |
|------|-------|---------|
| [rule.md](rule.md) | 1,440+ | 100+ universal OSS contribution rules (20 sections A–U) |
| [blockage.md](blockage.md) | 1,670+ | 90+ blockage patterns (11 sections: P1–P3, ecosystem, language-specific) |
| [guide.md](guide.md) | 1,760+ | Zero-blockage PR workflow (5 phases + global ecosystem reference) |
| [checklist.md](checklist.md) | 1,110+ | Pre-submission verification (6 phases, 80+ items, 8 languages) |
| [patterns.md](patterns.md) | 1,770+ | Multi-language code patterns (Python, TS, Rust, Go) |
| [flop.md](flop.md) | 1,330+ | Failure documentation + flop thermodynamics formula |
| [reputation-trust.md](reputation-trust.md) | 1,360+ | Trust ladder (6 rungs) + 90-day trust-building plan |
| [review-response.md](review-response.md) | 1,000+ | Review communication templates + global etiquette guide |
| [README.md](README.md) | This file | Overview and table of contents |

### Layer 2: Ecosystem Knowledge (7 files)
| File | Lines | Purpose |
|------|-------|---------|
| [oss-ecosystem-governance.md](oss-ecosystem-governance.md) | 2,830+ | Governance models, licensing, CoC, decision frameworks, fork diplomacy |
| [ecosystem-collaboration.md](ecosystem-collaboration.md) | 3,340+ | Foundations, standards bodies, cross-project collaboration patterns |
| [ecosystem-metrics.md](ecosystem-metrics.md) | 3,080+ | CHAOSS metrics, bus factor, contributor retention, quality analytics |
| [ecosystem-security-supply-chain.md](ecosystem-security-supply-chain.md) | 3,190+ | Supply chain security, vulnerability management, secure coding, CI/CD security |
| [ecosystem-strategy.md](ecosystem-strategy.md) | 2,370+ | Corporate OSS strategy, community building, strategic playbooks |
| [ecosystem-sustainability.md](ecosystem-sustainability.md) | 2,520+ | Funding models, burnout prevention, succession planning, lifecycle |
| [oss-ecosystem-tooling.md](oss-ecosystem-tooling.md) | 2,810+ | CI/CD platforms, package managers, testing, monitoring, security tooling |

### Layer 3: Specialized Domains (7 files)
| File | Lines | Purpose |
|------|-------|---------|
| [avoid-duplicate-ecosystem.md](avoid-duplicate-ecosystem.md) | 2,870+ | Avoiding duplication, discovering existing solutions, upstream-first |
| [ecosystem-documentation.md](ecosystem-documentation.md) | 2,470+ | Docs-as-code, API docs, writing for OSS, doc maintenance |
| [ecosystem-accessibility.md](ecosystem-accessibility.md) | 3,140+ | WCAG 2.2, UI/non-UI accessibility, testing, inclusive design |
| [ecosystem-community-culture.md](ecosystem-community-culture.md) | 2,040+ | Communication norms, conflict resolution, inclusive communities, etiquette |
| [ecosystem-localization.md](ecosystem-localization.md) | 4,320+ | i18n fundamentals, l10n workflows, i18n by ecosystem, CI/CD |
| [ecosystem-legal.md](ecosystem-legal.md) | 3,680+ | Copyright, patents, trademarks, licensing, compliance, export controls, privacy |
| [ecosystem-ai-ml.md](ecosystem-ai-ml.md) | 3,110+ | AI/ML frameworks, open models, datasets, governance, MLOps |

---



## The Five Pillars Summary

### 1. Minimal Scope
- ONE change per PR
- Under 10 files changed
- Under 500 lines added (adjust per project)
- Focus on single purpose
- No refactoring mixed with features

### 2. Prior Discussion
- Open issue first
- Get acknowledgment
- Wait for approval
- Then code
- Check if someone else is already working on it

### 3. Exact Copying
- Study existing code
- Copy patterns exactly
- Match style precisely
- No innovation on conventions
- Follow established architecture

### 4. Complete Testing
- Tests for new code
- Success path coverage
- Error path coverage
- Edge cases covered
- No regressions in existing tests

### 5. Fast Response
- Within 48 hours
- Address all feedback
- Professional tone
- Keep momentum
- Communicate delays proactively

---

## The 80/20 Rule of OSS Contribution

80% of your success comes from 20% of the practices:

1. **Prior discussion** (opens the door)
2. **One change per PR** (keeps the door open)
3. **Tests for every change** (proves you belong)
4. **Fast response to feedback** (builds trust)
5. **Copy existing patterns** (avoids rejection)

Master these five, and you will outperform most contributors.

---

## Resources Section

A curated list of resources for OSS contributors at every level.

### Getting Started with OSS Contribution

| Resource | URL | Description |
|----------|-----|-------------|
| First Timers Only | https://www.firsttimersonly.com | Beginner-friendly OSS contributions |
| Up For Grabs | https://up-for-grabs.net | Projects looking for contributors |
| Good First Issues | https://goodfirstissues.com | Good first issues across projects |
| CodeTriage | https://www.codetriage.com | Issue triage for popular repos |
| Open Source Guides | https://opensource.guide | GitHub's official OSS guides |
| Contributing to OSS (GitHub) | https://github.com/github/opensource.guide | Beginner tutorial series |
| First Contributions | https://www.firstpr.me | First PR showcase and encouragement |
| Outreachy | https://www.outreachy.org | Paid remote internships in OSS |
| Google Summer of Code | https://summerofcode.withgoogle.com | Stipended OSS contributions for students |

### Essential Tooling

| Tool | Purpose | Install |
|------|---------|---------|
| pre-commit | Git hook framework for automated checks | `pip install pre-commit` / `brew install pre-commit` |
| commitlint | Enforce conventional commit format | `npm install -g @commitlint/cli @commitlint/config-conventional` |
| conventional-changelog | Generate changelogs from commits | `npm install -g conventional-changelog-cli` |
| gitlint | Lint git commit messages | `pip install gitlint` |
| shellcheck | Shell script static analysis | `apt install shellcheck` / `brew install shellcheck` |
| actionlint | GitHub Actions workflow linter | `go install github.com/rhysd/actionlint/cmd/actionlint@latest` |
| hadolint | Dockerfile linter | `brew install hadolint` / `docker pull hadolint/hadolint` |
| markdownlint | Markdown linting | `npm install -g markdownlint-cli` |
| yamllint | YAML file linting | `pip install yamllint` |
| ruff | Fast Python linter | `pip install ruff` |
| eslint | JavaScript/TypeScript linting | `npm install -g eslint` |
| clang-tidy | C/C++ linting | Part of LLVM/Clang |
| golangci-lint | Go linting | `go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest` |

### General Security Scanning Tools (Project-Agnostic)

| Tool | What It Scans | Install |
|------|---------------|---------|
| bandit | Python security issues | `pip install bandit` |
| semgrep | Multi-language SAST (supports 30+ languages) | `pip install semgrep` |
| truffleHog | Hardcoded secrets across all languages | `pip install trufflehog` |
| gitleaks | Git history secret scanning | `brew install gitleaks` |
| npm audit | JavaScript dependency vulnerabilities | Built into npm |
| cargo audit | Rust dependency vulnerabilities | `cargo install cargo-audit` |
| OSV-Scanner | Multi-language vulnerability scanner | `go install github.com/google/osv-scanner/cmd/osv-scanner@latest` |

### Communities and Forums

| Community | Focus | Join Link |
|-----------|-------|-----------|
| GitHub Community Forum | General OSS discussion | https://github.com/orgs/community/discussions |
| Open Source Initiative | OSS advocacy and education | https://opensource.org |
| CHAOSS Community | OSS health metrics | https://chaoss.community |
| Maintainerati | Maintainer support network | https://maintainerati.org |
| All In Open Source | OSS mentorship and diversity | https://allinopensource.org |
| Open Source Collective | OSS funding and governance | https://www.oscollective.org |
| Discord/Matrix of specific projects | Project-specific community | Check project README |
| /r/opensource (Reddit) | General OSS discussion | https://reddit.com/r/opensource |

### Books

| Title | Author | Why Read It |
|-------|--------|-------------|
| Working in Public | Nadia Eghbal | Understanding OSS as a socio-technical system |
| The Art of Community | Jono Bacon | Building and sustaining open-source communities |
| Producing Open Source Software | Karl Fogel | Comprehensive guide to OSS project management |
| Forge Your Future with Open Source | VM (Vicky) Brasseur | Step-by-step OSS contribution guide |
| The Cathedral and the Bazaar | Eric S. Raymond | Classic essay on OSS development models |
| The Road to GraphQL | Robin Wieruch | Example of detailed contribution documentation |

### Articles and Blog Posts

| Article | Author | Key Takeaway |
|---------|--------|--------------|
| "How to Contribute to Open Source" (freeCodeCamp) | freeCodeCamp | Beginner-friendly overview with practical steps |
| "The PR Review Checklist" (Medium) | Multiple authors | What reviewers look for in every PR |
| "Don't Push That PR" | Various | Why prior discussion matters |
| "The Snake That Ate the Elephant" | Julia Evans | Understanding large codebases |
| "Bus Factor and Open Source" | Various | Why documentation and knowledge sharing matter |
| "Scaling Open Source Communities" | Nadia Eghbal | Community growth challenges |
| "The State of Open Source Maintainers" | Tidelift | Understanding the maintainer perspective |
| "How to Write a Great PR Description" | Various | Anatomy of effective PR descriptions |
| "The Art of Code Review" | Various | How to be a good code reviewer |

### Video Resources

| Resource | Platform | Description |
|----------|----------|-------------|
| "How to Get Started with Open Source" | YouTube (GitHub) | Step-by-step contribution walkthrough |
| "Open Source 101" series | YouTube (various) | Beginner's guide series |
| "Maintainer Spotlight" | YouTube (GitHub) | Interviews with project maintainers |
| "How to Review a Pull Request" | YouTube | PR review best practices |
| "Contributing to Large Open Source Projects" | YouTube | Strategies for big codebases |
| "OSS and Burnout" | YouTube | Mental health and sustainability in OSS |

### Templates and Checklists

| Resource | Description |
|----------|-------------|
| PR template example | See [checklist.md](checklist.md) in this knowledge base |
| Issue template example | "What is the problem? What is the expected behavior?" |
| Commit message template | `type(scope): description` (conventional commits) |
| Review response template | See [review-response.md](review-response.md) in this knowledge base |
| RFC template example | Context, proposal, alternatives, implementation plan |

### OSS Health and Metrics

| Tool | What It Measures |
|------|------------------|
| GitHub Insights | Contribution activity, frequency, diversity |
| CHAOSS Metrics | Community health, diversity, sustainability |
| OpenSource.net | Project repository and community overview |
| Cauldron.io | OSS community analytics |
| Bitergia Analytics | Comprehensive OSS project metrics |
| GrimoireLab | Open-source analytics platform for OSS communities |
| CNCF DevStats | Cloud Native ecosystem project statistics |

### Additional Universal Concepts

#### The Bystander Effect in OSS

Many issues go unfixed not because they are hard, but because everyone assumes someone else will fix them. If you see an issue that interests you, comment on it. You break the bystander effect just by showing interest.

#### The Maintainer Perspective

Remember that maintainers are often unpaid volunteers maintaining projects used by millions. They have limited time, receive dozens of notifications per day, and deal with entitlement from users. Be grateful, be patient, and be helpful. A maintainer's time is worth more than yours in the context of the project's priorities.

#### The Value of Small Contributions

Documentation fixes, typo corrections, test improvements, and comment clarifications are disproportionately valuable. They are low risk for maintainers to accept, they build your familiarity with the codebase, and they establish you as someone who pays attention to detail. Do not dismiss these as "too small to matter."

---

## How to Use This Knowledge Base

### For First-Time Contributors

1. Start with this README to understand the structure
2. Read the [Quick Start Guide](#quick-start-guide) for the essentials
3. Study [rule.md](rule.md) for the complete rulebook
4. Use [guide.md](guide.md) as your step-by-step process for your first PR
5. Keep [checklist.md](checklist.md) open and use it before every submission

### For Experienced Contributors

1. Refer to [blockage.md](blockage.md) when planning a complex PR
2. Use [reputation-trust.md](reputation-trust.md) when building long-term relationships
3. Consult [review-response.md](review-response.md) when handling difficult review feedback
4. Read [flop.md](flop.md) to learn from failures you haven't made yet

### For Team Leads and Mentors

1. Use [patterns.md](patterns.md) as a teaching resource for new team members
2. Reference [checklist.md](checklist.md) as the standard for code review readiness
3. Use the [Contribution Maturity Model](#the-universal-contribution-maturity-model) to set expectations with contributors
4. Adapt the [Common OSS Project Types](#common-oss-project-types-and-how-to-contribute) for your specific project or organization

### For OSS Project Maintainers

1. Use the [Five Pillars](#the-five-pillars-summary) as the foundation of your CONTRIBUTING.md
2. Reference the [Common Failure Patterns](#common-failure-patterns) in your review guidelines
3. Share [reputation-trust.md](reputation-trust.md) with promising contributors to accelerate their growth
4. Use the [Maturity Model](#the-universal-contribution-maturity-model) to structure your contributor ladder

---

## Adapting to Your Ecosystem

### Python Ecosystem
- Build: `pip install -e .`
- Test: `pytest tests/ -q`
- Lint: `ruff check .`
- Type check: `mypy .`
- Security: `bandit -r .`

### JavaScript/TypeScript Ecosystem
- Build: `npm run build`
- Test: `npm test` / `npx jest`
- Lint: `npx eslint .`
- Format: `npx prettier --check .`
- Type check: `npx tsc --noEmit`
- Security: `npm audit`

### Rust Ecosystem
- Build: `cargo build`
- Test: `cargo test`
- Lint: `cargo clippy`
- Format: `cargo fmt --check`
- Security: `cargo audit`

### Go Ecosystem
- Build: `go build ./...`
- Test: `go test ./...`
- Lint: `golangci-lint run`
- Format: `gofmt -l .`
- Security: `go vet ./...`

### Java/Kotlin Ecosystem
- Build: `./gradlew build`
- Test: `./gradlew test`
- Lint: `./gradlew check`
- Format: `./gradlew spotlessCheck`

---

## Glossary

| Term | Definition |
|------|------------|
| **PR** | Pull Request — a proposed set of changes to a codebase |
| **BLOCKER** | A finding that prevents a PR from being merged under any circumstances |
| **LGTM** | "Looks Good To Me" — reviewer approval |
| **WIP** | "Work In Progress" — indicates a draft PR not yet ready for review |
| **RFC** | "Request For Comments" — a design proposal document |
| **CI/CD** | Continuous Integration / Continuous Deployment — automated testing pipelines |
| **SAST** | Static Application Security Testing — analyzing source code for vulnerabilities |
| **CRUD** | Create, Read, Update, Delete — standard data operations |
| **Lint** | Static analysis for code style and common errors |
| **Scope** | The range of changes included in a PR |
| **Diff** | The set of changes between two versions of code |
| **Rebase** | Reapplying commits on top of a different base branch |
| **Squash** | Combining multiple commits into one |
| **Maintainer** | A person with authority to merge PRs and make project decisions |
| **Drive-by contributor** | Someone who submits one PR and may not return |
| **Stale PR** | A PR with no activity for an extended period |
| **Trust ceiling** | The maximum responsibility level granted without demonstrated capability |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 3.0 | May 2026 | Expanded to 23 files — added 7 ecosystem knowledge files + 7 specialized domain files covering governance, collaboration, metrics, security, strategy, sustainability, tooling, documentation, accessibility, community culture, localization, legal, AI/ML, and anti-duplication |
| 2.1 | May 2026 | Added 7 ecosystem-layer files (governance, collaboration, metrics, security, strategy, sustainability, tooling) |
| 2.0 | May 2026 | Generalized from project-specific to universal OSS knowledge base |
| 1.0 | April 2026 | Initial release — project-specific contribution knowledge base |

---

*Last updated: May 2026*
*Part of: Jiggy-2026-PR/core/*
*This knowledge base is a universally generalized OSS contribution reference, derived from real experiences with major open-source projects. All project-specific references have been generalized to apply to any OSS project.*
