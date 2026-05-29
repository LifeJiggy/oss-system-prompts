# OSS Legal & Compliance â€” Copyright, Patents, Trademarks & Licensing â€” Universal Reference

> **Version:** 2.0
> **Last Updated:** May 2026
> **Scope:** Global reference covering copyright, patents, trademarks, licensing strategy, compliance, export controls, privacy, contributor agreements, and legal templates for open source software projects.

---

## Table of Contents

1. [Part 1: Copyright in Open Source](#part-1-copyright-in-open-source)
2. [Part 2: Patent Law & Open Source](#part-2-patent-law--open-source)
3. [Part 3: Trademark Law for OSS Projects](#part-3-trademark-law-for-oss-projects)
4. [Part 4: Licensing Strategy Deep Dive](#part-4-licensing-strategy-deep-dive)
5. [Part 5: Compliance and Auditing](#part-5-compliance-and-auditing)
6. [Part 6: Export Controls & OSS](#part-6-export-controls--oss)
7. [Part 7: Privacy & Data Protection](#part-7-privacy--data-protection)
8. [Part 8: Contributor Agreements & Corporate Policies](#part-8-contributor-agreements--corporate-policies)
9. [Part 9: Legal Templates](#part-9-legal-templates)

---

## Part 1: Copyright in Open Source

### 1.1 How Copyright Works in Software

Copyright is the foundational legal mechanism that makes open source licensing possible. Without copyright, licenses would have no legal force. Understanding copyright is therefore essential to understanding OSS legal frameworks.

Copyright in software protects the **expression** of ideas, not the ideas themselves. This distinction â€” the _idea-expression dichotomy_ â€” means that while the specific code written by a developer is protected, the underlying functionality or algorithm is not (though it may be protected by patent law).

**What copyright protects in software:**

| Element | Protected? | Notes |
|---------|------------|-------|
| Source code text | Yes | Both human-readable and machine code |
| Object code / binaries | Yes | Derivative work of source code |
| APIs (structure, sequence, organization) | Controversial | _Oracle v. Google_ â€” fair use of Java APIs in Android |
| Data formats / file formats | No | May be protected if creative expression |
| Algorithms | No (idea) | May be patentable |
| User interface layout | Limited | If sufficiently creative |
| Comments and documentation | Yes | Separate copyrightable work |
| Test data / fixtures | Yes | If original selection/arrangement |

**Fixation requirement:** Copyright attaches when a work is "fixed in a tangible medium of expression." For software, this happens the moment code is written to a file, saved to disk, or otherwise recorded. No registration, notice, or publication is required.

**Originality threshold:** Copyright requires only a _modicum_ of creativity. Most software clears this bar easily. Even a one-line shell alias or a five-line function likely qualifies for copyright protection, though the _scope_ of protection may be thin (a concept known as _scÃ¨nes Ã  faire_ â€” elements that necessarily follow from the task at hand).

### 1.2 Copyright Ownership in Contributions

When multiple people contribute to an open source project, ownership of the resulting work depends on several factors:

**Default rule (US Copyright Act):** The author of a work is the copyright owner. For a contribution to an existing project, the contributor owns the copyright in their contribution _unless_:

1. They have assigned copyright to another entity
2. They have licensed their contribution under the project's license
3. The work qualifies as a "work made for hire"
4. A contributor agreement specifies otherwise

**What happens when you contribute code:**

```text
Contributor writes code -> Code is copyrightable -> Contributor owns copyright
    |
Contributor submits PR under project license -> Implied license granted
    |
Project maintainer incorporates contribution -> Licensed, not transferred
    |
Downstream users receive under project license -> Permitted use
```

**The "implied license" problem:** Before the widespread adoption of explicit contributor agreements (DCOs, CLAs), the legal theory was that submitting a pull request implicitly granted the project a license to use and distribute the contribution. Most courts and legal scholars accept this theory, but it creates uncertainty â€” what exactly is the scope of the implied license? Does it cover relicensing? Does it survive a fork?

This uncertainty is why projects like the Linux Kernel (DCO), Apache Software Foundation (ICLA), and Google (CLA) require explicit contributor agreements.

**Contributor ownership presumptions by jurisdiction:**

| Jurisdiction | Default Rule | Notable Exception |
|--------------|-------------|-------------------|
| United States | Author owns copyright unless work-for-hire | Joint work requires intent to merge contributions |
| European Union | Author owns copyright; moral rights inalienable | Software directive provides for "collective works" |
| Germany | Author owns copyright; Urheberrecht is strongly personal | Cannot transfer copyright fully; only license |
| France | Author's rights (droit d'auteur) very strong | Moral rights last forever, cannot be waived |
| United Kingdom | Author owns copyright; work-for-hire for employees | "Crown copyright" for government employees |
| Japan | Author owns copyright; work-for-hire for employees | Moral rights limited compared to EU |
| China | Author owns copyright; software registration available | Work-for-hire recognized by statute |
| India | Author owns copyright; work-for-hire for employees | Considerable judicial discretion |

### 1.3 Joint Copyright in Collaborative Projects

When multiple authors contribute to a single work with the intent that their contributions merge into a unitary whole, the result may be a **joint work** under US copyright law (17 U.S.C. Â§ 101).

**Joint work requirements (US):**
1. Each contributor must intend their contribution to be part of the whole
2. Contributions need not be equal, simultaneous, or separately identifiable
3. Each joint author obtains an undivided ownership in the entire work

**Consequences of joint authorship:**
- Each joint author may independently license the work (subject to duty to account for profits)
- Each joint author may sue for infringement
- Each joint author may transfer their share (in whole or in part)
- Termination of transfers rights belong to each joint author independently

**Why most OSS projects avoid joint work status:** The ability of any joint author to independently license the work is incompatible with the careful licensing structure of most OSS projects. This is why contributor agreements typically characterize contributions as licensed, not co-owned.

**German law approach (Gesamthandgemeinschaft):** Under German law, contributors to a collaborative project may be treated as forming a _Gesamthandgemeinschaft_ â€” a community of rights holders who must act jointly to license or enforce the work. This is more restrictive than US joint work doctrine and makes careful contributor agreements even more important for projects with German contributors.

### 1.4 Copyright Assignment vs. Licensing

**Copyright assignment** is the _transfer_ of copyright ownership from one party to another. It is a sale of the copyright itself.

**Copyright licensing** is the _permission_ to exercise one or more of the exclusive rights of copyright without transferring ownership.

| Aspect | Assignment | License |
|--------|------------|---------|
| Ownership | Transferred to assignee | Retained by licensor |
| Duration | Permanent (subject to termination rights) | As specified in license |
| Revocability | Not revocable after transfer | May be revocable (contract-dependent) |
| Right to sublicense | Assignee may grant licenses | Only if license permits |
| Termination rights | Assignor may have statutory termination right | N/A |
| Consideration | Usually paid | May be royalty-free |
| Formalities | Must be in writing (US) | May be oral or implied (but not for exclusive licenses) |

**Statutory termination rights (US):** Under 17 U.S.C. Â§ 203, an author (or their heirs) may terminate a copyright transfer or exclusive license during a 5-year window beginning 35 years after the transfer. This right cannot be contracted away. The practical implications for long-lived OSS projects are significant â€” a contributor who assigned copyright in 1995 could terminate in 2030-2035.

**EU approach:** Most EU countries do not recognize full copyright assignment for authors (only for related rights holders). The author may grant exclusive licenses but cannot permanently transfer their "author's rights" (UrheberpersÃ¶nlichkeitsrecht in Germany, droit moral in France).

**Recommendation for OSS projects:** Prefer licensing over assignment unless there is a specific reason (e.g., FSF requires assignment for GNU projects to enforce GPL in court). Licensing preserves contributor rights while giving the project sufficient permissions to operate.

### 1.5 Work-for-Hire Considerations

**Work made for hire (US):** Under 17 U.S.C. Â§ 101, a work made for hire is either:
1. A work prepared by an employee within the scope of employment, OR
2. A work specially ordered or commissioned under specific categories with a written agreement

**Consequences:** The employer or commissioning party is considered the "author" and copyright owner â€” not the individual creator.

**OSS implications:**
- Code written during work hours using employer resources likely belongs to the employer
- Corporate contribution policies determine whether employees can contribute OSS
- Many companies require employees to sign CLAs as corporate representatives
- If an employee leaves, the company retains ownership of contributions made during employment

**The Friday night / weekend contribution question:** A perennial issue: if a developer works on OSS on weekends using their personal laptop, does the code belong to their employer? Courts apply a multi-factor test:

| Factor | Tips toward employee ownership | Tips toward employer ownership |
|--------|------------------------------|-------------------------------|
| Time of creation | Off-hours | During work hours |
| Location | Personal device, home | Work computer, office |
| Subject matter | Unrelated to job | Related to job duties |
| Employer encouragement | None | Manager encouraged or assigned |
| Use of employer resources | None | Employer servers, APIs, proprietary code, or IP |
| Employment expectations | Not part of job description | Within scope of employment duties |

**Safe harbor for employees:** Clear corporate OSS policies, written approval for contributions, and explicit disclaimers in code comments can help establish that personal OSS work is not a work-for-hire.

**Australia and UK:** These jurisdictions have similar work-for-hire doctrines but with important differences. In Australia, copyright in computer programs created by employees belongs to the employer unless otherwise agreed (Copyright Act 1968, s 35(6)). The UK similarly vests ownership in the employer (Copyright, Designs and Patents Act 1988, s 11(2)).

### 1.6 Copyright Notices and Their Legal Significance

The copyright notice â€” `Â© [year] [copyright owner]` â€” serves several functions:

**Legal functions:**
1. **Defeats innocent infringement defense** (US): Under 17 U.S.C. Â§ 401(d), if a work bears a copyright notice, a defendant cannot claim "innocent infringement" to reduce statutory damages
2. **Notice of claim:** Puts the world on notice that someone claims copyright
3. **Provenance information:** Identifies the copyright claimant
4. **License information:** In OSS, often paired with license notice (e.g., "SPDX-License-Identifier: MIT")

**For works published before March 1, 1989 (US):** Notice was mandatory for copyright protection. Failure to include a proper copyright notice could result in loss of copyright (dedication to public domain).

**For works published on or after March 1, 1989 (US):** Notice is optional but highly recommended. The Berne Convention Implementation Act eliminated mandatory notice.

**Recommended notice format for OSS files:**

```text
Copyright (c) [year range] [copyright holder(s)]

[SPDX-License-Identifier: [identifier]]

Licensed under [license name]. You may obtain a copy of the License at
[license URL].
```

**Year ranges:** Use the year of first publication and the year of last modification, e.g., `Copyright (c) 2019-2026`.

**Multiple copyright holders:**

```text
Copyright (c) 2019-2026 Project Contributors
Copyright (c) 2015-2018 Original Author
Copyright (c) 2020-2023 Corporate Sponsor, Inc.
```

**The "Copyright (c)" convention:** Note that OSS files almost universally use `Copyright (c)` or `Copyright (C)` rather than the Unicode symbol `Â©`. This is a legacy of ASCII-only environments and is legally sufficient.

**SPDX identifiers:** The SPDX project standardizes license identifiers for machine-readable license identification. The `SPDX-License-Identifier` tag in file headers enables automated license compliance.

### 1.7 International Copyright: Berne Convention and Jurisdictional Differences

The **Berne Convention for the Protection of Literary and Artistic Works** (1886, revised 1971) is the foundational international copyright treaty. Key principles:

**Three core principles:**
1. **National treatment:** Works originating in one Berne Union country must be given the same protection in other member countries as those countries give to their own nationals
2. **Automatic protection:** Protection must be automatic; no registration, notice, or other formality may be required
3. **Independence of protection:** Protection is independent of the existence of protection in the work's country of origin

**Key differences across jurisdictions that matter for OSS:**

| Issue | US | EU | Japan | China |
|-------|----|----|-------|-------|
| Copyright term | Life + 70 years | Life + 70 years | Life + 70 years | Life + 50 years |
| Moral rights | Limited (VARA for visual arts) | Broad, inalienable | Broad, inalienable | Limited |
| Work-for-hire | Broadly recognized | Limited | Recognized | Recognized |
| Registration required for enforcement | Yes | No | No | Yes (for software, practically) |
| Fair use / fair dealing | Broad fair use doctrine | Limited enumerated exceptions | Limited enumerated exceptions | Limited "fair use" (2019+) |
| Anti-circumvention | DMCA Â§ 1201 | EUCD Art. 6 | Copyright Law Art. 113 | Similar provisions |
| Statutory damages | Available | Not typical | Available | Available |

**TRIPS Agreement (WTO):** The Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS) incorporates Berne Convention obligations (except moral rights) and adds enforcement provisions. All WTO members must comply, making TRIPS the most universally applicable copyright framework.

**WIPO Copyright Treaty (WCT):** A 1996 treaty that addresses digital copyright issues â€” including the right of communication to the public (making works available online), technological protection measures (anti-circumvention), and rights management information. Adopted by most major economies.

**WIPO Performances and Phonograms Treaty (WPPT):** Extends similar protections to performers and phonogram producers, relevant for OSS projects that include audio/media components.

**Practical implications for OSS projects:**
- A contributor in Germany, a maintainer in the US, and a user in Japan are each protected by their own country's copyright laws
- The project license is interpreted under the laws of the jurisdiction specified in the license (or if unspecified, under the laws where enforcement is sought)
- What constitutes "distribution" varies by jurisdiction
- Moral rights (attribution, integrity) cannot be waived in many EU countries, which can conflict with permissive OSS licenses that allow modification without attribution

### 1.8 Copyright Registration for OSS Projects

**Why register copyright (US perspective):**
1. **Prerequisite for US lawsuits:** You cannot sue for copyright infringement in US federal court without registration (or refusal of registration)
2. **Statutory damages & attorney's fees:** Available only for works registered _before_ infringement begins (or within 3 months of publication)
3. **Prima facie evidence of validity:** If registration occurs within 5 years of publication, courts presume the copyright is valid
4. **Customs protection:** Registered works can be recorded with US Customs & Border Protection to prevent importation of infringing copies

**Registration process:**
- US Copyright Office: online application ($45-65 per work)
- Submit deposit copy of work
- Processing time: 1-8 months (expedited available for additional fee)
- Registration effective date: date received, not date processed

**Special considerations for OSS:**
- Single registration can cover an entire project (including all versions published before registration)
- For projects with frequent releases, registration should cover the project as a "compilation" or "collective work"
- Foreign projects: registration is optional for foreign works (can't be a prerequisite to sue) but advisable for statutory damages benefits

**Registration in other jurisdictions:**

| Country | Registration System | Notes |
|---------|-------------------|-------|
| Japan | Software Information Center (SOFTIC) | Deposits for evidence, not rights |
| China | Mandatory for enforcement | Software copyright registration required for legal actions |
| India | Voluntary registration | Prima facie evidence in court |
| EU | No central registration | National registries exist in some member states |
| Canada | Voluntary registration | Evidence of ownership |

**EU Copyright Database:** The European Union has piloted voluntary copyright registries (e.g., ARES, the blockchain-based Authorship Registry), but these are for transparency, not legal rights.

**Recommendations:**
- Register major OSS projects in the US Copyright Office (creates public record, enables enforcement)
- For projects with Chinese users/contributors, register with the China Copyright Protection Center (CCPC)
- Maintain clear records of contribution dates, authors, and license choices

---

## Part 2: Patent Law & Open Source

### 2.1 How Patents Interact with OSS Licenses

Patents and open source have a complex and often adversarial relationship. While copyright licensing is the primary mechanism of OSS, patents add another dimension â€” a license to use, modify, and distribute code under copyright may not authorize the exercise of patent rights that the code embodies.

**The problem:** An OSS license grants copyright permissions. But using a patented algorithm in code requires a separate patent license from the patent holder. If the patent holder is not the copyright holder (or if the license doesn't include a patent grant), users may infringe patents even while fully complying with the OSS license.

**Patent rights implicated by OSS:**
- **Making:** Compiling, building, or creating the software
- **Using:** Running the software on any device
- **Selling:** Distributing the software for a fee
- **Offering for sale:** Promoting the software
- **Importing:** Bringing the software into a jurisdiction where the patent is in force

**How different OSS licenses address patents:**

| License | Patent Grant | Termination | Scope |
|---------|-------------|-------------|-------|
| Apache 2.0 | Express grant, Â§ 3 | Terminated if licensee files patent suit (Â§ 3) | Contributions made by licensor |
| GPLv2 | Implied (theory, no explicit grant) | N/A (relies on copyright termination) | Controversial â€” "propagation" includes patent rights? |
| GPLv3 | Express grant, Â§ 11 | Terminated if licensee files patent suit (Â§ 8) | "Essential patent claims" of contributors |
| MIT/BSD/X11 | None | N/A | No patent grant at all |
| MPL 2.0 | Express grant, Â§ 2.1(b) | Terminated if licensee files patent suit (Â§ 5.2) | Covered contributions |
| LGPLv3 | Express grant (same as GPLv3) | Same as GPLv3 | Same as GPLv3 |

**The GPLv2 patent controversy:** GPLv2 does not contain an explicit patent grant. The FSF's position is that GPLv2 implicitly grants a patent license through Â§ 6 (which prevents the imposition of further restrictions on distribution). However, this position has never been tested in court, and many legal scholars consider it weak.

### 2.2 Patent Grants in OSS Licenses

**Apache License 2.0, Â§ 3 â€” Patent Grant:**

> "Each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work."

**Key features:**
- Applies to claims "licensable" by the contributor â€” meaning claims the contributor could license without paying royalties to third parties
- Limited to claims that would be infringed by the Work as contributed
- Contains a **patent retaliation clause**: if the licensee files a patent lawsuit against the contributor, the patent license terminates
- Survives termination of the license for patent claims unrelated to the retaliation trigger

**GPLv3, Â§ 11 â€” Patents:**

> "Each contributor grants you a non-exclusive, worldwide, royalty-free patent license under the contributor's essential patent claims, to make, use, sell, offer for sale, import and otherwise run, modify and propagate the contents of the contributor's version."

**Key features:**
- "Essential patent claims" means claims that would be infringed by the contributor's version
- **Downstream patent protection:** A contributor who distributes covered work must grant patent licenses downstream for the entire work (not just their contribution)
- **Conveying and patent protection:** If the contributor knows of a patent that would be infringed by the work, they must grant sufficient rights to downstream users
- **Anti-retaliation:** Filing a patent suit terminates the license
- **Discriminatory patent licenses:** If a contributor enters an arrangement (e.g., a patent pool) that discriminates against downstream GPL users, the contributor cannot distribute GPLv3 software

**Comparison: Apache 2.0 vs. GPLv3 patent provisions:**

| Aspect | Apache 2.0 | GPLv3 |
|--------|-----------|-------|
| Patent scope | Contributor's own claims | "Essential claims" covering the work |
| Downstream coverage | Contribution only | Entire conveyed work |
| Anti-retaliation | Yes | Yes |
| Discrimination trigger | No | Pool/discriminatory licensing triggers exclusion |
| Open source parent | Limited to contribution | All code under GPLv3 |

**MIT/BSD â€” missing patent grant:** The MIT and BSD licenses contain no patent provisions whatsoever. This means:
- Users have no express patent license
- Contributors implicitly warrant they have patent rights to contribute (but this is controversial)
- Patent holders are not restricted from asserting patents against users
- Many companies prohibit use of MIT/BSD code for this reason

### 2.3 Defensive Patent Aggregation

**Open Invention Network (OIN):**

OIN is the largest patent non-aggression community in history, focused on protecting the GNU/Linux ecosystem.

| Metric | Value |
|--------|-------|
| Founded | 2005 |
| Patents owned/managed | 3,000+ (owned) + 1,000+ (licensed) |
| Licensees | 3,500+ companies and organizations |
| Core technology | Linux System (defined by the OIN Linux Definition) |
| Key members | Google, IBM, Sony, Philips, Toyota, Microsoft (since 2018) |

**How OIN works:**
1. Members cross-license patents to each other for the Linux System
2. OIN owns patents that it licenses royalty-free to members
3. Non-members are not protected â€” if a non-member asserts patents against the Linux System, OIN can counter-assert
4. The "Linux System" definition is broad and expands over time (currently covers ~3,200+ software packages)

**OIN membership considerations:**
- Free to join (must not assert patents against Linux System)
- Must grant patent non-aggression for the Linux System
- Must not transfer patents subject to the agreement to parties who won't be bound
- Recent expansion (2023): includes Open RAN 5G components

**LOT Network:**

The LOT Network (License on Transfer) is a patent non-assertion framework that protects members from patent assertion entities (PAEs, commonly known as patent trolls).

**How LOT works:**
1. Member companies agree that if their patents are sold to a PAE (non-practicing entity), the PAE receives the patents subject to a covenant not to sue other LOT members
2. The covenant survives transfer â€” the PAE cannot assert those patents against LOT members
3. The covenant does NOT restrict members from asserting their own patents directly (only upon transfer to a PAE)

| Metric | Value |
|--------|-------|
| Founded | 2014 |
| Members | 2,500+ |
| Protected entities | 1,500,000+ (patents protected from troll assertion) |
| Key members | Google, Cisco, IBM, Microsoft, Ford, Amazon, Netflix |
| Annual fee | Based on revenue (free for startups < $25M revenue) |

**OIN vs. LOT Network:**

| Feature | OIN | LOT Network |
|---------|-----|-------------|
| Scope | Linux System | All patents owned by member |
| Mechanism | Cross-license | Transfer covenant |
| Trigger | N/A | Patent sold to PAE |
| Protects against | Direct patent assertion | Troll assertion after transfer |
| Mutual defense | Yes (counter-assertion) | No |
| Open source specific | Yes (Linux-focused) | General tech industry |

**AST (Allied Security Trust):** Another defensive aggregation entity that acquires patents to keep them from PAEs. Unlike OIN and LOT, AST acquires patents on behalf of members and licenses them back.

### 2.4 Patent Non-Assertion Pledges

Several major companies have made public commitments not to assert their patents against open source software:

**Google's Patent Pledge (2013):**
- Promises not to sue certain OSS projects (specifically listed) unless first attacked
- Covers Google's patents, not just Android-related
- Weakened compared to OIN: no license, no ongoing commitment for new patents, project-specific

**Red Hat's Patent Promise (2002, updated 2024):**
- Pledges not to assert patents against any OSS
- Bilateral: only protects those who don't assert patents against OSS
- Covers all Red Hat's patents, now and future
- One of the strongest pledges

**IBM's Patent Pledge (2005):**
- Pledges not to assert 500+ software patents against OSS
- Specific list of patents
- Subsequently folded into OIN membership (with substantially broader coverage)

**Tesla's Patent Pledge (2014):**
- "We will not initiate patent lawsuits against anyone who, in good faith, wants to use our technology"
- Primarily directed at electric vehicle technology
- Ambiguity: is this a license or a covenant not to sue? (Different legal effects)
- Not OSS-specific, but relevant for OSS projects in EV/energy space

**Microsoft's OSS Patent Promise (2018):**
- "We will not assert any Microsoft patents against OSS projects in the .NET Foundation or any project listed on the OSS list"
- Limited scope â€” only applies to listed projects
- Tied to Microsoft's OSS strategy (surrender of patents to specific projects)

**Legal analysis:** Patent pledges are generally:
- **Irrevocable** if stated as such (Google, Red Hat include irrevocability language)
- **Bilateral** if conditioned on the recipient not suing
- **Not transferable** unless explicitly stated
- **Not a license** â€” they are a covenant not to sue (narrower)
- **Potentially revocable** if the pledging company receives a change of control (acquired by a non-pledging entity)

### 2.5 Patent Trolls and OSS Defenses

**Patent Assertion Entities (PAEs):**

Also known as "patent trolls," PAEs are entities that acquire patents for the primary purpose of asserting them against alleged infringers, rather than practicing the patented technology.

**How PAEs target OSS:**
1. **End-user targeting:** Sue small businesses and individual users of OSS
2. **End-product targeting:** Sue distributors or SaaS providers using OSS
3. **Ransomware-style trolling:** Offer settlements (often $5,000-$50,000) that are cheaper than litigation
4. **Portfolio exhaustion:** Threaten multiple patents simultaneously to force settlement
5. **Covered Business Method (CBM) exploitation:** Target OSS used in financial services

**Notable PAE actions against OSS:**

| Year | PAE | Target | Outcome |
|------|-----|--------|---------|
| 2005 | Acacia Research | Streaming media (multiple OSS projects) | Settlements, some invalidation |
| 2009 | Bedrock Computer | OSS projects using Linux hashtables | Google $5M settlement |
| 2010 | Oracle (asserting patents, not a PAE but similar effect) | Android (Google) | $0 on patents (copyright phase significant) |
| 2012 | Lodsys | Android app developers (indie developers) | Apple intervention, settlements |
| 2014 | Unwired Planet | Linux kernel, Android | Settlements |
| 2017 | Nonend Inventions | Various OSS redistributors | Multiple suits, some dismissed |
| 2021 | Rothschild Patent Imaging | Various OSS projects using image processing | Counter-assertion, settlement |

**Defenses for OSS projects:**

**Alice/Mayo defense (US):** Under _Alice Corp. v. CLS Bank_ (2014), software patents that claim abstract ideas without an "inventive concept" are invalid. This has been the most successful defense against software PAEs:
- ~80% of software patent claims challenged under _Alice_ have been invalidated (2014-2020)
- The Federal Circuit has tightened the standard, making _Alice_ more difficult for defendants (2019-2023)
- But _Alice_ remains a powerful tool for invalidating overly broad software patents

**IPR (Inter Partes Review):** A PTAB proceeding that allows third parties to challenge patent validity at the USPTO. IPR is faster and cheaper than district court litigation:
- Cost: $300,000-$500,000 (IPR) vs. $1,000,000-$4,000,000 (district court)
- Time to decision: 12-18 months (IPR) vs. 2-4 years (district court)
- Success rate: ~70% of challenged claims are invalidated (petitioner win rate)

**OSS-specific defenses:**
1. **Prior art defense:** Show the patented invention was used in OSS before the patent filing date (attack the patent, not the license)
2. **First sale / exhaustion:** If the PAE's predecessor sold products incorporating the patented technology, patent rights are exhausted
3. **Laches / estoppel:** If the PAE delayed unreasonably in asserting the patent
4. **License defense:** If the OSS license (e.g., Apache 2.0, GPLv3) includes patent grants that cover the asserted claims

**Protective organizations:**
- **Electronic Frontier Foundation (EFF):** Defends OSS projects against patent assertions
- **Software Freedom Law Center (SFLC):** Provides legal defense for OSS
- **Public Knowledge:** Advocacy against patent troll legislation
- **Unified Patents:** Defensive patent aggregation specifically focused on prior art challenges to PAE patents
- **Open Invention Network:** Defensive patent pool (see Â§2.3)

### 2.6 Standard-Essential Patents (SEPs) in OSS

SEPs are patents that are essential to implementing a technical standard (e.g., Wi-Fi 802.11, H.264 video codec, USB, Bluetooth, 5G NR).

**The SEP problem for OSS:**
1. Standards bodies require SEP holders to commit to FRAND (Fair, Reasonable, and Non-Discriminatory) licensing
2. FRAND is ambiguous â€” does it require a royalty from OSS projects?
3. Many SEP holders refuse to license SEPs to OSS projects on FRAND terms
4. Some SEP holders argue that OSS models (especially GPL) are incompatible with FRAND licensing

**Key controversies:**

| Issue | SEP Owner Position | OSS Community Position |
|-------|-------------------|----------------------|
| FRAND + GPL | Royalty-bearing license incompatible with GPL | FRAND requires royalty-free for OSS |
| SEP enforcement against implementers | Allowed under FRAND | Exhaustion from chip-level licensing |
| Codec SEPs (HEVC, AV1, etc.) | Pool licensing required | AV1 royalty-free alternative developed |
| IoT SEPs | Per-device licensing unavoidable | Licensing upstream (chip level) solves for OSS |
| 5G SEPs in automotive | Different royalty basis than mobile | FRAND should be same across industries |

**Notable SEP-OSS disputes:**

- **Motorola v. Microsoft (2012):** Motorola sought injunctions against Microsoft for SEP (H.264, 802.11) use in Windows. Result: Motorola found to have breached FRAND commitments by seeking injunctions.
- **Huawei v. ZTE (2015, CJEU):** Established framework for SEP negotiation in EU â€” SEP holder must notify implementer, implementer must express willingness to license on FRAND terms, then good-faith negotiation follows.
- **Sisvel v. Haier (2020, Germany):** German court held that Haier was an "unwilling licensee" for refusing to take a FRAND license for SEPs (patents essential to the LTE standard). Applied _Huawei v. ZTE_ framework.
- **Continental v. Avanci (2020):** Continental (auto parts) sued Avanci (5G licensing platform) arguing that SEP licensing at the automotive component level violates FRAND. Still ongoing.

**FRAND commitments and OSS compliance:**

The _Huawei v. ZTE_ framework (adopted across EU):
```
SEP Holder -> Notice -> Implementer
   |                        |
FRAND commitment      Expression of willingness
   |                        |
Specific offer        Good-faith response
   |                        |
If no agreement -> Court determines FRAND terms
```

**For OSS projects implementing standards:**
- Evaluate whether the project needs a SEP license (many SEPs are component-level and licensed to chip vendors â€” exhaustion may apply)
- Consider using royalty-free codec alternatives (AV1, Opus) instead of SEP-covered standards
- Engage with patent pools early (MPEG LA, Via Licensing, Avanci) to negotiate OSS-appropriate terms
- Document all SEP considerations in the project's legal notices

### 2.7 Case Studies: OSS Patent Disputes

**Case 1: IBM & the SCO Group v. IBM (2003-2010)**

The most significant OSS patent dispute (initially framed as a contract/trade secret case but involving patent counterclaims):

- **Facts:** SCO (successor to Santa Cruz Operation) claimed IBM contributed UNIX System V code to Linux, violating IBM's UNIX license with AT&T
- **IBM's counterclaim:** SCO infringed IBM patents related to operating system technology
- **Outcome:** Numerous discovery violations by SCO. Bankruptcy. SCO's claims dismissed. Linux fully vindicated.
- **Impact:** Established that market-driven OSS can survive the most aggressive IP attacks. IBM's patent counterclaim was never fully litigated but changed the power dynamic.

**Case 2: Microsoft's Linux Patent Threats (2007-2012)**

- **Facts:** Microsoft repeatedly claimed Linux infringed 235+ Microsoft patents. CEO Steve Ballmer: "Linux infringes our intellectual property."
- **Strategy:** Never specified which patents. Used threat to extract royalties from Linux distributors (Novell, 2007 â€” $108M/year for patent coverage)
- **Outcome:** No actual litigation. Microsoft joined OIN in 2018, signaling end of era.
- **Impact:** Demonstrated that indefinite patent threats can be as effective as actual litigation. Led to LOT Network expansion.

**Case 3: Google v. Oracle (2010-2021)**

- **Facts:** Oracle sued Google over Java API use in Android (37 Java API packages, 11,500 lines of code)
- **Issues:** Are APIs copyrightable? If so, is Android's use fair use?
- **Supreme Court (2021):** 6-2 ruling that Google's use was fair use. Did NOT decide API copyrightability.
- **Impact:** Major victory for software interoperability and OSS reimplementation of APIs

**Case 4: Intellectual Ventures v. Motorola / Google (2011-2013)**

- **Facts:** IV (largest PAE) asserted multiple patents against Motorola Mobility (then Google-owned)
- **Issue:** Defensive use of patents acquired by Google
- **Outcome:** Google ultimately settled with IV for undisclosed terms
- **Impact:** Even large defensive patent portfolios don't fully protect against aggregated PAE patent holdings

---

## Part 3: Trademark Law for OSS Projects

### 3.1 Protecting Your Project's Name and Logo

Trademark law protects brand identifiers â€” names, logos, slogans, and even product trade dress â€” that identify the source of goods or services. For OSS projects, trademarks serve several critical functions:

1. **Source identification:** Users know the project comes from a known, trusted source
2. **Quality assurance:** The mark signals a consistent level of quality
3. **Preventing confusion:** Downstream users and contributors know what they're getting
4. **Protecting reputation:** Controlling use of the project name prevents association with inferior or malicious products

**What can be trademarked for an OSS project:**

| Element | Trademark Protection | Example |
|---------|---------------------|---------|
| Project name | Standard character mark | "Kubernetes", "TensorFlow", "React" |
| Logo / icon | Design mark | Kubernetes wheel logo |
| Slogan | Standard character mark | "Just Works" (HashiCorp) |
| Product version identifiers | Likely not (descriptive) | "Ubuntu 22.04" |
| Domain name | Not a trademark per se, but can be | "kubernetes.io" |
| Project tagline | If distinctive | "The Cloud Native OS" (CoreOS) |
| Color scheme | If acquired distinctiveness | WordPress blue |
| Sound mark | If distinctive | Docker whale sound? (uncommon in OSS) |

**Trademark rights arise from USE, not registration.** In common law jurisdictions (US, UK, Canada, Australia), trademark rights begin when the mark is used in commerce â€” even without registration. Registration enhances and formalizes these rights.

**Common law trademark rights (US):**
- Established by actual use in commerce
- Geographic scope limited to area of use
- Enforceable against later users (senior vs. junior rights)
- Cannot use Â® symbol (use â„¢ instead)
- Cannot register with US Customs for import protection

### 3.2 Trademark Registration Process

**US Registration (USPTO):**

| Step | Timeline | Cost | Notes |
|------|----------|------|-------|
| 1. Clearance search | 1-4 weeks | $0-$1,000 | Search USPTO database + common law |
| 2. Prepare application | 1-2 weeks | $250-$350 per class (TEAS Plus) | Must identify goods/services precisely |
| 3. File application | Day 1 | $250-$350/class | Use-based or intent-to-use basis |
| 4. Examination | 3-6 months | Included | Examining attorney reviews |
| 5. Office Action response | 3 months to respond | Legal fees if attorney used | ~50% of applications receive OA |
| 6. Publication for opposition | 30 days | Included | Third parties may oppose |
| 7. Statement of use (if ITU) | 6-36 months | $100/class | Must show actual use |
| 8. Registration | 1-2 months after | $100/class registration fee | Certificate issued |
| 9. Maintenance (Section 8) | Year 5-6 | $225/class | Must prove continued use |
| 10. Renewal (Section 9) | Year 9-10, then every 10 years | $525/class | Combined with Section 8 |

**Total timeline:** 9-18 months for registration (if no major issues).
**Total cost:** $1,000-$3,000+ depending on legal fees and office actions.

**EU Registration (EUIPO):**
- Single application covers all 27 EU member states
- Cost: â‚¬850 base (1 class) + â‚¬50 per additional class
- Timeline: 4-6 months (if no opposition)
- Opposition period: 3 months
- Duration: 10 years, renewable indefinitely
- Use requirement: Must be used within 5 years of registration (or vulnerable to cancellation)

**International Registration (Madrid Protocol):**
- File one application (WIPO) designating multiple countries
- Cost: CHF 653 base + CHF 100 per designated country
- Requires a "home" registration (US, EUIPO, or national registry)
- Benefits: centralized renewal, simplified management
- Drawbacks: "Central attack" â€” if home registration is cancelled within 5 years, all international registrations fall

**Recommended classes for OSS projects:**

| Class | Description | Covers |
|-------|-------------|--------|
| 9 (US) / 9 (Nice) | Software, downloadable | Source code, binaries, apps |
| 42 (US) / 42 (Nice) | Software services | SaaS, cloud services |
| 41 (US) / 41 (Nice) | Education, training | Documentation, workshops |
| 35 (US) / 35 (Nice) | Advertising, business | Community management, conferences |

### 3.3 Trademark Usage Guidelines for Downstream Users

Every OSS project that values its brand should publish **trademark usage guidelines**. These guidelines govern how downstream users, distributors, and community members may use the project's trademarked names and logos.

**Essential elements of trademark usage guidelines:**

**Do's and Don'ts:**

| Permitted | Prohibited |
|-----------|------------|
| Using the name to accurately describe the project | Using the name as part of your product name (e.g., "FooBar Enterprise" if "FooBar" is the project) |
| Distributing unmodified official builds | Modifying the logo (changing colors, proportions, adding elements) |
| Stating "Compatible with [Project]" | Stating "[Project] Certified" (unless officially certified) |
| Using the name in blog posts/articles | Registering domains containing the mark (unless project-owned) |
| Using the mark in community discussions | Using the mark to imply sponsorship or endorsement |

**Distributor guidelines:**

Distributors (Linux distros, package managers, cloud marketplaces) have additional considerations:

```text
[Distributor Name] distributes [Project Name], an open source project.
[Project Name] is a trademark of [Project Owner / Foundation].
[Distributor] is not affiliated with or endorsed by [Project Owner / Foundation].
```

**Examples of good trademark guidelines:**
- **Mozilla** (Firefox, Thunderbird): Very detailed, specific about logo use, allows community localization
- **Kubernetes** (CNCF): Standard Linux Foundation template, clear about certification marks
- **WordPress** (WordPress Foundation): Extensive, allows use in WordPress-related business names
- **Docker**: Detailed, prohibits use of Docker in domain names
- **Python Software Foundation**: Simple, permissive for community use

**Badging and certification programs:**

| Project | Certification Program | Cost |
|---------|----------------------|------|
| Kubernetes | KCNA, CKA, CKAD, CKS | $250-$375 per exam |
| Red Hat (RHEL) | RHCSA, RHCE | $400-$500 per exam |
| Docker | DCA (Docker Certified Associate) | $250 (discontinued 2023) |
| Linux Foundation | Various LF certifications | $250-$600 |
| WordPress | Automattic badges | Various |

### 3.4 Enforcement: When and How to Protect Your Mark

**When to enforce:**
1. **Abandonment risk:** If you don't police your mark, you risk losing it (genericide)
2. **Consumer confusion:** Someone uses a confusingly similar mark for related software
3. **Reputational harm:** Someone misuses the mark in a way that damages reputation
4. **False endorsement:** Someone implies project endorsement without authorization

**Watch for genericide â€” examples of lost trademarks:**

| Former Trademark | Current Status | Cause |
|-----------------|----------------|-------|
| Aspirin | Generic (US) | Failed to enforce; used as common name |
| Escalator | Generic | Used as verb; became synonymous |
| Xerox | Survived (not generic) | Aggressive "Don't say Xerox, say photocopy" campaign |
| Kleenex | At risk | Used as synonym for tissue |
| JavaScript | Oracle claims trademark | Industry practice may override (Sun claimed it, Oracle bought it, community uses anyway) |
| Linux | Strong mark | Linus Torvalds / Linux Mark Institute actively polices |

**Enforcement process (escalating):**

```
Identify infringement -> Document infringement -> Send cease & desist letter
    -> File USPTO opposition/cancellation -> File trademark infringement lawsuit
    -> Seek injunction + damages
```

**Enforcement costs:**
- Cease & desist letter: $500-$2,500 (legal fees)
- USPTO opposition: $10,000-$50,000
- Federal lawsuit: $50,000-$500,000+
- ITC proceeding: $500,000-$2,000,000+

**For foundation-owned marks:** Enforcement is typically handled by the foundation's legal counsel. Projects under foundation stewardship usually have stronger enforcement because:
- Dedicated legal budget
- Clear chain of ownership (the foundation owns the registration)
- Consistent enforcement policy across multiple projects

**Defensive considerations:** A trademark owner who _excessively_ enforces against the community may face:
- Community backlash (forks, migration)
- Declining contributions
- Negative press
- Antitrust scrutiny (in extreme cases â€” e.g., standard-essential trademark claims)

### 3.5 Famous OSS Trademark Disputes

**Case 1: Mozilla vs. Debian (Firefox -> Iceweasel) â€” 2004-2016**

- **Issue:** Debian (a Linux distribution) wanted to distribute Firefox with security patches applied, but Mozilla's trademark policy required the name "Firefox" only for unmodified official builds
- **Conflict:** Mozilla's policy prohibited the use of the Firefox name when Debian applied its own security patches
- **Resolution:** Debian created "Iceweasel" as a renamed Firefox build
- **Ending:** 2016 â€” Debian announced they could use "Firefox" branding again after changes to Debian's patch process (and Mozilla's trademark policy)
- **Impact:** Set precedent for distributor trademark policies; many projects now include explicit provisions for distribution with patches

**Case 2: Oracle vs. Google (Java trademark) â€” 2010-2021**

- **Issue:** Google used the "Java" name in Android without a license from Sun/Oracle
- **Trademark claim:** Not the primary issue (copyright was), but included in overall dispute
- **Resolution:** Supreme Court fair use ruling on copyright; trademark claims were less central
- **Impact:** Highlighted the complexity of trademark use in API contexts; contributed to Google's shift from Java to Kotlin for Android

**Case 3: WordPress Trademark â€” 2010-2013**

- **Issue:** WordPress Foundation vs. WordPress Themes Directory operators using "WordPress" in domain names and branding
- **Conflict:** Several theme developers used "WordPress" in their company names and domains (e.g., WordPressTheme.com)
- **Resolution:** Foundation sued multiple theme shops; settled with domain transfers and licensing agreements
- **Impact:** Established clear boundaries for "WordPress" in third-party business names; WordPress trademark guidelines became a model for other projects

**Case 4: Android vs. App Inventor â€” 2010**

- **Issue:** MIT's App Inventor (originally Google) â€” trademark dispute over who could use the name
- **Resolution:** MIT changed name to "MIT App Inventor"
- **Impact:** Foundation-owned marks provide clearer transition paths when projects move between organizations

**Case 5: Redis Labs / Redis Ltd. Trademark â€” 2018-2024**

- **Issue:** Redis changed from BSD to SSPL; trademark use controversy for modified versions
- **Conflict:** Redis Labs asserted trademark rights against cloud providers offering managed Redis services
- **2024:** Redis relicensed to RSALv2 + SSPLv1 (the "Redis Source Available License"), moving away from OSS
- **Valkey fork:** Linux Foundation launched Valkey as the OSS fork; Valkey trademark now owned by LF
- **Impact:** Demonstrates how trademark ownership affects forking dynamics; the trademark stayed with Redis Ltd., but the community rallied around a new name

### 3.6 Transferring Trademarks to Foundations

Many successful OSS projects transfer their trademarks to nonprofit foundations to ensure neutral stewardship.

**Advantages of foundation ownership:**
- **Perpetual neutral stewardship:** The mark isn't owned by any individual or company
- **Community governance:** Foundation's board (elected or appointed by stakeholders) controls use
- **Enforcement resources:** Foundation legal team can enforce
- **Continuity:** If the original creator leaves, the mark stays with the project
- **Perception:** Users trust foundation-controlled marks more than corporate-controlled ones

**Disadvantages:**
- **Loss of control:** Original creator can no longer make unilateral trademark decisions
- **Foundation bureaucracy:** May be slower to respond to enforcement needs
- **Funding:** Foundation needs budget for enforcement (from membership fees or donations)
- **Complexity:** Transfer requires formal assignment agreement, USPTO recordation

**Transfer process:**

```text
Company/Individual owns federal registration
    |
Assignment agreement (must include goodwill)
    |
Record with USPTO (USPTO Assignment Recordation Branch)
    |
Foundation becomes new owner of record
    |
Foundation updates trademark usage guidelines
    |
Foundation assumes enforcement responsibility
```

**Examples of foundation-owned marks:**

| Trademark | Owner | Original Owner | Transfer Date |
|-----------|-------|----------------|---------------|
| Kubernetes | CNCF / Linux Foundation | Google | 2015 |
| Node.js | OpenJS Foundation | Joyent | 2015 |
| Python | Python Software Foundation | Python creator (GvR) | 2000 (transferred) |
| WebAssembly | W3C | Google, Mozilla, others | 2023 (W3C recommendation) |
| Spark | Apache Software Foundation | UC Berkeley AMPLab | 2013 |
| Jenkins | Eclipse Foundation / CD Foundation | Sun Microsystems (later Oracle) | 2011 |
| Android | Open Handset Alliance / Google | Google | N/A (Google retains) |
| Red Hat | IBM | Red Hat | 2019 (acquisition) |
| MySQL | Oracle | MySQL AB (initially owned by Monty Program) | 2010 (Sun acquisition) |
| Eclipse | Eclipse Foundation | IBM | 2004 |

**Legal requirements for valid trademark assignment:**
1. Must be in writing (15 U.S.C. Â§ 1060)
2. Must transfer the "goodwill" associated with the mark (not just the registration)
3. Must identify the mark and the goods/services covered
4. Must be signed by authorized representative of assignor
5. Should be recorded with USPTO within 3 months (for priority against subsequent purchasers)

### 3.7 International Trademark Considerations

**Territoriality principle:** Trademarks are territorial â€” a US registration provides no protection in China, and vice versa.

**Priority systems:**
- **US:** First to USE (in commerce) â€” actual market use creates rights
- **EU/China/Japan:** First to FILE â€” registration creates rights, regardless of use
- **UK:** Mixed â€” first to use but registration creates superior rights

**Implications for global OSS projects:**

**China trademark squatting â€” a major risk:**
- China is a first-to-file jurisdiction
- Trademark "squatters" regularly register foreign marks before the original owner does
- OSS projects are particularly vulnerable because:
  - Many projects have no immediate commercial presence in China
  - Squatters argue: "We registered it first; the project doesn't use it in China"
  - Localizing an OSS project for China often requires dealing with squatters

**Notable China trademark squatting cases:**

| Project | Squatter | Outcome |
|---------|----------|---------|
| Minecraft | Chinese company | Mojang enforced via Madrid protocol |
| Tesla | Zhan Baosheng | Settled (Tesla bought mark) |
| iPad (Apple) | Proview Technology | Apple settled for $60M |
| WeChat / | Multiple | Tencent's vast portfolio protected |
| GitHub | Chinese entity | GitHub's mark was well-known (difficult to cancel even with first-to-file) |
| Ubuntu | Pre-existing Chinese brand | Canonical uses a Chinese name (you bang tuo) |
| Docker | Multiple squatters | Docker sued and won in China |

**EU trademark considerations:**
- EUIPO registration covers all 27 member states
- But national marks still exist in some countries
- EU trademark can be attacked for "bad faith" filing
- EU trademark requires genuine use within 5 years

**UK post-Brexit:** As of January 1, 2021, EUIPO registrations no longer cover the UK. UKIPO created comparable UK marks for existing EU registrants (free, automatic). New applications must file separately in the UK.

**Practical recommendations for global projects:**
1. **File early in key jurisdictions** â€” at minimum: US, EU, China, Japan
2. **Monitor for conflicting applications** â€” use watching services
3. **Domain name registration** â€” register key domains (.com, .io, .org, .dev, .app, relevant ccTLDs)
4. **Consider defensive registrations** â€” common misspellings, "Bad [Project]" / "Project sucks" defensive registration
5. **Use â„¢ and Â® correctly** â€” â„¢ for common law, Â® only for registered marks (in the jurisdiction of registration)
6. **Publish trademark guidelines in Chinese, Japanese, Korean** â€” major OSS-consuming jurisdictions

---

## Part 4: Licensing Strategy Deep Dive

### 4.1 Choosing an OSS License: Decision Tree and Framework

Choosing a license is one of the most consequential decisions an OSS project makes. The license determines:
- Who can use the code, and under what conditions
- Whether the project can be incorporated into proprietary software
- What obligations downstream users have
- The project's governance and sustainability options

**License choice decision tree:**

`
Is the project a library/framework used by other projects?
--- YES -> Do you want to force derivative works to be open source?
    |   --- YES -> LGPL, MPL, or EUPL
    |   --- NO -> MIT, Apache 2.0, BSD-2/3, or ISC (most permissive)
--- NO (standalone application/tool) ->
    |--- Do you want all derivatives to be open source?
    |   |--- YES -> GPL, AGPL, or SSPL (strong copyleft)
    |   |--- NO -> MIT, Apache 2.0, BSD, or 0BSD
    |--- Do you want to protect against cloud/SaaS usage?
        |--- YES -> AGPL (copyleft on network interaction), Commons Clause, or BSL
        |--- NO -> GPL, MIT, Apache 2.0

Does your company need to offer a commercial license?
--- YES -> Dual licensing: OSS license + commercial license
    |--- Requires copyright ownership of all code (CLA + copyright assignment)
--- NO -> Single-license approach is simpler

Do you need patent protection from contributors?
--- YES -> Apache 2.0, GPLv3, or MPL 2.0
--- NO -> MIT, BSD, or ISC (no patent grant)
`

**License comparison matrix:**

| License | Type | Patent Grant | Copyleft | Network Trigger | Commercial Use | Sublicensing | Compatibility |
|---------|------|-------------|----------|-----------------|----------------|--------------|---------------|
| MIT | Permissive | No | No | No | Yes | Yes | Excellent |
| Apache 2.0 | Permissive | Yes | No | No | Yes | Yes | Excellent |
| BSD-2-Clause | Permissive | No | No | No | Yes | Yes | Excellent |
| BSD-3-Clause | Permissive | No | No | No | Yes | Yes | Excellent |
| MPL 2.0 | Weak copyleft | Yes | File-level | No | Yes | Yes | Good |
| LGPLv3 | Weak copyleft | Yes | Library-level | No | Yes | Yes (with conditions) | Moderate |
| LGPLv2.1 | Weak copyleft | No (controversial) | Library-level | No | Yes | Yes (with conditions) | Moderate |
| GPLv3 | Strong copyleft | Yes | Yes | No | Yes | Yes (must be GPLv3) | Limited |
| GPLv2 | Strong copyleft | No | Yes | No | Yes | Yes (must be GPLv2) | Limited |
| AGPLv3 | Strong copyleft | Yes | Yes | Yes | Yes | Yes (must be AGPLv3) | Very Limited |
| EUPL | Strong copyleft | Yes | Yes | Yes (v1.2) | Yes | Yes (GPL-compatible) | Moderate |
| SSPL | Strong copyleft | Yes | Yes | Yes (SaaS) | Yes | Yes (SSPL only) | Limited |
| 0BSD | Public domain equivalent | No | No | No | Yes | Yes | Excellent |
| Unlicense | Public domain | No | No | No | Yes | Yes | Excellent |
| CC0 | Public domain | No (not for software) | No | No | Yes | Yes | N/A |

**Which license do top projects use?**

| Project | License | Rationale |
|---------|---------|-----------|
| Linux kernel | GPLv2 | Historical; Torvalds' choice; patent grants controversial but community settled |
| Kubernetes | Apache 2.0 | CNCF default; patent protection for contributors |
| Node.js | MIT | Maximum adoption; ecosystem compatibility |
| Python | PSF License | Custom; permissive but Apache-compatible |
| Docker | Apache 2.0 | CNCF default (moved to Moby project) |
| React | MIT | Meta permissive choice |
| Angular | MIT | Google permissive choice |
| TensorFlow | Apache 2.0 | Google; patent protection for ML |
| PostgreSQL | PostgreSQL License | MIT-like, custom |
| Ruby | BSD-2-Clause | Simple permissive |
| Rust / Cargo | MIT / Apache 2.0 dual | Patent protection + permissiveness |

### 4.2 Compatibility Matrix: Combining Code Under Different Licenses

One of the most complex areas of OSS licensing is the **combination** of code under different licenses into a single work. This is especially critical for:
- Libraries: what can you link against?
- Distributions: what collection of packages can be distributed together?
- Container images: what licenses can coexist in a single image?

**The "derivative work" question:** The key legal question is whether combining two works creates a "derivative work" under copyright law. If it does, the combined work must comply with the licenses of both original works.

**US law:** Derivative work = "a work based upon one or more preexisting works" (17 U.S.C. § 101). Courts consider whether the new work "recasts, transforms, or adapts" the original.

**Technical considerations that affect legal analysis:**

| Combination Type | Likely Derivative? | Notes |
|-----------------|-------------------|-------|
| Static linking | Yes | Code merged into executable |
| Dynamic linking | Unclear (depends on API + coupling) | LGPL treats this as derivative (unless LGPL with exception) |
| Plugin / module loading | Unclear (depends on coupling) | GPL "plugin exception" provides clarity |
| Pipe / IPC via stdin/stdout | No | Separate processes |
| Network service (REST API) | No | Separate autonomous programs |
| Container image (separate layers) | No (if separate programs) | But distro may be considered aggregate |
| Header file inclusion | Yes (API surface) | Limited copyright in APIs (fair use per _Google v. Oracle_) |

**Inter-license compatibility matrix:**

| License | MIT | Apache 2.0 | BSD-3 | MPL 2.0 | LGPLv3 | GPLv2 | GPLv3 | AGPLv3 | SSPL |
|---------|-----|-----------|-------|---------|--------|-------|-------|--------|------|
| MIT | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| Apache 2.0 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| BSD-3 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| MPL 2.0 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| LGPLv3 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| GPLv2 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| GPLv3 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| AGPLv3 | ? | ? | ? | ? | ? | ? | ? | ? | ? |
| SSPL | ? | ? | ? | ? | ? | ? | ? | ? | ? |

**Legend:**
- ? = Compatible (can combine)
- ? = Incompatible (cannot combine into single work)
- ? = Legally uncertain / disputed / untested

**Key incompatibility issues:**

1. **GPLv2 + Apache 2.0:** The FSF states GPLv2 is incompatible with Apache 2.0 because Apache 2.0 contains restrictions (patent termination clause) not present in GPLv2. The ASF disagrees but recommends against combining. The practical resolution: most projects avoid combining GPLv2 and Apache 2.0 in the same work.

2. **GPLv2 vs. GPLv3:** "GPLv2 only" code cannot be incorporated into a GPLv3 project (license terms are different). "GPLv2 or later" code CAN be incorporated (the "or later" option allows upgrading). Many Linux kernel components are GPLv2 only (Torvalds' choice), creating tensions with GPLv3-only code.

3. **AGPLv3 + SSPL:** Both are strong copyleft with network triggers. The SSPL provisions are considered by the FSF to be "additional restrictions" beyond AGPLv3, making them incompatible.

4. **MIT + anything:** Always compatible — MIT is the most permissive major license.

**Compatibility rules of thumb:**

- **Permissive + permissive:** Almost always compatible (MIT + Apache 2.0 + BSD = fine)
- **Permissive + weak copyleft:** Permissive code can be incorporated into copyleft project (but not vice versa for derivative works without applying copyleft)
- **Permissive + strong copyleft:** Permissive code may be included in GPL project (the GPL acts as a one-way compatibility valve)
- **Weak + strong:** Weak copyleft code (MPL, LGPL) needs careful analysis for inclusion in strong copyleft projects — generally OK to include weak copyleft as part of a larger copyleft work
- **Strong + strong (different versions):** Generally incompatible unless both are "or later" versions

### 4.3 Copyleft Compliance: GPL Compliance Requirements

**What the GPL requires:**

When you distribute (but not when you only use internally) GPL-licensed software, you must:

1. **Provide the complete corresponding source code (CCS)** — all source code needed to build, install, and run the program
2. **Include a copy of the license** — the full GPL text
3. **Preserve copyright notices** — all existing notices
4. **Preserve the license** — you cannot add restrictions beyond the GPL
5. **Include installation information** (GPLv3 § 6) — for devices, provide keys/signing info to install modified software
6. **Provide Modified Works under same terms** — any modified version must be GPL-licensed
7. **Not sublicense** — you may not grant a sublicense (the GPL grants directly to recipients)

**What constitutes "distribution":**

`	ext
Distribution (triggers GPL obligations):
--- Selling copies (even at cost)
--- Offering downloads
--- Pre-installing on devices
--- Distributing via CD/DVD/USB
--- Providing as a cloud VM image
--- Embedding in a physical product

NOT distribution (no GPL obligations):
--- Internal use (running on your own servers)
--- Modifying for personal use
--- AGPL does treat network interaction as "distribution-like"
--- SaaS / ASP loophole (why AGPL was created)
`

**Complete Corresponding Source (CCS):**

GPLv3 defines CCS as:
> "The source code for all modules it contains, plus any associated interface definition files, plus the scripts used to control compilation and installation of the executable."

This includes:
- All source files (.c, .cpp, .py, .java, etc.)
- Makefiles, build scripts, configuration files
- Interface definition files
- Data files needed for compilation
- Documentation for installation
- **Separate works under GPL not required** — you don't need to include the source of unrelated programs

**GPL Enforcement — the Harald Welte / gpl-violations.org model:**

Harald Welte (gpl-violations.org) pioneered GPL enforcement in Germany and the EU:

| Case | Year | Issue | Outcome |
|------|------|-------|---------|
| _Welte v. Sitecom_ | 2004 | Router firmware without source | Injunction against Sitecom (Munich court) — first GPL enforcement case |
| _Welte v. D-Link_ | 2006 | D-Link router GPL violation | Injunction against D-Link (Frankfurt court) |
| _Welte v. Skype_ | 2007 | VoIP device GPL violation | Settlement + compliance |
| _Welte v. Samsung_ | 2007 | Samsung TV GPL violation | Settlement + compliance |

**BusyBox GPL enforcement (2007-2009):**
- Erik Andersen and others, represented by SFLC, enforced BusyBox GPL against:
  - Monsoon Multimedia (2007) — settlement
  - Xterasys Corporation (2007) — settlement
  - Verizon Communications (2008) — settlement (Verizon had distributed Actiontec routers)
  - High-Gain Antennas (2008) — settlement
  - Supermicro (2008) — settlement
  - Best Buy (2009) — settlement
- Key impact: Established that GPL enforcement is viable in US courts

**Software Freedom Conservancy (SFC) enforcement — current approach:**

SFC, led by Bradley M. Kuhn and Karen Sandler, takes a cooperative enforcement approach:
1. **Technical investigation** — verify violation exists
2. **Confidential notification** — alert the company privately
3. **Negotiation period** — 60-90 days to come into compliance
4. **Public disclosure** — if negotiation fails, publicly name the violator
5. **Copyright infringement lawsuit** — last resort

**SFC's cooperative model (2013-present):**
- Focused on embedded Linux devices, smart TVs, IoT
- Linux kernel enforcement (the "linux-rights-holder" list)
- Key defendant: VMware (2015, Germany) — SFC sued under German copyright law for VMware's ESXi product's use of BusyBox and Linux kernel without source code release
- VMware case outcome: Still ongoing at various stages; complex litigation around whether hypervisor modules are derivative works

**VMware GPL litigation (Harman / SFC v. VMware):**
- **Case:** VMware ESXi hypervisor used BusyBox and Linux kernel code
- **Issue:** Were VMware's proprietary kernel modules (vmkernel) derivative works of Linux, requiring GPL release?
- **Key question:** Is the "operating system" link between Linux kernel code and proprietary kernel modules a derivative work boundary?
- **Court finding (2019, Hamburg Regional Court):** VMware's vmkernel is a separate work from the Linux kernel — communication via normal system call interface does NOT create derivative. Reversed on appeal in part (2021). Settlement reached in 2023.
- **Impact:** This ongoing litigation shaped the technical community's understanding of kernel module boundaries

### 4.4 AGPL: Network Interaction Clause Implications

**The problem AGPL solves:**
Under GPL, if you modify the code and run it on a server (SaaS), you do NOT have to release your modifications because there is no "distribution." This is the "ASP loophole" or "SaaS loophole."

**AGPLv3 § 13 — Remote Network Interaction:**

> "Notwithstanding any other provision of this License, if you modify the Program, your modified version must prominently offer all users interacting with it remotely through a computer network (if your version supports such interaction) an opportunity to receive the Corresponding Source of your version..."

**When AGPL obligations trigger:**
- You modify AGPL software
- You run it on a server accessible over a network
- Users interact with it remotely

**Scope of AGPL obligation:**
- Only applies to **modified** versions (not unmodified AGPL code)
- Must provide CCS to all network users (no authentication wall for source access)
- Must offer source in a standard manner (download, email, or physical media)
- Lasts for as long as the service operates

**AGPL adoption in practice:**

| Project | AGPL Reason | Notes |
|---------|-------------|-------|
| MongoDB (pre-2018) | Prevent cloud providers from offering managed MongoDB without contributing back | MongoDB moved to SSPL in 2018 |
| Nextcloud | Protect against proprietary forking by cloud providers | Server is AGPL, clients are GPLv2+ |
| MinIO | Protect against proprietary forking | AGPLv3, with commercial option |
| GitLab (CE) | Protect against proprietary redistribution | GitLab moved to MIT/EE license (2024) |
| Mastodon | Ensure federated social network remains open | AGPLv3 |
| Element (Matrix) | Ensure federated chat network remains open | AGPLv3 |

**AGPL incompatibility concerns:**
- AGPLv3 is incompatible with GPLv2 (many enterprise ecosystems rely on GPLv2 libraries)
- AGPLv3 is compatible with GPLv3 (FSF position: AGPLv3 and GPLv3 code can be combined, forming an AGPLv3 whole)
- Many corporate policies blanket-prohibit AGPL code (along with SSPL and BSL)
- AGPL is compatible with Apache 2.0 (Apache code can be incorporated into AGPL project, but not vice versa)

**Commercial concerns with AGPL:**
- Most companies prohibit AGPL in production code
- AGPL projects often require a commercial license to avoid AGPL obligations
- SaaS providers prefer Apache 2.0 or MIT for frameworks they use internally
- The "network interaction" trigger creates uncertainty around microservices

### 4.5 LGPL: Linking Exceptions for Libraries

The LGPL (Lesser General Public License) was created to allow libraries to be used by proprietary software while still requiring modifications to the library itself to remain open.

**LGPLv2.1 vs. LGPLv3:**

| Aspect | LGPLv2.1 | LGPLv3 |
|--------|----------|--------|
| Version of GPL referenced | GPLv2 | GPLv3 |
| Patent grant | Not explicit | Yes (via GPLv3) |
| Anti-tivoization | No | Yes |
| Compatibility with Apache 2.0 | No | Yes |
| Compatibility with GPLv2 | Yes (as special exception) | Yes (both directions) |

**What LGPL requires of applications that use it:**

**LGPLv2.1 § 6 — Library combined with independent work:**

> "You may also combine or link a 'work that uses the Library' with the Library to produce a work containing portions of the Library, and distribute that work under terms of your choice, provided that the terms permit modification of the work for the customer's own use and reverse engineering for debugging such modifications."

**Compliance options for proprietary applications using LGPL libraries:**

1. **Dynamic linking** (preferred): Ensure the application uses the library through dynamic linking, not static linking. Provide object code for relinking.

2. **Static linking with relinkable object:** Provide the application in object code form with enough information (object files, makefile) for the user to relink with a modified library.

3. **Include source of library modifications:** If you modify the LGPL library, you must provide the modified library source.

4. **Provide a shared library on the system:** Ensure the LGPL library is a system-installed shared library that the user can replace.

**LGPL static linking compliance workflow:**
`	ext
1. Compile LGPL library
2. Statically link with your application
3. Distribute your application AND:
   a. The object files of your application (for relinking)
   b. The source and build instructions for the LGPL library
   c. A means to relink: scripts, makefiles, or instructions
4. User can:
   a. Obtain modified LGPL library source
   b. Rebuild LGPL library
   c. Relink with your application
`

### 4.6 Dual Licensing: Community Edition vs. Commercial License

Dual licensing offers software under two (or more) sets of terms — typically a copyleft OSS license for community users and a proprietary commercial license for customers who want to avoid copyleft obligations.

**How dual licensing works:**

`	ext
Project Owner owns copyright (via CLAs or copyright assignment)
    |
Licenses to:
--- OSS License (GPL/AGPL) — free, with copyleft obligations
    |--- Community users: must comply with GPL/AGPL
--- Commercial License — paid, removes copyleft obligations
    |--- Enterprise customers: may integrate into proprietary products
`

**Requirements for dual licensing:**

1. **Copyright ownership or control:** The project must own (or have sufficient rights to) ALL code in the project. This typically requires CLAs with copyright assignment.

2. **Clean chain of title:** Every contributor must assign copyright or grant broad enough rights for relicensing.

3. **No third-party code under incompatible licenses:** Inbound contributions from sources not covered by the CLA can block dual licensing.

4. **Enterprise feature differentiation:** Common in dual licensing to have "Community Edition" (core features, OSS) and "Enterprise Edition" (additional features, commercial).

**Dual licensing models:**

| Model | Example | OSS License | Commercial License |
|-------|---------|-------------|-------------------|
| "Open Core" | GitLab | MIT | Proprietary |
| "Copyleft + Commercial" | MongoDB (pre-2018) | AGPLv3 | Commercial |
| "Source Available + Paid" | Sentry | BSL | Commercial |
| "True Open Core" | Grafana | AGPLv3 | Commercial |
| "Community + Enterprise" | Budibase | GPLv3 | Commercial |
| "Libre + Pro" | Cal.com | AGPLv3 + commercial | Enterprise |

**Successful dual licensing examples:**

| Company | Project | Revenue Model | Status |
|---------|---------|--------------|--------|
| MySQL AB | MySQL | GPL + commercial | Acquired by Sun -> Oracle (2008/2010) |
| MongoDB, Inc. | MongoDB | AGPL (-> SSPL) + commercial | Public (MDB, + market cap) |
| GitLab, Inc. | GitLab | MIT + proprietary EE | Public (GTLB) |
| Red Hat | RHEL | GPL-based + subscription | Acquired by IBM (, 2019) |
| Canonical | Ubuntu | GPL + commercial services | Private, profitable |
| Elastic | Elasticsearch | Apache 2.0 -> SSPL + commercial | Public (ESTC) |
| Grafana Labs | Grafana | AGPLv3 + commercial | Private, > valuation |
| HashiCorp | Terraform | MPL 2.0 -> BSL -> MPL revert | Public (HCP, 2021-2024 then private) |

**Dual licensing pitfalls:**

1. **CLA resistance:** Many contributors resist signing CLAs, especially with copyright assignment
2. **Fork risk:** Community may fork under the OSS license (e.g., LibreOffice from OpenOffice, Valkey from Redis)
3. **License proliferation:** Multiple licenses confuse downstream users
4. **Enforcement complexity:** Must ensure commercial customers comply with OSS license or have commercial license
5. **Code provenance contamination:** Third-party contributions without CLA coverage block commercial licensing

**BSL (Business Source License) — the middle path:**

Created by MariaDB (VP of Monty Program AB), BSL is not an OSS license (not OSI-approved) but a "source available" license that converts to a standard OSS license after a specified time.

`	ext
Code is BSL for 3-4 years
    |
No production use (or other limitations as specified)
    |
After Change Date -> becomes GPLv2 / MIT / Apache 2.0
    |
Free forever for non-production, evaluation, or after Change Date
`

**BSL adopters:** MariaDB, Sentry, CockroachDB, TimescaleDB, Couchbase, SVN.
**Criticism:** BSL is not open source; it's a delayed-OUI (Open Use Initiative) license.

### 4.7 License Version Migration: Upgrading GPLv2 to GPLv3

**"GPLv2 only" vs. "GPLv2 or later:"**

When projects are licensed "GPLv2 only", there is no path to upgrade the license without the consent of all copyright holders. When licensed "GPLv2 or any later version" (the "or later" clause), users and downstream redistributors may choose to apply GPLv3 terms.

| License Specification | Can upgrade? | Who decides? |
|----------------------|-------------|--------------|
| GPLv2 only | No | All copyright holders must consent |
| GPLv2 or later | Yes | Distributor/recipient chooses |
| "GPLv2" (ambiguous) | Disputed | Generally interpreted as "GPLv2 or later" (FSF position) |

**Project migration cases:**

**Linux kernel (GPLv2 only, no upgrade path):**
- Torvalds has consistently refused GPLv3 for the kernel
- Key reasons: Tivoization clause (GPLv3 § 6 — anti-Tivoization) conflicts with kernel's "no GPLv3" stance
- Many kernel developers share this view
- Result: Linux kernel will remain GPLv2 only indefinitely

**GCC migration (GCC Runtime Library Exception -> GPLv3):**
- GCC was GPLv2 with a "Runtime Library Exception" since 2002
- 2007: GCC Runtime Library Exception v3.0 (compatible with GPLv3)
- GCC itself moved to GPLv3 in 2007-2009
- Significant community debate, some contributors objected
- Required contacting past contributors for consent (or removing their code)

**GRUB migration (GPLv2 -> GPLv3):**
- GNU GRUB was GPLv2 only
- 2008: Red Hat contacted contributors to secure consent for GPLv3 migration
- Contributors who couldn't be reached: their code was replaced
- GRUB 2.0 released under GPLv3 (2010)

**Practical migration steps:**
1. **Audit all contributors** — identify who has contributed copyrightable code
2. **Determine license specification** — "GPLv2" vs. "GPLv2 or later"
3. **Contact contributors** — request consent for relicense to GPLv3
4. **Document consent** — written consent or public statement
5. **Rewrite unresponsive contributor code** — or remove it
6. **Update license headers** — in all files
7. **Announce migration** — public notice with transition period

### 4.8 License Change Procedures: Community Vote and Contributor Consent

Changing the license of an established OSS project is one of the most disruptive actions a project can take. It requires careful legal and community management.

**Methods of license change:**

| Method | Required | Difficulty | Examples |
|--------|----------|------------|----------|
| Copyright owner decides | Single entity owns all code | Easy | MySQL (commercial), Qt (Nokia -> Digia) |
| Community vote | Project governance documents | Moderate | Node.js (MIT), Docker (Apache 2.0) |
| Contributor consent | All copyright holders | Hard | GCC (GPLv3), GIMP (GPLv3) |
| Relicensing by CLA grant | CLA gives relicensing rights | Moderate | Many CNCF projects |
| Fork | New project under new license | N/A | LibreOffice, Jenkins, OpenBSD, Valkey |

**Contributor consent requirements (most common approach):**

The _minimal_ requirement: every copyright holder must consent to the new license (since they own their contribution and haven't granted you permission to relicense).

The _practical_ approach:
1. **Identify all copyright holders** — substantial vs. trivial contributions
2. **Contact via email/issue** — explain rationale for license change
3. **Obtain explicit consent** — written (email, GitHub comment, signed document)
4. **Replace code of non-responsive contributors** — rewrite or remove
5. **Replace code of objecting contributors** — rewrite or remove
6. **Announce completion** — with a changelog of removed/replaced contributions

**Doctrine of de minimis contributions:**
Trivial contributions (typo fixes, single-line changes, comments) may not be copyrightable, so their removal for relicensing purposes may not be required. However, this is uncertain, and most projects aim for full consent.

**License change controversies:**

| Project | Date | Old License | New License | Controversy |
|---------|------|-------------|-------------|-------------|
| MySQL (FOSS) | 2021 | GPL | BSL (renamed to "second license") | Fork created: MariaDB |
| Elasticsearch | 2021 | Apache 2.0 | SSPL + Elastic License | Fork created: OpenSearch (AWS) |
| HashiCorp | 2023 | MPL 2.0 | BSL | Fork created: OpenTofu (Linux Foundation) |
| Redis | 2023-2024 | BSD-3 | SSPL + RSALv2 | Fork created: Valkey (Linux Foundation) |
| MongoDB | 2018 | AGPLv3 | SSPL | Fork created: FerretDB (partially compatible) |
| Grafana | 2021 | Apache 2.0 | AGPLv3 | Fork created: Grafana fork? (Minimal) |
| Sentry | 2019 | BSD-3 | BSL | Fork created: GlitchTip |
| K6 (Grafana) | 2023 | AGPLv3 | Apache 2.0 | Welcomed (more permissive) |

**License change best practices:**

1. **Transparent communication:** Blog post, mailing list discussion, 30-60 day comment period
2. **Engage community early:** Don't surprise your contributors
3. **Provide rationale:** Clear explanation of WHY the change is necessary
4. **Grandfather clause:** Consider allowing existing code to remain under old license
5. **Grace period:** Provide 6-12 months for downstream users to adapt
6. **Deal with objectors:** Rewrite or remove their code
7. **Fork recognition:** Acknowledge the fork; don't attack it
8. **Trademark clarity:** Be clear about trademark use post-fork

### 4.9 License Exceptions and Additional Permissions

The GPL family of licenses allows **additional permissions** — terms that supplement the GPL to allow specific uses that the GPL would otherwise restrict.

**GPLv3 § 7 — Additional Terms:**

> "If you add terms to a covered work in accord with this section, you must place, in the relevant source files, a statement of the additional terms that apply to those files, or a notice indicating where to find the applicable terms."

**Common additional permissions:**

| Exception | Purpose | Example Project |
|-----------|---------|-----------------|
| GCC Runtime Library Exception | Allow linking of GPL runtime libraries with non-GPL code | GCC, glibc |
| Classpath Exception | Allow linking of GPL class libraries with non-GPL code | GNU Classpath (Java), OpenJDK |
| OpenSSL Exception | Allow combining OpenSSL (OpenSSL-specific license) with GPL code | Many cryptographic software projects |
| Plugin Exception | Allow non-GPL plugins to be used with GPL core | WordPress (GPL calls all plugins derivative works) |
| Linking Exception | Allow proprietary linking | Various LGPL-equivalent custom exceptions |
| Autoconf Exception | Allow inclusion in proprietary build systems | Autoconf, Automake |
| Bison Exception | Allow Bison output to be licensed arbitrarily | Bison (YACC) |
| WxWindows Exception | Allow linking wxWidgets with proprietary code | wxWidgets (pre-LGPL) |
| Macros and Inline Functions Exception | Allow inline functions in headers | Various C++ libraries |
| MPL 2.0 Incompatible Licenses Section | Allow combination with GPL | MPL 2.0 uses this for GPL compatibility |

**GCC Runtime Library Exception (most widely used):**

This exception allows compiled code produced by GCC to be distributed under any license, even though GCC output links against GPL-licensed runtime libraries.

`	ext
"GCC RUNTIME LIBRARY EXCEPTION
Linking this library statically or dynamically with other modules is making a combined
work based on this library. Thus, the terms and conditions of the GNU General Public
License cover the whole combination.

As a special exception, the copyright holders of this library give you permission to link
this library with independent modules to produce an executable, regardless of the license
terms of these independent modules, and to copy and distribute the resulting executable
under terms of your choice, provided that you also meet, for each linked independent
module, the terms and conditions of the license of that module."
`

**Custom license exceptions — best practices:**

1. **Use existing, well-known exceptions** rather than creating custom ones
2. **Follow the "additional permissions" model** in GPLv3 § 7
3. **Place exception text in every file header** (alongside copyright and license notice)
4. **Be explicit about scope** — what is allowed, what is not
5. **Don't create contradictory permissions** — ensure the exception doesn't conflict with the underlying license
6. **Get legal review** — custom exceptions are often poorly drafted; have a lawyer review

---

## Part 5: Compliance and Auditing

### 5.1 Building an OSS Compliance Program

A comprehensive OSS compliance program protects an organization from legal risk while enabling maximum benefit from OSS use.

**Regulatory landscape — why compliance matters:**

1. **Copyright infringement:** Distributing OSS without complying with its license constitutes copyright infringement
2. **Statutory damages:** US Copyright Act provides for statutory damages of up to ,000 per work for willful infringement
3. **Customer contracts:** Enterprise contracts increasingly require SPDX-format SBOM
4. **Export controls:** OSS governed by EAR, TSU, ENC (see Part 6)
5. **M&A due diligence:** Asset sales and acquisitions involve software license review
6. **Security vulnerabilities:** OSS compliance is linked to vulnerability management (Log4j et al.)

**OSS Compliance Program — 7 Pillars:**

| Pillar | Description | Responsibility |
|--------|-------------|----------------|
| **Policy** | Written OSS policy approved by management | Legal + Engineering |
| **Inventory** | Complete catalog of all OSS in use (SBOM) | Engineering |
| **Review** | License review for each OSS component | Legal |
| **Approval** | Process for OSS adoption | OSS Review Committee |
| **Tracking** | Ongoing tracking of OSS versions and licenses | Engineering |
| **Distribution** | Compliance artifacts for distributed software | Release Engineering |
| **Training** | Developer education on OSS obligations | Legal + Engineering |

**Compliance program maturity model:**

`	ext
Level 1: Ad Hoc
--- No formal policy
--- OSS used by "shadow IT"
--- No inventory or tracking
--- Risk: HIGH (probably non-compliant)

Level 2: Basic
--- Written OSS policy exists
--- Central OSS inventory (manual or tool-assisted)
--- Basic license review for new OSS
--- Risk: MODERATE (known but manageable)

Level 3: Managed
--- Policy enforced via tools in CI/CD
--- Automated license scanning
--- SBOM generated per release
--- Training program for developers
--- Risk: LOW (systematic compliance)

Level 4: Optimized
--- Continuous compliance in CI/CD pipeline
--- Automated policy violation resolution
--- Supply chain transparency to customers
--- Risk: VERY LOW (competitive advantage)
`

**OSADL (Open Source Automation Development Lab) Compliance Checklist:**

The OSADL provides a practical compliance checklist for organizations distributing OSS:

1. Have you identified all OSS components in your product?
2. Have you identified the license for each OSS component?
3. Have you identified which OSS components are modified?
4. Have you identified which OSS components are linked (static vs. dynamic)?
5. Do you have source code for GPL/LGPL components?
6. Do you have the build scripts and toolchain for GPL/LGPL components?
7. Have you created a "Notice" file as required by Apache/BSD licenses?
8. Have you included license texts as required?
9. Have you created a written offer for source code (if distributing GPL binaries)?
10. Have you made the source code available for the required duration?

### 5.2 License Compliance Scanning Tools

Automated tools are essential for managing OSS compliance at scale. No organization can manually track all OSS dependencies.

**Tool comparison matrix:**

| Tool | Type | License | Key Features | Best For |
|------|------|---------|--------------|----------|
| FOSSology | Open source | GPLv2 | License scanning, copyright detection, buckets | Large codebases, embedded systems |
| Scancode Toolkit | Open source | Apache 2.0 / CC-BY-4.0 | License detection, package detection, SPDX generation | Deep analysis, CI integration |
| AboutCode | Open source | MIT | Dependency analysis, license resolution | Python/JavaScript ecosystems |
| FOSSA | Commercial | Proprietary | Policy engine, dependency analysis, compliance reports | Enterprise compliance management |
| Snyk | Commercial | Proprietary | Vulnerability + license scanning | Security-first compliance |
| Black Duck (Synopsys) | Commercial | Proprietary | Comprehensive scanning, KB of 3M+ packages | Large enterprise |
| WhiteSource (Mend) | Commercial | Proprietary | DevSecOps integration, policy engine | CI/CD native |
| Tern | Open source | Apache 2.0 | Container image analysis | Container compliance |
| ORT (OSS Review Toolkit) | Open source | Apache 2.0 | CI/CD pipeline, policy engine, SPDX generation | Enterprise pipeline |
| Dependency Check (OWASP) | Open source | Apache 2.0 | Vulnerability + license (limited) | Security-focused |

**Scanning workflow:**

`	ext
Source / Binary -> FOSSology / Scancode
    |
License Identification -> SPDX Output
    |
Policy Engine (FOSSA, ORT) -> Violation?
    |
If no violation: Release
If violation: Legal review -> Remediation
    |
Possible remediation paths:
--- Replace component (find alternative)
--- Change license of component (if possible)
--- Isolate from distribution
--- Apply exception (if policy allows)
--- Accept risk (with legal signoff)
`

**SPDX document generation workflow:**

`	ext
Input: Codebase
    |
Scanner: Scancode + Tern + ORT
    |
Generate: SPDX 2.3 document (JSON or tag:value)
    |
Validate: SPDX validator
    |
Attach to: Release artifacts / SBOM repository
    |
Deliver to: Customers, regulators, CISA
`

### 5.3 SBOM (Software Bill of Materials) Requirements

**What is an SBOM?**
A Software Bill of Materials is a formal, machine-readable inventory of all components in a software product — including OSS, commercial, and proprietary code.

**Why SBOMs matter (regulatory drivers):**

| Mandate | Jurisdiction | Effective | Requirements |
|---------|-------------|-----------|--------------|
| US EO 14028 (Sec. 4) | US Federal Government | 2021 | SBOM required for all software sold to US government |
| NTIA Minimum Elements | US | 2021 (minimal elements defined) | Supplier name, component name, version, dependencies, license, relationship |
| CISA SBOM Guidance | US | 2023 | Self-attestation for software used by federal agencies |
| EU Cyber Resilience Act | EU | 2024-2027 (phased) | SBOM + vulnerability reporting for all connected products |
| UK Product Security Act | UK | 2024 | SBOM for IoT devices |
| Japan Cybersecurity Framework | Japan | 2023 | Industry-specific SBOM guidance |
| India CERT-In | India | 2022 | Vulnerability disclosure |
| Australia Essential 8 | Australia | 2023 | Supply chain security (SBOM recommended) |
| China MLPS 2.0 | China | 2019 | Software supply chain security |

**NTIA Minimum SBOM Elements:**

| Field | Description | Required? |
|-------|-------------|-----------|
| Supplier Name | Entity that creates or maintains each component | Required |
| Component Name | Designation of each component | Required |
| Version | Specific version string | Required |
| Other Unique Identifiers | CPE, PURL, SWID | Required (at least one) |
| Dependency Relationship | How components are related | Required |
| Author Name | Creator of SBOM data | Required |
| Timestamp | Date/time of SBOM creation | Required |
| License | License information (SPDX ID preferred) | Recommended |

**SBOM formats:**

| Format | Type | Latest Version | Key Features |
|--------|------|---------------|--------------|
| SPDX | ISO/IEC 5962:2021 | 2.3 | JSON, RDF/XML, tag:value, spreadsheets |
| CycloneDX | OWASP project | 1.6 | JSON, XML; designed for DevSecOps |
| SWID | ISO/IEC 19770-2 | 2015 | XML; primarily Windows software tagging |

**SPDX vs. CycloneDX:**

| Aspect | SPDX | CycloneDX |
|--------|------|-----------|
| Primary domain | License compliance, legal | Security, DevSecOps |
| ISO standard | Yes (ISO/IEC 5962) | No (emerging) |
| License expressiveness | Very high (1000+ licenses) | Moderate (SPDX IDs) |
| Vulnerability support | Moderate | Very high (BOM + VEX) |
| Dependency graph | Simple | Advanced |
| Tool support | Widespread | Widespread |
| Regulatory acceptance | High (US EO 14028) | High (NTIA, CISA) |

### 5.4 Compliance in CI/CD Pipelines

Integrating OSS compliance into the CI/CD pipeline ensures that compliance is automatic and continuous.

**CI/CD compliance workflow (using ORT — OSS Review Toolkit):**

`	ext
Code -> CI Build -> ORT Analyzer -> ORT Scanner -> ORT Evaluator -> ORT Reporter
                     |               |              |               |
                Dependency        License        Policy          Compliance
                resolution       scanning       rules           report
                                                matching
`

**Pipeline stages:**

1. **Analyzer:** Resolves dependencies from package managers (pip, npm, Maven, NuGet, etc.)
2. **Scanner:** Downloads each dependency and runs license scanning (Scancode, FOSSology)
3. **Evaluator:** Applies policy rules against discovered licenses
4. **Reporter:** Generates SPDX/CycloneDX output, compliance report, notice file, etc.

**Policy rules example (ORT Curations):**

`yaml
allowed_licenses:
  - MIT
  - Apache-2.0
  - BSD-2-Clause
  - BSD-3-Clause
  - ISC
  - Unlicense
  - CC0-1.0
  - MPL-2.0
  - LGPL-3.0-only
  - LGPL-3.0-or-later
  - PostgreSQL
  - Zlib

review_required:
  - GPL-2.0-only
  - GPL-2.0-or-later
  - GPL-3.0-only
  - GPL-3.0-or-later
  - AGPL-3.0-only
  - AGPL-3.0-or-later
  - SSPL-1.0

prohibited:
  - BUSL-1.1
  - CC-BY-NC-4.0
  - Proprietary
  - LicenseRef-scancode-proprietary-license
`

**GitHub Actions integration example:**

`yaml
name: OSS Compliance
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run OSS Review Toolkit
        uses: oss-review-toolkit/ort-ci-github-action@v1
        with:
          ort-version: "23.3.0"
      - name: Upload SPDX SBOM
        uses: actions/upload-artifact@v4
        with:
          name: sbom
          path: ort/reporter/output.spdx.json
      - name: Check for license violations
        run: |
          if grep -q "ERROR" ort/reporter/evaluation-result.json; then
            echo "License violations found!"
            exit 1
          fi
`

### 5.5 Distributing OSS with Proprietary Software

One of the most common compliance scenarios: distributing proprietary software that incorporates or is distributed alongside OSS components.

**Distribution scenarios:**

| Scenario | Compliance Complexity | Risk |
|----------|----------------------|------|
| Proprietary binary + statically linked GPL library | RED — GPL violation | High (copyright infringement) |
| Proprietary binary + dynamically linked GPL library | RED — Same legal effect | High |
| Proprietary binary + LGPL library (dynamic) | YELLOW — Must allow user relinking | Moderate |
| Proprietary binary + MIT/Apache-2.0 code | GREEN — Just comply with notice requirements | Low |
| Proprietary application + system GPL library | YELLOW — "Mere aggregation" if clearly separate | Low |
| Proprietary SaaS + AGPL backend | RED — Network interaction may trigger AGPL | High |
| Proprietary code + BSD code in same product | GREEN — Notice only | Low |

**Distribution compliance checklist for proprietary software:**

1. **Inventory all OSS components** — including transitive dependencies
2. **Identify all licenses** — not just primary license for each component
3. **Determine license compatibility** — can each component legally be distributed with your proprietary code?
4. **Create notice file** (Apache 2.0, BSD, MIT requirement)
5. **Include license texts** — either in application package, download page, or manual
6. **Provide source code** for copyleft components (GPL, LGPL, AGPL, MPL)
7. **Provide installation information** for GPLv3 components in devices
8. **Document how to rebuild** the copyleft components
9. **Include modification status** — identify which OSS components you've modified
10. **Include build scripts** for copyleft components

**The "aggregate" defense (GPL § 2 / GPLv3 § 5):**

Both GPLv2 and GPLv3 recognize that a "mere aggregation" of separate programs on a storage medium does not create a derivative work.

GPLv3 § 5:
> "A compilation of a covered work with other separate and independent works, which are not by their nature extensions of the covered work, and which are not combined with it such as to form a larger program, in or on a volume of a storage or distribution medium, is called an 'aggregate' if the compilation and its resulting copyright are not used to limit the access or legal rights of the compilation's users beyond what the individual works permit."

**When is something an aggregate (not derivative)?**
- Separate processes communicating via pipes or sockets
- Clearly separated application directories
- Separate installable packages
- Web services with separate backend/frontend
- Container images with separate applications in separate layers

**Docker/container images — special considerations:**
- Each layer in a Docker image is typically an aggregate
- A base OS image (Debian, Alpine) with GPL utilities and a proprietary application is an aggregate
- But if the proprietary application links GPL libraries, it creates derivative works
- Container images should include license information for all OSS components
- Container compliance tools: Tern, Syft, Grype

### 5.6 Notice File Requirements

Certain OSS licenses require attribution in the form of a NOTICE file or similar documentation. The Apache License 2.0, BSD family, and MIT provide the most common examples.

**Apache License 2.0 § 4(d):**

> "If the Work includes a 'NOTICE' text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file."

**Standard NOTICE file structure:**

`	ext
[Project Name]
Copyright [Year] [Copyright Holder]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`

**Notice file for proprietary product using OSS:**

`	ext
This product contains software from the following open source projects:

1. Python (Python Software Foundation License)
   Copyright (c) 2001-2026 Python Software Foundation
   All Rights Reserved.
   Licensed under Python Software Foundation License (see licenses/PYTHON-LICENSE.txt)

2. Flask (BSD-3-Clause)
   Copyright 2010 Pallets
   Licensed under BSD 3-Clause License (see licenses/FLASK-LICENSE.txt)

3. Kubernetes Python Client (Apache 2.0)
   Copyright 2019 The Kubernetes Authors
   Licensed under Apache License 2.0 (see/licenses/APACHE-LICENSE.txt)

4. Requests (Apache 2.0)
   Copyright 2019 Kenneth Reitz
   Licensed under Apache License 2.0 (see/licenses/APACHE-LICENSE.txt)

5. certifi (MPL 2.0)
   Copyright 2011-2024 Kenneth Reitz
   Licensed under Mozilla Public License 2.0 (see/licenses/MPL-LICENSE.txt)

[Complete list continues for all OSS components...]
`

**BSD 3-Clause "advertising clause:"**

The original BSD License included an "advertising clause":

> "All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the [organization]."

This was removed in 1999 (becoming the modern BSD 3-Clause) because it was burdensome for products incorporating many BSD-licensed components. The old BSD 4-Clause (with the advertising clause) is now rarely used and incompatible with GPL.

### 5.7 Case Studies: Compliance Failures and Their Consequences

**Case 1: D-Link and the GPL Injunction (2006)**

- **Issue:** D-Link sold routers with BusyBox and Linux without providing source code
- **Lawsuit:** gpl-violations.org (Harald Welte) sued D-Link in Frankfurt, Germany
- **Outcome:** Injunction against D-Link — stop selling until source provided
- **Impact:** First major GPL enforcement case in Europe; established GPL as enforceable in German courts

**Case 2: Cisco / Linksys GPL Violations (2003-2005)**

- **Issue:** Cisco (Linksys division) used GPL-licensed code (Linux, BusyBox, etc.) in WRT54G routers without releasing source
- **Resolution:** FSF sued; Cisco settled by:
  - Publicly releasing source code for affected products
  - Appointing an OSS compliance officer
  - Training engineers on GPL compliance
  - Making financial contribution to FSF
- **Impact:** Created awareness of GPL enforcement in corporate America; led to many companies' first OSS compliance programs

**Case 3: Verizon vs. BusyBox (2007-2008)**

- **Issue:** Verizon distributed Actiontec FiOS routers containing BusyBox GPL code without source
- **Resolution:** SFLC filed suit; settled with financial contribution plus compliance commitments
- **Impact:** Showed that even large telecom companies cannot ignore GPL compliance; enforced against distribution channel

**Case 4: Samsung GPL Violations (2006-2007)**

- **Issue:** Samsung Blu-ray players, TVs, and printers used GPL code without providing source
- **Action:** Multiple reports to gpl-violations.org; Harald Welte enforcement
- **Outcome:** Samsung agreed to release source, implement compliance processes, and cease sales of non-compliant products
- **Impact:** One of the first major consumer electronics GPL enforcement cases

**Case 5: Vizio Smart TV GPL Compliance (2018-2019)**

- **Issue:** Vizio SmartCast TVs used Linux kernel and other GPL components without source distribution
- **Action:** Software Freedom Conservancy (SFC) publicly named Vizio
- **Resolution:** Vizio released source after SFC campaign
- **Impact:** Showed public naming can be effective when litigation is impractical

**Case 6: Best Buy BusyBox (2009)**

- **Issue:** Best Buy sold Insignia DVD players containing GPL code without source
- **Resolution:** SFLC settled — Best Buy contributed to FOSS fund, released source, and established OSS compliance procedures
- **Impact:** Unusual case of retailer being held accountable for OSS compliance

**Case 7: VMware GPL Lawsuit (2015-2023)**

- **Issue:** VMware ESXi hypervisor allegedly contained Linux kernel code without releasing ESXi modules under GPL
- **Claim:** VMware's vmkernel is a derivative work of Linux kernel
- **Defense:** vmkernel communicates through standard system call interface
- **Outcome:** German court initially ruled against SFC; reversed in part on appeal; settled 2023
- **Impact:** Established that kernel module boundaries are significant for derivative work analysis

**Case 8: Hulu and jQuery (2015)**

- **Issue:** Hulu's mobile app credited "jQuery" but omitted license
- **Resolution:** Hulu updated their notices to comply with MIT license requirements
- **Impact:** Minor case, but illustrative of how failures occur in mobile app distribution

**Lessons from compliance failures:**

1. **Embedded systems are the highest risk** — GPL violations most common and most aggressively enforced
2. **Distribution of binaries triggers obligations** — mere internal use is safe
3. **Ignorance is not a defense** — companies are liable for what their code contains, even if they didn't know
4. **Transparency is the best defense** — proactive compliance programs prevent enforcement actions
5. **Settlement costs are material** — legal fees + remediation + financial settlement can easily reach -+
6. **Reputational damage matters** — compliance failures affect customer trust and developer recruitment

---

## Part 6: Export Controls & OSS

### 6.1 EAR (Export Administration Regulations) and OSS

Export controls regulate what technology can be sent where, to whom, and for what purpose. OSS is not immune — despite common belief that "open source is always export-free."

**BIS (Bureau of Industry and Security):** The US agency that administers the Export Administration Regulations (EAR). The EAR controls "dual-use" items — commercial items that could have military applications.

**Fundamental principle:** OSS that is "publicly available" is generally not subject to export controls. EAR § 734.3(b) and § 734.7 provide specific exemptions for publicly available technology and software.

**EAR § 734.7 — "Publicly available" software:**

> "Software is publicly available [...] if it is already published or will be published [...] by one of the following:
> (i) Periodicals, books, print, electronic, or other media available for general distribution to any member of the public or to a community of persons interested in the subject matter (e.g., open source groups), either free or at a price that does not exceed the cost of reproduction and distribution.
> (ii) Libraries or other publicly accessible collections.
> (iii) Unlimited distribution at trade or professional shows, conferences, or seminars.
> (iv) Public dissemination (including over the Internet) in any form."

**What this means for OSS:**
- OSS published on GitHub, GitLab, or similar platforms is "publicly available"
- Publicly available software is excluded from most EAR controls
- However, there are important exceptions (see below)

### 6.2 TSU and ENC Exemptions

**TSU (Technology and Software Unrestricted) — EAR § 740.13:**

TSU is a license exception that authorizes the export, reexport, and transfer of "mass market" and "publicly available" software.

**Conditions for TSU exception:**
1. Software must be "publicly available" (EAR § 734.7)
2. Software must be "mass market" — sold to the general public without restriction
3. The software must not be specifically designed for controlled purposes

**TSU and OSS:**
- Most OSS qualifies as "publicly available" and therefore eligible for TSU
- No mass market requirement for publicly available software (the mass market provision is a separate track)
- OSS can be exported under TSU even if it's not "mass market" (i.e., even for niche OSS)

**ENC (Encryption Commodities and Software) — EAR § 740.17:**

The ENC license exception covers encryption software — historically the most heavily regulated category of software.

**ENC requirements:**
- Encryption software must be "publicly available" (published)
- Must notify BIS via email (for certain categories)
- Must comply with annual review requirements (for certain categories)
- Must not be specifically designed for encryption cracking or malicious use

**OSS encryption software — current framework:**

As of 2024, OSS encryption software benefits from a substantial regulatory relaxation:

1. **Publicly available encryption OSS** is generally not subject to EAR (per BIS final rule, 2016)
2. **Notification requirement:** OSS encryption projects are encouraged (but not required) to notify BIS/crypto@bis.doc.gov
3. **No review required:** BIS removed the review requirement for publicly available encryption software in 2016
4. **Self-classification:** OSS projects should self-classify their encryption under EAR (CCATS not required for publicly available software)
5. **ECC (Elliptic Curve Cryptography) and post-quantum:** OSS implementing modern cryptography is covered by the same exemption

### 6.3 Encryption OSS and Export Controls

**Historical context:**

Cryptography has been regulated as a munition under the Wassenaar Arrangement and US ITAR (International Traffic in Arms Regulations). Until 2000, strong encryption was classified as a munition — export required State Department approval.

**1996-2000: Regulatory relaxation:**
- Clinton administration moved encryption regulation from State (ITAR) to Commerce (EAR)
- 1999: "Publicly available" encryption OSS exempted from EAR
- 2000: BIS published final rule implementing the exemption
- 2016: BIS removed review and notification requirements for most publicly available encryption

**Wassenaar Arrangement (2017 update):**
- International agreement controlling conventional arms and dual-use goods
- 2017: Updated to include "intrusion software" — tools for network surveillance
- OSS development tools are generally exempt under the "fundamental research" exception
- But OSS projects that create intrusion software may need to evaluate Wassenaar obligations

**Current encryption categorization:**

| Category | ECCN | Control | OSS Status |
|----------|------|---------|------------|
| Mass market encryption software (general) | 5A992.c | EAR (lowest level) | OSS qualifies as "mass market" or "publicly available" |
| Mass market encryption (government end-use) | 5A002 | EAR (higher level) | Most OSS exported under TSU exception |
| Public domain encryption software | No ECCN (EAR99) | Not controlled | OSS published online qualifies |
| Non-standard cryptography (proprietary, unpublished) | 5A002 | EAR (requires license) | OSS not covered (must be published) |
| Cryptography for hacking/penetration testing | 5A002 | EAR (requires license) | Intrusion software OSS needs review |

**Practical guidance for encryption OSS projects:**

1. **Publish on a public repository** (GitHub, GitLab) — ensures "publicly available" status
2. **Do not restrict access** — no login walls, NDAs, or country-based blocking
3. **Document your encryption in README** — describe algorithm, key size, protocol
4. **Include export notice** in documentation (see template in Part 9)
5. **Do not provide development services for classified government programs**
6. **Monitor Wassenaar updates** — intrusion software controls may affect pen-testing tool OSS

### 6.4 Sanctions and OSS Contributions

**US sanctions programs:** OFAC (Office of Foreign Assets Control) administers US sanctions against countries, entities, and individuals. Current sanctioned jurisdictions:

| Comprehensive sanctions | Targeted sanctions | Embargo |
|------------------------|-------------------|---------|
| Iran | Russia (2022+) | Cuba |
| Syria | Myanmar (Burma) | North Korea |
| North Korea | Venezuela (targeted) | Iran |
| Cuba | Belarus (2021+) | Syria |
| Russia (Crimea, Donetsk, Luhansk) | China (entity-specific) | |
| | Hong Kong (entity-specific) | |

**Sanctions and OSS — key questions:**

**Can sanctioned entities use OSS?**
- Generally YES — OSS that is "publicly available" is exempt from sanctions
- OFAC General License E (2022) specifically authorizes the export of publicly available OSS to Russia
- OSS on GitHub/GitLab is generally available to anyone, including sanctioned entities
- However: providing "services" (custom development, consulting) to sanctioned entities IS restricted

**Can sanctioned entities contribute to OSS?**
- Generally YES for public contributions (PRs, issues, comments)
- These are "publicly available" communications, not subject to sanctions
- But: providing paid development services to sanctioned entities is prohibited
- But: helping sanctioned entities evade sanctions (through code contributions) could be illegal

**Can you block sanctioned entities from your OSS project?**
- You are not required to block them
- OFAC encourages voluntary compliance but does not require it for publicly available OSS
- Blocking might actually complicate your position (selectively denying access to public code)
- If you knowingly provide services (paid) to sanctioned entities through your project, you may need to block

**OFAC General License E (Russia — April 2022):**

> "All transactions and activities prohibited by the Russian Harmful Foreign Activities Sanctions Regulations [...] that are ordinarily incident and necessary to the exportation or reexportation of publicly available open source software [...] to the Russian Federation are hereby authorized."

**OFAC compliance for OSS projects:**

1. **Do not knowingly provide services to sanctioned entities** (paid support, consulting)
2. **Do not include sanctioned entities as project maintainers with privileged access**
3. **Do not use sanctioned entity servers** to host or distribute your code
4. **Document your compliance approach** — include an export/sanctions note in your project
5. **Monitor OFAC guidance** — sanctions regimes change rapidly (especially Russia/Ukraine)

**EU sanctions:** EU sanctions are less directly applicable to OSS (EU sanctions focus on export of goods, not information), but EU entities must still comply with EU sanctions regimes. The EU's position on OSS largely mirrors OFAC's — publicly available OSS is generally exempt.

**China sanctions considerations:**
- China's sanctions regime is less developed than US or EU
- China-based entities must comply with China's export control law (2020)
- China's export control list includes "items related to the maintenance of national security and interests"
- OSS projects with dual-use implications (AI, cryptography, surveillance) should evaluate China export control compliance

### 6.5 Jurisdictional Differences: US, EU, China Export Controls

**US Export Controls (EAR):**

| Aspect | Detail |
|--------|--------|
| Regulatory agency | BIS (Bureau of Industry and Security), Department of Commerce |
| Primary statute | Export Control Reform Act (ECRA) of 2018 |
| Controlling framework | Commerce Control List (CCL) / ECCN |
| License exceptions for OSS | TSU (§ 740.13), ENC (§ 740.17), publicly available (§ 734.7) |
| Encryption regulation | EAR § 740.17 (published encryption exempt) |
| Sanctions | OFAC (Treasury Department) |
| Entity lists | Entity List, Denied Persons List, Unverified List, SDN |

**EU Export Controls:**

| Aspect | Detail |
|--------|--------|
| Regulatory framework | EU Dual-Use Regulation (2021/821) |
| National implementation | Member states may add national controls |
| Encryption controls | Less restrictive than US; includes "intrusion software" |
| OSS exemption | Publicly available / fundamental research / open source exempt |
| Sanctions | EU Common Foreign and Security Policy decisions |
| Key difference | No equivalent to OFAC sanctions list breadth |

**UK Export Controls (post-Brexit):**

| Aspect | Detail |
|--------|--------|
| Framework | UK Strategic Export Control Lists |
| Agency | Export Control Joint Unit (ECJU) |
| Encryption | Similar to US/EU; publicly available software exempt |
| Sanctions | UK autonomous sanctions (Russia, Iran, Belarus, etc.) |
| OSS exemption | Publicly available / fundamental research exempt |

**China Export Controls:**

| Aspect | Detail |
|--------|--------|
| Framework | Export Control Law of the People's Republic of China (2020) |
| Agency | Ministry of Commerce (MOFCOM), General Administration of Customs |
| Control lists | Two-tier: "controlled items" and "prohibited items" |
| OSS treatment | Publicly available software generally exempt, but broad "national security" discretion |
| Encryption | Commercial encryption controlled; import/export licenses required |
| Key concern | Broad discretion means OSS export could theoretically be restricted |
| AI/ML controls | Emerging controls on AI training data and model weights (2024+) |

**Comparison table:**

| Aspect | US | EU | China |
|--------|----|----|-------|
| Legal foundation | Statutory (ECRA) | Regulation (Dual-Use Regulation) | Statute (Export Control Law) |
| Enforcement | Aggressive (BIS, OFAC) | Moderate (national enforcement) | Emerging |
| OSS exemption | Explicit (EAR § 734.7) | Explicit (public domain) | Ambiguous (broad discretion) |
| Encryption OSS | Exempt (published) | Exempt (public domain) | Controlled (license needed) |
| Sanctions | Comprehensive (Iran, Russia, Syria, N. Korea, Cuba) | Targeted (Russia, Iran, Syria) | Targeted |
| Entity lists | Multiple (SDN, Entity List, DPL, UVL) | Limited | Unreliable (unpublished) |
| Penalties | Criminal + civil (up to /violation + 10 yrs) | Criminal + civil (varies) | Criminal (up to 10 years) |
| Extraterritorial reach | Broad (US-origin content, US-made, foreign products with US parts) | Limited | None (so far) |

### 6.6 Compliance Checklist for OSS Projects

**Export compliance quick-reference for project maintainers:**

- [ ] Have you determined your project's ECCN (Export Control Classification Number)?
  - EAR99 (default for most software) — publicly available exemption applies
  - 5A002 / 5A992 (encryption) — publicly available exemption applies
  - 5D002 (encryption software) — publicly available exemption applies
- [ ] Is your project publicly available? (published on public repository, no access restrictions)
- [ ] Does your project implement non-standard cryptography? (proprietary/unpublished algorithms)
- [ ] Does your project include intrusion software? (pen-testing, network surveillance, malware)
- [ ] Do you provide paid services to sanctioned entities or individuals?
- [ ] Do you restrict access based on geography? (if yes, may lose "publicly available" status)
- [ ] Have you included an export notice in your README / documentation?
- [ ] Do you have a process for reviewing OFAC sanctions list changes?
- [ ] Do you screen large financial contributions or paid development sponsors?
- [ ] Have you documented your compliance position?
- [ ] Is your project subject to Wassenaar Arrangement controls?
- [ ] Are your contributors in sanctioned jurisdictions? (for public contributions: generally OK)
- [ ] Do you re-export encryption software to sanctioned countries? (if published: exempt)
- [ ] Do your contributors have access to proprietary or unpublished code?
- [ ] Do you participate in US government contract / DoD procurement? (may require additional compliance)

**When to seek legal advice (red flags):**
- Your project implements non-standard or unpublished encryption
- Your project is specifically designed for military, surveillance, or defense applications
- You have paid contractors in sanctioned jurisdictions
- Your project is acquired or hosted in a jurisdiction with export restrictions
- Your project includes code from sanctioned entities
- Your project is classified under a specific ECCN (not EAR99)

---

## Part 7: Privacy & Data Protection

### 7.1 GDPR Compliance for OSS Projects

The EU General Data Protection Regulation (GDPR) affects OSS projects that collect, process, or store personal data of EU residents.

**Does GDPR apply to OSS projects?**

| Scenario | GDPR Applies? | Notes |
|----------|---------------|-------|
| Project website with analytics (tracking cookies) | YES | Cookie consent required for EU visitors |
| OSS project with telemetry/crash reporting | YES | If telemetry sends personal data to your servers |
| OSS library on npm/PyPI (no servers, no telemetry) | NO | No personal data collection; code itself has no GDPR obligations |
| OSS project accepting donations via Stripe/PayPal | YES (payment processor) | You're a data controller for donor personal data |
| OSS project with user accounts (GitHub Issues) | YES (GitHub as controller) | GitHub is the controller, not you |
| OSS community forum (Discourse, Flarum) | YES | You are a data controller for forum user data |
| OSS that processes personal data (image recognition, NLP) | IT DEPENDS | If you provide the service, you're the controller; if users use your library, they're the controller |

**GDPR roles for OSS projects:**

| Role | Responsibility | Example |
|------|----------------|---------|
| **Data Controller** | Decides purpose and means of processing | OSS project maintainer running a website, forum, or telemetry |
| **Data Processor** | Processes data on behalf of controller | Hosting provider, email service, analytics tool |
| **Data Subject** | The natural person whose data is processed | OSS user visiting website or submitting telemetry |

**What OSS projects typically need to do:**

1. **Determine if GDPR applies** — do you have EU users/subjects?
2. **Document data processing activities** (Art. 30 Record of Processing Activities)
3. **Establish a lawful basis for processing** (Art. 6): consent, legitimate interest, contract necessity, legal obligation
4. **Provide privacy notice** (Art. 13-14) — what data you collect, why, how long, with whom shared
5. **Implement data subject rights** (Art. 15-22):
   - Right to access
   - Right to rectification
   - Right to erasure ("right to be forgotten")
   - Right to data portability
   - Right to object
6. **Ensure data security** (Art. 32) — appropriate technical measures
7. **Data breach notification** (Art. 33-34) — notify regulator within 72 hours
8. **Data Processing Agreement (DPA)** with sub-processors
9. **Appoint Data Protection Officer (DPO)** if required (Art. 37)
10. **Conduct Data Protection Impact Assessment (DPIA)** if high-risk processing

**Practical steps for OSS maintainers:**

- **Minimize data collection** — only collect what you actually need
- **If you don't collect data, you don't have GDPR problems**
- **Use privacy-friendly analytics** (Plausible, Matomo, Umami) instead of Google Analytics
- **Host your own infrastructure** (avoid US-based cloud providers for EU personal data — Schrems II ruling)
- **Provide clear privacy policy** — see template in Part 9
- **Handle data subject requests** — provide a privacy@ email address
- **Have a data retention and deletion policy**
- **Document your vendors** — who processes data on your behalf

### 7.2 Privacy Policies for OSS Websites and Services

**Essential elements of a privacy policy (GDPR Art. 13):**

1. **Identity and contact details of the controller** — who you are, mailing address, email
2. **Contact details of DPO**, if applicable
3. **Purpose and lawful basis of processing**
4. **Legitimate interests pursued** (if applicable)
5. **Recipients of personal data** — who you share data with
6. **International transfers** — if data is transferred outside EU/EEA
7. **Retention period** — how long data is kept
8. **Data subject rights** — access, rectification, erasure, restriction, portability, objection
9. **Right to withdraw consent** — if processing is based on consent
10. **Right to lodge complaint with supervisory authority**
11. **Whether data is required for a contract** — statutory/contractual requirement
12. **Automated decision-making** — if profiles or decisions are made without human intervention

### 7.3 Data Collection in OSS: Telemetry, Crash Reporting, Analytics

**The spectrum of data collection in OSS:**

| Level | Examples | Privacy Risk | Transparency |
|-------|----------|--------------|--------------|
| None | No analytics, no tracking, no telemetry | None | Perfect |
| Basic | Aggregated page view counts (no PII) | Low | Good |
| Moderate | Crash reporting (opt-in, anonymized) | Medium | Needs clear notice |
| Advanced | Feature usage tracking, user telemetry | Medium-High | Needs clear notice + consent |
| High | User accounts, session tracking, usage profiles | High | Needs full GDPR compliance |

**Best practices for OSS telemetry:**

**Opt-in, not opt-out:**
- Telemetry should be OFF by default
- Ask users during installation/first run
- Clearly explain what data is collected and why
- Provide easy way to opt out later

**Anonymize by default:**
- Strip IP addresses (or keep only country-level)
- Remove usernames, emails, identifiable stack traces
- Use differential privacy techniques
- Aggregate before sending

**Transparency:**
- Document telemetry in README and docs
- Show what would be sent before sending
- Make telemetry code visible and auditable
- Publish telemetry data (anonymized) for community review

**Example telemetry disclosure:**

`	ext
[Project Name] collects usage data to help us improve the project.
This is OPT-IN and disabled by default.

What we collect:
- Python version
- Operating system type
- [Project] version
- Command used (anonymized)
- Error types (no stack traces unless explicitly enabled)

What we do NOT collect:
- Personal data
- IP addresses (anonymized to country level)
- Usernames or passwords
- File contents or project names

You can enable telemetry with: [project] config set telemetry on
You can disable telemetry with: [project] config set telemetry off
Data is sent to [URL/description]. View our privacy policy at [URL].
`

**Tools comparison — analytics:**

| Tool | Self-Hosted? | GDPR-Compliant? | Cost | Notes |
|------|-------------|-----------------|------|-------|
| Plausible | Yes | Yes (cookieless) | /mo or self-hosted | Recommended for OSS |
| Matomo | Yes | Yes (cookie consent) | Free (self-hosted) | Feature-rich |
| Umami | Yes | Yes (cookieless) | Free | Simple, lightweight |
| Fathom | Yes | Yes (cookieless) | /mo or self-hosted | Privacy-first |
| GoatCounter | Yes | Yes (no tracking) | Free (donation) | Extremely simple |
| Google Analytics | No | Requires cookie consent | Free | Heavily tracked; currently being sued under GDPR |
| Amplitude | No | Requires consent | Freemium | Product analytics |

**Tools comparison — crash reporting:**

| Tool | Self-Hosted? | GDPR-Compliant? | Cost | Notes |
|------|-------------|-----------------|------|-------|
| Sentry | Yes (self-hosted) | Yes (with config) | Free tier / Self-hosted | Industry standard, OSS-friendly |
| Bugsnag | No | Yes (DPA available) | Freemium | |
| Rollbar | No | Yes (DPA available) | Freemium | |
| Raygun | No | Yes (DPA available) | Paid | |
| Crashlytics (Firebase) | No | Requires data processing agreement | Free | Google-owned |
| AppCenter (Microsoft) | No | Requires DPA | Free | Deprecated (2024) |
| Sentry Self-Hosted | Yes | Full control | Free | Recommended for privacy-sensitive OSS |

### 7.4 Privacy-Friendly Alternatives (Plausible, Matomo vs. Google Analytics)

**Why Google Analytics is problematic for OSS projects:**

1. **Schrems II ruling (CJEU, July 2020):** Standard Contractual Clauses (SCCs) are insufficient for US data transfers due to US surveillance laws (FISA § 702)
2. **Austrian DSB (2022):** Ruled that use of Google Analytics violates GDPR — data transferred to US without adequate protection
3. **European Data Protection Board (EDPB, 2023):** Confirmed that Google Analytics uses are generally unlawful for EU residents
4. **Schrems III pending (2024-2025):** The EU-US Data Privacy Framework (DPF) faces legal challenge

**Privacy-friendly analytics comparison:**

| Feature | Plausible | Matomo | Umami | Fathom |
|---------|-----------|--------|-------|--------|
| Self-hostable | Yes | Yes | Yes | Yes |
| No cookies | Yes | No (can be configured) | Yes | Yes |
| Script size | <1KB | ~30KB | ~2KB | <3KB |
| Ad-blocker blocking | Low (popular) | Low | Very low | Low |
| API access | Yes | Yes | Yes | Yes |
| Ownership | Open source (AGPL) | Open source (GPLv3) | Open source (MIT) | Proprietary |
| GDPR compliance | Built-in | Built-in (with config) | Built-in | Built-in |
| Event tracking | Yes | Yes | Yes | Yes |
| Goal tracking | Yes | Yes | Yes | Yes |
| UTM tracking | Yes | Yes | Yes | Yes |

### 7.5 Cookie Consent for OSS Documentation Sites

**Do OSS documentation sites need cookie consent?**
- If you use any tracking cookies (Google Analytics, social sharing buttons), YES
- If you use NO cookies, NO — but you should still declare "no cookies" in your privacy policy
- EU ePrivacy Directive (Cookie Law) requires prior informed consent for non-essential cookies

**Cookie categories:**

| Category | Need Consent? | Examples |
|----------|--------------|----------|
| Strictly necessary | NO | Session cookies, CSRF tokens |
| Functional | YES (can be legitimate interest) | Language preference, theme preference |
| Analytics | YES | Google Analytics, Plausible, Matomo |
| Marketing / tracking | YES | Facebook Pixel, Google Ads |
| Third-party embeds | YES | YouTube video, Twitter embed, Disqus |

**Cookie consent implementation options:**

| Tool | Type | Cost | GDPR Compliant? |
|------|------|------|-----------------|
| Cookiebot | Embedded script | Free (up to 100 pages) | Yes |
| Osano | Embedded script | Free (limited) | Yes |
| Finsweet Cookie Consent | Webflow-specific | Free | Yes |
| Custom implementation | DIY | Free | Yes (if done right) |
| Termly | Embedded script | Free (basic) | Yes |
| Complianz | WordPress plugin | Free (basic) | Yes |

**For static documentation sites (Docusaurus, MkDocs, Sphinx):**

Most OSS documentation sites use static generators with no server-side processing. Cookie needs are minimal:

1. **If using Google Analytics:** The default GA script sets cookies. You need a consent banner.
2. **If using Plausible/Umami:** No cookies needed. No banner needed.
3. **If using no analytics:** No cookies at all. No banner needed.

**Recommended approach for OSS docs sites:**
- Use Plausible or Matomo (self-hosted) — no cookie consent needed
- Avoid Google Analytics and social media embeds
- Add a one-line privacy notice in your footer: "This site uses privacy-friendly analytics (no cookies). No personal data is collected."
- If you MUST use Google Analytics, implement a cookie consent banner with explicit opt-in for EU visitors

### 7.6 CalOPPA, PIPEDA, LGPD Considerations

**CalOPPA (California Online Privacy Protection Act):**
- Applies to commercial websites that collect PII from California residents
- Requires: privacy policy, disclosure of Do Not Track responses, notice of data collection
- OSS projects with websites that serve California users should have a privacy policy

**PIPEDA (Canada):**
- Applies to organizations collecting personal information in commercial activities
- OSS projects that accept donations or provide paid support likely need PIPEDA compliance
- 10 fair information principles: accountability, identifying purposes, consent, limiting collection, limiting use/retention, accuracy, safeguards, openness, individual access, challenging compliance

**LGPD (Brazil):**
- Law No. 13.709/2018 (effective August 2020)
- Similar to GDPR in structure and scope
- Applies to any organization processing data of Brazilian residents
- Penalties: up to 2% of revenue in Brazil (capped at R million per violation)

**LGPD vs. GDPR comparison:**

| Aspect | GDPR | LGPD |
|--------|------|------|
| Territorial scope | EU establishment or targeting EU | Brazil establishment or targeting Brazilians |
| Consent | One of 6 lawful bases | One of 10 lawful bases |
| DPO | Required in certain cases | Required in certain cases |
| Breach notification | 72 hours | Reasonable period |
| Penalties | Up to €20M or 4% of global revenue | Up to 2% of Brazil revenue (capped) |
| Data subject rights | 8 rights | 8 rights (similar) |
| International transfers | Adequacy decision, SCCs, BCRs | Equivalency mechanisms |

**Practical table — which privacy laws apply to your OSS project:**

| Your project serves... | Populated by... | Laws to consider |
|------------------------|-----------------|------------------|
| Global (default) | EU users | GDPR |
| | California users | CCPA / CalOPPA |
| | Brazil users | LGPD |
| | Canada users | PIPEDA |
| | South Korea users | PIPA |
| | Japan users | APPI |
| | All (website) | ePrivacy Directive (EU Cookie Law) |
| EU-only | EU users | GDPR + ePrivacy |
| US-only | US users | No comprehensive federal law; state laws (CCPA, CPA, CDPA, etc.) |
| Self-hosted / no external services | No users' personal data | None (but security still relevant) |

### 7.7 Privacy in OSS Mobile Apps

**Mobile app privacy requirements:**

1. **App Store privacy labels** (Apple, since December 2020):
   - Required for all iOS apps (including OSS)
   - Must disclose data collection, sharing, and tracking practices
   - OSS apps must submit privacy labels to App Store Connect
   - Categories: Contact Info, Identifiers, Health & Fitness, Financial, Location, Sensitive Info, Contacts, User Content, Browsing History, Search History, Diagnostics, Purchases, Usage Data, Crash Data, Performance Data, Other

2. **Google Play Data Safety section** (since April 2022):
   - Required for all Android apps (including OSS)
   - Must declare data collection, sharing, and security practices
   - Categories similar to Apple's privacy labels

3. **CCPA/CPRA enforcement against mobile apps:**
   - Clear disclosures about data sales and sharing
   - "Do Not Sell My Personal Information" link
   - Opt-out mechanisms

**What OSS mobile apps need:**

- [ ] Have you reviewed what data your app collects automatically?
- [ ] Have you listed all third-party SDKs and their data collection?
- [ ] Have you updated your Apple/Google privacy labels?
- [ ] Do you have a privacy policy link in your app?
- [ ] Do you provide opt-in/opt-out for analytics and crash reporting?
- [ ] Have you implemented data subject request handling (for GDPR/CCPA)?
- [ ] Do you transfer data outside the user's jurisdiction?
- [ ] Have you reviewed SDK privacy policies (Firebase, Sentry, etc.)?
- [ ] Do you have a DPA with your cloud provider / data processors?
- [ ] Have you documented data retention periods?

**Flutter framework and OSS mobile apps:**
- OSS apps built with Flutter often use Firebase (Google) for backend
- Firebase's data processing location (US) may conflict with GDPR
- Recommended: Self-hosted Supabase / Appwrite for EU GDPR compliance
- Sentry self-hosted for crash reporting

---

## Part 8: Contributor Agreements & Corporate Policies

### 8.1 DCO (Developer Certificate of Origin): How It Works

The Developer Certificate of Origin (DCO) is a lightweight contribution mechanism used by the Linux Kernel and thousands of other projects. It was introduced by the Linux Foundation in 2004.

**What the DCO says:**

`
Developer Certificate of Origin
Version 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
`

**How DCO sign-off works:**

`	ext
git commit -s
# Adds: Signed-off-by: Your Name <you@example.com>
`

**Why the Linux Kernel uses DCO (not CLAs):**

- **Simplicity:** No additional legal paperwork; just commit sign-off
- **Scalability:** Thousands of contributors; CLAs would be unmanageable
- **Trust model:** Relies on existing copyright law; contributor retains copyright
- **No relicensing authority:** The project cannot relicense code without contributor consent
- **Low barrier to entry:** Encourages contributions from individuals and corporations

**DCO enforcement in practice:**

- Maintainers check for Signed-off-by line in commits
- CI systems can enforce DCO presence (e.g., DCO GitHub App)
- Corporate contributions: contributor signs off as individual; corporate CLA is separate if needed
- Linux Foundation's DCO Probot: checks PRs for sign-off

**DCO vs. CLA comparison:**

| Aspect | DCO | CLA |
|--------|-----|-----|
| Legal effect | Certification of origin | Grant of rights to project |
| Copyright retention | Contributor retains full copyright | Contributor may assign or license rights |
| Relicensing ability | No (unless all contributors consent) | Yes (if CLA grants relicensing authority) |
| Contributor friction | Very low (git commit -s) | Moderate to high (legal agreement) |
| Enforcement mechanism | Sign-off line in commit | Signed legal document on file |
| Best for | Large communities, kernel-style projects | Projects requiring commercial licensing |
| Examples | Linux Kernel, Git, Docker (historical) | Apache Software Foundation, Google, CNCF |

### 8.2 CLAs: When They're Needed, What They Cover

A Contributor License Agreement is a legal agreement between a contributor and a project (or its steward) that defines the terms under which contributions are made.

**When CLAs are needed:**

1. **Dual licensing:** The project needs to offer commercial licenses alongside OSS licenses
2. **Relicensing flexibility:** The project may need to change licenses in the future
3. **Copyright assignment:** The project (or foundation) needs to own the copyright
4. **Patent protection:** The project needs explicit patent grants from contributors
5. **Large corporate contributors:** Companies want to ensure their contributions are properly documented
6. **Foundation stewardship:** ASF, CNCF, Eclipse Foundation require CLAs

**What CLAs typically cover:**

| Provision | Description |
|-----------|-------------|
| **Grant of copyright license** | Contributor grants the project a license to use, modify, and distribute contributions |
| **Grant of patent license** | Contributor grants patent rights for essential claims |
| **Representation of authority** | Contributor represents they have the right to make the grant |
| **No warranty from contributor** | Contributions provided "as is" |
| **Identification of submissions** | Mechanism for identifying what is covered |
| **Term and termination** | Perpetual license; survives termination of contributor's involvement |

**CLA types:**

**Individual CLA (ICLA):**
- Signed by individual contributors
- Covers all contributions from that individual
- Typically simple (2-3 pages)
- Example: Apache ICLA

**Corporate CLA (CCLA):**
- Signed by an authorized corporate representative
- Covers all contributions by employees of the corporation
- Lists employees authorized to contribute (Schedule A)
- More complex (negotiated terms possible)
- Example: Apache CCLA

### 8.3 Corporate CLAs vs. Individual CLAs

| Aspect | Individual CLA | Corporate CLA |
|--------|---------------|---------------|
| Signatory | Individual contributor | Corporate officer or authorized representative |
| Scope | Personal contributions | All employee contributions |
| Coverage | Single person | Entire company (employees listed in Schedule A) |
| Term | Perpetual (typically) | Until terminated by either party |
| Negotiation | No (standard form) | Sometimes negotiated |
| Complexity | Low (2-3 pages) | Moderate (4-8 pages + Schedule A) |
| Examples | Apache ICLA, Google Individual CLA | Apache CCLA, Google Corporate CLA |
| Approval | No legal review needed (usually) | Legal department review expected |

**Managing corporate CLAs effectively:**

1. **Schedule A management:** Maintain up-to-date list of authorized employees
2. **Education:** Train developers on OSS contribution policies
3. **Gatekeeping:** Require legal review for new CLA signings
4. **Audit trail:** Keep signed CLAs in a managed repository
5. **Integration:** Link CLA database to GitHub/GitLab for automated enforcement

**Corporate CLA pitfalls:**

- **Outdated Schedule A:** Employees listed may have left the company
- **No employee education:** Developers unaware of their obligations
- **Signatory authority:** Wrong person signs (lack of authority to bind company)
- **Contribution limits:** CLA may limit the types/amount of contributions
- **Termination ambiguity:** What happens to contributions after CLA terminates?
- **Assignment:** If the company is acquired, does the CLA transfer?

### 8.4 Copyright Assignment Agreements

Copyright assignment agreements transfer full ownership of the contribution from the contributor to the project or foundation.

**FSF copyright assignment (GNU project model):**

The Free Software Foundation requires copyright assignment for significant contributions to GNU projects. This allows the FSF to enforce the GPL in court.

**FSF assigns back certain rights:**
> "The FSF grants you a non-exclusive, perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, create derivative works from, publicly perform, publicly display and distribute your changes."

**Why FSF requires assignment:**
- **Enforcement:** FSF can sue for GPL violations without joining all contributors
- **Relicensing:** FSF can relicense GNU projects (e.g., GPLv2 to GPLv3)
- **Consistency:** Single entity owns copyright across entire project
- **Legal efficiency:** One plaintiff for infringement actions

**FSF assignment process:**

`	ext
Contributor signs copyright assignment
    |
FSF becomes copyright holder
    |
FSF licenses code under GPL (and any later version)
    |
FSF assigns back non-exclusive rights to contributor
    |
FSF has standing to sue for GPL violations
`

**When copyright assignment is appropriate:**

- Projects that need centralized enforcement (GNU project, GPL enforcement)
- Projects that may need to change license (requires all copyright holder consent)
- Projects operating through a foundation with legal enforcement resources
- Projects where all contributors agree on assignment terms

**When copyright assignment is problematic:**

- EU contributors: cannot assign moral rights in many jurisdictions
- Contributor resistance: many developers refuse to give up copyright
- Reduced contributor pool: assignment requirement deters contributions
- Complex management: tracking assignments and ensuring chain of title

### 8.5 Fiduciary License Agreements (FLA)

The Fiduciary License Agreement (FLA) is a European alternative to copyright assignment, developed by the Free Software Foundation Europe (FSFE).

**How FLA works:**

> The contributor grants the project steward (e.g., a foundation) the right to:
> 1. Use the contribution in any way (license, sublicense, etc.)
> 2. Enforce the license against infringers
> 3. Change the license (with certain limitations)

The contributor retains copyright ownership.

**FLA vs. copyright assignment:**

| Aspect | Copyright Assignment | FLA |
|--------|---------------------|-----|
| Copyright ownership | Transferred to assignee | Retained by contributor |
| Relicensing ability | Yes (assignee owns copyright) | Yes (FLA grants this right) |
| Enforcement standing | Yes (assignee is copyright holder) | Yes (FLA grants enforcement authority) |
| EU moral rights | Problematic (cannot assign) | Compatible (contributor retains moral rights) |
| Contributor acceptance | Low | Moderate |
| Use case | FSF GNU projects | FSFE, some EU projects |

**FLA advantages:**
- Compatible with EU copyright law (no moral rights assignment)
- More contributor-friendly than full assignment
- Still gives project steward sufficient rights to manage the project
- Can be tailored for specific governance structures

### 8.6 Balancing Contributor Protection with Project Needs

**Contributor concerns:**
- Loss of copyright ownership or control
- Relicensing of contributions without consent
- Use of contributions in ways the contributor disagrees with
- Legal liability from contributing
- Loss of attribution

**Project concerns:**
- Need to enforce license compliance
- Flexibility to change licenses if needed
- Assurance of clean chain of title
- Ability to grant patent protection to downstream users
- Consistency across contributions

**Common compromises:**

| Project Need | Contributor Protection | How to Balance |
|--------------|----------------------|----------------|
| Relicensing authority | No relicensing without consent | DCO (no relicensing), or FLA (limited relicensing) |
| Enforcement standing | Don't want to lose copyright | FLA (retain copyright, grant enforcement rights) |
| Patent protection | Don't want to grant broad patent license | Apache 2.0 model (limited to contribution) |
| Attribution | Want proper credit | Include attribution in NOTICE file |
| Legal liability protection | "As is" contributions | Standard disclaimer in CLA |
| Moral rights (EU) | Want to retain moral rights | FLA or DCO (both respect moral rights) |

**Guidelines for choosing:**

- **Small projects (< 10 contributors):** DCO is sufficient
- **Medium projects (10-100 contributors):** Light CLA (Apache-style) without assignment
- **Large projects (100+ contributors):** DCO or standardized CLA (ASF model)
- **Dual-licensing projects:** CLA with copyright assignment or broad license grant
- **Foundation projects:** Use the foundation's standard agreement
- **EU-based projects:** Use FLA or DCO to respect moral rights

### 8.7 Corporate Contribution Policies: Managing Employee OSS Contributions

**Why companies need OSS contribution policies:**

1. **IP ownership clarity:** Ensure contributions don't inadvertently transfer company IP
2. **Compliance:** Meet OSS license obligations when contributing
3. **Risk management:** Prevent employees from contributing to incompatible projects
4. **Competitive protection:** Ensure contributions align with business strategy
5. **Security:** Prevent malicious contributions (supply chain attacks)
6. **Brand:** Ensure quality and consistency of contributions

**Corporate OSS policy elements:**

| Element | Description |
|---------|-------------|
| **Contribution approval** | Who can contribute to OSS projects? (All employees? Manager approval? Legal review?) |
| **Project whitelist/blacklist** | Approved and prohibited OSS projects for contributions |
| **License compatibility** | Which OSS licenses can the company contribute to? |
| **IP review** | Process for reviewing contributions for company IP contamination |
| **CLA signing authority** | Who can sign corporate CLAs? |
| **Personal vs. professional** | Guidelines for distinguishing personal from work contributions |
| **Approval workflow** | Steps from developer request to contribution approval |
| **Training** | Required training for developers on OSS contribution policies |
| **Audit** | Regular audit of employee contributions |

**Contribution approval workflow:**

`	ext
Developer wants to contribute to OSS project
    |
Check: Is project on approved list?
--- YES -> Proceed to code review
--- NO -> Submit contribution request to legal/oss-review

Code review:
--- Is code company IP? (proprietary algorithms, trade secrets, etc.)
--- Does code include third-party dependencies? (check compatibility)
--- Is contribution within scope of employment? (work-for-hire issue)

CLA check:
--- Does the project require a CLA?
--- Has the company signed a CLA?
--- List developer on Schedule A if needed

Approval from:
--- Manager (for time allocation)
--- Legal (for IP and license review)
--- OSS committee (for project-level decisions)

Submit contribution
`

**Common corporate contribution models:**

| Model | Description | Example Companies |
|-------|-------------|-------------------|
| **Gatekeeper** | Centralized OSS review committee approves all contributions | Traditional enterprises, banks |
| **Self-serve with guardrails** | Developers contribute freely within defined boundaries; exceptions require review | Google, Microsoft, Meta |
| **Dedicated OSS team** | Full-time team manages OSS contributions and strategy | Red Hat, Canonical, SUSE |
| **Bottom-up** | Developers contribute first, report after the fact | Startups, smaller companies |

**Google's approach (self-serve with guardrails):**
- Employees can contribute to any OSS project for which Google has signed a CLA
- Google has signed CLAs for most major foundations and projects
- Most projects are pre-approved
- For non-approved projects: simple internal request process
- Contributions, once submitted, are tracked by automated tools
- Google's license allows employees to contribute on personal time without approval (Personal OSS Contributions Policy)

**Microsoft's approach (Open Source Programs Office):**
- Centralized OSPO manages corporate CLAs and policies
- Most Microsoft projects use MIT license
- Employees use @microsoft.com email for contributions
- Clear guidelines for what constitutes personal vs. professional contributions
- Automated tooling to check CLA compliance

**Meta's approach:**
- Strong culture of contributing to and using OSS
- Many projects started as Meta internal projects then open-sourced
- CLA required for contributions to Meta projects
- Own patent portfolio contributes to OIN and LOT Network

**Lessons from corporate contribution management:**

1. **Automate as much as possible** — manual processes don't scale
2. **Educate developers** on OSS licensing, copyright, and contribution policies
3. **Create a safe harbor** for personal contributions (clear guidelines, no IP confusion)
4. **Track contributions** centrally to maintain compliance
5. **Participate upstream** — contributing to OSS projects your company uses is good corporate citizenship
6. **Review contributions for security** — supply chain attacks often use malicious contributions
7. **Don't over-restrict** — overly restrictive policies drive contributions underground

---

## Part 9: Legal Templates

### 9.1 DCO Template

The Developer Certificate of Origin is standardized (Version 1.1). Projects typically include the following text in their CONTRIBUTING.md or similar file:

`	ext
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
`

**CONTRIBUTING.md instructions:**

`	ext
### Sign Your Work

We require that all contributors sign off on their commits to certify
that they have the right to submit their contribution under the
project's license.

To sign off, add a Signed-off-by line to your commit message:

    Signed-off-by: Your Name <your.email@example.com>

You can do this automatically when committing with Git:

    git commit -s

This certifies that you agree to the Developer Certificate of Origin
(DCO), version 1.1. See the full text at:
https://developercertificate.org/
`

### 9.2 Individual CLA Template

`	ext
INDIVIDUAL CONTRIBUTOR LICENSE AGREEMENT

Thank you for your interest in contributing to [Project Name]
("Project"). This Individual Contributor License Agreement ("Agreement")
documents the rights granted by contributors to the Project.

You accept and agree to the following terms and conditions for Your
present and future Contributions submitted to the Project. Except for
the license granted herein to the [Project Steward] and recipients of
software distributed by the Project, You reserve all right, title, and
interest in and to Your Contributions.

1. DEFINITIONS

"Contribution" means any original work of authorship, including any
modifications or additions to an existing work, that is intentionally
submitted by You to the Project for inclusion in, or documentation of,
any of the products owned or managed by the Project.

"Project Steward" means [Legal Entity Name], the entity that manages
the Project.

"You" (or "Your") means the individual copyright owner who signs this
Agreement.

2. GRANT OF COPYRIGHT LICENSE

Subject to the terms and conditions of this Agreement, You hereby grant
to the Project Steward and to recipients of software distributed by the
Project a perpetual, worldwide, non-exclusive, no-charge, royalty-free,
irrevocable copyright license to reproduce, prepare derivative works of,
publicly display, publicly perform, sublicense, and distribute Your
Contributions and such derivative works.

3. GRANT OF PATENT LICENSE

Subject to the terms and conditions of this Agreement, You hereby grant
to the Project Steward and to recipients of software distributed by the
Project a perpetual, worldwide, non-exclusive, no-charge, royalty-free,
irrevocable (except as stated in this section) patent license to make,
have made, use, offer to sell, sell, import, and otherwise transfer the
work to which Your Contribution was submitted, where such license
applies only to those patent claims licensable by You that are
necessarily infringed by Your Contribution(s) alone or by combination
of Your Contribution(s) with the work to which such Contribution(s) was
submitted.

If any entity institutes patent litigation against You or any other
entity (including a cross-claim or counterclaim in a lawsuit) alleging
that your Contribution, or the work to which you have contributed,
constitutes direct or contributory patent infringement, then any patent
licenses granted to that entity under this Agreement for that
Contribution or work shall terminate as of the date such litigation is
filed.

4. REPRESENTATIONS

You represent that You are legally entitled to grant the above license.
If your employer(s) has rights to intellectual property that you create
that includes your Contributions, you represent that you have received
permission to make Contributions on behalf of that employer, or that
your employer has waived such rights for your Contributions to the
Project.

You represent that each of Your Contributions is Your original creation
(see Section 7 for submissions on behalf of others).

5. SUPPORT

You are not expected to provide support for Your Contributions, except
to the extent You desire to provide support. You may provide support
for free, for a fee, or not at all. Unless required by applicable law
or agreed to in writing, You provide Your Contributions on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied, including, without limitation, any warranties or conditions of
TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR
PURPOSE.

6. SUBMISSION

To submit a Contribution, include a signed copy of this Agreement to
[Project Steward contact email or address]. The Project may require
You to sign this Agreement electronically.

7. THIRD-PARTY CONTENT

Should You wish to submit work that is not Your original creation, You
may submit it to the Project separately from any Contribution,
identifying the complete details of its source and of any license or
other restriction (including, but not limited to, related patents,
trademarks, and license agreements) of which You are personally aware,
and conspicuously marking the work as "Submitted on behalf of a
third-party: [named]".

8. NOTIFICATIONS

You agree to notify the Project Steward of any facts or circumstances
of which you become aware that would make these representations
inaccurate in any respect.

---

Please sign: ___________________________________

Print name: ___________________________________

Date: _________________________________________

Email: ________________________________________
`

### 9.3 Corporate CLA Template

`	ext
CORPORATE CONTRIBUTOR LICENSE AGREEMENT

This Corporate Contributor License Agreement ("Agreement") is entered
into by and between [Project Steward] ("Steward") and the entity
signing below ("Company"), and applies to Contributions made by
Company's employees or contractors to the [Project Name] project.

1. DEFINITIONS

"Contribution" means any original work of authorship, including any
modifications or additions to an existing work, that is intentionally
submitted by a Contributor to the Project for inclusion in, or
documentation of, any of the products owned or managed by the Project.

"Contributor" means any employee or contractor of Company who is
authorized to submit Contributions to the Project, as listed in
Schedule A attached hereto.

"You" (or "Your") means Company.

2. GRANT OF COPYRIGHT LICENSE

Company hereby grants to Steward and to recipients of software
distributed by the Project a perpetual, worldwide, non-exclusive,
no-charge, royalty-free, irrevocable copyright license to reproduce,
prepare derivative works of, publicly display, publicly perform,
sublicense, and distribute Contributions and derivative works thereof.

3. GRANT OF PATENT LICENSE

Company hereby grants to Steward and to recipients of software
distributed by the Project a perpetual, worldwide, non-exclusive,
no-charge, royalty-free, irrevocable (except as stated in this section)
patent license to make, have made, use, offer to sell, sell, import,
and otherwise transfer the work to which Contributions were submitted,
where such license applies only to those patent claims licensable by
Company that are necessarily infringed by Contributions alone or by
combination of Contributions with the work to which such Contributions
were submitted.

If any entity institutes patent litigation against Company or any
other entity alleging that a Contribution, or the work to which
Contributions have been contributed, constitutes direct or contributory
patent infringement, then any patent licenses granted to that entity
under this Agreement for that Contribution or work shall terminate as
of the date such litigation is filed.

4. REPRESENTATIONS

Company represents that it is legally entitled to grant the above
licenses. Company represents that each Contributor is authorized to
submit Contributions on behalf of Company and that each Contribution
is either Company's original creation or that Company has sufficient
rights to grant the licenses above.

5. SCHEDULE A

Company shall maintain Schedule A, which lists all individuals
authorized to submit Contributions on behalf of Company. Company shall
update Schedule A from time to time as employees or contractors are
added or removed. Company may submit Contributions only through
individuals listed on the then-current Schedule A.

6. SUPPORT

Company is not expected to provide support for Contributions, except
to the extent Company desires to provide support. Unless required by
applicable law or agreed to in writing, Contributions are provided on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.

7. NOTIFICATIONS

Company agrees to notify Steward of any facts or circumstances of
which Company becomes aware that would make the representations in
this Agreement inaccurate in any respect.

8. TERMINATION

This Agreement may be terminated by either party upon 30 days written
notice. Contributions submitted prior to termination shall continue to
be governed by this Agreement.

---

Company Name: __________________________________

Authorized Signatory: ___________________________

Title: __________________________________________

Date: ___________________________________________

SCHEDULE A — AUTHORIZED CONTRIBUTORS

[Company] authorizes the following individuals to submit Contributions
to the [Project Name] project:

Name                         Email
___________________________  _______________________________
___________________________  _______________________________
___________________________  _______________________________
`

### 9.4 Trademark Usage Guidelines Template

`	ext
[PROJECT NAME] TRADEMARK USAGE GUIDELINES

Version 1.0 — [Date]

[Project Name] is an open source project. The [Project Name] name and
logo are trademarks of [Owner Name / Foundation Name]. These guidelines
describe how you may use these trademarks.

1. WHAT THE TRADEMARKS COVER

The following are trademarks of [Owner]:

- The word mark "[Project Name]"
- The [Project Name] logo (as shown in Appendix A)
- [Any other registered or common law marks]

2. GENERAL PRINCIPLES

You may use the [Project Name] trademarks to refer to the [Project Name]
project, provided that:
(a) Your use does not suggest sponsorship or endorsement by [Owner];
(b) Your use is in accordance with these guidelines; and
(c) You include the following attribution where feasible:
    "[Project Name] is a trademark of [Owner]."

3. PERMITTED USES

Without prior written permission, you may:

(a) Use the word mark to accurately describe the [Project Name] project
    in blog posts, articles, and community discussions.
(b) Use the word mark to state that your product is "compatible with"
    or "built on" [Project Name].
(c) Use the logo in non-commercial community materials (presentations,
    meetups, user groups) that promote [Project Name].
(d) Distribute unmodified official [Project Name] builds under the
    [Project Name] name.
(e) Use the marks in screen captures, documentation, and tutorials
    that reference [Project Name].

4. USES REQUIRING PERMISSION

You must obtain prior written permission from [Owner] to:

(a) Use the marks as part of your company, product, or service name
    (e.g., "[Project Name] Enterprise" or "[Project Name] Consulting").
(b) Register a domain name containing the marks.
(c) Use the marks in modified form (different colors, proportions,
    combined with other elements).
(d) Use the marks in merchandise (t-shirts, mugs, stickers) for sale.
(e) Use the marks in commercial advertising or promotional materials.

To request permission, contact: [email address]

5. PROHIBITED USES

You may NOT:

(a) Use the marks in a way that implies endorsement, sponsorship, or
    certification by [Owner] unless officially authorized.
(b) Modify, distort, or alter the logo in any way.
(c) Use the marks in a way that is misleading, defamatory, or
    infringing.
(d) Use the marks in connection with malware, harmful software, or
    illegal activities.
(e) Register trademarks, domain names, or social media handles that
    are confusingly similar to the marks.

6. DISTRIBUTION CHANNELS

If you distribute [Project Name] software through a distribution
channel (e.g., Linux distribution, package manager, cloud marketplace),
you must include the following notice:

    "[Project Name] is a trademark of [Owner]. [Distributor] is not
    affiliated with or endorsed by [Owner]. [Project Name] is
    distributed here in accordance with its license."

7. ENFORCEMENT

[Owner] will enforce its trademark rights as necessary to prevent
consumer confusion and protect the [Project Name] brand. [Owner]
reserves the right to review all uses of its trademarks and to
request modification or cessation of any use that violates these
guidelines.

8. QUESTIONS

For questions about these guidelines or to request permission for
uses requiring approval, contact:

    [Owner Name]
    [Email Address]
    [Mailing Address]

APPENDIX A — LOGO ASSETS

[Link to logo files and brand kit]
`

### 9.5 Copyright Assignment Agreement Template

`	ext
COPYRIGHT ASSIGNMENT AGREEMENT

This Copyright Assignment Agreement ("Agreement") is entered into
between:

[Contributor Name] ("Assignor")

and

[Project Steward Organization Name] ("Assignee")

Date: ____________________

1. ASSIGNMENT

Assignor hereby irrevocably assigns and transfers to Assignee all
right, title, and interest in and to the Contributions (as defined
below), including all copyrights and rights of copyright registration
throughout the world, free and clear of any encumbrances.

2. DEFINITION OF CONTRIBUTIONS

"Contributions" means the software code, documentation, and other
materials listed in Exhibit A, including all modifications,
enhancements, and derivative works thereof.

3. RESERVATION OF RIGHTS

Assignee hereby grants to Assignor a non-exclusive, perpetual,
irrevocable, worldwide, royalty-free license to reproduce, prepare
derivative works of, publicly display, publicly perform, sublicense,
and distribute the Contributions.

4. REPRESENTATIONS AND WARRANTIES

Assignor represents and warrants that:
(a) Assignor is the sole owner of the copyrights in the Contributions;
(b) Assignor has the full right and authority to enter into this
    Agreement and make the assignment;
(c) The Contributions are original works of Assignor; and
(d) The Contributions do not infringe any third-party intellectual
    property rights.

5. FURTHER ASSURANCES

Assignor agrees to execute any documents and take any actions
reasonably requested by Assignee to perfect or record the assignment
with copyright offices or other authorities.

6. GOVERNING LAW

This Agreement shall be governed by the laws of [Jurisdiction].

7. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties
with respect to the subject matter hereof.

---

ASSIGNOR:

Signature: ___________________________________

Name: ________________________________________

Date: ________________________________________

ASSIGNEE:

Signature: ___________________________________

Name: ________________________________________

Title: ________________________________________

Date: ________________________________________

EXHIBIT A — CONTRIBUTIONS

[Description of code, files, or repositories being assigned]
`

### 9.6 Privacy Policy Template for OSS Projects

`	ext
PRIVACY POLICY FOR [PROJECT NAME]

Last Updated: [Date]

1. WHO WE ARE

[Project Name] is an open source project maintained by
[Maintainer Name / Organization] ("we," "us," "our").

Contact: [privacy@project.org]
Mailing address: [Physical address, if applicable]

2. DATA WE COLLECT

We collect the following categories of data:

a) Website Analytics
If you visit our website at [URL], we collect:
- Page views, referring URLs, browser type (user-agent)
- Anonymous, aggregated usage statistics
- [ ] IP addresses (anonymized / not collected)

b) Crash Reports (if applicable)
If you enable crash reporting in [Project Name] software:
- Operating system version and type
- [Project Name] version
- Error type and stack trace (anonymized)
- [ ] User-identifiable information (not collected)

c) Community Accounts (if applicable)
If you create an account on our community forum/platform:
- Username and display name
- Email address
- Posts, comments, and other content you submit
- IP address (for spam prevention)

d) Donations (if applicable)
If you make a donation:
- Name
- Donation amount
- Email address
- Payment information (processed by [Payment Processor])

3. HOW WE USE YOUR DATA

We use your data for the following purposes:
- [Purpose 1 — e.g., operating the website]
- [Purpose 2 — e.g., improving the software]
- [Purpose 3 — e.g., processing donations]
- [Purpose 4 — e.g., community management]

4. LAWFUL BASIS (GDPR)

We process your data under the following lawful bases:
- **Consent:** Where you have given explicit consent
- **Legitimate interests:** For security, analytics, and improvement
- **Contractual necessity:** For providing services you requested

5. DATA SHARING

We share your data with the following third parties:

| Processor | Purpose | Location | Safeguards |
|-----------|---------|----------|------------|
| [Processor 1] | [Purpose] | [Jurisdiction] | [SCCs / Adequacy Decision] |
| [Processor 2] | [Purpose] | [Jurisdiction] | [SCCs / Adequacy Decision] |

We do not sell your personal data to third parties.

6. INTERNATIONAL DATA TRANSFERS

[If you transfer data outside EU/EEA, describe safeguards]
We transfer data to [countries]. We use Standard Contractual Clauses
approved by the European Commission to ensure adequate protection.

7. DATA RETENTION

We retain your personal data for the following periods:

| Data Type | Retention Period |
|-----------|-----------------|
| Website analytics | [e.g., 26 months] |
| Crash reports | [e.g., 90 days] |
| Account data | [e.g., Duration of account + 1 year] |
| Donation records | [e.g., 7 years (tax compliance)] |

8. YOUR RIGHTS

Under applicable data protection law, you have the right to:
- Access your personal data
- Rectify inaccurate personal data
- Request erasure ("right to be forgotten")
- Restrict processing
- Data portability
- Object to processing
- Withdraw consent at any time (without affecting lawfulness of
  processing before withdrawal)

To exercise any of these rights, contact us at [privacy@project.org].
We will respond within [30] days.

9. COMPLAINTS

If you are in the EEA or UK, you have the right to lodge a complaint
with your local data protection supervisory authority.

10. COOKIES

We use the following cookies on our website:

| Cookie | Purpose | Type | Duration |
|--------|---------|------|----------|
| [Cookie name] | [Purpose] | [Strictly necessary / Analytics] | [Duration] |

[If you use only privacy-friendly analytics (no cookies), state:]
This website uses privacy-friendly analytics that do not set cookies.
No personal data is collected through analytics.

For cookie consent management, we use [Tool Name].

11. SECURITY

We implement appropriate technical and organizational measures to
protect your personal data, including [encryption at rest, TLS in
transit, access controls, etc.].

12. CHANGES TO THIS POLICY

We will notify significant changes to this policy via [method, e.g.,
our website, project mailing list, or GitHub issue].

13. DATA PROTECTION OFFICER (if applicable)

Our Data Protection Officer can be reached at: [dpo@project.org]

---

This policy was last updated on [Date].
`

### 9.7 Export Compliance Statement Template

`	ext
EXPORT COMPLIANCE STATEMENT FOR [PROJECT NAME]

Last Updated: [Date]

1. CLASSIFICATION

[Project Name] is classified as publicly available software under the
U.S. Export Administration Regulations (EAR), 15 C.F.R. §§ 734.3(b)
and 734.7. It is not subject to export controls applicable to
commercial or dual-use software.

ECCN: EAR99 (or 5D002 if encryption) — publicly available exemption
applies.

2. PUBLIC AVAILABILITY

[Project Name] is published on [GitHub/GitLab/other] at [repository
URL] and is available for download and use by any member of the public
without restriction, including:
- No login or registration requirements for access
- No access fees (beyond cost of reproduction)
- No nondisclosure agreements or other restrictions

3. ENCRYPTION NOTICE (if applicable)

[Project Name] implements [encryption algorithms/protocols] for the
purpose of [purpose, e.g., secure communication, data protection].

Under U.S. EAR § 740.17 (ENC), publicly available encryption software
is authorized for export without a license. This project self-classifies
as publicly available encryption software.

4. SANCTIONS COMPLIANCE

[Project Name] is committed to compliance with applicable sanctions
laws, including those administered by the U.S. Office of Foreign Assets
Control (OFAC). Publicly available open source software is generally
exempt from sanctions restrictions. However, we do not knowingly:

- Provide paid support or development services related to [Project
  Name] to comprehensively sanctioned countries or entities
- Use infrastructure located in comprehensively sanctioned countries
  to host or distribute [Project Name]
- Allow maintainers located in comprehensively sanctioned countries
  to access sensitive project infrastructure

5. USER RESPONSIBILITY

Users of [Project Name] are responsible for ensuring their use of the
software complies with all applicable export control and sanctions
laws in their jurisdiction. This includes obtaining any required
licenses for end-users, end-uses, or end-user destinations that may
be restricted.

6. QUESTIONS

For questions about this statement, contact [email].

---

NOTICE: This statement is provided for informational purposes and does
not constitute legal advice. Projects and users should consult with a
qualified attorney regarding their specific export compliance
obligations.
`

### 9.8 License Compliance Checklist Template

`	ext
OSS LICENSE COMPLIANCE CHECKLIST

Project/Product: ______________________________
Date: _________________________________________
Reviewer: _____________________________________

--- SECTION 1: INVENTORY ---

[ ] All OSS components in the product have been identified, including
    transitive dependencies
[ ] Each component's license has been identified
[ ] Components are categorized by license type (permissive, weak
    copyleft, strong copyleft)
[ ] Third-party notice file has been generated listing all components
[ ] Modifications to OSS components have been documented

--- SECTION 2: PERMISSIVE LICENSES (MIT, BSD, Apache 2.0, ISC) ---

[ ] Copyright notices are preserved where required
[ ] License texts are included in distribution
[ ] Apache 2.0 NOTICE file is included (if applicable)
[ ] Apache 2.0 modifications are noted (if applicable)
[ ] Attribution requirements are met

--- SECTION 3: WEAK COPYLEFT (LGPL, MPL, EPL) ---

[ ] LGPL libraries are dynamically linked (preferred)
[ ] If statically linked: object files for relinking are provided
[ ] License text is included
[ ] Modifications to LGPL/MPL/EPL code are documented
[ ] Source code of modified LGPL/MPL/EPL components is provided

--- SECTION 4: STRONG COPYLEFT (GPL, AGPL) ---

[ ] GPL components are not linked into proprietary code
[ ] Complete Corresponding Source is provided for all GPL components
[ ] Build scripts and toolchain information is included
[ ] Installation Information (GPLv3) is provided for devices
[ ] Source code distribution method is documented (download URL,
    written offer, or physical media)
[ ] Written offer for source code (if applicable) is valid for 3 years
[ ] License text (GPLv2 or GPLv3) is included

--- SECTION 5: AGPL ---

[ ] If AGPL is used for SaaS, modifications are available to network
    users
[ ] AGPL components are identified and managed
[ ] A commercial license option is available (if applicable)
[ ] Source code is accessible to all users interacting over network

--- SECTION 6: DOCUMENTATION AND NOTICES ---

[ ] NOTICE file is created (if required)
[ ] License texts for all OSS components are included in distribution
[ ] Online documentation includes attribution notices
[ ] End-user license agreement (EULA) references OSS components
[ ] OSS license obligations are disclosed to customers

--- SECTION 7: DISTRIBUTION ---

[ ] Distribution method (binary, source, SaaS, embedded) is documented
[ ] Compliance artifacts are included in release package
[ ] SBOM (SPDX or CycloneDX) is generated for the release
[ ] Customer contracts include required OSS disclosures
[ ] OWASP Dependency Check or similar tool has been run

--- SECTION 8: COMPLIANCE TOOLS ---

Tools used for compliance verification:
- [ ] FOSSology / Scancode
- [ ] ORT (OSS Review Toolkit)
- [ ] Snyk / Black Duck / FOSSA
- [ ] SPDX validator
- [ ] CycloneDX generator

--- SECTION 9: APPROVALS ---

[ ] Legal review completed
[ ] Compliance officer sign-off
[ ] Release manager sign-off

--- SECTION 10: NOTES ---

_________________________________________________
_________________________________________________
_________________________________________________
`

### 9.9 Third-Party Notice File Template

`	ext
THIRD-PARTY SOFTWARE NOTICES

This product includes software from the following open source projects:

================================================================
[Component Name] Version [Version]
Copyright [Copyright Years] [Copyright Holder]
License: [SPDX Identifier]
================================================================

[Full license text or pointer to license file]

================================================================
Component: [Component Name 2]
Version: [Version]
Copyright: [Copyright Holder(s)]
License: [SPDX Identifier]
================================================================

Licensed under the [License Name]. A copy of this license is included
in the file [filename] at [path/to/license/file].

================================================================
NOTICE file for [Component Name 3]
================================================================

[Any NOTICE file content required by Apache 2.0 components]

================================================================
Component: [Component Name 4]
Version: [Version]
Copyright: [Copyright Holder(s)]
License: [SPDX Identifier]
================================================================

[License text or reference]

================================================================
END OF THIRD-PARTY NOTICES
================================================================

[Project Name] uses [Tool Name] for license compliance scanning.
SBOM in SPDX format is available at [URL/path].
`

### 9.10 OSS Audit Report Template

`	ext
OPEN SOURCE SOFTWARE AUDIT REPORT

Report ID: [AUDIT-YYYY-NNN]
Date: _________________________
Auditor: ______________________
Audited Entity: ________________
Product/System: ________________
Version: _______________________
Scope: ________________________________________________

1. EXECUTIVE SUMMARY

Number of OSS components identified: [N]
License types overview:
- Permissive: [N] ([%])
- Weak Copyleft: [N] ([%])
- Strong Copyleft: [N] ([%])
- Unknown/unidentified: [N] ([%])

Overall compliance status:
[ ] Compliant — No issues identified
[ ] Substantially compliant — Minor issues found
[ ] Partially compliant — Medium issues found
[ ] Non-compliant — Major issues requiring immediate action

2. COMPONENT INVENTORY

| # | Component | Version | License | Risk | Modified? | Status |
|---|-----------|---------|---------|------|-----------|--------|
| 1 | [Name] | [Ver] | [Lic] | Low/Med/High | Yes/No | Compliant/Non-compliant |
| 2 | | | | | | |
| ... | | | | | | |

3. LICENSE ANALYSIS BY CATEGORY

3.1 Permissive Licenses (MIT, BSD, Apache 2.0, ISC, etc.)
Total: [N]
Compliance issues: [N]
Details: ________________________________________________

3.2 Weak Copyleft Licenses (LGPL, MPL, EPL, etc.)
Total: [N]
Compliance issues: [N]
Details: ________________________________________________

3.3 Strong Copyleft Licenses (GPL, AGPL)
Total: [N]
Compliance issues: [N]
Details: ________________________________________________

3.4 Restricted / Non-OSS Licenses
Total: [N]
Compliance issues: [N]
Details: ________________________________________________

4. COMPLIANCE ISSUES FOUND

| ID | Severity | Component | Issue | Recommendation | Target Date |
|----|----------|-----------|-------|----------------|-------------|
| 1 | High | [Comp] | [Issue description] | [Recommendation] | [Date] |
| 2 | Medium | | | | |
| 3 | Low | | | | |

5. DISTRIBUTION ANALYSIS

[ ] Source code for copyleft components is provided
[ ] Build scripts and toolchain information is included
[ ] Written offer for source code is up to date
[ ] Installation Information is provided for GPLv3 components
[ ] NOTICE file(s) are complete and accurate
[ ] License texts for all components are included

6. TOOLS USED

| Tool | Version | Scope |
|------|---------|-------|
| FOSSology | [ver] | Full codebase scan |
| Scancode Toolkit | [ver] | License identification |
| ORT (OSS Review Toolkit) | [ver] | Dependency analysis |
| Snyk / Black Duck / FOSSA | [ver] | Vulnerability + license |
| SPDX Validator | [ver] | SBOM validation |

7. AUDIT FINDINGS DETAIL

Finding 1: [Title]
- Component: [Name]
- License: [License]
- Issue: [Description of non-compliance]
- Risk: [High/Medium/Low]
- Impact: [What could happen if not fixed]
- Recommendation: [Specific action to take]
- Responsible: [Person/team]
- Due date: [Date]

Finding 2: [Title]
...

8. REMEDIATION PLAN

| Priority | Action | Owner | Target Date | Status |
|----------|--------|-------|-------------|--------|
| P1 | [Action] | [Owner] | [Date] | Open/In Progress/Resolved |
| P2 | | | | |
| P3 | | | | |

9. COMPLIANCE RECOMMENDATIONS

- [ ] Establish OSS review committee
- [ ] Implement automated license scanning in CI/CD
- [ ] Create/update OSS policy
- [ ] Provide developer training on OSS compliance
- [ ] Implement SBOM generation for all releases
- [ ] Review and update NOTICE file

10. CERTIFICATION

I certify that this audit report accurately reflects the OSS
compliance status of the audited product as of the date above.

______________________________________
Auditor Name and Signature

______________________________________
Approved By (Management)
---

**Disclaimer:** This report is provided for informational purposes and
does not constitute legal advice. Legal review of specific compliance
issues is recommended.

---

*End of document.*
