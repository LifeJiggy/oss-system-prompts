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
- [File Index](#file-index)
- [Categories](#categories)
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

### Features

- **32 role-specific prompts** covering all aspects of OSS development
- **1500+ lines per file** of detailed guidance, patterns, and examples
- **Multi-language support** - Python, JavaScript, TypeScript, Shell, Go, Rust, and more
- **Production-ready patterns** based on real-world open source practices
- **Comprehensive checklists** for task completion and quality assurance
- **Chapter-based structure** with practical code examples
- **FAQ sections** with common questions and answers

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

---

## File Index

### Core Development Roles

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [architect-Pro.md](architect-Pro.md) | System Architect | System design and architectural decisions | 1547 |
| [Contributor-Pro.md](Contributor-Pro.md) | Contributor | General contribution guidelines | 1709 |
| [Reveiwer-Pro.md](Reveiwer-Pro.md) | Code Reviewer | Code review fundamentals | 1500+ |
| [Maintainer-Pro.md](Maintainer-Pro.md) | Project Maintainer | Project maintenance and governance | 1706 |

### Language-Specific Contributors

| File | Role | Language | Lines |
|------|------|----------|-------|
| [Contributor-Python-Pro.md](Contributor-Python-Pro.md) | Python Contributor | Python projects, PEP standards | 1850+ |
| [Contributor-JavaScript-Pro.md](Contributor-JavaScript-Pro.md) | JavaScript Contributor | JavaScript/TypeScript/Node.js | 1623 |
| [Contributor-Shell-Pro.md](Contributor-Shell-Pro.md) | Shell Contributor | Bash/Shell/POSIX scripts | 1500+ |

### Build Systems

| File | Role | Language/Ecosystem | Lines |
|------|------|---------------------|-------|
| [Python-Build-Pro.md](Python-Build-Pro.md) | Python Build Engineer | setuptools, Poetry, pyinstaller | 1922 |
| [JavaScript-Build-Pro.md](JavaScript-Build-Pro.md) | JavaScript Build Engineer | Webpack, Vite, esbuild, Rollup | 1777 |
| [Shell-Build-Pro.md](Shell-Build-Pro.md) | Shell Build Engineer | Make, CMake, shell scripts | 1500+ |

### Code Quality

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Testing-Pro.md](Testing-Pro.md) | QA Engineer | Testing strategies and frameworks | 1927 |
| [Security-Audit-Pro.md](Security-Audit-Pro.md) | Security Auditor | Vulnerability detection | 1560 |
| [CI-CD-Pro.md](CI-CD-Pro.md) | CI/CD Engineer | Pipeline automation | 1791 |
| [Dependency-Pro.md](Dependency-Pro.md) | Dependency Manager | npm, pnpm, yarn, pip, Poetry, uv | 2095 |

### Issue Management

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Issue-finder-Pro.md](Issue-finder-Pro.md) | Bug Hunter | Bug discovery and triage | 1513 |
| [Issue-fixer-Pro.md](Issue-fixer-Pro.md) | Bug Fixer | Debugging and fixing strategies | 1582 |

### Pull Request Workflow

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [PR-Reveiwer-Pro.md](PR-Reveiwer-Pro.md) | PR Reviewer | PR review process and feedback | 1588 |
| [PR-Merger-Pro.md](PR-Merger-Pro.md) | PR Merger | PR integration and merging | 1500+ |

### Feature Development

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [High-frequence-features-Pro.md](High-frequence-features-Pro.md) | Feature Developer | High-frequency feature development | 1538 |
| [Low-frequence-features-Pro.md](Low-frequence-features-Pro.md) | Feature Developer | Low-frequency/edge case features | 1725 |

### Release & Versioning

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Versioning-Pro.md](Versioning-Pro.md) | Version Manager | Semantic versioning patterns | 1554 |
| [Release-Manager-Pro.md](Release-Manager-Pro.md) | Release Manager | Release coordination | 1468 |
| [Multi-branch-handling-Pro.md](Multi-branch-handling-Pro.md) | Git Specialist | Branch management | 1552 |

### Documentation

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Documentation-Pro.md](Documentation-Pro.md) | Technical Writer | Documentation standards | 1612 |

### Governance & Community

| File | Role | Description | Lines |
|------|------|-------------|-------|
| [Governance-Pro.md](Governance-Pro.md) | Governance Lead | Project governance | 1548 |
| [Community-Manager-Pro.md](Community-Manager-Pro.md) | Community Manager | Community building | 1599 |
| [Support-Manager-Pro.md](Support-Manager-Pro.md) | Support Manager | User support | 1587 |
| [Onboarding-Pro.md](Onboarding-Pro.md) | Onboarding Lead | New contributor onboarding | 1500+ |
| [Mentor-Pro.md](Mentor-Pro.md) | OSS Mentor | Contributor mentorship | 1700 |

### Quick Reference

| File | Description | Lines |
|------|-------------|-------|
| [github-commands.md](github-commands.md) | GitHub CLI commands reference | - |
| [branch-workflow.md](branch-workflow.md) | Git branch workflow patterns | - |

**Total Files:** 32+ system prompts  
**Total Lines:** 55,000+

---

## Categories

### Language-Specific Contributions

