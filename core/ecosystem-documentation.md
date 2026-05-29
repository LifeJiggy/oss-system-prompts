# OSS Documentation — Docs-as-Code & Technical Writing — Universal Reference

> A comprehensive global reference on open source software documentation best practices,
> docs-as-code methodology, and technical writing for open source communities.
>
> **Version:** 2.0.0
> **Last Updated:** 2026-05-19
> **License:** CC0-1.0 (public domain)
> **Audience:** Open source maintainers, contributors, technical writers, developer advocates

---

## Table of Contents

1.  [Part 1: The Importance of Documentation in OSS](#part-1-the-importance-of-documentation-in-oss)
2.  [Part 2: Types of OSS Documentation](#part-2-types-of-oss-documentation)
3.  [Part 3: Docs-as-Code Toolchain](#part-3-docs-as-code-toolchain)
4.  [Part 4: Writing for Open Source Audiences](#part-4-writing-for-open-source-audiences)
5.  [Part 5: Documentation Maintenance](#part-5-documentation-maintenance)
6.  [Part 6: Measuring Documentation Quality](#part-6-measuring-documentation-quality)
7.  [Part 7: Templates](#part-7-templates)

---

## Part 1: The Importance of Documentation in OSS

### 1.1 Documentation as the First Impression

A potential contributor's first encounter with your project is almost always through its documentation. Before they clone the repo, before they file an issue, before they even look at the code — they read the README. This initial impression determines within seconds whether they engage or move on.

**Key statistics:**

| Metric | Source | Finding |
|--------|--------|---------|
| First-impression window | Nielsen Norman Group | Users form an opinion in 50 milliseconds |
| README-driven decisions | GitHub Open Source Survey | 89% check README before deciding to contribute |
| Abandonment rate | CNCF Technical Documentation Survey | 67% abandon a project if docs are inadequate |
| Time saved per contributor | Google Engineering Productivity | Good docs save 23 minutes per onboarding |
| Productivity multiplier | Stripe Engineering Blog | Well-documented projects see 3.2x faster onboarding |
| Issue reduction | Microsoft Research | Projects with CONTRIBUTING.md see 40% fewer setup issues |
| PR acceptance rate | Apache Software Foundation | Contributor docs give 2.1x higher PR acceptance |
| Retention rate | GitHub OCTO | Good docs increase contributor retention by 60% |

### 1.2 Docs as Barrier vs Enabler

Documentation simultaneously acts as both a barrier to entry and an enabler of contribution.

**Documentation as a Barrier:**

| Barrier Type | Symptom | Impact |
|---|---|---|
| Knowledge gap | Project assumes domain expertise | Newcomers feel excluded |
| Setup complexity | Missing or outdated install instructions | Works on my machine syndrome |
| Jargon density | Unexplained acronyms and terminology | Confusion and frustration |
| Missing context | No architectural overview | Contributors make incorrect changes |
| Information scatter | Docs spread across wiki, blog, README, comments | Users give up searching |
| No onboarding path | Single monolithic doc with no progressive disclosure | Cognitive overload |
| Language barriers | Only available in English | Non-native speakers excluded |
| Outdated content | Docs reference deprecated APIs | Trust erosion |

**Documentation as an Enabler:**

| Enabler Type | Practice | Impact |
|---|---|---|
| Clear onboarding | Step-by-step setup with verification steps | First commit in under 30 minutes |
| Progressive disclosure | Quickstart to Reference to Deep Dive | Users self-select their depth |
| Glossaries | Defined terms with links | Knowledge growth, not gatekeeping |
| Runnable examples | Copy-paste code snippets that work | Immediate success experience |
| Contribution ladder | Good-first-issue labels plus mentoring docs | Clear path to becoming a committer |
| Translation framework | Crowdin or Weblate integration | Global community participation |
| Docs-as-Code | PRs for docs, review process, CI validation | Documentation quality equals code quality |

### 1.3 Documentation Quality and Project Success

There is a strong, measurable correlation between documentation quality and open source project success.

**Documentation Maturity Model:**

| Level | Name | Characteristics |
|---|---|---|
| 0 | None | No docs beyond README (usually sparse) |
| 1 | Ad-hoc | README exists, maybe a wiki page |
| 2 | Reactive | Docs created when someone asks repeatedly |
| 3 | Intentional | Docs planned alongside features, CONTRIBUTING exists |
| 4 | As-Code | Docs in repo, CI checks, versioned, internationalized |
| 5 | Ecosystem | Docs are product, documentation site, video tutorials, interactive examples |

### 1.4 Documentation-Driven Development

Documentation-Driven Development (DDD) is a methodology where documentation is written before code.

**Benefits of DDD:**

| Benefit | Explanation |
|---|---|
| Clarity before implementation | Writing docs forces you to specify exact behavior before coding |
| API design improvement | Documenting why often reveals design flaws early |
| Built-in test specification | Doc examples become acceptance criteria |
| Reduced rework | Fewer mid-implementation architecture changes |
| Natural knowledge transfer | Documentation exists when you need to onboard someone |
| Contract clarity | API docs serve as the contract between consumers and providers |
| Fewer misunderstandings | Cross-team alignment on behavior before code review |

### 1.5 Case Studies

#### Kubernetes: Documentation as a Product

Kubernetes treats its documentation as a first-class product with dedicated teams, release cycles, and quality metrics. 100,000+ pages, 12+ language translations, 300+ active documentation contributors.

#### Docker: Early Documentation Advantage

Docker's rapid adoption was fueled by excellent documentation that made complex containerization concepts accessible. Developer surveys consistently cited documentation as a top reason for choosing Docker.

#### LeftPad: Documentation Failure

The 2016 left-pad incident had cascading impact partly due to missing documentation: no README, no usage examples, no deprecation notice, no security contact.

#### Stripe: API Documentation as Competitive Advantage

Stripe's API docs are the gold standard: interactive examples, language-first code samples, progressive disclosure, visual workflows. Reduced support tickets by an estimated 40%.

#### React: Documentation as Developer Education

React's rewritten documentation treats docs as developer education: tutorial-first approach, mental model documentation, anti-pattern guidance. Reduced beginner questions on Stack Overflow by 35%.

---

## Part 2: Types of OSS Documentation

### 2.1 README: The Front Door of Every Project

The README is the most important document in any open source project.

**Essential README Sections:**

| Section | Purpose | Priority |
|---|---|---|
| Project name plus logo | Brand recognition | Essential |
| Badges | Health indicators | Recommended |
| One-liner | What does it do? Under 160 chars | Essential |
| Description | The problem and solution | Essential |
| Key features | What makes this project special | Essential |
| Quick start | Minimal setup in under 2 minutes | Essential |
| Usage examples | Code snippets showing common operations | Essential |
| Contributing | Brief intro plus link to CONTRIBUTING.md | Recommended |
| License | Name and link | Essential |

**README Anti-patterns:**

| Anti-pattern | Fix |
|---|---|
| Wall of text | Use headings, bullet lists, progressive disclosure |
| Assumed knowledge | Link to prerequisites |
| Outdated screenshots | Remove or add disclaimer |
| Missing install section | Always include install plus run |
| License missing | Always include license name and link |

### 2.2 CONTRIBUTING.md: Onboarding Contributors

The CONTRIBUTING.md file bridges the gap between interest and contribution.

**Essential Sections:**

| Section | Purpose |
|---|---|
| Welcome message | Sets a positive, inclusive tone |
| Code of Conduct | Link to CODE_OF_CONDUCT.md plus enforcement |
| Development setup | Step-by-step dev environment setup |
| Project structure | Brief directory layout overview |
| Workflow | Fork, branch, commit, PR process |
| Coding standards | Linting, formatting, testing requirements |
| Commit conventions | Conventional Commits, commit message format |
| PR requirements | Tests, docs, changelog entry |
| Review process | What happens after submitting a PR |
| Getting help | Where to ask questions |

### 2.3 API Documentation

API documentation is the contract between your code and its consumers.

**Language-Specific API Doc Generators:**

| Language | Tool | Features |
|---|---|---|
| Python | Sphinx | autodoc, Napoleon, intersphinx, doctest |
| Python | pdoc | Minimal, zero-config |
| JavaScript/TypeScript | JSDoc | Type inference, @type, @typedef |
| TypeScript | TypeDoc | Full type system support |
| Java | Javadoc | Standard tool, Maven/Gradle plugins |
| Go | godoc | Zero-config, auto-formatting |
| Rust | rustdoc | Built into cargo, doc tests |
| Ruby | YARD | RDoc compatible |
| C/C++ | Doxygen | Cross-language, UML diagrams |
| C# | DocFX | .NET ecosystem |
| PHP | phpDocumentor | PHPDoc standard |
| Kotlin | Dokka | Multi-platform, KDoc support |

**API Documentation Schema Standards:**

| Standard | Format | Use Case |
|---|---|---|
| OpenAPI 3.1 | YAML/JSON | REST APIs |
| GraphQL SDL | .graphql | GraphQL APIs |
| AsyncAPI | YAML/JSON | Event-driven APIs |
| gRPC / protobuf | .proto | gRPC services |
| JSON Schema | JSON | Data validation |

### 2.4 Tutorials

Tutorials guide a user through a complete, meaningful task from start to finish.

**Tutorial Structure:**

| Element | Example |
|---|---|
| Title | Building Your First Chat Bot |
| Prerequisites | Node.js 18plus |
| Learning objectives | By the end, you will have a working bot |
| Step-by-step | Numbered instructions with expected output |
| Verification | You should see Hello World |
| Code listings | Complete, runnable code |
| Troubleshooting | If you see error X, you missed step 3 |
| Next steps | Now try adding a database |

### 2.5 How-to Guides

How-to guides solve a specific problem. They assume existing familiarity with basic concepts.

**How-To vs Tutorial:**

| Dimension | Tutorial | How-To Guide |
|---|---|---|
| Goal | Learning | Solving a problem |
| Audience | Beginner | Intermediate-plus |
| Depth | Detailed, pedagogical | Concise, task-focused |
| Length | Longer (30 min to 4 hours) | Shorter (5-15 minutes) |

### 2.6 Reference Docs

Reference documentation describes the systems components precisely and completely. Characteristics: complete, precise, concise, automatically generated, searchable.

### 2.7 Architecture Decision Records

An ADR captures a decision, its context, and its consequences. ADRs are lightweight, version-controlled, and immutable.

**When to Write an ADR:**

| When | Why |
|---|---|
| Choosing a framework or library | Document why X over Y |
| Database schema decisions | Record trade-offs and constraints |
| API design decisions | Explain REST vs GraphQL vs gRPC choice |
| Infrastructure choices | Why AWS vs GCP vs on-prem |
| Significant refactoring | Record before and after state |
| Security decisions | Document threat model and mitigations |

### 2.8 Changelogs

A changelog is a curated, chronologically ordered list of notable changes for each version.

**Changelog Best Practices:**

| Practice | Rationale |
|---|---|
| Write for humans, not machines | Describe the impact, not just the change |
| Group by type (Added, Fixed, Changed) | Users scan by category |
| Link to issues and PRs | Traceability |
| Include migration notes inline | Help users upgrade |
| Keep an Unreleased section | Accumulate changes between releases |

### 2.9 Security Docs

Security documentation is critical for responsible vulnerability disclosure.

**SECURITY.md Essential Content:**

| Section | Content |
|---|---|
| Supported versions | Which versions receive security updates |
| Reporting a vulnerability | PGP key, email, expected response time |
| Disclosure policy | Coordinated disclosure timeline |
| Security advisories | Where to find published advisories |
| Recognition | Bug bounty or hall of fame |

### 2.10 Governance Docs

Governance documentation defines how the project is managed.

**Common Governance Models:**

| Model | Description | Examples |
|---|---|---|
| BDFL | Benevolent Dictator for Life | Python, Linux |
| Meritocracy | Earn authority through contributions | Apache Software Foundation |
| Foundation | Legal entity manages project | Kubernetes, Node.js |
| Corporate-backed | Company drives development | React, Angular |

### 2.11 Migration Guides

Migration guides help users move from one version to another.

**Migration Guide Structure:**

| Section | Description |
|---|---|
| Target audience | Who this migration is for |
| Prerequisites | What must be in place before starting |
| Breaking changes | List with examples of old and new |
| Deprecations | Features that still work but will be removed |
| Step-by-step | Ordered list of migration steps |
| Verification | How to confirm the migration succeeded |
| Rollback | How to revert if something goes wrong |

---

## Part 3: Docs-as-Code Toolchain

### 3.1 Static Site Generators

Static site generators transform Markdown files into HTML documentation sites.

**SSG Comparison:**

| SSG | Language | Best For |
|---|---|---|
| Docusaurus | JavaScript/React | JavaScript/TypeScript projects |
| MkDocs | Python | Python projects, small-to-medium docs |
| Sphinx | Python | Python projects, academic |
| Hugo | Go | Large sites, everything |
| Jekyll | Ruby | GitHub Pages sites |
| VitePress | JavaScript/Vue | Vue projects, small-medium docs |
| Antora | JavaScript+AsciiDoc | Multi-repository documentation |
| mdBook | Rust | Rust projects |

### 3.2 Documentation Frameworks

Docusaurus and MkDocs are the most popular documentation frameworks.

Docusaurus features: versioning, i18n, blog, MDX, Algolia DocSearch.
MkDocs with Material theme features: search, navigation tabs, code copy, content tabs, git revision dates.

### 3.3 API Doc Generators per Language

**Python: Sphinx with autodoc**

```
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.githubpages',
]
html_theme = 'sphinx_rtd_theme'
```

**JavaScript: JSDoc Example**

```javascript
/**
 * Fetches user data from the API.
 * @async
 * @param {string} userId - The unique identifier of the user.
 * @param {Object} [options] - Optional configuration.
 * @param {boolean} [options.forceRefresh=false] - Bypass cache.
 * @returns {Promise<User>} The user object.
 * @throws {ApiError} When the API returns a non-2xx status.
 */
async function fetchUser(userId, options = {}) {
  // implementation
}
```

**Rust: rustdoc Example**

```rust
/// A generic result type for database operations.
///
/// # Examples
///
/// ```
/// use my_db::DbResult;
/// fn find_user(id: u64) -> DbResult<User> {
///     Ok(User { id, name: "Alice".into() })
/// }
/// ```
pub type DbResult<T> = Result<T, DbError>;
```

**Go: godoc Example**

```go
// Package config provides configuration management.
// It supports loading from YAML files, environment variables,
// and command-line flags.
package config

// Config represents the application configuration.
type Config struct {
    Server   ServerConfig   `yaml:"server"`
    Database DatabaseConfig `yaml:"database"`
    Logging  LoggingConfig  `yaml:"logging"`
}

// Load reads configuration from the given path, then overlays
// environment variables and command-line flags.
func Load(path string) (*Config, error) {
    // implementation
}
```

### 3.4 Diagram-as-Code

Diagrams-as-code means defining diagrams in text, then rendering them. This enables version control, diff review, and automated generation.

**Mermaid.js** is the most popular diagram-as-code tool, supported natively by GitHub, GitLab, and most SSGs.

```
graph TD
    A[User] -->|HTTP Request| B[API Gateway]
    B --> C[Auth Service]
    B --> D[User Service]
    B --> E[Data Service]
    C --> F[(User DB)]
    D --> F
    E --> G[(Analytics DB)]
```

**Mermaid Diagram Types:**

| Type | Prefix | Use Case |
|---|---|---|
| Flowchart | graph TD / graph LR | Process flows, algorithms |
| Sequence diagram | sequenceDiagram | API interactions, protocols |
| Class diagram | classDiagram | Object-oriented design |
| State diagram | stateDiagram-v2 | State machines |
| Entity-relationship | erDiagram | Database schemas |
| Gantt chart | gantt | Project timelines |
| C4 diagram | C4Context / C4Container | Architecture |

**PlantUML** is more comprehensive but requires a server or Java runtime. **ASCII diagrams** work for terminal-based docs or situations where rendered images are impractical.

### 3.5 Linting Docs

Documentation linting catches errors before readers see them.

**Vale** is the most popular prose linter. Configurable, extensible, supports multiple styles.

```
# .vale.ini
StylesPath = .vale/styles
MinAlertLevel = warning

[*.md]
BasedOnStyles = Vale, write-good, alex
```

**write-good** checks for common readability issues:

| Rule | Flags | Example Fix |
|---|---|---|
| too-wordy | utilize | Use |
| weasel | very, really, quite | Remove or replace |
| passive | Passive voice | Active voice |
| adverbs | interestingly, remarkably | Remove |

**alex** checks for inclusive language:

| Rule | Alternative |
|---|---|
| whitelist/blacklist | Allow list/deny list |
| master/slave | Primary/replica |
| sanity check | Smoke test, confidence check |
| manpower | Staffing, workforce, personnel |
| guys | Everyone, team, folks |

**Additional Linting Tools:**

| Tool | Focus | Integration |
|---|---|---|
| remark-lint | Markdown syntax | remark ecosystem |
| markdownlint | Markdown style | VS Code, CLI, CI |
| proselint | Prose quality | CLI, CI |
| textlint | Natural language linting | Highly extensible plugins |
| lychee | Link checking | Fast, async, CI-friendly |

### 3.6 Testing Docs

**Doctest (Python):**

```python
def add(a: int, b: int) -> int:
    \"\"\"Add two numbers together.
    Examples:
        >>> add(2, 3)
        5
        >>> add(0, 0)
        0
    \"\"\"
    return a + b
```

Run with: python -m doctest or pytest --doctest-modules.

**Rust doc tests:**

```rust
/// ```
/// use my_crate::add;
/// assert_eq!(add(2, 3), 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Run with: cargo test.

**Link Checkers:**

| Tool | CI Usage |
|---|---|
| lychee | lychee --exclude file ./.md |
| muffet | muffet https://my-project.dev |
| broken-link-checker | blc -r https://my-project.dev |
| html-proofer | htmlproofer ./_site |

**Spell Checking:**

| Tool | Integration |
|---|---|
| cspell | VS Code, CLI, CI |
| codespell | CLI, pre-commit hook |
| hunspell | CLI, legacy |

### 3.7 CI for Docs

**GitHub Actions Documentation CI Workflow:**

```yaml
name: Documentation
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'website/**'
      - '*.md'
  pull_request:
    paths:
      - 'docs/**'
      - 'website/**'
      - '*.md'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Markdown linting
        run: npm run lint:md
      - name: Spell check
        uses: crate-ci/typos@master
      - name: Prose linting (Vale)
        uses: errata-ai/vale-action@v2

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build docs
        run: mkdocs build --strict
      - name: Check links
        uses: lycheeverse/lychee-action@v1

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -e ".[docs]"
      - run: mkdocs build --strict
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

**Preview Deployments for Docs PRs:**

| Service | Free Tier |
|---|---|
| Netlify | Yes (300 min/month) |
| Vercel | Yes (6000 min/month) |
| Cloudflare Pages | Yes (unlimited) |
| Read the Docs | Yes |
| GitHub Pages | Yes |

**Automated Checks Summary:**

| Check | Tool | Failure Action |
|---|---|---|
| Build | mkdocs build / docusaurus build | Block PR |
| Broken links | lychee / muffet | Block PR |
| Spelling | cspell / codespell | Block PR |
| Prose style | Vale | Warning or block |
| Inclusive language | alex | Block PR |
| Markdown format | markdownlint | Block PR |
| Doctests | pytest --doctest-modules | Block PR |
| Freshness | git-revision-date-localized | Warning |

### 3.8 Versioning Docs

Documentation must match the code it describes. When you release v2.0.0, the docs for v1.x should still be available.

**Versioning Strategies:**

| Strategy | Description | Tools |
|---|---|---|
| Branch-based | Each version has its own branch | Any SSG |
| Directory-based | Versioned directories v1, v2 | Sphinx, Antora |
| Tag-based | Build docs for each git tag | Docusaurus, mike |
| Component-based | Independently versioned components | Antora |
| Latest-only | Just the current version | MkDocs (default) |

**Docusaurus Versioning:**

```bash
# Create a new version from current docs
npm run docusaurus docs:version 2.0.0

# Directory structure:
# website/
#   docs/          next version (main branch)
#   versioned_docs/
#     version-1.x/ frozen v1 docs
#     version-2.0.0/ frozen v2 docs
```

**mike (MkDocs Versioning):**

```bash
# Install
pip install mike

# Deploy a version
mike deploy --push --update-aliases 2.0.0 latest
mike set-default --push latest

# List versions
mike list
```

**Versioning Policy Recommendations:**

| Release Type | Docs Action |
|---|---|
| Patch (1.0.0 to 1.0.1) | No new docs version |
| Minor (1.0.0 to 1.1.0) | Update current docs, keep old version |
| Major (1.x to 2.0.0) | Create new docs version, keep old version |
| LTS release | Pin a version that gets backport doc fixes |
| Pre-release (alpha/beta) | Use next or dev label, not a permanent version |

---

## Part 4: Writing for Open Source Audiences

### 4.1 Multiple Audiences

Open source projects serve multiple audiences simultaneously.

**Audience Segments:**

| Audience | Goal | Content Preference |
|---|---|---|
| End user | Use the software | Tutorials, how-to guides, quickstarts |
| Contributor | Modify the software | CONTRIBUTING.md, code comments, architecture docs |
| Maintainer | Review, merge, release | ADRs, changelogs, governance docs |
| Operator | Deploy, configure, maintain | Deployment guides, config reference, monitoring |
| Decision maker | Evaluate adoption | README, feature comparison, security policy |
| Educator | Teach the software | Tutorials, concept docs, examples |
| Plugin author | Extend the software | API reference, plugin dev guides |

**Writing for Multiple Audiences Techniques:**

| Technique | Example |
|---|---|
| Layered headings | H1/H2 for broad concepts, H3/H4 for details |
| Prerequisites callout | For operators: this section covers deployment |
| See also links | See also: API Reference for complete endpoint details |
| Progressive disclosure | Tutorial to How-to to Reference |
| TL;DR sections | Executive summaries for decision makers |

### 4.2 Plain English

Writing in plain English makes documentation more accessible to non-native speakers, junior developers, and people outside your domain.

**Plain English Principles:**

| Principle | Bad Example | Good Example |
|---|---|---|
| Use simple words | Utilize the aforementioned API endpoint | Use the API endpoint |
| Short sentences | The config file, which is located in the home directory | The config file is in your home directory |
| Active voice | The request is processed by the server | The server processes the request |
| Avoid jargon | Utilizing a monotonic clock source | Using a clock that only moves forward |
| Define terms | (assumes reader knows idempotent) | Idempotent: sending the same request multiple times has the same effect |
| Use you | The user should configure | You should configure |
| Be direct | It is possible to initiate the installation | Install by running |

**Readability Scores Target:**

| Audience | Target Grade Level |
|---|---|
| General public | Grade 6-8 |
| Technical documentation | Grade 8-10 |
| Academic/Research | Grade 10-14 |

**Common Word Replacements:**

| Instead of | Use |
|---|---|
| Utilize | Use |
| Initiate | Start |
| Terminate | Stop |
| Implement | Build, Create, Do |
| Facilitate | Help, Enable |
| Subsequently | Then, Next |
| Additionally | Also |
| Notwithstanding | Despite |
| Endeavor | Try |
| Leverage | Use |
| In order to | To |
| In the event that | If |
| A number of | Some, Several |

### 4.3 Inclusive Language

Inclusive language ensures that everyone reading your documentation feels welcome and respected.

**Gender-Neutral Language:**

| Instead of | Use |
|---|---|
| He/his (default pronoun) | They/their |
| Guys (mixed group) | Everyone, folks, team |
| Manpower | Staffing, workforce, personnel |
| Man-hours | Person-hours |
| Chairman | Chair, chairperson |
| Mankind | Humanity, people, humans |

**Culturally Aware Language:**

| Avoid | Alternative |
|---|---|
| Sanity check | Smoke test, confidence check |
| Crazy/dumb (as criticism) | Unusual, problematic, unexpected |
| Obviously | Remove or explain |
| Killing a process | Terminating, stopping |
| Guru (as expert) | Expert, specialist |

**Accessibility-First Writing:**

| Principle | Implementation |
|---|---|
| Alt text for images | Every image must have descriptive alt text |
| Descriptive link text | View the installation guide instead of Click here |
| Color-independent | Dont rely solely on color to convey information |
| Code readability | High contrast, readable font sizes |
| Screen reader friendly | Semantic HTML headings, ARIA labels |
| Avoid directional language | In the sidebar instead of On the right side |

### 4.4 Code Examples in Documentation

Code examples are the most important part of technical documentation for developers.

**Code Example Best Practices:**

| Practice | Explanation |
|---|---|
| Copy-paste safe | Every example should work when pasted directly |
| Complete but focused | Show enough context but not the entire file |
| Show expected output | What should the user see |
| Handle errors | Show error handling, not just the happy path |
| Consistent style | Follow the project style guide |
| Language annotation | Always specify the language for syntax highlighting |
| Progressive complexity | Start simple, add advanced options later |
| Multi-language | Show examples in multiple languages when applicable |

**Code Example Anti-patterns:**

| Anti-pattern | Fix |
|---|---|
| Placeholder values | Use test keys or env vars |
| Incomplete imports | Show all necessary imports |
| No error handling | Show try-catch or error patterns |
| Overly simplified | Show realistic examples |
| Outdated syntax | Regularly update with code reviews |
| Run-on examples | Break into digestible pieces |
| No context | Add brief explanation before each block |

### 4.5 Screenshots and Diagrams

**When to Use Screenshots:**

| Good for | Not good for |
|---|---|
| UI-heavy operations | Command-line operations (use code blocks) |
| Visual results (charts, graphs) | Configuration steps (use code blocks) |
| Error messages in complex UIs | Text that will change frequently |
| Demonstrating visual features | Content that needs to be searchable |

**Screenshot Best Practices:**

| Practice | Why |
|---|---|
| Annotate with arrows/numbers | Directs viewer attention |
| Use consistent resolution | Avoid blurry images |
| Keep file size small | Use PNG for UI, JPEG for photos |
| Add descriptive alt text | Accessibility and SEO |
| Version in git | Track changes over time |

### 4.6 Internationalization

Internationalization makes your documentation accessible to a global audience.

**Translation Management Platforms:**

| Platform | Pricing | Features |
|---|---|---|
| Crowdin | Free for OSS | Integration with GitHub, GitLab, Bitbucket |
| Weblate | Self-hosted free, SaaS paid | Git-native, CI integration |
| Transifex | Free for OSS | File-based, API-driven |
| Lokalise | OSS discount | Screenshots, QA checks |
| Pontoon | Mozilla project | Firefox localization tool |

**i18n Best Practices:**

| Practice | Rationale |
|---|---|
| Separate content from code | Translators dont need to see code |
| Use short sentences | Easier for translation memory |
| Avoid idioms and metaphors | Kill two birds with one stone doesnt translate |
| Use consistent terminology | Translation memory works better |
| Provide context for translators | Comments explaining technical terms |
| Test with right-to-left (RTL) | Arabic, Hebrew break without proper CSS |
| Plan for text expansion | German text is about 30 percent longer than English |

---

## Part 5: Documentation Maintenance

### 5.1 Keeping Docs in Sync

Documentation and code drift apart over time. Docs-as-code is the set of practices that prevent or minimize this drift.

**Drift Prevention Strategies:**

| Strategy | Effort | Effectiveness |
|---|---|---|
| Docs PR required | Medium | High |
| docstring-first | Low | Medium |
| Auto-generation | One-time setup | High |
| Same-repo docs | Low | High |
| CI doc checks | Medium | High |
| Scheduled reviews | Medium | Medium |
| Doc sprints | Periodic | Medium |
| User feedback button | Low | Low (reactive) |

**Same-Repo Documentation Structure:**

```
my-project/
├── src/                    # Source code
├── docs/                   # Documentation site source
│   ├── index.md            # Home page
│   ├── getting-started.md  # Quick start
│   ├── user-guide/         # User documentation
│   ├── contributor-guide/  # Contributor documentation
│   ├── api/                # Auto-generated API docs
│   └── assets/             # Images, diagrams
├── README.md               # Project front door
├── CONTRIBUTING.md         # Contributor guide
├── SECURITY.md             # Security policy
├── CHANGELOG.md            # Changelog
├── CODE_OF_CONDUCT.md      # Code of conduct
└── mkdocs.yml              # SSG config
```

### 5.2 Automated Doc Generation in CI

**Python: Sphinx Auto-Generation:**

```yaml
- name: Generate Sphinx API docs
  run: |
    sphinx-apidoc -o docs/api src/my_package --force --separate
- name: Build docs
  run: sphinx-build -b html docs/ site/
- name: Check docstring coverage
  run: |
    sphinx-build -b coverage docs/ _coverage/
    cat _coverage/python.txt
```

**OpenAPI Validation in CI:**

```yaml
- name: Validate OpenAPI spec
  uses: mheap/openapi-validate-action@v1
  with:
    file: docs/api/openapi.yaml
- name: Generate API docs from OpenAPI
  run: npx @redocly/cli build-docs docs/api/openapi.yaml -o site/api.html
```

### 5.3 Deprecation Notices and Removal Communication

**Deprecation Lifecycle:**

| Phase | Action |
|---|---|
| 1: Announcement | Mark as deprecated in code, add deprecation notice to docs, add migration guide, announce |
| 2: Warning | Add runtime deprecation warning, provide automated migration tools |
| 3: Default Change | Old behavior becomes opt-in, new behavior is default |
| 4: Removal | Remove deprecated feature, final migration guide update |

**Code-Level Deprecation:**

Python:
```python
import warnings

def old_function():
    \"\"\"Old function use new_function instead.
    .. deprecated:: 2.0.0
    \"\"\"
    warnings.warn(
        "old_function is deprecated, use new_function instead",
        DeprecationWarning,
        stacklevel=2,
    )
    return new_function()
```

JavaScript:
```typescript
/** @deprecated Since 2.0.0. Use newFunction instead. */
export function oldFunction(): void {
  console.warn('oldFunction is deprecated. Use newFunction instead.');
  return newFunction();
}
```

### 5.4 Documentation Debt

Documentation debt is the gap between the documentation that exists and the documentation that should exist.

**Types of Documentation Debt:**

| Type | Definition | Cost |
|---|---|---|
| Missing docs | Features with no documentation | High |
| Stale docs | Docs that describe old behavior | High |
| Inconsistent docs | Different parts say different things | Medium |
| Duplicate docs | Same information in multiple places | Medium |
| Incomplete docs | Docs that do not cover edge cases | Medium |
| Orphaned docs | Docs for removed features | Low |

**Managing Documentation Debt:**

| Strategy | Effort | Impact |
|---|---|---|
| Doc sprints | Medium | High |
| Docs PR requirement | Low | High |
| Freshness badges | Low | Medium |
| Automated stale detection | Medium | Medium |
| User feedback buttons | Continuous | Medium |

### 5.5 Community Contributions to Documentation

Documentation is one of the best areas for new contributors to start.

**Good First Documentation Issues:**

| Issue Type | Difficulty | Prerequisites |
|---|---|---|
| Fix typos | Very easy | Fluent in English |
| Improve code examples | Easy | Knowledge of the tool |
| Add screenshots | Easy | Access to running app |
| Write test data examples | Medium | Domain knowledge |
| Create a missing tutorial | Medium | Experience with the feature |
| Review and update stale docs | Medium | Some project experience |
| Translate documentation | Medium | Bilingual |

**Encouraging Documentation Contributions:**

| Practice | Implementation |
|---|---|
| Edit link on every page | Edit this page button links to GitHub editor |
| Documentation contribution guide | Specific guide for doc contributions |
| Celebrate doc contributors | Thank them in release notes |
| Documentation sprints | Organized events |
| Low barrier to entry | Doc PRs can be lighter than code PRs |

### 5.6 Review Process for Documentation PRs

**Documentation Review Checklist:**

- Information is technically correct
- Code examples run correctly
- Screenshots match the current UI
- No missing steps or assumptions
- Edge cases and error states covered
- Prerequisites clearly stated
- Written in plain English
- Jargon is explained
- Active voice used throughout
- Consistent terminology
- Proper heading hierarchy
- Information in logical order
- Inclusive language
- Links are descriptive
- Images have alt text
- No broken links
- Spelling and grammar checked

**Doc PR Review Workflow:**

1. Author submits PR with docs changes
2. CI runs: Markdown linting, spelling check, link checking, build test, prose linting
3. First review pass: Technical accuracy (subject matter expert)
4. Second review pass: Writing quality (technical writer)
5. Final review: Maintainer sign-off

---

## Part 6: Measuring Documentation Quality

### 6.1 Documentation Coverage Metrics

Documentation coverage measures what percentage of your codebase public surface is documented.

**Code-Level Coverage:**

| Metric | Tool | Target |
|---|---|---|
| Public API doc coverage | Sphinx coverage builder, TypeDoc coverage | 100 percent for public API |
| Missing type annotations | mypy, TypeScript strict mode | 100 percent for public API |
| Example coverage | doctest coverage | Over 80 percent |

**API Documentation Coverage Check:**

```bash
# Sphinx coverage
sphinx-build -b coverage docs/ _coverage/
cat _coverage/python.txt
# Output: Score: 92.5% documented
```

### 6.2 User Feedback Loops

**Feedback Mechanisms:**

| Method | Pros | Cons |
|---|---|---|
| Was this helpful thumbs up/down | Simple, high volume | Binary, no context |
| 1-5 star rating per page | More granular | Lower engagement |
| Open text feedback form | Rich feedback | Low volume, spammy |
| GitHub issues report a doc issue | Trackable, public | High friction |

**Closing the Loop:**

When someone says the docs are unhelpful:
1. Acknowledge the feedback
2. Investigate (what specifically is wrong)
3. Fix the documentation
4. Notify the reporter (optional)
5. Track improvement

### 6.3 Search Analytics

Understanding what users search for tells you what they need and what you are not documenting well.

**Metrics to Track:**

| Metric | What It Reveals | Action |
|---|---|---|
| Top search queries | What users want to do | Ensure top queries are well-documented |
| Zero-result searches | Critical gaps | Add documentation for these topics |
| Search click-through | Are results relevant | Improve page titles, summaries |
| Search exit (bounce) | Did users find what they need | Improve content quality |
| Trending searches | Emerging needs | Prioritize new content |

**Common Zero-Result Search Queries:**

| Query | Issue |
|---|---|
| database setup | Missing deployment guide |
| error 500 | No error code documentation |
| timeout | No configuration reference for timeouts |
| environment variables | Missing env var reference |
| migration from v1 | No migration guide |
| custom plugin | No plugin development guide |
| rate limit | No rate limit documentation |

### 6.4 Time-to-Answer

Time-to-answer measures how long it takes a user to find the information they need.

**TTA Benchmarks:**

| Task Type | Good | Acceptable | Needs Improvement |
|---|---|---|---|
| Installation | Under 3 min | 3-10 min | Over 10 min |
| Hello World | Under 5 min | 5-15 min | Over 15 min |
| Config change | Under 2 min | 2-5 min | Over 5 min |
| Error resolution | Under 5 min | 5-20 min | Over 20 min |
| API integration | Under 10 min | 10-30 min | Over 30 min |

### 6.5 Documentation Freshness

Freshness measures how up-to-date your documentation is.

**Freshness Policies:**

| Policy | Description |
|---|---|
| Review within 6 months | Every doc page reviewed at least twice a year |
| Review on release | All docs reviewed before each major release |
| Review on change | Relevant docs reviewed when code changes |
| Stale after 2 years | Remove or archive docs not updated in 2 years |

---

## Part 7: Templates

### 7.1 README.md Template

```markdown
# Project Name

[![Build Status](https://github.com/owner/repo/workflows/CI/badge.svg)](https://github.com/owner/repo/actions)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

One sentence describing what this project does. Under 160 characters.

## Features

- High performance: handles 10,000+ requests/second
- Type safe: full type definitions
- Cross-platform: Linux, macOS, Windows

## Quick Start

```bash
npm install project-name
npx project-name --input file.txt --output result.json
```

## Usage

```typescript
import { processFile } from 'project-name';
const result = await processFile('input.txt');
console.log(result);
```

## Documentation

Full documentation at project-name.dev

## Contributing

See CONTRIBUTING.md.

## License

Apache 2.0 (c) Year Author
```

### 7.2 CONTRIBUTING.md Template

```markdown
# Contributing to Project Name

## Code of Conduct

This project adheres to the Contributor Covenant. See CODE_OF_CONDUCT.md.

## Development Setup

```bash
git clone https://github.com/owner/repo.git
cd repo
pnpm install
pnpm test
```

## Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Update documentation
6. Run tests locally
7. Commit using Conventional Commits
8. Push to your fork
9. Open a Pull Request

## Commit Message Format

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Include tests for new code
- Update documentation for API changes
- Add a changelog entry
- Ensure CI passes
```

### 7.3 API Documentation Template

```markdown
# API Reference

## Overview

All API calls should be made to https://api.example.com/v1.

## Authentication

Bearer token authentication:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/v1/resources
```

## Resources

### List Resources

GET /v1/resources

Parameters: page, per_page, sort, order

### Create Resource

POST /v1/resources

Request body: name (required), type (required), description, metadata

### Update Resource

PATCH /v1/resources/{id}

### Delete Resource

DELETE /v1/resources/{id}

## Rate Limiting

| Tier | Requests per Minute |
|---|---|
| Free | 60 |
| Pro | 300 |
| Enterprise | Custom |
```

### 7.4 Tutorial Template

```markdown
# Building Your First Application

In this tutorial, you will build a complete task management application.

Time to complete: 30 minutes
Difficulty: Beginner

## Prerequisites

- Project Name installed (v2.0 or later)
- Node.js 18+

## Step 1: Create a New Project

```bash
mkdir my-first-app
cd my-first-app
project-name init
```

## Step 2: Configure Authentication

Set your API key:

```bash
export API_KEY="your_api_key_here"
```

## Step 3: Create a Data Model

```typescript
const Task = new Model('task', {
  title: { type: 'string', required: true },
  status: { type: 'string', enum: ['todo', 'in_progress', 'done'] },
});
```

## Step 4: Add CRUD Operations

```typescript
async function createTask(title) {
  const task = await Task.create({ title });
  return task;
}

async function listTasks() {
  const tasks = await Task.find({});
  return tasks;
}
```

## Step 5: Run Your Application

```bash
project-name run src/main.ts
```

## Next Steps

- Configuration Guide
- API Reference
- Deployment Guide
```

### 7.5 Changelog Template (Keep a Changelog Format)

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [Unreleased]

### Added
- New feature (PR #123)

### Changed
- Change in existing functionality (PR #456)

### Deprecated
- Feature to be removed in future

### Removed
- Feature that was removed

### Fixed
- Bug fix description (Issue #789)

### Security
- Vulnerability fix

## [2.1.0] - 2026-05-15

### Added
- Rate limiting for API endpoints

### Changed
- Upgraded database driver to v4.x

### Fixed
- Memory leak in WebSocket connections

[Unreleased]: https://github.com/owner/repo/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/owner/repo/compare/v2.0.0...v2.1.0
```

### 7.6 Architecture Decision Record (ADR) Template

```markdown
# ADR-001: Title of Decision

## Status

Proposed

## Context

Describe the problem that led to this decision. Include the situation, constraints, assumptions, and relevant background information.

## Decision

Describe the decision that was made. What is being done and why?

## Consequences

Describe the consequences of this decision:
- Positive outcomes
- Negative outcomes
- Trade-offs
- What becomes easier
- What becomes harder

## Alternatives Considered

### Alternative 1: Description
- Pros:
- Cons:
- Why rejected:

### Alternative 2: Description
- Pros:
- Cons:
- Why rejected:
```

### 7.7 Migration Guide Template

```markdown
# Migration Guide: v1.x to v2.0

## Prerequisites

- Complete any pending operations in v1.x
- Backup your data and configuration
- Review the changelog for all changes

## Breaking Changes

### 1. Authentication

Old:
```yaml
auth:
  api_key: "${API_KEY}"
```

New:
```yaml
auth:
  provider: oauth2
  client_id: "${CLIENT_ID}"
```

### 2. Configuration Changes

| Old Key | New Key |
|---|---|
| app.timeout | app.request_timeout |
| database.host | database.url |

## Step-by-Step Migration

1. Update configuration file
2. Migrate authentication credentials
3. Update API endpoint calls
4. Run automated migration script
5. Verify all functionality

## Verification

- All tests pass
- Application starts without warnings
- All existing data is accessible
- New features work as expected

## Rollback

If migration fails, restore the backup and revert to v1.x.
```

### 7.8 Security Policy Template

```markdown
# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 2.x | Yes |
| 1.x | Security fixes only |
| less than 1.0 | No |

## Reporting a Vulnerability

Please report security vulnerabilities to security@example.com.

You should receive a response within 48 hours. If you do not, please follow up.

### When Reporting Include

- Description of the vulnerability
- Steps to reproduce
- Affected versions
- Potential impact
- Suggested fix (if any)

## Disclosure Policy

We follow coordinated disclosure:

1. Report received and acknowledged within 48 hours
2. We investigate and develop a fix
3. We notify affected downstream package maintainers
4. We publish a CVE and security advisory
5. We release a patched version
6. Public disclosure after 90 days or when the fix is released
```

### 7.9 Documentation Review Checklist

```markdown
## Documentation Review Checklist

### Accuracy
- [ ] Information is technically correct
- [ ] Code examples run correctly
- [ ] Screenshots match the current UI
- [ ] Commands and installation steps work

### Completeness
- [ ] No missing steps or assumptions
- [ ] Edge cases and error states covered
- [ ] Prerequisites clearly stated
- [ ] Troubleshooting section addresses common issues

### Clarity
- [ ] Written in plain English (Grade 10 or below)
- [ ] Jargon is explained or linked to a glossary
- [ ] Active voice used throughout
- [ ] Consistent terminology

### Structure
- [ ] Proper heading hierarchy (h1 to h2 to h3)
- [ ] Information in logical order
- [ ] Related concepts linked together
- [ ] Length appropriate for the content type

### Technical Writing Standards
- [ ] Inclusive language (no ableist, gendered, or culturally insensitive terms)
- [ ] Links are descriptive (not click here)
- [ ] Images have alt text
- [ ] No broken links
- [ ] Spelling and grammar checked
- [ ] Follows project style guide
```

---

## Conclusion

Documentation is not a nice-to-have in open source software. It is essential infrastructure that determines whether a project thrives or stagnates. By adopting docs-as-code practices, measuring documentation quality, and writing for diverse audiences, you can transform your documentation from an afterthought into a competitive advantage.

The key principles to remember:

1. **Docs are the front door** — make a great first impression
2. **Write before you code** — documentation-driven development improves design
3. **Treat docs as code** — version control, review, CI, and testing apply
4. **Know your audience** — write for end users, contributors, operators, and evaluators
5. **Measure what matters** — coverage, freshness, feedback, search analytics
6. **Plan for maintenance** — documentation debt accumulates and must be managed
7. **Provide templates** — reduce friction for contributors to write good docs
8. **Internationalize early** — global communities need accessible content
9. **Use the right tools** — SSGs, linters, diagram-as-code, automated CI
10. **Keep learning** — the docs-as-code ecosystem evolves continuously

Remember: The best documentation is the documentation that exists, is accurate, and is maintained. Start small, iterate, and improve continuously.


---

## Appendix A: OpenAPI Specification Example (Full)

A complete OpenAPI 3.1 specification for a sample API.

```yaml
openapi: 3.1.0
info:
  title: Pet Store API
  description: A sample pet store API
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging.example.com/v1
    description: Staging
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      parameters:
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            maximum: 100
            default: 20
      responses:
        '200':
          description: A list of pets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
    post:
      summary: Create a pet
      operationId: createPet
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPet'
      responses:
        '201':
          description: Pet created
components:
  schemas:
    Pet:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    NewPet:
      type: object
      required:
        - name
      properties:
        name:
          type: string
        tag:
          type: string
```

---

## Appendix B: Docusaurus Full Configuration

```javascript
// docusaurus.config.js
module.exports = {
  title: 'My Project',
  tagline: 'Building Better Software',
  url: 'https://my-project.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'my-org',
  projectName: 'my-project',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/my-org/my-project/edit/main/website/',
          lastVersion: 'current',
          versions: {
            current: { label: 'main', path: '' },
            '1.x': { label: '1.x', path: '1.x' },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/my-org/my-project/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'My Project',
      logo: { alt: 'Logo', src: 'img/logo.svg' },
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { type: 'doc', docId: 'api/overview', position: 'left', label: 'API' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [{ to: '/versions', label: 'All versions' }],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/my-org/my-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'my-project',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN', 'ja', 'ko', 'fr', 'de', 'es'],
  },
};
```

---

## Appendix C: MkDocs Full Configuration

```yaml
# mkdocs.yml
site_name: My Project
site_url: https://my-project.dev
site_description: Building Better Software
site_author: My Organization

theme:
  name: material
  language: en
  palette:
    primary: indigo
    accent: indigo
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - search.highlight
    - search.suggest
    - content.code.copy
    - content.tabs.link

plugins:
  - search
  - mkdocstrings:
      handlers:
        python:
          paths: [src]
  - git-revision-date-localized
  - minify:
      minify_html: true

markdown_extensions:
  - admonition
  - codehilite
  - pymdownx.superfences
  - pymdownx.tabbed
  - pymdownx.emoji
  - pymdownx.details
  - toc:
      permalink: true

nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - User Guide:
    - Installation: user-guide/installation.md
    - Configuration: user-guide/configuration.md
    - Usage: user-guide/usage.md
  - API Reference: api/
  - Contributing: contributing.md
  - Changelog: changelog.md
```

---

## Appendix D: CI/CD Documentation Pipeline Examples

### GitHub Actions Full Docs CI

```yaml
name: Documentation
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'website/**'
      - '*.md'
      - 'CONTRIBUTING.md'
      - 'CODE_OF_CONDUCT.md'
  pull_request:
    paths:
      - 'docs/**'
      - 'website/**'
      - '*.md'
  workflow_dispatch:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Markdown linting
        run: npm run lint:md
      - name: Spell check
        uses: crate-ci/typos@master
      - name: Prose linting (Vale)
        uses: errata-ai/vale-action@v2
        with:
          files: docs/ website/

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -e ".[docs]"
      - name: Doctest
        run: python -m pytest --doctest-modules src/
      - name: Build docs
        run: mkdocs build --strict
      - name: Check links
        uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose site/

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -e ".[docs]"
      - run: mkdocs build --strict
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

### Netlify Preview Deployments

```yaml
- name: Deploy preview
  uses: nwtgck/actions-netlify@v3
  with:
    publish-dir: ./site
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
    deploy-message: "Deploy from PR"
    enable-pull-request-comment: true
    overwrites-pull-request-comment: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Read the Docs Configuration

```yaml
# .readthedocs.yaml
version: 2

build:
  os: ubuntu-22.04
  tools:
    python: "3.12"

python:
  install:
    - method: pip
      path: .
      extra_requirements:
        - docs

mkdocs:
  configuration: mkdocs.yml
```

---

## Appendix E: Documentation Quality Scoring Rubric

A comprehensive rubric for evaluating documentation quality across multiple dimensions.

| Dimension | Weight | 0 (None) | 1 (Poor) | 2 (Fair) | 3 (Good) | 4 (Excellent) |
|---|---|---|---|---|---|---|
| Completeness | 25% | No docs exist | Some features documented | All features documented minimally | Most features documented well | Every feature documented with examples |
| Accuracy | 20% | Docs exist but are wrong | Many inaccuracies | Minor inaccuracies | Accurate with rare exceptions | Verified accurate with automated tests |
| Clarity | 15% | Unreadable | Difficult to understand | Adequate but verbose | Clear and concise | Crystal clear, grade 8 level |
| Findability | 15% | No search, no navigation | Poor organization | Adequate navigation | Good search and nav | Excellent search, cross-references |
| Freshness | 10% | Never updated | Years old | Months old | Updated within weeks | Updated with every release |
| Accessibility | 10% | No alt text, poor contrast | Minimal accessibility | Mostly accessible | Good accessibility | WCAG AA compliant |
| Inclusivity | 5% | Exclusive language | Some problematic terms | Neutral language | Inclusive throughout | Proactively inclusive |

**Scoring Guide:**

| Total Score | Grade | Action Required |
|---|---|---|
| 90-100 | A | Maintain current practices |
| 75-89 | B | Minor improvements needed |
| 60-74 | C | Moderate improvements needed |
| 40-59 | D | Significant improvements needed |
| Below 40 | F | Complete documentation overhaul needed |

---

## Appendix F: Documentation Tech Stack Decision Matrix

Use this matrix to select the right tools for your documentation stack.

### Static Site Generator Selection

| Requirement | Docusaurus | MkDocs | Sphinx | Hugo | Antora |
|---|---|---|---|---|---|
| Team knows JavaScript | Excellent | Good | Fair | Fair | Good |
| Team knows Python | Fair | Excellent | Excellent | Fair | Fair |
| Auto-generate API docs | Good | Good | Excellent | Fair | Good |
| Multi-version docs | Built-in | Via mike | Via sphinx-multiversion | Custom | Built-in |
| i18n | Built-in | Via plugin | Via sphinx-intl | Built-in | Built-in |
| Blog support | Built-in | Custom | Via ablog | Built-in | No |
| Build speed | Fast | Fast | Slow | Instant | Fast |
| Customization | React | Jinja2 themes | Jinja2 themes | Go templates | Handlebars |
| Search | Algolia | Built-in | Built-in | Lunr/Algolia | Lunr/Algolia |
| Learning curve | Medium | Low | Medium | Medium | High |

### Linter Selection

| Requirement | Vale | markdownlint | textlint | proselint |
|---|---|---|---|---|---|
| Prose style checks | Excellent | None | Good | Excellent |
| Markdown syntax | None | Excellent | Via plugins | None |
| Custom rules | Easy | Easy | Easy | Moderate |
| CI integration | Excellent | Excellent | Good | Good |
| VS Code integration | Extension | Extension | Extension | Extension |
| Inclusive language | Via alex | None | Via plugin | None |
| Readability scoring | Via write-good | None | Via plugin | Built-in |

### Link Checker Selection

| Requirement | lychee | muffet | broken-link-checker | html-proofer |
|---|---|---|---|---|---|
| Speed | Fastest | Fast | Moderate | Slow |
| Async | Yes | Yes | No | No |
| Exclude patterns | Yes | Yes | Yes | Yes |
| Retry on failure | Yes | Yes | No | Yes |
| CI-friendly | Yes | Yes | Yes | Requires Ruby |
| GitHub Action | Official | Community | Community | Community |
| File-based links | Yes | No | No | Yes |

---

## Appendix G: Documentation Project Roadmap Template

```markdown
# Documentation Roadmap

## Quarter 1 (Q1 2026)

### Goals
- Launch new documentation site
- Migrate from wiki to docs-as-code

### Deliverables
- [ ] Static site generator configured
- [ ] README rewritten with new structure
- [ ] Getting Started guide published
- [ ] CONTRIBUTING.md updated
- [ ] CI pipeline for documentation deployed

### Metrics
- Documentation coverage: 30% -> 50%
- Time-to-first-commit: 45min -> 20min

## Quarter 2 (Q2 2026)

### Goals
- API documentation auto-generation
- Community contribution workflow for docs

### Deliverables
- [ ] OpenAPI spec complete for all endpoints
- [ ] Sphinx/TypeDoc auto-generation in CI
- [ ] Translation pipeline established
- [ ] Documentation review process documented

### Metrics
- API documentation coverage: 50% -> 90%
- Number of doc contributors: 5 -> 20

## Quarter 3 (Q3 2026)

### Goals
- Internationalization launch
- Video tutorials and interactive examples

### Deliverables
- [ ] Chinese and Japanese translations live
- [ ] Interactive API playground deployed
- [ ] 5 video tutorials published
- [ ] Documentation analytics dashboard live

### Metrics
- Weekly doc site visitors: 1000 -> 5000
- Non-English traffic: 0% -> 20%

## Quarter 4 (Q4 2026)

### Goals
- Documentation maturity level 5
- Community-driven documentation maintenance

### Deliverables
- [ ] Documentation quality scoring dashboard
- [ ] Automated freshness checks
- [ ] Documentation contributor program launched
- [ ] Quarterly documentation audit process

### Metrics
- Documentation satisfaction score: 3.5/5 -> 4.5/5
- Zero-result search queries: 20% -> 5%
```

---

## Appendix H: Documentation Migration Plan Template

```markdown
# Documentation Migration Plan

## Current State
- Documentation scattered across:
  - GitHub Wiki (15 pages)
  - Blog posts (20 articles)
  - README files (8 repos)
  - Internal Notion (50 pages)

## Target State
- Single documentation site at docs.example.com
- All content in docs/ directory of main repo
- CI/CD pipeline for building and deploying
- Versioned documentation for supported releases

## Migration Phases

### Phase 1: Inventory (Week 1-2)
- [ ] Catalog all existing documentation
- [ ] Identify duplicate and outdated content
- [ ] Prioritize content by page views and support tickets
- [ ] Create content mapping from old to new structure

### Phase 2: Structure Design (Week 3-4)
- [ ] Define information architecture
- [ ] Create navigation structure
- [ ] Design templates for each content type
- [ ] Set up static site generator

### Phase 3: Content Migration (Week 5-8)
- [ ] Migrate top 20 most-viewed pages
- [ ] Rewrite outdated content
- [ ] Add missing code examples
- [ ] Create redirects from old URLs

### Phase 4: Review and Launch (Week 9-10)
- [ ] Technical review of all migrated content
- [ ] User testing with 5-10 community members
- [ ] Broken link check
- [ ] SEO audit
- [ ] Launch new documentation site

### Phase 5: Post-Launch (Week 11-12)
- [ ] Monitor analytics and search queries
- [ ] Address user feedback
- [ ] Deprecate old documentation sources
- [ ] Set up ongoing maintenance process
```

---

## Appendix I: Documentation Style Guide Template

```markdown
# Documentation Style Guide

## Voice and Tone

- **Voice:** Authoritative but friendly. We know our stuff, but we are approachable.
- **Tone:** Professional, clear, and helpful. Avoid jargon unless explained.
- **Person:** Second person ("you"). The user is the hero of the story.

## Writing Principles

1. **Be concise.** Every word should earn its place. Cut unnecessary modifiers.
2. **Be specific.** Prefer concrete examples over abstract descriptions.
3. **Be helpful.** Anticipate questions and confusion before they happen.
4. **Be consistent.** Use the same terminology everywhere.

## Formatting Rules

### Headings
- Use sentence case for headings (not Title Case)
- H1 for page title only
- H2 for major sections
- H3 for subsections
- H4 for sub-subsections (rarely needed)
- Headings should not end with punctuation

### Lists
- Use bullet lists for unordered items
- Use numbered lists for sequential steps
- Capitalize the first word of each list item
- End list items with period only if they are complete sentences

### Code
- Inline code: use backticks for commands, filenames, variables, APIs
- Code blocks: specify language for syntax highlighting
- Show command output where helpful
- Comments in code should explain the "why," not the "what"

### Links
- Use descriptive link text, not "click here"
- Example: "See the installation guide" not "Click here for installation"
- External links should open in same tab (user choice)

### Images
- Every image must have descriptive alt text
- Use PNG for screenshots, SVG for diagrams
- Keep image width under 800px
- Annotate screenshots to highlight relevant areas
- Include captions for complex images

### Tables
- Use tables for structured data only
- Keep tables simple (avoid merged cells)
- Left-align text columns, right-align numbers
- Tables should be readable without horizontal scrolling

## Terminology

| Term | Usage | Avoid |
|---|---|---|
| API | Acceptable on first use, no expansion needed | Application Programming Interface |
| CLI | Acceptable on first use, no expansion needed | Command-line interface (spell out if unclear) |
| SDK | Acceptable on first use, no expansion needed | Software Development Kit |
| Plugin | Use for all extendable components | Add-on, extension (pick one) |

## Inclusive Language Standards

- Use they/them as singular pronoun
- Avoid ableist language (sanity check, crazy, dumb)
- Use allow list/deny list instead of whitelist/blacklist
- Use primary/replica instead of master/slave
- Use staff/workforce instead of manpower
- Use chair instead of chairman

## Technical Writing Checklist

Before publishing any documentation page:
- [ ] Is the purpose of this page clear from the title?
- [ ] Does the first paragraph tell the reader what they will learn?
- [ ] Are there clear prerequisites listed?
- [ ] Are there runnable code examples?
- [ ] Is the content scannable (headings, lists, tables)?
- [ ] Are all terms defined?
- [ ] Is every image properly alt-texted?
- [ ] Are all links descriptive and working?
- [ ] Has the page been spell-checked?
- [ ] Has Vale been run on the content?
```

---

## Appendix J: Common Documentation Anti-Patterns

| Anti-Pattern | Description | Fix |
|---|---|---|
| The Empty Page | A doc page exists but says "Coming soon" | Remove the page or write real content |
| The Wall of Text | No headings, no breaks, no structure | Add headings, lists, tables, code blocks |
| The Assumption Trap | "Simply install the package" without steps | Spell out every step explicitly |
| The Copy-Paste Graveyard | Docs copied from another project with names not changed | Write original content for your project |
| The Firehose | All information about a topic on one page | Split into progressive disclosure pages |
| The Dead Link | Links to pages that no longer exist | Run link checkers in CI |
| The Vanishing Act | Feature exists but no documentation | Open a docs issue when releasing features |
| The Moving Target | Docs that change behavior without notice | Version documentation alongside code |
| The One True Way | Only one approach documented | Show alternatives where they exist |
| The Hidden Gem | Important information buried in a blog post | Surface it in the official docs |
| The Jargon Jungle | Acronyms without definition | Define all acronyms on first use |
| The Echo Chamber | Docs that repeat the code itself without explanation | Explain the why, not just the what |

---

## Appendix K: Documentation for Different Project Sizes

### Solo Project (1 maintainer)
- README.md: Essential
- CONTRIBUTING.md: Simple (even if only for yourself)
- LICENSE: Required
- CHANGELOG.md: Helpful

### Small Team (2-5 maintainers, 100-1000 stars)
- README.md: Detailed, badges, quick start
- CONTRIBUTING.md: Development setup, PR workflow
- LICENSE, CODE_OF_CONDUCT.md, SECURITY.md: Required
- CHANGELOG.md: Keep a Changelog format
- docs/ folder: Getting started, configuration guide
- Basic API reference: Auto-generated

### Growing Project (5-20 maintainers, 1000-10000 stars)
- Full documentation site (Docusaurus or MkDocs)
- CONTRIBUTING.md with detailed setup
- GOVERNANCE.md if multiple maintainers
- ADR records for architectural decisions
- Migration guides between major versions
- Tutorial for common workflows
- i18n for at least one additional language
- CI pipeline for docs with linting, link checking

### Large Project or Foundation (20+ maintainers, 10000+ stars)
- Professional documentation site with custom design
- Documentation team or dedicated maintainers
- Multiple language translations
- Interactive examples and tutorials
- Video content and webinars
- Certified documentation program
- Regular documentation audits and metrics tracking
- Community documentation contribution program
- Style guide and documentation standards document
- Multi-version documentation for all supported releases

---

## Appendix L: Documentation Tools Quick Reference

### Markdown Editors

| Tool | Platform | Price | Features |
|---|---|---|---|
| VS Code | All | Free | Extensions for linting, preview, spell check |
| Obsidian | All | Free | Knowledge graph, backlinks, plugins |
| Typora | Win/Mac/Linux | Paid | Live preview, clean interface |
| Mark Text | Win/Mac/Linux | Free | Open source, live preview |
| Notion | All | Free/Paid | Collaborative, databases, templates |
| HackMD | Web | Free/Paid | Collaborative real-time editing |
| StackEdit | Web | Free | Browser-based, sync with cloud |

### Diagram Tools

| Tool | Type | Price | Integration |
|---|---|---|---|
| Mermaid | Code | Free | GitHub, GitLab, most SSGs |
| PlantUML | Code | Free | Many plugins available |
| Draw.io | GUI | Free | VS Code, Confluence, web |
| Excalidraw | GUI | Free | Hand-drawn style, collaborative |
| Diagrams.net | GUI | Free | VS Code, Confluence |
| Lucidchart | GUI | Paid | Enterprise features |
| Figma | GUI | Free/Paid | Design-focused, prototyping |

### Screenshot & Recording

| Tool | Platform | Price | Features |
|---|---|---|---|
| Snagit | Win/Mac | Paid | Annotations, video, scrolling capture |
| CleanShot X | Mac | Paid | Scrolling capture, OCR, cloud upload |
| Greenshot | Win | Free | Open source, annotations |
| Flameshot | Linux | Free | Open source, annotations |
| Shottr | Mac | Paid | Scrolling capture, OCR, text removal |
| OBS Studio | All | Free | Video recording, streaming |
| Kap | Mac | Free | GIF recording |
| LICEcap | Win/Mac | Free | GIF screen capture |

### Search & Analytics

| Tool | Type | Price | Features |
|---|---|---|---|
| Algolia DocSearch | Search | Free for OSS | Fast, typo-tolerant, analytics |
| Meilisearch | Search | Self-hosted free | Open source, fast, REST API |
| Typesense | Search | Self-hosted free | Open source, typo-tolerant |
| Lunr.js | Search | Free | Client-side search, no server needed |
| Google Analytics | Analytics | Free | Page views, user behavior, search queries |
| Plausible | Analytics | Paid | Privacy-focused, lightweight |
| Fathom | Analytics | Paid | Privacy-focused, simple |
| Umami | Analytics | Self-hosted free | Open source, privacy-focused |

---

## Appendix M: Frequently Asked Questions About OSS Documentation

### General Questions

**Q: How much documentation is enough?**

A: Enough that a new user can get started in under 5 minutes and a new contributor can set up their environment in under 30 minutes. Beyond that, prioritize documentation for features that generate the most support questions.

**Q: Should I document before or after writing code?**

A: For public APIs, document before (or alongside). For internal implementation, document during or after. Architecture decisions should always be documented before implementation.

**Q: How do I get contributors to write documentation?**

A: Make it easy: provide templates, have a low barrier for doc-only PRs, celebrate doc contributors in release notes, and run documentation sprints.

**Q: Should I use a wiki or docs-as-code?**

A: Docs-as-code almost always wins for projects more complex than a single README. Wikis lack version control, review processes, and CI validation.

### Tooling Questions

**Q: Docusaurus vs MkDocs: which should I choose?**

A: If your team primarily uses JavaScript/React, choose Docusaurus. If Python, choose MkDocs. For highly customized sites, Docusaurus offers more flexibility. For quick setup, MkDocs is faster.

**Q: Do I need a separate documentation site?**

A: Once your README exceeds 200 lines or you have more than 3 pages of documentation, yes. A dedicated site provides search, navigation, versioning, and better organization.

**Q: What is the most important CI check for docs?**

A: Broken link checking. Nothing erodes trust faster than clicking a link and getting a 404. Second most important: build validation (the site can actually build).

### Maintenance Questions

**Q: How often should I update documentation?**

A: At minimum, review every page every 6 months. Update immediately when code changes affect documented behavior. Major releases should trigger full documentation review.

**Q: How do I handle documentation for multiple versions?**

A: Use versioned documentation (Docusaurus built-in, mike for MkDocs, branches for Sphinx). Keep old versions available but clearly labeled. Redirect users to the latest version by default.

**Q: What do I do with documentation for removed features?**

A: Mark as deprecated with a removal date, then either remove (for minor features) or archive with a prominent notice (for major features). Never delete without providing a migration path.

**Q: How do I measure documentation success?**

A: Track: time-to-answer for common tasks, search analytics (zero-result queries), user feedback ("Was this helpful?"), documentation coverage percentage, and support ticket deflection rate.

### Community Questions

**Q: How do I handle non-English documentation contributions?**

A: Use a translation management platform like Crowdin or Weblate. Start with one additional language and expand based on community interest and available translators.

**Q: Should I accept documentation PRs without code changes?**

A: Absolutely. Documentation-only PRs are often the best way for new contributors to get involved. Celebrate them.

**Q: How do I deal with imposter syndrome about my own documentation?**

A: Perfect documentation is the enemy of good documentation. Ship early, iterate based on feedback, and remember that even basic documentation is better than none.

---

## Appendix N: Documentation Maturity Self-Assessment

Rate your project on each dimension from 1 (lowest) to 5 (highest).

### Reach
- [ ] 1: README only
- [ ] 2: README + CONTRIBUTING
- [ ] 3: Documentation site with multiple pages
- [ ] 4: Versioned documentation + translations
- [ ] 5: Multi-format (docs, video, interactive, API reference)

### Freshness
- [ ] 1: No update date on any page
- [ ] 2: Some pages have dates, most are old
- [ ] 3: Most pages updated within 6 months
- [ ] 4: Pages show last-updated dates automatically
- [ ] 5: Automated freshness checks in CI

### Accuracy
- [ ] 1: No verification process
- [ ] 2: Manual review occasionally
- [ ] 3: Code examples tested manually before releases
- [ ] 4: Automated doctests for code examples
- [ ] 5: Full CI pipeline validates documentation against code

### Findability
- [ ] 1: No search, no navigation
- [ ] 2: Basic table of contents
- [ ] 3: Search function available
- [ ] 4: Good search with analytics
- [ ] 5: Excellent search, cross-references, and related content

### Community
- [ ] 1: No documentation contributions
- [ ] 2: Maintainers write all docs
- [ ] 3: Occasional community doc contributions
- [ ] 4: Active doc contribution community
- [ ] 5: Dedicated documentation team or SIG

### Total Score
- 5-10: Needs significant improvement
- 11-15: Needs moderate improvement
- 16-20: On the right track
- 21-25: Documentation leader

---

## Appendix O: Books and Resources for Further Learning

### Books
- *Docs for Developers* by Jared Bhatti et al.
- *Modern Technical Writing* by Andrew Etter
- *The Product is Docs* by Christopher Gales and the Splunk Documentation Team
- *Every Page is Page One* by Mark Baker
- *Letting Go of the Words* by Ginny Redish
- *Developing Quality Technical Information* by Gretchen Hargis et al.
- *Technical Writing Process* by Kieran Morgan

### Online Courses
- Google Technical Writing Courses (free)
- Write the Docs conferences and resources
- GitHub Documentation Community of Practice
- Documenting APIs: A Guide for Technical Writers (Idratherbewriting.com)

### Communities
- Write the Docs (writethedocs.org)
- The Good Docs Project (thegooddocsproject.dev)
- Documenting APIs community
- GitHub Docs Community
- CNCF Technical Documentation SIG

### Tools and Templates
- Keep a Changelog (keepachangelog.com)
- Semantic Versioning (semver.org)
- Conventional Commits (conventionalcommits.org)
- Contributor Covenant (contributor-covenant.org)
- Open Source Guides (opensource.guide)
- The Good Docs Project Templates

---

This universal reference document was compiled from industry best practices, community standards, and lessons learned from hundreds of open source projects. It is released under CC0-1.0 (public domain) so that it can be freely used, adapted, and shared across the open source ecosystem.
