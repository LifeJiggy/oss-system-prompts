# OSS Sustainability & Longevity — Universal Reference

> A cross-project, cross-ecosystem reference guide for sustaining open source
> software projects through funding, community, governance, and thoughtful
> lifecycle management. Applicable to any OSS project regardless of language,
> domain, or scale.

---

## Table of Contents

1.  [Part 1: Funding Models for OSS](#part-1-funding-models-for-oss)
2.  [Part 2: Maintainer Burnout Prevention](#part-2-maintainer-burnout-prevention)
3.  [Part 3: Contributor Pipeline & Succession](#part-3-contributor-pipeline--succession)
4.  [Part 4: Community Building & Retention](#part-4-community-building--retention)
5.  [Part 5: Project Lifecycle Management](#part-5-project-lifecycle-management)
6.  [Part 6: Legal & Tax Considerations](#part-6-legal--tax-considerations)
7.  [Part 7: Measuring Sustainability](#part-7-measuring-sustainability)
8.  [Part 8: Templates & Practical Resources](#part-8-templates--practical-resources)

---

## Part 1: Funding Models for OSS

### 1.1 Open-Core

**How it works:** A core open-source product is offered freely under an OSI-approved
license. Proprietary extensions, enterprise features, or managed versions are sold
under a commercial license.

**Examples:** GitLab (CE vs EE), Mattermost, Nginx (OSS vs Nginx Plus), Redis (OSS
vs Redis Stack), Docker (Community vs Desktop/Enterprise), Sourcegraph.

**Advantages:** Low customer-acquisition cost since the OSS core acts as organic
marketing. Community contributions can feed back into the core, improving the
product for everyone. Clear upgrade path from free to paid.

**Disadvantages:** Risk of community friction when features are withheld behind
the paywall. Competitors can fork the OSS core and build their own proprietary
layer. Requires careful line-drawing between what is free and what is paid.

**Best for:** Infrastructure tools, developer tooling, platforms that benefit from
wide adoption and where enterprises self-select for advanced features (SSO, RBAC,
audit logging, compliance).

### 1.2 SaaS / Hosted Services

**How it works:** The OSS project runs as a cloud service. Users pay for hosting,
uptime SLAs, data retention, and managed operations. The software itself remains
fully open.

**Examples:** WordPress.com (Automattic), Ghost(Pro), Supabase, NocoDB, Plausible,
Cal.com, Sentry.

**Advantages:** Recurring revenue stream. Natural alignment with user value —
users pay for convenience, not for features. The OSS project benefits from the
SaaS engineering improvements. Strong vendor lock-in on data/configuration can
make switching costly.

**Disadvantages:** Requires operational expertise (devops, compliance, uptime).
Competes with self-hosted users who might otherwise pay. Cloud infrastructure
costs eat into margins. The SaaS may become the primary product, starving the OSS
project of attention.

**Best for:** Applications where the hosting experience is significantly better
than self-hosting, or where data persistence/backup is a critical concern.

### 1.3 Support & Subscription

**How it works:** The software is free. Users or companies pay for support
contracts — SLA guarantees, priority bug fixes, installation assistance, training,
consulting, or indemnification.

**Examples:** Canonical (Ubuntu Pro), Red Hat (RHEL subscriptions), Elastic
(Elasticsearch subscriptions), MongoDB Enterprise, HashiCorp.

**Advantages:** Enterprise procurement departments understand support contracts.
Predictable revenue. Direct feedback loop with paying customers who care about
stability. Can fund full-time maintainers.

**Disadvantages:** Sales cycles can be long. Requires a support infrastructure
(ticketing, SLAs, on-call rotation). High-touch support does not scale linearly.
May distort the roadmap toward enterprise needs at the expense of individual
users.

**Best for:** Infrastructure software, databases, middleware, or any project where
companies rely on it in production and need guarantees.

### 1.4 Dual-License

**How it works:** The software is available under two licenses: a strong copyleft
license (e.g., AGPL) for open-source use, and a commercial permissive license for
companies that want to incorporate the code into proprietary products without
disclosing their source.

**Examples:** MySQL (GPL vs commercial), MongoDB (SSPL-driven), Qt (LGPL vs
commercial), CockroachDB (BSL → Apache 2.0 after 3 years).

**Advantages:** Direct monetization of commercial use. Companies that redistribute
the software or embed it in proprietary products must pay. The copyleft license
ensures contributions flow back.

**Disadvantages:** License confusion and community backlash (MongoDB's SSPL
transition caused significant forking). Some companies will avoid the project
entirely due to license uncertainty. Requires legal review for each customer.

**Best for:** Libraries, databases, embedded software, or any project where
proprietary redistribution is common.

### 1.5 Consulting & Services

**How it works:** Maintainers or their company sell consulting services —
custom development, integration, training, migration, performance tuning, or
architecture review.

**Examples:** The Rust Foundation (consulting via member companies), WordPress
agencies, Drupal agencies, Python Software Foundation service providers.

**Advantages:** Low overhead — no product to build, just expertise to sell.
Hourly or project-based billing aligns with actual work delivered. Can be done
by individual maintainers without forming a company.

**Disadvantages:** Not passive income — every dollar requires billable hours.
Does not scale. Conflicts of interest may arise between paid consulting and
community priorities. Hard to transition away from consulting to product revenue.

**Best for:** Specialized, complex projects where expert knowledge is scarce.
Individual maintainers who want to fund their work before building a company.

### 1.6 Corporate Sponsorship

**How it works:** Companies sponsor the project — either directly, through a
foundation, or via employee time (allocated hours to contribute upstream).

**Tiered sponsorship model:**

| Tier | Annual Contribution | Typical Benefits |
|------|-------------------|------------------|
| Bronze | $1k–$5k | Logo on README, mention in release notes |
| Silver | $5k–$25k | Bronze + prioritized issue queue, advisory seat |
| Gold | $25k–$100k | Silver + roadmap influence, joint blog post |
| Platinum | $100k+ | Gold + board seat, dedicated maintainer time |

**LLC/enterprise programs:**
- **Google Summer of Code:** Pays $1,500–$3,300 per intern contribution to the
  project. Projects apply as mentoring organizations.
- **GitHub Sponsors matching:** For the first year, GitHub matched sponsor
  contributions up to $5k (program discontinued for new applicants as of 2024
  but may be revived).
- **Open Source Pledge** (sponsored by Sentry): Companies pledge $2k per
  developer per year to fund OSS.
- **Tidelift:** Companies subscribe to a "lifted" version of OSS packages,
  Tidelift pays maintainers a share of subscription revenue.

**Advantages:** Predictable funding if multi-year commitments are secured.
Legitimacy signal to other sponsors. Companies feel invested in the project's
success.

**Disadvantages:** Corporate influence on roadmap. Sponsorship concentration risk
(one company provides >50% of funding). Finding and maintaining sponsor
relationships is active work. Not suitable for small projects without a company
audience.

**Best for:** Mature projects with enterprise adoption. Projects with a clear
value proposition to specific companies.

### 1.7 Foundation Backing

**How it works:** The project is incubated under or transferred to a foundation
that provides legal, financial, and governance infrastructure.

**Fiscal sponsors:** Organizations that hold funds on behalf of OSS projects
without requiring the project to form its own legal entity.
- **Open Collective:** Accepts donations, handles accounting, provides
  transparency dashboards. Projects can pay expenses from their collective.
  Open Collective Foundation (501(c)(6)) and Open Collective Europe (ASBL)
  provide legal umbrella.
- **Software Freedom Conservancy:** 501(c)(3) fiscal sponsor. Handles
  accounting, legal, and trademark management. Does NOT pay maintainers
  directly — funds go to project activities.
- **Apache Software Foundation:** Provides infrastructure, legal, trademark,
  and brand management. Projects graduate from incubation to top-level.
- **Linux Foundation:** Hosts many major projects (Kubernetes, Node.js,
  Jenkins). Provides legal, events, marketing, and training infrastructure.
- **Python Software Foundation:** Hosts PyPI and related projects.
- **NumFOCUS:** Focused on scientific computing (NumPy, SciPy, Jupyter, pandas).

**Applying for incubation:**
1. Identify the appropriate foundation based on project domain.
2. Prepare a project proposal: governance model, roadmap, community metrics,
   existing funding, trademark information.
3. Submit a formal application (many foundations have a template).
4. Undergo incubation period (typically 6–24 months) where the foundation
   provides mentorship and infrastructure.
5. Graduate to top-level project status with full foundation benefits.

**Advantages:** Legal and financial infrastructure without the overhead of
forming your own entity. Credibility and trust (donors know their money is
handled responsibly). Tax-deductible donations in many jurisdictions.
Trademark and brand protection.

**Disadvantages:** Loss of autonomy — project decisions may need board or
foundation approval. Application process is non-trivial. Some foundations have
overhead fees (5–15% of funding). Foundation priorities may not align perfectly
with project priorities.

**Best for:** Projects that have outgrown individual maintainer management.
Projects that need trademark protection. Projects that want to accept
significant corporate donations with tax benefits for donors.

### 1.8 Individual Donations

**Platform comparison:**

| Platform | Fees | Tax Deductible | Recurring | Transparency |
|----------|------|---------------|-----------|--------------|
| GitHub Sponsors | 0% (first $10k matched in some regions) | Via fiscal host | Yes | Public profile |
| Patreon | 5–12% + payment processing | No (unless fiscal host) | Yes | Dashboard only |
| Open Collective | 10% fee + payment processing | Yes (fiscal host) | Yes | Fully public ledger |
| Buy Me a Coffee | 5% | No | Optional | Minimal |
| Ko-fi | 0% (payment processing only) | No | Yes | Minimal |
| Liberapay | 0% (donation-based) | No | Yes | Public profile |

**Strategies for growing individual donations:**
- Add a FUNDING.yml to your repository (see Part 8 for template).
- Mention sponsorship in your README, release notes, and documentation.
- Offer recognition: sponsor badges, thank-you list in releases, sponsor-only
  channels (within reason — don't fragment the community).
- Be transparent about goals: "We need $X/month to keep the project healthy."
- Share impact: "Thanks to our sponsors, we shipped 12 releases this year."
- Use GitHub's sponsor button in your repo sidebar.

**Advantages:** No strings attached — no roadmap influence. Diversified revenue
reduces single-point-of-failure risk. Low effort to set up. Can start from day
one, even before the project is mature.

**Disadvantages:** Unpredictable income. Tends to concentrate in a few large
donors. Not suitable as sole funding source for full-time maintainers in most
cases. Requires ongoing engagement to sustain.

**Best for:** Projects of any size. Particularly good as a supplemental funding
stream alongside other models.

### 1.9 Grant Funding

**Major grant programs:**

| Grant Program | Typical Amount | Focus | Application Cycle |
|--------------|----------------|-------|-------------------|
| NLnet / NGI Zero | €5k–€50k | Internet infrastructure, privacy, open standards | Quarterly |
| Sovereign Tech Fund | €50k–€300k | Critical open source infrastructure | Rolling |
| Alfred P. Sloan Foundation | $50k–$500k | Scientific computing, data infrastructure | Letter of inquiry |
| Mozilla Open Source Support (MOSS) | $10k–$500k | Mozilla mission-aligned projects | Periodic (currently paused) |
| Chan Zuckerberg Initiative (Essential OSS) | $50k–$250k | Biomedical research infrastructure | Annual |
| Open Technology Fund | $50k–$500k | Internet freedom, censorship circumvention | Rolling |
| Google Open Source Programs | $10k–$100k | Security, infrastructure | Various |
| Ford Foundation / Digital Infrastructure | $100k–$1M+ | Public-interest digital infrastructure | Periodic |
| Protocol Labs (IPFS ecosystem) | $5k–$200k | Decentralized web, content addressing | Rolling |
| Ethereum Foundation | $10k–$500k | Ethereum ecosystem, web3 infrastructure | Various |

**Grant-writing tips:**
- Read the grant guidelines thoroughly and follow them exactly.
- Be specific about deliverables, timeline, and budget.
- Describe the community impact in measurable terms.
- Highlight how the work benefits the broader ecosystem, not just the project.
- If you have a fiscal sponsor, mention their 501(c)(3) status — many grants
  require a US-based non-profit.
- Include letters of support from users or downstream projects.
- Be prepared for a 3–6 month timeline from application to funding.
- Even if rejected, ask for feedback — many programs will provide it.

**Advantages:** Significant funding for specific work. No equity or ownership
dilution. Prestigious — helps with other fundraising. Can fund work that
commercial models don't support (documentation, security audits,
accessibility).

**Disadvantages:** Application overhead (weeks of work). Reporting requirements.
Narrow scope — grant funds specific tasks, not general maintenance. Not
renewable indefinitely. Competition is increasing as more projects apply.

**Best for:** Infrastructure projects with clear public-good value. Projects
that can scope concrete deliverables (security audit, performance rewrite,
new protocol implementation).

### 1.10 Bounties & Bounty Programs

**How it works:** Individuals or organizations put up money for specific tasks —
bug fixes, features, documentation, security research. Contributors claim the
bounty upon completion.

**Platforms:**
- **Bountysource:** Older platform. Contributors pledge bounties on issues.
  Fees are high (10% + processing). Declining in popularity.
- **Algora:** Modern bounty platform. Supports time-based bounties (pay per
  hour) as well as fixed-price. Integrates with GitHub. 5% fee.
- **IssueHunt:** Supports bounties on GitHub issues. Also has a
  "fund future issues" feature. 10% fee.
- **Gitcoin:** Focused on web3/blockchain. Supports both fixed-price and
  competitive bounties. Large community of developers.
- **Hackenproof / HackerOne:** Bug bounty programs for security issues.
  Projects pay for verified vulnerability reports.

**Advantages:** Attracts new contributors who might not otherwise get involved.
Aligns payment with specific value delivered. Good for one-off tasks that
maintainers don't have time for.

**Disadvantages:** Can create perverse incentives (contributors chase high-paying
bounties instead of doing necessary maintenance). Quality control is harder.
Bounty disputes are common. May attract drive-by contributions that don't lead
to ongoing involvement. Tax implications for recipients.

**Best for:** Well-scoped, relatively isolated tasks. Security audits. New
contributor onboarding (by setting small, approachable bounties). Tasks that
have been sitting open for a long time.

### 1.11 Funding Model Comparison

| Model | Effort to Set Up | Effort to Maintain | Revenue Potential | Autonomy Risk | Best Project Stage |
|-------|-----------------|-------------------|-------------------|---------------|-------------------|
| Open-Core | High (product split) | Moderate | High | Medium | Mature, large adoption |
| SaaS / Hosted | High (ops infra) | High | High | Low | Growing, production users |
| Support / Subscription | Moderate | High | Medium–High | Medium | Mature, enterprise users |
| Dual-License | High (legal) | Moderate | High | High | Mature, library/embedded |
| Consulting | Low | High (time-bound) | Low–Medium | Low | Any |
| Corporate Sponsorship | Moderate | High (relationship mgmt) | Medium–High | Medium | Growing to mature |
| Foundation Backing | High (application) | Low (once accepted) | Medium | Medium | Growing to mature |
| Individual Donations | Very Low | Low | Low–Medium | None | Any |
| Grants | High (proposal) | Moderate (reporting) | Medium | Low | Any (scoped work) |
| Bounties | Low | Low | Low–Medium | Low | Any (scoped tasks) |

**Recommendation:** Most sustainable projects combine **3+ models**. For example,
a mature project might have: corporate sponsors (50%), individual donations
(20%), grants (15%), and support contracts (15%). Diversification is the single
most important principle.

---

## Part 2: Maintainer Burnout Prevention

### 2.1 Recognizing Burnout

Burnout is not simply being tired. It is a state of emotional, physical, and
mental exhaustion caused by prolonged stress. In OSS, it manifests uniquely.

**Early warning signs (self-assessment):**
- Dread when opening GitHub notifications or your issue tracker.
- Feeling irritated or angry at user requests that you would have welcomed before.
- Procrastinating on tasks that used to excite you.
- Declining health: poor sleep, headaches, changes in appetite.
- Feeling that your work is meaningless or unappreciated.
- Withdrawing from community interactions.
- Imposter syndrome intensifies despite evidence of competence.

**Behavioral signs visible to others:**
- Response times increase significantly (days → weeks → never).
- Responses become shorter, more terse, or hostile.
- Maintainer abruptly steps away without transition plan.
- Code review quality declines (rubber-stamping or overly nitpicking).
- Documentation and communication become sparse.
- Releases are skipped or rushed.
- The maintainer starts "rage-quitting" conversations or threads.

**Famous burnout cases:**

- **faker.js / colors.js (Marak Squires, 2022):** The maintainer deliberately
  introduced infinite loops and data corruption into widely-used npm packages
  (faker.js and colors.js, combined 20M+ weekly downloads). His stated reasons
  included lack of funding and unpaid maintenance burden. The incident caused
  cascading failures across thousands of downstream projects and prompted
  industry-wide discussion about maintainer compensation and the fragility of
  the npm ecosystem.

- **curl (Daniel Stenberg):** Daniel has maintained curl for 25+ years. He has
  publicly discussed burnout multiple times, describing the weight of being the
  primary maintainer of a tool used by billions. He has implemented systems to
  reduce his burden: automation, a large team of co-maintainers, and strict
  boundaries around his time. His talks at FOSDEM and other conferences are
  essential viewing for understanding long-haul maintainer sustainability.

- **Babel (Henry Zhu):** Henry Zhu maintained Babel while working part-time and
  dealing with chronic illness. He publicly shared his burnout journey,
  emphasizing the emotional toll of unpaid labor on critical infrastructure.
  Babel now has a more distributed maintenance model through sponsor funding.

- **Ruby on Rails (David Heinemeier Hansson):** DHH has been vocal about taking
  extended breaks from Rails development to prevent burnout. His approach
  includes delegating to a core team, setting clear boundaries, and not
  feeling obligated to respond to every issue or PR.

- **Homebrew (Mike McQuaid):** Mike wrote extensively about the "maintainer
  staircase" — the progression from enthusiastic contributor to burned-out
  maintainer. He documented Homebrew's governance changes as a response to
  maintainer attrition.

- **Redis (Salvatore Sanfilippo - antirez):** In 2020, antirez stepped down as
  the lead maintainer of Redis, citing the emotional weight of running one of
  the most popular databases. He handed over to a Redis Labs team, ensuring the
  project continued.

- **npm (Isaac Schlueter):** Isaac handed over npm leadership after years of
  solo maintenance, describing the weight of shepherding the Node.js package
  ecosystem.

### 2.2 Root Causes of Burnout

| Cause | Description | Frequency |
|-------|-------------|-----------|
| **Solo maintenance** | Single person carrying the entire project | Very common in early-stage projects |
| **Unrealistic expectations** | Users expect 24/7 response, immediate fixes | Very common |
| **Entitlement from users** | Demanding tone, lack of gratitude, threats of forking | Very common |
| **Lack of funding** | No financial support despite thousands of users | Very common |
| **Lack of governance** | No decision-making framework, every decision falls on one person | Common |
| **Scope creep** | Project grows beyond original intent without resource scaling | Common |
| **Imposter syndrome** | Maintainer feels inadequate despite clear competence | Common |
| **Hostile community** | Toxic interactions, harassment, difficult bug reporters | Less common but severe |
| **Emotional labor** | Policing discussions, enforcing CoC, mentoring new contributors alone | Common |
| **Technical debt** | Codebase becomes unmaintainable, every change is painful | Common |
| **Upstream pressure** | Downstream projects demanding changes for their timelines | Common in infrastructure projects |

### 2.3 Burnout Prevention Strategies

#### Strategy 1: Shared Maintenance

**Why it works:** Distributing responsibility across multiple people reduces the
load on any single individual. It also creates redundancy (bus factor) and
brings diverse perspectives.

**How to implement:**
- Identify candidates for co-maintainer roles from active, reliable contributors.
- Formalize a core team with defined responsibilities (e.g., "releases,"
  "triage," "documentation," "community").
- Use GitHub teams with tiered permissions.
- Rotate on-call / triage duty weekly among team members.
- Have at least two people who can perform every critical task.

**Real example:** Node.js uses a "TSC" (Technical Steering Committee) with
rotating chair. No single person can block decisions or releases. The build
and release process is documented and automated so multiple people can cut a
release.

#### Strategy 2: Setting Boundaries

**Why it works:** Explicit expectations prevent the feeling of being always
"on call." Users calibrate their behavior to match stated boundaries.

**How to implement:**
- Set and publish "responding hours" in your README or contributing guide
  (e.g., "I respond to issues within 48 hours, Monday–Friday.")
- Use issue templates with explicit disclaimers: "This is NOT a support forum.
  For support, see [link]."
- Have a clear separation between bug reports, feature requests, and support
  questions. Close support questions with a pointer to the right place.
- Use a "no is temporary, yes is forever" mindset — it's okay to say no to
  features or even to maintaining a feature.
- Block off personal time and vacations. Use vacation mode on GitHub Sponsors
  and auto-responders on email.

**Example template language:**
```
This project is maintained by volunteers in their spare time. We aim to
respond within 3 business days. If you need a faster response, please
consider becoming a sponsor at [link].
```

#### Strategy 3: Automation

**Why it works:** Repetitive tasks are automated, freeing human attention for
work that requires judgment and creativity.

**What to automate:**
- **CI/CD:** GitHub Actions, CircleCI, Jenkins — run tests, linting, formatting,
  and static analysis on every PR.
- **Issue triage bot:** Use GitHub Actions or Probot to automatically label
  issues, close duplicates, and request missing information.
- **Stale-bot:** Automatically mark issues/PRs with no activity for 60 days as
  "stale" and close them after 14 more days of inactivity.
- **Dependency updates:** Use Dependabot or Renovate to automatically create
  PRs for dependency updates.
- **Release automation:** Use semantic-release, release-please, or changesets
  to automate changelog generation, version bumping, and publishing.
- **Welcome bot:** Automatically welcome first-time contributors with a
  comment and links to contributing guidelines.
- **Code quality bot:** Use tools like CodeRabbit, SonarCloud, or CodeClimate
  to automatically review code style and common issues.

**Real example:** Kubernetes uses extensive automation including Prow (a
CI/CD system originally built for K8s), tide for merge queuing, and label
syncing. The project processes thousands of PRs per week with relatively few
human reviewers making decisions.

#### Strategy 4: Delegation & Onboarding

**Why it works:** Delegation increases project capacity without increasing any
one person's load. It also creates growth pathways for contributors.

**How to implement:**
- Maintain a clear CONTRIBUTING.md that tells people exactly how to help.
- Label issues by difficulty: `good-first-issue`, `help-wanted`, `mentored`.
- Create a "triage team" of trusted contributors who can handle issue
  management (labeling, closing duplicates, requesting info).
- Create a "documentation team" of contributors who handle docs issues only.
- Onboard new maintainers with a buddy system — pair them with an existing
  maintainer for the first month.
- Regularly ask: "What task am I doing that someone else could do?"

#### Strategy 5: Taking Breaks

**Why it works:** Restoration is not optional — it is a prerequisite for
sustainable long-term contribution. Every maintainer needs time away.

**How to implement:**
- Schedule a "maintainer sabbatical" of 1–3 months every 1–2 years.
- Document everything so the project can run without you (see Part 3).
- Use GitHub's "scheduled reminders" feature to limit notification checking.
- Uninstall Slack/Discord from your phone. Set email boundaries.
- Have a backup maintainer who can step in during your absence.
- Communicate breaks publicly in advance: "I will be unavailable from
  Dec 15–Jan 5. Project will be on reduced responsiveness."

**Real example:** The Django project's "Django Fellowship" program paid
maintainers to work full-time on Django, with clear boundaries and time off.
When the Fellowship ended, Django transitioned to a "Django Commons" model
where multiple organizations fund maintainer time.

### 2.4 Recovery from Burnout

**If you are currently burned out:**

1. **Stop.** The most important step is to stop working on the project. The
   code will survive without you for a week or a month.

2. **Communicate.** Post a public message: "I need to step back for personal
   reasons. [Name] will handle critical issues. I'll be back [date]."

3. **Get support.** Talk to other maintainers (there are communities like
   the Maintainers Anonymous Slack, or the Open Source Maintainers mailing
   list). Talk to a therapist if possible.

4. **Re-evaluate.** What aspects of the work were most draining? What can
   be changed to prevent recurrence? Do you need to step down permanently?

5. **Plan your return (or exit).** If returning, come back with new boundaries
   and a delegation plan. If leaving, ensure a smooth handoff (see
   Part 5 — Archiving).

**How to recover a project after maintainer burnout:**

- **If the maintainer has left:** The community often needs to fork the project
  or form a new governance body. Examples: io.js forked from Node.js (later
  re-merged), LibreOffice forked from OpenOffice.

- **If the maintainer is returning but changed:** Support the new boundaries.
  Do not pressure them to return to their previous level of output.

- **Systemic changes:** The Tidelift and the Linux Foundation's CHAOSS project
  both maintain resources for projects recovering from maintainer attrition.

### 2.5 Burnout Self-Assessment Questionnaire

The following questionnaire (adapted from the Maslach Burnout Inventory for
OSS contexts) can help maintainers assess their current state:

```
Rate each statement from 0 (never) to 6 (every day):

1. I feel emotionally drained from my OSS work.
2. I feel used up at the end of a day of maintaining.
3. I dread opening my issue tracker or notifications.
4. I feel I'm treating users as impersonal objects.
5. I feel like my OSS work is hardening me emotionally.
6. I feel like the project would be fine without me.
7. I have become more cynical about whether OSS matters.
8. I feel like I'm accomplishing very little of value.
9. I feel like no one appreciates what I do.
10. I snap or get irritated at users more than I used to.

Scoring:
0–15: Healthy. You have good boundaries and support.
16–30: Mild risk. Monitor yourself and consider delegating more.
31–45: Moderate risk. Take action: delegate, set boundaries, take a break.
46–60: High risk. You likely need professional support and a significant break.
```

---

## Part 3: Contributor Pipeline & Succession

### 3.1 Mentorship Models

#### Structured Mentorship (GSoC, Outreachy, LFX)

**How it works:** A time-bound program (typically 3 months) where a paid intern
works on a defined project under the guidance of an experienced maintainer.

**Programs:**
- **Google Summer of Code (GSoC):** 12-week program. Students (or newcomers)
  contribute to OSS. Google pays the contributor a stipend ($1,500–$3,300
  depending on region). Projects apply as mentoring organizations.
- **Outreachy:** 3-month paid internship focused on diversity in tech. Open
  to people impacted by systemic bias. Stipend is $7,000. Projects apply as
  participating organizations.
- **LFX Mentorship (Linux Foundation):** 12-week paid mentorship for Linux
  Foundation projects. Stipend varies.
- **Season of Docs (Google):** Focused on technical writers improving OSS
  documentation. Paid.

**Best practices for structured mentorship:**
- Prepare a well-scoped project BEFORE the program starts.
- Have clear milestones and deliverables.
- Schedule weekly 1:1 video calls with the mentee.
- Assign a mentor AND a co-mentor (for coverage).
- Provide onboarding documentation for the codebase and community.
- Encourage the mentee to attend community meetings.
- Have a "Plan B" if the project proves too ambitious.
- Require regular blog posts or updates.
- After the program, create a pathway to continued contribution.

#### Organic Mentorship

**How it works:** Experienced contributors naturally mentor newcomers through
code review, issue comments, and informal chat.

**How to encourage organic mentorship:**
- Ensure code review is constructive, not just gatekeeping.
- Point newcomers to specific lines/files: "Look at how file X does Y."
- Offer to pair program on complex changes.
- Invite newcomers to community calls.
- Answer "silly" questions patiently.
- Create a `#newcomers` or `#mentorship` channel on your community platform.

**Pitfalls to avoid:**
- Senior maintainers doing all the work themselves (increases bus factor).
- Reviewers being dismissive or gatekeeping.
- Not following up with promising contributors.

#### Pair Programming

**How it works:** Two developers work on the same code simultaneously. In OSS,
this often happens asynchronously through detailed code review, or synchronously
via screen-sharing sessions.

**Benefits for onboarding:**
- Knowledge transfer happens naturally.
- The new contributor sees how an experienced maintainer thinks.
- Code quality is high from the start (no "fix it later" learning curve).
- Builds personal rapport between contributors.

### 3.2 From User to Contributor

The journey from user → contributor → maintainer should be a clear, intentional
pathway with on-ramps at every stage.

**Stage 1: User**
- Signs of readiness: Filing detailed bug reports, participating in discussions,
  writing documentation or blog posts about the project.
- On-ramp: Thank them publicly. Ask if they'd like to help with a related fix.

**Stage 2: Occasional Contributor**
- Signs of readiness: Submitting occasional PRs (typos, docs, simple bugs).
- On-ramp: Offer guidance on more significant issues. Invite to community calls.

**Stage 3: Regular Contributor**
- Signs of readiness: Multiple merged PRs. Understanding of codebase structure.
  Participating in code review of others' PRs. Helping triage issues.
- On-ramp: Ask them to join the triage team. Offer commit access to specific
  areas. Ensure they feel ownership of a module or feature.

**Stage 4: Core Contributor / Maintainer**
- Signs of readiness: Consistently high-quality contributions. Understanding
  of project vision. Mentoring other contributors. Representing the project in
  discussions.
- On-ramp: Formal vote by existing maintainers. Onboarding process (see
  Section 3.4). Commit access to the main branch. Access to project resources.

**Creating clear pathways:**
- Document these stages in CONTRIBUTING.md.
- Use GitHub's "contributors" graph to track contributions.
- Personally invite people to the next stage — don't wait for them to ask.
- Remove barriers: have clear criteria for each stage.

### 3.3 From Contributor to Maintainer

**Criteria for promotion to maintainer:**
- Consistent track record of quality contributions (no fixed number, but
  typically 10–50+ merged PRs depending on project complexity).
- Demonstrated understanding of project architecture and conventions.
- Responsiveness to review feedback.
- Ability to review others' code constructively.
- Alignment with project values and community norms.
- Participation in community discussions and decision-making.
- Typically 6–12 months of active contribution.

**Who decides:**
- **Benevolent Dictator For Life (BDFL):** The BDFL decides personally.
- **TSC/Core Team vote:** Maintainers vote on new members. Majority or
  supermajority required.
- **Consensus model:** No objections from existing maintainers after a
  discussion period.
- **Apprenticeship model:** Contributor is assigned a mentor maintainer who
  recommends promotion after a probationary period.

**Onboarding process:**
1. Announce the promotion publicly (blog post, release notes, social media).
2. Add to MAINTAINERS.md and AUTHORS.md.
3. Grant appropriate GitHub permissions (maintain team, npm/crates.io/pypi
  publishing rights).
4. Give access to project resources (CI configuration, domain, hosting,
  social media accounts).
5. Schedule a "shadowing" period where the new maintainer pairs on releases
  and critical processes.
6. Assign an existing maintainer as a "buddy" for the first 3 months.

### 3.4 Succession Planning

**Bus factor:** The minimum number of team members that, if suddenly incapacitated
(bus accident, departure, etc.), would cause the project to fail.

**Bus factor documentation checklist:**
- [ ] MAINTAINERS.md file with roles and responsibilities.
- [ ] Emergency contact information (private, shared with trusted team).
- [ ] Access to critical accounts: GitHub organization owner, package
      registries (npm, PyPI, RubyGems, crates.io), domain registrar,
      DNS provider, CI/CD services, social media accounts, funding platforms
      (Open Collective, GitHub Sponsors), cloud service accounts.
- [ ] Key escrow: a password manager (Bitwarden, 1Password) shared among
      the core team with access to critical accounts.
- [ ] Documentation of release process.
- [ ] Documentation of CI/CD configuration.
- [ ] Documentation of infrastructure setup (how to reproduce the build
      environment).
- [ ] Runbook for common operational tasks (handling security reports,
      responding to outages, processing sponsorship payments).
- [ ] Critical contacts list: foundation contacts, key sponsors, legal
      contacts, hosting providers.

**Creating a succession plan:**

1. **Identify critical roles.** What does the project need to survive?
   - Release manager
   - Community manager
   - Security contact
   - Infrastructure (CI/CD, hosting) contact
   - Funding/finance contact
   - Legal/trademark contact

2. **Identify successors.** For each role, identify at least one person who
   could step in. If no successor exists, that role is a bus factor of 1.

3. **Document.** Write down the plan in a PRIVATE document shared with the
   core team. (Public succession plans can cause concern.)

4. **Cross-train.** Rotate responsibilities so multiple people know how to
   perform each role.

5. **Test.** Annually, simulate a bus factor event: the primary person for
   each role is unavailable. Can the project still function?

### 3.5 Documenting Knowledge

**Architecture Decision Records (ADRs):**
A short document capturing a significant architectural decision and its
rationale. Format:

```
# ADR-001: Use PostgreSQL over MySQL

## Status
Accepted

## Context
We need a relational database for user data. Options: PostgreSQL, MySQL.

## Decision
Use PostgreSQL.

## Consequences
- Pro: Better support for JSON, full-text search, and concurrent access.
- Con: Higher memory usage compared to MySQL.
```

**Design docs:** One-page overviews of major subsystems. Audience: new
contributors who need to understand the codebase.

**Runbooks:** Step-by-step instructions for operational tasks:
```
# Release process
1. Run `npm run changelog` to generate changelog.
2. Create a PR with the changelog changes.
3. After merge, tag the release: `git tag v2.1.0`
4. Push the tag: `git push origin v2.1.0`
5. CI will automatically publish to npm.
6. Update the GitHub release with release notes.
7. Post in #announcements on Discord.
```

**Style guides:** Programming conventions for the project. Include code
examples. Reduce review friction on style issues.

**Tutorials:** Step-by-step guides for specific tasks. Updated regularly to
match the current codebase.

**Onboarding checklist for new maintainers:**
```
[ ] Read the project README and documentation.
[ ] Set up local development environment (document any issues encountered).
[ ] Review the last 5 merged PRs to understand review standards.
[ ] Shadow the release process for one release.
[ ] Shadow the triage process for one week.
[ ] Read the project's ADRs and design docs.
[ ] Set up access to project tools (CI, hosting, package registry).
[ ] Meet the other maintainers (1:1 video calls).
[ ] Review the security policy and vulnerability reporting process.
[ ] Read the project's license and any contributor agreements.
```

### 3.6 Reducing Bus Factor — Checklist

| Area | Single Point of Failure? | Mitigation |
|------|-------------------------|------------|
| **Release process** | Only one person can cut a release | Document release process, have backup releaser |
| **CI/CD config** | Only one person understands Jenkins/GHA config | Document config, rotate CI maintenance |
| **Domain & DNS** | Only one person has access to registrar | Share access via team email, use password manager |
| **Package registry** | Only one person has npm/PyPI publish rights | Add all maintainers as package owners |
| **Funding accounts** | Only one person can withdraw from Open Collective | Add multiple admins |
| **Trademark** | One person is the registered owner | Transfer to foundation or shared ownership |
| **Security contact** | One person handles all security reports | Set up security@ alias to a team |
| **Community management** | One person runs community calls | Rotate meeting facilitation |
| **Documentation** | One person knows how docs are built | Document the docs build process |
| **Architecture knowledge** | One person understands the full codebase | Write ADRs, pair program, rotate code review |

**Real-world bus factor incidents:**

- **EventStream (2018):** A malicious package was injected into EventStream
  (2M weekly npm downloads) after the original maintainer gave commit access
  to a stranger. No sufficient bus factor — the maintainer was overwhelmed and
  offloaded work carelessly.

- **colors.js / faker.js (2022):** Single maintainer, zero bus factor.
  The maintainer deliberately sabotaged his own packages, affecting thousands
  of downstream projects.

- **left-pad (2016):** The package (used by thousands of projects) was
  unpublished from npm after a naming dispute. Single maintainer, single point
  of removal. npm changed their unpublish policy as a result.

- **curl:** Daniel Stenberg is the BDFL but has intentionally built a large
  team of co-maintainers. The project has multiple people who understand
  every subsystem. Bus factor is estimated at 5+.

---

## Part 4: Community Building & Retention

### 4.1 Onboarding Experience

The first interaction a newcomer has with your project determines whether
they become a regular contributor or a drive-by. Invest in the onboarding
experience.

**First-issue labeling:**
- `good-first-issue`: Reserved for newcomers. Should be well-scoped, with
  clear instructions and links to relevant code. Should not require deep
  domain knowledge. Should have a mentor assigned.
- `help-wanted`: Open to anyone, but may require more project knowledge.
  Should include context about what's needed.
- `mentored`: An issue where a specific maintainer has agreed to guide the
  contributor through the process.

**Good first issue checklist:**
- [ ] Clear description of the problem.
- [ ] Links to the relevant files or lines of code.
- [ ] Suggested approach if applicable.
- [ ] Naming a mentor who will review the PR.
- [ ] Expected time to complete (e.g., "2–4 hours").
- [ ] Related documentation if needed.

**Onboarding automation:**
- Welcome bot: When a user opens their first issue or PR, the bot comments
  with links to CONTRIBUTING.md, the Code of Conduct, and the community
  platform.
- First-time contributor badge: Some projects use a flair or badge to
  signify first-time contributors, encouraging existing community members
  to be extra welcoming.

**Good-first-issue bracketing:** A technique where a maintainer prepares a
batch of 5–10 good-first-issues at once. Benefits:
- Consistent quality across all issues.
- Mentors can be pre-assigned.
- Batching reduces overhead compared to writing one at a time.
- Ensures there are always welcoming entry points available.

**Mentorship pairing:**
- When someone claims a good-first-issue, automatically assign a mentor
  maintainer.
- The mentor's job: check in within 24 hours, review the PR within 48 hours,
  provide constructive feedback, ensure the contributor feels welcomed.
- Use a CRISP mentoring template:
  - **C**larify: Ask if they have questions about the issue.
  - **R**esources: Point to relevant code and docs.
  - **I**terate: Encourage them to start with a draft PR.
  - **S**upport: Offer to pair on the first few commits.
  - **P**raise: Thank them publicly on merge.

### 4.2 Recognition Systems

People stay in communities where they feel valued. Recognition is a critical
retention tool.

**Contributor profiles:**
- Maintain a CONTRIBUTORS.md or Hall of Fame in your README.
- Use GitHub's automatic contributor graph (Insights → Contributors).
- Acknowledge ALL contributions, not just code: documentation, design,
  community management, translation, testing, reporting bugs.

**Release thank-yous:**
- Every release should acknowledge new contributors. Template:
  ```
  ## v2.1.0 (2026-05-19)

  ### New Contributors
  - @alice made their first contribution in #123 (new feature: X)
  - @bob made their first contribution in #124 (bug fix: Y)

  ### Full Changelog
  - ...
  ```
- Use the `--contributor-list` feature of release tools like
  `auto-changelog` or `release-please` to auto-generate contributor lists.

**Commit access progression:**
- Tier 1: No commit access (external contributor).
- Tier 2: Triage access (can label and close issues).
- Tier 3: Write access to specific areas (documentation, tests, non-critical
  modules).
- Tier 4: Full write access (all branches).
- Tier 5: Admin access (organization settings, publishing rights).
- Clear criteria for each tier. Publicly documented.

**Other recognition methods:**
- "Contributor of the Month" spotlights on social media.
- Stickers, t-shirts, or swag for significant contributions (many projects
  use Open Collective to fund swag).
- Invitation to contributor-only events or dinners at conferences.
- Speaking opportunities: "Our contributor @alice spoke about the project at
  PyCon."
- Badges or certifications (e.g., "Kubernetes Certified").

### 4.3 Communication Culture

**Welcoming tone:**
- Use inclusive language ("they/them", "everyone", "folks").
- Default to assuming good faith.
- Thank contributors for their work, even for small contributions.
- Use emoji reactions liberally (especially :-1: for "thank you" and
  :rocket: for approvals).
- Avoid sarcasm, passive aggression, or one-upping.

**No stupid questions:**
- Create a dedicated #newcomers or #help channel.
- Appoint "welcomers" whose role is to answer questions patiently.
- Post a pinned message: "There are no stupid questions. Everyone was new
  once."
- When someone asks the same question repeatedly, improve the FAQ or
  documentation rather than blaming the asker.

**Code of Conduct enforcement:**
- Adopt a well-known CoC (Contributor Covenant is the most common).
- Have a clear enforcement process documented in the CoC.
- Appoint at least two CoC enforcement contacts (not project leads, to
  avoid power imbalance).
- Enforce consistently — unaddressed violations drive away good contributors.
- Document enforcement actions privately (with timestamps, evidence, and
  rationale).
- Transparency: report periodic summary statistics (e.g., "2025: 3
  violations, 2 warnings, 1 removal").

**Communication channels and their purposes:**

| Channel | Purpose | Tone |
|---------|---------|------|
| GitHub Issues | Bug reports, feature requests, task tracking | Formal, structured |
| GitHub Discussions | Q&A, ideas, show and tell | Semi-formal |
| Discord / Slack | Real-time chat, community building | Casual |
| Mailing list | Announcements, RFCs, governance | Formal |
| Blog | Updates, deep dives, release notes | Professional |
| Social media | Promotion, engagement, recruitment | Casual |

### 4.4 Events

**Contributor summits:** A gathering (often co-located with a conference) of
core contributors to plan the roadmap, discuss governance, and build
relationships. Usually 1–2 days, invitation or application based.

**Hackathons:** A focused event (24–72 hours) where participants work on the
project. Can be in-person or virtual. Often themed around a specific goal
(e.g., "Accessibility Hackathon", "Performance Sprint").

**Meetups:** Local groups that meet regularly to discuss and contribute to
the project. The project can support meetups by:
- Providing speaker slides and templates.
- Listing official meetups on the project website.
- Sending swag to meetup organizers.
- Having maintainers give virtual talks at meetups.

**Conference talks:**
- Track conference CFPs and submit regularly.
- Have a pool of slides/templates for common talk topics.
- Sponsor community members to attend and speak (via travel grants).
- Prioritize first-time speakers from underrepresented groups.

**Virtual events:**
- Monthly community calls (open to all, recorded).
- Office hours (specific maintainers available for questions).
- Release parties (streamed, interactive).
- AMA sessions with maintainers.

### 4.5 Measuring Retention

**Contributor cohort analysis:**
Track groups of contributors who started in the same time period (cohorts)
and measure how many remain active after 1, 3, 6, 12 months.

**Example retention table:**

| Cohort (joining period) | Joined | Active after 1mo | Active after 3mo | Active after 6mo | Active after 12mo |
|------------------------|--------|-----------------|-----------------|-----------------|------------------|
| 2025 Q1 | 50 | 35 (70%) | 20 (40%) | 12 (24%) | 8 (16%) |
| 2025 Q2 | 45 | 32 (71%) | 18 (40%) | 10 (22%) | 6 (13%) |
| 2025 Q3 | 55 | 40 (73%) | 22 (40%) | 14 (25%) | — |
| 2025 Q4 | 48 | 34 (71%) | 19 (40%) | — | — |

If retention drops significantly between cohorts, investigate what changed
(tooling, community culture, project direction).

**Churn rate by role:**
- **Drive-by contributors:** Contribute once, never return. Baseline churn.
  Goal: reduce by improving first-time experience.
- **Regular contributors:** Contribute multiple times. Churn often indicates
  community friction or lack of growth pathways.
- **Maintainers:** Churn here is critical. Conduct exit interviews to
  understand why. Common reasons: burnout, lack of funding, toxic community,
  project direction disagreement.

**Leading indicators of retention problems:**
- New contributors consistently report poor experience (survey).
- Time to first response on PRs increasing.
- PR merge rate decreasing.
- Public discussions becoming more hostile.
- Maintainer response time increasing.
- Number of first-time contributors decreasing.
- Diversity of contributor base decreasing.

### 4.6 Diversity & Inclusion

**Why diversity matters for sustainability:**
- Diverse teams produce better software (multiple studies confirm).
- A homogeneous maintainer team has higher bus factor (all from similar
  backgrounds, often same company).
- Diversity expands the pool of potential maintainers.
- Inclusive communities are more resilient to conflict.
- Funding sources increasingly require diversity and inclusion commitments.

**Outreach programs:**
- Outreachy: 3-month paid internships for people impacted by systemic bias.
- Google Summer of Code: open to all students and newcomers.
- Rails Girls, PyLadies, Women Who Go, RustBridge: workshops for
  underrepresented groups.
- Diversity scholarships to conferences (often funded by sponsors).

**Inclusive language:**
- Use `they/them` pronouns until someone states their preference.
- Avoid ableist language ("crazy", "insane", "dumb", "lame").
- Avoid gendered language ("guys" → "everyone", "freshman" → "first-year",
  "whitelist/blacklist" → "allowlist/denylist", "master/slave" → "primary/replica").
- Use plain language, avoid jargon and acronyms without explanation.
- Write documentation at a reading level accessible to non-native speakers.

**Accessibility of contribution:**
- Ensure documentation is screen-reader compatible (proper heading hierarchy,
  alt text on images).
- Provide contribution options that don't require synchronous communication
  (text-based mentoring, recorded office hours).
- Offer multiple communication platforms (some users can't or don't want to
  use Discord/Slack).
- Ensure the code of conduct mentions accommodations for contributors with
  disabilities.
- Consider time zones when scheduling meetings — rotate meeting times.
- Keep contribution barriers low: clear setup instructions, minimal
  dependencies, CI that catches common issues.

---

## Part 5: Project Lifecycle Management

### 5.1 Project Stages

Every open source project goes through a lifecycle. Understanding which stage
your project is in helps you make appropriate decisions about governance,
funding, and community building.

| Stage | Characteristics | Typical Resourcing |
|-------|----------------|-------------------|
| **Concept** | An idea, prototype, or proof of concept. No users besides the creator. | Solo developer, spare time |
| **Incubating** | Working software. Early adopters. Bugs are common. APIs are unstable. | 1–3 contributors, part-time |
| **Growing** | Real users in production. Growing issue tracker. First community contributions. | 3–10 contributors, 1–2 full-time if funded |
| **Mature** | Stable API. Large user base. Enterprise adoption. Formal governance. | 10+ maintainers, dedicated foundation or company |
| **Legacy** | Few new features. Emphasis on stability and security patches. | 1–3 maintainers, often volunteer |
| **Archived** | No active development. Repository made read-only. | 0 maintainers |

**Stage transitions:**

- **Concept → Incubating:** When someone other than the creator starts using
  the software. Create a basic contributing guide and issue templates.
- **Incubating → Growing:** When external contributors start submitting PRs.
  Add a Code of Conduct, governance document, and formalize the core team.
- **Growing → Mature:** When the project has stable APIs and a large user
  base. Form a legal entity or join a foundation. Establish formal governance.
- **Mature → Legacy:** When the ecosystem shifts, the project is replaced by
  alternatives, or maintainer energy shifts to newer projects.
- **Any → Archived:** When the project is no longer actively maintained (see
  Section 5.2).

### 5.2 When to Archive a Project

**Checklist of signs:**
- [ ] Maintainer(s) consistently take >4 weeks to respond to critical issues.
- [ ] No releases in the past 12 months.
- [ ] Issue tracker has 100+ unaddressed issues.
- [ ] PR backlog with no reviews.
- [ ] No active community discussions.
- [ ] Dependencies are outdated and the project is no longer buildable.
- [ ] No one is willing to step up as maintainer.
- [ ] The project has been superseded by a better alternative.
- [ ] Security vulnerabilities are reported but not fixed.
- [ ] Traffic has been declining for 6+ months.

**Pre-archive checklist:**
- [ ] Notify the community (GitHub discussion, mailing list) 30 days before
      archiving.
- [ ] Give the community a chance to step up as new maintainers.
- [ ] Document how to migrate away from the project.
- [ ] Write a migration guide for current users.
- [ ] Transfer the project to a foundation or archiving organization if
      appropriate.
- [ ] Tag a final release with a clear message.
- [ ] Update the README with archiving notice.
- [ ] Make the repository read-only.
- [ ] Archive the package on package registries (or deprecate with a notice
      pointing to alternatives).

**Archiving notice template (for README):**

```
# ⚠️ Project Archived

This project is no longer actively maintained. It has been archived for
the following reasons:

- [Reason 1, e.g., "The maintainer has moved on to other projects."]
- [Reason 2, e.g., "Project X has become the de-facto standard for this
  domain."]

## What does this mean?
- The repository is read-only.
- No new releases will be published.
- Issues and pull requests are closed.
- The package remains on [npm/PyPI/etc.] for existing users.

## Migration
We recommend migrating to [Alternative Project] ([link]). See the
[MIGRATION.md](./MIGRATION.md) guide for detailed steps.

## Thank you
Thank you to all contributors and users over the years. This project
would not have been possible without you.
```

**Notable archived projects:**
- **Bower (2017):** Package manager for front-end libraries. Superseded by npm
  and Yarn. Repository archived with migration guide.
- **Yeoman (2023):** Web application scaffolding tool. Active for 10+ years.
  Archived with a thank-you to contributors.
- **Atom Editor (2022):** GitHub's text editor. Archived in favor of VS Code
  integration. Migration paths provided.
- **Sinatra (partial archive, 2024):** Not fully archived but maintainership
  moved to a community team after the original creator stepped back.

### 5.3 Archiving Responsibly

**The difference between responsible and irresponsible archiving:**

| Responsible | Irresponsible |
|-------------|---------------|
| Gives 30+ days notice | Archives without warning |
| Provides migration guide | Leaves users stranded |
| Updates README clearly | Changes nothing, just stops responding |
| Deprecates package with redirect | Removes package from registry |
| Responds to questions about the archive | Ignores all messages |
| Transfers ownership if possible | Orphaned with no recourse |

**After archiving, you may still choose to:**
- Accept security patches (with clear scope and turnaround time).
- Provide consultation or support (paid or volunteer).
- Grant ownership to a new maintainer who forks the project.
- Re-activate if a new team steps up (see Section 5.4).

### 5.4 Reviving Dormant Projects

**When is revival appropriate?**
- The project still has active users who need it.
- There is a clear need not met by alternatives.
- A new team is willing and able to maintain it.
- The original maintainer is willing to transfer (or has already abandoned).

**Revival pathways:**

1. **Forking:** The most common path. Fork the archived/dormant repository.
   Common fork examples: LibreOffice (from OpenOffice), Nextcloud (from
   ownCloud), MariaDB (from MySQL), Terraform forks (OpenTofu).

   **Best practices for forking:**
   - Clearly document why the fork exists.
   - Be respectful of the original project.
   - Rename the project to avoid confusion.
   - Set up new infrastructure (CI, package registry entries).
   - Announce the fork widely.

2. **New maintainership (without forking):** The original maintainer transfers
   the repository and all assets to a new team.

   **Process:**
   - Find a new team (post an issue, ask in community channels).
   - Vet the new team: review their background, commitment level, and plan.
   - Transfer GitHub repository ownership.
   - Transfer package registry ownership (npm, PyPI, etc.).
   - Transfer domain, trademark, and other assets.
   - Announce the transition.
   - The original maintainer steps away.

3. **Community takeover:** The community organizes and maintains the project
   as a group effort. Common for abandoned projects that still have a user
   base.

   **Process:**
   - Fork the repository into a community organization.
   - Recruit a steering committee.
   - Set up governance (see Part 6).
   - Announce the revival plan.
   - Begin with maintenance releases (bug fixes, security patches).
   - Add new features once stability is established.

**Successful revival stories:**
- **OpenTofu:** Forked from HashiCorp's Terraform after the license change
  from MPL to BSL. Backed by multiple companies (Linux Foundation). Now the
  leading open-source IaC tool.
- **LibreOffice:** Forked from OpenOffice in 2010 when Oracle's stewardship
  was uncertain. Now the dominant FOSS office suite.
- **Nextcloud:** Forked from ownCloud with the same core team after a
  governance dispute. Now the leading self-hosted file sync platform.
- **GhostBSD:** Revived by a new team after the original developer stepped
  away. Continued as a community-driven project.

### 5.5 End-of-Life Planning

**Deprecation notices:**
When a feature or API is being removed:
- Announce deprecation at least one major version before removal.
- Use deprecation warnings at runtime.
- Document the replacement or migration path.
- Keep the deprecated feature for at least one LTS release cycle.

**Sunset timelines:**
A complete project sun-setting should follow a phased timeline:

| Phase | Duration | Actions |
|-------|---------|---------|
| **Notice** | Day 0 | Announce archival intention. No changes yet. |
| **Community response** | Day 0–30 | Accept input. Look for new maintainers. |
| **Migration period** | Day 30–90 | Write migration guide. Help users transition. |
| **Final release** | Day 90 | Tag final release with deprecation warnings. |
| **Read-only** | Day 90+ | Make repo read-only. Close all issues/PRs. |
| **Package deprecation** | Day 90+ | Deprecate package with redirect to alternatives. |
| **Infrastructure teardown** | Day 180+ | Remove CI, hosting, domain redirect. |

**Archive repositories:**
- GitHub has an "Archive this repository" feature that makes the repo read-only
  and hides it from most searches.
- The npm registry has a deprecation feature that warns users when they install
  a deprecated package.
- PyPI has similar deprecation warnings.
- Consider setting up a redirect from your project's documentation site to the
  archived README.

---

## Part 6: Legal & Tax Considerations

### 6.1 Entity Formation

**When to form a legal entity:**
- You are accepting significant donations (>$10k/year).
- You need to enter into contracts (sponsorship agreements, grant agreements).
- You need to hire people or pay contractors.
- You want to own trademarks or other IP.
- You want to provide tax-deductible receipts to donors.
- You want to limit personal liability.

**Entity types:**

| Entity | Best for | Pros | Cons |
|--------|---------|------|------|
| **LLC** (Single or Multi-member) | Individual maintainers or small teams receiving direct income | Simple to form; pass-through taxation; low compliance cost | No tax benefits for donors; personal liability (some states); not suitable for large-scale funding |
| **501(c)(3)** (US non-profit) | Projects seeking tax-deductible donations and grants | Donations tax-deductible; eligible for many grants; donor trust | Complex formation (6–12 months); ongoing compliance (IRS Form 990); restrictions on political activity |
| **501(c)(6)** (Business league) | Projects with corporate members (e.g., Linux Foundation) | Corporate memberships; advocacy allowed; less restrictive than 501(c)(3) | Donations not tax-deductible; fewer grant opportunities |
| **Foundation** (e.g., NL, CH, DE) | European projects or global projects with European ties | Flexible; tax-efficient in some jurisdictions; recognized globally | Complex cross-border compliance; varying transparency requirements |
| **Fiscal sponsorship** | Projects that don't want to form their own entity | No formation cost; immediate 501(c)(3) pass-through; low overhead | 5–15% fee; less control; foundation policies may conflict with project needs |

**Formation steps (US LLC):**
1. Choose a state (Delaware for investors, otherwise your home state).
2. File Articles of Organization.
3. Create an Operating Agreement.
4. Get an EIN from the IRS.
5. Open a business bank account.
6. Register for state taxes.
7. Comply with annual reporting requirements.

**Formation steps (US 501(c)(3)):**
1. Form a corporation in your state (Articles of Incorporation).
2. Draft Bylaws.
3. Hold an initial board meeting.
4. Apply for EIN.
5. File IRS Form 1023 or 1023-EZ.
6. Wait for determination letter (6–12 months).
7. Register for state charitable solicitation (if required).
8. Comply with annual IRS Form 990.

**Recommendation:** For most small-to-medium projects, start with a fiscal
sponsor (Open Collective, Software Freedom Conservancy) rather than forming
your own entity. It is faster, cheaper, and involves less ongoing overhead.
Form your own entity only when the fiscal sponsor's overhead percentage
exceeds the cost of running your own entity, or when you need more autonomy.

### 6.2 Tax Implications of Donations

**For the project (in the US):**
- Donations to a 501(c)(3) are tax-exempt.
- Donations received as an individual are taxable income.
- Donations received by an LLC are business income.
- Grant income to a non-profit is generally tax-exempt but may have
  restrictions (e.g., private foundation grants have payout requirements).

**For the donor (in the US):**
- Donations to 501(c)(3) are tax-deductible (subject to AGI limits).
- Donations to individuals or for-profit entities are NOT tax-deductible.
- Corporate sponsorships may be tax-deductible as business expenses.
- Bounty payments to individuals are taxable income for the recipient.

**How Open Collective handles taxes:**
- Open Collective Foundation (OCF) is a 501(c)(3) in the US.
- Donations to projects hosted by OCF are tax-deductible.
- OCF charges a 5% + payment processing fee.
- Payment processing adds ~3% (Stripe).
- OCF handles 1099 reporting for expenses paid from the collective.

**How to issue tax receipts:**
- Open Collective: automatically issues receipts for donations.
- GitHub Sponsors: receipts available for US fiscal-hosted projects.
- Self-managed: you must issue receipts yourself (template available from IRS).

**International considerations:**
- Cross-border donations may have different tax treatment.
- Many European countries have "Gift Aid" or similar programs.
- Fiscal sponsors in the US can only accept US tax-deductible donations.
- Consider having entities in multiple jurisdictions (e.g., Open Collective
  US + Open Collective Europe).

### 6.3 Trademark Management

**Why trademarks matter for OSS:**
- Prevents confusion about which project is the "official" version.
- Prevents someone from forking your project and selling it under your name.
- Protects the project's reputation.
- Required for many foundation hosting arrangements.

**What can be trademarked:**
- Project name.
- Logo (wordmark or design mark).
- Tagline or slogan.
- Distinctive product packaging.
- Domain names can be protected via trademark (not automatic).

**Trademark ownership options:**

| Owner | Pros | Cons |
|-------|------|------|
| **Individual maintainer** | Simple; no entity needed | Lost if maintainer leaves or dies; difficult to enforce; not credible for enterprise |
| **Company** | Resources for enforcement; integration with business | Company controls the project; risk of "open source washing"; conflict of interest |
| **Foundation** | Neutral; perpetual; credible; enforcable | Foundation must be willing and able to enforce; overhead |
| **Fiscal sponsor** | No extra work for project; SFC holds trademarks for many projects | Less control; subject to SFC's trademark policy |

**Trademark registration process (US):**
1. Search USPTO database for conflicting marks.
2. File Intent-to-Use (ITU) or Use-in-Commerce application ($250–$350 per
   class).
3. Examination by USPTO attorney (6–12 months).
4. Publication for opposition (30 days).
5. Statement of Use (if ITU) with specimen.
6. Registration (total timeline: 12–18 months).
7. Maintenance filings (5th year, 10th year renewals).

**Trademark transfer agreements:**
When a trademark is transferred from an individual to a foundation:
- Draft an Assignment of Trademark.
- Record the assignment with the USPTO.
- Update the registered owner in all registries.
- Ensure the new owner has an enforcement policy.

**Trademark enforcement for OSS:**
- Have a clear trademark policy (published on your website).
- Allow use of the mark for referring to the project (nominative fair use).
- Require permission for commercial use of the mark.
- Enforce against confusingly similar marks.
- Use GitHub's trademark reporting process for infringing repos.

**Real examples:**
- **MongoDB:** Trademarks owned by MongoDB, Inc. Enforced against projects
  using "Mongo" in their name (e.g., "Mongoose" was not a conflict, but
  projects using "MongoDB" in their name were asked to stop).
- **Kubernetes:** Trademarks owned by the Linux Foundation. Enforced against
  "Kubernetes" in unauthorized commercial contexts.
- **WordPress:** Trademarks owned by WordPress Foundation (a separate entity
  from Automattic, the company behind WordPress.com).
- **Node.js:** Trademarks owned by the OpenJS Foundation.

### 6.4 Contributor Agreements

**CLAs (Contributor License Agreements):**
A legal agreement between the contributor and the project stating that the
contributor has the right to contribute their code under the project's license.

| Aspect | Individual CLA | Corporate CLA |
|--------|---------------|---------------|
| Who signs | Individual contributor | Employer (covers all employees) |
| Scope | Personal contributions | All contributions by company employees |
| Complexity | Simple | Complex (often negotiated) |
| Typical use | Apache CLA, Google CLA | Google CLA, Microsoft CLA |

**DCO (Developer Certificate of Origin):**
A lightweight alternative to CLAs. The contributor signs off on each commit
with `Signed-off-by: Name <email>`, certifying that they have the right to
contribute the code. Developed by the Linux Kernel project.

**CLA vs DCO comparison:**

| Dimension | CLA | DCO |
|-----------|-----|-----|
| Complexity | High (legal review often required) | Low (one line per commit) |
| Contributor friction | High (must sign before first PR) | Low (git commit -s) |
| Legal protection | Strong (explicit copyright grant) | Moderate (certification of origin) |
| Copyright assignment | May be required | Not required |
| Patent grant | Common in corporate CLAs | Not explicit (but implied) |
| Community acceptance | Controversial (used by some as control mechanism) | Widely accepted |
| Enforcement | Must track who has/hasn't signed | Enforced by bot (DCO check) |
| Change of license | Easier with CLA (copyright holder can relicense) | Difficult (must get all contributors' consent) |

**Recommendation:** Use DCO unless you have a specific legal reason to require
CLAs. DCO is the standard across the Linux kernel, CNCF projects, and many
other major OSS projects. CLAs are appropriate when:
- The project is owned by a company that may want to relicense.
- The project requires a patent grant (DCO does not explicitly grant patents).
- The project's license is unusual or has special requirements.

**Implementing DCO:**
1. Add a `Signed-off-by` line requirement to CONTRIBUTING.md.
2. Configure a DCO bot (e.g., DCO Probot, DCO GitHub Action) that checks
   every PR.
3. Teach contributors to use `git commit -s` to sign off.

### 6.5 Export Controls

**EAR (Export Administration Regulations) for cryptography OSS:**
- Under the 2015 Wassenaar Arrangement revisions, publicly available OSS
  with cryptography was generally exempt from EAR reporting requirements.
- However, projects that implement cryptography must be aware:
  - Posting source code publicly on GitHub is generally fine.
  - Providing cryptographic consulting services may be restricted.
  - Exporting to sanctioned countries (Cuba, Iran, North Korea, Syria,
    Russia, Belarus, Crimea region) may still be restricted.
  - Helping a foreign person implement cryptography may be considered
    "deemed export."

**Best practices for crypto OSS:**
- Include a `CRYPTO_NOTICE` file explaining the export classification.
- Note in your README that the project is publicly available and generally
  not subject to EAR.
- Do not offer cryptographic consulting or implementation services without
  legal review.
- Be aware that if you accept contributions from sanctioned countries, you
  may need to block certain code (e.g., new cryptographic algorithms).
- For US-origin OSS crypto projects, include the standard BIS notice:
  "This project is subject to US export controls."

**EU dual-use regulations:**
- Similar to US EAR but with some differences.
- Publicly available source code is generally exempt.
- Cryptographic software for certain purposes (intelligence, military)
  may be restricted.
- Compliance is generally satisfied by making the code publicly available
  and not actively assisting sanctioned entities.

**Note:** This section is not legal advice. Consult an attorney experienced
in export controls if your project implements cryptography and you have
concerns.

---

## Part 7: Measuring Sustainability

### 7.1 Sustainability Scorecard

A self-assessment tool for evaluating your project's sustainability across
six dimensions. Score each dimension from 0 (poor) to 5 (excellent).

#### Dimension 1: Funding Diversity

| Score | Criteria |
|-------|----------|
| 0 | No funding at all |
| 1 | Single source (e.g., one company) |
| 2 | Two sources (e.g., company + individual donations) |
| 3 | Three diverse sources (e.g., corporate sponsors + individuals + grants) |
| 4 | Four+ sources; no single source >50% of total |
| 5 | Well-diversified; reserves of 6+ months of operating expenses; funded by a mix of for-profit, non-profit, and individual sources |

**How to improve funding diversity:**
- Activate multiple funding platforms (GitHub Sponsors, Open Collective).
- Set up tiered corporate sponsorship.
- Apply for at least one grant per year.
- Offer consulting or support for larger customers.
- Build a FUNDING.yml that lists all options.

#### Dimension 2: Bus Factor

| Score | Criteria |
|-------|----------|
| 0 | Single maintainer, no documentation |
| 1 | Single maintainer, some documentation |
| 2 | 2–3 maintainers, critical processes documented |
| 3 | 4+ maintainers, most processes documented, password manager shared |
| 4 | 6+ maintainers, all critical roles have backups, annual bus factor test |
| 5 | Deep bench (10+ maintainers), documented succession plan, multiple people can cut a release, handle security, manage community, and maintain infrastructure |

**How to improve bus factor:**
- Recruit and onboard new maintainers actively.
- Document everything (see Section 3.5).
- Use a team password manager.
- Rotate responsibilities.
- Test: "What happens if I'm hit by a bus tomorrow?"

#### Dimension 3: Governance Maturity

| Score | Criteria |
|-------|----------|
| 0 | No governance (BDFL, implicit) |
| 1 | Informal governance (team chat, ad-hoc decisions) |
| 2 | Documented decision-making process, but not consistently followed |
| 3 | Formal governance document (GOVERNANCE.md), clear roles, regular meetings |
| 4 | Governance with elections, term limits, and conflict resolution process |
| 5 | Foundation-level governance, independent board, community representation, transparent decision-making, published meeting minutes |

**How to improve governance maturity:**
- Write a GOVERNANCE.md document.
- Define team roles and responsibilities.
- Hold regular steering committee meetings.
- Publish meeting notes.
- Establish a decision-making process (consensus, lazy consensus, voting).
- Add term limits and elections for leadership roles.

#### Dimension 4: Contributor Retention

| Score | Criteria |
|-------|----------|
| 0 | No new contributors in 12+ months |
| 1 | Only drive-by contributions (no repeat contributors) |
| 2 | Some repeat contributors, but no clear pipeline |
| 3 | Structured onboarding, good-first-issue program, retention rate >20% at 6 months |
| 4 | Strong mentorship pipeline, contributor recognition, retention rate >35% at 6 months |
| 5 | Contributor growth positive year-over-year, diverse contributor base, retention rate >50% at 6 months |

**How to improve contributor retention:**
- Implement good-first-issue program.
- Provide mentorship.
- Recognize contributions.
- Create clear growth pathways.
- Survey departing contributors to understand churn.
- Track retention metrics.

#### Dimension 5: Code Health

| Score | Criteria |
|-------|----------|
| 0 | No tests, no CI, outdated dependencies |
| 1 | Some tests, basic CI |
| 2 | Good test coverage (>60%), CI/CD pipeline, automated dependency updates |
| 3 | Excellent test coverage (>80%), automated releases, performance benchmarks, security scanning |
| 4 | All of above + fuzzing, accessibility testing, internationalization testing, comprehensive documentation tests |
| 5 | Industry-leading: all of above + formal verification (where applicable), zero-day response within 24 hours, documented SLAs for critical fixes |

**How to improve code health:**
- Add CI/CD if not present.
- Increase test coverage.
- Set up Dependabot or Renovate.
- Add linters and formatters.
- Set up security scanning (Dependabot alerts, CodeQL, Snyk).
- Document code architecture.
- Conduct regular refactoring sprints.

#### Dimension 6: Community Health

| Score | Criteria |
|-------|----------|
| 0 | No community, no communication beyond issues |
| 1 | One communication channel, no CoC |
| 2 | CoC adopted, one main channel, occasional community events |
| 3 | Multiple channels, active moderation, welcoming culture, CoC enforced |
| 4 | Vibrant community, contributor diversity, regular events, mentorship program, community ambassadors |
| 5 | Self-sustaining community: members help each other, events run without maintainers, diverse leadership, active outreach and inclusion programs |

**How to improve community health:**
- Adopt and enforce a Code of Conduct.
- Create welcoming onboarding materials.
- Establish multiple communication channels.
- Host regular community events.
- Recognize community contributions.
- Survey the community annually.
- Track community diversity.

#### Overall Sustainability Score

| Total Score (0–30) | Status | Recommended Actions |
|--------------------|--------|--------------------|
| 0–6 | Critical | Focus on bus factor (onboard co-maintainers) and basic code health (CI). |
| 7–12 | At risk | Add a CoC, set up funding, document critical processes. |
| 13–18 | Developing | Formalize governance, diversify funding, add mentorship. |
| 19–24 | Healthy | Maintain, plan for growth, consider foundation backing. |
| 25–30 | Thriving | Share practices, mentor other projects, contribute to ecosystem. |

### 7.2 Goal-Setting with OKRs

**Sample OKRs for OSS projects:**

**Objective 1: Improve contributor retention**
- KR1: Increase 6-month contributor retention rate from 20% to 35%.
- KR2: Reduce average time-to-first-review on PR from 5 days to 2 days.
- KR3: Launch a mentorship program and onboard 5 mentees.
- KR4: Implement contributor recognition program (release thank-yous,
  contributor spotlights).

**Objective 2: Diversify funding**
- KR1: Add 3 new corporate sponsors at the Silver level or above.
- KR2: Secure a grant of $50k+ from the Sovereign Tech Fund.
- KR3: Grow GitHub Sponsors recurring monthly donations from $500 to $2,000.
- KR4: Activate Open Collective and migrate existing donations.

**Objective 3: Improve code health**
- KR1: Increase test coverage from 55% to 80%.
- KR2: Set up automated security scanning (CodeQL, Dependabot).
- KR3: Reduce open PR count from 50 to 15.
- KR4: Publish a quarterly release on schedule.

**Objective 4: Strengthen governance**
- KR1: Draft and adopt a GOVERNANCE.md document.
- KR2: Establish a steering committee with 5 members and defined terms.
- KR3: Start publishing monthly community meeting notes.
- KR4: Create a formal succession plan for all critical roles.

**Objective 5: Grow the community**
- KR1: Host a virtual contributor summit with 30+ attendees.
- KR2: Increase monthly active contributors from 8 to 15.
- KR3: Launch a community translation effort (target: 5 languages).
- KR4: Survey the community (target: 50+ responses, 80%+ satisfaction).

### 7.3 Reporting

**Annual project health report:**
Publish an annual report covering:

1. **Executive summary** (1 paragraph)
2. **Community metrics:**
   - Total contributors (unique, by role)
   - New contributors this year
   - Contributor retention rates
   - Number of first-time contributors
   - Number of returning contributors
3. **Development metrics:**
   - Commits
   - Pull requests merged
   - Issues opened / closed
   - Releases published
   - Time-to-merge (median and p95)
   - Time-to-first-response (median and p95)
4. **Adoption metrics:**
   - Downloads (npm downloads, Docker pulls, PyPI downloads)
   - GitHub stars
   - Known production users
   - New integrations or downstream dependencies
5. **Financial transparency:**
   - Total revenue
   - Revenue breakdown by source
   - Total expenses
   - Expense breakdown (infrastructure, development, events, travel, grants)
   - Current runway (if applicable)
6. **Governance updates:**
   - Changes to team composition
   - Elections held
   - Governance changes
   - Foundation updates
7. **Goals for next year:**
   - Targets for the metrics above
   - Major initiatives
   - Funding goals

**Community surveys:**
Conduct an annual community survey asking:
- How satisfied are you with the project?
- How easy was it to get started contributing?
- What is the biggest pain point?
- What would make you more likely to contribute?
- How do you use the project (personal, work, both)?
- Would you recommend contributing to others?
- Demographic information (optional, for diversity tracking).

**Transparency reports:**
- Publish a summary of CoC enforcement actions (anonymized).
- Publish financial reports (income, expenses, runway).
- Publish governance meeting notes.
- Publish any sponsorship or funding conflicts of interest.

**Real examples of project health reports:**
- **Rust Survey:** Annual survey with detailed breakdown of community
  demographics, satisfaction, and priorities.
- **Kubernetes Annual Report:** Published by the CNCF, covering community
  metrics, governance changes, and financial highlights.
- **curl Report:** Daniel Stenberg publishes an annual "curl year" summary
  with statistics on releases, contributors, and security issues.
- **Python Software Foundation Annual Report:** Detailed financial and
  programmatic report.

---

## Part 8: Templates & Practical Resources

### 8.1 FUNDING.yml Template

Create `.github/FUNDING.yml` in your repository to enable the GitHub Sponsors
button and direct potential sponsors to your funding platforms:

```yaml
# GitHub Sponsors (recommended)
github: [username, orgname]

# Open Collective
open_collective: your-collective-slug

# Patreon
patreon: your-patreon-name

# Ko-fi
ko_fi: your-ko-fi-name

# Liberapay
liberapay: your-liberapay-slug

# IssueHunt
issuehunt: your-username

# Buy Me a Coffee
buy_me_a_coffee: your-username

# Custom links
custom:
  - https://www.paypal.com/donate/?hosted_button_id=XXXX
  - https://your-project-website.org/sponsor
  - https://bank-transfer-instructions.example.com
```

You can include only the platforms you use. The YAML keys are:
- `github`: GitHub username or organization name (list users as an array).
- `open_collective`: Open Collective slug.
- `patreon`: Patreon username.
- `ko_fi`: Ko-fi username.
- `liberapay`: Liberapay slug.
- `issuehunt`: IssueHunt username.
- `buy_me_a_coffee`: Buy Me a Coffee username.
- `custom`: Array of URLs.

### 8.2 SUSTAINABILITY.md Template

Create `SUSTAINABILITY.md` in the root of your repository to document your
project's sustainability approach, funding, and governance. This is useful
for potential sponsors, contributors, and users who want to understand the
project's health.

```markdown
# Sustainability Guide for [Project Name]

## Funding Sources

[Project Name] is funded through the following sources:

| Source | % of Total | Description |
|--------|-----------|-------------|
| Corporate sponsors | XX% | [List of sponsors with tiers] |
| Individual donations | XX% | [Platforms used] |
| Grants | XX% | [Current and past grants] |
| [Other] | XX% | [Description] |
| Unfunded | XX% | Gap between costs and funding |

[Optional: Chart of funding over time]

## Where the Money Goes

| Category | % of Spending | Description |
|----------|--------------|-------------|
| Maintainer stipends | XX% | Compensation for core contributors |
| Infrastructure | XX% | CI/CD, hosting, domains |
| Community | XX% | Events, travel grants, swag |
| Security | XX% | Audits, bug bounties |
| Legal & admin | XX% | Entity costs, legal fees |
| [Other] | XX% | [Description] |

## Governance

[Project Name] is governed by [description of governance model]. See
[GOVERNANCE.md](./GOVERNANCE.md) for details.

## Maintainer Team

See [MAINTAINERS.md](./MAINTAINERS.md) for the current maintainer team.

## Health Metrics

[Optional: Include key metrics updated quarterly]

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| Active contributors (monthly) | XX | XX | ↗/→/↘ |
| Time-to-merge PRs (median) | XX days | XX days | ↗/→/↘ |
| Issue response time (median) | XX hours | XX hours | ↗/→/↘ |
| Test coverage | XX% | XX% | ↗/→/↘ |
| Downloads (monthly) | XX | N/A | ↗/→/↘ |
| Funding (monthly) | $XX | $XX | ↗/→/↘ |

## How to Support Us

- 💻 **Contribute:** See [CONTRIBUTING.md](./CONTRIBUTING.md)
- 💰 **Sponsor:** See [FUNDING.yml](./.github/FUNDING.yml)
- 📢 **Spread the word:** Star us on GitHub, write about us, recommend us
- 🐛 **Report issues:** [Issue tracker link]
- 💡 **Give feedback:** [Discussion forum link]

## Contact

For sponsorship inquiries: [email]
For security issues: [email]
General: [community platform link]

## Previous Reports

- [2025 Annual Report](link)
- [2024 Annual Report](link)
```

### 8.3 Bus Factor Calculation Script

A Python script to help assess your project's bus factor by analyzing
contributor concentration:

```python
#!/usr/bin/env python3
"""
bus_factor.py — Calculate contributor concentration (bus factor proxy).

Usage:
    python bus_factor.py <repository_path> [--threshold 0.5]

This script analyzes git log to find what percentage of commits are
contributed by what percentage of contributors. A project where the
top 1 contributor accounts for >50% of commits has a bus factor of 1.

Dependencies: git (installed), Python 3.7+
"""

import subprocess
import sys
import argparse
from collections import Counter
from pathlib import Path

def get_commits_by_author(repo_path: str) -> Counter:
    """Returns a Counter of {author_name: commit_count}."""
    result = subprocess.run(
        ["git", "shortlog", "-s", "-n", "--all"],
        capture_output=True,
        text=True,
        cwd=repo_path,
        check=True,
    )
    counter = Counter()
    for line in result.stdout.strip().split("\n"):
        if not line.strip():
            continue
        count_str, *name_parts = line.strip().split("\t")
        count = int(count_str.strip())
        name = " ".join(name_parts).strip()
        counter[name] = count
    return counter

def calculate_bus_factor(counter: Counter, threshold: float = 0.5) -> int:
    """
    Returns the bus factor: the smallest number of contributors that
    account for at least `threshold` fraction of total commits.
    """
    total = sum(counter.values())
    cumulative = 0
    bus_factor = 0
    for author, count in counter.most_common():
        cumulative += count
        bus_factor += 1
        if cumulative / total >= threshold:
            return bus_factor
    return len(counter)

def main():
    parser = argparse.ArgumentParser(
        description="Calculate bus factor (contributor concentration)"
    )
    parser.add_argument(
        "repo_path",
        nargs="?",
        default=".",
        help="Path to git repository (default: current directory)",
    )
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.5,
        help="Fraction of commits that define the bus factor (default: 0.5)",
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Print detailed contributor breakdown",
    )
    args = parser.parse_args()

    repo_path = Path(args.repo_path).resolve()
    if not (repo_path / ".git").exists():
        print(f"Error: {repo_path} is not a git repository.")
        sys.exit(1)

    counter = get_commits_by_author(str(repo_path))

    if not counter:
        print("No commits found.")
        sys.exit(1)

    total_commits = sum(counter.values())
    unique_authors = len(counter)
    bus_factor = calculate_bus_factor(counter, args.threshold)

    print(f"Repository: {repo_path}")
    print(f"Total commits: {total_commits}")
    print(f"Unique contributors: {unique_authors}")
    print(f"Bus factor: {bus_factor}")
    print(f"(at {args.threshold:.0%} threshold)")

    if args.verbose:
        print("\nContributor breakdown:")
        for author, count in counter.most_common(20):
            pct = count / total_commits * 100
            print(f"  {author}: {count} ({pct:.1f}%)")
        if len(counter) > 20:
            remaining = len(counter) - 20
            print(f"  ... and {remaining} more contributors")

    # Health assessment
    if bus_factor == 1:
        print("\n⚠️  WARNING: Bus factor is 1. This is critical!")
        print("   If the top contributor leaves, the project may fail.")
        print("   Action: Recruit co-maintainers immediately.")
    elif bus_factor <= 3:
        print(f"\n⚠️  Bus factor is {bus_factor}. This project is fragile.")
        print("   Consider onboarding more maintainers and documenting processes.")
    else:
        print(f"\n✅ Bus factor is {bus_factor}. Healthy level of contributor diversity.")

    print(f"\nTop contributor: {counter.most_common(1)[0][0]} "
          f"({counter.most_common(1)[0][1] / total_commits * 100:.1f}% of commits)")

if __name__ == "__main__":
    main()
```

### 8.4 Maintainer Onboarding Checklist

A detailed checklist for bringing a new maintainer onto the team. Both the
existing team and the new maintainer should work through this.

```
# Maintainer Onboarding Checklist

## New Maintainer: [Name]
## Onboarding Buddy: [Name]
## Start Date: [Date]

### Week 1: Orientation

Communication & Access:
[ ] Added to MAINTAINERS.md
[ ] Given GitHub maintainer role on the repository
[ ] Added to team communication channels (Slack/Discord, mailing list)
[ ] Introduced to the maintainer team (email or announcement)
[ ] Added to private security mailing list (security@)
[ ] Given access to shared password manager / key escrow
[ ] Given access to project calendar and meeting invitations

Context:
[ ] Read the project README and documentation (mark as complete)
[ ] Read GOVERNANCE.md
[ ] Read CONTRIBUTING.md and CODE_OF_CONDUCT.md
[ ] Read the project's license and any contributor agreements
[ ] Read the project's ADRs (Architecture Decision Records)
[ ] Watch a recording of a community/steering meeting
[ ] Read the last 5 merged PRs to understand current code quality bar

### Week 2: Shadowing

Development:
[ ] Set up local development environment (document any issues)
[ ] Successfully run the test suite
[ ] Successfully build the project from source
[ ] Review 3 open PRs and leave constructive feedback (reviewed by buddy)
[ ] Shadow the release process (do NOT cut a release yet)

Community:
[ ] Attend community meeting as observer
[ ] Triage 10 open issues (with buddy)
[ ] Respond to 3 support questions (with buddy)
[ ] Review security policy and vulnerability reporting process

### Week 3: Guided Responsibility

Development:
[ ] Merge 3 non-critical PRs (with buddy approval)
[ ] Handle 5 issue triage items independently
[ ] Review 5 PRs independently

Community:
[ ] Attend and participate in community meeting
[ ] Respond to 5 support questions independently
[ ] Moderate a community channel for one shift

### Week 4: Independence

Development:
[ ] Cut a patch release (with buddy observing)
[ ] Handle a security report (with buddy)
[ ] Review and merge a medium-complexity PR independently

Community:
[ ] Lead the community meeting
[ ] Onboard a first-time contributor (as mentor)
[ ] Handle a CoC concern (with buddy, if applicable)

### Month 2: Full Independence

[ ] Cut a minor release independently
[ ] Handle security reports independently
[ ] Mentor 2+ first-time contributors
[ ] Contribute to governance discussions
[ ] Propose and implement a process improvement

### Month 3: Reverse Shadowing

[ ] Onboard the NEXT new maintainer (with buddy)
[ ] Lead the release process from start to finish
[ ] Take over one area of responsibility from buddy

### Ongoing

[ ] Review maintainer succession plan
[ ] Be prepared to step in for any critical role
[ ] Provide feedback on the onboarding process
[ ] Mentor new contributors and identify future maintainers
```

### 8.5 Maintainer Succession Plan Template

A private document to be filled out by the current maintainer team and stored
in the team's shared password manager or encrypted drive.

```markdown
# Maintainer Succession Plan

## Project: [Project Name]
## Last Updated: [Date]

## Critical Roles

### Release Manager
Primary: [Name]
Backup: [Name]
Successor: [Name] (ready to take over?)

### Security Contact
Primary: [Name]
Backup: [Name]
Successor: [Name]

### Community Manager
Primary: [Name]
Backup: [Name]
Successor: [Name]

### Infrastructure (CI/CD, Hosting)
Primary: [Name]
Backup: [Name]
Successor: [Name]

### Finance / Funding
Primary: [Name]
Backup: [Name]
Successor: [Name]

### Legal / Trademark
Primary: [Name]
Backup: [Name]
Successor: [Name]

## Access Inventory

| Asset | Location / URL | Owner | Backup | Recovery Method |
|-------|---------------|-------|--------|-----------------|
| GitHub organization | github.com/org | [Name] | [Name] | [e.g., "org recovery via support ticket"] |
| npm org | npmjs.com/org | [Name] | [Name] | [e.g., "recovery via @npm support"] |
| PyPI | pypi.org/project | [Name] | [Name] | [e.g., "recovery via file a ticket"] |
| Docker Hub | hub.docker.com/r/org | [Name] | [Name] | [e.g., "recovery via support"] |
| Domain registrar | [URL] | [Name] | [Name] | [e.g., "recovery via account recovery"] |
| DNS provider | [URL] | [Name] | [Name] | [e.g., "recovery via API token reset"] |
| CI/CD (GitHub Actions) | github.com/org | [Name] | [Name] | [e.g., "same as GitHub org"] |
| Open Collective | opencollective.com/org | [Name] | [Name] | [e.g., "admin reset via email"] |
| GitHub Sponsors | github.com/sponsors | [Name] | [Name] | [e.g., "contact GitHub support"] |
| Social media (X/Twitter) | [URL] | [Name] | [Name] | [e.g., "account recovery"] |
| Discord / Slack | [URL] | [Name] | [Name] | [e.g., "server ownership transfer"] |
| Mailing list | [URL] | [Name] | [Name] | [e.g., "admin recovery"] |
| Documentation site | [URL] | [Name] | [Name] | [e.g., "hosting account recovery"] |
| Password manager | [URL] | [Name] | [Name] | [e.g., "emergency access via recovery code in [location]"] |

## Emergency Scenarios

### Scenario 1: Primary maintainer permanently unavailable
1. Backup maintainer takes over critical roles immediately.
2. Successor is confirmed or a new election is held within 14 days.
3. Access is transferred using the password manager emergency kit.
4. Community is notified via a posted announcement.
5. A 30-day transition period with reduced expectations is communicated.

### Scenario 2: Security vulnerability with primary unavailable
1. Backup security contact handles the report.
2. If both unavailable, any maintainer has authority to:
   a. Take down the affected service.
   b. Post a "do not use" advisory.
   c. Contact the Linux Foundation's security contact (or similar) for help.

### Scenario 3: Funding account inaccessible
1. Backup finance contact initiates account recovery.
2. If recovery fails, open a support ticket with the platform.
3. Notify the community of temporary funding freeze.
4. If needed, create a new collective/account.

### Scenario 4: All maintainers simultaneously unavailable
1. The project enters "critical" state.
2. The project's fiscal sponsor or foundation (if any) is notified.
3. If no sponsor/foundation, a call for maintainers is posted.
4. If no one steps up within 60 days, the project is archived.
5. README is updated with archival notice.

## Training Plan

| Role | Current Person | Backup Needs Training? | Successor Needs Training? | Target Date |
|------|---------------|----------------------|--------------------------|-------------|
| Release | [Name] | Yes/No | Yes/No | [Date] |
| Security | [Name] | Yes/No | Yes/No | [Date] |
| Community | [Name] | Yes/No | Yes/No | [Date] |
| Infra | [Name] | Yes/No | Yes/No | [Date] |
| Finance | [Name] | Yes/No | Yes/No | [Date] |
| Legal | [Name] | Yes/No | Yes/No | [Date] |

## Review Schedule

This plan will be reviewed and updated:
- [ ] Every 6 months (next: [Date])
- [ ] When a maintainer leaves or joins
- [ ] When critical access changes
- [ ] When the governance model changes

## Emergency Contact Information

(Stored separately in the team password manager)

- Primary emergency contact: [Name], [Phone], [Email], [Signal/Discord]
- Backup emergency contact: [Name], [Phone], [Email], [Signal/Discord]
- Foundation/sponsor emergency: [Name], [Email]
```
### 8.6 Burnout Self-Assessment Questionnaire (Detailed)

This questionnaire is adapted from the Maslach Burnout Inventory for the OSS
context. It provides a more detailed assessment than the quick version in
Part 2.5.

```
# Maintainer Burnout Self-Assessment

This assessment is confidential. Your answers are for your personal
reflection only. Be honest with yourself — there are no right or wrong
answers.

## Section A: Emotional Exhaustion

Rate each statement on a scale of 0 (never) to 6 (every day):

__1. I feel emotionally drained from my OSS work.
__2. I feel used up at the end of a day of maintaining.
__3. I feel fatigued when I get up in the morning and have to face
    another day of OSS work.
__4. Working on this project all day is really a strain for me.
__5. I feel burned out from my OSS work.
__6. I feel frustrated by my OSS work.
__7. I feel I'm working too hard on this project.
__8. Working with users/contributors directly is stressful.
__9. I feel like I'm at the end of my rope.

**Section A Total: ___ / 54**

## Section B: Cynicism / Depersonalization

Rate each statement on a scale of 0 (never) to 6 (every day):

__1. I feel like I care less about the project than I used to.
__2. I have become more cynical about whether OSS contributions matter.
__3. I doubt the significance of this project.
__4. I feel indifferent to users' problems.
__5. I feel like users blame me for their problems.
__6. I worry that this project is hardening me emotionally.
__7. I find myself being short or dismissive with users.
__8. I don't really care what happens to some of my users.
__9. I feel that users don't appreciate what I do for them.

**Section B Total: ___ / 54**

## Section C: Personal Accomplishment (Reverse Score)

Rate each statement on a scale of 0 (never) to 6 (every day):

__1. I feel I'm positively influencing people's lives through my OSS work.
__2. I feel full of energy when working on the project.
__3. I can easily understand how my users feel about things.
__4. I deal effectively with users' problems.
__5. I feel I'm making an effective contribution to the ecosystem.
__6. I feel exhilarated after working closely with my users.
__7. I have accomplished many worthwhile things in this project.
__8. In my OSS work, I deal with emotional problems very calmly.

**Section C Total: ___ / 48**

## Scoring Guide

### Section A: Emotional Exhaustion
- 0–16: Low
- 17–28: Moderate
- 29–54: High — this is a warning sign. Consider delegation, boundaries,
  and professional support.

### Section B: Cynicism / Depersonalization
- 0–8: Low
- 9–18: Moderate
- 19–54: High — you may be disconnecting emotionally from your work.
  Consider taking a break or reducing your role.

### Section C: Personal Accomplishment
- 0–24: Low — you feel your work is not meaningful. This is a risk
  factor for burnout.
- 25–34: Moderate
- 35–48: High — you still find meaning in your work. This is protective
  against burnout.

### Overall Assessment

If you scored High in ANY section:
- Take this seriously.
- Talk to a trusted colleague or therapist.
- Consider stepping back from the project temporarily.
- Delegate or automate the tasks that drain you most.
- Set firmer boundaries (responding hours, no obligations on weekends).

If you scored Moderate in TWO sections:
- You are at significant risk of burnout.
- Review the burnout prevention strategies in Part 2 of this guide.
- Implement at least one change this week.
- Schedule a break or sabbatical within the next 3 months.

If you scored Low in all sections:
- You are currently in good shape.
- Monitor yourself regularly (re-take this assessment every 3 months).
- Focus on prevention: boundaries, delegation, and support systems.

## Notes

- Burnout is NOT a personal failure. It is a systemic issue caused by
  the structural conditions of OSS maintenance.
- The most common cause of burnout in OSS is NOT working too hard — it
  is working hard WITHOUT adequate support, appreciation, or resources.
- Recovery requires changing the conditions, not just "pushing through."
- Professional help is always recommended if you are experiencing any
  of the following: sleep disruption, appetite changes, persistent sadness,
  anxiety, thoughts of self-harm, or substance use changes.

## Resources

- Maintainers Anonymous: [website]
- Open Source Mental Illness (OSMI): [https://osmihelp.org/](https://osmihelp.org/)
- Crisis hotline: 988 (US), 111 (UK), 143 (AU)
- Maintainer support community: [various Discord/Slack groups]
```

### 8.7 Annual Project Health Report Template

```markdown
# [Project Name] — [Year] Annual Project Health Report

**Published:** [Date]
**Previous report:** [Link]

## Executive Summary

[1–2 paragraph summary of the project's year: highs, lows, key metrics,
and major initiatives.]

## Community Metrics

| Metric | [Year-1] | [Year] | Change |
|--------|---------|-------|--------|
| Total contributors (unique) | XX | XX | +X% |
| New contributors | XX | XX | +X% |
| Returning contributors | XX | XX | +X% |
| Core maintainers | XX | XX | +X% |
| Retention rate (6-month) | XX% | XX% | +Xpp |
| Communities represented | XX | XX | +X |

### Top Contributors by Type

**Code:** [Name] (X commits), [Name] (X commits)
**Review:** [Name] (X reviews), [Name] (X reviews)
**Documentation:** [Name] (X changes), [Name] (X changes)
**Community support:** [Name] (X responses), [Name] (X responses)

## Development Metrics

| Metric | [Year-1] | [Year] | Change |
|--------|---------|-------|--------|
| Commits | XX | XX | +X% |
| PRs merged | XX | XX | +X% |
| PRs submitted | XX | XX | +X% |
| Merge rate | XX% | XX% | +Xpp |
| Issues opened | XX | XX | +X% |
| Issues closed | XX | XX | +X% |
| Releases | XX | XX | +X |
| Median time-to-merge | X days | X days | +X% |
| Median time-to-first-response | X hours | X hours | +X% |

## Adoption Metrics

| Metric | [Year-1] | [Year] | Change |
|--------|---------|-------|--------|
| Monthly downloads | XXM | XXM | +X% |
| Docker pulls | XXM | XXM | +X% |
| GitHub stars | XX.Xk | XX.Xk | +X% |
| Known downstream dependents | XX | XX | +X% |
| Production users (known) | XX | XX | +X% |

## Financial Transparency

### Revenue

| Source | [Year-1] | [Year] | % of Total |
|--------|---------|-------|-----------|
| Corporate sponsors | $XX | $XX | XX% |
| Individual donations | $XX | $XX | XX% |
| Grants | $XX | $XX | XX% |
| Support contracts | $XX | $XX | XX% |
| Other | $XX | $XX | XX% |
| **Total** | **$XX** | **$XX** | **100%** |

### Expenses

| Category | [Year-1] | [Year] | % of Total |
|----------|---------|-------|-----------|
| Maintainer stipends | $XX | $XX | XX% |
| Infrastructure | $XX | $XX | XX% |
| Community events | $XX | $XX | XX% |
| Travel grants | $XX | $XX | XX% |
| Security audits | $XX | $XX | XX% |
| Legal & admin | $XX | $XX | XX% |
| Marketing & design | $XX | $XX | XX% |
| **Total** | **$XX** | **$XX** | **100%** |

### Runway

**Current reserves:** $XX
**Monthly burn rate:** $XX
**Runway:** X months

## Governance

### Team Changes
- [Name] joined as maintainer (Month)
- [Name] stepped down as maintainer (Month)
- [Name] elected to steering committee (Month)

### Governance Changes
- [Description of governance changes this year]

### Meetings Held
- Steering committee meetings: XX
- Community meetings: XX
- Special meetings: XX

## Security

| Metric | [Year-1] | [Year] |
|--------|---------|-------|
| Security reports received | XX | XX |
| CVEs published | XX | XX |
| Median time-to-fix (critical) | X days | X days |
| Security audits conducted | X | X |

## Goals for [Next Year]

### Community Goals
1. [Goal 1, e.g., "Increase 6-month contributor retention to 35%"]
2. [Goal 2, e.g., "Onboard 3 new maintainers from underrepresented groups"]

### Development Goals
1. [Goal 1, e.g., "Achieve 90% test coverage"]
2. [Goal 2, e.g., "Reduce median time-to-merge to 24 hours"]

### Financial Goals
1. [Goal 1, e.g., "Diversify to 5+ funding sources"]
2. [Goal 2, e.g., "Achieve 12 months of runway"]

### Governance Goals
1. [Goal 1, e.g., "Draft and adopt formal governance document"]
2. [Goal 2, e.g., "Establish a community advisory board"]

## Acknowledgments

Thank you to all contributors, sponsors, and users who made [Year] possible.
Special thanks to:

- [Sponsor/Partner], for their continued support.
- [Community member], for extraordinary contributions to the community.
- [Institution], for hosting our community event.

## Appendix

- Full contributor list: [Link]
- Detailed financial report: [Link]
- Community survey results: [Link]
```

---

## Conclusion

Open source sustainability is not a problem that can be solved once and then
forgotten. It is an ongoing process that requires continuous attention to
funding, community, governance, and personal well-being.

**Key takeaways:**

1. **Diversify funding.** No single funding source is reliable enough to
   sustain a project long-term. Combine 3+ models.

2. **Invest in community.** Your bus factor is the most important metric.
   If only you can do it, the project cannot survive long-term.

3. **Plan for succession.** Every maintainer will eventually step away.
   Plan for it now, not in a crisis.

4. **Set boundaries.** Burnout is the #1 threat to OSS longevity.
   Boundaries, delegation, and breaks are not optional — they are
   prerequisites for sustainable contribution.

5. **Measure what matters.** Track your sustainability metrics and publish
   them. Transparency builds trust with users, contributors, and sponsors.

6. **Be realistic about lifecycle.** Not every project should last forever.
   Archiving responsibly is a form of care for your users.

7. **Share what works.** The most sustainable OSS ecosystem is one where
   projects learn from each other. Publish your practices, templates, and
   lessons learned.

The goal is not to make every project last forever. The goal is to ensure
that every project — while it is needed — has the resources, community, and
governance to thrive, and that when its time comes, it can end with dignity
and a clear path forward for its users.

---

*This guide is licensed under CC0 1.0 Universal. Feel free to copy, adapt,
and distribute without attribution. Contributions and corrections are
welcome as pull requests against the repository where this document lives.*
