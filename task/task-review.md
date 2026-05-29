# Task-Review: Code Review & Quality Guide (Global / Brain Box)
> Part of the LifeJiggy OSS Enhancement Framework
> Master Reference — Ensuring Quality Across All Projects

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy)
2. [The Reviewer's Oath](#2-the-reviewers-oath)
3. [Review Types & Depth](#3-review-types--depth)
4. [What to Look For](#4-what-to-look-for)
5. [Review by PR Type](#5-review-by-pr-type)
6. [Constructive Feedback Patterns](#6-constructive-feedback-patterns)
7. [The Review Checklist](#7-the-review-checklist)
8. [Code Quality Gates](#8-code-quality-gates)
9. [Security Review](#9-security-review)
10. [Performance Review](#10-performance-review)
11. [Testing Review](#11-testing-review)
12. [Documentation Review](#12-documentation-review)
13. [Cross-Project Review Patterns](#13-cross-project-review-patterns)
14. [Common Review Findings](#14-common-review-findings)
15. [Review Escalation](#15-review-escalation)
16. [Approving vs Requesting Changes](#16-approving-vs-requesting-changes)
17. [Review Anti-Patterns](#17-review-anti-patterns)
18. [Post-Review Responsibilities](#18-post-review-responsibilities)
19. [Checklist Reference](#19-checklist-reference)
20. [Review by Project Type](#20-review-by-project-type)
21. [Security Review Deep Dive](#21-security-review-deep-dive)
22. [Performance Review Deep Dive](#22-performance-review-deep-dive)
23. [Testing Review Deep Dive](#23-testing-review-deep-dive)
24. [Documentation Review Deep Dive](#24-documentation-review-deep-dive)
25. [CI/CD Review Integration](#25-cicd-review-integration)
26. [Review Response Templates](#26-review-response-templates)
27. [Review Metrics & Improvement](#27-review-metrics--improvement)
28. [Advanced Review Techniques](#28-advanced-review-techniques)
29. [The Review Workflow](#29-the-review-workflow)

---

## 1. Core Philosophy

### 1.1 The Reviewer's Purpose

```
Review is not gatekeeping — it's collaboration.
The goal is better code, not blocked PRs.
Every comment should teach, not just criticize.
Be kind, be specific, be constructive.
```

### 1.2 The Balance

| Aspect | Too Little | Too Much |
|--------|------------|----------|
| Speed | Merged with bugs | Never merged, demotivates |
| Detail | Missed issues | Nitpicking trivial |
| Scope | Only code | Architecture & design |
| Tone | "LGTM" | Hostile/rude |

### 1.3 The Mentorship Mindset

Every review is a teaching opportunity. The author learned something by writing this code; your review is how they learn to write it better next time.

```
GOOD: "I see you're using Promise.all here — that's great for parallelism.
Just be aware that if one promise rejects, the whole batch fails.
Consider Promise.allSettled if you want individual error handling."
```

```
BETTER: Show the pattern, explain the tradeoff, let the author decide.
```

```
WORST: "Use allSettled instead." — No explanation, no context, no teaching.
```

### 1.4 Review as Risk Management

| Risk Level | Examples | Review Rigor |
|------------|----------|--------------|
| Critical | Auth, payments, data deletion | Deep review, second reviewer |
| High | API changes, file I/O, network | Standard + security scan |
| Medium | Business logic, state management | Standard review |
| Low | UI text, comments, formatting | Light review |

---

## 2. The Reviewer's Oath

```
I will review the code, not the author.
I will explain why, not just what.
I will be specific, not vague.
I will separate "must fix" from "nice to have".
I will approve when it's good enough, not perfect.
I will respond within 24 hours.
I will assume good intent and ask questions before concluding.
I will admit when I'm wrong or unsure.
I will celebrate good code, not just catch bad code.
```

---

## 3. Review Types & Depth

### 3.1 Review Levels

| Level | Time | Focus | When |
|-------|------|-------|------|
| **Light** | 5-10 min | Obvious bugs, security issues, test presence | Trivial fixes, docs |
| **Standard** | 15-30 min | Logic, architecture, tests, edge cases | Most PRs |
| **Deep** | 45-60 min | Full architecture, perf, security, all edge cases | Large features, core changes |

### 3.2 When to Do Each

| PR Type | Review Level |
|---------|--------------|
| One-line fix | Light |
| Bug fix with tests | Standard |
| New tool/feature | Standard |
| New provider | Deep |
| Architecture change | Deep |
| Security fix | Deep |
| Dependency update | Light (check diff + CVE) |
| Refactor (no behavior change) | Standard |
| Documentation only | Light |

### 3.3 Review Depth by File Type

| File Type | Depth Needed |
|-----------|-------------|
| `.ts` / `.tsx` | Full logic review |
| `.json` / `.yaml` | Check for syntax, secrets |
| `.md` | Content accuracy, links |
| `.test.ts` | Assertion quality, coverage |
| `.d.ts` | Type correctness, exports |
| `.config.*` | Verify options, defaults |

---

## 4. What to Look For

### 4.1 The Review Pyramid

```
Top Priority (MUST FIX):
  - Security vulnerabilities
  - Data loss risks
  - Breaking changes
  - Infinite loops / hangs

High Priority (SHOULD FIX):
  - Logic errors
  - Missing edge cases
  - Missing tests
  - Poor error handling
  - Performance regressions

Medium Priority (NICE TO FIX):
  - Code style (if inconsistent with project)
  - Comments / documentation
  - Variable naming

Low Priority (OPTIONAL):
  - Personal preferences
  - Style that matches project conventions
```

### 4.2 Universal Red Flags

| Red Flag | Why | Action |
|----------|-----|--------|
| `any` type | TypeScript is disabled | Request proper type |
| Empty catch | Errors swallowed | Request logging |
| `// TODO` in new code | Intentional debt | Request issue or fix |
| Hardcoded values | Config needed | Request config |
| No tests | Untested | Request tests |
| Large PR (>500 lines) | Hard to review | Request split |
| `console.log` left in | Debug artifact | Remove or use logger |
| Magic numbers | Meaning unclear | Name as constant |
| Deeply nested code (>3 levels) | Hard to read | Refactor or extract |
| `@ts-ignore` / `@ts-expect-error` without reason | Type discipline broken | Request type-safe alternative |

### 4.3 The "Smell Test" — Gut Checks

| Smell | What It Indicates |
|-------|-------------------|
| "I'm not sure this works" | Probably doesn't — test it |
| "This looks too complex" | Probably over-engineered |
| "Why is this file 800 lines?" | Needs splitting |
| "This change touches 20 files" | Design may need rethinking |
| "This is clever" | Probably unreadable — add comments |
| "This looks familiar" | Duplicate logic — extract |

---

## 5. Review by PR Type

### 5.1 Bug Fix Review

- [ ] Does the fix match the root cause (not symptom)?
- [ ] Is there a regression test that fails before the fix?
- [ ] Is the change minimal?
- [ ] No refactors or enhancements mixed in?
- [ ] Does it handle the edge case correctly?
- [ ] Could this fix break something else?

### 5.2 Feature Review

- [ ] Is it additive? (No existing code modified)
- [ ] Is it config-gated? (Default disabled)
- [ ] Is it backward compatible?
- [ ] Are there tests for the new feature?
- [ ] Are edge cases handled?
- [ ] Is documentation included?
- [ ] Are there migration considerations?

### 5.3 Enhancement Review

- [ ] Is it truly additive?
- [ ] Does it preserve existing behavior?
- [ ] Is it optional / config-gated?
- [ ] Are there tests for the enhancement?
- [ ] Does it follow existing patterns?
- [ ] Degradation path if enhancement fails?

### 5.4 Refactor Review

- [ ] Is behavior unchanged? (Verify with tests)
- [ ] Are tests updated or still passing?
- [ ] Is the refactor justified? (Better readability, perf, etc.)
- [ ] Is the PR scoped? (Not mixing refactor with fixes)
- [ ] Are there benchmark comparisons if perf-related?

### 5.5 Dependency Update Review

- [ ] What changed in the dependency? (Review diff or changelog)
- [ ] Are there breaking changes?
- [ ] Are there known CVEs in the new version?
- [ ] Is the lockfile consistent? (`npm ci` reproducible)
- [ ] Do tests still pass with the update?

### 5.6 Documentation PR Review

- [ ] Is the content accurate and current?
- [ ] Are code examples runnable? (Copy-paste verified)
- [ ] Are links working?
- [ ] Is the tone consistent with existing docs?
- [ ] No placeholder or TODO sections?

---

## 6. Constructive Feedback Patterns

### 6.1 Good vs Bad Feedback

```
❌ BAD: "This is wrong."
✅ GOOD: "This will crash when input is null. Consider adding a guard clause."

❌ BAD: "Fix this."
✅ GOOD: "This line doesn't handle the empty array case. Can you add a check?"

❌ BAD: "You should use a different pattern."
✅ GOOD: "The existing codebase uses Effect.gen for this. Could you follow that pattern for consistency?"
```

### 6.2 Feedback Types

| Type | Format | Example |
|------|--------|---------|
| **Issue** | "This will [problem] when [condition]" | "This will crash when items is undefined" |
| **Question** | "Why did you choose X over Y?" | "Why did you use Map here instead of object?" |
| **Suggestion** | "Consider [alternative] because [reason]" | "Consider using optional chaining here for consistency" |
| **Praise** | "Nice approach on [specific thing]" | "Nice use of the wrapper pattern here" |
| **Nitpick** | "Minor: [suggestion]" | "Minor: trailing comma missing" |

### 6.3 The SBI Framework (Situation-Behavior-Impact)

```
SITUATION: "In the handleRequest function (line 42)..."
BEHAVIOR: "...you're calling fs.readFileSync..."
IMPACT: "...which blocks the event loop for all concurrent requests. This will cause timeout failures under load."

SUGGESTION: "Consider using fs.promises.readFile with await instead."
```

### 6.4 Handling Disagreements

| Situation | Approach |
|-----------|----------|
| Author disagrees | Ask clarifying questions, not demands |
| Style preference | Defer to project style guide |
| Architectural | Seek third opinion or tech lead |
| Performance claim | Request benchmark data |
| Security concern | Do not compromise — escalate if needed |

---

## 7. The Review Checklist

### 7.1 Functionality

- [ ] Does the code do what it claims?
- [ ] Are edge cases handled? (empty, null, undefined, 0, negative, max values)
- [ ] Is error handling present? (try/catch, Result type, Effect)
- [ ] Are timeouts handled?
- [ ] Are concurrent calls safe? (race conditions, deadlocks)
- [ ] Is there input validation on all user-facing paths?
- [ ] Are type guards or schema validators (zod, effect/schema) used?
- [ ] Is the return type correct in all code paths?
- [ ] Are side effects intentional and documented?
- [ ] Are idempotency semantics considered for retryable operations?

### 7.2 Architecture

- [ ] Does it follow existing patterns?
- [ ] Does it respect existing interfaces?
- [ ] Is it in the right location?
- [ ] Is the change minimal and scoped?
- [ ] Does it introduce new dependencies? (Justified?)
- [ ] Is the single responsibility principle respected?
- [ ] Are layers properly separated? (CLI / Core / Provider)
- [ ] Could this be simplified by using existing utilities?
- [ ] Is the module boundary correct? (what's exported vs internal)
- [ ] Does it compose well with existing abstractions? (Effect, pipe)

### 7.3 Testing

- [ ] Are there tests?
- [ ] Do tests cover edge cases?
- [ ] Do tests fail before the fix? (Regression test validity)
- [ ] Are existing tests still passing?
- [ ] Are tests deterministic? (No date/random dependency)
- [ ] Are tests isolated? (No shared mutable state)
- [ ] Is the test pyramid respected? (More unit, fewer integration)
- [ ] Are mocks minimal and focused?
- [ ] Are assertions meaningful? (Not just `expect(true).toBe(true)`)
- [ ] Are error paths tested?

### 7.4 Code Quality

- [ ] Is the code readable?
- [ ] Are variables named clearly? (Pronounceable, descriptive)
- [ ] Are there comments where needed? (Complex logic, non-obvious decisions)
- [ ] No dead code or commented-out code?
- [ ] No debug artifacts? (console.log, debugger statements)
- [ ] Is the code DRY? (No duplication)
- [ ] Are functions pure where possible?
- [ ] Are side effects explicit and localized?
- [ ] Is error handling consistent with project patterns?
- [ ] Is the type system used effectively? (No `as` casts without reason)

### 7.5 Security

- [ ] Are secrets handled safely? (No logging, no exposure)
- [ ] Is input validated?
- [ ] No command injection risks?
- [ ] No path traversal risks?
- [ ] No prototype pollution?
- [ ] Are dependencies checked for known vulnerabilities?
- [ ] Is authentication/authorization checked where needed?
- [ ] Are error messages safe? (No stack traces in user-facing output)
- [ ] Is rate limiting considered?
- [ ] Are file permissions appropriate?

### 7.6 Performance

- [ ] No obvious performance issues?
- [ ] No blocking operations in hot paths?
- [ ] No memory leaks?
- [ ] Are async/await chains correct? (No forgotten await)
- [ ] Are streams/buffers used for large data?
- [ ] Are data structures appropriate for the access pattern?
- [ ] No N+1 query patterns?
- [ ] Are caches bounded? (Size limit, TTL)
- [ ] Are event listeners cleaned up?
- [ ] Are timers/intervals cleared on teardown?

### 7.7 Cross-Platform

- [ ] Does it work on Windows?
- [ ] Does it work on macOS/Linux?
- [ ] Are paths handled correctly? (path.join, path.sep)
- [ ] Are line endings consistent? (LF vs CRLF)
- [ ] No hardcoded /tmp or /var paths?
- [ ] Are shell commands cross-platform? (Avoid bash-specific syntax)
- [ ] Is the filesystem case-sensitive vs insensitive handled?
- [ ] Are binary dependencies or platform-specific packages avoided?

### 7.8 TypeScript-Specific Checks

- [ ] No `any` without explicit justification
- [ ] Generics used appropriately (constrained, not over-generalized)
- [ ] Discriminated unions used for state machines?
- [ ] Branded types for domain primitives? (UserID vs string)
- [ ] Proper use of `readonly` on immutable data
- [ ] No type assertions (`as`) without validation
- [ ] Exhaustive switch/pattern matching?
- [ ] Conditional types used where appropriate?
- [ ] Utility types leveraged? (Pick, Omit, Partial, Required)
- [ ] Type exports are complete and correct

### 7.9 Effect-TS Specific Checks

- [ ] Effect type is correct? (Effect<Env, Error, Value>)
- [ ] No unsafe `runPromise` or `runSync` in library code?
- [ ] Are effects composed with pipe or Effect.gen?
- [ ] Are resource scopes properly managed? (Scope, acquireRelease)
- [ ] Are errors typed with Cause or tagged errors?
- [ ] No forgotten `Effect.succeed`/`Effect.fail` wrapping?
- [ ] Is the layer graph correct? (Dependency injection)
- [ ] Are streams properly terminated and finalized?

---

## 8. Code Quality Gates

### 8.1 Blocking Issues (Must Fix Before Merge)

```
- Security vulnerability
- Data loss
- Breaking change without deprecation
- Infinite loop / hang
- Missing validation for user input
- Secrets exposed in logs or output
- Tests are failing
- TypeScript compilation errors
- Lint errors in the changed files
- Backward compatibility broken without migration plan
```

### 8.2 Non-Blocking Issues (Can Merge, But Should Fix)

```
- Missing edge case handling (low risk)
- Missing log for error path
- Variable naming inconsistency
- Minor style inconsistency
- Missing comment on complex logic
- Missing test for one edge case (non-critical)
- Slightly suboptimal performance (not a regression)
```

### 8.3 Optional Issues (Can Defer)

```
- Personal style preferences
- Refactoring that could be separate
- Documentation improvements
- Additional test coverage for non-critical paths
- Minor naming suggestions
- Performance micro-optimizations
```

---

## 9. Security Review

### 9.1 Security Checklist

- [ ] Are API keys/tokens handled securely?
- [ ] No secrets in logs, errors, or console output?
- [ ] Is user input sanitized?
- [ ] No command injection via shell execution?
- [ ] No path traversal in file operations?
- [ ] Is authentication/authorization checked?
- [ ] Is rate limiting considered?
- [ ] Are all dependencies free of known vulnerabilities?

### 9.2 Common Security Issues by Project Type

| Project Type | Common Issue |
|--------------|--------------|
| CLI Agent | Command injection via tool inputs |
| Provider | API key in error messages |
| Code Generator | Path traversal in file output |
| TUI | No issues typically |
| HTTP API | Injection, auth bypass, rate limiting |
| Package/Library | Supply chain, prototype pollution |

### 9.3 Security Response Protocol

| Severity | Response | SLA |
|----------|----------|-----|
| Critical (CVE-9.0+) | Block merge, notify security lead | Immediate |
| High (CVE-7.0-8.9) | Block merge, fix required | 24 hours |
| Medium (CVE-4.0-6.9) | Fix before next release | 1 week |
| Low (CVE-0.1-3.9) | Track as technical debt | Next milestone |

---

## 10. Performance Review

### 10.1 Performance Checklist

- [ ] No synchronous I/O in hot paths?
- [ ] No O(n²) algorithms that could be optimized?
- [ ] Are streams used for large data?
- [ ] Are timeouts present for network calls?
- [ ] No memory leaks (unbounded caches, listeners)?
- [ ] Are async operations properly awaited?
- [ ] Is backpressure considered in stream processing?
- [ ] Are expensive computations memoized or lazy?

### 10.2 Performance Red Flags

| Pattern | Risk |
|---------|------|
| `fs.readFileSync` in request handler | Blocks event loop |
| `for` loop inside `for` loop | Quadratic complexity |
| `new Map()` without size limit | Memory leak |
| No `AbortController` on fetch | May hang forever |
| `JSON.parse`/`JSON.stringify` on large payloads | CPU spike |
| `Array.concat` in loop | O(n²) per iteration |
| Unbounded `setInterval` | Event drift, memory leak |
| Promise.all on 10k items | Connection storm |

### 10.3 Performance Budget Guidelines

| Operation | Budget |
|-----------|--------|
| CLI startup time | <100ms |
| API response (p99) | <500ms |
| File generation (1000 lines) | <200ms |
| Model inference call | <30s |
| Test suite | <60s |
| Memory (steady state) | <200MB |

---

## 11. Testing Review

### 11.1 Test Quality Checklist

- [ ] Tests are deterministic (no flakiness)?
- [ ] Tests cover the stated change?
- [ ] Edge cases are tested?
- [ ] Tests are readable?
- [ ] Tests follow existing test patterns?
- [ ] No test interdependency?
- [ ] Are mocks verifying behavior, not implementation?

### 11.2 What Tests Should Cover

| Test Type | Coverage |
|-----------|----------|
| Happy path | Normal input works |
| Edge cases | Empty, null, invalid input |
| Error handling | Expected errors |
| Regression | Bug fixed doesn't reappear |
| Integration | Works with real dependencies |
| Property-based | Random inputs produce correct output |
| Snapshot | Output doesn't change unexpectedly |

### 11.3 Test Coverage Thresholds

| Metric | Target | Warning | Failing |
|--------|--------|---------|---------|
| Line coverage | >80% | <70% | <50% |
| Branch coverage | >75% | <60% | <40% |
| Function coverage | >90% | <80% | <60% |
| New code coverage | >90% | <80% | <50% |

---

## 12. Documentation Review

### 12.1 Documentation Checklist

- [ ] JSDoc/TSDoc on new public functions?
- [ ] README updated if user-facing change?
- [ ] CHANGELOG entry or PR description sufficient?
- [ ] Configuration documented?
- [ ] Breaking changes clearly communicated?
- [ ] Code examples in documentation are runnable?
- [ ] Are error messages documented?

### 12.2 Documentation Standards by Component Type

| Component | Required Docs |
|-----------|---------------|
| Public API function | TSDoc with params, returns, example |
| CLI command | --help output, README section |
| Config option | Default, allowed values, behavior |
| Provider class | Supported models, env vars, setup |
| Error type | When thrown, what it means, how to handle |
| Breaking change | Migration guide, deprecation period |

---

## 13. Cross-Project Review Patterns

### 13.1 What's Universal

| Review Point | Applies To |
|--------------|------------|
| Backward compatibility | All projects |
| Additive changes | All projects |
| Test coverage | All projects |
| Error handling | All projects |
| Cross-platform | All projects |

### 13.2 What's Project-Specific

| Project | Special Review Focus |
|---------|---------------------|
| OpenCode | Effect-TS patterns, skill system |
| OpenClaude | Provider-agnostic, 200+ models |
| Kilo Code | Generation quality, token usage |
| Gemini CLI | Sandbox modes (docker/podman/local) |
| Hermes Agents | Tool interface, agent loop |

### 13.3 OpenCode-Specific Patterns

#### Effect-TS Pipe Composition

```typescript
// BAD — nested calls, hard to read
Effect.runPromise(Effect.map(Effect.flatMap(getUser, validateUser), formatResponse));

// GOOD — piped, linear, readable
pipe(
  getUser,
  Effect.flatMap(validateUser),
  Effect.map(formatResponse),
  Effect.runPromise
);
```

#### Skill System Correctness

```typescript
// Check: All skills implement the Skill interface
interface Skill {
  name: string;
  description: string;
  execute(params: unknown): Effect<SkillEnv, SkillError, SkillResult>;
}

// Check: Skills are registered in the skill registry
// Check: Skill errors are typed and documented
// Check: Skills are sandboxed (no access to host system)
```

#### Provider Abstraction Check

```typescript
// All providers must implement the Provider interface
interface Provider {
  name: string;
  models(): Effect<never, never, Model[]>;
  complete(request: CompletionRequest): Effect<ProviderEnv, ProviderError, CompletionResponse>;
  stream?(request: CompletionRequest): Stream<ProviderEnv, ProviderError, Chunk>;
}

// Check: No provider-specific types leak into public API
// Check: Streaming is optional but consistent if implemented
// Check: Error mapping is consistent across providers
```

### 13.4 OpenClaude-Specific Patterns

#### Provider-Agnostic Architecture

```typescript
// BAD — provider-specific branching
function formatRequest(provider: string, req: Request) {
  if (provider === 'openai') return formatOpenAI(req);
  if (provider === 'anthropic') return formatAnthropic(req);
  if (provider === 'google') return formatGoogle(req);
}

// GOOD — provider implements transform
class OpenAIProvider implements Provider {
  transformRequest(req: Request): ProviderRequest { /* ... */ }
}
class AnthropicProvider implements Provider {
  transformRequest(req: Request): ProviderRequest { /* ... */ }
}
```

#### Model Compatibility Verification

```typescript
// Check: Model metadata includes:
interface ModelInfo {
  id: string;
  provider: string;
  capabilities: {
    streaming: boolean;
    functionCalling: boolean;
    vision: boolean;
    maxTokens: number;
    pricing: { input: number; output: number; };
  };
}

// Check: All 200+ models have verified metadata entries
// Check: Feature detection before capability usage
// Check: Graceful degradation when model lacks capability
```

#### Streaming Correctness

```typescript
// Check: Stream is properly typed
function stream(request: Request): Stream<ProviderEnv, StreamError, Chunk>;

// Check: Stream handles:
// - Backpressure from consumer
// - Cancellation (AbortSignal)
// - Reconnection (retry logic)
// - Partial chunks (buffering)
// - End-of-stream signaling

// Check: No memory leak from unclosed streams
```

### 13.5 Kilo Code-Specific Patterns

#### Code Generation Quality

```typescript
// Check: Generated code matches project style
// Check: Generated imports are correct
// Check: Generated types are valid TypeScript
// Check: Generated code compiles without errors
// Check: Generated code passes lint rules

// Check: Templates are:
// - Versioned (breaking changes tracked)
// - Tested (template output verified)
// - Documented (what each template generates)
```

#### Token Efficiency

```typescript
// Check: Template size is optimized
// Check: No redundant whitespace or comments in generated output
// Check: Token counting is accurate for the target model
// Check: Long outputs use streaming to reduce perceived latency

// Token budget:
// - System prompt: < 2000 tokens
// - Per-file template: < 500 tokens
// - Generation context: < model max * 0.7
```

#### Prompt Injection Review

```typescript
// Check: User input is not interpolated into system prompts
// Check: User input is isolated to user message role
// Check: Delimiters are used for user content
// Check: Escape sequences are handled

// BAD — injection possible
const prompt = `You are a helpful assistant. ${userInput}`;

// GOOD — roles isolate input
const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: userInput }
];
```

### 13.6 Gemini CLI-Specific Patterns

#### Sandbox Isolation Review

```typescript
// Check: Docker/podman containers:
// - No --privileged flag
// - Read-only root filesystem
// - Dropped capabilities (--cap-drop ALL)
// - Network restricted (--network none where possible)
// - Memory/cpu limits set
// - No host volume mounts without explicit user opt-in

// Check: Local mode:
// - Writes isolated to project directory
// - No system file modification
// - Temp files cleaned up on exit
```

#### Container Security Checklist

```
[ ] Container runs as non-root user
[ ] No host network mode
[ ] Filesystem is read-only except designated volumes
[ ] Resource limits (memory, CPU, disk)
[ ] No dangerous capabilities (SYS_ADMIN, NET_ADMIN)
[ ] Seccomp profile applied
[ ] AppArmor/SELinux if available
[ ] Container image is minimal (alpine, distroless)
[ ] Image is regularly scanned for CVEs
```

### 13.7 Hermes Agents-Specific Patterns

#### Agent Loop Review

```typescript
interface AgentLoop {
  run(task: Task): Stream<AgentEnv, AgentError, AgentEvent>;

  // Check: Loop termination conditions:
  // - Max iterations
  // - Timeout
  // - Task completion signal
  // - Error threshold exceeded

  // Check: State management:
  // - No mutable shared state
  // - State is serializable (for persistence)
  // - State transitions are logged

  // Check: Tool execution:
  // - Tool errors don't crash the agent
  // - Tool timeouts are enforced
  // - Tool results are validated
}
```

#### Tool Interface Contract

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute(params: unknown, context: ToolContext): Effect<ToolEnv, ToolError, ToolResult>;
}

// Check: Tool errors are typed not generic
// Check: Tool parameters have JSON Schema validation
// Check: Tool execution respects timeout from ToolContext
// Check: Tool is idempotent where documented
// Check: Tool side effects are documented
```

#### Memory Management

```typescript
// Check: Conversation window management:
// - Sliding window with token budget
// - Summary generation for evicted content
// - No unbounded memory growth

// Check: Persistence:
// - Sessions are recoverable
// - State serialization is versioned
// - Migration path for old state format
```

---

## 14. Common Review Findings

### 14.1 Most Frequent Issues

| Issue | Frequency | Fix |
|-------|-----------|-----|
| Missing null check | Very common | `?.` or `??` |
| Empty catch block | Common | Add logging |
| Missing timeout | Common | Add timeout |
| No tests | Common | Add tests |
| Hardcoded values | Common | Make configurable |
| Console.log | Common | Use proper logger |

### 14.2 Expanded Findings with Examples

#### Null/Undefined Not Handled

```typescript
// BAD — crashes if config is undefined
const apiKey = config.apiKey;

// BAD — only checks null, not undefined
if (config.apiKey !== null) { /* ... */ }

// GOOD — handles both null and undefined
const apiKey = config?.apiKey ?? '';
if (!config?.apiKey) { /* handle missing */ }
```

#### Promise Not Awaited

```typescript
// BAD — fire and forget, error silently swallowed
saveData(items);

// BAD — promise in array, not awaited
const results = items.map(item => processItem(item));

// GOOD — properly awaited
await saveData(items);
const results = await Promise.all(items.map(item => processItem(item)));
```

#### Array Mutation While Iterating

```typescript
// BAD — mutating array while iterating
for (const item of items) {
  if (item.shouldRemove) items.splice(i, 1);
}

// GOOD — filter creates new array
items = items.filter(item => !item.shouldRemove);
```

#### Incorrect Error Typing

```typescript
// BAD — catches everything as unknown, does nothing
try {
  await riskyOperation();
} catch (e) {
  // empty
}

// GOOD — typed error handling
try {
  await riskyOperation();
} catch (e) {
  if (e instanceof NetworkError) {
    logger.error('Network failure', { error: e });
    return fallback();
  }
  throw e; // rethrow unexpected errors
}
```

#### Magic Numbers

```typescript
// BAD — what is 30000?
setTimeout(callback, 30000);

// BAD — what is 0.15?
const fee = amount * 0.15;

// GOOD — named constants
const TIMEOUT_MS = 30_000;
const FEE_RATE = 0.15;
setTimeout(callback, TIMEOUT_MS);
const fee = amount * FEE_RATE;
```

#### Deep Nesting / Arrow Anti-Pattern

```typescript
// BAD — callback hell
fetchData(url)
  .then(res => res.json())
  .then(data => {
    process(data, (result) => {
      save(result, (saved) => {
        console.log(saved);
      });
    });
  });

// GOOD — async/await flattens
const res = await fetchData(url);
const data = await res.json();
const result = await process(data);
const saved = await save(result);
console.log(saved);
```

#### Race Condition — Shared State

```typescript
// BAD — two concurrent operations on shared state
let counter = 0;

async function increment() {
  const current = counter; // read
  await someAsyncWork();
  counter = current + 1; // write — may overwrite other's increment
}

// GOOD — atomic operation
const counter = new Atomic(0);
async function increment() {
  await counter.update(c => c + 1);
}
```

#### Incorrect Comparison

```typescript
// BAD — type-coercing equality
if (val == true) { /* ... */ }
if (items.length == 0) { /* ... */ }

// GOOD — strict equality
if (val === true) { /* ... */ }
if (items.length === 0) { /* ... */ }
```

#### Unhandled Rejection

```typescript
// BAD — promise rejection not handled
somePromise.catch(e => { /* ignored */ });

// BAD — missing await in async context
async function process() {
  someAsyncTask(); // forgotten await
}

// GOOD — always handle or await promises
async function process() {
  await someAsyncTask();
}
```

#### Mutating Function Parameters

```typescript
// BAD — mutates the input
function processItems(items: Item[]) {
  for (const item of items) {
    item.processed = true; // mutates original array's objects
  }
  return items;
}

// GOOD — returns new data without mutation
function processItems(items: readonly Item[]): ProcessedItem[] {
  return items.map(item => ({ ...item, processed: true }));
}
```

#### Unnecessary Enum

```typescript
// BAD — numeric enum with magic values
enum Status { Active = 1, Inactive = 0, Pending = 2 }

// GOOD — union type with string values
type Status = 'active' | 'inactive' | 'pending';

// GOOD — const object when you need runtime values
const Status = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
} as const;
```

### 14.2 Response Templates

```markdown
**Issue:** This will crash when [condition].
**Fix:** Add a guard clause: `if (!value) return`

**Suggestion:** Consider using [pattern] for consistency with the rest of the codebase.

**Question:** What happens when [edge case]? Should we handle it here?

**Praise:** Nice work on [specific thing]. The [pattern] approach works well here.
```

---

## 15. Review Escalation

### 15.1 When to Escalate

| Situation | Action |
|-----------|--------|
| Security vulnerability | Request security review, block merge |
| Architecture concern | Request second reviewer |
| Complex change | Request domain expert review |
| Disagreement | Seek third opinion |

### 15.2 Escalation Flow

```
Reviewer identifies issue
  ├── Can resolve with author? → Discuss and resolve
  ├── Need domain expert? → Tag expert, request review
  ├── Security issue? → Tag security team, block merge
  └── Architecture disagreement? → Tag tech lead for tiebreak

When escalation resolves:
  → Document decision in PR comments
  → Proceed with remaining review
```

---

## 16. Approving vs Requesting Changes

### 16.1 Approve When

- Code is correct and safe
- Tests are present and passing
- No blocking issues
- Quality is acceptable (not perfect)
- All review comments are resolved or explicitly deferred
- Author has responded to all questions

### 16.2 Request Changes When

- There's a security issue
- There's a logic error
- Tests are missing
- There's a breaking change without migration
- The PR is clearly wrong
- There are unresolved blocking issues from quality gates

### 16.3 Conditional Approval

Sometimes you want to approve but note improvements for follow-up:

```markdown
Approving this PR for the core feature — it's correct and well-tested.
I've left some non-blocking suggestions (see nits above) that could be
addressed in a follow-up PR. Good work!
```

---

## 17. Review Anti-Patterns

```
🚫 BIKE-SHEDDING — Debating trivial formatting for hours
🚫 GATEKEEPING — Blocking perfect code for minor style
🚫 SEAGULL REVIEW — Fly in, drop criticism, fly out
🚫 GHOST REVIEW — Approve without reading
🚫 NITPICK OVERLOAD — 50 comments on 100-line PR
🚫 "LGTM" ONLY — No engagement with the code
🚫 PERFECTION TRAP — Demanding refactors in every PR
🚫 AUTHORITY PUSH — "Do it my way because I said so"
🚫 SCOPE CREEP — Adding requirements beyond the PR's purpose
🚫 PASSIVE AGGRESSIVE — "As I mentioned in the last review..."
🚫 RUBBER STAMPING — Approving familiar authors without reviewing
🚫 DRIVE-BY COMMENTING — Single comment with no follow-up engagement
```

---

## 18. Post-Review Responsibilities

- [ ] Respond to author's questions promptly
- [ ] Re-review after changes within 24 hours
- [ ] Approve when satisfied
- [ ] Merge (or author merges when approved)
- [ ] Update the PR with a summary of review decisions
- [ ] Follow up on deferred issues (create GitHub issues)
- [ ] Thank the author for their contribution

---

## 19. Checklist Reference

### Quick Pre-Review Scan (5 minutes)

- [ ] PR size reasonable? (< 500 lines)
- [ ] No obvious security issues?
- [ ] Tests included?
- [ ] No console.log?
- [ ] No commented-out code?
- [ ] Follows existing patterns?
- [ ] No `.only` in test files?
- [ ] Description explains the change?

### Deep Review (30+ minutes)

- [ ] All checkboxes from Quick Scan
- [ ] Logic correctness verified
- [ ] Edge case handling present
- [ ] Error handling present
- [ ] Cross-platform compatibility
- [ ] Backward compatibility
- [ ] Performance considered
- [ ] Effect-TS patterns correct (if applicable)
- [ ] TypeScript types correct and complete
- [ ] No race conditions
- [ ] No memory leaks
- [ ] API design reviewed (naming, params, returns)
- [ ] Error messages user-friendly
- [ ] Documentation updated
- [ ] CHANGELOG or release notes considered

---

## 20. Review by Project Type

### 20.1 OpenCode Review

#### Effect-TS Pattern Review

OpenCode is built on Effect-TS. All PRs must follow Effect-TS idioms.

```typescript
// Check: Effect composition uses pipe, not nested calls
// BAD
Effect.runPromise(Effect.map(Effect.flatMap(fetchUser, validate), format));

// GOOD
pipe(
  fetchUser,
  Effect.flatMap(validate),
  Effect.map(format),
  Effect.runPromise
);

// Check: Error types are tagged or use Cause
type UserError = Tagged<'UserNotFound', { id: string }>
  | Tagged<'DatabaseError', { cause: unknown }>;

// Check: Resources use Scope for safe cleanup
pipe(
  openFile(path),
  Effect.zip(acquireLock(lockId)),
  Effect.flatMap(([file, lock]) => processFile(file)),
  Effect.scoped // ensures cleanup
);
```

#### Pipe Composition Review

| Pattern | Should Use |
|---------|------------|
| Sequential operations | `pipe` |
| Try/catch | `Effect.catchAll` / `Effect.catchTag` |
| Resource management | `Effect.acquireRelease` + `Effect.scoped` |
| Dependency injection | `Effect.service` / `Layer` |
| State management | `Ref` / `MutableRef` |
| Concurrency | `Effect.forEach` with `{ concurrency }` |
| Timing/sleep | `Effect.sleep` + `Effect.timeout` |

```typescript
// Check: No mix of Effect and imperative patterns
// BAD — mixing styles
const result = await Effect.runPromise(
  pipe(data, Effect.map(process))
);
if (result.isError) { /* ... */ }

// GOOD — all in Effect
pipe(
  data,
  Effect.map(process),
  Effect.flatMap(handleResult),
  Effect.catchAll(handleError),
  Effect.runPromise
);
```

#### Skill System Correctness

```typescript
// Check: Skill registration
interface SkillDefinition {
  name: string;
  description: string;
  version: string;
  execute(params: SkillParams): Effect<SkillEnv, SkillError, SkillResult>;
}

// Check: Skills are:
// - Stateless (state comes from SkillEnv)
// - Sandboxed (no access outside SkillEnv)
// - Versioned (breaking changes increment version)
// - Tested (each skill has unit tests)
// - Documented (params and return documented)

// Check: Skill discovery
// - All skills registered in SkillRegistry
// - Skill names are unique
// - Skill descriptions are useful for LLM selection
```

### 20.2 OpenClaude Review

#### Provider Abstraction Review

```typescript
// Check: Provider interface is stable
interface AIProvider {
  readonly name: string;
  readonly models: Model[];
  complete(req: CompleteRequest): Effect<ProviderCtx, ProviderError, CompleteResponse>;
  stream?(req: StreamRequest): Stream<ProviderCtx, StreamError, Token>;
}

// Check: Provider implementation:
// - No provider-specific types in public interface
// - Error mapping is consistent (map to ProviderError)
// - Streaming is implemented correctly if declared
// - Rate limiting is handled (retry, backoff)
// - Token counting is accurate

// Check: Model metadata
interface ModelMetadata {
  id: string;
  provider: string;
  contextWindow: number;
  maxOutput: number;
  supportsStreaming: boolean;
  supportsFunctions: boolean;
  supportsVision: boolean;
  inputCostPer1k: number;
  outputCostPer1k: number;
}
```

#### 200+ Model Compatibility

```typescript
// Check: All models have entries in model registry
// Check: Model features are correctly advertised
// Check: Graceful degradation:
//   - If model doesn't support vision, error is clear
//   - If model doesn't support function calling, fallback
// Check: Model aliases resolve correctly
// Check: Model deprecation is communicated
```

#### Streaming Correctness

```typescript
// Check: Stream lifecycle
const stream = provider.stream(request);

// Check: Must handle:
// - Connection errors (reconnect or fail)
// - Partial token chunks (aggregate correctly)
// - Cancellation (AbortSignal from caller)
// - Backpressure (consumer signal)
// - End-of-stream (proper completion)
// - Error in stream (error event, not crash)

// Check: No memory leak
// - Stream is finalized on complete
// - Event listeners removed
// - Resources released
```

### 20.3 Kilo Code Review

#### Code Generation Quality

```typescript
// Check: Generated output:
// - Syntax is valid (runs through typescript compiler)
// - Follows project style (imports, naming, formatting)
// - Imports are correct and complete
// - No hallucinated APIs or types
// - Handles the requested use case

// Check: Template quality:
// - Templates are type-safe (typed parameters)
// - Templates have tests (expected output verified)
// - Templates are versioned
// - Template breaking changes are documented

// Check: Error recovery:
// - If generation is truncated, output is still valid
// - If generation fails, error is user-friendly
```

#### Token Efficiency

```typescript
// Check: Prompt engineering:
// - System prompt is concise
// - Few-shot examples are minimal
// - Context includes only relevant information
// - No redundant instructions

// Check: Output format:
// - Minimum whitespace
// - No unnecessary comments
// - Efficient structure (arrays vs objects)
// - Appropriate line length

// Token budget enforcement
const TOKEN_LIMITS = {
  systemPrompt: 2000,
  userContext: 4000,
  fewShot: 1000,
  output: 4000,
};
```

#### Prompt Injection Review

```typescript
// Check: User input isolation
// BAD — injection possible
const messages = [{
  role: 'user',
  content: `Write code for: ${userInput}`
}];

// GOOD — use assistant role for constraints
const messages = [
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: userInput },
];

// Check: No user input in system prompt
// Check: Delimiters for user content
// Check: Output validation before execution
// Check: Sandbox execution of generated code
```

### 20.4 Gemini CLI Review

#### Sandbox Isolation Review

```typescript
// Check: Docker mode
const dockerConfig = {
  image: 'node:20-alpine',
  readOnly: true,
  network: 'none',
  memory: '512m',
  cpu: '1.0',
  capabilities: [], // all dropped
  user: 'node', // non-root
  tmpfs: '/tmp', // ephemeral temp
};

// Check: Podman mode (rootless)
// - Verify rootless execution
// - Verify user namespace mapping
// - Verify volume permissions

// Check: Local mode
// - Verify writes are within project directory
// - Verify no system file writes
// - Verify temp cleanup
```

#### Local Mode Safety

```typescript
// Check: Path validation
// BAD — allows path traversal
const outputPath = path.join('./output', userFilename);

// GOOD — restricts to allowed directories
const safeDir = path.resolve('./output');
const fullPath = path.resolve(path.join(safeDir, userFilename));
if (!fullPath.startsWith(safeDir)) {
  throw new Error('Path traversal detected');
}

// Check: Shell execution safety
// BAD — command injection
exec(`npm install ${packageName}`);

// GOOD — parameterized
exec('npm install', [packageName]);
```

### 20.5 Hermes Agents Review

#### Agent Loop Review

```typescript
interface AgentConfig {
  maxIterations: number;      // must be bounded
  timeoutMs: number;          // must be set
  maxToolErrors: number;      // must be bounded
  model: string;              // must exist in registry
  tools: Tool[];              // must be validated
}

// Check: Loop invariants
// - Agent state is serializable
// - Agent can be interrupted and resumed
// - Loop termination is guaranteed
// - Error in one iteration doesn't corrupt state
// - Tool outputs are validated before use
```

#### Tool Interface Contract

```typescript
interface ToolSchema {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, JSONSchema>;
    required: string[];
  };
}

// Check: Every tool has:
// - Clear description (LLM can decide when to use)
// - All parameters documented with types
// - Required vs optional clearly marked
// - Error states documented
// - Side effects documented

// Check: Tool execution:
// - Timeout enforcement
// - Error recovery (tool error != agent crash)
// - Result validation
// - Idempotency where declared
```

#### Memory Management

```typescript
interface AgentMemory {
  type: 'buffer' | 'summary' | 'vector';
  config: {
    maxTokens: number;
    ttl?: number;
    persist?: boolean;
  };
}

// Check: Buffer memory:
// - Sliding window with token limit
// - Old messages summarized, not dropped
// - Summary preserved across sessions

// Check: Vector memory:
// - Embeddings stored with metadata
// - Search returns relevant context
// - Stale entries expired

// Check: No unbounded growth
// - Memory has configurable limits
// - Limits are enforced
// - Persistence is bounded
```

---

## 21. Security Review Deep Dive

### 21.1 Injection Attacks

#### Command Injection

```typescript
// BAD — shell interpolation
exec(`grep "${searchTerm}" file.txt`);

// GOOD — parameterized or escaped
exec('grep', [searchTerm, 'file.txt']);  // parameterized
exec(`grep ${escapeShell(searchTerm)} file.txt`); // escaped

// BAD — building commands with user input
spawn('sh', ['-c', `curl ${url}`]);

// GOOD — avoid shell entirely
spawn('curl', [url]);

// Check: All exec/spawn calls
// Check: All template literals in shell commands
// Check: All file path constructions from user input
// Check: All SQL/NoSQL query constructions
```

#### Path Traversal

```typescript
// BAD — direct user input in path
const content = fs.readFileSync(`./data/${userInput}`);

// GOOD — validate and restrict
const safePath = path.resolve('./data', userInput);
if (!safePath.startsWith(path.resolve('./data'))) {
  throw new Error('Invalid path');
}

// Check: All file read/write operations
// Check: All archive extraction (zip slip)
// Check: All template/file loading with user-controlled names
```

#### Prototype Pollution

```typescript
// BAD — unsafe merge
function merge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    target[key] = source[key]; // can set __proto__
  }
}

// GOOD — safe merge (no __proto__)
function safeMerge(target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const key of Object.keys(source)) {
    if (key === '__proto__' || key === 'constructor') continue;
    target[key] = source[key];
  }
}

// Check: All object merge/assign operations
// Check: All JSON.parse followed by spread
// Check: All deep clone utilities
```

#### SQL/NoSQL Injection

```typescript
// BAD — string interpolation
db.query(`SELECT * FROM users WHERE id = '${userId}'`);

// GOOD — parameterized
db.query('SELECT * FROM users WHERE id = ?', [userId]);

// Check: All database queries
// Check: All aggregations with user input
// Check: ORM usage is safe (no raw queries)
```

### 21.2 Secret Handling

#### API Key Exposure

```typescript
// BAD — key in error message
try {
  await api.call(apiKey, data);
} catch (e) {
  console.error('API call failed with key', apiKey); // LEAK
}

// GOOD — key redacted in logs
console.error('API call failed', { keySuffix: apiKey.slice(-4) });

// Check: No secrets in:
// - console.log / console.error
// - Error messages exposed to user
// - HTTP responses
// - File outputs
// - Git history (committed files)
```

#### Token Leakage in Logs

```typescript
// Check: Logger configuration filters sensitive fields
const logger = pino({
  redact: ['req.headers.authorization', 'apiKey', '*.token'],
});

// Check: No manual stringification of request objects
// Check: No logging of full environment
// Check: Stack traces don't include secret values in closure scope
```

#### Env Var Safety

```typescript
// Check: Env vars are accessed through typed config
// BAD — direct access
const key = process.env.API_KEY;

// GOOD — typed config with validation
const config = z.object({
  apiKey: z.string().min(1),
  endpoint: z.string().url(),
}).parse(process.env);

// Check: Env vars are not logged
// Check: Env vars with sensitive defaults are detected
// Check: .env.example doesn't contain real secrets
```

### 21.3 Authentication/Authorization

#### Broken Access Control

```typescript
// BAD — no auth check
app.get('/api/admin/users', (req, res) => {
  return res.json(users);
});

// GOOD — auth middleware
app.get('/api/admin/users', authenticate, authorize('admin'), (req, res) => {
  return res.json(users);
});

// Check: All admin/sensitive endpoints have auth
// Check: Auth middleware is applied, not just mentioned
// Check: Role checks are consistent
```

#### Privilege Escalation

```typescript
// BAD — user can elevate privileges
async function updateUser(id: string, updates: Partial<User>) {
  return db.users.update(id, updates); // can set role: 'admin'
}

// GOOD — whitelist allowed fields
const ALLOWED_UPDATES = ['name', 'email', 'avatarUrl'] as const;
async function updateUser(id: string, updates: Partial<User>) {
  const safe: Record<string, unknown> = {};
  for (const key of ALLOWED_UPDATES) {
    if (key in updates) safe[key] = updates[key];
  }
  return db.users.update(id, safe);
}

// Check: All update operations
// Check: All create operations (can user create admin?)
// Check: All delete operations (can user delete other's data?)
```

### 21.4 Supply Chain

#### Dependency Review

```typescript
// Check: New dependencies are:
// - Actively maintained (recent commits, releases)
// - Popular enough (npm downloads, GitHub stars)
// - Have no known CVEs
// - Have permissive license (MIT, Apache-2.0)
// - Are type-safe (has @types or built-in types)
// - Don't duplicate existing functionality
```

#### Lockfile Audit

```typescript
// Check: lockfile is consistent with package.json
// Check: No unexpected dependency additions
// Check: Run `npm audit` or `pnpm audit`
// Check: Run `npm outdated` for major version drift
// Check: Sub-dependencies are reviewed for critical vulns

// Commands to run during review
// npm audit --production
// npm ls <suspicious-package>
// npx better-npm-audit audit
```

#### Known Vulnerability Check

| Tool | When | Purpose |
|------|------|---------|
| `npm audit` | Every install | Known CVE check |
| `snyk test` | CI pipeline | Deep dependency tree |
| `dependabot` | Daily | Automated PR for vuln fixes |
| `socket.dev` | PR review | Risk score for new deps |
| `osv-scanner` | CI | Open source vulnerability DB |

---

## 22. Performance Review Deep Dive

### 22.1 Async Patterns

#### Blocking I/O Detection

```typescript
// BLOCKING — never use in CLI/library code
const data = fs.readFileSync('file.txt');
const json = JSON.parse(data); // also blocking for large files

// NON-BLOCKING
const data = await fs.promises.readFile('file.txt');
const json = JSON.parse(data.toString()); // still blocking for huge files

// STREAMING (preferred for large data)
const results: string[] = [];
const rl = readline.createInterface({
  input: fs.createReadStream('large-file.txt'),
});
for await (const line of rl) {
  results.push(processLine(line));
}

// Check: No fs.readFileSync, fs.writeFileSync, child_process.execSync
// Check: No crypto.randomBytes sync
// Check: No zlib sync methods
```

#### Promise Handling

```typescript
// BAD — unhandled rejection
async function process(items: string[]) {
  items.forEach(item => {
    processItem(item); // promise not awaited
  });
}

// BAD — sequential when parallel works
for (const item of items) {
  await processItem(item); // waits for each
}

// GOOD — parallel with concurrency limit
await Effect.forEach(items, processItem, { concurrency: 5 });

// Check: All promises are awaited or returned
// Check: forEach/map with async callbacks
// Check: Promise.all vs Promise.allSettled distinction
```

#### Event Loop Starvation

```typescript
// BAD — CPU-bound loop blocks event loop
function computeMany(items: number[]): number[] {
  return items.map(expensiveComputation);
}

// GOOD — yield to event loop periodically
async function computeMany(items: number[]): Promise<number[]> {
  const results: number[] = [];
  for (let i = 0; i < items.length; i++) {
    results.push(expensiveComputation(items[i]));
    if (i % 100 === 0) await new Promise(r => setImmediate(r));
  }
  return results;
}

// GOOD — offload to worker thread
import { Worker } from 'worker_threads';
// Check: Long synchronous loops
// Check: Heavy computation on main thread
// Check: JSON serialization of large objects
```

### 22.2 Memory

#### Leak Patterns

```typescript
// LEAK — unregistered listener
class EventBus {
  private listeners = new Map<string, Function[]>();

  on(event: string, cb: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(cb); // never removed!
  }
}

// FIX — return unsubscribe function
on(event: string, cb: Function): () => void {
  // ... add listener
  return () => {
    const cbs = this.listeners.get(event);
    if (cbs) this.listeners.set(event, cbs.filter(c => c !== cb));
  };
}

// Check: All addEventListener/on/register calls have cleanup
// Check: All setInterval has clearInterval
// Check: All setTimeout is bounded
// Check: All closures don't capture large objects
```

#### Unbounded Growth

```typescript
// LEAK — cache without eviction
const cache = new Map<string, Result>();

function getCached(key: string): Result | undefined {
  return cache.get(key); // keeps growing forever
}

// FIX — bounded cache with TTL
import { LRUCache } from 'lru-cache';
const cache = new LRUCache<string, Result>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// Check: All Map/Set usage has size limits
// Check: All arrays that accumulate data have bounds
// Check: All caches have eviction policy
```

#### Circular References

```typescript
// BAD — circular reference causes memory leak or JSON.stringify error
class Node {
  parent?: Node;
  children: Node[] = [];
  addChild(child: Node) {
    this.children.push(child);
    child.parent = this; // circular!
  }
}

// GOOD — weak reference for parent
class Node {
  parent?: WeakRef<Node>;
  children: Node[] = [];
  addChild(child: Node) {
    this.children.push(child);
    child.parent = new WeakRef(this);
  }
}

// Check: All parent/child or owner/owned patterns
// Check: All event emitter patterns
// Check: All observer/subscriber patterns
```

#### Closure Traps

```typescript
// LEAK — closure captures large variable
function createHandler(items: LargeItem[]) {
  // closure captures entire items array
  return function handler(event: Event) {
    // only needs event, not items
    processEvent(event);
  };
}

// FIX — only capture what's needed
function createHandler(items: LargeItem[]) {
  const count = items.length; // capture only what's needed
  return function handler(event: Event) {
    processEvent(event);
    console.log(`Processed ${count} items`);
  };
}

// Check: Closures don't capture large arrays/objects
// Check: Callbacks don't close over heavy state
// Check: React hooks don't have stale closures
```

### 22.3 Algorithm Complexity

#### O(n²) Detection

```typescript
// BAD — nested loops
function findDuplicates(items: string[]): string[] {
  const duplicates: string[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j] && !duplicates.includes(items[i])) {
        duplicates.push(items[i]); // O(n²) for includes too!
      }
    }
  }
  return duplicates;
}

// GOOD — use Set for O(n)
function findDuplicates(items: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const item of items) {
    if (seen.has(item)) duplicates.add(item);
    else seen.add(item);
  }
  return [...duplicates];
}

// Check: Nested for loops
// Check: Array.includes inside loops
// Check: Array.indexOf inside loops
// Check: Array.splice in loops (shifts elements)
// Check: String concatenation in loops
```

#### Early Termination

```typescript
// BAD — no early exit
function findUser(users: User[], id: string): User | undefined {
  let result: User | undefined;
  for (const user of users) {
    if (user.id === id) {
      result = user; // continues looping after found!
    }
  }
  return result;
}

// GOOD — early return
function findUser(users: User[], id: string): User | undefined {
  for (const user of users) {
    if (user.id === id) return user;
  }
}

// Check: Loops that can early-terminate
// Check: Short-circuit evaluation used
// Check: Filter/map chains that can be combined
```

#### Short-Circuit Patterns

```typescript
// BAD — always evaluates both conditions
if (isActive(user) && user && user.role === 'admin') {
  // crashes if user is null — isActive called first
}

// GOOD — short-circuit order matters
if (user && isActive(user) && user.role === 'admin') {
  // user is checked first
}

// Check: Condition order (cheap/fast checks first)
// Check: Guard clauses before expensive operations
// Check: || fallback order (preferred default first)
```

### 22.4 Network

#### Connection Reuse

```typescript
// BAD — new connection per request
async function fetchData(url: string) {
  const res = await fetch(url); // new connection each time
  return res.json();
}

// GOOD — connection reuse
const httpClient = new HttpClient({
  baseUrl: 'https://api.example.com',
  keepAlive: true,
  maxSockets: 10,
});

async function fetchData(path: string) {
  return httpClient.get(path);
}

// Check: HTTP clients reuse connections
// Check: Database connection pools are configured
// Check: No new connections in hot loops
```

#### Retry Storms

```typescript
// BAD — retry storm
async function fetchWithRetry(url: string) {
  for (let i = 0; i < 5; i++) {
    try {
      return await fetch(url);
    } catch {
      // immediate retry — storm risk
    }
  }
}

// GOOD — exponential backoff with jitter
async function fetchWithRetry(url: string) {
  for (let i = 0; i < 5; i++) {
    try {
      return await fetch(url);
    } catch {
      const delay = Math.min(1000 * Math.pow(2, i), 30000);
      const jitter = Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay + jitter));
    }
  }
}

// Check: Retry has backoff + jitter
// Check: Retry count is bounded
// Check: Retry is circuit-broken on 4xx (non-retryable)
// Check: No cascading retries across services
```

#### Timeout Correctness

```typescript
// BAD — no timeout, may hang forever
const data = await fetch(url);

// BAD — timeout only covers connection, not response
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const data = await fetch(url, { signal: controller.signal });

// GOOD — timeout covers entire operation
const result = await pipe(
  effect,
  Effect.timeout(5000),
  Effect.runPromise
);

// Check: All network calls have timeouts
// Check: Timeout values are appropriate (not too short, not too long)
// Check: Timeout errors are handled gracefully
// Check: No timeout canceled resources that are still needed
```

#### Backpressure

```typescript
// BAD — no backpressure, memory grows unbounded
async function processStream(stream: Readable) {
  const results: any[] = [];
  for await (const chunk of stream) {
    const processed = await expensiveProcess(chunk);
    results.push(processed); // unbounded!
  }
  return results;
}

// GOOD — backpressure via transform stream
const result = await pipe(
  Stream.fromReadable(stream),
  Stream.map(expensiveProcess),
  Stream.runCollect
);

// Check: Stream consumers have backpressure
// Check: Message queue consumers have prefetch limits
// Check: File writers buffer with flush, not unbounded
```

---

## 23. Testing Review Deep Dive

### 23.1 Test Quality Metrics

#### Coverage Thresholds

```typescript
// Check: Line coverage >= 80%
// Check: Branch coverage >= 75%
// Check: New code coverage >= 90%
// Check: Function coverage >= 90%

// Tools:
// - vitest --coverage
// - jest --coverage
// - nyc
// - c8

// Coverage is a floor, not a target —
// 100% coverage with bad assertions is worthless
```

#### Assertion Quality

```typescript
// WEAK — doesn't verify anything meaningful
expect(result).toBeDefined();

// WEAK — too vague
expect(result).toEqual({});

// GOOD — specific assertions
expect(result).toEqual({
  id: expect.any(String),
  name: 'expected-name',
  items: expect.arrayContaining(['item1']),
  createdAt: expect.any(Date),
});

// GOOD — snapshot with context
expect(result).toMatchSnapshot('create-user-result');

// Check: No expect(true).toBe(true)
// Check: No expect(fn).not.toThrow() without verifying result
// Check: Assertions are on the output, not intermediate state
```

#### Test Isolation

```typescript
// BAD — shared mutable state between tests
let db: Database;

beforeAll(() => {
  db = new Database(); // shared across all tests
});

it('test 1', () => {
  db.insert({ id: 1 }); // affects test 2
});

// GOOD — fresh state per test
let db: Database;

beforeEach(() => {
  db = new Database(); // fresh for every test
});

// Check: No shared state between tests
// Check: beforeEach doesn't depend on previous test
// Check: Parallel test execution is safe
// Check: Test order doesn't affect results
```

### 23.2 Test Patterns

#### describe/it Structure

```typescript
// GOOD — clear hierarchy
describe('UserService', () => {
  describe('createUser', () => {
    it('creates a user with valid data', async () => { /* ... */ });
    it('rejects duplicate emails', async () => { /* ... */ });
    it('requires name field', async () => { /* ... */ });
    it('hashes password before saving', async () => { /* ... */ });
  });

  describe('findUser', () => {
    it('finds user by ID', async () => { /* ... */ });
    it('returns null for missing user', async () => { /* ... */ });
  });
});

// BAD — flat, no structure
it('creates a user', () => { /* ... */ });
it('finds a user', () => { /* ... */ });
it('handles errors', () => { /* ... */ });

// Check: describe groups by function/method
// Check: it names describe what + should + when
// Check: No test.test.ts (one test per file)
```

#### AAA Pattern (Arrange-Act-Assert)

```typescript
it('charges the correct amount for a subscription', async () => {
  // Arrange
  const user = await createTestUser({ plan: 'premium' });
  const expectedAmount = 1999;

  // Act
  const charge = await billingService.chargeSubscription(user.id);

  // Assert
  expect(charge.amount).toBe(expectedAmount);
  expect(charge.status).toBe('completed');
});

// Check: Clear separation between Arrange/Act/Assert
// Check: Act is a single line or block
// Check: Assert doesn't include logic
```

#### Fixture Management

```typescript
// BAD — inline fixtures everywhere
it('handles premium user', async () => {
  const user = {
    id: '123',
    name: 'Test',
    plan: 'premium',
    email: 'test@test.com',
    createdAt: new Date(),
  };
  // ...
});

// GOOD — factories
import { createUser } from '../test-utils/factories';

it('handles premium user', async () => {
  const user = await createUser({ plan: 'premium' });
  // ...
});

// Check: Large fixtures are extracted
// Check: Factory functions have sensible defaults
// Check: Overrides are explicit in test
```

### 23.3 Mock/Stub Review

#### Over-Mocking Detection

```typescript
// BAD — mocking everything, testing nothing real
jest.mock('../../database');
jest.mock('../../api');
jest.mock('../../auth');
jest.mock('../../logger');
jest.mock('../../cache');

// The test is testing mocks, not real code
// GOOD — mock at boundaries, test logic

// Integration tests for core logic
// Unit tests for isolated pure functions
// Mock only external I/O (network, filesystem, database)

// Check: What's being mocked? (should be boundaries)
// Check: Could this be an integration test instead?
// Check: Are mocks verifying behavior or implementation?
```

#### Brittle Mock Patterns

```typescript
// BRITTLE — mocks implementation, not behavior
jest.spyOn(userService, 'formatUser').mockReturnValue(formattedUser);
// If formatUser is renamed, test fails

// BETTER — mock at boundary
jest.spyOn(db, 'query').mockResolvedValue([user]);
// If query implementation changes, test still passes

// GOOD — use test doubles for external services
const fakeEmailService = {
  send: jest.fn().mockResolvedValue(true),
};

// Check: Mocks are at system boundaries (IO)
// Check: No mockImplementation for internal functions
// Check: Mock setup is close to the assertion (not in describe)
```

### 23.4 Integration vs Unit

#### Test Pyramid Adherence

```text
         /\
        /  \        Unit tests (70%)
       /    \       Fast, isolated, pure functions
      /______\
     /        \     Integration tests (20%)
    /          \    Service boundaries, database, API
   /____________\
  /              \  E2E tests (10%)
 /                \ Full system, critical paths only
/__________________\

// Check: Most tests are unit tests
// Check: Integration tests cover key boundaries
// Check: E2E tests cover only critical user journeys
// Check: No slow E2E tests where unit would work
```

---

## 24. Documentation Review Deep Dive

### 24.1 Public API Completeness

```typescript
// INCOMPLETE — no TSDoc
export function processData(input: string): Result;

// COMPLETE — full TSDoc
/**
 * Processes input data and returns a structured result.
 *
 * @param input - Raw data string. Must be valid JSON.
 * @returns A Result object with parsed and validated data.
 * @throws {ValidationError} If input is not valid JSON.
 * @throws {ProcessingError} If data processing fails.
 *
 * @example
 * ```typescript
 * const result = processData('{"name": "test"}');
 * console.log(result.name); // 'test'
 * ```
 */
export function processData(input: string): Result;

// Check: Every exported function has TSDoc
// Check: Every public type/interface is documented
// Check: Every error type has documentation
// Check: Every config option is documented
```

### 24.2 Config Options Documentation

```markdown
# Configuration Reference

## `maxTokens`
- **Type:** `number`
- **Default:** `4096`
- **Range:** `1` — `128000`
- **Description:** Maximum number of tokens the model can generate in a response.
  Higher values allow longer outputs but increase latency and cost.

## `temperature`
- **Type:** `number`
- **Default:** `0.7`
- **Range:** `0.0` — `2.0`
- **Description:** Controls randomness in output. Lower values (e.g., 0.2) make
  output more deterministic. Higher values (e.g., 1.0) make output more random.

## `apiKey`
- **Type:** `string`
- **Default:** `process.env.API_KEY`
- **Description:** API key for authentication. Can be set via environment variable.
  Never hardcode this value.
```

| Config Option | Type | Default | Description |
|---------------|------|---------|-------------|
| `maxTokens` | `number` | `4096` | Max output tokens (1-128000) |
| `temperature` | `number` | `0.7` | Output randomness (0.0-2.0) |
| `apiKey` | `string` | env var | API authentication key |

### 24.3 Error Messages Documentation

```typescript
// BAD — undocumented error
throw new Error('Something went wrong');

// GOOD — documented, typed error
/**
 * Thrown when the API key is invalid or expired.
 * User should check their API key configuration.
 */
export class AuthenticationError extends Error {
  code = 'AUTH_INVALID_KEY';
  constructor() {
    super('Authentication failed. Check your API key.');
  }
}

// Error documentation table:
| Error Code | Error Type | Cause | User Action |
|------------|------------|-------|-------------|
| AUTH_INVALID_KEY | AuthenticationError | Invalid or expired API key | Check API key |
| RATE_LIMITED | RateLimitError | Too many requests | Wait and retry |
| MODEL_NOT_FOUND | NotFoundError | Model doesn't exist | Check model name |
| CONTEXT_TOO_LARGE | ValidationError | Input exceeds context window | Reduce input |
```

### 24.4 Examples Review

```
Checklist for examples:
[ ] Example code is copy-paste runnable
[ ] Example uses current API (not deprecated)
[ ] Example handles errors
[ ] Example output is documented
[ ] Example has clear setup instructions
[ ] Example environment variables documented
[ ] Example has expected output shown
```

```markdown
## Example: Basic Usage

```typescript
import { generateText } from 'openclaude';

// Requires OPENCLAUDE_API_KEY env variable
const result = await generateText({
  model: 'claude-3-5-sonnet-20241022',
  prompt: 'Write a haiku about TypeScript',
});

console.log(result.text);
// Output:
// Types so strong and clear
// Errors caught before runtime
// Code that we can trust
```
```

---

## 25. CI/CD Review Integration

### 25.1 Automated Review Gates

| Gate | Tool | When | Blocking |
|------|------|------|----------|
| TypeScript check | `tsc --noEmit` | Every PR | Yes |
| Lint | `eslint` / `biome` | Every PR | Yes |
| Format | `prettier` / `dprint` | Every PR | Warning |
| Unit tests | `vitest` / `jest` | Every PR | Yes |
| Integration tests | `vitest` / `jest` | Every PR | Yes |
| E2E tests | `playwright` | Labeled PRs | No |
| Coverage | `c8` / `istanbul` | Every PR | Warning |
| Security audit | `npm audit` | Every PR | Yes (critical) |
| Dependency review | `dependabot` | Daily | Per severity |
| Build | `tsup` / `esbuild` | Every PR | Yes |

```yaml
# Example CI configuration (GitHub Actions)
name: PR Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck  # tsc --noEmit
      - run: npm run lint        # eslint
      - run: npm run test:unit   # vitest run
      - run: npm run test:integration
      - run: npm run audit       # npm audit
      - run: npm run build       # tsup
```

### 25.2 Lint/Typecheck as Review Prerequisites

```
Before any human review begins:
  ✓ TypeScript compiles successfully
  ✓ Lint passes with no errors
  ✓ All tests pass
  ✓ Coverage meets threshold (if configured)

If CI fails:
  → Author should fix CI before requesting review
  → Reviewer should not start review on failing CI
  → Exception: CI infrastructure issue (not code issue)
```

### 25.3 Coverage Requirements

| Metric | Target | Enforcement |
|--------|--------|-------------|
| Overall line coverage | ≥ 80% | CI warning at < 80% |
| New code coverage | ≥ 90% | CI failure at < 90% |
| Branch coverage | ≥ 75% | CI warning at < 75% |
| Test count (new) | ≥ 1 per changed function | Reviewer check |

```bash
# Check coverage for a specific PR
npx vitest run --coverage --changed HEAD~1
```

### 25.4 Security Scanning Integration

```yaml
# CI security scan steps
- name: Dependency audit
  run: |
    npm audit --audit-level=high
    # or
    npx better-npm-audit audit -p high

- name: Secret scanning
  uses: trufflesecurity/trufflehog@v3
  with:
    extra_args: --only-verified

- name: SAST
  uses: github/codeql-action/analyze@v3
  with:
    category: "/language:typescript"
```

---

## 26. Review Response Templates

### 26.1 Approval Templates

#### Standard Approval

```markdown
## ✅ Approved

The changes look correct and well-tested. I verified:
- Logic handles the described use case
- Edge cases are covered
- Tests pass and cover the change
- No security concerns

Good work on [specific thing they did well]!
```

#### Approval with Nits

```markdown
## ✅ Approved with Nits

The core change is solid and I'm approving it. A few minor suggestions
for a follow-up PR (not blocking):

{nits}

Feel free to address these when you have time.
```

### 26.2 Changes Requested Templates

#### Changes Requested — Bug/Layout Issue

```markdown
## ❌ Changes Requested — Logic Error

There's a logic error in this code that needs to be fixed before merge:

**Location:** `src/handler.ts:42-48`
**Issue:** The `handleRequest` function returns early without processing
when `input` is empty, but it should return a default result instead.
**Fix:** 
```typescript
if (!input) return { result: 'default', status: 'empty' };
```

Please fix and re-request review. Let me know if you want to discuss the approach.
```

#### Changes Requested — Missing Tests

```markdown
## ❌ Changes Requested — Missing Tests

This adds a new feature but doesn't include tests. Per project policy,
new features need:

1. At least one happy path test
2. Edge case tests (empty input, invalid params)
3. Error path test

Please add tests and re-request review.
```

#### Changes Requested — Breaking Change

```markdown
## ❌ Changes Requested — Breaking Change

This change modifies the public API in a way that breaks existing consumers:

**Change:** Renamed `processData` to `transformData` (line 15)
**Impact:** All existing callers will break
**Required:** 
- Add deprecation notice to old name
- Add migration path in CHANGELOG
- Add type-level backward compatibility if possible

Please update and re-request.
```

### 26.3 Security Issue Template

```markdown
## 🚨 Security Issue — Blocking

⚠️ **CRITICAL:** This PR introduces a security vulnerability.

**Location:** `src/cli.ts:85`
**Issue:** User input is passed directly to `exec()` without sanitization,
allowing command injection.
```typescript
// Current (vulnerable):
exec(`grep "${userInput}" log.txt`);
```
**Fix:** Use parameterized execution:
```typescript
exec('grep', [userInput, 'log.txt']);
```

**This must be fixed before merge.** I'm happy to discuss alternatives
if this approach doesn't work for your use case.
```

### 26.4 Style Nitpick Template

```markdown
## 🔍 Style Suggestion (Non-Blocking)

**Nitpick:** Consider using optional chaining here for consistency with
the rest of the codebase.

```typescript
// Current
if (data && data.user && data.user.name) { ... }

// Suggested
if (data?.user?.name) { ... }
```

Not blocking — feel free to address or defer.
```

### 26.5 Templates by PR Type

#### Fix PR Response

```markdown
## Fix Review

**Summary:** Bug fix for [issue description].

- [x] Root cause addressed (not symptom)
- [x] Regression test included
- [x] Change is minimal
- [x] No refactors mixed in
- [x] Edge cases handled

**Verdict:** ✅ Approved / ❌ Changes Needed
```

#### Feat PR Response

```markdown
## Feature Review

**Summary:** New feature — [feature description].

**Checklist:**
- [x] Additive change
- [x] Config-gated (default off)
- [x] Backward compatible
- [x] Tests included
- [x] Documentation updated

**Verdict:** ✅ Approved / ❌ Changes Needed
```

#### Enhance PR Response

```markdown
## Enhancement Review

**Summary:** Enhancement to [existing feature].

- [x] Preserves existing behavior
- [x] Optional / config-gated
- [x] Follows existing patterns
- [x] Tests updated

**Verdict:** ✅ Approved / ❌ Changes Needed
```

#### Refactor PR Response

```markdown
## Refactor Review

**Summary:** Refactoring [area].

- [x] Behavior unchanged (verified via tests)
- [x] Justification clear
- [x] Scope appropriate
- [x] Tests still passing

**Note:** Verified with `git diff --stat` — only structure changed, no logic.
**Verdict:** ✅ Approved / ❌ Changes Needed
```

#### Docs PR Response

```markdown
## Documentation Review

**Summary:** Documentation update for [area].

- [x] Content accurate
- [x] Examples runnable
- [x] Links working
- [x] Tone consistent

**Verdict:** ✅ Approved / ❌ Changes Needed
```

---

## 27. Review Metrics & Improvement

### 27.1 Tracking Review Velocity

| Metric | Target | How to Track |
|--------|--------|--------------|
| Time to first review | < 24 hours | GitHub PR metrics |
| Time from review to merge | < 48 hours | GitHub PR metrics |
| Reviews per reviewer/week | 5-10 | GitHub contributor stats |
| PRs open > 7 days | < 5 | GitHub dashboard |
| Comments per review | 3-10 | Manual sampling |

```bash
# Quick stats for a repo
gh pr list --state all --limit 100 --json createdAt,mergedAt,comments
  --jq 'group_by(.author) | .[] | {author: .[0].author.login, count: length}'
```

### 27.2 Common Review Findings Metrics

| Finding Category | Frequency Tracker | Goal |
|-----------------|-------------------|------|
| Missing null checks | Count per month | ↓ 50% in 3 months |
| Missing tests | Count per month | ↓ 30% in 3 months |
| Console.log | Count per month | ↓ 80% in 3 months |
| Security issues | Count per month | ↓ 100% in 3 months |
| Style inconsistencies | Count per month | ↓ 50% in 3 months |

```markdown
# Monthly Review Metrics Report

| Month | PRs Reviewed | Avg Comments | Blocking Issues | Repeats |
|-------|-------------|--------------|-----------------|---------|
| Jan   | 45          | 5.2          | 12              | 3       |
| Feb   | 52          | 4.8          | 8               | 2       |
| Mar   | 48          | 4.5          | 6               | 1       |
```

### 27.3 Reviewer Feedback Loops

```
Monthly review retro:
  1. What types of issues did we see most?
  2. Were there areas where many reviews had the same feedback?
  3. Did any PRs take unusually long? Why?
  4. Are there automation opportunities? (lint rules, CI gates)
  5. Are reviewers aligned on standards?

Actions:
  → Add lint rule for common issue
  → Update review guide with new pattern
  → Schedule knowledge share session
  → Pair on complex reviews
```

### 27.4 Continuous Improvement Process

```markdown
## Review Improvement Cycle

1. **Collect data** — Track review metrics monthly
2. **Identify patterns** — Most common findings? Longest reviews?
3. **Automate** — Add lint rules, CI checks for common issues
4. **Document** — Update this guide with new patterns
5. **Train** — Share findings with team, write about them
6. **Repeat** — Next month, measure improvement

Goal: Reduce repeat findings by 50% every quarter.
```

---

## 28. Advanced Review Techniques

### 28.1 Reading Code with a Debugger

```
For complex logic, running the code in a debugger can reveal issues
that aren't obvious from static analysis:

1. Set breakpoints at key decision points
2. Run the test or scenario
3. Step through the logic line by line
4. Inspect variables at each step
5. Verify assumptions about state

Tools:
  - VS Code: Built-in debugger (F5)
  - Chrome DevTools: Node.js debugging (--inspect)
  - Node.js: node --inspect-brk

Best for:
  - Complex algorithms
  - State machine transitions
  - Async control flow
  - Error propagation paths
```

### 28.2 Running Test Suites as Review

```
Before or during review, run the relevant test suite:

# Run only changed files' tests
npx vitest run --changed HEAD~1

# Run tests for a specific module
npx vitest run src/services/__tests__/

# Run with coverage for the changed area
npx vitest run --coverage src/services/__tests__/

What to look for:
  - Tests pass (obvious)
  - Tests are fast (no slow tests)
  - Tests are deterministic (re-run same result)
  - Tests have good assertions (catch real errors)
  - No .only left in test files
  - Coverage for the changed code is adequate
```

### 28.3 Side-by-Side Diff Analysis

```
For large refactors or rewrites, side-by-side diff is essential:

Tools:
  - GitHub PR: Unified or split view
  - VS Code: GitLens, built-in diff
  - diff/meld: External diff tools

Technique:
  1. View the diff in split mode
  2. Trace each old code path to its new equivalent
  3. Verify no behavior was lost
  4. Check for unintended changes (whitespace, formatting)
  5. Verify the diff is scoped to the stated purpose

Key questions:
  - Does every deletion have a corresponding addition?
  - Are there changes not mentioned in the PR description?
  - Is the diff smaller than expected (good) or larger (red flag)?
```

### 28.4 Contract Testing Verification

```
For cross-service or cross-module boundaries, verify contracts:

1. Input contract:
   - All required parameters documented
   - Parameter types are correct
   - Validation is consistent with contract

2. Output contract:
   - Return type matches documentation
   - Error types are documented
   - Error conditions are tested

3. Behavioral contract:
   - Side effects are documented
   - Idempotency guarantees are honored
   - Ordering guarantees are documented
   - Concurrency semantics are clear

```typescript
// Example: Contract test for a provider
describe('Provider contract: OpenAI', () => {
  it('implements the Provider interface', () => {
    const provider = new OpenAIProvider(config);
    expect(provider).toBeInstanceOf(AIProvider);
    expect(provider.name).toBe('openai');
    expect(typeof provider.complete).toBe('function');
  });

  it('maps errors consistently', async () => {
    const provider = new OpenAIProvider(invalidConfig);
    const result = await Effect.runPromise(
      pipe(
        provider.complete(request),
        Effect.catchAll(error => Effect.succeed(error))
      )
    );
    expect(result).toBeInstanceOf(ProviderError);
    expect(result.code).toMatch(/^PROVIDER_/);
  });
});
```

### 28.5 Reading the PR Description First

```
Start every review by reading the PR description:

  [x] What problem does this solve?
  [x] What approach was taken?
  [x] What testing was done?
  [x] Are there screenshots or recordings?
  [x] Are there related issues linked?
  [x] Is there a migration path (if breaking)?

Don't start reading code until you understand:
  1. What the PR is supposed to do
  2. Why this approach was chosen
  3. What the expected behavior change is
```

### 28.6 The "Explain It Back" Technique

```
For complex PRs, mentally (or literally) explain the code back:

  1. Read a function
  2. Summarize what it does in one sentence
  3. Check if that matches what the PR says it should do
  4. If you can't explain it, the code is probably too complex

This technique catches:
  - Missing abstractions (too many things in one function)
  - Poor naming (function name doesn't match behavior)
  - Unnecessary complexity (could be simpler)
  - Logic errors (your mental model doesn't match)
```

---

## 29. The Review Workflow

### 29.1 Step-by-Step Process

```
┌─────────────────────────────────────────────────────┐
│                  PR SUBMITTED                        │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  1. NOTIFICATION                                    │
│     - CI must be passing (otherwise reject)         │
│     - PR description must explain the change        │
│     - PR size must be reasonable (<500 lines)       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  2. QUICK SCAN (5 min)                              │
│     - Security red flags?                           │
│     - Tests present?                                │
│     - No obvious bugs?                              │
│     - Follows existing patterns?                    │
│     If FAIL → Request changes or clarify            │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  3. DEEP REVIEW (15-30 min)                         │
│     - Read every changed file                       │
│     - Verify logic correctness                      │
│     - Check edge cases and error handling           │
│     - Review tests (quality, not just presence)     │
│     - Check performance implications                │
│     - Verify TypeScript types                       │
│     - Check project-specific patterns               │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  4. WRITE REVIEW                                     │
│     - Use templates from Section 26                  │
│     - Separate blocking vs non-blocking              │
│     - Be specific with code references               │
│     - Include praise for good work                   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  5. SUBMIT REVIEW                                    │
│     - Approve, Request Changes, or Comment           │
│     - If Request Changes: be clear about what's      │
│       needed for approval                            │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  6. FOLLOW-UP                                       │
│     - Respond to author's questions                  │
│     - Re-review within 24 hours                      │
│     - Approve when satisfied                        │
│     - Merge or author merges                        │
│     - Create follow-up issues if needed             │
└─────────────────────────────────────────────────────┘
```

### 29.2 Time Budgets

| Step | Light Review | Standard Review | Deep Review |
|------|-------------|-----------------|-------------|
| Quick scan | 2 min | 3 min | 5 min |
| Deep review | — | 15 min | 40 min |
| Write review | 3 min | 7 min | 10 min |
| Follow-up | 2 min | 5 min | 10 min |
| **Total** | **7 min** | **30 min** | **65 min** |

### 29.3 Response Time SLAs

| Priority | First Response | Re-review | Merge |
|----------|---------------|-----------|-------|
| Security fix | 2 hours | 2 hours | As soon as CI passes |
| Bug fix (blocking) | 8 hours | 4 hours | Same day |
| Feature | 24 hours | 24 hours | Within 2 days |
| Enhancement | 24 hours | 24 hours | Within 3 days |
| Documentation | 48 hours | 24 hours | Within 1 week |

---

> **End of Task-Review Document (Global / Brain Box)** (v2.0)
>
> Part of the LifeJiggy OSS Enhancement Framework
> Last updated: 2026-05-29
> Sections: 29 | Review types: 4 | Templates: 12+ | Code examples: 30+
