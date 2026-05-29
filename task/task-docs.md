# Task-Docs: Documentation Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Writing Great Documentation Across All Projects

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [Documentation Types](#2-documentation-types)
3. [README Standards](#3-readme-standards)
4. [API Documentation](#4-api-documentation)
5. [Code Comments](#5-code-comments)
6. [Configuration Documentation](#6-configuration-documentation)
7. [Migration Guides](#7-migration-guides)
8. [CHANGELOG Standards](#8-changelog-standards)
9. [Contributing Guide](#9-contributing-guide)
10. [Tutorials & Examples](#10-tutorials--examples)
11. [Documentation Review](#11-documentation-review)
12. [Tooling & Automation](#12-tooling--automation)
13. [Cross-Project Docs Patterns](#13-cross-project-docs-patterns)
14. [Common Documentation Gaps](#14-common-documentation-gaps)
15. [Documentation Anti-Patterns](#15-documentation-anti-patterns)
16. [Checklist Reference](#16-checklist-reference)
17. [README Deep Dive](#17-readme-deep-dive)
18. [API Documentation Deep Dive](#18-api-documentation-deep-dive)
19. [Configuration Documentation Deep Dive](#19-configuration-documentation-deep-dive)
20. [Tutorial & Example Writing](#20-tutorial--example-writing)
21. [Project-Specific Documentation](#21-project-specific-documentation)
22. [Documentation Automation](#22-documentation-automation)
23. [Migration Guide Writing](#23-migration-guide-writing)
24. [Security Documentation](#24-security-documentation)
25. [Code of Conduct Documentation](#25-code-of-conduct-documentation)
26. [Documentation Maintenance](#26-documentation-maintenance)
27. [Documentation Anti-Patterns Deep Dive](#27-documentation-anti-patterns-deep-dive)

---

## 1. Core Philosophy

### 1.1 The Documentarian's Oath

```
Document for the reader, not the writer.
Good docs answer questions before they're asked.
Bad docs leave users confused and frustrated.
Every public API must have documentation.
Every complex function must have a comment.
Every config option must be explained.
```

### 1.2 The Levels of Documentation

```
Level 0: No docs — "Read the source"
Level 1: Minimal — README only
Level 2: Functional — README + API docs
Level 3: Complete — README + API docs + examples
Level 4: Excellent — All of above + tutorials + migration guides
```

---

## 2. Documentation Types

### 2.1 Documentation Categories

| Type | Audience | Format | Location |
|------|----------|--------|----------|
| **README** | New users | Markdown | Root of repo |
| **API Docs** | Developers | JSDoc/TSDoc | In source code |
| **Config Docs** | Users | Markdown | docs/ or settings schema |
| **Contributing Guide** | Contributors | Markdown | CONTRIBUTING.md |
| **CHANGELOG** | All users | Markdown | CHANGELOG.md |
| **Migration Guide** | Upgrading users | Markdown | docs/migration/ |
| **Tutorials** | New users | Markdown | docs/tutorials/ |
| **Security Policy** | Security researchers | Markdown | SECURITY.md |

### 2.2 When to Write Each

| Event | Document |
|-------|----------|
| New project | README, CONTRIBUTING, LICENSE, SECURITY |
| New feature | JSDoc on public API, update README |
| Config change | Update config docs |
| Breaking change | Migration guide, CHANGELOG |
| First release | CHANGELOG |
| Community growth | Code of Conduct, Governance |

---

## 3. README Standards

### 3.1 README Structure

```markdown
# Project Name

[![Build Status][badge-ci]][link-ci]
[![npm version][badge-npm]][link-npm]
[![License][badge-license]][link-license]

> One-line tagline describing the project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Quick Start
```bash
npm install -g @org/project
project --help
```

## Usage
```bash
# Basic usage example
project do-something --input file.txt
```

## Configuration
See [Configuration docs](docs/configuration.md)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
[License Name](LICENSE)
```

### 3.2 README Best Practices

- Keep it concise (users scan, not read)
- Include a code example in the first screen
- Use badges for build status, version, license
- Link to detailed docs, don't inline everything
- Update for every feature release

---

## 4. API Documentation

### 4.1 JSDoc/TSDoc Standards

```typescript
/**
 * Performs a search operation on the codebase.
 *
 * Searches files matching the given pattern and returns results
 * with file paths, line numbers, and matching content.
 *
 * @param query - The regex pattern to search for
 * @param options - Optional search configuration
 * @param options.maxResults - Maximum results to return (default: 10)
 * @param options.caseSensitive - Whether search is case-sensitive (default: false)
 * @returns Array of search results with file, line, and content
 *
 * @throws SearchError if the query is invalid or execution fails
 *
 * @example
 * ```ts
 * const results = await search("function main", { maxResults: 5 })
 * // results = [{ file: "src/main.ts", line: 1, content: "..." }]
 * ```
 *
 * @since 2.0.0
 */
export async function search(
  query: string,
  options?: SearchOptions,
): Promise<SearchResult[]>
```

### 4.2 Required Documentation by Visibility

| Visibility | Required |
|------------|----------|
| Public API | Full JSDoc (description, params, returns, example) |
| Internal (exported) | Brief description |
| Private | Only if complex logic |

---

## 5. Code Comments

### 5.1 When to Comment

```typescript
// GOOD: Explains WHY, not WHAT
// Use LRU cache because this function is called frequently
// and results are deterministic within a 60-second window.
const cache = new LRUCache({ max: 100, ttl: 60000 })

// BAD: States the obvious
// This function processes input
function process(input: string) { ... }

// GOOD: Complex logic explanation
// Multi-provider fallback: tries each provider in sequence.
// If all fail, returns a user-friendly error message.
// The fallback order is: primary → secondary → local.
```

### 5.2 Comment Types

| Type | Purpose | Format |
|------|---------|--------|
| Explanation | Why this approach | `// Why: ...` |
| Warning | Side effects or risks | `// WARNING: ...` |
| Todo | Future work | `// TODO: ...` |
| Reference | Link to issue or spec | `// See: #1234` |
| Note | Important context | `// NOTE: ...` |

---

## 6. Configuration Documentation

### 6.1 Config Docs Format

```markdown
# Configuration

## `model` (string)
The LLM model to use.
Default: `"gemini-2.0-flash"`
Example: `"gpt-4"`, `"claude-3-opus"`

## `features.codeSearch.enabled` (boolean)
Enable code search tool.
Default: `false`

## `features.codeSearch.maxResults` (number)
Maximum search results per query.
Default: `5`
Range: 1-100
```

### 6.2 Schema-Generated Docs

```typescript
// When possible, generate config docs from the schema
// This ensures docs are always up to date

const ConfigSchema = {
  model: { type: "string", default: "gemini-2.0-flash", doc: "LLM model to use" },
  features: {
    codeSearch: {
      enabled: { type: "boolean", default: false, doc: "Enable code search" },
    },
  },
}
```

---

## 7. Migration Guides

### 7.1 Migration Guide Structure

```markdown
# Migrating from v1.x to v2.0

## Overview
v2.0 introduces a new provider API and updated configuration format.

## Breaking Changes

### 1. Provider API
**Old:** `provider.complete(prompt, callback)`
**New:** `provider.complete(prompt)` → Promise

**Migration:**
```ts
// Old
provider.complete("hello", (err, result) => { ... })

// New
const result = await provider.complete("hello")
```

### 2. Configuration Format
**Old:** `{ "apiKey": "sk-..." }`
**New:** `{ "provider": { "apiKey": "sk-..." } }`

## Timeline
- v1.x: Current stable (maintenance only)
- v2.0-rc.1: Release candidate (test now)
- v2.0: Final release (target: 2026-06-15)
- v1.x EOL: 2026-09-15 (3 months after v2.0)
```

---

## 8. CHANGELOG Standards

### 8.1 Keep a Changelog Format

```markdown
# Changelog

## [2.1.0] — 2026-05-29

### Added
- New feature (#1234)
- Support for X provider (#1235)

### Fixed
- Fixed crash on empty input (#1236)
- Fixed Windows path handling (#1237)

### Changed
- Improved streaming performance (#1238)

### Deprecated
- Legacy API (#1239)

### Security
- Fixed API key exposure (#1240)
```

### 8.2 Changelog Rules

- One entry per meaningful change
- Link to PR/issue numbers
- Categorize by type (Added, Fixed, Changed, etc.)
- Credit contributors
- Never edit past releases (use errata)

---

## 9. Contributing Guide

### 9.1 CONTRIBUTING.md Structure

```markdown
# Contributing

## Getting Started
1. Fork the repo
2. `npm install`
3. `npm run dev`

## Development Workflow
1. Create a branch from `dev`
2. Make changes
3. Write/update tests
4. Run `npm run test`
5. Run `npm run typecheck`
6. Run `npm run lint`
7. Submit PR

## PR Guidelines
- One feature/fix per PR
- Keep PRs small (< 500 lines)
- Include tests
- Update documentation
- Follow existing code style

## Code Style
- TypeScript with strict mode
- Effect-TS patterns (if applicable)
- 2-space indentation
- Semicolons required

## Review Process
1. PR submitted
2. Automated checks run
3. Human review within 48 hours
4. Changes requested or approved
5. Merged to dev
```

---

## 10. Tutorials & Examples

### 10.1 Tutorial Structure

```markdown
# Getting Started with Project

## Prerequisites
- Node.js >= 20
- An API key for your LLM provider

## Installation
```bash
npm install -g @org/project
```

## Your First Command
```bash
project init
project "Write a function that calculates Fibonacci numbers"
```

## Understanding the Output
[Explain what the user sees and what it means]

## Next Steps
- [Configuration guide](configuration.md)
- [Advanced usage](advanced.md)
```

---

## 11. Documentation Review

### 11.1 Documentation Review Checklist

- [ ] Is it accurate? (Matches actual behavior)
- [ ] Is it complete? (No missing sections)
- [ ] Is it clear? (Can a new user understand?)
- [ ] Is it current? (Updated for the latest version)
- [ ] Are examples runnable? (Copy-paste works)
- [ ] Are links valid? (No broken links)
- [ ] Is it well-formatted? (Proper Markdown)

### 11.2 Documentation Review in PRs

- Documentation changes should be reviewed alongside code
- A docs-only PR is valid and valuable
- Missing docs for a new feature is a blocking issue

---

## 12. Tooling & Automation

| Tool | Purpose |
|------|---------|
| **TypeDoc** | Generate API docs from TSDoc comments |
| **Prettier** | Format Markdown files |
| **markdownlint** | Lint Markdown formatting |
| **Link Checker** | Validate all links in docs |
| **Docusaurus** | Full documentation website |

---

## 13. Cross-Project Docs Patterns

### 13.1 Universal Files

| File | Purpose | Required |
|------|---------|----------|
| `README.md` | Project introduction | Yes |
| `CONTRIBUTING.md` | How to contribute | Yes |
| `LICENSE` | License information | Yes |
| `SECURITY.md` | Security policy | Yes |
| `CHANGELOG.md` | Version history | Yes |
| `CODE_OF_CONDUCT.md` | Community standards | Recommended |

### 13.2 Project-Specific Files

| Project | Additional Docs |
|---------|----------------|
| OpenCode | `AGENTS.md`, skill documentation |
| OpenClaude | Profile documentation, provider list |
| Kilo Code | Generation guides, prompt templates |
| Gemini CLI | Sandbox setup, Docker/Podman guides |
| Hermes Agents | Tool creation guide, plugin guide |

---

## 14. Common Documentation Gaps

| Gap | Impact |
|-----|--------|
| No error message documentation | Users can't understand failures |
| Missing config descriptions | Users don't know options exist |
| No migration guide | Users stuck on old versions |
| No examples | Users can't get started |
| Outdated screenshots | Users confused by mismatch |
| No troubleshooting | Users give up on errors |

---

## 15. Documentation Anti-Patterns

```
🚫 "IT'S OBVIOUS" — Assuming users know what you know
🚫 "READ THE SOURCE" — Not documenting public API
🚫 ONCE AND FORGET — Never updating docs
🚫 WALL OF TEXT — No headings, no structure
🚫 BROKEN LINKS — Links that go nowhere
🚫 NO EXAMPLES — Theory without practice
🚫 OUTDATED EXAMPLES — Examples that don't work
```

---

## 16. Checklist Reference

### New Feature Documentation

- [ ] JSDoc/TSDoc on all public APIs
- [ ] Example in JSDoc
- [ ] README updated (if user-facing)
- [ ] Config docs updated (if new options)
- [ ] CHANGELOG entry added

### Release Documentation

- [ ] CHANGELOG updated
- [ ] Migration guide ready (if breaking)
- [ ] README badges updated (version, etc.)

### Pre-Merge

- [ ] No missing JSDoc on new public APIs
- [ ] README is current
- [ ] Examples are accurate
- [ ] No broken links

---

## 17. README Deep Dive

### 17.1 README Anatomy

A well-structured README follows a predictable hierarchy that respects the user's attention curve:

```
┌─────────────────────────────────┐
│ Title + Badges (first impression) │
├─────────────────────────────────┤
│ Tagline (one-liner)             │
├─────────────────────────────────┤
│ Table of Contents               │
├─────────────────────────────────┤
│ Features (bullet list)          │
├─────────────────────────────────┤
│ Quick Start (copy-paste block)  │
├─────────────────────────────────┤
│ Usage (examples with output)    │
├─────────────────────────────────┤
│ Configuration (link to full)    │
├─────────────────────────────────┤
│ API (or link to API docs)       │
├─────────────────────────────────┤
│ Contributing                    │
├─────────────────────────────────┤
│ License                         │
└─────────────────────────────────┘
```

### 17.2 Badge Selection Guide

Choose badges that communicate project health at a glance:

| Badge | Why | Example |
|-------|-----|---------|
| CI status | Shows build passes | `![CI](https://github.com/.../workflows/ci/badge.svg)` |
| Package version | Latest release | `![npm](https://img.shields.io/npm/v/@org/pkg)` |
| License | Legal clarity | `![License](https://img.shields.io/github/license/org/repo)` |
| Coverage | Test quality signal | `![Coverage](https://img.shields.io/codecov/c/github/org/repo)` |
| Downloads | Popularity signal | `![Downloads](https://img.shields.io/npm/dm/@org/pkg)` |
| TypeScript | Typing support | `![types](https://img.shields.io/badge/TypeScript-5.6-blue)` |
| PRs welcome | Community signal | `![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)` |

Badge formatting using reference-style links for cleaner Markdown:

```markdown
[ci-badge]: https://img.shields.io/github/actions/workflow/status/org/repo/ci.yml
[ci-link]:  https://github.com/org/repo/actions/workflows/ci.yml
[npm-badge]: https://img.shields.io/npm/v/@org/repo
[npm-link]:  https://www.npmjs.com/package/@org/repo

![CI][ci-badge] ![npm][npm-badge]
```

### 17.3 Screenshot and GIF Integration

Visuals dramatically improve comprehension:

```markdown
## Demo

![Demo](docs/assets/demo.gif)
*Figure 1: Creating a new project with `project init`*

## Terminal Output

```
$ project analyze src/
✓ Found 12 issues
✓ Fixed 9 automatically
⚠ 3 require manual review
```
```

GIF best practices:
- Keep GIFs under 5 MB (use `gifsicle` or `ffmpeg` to optimize)
- Show the happy path: install → run → result
- Add terminal borders for visual clarity
- Provide static screenshot fallback for documentation viewers that don't animate

### 17.4 Table of Contents Generation

Manual TOC for small READMEs; automated for large ones:

```markdown
## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic-usage)
  - [Advanced](#advanced-usage)
- [Configuration](#configuration)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)
```

Use `doctoc` or `markdown-toc` for automatic generation:

```bash
npx doctoc --maxlevel 3 README.md
```

### 17.5 Internationalization (i18n) Considerations

For projects with global audiences, consider localized READMEs:

```
README.md          # Primary (English)
README.zh-CN.md    # Simplified Chinese
README.ja.md       # Japanese
README.ko.md       # Korean
```

- Keep the English README as the source of truth
- Add an i18n badge: `![中文](https://img.shields.io/badge/README-中文-blue)`
- Pin the English version as the default on GitHub repository settings
- Accept translation contributions with clear guidelines in CONTRIBUTING.md

### 17.6 README Template by Project Type

**CLI Tool:**

```markdown
# project

[![npm][npm-badge]][npm-link]

> One-line description of the CLI tool.

## Installation
```bash
npm install -g @org/project
```

## Usage
```bash
project analyze <path>
project validate <path>
```

## Commands
| Command | Description |
|---------|-------------|
| `analyze` | Analyze files in path |
| `validate` | Validate configuration |
```
**Library/Package:**

```markdown
# @org/lib

[![npm][npm-badge]][npm-link]

> A library that does X.

## Install
```bash
npm install @org/lib
```

## Quick Start
```ts
import { doThing } from "@org/lib"
const result = doThing({ input: "hello" })
console.log(result) // { output: "HELLO" }
```
```
**Plugin/Extension:**

```markdown
# org/plugin-name

[![vscode marketplace][vscode-badge]][vscode-link]

> VS Code extension for X.

## Features
- Feature 1 with screenshot
- Feature 2 with demo GIF

## Requirements
- VS Code >= 1.90
```

---

## 18. API Documentation Deep Dive

### 18.1 JSDoc/TSDoc Complete Tag Reference

```typescript
/**
 * Full description of the function's purpose and behavior.
 * Can span multiple lines for complex logic.
 *
 * Use paragraphs to separate concerns.
 *
 * Second paragraph with additional context.
 *
 * @param name     - Description of the parameter
 * @param options  - Configuration object
 * @param options.timeout - Nested parameter description (ms)
 * @param options.retries - Number of retry attempts
 * @param items    - Array of items to process
 * @param callback - Optional completion callback
 *
 * @returns The processed result object
 * @returns {string} When simple types, annotate the return type inline
 * @returns {Promise<Result>} For async functions
 *
 * @throws {ValidationError} If input fails validation
 * @throws {NetworkError} If request times out or connection fails
 * @throws {Error} Generic error description
 *
 * @deprecated Use {@link newFunction} instead (since v3.0)
 * @since 1.0.0
 * @experimental Available from v2.5 but API may change
 * @version Added in v3.2
 *
 * @default "auto"
 * @minimum 1
 * @maximum 100
 *
 * @see {@link RelatedClass} for configuration details
 * @see {@link https://docs.example.com | External Documentation}
 * @see README.md#usage for usage examples
 *
 * @example
 * ```ts
 * import { process } from "@org/lib"
 * const result = await process("input", { timeout: 5000 })
 * // result = { status: "ok", data: [...] }
 * ```
 *
 * @example
 * ```ts
 * // Error handling example
 * try {
 *   await process("invalid", { timeout: 100 })
 * } catch (err) {
 *   console.error(err.message)
 * }
 * ```
 */
export async function process<T>(
  name: string,
  options?: ProcessOptions,
  ...items: T[]
): Promise<ProcessResult<T>>
```

### 18.2 TypeDoc Configuration

TypeDoc generates HTML API documentation from TSDoc comments:

```json
{
  "typedocOptions": {
    "entryPoints": ["src/index.ts"],
    "out": "docs/api",
    "excludePrivate": true,
    "excludeProtected": false,
    "excludeInternal": true,
    "includeVersion": true,
    "categorizeByGroup": true,
    "categoryOrder": ["Functions", "Classes", "Interfaces", "Types", "*"],
    "sort": ["source-order"],
    "githubPages": false,
    "plugin": ["typedoc-plugin-markdown"],
    "readme": "docs/api-readme.md"
  }
}
```

CI integration:

```yaml
# .github/workflows/docs.yml
name: Documentation
on:
  push:
    branches: [main]
jobs:
  typedoc:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx typedoc
      - uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./docs/api
```

### 18.3 Documenting Overloaded Functions

```typescript
/**
 * Creates a connection to a server.
 *
 * @param url     - Server URL string
 * @param options - Connection configuration
 * @returns Connection instance
 *
 * @example
 * ```ts
 * const conn = connect("https://api.example.com", { timeout: 5000 })
 * ```
 */
export function connect(url: string, options?: ConnectOptions): Connection

/**
 * Creates a connection using a configuration object.
 *
 * @param config - Complete connection configuration
 * @returns Connection instance
 *
 * @example
 * ```ts
 * const conn = connect({ url: "https://api.example.com", timeout: 5000 })
 * ```
 */
export function connect(config: ConnectConfig): Connection

export function connect(
  urlOrConfig: string | ConnectConfig,
  options?: ConnectOptions,
): Connection {
  // implementation
}
```

### 18.4 Documenting Generics and Type Parameters

```typescript
/**
 * Transforms an array of items using a mapping function.
 *
 * @typeParam T - The input item type
 * @typeParam U - The output item type
 *
 * @param items  - Array of items to transform
 * @param mapper - Mapping function from T to U
 * @returns Array of transformed items
 *
 * @example
 * ```ts
 * const result = transform([1, 2, 3], (n) => n.toString())
 * // result = ["1", "2", "3"]
 * ```
 */
export function transform<T, U>(
  items: T[],
  mapper: (item: T) => U,
): U[]
```

### 18.5 Documenting Async Functions and Promises

```typescript
/**
 * Fetches user data from the API.
 *
 * The function retries up to 3 times on network errors
 * with exponential backoff.
 *
 * @param userId - The user's unique identifier
 * @returns A promise that resolves with the user data object
 * @throws {NotFoundError} If the user does not exist
 * @throws {RateLimitError} If rate limited
 *
 * @example
 * ```ts
 * const user = await fetchUser("usr_123")
 * console.log(user.name)
 * ```
 */
export async function fetchUser(userId: string): Promise<User>
```

### 18.6 Documenting Errors and Exceptions

```typescript
/**
 * Custom error for API validation failures.
 *
 * Provides structured error information that consumers
 * can use to display user-friendly messages.
 */
export class ValidationError extends Error {
  /**
   * @param message   - Human-readable error description
   * @param field     - The form field that failed validation
   * @param code      - Machine-readable error code
   * @param details   - Additional error context
   */
  constructor(
    message: string,
    public readonly field: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}
```

### 18.7 Version Tags and Deprecation Markers

```typescript
/**
 * @deprecated Since v3.0 — Use {@link newAPI} instead.
 * Will be removed in v4.0.
 *
 * To migrate:
 * ```ts
 * // Old
 * const result = oldAPI(input)
 *
 * // New
 * const result = newAPI(input)
 * ```
 */
export function oldAPI(input: string): void

/**
 * @since 2.0.0
 * @version 3.2.0 — Added retry support
 */
export function newAPI(input: string, retries?: number): void
```

### 18.8 Cross-Reference Documentation

```typescript
/**
 * Entry point for the processing pipeline.
 *
 * @see {@link Parser} for input parsing
 * @see {@link Validator} for validation rules
 * @see {@link https://docs.example.com/pipeline | Pipeline Architecture}
 *
 * For configuration options, see the {@link Config} interface.
 * For error handling, see {@link PipelineError}.
 *
 * Related: {@link Processor}, {@link Reporter}
 */
export class Pipeline {
  // ...
}
```

---

## 19. Configuration Documentation Deep Dive

### 19.1 JSON Schema Documentation Generation

Generate human-readable docs from JSON Schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "model": {
      "type": "string",
      "description": "The LLM provider model to use for completions.",
      "default": "gemini-2.0-flash",
      "examples": ["gpt-4", "claude-3-opus", "gemini-2.0-flash"]
    },
    "temperature": {
      "type": "number",
      "description": "Sampling temperature (0.0 = deterministic, 1.0 = creative).",
      "default": 0.7,
      "minimum": 0.0,
      "maximum": 2.0
    },
    "features.codeSearch.enabled": {
      "type": "boolean",
      "description": "Enable the code search tool in agent operations.",
      "default": false
    }
  },
  "required": ["model"]
}
```

Tools to generate docs from schema:

```bash
# Generate Markdown from JSON Schema
npx json-schema-to-markdown schema.json > docs/configuration.md

# Or use TypeScript-to-schema pipeline
npx ts-json-schema-generator --path src/config.ts --type Config > schema.json
```

### 19.2 Environment Variable Documentation

```markdown
# Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LLM_API_KEY` | Yes | — | API key for the LLM provider |
| `LLM_MODEL` | No | `gemini-2.0-flash` | Model identifier override |
| `LOG_LEVEL` | No | `info` | Logging level: `debug`, `info`, `warn`, `error` |
| `CACHE_DIR` | No | `~/.cache/project` | Directory for cached results |
| `MAX_TOKENS` | No | `4096` | Maximum output token count |
| `TIMEOUT_MS` | No | `30000` | Request timeout in milliseconds |
| `RETRY_COUNT` | No | `3` | Number of automatic retries on failure |
```

### 19.3 CLI Flag Documentation

```markdown
# CLI Reference

## Global Flags

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--config` | `-c` | `./project.json` | Path to config file |
| `--verbose` | `-v` | `false` | Enable verbose output |
| `--quiet` | `-q` | `false` | Suppress non-error output |
| `--output` | `-o` | `stdout` | Output destination |

## Commands

### `project init [name]`
Initialize a new project.

| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--template` | `-t` | `default` | Project template to use |
| `--force` | `-f` | `false` | Overwrite existing files |

### `project analyze <path>`
Analyze files in the specified path.

| Option | Description |
|--------|-------------|
| `--depth` | Recursion depth (default: `5`) |
| `--pattern` | File pattern (default: `**/*.{ts,js}`) |
| `--format` | Output format: `json`, `table`, `summary` |
```
### 19.4 Config File Examples for Each Scenario

```markdown
## Configuration Examples

### Minimal Setup
```json
{
  "model": "gemini-2.0-flash",
  "apiKey": "sk-..."
}
```

### Full Production Setup
```json
{
  "model": "claude-3-opus",
  "apiKey": "sk-...",
  "temperature": 0.3,
  "maxTokens": 8192,
  "features": {
    "codeSearch": {
      "enabled": true,
      "maxResults": 20
    },
    "webSearch": {
      "enabled": true
    }
  },
  "logging": {
    "level": "warn",
    "file": "/var/log/project.log"
  }
}
```

### CI/CD Configuration
```json
{
  "model": "gpt-4",
  "apiKey": "${LLM_API_KEY}",
  "timeout": 60000,
  "output": "json"
}
```

### Multi-Provider Config
```json
{
  "defaultProvider": "openai",
  "providers": {
    "openai": {
      "model": "gpt-4",
      "apiKey": "sk-..."
    },
    "anthropic": {
      "model": "claude-3-opus-20240229",
      "apiKey": "sk-ant-..."
    }
  }
}
```

### 19.5 Default Values Table

| Option | Type | Default | Valid Values | Since |
|--------|------|---------|-------------|-------|
| `model` | string | `gemini-2.0-flash` | Provider-specific | 1.0.0 |
| `temperature` | number | `0.7` | `0.0`–`2.0` | 1.0.0 |
| `maxTokens` | number | `4096` | `1`–`100000` | 1.0.0 |
| `timeout` | number | `30000` | `1000`–`300000` | 1.5.0 |
| `retryCount` | number | `3` | `0`–`10` | 2.0.0 |
| `features.codeSearch.enabled` | boolean | `false` | `true`, `false` | 2.1.0 |

### 19.6 Migration Between Config Versions

```markdown
## Config Migration: v1 → v2

v2 restructured the flat config into namespaced sections.

### Automatic Migration
```bash
project migrate-config --from v1 --to v2
```

### Manual Changes

| v1 Path | v2 Path | Action |
|---------|---------|--------|
| `apiKey` | `provider.apiKey` | Moved |
| `model` | `provider.model` | Moved |
| `maxResults` | `features.codeSearch.maxResults` | Moved |
| `logLevel` | `logging.level` | Renamed |
| `enableWebSearch` | `features.webSearch.enabled` | Restructured |
| `verbose` | `logging.verbose` | Moved |
```

---

## 20. Tutorial & Example Writing

### 20.1 Tutorial Structure Template

```markdown
---
title: Getting Started with Project
description: Learn how to install and run your first analysis.
---

# Getting Started with Project

## Prerequisites
- Node.js 20+ or Bun 1.0+
- An API key for your LLM provider
- Basic familiarity with the command line

## Step 1: Installation
```bash
npm install -g @org/project
```
Verify installation:
```bash
project --version
# Expected output: 2.1.0
```

## Step 2: Create a Configuration File
Create `project.json` in your project root:
```json
{
  "model": "gemini-2.0-flash",
  "apiKey": "your-api-key-here"
}
```

## Step 3: Run Your First Analysis
```bash
project analyze ./src
```
Expected output:
```
✓ Analyzing 15 files...
✓ Found 23 issues
  - 12 critical
  - 8 warnings
  - 3 suggestions
✓ Report saved to project-report.json
```

## Step 4: Review the Results
Open `project-report.json` to see detailed findings:
```json
[
  {
    "file": "src/main.ts",
    "line": 42,
    "severity": "critical",
    "message": "Unhandled promise rejection"
  }
]
```

## Verification
Run the self-check to confirm everything works:
```bash
project verify
# Expected: ✓ All systems operational
```

## Next Steps
- [Configuration Guide](./configuration.md) — All available options
- [Advanced Analysis](./advanced-analysis.md) — Custom rules and filters
- [CI Integration](./ci-integration.md) — Run in GitHub Actions
```

### 20.2 Example Quality Standards

| Criterion | Standard |
|-----------|----------|
| Runnable | Every example must be copy-paste executable |
| Complete | Include all imports and setup code |
| Correct | Output shown must match actual behavior |
| Isolated | No dependency on external state or network |
| Minimal | Shortest possible demonstration of the concept |
| Annotated | Comments explain key parts |
| Tested | Example is verified in CI as a test case |

### 20.3 Copy-Paste Verification Process

```yaml
# .github/workflows/verify-examples.yml
name: Verify Documentation Examples
on:
  pull_request:
    paths: ["docs/**/*.md"]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Extract and run code blocks
        run: |
          # Extract TypeScript code blocks from Markdown
          grep -A999 '```ts' docs/*.md | grep -B999 '```$' > /tmp/examples.ts
          # Type-check extracted code
          npx tsc --noEmit --strict /tmp/examples.ts
```

### 20.4 Language-Specific Examples

**TypeScript:**

```markdown
## Usage

```ts
import { analyze } from "@org/project"

const report = await analyze({
  path: "./src",
  format: "json",
})
console.log(`Found ${report.issues.length} issues`)
```
```

**Python:**

```markdown
## Usage

```python
from project import analyze

report = analyze(path="./src", format="json")
print(f"Found {len(report.issues)} issues")
```
```

**Bash:**

```markdown
## Usage

```bash
project analyze ./src --format json > report.json
cat report.json | jq '.issues | length'
```
```

**Interactive (REPL):**

```markdown
## Usage

```ts
> import { analyze } from "@org/project"
> const report = await analyze({ path: "./src" })
> report.issues.length
23
```
```

### 20.5 Progressive Disclosure: Simple to Advanced

```markdown
# Tutorial Series

## Level 1: Beginner (5 minutes)
- [Hello World](./tutorials/hello-world.md) — Run your first analysis
- [Reading Reports](./tutorials/reading-reports.md) — Understand the output

## Level 2: Intermediate (15 minutes)
- [Custom Configuration](./tutorials/custom-config.md) — Tune analysis settings
- [Filtering Results](./tutorials/filtering.md) — Focus on specific issues

## Level 3: Advanced (30 minutes)
- [Custom Rules](./tutorials/custom-rules.md) — Write your own analysis rules
- [CI Pipeline Integration](./tutorials/ci-integration.md) — Automate in CI/CD
- [Performance Optimization](./tutorials/performance.md) — Scale to large codebases

## Reference
- [API Documentation](./api/README.md)
- [Configuration Reference](./configuration.md)
- [Troubleshooting Guide](./troubleshooting.md)
```

---

## 21. Project-Specific Documentation

### 21.1 OpenCode: AGENTS.md and Skill Authoring

**AGENTS.md** documents the project's agent architecture:

```markdown
# Agents

## Built-in Agents
| Agent | Description | Skills |
|-------|-------------|--------|
| `Code` | Code generation and analysis | `read`, `edit`, `search`, `bash` |
| `Docs` | Documentation management | `read`, `write`, `search` |

## Custom Agent Configuration
```json
{
  "name": "my-agent",
  "description": "Custom agent for project tasks",
  "skills": ["code", "docs"],
  "config": {
    "model": "gemini-2.0-flash",
    "temperature": 0.3
  }
}
```
```

**Skill Authoring Guide** documents how to create reusable skills:

- Skill definition structure (name, description, workflow)
- When to use skills vs. inline instructions
- Testing skills in isolation
- Publishing skills for community use
- Skill composition patterns (chaining multiple skills)

**Effect-TS Patterns Document:**

- Common Effect-TS patterns used across the project
- Error handling with `Effect` and `Either`
- Dependency injection with `Context` and `Layer`
- Resource management with `Scope` and `acquireUseRelease`
- Testing patterns with `TestEnvironment` and `TestClock`

### 21.2 OpenClaude: Provider Integration Guide

```markdown
# Provider Integration

## Supported Providers
| Provider | Model | Auth Method | Status |
|----------|-------|-------------|--------|
| OpenAI | gpt-4, gpt-4o | API Key | Stable |
| Anthropic | claude-3-opus, claude-3-sonnet | API Key | Stable |
| Google | gemini-2.0-flash, gemini-2.0-pro | API Key | Beta |
| Ollama | llama3, mistral | None (local) | Experimental |

## Adding a New Provider
1. Implement the `Provider` interface
2. Add authentication handling
3. Register in the provider registry
4. Add model list to provider index
5. Write integration tests
```

**Model List:** Maintain an up-to-date catalog of supported models with capabilities, pricing, rate limits, and recommended use cases.

**Profile Documentation:** Each profile (predefined configuration bundle) includes:
- Description of the profile's purpose
- Provider and model selection rationale
- Recommended use cases and limitations
- Sample outputs or performance benchmarks

### 21.3 Kilo Code: Prompt Engineering Guide

```markdown
# Prompt Engineering Guide

## Prompt Structure
```
[System Context] → [Task Description] → [Constraints] → [Output Format]
```

## Prompt Templates

### Code Generation
```
Generate [language] code that:
1. [Requirement 1]
2. [Requirement 2]

Constraints:
- Use [framework/library]
- Follow [style guide]
- Include error handling

Output format:
- Complete file contents
- With type annotations
```

### Refactoring
```
Refactor [file path] to:
1. Improve [aspect]
2. Reduce [metric]

Preserve:
- All existing behavior
- API compatibility
```

### Debugging
```
The following code produces [error/behavior]:
[code snippet]

Expected: [expected behavior]
Actual: [actual behavior]

Root cause analysis:
```

## Generation Templates
Templates for common tasks (API route generation, database schema, test suites, etc.) with placeholders for project-specific values.
```

### 21.4 Gemini CLI: Sandbox Setup Guide

```markdown
# Sandbox Setup Guide

## What is the Sandbox?
The sandbox provides an isolated environment for safe code execution and testing.

## Docker Setup
```bash
# Pull the sandbox image
docker pull ghcr.io/org/sandbox:latest

# Run with project mount
docker run -v $(pwd):/workspace ghcr.io/org/sandbox
```

## Podman Setup
```bash
# Podman is Docker-compatible
podman pull ghcr.io/org/sandbox:latest
podman run -v $(pwd):/workspace ghcr.io/org/sandbox
```

## Configuration
| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `SANDBOX_TIMEOUT` | `30` | Execution timeout (seconds) |
| `SANDBOX_MEMORY` | `512m` | Memory limit |
| `SANDBOX_NETWORK` | `none` | Network access level |
```

### 21.5 Hermes Agents: Tool Creation Guide

```markdown
# Tool Creation Guide

## Tool Interface
Every tool must implement:
```typescript
export interface Tool {
  name: string
  description: string
  parameters: JSONSchema
  execute(args: unknown): Promise<ToolResult>
}
```

## Creating a Custom Tool
```typescript
import { Tool, ToolResult } from "@org/hermes"

export const searchTool: Tool = {
  name: "search",
  description: "Search files in the workspace",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search pattern" },
      path: { type: "string", description: "Search path" },
    },
    required: ["query"],
  },
  async execute(args): Promise<ToolResult> {
    const results = await performSearch(args.query, args.path)
    return { success: true, data: results }
  },
}
```

**Agent Configuration Document:**

- Agent lifecycle (init → plan → execute → observe → complete)
- Tool permission model (allowed tools per agent)
- Agent memory and context management
- Error recovery and retry strategies
- Observability and logging configuration

---

## 22. Documentation Automation

### 22.1 TypeDoc Full CI Integration

```yaml
# .github/workflows/docs.yml
name: Deploy Documentation
on:
  push:
    branches: [main]
    paths: ["src/**/*.ts"]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Generate API docs
        run: npx typedoc
      - name: Build Docusaurus site
        run: |
          cd website
          npm ci
          npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./website/build
          publish_branch: gh-pages
```

### 22.2 markdownlint Configuration

```json
{
  "default": true,
  "MD013": {
    "line_length": 100,
    "code_blocks": false,
    "tables": false
  },
  "MD024": {
    "allow_different_nesting": true
  },
  "MD033": false,
  "MD041": false
}
```

CI check:

```yaml
# In CI workflow
- name: Lint documentation
  run: npx markdownlint '**/*.md' --ignore node_modules
```

### 22.3 Link Checker Automation

```yaml
- name: Check links
  run: |
    npx linkchecker . --recursive --no-warnings
    # Or use lychee for faster checking
    npx lychee '**/*.md' --exclude 'https://twitter.com'
```

```bash
# Local link checking
npx broken-link-checker --recursive ./docs

# Using lychee (Rust-based, fast)
lychee --no-progress './**/*.md' --exclude 'linkedin.com'
```

### 22.4 Spell Check in CI

```yaml
- name: Spell check
  run: npx cspell '**/*.md' --no-progress
```

Custom dictionary (`cspell.json`):

```json
{
  "version": "0.2",
  "language": "en",
  "words": [
    "JSDoc",
    "TSDoc",
    "TypeDoc",
    "CHANGELOG",
    "backend",
    "codebase"
  ],
  "ignorePaths": [
    "node_modules",
    "*.generated.*",
    "CHANGELOG.md"
  ]
}
```

### 22.5 Auto-Generated Docs from Source

```bash
# TypeScript API docs
npx typedoc --out docs/api src/index.ts

# OpenAPI/Swagger docs
npx swagger-cli bundle -o docs/api/openapi.json src/openapi.yaml

# Configuration schema docs
npx json-schema-to-markdown schema.json > docs/configuration.md

# Dependency graph
npx dependency-cruiser --output-type dot src | dot -T svg > docs/architecture.svg
```

### 22.6 Documentation Preview Deployments

```yaml
- name: Deploy preview
  if: github.event_name == 'pull_request'
  uses: peaceiris/actions-gh-pages@v3
  with:
    publish_dir: ./docs/preview
    destination_dir: pr/${{ github.event.number }}
    keep_files: true
```

Preview URLs follow the pattern:
`https://org.github.io/repo/pr/42/`

Add a PR comment with the preview link automatically:

```yaml
- name: Comment preview link
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `📚 Documentation preview: https://org.github.io/repo/pr/${context.issue.number}/`
      })
```

---

## 23. Migration Guide Writing

### 23.1 Migration Guide Template

```markdown
# Migrating to vX.Y.Z

## Overview
Brief description of what changed and why.

**Who is affected:** [All users / Power users / Plugin developers]
**Migration effort:** [Minutes / Hours / Days]
**Risk level:** [Low / Medium / High]

## Before You Start
- [ ] Back up your configuration
- [ ] Read the changelog for vX.Y.Z
- [ ] Check for deprecated features you use
- [ ] Review the breaking changes list

## Upgrade Instructions

### Step 1: Update Dependency
```bash
npm install @org/project@latest
```

### Step 2: Verify Version
```bash
project --version
# Expected: X.Y.Z
```

## Breaking Changes

### [Change Title]
**What changed:**
Detailed explanation of the breaking change.

**Why:**
Rationale for the change.

**Old behavior:**
```typescript
// Code showing old behavior
```

**New behavior:**
```typescript
// Code showing new behavior
```

**Migration steps:**
1. First step
2. Second step

## Deprecations
| Feature | Deprecated In | Removed In | Replacement |
|---------|--------------|------------|-------------|
| `oldFunction` | v3.0 | v4.0 | `newFunction` |

## FAQ
**Q: What if I skip multiple versions?**
A: You may need to apply each migration in sequence.

## Need Help?
- [Migration script](link-to-codemod)
- [Discussion thread](link-to-discussion)
- [GitHub Issues](link-to-issues)
```

### 23.2 Breaking Change Documentation Format

```markdown
## BCR-001: API Key Configuration Restructure

**Type:** Configuration breaking change
**Impact:** All users with custom configuration
**Migration:** Automated via `project migrate-config`

### Change Details
The `apiKey` field has moved from the root config object to
`provider.apiKey` to support multi-provider configurations.

### Before (v1.x)
```json
{
  "apiKey": "sk-...",
  "model": "gpt-4"
}
```

### After (v2.0)
```json
{
  "provider": {
    "apiKey": "sk-...",
    "model": "gpt-4"
  }
}
```

### Migration Command
```bash
project migrate-config --fix
```
```

### 23.3 Codemod and Script Inclusion

```bash
# Provide automated migration scripts
project/migrations/v2.0/
├── README.md              # Migration overview
├── migrate-config.js      # Config transformation script
├── migrate-imports.js     # Import path updater
└── test/
    ├── fixtures/
    │   ├── v1-config.json
    │   └── v2-config.json
    └── migration.test.js
```

```markdown
## Automated Migration

Run the migration script to automatically update your codebase:

```bash
npx @org/project-migrate-v2.0
```

This script will:
1. Update configuration files
2. Rewrite import paths
3. Flag manual changes needed

Preview changes without applying:
```bash
npx @org/project-migrate-v2.0 --dry-run
```
```

### 23.4 Timeline Communication

```markdown
## Deprecation Timeline

| Date | Event |
|------|-------|
| 2026-01-15 | v2.0-rc.1 released (start migration) |
| 2026-03-01 | v2.0 stable released |
| 2026-03-01 | v1.x enters maintenance mode |
| 2026-06-01 | v1.x deprecation warning added |
| 2026-09-01 | v1.x end of life |
| 2026-09-15 | v1.x packages unpublished |

## What This Means For You

- **Before June 2026:** Migrate at your own pace
- **June–September 2026:** v1.x still works with deprecation warnings
- **After September 2026:** Must use v2.0 or later
```

### 23.5 Common Migration Scenarios

```markdown
## Common Migration Scenarios

### Scenario 1: Upgrading from v1.x to v2.0 (Single Provider)
Follow the [standard migration guide](#) — no special steps required.

### Scenario 2: Upgrading from v1.x to v2.0 (Multiple Providers)
Your configuration will be split into provider-specific sections.
Use `project migrate-config --multi-provider` for automated conversion.

### Scenario 3: Upgrading from v1.x to v2.0 (CI Pipeline)
Update your CI configuration file and environment variables:
- Replace `API_KEY` with `PROVIDER_API_KEY`
- Add `PROVIDER_MODEL` environment variable

### Scenario 4: Cross-Version Jump (v1.2 to v2.0)
Apply migrations in sequence:
1. First run the v1.3 migration
2. Then run the v1.4 migration
3. Finally run the v2.0 migration

```bash
project migrate --from v1.2 --to v2.0 --sequential
```
```

---

## 24. Security Documentation

### 24.1 SECURITY.md Template

```markdown
# Security Policy

## Supported Versions
| Version | Supported |
|---------|-----------|
| 2.x | ✅ |
| 1.x | ⚠️ Security fixes only |
| < 1.0 | ❌ |

## Reporting a Vulnerability

We take security issues seriously. Please do NOT report
vulnerabilities via public GitHub issues.

### Private Disclosure Process
1. Email **security@org.example.com** with details
2. Include:
   - Affected version(s)
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if known)
3. You will receive an acknowledgment within 48 hours
4. We will investigate and provide regular updates

### PGP Encryption
```
-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----
```

### Disclosure Timeline
| Phase | Duration |
|-------|----------|
| Acknowledgment | 48 hours |
| Investigation | 7 days |
| Fix development | 14 days |
| Public disclosure | 90 days after fix |

### Recognition
We maintain a Hall of Fame for researchers who report valid vulnerabilities.
With your permission, we will credit you in our security advisory.
```

### 24.2 Vulnerability Disclosure Process Documentation

```markdown
# Vulnerability Disclosure Process

## Triage
1. Reporter submits via security@org.example.com
2. Maintainer acknowledges within 48 hours
3. Initial severity assessment (CVSS 3.1)

## Investigation
4. Reproduce the vulnerability
5. Determine affected versions
6. Assess real-world impact
7. Develop fix

## Remediation
8. Develop patch
9. Code review and testing
10. Prepare advisory with CVE assignment
11. Release patched version

## Disclosure
12. Notify downstream package maintainers
13. Publish security advisory on GitHub
14. Update CHANGELOG with security entry
15. Public disclosure after 90-day window
```

### 24.3 Threat Model Documentation

```markdown
# Threat Model

## Trust Boundaries
```
[User Input] → [Parser] → [API Layer] → [LLM Provider]
    ↑              ↑            ↑              ↑
    │         (Boundary 1)  (Boundary 2)   (Boundary 3)
```

## Assets
- API keys and authentication tokens
- User source code and configuration
- LLM provider responses

## Threats

| Threat | Impact | Likelihood | Mitigation |
|--------|--------|------------|------------|
| API key exposure in logs | Critical | Medium | Key masking in log output |
| Prompt injection via user input | High | Medium | Input sanitization, output validation |
| SSRF via provider URL parameter | Critical | Low | Allowlist of provider URLs |
| Cache poisoning | Medium | Low | Cache key includes all inputs |
| Supply chain attack on dependencies | High | Medium | Lockfile, Dependabot, SCA scanning |

## Assumptions
- LLM provider infrastructure is trusted
- Local file system is trusted
- Network between CLI and provider is untrusted
```

### 24.4 Security Audit Reports

```markdown
# Security Audit Report — v2.1.0

**Auditor:** [Third Party]
**Date:** 2026-03-15
**Scope:** Core library and CLI tool

## Summary
| Severity | Open | Fixed |
|----------|------|-------|
| Critical | 0 | 1 |
| High | 0 | 2 |
| Medium | 1 | 3 |
| Low | 2 | 4 |

## Findings

### CRIT-001: API Key Logging (Fixed)
API keys were logged in debug mode.
**Fix:** Implemented key masking for all log output.

### HIGH-001: Insecure Deserialization (Fixed)
...

## Recommendation Status
- ✅ Key masking implemented
- ✅ Input validation hardened
- ⏳ Dependency audit in progress
```

### 24.5 Responsible Disclosure Guidelines

```markdown
# Responsible Disclosure Guidelines

## Do
- Report privately via security@org.example.com
- Provide clear reproduction steps
- Allow reasonable time for remediation
- Practice responsible disclosure after fix

## Don't
- Do NOT test denial of service attacks
- Do NOT access or modify other users' data
- Do NOT publicly disclose before fix is released
- Do NOT demand payment or compensation

## Safe Harbor
We will not pursue legal action against researchers who:
- Follow the disclosure process
- Act in good faith
- Do not cause harm or data loss
- Stop testing when requested
```

---

## 25. Code of Conduct Documentation

### 25.1 CODE_OF_CONDUCT.md Content Guidance

```markdown
# Code of Conduct

## Our Pledge
We pledge to make participation in this project a harassment-free
experience for everyone, regardless of age, body size, disability,
ethnicity, gender identity, level of experience, nationality,
personal appearance, race, religion, or sexual identity.

## Our Standards

### Expected Behavior
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

### Unacceptable Behavior
- Harassment, intimidation, or discrimination
- Trolling, insulting/derogatory comments
- Publishing others' private information
- Sexual content or unwelcome advances
- Other conduct inappropriate in a professional setting

## Enforcement Responsibilities
Project maintainers are responsible for:
- Clarifying standards of acceptable behavior
- Taking appropriate corrective action
- Maintaining confidentiality of reporters
- Handling violations consistently and fairly
```

### 25.2 Enforcement Documentation

```markdown
## Enforcement Guidelines

### Level 1: Correction
**Violation:** Minor infraction, inappropriate language
**Action:** Private written warning with explanation
**Record:** Kept confidential for 12 months

### Level 2: Warning
**Violation:** Pattern of minor violations or single significant violation
**Action:** Warning with consequences for continued behavior
**Duration:** No interaction with project spaces for 7 days

### Level 3: Temporary Ban
**Violation:** Serious violation of community standards
**Action:** Temporary ban from project spaces
**Duration:** 30 days, with possibility of extension

### Level 4: Permanent Ban
**Violation:** Harassment, doxing, or egregious behavior
**Action:** Permanent expulsion from all project spaces
**Duration:** Indefinite, no appeal

## Appeals Process
Anyone subject to an enforcement action may appeal by
emailing **conduct@org.example.com** within 14 days.
The appeals committee consists of three maintainers not
involved in the original decision.
```

### 25.3 Reporting Process Documentation

```markdown
## Reporting an Incident

### How to Report
1. Email **conduct@org.example.com**
2. Include:
   - Your contact information
   - Names of involved parties
   - Description of the incident
   - Date, time, and location
   - Any supporting evidence (screenshots, logs)
   - Whether you have reported this elsewhere

### What Happens Next
1. Acknowledgment within 24 hours
2. Initial assessment within 72 hours
3. Investigation and decision within 14 days
4. Both reporter and reported party notified of outcome

### Confidentiality
All reports are kept confidential. Information is shared
only on a need-to-know basis with the enforcement team.
```

### 25.4 Transparency Reports

```markdown
# Transparency Report — 2026 Q1

## Summary
| Metric | Count |
|--------|-------|
| Total reports | 3 |
| Resolved | 3 |
| Pending | 0 |

## Cases

| Case | Type | Resolution | Date |
|------|------|------------|------|
| #001 | Language | Level 1: Warning | 2026-01-15 |
| #002 | Harassment | Level 3: 30-day ban | 2026-02-20 |
| #003 | Disagreement | Mediation, no action | 2026-03-10 |

## Policy Changes
- Updated enforcement guidelines to include mediation option
- Added appeals process documentation
```

---

## 26. Documentation Maintenance

### 26.1 Regular Review Cadence

```markdown
# Documentation Review Schedule

| Type | Frequency | Reviewer | Trigger |
|------|-----------|----------|---------|
| README | Quarterly | Maintainer | Feature releases |
| API docs | Per PR | Author | New/updated APIs |
| Tutorials | Semi-annual | Maintainer | Major version changes |
| Migration guides | Per release | Maintainer | Breaking changes |
| Security docs | Annual | Security team | Policy updates |
| Examples | Per commit | Author | Code changes |
```

### 26.2 Outdated Content Detection

```markdown
## Detecting Outdated Documentation

### Automated Checks
- Link checker detects 404 references
- TypeDoc warns on undocumented exports
- markdownlint flags inconsistent formatting

### Manual Indicators
- README mentions removed features
- Examples reference old API signatures
- Screenshots don't match current UI
- Configuration docs show wrong defaults
- Tutorial steps produce different output

### Remediation Workflow
1. Tag outdated content with `[DEPRECATED]` or `TODO: update`
2. Create a documentation issue in the tracker
3. Assign priority based on user impact
4. Update within the next release cycle
5. Remove deprecated content after two versions
```

### 26.3 Versioned Documentation

```markdown
# Versioned Documentation Structure

docs/
├── v1.x/              # Frozen documentation for v1 series
│   ├── README.md
│   ├── configuration.md
│   └── api/
├── v2.x/              # Current stable documentation
│   ├── README.md
│   ├── configuration.md
│   └── api/
└── next/              # Upcoming release (pre-release)
    ├── README.md
    ├── configuration.md
    └── api/
```

Version selector in Docusaurus:

```tsx
import {useVersions} from '@docusaurus/plugin-content-docs'

function VersionSelector() {
  const versions = useVersions()
  return (
    <select>
      {versions.map(v => (
        <option key={v.name}>{v.label}</option>
      ))}
    </select>
  )
}
```

### 26.4 Archive Older Versions

```markdown
# Documentation Version Archive

| Version | Status | Location |
|---------|--------|----------|
| v4.x | Current | `/docs/v4/` |
| v3.x | Maintained | `/docs/v3/` |
| v2.x | Archived | `/docs/archive/v2/` |
| v1.x | Archived | `/docs/archive/v1/` |

Archive criteria:
- Two major versions behind current
- No active users (based on download stats)
- End-of-life announced and passed
```

### 26.5 Community Contribution to Docs

```markdown
# Community Documentation

## How Contributors Can Help
- Fix typos and broken links
- Add code examples to existing docs
- Write tutorials for common use cases
- Translate documentation to other languages
- Report missing or confusing documentation

## Contribution Workflow
1. Label PR with `docs` tag
2. Follow the documentation style guide
3. Include a screenshot for visual changes
4. Run `npm run lint:docs` before submitting
5. Request review from a maintainer

## Review Criteria
| Criterion | Accept | Request Changes | Reject |
|-----------|--------|-----------------|--------|
| Accuracy | ✅ Correct | ⚠️ Minor errors | ❌ Wrong info |
| Clarity | ✅ Easy to follow | ⚠️ Needs rephrasing | ❌ Confusing |
| Completeness | ✅ Covers topic | ⚠️ Missing sections | ❌ Irrelevant |
| Style | ✅ Follows guide | ⚠️ Minor formatting | ❌ Wrong format |

## Recognition
Contributors with significant documentation contributions:
- Listed in the repository README
- Acknowledged in release notes
- Eligible for maintainer track
```

---

## 27. Documentation Anti-Patterns Deep Dive

### 27.1 The Wall of Text

**Pattern:** Single monolithic document with no headings, no code blocks, no structure.

```markdown
# ❌ Bad
Welcome to Project this tool does many things you can
use it for analysis and generation and configuration
management and also integration with CI pipelines first
you need to install it then configure it then run it.

# ✅ Good
# Getting Started

## Installation
Run `npm install -g @org/project`.

## Configuration
Create a `project.json` file in your project root.
```

**Impact:** Users cannot scan for relevant information. They abandon the documentation.

**Fix:** Use descriptive headings, code blocks, tables, and lists. Follow the README anatomy from section 17.

### 27.2 Copy-Paste Without Verification

**Pattern:** Examples that don't actually work when copy-pasted.

```bash
# ❌ Bad (assumes state not established)
transformData(input)
# Uncaught ReferenceError: transformData is not defined

# ✅ Good (includes imports)
import { transformData } from "@org/lib"
const result = transformData({ input: "hello" })
```

**Impact:** Users lose trust. They question whether any of the documentation is accurate.

**Fix:** Test every code block in CI. Have at least one maintainer run through tutorials from scratch each release.

### 27.3 Assuming User Context

**Pattern:** Documentation that skips prerequisites or assumes the user is already familiar with the domain.

```markdown
# ❌ Bad
Just run `deploy` and you're done.

# ✅ Good
## Prerequisites
- Docker installed and running
- AWS credentials configured via `aws configure`
- A domain name with DNS pointing to your load balancer
```

**Impact:** Beginners can't get started. Experts might still miss implicit dependencies.

**Fix:** Be explicit about prerequisites. When in doubt, include it. Link to external setup guides.

### 27.4 Documenting Implementation, Not Interface

**Pattern:** API docs that describe how a function works internally rather than what it does and how to use it.

```typescript
// ❌ Bad
/** Iterates over the cache entries and evicts expired ones */
function get(key: string): Value | undefined

// ✅ Good
/** Retrieves a value by key. Returns undefined if not found or expired. */
function get(key: string): Value | undefined
```

**Impact:** Users learn implementation details they don't need. The interface contract remains unclear.

**Fix:** Describe the contract (inputs, outputs, behavior), not the internal mechanism. Save implementation details for inline code comments.

### 27.5 Never Updating Screenshots

**Pattern:** Screenshots that reflect the UI from two major versions ago.

**Impact:** Users can't match what they see with what the docs show. This undermines confidence in all documentation.

**Fix:** Automate screenshot generation where possible. Set a calendar reminder to review screenshots each quarter. Prefer ASCII diagrams and code blocks over screenshots for CLI tools.

### 27.6 The Missing Error Section

**Pattern:** Documentation that only covers the happy path. No mention of what happens when things go wrong.

```markdown
# ❌ Bad
## Usage
```bash
project analyze ./src
```

# ✅ Good
## Usage
```bash
project analyze ./src
```

## Common Errors
| Error | Cause | Solution |
|-------|-------|----------|
| `API key not configured` | Missing API key | Set `LLM_API_KEY` env var |
| `File not found: ./src` | Path doesn't exist | Verify the path |
| `Rate limited` | Too many requests | Wait and retry, or reduce concurrency |
```

**Impact:** Users get stuck on the first error they encounter. Support burden increases.

**Fix:** Add a troubleshooting section. Document every error the user might see. Provide actionable solutions.

### 27.7 Inconsistent Terminology

**Pattern:** Using different terms for the same concept across documentation.

```markdown
# ❌ Bad
README: "Select a provider"
Config docs: "Choose an LLM backend"
API docs: "Set the model service"

# ✅ Good
All docs: "Select a provider"
```

**Impact:** Cognitive friction. Users wonder if these are different concepts.

**Fix:** Maintain a terminology glossary. Use search-and-replace to enforce consistency. Review across all documentation files during PR review.

### 27.8 No Version Context

**Pattern:** Documentation without version markers or "last updated" dates.

**Impact:** Users don't know if the documentation applies to their version. Maintainers don't know when content was last reviewed.

**Fix:** Add a version note to every page:

```markdown
> **Applies to:** v2.x | **Last updated:** 2026-05-29
```

---

> **End of Task-Docs Document (Global / Brain Box)**
>
> Part of the LifeJiggy OSS Enhancement Framework
> Last updated: 2026-05-29
