# OSS Security & Software Supply Chain — Universal Reference

> A global reference applicable to ANY open source project. Covers threats, dependency
> management, vulnerability handling, secure coding, CI/CD security, incident response,
> and compliance. Maintained as a living document — update as ecosystems evolve.

---

## Table of Contents

1. [Part 1: Supply Chain Threats](#part-1-supply-chain-threats)
2. [Part 2: Dependency Management Best Practices](#part-2-dependency-management-best-practices)
3. [Part 3: Vulnerability Management](#part-3-vulnerability-management)
4. [Part 4: Secure Coding Practices](#part-4-secure-coding-practices)
5. [Part 5: CI/CD Security](#part-5-cicd-security)
6. [Part 6: Incident Response for OSS Projects](#part-6-incident-response-for-oss-projects)
7. [Part 7: Compliance & Standards](#part-7-compliance--standards)

---

## Part 1: Supply Chain Threats

### 1.1 Dependency Confusion Attacks

**Concept:** An attacker publishes a package with the same name as an internal/private
package used by an organization, but to a public registry. Package managers default to
the highest version number, so if the public package has a higher version, it gets
installed instead of the private one.

**Vector:**
- Target uses private packages hosted on internal registries
- Attacker identifies internal package names (via leaked `package.json`, `.npmrc`,
  `requirements.txt`, error messages, or GitHub repo inspection)
- Attacker publishes a public package with the same name and a higher version number
- Build system pulls the malicious public package instead of the private one

**Real-world impact (2021):** Multiple large tech companies were targeted. Researchers
demonstrated successful internal package takeover at PayPal, Apple, Netflix, Yelp, Tesla,
and Uber via npm, PyPI, RubyGems, and NuGet. The attack class was systematized by Alex
Birsan in his 2021 research paper "Dependency Confusion."

**Mitigation:**
- Scope-scoped packages (npm `@org/package`), namespace-owned packages (PyPI
  `@org/package` is NOT a thing — use `prefix_` naming convention or scoped
  registries)
- Scoped registries in `.npmrc`: `@org:registry=https://private-registry.example.com`
- Use `--extra-index-url` vs `--index-url` carefully; prefer `--index-url` pointing
  at private repo only, with `--extra-index-url` for public (pip)
- Package manager lockfiles enforce resolved versions
- Registry firewall/proxy that blocks names matching internal conventions
- Azure Artifacts upstream sources, GitHub Packages upstream sources

### 1.2 Typosquatting Across Ecosystems

Typosquatting relies on developers making typographical errors when installing packages.
Attackers register names that differ by one character, use homoglyphs (Unicode lookalikes),
or swap word order.

**Ecosystem-specific patterns:**

| Ecosystem | Registry | Typosquat Example | Install Command |
|-----------|----------|------------------|-----------------|
| npm | registry.npmjs.org | `requets` → `requests` | `npm install` |
| PyPI | pypi.org | `requrests` → `requests` | `pip install` |
| RubyGems | rubygems.org | `bcrypt` → `bcrypt` (homoglyph) | `gem install` |
| crates.io | crates.io | `serde_json` → `serde-json` (dash variant) | `cargo add` |
| Go Proxy | proxy.golang.org | `gorilla/mux` → `gorrilla/mux` | `go get` |
| Maven Central | repo1.maven.org | `log4j-core` → `log4j-c0re` | Maven/Gradle |

**Notable typosquatting waves:**
- **2017 PyPI:** `Urllib3` → `urllib3` (typo), `beautifulsoup4` → `beautifulsoup` (missing `4`)
- **2018 npm:** 38 typosquatted packages removed, including `babel-cli` lookalikes
- **2021 npm:** `electron-native` ecosystem — `electronnative` variants
- **2022 PyPI:** `torchtriton` malicious package targeting ML community
- **2023 PyPI:** over 200 typosquatted packages targeting `requests`, `urllib3`, `boto3`
- **2024 npm:** `eslint-config-airbnb` typosquatted with data exfiltration payload

**Mitigation:**
- Use package managers with integrity verification (lockfiles, checksums)
- Enable 2FA on registry accounts
- Review package names carefully before installation
- Use `--dry-run` flags before actual install
- Automate scanning for typo-squatted package names in CI (open-source tools exist
  for each ecosystem)

### 1.3 Malicious Package Insertion

Beyond typosquatting, attackers may successfully inject malicious code into legitimate,
well-known packages.

**Case Study — event-stream (npm, 2018)**

| Detail | Value |
|--------|-------|
| Package | `event-stream` |
| Weekly downloads | ~2 million |
| Maintainer compromise | Social engineering — attacker convinced maintainer to transfer ownership |
| Payload | `flatmap-stream` dependency targeting `copay` Bitcoin wallet |
| Target | Steal cryptocurrency wallet keys |
| Duration in registry | ~3 months |
| Affected versions | 3.3.5, 3.3.6 |
| Detection | Community noticed unusual minified code in the dependency chain |

Timeline:
- **Sept 2018:** Maintainer @dominictarr transfers ownership to a new contributor
  ("right9ctrl") who had been submitting helpful PRs
- **Oct 2018:** malicious `event-stream@3.3.6` published via `flatmap-stream`
- **Nov 2018:** Community discovers obfuscated payload; npm removes the package
- **Dec 2018:** Full disclosure published. Forensic analysis reveals the payload
  targeted `copay` Bitcoin wallet versions 5.0.2–5.1.0
- **Impact:** $8M+ in cryptocurrency losses estimated

**Case Study — ua-parser-js (npm, 2021)**

| Detail | Value |
|--------|-------|
| Package | `ua-parser-js` |
| Weekly downloads | ~8 million |
| Attack type | Compromised npm tokens |
| Payload | Cryptominer + credential theft |
| Affected versions | 0.7.29, 0.8.0, 1.0.0 (malicious) |
| Duration | ~3 days before detection |

Timeline:
- **Oct 22, 2021:** Attacker gained access to npm publisher account
- **Oct 22, 2021:** Versions 0.7.29, 0.8.0, 1.0.0 released with malicious code
- **Oct 25, 2021:** Community reports; npm removes versions
- **Impact:** millions of websites potentially compromised during the window

**Case Study — colors.js / faker.js (npm, 2022)**

| Detail | Value |
|--------|-------|
| Packages | `colors`, `faker` |
| Weekly downloads | 20M+ (colors), 7M+ (faker) |
| Attack type | Maintainer protest (self-sabotage) |
| Payload | Infinite loop (`colors@1.4.44`–`1.4.88`) printing "LIBERTY LIBERTY LIBERTY" |
| Affected versions | `colors@1.4.44+`, `faker@6.6.6` |
| Duration | ~1 day before pinned versions mitigated |

Timeline:
- **Jan 6, 2022:** Maintainer marak published `colors@1.4.44` with an infinite loop
  and passive-aggressive messages about unpaid corporate usage
- **Jan 7, 2022:** `faker@6.6.6` published, wiping all meaningful content
- **Jan 7–8, 2022:** Widespread breakage — thousands of build pipelines failed
- **Jan 9, 2022:** npm pinned unaffected versions (`colors@1.4.0`)

**Case Study — @lukeed/resolve (npm clipboard hijack, 2021)**

- **Nov 2021:** Package `@lukeed/resolve` had malicious code that monitored clipboard
  content, intercepting cryptocurrency addresses and redirecting payments
- **Detection:** Community audit discovered clipboard hijacking in build scripts

### 1.4 Compromised Maintainer Accounts

Attack vectors:
- Phishing campaigns targeting maintainers
- Credential reuse from data breaches (HaveIBeenPwned)
- Session token theft from developer machines
- Social engineering (building reputation via benign PRs then requesting access)
- SIM swapping for 2FA bypass

**Notable incidents:**
- **npm (multiple):** dozens of packages hijacked via credential stuffing (2018–2025)
- **PyPI (2022):** `ctx` package compromise — maintainer account taken over
- **RubyGems (2022):** `rest-client` maintainer account phished
- **Chrome Extensions (2023–2024):** multiple extension developers phished to inject
  adware/data-stealing updates

**Mitigation:**
- **Hardware security keys (FIDO2/WebAuthn)** — required for all registry accounts
- **MANDATORY:** All package registries now require 2FA for popular packages
  - npm: 2FA required for packages with >1M weekly downloads or >500 dependents
  - PyPI: 2FA strongly encouraged; CLI-based tokens available
  - RubyGems: 2FA via OTP or WebAuthn
  - Crates.io: 2FA for all account operations
- Use API tokens scoped to specific packages, never your registry password
- Rotate tokens regularly
- Monitor account activity logs

### 1.5 Build-Time Injection Attacks

Attackers compromise the build process itself, not just source code. This bypasses
code review because the malicious code exists only in the build artifact.

**Case Study — Codecov (2021)**

| Detail | Value |
|--------|-------|
| Target | Codecov bash uploader script |
| Attack type | Compromised Docker image creation process (GPG keys) |
| Payload | Exfiltration of CI/CD environment variables (cloud tokens, credentials) |
| Affected | ~29,000 customers |
| Duration | ~2 months (Jan 31 – Apr 1, 2021) |

Timeline:
- **Jan 31, 2021:** Attacker gained access to Codecov's GCP credentials via leaked
  credentials in a Docker image build script
- **Feb 1, 2021:** Malicious version of `codecov-bash` uploader script published
- **Feb–Mar 2021:** Bash uploader script exfiltrated CI environment variables to
  attacker-controlled server
- **Apr 1, 2021:** Customer detects unusual network traffic from Codecov uploader
- **Apr 15, 2021:** Codecov publicly discloses breach
- **Impact:** thousands of organizations' CI secrets (AWS keys, GitHub tokens, npm
  tokens) compromised, enabling follow-on supply-chain attacks

**Key lesson:** Bash uploaders — single scripts with high privilege access — are
extremely dangerous. Prefer native CI integrations with OIDC instead.

**Case Study — SolarWinds Orion (2020)**

| Detail | Value |
|--------|-------|
| Target | SolarWinds Orion IT monitoring platform |
| Attack type | Software supply chain (build system compromise) |
| Payload | SUNBURST backdoor inserted into Orion DLLs |
| Affected customers | ~18,000 organizations |
| Duration | ~14 months undetected |

Timeline:
- **Sept 2019:** Attacker (Russian state-sponsored APT, likely Cozy Bear/APT29) gains
  initial foothold in SolarWinds internal network
- **Oct 2019–Feb 2020:** Attacker moves laterally, learns build processes, obtains
  code-signing certificates
- **Mar 2020:** First trojanized Orion build (2020.2) containing SUNBURST backdoor
- **Mar–Dec 2020:** Multiple updates pushed via Orion's regular update mechanism,
  containing the backdoor
- **Dec 12, 2020:** Mandiant/FireEye discovers the breach after detecting FireEye's
  own tools stolen
- **Dec 13, 2020:** SolarWinds notified; public disclosure Dec 14
- **Impact:** US government agencies (Treasury, Commerce, DHS, DoD), Fortune 500
  companies, security firms; total remediation cost estimated >$100B

Technical details of SUNBURST:
- Dormant for 2 weeks after installation (evasion)
- DNS-based C2 communication via `*.appsync-api.*` subdomains
- Code hidden in Orion Improvement Program (OIP) telemetry module
- Obfuscated with XOR and compression
- Only activated in non-lab environments (avoided detection by researchers)
- Exfiltrated data using legitimate SolarWinds APIs (blended in with normal traffic)

### 1.6 Upstream Compromise Propagation

When a widely-used dependency is compromised, EVERY project that depends on it is
affected — directly or transitively.

**Case Study — Log4Shell (CVE-2021-44228)**

| Detail | Value |
|--------|-------|
| Package | Apache Log4j 2 (Java) |
| CVSS | 10.0 (Critical) |
| Attack type | JNDI injection — unauthenticated RCE via log message |
| Affected | Thousands of projects, millions of servers |
| Discovery | Dec 9, 2021 (Alibaba Cloud Security) |

Timeline:
- **Nov 24, 2021:** Chen Zhaojun of Alibaba Cloud reports vulnerability to Apache
- **Dec 2, 2021:** Apache releases emergency patch `2.15.0-rc1` (incomplete fix)
- **Dec 9, 2021:** Public disclosure via tweet; exploit code published within hours
- **Dec 10, 2021:** Widespread scanning for vulnerable systems begins
- **Dec 13, 2021:** Second patch `2.16.0` released (disables message lookups by default)
- **Dec 14, 2021:** Bypass found (CVE-2021-45046); `2.17.0` released
- **Dec 17, 2021:** DoS vector found (CVE-2021-45105); `2.17.0` addressed
- **Jan 2022–ongoing:** Additional CVEs discovered; mitigation bypasses

Propagation chain:
```
log4j-core:2.14.1 (vulnerable)
  └─ elasticsearch → spring-boot-starter → your application
  └─ flink → your big data pipeline
  └─ kafka → your streaming infrastructure
  └─ solr → your search service
```

**Case Study — xz/utils backdoor (2024)**

| Detail | Value |
|--------|-------|
| Ecosystem | Linux distros — SSH via liblzma in xz/utils |
| Attack type | Multi-year social engineering + backdoor |
| Payload | SSH authentication bypass (CVE-2024-3094) |
| Affected | Pre-release versions of major distros (Fedora 40+, Debian testing, Arch) |
| Discovery | Mar 29, 2024 (Andres Freund, Microsoft — noticed 500ms SSH CPU spike) |
| CVSS 4.0 | 10.0 |

Timeline:
- **2021:** Attacker ("Jia Tan") begins contributing to xz project with small patches
- **2022:** Maintainer (Lasse Collin) is increasingly burdened; Jia Tan takes on
  more responsibility
- **Feb 2023:** Jia Tan commits "ifunc" resolver infrastructure (later used for
  the backdoor)
- **Early 2024:** Jia Tan becomes primary maintainer
- **Feb 2024:** Backdoored `liblzma` binaries published (compiled from poisoned
  test artifacts — NOT source, bypassing code review)
- **Mar 2024:** Backdoor nearly enters Debian testing and Fedora 40 beta
- **Mar 29, 2024:** Andres Freund detects anomalous SSH performance on Debian sid
- **Same day:** Analysis confirms backdoor in liblzma targeting sshd
- **Impact:** Narrow miss — only pre-release affected. Could have been the most
  widespread supply-chain attack in history (SSH on every Linux server)

Technical details:
- Backdoor lived in compressed test artifacts (`tests/files/` — binary blobs),
  NOT in readable source code
- The build process (`build-to-host.m4`) extracted the payload during `./configure`
- Payload hooked `openssh`'s `RSA_public_decrypt` to bypass authentication
- Allowed attacker to execute arbitrary code via SSH with a crafted key
- Multi-year op with fake personas, sustained contributions, and social engineering

---

## Part 2: Dependency Management Best Practices

### 2.1 Pinning Strategies

**Exact version pinning** — specify the full version with no ranges:

```json
{
  "dependencies": {
    "express": "4.18.2",
    "lodash": "4.17.21"
  }
}
```

```toml
# Cargo.toml
[dependencies]
serde = "=1.0.188"
```

```ini
# requirements.txt
requests==2.31.0
urllib3==2.0.7
```

**Hash pinning** (maximum integrity guarantee):

```dockerfile
FROM python:3.12-slim@sha256:abc123def456...
```

```yaml
# pip hash pinning
requests==2.31.0 --hash=sha256:abc123...
```

```yaml
# Bazel
http_archive(
    name = "rules_python",
    sha256 = "abc123def456...",
    strip_prefix = "rules_python-0.25.0",
    url = "https://github.com/bazelbuild/rules_python/releases/download/0.25.0/rules_python-0.25.0.tar.gz",
)
```

**Lockfile generation** — commit lockfiles to version control:

| Ecosystem | Lockfile | Purpose |
|-----------|----------|---------|
| npm | `package-lock.json` | Pins exact tree of ALL transitive deps |
| Yarn | `yarn.lock` | Same as above |
| pnpm | `pnpm-lock.yaml` | Strict dependency isolation |
| Python (pip) | `requirements.txt` (frozen) | Pin all deps with `pip freeze` |
| Python (poetry) | `poetry.lock` | Full resolution |
| Python (uv) | `uv.lock` | Fast, deterministic |
| Rust | `Cargo.lock` | Full resolution |
| Go | `go.sum` | Hash-pinned module checksums |
| Ruby (Bundler) | `Gemfile.lock` | Full resolution |
| .NET | `packages.lock.json` | JSON lockfile |
| Java (Gradle) | `gradle.lockfile` | Dependency lock |

**Comparison of pinning strategies:**

| Strategy | Integrity | Automation | Usability | Upgrade cost |
|----------|-----------|------------|-----------|-------------|
| Range only | None | Easy | High | Low |
| Exact version | Good | Moderate | High | Moderate |
| Lockfile (committed) | Strong | Easy | High | Low |
| Hash pinning (direct deps) | Strong | Moderate | Moderate | High |
| Hash pinning (all deps) | Strongest | Moderate | Low | Very high |
| Lockfile + hash verification | Strongest | Easy | High | Low |

**Recommendation:** Commit lockfiles. Use hash pinning for base Docker images and
foundational build tools.

### 2.2 Automated Update Tools

**Dependabot** (GitHub-native):

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "automated"
    reviewers:
      - "team-security"
    ignore:
      - dependency-name: "express"
        versions: ["5.x"]
```

**Renovate** (cross-platform, self-hostable or GitHub app):

```json5
// renovate.json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base",
    ":separateMajorMinor",
    ":combinePatchMinorUpdates",
    ":disableDependencyDashboard"
  ],
  "packageRules": [
    {
      "matchUpdateTypes": ["patch"],
      "automerge": true
    },
    {
      "matchDepTypes": ["devDependencies"],
      "automerge": true,
      "schedule": ["before 9am on Monday"]
    }
  ],
  "vulnerabilityAlerts": {
    "labels": ["security"],
    "automerge": true
  }
}
```

**Snyk** (commercial, with free tier):

- Monitors dependencies for known vulnerabilities
- Creates PRs with fixes
- Tests for exploitability
- Supports npm, Maven, Gradle, pip, Docker, Terraform, Go modules

**Recommended workflows:**

```yaml
# .github/workflows/dependency-review.yml
name: 'Dependency Review'
on: [pull_request]
permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: 'high'
          allow-licenses: MIT, Apache-2.0, BSD-3-Clause
          deny-licenses: GPL-3.0, AGPL-3.0
```

### 2.3 Vulnerability Scanning

**Ecosystem-native tools:**

| Tool | Setup | Command | Integration |
|------|-------|---------|-------------|
| `npm audit` | Built-in | `npm audit` | Reports to CLI, `npm audit fix` |
| `yarn audit` | Built-in | `yarn audit` | Reports to CLI |
| `cargo audit` | `cargo install cargo-audit` | `cargo audit` | CI-friendly |
| `pip-audit` | `pip install pip-audit` | `pip-audit` | CI, SARIF output |
| `go audit` | `govulncheck` | `govulncheck ./...` | Go team maintained |
| `trivy` | Binary install | `trivy fs .` | Multi-ecosystem, container scanning |
| `grype` | Binary install | `grype dir:.` | Anchore-backed, SBOM-aware |
| `safety` | `pip install safety` | `safety scan` | PyPI vulnerability DB |

**CI integration example (Trivy):**

```yaml
name: "Trivy Scan"
on:
  schedule:
    - cron: '0 6 * * *'
  push:
    branches: [main]
  pull_request:

jobs:
  trivy-scan:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'
```

**OSV (Open Source Vulnerabilities) — unified API:**

```bash
# Query a package for known vulnerabilities
curl -X POST https://api.osv.dev/v1/query \
  -H "Content-Type: application/json" \
  -d '{"package": {"name": "lodash", "ecosystem": "npm"}, "version": "4.17.20"}'
```

```json
{
  "vulns": [
    {
      "id": "GHSA-35jh-r3h4-6jhm",
      "summary": "Prototype Pollution in lodash",
      "aliases": ["CVE-2020-8203"],
      "modified": "2023-08-26T22:48:15Z"
    }
  ]
}
```

### 2.4 SBOM Generation (SPDX / CycloneDX)

**SBOM = Software Bill of Materials.** A machine-readable inventory of all components
in a software artifact.

**Formats:**

| Format | Spec body | Key features |
|--------|-----------|-------------|
| SPDX | Linux Foundation | Legal-focus: licenses, copyrights, origin |
| CycloneDX | OWASP | Security-focus: vulnerability references, pedigree, composition |

**Generating an SBOM:**

```bash
# npm + CycloneDX
npx cyclonedx-npm --output-file bom.json

# Maven + CycloneDX
mvn org.cyclonedx:cyclonedx-maven-plugin:makeBom

# Python + SPDX (via pip-license)
pip install pip-license
pip-license -f spdx --output-file sbom.spdx

# Docker image (Syft)
syft your-image:latest -o cyclonedx-json=sbom.json

# Full filesystem (Syft)
syft dir:. -o cyclonedx-json=sbom.json

# Go modules
go build -sbom=cyclonedx-json=bom.json

# General (Trivy)
trivy image --format cyclonedx --output bom.json alpine:latest
```

**Example CycloneDX (condensed):**

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "metadata": {
    "timestamp": "2025-06-01T12:00:00Z",
    "component": {
      "name": "my-app",
      "version": "1.0.0",
      "type": "application"
    }
  },
  "components": [
    {
      "type": "library",
      "name": "express",
      "version": "4.18.2",
      "purl": "pkg:npm/express@4.18.2",
      "licenses": [{"license": {"id": "MIT"}}],
      "externalReferences": [
        {"type": "vcs", "url": "https://github.com/expressjs/express"}
      ]
    }
  ],
  "dependencies": [
    {"ref": "pkg:npm/my-app@1.0.0", "dependsOn": ["pkg:npm/express@4.18.2"]}
  ],
  "vulnerabilities": [
    {
      "id": "CVE-2023-XYZ",
      "source": {"name": "NVD", "url": "https://nvd.nist.gov/vuln/detail/CVE-2023-XYZ"},
      "ratings": [{"severity": "high", "score": 7.5, "method": "CVSSv31"}]
    }
  ]
}
```

**SBOM CI pipeline:**

```yaml
name: Generate SBOM
on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  sbom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx cyclonedx-npm --output-file bom.json
      - uses: actions/upload-artifact@v4
        with:
          name: sbom
          path: bom.json
      - name: Attach SBOM to release
        if: github.event_name == 'release'
        uses: softprops/action-gh-release@v2
        with:
          files: bom.json
```

### 2.5 Dependency Review in CI

Dependency review checks every PR for:
1. New dependency additions
2. Known vulnerabilities in added/changed dependencies
3. License conflicts
4. Detected typosquatting or dependency confusion

**GitHub Dependency Review Action:**

```yaml
name: 'Dependency Review'
on:
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  dep-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Dependency Review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: 'high'
          fail-on-scopes: 'runtime'
          vulnerability-check: true
          license-check: true
          allow-licenses: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, Unlicense, 0BSD
          deny-licenses: GPL-3.0, AGPL-3.0, BUSL-1.1, SSPL-1.0
          comment-summary-in-pr: true
          retry-on-snapshot-warnings: true
```

### 2.6 SLSA Framework (Supply-chain Levels for Software Artifacts)

SLSA (pronounced "salsa") is a security framework from Google and the OpenSSF that
defines a ladder of supply-chain integrity levels.

**SLSA Levels:**

| Level | Description | Requirements |
|-------|-------------|-------------|
| SLSA 0 | No guarantees | Default — no build integrity |
| SLSA 1 | Build provenance | Build provenance documents who, what, when, how |
| SLSA 2 | Hosted build + provenance | Build platform has tamper resistance |
| SLSA 3 | Hardened build | Build platform enforces isolation; no user-defined steps |
| SLSA 4 | Hermetic + reproducible | Fully hermetic build; dependencies fully declared |

**Key SLSA concepts:**

```
Provenance = { builder, buildInstructions, sourceCode, dependencies, buildConfig }
```

**Provenance generation example (SLSA 2+ with GitHub Actions):**

```yaml
name: Build with SLSA provenance
on:
  release:
    types: [published]

jobs:
  build:
    outputs:
      provenance: ${{ steps.provenance.outputs.provenance }}
    steps:
      - uses: actions/checkout@v4
      - run: make build
      - uses: slsa-framework/slsa-github-generator/.github/actions/generate-provenance@v2
        id: provenance
        with:
          artifact-path: dist/my-app.tar.gz

  provenance:
    needs: [build]
    uses: slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2
    with:
      base64-subjects: "${{ needs.build.outputs.provenance }}"
      upload-assets: true
```

**Attestations (in-toto):**

```bash
# Create an attestation for a compiled binary
cosign attest --predicate my-app.intoto.jsonl --key cosign.key my-app.tar.gz

# Verify attestation
cosign verify-attestation --key cosign.pub my-app.tar.gz
```

### 2.7 Sigstore / cosign for Artifact Signing

Sigstore simplifies code signing and verification by eliminating key management
— it uses ephemeral keys backed by an OIDC identity and a transparency log
(Rekor).

**Sign a container image:**

```bash
# Sign with identity (no key management!)
cosign sign --identity-token=$TOKEN ghcr.io/myorg/my-app:v1.0.0

# Verify
cosign verify ghcr.io/myorg/my-app:v1.0.0 \
  --certificate-identity-regexp '.*@myorg\.com' \
  --certificate-oidc-issuer https://github.com/login/oauth
```

**Sign a blob / release artifact:**

```bash
# Sign
cosign sign-blob --bundle signing-bundle.json my-artifact.tar.gz

# Verify
cosign verify-blob --bundle signing-bundle.json my-artifact.tar.gz
```

**Keyless signing via GitHub Actions:**

```yaml
- uses: sigstore/gh-action-sigstore-python@v3.0.0
  with:
    inputs: dist/*.whl
    release-signing-artifacts: true
```

**Sigstore architecture:**

```
Developer                     Fulcio (CA)                 Rekor (Transparency Log)
    │                            │                              │
    ├── OIDC token ────────────► │                              │
    │ (GitHub/Google/MS)        │                              │
    │                            │                              │
    │◄── short-lived cert ──────┤                              │
    │                            │                              │
    ├── sign + cert ────────────┼────────────►                 │
    │ (cosign)                  │          Record signature     │
    │                            │            + identity         │
    ▼                            ▼                              ▼
 Published artifact        All verifiers can                   Tamper-proof
 signed with               check identity                      audit trail
 ephemeral key             from cert + log
```

### 2.8 Private Package Proxies / Registries

**Why use a proxy?**
1. Cache packages locally (speed + availability)
2. Control which packages are available (block known-malicious ones)
3. Audit all dependency requests
4. Isolate from upstream compromise

**Options:**

| Tool | Language/Framework | Key Features |
|------|-------------------|-------------|
| Verdaccio | npm (others via plugins) | Lightweight, npm-compatible, Docker, configurable |
| ProGet | Universal (npm, NuGet, Maven, PyPI, Docker) | Commercial with free tier; vulnerability scanning |
| Artifactory | Universal | Enterprise; deep integration; Xray scanning |
| GitHub Packages | npm, Maven, NuGet, RubyGems | Tight GitHub integration; upstream sources |
| Azure Artifacts | Universal | Azure DevOps integration; upstream sources |
| devpi | PyPI only | Simple PyPI proxy; good for Python monorepos |
| Cargo proxy | Crates.io mirror | `cargo config` for mirror replacement |
| Go proxy | Go proxy | `GOPROXY` for controlled module retrieval |

**Configuring a proxy:**

```ini
# .npmrc — org packages from private, rest from proxy
@myorg:registry=https://npm.pkg.github.com
registry=https://verdaccio.internal:4873
```

```yaml
# Cargo config — use local mirror
[source.crates-io]
replace-with = "local-mirror"

[source.local-mirror]
registry = "http://localhost:8080/git"
```

```
# Go proxy configuration
GOPROXY=https://proxy.internal.corp,https://proxy.golang.org,direct
GONOSUMCHECK=*.internal.corp
```

**Verdaccio minimal config:**

```yaml
# config.yaml
storage: ./storage
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  '@myorg/*':
    access: $authenticated
    publish: $authenticated
  '**':
    access: $all
    proxy: npmjs
    # Block known malicious packages
    filters:
      - "event-stream$"
      - "colors$"
      - "faker$"
logs:
  - {type: stdout, format: pretty, level: http}
```

### 2.9 Minimal Dependency Philosophy

**Principle:** Every dependency is a risk surface. Minimize them.

**Strategies:**

1. **Audit existing deps** — remove unused dependencies (tools like `depcheck`,
   `pnpm ls --depth=10`, `cargo udeps`, `go mod tidy`)
2. **Choose smaller alternatives** — `micromatch` vs `minimatch` vs `lodash.match`
3. **Prefer standard library** — Node 20+ has `fetch`, `test runner`, `crypto`
   — avoid `node-fetch`, `mocha`, `bcrypt` (use native `crypto`)
4. **Vendor critical small dependencies** — copy small utilities (licensed compatibly)
5. **Use code splitting / tree shaking** — Webpack/Rollup eliminate unused code
6. **Module/nomodule pattern** for web — avoid polyfills for modern browsers

**Dependency budget example:**

```json
{
  "name": "my-app",
  "dependencies": {
    "express": "^4.18.0"  // necessary — web framework
  },
  "devDependencies": {
    "typescript": "^5.3.0",  // necessary — type system
    "vitest": "^1.0.0"       // necessary — testing
  }
  // NOT included:
  // lodash, moment, axios, chalk, request, left-pad, is-odd, is-even
}
```

**The `lodash` trap:** In 2024, many projects still import `lodash` for `_.map`,
`_.filter`, `_.find` — all available natively in ES6+. Each unnecessary dependency
is a vector for the next `event-stream`.

**Static binaries / Go approach:** Go compiles all dependencies into a single static
binary. No runtime dependency resolution = no dependency confusion at deploy time.

---

## Part 3: Vulnerability Management

### 3.1 CVE Process

The CVE lifecycle from discovery to advisory:

```
Discovery → Reporting → Triage → Private Patch → Embargoed Disclosure → Public Advisory
```

| Phase | Duration | Participants |
|-------|----------|-------------|
| Discovery | Variable | Researcher, internal team, automated scanner |
| Reporting | 1–7 days | Reporter → maintainer (via SECURITY.md channel) |
| Triage | 1–14 days | Maintainers evaluate severity, impact, scope |
| Private patch | 1–90 days | Maintainers + trusted contributors |
| Embargoed disclosure | 7–45 days | CNAs, downstream vendors, trusted distributors |
| Public advisory | Day 0+ | Global community |

**The disclosure dilemma timeline:**

```
    t=0 (discovery)        t=N (embargo lift)       t=N+ε
         │                       │                    │
         ▼                       ▼                    ▼
  Attacker (0-day)        Public disclosure     Patches rolling out
  Researcher (reports)    Patch released        Exploitation peaks
  Maintainer (triages)    CVE published         Monitoring begins
```

### 3.2 Coordinated Vulnerability Disclosure (CVD)

**Frameworks:**
- **ISO 29147** — International standard for vulnerability disclosure
- **CERT/CC CVD Guide** — Carnegie Mellon's best-practice guidelines
- **Google's Project Zero** — 90-day disclosure deadline policy
- **GitHub Security Advisories** — Private vulnerability reporting + CVE allocation

**Disclosure models:**

| Model | Description | Pros | Cons |
|-------|-------------|------|------|
| Full disclosure | Immediately public | Fastest patching, user awareness | Zero-day window, panic fixes |
| Responsible disclosure | Notify maintainer first, give time to patch | Standard practice, controlled rollout | Requires maintainer responsiveness |
| Coordinated disclosure | Embargo with multiple stakeholders | Broader protection, coordinated release | Complex logistics |
| No disclosure (silent fix) | Patch quietly without announcing | Avoids exploit rush | Users don't know to update |

**GitHub Private Vulnerability Reporting (PVR):**

```yaml
# .github/SECURITY.md
# Tell users how to report vulnerabilities

# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.x     | ✅ Active development |
| 1.x     | ⚠️ Security fixes only |
| < 1.0   | ❌ No longer supported |

## Reporting a Vulnerability

Please report security issues via **GitHub Security Advisory**
("Report a Vulnerability" button at the top of this repo).

**Do NOT** open public issues for security vulnerabilities.

### What to include:
- Affected version(s)
- Steps to reproduce
- Proof of concept (if possible)
- Impact assessment

### Response SLA:
- Initial response: within 48 hours
- Triage: within 5 business days
- Patch target: 30–90 days depending on severity

### PGP key (optional)
```
-----BEGIN PGP PUBLIC KEY BLOCK-----
... (maintainer's PGP key for encrypted reports)
-----END PGP PUBLIC KEY BLOCK-----
```

### 3.3 Security Advisories

**Sources:**

| Database | Maintainer | Scope | API |
|----------|-----------|-------|-----|
| GitHub Advisory Database | GitHub | All ecosystems | GraphQL, REST |
| NVD (National Vulnerability Database) | NIST (US Govt) | All CVEs | REST, RSS |
| OSV.dev | Google | Open source only | REST (query by package) |
| RUSTSEC | RustSec WG | Rust/crates.io | REST |
| PyPA Advisories | Python PSA | PyPI | GitHub repo |
| Alpine SecDB | Alpine Linux | Alpine packages | Git repo |
| OpenSUSE | SUSE | RPM-based | OVAL |
| Ubuntu CVE Tracker | Canonical | Ubuntu/deb | Git repo |

**OSV.dev query (recommended — cross-ecosystem):**

```bash
# Get vulnerability details
curl -s https://api.osv.dev/v1/vulns/GHSA-35jh-r3h4-6jhm | jq .

# Query by package version
curl -s -X POST https://api.osv.dev/v1/query \
  -H "Content-Type: application/json" \
  -d '{"package": {"name": "lodash", "ecosystem": "npm"}, "version": "4.17.20"}' | jq .

# Batch query
curl -s -X POST https://api.osv.dev/v1/querybatch \
  -H "Content-Type: application/json" \
  -d '{
    "queries": [
      {"package": {"name": "lodash", "ecosystem": "npm"}, "version": "4.17.20"},
      {"package": {"name": "requests", "ecosystem": "PyPI"}, "version": "2.28.0"}
    ]
  }'
```

**GitHub Advisory Database (via GraphQL):**

```graphql
query {
  securityAdvisory(ghsaId: "GHSA-35jh-r3h4-6jhm") {
    summary
    description
    severity
    cvss {
      score
      vectorString
    }
    identifiers { type value }
    references { url }
    publishedAt
    updatedAt
    vulnerabilities(first: 5) {
      nodes {
        package { name ecosystem }
        vulnerableVersionRange
        firstPatchedVersion { identifier }
      }
    }
  }
}
```

### 3.4 Severity Scoring

**CVSS 4.0 Deep Dive**

CVSS (Common Vulnerability Scoring System) is the de facto standard for severity.
Version 4.0 introduced significant changes from v3.1.

**CVSS 4.0 base metric groups:**

```
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

**Attack Vector (AV):**
- `N` — Network (remotely exploitable)
- `A` — Adjacent Network (same broadcast domain)
- `L` — Local (requires local access)
- `P` — Physical (requires physical interaction)

**Attack Complexity (AC):**
- `L` — Low (no special conditions)
- `H` — High (requires preparation, timing, or specific state)

**Attack Requirements (AT) — NEW in 4.0:**
- `N` — None (no special deployment/config needed)
- `P` — Present (requires specific deployment configuration)

**Privileges Required (PR):**
- `N` — None
- `L` — Low (basic user permissions)
- `H` — High (admin/root)

**User Interaction (UI):**
- `N` — None
- `P` — Passive (user merely views content; click not required) — NEW in 4.0
- `A` — Active (user must perform an action)

**Confidentiality / Integrity / Availability Impact (VC, VI, VA):**
- `H` — High
- `L` — Low
- `N` — None

**Subsequent System Impacts (SC, SI, SA) — NEW in 4.0:**
- Scope impact moved from environmental to base metrics
- Measures impact on systems BEYOND the vulnerable component

**Severity buckets:**

| Score Range | Severity | Color |
|-------------|----------|-------|
| 9.0–10.0 | Critical | 🔴 Red |
| 7.0–8.9 | High | 🟠 Orange |
| 4.0–6.9 | Medium | 🟡 Yellow |
| 0.1–3.9 | Low | 🟢 Green |
| 0.0 | None | ⚪ None |

**EPSS (Exploit Prediction Scoring System)**

EPSS predicts the likelihood that a vulnerability will be exploited in the wild.
Ranges from 0 (near 0%) to 1 (~100%).

```
EPSS is NOT a severity score — it's a PROBABILITY score.

| EPSS Score | Meaning | Recommended action |
|------------|---------|-------------------|
| 0.0001–0.01  | Unlikely exploited (0.01%–1%)  | Patch within normal cycle |
| 0.01–0.1     | Moderate exploit probability   | Patch within 30 days |
| 0.1–0.5      | High exploit probability       | Patch within 7 days |
| 0.5–1.0      | Almost certainly exploited     | Patch IMMEDIATELY |
```

```bash
# Query EPSS for a CVE
curl -s https://api.first.org/data/v1/epss?cve=CVE-2024-3094 | jq .
```

**CVSS + EPSS combined decision matrix:**

```
                  EPSS < 0.01    EPSS 0.01–0.1    EPSS 0.1–0.5    EPSS > 0.5
CVSS Critical    │ Patch: 7d     │ Patch: 24h     │ Patch: 4h      │ Patch: NOW
CVSS High        │ Patch: 30d    │ Patch: 14d     │ Patch: 7d      │ Patch: 24h
CVSS Medium      │ Patch: 90d    │ Patch: 30d     │ Patch: 14d     │ Patch: 7d
CVSS Low         │ Next release  │ Patch: 90d     │ Patch: 30d     │ Patch: 14d
```

### 3.5 Security Policies

**SECURITY.md template:**

```markdown
# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

This project uses **GitHub Private Vulnerability Reporting**.
Please report vulnerabilities via the "Report a Vulnerability" button
on the repository's "Security" tab.

If you cannot use GitHub PVR, email **security@example.com** with:

- Subject: `[SECURITY] <project-name> Vulnerability Report`
- Body: Description, affected versions, impact, proof of concept

### Response Timeline

- **Acknowledgment:** within 24 hours
- **Triage:** within 5 business days
- **Fix target:** Critical/High → 14 days, Medium → 30 days, Low → next release

### GPG Key

For encrypted communication:
```
Fingerprint: AAAA BBBB CCCC DDDD EEEE  FFFF 0000 1111 2222 3333
```

## Coordinated Disclosure

We follow **coordinated disclosure**. We ask reporters to:
1. Allow us 90 days to develop and release a fix
2. Not disclose the issue publicly before the fix is available
3. Work with us on the advisory

## Recognition

We maintain a Security Hall of Fame. Reporters who follow coordinated
disclosure will be credited in the advisory (unless they prefer anonymity).
```

**Private reporting channels checklist:**

- [ ] GitHub Private Vulnerability Reporting enabled (repo → Settings → Security)
- [ ] SECURITY.md file present at repository root
- [ ] Security email configured (if not using GitHub PVR)
- [ ] GPG key published for encrypted communication
- [ ] Response SLA defined
- [ ] Supported versions policy stated
- [ ] Recognition/credit policy stated
- [ ] Embargo coordination process documented

### 3.6 Patch Management

**Backporting policies:**

```yaml
# Backport policy decision matrix

Current Branch:
  - All security fixes → merge to main
  - All non-security fixes → merge to main

Support Policy:
  - Latest major: all security + critical bugfixes
  - Previous major: security fixes only
  - N-2 and older: no backports unless sponsored

Backport Process:
  1. Cherry-pick commit(s) from main to release/$VERSION branch
  2. Resolve conflicts if any
  3. Run full test suite on the release branch
  4. Tag new patch release
  5. Generate advisory/cve
  6. Publish
```

**Patch regression testing:**

```yaml
name: Patch Regression Test
on:
  push:
    branches: [release/*]

jobs:
  regression:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test
      - name: Fuzz test
        run: npm run fuzz
      - name: Integration test
        run: npm run test:integration
```

**Security-only release workflow:**

```
main ── feat A ── feat B ── fix C ── security fix D ── feat E
                                    │
                                    ▼
release/1.x ── security fix D (cherry-pick) ── v1.9.1 tag ── publish
```

---

## Part 4: Secure Coding Practices

### 4.1 OWASP Top 10 — Per Ecosystem

**OWASP Top 10 for Web Applications (2021):**

| Rank | Category | Description |
|------|----------|-------------|
| A01 | Broken Access Control | Users can access resources they shouldn't |
| A02 | Cryptographic Failures | Weak or absent encryption |
| A03 | Injection | SQL, NoSQL, OS, LDAP injection |
| A04 | Insecure Design | Missing threat modeling |
| A05 | Security Misconfiguration | Default creds, verbose errors |
| A06 | Vulnerable Components | Known-vulnerable dependencies |
| A07 | AuthN & AuthM Failures | Weak login, session management |
| A08 | Software Integrity Failures | Unsigned updates, malicious deps |
| A09 | Logging & Monitoring Failures | No detection of attacks |
| A10 | SSRF | Server-side request forgery |

**OWASP Top 10 for API Security (2023):**

| Rank | Category |
|------|----------|
| API1 | Broken Object Level Authorization |
| API2 | Broken Authentication |
| API3 | Broken Object Property Level Authorization |
| API4 | Unrestricted Resource Consumption |
| API5 | Broken Function Level Authorization |
| API6 | Unrestricted Access to Sensitive Business Flows |
| API7 | Server Side Request Forgery |
| API8 | Security Misconfiguration |
| API9 | Improper Inventory Management |
| API10 | Unsafe Consumption of APIs |

**OWASP Top 10 for ML Security (draft):**

| Rank | Category | Description |
|------|----------|-------------|
| ML01 | Input Manipulation (Adversarial Attacks) | Crafted inputs cause misclassification |
| ML02 | Data Poisoning | Training data contamination |
| ML03 | Model Inversion | Extract training data from model |
| ML04 | Model Stealing | Replicate model via API queries |
| ML05 | Supply Chain Attacks on ML | Compromised model weights/datasets |
| ML06 | Backdoor ML | Hidden triggers in model behavior |
| ML07 | Membership Inference | Determine if a record was in training set |
| ML08 | Unsafe Model Serialization | Pickle/RCE via model files |
| ML09 | Output Integrity | Model hallucination, prompt injection |
| ML10 | Denial of Service | Expensive model queries |

**OWASP Mobile Top 10 (2024):**

| Rank | Category |
|------|----------|
| M01 | Improper Credential Usage |
| M02 | Inadequate Supply Chain Security |
| M03 | Insecure Authentication/Authorization |
| M04 | Insufficient Input/Output Validation |
| M05 | Insecure Communication |
| M06 | Inadequate Privacy Controls |
| M07 | Insufficient Binary Protections |
| M08 | Security Misconfiguration |
| M09 | Insecure Data Storage |
| M10 | Insufficient Cryptography |

### 4.2 Input Validation Patterns

**SQL Injection Prevention:**

```python
# BAD — string interpolation
query = f"SELECT * FROM users WHERE email = '{email}'"

# GOOD — parameterized query
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# GOOD — ORM
User.objects.get(email=email)
```

```javascript
// BAD — string concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// GOOD — parameterized
db.query('SELECT * FROM users WHERE email = $1', [email]);

// GOOD — ORM
User.findOne({ where: { email } });
```

```java
// BAD
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE email = '" + email + "'");

// GOOD
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");
pstmt.setString(1, email);
ResultSet rs = pstmt.executeQuery();
```

```go
// BAD
query := fmt.Sprintf("SELECT * FROM users WHERE email = '%s'", email)

// GOOD
rows, err := db.Query("SELECT * FROM users WHERE email = ?", email)
```

**Command Injection Prevention:**

```python
import subprocess
import shlex

# BAD
subprocess.run(f"ping -c 1 {user_input}", shell=True)

# BETTER — no shell, use list
subprocess.run(["ping", "-c", "1", user_input])
# Still dangerous if user_input contains flags

# BEST — validate input
import re
if not re.match(r'^[\w\.\-]+$', user_input):
    raise ValueError("Invalid hostname")
subprocess.run(["ping", "-c", "1", user_input])
```

```javascript
// BAD
const { exec } = require('child_process');
exec(`ping -c 1 ${userInput}`);

// BETTER
const { spawn } = require('child_process');
spawn('ping', ['-c', '1', userInput]);

// BEST — validate and escape
const safeInput = userInput.replace(/[^a-zA-Z0-9.\-_]/g, '');
spawn('ping', ['-c', '1', safeInput]);
```

**Path Traversal Prevention:**

```python
import os
from pathlib import Path

BASE_DIR = Path("/app/data")

# BAD
full_path = BASE_DIR / user_input

# GOOD — resolve and verify
full_path = (BASE_DIR / user_input).resolve()
if not str(full_path).startswith(str(BASE_DIR)):
    raise ValueError("Path traversal detected")

# GOOD — simple allowlist
ALLOWED_FILES = {"report1", "report2", "report3"}
if user_input not in ALLOWED_FILES:
    raise ValueError("File not allowed")
```

```javascript
// BAD
const fs = require('fs');
const data = fs.readFileSync(`/app/data/${userInput}`);

// GOOD
const path = require('path');
const resolved = path.resolve('/app/data', userInput);
if (!resolved.startsWith(path.resolve('/app/data'))) {
    throw new Error('Path traversal');
}
```

**Cross-Site Scripting (XSS) Prevention:**

```javascript
// BAD — innerHTML injection
element.innerHTML = userInput;

// GOOD — textContent
element.textContent = userInput;

// GOOD — sanitize then insert
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// React handles this automatically:
// BAD
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD
<div>{userInput}</div>
```

```html
<!-- BAD template rendering -->
<div>{{ user_input }}</div>
<!-- Django/Jinja2 auto-escapes — BUT only for HTML context -->

<!-- BAD — must know the context -->
<script>var x = "{{ user_input }}";</script>
<!-- A user input of "; alert(1);//" breaks out -->

<!-- GOOD — proper context escaping -->
<script>var x = {{ user_input|json }};</script>
```

**HTTP Response Headers (XSS mitigation):**

```nginx
# Content Security Policy — prevents most XSS
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;";
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "0";  # Deprecated but harmless
```

**CSRF Prevention:**

```python
# Django — middleware handles it automatically
# Ensure CSRF token is in all forms
<form method="post">
    {% csrf_token %}
    ...
</form>

# DRF — use TokenAuthentication + CSRF exempt for APIs
```

```javascript
// SameSite cookies (modern browsers)
document.cookie = "session=abc123; SameSite=Strict; Secure";

// CSRF token in header
fetch('/api/transfer', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({amount: 100})
});
```

### 4.3 Authentication & Authorization

**OAuth 2.0 Security:**

```
Authorization Code Flow (BEST for web apps):
  Browser → App: Click "Login with Provider"
  App → Provider: Redirect with client_id + redirect_uri + state
  Provider → Browser: Login page, consent
  Provider → Browser: Redirect back with auth code
  Browser → App: GET /callback?code=...&state=...
  App → Provider: POST /token (code + client_secret)
  Provider → App: access_token + refresh_token + id_token
  App → Browser: Set session cookie

PKCE (Proof Key for Code Exchange):
  Instead of client_secret, app generates code_verifier + code_challenge
  code_challenge = SHA256(code_verifier)
  Sent in auth request, verified at token endpoint
  MANDATORY for mobile apps and SPAs
```

**JWT Security Do's and Don'ts:**

```javascript
// BAD — no signature verification
const decoded = jwt.decode(token);  // Anyone can forge this

// GOOD — verify signature
const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'https://auth.example.com',
    audience: 'my-app'
});

// BETTER — use asymmetric keys
const decoded = jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com'
});

// BAD — storing sensitive data in JWT
// JWTs are signed, NOT encrypted — anyone can read the payload!

// BAD — no expiry
const token = jwt.sign({ userId: 123 }, secret);
// GOOD — short expiry + refresh
const token = jwt.sign({ userId: 123 }, secret, { expiresIn: '15m' });

// BAD — accepting "none" algorithm
const decoded = jwt.verify(token, null, { algorithms: ['HS256', 'none'] });
// Attack: set alg to "none", skip signature entirely

// BAD — key confusion
const decoded = jwt.verify(token, PUBLIC_KEY_AS_STRING);  // If public key string is used as HMAC secret...
// Attack: change alg from RS256 to HS256, sign with public key
```

**Session Management:**

```javascript
// BAD session cookie
res.cookie('session', sessionId);
// Predictable, no security flags, no expiry

// GOOD session cookie
res.cookie('session', sessionId, {
    httpOnly: true,         // Not accessible via JS (prevents XSS cookie theft)
    secure: true,           // HTTPS only
    sameSite: 'strict',     // Prevents CSRF
    maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    path: '/'
});

// Session regeneration (post-login)
req.session.regenerate((err) => {
    // New session ID issued — prevents session fixation
});

// Session destruction (logout)
req.session.destroy((err) => {
    res.clearCookie('session');
});
```

**API Key Management:**

```yaml
API Key Security Rules:
  ✅ Use API keys as Bearer tokens in Authorization header
  ✅ Generate keys with cryptographically random bytes (crypto.randomBytes)
  ✅ Prefix keys to identify type: sk_live_, pk_test_, hmac_key_
  ✅ Hash keys before storing (bcrypt, argon2)
  ✅ Show key only ONCE at creation
  ✅ Support key rotation (multiple valid keys per user)
  ✅ Expire unused keys after 90 days
  ❌ Never log API keys
  ❌ Never embed keys in client-side code
  ❌ Never store keys in git
  ❌ Never send keys in URL query parameters
```

```javascript
// Generating API keys
const crypto = require('crypto');
const randomBytes = crypto.randomBytes(32);
const apiKey = `sk_live_${randomBytes.toString('base64url')}`;

// Storing (hash)
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(apiKey, 12);

// Verifying
const isValid = await bcrypt.compare(providedKey, storedHash);
```

### 4.4 Secrets Management

**Never in code:**

```bash
# BAD — hardcoded credentials
DB_PASSWORD = "supersecret123"

# BAD — credentials in config files committed to git
config/
├── config.prod.json  ← commits prod DB password
├── config.dev.json

# BAD — .env files committed
.env  ← never commit this!

# BAD — credentials in environment documentation
README.md: "Set DB_PASSWORD to hunter2"

# GOOD — use environment variables + vault
DB_PASSWORD="${DB_PASSWORD}"
```

**Vault solutions:**

| Solution | Type | Key Features |
|----------|------|-------------|
| HashiCorp Vault | Enterprise-grade | Dynamic secrets, transit engine, K/V, PKI |
| AWS Secrets Manager | Cloud-managed | Automatic rotation, IAM integration |
| GCP Secret Manager | Cloud-managed | IAM, replication, versioning |
| Azure Key Vault | Cloud-managed | HSM-backed, cert management |
| 1Password CLI + Connect | Developer-friendly | Secrets automation, Operator for K8s |
| Doppler | SaaS | Environment parity, CLI, SDK |
| SOPS (Mozilla) | File encryption | Encrypt YAML/JSON, works with git |
| Age | Simple file encryption | Replace for GPG, use with sops |
| Git-crypt | Git integration | Transparent encryption of specific files |

**Environment variable best practices:**

```bash
# .env.example — committed to git (safe)
# Copy to .env and fill in real values — NEVER commit .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=myapp
DB_PASSWORD=
API_KEY=
SECRET_KEY=

# .gitignore
.env
*.key
secrets/
```

```yaml
# Kubernetes — secrets from vault, not git
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:latest
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
```

**Secret scanning:**

| Tool | Integration | Notes |
|------|-------------|-------|
| Gitleaks | CLI, pre-commit, CI | Fast, custom rules |
| Trufflehog | CLI, CI | Deep scanning, entropy detection |
| GitGuardian | SaaS | Public repo monitoring, API scanning |
| GitHub secret scanning | Built-in | Push-level, partner pattern alerts |
| GitLab secret detection | Built-in | CI pipeline step |
| pre-commit hooks | Local | git-secrets, detect-secrets, trufflehog |

**pre-commit secret scanning:**

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.2
    hooks:
      - id: gitleaks
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: detect-private-key
```

**CI secret scan:**

```yaml
name: Secret Scan
on: [push, pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 4.5 Cryptography

**Don't roll your own — EVER.**

```python
# BAD — custom "encryption"
def encrypt(text):
    result = ""
    for i, c in enumerate(text):
        result += chr(ord(c) ^ 0x42 + i)
    return result

# BAD — MD5 for passwords
import hashlib
hash = hashlib.md5(password.encode()).hexdigest()

# BAD — ECB mode
from Crypto.Cipher import AES
cipher = AES.new(key, AES.MODE_ECB)

# BAD — constant-time comparison not used
if user_token == provided_token:  # Timing attack!

# BAD — weak random
import random
token = random.randint(0, 999999)

# BAD — rolling own JWT
import base64, json, hmac
header = base64.urlsafe_b64encode(json.dumps({"alg":"HS256"}))
payload = base64.urlsafe_b64encode(json.dumps({"user":"admin"}))
sig = hmac.new(secret, f"{header}.{payload}", "sha256").digest()
token = f"{header}.{payload}.{base64.urlsafe_b64encode(sig)}"
```

```python
# GOOD — use well-known libraries correctly
from cryptography.fernet import Fernet
key = Fernet.generate_key()
cipher = Fernet(key)
encrypted = cipher.encrypt(b"secret data")

# GOOD — password hashing
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
assert bcrypt.checkpw(password.encode(), hashed)

# GOOD — modern password hashing (recommended)
from argon2 import PasswordHasher
ph = PasswordHasher()
hash = ph.hash(password)
assert ph.verify(hash, password)

# GOOD — secure random
import secrets
token = secrets.token_hex(32)

# GOOD — authenticated encryption (AES-GCM)
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
aesgcm = AESGCM(key)
nonce = secrets.token_bytes(12)
ct = aesgcm.encrypt(nonce, data, associated_data)
```

**Safe defaults:**

```yaml
Cryptographic Safe Defaults:

Hashing (passwords):      Argon2id > bcrypt > scrypt > PBKDF2 > SHA256 (NO)
Symmetric encryption:     AES-256-GCM > ChaCha20-Poly1305 > AES-256-CBC
Asymmetric encryption:    ECDH/X25519 > RSA-4096-OAEP
Digital signatures:       Ed25519 > ECDSA/P-256 > RSA-4096-PSS
Hash functions:           SHA-256/384 > SHA-3 > BLAKE2b > SHA-1 (NO) > MD5 (NO)
Key derivation:           HKDF > PBKDF2 > direct hashing
Random number generation: CSPRNG (secrets, /dev/urandom) > PRNG (NO)

Key lengths:
  Symmetric (AES):        256 bits (128 minimum)
  RSA:                    4096 bits (2048 minimum, 3072 recommended)
  ECC (P系列):              P-256 (P-384 recommended)
  Curve25519 / Ed25519:   256 bits
  DSA:                    AVOID — broken for signing
```

**Key management principles:**
1. Separate keys by purpose (signing ≠ encryption ≠ authentication)
2. Rotate keys regularly (90 days for HMAC, 1 year for asymmetric)
3. Use a key management system (KMS) — never store keys in files
4. Enable key revocation
5. Audit key usage
6. Back up keys securely (threshold schemes, HSM)

### 4.6 Memory Safety

**Memory safety by language:**

| Language | Memory Safe? | Unsafe escape hatches |
|----------|-------------|----------------------|
| Rust | ✅ Yes | `unsafe` blocks, `extern "C"` |
| Go | ✅ Yes | `unsafe` package, `cgo` |
| Java | ✅ Yes | JNI, `Unsafe` class |
| C# | ✅ Yes | `unsafe` keyword, P/Invoke |
| Python | ✅ Yes | C extensions (numpy, etc.) |
| JavaScript | ✅ Yes | Native addons (N-API) |
| TypeScript | ✅ Yes | Same as JS |
| C | ❌ No | Everything |
| C++ | ❌ No | Everything, plus templates |
| Swift | ✅ Yes | `withUnsafePointer` |
| Kotlin | ✅ Yes | JNI, `Unsafe` |

**Rust `unsafe` guidelines:**

```rust
// SAFETY: Caller must ensure ptr is valid, aligned, and non-null
// SAFETY: Caller must ensure exclusive access
unsafe {
    let val = *ptr;
}

// Better: encapsulate unsafe in small, audited functions
/// Read a u32 from raw memory, little-endian, at the given offset.
/// # Safety
/// - `buf` must point to at least `offset + 4` valid bytes
/// - `buf` must be properly aligned for u32 access
pub unsafe fn read_u32_le(buf: *const u8, offset: usize) -> u32 {
    let ptr = buf.add(offset) as *const u32;
    u32::from_le(ptr.read_unaligned())
}
```

**Memory sanitizers:**

```bash
# AddressSanitizer (ASan) — C/C++/Rust
CFLAGS="-fsanitize=address -g" CXXFLAGS="-fsanitize=address -g"
./configure --enable-asan
make
ASAN_OPTIONS=detect_leaks=1 ./my-program

# MemorySanitizer (MSan) — detects uninitialized reads
CFLAGS="-fsanitize=memory -fsanitize-memory-track-origins -g"

# UndefinedBehaviorSanitizer (UBSan)
CFLAGS="-fsanitize=undefined -fsanitize=float-cast-overflow -g"

# LeakSanitizer (LSan)
ASAN_OPTIONS=detect_leaks=1

# Valgrind — heavyweight but thorough
valgrind --leak-check=full --show-leak-kinds=all ./my-program

# Rust — built-in sanitizers (nightly)
RUSTFLAGS="-Z sanitizer=address" cargo test
RUSTFLAGS="-Z sanitizer=leak" cargo test
RUSTFLAGS="-Z sanitizer=memory" cargo test
```

**Common memory safety bugs:**

| Bug | Description | Language | Detection |
|-----|-------------|----------|-----------|
| Buffer overflow | Writing past array bounds | C/C++ | ASan, Valgrind |
| Use-after-free | Using pointer after freeing | C/C++ | ASan, Valgrind |
| Double free | Freeing memory twice | C/C++ | ASan |
| Null pointer dereference | Dereferencing NULL | C/C++ | UBSan |
| Uninitialized read | Reading uninitialized memory | C/C++ | MSan |
| Stack buffer overflow | Writing past local variables | C/C++ | ASan |
| Integer overflow | Arithmetic overflow | C/C++ | UBSan, `-ftrapv` |
| Race condition | Data race on shared memory | C/C++/Rust | TSan, Loom (Rust) |

---

## Part 5: CI/CD Security

### 5.1 Securing CI Pipelines

**No secrets in logs:**

```yaml
# BAD — secret in command
- run: echo ${{ secrets.DB_PASSWORD }}

# BAD — secret exposed in output
- run: |
    docker login -u "${{ secrets.DOCKER_USER }}" -p "${{ secrets.DOCKER_PASS }}"

# GOOD — use environment injection (GitHub masks secrets)
- run: docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"
  env:
    DOCKER_USER: ${{ secrets.DOCKER_USER }}
    DOCKER_PASS: ${{ secrets.DOCKER_PASS }}

# GitHub automatically masks secrets — but only if passed via env
# Secrets in command lines are masked, but accidental echo is still possible
# Use env injection to be safe
```

**OIDC instead of static tokens:**

```yaml
# BAD — long-lived static credentials
# Store AWS/GCP/Azure keys as GitHub secrets
# Rotate keys manually → risk of leaked keys

# GOOD — OIDC-based authentication
# GitHub Actions → AWS IAM via OIDC (no stored keys!)
name: Deploy to AWS
on:
  push:
    branches: [main]

permissions:
  id-token: write   # Needed for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsDeploy
          aws-region: us-east-1
      - run: aws s3 sync ./dist s3://my-bucket/
```

**OIDC configuration across clouds:**

```hcl
# AWS — IAM OIDC identity provider
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

resource "aws_iam_role" "github_actions" {
  name = "GitHubActionsDeploy"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:myorg/my-app:ref:refs/heads/main"
        }
      }
    }]
  })
}

# GCP — workload identity federation
resource "google_iam_workload_identity_pool_provider" "github" {
  workload_identity_pool_id = "github-pool"
  workload_identity_pool_provider_id = "github-provider"
  attribute_mapping = {
    "google.subject" = "assertion.sub"
  }
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}
```

**OIDC for npm/pypi publishing:**

```yaml
# Publish to npm via OIDC — no token stored as secret!
name: Publish
on:
  release:
    types: [published]

permissions:
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm publish --provenance  # npm OIDC provenance!
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          # Note: npm provenance uses OIDC separately from the auth token
```

```yaml
# OIDC-based PyPI publishing (Trusted Publishing)
name: Publish to PyPI
on:
  release:
    types: [published]

permissions:
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install build
      - run: python -m build
      - uses: pypa/gh-action-pypi-publish@release/v1
        # No API token needed — uses OIDC trust relationship
```

### 5.2 Isolated Build Environments

**Hermetic builds:**

```yaml
name: Hermetic Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    container:
      image: alpine:3.19@sha256:abc123...  # Pinned hash
    steps:
      - uses: actions/checkout@v4
      - name: Build (no network)
        run: |
          # Pre-fetched deps in CI cache
          cargo build --release --frozen  # No network allowed
        env:
          CARGO_HOME: /cache/cargo
      - name: Verify no network during build
        run: |
          # Check no new network connections from build process
          # Only localhost traffic allowed
```

**Docker build isolation:**

```dockerfile
# Multi-stage build — minimize attack surface
FROM python:3.12-slim@sha256:abc... AS builder
COPY --from=ghcr.io/astral-sh/uv:latest@sha256:def... /uv /bin/uv
WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

FROM python:3.12-slim@sha256:abc...
COPY --from=builder /app /app
# Runtime image has NO build tools, NO package manager, NO shell
RUN apt-get update && apt-get remove -y --allow-remove-essential bash
USER nobody
CMD ["python", "-m", "myapp"]
```

**Ephemeral CI environments:**
- Each build runs in a fresh VM/container
- No state persists between runs (except cache)
- No cross-job contamination
- Short-lived credentials (OIDC tokens expire per-job)

### 5.3 Artifact Integrity

**Checksums:**

```yaml
# Generate checksums during build
name: Build with Integrity
on:
  release:
    types: [published]

jobs:
  checksum:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: make build
      - name: Generate checksums
        run: |
          cd dist
          sha256sum * > SHA256SUMS
          sha512sum * > SHA512SUMS
          b2sum * > B2SUMS  # BLAKE2
      - name: Sign checksums
        run: |
          gpg --batch --detach-sign --armor SHA256SUMS
      - name: Upload
        uses: softprops/action-gh-release@v2
        with:
          files: |
            dist/*
```

**Cosign signatures (Sigstore):**

```yaml
name: Sign Release
on:
  release:
    types: [published]

permissions:
  id-token: write   # For keyless signing
  contents: write

jobs:
  sign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: make build
      - uses: sigstore/gh-action-sigstore-python@v3.0.0
        with:
          inputs: dist/*.whl dist/*.tar.gz
          release-signing-artifacts: true
      - name: Sign with cosign
        run: |
          cosign sign-blob --bundle dist/signing-bundle.json dist/my-app.tar.gz
        env:
          COSIGN_EXPERIMENTAL: "1"  # Keyless mode
```

**SLSA provenance attestations (in-toto):**

```yaml
name: Generate SLSA Provenance
on:
  release:
    types: [published]

permissions:
  id-token: write
  contents: write
  attestations: write

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      digest: ${{ steps.build.outputs.digest }}
    steps:
      - uses: actions/checkout@v4
      - run: make build
      - id: docker
        run: |
          docker build -t ghcr.io/myorg/my-app:latest .
          docker push ghcr.io/myorg/my-app:latest
          echo "digest=$(docker inspect ghcr.io/myorg/my-app:latest --format '{{.RepoDigests}}')" >> $GITHUB_OUTPUT

  provenance:
    needs: [build]
    permissions:
      actions: read
      id-token: write
      contents: write
    uses: slsa-framework/slsa-github-generator/.github/workflows/generator_container_slsa3.yml@v2
    with:
      image: ghcr.io/myorg/my-app
      digest: "${{ needs.build.outputs.digest }}"
```

### 5.4 Supply-Chain Attacks on CI

**Base image poisoning:**

```
Attack vector:
  docker pull python:3.12-slim
  └─ What if the Docker Hub account is compromised, or a tag is overwritten?
  └─ Malicious base image runs code during build (RUN commands in Dockerfile)
  └─ Compromised apt packages (PPA injection, mirror compromise)

Mitigations:
  ✅ Pin image by SHA256 digest (not tags)
  ✅ Use distroless or scratch base images
  ✅ Scan images in CI (Trivy, Grype, Docker Scout)
  ✅ Only pull from trusted registries (Docker Hub verified publisher, GAR, ECR)
  ✅ Use Cosign to verify base image signatures
  ✅ Restrict network during build
```

```dockerfile
# BAD — mutable tag
FROM python:3.12-slim

# GOOD — immutable digest
FROM python:3.12-slim@sha256:e3f7a8c9b2d1f0e4a5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8

# BEST — verified + digest
FROM python:3.12-slim@sha256:e3f7... AS base
# Notarize with cosign
```

**Action poisoning:**

```
Attack vector:
  uses: actions/checkout@v3
  └─ v3 tag may have been force-pushed to point at malicious commit
  └─ Malicious action exfiltrates CI secrets (GITHUB_TOKEN, env vars)

  uses: third-party-action@main
  └─ Always pulls latest code — no version stability
  └─ Maintainer compromise → all consumers compromised

Mitigations:
  ✅ Pin actions by commit SHA
  ✅ Audit third-party actions before using them
  ✅ Use GitHub's action pinning / allowed actions policies
  ✅ Review action source code (for simple actions)
  ✅ Use `actions/` and `github/` verified creators first
```

```yaml
# BAD — moving tag
- uses: actions/checkout@v3         # v3 → v3.0.1 → v3.1.0 → could be anything

# BAD — branch reference
- uses: some-org/some-action@main   # Changes without notice

# GOOD — pinned commit SHA
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
  # v4.1.1 — verified hash

# GOOD — comments for readability
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.1
- uses: docker/login-action@e92390c5fb421da1463c202d546fed0ec5c39f20  # v3.0.2
- uses: docker/build-push-action@2cdde995de11925a030ce8070c3d77a52ffcf1c0  # v5.1.0
```

**Allowed action policies (GitHub Enterprise):**

```yaml
# Organization-level policy
# Settings → Actions → Policies → Allow specific actions
github-owned: true
verified-creator: true
patterns:
  - "docker/*"
  - "aws-actions/*"
  - "slsa-framework/*"
```

### 5.5 Branch Protection, Reviews, and Signed Commits

**Branch protection rules:**

```yaml
Required settings:
  ☐ Require pull request reviews (at least 1, prefer 2)
  ☐ Dismiss stale reviews when new commits are pushed
  ☐ Require status checks before merging
  ☐ Require branches to be up-to-date
  ☐ Require signed commits
  ☐ Include administrators (admins must also follow rules)
  ☐ Restrict push access (no direct pushes)
  ☐ Allow force pushes: NO
  ☐ Allow deletions: NO
  ☐ Block force pushes on matching branches
  ☐ Do not allow bypassing protections

Required status checks:
  ☐ Continuous Integration (tests pass)
  ☐ Dependency Review
  ☐ Secret Scanning
  ☐ CodeQL / SAST
  ☐ Lint / Format
  ☐ Build
```

**Signed commits:**

```bash
# Configure Git signing
git config --global user.signingkey ~/.ssh/id_ed25519.pub  # SSH signing
git config --global gpg.format ssh
git config --global commit.gpgsign true

# Or GPG
git config --global user.signingkey ABCDEF1234567890
git config --global commit.gpgsign true

# Create a signed commit
git commit -S -m "feat: add authentication middleware"

# Verify a signed commit
git verify-commit HEAD

# Sign all tags
git tag -s v1.0.0 -m "v1.0.0"
git verify-tag v1.0.0
```

**GitHub verification badges:**

- `Verified` — signed with a verified GPG key or SSH key
- `Partially verified` — signed but key not verified
- `Unverified` — unsigned commit
- Badges show in the commit list, PR timeline, and comparison view

**Requiring signed commits in GitHub:**

```
Settings → Branches → Add branch protection rule
  ☑ Require signed commits
```

**SSH commit signing (recommended over GPG):**

```bash
# 1. Generate SSH key (or use existing)
ssh-keygen -t ed25519 -C "your.email@example.com"

# 2. Add to GitHub
# Settings → SSH and GPG keys → New SSH Key (Signing)

# 3. Configure Git
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# 4. Enable globally
git config --global commit.gpgsign true
```

---

## Part 6: Incident Response for OSS Projects

### 6.1 Disclosure Handling Workflow

```
                    ┌─────────────────────────┐
                    │  Vulnerability Reported  │
                    │  (via SECURITY.md path)   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Acknowledge receipt     │
                    │  within 24 hours         │
                    │  (automated + personal)  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Triage assessment       │
                    │  - Reproduce?            │
                    │  - Severity (CVSS)       │
                    │  - Affected versions     │
                    │  - Scope of impact       │
                    │  - Reporter credibility  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Decision: Accept?       │
                    │  ├─ Yes → Private patch  │
                    │  └─ No → Notify reporter │
                    │     with reasoning       │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Private patch dev       │
                    │  - Fix in private fork   │
                    │  - Test fix thoroughly   │
                    │  - Write advisory draft  │
                    │  - Contact CNAs          │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Embargo coordination    │
                    │  - Downstream vendors    │
                    │  - Distro security teams │
                    │  - Set embargo end date  │
                    │  - Send pre-notification │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Public disclosure       │
                    │  - Release patched ver   │
                    │  - Publish advisory      │
                    │  - Assign CVE            │
                    │  - Announce to community │
                    │  - Update SBOM / vuln DB │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Post-mortem             │
                    │  - Timeline of events    │
                    │  - Root cause analysis   │
                    │  - Process improvements  │
                    │  - Lessons learned doc   │
                    └─────────────────────────┘
```

### 6.2 Private Patch Development

**Private fork workflow:**

```bash
# 1. Create a private fork of the repository
# (or use GitHub Security Advisory's private fork feature)

# 2. Set up local workspace
git clone https://github.com/org/project-security-fork
cd project-security-fork
git checkout -b security/fix-CVE-XXXX-YYYYY

# 3. Develop fix
# - Minimal change, focused on vulnerability only
# - Include regression test
# - Don't refactor or add features
# - Add comments explaining the security context

# 4. Test thoroughly
# - Normal test suite
# - Fuzz testing
# - Integration tests
# - Manual exploit verification (confirm fix before removal)

# 5. Prepare commit message
# Format:
#   security: fix authentication bypass in token validation
#
#   CVE: CVE-2024-XXXX
#   Co-authored-by: Reporter Name <reporter@example.com>
#   Security: This is a security fix — do not merge until embargo lifts

# 6. Sign the commit
git commit -S -m "security: fix authentication bypass in token validation"
```

**GitHub Security Advisory private fork:**

```
1. Go to repository → Security → Advisories → New advisory
2. Fill in description, severity, affected versions
3. GitHub creates a temporary private fork
4. Develop fix in the private fork
5. Request review from trusted contributors
6. Merge into advisory's private fork
7. When ready: "Publish advisory" → GitHub merges into public repo
```

**Key rules during embargo:**
- **No commits to public branches** containing the fix
- **No public discussions** about the issue (email, IRC, Discord)
- **No changelog entries** revealing the fix
- **No blog posts or social media** mentioning the issue
- **Limit knowledge** to the minimum number of people who need to fix it

### 6.3 Embargoed Disclosure Coordination

**Who to include in embargo:**

```
Primary circle:
  - Repository maintainers (2–3 people)
  - Vulnerability reporter
  - CNA contact (if CVE already assigned)
  - Security team (if applicable)

Secondary circle (downstream notification):
  - Linux distribution security contacts
    - security@debian.org
    - security@ubuntu.com
    - secalert@redhat.com
    - cve@kernel.org
    - suse-security@suse.com
  - OSV / GitHub via the advisory system
  - Major downstream package maintainers
  - Cloud providers (if cloud-hosted)

Tertiary circle (pre-notification):
  - Large-scale known users (NDA only)
  - Commercial support providers
```

**Embargo coordination checklist:**

```
□ Set explicit embargo end date/time (UTC)
□ Use GitHub Security Advisory's "Request CVE" feature
□ Send pre-notification email 7 days before disclosure
□ Send reminder 48 hours before disclosure
□ Ensure all parties have access to the private fix branch
□ Confirm downstream has patches ready (if applicable)
□ Have disclosure artifacts ready:
   - Release notes
   - Advisory text
   - Blog post (if warranted)
   - CVE description
   - Updated SBOM
□ Plan simultaneous release across all distribution channels
```

**Embargo email template:**

```
Subject: [SECURITY] Embargoed disclosure: CVE-2024-XXXX in Project

Hello security team,

This is a pre-notification for an embargoed security disclosure
for the Project <name> affecting versions <range>.

CVE: CVE-2024-XXXX (CVSS: <score>)
Affected: <version range>
Impact: <description>
Fix: <branch link>

Embargo lift: YYYY-MM-DD HH:MM UTC

Please acknowledge receipt.
Patches must remain private until the embargo date.

Contact: maintainer@example.com (PGP: <fingerprint>)
```

### 6.4 Post-Disclosure Communication

**Immediately after publication:**

```markdown
# Security Advisory: CVE-2024-XXXX

**Published:** YYYY-MM-DD
**Severity:** Critical/High/Medium/Low
**CVSS:** X.X (vector: CVSS:4.0/AV:N/AC:L/...)

## Summary

Brief description of the vulnerability.

## Affected Versions

- Project v1.x.y → v2.a.b (all versions prior to the fix)

## Patched Versions

- Project v2.a.b+1 (containing the fix)

## Impact

What an attacker can achieve by exploiting this vulnerability.

## Details

Technical description of the vulnerability root cause and exploit
mechanism. Include:
- Root cause (e.g., missing input validation, race condition)
- Attack vector (e.g., unauthenticated HTTP request)
- Impact scope (e.g., RCE, privilege escalation, data exposure)

## Mitigation

If immediate upgrade is not possible:
- Configuration workarounds
- Firewall rules
- Feature disablement

## Credits

- Reporter Name (@handle) for discovering and reporting
- Maintainer Name for the fix

## Timeline

- YYYY-MM-DD: Vulnerability reported
- YYYY-MM-DD: Triage and confirmation
- YYYY-MM-DD: Fix developed
- YYYY-MM-DD: Embargo coordination with downstream
- YYYY-MM-DD: Public disclosure

## References

- CVE entry: https://nvd.nist.gov/vuln/detail/CVE-2024-XXXX
- GitHub Advisory: https://github.com/org/project/security/advisories/GHSA-xxxx-xxxx-xxxx
- Commit: https://github.com/org/project/commit/abcdef123456
```

**Communication channels:**
1. GitHub Security Advisory (primary)
2. Release notes / CHANGELOG
3. Mailing list announcement
4. Social media (X/Twitter, Mastodon, LinkedIn)
5. Blog post (for critical/high severity)
6. Hacker News / Lobsters (for major incidents)

**Do NOT:**
- Blame the reporter
- Downplay severity or impact
- Provide incomplete patches
- Forget to credit the reporter (unless requested)
- Forget to update downstream package maintainers

### 6.5 CVE Assignment

**Via GitHub Security Advisories:**

```yaml
GitHub is a CNA (CVE Numbering Authority).
If you use GitHub Security Advisories:
  - GitHub can auto-assign a CVE ID
  - The advisory is private until you publish
  - On publish, CVE details are sent to MITRE
  - GitHub Advisory Database gets the entry automatically
  - OSV.dev mirrors within 24 hours

Steps:
  1. Repository → Security → Advisories → New advisory
  2. Fill in details (keep private)
  3. "Request CVE ID" button → GitHub assigns GHSA ID and CVE
  4. Work on fix in the private fork
  5. Publish → CVE goes live, OSV updates
```

**Via other CNAs:**

```yaml
Common CNAs for open source:
  - Apache Software Foundation (for Apache projects)
  - Eclipse Foundation (for Eclipse projects)
  - Red Hat (for Red Hat packages)
  - Canonical (for Ubuntu packages)
  - Distros listed on https://cve.mitre.org/cve/cna.html

Request CVE from a CNA:
  1. Identify the appropriate CNA for your project
  2. Contact them via their submission process
  3. Provide:
     - Vendor/project name
     - Product name
     - Affected version(s)
     - Vulnerability type (CWE)
     - Impact description
     - Fix reference
  4. Receive CVE ID (or ask them to reserve one)
```

**OSV Schema:**

```json
{
  "id": "GHSA-xxxx-xxxx-xxxx",
  "aliases": ["CVE-2024-XXXX"],
  "summary": "Brief vulnerability description",
  "details": "Longer technical description...",
  "severity": [
    {
      "type": "CVSS_V3",
      "score": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
    }
  ],
  "affected": [
    {
      "package": {
        "ecosystem": "npm",
        "name": "my-package"
      },
      "ranges": [
        {
          "type": "ECOSYSTEM",
          "events": [
            {"introduced": "0"},
            {"fixed": "2.1.0"}
          ]
        }
      ],
      "database_specific": {
        "cwes": ["CWE-287"],
        "github_reviewed": true
      }
    }
  ],
  "references": [
    {"type": "WEB", "url": "https://github.com/org/project/security/advisories/GHSA-xxxx-xxxx-xxxx"},
    {"type": "FIX", "url": "https://github.com/org/project/commit/abc123"}
  ],
  "published": "2024-01-15T12:00:00Z",
  "modified": "2024-01-16T08:30:00Z"
}
```

---

## Part 7: Compliance & Standards

### 7.1 OWASP ASVS (Application Security Verification Standard)

OWASP ASVS provides a framework for security requirements and verification levels.

| Level | Description | Target Audience |
|-------|-------------|----------------|
| L1 | Automated verification (basic) | All applications — minimal due diligence |
| L2 | Manual + automated (standard) | Applications handling sensitive data |
| L3 | Design-level verification (high) | Critical infrastructure, financial, healthcare |

**ASVS categories (v4.0):**

```
V1  — Architecture, Design, Threat Modeling
V2  — Authentication Verification
V3  — Session Management
V4  — Access Control
V5  — Validation, Input, Encoding
V6  — Stored Cryptography
V7  — Error Handling and Logging
V8  — Data Protection
V9  — Communications
V10 — Malicious Code
V11 — Business Logic
V12 — Files and Resources
V13 — API and Web Service
V14 — Configuration
```

**ASVS compliance checklist (L1 subset):**

```markdown
- [ ] V2.1: Verify user authentication credentials are protected
- [ ] V2.5: Verify password minimum length of 8 characters
- [ ] V3.1: Verify session tokens are cryptographically random
- [ ] V3.4: Verify session timeout configured
- [ ] V4.1: Verify principle of least privilege
- [ ] V5.1: Verify input validation on all untrusted data
- [ ] V5.3: Verify output encoding for all output contexts
- [ ] V6.2: Verify all cryptographic modules fail securely
- [ ] V7.1: Verify authentication failures are logged
- [ ] V8.1: Verify sensitive data is encrypted at rest
- [ ] V9.1: Verify TLS is used for all data in transit
- [ ] V12.1: Verify file upload validation
- [ ] V14.2: Verify HTTP security headers are configured
```

### 7.2 NIST SSDF (Secure Software Development Framework)

NIST SP 800-218 (SSDF 1.1) defines secure development practices for US federal
compliance (Executive Order 14028).

**SSDF Core Practices:**

| Practice | ID | Description |
|----------|----|-------------|
| **Prepare the Organization (PO)** |
| | PO.1 | Define security requirements for software development |
| | PO.2 | Implement roles and responsibilities |
| | PO.3 | Identify security resources and tools |
| | PO.4 | Define security requirements for third-party components |
| | PO.5 | Implement secure development environment |
| **Protect the Software (PS)** |
| | PS.1 | Protect all forms of code from unauthorized access |
| | PS.2 | Provide secure mechanisms for code integrity |
| | PS.3 | Protect third-party components |
| **Produce Well-Secured Software (PW)** |
| | PW.1 | Design software to meet security requirements |
| | PW.2 | Review software design to verify security |
| | PW.3 | Implement secure coding practices |
| | PW.4 | Review and/or test human-readable code |
| | PW.5 | Test executables for vulnerabilities |
| | PW.6 | Configure software for secure deployment |
| **Respond to Vulnerabilities (RV)** |
| | RV.1 | Identify and receive vulnerability reports |
| | RV.2 | Analyze vulnerabilities and determine severity |
| | RV.3 | Remediate vulnerabilities |
| | RV.4 | Communicate vulnerability information |

**SSDF for OSS projects — practical mapping:**

```yaml
PO.1:  Document security requirements in the project's SECURITY.md
PO.2:  Designate a security contact / security team
PO.4:  Maintain SBOM, scan dependencies
PO.5:  Use 2FA, signed commits, branch protection
PS.1:  Signed releases, checksums, signatures
PS.3:  Pin dependencies, audit regularly
PW.1:  Threat model in design docs
PW.3:  Coding guidelines, linters, static analysis
PW.4:  Code review required for all PRs
PW.5:  SAST/DAST in CI, fuzz testing
PW.7:  Supply chain: SLSA, Sigstore attestations
RV.1:  SECURITY.md with reporting policy
RV.2:  CVSS scoring, triage process
RV.3:  Patch process, backporting policy
RV.4:  Advisory publication, CVE assignment
```

**NIST SP 800-204D (Secure Software Attestation):**

FedRAMP and other US government programs now require a self-attestation form
(Secure Software Development Attestation Common Form) confirming SSDF compliance.
Applicable to software sold to or used by US federal agencies.

### 7.3 ISO 27001

ISO 27001 is an information security management standard. While most OSS projects
won't be ISO-certified, understanding the controls helps structure security programs.

**Annex A controls relevant to OSS:**

```
A.6   Organization of information security
  A.6.1.2  Segregation of duties (code review ≠ merge)
  A.6.1.5  Information security in project management

A.8   Asset management
  A.8.1.1  Inventory of assets (maintain SBOM)
  A.8.1.4  Software licensing (license compliance)

A.9   Access control
  A.9.1.2  Access to networks and services
  A.9.2.3  Management of privileged access rights
  A.9.4.2  Secure log-on procedures

A.12  Operations security
  A.12.1.4  Capacity management
  A.12.4.1  Event logging
  A.12.5.1  Installation of software on operational systems
  A.12.6.1  Management of technical vulnerabilities

A.14  System acquisition, development, maintenance
  A.14.1.1  Information security requirements analysis
  A.14.2.1  Secure development policy
  A.14.2.5  System security testing
  A.14.2.9  Acceptance testing

A.16  Incident management
  A.16.1.1  Responsibilities and procedures
  A.16.1.4  Assessment of and decision on events
  A.16.1.5  Response to information security incidents

A.18  Compliance
  A.18.1.1  Identification of applicable legislation
  A.18.1.4  Privacy and protection of personally identifiable information
```

### 7.4 FedRAMP & SOC 2 Considerations for OSS

**FedRAMP (US Federal Risk and Authorization Management Program):**

For OSS projects that want their cloud-hosted version to be FedRAMP-compliant:

```yaml
Requirements that affect OSS:
  - FIPS 140-2/140-3 validated cryptography
    - OpenSSL FIPS Object Module
    - Bouncy Castle FIPS (Java)
    - Only FIPS-approved algorithms
  - Audit logging (all security-relevant events)
  - Access control (RBAC, MFA)
  - User data isolation (multi-tenant)
  - Incident response procedures
  - Vulnerability scanning (at least monthly)
  - Penetration testing (annually)

Impact on OSS:
  - Avoid non-FIPS algorithms (no MD5, no RC4, no 3DES)
  - FIPS 140-3 transition (September 2024): SP 800-140, SP 800-140B
  - Use standardized logging format (syslog, JSON)
  - Provide IAM integration hooks
```

**SOC 2 (Service Organization Control):**

```
SOC 2 Type II is relevant for OSS projects offered as a service.

Trust Services Criteria (TSC):
  Security      — The system is protected against unauthorized access
  Availability  — The system is available for operation and use
  Confidentiality — Information designated as confidential is protected
  Integrity     — System processing is complete, accurate, and timely
  Privacy       — Personal information is collected, used, and retained properly

For OSS projects, focus on Common Criteria (CC):
  CC1: Control Environment
  CC2: Communication and Information
  CC3: Risk Assessment
  CC4: Monitoring Activities
  CC5: Control Activities — includes SDLC security
```

### 7.5 Export Controls (EAR)

**US Export Administration Regulations (EAR) — Encryption Items:**

```
EAR Category 5 Part 2 covers encryption software.

Key rules for OSS:
  - Publicly available open source encryption software is NOT subject to EAR
    (License Exception TSU — Technology and Software Unrestricted)
  - This applies even if the software uses strong encryption (AES-256, RSA-4096)
  - Requirements:
    1. The software must be publicly available (no access restrictions)
    2. Published via internet (GitHub, GitLab, etc.) without restriction
    3. No NDA required to access
    4. Source code must be freely downloadable
  - Notification requirement (EAR 742.15(b)):
    Must notify BIS (Bureau of Industry and Security) via email
    (enc@bis.doc.gov) with the URL and a brief description

  CONTROLLED by exception:
  - If the software is NOT publicly available (private repo, access fees, NDAs)
    → May require export license
  - If the cryptography was specifically designed for government use (traps,
    targeted surveillance)
    → Not eligible for TSU exception
  - If the project is owned or controlled by a sanctioned entity
    → May violate OFAC sanctions

  ML applications:
  - EAR now controls certain ML model weights (2023 rule)
  - Model weights trained with >10^26 FLOPs for certain applications
  - Open source publication ≠ automatic exemption for intentionally trained
    dual-use models
```

**Open source encryption exception — practical guidance:**

```markdown
To qualify for the open source encryption exclusion:

1. Make sure your repository is PUBLIC
2. Do NOT require registration, login, or payment to access
3. Do NOT require NDAs to download
4. Post a notice in your SECURITY.md or README:

   "This project contains encryption software and is publicly available
    under the open source encryption exclusion of the US Export
    Administration Regulations (EAR 742.15(b) / License Exception TSU).
    A notification has been provided to the US BIS."

5. Email notification to enc@bis.doc.gov:
   Subject: Notification of Open Source Encryption Software
   Body:
     Project: <name>
     URL: <repository URL>
     Description: <brief description>
     Contact: <your email>
     Date: <today's date>
```

### 7.6 GDPR Compliance for OSS Projects

**GDPR considerations when your OSS project processes EU personal data:**

```
Key principles:
  Lawfulness, fairness, transparency
  Purpose limitation
  Data minimization
  Accuracy
  Storage limitation
  Integrity and confidentiality (security)

For OSS maintainers:
  1. If you collect ANY personal data (emails, IPs, analytics):
     - Need a privacy policy (PRIVACY.md)
     - Need lawful basis for processing
     - Must provide data deletion mechanism

  2. Processing personal data via your software:
     - OSS itself doesn't process data — the deploying organization does
     - They are the Data Controller; you are a Data Processor
     - Provide documentation for Data Processing Agreements (DPA)
     - Clearly document what personal data the software processes

  3. GDPR by design and default:
     - Minimize data collection
     - Provide data retention controls
     - Encrypt personal data at rest and in transit
     - Support data portability (export in common format)
     - Support right to erasure (delete user data)

  4. Data breach notification:
     - If you operate a service: 72 hours to notify authorities
     - Document incident response plan
     - Provide logging and monitoring
```

**PRIVACY.md template for OSS:**

```markdown
# Privacy Policy for <Project Name>

## Data Collection

This project collects the following data when you use our hosted
service (self-hosted instances are outside our control):

- Account information: email, username (if you create an account)
- Usage analytics: anonymous usage statistics (opt-out available)
- Error logs: anonymized crash reports

## Data Processing

We process data only to provide the service:
- Authentication and access control
- Service operation and improvement
- Security monitoring and incident response

## Data Retention

- Account data: retained until account deletion
- Usage analytics: 12 months
- Error logs: 90 days

## Your Rights

Under GDPR, you have the right to:
- Access your data
- Correct inaccurate data
- Delete your data ("right to erasure")
- Export your data (data portability)
- Object to processing
- Withdraw consent

To exercise these rights, contact privacy@example.com.

## Third-Party Data Processors

- Cloud provider: <provider> (DPA available)
- Analytics: <provider> (anonymized, opt-out)

## Contact

Data Protection: dpo@example.com
Repository: https://github.com/org/project
```

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| ASVS | Application Security Verification Standard (OWASP) |
| C2 | Command & Control — attacker communication channel |
| CNA | CVE Numbering Authority — entity authorized to assign CVEs |
| CVD | Coordinated Vulnerability Disclosure |
| CVE | Common Vulnerabilities and Exposures — unique vulnerability identifier |
| CVSS | Common Vulnerability Scoring System |
| Dependabot | GitHub-native automated dependency update tool |
| EAR | Export Administration Regulations (US) |
| EPSS | Exploit Prediction Scoring System |
| FIPS | Federal Information Processing Standards (US) |
| HSM | Hardware Security Module |
| JNDI | Java Naming and Directory Interface — injection vector in Log4Shell |
| KMS | Key Management Service |
| OIDC | OpenID Connect — identity layer on top of OAuth 2.0 |
| OSV | Open Source Vulnerabilities — Google's vulnerability database |
| PVR | Private Vulnerability Reporting (GitHub feature) |
| Renovate | Cross-platform automated dependency update tool |
| SBOM | Software Bill of Materials |
| SLSA | Supply-chain Levels for Software Artifacts |
| SPDX | Software Package Data Exchange — SBOM format |
| SSDF | Secure Software Development Framework (NIST) |
| TSU | Technology and Software Unrestricted — EAR license exception |

## Appendix B: Reference URLs

```yaml
Resources:
  CVSS v4.0 Calculator: https://www.first.org/cvss/calculator/4.0
  EPSS API: https://api.first.org/data/v1/epss
  OSV API: https://api.osv.dev
  NVD: https://nvd.nist.gov
  GitHub Advisory DB: https://github.com/advisories
  OWASP Top 10 (2021): https://owasp.org/Top10
  OWASP ASVS: https://github.com/OWASP/ASVS
  OWASP Top 10 API (2023): https://owasp.org/API-Security
  SLSA Framework: https://slsa.dev
  Sigstore: https://www.sigstore.dev
  SPDX: https://spdx.dev
  CycloneDX: https://cyclonedx.org
  NIST SSDF (SP 800-218): https://csrc.nist.gov/publications/detail/sp/800-218/final
  FedRAMP: https://www.fedramp.gov
  EAR Encryption: https://www.bis.doc.gov/index.php/policy-guidance/encryption
  OpenSSF: https://openssf.org
  Google OSSF Scorecard: https://securityscorecards.dev
  CNCF Security TAG: https://github.com/cncf/tag-security
  ISO 27001: https://www.iso.org/isoiec-27001-information-security.html
  GDPR: https://gdpr.eu
  CVE Program: https://www.cve.org
  FIRST (CVSS/EPSS): https://www.first.org
  OSV Schema: https://ossf.github.io/osv-schema
  Trivy: https://trivy.dev
  Grype: https://github.com/anchore/grype
  Cosign: https://github.com/sigstore/cosign
  Gitleaks: https://github.com/gitleaks/gitleaks
  TruffleHog: https://github.com/trufflesecurity/trufflehog
  Dependabot: https://docs.github.com/code-security/dependabot
  Renovate: https://docs.renovatebot.com
  Verdaccio: https://verdaccio.org
  Dependency Review Action: https://github.com/actions/dependency-review-action
  SLSA GitHub Generator: https://github.com/slsa-framework/slsa-github-generator
  in-toto Attestations: https://github.com/in-toto/attestation
  Codecov Breach: https://about.codecov.io/security-update
  SolarWinds Timeline: https://www.solarwinds.com/securityadvisory
  Log4Shell Timeline: https://logging.apache.org/log4j/2.x/security.html
  xz backdoor analysis: https://www.openwall.com/lists/oss-security/2024/03/29/4
```

---

> **Document Version:** 1.0
> **Last Updated:** May 2026
> **Maintainer:** Open Source Security Working Group
>
> *This is a living document. Update it as ecosystems evolve, new threats
> emerge, and standards advance. Every section should be reviewed at least
> annually.*
