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
- [PR Templates](#pr-templates)
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

## PR Templates

This folder contains ready-to-use PR templates for all 32 system prompts. Use these templates when submitting pull requests for each role type.

### Advanced Template Features

#### 🚀 Automated Validation
Each Python/JavaScript template includes validation functions:
- File type validation
- Change categorization
- Security scanning
- Coverage calculation

#### 🔧 Programmatic Generation
Generate PR content programmatically:
```python
# Generate and customize
from features_file import create_file_pr_template, validate_file_changes

# Create template with your data
template = create_file_pr_template()
is_valid = validate_file_changes(['src/module.py'])
```

#### 🎨 Multiple Output Formats
- **Markdown (.md):** Direct copy-paste for GitHub/GitLab PR descriptions
- **Python (.py):** Run scripts to generate, validate, and customize
- **JavaScript (.js):** Node.js scripts for automation pipelines

#### 📊 Template Categories

| Category | Count | Use Case |
|----------|-------|----------|
| Python Scripts | 7 | Generate, validate, automate |
| JavaScript Scripts | 7 | Node.js integration, CI/CD |
| Markdown | 29 | Direct PR description use |

### Folder Structure

```
PR-Templates/
├── PY/                    # Python PR templates (.py scripts)
│   ├── features-file.py
│   ├── features-integration.py
│   ├── features-review.py
│   ├── features-bugfix.py
│   ├── features-refactor.py
│   ├── features-docs.py
│   └── features-tests.py
├── JS/                    # JavaScript PR templates (.js scripts)
│   ├── features-file.js
│   ├── features-integration.js
│   ├── features-review.js
│   ├── features-bugfix.js
│   ├── features-refactor.js
│   ├── features-docs.js
│   └── features-tests.js
├── Templates/             # Markdown templates (200+ lines each)
│   ├── architect-Pro.md
│   ├── Contributor-Pro.md
│   ├── Reveiwer-Pro.md
│   ├── Testing-Pro.md
│   └── ... (29 templates for all system prompts)
└── README.md
```

### Template Types

| Type | Format | Use Case |
|------|--------|----------|
| Python Scripts | `.py` | Run to generate PR templates, validate changes |
| JavaScript Scripts | `.js` | Run to generate PR templates, validate changes |
| Markdown | `.md` | Copy-paste directly into PR description |

### Python Templates (PY/)

Run these scripts to generate and validate PR content:

```bash
# Generate PR template
python PR-Templates/PY/features-file.py

# Validate changes
python -c "from PR_Templates.PY.features_file import validate_file_changes"
```

### JavaScript Templates (JS/)

Run these scripts to generate and validate PR content:

```bash
# Generate PR template
node PR-Templates/JS/features-file.js

# Validate changes
node -e "require('./PR_Templates/JS/features-file').validateFileChanges(['file.py'])"
```

### Markdown Templates (Templates/)

Each template is 200+ lines with comprehensive sections:

- **PR Overview** - Summary, type, priority
- **Changes Details** - Files, dependencies, breaking changes
- **Testing** - Test commands, results, coverage
- **Checklists** - Pre-merge, post-merge, security
- **Documentation** - Required updates, new docs
- **Approval** - Required reviewers, approvers

### Quick Template Selection

| Need | Template |
|------|----------|
| Bug fix | `Templates/Issue-fixer-Pro.md` or `PY/features-bugfix.py` |
| New feature | `Templates/High-frequence-features-Pro.md` or `PY/features-integration.py` |
| Code review | `Templates/Reveiwer-Pro.md` or `PY/features-review.py` |
| Documentation | `Templates/Documentation-Pro.md` or `PY/features-docs.py` |
| Tests | `Templates/Testing-Pro.md` or `PY/features-tests.py` |
| Refactoring | `Templates/Low-frequence-features-Pro.md` or `PY/features-refactor.py` |

### Usage

1. **Copy from Templates folder:** Open `Templates/[Role]-Pro.md` and copy into your PR description
2. **Use Python/JS scripts:** Run the `.py` or `.js` files to generate templates programmatically
3. **Customize:** Edit placeholders like `<!-- Brief description -->` with your specific details

### Example Workflow

```bash
# 1. Find template for your change type
ls PR-Templates/Templates/

# 2. Copy template to clipboard
cat PR-Templates/Templates/Contributor-Pro.md

# 3. Paste into PR description and fill in details
```

---

## Platform-Specific Usage

### Windows

## Using Python Templates
```powershell
# Open PowerShell or Command Prompt

# Navigate to project folder
cd C:\Path\To\oss-system-prompts

# Generate PR template
python PR-Templates\PY\features-file.py

# Generate and save to file
python PR-Templates\PY\features-bugfix.py > bug-fix-pr.md

# Validate changes
python -c "from PR_Templates.PY.features_file import validate_file_changes; print(validate_file_changes(['test.py']))"
```

## Using JavaScript Templates
```powershell
# Navigate to JS folder
cd PR-Templates\JS

# Generate PR template
node features-file.js

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"

# List all templates
dir
```

## Using Markdown Templates
```powershell
# Open in notepad
notepad PR-Templates\Templates\Contributor-Pro.md

# Or in VS Code (if installed)
code PR-Templates\Templates\Contributor-Pro.md
```

---

### macOS

## Using Python Templates
```bash
# Open Terminal

# Navigate to project
cd ~/path/to/oss-system-prompts

# Generate PR template
python3 PR-Templates/PY/features-file.py

# Generate and save to file
python3 PR-Templates/PY/features-bugfix.py > bug-fix-pr.md

# Copy to clipboard
python3 PR-Templates/PY/features-review.py | pbcopy

# Validate changes
python3 -c "from PR_Templates.PY.features_file import validate_file_changes; print(validate_file_changes(['test.py']))"
```

## Using JavaScript Templates
```bash
# Navigate to JS folder
cd PR-Templates/JS

# Generate PR template
node features-file.js

# Copy to clipboard
node features-review.js | pbcopy

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"

# List all templates
ls -la
```

## Using Markdown Templates
```bash
# Open in default editor
open PR-Templates/Templates/Contributor-Pro.md

# Or in VS Code
code PR-Templates/Templates/Contributor-Pro.md

# View in terminal
cat PR-Templates/Templates/Contributor-Pro.md

# Copy to clipboard
cat PR-Templates/Templates/Contributor-Pro.md | pbcopy
```

---

### Linux (Ubuntu/Debian)

## Using Python Templates
```bash
# Open Terminal

# Navigate to project
cd /path/to/oss-system-prompts

# Generate PR template
python3 PR-Templates/PY/features-file.py

# Generate and save to file
python3 PR-Templates/PY/features-bugfix.py > bug-fix-pr.md

# Copy to clipboard (requires xclip)
python3 PR-Templates/PY/features-review.py | xclip -selection clipboard

# Validate changes
python3 -c "from PR_Templates.PY.features_file import validate_file_changes; print(validate_file_changes(['test.py']))"
```

## Using JavaScript Templates
```bash
# Navigate to JS folder
cd PR-Templates/JS

# Generate PR template
node features-file.js

# Copy to clipboard
node features-review.js | xclip -selection clipboard

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"

# List all templates
ls -la
```

## Using Markdown Templates
```bash
# Edit with nano/vim
nano PR-Templates/Templates/Contributor-Pro.md
vim PR-Templates/Templates/Contributor-Pro.md

# View in terminal
cat PR-Templates/Templates/Contributor-Pro.md
less PR-Templates/Templates/Contributor-Pro.md

# Copy to clipboard
cat PR-Templates/Templates/Contributor-Pro.md | xclip -selection clipboard
```

---

### Quick Reference by Platform

| Task | Windows | macOS | Linux |
|------|---------|-------|-------|
| Run Python template | `python` | `python3` | `python3` |
| Run JS template | `node` | `node` | `node` |
| Copy to clipboard | Manual | `pbcopy` | `xclip` |
| Edit template | `notepad` | `open` | `nano` |
| List files | `dir` | `ls -la` | `ls -la` |

---

## Usage

These system prompts are designed to be used with AI assistants (like Claude, GPT-4, or others) to get role-specific guidance for OSS development tasks.

## Quick Start

1. **Pick a prompt** based on your task (see [File Index](#file-index))
2. **Paste it** as your system prompt or instructions
3. **Ask questions** specific to that role
4. **Get detailed guidance** with code examples and best practices

## Example Usage

```bash
# Want to contribute Python code?
Use: Contributor-Python-Pro.md

# Need to set up CI/CD?
Use: CI-CD-Pro.md

# Want to review a PR?
Use: PR-Reveiwer-Pro.md
```

## Integration Methods

| Method | Use Case |
|--------|----------|
| **Full prompt** | Copy entire file as system prompt for comprehensive guidance |
| **Chapter extract** | Use specific chapters for focused tasks (e.g., just the testing chapter) |
| **Template base** | Customize placeholders for your project's specific needs |
| **Reference** | Use as lookup when working on specific OSS tasks |

## Common Workflows

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
