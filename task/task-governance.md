# Task-Governance: Governance & Community Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Building Healthy Open Source Communities Across All Projects

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [Governance Models](#2-governance-models)
3. [Project Roles](#3-project-roles)
4. [Decision-Making Process](#4-decision-making-process)
5. [Community Guidelines](#5-community-guidelines)
6. [Issue Management](#6-issue-management)
7. [PR Management](#7-pr-management)
8. [Maintainer Responsibilities](#8-maintainer-responsibilities)
9. [Contributor Growth Path](#9-contributor-growth-path)
10. [Conflict Resolution](#10-conflict-resolution)
11. [Code of Conduct](#11-code-of-conduct)
12. [Security Reporting](#12-security-reporting)
13. [Release Governance](#13-release-governance)
14. [Communication Channels](#14-communication-channels)
15. [Recognition & Thanks](#15-recognition--thanks)
16. [Cross-Project Governance Patterns](#16-cross-project-governance-patterns)
17. [Governance Anti-Patterns](#17-governance-anti-patterns)
18. [Checklist Reference](#18-checklist-reference)
19. [Detailed Role Descriptions & Responsibilities](#19-detailed-role-descriptions--responsibilities)
20. [Decision-Making Deep Dive](#20-decision-making-deep-dive)
21. [Community Building & Growth](#21-community-building--growth)
22. [Conflict Resolution Deep Dive](#22-conflict-resolution-deep-dive)
23. [Code of Conduct Enforcement](#23-code-of-conduct-enforcement)
24. [Security Vulnerability Handling](#24-security-vulnerability-handling)
25. [Release Governance Deep Dive](#25-release-governance-deep-dive)
26. [Communication Channels Deep Dive](#26-communication-channels-deep-dive)
27. [Financial & Legal Governance](#27-financial--legal-governance)
28. [Multi-Project Governance](#28-multi-project-governance)
29. [Governance Anti-Patterns Deep Dive](#29-governance-anti-patterns-deep-dive)
30. [Templates & Checklists](#30-templates--checklists)

---

## 1. Core Philosophy

### 1.1 The Community Steward's Oath

```
Open source is powered by people.
Good governance enables contribution.
Bad governance drives contributors away.
Be transparent. Be fair. Be responsive.
Every contributor is a potential maintainer.
```

### 1.2 Governance Principles

| Principle | Description |
|-----------|-------------|
| **Transparency** | Decisions are public, documented, and explained |
| **Meritocracy** | Influence earned through contribution quality |
| **Inclusivity** | Anyone can contribute regardless of background |
| **Sustainability** | Maintainers are supported, not burned out |
| **Stability** | Project direction is predictable and communicated |

---

## 2. Governance Models

### 2.1 Model Comparison

| Model | Description | Best For |
|-------|-------------|----------|
| **BDFL** | Benevolent Dictator for Life | Small projects, single vision |
| **Core Team** | Group of maintainers decides | Medium projects |
| **TSC** | Technical Steering Committee | Large multi-company projects |
| **Community** | Loose collaboration of individuals | Early-stage projects |

### 2.2 Recommended: Core Team Model

```
BDFL / Project Lead
  │
  ├── Core Maintainers (write access)
  │     ├── Area Maintainers (specific modules)
  │     └── Reviewers (PR review rights)
  │
  ├── Regular Contributors
  │
  └── Community Contributors
```

---

## 3. Project Roles

### 3.1 Role Descriptions

| Role | Permissions | Responsibilities | Path to |
|------|-------------|------------------|---------|
| **User** | None | Uses the project, reports bugs | Contributor |
| **Contributor** | Issues + PRs | Submits fixes, features, docs | Regular Contributor |
| **Regular Contributor** | Issues + PRs | Consistent contributions, reviews | Area Maintainer |
| **Area Maintainer** | Write to specific modules | Reviews PRs in their area, mentors | Core Maintainer |
| **Core Maintainer** | Full write access | Reviews PRs, manages releases | Project Lead |
| **Project Lead** | Full access + admin | Vision, governance, final decisions | — |

### 3.2 Role Requirements

| Role | Time Commitment | Contribution History | Review Count | Domain Knowledge |
|------|-----------------|---------------------|-------------|-----------------|
| Area Maintainer | 2-4 hours/week | 10+ merged PRs | 20+ reviews completed | Deep in specific module |
| Core Maintainer | 5-10 hours/week | 6+ months active | 50+ reviews completed | Broad across project |
| Project Lead | 10+ hours/week | 12+ months, deep expertise | 100+ reviews completed | Full architecture understanding |

### 3.3 Time Commitment Expectations

| Role | Minimum Weekly | Recommended Weekly | Maximum Continuous Absence |
|------|----------------|--------------------|---------------------------|
| User | None | None | N/A |
| Contributor | 0.5 hour | 1-2 hours | 6 months |
| Regular Contributor | 1 hour | 2-4 hours | 3 months |
| Area Maintainer | 2 hours | 4-6 hours | 2 months |
| Core Maintainer | 5 hours | 8-10 hours | 1 month |
| Project Lead | 8 hours | 12-15 hours | 2 weeks |

### 3.4 Nomination Process

Each promotion follows a structured nomination and voting process:

| Promotion | Nominated By | Requires | Voting Body |
|-----------|-------------|----------|-------------|
| Contributor → Regular Contributor | Any maintainer | 5+ quality PRs, community engagement | Area maintainer approval |
| Regular Contributor → Area Maintainer | Area or Core maintainer | Sustained contributions, code quality | Core team majority vote |
| Area Maintainer → Core Maintainer | Core maintainer or Project Lead | 6+ months as Area Maintainer | Core team + Project Lead consensus |
| Core Maintainer → Project Lead | Core maintainer | Exceptional leadership, 12+ months | Unanimous core team vote |

```
Nomination Workflow:
1. Nomination submitted via GitHub Discussion or private channel
2. 7-day comment period for community input
3. Nominee is notified and asked to accept
4. Voting period: 7 days
5. Decision documented in MAINTAINERS.md
6. Announcement made on communication channels
```

### 3.5 Role Removal Process

Roles may be removed under the following circumstances:

| Reason | Process | Notice Period |
|--------|---------|---------------|
| Voluntary resignation | Written notice, graceful handoff | 2 weeks minimum |
| Sustained inactivity | Core team discussion, documented warning | 1 month warning then removal |
| Code of Conduct violation | CoC enforcement process | Immediate |
| Breach of trust | Core team investigation + vote (2/3 majority) | 7 days notice |

```
Inactivity Removal Process:
1. Maintainer inactive for defined absence period (see §3.3)
2. Core team sends private check-in message
3. 2-week response window
4. If no response: vote on removal
5. If removed: moved to Emeritus status
6. Access revoked, name moved to MAINTAINERS.md emeritus section
```

### 3.6 Emeritus Status

Maintainers who step down or are removed due to inactivity receive Emeritus status:

```
Emeritus maintainers:
- Listed in MAINTAINERS.md under "Emeritus Maintainers" section
- Retain read-only access to project repos (optional)
- Credited in release notes
- Invited to community events
- Can return to active status via standard nomination process
- No voting rights unless re-activated
```

---

## 4. Decision-Making Process

### 4.1 Decision Types

| Type | Process | Timeframe |
|------|---------|-----------|
| **Routine** | Individual maintainer decides | Hours |
| **Significant** | Core team discussion + lazy consensus | Days |
| **Major** | RFC + core team vote | Weeks |
| **Emergency** | Project lead decides, then informs | Hours |

### 4.2 Consensus Process

```
1. Proposal (issue or RFC)
2. Discussion period (7 days minimum)
3. Lazy consensus (no objections = approved)
4. If objections exist: resolve or vote
5. Vote: 2/3 majority of core team
6. Decision documented
```

### 4.3 RFC Process

```
1. Create RFC in docs/rfc/ folder
2. Template: Problem, Proposal, Implementation, Alternatives
3. Open PR for RFC discussion
4. 14-day review period
5. Core team votes
6. Accepted: implement; Rejected: document reasons
```

### 4.4 Lazy Consensus Detailed Workflow

Lazy consensus is the default decision mechanism for most non-routine decisions:

```
Step 1: Proposal posted to a public channel (GitHub Discussion, issue, or RFC PR)
Step 2: Proposal clearly tagged with decision deadline (e.g., "Decision by: YYYY-MM-DD")
Step 3: Minimum discussion period opens (7 days for significant, 14 days for major)
Step 4: During this period, anyone may raise objections with rationale
Step 5: If no objections raised by deadline → lazy consensus achieved → proposal approved
Step 6: If objections are raised:
   a. Objecting party and proposer attempt to resolve
   b. If unresolved within 3 days → moves to vote
   c. Maintainers vote with 2/3 majority required
Step 7: Decision documented in project log

Key Rules:
- Silence does not imply agreement, but it does imply lack of objection
- Maintaining a veto requires constructive alternative suggestion
- Objections must be substantive and project-related
- "I don't like it" is not a valid objection without reasoning
```

### 4.5 RFC Example with Full Annotations

```
RFC: 0012-adopt-semantic-versioning
Status: ACCEPTED
Author: @core-maintainer-alice
Created: 2026-03-15
Decision Deadline: 2026-03-29

## Problem
Current versioning is inconsistent across releases.
Users cannot predict breaking changes.

## Proposal
Adopt Semantic Versioning 2.0.0:
- MAJOR for breaking API changes
- MINOR for backward-compatible features
- PATCH for bug fixes

## Implementation
- Update CONTRIBUTING.md with versioning guide
- Add semver check to CI pipeline
- Create RELEASING.md document

## Alternatives Considered
| Alternative | Pros | Cons |
|-------------|------|------|
| Calendar versioning | Predictable dates | No breaking-change signal |
| Keep current | No change | Confusing for users |

## Objections Raised
- @core-maintainer-bob: "Calendar versioning works better for our users"
  → Resolution: Added MINOR version marker for compatibility calendar

## Vote
| Maintainer | Vote |
|------------|------|
| @alice | ✅ Approve |
| @bob | ✅ Approve |
| @charlie | ✅ Approve |

Result: 3/3 — Approved
```

### 4.6 Voting Procedures

| Vote Type | Threshold | Used For |
|-----------|-----------|----------|
| **Simple majority** | > 50% of votes cast | Routine changes to process documents |
| **Supermajority** | ≥ 2/3 of votes cast | Major architecture changes, new maintainers |
| **Unanimous consent** | 100% of voting members | Changes to governance, Project Lead election |
| **Approval voting** | Each voter selects N options, top picks win | Roadmap prioritization |

```
Voting Mechanics:
- Voting period: minimum 72 hours, maximum 14 days
- Abstentions do not count toward threshold
- Quorum: at least 50% of voting members must participate
- Votes are cast publicly (GitHub issue reactions or comment)
- 24-hour notice required before any vote closes
- Results documented promptly after closure
- Dissenting opinions recorded alongside majority decision
```

### 4.7 Decision Logging and Documentation

Every significant or major decision must be logged:

```
Decision Log Template:

## Decision: [Title]
- Date: YYYY-MM-DD
- Type: Significant / Major
- Author: @person
- Decision: [What was decided]

### Context
[Background information]

### Options Considered
1. Option A — Pros/Cons
2. Option B — Pros/Cons

### Outcome
[Final decision and rationale]

### Dissenting Views
[Any minority opinions, if applicable]
```

### 4.8 Override and Escalation Procedures

| Scenario | Override Path | Required |
|----------|---------------|----------|
| Core team ties | Project Lead casts tie-breaking vote | Documentation of vote |
| Emergency blocking release | Project Lead may override | Post-hoc ratification within 7 days |
| Stalled RFC (30+ days) | Core team vote to force decision | 2/3 majority |
| Maintainer veto abuse | Core team can override veto | 3/4 supermajority |

---

## 5. Community Guidelines

### 5.1 Expected Behavior

- Be respectful and inclusive
- Assume good faith
- Provide constructive feedback
- Give credit where due
- Help others learn

### 5.2 Unacceptable Behavior

- Harassment or discrimination
- Personal attacks
- Trolling or deliberately inflammatory comments
- Publishing others' private information
- Other unprofessional conduct

---

## 6. Issue Management

### 6.1 Issue Labels

| Label | Purpose |
|-------|---------|
| `bug` | Confirmed bug |
| `enhancement` | Feature request |
| `question` | User question |
| `help wanted` | Looking for contributor |
| `good first issue` | Good for newcomers |
| `needs triage` | Not yet reviewed |
| `duplicate` | Already reported |
| `wontfix` | Will not be addressed |
| `blocked` | Waiting on something |

### 6.2 Triage Process

```
1. New issue created
2. Label: needs triage
3. Triage within 48 hours
4. Assign appropriate labels
5. Assign priority (P0-P3)
6. Route to relevant maintainer
7. Respond within 7 days minimum
```

### 6.3 Issue Response Times

| Priority | Initial Response | Update Frequency |
|----------|-----------------|------------------|
| P0 | 4 hours | Daily |
| P1 | 24 hours | Every 3 days |
| P2 | 72 hours | Weekly |
| P3 | 7 days | Monthly |
| Question | 48 hours | Weekly |

---

## 7. PR Management

### 7.1 PR Lifecycle

```
1. PR opened
2. Automation: checks run (tests, lint, typecheck)
3. Human review within 48 hours
4. Changes requested or approved
5. Author addresses feedback
6. Re-review (if needed)
7. Merge to dev
8. Eventually released
```

### 7.2 PR Merge Rules

| Branch | Who Can Merge | Requires |
|--------|---------------|----------|
| `dev` | Core maintainers | 1 approval, CI passes |
| `main` | Project lead | All checks, release ready |
| `release/*` | Core maintainers | After testing period |

### 7.3 Stale PR Policy

- PRs with no activity for 30 days: tagged `stale`
- PRs stale for 60 days: closed
- Author can reopen when ready to resume

---

## 8. Maintainer Responsibilities

### 8.1 Core Responsibilities

- Review PRs within 48 hours
- Triage new issues within 48 hours
- Respond to questions and discussions
- Mentor new contributors
- Participate in governance discussions

### 8.2 Maintainer Burnout Prevention

| Practice | Why |
|----------|-----|
| Set clear expectations | Contributors know response times |
| Share the load | Distribute reviews across team |
| Take breaks | Communicate availability |
| Automate | CI/CD reduces manual work |
| Say no | It's okay to decline scope |

---

## 9. Contributor Growth Path

### 9.1 From User to Maintainer

```
Step 1: User
  → Report bugs, ask questions, use the project

Step 2: Contributor
  → Fix a bug, improve docs, add a small feature
  → Get first PR merged

Step 3: Regular Contributor
  → Consistent contributions (5+ PRs)
  → Review others' PRs
  → Help in issues/discussions

Step 4: Area Maintainer
  → Deep expertise in a module
  → Mentor new contributors
  → Invited by core team

Step 5: Core Maintainer
  → Broad expertise across project
  → Long-term commitment
  → Nominated and voted by core team
```

### 9.2 Good First Issues

```markdown
## Good First Issues

These are issues that are well-scoped and don't require
deep knowledge of the codebase.

- [ ] Add tests for X function
- [ ] Improve error message in Y
- [ ] Add JSDoc to Z API
- [ ] Fix typo in README
- [ ] Add example for configuration option
```

### 9.3 Mentorship Program Structure

Every project in the LifeJiggy framework should implement a formal mentorship program:

```
Mentorship Program Framework:

## Program Goals
- Reduce barrier to entry for new contributors
- Convert one-time contributors into regular contributors
- Build a pipeline of future maintainers
- Create a welcoming and supportive learning environment

## Mentor Role
Mentors are Area Maintainers or Core Maintainers who volunteer to guide new contributors.

### Mentor Responsibilities:
- Review and reply to mentee questions within 24 hours
- Conduct weekly 30-minute check-in calls (async or sync)
- Help scope first contributions appropriately
- Provide code review with explanations, not just corrections
- Document mentoring sessions for knowledge sharing

### Mentor Benefits:
- Recognition in project communications
- Priority access to mentorship training resources
- Invitation to mentor appreciation events

## Mentee Role
Any contributor who has submitted at least 1 PR can request a mentor.

### Mentee Responsibilities:
- Clearly communicate goals and availability
- Come prepared to check-ins with specific questions
- Act on feedback in a timely manner
- Respect mentor's time and capacity

### Mentee Benefits:
- Dedicated guidance through first 5 contributions
- Faster code review cycle
- Direct path to Regular Contributor status

## Matching Process
1. Contributor expresses interest (via GitHub Discussion or form)
2. Mentor availability checked against current load (max 3 mentees per mentor)
3. Pairing based on:
   - Interest area (test, frontend, documentation, etc.)
   - Timezone overlap (preferred but not required)
   - Mentor expertise
4. 6-week initial commitment, renewable by mutual agreement
5. Exit survey completed at end of mentorship period

## Program Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Mentee → Contributor | 80% complete first PR | PR count |
| Contributor → Regular | 40% proceed to regular | 5+ PRs within 3 months |
| Mentor retention | 70% continue next cycle | Volunteer rate |
| Mentee satisfaction | 4/5 average rating | Exit survey score |
```

### 9.4 Skill-Building Roadmap

| Level | Skills to Develop | Recommended Activities |
|-------|-------------------|----------------------|
| User → Contributor | Issue triage, git basics, PR workflow | Fix a `good first issue` |
| → Regular Contributor | Code review, testing, documentation | Review 5 PRs, write tests |
| → Area Maintainer | Architecture, mentoring, API design | Lead a module, mentor 2 contributors |
| → Core Maintainer | Release management, governance, strategy | Manage a release cycle, join governance discussions |

---

## 10. Conflict Resolution

### 10.1 Escalation Path

```
Level 1: Direct conversation between parties
Level 2: Mediation by a core maintainer
Level 3: Core team vote
Level 4: Project lead decision (final)
```

### 10.2 When Conflicts Arise

| Situation | Approach |
|-----------|----------|
| Technical disagreement | Write code both ways, compare, decide |
| Process disagreement | Discuss, vote if needed |
| Behavioral issue | Private conversation, escalate if persists |
| Code of conduct violation | Immediate escalation to project lead |

---

## 11. Code of Conduct

### 11.1 CODE_OF_CONDUCT.md

All projects should adopt a standard Code of Conduct:

```markdown
# Code of Conduct

## Our Pledge
We pledge to make participation in this project
a harassment-free experience for everyone.

## Our Standards
Examples of behavior that contributes to a positive environment:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

## Enforcement
Project maintainers are responsible for clarifying standards
and will take appropriate corrective action.

## Reporting
Report violations to [project-lead@email.com].
All reports will be reviewed and investigated.
```

---

## 12. Security Reporting

### 12.1 SECURITY.md Template

```markdown
# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities to
[security@project.com] or via [private reporting channel].

Do NOT report security vulnerabilities in public issues.

## Response

We will acknowledge receipt within 48 hours.
We will investigate and provide a fix timeline within 7 days.
We will release a fix as soon as possible (typically within 14 days).
```

---

## 13. Release Governance

### 13.1 Who Decides When to Release

| Release Type | Decided By |
|--------------|------------|
| Nightly | Automated (CI) |
| Beta | Core maintainers |
| RC | Core maintainers |
| Stable | Project lead + core team |
| Hotfix | Project lead (emergency) |

### 13.2 Release Approval

- Stable releases require core team consensus
- Hotfixes require project lead approval
- All releases must pass CI

---

## 14. Communication Channels

### 14.1 Channel Purposes

| Channel | Purpose |
|---------|---------|
| **GitHub Issues** | Bug reports, feature requests |
| **GitHub Discussions** | Q&A, ideas, community support |
| **Discord/Slack** | Real-time chat, quick questions |
| **Mailing List** | Announcements, release notes |
| **Twitter/X** | Project announcements |
| **Blog** | Deep dives, tutorials, roadmap |

### 14.2 Response Expectations

- GitHub Issues: 48 hours for initial response
- GitHub Discussions: 72 hours
- Discord/Slack: Best effort (not guaranteed)
- Email: 1 week

### 14.3 Channel Moderation Guidelines

#### Discord / Slack Moderation

```
General Principles:
- Foster respectful, on-topic conversation
- Enforce Code of Conduct consistently
- Separate channels by topic (#general, #dev, #docs, #releases)
- Maintain a #welcome channel with onboarding information

Moderator Actions:
| Behavior | First Action | Second Action |
|----------|--------------|---------------|
| Off-topic posting | Gentle redirect | Warning |
| Mild incivility | Private reminder | Warning |
| Repeated violations | Temporary mute (24h) | Temporary ban |
| Harassment | Immediate temporary ban | Code of Conduct process |
| Spam | Immediate permanent ban | N/A |

Moderation Recording:
- All moderation actions logged in private moderator channel
- Log includes: date, user, action taken, rationale
- Weekly moderation summary shared with core team
- Quarterly transparency report shared with community

Bot Automation:
- Auto-moderate links, profanity filters (context-aware)
- Rate-limit for new accounts (prevent spam)
- Welcome message with project links and Code of Conduct
```

#### GitHub Discussions Moderation

- Answerable questions redirected to appropriate channels
- Discussions categorized with labels (Q&A, Ideas, Show and Tell)
- Spam flagged and removed within 24 hours
- Off-topic discussions closed with pointer to correct channel
- Resolved questions marked as answered

#### Mailing List Etiquette

- Plain text email preferred over HTML
- Reply-to-list by default (not reply-to-sender)
- Top-posting discouraged; interleaved replies preferred
- Subject line prefixes: [ANN] for announcements, [RFC] for proposals, [DISCUSS] for discussions
- No attachments over 1MB; use links instead

---

## 15. Recognition & Thanks

### 15.1 Ways to Recognize Contributors

- All Contributors bot (automatic credit in README)
- Release notes credit: "Thanks to @user for their contribution"
- Maintainer shoutouts in community calls
- Swag/stickers for significant contributions
- Contributor spotlight on blog/social media

### 15.2 All Contributors Format

```markdown
## Contributors

Thanks to all our amazing contributors!
<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
[![@user1][user1-avatar]][user1-link]
[![@user2][user2-avatar]][user2-link]
<!-- ALL-CONTRIBUTORS-LIST:END -->
```

---

## 16. Cross-Project Governance Patterns

### 16.1 Multi-Project Considerations

| Aspect | Single Project | Multi-Project |
|--------|----------------|---------------|
| Roles | Per project | Per project + cross-project |
| Decisions | Per project team | Coordinated across projects |
| Releases | Independent | May coordinate |
| Issues | Per project repo | Cross-reference as needed |

### 16.2 LifeJiggy Governance

```
LifeJiggy OSS Enhancement Framework applies to ALL projects,
but each project has its own maintainers and decision-making.

Cross-project concerns (standards, patterns) are decided
by the framework maintainers.
Each project implements the framework in its own way.
```

---

## 17. Governance Anti-Patterns

```
🚫 BDFL WITHOUT FEEDBACK — Making all decisions alone
🚫 GHOST MAINTAINERS — Named but never seen
🚫 CLIQUE — Only certain voices heard
🚫 TOO MANY COOKS — Unclear decision authority
🚫 NO PROCESS — Everything is ad-hoc
🚫 TOKENISM — Diversity in name only
🚫 BURNOUT CULTURE — Expecting 24/7 availability
🚫 IGNORING COMMUNITY — Users not consulted
```

---

## 18. Checklist Reference

### New Project Setup

- [ ] LICENSE file added
- [ ] CODE_OF_CONDUCT.md added
- [ ] CONTRIBUTING.md added
- [ ] SECURITY.md added
- [ ] Issue templates configured
- [ ] PR template configured
- [ ] Maintainers listed in MAINTAINERS.md
- [ ] Communication channels announced

### Ongoing Maintenance

- [ ] Issues triaged within 48 hours
- [ ] PRs reviewed within 48 hours
- [ ] Community questions answered
- [ ] Dependencies updated
- [ ] Releases on schedule
- [ ] Contributors recognized

---

## 19. Detailed Role Descriptions & Responsibilities

### 19.1 User

**Permissions:** None beyond public access

**Expectations:**
- Uses the project software
- Reports bugs via GitHub Issues (with reproduction steps)
- Asks questions in Discussions or chat channels
- Respects Code of Conduct in all interactions

**Path to Contributor:**
- Submit a bug report with clear reproduction
- Engage in a Discussion with constructive feedback
- Star/watch the repository to show support

### 19.2 Contributor

**Permissions:** Create issues, submit pull requests, participate in discussions

**Responsibilities:**
- Submit well-documented, tested contributions
- Respond to reviewer feedback within 7 days
- Follow project contribution guidelines
- Tag issues appropriately when reporting bugs

**Expectations:**
- At least 1 merged PR to the project
- Basic familiarity with project conventions
- Understands the PR lifecycle (see §7.1)

**Time Commitment:** 0.5–2 hours per week, flexible

### 19.3 Regular Contributor

**Permissions:** Create issues, submit PRs, participate in discussions, request reviews

**Additional Responsibilities:**
- Consistently contribute (minimum 5 merged PRs)
- Review and comment on community PRs
- Help triage incoming issues
- Answer questions from new contributors
- Participate in community discussions

**Expectations:**
- Reliable response time (within 72 hours)
- Demonstrates project domain knowledge
- Constructive code review skills
- Active for at least 2 months

**Time Commitment:** 1–4 hours per week

**Nomination:**
- Any Area or Core Maintainer may nominate a Contributor for Regular Contributor status
- Nomination posted in core team channel with contribution summary
- Area Maintainer provides approval after reviewing 5+ merged contributions
- No formal vote required; Area Maintainer discretion

### 19.4 Area Maintainer

**Permissions:** Write access to specific modules or areas of the codebase, CI management for assigned area

**Responsibilities:**
- Review and merge PRs in assigned area
- Maintain code quality and test coverage in area
- Mentor contributors working in the area
- Triage issues related to the area
- Document area architecture and conventions

**Expectations:**
- Deep expertise in at least one module or domain
- Reviews PRs within 48 hours for assigned area
- Attends monthly core team meetings
- Reports area status in weekly updates

**Time Commitment:** 2–6 hours per week

**Nomination:**
- Proposed by a Core Maintainer or Project Lead
- Requires minimum 10 merged PRs and 20 completed reviews
- Core team votes with simple majority (>50%)
- Nominee must accept the role explicitly
- 2-week transition period with outgoing maintainer (if applicable)

**Removal:**
- Inactive for 2 months without communication → warning → 2-week response → removal
- Removal requires Core Maintainer proposal + majority vote
- Voluntary resignation accepted with 2-week notice

### 19.5 Core Maintainer

**Permissions:** Full write access to all repositories, release management, CI configuration, GitHub admin actions

**Responsibilities:**
- Review and merge PRs across the entire project
- Manage release process for all release types
- Participate in all governance decisions and votes
- Mentor Area Maintainers and Regular Contributors
- Define project roadmap and technical direction
- Handle Code of Conduct reports (as committee member)
- Manage project infrastructure (CI/CD, hosting, secrets)

**Expectations:**
- Consistent responsiveness (within 24 hours for urgent matters)
- Broad understanding of entire codebase
- Strong communication and conflict-resolution skills
- Available for weekly core team sync meetings
- Represents the project at community events (optional)

**Time Commitment:** 5–10 hours per week

**Nomination:**
- Nominated by existing Core Maintainer or Project Lead
- Must have served as Area Maintainer for 6+ months (or equivalent demonstrated expertise)
- Nomination packet includes: contribution history, review stats, community engagement evidence
- 7-day community comment period
- Core team vote: supermajority (≥2/3) required
- Objections require written rationale and must be addressed

**Removal:**
- Inactive for 1 month without communication → private check-in → 2-week response → core team vote
- Code of Conduct violation → immediate suspension pending investigation
- Removal requires supermajority vote (≥2/3 of remaining core team)
- Voluntary resignation: 2-week notice with handoff documentation

### 19.6 Project Lead

**Permissions:** Full access including admin, billing, GitHub organization management, trademark/domain control

**Responsibilities:**
- Define and communicate project vision and strategy
- Make final decisions on governance, technical direction, and releases
- Build and maintain the core team
- Represent the project to sponsors, partners, and media
- Ensure project sustainability (funding, contributor pipeline)
- Final escalation point for all disputes
- Oversee Code of Conduct committee

**Expectations:**
- Full-time equivalent commitment or near-full-time
- Exceptional leadership, communication, and delegation skills
- Deep technical understanding of the project
- Availability for urgent matters (security, downtime, crisis)
- Community presence (talks, blog posts, conference appearances)

**Time Commitment:** 8–15+ hours per week

**Nomination:**
- Nominated by any Core Maintainer
- Must have served as Core Maintainer for 12+ months
- Unanimous consent of all Core Maintainers required
- Nominee must present a vision statement and roadmap
- 14-day community comment period
- Final confirmation by Core Maintainer unanimous vote

**Succession:**
- Project Lead may designate a successor with core team approval (supermajority)
- If Project Lead steps down without successor, core team nominates and votes (unanimous)
- Temporary acting lead may be appointed (majority vote) during transition

### 19.7 Emeritus Maintainers

Maintainers who step down or are removed through the inactivity process receive Emeritus status:

```
Emeritus Benefits:
- Listed in MAINTAINERS.md under "Emeritus" section
- Retained in project history and release credit
- Invited to all core team social events
- Read-only access to project repos (upon request)
- Can be reactivated via standard nomination process

Emeritus Limitations:
- No voting rights
- No commit access
- Not listed as active maintainer on project website
- No obligation to respond or participate
```

---

## 20. Decision-Making Deep Dive

### 20.1 Consensus-Building Techniques

Effective consensus-building requires deliberate practice. The following techniques help groups reach alignment:

| Technique | Description | Best When |
|-----------|-------------|-----------|
| **Fist of Five** | Each person holds up fingers: 5=strongly agree, 4=agree, 3=neutral, 2=concerns, 1=block | In-person or synchronous meetings |
| **Temperature Check** | Poll without binding result to gauge positions early | Before formal proposal |
| **Modified Delphi** | Anonymous rounds of feedback with facilitator summarizing | High-controversy decisions |
| **Straw Poll** | Non-binding vote to understand initial positions | Early in discussion |
| **Consensus Check** | "Does anyone object?" — active solicitation of objections | Before declaring lazy consensus |
| **Pros/Cons List** | Structured comparison of options on whiteboard | Technical trade-offs |

```
Fist of Five Protocol:
1. Proposal presented clearly
2. Facilitator asks: "On a scale of 1-5, where do you stand?"
3. Each person shows fingers simultaneously (avoid anchoring)
4. Anyone showing 1 or 2 explains their concern
5. Group works to address concerns
6. Re-vote; repeat until no 1s or 2s
7. If persistent impasse → move to formal vote
```

### 20.2 Voting Procedures Detail

| Vote Type | Threshold | Quorum | Used For |
|-----------|-----------|--------|----------|
| **Simple majority** | > 50% of votes cast | 50% of voting members | Process changes, area maintainer nominations |
| **Supermajority (2/3)** | ≥ 66.7% of votes cast | 60% of voting members | Core maintainer nominations, major architecture |
| **Supermajority (3/4)** | ≥ 75% of votes cast | 75% of voting members | Governance document changes, veto overrides |
| **Unanimous consent** | 100% of voting members | 100% of voting members | Project Lead election, Code of Conduct changes |

```
Voting Process Template:

## Vote: [Title]
- Proposal: [Link to proposal]
- Voting Period: YYYY-MM-DD to YYYY-MM-DD (minimum 72h)
- Vote Type: Simple majority / Supermajority / Unanimous
- Quorum Required: [number] of [total] voting members

### Ballot
| Voter | Vote |
|-------|------|
| @person1 | ✅ Approve / ❌ Reject / ⏸️ Abstain |
| @person2 | ✅ Approve / ❌ Reject / ⏸️ Abstain |

### Result
- Approved / Rejected
- [X] of [Y] votes in favor (threshold: [Z])
```

### 20.3 Lazy Consensus Workflow

```
Lazy Consensus — Full Workflow:

Phase 1: Announcement
  1. Proposer drafts proposal (can be issue, discussion, or formal RFC)
  2. Title prefixed with "[LAZY CONSENSUS]" for visibility
  3. Deadline clearly stated (≥7 days for significant, ≥14 for major)
  4. Posted to appropriate public channel
  5. Ping relevant stakeholders (non-blocking, just notification)

Phase 2: Discussion
  1. Community asks clarifying questions
  2. Proposer answers and may amend proposal
  3. Objections collected explicitly
  4. Proposer attempts to resolve each objection
  5. If resolution found: amended proposal re-posted with changes

Phase 3: Decision
  Scenario A: No objections by deadline → Proposal approved ✅
  Scenario B: Some objections, all resolved by deadline → Proposal approved ✅
  Scenario C: Unresolved objections persist → Transition to formal vote
  Scenario D: Proposer withdraws → Proposal closed, reasons documented

Phase 4: Documentation
  1. Decision recorded in project decision log
  2. If approved: implementation tracked in issue or project board
  3. If rejected: reasons documented for future reference
```

### 20.4 RFC Process with Full Template

```
Rules of RFC:
- RFCs are for significant or major decisions only
- RFC filename format: RFC-XXXX-descriptive-title.md
- RFCs are living documents; may be updated after acceptance
- Rejected RFCs are preserved for historical context
- RFC lifecycle: DRAFT → REVIEW → ACCEPTED/REJECTED → IMPLEMENTED

RFC Template:

---
title: "RFC-XXXX: [Descriptive Title]"
status: DRAFT | REVIEW | ACCEPTED | REJECTED | IMPLEMENTED
author: @github-username
created: YYYY-MM-DD
discussion: https://github.com/org/project/discussions/XX
---

## Summary
One paragraph summary of the proposal.

## Motivation
Why is this change needed? What problem does it solve?
What user or maintainer pain points are addressed?

## Detailed Design
Full technical or process specification:
- Architecture changes
- API changes (if any)
- Migration path
- Backward compatibility considerations

## Drawbacks
- What are the downsides of this approach?
- What trade-offs are being made?
- What complexity is being introduced?

## Alternatives Considered
| Alternative | Pros | Cons |
|-------------|------|------|
| Option A | ... | ... |
| Option B | ... | ... |

## Implementation Plan
- Phase 1: [Short description]
- Phase 2: [Short description]
- Timeline estimate

## Unresolved Questions
- What needs further investigation?
- What decisions are deferred?

## Prior Art
- Links to similar decisions in other projects
- Research references
```

### 20.5 Decision Logging

All significant and major decisions must be logged in a centralized decision log:

```
Decision Log Record:

ID: DEC-2026-001
Date: 2026-03-15
Title: Adopt Semantic Versioning
Type: Significant
Status: Implemented
Author: @alice
RFC: RFC-0012 (if applicable)
Vote: 3/3 approve (supermajority)
Impact: All future releases follow semver

Context:
The project had no consistent versioning scheme.
Users reported confusion about whether updates were breaking.

Decision:
Adopt Semantic Versioning 2.0.0 for all releases.

Implementation:
- CONTRIBUTING.md updated with versioning guide
- CI pipeline now validates version bumps
- RELEASING.md created

Dissent:
None.
```

---

## 21. Community Building & Growth

### 21.1 Onboarding New Contributors

First impressions matter. A structured onboarding process converts users into contributors:

```
First PR Pathway:

1. Discovery
   - Newcomer finds a `good first issue` or `help wanted` issue
   - Issue contains clear description, expected outcome, and pointers to relevant code

2. Claiming
   - Comment on the issue: "I'd like to work on this"
   - A maintainer responds within 24 hours with:
     - Confirmation the issue is available
     - Relevant documentation links
     - Point of contact for questions

3. First Attempt
   - Newcomer opens a draft PR early (even if incomplete)
   - Maintainer provides encouraging, constructive feedback
   - Focus on guiding, not gatekeeping
   - Suggestions given as "optional" vs "required" clearly

4. Iteration
   - Newcomer addresses feedback
   - Maintainer may pair program or share screen for complex parts
   - Each round of feedback gets faster (diminishing returns)

5. Merge Celebration
   - PR is merged with thanks in the merge message
   - Newcomer is thanked in release notes
   - All Contributors bot automatically adds them
   - Invitation to join Discord/Slack contributor channel

6. Follow-Up
   - After 1 week: check-in message ("How was your first experience?")
   - After 1 month: suggest another issue aligned with interests
   - After 3 months: evaluate readiness for Regular Contributor
```

### 21.2 Buddy System

Every new contributor should be assigned a buddy:

```
Buddy Program:

What a Buddy Does:
- First point of contact for questions
- Reviews first 3 PRs personally
- Introduces newcomer to community norms and tools
- Helps navigate codebase and documentation
- Provides context on past decisions

Buddy Matching:
- Newcomer expresses interest in working on an issue
- Buddy assigned based on area of expertise
- Maximum 3 newcomers per buddy at any time
- Buddy commitment: 4 weeks minimum

Buddy Exit:
- After 3 merged PRs, newcomer graduates from buddy system
- May request continued mentorship (transition to mentor program)
- Buddy documents handoff notes if transferring
```

### 21.3 Community Events

| Event Type | Frequency | Duration | Format |
|------------|-----------|----------|--------|
| **Hackathons** | Quarterly | 24–48 hours | Virtual or in-person |
| **Contributor Sprints** | Monthly | 2–4 hours | Virtual, focused on specific issues |
| **Office Hours** | Weekly | 1 hour | Virtual drop-in, Q&A |
| **Community Calls** | Bi-weekly | 30–60 minutes | Status updates, discussions |
| **Release Parties** | Per release | 1 hour | Celebration, retrospective |

```
Hackathon Planning Checklist:
- [ ] Define theme (performance month, documentation sprint)
- [ ] Curate issue list aligned with theme (10–20 issues)
- [ ] Set up dedicated chat channel
- [ ] Schedule kickoff and closing sessions
- [ ] Recruit mentors for real-time help
- [ ] Prepare starter guides for each issue
- [ ] Arrange swag/sponsorship (if budget available)
- [ ] Set up leaderboard for friendly competition
- [ ] Plan post-event recognition

Office Hours Format:
- Held on Discord/Slack voice channel or Google Meet
- First 15 minutes: maintainer gives quick update
- Next 30 minutes: open Q&A
- Last 15 minutes: mentored contribution time
- Recorded and posted to YouTube (with consent)
- Notes published in GitHub Discussion
```

### 21.4 Recognition Programs

| Program | Frequency | Rewards | Selection |
|---------|-----------|---------|-----------|
| **Contributor of the Month** | Monthly | Featured on blog + social media, swag pack | Core team votes from nominations |
| **Hall of Fame** | Annual | Permanent page on project website | Cumulative contributions |
| **First PR Shoutout** | Continuous | Mention in release notes, GitHub comment | Automatic |
| **Mentor of the Quarter** | Quarterly | Recognition, gift card | Mentee feedback survey |
| **Swag Milestones** | Milestone-based | Stickers, t-shirts at 5, 25, 100 PRs | Automatic tracking |

```
Contributor of the Month Nomination Template:

## Nominee: @username
Nominated by: @maintainer

### Contributions This Month
- PR #123: New feature X (merged)
- PR #124: Bug fix Y (merged)
- Reviewed 5 PRs in testing area
- Helped answer 10 questions in Discussions

### Why This Contributor Stands Out
[2-3 sentences on impact]

### Community Feedback
[Optional: quotes or reactions from community]
```

### 21.5 Community Health Metrics

| Category | Metric | Target | Collection Method |
|----------|--------|--------|-------------------|
| **Retention** | Contributors returning after first PR | ≥ 40% | GitHub API, 90-day window |
| **Diversity** | New contributor ratio (first-timers vs returning) | ≥ 30% new | GitHub API per quarter |
| **Responsiveness** | Median time to first response | ≤ 24 hours | GitHub API on issues/PRs |
| **Inclusivity** | Code of Conduct reports per quarter | ≤ 1 (target 0) | Incident log |
| **Growth** | Active contributor count (3+ contributions/quarter) | +20% YoY | GitHub API |
| **Bus Factor** | Number of people needed to lose to stall project | ≥ 3 | Core team self-assessment |
| **Review Depth** | PRs with meaningful review (not just LGTM) | ≥ 80% | Sampling 20 PRs/quarter |

```
Health Dashboard:

[Project] Community Health — Q2 2026

| Metric | Q2 Value | Q1 Value | Trend | Target |
|--------|----------|----------|-------|--------|
| Retention | 42% | 38% | ↑ | ≥40% |
| New contributors | 35% | 28% | ↑ | ≥30% |
| Median response | 18h | 22h | ↑ | ≤24h |
| Active contributors | 28 | 24 | ↑ | +20% YoY |
| Bus factor | 4 | 3 | ↑ | ≥3 |

✅ Healthy
⚠ Needs attention
❌ Critical
```

### 21.6 Inclusive Language and Accessibility

```
Inclusive Language Guidelines:

Terminology:
- Use "primary" / "secondary" instead of "master" / "slave"
- Use "allowlist" / "blocklist" instead of "whitelist" / "blacklist"
- Use "they" as singular pronoun
- Use "folks" or "everyone" instead of "guys"
- Avoid ableist language (e.g., "crazy", "dumb", "blind to")

Accessibility:
- All community events captioned or transcribed
- Projects maintain accessible documentation (contrast, alt text)
- Code of Conduct available in multiple languages (top 5 by community)
- Meeting times rotated to cover timezones
- Async-first communication design

Documentation:
- README includes accessibility considerations
- Screenshots include descriptive alt text
- Video content includes captions and transcripts
- Color not used as sole indicator (charts, status)
```

---

## 22. Conflict Resolution Deep Dive

### 22.1 Technical Disagreements

Technical disagreements are the most common type of conflict in OSS projects. Handle them systematically:

```
Technical Disagreement Framework:

Phase 1: Clarify
  - Each party states their position clearly in writing
  - Focus on the problem, not the person
  - Identify shared goals ("we both want X")
  - Document both proposals with explicit trade-offs

Phase 2: Explore
  - Consider a prototype or proof-of-concept for each approach
  - Define evaluation criteria before comparing results
  - Seek community input via RFC or discussion
  - Research how other projects solved similar problems

Phase 3: Resolve
  - Compare against evaluation criteria
  - May compromise: "Start with approach A, migrate to approach B in v2"
  - May benchmark: "Whichever approach is 20% faster wins"
  - May escalate to core team vote
  - Document the decision and the rationale

Common Resolution Strategies:
| Strategy | When to Use | Risk |
|----------|-------------|------|
| Prototype both | High stakes, big design decisions | Time investment |
| Benchmark | Performance disagreements | Narrow focus |
| Phased approach | Both have merit, different trade-offs | Complexity |
| Vote | Stalemate, time-sensitive | Minority dissatisfaction |
| Defer | Not time-sensitive, needs more data | Decision paralysis |
```

### 22.2 Personality Conflicts

Personality conflicts require careful handling to prevent community damage:

```
Personality Conflict Resolution Protocol:

Step 1: Self-Resolution (3–7 days)
  - Affected parties attempt direct conversation
  - Use "I" statements: "I feel X when Y happens"
  - Focus on specific behaviors, not character
  - Ask: "What would make this work better for you?"

Step 2: Facilitated Conversation (within 14 days)
  - A neutral core maintainer or Project Lead facilitates
  - Each party speaks without interruption
  - Facilitator summarizes each perspective
  - Agreement sought on:
    a) Ground rules for future interaction
    b) Communication preferences
    c) Escalation boundaries
  - Written agreement documented (parties may opt out of recording)

Step 3: Mediation (within 30 days)
  - External mediator (if available) or senior core team member
  - Separate meetings with each party
  - Joint session to negotiate terms
  - Outcome may include:
    - Modified roles (different areas of project)
    - Communication restrictions
    - Behavioral contract with specific commitments

Step 4: Separation (final)
  - If mediation fails, core team decides course of action
  - Options: reassignment, temporary leave, role change
  - Preserves project health over individual preferences
```

### 22.3 Escalation Matrix with Timeframes

| Conflict Type | Level 1 | Timeframe | Level 2 | Timeframe | Level 3 | Timeframe |
|--------------|---------|-----------|---------|-----------|---------|-----------|
| Technical | Direct conversation | 7 days | Prototype + comparison | 14 days | Core team vote | 7 days |
| Process | Direct conversation | 7 days | Core team discussion | 7 days | Project Lead decision | 3 days |
| Personality | Self-resolution | 7 days | Facilitated conversation | 14 days | Mediation | 30 days |
| Behavioral warning | Private conversation | 2 days | Written warning | 3 days | Temporary ban | 7 days |
| CoC violation | Immediate report | 24 hours | Committee investigation | 7 days | Enforcement action | 3 days |

### 22.4 Arbitration Process

If all other conflict resolution mechanisms fail, formal arbitration is the final step:

```
Arbitration Process:

1. Request for Arbitration
   - Any party or core team member may request arbitration
   - Request submitted privately to Project Lead
   - Must include: summary of conflict, resolution attempts, desired outcome

2. Arbitration Panel Formation
   - Panel of 3 arbitrators selected:
     - 1 from core team (not involved in conflict)
     - 1 external community member (elected by core team)
     - 1 neutral observer (Project Lead or delegate)
   - Panel members must recuse if conflict of interest exists

3. Evidence Gathering (7 days)
   - Each party submits written statement
   - Supporting evidence (chat logs, emails, PR comments)
   - Panel may request additional information

4. Hearing (1 session, up to 2 hours)
   - Each party presents case (15 minutes)
   - Panel asks questions
   - Parties respond to each other (moderated)
   - Closing statements (5 minutes each)

5. Deliberation (48 hours)
   - Panel deliberates privately
   - Decision by simple majority
   - May include: binding resolution, sanctions, recommended changes

6. Decision Delivery
   - Written decision delivered to parties within 24 hours
   - Summary shared with core team (confidential details redacted)
   - Decision is final and binding
```

### 22.5 Conflict Resolution Documentation

All significant conflicts should be documented for institutional memory:

```
Conflict Resolution Log Template:

## Conflict Log: [Descriptive Title]

### Parties Involved
- @person1 (Role)
- @person2 (Role)

### Type
Technical / Personality / Behavioral / CoC / Other

### Resolution Level Used
1 / 2 / 3 / 4 / Arbitration

### Timeline
| Date | Event |
|------|-------|
| YYYY-MM-DD | Conflict first identified |
| YYYY-MM-DD | Level 1 resolution attempted |
| YYYY-MM-DD | Escalated to Level 2 |
| YYYY-MM-DD | Resolution reached |

### Summary
[2-3 paragraphs describing the conflict, process, and outcome]

### Agreements Reached
1. [Specific agreement]
2. [Specific agreement]

### Follow-Up
- Date of next check-in: YYYY-MM-DD
- Responsible person: @maintainer

### Visibility
This log is: [Core Team Only / Leadership Only]
Review date for potential declassification: YYYY-MM-DD
```

---

## 23. Code of Conduct Enforcement

### 23.1 CoC Committee Formation

```
Committee Structure:

Composition:
- 3–5 members (at least 1 Core Maintainer, rest any maintainer level)
- At least 1 member from underrepresented group (if possible)
- No member currently involved in a reported incident
- Project Lead is not on committee (serves as appeal authority)

Qualifications:
- Completed CoC enforcement training (recommended: FrameShift or similar)
- Demonstrated impartiality and good judgment
- Available for confidential incident response within 24 hours
- 12-month minimum commitment

Selection:
- Core team nominates candidates
- Community vote (supermajority ≥ 2/3)
- 6-month renewable term
- Members may resign at any time with 2-week notice

Operation:
- Committee has a private communication channel
- Meets as needed (minimum monthly for status check)
- Maintains incident register (confidential)
- Reports quarterly to core team (anonymized)
```

### 23.2 Investigation Process

```
Incident Investigation Workflow:

1. Report Received
   - Reporter submits via private email or incident form
   - Acknowledged within 24 hours with:
     - Confirmation of receipt
     - Explanation of process
     - Timeline expectations
     - Confidentiality assurances

2. Initial Assessment (48 hours)
   - Committee triages: does report fall under CoC?
   - Determine severity level:
     - Low: minor incivility, single incident
     - Medium: repeated issues, borderline harassment
     - High: harassment, threats, discrimination
     - Critical: illegal activity, physical threats
   - If low: may proceed directly to resolution

3. Investigation (7–14 days)
   - Gather all relevant evidence (logs, screenshots, communications)
   - Interview reporter (private, supportive environment)
   - Interview accused (notified of report, given opportunity to respond)
   - Interview witnesses if applicable
   - All interviews documented with consent

4. Deliberation (48 hours)
   - Committee reviews all evidence
   - Decision by simple majority (minimum 3 members)
   - Document rationale for all enforcement actions

5. Outcome Delivery
   - Decision delivered to both reporter and accused in writing
   - Includes: finding, enforcement action, rationale, appeal rights
   - Reporter told what action was taken (not necessarily details)
   - Timeframe: within 48 hours of deliberation

Investigation Principles:
- Confidentiality: all parties maintain strict confidentiality
- Impartiality: no prejudgment; both sides heard
- Timeliness: resolved as quickly as thoroughness allows
- Support: reporters offered resources (counseling, support groups)
- Right to respond: accused informed and given voice
- No retaliation: retaliation is a separate CoC violation
```

### 23.3 Enforcement Actions

| Severity | Action | Duration | Conditions | Appeal |
|----------|--------|----------|------------|--------|
| Low | Private warning | N/A | Acknowledgement required | N/A |
| Low-Medium | Written warning (documented) | 3 months on record | Must not re-offend | To Project Lead |
| Medium | Temporary ban from channels | 7–30 days | Written apology (optional) | To Project Lead |
| Medium-High | Temporary ban from project | 30–90 days | Behavioral contract required | To committee + Lead |
| High | Permanent ban from channels | Permanent | N/A | To Project Lead |
| Critical | Permanent ban from project | Permanent | N/A | Only under extraordinary circumstances |

```
Enforcement Notification Template:

Subject: Outcome of Code of Conduct Report #[ID]

Dear [Party Name],

The Code of Conduct Committee has completed its investigation
into the report regarding [incident summary].

Finding: [Upheld / Not Upheld / Insufficient Evidence]

Enforcement Action: [Action]

Rationale: [Brief explanation]

Conditions: [If applicable]

Appeal: You may appeal this decision within 14 days by
contacting the Project Lead at [email].

Sincerely,
Code of Conduct Committee
```

### 23.4 Appeals Process

```
Appeals Process:

1. Notice of Appeal
   - Filed within 14 days of decision
   - Sent privately to Project Lead
   - Must include: reason for appeal, new evidence (if any)

2. Review
   - Project Lead reviews case file (confidential)
   - May consult with external advisor if needed
   - May request additional interviews

3. Decision
   - Uphold original decision
   - Reduce enforcement action
   - Overturn finding
   - Remand for further investigation

4. Timeline
   - Appeal acknowledged: 48 hours
   - Decision rendered: 14 days from receipt
   - Decision is final

Grounds for Appeal:
- Procedural error in the investigation
- New evidence not available during investigation
- Disproportionate enforcement action
- Bias or conflict of interest in the committee
```

### 23.5 Incident Reporting Template

```
## Code of Conduct Incident Report

**Your Contact Information (optional if anonymous):**
- Name: [GitHub username or real name]
- Email: [optional]
- Preferred contact: [method]

**About the Person You Are Reporting:**
- GitHub username: [@username]
- Discord/Slack handle: [handle]
- Other identifiers: [URL, email, etc.]

**Incident Details:**
- Date and time of incident: [YYYY-MM-DD HH:MM TZ]
- Location/channel: [GitHub issue URL, Discord channel, etc.]
- Describe what happened: [detailed description]

**Evidence:**
- Links: [URLs to public content]
- Screenshots: [attached or linked]
- Logs: [attached or linked]

**Witnesses:**
- [username/handle] — can be contacted: [yes/no]
- [username/handle] — can be contacted: [yes/no]

**Previous Incidents:**
- Have you reported this person before? [yes/no]
- If yes, reference: [case ID or date]

**Desired Outcome:**
- What would make this right for you?: [description]

**Consent:**
- I consent to this report being used in an investigation: [yes/no]
- I understand confidentiality limits: [yes/no]
```

### 23.6 Transparency Reports

Quarterly transparency reports build community trust in the CoC process:

```
## Code of Conduct Transparency Report — Q2 2026

### Summary
- Reports received: 3
- Reports investigated: 3
- Reports dismissed: 0
- Enforcement actions taken: 2

### By Category
| Category | Count |
|----------|-------|
| Harassment | 1 |
| Incivility | 1 |
| Spam / Trolling | 1 |

### By Outcome
| Outcome | Count |
|---------|-------|
| Dismissed | 0 |
| Warning (private) | 1 |
| Warning (written) | 1 |
| Temporary ban | 1 |
| Permanent ban | 0 |

### Statistics
- Median response time: 6 hours
- Median investigation time: 5 days
- Appeals filed: 0

### Notes
No identifying information about any party is included
in this report to protect reporter and subject privacy.
```

---

## 24. Security Vulnerability Handling

### 24.1 Security Advisory Workflow

```
Security Vulnerability Lifecycle:

Phase 1: Discovery & Reporting
  1. Vulnerability discovered by researcher or user
  2. Reported privately via SECURITY.md channel
  3. Security team acknowledges within 48 hours
  4. Triage: determine severity (CVSS 3.1), affected versions, exploitability
  5. CVE ID reserved (via GitHub Security Advisories or MITRE)

Phase 2: Verification & Reproduction
  6. Security team reproduces vulnerability
  7. Determine root cause and impact scope
  8. Develop proof-of-concept (for internal verification only)
  9. Document findings in private advisory

Phase 3: Patch Development (under embargo)
  10. Fix developed on private fork
  11. Reviewed by at least 2 maintainers
  12. Tests added to prevent regression
  13. Backport fixes to all affected supported versions

Phase 4: Embargo Coordination
  14. Notify downstream distributors (Linux distros, package managers)
  15. Coordinate release date and time
  16. Provide advance patches to distributors with NDAs
  17. Synchronize public disclosure timing

Phase 5: Public Disclosure
  18. Release patched versions simultaneously
  19. Publish GitHub Security Advisory
  20. Announce on communication channels
  21. Credit the reporter (unless they prefer anonymity)

Phase 6: Post-Disclosure
  22. Monitor for incomplete fixes
  23. Update advisory with any new information
  24. Conduct post-mortem to improve process
```

### 24.2 Embargo Coordination

```
Embargo Policy:

Duration:
- Standard: 90 days from notification to public disclosure
- Extended: 120 days for critical vulnerabilities (CVSS ≥ 9.0)
- Expedited: 14 days for actively exploited vulnerabilities

Coordination Responsibilities:
| Party | Responsibility |
|-------|----------------|
| Reporter | Agree to embargo before sharing full details |
| Project security team | Develop patch, coordinate release |
| Downstream distributors | Prepare and test patches under embargo |
| Package managers | Plan emergency release process |

Embargo Communication:
- Use encrypted channels (Signal, Keybase, or GPG-encrypted email)
- Share only minimum information required
- Track who has been informed and when
- Revoke access to embargo details if breached

Embargo Breach Protocol:
1. If embargo breached by any party → assess impact
2. If partial breach (limited details): accelerate disclosure to 7 days
3. If full breach (PoC public): immediate emergency release
4. Post-mortem to determine how breach occurred
5. Breaching party may be excluded from future embargoes
```

### 24.3 CVE Assignment Process

| Step | Action | Owner | Timeframe |
|------|--------|-------|-----------|
| 1 | Confirm vulnerability is novel and valid | Security team | 48 hours |
| 2 | Reserve CVE via GitHub Security Advisory | Project Lead | 1 hour |
| 3 | Fill CVE description (without PoC details) | Security team | 24 hours |
| 4 | Set CVSS 3.1 severity score | Security team | 24 hours |
| 5 | Update CVE with patch references at disclosure | Security team | Day of release |
| 6 | Publish full CVE details | Security team | Day of release |

### 24.4 Patch Development Under Embargo

```
Embargoed Patch Workflow:

Repository Setup:
- Create private fork of the affected repository
- Grant access only to: security team (2–3 people), patch reviewer (1)
- No CI/CD on private fork (avoid accidental disclosure)
- All communication in encrypted, authenticated channels

Patch Requirements:
- Minimal change (fix only what's needed)
- Includes regression test
- Does NOT mention security vulnerability in commit message
- Commit message uses generic language (e.g., "Validate input bounds")
- All affected versions patched before any release

Review Process:
- Primary reviewer: Security team member
- Secondary reviewer: Core maintainer (sworn to confidentiality)
- Review criteria: correctness, completeness, no side-effects
- Sign-off required from both reviewers

Testing:
- Run full test suite on patched code
- Run fuzzing if applicable
- Verify fix in staging environment
- Verify regression test passes with AND without the fix
```

### 24.5 Public Disclosure Timeline

```
Public Disclosure Checklist:

T-14 days: Finalize patch, begin distributor coordination
T-7 days:  Confirm release date with all coordinating parties
T-3 days:  Prepare advisory text, changelog, release notes
T-1 day:   Final review of all materials
T-0:       Coordinated release time (typically 14:00 UTC)

Release Minute-by-Minute:
| Time | Action |
|------|--------|
| T-5min | Push tags to public repository |
| T-0 | Publish GitHub Security Advisory |
| T+1min | Announce on mailing list |
| T+2min | Announce on Discord/Slack |
| T+5min | Tweet/X post from project account |
| T+30min | Blog post with technical details (if warranted) |
| T+24h | Update CVE entry with full details |
| T+7d | Post-mortem published (if warranted) |
```

### 24.6 Security Researcher Recognition

```
Researcher Recognition Policy:

Credit Types:
| Contribution | Recognition |
|--------------|-------------|
| Responsible disclosure | Named in advisory, thank-you in release notes |
| Significant finding (CVSS ≥ 7.0) | Above + project swag pack |
| Critical finding (CVSS ≥ 9.0) | Above + Hall of Fame listing + bounty (if budget) |
| Patch contribution | Co-author credit on fix commit |

Hall of Fame:
Maintained in SECURITY.md:
```
# Security Hall of Fame

We thank the following researchers for their
responsible disclosures:

- @researcher1 — CVE-2026-0001 (Critical: RCE)
- @researcher2 — CVE-2026-0002 (High: XSS)
```

Bounty Program (if funded):
- Critical: $1,000–$5,000
- High: $500–$1,000
- Medium: $100–$500
- Low: swag only
```

---

## 25. Release Governance Deep Dive

### 25.1 Release Manager Role

```
Release Manager Responsibilities:

Per-Release Role (rotating among Core Maintainers):
- Manage release branch and version bumps
- Coordinate changelog generation
- Ensure all required PRs are merged
- Verify CI/CD pipeline passes
- Run release checklist
- Publish release artifacts and notes
- Announce release on all channels
- Lead post-release retrospective

Rotation:
- 3-month rotation (or per-major-release)
- Minimum 1 prior release as deputy before becoming primary
- Overlap period: 2 weeks handoff between managers

Deputy Release Manager:
- Shadow the primary release manager
- Learn the release process
- Take over if primary is unavailable
```

### 25.2 Release Approval Matrix

| Release Type | Proposed By | Reviewed By | Approved By | CI Required | Time to Approve |
|--------------|-------------|-------------|-------------|-------------|-----------------|
| Nightly | Automated | None | Automated | Full suite | Automatic |
| Alpha | Area Maintainer | Core maintainer (1) | Core maintainer | Full suite | 24 hours |
| Beta | Core maintainer | Core team (2) | Core team lazy consensus | Full suite | 3 days |
| RC | Core maintainer | Core team (2) | Core team + QA | Full suite + integration | 5 days |
| Stable | Release Manager | Core team (2) | Project Lead + core team | Full suite + perf + integration | 7 days |
| Hotfix | Any maintainer | Core maintainer (1) | Project Lead | Targeted tests + full CI | 4 hours |
| Security | Security team | Core maintainer (2) | Project Lead | Full suite | Coordinated per §24 |

### 25.3 LTS vs Stable vs Nightly Governance

| Track | Frequency | Support Window | Breaking Changes | Backports |
|-------|-----------|----------------|------------------|-----------|
| **Nightly** | Daily | None (replaceable) | Yes | No |
| **Stable** | Monthly | Until next stable | Minor only | Yes (critical bugs) |
| **LTS** | Annual | 24 months | No | Security + critical bugs |
| **Security-only** | As needed | Post-LTS (12 months) | No | Security only |

```
Track Selection Criteria:
- Nightly: CI passes, no release branch needed
- Stable: RC period passes, no open P0/P1 bugs
- LTS: 6-month deprecation notice, migration guide published
- Security-only: LTS support window expired but security commitment active
```

### 25.4 Backport Policy for Security Fixes

```
Backport Eligibility:
| Release | Security Fixes | Critical Bug Fixes | Feature Backports |
|---------|----------------|--------------------|--------------------|
| Latest stable | ✅ Always | ✅ Yes | ✅ With approval |
| Previous stable | ✅ Yes | ✅ With approval | ❌ No |
| LTS (within support) | ✅ Yes | ✅ Yes | ❌ No |
| LTS (grace period) | ✅ Critical only | ❌ No | ❌ No |
| EOL | ❌ No | ❌ No | ❌ No |

Backport Process:
1. Security fix developed against main branch
2. Cherry-pick to each eligible release branch
3. Resolve merge conflicts (if any)
4. Run full CI on each backport branch
5. Release as patch version on each track
6. Coordinate public disclosure per §24
```

### 25.5 Release Calendar Planning

```
Annual Release Calendar:

Q1 (January):
- Finalize annual roadmap
- LTS planning begins
- Deprecation notices for next LTS cycle

Q2 (April):
- LTS release candidate 1
- Community testing period opens
- Migration guide draft published

Q3 (July):
- LTS stable release
- Previous LTS enters security-only mode
- Mid-year roadmap check

Q4 (October):
- Feature release planning for next year
- Security audit (if budget allows)
- End-of-life announcements

Release Cadence:
| Track | Cadence | Typical Months |
|-------|---------|----------------|
| Nightly | Daily | All year |
| Stable | Monthly | Monthly |
| LTS | Annual | July |
| Security | As needed | On demand |
| Hotfix | As needed | On demand |

Release Blackout Periods:
- December 15 – January 5: No stable releases
- Major conference weeks: No releases (unless security)
- Core team vacation periods: No releases (announced 1 month in advance)
```

---

## 26. Communication Channels Deep Dive

### 26.1 GitHub Issues Management

```
Issue Management Guidelines:

Categorization:
- Every issue must have at least one label
- Priority labels: P0 (critical), P1 (high), P2 (medium), P3 (low)
- Type labels: bug, enhancement, question, discussion, docs
- Status labels: needs-triage, needs-reproduction, needs-design, blocked

Issue Locking Policy:
- Lock issues that have become flame wars (temporary)
- Lock completed issues older than 6 months (prevent necroposting)
- Lock resolved questions after 30 days
- Locked issues are read-only; continue discussion in new issue

Issue Templates:
- Bug report: description, reproduction steps, expected vs actual, environment
- Feature request: problem statement, proposed solution, alternatives
- Question: what you're trying to achieve, what you've tried
- Performance: benchmark data, environment, expectation

Stale Issue Management:
- Tag `stale` after 60 days of inactivity (non-P0)
- Close stale issues after 90 days
- User can reopen closed issue with new information
- P0/P1 issues never auto-staled
```

### 26.2 GitHub Discussions Management

```
Discussions Governance:

Categories:
- 📣 Announcements (moderators only)
- 💡 Ideas (feature brainstorming)
- 🙏 Q&A (community support)
- 🛠 Show and Tell (projects built with this tool)
- 💬 General (community conversation)

Q&A Management:
- Mark answers as "accepted" to help future readers
- Convert frequently asked questions to FAQ section
- Pin high-quality answers to category top
- Encourage users to search before posting

Moderation:
- Off-topic: move to correct category or close
- Duplicate question: link to existing answer, close
- Spam: delete immediately, user may be banned
- Answered questions: marked as resolved after 7 days
```

### 26.3 Discord/Slack Moderation Guidelines

```
Moderation Framework:

Roles & Permissions:
| Role | Permissions |
|------|-------------|
| Admin | Full server access, configuration |
| Moderator | Kick, ban, mute, delete messages |
| Core Maintainer | Post in #announcements, special voice channel access |
| Maintainer | Post in #maintainers private channel |
| Contributor | Access to #contributors channel |
| Member | General channels, voice |
| Newcomer | #welcome and #general only (1 hour probation) |

Channel Structure:
| Channel | Topic | Moderation Level |
|---------|-------|------------------|
| #welcome | Onboarding, rules | Strict (newcomers only) |
| #general | Project discussion | Moderate |
| #dev | Development conversation | Light |
| #releases | Release announcements | Low (announcements only) |
| #help | User support | Moderate |
| #random | Off-topic | Light |
| #contributors | Contributor discussion | Private (invite only) |
| #maintainers | Maintainer coordination | Private (invite only) |
| #moderation | Mod team channel | Private (mods only) |

Moderation Actions:
| Action | Triggers | Process |
|--------|----------|---------|
| Warning | Minor infraction, first offense | Private DM from moderator |
| Timeout (1h–24h) | Repeated minor infractions | /timeout command with reason |
| Mute (24h–7d) | Spam, sustained disruption | Mod discussion → mod log |
| Kick | Single serious infraction | Mod discussion → Project Lead approval |
| Temporary Ban (7–30d) | Harassment, threats, doxxing | Mod vote → core team notification |
| Permanent Ban | Extremely severe or repeated violations | Core team vote → community notification |

Moderation Log Entry:
```
[2026-03-15 14:22 UTC] @moderator
Action: Timeout (4 hours)
User: @user123
Reason: Repeated off-topic posting after 2 warnings
Channel: #general
Warning ID: W-2026-0312
```

Bot Automation:
- Auto-flag links from known spam domains
- Rate-limit new accounts (1 message per 10 seconds, first hour)
- Automatic profanity filter (context-aware, with allowlist)
- Automatic welcome message with Code of Conduct
- Scheduled "community health" message (weekly stats)
```

### 26.4 Mailing List Etiquette

```
Mailing List Standards:

Posting Guidelines:
- Plain text email strongly preferred; HTML discouraged
- Reply-to-list by default (not reply-to-sender) — check your mail client
- Top-posting discouraged; use interleaved or bottom-posting
- Keep line length under 72 characters
- No top-level attachments over 1MB; use links

Subject Line Conventions:
| Prefix | Purpose |
|--------|---------|
| [ANN] | Official announcements |
| [RFC] | Request for Comments |
| [DISCUSS] | Open discussion topic |
| [VOTE] | Formal vote announcement |
| [QUESTION] | Question to the community |
| [META] | Discussion about the list itself |

Subscription:
- Open subscription (anyone can join)
- Digest option available (weekly summary)
- Moderated for new subscribers (first post approved)
- Archives public (searchable)
```

### 26.5 Social Media Policy

```
Social Media Guidelines:

Official Project Accounts:
- Maintained by Project Lead or delegate
- Password stored in team password manager
- 2FA enabled on all accounts
- Announcement authority: Project Lead only
- Regular maintainers may tweet with "#project" hashtag from personal accounts

What to Post:
- New releases and version announcements
- Security advisories (coordinated with disclosure)
- Community event announcements
- Contributor spotlights
- Project milestones and metrics
- Blog posts and tutorials

What NOT to Post:
- Personal opinions on non-project topics
- Political statements (unless directly relevant to project)
- Confidential or embargoed information
- Negative comments about competitors
- Unverified security claims

Response Protocol:
- Positive engagement: like/retweet/thank
- Questions: direct to GitHub Discussions or support channels
- Criticism: acknowledge, invite constructive discussion elsewhere
- Harassment: do not engage, report and block
- Misinformation: correct politely with facts and links
```

### 26.6 Blog/Content Publishing Process

```
Blog Publishing Workflow:

1. Proposal
   - Topic suggested via GitHub Discussion or #maintainers channel
   - Brief outline posted for feedback
   - Core team indicates interest within 48 hours

2. Writing
   - Author drafts post (Google Docs or markdown file in project repo)
   - Target: 800–1500 words
   - Include: title, author, date, tags, featured image (if applicable)

3. Review
   - Technical review: Core maintainer (24 hours)
   - Editorial review: Project Lead or delegate (48 hours)
   - Accessibility check: alt text, heading structure, contrast

4. Publishing
   - Scheduled via project blog platform (Hugo, Ghost, Medium)
   - Posted simultaneously across all channels
   - Social media posts drafted and queued
   - Newsletter version prepared for mailing list

5. Promotion
   - Post link in #announcements Discord/Slack
   - Share on Twitter/X, LinkedIn
   - Add to project "News" or "Blog" section in README
   - Consider cross-posting on dev.to or Medium (canonical link)

Content Calendar:
| Cadence | Content Type | Owner |
|---------|-------------|-------|
| Weekly | Release notes | Release Manager |
| Bi-weekly | Community update | Rotating maintainer |
| Monthly | Technical deep-dive | Volunteer |
| Quarterly | Roadmap update | Project Lead |
| Per-release | Release announcement | Release Manager |
```

### 26.7 Transparency in Communications

```
Transparency Commitments:

The project commits to transparent communication by:

Always Public:
- All technical decisions (with documented rationale)
- Roadmap and priorities
- Release plans and schedules
- Contribution statistics (anonymized)
- Governance changes and proposals
- Financial reports (if funded)

Sometimes Private (when necessary):
- Personal disputes and conflict resolution details
- Security vulnerabilities before disclosure
- Personnel matters (moderation actions)
- Embargoed partner communications

Transparency Reporting:
- Monthly community health update on blog
- Quarterly governance report (decisions, changes, metrics)
- Annual project retrospective (public)
- Any governance change must have a transparent rationale
- All votes and their results published (no secret ballots)
```

---

## 27. Financial & Legal Governance

### 27.1 OpenCollective / GitHub Sponsors Setup

```
Fiscal Hosting (OpenCollective):

Setup:
- Create OpenCollective page for the project
- Attach to a fiscal host (Open Source Collective recommended for new projects)
- Configure expense policies (what can be reimbursed, limits)

Tiers (example):
| Tier | Amount | Benefits |
|------|--------|----------|
| Individual | $5/month | Listed in backers |
| Supporter | $20/month | Listed + priority issue responses |
| Corporate | $500/month | Logo on README + priority support |
| Sponsor | $2,000/month | Logo + dedicated office hours |

GitHub Sponsors:
- Link GitHub Sponsors profile to OpenCollective
- Matching: enables GitHub Sponsors matching fund (if eligible)
- One-time sponsorships for specific milestones
- Sponsorship recognition in project README

Fund Uses:
| Category | % of Funds | Examples |
|----------|------------|----------|
| Infrastructure | 30% | CI/CD, hosting, domains, CDN |
| Community | 25% | Hackathon prizes, event support |
| Development | 25% | Bounties, sponsored time, contract work |
| Reserve | 10% | Emergency fund, tax obligations |
| Fiscal host fee | 10% | OpenCollective fee + payment processing |
```

### 27.2 Fund Allocation Process

```
Expense Approval Matrix:

| Amount | Approved By | Documentation Required |
|--------|-------------|----------------------|
| < $100 | Any Core Maintainer | Receipt or invoice |
| $100–$500 | Core team lazy consensus | Quote + justification |
| $500–$2,000 | Core team vote (simple majority) | Proposal + 2 quotes |
| > $2,000 | Core team vote (supermajority 2/3) | Full proposal + community input |

Expense Reporting:
- All expenses published on OpenCollective (transparent)
- Quarterly financial review in community call
- Annual budget planning session (Q4)
- Project Lead has veto power over expenses (must document reason)
- No personal expenses; all spending must benefit the project

Bounty Program (if applicable):
- Bounties posted on project issue tracker
- Amount determined by: complexity, impact, priority
- Paid after PR merged and tested
- Bounty disputes resolved by core team
```

### 27.3 Trademark Usage Guidelines

```
Trademark Policy:

The project name, logo, and brand assets are trademarked.
Use is permitted under the following conditions:

Allowed Without Permission:
- Referring to the project by name
- Using logos in blog posts or articles about the project
- Using logos in presentations about the project
- Using logos on social media to identify usage

Requires Permission:
- Using name or logo for commercial products
- Using name or logo in a domain name
- Distributing modified versions under the project name
- Suggesting official endorsement or affiliation

How to Request Permission:
- Open an issue in the governance repository
- Include: intended use, context, duration
- Response within 14 days

Violations:
- Cease-and-desist letter (first notice)
- Escalation to legal counsel if ignored
- Core team vote required for enforcement action
```

### 27.4 License Compliance

```
License Compliance Checklist:

- [ ] All first-party code has a proper license header
- [ ] All dependencies have compatible licenses
- [ ] LICENSE file present at repository root
- [ ] Third-party notices file (if aggregating dependencies)
- [ ] License scan run on every release
- [ ] Contributor-committed dependencies checked for license
- [ ] Licensed if using fonts, images, or other non-code assets

License Compatibility Reference:
| Project License | Compatible Dependencies |
|-----------------|------------------------|
| MIT | MIT, Apache 2.0, BSD, Unlicense, CC0 |
| Apache 2.0 | Apache 2.0, MIT, BSD, CC0 (not GPL v2) |
| GPL v3 | GPL v3, AGPL v3 (not Apache 2.0 for combined work) |
| AGPL v3 | AGPL v3 only |
| LGPL v3 | LGPL v3, GPL v3, Apache 2.0, MIT |

License Change Process:
- Propose via RFC (major decision per §4.1)
- Requires unanimous consent of all copyright holders
- 30-day community comment period
- Re-license requires explicit agreement from all significant contributors
- Tool used: `scancode-toolkit` or `fossa` for dependency audit
```

### 27.5 Contribution Licensing Agreements (CLA vs DCO)

```
| Aspect | CLA (Contributor License Agreement) | DCO (Developer Certificate of Origin) |
|--------|--------------------------------------|---------------------------------------|
| Complexity | High (legal document) | Low (one-line sign-off) |
| Friction for contributors | High (must sign) | Low (git commit -s) |
| Legal protection | Strong | Moderate |
| Best for | Corporate-backed projects | Community-driven projects |
| Management | CLA assistant bot required | DCO bot or manual check |
| Example | Apache Software Foundation | Linux Kernel, CNCF |

Recommendation for LifeJiggy projects:
- Start with DCO for low friction
- Move to CLA if: corporate contributions > 50%, or legal advice recommends it
- DCO sign-off: `Signed-off-by: Name <email>` in commit message
- Automated DCO check in CI pipeline

DCO Text:
```
Developer Certificate of Origin
Version 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me
    and I have the right to submit it under the open source
    license indicated in the file; or

(b) The contribution is based upon previous work that, to
    the best of my knowledge, is covered under an appropriate
    open source license and I have the right under that license
    to submit that work with modifications; or

(c) The contribution was provided directly to me by some
    other person who certified (a), (b) or (c) and I have
    not modified it.

(d) I understand and agree that this project and the
    contribution are public and that a record of the
    contribution (including all personal information I
    submit with it) is maintained indefinitely and may
    be redistributed consistent with this project or
    the open source license(s) involved.
```
```

---

## 28. Multi-Project Governance

### 28.1 Cross-Project Coordination

```
Coordination Mechanisms:

Cross-Project Working Groups:
| Working Group | Purpose | Members |
|---------------|---------|---------|
| Standards & Patterns | Common coding standards, CI templates | 1 rep per project |
| Community | Shared events, cross-project mentorship | 1 rep per project |
| Infrastructure | Shared CI/CD, hosting, tooling | 1 rep per project |
| Security | Coordinated vulnerability response | 1 rep per project |

Meetings:
- Working groups meet bi-weekly
- Cross-project lead sync: monthly
- All-hands community call: quarterly

Decision Making:
- Cross-project standards: majority of WG representatives
- Framework-level decisions: LifeJiggy framework maintainers
- Project-level decisions: individual project teams
- Escalation: WG → Framework maintainers → Project Leads
```

### 28.2 Shared Resources (CI, docs, infrastructure)

```
Shared Infrastructure:

CI/CD:
- Shared GitHub Actions runners (self-hosted, if available)
- Common CI templates published in a central repository
- Each project extends templates with project-specific jobs
- Cache shared across projects (npm, pip, etc.)

Documentation:
- Central documentation portal (one website, multiple project sections)
- Common documentation style guide
- Shared glossary and cross-references
- Unified search across all project docs

Infrastructure:
| Resource | Cost Source | Managed By |
|----------|-------------|------------|
| CI runners | OpenCollective / Sponsors | Core Infrastructure team |
| Documentation hosting | OpenCollective / Sponsors | Core Infrastructure team |
| Package registry | Free (npm, PyPI, etc.) | Per-project maintainers |
| Domain names | Per-project or shared | Project Lead |
| Code signing | Individual | Per-project maintainers |
| Cloud testing resources | Sponsors (if available) | Core Infrastructure team |

Cost Allocation:
- Shared costs split equally among projects
- Major costs (e.g., self-hosted runners) funded from central budget
- Per-project costs (e.g., package manager fees) paid by project
- Transparent cost tracking in shared budget document
```

### 28.3 Central vs Decentralized Decision Making

| Decision Type | Centralized (Framework) | Decentralized (Per Project) |
|---------------|------------------------|------------------------------|
| Governance standards | Yes | Must adopt |
| Code of Conduct | Yes | Must adopt |
| Security policy | Yes | Must adopt |
| CI/CD templates | Guidelines | Project implements |
| Release schedule | No | Per project |
| Technology choices | No | Per project |
| Community events | Coordinated | Per project executes |
| Brand/trademark | Yes | Must comply |
| Financial administration | Central | Budget allocation per project |

```
Decision Rights Matrix:

R = Responsible, A = Accountable, C = Consulted, I = Informed

| Decision | Framework Maintainers | Project Lead | Core Team | Community |
|----------|----------------------|--------------|-----------|-----------|
| Framework standards | A/R | C | I | I |
| Project roadmap | I | A | R | C |
| New project addition | A/R | C | I | I |
| Release contents | I | A | R | C |
| CoC enforcement | A | C | R | I |
| Budget allocation | A | R | C | I |
| Trademark use | A/R | I | I | I |
```

### 28.4 LifeJiggy Framework Governance Across Projects

```
LifeJiggy Framework Governance Model:

Framework Role:
- Define and maintain governance standards shared across all projects
- Provide templates, checklists, and tooling
- Coordinate cross-project initiatives
- Manage shared infrastructure and budget
- Ensure consistency in community experience

Framework Maintainers:
- Appointed from experienced project maintainers
- 3–5 members, 12-month terms
- Responsible for framework documentation and updates
- Liaison with individual project teams

Framework Change Process:
1. Proposal from any project maintainer or framework member
2. Framework RFC with 30-day comment period
3. All projects notified and invited to comment
4. Framework maintainers decide by supermajority (≥ 3/4)
5. Changes documented with migration guidance
6. Projects given 90 days to adopt changes

Project Autonomy:
- Projects can extend but not weaken framework standards
- Projects may propose framework changes via RFC
- Projects maintain full control over:
  - Technical decisions
  - Release schedules
  - Team composition
  - Community culture within framework boundaries

Framework Versioning:
- Framework follows semver
- MAJOR: breaking changes to governance requirements
- MINOR: new optional practices, templates
- PATCH: clarifications, bug fixes
- Each project tracks which framework version they follow
```

---

## 29. Governance Anti-Patterns Deep Dive

### 29.1 BDFL Without Feedback

**Real Example:** A project where the BDFL made all decisions without community input. The project forked twice, and both forks outgrew the original.

**Prevention:**
- BDFL model requires active solicitation of feedback
- Regular "temperature check" issues before major decisions
- Written justification for all BDFL decisions
- Succession plan documented before needed

**Detection:** Check if the last 10 major decisions have community input recorded. If < 50% do, this anti-pattern is active.

### 29.2 Ghost Maintainers

**Real Example:** A project with 12 listed maintainers on GitHub, but only 2 active. New contributors waited weeks for reviews.

**Prevention:**
- Quarterly activity audit of all maintainers
- Clear inactivity policy (see §3.5)
- Auto-removal process for inactive maintainers
- Realistic maintainer count (under-promise, over-deliver)

**Detection:** Compare listed maintainers against Git commit activity (90-day window). If > 30% have zero commits, this is active.

### 29.3 Clique Formation

**Real Example:** A project where the core team of 5 people all worked at the same company. External contributors felt decisions were made in private channels they couldn't access.

**Prevention:**
- Maintainers from at least 2 different organizations (recommended: 3+)
- All governance discussions happen in public channels
- Decision logs published regularly
- Active recruitment of diverse maintainers

**Detection:** Review last 10 decisions — how many had non-core-team input? Review maintainer employer diversity.

### 29.4 Too Many Cooks

**Real Example:** A project with 20+ committers but no defined roles or decision authority. Critical PRs sat unreviewed because nobody wanted to take responsibility.

**Prevention:**
- Clear role definitions with boundaries (see §3)
- Decision-making authority per role clearly documented
- Area ownership (specific modules have specific maintainers)
- Merge rights tied to defined roles, not seniority

**Detection:** Check if > 5 people can merge to `main`. Check if PRs routinely wait > 7 days for review despite many maintainers.

### 29.5 No Process

**Real Example:** A project where everything was ad-hoc. New contributors were confused about how to contribute, what standards to follow, or who to ask for help.

**Prevention:**
- CONTRIBUTING.md must exist and be current
- Issue and PR templates configured
- Triage process documented and followed
- Decision-making process documented (see §4)

**Detection:** Absence of any of the above prevention items. Average time to first response > 72 hours.

### 29.6 Tokenism

**Real Example:** A project that added a person from an underrepresented group to the maintainer list but gave them no real power or support.

**Prevention:**
- Diversity initiatives must include: decision power, mentorship, resources
- Maintainers from underrepresented groups have equal vote and role
- Regular check-ins on inclusion and belonging
- Anonymous survey on community health

**Detection:** Compare diversity of maintainer list vs decision-making participation. Check if "diverse" maintainers have less commit/review activity.

### 29.7 Burnout Culture

**Real Example:** A project where the lead maintainer averaged 60-hour weeks for 2 years. They burned out, abandoned the project, and it took 6 months to find a replacement.

**Prevention:**
- Define maximum time commitments per role (see §3.3)
- Enforce responsive-only-during-working-hours culture
- Encourage and normalize breaks and sabbaticals
- Automation to reduce manual maintainer tasks
- Multiple maintainers per area for redundancy

**Detection:** Monitor commit timestamps. If any maintainer consistently commits at unusual hours or weekends, interview them about workload.

### 29.8 Ignoring Community

**Real Example:** A project with 10,000+ users and 5 active maintainers. A feature request with 500+ upvotes sat untouched for 18 months with zero maintainer response.

**Prevention:**
- Acknowledge all feature requests within 7 days
- Transparent prioritization (why some issues get picked and others don't)
- "Won't do" is a valid response — better than silence
- Community voting on roadmap items (annually)

**Detection:** Check for issues with > 50 reactions and no maintainer response. Check for stale `needs-triage` issues older than 7 days.

### 29.9 Gatekeeping

**Real Example:** A project where reviewers demanded perfection on first PRs. New contributors got 50+ review comments on a 10-line change. Most never submitted a second PR.

**Prevention:**
- Separate "required" from "optional" feedback in PR reviews
- First-time contributors get extra patience and encouragement
- Review guidelines include tone and empathy expectations
- Buddy system for first PRs (see §21.2)

**Detection:** Review first-time contributor PRs — check comment count. If average > 15 comments before merge, investigate.

### 29.10 Decision by Shouting

**Real Example:** A project where the loudest voices in Discord chat determined project direction, while quiet majority had no say. Decisions were inconsistent and often reversed.

**Prevention:**
- All significant decisions must go through documented process (see §4)
- Chat channels are for discussion, not decision (unless explicitly scoped)
- Written proposals before major changes
- Quiet stakeholders specifically solicited for input

**Detection:** Review major decisions — how many originated in unstructured chat vs formal proposal? If > 50% from chat, this is active.

---

## 30. Templates & Checklists

### 30.1 RFC Template

```markdown
---
title: "RFC-XXXX: [Title]"
status: DRAFT | REVIEW | ACCEPTED | REJECTED | IMPLEMENTED
author: @github-username
created: YYYY-MM-DD
discussion: [URL to discussion thread]
---

## Summary
One paragraph summarizing the proposal.

## Motivation
Why is this change needed? What problem does it solve?

## Detailed Design
Full specification of the proposed change.

## Drawbacks
What are the downsides? What trade-offs are being made?

## Alternatives Considered
| Alternative | Pros | Cons |
|-------------|------|------|
| Option A | ... | ... |
| Option B | ... | ... |

## Implementation Plan
- Phase 1: ...
- Phase 2: ...
- Timeline: ...

## Unresolved Questions
- What needs further investigation?
```

### 30.2 Conflict Resolution Log Template

```markdown
# Conflict Resolution Log

## Case ID: CR-2026-XXX

**Parties:** @person1 (Role), @person2 (Role)
**Type:** Technical / Personality / Behavioral / Other
**Level Resolved At:** 1 / 2 / 3 / 4 / Arbitration

## Timeline
| Date | Event |
|------|-------|
| YYYY-MM-DD | Conflict identified |
| YYYY-MM-DD | Level 1 attempted |
| YYYY-MM-DD | Resolution reached |

## Summary
[Description of the conflict, process, and outcome]

## Agreements
1. [Specific agreement]
2. [Specific agreement]

## Follow-Up
- Next check-in: YYYY-MM-DD
- By: @maintainer
```

### 30.3 Security Advisory Template

```markdown
# Security Advisory — SA-2026-XXX

**CVE:** CVE-2026-XXXX
**Severity:** Critical / High / Medium / Low (CVSS X.X)
**Discovered by:** @researcher (or anonymous)
**Affected versions:** X.Y.Z through X.Y.W

## Summary
[Brief description of the vulnerability]

## Impact
[What an attacker can do]

## Patched versions
- vX.Y.Z+1
- vA.B.C (LTS)

## Workarounds (if any)
[How to mitigate if patch cannot be applied]

## Timeline
| Date | Event |
|------|-------|
| YYYY-MM-DD | Reported |
| YYYY-MM-DD | Fix developed |
| YYYY-MM-DD | Coordinated disclosure |

## Credits
Thanks to @researcher for the responsible disclosure.
```

### 30.4 Release Approval Template

```markdown
# Release Approval Request

**Release version:** vX.Y.Z
**Type:** Stable / Beta / RC / Hotfix
**Release Manager:** @username
**Proposed date:** YYYY-MM-DD

## Checklist
- [ ] All target PRs merged
- [ ] Changelog generated and reviewed
- [ ] CI passes (full suite)
- [ ] Integration tests pass
- [ ] Performance tests meet thresholds
- [ ] All known P0/P1 bugs resolved
- [ ] Documentation updated
- [ ] Migration guide published (if breaking)

## Approvals
| Role | Approver | Date |
|------|----------|------|
| Release Manager | @user | — |
| Core Team (1) | @user | — |
| Core Team (2) | @user | — |
| Project Lead | @user | — |

## Post-Release
- [ ] Release notes published
- [ ] Announcement sent
- [ ] Package published
- [ ] Docker images pushed
```
### 30.5 Contributor Nomination Template

```markdown
# Contributor Nomination

**Nominee:** @username
**Nominated by:** @maintainer
**Proposed Role:** Regular Contributor / Area Maintainer / Core Maintainer

## Nomination Rationale
[2-3 paragraphs about why this person deserves the role]

## Contribution Summary
| Metric | Value |
|--------|-------|
| Merged PRs | [count] |
| PRs reviewed | [count] |
| Issues triaged | [count] |
| Active since | [date] |
| Areas of expertise | [list] |

## Supporting Evidence
- PR #[num]: [description]
- PR #[num]: [description]
- Issue #[num]: [notable triage or contribution]

## Endorsements
- @maintainer1: [quote]
- @maintainer2: [quote]

## Community Feedback Period
- Start: YYYY-MM-DD
- End: YYYY-MM-DD (7 days)

## Vote (for core team only)
| Voter | Vote |
|-------|------|
| @maintainer1 | ✅ / ❌ / ⏸️ |
| @maintainer2 | ✅ / ❌ / ⏸️ |
| Result: [Approved / Rejected] |
```

### 30.6 Governance Change Proposal Template

```markdown
# Governance Change Proposal

**Title:** [Descriptive title]
**Author:** @github-username
**Date:** YYYY-MM-DD
**Type:** MAJOR / MINOR / CLARIFICATION

## Current State
[What the governance document currently says]

## Proposed Change
[What the change would say]

## Rationale
[Why this change is needed]

## Impact Analysis
| Aspect | Impact |
|--------|--------|
| Community | [how it affects contributors] |
| Maintainers | [how it affects the team] |
| Projects | [how it affects multi-project governance] |
| External | [how it affects users or partners] |

## Migration Plan
- If adopted, how will the transition work?
- What supporting documents need updating?
- What is the grace period for compliance?

## Feedback Period
- Start: YYYY-MM-DD
- End: YYYY-MM-DD (14 days for MINOR, 30 days for MAJOR)
- Discussion: [link to GitHub Discussion]

## Vote
- Voting body: [Core Team / Framework Maintainers / Project Leads]
- Vote type: [Simple majority / Supermajority / Unanimous]
- Result: [Pending / Approved / Rejected]
```

---

> **End of Task-Governance Document (Global / Brain Box)**
>
> Part of the LifeJiggy OSS Enhancement Framework
> Last updated: 2026-05-29
