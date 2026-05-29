# Task-Feat: Feature Implementation Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Applies to All Projects (OpenCode, Hermes Agents, Kilo Code, OpenClaude, Gemini CLI, etc.)

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [Universal Feature Development Principles](#2-universal-feature-development-principles)
3. [Project-Type Adaptation](#3-project-type-adaptation)
4. [Feature Discovery & Validation](#4-feature-discovery--validation)
5. [Codebase Analysis Workflow](#5-codebase-analysis-workflow)
6. [Understanding Effect-TS Patterns](#6-understanding-effect-ts-patterns)
7. [Universal Architecture Preservation Patterns](#7-universal-architecture-preservation-patterns)
8. [The Wrapper Pattern](#8-the-wrapper-pattern)
9. [The Hook Pattern](#9-the-hook-pattern)
10. [The Config Extension Pattern](#10-the-config-extension-pattern)
11. [Implementation Skeleton by Project Type](#11-implementation-skeleton-by-project-type)
12. [Provider Integration Pattern](#12-provider-integration-pattern)
13. [Tool Registration Pattern](#13-tool-registration-pattern)
14. [Plugin & Extension Pattern](#14-plugin--extension-pattern)
15. [Testing by Project Type](#15-testing-by-project-type)
16. [Feature Flag Strategy](#16-feature-flag-strategy)
17. [Backward Compatibility Patterns](#17-backward-compatibility-patterns)
18. [Configuration Design Principles](#18-configuration-design-principles)
19. [API Response Design](#19-api-response-design)
20. [Universal Edge Cases](#20-universal-edge-cases)
21. [Error Handling by Layer](#21-error-handling-by-layer)
22. [Performance Considerations by Type](#22-performance-considerations-by-type)
23. [Observability & Logging Patterns](#23-observability--logging-patterns)
24. [Documentation Expectations](#24-documentation-expectations)
25. [PR Submission Checklist](#25-pr-submission-checklist)
26. [Common Pitfalls by Project Type](#26-common-pitfalls-by-project-type)
27. [Review & Iteration](#27-review--iteration)
28. [Post-Merge Responsibilities](#28-post-merge-responsibilities)
29. [Quick Reference: Cross-Project Patterns](#29-quick-reference-cross-project-patterns)
30. [File Structure Templates by Project](#30-file-structure-templates-by-project)

---

## 1. Core Philosophy

### 1.1 The Universal Developer's Oath

```
Add without breaking.
Extend without modifying.
Enhance without disrupting.
Every project has its own architecture — respect it.
Every user has their own config — preserve it.
Every interface has its consumers — don't break them.
```

### 1.2 The LifeJiggy Universal Tenets

| Tenet | Description | Applies To |
|-------|-------------|------------|
| **Additive First** | New capabilities are additive layers, not modifications to existing code. Prefer new functions, new services, new config options over changing existing signatures. | All projects |
| **Backward Compatible** | Old configs, APIs, and workflows continue working. Every feature must work identically when disabled. | All projects |
| **Opt-In Defaults** | Default behavior must never change. New features are opt-in via config flags, CLI options, or environment variables. | All projects |
| **Interface Stability** | Never modify existing interfaces (Provider, Tool, Agent, Plugin, etc.). Only extend with optional methods or new interfaces. | All projects |
| **Platform Awareness** | Features work on Windows, macOS, and Linux. Never assume Unix-only paths or patterns. | All projects |
| **Streaming Integrity** | Never break streaming when adding features. Streaming is core to CLI agent UX. | CLI agents, providers |

### 1.3 The Golden Rule of Feature Development

```
If you're modifying an existing line of code instead of adding a new one,
ask yourself: "Can I achieve this by adding instead of changing?"

If the answer is yes — rewrite as an addition.
If the answer is no — get a second opinion before proceeding.
```

### 1.4 When to Build vs When to Wait

| Signal | Action |
|--------|--------|
| Requested by 3+ distinct users | Build |
| Solves a real pain point in the issue tracker | Build |
| "Nice to have" with no clear use case | Wait |
| Requires breaking existing APIs | Wait / Design additive alternative |
| Duplicates existing functionality | Research why existing approach doesn't fit |

---

## 2. Universal Feature Development Principles

### 2.1 The Feature Decision Matrix

| Question | If Yes | If No |
|----------|--------|-------|
| Is there a real user need backed by issues? | Proceed | Don't build |
| Can it be additive (no existing code modified)? | Proceed | Redesign |
| Does it preserve backward compatibility? | Proceed | Add config flag with default-off |
| Is there a clear test plan? | Proceed | Design tests first |
| Does it fit the project's architecture? | Proceed | Follow existing patterns |

### 2.2 The Feature Scope Template

```
Feature Name: <short name>
Issue: #<number>
Use Case: <who benefits and why>
Success Criteria:
  - <measurable outcome 1>
  - <measurable outcome 2>
Non-Goals (explicitly out of scope):
  - <what we're NOT building>
Risk Assessment:
  - <what could go wrong>
  - <mitigation strategy>
```

### 2.3 Feature Lifecycle

```
Research → Design → RFC → Implement → Test → Review → Ship → Monitor
    ↑         ↑         ↑        ↑         ↑       ↑       ↑       ↑
    │         │         │        │         │       │       │       └─ Watch for regressions
    │         │         │        │         │       │       └───────── Release
    │         │         │        │         │       └────────────────── PR merged
    │         │         │        │         └────────────────────────── Tests pass
    │         │         │        └──────────────────────────────────── Code written
    │         │         └───────────────────────────────────────────── Community feedback
    │         └─────────────────────────────────────────────────────── Design doc
    └───────────────────────────────────────────────────────────────── Issue filed
```

---

## 3. Project-Type Adaptation

### 3.1 Feature Patterns by Project Type

| Project Type | Example | Feature Pattern | Extension Point |
|--------------|---------|-----------------|-----------------|
| **CLI Agent** | OpenCode, OpenClaude, Gemini CLI | New tool, new provider, new command | tools.register(), providers.register() |
| **Agent Framework** | Hermes Agents | New agent tool, new memory backend, new capability | Tool interface, Plugin interface |
| **Code Generator** | Kilo Code | New provider, new analyzer, new generation mode | Provider interface, Analyzer interface |
| **AI SDK** | packages/sdk | New API method, new integration, new client | SDK client interface |
| **Multi-Provider** | OpenClaude | New LLM provider | ApiProvider interface |

### 3.2 What to Never Touch (Core Invariants)

| Component | Reason | What to Do Instead |
|-----------|--------|-------------------|
| **Core Agent Loop** | Breaking this breaks the entire agent | Add hooks/events, don't modify the loop |
| **Provider Interface** | All 200+ providers depend on it | Extend with optional methods only |
| **Tool Interface** | All tools depend on it | Add new tools, don't change the contract |
| **Configuration Schema** | All users depend on it | Add optional fields with defaults |
| **Public API/SDK** | All integrations depend on it | Add new methods, don't change signatures |

### 3.3 Reading the Project's Architecture

```powershell
# For any project, find the key files:
# 1. Interface definitions
Select-String -Path "**/*.ts" -Pattern "^export interface |^export type " |
  Where-Object { $_ -match "Tool|Provider|Plugin|Agent|Service" } |
  ForEach-Object { $_.Path, $_.LineNumber }

# 2. Registry/registration points
Select-String -Path "**/*.ts" -Pattern "register|registry|Registry" |
  ForEach-Object { $_.Path }

# 3. Existing implementations
Select-String -Path "**/*.ts" -Pattern "implements.*Tool|implements.*Provider" |
  ForEach-Object { $_.Path }

# 4. Config/config schema
Select-String -Path "**/*.ts" -Pattern "Schema\.Struct|z\.object|Config" |
  Where-Object { $_ -match "export" } |
  ForEach-Object { $_.Path }
```

---

## 4. Feature Discovery & Validation

### 4.1 Finding Feature Requests

```powershell
# Search for enhancement/feature requests
$q = [uri]::EscapeDataString("repo:org/repo+is:issue+is:open+label:enhancement")
curl.exe -s "https://api.github.com/search/issues?q=$q&per_page=50"

# Search for feature requests with no label
$q = [uri]::EscapeDataString("repo:org/repo+is:issue+is:open+label:feature")
curl.exe -s "https://api.github.com/search/issues?q=$q&per_page=50"

# Check for existing PRs attempting the same feature
$q = [uri]::EscapeDataString("repo:org/repo+is:pr+is:open+" + $featureName)
curl.exe -s "https://api.github.com/search/issues?q=$q&per_page=30"
```

### 4.2 Validation Checklist

Before coding any feature:

- [ ] Is there an existing issue describing the feature?
- [ ] If not, create one with clear use cases and expected behavior
- [ ] Are there existing PRs attempting the same feature?
- [ ] Is the feature aligned with the project's roadmap and architecture?
- [ ] Can it be implemented as an additive, non-breaking change?
- [ ] Is there at least one real-world use case?
- [ ] Does the feature have a clear "done" definition?
- [ ] Does it work across all supported platforms? (Windows, macOS, Linux)
- [ ] Does it work in all execution modes? (streaming, non-streaming, TUI, non-TUI)
- [ ] Does it respect the project's core interfaces?
- [ ] Does it have a rollback path if something goes wrong?

---

## 5. Codebase Analysis Workflow

### 5.1 Universal Analysis Steps

```
Step 1: Identify the architectural layer
  - CLI entry point? → cli/ or commands/
  - Core agent?      → core/ or agent/
  - Provider?        → providers/ or services/api/
  - Tool?            → tools/
  - UI?              → ink/, screens/, components/

Step 2: Read the interface file
  - What does the interface require?
  - What are the existing implementations?
  - What patterns do they follow?
  - What test utilities exist?

Step 3: Find the registration point
  - Where are implementations registered?
  - How are they discovered by the system?
  - Is there auto-discovery or manual registration?

Step 4: Read the test file
  - How are existing implementations tested?
  - What mock/context utilities are available?
  - What are the edge cases tested?

Step 5: Trace the execution path
  - How does data flow from user input to execution?
  - Where are the extension points?
  - What happens on error?
```

### 5.2 Understanding the Effect-TS Pattern (when applicable)

This codebase uses Effect-TS. Understanding the pattern is critical for some projects:

```typescript
// Service Definition
export interface Interface {
  readonly doThing: (input: string) => Effect.Effect<Result, Error, Requirements>
}

// Service Class
export class Service extends Context.Service<Service, Interface>()("@project/MyService") {}

// Layer
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const dep = yield* OtherService
    return Service.of({
      doThing: (input) => Effect.succeed({ result: input }),
    })
  }),
)
```

### 5.3 Reading Code Effectively

```powershell
# Read a specific function
function Read-Function {
  param($File, $Name)
  $content = Get-Content $File -Raw
  $pattern = "(export\s+)?(async\s+)?function\s+$Name[\s\S]*?^}"
  [regex]::Match($content, $pattern, [Text.RegularExpressions.RegexOptions]::Multiline).Value
}

# Find all exports in a file
Select-String -Path "src/tool/shell.ts" -Pattern "^export (function|const|class|interface|type)" | ForEach-Object { $_.Line }
```

---

## 6. Understanding Effect-TS Patterns

### 6.1 Standard Service Template

```typescript
import { Effect, Layer, Context, Schema } from "effect"

// Schema (if needed for config/params)
export const Params = Schema.Struct({
  input: Schema.String,
  options: Schema.optional(Schema.Struct({
    flag: Schema.optional(Schema.Boolean),
  })),
})

// Interface
export interface Interface {
  readonly method1: (input: string) => Effect.Effect<string>
  readonly method2: () => Effect.Effect<void>
}

// Service Class
export class Service extends Context.Service<Service, Interface>()("@project/MyService") {}

// Layer
export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const dep1 = yield* DepService1
    const dep2 = yield* DepService2
    return Service.of({
      method1: (input) =>
        Effect.gen(function* () {
          yield* dep1.prepare()
          return yield* dep2.process(input)
        }),
      method2: () => Effect.sync(() => { /* synchronous work */ }),
    })
  }),
)

// Default Layer
export const defaultLayer = layer.pipe(
  Layer.provide(DepService1.defaultLayer),
  Layer.provide(DepService2.defaultLayer),
)
```

### 6.2 Dependency Injection Tips

- Always yield services at the top of the layer
- Never pass services as function arguments (use `yield*`)
- Use `Layer.provide()` to compose layers
- Create a `defaultLayer` for convenience

### 6.3 Error Handling in Effect Services

```typescript
// Tagged errors
export class FeatureError extends Schema.TaggedErrorClass<FeatureError>()("FeatureError", {
  message: Schema.String,
  code: Schema.String,
}) {}

// In the service
method: (input: string) =>
  Effect.gen(function* () {
    if (!isValid(input)) {
      return yield* new FeatureError({ message: "Invalid input", code: "E001" })
    }
    return process(input)
  }).pipe(
    Effect.catchTag("FeatureError", (err) =>
      Effect.succeed(`fallback for: ${err.message}`)
    ),
  ),
```

---

## 7. Universal Architecture Preservation Patterns

### 7.1 The Registration Pattern

The most common pattern across all projects: register new implementations, don't modify existing ones.

```typescript
// CLI Agent (OpenCode, Gemini CLI, Hermes Agents):
tools.register("my_tool", new MyTool())

// Multi-Provider (OpenClaude):
providers.register("myprovider", MyProvider)

// Plugin System:
plugins.register(new MyPlugin())

// Config/Features:
features: {
  myFeature: { enabled: false }
}
```

### 7.2 The Wrapper Pattern

When adding behavior to an existing function, prefer wrapping over modifying:

```typescript
// EXISTING: untouched
export function existingFunction(input: string): string {
  return transform(input)
}

// NEW: wrapper that extends behavior
export function enhancedFunction(input: string, opts?: { feature?: boolean }): string {
  const result = existingFunction(input)
  if (opts?.feature) {
    return additionalProcessing(result)
  }
  return result
}
```

### 7.3 The Hook Pattern

Add hooks/events for extensibility instead of modifying core logic:

```typescript
export interface FeatureHooks {
  onBeforeProcess?: (input: string) => Effect.Effect<string>
  onAfterProcess?: (result: string) => Effect.Effect<void>
  onError?: (error: Error) => Effect.Effect<void>
}

export function createProcessor(hooks: FeatureHooks = {}) {
  return Effect.gen(function* () {
    return {
      process: (input: string) =>
        Effect.gen(function* () {
          if (hooks.onBeforeProcess) {
            input = yield* hooks.onBeforeProcess(input)
          }
          const result = yield* coreProcess(input)
          if (hooks.onAfterProcess) {
            yield* hooks.onAfterProcess(result)
          }
          return result
        }).pipe(
          Effect.catchAll((err) => {
            if (hooks.onError) return hooks.onError(err).pipe(Effect.flatMap(() => Effect.fail(err)))
            return Effect.fail(err)
          }),
        ),
    }
  })
}
```

### 7.4 The Layer Composition Pattern

```typescript
// EXISTING layer — unchanged
export const existingLayer = Layer.effect(
  ExistingService,
  Effect.gen(function* () { ... }),
)

// NEW layer — composes with existing
export const enhancedLayer = Layer.effect(
  EnhancedService,
  Effect.gen(function* () {
    const existing = yield* ExistingService
    return EnhancedService.of({
      newMethod: () => Effect.succeed("new capability"),
      delegate: existing,  // preserve access to original
    })
  }),
)
```

---

## 8. The Wrapper Pattern

### 8.1 Wrapping a Tool

```typescript
function withTimeout<T extends Tool>(tool: T, defaultTimeout = 10000): T {
  return {
    ...tool,
    execute: async (input, ctx) => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), ctx.config?.toolTimeout ?? defaultTimeout)
      try {
        return await tool.execute(input, { ...ctx, signal: controller.signal })
      } finally {
        clearTimeout(timeout)
      }
    },
  }
}

function withLogging<T extends Tool>(tool: T): T {
  return {
    ...tool,
    execute: async (input, ctx) => {
      log.info("tool:execute", { tool: tool.name, input })
      const start = performance.now()
      const result = await tool.execute(input, ctx)
      log.info("tool:complete", {
        tool: tool.name,
        duration: Math.round(performance.now() - start),
      })
      return result
    },
  }
}

// Compose wrappers:
const enhancedTool = withLogging(withTimeout(myTool))
```

### 8.2 Wrapping a Provider

```typescript
function withRetry<T extends ApiProvider>(provider: T, retries = 3): T {
  return {
    ...provider,
    async *sendMessage(messages, opts) {
      let lastError: Error | undefined
      for (let i = 0; i < retries; i++) {
        try {
          yield* provider.sendMessage(messages, opts)
          return
        } catch (err) {
          lastError = err as Error
          log.warn("provider:retry", { attempt: i + 1, error: lastError.message })
        }
      }
      yield { type: "error", error: lastError! }
    },
  }
}

const enhancedProvider = withRetry(openAIProvider)
```

### 8.3 Wrapping a Config

```typescript
function withDefaults<T extends Record<string, unknown>>(config: T, defaults: Partial<T>): T {
  return { ...defaults, ...config }
}

const config = withDefaults(userConfig, {
  enabled: false,
  maxItems: 10,
  timeout: 30000,
})
```

---

## 9. The Hook Pattern

### 9.1 Tool Hooks

```typescript
export interface ToolHooks {
  onBeforeExecute?: (input: unknown) => Promise<unknown>
  onAfterExecute?: (result: ToolResult) => Promise<void>
  onError?: (error: Error) => Promise<void>
}

export function createToolWithHooks(tool: Tool, hooks: ToolHooks): Tool {
  return {
    ...tool,
    execute: async (input, ctx) => {
      try {
        const processedInput = hooks.onBeforeExecute ? await hooks.onBeforeExecute(input) : input
        const result = await tool.execute(processedInput, ctx)
        if (hooks.onAfterExecute) await hooks.onAfterExecute(result)
        return result
      } catch (err) {
        if (hooks.onError) await hooks.onError(err as Error)
        throw err
      }
    },
  }
}
```

### 9.2 Agent Hooks

```typescript
export interface AgentHooks {
  onMessage?: (message: Message) => void
  onToolCall?: (tool: string, input: unknown) => void
  onToolResult?: (tool: string, result: ToolResult) => void
  onError?: (error: AgentError) => void
  onComplete?: (response: string) => void
}
```

### 9.3 Provider Hooks

```typescript
export interface ProviderHooks {
  onRequest?: (messages: Message[], opts?: SendOpts) => void
  onChunk?: (chunk: string) => void
  onComplete?: (fullText: string) => void
  onError?: (error: ProviderError) => void
}
```

---

## 10. The Config Extension Pattern

### 10.1 Adding Optional Config

```typescript
// In config schema — add optional section
export const ConfigSchema = Schema.Struct({
  existingField: Schema.String,
  // NEW: optional feature config
  myFeature: Schema.optional(
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean).pipe(Schema.withDefault(() => false)),
      timeout: Schema.optional(Schema.Number).pipe(Schema.withDefault(() => 30000)),
      maxItems: Schema.optional(Schema.Number).pipe(Schema.withDefault(() => 10)),
    }),
  ),
})
```

### 10.2 Reading Config Safely

```typescript
const myFeature = config.myFeature ?? { enabled: false, timeout: 30000, maxItems: 10 }
if (!myFeature.enabled) {
  // Skip feature, existing behavior unchanged
  return existingBehavior()
}
// Use feature with configured values
```

### 10.3 Config Versioning

```typescript
// Add version field for future migrations
export const ConfigSchema = Schema.Struct({
  version: Schema.optional(Schema.Number).pipe(Schema.withDefault(() => 1)),
  // ... other fields
})

function migrateConfig(config: unknown, targetVersion: number): unknown {
  let cfg = config as Record<string, unknown>
  let version = (cfg.version as number) ?? 1
  while (version < targetVersion) {
    if (version === 1) {
      cfg = { ...cfg, myFeature: { enabled: false } }
    }
    version++
  }
  return { ...cfg, version: targetVersion }
}
```

---

## 11. Implementation Skeleton by Project Type

### 11.1 CLI Agent Tool (OpenCode, Gemini CLI, Hermes Agents)

```typescript
// src/tools/my-tool.ts
import { Tool, ToolContext, ToolResult } from "./types"

export interface MyToolInput {
  query: string
  maxResults?: number
}

export const myTool: Tool<MyToolInput, string[]> = {
  name: "my_tool",
  description: "Searches for information. Use when user asks to find or search.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "The search query" },
      maxResults: { type: "number", default: 5, description: "Max results" },
    },
    required: ["query"],
  },
  execute: async (input, ctx) => {
    const results = await performSearch(input.query, input.maxResults ?? 5)
    return { success: true, output: results }
  },
}
```

### 11.2 Provider Implementation (OpenClaude, Kilo Code)

```typescript
// src/services/api/newprovider.ts
import { ApiProvider, StreamEvent, SendOpts, Message } from "./index"

export interface NewProviderConfig {
  apiKey: string
  model?: string
  baseUrl?: string
}

export class NewProvider implements ApiProvider {
  readonly name = "newprovider"
  readonly model: string
  readonly supportsStreaming = true

  constructor(private config: NewProviderConfig) {
    this.model = config.model ?? "default-model"
  }

  async *sendMessage(messages: Message[], opts?: SendOpts): AsyncIterable<StreamEvent> {
    try {
      const response = await fetch(`${this.config.baseUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: opts?.stream ?? true,
        }),
      })
      if (!response.ok) {
        yield { type: "error", error: new Error(`HTTP ${response.status}`) }
        return
      }
      const reader = response.body?.getReader()
      if (!reader) return
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        yield { type: "text", text: decoder.decode(value) }
      }
    } catch (err) {
      yield { type: "error", error: err as Error }
    }
  }
}
```

### 11.3 Plugin/Extension (Hermes Agents)

```typescript
// src/plugins/my-plugin/index.ts
import { Plugin, PluginContext } from "../index"

export class MyPlugin implements Plugin {
  readonly name = "my-plugin"
  readonly version = "1.0.0"

  async initialize(ctx: PluginContext): Promise<void> {
    ctx.registerTool({
      name: "plugin_tool",
      description: "Tool provided by my-plugin",
      execute: async (input) => ({ success: true, output: "done" }),
    })
    log.info("plugin initialized", { plugin: this.name })
  }

  async cleanup(): Promise<void> {
    log.info("plugin cleaned up", { plugin: this.name })
  }
}
```

### 11.4 Config Schema Addition (All Projects)

```typescript
// TypeScript / Zod / Effect-Schema
myFeature: Schema.optional(
  Schema.Struct({
    enabled: Schema.optional(Schema.Boolean).pipe(Schema.withDefault(() => false)),
    maxItems: Schema.optional(Schema.Number).pipe(Schema.withDefault(() => 10)),
    behavior: Schema.optional(Schema.String).pipe(Schema.withDefault(() => "default")),
  }),
)

// JSON Schema:
{
  "myFeature": {
    "type": "object",
    "properties": {
      "enabled": { "type": "boolean", "default": false },
      "maxItems": { "type": "number", "default": 10 }
    }
  }
}
```

---

## 12. Provider Integration Pattern

### 12.1 The Provider Contract

Every provider must follow this contract:

```typescript
export interface ApiProvider {
  readonly name: string
  readonly model: string
  readonly supportsStreaming: boolean
  readonly sendMessage: (messages: Message[], opts?: SendOpts) => AsyncIterable<StreamEvent>
  readonly countTokens?: (text: string) => number
}
```

### 12.2 Provider Registration

```typescript
// In the provider registry:
export const providers: Record<string, new (config: unknown) => ApiProvider> = {
  openai: OpenAIProvider,
  anthropic: AnthropicProvider,
  gemini: GeminiProvider,
  ollama: OllamaProvider,
  deepseek: DeepSeekProvider,
  myprovider: NewProvider,  // NEW: additive
}

export function createProvider(type: string, config: unknown): ApiProvider {
  const Provider = providers[type]
  if (!Provider) throw new Error(`Unknown provider: ${type}`)
  return new Provider(config)
}
```

### 12.3 Provider with Fallback

```typescript
class FallbackProvider implements ApiProvider {
  constructor(private providers: ApiProvider[]) {}

  async *sendMessage(messages: Message[], opts?: SendOpts): AsyncIterable<StreamEvent> {
    for (const provider of this.providers) {
      try {
        yield* provider.sendMessage(messages, opts)
        return
      } catch (err) {
        log.warn("provider:fallback", { from: provider.name, error: (err as Error).message })
      }
    }
    yield { type: "error", error: new Error("All providers failed") }
  }
}
```

---

## 13. Tool Registration Pattern

### 13.1 Tool Registry

```typescript
export class ToolRegistry {
  private tools = new Map<string, Tool>()

  register(tool: Tool): void {
    if (this.tools.has(tool.name)) {
      log.warn("tool:duplicate", { tool: tool.name })
    }
    this.tools.set(tool.name, tool)
    log.info("tool:registered", { tool: tool.name })
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name)
  }

  getAll(): Tool[] {
    return Array.from(this.tools.values())
  }

  async execute(name: string, input: unknown): Promise<ToolResult> {
    const tool = this.tools.get(name)
    if (!tool) throw new Error(`Unknown tool: ${name}`)
    return await tool.execute(input, { registry: this })
  }
}
```

### 13.2 Tool with Dependencies

```typescript
export const fileSearchTool: Tool = {
  name: "file_search",
  description: "Search files in the workspace",
  execute: async (input, ctx) => {
    const sandbox = ctx.sandbox  // access current sandbox
    const result = await sandbox.execute(`grep -r "${input.pattern}" .`)
    return { success: true, output: result.stdout }
  },
}
```

---

## 14. Plugin & Extension Pattern

### 14.1 Plugin Interface

```typescript
export interface Plugin {
  readonly name: string
  readonly version: string
  initialize(ctx: PluginContext): Promise<void>
  cleanup(): Promise<void>
}

export interface PluginContext {
  registerTool(tool: Tool): void
  registerHook(hook: string, handler: Function): void
  getConfig(): Record<string, unknown>
  log: Logger
}
```

### 14.2 Plugin Loading

```typescript
export async function loadPlugins(pluginDir: string): Promise<Plugin[]> {
  const plugins: Plugin[] = []
  const files = await fs.readdir(pluginDir)
  for (const file of files) {
    if (!file.endsWith(".js") && !file.endsWith(".mjs")) continue
    try {
      const mod = await import(path.join(pluginDir, file))
      const plugin: Plugin = mod.default ?? mod.plugin
      await plugin.initialize(createContext())
      plugins.push(plugin)
      log.info("plugin:loaded", { plugin: plugin.name, version: plugin.version })
    } catch (err) {
      log.warn("plugin:failed", { file, error: (err as Error).message })
    }
  }
  return plugins
}
```

---

## 15. Testing by Project Type

### 15.1 Universal Test Template

```typescript
describe("Feature Name", () => {
  // 1. Happy path
  test("works with valid input", async () => {
    const result = await feature.execute({ input: "valid" })
    expect(result.success).toBe(true)
  })

  // 2. Edge cases
  test("handles empty input", async () => {
    const result = await feature.execute({ input: "" })
    expect(result.success).toBe(true)
  })

  test("handles null/undefined", async () => {
    const result = await feature.execute({ input: undefined })
    expect(result).toBeDefined()
  })

  test("handles timeout", async () => {
    const result = await feature.execute({ input: "slow" }, { timeout: 1 })
    expect(result.success).toBe(false)
  })

  // 3. Error handling
  test("handles provider errors gracefully", async () => {
    const result = await feature.execute({ input: "error" })
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  // 4. Backward compatibility
  test("works with old config format", async () => {
    const config = { field: "value" }  // old format
    const result = await feature.withConfig(config)
    expect(result).toBeDefined()
  })
})
```

### 15.2 Testing Effect-Based Code

```typescript
import { testEffect } from "../test/lib/effect"
const it = testEffect(TestLayer)

it.live("executes correctly", () =>
  Effect.gen(function* () {
    const svc = yield* MyService
    const result = yield* svc.execute("test")
    expect(result).toBe("expected")
  }),
)
```

### 15.3 Testing Providers

```typescript
describe("Provider", () => {
  test("sends message and receives text response", async () => {
    const provider = new MyProvider({ apiKey: "test-key" })
    const events: StreamEvent[] = []
    for await (const event of provider.sendMessage([
      { role: "user", content: "Say hello" },
    ])) {
      events.push(event)
    }
    expect(events.some((e) => e.type === "text")).toBe(true)
  })

  test("handles API errors gracefully", async () => {
    const provider = new MyProvider({ apiKey: "invalid" })
    const events: StreamEvent[] = []
    for await (const event of provider.sendMessage([
      { role: "user", content: "test" },
    ])) {
      events.push(event)
    }
    expect(events.some((e) => e.type === "error")).toBe(true)
  })
})
```

### 15.4 Project-Specific Test Commands

| Project | Test Command | Test Framework | Coverage Tool |
|---------|-------------|----------------|---------------|
| OpenCode | `bun test` | Bun test | `bun test --coverage` |
| OpenClaude | `bun test` | Bun test | Built-in coverage |
| Kilo Code | `npm run test` | Vitest | `@vitest/coverage-v8` |
| Gemini CLI | `npm run test` | Vitest | `@vitest/coverage-v8` |
| Hermes Agents | `bun test` | Bun test | Built-in coverage |

---

## 16. Feature Flag Strategy

### 16.1 Levels of Feature Gating

```
Level 0: Always on (no flag, fully integrated)
  - Only after extensive testing and user feedback

Level 1: Config-flagged (default disabled, can enable)
  - New features during beta period
  - Implementation: config.features.myFeature.enabled

Level 2: Config-flagged (default enabled, can disable)
  - Features graduating from beta
  - Implementation: config.features.myFeature.enabled

Level 3: Environment-flagged
  - Experimental features
  - Implementation: process.env.MY_FEATURE === "1"

Level 4: Code path exists but unreachable
  - Development-only features
  - Implementation: removed before PR merge
```

### 16.2 Implementation Pattern

```typescript
// Config schema
myFeature: Schema.optional(
  Schema.Struct({
    enabled: Schema.optional(Schema.Boolean).pipe(Schema.withDefault(() => false)),
  }),
)

// In service
const myFeatureEnabled = config.myFeature?.enabled ?? false
if (myFeatureEnabled) {
  return executeWithFeature(input)
}
return executeWithoutFeature(input)
```

### 16.3 Flag Lifecycle

```
Phase 1: Config-flagged, default disabled  → Beta testers
Phase 2: Default enabled (can disable)     → Graduating
Phase 3: Always on (flag removed)          → Stable
Phase 4: Code removed (if never stable)    → Rejected
```

---

## 17. Backward Compatibility Patterns

### 17.1 Configuration Backward Compatibility

```typescript
// OLD format (must still work):
// { "model": "gpt-4" }

// NEW format (additive):
// { "model": "gpt-4", "features": { "myFeature": { "enabled": true } } }

// Parser must handle both:
const features = config.features ?? {}
const myFeatureEnabled = features.myFeature?.enabled ?? false
```

### 17.2 API Backward Compatibility

```typescript
// NEVER remove parameters — add optional ones only
// OLD:
export function doSomething(input: string): string

// NEW (backward compatible):
export function doSomething(input: string, options?: { newParam?: boolean }): string

// Implementation:
export function doSomething(input: string, options?: { newParam?: boolean }): string {
  if (options?.newParam) {
    return newBehavior(input)
  }
  return oldBehavior(input)
}
```

### 17.3 Provider Interface Evolution

```typescript
// NEVER remove methods from provider interface
// Only add optional methods

export interface ApiProvider {
  sendMessage: (messages: Message[], opts?: SendOpts) => AsyncIterable<StreamEvent>
  // NEW: optional methods
  countTokens?: (text: string) => number
  supportsStreaming?: boolean
}
```

### 17.4 Data Migration for Persistent Features

```typescript
// When adding persistent state:
// 1. New table/file, not modified existing table
// 2. Migration script is separate, resumable
// 3. Old table continues to work

export async function migrateData(): Promise<void> {
  const db = await getDatabase()
  const exists = await db.tableExists("my_feature")
  if (exists) return  // already migrated
  await db.createTable(`CREATE TABLE my_feature (... )`)
  log.info("migration:complete", { table: "my_feature" })
}
```

---

## 18. Configuration Design Principles

### 18.1 Good vs Bad Config Design

```typescript
// GOOD: Optional with sensible default
myFeature?: {
  enabled?: boolean       // defaults to false
  timeout?: number        // defaults to 30000
  maxItems?: number       // defaults to 10
  behavior?: "strict" | "permissive"  // defaults to "permissive"
}

// BAD: Required with no default
myFeature: {
  enabled: boolean        // breaks existing configs!
}
```

### 18.2 Environment Variable Resolution

```typescript
function resolveConfig(key: string): string | undefined {
  // Priority: config file → env var → default
  const fromConfig = config[key]
  if (fromConfig !== undefined) {
    log.debug(`config:${key} resolved from file`)
    return fromConfig
  }
  const fromEnv = process.env[`PROJECT_${key.toUpperCase()}`] ?? process.env[key.toUpperCase()]
  if (fromEnv !== undefined) {
    log.debug(`config:${key} resolved from env`)
    return fromEnv
  }
  return undefined
}
```

### 18.3 Config Validation with Helpful Errors

```typescript
function validateConfig(config: unknown): ValidationResult {
  const errors: string[] = []
  const cfg = config as Record<string, unknown>

  if (cfg.provider && !AVAILABLE_PROVIDERS.includes(cfg.provider as string)) {
    const suggestion = findClosestMatch(cfg.provider as string, AVAILABLE_PROVIDERS)
    errors.push(
      `Unknown provider "${cfg.provider}".` +
      (suggestion ? ` Did you mean "${suggestion}"?` : ""),
    )
  }

  if (errors.length > 0) {
    log.error("config:validation_failed", { errors })
    throw new ConfigError(errors.join("\n"))
  }
}
```

---

## 19. API Response Design

### 19.1 Additive Response Design

```typescript
// EXISTING response — never change:
interface ToolResult {
  success: boolean
  output: string
}

// ENHANCED response — additive only:
interface ToolResult {
  success: boolean
  output: string
  metadata?: {     // NEW: optional, consumers ignore it
    duration: number
    source: string
  }
}
```

### 19.2 Error Response Design

```typescript
interface ErrorResult {
  success: false
  error: string
  code?: string          // NEW: optional error code
  retryAfter?: number    // NEW: optional retry hint
  suggestion?: string    // NEW: optional user-facing suggestion
}
```

---

## 20. Universal Edge Cases

### 20.1 Edge Cases to Always Test

- [ ] Empty string `""` — does the feature handle it?
- [ ] Zero `0` — is it treated as falsy accidentally?
- [ ] False `false` — is it treated as falsy when it's a valid value?
- [ ] Null `null` — explicit null vs undefined
- [ ] NaN `NaN` — `NaN !== NaN`
- [ ] Very large/small numbers — overflow, precision
- [ ] Unicode — emoji, CJK, RTL text
- [ ] Special characters — null byte, escape sequences
- [ ] Very long strings — buffer overflow
- [ ] Circular references — infinite recursion
- [ ] Concurrent access — race condition
- [ ] Missing file/network — ENOENT, ECONNREFUSED
- [ ] Permission denied — EACCES
- [ ] Disk full — ENOSPC

### 20.2 Edge Case Test Template

```typescript
describe("edge cases", () => {
  const cases = [
    { input: undefined, expected: "" },
    { input: null, expected: "" },
    { input: "", expected: "" },
    { input: "normal", expected: "NORMAL" },
    { input: "UPPER", expected: "UPPER" },
    { input: "123", expected: "123" },
    { input: "  spaced  ", expected: "SPACED" },
    { input: "\n\t", expected: "" },
    { input: "a".repeat(100000), expected: "A".repeat(100000) },
  ]

  for (const { input, expected } of cases) {
    test(`handles ${JSON.stringify(input).slice(0, 50)}`, async () => {
      const result = await feature(input)
      expect(result).toBe(expected)
    })
  }
})
```

---

## 21. Error Handling by Layer

### 21.1 Service-Level Error Handling

```typescript
export class Service {
  execute(input: unknown): Effect.Effect<string, ServiceError> {
    return Effect.gen(function* () {
      const parsed = yield* Schema.validate(InputSchema)(input)
      return yield* coreLogic(parsed)
    }).pipe(
      Effect.catchTag("ParseError", (err) =>
        new ServiceError({ message: `Invalid input: ${err.message}`, code: "E001" }),
      ),
      Effect.catchAll((err) =>
        new ServiceError({ message: `Service error: ${err.message}`, code: "E002" }),
      ),
    )
  }
}
```

### 21.2 Tool-Level Error Handling

```typescript
export const safeTool: Tool = {
  name: "safe_tool",
  description: "A tool with proper error handling",
  execute: async (input, ctx) => {
    try {
      if (!input.query) return { success: true, output: [] }
      const result = await Promise.race([
        performSearch(input.query),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 10000)),
      ])
      return { success: true, output: result }
    } catch (err) {
      log.error("tool:failed", { tool: "safe_tool", error: (err as Error).message })
      return { success: false, error: (err as Error).message }
    }
  },
}
```

### 21.3 Provider-Level Error Handling

```typescript
async *safeSendMessage(provider: ApiProvider, messages: Message[]): AsyncIterable<StreamEvent> {
  try {
    for await (const event of provider.sendMessage(messages)) {
      yield event
    }
  } catch (err) {
    log.error("provider:error", { provider: provider.name, error: (err as Error).message })
    yield { type: "error", error: err as Error }
  }
}
```

---

## 22. Performance Considerations by Type

### 22.1 Performance Checklist

- [ ] No synchronous I/O in hot paths?
- [ ] No O(n²) algorithms that could be optimized?
- [ ] Are streams used for large data instead of loading into memory?
- [ ] Are database queries indexed?
- [ ] Are Effect.cached / LRU cache used for expensive computations?
- [ ] Are timeouts present for all network calls?
- [ ] No memory leaks (unbounded caches, listeners)?
- [ ] Bundle size considered? (tree-shaking, dynamic imports)

### 22.2 Token Economy (CLI Agents)

```typescript
// Token usage is the primary cost in CLI agents

// BEFORE: Sending full tool output to LLM
const result = yield* tool.execute(input)
return `Tool returned: ${JSON.stringify(result)}`

// AFTER: Truncated for token efficiency
const result = yield* tool.execute(input)
const summary = truncateForLLM(result, { maxTokens: 2000 })
return `Tool returned: ${summary}`
```

### 22.3 Caching

```typescript
// For deterministic operations, cache results
const cache = new Map<string, { result: unknown; timestamp: number }>()
const CACHE_TTL = 60000

export async function getCached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    log.debug("cache:hit", { key: key.slice(0, 50) })
    return cached.result as T
  }
  const result = await fn()
  cache.set(key, { result, timestamp: Date.now() })
  log.debug("cache:miss", { key: key.slice(0, 50) })
  return result
}
```

### 22.4 Bundle Size Optimization

```typescript
// For bundled projects:
// BAD: static import
import { heavyModule } from "./heavy-module"

// GOOD: dynamic import (tree-shaken if unused)
const heavyModule = () => import("./heavy-module").then(m => m.heavyModule)
```

---

## 23. Observability & Logging Patterns

### 23.1 Structured Logging

```typescript
import * as Log from "@project/util/log"
const log = Log.create({ service: "myFeature" })

log.info("feature:action", {
  feature: "my_feature",
  action: "execute",
  duration: elapsed,
  inputSize: input.length,
  success: true,
})
```

### 23.2 Timing Metrics

```typescript
export async function withTiming<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  try {
    const result = await fn()
    log.info("timing:complete", {
      operation: name,
      duration: Math.round(performance.now() - start),
      success: true,
    })
    return result
  } catch (err) {
    log.info("timing:failed", {
      operation: name,
      duration: Math.round(performance.now() - start),
      success: false,
    })
    throw err
  }
}
```

### 23.3 Event Bus Integration

```typescript
export interface FeatureEvents {
  execute: { input: unknown; duration: number }
  complete: { output: unknown; duration: number }
  error: { error: string; duration: number }
}

const bus = new EventEmitter()
bus.on("feature:execute", (data) => log.info("feature:execute", data))
```

---

## 24. Documentation Expectations

### 24.1 JSDoc/TSDoc for Features

```typescript
/**
 * MyFeature — description of what this does
 *
 * This is a non-breaking enhancement. When disabled, behaves
 * identically to the original behavior.
 *
 * Works with: [all providers / all tools / specific environments]
 * Settings: config.features.myFeature.enabled
 * Platform: Windows, macOS, Linux
 *
 * @param input - Description of the input parameter
 * @param options - Optional configuration
 * @returns Description of the return value
 *
 * @example
 * ```ts
 * const result = await myFeature({ input: "test" })
 * // result = { success: true, output: "..." }
 * ```
 *
 * @since x.y.z
 */
```

### 24.2 README Updates

When adding a user-facing feature:
- Add to feature list
- Add usage example
- Document configuration options
- Update CLI help if applicable

---

## 25. PR Submission Checklist

### 25.1 Universal Pre-Submit

- [ ] Feature is gated behind config flag (default: disabled)
- [ ] Works with all supported platforms (Windows, macOS, Linux)
- [ ] Works in all execution modes (streaming, non-streaming, TUI, non-TUI)
- [ ] All existing tests pass
- [ ] New tests cover the feature (happy path + edge cases + error handling)
- [ ] Edge cases are handled (empty input, errors, timeouts, concurrent calls)
- [ ] Backward compatibility verified (old configs, old API calls work)
- [ ] No existing code was modified (only new code added)
- [ ] Types are correct (typecheck passes)
- [ ] Logging is appropriate (not excessive, not missing)
- [ ] Errors are properly typed (not just `throw new Error()`)
- [ ] PR title uses `feat(scope): title` format
- [ ] PR description includes the template sections
- [ ] Issue is linked (`Closes #N`)

### 25.2 PR Body Template

```markdown
### Issue for this PR

Closes #<number>

### Type of change

- [X] New feature
- [ ] Bug fix
- [ ] Enhancement / improvement
- [ ] Documentation

### What does this PR add?

<description of the feature, why it's useful, and how it works>

This is an additive, non-breaking change. Existing behavior is fully preserved.
The feature is opt-in via configuration (default: disabled).

### How did you verify your code works?

- [X] New tests pass
- [X] All existing tests pass
- [X] Tested on [Windows / macOS / Linux]
- [X] Tested with [all providers / specific environments]

### Checklist

- [X] Additive change (no existing code modified)
- [X] Backward compatible
- [X] Tests for new capabilities
- [X] Edge cases handled
- [X] typecheck passes
```

---

## 26. Common Pitfalls by Project Type

### 26.1 CLI Agent Pitfalls

| Pitfall | Solution |
|---------|----------|
| Feature assumes specific LLM | Use abstract provider interface |
| Feature blocks streaming | Use async iteration, never await full response |
| Feature modifies agent state | Return data, don't mutate context |
| Feature assumes tool always available | Check tool registry at runtime |

### 26.2 Provider Pitfalls

| Pitfall | Solution |
|---------|----------|
| Feature assumes streaming support | Check supportsStreaming flag |
| Feature assumes specific response format | Handle multiple formats |
| Feature lacks timeout | Add configurable timeout |
| Feature lacks cost model | Add cost tracking registration |

### 26.3 TUI/UI Pitfalls

| Pitfall | Solution |
|---------|----------|
| Feature causes re-render loop | Stable keys, proper hook deps |
| Feature breaks non-TUI mode | Guard TUI-specific code |
| Feature assumes color terminal | Respect NO_COLOR / --no-color |

---

## 27. Review & Iteration

### 27.1 Handling Review Feedback

| Feedback Type | Response |
|---------------|----------|
| "Add tests for edge case X" | Add tests, push |
| "This should be configurable" | Add config flag with default |
| "Does this work on Windows?" | Test cross-platform, add platform guards |
| "Consider performance impact" | Profile, optimize if needed |
| "Break this into smaller PRs" | Split the feature into smaller chunks |

### 27.2 PR Lifecycle

```
Open PR → Bot checks → Human review → CI runs → Merge
   ↑        ↓ fail       ↓ changes
   └── Fix body ──┘  └── Push fixes ──┘
```

---

## 28. Post-Merge Responsibilities

### 28.1 After Merge Checklist

- [ ] Delete the branch locally: `git branch -D feat/branch-name`
- [ ] Delete the branch on fork: `git push fork --delete feat/branch-name`
- [ ] Update local dev: `git checkout dev && git pull origin dev`
- [ ] Monitor for regression reports in the next 48 hours
- [ ] Update project tracking documents

### 28.2 Monitoring

```powershell
$q = [uri]::EscapeDataString("repo:org/repo+is:issue+is:open+" + $featureKeyword)
curl.exe -s "https://api.github.com/search/issues?q=$q&per_page=10"
```

---

## 29. Quick Reference: Cross-Project Patterns

### 29.1 Interface Contracts by Project

| Project | Tool Interface | Provider Interface | Plugin Interface |
|---------|---------------|-------------------|------------------|
| OpenCode | `Tool` in `src/tool/` | N/A | N/A |
| OpenClaude | `Tool` in `src/tools/` | `ApiProvider` in `services/api/` | `Plugin` in `plugins/` |
| Kilo Code | N/A | `Provider` in `providers/` | N/A |
| Gemini CLI | `Tool` in `packages/core/src/tools/` | N/A | N/A |
| Hermes Agents | `Tool` in `src/tools/` | `ModelProvider` in `providers/` | `Plugin` in `plugins/` |

### 29.2 Config Naming Convention

| Project | Config File | Config System |
|----------|-------------|---------------|
| OpenCode | `opencode.json` | Effect Schema |
| OpenClaude | `.openclaude-profile.json` | JSON profile |
| Kilo Code | `kilocode.json` | Schema.parse |
| Gemini CLI | `.gemini/settings.json` | JSON settings |
| Hermes Agents | `hermes.json` | JSON config |

### 29.3 Build & Test Commands

| Project | Build | Test | Typecheck |
|---------|-------|------|-----------|
| OpenCode | `bun run build` | `bun test` | `tsc --noEmit` |
| OpenClaude | `bun run build` | `bun test` | `tsc --noEmit` |
| Kilo Code | `npm run build` | `npm run test` | `npm run typecheck` |
| Gemini CLI | `npm run bundle` | `npm run test` | `npm run typecheck` |
| Hermes Agents | `bun run build` | `bun test` | `tsc --noEmit` |

---

## 30. File Structure Templates by Project

### 30.1 New Tool

```
src/tools/my-tool/
├── index.ts          # Tool definition and export
├── types.ts          # Tool-specific types
└── my-tool.test.ts   # Tests
```

### 30.2 New Provider

```
src/providers/myprovider/
├── index.ts          # Provider class and registration
├── config.ts         # Provider-specific config types
└── myprovider.test.ts # Tests
```

### 30.3 New Plugin

```
src/plugins/my-plugin/
├── index.ts          # Plugin class
├── tools.ts          # Plugin-provided tools
├── hooks.ts          # Plugin hooks
└── my-plugin.test.ts # Tests
```

### 30.4 New Feature (Config + Service)

```
src/features/my-feature/
├── index.ts          # Service definition and layer
├── config.ts         # Config schema
├── my-feature.ts     # Core implementation
└── my-feature.test.ts # Tests
```

---

> **End of Task-Feat Document (Global / Brain Box)**
>
> Part of the LifeJiggy OSS Enhancement Framework
> The Universal Master Reference
> Last updated: 2026-05-29
