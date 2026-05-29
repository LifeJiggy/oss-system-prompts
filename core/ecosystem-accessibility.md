# OSS Accessibility & Inclusive Design — Universal Reference

> A comprehensive global reference on accessibility (a11y) and inclusive design practices for open source software projects. Created as a living document for maintainers, contributors, and organizations committed to building software that works for everyone.

**Version:** 1.0
**Last Updated:** 2026-05-19
**License:** CC-BY-4.0

---

## Table of Contents

1. [Part 1: Why Accessibility Matters in OSS](#part-1-why-accessibility-matters-in-oss)
2. [Part 2: Web Accessibility Standards (WCAG)](#part-2-web-accessibility-standards-wcag)
3. [Part 3: Accessibility in UI Frameworks & Libraries](#part-3-accessibility-in-ui-frameworks--libraries)
4. [Part 4: Accessibility for Non-UI Projects](#part-4-accessibility-for-non-ui-projects)
5. [Part 5: Inclusive Design in OSS Communities](#part-5-inclusive-design-in-oss-communities)
6. [Part 6: Testing for Accessibility](#part-6-testing-for-accessibility)
7. [Part 7: Accessibility in Documentation](#part-7-accessibility-in-documentation)
8. [Part 8: Templates](#part-8-templates)

---

## Part 1: Why Accessibility Matters in OSS

### 1.1 The Business Case for Accessibility

Accessibility is not merely a compliance checkbox — it is a strategic advantage for open source projects and the organizations that depend on them. The business case rests on several pillars:

**Market Size and Reach**

- Over 1.3 billion people worldwide (approximately 16% of the global population) live with some form of disability (WHO World Report on Disability).
- The global disabled population controls over  trillion in annual disposable income (Purple Pound / Global Disability Inclusion report).
- Accessible software reaches older adults — the 65+ demographic is the fastest-growing internet user segment globally.
- When OSS projects are inaccessible, they actively exclude a significant portion of potential users and contributors.
- The combined market of people with disabilities and their networks represents a majority of consumers.

**Search Engine Optimization (SEO)**

- Many accessibility practices overlap directly with SEO best practices:
  - Semantic heading structures improve content discoverability.
  - Alt text on images provides context for search engine crawlers.
  - Proper link text benefits both screen readers and search ranking.
  - Transcripts and captions make video content indexable by search engines.
  - Proper use of landmark elements improves content structure signals.

**Reduced Maintenance Costs**

- Accessible code tends to be cleaner, more semantic, and better structured.
- Early investment in accessibility reduces technical debt — retrofitting a11y is typically 5x-10x more expensive than building it in from the start.
- Automated a11y tests serve as regression guards, catching layout and behavior issues before they reach production.
- Accessible components are more reusable and composable across projects.
- Semantic HTML works consistently across browsers and devices without workarounds.

**Innovation Spillover**

- Many mainstream innovations originated as accessibility technology:
  - Voice assistants (Siri, Alexa, Google Assistant) evolved from screen reader technology.
  - Closed captions, now ubiquitous, were developed for deaf and hard-of-hearing viewers.
  - High-contrast mode and large-text options benefit users in bright sunlight or with aging eyes.
  - Keyboard navigation underlies all power-user workflows (e.g., IDE shortcuts, Vim, tmux).
  - Voice control interfaces originated from assistive technology needs.
  - Dark mode was originally an accessibility accommodation for photophobia.

**Talent Acquisition and Diversity**

- OSS projects that demonstrate commitment to accessibility attract a broader, more diverse contributor base.
- Contributors with disabilities bring lived experience that directly improves product quality.
- Accessibility-aware projects signal maturity and professionalism to corporate sponsors and enterprise adopters.
- Accessibility is one of the most requested features by enterprise procurement teams evaluating OSS.
- Developers who use or need accessibility features themselves are more likely to contribute to projects that prioritize a11y.

### 1.2 Legal Requirements

Accessibility is increasingly codified into law worldwide. OSS projects used in government, education, healthcare, and enterprise contexts must comply with applicable regulations.

**United States: Americans with Disabilities Act (ADA)**

- Title II (public entities) and Title III (public accommodations) have been interpreted by courts to apply to websites and mobile applications.
- High-profile lawsuits (e.g., National Federation of the Blind v. Target Corp., Robles v. Domino's Pizza) established that digital properties must be accessible.
- Department of Justice guidance confirms that web accessibility falls under ADA Title III.
- For OSS used by government agencies: compliance is non-negotiable.
- Demand letters and lawsuits for digital accessibility have increased 300%+ since 2020.

**United States: Section 508 of the Rehabilitation Act**

- Requires federal agencies' electronic and information technology to be accessible to people with disabilities.
- Revised in 2017 to incorporate WCAG 2.0 Level AA standards by reference.
- Applies to any software, website, or digital tool purchased or developed by federal agencies.
- OSS projects that sell to government must meet Section 508 standards.
- Section 508 compliance statements are required for all federal technology procurement.

**European Union: EN 301 549**

- Mandates accessibility requirements for ICT products and services procured by public sector bodies.
- References WCAG 2.1 Level AA as the baseline for web content.
- The European Accessibility Act (EAA), effective June 2025, extends requirements to private sector products and services — including software platforms.
- Non-compliance can result in fines up to 5% of annual turnover in some member states.
- Covers hardware, software, websites, documents, telecommunications, and more.

**European Union: Web Accessibility Directive (Directive 2016/2102)**

- Requires public sector websites and mobile apps to meet EN 301 549 / WCAG 2.1 AA.
- Member states must monitor compliance and publish accessibility statements.
- OSS projects adopted by public bodies must comply.
- Regular monitoring reports are published by the European Commission.

**United Kingdom: Equality Act 2010**

- Requires service providers to make reasonable adjustments to avoid disadvantaging disabled people.
- Applies to all organizations providing services, including digital services.
- Case law has established that inaccessible websites violate the Equality Act.
- Public Sector Bodies Accessibility Regulations 2018 mandates WCAG 2.1 AA compliance.

**Canada: Accessible Canada Act (ACA)**

- Applies to federally regulated organizations (banking, telecommunications, transportation).
- Requires accessibility plans, feedback processes, and progress reports.
- References WCAG 2.1 AA as technical standard.
- Enforcement began in 2022 with increasing penalties.

**Canada: Accessibility for Ontarians with Disabilities Act (AODA)**

- Requires all public and private sector organizations with 50+ employees to make their websites and content accessible per WCAG 2.0 AA.
- Filing deadlines for accessibility reports extend through 2025+.
- Non-compliance fines can reach ,000 per day for directors/officers.

**Australia: Disability Discrimination Act 1992 (DDA)**

- Makes it unlawful to discriminate on the basis of disability in the provision of goods and services.
- The Australian Human Rights Commission has issued advisory notes confirming the DDA applies to websites.
- WCAG 2.1 AA is the de facto standard for compliance.
- Web accessibility complaints to the AHRC have increased steadily year over year.

**Japan: Act on the Elimination of Discrimination against Persons with Disabilities**

- Requires reasonable accommodation in digital services.
- JIS X 8341-3 standard references WCAG 2.0 as the technical benchmark.
- Updated in 2024 to align with WCAG 2.1.

**India: Rights of Persons with Disabilities Act 2016**

- Mandates accessible government websites and digital content.
- Guidelines for Indian Government Websites (GIGW) reference WCAG standards.
- Accessibility auditing is required for all major government web properties.

**Brazil: Brazilian Inclusion Law (Law 13.146/2015)**

- Requires digital accessibility for all public-facing websites.
- e-MAG (Modelo de Acessibilidade de Governo Eletrônico) references WCAG.
- Fines increase with severity and duration of non-compliance.

### 1.3 Accessibility as a Human Right

Beyond legal compliance, accessibility is a human right recognized by international frameworks:

**United Nations Convention on the Rights of Persons with Disabilities (UNCRPD)**

- Article 9: Accessibility — enable persons with disabilities to live independently and participate fully.
- Article 21: Freedom of expression and access to information.
- Article 24: Inclusive education and accessible learning materials.
- 182 countries are signatories, making UNCRPD one of the most widely ratified human rights treaties.
- The UNCRPD explicitly includes access to information and communications technology.

**Sustainable Development Goals**

- Goal 4: Quality education (requires accessible learning platforms).
- Goal 8: Decent work and economic growth (requires accessible workplace tools).
- Goal 10: Reduced inequalities (digital inclusion is a core component).
- Goal 11: Sustainable cities and communities (includes accessible digital infrastructure).
- Goal 16: Peace, justice, and strong institutions (access to information).

**The Social Model of Disability**

- Disability is not an individual medical condition but results from the interaction between people with impairments and barriers in the environment and society.
- Inaccessible software is a barrier that society creates — and can remove.
- When OSS projects are inaccessible, they perpetuate exclusion. When they are accessible, they advance equity.
- The social model shifts responsibility from the individual to the designer/developer.
- Nothing about us without us: disabled people must be included in design and decision-making.

**Digital Divide Intersections**

- Accessibility intersects with other forms of marginalization: low income, rural location, limited education, language barriers.
- Accessible OSS that works on older hardware, low-bandwidth connections, or with assistive technology bridges multiple digital divides.
- Open source's mission — to make software freely available and modifiable — is fundamentally aligned with accessibility's goal of universal access.
- Accessible OSS benefits users in developing nations where assistive technology may be the primary computing interface.

### 1.4 How Inaccessible OSS Excludes Users and Contributors

**User Exclusion**

- A developer who is blind cannot use a CLI tool that outputs all information in color without text alternatives.
- A user with limited hand mobility cannot navigate a web application that requires precise mouse movements without keyboard alternatives.
- A Deaf user cannot understand a video tutorial that lacks captions.
- A user with a cognitive disability cannot follow a complex workflow with inconsistent navigation patterns.
- A non-native English speaker cannot understand error messages written in obscure idioms.
- A user with low vision cannot read text that fails minimum contrast ratios.
- A user with a screen reader cannot interpret a chart rendered as an image without alt text.
- A user with motor disabilities cannot interact with tiny touch targets on a mobile interface.
- A user with photosensitive epilepsy cannot use an app with unlabeled flashing animations.
- A user with dyslexia cannot parse dense, unbroken text blocks.

**Contributor Exclusion**

- A blind developer cannot submit a pull request if the project's CI system requires solving a visual CAPTCHA.
- A developer with motor disabilities cannot participate in real-time chat that moves too fast for their communication tools.
- A dyslexic contributor cannot navigate a codebase with inconsistently spelled variable names.
- A Deaf contributor cannot participate in video-only standup meetings.
- A developer with anxiety cannot handle aggressive code review language.
- A developer with epilepsy cannot use the project's website with uncontrolled animated elements.
- A neurodivergent developer cannot focus on coding with constant notification pings.
- A blind developer cannot review UI screenshots in PR descriptions without alt text.
- A contributor relying on speech recognition cannot type special characters required by commit message formats.

**The Ripple Effect of Exclusion**

- Exclusion of one user or contributor typically excludes others with similar needs.
- Inaccessible projects lose the perspectives, talent, and lived experience of disabled contributors.
- Bug reports from disabled users are often the first indication of accessibility issues — silencing those reports means issues go unfixed.
- Inaccessible projects develop a reputation that discourages contribution from accessibility-conscious developers.
- Enterprises increasingly require a11y compliance for procurement — inaccessible OSS loses customers.
- The cost of exclusion compounds: inaccessible documentation means fewer developers can learn the project.

### 1.5 Case Studies

**Positive Case Study: React (Meta)**

- React's documentation site underwent a major a11y overhaul in 2021, including:
  - Comprehensive semantic HTML structure.
  - Skip navigation links.
  - Proper heading hierarchy.
  - Focus management for interactive demos.
  - Color contrast compliance.
  - Keyboard-navigable interactive code editors.
- React core team established accessibility as a design requirement for new APIs.
- React's a11y documentation (react.dev) serves as a model for framework documentation.
- Result: increased adoption in government and enterprise contexts.
- Accessible documentation means more developers can learn React effectively.

**Positive Case Study: Tailwind CSS**

- Tailwind's utility classes make it easier to produce accessible interfaces by default:
  - Built-in focus ring utilities.
  - Motion-safe/motion-reduce variants for animations.
  - Default accessible color palette with adequate contrast ratios.
  - Screen-reader-only utility (sr-only) for accessible labeling.
  - Reduced-motion variants built into the framework.
- The Tailwind documentation includes explicit accessibility guidance.
- This approach made accessible styling accessible to a broad developer audience.
- Tailwind's accessible defaults mean developers inadvertently build more accessible UIs.

**Positive Case Study: WordPress**

- WordPress has a dedicated accessibility team — one of the few OSS projects with a formal a11y team.
- Core releases include accessibility improvements as a stated goal.
- Accessibility-ready theme requirements ensure themes meet baseline a11y standards.
- WordCamp events require accessibility accommodations.
- A dedicated accessibility handbook guides contributors and theme authors.
- WordPress powers 40%+ of the web, and its a11y investment has made millions of sites more accessible.

**Negative Case Study: Discourse (Early Years)**

- Discourse initially shipped with a real-time infinite-scroll interface that was inaccessible to screen readers.
- Keyboard navigation was incomplete; focus management was absent.
- Community feedback from blind users was initially deprioritized in favor of feature development.
- After public pressure and contributor advocacy, Discourse invested in a11y — illustrating the cost of retrofitting.
- The retrofit required significant architectural changes that would have been much cheaper to include from the start.

**Negative Case Study: GitHub (Pre-2020)**

- GitHub's pull request review interface was notoriously difficult for keyboard users.
- The merge button was not keyboard accessible.
- File diffs had poor screen reader support (silent on changes).
- GitHub's response to a11y issues was slow, leading to advocacy groups creating workaround browser extensions.
- Post-Microsoft acquisition, GitHub invested significantly in a11y improvements.
- The lesson: early neglect requires later remediation at higher cost.

**Mixed Case Study: Bootstrap**

- Bootstrap 3 had significant accessibility issues (poor color contrast, missing ARIA roles, focus management gaps).
- Bootstrap 4 introduced improved contrast ratios, proper ARIA attributes, and better keyboard support.
- Bootstrap 5 adopted semantic HTML elements, dropped jQuery, and improved custom form controls.
- However, Bootstrap's auto-generated components (carousels, modals, tooltips) still require developer vigilance.
- The lesson: framework-level defaults matter enormously, but they cannot substitute for developer knowledge.
- Bootstrap's sheer popularity means its a11y quality affects millions of sites.

---

## Part 2: Web Accessibility Standards (WCAG)

### 2.1 WCAG 2.2 Principles

WCAG 2.2 is organized around four core principles — the POUR framework:

**P — Perceivable**

Information and user interface components must be presentable to users in ways they can perceive.

| Guideline | Summary |
|---|---|
| 1.1 Text Alternatives | Provide text alternatives for non-text content. |
| 1.2 Time-based Media | Provide alternatives for time-based media. |
| 1.3 Adaptable | Create content that can be presented in different ways without losing information or structure. |
| 1.4 Distinguishable | Make it easier for users to see and hear content, separating foreground from background. |

**O — Operable**

User interface components and navigation must be operable.

| Guideline | Summary |
|---|---|
| 2.1 Keyboard Accessible | Make all functionality available from a keyboard. |
| 2.2 Enough Time | Provide users enough time to read and use content. |
| 2.3 Seizures and Physical Reactions | Do not design content known to cause seizures or physical reactions. |
| 2.4 Navigable | Provide ways to help users navigate, find content, and determine where they are. |
| 2.5 Input Modalities | Make it easier to operate functionality through various inputs beyond keyboard. |

**U — Understandable**

Information and the operation of the user interface must be understandable.

| Guideline | Summary |
|---|---|
| 3.1 Readable | Make text content readable and understandable. |
| 3.2 Predictable | Make web pages appear and operate in predictable ways. |
| 3.3 Input Assistance | Help users avoid and correct mistakes. |

**R — Robust**

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

| Guideline | Summary |
|---|---|
| 4.1 Compatible | Maximize compatibility with current and future user agents, including assistive technologies. |

### 2.2 Level A, AA, AAA Conformance Requirements

WCAG defines three levels of conformance:

**Level A (Minimum)**

The most basic web accessibility features. Level A success criteria are the minimum requirements.

Key Level A criteria:

| SC | Name | Requirement |
|---|---|---|
| 1.1.1 | Non-text Content | All non-text content must have a text alternative. |
| 1.2.1 | Audio-only and Video-only | Provide an alternative for pre-recorded audio-only and video-only content. |
| 1.2.2 | Captions (Pre-recorded) | Captions provided for all pre-recorded audio content. |
| 1.2.3 | Audio Description or Media Alternative | Audio description or full text alternative for pre-recorded video. |
| 1.3.1 | Info and Relationships | Information, structure, and relationships conveyed through presentation must be programmatically determinable. |
| 1.3.2 | Meaningful Sequence | When the sequence affects meaning, content must be presented in a meaningful sequence. |
| 1.3.3 | Sensory Characteristics | Instructions must not rely solely on sensory characteristics (shape, size, visual location, sound). |
| 1.4.1 | Use of Color | Color must not be the only means of conveying information. |
| 1.4.2 | Audio Control | Audio that auto-plays must have a mechanism to pause/stop/control volume. |
| 2.1.1 | Keyboard | All functionality must be operable through a keyboard interface. |
| 2.1.2 | No Keyboard Trap | Keyboard focus must not be trapped in any component. |
| 2.1.4 | Character Key Shortcuts | Character key shortcuts must be remappable or disableable. |
| 2.2.1 | Timing Adjustable | Users must be able to turn off, adjust, or extend time limits. |
| 2.2.2 | Pause, Stop, Hide | Moving, blinking, scrolling, or auto-updating content must have pause/stop/hide controls. |
| 2.3.1 | Three Flashes or Below Threshold | Content must not flash more than 3 times per second. |
| 2.4.1 | Bypass Blocks | A mechanism to bypass blocks of repeated content (skip navigation link). |
| 2.4.2 | Page Titled | Web pages must have titles that describe topic or purpose. |
| 2.4.3 | Focus Order | Focusable components must receive focus in a meaningful sequence. |
| 2.4.4 | Link Purpose (In Context) | Link purpose must be determinable from link text alone or from link text + programmatically determined context. |
| 2.5.1 | Pointer Gestures | All functionality that uses multipoint or path-based gestures must be operable with single-point activation. |
| 2.5.2 | Pointer Cancellation | Down-event must not execute any action except to confirm activation. |
| 2.5.3 | Label in Name | For UI components with labels, the visible text label must match or be included in the accessible name. |
| 2.5.4 | Motion Actuation | Functionality triggered by device motion must also be operable via UI components. |
| 3.1.1 | Language of Page | The default human language of the page must be programmatically determinable. |
| 3.2.1 | On Focus | When a component receives focus, it must not initiate a change of context. |
| 3.2.2 | On Input | Changing a setting must not cause a context change unless the user is warned. |
| 3.3.1 | Error Identification | Input errors must be identified and described to the user in text. |
| 3.3.2 | Labels or Instructions | Labels or instructions must be provided when content requires user input. |
| 4.1.1 | Parsing | Content must have complete start/end tags, unique IDs, and proper nesting. |
| 4.1.2 | Name, Role, Value | UI components must have programmatically determinable name, role, and value. |

**Level AA (Enhanced)**

Addresses the most common and impactful barriers. Level AA is the target for most legal requirements (Section 508, EN 301 549, EAA).

Level AA includes all Level A criteria plus:

| SC | Name | Requirement |
|---|---|---|
| 1.2.4 | Captions (Live) | Captions provided for all live audio content. |
| 1.2.5 | Audio Description (Pre-recorded) | Audio description provided for all pre-recorded video content. |
| 1.3.4 | Orientation | Content does not restrict view and operation to a single display orientation. |
| 1.3.5 | Identify Input Purpose | Input fields that collect specific user information must have autocomplete attributes. |
| 1.4.3 | Contrast (Minimum) | Text must have contrast ratio of at least 4.5:1 (3:1 for large text). |
| 1.4.4 | Resize Text | Text can be resized up to 200% without loss of content or functionality. |
| 1.4.5 | Images of Text | Use text instead of images of text (except for logos). |
| 1.4.10 | Reflow | Content must not require scrolling in two dimensions at 320 CSS pixels. |
| 1.4.11 | Non-text Contrast | UI components and graphical objects must have at least 3:1 contrast. |
| 1.4.12 | Text Spacing | No loss of content when line/paragraph/letter/word spacing are adjusted. |
| 1.4.13 | Content on Hover or Focus | Dismissable, hoverable, persistent for hover/focus content. |
| 2.4.5 | Multiple Ways | More than one way to locate a page within a set of pages. |
| 2.4.6 | Headings and Labels | Headings and labels must describe topic or purpose. |
| 2.4.7 | Focus Visible | Any keyboard operable UI must have a visible focus indicator. |
| 2.4.11 | Focus Not Obscured (Minimum) | Focus indicator must not be fully obscured. |
| 2.5.7 | Dragging Movements | Dragging functionality must also work via single-point activation. |
| 2.5.8 | Target Size (Minimum) | Target size must be at least 24x24 CSS pixels. |
| 3.1.2 | Language of Parts | Language of each passage must be programmatically determinable. |
| 3.2.3 | Consistent Navigation | Navigational mechanisms must occur in same relative order each time. |
| 3.2.4 | Consistent Identification | Same functionality must be identified consistently. |
| 3.3.3 | Error Suggestion | Suggestions for correction must be provided for input errors. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | Submissions must be reversible, checked, or confirmed. |
| 4.1.3 | Status Messages | Status messages must be programmatically determinable via roles or properties. |

**Level AAA (Highest)**

The highest level of conformance. Not all content can satisfy AAA criteria.

Level AAA includes all Level A and AA criteria plus:

| SC | Name | Requirement |
|---|---|---|
| 1.2.6 | Sign Language (Pre-recorded) | Sign language interpretation for pre-recorded audio. |
| 1.2.7 | Extended Audio Description | Video paused for extended audio description. |
| 1.2.8 | Media Alternative (Pre-recorded) | Text alternative for all pre-recorded media. |
| 1.2.9 | Audio-only (Live) | Text alternative for live audio-only content. |
| 1.4.6 | Contrast (Enhanced) | Contrast ratio of 7:1 for normal text, 4.5:1 for large text. |
| 1.4.7 | Low or No Background Audio | Pre-recorded audio with minimal background noise. |
| 1.4.8 | Visual Presentation | User-selectable text/background colors, adjustable spacing. |
| 1.4.9 | Images of Text (No Exception) | Images of text prohibited entirely. |
| 2.1.3 | Keyboard (No Exception) | All functionality operable by keyboard without exception. |
| 2.2.3 | No Timing | Timing is not essential to the activity. |
| 2.2.4 | Interruptions | Interruptions can be postponed or suppressed. |
| 2.2.5 | Re-authenticating | Data preserved on re-authentication after session expiry. |
| 2.2.6 | Timeouts | Users warned of inactivity timeout duration. |
| 2.3.2 | Three Flashes | No content flashes more than 3 times per second anywhere. |
| 2.4.8 | Location | User's location within a set of pages is available. |
| 2.4.9 | Link Purpose (Link Only) | Link purpose determinable from link text alone. |
| 2.4.10 | Section Headings | Section headings used to organize content. |
| 2.4.12 | Focus Not Obscured (Enhanced) | Focus indicator not obscured by any content. |
| 2.4.13 | Focus Appearance | Focus indicator with 3:1 contrast, 2px perimeter thickness. |
| 2.5.5 | Target Size (Enhanced) | Target size at least 44x44 CSS pixels. |
| 2.5.6 | Concurrent Input Mechanisms | Input mechanisms must not be disabled unless essential. |
| 3.1.3 | Unusual Words | Mechanism for identifying unusual words, idioms, and jargon. |
| 3.1.4 | Abbreviations | Mechanism for identifying expanded forms of abbreviations. |
| 3.1.5 | Reading Level | Reading ability no more advanced than lower secondary education. |
| 3.1.6 | Pronunciation | Mechanism for identifying pronunciation of ambiguous words. |
| 3.2.5 | Change on Request | Changes of context initiated only by user request. |
| 3.3.5 | Help | Context-sensitive help is available. |
| 3.3.6 | Error Prevention (All) | All submissions must be reversible, checked, or confirmed. |


### 2.3 Success Criteria with Code Examples

#### SC 1.1.1 — Non-text Content (Level A)

Every non-text element must have a text alternative.

**Good: Informative image with alt text**

`html
<img src="chart-q4-results.png"
     alt="Bar chart showing Q4 2025 revenue of \.2M, a 15% increase over Q3." />

<a href="/report.pdf">
  <img src="download-icon.png" alt="Download Q4 2025 Report (PDF, 2.4 MB)" />
</a>

<figure>
  <img src="org-chart.png"
       alt="Organization chart. See long description below." />
  <figcaption>
    <a href="#org-chart-desc">Long description of organization chart</a>
  </figcaption>
</figure>
`

**Bad:**

`html
<img src="chart-q4-results.png" />
`

**ARIA fallback for complex images:**

`html
<div role="img" aria-label="Q4 2025 revenue bar chart showing 15% increase">
  <!-- SVG content here -->
</div>
`

#### SC 1.3.1 — Info and Relationships (Level A)

`html
<!-- Correct: proper heading hierarchy -->
<h1>Project Documentation</h1>
  <h2>Getting Started</h2>
    <h3>Installation</h3>
  <h2>API Reference</h2>
    <h3>Authentication</h3>

<!-- Correct: semantic lists -->
<ol>
  <li>Clone the repository</li>
  <li>Install dependencies</li>
  <li>Configure environment variables</li>
</ol>

<dl>
  <dt>Package Name</dt>
  <dd>hermes-agent</dd>
  <dt>Version</dt>
  <dd>2.4.0</dd>
</dl>

<!-- Correct: data table with proper associations -->
<table>
  <caption>Monthly revenue by quarter</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>\.6M</td>
      <td>+8%</td>
    </tr>
  </tbody>
</table>
`

#### SC 1.4.1 — Use of Color (Level A)

**Good:**

`html
<span class="status-success">
  <span class="status-icon">&#10003;</span>
  <span class="status-text">Passed</span>
</span>

<div class="form-field invalid">
  <label for="email">Email address</label>
  <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
  <span id="email-error" role="alert">Please enter a valid email address.</span>
</div>
`

**Bad:**

`html
<span style="color: green;">3 of 5 tests passed</span>
<input type="text" style="border-color: red;" />
`

#### SC 1.4.3 — Contrast (Minimum) (Level AA)

`css
body {
  color: #1a1a1a;
  background-color: #fff;
  /* Contrast ratio: 16.7:1 */
}

.note {
  color: #bbb;
  background-color: #fff;
  /* 1.9:1 — fails even AAA for large text */
}
`

**WCAG contrast calculation in JavaScript:**

`javascript
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const l1 = getLuminance(...color1);
  const l2 = getLuminance(...color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function isSufficient(color1, color2, level, largeText) {
  const ratio = getContrastRatio(color1, color2);
  const threshold = level === 'AAA'
    ? (largeText ? 4.5 : 7.0)
    : (largeText ? 3.0 : 4.5);
  return ratio >= threshold;
}
`

#### SC 2.1.1 — Keyboard (Level A)

`html
<button type="button" onclick="handleClick(event)">
  Submit Report
</button>
`

**Keyboard-accessible radio group:**

`javascript
function handleRadioKeydown(event) {
  const radios = event.currentTarget.querySelectorAll('[role="radio"]');
  const current = Array.from(radios).findIndex(
    r => r.getAttribute('aria-checked') === 'true'
  );
  let next = current;
  switch (event.key) {
    case 'ArrowUp': case 'ArrowLeft':
      next = (current - 1 + radios.length) % radios.length; break;
    case 'ArrowDown': case 'ArrowRight':
      next = (current + 1) % radios.length; break;
    default: return;
  }
  event.preventDefault();
  radios[current].setAttribute('aria-checked', 'false');
  radios[current].tabIndex = -1;
  radios[next].setAttribute('aria-checked', 'true');
  radios[next].tabIndex = 0;
  radios[next].focus();
}
`

#### SC 2.4.1 — Bypass Blocks (Level A)

`html
<a href="#main-content" class="skip-link">Skip to main content</a>
<nav aria-label="Main navigation"><!-- nav --></nav>
<main id="main-content"><!-- primary content --></main>
`

`css
.skip-link {
  position: absolute; top: -40px; left: 0;
  background: #000; color: #fff; padding: 8px; z-index: 100;
}
.skip-link:focus { top: 0; }
`

#### SC 2.4.7 — Focus Visible (Level AA)

`css
:focus { outline: 2px solid #4A90D9; outline-offset: 2px; }

button:focus-visible {
  outline: 3px solid #0066CC; outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
}

a:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }

input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: 2px solid #0066CC; border-color: #0066CC;
}
`

#### SC 3.3.1 — Error Identification (Level A)

`html
<div class="form-group">
  <label for="email">Email address</label>
  <input id="email" type="email" required
         aria-describedby="email-hint email-error" aria-invalid="true" />
  <span id="email-hint" class="hint">We'll never share your email.</span>
  <span id="email-error" class="error" role="alert">
    Please enter a valid email address (e.g., user@example.com).
  </span>
</div>

<div id="error-summary" role="alert" tabindex="-1">
  <h2 id="error-summary-title">There are 3 errors in your form.</h2>
  <ul>
    <li><a href="#name">Name is required</a></li>
    <li><a href="#email">Please enter a valid email</a></li>
  </ul>
</div>
`

#### SC 4.1.2 — Name, Role, Value (Level A)

`html
<div class="custom-select" role="listbox" aria-labelledby="select-label" tabindex="0">
  <span id="select-label">Choose a framework:</span>
  <div role="option" id="opt-1" aria-selected="false">React</div>
  <div role="option" id="opt-2" aria-selected="true">Vue</div>
</div>

<button aria-pressed="false"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
  Dark Mode
</button>
`

### 2.4 ARIA: Accessible Rich Internet Applications

ARIA supplements HTML semantics for dynamic content and complex UI widgets.

**The First Rule of ARIA:** Do not use ARIA if you can use native HTML.

`html
<!-- BAD -->
<div role="button" tabindex="0" onclick="submit()">Submit</div>
<div role="heading" aria-level="2">Section Title</div>

<!-- GOOD -->
<button type="submit">Submit</button>
<h2>Section Title</h2>
`

**ARIA Roles Categories:**

| Category | Example Roles |
|---|---|
| Widget | button, slider, tab, treeitem |
| Document Structure | article, heading, list, table |
| Landmark | banner, navigation, main, complementary |
| Live Region | alert, log, status, timer |
| Window | alertdialog, dialog |

**Essential ARIA States and Properties:**

| Attribute | Example |
|---|---|
| aria-label | aria-label=\"Close dialog\" |
| aria-labelledby | aria-labelledby=\"dialog-title\" |
| aria-describedby | aria-describedby=\"help-text\" |
| aria-expanded | aria-expanded=\"true\" |
| aria-controls | aria-controls=\"menu-panel\" |
| aria-hidden | aria-hidden=\"true\" |
| aria-current | aria-current=\"page\" |
| aria-selected | aria-selected=\"true\" |
| aria-checked | aria-checked=\"mixed\" |
| aria-pressed | aria-pressed=\"false\" |
| aria-disabled | aria-disabled=\"true\" |
| aria-invalid | aria-invalid=\"true\" |
| aria-required | aria-required=\"true\" |
| aria-live | aria-live=\"polite\" |
| aria-atomic | aria-atomic=\"true\" |

**ARIA Live Regions:**

`html
<div aria-live=\"polite\" aria-atomic=\"true\">Status updates</div>
<div aria-live=\"assertive\" role=\"alert\">Critical errors</div>
<div role=\"status\">Search returned 42 results.</div>
<div role=\"log\" aria-live=\"polite\" aria-relevant=\"additions\">Log entries</div>
`

**Accordion Pattern:**

`html
<div class=\"accordion\">
  <h3>
    <button aria-expanded=\"true\" aria-controls=\"section-1-content\" id=\"section-1-trigger\">
      Section 1
    </button>
  </h3>
  <div id=\"section-1-content\" role=\"region\" aria-labelledby=\"section-1-trigger\">
    <p>Content for section 1...</p>
  </div>
  <h3>
    <button aria-expanded=\"false\" aria-controls=\"section-2-content\" id=\"section-2-trigger\">
      Section 2
    </button>
  </h3>
  <div id=\"section-2-content\" role=\"region\" aria-labelledby=\"section-2-trigger\" hidden>
    <p>Content for section 2...</p>
  </div>
</div>
`


**Modal Dialog Pattern:**

`html
<div class="modal-backdrop" role="dialog" aria-modal="true"
     aria-labelledby="modal-title" aria-describedby="modal-description">
  <div class="modal-content">
    <h2 id="modal-title">Confirm Deletion</h2>
    <p id="modal-description">Are you sure? This action cannot be undone.</p>
    <button type="button" onclick="closeModal()">Cancel</button>
    <button type="button" onclick="confirmDelete()" class="danger">Delete</button>
  </div>
</div>
`

`javascript
function openModal(modalElement) {
  const lastFocused = document.activeElement;
  modalElement.style.display = 'block';
  modalElement.querySelector('[autofocus]')?.focus()
    || modalElement.querySelector('button')?.focus();
  document.body.style.overflow = 'hidden';

  modalElement.addEventListener('keydown', function trapFocus(e) {
    if (e.key === 'Escape') { closeModal(modalElement, lastFocused); return; }
    if (e.key !== 'Tab') return;
    const focusable = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

function closeModal(modalElement, targetToFocus) {
  modalElement.style.display = 'none';
  document.body.style.overflow = '';
  targetToFocus?.focus();
}
`

### 2.5 Semantic HTML and the Accessibility Tree

The accessibility tree is a subset of the DOM exposed to assistive technology.

`
DOM:  <div onclick="..." role="button" tabindex="0">Click</div>
A11y: [Button "Click"]

DOM:  <img src="photo.jpg" alt="Team photo at 2025 summit" />
A11y: [Image "Team photo at 2025 summit"]

DOM:  <div class="error" style="color: red;">Field is required</div>
A11y: [Generic "Field is required"] — not announced

DOM:  <div class="error" role="alert">Field is required</div>
A11y: [Alert "Field is required"]
`

**Landmark regions:**

`html
<header role="banner">
  <nav aria-label="Main">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>Post Title</h1>
  <article>
    <h2>Subsection</h2>
    <p>Content...</p>
  </article>
</main>
<aside aria-label="Related articles"><h2>Related</h2></aside>
<footer role="contentinfo">&copy; 2026 Project</footer>
`

### 2.6 Keyboard Navigation Patterns

| Key | Action |
|---|---|
| Tab | Move focus to next focusable element |
| Shift+Tab | Move focus to previous focusable element |
| Enter | Activate link/button |
| Space | Activate button, toggle checkbox |
| Arrow Keys | Navigate within widgets (radio, menu, tabs) |
| Escape | Close modal/dropdown/menu |
| Home/End | First/last item in a list |

**Roving Tabindex Pattern:**

`javascript
class RadioGroup {
  constructor(container) {
    this.container = container;
    this.radios = container.querySelectorAll('[role="radio"]');
    this.radios.forEach((radio, i) => {
      radio.addEventListener('keydown', (e) => this.handleKeydown(e, i));
      radio.addEventListener('click', () => this.select(i));
    });
    const checked = Array.from(this.radios).findIndex(
      r => r.getAttribute('aria-checked') === 'true'
    );
    this.select(checked >= 0 ? checked : 0);
  }

  select(index) {
    this.radios.forEach((radio, i) => {
      radio.setAttribute('aria-checked', i === index ? 'true' : 'false');
      radio.tabIndex = i === index ? 0 : -1;
    });
    this.radios[index]?.focus();
  }

  handleKeydown(event, index) {
    let next = index;
    switch (event.key) {
      case 'ArrowUp': case 'ArrowLeft':
        next = (index - 1 + this.radios.length) % this.radios.length;
        break;
      case 'ArrowDown': case 'ArrowRight':
        next = (index + 1) % this.radios.length;
        break;
      default: return;
    }
    event.preventDefault();
    this.select(next);
  }
}
`

### 2.7 Screen Reader Compatibility

| Reader | Platform | Cost |
|---|---|---|
| NVDA | Windows | Free, open source |
| JAWS | Windows | ~,000 |
| VoiceOver | macOS, iOS | Built-in, free |
| TalkBack | Android | Built-in, free |
| Narrator | Windows | Built-in, free |
| Orca | Linux | Free, open source |
| ChromeVox | ChromeOS | Built-in, free |

**Screen reader interpretation example:**

`html
<nav><a href="/">Home</a><a href="/docs">Docs</a></nav>
<main><h1>Accessibility Guide</h1><p>Content here.</p></main>
`
Announced as: "Navigation landmark. Home link. Docs link. Main landmark. Heading level 1: Accessibility Guide. Content here."

**Testing quick reference:**

| Check | How |
|---|---|
| All content accessible? | Navigate with Tab and Arrow keys |
| Headings correct? | Navigate by headings (H key) |
| Images described? | Navigate by objects (G key) |
| Links descriptive? | Navigate by links (K key) |
| Landmarks present? | Navigate by landmarks (D key) |
| Dynamic updates announce? | Trigger content, listen |
| Error messages conveyed? | Submit invalid form, listen |
| All actions performable? | Complete workflows without mouse |

### 2.8 Color Contrast Requirements

| Context | AA | AAA |
|---|---|---|
| Normal text | 4.5:1 | 7:1 |
| Large text (>=24px or >=19px bold) | 3:1 | 4.5:1 |
| UI components and graphical objects | 3:1 | N/A |

**Contrast check tools:**

| Tool | URL |
|---|---|
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Accessible Color Matrix | https://toolness.github.io/accessible-color-matrix/ |
| Colour Contrast Analyser | Desktop app by TPGi |
| axe DevTools | Browser extension by Deque |
| Lighthouse | Chrome DevTools |

**Common failures and fixes:**

`css
/* Fails */
input::placeholder { color: #bbb; }     /* 2.1:1 */
button:disabled { color: #a0a0a0; }    /* 2.9:1 */

/* Passes */
input::placeholder { color: #757575; }  /* 4.6:1 */
button:disabled { color: #666666; }     /* 4.2:1 */
a { color: #0056B3; }                   /* 5.4:1 */
`

### 2.9 Focus Management

| Scenario | Action |
|---|---|
| SPA page navigation | Focus main content heading or container |
| Modal opens | Focus first focusable element in dialog |
| Modal closes | Return focus to triggering element |
| Dynamic content loads | Focus new content or announce via live region |
| Error on form submit | Focus error summary or first invalid field |
| Menu opens | Focus first menu item |
| Menu closes | Return focus to menu trigger |

**Focus Trap for Modals:**

`javascript
class FocusTrap {
  constructor(container) {
    this.container = container;
    this.selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    this.previouslyFocused = null;
    this.handler = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = [...this.container.querySelectorAll(this.selector)]
        .filter(el => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
  }

  activate() {
    this.previouslyFocused = document.activeElement;
    this.container.addEventListener('keydown', this.handler);
    this.container.querySelector(this.selector)?.focus();
  }

  deactivate() {
    this.container.removeEventListener('keydown', this.handler);
    this.previouslyFocused?.focus();
  }
}
`

**Inert attribute for modals:**

`html
<div id="page-content" inert>Normal content</div>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm</h2>
  <button onclick="confirm()">OK</button>
</div>
`


---

## Part 3: Accessibility in UI Frameworks & Libraries

### 3.1 React Accessibility

**Core ARIA patterns in React:**

`jsx
function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div>
      <button
        id={triggerId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(!expanded)}>
        {title}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!expanded}>
        {children}
      </div>
    </div>
  );
}
`

**Focus trap hook:**

`jsx
function useFocusTrap(active) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    previousFocusRef.current = document.activeElement;
    const container = containerRef.current;
    if (!container) return;

    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => [...container.querySelectorAll(selector)]
      .filter(el => el.offsetParent !== null);

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    container.addEventListener('keydown', handleKeyDown);
    getFocusable()[0]?.focus();
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [active]);

  return containerRef;
}

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useFocusTrap(isOpen);
  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef}>
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
`

**Live region announcements in React:**

`jsx
function SearchResults({ query, results }) {
  const statusRef = useRef(null);
  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.textContent = '';
      setTimeout(() => {
        statusRef.current.textContent =
          ${results.length} results for "";
      }, 50);
    }
  }, [results, query]);

  return (
    <div>
      <div ref={statusRef} role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
      <ul role="listbox" aria-label={Results for ""}>
        {results.map((r, i) => (
          <li key={r.id} role="option" id={esult-}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
`

**Accessible form with error handling:**

`jsx
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  const errorSummaryRef = useRef(null);
  const nameId = useId();
  const emailId = useId();
  const nameErrId = useId();
  const emailErrId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newErrors = {};
    if (!data.get('name')) newErrors.name = 'Name is required';
    if (!data.get('email')) newErrors.email = 'Email is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => errorSummaryRef.current?.focus(), 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <div ref={errorSummaryRef} role="alert" tabIndex={-1}>
          <h2>{Object.keys(errors).length} error(s) found</h2>
          <ul>{Object.entries(errors).map(([f, m]) => (
            <li key={f}><a href={#}>{m}</a></li>
          ))}</ul>
        </div>
      )}
      <div>
        <label htmlFor={nameId}>Full Name</label>
        <input id={nameId} name="name" type="text"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? nameErrId : undefined} />
        {errors.name && <span id={nameErrId} role="alert">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} name="email" type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailErrId : undefined} />
        {errors.email && <span id={emailErrId} role="alert">{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
`

**React Router focus management:**

`jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useRouteA11y() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const heading = document.querySelector('main h1, main h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  }, [pathname]);
}

function RouteAnnouncer() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitle(document.title || location.pathname);
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {title && Navigated to }
    </div>
  );
}
`

### 3.2 Vue Accessibility

**ARIA tab component in Vue 3:**

`ue
<template>
  <div role="tablist" aria-label="Documentation tabs">
    <button v-for="tab in tabs" :key="tab.id" role="tab"
      :aria-selected="activeTab === tab.id"
      :aria-controls="'panel-' + tab.id"
      :tabindex="activeTab === tab.id ? 0 : -1"
      @click="activeTab = tab.id"
      @keydown="handleTabKeydown">
      {{ tab.label }}
    </button>
  </div>
  <div v-for="tab in tabs" :key="tab.id"
    :id="'panel-' + tab.id" role="tabpanel"
    :aria-labelledby="tab.id" :hidden="activeTab !== tab.id">
    <slot :name="tab.id" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ tabs: Array });
const activeTab = ref(props.tabs?.[0]?.id);

function handleTabKeydown(event) {
  const idx = props.tabs.findIndex(t => t.id === activeTab.value);
  let next;
  switch (event.key) {
    case 'ArrowRight': next = (idx + 1) % props.tabs.length; break;
    case 'ArrowLeft': next = (idx - 1 + props.tabs.length) % props.tabs.length; break;
    case 'Home': next = 0; break;
    case 'End': next = props.tabs.length - 1; break;
    default: return;
  }
  event.preventDefault();
  activeTab.value = props.tabs[next].id;
}
</script>
`

**Vue focus trap composable:**

`	ypescript
import { ref, watch, onUnmounted } from 'vue';

export function useFocusTrap(active: boolean) {
  const container = ref<HTMLElement | null>(null);
  const previousFocus = ref<HTMLElement | null>(null);
  const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusable(): HTMLElement[] {
    if (!container.value) return [];
    return Array.from(container.value.querySelectorAll(selector))
      .filter(el => (el as HTMLElement).offsetParent !== null) as HTMLElement[];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  watch(active, (isActive) => {
    if (isActive) {
      previousFocus.value = document.activeElement as HTMLElement;
      container.value?.addEventListener('keydown', handleKeydown);
      getFocusable()[0]?.focus();
    } else {
      container.value?.removeEventListener('keydown', handleKeydown);
      previousFocus.value?.focus();
    }
  });

  onUnmounted(() => container.value?.removeEventListener('keydown', handleKeydown));
  return { container };
}
`


### 3.3 Angular Accessibility

**Angular CDK A11yModule:**

`	ypescript
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { AppComponent } from './app.component';

@NgModule({
  imports: [A11yModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
`

**Focus trap with CDK:**

`	ypescript
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  template: 
    <div *ngIf="isOpen" class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)=".stopPropagation()">
        <h2 id="modal-title">Confirm Action</h2>
        <p>Are you sure?</p>
        <button (click)="confirm()">Confirm</button>
        <button (click)="close()">Cancel</button>
      </div>
    </div>
  
})
export class ModalComponent {
  @ViewChild('modalContent', { read: ElementRef }) modalContent: ElementRef;
  isOpen = false;
  private focusTrapFactory = inject(FocusTrapFactory);
  private focusTrap: any;

  open() {
    this.isOpen = true;
    setTimeout(() => {
      this.focusTrap = this.focusTrapFactory.create(this.modalContent.nativeElement);
      this.focusTrap.focusFirstTabbableElement();
    });
  }
  close() { this.isOpen = false; this.focusTrap?.destroy(); }
}
`

**LiveAnnouncer service:**

`	ypescript
import { Injectable, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Injectable({ providedIn: 'root' })
export class A11yService {
  private announcer = inject(LiveAnnouncer);
  announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
    this.announcer.announce(message, politeness);
  }
}
`

**ARIA directive:**

`	ypescript
@Directive({ selector: '[appExpandedSection]' })
export class ExpandedSectionDirective {
  @Input() expanded = false;
  @Input() sectionId: string;
  @HostBinding('attr.aria-expanded') get ariaExpanded() { return this.expanded; }
  @HostBinding('attr.aria-controls') get ariaControls() {
    return this.sectionId ? ${this.sectionId}-panel : null;
  }
}
`

### 3.4 Web Components and Shadow DOM Accessibility

**Forwarding ARIA through Shadow DOM:**

`javascript
class AccessibleButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = '<button part="button"><slot></slot></button>';
    const button = this.shadowRoot.querySelector('button');
    const observer = new MutationObserver(() => {
      ['aria-label', 'aria-expanded', 'aria-pressed'].forEach(attr => {
        if (this.hasAttribute(attr)) button.setAttribute(attr, this.getAttribute(attr));
      });
    });
    observer.observe(this, { attributes: true,
      attributeFilter: ['aria-label', 'aria-expanded', 'aria-pressed'] });
  }
}
customElements.define('accessible-button', AccessibleButton);
`

**ElementInternals for form participation:**

`javascript
class AccessibleInput extends HTMLElement {
  static formAssociated = true;
  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = '<input type="text" part="input" />';
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', () => {
      this._internals.setFormValue(input.value);
      this._internals.setValidity(
        input.validity.valid ? {} : { badInput: true },
        input.validationMessage, input
      );
      this._internals.ariaInvalid = !input.validity.valid ? 'true' : 'false';
    });
  }
}
`

**Shadow DOM a11y issues and solutions:**

| Issue | Solution |
|---|---|
| ARIA on host not forwarded | Use ElementInternals or manually forward |
| Focus styling hidden | Use :host(:focus-within) or :focus-visible |
| Labels cannot reference shadow content | Use aria-label on host |
| Light/shadow DOM interaction broken | Keep critical semantics in light DOM |

### 3.5 Mobile OSS Framework Accessibility

**React Native accessibility:**

`jsx
<TouchableOpacity
  onPress={onPress}
  accessibilityRole="button"
  accessibilityLabel={label}
  accessibilityHint={hint}
  accessibilityState={{ disabled: false }} >
  <Text>{label}</Text>
</TouchableOpacity>

<TextInput
  value={value}
  onChangeText={onChangeText}
  accessibilityLabel={label}
  accessibilityHint={Enter your }
  accessibilityInvalid={!!error} />

// Screen reader announcement
import { AccessibilityInfo } from 'react-native';
AccessibilityInfo.announceForAccessibility('Item deleted successfully');

// Focus management
const tag = findNodeHandle(ref.current);
AccessibilityInfo.setAccessibilityFocus(tag);
`

**Flutter accessibility:**

`dart
Semantics(
  button: true,
  label: 'Submit form',
  hint: 'Submits the current form data',
  enabled: !isDisabled,
  onTap: submitForm,
  child: ElevatedButton(
    onPressed: isDisabled ? null : submitForm,
    child: Text('Submit'),
  ),
)

// Live region
Semantics(
  liveRegion: true,
  child: Text('Error: Field is required'),
)

// Announcement
SemanticsService.announce('Form submitted successfully', TextDirection.ltr);
`

**Mobile accessibility testing tools:**

| Tool | Platform | Purpose |
|---|---|---|
| Accessibility Scanner | Android | Automated UI scanning |
| VoiceOver + Screen Curtain | iOS | Screen reader testing |
| TalkBack + BrailleBack | Android | Screen reader testing |
| axe DevTools Mobile | iOS, Android | Automated audit |
| Xcode Accessibility Inspector | iOS | Visualize a11y tree |
| Android Accessibility Test Framework | Android | Espresso a11y assertions |


---

## Part 4: Accessibility for Non-UI Projects

### 4.1 CLI Tools

**Color alternatives in CLI output:**

`python
import sys, os

def use_color():
    no_color = os.environ.get('NO_COLOR', '')
    if no_color: return False
    if not sys.stdout.isatty(): return False
    return True

STATUS_SYMBOLS = {
    'pass': '\u2713',      # checkmark
    'fail': '\u2717',      # X mark
    'warn': '\u26A0',      # warning
    'info': '\u2139',      # info
}

def format_status(status, message, use_color=True):
    symbol = STATUS_SYMBOLS.get(status, '?')
    if use_color:
        colors = {
            'pass': '\033[92m', 'fail': '\033[91m',
            'warn': '\033[93m', 'info': '\033[94m',
        }
        reset = '\033[0m'
        return f"{colors.get(status, '')}{symbol}{reset} {message}"
    return f"{symbol} {message}"
`

**Multiple output formats:**

`python
import json, csv, io

class CLIOutput:
    FORMATS = ['text', 'json', 'csv', 'markdown']

    def __init__(self, format='text'):
        if format not in self.FORMATS:
            raise ValueError(f"Format must be one of {self.FORMATS}")
        self.format = format

    def emit(self, results, columns=None):
        if self.format == 'json':
            print(json.dumps(results, indent=2))
        elif self.format == 'csv':
            output = io.StringIO()
            w = csv.DictWriter(output, fieldnames=columns or results[0].keys())
            w.writeheader(); w.writerows(results)
            print(output.getvalue().strip())
        elif self.format == 'markdown':
            cols = columns or list(results[0].keys())
            print('| ' + ' | '.join(cols) + ' |')
            print('| ' + ' | '.join(['---'] * len(cols)) + ' |')
            for item in results:
                print('| ' + ' | '.join(str(item.get(c, '')) for c in cols) + ' |')
        else:
            for item in results:
                for col in (columns or item.keys()):
                    print(f"  {col}: {item.get(col, '')}")
                print()
`

**CLI Accessibility Checklist:**

`
[x] All status conveyed by color also conveyed by symbols/text
[x] --no-color or  respected (https://no-color.org/)
[x] --format json|csv available for machine parsing
[x] Progress indicators don't rely on animation alone
[x] Error messages include actionable suggestions
[x] Tab completion available for arguments
[x] Long-running ops show ETA (not just spinner)
[x] --help is comprehensive and well-structured
`

### 4.2 Data Visualization

**Accessible chart with data table:**

`html
<figure role="group" aria-label="Quarterly revenue by region">
  <div aria-hidden="true">
    <canvas id="revenue-chart"></canvas>
  </div>
  <table>
    <caption>Quarterly Revenue in USD by Region (Q1-Q4 2025)</caption>
    <thead>
      <tr><th scope="col">Quarter</th><th scope="col">North America</th>
          <th scope="col">Europe</th><th scope="col">Asia Pacific</th>
          <th scope="col">Total</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Q1</th><td>.2M</td><td>.8M</td>
          <td>.5M</td><td>.5M</td></tr>
      <tr><th scope="row">Q2</th><td>.4M</td><td>.9M</td>
          <td>.6M</td><td>.9M</td></tr>
    </tbody>
  </table>
</figure>
`

**Chart alt text examples:**

`html
<img src="revenue-bars.png"
  alt="Bar chart: Q4 2025 revenue was .7M, a 12% increase over Q3.
       North America: .8M, Europe: .1M, Asia Pacific: .8M." />

<img src="user-growth.png"
  alt="Line chart: user growth from 10,000 in Jan 2025 to 45,000 in Dec 2025.
       Consistent growth of ~3,000 users per month." />
`

**D3.js accessible chart:**

`javascript
function accessibleChart(svgElement, data, options) {
  const svg = d3.select(svgElement);
  svg.attr('role', 'img').attr('aria-label', options.title);
  svg.append('title').text(options.title);
  svg.append('desc').text(options.description);

  svg.selectAll('.bar').data(data).enter()
    .append('rect').attr('class', 'bar')
    .append('title').text(d => ${d.label}: );

  // Off-screen data table
  const table = d3.select('body').append('table')
    .attr('class', 'sr-only')
    .attr('aria-label', options.title + ' - Data table');
  table.append('caption').text(options.title);
  // ... build table rows
}
`

**Chart.js accessibility plugin:**

`javascript
const a11yPlugin = {
  id: 'accessibility',
  beforeInit(chart) {
    chart.canvas.setAttribute('role', 'img');
    chart.canvas.setAttribute('aria-label',
      chart.options.plugins?.title?.text || 'Chart');
  },
  afterDraw(chart) {
    chart.data.datasets.forEach((dataset, dsIdx) => {
      chart.data.labels.forEach((label, idx) => {
        // Add title elements for screen readers
      });
    });
  }
};
`

**Sonification for data:**

`javascript
class DataSonifier {
  constructor(ctx) {
    this.ctx = ctx || new AudioContext();
  }

  playDataPoint(value, min, max, duration = 0.2) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = 220 + ((value - min) / (max - min)) * 660;
    gain.gain.value = 0.1 + ((value - min) / (max - min)) * 0.3;
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + duration);
  }

  playTrend(data) {
    const min = Math.min(...data), max = Math.max(...data);
    data.forEach((v, i) =>
      setTimeout(() => this.playDataPoint(v, min, max), i * 300));
  }
}
`

### 4.3 Documentation

**Accessible doc structure:**

`markdown
[Skip to content](#main-content)

<a name="main-content"></a>

## Introduction
Clear, concise.

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x

## Installation

### Using npm
`ash
npm install my-package
`
`

**HTML documentation a11y features:**

`html
<a href="#main-content" class="skip-link">Skip to main content</a>
<nav aria-label="Documentation navigation">
  <ul>
    <li><a href="#getting-started" aria-current="page">Getting Started</a></li>
    <li><a href="#api">API Reference</a></li>
  </ul>
</nav>
<main id="main-content">
  <h1>Getting Started</h1>
  <pre><code class="language-bash">npm install my-package</code></pre>
  <figure>
    <img src="architecture.png"
      alt="Architecture: CLI -> Core API -> Database. Requests flow downward.">
    <figcaption>Project architecture overview</figcaption>
  </figure>
</main>
`

**Accessible code blocks with copy button:**

`html
<div class="code-block-wrapper">
  <button class="copy-button" aria-label="Copy installation command"
    onclick="copyCode(this)">Copy</button>
  <pre><code class="language-javascript">const pkg = require('my-package');</code></pre>
</div>
`

### 4.4 API Design

**Accessible error messages:**

`json
// Bad
{ "error": "ERR_QUERY_FAILED", "message": "Operation failed" }

// Good
{
  "error": "INVALID_INPUT",
  "message": "The 'email' field must be a valid email address.",
  "field": "email",
  "expected_format": "user@example.com"
}

// Bad: opaque code
{ "code": "AUTH-403-0123" }

// Good: descriptive + actionable
{
  "error": "AUTHENTICATION_FAILED",
  "message": "API key is invalid or expired. Generate a new key at https://console.example.com/keys.",
  "docs_url": "https://docs.example.com/errors/auth-failed"
}

// Helpful 404 with suggestion
{
  "error": "ENDPOINT_NOT_FOUND",
  "message": "GET /api/getUserInfo not found. Did you mean GET /api/users/:id?",
  "suggestions": ["GET /api/users", "GET /api/users/:id"]
}
`

**GraphQL accessible schema:**

`graphql
"Represents a user in the system"
type User {
  "Unique identifier for the user"
  id: ID!
  "User's full display name"
  name: String!
  "User's email address (only visible to the user themselves)"
  email: String
}

input CreateUserInput {
  "Required: User's full name (2-100 characters)"
  name: String!
  "Required: Valid email address"
  email: String!
}
`

### 4.5 Developer Tools

**VS Code extension accessibility:**

`	ypescript
// Status bar with accessible name
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right, 100
);
statusBar.name = 'My Extension Status';
statusBar.text = ' Ready';
statusBar.tooltip = 'My Extension is active';
statusBar.show();

// Progress with percentage, not just spinner
vscode.window.withProgress({
  location: vscode.ProgressLocation.Notification,
  title: 'Processing files...',
  cancellable: true
}, async (progress, token) => {
  for (let i = 0; i <= 100; i += 10) {
    progress.report({ message: ${i}% complete, increment: 10 });
    await delay(100);
    if (token.isCancellationRequested) break;
  }
});
`

**Accessible diffs:**

`ash
# Bad: color-only diff
- line
+ line

# Good: symbols + color
- old line
+ new line

# git-delta config for accessibility
[delta]
    side-by-side = false
    line-numbers = true
    keep-plus-minus-markers = true
`



---

## Part 5: Inclusive Design in OSS Communities


### 5.1 Accessibility-First Contribution Guidelines

`
## Accessibility in Contributions

This project is committed to accessibility. All contributors must follow these guidelines:

### Code Contributions

- All UI components must be keyboard-navigable.
- Color must never be the sole means of conveying information.
- All images must have descriptive alt text in pull request descriptions.
- All form inputs must have associated labels.
- Semantic HTML must be preferred over ARIA where possible.
- Automated a11y tests must pass before merging.

### Documentation Contributions

- All new documentation pages must have a proper heading hierarchy (h1 > h2 > h3).
- All technical diagrams must include alt text or a data table.
- Code examples must be inside fenced code blocks with language identifiers.
- Links must have descriptive text (not just "click here").

### Review Process

- Every PR must include an accessibility impact assessment.
- PRs with UI changes require keyboard navigation verification.
- PRs with visual changes should be tested with NVDA or VoiceOver.
- Accessibility reviewers designated for each release cycle.
`

### 5.2 Making Issues and PRs Accessible

**Accessible bug report template:**

`
---
name: Bug report
labels: bug
---

## Bug Description
[Describe the bug clearly. Do not rely solely on visual references.]

## Steps to Reproduce
1. Go to '...'
2. Press Tab to navigate to '...'
3. Activate '...' using keyboard or screen reader
4. Observe that '...'

## Expected Behavior
[What should happen.]

## Actual Behavior
[What actually happens, including error messages verbatim.]

## Environment
- Device: [e.g., Desktop, iPhone 15]
- OS: [e.g., Windows 11, macOS 15]
- Browser: [e.g., Chrome 125, Firefox 127]
- Assistive Technology: [e.g., NVDA 2024.1, VoiceOver]
- Dark mode/high contrast: [if applicable]
`

**Accessible PR template:**

`
---
name: Pull request
---

## Description
[What this PR does — include relevant issue numbers.]

## Accessibility Impact Assessment
- [ ] No UI or user-facing behavior change
- [ ] New UI components (needs a11y review)
- [ ] Modified existing UI components (needs regression check)
- [ ] Visual changes (diagrams, charts)
- [ ] New documentation pages
- [ ] Changes keyboard navigation or focus management
- [ ] Adds or modifies ARIA attributes
- [ ] Changes color or contrast
- [ ] Adds animations or dynamic content

## Verification
- [ ] All automated a11y checks pass
- [ ] Tab order is logical (tested manually)
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader navigates through all content
- [ ] Color is not sole means of conveying information
- [ ] All images have descriptive alt text

## Related Issues
Closes #...
`

**Accessible review comments:**

`
## Not accessible:
"The button looks weird — the blue is too light."

## Accessible:
"The primary action button ('Submit') has insufficient color contrast.
Button text (#7FB4E0) on white (#FFFFFF) has ratio 2.8:1, failing WCAG AA
minimum 4.5:1. Suggested fix: use #0056B3 for 5.4:1 ratio."

## Not accessible:
"The layout is broken on mobile."

## Accessible:
"The contributor table overflows the viewport below 768px, requiring
horizontal scrolling both ways. Add overflow-x: auto and role='region'
with aria-label. See SC 1.4.10 (Reflow)."
`


### 5.3 Accessible Communication Channels

**Text-First Communication:**

- GitHub Issues/PRs: Primary venue. Text-based, searchable, accessible.
- Mailing lists: Fully accessible via screen reader.
- Chat: Appropriate for quick questions, not blocking decisions.
- Meetings: Provide agenda 48h in advance, enable live captions, record.

**Chat Platform Accessibility Checklist:**

- Channel topics and descriptions are clear.
- Pinned items are labeled and described.
- Bots indicate themselves with [BOT] tag.
- Announcements also sent to a text channel.
- Messages do not auto-delete (respect user reading speed).
- No reaction-gated content.
- Attachments have descriptions.
- Code blocks use proper formatting with language tags.
- Default notification mode is "Mentions only".
- @everyone/@channel used sparingly (< 1/week).

### 5.4 Remote and Async Contributions for Accessibility

**Async Workflow:**

1. **Proposal** — Open an issue with your proposal.
   - Clear, descriptive titles.
   - Explain the problem and solution.
   - Tag relevant maintainers.

2. **Discussion period** — Minimum 72 hours for feedback.
   Everyone has time to review regardless of time zone or schedule.

3. **Decision** — Maintainer posts a summary and the decision reached.

4. **Implementation** — PR opened referencing the decision issue.

**Time Zone Considerations:**

- Meeting times rotate to accommodate different regions.
- Always provide async alternatives for all decisions.
- "Last call" periods extend when a contributor needs more time.
- Maintainers distributed across at least 3 time zones.

### 5.5 Neurodiversity in OSS

**Neurodiversity-Affirming Practices:**

| Preference | Support |
|---|---|
| Direct communication | Encouraging clear, literal language |
| Structured formats | Templates for issues, PRs, discussions |
| Written over spoken | Async-first; meetings recorded and transcribed |
| Processing time | Minimum 72h for proposal feedback |
| Reduced notifications | Default to mentions-only |
| Clear expectations | Labeling difficulty, time commitment, prerequisites |

**Reducing Cognitive Load:**

**Issue Tracking:**
- Use consistent labels: good-first-issue, help-wanted, blocked, accessibility.
- One issue per concern (no compound issues).
- Keep descriptions concise but complete.
- Link to relevant discussions and code.

**Pull Requests:**
- Keep PRs focused on one concern (200-400 lines max).
- Use draft PRs for early feedback.
- Write clear, step-by-step review instructions.
- Include screenshots with alt text for UI changes.

**Onboarding:**
- Step-by-step contribution walkthrough.
- Mentorship pairing for first contributions.
- Glossary of project-specific terms.
- Current README with accurate setup instructions.

### 5.6 Language Accessibility in Global Communities

**Plain Language Guidelines:**

- Use plain language (CFER B1/B2 level — intermediate).
- Define acronyms on first use: "API (Application Programming Interface)."
- Avoid idioms and cultural references:
  - Bad: "This is a piece of cake."
  - Good: "This is straightforward to implement."
- Use short sentences (under 25 words where possible).
- Use active voice: "The function returns" not "is returned by."

**RTL Language Support with CSS Logical Properties:**

`css
.card {
  margin-inline-start: 0;
  margin-inline-end: 16px;
  padding-inline: 24px;
  text-align: start;
}
`

**Locale-Aware Formatting in JavaScript:**

`javascript
const dateFormatter = new Intl.DateTimeFormat(userLocale, {
  dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC'
});
const numberFormatter = new Intl.NumberFormat(userLocale, {
  style: 'decimal', maximumFractionDigits: 2
});
const currencyFormatter = new Intl.NumberFormat(userLocale, {
  style: 'currency', currency: 'USD'
});
`

**Translation Support:**

- Documentation site supports machine translation via browser APIs.
- Code comments in English; avoid wordplay and cultural references.
- Translation PRs follow same review process as code PRs.
- Use locale-specific language codes (es-ES, pt-BR, zh-CN, zh-TW).


---

## Part 6: Testing for Accessibility

### 6.1 Automated A11y Testing Tools

**axe-core in Puppeteer:**

`javascript
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function runAxe(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.goto(url, { waitUntil: 'networkidle0' });

  const results = await new AxePuppeteer(page)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();

  console.log(results.violations.length + ' violations found.');
  results.violations.forEach(v => {
    console.log('\nViolation: ' + v.id);
    console.log('  Impact: ' + v.impact);
    console.log('  Description: ' + v.description);
    console.log('  Help: ' + v.helpUrl);
    v.nodes.forEach(n => {
      console.log('  Element: ' + n.html);
      console.log('  Failure Summary: ' + n.failureSummary);
    });
  });

  await browser.close();
  return results;
}
`

**axe-core in Cypress:**

`javascript
describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Home page has no critical violations', () => {
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] });
  });

  it('Navigation is keyboard accessible', () => {
    cy.checkA11y('nav', {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag21a'] }
    });
  });

  it('Forms have associated labels', () => {
    cy.get('form').each(form => {
      cy.wrap(form).checkA11y(null, { runOnly: ['label'] });
    });
  });
});
`

**axe-core in Playwright:**

`javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should not have critical a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('modal dialog should trap focus', async ({ page }) => {
  await page.goto('/');
  await page.click('#open-modal');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]').analyze();
  expect(results.violations).toEqual([]);
});
`

**Lighthouse Accessibility Audit:**

`javascript
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info', output: 'json',
    onlyCategories: ['accessibility'], port: chrome.port
  };
  const runnerResult = await lighthouse(url, options);
  const score = runnerResult.lhr.categories.accessibility.score * 100;
  console.log('Lighthouse A11y Score: ' + score);
  await chrome.kill();
  return runnerResult.lhr;
}
`

**Pa11y CI Configuration:**

`json
{
  "defaults": {
    "timeout": 30000,
    "viewport": { "width": 1280, "height": 1024 },
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "hideElements": [".cookie-banner"],
    "ignore": ["notice", "warning"]
  },
  "urls": [
    "https://example.com/docs/getting-started",
    "https://example.com/docs/api"
  ]
}
`

### 6.2 CI/CD Integration for Accessibility Checks

**GitHub Actions integration:**

`yaml
name: Accessibility Checks
on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        run: npx @lhci/cli@0.14.x autorun
      - name: Run pa11y
        run: npx pa11y-ci --config .pa11yci
      - name: Run axe-core tests
        run: npx playwright test --grep @a11y


### 6.3 Manual Testing: Screen Reader Testing (NVDA, VoiceOver, JAWS)

**NVDA Testing Workflow (Windows):**

1. Start NVDA (Ctrl+Alt+N).
2. Navigate to the page/feature being tested.
3. Use Tab to move through interactive elements.
4. Use H to navigate by headings.
5. Use K to navigate by links.
6. Use D to navigate by landmarks.
7. Use G to navigate by images.
8. Use B to navigate by buttons.
9. Test all user workflows (form submission, navigation, modal dialogs).
10. Listen for: missing labels, unclear announcements, broken navigation.

**VoiceOver Testing Workflow (macOS/iOS):**

1. Turn on VoiceOver (Cmd+F5 on macOS, Settings > Accessibility on iOS).
2. Use Ctrl+Option+Arrow keys (macOS) or swipe gestures (iOS) to navigate.
3. Rotor: Use Ctrl+Option+U to open rotor for quick navigation.
4. Test with Screen Curtain (triple-tap with 3 fingers on iOS) for blind simulation.
5. Verify: all elements reachable, all actions performable, content understandable.

**JAWS Testing Workflow (Windows):**

1. Start JAWS.
2. Use Insert+Tab to read current element.
3. Use Insert+F5 to list form fields.
4. Use Insert+F6 to list headings.
5. Use Insert+F7 to list links.
6. Verify compatibility with JAWS-specific behavior (forms mode, virtual cursor).

**Screen Reader Testing Checklist:**

- All text content is readable by the screen reader.
- All images have appropriate alt text or are marked decorative.
- All form inputs have associated labels.
- Error messages are announced (role='alert' or aria-live).
- Dynamic content changes are announced.
- Navigation order is logical.
- No element has a missing or incorrect role.
- Custom widgets (tabs, accordions, modals) work correctly.
- Focus is managed properly during dynamic changes.

### 6.4 Keyboard-Only Testing Workflow

**Complete Keyboard Testing Protocol:**

1. Start at the top of the page.
2. Press Tab repeatedly — does focus move in a logical order?
3. Is there a visible focus indicator on every element?
4. Can you reach all interactive elements?
5. Can you activate all buttons (Enter or Space)?
6. Can you navigate all links (Enter)?
7. Can you operate all form controls (checkboxes, radio buttons, selects)?
8. Can you dismiss any dialogs/popups (Escape)?
9. Can you navigate menus (Arrow keys, Escape)?
10. For data tables: can you navigate cells with Arrow keys?
11. For tab panels: can you switch tabs with Arrow keys?
12. Test with different zoom levels (100%, 200%, 400%).
13. Test with browser text size set to Large.

**Keyboard Testing Results Log:**

`
Page: /docs/getting-started
Date: 2026-05-19
Tester: [name]

| Test Case | Result | Notes |
|---|---|---|
| Tab order is logical | Pass/Fail | |
| Skip link present and works | Pass/Fail | |
| All buttons keyboard-accessible | Pass/Fail | |
| All links focusable | Pass/Fail | |
| Forms fully keyboard-operable | Pass/Fail | |
| Dropdowns/menus keyboard-operable | Pass/Fail | |
| Modals close with Escape | Pass/Fail | |
| Focus indicator visible at all times | Pass/Fail | |
| No keyboard traps | Pass/Fail | |
`

### 6.5 Mobile Accessibility Testing

**Mobile Testing Checklist:**

`
## iOS (VoiceOver)
- [ ] All elements have proper accessibility labels
- [ ] All actions have accessibility hints
- [ ] Custom gestures have keyboard alternatives
- [ ] Focus order is logical when swiping
- [ ] Dynamic content announcements work
- [ ] Screen curtain test passes (state is navigable)
- [ ] Orientation changes preserved (portrait/landscape)

## Android (TalkBack)
- [ ] All elements have proper content descriptions
- [ ] Touch target size meets 48dp minimum
- [ ] Focus navigation works with directional pad
- [ ] Live regions announce updates
- [ ] Accessibility action framework used where appropriate
- [ ] System font size and display size scale correctly
- [ ] TalkBack gesture navigation works throughout

## General Mobile A11y
- [ ] Not reliant on hover interactions
- [ ] Touch targets at least 44x44 CSS pixels (SC 2.5.8/2.5.5)
- [ ] Not reliant on orientation (portrait/landscape both work)
- [ ] Motion actuation has UI alternatives
- [ ] Pointer gestures have single-point alternatives
- [ ] Accessible with device accessibility shortcuts enabled
`

### 6.6 User Testing with People with Disabilities

**Recruitment Guidelines:**

- Partner with disability advocacy organizations for recruitment.
- Pay testers for their time and expertise (minimum -75/hr).
- Recruit a diverse range of disabilities (blind, low vision, deaf, hard of hearing, motor, cognitive).
- Include both assistive technology power users and casual users.
- Recruit people who use different assistive technologies (NVDA, JAWS, VoiceOver, TalkBack, Dragon NaturallySpeaking, switch control).

**Testing Protocol:**

1. Obtain informed consent explaining the purpose and process.
2. Prepare accessible test materials (plain text, screen-reader friendly).
3. Define realistic tasks, not generic "find the button" tasks.
4. Ask testers to think aloud as they work.
5. Record sessions (video + screen reader audio, with permission).
6. Ask follow-up questions about their experience.
7. Prioritize findings: what blocked the user vs. what was merely annoying.

**Post-Testing Analysis:**

- Compile a list of all accessibility barriers encountered.
- Classify by severity: critical (completely blocked), serious (very difficult), moderate (difficult), minor (annoyance).
- Map each issue to a WCAG success criterion.
- Create actionable bug reports for each issue.
- Share findings with the development team in an accessible format.

### 6.7 Accessibility Regression Testing

**Preventing A11y Regressions:**

1. **Automated gate:** All PRs must pass axe-core and lighthouse a11y checks in CI.
2. **Visual regression diffs:** Include a11y tree diffs (using tools like storycap + reg-suit).
3. **Component-level tests:** Individual components have a11y assertions using testing-library.
4. **Integration tests:** Critical user flows have keyboard-only and screen-reader walkthroughs.
5. **Smoke tests:** Before each release, run full a11y audit on all pages.

**A11y Regression Test Suite Structure:**

`
tests/
  accessibility/
    axe-core/
      homepage.test.js
      login.test.js
      dashboard.test.js
    keyboard/
      navigation.test.js
      forms.test.js
      modals.test.js
    screen-reader/
      announcements.test.js
      focus-management.test.js
      live-regions.test.js
    visual/
      contrast.test.js
      zoom.test.js
`

**Example regression test:**

`javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Login form has no a11y violations', async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Modal dialog maintains focus trap after re-render', async () => {
  const { container, rerender } = render(<Modal isOpen={true} />);
  const button = screen.getByText('Close');
  button.focus();
  rerender(<Modal isOpen={true} />);
  expect(document.activeElement).toBe(button);
});
`


---

## Part 7: Accessibility in Documentation

### 7.1 Document Accessibility Standards

**Key standards for accessible documents:**

| Standard | Scope | Key Requirements |
|---|---|---|
| PDF/UA (ISO 14289) | PDF documents | Tagged PDF, reading order, language, alt text |
| WCAG 2.1/2.2 | Web content | Documents published as HTML must meet WCAG |
| EN 301 549 | ICT accessibility | Documents in public sector must be accessible |

**HTML documentation checklist:**

- Proper heading hierarchy (h1 > h2 > h3, never skip levels).
- One h1 per page matching the page title.
- Descriptive link text (not "read more" or "click here").
- Alt text on all images, diagrams, and screenshots.
- Code blocks use <pre><code> with language class.
- Tables have caption, th scope, thead, tbody.
- Color not used as the only way to convey information.
- Sufficient color contrast in code syntax highlighting.
- Responsive design works at 200% zoom without horizontal scroll.
- Skip navigation link at page top.

**PDF document checklist:**

- Document properties include title, author, subject, language.
- PDF is tagged with correct reading order.
- All headings mapped to standard tags (H1, H2, H3).
- Lists use List and LBody tags.
- Tables have TH, TD, headers, and scope attributes.
- All images have alternate text.
- Color is not the sole means of conveying information.
- Sufficient color contrast.
- No reliance on watermarks for information.
- Document passes Adobe Acrobat accessibility checker.

### 7.2 Alt Text Guidelines for Technical Diagrams

**General alt text rules:**

- Be descriptive but concise (1-2 sentences).
- Describe the content and purpose, not the appearance.
- Include key data points, trends, and relationships.
- Use "graph of" / "diagram of" / "screenshot of" as appropriate.
- End with a period.

**Examples by type:**

```
Architecture diagram:
"Architecture diagram showing three layers: CLI interface, Core API,
and Database. User requests flow from CLI to Core API to Database and back."

Bar chart:
"Bar chart comparing quarterly revenue: Q1 $2.5M, Q2 $2.9M, Q3 $3.3M,
Q4 $3.7M. Steady upward trend throughout the year."

Flowchart:
"Flowchart of the user authentication process: User submits credentials,
system validates, if valid redirect to dashboard, if invalid show error."

Screenshot:
"Screenshot of the project settings page showing the API key section
with a 'Generate New Key' button and a list of existing keys."

Code block:
"Code example showing the configuration of environment variables
using a .env file with DATABASE_URL and API_KEY entries."

Network diagram:
"Network topology showing a load balancer distributing traffic across
three application servers connected to a primary database with a
read replica."
```

**Complex diagram approach:**

```html
<figure>
  <img src="ci-pipeline.png"
       alt="CI/CD pipeline workflow. See data table below for step details.">
  <figcaption>
    <details>
      <summary>CI/CD Pipeline Steps (accessible description)</summary>
      <ol>
        <li>Code push triggers pipeline</li>
        <li>Lint and format check</li>
        <li>Unit tests run</li>
        <li>Integration tests run</li>
        <li>Build and package</li>
        <li>Deploy to staging</li>
        <li>E2E tests on staging</li>
        <li>Deploy to production</li>
      </ol>
    </details>
  </figcaption>
</figure>
```

### 7.3 Accessible Code Examples

**Code block best practices:**

```
- Always specify the language in fenced code blocks with ```javascript etc.
- Use descriptive filenames or context before the code block.
- Keep line lengths reasonable (80 chars max for readability).
- Avoid using color alone to highlight important parts.
- Use comments to explain complex sections within the code.
- When showing errors, show both the error-producing code and the fix.
- For CLI output, use "text" or "bash" as the language identifier.
```

**Accessible syntax highlighting:**

Choose a theme that meets WCAG AA contrast ratios.

### 7.4 Documentation Format Accessibility

**Markdown considerations:**

- Markdown natively produces semantic HTML when rendered properly.
- Use heading levels correctly (no skipping from h2 to h4).
- Use ordered lists for sequential steps, unordered for non-sequential.
- Use table syntax that renders with proper scope attributes.
- Use alt text in image syntax: ![alt text](image.png)
- Avoid HTML tables in Markdown — harder to maintain.

**HTML documentation generators:**

- **Docusaurus:** Semantic HTML, proper headings, skip links.
- **VitePress:** Good heading structure, responsive out of the box.
- **MkDocs with Material:** Produces accessible HTML output.
- **Storybook:** Built-in a11y addon, component docs need review.

### 7.5 Translation and Language Accessibility

**Translation workflow:**

1. Write all content in plain English first.
2. Create a translation guide with glossary of terms.
3. Use translation management platforms (Crowdin, Transifex, Weblate).
4. Maintain context for translators (screenshots, max length notes).
5. Review translations for technical accuracy.
6. Test translated pages with screen readers in the target language.

**Language-specific considerations:**

- CJK (Chinese, Japanese, Korean): Font sizes may need adjustment.
- RTL (Arabic, Hebrew, Urdu): Test layout mirroring thoroughly.
- German: Compound words may break layout; plan for longer strings.
- Spanish/French: Accented characters must display correctly.
- Emoji: Not all screen readers announce emoji; use text equivalents.


---

## Part 8: Templates

### 8.1 Accessibility Statement Template for OSS Projects

```markdown
# Accessibility Statement

**Project:** [Project Name]
**Statement last updated:** [Date]

## Commitment

[Project Name] is committed to ensuring digital accessibility for people
with disabilities. We are continually improving the user experience for
everyone and applying the relevant accessibility standards.

## Conformance Status

The [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
define requirements for designers and developers to improve accessibility
for people with disabilities. [Project Name] aims to conform to:

- [ ] WCAG 2.2 Level A
- [x] WCAG 2.2 Level AA
- [ ] WCAG 2.2 Level AAA

## What We Are Doing

To ensure accessibility, we have:

- [ ] Integrated automated accessibility testing (axe-core) into CI/CD
- [ ] Established keyboard-only testing as part of PR review
- [ ] Published accessibility contribution guidelines
- [ ] Designated accessibility reviewers in the maintainer team
- [ ] Provided alt text guidance for contributors
- [ ] Developed accessible documentation templates

## Known Limitations

Despite our best efforts, some areas may still have accessibility issues:

| Area | Issue | Status | Target Fix Date |
|---|---|---|---|
| Example | Description | In Progress | 2026-Q3 |

Please [open an issue](link) if you encounter any barriers.

## Feedback

We welcome your feedback on the accessibility of [Project Name].
Please let us know if you encounter accessibility barriers:

- **GitHub Issues:** [link to issue tracker with accessibility label]
- **Email:** [email address]
- **Contact form:** [link]

We try to respond to feedback within [X] business days.

## Technical Specifications

Accessibility of [Project Name] relies on the following technologies
to work with assistive technology:

- HTML
- WAI-ARIA
- CSS
- JavaScript

These technologies are relied upon for conformance with accessibility
standards.

## Assessment Approach

[Project Name] assessed accessibility using the following approaches:

- **Self-evaluation:** Conducted by the project maintainers
- **Automated testing:** axe-core, Lighthouse, Pa11y
- **Manual testing:** Keyboard-only, NVDA screen reader, VoiceOver
- **External audit:** [If applicable]

## Date

This statement was created on [Date] using the OSS Accessibility
Statement Template.
```

### 8.2 A11y Issue Template

```markdown
---
name: Accessibility issue
description: Report an accessibility barrier
labels: accessibility
---

## Accessibility Issue

### WCAG Criterion
<!-- Which WCAG success criterion does this relate to? -->
<!-- e.g., SC 1.1.1 Non-text Content, SC 2.4.7 Focus Visible -->

### Description
<!-- Describe the accessibility barrier. Be specific. -->

### Current Behavior
<!-- What is happening that is inaccessible? -->

### Expected Behavior
<!-- What should happen to be accessible? -->

### Steps to Reproduce
1. Using [keyboard / NVDA / VoiceOver / JAWS / TalkBack]
2. Navigate to [page / component]
3. Perform [action]
4. Observe [inaccessible behavior]

### Environment
- Device: [Desktop, iPhone 15, Pixel 8, etc.]
- OS: [Windows 11, macOS 15, iOS 18, Android 15]
- Browser: [Chrome 125, Firefox 127, Safari 18, Edge 125]
- Assistive Technology: [NVDA 2024.1, VoiceOver, JAWS 2025, TalkBack]
- Zoom level: [100%, 200%, 400%]

### Screenshots or Screen Recordings
<!-- If applicable, add screenshots with descriptive alt text. -->

### Code Reference
<!-- If applicable, link to the relevant code or component. -->

### Suggested Fix
<!-- If you have ideas about how to fix this, share them here. -->
```

### 8.3 Accessibility Testing Checklist

**Pre-Deployment A11y Checklist:**

```
## Automated Checks
- [ ] axe-core scan: 0 critical violations
- [ ] Lighthouse a11y score >= 90
- [ ] Color contrast: all text passes WCAG AA
- [ ] Tab order: automated check passes

## Keyboard Checks
- [ ] All interactive elements reachable via Tab
- [ ] All actions performable with keyboard
- [ ] Visible focus indicator on all elements
- [ ] No keyboard traps
- [ ] Custom widgets follow ARIA keyboard patterns

## Screen Reader Checks
- [ ] Content reads in logical order
- [ ] All images have appropriate alt text
- [ ] Form inputs have associated labels
- [ ] Error messages announced
- [ ] Dynamic content changes announced
- [ ] Landmarks present and labeled
- [ ] Headings correctly structured

## Visual Checks
- [ ] Color not used as sole information carrier
- [ ] Text resizable to 200% without loss
- [ ] Content responsive at 320px width
- [ ] High contrast mode supported
- [ ] Reduced motion respected (prefers-reduced-motion)

## Content Checks
- [ ] Links have descriptive text
- [ ] Headings describe content accurately
- [ ] Instructions not reliant on sensory characteristics
- [ ] Language attribute set on page
- [ ] Acronyms defined on first use
```

### 8.4 Inclusive Language Guide for OSS Projects

**Terminology Guidelines:**

```
## Use Instead Of

| Use | Avoid |
|---|---|
| Primary / Secondary | Master / Slave |
| Allowlist / Blocklist | Whitelist / Blacklist |
| Main / Primary | Master |
| Disabled / Disable | Turn off / Deactivate (specific) |
| They / Their | He / She (when unknown) |
| Users / Folks / Everyone | Guys |
| Parent / Guardian | Mother / Father |
| Chairperson / Chair | Chairman |
| Artificial intelligence | AI (defined on first use) |
| People with disabilities | The disabled (person-first) |
| Blind / low vision users | The blind |
| Deaf / hard of hearing users | The deaf |
| Neurodivergent users | The neurodivergent |

## General Principles

1. Use person-first language: "people with disabilities" not "disabled people"
   (unless individuals express preference for identity-first language).
2. Avoid ableist metaphors: "tone deaf," "blind to," "crippled by," "lame."
3. Use clear, literal language instead of idioms.
4. Define all acronyms and technical jargon on first use.
5. Consider the global audience: avoid culture-specific references.
6. Use the singular "they" as a gender-neutral pronoun.
7. Avoid ageist language ("young and energetic," "grandfather clause").
8. Avoid military metaphors ("kill your darlings," "shoot the messenger").
9. Use "run" instead of "execute" where possible.
10. Use "stop" or "end" instead of "kill" for processes.

## Code Comments

```javascript
// Good: inclusive
// Use this function to stop a background process.
function stopProcess(id) { ... }

// Avoid: violent metaphor
// Kill the process.
function killProcess(id) { ... }

// Good: clear and literal
// Check if the user has permission to access this resource.
function checkAccess(user, resource) { ... }
```
```

### 8.5 Accessibility Review Checklist for PRs

```markdown
## PR Accessibility Review Checklist

**PR Number:** [#]
**Reviewer:** [Name]
**Date:** [Date]

### 1. Impact Assessment

- [ ] This PR changes UI components
- [ ] This PR introduces new interactive elements
- [ ] This PR modifies focus management
- [ ] This PR changes keyboard navigation
- [ ] This PR adds/modifies ARIA attributes
- [ ] This PR changes visual design (colors, layout)
- [ ] This PR adds animations or dynamic content
- [ ] This PR adds images or diagrams
- [ ] This PR adds new documentation

### 2. Automated Checks

- [ ] axe-core scan passed on changed pages
- [ ] No new color contrast violations
- [ ] No new heading structure issues
- [ ] No new label/name issues

### 3. Manual Checks

- [ ] Tab through all new/modified elements — logical order?
- [ ] All interactive elements have visible focus indicators?
- [ ] New buttons/links respond to Enter and Space?
- [ ] Custom widgets follow expected keyboard pattern?
- [ ] Screen reader announces new content correctly?
- [ ] Error states properly communicated?
- [ ] Images have appropriate alt text?

### 4. Code Review

- [ ] Semantic HTML used over ARIA where possible?
- [ ] ARIA attributes correctly applied (not overridden)?
- [ ] Focus management includes return focus logic?
- [ ] Color is not sole means of conveying information?
- [ ] prefers-reduced-motion respected for animations?
- [ ] Touch targets minimum 44x44 CSS pixels?

### 5. Documentation

- [ ] PR description includes a11y impact assessment?
- [ ] Screenshots include alt text?
- [ ] New features documented with accessible examples?

### Decision

- [ ] Approve — no accessibility concerns
- [ ] Approve with suggestions — minor improvements noted
- [ ] Request changes — accessibility barriers identified

### Comments

[Add specific accessibility feedback here.]
```

### 8.6 Keyboard Navigation Testing Script

```javascript
// Keyboard navigation test script
// Run in browser console or as a Playwright/Puppeteer test

async function testKeyboardNavigation() {
  const results = [];
  const interactiveSelectors = [
    'a[href]',
    'button',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[role="option"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="switch"]',
  ];

  const interactiveElements = document.querySelectorAll(interactiveSelectors.join(','));

  // Test 1: All interactive elements are focusable
  const nonFocusable = [];
  interactiveElements.forEach(el => {
    el.setAttribute('data-testid', 'focus-check');
    el.focus();
    if (document.activeElement !== el) {
      nonFocusable.push({
        tag: el.tagName,
        text: el.textContent?.trim().substring(0, 50),
        selector: getSelector(el)
      });
    }
    el.removeAttribute('data-testid');
  });

  results.push({
    test: 'All interactive elements focusable',
    pass: nonFocusable.length === 0,
    failures: nonFocusable
  });

  // Test 2: Focus indicators are visible
  const noVisibleIndicator = [];
  interactiveElements.forEach(el => {
    el.focus();
    const computedStyle = window.getComputedStyle(el);
    const outlineWidth = parseFloat(computedStyle.outlineWidth);
    const outlineStyle = computedStyle.outlineStyle;
    const boxShadow = computedStyle.boxShadow;

    if ((outlineWidth === 0 || outlineStyle === 'none') &&
        (boxShadow === 'none' || boxShadow === '')) {
      noVisibleIndicator.push({
        tag: el.tagName,
        text: el.textContent?.trim().substring(0, 50),
        selector: getSelector(el)
      });
    }
  });

  results.push({
    test: 'Focus indicators visible',
    pass: noVisibleIndicator.length === 0,
    failures: noVisibleIndicator
  });

  // Test 3: Tab order is logical
  const tabOrder = [];
  document.addEventListener('focusin', function logFocus(e) {
    tabOrder.push({
      tag: e.target.tagName,
      text: e.target.textContent?.trim().substring(0, 50),
      selector: getSelector(e.target)
    });
  }, { once: false });

  // Simulate tab through all elements
  const firstEl = document.querySelector('[tabindex]:not([tabindex="-1"]), a, button, input, select, textarea');
  if (firstEl) firstEl.focus();

  results.push({
    test: 'Tab order collected',
    pass: tabOrder.length > 0,
    data: tabOrder
  });

  return results;
}

function getSelector(el) {
  if (el.id) return '#' + el.id;
  const path = [];
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.tagName.toLowerCase();
    if (el.id) { path.unshift('#' + el.id); break; }
    if (el.className && typeof el.className === 'string') {
      selector += '.' + el.className.trim().split(/\s+/).join('.');
    }
    path.unshift(selector);
    el = el.parentElement;
  }
  return path.join(' > ');
}

// Run the test
testKeyboardNavigation().then(console.table);
```

### 8.7 Screen Reader Testing Script

```bash
#!/bin/bash
# Screen Reader Testing Script (for use with NVDA on Windows or VoiceOver on macOS)
# This script provides a structured walkthrough for manual screen reader testing.

echo "=== Screen Reader Accessibility Test ==="
echo "URL: $1"
echo "Date: $(date)"
echo ""

# Test categories
categories=(
  "1. Navigation and Structure"
  "2. Content and Images"
  "3. Forms and Inputs"
  "4. Dynamic Content"
  "5. Custom Widgets"
  "6. Error Handling"
)

# Test cases for each category
declare -A tests
tests["1. Navigation and Structure"]=(
  "Page title is descriptive"
  "Skip navigation link present and functional"
  "Heading hierarchy is logical (no skipped levels)"
  "Landmarks are present (banner, navigation, main, complementary)"
  "Content order is logical when reading continuously"
  "Links are descriptive out of context"
)
tests["2. Content and Images"]=(
  "All informative images have descriptive alt text"
  "Decorative images are hidden from screen reader"
  "Data tables have proper headers and captions"
  "Lists are properly announced as lists"
  "Blockquotes are announced as quotations"
  "No blank or empty links"
)
tests["3. Forms and Inputs"]=(
  "All inputs have associated labels"
  "Required fields are indicated"
  "Placeholder text is not used as label replacement"
  "Error messages are associated with inputs"
  "Submit button is clearly labeled"
  "Autocomplete attributes present where appropriate"
)
tests["4. Dynamic Content"]=(
  "Loading states are announced"
  "Content updates are announced via live regions"
  "Navigation changes are announced"
  "Notifications appear and are announced"
)
tests["5. Custom Widgets"]=(
  "Tabs: Arrow keys switch tabs"
  "Accordion: Expand/collapse announced"
  "Modal: Focus trapped, content behind is inert"
  "Menu: Arrow keys navigate items"
  "Dialog: Role and label announced"
  "Carousel: Slide changes announced"
)
tests["6. Error Handling"]=(
  "Form errors are announced on submission"
  "Error summary is focusable and readable"
  "Individual field errors are associated"
  "Success messages are announced"
)

# Run tests
current_category=""
for category in "${categories[@]}"; do
  echo ""
  echo "================"
  echo "$category"
  echo "================"
  echo ""

  IFS=$'
'
  for test_case in ${tests[$category]}; do
    echo "[ ] $test_case"
  done
done

echo ""
echo "=== Test Complete ==="
echo "Mark [x] for passing tests, [-] for partial, [ ] for failing."
echo "Add notes for each failing test."
