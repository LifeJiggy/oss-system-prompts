# Task-Enhance: Enhance & Improve Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Phase 3: Making Projects Stronger, Cleaner, and Better Without Breaking Anything

---

## 1. Core Philosophy

### 1.1 The Enhancer's Oath

```
Make it better. Make it stronger. Make it cleaner.
Never break what already works.
Never change the contract.
Never surprise the user.

Every enhancement should feel like it was always meant to be there.
```

### 1.2 The Three Pillars

| Pillar | Question | Approach |
|--------|----------|----------|
| **Preserve** | Does this maintain full backward compatibility? | Additive changes only |
| **Improve** | Does this make the project measurably better? | Observable, safer, faster, clearer |
| **Respect** | Would existing contributors recognize this? | Follow existing patterns |

### 1.3 Enhancement vs Refactor vs Rewrite

| | Enhancement | Refactor | Rewrite |
|---|------------|----------|---------|
| Changes behavior? | No (adds new) | No | Yes |
| Changes architecture? | No | Maybe | Yes |
| Adds code? | Yes | No | Yes |
| Removes code? | No | Yes | Yes |
| Risk | Low | Medium | High |

---

## 2. LifeJiggy's Enhancement Manifesto

```
I.   Thou shalt not remove existing code.
II.  Thou shalt not change existing function signatures.
III. Thou shalt not alter existing behavior.
IV.  Thou shalt make all additions optional.
V.   Thou shalt preserve backward compatibility.
VI.  Thou shalt write tests for every new capability.
VII. Thou shalt follow the patterns of the codebase.
VIII. Thou shalt not refactor while enhancing.
IX.  Thou shalt document the before vs after benefit.
X.   Thou shalt open enhancements as Draft PRs first.
```

---

## 3. When to Enhance vs When to Fix vs When to Build

| Situation | Branch | Rationale |
|-----------|--------|-----------|
| Production crashes | `fix/` | Core broken |
| Wrong output | `fix/` | Contract violated |
| Missing timeout | `enhance/` | Works, add safety |
| No logging | `enhance/` | Works, add observability |
| Config too rigid | `enhance/` | Works, add flexibility |
| Performance slow | `enhance/` | Works, optimize |
| New user request | `feat/` | New capability |
| Missing tests | `enhance/` | Works, add coverage |

---

## 4. Enhancement Opportunity Detection

### 4.1 Universal Scan Questions

```
For every function:
  Does it have error handling?        No → add try/catch
  Does it have logging?               No → add structured logging
  Does it have input validation?      No → add schema validation
  Does it have timeout?               No → add configurable timeout
  Does it have null safety?           No → add optional chaining

For every module:
  Does it have tests?                 No → add test coverage
  Does it have documentation?         No → add JSDoc
  Does it handle edge cases?          No → add edge case handling
  Does it have platform support?      No → add platform abstraction
```

### 4.2 Automated Detection

```powershell
# Find missing error handling
Select-String -Path "**/*.ts" -Pattern "\.then\(" | Where-Object {
  !(Select-String $_.Path -Pattern "\.catch" -Quiet)
}

# Find console.log (should use logger)
Select-String -Path "**/*.ts" -Pattern "console\.(log|warn|error)"

# Find TODO/FIXME
Select-String -Path "**/*.ts" -Pattern "TODO|FIXME|HACK"
```

---

## 5. Enhancement Categories

### 5.1 Safety Enhancements

| Enhancement | Implementation |
|-------------|----------------|
| Null safety | `obj?.prop ?? defaultValue` |
| Error handling | `try/catch` with logging |
| Input validation | Schema-based validation |
| Timeout | `Promise.race` or `AbortController` |
| Retry logic | Retry with exponential backoff |

### 5.2 Observability Enhancements

| Enhancement | Implementation |
|-------------|----------------|
| Function logging | `log.debug("fn:enter/exit")` |
| Timing metrics | `const start = performance.now()` |
| Event emission | `bus.publish(Event.Name, context)` |
| Debug mode | Conditional verbose logging |

### 5.3 Performance Enhancements

| Enhancement | Implementation |
|-------------|----------------|
| Caching | Map with TTL |
| Lazy init | Defer expensive operations |
| Parallel execution | `Promise.all()` with concurrency limit |
| Debouncing | ClearTimeout pattern |

### 5.4 DX Enhancements

| Enhancement | Implementation |
|-------------|----------------|
| Better errors | Include context and suggestions |
| CLI examples | Add usage examples |
| Config validation | Schema with friendly errors |
| Debug flags | `--debug` and `--verbose` |

---

## 6. The Enhancement Diff Pattern

```diff
- // BEFORE: No error handling, no logging
- function process(input) {
-   return transform(input)
- }

+ // AFTER: With guard, logging, validation
+ function process(input) {
+   if (!input) return input
+   log.debug("process:start", { input })
+   const result = transform(input)
+   log.debug("process:end", { result })
+   return result
+ }
```

### Diff Principles

1. Only ADD lines, never remove existing
2. Don't modify existing lines
3. Don't change return types
4. Diff is "green" (additions) only

---

## 7. Enhancement Checklist

### 7.1 Pre-Enhancement

- [ ] Truly additive? (No existing code modified)
- [ ] Existing behavior identical?
- [ ] Enhancement optional? (Config-gated)
- [ ] Tests for new capabilities?
- [ ] All existing tests pass?
- [ ] typecheck and lint pass?
- [ ] Draft PR first?
- [ ] Title: `enhance(scope): ...` or `improve(scope): ...`

### 7.2 Quality Gate

- [ ] Follows existing patterns
- [ ] No hardcoded values
- [ ] No console.log (proper logging)
- [ ] Error messages actionable
- [ ] Platform differences handled

### 7.3 PR Body Template

```markdown
### Type of change

- [ ] New feature
- [ ] Bug fix
- [X] Enhancement / improvement
- [ ] Documentation

### What does this PR enhance?

This is a non-breaking enhancement. Existing behavior and architecture are fully preserved.

**Before:** <what was missing or could be improved>

**After:** <what the enhancement adds>

**Benefits:**
- ✅ Better error handling
- ✅ Improved observability
- ✅ Backward compatible
```

---

## 8. Reviewing Other People's Enhancements

```
✅ Good Signs:
  - Mostly green diff (additions)
  - No existing tests modified
  - New tests for enhancement
  - Follows existing patterns
  - Config-gated / optional

❌ Bad Signs:
  - Deletes/modifies existing code
  - Changes function signatures
  - Changes default behavior
  - No tests
```

---

## 9. Anti-Patterns

```
🚫 THE NUKE — Replace module with "cleaner" version
🚫 THE TANGLER — Fix + enhance in same branch
🚫 THE REMOVER — "This code is dead"
🚫 THE FORMATTER — Reformat entire file
🚫 THE DEPENDENCY-ADDER — Add library for one function
```

---

## 10. Final Words

> **"The best enhancement is the one that makes the codebase better today, without limiting what it can become tomorrow."**
>
> — LifeJiggy

> **"Make it stronger. Make it cleaner. Make it better. Never break what already works."**

---

## 11. Enhancement Categories Deep Dive

### 11.1 Safety Enhancements — Deep Dive

Safety enhancements protect against runtime failures, undefined behavior, and unexpected inputs. They are the highest priority category because they prevent production incidents.

**Null Safety:**

```typescript
// Enhancement: Add null safety with optional chaining and nullish coalescing
// BEFORE: crashes on null/undefined
const name = user.profile.displayName.toUpperCase()

// AFTER: safe fallback
const name = user?.profile?.displayName?.toUpperCase() ?? "Unknown"
```

| Before | After | Benefit |
|--------|-------|---------|
| `obj.prop` | `obj?.prop ?? default` | No TypeError |
| `arr[0]` | `arr?.[0] ?? fallback` | Safe index access |
| `fn(a)` | `fn?.(a)` | Safe optional call |

**Type Safety:**

```typescript
// BEFORE: loose type, runtime surprises
function merge(a, b) {
  return { ...a, ...b }
}

// AFTER: generic with constraint
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  a: T,
  b: U
): T & U {
  return { ...a, ...b }
}
```

**Input Validation:**

```typescript
import { z } from "zod"

// BEFORE: unchecked
function createUser(data: any) {
  return db.insert(data)
}

// AFTER: schema-validated
const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
  role: z.enum(["admin", "user", "viewer"]).default("user"),
})

function createUser(data: unknown) {
  const parsed = UserSchema.parse(data)
  return db.insert(parsed)
}
```

**Timeout Protection:**

```typescript
function withTimeout<T>(promise: Promise<T>, ms: number, msg?: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(msg ?? `Timed out after ${ms}ms`)), ms)
    ),
  ])
}

// Usage
const result = await withTimeout(fetch(url), 5000)
```

**Retry with Exponential Backoff:**

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number; maxDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 30000 } = options
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries) {
        const delay = Math.min(baseDelay * 2 ** attempt + Math.random() * 1000, maxDelay)
        await new Promise((r) => setTimeout(r, delay))
      }
    }
  }

  throw lastError!
}
```

**Rate Limiting:**

```typescript
class RateLimiter {
  private tokens: number
  private lastRefill: number

  constructor(private maxTokens: number, private refillRate: number) {
    this.tokens = maxTokens
    this.lastRefill = Date.now()
  }

  async acquire(): Promise<void> {
    this.refill()
    if (this.tokens <= 0) {
      const wait = 1000 / this.refillRate
      await new Promise((r) => setTimeout(r, wait))
      this.refill()
    }
    this.tokens--
  }

  private refill(): void {
    const now = Date.now()
    const elapsed = now - this.lastRefill
    this.tokens = Math.min(this.maxTokens, this.tokens + (elapsed / 1000) * this.refillRate)
    this.lastRefill = now
  }
}
```

**Circuit Breaker Pattern:**

```typescript
type CircuitState = "closed" | "open" | "half-open"

class CircuitBreaker {
  private state: CircuitState = "closed"
  private failureCount = 0
  private lastFailureTime = 0

  constructor(
    private threshold: number = 5,
    private resetTimeout: number = 30000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = "half-open"
      } else {
        throw new Error("Circuit breaker is open")
      }
    }

    try {
      const result = await fn()
      if (this.state === "half-open") {
        this.state = "closed"
        this.failureCount = 0
      }
      return result
    } catch (error) {
      this.failureCount++
      this.lastFailureTime = Date.now()
      if (this.failureCount >= this.threshold) {
        this.state = "open"
      }
      throw error
    }
  }
}
```

### 11.2 Observability Enhancements — Deep Dive

Observability enhancements make system behavior introspectable without changing its core logic.

**Structured Logging:**

```typescript
// BEFORE: uninformative console.log
console.log("User saved")

// AFTER: structured with context
logger.info("user_saved", {
  userId: user.id,
  email: user.email,
  duration: `${elapsed}ms`,
  source: "createUser",
})
```

| Level | When to Use | Example |
|-------|-------------|---------|
| `error` | Something is broken | `logger.error("db_connection_failed", { host, error })` |
| `warn` | Something unexpected but handled | `logger.warn("rate_limit_approaching", { usage: 85 })` |
| `info` | Normal operation milestones | `logger.info("server_started", { port, env })` |
| `debug` | Detailed internal flow | `logger.debug("cache_miss", { key })` |
| `trace` | Very fine-grained (dev only) | `logger.trace("enter:transform", { input })` |

**Metrics Collection:**

```typescript
class MetricsCollector {
  private counters = new Map<string, number>()
  private histograms = new Map<string, number[]>()
  private gauges = new Map<string, number>()

  increment(name: string, by = 1): void {
    this.counters.set(name, (this.counters.get(name) ?? 0) + by)
  }

  recordLatency(name: string, ms: number): void {
    const values = this.histograms.get(name) ?? []
    values.push(ms)
    this.histograms.set(name, values)
  }

  setGauge(name: string, value: number): void {
    this.gauges.set(name, value)
  }

  snapshot(): MetricsSnapshot {
    return {
      counters: Object.fromEntries(this.counters),
      histograms: Object.fromEntries(
        Array.from(this.histograms).map(([k, v]) => [
          k,
          { count: v.length, avg: v.reduce((a, b) => a + b, 0) / v.length, p99: this.percentile(v, 99) },
        ])
      ),
      gauges: Object.fromEntries(this.gauges),
    }
  }

  private percentile(sorted: number[], p: number): number {
    if (sorted.length === 0) return 0
    const sortedVals = [...sorted].sort((a, b) => a - b)
    const idx = Math.ceil((p / 100) * sortedVals.length) - 1
    return sortedVals[Math.max(0, idx)]
  }
}
```

**Distributed Tracing via Async Hooks:**

```typescript
import { AsyncLocalStorage } from "async_hooks"

const traceContext = new AsyncLocalStorage<{ traceId: string; spanId: string }>()

