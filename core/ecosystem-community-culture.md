# OSS Community Culture & Communication — Universal Reference

> A comprehensive guide to open-source community norms, etiquette, conflict resolution,
> inclusivity practices, metrics, and operational templates. This document serves as a
> reference for maintainers, community managers, contributors, and anyone seeking to
> understand or build healthy OSS communities.

---

## Table of Contents

1. [Part 1: The Culture of Open Source](#part-1-the-culture-of-open-source)
2. [Part 2: Communication Norms by Platform](#part-2-communication-norms-by-platform)
3. [Part 3: Community Roles & Responsibilities](#part-3-community-roles--responsibilities)
4. [Part 4: Conflict Resolution in OSS](#part-4-conflict-resolution-in-oss)
5. [Part 5: Building Inclusive Communities](#part-5-building-inclusive-communities)
6. [Part 6: Community Etiquette Guide](#part-6-community-etiquette-guide)
7. [Part 7: Community Metrics & Health](#part-7-community-metrics--health)
8. [Part 8: Templates](#part-8-templates)

---

## Part 1: The Culture of Open Source

### 1.1 Origins of OSS Culture

Open-source software (OSS) culture did not emerge in a vacuum. It draws from several intellectual and social traditions that predate the term "open source" itself.

#### 1.1.1 The Hacker Ethic

The term "hacker" originally described someone who explores systems, solves problems with ingenuity, and shares knowledge freely. The hacker ethic, articulated by Steven Levy in *Hackers: Heroes of the Computer Revolution* (1984), includes these tenets:

- **Access to computers — and anything that might teach you something about how the world works — should be unlimited and total.** Always yield to the Hands-On Imperative.
- **All information should be free.** Sharing knowledge is a moral imperative. Hoarding information is antisocial.
- **Mistrust authority — promote decentralization.** The best way to judge a system is by using it, not by deferring to its creators.
- **Hackers should be judged by their hacking, not by bogus criteria** such as degrees, age, race, or position.
- **You can create art and beauty on a computer.** Code can be elegant, surprising, and aesthetically pleasing.
- **Computers can change your life for the better.** The act of creating software is intrinsically rewarding.

These principles directly shaped how early open-source communities operated: judgment by technical merit, distrust of centralized gatekeeping, and an ethos of generosity with knowledge.

#### 1.1.2 The Gift Economy

Open source operates largely as a **gift economy**. Participants give their work away without immediate expectation of return. The "currency" is reputation, recognition, and reciprocal contribution:

| Economic Model | Characteristics | OSS Equivalent |
|---|---|---|
| Market economy | Exchange of goods for money | Paid support, consulting, enterprise features |
| Gift economy | Exchange of gifts for status/relationships | Code contributions, reviews, documentation |
| Sharing economy | Shared access to underutilized assets | Shared CI infrastructure, package registries |

In a gift economy, value accrues to those who give the most strategically:
- Contributing to high-profile projects builds reputation faster.
- Reviewing others' code creates reciprocal obligation.
- Mentoring newcomers expands the contributor base and cements leadership.

**Case Study: Linux Kernel Mailing List (LKML)**

The Linux kernel community exemplifies gift-economy dynamics. Linus Torvalds does not pay most contributors — they contribute because they need the kernel to work well for their use case, because they want recognition from peers, or because they enjoy the technical challenge. The "currency" is `Reviewed-by`, `Acked-by`, and `Signed-off-by` tags in commit messages — these signal provenance and peer validation.

#### 1.1.3 Meritocracy — and Its Criticisms

Early OSS communities described themselves as **meritocracies**: those with the most skill and contribution earn the most influence. The Apache Software Foundation formalized this as "merit-based community" — you earn your way in through contribution.

**Where meritocracy works:**
- Technical decisions are made by those who write the code.
- Anyone can earn influence regardless of background.
- Seniority matters less than demonstrated ability.

**Where meritocracy fails:**
- **The meritocracy bias:** People with more free time, better education, or fewer caregiving responsibilities naturally accumulate more merit. This systematically excludes marginalized groups.
- **The bus factor:** When merit concentrates in a few individuals, the project becomes fragile.
- **Merit ignores soft skills:** A brilliant coder who drives away contributors with abrasive communication is still technically harmful to the project.

**Modern view:** Most communities now speak of inclusive meritocracy or contribution-based governance — they explicitly acknowledge that participation barriers exist and work to remove them while still rewarding contribution quality.

### 1.2 How Different Communities Evolved Different Cultures

Not all OSS communities are alike. Their cultures are shaped by:

- **The project founding personality** (e.g., Linus Torvalds bluntness in Linux, Guido van Rossum BDFL style in Python, DHH opinionated approach in Rails).
- **The problem domain** (security projects tend toward conservatism; experimental research projects embrace rapid churn).
- **The corporate backer** (CNCF projects often have formal governance; individual hobby projects are more informal).
- **Language and geographic community** (Japanese open-source communities tend toward more formal communication; Nordic communities toward directness).

#### 1.2.1 Culture Spectrum

Informal/chatty versus formal/process-heavy. Examples:

| Project | Culture Style | Communication | Decision Making |
|---|---|---|---|
| Vue.js | Warm, inclusive, Evan You-led | Discord, GitHub Discussions | BDFL + core team consensus |
| Kubernetes | Formal, process-driven, SIGs | Mailing lists, weekly video meetings | SIG leads + TOC voting |
| curl | Pragmatic, Daniel Stenberg-led | Mailing list, GitHub Issues | BDFL |
| TensorFlow | Corporate-guided, Google-backed | GitHub Issues, RFC process | Google-internal + community input |
| Homebrew | Friendly, detailed CONTRIBUTING | GitHub Issues/PRs, maintainer chat | Maintainer consensus |
| NixOS | Academic, design-discussion heavy | Discourse, GitHub, Matrix | RFC process + core team |
| WordPress | Large, diverse ecosystem | Slack, forums, Trac, make blogs | Core committer team |

### 1.3 The Shift from Email/IRC to Modern Platforms

#### 1.3.1 The IRC Era (1990s-early 2010s)

Internet Relay Chat was the original real-time communication backbone of open source.

**IRC norms:**
- Join channel, lurk for a while, learn the culture before speaking.
- Use pastebin for code snippets (no inline code blocks).
- /me for actions, /msg for private queries (used sparingly).
- Do not ping users unless urgent — IRC etiquette discouraged @mentions because they triggered notifications on every client.
- Relevant nick — if you had a question, you waited for someone who could answer.

**Why IRC declined:**
- No persistent history (unless you ran a bouncer).
- No threading — conversations interleaved chaotically.
- No file/image sharing built-in.
- Onboarding friction (needed an IRC client, server, channel registration).

#### 1.3.2 The Mailing List Era

Mailing lists were the backbone of asynchronous collaboration.

**Mailing list norms:**
- Top-posting vs bottom-posting (endless holy war). Conventions varied by community.
- Plain text, please — HTML email was rejected by many lists.
- Reply-all is the default: responses should stay on-list unless sensitive.
- Trim quoted replies: only include the relevant portion of the parent message.
- [PATCH] subject prefixes for code submissions.
- Archives are forever — anything sent to a public list is permanent.

**Lingering mailing list communities:** Linux kernel, Apache Software Foundation, FreeBSD, Debian, IETF working groups.

#### 1.3.3 Feature Comparison Table

| Feature | IRC | Mailing Lists | Discord/Slack | GitHub Discussions |
|---|---|---|---|---|
| Persistent history | No (bouncer needed) | Yes | Yes | Yes |
| Threading | No | No (response chains) | Yes (threads) | Yes |
| Code formatting | No (pastebin) | No (inline) | Yes (fenced blocks) | Yes (full markdown) |
| Search | No | Yes (archives) | Yes (with limits) | Yes |
| File sharing | No | No (attachments) | Yes | Yes (limited) |
| Reactions/emotes | No | No | Yes | Yes |
| Bots/automation | Yes (limited) | No | Yes (extensive) | No |
| Onboarding friction | High | Low | Medium | Low |
| Accessibility | Low | High (screen-readers) | Medium | High |

### 1.4 Cultural Tensions in OSS

Every OSS community navigates persistent tensions:

#### 1.4.1 Speed vs. Thoroughness

| Speed advocates say | Thoroughness advocates say |
|---|---|
| Ship early, ship often. | Measure twice, cut once. |
| Release now, fix bugs later. | Code quality is non-negotiable. |
| MVP validates the idea. | MVP creates technical debt. |

**Resolution patterns:**
- Linux kernel: Release early, release often for development kernels; rigorous stabilization for LTS releases.
- Rust language: Long RFC process, nightly feature gates, gradual stabilization.
- Dependabot-style automation: Speed up dependency updates while keeping review thorough.

#### 1.4.2 Features vs. Stability

| Pro-feature | Pro-stability |
|---|---|
| Add value for users. | Do not break existing workflows. |
| Stay competitive. | Reliability is the number one feature. |
| Experiment and innovate. | APIs are forever — get them right. |

**Resolution patterns:**
- Semantic versioning (MAJOR.MINOR.PATCH) allows both — new features in minor versions, stability in patch versions.
- Feature flags and experimental opt-ins (e.g., Python __future__ imports, Kubernetes alpha/beta/GA stages).
- Long-term support releases alongside development tracks.

#### 1.4.3 Commercial vs. Community Interests

**Case Study: Terraform vs OpenTofu**

In 2023, HashiCorp changed Terraform license from MPL 2.0 to BUSL (Business Source License). This triggered a fork — OpenTofu — backed by a coalition of companies. The community split: some stayed with HashiCorp version, others migrated to the open-source fork. This illustrated the fragility of company-led open source and the importance of neutral governance foundations.

**Lessons learned:**
- Foundation-backed projects (CNCF, ASF, Linux Foundation) have stronger governance guarantees.
- Clear license commitments (e.g., irrevocable patent grant) build trust.
- When a project is critical infrastructure, the community may fork if trust breaks.

#### 1.4.4 Documentation vs. Code

| Documentation-first | Code-first |
|---|---|
| Docs are the product. | Code is the product. |
| If it is not documented, it does not exist. | Self-documenting code is ideal. |
| Examples drive adoption. | Tests are the best documentation. |

**Healthy resolution:** Treat documentation changes as equal in value to code changes. Gate feature acceptance on docs being written. Recognize documentation contributors in release notes.

### 1.5 The Unwritten Rules of Every OSS Community

These rules are rarely written down but are enforced by community response:

#### 1.5.1 Read the Room (Lurk Before Speaking)

Join the communication channel, read recent conversations, understand the tone and norms before posting. First impressions matter.

**When you do not lurk:** A newcomer gives an opinion on a controversial architectural decision the community has been debating for 6 months.

**When you lurk:** You read 3 months of archives, understand the tradeoffs, and post a well-informed proposal.

#### 1.5.2 Use the Right Channel

- Bug report -> GitHub Issues (not Discord, not Twitter).
- Question -> Stack Overflow, GitHub Discussions, or forum (not a direct DM to a maintainer).
- Feature idea -> GitHub Discussions or RFC process (not an untested 2000-line PR).
- Casual chat -> Discord general channel.

#### 1.5.3 Show Your Work

Before asking for help, demonstrate that you have tried:
1. Read the documentation.
2. Searched existing issues and discussions.
3. Tried a minimal reproduction.
4. Read error messages carefully.

**Good question:** I am getting EACCES when running npm install in /tmp/test-repo. I tried npm cache clean and rm -rf node_modules but the error persists. Full error log: [link]. Node v18.15, npm 9.5.

**Bad question:** npm install does not work, plz help.

#### 1.5.4 Assume Good Faith

Unless there is clear evidence otherwise, assume that other participants are acting in good faith. They want the project to succeed, even if you disagree on how to get there. Correct the idea, not the person.

#### 1.5.5 Respect Maintainer Time

Maintainers are almost always unpaid volunteers. They have jobs, families, and lives outside the project. Before pinging or @-mentioning them: have you exhausted self-help options? Is this an urgent security issue? Is this blocking other work?

**The Maintainer Day perspective:**
- 50+ notifications per day across issues, PRs, discussions, and chat.
- Each @maintainer ping pulls them away from other work.
- Every well-formed question they do not have to ask saves 5-10 minutes.

#### 1.5.6 The No Is Not Permanent

A rejected PR does not mean the project is hostile. It may mean the approach does not fit the architecture, the timing is not right, the feature is out of scope, or the maintainer is too busy.

**What to do after rejection:**
1. Understand why the change was rejected (ask politely if unclear).
2. Consider alternative approaches.
3. Build it as a plugin/extension/fork.
4. Come back later with a revised proposal.

### 1.6 How Culture Affects Contribution and Retention

#### 1.6.1 The Contribution Funnel

Awareness -> Interest -> First Contribution -> Repeat Contributor -> Maintainer

Each stage has drop-off. Culture determines the drop-off rate.

**Where culture kills retention:**

| Problem | Symptom | Effect on Retention |
|---|---|---|
| Hostile code reviews | This code is awful, rewrite it. | 90%+ never submit again |
| Unresponsive maintainers | PR sits for 6 months | Contributor feels ignored |
| Bureaucratic overhead | 5 steps before first commit | Contributor goes elsewhere |
| Clique culture | Inside jokes, obscure acronyms | Newcomer feels excluded |
| Entitlement from users | Fix this NOW! | Maintainers burn out |
| Lack of recognition | No release notes, no thank-yous | Contributors feel unvalued |

#### 1.6.2 Case Study: Django Girls Effect

Django community invested heavily in onboarding through Django Girls workshops, beginner-friendly documentation, a Code of Conduct enforced early and consistently, Django Fellowship program (paid part-time maintainers), and a mailing list culture of patience.

**Result:** Django consistently ranks high in contributor diversity and retention surveys.

#### 1.6.3 Case Study: Node.js Fork (2014)

Node.js was governed by Joyent with a small group of core contributors. The community felt contributions were ignored, releases were delayed, and governance was opaque. The community forked io.js with an open governance model, attracting 23 of 25 core contributors within days.

**Resolution:** Joyent agreed to form the Node.js Foundation (now OpenJS Foundation). The projects merged back under open governance.

**Lesson:** When community trust breaks, even a dominant project can be forked. Healthy culture is not optional — it is a risk management strategy.

---

## Part 2: Communication Norms by Platform

### 2.1 GitHub Issues

GitHub Issues are the primary bug-tracking and task-management surface for most OSS projects.

#### 2.1.1 When to Open an Issue

**Open an issue for:** Bug reports (with reproduction steps), feature requests (after searching for duplicates), documentation improvements, questions that do not fit Discussions or Stack Overflow, security vulnerabilities (privately via security policy).

**Do NOT open an issue for:** Personal support requests (use Discussions or Stack Overflow), when is the next release (check the milestone or release page), spam/rants/off-topic discussion, pull requests (open a PR instead).

#### 2.1.2 How to Title Issues

| Bad Title | Good Title |
|---|---|
| It does not work | AssertionError when parsing malformed XML in v2.1.0 |
| Feature request | Add rate-limiting support for API client |
| Bug | Crash on empty input when using --verbose flag |
| Question about something | How does the caching layer handle stale entries? |
| Help me | Connection timeout with PostgreSQL when using SSL |

**Title format conventions:**

| Project Type | Convention | Example |
|---|---|---|
| Language/framework | [Version] component: summary | [2.x] Router: Route matching fails for nested groups |
| Web framework | type(component): summary | fix(auth): session timeout not clearing cookie |
| Dev tool | summary with reproduction hint | build: Makefile target clean fails when build dir is missing |
| Library | method/class: problem | Array.map() throws on sparse arrays when callback is async |
| Infrastructure | [component] description | [kubelet] Node status stuck at NotReady after reboot |

#### 2.1.3 Reproduction Cases

A reproduction case is the single most important element of a bug report. Without it, the maintainer cannot verify the bug exists or that a fix works.

**Elements of a great reproduction:**
1. Minimal — strip irrelevant code.
2. Complete — can be copied and run as-is.
3. Includes expected vs actual behavior.
4. Specifies version, environment (OS, runtime, dependencies).
5. Includes error output (full traceback, not just the last line).

**Template for bug reports:**
```markdown
## Description
[Clear, concise description of the bug]

## Steps to Reproduce
1. [Set up environment]
2. [Run command / call function]
3. [Observe error]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., macOS 14.3, Ubuntu 22.04, Windows 11]
- Runtime: [e.g., Python 3.12, Node 20.11, Go 1.22]
- Package version: [e.g., v2.1.0, commit abc1234]

## Reproduction
[Link to a gist/repo, or paste minimal reproduction]
```

#### 2.1.4 Labels and Triaging

Common label taxonomy:

| Category | Labels | Purpose |
|---|---|---|
| Type | bug, enhancement, feature-request, question, documentation, discussion | What kind of issue |
| Status | needs-triage, confirmed, in-progress, blocked, wontfix, duplicate | Current state |
| Priority | critical, high, medium, low, P0-P5 | Urgency |
| Difficulty | good-first-issue, help-wanted, expert-only | Skill level needed |
| Area | auth, networking, build, docs, api, cli | Which part of the project |
| Platform | windows, macos, linux, arm64, web | Environment-specific |
| Needs info | needs-reproduction, needs-more-info | Incomplete report |

#### 2.1.5 Issue Etiquette

**As the reporter:** Search existing issues before opening a new one. Respond promptly to requests for more information. Close the issue if you find the solution yourself. Do not bump issues. Do not demand attention.

**As a commenter:** Reaction emojis are fine. +1 comments are noise. Only comment if you have new information or a constructive perspective. Do not derail issues with tangential discussion.

**As a maintainer:** Acknowledge issues promptly. Set labels and milestones to communicate triage decisions. Close issues that are out of scope with a brief explanation. Lock or hide comments on issues that attract unproductive discussion.

### 2.2 GitHub Discussions

GitHub Discussions is a forum-like space for conversations that do not fit the strict issue/PR workflow.

#### 2.2.1 Discussion Categories

| Category | Purpose |
|---|---|
| Ideas | Feature proposals and suggestions |
| Q&A | Questions about using the project |
| General | Off-topic or community chat |
| Show and Tell | Share projects built with this tool |
| Announcements | Official project news (post-only for maintainers) |
| Polls | Community polls and surveys |

#### 2.2.2 Q&A Best Practices

**For askers:** Search first. Show what you have tried. Provide code examples, error output, and environment details. Mark the answer that solved your problem as accepted.

**For answerers:** Be patient. Explain why the solution works, not just what to type. Point to relevant documentation. If the question reveals a documentation gap, open an issue about it.

#### 2.2.3 Ideas Best Practices

**Proposing an idea:** Explain the problem you want to solve, not just the solution. Describe how the feature would work with examples. Discuss alternatives you considered. Ask whether it fits within project scope.

**Responding to ideas:** Evaluate on merit, not on who proposed it. Point out technical constraints. Suggest simplifications. If out of scope, explain why politely.

#### 2.2.4 Polls in Discussions

**Best practices:** Keep options mutually exclusive. Include Neither/Other when appropriate. Run polls for a set duration (7-14 days). State what the poll will be used for (binding vote, temperature check, etc.).

### 2.3 Pull Requests

Pull Requests are the mechanism for proposing code changes. They are also a social interaction requiring care on both sides.

#### 2.3.1 PR Description Format

A well-written PR description answers three questions: What does this change do? Why is this change needed? How was this change tested?

**Template:**
```markdown
## Summary
[One paragraph describing the change]

## Related Issues
Closes #123, #456

## Changes
- Specific change 1
- Specific change 2

## Testing
- Unit tests added/updated
- Integration tests pass
- Manual testing steps documented

## Checklist
- I have read the CONTRIBUTING guide
- My code follows the project style
- Documentation has been updated
- Changelog entry added
```

#### 2.3.2 Responding to Reviews

1. **Thank the reviewer** for their time.
2. **Address each comment.** Even if you disagree, acknowledge it.
3. **If you agree:** make the change, mark as resolved.
4. **If you disagree:** explain your reasoning respectfully.
5. **If unclear:** ask for clarification.
6. **Do not take criticism personally.**
7. **Push fixes as separate commits.**

**Bad responses:** I disagree. This is fine as-is. That is not how I would do it.
**Good responses:** Good catch, I have updated the error handling. I considered that approach but went with this because... You are right, that is a better pattern.

#### 2.3.3 Thread Etiquette

Keep discussions focused on the code. If a thread goes beyond 5-10 comments, consider moving to a video call. Maintainers: step in and redirect if a thread gets heated. Use Request Changes sparingly. If a PR is too large, ask the author to split it.

#### 2.3.4 The Nitpick Convention

Nit or Nitpick signals that the comment is minor and not blocking.

**Nit pattern:** Nit: Could you rename process_data() to transform_dataset() to be more descriptive? Feel free to ignore if you disagree.

### 2.4 Discord / Slack

#### 2.4.1 Channel Structure

- ANNOUNCEMENTS (read-only)
- GENERAL / INTRODUCE-YOURSELF
- HELP / SUPPORT (beginner-help, advanced-topics)
- CONTRIBUTION / DEVELOPMENT (code-reviews, design-discussions)
- PROJECT AREAS (frontend, backend, docs, devops)
- COMMUNITY (showcase, random, events, jobs)
- VOICE (General VC, Pair Programming)

#### 2.4.2 @Mentions and Pings

| Mention Type | When to Use | When NOT to Use |
|---|---|---|
| @username | Direct response to a question | Asking a question in general |
| @role (maintainers) | Urgent security or blocking issue | Casual questions |
| @everyone / @here | Almost never, emergencies only | Announcements |
| @mods | Harassment, rule violation | Someone disagreed with me |

#### 2.4.3 DMs (Direct Messages)

**When to DM:** Sharing sensitive information, conversation is cluttering a channel, person says DM me.
**When NOT to DM:** Support questions (use a channel), to ask Can I ask you a question, to complain about another member, to solicit maintainer attention.

#### 2.4.4 Community vs Project Channels

| Aspect | Community Server | Project Server |
|---|---|---|
| Audience | Users, enthusiasts, contributors | Core contributors, maintainers |
| Tone | Casual, welcoming | Professional, focused |
| Topics | Usage, showcase, general | Development, design, releases |
| Access | Open to all | By invitation or contribution level |

### 2.5 Mailing Lists

#### 2.5.1 Archives

Everything sent to a mailing list is archived permanently. Assume every email will be read by future generations. Redact sensitive information. Some projects require archiving as a governance condition.

#### 2.5.2 Threading

Always use Reply (not New Message) to continue a thread. Change the subject only if the topic genuinely shifts. Never start a new thread for a follow-up. Use [PATCH v2], [PATCH v3] for revised patch series.

#### 2.5.3 Reply-to-All Etiquette

Reply All to keep discussion on-list (usually the right choice). Reply to sender if personal or sensitive. Never reply to spam on-list. Trim your reply.

**Top-posting vs bottom-posting:** Bottom-posting (replying below quoted text) is the traditional convention. Top-posting is common in corporate email but disliked on many OSS lists. Interleaved posting is best for detailed discussions.

### 2.6 Forum Culture (Discourse)

#### 2.6.1 Categories

- Using the Project: Installation, How-To, Troubleshooting
- Contributing: Development, Documentation, Design, Translations
- Community: Introductions, Show and Tell, Events, Off-Topic
- Project Governance: RFCs, Voting, Team Updates

#### 2.6.2 Solved Tags

Marking a topic as Solved reduces repetitive questions. OP clicks Solved on the helpful reply. The topic gets a badge. Search ranking increases.

#### 2.6.3 Search-First Culture

Before posting: search the forum, search the web (site:forum.example.com), check the project documentation.

#### 2.6.4 Discourse Best Practices

| Practice | Why It Matters |
|---|---|
| Use descriptive topic titles | Helps in search results |
| Split off-topic replies | Keeps threads focused |
| Use the like button instead of +1 | Reduces noise |
| Edit your post instead of correcting | Keeps thread clean |
| Add tags to your topic | Improves discoverability |

### 2.7 Video Calls

#### 2.7.1 Meeting Etiquette

**Before:** Read agenda, test audio/video/internet, set up in quiet environment, join on time.
**During:** Mute when not speaking, use Raise Hand, state your name, keep comments concise, use chat for links.
**After:** Review action items, post meeting notes within 24 hours, follow up on commitments.

#### 2.7.2 Recording

Record by default. Mention recording at the start. Post to archive for absent members. Auto-generate transcripts for accessibility. Allow participants to turn off camera. Delete after 6-12 months unless governance requires retention.

#### 2.7.3 Timezone Rotation

For global projects, rotate meeting times:
- Week 1: Asia-Pacific friendly (08:00 UTC)
- Week 2: Americas friendly (16:00 UTC)
- Week 3: EMEA friendly (12:00 UTC)
- Week 4: Rotating

#### 2.7.4 Decision-Making in Meetings

**Async-first rule:** If a decision can be made asynchronously, it should be. Meetings are for resolving blocking disagreements, brainstorming, social connection, and time-sensitive coordination.

**Consent Agenda format:** Proposal distributed in advance, review period before meeting, discussion limited to unresolved concerns, decision recorded with rationale.

### 2.8 Platform Comparison Table

| Platform | Best For | Worst For | Signal-to-Noise |
|---|---|---|---|
| GitHub Issues | Bug tracking, task management | Open-ended discussion | High |
| GitHub Discussions | Q&A, feature ideas, polls | Urgent bugs, real-time chat | Medium-High |
| Pull Requests | Code review, concrete proposals | Design exploration | High |
| Discord/Slack | Real-time chat, quick questions | Archival reference | Low-Medium |
| Mailing Lists | Depth discussion, decisions, RFCs | Quick questions, casual chat | Medium |
| Discourse | Long-form discussion, knowledge base | Urgent issues | High |
| Video Calls | Brainstorming, conflict resolution | Async work, documentation | Medium |
| Stack Overflow | Specific technical Q&A | General discussion | Very High |
| Social Media | Announcements, awareness | Technical discussion | Low |
| Wiki | Reference docs, FAQ, onboarding | Discussion, decision-making | High |
| Blog/Newsletter | Deep dives, release notes | Urgent communication | High |

---

## Part 3: Community Roles & Responsibilities

### 3.1 User

#### 3.1.1 Responsibilities

1. Report issues constructively. Follow the bug report template.
2. Respect maintainer time. Check existing issues and documentation first.
3. Give back where possible. Answer questions, improve docs, sponsor.
4. Comply with the license. Respect attribution and copyleft obligations.
5. Be civil. The people behind the software are humans too.

#### 3.1.2 Communication Style

- **Approach:** Ask questions humbly. Show you have tried to find answers.
- **Tone:** Grateful and respectful.
- **Scope:** One issue per report. One question per thread.

### 3.2 Contributor

#### 3.2.1 Responsibilities

1. Follow the project CONTRIBUTING guide.
2. Communicate intent before writing code.
3. Write tests for new code or bug fixes.
4. Update documentation.
5. Respond to review feedback promptly.
6. Respect the project coding style.
7. If rejected, ask for clarification and consider alternatives.

#### 3.2.2 Communication Style

- **Approach:** Proactive. I would like to work on X rather than Someone should fix X.
- **Tone:** Collaborative. Here is my approach, what do you think?
- **Scope:** Focused on specific contributions. Avoid scope creep.

### 3.3 Triage Team

#### 3.3.1 Responsibilities

1. Acknowledge new issues promptly (24-48 hours SLA).
2. Apply labels (type, priority, component, difficulty).
3. Reproduce bugs or request more information.
4. Close duplicates and link to the original.
5. Close invalid issues with explanation.
6. Identify good-first-issues.
7. Monitor comments for abuse or spam.
8. Escalate complex issues to maintainers.

#### 3.3.2 Communication Style

- **Approach:** Efficient and systematic. Use templates and canned responses.
- **Tone:** Neutral and professional. Diplomacy is essential.
- **Focus:** Keeping the queue manageable so maintainers can focus on code.

### 3.4 Maintainer

#### 3.4.1 Responsibilities

1. Review pull requests in a timely manner.
2. Merge or close PRs with clear justification.
3. Set technical direction for the project.
4. Make releases or coordinate with release manager.
5. Resolve technical disputes with reasoned arguments.
6. Mentor new contributors.
7. Manage project configuration (CI, dependencies, security).
8. Prevent burnout — know when to say no and when to delegate.

#### 3.4.2 Communication Style

- **Approach:** Decisive but open to input. Strong opinions, loosely held.
- **Tone:** Firm on principles, flexible on details.
- **Scope:** Strategic and architectural.

### 3.5 Community Manager

#### 3.5.1 Responsibilities

**Community engagement:** Onboard new members, organize events, manage channels, amplify success stories.
**Conflict resolution:** De-escalate, mediate disputes, enforce CoC, escalate when needed.
**Growth and metrics:** Track health metrics, run surveys, identify barriers, report to core team.
**Documentation:** Maintain community docs, create onboarding materials, document processes.

#### 3.5.2 Communication Style

- **Approach:** Warm, welcoming, inclusive. Seeks to build bridges.
- **Tone:** Diplomatic and empathetic. Neutral in disputes.
- **Scope:** People-focused rather than code-focused.

### 3.6 Core Team

#### 3.6.1 Responsibilities

**Governance:** Define vision/mission/scope, approve major changes, set policies, appoint maintainers.
**Strategy:** Release cadence, roadmap, relationships with other projects and foundations.
**Crisis management:** Security vulnerabilities, brand/trademark issues, legal concerns, final dispute authority.

#### 3.6.2 Communication Style

- **Approach:** Deliberative and transparent. Decisions should be explained.
- **Tone:** Authoritative but not authoritarian. Accountable to the community.
- **Scope:** Strategic. Delegate tactical issues to maintainers.

### 3.7 Role Summary Matrix

| Role | Primary Focus | Merge Rights | Moderation Rights | Selection |
|---|---|---|---|---|
| User | Using the software | No | No | Self-selected |
| Contributor | Submitting improvements | No | No | Self-selected |
| Triage Team | Managing issue queue | No | Limited (lock/close) | Appointed |
| Maintainer | Code review, releases | Yes | Yes (repo-level) | Appointed |
| Community Manager | Community health | Usually no | Yes (community-wide) | Hired or appointed |
| Core Team | Governance, strategy | Yes (full) | Yes (org-wide) | Elected or appointed |

---

## Part 4: Conflict Resolution in OSS

### 4.1 Common Conflict Sources

#### 4.1.1 Design Disagreements

**What it looks like:** We should use approach A / No, approach B is better. Thread grows to 50+ comments. Both parties have valid arguments but different priorities.

**Why it happens:** Different evaluation criteria, different backgrounds, different risk tolerances, ego investment.

**Resolution pattern:**
1. Separate the decision from the people.
2. Agree on evaluation criteria first.
3. Have each side present against those criteria.
4. Neutral party makes a call if consensus cannot be reached.
5. Document the decision and rationale.

#### 4.1.2 Scope Creep

**What it looks like:** A PR that started small now includes a config parser, DI framework, and CLI. Reviewers say This is too much. The author feels unappreciated.

**Resolution pattern:**
1. Acknowledge the effort: I can see you have put a lot of work into this.
2. Explain the value of incremental changes.
3. Help the author split into smaller PRs.
4. If unwilling, close the oversized PR.

#### 4.1.3 Personality Clashes

**Resolution pattern:**
1. Private conversation with each party separately.
2. Establish ground rules for public interactions.
3. Find ways for them to collaborate on non-controversial areas.
4. If persists, ask one or both to take a break.

#### 4.1.4 Entitlement and Negativity

**Resolution pattern:**
1. Do not engage emotionally.
2. Restate the volunteer nature politely.
3. Point to constructive paths: We welcome contributions.
4. Warn about guidelines if behavior continues.
5. Ban if necessary.

#### 4.1.5 Governance Disputes

**Case Study: Node.js/io.js fork (2014).** Community felt contributions ignored, releases delayed, governance opaque. Fork attracted 23 of 25 core contributors. Resolution: Joyent formed Node.js Foundation. Projects merged under open governance.

### 4.2 De-escalation Techniques

**Step Back:** Create a cooling-off period without assigning blame.
**I Hear You:** Validate feelings without necessarily agreeing.
**Common Ground:** Find and emphasize points of agreement.
**Ask Don't Tell:** Replace declarations with curious questions.
**Offline Resolution:** Remove the audience effect by taking it private.

### 4.3 Mediation Process

1. Private intake (separate conversations with each party).
2. Joint mediation session with neutral platform.
3. Each party states perspective without interruption.
4. Summarize and identify shared goals.
5. Brainstorm solutions together.
6. Agree on next steps and document them.
7. Follow up within 1 week.

### 4.4 Foundation Mediation

Escalate to foundation for: legal issues, CoC violations involving core team, governance disputes the project cannot resolve, harassment beyond project capacity, financial misconduct.

### 4.5 Banning and Removal

**Progressive discipline:** Warning -> Temporary suspension (1-7 days) -> Extended suspension (30-90 days) -> Permanent ban.

**Requirements before banning:** Documented policy, evidence, written notice explaining what/why, appeals process, who decided.

### 4.6 Post-Conflict Reconciliation

- Acknowledge resolution publicly if appropriate.
- Reset relationships. Treat each interaction as a fresh start.
- Review what went wrong and fix systemic issues.

### 4.7 Case Studies

**Linus Torvalds 2018:** Announced leave to get assistance with emotions. Kernel adopted CoC. Returned with changed communication style.

**Rust Moderation Team Resignation (2021):** Team resigned over core team overriding enforcement. Resulted in governance review and clearer authority boundaries.

**npm Left-Pad (2016):** Trademark dispute led to package unpublishing breaking thousands of builds. Resulted in changed unpublishing policy.

**Fabric.js BDFL Burnout:** Sole maintainer burned out, handed over to new team. Lesson: succession planning before burnout.

---

## Part 5: Building Inclusive Communities

### 5.1 Code of Conduct

#### 5.1.1 What a Good CoC Includes

| Section | Content |
|---|---|
| Our Pledge | Commitment to harassment-free environment |
| Standards | Acceptable and unacceptable behaviors (concrete) |
| Enforcement | Who enforces, timelines, consequences |
| Scope | Where CoC applies |
| Reporting | Email or form (not public channel) |
| Appeals | How to challenge decisions |
| Attribution | Credit to original source |

#### 5.1.2 Popular CoC Choices

Contributor Covenant v2.1 (400K+ projects), Citizen Code of Conduct (WordPress, Django), Geek Feminism Policy (conferences), Ubuntu Code of Conduct (short, friendly), Apache Incubator CoC (formal, procedural).

#### 5.1.3 Enforcement Process

Report received -> Acknowledgment (24-48 hours) -> Assessment -> Investigation -> Decision -> Notification -> Appeals -> Record keeping.

#### 5.1.4 Common Enforcement Mistakes

| Mistake | Better Approach |
|---|---|
| Public shaming | Handle enforcement privately |
| Slow enforcement | Acknowledge within 24 hours |
| Inconsistent enforcement | Document decisions, review for patterns |
| No follow-up for reporter | Tell outcome without violating privacy |
| Zero tolerance for minor mistakes | Use warnings for first offenses |
| Failure to protect reporters | Investigate retaliation separately |

### 5.2 Onboarding New Contributors

#### 5.2.1 First-Contribution Barriers

| Barrier | Effect | Mitigation |
|---|---|---|
| Complex setup | I spent 3 hours installing deps | Docker dev container, setup scripts |
| No clear starting point | I do not know what to work on | Good-first-issue labels, curated tasks |
| Imposter syndrome | I am not good enough | Mentor program, beginner messaging |
| Unresponsive review | My PR has been sitting for 2 months | SLA for first-time PRs (1 week max) |
| Rejection without explanation | Closed with no comment | Thank contributor, explain why, invite again |

#### 5.2.2 Mentorship and Buddy Systems

**One-on-one mentorship:** Match experienced contributor with newcomer. 1-2 hours/week for 4-8 weeks. Best for complex projects.
**Buddy system:** Assign buddy for first contribution only. Less intensive.

#### 5.2.3 Welcome Workflow

Contributor opens first PR -> Automated welcome comment -> Human review within SLA -> PR merged -> Thank-you message -> Added to CONTRIBUTORS file and release notes.

### 5.3 Recognition Programs

**Contributor spotlights:** Feature a contributor each week/month on blog, social media, newsletter.
**Release shoutouts:** Every release has Thank You section naming contributors.
**Non-code recognition:** Bug Hunter badge, Reviewer of the Month, Doc Writer shoutout, Helping Hand badge.

### 5.4 Events

**Hackathons:** Prepare tasks in advance, have mentors (1 per 3-5 participants), set up cloud dev environments, welcome newcomers, celebrate all contributions, follow up.
**Contributor Summits:** 3-day format: roadmap discussion, working groups, hackathon. Cover travel for those who cannot afford it.
**Conference Meetups:** BoF sessions, social evenings with lightning talks, pre-conference workshops.

### 5.5 Reducing Barriers

**Good-first-issue:** Self-contained, well-scoped (few hours), well-documented, reviewed promptly, low risk.
**Documentation:** CONTRIBUTING.md, README.md, CODE_OF_CONDUCT.md, GOVERNANCE.md. All tested by someone not involved in writing.
**Setup automation:** setup.sh/setup.ps1, Dockerfile, CI verification, Makefile.
**Language:** Clear simple English, i18n for key docs, accept contributions in any language, avoid idioms.

### 5.6 Measuring Inclusivity

Track demographics: gender, geographic region, native language, employment status, age range, years of experience. Collect via anonymous annual survey. Never require this for participation.

Monitor retention by group. If a group has lower retention, investigate barriers. Consider intersectionality — different barriers compound. Protect data privacy.

---

## Part 6: Community Etiquette Guide

### 6.1 How to Ask Technical Questions

**Before you ask:** Google it, search issue tracker, search forum, check FAQ, try to solve yourself.
**The XY Problem:** Ask about your actual problem (X), not your attempted solution (Y).
**Smart Questions Framework:**
1. Use a meaningful subject line.
2. State the problem clearly.
3. Provide relevant context.
4. Be precise, not vague.
5. Proofread.
6. Be patient.
7. Follow up when you find the solution.

### 6.2 How to Respond to Questions

**Teach a person to fish:** Explain why the solution works, not just what to do. Guide incomplete questions toward better ones. Say I do not know when you do not. Never guess.

**Don't be a Help Vampire:** Give explanations, not just commands. Link to relevant docs. Be patient with beginners.

### 6.3 How to Disagree in Code Review

- Disagree with the code, not the person.
- Provide evidence (docs, benchmarks, counterexamples).
- Offer alternatives, not just criticism.
- Use the Why approach: ask questions that lead to conclusions.
- Consider a video call for complex disagreements.

### 6.4 How to Give Constructive Feedback

**Feedback sandwich:** Positive opening, specific actionable criticism, encouraging close.
**Be specific:** Not This could be better but Rename x to retry_count.
**Use I statements:** I find this confusing, I think we should consider.
**Prioritize:** Distinguish blocking, important, nitpick, and question.
**Do not pile on:** Wait for author to address existing feedback.

### 6.5 How to Receive Criticism

- Assume good faith: the reviewer wants the code to be better.
- Separate code from identity: a critique of your code is not about you.
- Pause 30 minutes before responding to critical feedback.
- Thank the reviewer for their time.
- If the reviewer is wrong, explain why calmly with evidence.

### 6.6 Drive-By Comments

Offhand dismissive critiques from non-regulars. Do not engage emotionally. Use the 5-second rule before responding. If the comment adds no value, ignore.

### 6.7 Entitlement and Negativity

**Entitlement:** I understand this is important to you. This project is maintained by volunteers. We welcome contributions.
**Chronic negativity:** Acknowledge the feeling, redirect to constructive action, have a private conversation if it persists.
**Burnout prevention:** Set boundaries, use mute, delegate, take breaks, seek support from other maintainers.

---

## Part 7: Community Metrics & Health

### 7.1 CHAOSS Metrics

The CHAOSS project provides standardized metrics for OSS community health.

**Categories:** Common (general health), Diversity & Inclusion (representation), Evolution (activity), Risk (project health), Value (impact).

**Key metrics:**
- Activity: commits, active contributors, new contributors, issue resolution time, PR merge time, release cadence.
- Health: code review coverage, issue response time, first response to contributor, contributor retention, bus factor, CoC reports.
- Sentiment: sentiment analysis of comments, NPS, community satisfaction surveys.

**Tools:** GrimoireLab, Augur, DevStats (CNCF), LFX Insights, GitHub Insights, OSS Insight.

### 7.2 Community Churn Analysis

**Churn rate** = (Contributors lost) / (Average active contributors). Healthy: 10-25% annual churn. Concerning: 25-40%. Critical: >40%.

**Cohort analysis:** Track retention by cohort (when someone first contributed). Compare cohorts to see if retention is improving.

**Exit interviews:** When active contributors leave, conduct private respectful interviews to understand why. Aggregate findings anonymously.

### 7.3 First-Contributor Experience

Track: unique first-time PR authors per month, percentage reviewed within 7 days, percentage merged, time to first merged PR, percentage who make a second contribution within 3 months.

**Targets:** Review time for first PR <7 days, first PR merge rate >60%, second contribution rate >30%.

### 7.4 Response Time Benchmarks

| Metric | Excellent | Good | Needs Improvement |
|---|---|---|---|
| First response to new issue | <6 hours | <24 hours | >72 hours |
| First review on PR | <24 hours | <72 hours | >1 week |
| Issue resolution (median) | <7 days | <30 days | >90 days |
| PR merge time (median) | <3 days | <14 days | >30 days |

### 7.5 Community Sentiment Analysis

**Automated:** Tools analyze issue/PR comments for positive/negative/neutral sentiment. Watch for declining trends or spikes in specific areas.
**Manual:** Community managers read new issues weekly, note recurring complaints, identify disengaged contributors, reach out privately.

### 7.6 Net Promoter Score for OSS

Survey question: On a scale of 0-10, how likely are you to recommend contributing to this project?

- Promoters (9-10): Enthusiastic.
- Passives (7-8): Satisfied.
- Detractors (0-6): Unhappy.

NPS = % Promoters - % Detractors. Above 50: excellent. 0-50: good. Below 0: significant issues.

---

## Part 8: Templates

### 8.1 Community Guidelines Template

## Our Purpose
[Project name] aims to [project mission]. These guidelines maintain a welcoming, productive, and respectful community.

## Expected Behavior
- Be respectful and considerate.
- Use welcoming and inclusive language.
- Be collaborative and open to different perspectives.
- Provide and accept constructive feedback gracefully.
- Focus on what is best for the community.

## Unacceptable Behavior
- Harassment, intimidation, or discrimination.
- Trolling, insulting comments, and personal attacks.
- Publishing others private information without consent.
- Sexual language or imagery.
- Repeated violations after warnings.

## Communication Guidelines
- Assume good faith.
- Search before asking.
- Keep discussions on topic.
- Use clear descriptive titles.
- Provide reproduction steps for bugs.

## Enforcement
1. Private warning
2. Temporary suspension
3. Permanent ban

## Reporting
Contact [email or form]. Confidential. Reviewed promptly.

### 8.2 New Contributor Welcome Template

**Subject:** Welcome to [Project]!

Hello [Name],

Thank you for opening your first contribution to [Project]!

**Getting Started**
- CONTRIBUTING guide: [link]
- Development environment setup: [link]
- Good first issues: [link]

**What to Expect**
- A maintainer will review your PR within [timeframe].
- You may receive feedback. This is normal and helpful.
- Questions? Ask on [Discord/forum].

**Next Steps**
After your first PR is merged:
- [Related issues]
- [Documentation improvements]
- [Help answer questions]

Welcome aboard!

### 8.3 CoC Enforcement Template

**Case Number:** [ID]
**Date:** [Date]
**Reported by:** [Confidential]
**Reported person:** [Subject]
**Type:** [Warning / Suspension / Ban]

**Summary:** [Factual summary with evidence]
**Policy Violation:** [Specific section violated]
**Previous Warnings:** [List with dates]
**Decision:** [Enforcement action]
**Rationale:** [Explanation]
**Appeals:** [Process and timeframe]

### 8.4 Conflict Resolution Process Template

1. **Direct Resolution:** Parties attempt to resolve directly.
2. **Facilitated Discussion:** Neutral facilitator helps if direct resolution fails.
3. **Mediation:** Formal mediator appointed.
4. **Escalation:** Core team or foundation makes binding decision.

Timeline: Step 1 within 1 week, Step 2 within 2 weeks, Step 3 within 4 weeks, Step 4 within 6 weeks.

### 8.5 Community Health Survey Template

**Section 1: Your Experience** - How long involved, primary role, overall satisfaction.
**Section 2: Community Health** - NPS (0-10), how welcoming, witnessed unwelcome behavior.
**Section 3: Communication** - Ease of getting help, quality of code review.
**Section 4: Barriers** - What barriers experienced, what would make you more likely to contribute.
**Section 5: Demographics** - Region, experience, gender (optional, all with Prefer not to say).

### 8.6 Moderator Training Template

**Role:** Community steward, rule enforcer, problem solver, role model.
**Principles:** Consistency, confidentiality, proportionality, transparency, empathy.
**Enforcement Ladder:** Warning -> Temporary mute (24-72 hours) -> Temporary ban (7-30 days) -> Permanent ban.
**Difficult Situations:** Escalate if reported person is core team. Discuss disagreements privately. Revisit decisions if new evidence emerges.
**Self-Care:** Take breaks, discuss difficult cases with peers, know your limits.

### 8.7 Community Manager Role Description

**Responsibilities:** Community engagement (40%), conflict resolution (20%), contributor experience (25%), community health (15%).
**Required:** 2+ years community management (OSS preferred), excellent communication, conflict resolution skills, familiarity with OSS tools (GitHub, Discord, Discourse).
**Reports to:** Core Team / Project Lead / Foundation Staff.

### 8.8 Core Team Election Process Template

**Eligibility:** Contributors with [number] accepted contributions, active for [timeframe], in good standing.
**Timeline:** Call for nominations (4 weeks before), nomination period (2 weeks), campaign (1 week), voting (2 weeks), results announced (1 week after).
**Voting method:** Single Transferable Vote / Approval Voting / Majority Vote.
**Term:** [Number] year terms, staggered. Maximum [number] consecutive terms.
**Vacancies:** Core Team may appoint interim member until next election.

---

*This document is a living reference. Communities should adapt these templates and practices to their specific needs, culture, and scale. The most important principle is: treat every person with respect, assume good faith, and focus on making the project and community better for everyone.*


### 1.7 The Economics of Open Source

#### 1.7.1 How OSS Gets Funded

| Funding Model | Description | Examples | Pros | Cons |
|---|---|---|---|---|
| Corporate sponsorship | Company pays maintainers to work on the project | Kubernetes (Google), React (Meta) | Stable funding, full-time maintainers | Corporate priorities may diverge from community |
| Foundation support | Non-profit foundation manages funding | Linux Foundation, CNCF, ASF | Neutral governance, shared funding | Bureaucratic overhead |
| Open-core | Free core + paid enterprise features | GitLab, Mattermost, Nginx | Sustainable business model | Community tension about what is free vs paid |
| Donations | Voluntary payments from users | Vue.js, curl, Homebrew | No strings attached | Unpredictable, often insufficient |
| Bounties | Paid for specific features/issues | Gitcoin, Bountysource | Incentivizes specific work | Can create perverse incentives |
| Consulting/services | Paid support and custom development | Red Hat, Elastic | Directly tied to expertise | May detract from core project work |
| Crowdfunding | Platform-based fundraising | Open Collective, GitHub Sponsors | Transparent, community-driven | Requires active fundraising effort |

#### 1.7.2 The Maintainer Sustainability Crisis

Many OSS projects face a sustainability crisis:

- **Burnout:** 60% of maintainers report symptoms of burnout. They manage dozens of issues and PRs alone.
- **Underfunding:** Critical infrastructure projects (OpenSSL, Log4j) had minimal funding despite being used by millions.
- **Security risk:** Under-resourced projects are more likely to have unpatched vulnerabilities (Heartbleed, Log4Shell).

**Solutions being explored:**
- STF (Sovereign Tech Fund) — government funding for critical OSS.
- Tidelift, Thanks.dev — subscription-based maintainer payments.
- GitHub Sponsors matching programs.
- Companies hiring maintainers as full-time employees.

### 1.8 Generational Shifts in OSS Culture

#### 1.8.1 The Early Era (1980s-1990s)

- **Dominant platforms:** Usenet, email, IRC, FTP.
- **Key figures:** Richard Stallman, Linus Torvalds, Eric Raymond.
- **Values:** Freedom (GPL), hacker ethic, do-ocracy.
- **Communication style:** Direct, technical, no-nonsense. Flame wars were tolerated as part of the culture.
- **License wars:** GPL vs BSD/MIT — ideological debates about copyleft.

#### 1.8.2 The Commercialization Era (2000s-2010s)

- **Dominant platforms:** SourceForge, GitHub, mailing lists.
- **Key events:** Apache becoming dominant web server, MySQL acquisition, Sun Microsystems open-sourcing Java.
- **Values:** Pragmatic open source, business-friendly licenses (Apache 2.0, MIT), meritocracy.
- **Communication style:** More formalized. Introductions of Codes of Conduct. Professionalization of OSS.
- **Corporate involvement:** Companies employing maintainers, foundation formation.

#### 1.8.3 The Modern Era (2020s-present)

- **Dominant platforms:** GitHub, Discord, Discourse, video calls.
- **Key trends:** Diversity and inclusion focus, supply chain security, AI-generated code, sustainability crisis.
- **Values:** Inclusive meritocracy, community health metrics, well-being of maintainers.
- **Communication style:** Emphasis on empathy, mental health, work-life balance. Strict enforcement of conduct codes.
- **New challenges:** AI model training on OSS code, license proliferation, maintainer burnout, geopolitical tensions in global communities.

### 1.9 Regional OSS Culture Differences

#### 1.9.1 North America

- Entrepreneurial, startup-driven contributions.
- Direct communication style.
- Strong individual contributor culture.
- Conference-centric community building (OSSummit, KubeCon, PyCon).

#### 1.9.2 Europe

- Strong privacy and data protection awareness (GDPR influence).
- Public sector OSS adoption is a priority (EU, Germany, France, Italy).
- Collaboration across language barriers — English as second language is normal.
- More academic and standards-driven.

#### 1.9.3 China

- Rapidly growing OSS ecosystem (Ant Group, Baidu, Alibaba, Huawei are major contributors).
- Communities often use WeChat for real-time communication.
- Language barrier creates separate-but-overlapping communities.
- Strong government support for domestic OSS.
- Values: pragmatic, results-oriented, strong work ethic.

#### 1.9.4 India

- Fastest growing OSS contributor base on GitHub.
- Education and upskilling driver — many first contributions happen during college.
- Strong mobile-first development culture.
- Price sensitivity drives adoption of free and open tools.
- Diverse language landscape creates unique localization challenges.

#### 1.9.5 Africa

- Emerging OSS ecosystem with mobile-first focus.
- OSS seen as economic development tool.
- Challenges: internet access, device availability, electricity reliability.
- Strong community around Ushahidi, OpenMRS (healthcare), and educational tools.

### 1.10 The Unwritten Rules (Extended)

#### 1.10.1 WIP (Work in Progress) and Draft PRs

Opening a Draft PR signals I am not done yet. Do not merge this. I am showing my approach early for feedback. Draft PRs should be respected as such. Do not request changes on a draft unless the author asked for feedback.

#### 1.10.2 Release Management Conventions

Do not ask when the next release is. It will ship when it is ready. If you need an urgent fix, you can always build from source, use a fork, or pin to a specific commit.

##### Conventional Commits

Many projects now use Conventional Commits:

| Prefix | Meaning | Example |
|---|---|---|
| feat | A new feature | feat: add rate limiting to API client |
| fix | A bug fix | fix: handle null pointer in parse function |
| docs | Documentation changes | docs: update installation guide for v2 |
| style | Formatting, no code change | style: reformat with black |
| refactor | Code restructuring | refactor: extract authentication module |
| test | Adding or fixing tests | test: add edge cases for validator |
| chore | Maintenance tasks | chore: update dependencies |
| BREAKING CHANGE | Incompatible API change | feat!: remove deprecated v1 endpoints |

#### 1.10.3 The Bus Factor

Every project should know its bus factor — the minimum number of people who would need to be unavailable for the project to stall. If your bus factor is 1, the project is fragile. If it is 0 (nobody else knows how it works), it is critical.

**How to improve bus factor:**
- Document everything (architecture, deployment, release process).
- Rotate on-call and review duties.
- Pair program on critical components.
- Record video walkthroughs of complex systems.
- Encourage (require) senior maintainers to mentor juniors.

---

## Part 3 (Extended): Community Roles Deep Dive

### 3.8 The Contribution Ladder

A formal contribution ladder helps people understand how to grow in the community:

```
User
  |
  v
First-time Contributor
  |
  v
Regular Contributor
  |
  v
Triage Team Member
  |
  v
Maintainer
  |
  v
Core Team Member
  |
  v
Core Team Lead / BDFL / Committee Chair
```

Each rung should have clear criteria for advancement:

| Role | Criteria for Advancement | Nominated By |
|---|---|---|
| Regular Contributor | 5+ accepted PRs, demonstrated understanding of codebase | Self-nomination with maintainer endorsement |
| Triage Team | 10+ meaningful issue/PR comments, understanding of project scope | Maintainer nomination |
| Maintainer | Consistent quality reviews, mentorship of contributors, 6+ months active | Core team vote |
| Core Team | 1+ year as maintainer, strategic thinking, community trust | Core team vote + community input |

### 3.9 Onboarding Checklist for Different Roles

#### 3.9.1 New Triage Team Member

- [ ] Read CONTRIBUTING and triage guidelines.
- [ ] Shadow an existing triage member for 1 week.
- [ ] Review the last 50 closed issues to understand labeling patterns.
- [ ] Understand the project categories and label taxonomy.
- [ ] Learn the canned responses / templates.
- [ ] First week: only close obvious duplicates and spam.
- [ ] Second week: begin labeling new issues.
- [ ] Third week: begin responding to incomplete reports.
- [ ] Monthly: review decisions with a mentor.

#### 3.9.2 New Maintainer

- [ ] Read maintainer guide and release process docs.
- [ ] Shadow existing maintainers on 5 PR reviews.
- [ ] First 10 PR reviews: get sign-off from a senior maintainer.
- [ ] Learn CI/CD pipeline and repo administration.
- [ ] Understand the release process (tagging, changelog, publishing).
- [ ] Set up notifications (filtered, to avoid burnout).
- [ ] Join maintainer communication channel.

### 3.10 Handling Bad Actors

Not everyone in OSS has good intentions. Bad actors include:
- **Trolls:** Deliberately provoke emotional responses.
- **Spammers:** Promote commercial products or scams.
- **Harassers:** Target individuals with threatening or demeaning behavior.
- **Groomers:** Build trust with vulnerable community members for exploitation.

**How bad actors operate:**
1. Test boundaries with minor rule violations.
2. Build social capital by contributing useful things.
3. Use that capital to shield themselves from consequences.
4. Target vulnerable members who are less likely to report.

**How to protect against bad actors:**
- Document everything. Keep records of interactions.
- Do not let social capital exempt anyone from rules.
- Take all reports seriously, especially about high-status members.
- Have multiple people involved in enforcement decisions.
- Periodic anonymous safety surveys for community members.

---

## Part 4 (Extended): Conflict Resolution Case Studies

### 4.8 Case Study: TensorFlow and Keras

**Background:** Keras was a high-level neural networks API that became the de facto frontend for TensorFlow. Google hired Francois Chollet (Keras creator) and integrated Keras into TensorFlow as its official high-level API.

**Conflict:** Some in the community felt TensorFlow was absorbing Keras to eliminate competition. Others worried that Keras would lose its framework-agnostic nature.

**Resolution:** Keras remained a separate project, continued to support multiple backends (TensorFlow, PyTorch, JAX), and maintained its own governance through Google. The integration benefited both projects.

**Lesson:** Corporate involvement in OSS can be positive when it respects project autonomy and community concerns.

### 4.9 Case Study: Elasticsearch License Change

**Background:** Elastic changed its license from Apache 2.0 to a dual license (SSPL + Elastic License), restricting cloud providers from offering Elasticsearch as a service.

**Conflict:** AWS forked Elasticsearch into OpenSearch. The community split. Elastic users faced license compliance uncertainty.

**Resolution:** OpenSearch gained significant community adoption. Elastic continued under its new license with commercial success.

**Lesson:** License changes are among the most disruptive events in OSS communities. Once changed, trust may never fully recover. Clear communication about the rationale and migration path is essential.

### 4.10 Conflict Resolution Flowchart

```
Conflict arises
      |
      v
Can parties resolve directly?
      |                    |
     Yes                  No
      |                    |
  [Done]            Should a mediator step in?
                         |              |
                        Yes             No
                         |              |
                  Mediation        Are the parties
                         |          still blocking
                  Agreed?           the project?
                  |       |              |        |
                 Yes     No             Yes       No
                  |       |              |        |
              [Done]  Escalate      Escalate  [Monitor]
                       to core       to core
                       team          team
                          |              |
                    Decision        Decision
                    made            made
```

---

## Part 5 (Extended): Building Inclusive Communities (Deep Dive)

### 5.7 Accessibility in OSS Communities

#### 5.7.1 Communication Accessibility

| Need | Accommodation | Cost | Ease of Implementation |
|---|---|---|---|
| Blindness | Screen-reader compatible docs, alt text on images | Low | Easy |
| Deafness | Captions on videos, text alternatives for voice | Medium | Moderate |
| Motor impairment | Keyboard-navigable interfaces, avoid CAPTCHA | Low | Moderate |
| Cognitive disability | Clear writing, consistent layout, plain language | Low | Easy |
| Anxiety | Allow async participation, avoid public callouts | Low | Easy |
| ADHD | Short documents, clear structure, checklists | Low | Easy |
| Low bandwidth | Text-only alternatives, offline docs | Low | Moderate |

#### 5.7.2 Inclusive Meeting Practices

- Provide agendas in advance.
- Use live captioning (Zoom, Google Meet built-in).
- Allow chat-based participation alongside voice.
- Record all meetings for those who cannot attend.
- Have a designated note-taker so participants can focus.
- Avoid rapid-fire round-the-room questions.
- Offer async alternatives for major decisions.

#### 5.7.3 Documentation Accessibility

- Use descriptive link text (not click here).
- Provide alt text for all images and diagrams.
- Use heading hierarchy properly (H1, H2, H3).
- Ensure sufficient color contrast.
- Do not convey information through color alone.
- Provide transcripts for video content.
- Use plain language and define acronyms on first use.

### 5.8 Linguistic Inclusion

#### 5.8.1 English as a Lingua Franca

Most OSS communication happens in English, which disadvantages non-native speakers.

**How to help:**
- Write in clear, simple English. Avoid idioms and cultural references.
- Use short sentences. Break complex ideas into bullet points.
- Be patient with grammatical errors. Do not correct grammar unless it affects understanding.
- Provide translation of key documents when possible.
- Use translation tools (DeepL, Google Translate) to facilitate communication.
- Acknowledge that language fluency does not correlate with technical ability.

#### 5.8.2 Timezone Inclusion

- When scheduling meetings, rotate times to share the burden.
- Use tools like when2meet.com to find overlapping hours.
- Record and transcribe all synchronous events.
- Provide async decision-making channels.
- Acknowledge that not everyone can attend synchronous events.

### 5.9 Neurodiversity in OSS

Autistic, ADHD, and otherwise neurodivergent people are overrepresented in tech and OSS.

**Strengths neurodivergent people bring:**
- Deep focus on complex problems (autism, ADHD hyperfocus).
- Pattern recognition and system thinking.
- Honest, direct communication (may come across as blunt).
- Strong sense of fairness and justice.
- Creative problem-solving.

**Accommodations:**
- Clear, explicit communication (not reading between the lines).
- Written instructions over verbal.
- Structured processes and predictable workflows.
- Direct feedback (no sugar-coating, use the nit convention).
- Flexibility in working hours and communication channels.
- Do not require eye contact in video calls.
- Provide agendas in advance for meetings.

**Challenges to avoid:**
- Do not interpret directness as rudeness.
- Do not force small talk or social rituals.
- Do not require participation in social events.
- Do not penalize people for not reading social cues.

---

## Part 6 (Extended): Etiquette and Communication

### 6.8 Writing Effective Communication in OSS

#### 6.8.1 The PAR Framework for Technical Writing

**P**roblem - **A**pproach - **R**esolution

Every piece of technical communication should follow PAR:

| Section | Content | Example |
|---|---|---|
| Problem | What are you trying to solve? | The authentication module has a race condition |
| Approach | How did you approach it? | I added a mutex around the session creation code |
| Resolution | What was the outcome? | The race condition no longer appears under load testing |

This framework works for issues, PR descriptions, emails, and design documents.

#### 6.8.2 Tone Calibration

Different platforms and contexts require different tones:

| Context | Tone | Example |
|---|---|---|
| Issue report | Factual, precise | I encountered an error when running X under Y conditions |
| Code review comment | Collaborative, specific | Consider using early return here to reduce nesting |
| Discussion proposal | Open, exploratory | What if we approached this by... |
| Community welcome | Warm, encouraging | Great to have you here! Let me know if you need help getting started |
| Governance decision | Formal, transparent | After careful consideration, the core team has decided to... |
| Conflict de-escalation | Calm, neutral | I understand this is frustrating. Let us focus on finding a solution. |
| Release announcement | Celebratory, inclusive | We are thrilled to announce version 3.0, made possible by 47 contributors |

#### 6.8.3 Emoji in OSS Communication

Emoji can add warmth and clarity, but use them thoughtfully:

| Emoji | Meaning in OSS | When to Use |
|---|---|---|
| Thumbs up (like) | Agreement, acknowledgment | Instead of +1 comment |
| Rocket | Release, deployment | Release announcements |
| Party | Celebration | Milestones, first contributions |
| Heart | Appreciation | Thanking contributors |
| Checkmark | Resolved, completed | Closing issues |
| Confused | Need clarification | When you do not understand a report |
| Warning | Caution | Flagging potential issues |
| Eyes | Watching, will investigate | Acknowledging a report without immediate action |

Avoid: emoji that could be interpreted as sarcastic, dismissive, or passive-aggressive in context.

### 6.9 Dealing with Specific Difficult Situations

#### 6.9.1 The Perpetual Debater

Someone who argues every point, often about process rather than substance.

**Strategy:**
1. Set a time limit on the discussion.
2. Ask for a concrete proposal in writing.
3. If the debate is circular, make a decision and close.
4. In private, explain the impact on community energy.

#### 6.9.2 The Drive-By Critic

Someone who appears in a thread, makes a harsh critique, and disappears.

**Strategy:**
1. Do not engage emotionally.
2. Extract any useful signal from the noise.
3. Respond briefly and professionally.
4. If abusive, remove the comment and move on.

#### 6.9.3 The Concern Troll

Someone who claims to agree with the goals but opposes every specific action, often by raising hypothetical edge cases.

**Strategy:**
1. Thank them for the concern.
2. Ask for concrete evidence or alternative proposals.
3. Do not let hypotheticals block progress indefinitely.
4. Distinguish between valid concerns and obstruction.

#### 6.9.4 The SOS (Same Old Story)

Someone who brings up the same resolved argument repeatedly.

**Strategy:**
1. Link to the previous discussion that resolved it.
2. State that the decision has been made.
3. If they persist, ask them to open a new discussion with new evidence.
4. If they still persist, mute or moderate.

---

## Part 6 (Extended): Advanced Communication Patterns

### 6.10 The SBI Feedback Model

**S**ituation - **B**ehavior - **I**mpact

A structured way to deliver feedback:

| Element | Description | Example |
|---|---|---|
| Situation | When and where | In yesterday code review on PR #456 |
| Behavior | What the person did | You wrote That is wrong |
| Impact | How it affected others | I felt defensive and the conversation became unproductive |

**Complete feedback:**
In yesterday code review on PR #456, you wrote That is wrong without explanation. I felt defensive and the conversation became unproductive. In the future, could you explain what the issue is and suggest an alternative?

### 6.11 Non-Violent Communication (NVC) for OSS

NVC framework: Observations -> Feelings -> Needs -> Requests

**Example application:**
- **Observation:** When PRs sit unreviewed for more than two weeks
- **Feeling:** I feel discouraged
- **Need:** Because I need timely feedback to stay engaged
- **Request:** Could we set up a rotation so every PR gets a first review within 5 days?

### 6.12 Handling Criticism of Your Project

When someone criticizes your project publicly:

1. **Listen first.** Do not defend. Understand the criticism.
2. **Acknowledge.** Thank them for the feedback.
3. **Evaluate.** Is the criticism valid? If yes, acknowledge and plan to fix. If no, explain why politely.
4. **Do not get defensive.** Defensiveness shuts down communication.
5. **Separate valid criticism from venting.** Address the substance, ignore the tone.

---

## Part 7 (Extended): Advanced Metrics

### 7.7 The CHAOSS Evolution Metric Family

| Metric | Definition | Formula |
|---|---|---|
| Code Changes | Number of commits or PRs merged | Count per time period |
| Code Change Lines | Lines of code added/removed | Additions + Deletions per period |
| Code Review Cycle Time | Time from first review request to last review | Median hours |
| Code Review Iteration | Number of review cycles per change | Average review comments per PR |
| Issue Resolution Duration | Time from issue open to close | Median days |
| Issue Response Time | Time from issue open to first comment | Median hours |
| Release Frequency | Time between releases | Days between releases |

### 7.8 The CHAOSS Diversity and Inclusion Metric Family

| Metric | Definition | What It Reveals |
|---|---|---|
| Contributor Diversity | Distribution of contributors across organizations | Is the project dominated by one company? |
| New Contributor Count | First-time contributors per period | Is the project attracting newcomers? |
| New Contributor Ratio | New vs returning contributions | Is the community growing or stagnating? |
| Communication Inclusivity | Demographics of participants | Are marginalized groups represented? |
| Governance Diversity | Diversity of decision-makers | Are governance bodies representative? |
| Event Diversity | Diversity of speakers, attendees | Are events inclusive? |

### 7.9 Organizational Diversity Index

Measure how many different organizations contribute to your project.

Low organizational diversity (dominated by one company) = higher risk of fork, higher bus factor, less community resilience.

**How to calculate:**
1. Map commits or PRs to organizations (via email domain, profile).
2. Count unique organizations contributing each quarter.
3. Track trend over time.

**Benchmark:** Healthy projects have contributions from 5+ organizations. Critical infrastructure projects (Kubernetes, Linux) have 50+.

### 7.10 Contributor Lifecycle Metrics

Map contributors through stages and measure drop-off:

| Stage | Definition | Benchmark Pass Rate |
|---|---|---|
| Visitor | Viewed the repository | 100% |
| Filer | Opened an issue or discussion | 5-10% |
| First-time PR | Submitted at least one PR | 1-3% |
| First-time merged | First PR was accepted | 60-80% of PR submitters |
| Repeat | Made a second contribution | 20-40% of merged contributors |
| Regular | Active for 6+ months | 10-20% of repeat contributors |
| Core | Active for 2+ years, influential | 2-5% of regular contributors |

### 7.11 Measuring Documentation Health

| Metric | What It Measures | How to Measure |
|---|---|---|
| Documentation coverage | Percentage of features documented | Manual audit or automated checks |
| Freshness | Last update date for docs | Git history of docs/ directory |
| Search success | Can users find what they need | Search analytics on docs site |
| Time-to-answer | How long to find common answers | User testing with timed tasks |
| Doc PR ratio | Docs changes vs code changes | Git statistics |

### 7.12 Survey Design Best Practices

- Keep it under 10 minutes.
- Use Likert scales (1-5 or 1-7) for quantitative data.
- Include open-ended questions for qualitative insights.
- Anonymous by default.
- Offer the option to provide contact info for follow-up.
- Pilot the survey with 5 people before wide release.
- Share results with the community.
- Close the loop: tell people what changed because of their feedback.

---

## Part 8 (Extended): Additional Templates

### 8.9 Maintainer Handover Checklist

**Pre-handover (2-3 months before):**
- [ ] Identify successor (or form a team).
- [ ] Document all processes: release, CI, security, community moderation.
- [ ] Document infrastructure access (domains, hosting, package registries).
- [ ] Document known technical debt and ongoing work.
- [ ] Transfer ownership where possible (GitHub, npm, PyPI, Docker Hub).
- [ ] Update maintainers list in GOVERNANCE.md.

**During handover (1 month):**
- [ ] Shadow the successor(s) on all activities.
- [ ] Introduce successor to key community members.
- [ ] Hand over communication channel admin rights.
- [ ] Review and approve first releases by the successor.

**Post-handover:**
- [ ] Remain available for questions for 3 months.
- [ ] Update README, CONTRIBUTING, and project website.
- [ ] Announce the transition to the community.
- [ ] Step back from day-to-day operations.
- [ ] Celebrate the transition (blog post, social media).

### 8.10 Release Announcement Template

**Subject:** [Project] v[Version] Released

We are excited to announce the release of [Project] version [Version]!

**What's New**
- Major feature 1: [description]
- Major feature 2: [description]
- Performance improvements: [X]% faster [operation]
- Bug fixes: [N] bugs fixed (see changelog)

**Upgrade Guide**
[Link to upgrade guide]

**Breaking Changes**
[List any breaking changes and migration steps]

**Contributors**
This release includes contributions from [N] people, including [N] first-time contributors:
[List of names/usernames]

**Download**
[Link to release page, package manager command, or Docker image]

**Full Changelog**
[Link to CHANGELOG.md]

### 8.11 Security Vulnerability Disclosure Template

## Reporting Security Issues

If you discover a security vulnerability in [Project], please follow these steps:

1. **Do NOT** open a public issue. This could put users at risk before a fix is available.
2. Email [security@example.com] with details of the vulnerability.
3. Include: affected versions, steps to reproduce, potential impact, and suggested fix (if available).
4. You can expect an acknowledgment within 48 hours.
5. We will work with you to understand the issue and develop a fix.
6. We will coordinate disclosure timing with you.

## Our Commitment

- We will acknowledge receipt within 48 hours.
- We will provide an estimated timeline for a fix.
- We will credit you in the security advisory (unless you prefer to remain anonymous).
- We will coordinate public disclosure timing.
- We operate a bug bounty program? [Yes/No — details].

### Timeline

| Phase | Duration |
|---|---|
| Acknowledgment | 48 hours |
| Triage | 5 business days |
| Fix development | Depends on severity |
| Release | Coordinated with reporter |
| Public disclosure | 30 days after release (or sooner) |

### 8.12 Project Roadmap Template

# [Project] Roadmap

## Vision
[One-paragraph vision statement]

## Current Release: v[Version]

### Recently Shipped
- [Feature] — [Date]
- [Feature] — [Date]

### In Progress
- [Feature] — Target: [Date], Lead: [Name], Status: [% or phase]
- [Feature] — Target: [Date], Lead: [Name], Status: [% or phase]

## Next Release: v[Version]

### Planned
- [Feature] — Priority: [High/Medium/Low], RFC: [Link]
- [Feature] — Priority: [High/Medium/Low], RFC: [Link]

### Under Consideration
- [Idea] — Discussion: [Link]
- [Idea] — Discussion: [Link]

## Future (No Timeline)
- [Long-term goal]
- [Long-term goal]

## How to Influence the Roadmap
- Open a Discussion for feature proposals.
- Upvote existing proposals.
- Contribute code — the fastest way to get a feature is to implement it.
- Attend our public roadmap review meetings: [schedule].

### 8.13 First-Time Contributor Guide Template

# First-Time Contributor Guide

Welcome! We are glad you are here. This guide helps you make your first contribution to [Project].

## What You Need
- [Prerequisites: Git, specific language/runtime, etc.]
- A GitHub account.
- Time: about [X hours] for your first contribution.

## Step 1: Find Something to Work On
- Browse issues labeled `good-first-issue`.
- Read the issue description carefully.
- Comment to let others know you are working on it.
- If a good-first-issue is already assigned, find another one.

## Step 2: Set Up Your Environment
1. Fork the repository.
2. Clone your fork: `git clone [your-fork-url]`
3. Install dependencies: [command]
4. Verify the setup: [command to run tests]

## Step 3: Make Your Changes
1. Create a branch: `git checkout -b fix/my-first-contribution`
2. Make your changes.
3. Run tests: [command]
4. Commit your changes with a descriptive message.

## Step 4: Submit Your Pull Request
1. Push your branch: `git push origin fix/my-first-contribution`
2. Open a Pull Request on GitHub.
3. Fill in the PR template.
4. Wait for review.

## What Happens Next
- A maintainer will review your PR within [timeframe].
- You may receive feedback or change requests.
- Respond to feedback and update your PR as needed.
- Once approved, your PR will be merged!

## Need Help?
- Ask in [Discord/forum/link].
- Tag a mentor: [mentor names or how to find one].
- Check our FAQ: [link].

Thank you for contributing!

### 8.14 Community Manager Role Description

# Community Manager — Job Description

## About [Project]
[Brief project description]

## Role Summary
The Community Manager fosters a healthy, inclusive, and engaged community. They focus on community engagement, conflict resolution, contributor experience, and growth metrics.

## Responsibilities

### Community Engagement (40%)
- Welcome and onboard new members.
- Organize and facilitate events (hackathons, meetups, summits).
- Manage community channels (Discord, forum, social media).
- Amplify success stories through blogs, social media, showcases.
- Plan recognition programs.

### Conflict Resolution (20%)
- Monitor channels for potential conflicts.
- De-escalate heated discussions and mediate disputes.
- Enforce Code of Conduct per established procedures.
- Document enforcement actions and track patterns.
- Escalate unresolved conflicts to core team.

### Contributor Experience (25%)
- Maintain onboarding materials and documentation.
- Track first-contributor funnel metrics.
- Collect and act on contributor feedback.
- Recruit and support mentors.
- Identify and reduce contribution barriers.

### Community Health (15%)
- Track health metrics using the CHAOSS framework.
- Run regular contributor surveys.
- Report health metrics to core team monthly.
- Analyze churn and retention patterns.
- Identify at-risk contributors and conduct outreach.

## Qualifications
- 2+ years community management (OSS preferred).
- Excellent written and verbal communication.
- Conflict resolution and de-escalation experience.
- Familiarity with OSS tools (GitHub, Discord, Discourse).
- Demonstrated empathy and cross-cultural communication.

## Reporting
Reports to [Core Team/Project Lead/Foundation Staff].

## Time Commitment
[Full-time/Part-time/Volunteer]. Flexible schedule for multiple timezones.

### 8.15 Core Team Election Process Template

# Core Team Election Process

## Purpose
Define the process for electing [Project] Core Team members.

## Eligibility

### Voter Eligibility
- [N] accepted contributions in the past [timeframe].
- Active for at least [timeframe].
- No active Code of Conduct sanctions.

### Candidate Eligibility
- Meets voter eligibility.
- Demonstrated leadership (maintainer, SIG lead, active contributor).
- Submits candidacy statement.
- Not currently on Core Team (for term-limited seats).

## Timeline
| Event | Timeframe |
|---|---|
| Call for nominations | 4 weeks before election |
| Nomination period | 2 weeks |
| Campaign period | 1 week |
| Voting period | 2 weeks |
| Results announced | 1 week after voting |

## Voting Process
- Method: [STV / Approval / Majority]
- Voters may vote for up to [N] candidates.
- Conducted via [OpaVote / Helios / CIVS].
- Verified by [N] election officers.

## Term
- [N]-year terms, staggered.
- Maximum [N] consecutive terms.

## Vacancies
Core Team may appoint an interim member until the next election.

## Amendment
This process may be amended by [supermajority] vote of Core Team with a [timeframe] community comment period.

---

*This document is version [1.0] and was last updated on [Date]. It is maintained by [Project Team]. Contributions and corrections are welcome via pull request.*


## Appendix A: Glossary of OSS Community Terms

| Term | Definition |
|---|---|
| BDFL | Benevolent Dictator For Life — project leader with final authority |
| BoF | Birds of a Feather — informal discussion group at conferences |
| Bus Factor | Minimum number of people whose loss would stall the project |
| CoC | Code of Conduct — community behavior rules |
| Do-ocracy | Governance by those who do the work |
| Drive-by Comment | Offhand critical comment from a non-regular |
| Good-first-issue | Beginner-friendly task labeled for new contributors |
| LTS | Long-Term Support — extended maintenance release |
| Meritocracy | System where influence is earned through contribution |
| Nit / Nitpick | Minor code review suggestion, not blocking |
| NPS | Net Promoter Score — measure of community satisfaction |
| OSS | Open-Source Software |
| PR | Pull Request — proposed code change |
| RFC | Request For Comments — proposal for significant changes |
| SIG | Special Interest Group — focused sub-community |
| SLA | Service Level Agreement — target response time |
| STV | Single Transferable Vote — ranked-choice voting method |
| TOC | Technical Oversight Committee — CNCF governance body |
| TSC | Technical Steering Committee — project governance body |

## Appendix B: Recommended Reading

### Books
- The Cathedral and the Bazaar — Eric S. Raymond
- Hackers: Heroes of the Computer Revolution — Steven Levy
- Producing Open Source Software — Karl Fogel
- Working in Public — Nadia Eghbal
- Forge Your Future with Open Source — VM Brasseur
- The Art of Community — Jono Bacon

### Articles and Essays
- How to Ask Questions the Smart Way — Eric S. Raymond
- The Tyranny of Structurelessness — Jo Freeman
- Meritocracy and Its Discontents — various
- A Maintainer Manifesto — many maintainers

### Organizations
- CHAOSS Project — community health metrics
- Open Source Initiative (OSI) — open source definition
- Software Freedom Conservancy — legal and fiscal support
- Linux Foundation — hosting and governance for critical projects
- Apache Software Foundation — vendor-neutral governance
- CNCF — cloud-native computing ecosystem
- OpenJS Foundation — JavaScript ecosystem projects

## Appendix C: Quick Reference — Do's and Don'ts

| Situation | Do | Don't |
|---|---|---|
| Reporting a bug | Provide reproduction steps and environment details | Say It does not work with no context |
| Asking for help | Show what you have already tried | Demand an immediate answer |
| Code review | Explain why a change is needed | Say This is wrong without explanation |
| Receiving review feedback | Thank the reviewer and address comments | Get defensive or argue every point |
| Proposing a feature | Explain the problem and discuss alternatives | Open a 2000-line PR without discussion |
| Disagreeing with a decision | Present evidence and alternatives | Make it personal or threaten to fork |
| Welcoming newcomers | Be patient and point to resources | Use jargon or make them feel dumb |
| Handling a conflict | De-escalate and seek common ground | Escalate publicly or take sides |
| Using @mentions | Use sparingly for urgent/blocking issues | @mention everyone to get attention |
| Writing documentation | Use clear language and test your instructions | Assume the reader knows what you know |

## Appendix D: Community Health Check — Self-Assessment Questions

Rate your community 1 (poor) to 5 (excellent) on each:

### Inclusivity
- Do new members feel welcome? ___
- Are diverse perspectives represented? ___
- Is the Code of Conduct enforced consistently? ___
- Are there barriers to entry (setup, language, culture)? ___

### Communication
- Are questions answered within 24 hours? ___
- Is the tone respectful across all channels? ___
- Are there clear channels for different purposes? ___
- Are discussions focused and productive? ___

### Contributor Experience
- Do first-time contributors get timely reviews? ___
- Is the contribution process well-documented? ___
- Are contributors recognized for their work? ___
- Is there a clear path from newcomer to maintainer? ___

### Governance
- Are decision-making processes transparent? ___
- Does the community feel ownership of the project? ___
- Are leadership transitions planned and smooth? ___
- Is there a clear conflict resolution process? ___

### Sustainability
- Is the bus factor acceptable (3+)? ___
- Are there enough active maintainers? ___
- Is the project adequately funded? ___
- Are maintainers practicing burnout prevention? ___

**Score interpretation:**
- 80-100: Thriving community
- 60-79: Healthy with room for improvement
- 40-59: Needs attention
- Below 40: Critical intervention needed
