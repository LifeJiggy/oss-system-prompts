# OSS Tooling Ecosystem — CI/CD, Package Management, Quality & Monitoring — Universal Reference

> **Audience:** Any open-source developer, maintainer, or team lead evaluating or adopting tooling for OSS projects.
> **Scope:** CI/CD platforms, package managers, code quality tools, testing frameworks, monitoring/observability, collaboration platforms, security tooling, dev environment automation, and decision frameworks.
> **Last updated:** 2026-05-19

---

## Table of Contents

1. [CI/CD Platforms & Pipelines](#part-1-cicd-platforms--pipelines)
2. [Package Managers by Ecosystem](#part-2-package-managers-by-ecosystem)
3. [Code Quality & Linting Tools](#part-3-code-quality--linting-tools)
4. [Testing Frameworks & Tools](#part-4-testing-frameworks--tools)
5. [Monitoring, Observability & Analytics](#part-5-monitoring-observability--analytics)
6. [Collaboration & Communication Tools](#part-6-collaboration--communication-tools)
7. [Security Tooling](#part-7-security-tooling)
8. [Development Environment & Automation](#part-8-development-environment--automation)
9. [Tool Selection Decision Frameworks](#part-9-tool-selection-decision-frameworks)
10. [Templates](#part-10-templates)

---

## Part 1: CI/CD Platforms & Pipelines

Continuous Integration and Continuous Deployment/Delivery pipelines are the backbone of modern open-source development. This section covers every major platform, their syntax, strengths, weaknesses, and best practices.

### 1.1 GitHub Actions

GitHub Actions is the most widely adopted CI/CD platform among OSS projects due to its tight GitHub integration and zero-cost tier for public repositories.

#### Workflow Syntax (YAML)

Workflows live in `.github/workflows/` and are triggered by events:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

**Key features:**

- **Matrix builds** — test across OSes, language versions, and dependency sets in parallel
- **Action marketplace** — 20,000+ pre-built actions; pinned by commit SHA for security
- **Self-hosted runners** — scale your own hardware for private repos or specialized needs
- **Caching** — `actions/cache` and `actions/setup-*` built-in caching for dependencies
- **OIDC (OpenID Connect)** — authenticate to cloud providers without storing cloud credentials as secrets; exchanges JWT tokens with AWS, GCP, Azure, HashiCorp Vault
- **Reusable workflows** — call one workflow from another; compose pipelines from shared modules
- **Environment protection rules** — required reviewers, wait timers, deployment branches
- **Artifacts** — upload/test/download between jobs with `actions/upload-artifact` and `actions/download-artifact`
- **Service containers** — spin up PostgreSQL, Redis, or any Docker service beside the job
- **Concurrency groups** — cancel in-progress runs when new pushes arrive

#### Action Marketplace Best Practices

- Pin actions by **commit SHA**, not semver tag (tags can be moved)
- Use `dependabot` with `github-actions` ecosystem to auto-update SHAs
- Prefer official `actions/*` and `github/*` actions when available
- Audit third-party actions for credential exfiltration (especially `curl | bash` patterns)

#### Self-Hosted Runner Architecture

Self-hosted runners poll GitHub for jobs and execute them locally. Architecture: the runner agent runs as a service, checks out code to `_work/`, and reports status back.

| Aspect | GitHub-Hosted | Self-Hosted |
|--------|---------------|-------------|
| Free quota | 2000 min/mo (public: unlimited) | Unlimited |
| OS available | Ubuntu, Windows, macOS | Any (ARM, GPU, mainframe) |
| Network | Isolated, no inbound | Your VPC/network |
| Maintenance | None | OS updates, cleanup |
| Cost | Pay for macOS/Windows beyond quota | Your hardware cost |
| Security | Ephemeral per-job | Persistent — isolate jobs |

#### Caching Strategies

Cache dependencies between runs to speed up installs:

```yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**Cache limits:** 10 GB per repository (GitHub-hosted). Eviction: LRU after 7 days of inactivity.

#### OIDC Deep Dive

OIDC eliminates static cloud credentials in CI. The workflow requests a JWT from GitHub's OIDC provider; the cloud provider trusts the JWT based on claims — `repository`, `ref`, `environment`.

**AWS example:**
```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
    role-session-name: ${{ github.run_id }}
    aws-region: us-east-1
```

**GCP example:**
```yaml
- id: auth
  uses: google-github-actions/auth@v2
  with:
    workload_identity_provider: projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider
    service_account: my-service-account@my-project.iam.gserviceaccount.com
```

### 1.2 GitLab CI/CD

GitLab offers an integrated DevOps platform with CI/CD built-in, popular in self-hosted and enterprise environments.

#### Pipeline Stages

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2

build-job:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 30 days

test-job:
  stage: test
  script:
    - npm ci
    - npm test
  coverage: '/Statements\s*:\s*(\d+\.\d+)%/'

deploy-job:
  stage: deploy
  script:
    - curl -X POST "$DEPLOY_HOOK"
  only:
    - main
  environment: production
```

#### GitLab Runners

| Type | Executor | Use Case |
|------|----------|----------|
| Shared | Docker | General OSS builds on gitlab.com |
| Group | Docker, SSH, VirtualBox | Team-level projects |
| Specific | Shell, Docker, Kubernetes | Project-specific hardware |
| Auto-scaling | Docker Machine, Kubernetes | Elastic capacity |

Runner registration:
```bash
gitlab-runner register \
  --url https://gitlab.com \
  --token glrt-xxxxxxx \
  --executor docker \
  --docker-image node:20-alpine
```

#### Auto DevOps

GitLab's zero-config CI/CD pipeline: auto-detect language, run tests, code quality, SAST, containerize, deploy to Kubernetes. Enable via project Settings > CI/CD > Auto DevOps.

#### Review Apps

Ephemeral environments per merge request:
```yaml
review:
  stage: deploy
  script:
    - kubectl apply -f k8s/review.yaml
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.example.com
    on_stop: stop-review
  only:
    - merge_requests

stop-review:
  stage: deploy
  script:
    - kubectl delete -f k8s/review.yaml
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
```

#### Pages Deployment
```yaml
pages:
  stage: deploy
  script:
    - npm ci
    - npm run build
    - mv dist public
  artifacts:
    paths:
      - public
  only:
    - main
```

### 1.3 CircleCI

CircleCI is known for its fast builds, parallelism, and the Orbs ecosystem.

#### Configuration Structure

```yaml
version: 2.1

orbs:
  node: circleci/node@5.2.0

jobs:
  test:
    docker:
      - image: cimg/node:20.12
      - image: postgres:16-alpine
        environment:
          POSTGRES_DB: myapp_test
    resource_class: medium+
    parallelism: 4
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          name: Run tests with splitting
          command: |
            circleci tests glob "src/**/__tests__/**/*.test.ts" | circleci tests split --split-by=timings | xargs npx vitest

workflows:
  version: 2
  ci:
    jobs:
      - test:
          matrix:
            parameters:
              node-version: ["18", "20", "22"]
```

#### Orbs Ecosystem

| Orb | Purpose |
|-----|---------|
| `circleci/node` | Node.js setup, npm/yarn/pnpm |
| `circleci/python` | Python setup, pip, poetry |
| `circleci/aws-ecr` | ECR push/pull |
| `circleci/gcp-gcr` | GCR/Artifact Registry |
| `circleci/terraform` | Terraform plan/apply |
| `circleci/ansible` | Ansible playbook execution |

#### Resource Classes

| Class | vCPUs | RAM | Credits/min |
|-------|-------|-----|-------------|
| `small` | 1 | 2 GB | 10 |
| `medium` | 2 | 4 GB | 15 |
| `medium+` | 3 | 6 GB | 20 |
| `large` | 4 | 8 GB | 25 |
| `xlarge` | 8 | 16 GB | 40 |
| `2xlarge` | 16 | 32 GB | 60 |
| `arm.medium` | 2 | 4 GB | 15 |
| `gpu.nvidia.small` | 4 vCPU + T4 | 200 |

#### Caching Strategies
```yaml
- restore_cache:
    keys:
      - v1-npm-{{ checksum "package-lock.json" }}
      - v1-npm-
- run: npm ci
- save_cache:
    key: v1-npm-{{ checksum "package-lock.json" }}
    paths:
      - node_modules
      - ~/.npm
```

### 1.4 Jenkins

The veteran CI/CD server — extensible, self-hosted, with the largest plugin ecosystem.

#### Pipeline-as-Code (Jenkinsfile)

**Declarative pipeline:**
```groovy
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
        }
    }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Test') {
            steps { sh 'npm test' }
            post { always { junit 'reports/**/*.xml' } }
        }
        stage('Build') { steps { sh 'npm run build' } }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './deploy.sh' }
        }
    }
    post {
        failure { slackSend(channel: '#ci', message: "Build failed") }
    }
}
```

**Scripted pipeline (more flexible):**
```groovy
node('linux') {
    checkout scm
    docker.image('node:20-alpine').inside {
        sh 'npm ci && npm run build'
    }
}
```

#### Distributed Builds Architecture

| Agent type | Provisioning | Best for |
|------------|-------------|----------|
| Permanent | Manual setup | Stable workloads |
| Cloud (EC2) | ec2-plugin | Burst capacity |
| Kubernetes | kubernetes-plugin | Container-native, ephemeral |
| Docker | docker-plugin | Simple containerized builds |
| SSH | ssh-slaves | Remote hardware access |

#### Plugin Ecosystem

| Category | Plugins |
|----------|---------|
| SCM | Git, GitHub, GitLab, Bitbucket |
| Build | Docker, Kubernetes, NodeJS, Gradle, Maven |
| Quality | SonarQube, Checkstyle, PMD, Warnings NG |
| Notifications | Slack, Email, Discord, Telegram |
| Security | OWASP Dependency Check, Trivy, Clair |
| Pipeline | Blue Ocean, Pipeline Utility Steps, Job DSL |
| Artifacts | Artifactory, Nexus, S3 |

### 1.5 Drone CI / Woodpecker

Container-native CI platforms where every step runs as an isolated container.

#### Drone CI Pipeline

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: test
    image: node:20
    commands:
      - npm ci
      - npm test
  - name: build
    image: node:20
    commands:
      - npm run build
    depends_on: [test]
  - name: docker
    image: plugins/docker
    settings:
      repo: octocat/hello-world
      tags: latest
    depends_on: [build]

trigger:
  branch: [main]
  event: [push]
```

#### Woodpecker CI (Drone Fork)

Woodpecker emerged as a community fork after Drone's license change. Apache-2.0, supports Podman, SSH, and exec runners.

| Feature | Drone CI | Woodpecker |
|---------|----------|------------|
| License | Apache 2.0, then Polyform Shield | Apache 2.0 |
| SCM support | GitHub, GitLab, Bitbucket, Gitea | GitHub, GitLab, Gitea, Forgejo |
| Container runtimes | Docker, Kubernetes, exec | Docker, Podman, Kubernetes, SSH, exec |
| Plugin registry | hub.drone.io | woodpecker-ci.org/plugins |

### 1.6 Buildkite

Hybrid CI model: you host the agents, Buildkite provides the orchestration plane.

#### Pipeline Configuration

```yaml
steps:
  - label: ":npm: Install"
    command: "npm ci"
  - label: ":jest: Test"
    command: "npm test"
    parallelism: 5
    artifact_paths:
      - "coverage/**/*"
  - label: ":docker: Build & Push"
    command: ".buildkite/steps/docker-push.sh"
    depends_on: "test"
    branches: "main"
```

#### Agent Scaling

```bash
buildkite-agent start --config /etc/buildkite-agent/buildkite.cfg
docker run -e BUILDKITE_AGENT_TOKEN=xxx buildkite/agent
```

| Aspect | Buildkite | Traditional hosted CI |
|--------|-----------|----------------------|
| Build VMs | Your infrastructure | Provider's infrastructure |
| Cost | Per-agent license | Per-build-minute |
| Network | Full access to your VPC | Isolated sandbox |
| Secrets | Never leave your network | Stored on provider |

### 1.7 Azure Pipelines

Microsoft's CI/CD platform with deep Azure integration.

#### YAML Pipeline

```yaml
trigger:
  - main

pool:
  vmImage: ubuntu-latest

stages:
  - stage: Build
    jobs:
      - job: BuildJob
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '20.x'
          - script: npm ci
          - script: npm run build

  - stage: Test
    dependsOn: Build
    jobs:
      - job: TestJob
        strategy:
          matrix:
            Node18:
              node_version: 18.x
            Node20:
              node_version: 20.x
        steps:
          - script: npm test

  - stage: Deploy
    dependsOn: Test
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: DeployJob
        environment: production
```

#### Microsoft-Hosted Agents

| VM Image | OS | Included Software |
|----------|----|-------------------|
| ubuntu-latest | Ubuntu 22.04 | Python, Node, Go, Java, .NET, Docker |
| windows-latest | Windows Server 2022 | Visual Studio, MSVC, .NET |
| macos-latest | macOS 14 (Sonoma) | Xcode, Homebrew, Node, Python |

### 1.8 SourceHut CI

Minimalist, SSH-based CI from the SourceHut ecosystem. No JavaScript required.

```yaml
image: alpine/edge
packages:
  - nodejs
  - npm
sources:
  - https://git.sr.ht/~user/project
tasks:
  - setup: |
      cd project && npm ci
  - test: |
      cd project && npm test
triggers:
  - action: email
    condition: failure
    to: ~user/public-inbox@lists.sr.ht
```

Features: Alpine Linux VMs, SSH-based API, email notifications, free for OSS.

### 1.9 Feature Comparison Table

| Feature | GitHub Actions | GitLab CI/CD | CircleCI | Jenkins | Drone/Woodpecker | Buildkite | Azure Pipelines | SourceHut CI |
|---------|---------------|-------------|----------|---------|-----------------|-----------|----------------|-------------|
| Pricing (OSS) | Free (unlimited) | Free (400 min/mo) | Free (6000/mo) | Self-hosted free | Self-hosted free | Agent cost only | Free (1800/mo) | Free (public) |
| Hosted option | Yes | Yes | Yes | No | No | Orchestration only | Yes | Yes (limited) |
| Self-hosted | Yes | Yes | Yes | Yes (native) | Yes (native) | Yes (native) | Yes | No |
| macOS support | Yes (paid) | Yes | Yes (paid) | Manual | Manual | Your agents | Yes | No |
| Windows support | Yes | Yes | Yes | Yes | Via exec | Your agents | Yes | No |
| Matrix builds | Native | `parallel:matrix` | Native | Pipeline DSL | Manual | Manual | `strategy.matrix` | No |
| Cache support | actions/cache | Built-in | restore/save_cache | Plugins | Volumes | S3 | Built-in | No |
| Container registry | ghcr.io | gitlab.com | External | External | External | External | ACR | No |
| Plugin ecosystem | 20k+ actions | Templates | 400+ orbs | 1800+ plugins | Limited | Limited | 1000+ extensions | Minimal |
| Kubernetes native | ARC | Yes | Yes | Yes (k8s) | Yes (native) | Yes (agent) | Yes | No |
| Review apps | Deployments | Native | Manual | Manual | Manual | Manual | Native | No |
| Approval gates | Env protection | Manual jobs | Manual approval | Input pipeline | Manual steps | Block step | Env checks | No |

### 1.10 CI/CD Best Practices

#### Build Caching

1. **Dependency caching** — cache node_modules, pip cache, cargo registry between runs
2. **Docker layer caching** — use `docker build --cache-from` or BuildKit inline caching
3. **Cache key design** — include `hashFiles()` of lockfiles; provide fallback `restore-keys`
4. **Warm cache on main** — generate maximal cache in a cron job so PRs benefit from it

#### Parallel Sharding (Test Splitting)

| Strategy | How it works | Best for |
|----------|-------------|----------|
| File-level | Split test files by glob | Small to medium suites |
| Timing-based | Split by historical duration | Uneven test distribution |
| Test-level | Split individual tests | Very slow tests |

**Rule:** target each shard to run within 5-10 minutes.

#### Environment Isolation

- **Ephemeral containers** per pipeline job
- **Database service containers** for integration tests
- **Avoid mutable state** — never assume lingering processes

#### Secret Management

1. Use **OIDC** instead of long-lived cloud credentials
2. Use **secrets scanning** in pre-commit hooks (gitleaks, truffleHog)
3. Use **repository-level secrets** not org-level, unless necessary
4. Never log secrets — configure CI to mask them
5. Rotate secrets regularly via automation

#### Pipeline Performance Targets
- **Fail fast** — run lint before tests, type-check before integration
- **Conditional stages** — skip expensive stages unless on main
- **Selective execution** — monorepo: only run jobs affected by changed files
- **Workflow concurrency** — one run per branch, cancel redundant runs

---

## Part 2: Package Managers by Ecosystem

Package managers handle dependency resolution, version locking, artifact storage, and reproducible builds. Each ecosystem has evolved distinct tooling with different tradeoffs.

### 2.1 Python

Python's packaging landscape has fragmented historically but is converging around modern standards.

#### pip (Standard)
```bash
pip install requests
pip install -r requirements.txt
pip install -e .          # editable install
pip freeze > requirements.txt
```

**Pros:** Ships with Python, universal compatibility, extensive PyPI ecosystem.
**Cons:** No lockfile, no dependency resolution tree, no workspaces.

**pip-tools** enhances pip with proper lockfile generation:
```bash
# requirements.in
requests>=2.31
click>=8.0
pip-compile requirements.in  # -> requirements.txt
pip-sync requirements.txt    # install exactly what's locked
```

#### Poetry
```toml
[tool.poetry]
name = "myproject"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.11"
requests = "^2.31"
pytest = { version = "^8.0", optional = true }

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

```bash
poetry add requests
poetry install      # from poetry.lock
poetry build
poetry publish
```

**Pros:** Lockfile, deterministic installs, simple CLI.
**Cons:** Slower resolution than uv, can produce too many transitive constraints.

#### uv
```bash
uv pip install requests   # pip-compatible
uv add requests           # project management
uv sync                   # sync from lockfile
uv lock                   # generate lockfile
uv tool install ruff      # replaces pipx
```

**Pros:** 10-100x faster than pip/poetry, Rust-based, pip-compatible.
**Cons:** Relatively new (2024), ecosystem tools still maturing.

#### PDM
```toml
[project]
name = "myproject"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["requests>=2.31"]

[build-system]
requires = ["pdm-backend"]
build-backend = "pdm.backend"
```

**Pros:** PEP 517/518 compliant, lockfile, workspace support, plugin system.
**Cons:** Smaller community than Poetry.

#### Conda
```bash
conda create -n myenv python=3.11
conda install numpy pandas
conda env export > environment.yaml
```

**Pros:** Cross-language (Python + C/C++/R), prebuilt binaries, scientific ecosystem.
**Cons:** Large install footprint, slow resolution, non-deterministic without explicit pins.

#### pipenv
```bash
pipenv install requests
pipenv install --dev pytest
pipenv lock
pipenv sync
```

**Pros:** Combines pip + virtualenv, autogenerates Pipfile.lock.
**Cons:** Slow, controversial resolution, largely superseded by Poetry/PDM.

#### Comparison: Python Package Managers

| Feature | pip | Poetry | uv | PDM | Conda | pipenv |
|---------|-----|--------|-----|-----|-------|--------|
| Lockfile | No | poetry.lock | uv.lock | pdm.lock | No | Pipfile.lock |
| Deterministic | No | Yes | Yes | Yes | No | Yes |
| Workspaces | No | Yes | Yes | Yes | No | No |
| PEP 621 | Partial | Wrapper | Wrapper | Native | No | No |
| Speed | Slow | Medium | Very fast | Medium | Slow | Slow |
| Cross-platform | No | No | No | No | Yes | No |
| PyPI compat | Full | Full | Full | Full | Partial | Full |
| Status | Standard | Mature | Rising | Mature | Niche | Legacy |

**When to use each:**
- **Simple script / legacy:** pip + requirements.txt
- **Library (published to PyPI):** Poetry or PDM
- **Application (deterministic deploy):** uv or Poetry
- **Scientific / ML:** Conda + pip
- **Monorepo with multiple Python packages:** PDM workspaces or Poetry
- **CI speed critical:** uv (10-100x faster)

### 2.2 JavaScript / TypeScript

The JS ecosystem has evolved from npm to yarn to pnpm to bun, each improving on determinism, speed, and monorepo capabilities.

#### npm
```bash
npm init
npm install express
npm ci              # clean install from lockfile
npx eslint .       # run tool without installing
```

**package-lock.json:** npm's lockfile — records exact versions, integrity hashes, and dependency trees.
**npm workspaces (monorepo):**
```json
{"workspaces": ["packages/*", "apps/*"]}
```

```bash
npm install -w packages/core
npm run test -ws
```

#### yarn (Classic + Berry)
```bash
yarn add express
yarn install --frozen-lockfile
yarn set version berry  # v2+ with Plug'n'Play
```

**Yarn Berry features:**
- Plug'n'Play (PnP): no `node_modules` — packages stored in zip archives
- Zero-install: `.yarn/cache/` checked into git
- Constraints: prolog-based dependency rules
- Workspace protocol: `"workspace:^"` for monorepo cross-references

#### pnpm
```bash
pnpm add express
pnpm install --frozen-lockfile
```

**Key innovation: content-addressable store.** All projects share the same stored files via hard links:
```
node_modules/
  .pnpm/          # virtual store
  express -> .pnpm/express@4.18.2/node_modules/express
```

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

#### bun
```bash
bun add express
bun install
```

**bun.lock:** Binary lockfile for fast parsing (Rust + Zig runtime).
**Pros:** Extremely fast, bun is runtime + package manager + bundler.
**Cons:** Less mature ecosystem, binary lockfile is not human-readable.

#### Comparison: JS Package Managers

| Feature | npm | yarn classic | yarn berry | pnpm | bun |
|---------|-----|-------------|------------|------|-----|
| Lockfile | package-lock.json | yarn.lock | yarn.lock + .yarn/cache | pnpm-lock.yaml | bun.lock (binary) |
| Install speed | Slow | Medium | Medium | Fast | Fastest |
| Disk efficiency | Poor (duplicates) | Poor | Good (zip) | Excellent (hard links) | Good |
| Workspaces | Yes | Yes | Yes | Yes (native) | Yes |
| Plug'n'Play | No | No | Yes | No | No |
| npm compatibility | Full | Full | Mostly | Full | Mostly |
| CI caching | `npm ci` | `--frozen-lockfile` | `--immutable` | `--frozen-lockfile` | `--frozen-lockfile` |

### 2.3 Rust: cargo

Rust's integrated package manager is considered one of the best in any ecosystem.

#### Cargo Basics
```toml
[package]
name = "myproject"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
anyhow = "1"
```

```bash
cargo build -p core
cargo test -p cli
cargo add serde
cargo update        # update lockfile
cargo tree         # dependency tree
cargo publish      # to crates.io
```

#### Workspace Management
```toml
[workspace]
members = ["crates/core", "crates/cli"]
resolver = "2"

[workspace.dependencies]
serde = "1"
tokio = "1"
```

#### Feature Flags
```toml
[features]
default = ["full"]
full = ["networking", "compression"]
networking = ["dep:http"]
```

```rust
#[cfg(feature = "networking")]
fn connect() {}
```

Feature unification: dependencies across your tree can merge features, causing unexpected enabled features in some scenarios. Use `cargo tree -e features` to debug.

### 2.4 Go: go modules

#### Module Configuration
```
go.mod
go.sum
```

```go
module github.com/user/myproject
go 1.22
require (
    github.com/gorilla/mux v1.8.1
    golang.org/x/net v0.25.0
)
```

```bash
go mod init github.com/user/myproject
go get github.com/gorilla/mux
go mod tidy
go mod verify
```

#### Proxy Infrastructure
`GOPROXY=direct` fetches directly from VCS.
`GOPROXY=https://proxy.golang.org,direct` uses Go's default proxy.
Athens provides self-hosted proxy capabilities.

#### Checksum Database
`go.sum` contains cryptographic hashes. The checksum database (sum.golang.org) provides transparency:

```bash
GONOSUMCHECK=*.internal.example.com  # skip sumdb for private modules
```

#### Workspace Mode
```
# go.work
go 1.22
use (
    ./core
    ./services/api
)
```

```bash
go work init ./core ./services/api
go work sync
```

### 2.5 Java

#### Maven Central + Gradle/Maven
**pom.xml (Maven):**
```xml
<project>
    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>1.0.0</version>
    <dependencies>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>33.2.0-jre</version>
        </dependency>
    </dependencies>
</project>
```

**build.gradle.kts (Gradle Kotlin DSL):**
```kotlin
plugins {
    java
    id("org.springframework.boot") version "3.3.0"
}

repositories {
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    implementation("com.google.guava:guava:33.2.0-jre")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}
```

#### Artifact Registries

| Service | Type | Features |
|---------|------|----------|
| Maven Central | Public | Largest Java artifact repository |
| Sonatype Nexus | Both | Proxy, hosted, group repos |
| JitPack | Public | Build from GitHub commits |
| JFrog Artifactory | Both | Multi-language, Xray security |

### 2.6 Ruby: RubyGems + Bundler

```ruby
# Gemfile
source "https://rubygems.org"

gem "rails", "~> 7.1"
gem "pg"
gem "puma", "~> 6.0"

group :development, :test do
  gem "rspec-rails"
end
```

```bash
bundle install
bundle exec rails server
gem push mygem-1.0.0.gem
```

**Gemfile.lock** — deterministic lockfile recording exact gem versions and dependency trees.

### 2.7 C / C++

#### Conan
```python
from conan import ConanFile

class MyProjectConan(ConanFile):
    name = "myproject"
    version = "1.0"
    requires = "fmt/10.2.1", "nlohmann_json/3.11.3"
    generators = "CMakeDeps", "CMakeToolchain"
```

```bash
conan install . --build=missing
conan create . --version=1.0
conan upload myproject/1.0 -r=my-repo
```

#### vcpkg
```json
{"name": "myproject", "version": "1.0.0", "dependencies": ["fmt", "nlohmann-json", "curl"]}
```

```bash
vcpkg install
vcpkg integrate install   # integrate with CMake
```

#### Spack
```yaml
spack:
  specs:
    - gcc@13.2.0
    - openmpi@5.0.2 +cuda
    - hdf5@1.14.3 +mpi
```

#### CMake FetchContent
```cmake
include(FetchContent)
FetchContent_Declare(fmt GIT_REPOSITORY https://github.com/fmtlib/fmt.git GIT_TAG 10.2.1)
FetchContent_MakeAvailable(fmt)
```

Best for simple dependency management without a package manager. May increase build times.

### 2.8 Cross-Ecosystem Comparison

| Feature | pip | npm | cargo | go mod | Maven/Gradle | Bundler | Conan |
|---------|-----|-----|-------|--------|-------------|---------|------|
| Lockfile | None | JSON | Cargo.lock | go.sum | None | Text | JSON |
| Deterministic | No | Yes | Yes | Yes | Yes (repro) | Yes | Yes |
| Registry | PyPI | npmjs | crates.io | proxy.golang.org | Maven Central | RubyGems | conan.io |
| Private registry | devpi | Verdaccio | git index | Athens | Nexus/Artifactory | Gemstash | Artifactory |
| Checksum | No | integrity | Cargo.lock | go.sum + sumdb | Maven checksums | Yes | conan.lock |
| Publish | twine upload | npm publish | cargo publish | git tag | mvn deploy | gem push | conan upload |
| Monorepo | Workspaces (PDM) | Workspaces | Workspaces | go.work | Multi-module | path: | Editable |

### 2.9 Package Registry Services

| Service | Container | npm | Maven | PyPI | NuGet | RubyGems | Helm |
|---------|-----------|-----|-------|------|-------|----------|------|
| GitHub Packages | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| GitLab Container Registry | Yes | Yes | Yes | Yes | Yes | No | Yes |
| Docker Hub | Yes | No | No | No | No | No | No |
| GCR / Artifact Registry | Yes | Yes | Yes | Yes | Yes | No | Yes |
| JFrog Artifactory | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Sonatype Nexus | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

**GitHub Packages authentication:**
```bash
echo "//npm.pkg.github.com/:_authToken=${GH_TOKEN}" > .npmrc
echo $GH_TOKEN | docker login ghcr.io -u username --password-stdin
```

---

## Part 3: Code Quality & Linting Tools

### 3.1 Python

#### Ruff (Unified Linter + Formatter)
Ruff is an extremely fast Rust-based linter and formatter that replaces Flake8, isort, pyupgrade, autoflake, and more.

```toml
[tool.ruff]
target-version = "py311"
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP", "B", "SIM"]
ignore = ["E501"]

[tool.ruff.format]
quote-style = "double"
```

```bash
ruff check src/
ruff check --fix src/
ruff format src/
```

**Rule categories:**
| Prefix | Category | Source |
|--------|----------|--------|
| E, W | pycodestyle | Flake8 errors/warnings |
| F | Pyflakes | Logic errors |
| I | isort | Import ordering |
| N | pep8-naming | Naming conventions |
| UP | pyupgrade | Modern syntax upgrades |
| B | flake8-bugbear | Bug-prone patterns |
| SIM | flake8-simplify | Simplification |
| PL | pylint | Pylint rules |

#### mypy (Static Type Checker)
```toml
[tool.mypy]
python_version = "3.11"
strict = true
ignore_missing_imports = true
disallow_untyped_defs = true
warn_return_any = true
```

```bash
mypy src/
mypy --strict src/
```

#### pylint
```bash
pylint src/
pylint --rcfile=.pylintrc src/
```

Common issues: slow on large codebases, verbose false positives, rule overlap with Flake8/Ruff.

#### Bandit (Security)
```bash
bandit -r src/
bandit -r src/ -f json
```

Catches: hardcoded passwords, SQL injection, eval usage, insecure hashing.

#### Semgrep
General-purpose static analysis with custom rules:
```bash
semgrep --config=auto src/
semgrep --config=p/python
```

### 3.2 JavaScript / TypeScript

#### ESLint
```javascript
// eslint.config.js (flat config)
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: { "@typescript-eslint/no-unused-vars": "error" } },
  { ignores: ["dist/", "node_modules/"] },
];
```

```bash
eslint src/
eslint src/ --fix
eslint src/ --max-warnings 0
```

#### Prettier
```javascript
// prettier.config.js
export default {
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: "always",
  endOfLine: "lf",
};
```

```bash
prettier --check src/
prettier --write src/
```

#### TypeScript Strict Mode
```json
{"compilerOptions": {
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noUnusedLocals": true,
  "exactOptionalPropertyTypes": true
}}
```

Strict mode enables: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict.

#### Biome (Unified Tool)
Rust-based alternative to ESLint + Prettier (analogous to Ruff for Python):
```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 }
}
```

```bash
biome check src/
biome check --apply src/
biome format src/
biome ci src/
```

### 3.3 Rust: Clippy, rustfmt, MIRI

#### Clippy
```bash
cargo clippy
cargo clippy --fix
cargo clippy -- -W clippy::pedantic
```

```toml
# .clippy.toml
cognitive-complexity-threshold = 25
```

#### rustfmt
```bash
cargo fmt
cargo fmt --check
```

```toml
# rustfmt.toml
max_width = 100
tab_spaces = 4
newline_style = "Unix"
```

#### MIRI (Undefined Behavior Detection)
```bash
cargo +nightly miri test
cargo +nightly miri run
```

Detects: out-of-bounds access, use-after-free, invalid pointer arithmetic, uninitialized reads, data races.

### 3.4 Go: gofmt, go vet, staticcheck

#### gofmt
```bash
gofmt -w .
gofmt -d .
```

#### go vet
```bash
go vet ./...
```

#### golangci-lint
```yaml
run:
  timeout: 5m
  tests: true
linters:
  enable:
    - errcheck
    - gosimple
    - govet
    - staticcheck
    - revive
    - gofmt
    - gosec
```

```bash
golangci-lint run ./...
golangci-lint run --fix ./...
```

### 3.5 Java: Checkstyle, PMD, SpotBugs, Error Prone

#### Checkstyle
```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="JavadocMethod"/>
    <module name="NeedBraces"/>
    <module name="LineLength"><property name="max" value="100"/></module>
  </module>
</module>
```

#### PMD
```bash
pmd check -d src/ -R pmd-rules.xml -f text
```

#### SpotBugs (formerly FindBugs)
```bash
spotbugs -textui -low -effort:max -xml:withMessages src/
```

#### Error Prone (Google)
Gradle plugin: `id 'net.ltgt.errorprone' version '4.0.0'`

### 3.6 Multi-Language Platforms

| Tool | Languages | CI Integration | Deployment | Pricing |
|------|-----------|---------------|------------|---------|
| SonarQube | 30+ languages | GitHub/GitLab/CircleCI/Jenkins | Self-hosted / Cloud | Free Community |
| SonarCloud | 30+ languages | GitHub/GitLab/Azure | Cloud | Free for OSS |
| CodeClimate | 10+ languages | GitHub/GitLab | Cloud | Free for OSS |
| Codacy | 40+ languages | GitHub/GitLab/Bitbucket | Cloud | Free for OSS |
| Qodana | 60+ languages | JetBrains CI | Self-hosted / Cloud | Free for OSS |
| Semgrep | 20+ languages | All major platforms | Cloud / Self-hosted | Free Community |

### 3.7 Comparison Table: Linting Tools

| Tool | Languages | Rules | Performance | Auto-fix | Community |
|------|-----------|-------|-------------|----------|-----------|
| Ruff | Python | 800+ | Very fast (Rust) | Yes | High |
| mypy | Python | Types | Medium | No | High |
| pylint | Python | Compr. | Slow | Partial | High |
| ESLint | JS/TS | 300+ | Fast | Yes | Very high |
| Prettier | JS/TS/CSS | Format | Fast | Yes | Very high |
| Biome | JS/TS/JSON/CSS | 200+ | Very fast (Rust) | Yes | Rising |
| Clippy | Rust | 600+ | Fast | Yes | High |
| golangci-lint | Go | 70+ | Medium | Yes | High |
| staticcheck | Go | 150+ | Fast | Limited | High |
| Checkstyle | Java | 150+ | Fast | Limited | High |
| PMD | Java | 300+ | Medium | Limited | Medium |
| Error Prone | Java | 500+ | Fast | Yes | High |
| Semgrep | 20+ languages | Custom | Fast | Limited | High |
| SonarQube | 30+ | Quality gates | Medium | Limited | Very high |

### 3.8 Pre-commit Framework

Multi-language hook management — runs configured tools before every commit.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: detect-private-key

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.8
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.2
    hooks:
      - id: gitleaks
```

```bash
pre-commit install
pre-commit run --all-files
pre-commit autoupdate
```

---

## Part 4: Testing Frameworks & Tools

### 4.1 Python

#### pytest
```python
import pytest

def test_add():
    assert add(2, 3) == 5

@pytest.mark.parametrize("n,expected", [(2,True), (3,True), (4,False)])
def test_is_prime(n, expected):
    assert is_prime(n) == expected

class TestCalc:
    def test_div_by_zero(self):
        with pytest.raises(ZeroDivisionError):
            divide(1, 0)
```

```bash
pytest
pytest -v
pytest -x              # stop on first failure
pytest -k "prime"      # keyword filter
pytest -m "not slow"   # marker filter
pytest --cov=src
pytest -n auto        # parallel (xdist)
```

**conftest.py (shared fixtures):**
```python
@pytest.fixture
def temp_dir():
    with tempfile.TemporaryDirectory() as d:
        yield Path(d)

@pytest.fixture(scope="session")
def db_connection():
    conn = create_connection()
    yield conn
    conn.close()
```

**hypothesis (Property-based Testing):**
```python
from hypothesis import given, strategies as st

@given(a=st.integers(), b=st.integers())
def test_add_commutative(a, b):
    assert add(a, b) == add(b, a)
```

**tox (Test Matrix):**
```ini
[tox]
envlist = py39, py310, py311, py312, lint

[testenv]
deps = pytest
commands = pytest tests/

[testenv:lint]
deps = ruff
commands = ruff check src/
```

**coverage.py**
```bash
coverage run -m pytest
coverage report
coverage html
```

### 4.2 JavaScript / TypeScript

#### Vitest
```typescript
import { describe, it, expect } from "vitest";

describe("math utilities", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
  it.each([[2,3,5],[-1,1,0]])("add(%i,%i) = %i", (a,b,e) => {
    expect(add(a,b)).toBe(e);
  });
});
```

```bash
vitest
vitest run
vitest --coverage
```

#### Playwright (E2E)
```typescript
import { test, expect } from "@playwright/test";

test("homepage displays welcome", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator("h1")).toHaveText("Welcome");
});
```

```bash
npx playwright test
npx playwright test --ui
npx playwright codegen
```

#### Testing Library
```typescript
import { render, screen, fireEvent } from "@testing-library/react";
test("increments counter", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### 4.3 Rust

```bash
cargo test
cargo test -- --nocapture
cargo test -- --test-threads=1
```

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn test_math() {
        assert_eq!(add(2, 3), 5);
    }
    #[test]
    #[should_panic(expected = "overflow")]
    fn test_overflow() { overflow_function(); }
}
```

**proptest (property-based):**
```rust
use proptest::prelude::*;
proptest! {
    #[test] fn test_sort(v: Vec<i32>) { let mut s = v.clone(); s.sort(); }
}
```

**criterion (benchmarks):**
```rust
use criterion::{black_box, Criterion};
fn fibonacci(n: u64) -> u64 { match n { 0=>0,1=>1,_=>fibonacci(n-1)+fibonacci(n-2) } }
fn bench(c: &mut Criterion) { c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20)))); }
```

**cargo-audit:** `cargo audit` — check for vulnerabilities
**cargo-fuzz:** `cargo fuzz run parse_input` — libFuzzer-based fuzzing
---

## Part 5: Monitoring, Observability & Analytics

### 5.1 Application Monitoring

#### Prometheus + Grafana

The de facto standard for open-source monitoring. Prometheus collects metrics via pull model; Grafana visualizes them.

**prometheus.yml:**
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "node"
    static_configs:
      - targets: ["localhost:9100"]
  - job_name: "app"
    static_configs:
      - targets: ["localhost:8080"]
```

**Export Python metrics:**
```python
from prometheus_client import Counter, Histogram, start_http_server
REQUESTS = Counter('http_requests_total', 'Total requests', ['method', 'endpoint'])
LATENCY = Histogram('http_request_duration_seconds', 'Latency', ['endpoint'])
start_http_server(8000)
```

**PromQL queries:**
```promql
# Request rate per second
rate(http_requests_total[5m])
# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
# Error ratio
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
```

**Pre-built Grafana dashboards** are available for:
- Node Exporter (CPU, memory, disk, network)
- PostgreSQL (connections, queries, cache hit ratio)
- Redis (memory, commands, hit rate)
- Kubernetes (pods, nodes, cluster)
- Blackbox Exporter (HTTP/TCP/ICMP probes)

#### OpenTelemetry

The unified observability standard â€” traces, metrics, and logs with a single API.

```python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.instrumentation.flask import FlaskInstrumentor

provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="http://otel-collector:4317"))
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)

with trace.get_tracer(__name__).start_as_current_span("process_order") as span:
    span.set_attribute("order_id", order_id)
    span.add_event("processing started")
```

**OpenTelemetry Collector config:**
```yaml
receivers:
  otlp:
    protocols:
      grpc: {}
      http: {}
processors:
  batch: {}
exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
  otlp:
    endpoint: "jaeger:4317"
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]
```

#### Datadog vs New Relic vs OpenTelemetry

| Feature | Datadog | New Relic | OpenTelemetry + Prometheus |
|---------|---------|-----------|---------------------------|
| Pricing | Per-host + ingest | Per-GB ingest | Free (self-hosted) |
| APM | Full auto-instrumentation | Full auto-instrumentation | Manual + SDK |
| Log management | Included | Included | Via Loki + Grafana |
| Alerting | Robust | Robust | Alertmanager |
| Kubernetes | Excellent | Good | Excellent (kube-prometheus-stack) |
| OpenSource | No | No | Yes |
| Self-hosted | No | No | Yes |
| Ease of setup | 5 min (agent) | 5 min (agent) | 30-60 min |
| Best for | Teams with budget | Teams with budget | Cost-sensitive / OSS |

### 5.2 Error Tracking

#### Sentry

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0,
    environment="production",
    release="myproject@1.0.0",
)
```

**Sentry features:** source maps, performance tracing, releases tracking, user feedback, issue grouping, self-hosted option.

#### Rollbar
```python
import rollbar
rollbar.init(access_token="POST_TOKEN", environment="production")
try:
    risky_operation()
except Exception as e:
    rollbar.report_exc_info()
```

### 5.3 Logging

#### ELK Stack (Elasticsearch, Logstash, Kibana)

Architecture: Filebeat -> Logstash -> Elasticsearch -> Kibana.

**Filebeat config:**
```yaml
filebeat.inputs:
  - type: container
    paths:
      - /var/lib/docker/containers/*/*.log
output.elasticsearch:
  hosts: ["elasticsearch:9200"]
```

**Logstash pipeline:**
```ruby
input { beats { port => 5044 } }
filter { grok { match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:msg}" } } }
output { elasticsearch { hosts => ["elasticsearch:9200"] index => "app-logs-%{+YYYY.MM.dd}" } }
```

#### Loki + Grafana (Lightweight Logging)

```yaml
# promtail.yaml
scrape_configs:
  - job_name: app
    static_configs:
      - targets: [localhost]
        labels:
          job: app
          __path__: /var/log/app/*.log
```

**LogQL queries:**
```logql
rate({app="myapp"} |= "error" [1h])
{container="api"} |= "ERROR" |= "timeout"
{job="app"} |~ "user_id=12345"
```

| Feature | ELK Stack | Loki + Grafana |
|---------|-----------|----------------|
| Storage | Full-text index | Compressed + indexed labels |
| Query language | Kibana Query | LogQL (PromQL-like) |
| Scalability | Heavy (needs ES cluster) | Lightweight (object storage) |
| Cost | High (compute for indexing) | Low (no indexing) |
| Best for | Full-text search / SIEM | Kubernetes / cloud-native |
| Self-hosted complexity | High | Medium |

### 5.4 Uptime Monitoring

| Tool | Pricing | Frequency | Regions | Type | Features |
|------|---------|-----------|---------|------|----------|
| Checkly | Free: 10 checks | 1m-24h | 50+ | API + Browser | Playwright-based, Terraform provider |
| UptimeRobot | Free: 50 checks (5m) | 5m (free) | 10+ | HTTP/Ping/Port | Simple, 50 URLs free |
| Better Uptime | Free: 1 check, $20/mo | 1m-1h | 10+ | HTTP/SSL | Status pages, incident management |
| Pingdom | $15/mo starter | 1m | 10+ | HTTP/UDP/TCP | SolarWinds-backed |

**Checkly example:**
```typescript
new Check("homepage-check", { name: "Homepage", activated: true, frequency: 5,
  locations: ["us-east-1", "eu-west-1"],
  request: { method: "GET", url: "https://example.com",
    assertions: [{ source: "STATUS_CODE", comparison: "EQUALS", target: "200" }]
  }
});
```

### 5.5 OSS Analytics

| Tool | Self-hostable | Privacy-first | Cost | Features |
|------|---------------|---------------|------|----------|
| PostHog | Yes | Yes | Free (1M events/mo) | Product analytics, session recording, feature flags |
| Plausible | Yes | Yes | Free (10k pageviews/mo) | Lightweight, GDPR-compliant |
| Matomo | Yes | Yes | Free (self-hosted) | Full Google Analytics alternative |
| Umami | Yes | Yes | Free | Simple, privacy-focused |
| Fathom | No | Yes | $14/mo | Minimal, GDPR-compliant |

**PostHog example:**
```javascript
import posthog from "posthog-js";
posthog.init("phc_xxxxx", { api_host: "https://app.posthog.com" });
posthog.capture("user_signed_up", { plan: "premium" });
posthog.identify("user_12345", { email: "user@example.com" });
if (posthog.isFeatureEnabled("new-dashboard")) showNewDashboard();
```

### 5.6 Infrastructure Monitoring

| Tool | Type | Features | Best for |
|------|------|----------|----------|
| Nagios | Legacy | Plugin-based, active checks, notifications | Traditional IT ops |
| Zabbix | Agent + agent-less | Auto-discovery, templates, JMX, SNMP | Medium-to-large infra |
| Icinga 2 | Monitoring | Nagios-compatible, modern config DSL | Nagios users wanting modern features |
| Prometheus exporters | Pull-based | 200+ exporters | Cloud-native / Kubernetes |
| Netdata | Real-time | Pre-built dashboards, anomaly detection, ML | Per-node granular monitoring |

**Notable Prometheus Exporters:** node_exporter, blackbox_exporter, postgres_exporter, redis_exporter, nginx_exporter, kube-state-metrics.

---

## Part 6: Collaboration & Communication Tools

### 6.1 Code Review Platforms

| Platform | Hosting | Review Model | CI Integration | Diff Display | OSS Friendly |
|----------|---------|--------------|---------------|-------------|--------------|
| GitHub Pull Requests | Cloud | PR-based discussion | Native (Actions) | Side-by-side, unified | Free for public |
| GitLab Merge Requests | Cloud or self-hosted | MR-based, pipelines inline | Native (CI/CD) | Side-by-side, suggestions | Free (CE) |
| Gerrit | Self-hosted | Patch-set based, +2/-2 | Jenkins plugin | Unified diff | Free (Apache-2.0) |
| Phabricator | Self-hosted | Revision-based | Build plan | Side-by-side | Free (Apache-2.0) |
| ReviewBoard | Self-hosted or cloud | Review requests | Post-commit hooks | Side-by-side | Free (MIT) |

**GitHub PR best practices:**
- Keep PRs small (< 400 lines ideal)
- Write descriptive titles with conventional commits
- Use draft PRs for work-in-progress
- Require CI passing before merge
- Enable branch protection rules
- Use CODEOWNERS for automatic reviewer assignment

**Gerrit workflow:**
```
Developer -> git push origin HEAD:refs/for/main
  -> Gerrit creates Patch Set 1
  -> CI builds and tests
  -> Reviewer: +1 (looks good)
  -> Reviewer: -2 (needs changes)
  -> Patch Set 2 (address feedback)
  -> Reviewer: +2 (approved)
  -> Merge to main
```

### 6.2 Documentation

| Tool | Content format | Hosting | Search | Versioning | Use case |
|------|---------------|---------|--------|------------|----------|
| Read the Docs | reST, Markdown, MyST | Cloud (rtd.org) | Built-in | Via git branches | Python library docs |
| Docusaurus | MDX (Markdown + JSX) | Any static host | Algolia DocSearch | Versions config | OSS project websites |
| MkDocs | Markdown | Any static host | Built-in + plugins | mike tool | Simple project docs |
| Sphinx | reStructuredText | Any static host | Built-in | Via git | Python ecosystem standard |
| GitBook | Markdown + blocks | Cloud (gitbook.com) | Built-in | Workspace-based | Product + API docs |

**Docusaurus project structure:**
```
website/
  docusaurus.config.ts
  sidebars.ts
  src/pages/index.tsx
  docs/intro.md
  docs/getting-started/
  static/  # images, fonts
  blog/
```

**MkDocs with Material theme:**
```yaml
# mkdocs.yml
site_name: My Project
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - content.code.copy
plugins:
  - search
  - mkdocstrings
markdown_extensions:
  - pymdownx.superfences
  - pymdownx.tabbed
  - admonition
```

### 6.3 Community Communication

| Platform | Type | Threading | Search | Self-hostable | Best for |
|----------|------|-----------|--------|---------------|----------|
| Discourse | Forum | Full (categories + topics) | Excellent | Yes | Community Q&A, announcements |
| Discord | Chat | Limited (channels + threads) | Good | No | Real-time chat, voice |
| Slack | Chat | Threaded replies | Good (paid: better) | No | Enterprise open source |
| Matrix (Element) | Chat (federated) | Threads + spaces | Limited | Yes | Decentralized, privacy-first |
| Zulip | Chat | Topic-based threading | Excellent | Yes | Engineering teams |
| IRC / Libera Chat | Chat | No threading | No | Yes | Old-school, reliable |

#### Community Setup Best Practices

| Project size | Recommended setup |
|-------------|-------------------|
| < 100 users | GitHub Discussions + Discord |
| 100 - 1,000 users | Discourse + Discord + Matrix bridge |
| 1,000 - 10,000 users | Discourse (main) + Discord + Matrix + mailing list |
| > 10,000 users | Discourse + Discord + Matrix + IRC + Regular community calls |

### 6.4 Issue Tracking

| Tool | Type | Agile support | Roadmap | Integrations | OSS Free tier |
|------|------|---------------|---------|-------------|---------------|
| GitHub Issues | Built-in | Projects, milestones, labels | Roadmap view | Actions, PRs, API | Free |
| GitLab Issues | Built-in | Boards, epics, iterations | Roadmap (Ultimate) | CI/CD, API | Free (CE) |
| Jira | Dedicated | Scrum/Kanban, sprints, epics | Advanced roadmaps | Marketplace apps | Free for OSS |
| Linear | Dedicated | Cycles, projects, triage | Roadmap | GitHub, Slack, Figma | Free for OSS |
| Bugzilla | Dedicated | Components, versions | No | Minimal | Free (MPL) |

**GitHub Issues template:**
```yaml
# .github/ISSUE_TEMPLATE/bug_report.md
---
name: Bug Report
about: Create a report to help us improve
title: "[BUG] "
labels: bug
---
**Describe the bug**
A clear and concise description.
**To Reproduce**
Steps to reproduce the behavior.
**Expected behavior**
**Screenshots**
**Environment:** OS, version
```

### 6.5 Knowledge Management

| Tool | Type | Features | Pricing |
|------|------|----------|---------|
| GitBook | Docs-as-code | Git sync, editor, analytics, API docs | Free for public, $8/mo team |
| Notion | All-in-one | Wikis, databases, docs, project management | Free, $10/mo team |
| Confluence | Enterprise wiki | Templates, macros, Jira integration | $6/user/mo, free for OSS |
| Obsidian Publish | Knowledge base | Markdown, graph view | $10/mo per site |
| Outline | Docs (self-hostable) | Markdown, collections, search | Free self-hosted |

### 6.6 API Documentation

| Tool | Framework | Hosting | Features |
|------|-----------|---------|----------|
| Swagger/OpenAPI | YAML/JSON | Any | De facto standard, vast ecosystem |
| Stoplight | OpenAPI | Cloud | Visual editor, mocking, design-first |
| Postman | Collection-based | Cloud | API client, tests, documentation |
| Redoc | OpenAPI renderer | Any static host | Beautiful 3-panel layout |
| Scalar | OpenAPI renderer | Any static host | Modern, interactive API reference |

**OpenAPI 3.1 example:**
```yaml
openapi: 3.1.0
info:
  title: My API
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
paths:
  /users:
    get:
      summary: List all users
      responses:
        "200":
          description: A list of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        name:
          type: string
      required: [id, email, name]
```

---

## Part 7: Security Tooling

### 7.1 Secret Scanning

| Tool | Approach | Fake-positive handling | CI integration | Cost |
|------|----------|----------------------|---------------|------|
| gitleaks | Regex + entropy | `gitleaks:allow` comments | Pre-commit, GitHub Action | Free (MIT) |
| truffleHog | Regex + entropy + ML | Path-based ignore file | GitHub Action, Docker | Free (AGPL) |
| GitGuardian | Cloud scanning API | Web dashboard | GitHub/GitLab/Bitbucket app | Free for OSS |
| GitHub Secret Scanning | Pattern-based | Auto-dismiss | Native (no setup) | Free for public repos |
| GitLab Secret Detection | Pattern + entropy | CI job artifacts | Native CI job | Free |

**gitleaks configuration:**
```toml
# .gitleaks.toml
[allowlist]
paths = ["test/**", "*.test.*"]

[[rules]]
id = "github-token"
regex = '''ghp_[0-9a-zA-Z]{36}'''

[[rules]]
id = "aws-access-key"
regex = '''AKIA[0-9A-Z]{16}'''
```

```bash
gitleaks detect -v
gitleaks detect --source=/path/to/repo
gitleaks protect --staged
```

### 7.2 SAST (Static Application Security Testing)

| Tool | Languages | Detection approach | Integration | Cost |
|------|-----------|-------------------|-------------|------|
| Semgrep | 20+ languages | Pattern matching + AST | CLI, pre-commit, CI | Free Community |
| CodeQL | C/C++, C#, Go, Java, JS/TS, Python | Query-based (QL) | GitHub Actions (native) | Free for OSS |
| SonarQube | 30+ languages | Rules + dataflow | CI pipeline, PR decoration | Free Community |
| Checkmarx | 20+ languages | CxQL queries | IDE, CI, SCM plugins | Paid enterprise |
| Fortify | 27 languages | Dataflow + taint | IDE, CI | Paid enterprise |

**CodeQL in GitHub Actions:**
```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: python, javascript
- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v3
```

**Semgrep custom rules:**
```yaml
rules:
  - id: unsafe-sql-query
    patterns:
      - pattern: |
          cursor.execute("..." + $VAR + "...")
      - pattern-not: |
          cursor.execute("... %s", ...)
    message: "SQL injection risk"
    languages: [python]
    severity: ERROR
```

### 7.3 DAST (Dynamic Application Security Testing)

| Tool | Type | Protocol support | Features | Cost |
|------|------|-----------------|----------|------|
| OWASP ZAP | Active + passive | HTTP/HTTPS, WebSockets | HUD, automation, Fuzzer | Free (Apache-2.0) |
| Burp Suite | Active + passive | HTTP/HTTPS | Repeater, Intruder, Extender | Free Community, $449/yr Pro |
| Arachni | Active scanner | HTTP/HTTPS | Distributed, browser-based, REST API | Free (non-commercial) |

**OWASP ZAP automation:**
```bash
docker run -v $(pwd):/zap/reports:rw ghcr.io/zaproxy/zaproxy:stable \
  zap.sh -cmd -autorun /zap/reports/automation.yaml
```

### 7.4 SBOM Generation

| Tool | Formats | Output | Integration | Cost |
|------|---------|--------|-------------|------|
| Syft | SPDX, CycloneDX | JSON, text, table | CLI, GitHub Action, Docker | Free (Apache-2.0) |
| Trivy | SPDX, CycloneDX | JSON, table, SARIF | CLI, CI, Kubernetes | Free (Apache-2.0) |
| cdxgen | CycloneDX | JSON | CLI, CI, Maven/Gradle plugin | Free (Apache-2.0) |

```bash
syft myimage:latest -o spdx-json=sbom.spdx.json
trivy image --format cyclonedx --output sbom.cdx.json myimage:latest
```

### 7.5 Software Composition Analysis

| Tool | Vulnerability DB | License compliance | CI integration | Cost |
|------|----------------|-------------------|---------------|------|
| Snyk | Snyk DB + NVD | Yes | GitHub, GitLab, Jenkins | Free for OSS |
| Dependabot | GitHub Advisory DB | No | Native (GitHub) | Free |
| Renovate | Multiple (NVD, GitHub, OSV) | Yes | GitHub/GitLab/Bitbucket | Free (open source) |
| FOSSA | Multiple DBs | Yes | GitHub/GitLab/Jenkins | Free for OSS |
| OWASP Dependency-Check | NVD + multiple | No | CLI, Maven, Gradle, Jenkins | Free (Apache-2.0) |
| Trivy | Multiple (NVD, GitHub, RedHat) | Yes | CLI, GitHub Action, Kubernetes | Free (Apache-2.0) |

**Renovate configuration:**
```json
{
  "extends": ["config:recommended"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ],
  "schedule": ["before 8am on monday"],
  "labels": ["dependencies"],
  "vulnerabilityAlerts": { "labels": ["security"] }
}
```

**Dependabot configuration:**
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "monthly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

### 7.6 Supply Chain Security

| Framework/Tool | Purpose | Components | Adoption |
|----------------|---------|------------|----------|
| Sigstore / cosign | Container signing + verification | Fulcio (CA), Rekor (log), cosign (CLI) | CNCF, Kubernetes SIG |
| SLSA | Security levels 1-4 | Build L3+ require provenance attestations | Google, Kubernetes, npm |
| in-toto | Attestation framework | Layout, link metadata, verification | Sigstore integration |
| SPDX / CycloneDX | SBOM standards | Document format, tooling ecosystem | Required by US EO 14028 |

**Cosign signing:**
```bash
# Sign
cosign sign --key cosign.key ghcr.io/user/myimage:latest
# Verify
cosign verify --key cosign.pub ghcr.io/user/myimage:latest
# Keyless (via OIDC)
cosign sign ghcr.io/user/myimage:latest
cosign verify ghcr.io/user/myimage:latest \
  --certificate-identity user@example.com \
  --certificate-oidc-issuer https://accounts.google.com
```

**SLSA levels:**
| Level | Requirements | Example |
|-------|-------------|---------|
| SLSA 1 | Build scripts documented, provenance | Basic CI pipeline |
| SLSA 2 | Build service hosted, provenance signed | GitHub Actions with OIDC |
| SLSA 3 | Build service prevents tampering | Buildkite with hermetic builds |
| SLSA 4 | Two-person review, reproducible, deps resolved | Fully air-gapped builds |

### 7.7 Fuzzing

| Tool | Languages | Mutation engine | Integration | Cost |
|------|-----------|----------------|-------------|------|
| OSS-Fuzz | C/C++, Rust, Python, Go, Java | libFuzzer + AFL++ | Google Cloud, ClusterFuzz | Free (Google-hosted) |
| AFL++ | C/C++ | Evolutionary + custom | CLI script | Free (Apache-2.0) |
| libFuzzer | C/C++ | Evolutionary, in-process | LLVM toolchain | Free (part of Clang) |
| cargo-fuzz | Rust | libFuzzer-based | cargo fuzz | Free |
| go-fuzz | Go | Coverage-guided | go-fuzz-build | Free (Apache-2.0) |
| Jazzer | Java (JVM) | libFuzzer-based | JUnit integration | Free (Apache-2.0) |

### 7.8 Container Scanning

| Tool | Vulnerability DB | Formats | CI integration | Cost |
|------|----------------|---------|---------------|------|
| Trivy | NVD, GitHub, GitLab, RedHat, Alpine | JSON, SARIF, table | GitHub Action, CLI, IDE | Free (Apache-2.0) |
| Clair | CVE feeds | JSON | Quay integration | Free (Apache-2.0) |
| Anchore Grype | NVD, GitHub, RedHat | JSON, table | GitHub Action, CLI | Free (Apache-2.0) |
| Docker Scout | Docker Hub | JSON | Docker CLI | Free for personal |
| Snyk Container | Snyk DB | JSON | CLI, CI, IDE | Free for OSS |

**Trivy example:**
```bash
trivy image myapp:latest
trivy image --severity CRITICAL,HIGH myapp:latest
trivy image --format sarif --output scan.sarif myapp:latest
```

**GitHub Action:**
```yaml
- name: Run Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: "myapp:latest"
    format: "sarif"
    output: "trivy-results.sarif"
    severity: "CRITICAL,HIGH"
```

### 7.9 Security Tooling Comparison Table

| Tool | Type | Ease of Setup | CI Integration | Language Coverage | Cost | Notes |
|------|------|---------------|---------------|------------------|------|-------|
| gitleaks | Secret scanning | Very easy | GitHub Action, pre-commit | All | Free | Inline ignore |
| truffleHog | Secret scanning | Easy | GitHub Action, Docker | All | Free | ML-based |
| Semgrep | SAST | Easy | CI, pre-commit | 20+ | Free Community | Custom rules |
| CodeQL | SAST | Very easy | Native GitHub Actions | 7 | Free for OSS | Expressive QL |
| SonarQube | SAST + Quality | Medium | CI pipeline | 30+ | Free Community | Quality gates |
| OWASP ZAP | DAST | Medium | CLI, Docker | Web apps | Free | Automation |
| Syft | SBOM | Very easy | CLI, GitHub Action | Containers | Free | SPDX + CycloneDX |
| Trivy | SCA + Container | Very easy | CLI, GitHub Action, K8s | All | Free | SBOM + secrets |
| Snyk | SCA | Very easy | GitHub/GitLab app | 10+ | Free for OSS | Fix PRs |
| Renovate | Dependency updates | Medium | GitHub/GitLab app | 50+ | Free | Highly configurable |
| Dependabot | Dependency updates | Trivial | Native GitHub | All | Free | Simple |
| Sigstore | Supply chain | Medium | GitHub Actions | Containers | Free | Keyless signing |
| OSS-Fuzz | Fuzzing | Hard (submit to Google) | GitHub Actions | Multi | Free | Google-hosted |

---

## Part 8: Development Environment & Automation

### 8.1 Editor / IDE Ecosystem

| Editor/IDE | Language support | Plugin ecosystem | Performance | Cost | Best for |
|------------|-----------------|-----------------|-------------|------|----------|
| VS Code | All major (via extensions) | 50,000+ extensions | Good | Free (MIT) | General development, all platforms |
| JetBrains IDEs | Per-language (IntelliJ, PyCharm, WebStorm) | 1,000+ plugins | Excellent | Paid ($15/mo) | Java, Kotlin, Python, full-stack |
| Neovim | All (via LSP) | 1,000+ plugins (lazy.nvim) | Excellent | Free (Apache-2.0) | Terminal-centric, power users |
| Zed | Rust-native, JS/TS/Python/Rust | Limited (growing) | Excellent | Free | Performance-focused, multi-cursor |

#### VS Code Key Extensions for OSS

- **GitLens** â€” Git blame annotations, history explorer
- **GitHub Pull Requests** â€” Review PRs inline
- **Prettier** â€” Code formatter
- **ESLint** â€” JavaScript/TypeScript linting
- **Python** â€” Pylance, IntelliSense, debugging
- **Docker** â€” Container management
- **Dev Containers** â€” `devcontainer.json` support
- **Live Share** â€” Collaborative editing

### 8.2 Dev Containers

Standardized development environments using containers.

**devcontainer.json:**
```json
{
  "name": "My Project",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
    }
  },
  "postCreateCommand": "npm ci",
  "forwardPorts": [3000, 5432],
  "remoteUser": "node"
}
```

**GitHub Codespaces** â€” cloud-hosted dev containers with 60 free hours/month for personal accounts.

**DevPod** â€” open-source alternative that works with any provider (local Docker, SSH, cloud).

### 8.3 Local Development

| Tool | Purpose | Config format | Best for |
|------|---------|---------------|----------|
| Docker Compose | Multi-container local env | docker-compose.yml | Service-oriented apps, databases |
| Vagrant | Full VM provisioning | Vagrantfile | Cross-platform testing, legacy systems |
| Nix / devenv.sh | Declarative environments | flake.nix, devenv.nix | Reproducible, hermetic dev shells |
| mise | Polyglot tool version manager | .mise.toml | Replaces asdf, nvm, pyenv for tool versioning |

**Docker Compose example:**
```yaml
version: "3.9"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### 8.4 Task Runners

| Tool | Language | Config format | Features | Best for |
|------|----------|---------------|----------|----------|
| Make | Any | Makefile | Universal, simple, built-in | C/C++, cross-language pipelines |
| Just | Any | justfile | Improved Make (no tabs, syntax sugar) | Task runner replacement for Make |
| Task (Go) | Any | Taskfile.yml | YAML, dependencies, OS-specific | Cross-platform task running |
| npm scripts | Node.js | package.json | Simple, built-in | JS/TS projects |

**Justfile example:**
```make
alias t := test

build:
    npm run build

test: build
    npm test

lint:
    npx eslint src/

ci: test lint
    echo "All checks passed"
```

**Taskfile.yml example:**
```yaml
version: "3"

tasks:
  build:
    cmds:
      - npm run build

  test:
    deps: [build]
    cmds:
      - npm test

  lint:
    cmds:
      - npx eslint src/

  ci:
    cmds:
      - task: test
      - task: lint
```

### 8.5 Monorepo Tools

| Tool | Language | Key feature | Task orchestration | Caching | Use case |
|------|----------|-------------|-------------------|---------|----------|
| Nx | JS/TS, Python, Go, Rust | Dependency graph, affected commands | Yes | Distributed | Large monorepos, enterprise |
| Turborepo | JS/TS | Parallel execution, caching | Yes | Local + remote | JS/TS monorepos |
| Lerna | JS/TS | Package publishing, versioning | Basic | No | Multi-package publishing |
| Bazel | Multi-language | Hermetic builds, incremental | Yes | Yes (remote) | Large-scale, multi-language |
| Buck2 | Multi-language | Facebook's Bazel alternative | Yes | Yes | Extremely large repos |

**Nx workspace example:**
```bash
npx create-nx-workspace@latest myorg --preset=ts
nx g @nx/js:lib shared/utils
nx g @nx/next:app web
nx test shared-utils
nx affected:test --base=main
nx run-many --target=build --all
```

**Turborepo example:**
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "outputs": []
    }
  }
}
```

```bash
npx turbo run build
npx turbo run test --filter=web
npx turbo run lint --parallel
```

---

## Part 9: Tool Selection Decision Frameworks

### 9.1 How to Choose CI/CD

**Decision criteria (weighted):**

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Scale (team size + repo count) | 30% | 1=small team (<5), 2=medium (5-20), 3=large (20+) |
| Cost sensitivity | 25% | 1=no budget, 2=some budget, 3=enterprise budget |
| Ecosystem integration | 20% | 1=GitHub shop, 2=GitLab shop, 3=multi-platform |
| Self-hosting required | 15% | 1=cloud only, 2=hybrid, 3=must self-host |
| Advanced features needed | 10% | 1=basic, 2=ci/cd, 3=full platform |

**Decision flow:**
```
1. GitHub shop? -> GitHub Actions (best integration, free for public)
2. GitLab shop? -> GitLab CI/CD (integrated, auto DevOps)
3. Must self-host with maximum plugins? -> Jenkins
4. Container-native, lightweight? -> Drone / Woodpecker
5. Hybrid cloud + on-prem? -> Buildkite
6. Azure ecosystem? -> Azure Pipelines
7. Performance-critical CI (fastest builds)? -> CircleCI
8. Minimalist, no-JS needed? -> SourceHut CI
```

### 9.2 How to Choose a Package Manager

**Decision criteria:**
- **Deterministic builds** â€” must have lockfile (Poetry, pnpm, cargo, go mod)
- **Registry security** â€” checksum verification (npm integrity, Go sumdb, Cargo.lock)
- **Monorepo support** â€” workspaces (pnpm, PDM, cargo, Nx)
- **Speed** â€” uv (Python), pnpm/bun (JS), cargo (Rust)
- **Community adoption** â€” pip/npm/cargo are defaults for a reason

**Decision flow (Python):**
```
Building a library? -> Poetry or PDM
Building an app with strict deploys? -> uv or Poetry
Scientific/ML project? -> Conda + pip
CI speed critical? -> uv
Legacy project? -> pip + requirements.txt
```

**Decision flow (JavaScript):**
```
Simple script/site? -> npm (zero setup)
Monorepo with many packages? -> pnpm (disk efficient) or Turborepo + pnpm
Maximum speed? -> bun (runtime + package manager)
Zero-install philosophy? -> yarn berry (PnP + .yarn/cache in git)
Enterprise with strict deps? -> pnpm with hoist=false
```

### 9.3 How to Choose Linting

**Decision criteria:**
| Criterion | Weight |
|-----------|--------|
| Performance (speed matters in CI) | 30% |
| Rules coverage (false positive rate) | 25% |
| Auto-fix capability | 20% |
| Language support | 15% |
| Community / maintenance | 10% |

**Recommendations by language:**
- **Python:** Ruff (universal linter + formatter) + mypy (types) + Bandit (security)
- **JavaScript/TypeScript:** Biome (replaces ESLint + Prettier) or ESLint + Prettier
- **Rust:** Clippy + rustfmt (official, best-in-class)
- **Go:** golangci-lint (aggregates gofmt, govet, staticcheck)
- **Java:** Checkstyle (style) + PMD (best practices) + Error Prone (bug patterns)
- **Multi-language:** Semgrep (custom rules) + SonarQube (quality gates)

### 9.4 How to Choose Monitoring

**Decision criteria:**
| Criterion | Self-hosted | Cloud |
|-----------|-------------|-------|
| Budget | $0 (Prometheus + Grafana) | $50-500/mo (Datadog, New Relic) |
| Scale | Limited by your infra | Virtually unlimited |
| Maintenance | High (OS upgrades, scaling) | Zero (managed) |
| Data retention | Limited by storage | 30 days+ |
| Alerting | Alertmanager (manual config) | Built-in, PagerDuty/Opsgenie |

**Decision flow:**
```
1. Zero budget, willing to self-host? -> Prometheus + Grafana + Loki
2. Need full APM + no ops? -> Datadog (if budget allows)
3. Need APM, have some budget? -> OpenTelemetry + Grafana Cloud (free tier)
4. Already on AWS? -> CloudWatch + X-Ray
5. Kubernetes-native? -> kube-prometheus-stack (Prometheus + Grafana + Alertmanager)
6. Error tracking only? -> Sentry (self-host or cloud)
7. Logs only? -> Loki + Grafana (cloud-native) or ELK (full search)
```

### 9.5 Decision Tree Diagrams (Textual)

**CI/CD Decision Tree:**
```
Is your code on GitHub?
  Yes: GitHub Actions
  No: Is your code on GitLab?
    Yes: GitLab CI/CD
    No: Do you need full control / self-hosting?
      Yes: Do you have Kubernetes?
        Yes: Jenkins or Woodpecker
        No: Jenkins or Drone
      No: Do you need fastest builds?
        Yes: CircleCI
        No: Is budget a primary concern?
          Yes: Buildkite (you pay for agents only)
          No: Evaluate feature fit (Azure Pipelines for Azure shop)
```

**Package Manager Decision Tree:**
```
What ecosystem?
  Python:
    Need max speed? -> uv
    Publishing library? -> Poetry or PDM
    Scientific/ML? -> Conda
  JavaScript/TypeScript:
    PnP/zero-install? -> yarn berry
    Disk efficiency? -> pnpm
    Speed + runtime? -> bun
    Standard? -> npm
  Rust: cargo (always)
  Go: go mod (always)
```

---

## Part 10: Templates

### 10.1 CI/CD Pipeline Templates

#### GitHub Actions (Node.js + Docker)
```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  build-and-push:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: [test]
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

#### GitLab CI/CD (Python)
```yaml
image: python:3.12-slim

stages:
  - lint
  - test
  - build

before_script:
  - python -m venv .venv
  - source .venv/bin/activate
  - pip install --upgrade pip
  - pip install -e .[dev]

ruff:
  stage: lint
  script:
    - ruff check src/
    - ruff format --check src/

pytest:
  stage: test
  script:
    - pytest --cov=src --cov-report=term --cov-report=xml
  coverage: '/TOTAL.*\s+(\d+\.?\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage.xml

mypy:
  stage: test
  script:
    - mypy src/

build:
  stage: build
  script:
    - pip install build
    - python -m build
  artifacts:
    paths:
      - dist/
```

#### CircleCI (Go)
```yaml
version: 2.1

orbs:
  go: circleci/go@1.11

jobs:
  test:
    docker:
      - image: cimg/go:1.22
    steps:
      - checkout
      - go/load-cache:
          key: v1
      - go/mod-download
      - go/save-cache:
          key: v1
      - run:
          name: Run tests
          command: gotestsum --junitfile junit.xml ./...
      - store_test_results:
          path: junit.xml

  lint:
    docker:
      - image: golangci/golangci-lint:v1.59
    steps:
      - checkout
      - run: golangci-lint run ./...

workflows:
  version: 2
  ci:
    jobs:
      - lint
      - test
```

### 10.2 Package Manager Configuration Templates

#### Poetry (Python)
```toml
[tool.poetry]
name = "my-project"
version = "0.1.0"
description = ""
authors = ["Your Name <email@example.com>"]
license = "MIT"
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.11"

[tool.poetry.group.dev.dependencies]
pytest = "^8.0"
ruff = "^0.4"
mypy = "^1.8"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

#### pnpm Workspace (JS)
```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
// .npmrc
shamefully-hoist=true
strict-peer-dependencies=true
auto-install-peers=true
```

#### Cargo Workspace (Rust)
```toml
[workspace]
members = [
    "crates/core",
    "crates/cli",
    "crates/web",
]
resolver = "2"

[workspace.dependencies]
serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
anyhow = "1"
thiserror = "1"
```

### 10.3 Pre-commit Configuration Template

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
        args: ["--maxkb=500"]
      - id: check-merge-conflict
      - id: detect-private-key

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.8
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy
        args: [--strict]
        language: system

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.2
    hooks:
      - id: gitleaks

  - repo: https://github.com/rhysd/actionlint
    rev: v1.7.1
    hooks:
      - id: actionlint
```

### 10.4 Dockerfile Best Practices Template

```dockerfile
# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS production
WORKDIR /app

# Run as non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json .

USER appuser
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

**Multi-stage build rules:**
- Use distroless or alpine for production stage
- Copy only runtime dependencies, not dev dependencies
- Run as non-root user
- Set HEALTHCHECK instruction
- Use LABEL for metadata (org.opencontainers.image.source)
- Pin base images by digest: `node:20-alpine@sha256:...`

### 10.5 Dev Container Configuration Template

```json
{
  "name": "Full-Stack Development",
  "image": "mcr.microsoft.com/devcontainers/universal:2",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    },
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.12"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-python.python",
        "ms-azuretools.vscode-docker",
        "github.vscode-github-actions"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "python.defaultInterpreterPath": ".venv/bin/python"
      }
    }
  },
  "postCreateCommand": "npm ci && pip install -e .[dev]",
  "postStartCommand": "npm run dev",
  "forwardPorts": [3000, 5432, 8080],
  "portsAttributes": {
    "3000": { "label": "Web App" },
    "5432": { "label": "PostgreSQL" }
  },
  "remoteUser": "codespace",
  "containerEnv": {
    "DATABASE_URL": "postgres://postgres:postgres@localhost:5432/myapp",
    "NODE_ENV": "development"
  }
}
```

---

## License

This reference document is provided under CC0 1.0 Universal (Public Domain Dedication). Free to use, adapt, and share for any purpose.

---

*End of document.*