function withTrace<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const parent = traceContext.getStore()
  const traceId = parent?.traceId ?? crypto.randomUUID()
  const spanId = crypto.randomUUID()

  return traceContext.run({ traceId, spanId }, async () => {
    const start = performance.now()
    logger.debug(`span:start`, { name, traceId, spanId })
    try {
      const result = await fn()
      const duration = performance.now() - start
      logger.debug(`span:end`, { name, traceId, spanId, duration })
      return result
    } catch (error) {
      const duration = performance.now() - start
      logger.error(`span:error`, { name, traceId, spanId, duration, error })
      throw error
    }
  })
}
```

**Event Emission / Audit Trail:**

```typescript
type AuditEvent = {
  type: string
  actor: string
  target: string
  action: string
  metadata: Record<string, unknown>
  timestamp: Date
}

class AuditTrail {
  private events: AuditEvent[] = []

  record(event: Omit<AuditEvent, "timestamp">): void {
    const entry: AuditEvent = { ...event, timestamp: new Date() }
    this.events.push(entry)
    logger.info("audit", entry)
  }

  query(filters: Partial<AuditEvent>): AuditEvent[] {
    return this.events.filter((e) =>
      Object.entries(filters).every(([k, v]) => (e as any)[k] === v)
    )
  }
}
```

### 11.3 Performance Enhancements — Deep Dive

**Caching with TTL:**

```typescript
class TTLCache<K, V> {
  private store = new Map<K, { value: V; expires: number }>()
  private cleanupInterval: NodeJS.Timeout

  constructor(private defaultTTL: number = 60000) {
    this.cleanupInterval = setInterval(() => this.evict(), 30000)
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expires) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }

  set(key: K, value: V, ttl?: number): void {
    this.store.set(key, { value, expires: Date.now() + (ttl ?? this.defaultTTL) })
  }

  invalidate(key: K): void {
    this.store.delete(key)
  }

  private evict(): void {
    const now = Date.now()
    for (const [key, entry] of this.store) {
      if (now > entry.expires) this.store.delete(key)
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.store.clear()
  }
}
```

**Lazy Loading:**

```typescript
// BEFORE: eagerly loaded
class ConfigManager {
  private db = new DatabaseConnection() // created even if never used

  getConfig(key: string) { return this.db.query(key) }
}

// AFTER: lazy initialization
class ConfigManager {
  private _db: DatabaseConnection | null = null

  private get db(): DatabaseConnection {
    if (!this._db) {
      this._db = new DatabaseConnection()
    }
    return this._db
  }

  getConfig(key: string) { return this.db.query(key) }
}
```

**Memoization:**

```typescript
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)!
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Usage
const expensiveComputation = memoize((n: number) => {
  // heavy work
  return n * 2
})
```

**Debounce and Throttle:**

```typescript
// Debounce: fires after inactivity
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// Throttle: fires at most once per interval
function throttle<T extends (...args: any[]) => void>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= interval) {
      lastCall = now
      fn(...args)
    }
  }
}
```

**Concurrency Control:**

```typescript
class ConcurrencyLimiter {
  private running = 0
  private queue: (() => void)[] = []

  constructor(private maxConcurrent: number) {}

  async run<T>(fn: () => Promise<T>): Promise<T> {
    if (this.running >= this.maxConcurrent) {
      await new Promise<void>((resolve) => this.queue.push(resolve))
    }

    this.running++
    try {
      return await fn()
    } finally {
      this.running--
      this.queue.shift()?.()
    }
  }
}

// Usage: limit to 5 concurrent API calls
const limiter = new ConcurrencyLimiter(5)
const results = await Promise.all(
  urls.map((url) => limiter.run(() => fetch(url)))
)
```

### 11.4 DX Enhancements — Deep Dive

**Better Error Messages:**

```typescript
// BEFORE: cryptic
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
  }
}

// AFTER: structured with suggestions
class ActionableError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly suggestions: string[],
    public readonly docsUrl?: string
  ) {
    super(message)
    this.name = "ActionableError"
  }
}

function throwEnhanced(message: string, code: string, suggestions: string[]) {
  throw new ActionableError(message, code, suggestions)
}

// Usage produces:
// Error [ActionableError]: Invalid configuration key "db.host"
//   Code: INVALID_CONFIG_KEY
//   Suggestions:
//     - Did you mean "database.host"?
//     - Run --help for available options
//    - See docs at https://docs.example.com/config
```

**CLI Usage Examples:**

```typescript
// BEFORE: no examples
program
  .command("build")
  .option("--config <path>", "config file path")
  .action(buildAction)

// AFTER: with examples
program
  .command("build")
  .option("--config <path>", "config file path")
  .addHelpText(
    "after",
    `
Examples:
  $ mycli build --config ./config.yaml
  $ mycli build --config ./config.yaml --watch
  $ mycli build --config ./config.yaml --output ./dist --minify

Environment variables:
  MYCLI_CONFIG_DIR  Override default config directory
  MYCLI_DEBUG       Enable debug output (true/false)
    `
  )
  .action(buildAction)
```

**Config Validation with Friendly Errors:**

```typescript
import { z } from "zod"

const ConfigSchema = z.object({
  port: z.number().int().min(1024).max(65535)
    .describe("Server port (1024-65535)"),
  host: z.string().default("localhost")
    .describe("Bind address"),
  db: z.object({
    url: z.string().url("Must be a valid connection URL"),
    pool: z.number().int().min(1).max(100).default(10)
      .describe("Connection pool size (1-100)"),
  }),
})

function validateConfig(raw: unknown) {
  const result = ConfigSchema.safeParse(raw)
  if (!result.success) {
    const messages = result.error.issues.map((issue) => {
      const path = issue.path.join(".")
      return `  - "${path}": ${issue.message}${issue.received ? ` (received: ${JSON.stringify(issue.received)})` : ""}`
    })
    console.error("Configuration validation failed:\n" + messages.join("\n"))
    process.exit(1)
  }
  return result.data
}
```

**Debug Flags and Verbose Mode:**

```typescript
type LogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace"

const LOG_LEVELS: Record<LogLevel, number> = {
  silent: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5,
}

class Logger {
  private level: LogLevel

  constructor(level: LogLevel = "info") {
    this.level = level
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.level]
  }

  trace(msg: string, ctx?: Record<string, unknown>): void {
    if (this.shouldLog("trace")) console.debug(`[TRACE] ${msg}`, ctx ?? "")
  }

  debug(msg: string, ctx?: Record<string, unknown>): void {
    if (this.shouldLog("debug")) console.debug(`[DEBUG] ${msg}`, ctx ?? "")
  }

  info(msg: string, ctx?: Record<string, unknown>): void {
    if (this.shouldLog("info")) console.log(`[INFO] ${msg}`, ctx ?? "")
  }

  warn(msg: string, ctx?: Record<string, unknown>): void {
    if (this.shouldLog("warn")) console.warn(`[WARN] ${msg}`, ctx ?? "")
  }

  error(msg: string, ctx?: Record<string, unknown>): void {
    if (this.shouldLog("error")) console.error(`[ERROR] ${msg}`, ctx ?? "")
  }

  setLevel(level: LogLevel): void {
    this.level = level
  }
}
```

**Progress Indicators:**

```typescript
class ProgressBar {
  private startTime: number
  private lastRender = 0

  constructor(private total: number, private label = "Progress") {
    this.startTime = Date.now()
  }

  update(current: number): void {
    const now = Date.now()
    if (now - this.lastRender < 100) return // throttle to 10fps
    this.lastRender = now

    const percent = Math.round((current / this.total) * 100)
    const elapsed = ((now - this.startTime) / 1000).toFixed(1)
    const rate = current / ((now - this.startTime) / 1000)
    const eta = rate > 0 ? ((this.total - current) / rate).toFixed(0) : "?"

    const filled = Math.round((percent / 100) * 30)
    const bar = "█".repeat(filled) + "░".repeat(30 - filled)

    process.stdout.write(
      `\r${this.label} [${bar}] ${percent}% | ${current}/${this.total} | ${elapsed}s | ETA ${eta}s`
    )
  }

  done(): void {
    this.update(this.total)
    process.stdout.write("\n")
  }
}
```

### 11.5 Testing Enhancements — Deep Dive

**Test Infrastructure Additions:**

```typescript
// test-utils/setup.ts — shared test harness
import { beforeAll, afterAll, beforeEach, afterEach } from "vitest"

export function createTestHarness() {
  const state: Record<string, any> = {}

  beforeAll(async () => {
    state.db = await createTestDatabase()
    state.s3 = await createTestS3Bucket()
  })

  afterAll(async () => {
    await state.db?.destroy()
    await state.s3?.cleanup()
  })

  beforeEach(() => {
    state.cache = new Map()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  return state
}
```

**Fixture Factories:**

```typescript
// test-utils/factories.ts
import { faker } from "@faker-js/faker"

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: "user",
    createdAt: faker.date.past(),
    ...overrides,
  }
}

export function buildConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    port: 3000,
    host: "localhost",
    db: { url: "postgres://localhost:5432/test", pool: 5 },
    logging: { level: "silent" },
    ...overrides,
  }
}
```

**Mock Providers:**

```typescript
// test-utils/mocks.ts
export class MockDatabaseProvider {
  private data = new Map<string, any[]>()

  constructor() {
    this.data.set("users", [])
    this.data.set("sessions", [])
  }

  async insert(table: string, record: any): Promise<void> {
    const records = this.data.get(table) ?? []
    records.push({ ...record, id: records.length + 1 })
    this.data.set(table, records)
  }

  async findById(table: string, id: number): Promise<any | undefined> {
    return this.data.get(table)?.find((r) => r.id === id)
  }

  async findAll(table: string): Promise<any[]> {
    return [...(this.data.get(table) ?? [])]
  }

  async reset(): Promise<void> {
    this.data.clear()
  }
}
```

### 11.6 Documentation Enhancements — Deep Dive

**JSDoc Generation:**

```typescript
/**
 * Merges two configuration objects with nested deep merging.
 *
 * @param base - The base configuration object. Values here act as defaults.
 * @param override - The override configuration object. Values here take precedence.
 * @param options - Merge behavior options.
 * @param options.arrayMode - How to handle arrays: "replace" (default) or "concat".
 * @returns A new deeply merged configuration object. Neither input is mutated.
 *
 * @example
 * ```typescript
 * mergeConfig({ port: 3000, db: { host: "localhost" } }, { db: { host: "prod" } })
 * // => { port: 3000, db: { host: "prod" } }
 * ```
 *
 * @throws {TypeError} If base or override is not a plain object.
 */
export function mergeConfig<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>,
  options?: { arrayMode?: "replace" | "concat" }
): T
```

**README Snippets from Source:**

```typescript
// scripts/extract-readme-snippets.ts
import { readFileSync, writeFileSync } from "fs"
import { glob } from "glob"

interface ExampleBlock {
  name: string
  code: string
  description: string
}

function extractExamples(pattern: string): ExampleBlock[] {
  const files = glob.sync(pattern)
  const examples: ExampleBlock[] = []

  for (const file of files) {
    const content = readFileSync(file, "utf-8")
    const regex = /\/\*\*\s*\n\s*\*\s*@example\s+(.*?)\n([\s\S]*?)\*\//gm
    let match

    while ((match = regex.exec(content)) !== null) {
      examples.push({
        name: match[1].trim(),
        code: match[2].replace(/^\s*\*\s?/gm, "").trim(),
        description: match[1].trim(),
      })
    }
  }

  return examples
}

// Generate README.md examples section from source
const examples = extractExamples("src/**/*.ts")
const readme = readFileSync("README.md", "utf-8")
const examplesSection = examples
  .map((e) => `### ${e.name}\n\n${e.description}\n\n\`\`\`typescript\n${e.code}\n\`\`\`\n`)
  .join("\n")

writeFileSync(
  "README.md",
  readme.replace(
    /<!-- EXAMPLES START -->[\s\S]*<!-- EXAMPLES END -->/,
    `<!-- EXAMPLES START -->\n${examplesSection}\n<!-- EXAMPLES END -->`
  )
)
```

---

## 12. Enhancement Detection Scripts

### 12.1 PowerShell Detection Scripts

These scripts detect common code quality gaps across a TypeScript/JavaScript codebase.

**Find Functions Missing Error Handling:**

```powershell
# find-missing-error-handling.ps1
# Detects async functions without try/catch or .catch()

$files = Get-ChildItem -Recurse -Filter "*.ts" | Where-Object { $_.FullName -notmatch "node_modules|dist|\.test\." }

