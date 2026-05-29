# OSS Metrics & Analytics — Measuring Project Health — Universal Reference

> A comprehensive guide to measuring, tracking, and improving open source project health.
> Applicable to any open source project regardless of size, language, or ecosystem.
> Covers individual contributor metrics, project health KPIs, bus factor, retention analytics,
> code quality, impact measurement, tooling, culture, and ready-to-use templates.

---

## Table of Contents

1. [Part 1: Individual Contributor Metrics](#part-1-individual-contributor-metrics)
2. [Part 2: Project Health Metrics](#part-2-project-health-metrics)
3. [Part 3: Bus Factor Calculation](#part-3-bus-factor-calculation)
4. [Part 4: Contributor Retention Analytics](#part-4-contributor-retention-analytics)
5. [Part 5: Code Quality Metrics](#part-5-code-quality-metrics)
6. [Part 6: Measuring Impact & Value](#part-6-measuring-impact--value)
7. [Part 7: Tools & Dashboards](#part-7-tools--dashboards)
8. [Part 8: Building a Metrics-Driven Culture](#part-8-building-a-metrics-driven-culture)
9. [Part 9: Templates](#part-9-templates)

---

## Part 1: Individual Contributor Metrics

### 1.1 Personal KPIs

Individual contributor metrics measure the effectiveness, velocity, and quality of a single
contributor's work within an open source project. These metrics are useful for:

- Self-improvement and career growth tracking
- Maintainer evaluation of contributor reliability
- Identifying mentoring needs
- Recognizing top performers

#### PRs Submitted (per period)

The raw count of pull requests a contributor opens in a given time window (weekly, monthly,
quarterly). While simple, this metric must be contextualized:

| Context | What It Means |
|---------|---------------|
| High count, small PRs | Good for reviewability, may indicate many trivial changes |
| Low count, large PRs | High-impact work, but harder to review and merge |
| Steady cadence | Reliable contributor who paces themselves |
| Burst pattern | Sporadic contributions, possibly driven by personal need |

**Reference data:** In the Kubernetes project, the top 10% of contributors submit ~5-15 PRs/month.
In smaller projects like chalk-animation, typical rates are 1-3 PRs/month.

#### PRs Merged (per period)

A more meaningful metric than submitted count, as it tracks throughput to completion.

Merge Rate = PRs Merged / PRs Submitted x 100

| Benchmark | Interpretation |
|-----------|----------------|
| 90-100% | Highly reliable contributor; changes align with project direction |
| 70-89% | Good contributor; some rejections or abandonments |
| 50-69% | Needs better alignment with project standards or goals |
| < 50% | Significant disconnect; needs mentoring or clearer contribution guidelines |

**Real-world data from CNCF projects:**
- **Kubernetes:** average merge rate ~75% for first-time, ~90% for established contributors
- **Prometheus:** ~85% overall merge rate
- **CoreDNS:** ~80% overall merge rate
- **containerd:** ~88% overall merge rate

#### Review Turnaround Time

The time between a review being requested and the review being submitted. This is one of the
most impactful metrics for contributor satisfaction.

Review Turnaround = Review Submitted At - Review Requested At

| Tier | Time | Impact |
|------|------|--------|
| Excellent | < 4 hours | Contributors feel valued and motivated |
| Good | < 24 hours | Acceptable for most projects |
| Fair | 24-72 hours | Common in volunteer-run projects |
| Poor | 3-7 days | Contributors may lose context or momentum |
| Critical | > 7 days | High risk of contributor abandonment |

**Industry benchmarks (2024-2025 data):**
- **Linux kernel:** average first review response: ~48 hours (subsystem-dependent)
- **Rust (rust-lang/rust):** median first response: ~8 hours
- **VS Code:** median first response: ~12 hours
- **TensorFlow:** median first response: ~24 hours
- **Next.js:** median first response: ~6 hours
- **Homebrew:** median first response: ~2 hours

#### Review Depth

The quality and thoroughness of code reviews, measured by:

- Comments per review
- Code suggestions per review
- Issues caught pre-merge
- Contextual discussion (not just "LGTM")

Review Depth Score = (Lines of Review Comment + Code Suggestions) / Files Changed

| Depth Level | Comments/Review | Signature |
|-------------|-----------------|-----------|
| Superficial | 0-1 | "LGTM", "Looks good", emoji only |
| Light | 2-5 | Minor style nits, single logic observation |
| Moderate | 5-15 | Some logical errors caught, architecture discussed |
| Deep | 15-30 | Multiple rounds of substantive feedback |
| Exhaustive | 30+ | Line-by-line analysis, test gaps, security review |

**What top reviewers do differently (analysis from Google's internal research):**
- They review within the first 24 hours (reduce context-switching cost for authors)
- They focus on API design and logic, not formatting (automated formatting catches style)
- They leave actionable comments (not just "this is wrong" but "this is wrong because X, consider Y")
- They distinguish between blocking and non-blocking comments

### 1.2 Velocity Tracking

#### Time from First Commit to Merge

Measures the total lifecycle of a contribution from the first code written to its inclusion
in the main branch.

Lead Time = Merge Timestamp - First Commit Timestamp

This metric breaks down into:

| Phase | Description | Typical Duration |
|-------|-------------|-----------------|
| Coding | Time spent writing the change | Hours to weeks |
| Submission | Time from push to opening PR | Minutes to days |
| First Review | Time from PR to first review comment | Hours to days |
| Revision | Time to address feedback | Hours to weeks |
| Re-review | Subsequent review cycles | Hours to days |
| Merge | Time from final approval to merge | Minutes to hours |

**Formula for lead time decomposition:**

Lead Time = t_coding + t_submission + t_first_review + t_revision x n + t_merge

Where n is the number of revision cycles.

**Reference data from GitHub's Octoverse report:**
- Median lead time across all OSS on GitHub: ~7.5 hours (2024)
- Median for enterprise repos: ~24 hours
- Median for large OSS (10,000+ stars): ~48 hours
- Median for Kubernetes: ~72 hours
- Median for vuejs/core: ~12 hours

#### Time from Submission to First Review

The single most predictive metric for contributor retention.

Time to First Review = min(Review Submitted At) - PR Created At

| Percentile | Kubernetes | Express.js | Axios | Recommended Target |
|------------|------------|------------|-------|-------------------|
| P50 | 6 hours | 3 hours | 2 hours | < 4 hours |
| P75 | 24 hours | 12 hours | 8 hours | < 12 hours |
| P90 | 72 hours | 48 hours | 24 hours | < 24 hours |
| P95 | 1 week | 1 week | 3 days | < 48 hours |

**The 24-hour rule:** Projects that respond to first-time contributors within 24 hours retain
them at a rate 3-4x higher than projects that take longer.

### 1.3 Quality Tracking

#### Rejection Rate

The percentage of a contributor's PRs that are ultimately closed without merging.

Rejection Rate = PRs Closed Without Merge / Total PRs Submitted x 100

| Rejection Rate | Interpretation |
|----------------|----------------|
| 0-5% | Exceptional alignment with project goals |
| 5-15% | Normal; some proposals don't pan out |
| 15-30% | Needs better upfront discussion before coding |
| 30%+ | Contributor may be working against project direction |

**Common rejection reasons across OSS projects (aggregate data):**
1. Scope creep / feature too narrow (28%)
2. Test failures / CI not passing (22%)
3. Duplicate of existing or in-progress work (18%)
4. Not aligned with project roadmap (15%)
5. Licensing concerns (10%)
6. Security concerns (7%)

#### Re-review Rounds per PR

The number of review cycles a PR goes through before merge.

Re-review Count = Count of (Review Submitted) - 1

| Re-reviews | Meaning |
|------------|---------|
| 0 (merged without review) | Problematic -- bypasses quality process |
| 1 | Healthy -- single review cycle |
| 2-3 | Normal for significant changes |
| 4-6 | Signs of unclear requirements or communication issues |
| 7+ | Serious process problem; PR is too large or poorly scoped |

**Best practice:** PRs should ideally require 1-2 review cycles. If a contributor frequently
needs 3+ cycles, consider:
- Pre-PR design discussions (RFCs, design docs)
- Breaking large PRs into smaller, incremental changes
- Providing clearer contribution guidelines

#### Test Coverage on Submitted Code

Whether a contributor's PRs include adequate tests.

Test Inclusion Rate = PRs With Tests / Total PRs x 100

| Project | Test Inclusion Rate | Policy |
|---------|-------------------|--------|
| pytest | 98% | Required for all changes |
| Django | 95% | Required for all changes |
| React | 90% | Strongly encouraged |
| Kubernetes | 85% | Required for most changes |
| curl | 30% | Not formally required |
| Linux kernel | 25% | Not formally required (varies by subsystem) |

**Why test coverage on new code matters:** A 2023 study by Google found that code changes
without associated tests are 3.7x more likely to introduce bugs than changes with tests.

### 1.4 Longitudinal Trends

Individual contributor metrics should improve over time as contributors gain context and
experience. Tracking these trends helps identify both growth and stagnation.

#### Expected Improvement Curves

| Metric | 0-3 Months | 3-12 Months | 1-2 Years | 2+ Years |
|--------|------------|-------------|-----------|----------|
| PR merge rate | 50-70% | 70-85% | 85-92% | 90-95%+ |
| Review turnaround | 5-7 days | 2-4 days | 24-48 hours | < 24 hours |
| Review depth | 0-2 comments | 3-8 comments | 8-15 comments | 15+ comments |
| Time to first review | N/A (new) | 48-72h | 24-48h | < 24h |
| Re-review rounds | 3-5 | 2-3 | 1-2 | 1 |
| Test inclusion | 40-60% | 60-80% | 80-90% | 90%+ |
| PR size (lines/PR) | 50-100 | 100-200 | 200-400 | 400+ |

**Warning signs of stagnation:**
- Merge rate not improving after 6 months
- Review turnaround time not decreasing
- Same types of review comments recurring (not learning from feedback)
- PR size not increasing (may indicate contributor isn't taking on larger features)

**Positive deviation:**
- Review depth improving faster than expected (potential future maintainer)
- Time to first review decreasing as contributor builds relationships with other reviewers

### 1.5 Bus Factor (Personal)

An individual's personal bus factor measures how much knowledge would be lost if they left.

Personal Bus Factor = Count of Contributors Who Can Replace Your Knowledge in Each Area

#### Knowledge Documentation Rate

Track what fraction of your expertise is documented vs. in your head.

Documentation Rate = Documented Knowledge Areas / Total Knowledge Areas x 100

| Level | Documentation Rate | Risk |
|-------|-------------------|------|
| Excellent | 90-100% | Minimal risk from departure |
| Good | 70-89% | Some knowledge transfer needed |
| Fair | 40-69% | Medium risk; several critical undocumented areas |
| Poor | 10-39% | High risk; significant tribal knowledge |
| Critical | < 10% | Extreme bus factor; organization-threatening |

**Knowledge areas to document:**
1. Architecture decisions and rationale (ADRs)
2. Deployment and infrastructure setup
3. CI/CD pipeline configuration
4. Testing strategies and integration test setup
5. Release process and checklist
6. Security review process
7. Community relationships and key contacts
8. Historical context for past design decisions
9. Troubleshooting guides for common issues
10. Onboarding and mentoring processes

### 1.6 Review Influence

How effective a contributor's code review feedback is.

Review Acceptance Rate = Accepted Suggestions / Total Suggestions x 100

Review Influence Score = Accepted Suggestions x (Code Quality Improvement from Accepted)

| Acceptance Rate | Influence Level |
|----------------|-----------------|
| 80-100% | Highly influential; trusted reviewer |
| 60-79% | Moderately influential; good domain knowledge |
| 40-59% | Average; some suggestions need refinement |
| 20-39% | Low influence; may lack context or communication skills |
| < 20% | Minimal influence; needs mentorship on reviewing |

**Factors that increase review influence:**
- Including code snippets with suggestions (not just prose)
- Referencing project conventions and style guides
- Explaining the why behind the suggestion
- Being respectful and constructive in tone
- Reviewing promptly (reviews submitted within 24h are taken more seriously)
- Building rapport with the contributor over multiple interactions

---

## Part 2: Project Health Metrics

### 2.1 CHAOSS Project Metrics

The CHAOSS (Community Health Analytics Open Source Software) project defines a comprehensive
set of metrics organized into five goal areas. These are maintained at chaoss.community.

#### 2.1.1 Diversity & Inclusion

These metrics measure how diverse and inclusive a project community is across multiple
dimensions: demographic, organizational, and geographic.

##### Contributor Demographics

Demographic Diversity Index = 1 - Sum(p_i)^2

where p_i is the proportion of contributors in category i.

A value of 0 indicates perfect homogeneity. Values closer to 1 indicate high diversity.

**Reference data from CHAOSS surveys:**
- Open source contributors identifying as women: ~8-12% globally
- Contributors from outside the US/EU: ~25-35% (varies significantly by project)
- Contributors from historically underrepresented groups: ~3-8%

**Leading practice:** Projects with published diversity metrics and explicit D&I policies
see 2-3x higher contribution rates from underrepresented groups.

##### Affiliation Diversity

The variety of organizations represented among contributors.

Affiliation Diversity = Count of Unique Organizations / Total Contributors x 100

Organization Concentration = Sum(Org Contribution Share)^2

A high Organization Concentration (Herfindahl index > 0.25) indicates the project is
dominated by a single organization, creating risk.

| Organization Concentration | Risk Level |
|---------------------------|------------|
| < 0.15 | Healthy diversity |
| 0.15 - 0.25 | Moderate concentration |
| 0.25 - 0.40 | High concentration -- single org dependency |
| > 0.40 | Critical -- project is de facto owned by one organization |

**Case studies:**
- **Kubernetes:** ~0.08 (very diverse; Google at ~15%, Red Hat ~10%, independent ~30%)
- **React:** ~0.35 (high concentration; Meta at ~50% of commits)
- **curl (~2020):** ~0.60 (very high; Daniel Stenberg alone was >50% of commits)
- **Terraform (pre-fork):** ~0.45 (HashiCorp at ~65%)
- **Linux kernel:** ~0.12 (very diverse; multiple companies plus independents)

##### Geographic Diversity

Where contributors are located.

Geographic Diversity = Count of Countries Represented / Total Contributors x 100

Regional Balance = min(North America%, Europe%, Asia%, Other%)

A healthy score has no single region exceeding 60% of all contributions.

**Real-world data:**
- **Kubernetes:** ~40% North America, ~35% Europe, ~20% Asia, ~5% other
- **Django:** ~30% North America, ~40% Europe, ~25% Asia, ~5% other
- **Rust:** ~35% North America, ~40% Europe, ~20% Asia, ~5% other
- **npm CLI:** ~55% North America, ~25% Europe, ~15% Asia, ~5% other

#### 2.1.2 Evolution

Metrics that measure how a project changes over time -- its velocity, responsiveness, and
release cadence.

##### Code Velocity

Commits per Week = Total Commits / Total Weeks in Period

Active Days per Week = Days with at Least One Commit / Total Days

Lines Changed per Week = Additions + Deletions / Total Weeks

| Metric | Small Project (< 10 contributors) | Medium Project (10-100) | Large Project (100+) |
|--------|----------------------------------|------------------------|---------------------|
| Commits/week | 5-20 | 20-100 | 100-1000+ |
| Active days/week | 3-5 | 5-7 | 7 |
| Lines changed/week | 500-5000 | 5000-50000 | 50000-500000 |

**Real project data (weekly averages, 2024):**
- **Kubernetes:** ~800 commits/week, ~350 active contributors/week
- **VS Code:** ~400 commits/week, ~100 active contributors/week
- **Homebrew:** ~200 commits/week, ~80 active contributors/week
- **Next.js:** ~150 commits/week, ~60 active contributors/week
- **pandas:** ~80 commits/week, ~30 active contributors/week

##### Release Frequency

Release Cadence = Releases per Year

Days Between Releases = 365 / Releases per Year

| Cadence | Type | Examples |
|---------|------|----------|
| Daily | Rolling/nightly | Linux kernel -rc releases, Chrome canary |
| Weekly | Rapid iteration | curl, jq, small utilities |
| Bi-weekly | Sprint-aligned | Maven, Gradle plugin releases |
| Monthly | Standard OSS | Django (patches), React, Node.js |
| Quarterly | Enterprise-aligned | Kubernetes, Angular, Jenkins |
| Semi-annual | Major releases | Python, LLVM, GCC |
| Annual | Conservative | LTS releases (Ubuntu, Debian) |

**Best practice (from CNCF):** Projects should release at least quarterly to maintain
community confidence and attract users.

##### Issue Resolution Rate

Issue Resolution Rate = Issues Closed in Period / Issues Opened in Period x 100

Median Time to Close = P50(Issues Closed At - Issue Opened At)

Backlog Growth Rate = Issues Opened - Issues Closed per Month

| Resolution Rate | State |
|----------------|-------|
| > 100% | Shrinking backlog (healthy) |
| 80-100% | Managing workload effectively |
| 50-79% | Modest backlog growth |
| 25-49% | Backlog growing faster than capacity |
| < 25% | In crisis mode; response team is overwhelmed |

**Real project data (issue resolution rates):**
- **curl:** ~95% close rate (Daniel Stenberg is famously responsive)
- **Redis:** ~90% close rate
- **Homebrew:** ~85% close rate
- **Node.js:** ~75% close rate
- **Kubernetes:** ~65% close rate (high traffic, many features)
- **TensorFlow:** ~55% close rate

**Median time to close (by project size):**
| Project Size | Median Time to Close (bugs) | Median Time to Close (features) |
|--------------|---------------------------|---------------------------------|
| Small (< 1k stars) | 2-7 days | 14-30 days |
| Medium (1k-10k stars) | 7-30 days | 30-90 days |
| Large (10k-100k stars) | 14-60 days | 60-180 days |
| Mega (100k+ stars) | 30-90 days | 90-365+ days |

#### 2.1.3 Risk

Metrics that identify areas where a project is vulnerable.

##### Bus Factor

See detailed treatment in Part 3: Bus Factor Calculation.

Bus Factor = Minimum number of contributors to lose before project becomes non-viable

| Bus Factor | Risk Level | Status |
|------------|------------|--------|
| 1 | Critical | Single point of failure |
| 2 | High | One person leaving reduces capacity by 50% |
| 3-5 | Moderate | Manageable but needs improvement |
| 6-10 | Low | Healthy redundancy |
| 10+ | Minimal | Well-distributed knowledge |

##### License Mismatch

License Consistency = Files with Declared License / Total Files x 100

Dependency License Conflict Count = Dependencies with Incompatible Licenses

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| License declared in repo | Yes | Partial | No/Unclear |
| LICENSE file present | Yes | Missing SPDX | No |
| Dependency license scan | Clear | 1-3 conflicts | 4+ conflicts |
| CONTRIBUTOR LICENSE AGREEMENT | Exists and clear | Ambiguous | None |

**Common license incompatibilities:**
| Primary License | Incompatible With |
|----------------|-------------------|
| GPL v2 | Apache 2.0 (FSF interpretation), AGPL |
| GPL v3 | Apache 2.0 (has additional restrictions) |
| Apache 2.0 | GPL v2 only |
| LGPL | Proprietary (if linked statically) |
| AGPL | Most proprietary use |
| MIT/BSD/X11 | Compatible with everything |

##### Dependency Freshness

Outdated Dependency Ratio = Outdated Dependencies / Total Dependencies x 100

CVE Exposure = Dependencies with Known CVEs / Total Dependencies x 100

Dependency Age = Current Date - Release Date of Current Version

| Freshness Level | Outdated Ratio | Action |
|-----------------|---------------|--------|
| Excellent | < 5% | Regularly updated |
| Good | 5-15% | Minor updates needed |
| Fair | 15-30% | Several major versions behind |
| Poor | 30-50% | Significant technical debt |
| Critical | 50%+ | Security risk; immediate action needed |

#### 2.1.4 Value

Metrics that demonstrate a project's worth to its users and the broader ecosystem.

##### Contributor Growth

New Contributors per Period = Contributors Making First Contribution in Period

Contributor Growth Rate = (New This Period - New Last Period) / New Last Period x 100

Net Contributor Growth = Active Contributors Current Period - Active Contributors Previous Period

| Growth Rate | Assessment |
|-------------|------------|
| > 50% | Explosive growth; may strain maintainer capacity |
| 20-50% | Rapid growth; healthy project |
| 5-20% | Steady growth; sustainable |
| -5% to 5% | Stable; plateauing |
| -20% to -5% | Declining; needs investigation |
| < -20% | Critical decline; existential risk |

##### User Adoption Signals

Combining signals from multiple sources for a composite adoption score:

Adoption Signal Index = 0.25 x Z(Daily Downloads) + 0.20 x Z(Stars) + 0.20 x Z(Forks) +
                        0.15 x Z(Dependents) + 0.10 x Z(Docker Pulls) + 0.10 x Z(Contributors)

where Z(x) is the z-score (standard deviations from ecosystem mean).

If a project's adoption signal index is trending downward for 3+ consecutive quarters,
it is a leading indicator of decline.

##### Downstream Dependents

Downstream Impact = Count of Repos That Depend on This Project

Ecosystem Penetration = Downstream Dependents / Total Projects in Ecosystem x 100

Dependency Depth = Average Distance from Root in Dependency Tree

**Reference data (via libraries.io, GitHub dependency graph, 2024):**
| Project | Direct Dependents | Ecosystem |
|---------|------------------|-----------|
| lodash | 150,000+ (npm) | JavaScript |
| express | 60,000+ (npm) | JavaScript |
| requests | 500,000+ (PyPI) | Python |
| urllib3 | 400,000+ (PyPI) | Python |
| axios | 300,000+ (npm) | JavaScript |
| gRPC | 100,000+ (cross-ecosystem) | Multi |
| serde | 80,000+ (crates.io) | Rust |
| log4j | 70,000+ (Maven) | Java |

#### 2.1.5 Experience

Metrics focused on the quality of experience for project participants.

##### First-Time Contributor Experience

Onboarding Success Rate = Contributors Who Make a Second Contribution / First-Time Contributors

Time to First Merge = Time Between First PR Opened and First PR Merged

First Issue Response Time = Time from First Issue by New User to Any Maintainer Response

| First Merge Time | Experience Quality |
|-----------------|-------------------|
| < 1 day | Excellent; highly welcoming |
| 1-3 days | Good |
| 4-7 days | Adequate |
| 1-4 weeks | Needs improvement |
| > 1 month | Poor; contributor likely won't return |

**The good first issue effect:** Projects with labeled "good first issues" see:
- 2.5x more first-time contributors
- 1.8x higher first-time contributor retention
- 3.2x faster time to first contribution

**Best practices for first-time contributor experience:**
1. Automated welcome message on first PR
2. Required: CONTRIBUTING.md with clear step-by-step process
3. Code of Conduct prominently linked
4. Good first issue and help wanted labels with clear scope
5. Assigned mentor or buddy for complex projects
6. Review first PR within 24 hours
7. Encourage (don't gatekeep) imperfect first contributions
8. Celebrate and recognize first-time contributors publicly

##### Issue Close Rate (for first-time submitters)

First-Time Close Rate = First-Time Submitter Issues Closed / Total First-Time Issues

Newcomer Success Rate = First-Time Contributors Who Get at Least One PR Merged

| Newcomer Success Rate | Project Status |
|-----------------------|---------------|
| 60-80% | Excellent onboarding |
| 40-59% | Good |
| 20-39% | Average |
| 10-19% | Below average; barriers to entry |
| < 10% | Critical; highly unwelcoming to newcomers |

### 2.2 CNCF Maturity Level Metrics

The Cloud Native Computing Foundation (CNCF) defines three maturity levels for projects,
each with specific metric requirements.

#### Sandbox Projects

Entry-level project. Minimum metrics to track:
- **Contributors:** At least 3 active contributors from at least 2 organizations
- **Commits:** Demonstrable code activity in past 3 months
- **Code of Conduct:** MUST have one
- **License:** MUST be OSI-approved
- **Documentation:** README, CONTRIBUTING, basic architecture docs

**Typical sandbox metrics (reference):**
- 3-15 active contributors
- 10-50 commits/month
- 1-2 organizations
- 100-1000 GitHub stars
- No formal release process yet

#### Incubating Projects

Demonstrating growing adoption and sustainability:
- **Contributors:** At least 5 contributors from at least 2 organizations over past 6 months
- **Adoption:** At least 3 production users (documented)
- **Governance:** Documented governance model, committer process, and roadmap
- **Release cadence:** At least one release in the past 12 months
- **Community:** Documented community meeting schedule, public mailing list or chat

**Typical incubating metrics (reference):**
| Metric | Target Range |
|--------|-------------|
| Active contributors | 10-50 |
| Commits/month | 50-200 |
| Organizations | 3-10 |
| Production users | 3-20 |
| GitHub stars | 1000-10000 |
| Release cadence | Quarterly or better |
| Documentation quality | Comprehensive |

#### Graduated Projects

Highest level of CNCF maturity. Must demonstrate:
- **Contributor diversity:** 10+ contributors from at least 5 different organizations
- **Adoption:** Documented adoption by multiple end users across different industries
- **Governance:** Full documented governance with transparent decision-making
- **Release process:** Documented, stable release process with security release playbook
- **Test coverage:** CI/CD with automated testing, security scanning
- **Community health:** Demonstrated ability to onboard new contributors and maintainers
- **SLAs for critical issues:** Defined response times for security vulnerabilities

**Typical graduated metrics (reference):**
| Metric | Target Range |
|--------|-------------|
| Active contributors | 50-500+ |
| Commits/month | 200-2000+ |
| Organizations | 20-100+ |
| Production users | 100+ |
| GitHub stars | 10000-100000+ |
| Release cadence | Monthly or quarterly |
| Bus factor | 5+ key maintainers |
| CII/OpenSSF badge | Gold or Silver |
| Test coverage | > 80% line coverage |

**Graduated CNCF projects (examples):**
- Kubernetes (graduated 2018)
- Prometheus (graduated 2018)
- Envoy (graduated 2018)
- CoreDNS (graduated 2019)
- containerd (graduated 2019)
- TiKV (graduated 2020)
- etcd (graduated 2021)
- CRI-O (graduated 2022)
- Argo (graduated 2022)
- Istio (graduated 2023)

### 2.3 GitHub Insights

GitHub provides several built-in analytics surfaces that every project should monitor.

#### Community Profile

Accessible at https://github.com/owner/repo/community.

A checklist-based score (0-100%) covering:
- **README** (present and informative)
- **CONTRIBUTING.md** (present and up-to-date)
- **Code of Conduct** (present, linked from README)
- **Issue templates** (bug report and feature request)
- **Pull request template** (present and used)
- **License** (OSI-approved, correctly detected)
- **Description** (repository description set)
- **Topics** (relevant tags applied)

**Scoring guide:**
| Score | Implication |
|-------|-------------|
| 90-100% | Excellent community standards |
| 70-89% | Good; minor gaps |
| 40-69% | Needs attention; missing critical elements |
| < 40% | Poor; significant barriers to participation |

**Impact of community profile scores on contributions (GitHub data):**
- Projects with scores > 80% receive 3x more first-time contributions
- Projects with issue templates see 40% more actionable bug reports
- Projects with PR templates see 30% faster review cycles

#### Dependency Graph

Available at https://github.com/owner/repo/network/dependencies.

Tracks:
- All direct and transitive dependencies
- Version information for each dependency
- Known vulnerability alerts (Dependabot)
- Dependency review on PRs

**Key metrics to monitor:**
| Metric | Action |
|--------|--------|
| Total dependencies (direct) | Keep under control; each dep is a risk surface |
| Total dependencies (transitive) | Review regularly; prune unused deps |
| Dependabot alerts (critical) | Resolve within 48 hours |
| Dependabot alerts (high) | Resolve within 1 week |
| Deprecated deps | Replace proactively |
| Unmaintained deps | Fork or replace |

#### Contributors Graph

Available at https://github.com/owner/repo/graphs/contributors.

Tracks:
- Commits per contributor over time
- Additions and deletions per contributor
- Aggregated contribution timeline

**Insights from the contributors graph:**
- **Inverted pyramid shape:** Healthy projects have many occasional contributors and few core
- **Flat line:** Project is stalled -- no new contributors
- **Concentration in one bar:** Bus factor risk; one person dominates
- **Gaps in timeline:** Periods of inactivity may indicate maintainer burnout

### 2.4 CRAN/Bioconductor Metrics (R Ecosystem)

For R packages hosted on CRAN or Bioconductor, several ecosystem-specific metrics apply.

#### CRAN Metrics

Install Count = CRAN download logs (available via cranlogs package)

Reverse Dependencies = Packages that import/depend on this package

| Metric | Source |
|--------|--------|
| Daily downloads | cranlogs::cran_downloads() |
| Monthly downloads | cranlogs::cran_downloads(when = "last-month") |
| Total downloads | cranlogs::cran_downloads(from = "2012-10-01") |
| Reverse depends | tools::dependsOnPkgs() |
| Reverse imports | CRAN website package page |
| Test coverage | covr::package_coverage() |
| Documentation quality | R CMD check results |

**CRAN health signals:**
- **R CMD check status:** Must pass on all platforms
- **NOTE count (new submissions):** Ideally 0; some are unavoidable
- **Maintainer responsiveness:** CRAN requires response within ~2 weeks for issues
- **Version maturity:** Packages with < 3 releases may lack stability

#### Bioconductor Metrics

Bioc Views = Category tags from Bioc Views system

Bioc Build Status = Build result across all platforms

Number of Vignettes = Long-form documentation count

| Metric | What It Measures |
|--------|-----------------|
| Build status (devel) | Whether the package works with the development branch |
| Build status (release) | Whether the package works with the release branch |
| Number of citations | Academic impact for bioinformatics packages |
| Number of vignettes | Documentation completeness |
| Installation success rate | Platform compatibility |

**Example: dplyr (CRAN, 2024)**
- Daily downloads: ~150,000
- Monthly downloads: ~4.5 million
- Total downloads: ~500 million+
- Reverse dependencies: ~6,000 packages
- Release frequency: ~3-4 releases/year

**Example: ggplot2 (CRAN, 2024)**
- Daily downloads: ~200,000
- Monthly downloads: ~6 million
- Total downloads: ~700 million+
- Reverse dependencies: ~8,000 packages

### 2.5 npm Downloads/Health Scores

The npm ecosystem provides several health metrics, both officially (npm) and through third-party services.

#### npm Download Stats

Daily Downloads = npm API: /downloads/point/last-day/package

Weekly Downloads = npm API: /downloads/point/last-week/package

Monthly Downloads = npm API: /downloads/point/last-month/package

**Access patterns:**
`
npm view <package> downloads
npm view <package> downloads --json
`

**Interpreting npm download counts:**
| Downloads/Month | Tier | Interpretation |
|-----------------|------|----------------|
| 100M+ | Ultra-popular | Top 0.01% of packages (lodash, chalk, react) |
| 10M-100M | Very popular | Top 0.1% (axios, express, uuid) |
| 1M-10M | Popular | Top 1% (most well-known utilities) |
| 100K-1M | Moderate | Niche but established |
| 10K-100K | Niche | Specialized function |
| 1K-10K | New/small | Recently published |
| < 1K | Minimal | New or obscure |

**Note on download inflation:** npm download counts include CI runs, mirror pulls, and
automated systems. Real human usage is typically 10-30% of reported download counts.

#### npm Health Scores (npms.io / Snyk)

Third-party services analyze packages for health:

| Factor | Weight (npms.io) | What It Measures |
|--------|-----------------|-----------------|
| Quality | 40% | CI passing, coverage, documentation, linting, license |
| Popularity | 35% | Downloads, stars, forks, dependents, contributor count |
| Maintenance | 25% | Commit frequency, issue response time, release recency |

**Typical scores by package type:**
| Package | Quality | Popularity | Maintenance | Overall |
|---------|---------|-----------|-------------|---------|
| express | 95 | 98 | 90 | 95 |
| lodash | 98 | 99 | 92 | 96 |
| chalk | 95 | 95 | 90 | 93 |
| left-pad | 85 | 40 | 60 | 62 |

#### npm Audit Signals

Vulnerability Severity Distribution = Count(Critical, High, Moderate, Low)

Remediation Rate = Fixed Vulnerabilities / Total Detected x 100

Security Debt = Sum of CVSS Scores Across All Vulnerabilities

Running npm audit provides:
- Number of vulnerabilities by severity
- Paths to each vulnerability (direct and transitive)
- Recommended fix or patch version

### 2.6 PyPI Download Statistics

Python packages on PyPI have several metrics and analysis tools.

#### PyPI Download Counts

Daily Downloads = API: https://pypistats.org/api/packages/{package}/recent

Monthly Downloads = BigQuery: bigquery-public-data.pypi.file_downloads

| Tool | Access Method | Granularity |
|------|--------------|-------------|
| PyPI Stats API | pypistats.org/api/ | Daily, weekly, monthly |
| Google BigQuery | Public dataset | Per-download (full detail) |
| pepy.tech | Web dashboard | Daily, monthly, charts |
| pypi-scan | CLI tool | Bulk queries |

**Interpretation guidelines (same inflation note as npm):**
| Monthly Downloads | Category |
|-------------------|----------|
| 500M+ | Ultra (pip, setuptools, requests, urllib3) |
| 50M-500M | Major (boto3, numpy, pandas, flask) |
| 5M-50M | Established (click, jinja2, pillow) |
| 500K-5M | Moderate (specialized libraries) |
| 50K-500K | Niche (domain-specific tools) |
| < 50K | Small/new |

**Example: requests (PyPI, 2024)**
- Daily downloads: ~45 million
- Monthly downloads: ~1.4 billion
- Total lifetime: ~100 billion+

#### PyPI Health Indicators

Freshness = Days Since Last Release

Python Version Support = Declared Python Versions in Trove Classifiers

Platform Support = Declared OS Support in Trove Classifiers

| Signal | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Last release | < 6 months | 6-12 months | > 12 months |
| Python version support | Latest 3 minor releases | 2 behind latest | 3+ behind |
| CI status | Passing | Intermittent failures | Broken |
| Issue tracker | Active | Slow responses | Abandoned |
| Package description | Comprehensive | Minimal | Missing |

#### PyPI Ecosystem Health Tools

| Tool | Function |
|------|----------|
| pip-audit | Scan dependencies for known CVEs |
| pypi-insiders | Early access to vulnerability reports |
| safety | Check packages against curated vulnerability DB |
| bandit | Security linter for Python code |
| dlint | Additional lint rules for security |

---

## Part 3: Bus Factor Calculation

### 3.1 Bus Factor Formula

The bus factor (also called truck factor or lottery factor) represents the minimum
number of contributors whose sudden unavailability would cause the project to stall or
become non-viable.

Formal Definition:
  Bus Factor = min{k : Sum(top k contributor contributions) > 0.5 x Total Contributions}
  OR (more conservatively)
  Bus Factor = min{k : Loss of top k contributors causes project to lose > 50% capacity}

**Alternative definitions from research:**

| Definition | Source | Formula |
|------------|--------|---------|
| Gini-based | CHAOSS | 1 - (2 x Area between Lorenz curve and diagonal) |
| Core contributor ratio | Gharehyazie et al. | Count of contributors with >= 5% of total commits |
| Singularity index | Azeem et al. | 1 - (Contributors with >= 5% / Total Contributors) |
| 50% threshold | Zazworka et al. | Minimum contributors accounting for 50% of commits |

**The Lorenz curve approach:**

1. Sort all contributors by contribution count descending
2. Plot cumulative contribution share vs. cumulative contributor count
3. The Gini coefficient quantifies inequality:
   G = (2 x Sum(i x y_i)) / (n x Sum(y_i)) - (n + 1) / n
   where y_i = contributions of the i-th contributor (sorted ascending)
4. Bus factor is the number of contributors needed to reach 50% of total contributions

| Gini Coefficient | Bus Factor | Interpretation |
|-----------------|------------|----------------|
| 0.0-0.3 | Many (8+) | Highly distributed; minimal bus risk |
| 0.3-0.5 | Moderate (4-7) | Some concentration; manageable |
| 0.5-0.7 | Low (2-3) | Heavy concentration; high risk |
| 0.7-0.9 | Critical (1-2) | Extreme concentration |
| 0.9-1.0 | Essentially 1 | Single maintainer project |

### 3.2 How to Calculate It

#### Method 1: Git-based Analysis (Simple)

`
# Count commits per author
git shortlog -sn

# Share of each contributor
git shortlog -sn | awk '{total+=; print } END {print "Total:", total}'

# Alternative: lines changed per author (more accurate for impact)
git log --format='%aN' | sort | uniq -c | sort -rn
`

**Contributor concentration by commit count vs. lines changed:**
| Contributor | Commits | % of Commits | Lines Changed | % of Lines | Risk Weight |
|-------------|---------|-------------|---------------|-----------|-------------|
| Alice | 4,521 | 45% | 350,000 | 52% | Critical |
| Bob | 2,300 | 23% | 120,000 | 18% | High |
| Charlie | 1,200 | 12% | 85,000 | 13% | Medium |
| Diana | 800 | 8% | 50,000 | 7% | Low |
| Others | 1,200 | 12% | 65,000 | 10% | Low |

**Bus factor calculation from this data:**
- Alice contributes 52% of lines changed (exceeds 50% threshold)
- Alice + Bob contribute 70% of lines changed
- Bus factor = 1 (loss of Alice alone exceeds the 50% threshold)

#### Method 2: Per-Subsystem Analysis

Different subsystems may have different bus factors. A project may have a bus factor of
5 overall, but a bus factor of 1 for a critical subsystem.

| Subsystem | Primary Maintainer | Backup | Bus Factor (Subsystem) |
|-----------|-------------------|--------|----------------------|
| Authentication | Alice | Bob | 2 |
| API Gateway | Bob | Charlie | 2 |
| Database Layer | Charlie | None | 1 (CRITICAL) |
| Frontend UI | Diana | Alice | 2 |
| Build/CI/CD | Bob | Diana | 2 |
| Documentation | Alice | Diana | 2 |

**Formula for weighted bus factor:**

Weighted Bus Factor = 1 / Sum(w_s / bf_s)

where w_s = importance weight of subsystem s, bf_s = bus factor of subsystem s.

If DB layer has 40% weight and bus factor 1, while other subsystems have 60% weight
and bus factor 2:

Weighted Bus Factor = 1 / (0.40/1 + 0.60/2) = 1 / (0.40 + 0.30) = 1 / 0.70 = 1.43

This indicates a bus factor of ~1, meaning the project is critically dependent on
Charlie maintaining the database layer.

#### Method 3: Knowledge-Based Assessment

Not all knowledge is captured in git. Conduct a knowledge audit:

| Knowledge Area | Known By | Documented? | Documentation Location |
|---------------|----------|-------------|----------------------|
| Deployment on AWS | Alice, Bob | Yes | /docs/deployment.md |
| CI/CD pipeline config | Bob | Partial | (Jenkinsfile only) |
| Database schema design | Charlie, Alice | No | (tribal knowledge) |
| Integration with Partner X | Alice | Yes | /docs/integrations/partner-x.md |
| Release process | Alice, Bob, Diana | Yes | /docs/release.md |
| Security review process | Charlie | No | (tribal knowledge) |

**Bus factor by knowledge area:**

Bus Factor = min(documentation exists ? count(known by) : 1)

For areas without documentation, knowledge only exists in people's heads, so bus factor
is effectively 1 regardless of how many people know it (they could all leave at once).

### 3.3 Mitigation Strategies

#### Code Reviews

Mandatory code reviews for all commits, especially in critical subsystems. The reviewer
serves as backup knowledge for the author.

- **Requirement:** At least one reviewer who understands the subsystem deeply
- **Goal:** Cross-train reviewers on at least 2 subsystems each
- **Metric:** Review coverage = PRs with at least 1 qualified reviewer / Total PRs x 100

#### Documentation

Write Architecture Decision Records (ADRs) for all significant design decisions.

| Documentation Type | Purpose | Storage |
|-------------------|---------|---------|
| ADRs | Architecture decisions | /docs/adr/ |
| Runbooks | Operational procedures | /docs/runbooks/ |
| API docs | Interface specifications | /docs/api/ |
| Onboarding guide | New contributor setup | CONTRIBUTING.md |
| Troubleshooting guide | Common issues | /docs/troubleshooting.md |

#### Pair Programming

Regular pair programming sessions between senior and junior contributors on critical
subsystems.

- **Goal:** Each critical subsystem has at least 2 contributors who understand it
- **Cadence:** Weekly sessions for high-risk areas
- **Metric:** Pair programming hours per subsystem per quarter

#### Rotation Program

Rotate maintainer responsibilities periodically to prevent knowledge silos.

- **Primary rotation:** Change primary reviewer assignments quarterly
- **On-call rotation:** Share incident response duties
- **Release manager rotation:** Rotate release responsibilities

### 3.4 Automated Tools

| Tool | Language | Methodology | Output |
|------|----------|------------|--------|
| git-bus-factor | Python | Git log analysis | Bus factor estimate per file |
| TruckFactor (GitHub) | JavaScript | GitHub API analysis | Truck factor for any repo |
| GrimoireLab | Python | Multi-source analytics | Contribution concentration charts |
| Augur | Python | CHAOSS metrics | Bus factor via Gini coefficient |
| CRAN: busfactor | R | Git log analysis | Bus factor for R packages |
| cargo-truck-factor | Rust | Git log + blame | Bus factor per crate |

**Using git-bus-factor:**

`
pip install git-bus-factor
git-bus-factor --repo /path/to/repo --output report.json
`

**Sample output:**
`json
{
  "repo": "myproject",
  "total_contributors": 47,
  "bus_factor": 2,
  "risk_level": "high",
  "critical_files": [
    {"path": "src/core/engine.go", "bus_factor": 1, "primary_author": "alice"},
    {"path": "src/api/handlers.go", "bus_factor": 1, "primary_author": "bob"}
  ],
  "recommendations": [
    "Cross-train a backup for src/core/engine.go (Alice is sole author of 85% of lines)",
    "Document the deployment process (Bob is the only person who understands it)"
  ]
}
`

### 3.5 Best Practices

- **Maintain a MAINTAINERS.md file:** List all maintainers and their areas of expertise
- **Define clear backup assignments:** Every maintainer should have at least one backup
- **Knowledge base documentation:** Create and maintain a searchable knowledge base
- **Record video walkthroughs:** For complex subsystems, record architecture walkthroughs
- **Cross-training sprints:** Dedicate one sprint per quarter to cross-training activities
- **Limit individual ownership:** No single person should be the sole owner of any file
- **Use CODEOWNERS:** Define backup owners for all critical files in CODEOWNERS
- **Regular bus factor audits:** Conduct bus factor assessment quarterly
- **Celebrate documentation improvements:** Reward contributors who document their work

#### Maintainer Backup Matrix

A template for tracking maintainer coverage:

| Area | Primary | Backup 1 | Backup 2 | Last Reviewed |
|------|---------|----------|----------|---------------|
| Core Engine | @alice | @bob | @charlie | 2025-Q1 |
| API Design | @bob | @diana | @alice | 2025-Q1 |
| Database | @charlie | @alice | -- | 2025-Q1 (NEEDS BACKUP) |
| Frontend | @diana | @eve | -- | 2025-Q1 |
| DevOps | @bob | @eve | -- | 2025-Q1 |
| Security | @charlie | -- | -- | 2025-Q1 (CRITICAL) |

### 3.6 Case Studies

#### Projects Killed by Bus Factor

**Case 1: left-pad (npm, 2016)**
One person (Azer Koculu) unpublishes 257 packages including left-pad, a dependency used
by thousands of projects including React, Babel, and npm itself. Bus factor was 1.
**Result:** Widespread internet infrastructure failures. npm changed its unpublish policy.

**Case 2: event-stream (npm, 2018)**
Original author hands off maintenance to a malicious actor. The package had a bus factor
of 1 and no code review process. The malicious actor injects cryptocurrency-stealing code.
**Result:** ~8 million downloads of the compromised version. npm improves security scanning.

**Case 3: curl's dependency crisis**
For years, Daniel Stenberg was essentially the sole maintainer of curl, one of the most
widely used software tools on the planet. Bus factor was effectively 1.
**Result:** curl gradually onboards additional maintainers. Now has ~10 active maintainers.
Daniel Stenberg steps back for medical leave in 2023 -- project survives because of this.

**Case 4: Kibana plugin ecosystem (~2020)**
Several popular Kibana plugins had single maintainers. When Elastic changes the plugin API,
maintainers can't keep up and abandon. Bus factor = 1 kills 20+ plugins in 6 months.

**Case 5: Log4j (2021)**
The Log4j project had a bus factor of 1-2 volunteer maintainers when Log4Shell (CVE-2021-44228)
was discovered. Maintainers were overwhelmed by the response.
**Result:** Industry-wide scramble. Apache Foundation steps in. Project now has dedicated
security team and more maintainers.

#### Projects That Recovered

**Case 1: Homebrew**
In 2017, Homebrew had critical bus factor issues with its CI/CD pipeline. Two maintainers
held all the deployment knowledge.
**Mitigation:** Documented deployment process, added 5 new maintainers, created runbooks.
**Current state:** Bus factor of 8+, healthy maintainer rotation.

**Case 2: Docker**
Docker Inc. layoffs in 2023 put Docker Desktop and Docker Engine at risk. Community and
CNCF helped redistribute maintainer responsibilities.
**Mitigation:** Moved critical components to CNCF, diversified maintainers, expanded
CODEOWNERS coverage. Docker Engine now has bus factor of 5+.

**Case 3: Kubernetes (kube-up)**
The kube-up deployment system had a bus factor of 2 for years. When key maintainers left
Google, the community documented the system and created migration paths.
**Mitigation:** Created kubeadm as replacement, documented kube-up internals, cross-trained
at KubeCon Contributor Summits.

---

## Part 4: Contributor Retention Analytics

### 4.1 Cohort Analysis

Cohort analysis tracks groups of contributors who joined in the same period and measures
their retention over time. This is one of the most powerful analytics techniques for
understanding community health.

#### First-Year Retention Rate

First-Year Retention Rate = Contributors Active in Month 12 / Contributors Who Joined in Month 0

| Retention Rate | Assessment |
|---------------|------------|
| > 50% | Excellent; highly sticky community |
| 30-50% | Good; above average for OSS |
| 15-30% | Average; typical for most OSS projects |
| 5-15% | Below average; retention issues |
| < 5% | Critical; community is hemorrhaging contributors |

**Industry benchmarks (GitHub Octoverse, 2024):**
- Median first-year retention across all OSS: ~18%
- Top quartile projects: ~35%
- Top 10% projects: > 45%
- Enterprise/internal projects: ~40-55%
- Academic/open-research projects: ~12-18%

#### Second-Year Retention Rate

Second-Year Retention Rate = Contributors Active in Month 24 / Contributors Still Active in Month 12

| Retention Rate | Assessment |
|---------------|------------|
| > 70% | Excellent; strong core community |
| 50-70% | Good |
| 30-50% | Average; some attrition of established contributors |
| < 30% | Problematic; experienced contributors are leaving |

**Reference data:**
- **Rust:** ~65% second-year retention of first-year survivors
- **Kubernetes:** ~55% second-year retention
- **VS Code:** ~60% second-year retention
- **Django:** ~50% second-year retention

#### Cohort Retention Table Template

| Cohort | M0 | M1 | M3 | M6 | M12 | M24 |
|--------|----|----|----|----|-----|-----|
| 2024 Q1 | 50 | 25 | 15 | 10 | 8 | -- |
| 2024 Q2 | 45 | 22 | 14 | 9 | 7 | -- |
| 2024 Q3 | 60 | 30 | 18 | 12 | -- | -- |
| 2024 Q4 | 55 | 28 | 16 | -- | -- | -- |
| 2025 Q1 | 70 | 35 | -- | -- | -- | -- |

**Analysis interpretation:**
- All cohorts show ~50% drop in first month (normal)
- Month 1-3 drop is ~40% of remaining (common)
- After month 6, attrition slows significantly (committed contributors remain)
- If any cohort shows significantly worse retention, investigate (e.g. major API change, maintainer conflict)

### 4.2 Leaky Bucket Metrics

The leaky bucket model tracks drop-off at each stage of the contributor pipeline:

Contributor Funnel = Raw Traffic -> Creates Issue -> Comments -> Opens PR -> Gets Reviewed
                      -> PR Merged -> Returns for Second PR

#### Funnel Drop-off Rates (Industry Benchmarks)

| Stage Transition | Median Drop-off | Top Quartile Drop-off |
|-----------------|----------------|----------------------|
| Opened Issue -> First Comment | 40% | 25% |
| First Comment -> Opened PR | 60% | 40% |
| Opened PR -> First Review | 25% | 10% |
| First Review -> Merged | 30% | 15% |
| Merged -> Second PR | 65% | 40% |

**Cumulative retention through the funnel:**

Only ~8% of people who open an issue will ever get a second PR merged
(0.60 x 0.40 x 0.75 x 0.70 x 0.35 = 0.044 or 4.4% for median;
0.75 x 0.60 x 0.90 x 0.85 x 0.60 = 0.206 or 20.6% for top quartile)

#### Diagnosis by Drop-off Location

| Stage with High Drop-off | Likely Issue |
|-------------------------|-------------|
| Issue -> Comment | Project is unwelcoming or issues are ignored |
| Comment -> PR | Barriers to contribution are too high |
| PR -> Review | No maintainer capacity to review |
| Review -> Merge | Bottleneck at merge stage; quality standards unclear |
| Merge -> Second PR | First experience was painful |

### 4.3 Time-to-First-Commit Benchmarking

Time-to-first-commit measures how long it takes a new contributor to go from first
interaction to having code merged into the project.

TTFC = Merge Timestamp of First PR - Account Creation Timestamp (or First Interaction)

**Industry benchmarks:**

| TTFC Range | Percentage of Contributors | Quality of Experience |
|------------|---------------------------|----------------------|
| < 1 day | 15% | Excellent; usually drive-by bug fixes |
| 1-7 days | 25% | Good; responsive project |
| 1-4 weeks | 30% | Average; some friction |
| 1-3 months | 20% | Below average; high friction |
| 3+ months | 10% | Poor; likely won't contribute again |

**What affects TTFC:**

| Factor | Impact on TTFC |
|--------|---------------|
| Good first issue labels | -60% TTFC reduction |
| Issue templates | -30% TTFC reduction |
| CONTRIBUTING.md present | -45% TTFC reduction |
| CI pipeline automated | -25% TTFC reduction |
| First response within 24h | -55% TTFC reduction |
| Assigned mentor | -70% TTFC reduction |

### 4.4 Review Responsiveness and Retention Correlation

There is a strong, well-documented correlation between how fast a project responds to
contributors and whether those contributors return.

#### Data from CHAOSS Research (2023-2024)

| First Response Time | Probability of Second Contribution |
|--------------------|-----------------------------------|
| < 1 hour | 65% |
| 1-4 hours | 58% |
| 4-12 hours | 52% |
| 12-24 hours | 45% |
| 24-72 hours | 32% |
| 3-7 days | 18% |
| 1-2 weeks | 10% |
| > 2 weeks | 4% |

**The correlation curve:**
Retention probability drops sharply after the 24-hour mark. Every additional day beyond
24 hours reduces retention probability by approximately 40%.

#### Time to Merge Correlation

| Time to Merge | First-Timer Return Rate |
|--------------|------------------------|
| < 1 day | 55% |
| 1-3 days | 48% |
| 4-7 days | 40% |
| 1-2 weeks | 30% |
| 2-4 weeks | 18% |
| 1-2 months | 10% |
| > 2 months | 3% |

**Cumulative effect:**
A project with 24-hour first response and 7-day merge time retains approximately 40%
of first-time contributors. A project with 72-hour response and 30-day merge time
retains approximately 10%.

### 4.5 Repeat Contributor Rate

The percentage of first-time contributors who come back to make at least one more
contribution.

Repeat Contributor Rate = Contributors with >= 2 Contributions / First-Time Contributors

| Rate | Assessment |
|------|------------|
| > 40% | Excellent; highly engaging community |
| 25-40% | Good |
| 15-25% | Average |
| 5-15% | Below average |
| < 5% | Critical |

**Reference data from major projects:**
| Project | Repeat Contributor Rate |
|---------|----------------------|
| Kubernetes | ~35% |
| VS Code | ~40% |
| React | ~45% |
| TensorFlow | ~25% |
| Rust | ~38% |
| Django | ~42% |
| Homebrew | ~50% |

### 4.6 Top 10% Contributor Analysis

Measuring how dependent a project is on its top contributors.

Top 10% Contribution Share = Contributions from Top 10% / Total Contributions x 100

| Share | Dependency Level |
|-------|-----------------|
| < 30% | Healthy; well-distributed work |
| 30-45% | Moderate dependency |
| 45-60% | Heavy dependency; at risk |
| > 60% | Critical; project is reliant on very few people |

**Lorenz curve and Gini coefficient for top 10%:**

The share of contributions made by the top 10% of contributors in various projects:

| Project | Top 10% Share of Commits | Gini Coefficient |
|---------|-------------------------|-----------------|
| Linux kernel | ~35% | 0.42 |
| Kubernetes | ~40% | 0.48 |
| Node.js | ~50% | 0.56 |
| curl | ~80% | 0.72 |
| Redis (antirez era) | ~85% | 0.78 |
| Left-pad | ~100% | 1.0 |

**Action threshold:** If top 10% share exceeds 50%, implement a knowledge transfer
program to reduce concentration.

### 4.7 Community Churn Rate

Community churn measures how many active contributors the project is gaining vs. losing.

Quarterly Active Contributors = Contributors with at least 1 contribution in the quarter

Quarterly Lost Contributors = Contributors active last quarter but NOT active this quarter

Churn Rate = Lost This Quarter / Active Last Quarter x 100

Net Growth Rate = (New This Quarter - Lost This Quarter) / Active Last Quarter x 100

| Churn Rate | State |
|-----------|-------|
| < 10% | Very stable core community |
| 10-20% | Normal churn for growing projects |
| 20-35% | Elevated; should investigate causes |
| 35-50% | High; community may be shrinking |
| > 50% | Critical churn; sustainability crisis |

**Real project data:**
| Project | Quarterly Churn | Net Growth |
|---------|----------------|------------|
| Kubernetes | ~15% | +5% |
| VS Code | ~12% | +8% |
| Homebrew | ~10% | +3% |
| TensorFlow | ~22% | -2% (declining) |
| curl | ~8% | +1% |

**Churn decomposition by contributor tenure:**

| Tenure | Churn Rate | Risk Factor |
|--------|-----------|-------------|
| 0-3 months (newcomers) | 60-80% | Natural attrition; most don't stay |
| 3-12 months (developing) | 25-40% | Some loss of developing contributors |
| 1-2 years (established) | 10-20% | Low; these are committed contributors |
| 2+ years (core) | 5-10% | Very low; loss here is a crisis |

---

## Part 5: Code Quality Metrics

### 5.1 Static Analysis Findings

#### Linting Pass Rate

Lint Pass Rate = Files Passing Linter / Total Files Checked x 100

| Pass Rate | Quality Level |
|-----------|--------------|
| 99-100% | Excellent; CI should enforce this |
| 90-98% | Good; minor violations |
| 75-89% | Fair; several violations to address |
| 50-74% | Poor; significant style inconsistency |
| < 50% | Critical; codebase needs reformatting |

**Best practice:** Use pre-commit hooks and CI gates to enforce linting. Aim for 100%
pass rate on every PR.

#### Type Checking Pass Rate

Type Check Pass Rate = Modules Passing Type Check / Total Modules x 100

| Pass Rate | Quality Level |
|-----------|--------------|
| 100% | Excellent (should be the minimum) |
| 90-99% | Good; some untyped code |
| 75-89% | Fair; significant type issues |
| < 75% | Poor; types provide little value |

**Language-specific tools:**
| Language | Type Checker | Integration |
|----------|-------------|-------------|
| Python | mypy, pyright, pytype | CI via pre-commit or tox |
| TypeScript | tsc --noEmit | CI via npm test |
| Rust | rustc (built-in) | Cargo build |
| Go | go vet | CI via go test |
| Java | javac, Checker Framework | Maven/Gradle plugins |
| C/C++ | clang-tidy, clang analyzer | CMake integration |

#### Security Scanning Pass Rate

Security Scan Pass Rate = Checks Passing / Total Security Checks x 100

| Pass Rate | Risk Level |
|-----------|------------|
| 100% | No known vulnerabilities |
| 90-99% | Low-risk issues identified |
| 75-89% | Moderate security concerns |
| 50-74% | High-risk issues need immediate attention |
| < 50% | Critical security posture |

**Common security scanning tools:**

| Tool | What It Scans | Cadence |
|------|--------------|---------|
| Dependabot | Dependency vulnerabilities | Daily |
| Snyk | Dependency + code vulnerabilities | Per PR |
| CodeQL | Code vulnerabilities (semantic) | Per PR |
| SonarQube | Code quality + security hotspots | Per PR |
| Trivy | Container + dependency CVEs | Per commit |
| Semgrep | Custom security rules | Per PR |
| Bandit (Python) | Python security issues | Per commit |
| cargo-audit (Rust) | Rust dependency vulnerabilities | Per commit |

### 5.2 Test Coverage

#### Line Coverage

Line Coverage = Lines Executed by Tests / Total Executable Lines x 100

| Line Coverage | Assessment |
|--------------|------------|
| > 90% | Excellent |
| 75-90% | Good |
| 50-75% | Fair |
| 25-50% | Poor |
| < 25% | Critical |

**Reference data from major projects:**
| Project | Line Coverage | Language |
|---------|--------------|----------|
| pytest | 95% | Python |
| pandas | 92% | Python |
| Django | 89% | Python |
| curl | 86% | C |
| Redis | 47% | C |
| Linux kernel | ~15% | C |

**Note:** Line coverage alone can be misleading. High coverage can still miss critical
edge cases. Combine with branch coverage and mutation testing.

#### Branch Coverage

Branch Coverage = Branches Exercised / Total Branches x 100

| Branch Coverage | Assessment |
|----------------|------------|
| > 85% | Excellent |
| 70-85% | Good |
| 50-70% | Fair |
| 25-50% | Poor |
| < 25% | Critical |

**How branch coverage differs from line coverage:**
- Line coverage: "Did this line execute?"
- Branch coverage: "Did both the true and false branches execute?"

A function with 100% line coverage might only exercise 50% of branches if all
conditional paths take the same direction.

#### Mutation Testing Score

Mutation testing introduces small changes (mutations) to source code and checks whether
tests detect them.

Mutation Score = Killed Mutations / Total Mutations x 100

| Mutation Score | Test Effectiveness |
|---------------|-------------------|
| > 90% | Excellent; tests catch subtle bugs |
| 75-90% | Good; most regressions caught |
| 50-75% | Fair; some weak test assertions |
| 25-50% | Poor; many tests don't verify behavior |
| < 25% | Critical; tests provide little value |

**Tools by language:**
| Language | Mutation Testing Tool |
|----------|---------------------|
| Python | mutmut, cosmic-ray |
| JavaScript/TypeScript | Stryker |
| Java | PIT |
| Go | go-mutesting |
| Rust | cargo-mutants |
| C/C++ | Mull |
| Ruby | mutant |

### 5.3 Code Complexity

#### Cyclomatic Complexity

Cyclomatic complexity measures the number of linearly independent paths through code.

Cyclomatic Complexity = E - N + 2P

where E = number of edges, N = number of nodes, P = number of connected components.

| Complexity | Risk | Interpretation |
|-----------|------|----------------|
| 1-5 | Low | Simple function, easy to test |
| 6-10 | Moderate | Moderately complex, needs care |
| 11-20 | High | Complex; consider refactoring |
| 21-50 | Very High | High risk; should definitely refactor |
| 50+ | Extreme | Untestable; must refactor immediately |

**Project-level cyclomatic complexity metrics:**

Average Complexity = Sum of All Function Complexities / Total Functions

Max Complexity = Maximum Cyclomatic Complexity Across All Functions

% of Functions with Complexity > 10 = High Complexity Count / Total Functions x 100

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Average complexity | < 5 | 5-10 | > 10 |
| Max complexity | < 20 | 20-50 | > 50 |
| % above 10 | < 5% | 5-15% | > 15% |

#### Cognitive Complexity

Cognitive complexity measures how hard code is to understand (not just cyclomatic paths).

Factors include:
- Nesting depth
- Boolean operators
- Recursion
- Break/continue in loops
- Catch blocks

| Cognitive Complexity | Understandability |
|---------------------|------------------|
| 0-5 | Trivially understandable |
| 6-10 | Easy to understand |
| 11-20 | Moderate effort to understand |
| 21-40 | Hard to understand |
| 41+ | Very hard; must refactor |

#### Maintainability Index

The maintainability index is a composite score (0-100) based on:

MI = 171 - 3.42 x ln(Halstead Volume) - 0.23 x ln(Cyclomatic Complexity)
     - 16.2 x ln(Lines of Code)

Adjusted for modern languages: MI = max(0, MI_original x 100 / 171)

| Score | Maintainability |
|-------|----------------|
| 85-100 | Highly maintainable |
| 65-85 | Moderately maintainable |
| 40-65 | Somewhat difficult to maintain |
| 0-40 | Extremely difficult to maintain |

### 5.4 Dependency Freshness

#### Outdated Dependencies

Outdated Dependency Ratio = Packages Behind Latest Major Version / Total Packages x 100

| Ratio | Action |
|-------|--------|
| < 5% | On top of updates |
| 5-15% | Schedule regular update sprints |
| 15-30% | Significant catching up needed |
| > 30% | Deep dependency debt |

**Tools by ecosystem:**
| Ecosystem | Freshness Tool | Key Metric |
|-----------|---------------|------------|
| npm | npm outdated, npm-check-updates | Major/minor/patch behind |
| Python | pip list --outdated, pip-audit | Version delta |
| Rust | cargo outdated | Semver violations |
| Java/Gradle | Gradle Versions Plugin | Available updates |
| Go | go list -u -m all | Updates available |
| Ruby | bundle outdated | Gem version delta |

#### Deprecation Warnings

Deprecation Warning Count = Warnings Emitted During Test/CI Run

| Count | Assessment |
|-------|------------|
| 0 | Clean; no deprecated APIs used |
| 1-5 | Minor; plan to update |
| 5-50 | Moderate; technical debt accumulating |
| 50-500 | High; urgent cleanup needed |
| 500+ | Critical; likely broken on next version bump |

#### Known CVEs

CVE Count = Dependencies with Known Vulnerabilities

CVE Severity Score = Sum of CVSS Scores for All Open CVEs

Max Severity = Highest CVSS Score Among Open CVEs

| Max CVSS | Severity | Action Window |
|----------|----------|--------------|
| 9.0-10.0 | Critical | 48 hours |
| 7.0-8.9 | High | 7 days |
| 4.0-6.9 | Moderate | 30 days |
| 0.1-3.9 | Low | 90 days |

### 5.5 Technical Debt Ratio

Technical Debt Ratio = Estimated Effort to Fix All Issues / Total Development Effort to Rebuild x 100

| Ratio | Assessment |
|-------|------------|
| < 5% | Low technical debt; healthy codebase |
| 5-15% | Manageable; normal for active projects |
| 15-30% | Significant debt; needs dedicated reduction effort |
| 30-50% | High debt; quality issues affecting productivity |
| > 50% | Critical debt; likely need a rewrite of major components |

**SonarQube's Technical Debt estimation:**

For each issue found by static analysis:
- Blocker: ~1 day to fix
- Critical: ~4 hours
- Major: ~1 hour
- Minor: ~30 minutes
- Info: ~15 minutes

Technical Debt (developer-days) = Sum of Estimated Fix Times

**Reference data:**
| Project | Technical Debt Ratio | Lines of Code | Estimated Debt |
|---------|--------------------|---------------|----------------|
| Apache Hadoop | ~15% | ~1.5M | ~200 dev-days |
| WordPress | ~8% | ~600K | ~50 dev-days |
| Kubernetes | ~12% | ~4M | ~400 dev-days |
| curl | ~3% | ~170K | ~5 dev-days |

### 5.6 Code Churn

Code churn measures how frequently files change and which parts of the codebase are
most volatile.

File Churn = Number of Commits Modifying File in Period

Churn Rate = Files Changed / Total Files / Period

| Churn Rate | Volatility |
|-----------|------------|
| < 1% | Stable; rarely changed |
| 1-5% | Normal; active development |
| 5-15% | Highly volatile; active refactoring area |
| > 15% | Extremely volatile; likely problematic |

**Hotspot Analysis (Churn + Complexity):**

High churn + high complexity = hotspots that need refactoring.
High churn + low complexity = active but stable areas.
Low churn + high complexity = dormant risk areas.

| | Low Complexity | High Complexity |
|--|---------------|-----------------|
| **Low Churn** | Safe zone | Sleeping dragon (refactor before touching) |
| **High Churn** | Active development | HOTSPOT (immediate refactoring needed) |

**Example hotspot analysis (real data from a mid-sized project):**
| File | Churn (edits/month) | Complexity | Priority |
|------|--------------------|------------|----------|
| src/parser.ts | 3 | 45 | HIGH (hotspot) |
| src/renderer.ts | 2 | 12 | LOW |
| src/api.ts | 4 | 8 | LOW |
| src/auth.ts | 0.2 | 55 | MEDIUM (dormant risk) |
| src/core.ts | 5 | 38 | URGENT (extreme hotspot) |

### 5.7 API Stability Metrics

#### Public API Surface Changes per Release

API Change Count = (New Public Symbols + Modified Signatures + Deprecated Symbols +
                    Removed Symbols) / Release

| Changes per Release | Stability |
|--------------------|-----------|
| 0-10 | Very stable; mature API |
| 10-50 | Moderate; active but controlled |
| 50-200 | Active development; expect changes |
| 200+ | Unstable; breaking changes frequent |

**SemVer compliance metric:**

SemVer Compliance = Releases Following SemVer / Total Releases x 100

| Compliance Rate | Confidence |
|----------------|------------|
| 100% | Fully SemVer compliant |
| 80-99% | Mostly compliant; occasional breaks |
| 50-79% | Inconsistent; trust but verify |
| < 50% | Non-compliant; pin versions carefully |

#### Deprecation Rate

Deprecation Rate = Symbols Deprecated / Total Public API Symbols x 100 per Release

| Rate | Meaning |
|------|---------|
| < 1% | Gradual evolution |
| 1-5% | Active deprecation cycle |
| 5-10% | Major cleanup in progress |
| > 10% | API instability; potential migration pain |

**Best practice deprecation policy:**
1. Announce deprecation at least one major version before removal
2. Provide migration guides for all deprecated APIs
3. Keep deprecated APIs functional for at least 6 months after deprecation notice
4. Use deprecation warnings with clear migration paths
5. Track deprecation warning adoption (acceptable vs. testing in CI)

---

## Part 6: Measuring Impact & Value

### 6.1 Downstream Dependents

The number of projects that depend on yours is one of the strongest signals of your
project's value to the ecosystem.

#### Measuring Downstream Impact

Direct Dependents = Projects that explicitly list your project as a dependency

Transitive Dependents = Projects that depend on projects that depend on yours

Total Dependent Tree = Sum of all projects in the dependency tree that include yours

**Data sources:**
| Source | Coverage | Update Frequency |
|--------|----------|-----------------|
| GitHub Dependency Graph | GitHub-hosted repos | Daily |
| libraries.io | Cross-ecosystem (npm, PyPI, Maven, etc.) | Weekly |
| Ecosystem-specific: npm, PyPI, crates.io, RubyGems | Package registries | Real-time |

**Dependency depth analysis:**

Shallow Dependency = Project A imports your library directly

Deep Dependency = Project Z imports Project Y, which imports... which imports your library

A project with many deep dependencies has more ecosystem impact but may be unknown to
those downstream users. This creates a "hidden criticality" effect.

**The hidden criticality effect:**

A library that is 4 levels deep in the dependency tree might be critical to thousands
of projects that have no idea they depend on it. This was the case with:
- left-pad (5 levels deep in React's dependency tree)
- is-promise (12 levels deep in npm's dependency tree)
- log4j (3-4 levels deep in Java dependency trees)

### 6.2 Adoption Signals

#### Composite Adoption Score

A single score combining multiple adoption indicators, normalized against similar projects.

Raw Score = w1 x Downloads_Percentile + w2 x Stars_Percentile + w3 x Forks_Percentile +
             w4 x Dependents_Percentile + w5 x Contributors_Percentile

| Weight | Indicator | Rationale |
|--------|-----------|-----------|
| 30% | Downloads | Most direct measure of usage |
| 20% | Stars | Star-to-download ratio reveals engagement |
| 15% | Dependents | Ecosystem integration |
| 15% | Contributors | Community investment |
| 10% | Forks | Forks are weaker signal (many are unmodified clones) |
| 10% | Docker pulls | If containerized deployment is relevant |

#### Star-to-Download Ratio

Stars / Downloads (per period)

| Ratio | Interpretation |
|-------|---------------|
| > 0.01 | Very high engagement; likely developer-facing |
| 0.001-0.01 | Good engagement |
| 0.0001-0.001 | Average; typical for most projects |
| < 0.0001 | Low engagement; utility/library used without enthusiasm |

**Examples:**
- **Next.js:** ~180K stars, ~18M monthly npm downloads => ratio = 0.01 (excellent)
- **lodash:** ~60K stars, ~80M monthly downloads => ratio = 0.00075 (average)
- **React:** ~230K stars, ~70M monthly downloads => ratio = 0.003 (good)
- **chalk:** ~22K stars, ~300M monthly downloads => ratio = 0.00007 (low; it's a utility)

**What affects the ratio:**
- Developer-facing tools get more stars per download than end-user facing tools
- Newer projects have higher ratios (early adopters are more engaged)
- Viral/meme projects have inflated ratios

#### Docker Pulls

For projects distributed as Docker images:

Docker Pull Rate = Pulls per Day / Unique IPs per Day (estimated)

Active Deployments = Monthly Active IPs Pulling the Image

| Monthly Pulls | Adoption Level |
|--------------|---------------|
| 10M+ | Massive; ubiquitous infrastructure |
| 1M-10M | Very high; widely deployed |
| 100K-1M | High; significant adoption |
| 10K-100K | Moderate; established user base |
| 1K-10K | Low; early adoption |
| < 1K | Minimal |

#### Package Manager Install Counts

Combined install counts across all package managers where the project is distributed.

| Ecosystem | Registry | Metric |
|-----------|----------|--------|
| JavaScript | npm | Weekly downloads |
| Python | PyPI | Daily/monthly downloads |
| Rust | crates.io | Total downloads |
| Java | Maven Central | Monthly downloads |
| Go | pkg.go.dev | Module version downloads |
| Ruby | RubyGems | Total downloads |
| R | CRAN | Monthly downloads |
| C/C++ | vcpkg, conan | Package downloads |
| .NET | NuGet | Download count |
| PHP | Packagist | Monthly installs |

### 6.3 Community Growth

#### New Contributors per Quarter

New Contributor Rate = First-Time Contributors / Quarter

| Rate (for a mid-size project) | Assessment |
|------------------------------|------------|
| 50+ | Rapidly growing community |
| 20-50 | Healthy growth |
| 10-20 | Moderate growth |
| 5-10 | Slow growth |
| 1-5 | Minimal new contributors |
| 0 | No new blood; project is dying |

#### Returning Contributors per Quarter

Returning Rate = Contributors Active Both This Quarter and Last Quarter /
                Contributors Active Last Quarter x 100

| Rate | Assessment |
|------|------------|
| > 70% | Very sticky; highly engaged |
| 50-70% | Healthy retention |
| 30-50% | Normal for most projects |
| 15-30% | Concerning; many one-off contributors |
| < 15% | Crisis; no ongoing contributor base |

#### Forum/Community Signups

For projects with a community platform (Discord, Discourse, Slack, GitHub Discussions):

Signup Growth Rate = (New Signups This Month - New Signups Last Month) / New Signups Last Month x 100

Active Participation Rate = Active Users / Total Registered Users x 100

| Participation Rate | Community Health |
|-------------------|-----------------|
| > 20% | Highly engaged |
| 10-20% | Good engagement |
| 5-10% | Average |
| 2-5% | Low engagement; mostly lurkers |
| < 2% | Dead community |

### 6.4 Ecosystem Value

#### Infrastructure vs. Application Classification

How your project fits into the software ecosystem determines how its value should
be measured.

| Category | Description | Value Metric | Examples |
|----------|------------|-------------|----------|
| Infrastructure | Underlying systems that others depend on | Downstream dependents, ecosystem penetration | Linux, curl, OpenSSL, gRPC |
| Framework | Structure for building applications | Ecosystem size, plugin ecosystem | React, Django, Spring |
| Library | Reusable components | Download counts, dependents | lodash, requests, serde |
| Tool | Developer productivity | User adoption, star-to-download ratio | ESLint, Prettier, Docker |
| Application | End-user facing product | Direct users, satisfaction scores | VS Code, WordPress |
| Specification | Standards and protocols | Implementations, compliance | OpenAPI, GraphQL, OAuth |

#### Economic Value Estimation

Several methods to estimate the economic value of an OSS project:

**Method 1: Replacement Cost (COCOMO-based)**

Using the Constructive Cost Model (COCOMO):

Effort = A x (Size)^B x EAF

where:
- A = 2.94 (for organic projects), 3.0 (semi-detached), 3.6 (embedded)
- Size = estimated lines of code in thousands (KLOC)
- B = 1.05 (organic), 1.12 (semi-detached), 1.20 (embedded)
- EAF = Effort Adjustment Factor (typically 1.0-1.5)

Then:
Replacement Cost = Effort (person-months) x Average Developer Salary / Month

**Example: curl**
- Size: ~170K LOC C
- Mode: Semi-detached -> Effort = 3.0 x (170)^1.12 = ~800 person-months
- At /month developer cost: ~ replacement value

**Example: Redis**
- Size: ~230K LOC C
- Mode: Semi-detached -> Effort = 3.0 x (230)^1.12 = ~1,100 person-months
- At /month developer cost: ~.5M replacement value

**Example: Kubernetes**
- Size: ~4M LOC Go
- Mode: Embedded -> Effort = 3.6 x (4000)^1.20 = ~25,000 person-months
- At /month developer cost: ~ replacement value

**Method 2: Maintainer Hour Valuation**

Annual Value = Monthly Active Maintainer Hours x Hourly Rate x 12

| Project | Active Maintainers | Hours/Month/Maintainer | Est. Hourly Rate | Annual Value |
|---------|-------------------|----------------------|------------------|-------------|
| curl | 10 | 40 |  | ,000 |
| Redis Labs | 15 | 80 |  | ,160,000 |
| Kubernetes | ~50 | 60 |  | ,400,000 |
| SQLite | 3 | 160 |  | ,152,000 |
| Python | ~40 | 30 |  | ,160,000 |

**Method 3: Downstream Cost Avoidance**

Value = Sum of (Dependent Projects x Cost to Build Equivalent)

If 100,000 projects depend on your library and it would take each an average of
5 developer-days to build equivalent functionality:

Value = 100,000 x 5 x /day (loaded cost) = 

### 6.5 Non-Code Contributions

The value of non-code contributions is often overlooked but is critical for project
sustainability.

#### Contribution Types by Value

| Contribution Type | Measurable Effort | Value Signal |
|------------------|------------------|--------------|
| Documentation | Words written, pages created | Reduced support burden, improved onboarding |
| Code Review | Reviews conducted, comments provided | Quality improvement, knowledge transfer |
| Issue Triage | Issues triaged per week | Maintainer capacity multiplier |
| Community Support | Questions answered, threads resolved | User satisfaction, retention |
| Mentoring | Mentoring hours, mentees graduated | New contributor pipeline |
| Translation | Words translated, languages added | Global reach increase |
| Design | Mockups, UX research, prototypes | Product quality improvement |
| Security Research | Vulnerabilities discovered and reported | Trust and safety |
| Governance | Meeting facilitation, consensus building | Project sustainability |
| Advocacy | Conference talks, blog posts, tutorials | Ecosystem awareness |

#### Non-Code to Code Ratio

Non-Code Contribution Ratio = Non-Code Contributors / Total Contributors x 100

| Ratio | Assessment |
|-------|------------|
| > 50% | Healthy community with diverse participation |
| 30-50% | Some non-code activity |
| 10-30% | Code-focused; limited community infrastructure |
| < 10% | Highly code-centric; documentation and support likely lacking |

**Best practice:** Track and recognize all contribution types, not just code commits.
GitHub's all-contributors bot (allcontributors.org) is one way to do this.

### 6.6 Economic Value Estimation (Detailed Framework)

A comprehensive framework for estimating the economic value of an OSS project:

#### Direct Value Components

| Component | Estimation Method | Example (PostgreSQL) |
|-----------|------------------|---------------------|
| Development cost saved | COCOMO model | ~ to rebuild |
| Deployment cost saved | Hours saved by millions of users | ~/year (adoption avoided costs) |
| Training cost saved | Estimated hours for new users | ~/year avoided training |
| Migration cost avoided | Cost to switch to alternative | ~ (high switching cost) |

#### Indirect Value Components

| Component | Estimation Method |
|-----------|------------------|
| Innovation enablement | Revenue generated by companies using the project |
| Ecosystem multiplier | Value created by companies in the project ecosystem |
| Talent development | Skills developed by contributing to the project |
| Standards influence | Competitive advantage from shaping industry standards |

#### Ecosystem Multiplier

Ecosystem Value = Direct Project Value x Ecosystem Multiplier

| Ecosystem Position | Multiplier | Rationale |
|-------------------|------------|-----------|
| Commodity library | 3-5x | Base value + avoidance of proprietary lock-in |
| Standard/convention | 5-10x | Network effects from widespread adoption |
| Platform/ecosystem | 10-50x | Value of all companies built on the platform |
| Infrastructure layer | 50-100x | Enables massive economic activity (e.g., Linux, TCP/IP) |

**Example: Linux Kernel**
- Direct replacement cost: ~ billion (using David A. Wheeler's 2002 estimate, inflation-adjusted)
- Ecosystem multiplier: Infrastructure layer (50x)
- Estimated ecosystem value:  x 50 = 
- Actual estimated economic impact: In the trillions when considering all companies built on Linux

---

## Part 7: Tools & Dashboards

### 7.1 GitHub Analytics

GitHub provides free built-in analytics for all public repositories.

#### Traffic Analytics

Available at: https://github.com/owner/repo/graphs/traffic

**Clone graph:**
| Metric | What It Tells You |
|--------|------------------|
| Daily clones | Raw interest; correlated with release activity |
| Unique cloners | Approximate number of distinct developers |
| Clone peak patterns | Release activity or viral attention |

**Visitor graph:**
| Metric | What It Tells You |
|--------|------------------|
| Daily visitors | Page views; correlated with issues/PRs activity |
| Referrer sources | Where traffic comes from (search, social, direct) |
| Popular content | Which pages are most viewed in the repository |

**Traffic benchmarks:**
| Repo Size | Daily Unique Visitors | Daily Unique Clones |
|-----------|---------------------|-------------------|
| Small (< 1K stars) | 10-100 | 5-50 |
| Medium (1K-10K stars) | 100-1000 | 50-500 |
| Large (10K-100K stars) | 1000-10000 | 500-5000 |
| Mega (100K+ stars) | 10,000-100,000+ | 5000-50000+ |

#### Dependency Graph

Available at: https://github.com/owner/repo/network/dependencies

Features:
- **Dependency graph:** Visualizes all direct and transitive dependencies
- **Dependents:** Shows projects that depend on this repo
- **Dependabot alerts:** Automated vulnerability notifications
- **Dependency review:** PR diff shows dependency changes with vulnerability context

### 7.2 CHAOSS GrimoireLab

GrimoireLab is the flagship CHAOSS analytics platform, providing comprehensive metrics
across all CHAOSS goal areas.

#### Core Components

| Component | Function |
|-----------|----------|
| ELK (Elasticsearch, Logstash, Kibana) | Data storage and visualization stack |
| SortingHat | Contributor identity management |
| Sigils | Pre-built CHAOSS dashboards |
| Mordred | Orchestrator for data collection pipeline |
| Graal | Source code analysis (git, linting, etc.) |
| MicroMordred | Simplified single-instance deployment |

#### Data Sources Supported

| Source | Metrics Collected |
|--------|-----------------|
| Git repositories | Commits, authors, files changed, branches |
| GitHub Issues | Issue creation/closure rates, response times |
| GitHub PRs | Review time, merge time, comments |
| Mailing lists | Thread count, response time, participant diversity |
| IRC/Slack/Discord | Message count, active participants, topic analysis |
| CI systems | Build status, test results, duration |
| Code review systems | Review depth, reviewer diversity |
| Docker Hub | Image pulls, stars |
| PyPI/npm/CRAN | Download statistics |

#### Deployment Options

| Deployment | Complexity | Cost | Scale |
|------------|-----------|------|-------|
| micro.py | Low (requires Docker) | Free | Single project |
| docker-compose | Medium | Free (server costs) | Multi-project |
| Bitergia Analytics | Managed | Paid | Enterprise |
| Cauldron.io | SaaS | Freemium | Single/multi project |

### 7.3 Cauldron.io

Cauldron is a SaaS platform that packages GrimoireLab for easier use.

#### Features
- One-click setup for GitHub repositories
- Pre-built CHAOSS metrics dashboards
- Historical trend analysis
- Contributor identity management
- Export capabilities (PDF, CSV, PNG)
- Team collaboration features

#### Pricing Model (as of 2025)
| Tier | Repositories | History | Price |
|------|-------------|---------|-------|
| Free | 1 | 6 months |  |
| Growth | 5 | 2 years | ~/month |
| Organization | 20 | Full history | ~/month |
| Enterprise | Unlimited | Full history | Custom |

### 7.4 Augur

Augur is an open source CHAOSS project focused on software health metrics.

#### Features
- Python/Flask REST API backend
- Vue.js frontend
- Focus on CHAOSS metrics implementation
- Real-time data from GitHub, GitLab, mailing lists
- Prometheus/Grafana integration
- Designed for custom metric creation

#### Installation
`ash
git clone https://github.com/chaoss/augur.git
cd augur
pip install -r requirements.txt
augur backend start
`

#### API Endpoints (key ones)
| Endpoint | Returns |
|----------|---------|
| /api/unstable/repo-groups | All repositories being tracked |
| /api/unstable/repo/{id}/contributors | Contributor list with metrics |
| /api/unstable/repo/{id}/pull-requests | PR statistics |
| /api/unstable/repo/{id}/issues | Issue resolution metrics |
| /api/unstable/repo/{id}/commits | Commit frequency and author data |
| /api/unstable/repo/{id}/bus-factor | Estimated bus factor |

### 7.5 LFX Insights

LFX Insights is the Linux Foundation's analytics platform.

#### Features
- Automated data collection from Linux Foundation projects
- Cross-project comparisons and benchmarks
- Contributor lifecycle analysis
- Organizational affiliation detection
- Diversity and inclusion metrics
- Risk assessment dashboards

#### Metrics Covered
| Category | Specific Metrics |
|----------|-----------------|
| Code Development | Commit frequency, lines changed, file types |
| Community | Contributor growth, retention, new vs returning |
| Affiliation | Organization diversity, concentration index |
| Responsiveness | Issue/PR response time, time to merge |
| Risk | Bus factor, license compliance, dependency freshness |

#### Access
- Free for all Linux Foundation projects
- Self-serve onboarding for LF projects
- Custom instances available for enterprise

### 7.6 OpenDigger

OpenDigger is an open source digital infrastructure analysis platform from the
open source community.

#### Key Features
- GitHub API-based analysis
- Python SDK for custom queries
- Pre-built reports for organizational contribution analysis
- X-lab open source lab behind it
- Focus on Chinese and global OSS ecosystem

#### Metrics Tracked
| Metric | Description |
|--------|-------------|
| OpenRank | Contributor influence ranking |
| Activity Score | Composite of multiple activity indicators |
| Collaboration Network | Relationship graph between contributors |
| Organization Map | Corporate involvement analysis |
| Ecosystem Map | Project dependencies and relationships |

### 7.7 OpenSSF Best Practices Badge (CII Badge)

The Open Source Security Foundation (OpenSSF) Best Practices Badge provides a
self-certification process for OSS security and quality practices.

#### Badge Levels
| Level | Criteria Met | Passing Score |
|-------|-------------|---------------|
| Passing | Core best practices | >= 65% of passing criteria |
| Silver | Intermediate practices | All passing + >= 70% of silver criteria |
| Gold | Advanced practices | All passing + silver + >= 85% of gold criteria |

#### Criteria Categories
| Category | Metrics Tracked |
|----------|-----------------|
| Basics | Name, description, license, documentation |
| Change Control | Version control, release notes, change log |
| Reporting | Vulnerability reporting process, response time |
| Quality | CI, test coverage, coding standards |
| Security | Cryptography, secure coding, hardening |
| Analysis | Static/dynamic analysis, fuzzing |

#### Adoption Statistics
| Status | Count of Projects |
|--------|------------------|
| Passing | ~4,000+ |
| Silver | ~300+ |
| Gold | ~200+ |

### 7.8 Self-Hosted Options

#### Grafana Dashboards for Git Analytics

Stack:
- **Data source:** Git repository exported to CSV or database
- **Ingestion:** git_stats, gitinspector, custom scripts
- **Visualization:** Grafana with PostgreSQL/InfluxDB

**Sample dashboard panels:**
1. Commits per week (line chart, 12-month lookback)
2. Top 10 authors by commits (bar chart)
3. Files changed per commit (histogram)
4. Lines added/deleted per week (stacked area)
5. Issue resolution time (heatmap by day/hour)
6. PR merge time (box plot by PR size)
7. New vs. returning contributors (stacked bar)
8. Bus factor Gini coefficient (gauge)

#### Prometheus for CI Metrics

Stack:
- **Exporter:** Custom CI pipeline exporter (GitHub Actions, Jenkins, GitLab CI)
- **Collector:** Prometheus
- **Visualization:** Grafana

**Key metrics to export from CI:**
`
# Build duration
ci_build_duration_seconds{job="test", status="pass"} 120

# Test results
ci_test_total{status="pass"} 1500
ci_test_total{status="fail"} 3

# Coverage (as a gauge)
ci_coverage_percent{type="line"} 85.2

# Build status (1 = passing, 0 = failing)
ci_build_status{job="lint"} 1
`

### 7.9 Comparison Table

| Tool | Metrics | Free Tier | Setup Complexity | Best For |
|------|---------|-----------|-----------------|----------|
| GitHub Insights | Traffic, community, dependency | Yes (public repos) | None | Quick checks |
| GrimoireLab | Full CHAOSS suite | Yes (self-host) | High | Comprehensive analysis |
| Cauldron.io | Full CHAOSS suite | 1 repo free | Low (SaaS) | Teams wanting managed solution |
| Augur | CHAOSS + custom | Yes | Medium | Researchers, custom metrics |
| LFX Insights | LF-specific, broad | LF projects only | Low (managed) | Linux Foundation projects |
| OpenDigger | Activity, OpenRank | Yes | Low | Organization contribution analysis |
| CII Badge | Security/quality checklist | Yes | Low | Security-conscious projects |
| Grafana + Prometheus | Customizable | Yes | High | Teams with DevOps expertise |
| npm/pypi stats | Download counts | Yes | None | Quick ecosystem checks |
| Stack Overflow Trends | Developer interest | Yes | None | Popularity benchmarking |

---

## Part 8: Building a Metrics-Driven Culture

### 8.1 OKRs for OSS Projects

Objectives and Key Results (OKRs) applied to open source project health. Unlike
corporate OKRs, OSS OKRs focus on community health, sustainability, and impact.

#### Objective Templates

**Objective 1: Grow and diversify the contributor base**
- KR1: Increase first-time contributors by 25% this quarter
- KR2: Improve first-time contributor to repeat contributor rate from 18% to 25%
- KR3: Add contributors from 3 new organizations
- KR4: Reduce median time-to-first-review from 48h to 24h

**Objective 2: Improve code quality and security posture**
- KR1: Achieve OpenSSF Silver Badge (up from Passing)
- KR2: Reduce open critical CVEs from 3 to 0
- KR3: Increase test line coverage from 72% to 80%
- KR4: Address top 10 technical debt items

**Objective 3: Expand adoption and ecosystem reach**
- KR1: Grow weekly npm downloads from 500K to 750K
- KR2: Add 5 new downstream dependents (GitHub dependency graph)
- KR3: Publish 3 guest blog posts or conference talks
- KR4: Release 2 minor versions with migration guides

**Objective 4: Strengthen project governance and sustainability**
- KR1: Formalize governance model and publish MAINTAINERS.md
- KR2: Implement rotation for release management role
- KR3: Conduct bus factor audit and reduce critical-area bus factor to >= 2
- KR4: Onboard 2 new maintainers from non-founding organizations

#### OKR Scoring Framework

| Score | Definition | Meaning |
|-------|------------|---------|
| 1.0 | 100% achieved | Stretch was too easy |
| 0.7 | 70% achieved | Good progress |
| 0.5 | 50% achieved | Significant but incomplete progress |
| 0.3 | 30% achieved | Below expectation |
| 0.0 | No progress | Not started |

**OSS OKR cadence:**
- **Quarterly review:** Assess all OKRs, publish results publicly
- **Annual reset:** Re-evaluate objectives for the coming year
- **Monthly check-in:** Lightweight progress update

### 8.2 Transparency Dashboards

Publishing project health metrics publicly builds trust and attracts contributors.

#### What to Publish

| Metric Category | Public? | Update Cadence | Format |
|----------------|---------|---------------|--------|
| Download stats | Yes | Real-time or daily | Badge in README |
| Build/CI status | Yes | Per-commit | Badge in README |
| Test coverage | Yes | Per-commit | Badge + trend chart |
| OpenSSF badge | Yes | Per assessment | Badge in README |
| Contributor count | Yes | Quarterly | Blog post or dashboard |
| Retention rates | Yes | Quarterly | Dashboard |
| Bus factor | Yes | Quarterly | Dashboard |
| CVE status | Yes | Real-time | Badge + SECURITY.md |
| Release cadence | Yes | Per release | Release page |
| Roadmap progress | Yes | Quarterly | GitHub Project Board |
| Velocity metrics | Internal | Monthly | Team dashboard |
| Individual contributor metrics | Private | Per review | Reviewer only |

#### Dashboard Implementation Guide

**Lightweight approach (start here):**
1. README badges for: CI status, test coverage, OpenSSF badge, npm downloads
2. GitHub Pages site with: Contributor growth chart, issue resolution trends
3. Quarterly blog posts with: Retention data, new contributor stats, milestones

**Moderate approach:**
1. Grafana dashboard on Fly.io/Railway (free tier) with:
   - GitHub API data via Prometheus exporter
   - CHAOSS metrics from GrimoireLab
   - Custom data from project databases
2. LFX Insights dashboard (if Linux Foundation member)

**Advanced approach:**
1. Full GrimoireLab deployment (self-hosted or Cauldron.io)
2. Custom metrics API serving data to multiple dashboards
3. Automated quarterly report generation
4. Slack/Discord bot with metric alerts

### 8.3 Quarterly Health Reports

A template and process for publishing regular health updates.

#### Report Structure

1. **Executive Summary** (1 paragraph)
   - Overall health assessment: Healthy/Concerning/Critical
   - Key highlights this quarter
   - Top priorities for next quarter

2. **Contributor Metrics**
   - New contributors this quarter vs. last quarter
   - Repeat contributor rate
   - Top 10% contribution share
   - Quarterly churn rate
   - Key: Trend chart (last 8 quarters)

3. **Velocity Metrics**
   - Median issue resolution time
   - Median PR merge time
   - Time to first response
   - Release cadence adherence
   - Key: SPC (story points completed) if applicable

4. **Quality Metrics**
   - Test coverage trend
   - CVE count and status
   - Technical debt ratio
   - CI pass rate
   - Key: SonarQube quality gate status

5. **Adoption Metrics**
   - Download trends (monthly, quarterly)
   - New downstream dependents
   - Notable new adopters/users
   - Community platform growth

6. **Risk Assessment**
   - Bus factor analysis
   - License compliance status
   - Dependency freshness audit
   - Key: Action items for risk mitigation

7. **Governance Updates**
   - Maintainer changes (new/outgoing)
   - Governance model changes
   - Financial updates (if applicable)
   - Roadmap progress against commitments

8. **Community Highlights**
   - Spotlight on top contributors
   - Notable non-code contributions
   - Events, talks, and presentations
   - Major milestones

9. **Next Quarter OKRs**
   - Goals for the coming quarter
   - Key results to track

10. **Appendix: Raw Data**

### 8.4 Using Metrics to Identify At-Risk Areas

#### Early Warning Signals

| Signal | What to Watch | Action Required |
|--------|--------------|----------------|
| Declining contributor retention | Repeat contributor rate drops 2 quarters in a row | Survey departing contributors, review onboarding |
| Rising bus factor | Gini coefficient increases by > 0.05 in 2 quarters | Cross-training program, documentation sprints |
| Slowing response time | Time to first review increases by > 50% | Recruit additional reviewers, automate triage |
| Growing issue backlog | Backlog grows > 10% quarter-over-quarter | Triage sprints, close stale issues, add maintainers |
| Decreasing download growth | Growth rate turns negative | Evaluate competitor landscape, check compatibility |
| Increasing CVE exposure | 3+ new critical CVEs in one quarter | Security audit, dependency update sprint |
| Community platform decline | Active participants dropping | Community events, engagement initiatives |
| Release cadence slipping | Missed 2 consecutive release targets | Audit release process, reduce scope, add help |

#### Health Check Rubric

Run this health check quarterly to get a numeric score (0-100):

| Category | Criteria | Score Weight |
|----------|----------|-------------|
| **Contributor Growth** | | 25% |
| New contributors/quarter > 10 | 5 pts | |
| Repeat rate > 25% | 5 pts | |
| Top 10% share < 50% | 5 pts | |
| Monthly active contributors > 10 | 5 pts | |
| Churn rate < 25% | 5 pts | |
| **Velocity** | | 20% |
| Issue resolution rate > 80% | 5 pts | |
| Median time to first review < 48h | 5 pts | |
| Median PR merge time < 7 days | 5 pts | |
| Release schedule on track | 5 pts | |
| **Quality** | | 20% |
| Test coverage > 75% | 5 pts | |
| CI pass rate > 95% | 5 pts | |
| Zero critical CVEs open | 5 pts | |
| Technical debt ratio < 15% | 5 pts | |
| **Adoption** | | 15% |
| Downloads growing year-over-year | 5 pts | |
| New dependents per quarter | 5 pts | |
| Community platform growing | 5 pts | |
| **Risk** | | 20% |
| Bus factor >= 3 | 5 pts | |
| All critical subsystems have backup | 5 pts | |
| Licenses fully compatible | 5 pts | |
| Dependency freshness > 80% | 5 pts | |

**Scoring:**
- 85-100: Excellent (green)
- 70-84: Good (light green)
- 50-69: Fair (yellow)
- 30-49: Poor (orange)
- 0-29: Critical (red)

### 8.5 Avoiding Metric Gaming

Vanity metrics look impressive but don't measure what actually matters for project health.

#### Vanity Metrics to Avoid

| Vanity Metric | Why It's Misleading | Better Alternative |
|--------------|--------------------|-------------------|
| GitHub Stars | Easy to inflate; no cost to star | Star-to-engagement ratio |
| Total forks | Most forks are never modified | Active forks (committed in last 90 days) |
| Raw download count | Includes CI/CD, scraping, bots | Unique downloaders (IP-based estimate) |
| Total registered users | Most users never participate | Active users (7-day active) |
| Commits per day | Small commits can inflate count | Meaningful contributions (lines of logic changed) |
| Lines of code | Bloated codebases score higher | Code complexity or technical debt |
| Total contributors | Includes one-off drive-bys | Repeat contributors (2+ contributions) |
| Issues opened | More issues isn't better | Issues with actionable labels |
| Pull requests submitted | Without quality gate | PR merge rate |

#### Metric Gaming Defense Strategy

1. **Use composite metrics** instead of single numbers:
   - Contributor Health Index = (New x 0.3) + (Repeat Rate x 0.3) + (Retention x 0.4)
   - Don't optimize for just one sub-metric

2. **Normalize by context:**
   - Downloads per contributor
   - Issues per active user
   - Commits per meaningful change

3. **Track lagging AND leading indicators:**
   - Leading: New contributor signups, community event attendance
   - Lagging: Retention rate, bus factor changes

4. **Qualitative + quantitative:**
   - Surveys and feedback alongside metrics
   - Regular maintainer retrospectives

5. **Publish methodology:**
   - Explain exactly how each metric is calculated
   - Invite scrutiny and feedback on metrics

#### The Goodhart's Law Trap

"Any metric that becomes a target ceases to be a good metric."

**Examples of Goodhart's Law in OSS:**
- **Target: More PRs merged.** Result: Maintainers approve lower-quality PRs to hit quota.
- **Target: 100% test coverage.** Result: Tests that assert nothing (assert True) to boost coverage.
- **Target: Zero open issues.** Result: Issues are closed without being fixed.
- **Target: Fast response time.** Result: Robotic one-line responses that don't help.

**Defense:** Always pair quantitative metrics with qualitative review. Never use a single
metric for evaluation. Review metric trends in context with project goals.
### 9.2 Project Health Dashboard Framework (continued)
 
The dashboard framework relies on a GitHub Actions workflow to export metrics daily. Below is the Prometheus exporter configuration and the Python health score calculation engine.
 
```yaml
# .github/workflows/metrics-exporter.yml
name: Export Project Health Metrics
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
 
jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Export metrics
        run: |
          python scripts/export_health_metrics.py \
            --repo ${{ github.repository }} \
            --token ${{ secrets.GH_PAT }} \
            --output metrics/
      - name: Upload to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./metrics
```
 
### Health Score Composite Calculation
 
```python
def calculate_health_score(metrics):
    # Contributor Health (25%)
    c_score = (
        0.20 * normalize(metrics['new_contributors_per_quarter'], 0, 50) +
        0.20 * normalize(metrics['repeat_contributor_rate'], 0, 50) +
        0.20 * (1 - normalize(metrics['top_10_percent_share'], 0, 100)) +
        0.20 * normalize(metrics['active_contributors'], 0, 100) +
        0.20 * (1 - normalize(metrics['churn_rate'], 0, 100))
    )
 
    # Velocity (20%)
    v_score = (
        0.25 * normalize(metrics['issue_resolution_rate'], 0, 100) +
        0.25 * (1 - normalize(metrics['time_to_first_review_hours'], 0, 168)) +
        0.25 * (1 - normalize(metrics['time_to_merge_days'], 0, 30)) +
        0.25 * normalize(metrics['release_cadence_score'], 0, 100)
    )
 
    # Quality (20%)
    q_score = (
        0.25 * normalize(metrics['test_coverage'], 0, 100) +
        0.25 * normalize(metrics['ci_pass_rate'], 0, 100) +
        0.25 * (1 - normalize(metrics['open_critical_cves'], 0, 10)) +
        0.25 * (1 - normalize(metrics['tech_debt_ratio'], 0, 50))
    )
 
    # Adoption (15%)
    a_score = (
        0.33 * normalize(metrics['download_growth_rate'], -50, 100) +
        0.33 * normalize(metrics['new_dependents'], 0, 20) +
        0.34 * normalize(metrics['star_growth_rate'], -50, 100)
    )
 
    # Risk (20%)
    r_score = (
        0.25 * normalize(metrics['bus_factor'], 1, 10) +
        0.25 * (1 - normalize(metrics['subsystems_bf_1'], 0, 10)) +
        0.25 * (1 - normalize(metrics['cve_dependency_ratio'], 0, 20)) +
        0.25 * normalize(metrics['license_compliance'], 0, 100)
    )
 
    overall = 0.25 * c_score + 0.20 * v_score + 0.20 * q_score + 0.15 * a_score + 0.20 * r_score
    return round(overall * 100, 1)
 
def normalize(value, min_val, max_val):
    if max_val == min_val:
        return 0.5
    clamped = max(min_val, min(value, max_val))
    return (clamped - min_val) / (max_val - min_val)
```
 
### 9.3 Bus Factor Audit Template
 
```
================================================================================
BUS FACTOR AUDIT
Project: [Project Name]
Date: [Date]
Auditor: [Name]
================================================================================
 
1. OVERALL BUS FACTOR CALCULATION
--------------------------------------------------------------------------------
Total contributors (ever):                       [#]
Active contributors (last 6 months):             [#]
Total commits (last 12 months):                  [#]
Gini coefficient:                                [#]
50% threshold bus factor:                        [#]
Overall risk level:                              [Low/Medium/High/Critical]
 
2. SUBSYSTEM BUS FACTOR ANALYSIS
--------------------------------------------------------------------------------
| Subsystem | LOC | Primary Owner | Backup(s)? | Bus Factor | Risk |
|-----------|-----|---------------|------------|------------|------|
| Core Engine | 25K | @alice | @bob | 2 | Low |
| API | 15K | @bob | @charlie | 2 | Low |
| Database | 30K | @charlie | none | 1 | HIGH |
| Frontend | 20K | @diana | @eve | 2 | Low |
| CI/CD | 5K | @bob | @eve | 2 | Low |
| Security | 10K | @charlie | none | 1 | HIGH |
| Documentation | 50K | @frank | @alice | 2 | Low |
 
3. KNOWLEDGE DOCUMENTATION AUDIT
--------------------------------------------------------------------------------
| Knowledge Area | Documented? | Location | Last Updated |
|----------------|-------------|----------|---------------|
| Deployment | Yes | /docs/deploy.md | 2025-03 |
| Architecture | Partial | /docs/adr/ | 2024-11 |
| Release Process | Yes | /docs/release.md | 2025-01 |
| Security Review | No | N/A | N/A |
| Database Schema | No | N/A | N/A |
| CI Pipeline | Yes | /docs/ci.md | 2025-02 |
| API Design | Yes | /docs/api/ | 2025-03 |
| Testing Strategy | Partial | /docs/testing.md | 2024-09 |
 
4. CRITICAL KNOWLEDGE GAPS
--------------------------------------------------------------------------------
Gap 1: Database schema design - Only @charlie understands the migration system
  Action: @charlie to document migrations by [date]
  Backup: @alice to pair with @charlie on next migration
 
Gap 2: Security review process - Only @charlie knows the vulnerability workflow
  Action: @charlie to create SECURITY.md and runbook by [date]
  Backup: @bob to shadow next security review
 
5. CROSS-TRAINING PLAN
--------------------------------------------------------------------------------
| Owner | Backup | Subsystem | Training Method | Deadline |
|-------|--------|-----------|----------------|----------|
| @charlie | @alice | Database | Pair programming | YYYY-MM-DD |
| @charlie | @bob | Security | Shadow review | YYYY-MM-DD |
| @alice | @diana | Core Engine | Code review rotation | YYYY-MM-DD |
 
6. MAINTAINER BACKUP MATRIX (Target State)
--------------------------------------------------------------------------------
| Subsystem | Primary | Backup 1 | Backup 2 | Status |
|-----------|---------|----------|----------|--------|
| Core Engine | @alice | @bob | @diana | [Complete] |
| API | @bob | @charlie | -- | [Complete] |
| Database | @charlie | @alice | -- | [NEEDS WORK] |
| Frontend | @diana | @eve | @alice | [Complete] |
| CI/CD | @bob | @eve | @charlie | [In Progress] |
| Security | @charlie | @bob | -- | [NEEDS WORK] |
 
7. PREVIOUS AUDIT COMPARISON
--------------------------------------------------------------------------------
| Metric | This Audit | Previous Audit | Change |
|--------|-----------|----------------|--------|
| Overall Bus Factor | [#] | [#] | [+/-] |
| Subsystems BF=1 | [#] | [#] | [+/-] |
| Documentation Rate | [#]% | [#]% | [+/-] |
| Gini Coefficient | [#] | [#] | [+/-] |
```
 
### 9.4 Team Velocity Tracking Spreadsheet
 
```
================================================================================
TEAM VELOCITY TRACKER - [PROJECT NAME]
================================================================================
 
WEEKLY METRICS LOG
================================================================================
| Week | PRs | PRs | Median | Median | Commits | Lines | Lines | Active |
|      | Opened | Merged | Review | Merge | | Added | Deleted | Contrib. |
|      | | | Time (h)| Time (h)| | | | |
|------|-------|-------|--------|--------|-------|-------|--------|--------|
| W1 | | | | | | | | |
| W2 | | | | | | | | |
| W3 | | | | | | | | |
| W4 | | | | | | | | |
|------|-------|-------|--------|--------|-------|-------|--------|--------|
| Mo Avg| | | | | | | | |
 
MONTHLY METRICS LOG
================================================================================
| Month | New | Returning | Total | Repeat | Top 10% | Churn | Issues | Issues |
| | Contrib | Active | Active | Rate | Share | Rate | Opened | Closed |
|-------|---------|--------|--------|-------|-------|------|--------|--------|
| 2025-01| | | | | | | | |
| 2025-02| | | | | | | | |
| 2025-03| | | | | | | | |
| 2025-04| | | | | | | | |
 
QUARTERLY ROLLUP
================================================================================
| Quarter | New | Repeat | Churn | Median | OpenSSF | Bus | Top 10% | Health |
| | Contrib | Rate | Rate | Review | Badge | Factor | Share | Score |
|---------|---------|------|------|--------|-------|--------|-------|-------|
| 2025 Q1 | | | | | | | | |
| 2025 Q2 | | | | | | | | |
| 2025 Q3 | | | | | | | | |
| 2025 Q4 | | | | | | | | |
 
TREND INDICATORS
================================================================================
| Metric | This Period | Previous | Target | Status |
|--------|------------|----------|--------|--------|
| Repeat Rate | | | > 25% | [Status] |
| Median Review | | | < 24h | [Status] |
| Churn Rate | | | < 25% | [Status] |
| Test Coverage | | | > 75% | [Status] |
| Downloads | | | +10% QoQ | [Status] |
```
 
### 9.5 Community Survey Template
 
```
================================================================================
PROJECT NAME - COMMUNITY HEALTH SURVEY [YEAR]
================================================================================
 
SECTION 1: ABOUT YOU
--------------------------------------------------------------------------------
1. How long have you been involved with this project?
   [ ] Less than 1 month
   [ ] 1-6 months
   [ ] 6-12 months
   [ ] 1-2 years
   [ ] 2+ years
 
2. How did you first find this project?
   [ ] Search engine
   [ ] Social media (Twitter, LinkedIn, etc.)
   [ ] Conference / meetup
   [ ] Colleague recommendation
   [ ] Blog post / article
   [ ] Other:
 
3. What is your primary role?
   [ ] User (use the software, dont contribute code)
   [ ] Occasional contributor (1-5 contributions)
   [ ] Regular contributor
   [ ] Core maintainer
   [ ] Documentation writer
   [ ] Community support
   [ ] Other:
 
4. Do you contribute code to this project?
   [ ] Yes, regularly
   [ ] Occasionally
   [ ] Rarely or never
 
SECTION 2: CONTRIBUTION EXPERIENCE
--------------------------------------------------------------------------------
Rate your agreement (1=Strongly Disagree, 5=Strongly Agree):
 
5. The projects documentation helped me get started quickly.
   1    2    3    4    5    N/A
 
6. The issue tracker is well-organized and issues are clearly described.
   1    2    3    4    5    N/A
 
7. Code reviews on this project are constructive and helpful.
   1    2    3    4    5    N/A
 
8. I receive timely responses to my pull requests and issues.
   1    2    3    4    5    N/A
 
9. The community is welcoming and inclusive.
   1    2    3    4    5    N/A
 
10. I feel my contributions are valued.
    1    2    3    4    5    N/A
 
SECTION 3: BARRIERS TO CONTRIBUTION
--------------------------------------------------------------------------------
11. What barriers have you faced? (Select all that apply):
    [ ] Unclear how to get started
    [ ] Setup/installation is too complex
    [ ] Tests are flaky or unreliable
    [ ] Review takes too long
    [ ] Communication with maintainers is difficult
    [ ] Code of conduct concerns
    [ ] Technical complexity of the codebase
    [ ] Lack of time
    [ ] No barriers - everything is fine
    [ ] Other:
 
12. What would make you more likely to contribute more frequently?
    ______________________________________________________________
 
SECTION 4: COMMUNITY SATISFACTION
--------------------------------------------------------------------------------
13. Overall, how satisfied are you with this project?
    [ ] Very satisfied
    [ ] Satisfied
    [ ] Neutral
    [ ] Dissatisfied
    [ ] Very dissatisfied
 
14. How likely are you to recommend this project to a colleague?
    [ ] Very likely
    [ ] Likely
    [ ] Neutral
    [ ] Unlikely
    [ ] Very unlikely
 
15. What is the ONE thing the project could improve most?
    ______________________________________________________________
 
SECTION 5: OPEN FEEDBACK
--------------------------------------------------------------------------------
16. Any additional comments, concerns, or suggestions?
    ______________________________________________________________
    ______________________________________________________________
    ______________________________________________________________
 
THANK YOU FOR YOUR FEEDBACK!
Results will be published at [URL] within 30 days.
```
 
### 9.6 OKR Template for OSS Project Maintainers
 
```
================================================================================
OSS OKR TEMPLATE - [PROJECT NAME]
Quarter: [YYYY-Q#]
Team: [Maintainer Team Name]
================================================================================
 
OBJECTIVE 1: [Objective statement]
Why this matters: [Context/rationale]
 
Key Results:
 KR1: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR2: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR3: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR4: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 
Initiative: [Project/effort to support this OKR]
Confidence Level: [High/Medium/Low] - Why: [Reason]
 
OBJECTIVE 2: [Objective statement]
Why this matters: [Context/rationale]
 
Key Results:
 KR1: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR2: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR3: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR4: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 
Initiative: [Project/effort to support this OKR]
Confidence Level: [High/Medium/Low] - Why: [Reason]
 
OBJECTIVE 3: [Objective statement]
Why this matters: [Context/rationale]
 
Key Results:
 KR1: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR2: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR3: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 KR4: [Metric target] - Current: [##], Target: [##], Owner: [@name]
 
Initiative: [Project/effort to support this OKR]
Confidence Level: [High/Medium/Low] - Why: [Reason]
 
================================================================================
WEEKLY CHECK-IN TEMPLATE
Week of: [Date]
================================================================================
 
Objective 1:
  KR1 progress: [##] ([trend: on-track/at-risk/behind])
  KR2 progress: [##] ([trend])
  KR3 progress: [##] ([trend])
  KR4 progress: [##] ([trend])
 
Objective 2:
  KR1 progress: [##] ([trend])
  KR2 progress: [##] ([trend])
  KR3 progress: [##] ([trend])
  KR4 progress: [##] ([trend])
 
Objective 3:
  KR1 progress: [##] ([trend])
  KR2 progress: [##] ([trend])
  KR3 progress: [##] ([trend])
  KR4 progress: [##] ([trend])
 
Blockers this week:
- [Blocker description]
 
Plans for next week:
- [Plan item]
 
================================================================================
END OF QUARTER SCORING
================================================================================
 
| Objective | KR | Target | Actual | Score | Notes |
|-----------|-----|--------|--------|-------|-------|
| Obj 1 | KR1 | ## | ## | 0.0-1.0 | |
| | KR2 | ## | ## | 0.0-1.0 | |
| | KR3 | ## | ## | 0.0-1.0 | |
| | KR4 | ## | ## | 0.0-1.0 | |
| | AVG | | | 0.0-1.0 | |
| Obj 2 | KR1 | ## | ## | 0.0-1.0 | |
| | KR2 | ## | ## | 0.0-1.0 | |
| | KR3 | ## | ## | 0.0-1.0 | |
| | KR4 | ## | ## | 0.0-1.0 | |
| | AVG | | | 0.0-1.0 | |
| Obj 3 | KR1 | ## | ## | 0.0-1.0 | |
| | KR2 | ## | ## | 0.0-1.0 | |
| | KR3 | ## | ## | 0.0-1.0 | |
| | KR4 | ## | ## | 0.0-1.0 | |
| | AVG | | | 0.0-1.0 | |
 
Reflections:
- What worked well this quarter?
- What would we do differently?
- What did we learn about the projects health?
- Priorities for next quarter:
```
