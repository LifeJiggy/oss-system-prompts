# PR Templates

> Comprehensive PR templates for OSS development. Available in Python, JavaScript, and Markdown formats.

---

## Overview

This folder contains ready-to-use Pull Request templates for all 32 system prompts in the project. Each template is designed to help contributors submit well-structured, complete PRs.

### Contents

```
PR-Templates/
├── PY/                 # Python templates (scripts)
├── JS/                 # JavaScript templates (scripts)
├── Templates/          # Markdown templates (200+ lines each)
└── README.md          # This file
```

---

## Quick Start

### Clone and Use

```bash
# Clone the repository
git clone https://github.com/LifeJiggy/oss-system-prompts.git
cd oss-system-prompts

# Navigate to PR Templates
cd PR-Templates
```

---

## Template Types

### 1. Markdown Templates (Templates/)

Direct copy-paste PR descriptions. Each is 200+ lines with comprehensive sections.

**Usage:** Copy content directly into your PR description.

```bash
# View available templates
ls Templates/

# Copy a template
cat Templates/Contributor-Pro.md
```

### 2. Python Scripts (PY/)

Generate and validate PR content programmatically.

**Usage:** Run scripts to generate templates or validate changes.

### 3. JavaScript Scripts (JS/)

Same as Python but for Node.js environments.

**Usage:** Run scripts to generate templates or validate changes.

---

## Platform-Specific Usage

### Windows

#### Python Templates

```powershell
# Open Command Prompt or PowerShell

# Navigate to project
cd C:\Path\To\oss-system-prompts\PR-Templates\PY

# Run a template generator
python features-file.py

# Validate your changes
python -c "from features_file import validate_file_changes; print(validate_file_changes(['src/test.py']))"

# View available templates
dir

# Edit a template
notepad features-file.py
```

#### JavaScript Templates

```powershell
# Navigate to JS folder
cd C:\Path\To\oss-system-prompts\PR-Templates\JS

# Run template generator
node features-file.js

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"

# List all templates
dir
```

#### PowerShell Specific

```powershell
# Generate and save template to file
python features-file.py > my-pr-template.md

# Open in VS Code
code Templates/Contributor-Pro.md
```

---

### macOS

#### Python Templates

```bash
# Open Terminal

# Navigate to project
cd ~/path/to/oss-system-prompts/PR-Templates/PY

# Run a template generator
python3 features-file.py

# Validate your changes
python3 -c "from features_file import validate_file_changes; print(validate_file_changes(['src/test.py']))"

# List available templates
ls -la

# View template in terminal
cat Templates/Contributor-Pro.md
```

#### JavaScript Templates

```bash
# Navigate to JS folder
cd ~/path/to/oss-system-prompts/PR-Templates/JS

# Run template generator
node features-file.js

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"
```

#### macOS Specific

```bash
# Generate template and copy to clipboard
python3 features-file.py | pbcopy

# Open in default text editor
open Templates/Contributor-Pro.md

# Open in VS Code (if installed)
code Templates/Contributor-Pro.md

# Use Preview for markdown
open -a Preview Templates/Contributor-Pro.md
```

---

### Linux (Ubuntu/Debian)

#### Python Templates

```bash
# Open Terminal

# Navigate to project
cd /path/to/oss-system-prompts/PR-Templates/PY

# Run a template generator
python3 features-file.py

# Validate your changes
python3 -c "from features_file import validate_file_changes; print(validate_file_changes(['src/test.py']))"

# List available templates
ls -la

# View template
cat Templates/Contributor-Pro.md
```

#### JavaScript Templates

```bash
# Navigate to JS folder
cd /path/to/oss-system-prompts/PR-Templates/JS

# Run template generator
node features-file.js

# Validate changes
node -e "console.log(require('./features-file').validateFileChanges(['file.js']))"
```

#### Linux Specific

```bash
# Generate template and save to file
python3 features-file.py > my-pr-template.md

# View in terminal with less
less Templates/Contributor-Pro.md

# Edit with nano/vim
nano Templates/Contributor-Pro.md

# Copy to clipboard (if xclip installed)
python3 features-file.py | xclip -selection clipboard
```

---

## Common Commands Across Platforms

### Python Templates

```bash
# Generate different types of PR templates
python features-file.py          # Single file changes
python features-integration.py   # Integration features
python features-review.py        # Code review requests
python features-bugfix.py        # Bug fixes
python features-refactor.py     # Refactoring
python features-docs.py          # Documentation
python features-tests.py         # Tests
```

### JavaScript Templates

```bash
# Generate different types of PR templates
node features-file.js          # Single file changes
node features-integration.js   # Integration features
node features-review.js       # Code review requests
node features-bugfix.js       # Bug fixes
node features-refactor.js     # Refactoring
node features-docs.js         # Documentation
node features-tests.js        # Tests
```

---

## Choosing the Right Template

| Scenario | Template | Command |
|----------|----------|---------|
| Fixed a bug | Bug Fix | `python features-bugfix.py` or use `Templates/Issue-fixer-Pro.md` |
| Added new feature | Feature | `python features-integration.py` or use `Templates/High-frequence-features-Pro.md` |
| Updated tests | Tests | `python features-tests.py` or use `Templates/Testing-Pro.md` |
| Refactored code | Refactor | `python features-refactor.py` or use `Templates/Low-frequence-features-Pro.md` |
| Fixed typo in docs | Documentation | `python features-docs.py` or use `Templates/Documentation-Pro.md` |
| Code needs review | Review | `python features-review.py` or use `Templates/Reveiwer-Pro.md` |

---

## Installation Requirements

### Python

```bash
# Windows (ensure Python is installed)
python --version

# macOS
python3 --version

# Linux
python3 --version

# Install if needed
# Windows: Download from python.org
# macOS: brew install python3
# Linux: sudo apt install python3
```

### Node.js

```bash
# Windows
node --version
npm --version

# macOS
node --version
npm --version

# Linux
node --version
npm --version

# Install if needed
# Windows: Download from nodejs.org
# macOS: brew install node
# Linux: sudo apt install nodejs npm
```

---

## Examples

### Generate a Bug Fix Template (Python)

```bash
# Windows
cd PR-Templates\PY
python features-bugfix.py

# macOS / Linux
cd PR-Templates/PY
python3 features-bugfix.py
```

Output:
```
## Pull Request: Bug Fix
...
```

### Generate a Feature Template (JavaScript)

```bash
# Windows
cd PR-Templates\JS
node features-integration.js

# macOS / Linux
cd PR-Templates/JS
node features-integration.js
```

### Use Markdown Template

1. Open `Templates/Contributor-Pro.md`
2. Copy content
3. Paste into GitHub PR description
4. Fill in the sections

---

## Troubleshooting

### Python Issues

**Error: "python" not found**
- Windows: Add Python to PATH or use `py` instead of `python`
- macOS/Linux: Use `python3` instead of `python`

**Error: Module not found**
- Install dependencies: `pip install -r requirements.txt`

### JavaScript Issues

**Error: "node" not found**
- Install Node.js from https://nodejs.org

**Error: Cannot find module**
- Run `npm install` in the JS folder

---

## Contributing

To add new templates:

1. Add Python script to `PY/`
2. Add JavaScript script to `JS/`
3. Add Markdown template to `Templates/`
4. Update this README

---

## License

MIT License - See main project LICENSE file.

---

*End of PR Templates README*