| File | Language | Description |
|------|----------|-------------|
| [Contributor-Python-Pro.md](Contributor-Python-Pro.md) | Python | PEP standards, Poetry, pytest, virtualenv |
| [Contributor-JavaScript-Pro.md](Contributor-JavaScript-Pro.md) | JavaScript | ES modules, TypeScript, Node.js, React |
| [Contributor-Shell-Pro.md](Contributor-Shell-Pro.md) | Shell | Bash, POSIX, Makefiles, CMake |

### Build Systems by Language

| File | Language | Description |
|------|----------|-------------|
| [Python-Build-Pro.md](Python-Build-Pro.md) | Python | setuptools, Poetry, pyinstaller, wheel |
| [JavaScript-Build-Pro.md](JavaScript-Build-Pro.md) | JavaScript | Webpack, Vite, esbuild, Rollup |
| [Shell-Build-Pro.md](Shell-Build-Pro.md) | Shell | Make, CMake, shell automation |

### Core Development

| File | Description |
|------|-------------|
| [architect-Pro.md](architect-Pro.md) | System design, architectural decisions, patterns |
| [Contributor-Pro.md](Contributor-Pro.md) | General contribution guidelines |
| [Reveiwer-Pro.md](Reveiwer-Pro.md) | Code review fundamentals |
| [Maintainer-Pro.md](Maintainer-Pro.md) | Project maintenance, governance |

### Code Quality

| File | Description |
|------|-------------|
| [Testing-Pro.md](Testing-Pro.md) | Testing strategies and frameworks |
| [Security-Audit-Pro.md](Security-Audit-Pro.md) | Security vulnerability detection |
| [CI-CD-Pro.md](CI-CD-Pro.md) | CI/CD pipelines |
| [Dependency-Pro.md](Dependency-Pro.md) | Multi-ecosystem package management |

### Issue & Pull Request

| File | Description |
|------|-------------|
| [Issue-finder-Pro.md](Issue-finder-Pro.md) | Bug discovery and triage |
| [Issue-fixer-Pro.md](Issue-fixer-Pro.md) | Debugging and fixing |
| [PR-Reveiwer-Pro.md](PR-Reveiwer-Pro.md) | PR review process |
| [PR-Merger-Pro.md](PR-Merger-Pro.md) | PR integration |

### Release & Versioning

| File | Description |
|------|-------------|
| [Versioning-Pro.md](Versioning-Pro.md) | Semantic versioning |
| [Release-Manager-Pro.md](Release-Manager-Pro.md) | Release coordination |
| [Multi-branch-handling-Pro.md](Multi-branch-handling-Pro.md) | Git workflows, branch management |

### Governance & Community

| File | Description |
|------|-------------|
| [Governance-Pro.md](Governance-Pro.md) | Project governance |
| [Community-Manager-Pro.md](Community-Manager-Pro.md) | Community building |
| [Mentor-Pro.md](Mentor-Pro.md) | Contributor mentorship |
| [Onboarding-Pro.md](Onboarding-Pro.md) | New contributor onboarding |
| [Support-Manager-Pro.md](Support-Manager-Pro.md) | User support |

### Feature Development

| File | Description |
|------|-------------|
| [High-frequence-features-Pro.md](High-frequence-features-Pro.md) | Common feature development |
| [Low-frequence-features-Pro.md](Low-frequence-features-Pro.md) | Edge case and rare features |

### Documentation

| File | Description |
|------|-------------|
| [Documentation-Pro.md](Documentation-Pro.md) | Technical writing, API docs |

### Quick Reference

| File | Description |
|------|-------------|
| [github-commands.md](github-commands.md) | GitHub CLI command reference |
| [branch-workflow.md](branch-workflow.md) | Branch workflow patterns |

---

## Usage

### How to Use These Prompts

These system prompts are designed to be used with AI assistants (like Claude, GPT-4, or others) to get role-specific guidance for OSS development tasks.

#### Quick Start

1. **Pick a prompt** based on your task (see [File Index](#file-index))
2. **Paste it** as your system prompt or instructions
3. **Ask questions** specific to that role
4. **Get detailed guidance** with code examples and best practices

#### Example Usage

```bash
# Want to contribute Python code?
Use: Contributor-Python-Pro.md

# Need to set up CI/CD?
Use: CI-CD-Pro.md

# Want to review a PR?
Use: PR-Reveiwer-Pro.md
```

#### Integration Methods

| Method | Use Case |
|--------|----------|
| **Full prompt** | Copy entire file as system prompt for comprehensive guidance |
| **Chapter extract** | Use specific chapters for focused tasks (e.g., just the testing chapter) |
| **Template base** | Customize placeholders for your project's specific needs |
| **Reference** | Use as lookup when working on specific OSS tasks |

#### Common Workflows

```markdown
# Setting up a Python build system
System: Use Python-Build-Pro.md
Ask: "How do I set up Poetry for packaging?"

# Contributing to a JavaScript project
System: Use Contributor-JavaScript-Pro.md
Ask: "What's the process for submitting a PR with tests?"

# Conducting a security audit
System: Use Security-Audit-Pro.md
Ask: "What should I look for in a code audit?"
```

### What Each Prompt Provides

Each prompt includes:
- Role definition and responsibilities
- Comprehensive frameworks with 15-25 chapters
- Practical code examples in multiple languages
- Best practices and common patterns
- FAQ sections with real questions
- Checklists for task completion
- Debugging and troubleshooting guidance

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
#### Section
Content with code examples, patterns, best practices.

### CHAPTER 2: [Topic 2]
...

### CHAPTER N: Final Topics
#### Checklist
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
