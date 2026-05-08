# Branch Workflow Guide

> A comprehensive guide to managing branches in Git, creating clean contributions, avoiding force-push mistakes, and maintaining a healthy repository history. This guide covers workflows for feature branches, shared branches, and collaborative development.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Before You Start](#before-you-start)
3. [Branch Creation](#branch-creation)
4. [Working on Branches](#working-on-branches)
5. [Switching Branches](#switching-branches)
6. [Syncing with Remote](#syncing-with-remote)
7. [Committing Changes](#committing-changes)
8. [Pushing Changes](#pushing-changes)
9. [Handling Push Failures](#handling-push-failures)
10. [Force Push Prevention](#force-push-prevention)
11. [Branch Cleanup](#branch-cleanup)
12. [Recovery Procedures](#recovery-procedures)
13. [Conflict Handling](#conflict-handling)
14. [Multi-Branch Management](#multi-branch-management)
15. [Collaborative Workflows](#collaborative-workflows)
16. [Best Practices](#best-practices)
17. [Workflow Templates](#workflow-templates)
18. [Troubleshooting](#troubleshooting)
19. [Quick Reference](#quick-reference)

---

## Introduction

### Purpose of This Guide

This guide provides a structured workflow for managing Git branches in collaborative projects. It emphasizes safety, clarity, and maintainability while avoiding common pitfalls like force-pushing to shared branches.

The primary goal is to ensure that all contributors can work on their features independently while maintaining a clean, understandable history that makes code review, debugging, and rollback straightforward.

### Core Principles

Three principles guide all branch operations in this workflow:

First, never modify shared branches. The main, master, or develop branches are shared by all contributors. Modifying their history affects everyone. All changes flow through review and merge, never through direct modification.

Second, keep branches short-lived. Long-running branches accumulate conflicts and become difficult to merge. Create small, focused branches that complete quickly and merge cleanly.

Third, communicate with collaborators. When your actions might affect others' work, inform them first. Force-pushing, history rewriting, and branch deletions all have potential impact.

### Why Force Push Is Dangerous

Force pushing rewrites the remote history by replacing it with your local history. This is dangerous in collaborative environments because:

It overwrites commits that others may have built upon. If a collaborator pushed commits after your last fetch, force-pushing replaces their work with your history, causing data loss.

It creates duplicate commits. The original commits remain in Git objects but are orphaned. Future operations may encounter them unexpectedly, creating confusion.

It breaks tracking relationships. Branches that tracked the overwritten branch now point to the wrong commits, causing confusing behavior in future operations.

### When Force Push Is Acceptable

Force push is acceptable only when:

- You exclusively control the branch (no collaborators)
- You've communicated with all collaborators about the operation
- No one else has pushed changes since your last fetch
- The branch is a local-only feature branch before first push

In all other cases, avoid force push.

---

## Before You Start

### Checking Current State

Before beginning work on any branch, verify your current state:

```bash
# Check which branch you're on
git branch -v

# Check for uncommitted changes
git status -s

# View recent commits
git log --oneline -5

# Check for stashed changes
git stash list
```

If uncommitted changes exist, decide whether to commit, stash, or discard them before switching branches.

### Fetching Latest Changes

Always fetch before starting work on any branch:

```bash
# Fetch from all remotes
git fetch --all

# Fetch from specific remote
git fetch origin
git fetch lifejiggy

# Fetch and prune deleted branches
git fetch --prune
```

Fetching updates your local view of remote branches without modifying your working directory. This ensures you're working from current information.

### Understanding Remote Configuration

This project uses multiple remotes:

```bash
# View all remotes
git remote -v

# View origin details
git remote show origin

# View lifejiggy details
git remote show lifejiggy
```

The typical configuration:
- origin: Your fork or the main repository
- lifejiggy: The canonical repository for this project

### Choosing Your Base

When starting a new feature or fix, choose an appropriate base branch:

```bash
# Check available branches
git branch -r | grep -v HEAD

# See what's on main
git log origin/main --oneline -5

# Compare your branch to main
git log origin/main..HEAD --oneline
```

The base should be a branch that contains stable, reviewed code. Usually, this is main or the current release branch.

### Setting Up Your Workspace

Prepare your local environment:

```bash
# Verify build tools are available
npm --version
node --version

# Verify Git is configured
git config --get user.name
git config --get user.email

# Set up helpful aliases (if not already configured)
git config --global alias.st "status -s"
git config --global alias.lg "log --oneline --graph --all"
```

A configured environment reduces friction during development.

---

## Branch Creation

### Creating a New Feature Branch

Create feature branches from a clean base:

```bash
# Fetch latest base branch
git fetch origin main

# Create and switch to new branch
git checkout -b feature/my-new-feature origin/main

# Verify the starting point
git log --oneline -3
```

This creates a new branch that starts from the tip of main.

### Naming Conventions

Consistent naming makes branches easy to identify:

Feature branches:
```
feature/user-authentication
feature/payment-integration
feature/dashboard-redesign
```

Fix branches:
```
fix/login-validation
fix/memory-leak
fix/api-timeout-handling
```

Cleanup branches:
```
refactor/api-client
refactor/database-layer
docs/api-reference
```

PR-specific branches (when working on review feedback):
```
pr/795-token-counter
pr/849-context-partitioning
pr/860-hybrid-strategy
```

Include enough context in the name that its purpose is clear, but avoid names so long they're unwieldy.

### Creating from an Existing Branch

When continuing work from another feature branch:

```bash
# Create new branch from existing feature branch
git checkout -b feature/my-new-feature origin/feature/my-existing-feature

# Or with a specific starting commit
git checkout -b fix/issue-123 abc1234
```

This preserves the existing feature's work while creating space for new work.

### Creating from a Tag

For bug fixes or hotfixes, branch from a release tag:

```bash
# List available tags
git tag -l "v1.*"

# Create branch from tag
git checkout -b hotfix/issue-123 v1.2.0

# Verify starting point
git log --oneline -3
```

Branching from tags ensures your fix applies to a specific release.

### Creating from a Remote Branch

When continuing someone else's work:

```bash
# Fetch the remote branch
git fetch origin feature/their-feature

# Create local branch tracking remote
git checkout -b feature/their-feature origin/feature/their-feature

# Verify tracking
git branch -vv
```

This creates a local copy of their branch that you can modify.

---

## Working on Branches

### Making Changes

Make changes to your files using your preferred editor:

```bash
# Check which files are modified
git status -s

# View unstaged changes
git diff

# View staged changes
git diff --staged
```

Review changes before staging to catch unintended modifications.

### Building and Testing

Build and test before committing:

```bash
# Build the project
npm run build

# Run tests
npm test

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

All checks should pass before committing. If tests fail, fix them first.

### Checking Your Changes

Review what you've changed:

```bash
# View diff statistics
git diff --stat

# View full diff
git diff

# View specific file changes
git diff path/to/file.js
```

The diff shows exactly what will be included in your commit.

### Staging Changes

Stage changes for commit:

```bash
# Stage all changes to tracked files
git add -u

# Stage all changes including new files
git add .

# Stage specific files
git add file1.js file2.js

# Stage interactive (for fine-grained control)
git add -p
```

Stage complete, working changes. Avoid staging partial work.

### Verifying Staged Changes

Before committing, verify staged changes:

```bash
# View staged changes
git diff --staged

# Check staged files
git status

# Review specific staged file
git diff --staged path/to/file.js
```

Staged changes are what will be committed. Review them carefully.

---

## Switching Branches

### Switching with Uncommitted Changes

Git prevents switching when uncommitted changes would be lost:

```bash
# See uncommitted changes
git status -s

# Option 1: Commit them first
git add .
git commit -m "work in progress"
git checkout other-branch

# Option 2: Stash them
git stash
git checkout other-branch

# Later, restore stashed changes
git stash pop
```

Choose based on whether you want to preserve the changes.

### Switching Without Changes

When no uncommitted changes exist:

```bash
# Switch to existing branch
git checkout feature/other-feature

# Switch to main
git checkout main
```

This switches cleanly when there are no uncommitted changes.

### Preserving Work with Stash

The stash saves work temporarily:

```bash
# Save work
git stash save "work on feature X"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Drop stash when done
git stash drop stash@{2}
```

Stashes persist until explicitly dropped. Don't use stash as long-term storage.

### Cleaning Before Switch

When you want a clean working directory:

```bash
# Discard all changes (irreversible)
git checkout -- .
git clean -fd

# Verify clean state
git status -s
```

Use this only when you don't need the changes. Consider stashing instead.

---

## Syncing with Remote

### Fetching Updates

Fetch downloads changes without modifying working directory:

```bash
# Fetch from all remotes
git fetch --all

# Fetch from specific remote
git fetch origin
git fetch lifejiggy

# Fetch and prune
git fetch --prune
```

Fetch frequently to stay current with others' work.

### Pulling Updates

Pull fetches and merges:

```bash
# Pull from tracked branch
git pull

# Pull and rebase
git pull --rebase

# Pull from specific branch
git pull origin main
```

Pull modifies your working directory. Fetch is safer for staying current without merging.

### When Main Has Advanced

If main has advanced while you worked:

```bash
# Fetch latest main
git fetch origin main

# View comparison
git log origin/main..HEAD --oneline

# Rebase your changes on main
git rebase origin/main

# Continue if conflicts occur
# After resolving conflicts:
git add .
git rebase --continue

# Or abort if too complex
git rebase --abort
```

Rebasing recreates your commits on top of the new main, maintaining linear history.

### Merging vs Rebasing

Choose the right strategy:

Rebase when:
- You want clean, linear history
- Your branch is local-only
- Your changes are small and self-contained

Merge when:
- Your branch is shared
- Your changes are large and complex
- You want to preserve merge history

---

## Committing Changes

### Writing Commit Messages

A good commit message has:

First line (under 50 characters, imperative mood):
```
Add user authentication flow
Fix login validation bug
Refactor database connection pool
```

Blank line, then detailed explanation:
```
Implement login and logout functionality using JWT tokens.
Store refresh tokens securely in httpOnly cookies.
Add CSRF protection for state-changing operations.
This enables persistent sessions across browser restarts.

Fixes #123
```

### Committing

Create commits with clear messages:

```bash
# Basic commit
git commit -m "Add user authentication flow"

# Commit with detailed message
git commit -m "Add user authentication flow" -m "Implement login and logout using JWT tokens..."

# Stage and commit all changes
git commit -am "Fix validation bug"
```

Note that `-am` stages all changes to tracked files. It doesn't stage new files.

### Amending Commits

If you forgot something:

```bash
# Add forgotten changes
git add forgotten-file.js

# Amend without changing message
git commit --amend --no-edit

# Amend with new message
git commit --amend -m "New, better message"
```

Only amend commits that haven't been pushed.

### Viewing Commit History

Review your commits:

```bash
# View recent commits
git log --oneline -5

# View all commits on current branch
git log --oneline

# View with graph
git log --oneline --graph --all
```

This helps verify what will be pushed.

---

## Pushing Changes

### First Push

Push a new branch to create it on remote:

```bash
# Push to origin with upstream tracking
git push -u origin feature/my-feature

# Push to lifejiggy with upstream tracking
git push -u lifejiggy feature/my-feature
```

The `-u` flag sets upstream tracking, so future pushes need only `git push`.

### Subsequent Pushes

Push to tracked branch:

```bash
git push
```

Git uses the upstream tracking set during first push.

### Verifying Push

After pushing, verify:

```bash
# See recent commits
git log --oneline -3

# View pushed commits
git log origin/feature/my-feature --oneline -3
```

This confirms your commits reached the remote.

### Push Variations

```bash
# Push all branches
git push --all

# Push all tags
git push --tags

# Push specific branch to specific remote
git push lifejiggy feature/my-feature
```

Use specific commands when needed, but simple `git push` usually suffices.

---

## Handling Push Failures

### Understanding Rejection

Push is rejected when remote has commits you don't have:

```bash
# See the error
git push
# ! [rejected] abc1234..def5678 feature/my-feature -> feature/my-feature (fetch first)
```

This rejection protects your work from being overwritten.

### Option 1: Fetch and Rebase

Fetch their changes and rebase:

```bash
# Fetch their changes
git fetch origin

# See their changes
git log HEAD..origin/feature/my-feature --oneline

# Rebase on their changes
git rebase origin/feature/my-feature

# Push again
git push
```

This maintains linear history.

### Option 2: Fetch and Merge

Fetch their changes and merge:

```bash
# Fetch their changes
git fetch origin

# Merge their changes
git merge origin/feature/my-feature

# Resolve conflicts if any
# Then push
git push
```

This creates a merge commit but preserves history.

### Option 3: Reset and Push

When your local changes are less important than theirs:

```bash
# Fetch their changes
git fetch origin

# Reset to their branch
git reset --hard origin/feature/my-feature

# Make your changes again
# Then push
git push --force-with-lease
```

Use this only when your local commits are superseded.

### Choosing the Right Option

Choose based on the situation:

- Use rebase when: Your changes are small and can be cleanly reapplied
- Use merge when: Your changes are complex and rebasing is difficult
- Use reset when: Your local commits are experimental and can be discarded

Always prefer non-force options first.

---

## Force Push Prevention

### Why to Avoid Force Push

Force pushing is dangerous because:

1. It overwrites commits that others may have pushed
2. It creates duplicate commits in the history
3. It breaks tracking relationships for collaborators
4. It makes rollback and debugging difficult

### When Force Push Might Be Needed

- Local cleanup before first push
- Removing sensitive data (with coordination)
- Resetting feature branch to main (with coordination)

### Safe Alternative: Force With Lease

Force with lease checks for changes:

```bash
git push --force-with-lease
```

This fails if someone else has pushed since your last fetch, preventing accidental overwrites.

### Preventing Force Push Entirely

Configure Git to warn or prevent force push:

```bash
# Configure receive.denyCurrentBranch (in repository)
git config receive.denyCurrentBranch "refuse"
```

This prevents force pushes to the current branch entirely.

### Recovering from Force Push Accidents

If you accidentally force pushed:

1. Find the overwritten commits:
   ```bash
   git reflog
   git fsck --unreachable
   ```

2. Create branches at lost commits:
   ```bash
   git branch recovery abc1234
   ```

3. Coordinate with affected collaborators about merging

4. Communicate what happened

### Checklist Before Any Push

Before pushing, verify:

```bash
# See commits that will be pushed
git log origin/feature/my-feature..HEAD --oneline

# View changes that will be pushed
git diff origin/feature/my-feature...HEAD --stat

# Verify no unintended changes
git status -s
```

Review what will be included in the push.

---

## Branch Cleanup

### When to Delete Branches

Delete merged branches:

```bash
# See merged branches
git branch --merged main

# Delete locally
git branch -d feature/merged-feature

# Force delete if not merged
git branch -D feature/abandoned-feature
```

Delete remote branches when PR is closed:

```bash
# Delete remote branch
git push origin --delete feature/remote-feature

# Prune local references to deleted remotes
git fetch --prune
```

### Preserving Important Branches

Some branches should be preserved:

- Release branches (until no longer supported)
- Long-lived feature branches (document their purpose)
- Collaboration branches (until project completion)

### Listing Active Branches

View all branches:

```bash
# List all local branches
git branch

# List all remote branches
git branch -r

# List branches with status
git branch -vv

# Find branches containing commit
git branch --contains abc1234
```

### Archiving Old Branches

When a branch is complete but might be needed later:

```bash
# Create archive branch
git checkout -b archive/feature-2024-q1
git branch -d feature/old-feature

# Or rename for clarity
git branch -m feature/old-feature archive/old-feature
```

This keeps history accessible while cleaning active lists.

---

## Recovery Procedures

### Recovering from Reflog

Reflog records every HEAD position:

```bash
# View reflog
git reflog

# Find specific operation
git reflog --date=relative | grep "rebase"

# Create branch at old position
git branch recovery HEAD@{2}
```

Reflog entries persist for 90 days.

### Recovering Deleted Commits

Find and recover deleted commits:

```bash
# View reflog
git reflog

# Find commit
git reflog | grep "commit message"

# Create branch
git checkout -b recovery abc1234
```

Deleted commits remain in reflog until garbage collection.

### Recovering from Bad Reset

If reset went wrong:

```bash
# View reflog
git reflog

# Find previous state
git reset --hard HEAD@{1}
```

This returns to the state before the reset.

### Recovering from Interrupted Rebase

If rebase was interrupted:

```bash
# Check state
git status

# Continue rebase
git rebase --continue

# Or abort
git rebase --abort
```

Abort safely returns to pre-rebase state.

### Recovering from Lost Remote Commits

If remote commits are lost:

```bash
# Fetch from collaborator's clone
git fetch collaborator remote/feature-branch:feature/recovered

# Or use reflog if available locally
git reflog
```

Coordinate with collaborators to find lost commits.

### Verifying Recovery

After recovery, verify:

```bash
# Check history
git log --oneline -5

# Verify expected files
ls -la path/to/important-file

# Run tests
npm test
```

This confirms recovery was successful.

---

## Conflict Handling

### Understanding Conflicts

Conflicts occur when the same lines changed differently:

```
<<<<<<< HEAD
Current changes
=======
Incoming changes
>>>>>>> branch-name
```

Git marks both versions; you choose the final version.

### Detecting Conflicts

Git reports conflicts during merge or rebase:

```bash
# See conflicting files
git status
# Unmerged paths:
#   both modified: file.js
```

### Resolving Conflicts

Step-by-step:

1. Open conflicting file
2. Review both versions
3. Edit to create correct version
4. Remove conflict markers
5. Stage resolved file:
   ```bash
   git add file.js
   ```
6. Continue:
   ```bash
   git rebase --continue
   ```

### Using Merge Tools

Use visual tools for complex conflicts:

```bash
# Configure tool
git config --global merge.tool vimdiff

# Open merge tool
git mergetool

# After resolving, stage
git add file.js
```

Different tools have different interfaces.

### Aborting Conflict Resolution

If conflicts are overwhelming:

```bash
# Abort merge
git merge --abort

# Abort rebase
git rebase --abort
```

This returns to pre-operation state.

### Preventing Conflicts

Reduce conflicts through workflow:

- Merge main into feature branches regularly
- Communicate about file ownership
- Break large changes into smaller commits
- Avoid working on same files simultaneously

---

## Multi-Branch Management

### Working on Multiple Features

When juggling multiple branches:

```bash
# See all branches
git branch

# Switch between branches
git checkout feature/feature-a

# Save work on feature A
git stash save "feature-a"

# Switch to feature B
git checkout feature/feature-b

# Restore work on feature A
git stash pop
```

This workflow isolates work on each feature.

### Prioritizing Branches

Decide which branch to work on:

1. Highest priority: Active review feedback
2. Second priority: In-progress features
3. Third priority: Planned features

### Managing PR Feedback

When working on review feedback:

```bash
# Fetch latest main
git fetch origin main

# Create or switch to PR branch
git checkout -b pr/849 origin/pr/849

# Or update existing PR branch
git checkout pr/849
git pull --rebase origin main

# Make feedback changes
git add .
git commit -m "fix: address reviewer feedback"

# Push
git push
```

This isolates feedback changes from feature changes.

### Keeping Branches in Sync

When branches depend on each other:

```bash
# Fetch dependent branch
git fetch origin feature/dependent

# Rebase current on dependent
git rebase origin feature/dependent

# Continue until both are ready
```

This ensures changes flow correctly between branches.

---

## Collaborative Workflows

### Coordinating with Collaborators

Before force-pushing or history rewriting:

```bash
# Check who else has pushed
git log origin/feature..origin/feature --oneline

# Check tracking relationships
git branch -vv
```

Communicate through chat or email before modifying shared history.

### Code Review Process

When reviewing others' code:

```bash
# Fetch their branch
git fetch origin feature/their-feature

# Review changes
git diff origin/main...origin/feature/their-feature

# Test locally
npm test
```

Local testing catches issues before merge.

### Responding to Review Feedback

When addressing feedback:

```bash
# Switch to PR branch
git checkout pr/849

# Make changes
git add .
git commit -m "fix: address reviewer feedback"

# Push
git push
```

This keeps feedback changes organized.

### Merging Approved PRs

After PR is approved:

```bash
# Fetch and merge locally
git fetch origin
git checkout main
git merge origin/pr/849

# Push to main
git push origin main

# Delete feature branch
git push origin --delete feature/pr-849
```

This maintains clean history on main.

---

## Best Practices

### Daily Workflow

Start each day:

```bash
git fetch --all
git status
git log --oneline -5
```

Check for updates and your current position.

### Before Push Checklist

Before pushing:

```bash
git log origin/main..HEAD --oneline
git diff origin/main...HEAD --stat
npm test
```

Verify changes before sharing.

### After Push

After pushing:

```bash
git log --oneline -3
```

Confirm push succeeded.

### Commit Size Guidelines

Commits should be:
- Reviewable in 5-10 minutes
- Focused on single purpose
- Self-contained (can be reverted independently)

Large changes should be split into logical smaller commits.

### Branch Lifetime Guidelines

Features should complete within:
- 1-2 weeks for small features
- 1 month for medium features
- Break large features into smaller ones

Long-running branches accumulate conflicts.

### Documentation Standards

Commit messages should:
- First line under 50 characters
- Written in imperative mood ("Add feature" not "Added feature")
- Include issue references when applicable
- Explain why, not just what

---

## Workflow Templates

### Feature Workflow

```
# Start feature
git checkout -b feature/my-feature origin/main
git push -u origin feature/my-feature

# Work on feature
# Make changes, test, commit

# Keep current with main
git fetch origin main
git rebase origin/main

# Push changes
git push

# After review, merge to main
git checkout main
git pull
git merge origin/feature/my-feature
git push origin main
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Fix Workflow

```
# Start fix
git checkout -b fix/issue-123 origin/main

# Make minimal changes
git add .
git commit -m "fix: address issue #123"

# Push fix
git push -u origin fix/issue-123

# After review, merge
```

### PR Feedback Workflow

```
# Switch to PR branch
git checkout pr/849
git pull --rebase

# Make feedback changes
git add .
git commit -m "fix: address reviewer feedback"

# Push updates
git push
```

### Hotfix Workflow

```
# Start hotfix from release tag
git checkout -b hotfix/issue-123 v1.2.0

# Make minimal fix
git add .
git commit -m "hotfix: address production issue"

# Test thoroughly
npm test

# Push and request immediate review
git push -u origin hotfix/issue-123
```

---

## Troubleshooting

### Stuck Rebase

If rebase seems stuck:

```bash
# Check state
git status

# Continue
git rebase --continue

# Or abort
git rebase --abort
```

Aborting safely returns to pre-rebase state.

### Uncommitted Changes Block Switch

When Git prevents switching:

```bash
# Option 1: Commit
git add .
git commit -m "work in progress"
git checkout other-branch

# Option 2: Stash
git stash
git checkout other-branch
```

Choose based on whether you want to preserve changes.

### Pushed Commits Not Showing

If commits don't appear on remote:

```bash
# Verify push
git log origin/feature...HEAD --oneline

# Check remote URL
git remote -v

# Force with lease
git push --force-with-lease
```

Verify remote configuration.

### Merge vs Rebase Confusion

When unsure which to use:

- Use rebase for: Local feature branches, clean history
- Use merge for: Shared branches, preserving exact history

Merge is always safe; rebase requires caution.

### Lost Commits

If commits seem lost:

```bash
# View reflog
git reflog

# Find commit
git reflog | grep "commit message"

# Create branch
git checkout -b recovery abc1234
```

Reflog preserves history.

---

## Quick Reference

### Essential Commands

```bash
# Start work
git fetch --all
git checkout -b feature/my-feature origin/main
git push -u origin feature/my-feature

# Daily work
git add .
git commit -m "message"
git push

# Keep current
git fetch origin main
git rebase origin/main

# Clean up
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Branch Listing

```bash
git branch -a      # List all
git branch -vv    # With tracking
git branch -r    # Remote only
```

### Conflict Resolution

```bash
git status        # Find conflicts
git add file.js  # Stage resolution
git rebase --continue
git rebase --abort
```

### Recovery

```bash
git reflog        # View history
git reset --hard HEAD@{1}  # Undo
```

### Safety Checklist

Before any push:
- [ ] Fetch latest changes
- [ ] Review commits to be pushed
- [ ] Run tests locally
- [ ] Verify no unintended files

---

*Last updated: 2026*