Write-Host "=== Functions missing error handling ===" -ForegroundColor Cyan

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw

  # Find async functions
  $asyncPattern = [regex]::new('(?:async\s+)?function\s+(\w+)|(\w+)\s*=\s*async\s*\(|const\s+(\w+)\s*=\s*async\s*\(')

  $matches = $asyncPattern.Matches($content)
  $hasCatch = $content -match '\.catch\s*\('
  $hasTry = $content -match 'try\s*\{'

  if ($matches.Count -gt 0 -and !$hasCatch -and !$hasTry) {
    Write-Host "  $($file.FullName)" -ForegroundColor Yellow
    foreach ($match in $matches) {
      Write-Host "    -> async function: $($match.Groups[1].Value)$($match.Groups[2].Value)$($match.Groups[3].Value)" -ForegroundColor Red
    }
  }
}
```

**Find Missing Input Validation:**

```powershell
# find-missing-validation.ps1
# Detects exported functions without input validation (zod, yup, io-ts, custom guards)

$files = Get-ChildItem -Recurse -Filter "*.ts" | Where-Object { $_.FullName -notmatch "node_modules|dist|\.test\." }

Write-Host "=== Functions missing input validation ===" -ForegroundColor Cyan

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $hasParseOrSafeParse = $content -match '\.(parse|safeParse)\('

  if (!$hasParseOrSafeParse -and ($content -match 'export (async )?function|export const')) {
    $lines = $content -split "`n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match '^export\s+(async\s+)?function\s+(\w+)|^export\s+const\s+(\w+)') {
        Write-Host "  $($file.FullName):$($i+1) -> $($lines[$i].Trim())" -ForegroundColor Yellow
      }
    }
  }
}
```

**Find Missing Logging Statements:**

```powershell
# find-missing-logging.ps1
# Detects catch blocks without logging

$files = Get-ChildItem -Recurse -Filter "*.ts" | Where-Object { $_.FullName -notmatch "node_modules|dist|\.test\." }

Write-Host "=== Catch blocks missing logging ===" -ForegroundColor Cyan

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $catchBlocks = [regex]::Matches($content, 'catch\s*\([^)]+\)\s*\{([^}]*)\}')

  foreach ($block in $catchBlocks) {
    $blockContent = $block.Groups[1].Value
    $hasLogging = $blockContent -match 'logger\.|console\.(error|warn|log)|log\.'

    if (!$hasLogging -and $blockContent.Trim().Length -gt 0) {
      $lineNumber = $content.Substring(0, $block.Index).Split("`n").Length
      Write-Host "  $($file.FullName):$lineNumber - catch block without logging" -ForegroundColor Red
      Write-Host "    Content: $($blockContent.Trim().Substring(0, [Math]::Min(100, $blockContent.Trim().Length)))" -ForegroundColor Gray
    }
  }
}
```

**Find Hardcoded Values:**

```powershell
# find-hardcoded-values.ps1
# Detects numeric literals and string constants that should be configurable

$files = Get-ChildItem -Recurse -Filter "*.ts" | Where-Object { $_.FullName -notmatch "node_modules|dist|\.test\.|\.config\." }

Write-Host "=== Potential hardcoded values (timeouts, limits, ports) ===" -ForegroundColor Cyan

$patterns = @(
  @{ Pattern = '\b(30|60|120|300|1000|5000|30000|60000)\b'; Description = "Magic number (timeout/interval)" }
  @{ Pattern = '\bport\s*=\s*\d{2,5}\b'; Description = "Hardcoded port" }
  @{ Pattern = '\bmaxRetries\s*=\s*\d+\b'; Description = "Hardcoded retry count" }
  @{ Pattern = '\bconcurrency\s*=\s*\d+\b'; Description = "Hardcoded concurrency limit" }
)

foreach ($file in $files) {
  $lines = Get-Content $file.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    foreach ($p in $patterns) {
      if ($lines[$i] -match $p.Pattern) {
        Write-Host "  $($file.FullName):$($i+1) - $($p.Description)" -ForegroundColor Yellow
        Write-Host "    $($lines[$i].Trim())" -ForegroundColor Gray
      }
    }
  }
}
```

### 12.2 CI Integration Patterns

```yaml
# .github/workflows/enhancement-detection.yml
name: Enhancement Detection

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  detect-enhancements:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Check for console.log
        run: |
          if grep -r "console\.\(log\|warn\|error\)" src/ --include="*.ts" | grep -v "\.test\."; then
            echo "::warning::Found console.log statements. Consider using structured logger."
          fi

      - name: Check for missing error handling
        run: |
          if grep -r "\.then(" src/ --include="*.ts" | grep -v "\.catch\|\.test\."; then
            echo "::warning::Found .then() calls without .catch(). Consider adding error handling."
          fi

      - name: Check for TODO/FIXME
        run: |
          TODOS=$(grep -rn "TODO\|FIXME\|HACK" src/ --include="*.ts" | grep -v "node_modules" || true)
          if [ -n "$TODOS" ]; then
            echo "::warning::Found TODO/FIXME/HACK markers:"
            echo "$TODOS"
          fi

      - name: Check for hardcoded values
        run: |
          thresholds=$(grep -rn "maxRetries\s*=\|timeout\s*=\|concurrency\s*=" src/ --include="*.ts" | grep -v "\.test\." || true)
          if [ -n "$thresholds" ]; then
            echo "::notice::Hardcoded threshold values found (consider making configurable):"
            echo "$thresholds"
          fi
```

### 12.3 Automated Quality Gate

```powershell
# quality-gate.ps1 — run before every enhancement PR

$errors = 0
$warnings = 0
$srcDir = "src"

Write-Host "Running Enhancement Quality Gate..." -ForegroundColor Cyan
Write-Host ""

# Gate 1: Check that no existing test files were modified
$modifiedTests = git diff --name-only --cached | Where-Object { $_ -match "\.test\.ts$" }
if ($modifiedTests) {
  Write-Host "[FAIL] Existing test files were modified:" -ForegroundColor Red
  $modifiedTests | ForEach-Object { Write-Host "  $_" }
  $errors++
}

# Gate 2: Check for console.log
$consoleLogs = Get-ChildItem -Path $srcDir -Recurse -Filter "*.ts" | Where-Object {
  $_.FullName -notmatch "\.test\.|node_modules"
} | ForEach-Object {
  Select-String -Path $_.FullName -Pattern "console\.(log|warn|error)"
}
if ($consoleLogs) {
  Write-Host "[WARN] console.log/error/warn found:" -ForegroundColor Yellow
  $consoleLogs | ForEach-Object { Write-Host "  $($_.Path):$($_.LineNumber)" }
  $warnings++
}

# Gate 3: Check for type errors
$typeResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "[FAIL] TypeScript type errors found" -ForegroundColor Red
  $errors++
}

# Gate 4: Check for lint errors
$lintResult = npx eslint "$srcDir/**/*.ts" 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "[FAIL] ESLint errors found" -ForegroundColor Red
  $errors++
}

Write-Host ""
if ($errors -eq 0 -and $warnings -eq 0) {
  Write-Host "Quality Gate: PASSED" -ForegroundColor Green
}
elseif ($errors -eq 0) {
  Write-Host "Quality Gate: PASSED with warnings" -ForegroundColor Yellow
}
else {
  Write-Host "Quality Gate: FAILED ($errors errors)" -ForegroundColor Red
  exit 1
}
```

---

## 13. Advanced Wrapper Patterns

### 13.1 withRetry Wrapper

```typescript
interface RetryOptions {
  maxAttempts?: number
  baseDelay?: number
  maxDelay?: number
  retryOn?: (error: Error) => boolean
  onRetry?: (error: Error, attempt: number) => void
}

function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: RetryOptions = {}
): T {
  const { maxAttempts = 3, baseDelay = 1000, maxDelay = 30000, retryOn, onRetry } = options

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    return attempt(fn, args, maxAttempts, baseDelay, maxDelay, retryOn, onRetry)
  }) as T
}

async function attempt<T>(
  fn: (...args: any[]) => Promise<T>,
  args: any[],
  remaining: number,
  baseDelay: number,
  maxDelay: number,
  retryOn?: (error: Error) => boolean,
  onRetry?: (error: Error, attempt: number) => void
): Promise<T> {
  try {
    return await fn(...args)
  } catch (error) {
    if (remaining <= 1) throw error
    if (retryOn && !retryOn(error as Error)) throw error

    const delay = Math.min(baseDelay * 2 ** (3 - remaining) + Math.random() * 1000, maxDelay)
    onRetry?.(error as Error, 3 - remaining + 1)

    await new Promise((r) => setTimeout(r, delay))
    return attempt(fn, args, remaining - 1, baseDelay, maxDelay, retryOn, onRetry)
  }
}

// Usage
const fetchWithRetry = withRetry(fetch, {
  maxAttempts: 5,
  baseDelay: 500,
  retryOn: (err) => err.message.includes("429") || err.message.includes("503"),
  onRetry: (err, attempt) => logger.warn(`Retry ${attempt} after ${err.message}`),
})
```

### 13.2 withTimeout Wrapper

```typescript
interface TimeoutOptions {
  ms: number
  message?: string
  signal?: AbortSignal
}

function withTimeout<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: TimeoutOptions
): T {
  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    const { ms, message, signal } = options

    return new Promise<ReturnType<T>>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(message ?? `Operation timed out after ${ms}ms`))
      }, ms)

      const abortHandler = () => {
        clearTimeout(timer)
        reject(new Error("Operation aborted"))
      }

      signal?.addEventListener("abort", abortHandler, { once: true })

      fn(...args)
        .then((result) => {
          clearTimeout(timer)
          signal?.removeEventListener("abort", abortHandler)
          resolve(result)
        })
        .catch((error) => {
          clearTimeout(timer)
          signal?.removeEventListener("abort", abortHandler)
          reject(error)
        })
    })
  }) as T
}

// Usage
const queryWithTimeout = withTimeout(db.query, { ms: 5000 })
const result = await queryWithTimeout("SELECT * FROM users")
```

### 13.3 withLogging Wrapper (AOP-Style)

```typescript
interface LoggingOptions {
  level?: "debug" | "info" | "trace"
  logInput?: boolean
  logOutput?: boolean
  logDuration?: boolean
  label?: string
}

function withLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name: string,
  options: LoggingOptions = {}
): T {
  const {
    level = "debug",
    logInput = true,
    logOutput = true,
    logDuration = true,
    label = name,
  } = options

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    const start = performance.now()

    if (logInput) {
      logger[level](`${label}:enter`, { args: sanitizeArgs(args) })
    }

    return fn(...args)
      .then((result) => {
        if (logDuration) {
          logger[level](`${label}:complete`, { duration: performance.now() - start })
        }
        if (logOutput) {
          logger[level](`${label}:result`, { result: sanitizeResult(result) })
        }
        return result
      })
      .catch((error) => {
        logger.error(`${label}:error`, {
          duration: performance.now() - start,
          error: error.message,
          stack: error.stack,
        })
        throw error
      })
  }) as T
}

function sanitizeArgs(args: any[]): any[] {
  return args.map((arg) => {
    if (arg instanceof Request) return `[Request: ${arg.url}]`
    if (Buffer.isBuffer(arg)) return `[Buffer: ${arg.length} bytes]`
    if (typeof arg === "object") return JSON.parse(JSON.stringify(arg))
    return arg
  })
}

function sanitizeResult(result: any): any {
  if (result instanceof Response) return `[Response: ${result.status}]`
  return result
}
```

### 13.4 withCache Wrapper

```typescript
interface CacheOptions {
  ttl?: number
  maxSize?: number
  keyFn?: (...args: any[]) => string
}

function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: CacheOptions = {}
): T {
  const { ttl = 60000, maxSize = 100, keyFn = (...args) => JSON.stringify(args) } = options
  const cache = new Map<string, { value: any; expires: number }>()
  const hitCounts = new Map<string, number>()

  // Periodic cache cleanup
  const cleanup = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of cache) {
      if (now > entry.expires) {
        cache.delete(key)
        hitCounts.delete(key)
      }
    }
  }, 30000)

  const wrapped = async (...args: any[]): Promise<any> => {
    const key = keyFn(...args)

    const cached = cache.get(key)
    if (cached && Date.now() < cached.expires) {
      hitCounts.set(key, (hitCounts.get(key) ?? 0) + 1)
      return cached.value
    }

    const result = await fn(...args)
    cache.set(key, { value: result, expires: Date.now() + ttl })

    // Evict oldest entries if over maxSize
    if (cache.size > maxSize) {
      const entries = Array.from(cache.entries())
        .sort(([, a], [, b]) => a.expires - b.expires)
        .slice(0, cache.size - maxSize)
      for (const [key] of entries) {
        cache.delete(key)
        hitCounts.delete(key)
      }
    }

    return result
  }

  wrapped.cacheStats = () => ({
    size: cache.size,
    hits: Array.from(hitCounts.entries()).reduce((sum, [, count]) => sum + count, 0),
    hitRate: cache.size > 0
      ? Array.from(hitCounts.values()).reduce((a, b) => a + b, 0) /
        (Array.from(hitCounts.values()).reduce((a, b) => a + b, 0) + cache.size)
      : 0,
  })

  wrapped.invalidate = (cacheKey: string) => {
    const fullKey = keyFn(cacheKey)
    cache.delete(fullKey)
    hitCounts.delete(fullKey)
  }

  wrapped.clear = () => {
    cache.clear()
    hitCounts.clear()
  }

  return wrapped as unknown as T
}
```

### 13.5 withValidation Wrapper

```typescript
import { z } from "zod"

