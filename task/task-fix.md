# Task-Fix: Issue & Bug Fixing Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Applies to All Projects (OpenCode, Hermes Agents, Kilo Code, OpenClaude, Gemini CLI, etc.)

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [Universal Fix Principles](#2-universal-fix-principles)
3. [Bug Triage & Severity](#3-bug-triage--severity)
4. [Reproduction First](#4-reproduction-first)
5. [Root Cause Analysis](#5-root-cause-analysis)
6. [The "No Side Effects" Universal Rule](#6-the-no-side-effects-universal-rule)
7. [Minimal Change Principle](#7-minimal-change-principle)
8. [Fix Patterns by Bug Class](#8-fix-patterns-by-bug-class)
9. [Testing the Fix](#9-testing-the-fix)
10. [Regression Prevention](#10-regression-prevention)
11. [TypeScript-Specific Bug Patterns](#11-typescript-specific-bug-patterns)
12. [Async Control Flow Bugs](#12-async-control-flow-bugs)
13. [Platform-Specific Fixes](#13-platform-specific-fixes)
14. [Cross-Project Bug Patterns](#14-cross-project-bug-patterns)
15. [Provider Bug Fixing](#15-provider-bug-fixing)
16. [Tool/Agent Bug Fixing](#16-toolagent-bug-fixing)
17. [Configuration Parsing Bugs](#17-configuration-parsing-bugs)
18. [Build/TypeScript Bug Fixing](#18-buildtypescript-bug-fixing)
19. [Streaming Bug Fixing](#19-streaming-bug-fixing)
20. [Memory Leak Fixing](#20-memory-leak-fixing)
21. [Security Fixing](#21-security-fixing)
22. [Universal Edge Cases](#22-universal-edge-cases)
23. [State Management Bugs](#23-state-management-bugs)
24. [I/O and File System Bugs](#24-io-and-file-system-bugs)
25. [Network/HTTP Bugs](#25-networkhttp-bugs)
26. [Fix Validation Workflow](#26-fix-validation-workflow)
27. [PR Submission for Fixes](#27-pr-submission-for-fixes)
28. [Post-Fix Monitoring](#28-post-fix-monitoring)
29. [Universal Anti-Patterns](#29-universal-anti-patterns)
30. [Checklist Reference](#30-checklist-reference)
31. [Debugging Workflow](#31-debugging-workflow)
32. [Cross-Project Fix Reference Table](#32-cross-project-fix-reference-table)
33. [Platform-Specific Bug Encyclopedia](#33-platform-specific-bug-encyclopedia)
34. [Provider-Specific Bug Patterns](#34-provider-specific-bug-patterns)
35. [The Fix Decision Tree](#35-the-fix-decision-tree)

---

## 1. Core Philosophy

### 1.1 The Universal Fixer's Oath

```
First, do no harm to existing behavior.
Fix the root cause, not the symptom.
Every fix must come with a regression test.
A fix without a test is not a fix — it's a hope.
```

### 1.2 Universal Fix Principles

| Principle | Description |
|-----------|-------------|
| **Minimal Change** | Change fewest lines possible. Never refactor while fixing. |
| **No Scope Creep** | Fix exactly what's broken. Enhancements belong in separate branches. |
| **Test-First** | Write a failing test that reproduces the bug before writing the fix. |
| **Root Cause** | Fix why the bug happens, not just mask the symptom. |
| **One Bug, One PR** | Each fix PR addresses exactly one bug. |
| **Regression Guard** | Every fix includes a test that would fail if the bug reappears. |

### 1.3 When It's NOT a Fix

| Statement | Correct Action |
|-----------|---------------|
| "This code could be cleaner" | Enhancement branch |
| "This API is confusing" | DX enhancement |
| "We should add a feature" | Feature branch |
| "This crashes" | **Fix branch** |

---

## 2. Universal Fix Principles

### 2.1 The Fix Spectrum

```
Best:   Add a null check (1 line, purely additive)
Good:   Add a try/catch with fallback
Okay:   Modify a condition to handle an edge case
Bad:    Rewrite the function to "be more robust"
Worst:  Refactor the whole module "while you're at it"
```

### 2.2 Fix by Project Type

| Project Type | Safest Fix | Risky Fix |
|--------------|------------|-----------|
| CLI Agent | Guard clause in tool | Modify agent loop |
| Provider | Handle new response format | Change provider interface |
| Code Generator | Validate output syntax | Change generation pipeline |
| TUI | Fix hook dependencies | Rewrite component tree |

---

## 3. Bug Triage & Severity

### 3.1 Universal Severity

| Severity | Label | Response | Examples |
|----------|-------|----------|----------|
| P0 | `critical` | Immediate | Crash, data loss, security, all users affected |
| P1 | `high` | 24 hours | Feature broken, major regression, most users |
| P2 | `medium` | 72 hours | Feature partially broken, specific config |
| P3 | `low` | 1 week | Edge case, cosmetic, rare condition |

### 3.2 Universal Duplicate Detection

```powershell
$q = [uri]::EscapeDataString("repo:org/repo+is:pr+is:open+" + $keyword)
$result = curl.exe -s "https://api.github.com/search/issues?q=$q&per_page=50" | ConvertFrom-Json
$result.items | Where-Object { $_.title -match $area }
```

---

## 4. Reproduction First

### 4.1 Universal Reproduction Steps

```powershell
# For CLI tools
bun run dev --command-that-triggers-bug

# For tests
bun test --filter="failing-test-name"

# For providers
bun run dev --provider provider-name --prompt "test"
```

### 4.2 Universal Reproduction Checklist

- [ ] Can I reproduce the bug consistently?
- [ ] What are the exact steps?
- [ ] What environment (OS, version, config)?
- [ ] Does it happen with --no-config?
- [ ] Is there a known working configuration?
- [ ] Does it happen on all platforms?

---

## 5. Root Cause Analysis

### 5.1 The Universal 5-Why

```
Bug: "TypeError: Cannot read properties of undefined (reading 'map')"

Why? → Function calls .map() on undefined.
Why? → API response doesn't include expected array.
Why? → Error handler returns undefined instead of empty array.
Why? → Error handler was written for different API version.
Why? → API changed but handler wasn't updated.

FIX: Update error handler to return empty array when field is missing.
```

### 5.2 Root Cause Categories

| Category | Typical Cause | Universal Fix |
|----------|---------------|---------------|
| Null/undefined | Missing guard | Optional chaining + nullish coalescing |
| Type mismatch | Wrong type assumption | Add runtime validation |
| Platform difference | OS-specific behavior | Platform abstraction |
| API change | Upstream format change | Flexible parser |
| Race condition | Shared mutable state | Immutable state / Ref |
| Config parsing | Unexpected shape | Schema validation with fallback |
| Build error | Missing/incorrect import | Fix import path |

---

## 6. The "No Side Effects" Universal Rule

### 6.1 The Cardinal Rule

**A fix must NOT change behavior for any case except the bug being fixed.**

Every line of the fix must be scrutinized:
- "Does this change alter behavior for inputs that previously worked?"
- "Could this fix introduce a new bug in a different code path?"
- "Is this change purely additive, or does it modify existing logic?"

### 6.2 Defense in Depth

```typescript
// Level 1: Fix the root cause
function parseResponse(data: unknown): string[] {
  if (!data) return []  // FIX: return empty instead of crash
  return data.items.map(...)
}

// Level 2: Guard at caller
const results = parseResponse(response) ?? []

// Level 3: Log for observability
if (results.length === 0) {
  log.warn("parseResponse returned empty", { responseTruncated })
}
```

---

## 7. Minimal Change Principle

### 7.1 Metrics

| Metric | Target | Rule of Thumb |
|--------|--------|---------------|
| Lines changed | 1-10 | If > 30, step back |
| Files touched | 1-3 | If > 5, split |
| Functions modified | 1-2 | If > 3, reconsider |

### 7.2 The One-Line Fix

```typescript
// BEFORE: crashes on undefined
const items = response.items.map(process)

// AFTER: null-safe
const items = (response.items ?? []).map(process)
```

### 7.3 The Three-Line Fix

```typescript
// BEFORE
function process(input: string) {
  return transform(input)  // crashes if empty
}

// AFTER
function process(input: string) {
  if (!input) return input  // guard clause — 1 line
  return transform(input)
}
```

---

## 8. Fix Patterns by Bug Class

### 8.1 Null/Undefined

```typescript
// BEFORE:
obj.method()

// AFTER:
obj?.method() ?? defaultValue
```

### 8.2 Async/Await

```typescript
// BEFORE:
const result = fetchData()  // Promise, not data

// AFTER:
const result = await fetchData()
```

### 8.3 Array Errors

```typescript
// BEFORE:
items.forEach(fn)  // crashes if items undefined

// AFTER:
(items ?? []).forEach(fn)
```

### 8.4 Object Errors

```typescript
// BEFORE:
const name = obj.name  // crashes if obj null

// AFTER:
const name = obj?.name ?? "unknown"
```

### 8.5 Numeric Errors

```typescript
// BEFORE:
const ratio = a / b  // Infinity or NaN if b = 0

// AFTER:
const ratio = b !== 0 ? a / b : 0
```

### 8.6 String/Path Errors

```typescript
// BEFORE:
const content = fs.readFileSync(filePath)  // crashes if missing

// AFTER:
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath)
}
```

### 8.7 Error Handling

```typescript
// BEFORE:
try { risky() } catch { /* empty — silent failure */ }

// AFTER:
try { risky() }
catch (err) { log.warn("operation failed", err) }
```

### 8.8 TypeScript Type Errors

```typescript
// BEFORE:
const value: any = risky()  // typed as 'any'

// AFTER:
const value = risky()  // inferred or properly typed
```

### 8.9 Promise Handling

```typescript
// BEFORE: Unhandled promise rejection
fetchData().then(process)

// AFTER: Chain catches
fetchData().then(process).catch(handleError)

// AFTER (async/await):
try {
  const data = await fetchData()
  process(data)
} catch (err) {
  handleError(err)
}
```

### 8.10 Event Emitter

```typescript
// BEFORE: Listener leaks and causes double-fire
emitter.on("data", handleData)

// AFTER: Guard against duplicate listeners
if (!emitter.listenerCount("data")) {
  emitter.on("data", handleData)
}

// AFTER: Once for one-shot events
emitter.once("data", handleData)
```

### 8.11 Stream Errors

```typescript
// BEFORE: Stream error crashes process
readStream.pipe(writeStream)

// AFTER: Handle stream errors on both ends
readStream.on("error", handleError)
writeStream.on("error", handleError)
readStream.pipe(writeStream)
```

### 8.12 JSON Parse

```typescript
// BEFORE: JSON.parse throws on malformed
const data = JSON.parse(raw)

// AFTER: Safe parse with type narrowing
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T }
  catch { return fallback }
}
```

### 8.13 Date/Time

```typescript
// BEFORE: Date parsing varies by locale
const date = new Date("2024-01-15")  // midnight UTC

// AFTER: Explicit date handling
const date = new Date(2024, 0, 15)  // local timezone

// BEFORE: Timezone offset ignored const timestamp = Date.parse(dateString)

// AFTER: Timezone-aware parse
function parseDateSafe(input: string): Date | null {
  const d = new Date(input)
  return isNaN(d.getTime()) ? null : d
}
```

### 8.14 RegExp

```typescript
// BEFORE: Unescaped user input in regex
const re = new RegExp(userInput)  // ReDoS risk

// AFTER: Escape user input
function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// BEFORE: Global regex statefulness
const re = /foo/g
re.test("foo")  // true
re.test("foo")  // false — lastIndex changed

// AFTER: Reset or avoid global flag
const result = "foo".match(/foo/g)
```

### 8.15 Buffer/Encoding

```typescript
// BEFORE: Default encoding is utf-8, may not match source
const text = buffer.toString()

// AFTER: Explicit encoding
const text = buffer.toString("utf-8")

// BEFORE: Binary data treated as string
const corrupted = String(binaryData)

// AFTER: Use Buffer for binary
const encoded = binaryData.toString("base64")
```

### 8.16 Worker Threads

```typescript
// BEFORE: Unhandled worker error
const worker = new Worker("./worker.js")
worker.postMessage(data)

// AFTER: Handle worker lifecycle
const worker = new Worker("./worker.js")
worker.on("message", handleResult)
worker.on("error", handleError)
worker.on("exit", (code) => {
  if (code !== 0) log.error(`Worker exited with code ${code}`)
})
worker.postMessage(data)
```

---

## 9. Testing the Fix

### 9.1 The Universal Regression Test

```typescript
// BEFORE fix — THIS TEST FAILS:
test("handles null input gracefully", () => {
  expect(() => process(null)).not.toThrow()
})

// AFTER fix — THIS TEST PASSES:
test("handles null input gracefully", () => {
  const result = process(null)
  expect(result).toBeDefined()
})
```

### 9.2 Edge Case Test Template

```typescript
describe("edge cases", () => {
  const cases = [
    { input: undefined, expected: "" },
    { input: null, expected: "" },
    { input: "", expected: "" },
    { input: "normal", expected: "NORMAL" },
  ]

  for (const { input, expected } of cases) {
    test(`handles ${JSON.stringify(input)}`, () => {
      expect(process(input)).toBe(expected)
    })
  }
})
```

---

## 10. Regression Prevention

### 10.1 The Regression Test Matrix

| Test Case | Before Fix | After Fix |
|-----------|------------|-----------|
| Bug trigger input | ❌ | ✅ |
| Normal input | ✅ | ✅ |
| Edge: null | ❌/✅ | ✅ |
| Edge: empty | ✅ | ✅ |
| Integration | ✅ | ✅ |

### 10.2 Git Commit for Fixes

```powershell
git checkout -b fix/descriptive-name dev
git add src/buggy-file.ts
git add test/buggy-file.test.ts
git commit -m "fix(scope): short description

Fixes #12345

Root cause: <one-liner>
Fix: <one-liner>
Includes regression test."
```

---

## 11. TypeScript-Specific Bug Patterns

### 11.1 Generic Constraint Issues

```typescript
// BUG: Generic constraint too loose — accepts heterogenous arrays
function first<T>(arr: T[]): T | undefined { return arr[0] }

// FIX: Tighten constraint
function first<T extends string>(arr: T[]): T | undefined { return arr[0] }

// BUG: Conditional type fails at runtime without validation
type MessageOf<T> = T extends { message: infer M } ? M : never

// FIX: Add runtime validation alongside conditional type
function getMessage<T>(obj: T): MessageOf<T> {
  if (obj && typeof obj === "object" && "message" in obj) return obj.message as MessageOf<T>
  throw new Error("No message property")
}
```

### 11.2 Conditional Type Distribution

```typescript
// BUG: Distributive conditional types cause unexpected unions
type IsString<T> = T extends string ? "yes" : "no"
type Result = IsString<string | number>  // "yes" | "no"

// FIX: Wrap in tuple to prevent distribution
type IsStringSafe<T> = [T] extends [string] ? "yes" : "no"
type Result2 = IsStringSafe<string | number>  // "no"
```

### 11.3 Type Guard Predicates

```typescript
// BUG: Without predicate return, TypeScript doesn't narrow
function isString(v: unknown): boolean { return typeof v === "string" }
// v is still unknown after guard

// FIX: Use `value is Type` predicate
function isString(v: unknown): v is string { return typeof v === "string" }
// v is narrowed to string after guard

// BUG: Too permissive — any object with a 'message' passes
function isError(v: unknown): v is Error { return "message" in (v as any) }

// FIX: Proper validation in type guard
function isError(v: unknown): v is Error {
  return !!v && typeof v === "object" && typeof (v as any).message === "string" && typeof (v as any).name === "string"
}
```

### 11.4 Assertion Functions

```typescript
// BUG: Assertion without asserts return type — no narrowing
function assertString(value: unknown): void {
  if (typeof value !== "string") throw new Error("Not a string")
}

// FIX: Use asserts return type
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string")
}
// After call: value is narrowed to string
```

### 11.5 Discriminated Union Exhaustiveness

```typescript
// BUG: Switch not exhaustive — missing case compiles
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2
    case "square": return shape.side ** 2
    // Missing triangle — no error
  }
}

// FIX: Add exhaustiveness check
function assertNever(value: never): never {
  throw new Error(`Unexpected: ${value}`)
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2
    case "square": return shape.side ** 2
    case "triangle": return (shape.base * shape.height) / 2
    default: return assertNever(shape)
  }
}
```

### 11.6 Branded Types

```typescript
// BUG: Structural typing lets PostId be used where UserId is expected
type UserId = string; type PostId = string
function getUser(id: UserId): User
getUser(postId as PostId)  // No error!

// FIX: Branded types prevent mixing
type UserId = string & { readonly __brand: "UserId" }
type PostId = string & { readonly __brand: "PostId" }
function createUserId(id: string): UserId { return id as UserId }
```

### 11.7 Recursive Type Limits

```typescript
// BUG: Deeply recursive type hits instantiation limit
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}

// FIX: Add depth limiter
type Prev = [never, 0, 1, 2, 3, 4, 5]
type DeepReadonlySafe<T, Depth extends number = 5> =
  Depth extends 0 ? T : {
    readonly [K in keyof T]: T[K] extends object
      ? DeepReadonlySafe<T[K], Prev[Depth]>
      : T[K]
  }
```

---

## 12. Async Control Flow Bugs

### 12.1 Promise Chain Errors

```typescript
// BUG: Promise chain loses error context — catch knows only one error
fetchData().then(transform).then(process).catch((err) => { /* which step? */ })

// FIX: Use async/await for linear chains with per-step error context
try { await process(await transform(await fetchData())) }
catch (err) { log.error("Pipeline failed", err) }
```

### 12.2 Unhandled Rejections

```typescript
// BUG: Floating promise rejection goes unhandled
doAsyncWork()

// FIX: Always catch floating promises
doAsyncWork().catch((err) => log.warn("Async work failed", err))

// BUG: Async event handler returns unhandled promise
button.addEventListener("click", async () => { await risky() })

// FIX: Wrap in inner catch
button.addEventListener("click", () => { risky().catch((e) => log.error(e)) })

// Global handler (last resort)
process.on("unhandledRejection", (reason) => { log.error("Unhandled", reason); process.exit(1) })
```

### 12.3 AbortSignal/Timeout

```typescript
// BUG: fetch(url) can hang indefinitely with no timeout

// FIX: AbortSignal timeout wrapper
async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try { return await fetch(url, { signal: ctrl.signal }) }
  catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw new Error("Timed out")
    throw err
  } finally { clearTimeout(timer) }
}
```

### 12.4 Race Condition Fixes

```typescript
// BUG: Concurrent async calls cause lost updates
let counter = 0
async function increment() {
  const current = counter
  await someAsyncWork()
  counter = current + 1  // Lost update if called concurrently
}

// FIX: Mutex serializes access
import { Mutex } from "async-mutex"
const mutex = new Mutex()
async function increment() {
  const release = await mutex.acquire()
  try { counter++ } finally { release() }
}

// BUG: Stale closure in loop (var is function-scoped)
for (var i = 0; i < 5; i++) setTimeout(() => console.log(i), 100)  // 5,5,5,5,5

// FIX: Use let (block-scoped)
for (let i = 0; i < 5; i++) setTimeout(() => console.log(i), 100)  // 0,1,2,3,4
```

### 12.5 Promise.all vs allSettled

```typescript
// BUG: Promise.all fails fast — one failure loses all results
async function fetchAll(urls: string[]) {
  return Promise.all(urls.map(fetch))  // If one fails, all are lost
}

// FIX: allSettled preserves partial results
async function fetchAll(urls: string[]) {
  const results = await Promise.allSettled(urls.map(fetch))
  const successes = results.filter((r): r is PromiseFulfilledResult<Response> => r.status === "fulfilled").map((r) => r.value)
  if (results.some((r) => r.status === "rejected")) log.warn("Some requests failed")
  return successes
}
```

### 12.6 finally Cleanup

```typescript
// BUG: finally overwrites return value
async function readFile(path: string): Promise<string> {
  try { return await fs.readFile(path, "utf-8") }
  catch { return "" }
  finally { return "DEFAULT" }  // Overwrites return AND throw!
}

// FIX: finally is for cleanup only — don't return
async function readFile(path: string): Promise<string> {
  try { return await fs.readFile(path, "utf-8") }
  catch { return "" }
  finally { await closeFileHandle() }
}
```

---

## 13. Platform-Specific Fixes

### 13.1 Windows

| Issue | Fix |
|-------|-----|
| Path separators | Use `path.normalize()` |
| Line endings | `.replace(/\r\n/g, '\n')` |
| Case-insensitive paths | `.toLowerCase()` for comparison |
| Environment variables | Cross-platform env parser |
| Process signals | `process.on('exit')` instead of SIGTERM |

### 13.2 Unix (Linux/macOS)

| Issue | Fix |
|-------|-----|
| Permission errors | Check before access |
| Symlinks | `fs.realpathSync()` |
| Case-sensitive FS | Use exact case |

### 13.3 Cross-Platform Abstraction

```typescript
export const Platform = {
  isWindows: process.platform === "win32",
  isMac: process.platform === "darwin",
  pathSep: process.platform === "win32" ? "\\" : "/",
  lineEnding: process.platform === "win32" ? "\r\n" : "\n",
}
```

---

## 14. Cross-Project Bug Patterns

### 14.1 Pattern: Provider API Change

```typescript
// Applies to: OpenClaude, Kilo Code, Gemini CLI
// BEFORE:
const content = response.choices[0].message.content

// AFTER:
const choice = response.choices?.[0]
const content = choice?.message?.content ?? choice?.text ?? ""
```

### 14.2 Pattern: JSON Parsing

```typescript
// Applies to: All projects
// BEFORE:
const parsed = JSON.parse(raw)

// AFTER:
try { return JSON.parse(raw) }
catch { return defaultFallback }
```

### 14.3 Pattern: Streaming Disconnection

```typescript
// Applies to: All CLI agents
// BEFORE:
for await (const chunk of stream) { process(chunk) }

// AFTER:
try {
  for await (const chunk of stream) { process(chunk) }
} catch (err) {
  log.warn("stream interrupted", err)
}
```

---

## 15. Provider Bug Fixing

### 15.1 Retry with Exponential Backoff

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options = { maxRetries: 3, baseDelay: 1000 }
): Promise<T> {
  let lastError: Error | undefined
  for (let i = 0; i < options.maxRetries; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error
      if (i < options.maxRetries - 1) {
        const delay = options.baseDelay * Math.pow(2, i) + Math.random() * 1000
        await new Promise((r) => setTimeout(r, delay))
      }
    }
  }
  throw lastError!
}
```

### 15.2 Response Format Normalization

```typescript
interface NormalizedResponse {
  content: string; model: string
  usage: { promptTokens: number; completionTokens: number }
}

function normalizeOpenAI(data: any): NormalizedResponse {
  return {
    content: data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? "",
    model: data.model ?? "unknown",
    usage: { promptTokens: data.usage?.prompt_tokens ?? 0, completionTokens: data.usage?.completion_tokens ?? 0 },
  }
}

function normalizeAnthropic(data: any): NormalizedResponse {
  return {
    content: data.content?.[0]?.text ?? "",
    model: data.model ?? "unknown",
    usage: { promptTokens: data.usage?.input_tokens ?? 0, completionTokens: data.usage?.output_tokens ?? 0 },
  }
}
```

### 15.3 Token Limit Handling

```typescript
function truncateToTokens(text: string, budget: number): string {
  const encoded = new TextEncoder().encode(text)
  if (encoded.length <= budget) return text
  return new TextDecoder().decode(encoded.slice(0, Math.max(budget - 100, 0))) + "\n...[truncated]"
}

async function safeComplete(provider: Provider, prompt: string, maxTokens: number): Promise<string> {
  const estimated = Math.ceil(prompt.length / 4)
  return provider.complete({
    prompt: estimated > provider.maxTokens - 100 ? truncateToTokens(prompt, (provider.maxTokens - 200) * 4) : prompt,
    maxTokens,
  })
}
```

### 15.4 Provider Error Classification

```typescript
type ProviderError =
  | { type: "rate_limit"; retryAfter: number }
  | { type: "auth" } | { type: "timeout" }
  | { type: "server_error"; status: number }
  | { type: "unknown"; cause: unknown }

function classifyError(err: unknown): ProviderError {
  if (err instanceof Error) {
    if (err.name === "AbortError") return { type: "timeout" }
    if ("status" in err) {
      const s = (err as any).status
      if (s === 429) return { type: "rate_limit", retryAfter: (err as any).retryAfter ?? 60 }
      if (s === 401 || s === 403) return { type: "auth" }
      if (s >= 500) return { type: "server_error", status: s }
    }
  }
  return { type: "unknown", cause: err }
}

async function handleProviderCall(prompt: string) {
  try {
    return { success: true as const, data: await provider.complete(prompt) }
  } catch (err) {
    const c = classifyError(err)
    if (c.type === "rate_limit") { await sleep(c.retryAfter * 1000); return handleProviderCall(prompt) }
    if (c.type === "auth") return { success: false as const, error: "Authentication failed" }
    if (c.type === "timeout") return { success: false as const, error: "Provider timed out" }
    return { success: false as const, error: `Provider error: ${err}` }
  }
}
```

### 15.5 Provider Rate Limiting

```typescript
class RateLimiter {
  private tokens: number; private lastRefill: number
  constructor(private max: number, private rate: number, private interval = 1000) {
    this.tokens = max; this.lastRefill = Date.now()
  }

  async acquire(): Promise<void> {
    this.refill()
    if (this.tokens < 1) {
      await sleep((1 - this.tokens) * (this.interval / this.rate))
      this.refill()
    }
    this.tokens--
  }

  private refill() {
    const elapsed = Date.now() - this.lastRefill
    this.tokens = Math.min(this.max, this.tokens + (elapsed / this.interval) * this.rate)
    this.lastRefill = Date.now()
  }
}
```

### 15.6 Provider Fallback Chain

```typescript
class ProviderFallback {
  constructor(private providers: { name: string; complete: (p: string) => Promise<string> }[]) {}

  async complete(prompt: string): Promise<string> {
    const errors: string[] = []
    for (const provider of this.providers) {
      try {
        return await provider.complete(prompt)
      } catch (err) {
        errors.push(`${provider.name}: ${err}`)
      }
    }
    throw new Error(`All providers failed: ${errors.join("; ")}`)
  }
}
```

---

## 16. Tool/Agent Bug Fixing

### 16.1 Tool Execution Error Recovery

```typescript
// BUG: Tool crash takes down entire agent
async function executeTool(name: string, input: unknown): Promise<unknown> {
  return await toolRegistry.get(name).handler(input)
}

// FIX: Isolated tool execution with timeout
async function executeToolSafe(name: string, input: unknown): Promise<ToolResult> {
  const tool = toolRegistry.get(name)
  if (!tool) return { success: false, error: `Unknown tool: ${name}` }

  try {
    const result = await withTimeout(tool.handler(input), tool.timeout ?? 30000)
    return { success: true, data: result }
  } catch (err) {
    log.error(`Tool ${name} failed`, err)
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}
```

### 16.2 Tool Response Formatting

```typescript
function formatToolResult(result: ToolResult): string {
  if (!result.success) return `Error: ${result.error}`
  const d = result.data
  if (typeof d === "string") return d
  if (d === null || d === undefined) return "(no result)"
  if (Array.isArray(d)) {
    if (d.length === 0) return "(empty)"
    const rows = d.slice(0, 20)
    const keys = Object.keys(rows[0] ?? {})
    const header = keys.join(" | ")
    const body = rows.map((r) => keys.map((k) => String(r[k] ?? "")).join(" | "))
    return [header, keys.map(() => "---").join(" | "), ...body].join("\n")
  }
  try { return JSON.stringify(d, null, 2) } catch { return String(d) }
}
```

### 16.3 Agent Loop Resilience

```typescript
async function runAgent(agent: Agent, ctx: Context, opts: { maxIterations: number; maxTime: number }) {
  const start = Date.now()
  const history: string[] = []

  for (let i = 0; i < opts.maxIterations; i++) {
    if (Date.now() - start > opts.maxTime) return { success: false, error: "Timed out" }
    const cmd = await agent.decide(ctx)
    const key = `${cmd.tool}:${JSON.stringify(cmd.input)}`
    if (history.filter((a) => a === key).length >= 3) return { success: false, error: "Action loop" }
    history.push(key)
    ctx = ctx.add(await executeToolSafe(cmd.tool, cmd.input))
  }
  return { success: false, error: `Max iterations (${opts.maxIterations}) reached` }
}
```

### 16.4 Tool Permission and Input Validation

```typescript
import { z } from "zod"

const ALLOWED_PATHS = [path.resolve(process.cwd())]

function isPathSafe(targetPath: string): boolean {
  const resolved = path.resolve(targetPath)
  return ALLOWED_PATHS.some((allowed) => resolved.startsWith(allowed + path.sep) || resolved === allowed)
}

const tool = {
  name: "read_file",
  handler: async (input: unknown) => {
    const schema = z.object({ path: z.string() })
    const parsed = schema.safeParse(input)
    if (!parsed.success) return { success: false, error: parsed.error.message }
    if (!isPathSafe(parsed.data.path)) return { success: false, error: "Access denied" }
    return { success: true, data: fs.readFileSync(parsed.data.path, "utf-8") }
  },
}
```

---

## 17. Configuration Parsing Bugs

```typescript
// BEFORE: Assumes field exists
const key = config.apiKey

// AFTER: Multi-source resolution
const key = config.apiKey ?? process.env.API_KEY ?? ""
```

---

## 18. Build/TypeScript Bug Fixing

```typescript
// Error: Module not found
// Fix: Check export exists in source file

// Error: Type 'X' is not assignable to type 'Y'
// Fix: Add type guard or assertion

// Error: Object is possibly 'undefined'
// Fix: Add optional chaining or guard
```

---

## 19. Streaming Bug Fixing

```typescript
// BEFORE: Stream assumed to always work
for await (const token of stream) { ... }

// AFTER: Handle stream errors
try {
  for await (const token of stream) { ... }
} catch (err) {
  // Fallback to non-streaming
  const result = await provider.complete(prompt)
  process(result)
}
```

---

## 20. Memory Leak Fixing

```typescript
// BEFORE: Event listener never removed
emitter.on("data", handler)

// AFTER: Remove on cleanup
emitter.on("data", handler)
// cleanup: emitter.off("data", handler)
```

---

## 21. Security Fixing

### 21.1 Command Injection

```typescript
// BEFORE: Command injection risk
cp.exec(`grep ${userInput} file`)

// AFTER: Safe execution with execFile
cp.execFile("grep", [userInput, "file"])
```

### 21.2 Path Traversal

```typescript
// BEFORE: Allows path traversal (../../etc/passwd)
function readFile(filePath: string): string {
  return fs.readFileSync(path.join(__dirname, "public", filePath), "utf-8")
}

// AFTER: Normalize and validate against base directory
function readFileSafe(filePath: string): string {
  const safe = path.normalize(filePath).replace(/^(\.\.(\/|\\))+/, "")
  const full = path.resolve(__dirname, "public", safe)
  if (!full.startsWith(path.resolve(__dirname, "public") + path.sep)) throw new Error("Path traversal")
  return fs.readFileSync(full, "utf-8")
}
```

### 21.3 Secret Exposure Prevention

```typescript
// BUG: API key logged in error messages
log.error(`Request failed for key ${config.apiKey}`)

// FIX: Redact secrets from logs
function redactSecrets(value: string): string {
  const patterns = [
    /(api[_-]?key|apikey|secret|token|password)=([^&\s]+)/gi,
    /(Authorization|Bearer)\s+\S+/gi,
    /(["']?(api[_-]?key|apikey|secret|token|password)["']?\s*[:=]\s*["'])[^"']+/gi,
  ]
  for (const p of patterns) value = value.replace(p, (_, prefix) => `${prefix}[REDACTED]`)
  return value
}

// BUG: Secrets in error objects sent to client
response.json({ message: "Failed", config: { apiKey: "sk-..." } })

// FIX: Strip known secret keys before serialization
const SECRET_KEYS = new Set(["apiKey", "api_key", "apikey", "secret", "token", "password"])
function stripSecrets(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !SECRET_KEYS.has(k)))
}
```

### 21.4 RCE Prevention

```typescript
// BUG: eval() with user input
function evaluateExpression(expr: string): unknown {
  return eval(expr)  // Arbitrary code execution
}

// FIX: Use mathjs or safe evaluator
function evaluateExpression(expr: string): number {
  return math.evaluate(expr)
}

// BUG: Prototype pollution via merge
function merge(target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") continue
    target[key] = source[key]
  }
}
```

---

## 22. Universal Edge Cases

- [ ] Empty string `""`
- [ ] Zero `0` (falsy when it's valid)
- [ ] False `false` (falsy when valid)
- [ ] Null vs undefined
- [ ] NaN (`NaN !== NaN`)
- [ ] Very large numbers (overflow)
- [ ] Unicode (emoji, CJK, RTL)
- [ ] Very long strings
- [ ] Circular references
- [ ] Concurrent access
- [ ] Infinity (division by zero)
- [ ] Negative zero `-0`
- [ ] BigInt vs Number precision loss
- [ ] Symbol as object key
- [ ] getter/setter side effects
- [ ] Proxy traps that throw
- [ ] TypedArray buffer overflow

---

## 23. State Management Bugs

### 23.1 Global Mutable State

```typescript
// BUG: Global state causes race conditions
let currentUser: User | null = null
async function login(token: string): Promise<User> {
  currentUser = await fetchUser(token)  // Another login can overwrite
  return currentUser
}

// FIX: Return local state, avoid shared mutation
async function login(token: string): Promise<User> {
  return fetchUser(token)
}
```

### 23.2 Shared Reference Mutation

```typescript
// BUG: Shared nested references
const defaultConfig = { endpoints: ["https://api.example.com"] }
function createConfig(overrides: Partial<Config>): Config {
  return { ...defaultConfig, ...overrides }  // Shallow! Arrays shared
}

// FIX: Deep clone
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
```

### 23.3 Cache Invalidation

```typescript
// BUG: Stale cache never invalidates
const cache = new Map<string, { data: unknown; timestamp: number }>()

// FIX: TTL-based cache invalidation
class TTLCache<K, V> {
  private store = new Map<K, { value: V; expiresAt: number }>()
  constructor(private ttlMs: number = 60000) {}

  get(key: K): V | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) { this.store.delete(key); return undefined }
    return entry.value
  }

  set(key: K, value: V): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs })
  }
}
```

### 23.4 Subscription Cleanup

```typescript
// BUG: Subscriptions accumulate, causing memory leaks and double-fires
class Store<T> {
  private subs = new Set<(v: T) => void>()
  subscribe(cb: (v: T) => void): () => void { this.subs.add(cb); return () => this.subs.delete(cb) }
  set(v: T): void { this.subs.forEach((cb) => { try { cb(v) } catch {} }) }
}

// Usage: always call returned cleanup function
const unsub = store.subscribe(handleChange)
unsub()  // Cleanup on dispose
```

### 23.5 State Synchronization

```typescript
// BUG: Two pieces of state drift apart (files vs selectedFile)
let files: string[] = []      // Can remove a file while
let selectedFile: string | null = null  // still selected

// FIX: Atomic state updates derive invariants
function removeFile(files: string[], selected: string | null, toRemove: string) {
  return {
    files: files.filter((f) => f !== toRemove),
    selected: selected === toRemove ? null : selected,
  }
}
```

---

## 24. I/O and File System Bugs

### 24.1 Path Traversal

```typescript
// BUG: User input used directly in file paths
function readUserFile(username: string, filename: string): string {
  return fs.readFileSync(path.join("data", username, filename), "utf-8")
}

// FIX: Sanitize and validate paths
function readUserFileSafe(username: string, filename: string): string {
  const sanitized = filename.replace(/[<>:"|?*\\\0]/g, "_").replace(/\.\./g, "")
  const baseDir = path.resolve("data")
  const filePath = path.resolve(baseDir, username, sanitized)
  if (!filePath.startsWith(baseDir + path.sep)) throw new Error("Path traversal")
  return fs.readFileSync(filePath, "utf-8")
}
```

### 24.2 Encoding Issues

```typescript
// BUG: Wrong encoding assumption — garbled if file is Shift-JIS
fs.readFileSync("japanese.txt", "utf-8")

// FIX: Use iconv-lite for explicit encoding
import iconv from "iconv-lite"
function readFileEncoded(filePath: string, encoding = "utf-8"): string {
  return iconv.decode(fs.readFileSync(filePath), encoding)
}

// BUG: BOM (Byte Order Mark) in UTF-8 files
const text = fs.readFileSync("file.txt", "utf-8")
if (text.charCodeAt(0) === 0xFEFF) { text.slice(1) }  // Strip BOM
```

### 24.3 File Handle Leaks

```typescript
// BUG: If operation throws, file handle never closes
const fd = fs.openSync(filePath, "r")
const data = fs.readSync(fd, buffer, 0, 1024, 0)
fs.closeSync(fd)

// FIX: try/finally ensures cleanup
const fd = fs.openSync(filePath, "r")
try { return fs.readSync(fd, buffer, 0, 1024, 0) }
finally { fs.closeSync(fd) }
```

### 24.4 Stream Backpressure

```typescript
// BUG: Memory grows unbounded with fast producer
readStream.pipe(writeStream)

// FIX: pipeline handles backpressure natively
import { pipeline } from "stream/promises"
await pipeline(fs.createReadStream(source), fs.createWriteStream(dest))
```

### 24.5 Atomic Writes

```typescript
// BUG: Partial write on crash corrupts file
fs.writeFileSync("config.json", JSON.stringify(data))

// FIX: Write to temp file, then rename
function atomicWrite(filePath: string, data: string): void {
  const tmpPath = filePath + ".tmp." + process.pid
  fs.writeFileSync(tmpPath, data, "utf-8")
  fs.renameSync(tmpPath, filePath)
}
```

---

## 25. Network/HTTP Bugs

### 25.1 Timeout Handling

```typescript
// BUG: No timeout — hangs indefinitely
const response = await fetch(url)

// FIX: AbortController with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}
```

### 25.2 Retry Storms & Circuit Breaker

```typescript
// Exponential backoff with jitter prevents thundering herd
function calculateBackoff(attempt: number, baseMs: number, maxMs: number): number {
  return Math.min(baseMs * Math.pow(2, attempt) * (0.5 + Math.random() * 0.5), maxMs)
}

// Circuit breaker prevents cascading failures
class CircuitBreaker {
  private failures = 0; private lastFailure = 0
  private state: "closed" | "open" | "half-open" = "closed"

  constructor(private threshold = 5, private resetTimeoutMs = 30000) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailure > this.resetTimeoutMs) this.state = "half-open"
      else throw new Error("Circuit breaker is open")
    }
    try {
      const r = await fn(); this.failures = 0; this.state = "closed"; return r
    } catch (err) {
      this.failures++; this.lastFailure = Date.now()
      if (this.failures >= this.threshold) this.state = "open"
      throw err
    }
  }
}
```

### 25.3 Connection Pooling

```typescript
// BUG: Each request opens a new TCP connection (slow, resource-heavy)
await Promise.all(urls.map((url) => fetch(url)))

// FIX: Reuse connections with http.Agent keepAlive
import https from "https"
const agent = new https.Agent({ keepAlive: true, maxSockets: 25 })
await Promise.all(urls.map((url) => fetch(url, { agent })))
```

### 25.4 Redirect Handling

```typescript
// BUG: fetch follows 20 redirects silently
const response = await fetch(url)

// FIX: Manual redirect validation
async function fetchSafe(url: string): Promise<Response> {
  const response = await fetch(url, { redirect: "manual" })
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location")
    if (!location) throw new Error("Redirect without Location")
    const resolved = new URL(location, url)
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") throw new Error("Invalid protocol")
    return fetchSafe(resolved.toString())
  }
  return response
}
```

### 25.5 CORS Debugging

```typescript
// BUG: CORS error masks actual server error
async function debugCORS(url: string) {
  try { return await fetch(url, { mode: "cors" }) }
  catch {
    const opaque = await fetch(url, { mode: "no-cors" })
    if (opaque.type === "opaque") throw new Error("CORS error — server needs Access-Control-Allow-Origin")
    throw new Error("Server unreachable")
  }
}
```

---

## 26. Fix Validation Workflow

| Step | Action | Tool |
|------|--------|------|
| 1 | Reproduce bug | Manual test |
| 2 | Write failing test | Test framework |
| 3 | Apply fix | Code edit |
| 4 | Verify fix passes | Test framework |
| 5 | Run all existing tests | Test framework |
| 6 | Run typecheck | tsc |
| 7 | Run lint | ESLint |
| 8 | Manual E2E | CLI / UI |

---

## 27. PR Submission for Fixes

### PR Body Template

```markdown
### Fixes #<number>

**Root cause:** <one-liner>

**Fix:** <one-liner>

**Tested on:** [platforms]

### Checklist

- [X] Minimal change
- [X] Regression test included
- [X] All existing tests pass
- [X] Backward compatible
```

---

## 28. Post-Fix Monitoring

```powershell
git branch -D fix/branch-name
git push fork --delete fix/branch-name
# Monitor for regressions for 48 hours
```

---

## 29. Universal Anti-Patterns

```
🚫 REFACTOR WHILE FIXING — separate branches
🚫 ADD FEATURE TO FIX — different branch
🚫 COMMENT OUT INSTEAD OF FIX — fix properly
🚫 CATCH EVERYTHING — masks real bugs
🚫 CHANGE INTERFACE — breaks all consumers
🚫 USE any TYPE — defeats TypeScript safety
🚫 SUPPRESS LINT RULES FOR FIX — address the root issue
🚫 COPY-PASTE CODE — use shared utilities
🚫 HARDCODE VALUES — use configuration
```

---

## 30. Checklist Reference

### Pre-Coding
- [ ] Bug reproduced consistently
- [ ] Root cause identified
- [ ] No duplicate PRs exist
- [ ] Branch from dev/main

### Coding
- [ ] Minimal lines changed
- [ ] Original behavior preserved for non-bug cases
- [ ] No refactors mixed in
- [ ] Platform compatibility considered

### Testing
- [ ] Regression test written
- [ ] All existing tests pass
- [ ] Edge cases tested

### Pre-Submit
- [ ] typecheck passes
- [ ] lint passes
- [ ] PR body follows template
- [ ] Title: `fix(scope): description`
- [ ] Issue: `Fixes #number`

---

## 31. Debugging Workflow

### 31.1 Bisect Strategy

```
Bug: "Feature X broke between v1.0 and v2.0"

Process:
1. git bisect start
2. git bisect bad v2.0
3. git bisect good v1.0
4. For each midpoint: `bun test --filter="feature-X"`
   - FAIL: git bisect bad | PASS: git bisect good
5. Git identifies exact commit that introduced the bug

File-level bisect: Comment out half the suspected code, run repro, repeat.
```

### 31.2 Reproduction Minimization

```typescript
// Start with full config that triggers bug, remove fields until bug stops
interface ReproConfig { provider: string; model: string; prompt: string; temperature: number; maxTokens: number; tools: any[] }

// Start: full config triggers bug → remove tools (still bug) → reduce prompt (still bug) → temperature 0 (bug DISAPPEARS)
const minimal: ReproConfig = { provider: "anthropic", model: "claude-3", prompt: "Hi", temperature: 0.7, maxTokens: 100, tools: [] }
```

### 31.3 Structured Logging

```typescript
class DebugLogger {
  private logs: any[] = []
  log(entry: { level: string; component: string; operation: string; duration?: number; error?: unknown }) {
    const logEntry = { ...entry, timestamp: new Date().toISOString() }
    this.logs.push(logEntry)
    const prefix = `[${entry.level.toUpperCase()}] ${entry.component}`
    const msg = `${entry.operation}${entry.duration ? ` (${entry.duration}ms)` : ""}`
    entry.error ? console.error(prefix, msg, entry.error) : console.log(prefix, msg)
  }
  export(filePath: string): void { fs.writeFileSync(filePath, JSON.stringify(this.logs, null, 2)) }
}
```

### 31.4 Environment Fingerprinting

```typescript
function captureEnvironment() {
  return {
    os: `${process.platform}-${process.arch}`,
    nodeVersion: process.version,
    packageManager: detectPackageManager(),
    shell: process.env.SHELL ?? process.env.ComSpec ?? "unknown",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
    gitInfo: getGitInfo(),
  }
}
```

### 31.5 Debugging Tools

| Tool | Use Case | Command |
|------|----------|---------|
| Node inspector | Step-through debugging | `node --inspect-brk file.ts` |
| Chrome DevTools | Debug Node.js remotely | `chrome://inspect` |
| Bun debugger | Bun-specific debugging | `bun --inspect file.ts` |
| Process Monitor | File/registry access (Windows) | `procmon.exe` |
| lsof | Open file handles | `lsof -i :3000` |
| Node --prof | CPU profiling | `node --prof file.js` |
| heapdump | Memory analysis | `require('heapdump').writeSnapshot()` |

---

## 32. Cross-Project Fix Reference Table

### 32.1 Bug Pattern by Project

| Pattern | OpenCode | Hermes | Kilo Code | OpenClaude | Gemini CLI |
|---------|----------|--------|-----------|------------|------------|
| Null/undefined | Tool results | Agent state | API responses | Message parsing | Response parsing |
| Provider timeout | Retry + backoff | Abstraction layer | Circuit breaker | Fallback to batch | Jitter retry |
| Streaming | Stream wrapper | Loop recovery | Batch fallback | Stream reconnect | Chunk reassembly |
| Config parsing | Schema validation | Env resolution | Multi-source merge | File watch + reload | CLI flag override |
| Build/type error | Module resolution | Import path | Export missing | Type assertion | Generic constraint |
| Race condition | Tool execution | State mutation | Concurrent requests | Event handler | Prompt queue |
| Memory leak | Event listeners | Agent context | Stream buffers | Subscription cleanup | History cache |

### 32.2 Fix Pattern by Project

| Project | Most Common Fix | Lines Changed | Risk |
|---------|----------------|---------------|------|
| OpenCode | Guard clause + retry wrapper | 3-8 | Low |
| Hermes Agents | Agent loop guard + state check | 5-15 | Medium |
| Kilo Code | Response validation + fallback | 3-10 | Low |
| OpenClaude | Provider response normalization | 5-20 | Medium |
| Gemini CLI | Stream error handling | 3-12 | Low |

### 32.3 Test Strategy by Project

| Project | Framework | Key Test Types | Target |
|---------|-----------|----------------|--------|
| OpenCode | Vitest | Unit + E2E (CLI) | 80%+ |
| Hermes Agents | Bun test | Unit + Integration | 75%+ |
| Kilo Code | Vitest | Unit + Snapshot | 85%+ |
| OpenClaude | Jest | Unit + Provider mock | 80%+ |
| Gemini CLI | Bun test | Unit + E2E (CLI) | 75%+ |

---

## 33. Platform-Specific Bug Encyclopedia

### 33.1 Windows

| Bug | Fix |
|-----|-----|
| Paths with spaces | Wrap in quotes, `path.resolve()` |
| CRLF line endings | `.gitattributes` with `* text=auto` |
| Case-insensitive FS | `git mv OldName NewName` |
| Long paths >260 chars | Prefix `\\?\` or enable long paths |
| No SIGTERM | Use `process.on('exit')` |
| File locking | Ensure `fs.close()` or use streams |

### 33.2 macOS

| Bug | Fix |
|-----|-----|
| .DS_Store interference | Filter with `.filter(f => f !== '.DS_Store')` |
| Symlink resolution | Use `fs.realpathSync()` |
| Gatekeeper quarantine | `xattr -dr com.apple.quarantine` |
| Shell is zsh (not bash) | Use `/bin/sh` for POSIX scripts |
| Temp dir not cleaned | Use `os.tmpdir()` + explicit cleanup |

### 33.3 Linux

| Bug | Fix |
|-----|-----|
| EACCES | Check `fs.accessSync()` before operations |
| EMFILE (too many files) | Increase ulimit or use file pool |
| EPIPE (broken pipe) | Handle with `stream.destroy()` |
| SELinux denial | Check audit log, adjust context |
| Inotify limit | Increase `/proc/sys/fs/inotify/max_user_watches` |

### 33.4 Cross-Platform Utility

```typescript
export const CrossPlatform = {
  isWindows: process.platform === "win32",
  isMac: process.platform === "darwin",
  sep: process.platform === "win32" ? "\\" : "/",
  normalizePath(p: string) { return path.normalize(p.replace(/[/\\]/g, this.sep)) },
  sanitizeFilename(name: string) {
    return this.isWindows ? name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_") : name.replace(/\0/g, "_")
  },
  getConfigDir(appName: string) {
    if (this.isWindows) return path.resolve(process.env.APPDATA ?? "", appName)
    if (this.isMac) return path.resolve(os.homedir(), "Library", "Application Support", appName)
    return path.resolve(process.env.XDG_CONFIG_HOME ?? path.resolve(os.homedir(), ".config"), appName)
  },
}
```

---

## 34. Provider-Specific Bug Patterns

### 34.1 OpenAI

```typescript
// BUG: finish_reason varies ("stop", "length", "content_filter", "tool_calls", null)
function isComplete(reason: string | null): boolean {
  return reason !== "content_filter" && reason !== "length"
}

// BUG: Streaming delta differs from non-streaming format
// Non-streaming: response.choices[0].message.content
// Streaming: response.choices[0].delta.content
function getStreamContent(chunk: unknown): string {
  const c = (chunk as any).choices?.[0]
  return c?.delta?.content ?? c?.message?.content ?? ""
}
```

### 34.2 Anthropic

```typescript
// BUG: Response structure: { content: [{ type: "text", text: "..." }] }
function extractAnthropicContent(response: unknown): string {
  const content = (response as any).content
  if (Array.isArray(content)) {
    return content.filter((b: any) => b.type === "text").map((b: any) => b.text).join("\n")
  }
  return ""
}

// BUG: Rate limit status code is 529 (not 429)
if (response.status === 529) {
  await sleep(parseInt(response.headers.get("retry-after") ?? "5") * 1000)
  return retryRequest()
}

// BUG: SSE events use content_block_delta format, not choices/delta
async function* streamAnthropic(res: Response): AsyncGenerator<string> {
  for await (const line of streamLines(res)) {
    if (line.startsWith("data: ")) {
      const data = JSON.parse(line.slice(6))
      if (data.type === "content_block_delta" && data.delta?.type === "text_delta") yield data.delta.text
    }
  }
}
```

### 34.3 Google Gemini

```typescript
// BUG: Response is nested in candidates → content → parts → text
function extractGeminiContent(response: unknown): string {
  const parts = (response as any).candidates?.[0]?.content?.parts
  return parts?.map((p: any) => p.text).join("\n") ?? ""
}

// BUG: Safety filters block without error — check finishReason
function isGeminiBlocked(response: unknown): boolean {
  const c = (response as any).candidates?.[0]
  if (c?.finishReason === "SAFETY") return true
  const ratings = c?.safetyRatings ?? []
  return ratings.some((r: any) => r.probability === "HIGH" || r.probability === "MEDIUM")
}
```

### 34.4 Ollama (Local)

```typescript
// BUG: Response is line-delimited JSON, not SSE
// {"model":"llama2","response":"Hello!","done":true}

async function* streamOllama(response: Response): AsyncGenerator<string> {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    for (const line of (buffer + decoder.decode(value)).split("\n")) {
      if (!line.trim()) continue
      try {
        const data = JSON.parse(line)
        if (data.response) yield data.response
        if (data.done) return
      } catch { /* skip */ }
    }
    buffer = ""
  }
}

// BUG: Model not downloaded — returns 404
async function ensureOllamaModel(model: string): Promise<boolean> {
  try {
    const list = await (await fetch("http://localhost:11434/api/tags")).json()
    if (list.models?.some((m: any) => m.name.startsWith(model))) return true
    const pull = await fetch("http://localhost:11434/api/pull", { method: "POST", body: JSON.stringify({ name: model }) })
    return pull.ok
  } catch { return false }
}
```

---

## 35. The Fix Decision Tree

### 35.1 Fix Decision Flow

```
Bug Report → Can reproduce?
  ├── No  → Ask for repro steps
  ├── Yes → Isolate to smallest test case
  └── No  → Add "can't reproduce" label
                │
                ▼
Root cause known?
  ├── Yes → Apply known fix pattern
  ├── No  → Use bisect + debugging to find root
  └── No  → Add debug instrumentation
                │
                ▼
Fix approach:
  ├── Guard clause (1-3 lines, purely additive)
  ├── Modify condition (3-10 lines, edge case)
  └── Add fallback/default (1-5 lines, ?? / [])
                │
                ▼
Write regression test → Run all tests
  ├── All pass → Create PR + monitor 48h
  ├── Test fails → Fix broken test first
  └── Other tests fail → Check for regression
```

### 35.2 Decision Rules

| Condition | Action |
|-----------|--------|
| Known bug pattern | Apply pattern + test |
| Unknown root cause | Debug first, then fix |
| Third-party dependency | Pin version or workaround |
| Bug in generated code | Fix generator, not output |
| Security vulnerability | Fix immediately |
| Breaking change | Deprecate first, remove later |
| Intermittent failure | Add retry + logging |
| Performance regression | Profile before optimizing |

### 35.3 When Not to Fix

| Scenario | Alternative |
|----------|-------------|
| Deprecated feature | Recommend migration |
| Fix breaks API contract | Deprecate, add new API |
| Affects < 0.1% of users | Document known issue |
| Requires platform change | Add polyfill |
| Upstream fix incoming | Add test, reference upstream PR |

---

> **End of Task-Fix Document (Global / Brain Box)**
>
> Part of the LifeJiggy OSS Enhancement Framework
> The Universal Master Reference
> Last updated: 2026-05-29