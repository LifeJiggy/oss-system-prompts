# Review Response Guide — Professional Communication

## Overview

This guide teaches you how to respond to code review feedback professionally and effectively. Code review is where most PRs succeed or fail — your communication during review is just as important as your code.

The goal is simple: **Respond quickly, professionally, and thoroughly until your PR is merged.**

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Understanding Feedback Types](#understanding-feedback-types)
3. [Response Templates](#response-templates)
4. [What NOT to Say](#what-not-to-say)
5. [Handling Different Finding Types](#handling-different-finding-types)
6. [The Fix Commit Pattern](#the-fix-commit-pattern)
7. [After Response Protocol](#after-response-protocol)
8. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
9. [Handling Rejection](#handling-rejection)
10. [Building Long-Term Relationships](#building-long-term-relationships)

---

## Core Principles

### 1. Respond Quickly — Within 48 Hours Maximum

Speed matters in code review. When you respond quickly, you show respect for the reviewer's time and keep momentum going.

**The 48-Hour Rule:**
- Within 24 hours: Acknowledge receipt of review
- Within 48 hours: Provide initial response to findings
- If you need more time: Communicate early

**Even if you cannot fix immediately, acknowledge receipt:**
- "Thanks for the review! I'll address these findings and get back to you."
- "Got it. Let me work on these and push updates."

**Never disappear.** Silence is the fastest way to get your PR closed.

### 2. Do Not Take It Personally

This is the hardest principle for many developers. Reviewers critique code, not you.

**Remember:**
- "The code has SQL injection" does not mean "You are a bad developer"
- "This approach doesn't work" does not mean "You are incompetent"
- "Please change this" does not mean "Your work is worthless"

**Separate identity from contribution:**
- Your code is not you
- Feedback is about improvement, not judgment
- Every developer writes imperfect code sometimes

**When you feel defensive, pause and ask:**
- What is the reviewer actually saying?
- Is there a valid point I'm missing?
- Can I learn something from this?

### 3. Address Every Point

Every finding must be addressed. Do not skip points hoping the reviewer won't notice.

**Priority System:**
- **P1 (Blocker):** Must fix before merge. Zero tolerance.
- **P2 (Should Fix):** Should be fixed unless you have a strong reason not to.
- **P3 (Nice to Have):** Consider fixing, optional.

**The rule:** Every P1 must be fixed. Every P2 should be fixed.

**How to track:**
- Copy each finding into your response
- Mark it as fixed, in progress, or requires clarification
- Don't skip anything

### 4. Be Professional — Always

Your communication style matters as much as your code.

**Do:**
- Keep responses brief but complete
- Use "I" statements: "I'll fix that" not "You should have said"
- Show gratitude: "Thanks for catching this"
- Be direct: "Fixed" or "In progress"

**Don't:**
- Defensive language: "But I thought..." or "Actually..."
- Argue: "I disagree because..."
- Make excuses: "The tests were already failing..."
- Be sarcastic or passive-aggressive

**Simple formula:**
> "What happened + What I'm doing about it"

---

## Understanding Feedback Types

### Finding Types

#### The Blocker (P1)
This is something that must be fixed. It could be:
- SQL injection vulnerability
- Connection leak (missing `finally`)
- Fake/placeholder implementation
- Phantom references to non-existent APIs
- Breaking existing functionality
- Missing tests

**How to identify:** Reviewer explicitly says "P1" or "blocker" or "must fix"

#### The Should Fix (P2)
This is something that should be changed but isn't critical:
- Code style inconsistency
- Missing docstrings
- Unclear variable names
- Better approach available
- Unused imports

**How to identify:** Reviewer says "should fix" or "consider" or "recommend"

#### The Question
The reviewer doesn't understand something and is asking for clarification:
- "Why did you choose this approach?"
- "What does this function do?"
- "How does this handle edge case X?"

#### The Suggestion
The reviewer is suggesting an improvement without requiring it:
- "You could use..."
- "Have you considered..."
- "Another way to do this would be..."

#### The Praise
The reviewer likes something and is complimenting your work:
- "Nice solution!"
- "This is clean!"
- "Great approach!"

---

## Response Templates

### Template 1: Initial Acknowledgment

Use this when you receive a review and need time to address it:

```markdown
Thank you for the review! I've read through all the feedback.

[P1 findings] - I'll fix these immediately
[P2 findings] - I'll review and address these
[Questions] - I'll clarify

I'll push updates within [timeframe].
```

**Example:**
```markdown
Thank you for the review! I've read through all the feedback.

[P1] SQL injection vulnerability - I'll fix this immediately
[P2] Missing docstrings - I'll add documentation
[Question] About the error handling approach - I need clarification

I'll push updates within the next 24 hours.
```

### Template 2: Each Finding Response

Use this for each individual finding:

```markdown
> **[P1/P2] [Title of finding]**
> [Status: Fixed ✅ / In Progress 🔄 / Need Clarification ❓]
>
> Brief technical explanation of what was changed and why it fixes the issue.
> Include before/after if relevant.
```

**Example for a fix:**
```markdown
> **[P1] SQL injection vulnerability** ✅
> Fixed by changing to parameterized query and adding regex validation.
>
> Before:
> ```python
> cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")
> ```
>
> After:
> ```python
> cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
> ```
```

**Example for needing clarification:**
```markdown
> **[P2] Unclear variable naming** ❓
> Could you clarify which variable name you find unclear? I want to make sure I address the right one.
```

### Template 3: Asking for Clarification

Use this when you don't understand the feedback:

```markdown
> **Question about [finding]**
>
> I want to make sure I address this correctly. Could you elaborate on:
> - What specifically needs to change?
> - What approach would you prefer?
>
> I want to ensure I understand correctly before implementing.
```

**Example:**
```markdown
> **Question about the error handling approach**
>
> I want to make sure I address this correctly. Could you elaborate on:
> - Would you prefer specific exception types over broad `except Exception`?
> - Should the error be logged before returning the response?
>
> I want to ensure I understand correctly before implementing.
```

### Template 4: Explaining Reasoning

Use this when you want to explain why you made a certain choice:

```markdown
> **[P2] [Finding]**
>
> I chose this approach because:
> - [Reason 1]
> - [Reason 2]
>
> Would a different approach be better? I'm open to changing it if there's a better way.
```

### Template 5: Agreeing to Disagree

Use this when you understand the feedback but will comply:

```markdown
> **[P2] [Finding]**
>
> I understand your concern. After consideration, I'll change it as requested.
>
> My original reasoning was [reason], but I agree that [reviewer's point] is more important.
>
> [Explain what you'll change]
```

---

## What NOT to Say

### Don't Say These Things

**Defensive responses:**
- "You're wrong"
- "This is actually correct because..."
- "You don't understand the full context"
- "The tests pass, so it's fine"

**Excuses:**
- "The tests were already failing..."
- "I didn't have time to..."
- "The requirements were unclear..."
- "It works on my machine"

**Arguing:**
- "I disagree because..."
- "This is the standard in industry..."
- "I've been coding longer than you..."
- "But that's how they do it in [other project]..."

**Dismissive:**
- "This is too much work"
- "It's just a small change"
- "I'll do it later" (when it's a P1)
- "That seems unnecessary"

**Passive-aggressive:**
- "Fine, I'll change it"
- "If you insist..."
- "I guess that works"
- "Whatever you say"

### Do Say These Things

**Accepting feedback:**
- "I see, I'll fix that"
- "Good point, I hadn't considered that"
- "Thanks for catching this"
- "You're right, I'll update that"

**Taking action:**
- "Let me update that"
- "I'll add those tests"
- "Changing now"
- "Fixed in latest commit"

**Being professional:**
- "I understand, changing now"
- "Makes sense, I'll revise"
- "Good feedback, addressing now"
- "Thanks for the detailed review"

**Asking questions:**
- "Could you clarify what you mean by X?"
- "Would you prefer approach A or B?"
- "What would you recommend here?"

---

## Handling Different Finding Types

### P1 (Blocker) — MUST FIX

This is critical. Fix immediately, no arguments.

**Response:**
```markdown
> **[P1] [Finding title]** ✅
>
> Fixed by [what you changed].
>
> Before: [old code]
> After: [new code]
>
> Verified with [how you tested].
```

**Example:**
```markdown
> **[P1] SQL injection vulnerability** ✅
>
> Fixed by using parameterized query instead of string interpolation.
>
> Before:
> ```python
> cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")
> ```
>
> After:
> ```python
> cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
> ```
>
> Verified by running the test suite and checking EXPLAIN OUTPUT.
```

### P2 (Should Fix) — USUALLY FIX

This should be fixed unless you have a compelling reason not to.

**Response:**
```markdown
> **[P2] [Finding title]** ✅
>
> Addressed by [what you changed].
>
> [Optional: Explanation of why this approach]
```

**Example:**
```markdown
> **[P2] Missing test coverage** ✅
>
> Added tests for:
> - Success path (valid input returns correct output)
> - Error path (invalid input returns error)
> - Edge cases (empty input, boundary values)
> - SQL injection prevention (malicious input rejected)
>
> All tests pass.
```

### Question/Curiosity — ANSWER THOROUGHLY

Take this as an opportunity to explain your thinking.

**Response:**
```markdown
> **Question: [their question]**
>
> Good question. I chose this approach because:
> - [Reason 1]
> - [Reason 2]
> - [Reason 3]
>
> Does that make sense? Happy to discuss if there's a better way.
```

### Suggestion — RESPECTFULLY CONSIDER

The reviewer is offering an alternative without requiring it. Consider it seriously.

**If you agree:**
```markdown
> **Suggestion: [their suggestion]**
>
> Good idea! I'll implement that approach.
>
> [Show what you'll change]
```

**If you disagree (but be respectful):**
```markdown
> **Suggestion: [their suggestion]**
>
> Interesting suggestion. I considered this but chose [current approach] because [reasons].
>
> Let me know if you feel strongly about changing it. Otherwise, I'll keep it as is.
```

### Praise — ACKNOWLEDGE GRACEFULLY

Accept the compliment. It shows confidence.

**Response:**
```markdown
> Thanks! I spent extra time on [specific aspect] and I'm glad it shows.
>
> Let me know if there's anything else to address.
```

---

## The Fix Commit Pattern

### One Fix = One Commit

When you address feedback, make one commit for all fixes.

**Pattern:**
```bash
git add .
git commit -m "fix: address P1 feedback - add SQL parameterization"
```

**Commit Message Format:**
```
fix: address [priority] feedback - [brief description]

- [What you changed]
- [What you changed]
- [What you changed]
```

**Example:**
```
fix: address P1 feedback - add SQL parameterization

- Changed cursor.execute(f"...'${id}'") to parameterized query
- Added regex validation for SQL identifiers
- Added test for SQL injection prevention
- Verified all tests pass
```

---

## After Response Protocol

### Wait for Next Round

**Do:**
- Give reviewer time to look at your changes
- Don't send multiple follow-up messages
- If no response in 3-5 days, send a polite bump

**Don't:**
- Push more commits to "speed things up"
- Send "any update?" messages daily
- Get impatient

### Polite Bump Example

```markdown
Hi [reviewer],

Just checking in on this PR. I've addressed all the feedback from the last round.

Let me know if you have any other feedback or if I can do anything else to move this forward.

Thanks!
```

### If Changes Requested Again

1. Start over with the same process
2. Don't get frustrated
3. Keep fixing until approved
4. It's normal for reviews to go multiple rounds

### If Approved

1. Thank the reviewer
2. Delete your branch (clean up)
3. Move to next task
4. You've succeeded!

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: The "Argue Back"

**What it looks like:**
```markdown
> I disagree because...
> This is the standard in industry...
> I've been coding longer than you...
> The tests pass, so it's fine...
```

**Why it fails:** Defensive responses damage relationships. Even if you're right, you come across as difficult to work with.

**What to do instead:** Accept the feedback and comply. If you truly disagree, ask clarifying questions first.

---

### Anti-Pattern 2: The "Excuse Maker"

**What it looks like:**
```markdown
> The tests were already failing before my changes...
> I didn't have time to add tests...
> The requirements were unclear...
> It works on my machine...
```

**Why it fails:** Excuses show lack of ownership. Reviewers want collaborators who take responsibility.

**What to do instead:** Take responsibility. Fix the issue. Don't explain why it happened — show that you're fixing it.

---

### Anti-Pattern 3: The "Ghost"

**What it looks like:**
```
[No response for days/weeks/months]
```

**Why it fails:** Ghosting wastes reviewer time and shows unreliability. Your PR will be closed.

**What to do instead:** Respond within 48 hours. Even if you need more time, communicate that.

---

### Anti-Pattern 4: The "Defensive"

**What it looks like:**
```markdown
> This is actually correct because...
> You don't understand the full context...
> Let me explain what I was trying to do...
```

**Why it fails:** Being defensive makes reviewers less willing to work with you.

**What to do instead:** Accept feedback. Ask questions if you don't understand. Don't explain your reasoning unless asked.

---

### Anti-Pattern 5: The "Passive-Aggressive"

**What it looks like:**
```markdown
> Fine, I'll change it...
> If you insist...
> I guess that works...
> Whatever you say...
```

**Why it fails:** Sarcasm and passive-aggression damage relationships as much as being defensive.

**What to do instead:** Be direct. Say "I'll change it" not "Fine, I'll change it."

---

## Handling Rejection

### If Your PR Is Rejected

This happens. It doesn't mean you're a bad developer. Here's how to handle it:

#### Step 1: Don't Take It Personally

Rejection is about the code, not you. Process that first.

#### Step 2: Read the Feedback Carefully

What specifically was the issue? What would make it acceptable?

#### Step 3: Ask for Clarity

```markdown
> Thanks for the feedback. I want to understand better — what would make this acceptable for a future PR? Is there a specific approach you'd recommend?
```

#### Step 4: Learn and Apply

Add the lesson to your checklist. Apply it to your next PR.

#### Step 5: Try Again

Don't give up. The best OSS contributors were all rejected at some point.

### Example Rejection Response

```markdown
> Thanks for the feedback! I understand.
>
> Could you help me understand what would make this acceptable for a future PR? I want to make sure I understand the requirements before trying again.
>
> I'll keep these lessons in mind for my next contribution:
> - Need prior discussion before coding
> - One change per PR
> - More focused scope
```

---

## Building Long-Term Relationships

### Every Interaction Matters

Each PR is an opportunity to build your reputation. Treat every interaction as a chance to show you're a great collaborator.

### Be Known as Someone Who:

- Responds quickly
- Accepts feedback gracefully
- Delivers quality work
- Follows through on commitments
- Is easy to work with

### The Goal

Your goal should be to become someone whose PRs reviewers are happy to see. When you're known as a great collaborator, your PRs get faster reviews and more trust.

---

## Summary

### Key Principles

| Principle | Action |
|-----------|--------|
| Respond quickly | Within 48 hours maximum |
| Don't take it personally | Separate code from identity |
| Address every point | No skipped findings |
| Be professional | No excuses, no arguing |

### Response Summary Table

| Action | Response Time |
|--------|---------------|
| Acknowledge review | Within 24 hours |
| Address P1 findings | Within 48 hours |
| Address P2 findings | Before next review |
| Respond to questions | Within 24 hours |
| Push fixes | Immediately after fixing |
| Follow up | If no response in 3-5 days |

### Final Reminder

> **Be fast, be professional, be grateful.**

That's it. Respond quickly, be professional in your communication, and show gratitude for the review. Your PRs will be merged, and you'll build a reputation as a great contributor.

---

## Global Review Communication Standards

While the patterns above use this project's conventions as examples, these universal standards apply across any open source project.

### Universal Review Etiquette

| Principle | Practice |
|-----------|----------|
| Lead with gratitude | Start every response with "Thanks for the review" or "Appreciate the feedback" |
| Address every comment | Reply to each review thread — even just "Done" or "Fixed in abc123" |
| Push fixup commits first | Don't squash until the reviewer asks. Fixup commits make re-review trivial |
| Default to "Yes, and" | Accept suggestions unless you have a strong technical reason not to |
| Know when to push back | If you must disagree, cite code, tests, or docs — never opinion |
| Never @-mention unprompted | Don't pull in additional maintainers unless the reviewer asks |
| Stay in the PR | Take side discussions to issues, not DMs — transparency matters |

### Cultural Differences in OSS Communication

| Maintainer style | Signal | How to adapt |
|------------------|--------|--------------|
| Direct/blunt | Short comments, no pleasantries | Don't take it personally — brevity is efficiency, not rudeness |
| Socratic | Answers with questions ("What if...?") | Play along — they're teaching, not testing |
| Laissez-faire | Slow responses, sparse reviews | Bump once per week with a summary of what's changed |
| Micro-manager | Inline comments on every line | Match their thoroughness — they value precision |
| Delegator | "Looks good, @other-maintainer PTAL" | Wait for the second reviewer before merging |
| Drive-by | One comment, then disappears | Address it, then let the maintainers decide |

**No two projects communicate the same way.** Read the last 5-10 merged PRs before posting your first response. That is the single best signal for what the project expects.

### Handling Reviews in Projects with a CODE_OF_CONDUCT.md

If the project has a `CODE_OF_CONDUCT.md`, treat it as a binding contract — not a decoration.

- **DO** report genuine harassment or personal attacks via the listed channels (usually email to a core team, not a public issue).
- **DO NOT** weaponize the CoC over a harsh but technically correct review. "This approach is wrong" is not a violation.
- If a reviewer violates the CoC, document objectively: screengrab comments, note timestamps, then email the reporting address. Do not escalate in the PR itself.
- If *you* are the reviewer, remember that CoC compliance means critiquing the code, not the person. "This allocates O(n²)" is fine. "This is stupid" is not.

### Common Code Review Abbreviations

| Abbreviation | Full meaning | Usage |
|--------------|--------------|-------|
| ACK | Acknowledged | "I see your change and agree" |
| NACK / NAck | Not acknowledged | "I disagree — do not merge" |
| LGTM | Looks good to me | Approving the change as-is |
| PTAL | Please take a look | Requesting review from someone |
| SGTM | Sounds good to me | Informal agreement |
| TY | Thank you | Closing out a thread |
| NP | No problem | You're welcome / no issue |
| IIRC | If I recall correctly | Softening a claim |
| AFAIK | As far as I know | Limiting scope of knowledge |
| AFAICT | As far as I can tell | Based on what I've observed |
| WIP | Work in progress | PR is not ready for final review |
| RFC | Request for comments | Seeking design discussion |
| TBD / TBC | To be determined / confirmed | Open question |
| s/foo/bar | Substitute "foo" with "bar" | Inline find-and-replace suggestion |
| Nit / Nitpick | Minor style issue | Not blocking, but please fix |

### Extended Abbreviations

| Abbreviation | Full meaning | Usage |
|--------------|--------------|-------|
| IMO / IMHO | In my (humble) opinion | Softening a subjective recommendation |
| TL;DR | Too long; didn't read | Summary of a long comment |
| FYI | For your information | Sharing context without requiring action |
| BTW | By the way | Adding tangential information |
| PR | Pull request | Standard term across GitHub/GitLab/Bitbucket |
| GH | GitHub | Platform reference |
| CI | Continuous integration | Automated test pipeline |
| WDYT | What do you think? | Asking for opinion |
| +1 / -1 | Agreement / disagreement | Quick vote in discussions |
| ping | Calling attention | Following up on a thread (use sparingly) |
| RFC | Request for comments | Seeking design discussion |
| WFM | Works for me | Informal approval |
| TAL | Take a look | Asking for review |
| ETA | Estimated time of arrival | When something will be done |
| QoTD | Question of the day | Lighthearted aside (rare) |
| Re: | Regarding | Referencing a previous point |
| IIUC | If I understand correctly | Prefacing a clarification question |
| JFYI | Just for your information | Non-actionable context |

### Handling Multiple Reviewers with Conflicting Feedback

When two reviewers ask for incompatible changes, resolution requires diplomacy.

**Step 1 — Identify who owns the decision.** Check the project's governance docs, COMMITTERS file, or `MAINTAINERS.md`. Usually one maintainer has the final say for a given area.

**Step 2 — Ask for triage.** Reply to the thread:

```markdown
> Reviewers A and B have suggested different approaches here.
>
> Reviewer A recommends [approach X] while Reviewer B prefers [approach Y].
>
> @primary-maintainer, could you advise on which direction to take?
```

**Step 3 — When both are optional:**

```markdown
> I see both approaches have merit. I've implemented [approach most aligned with project conventions].
> Happy to change if the team prefers the other direction.
```

**Step 4 — Document the resolution.** After the decision, summarize it in a top-level PR comment for future contributors.

> **Never pit reviewers against each other.** "Reviewer A said X, but you said Y" frames the choice as a personal conflict rather than a technical decision.

### Project Governance and Its Impact on Review

| Governance model | How review works | Contributor strategy |
|-----------------|------------------|---------------------|
| BDFL (Benevolent Dictator) | One person has final say on all decisions | Engage early. Convince the BDFL before coding. Their word is law |
| Meritocratic | Core committers earn decision rights through contributions | Build reputation with small, clean PRs before proposing large changes |
| Corporate-backed | Employees drive direction; external contributions welcome but secondary | Read the CONTRIBUTING.md and any public roadmap. Align with stated priorities |
| Foundation / Multi-stakeholder | Formal voting, TSC (Technical Steering Committee), ADRs | Follow RFC process. Expect longer timelines. Engage on mailing list first |
| Do-ocracy | Whoever does the work decides | Just ship it. Reviews focus on correctness, not vision alignment |

**The governance model determines what "convincing the reviewer" looks like:**
- In a BDFL project, you convince one person.
- In a meritocracy, you convince the working group.
- In a corporate project, you demonstrate business value.
- In a do-ocracy, you demonstrate that your code works.

### International English in Code Reviews

Most OSS communication happens in English, but not everyone is a native speaker. Adapt accordingly.

**Write clearly:**
- Prefer short sentences over complex clauses
- Avoid idioms ("let's bite the bullet", "this is a can of worms")
- Use active voice: "This function returns a list" not "A list is returned by this function"
- Spell out acronyms on first use: "Continuous Integration (CI)"
- Use standard punctuation — it reduces ambiguity

**Interpret charitably:**
- "This code bad" probably means "I think this code has a problem, and I'm writing quickly"
- Missing articles ("please add test") are brevity, not rudeness
- Abrupt tone in non-native speakers is often translation residue, not aggression

**When writing to non-native speakers:**
- Avoid sarcasm (it does not survive text-only communication across cultures)
- Be explicit: "I am requesting a change" instead of "It might be nice to..."
- Confirm understanding: "Does that make sense?" or "Let me know if that's unclear"

### Responding to Automated Bot Reviews

Modern projects use bots for initial triage. Treat bot output as non-negotiable in form, negotiable in substance.

- **Dependabot / Renovate**: Version bump PRs. If CI passes, LGTM and merge. If it fails, check the changelog for breaking changes before commenting.
- **GitHub Actions bot (size label, stale bot, etc.)**: These are informational. You usually cannot override them — just note the label in your reply.
- **Code quality bots (CodeQL, SonarCloud, Lintr)**: Address every finding. If you believe it's a false positive, leave a comment explaining why (with a reference link) and mark the thread as resolved.
- **Formatting bots (Prettier, Ruff formatter, gofmt)**: Run the formatter. Do not argue with formatting bots — there is no upside.
- **Test coverage bots**: If coverage drops, add tests before asking for re-review. "Coverage is low but the code is correct" is a losing argument in most projects.

> Rule of thumb: Bot comments are the *floor* for quality. Thank the bot (even if silently) and move on. Never argue with automation in public — it projects carelessness.

### Review Expectations by Project Size

| Project size | Example | Review cadence | What's expected |
|-------------|---------|----------------|-----------------|
| Tiny (1-2 maintainers) | Personal tools, small libs | Days to weeks | Self-contained, well-documented changes. Maintainers know the whole codebase by heart |
| Small (3-10 contributors) | Mid-size OSS libraries | 1-3 days | Follow CONTRIBUTING.md, write tests, keep PR scope narrow |
| Medium (10-100 contributors) | Popular frameworks, tools | 24-48 hours | CI must be green. Squash commits. Reference tracking issues |
| Large (100+ contributors) | Kubernetes, React, Django | Hours to 1 day | Sign CLA. Follow the PR template exactly. Expect multiple rounds. Read the mailing list / Discord before posting |
| Mega (corporate-backed) | VS Code, .NET, Linux | Variable | Signed commits, DCO, complex CI matrix, multiple area experts. One reviewer owns the merge — don't chase others |

**Key insight for large projects**: The larger the project, the *less* personal the review. A Kubernetes reviewer who says "this needs a unit test" is enforcing project norms, not judging you. Maintainers on large projects review 10-50 PRs a week; they do not remember yours. Be polite, be precise, and don't take it personally.

### Reviewer Archetypes and Interaction Patterns

Beyond cultural differences, individual reviewers have recognizable patterns. Identifying the archetype early helps you calibrate your response.

**The Architect**
- Reviews at the system design level, not line-by-line
- Asks about trade-offs, scaling, failure modes
- Often skips formatting/style comments entirely
- **How to respond**: Engage at the design level. Show you've considered alternatives. Reference architectural decision records (ADRs) if the project has them.

**The Tester**
- Every comment asks about test coverage
- Wants to see error paths, edge cases, concurrent access scenarios
- "What happens if the network fails in the middle of this?"
- **How to respond**: Add the test first, then reply. "Added a test for [edge case] — here's what happens..."

**The Stylist**
- Comments on formatting, naming, import ordering
- Often cites the project's style guide or linter config
- May leave 30 comments that are all nits
- **How to respond**: Batch them. "Addressed all style feedback in a single commit." Don't argue about tabs vs spaces.

**The Safety Net**
- Focuses on error handling, input validation, security
- Asks "what if X is None?" or "what about untrusted input?"
- Their reviews make the code more robust
- **How to respond**: Fix the gap and thank them. "Good catch — added validation for that input path."

**The Historian**
- References past decisions, previous PRs, and mailing list threads
- "We discussed this in #342 and decided against it because..."
- **How to respond**: Read the linked issue. If the context has changed, explain how. If not, respect the prior decision.

**The Minimalist**
- Leaves 1-3 comments total, often just LGTM or a single concern
- Does not engage in extended discussion
- **How to respond**: Address their concern directly. If they LGTM, stop and wait — don't add scope.

### First-Time Contributor Checklist

Before submitting your first PR to an unfamiliar project, run through this checklist:

**Pre-submission:**
- [ ] Read CONTRIBUTING.md completely
- [ ] Read the project's CODE_OF_CONDUCT.md
- [ ] Looked at 3-5 recently merged PRs to understand review style and expectations
- [ ] Checked if the project requires a CLA or DCO sign-off
- [ ] Searched issues and existing PRs to avoid duplicate work
- [ ] Verified the project accepts contributions (some repos are mirrors or read-only)
- [ ] Checked if there is a development setup guide (dev container, Makefile, etc.)
- [ ] Run the linter and test suite locally before pushing

**During review:**
- [ ] Responded to every review comment
- [ ] Pushed fixup commits (not squashed) for each round
- [ ] Kept the PR description updated with what changed
- [ ] Did not @-mention additional people unless asked
- [ ] Asked for clarification if feedback was unclear
- [ ] Bumped politely after 5 days of inactivity

**Post-merge:**
- [ ] Thanked the reviewer(s)
- [ ] Deleted the branch
- [ ] Added the experience to your personal contribution log

### Responding to Specific Feedback Formats

Different projects use different review workflows. Here is how to handle each:

**GitHub Review Threads:**
- Reply directly in each thread. This keeps the conversation organized.
- When you push a fix, reply "Fixed in `abc123`" with a link to the commit.
- Resolve conversations only after the reviewer marks them resolved, unless the project convention says otherwise.
- Use the "Re-request review" button after pushing changes — do not @-mention.

**Gerrit / Patch Sets:**
- Each patch set is a full re-upload. Do not create a new change for each revision.
- Reply inline with `#comments` notation.
- Mark each comment as "Done" in the reply when addressed.
- Upload a new patch set only after addressing all open comments.

**Phabricator / Differential:**
- Similar to Gerrit: each "diff" is a revision.
- Use "Reply" in each inline comment.
- Plan changes and then "Request Review" again.
- Abandon and restart only if the approach fundamentally changes.

**Email Patch (Linux kernel, some GNU projects):**
- Reply-to-all with inline quotes.
- Use `[PATCH v2]`, `[PATCH v3]` in subject lines for revisions.
- Include a changelog between `---` and the diff.
- Do not top-post; interleave your replies with the reviewer's quotes.

### Handling Common Review Scenarios

**Scenario 1: Reviewer asks you to split the PR**
```markdown
> This PR does two things. Please split it.
```
**Response:** Split into separate PRs, reference them from each other. "Split into PR #X (refactor) and PR #Y (feature). This PR now only covers [scope]."

**Scenario 2: Reviewer challenges your approach entirely**
```markdown
> I don't think this is the right way to solve this problem.
```
**Response:** "Could you help me understand what approach you have in mind? I chose this direction because [reason]. If there's a better way, I'm happy to pivot."

**Scenario 3: CI fails on your branch**
```markdown
> CI is red.
```
**Response:** Identify the failure, fix it, push. "CI was failing due to [reason]. Fixed in commit abc123. All checks passing now."

**Scenario 4: Reviewer asks for changes you already made**
```markdown
> Please add error handling for the network timeout case.
```
(You already did this in a previous commit.) **Response:** "Already handled in commit abc123 — here's the relevant code: [snippet]. Let me know if you'd like additional coverage there."

**Scenario 5: Long thread that is going in circles**
```markdown
> [10 comments back and forth with no resolution]
```
**Response:** "I think we may be going in circles here. Let me summarize where we agree and what the remaining open question is, then let the maintainers decide."
Suggested compromise: implement the safer option and add a TODO comment.

### Sustaining a Reputation Over Time

One good PR does not make a reputation. Consistency does.

**The compounding effect of good reviews:**
- PR #1: You respond well, fix everything, merge cleanly. Reviewer thinks: "competent contributor."
- PR #2: Same behavior. Reviewer thinks: "reliable contributor."
- PR #3: You catch a bug the reviewer missed in the review. Review now thinks: "this person is an asset."
- PR #10: Reviewer trusts your code and may merge without reviewing every line.
- PR #20: You become a candidate for maintainer.

**The compounding effect of bad reviews:**
- PR #1: You argue with feedback. Reviewer thinks: "difficult contributor."
- PR #2: Same behavior. Reviewer now avoids assigning your PRs to themselves.
- PR #3: Your PR sits unreviewed because nobody wants the interaction.
- PR #5: Your PR is closed for inactivity. You blame the project. The project moves on.

**Practical tips for long-term reputation:**
- Volunteer to review other contributors' PRs. Reviewing gives you insight into project standards and builds goodwill with maintainers.
- Fix bugs you find while reading the codebase, even if unrelated to your PR. File them as a separate small PR with "While working on X, I noticed Y."
- Be helpful in project discussions (issues, Discord, mailing list). Answer questions from newer contributors.
- When you make a mistake, own it publicly. "I missed that case — thanks for catching it. Fix incoming." This builds more trust than never making mistakes.
- Tag your PRs with good descriptions. Maintainers skim dozens of PR titles a day; "fix bug" is unhelpful; "fix: handle empty response in auth middleware" is useful.

---

*Last updated: May 2026*
*Purpose: Professional communication during code review — a universal guide for any open source project*
*Note: These patterns are based on real review experiences across multiple open source projects and are designed to be adapted to any project's conventions.*