type Schema = z.ZodSchema<any>

interface ValidationOptions {
  inputSchema?: Schema
  outputSchema?: Schema
  stripUnknown?: boolean
}

function withValidation<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ValidationOptions
): T {
  const { inputSchema, outputSchema, stripUnknown = true } = options

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    let validatedArgs = args

    if (inputSchema) {
      if (args.length === 1) {
        validatedArgs = [inputSchema.parse(args[0])] as Parameters<T>
      } else {
        validatedArgs = args.map((arg) => inputSchema.parse(arg)) as Parameters<T>
      }
    }

    const result = fn(...validatedArgs)

    if (outputSchema && result instanceof Promise) {
      return result.then((value) => outputSchema.parse(value)) as Promise<ReturnType<T>>
    }

    return result as Promise<ReturnType<T>>
  }) as T
}

// Usage
const createUserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
})

const safeCreateUser = withValidation(createUser, {
  inputSchema: createUserSchema,
  outputSchema: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    createdAt: z.string().datetime(),
  }),
})
```

### 13.6 withFallback Wrapper

```typescript
interface FallbackOptions<T> {
  fallbackValue?: T
  fallbackFn?: (error: Error) => T | Promise<T>
  fallbackTo?: () => Promise<T>
  onFallback?: (error: Error) => void
}

function withFallback<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: FallbackOptions<ReturnType<T>>
): T {
  const { fallbackValue, fallbackFn, fallbackTo, onFallback } = options

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    return fn(...args).catch(async (error: Error) => {
      onFallback?.(error)

      if (fallbackTo) {
        return fallbackTo()
      }
      if (fallbackFn) {
        return fallbackFn(error)
      }
      if (fallbackValue !== undefined) {
        return fallbackValue
      }

      throw error
    })
  }) as T
}

// Usage
const fetchUserData = withFallback(api.getUser, {
  fallbackValue: { id: "unknown", name: "Offline User" },
  onFallback: (err) => logger.warn("Using fallback for getUser", { error: err.message }),
})

const fetchWithSecondary = withFallback(primaryApi.getData, {
  fallbackTo: () => secondaryApi.getData(),
  onFallback: (err) => logger.warn("Falling back to secondary API", { error: err.message }),
})
```

### 13.7 withCircuitBreaker Wrapper

```typescript
interface CircuitBreakerOptions {
  threshold?: number
  resetTimeout?: number
  halfOpenMaxRequests?: number
}

function withCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name: string,
  options: CircuitBreakerOptions = {}
): T {
  const { threshold = 5, resetTimeout = 30000, halfOpenMaxRequests = 3 } = options

  let state: "closed" | "open" | "half-open" = "closed"
  let failureCount = 0
  let lastFailureTime = 0
  let halfOpenRequests = 0
  let successCount = 0

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      if (state === "open") {
        if (Date.now() - lastFailureTime >= resetTimeout) {
          state = "half-open"
          halfOpenRequests = 0
          successCount = 0
          logger.info(`circuit:${name}:half-open`, { timeSinceFailure: Date.now() - lastFailureTime })
        } else {
          logger.warn(`circuit:${name}:open`, { failureCount })
          reject(new Error(`Circuit breaker for "${name}" is open`))
          return
        }
      }

      if (state === "half-open") {
        if (halfOpenRequests >= halfOpenMaxRequests) {
          reject(new Error(`Circuit breaker for "${name}" is half-open and at capacity`))
          return
        }
        halfOpenRequests++
      }

      fn(...args)
        .then((result) => {
          if (state === "half-open") {
            successCount++
            if (successCount >= halfOpenMaxRequests) {
              state = "closed"
              failureCount = 0
              logger.info(`circuit:${name}:closed`, { message: "Circuit reset to closed after success" })
            }
          }
          resolve(result as ReturnType<T>)
        })
        .catch((error: Error) => {
          failureCount++
          lastFailureTime = Date.now()

          if (state === "half-open" || failureCount >= threshold) {
            state = "open"
            logger.error(`circuit:${name}:open`, { failureCount, threshold, error: error.message })
          }

          reject(error)
        })
    })
  }) as T
}
```

### 13.8 Composing Multiple Wrappers

```typescript
// Compose multiple wrappers — they are applied inner-to-outer
function composeWrappers<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wrappers: Array<{
    wrapper: (fn: T, options: any) => T
    options: any
  }>
): T {
  return wrappers.reduceRight(
    (current, { wrapper, options }) => wrapper(current as T, options),
    fn
  ) as T
}

// Usage: composed enhancement pipeline
const enhancedFetch = composeWrappers(fetch as any, [
  { wrapper: withRetry, options: { maxAttempts: 3, baseDelay: 500 } },
  { wrapper: withTimeout, options: { ms: 10000 } },
  { wrapper: withCircuitBreaker, options: { threshold: 5, resetTimeout: 30000 } },
  { wrapper: withLogging, options: { level: "debug", label: "api.fetch" } },
  { wrapper: withCache, options: { ttl: 30000 } },
])

// The execution order (inner to outer):
// 1. withCache — check cache first
// 2. withLogging — log entry/exit
// 3. withCircuitBreaker — protect against cascade failures
// 4. withTimeout — enforce deadline
// 5. withRetry — retry on transient failures
// 6. original fetch — actual network call
```

---

## 14. Cross-Project Enhancement Patterns

### 14.1 OpenCode Enhancements

**Effect-TS Pipe Enhancement:**

```typescript
// BEFORE: imperative error handling block
try {
  const result = await someEffect()
  await processResult(result)
  await cleanup()
} catch (error) {
  logger.error("Failed processing", { error })
  await rollback()
  throw error
}

// AFTER: Effect-TS pipe with sequential operations
import { pipe, Effect } from "effect"

pipe(
  Effect.tryPromise(() => someEffect()),
  Effect.tap((result) => Effect.log(`Got result: ${result}`)),
  Effect.flatMap((result) => Effect.tryPromise(() => processResult(result))),
  Effect.tap(() => Effect.log("Processing complete")),
  Effect.catchAll((error) =>
    pipe(
      Effect.logError("Processing failed", { error }),
      Effect.flatMap(() => Effect.tryPromise(() => rollback())),
      Effect.flatMap(() => Effect.fail(error))
    )
  )
)
```

**Skill System Enhancement:**

```typescript
// BEFORE: simple skill load
const skill = await loadSkill(name)
await skill.execute(input)

// AFTER: enhanced skill system with validation, caching, and fallback
class EnhancedSkillSystem {
  private skillCache = new TTLCache<string, Skill>(300000) // 5 min TTL

  async execute(name: string, input: unknown): Promise<SkillResult> {
    const skill = await this.getSkill(name)
    const validated = skill.inputSchema?.parse(input) ?? input

    return withRetry(
      () => withTimeout(
        () => skill.execute(validated),
        { ms: skill.timeout ?? 30000 }
      ),
      { maxAttempts: 2, retryOn: (e) => e.message.includes("transient") }
    )()
  }

  private async getSkill(name: string): Promise<Skill> {
    const cached = this.skillCache.get(name)
    if (cached) return cached

    const skill = await loadSkill(name)
    this.skillCache.set(name, skill)
    return skill
  }
}
```

### 14.2 Hermes Enhancements

**Agent Tool Wrapping:**

```typescript
// BEFORE: direct tool call
const result = await tool.execute(input)

// AFTER: wrapped with observability and safety
class ToolExecutionPipeline {
  private metrics = new MetricsCollector()
  private breaker = new CircuitBreaker(5, 30000)

  async execute(agentId: string, tool: Tool, input: unknown): Promise<ToolResult> {
    const span = `${agentId}:${tool.name}`

    return this.breaker.call(async () => {
      const start = performance.now()
      this.metrics.increment(`${tool.name}:calls`)

      logger.info(`tool:execute`, { agentId, tool: tool.name, input })

      try {
        const result = await withTimeout(tool.execute(input), { ms: tool.timeout ?? 15000 })

        const duration = performance.now() - start
        this.metrics.recordLatency(`${tool.name}:latency`, duration)
        logger.info(`tool:complete`, { agentId, tool: tool.name, duration })

        return result
      } catch (error) {
        this.metrics.increment(`${tool.name}:errors`)
        logger.error(`tool:error`, { agentId, tool: tool.name, error })
        throw error
      }
    })
  }

  getStats() {
    return this.metrics.snapshot()
  }
}
```

**Provider Fallback Enhancement:**

```typescript
// BEFORE: single provider
const response = await openai.chat.completions.create({ messages })

// AFTER: multi-provider with fallback
class ProviderRouter {
  private providers: LLMProvider[]
  private currentIndex = 0

  constructor(config: ProviderConfig[]) {
    this.providers = config.map((c) => this.createProvider(c))
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const maxAttempts = this.providers.length

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const provider = this.providers[(this.currentIndex + attempt) % maxAttempts]
      try {
        const result = await withTimeout(
          provider.complete(request),
          { ms: provider.timeout ?? 30000 }
        )
        this.currentIndex = (this.currentIndex + attempt) % maxAttempts
        return result
      } catch (error) {
        logger.warn(`provider:fallback`, {
          from: provider.name,
          error,
          nextAttempt: attempt + 1 < maxAttempts,
        })
      }
    }

    throw new Error("All providers failed")
  }

  private createProvider(config: ProviderConfig): LLMProvider {
    switch (config.type) {
      case "openai": return new OpenAIProvider(config)
      case "anthropic": return new AnthropicProvider(config)
      case "google": return new GoogleProvider(config)
      case "ollama": return new OllamaProvider(config)
      default: throw new Error(`Unknown provider: ${config.type}`)
    }
  }
}
```

### 14.3 Kilo Code Enhancements

**Generation Validation Enhancement:**

```typescript
// BEFORE: generate and return
function generateCode(prompt: string): string {
  return llm.generate(prompt)
}

// AFTER: generate with validation and repair
async function generateCodeWithValidation(prompt: string): Promise<string> {
  let attempts = 0

  while (attempts < 3) {
    const code = await llm.generate(prompt)

    const issues = await validateCode(code)
    if (issues.length === 0) return code

    logger.warn("generation:validation-failed", {
      attempt: attempts + 1,
      issues: issues.map((i) => i.message),
    })

    prompt = `${prompt}\n\nPrevious attempt had issues:\n${issues.map((i) => `- ${i.message}`).join("\n")}\nPlease fix.`
    attempts++
  }

  throw new Error("Generation failed after 3 validation attempts")
}

async function validateCode(code: string): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = []

  // Syntax check
  try {
    ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true)
  } catch (error) {
    issues.push({ severity: "error", message: `Syntax error: ${(error as Error).message}` })
  }

  // Lint check
  if (code.includes("any") && !code.includes("// eslint-disable")) {
    issues.push({ severity: "warning", message: "Avoid using `any` type" })
  }

  // Security check
  if (code.includes("eval(") || code.includes("Function(")) {
    issues.push({ severity: "error", message: "Avoid using eval or Function constructor" })
  }

  return issues
}
```

**Template Enhancement:**

```typescript
// BEFORE: simple string template
const template = `You are a helpful assistant. ${prompt}`

// AFTER: structured template system
class PromptTemplate {
  private variables: Map<string, TemplateVariable> = new Map()
  private validators: TemplateValidator[] = []

  constructor(private template: string) {}

  variable(name: string, validator?: (value: string) => boolean): this {
    this.variables.set(name, { name, validator, required: true })
    return this
  }

  optional(name: string, defaultValue: string): this {
    this.variables.set(name, { name, required: false, defaultValue })
    return this
  }

  validator(validator: TemplateValidator): this {
    this.validators.push(validator)
    return this
  }

  render(context: Record<string, string>): string {
    let result = this.template

    for (const [name, variable] of this.variables) {
      const value = context[name] ?? variable.defaultValue

      if (!value && variable.required) {
        throw new Error(`Missing required template variable: ${name}`)
      }

      if (variable.validator && !variable.validator(value!)) {
        throw new Error(`Validation failed for variable: ${name}`)
      }

      result = result.replace(`{{${name}}}`, value!)
    }

    for (const validator of this.validators) {
      validator(result)
    }

    return result
  }
}

