# OSS Development System Prompts

> A comprehensive collection of 1500+ line system prompts for Open Source Software development roles.

A production-ready system prompt collection for AI-assisted OSS development. Each prompt provides detailed, actionable guidance with code examples, patterns, and best practices.

[![Total Prompts](https://img.shields.io/badge/total-prompts-32-blue.svg)](.)
[![Min Lines](https://img.shields.io/badge/minimum-lines-1500-green.svg)](.)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [File Index](#file-index)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

---

## Overview

This repository contains role-specific system prompts for AI-assisted Open Source Software development. Each prompt file provides comprehensive, actionable guidance for specific OSS activities across multiple programming languages and ecosystems.

### What This Is

A comprehensive library of 32 system prompts designed for AI assistants working on open source projects. Each prompt is 1500+ lines of practical, production-ready guidance covering:
- Code contribution patterns for multiple languages
- Build system configuration and automation
- Security, testing, and CI/CD best practices
- Issue management and pull request workflows
- Release management and versioning strategies
- Community governance and mentorship

This is not just a collection of guidelines - it's a complete **AI-powered development workflow system** that helps developers, maintainers, and contributors navigate every aspect of open source software development with expert-level guidance.

### Advanced Features

#### 🤖 AI-Powered Role System
- Each system prompt transforms your AI assistant into a specialized expert
- Roles include: Architect, Contributor, Reviewer, Maintainer, Security Auditor, Release Manager, and 25+ more
- Context-aware guidance that adapts to your specific task

#### 📚 Deep Knowledge Base
- 1500+ lines per prompt with real-world patterns
- Multi-language support: Python, JavaScript, TypeScript, Shell, Go, Rust
- Chapter-based structure with 15-25 chapters per file
- Code examples in multiple languages

#### 🔄 Complete Workflow Automation
- **Pre-development:** Issue finding, triage, and planning
- **During development:** Code contribution, testing, security scanning
- **Post-development:** PR reviewing, merging, release management
- **Post-release:** Community support, governance, mentorship

#### 🛡️ Enterprise-Grade Quality
- Comprehensive security audit workflows
- CI/CD pipeline templates
- Dependency management across multiple ecosystems
- Compliance and governance frameworks

#### 📋 Smart Templates
- 32+ PR templates (Python scripts, JavaScript scripts, Markdown)
- Platform-specific usage (Windows, macOS, Linux)
- Validation functions for automated checks
- 200+ lines per Markdown template

#### 🎯 Specialized Workflows

| Workflow | Description |
|----------|-------------|
| **Security-First Development** | Threat modeling, vulnerability scanning, secure coding patterns |
| **Test-Driven Development** | Unit, integration, E2E testing strategies with coverage tracking |
| **Multi-Platform Release** | Semantic versioning, changelog generation, multi-ecosystem publishing |
| **Community Building** | Onboarding, mentorship, governance, conflict resolution |
| **Code Quality Gate** | Linting, type checking, security scanning, performance benchmarks |
| **Incident Response** | Bug finding, root cause analysis, fix validation, rollback procedures |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Lifejiggy/oss-system-prompts.git
cd oss-system-prompts

# List all available prompts
ls -la *.md

# Find a specific role
ls | grep -i reviewer
```

## Using the Guides

Each folder contains a `guide.yaml` with step-by-step usage instructions:

```bash
# View a guide
cat Core-Development-Roles/guide.yaml
cat Build-Systems/guide.yaml
cat Code-Quality/guide.yaml
```

Guides provide:
- Gated step-by-step workflows
- Reference to files in each folder
- Integration patterns
- Troubleshooting tips

---

## Folder Structure

```
oss-system-prompts/
├── core/                              # Core contribution workflow knowledge base
│   ├── README.md                      # Core knowledge base overview
│   ├── rule.md                        # Comprehensive rulebook
│   ├── blockage.md                    # Anti-pattern collection
│   ├── guide.md                       # Step-by-step PR workflow
│   ├── checklist.md                   # Pre-submission verification
│   ├── patterns.md                    # Multi-language code patterns
│   ├── flop.md                        # Real failure documentation
│   ├── reputation-trust.md            # Trust-building guide
│   ├── review-response.md             # Review communication guide
│   └── ... (24 files total)
│
├── Core-Development-Roles/            # Core development role prompts
│   ├── architect-Pro.md               # System Architect
│   ├── Contributor-Pro.md             # Contributor
│   ├── Maintainer-Pro.md              # Project Maintainer
│   ├── Reveiwer-Pro.md                # Code Reviewer
│   └── guide.yaml                     # Usage guide
│
├── Language-Specific-Contributors/    # Language-specific prompts
│   ├── Contributor-Python-Pro.md      # Python Contributor
│   ├── Contributor-JavaScript-Pro.md  # JavaScript Contributor
│   ├── Contributor-Shell-Pro.md       # Shell Contributor
│   └── guide.yaml                     # Usage guide
│
├── Build-Systems/                     # Build system prompts
│   ├── Python-Build-Pro.md            # Python Build Engineer
│   ├── JavaScript-Build-Pro.md        # JavaScript Build Engineer
│   ├── Shell-Build-Pro.md             # Shell Build Engineer
│   └── guide.yaml                     # Usage guide
│
├── Code-Quality/                      # Code quality prompts
│   ├── Testing-Pro.md                 # QA Engineer
│   ├── Security-Audit-Pro.md          # Security Auditor
│   ├── CI-CD-Pro.md                   # CI/CD Engineer
│   ├── Dependency-Pro.md              # Dependency Manager
│   └── guide.yaml                     # Usage guide
│
├── Issue-Management/                  # Issue management prompts
│   ├── Issue-finder-Pro.md            # Bug Hunter
│   ├── Issue-fixer-Pro.md             # Bug Fixer
│   └── guide.yaml                     # Usage guide
│
├── Pull-Request-Workflow/             # PR workflow prompts
│   ├── PR-Reveiwer-Pro.md             # PR Reviewer
│   ├── PR-Merger-Pro.md               # PR Merger
│   └── guide.yaml                     # Usage guide
│
├── Feature Development/               # Feature development prompts
│   ├── High-frequence-features-Pro.md # Feature Developer
│   ├── Low-frequence-features-Pro.md  # Edge case features
│   └── Tool-Calling-MCP-Integration.md
│
├── Release & Versioning/            # Release and versioning prompts
│   ├── Versioning-Pro.md              # Version Manager
│   ├── Release-Manager-Pro.md         # Release Manager
│   ├── Multi-branch-handling-Pro.md   # Git Specialist
│   └── guide.yaml                     # Usage guide
│
├── Governance-&-Community/            # Governance and community prompts
│   ├── Governance-Pro.md              # Governance Lead
│   ├── Community-Manager-Pro.md       # Community Manager
│   ├── Mentor-Pro.md                  # OSS Mentor
│   ├── Onboarding-Pro.md              # Onboarding Lead
│   ├── Support-Manager-Pro.md         # Support Manager
│   └── guide.yaml                     # Usage guide
│
├── Documentation/                     # Documentation prompts
│   └── Documentation-Pro.md           # Technical Writer
│   └── guide.yaml                     # Usage guide
│
├── Feature Development/               # Feature development prompts
│   ├── High-frequence-features-Pro.md # Feature Developer
│   ├── Low-frequence-features-Pro.md  # Edge case features
│   └── Tool-Calling-MCP-Integration.md
│
├── Quick-Reference-Commands/          # Quick reference files
│   ├── github-commands.md             # GitHub CLI commands
│   └── branch-workflow.md             # Git branch workflow
│   └── guide.yaml                     # Usage guide
│
├── PR-Templates/                      # Pull request templates
│   ├── PY/                            # Python scripts (7 files)
│   ├── JS/                            # JavaScript scripts (7 files)
│   ├── Templates/                     # Markdown templates (29 files)
│   ├── README.md                      # PR Templates documentation
│   └── guide.yaml                     # Usage guide
│
└── Walkthrough/                       # Walkthrough guides
    └── README.md
    └── guide.yaml                       # Usage guide
```

## File Index

### Core Development Roles

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [architect-Pro.md](Core-Development-Roles/architect-Pro.md) | System Architect | System design and architectural decisions | 1547 |
| [Contributor-Pro.md](Core-Development-Roles/Contributor-Pro.md) | Contributor | General contribution guidelines | 1709 |
| [Reveiwer-Pro.md](Core-Development-Roles/Reveiwer-Pro.md) | Code Reviewer | Code review fundamentals | 1500+ |
| [Maintainer-Pro.md](Core-Development-Roles/Maintainer-Pro.md) | Project Maintainer | Project maintenance and governance | 1706 |

### Language-Specific Contributors

| File | Role | Language | Lines |
|------|------|----------|-------|
| [Contributor-Python-Pro.md](Language-Specific-Contributors/Contributor-Python-Pro.md) | Python Contributor | Python projects, PEP standards | 1850+ |
| [Contributor-JavaScript-Pro.md](Language-Specific-Contributors/Contributor-JavaScript-Pro.md) | JavaScript Contributor | JavaScript/TypeScript/Node.js | 1623 |
| [Contributor-Shell-Pro.md](Language-Specific-Contributors/Contributor-Shell-Pro.md) | Shell Contributor | Bash/Shell/POSIX scripts | 1500+ |

### Build Systems

| File | Role | Language/Ecosystem | Lines |
|------|------|---------------------|-------|
| [Python-Build-Pro.md](Build-Systems/Python-Build-Pro.md) | Python Build Engineer | setuptools, Poetry, pyinstaller | 1922 |
| [JavaScript-Build-Pro.md](Build-Systems/JavaScript-Build-Pro.md) | JavaScript Build Engineer | Webpack, Vite, esbuild, Rollup | 1777 |
| [Shell-Build-Pro.md](Build-Systems/Shell-Build-Pro.md) | Shell Build Engineer | Make, CMake, shell scripts | 1500+ |

### Code Quality

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Testing-Pro.md](Code-Quality/Testing-Pro.md) | QA Engineer | Testing strategies and frameworks | 1927 |
| [Security-Audit-Pro.md](Code-Quality/Security-Audit-Pro.md) | Security Auditor | Vulnerability detection | 1560 |
| [CI-CD-Pro.md](Code-Quality/CI-CD-Pro.md) | CI/CD Engineer | Pipeline automation | 1791 |
| [Dependency-Pro.md](Code-Quality/Dependency-Pro.md) | Dependency Manager | npm, pnpm, yarn, pip, Poetry, uv | 2095 |

### Issue Management

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Issue-finder-Pro.md](Issue-Management/Issue-finder-Pro.md) | Bug Hunter | Bug discovery and triage | 1513 |
| [Issue-fixer-Pro.md](Issue-Management/Issue-fixer-Pro.md) | Bug Fixer | Debugging and fixing strategies | 1582 |

### Pull Request Workflow

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [PR-Reveiwer-Pro.md](Pull-Request-Workflow/PR-Reveiwer-Pro.md) | PR Reviewer | PR review process and feedback | 1588 |
| [PR-Merger-Pro.md](Pull-Request-Workflow/PR-Merger-Pro.md) | PR Merger | PR integration and merging | 1500+ |

### Feature Development

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [High-frequence-features-Pro.md](Feature Development/High-frequence-features-Pro.md) | Feature Developer | High-frequency feature development | 1538 |
| [Low-frequence-features-Pro.md](Feature Development/Low-frequence-features-Pro.md) | Feature Developer | Low-frequency/edge case features | 1725 |

### Release & Versioning

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Versioning-Pro.md](Release & Versioning/Versioning-Pro.md) | Version Manager | Semantic versioning patterns | 1554 |
| [Release-Manager-Pro.md](Release & Versioning/Release-Manager-Pro.md) | Release Manager | Release coordination | 1468 |
| [Multi-branch-handling-Pro.md](Release & Versioning/Multi-branch-handling-Pro.md) | Git Specialist | Branch management | 1552 |

### Documentation

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Documentation-Pro.md](Documentation/Documentation-Pro.md) | Technical Writer | Documentation standards | 1612 |

### Governance & Community

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Governance-Pro.md](Governance-&-Community/Governance-Pro.md) | Governance Lead | Project governance | 1548 |
| [Community-Manager-Pro.md](Governance-&-Community/Community-Manager-Pro.md) | Community Manager | Community building | 1599 |
| [Mentor-Pro.md](Governance-&-Community/Mentor-Pro.md) | OSS Mentor | Contributor mentorship | 1700 |
| [Onboarding-Pro.md](Governance-&-Community/Onboarding-Pro.md) | Onboarding Lead | New contributor onboarding | 1500+ |
| [Support-Manager-Pro.md](Governance-&-Community/Support-Manager-Pro.md) | Support Manager | User support | 1587 |

### Task Management

| File | Purpose |
|------|---------|
| task-docs.md | Documentation tasks |
| task-enhance.md | Enhancement tasks |
| task-feat.md | Feature development tasks |
| task-fix.md | Bug fixing tasks |
| task-governance.md | Governance tasks |
| task-release.md | Release tasks |
| task-review.md | Review tasks |

### Quick Reference

| File | Description |
|------|-------------|
| [github-commands.md](Quick-Reference-Commands/github-commands.md) | GitHub CLI commands reference |
| [branch-workflow.md](Quick-Reference-Commands/branch-workflow.md) | Git branch workflow patterns |

**Total Files:** 32+ system prompts + 9 guide.yaml files
**Total Lines:** 55,000+

---

## Usage

These system prompts are designed to be used with AI assistants (like Claude, GPT-4, or others) to get role-specific guidance for OSS development tasks.

### Quick Start

1. **Pick a prompt** based on your task (see [File Index](#file-index))
2. **Paste it** as your system prompt or instructions
3. **Ask questions** specific to that role
4. **Get detailed guidance** with code examples and best practices

### Example Usage

```bash
# Want to contribute Python code?
Use: Core-Development-Roles/Contributor-Python-Pro.md

# Need to set up CI/CD?
Use: Code-Quality/CI-CD-Pro.md

# Want to review a PR?
Use: Pull-Request-Workflow/PR-Reveiwer-Pro.md
```

### Integration Methods

| Method | Use Case |
|--------|----------|
| **Full prompt** | Copy entire file as system prompt for comprehensive guidance |
| **Chapter extract** | Use specific chapters for focused tasks (e.g., just the testing chapter) |
| **Template base** | Customize placeholders for your project's specific needs |
| **Reference** | Use as lookup when working on specific OSS tasks |

---

## Development

### File Structure Convention

Each system prompt follows a consistent chapter-based structure:

```markdown
# Title

> Tagline. Brief Description.

---

## IDENTITY

Role definition and responsibilities.

## COMPREHENSIVE [Topic] FRAMEWORK

### CHAPTER 1: [Topic 1]
## Section
Content with code examples, patterns, best practices.

### CHAPTER 2: [Topic 2]
...

### CHAPTER N: Final Topics
## Checklist
- [ ] Task 1
- [ ] Task 2

---

## SUMMARY

### Key Success Metrics
- [ ] Metric 1
- [ ] Metric 2

---

## FINAL DIRECTIVE

Brief closing directive.

*End of file*
```

### Quality Standards

- **Minimum 1500 lines** per file (all files meet this)
- **Code examples** in multiple languages (Python, JavaScript, Shell, etc.)
- **Real-world patterns** and anti-patterns
- **Comprehensive checklists** for task completion
- **Beginner to advanced** coverage
- **FAQ sections** with common questions

### Adding New Prompts

1. Follow the chapter-based structure above
2. Include practical code examples (at least 10-15 examples)
3. Add FAQ sections with common questions
4. Maintain consistent formatting
5. Target 1500+ lines
6. Include comprehensive checklist at the end
7. Add summary and final directive sections

---

## Contributing

Contributions are welcome. Please read our guidelines and submit PRs for new prompts or updates.

---

## License

This project is licensed under the MIT License.

---

*Built for the open source community.*