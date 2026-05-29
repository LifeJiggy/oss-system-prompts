# GitHub Commands & Workflow Guide

> Comprehensive reference for managing Git repositories, creating clean pull requests, handling collaborative workflows, and recovering from common mistakes. This guide covers everything from basic operations to advanced recovery techniques.

---

## Table of Contents

1. [Fundamental Concepts](#fundamental-concepts)
2. [Initial Setup](#initial-setup)
3. [Branching Strategy](#branching-strategy)
4. [Daily Workflow](#daily-workflow)
5. [Commit Crafting](#commit-crafting)
6. [Syncing with Remote](#syncing-with-remote)
7. [Rebasing Mastery](#rebasing-mastery)
8. [Handling Conflicts](#handling-conflicts)
9. [Pushing Changes](#pushing-changes)
10. [Working with Pull Requests](#working-with-pull-requests)
11. [Recovery Techniques](#recovery-techniques)
12. [Advanced Operations](#advanced-operations)
13. [Collaborative Workflows](#collaborative-workflows)
14. [Troubleshooting](#troubleshooting)
15. [Quick Reference](#quick-reference)

---

## Fundamental Concepts

### Understanding Git's Architecture

Git is a distributed version control system that tracks changes to files over time. Unlike centralized systems where a single server holds the canonical history, Git stores a complete copy of the repository on every developer's machine. This architecture provides resilience against server failures and enables developers to work offline while maintaining full version history.

The fundamental unit in Git is the commit. Each commit contains a snapshot of your project at a specific point in time, along with metadata like the author, timestamp, and a message describing the changes. Commits are linked together in a chain, with each commit (except the first) pointing to its parent commit(s).

Branches in Git are simply movable pointers to commits. When you create a branch, Git creates a new pointer that you can move independently from other branches. This lightweight branching model is one of Git's most powerful features, enabling rapid experimentation without affecting the main codebase.

The HEAD pointer indicates your current position in the repository. In normal circumstances, HEAD points to the latest commit on your current branch. However, HEAD can also be detached, pointing directly to a specific commit rather than a branch. A detached HEAD state is useful for exploring code but risky for making commits, as any commits you create won't belong to any branch until you explicitly create one.

### The Three States of Git Files

Files in a Git repository exist in one of three states: modified, staged, or committed. Modified files have changes that haven't been saved to the repository yet. Staged files are modified files that you've marked for inclusion in the next commit. Committed files are safely stored in the Git database.

The workflow typically involves modifying files in your working directory, staging the changes you want to include in your next commit, and then committing those staged changes. This staged workflow provides fine-grained control over what goes into each commit.

When you run git status, Git reports the state of every file in your repository. Files can be in combinations of these states simultaneously, which adds complexity but also flexibility. For example, you might have staged some changes to a file while also having unstaged changes to the same file.

### References and Refs

Git uses references (refs) to track commits, branches, and tags. Branch names are refs that point to commits, stored in .git/refs/heads/. Tag names are refs pointing to commits or annotated objects, stored in .git/refs/tags/. Special refs like HEAD, ORIG_HEAD, and FETCH_HEAD track current and recent positions.

Understanding refs is essential for advanced Git operations. When you see a command that references ORIG_HEAD, that's pointing to the commit before a merge or rebase operation. FETCH_HEAD points to the commit most recently fetched from a remote repository.

The .git directory contains the entire repository history. Inside it, you'll find the refs directory with subdirectories for branches, tags, and other references. The objects directory contains all the compressed objects that make up your repository. The logs directory contains reflogs that track changes to refs over time.

---

## Initial Setup

### Installing Git

On macOS, Git comes pre-installed with the developer tools. You can verify its presence by opening Terminal and typing git --version. If Git isn't installed, you'll be prompted to install the developer tools.

On Windows, the recommended approach is to install Git using winget, Chocolatey, or the official installer from git-scm.com. The installer provides options for integrating Git with the Windows command prompt and for choosing default editor settings.

On Linux, install Git through your package manager. On Debian-based distributions like Ubuntu, use apt-get install git-all. On Fedora and Red Hat-based systems, use dnf install git. Other distributions have similar package management commands.

After installation, verify Git is working by running git --version in your terminal. This command should print the installed Git version, confirming that the installation succeeded.

### Configuring Your Identity

Before making any commits, configure your identity. Git attaches your name and email to every commit you create, so this information should accurately identify you across all your work.

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

The --global flag stores this configuration in your home directory's .gitconfig file, making it the default for all repositories on your system. If you need different identities for different repositories (for example, work versus personal projects), you can configure them locally within each repository by omitting the --global flag.

Choose an email address associated with your GitHub account for proper attribution of your contributions. GitHub uses email addresses to match commits to user accounts, so matching email addresses ensure your contributions are properly attributed on your profile.

### Setting Your Default Editor

Git opens your default editor for writing commit messages and other text input. Set this to your preferred editor:

```bash
# For Visual Studio Code (recommended)
git config --global core.editor "code --wait"

# For Vim
git config --global core.editor "vim"

# For Nano
git config --global core.editor "nano"

# For Windows Notepad
git config --global core.editor "notepad.exe"
```

The --wait flag tells the command to wait until you close the editor before proceeding, which is necessary for Git to read the message you've written. Visual Studio Code users should ensure the code command is in their PATH, which the VS Code installer typically configures automatically.

### Configuring Line Endings

Line ending conventions differ between operating systems. Windows uses CRLF (carriage return and line feed), while Unix-like systems use LF only. Inconsistent line endings can cause problems in collaborative projects.

```bash
# On Windows (recommended for cross-platform projects)
git config --global core.autocrlf true

# On Unix/Linux/Mac (recommended for cross-platform projects)
git config --global core.autocrlf input

# Disable line ending conversion (not recommended for cross-platform)
git config --global core.autocrlf false
```

The true setting converts LF to CRLF when checking out files on Windows and converts CRLF to LF when committing. The input setting only converts CRLF to LF when committing, which is appropriate for repositories where you never work on Windows.

### Setting Default Branch Name

Modern Git defaults to main as the primary branch name, but older installations may default to master:

```bash
git config --global init.defaultBranch main
```

This setting affects newly created repositories. Existing repositories can be renamed locally using git branch -M main, though this requires coordination on shared repositories.

### Creating Useful Aliases

Aliases create shortcuts for frequently used commands. They're stored in your Git configuration and available across all repositories:

```bash
# Status shortcuts
git config --global alias.st "status"
git config --global alias.s "status -s"

# Branch shortcuts
git config --global alias.br "branch"
git config --global alias.co "checkout"
git config --global alias.cb "checkout -b"

# Commit shortcuts
git config --global alias.ci "commit"
git config --global alias.ca "commit --amend"

# Diff shortcuts
git config --global alias.df "diff"
git config --global alias.dc "diff --cached"
git config --global alias.d "diff --stat"

# Log shortcuts
git config --global alias.lg "log --oneline"
git config --global alias.lga "log --oneline --all --graph"
git config --global alias.lg-last "log -1 --stat"

# Stash shortcuts
git config --global alias.sl "stash list"
git config --global alias.sa "stash apply"
git config --global alias.ss "stash save"

# Reset shortcuts
git config --global alias.undo "reset --soft HEAD~1"
```

These aliases make common operations faster. The -s flag for status produces more compact output, and the --graph flag for log produces a visual representation of branch history.

### Enabling Helpful Settings

Several settings improve your Git experience:

```bash
# Enable color output
git config --global color.ui auto

# Enable credential caching (remembers passwords for 15 minutes)
git config --global credential.helper cache

# Enable rerere (reuse recorded resolution of conflicts)
git config --global rerere.enabled true

# Enable pull to rebase instead of merge (per-branch recommendation)
git config --global pull.rebase false

# Set default pull behavior to fast-forward only
git config --global ff only

# Enable staging of all changes (including deleted files)
git config --global add.all git add -u
```

The rerere setting remembers how you resolved conflicts previously and applies those resolutions automatically when it sees the same conflict. The pull.rebase setting changes default pull behavior to rebasing instead of merging, which creates cleaner history but should only be used when you're comfortable with rebasing.

---

## Branching Strategy

### Understanding Branches

A branch in Git is simply a movable pointer to a commit. When you create a branch, Git creates a new pointer without modifying any files. This lightweight model enables rapid branching and merging without copying files.

The default branch in most Git repositories is main or master. This branch represents the canonical history of the project and is typically the source for releases or the basis for production deployments. Protecting this branch from direct pushes ensures that all changes go through review.

Feature branches isolate work on specific features or fixes. Creating a new branch for each logical unit of work enables parallel development without interfering with other work. When the feature is complete, the feature branch merges into the main branch.

Release branches prepare for production releases. They typically receive bug fixes while new development continues on the main branch. When the release is ready, it's merged into both the main branch and any other release branches that need the changes.

Hotfix branches address urgent production issues. They branch from the production release and merge back into both the main branch and the current release branch. This workflow enables rapid response to production issues without disrupting ongoing development.

### Naming Conventions

Consistent branch naming makes it easy to identify the purpose of each branch. A common pattern combines the type of work with a brief description:

```
feature/user-authentication
feature/payment-integration
feature/performance-optimization

fix/login-validation
fix/memory-leak
fix/correct-calculation

hotfix/security-patch
hotfix/production-crash

refactor/api-client
refactor/database-layer

docs/api-reference
docs/installation-guide

test/new-coverage
test/benchmarking
```

Avoid branch names that are too generic like "test", "changes", or "fix". Include enough context that someone reading the branch name understands its purpose. However, avoid names that are so long they're unwieldy.

Some teams include ticket numbers in branch names for easier tracking in project management tools:

```
feature/123-user-authentication
fix/456-login-validation
```

If your team uses this convention, include it consistently. However, ticket numbers mean little without access to the project management tool, so the human-readable description remains important.

### Creating Branches

Create new branches from a known-good state:

```bash
# Create from the current HEAD
git checkout -b feature/new-feature

# Create from a specific branch
git checkout -b feature/new-feature main

# Create from a specific tag
git checkout -b release/v1.2.0 v1.2.0

# Create from a specific commit
git checkout -b fix/issue abc1234
```

The -b flag creates the branch and checks it out in one operation. Without -b, you'd need to create the branch and then check it out separately.

When creating feature branches, start from the main branch rather than from other feature branches. This practice reduces the coupling between features and makes it easier to reorder or remove features later.

### Switching Branches

Switch between branches using checkout:

```bash
# Switch to an existing branch
git checkout feature/other-feature

# Switch to main
git checkout main

# Create and switch in one command
git checkout -b feature/new-feature
```

Git prevents switching branches when you have uncommitted changes that would be lost. Stash your changes or commit them before switching branches.

Modern Git (2.23+) supports a simplified syntax:

```bash
git switch feature/other-feature
git switch -c feature/new-feature
```

The git switch command is clearer about its purpose than git checkout, which handles both branches and files. Use whichever syntax feels natural.

### Deleting Branches

Clean up merged branches:

```bash
# Delete a fully merged branch
git branch -d feature/completed-feature

# Force delete an unmerged branch
git branch -D feature/abandoned-feature

# Delete remote branch
git push origin --delete feature/remote-feature

# Prune deleted remote branches locally
git fetch --prune
```

Git prevents deleting unmerged branches with -d, requiring -D to force deletion. This safety catch prevents accidental loss of work, though the work remains recoverable from the reflog.

### Listing Branches

View all branches:

```bash
# List local branches
git branch

# List remote branches
git branch -r

# List all branches (local and remote)
git branch -a

# List branches with last commit info
git branch -v

# List merged branches
git branch --merged main

# List unmerged branches
git branch --no-merged main
```

The merged/unmerged flags filter branches based on whether they've been merged into the specified branch. This filtering helps identify branches that might be safe to delete.

---

## Daily Workflow

### Starting Your Day

Begin each day by fetching updates and checking your current position:

```bash
# Fetch all updates from remotes
git fetch --all

# Check current status
git status

# Review recent commits
git log --oneline -5

# See what you're working on
git branch -v
```

Fetching updates your local view of remote branches without modifying your working directory. This lightweight operation takes seconds and keeps you aware of the overall state of the project.

### Checking Your Work

Throughout the day, verify your changes:

```bash
# See modified files
git status -s

# View unstaged changes
git diff

# View staged changes
git diff --cached

# View specific file changes
git diff path/to/file.js

# View changes since last commit
git diff HEAD
```

Reviewing changes before staging helps catch unintended modifications. The git diff command shows exactly what changed, line by line, so you can verify each change is intentional.

### Staging Changes

Stage changes for commit:

```bash
# Stage all changes to tracked files
git add -u

# Stage all changes (including new files)
git add .

# Stage specific files
git add file1.js file2.js

# Stage all changes and commit in one step
git commit -am "message"
```

Note that git add -u stages modifications and deletions but not new files. For new files, use git add . or explicitly add each new file.

### Interactive Staging

For fine-grained control, use interactive staging:

```bash
# Stage individual hunks
git add -p

# Interactive staging
git add -i
```

Interactive staging with -p (patch) lets you review each change and decide whether to stage it. This granularity helps create focused commits when you've made multiple unrelated changes.

When prompted with each hunk, you can choose:
- y: Stage this hunk
- n: Skip this hunk
- s: Split into smaller hunks
- e: Manually edit the hunk
- q: Quit

### Committing

Create commits with clear messages:

```bash
# Basic commit
git commit -m "Add user authentication"

# Include all changes in tracked files
git commit -am "Fix validation bug"

# Amend the last commit (if it needs changes)
git commit --amend --no-edit

# Specify commit message in command
git commit -m "Subject line" -m "Detailed explanation"
```

The -am combination stages all changes to tracked files and commits in one step. Use this only when you want to include all changes. When you want to commit only some changes, stage explicitly first.

### Pushing Commits

Share your commits:

```bash
# Push to set upstream for new branches
git push -u origin feature/my-feature

# Simple push (after upstream is set)
git push

# Push all branches
git push --all

# Push tags
git push --tags
```

The -u (set-upstream) flag establishes tracking relationship for new branches. After this, git push without specifying remote and branch uses the tracked settings.

---

## Commit Crafting

### Anatomy of a Good Commit

A well-crafted commit contains focused changes that can be understood independently. Each commit should address a single logical change, making it easy to understand, review, and if necessary, revert.

The commit message explains the change. A good commit message has a short first line (under 50 characters), followed by a blank line and a detailed explanation. The first line should complete the sentence "This commit will..." and be written in imperative mood.

For example:

```
Add user authentication flow

Implement login and logout functionality using JWT tokens.
Store refresh tokens securely in httpOnly cookies.
Add CSRF protection for state-changing operations.
This enables persistent sessions across browser restarts.

Fixes #123
Related to #456
```

### Commit Message Style

Follow your project's commit message conventions. Many projects follow the Conventional Commits specification, which standardizes commit message format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

The type indicates the kind of change: feat, fix, docs, style, refactor, test, chore. The scope (optional) identifies the affected module. The subject summarizes the change.

Examples following this convention:

```
feat(auth): add JWT-based authentication
fix(api): handle null response from external service
docs(readme): update installation instructions
refactor(database): extract connection pooling
test(api): add integration tests for auth flow
```

### What to Commit

Commit complete, working changes. Avoid committing partial work that breaks functionality. However, "complete" doesn't mean "finished" in the sense of being ready for release. A complete change is one that makes logical sense independently.

Small, frequent commits are better than large, infrequent commits. Each commit should be reviewable in a few minutes. Large commits take longer to review and are harder to understand when something goes wrong.

Don't commit generated files, build artifacts, or sensitive information. Add these to .gitignore before committing. Generated files should be regenerated, not stored in version control.

### Atomic Commits

An atomic commit contains changes for a single purpose. If changes must be reverted, they can be reverted together. If changes need to be reviewed, they're reviewable together.

Examples of non-atomic commits:
- "Fix bug and add feature" (two purposes)
- "Update config and fix related code" (better split by purpose)
- "Various improvements" (unknown purposes)

Examples of atomic commits:
- "Add validation for email field"
- "Fix off-by-one error in loop"
- "Extract user service to separate module"

### Commit Hygiene

Review changes before committing:

```bash
# View what will be committed
git diff --staged

# Verify file list
git status

# Check commit message
git log -1 --stat
```

Staged changes are what will be committed. The git diff --staged command shows exactly what will be included, helping catch unintended changes.

### Finding What to Commit

View uncommitted changes:

```bash
# List changed files
git status -s

# Show changes
git diff

# Search for specific patterns
git diff -S "search_term"
```

The -S flag shows commits that added or removed the search term. This searching helps find related commits when debugging issues.

---

## Syncing with Remote

### Understanding Remotes

A remote is a URL that Git uses to communicate with a remote repository. When you clone a repository, the default remote is "origin". You can add additional remotes for different purposes.

Common remote naming conventions:
- origin: Your fork or the canonical repository
- upstream: The original repository (when working with forks)

### Viewing Remotes

```bash
# List remotes
git remote -v

# Show remote details
git remote show origin

# Show remote URLs
git remote get-url origin
git remote get-url --push origin
```

### Adding Remotes

```bash
# Add a remote
git remote add upstream https://github.com/original/repo.git

# Add a read-only remote
git remote add read-only https://github.com/read-only/repo.git

# Set multiple push targets
git remote set-url --push origin git@github.com:user/repo.git
git remote add github git@github.com:user/repo.git
```

When working with forks, add the original repository as "upstream". This setup enables fetching changes from the original repository and merging them into your work.

### Fetching Updates

Fetch downloads changes without modifying your working directory:

```bash
# Fetch from all remotes
git fetch --all

# Fetch from specific remote
git fetch upstream

# Fetch specific branch
git fetch origin feature/branch-name

# Fetch and prune (remove deleted branches)
git fetch --prune
```

Fetch is safe because it only downloads objects. After fetching, your working directory remains unchanged, and you can review changes before merging them.

### Pulling Updates

Pull fetches and merges changes in one operation:

```bash
# Pull from tracked branch
git pull

# Pull from specific branch
git pull origin main

# Pull and rebase instead of merge
git pull --rebase origin main

# Pull specific branch
git pull origin feature/branch-name
```

The --rebase flag changes merge behavior from creating a merge commit to rebasing your commits on top of fetched changes. This creates cleaner history but can complicate work if you've made multiple commits.

### When to Fetch vs Pull

Fetch when you want to review changes before merging. Pull when you want to immediately incorporate changes. In team environments, fetching first lets you see what's changed before modifying your working directory.

---

## Rebasing Mastery

### Understanding Rebase

Rebasing moves your commits to a new base commit. Instead of creating a merge commit, rebasing recreates each commit as if it had been made on top of the new base.

The key difference between merge and rebase:
- Merge preserves history but creates complex commit graphs
- Rebase creates linear history but rewrites commits

Rebase rewrites commit history, which is fine for local branches that haven't been shared. Never rebase commits that others have based work on, as this creates duplicate commits and confuses history.

### Basic Rebasing

```bash
# Rebase your branch on main
git rebase main

# Continue after resolving conflicts
git rebase --continue

# Abort rebase and return to original state
git rebase --abort

# Skip the current commit
git rebase --skip
```

When rebasing encounters conflicts, resolve them in the files and stage with git add. Then continue the rebase with git rebase --continue. To abandon the rebase entirely, use git rebase --abort.

### Interactive Rebasing

Interactive rebase gives you control over commits:

```bash
# Rebase last 5 commits interactively
git rebase -i HEAD~5

# Rebase all commits since branching from main
git rebase -i main
```

In interactive mode, you can:
- pick: Use the commit as-is
- reword: Change the commit message
- edit: Stop for amending
- squash: Combine with previous commit
- fixup: Combine, discarding this commit's message
- drop: Remove the commit

### Common Interactive Commands

Squash commits together:

```
pick abc1234 Add feature X
pick def5678 Fix bug in feature X
pick ghi8901 Add more to feature X

# Change to:
pick abc1234 Add feature X
f def5678 Fix bug in feature X
f ghi8901 Add more to feature X
```

The squash (s) command combines commits and prompts for a new message. The fixup (f) command combines commits and discards this commit's message, using only the first commit's message.

Reorder commits:

```
# Change order in the file:
pick abc1234 Change B
pick def5678 Change A

# Result: Change A before Change B
```

Edit a commit:

```
# Mark for editing:
edit abc1234 Add feature

# Make changes, then:
git add -p
git commit --amend
git rebase --continue
```

Split a commit:

```
edit abc1234 Add feature

# During edit, reset and re-stage:
git reset HEAD
git add file1.js
git commit -m "First part of feature"
git add file2.js
git commit -m "Second part of feature"
git rebase --continue
```

### Rebasing Best Practices

Never rebase commits that have been pushed to shared branches. Once others have your commits, rewriting history creates duplicate commits and potential data loss when others pull.

Use rebase for:
- Cleaning up local commits before pushing
- Incorporating main branch changes into feature branches
- Maintaining linear history on feature branches

Use merge for:
- Combining finished feature branches into main
- Preserving history of when features were integrated
- Situations where commit history matters

### Rebase vs Merge Decision Tree

Choose rebase when:
- Branch is local-only (hasn't been pushed)
- You prefer clean, linear history
- Feature is small and easily reviewed
- No risk of conflicts with others' work

Choose merge when:
- Branch has been pushed and shared
- Multiple people contributed to the branch
- You need to preserve exact history
- Working with release branches

---

## Handling Conflicts

### Understanding Conflicts

Conflicts occur when Git cannot automatically merge changes. This happens when the same lines were modified in different ways or when one branch deleted a file that another branch modified.

Git marks conflicting sections in files with conflict markers:

```
<<<<<<< HEAD
Current changes from your branch
=======
Incoming changes from other branch
>>>>>>> branch-name
```

Understanding what each section represents:
- <<<<<<< HEAD: Your changes
- =======: Separator between changes
- >>>>>>> branch-name: Their changes

### Detecting Conflicts

Git reports conflicts during merge or rebase operations:

```bash
# During merge
git merge feature/branch
# CONFLICT: file.js

# During rebase
git rebase main
# CONFLICT: file.js
```

The error message identifies conflicting files. Check git status to see all conflicts:

```bash
git status
# Unmerged paths:
#   both modified: file.js
```

### Resolving Conflicts

Step-by-step conflict resolution:

1. Open conflicting files in your editor
2. Understand what each version contains
3. Edit to create the correct final version
4. Remove conflict markers
5. Stage the resolved files
6. Continue the operation

Example resolution:

```
<<<<<<< HEAD
const value = 10;
=======
const value = 20;
>>>>>>> feature/new-value

// After resolution:
const value = 15;
```

Sometimes neither version is correct, and you need to create a third version. Sometimes you need both changes combined.

### Tools for Conflict Resolution

Use tools to simplify conflict resolution:

```bash
# Use configured merge tool
git mergetool

# Set merge tool (vim, meld, kdiff3, etc.)
git config --global merge.tool vimdiff
```

The mergetool command opens a visual merge tool for resolving conflicts. Different tools have different interfaces, but all show the base version, your changes, and their changes side by side.

### After Resolving

Complete the merge or rebase after resolving:

```bash
# Stage resolved files
git add file1.js file2.js

# Continue merge
git commit

# Continue rebase
git rebase --continue
```

For merge conflicts, the commit is pre-populated with a merge message. For rebase conflicts, you continue the rebase operation.

### Aborting Conflicts

If conflicts are too complex, abort:

```bash
# Abort merge
git merge --abort

# Abort rebase
git rebase --abort
```

Aborting returns to the state before the operation started. This is safe when conflicts are overwhelming.

### Preventing Conflicts

Reduce conflicts through workflow:
- Merge main into feature branches regularly
- Communicate with teammates about file ownership
- Break large changes into smaller commits
- Avoid working on the same files simultaneously

---

## Pushing Changes

### First Push

Push a new branch:

```bash
git push -u origin feature/my-feature
```

The -u flag sets upstream tracking, so future pushes need only git push. After this, Git remembers where to push.

### Subsequent Pushes

Push to tracked branch:

```bash
git push
```

Git uses the upstream tracking set during the first push. Verify the tracking configuration:

```bash
git branch -vv
```

This shows upstream tracking for each branch.

### Push Variations

```bash
# Push all branches
git push --all

# Push all tags
git push --tags

# Push all (branches and tags)
git push --all --tags

# Push specific branch
git push origin feature/my-feature

# Push to specific remote
git push lifejiggy feature/my-feature
```

### Handling Rejected Pushes

When push is rejected, others have pushed changes:

```bash
# Fetch their changes
git fetch origin

# Rebase your changes on their changes
git rebase origin/feature/my-feature

# Push again
git push
```

The fetch-rebase-push workflow maintains linear history while incorporating others' work.

### Force Pushing

Force push rewrites history:

```bash
# Force push (dangerous)
git push --force

# Safer force push (checks for changes)
git push --force-with-lease

# Force push to specific remote
git push --force origin feature/my-feature
```

Force with lease is safer because it fails if someone else has pushed changes since your last fetch. This prevents accidentally overwriting their work.

### When to Force Push

Never force push to shared branches. Only force push when:
- You control the branch
- You're certain no one else has pushed changes
- You've communicated with collaborators
- Local history must replace remote history

Common acceptable scenarios:
- Cleaning up local commits before first push
- Removing sensitive data (with coordination)
- Resetting feature branch to main

### Push Verification

Before pushing, verify what will be sent:

```bash
# See commits that will be pushed
git log origin/main..HEAD --oneline

# See changes that will be pushed
git diff origin/main...HEAD --stat

# See full diff
git diff origin/main...HEAD
```

Review these before pushing to catch unintended changes.

---

## Working with Pull Requests

### Creating Pull Requests

After pushing your branch, create a pull request:

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch and base branch
4. Fill in the PR description
5. Submit

### PR Description Template

A good PR description:

```
## Summary
Brief description of changes

## Changes
- List of changes made
- Each change on its own line

## Testing
How the changes were tested

## Related Issues
Fixes #123
Related to #456
```

### Updating Pull Requests

Push new commits to update:

```bash
git push
```

New commits automatically appear in the PR.

### Rebasing Pull Requests

If main has advanced, rebase your branch:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

The force push updates the PR with rebased commits.

### Merging Pull Requests

Merge on GitHub or locally:

```bash
# Fetch and merge locally
git fetch origin
git checkout main
git merge feature/my-feature
git push
```

GitHub provides merge options:
- Create merge commit
- Squash and merge
- Rebase and merge

### Closing Pull Requests

Close without merging:

```bash
# Close via GitHub UI, or:
git push origin --delete feature/my-feature
# Then close via GitHub UI
```

Include explanation for closing without merging.

### PR Review Workflow

Review changes on GitHub or locally:

```bash
# Fetch PR
git fetch origin pull/123/head:pr-123
git checkout pr-123

# Review changes
git diff main..pr-123

# Test
npm install
npm test
```

Local testing of PRs before merging helps catch issues.

---

## Recovery Techniques

### The Reflog

The reflog records every position HEAD has been at:

```bash
# View reflog
git reflog

# View for specific branch
git reflog show feature/my-feature

# Find lost commit
git reflog | grep "commit message"
```

Reflog entries include timestamps and operations. Entries persist for 90 days by default.

### Recovering Deleted Commits

Find and recover deleted commits:

```bash
# View reflog
git reflog

# Create branch at lost commit
git branch recovery abc1234

# Or checkout and continue
git checkout abc1234
```

Deleted commits remain in reflog until garbage collection.

### Undoing Changes to Files

Recover specific files:

```bash
# Discard working directory changes
git checkout -- file.js
git restore file.js  # modern Git

# Restore from specific commit
git checkout abc1234 -- file.js
git restore --source=abc1234 file.js
```

### Unstaging Files

Unstage without losing changes:

```bash
git reset HEAD file.js
git restore --staged file.js  # modern Git
```

The file contents remain unchanged.

### Recovering from Bad Merge

Abort merge if it went wrong:

```bash
git merge --abort
```

This returns to the pre-merge state.

### Recovering from Bad Rebase

Abort rebase:

```bash
git rebase --abort
```

Or recover if rebase completed but you want old state:

```bash
git reflog
# Find pre-rebase state
git reset --hard HEAD@{before-rebase}
```

### Reverting Commits

Create new commits that undo changes:

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert abc1234

# Revert range
git revert abc1234..def5678
```

Reverting is safer than resetting for pushed commits because it preserves history.

### Resetting Commits

Undo commits while keeping changes:

```bash
# Keep changes staged
git reset --soft HEAD~1

# Keep changes in working directory
git reset HEAD~1

# Discard all changes (dangerous)
git reset --hard HEAD~1
```

Reset is safe for local commits but dangerous for pushed commits.

### Cleaning Up Large Files

Remove large files from history:

```bash
# Find large objects
git rev-list --objects --all | git cat-file --batch-check='%(objectsize) %(objectname) %(objecttype) %(rest)' | sort -rn | head -20

# Remove from history
git filter-branch --tree-filter 'rm -f large-file.zip' --prune-empty --tag-name-filter cat -- --all
```

Removing large files from history reduces repository size.

---

## Advanced Operations

### Cherry-Picking

Apply specific commits:

```bash
# Cherry-pick single commit
git cherry-pick abc1234

# Cherry-pick without committing
git cherry-pick -n abc1234

# Cherry-pick range
git cherry-pick abc1234..def5678

# Cherry-pick with message
git cherry-pick -m 1 abc1234
```

Cherry-pick applies changes from specific commits, creating new commits with the same changes.

### Blaming

Find who changed each line:

```bash
# Blame specific file
git blame file.js

# Blame with ignored whitespace
git blame -w file.js

# Blame specific lines
git blame -L 10,20 file.js
```

Blaming shows the last commit that changed each line.

### Bisecting

Find the commit that introduced a bug:

```bash
# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good abc1234

# After testing, mark good or bad
git bisect good
git bisect bad

# End bisect
git bisect reset
```

Git bisects by checkout commits halfway between good and bad. After testing each, mark and continue until the bad commit is found.

### Stashing

Temporarily save work:

```bash
# Save work
git stash
git stash save "work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Drop stash
git stash drop stash@{2}

# Create branch from stash
git stash branch new-feature
```

Stashes persist until explicitly dropped.

### Tagging

Create and manage tags:

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# List tags
git tag

# Show tag
git show v1.0.0

# Push tags
git push --tags

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

Tags mark specific commits and are often used for releases.

### Submodules

Manage nested repositories:

```bash
# Add submodule
git submodule add https://github.com/user/repo.git libs/repo

# Clone with submodules
git clone --recursive https://github.com/user/repo.git

# Update submodules
git submodule update --init --recursive

# Execute command in submodules
git submodule foreach 'git checkout main'
```

Submodules keep nested dependencies in sync with specific commits.

---

## Collaborative Workflows

### Fork and Clone

Contributing to projects you don't have push access to:

```bash
# Fork on GitHub
# Clone your fork
git clone https://github.com/your-user/repo.git

# Add upstream remote
git remote add upstream https://github.com/original/repo.git
```

### Syncing Forks

Keep your fork updated:

```bash
# Fetch upstream
git fetch upstream

# Merge upstream into main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

Do this regularly to avoid large conflicts.

### Sending Pull Requests from Forks

1. Create a branch in your fork
2. Make changes and push
3. Create PR on GitHub
4. Respond to review feedback

### Code Review Process

Reviewing others' code:

```bash
# Fetch and checkout their branch
git fetch origin
git checkout -b review/their-branch origin/their-branch

# Review changes
git diff main..HEAD

# Run tests
npm test

# Clean up review branch
git checkout main
git branch -D review/their-branch
```

### Managing Multiple Remotes

Working with multiple remotes:

```bash
# List all remotes
git remote -v

# Fetch from all
git fetch --all

# Push to specific remote
git push origin feature/my-feature
git push lifejiggy feature/my-feature

# Set default push remote
git config push.default current
```

### Team Workflow Conventions

Establish team conventions:
- Branch naming
- Commit message format
- PR description requirements
- Review requirements before merge
- Who can merge to main

Document these in CONTRIBUTING.md or a team wiki.

---

## Troubleshooting

### SSL Certificate Errors

On Windows, configure SSL:

```bash
git config --global http.sslBackend openssl
```

Or disable SSL verification (not recommended for production):

```bash
git config --global http.sslVerify false
```

### Authentication Failures

Set up authentication:

```bash
# Use credential manager
git config --global credential.helper manager

# For GitHub, use token authentication
git remote set-url origin https://TOKEN@github.com/user/repo.git

# For SSH, verify key
ssh -T git@github.com
```

### Large File Errors

GitHub limits file sizes:

```bash
# Find large files
git ls-files | xargs du -h | sort -rh | head -10

# Remove from history
git filter-branch --tree-filter 'rm -f large-file.zip' --prune-empty --tag-name-filter cat -- --all
git push --force
```

### Detached HEAD

Recover from detached HEAD:

```bash
# Create branch at current position
git checkout -b recovery

# Return to branch
git checkout main
```

Commits made in detached HEAD are only saved if you create a branch.

### Empty Commits

Prevent empty commits:

```bash
# Git prevents this by default
git commit --allow-empty -m "Trigger build"
```

Use empty commits to trigger CI/CD pipelines.

### Corrupted Repository

Recover from corruption:

```bash
# Verify repository
git fsck

# Clean up
git gc --aggressive
git prune

# Recover lost objects
git reflog
git checkout abc1234
```

Severe corruption may require re-cloning.

---

## Quick Reference

### Setup Commands

```bash
# Initial setup
git config --global user.name "Name"
git config --global user.email "email"
git config --global core.editor "code --wait"

# Create repository
git init
git clone https://github.com/user/repo.git
```

### Branch Commands

```bash
# Create and switch
git checkout -b feature/branch
git switch -c feature/branch

# List branches
git branch
git branch -a
git branch -v

# Switch branches
git checkout main
git switch main

# Delete branch
git branch -d feature/branch
git branch -D feature/branch
```

### Staging and Committing

```bash
# Stage files
git add file.js
git add .
git add -p

# Unstage files
git reset HEAD file.js
git restore --staged file.js

# Commit
git commit -m "message"
git commit -am "message"
git commit --amend
```

### Syncing

```bash
# Fetch
git fetch --all

# Pull
git pull
git pull --rebase

# Push
git push
git push -u origin feature/branch
git push --force-with-lease
```

### Inspection

```bash
# Status
git status
git status -s

# Diff
git diff
git diff --staged
git diff --cached

# Log
git log
git log --oneline
git log --graph --all
git log -5

# Show
git show abc1234
```

### Recovery

```bash
# Reflog
git reflog
git reflog show HEAD@{1}

# Reset
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1

# Revert
git revert HEAD
git revert abc1234
```

### Stash

```bash
git stash
git stash save "message"
git stash list
git stash apply
git stash pop
git stash drop
```

### Tags

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "message"
git tag -d v1.0.0
git push --tags
```

### Cleaning

```bash
# Dry run cleaning
git clean -n

# Remove untracked files
git clean -f

# Remove untracked directories
git clean -fd
```

### Aliases (Common Set)

```bash
alias.st="status -s"
alias.co="checkout"
alias.br="branch"
alias.ci="commit"
alias.df="diff"
alias.lg="log --oneline --graph --all"
alias.lga="log --oneline --all --graph"
alias.sl="stash list"
alias.sa="stash apply"
alias.ss="stash save"
```

---

## Final Principles

### Safety First

Always understand commands before running them. Commands like reset and filter-branch can permanently lose work. When in doubt, back up first.

### Explicit Over Implicit

Specify files, branches, and commits explicitly. The extra typing prevents accidents and makes commands clearer in history.

### Fetch Before Action

Never hurt to download latest changes before making decisions. Fetch is fast and safe, and ensures your view is current.

### Small, Focused Commits

Each commit should represent one logical change. Small commits are easier to review, understand, and if necessary, revert.

### Communication

When your actions affect others' work, communicate first. Force pushing, history rewriting, and branch deletions all have potential impact on collaborators.

### Keep Learning

Git is deep. The commands in this guide cover most daily needs, but Git has much more to offer. Continue learning through documentation, tutorials, and practice.

---

*Last updated: 2026*