// Usage
const codeGenTemplate = new PromptTemplate(`
You are generating code for task: {{task}}.
Language: {{language}}
Style: {{style}}
{{#context}}Context: {{context}}{{/context}}
`)
  .variable("task")
  .variable("language", (v) => ["ts", "js", "py", "go"].includes(v))
  .optional("style", "clean")
  .optional("context", "")
```

### 14.4 OpenClaude Enhancements

**Provider-Agnostic Layer Enhancement:**

```typescript
// BEFORE: provider-specific code scattered
const openaiClient = new OpenAI({ apiKey })
const anthropicClient = new Anthropic({ apiKey })

// AFTER: unified provider interface
interface LLMProvider {
  name: string
  complete(request: CompletionRequest): Promise<CompletionResponse>
  stream?(request: CompletionRequest): AsyncIterable<StreamChunk>
  embed?(texts: string[]): Promise<number[][]>
  estimateCost?(tokens: TokenCount): number
}

class ProviderRegistry {
  private providers = new Map<string, LLMProvider>()

  register(name: string, provider: LLMProvider): void {
    this.providers.set(name, provider)
    logger.info("provider:registered", { name })
  }

  get(name: string): LLMProvider {
    const provider = this.providers.get(name)
    if (!provider) throw new Error(`Unknown provider: ${name}`)
    return provider
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const provider = this.get(request.provider)

    // Pre-flight validation
    if (request.maxTokens && request.maxTokens > provider.maxTokens) {
      throw new Error(`Provider ${request.provider} max tokens is ${provider.maxTokens}`)
    }

    // Estimate cost
    const estimatedTokens = estimateTokenCount(request.messages)
    const cost = provider.estimateCost?.(estimatedTokens) ?? 0

    logger.info("provider:complete", {
      provider: provider.name,
      model: request.model,
      estimatedTokens,
      estimatedCost: cost,
    })

    const start = performance.now()
    const result = await provider.complete(request)
    const duration = performance.now() - start

    logger.info("provider:complete:done", {
      provider: provider.name,
      duration,
      tokensUsed: result.usage?.totalTokens,
    })

    return result
  }
}
```

**Model Config Enhancement:**

```typescript
// BEFORE: hardcoded model config
const MODEL_CONFIG = {
  "gpt-4": { maxTokens: 8192, temperature: 0.7 },
  "claude-3-opus": { maxTokens: 4096, temperature: 0.5 },
}

// AFTER: schema-validated, layered configuration
import { z } from "zod"

const ModelConfigSchema = z.object({
  provider: z.string(),
  model: z.string(),
  maxTokens: z.number().int().positive().optional(),
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  stop: z.array(z.string()).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  timeout: z.number().int().positive().optional(),
  retryConfig: z.object({
    maxAttempts: z.number().int().positive().default(3),
    baseDelay: z.number().int().positive().default(1000),
  }).optional(),
})

class ModelConfigManager {
  private configs = new Map<string, z.infer<typeof ModelConfigSchema>>()
  private defaults: Partial<z.infer<typeof ModelConfigSchema>>

  constructor(defaults?: Partial<z.infer<typeof ModelConfigSchema>>) {
    this.defaults = defaults ?? {}
  }

  register(name: string, raw: unknown): void {
    const config = ModelConfigSchema.parse({ ...this.defaults, ...raw as any })
    this.configs.set(name, config)
    logger.debug("model:registered", { name, config })
  }

  get(name: string): z.infer<typeof ModelConfigSchema> {
    const config = this.configs.get(name)
    if (!config) throw new ActionableError(
      `Unknown model config: "${name}"`,
      "UNKNOWN_MODEL_CONFIG",
      [
        `Available models: ${Array.from(this.configs.keys()).join(", ")}`,
        "To add: modelConfigManager.register('my-model', { provider: 'openai', model: 'gpt-4' })",
      ]
    )
    return config
  }

  override(name: string, overrides: Partial<z.infer<typeof ModelConfigSchema>>): void {
    const existing = this.get(name)
    this.configs.set(name, { ...existing, ...overrides })
  }
}
```

### 14.5 Gemini CLI Enhancements

**Sandbox Wrapper Enhancement:**

```typescript
// BEFORE: basic sandbox
const result = await sandbox.execute(code)

// AFTER: enhanced sandbox with resource limits, timeout, and monitoring
class EnhancedSandbox {
  private activeProcesses = new Map<string, ProcessInfo>()
  private maxConcurrent: number
  private metrics = new MetricsCollector()

  constructor(config: SandboxConfig) {
    this.maxConcurrent = config.maxConcurrent ?? 10
  }

  async execute(code: string, options: ExecutionOptions = {}): Promise<ExecutionResult> {
    if (this.activeProcesses.size >= this.maxConcurrent) {
      throw new Error("Sandbox at capacity")
    }

    const id = crypto.randomUUID()
    const start = performance.now()

    this.metrics.increment("sandbox:executions")
    logger.debug("sandbox:execute", { id, language: options.language })

    this.activeProcesses.set(id, {
      id,
      startTime: start,
      code: code.substring(0, 100),
    })

    try {
      const result = await withTimeout(
        this.runInSandbox(code, options),
        { ms: options.timeout ?? 30000 }
      )

      const duration = performance.now() - start
      this.metrics.recordLatency("sandbox:latency", duration)
      logger.info("sandbox:complete", { id, duration })

      return result
    } catch (error) {
      this.metrics.increment("sandbox:errors")
      logger.error("sandbox:error", { id, error })
      throw error
    } finally {
      this.activeProcesses.delete(id)
    }
  }

  private async runInSandbox(code: string, options: ExecutionOptions): Promise<ExecutionResult> {
    return sandbox.run(code, {
      memoryLimit: options.memoryLimit ?? "512mb",
      networkAccess: options.networkAccess ?? false,
      readOnlyFilesystem: options.readOnlyFilesystem ?? true,
      environmentVariables: options.env ?? {},
    })
  }

  getStats() {
    return {
      active: this.activeProcesses.size,
      metrics: this.metrics.snapshot(),
    }
  }
}
```

**Mode Fallback Enhancement:**

```typescript
// BEFORE: single mode, no fallback
const result = await gemini.generate(prompt)

// AFTER: multi-mode with fallback and auto-recovery
type GenerationMode = "fast" | "balanced" | "precise"

class ModeRouter {
  private modeConfigs: Record<GenerationMode, ModeConfig> = {
    fast: { model: "gemini-flash", maxTokens: 1024, temperature: 0.8 },
    balanced: { model: "gemini-pro", maxTokens: 4096, temperature: 0.6 },
    precise: { model: "gemini-ultra", maxTokens: 8192, temperature: 0.2 },
  }

  async generate(prompt: string, preferred: GenerationMode = "balanced"): Promise<string> {
    const modes: GenerationMode[] = [preferred, "balanced", "fast"]

    for (const mode of modes) {
      try {
        const config = this.modeConfigs[mode]
        const result = await withTimeout(
          gemini.generate(prompt, config),
          { ms: this.getTimeoutForMode(mode) }
        )
        logger.info("mode:success", { mode })
        return result
      } catch (error) {
        logger.warn("mode:fallback", { from: mode, error })
      }
    }

    throw new Error("All generation modes failed")
  }

  private getTimeoutForMode(mode: GenerationMode): number {
    switch (mode) {
      case "fast": return 5000
      case "balanced": return 15000
      case "precise": return 30000
    }
  }
}
```

---

## 15. Enhancement Anti-Patterns Deep Dive

### 15.1 The NUKE Anti-Pattern

```diff
- // BAD: DELETE entire module and rewrite
- import { processData } from "./legacy-processor"
-
- function handleRequest(req: Request) {
-   return processData(req.body)
- }

+ // The NUKE: replaced with "cleaner" version
+ import { newProcessor } from "./new-processor"
+
+ function handleRequest(req: Request) {
+   return newProcessor.execute(req.body)
+ }
```

**Why It's Harmful:** Deleted code may be depended on by other modules. The "cleaner" version may have subtle behavioral differences. Breaks the rule of additive-only changes.

**Better Approach:** Wrap the legacy function with the new implementation as an optional path:

```diff
+ import { newProcessor } from "./new-processor"
  import { processData } from "./legacy-processor"

  function handleRequest(req: Request) {
+   if (config.useNewProcessor) {
+     return newProcessor.execute(req.body)
+   }
    return processData(req.body)
  }
```

### 15.2 The TANGLER Anti-Pattern

```diff
- // BAD: fix + enhance in same branch
- function parseInput(raw: unknown) {
-   // Fix: wrong null check
-   if (raw === undefined) return null
-   // Enhance: add validation
-   if (typeof raw !== "object") throw new Error("Invalid")
-   return transform(raw)
- }
```

**Why It's Harmful:** Makes code review impossible — reviewer can't distinguish bug fix from enhancement. If the fix needs to be cherry-picked to a hotfix branch, it's tangled with enhancements.

**Better Approach:** Separate branches:

```
fix/parse-null-check          → only the null check fix
enhance/input-validation       → only the validation enhancement
```

### 15.3 The REMOVER Anti-Pattern

```diff
- // BAD: remove "dead" code
- function legacyMigration(data: Data) {
-   // This migration is only for v1 users
-   if (data.version === 1) {
-     data.name = `${data.firstName} ${data.lastName}`
-   }
-   return data
- }
-
  function processData(data: Data) {
-   data = legacyMigration(data)
    return transform(data)
  }
```

**Why It's Harmful:** You don't know who depends on that "dead" code. It might be running in production with zero active users today — until a v1 user returns. Removing it breaks that user without warning.

**Better Approach:** Deprecate with logging, remove later:

```diff
  function legacyMigration(data: Data) {
    if (data.version === 1) {
+     logger.warn("deprecated:v1-migration", { userId: data.id })
      data.name = `${data.firstName} ${data.lastName}`
    }
    return data
  }
```

### 15.4 The FORMATTER Anti-Pattern

```diff
- // BAD: reformat entire file as part of enhancement
- function     add(a:number,b:number){
-   return a+b
- }

+ function add(a: number, b: number): number {
+   return a + b
+ }
```

**Why It's Harmful:** Reformats create massive diffs that drown out the actual enhancement. The reviewer can't tell what changed. It breaks git blame for every line.

**Better Approach:** Configure formatter (prettier, dprint) and run it project-wide in a separate PR. Never mix formatting with logic changes.

### 15.5 The DEPENDENCY-ADDER Anti-Pattern

```diff
- // BAD: add heavy library for one utility
- function truncate(str: string, len: number): string {
-   return str.length > len ? str.slice(0, len) + "..." : str
- }

+ import _ from "lodash"
+
+ function truncate(str: string, len: number): string {
+   return _.truncate(str, { length: len })
+ }
```

**Why It's Harmful:** Adds hundreds of KB (or MB) of dependencies for a 3-line function. Increases install time, security surface, and bundle size.

**Better Approach:** Write the utility inline or extract to a small dedicated package:

```diff
+ // 3 lines, zero dependencies
+ function truncate(str: string, len: number): string {
+   return str.length > len ? str.slice(0, len) + "..." : str
+ }
```

### 15.6 The OVER-ABSTRACTOR Anti-Pattern

```typescript
// BAD: abstract everything "just in case"
interface DataProcessor<T, R> {
  preProcess(input: T): Intermediate<T>
  transform(input: Intermediate<T>): Intermediate<R>
  postProcess(input: Intermediate<R>): R
  validate(input: T): ValidationResult
  sanitize(input: T): T
  audit(input: T, output: R): void
}

class GenericProcessor<T, R> implements DataProcessor<T, R> {
  // 50 lines of boilerplate for a function that was 3 lines
}
```

**Why It's Harmful:** Over-abstraction adds complexity without value. The original 3-line function was perfectly understandable. The abstracted version requires navigating 4 interfaces and 2 generic types.

**Better Approach:** Add abstractions only when you have at least 3 concrete implementations:

```typescript
// Start simple
function process(input: string): string {
  return input.trim().toLowerCase()
}

