# OSS Governance & Ecosystem Health — Universal Reference

> A comprehensive reference on open source governance models, licensing frameworks,
> community health metrics, decision-making processes, and ecosystem sustainability.
> Applicable to any open source project of any size, stage, or domain.

---

## Table of Contents

1. [Part 1: Governance Models](#part-1-governance-models)
2. [Part 2: Licensing Deep Dive](#part-2-licensing-deep-dive)
3. [Part 3: Codes of Conduct & Community Health](#part-3-codes-of-conduct--community-health)
4. [Part 4: Decision-Making Frameworks](#part-4-decision-making-frameworks)
5. [Part 5: Fork Governance](#part-5-fork-governance)
6. [Part 6: Ecosystem Metrics & Health Indicators](#part-6-ecosystem-metrics--health-indicators)
7. [Part 7: Governance Templates](#part-7-governance-templates)

---

## Part 1: Governance Models

Governance is the system by which an open source project makes decisions, resolves
disputes, and distributes power. The right model depends on project maturity,
community size, funding, and strategic goals.

### 1.1 Benevolent Dictator for Life (BDFL)

The BDFL model places ultimate decision-making authority in a single individual who
earned that position through founding the project or long-term technical leadership.

**Projects using BDFL:**
| Project | BDFL | Status |
|---------|------|--------|
| Linux kernel | Linus Torvalds (founder) | Active — Linus remains final arbiter |
| Python | Guido van Rossum (founder) | Retired 2018 — now a steering council |
| curl | Daniel Stenberg (founder) | Active — Daniel is the sole decision-maker |
| SQLite | D. Richard Hipp (founder) | Active |
| Vim | Bram Moolenaar (founder) | Deceased 2023 — community succession underway |
| Redis | Salvatore Sanfilippo (founder) | Stepped down 2020 — now Redis Ltd. controls |
| Perl | Larry Wall (founder) | Active but largely hands-off |

**When BDFL works best:**
- Early-stage projects with a single visionary founder
- Projects requiring strong architectural consistency
- Small teams where trust is high and communication is direct
- Rapid prototyping phases where debate would slow progress

**Pros:**
- Fast decision-making — no committee debate required
- Clear accountability — one person owns every decision
- Strong, coherent vision — the project doesn't zigzag
- Lower overhead — no election processes, meeting minutes, voting procedures
- Architectural consistency — one person reviews and approves major designs
- Works well while the BDFL is active, engaged, and respected

**Cons:**
- Single point of failure — bus factor of 1
- Succession crisis — transitioning authority is notoriously difficult
- Contributor fatigue — talented contributors may leave if their input never matters
- Burnout risk — the BDFL carries the full weight of every hard decision
- Perception problems — can feel authoritarian, discouraging diverse contribution
- Slows as project scales — one person cannot review all decisions in a large project
- Fork risk — if the community loses confidence, a fork is the only recourse

**Succession problem:**
The BDFL succession problem is the model's most cited weakness. Python's transition
from Guido van Rossum to a 5-person steering council is the most successful example.
Guido announced his retirement in 2018 after 28 years, and PEP 13 created an elected
governance structure. Key lessons from that transition:
- Plan for succession before burnout forces it
- Use the BDFL's remaining authority to bless and empower the successor body
- Document unwritten norms while the BDFL is still present to explain them
- Expect a transitional period where the community adjusts to collective decision-making

Vim's post-Bram succession (2023) is the open question: without a clear governance
transition plan, the project is navigating uncharted territory with multiple
maintainers stepping in to fill the void.

### 1.2 Meritocracy (Apache Software Foundation Model)

The Apache Software Foundation (ASF) defines the classic meritocratic model, where
influence is earned through demonstrated contribution.

**Apache governance structure:**
```
┌─────────────────────────────────────────────────┐
│                 ASF Board of Directors           │
│  (elected by ASF members, oversees foundation)   │
├─────────────────────────────────────────────────┤
│            Project Management Committee          │
│  (PMC) — elected by existing PMC members         │
├─────────────────────────────────────────────────┤
│  Committers  →  PMC Members  →  ASF Members      │
│ (write access)  (vote on releases)  (vote on     │
│                                     foundation)   │
└─────────────────────────────────────────────────┘
```

**Advancement ladder:**
```
User → Contributor → Committer → PMC Member → ASF Member
                      (nominated,   (elected by   (elected by
                       voted by      existing      existing ASF
                       PMC)          PMC)          members)
```

1. **User** — files bugs, asks questions, uses the software
2. **Contributor** — submits patches, documentation, tests
3. **Committer** — granted write access via PMC nomination and vote
4. **PMC Member** — earns invitation to the Project Management Committee
5. **ASF Member** — elected by existing ASF members for cross-project merit

**Pros:**
- Clear advancement path — contributors know exactly how to gain influence
- Self-correcting — new committers are added as the project grows
- Distributed authority — no single point of failure
- Established track record — ASF has run this since 1999
- Strong oversight on releases — every release requires a PMC vote
- Legal umbrella — ASF provides trademark and legal protection

**Cons:**
- Can be slow — every promotion requires discussion and voting
- "Old guard" inertia — long-timers may resist newer contributors advancing
- Barriers to entry — the formal nomination process can feel intimidating
- Underrepresents non-code contributions — historically code-focused, though improving
- Merit measured by output — can pressure contributors to over-produce
- The term "meritocracy" has baggage — critics note it can mask privilege disparities

**Real-world example — Apache Hadoop PMC:**
Hadoop's PMC grew from 3 initial members to 50+ over its lifetime. The PMC handles
release votes (requires 3 +1 binding votes, no net -1 votes), committer additions
(vote on the hadoop-general list), and technical direction. The model worked well
during Hadoop's hypergrowth but struggled during the transition to cloud-native
architectures, where PMC members with deep MapReduce expertise lacked Kubernetes
and object-store experience.

### 1.3 Corporate Stewardship

A single company drives the project but maintains an open-source license. The company
employs most core contributors, sets the roadmap, and makes final decisions.

**Projects under corporate stewardship:**
| Project | Steward | License | Notes |
|---------|---------|---------|-------|
| VS Code | Microsoft | MIT | Open source core, proprietary extensions |
| React | Meta (Facebook) | MIT | Used internally before open-sourcing |
| Go | Google | BSD | Language design by Google engineers |
| Angular | Google | MIT | Google-driven but broad community |
| Swift | Apple | Apache 2.0 | Open-sourced after internal development |
| .NET | Microsoft | MIT | Fully open, Windows+Linux+macOS |
| TypeScript | Microsoft | Apache 2.0 | Open-source but Microsoft-controlled |

**Pros:**
- Reliable funding — core developers are paid to work on the project
- Professional quality — company invests in CI, docs, security, releases
- Clear roadmap — company needs drive priorities and resourcing
- Strong brand and marketing — the company has incentive to promote the project
- Responsive security — paid security team handles vulnerabilities
- Ecosystem investment — company invests in conferences, training, tooling

**Cons:**
- Company priorities diverge from community needs — frequent tension point
- Fork risk if company makes unpopular decisions
- Community contributions may be ignored or deprioritized
- Company can change license terms unilaterally (see Part 2)
- Single company collapse — if the company fails, the project may die
- "Open core" confusion — what's open vs. what's proprietary is often blurry
- External contributors are second-class citizens in practice

**Case study — React (Meta):**
React was BSD-licensed when open-sourced in 2013 but included a controversial
PATENTS clause that revoked the patent grant if a user sued Facebook. This caused
major enterprises (Apache, WordPress, GNOME) to ban React usage. Facebook re-licensed
to MIT in 2017 after sustained community pressure. The lesson: corporate stewardship
requires careful management of legal terms the community can accept.

**When corporate stewardship succeeds:**
- The company treats the project as a genuine community asset, not a marketing tool
- External contributions are reviewed and merged in a timely manner
- The company is transparent about roadmaps and priorities
- There is a credible neutral governance transition path if the company steps back
- Decision-making includes community input, even if the company has final say

### 1.4 Foundation Governance

Multi-stakeholder governance with a legal entity providing neutral oversight.

**Major open source foundations:**
| Foundation | Focus | Model | Notable Projects |
|------------|-------|-------|-----------------|
| Apache Software Foundation | General | Meritocratic PMCs | Hadoop, HTTP Server, Spark, Kafka |
| Linux Foundation | General | Umbrella + sub-foundations | Linux, Kubernetes, Node.js |
| CNCF (under LF) | Cloud-native | Graduated/Incubating/Sandbox | Kubernetes, Prometheus, Envoy |
| OpenJS Foundation | JavaScript | Project lifecycle | Node.js, Electron, jQuery |
| Python Software Foundation | Python | BDFL → Steering Council | CPython, pip |
| Eclipse Foundation | Enterprise | Working groups | Jakarta EE, Eclipse IDE |
| Mozilla Foundation | Internet | MPL projects | Firefox, Rust |
| Cloud Native Computing Foundation | CNCF — graduated project lifecycle | TOC oversight of technical direction |

**CNCF project maturity levels:**
```
Sandbox ──→ Incubating ──→ Graduated
 (early,     (growing        (proven,
  experimental)   adopters)      production-grade)
```

**Pros:**
- Neutral home — no single company controls the project
- Legal protection — foundation holds trademarks, handles IP
- Credibility — foundation backing signals project maturity
- Long-term stability — foundation outlives any single company
- Shared investment — multiple companies can contribute resources
- Professional governance — established processes for elections, disputes, releases
- Ecosystem interoperability — foundations encourage cross-project collaboration

**Cons:**
- Bureaucratic overhead — meetings, votes, reporting, board approval
- Slower decisions — consensus-seeking across multiple stakeholders takes time
- Corporate capture risk — large donors can dominate foundation boards
- Difficult to dissolve — foundations are designed for permanence, not experiments
- Cost — running a foundation requires significant funding (typically $500k+/year)
- Vendor politics — companies may block competitors' initiatives

**Real-world example — Kubernetes and CNCF:**
Kubernetes was donated to CNCF by Google in 2015. The CNCF provides the neutral home,
trademark protection, and a governance structure. Kubernetes itself has a Steering
Committee elected by active contributors. The Cloud Native Computing Foundation (CNCF)
Technical Oversight Committee (TOC) vets new projects but does not dictate Kubernetes
technical direction. This layered governance prevents Google dominance while ensuring
Kubernetes is genuinely community-governed. Google remains the largest contributor
(~15-20% of commits) but cannot unilaterally change direction — a key difference
from pure corporate stewardship.

### 1.5 Community Council / Elected Teams

Democratic or representative governance where leaders are elected by the community.

**Variants:**

| Model | Description | Example |
|-------|-------------|---------|
| Steering Council | Small elected body with broad authority | Python (PEP 13) |
| Technical Steering Committee (TSC) | Elected technical leaders | Node.js, OpenJS projects |
| Core Team | Maintainer collective, self-selecting | Vue.js, Homebrew |
| SIGs + Steering | Topic-specific groups + coordinating body | Kubernetes, Rust |

**Example — Rust governance:**
Rust's governance was controversial and evolved rapidly:
1. **2014:** BDFL (Graydon Hoare) → Core Team (5 members)
2. **2015:** Teams model — core, language, libs, compiler, moderation
3. **2020:** COVID, burnout, and the "Moderation Team resignation crisis"
4. **2021:** New governance structure with wider representation
5. **2023:** Leadership Council replaces Core Team

Rust's current model:
- **Leadership Council** — one representative from each team
- **Teams** — T-compiler, T-libs, T-lang, T-rustdoc, etc.
- **Working Groups** — temporary teams for specific initiatives
- **RFC process** — formal proposal system for significant changes

**Key lesson from Rust:** Elected governance is not static. Rust's structure changed
fundamentally three times in eight years as the community outgrew each model.

### 1.6 Lazy Consensus

"Lazy consensus" means a proposal is accepted unless someone explicitly objects.
Silence equals consent.

**How it works:**
1. A contributor posts a proposal (PR, mailing list thread, issue comment)
2. A reasonable waiting period is announced (typically 72 hours to 2 weeks)
3. If no objections are raised, the proposal is considered accepted
4. If an objection is raised, the discussion shifts to resolving the objection
5. Unresolved objections escalate to a formal vote or maintainer decision

**Where lazy consensus is used:**
- Apache Software Foundation — standard decision-making for non-controversial items
- Many Kubernetes SIGs — for routine decisions, bug fixes, minor features
- Linux kernel — for trivial patches and subsystem-level decisions
- GitHub-based projects — default behavior when CI passes and no reviewer objects

**When it fails:**
- **Silent stakeholders:** people who would object don't notice the proposal
- **Power imbalance:** junior contributors won't object to a senior contributor's proposal
- **Short windows:** 72 hours excludes contributors in different timezones or with
  weekend schedules
- **Contentious decisions:** lazy consensus cannot resolve genuine disagreements —
  it just delays the conflict
- **Passive-aggressive blocking:** silent objection until merge, then public outcry
- **Review fatigue:** too many proposals means nobody reads carefully

**Breaking ties in lazy consensus:**
When an objection prevents lazy consensus from resolving, tiebreakers include:
- **Maintainer veto:** the project lead or delegated maintainer decides
- **Formal vote:** shift to majority or supermajority vote
- **Call for consensus (C4C):** explicit request for +1/-1 votes
- **Timeboxed discussion:** "We discuss for one week, then the maintainer decides"
- **Escalation to TSC or steering committee:** for cross-project decisions

### 1.7 Governance Model Comparison

| Criteria | BDFL | Meritocracy (ASF) | Corporate Stewardship | Foundation | Elected Teams |
|----------|------|-------------------|----------------------|------------|---------------|
| Decision speed | ⚡ Very fast | 🐢 Slow | ⚡ Fast | 🐢 Slow | 🐢 Moderate |
| Contributor trust | 🟡 Variable | 🟢 High | 🟡 Conditional | 🟢 High | 🟢 High |
| Fork risk | 🟡 Moderate | 🟢 Low | 🔴 Higher | 🟢 Very low | 🟢 Low |
| Bus factor | 🔴 1 person | 🟢 Distributed | 🔴 Company-dependent | 🟢 Distributed | 🟢 Distributed |
| Burnout rate | 🔴 High (BDFL) | 🟡 Moderate | 🟢 Low (paid devs) | 🟡 Moderate | 🔴 High (volunteers) |
| Scalability | 🔴 Poor | 🟢 Excellent | 🟢 Good | 🟢 Excellent | 🟡 Moderate |
| Innovation speed | ⚡ High | 🟡 Moderate | ⚡ High (focused) | 🟡 Moderate | 🟡 Moderate |
| Contributor diversity | 🔴 Low | 🟡 Moderate | 🟡 Moderate | 🟢 High | 🟢 High |
| Transparency | 🟡 Variable | 🟢 High | 🟡 Variable | 🟢 High | 🟢 High |
| Cost to run | 💰 $0 | 💰 Foundation overhead | 💰 Company budget | 💰$$$ (staff + overhead) | 💰 Minimal |
| Best for | Early-stage projects | Mature, broad communities | Company-backed products | Multi-company ecosystems | Volunteer-driven projects |

---

## Part 2: Licensing Deep Dive

License choice is one of the most consequential decisions an open source project
makes. It determines who can use, modify, and redistribute the code — and under
what conditions.

### 2.1 License Spectrum

```
Strong Copyleft         Weak Copyleft          Permissive           Public Domain
───────────────────────────────────────────────────────────────────────────────
AGPLv3  GPLv3  GPLv2    LGPL  MPL  EPL        Apache  MIT  BSD     Unlicense  CC0
  │       │       │       │     │    │           │       │    │        │         │
  ▼       ▼       ▼       ▼     ▼    ▼           ▼       ▼    ▼        ▼         ▼
Most restrictive ───────────────────────────────────────────────── Most permissive
```

### 2.2 Copyleft Licenses

Copyleft licenses require derivative works to be distributed under the same license.

**GNU General Public License v2 (GPLv2):**
- Requires source code distribution with binaries
- Derivative works must be GPLv2
- "System library" exception — linking to standard system libraries is OK
- Used by: Linux kernel, Git, WordPress, MariaDB (historically)
- Corporate concern: "viral" nature means proprietary code cannot link with GPLv2 libs
- GPLv2 only allows "or any later version" if the author specifies it — Linux kernel
  is explicitly "GPLv2 only," which created compatibility issues with GPLv3

**GNU General Public License v3 (GPLv3):**
- All GPLv2 requirements, plus:
- Anti-tivoization clause — prevents hardware vendors from blocking modifications
  (Section 11 — "the Corresponding Source for a work in a User Product")
- Patent retaliation — terminates patent grants if the licensee sues for infringement
- Compatibility with Apache 2.0 — GPLv3 is compatible, GPLv2 is not
- Used by: GCC, Bash, GDB, many GNU tools
- Adoption is lower than GPLv2 due to corporate resistance to anti-tivoization

**GNU Affero General Public License v3 (AGPLv3):**
- All GPLv3 requirements, plus:
- Network interaction clause (Section 13) — if a user interacts with the software
  over a network, you must provide source code (even if you don't distribute binaries)
- Purpose: closes the "ASP loophole" where SaaS providers use GPL code without releasing
- Used by: MongoDB (pre-2018), Element/Matrix, MinIO, Elasticsearch (pre-2021)
- Controversy: most corporations ban AGPL code outright due to the network clause
  being seen as overreaching

**GNU Lesser General Public License (LGPL):**
- Allows proprietary code to link with LGPL-licensed libraries
- Modifications to the library itself must be LGPL
- Designed for libraries — glibc uses LGPL specifically to allow proprietary apps
- Used by: glibc, FFmpeg, RPM, GTK, many libraries
- Two versions: LGPLv2.1 and LGPLv3 (corresponding to GPLv2/GPLv3 compatibility)

**Comparison of copyleft requirements:**

| License | Source must accompany distribution | Network use = distribution | Patent protection | Anti-tivoization |
|---------|-----------------------------------|---------------------------|-------------------|------------------|
| GPLv2 | Yes | No | No | No |
| GPLv3 | Yes | No | Yes (explicit) | Yes |
| AGPLv3 | Yes | **Yes** | Yes (explicit) | Yes |
| LGPLv2.1 | Yes (for lib changes) | No | No | No |
| LGPLv3 | Yes (for lib changes) | No | Yes | Yes |

### 2.3 Permissive Licenses

Permissive licenses allow anyone to use, modify, and redistribute the code under
any terms — including proprietary, closed-source distribution.

**MIT License:**
- Extremely short and simple — ~170 words
- Conditions: include the copyright notice and permission notice
- Used by: React, Node.js (core), jQuery, Rails, many npm packages
- Pros: universally understood, minimal compliance burden, maximally adoption-friendly
- Cons: no patent protection (unlike Apache 2.0), no explicit trademark grant
- Compatibility: can be incorporated into any other license

**Apache License 2.0:**
- More comprehensive than MIT:
- Explicit patent grant — contributors grant patent licenses for their contributions
- Trademark protection — license does not grant trademark rights
- Termination clause — license terminates if you sue for patent infringement
- Used by: Kubernetes, Android, Swift, Elasticsearch (pre-SSPL), Go, Hadoop
- Pros: patent protection, corporate-friendly, well-understood
- Cons: slightly longer and more complex than MIT
- Compatibility: Apache 2.0 code can go into GPLv3 projects (not GPLv2)

**BSD Licenses:**
- **BSD 2-Clause:** Like MIT but with "no endorsement" clause — cannot use project
  name to promote derived products without permission
- **BSD 3-Clause:** Adds a clause prohibiting the use of contributors' names to
  endorse derived products
- **BSD 4-Clause** (original BSD): Included an "advertising clause" requiring all
  advertising to acknowledge the project — this is GPL-incompatible and obsolete
- Used by: Go (BSD 3-Clause), Nginx (BSD 2-Clause), Redis (BSD 3-Clause), SQLite

**Unlicense:**
- Public domain dedication with a fallback license
- No conditions whatsoever
- Used by: some npm packages, individual scripts
- Controversy: some jurisdictions (Germany) do not recognize public domain dedications
- The fallback license (no conditions) may not be enforceable everywhere
- Recommended alternative: CC0 may be more legally robust

**Creative Commons Zero (CC0):**
- Public domain dedication with universal fallback
- Used for data and creative works, not software
- Legally tested and upheld in various jurisdictions
- Recommended for: documentation, datasets, configuration files
- Not recommended for: software (use Unlicense or MIT instead)

### 2.4 License Compatibility Matrix

Whether code from project A (licensed under License X) can be incorporated into
project B (licensed under License Y).

| Upstream ↓ → Downstream → | MIT | Apache 2.0 | GPLv2 | GPLv3 | AGPLv3 | LGPLv2.1 | LGPLv3 | BSD | MPL 2.0 |
|---------------------------|-----|------------|-------|-------|--------|----------|--------|-----|---------|
| MIT | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Apache 2.0 | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| GPLv2 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| GPLv3 | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| AGPLv3 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| LGPLv2.1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| LGPLv3 | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| BSD | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| MPL 2.0 | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Key compatibility notes:**
- ❌ = Incompatible — cannot combine code (unless both are under GPLv3-or-later)
- ✅ = Compatible — can incorporate upstream code into downstream project
- GPLv2-only code (like the Linux kernel) cannot be combined with GPLv3 code
- Apache 2.0 is compatible with GPLv3 (Apache 2.0 grants sufficient permissions)
- All permissive licenses are compatible with each other
- LGPLv2.1 → LGPLv3 is NOT compatible (must use LGPLv2.1 or later)
- MPL 2.0 files can be incorporated into GPLv3 projects ("file-level copyleft")

**The Linux kernel licensing complexity:**
The Linux kernel is GPLv2-only, which creates:
- No GPLv3 compatibility — built-in modules must be GPLv2-compatible
- No syscall interface exception formally (though in practice, userspace programs
  that use syscalls are not considered derivative works)
- Pure kernel modules must be GPLv2-compatible
- "Proprietary kernel modules" exist in a legal gray area (not tested in court)

### 2.5 How License Choice Affects Adoption and Contribution

**Corporate adoption by license:**

| Factor | Permissive (MIT/Apache/BSD) | Weak Copyleft (LGPL/MPL) | Strong Copyleft (GPL) | AGPL |
|--------|---------------------------|------------------------|----------------------|------|
| Enterprise adoption | 🟢 Widely adopted | 🟡 Restricted | 🔴 Often banned | 🔴 Mostly banned |
| SaaS usage | 🟢 No restrictions | 🟢 No restrictions | 🟢 No restrictions (pre-AGPL) | 🔴 Must open source |
| Embedding in products | 🟢 Free | 🟡 Must open changes to lib | 🔴 Must open entire product | 🔴 Must open entire service |
| Commercial distribution | 🟢 Unlimited | 🟡 Limited | 🔴 Must share source | 🔴 Must share source |
| Venture capital interest | 🟢 High | 🟡 Moderate | 🔴 Low | 🔴 Very low |
| Corporate contributions | 🟢 High | 🟡 Moderate | 🔴 Low | 🔴 Very low |

**Empirical observation:**
Projects licensed under MIT or Apache 2.0 receive 2-10x more corporate contributions
than GPL-licensed projects of comparable scope. This doesn't mean GPL is wrong — it
means the license filters the contributor base. GPL projects tend to have more
individual and community contributors; MIT projects tend to have more corporate
engineers.

**License and community culture:**
- **MIT/Apache:** "Use this anywhere, for anything" — maximally permissive culture
- **GPL:** "If you take, you must give back" — emphasizes community reciprocity
- **AGPL:** "SaaS is distribution" — ensures even cloud providers share changes
- **BSL/SSPL:** "Commons clause" — protects commercial viability, limits competition

### 2.6 License Change Controversies

License changes in established projects are among the most contentious events in
open source. They can fracture communities, trigger forks, and permanently damage
trust.

**HashiCorp (MPL 2.0 → BSL, 2023):**
- **Action:** Changed Terraform, Consul, Vault, Nomad from MPL 2.0 to Business Source
  License (BSL), which restricts commercial use
- **Rationale:** "Open source is not sustainable when cloud vendors monetize our work
  without contributing back" (HashiCorp CEO)
- **Response:** Massive community backlash → OpenTofu fork (Linux Foundation backed)
- **Outcome:** OpenTofu gained significant adoption, HashiCorp was acquired by IBM
  (April 2024, $6.4B). OpenTofu continues as a CNCF-sandboxed project.
- **Lesson:** License change can trigger a viable fork when the community is
  large and engaged enough. HashiCorp misjudged community loyalty.

**Elastic (Apache 2.0 → SSPL, 2021):**
- **Action:** Changed Elasticsearch and Kibana from Apache 2.0 to SSPL (Server Side
  Public License), which requires providing SaaS service source to users
- **Rationale:** "AWS is competing unfairly by offering managed Elasticsearch without
  contributing" — Amazon had launched a managed Elasticsearch service
- **Response:** AWS forked Elasticsearch → OpenSearch (Apache 2.0, under Linux Foundation)
- **Outcome:** OpenSearch gained market share, Elastic N.V. stock initially dropped.
  Elastic and AWS remain competitors. OpenSearch has a growing ecosystem.
- **Lesson:** Cloud providers can and will fork. The fork gains credibility through
  a foundation neutral home.

**Grafana (Apache 2.0 → AGPLv3, 2021):**
- **Action:** Changed Grafana from Apache 2.0 to AGPLv3
- **Rationale:** "We need to protect against competitors using our open core without
  contributing back" — targeted at hosted Grafana competitors
- **Response:** Less backlash than HashiCorp/Elastic because every Grafana-specific
  contribution pre-dating the change remained Apache 2.0, and the AGPLv3 is an
  OSI-approved license (unlike BSL/SSPL). Grafana CRM and enterprise remained proprietary.
- **Outcome:** Minimal fork activity. Grafana remains dominant in the space.
- **Lesson:** Switching to an OSI-approved license (AGPL) is less damaging than
  switching to a non-OSI license (BSL, SSPL). The community perceives it as less
  aggressive.

**Terraform (MPL 2.0 → BSL → MPL 2.0 via OpenTofu):**
Note that OpenTofu, the fork, remains MPL 2.0. HashiCorp's original switch was to
BSL. The existence of OpenTofu under MPL 2.0 means the original license lives on.

**MongoDB (AGPLv3 → SSPL, 2018):**
- **Action:** Changed MongoDB from AGPLv3 to SSPL (an OSI-unapproved license)
- **Rationale:** Same as Elastic — cloud vendors offering MongoDB as a service
- **Response:** Linux distributions (Debian, Fedora) removed MongoDB from repos
  because SSPL is not OSI-approved. Community concern about license proliferation.
- **Outcome:** MongoDB remains successful but the OSI rejection was embarrassing
- **Lesson:** Non-OSI-approved licenses create ecosystem friction — package
  managers, distributions, and foundations may refuse to participate

**MySQL (GPLv2 → Commercial dual license):**
MySQL has always been GPLv2 + commercial. The GPLv2 is the "community edition."
Oracle (after acquiring Sun/MySQL) has not changed the open source license but has
shifted development priorities to the enterprise version. MariaDB forked in 2009
due to concerns about Oracle's stewardship.

**Lessons from license changes:**
1. Trust is destroyed in an afternoon and rebuilt over years — if ever
2. A viable fork requires: (a) active maintainers willing to fork, (b) a neutral
   foundation to host the fork, (c) significant community support, (d) continued
   development velocity post-fork
3. OSI-approved licenses are safer than non-OSI for maintaining ecosystem position
4. Cloud vendors are the primary threat that drives license changes, but the
   change itself often does more damage than the cloud competition
5. Communication matters — surprising the community with a license change is the
   worst approach. HashiCorp announced Terraform's license change with minimal
   warning and provoked the strongest backlash
6. If you change your license, expect a fork. Plan your response carefully

### 2.7 Dual Licensing Models

Dual licensing offers code under two different license terms — typically an open
source license and a commercial license.

**How dual licensing works:**
```
                     ┌─────────────────────┐
     Contributor      │   Project           │        End User
     ───────────────→ │ ┌─────────────────┐ │ ───────────────→
     Contributes      │ │ Open source     │ │    User chooses:
     under CLA that   │ │ license (GPL)   │ │    • Free → accept GPL terms
     assigns/broad-   │ │                 │ │    • Pay → buy commercial license
     licenses rights  │ │ Commercial      │ │         (proprietary terms)
                      │ │ license ($$$)    │ │
                      │ └─────────────────┘ │
                      └─────────────────────┘
```

**Key examples:**

| Project | Open Source License | Commercial License | Vendor |
|---------|-------------------|-------------------|--------|
| MySQL | GPLv2 | Commercial license | Oracle |
| Qt | LGPL/GPL (vintage) | Commercial license | Qt Company |
| GitLab CE | MIT | Proprietary EE features | GitLab Inc. |
| Redis (modules) | AGPLv3 | Redis Source Available License | Redis Ltd. |
| Sidekiq | LGPL | Commercial license | Contribsys |
| OpenCore projects | Various | Proprietary features | Various |

**How contributions work in dual licensing:**
To accept contributions under the open source license while preserving the right
to sell commercial licenses, the project requires a Contributor License Agreement
(CLA) that either:
- **Assigns copyright** to the project owner (MySQL-style)
- **Grants a broad license** to the project owner to sublicense (Apache-style ICLA)

**Advantages of dual licensing:**
- Revenue stream funds ongoing development
- Open source edition drives adoption and community
- Commercial edition provides compliance option for proprietary users
- Attracts contributors who believe in the mission

**Disadvantages of dual licensing:**
- Tension between community features and paid features
- Contributors may feel exploited — their free labor generates profit for the vendor
- The line between "Community Edition" and "Enterprise Edition" is always contested
- Fork risk if the vendor withholds too much functionality
- CLA requirement can deter some contributors

**GitLab CE/EE model:**
GitLab uses a unique "open core" approach:
- All code is MIT licensed
- Enterprise features are in separate directories that are included in the codebase
  but require an EE license to use
- The code is transparent — you can see exactly what you're not getting in the free version
- Merging a CE MR into EE is automated when EE-specific implementations exist
- This transparency reduces the tension of dual licensing

### 2.8 DCO vs. CLA

Both Developer Certificate of Origin (DCO) and Contributor License Agreements (CLA)
establish the legal terms under which contributions are made.

**Developer Certificate of Origin (DCO):**
- A lightweight, standardized certification
- Contributor signs off with `Signed-off-by: Name <email>` on each commit
- Certifies that the contributor has the right to submit the work
- Originated with the Linux Kernel (2004), defined by the Linux Foundation
- **No copyright assignment** — contributor retains ownership
- **Pros:** Simple, low-friction, industry-standard for kernel-style development
- **Cons:** No explicit patent grant (though DCO v1.1 covers it implicitly),
  doesn't help with dual-licensing models

**DCO text (v1.1):**
```
Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I have
    the right to submit it under the open source license indicated in
    the file; or

(b) The contribution is based upon previous work that, to the best of
    my knowledge, is covered under an appropriate open source license
    and I have the right under that license to submit that work with
    modifications, whether created in whole or in part by me, under
    the same open source license (unless I am permitted to submit
    under a different license), as indicated in the file; or

(c) The contribution was provided directly to me by some other person
    who certified (a), (b) or (c) and I have not modified it.

(d) I understand and agree that this project and the contribution are
    public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

**Contributor License Agreement (CLA):**
- A legal agreement between the contributor and the project (or its steward)
- Two main types:
  1. **Individual CLA (ICLA):** Signed by one person
  2. **Corporate CLA (CCLA):** Signed by an employer, covering all employees
- Can be: copyright assignment OR broad license grant
- **Apache CLA:** Grants the ASF a perpetual, irrevocable license to use the
  contribution (no copyright assignment)
- **FSF CLA:** Copyright assigned to the Free Software Foundation
- **MySQL CLA:** Copyright assigned to Oracle (historically MySQL AB)

**Comparison:**

| Aspect | DCO | CLA |
|--------|-----|-----|
| Complexity | Low — one line per commit | Higher — requires signing a legal document |
| Friction | Minimal — automated checks | Significant — may require legal review |
| Dual licensing | Does not support it | Required for dual-licensing models |
| Copyright assignment | No | Optional (varies by CLA) |
| Patent protection | Implicit (DCO v1.1) | Explicit (in well-written CLAs) |
| Corporate contributions | Handled per-commit | Consolidated via CCLA |
| Adoption | Linux kernel, CNCF, DCO projects | Apache, Eclipse, most corporate OSS |
| Enforcement | Git history provides evidence | Legal agreement provides evidence |

**Which to choose:**
- **Choose DCO if:** You don't need dual licensing, you want maximum contributor
  friendliness, your project follows the kernel/CNCF style
- **Choose CLA if:** You need dual licensing, your project is under a foundation
  requiring it (Apache-style), or your corporate legal team requires explicit
  paperwork
- **Hybrid:** Some projects use DCO for small contributions and CLAs for large ones

**Automation tools:**
- DCO enforcement: probot/dco (GitHub), DCO Bot for GitLab
- CLA management: EasyCLA (Linux Foundation), CLA Assistant (GitHub), Apache CLAs

### 2.9 Compliance Tools

**FOSSA:**
- Scans dependencies and raises license compliance issues
- Automated policy enforcement (e.g., "No AGPL in production services")
- Integration with CI/CD pipelines
- Dependency tree visualization with license analysis
- Pricing: Free tier for public repos, paid for enterprise
- Strengths: Deep dependency scanning, policy-as-code, security integration

**Snyk:**
- Primarily a security scanner but includes license compliance
- License policies per project or per organization
- Alerts for license changes in dependencies
- Integration with GitHub, GitLab, Bitbucket
- Pricing: Free tier, paid for teams/enterprise
- Strengths: Combined security + license scanning, Snyk Advisor

**ClearlyDefined:**
- Community-curated license data for open source packages
- Goal: clear, standardized license metadata for every package
- If a package has unclear licensing, you can research and contribute clarity
- Integration with FOSSA, OSS Review Toolkit
- Free (community-driven)
- Strengths: Curation, crowd-sourced, neutral

**AboutCode (scancode-toolkit):**
- Free, open source license scanner (Apache 2.0)
- Detects licenses, copyrights, and package manifests
- Runs locally — no data sent to third parties
- Supports 500+ licenses and over 10,000+ text matches
- Outputs SPDX-compatible data
- Strengths: Libre, local-only, thorough, SPDX standard format

**Other compliance tools:**
| Tool | Type | License | Key Feature |
|------|------|---------|-------------|
| OSS Review Toolkit (ORT) | Pipeline | Apache 2.0 | Full compliance workflow |
| SPDX Tools | Standard | Various | Industry-standard SBOM format |
| Dependency-Check | Security/Analyzer | Apache 2.0 | NVD-based vulnerability detection |
| LicenseFinder | Scanner | MIT | CI-integrated, supports multiple package managers |
| AskOpen | Consulting | N/A | Legal analysis of OSS usage |

---

## Part 3: Codes of Conduct & Community Health

A Code of Conduct (CoC) establishes behavioral norms and creates enforcement
mechanisms for violations. A well-implemented CoC is essential for maintaining a
healthy, inclusive community.

### 3.1 Standard Codes of Conduct

**Contributor Covenant (v2.1):**
The most widely adopted CoC in open source (~40% of GitHub projects that have a CoC).

- **Adopted by:** Kubernetes, VS Code, Rails, Swift, React, Linux Foundation projects
- **Structure:**
  1. **Pledge:** Commitment to a harassment-free environment
  2. **Standards:** List of expected and unacceptable behaviors
  3. **Enforcement responsibilities:** Project maintainers handle enforcement
  4. **Scope:** Applies within all community spaces and when representing the project
  5. **Enforcement:** Guidelines for warnings, temporary bans, permanent bans
- **Strengths:** Well-known, legally reviewed, widely understood
- **Criticisms:** Template-based, some communities find it too formal or corporate
- **Enforcement guidance:** Contributor Covenant offers a separate enforcement manual
  (v1.0 of the Enforcement Guidelines)

**Ubuntu Code of Conduct:**
Canonical's CoC was an early pioneer (2004) — emphasizes respect and collaboration
rather than a list of prohibited behaviors.

- **Key principles:**
  - Be considerate
  - Be respectful
  - Be collaborative
  - Be professional (when representing the project)
  - Stay open to different viewpoints
- **Strengths:** Less adversarial tone, feels more welcoming
- **Weaknesses:** Less clear on specific unacceptable behaviors, enforcement is vague
- **Enforcement:** Through the Community Council, with escalation to the Ubuntu
  Community Board

**Citizen Code of Conduct:**
Focuses on specific prohibited behaviors with clear examples.

- **Prohibited specifically:** Violence threats, discriminatory jokes, personal
  attacks, unwelcome sexual attention, publishing private info (doxxing)
- **Enforcement:** Warnings, temporary bans, permanent bans
- **Strengths:** Very specific about what is not OK — less room for interpretation
- **Weaknesses:** Lengthy, can feel like a legal document

**Comparison:**

| Aspect | Contributor Covenant | Ubuntu CoC | Citizen CoC |
|--------|---------------------|------------|-------------|
| Tone | Formal | Collaborative | Directive |
| Specificity | Moderate | Low | High |
| Enforcement guidance | Yes (separate doc) | Community Council | Included |
| Adoption | ~40% of OSS projects | Ubuntu ecosystem | Smaller projects |
| Review cycle | Community-driven | Canonical | Community-driven |
| Length | ~500 words | ~300 words | ~1000 words |

**Projects without a CoC — the risk:**
- Harassment incidents go unaddressed and undocumented
- Toxic contributors can drive away valuable community members
- The project's reputation suffers
- Companies may prohibit employer participation in projects without a CoC
- Some events and conferences require a CoC for project booths and presentations
- Lost contributor growth — underrepresented groups are less likely to participate

### 3.2 Enforcement Models

**PMC-led enforcement (Apache model):**
- The Project Management Committee handles CoC complaints
- Complaints are submitted privately (PMC private list)
- The PMC votes on enforcement actions
- **Pros:** Integrated with the project's existing governance
- **Cons:** Conflicts of interest, lack of CoC expertise among PMC members,
  power dynamics discourage reporting

**Dedicated committee-based enforcement:**
A separate committee, independent of the technical governance body, handles CoC
matters. Common in larger projects.

- **Example — Kubernetes CoC Committee:**
  - 5 members elected by the community
  - Cannot overlap with Steering Committee
  - Handles reports confidentially
  - Decisions are final (no appeal to Steering)
  - Publishes anonymized summaries annually
- **Pros:** Independence, expertise develops over time, no power conflict
- **Cons:** Requires dedicated volunteers, coordination with technical leadership

**Foundation-level enforcement:**
The foundation handles CoC enforcement across all member projects.

- **Example — Linux Foundation:**
  - Offers centralized CoC enforcement services
  - Experienced HR and legal professionals involved
  - Consistent approach across projects
- **Pros:** Professional, consistent, removes burden from project volunteers
- **Cons:** Distant from the community, may not understand project-specific dynamics,
  slower response

**External mediation model:**
Some projects contract with external mediation services for serious cases.

- Can be expensive
- Brings neutral, professional conflict resolution
- Useful when the community is small and cannot form an impartial committee
- Example: The Ada Initiative (defunct, but pioneered this model)

**Enforcement decision matrix:**

| Incident severity | First offense (minor) | Second offense | Repeated / major |
|------------------|----------------------|----------------|------------------|
| Microaggression | Private warning | Warning + note | Temporary ban |
| Toxic/harassing comment | Public warning + edit/delete | Temporary ban | Permanent ban |
| Threats/harassment | Immediate temporary ban | Permanent ban | Permanent ban |
| Doxxing/stalking | Immediate permanent ban | N/A | N/A |
| Sexual harassment | Immediate permanent ban | N/A | N/A |

### 3.3 Conflict Resolution

**Arbitration ladder:**
```
Step 1: Direct communication
   └─ Person A talks to Person B (ideally async, in writing)
Step 2: Mediated discussion
   └─ A trusted third party facilitates a conversation
Step 3: Formal complaint
   └─ Filed with the CoC committee or PMC
Step 4: Investigation
   └─ Committee interviews parties and witnesses
Step 5: Decision
   └─ Committee issues ruling with rationale
Step 6: Appeal
   └─ If appeal mechanism exists, escalated to next level
Step 7: Resolution
   └─ Action taken, parties notified, community informed (or not)
```

**Escalation procedures:**
- **Internal escalation:** From project maintainers → PMC → Foundation
- **External escalation:** To Linux Foundation Technical Advisory Board, or relevant
  foundation ombudsman
- **Anonymous escalation:** Should always be available — Google Form, dedicated email,
  or third-party reporting tool
- **Timeline expectations:**
  - Initial acknowledgment: 24-48 hours
  - Investigation: 1-2 weeks (depending on complexity)
  - Decision and notification: within 1 week of investigation completion
  - Appeals: 1-2 weeks

**Conflict de-escalation techniques:**
1. **Separate intent from impact:** "I know you didn't intend to offend, but the
   impact was that X felt excluded. Can you rephrase?"
2. **Use "I" statements:** "I felt frustrated when the PR was merged without
   discussion" instead of "You violated the process"
3. **Offer a pause:** "Let's take 24 hours and revisit this with fresh perspective"
4. **Move to private channels:** "This discussion is getting heated — let's take it
   to DM or a private channel"
5. **Refocus on shared goals:** "We all want the same thing — a stable, performant
   library. How can we get there productively?"
6. **Document the resolution:** Even informal resolutions should be briefly noted
   (without violating confidentiality) so patterns can be identified

### 3.4 Measuring Community Health

**CHAOSS (Community Health Analytics Open Source Software):**
A Linux Foundation project that standardizes open source community health metrics.

**CHAOSS metric model — five dimensions:**

| Dimension | Description | Example Metrics |
|-----------|-------------|-----------------|
| **Diversity & Inclusion** | How diverse is the contributor base? | Contributor demographics, geographic distribution, languages, experience levels |
| **Evolution** | How is the project changing? | Code changes, release frequency, version adoption |
| **Risk** | What threatens project sustainability? | Bus factor, dependency health, licensing clarity |
| **Value** | What value does the project deliver? | Downloads, dependents, ecosystem growth |
| **Experience** | What is the contributor experience? | Time-to-first-response, retention rates, satisfaction surveys |

**Key CHAOSS metrics explained:**

**Diversity:**
- **Contributor diversity index (similar to Simpson's Index):** Measures how evenly
  contributions are distributed across contributors. A low index means one or a few
  people do most of the work.
- **Geographic diversity:** Spread of contributors across countries/time zones
- **Organizational diversity:** How many different companies contribute (important
  for foundation projects)
- **New contributor rate:** Percentage of contributors who started in the last
  reporting period

**Evolution:**
- **Code change velocity:** Lines added/deleted, commits per day/week/month
- **Review latency:** Time from PR/merge request submission to first review
- **Release cadence:** Days between releases, semantic versioning compliance
- **Issue resolution time:** Median time from issue creation to close

**Risk:**
- **Bus factor:** Minimum number of contributors whose departure would cripple the
  project (see Section 6.2 for detailed calculation)
- **Dependency freshness:** How many dependencies are out of date or have known
  vulnerabilities
- **License compliance:** Percentage of dependencies with clearly identified licenses
- **Maintainer turnover:** How many maintainers join and leave each period

**Value:**
- **Adoption:** Downloads, stars, forks (vanity metrics, but useful for trends)
- **Dependents:** Projects/packages that depend on this project
- **Direct usage:** npm/github/other data showing active use
- **Ecosystem impact:** Standards, conferences, derivative projects

**Experience:**
- **Time to first response:** How quickly do new contributors get a human response?
- **First contribution success rate:** What percentage of first-time contributors
  have their first PR merged?
- **Contributor retention:** What fraction of contributors who made 1-2 contributions
  become regular contributors? (See Section 6.4)
- **Net Promoter Score (NPS):** "How likely are you to recommend contributing to this
  project?" — measured via survey

### 3.5 Toxic Behavior Patterns

**Recognition guide for common toxic behaviors:**

| Behavior | Definition | How to Recognize | Response Strategy |
|----------|------------|-----------------|-------------------|
| **Bikeshedding** | Debating trivial details while avoiding hard problems | Endless discussion of naming, formatting, or badge placement | Timebox the discussion, defer to maintainer on trivial matters |
| **Sealioning** | Persistent, bad-faith questioning to exhaust the other party | "I'm just asking questions" — refuses to accept explanations, demands endless citations | Disengage after 2-3 rounds of good-faith answers; refer to CoC harassment clause |
| **Concern trolling** | Feigning concern to undermine a proposal | "I'm just worried that adding diversity requirements will dilute code quality" | Address the substance once, then disengage; document the pattern |
| **Gaslighting** | Making someone doubt their own perception of events | "That never happened," "You're too sensitive," "Everyone else disagrees" | Document everything; involve CoC committee; do not engage alone |
| **Whataboutism** | Deflecting criticism by pointing at others' behavior | "What about company X who also does this?" or "What about this other issue?" | "Let's focus on this specific issue. We can discuss X separately." |
| **Gish gallop** | Overwhelming the discussion with rapid-fire false or questionable claims | A flood of arguments in quick succession, too many to refute | "Please post one substantive argument at a time. I'll address each in order." |
| **Seal team** | Multiple accounts or allies attacking the same target | A person raises a concern; 2-3 others (who never participate) jump in to support | Be aware this can be organized brigading; document account histories |
| **Derailing** | Permanently redirecting a conversation away from the original topic | "That's interesting, but have you considered X?" (repeatedly) | "Let's stay on the original topic. X is worth its own thread." |
| **Concern spiral** | Ratcheting up hypothetical worst-case scenarios | "But if we accept this change, what if X? And then Y? And then Z?" | "Let's address the actual proposal, not speculative chains. We can handle problems if they arise." |
| **Sealioning Lite** | Repeated requests for "more data" on clearly settled points | Citing outdated statistics, demanding proof of well-known facts | "This has been discussed in [link]. Please read and respond to that thread." |

**Prevention strategies:**
1. **Explicit norms in CONTRIBUTING.md:** State what communication styles are expected
2. **Template enforcement:** Issue templates, PR templates that discourage bad behavior
3. **Review guidelines:** "No personal attacks" enforced as strictly as code style
4. **New contributor mentoring:** Pair new contributors with experienced ones
5. **Regular climate surveys:** Anonymous surveys to detect toxicity before it escalates
6. **Moderation bot integration:** Automated detection of swear words, personal attacks,
   and other flagged content
7. **Public logs of moderation actions** (anonymized): Builds transparency and trust

### 3.6 Incident Response

**Reporting channel requirements:**
- **Dedicated email address:** conduct@project.org
- **Third-party reporting tool:** e.g., EthicsPoint, anonymous survey platforms
- **In-person reporting:** For conferences and events — designated reporting team
- **All channels must be monitored:** 24-48 hour response guarantee

**Investigation timeline:**
```
Report submitted
       │
       ▼
   24h: Acknowledgment sent to reporter
       │  (include: report received, investigation process, expected timeframe)
       │
       ▼
   48h: Initial assessment completed
       │  (is this within scope? emergency? needs immediate action?)
       │
       ▼
   1-2 weeks: Full investigation
       │  - Interview reporter (if willing)
       │  - Interview accused
       │  - Interview witnesses
       │  - Review evidence (chat logs, comments, emails)
       │
       ▼
   1 week: Decision and resolution
       │  - Determine appropriate action
       │  - Notify reporter and accused
       │  - Document the decision
       │
       ▼
   Ongoing: Follow-up
       - Check in with affected parties after 1 month
       - Update community if appropriate
       - Record for pattern analysis
```

**Resolution communication:**
- **Public cases:** Issue a brief, anonymized statement
- **Private cases:** Respect privacy of all parties
- **What to include in public statement:**
  - The conduct committee received a report (no details)
  - Investigation was conducted
  - Action was taken (no specifics about individuals)
  - The CoC process functioned as designed
- **What NOT to include:**
  - Names or identifying details of parties
  - Exact wording of offensive content
  - Internal committee discussions

**Post-incident documentation:**
- CoC committee maintains confidential records
- Annual summary published to community (aggregate statistics)
- Records retained for at least 2 years (legal advice may vary)
- Data considerations: GDPR compliance for EU-based parties

### 3.7 Restorative Justice

Traditional enforcement (warnings → bans) is punitive. Restorative justice focuses
on repairing harm, reintegration, and education.

**Restorative approach to violations:**

| Step | Punitive approach | Restorative approach |
|------|-------------------|---------------------|
| First minor violation | Warning (may become public record) | Private conversation, education about impact |
| First moderate violation | Temporary ban | Apology + education + removal of offending content |
| Second violation | Longer temporary ban | Formal apology + agreement on behavioral changes + mentoring |
| Repeated violations | Permanent ban | Permanent ban (restorative justice has limits) |

**Restorative justice process:**
1. **Acknowledgement:** The offender acknowledges the behavior was harmful
2. **Understanding:** The offender learns *why* it was harmful (reading, conversation,
   education)
3. **Apology:** A genuine, specific apology is issued
4. **Amends:** The offender takes concrete action (removing content, making a
   donation, providing mentorship)
5. **Reintegration:** With community input, the offender is allowed to rejoin
6. **Monitoring:** A period of observation to ensure behavior change sticks

**When restorative justice is NOT appropriate:**
- Sexual harassment or assault
- Threats of violence
- Doxxing
- Repeated, deliberate violations after multiple restorative attempts
- Cases where the reporter would be harmed by the offender's presence
- Legal violations (defamation, hate speech, etc.)

**Permanent bans — principles:**
- Reserved for the most serious violations
- Decision should require supermajority (75%) of the enforcement body
- Document the rationale thoroughly
- Notify the banned party of the decision and reasoning
- Consider a review timeline (e.g., 1 year, then re-assess)
- Publish anonymized data about bans to build community trust

---

## Part 4: Decision-Making Frameworks

Structured decision-making processes ensure that changes are well-documented,
properly reviewed, and command community support.

### 4.1 RFC Process

A formal Request for Comments (RFC) process — known by different names in
different projects — is the standard way to propose significant changes.

**Comparison of major RFC systems:**

| Feature | Rust RFC | Kubernetes KEP | Python PEP |
|---------|----------|----------------|------------|
| Repository | rfcs/ directory | keps/ directory | peps/ repository |
| File format | Markdown | Markdown | reStructuredText |
| Numbering | Sequential | Sequential | Sequential |
| PR required? | Yes | Yes | Yes |
| Shepherd | Assigned by team | KEP approver | `BDFL-Delegate` (pre-2018) |
| Final decision | Team vote | SIG + TSC approval | Steering Council |
| Template | Extensive | Extensive | Structured header |
| Shepherding | Yes, required | Yes, required | Optional |

**RFC lifecycle (generalized):**
```
┌──────────────────────────────────────────────────────┐
│                   IDEA                                │
│  (discussion on mailing list / Discord / issue)      │
└──────────────────────┬───────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────┐
│              PRE-RFC / DRAFT                         │
│  (informal gathering of requirements, constraints)   │
└──────────────────────┬───────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────┐
│           RFC SUBMISSION (PR #N)                     │
│  • Complete template                                 │
│  • Motivation, design, alternatives, unresolved      │
└──────────┬──────────────────────────────────────┬────┘
           │                                      │
           ▼                                      ▼
┌─────────────────────────┐        ┌─────────────────────────┐
│    COMMENT PERIOD       │        │     SHEPHERD REVIEW     │
│  (1-4 weeks)            │        │  (1-2 weeks)            │
│  • Community feedback   │        │  • Check for completeness│
│  • Design discussions   │        │  • Ready for decision?  │
│  • Alternative proposals│        │  • Assign reviewers      │
└──────────┬──────────────┘        └──────────┬──────────────┘
           │                                   │
           └──────────┬────────────────────────┘
                      ▼
┌──────────────────────────────────────────────────────┐
│          FINAL COMMENT PERIOD (FCP)                  │
│  • Announced with exact end date                     │
│  • Last call for objections                          │
│  • Usually 10-14 days                                │
└──────────────────────┬───────────────────────────────┘
                       ▼
           ┌─────────────────────┐
           │      DECISION      │
           │  +──────+──────+── │
           │  │Accept│Modify│Rej│
           │  +──────+──────+── │
           └─────────┬──────────┘
                     ▼
           ┌─────────────────────┐
           │    IMPLEMENTATION   │
           │  (tracked in RFC)   │
           └─────────────────────┘
```

**RFC template (universal):**
```markdown
# RFC N: [Title]

- **Start Date:** YYYY-MM-DD
- **Target Release:** vX.Y (if applicable)
- **RFC PR:** #N
- **Author(s):** Name(s) <email(s)>
- **Shepherd:** Name <email>
- **Status:** Draft → Comment Period → Final Comment → Accepted/Rejected/Withdrawn

## Summary
One paragraph explaining the proposed change.

## Motivation
Why is this change needed? What problem does it solve? What is the use case?

## Design
Detailed technical design. Diagrams welcome. This section should be specific
enough to implement.

## Drawbacks
Why might we NOT want to do this? Be honest about trade-offs.

## Rationale & Alternatives
- Why is this design better than alternatives?
- What other designs were considered and rejected?
- Why is this the right time for this change?

## Unresolved Questions
- What remains to be decided during implementation?
- What follow-up RFCs might be needed?

## Implementation Timeline
- Phase 1: ...
- Phase 2: ...
- etc.
```

**RFC Shepherd role:**
- A designated person who guides the RFC through the process
- Ensures the RFC is complete and addresses community concerns
- Represents the RFC to the decision-making body
- Does NOT author the RFC (should be a neutral party)
- Coordinates the final comment period and decision vote

**When an RFC is NOT needed:**
- Bug fixes
- Documentation improvements
- Refactoring without API changes
- Adding tests
- Performance improvements with no user-facing change
- Dependency version bumps

### 4.2 Consensus-Seeking

Consensus does NOT mean unanimous agreement (that's consensus with a capital C).
Consensus means: "Everyone can live with this decision."

**The consensus spectrum:**
```
Strong consensus ──────────────────→ Lacks consensus
  "I love it"     "I can live     "I have concerns       "I don't agree   "I block"
                    with it"       but won't block"        with this"
       +2              +1               0                     -1            -2
```

**Running a consensus vote:**
1. **State the proposal clearly:** "We propose that the default sorting algorithm
   for the library's sort function be changed from quicksort to timsort"
2. **Allow discussion:** Minimum 72 hours for discussion
3. **Call for consensus:** "If there are no objections by [date], we will consider
   this decision adopted"
4. **Handle objections:** If a -1 is recorded, the proponent must address it
5. **Declare consensus:** "After [period], no blocking objections were raised.
   The decision is adopted"

**Tie-breaking:**
- **Maintainer tie-break:** The project leader or TSC chair casts the deciding vote
- **Rotating tie-break:** Each committee member gets a turn to break ties
- **External tie-break:** Escalate to the next governing body (PMC → Board)
- **Flip a coin / dice roll:** Rare, but acceptable when all options are truly
  equivalent
- **Delay and revisit:** "We are deadlocked. Let's collect more data and revisit
  in 2 months"

**Alternatives to voting:**
- **Consensus comes first:** Vote only when consensus fails
- **Roulette:** Randomly select a decider from the qualified body
- **Dot voting:** Each person gets N dots to allocate to options
- **Fist of five:** Hand gesture shows agreement level (5 fingers = full support,
  fist = block)
- **Modified Borda count:** Ranked preferences, weighted scoring

### 4.3 Objection Handling

**Veto rights:**
- **Linus Torvalds:** Maintains veto on Linux kernel decisions
- **Apache PMC:** Individual PMC members have "binding votes" on releases
- **Veto scope:** Should be limited to specific domains (security, architecture,
  compatibility)
- **Veto documentation:** Must always be accompanied by a written rationale

**Override mechanisms:**
```
Override chain (general):
┌──────────────────────────────────────────────────────────────────┐
│  Individual veto          │  TSC override      │  Community       │
│  (blocked by maintainer)  │  (2/3 supermajority)│  Referendum      │
├──────────────────────────────────────────────────────────────────┤
│  Proportional override:   │  Supermajority:    │  Absolute        │
│  • Can be overridden by   │  • 2/3 majority    │  majority of     │
│    the committee that     │    of the TSC or   │  eligible voters │
│    appointed the person   │    steering body    │  in a general    │
│  • Requires explicit      │  • Used for:       │  election        │
│    vote and rationale     │    • License changes│  • Foundation-   │
│                           │    • Governance     │    level changes │
│                           │      changes       │  • Rarely used   │
│                           │    • Major          │                   │
│                           │      architectural  │                   │
│                           │      decisions      │                   │
└──────────────────────────────────────────────────────────────────┘
```

**Documenting objections:**
Every formal objection should include:
1. The specific aspect of the proposal being objected to
2. The reason for the objection (technical, strategic, social)
3. What change would resolve the objection
4. Whether this is a blocking objection (cannot proceed) or a non-blocking concern

**Non-blocking vs. blocking objections:**
- **Non-blocking:** "I prefer alternative X but I won't block this proposal" (−1)
  → Recorded but does not stop the decision
- **Blocking:** "I strongly object and request this proposal not proceed" (−2 or −3)
  → Requires resolution before the decision can be finalized

### 4.4 Technical Steering Committee (TSC)

**TSC composition models:**

| Model | Example | Seats | Term | Election |
|-------|---------|-------|------|----------|
| Fixed seats, individual election | Kubernetes | 7 seats | 2 years | Contributors vote, no more than 2 from one company (company diversity rule) |
| Company-representative | OpenStack | 8 seats | 1 year | Platinum members seat + elected seats |
| PMC model (ASF) | Apache HTTP | N+1 | Life | Committers vote PMC members |
| Self-selecting core team | Vue.js | ~20 | Open | Core team invites |
| All contributors | Homebrew | All | Open | Anyone with commit access |

**Election process (Kubernetes model):**
1. **Voter eligibility:** Contributors with a certain number of contributions in the
   last 12 months (measured by DevStats or similar)
2. **Candidate eligibility:** Contributors who meet higher contribution thresholds
   and are nominated/seconded
3. **Campaign period:** Candidates submit platform statements
4. **Voting:** Condorcet or ranked-choice (STV) voting
5. **Outcome:** Top N candidates are elected
6. **Term limit:** Max 2 consecutive terms, then 1 term off

**TSC responsibilities:**
- Setting technical direction and architecture
- Approving new projects or major features
- Resolving cross-SIG disputes
- Appointing SIG chairs
- Defining release processes
- Managing the project roadmap
- Coordinating with the foundation (if applicable)

**TSC meeting rhythm:**
- Weekly or bi-weekly meetings
- Published agenda 48 hours before
- Minutes published within 24 hours after
- Recordings (if any) published within 48 hours
- Quarterly or annual "state of the project" to the community

### 4.5 SIG / Working Group Structure

**Special Interest Groups (SIGs):**
Persistent teams responsible for a domain.

**SIG lifecycle:**
```
Charter                                                      Retirement
   │                                                            │
   ▼                                                            ▼
┌──────┐    ┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────┐
│Form  │───→│Initial   │───→│Active        │───→│Steady    │───→│Retired / │
│Charter│    │Members   │    │(meeting,      │    │State     │    │Archived  │
│Approve│    │Recruit   │    │releasing,     │    │(maintenance)│ │          │
└──────┘    └──────────┘    │documenting)   │    └──────────┘    └──────────┘
                            └──────────────┘
```

**SIG responsibilities:**
- Triage and resolve issues in their domain
- Review and approve PRs
- Produce documentation
- Report to the TSC/Steering Committee
- Represent the domain in cross-SIG discussions
- Identify when the SIG's work is done or needs renewal

**Working Groups (WGs):**
Temporary teams formed for a specific initiative. Disbanded after completion.

| Aspect | SIG | WG |
|--------|-----|----|
| Duration | Ongoing | Temporary (aim for < 12 months) |
| Scope | Broad, domain-specific | Narrow, initiative-specific |
| Charter | Broad domain charter | Specific goal with deliverables |
| Decision-making | Domain authority | Recommends to TSC/SIGs |
| Lifecycle | Long-term | Start → work → disband |

**SIG/WG reporting:**
- Monthly update to TSC (written, 1 page)
- Quarterly review with TSC (presentation)
- Annual SIG health check (metrics-based)

### 4.6 Voting Systems

**Voting methods comparison:**

| Method | Description | Best For | Weakness |
|--------|-------------|----------|----------|
| **Simple majority** | >50% of votes | Routine decisions | 50% + 1 can make big changes |
| **Super-majority (2/3)** | 66.7% of votes | Important decisions (governance changes) | Can cause gridlock |
| **Super-majority (3/4)** | 75% of votes | Constitutional changes, license changes | Very high bar |
| **Plurality** | Most votes wins (may be <50%) | Elections with many candidates | Winner may lack majority support |
| **Ranked-choice (IRV)** | Preferential voting, instant runoff | Single-winner elections | Complex to count |
| **Condorcet** | Head-to-head comparison | Multi-candidate elections | Can produce cycles |
| **Approval voting** | Vote for all acceptable candidates | Committee elections | Loses preference intensity |
| **STV (Single Transferable Vote)** | Multi-winner ranked choice | Proportional representation | Complex calculation |
| **Quadratic voting** | Weight votes by "voice credits" | Budget allocation | Can favor wealthy voters |

**When to use each:**

| Decision Type | Recommended Method | Typical Threshold |
|---------------|-------------------|-------------------|
| Merge a PR | Lazy consensus (or maintainer approval) | 1-2 reviewers |
| New committer | PMC vote | 3+1, no -1 |
| New SIG | TSC vote | Simple majority |
| Release | PMC vote | 3+1, no -1 (Apache) |
| Governance change | Community-wide vote | 2/3 supermajority |
| License change | Community-wide vote | 3/4 supermajority |
| TSC election | Ranked-choice (STV) | N/A (election rules) |
| Budget allocation | Approval or quadratic voting | Simple majority |
| Expel a member | Committee vote | 3/4 supermajority |

**Voting transparency principles:**
1. Voter eligibility must be clear and published
2. Votes should be public (who voted, not just the count) for most decisions
3. Anonymous votes acceptable for: CoC violations, personnel decisions
4. Voting period must be well-communicated and of reasonable length
5. Results must be published with an explanation

---

## Part 5: Fork Governance

A fork occurs when a group of developers takes a copy of a project's source code
and develops it independently. Forks can be healthy or destructive.

### 5.1 Healthy vs. Destructive Forks

**Healthy forks — when forking is productive:**
| Situation | Example | Why it was healthy |
|-----------|---------|-------------------|
| Irreconcilable vision differences | LibreOffice (OpenOffice) | OpenOffice stagnated under Oracle; LibreOffice revitalized the ecosystem |
| License controversy | OpenTofu (Terraform) | The fork preserved the MPL 2.0 license after HashiCorp changed to BSL |
| Company acquisition threat | MariaDB (MySQL) | Oracle acquired MySQL; community forked to preserve independence |
| Abandoned upstream | Jenkins (Hudson) | Oracle owned Hudson trademark; community forked to continue development |
| Governance dissatisfaction | Nextcloud (ownCloud) | Developer community unhappy with ownCloud GmbH's direction |
| Performance/technical divergence | i3-gaps (sway) | Wayland required a new codebase; sway became the reference |
| Feature priorities diverge | Blender forks | Healthy ecosystem of specialized Blender builds |

**Destructive fork patterns:**
| Pattern | Description | Red flags |
|---------|-------------|-----------|
| **Vanity fork** | Forked by someone who wanted to be a BDFL | Single maintainer, minimal changes, no community |
| **Grudge fork** | Forked by a banned or disgruntled ex-maintainer | Personal attacks, no real technical differentiation |
| **Corporate land grab** | Forked by a company to avoid upstream license | Little community engagement, all development by one company |
| **Abandon-and-fork** | Maintainer abandons project without transition | Community scrambling to rebuild without context |
| **Micro-fork** | Forked because maintainer rejected one trivial PR | Fork maintained by 1 person, never merges upstream fixes |

**Decision tree — should you fork?**
```
Is there a fundamental, unresolvable disagreement?
      │
      ├── Yes: Can the disagreement be resolved through governance?
      │       │
      │       ├── Yes → Try governance first (RFC, vote, escalation)
      │       │
      │       └── No → Consider fork
      │
      └── No: Is the issue about code quality or specific changes?
              │
              ├── Yes → Submit PRs, improve documentation, be persistent
              │
              └── No → Reconsider if a fork is necessary

       Additional questions:
       ┌──────────────────────────────────────────────┐
       │ 1. Do you have at least 5-10 active          │
       │    contributors for the fork?                 │
       │ 2. Do you have funding or infrastructure?    │
       │ 3. Are you prepared for long-term maintenance?│
       │ 4. Will the fork serve a genuinely different  │
       │    user base?                                 │
       │ 5. Have you tried all other options?          │
       └──────────────────────────────────────────────┘
```

### 5.2 Famous Forks — Deep Dive

**LibreOffice (forked from OpenOffice, 2010):**
- **Reason:** Oracle acquired Sun Microsystems, absorbed OpenOffice, laid off most
  developers, and showed little interest in the project
- **Process:** The Document Foundation (TDF) was announced before the fork; most
  OpenOffice contributors joined immediately; Oracle was invited to join but declined
- **Outcome:** LibreOffice is now the dominant office suite fork. OpenOffice was
  donated to Apache (2011) but is almost inactive. LibreOffice has 100M+ users,
  a strong release cadence, and enterprise support through Collabora
- **Lessons:** A clear governance structure (TDF) and strong leadership (the
  community was well-organized) made the fork successful. Speed matters — the
  Document Foundation acted before upstream fully died

**MariaDB (forked from MySQL, 2009):**
- **Reason:** Oracle acquired Sun Microsystems (which owned MySQL). Founder
  Monty Widenius was concerned about Oracle's stewardship; the community feared
  MySQL would become closed-source
- **Process:** MariaDB was created by MySQL's original founder. It remained
  compatible with MySQL APIs and data formats
- **Outcome:** MariaDB and MySQL have diverged significantly. MariaDB has its
  own storage engine (Aria), clustering solution (Galera, bundled), and unique
  features. Both projects survive. MariaDB Corporation went public (2021-2023)
  then private again
- **Lessons:** Founder-led forks have strong credibility. API compatibility is
  critical for user migration. A fork can and does coexist with the original

**Jenkins (forked from Hudson, 2011):**
- **Reason:** Oracle owned the Hudson trademark. After a dispute, the community
  voted to rename to Jenkins; Oracle kept Hudson
- **Process:** The Jenkins vote was 212-0 to rename. Oracle accepted the fork
  after initially resisting
- **Outcome:** Jenkins is the dominant CI/CD tool. Hudson is effectively dead
  (last release 2016). Jenkins has a thriving plugin ecosystem (1800+ plugins)
- **Lessons:** Trademark ownership matters — forking can be a trademark issue,
  not just a code issue. Community unity (212-0) made the fork clean and decisive

**Nextcloud (forked from ownCloud, 2016):**
- **Reason:** Tensions between ownCloud GmbH (the company) and the community about
  roadmap and governance. OwnCloud founder Frank Karlitschek left and started
  Nextcloud
- **Process:** Most ownCloud contributors migrated to Nextcloud immediately
- **Outcome:** Nextcloud is now the dominant self-hosted file sync/sharing platform.
  ownCloud exists as ownCloud Infinite Scale (rewritten in Go) but has a smaller
  community
- **Lessons:** Founder-led fork again. Company governance problems that aren't
  addressed lead to talent drain

**OpenTofu (forked from Terraform, 2023):**
- **Reason:** HashiCorp changed Terraform's license from MPL 2.0 to BSL (Business
  Source License)
- **Process:** The fork was announced within 72 hours of the license change.
  OpenTofu was incubated under the Linux Foundation. AWS, Google, Oracle, and
  other vendors contributed resources
- **Outcome:** OpenTofu is now a CNCF sandbox project, has feature parity, and
  is gaining adoption. HashiCorp is now part of IBM
- **Lessons:** License forks can happen fast when the community is large and
  organized. Foundation backing (Linux Foundation) gives the fork a neutral home.
  Cloud vendor support ensures resources. The speed of response (72 hours) shows
  the community was watching and ready

**Other notable forks:**

| Fork | Original | Year | Reason | Current Status |
|------|----------|------|--------|----------------|
| Blender (originally commercial) | NaN (company) | 2002 | Company bankruptcy | Thriving — $5M+ annual budget |
| XOrg | XFree86 | 2004 | License change (XFree86→GPL) | XOrg is the standard X server |
| Joomla | Mambo | 2005 | Governance concerns | Surviving, less dominant |
| Dolphin (emulator) | Dolphin (original closed) | 2008 | Licensing | Thriving GameCube/Wii emulator |
| Odoo | TinyERP | 2005 | Founder dispute | Thriving OSS ERP |
| Godot (from Liti) | Liti Engine | 2014 | Founder open-sourced | Thriving game engine |
| Vim → Neovim | Vim | 2014 | Modernization | Neovim is community standard |
| Docker → Podman | Docker | 2017 | Daemonless rootless | Podman widely adopted |
| Vagrant → DevPod | Vagrant | 2022 | HashiCorp changes | New alternative |
| Terraform → OpenTofu | Terraform | 2023 | BSL license change | Accelerating |

### 5.3 Fork Outcomes

**Outcome 1 — Fork becomes dominant, original dies:**
- Jenkins/Hudson: Jenkins won decisively
- LibreOffice/OpenOffice: LibreOffice is dominant
- XOrg/XFree86: XOrg is universal
- Blender: Open-source Blender replaced the proprietary original
- **Pattern:** Original is neglected or commercially abandoned; fork has stronger
  community and governance

**Outcome 2 — Fork merges back:**
- Node.js + io.js: io.js forked from Node.js (2014) over governance disagreements;
  the fork led to the Node.js Foundation, io.js merged back after ~9 months;
  critical catalysts: io.js moved to faster releases, added LTS, improved governance.
  Both projects were stronger for the split.
- Docker (Moby): Docker's 2017 reorganization into Moby (open components) and
  Docker EE (commercial) was effectively a "re-merging" of container infrastructure.
- **Pattern:** The fork serves as a pressure valve; the original adopts the fork's
  improvements; reunification happens through a foundation or governance reform

**Outcome 3 — Permanent divergence with both surviving:**
- MySQL vs. MariaDB: Both coexist, MariaDB has ~20% market share
- Vim vs. Neovim: Both active, Neovim gaining, Vim in maintenance
- OwnCloud vs. Nextcloud: Both active, Nextcloud dominant
- **Pattern:** The projects serve different user bases or philosophies; both find
  enough funding/contributors to sustain independent development

**Outcome 4 — Project death:**
- Hudson: Effectively dead (last release 2016)
- XFree86: Dead (last release 2008)
- OpenSolaris/Illumos: All-but-dead, no significant adoption
- Mambo: Dead (last release 2008)
- **Pattern:** The original project was already in decline; the fork accelerated
  the original's death; community resources were limited; nobody maintained the
  original

### 5.4 Fork Diplomacy

**How foundations mediate fork situations:**

1. **Initial response:** Foundation contacts both sides to understand the dispute
2. **Neutral space:** Foundation offers to host discussions under Chatham House Rule
3. **Mediation:** Foundation appoints an experienced mediator (or team)
4. **Trademark resolution:** Foundation determines who owns the trademark and how
   to resolve trademark disputes
5. **Reunification attempt:** Foundation proposes a governance structure where both
   parties can collaborate
6. **Graceful separation:** If reunification fails, foundation ensures clean
   trademark and brand splitting

**Successful reunification examples:**

**Node.js + io.js (2015):**
The Node.js/io.js fork is the most successful reunification in open source history.
- **Problem:** Joyent's governance of Node.js was opaque; the community forked as io.js
- **io.js innovations:** Rapid releases (every 2 weeks), LTS schedule, open governance
- **Mediation:** The Linux Foundation facilitated the creation of the Node.js Foundation
- **Resolution:** Node.js adopted io.js's governance model and release process
- **Result:** The merged project is stronger than either fork was alone
- **Time to merge:** ~9 months

**Lessons from successful reunification:**
1. Both sides must want to reunite — the fork must be seen as a negotiation tactic,
   not an exit
2. A neutral foundation provides the legal and governance framework
3. The fork's innovations should be adopted by the original (not just "come back
   and everything is the same")
4. Governance reform is usually the deeper issue — fixing governance resolves the
   conflict better than any technical compromise

### 5.5 Building Fork Resilience

Governance structures that reduce fork risk (or make forks less damaging):

**Anti-fork governance characteristics:**

| Characteristic | Description | How it reduces fork risk |
|---------------|-------------|-------------------------|
| **Distributed ownership** | No single person or company owns everything | Forkers have no single target to rebel against |
| **Clear decision-making** | Everyone understands how decisions are made | Frustrated contributors see the path to change, not the need to fork |
| **Elected leadership** | Leaders can be voted out | Dissatisfied contributors can work for change rather than leave |
| **Multi-stakeholder funding** | Multiple companies/entities fund the project | No "single point of funding failure" |
| **Transparent roadmap** | Roadmap is public and community-influenced | Contributors see their input mattering |
| **Open governance meetings** | Anyone can attend and observe | No secret decisions to rebel against |
| **No unilateral license changes** | License can only change with supermajority vote | License-triggered forks (like OpenTofu) become impossible |
| **Contributor diversity** | Active contributors from multiple organizations | No single organization can stop development |
| **Inclusive culture** | Everyone feels welcome to participate | Contributors solve problems internally rather than leaving |

**Concrete governance provisions:** For projects that want to explicitly prevent
license-change-triggered forks (the most common modern fork cause):

```markdown
## License Change Policy

1. The project's license can only be changed by a supermajority (3/4) vote of
   the Technical Steering Committee, followed by a supermajority (3/4) vote of
   the active contributors (defined as contributors with 5+ merged PRs in the
   preceding 12 months).
2. Proposed license changes must remain open for a minimum 60-day comment period.
3. License changes must be to an OSI-approved open source license. Changes to
   source-available or proprietary licenses are not permitted.
4. All code contributed prior to a license change retains its original license.
   Only future contributions can be under the new license.
5. A license change cannot revoke or modify rights granted under the previous
   license for existing releases.
```

**The "no unilateral control" principle:**
Every significant governance power (license, trademark, release, roadmap) should
require multiple stakeholders to act. No single person or company should be able
to unilaterally change fundamental project characteristics.

---

## Part 6: Ecosystem Metrics & Health Indicators

Measuring community health enables proactive intervention and demonstrates the
project's value to stakeholders.

### 6.1 CHAOSS Metrics — Detailed Breakdown

**Diversity & Inclusion:**

| Metric | Definition | How to Measure | Target |
|--------|------------|---------------|--------|
| Organizational diversity | Number of distinct organizations contributing | Use employer mapping on git commit email domains | 5+ organizations in top 90% of contributions |
| Contributor location diversity | Geographic spread of contributors | IP geolocation or timezone analysis | Contributors from 3+ continents |
| Gender diversity | Gender balance of contributors | Survey (self-reported), also estimate via name databases | 25%+ women/non-binary |
| Experience diversity | Mix of new and experienced contributors | First commit date vs. recent activity | At least 20% of contributions from contributors with < 12 months tenure |
| Language diversity | Primary spoken languages | Survey | English + at least 2 other languages in active discussions |
| Documentation diversity | Do docs support multiple languages? | Check translations | At least core docs in 2+ languages |

**Evolution:**

| Metric | Definition | How to Measure | Target |
|--------|------------|---------------|--------|
| Commit frequency | Average commits per day | git log | At least 1 commit/day for active projects |
| Release frequency | Days between releases | CHANGELOG or tags | Monthly patches, quarterly features |
| Code change volume | Lines added/deleted per period | git diff --stat | Steady or growing |
| Issue resolution time | Median days from open to close | GitHub/GitLab issue API | < 30 days for bugs, < 90 days for features |
| PR merge time | Median days from open to merge | GitHub/GitLab PR API | < 7 days for bugfixes, < 30 days for features |
| Open issue age | Median age of open issues | Issue API | < 60 days (young backlog is healthy) |

**Risk:**

| Metric | Definition | How to Measure | Target |
|--------|------------|---------------|--------|
| Bus factor | Minimum people who must be incapacitated to stop the project | Domain analysis (who owns each area?) | 3+ for each critical subsystem |
| Dependency depth | Dependencies with transitive deps | Dependency analysis tool | < 10 levels deep |
| Old dependencies | Dependencies not updated in 2+ years | Version check | 0 outdated critical deps |
| License clarity | % of deps with clear license | FOSSA/Snyk scan | 100% |
| Maintainer load | Average open issues per maintainer | Issues / active maintainers | < 50 per maintainer |
| Knowledge concentration | % of lines written by top contributor | Git blame analysis | < 30% for any individual |

**Value:**

| Metric | Definition | How to Measure | Target |
|--------|------------|---------------|--------|
| Adoption rate | Downloads per period | Package registry | Growing |
| Dependent count | Projects depending on this project | GitHub dependency graph, npm/github API | Growing |
| Market share | % of category usage | Surveys, analyst reports | Stable or growing |
| Ecosystem mentions | Conference talks, blog posts, papers | Web search, social listening | Growing |
| User satisfaction | NPS or satisfaction score | Survey | NPS > 20 |

**Experience:**

| Metric | Definition | How to Measure | Target |
|--------|------------|---------------|--------|
| Time to first response | Hours from issue/PR creation to first human response | GitHub/GitLab API median | < 24 hours |
| First PR success | % of first PRs merged | Contributor identity tracking | > 60% |
| Contributor retention | % of contributors who return after first contribution | Cohort analysis | > 25% at 6 months |
| Review depth | Hours between PR submission and meaningful review | Review comments per PR | At least 1 substantive review per PR |
| New contributor onboarding | Time from first issue comment to first merged PR | Event tracking | < 30 days |
| Contributor churn | % of contributors who stop contributing | 6-month inactivity threshold | < 50% annual churn for active contributors |

**CHAOSS GrimoireLab implementation:**
GrimoireLab is the reference implementation of CHAOSS metrics (formerly from
Bitergia, now a CHAOSS project). It provides dashboards for most of these metrics
from git, GitHub/GitLab, mailing lists, IRC/Slack logs, and other data sources.

### 6.2 Bus Factor Calculation

The bus factor is the minimum number of project members who, if incapacitated
(e.g., hit by a bus), would cause the project to fail.

**Calculation method — "Key person dependency analysis":**

```
Step 1: Identify all significant subsystems/modules
Step 2: For each subsystem, identify who maintains it
Step 3: For each subsystem, categorize:
   - GREEN: 3+ people can maintain
   - YELLOW: 2 people can maintain
   - RED: 1 person is the sole maintainer
   - BLACK: 0 people (no one currently maintains it)
Step 4: Bus factor = size of smallest group that, if removed, turns all
        categories to BLACK or RED
```

**Heuristic (fast) bus factor:**
```
Bus Factor ≈ 1 + (number of people who have made > 20% of commits) / 2
```

For a more precise calculation:

```python
# Pseudocode for computing bus factor
def bus_factor(contributions: dict[str, int], threshold: float = 0.8) -> int:
    """
    Compute the minimum number of top contributors whose removal
    would reduce total contributions below threshold (default 80%).
    """
    sorted_contributors = sorted(contributions.values(), reverse=True)
    total = sum(sorted_contributors)
    cumulative = 0
    for i, contrib in enumerate(sorted_contributors):
        cumulative += contrib
        if cumulative / total >= threshold:
            return i + 1  # bus factor
    return len(sorted_contributors)
```

**Improving bus factor:**
1. **Document critical knowledge** — architecture decisions, deployment procedures,
   database schemas, API design rationale
2. **Rotate responsibilities** — every maintained area should have at least 2 people
3. **Pair programming** — for complex or critical code
4. **Code review requirements** — no critical path code merged without review
5. **Onboarding program** — recruit and train people for underserved areas
6. **Scheduled handoffs** — "I'm stepping back from module X in 3 months; who wants it?"
7. **Reduce code complexity** — simpler code requires less specialized knowledge

### 6.3 Contributor Retention

**Cohort analysis framework:**

```
Cohort: Contributors who made their first contribution in Month N
        ├── Month N: Cohort base size (# first-time contributors)
        ├── Month N+1: Active rate (% who made another contribution)
        ├── Month N+3: Active rate
        ├── Month N+6: Active rate
        └── Month N+12: Active rate

Retention curve shape:
  Healthy:  Gradual decline      │  /
                                │ //
          Unhealthy: Sharp drop │//
                               ┌─────────
                                 Week 1 Week 4 Month 3 Month 6  Month 12
```

**Benchmark retention rates (OSS projects):**

| Project Type | First month retention | 6-month retention | 12-month retention |
|-------------|----------------------|-------------------|--------------------|
| Large infrastructure (K8s, Linux) | 10-15% | 3-5% | 1-3% |
| Popular framework (React, Vue) | 5-10% | 1-3% | <1% |
| Niche library | 15-25% | 5-10% | 2-5% |
| Well-mentored project | 25-40% | 15-25% | 8-15% |
| Corporate-backed project | 20-30% | 10-20% | 5-15% |

**First-contributor experience metrics:**
```
Critical transition points where contributors are lost:

1. First issue:   ──→ Response time (goal: < 24h)
2. First PR:      ──→ Review time (goal: < 7d, ideally < 48h)
3. PR feedback:   ──→ Quality of feedback (kind, specific, actionable)
4. PR merge:      ──→ Merge ratio (goal: > 60% first PRs merged)
5. Follow-up:     ──→ Assignment of "good second issue"
6. Regular:       ──→ Invitation to triage, review, or maintain
```

**Retention improvement strategies:**

| Strategy | Impact | Effort | Implementation |
|----------|--------|--------|---------------|
| First issue response < 24h | High | Low | Bot + maintainer rotation |
| "Good first issue" labeling | High | Low | Project board curation |
| Contributor mentoring program | Very High | High | Weekly mentoring sessions |
| Code review kindness guidelines | Medium | Low | CONTRIBUTING.md |
| Automated CI on first PR | Medium | Medium | PR template, CI configuration |
| Thank-you note on first merge | Medium | Very Low | Bot or maintainer habit |
| Contributor badges/dashboard | Low | Medium | Contribution tracking |
| Contributor summit/invite | Very High | High | Annual event |
| Office hours / community calls | Medium | Medium | Weekly scheduled calls |

### 6.4 Project Maturity Levels

**CNCF project maturity model:**

| Dimension | Sandbox | Incubating | Graduated |
|-----------|---------|------------|-----------|
| **Adoption** | At least 1 adopter | At least 3 adopters | At least 10 adopters |
| **Contributors** | Minimal | 10+ from 2+ orgs | 30+ from 3+ orgs |
| **Commits** | Active development | Commits from 3+ orgs | 6+ months of defined process |
| **Governance** | Basic | Documented committer process | Documented TSC + SIG structure |
| **Release** | | Regular releases with CI/CD | Formal release process, security policy |
| **Trademark** | Belongs to CNCF | Belongs to CNCF | Belongs to CNCF |
| **SLAs** | CNCF best effort | CNCF best effort | CNCF support commitments |
| **CII Badge** | | Passing (≥50%) | Silver (≥70%) |
| **Time** | Min 3 months | Min 6 months | Min 12 months since incubating |

**Apache podling → TLP path:**
```
Podling (incubator) ──→ Graduate ──→ Top-Level Project (TLP)
                            │
                            │ Requirements:
                            │ • Release: at least 2 successful releases
                            │ • Community: 3+ PMC members from 3+ orgs
                            │ • Voting: IPMC vote (3+ binding +1s)
                            │ • IP clearance: all dependencies approved
                            │ • Board resolution: board votes to accept
                            │
                            │ Timeline: typically 6-24 months
                            │
                            └──→ Podling retirement if:
                                • Inactivity for 6+ months
                                • Unable to form viable community
                                • Failed to complete incubation requirements
```

**CII (Core Infrastructure Initiative) Best Practices Badge:**

| Level | Requirements | Description |
|-------|-------------|-------------|
| **Passing** | Basic best practices | Version control, basic documentation, issue tracker, HTTPS, license presence, contribution guidelines |
| **Silver** | More rigorous | Change log, release notes, secure development knowledge, automated test suite, dynamic/static analysis, code review |
| **Gold** | Comprehensive | Formal verification, reproducible builds, fuzz testing, security review, continuous integration, hardening |

**Estimated effort to achieve each level:**
- **Passing:** 1-2 weeks for a well-organized project
- **Silver:** 1-3 months (requires significant process infrastructure)
- **Gold:** 6-12 months (requires dedicated security engineering)

### 6.5 Measuring Review Health

**Review health metrics:**

| Metric | Definition | Healthy | Concerning | Critical |
|--------|------------|---------|------------|----------|
| Median review time | Time from creation to first review | < 24h | 24-72h | > 72h |
| Median merge time | Time from creation to merge | < 7 days | 7-30 days | > 30 days |
| Review depth | Comments per PR | 3-10 | 1-2 or 11-20 | 0 or > 20 |
| Reviewer diversity | Unique reviewers per month | 5+ per module | 2-4 | 1 |
| PR abandonment rate | % of PRs closed without merge | < 20% | 20-40% | > 40% |
| Re-review rate | % of PRs requiring re-review after changes | < 30% | 30-50% | > 50% |
| Stale PR ratio | PRs open > 30 days | < 10% | 10-25% | > 25% |
| Stale issue ratio | Issues open > 90 days | < 30% | 30-60% | > 60% |

**Bottleneck identification:**

```
Contributor workload analysis:
Reviewers: [Alice: 45 PRs reviewed, Bob: 3 PRs reviewed, Carlos: 28 PRs reviewed]
    ↳ Alice is a bottleneck — unassign or add reviewers

Domain analysis:
Module X:  40% of all open PRs, 1 reviewer
Module Y:   5% of all open PRs, 5 reviewers
    ↳ Module X needs more reviewer attention or process improvement

Time analysis:
Months 1-6:  median review time 8 hours
Months 7-12: median review time 5 days
    ↳ Something changed around month 7 — investigate maintainer availability
```

**Improving review health:**
1. **Document review expectations** — "All PRs will receive an initial response
   within 48 hours"
2. **Automate what can be automated** — CI, linting, formatting, DCO checks
3. **Review rotas** — assign reviewer duty on a rotating schedule
4. **Publish review metrics** — transparency creates accountability
5. **Lower barriers to becoming a reviewer** — <100 line changes don't need a
   senior maintainer review
6. **"Review buddy" system** — pair new reviewers with experienced ones
7. **Timeboxed reviews** — "I will review all PRs from 10-11 AM every Tuesday"

### 6.6 Time-to-First-Response Benchmarks

Time to first response (TTFR) is the single most predictive metric of contributor
retention. A fast response dramatically increases the likelihood that a contributor
continues.

**Industry benchmarks:**

| Project Size | Excellent | Good | Average | Poor |
|-------------|-----------|------|---------|------|
| Small (< 5 maintainers) | < 4 hours | < 12 hours | < 48 hours | > 48 hours |
| Medium (5-20 maintainers) | < 2 hours | < 8 hours | < 24 hours | > 48 hours |
| Large (20-100 maintainers) | < 1 hour | < 4 hours | < 12 hours | > 24 hours |
| Very Large (100+ maintainers) | < 30 min | < 2 hours | < 8 hours | > 24 hours |

**TTFR in practice (real-world projects):**

| Project | Median TTFR (2024 data) | Classification |
|---------|------------------------|----------------|
| Kubernetes | 4 hours | Good |
| VS Code | 2 hours | Good |
| Rust compiler | 3 hours | Good |
| Homebrew | 30 minutes | Excellent |
| Django | 6 hours | Good |
| React | 12 hours | Average |
| Linux kernel | 2-4 days (patchwork) | Poor (but accepted norm) |
| Python (CPython) | 8 hours | Good |

**Factors that increase TTFR:**
- High volume of issues/PRs
- Too few maintainers reviewing
- Maintainers in a single timezone (no 24-hour coverage)
- No triage team handling issue categorization
- Contributors not directed to appropriate channels
- Lack of issue templates causing incomplete reports

**Factors that decrease TTFR:**
- Dedicated triage team on rotating basis
- Issue templates with required fields
- Automated first response (linking to contributing guidelines)
- Global maintainer presence (multiple timezones)
- Bots that categorize and tag issues automatically
- Contributor response SLAs published and tracked
- Regular maintainer office hours

---

## Part 7: Governance Templates

Ready-to-use templates for essential governance documents. Adapt to your project's
size, stage, and culture.

### 7.1 GOVERNANCE.md Template

```markdown
# ProjectName Governance

This document describes the governance model for the ProjectName open source
project. It is licensed under CC0 1.0 Universal.

## Overview

ProjectName is governed by [BDFL / Meritocracy / TSC / Foundation / Community].

## Core Team / Technical Steering Committee

The Core Team oversees the technical direction of the project. Core Team members
are listed in [MAINTAINERS.md](./MAINTAINERS.md).

### Core Team Responsibilities

- Setting the project roadmap and vision
- Reviewing and merging significant code changes
- Managing releases
- Resolving technical disputes
- Appointing SIG chairs
- Maintaining the project's code of conduct
- Managing the project's trademark and brand

### Core Team Composition

The Core Team consists of up to [N] members. Membership is based on sustained
contribution to the project over a period of [time period].

### Adding Core Team Members

1. A current Core Team member nominates a candidate
2. Discussion period of [time period] on the internal mailing list
3. Vote: [simple majority / supermajority] of Core Team members
4. Candidate is informed and accepts/declines
5. Announcement is made to the project community

### Removing Core Team Members

Core Team members may step down at any time. A member may be removed by:
- Extended inactivity (no contributions for [time period])
- Violation of the Code of Conduct
- Unanimous vote of remaining Core Team members (excluding the member in question)

## Decision-Making

### Lazy Consensus

Project decisions default to lazy consensus:
- A proposal is posted to the appropriate channel
- A [time period] waiting period is observed
- If no objections are raised, the proposal is accepted
- If objections are raised, they must be resolved before proceeding

### Voting

When lazy consensus fails:
- A formal vote is called
- Voting period: [time period]
- Threshold: [simple majority / supermajority]
- Each Core Team member gets one binding vote
- Lazy consensus contributors may express non-binding preferences

### Tie-Breaking

In the event of a tie:
- [The project lead / The TSC chair / External mediator] casts the deciding vote
- OR: The decision is deferred for [time period] and re-visited
- OR: The proposal is modified and re-submitted

## Release Process

[Describe release process, including: version numbering, release cadence,
release manager role, release checklist, testing requirements, release notes,
distribution.]

## Sub-Projects / SIGs

The project may form Special Interest Groups (SIGs) or Working Groups (WGs).

### Creating a SIG/WG

1. A charter is drafted describing scope and goals
2. The charter is submitted to the Core Team for review
3. Core Team votes to approve
4. The SIG/WG is announced to the community
5. An initial chair is appointed by the Core Team

### SIG/WG Responsibilities

- Triage and resolve issues in their domain
- Review and merge PRs within their scope
- Regular reports to the Core Team
- Communication with other SIGs/WGs

### Dissolving a SIG/WG

A SIG/WG may be dissolved by:
- Completion of its charter goals
- Inactivity for [time period]
- Core Team vote to dissolve

## License

ProjectName is licensed under [LICENSE].
Contributions are accepted under the same license.

---

*This governance document is adapted from the [Source Project] governance model.*
```

### 7.2 CONTRIBUTING.md Template

```markdown
# Contributing to ProjectName

Thank you for your interest in contributing! We welcome contributions of all kinds:
code, documentation, design, testing, and community management.

## Code of Conduct

This project follows a Code of Conduct. By participating, you agree to uphold it.
Reports can be sent to [conduct@project.org].

## Getting Started

1. Read the [README](./README.md) to understand the project
2. Read the [GOVERNANCE.md](./GOVERNANCE.md) to understand how decisions are made
3. Check the issue tracker for [good first issues](link)
4. Join our communication channels: [Slack/Discord/IRC]

## How to Contribute

### Reporting Bugs

1. Search the issue tracker to see if the bug has already been reported
2. Use the bug report template (available when creating a new issue)
3. Include: version, environment, steps to reproduce, expected vs. actual behavior
4. Attach logs, screenshots, or minimal reproduction code when possible

### Suggesting Features

1. Start a discussion in [Discussions / forum / mailing list]
2. Describe the problem you're trying to solve, not just your proposed solution
3. Use the feature request template
4. Be prepared to help implement or test the feature

### Code Contributions

#### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes with clear, descriptive messages
4. Ensure tests pass locally: `make test`
5. Push to your fork: `git push origin feature/my-feature`
6. Open a Pull Request against the `main` branch
7. Fill out the PR template completely
8. Respond to reviewer feedback

#### Code Review Criteria

All PRs must meet these criteria to be merged:
- [ ] Tests are added/updated and all tests pass
- [ ] Documentation is updated (README, inline comments, API docs)
- [ ] Code follows project style guidelines
- [ ] No regressions in existing functionality
- [ ] The [DCO / CLA] check passes

#### Commit Message Style

```
<type>(<scope>): <short summary>

[optional body with additional context]

[optional footer with breaking changes, issue references]
```

Types: feat, fix, docs, style, refactor, test, chore, ci, perf
Scopes: (if applicable — e.g., core, cli, api)

## Development Setup

[Instructions for setting up the development environment.]

## Testing

[Testing instructions — how to run test suite, test structure, coverage requirements.]

## Communication

- Issue tracker: [link]
- Discussion/Forum: [link]
- Chat: [link]
- Mailing list: [link]
- Community calls: [schedule]

## Recognition

All contributors are recognized in [CONTRIBUTORS.md / release notes / website].
We value every contribution, large or small.

---

*This contributing guide is adapted from best practices across the open source community.*
```

### 7.3 CODE_OF_CONDUCT.md Template

```markdown
# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes
- Focusing on what is best not just for us as individuals but for the overall
  community

Examples of unacceptable behavior:

- The use of sexualized language or imagery, and sexual attention or advances
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting
- Sustained disruption of community discussions
- Violence, threats of violence, or encouragement of violence

## Enforcement Responsibilities

The [CoC Committee / Core Team / PMC] is responsible for clarifying and enforcing
our standards of acceptable behavior and will take appropriate and fair corrective
action in response to any behavior they deem inappropriate, threatening, offensive,
or harmful.

The [CoC Committee / Core Team / PMC] has the right and responsibility to remove,
edit, or reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, and will communicate reasons for
moderation decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces. Examples
include using an official email address, posting via an official social media
account, or acting as an appointed representative at an online or offline event.

## Reporting

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the CoC Committee at [conduct@project.org]. All complaints will be
reviewed and investigated promptly and fairly.

The CoC Committee is obligated to respect the privacy and security of the reporter
of any incident. Reports will be handled confidentially. Anonymous reporting is
available at [link to anonymous form].

### Reporting Guidelines

When reporting, please include:
- Your contact information (unless anonymous)
- Names (real or usernames) of all individuals involved
- Description of the incident (date, time, location, what happened)
- Any supporting evidence (screenshots, logs, links)
- Whether you have attempted to resolve the issue directly
- Any other context that may be relevant

## Enforcement Guidelines

### 1. Correction

**Community Impact:** Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence:** A private, written warning from the CoC Committee, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact:** A violation through a single incident or series of actions.

**Consequence:** A warning with consequences for continued behavior. No
interaction with the people involved for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or permanent ban.

### 3. Temporary Ban

**Community Impact:** A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence:** A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved is permitted during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact:** Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior, harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence:** A permanent ban from any sort of public interaction within
the community.

## Enforcement Process

1. **Report received** → acknowledgment within 24 hours
2. **Initial assessment** → within 48 hours (scope, severity, emergency level)
3. **Investigation** → 1-2 weeks (interview reporter, accused, witnesses)
4. **Decision** → within 1 week of investigation completion
5. **Notification** → reporter and accused informed simultaneously
6. **Appeal** → [appeals process, if applicable]
7. **Follow-up** → check-in with affected parties after 30 days

## CoC Committee

The current CoC Committee members are:
- [Name] — [email]
- [Name] — [email]
- [Name] — [email]

Committee members serve [term length] terms. New members are [appointed/elected]
by [governing body].

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org),
version 2.1, available at https://www.contributor-covenant.org/version/2/1/code_of_conduct.html.

Community Impact Guidelines were inspired by Mozilla's code of conduct enforcement ladder.
```

### 7.4 SECURITY.md Template

```markdown
# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| x.y.z (latest) | ✅ |
| x.y.z-1 | ✅ (backports for critical CVEs) |
| x.y.z-2 | ❌ |
| Older | ❌ |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please
**do not** file a public issue. Instead, report it privately:

**Email:** security@project.org
**PGP Key:** [link to PGP key]
**Alternative:** [link to private disclosure form]

### Reporting Process

1. Reporter sends details to security@project.org
2. Security team acknowledges receipt within [48 hours]
3. Security team triages the issue (confirmed vs. unconfirmed)
4. Security team develops a fix and coordinates release
5. Fix is deployed, CVE is assigned
6. Public disclosure is made after the fix is released

### Disclosure Timeline

Our goal is to release a fix within [90 days] of receiving a vulnerability report.
We follow coordinated disclosure principles:

- Reporter and security team agree on a disclosure date
- Advance notice is given to major downstream consumers
- Public disclosure happens simultaneously with the release

## Security Response Team

The security response team:
- [Name] — [email]
- [Name] — [email]

## Security Measures

- [List security measures: 2FA requirements, signed commits, reproducible builds,
   dependency scanning, SAST/DAST tools, fuzzing, etc.]

## Security-Related Configuration

[Document any configuration options that affect security posture]
```

### 7.5 SUPPORT.md Template

```markdown
# Support

## Community Support

- **Documentation:** [link to docs]
- **FAQ:** [link to FAQ]
- **Issue Tracker:** [link to issues]
- **Discussion Forum:** [link to discussions]
- **Chat:** [link to chat channel]
- **Stack Overflow tag:** [tag-name]

## Getting Help

### I have a question

1. Check the documentation and FAQ first
2. Search the issue tracker to see if it's been asked before
3. Ask in the chat or discussion forum
4. For complex questions, open a discussion

### I found a bug

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for bug reporting guidelines.

### I need something urgently

For urgent security issues, see [SECURITY.md](./SECURITY.md).
For all other urgent issues, please understand that this is a community-driven
project and response times may vary.

## Commercial Support

[If applicable: List commercial support options, consulting companies, or
enterprise support tiers.]

## Service Level Expectations

- **Community support:** Best-effort, no guarantees
- **Security issues:** See [SECURITY.md](./SECURITY.md) for disclosure timeline
- **Bug fixes:** No guaranteed timeline for community-driven fixes
- **Feature requests:** Reviewed and prioritized on a best-effort basis

## Maintaining a Healthy Community

We rely on our community to help each other. If you have expertise, please
consider answering questions in the discussion forum or reviewing pull requests.
Every contribution helps!
```

### 7.6 Decision-Making Flowchart

```
                               ┌─────────────┐
                               │  Proposal   │
                               │  Submitted  │
                               └──────┬──────┘
                                      │
                                      ▼
                            ┌───────────────────┐
                            │  Does this affect  │
                            │  external API     │  No ──────┐
                            │  or behavior?     │           │
                            └────────┬──────────┘           │
                                     │ Yes                  │
                                     ▼                      ▼
                            ┌───────────────────┐   ┌──────────────┐
                            │  RFC Process     │   │ Normal PR    │
                            │  Required        │   │ Process      │
                            └────────┬──────────┘   └──────┬───────┘
                                     │                     │
                                     ▼                     ▼
                            ┌───────────────────┐   ┌──────────────┐
                            │  Community       │   │ Code Review  │
                            │  Comment Period  │   │ (2+ reviews) │
                            │  (2 weeks)       │   └──────┬───────┘
                            └────────┬──────────┘          │
                                     │                     │
                                     ▼                     ▼
                            ┌───────────────────┐   ┌──────────────┐
                            │  Objections?      │   │ Approved?    │
                            └──────┬────────────┘   └──┬───────────┘
                                   │                   │
                           ┌───────┴───────┐     ┌─────┴─────┐
                           ▼               ▼     ▼           ▼
                    ┌────────────┐   ┌────────────┐  Merge    Revise
                    │ Resolve    │   │ No obj.    │  PR       PR
                    │ Objections │   │ → ACCEPT   │
                    └──────┬─────┘   └────────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
             ┌────────────┐  ┌────────────┐
             │ Can obj.   │  │ Cannot     │
             │ be         │  │ resolve    │
             │ resolved?  │  │ ─────────► │
             └──────┬─────┘  │ Formal Vote│
                    │        └────────────┘
               ┌────┴────┐
               ▼         ▼
          ┌────────┐ ┌────────┐
          │ Revise │ │ Formal │
          │ RFC    │ │ Vote   │
          └────────┘ └────────┘
                         │
                    ┌────┴────┐
                    ▼         ▼
               ┌────────┐ ┌────────┐
               │ Passes │ │ Fails  │
               │ ──► ACCEPT │ ──► REJECT │
               └────────┘ └────────┘
```

### 7.7 RFC Process Template

```markdown
# RFC Process for ProjectName

## Purpose

The RFC (Request for Comments) process is the primary mechanism for proposing
significant changes to ProjectName. It ensures that all substantial changes
are documented, reviewed, and decided upon transparently.

## When an RFC is Required

- Adding, removing, or modifying a public API
- Changing the project's architecture in a significant way
- Changing the build, release, or testing process
- Adding or removing a dependency
- Changing governance or contribution processes
- Any change that affects backward compatibility

## When an RFC is NOT Required

- Bug fixes
- Documentation improvements
- Refactoring without API changes
- Adding tests
- Performance improvements with no user-facing impact
- Minor dependency version updates

## RFC Lifecycle

### 1. Pre-RFC Discussion

Before writing an RFC, discuss your idea on:
- [Discussion forum / Mailing list / Slack #rfcs channel]
- Goal: gather feedback, identify existing work, refine the scope
- Duration: at least [3 days] of discussion

### 2. RFC Submission

1. Fork the [rfcs repository](link)
2. Copy `TEMPLATE.md` to `rfcs/0000-my-proposal.md`
3. Fill out the template completely
4. Submit a pull request
5. The RFC will receive a number once merged

### 3. Review Period

- At least [2 weeks] of community review
- An RFC Shepherd is assigned to guide the process
- The shepherd ensures the RFC addresses community feedback
- Major revisions trigger an additional [1 week] review period

### 4. Final Comment Period (FCP)

- Announced with a specific end date
- Last [10 days] for final objections
- Only blocking objections (−2) are considered at this stage

### 5. Decision

The [TSC / Core Team / appropriate body] decides:
- **Accepted:** RFC is merged and implementation can begin
- **Postponed:** Needs more work, can be revived later
- **Rejected:** Not adopted, rationale is documented
- **Withdrawn:** Author(s) withdraw the proposal

### 6. Implementation

- Accepted RFCs are tracked in the implementation project board
- Implementation PRs should reference the RFC number
- The RFC status is updated to "Implemented" when complete

## RFC Template

```markdown
# RFC N: [Title]

- Start Date: YYYY-MM-DD
- RFC PR: [#N]
- Author(s): [Name(s)]
- Shepherd: [Name]
- Status: [Draft | Comment Period | FCP | Accepted | Rejected | Withdrawn | Implemented]

## Summary

[One paragraph summary of the proposal.]

## Motivation

[Why is this change needed? What problem does it solve?]

## Design

[Detailed technical design. Include diagrams if helpful.]

## Drawbacks

[Why might we NOT want to do this? Be honest about trade-offs.]

## Rationale and Alternatives

- Why is this design better than alternatives?
- What alternatives were considered and rejected?
- Why is now the right time for this change?

## Unresolved Questions

- What remains to be decided during implementation?
- What follow-up RFCs might be needed?

## Implementation Timeline

[Phased implementation plan if applicable.]
```
```

### 7.8 Maintainer Onboarding Checklist

```markdown
# Maintainer Onboarding Checklist

## Phase 1: Preparation (Before Announcing)

### Access and Infrastructure
- [ ] Add to GitHub/GitLab project with maintainer role (write + admin perms)
- [ ] Add to CI/CD configuration (access for manual builds if needed)
- [ ] Add to package registry (npm/GitHub Packages/PyPI/other)
- [ ] Add to cloud infrastructure if applicable (deployment, monitoring)
- [ ] Add to DNS/domain management if applicable
- [ ] Add to social media accounts (Twitter, Mastodon, blog)
- [ ] Add to domain registrations and certificate management
- [ ] Add to code signing keys
- [ ] Add to package signing keys

### Communication Channels
- [ ] Add to private maintainer chat (Slack/Discord/IRC)
- [ ] Add to maintainer mailing list
- [ ] Add to TSC/core team calendar invites
- [ ] Add to incident response on-call rotation
- [ ] Add to security@ email alias
- [ ] Add to conduct@ alias if CoC committee member

### Documentation and Knowledge Transfer
- [ ] Schedule 3+ pair sessions with exiting/rotating maintainers
- [ ] Review all current PRs and their status
- [ ] Review all open issues and their status
- [ ] Read through the git log for the last 3 months
- [ ] Read through recent RFCs and decisions
- [ ] Review the project's financial status (if applicable)
- [ ] Review any ongoing legal matters (if applicable)
- [ ] Review the release checklist and understand the release process

## Phase 2: Shadow Period (First 2 Weeks)

### Observation
- [ ] Observe all meetings (not required to speak)
- [ ] Read through maintainer mailing list archives (last 6 months)
- [ ] Review all active RFCs
- [ ] Shadow a release (observe the full process)
- [ ] Attend a security incident review (if any)
- [ ] Observe a CoC committee meeting (if applicable)
- [ ] Review the project's dependencies and their licenses
- [ ] Review the project's CI/CD pipeline and infrastructure

### Low-Risk Contributions
- [ ] Review and merge 3-5 trivial PRs (documentation, minor bug fixes)
- [ ] Triage 10-15 issues (classify, label, close duplicates)
- [ ] Respond to 5-10 community questions
- [ ] Handle one minor community dispute (with guidance)
- [ ] Write one patch yourself and go through the full review process
- [ ] Review the build/release configuration

### Build Relationships
- [ ] Introduced to other maintainers (1:1 calls recommended)
- [ ] Introduced to community managers
- [ ] Introduced to corporate sponsors (if applicable)
- [ ] Introduced to foundation contacts (if applicable)
- [ ] Added to conference/sponsorship planning discussions

## Phase 3: Active Maintainer (Weeks 2-4)

### Regular Duties
- [ ] Start reviewing 3+ PRs per week
- [ ] Triage 10+ issues per week
- [ ] Respond to 5+ community questions per week
- [ ] Attend all maintainer meetings
- [ ] Participate in release preparation (if applicable)
- [ ] Represent the project in cross-project discussions

### Mentoring
- [ ] Mentor 1-2 new contributors (review their PRs, guide them)
- [ ] Write a blog post or documentation section (optional)
- [ ] Create a "good first issue" with detailed guidance

### Security
- [ ] Review security.txt and security policy
- [ ] Understand vulnerability reporting and disclosure process
- [ ] Review recent CVEs and their fixes
- [ ] Review the project's security best practices (CII badge level)

## Phase 4: Full Maintainer (After Week 4)

### Independence
- [ ] Can fully review and merge PRs without supervision
- [ ] Can triage, escalate, and resolve issues independently
- [ ] Can perform a full release (with checklist)
- [ ] Can represent the project in public forums
- [ ] Can handle community disputes and escalations

### Continuous Growth
- [ ] Develop expertise in 1-2 specific project areas
- [ ] Propose improvements to the maintainer process
- [ ] Recruitment: identify and mentor potential future maintainers
- [ ] Recruitment: contribute to governance documentation improvements
- [ ] Advocacy: represent project at conferences and events

## Phase 5: Self-Care and Sustainability

### Boundaries
- [ ] Set clear availability expectations (hours per week)
- [ ] Establish on-call rotation boundaries
- [ ] Schedule regular breaks and time off
- [ ] Identify burnout warning signs and mitigation strategies
- [ ] Have a succession plan for stepping away

### Support Network
- [ ] Know who to talk to when feeling overwhelmed
- [ ] Know the process for temporary leave of absence
- [ ] Know the process for stepping down permanently
- [ ] Have 1-2 other maintainers you can hand off to

## Ongoing Responsibilities Checklist

### Weekly
- [ ] Review open PRs (at least 3 per week)
- [ ] Triage new issues
- [ ] Respond to community questions
- [ ] Check security@ inbox
- [ ] Check conduct@ inbox (if applicable)
- [ ] Review CI/CD health

### Monthly
- [ ] Review dependency updates
- [ ] Check project metrics (contributor activity, issue resolution time)
- [ ] Participate in maintainer meeting
- [ ] Review and update documentation
- [ ] Check for any pending releases

### Quarterly
- [ ] Full security review
- [ ] Review and update CONTRIBUTING.md
- [ ] Review and update governance documents
- [ ] Community health metrics review
- [ ] Perform bus factor analysis
- [ ] Check in with other maintainers (1:1)

### Annually
- [ ] Full governance review
- [ ] License review (check dependencies for license changes)
- [ ] Update SECURITY.md
- [ ] Review and update CoC enforcement guidelines
- [ ] Conduct contributor experience survey
- [ ] Review and update this onboarding checklist
- [ ] Plan for succession and growth
- [ ] Attend or organize a maintainer summit/retreat
```

---

## Appendix: Further Reading

### Books
- *Producing Open Source Software* by Karl Fogel — the definitive guide to OSS governance (free online at https://producingoss.com/)
- *The Cathedral and the Bazaar* by Eric S. Raymond — classic essays on OSS development models
- *Working in Public: The Making and Maintenance of Open Source Software* by Nadia Eghbal
- *Open Source Archetypes* by Mozilla — a framework for OSS project types
- *Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure* by Nadia Eghbal — Ford Foundation report on OSS sustainability

### Governance Resources
- Apache Software Foundation governance docs: https://www.apache.org/foundation/governance/
- CNCF project lifecycle and governance: https://github.com/cncf/toc
- CHAOSS project metrics: https://chaoss.community/
- Linux Foundation's Open Source Guides: https://www.linuxfoundation.org/resources/open-source-guides/
- GitHub's Open Source Guides: https://opensource.guide/

### Licensing Resources
- SPDX License List: https://spdx.org/licenses/
- GNU License FAQ: https://www.gnu.org/licenses/gpl-faq.html
- Open Source Initiative (OSI) license list: https://opensource.org/licenses/
- FOSSA License Compatibility Guide: https://fossa.com/learn/license-compatibility
- TL;DR Legal — simplified license summaries: https://tldrlegal.com/

### CoC and Community Health
- Contributor Covenant: https://www.contributor-covenant.org/
- Geek Feminism Anti-Harassment resources: https://geekfeminism.wikia.org/
- CHAOSS DEI metrics: https://chaoss.community/diversity-and-inclusion/
- Ada Initiative guides (archived): https://adainitiative.org/

### Tools
- GrimoireLab (CHAOSS metrics): https://chaoss.github.io/grimoirelab/
- Augur (community health metrics): https://github.com/chaoss/augur
- FOSSA (license compliance): https://fossa.com/
- ClearlyDefined (license data): https://clearlydefined.io/
- SPDX Tools: https://spdx.dev/tools/
- OpenChain (supply chain compliance): https://www.openchainproject.org/

### Templates and Examples
- Rust RFC repository: https://github.com/rust-lang/rfcs
- Kubernetes KEP repository: https://github.com/kubernetes/enhancements
- Python PEP repository: https://github.com/python/peps
- CNCF project template: https://github.com/cncf/project-template
- Apache project template: https://github.com/apache/incubator-retired-gobblin (example of Apache project layout)

### License Change Analysis
- HashiCorp BSL announcement: https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license
- Elastic SSPL announcement: https://www.elastic.co/blog/licensing-change
- OpenTofu response: https://opentofu.org/
- Grafana AGPL announcement: https://grafana.com/blog/2021/04/20/grafana-loki-tempo-are-relicensing-to-agplv3/

---

*This document is provided as a universal reference for open source project governance.
It is licensed under CC0 1.0 Universal. Adapt and reuse freely.*
```
