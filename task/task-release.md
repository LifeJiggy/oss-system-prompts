# Task-Release: Release & Versioning Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Shipping Quality Releases Across All Projects

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [Versioning Strategy](#2-versioning-strategy)
3. [Release Types](#3-release-types)
4. [Release Pipeline](#4-release-pipeline)
5. [Changelog Management](#5-changelog-management)
6. [Release Checklist](#6-release-checklist)
7. [Breaking Changes](#7-breaking-changes)
8. [Deprecation Policy](#8-deprecation-policy)
9. [Stable vs Nightly](#9-stable-vs-nightly)
10. [Hotfix Process](#10-hotfix-process)
11. [Release Communication](#11-release-communication)
12. [Post-Release Monitoring](#12-post-release-monitoring)
13. [Rollback Process](#13-rollback-process)
14. [Project-Specific Release Notes](#14-project-specific-release-notes)
15. [Automation & CI/CD](#15-automation--cicd)
16. [Release Anti-Patterns](#16-release-anti-patterns)
17. [Checklist Reference](#17-checklist-reference)
18. [Release Pipeline Automation](#18-release-pipeline-automation)
19. [Version Bumping Automation](#19-version-bumping-automation)
20. [Release Testing](#20-release-testing)
21. [Canary & Gradual Rollout](#21-canary--gradual-rollout)
22. [Emergency Release Process](#22-emergency-release-process)
23. [Release Documentation](#23-release-documentation)
24. [Project-Specific Release Strategies](#24-project-specific-release-strategies)
25. [Release Communication Templates](#25-release-communication-templates)
26. [Post-Release Monitoring Deep Dive](#26-post-release-monitoring-deep-dive)
27. [Rollback Deep Dive](#27-rollback-deep-dive)
28. [Release Governance](#28-release-governance)
29. [Release Anti-Patterns Deep Dive](#29-release-anti-patterns-deep-dive)

---

## 1. Core Philosophy

### 1.1 The Release Master's Oath

```
Release often, release safely.
Every version should be better than the last.
Every user should be able to upgrade without fear.
Communicate clearly what changed and why.
```

### 1.2 Release Principles

| Principle | Description |
|-----------|-------------|
| **Semantic Versioning** | MAJOR.MINOR.PATCH with clear rules |
| **Backward Compatibility** | MINOR releases never break APIs |
| **Changelog Transparency** | Every change documented per version |
| **Gradual Rollout** | Canary releases before full rollout |
| **Hotfix Path** | Critical fixes bypass normal release cycle |

---

## 2. Versioning Strategy

### 2.1 Semantic Versioning

```
MAJOR.MINOR.PATCH (e.g., 2.1.3)

MAJOR: Breaking changes (incompatible API changes)
MINOR: New features, backward compatible
PATCH: Bug fixes, backward compatible
```

### 2.2 Pre-release Tags

```
2.0.0-beta.1     — Beta release for testing
2.0.0-rc.1       — Release candidate
2.0.0-nightly.20260529 — Nightly build
```

### 2.3 Bumping Rules

| Change Type | Bump | Example |
|-------------|------|---------|
| Breaking API change | MAJOR | 1.0.0 → 2.0.0 |
| New feature (backward compatible) | MINOR | 1.0.0 → 1.1.0 |
| Bug fix | PATCH | 1.0.0 → 1.0.1 |
| Security fix | PATCH (urgent) | 1.0.0 → 1.0.1 |

### 2.4 Pre-release Precedence

When using pre-release tags, sorting order matters for dependency resolution:

```
1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta
1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0
```

Always publish pre-release versions with tags that sort correctly. Use `npm dist-tag` to set `latest`, `beta`, `nightly`, `rc` tags separately from the version string.

### 2.5 Version Pinning Policy

| Dependency Type | Strategy | Example |
|-----------------|----------|---------|
| Direct dependencies | Caret `^` | `^2.1.0` |
| Toolchain | Exact `=` | `=1.5.0` |
| Peer dependencies | Range `>=` | `>=2.0.0 <3.0.0` |
| Internal monorepo packages | Workspace protocol | `workspace:*` |

---

## 3. Release Types

### 3.1 Release Cadence

| Release Type | Frequency | Audience | Quality Bar |
|--------------|-----------|----------|-------------|
| **Nightly** | Daily | Developers | Builds + unit tests |
| **Beta** | Weekly | Testers | All tests pass |
| **RC** | Bi-weekly | Early adopters | Full test suite + manual QA |
| **Stable** | Monthly | All users | Everything passes + verified |
| **Hotfix** | As needed | All users | Minimal change + urgent fix |

### 3.2 When to Release

```markdown
## Stable Release Conditions

- [ ] All tests pass (unit + integration + memory + perf)
- [ ] No P0 or P1 open bugs targeting this release
- [ ] Changelog is complete for all changes
- [ ] Migration guide is ready (if breaking)
- [ ] Release candidate has been tested for 48+ hours
- [ ] All reviewers have signed off
```

### 3.3 Skipping a Release

If the release window arrives but the quality bar is not met:

1. Assess whether the gap is minor (docs, minor fixes) or major (known regressions)
2. If minor: proceed with RC, document known gaps
3. If major: skip the release slot, merge fixes into next cycle
4. Communicate the skip to stakeholders with expected next date
5. Never release late on a Friday or before a holiday

---

## 4. Release Pipeline

### 4.1 Standard Release Process

```
1. Create release branch: release/vX.Y.Z
2. Update version numbers
3. Update changelog
4. Run full test suite
5. Create release candidate tag
6. Deploy to staging/pre-release
7. Wait for testing period (48h minimum)
8. Tag stable release: vX.Y.Z
9. Publish to package registry
10. Update documentation
11. Announce release
```

### 4.2 Git Flow for Releases

```powershell
# Start release
git checkout dev
git checkout -b release/v2.1.0
# Update version, changelog, commit
git commit -m "chore: bump version to 2.1.0"

# Tag RC
git tag v2.1.0-rc.1
git push origin v2.1.0-rc.1

# After testing period:
git tag v2.1.0
git push origin v2.1.0

# Merge back to dev and main
git checkout main && git merge release/v2.1.0
git checkout dev && git merge release/v2.1.0
git branch -d release/v2.1.0
```

### 4.3 Release Branch Naming

| Branch | Pattern | Example |
|--------|---------|---------|
| Release | `release/vMAJOR.MINOR.PATCH` | `release/v2.1.0` |
| Hotfix | `hotfix/SHORT_DESCRIPTION` | `hotfix/api-key-leak` |
| Backport | `backport/vMAJOR.MINOR/BRANCH` | `backport/v2.0/fix-config-parse` |

### 4.4 Release Branch Protection

Release branches should have the following branch protection rules configured in GitHub:

- Require pull request reviews (minimum 2 for MAJOR, 1 for MINOR/PATCH)
- Require status checks (CI must pass)
- Require up-to-date branches
- Restrict push access to release managers only

---

## 5. Changelog Management

### 5.1 Changelog Format

```markdown
# Changelog

## [2.1.0] — 2026-05-29

### Added
- New feature: code search tool (#1234)
- Support for Google provider (#1235)

### Changed
- Improved streaming performance (#1236)

### Fixed
- Fixed crash on empty config (#1237)
- Fixed Windows path handling (#1238)

### Deprecated
- Legacy provider API — use new provider system (#1239)

### Security
- Fixed API key exposure in debug logs (#1240)
```

### 5.2 Changelog Categories

| Category | Purpose |
|----------|---------|
| **Added** | New features, tools, providers |
| **Changed** | Behavior changes (non-breaking) |
| **Fixed** | Bug fixes |
| **Deprecated** | Features to be removed in future |
| **Removed** | Breaking removals (note migration) |
| **Security** | Security fixes |

### 5.3 Changelog Entry Guidelines

| Type | Requirement | Example |
|------|-------------|---------|
| User-facing change | Must have entry | New tool, new provider |
| Internal refactor | Optional | Code cleanup, test additions |
| Documentation | Optional | README update, typo fix |
| Dependency update | Only if behavior changes | Breaking dep upgrade |
| CI change | Do not include | Workflow changes |

Each entry should include the PR number in parentheses for traceability. Entries should be written in present tense imperative mood ("Fix crash" not "Fixed a crash").

---

## 6. Release Checklist

### 6.1 Pre-Release

- [ ] Version bumped in package.json/manifest
- [ ] Changelog updated with all changes
- [ ] All PRs merged are documented
- [ ] Full test suite passes
- [ ] typecheck passes
- [ ] lint passes
- [ ] Build succeeds
- [ ] Release branch is up to date with dev
- [ ] No known P0/P1 bugs

### 6.2 Release

- [ ] Tag created (vX.Y.Z)
- [ ] Release notes published
- [ ] Package published to registry (npm, etc.)
- [ ] Docker images built/pushed (if applicable)
- [ ] Documentation website updated
- [ ] Homebrew/formula updated (if applicable)

### 6.3 Post-Release

- [ ] Release announcement on GitHub Discussions
- [ ] Release branch merged to main
- [ ] Release branch merged back to dev
- [ ] Monitor for regressions (24-48 hours)
- [ ] Update tracking docs

---

## 7. Breaking Changes

### 7.1 When Breaking Changes Are Allowed

- MAJOR version bump only
- With clear migration guide
- With deprecation period (minimum 1 MINOR release)
- With justification in changelog

### 7.2 Deprecation Notice Format

```typescript
/**
 * @deprecated Use newFunction instead.
 * Will be removed in v3.0.0.
 *
 * Migration:
 *   oldFunction(input) → newFunction(input, { legacy: true })
 */
export function oldFunction(input: string): string {
  log.warn("oldFunction is deprecated, use newFunction instead")
  return newFunction(input, { legacy: true })
}
```

### 7.3 Migration Guide

```markdown
## Migrating from v1.x to v2.0

### Breaking Changes

1. **Provider API changed**
   - Old: `provider.complete(prompt, callback)`
   - New: `provider.complete(prompt)` → Promise
   - Migration: `await provider.complete(prompt)`

2. **Config format updated**
   - Old: `{ "apiKey": "sk-..." }`
   - New: `{ "provider": { "apiKey": "sk-..." } }`
   - Migration: See migration script in /scripts/
```

### 7.4 Examples of Breaking Changes

| Category | Before | After | Migration |
|----------|--------|-------|-----------|
| **Function signature** | `parse(input: string, opts: Options)` | `parse(input: string, opts?: Options)` | Add `?` to optional params |
| **Return type** | Returns `string` | Returns `{value: string}` | Access `.value` property |
| **Enum removal** | `Color.Red = "red"` | Removed entirely | Use `"red"` string literal |
| **Default behavior** | Timeout = 30s | Timeout = 15s | Explicitly pass `timeout: 30000` |
| **Class → Function** | `new Parser().run(input)` | `parse(input)` | Replace constructor call |
| **Config nesting** | Flat config | Nested config under `provider` | Use migration script |
| **Async migration** | Callback-based | Promise-based | Use `async`/`await` |
| **Removed export** | `export function foo` | Only `foo` removed | Use `bar` equivalent |
| **Type narrowing** | `any` parameter | Union type | Pass correct union member |
| **Package rename** | `@org/old-name` | `@org/new-name` | Update import paths |

### 7.5 Migration Strategy Patterns

For each breaking change, provide one or more of these migration strategies:

```markdown
### Strategy A: Codemod (Automated)
Run `npx @org/codemod v2-migration` to automatically update your codebase.

### Strategy B: Migration Script
```powershell
# Run migration script
node scripts/migrate-v1-to-v2.mjs
```

### Strategy C: Manual Steps
1. Replace all `provider.complete(prompt, callback)` with `await provider.complete(prompt)`
2. Update config files to use nested provider format
3. Remove calls to `oldFunction()` and replace with `newFunction()`
```

### 7.6 Codemod Development Checklist

- [ ] Codemod handles all breaking changes in the release
- [ ] Codemod is tested against a real-world codebase
- [ ] Codemod produces idempotent output (running twice is safe)
- [ ] Codemod has a dry-run mode (`--dry`)
- [ ] Codemod is published alongside the release
- [ ] Migration guide documents the codemod first, manual steps second

### 7.7 Semantic Versioning for TypeScript APIs

When using TypeScript, type-level breaking changes also require a MAJOR bump:

```typescript
// v1.x — type is string, fine
export function greet(name: string): string

// v2.0 — type narrowed to specific literal union
export function greet(name: "Alice" | "Bob"): string
// This is breaking because callers passing arbitrary strings will fail at compile time
```

Always export type changes as semver-major. TypeScript type-checking in CI should catch these before release.

---

## 8. Deprecation Policy

### 8.1 Deprecation Timeline

```
Phase 1 (N.0): Feature marked as @deprecated with warning
Phase 2 (N+1.0): Warning becomes default behavior
Phase 3 (N+2.0): Feature removed (MAJOR bump)
```

### 8.2 Deprecation Communication

- Add `@deprecated` JSDoc tag
- Log warning when deprecated API is used
- List in CHANGELOG under "Deprecated" section
- Migration guide in documentation

### 8.3 Deprecation Warning Levels

| Level | Mechanism | When to Use |
|-------|-----------|-------------|
| **Silent** | Docs only | Experimental, low-usage features |
| **Warning** | `console.warn` at runtime | Stable features with known alternatives |
| **Error** | Throws at runtime (after grace period) | Security-sensitive features |
| **Log suppression** | `suppressDeprecationWarnings()` flag | Allow users to silence until migration |

```typescript
const deprecationWarningsShown = new Set<string>()

export function showDeprecationWarning(api: string, migration: string): void {
  if (deprecationWarningsShown.has(api)) return
  deprecationWarningsShown.add(api)

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[DEPRECATED] ${api} is deprecated. ${migration}. ` +
      "Set SUPPRESS_DEPRECATION_WARNINGS=1 to silence."
    )
  }
}
```

---

## 9. Stable vs Nightly

### 9.1 Release Channels

| Channel | Version Pattern | Stability | Audience |
|---------|----------------|-----------|----------|
| **Stable** | X.Y.Z | High | All users |
| **Beta** | X.Y.Z-beta.N | Medium | Testers |
| **Nightly** | X.Y.Z-nightly.YYYYMMDD | Low | Developers |

### 9.2 Nightly Build Process

```powershell
# Automated nightly build
# 1. Check for new commits on dev
# 2. Build from latest dev
# 3. Run full test suite
# 4. If tests pass, publish as nightly
# 5. Tag: vX.Y.Z-nightly.YYYYMMDD
```

### 9.3 Nightly to Stable Promotion Criteria

```
Criteria for promoting a nightly to beta:
  - No build failures in 7 consecutive nightlies
  - All unit tests pass for 7 consecutive nightlies
  - No new P0/P1 issues filed against nightlies
  
Criteria for promoting beta to RC:
  - Beta has been published for at least 1 week
  - Manual QA sign-off
  - Integration tests pass
  - Performance benchmarks within 5% of current stable

Criteria for promoting RC to stable:
  - RC has been tested for 48+ hours
  - No P0/P1 bugs found in RC
  - Changelog is complete
  - Migration guide reviewed
  - All reviewers have signed off
```

---

## 10. Hotfix Process

### 10.1 When to Hotfix

- Critical security vulnerability
- Production-breaking bug
- Data loss bug
- No workaround available

### 10.2 Hotfix Flow

```powershell
# From the release tag that's affected
git checkout v2.0.0
git checkout -b hotfix/critical-security-fix

# Apply minimal fix
git commit -m "fix: critical security vulnerability"
git tag v2.0.1
git push origin v2.0.1

# Merge hotfix to main and dev
git checkout main && git merge hotfix/critical-security-fix
git checkout dev && git merge hotfix/critical-security-fix
```

### 10.3 Hotfix Scenarios and Edge Cases

| Scenario | Approach | Example |
|----------|----------|---------|
| **Single commit fix** | Cherry-pick to release branch | One-liner null check |
| **Multiple affected versions** | Patch each active release stream | v1.x and v2.x both affected |
| **Regression from previous hotfix** | Revert previous hotfix, re-apply correctly | New hotfix on clean base |
| **Hotfix conflicts with dev** | Merge hotfix to main first, then resolve on dev | Manual conflict resolution |
| **Database schema change** | Include migration in hotfix | Add column in same PR |
| **Security embargo** | Coordinated release with CVE | Private fork until embargo lifts |
| **API key rotation** | Hotfix invalidates old keys + publishes new | PATCH + communication |
| **Deprecated feature removal acceleration** | Only if critical bug | Exception with maintainer override |

### 10.4 Hotfix Review Exceptions

Hotfixes follow expedited review rules:

| Aspect | Normal Release | Hotfix |
|--------|----------------|--------|
| Reviewers required | 2 | 1 (or maintainer alone in emergency) |
| Testing required | Full suite + manual QA | Focused test + CI |
| Wait period | 48h RC window | None (publish immediately) |
| Changelog | Full format | Brief entry + reference to PR |
| Announcement | Full announcement | Brief alert + link |

### 10.5 Hotfix Communication Urgency Levels

| Level | Criteria | Communication |
|-------|----------|---------------|
| **P0** | Active exploit in the wild, data at risk | Immediate: GitHub Advisory + social media + email list |
| **P1** | Critical bug affecting many users | Urgent: GitHub release + Discussion post |
| **P2** | Bug with reasonable workaround | Normal: GitHub release within 24h |
| **P3** | Minor issue, no workaround needed | Next scheduled release |

### 10.6 Coordinated Security Disclosures

For security vulnerabilities that need coordinated disclosure:

```markdown
1. Reporter discloses vulnerability via SECURITY.md
2. Maintainer acknowledges within 24 hours
3. Agree on embargo date (typically 30-90 days)
4. Develop fix on private fork
5. CVE ID assigned
6. Fix merged to dev (private branch)
7. On embargo date:
   - Push fix to public repo
   - Create hotfix release
   - Publish CVE advisory
   - Announce with security advisory template
```

---

## 11. Release Communication

### 11.1 Release Announcement Template

```markdown
# Release v2.1.0

We're excited to announce v2.1.0!

## Highlights
- New code search tool — find functions and patterns quickly
- Google provider support — use Gemini models
- Windows path handling improvements

## Changelog
[Full changelog](CHANGELOG.md)

## Upgrade
npm install -g @org/package@latest

## Thank You
Thanks to @contributor1, @contributor2 for their contributions!
```

### 11.2 Communication Channels

| Channel | Content |
|---------|---------|
| GitHub Releases | Full changelog and downloads |
| GitHub Discussions | Announcement and Q&A |
| Twitter/X | Short announcement with link |
| Discord/Slack | Brief update with link |

---

## 12. Post-Release Monitoring

### 12.1 Monitoring Window

- **Immediate (1 hour):** Check for crash reports
- **Short-term (24 hours):** Check for regressions
- **Medium-term (1 week):** Monitor issue tracker
- **Long-term (1 month):** Adoption metrics

### 12.2 What to Monitor

- Error rates in production
- Issue tracker for new bugs
- GitHub issues tagged "regression"
- Package download numbers
- User feedback

---

## 13. Rollback Process

### 13.1 When to Rollback

- Release introduces a critical bug
- Release breaks for majority of users
- Security vulnerability discovered post-release

### 13.2 Rollback Steps

```powershell
# 1. Revert to previous version
npm publish @org/package@2.0.0  # previous version

# 2. Tag current version as bad
git tag v2.1.0-bad
git push origin v2.1.0-bad

# 3. Announce rollback
# 4. Fix the issue in dev
# 5. Release fixed version (v2.1.1)
```

---

## 14. Project-Specific Release Notes

| Project | Package Manager | Registry | Key Release Concerns |
|---------|----------------|----------|---------------------|
| OpenCode | npm | npmjs.org | Effect-TS version compatibility |
| OpenClaude | npm | npmjs.org | Provider API compatibility |
| Kilo Code | npm | npmjs.org | LLM prompt changes |
| Gemini CLI | npm | Google Artifact Registry | Sandbox image versions |
| Hermes Agents | npm | npmjs.org | Tool interface stability |

---

## 15. Automation & CI/CD

### 15.1 CI Pipeline

```yaml
# Universal CI steps
steps:
  - install
  - typecheck
  - lint
  - test
  - build
  - # publish (release branch only)
```

### 15.2 Automated Release Tools

| Tool | Purpose |
|------|---------|
| Changesets | Automated changelog + version bumps |
| Release Please | Automated GitHub releases |
| Semantic Release | Fully automated versioning |
| GitHub Actions | CI/CD orchestration |

### 15.3 Complete Release Workflow Example (TypeScript/npm)

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [release/v*]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build
      - run: npm run test:integration
      - run: npm run test:perf

  publish-npm:
    needs: quality
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm run build
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  publish-docker:
    needs: quality
    runs-on: ubuntu-latest
    if: github.repository_owner == 'org' && startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/org/package:${{ github.ref_name }}
            ghcr.io/org/package:latest

  create-release:
    needs: [publish-npm, publish-docker]
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: CHANGELOG.md
          generate_release_notes: false
          make_latest: true
```

### 15.4 Nightly Build Workflow

```yaml
# .github/workflows/nightly.yml
name: Nightly Build

on:
  schedule:
    - cron: "0 6 * * *"  # 06:00 UTC daily
  workflow_dispatch:

jobs:
  nightly:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: dev
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - name: Publish nightly
        if: success()
        run: |
          DATE=$(date +%Y%m%d)
          npm version prerelease --preid="nightly.$DATE" --no-git-tag-version
          npm publish --tag nightly --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 15.5 Post-Release Monitoring Automation

```yaml
# .github/workflows/post-release-monitor.yml
name: Post-Release Monitor

on:
  release:
    types: [published]

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const release = context.payload.release
            const issue = await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Post-Release Monitoring: ${release.tag_name}`,
              body: `## Post-Release Checklist\n\n` +
                `### Immediate (1 hour)\n` +
                `- [ ] Check for crash reports\n` +
                `- [ ] Verify package publish succeeded\n` +
                `- [ ] Check Docker image build\n` +
                `\n### Short-term (24 hours)\n` +
                `- [ ] Check for regressions\n` +
                `- [ ] Monitor issue tracker\n` +
                `\n### Medium-term (1 week)\n` +
                `- [ ] Review error rates\n` +
                `- [ ] Check adoption metrics\n`,
              labels: ['post-release-monitor']
            })
```

### 15.6 Monorepo Release Automation

For monorepos using npm workspaces or pnpm, use a unified release workflow:

```powershell
# scripts/release-monorepo.ps1
param(
  [string]$Version,
  [string]$ReleaseType = "stable"  # stable, beta, rc, nightly
)

$ErrorActionPreference = "Stop"

function Update-Version {
  param([string]$Type)
  if ($Type -eq "nightly") {
    $date = Get-Date -Format "yyyyMMdd"
    npm version prerelease --preid="nightly.$date" --no-git-tag-version --ws
  } else {
    npm version $Type --no-git-tag-version --ws
  }
}

function Update-Changelog {
  node scripts/generate-changelog.mjs
}

function Publish-Packages {
  if ($ReleaseType -eq "nightly") {
    npm publish --tag nightly --access public --ws
  } elseif ($ReleaseType -in @("beta", "rc")) {
    npm publish --tag $ReleaseType --access public --ws
  } else {
    npm publish --access public --ws
  }
}

function Tag-Release {
  $version = node -p "require('./package.json').version"
  git add .
  git commit -m "chore: release v$version"
  git tag "v$version"
  git push origin "v$version"
}

Update-Version $ReleaseType
Update-Changelog
Publish-Packages
Tag-Release
```

---

## 16. Release Anti-Patterns

```
🚫 RELEASE ON FRIDAY — Bugs found over weekend unaddressed
🚫 SILENT RELEASE — No changelog, no announcement
🚫 BREAKING WITHOUT NOTICE — No deprecation period
🚫 UNTESTED RELEASE — Skipping RC/testing phase
🚫 MANUAL RELEASE — Error-prone, not repeatable
🚫 NO ROLLBACK PLAN — Stuck on bad release
```

---

## 17. Checklist Reference

### Quick Pre-Release (10 min)

- [ ] Version bumped
- [ ] Changelog updated
- [ ] Tests pass
- [ ] Build succeeds

### Full Release (30 min)

- [ ] All checks from Quick
- [ ] Release branch created
- [ ] Tag created and pushed
- [ ] Package published
- [ ] Announcement written
- [ ] Post-release monitoring started

---

## 18. Release Pipeline Automation

### 18.1 GitHub Actions Workflow Templates

Each project uses a standardized release pipeline. The template below covers the full lifecycle for npm-based packages:

```yaml
# .github/workflows/release-pipeline.yml
name: Release Pipeline

on:
  pull_request:
    types: [labeled]
  push:
    tags: [v*]

env:
  NODE_VERSION: 20

concurrency:
  group: release-${{ github.ref }}
  cancel-in-progress: true

jobs:
  detect:
    runs-on: ubuntu-latest
    outputs:
      type: ${{ steps.type.outputs.type }}
    steps:
      - uses: actions/checkout@v4
      - id: type
        run: |
          if [[ "${{ github.ref }}" == refs/tags/v* ]]; then
            echo "type=tag" >> $GITHUB_OUTPUT
          elif [[ "${{ github.event.label.name }}" == release:* ]]; then
            echo "type=manual" >> $GITHUB_OUTPUT
          else
            echo "type=none" >> $GITHUB_OUTPUT
          fi

  validate:
    needs: detect
    if: needs.detect.outputs.type != 'none'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build
      - name: Validate version consistency
        run: |
          PACKAGE_VERSION=$(node -p "require('./package.json').version")
          TAG_VERSION=$(echo "${{ github.ref_name }}" | sed 's/^v//')
          if [ "$PACKAGE_VERSION" != "$TAG_VERSION" ]; then
            echo "Package version ($PACKAGE_VERSION) does not match tag ($TAG_VERSION)"
            exit 1
          fi

  publish:
    needs: validate
    runs-on: ubuntu-latest
    permissions:
      contents: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm run build
      - name: Publish to npm
        run: |
          TAG=${{ needs.detect.outputs.type }}
          if [ "$TAG" = "tag" ]; then
            npm publish --provenance --access public
          else
            npm publish --tag beta --access public
          fi
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  docker:
    needs: validate
    if: github.ref_type == 'tag'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.ref_name }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  homebrew:
    needs: publish
    if: github.ref_type == 'tag' && startsWith(github.ref_name, 'v')
    runs-on: ubuntu-latest
    steps:
      - name: Update Homebrew formula
        uses: dawidd6/action-homebrew-bump-formula@v3
        with:
          token: ${{ secrets.HOMEBREW_TOKEN }}
          formula: package-name
          tag: ${{ github.ref_name }}
          revision: ${{ github.sha }}
```

### 18.2 npm/Packaging Automation

```yaml
# .github/workflows/publish.yml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm run build
      - name: Determine npm tag
        id: tag
        run: |
          PRERELEASE=$(node -e "const semver = require('semver'); const v = require('./package.json').version; console.log(semver.prerelease(v) ? '${GITHUB_REF/refs\/tags\/v/}' : 'latest')")
          echo "tag=$PRERELEASE" >> $GITHUB_OUTPUT
      - run: npm publish --provenance --access public --tag ${{ steps.tag.outputs.tag }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 18.3 Docker Image Build and Push

```yaml
# .github/workflows/docker-release.yml
name: Docker Release

on:
  release:
    types: [published]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to registries
        run: |
          echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          echo "${{ secrets.DOCKER_TOKEN }}" | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: |
            ghcr.io/${{ github.repository }}
            docker.io/${{ github.repository }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            type=raw,value=latest,enable=${{ !contains(github.ref, '-') }}
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 18.4 Homebrew Formula Updates

```yaml
# .github/workflows/homebrew.yml
name: Homebrew Bump

on:
  release:
    types: [published]

jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Get version
        id: version
        run: |
          VERSION=$(node -p "require('./package.json').version")
          SHA=$(node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('package.json')).digest('hex'))")
          echo "version=$VERSION" >> $GITHUB_OUTPUT
          echo "sha=$SHA" >> $GITHUB_OUTPUT
      - name: Update Homebrew formula
        uses: dawidd6/action-homebrew-bump-formula@v3
        with:
          token: ${{ secrets.HOMEBREW_TOKEN }}
          formula: package-name
          tag: v${{ steps.version.outputs.version }}
          revision: ${{ github.sha }}
```

### 18.5 Release Branch Automation Scripts

```powershell
# scripts/release-branch.ps1
param(
  [Parameter(Mandatory)]
  [string]$Version,
  [string]$Branch = "release/v$Version"
)

$ErrorActionPreference = "Stop"

function Assert-CleanWorkingTree {
  $status = git status --porcelain
  if ($status) {
    throw "Working tree is not clean. Commit or stash changes first."
  }
}

function Assert-OnDev {
  $branch = git rev-parse --abbrev-ref HEAD
  if ($branch -ne "dev") {
    throw "Must be on dev branch. Currently on $branch."
  }
}

function Create-ReleaseBranch {
  param([string]$BranchName, [string]$Version)
  
  git checkout -b $BranchName
  npm version $Version --no-git-tag-version
  node scripts/update-changelog.mjs $Version
  git add .
  git commit -m "chore: prepare release v$Version"
  git push origin $BranchName
  Write-Host "Release branch created: $BranchName"
}

function Create-RCTag {
  param([string]$Version, [int]$RcNumber = 1)
  
  $rcTag = "v$Version-rc.$RcNumber"
  git tag $rcTag
  git push origin $rcTag
  Write-Host "RC tag created: $rcTag"
}

function Finalize-Release {
  param([string]$Version)
  
  git checkout main
  git merge "release/v$Version"
  git tag "v$Version"
  git push origin main --tags
  git checkout dev
  git merge "release/v$Version"
  git push origin dev
  git branch -d "release/v$Version"
  Write-Host "Release finalized: v$Version"
}

# Main
Assert-CleanWorkingTree
Assert-OnDev
Create-ReleaseBranch -BranchName $Branch -Version $Version
Create-RCTag -Version $Version -RcNumber 1
Write-Host "Release branch $Branch created and RC tagged."
Write-Host "After testing period, run: Finalize-Release -Version '$Version'"
```

---

## 19. Version Bumping Automation

### 19.1 Changesets Configuration

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": true,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "dev",
  "updateInternalDependencies": "patch",
  "ignore": [],
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "onlyUpdatePeerDependentsWhenOutOfRange": true,
    "useCalculatedVersionForSnapshots": true
  }
}
```

### 19.2 Changeset Workflow

When a contributor creates a PR with a change that should be released, they run:

```powershell
npx changeset
```

This prompts for:
1. The type of change (major, minor, patch)
2. Which packages are affected (in monorepos)
3. A summary of the change for the changelog

The generated `.md` file is committed to the PR. On merge to `dev`, an automated PR is created to:

```powershell
npx changeset version
```

This bumps versions and updates the changelog. When that PR merges, the release is published.

### 19.3 Semantic Release Setup

```javascript
// release.config.cjs
module.exports = {
  branches: [
    'main',
    { name: 'dev', channel: 'beta', prerelease: 'beta' },
    { name: 'next', channel: 'next', prerelease: 'rc' },
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'test', release: 'patch' },
        { type: 'build', release: 'patch' },
        { type: 'ci', release: false },
        { type: 'chore', release: false },
        { breaking: true, release: 'major' },
      ],
    }],
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
      writerOptions: {
        groupBy: 'type',
        commitGroupsSort: ['feat', 'fix', 'perf', 'refactor', 'docs'],
      },
    }],
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    ['@semantic-release/npm', {
      npmPublish: true,
      tarballDir: 'dist',
    }],
    ['@semantic-release/github', {
      assets: ['dist/*.tgz'],
      successComment: false,
      failComment: false,
    }],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
  ],
}
```

### 19.4 Automated Changelog Generation

```powershell
# scripts/generate-changelog.mjs
import { readFile, writeFile } from 'node:fs/promises'
import { execSync } from 'node:child_process'

const CHANGELOG_PATH = 'CHANGELOG.md'

async function getGitLog(from, to) {
  const format = '--format={"hash":"%h","author":"%an","subject":"%s","body":"%b"}'
  const cmd = `git log ${from}..${to} ${format}`
  try {
    const output = execSync(cmd, { encoding: 'utf-8' })
    return output.trim().split('\n').filter(Boolean).map(JSON.parse)
  } catch {
    return []
  }
}

function categorizeCommit(commit) {
  const { subject } = commit
  if (/^(feat|feature)/i.test(subject)) return 'added'
  if (/^fix/i.test(subject)) return 'fixed'
  if (/^(perf|performance)/i.test(subject)) return 'changed' // perf is a "changed"
  if (/^breaking/i.test(subject) || /BREAKING CHANGE/i.test(commit.body)) return 'breaking'
  if (/^security/i.test(subject)) return 'security'
  if (/^deprecat/i.test(subject)) return 'deprecated'
  if (/^remove/i.test(subject)) return 'removed'
  if (/^(docs|refactor|style|test|build|ci|chore)/i.test(subject)) return 'internal'
  return 'changed'
}

function formatChangelog(version, date, commits) {
  const sections = {
    added: [],
    changed: [],
    fixed: [],
    deprecated: [],
    removed: [],
    security: [],
    internal: [],
  }

  for (const commit of commits) {
    const category = categorizeCommit(commit)
    if (category === 'breaking') {
      sections.added.push(`**BREAKING:** ${commit.subject}`)
    } else {
      sections[category]?.push(commit.subject)
    }
  }

  let output = `## [${version}] — ${date}\n\n`
  for (const [key, items] of Object.entries(sections)) {
    if (items.length > 0) {
      output += `### ${key.charAt(0).toUpperCase() + key.slice(1)}\n`
      for (const item of items.slice(0, 50)) {
        output += `- ${item}\n`
      }
      output += '\n'
    }
  }
  return output.trim()
}

async function main() {
  const version = process.argv[2] || 'Unreleased'
  const date = new Date().toISOString().split('T')[0]
  
  // Get last release tag
  let lastTag = ''
  try {
    lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim()
  } catch {
    lastTag = execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf-8' }).trim()
  }

  const commits = await getGitLog(lastTag, 'HEAD')
  if (commits.length === 0) {
    console.log('No new commits since last tag.')
    return
  }

  const newEntry = formatChangelog(version, date, commits)
  
  let existing = ''
  try {
    existing = await readFile(CHANGELOG_PATH, 'utf-8')
  } catch {
    existing = '# Changelog\n\n'
  }

  // Insert after the title
  const insertionPoint = existing.indexOf('\n##')
  const newContent = insertionPoint >= 0
    ? existing.slice(0, insertionPoint) + '\n' + newEntry + '\n' + existing.slice(insertionPoint)
    : existing + '\n' + newEntry + '\n'

  await writeFile(CHANGELOG_PATH, newContent)
  console.log(`Changelog updated with ${commits.length} commits`)
}

main().catch(console.error)
```

### 19.5 Version Bump Script Templates

```powershell
# scripts/bump-version.ps1
param(
  [Parameter(Mandatory)]
  [ValidateSet("major", "minor", "patch", "beta", "rc", "nightly")]
  [string]$Type,
  [string]$PreReleaseId
)

$ErrorActionPreference = "Stop"

function Get-NewVersion {
  param([string]$BumpType, [string]$PreId)
  
  $current = node -p "require('./package.json').version"
  
  switch ($BumpType) {
    "major" { return node -e "console.log(require('semver').inc('$current', 'major'))" }
    "minor" { return node -e "console.log(require('semver').inc('$current', 'minor'))" }
    "patch" { return node -e "console.log(require('semver').inc('$current', 'patch'))" }
    "beta"  { return node -e "console.log(require('semver').inc('$current', 'prerelease', 'beta'))" }
    "rc"    { return node -e "console.log(require('semver').inc('$current', 'prerelease', 'rc'))" }
    "nightly" {
      $date = Get-Date -Format "yyyyMMdd"
      return node -e "console.log(require('semver').inc('$current', 'prerelease', 'nightly.$date'))"
    }
  }
}

function Update-Files {
  param([string]$Version)
  
  # package.json
  npm version $Version --no-git-tag-version --allow-same-version
  
  # Cargo.toml (Rust projects)
  if (Test-Path "Cargo.toml") {
    $cargo = Get-Content "Cargo.toml" -Raw
    $cargo = $cargo -replace '^version = ".*"', "version = `"$Version`""
    Set-Content "Cargo.toml" $cargo
  }
  
  # pyproject.toml (Python projects)
  if (Test-Path "pyproject.toml") {
    $pyproject = Get-Content "pyproject.toml" -Raw
    $pyproject = $pyproject -replace '^version = ".*"', "version = `"$Version`""
    Set-Content "pyproject.toml" $pyproject
  }
  
  Write-Host "Version updated to $Version"
}

$newVersion = Get-NewVersion -BumpType $Type -PreId $PreReleaseId
Update-Files -Version $newVersion
```

---

## 20. Release Testing

### 20.1 Pre-Release Test Suite Requirements

Each release type requires a specific level of testing:

| Release Type | Unit Tests | Integration Tests | E2E Tests | Perf Tests | Security Scan | Manual QA |
|-------------|------------|-------------------|-----------|------------|---------------|-----------|
| Nightly | Required | Quick only | No | No | No | No |
| Beta | Required | Required | Core paths | No | No | No |
| RC | Required | Required | Required | Required | Required | Core scenarios |
| Stable | Required | Required | Required | Required | Required | Full |
| Hotfix | Required | Focused | No | No | Required | Focused |

### 20.2 Integration Test Environment

```yaml
# .github/workflows/integration-tests.yml
name: Integration Tests

on:
  pull_request:
    branches: [main, dev, release/v*]

jobs:
  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: testpass
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: --health-cmd "redis-cli ping" --health-interval 10s --health-timeout 5s --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost:5432/test
          REDIS_URL: redis://localhost:6379
      - name: Run E2E tests
        if: github.ref_type == 'tag'
        run: npm run test:e2e
```

### 20.3 Performance Regression Testing

```yaml
# .github/workflows/benchmark.yml
name: Performance Benchmarks

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Run benchmarks
        run: npm run bench
      - name: Compare with main
        uses: benchmark-action/github-action-benchmark@v1
        with:
          tool: 'benchmarkjs'
          output-file-path: benchmark-results.json
          github-token: ${{ secrets.GITHUB_TOKEN }}
          auto-push: true
          alert-threshold: '120%'
          comment-on-alert: true
```

Thresholds for blocking a release:

| Metric | Warning (flag) | Block (must fix) |
|--------|---------------|-------------------|
| Response time (p50) | +10% | +25% |
| Response time (p99) | +15% | +30% |
| Memory usage | +10% | +20% |
| Startup time | +5s | +10s |
| Bundle size | +10% | +25% |

### 20.4 Security Vulnerability Scanning Before Release

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  pull_request:
    branches: [main, release/v*]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - name: npm audit
        run: npm audit --audit-level=high
        continue-on-error: true
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
      - name: Run CodeQL
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:javascript"

  docker-scan:
    runs-on: ubuntu-latest
    if: github.ref_type == 'tag'
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t app:test .
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: app:test
          format: table
          exit-code: 1
          severity: CRITICAL,HIGH
```

Release-blocking security criteria:

- Any CRITICAL or HIGH severity vulnerability in production dependencies
- Any known CVE with CVSS >= 7.0 affecting direct dependencies
- Any secret or credential found in the release artifact
- Any SAST finding classified as HIGH or CRITICAL

### 20.5 Backward Compatibility Testing

```powershell
# scripts/test-backward-compat.ps1
param(
  [string]$CurrentVersion = (node -p "require('./package.json').version"),
  [string]$PreviousVersion
)

$ErrorActionPreference = "Stop"

if (-not $PreviousVersion) {
  # Detect previous version from git tags
  $tags = git tag --sort=-version:refname | Select-String "^v\d+\.\d+\.\d+$"
  if ($tags.Count -lt 2) {
    Write-Host "No previous versions to test against."
    return
  }
  $PreviousVersion = $tags[1] -replace "^v", ""
  Write-Host "Testing backward compatibility with v$PreviousVersion"
}

# Install previous version
npm install --prefix test/backward-compat "@org/package@$PreviousVersion"

# Run backward compatibility tests
npx vitest run test/backward-compat --reporter=verbose

if ($LASTEXITCODE -ne 0) {
  Write-Host "BACKWARD COMPATIBILITY BROKEN: Tests against v$PreviousVersion failed."
  exit 1
}

Write-Host "Backward compatibility verified against v$PreviousVersion"
```

### 20.6 Smoke Test Scripts

```powershell
# scripts/smoke-test.ps1
param(
  [string]$Package = "@org/package",
  [string]$Version = "latest",
  [string]$Registry = "https://registry.npmjs.org"
)

$ErrorActionPreference = "Stop"

Write-Host "Smoke testing $Package@$Version from $Registry"

# Create temp directory
$tempDir = Join-Path $env:TEMP "smoke-test-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
  Push-Location $tempDir
  
  # Initialize test project
  npm init -y | Out-Null
  npm install "$Package@$Version" --registry $Registry | Out-Null
  
  # Test 1: Module can be required
  $testResult = node -e @"
const pkg = require('$Package');
console.log('Module loaded successfully');
console.log('Exports:', Object.keys(pkg).join(', '));
"@
  Write-Host $testResult
  
  # Test 2: Core API functions exist
  $apiResult = node -e @"
const pkg = require('$Package');
const coreAPIs = ['complete', 'stream', 'search', 'config'];
const missing = coreAPIs.filter(api => typeof pkg[api] !== 'function');
if (missing.length > 0) {
  console.error('Missing APIs:', missing.join(', '));
  process.exit(1);
}
console.log('All core APIs present:', coreAPIs.join(', '));
"@
  Write-Host $apiResult
  
  # Test 3: CLI runs
  $cliResult = & "npx" $Package "--version" 2>&1
  Write-Host "CLI version: $cliResult"
  
  Write-Host "SMOKE TEST PASSED: $Package@$Version is functional"
}
catch {
  Write-Host "SMOKE TEST FAILED: $_"
  exit 1
}
finally {
  Pop-Location
  Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
```

---

## 21. Canary & Gradual Rollout

### 21.1 Canary Release Strategy

Canary releases allow a subset of users to receive a new version before it reaches everyone:

```yaml
# .github/workflows/canary.yml
name: Canary Release

on:
  push:
    branches: [dev]

jobs:
  canary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm run build
      - name: Publish canary
        run: |
          DATE=$(date +%Y%m%d%H%M)
          npm version prerelease --preid="canary.$DATE" --no-git-tag-version
          npm publish --tag canary --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Users opt into canary by installing with the `canary` dist-tag:

```powershell
npm install @org/package@canary
```

### 21.2 Feature Flags for Gradual Rollout

```typescript
// src/feature-flags.ts
export interface FeatureFlags {
  // The current feature flag set
  v2Search: boolean
  streamingV2: boolean
  newProviderAPI: boolean
}

const defaultFlags: FeatureFlags = {
  v2Search: false,
  streamingV2: false,
  newProviderAPI: false,
}

export function getFeatureFlags(version: string): FeatureFlags {
  // Parse version to determine rollout percentage
  const semver = version.split('.').map(Number)
  const major = semver[0]
  const minor = semver[1]

  // Gradual enablement based on version
  if (major >= 2) {
    return {
      v2Search: true,
      streamingV2: minor >= 1,
      newProviderAPI: minor >= 2,
    }
  }

  // Per-user flags (from config or environment)
  const userFlags = getUserFeatureFlags()
  return { ...defaultFlags, ...userFlags }
}

export function getUserFeatureFlags(): Partial<FeatureFlags> {
  const raw = process.env.FEATURE_FLAGS || ''
  if (!raw) return {}
  return raw.split(',').reduce((acc, flag) => {
    const [key, value] = flag.split('=')
    return { ...acc, [key.trim()]: value?.trim() === 'true' }
  }, {} as Partial<FeatureFlags>)
}
```

### 21.3 A/B Testing Infrastructure

```typescript
// src/ab-testing.ts
export interface ABTest {
  name: string
  variants: string[]
  weights: number[]  // Must sum to 100
}

const activeTests: ABTest[] = [
  {
    name: 'search-algorithm-v2',
    variants: ['control', 'v2'],
    weights: [90, 10],  // 10% of users get v2
  },
  {
    name: 'streaming-buffer-size',
    variants: ['default', 'large'],
    weights: [50, 50],
  },
]

export function getAssignment(testName: string, userId: string): string {
  const test = activeTests.find(t => t.name === testName)
  if (!test) throw new Error(`Unknown test: ${testName}`)

  // Deterministic assignment based on userId hash
  const hash = simpleHash(`${testName}:${userId}`)
  const totalWeight = test.weights.reduce((a, b) => a + b, 0)
  const bucket = hash % totalWeight

  let cumulative = 0
  for (let i = 0; i < test.variants.length; i++) {
    cumulative += test.weights[i]
    if (bucket < cumulative) return test.variants[i]
  }

  return test.variants[test.variants.length - 1]
}

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}
```

### 21.4 Rollout Percentage Progression

For MAJOR releases, use this gradual rollout schedule:

| Phase | Percentage | Duration | Monitoring |
|-------|-----------|----------|------------|
| **Canary** | 1% | 24 hours | Error rates, crash reports |
| **Early Adopters** | 5% | 48 hours | Performance, feedback |
| **Expanding** | 25% | 72 hours | Adoption, regressions |
| **Broad** | 50% | 1 week | All metrics |
| **Full** | 100% | — | Long-term monitoring |

Each phase transition is gated by:

```powershell
# scripts/rollout-check.ps1
param(
  [int]$Percentage,
  [string]$Version
)

$ErrorActionPreference = "Stop"

function Check-ErrorRate {
  # Simulated: would query monitoring dashboard API
  $errorRate = $env:ERROR_RATE  # from monitoring
  if ($errorRate -gt 0.001) {
    Write-Host "Error rate $errorRate exceeds threshold 0.001. Halting rollout."
    exit 1
  }
  Write-Host "Error rate: $errorRate — within threshold"
}

function Check-Performance {
  $p99Latency = $env:P99_LATENCY
  if ($p99Latency -gt 1000) {
    Write-Host "P99 latency $p99Latency ms exceeds threshold 1000ms. Halting rollout."
    exit 1
  }
  Write-Host "P99 latency: $p99Latency ms — within threshold"
}

function Check-UserFeedback {
  $negativeFeedback = $env:NEGATIVE_FEEDBACK_PCT
  if ($negativeFeedback -gt 5) {
    Write-Host "Negative feedback $negativeFeedback% exceeds threshold 5%. Halting rollout."
    exit 1
  }
  Write-Host "Negative feedback: $negativeFeedback% — within threshold"
}

Check-ErrorRate
Check-Performance
Check-UserFeedback

Write-Host "Rollout to $Percentage% approved for v$Version"
```

### 21.5 Monitoring During Rollout

During rollout phases, monitor these signals with automated alerts:

| Signal | Check Interval | Alert Threshold | Action |
|--------|---------------|-----------------|--------|
| HTTP 5xx rate | Every minute | > 0.5% | Pause rollout |
| P99 response time | Every 5 minutes | > 2x baseline | Pause rollout |
| Crash rate | Every minute | > 0.1% | Rollback immediately |
| New issue creation rate | Every hour | > 5x pre-release | Pause rollout |
| Download failure rate | Every 30 minutes | > 1% | Pause rollout |
| User churn signal | Daily | > 10% increase | Consider rollback |

```yaml
# .github/workflows/rollout-monitor.yml
name: Rollout Monitor

on:
  schedule:
    - cron: "*/5 * * * *"  # Every 5 minutes

jobs:
  check-health:
    runs-on: ubuntu-latest
    steps:
      - name: Check error rates
        run: |
          # Query monitoring API
          RESPONSE=$(curl -s "https://monitoring.internal/api/errors?window=5m")
          ERROR_RATE=$(echo $RESPONSE | jq -r '.error_rate')
          if (( $(echo "$ERROR_RATE > 0.005" | bc -l) )); then
            echo "ERROR: 5xx rate $ERROR_RATE exceeds threshold"
            # Trigger alert
            exit 1
          fi
          echo "OK: Error rate $ERROR_RATE within threshold"
```

---

## 22. Emergency Release Process

### 22.1 Hotfix Escalation Flow

```
                    ┌─────────────────┐
                    │ Issue Reported  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Triage: P0/P1?  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │ P0 (Critical) │              │ P1-P3 (Normal)
              ▼               │              ▼
     ┌────────────────┐       │     ┌────────────────┐
     │ Immediate fix   │       │     │ Normal process │
     │ Private fork    │       │     └────────────────┘
     │ Expedited review│       │
     └────────┬───────┘       │
              │               │ P0 or P1 with security impact
              ▼               ▼
     ┌───────────────────────────┐
     │ Security Advisory Check   │
     │ Embargo required?         │
     └───────────────────────────┘
```

### 22.2 Security Embargo Coordination

```markdown
## Security Embargo Process

### Embargo Agreement
- Reporter and maintainer agree on an embargo date
- Embargo period: typically 30-90 days
- Fix is developed on a **private fork**
- CVE ID is reserved via MITRE or GitHub Advisory

### Private Fork Workflow
1. Create private fork of the repository
2. Develop fix on private branch
3. Review and test within the private fork
4. On embargo date:
   - Push fix to public repo
   - Create GitHub Security Advisory
   - Publish advisory
   - Release hotfix

### Communication Blackout
- NO public discussion of the vulnerability
- NO commits referencing the CVE before embargo date
- NO mention in changelog until embargo lifts
- Limited to maintainer + reporter + CVE team
```

### 22.3 Expedited Review Process

| Step | Normal Review | Expedited Review |
|------|---------------|------------------|
| Reviewers required | 2 | 1 |
| Review window | 24-48 hours | 1-4 hours |
| Test suite | Full | Focused + security tests |
| CI run | Full matrix | Latest Node.js only |
| Merge window | Release day | Immediately after review |
| Changelog | Full entry | Brief entry, expand later |

Expedited review checklist:

- [ ] Change is minimal (preferably single commit)
- [ ] Change is focused on the vulnerability/bug only
- [ ] No unrelated refactoring or cleanup
- [ ] Security tests added (if applicable)
- [ ] Reviewed by at least one maintainer
- [ ] CI passes for the target environment

### 22.4 Emergency Communication Template

```markdown
# URGENT: Security Advisory / Critical Hotfix

**Severity:** [CRITICAL | HIGH]

**Affected Versions:** [v2.0.0 to v2.0.5]

**Description:**
[Brief description of the vulnerability or bug]

**Impact:**
[What an attacker can do / what breaks]

**Action Required:**
Upgrade to [v2.0.6] immediately.

```
npm install -g @org/package@latest
```

**Workaround:**
[Workaround if upgrading is not possible]

**CVE:** [CVE-2026-XXXX] (if applicable)

**Timeline:**
- Reported: [Date]
- Fixed: [Date]
- Released: [Date]

**Credit:**
[@reporter] (if applicable, per contributor guidelines)
```

### 22.5 Post-Mortem Process

```markdown
## Post-Mortem Template

### Incident Summary
- **Date:** YYYY-MM-DD
- **Severity:** P0 / P1
- **Duration:** X hours
- **Affected Users:** [count or percentage]
- **Root Cause:** [one-line summary]

### Timeline
- [Time] — Issue detected
- [Time] — Triage completed
- [Time] — Fix deployed
- [Time] — All clear

### Root Cause Analysis
- **What happened:** [detailed description]
- **Why it happened:** [underlying cause]
- **Why it wasn't caught:** [testing gap]

### Action Items
| Item | Owner | Due Date |
|------|-------|----------|
| Add test for this scenario | @person | YYYY-MM-DD |
| Improve monitoring | @person | YYYY-MM-DD |
| Update release checklist | @person | YYYY-MM-DD |

### Lessons Learned
- What went well:
- What went wrong:
- What to improve:
```

---

## 23. Release Documentation

### 23.1 Release Notes Writing Guide

```markdown
# Release Notes Writing Guide

## Structure
1. **Title:** `Release vX.Y.Z` with date
2. **Highlights:** Top 3-5 most important changes (bullet points)
3. **Changelog:** Link to full CHANGELOG.md
4. **Breaking Changes:** If any, listed with migration guidance
5. **Upgrade Instructions:** Clear commands
6. **Credits:** Thank contributors

## Tone
- Enthusiastic but professional
- Focus on user benefits, not implementation details
- Use present tense: "Fixes crash" not "Fixed a crash"
- Keep paragraphs short (3-5 sentences max)

## Length
- **PATCH:** 3-5 paragraphs
- **MINOR:** 5-10 paragraphs (with feature deep-dives)
- **MAJOR:** Full blog-post style (with migration guide)
- **HOTFIX:** 2-3 paragraphs (urgent tone)

## Examples
Good: "This release adds a new code search tool that lets you find functions and patterns across your entire codebase in milliseconds."
Bad: "This release adds a new code search tool. It uses a trie index. It searches files recursively. It returns results."
```

### 23.2 CHANGELOG Best Practices

| Practice | Description |
|----------|-------------|
| **Keep a CHANGELOG** | Always maintain a human-readable changelog |
| **Unreleased section** | Track changes under `[Unreleased]` heading |
| **Reverse chronological** | Newest versions first |
| **Include PR numbers** | `(#1234)` for traceability |
| **Link to diffs** | `[2.1.0]: https://github.com/org/repo/compare/v2.0.0...v2.1.0` |
| **Write for humans** | Not just a list of commits — explain the impact |
| **Separate categories** | Use Added/Changed/Fixed/Deprecated/Removed/Security |
| **Mention contributors** | Credit external contributors |
| **Security entries** | Always include CVE ID if applicable |
| **Backport entries** | Note if a fix was backported |

```markdown
# Changelog format with links
[Unreleased]: https://github.com/org/repo/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/org/repo/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/org/repo/compare/v1.5.0...v2.0.0
```

### 23.3 Migration Guide Templates

```markdown
# Migration Guide: v1.x → v2.0

## Quick Start
```bash
# Install codemod
npx @org/codemod@latest

# Run migration (dry-run first)
npx @org/codemod v2-migration --dry
npx @org/codemod v2-migration
```

## Breaking Changes

### 1. Provider API
**Old:** `provider.complete(prompt, callback)`
**New:** `provider.complete(prompt): Promise<string>`

**Migration:**
```typescript
// Before
provider.complete("hello", (err, result) => {
  console.log(result)
})

// After
const result = await provider.complete("hello")
console.log(result)
```

### 2. Config Format
See [Configuration Reference](./docs/configuration.md).
```

### 23.4 API Changelog Format

For projects exposing a public API, maintain an API-specific changelog:

```markdown
# API Changelog

## v2.1.0 — 2026-05-29

### Added
- `GET /api/v2/search?q=`: New search endpoint
- `provider.listModels()`: List available models

### Changed
- `POST /api/v1/complete`: Added `stream` parameter (backward compatible)
- Rate limit increased from 100 to 500 req/min

### Deprecated
- `POST /api/v1/complete` (v1): Use `POST /api/v2/complete` instead
- `provider.complete()` callback overload: Use promise overload

### Removed
- `GET /api/v0/health`: Removed in v2.0 (deprecated since v1.5)
```

### 23.5 Deprecation Notice Format

```markdown
---
deprecated: true
deprecated_in: v2.0.0
removal_in: v3.0.0
replacement: newFeature
---

# legacyFeature

> **Deprecated:** Use `newFeature` instead.
> This feature will be removed in v3.0.0.

## Migration
Replace calls to `legacyFeature()` with `newFeature()`:

```typescript
// Before
const result = legacyFeature(input)

// After
const result = newFeature(input, { mode: 'legacy' })
```

## Rationale
`legacyFeature` had performance issues with large inputs. `newFeature` uses a streaming approach that handles large datasets more efficiently.
```

---

## 24. Project-Specific Release Strategies

### 24.1 OpenCode

| Concern | Strategy |
|---------|----------|
| **Effect-TS version pinning** | Pin Effect-TS to exact version. Test against the pinned version before every release. |
| **Skill compatibility** | Maintain a skills compatibility matrix per release. Skills declare `minOpencodeVersion` in their manifest. |
| **Plugin API stability** | Plugin API is semver-major. Breaking changes go through a full deprecation cycle. |
| **Configuration schema** | Config schema changes are MINOR (backward compatible additions) or MAJOR (breaking changes). |

```json
{
  "name": "my-skill",
  "opencode": {
    "minVersion": "2.1.0",
    "maxVersion": "3.0.0"
  }
}
```

### 24.2 OpenClaude

| Concern | Strategy |
|---------|----------|
| **Provider API version mapping** | Map each release to the supported provider API versions. Maintain a compatibility table. |
| **Model availability** | Model list is fetched at runtime, not baked into releases. Release notes highlight new/removed models. |
| **Anthropic SDK updates** | Pin Anthropic SDK version. Review changes before bumping. Test all provider paths. |

```typescript
// src/provider-compat.ts
export const PROVIDER_COMPAT: Record<string, string> = {
  "opensb": ">=1.2.0 <2.0.0",
  "anthropic": ">=0.20.0 <1.0.0",
  "google": ">=0.15.0",
}
```

### 24.3 Kilo Code

| Concern | Strategy |
|---------|----------|
| **Prompt version locking** | Every prompt template is versioned. Breaking prompt changes are MAJOR. |
| **Generation format stability** | Output format changes are MINOR (additions) or MAJOR (structural changes). |
| **Context window changes** | Document context window limits per release. Test with maximum context sizes. |

```typescript
// src/prompts/version.ts
export const PROMPT_VERSION = "2.1.0"

export const PROMPTS: Record<string, { version: string, template: string }> = {
  "code-review": {
    version: "2.1.0",
    template: `You are a code reviewer...`,
  },
  "generate-code": {
    version: "2.0.0",
    template: `Generate code for...`,
  },
}
```

### 24.4 Gemini CLI

| Concern | Strategy |
|---------|----------|
| **Sandbox image versioning** | Tag sandbox images with release version. Maintain backward compatibility for 2 releases. |
| **Docker compatibility** | Pin Docker Compose version. Document minimum Docker Engine version. |
| **API endpoint stability** | Use versioned API paths (`/v1/`, `/v2/`). Deprecate old versions with 2-release notice. |

```yaml
# docker-compose.yml
services:
  sandbox:
    image: ghcr.io/org/gemini-sandbox:${VERSION:-latest}
    environment:
      - GEMINI_API_VERSION=v2
```

### 24.5 Hermes Agents

| Concern | Strategy |
|---------|----------|
| **Tool interface versioning** | Tools implement `Tool` interface that evolves with MAJOR releases. Provide adapter for older tools. |
| **Agent protocol version** | Agent-to-agent communication uses versioned protocol. Handshake includes version negotiation. |
| **Plugin lifecycle** | Plugins declare supported agent versions. Compatibility checks at plugin load time. |

```typescript
// src/tool-interface.ts
export interface Tool {
  name: string
  version: string
  execute(input: ToolInput): Promise<ToolOutput>
}

// Tool compatibility check
export function isToolCompatible(tool: Tool): boolean {
  const [major] = tool.version.split('.').map(Number)
  const [currentMajor] = CURRENT_INTERFACE_VERSION.split('.').map(Number)
  return major === currentMajor  // Major version must match
}
```

---

## 25. Release Communication Templates

### 25.1 Major Release Announcement Template

```markdown
# Announcing v2.0.0 — [Release Name/Codename]

We're thrilled to announce the release of v2.0.0 — our biggest release yet!

## What's New

### [Feature 1 Title]
[2-3 paragraphs describing the feature, why it matters, and how users benefit.]

### [Feature 2 Title]
[2-3 paragraphs describing the feature.]

### [Feature 3 Title]
[2-3 paragraphs describing the feature.]

## Breaking Changes
This release includes breaking changes. Please see the [Migration Guide](./MIGRATION.md) for detailed upgrade instructions.

### Key Breaking Changes
1. **Provider API** — Now promise-based instead of callback-based
2. **Config Format** — Restructured for better organization
3. **Removed Legacy Features** — Deprecated features from v1.x are removed

## Migration Guide
```bash
# Run automatic migration
npx @org/codemod v2-migration

# Or follow the manual guide
```
See the full [Migration Guide](./MIGRATION.md).

## Changelog
[Full changelog](./CHANGELOG.md)

## Thank You
This release includes contributions from [@contributor1](), [@contributor2]().
We're grateful for the community's continued support.

## Getting Started
```bash
npm install -g @org/package@latest
```
```

### 25.2 Minor Release Announcement Template

```markdown
# Release v2.1.0

We're happy to announce v2.1.0!

## Highlights
- **New Feature 1** — Brief description
- **New Feature 2** — Brief description
- **Improvements** — Brief description

For details, see the [full changelog](./CHANGELOG.md).

## Upgrade
```bash
npm install -g @org/package@latest
```

## Contributors
Thanks to [@contributor1](), [@contributor2]() for their contributions!
```

### 25.3 Patch Release Announcement Template

```markdown
# Patch Release v2.0.1

A patch release is available that fixes:

- **Fixed:** Description of fix (#1234)
- **Fixed:** Description of fix (#1235)

## Upgrade
```bash
npm install -g @org/package@latest
```

No breaking changes. No migration needed.
```

### 25.4 Security Advisory Template

```markdown
# Security Advisory: [CVE-2026-XXXX]

**Package:** @org/package
**Severity:** [CRITICAL / HIGH / MODERATE]
**CVE:** CVE-2026-XXXX
**CVSS:** [Score]

## Description
[A clear description of the vulnerability]

## Affected Versions
- v1.0.0 to v1.5.3
- v2.0.0 to v2.0.1

## Patched Versions
- v1.5.4
- v2.0.2

## Impact
[What an attacker can achieve]

## Workaround
[If upgrading is not immediately possible]

## Timeline
- **Reported:** YYYY-MM-DD
- **Patched:** YYYY-MM-DD
- **Advisory Published:** YYYY-MM-DD

## Credit
This vulnerability was reported by [@reporter].
```

### 25.5 Deprecation Notice Template

```markdown
# Deprecation Notice: [Feature Name]

**Feature:** [Feature Name]
**Deprecated in:** vX.Y.Z
**Removal in:** vX+2.0.0 (approximately [date])

## What is Changing?
[A brief description of what is being deprecated and why]

## Why?
[Rationale for the deprecation]

## Migration Path
[How to migrate to the replacement]

## Timeline
- **vX.Y.Z** — Feature is marked as deprecated (warnings shown)
- **vX+1.0.0** — Warnings become more prominent
- **vX+2.0.0** — Feature is removed (MAJOR release)

## Questions?
[Link to discussion or issue tracker]
```

---

## 26. Post-Release Monitoring Deep Dive

### 26.1 Metrics to Track

| Category | Metric | Source | Alert Threshold |
|----------|--------|--------|-----------------|
| **Adoption** | npm downloads (daily) | npm API | 50% drop from pre-release |
| **Adoption** | Docker pulls | GHCR API | 50% drop from pre-release |
| **Adoption** | Homebrew installs | Homebrew API | 50% drop from pre-release |
| **Errors** | Crash rate | Sentry/Error tracking | > 0.1% of sessions |
| **Errors** | Unhandled rejections | Node.js process | Any occurrence |
| **Errors** | New GitHub issues | GitHub API | > 3x pre-release rate |
| **Rollbacks** | Users reverting to previous version | npm stats | > 5% revert rate |
| **Performance** | Startup time | Benchmark CI | > 20% increase |
| **Performance** | Memory usage | Benchmark CI | > 20% increase |

### 26.2 Automated Alerting Setup

```yaml
# .github/workflows/release-health.yml
name: Release Health Check

on:
  schedule:
    - cron: "0 */6 * * *"  # Every 6 hours

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Check npm download trends
        run: |
          LATEST=$(npm view @org/package version)
          DOWNLOADS=$(npm view @org/package download-count)
          echo "Latest version: $LATEST"
          echo "Downloads (30d): $DOWNLOADS"

      - name: Check GitHub issues for regressions
        uses: actions/github-script@v7
        with:
          script: |
            const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            const issues = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'open',
              labels: 'regression',
              since: since,
            })
            if (issues.data.length > 3) {
              core.setFailed(`Found ${issues.data.length} regression issues in 24h`)
            }
            console.log(`Regression issues (24h): ${issues.data.length}`)

      - name: Check Sentry error rate
        run: |
          # Query Sentry API
          RESPONSE=$(curl -s -H "Authorization: Bearer ${{ secrets.SENTRY_TOKEN }}" \
            "https://sentry.io/api/0/projects/org/package/stats/?since=86400")
          ERROR_COUNT=$(echo $RESPONSE | jq '[.[][1]] | add')
          if [ "$ERROR_COUNT" -gt 100 ]; then
            echo "ALERT: $ERROR_COUNT errors in last 24h"
            exit 1
          fi
          echo "OK: $ERROR_COUNT errors in last 24h"
```

### 26.3 User Feedback Collection

```markdown
## Post-Release Feedback Collection

### Automated Collection
1. GitHub Discussion thread pinned for release feedback
2. In-app feedback prompt for CLI users (`opencode feedback`)
3. Issue template labeled "release-feedback"

### Manual Collection
1. Monitor Discord/Slack for user complaints
2. Review GitHub issues tagged "regression"
3. Check Twitter/X for community mentions

### Feedback Analysis
| Feedback Type | Action |
|---------------|--------|
| Bug reports | Triage and prioritize for PATCH |
| Feature requests | Add to backlog for next MINOR |
| Confusion/docs gaps | Update documentation immediately |
| Performance complaints | Investigate and benchmark |
| Migration difficulties | Improve migration guide |
```

### 26.4 Regression Tracking

```markdown
## Regression Tracking Dashboard

### Per-Release Log
| Release | Date | Regressions Found | Regressions Fixed | Status |
|---------|------|-------------------|-------------------|--------|
| v2.1.0 | 2026-05-29 | 3 | 2 | Active |
| v2.0.0 | 2026-04-15 | 7 | 7 | Stable |
| v1.5.0 | 2026-03-01 | 2 | 2 | Stable |

### Regression Labeling
- All regressions are labeled `regression` in GitHub Issues
- Each regression references the release version in a comment
- Critical regressions are promoted to P0 immediately
```

### 26.5 Performance Monitoring

```yaml
# .github/workflows/perf-regression.yml
name: Performance Regression Check

on:
  schedule:
    - cron: "0 0 * * *"  # Daily

jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Run performance benchmarks
        run: npm run bench
      - name: Compare with baseline
        run: |
          node scripts/compare-benchmarks.mjs \
            --baseline .benchmark-results/baseline.json \
            --current benchmark-results.json \
            --threshold 1.2
```

---

## 27. Rollback Deep Dive

### 27.1 Rollback Scenarios and Scripts

| Scenario | Action | Script |
|----------|--------|--------|
| **npm package broken** | Deprecate bad version, re-publish previous | `npm deprecate @org/package@2.1.0 "critical bug"` |
| **Docker image bad** | Re-tag previous image as `latest` | `docker tag ghcr.io/org/package:2.0.0 ghcr.io/org/package:latest` |
| **Git tag wrong** | Delete bad tag, re-tag | `git tag -d v2.1.0 && git push origin :refs/tags/v2.1.0` |
| **Database migration bad** | Run down migration | See 27.2 |
| **Release branch has bad merge** | Revert commit | `git revert <commit> && git push` |

```powershell
# scripts/rollback-npm.ps1
param(
  [string]$BadVersion,
  [string]$GoodVersion
)

$ErrorActionPreference = "Stop"

Write-Host "Rolling back npm package from $BadVersion to $GoodVersion"

# Step 1: Deprecate bad version
npm deprecate "@org/package@$BadVersion" "Rolled back due to critical issue. Use $GoodVersion instead."

# Step 2: Re-tag good version as latest
npm dist-tag add "@org/package@$GoodVersion" latest

# Step 3: Tag bad version in git
Write-Host "Tagging v$BadVersion as BAD"
git tag "v$BadVersion-bad" "v$BadVersion"
git push origin "v$BadVersion-bad"

Write-Host "Rollback complete. Users will now install $GoodVersion."
```

### 27.2 Database Migration Rollbacks

```typescript
// scripts/migrate.ts
import { db } from './src/db'

const migrations = {
  '002_add_search_index': {
    up: async () => {
      await db.execute(`CREATE INDEX idx_search ON documents(content)`)
    },
    down: async () => {
      await db.execute(`DROP INDEX IF EXISTS idx_search`)
    },
  },
  '003_change_config_schema': {
    up: async () => {
      await db.execute(`ALTER TABLE config ADD COLUMN provider VARCHAR(255)`)
    },
    down: async () => {
      await db.execute(`ALTER TABLE config DROP COLUMN IF EXISTS provider`)
    },
  },
}

export async function rollback(timestamp: string): Promise<void> {
  const migration = migrations[timestamp]
  if (!migration) {
    throw new Error(`Unknown migration: ${timestamp}`)
  }
  console.log(`Rolling back migration: ${timestamp}`)
  await migration.down()
  console.log(`Rollback complete: ${timestamp}`)
}
```

```powershell
# scripts/db-rollback.ps1
param(
  [string]$Timestamp
)

$ErrorActionPreference = "Stop"

Write-Host "Running database rollback for migration: $Timestamp"

# Run the down migration
npx tsx scripts/migrate.ts rollback $Timestamp

if ($LASTEXITCODE -ne 0) {
  Write-Host "FAILED: Database rollback could not complete."
  Write-Host "Manual intervention required."
  exit 1
}

Write-Host "Database rollback completed successfully."
```

### 27.3 Package Version Unpublish Policies

npm has strict unpublish policies. Follow these rules:

| Action | Allowed? | Notes |
|--------|----------|-------|
| Unpublish version < 24 hours old | Yes | Only if fewer than 24 hours have passed |
| Unpublish version > 24 hours old | No | Use `npm deprecate` instead |
| Re-publish same version number | No | Never. Increment patch number. |
| Remove entire package | No | Package is permanent once published |

```powershell
# Preferred rollback: deprecate, don't unpublish
npm deprecate "@org/package@$BadVersion" "Critical bug found. Use @org/package@$GoodVersion instead."

# Only use unpublish for immediate hotfix within 24 hour window
if ($HoursSincePublish -lt 24) {
  npm unpublish "@org/package@$BadVersion" --force
}
```

### 27.4 Communication During Rollback

```markdown
# Rollback Notice: v2.1.0 → v2.0.0

**What happened:** A critical bug was found in v2.1.0 affecting [describe impact].

**Action taken:** We have rolled back to v2.0.0. Users on v2.1.0 should downgrade immediately.

**Downgrade command:**
```bash
npm install -g @org/package@2.0.0
```

**What's next:** We're working on a fix and will release v2.1.1 once it's ready.

**Timeline:**
- [Time] — Bug reported
- [Time] — Confirmed and reproduced
- [Time] — Rollback initiated
- [Time] — Rollback complete

**Apologies:** We apologize for the inconvenience. We're adding additional testing to prevent this in future releases.
```

### 27.5 Post-Mortem Template

```markdown
# Post-Mortem: Rollback of vX.Y.Z

## Incident Summary
- **Release:** vX.Y.Z
- **Rolled back to:** vX.Y.Z-1
- **Date:** YYYY-MM-DD
- **Duration:** X hours Y minutes
- **Root cause:** [one-line]
- **Impact:** [who was affected]

## What Went Wrong
[Detailed timeline and root cause analysis]

## What Went Right
- Quick detection by monitoring
- Fast escalation through hotfix process
- Clear communication to users

## Action Items
| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Add test for this scenario | @user | Date |
| 2 | Improve monitoring alert | @user | Date |
| 3 | Pre-flight check for release | @user | Date |

## Preventative Measures
- How to avoid this specific issue
- How to detect it earlier next time
- How to recover faster
```

---

## 28. Release Governance

### 28.1 Release Approval Matrix

| Release Type | Approver | Reviewers Needed | Emergency Bypass |
|-------------|----------|------------------|------------------|
| **Nightly** | Automated | None | N/A |
| **Beta** | Any maintainer | 1 | N/A |
| **RC** | Lead maintainer | 2 | 1 maintainer |
| **Stable** | Lead maintainer + 1 | 2 | 1 maintainer (with note) |
| **MAJOR** | All maintainers | 3 | 2 maintainers |
| **Hotfix (P1)** | Any maintainer | 1 | 1 maintainer |
| **Hotfix (P0)** | Lead maintainer | 0 (expedited) | Lead maintainer alone |
| **Security embargo** | All maintainers | 3 | Lead + 1 maintainer |

### 28.2 Release Voting Process

For MAJOR releases and controversial decisions, use a voting process:

```markdown
## Release Vote Process

### Quorum
- At least 50% of active maintainers must vote
- At least 75% of votes must be in favor

### Vote Types
- **Approve:** Ready to release
- **Approve with caveats:** Release with noted concerns
- **Block:** Must resolve concerns before release
- **Abstain:** No opinion

### Voting Period
- Standard: 72 hours
- Expedited: 24 hours (for security releases)
- Emergency: Immediate decision by lead maintainer

### Voting Template
```
Release: v2.0.0
Vote: [Approve / Approve with caveats / Block / Abstain]
Concerns: [if any]
```

### Escalation
If a vote is blocked:
1. Discuss the concerns in maintainer channel
2. Propose resolution
3. Re-vote
4. If still blocked after 2 rounds, lead maintainer decides
```

### 28.3 Emergency Bypass Procedures

When the standard approval process would cause unacceptable delay:

```markdown
## Emergency Bypass

### Trigger Conditions
- Active exploit in the wild
- Data loss bug affecting users
- Service outage for > 1 hour
- Critical dependency broken

### Procedure
1. Lead maintainer declares emergency
2. Expedited review (single reviewer)
3. Fix is published immediately
4. Post-release review within 24 hours
5. Standard approval retroactively documented

### Post-Emergency
- Full post-mortem within 48 hours
- Review whether bypass was justified
- Document any process improvements needed
```

### 28.4 Release Calendar/Schedule

```markdown
## Release Schedule 2026

| Month | Scheduled Release | Release Manager | Notes |
|-------|------------------|----------------|-------|
| January | v2.0.0 (MAJOR) | @lead | Breaking changes |
| February | v2.1.0 (MINOR) | @maintainer1 | |
| March | v2.2.0 (MINOR) | @maintainer2 | |
| April | v2.3.0 (MINOR) | @lead | |
| May | v2.4.0 (MINOR) | @maintainer1 | |
| June | v3.0.0 (MAJOR) | @lead | Breaking changes |
| July | v3.1.0 (MINOR) | @maintainer2 | |
| August | v3.2.0 (MINOR) | @maintainer1 | |
| September | v3.3.0 (MINOR) | @lead | |
| October | v3.4.0 (MINOR) | @maintainer2 | |
| November | v4.0.0-rc (MAJOR) | @lead | RC phase |
| December | v4.0.0 (MAJOR) | @lead | Stable |

### Schedule Rules
- MAJOR releases: Every 6 months (June, December)
- MINOR releases: Monthly (between majors)
- PATCH releases: As needed (no schedule)
- Hotfixes: As needed (immediate)
- No releases: December 24 - January 2 (holiday freeze)
```

---

## 29. Release Anti-Patterns Deep Dive

Each anti-pattern below includes the real-world consequence and prevention strategy:

| # | Anti-Pattern | Real-World Consequence | Prevention |
|---|--------------|----------------------|------------|
| 1 | **Release on Friday** | Bugs found over weekend go unaddressed. Users experience broken tooling for 3 days. | Release Tuesday-Thursday only. Block Friday releases in CI. |
| 2 | **Silent release** | Users don't know what changed. Breaking changes cause unexpected failures. No one knows to upgrade. | Always publish release notes. Automate changelog posting to GitHub Releases. |
| 3 | **Breaking without notice** | Users' code breaks without warning. Frustration leads to forking or abandoning the project. | Always deprecate first. Provide migration guide. Use MAJOR version bump. |
| 4 | **Untested release** | Critical bugs reach production. Users lose trust in the project's quality. | Never skip RC phase. Automate testing gates that block release. |
| 5 | **Manual release** | Human error: wrong version, wrong tag, wrong package. Opaque and non-reproducible. | Fully automate the release pipeline. Use GitHub Actions with approval gates. |
| 6 | **No rollback plan** | Stuck on bad release. Users cannot downgrade. Pressure to fix quickly leads to bad decisions. | Always have a rollback script ready. Test rollback scenario before releasing. |
| 7 | **Hidden dependencies** | Release fails because of an unpinned transitive dependency that broke. | Lock dependencies. Run `npm ci` (not `npm install`) in CI. |
| 8 | **Skipping changelog update** | Changelog is incomplete. Users miss important changes. Support team doesn't know what shipped. | Make changelog update a CI gate. Use Changesets to automate. |
| 9 | **Unilateral MAJOR release** | Community feels ignored. Users are forced to migrate on someone else's timeline. | Vote on MAJOR releases. Communicate schedule months in advance. |
| 10 | **Over-releasing** | Users get fatigue from constant updates. They start ignoring upgrades. | Follow the release cadence. Don't release trivial changes as stable. |
| 11 | **Under-releasing** | Changes pile up. Users wait months for critical fixes. | Stick to the cadence. If no changes, do a maintenance release anyway. |
| 12 | **No security contact** | Security researchers have nowhere to report vulnerabilities. Zero-days go unpatched. | Always have `SECURITY.md` with contact info and PGP key. |
| 13 | **Ignoring LTS streams** | Enterprise users stuck on old version with no support. They fork and maintain themselves. | Maintain LTS releases with backport policy. Minimum 6 months support. |
| 14 | **Breaking LTS without notice** | Enterprise users' deployments break. Loss of trust. | Any change to LTS is a PATCH only. Never change behavior in LTS. |
| 15 | **No feature flags for large changes** | A new feature breaks for all users at once. No way to disable it. | Always ship large features behind feature flags. Use gradual rollout. |

---

> **End of Task-Release Document (Global / Brain Box)**
>
> Part of the LifeJiggy OSS Enhancement Framework
> Last updated: 2026-05-29