// Abstract ONLY when multiple implementations emerge
interface StringProcessor {
  process(input: string): string
}
```

### 15.7 The CONFIG-EXPLOSION Anti-Pattern

```diff
- // BAD: make EVERYTHING configurable
- function process(data: Data, options?: {
+   timeout?: number
+   retryCount?: number
+   retryDelay?: number
+   loggingLevel?: string
+   cacheEnabled?: boolean
+   cacheTTL?: number
+   validationEnabled?: boolean
+   validationSchema?: Schema
+   auditEnabled?: boolean
+   auditDestination?: string
  }) {
```

**Why It's Harmful:** Every knob is a decision the user must make. Configuration explosion leads to analysis paralysis and untested code paths (most combinations are never tested).

**Better Approach:** Limit configurable options to what users actually need. Provide sensible defaults for everything else:

```typescript
function process(data: Data, options?: {
  timeout?: number      // default: 5000
  retry?: boolean       // default: true
  validation?: "strict" | "none"  // default: "strict"
}) {
  const timeout = options?.timeout ?? 5000
  const retry = options?.retry ?? true
  // Internal defaults for everything else
}
```

---

## 16. Testing Enhancements

### 16.1 Test Infrastructure Additions

**Test Database Harness:**

```typescript
// test-utils/database.ts
import { createPool, Pool } from "generic-pool"

export class TestDatabaseHarness {
  private pool: Pool<DatabaseConnection> | null = null
  private migrationsRun = false

  async setup(config?: { schema?: string; migrations?: string[] }): Promise<void> {
    this.pool = createPool({
      create: async () => {
        const conn = await createConnection({
          database: `test_${Date.now()}`,
          dropOnCreate: true,
        })
        return conn
      },
      destroy: async (conn) => {
        await conn.dropDatabase()
        await conn.close()
      },
    }, { max: 5 })

    if (!this.migrationsRun && config?.migrations) {
      const conn = await this.pool.acquire()
      try {
        for (const migration of config.migrations) {
          await conn.query(migration)
        }
        this.migrationsRun = true
      } finally {
        this.pool.release(conn)
      }
    }
  }

  async getConnection(): Promise<DatabaseConnection> {
    if (!this.pool) throw new Error("Database not initialized")
    return this.pool.acquire()
  }

  async release(conn: DatabaseConnection): Promise<void> {
    if (!this.pool) return
    await this.pool.release(conn)
  }

  async teardown(): Promise<void> {
    if (!this.pool) return
    await this.pool.drain()
    await this.pool.clear()
    this.pool = null
  }
}
```

**API Test Client:**

```typescript
// test-utils/api-client.ts
export class TestAPIClient {
  private baseUrl: string
  private headers: Record<string, string> = {}
  private cookies: Record<string, string> = {}

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setAuth(token: string): void {
    this.headers["Authorization"] = `Bearer ${token}`
  }

  setCookie(name: string, value: string): void {
    this.cookies[name] = value
  }

  private buildHeaders(): Record<string, string> {
    const cookieStr = Object.entries(this.cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join("; ")

    return {
      "Content-Type": "application/json",
      ...this.headers,
      ...(cookieStr ? { Cookie: cookieStr } : {}),
    }
  }

  async get(path: string, query?: Record<string, string>): Promise<TestResponse> {
    const url = new URL(`${this.baseUrl}${path}`)
    if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v))

    const response = await fetch(url.toString(), { headers: this.buildHeaders() })
    return this.parseResponse(response)
  }

  async post(path: string, body?: unknown): Promise<TestResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.buildHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    return this.parseResponse(response)
  }

  async put(path: string, body?: unknown): Promise<TestResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.buildHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    return this.parseResponse(response)
  }

  async delete(path: string): Promise<TestResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.buildHeaders(),
    })
    return this.parseResponse(response)
  }

  private async parseResponse(response: Response): Promise<TestResponse> {
    const body = await response.text()
    let parsed: unknown
    try { parsed = JSON.parse(body) } catch { parsed = body }

    // Capture cookies from response
    const setCookie = response.headers.get("set-cookie")
    if (setCookie) {
      const [cookie] = setCookie.split(";")
      const [name, value] = cookie.split("=")
      this.cookies[name] = value
    }

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers),
      body: parsed,
    }
  }
}

interface TestResponse {
  status: number
  headers: Record<string, string>
  body: unknown
}
```

### 16.2 Fixture Factories

```typescript
// test-utils/factories/index.ts
export * from "./user-factory"
export * from "./config-factory"
export * from "./request-factory"
export * from "./error-factory"
```

```typescript
// test-utils/factories/user-factory.ts
import { faker } from "@faker-js/faker"

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(["user", "admin", "moderator"]),
    status: faker.helpers.arrayElement(["active", "inactive", "suspended"]),
    settings: {
      theme: faker.helpers.arrayElement(["light", "dark"]),
      notifications: faker.datatype.boolean(),
      timezone: faker.location.timeZone(),
    },
    metadata: {
      createdAt: faker.date.past().toISOString(),
      lastLogin: faker.date.recent().toISOString(),
      loginCount: faker.number.int({ min: 1, max: 1000 }),
    },
    ...overrides,
  }
}

export function buildUserList(count: number, overrides?: Partial<User>): User[] {
  return Array.from({ length: count }, () => buildUser(overrides))
}
```

```typescript
// test-utils/factories/error-factory.ts
export function buildError(overrides: Partial<AppError> = {}): AppError {
  return {
    code: faker.helpers.arrayElement(["NOT_FOUND", "VALIDATION_ERROR", "INTERNAL_ERROR", "RATE_LIMITED"]),
    message: faker.lorem.sentence(),
    statusCode: faker.helpers.arrayElement([400, 401, 403, 404, 422, 429, 500]),
    details: faker.datatype.boolean() ? { field: faker.lorem.word(), reason: faker.lorem.sentence() } : undefined,
    stack: faker.datatype.boolean() ? new Error().stack : undefined,
    ...overrides,
  }
}
```

### 16.3 Mock Providers

```typescript
// test-utils/mocks/mock-llm-provider.ts
export class MockLLMProvider implements LLMProvider {
  name = "mock"
  maxTokens = 4096
  private responses: Map<string, string> = new Map()
  private callHistory: CompletionRequest[] = []

  constructor(private defaultResponse = "Mock response") {}

  onComplete(prompt: string, response: string): void {
    this.responses.set(prompt, response)
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    this.callHistory.push(request)
    const lastMessage = request.messages[request.messages.length - 1]?.content ?? ""

    await new Promise((r) => setTimeout(r, 10)) // simulate latency

    return {
      id: `mock-${Date.now()}`,
      model: request.model ?? "mock-model",
      content: this.responses.get(lastMessage) ?? this.defaultResponse,
      usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
    }
  }

  getCalls(): CompletionRequest[] {
    return [...this.callHistory]
  }

  reset(): void {
    this.callHistory = []
    this.responses.clear()
  }
}
```

```typescript
// test-utils/mocks/mock-filesystem.ts
export class MockFilesystem {
  private files = new Map<string, string>()

  writeFile(path: string, content: string): void {
    this.files.set(path, content)
  }

  readFile(path: string): string {
    const content = this.files.get(path)
    if (!content) throw new Error(`File not found: ${path}`)
    return content
  }

  exists(path: string): boolean {
    return this.files.has(path)
  }

  deleteFile(path: string): void {
    this.files.delete(path)
  }

  listFiles(dir: string): string[] {
    return Array.from(this.files.keys()).filter((p) => p.startsWith(dir))
  }

  toSnapshot(): Record<string, string> {
    return Object.fromEntries(this.files)
  }

  reset(): void {
    this.files.clear()
  }
}
```

### 16.4 Integration Test Helpers

```typescript
// test-utils/integration.ts
import { startServer, type TestServer } from "./server"

export async function createIntegrationTest() {
  const server = await startServer({ port: 0 }) // random port
  const api = new TestAPIClient(`http://localhost:${server.port}`)
  const db = new TestDatabaseHarness()

  await db.setup()

  return {
    server,
    api,
    db,
    cleanup: async () => {
      await db.teardown()
      await server.close()
    },
  }
}

// Usage in tests
describe("User API", () => {
  let integration: Awaited<ReturnType<typeof createIntegrationTest>>

  beforeAll(async () => {
    integration = await createIntegrationTest()
  })

  afterAll(async () => {
    await integration.cleanup()
  })

  it("creates a user", async () => {
    const response = await integration.api.post("/users", {
      email: "test@example.com",
      name: "Test User",
    })

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      email: "test@example.com",
    })
  })
})
```

### 16.5 Performance Benchmark Harness

```typescript
// test-utils/benchmark.ts
export class BenchmarkHarness {
  private results: Map<string, BenchmarkResult[]> = new Map()

  async measure(name: string, fn: () => Promise<void>, iterations = 10): Promise<BenchmarkResult> {
    const times: number[] = []

    for (let i = 0; i < iterations; i++) {
      const start = performance.now()
      await fn()
      times.push(performance.now() - start)
    }

    times.sort((a, b) => a - b)
    const result: BenchmarkResult = {
      name,
      iterations,
      mean: times.reduce((a, b) => a + b, 0) / times.length,
      median: times[Math.floor(times.length / 2)],
      min: times[0],
      max: times[times.length - 1],
      p95: times[Math.floor(times.length * 0.95)],
      p99: times[Math.floor(times.length * 0.99)],
    }

    const results = this.results.get(name) ?? []
    results.push(result)
    this.results.set(name, results)

    return result
  }

  compare(before: string, after: string): ComparisonResult {
    const beforeResult = this.results.get(before)?.slice(-1)[0]
    const afterResult = this.results.get(after)?.slice(-1)[0]

    if (!beforeResult || !afterResult) {
      throw new Error("Both benchmarks must be run before comparing")
    }

    const improvement = ((beforeResult.mean - afterResult.mean) / beforeResult.mean) * 100

    return {
      before: beforeResult,
      after: afterResult,
      improvement: `${improvement > 0 ? "+" : ""}${improvement.toFixed(1)}%`,
      verdict: improvement > 10 ? "FASTER" : improvement < -10 ? "SLOWER" : "NO_CHANGE",
    }
  }

  report(): string {
    const lines = ["## Benchmark Results\n"]
    for (const [name, results] of this.results) {
      const latest = results[results.length - 1]
      lines.push(`### ${name}`)
      lines.push(`| Metric | Value |`)
      lines.push(`|--------|-------|`)
      lines.push(`| Mean | ${latest.mean.toFixed(2)}ms |`)
      lines.push(`| Median | ${latest.median.toFixed(2)}ms |`)
      lines.push(`| P95 | ${latest.p95.toFixed(2)}ms |`)
      lines.push(`| P99 | ${latest.p99.toFixed(2)}ms |`)
      lines.push(`| Min | ${latest.min.toFixed(2)}ms |`)
      lines.push(`| Max | ${latest.max.toFixed(2)}ms |`)
      lines.push("")
    }
    return lines.join("\n")
  }
}

interface BenchmarkResult {
  name: string
  iterations: number
  mean: number
  median: number
  min: number
  max: number
  p95: number
  p99: number
}

interface ComparisonResult {
  before: BenchmarkResult
  after: BenchmarkResult
  improvement: string
  verdict: "FASTER" | "SLOWER" | "NO_CHANGE"
}
```

---

## 17. Configuration Enhancements

### 17.1 Schema-Based Validation

```typescript
// config/schema.ts
import { z } from "zod"

export const AppConfigSchema = z.object({
  // Server
  port: z.coerce.number().int().min(1024).max(65535)
    .describe("HTTP server port (1024-65535)")
    .default(3000),
  host: z.string().default("localhost")
    .describe("Bind address"),

  // Database
  database: z.object({
    url: z.string().url()
      .describe("PostgreSQL connection URL"),
    pool: z.object({
      min: z.number().int().min(1).max(50).default(2)
        .describe("Minimum connection pool size"),
      max: z.number().int().min(1).max(100).default(10)
        .describe("Maximum connection pool size"),
      idleTimeout: z.number().int().min(1000).default(30000)
        .describe("Idle connection timeout in ms"),
    }).default({}),
    ssl: z.boolean().default(true)
      .describe("Enable SSL for database connections"),
  }),

  // Logging
  logging: z.object({
    level: z.enum(["silent", "error", "warn", "info", "debug", "trace"])
      .default("info")
      .describe("Logging verbosity level"),
    format: z.enum(["json", "text", "pretty"]).default("text")
      .describe("Log output format"),
    output: z.string().default("stdout")
      .describe("Log output destination (stdout, stderr, or file path)"),
    colorize: z.boolean().default(true)
      .describe("Enable colorized log output"),
  }).default({}),

  // Cache
  cache: z.object({
    enabled: z.boolean().default(true)
      .describe("Enable caching layer"),
    ttl: z.number().int().min(100).default(60000)
      .describe("Default cache TTL in ms"),
    maxSize: z.number().int().min(1).default(1000)
      .describe("Maximum cache entries"),
    provider: z.enum(["memory", "redis"]).default("memory")
      .describe("Cache backend provider"),
    redis: z.object({
      url: z.string().url().optional()
        .describe("Redis connection URL"),
      prefix: z.string().default("cache:")
        .describe("Redis key prefix"),
    }).optional(),
  }).default({}),

  // Provider
  provider: z.object({
    name: z.enum(["openai", "anthropic", "google", "ollama"])
      .default("openai")
      .describe("AI provider"),
    apiKey: z.string().min(1)
      .describe("API key for provider"),
    model: z.string().default("gpt-4")
      .describe("Model identifier"),
    timeout: z.number().int().min(1000).default(30000)
      .describe("Provider request timeout in ms"),
    maxRetries: z.number().int().min(0).max(10).default(3)
      .describe("Maximum retry attempts"),
  }),
})

export type AppConfig = z.infer<typeof AppConfigSchema>
```

### 17.2 Multi-Source Configuration

```typescript
// config/loader.ts
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

type ConfigSource = "file" | "env" | "cli" | "defaults"

interface ConfigSourceResult {
  source: ConfigSource
  data: Record<string, unknown>
}

class ConfigLoader {
  private sources: ConfigSourceResult[] = []

  addDefaults(defaults: Record<string, unknown>): this {
    this.sources.push({ source: "defaults", data: defaults })
    return this
  }

  addFile(path: string, required = false): this {
    const resolved = resolve(path)
    if (!existsSync(resolved)) {
      if (required) throw new Error(`Required config file not found: ${resolved}`)
      logger.warn(`Config file not found, skipping: ${resolved}`)
      return this
    }

    const content = readFileSync(resolved, "utf-8")
    const ext = resolved.split(".").pop()

    let data: Record<string, unknown>
    switch (ext) {
      case "json":
        data = JSON.parse(content)
        break
      case "yaml":
      case "yml":
        data = require("yaml").parse(content)
        break
      case "toml":
        data = require("toml").parse(content)
        break
      default:
        throw new Error(`Unsupported config file format: .${ext}`)
    }

    this.sources.push({ source: "file", data })
    return this
  }

  addEnv(prefix: string = "APP_"): this {
    const data: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(process.env)) {
      if (!key.startsWith(prefix)) continue
      if (!value) continue

      const configKey = key.slice(prefix.length)
        .toLowerCase()
        .split("__")
        .map((part) => part.replace(/_/g, "."))
        .join(".")

      this.setNested(data, configKey, this.coerceValue(value))
    }

    this.sources.push({ source: "env", data })
    return this
  }

  addCLI(argv: Record<string, unknown>): this {
    this.sources.push({ source: "cli", data: argv as Record<string, unknown> })
    return this
  }

  load<Schema extends z.ZodSchema>(schema: Schema): z.infer<Schema> {
    // Merge sources in priority order (last wins)
    const merged: Record<string, unknown> = {}

    for (const { data } of this.sources) {
      this.deepMerge(merged, data)
    }

    const result = schema.safeParse(merged)
    if (!result.success) {
      const issues = result.error.issues.map((i) => {
        const path = i.path.join(".")
        return `  - ${path}: ${i.message}${i.received ? ` (received: ${JSON.stringify(i.received)})` : ""}`
      })
      throw new Error(`Configuration validation failed:\n${issues.join("\n")}`)
    }

    logger.info("config:loaded", {
      sources: this.sources.map((s) => s.source),
      keys: Object.keys(result.data).length,
    })

    return result.data
  }

  private setNested(obj: Record<string, unknown>, path: string, value: unknown): void {
    const parts = path.split(".")
    let current = obj

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!(part in current)) current[part] = {}
      current = current[part] as Record<string, unknown>
    }

    current[parts[parts.length - 1]] = value
  }

  private deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(source)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!(key in target)) target[key] = {}
        this.deepMerge(target[key] as Record<string, unknown>, value as Record<string, unknown>)
      } else {
        target[key] = value
      }
    }
  }

  private coerceValue(value: string): unknown {
    if (value === "true") return true
    if (value === "false") return false
    if (value === "null") return null
    if (value === "undefined") return undefined
    if (/^\d+$/.test(value)) return parseInt(value, 10)
    if (/^\d+\.\d+$/.test(value)) return parseFloat(value)
    return value
  }
}

// Usage
const config = new ConfigLoader()
  .addDefaults({ port: 3000, logging: { level: "info" } })
  .addFile("config/default.yaml")
  .addFile("config/production.yaml")
  .addEnv("APP_")
  .addCLI({ port: args.port })
  .load(AppConfigSchema)
```

### 17.3 Auto-Generated Docs from Schema

```typescript
// scripts/generate-config-docs.ts
function generateConfigDocs(schema: z.ZodObject<any>): string {
  const lines = ["# Configuration Reference\n"]
  lines.push("| Key | Type | Default | Description |")
  lines.push("|-----|------|---------|-------------|")

  function walk(obj: z.ZodType<any>, prefix = ""): void {
    if (obj instanceof z.ZodObject) {
      const shape = obj.shape
      for (const [key, value] of Object.entries(shape)) {
        const fullPath = prefix ? `${prefix}.${key}` : key
        const description = value.description ?? ""
        const hasDefault = value instanceof z.ZodDefault
        const isOptional = value.isOptional() || hasDefault
        const typeName = getTypeName(value)

        if (value instanceof z.ZodObject) {
          lines.push(`| \`${fullPath}\` | \`object\` | — | ${description} |`)
          walk(value, fullPath)
        } else if (value instanceof z.ZodDefault) {
          const inner = value._def.innerType
          const defaultVal = JSON.stringify(value._def.defaultValue())
          lines.push(`| \`${fullPath}\` | \`${getTypeName(inner)}\` | \`${defaultVal}\` | ${description} |`)
        } else {
          const defaultVal = hasDefault ? `\`${JSON.stringify((value as any)._def?.defaultValue?.())}\`` : "—"
          lines.push(`| \`${fullPath}\` | \`${typeName}\` | ${defaultVal} | ${description} |`)
        }
      }
    }
  }

  walk(schema)
  return lines.join("\n")
}

function getTypeName(type: z.ZodType<any>): string {
  if (type instanceof z.ZodString) return "string"
  if (type instanceof z.ZodNumber) return "number"
  if (type instanceof z.ZodBoolean) return "boolean"
  if (type instanceof z.ZodArray) return `${getTypeName(type._def.type)}[]`
  if (type instanceof z.ZodEnum) return type._def.values.join(" | ")
  if (type instanceof z.ZodUnion) return type._def.options.map(getTypeName).join(" | ")
  if (type instanceof z.ZodDefault) return getTypeName(type._def.innerType)
  if (type instanceof z.ZodOptional) return `${getTypeName(type._def.innerType)}?`
  return "unknown"
}
```

### 17.4 Config Migration Helpers

```typescript
// config/migration.ts
interface ConfigMigration {
  fromVersion: string
  toVersion: string
  migrate(config: Record<string, unknown>): Record<string, unknown>
}

class ConfigMigrator {
  private migrations: ConfigMigration[] = []

  register(migration: ConfigMigration): void {
    this.migrations.push(migration)
  }

  migrate(config: Record<string, unknown>, fromVersion: string, toVersion: string): Record<string, unknown> {
    let current = { ...config }
    let currentVersion = fromVersion

    const relevantMigrations = this.migrations.filter(
      (m) => m.fromVersion >= fromVersion && m.toVersion <= toVersion
    ).sort((a, b) => a.fromVersion.localeCompare(b.fromVersion))

    for (const migration of relevantMigrations) {
      logger.info("config:migrating", { from: currentVersion, to: migration.toVersion })
      current = migration.migrate(current)
      currentVersion = migration.toVersion
    }

    return current
  }
}

// Example migrations
const migrator = new ConfigMigrator()
migrator.register({
  fromVersion: "1.0.0",
  toVersion: "1.1.0",
  migrate: (config) => {
    // Rename `db` to `database`
    if ("db" in config && !("database" in config)) {
      config.database = config.db
      delete config.db
    }
    return config
  },
})

migrator.register({
  fromVersion: "1.1.0",
  toVersion: "2.0.0",
  migrate: (config) => {
    // Change `logging.json` boolean to `logging.format` enum
    if (typeof config.logging === "object" && config.logging !== null) {
      const log = config.logging as Record<string, unknown>
      if ("json" in log) {
        log.format = log.json ? "json" : "text"
        delete log.json
      }
    }
    return config
  },
})
```

### 17.5 Config Deprecation Warnings

```typescript
// config/deprecation.ts
interface DeprecatedConfig {
  key: string
  alternative: string
  removeInVersion: string
  message?: string
}

class ConfigDeprecationHandler {
  private deprecations: DeprecatedConfig[] = []

  register(deprecation: DeprecatedConfig): void {
    this.deprecations.push(deprecation)
  }

  check(config: Record<string, unknown>, currentVersion: string): void {
    for (const dep of this.deprecations) {
      const value = this.getNested(config, dep.key)
      if (value !== undefined) {
        const message = dep.message ?? [
          `Config key "${dep.key}" is deprecated.`,
          `Use "${dep.alternative}" instead.`,
          `Will be removed in v${dep.removeInVersion}.`,
          `Current version: v${currentVersion}.`,
        ].join(" ")

        logger.warn("config:deprecated", {
          key: dep.key,
          alternative: dep.alternative,
          removeIn: dep.removeInVersion,
          message,
        })

        // Auto-apply migration to new key if old value exists and new key is empty
        const newValue = this.getNested(config, dep.alternative)
        if (newValue === undefined) {
          this.setNested(config, dep.alternative, value)
          logger.info("config:auto-migrated", { from: dep.key, to: dep.alternative })
        }
      }
    }
  }

  private getNested(obj: Record<string, unknown>, path: string): unknown {
    return path.split(".").reduce((current, part) => {
      if (current && typeof current === "object") {
        return (current as Record<string, unknown>)[part]
      }
      return undefined
    }, obj as any)
  }

  private setNested(obj: Record<string, unknown>, path: string, value: unknown): void {
    const parts = path.split(".")
    let current = obj
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) current[parts[i]] = {}
      current = current[parts[i]] as Record<string, unknown>
    }
    current[parts[parts.length - 1]] = value
  }
}
```

---

## 18. Migration Enhancement Patterns

### 18.1 API Migration Wrappers

```typescript
// BEFORE: codebase uses old API
const result = oldApi.processV1(data)

// AFTER: wrapper that migrates between API versions transparently
class ApiMigrationWrapper {
  constructor(
    private oldApi: OldApi,
    private newApi: NewApi,
    private version: "v1" | "v2" = "v1"
  ) {}

  async process(data: unknown): Promise<Result> {
    if (this.version === "v2") {
      // Migrate data shape v1 → v2
      const v2Data = this.migrateInput(data)
      const v2Result = await this.newApi.processV2(v2Data)
      return this.migrateOutput(v2Result)
    }

    // v1 path — no migration needed
    return this.oldApi.processV1(data)
  }

  private migrateInput(data: unknown): V2Input {
    const v1 = data as V1Input
    return {
      payload: v1.data,
      meta: {
        source: v1.source ?? "unknown",
        timestamp: v1.ts ?? new Date().toISOString(),
      },
    }
  }

  private migrateOutput(result: V2Output): Result {
    return {
      id: result.identifier,
      status: result.state,
      data: result.contents,
      processedAt: result.completedAt,
    }
  }
}

// Gradual rollout: start with v1, test v2, flip the switch
const api = new ApiMigrationWrapper(oldProcessor, newProcessor, "v1")

// Later, after validation:
// const api = new ApiMigrationWrapper(oldProcessor, newProcessor, "v2")
```

### 18.2 Backward Compatibility Shims

```typescript
// BEFORE: renamed function breaks consumers
// Old name removed, new name added
function processDataV2(input: Input): Output { /* new impl */ }

// AFTER: compatibility shim preserves old name with deprecation
/**
 * @deprecated Use `processDataV2` instead. Will be removed in v3.0.0.
 * Shim maintained for backward compatibility.
 */
function processData(input: Input): Output {
  logger.warn("deprecated:api", {
    function: "processData",
    alternative: "processDataV2",
    removeIn: "v3.0.0",
  })
  return processDataV2(input)
}
```

**Shim for Changed Return Type:**

```typescript
// New API returns different shape
class NewUserService {
  async getUser(id: string): Promise<{ identifier: string; fullName: string; emailAddress: string }> {
    return this.db.findUser(id)
  }
}

// Shim that preserves old return type
class CompatUserService {
  private newService = new NewUserService()

  async getUser(id: string): Promise<{ id: string; name: string; email: string }> {
    const result = await this.newService.getUser(id)
    return {
      id: result.identifier,
      name: result.fullName,
      email: result.emailAddress,
    }
  }
}
```

### 18.3 Deprecation Warning Injection

```typescript
// config/deprecation-injector.ts
export function deprecate<T extends object>(
  obj: T,
  prop: keyof T,
  alternative: string,
  removeIn: string
): void {
  let value = obj[prop]

  Object.defineProperty(obj, prop, {
    get() {
      logger.warn("deprecated:property", {
        property: String(prop),
        alternative,
        removeIn,
      })
      return value
    },
    set(newValue) {
      logger.warn("deprecated:property-set", {
        property: String(prop),
        alternative,
        removeIn,
      })
      value = newValue
    },
    enumerable: true,
    configurable: true,
  })
}

// Usage
deprecate(config, "db", "database", "v3.0.0")
// Accessing config.db will log a deprecation warning
```

### 18.4 Gradual Rollout Patterns

```typescript
// Feature flag based gradual rollout
class FeatureRollout {
  private flags = new Map<string, RolloutConfig>()

  define(name: string, config: RolloutConfig): void {
    this.flags.set(name, config)
    logger.info("feature:defined", { name, config })
  }

  isEnabled(name: string, context?: { userId?: string; percent?: number }): boolean {
    const config = this.flags.get(name)
    if (!config) return false

    // Stage 1: Internal testing
    if (config.stage === "internal") {
      return context?.userId ? config.internalUsers?.includes(context.userId) ?? false : false
    }

    // Stage 2: Percentage rollout
    if (config.stage === "percentage" && context?.percent !== undefined) {
      return context.percent < (config.percent ?? 100)
    }

    // Stage 3: Full rollout
    return config.stage === "full"
  }

  // Gradual progression
  async progress(name: string): Promise<void> {
    const config = this.flags.get(name)
    if (!config) throw new Error(`Unknown feature: ${name}`)

    const stages: RolloutStage[] = ["internal", "percentage", "full"]
    const currentIndex = stages.indexOf(config.stage)
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1]
      config.stage = nextStage
      logger.info("feature:progressed", { name, from: stages[currentIndex], to: nextStage })
    }
  }
}

type RolloutStage = "internal" | "percentage" | "full"

interface RolloutConfig {
  stage: RolloutStage
  percent?: number
  internalUsers?: string[]
}

// Usage
const rollout = new FeatureRollout()
rollout.define("new-processor", {
  stage: "internal",
  internalUsers: ["dev-team", "qa-team"],
})

// Later in code:
if (rollout.isEnabled("new-processor", { userId: currentUser.id })) {
  return newProcessor(data)
}
return oldProcessor(data)
```

---

## 19. Enhancement Review Checklist

### 19.1 Pre-Submission Gate

**Safety:**

- [ ] All inputs validated before use (zod, io-ts, or custom guards)
- [ ] Null/undefined paths handled (optional chaining, nullish coalescing)
- [ ] Async operations have timeout protection
- [ ] External calls have retry logic with backoff
- [ ] No unhandled promise rejections
- [ ] Circuit breaker or fallback for critical dependencies
- [ ] Sensitive data never logged (passwords, tokens, PII)

**Observability:**

- [ ] Entry/exit logging for public API functions
- [ ] Timing/duration tracked for expensive operations
- [ ] Errors logged with context (not just the message)
- [ ] Debug/trace level for verbose internal details
- [ ] Structured log format (never raw console.log)
- [ ] Metrics counters for key operations

**Performance:**

- [ ] Repeated expensive computations cached (memoization)
- [ ] Heavy resources initialized lazily
- [ ] Parallel operations bounded (concurrency limit)
- [ ] Event listeners debounced/throttled where applicable
- [ ] No synchronous I/O in hot paths
- [ ] Memory leaks prevented (cache size limits, cleanup)

**Developer Experience:**

- [ ] Error messages include context and actionable suggestions
- [ ] CLI commands show usage examples on --help
- [ ] Configuration validated with descriptive error messages
- [ ] Debug/verbose flags available
- [ ] Progress indicators for long operations
- [ ] TypeScript types exported and documented

**Testing:**

- [ ] Unit tests for every new function/method
- [ ] Edge cases covered (null, empty, invalid inputs)
- [ ] Error paths tested (not just happy path)
- [ ] Integration tests for external dependencies
- [ ] Mock providers for third-party services
- [ ] Fixtures/factories for test data

**Documentation:**

- [ ] JSDoc added for all new public APIs
- [ ] @param, @returns, @throws documented
- [ ] @example for non-obvious usage
- [ ] README updated if user-facing behavior changed
- [ ] Configuration schema documented

**Backward Compatibility:**

- [ ] No existing exports removed
- [ ] No function signatures changed
- [ ] No default behavior altered
- [ ] Deprecated exports have shims and warnings
- [ ] Old config keys still work (with deprecation notice)

### 19.2 Code Review Checklist

- [ ] Diff is mostly green (additions only)
- [ ] No existing tests modified
- [ ] New tests cover the enhancement
- [ ] Follows existing code patterns and conventions
- [ ] Enhancement is config-gated or optional
- [ ] No hardcoded values (timeouts, limits, paths)
- [ ] No console.log (proper logger used)
- [ ] Platform differences handled (win32, darwin, linux)
- [ ] Error messages are actionable
- [ ] Branch name follows convention: `enhance/scope-description`

### 19.3 Post-Merge Verification

- [ ] Enhancement works with existing configs (no breaking changes)
- [ ] All CI checks pass (typecheck, lint, test, build)
- [ ] Documentation deployed/updated
- [ ] Deprecation notices in place (if any)
- [ ] Release notes drafted with before/after benefit
- [ ] Feature flag set to appropriate rollout stage

---

## 20. Real Enhancement Examples

### 20.1 Adding Timeout to HTTP Client

**Scenario:** An OSS CLI tool makes HTTP requests without timeout protection. A slow network or unresponsive server causes the CLI to hang indefinitely.

**Before:**

```typescript
async function fetchConfig(url: string): Promise<Config> {
  const response = await fetch(url)
  return response.json()
}
```

**Enhancement:**

```typescript
async function fetchConfig(url: string, timeoutMs = 10000): Promise<Config> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { signal: controller.signal })
    return response.json()
  } finally {
    clearTimeout(timer)
  }
}
```

**Benefit:** CLI no longer hangs indefinitely on unresponsive servers. Users get a clear timeout error instead of freezing. Configurable timeout respects different network conditions.

### 20.2 Adding Structured Logging to a CLI

**Scenario:** A developer tool uses `console.log` for all output, making it impossible to filter, format, or silence messages.

**Before:**

```typescript
async function buildProject(config: BuildConfig) {
  console.log("Build started")
  console.log(`Using config: ${JSON.stringify(config)}`)
  try {
    await runBuild(config)
    console.log("Build completed")
  } catch (error) {
    console.log("Build failed:", error)
    throw error
  }
}
```

**Enhancement:**

```typescript
import { createLogger } from "./logger"

const logger = createLogger({ level: config.logLevel })

async function buildProject(config: BuildConfig) {
  logger.info("build:start", { config })
  try {
    const start = performance.now()
    await runBuild(config)
    const duration = performance.now() - start
    logger.info("build:complete", { duration })
  } catch (error) {
    logger.error("build:failed", { error, config })
    throw error
  }
}
```

**Benefit:** CI systems can parse structured JSON logs. Users can set `--log-level=debug` for verbose output or `--log-level=silent` for quiet mode. Error context includes config snapshot for debugging.

### 20.3 Adding Input Validation to an API

**Scenario:** A REST API accepts arbitrary JSON bodies without validation, leading to confusing database errors when required fields are missing.

**Before:**

```typescript
app.post("/api/users", async (req, res) => {
  const user = await db.users.create(req.body)
  res.json(user)
})
```

**Enhancement:**

```typescript
import { z } from "zod"

const CreateUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required").max(100),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(["user", "admin"]).default("user"),
})

app.post("/api/users", async (req, res) => {
  const result = CreateUserSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(422).json({
      error: "Validation failed",
      details: result.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    })
  }

  const user = await db.users.create(result.data)
  res.status(201).json(user)
})
```

**Benefit:** Users get clear, structured validation errors instead of 500s or cryptic database errors. Malformed requests are rejected early before reaching the database.

### 20.4 Adding Retry with Backoff to a Provider Call

**Scenario:** An AI chatbot tool makes API calls to OpenAI. Transient rate limits (429) or network blips cause random failures that users must retry manually.

**Before:**

```typescript
async function generateResponse(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({ messages: [{ role: "user", content: prompt }] })
  return response.choices[0].message.content ?? ""
}
```

**Enhancement:**

```typescript
async function generateResponse(prompt: string, retries = 3): Promise<string> {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
      })
      return response.choices[0].message.content ?? ""
    } catch (error) {
      lastError = error as Error
      if (attempt < retries && (error as any).status === 429) {
        const delay = Math.min(1000 * 2 ** attempt + Math.random() * 1000, 30000)
        logger.warn(`Rate limited, retrying in ${delay}ms (attempt ${attempt}/${retries})`)
        await new Promise((r) => setTimeout(r, delay))
      }
    }
  }

  throw lastError!
}
```

**Benefit:** Transient failures are handled automatically. Users no longer see random "API error" messages. Exponential backoff respects rate limits without hammering the API.

### 20.5 Adding Lazy Initialization to a Config Manager

**Scenario:** A library eagerly creates expensive resources (database connections, file watchers) on import, even if the user never calls the relevant functions.

**Before:**

```typescript
class ConfigManager {
  private db = new DatabaseConnection() // Created on import!

  async get(key: string): Promise<string> {
    return this.db.query(key)
  }
}
```

**Enhancement:**

```typescript
class ConfigManager {
  private db: DatabaseConnection | null = null

  private async getDb(): Promise<DatabaseConnection> {
    if (!this.db) {
      this.db = await DatabaseConnection.create({
        url: this.config.dbUrl,
        pool: 1,
      })
      logger.debug("config:db:initialized")
    }
    return this.db
  }

  async get(key: string): Promise<string> {
    const db = await this.getDb()
    return db.query(key)
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close()
      this.db = null
    }
  }
}
```

**Benefit:** Importing the module no longer creates side effects. Resources are only created when actually used. Memory footprint is reduced for users who import but don't use every feature.

### 20.6 Adding Concurrency Control to Batch Processing

**Scenario:** A batch processing tool spawns all operations in parallel without limit, overwhelming the system with hundreds of concurrent file reads or API calls.

**Before:**

```typescript
async function processFiles(files: string[]) {
  const results = await Promise.all(
    files.map((file) => processSingleFile(file))
  )
  return results
}
```

**Enhancement:**

```typescript
async function processFiles(files: string[], concurrency = 5) {
  const results: ProcessingResult[] = []
  const queue = [...files]
  const running: Promise<void>[] = []

  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const file = queue.shift()!
      results.push(await processSingleFile(file))
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, files.length) }, () => worker())
  await Promise.all(workers)

  return results
}
```

**Benefit:** System resource usage is bounded. No more OOM errors from 500 simultaneous file reads. Users can tune concurrency to match their hardware.

### 20.7 Adding Cache with TTL to Expensive Lookups

**Scenario:** A code analysis tool repeatedly computes the same dependency graph on every file change, wasting CPU on identical results.

**Before:**

```typescript
async function getDependencies(filePath: string): Promise<Dependency[]> {
  const content = await readFile(filePath)
  return parseDependencies(content)
}
```

**Enhancement:**

```typescript
const depCache = new Map<string, { result: Dependency[]; expires: number }>()
const CACHE_TTL = 2000 // 2 seconds

async function getDependencies(filePath: string): Promise<Dependency[]> {
  const cached = depCache.get(filePath)
  if (cached && Date.now() < cached.expires) {
    return cached.result
  }

  const content = await readFile(filePath)
  const result = parseDependencies(content)
  depCache.set(filePath, { result, expires: Date.now() + CACHE_TTL })
  return result
}
```

**Benefit:** File watchers that fire multiple rapid events no longer re-parse unchanged content. CPU usage drops significantly during active editing.

### 20.8 Adding Circuit Breaker to External Services

**Scenario:** An integration tool calls a third-party API that occasionally goes down. Each call takes 30 seconds to timeout, blocking the entire tool.

**Before:**

```typescript
async function syncWithExternal(data: SyncData): Promise<SyncResult> {
  return externalApi.sync(data) // Hangs for 30s when service is down
}
```

**Enhancement:**

```typescript
class ExternalApiBreaker {
  private failures = 0
  private lastFailure = 0
  private readonly threshold = 5
  private readonly resetTimeout = 60000

  async sync(data: SyncData): Promise<SyncResult> {
    if (this.failures >= this.threshold) {
      if (Date.now() - this.lastFailure < this.resetTimeout) {
        throw new Error("External API circuit breaker is open (service appears down)")
      }
      this.failures = 0 // half-open
    }

    try {
      const result = await withTimeout(externalApi.sync(data), { ms: 10000 })
      this.failures = 0
      return result
    } catch (error) {
      this.failures++
      this.lastFailure = Date.now()
      throw error
    }
  }
}
```

**Benefit:** When the external service is down, the tool fails fast instead of hanging for 30 seconds per call. After the reset timeout, it automatically tries again. Downstream tasks can proceed with fallback logic.

---

> **End of Task-Enhance Document (Global / Brain Box)**
