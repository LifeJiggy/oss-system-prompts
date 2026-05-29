# OSS Internationalization & Localization — Universal Reference

> A comprehensive, ecosystem-wide reference on internationalization (i18n) and localization (l10n) for open source software projects. Covers fundamentals, frameworks, workflows, community management, testing, CI/CD integration, and reusable templates.

---

## Table of Contents

1. [Part 1: Why i18n Matters in OSS](#part-1-why-i18n-matters-in-oss)
2. [Part 2: Internationalization (i18n) Fundamentals](#part-2-internationalization-i18n-fundamentals)
3. [Part 3: Localization (l10n) Workflows](#part-3-localization-l10n-workflows)
4. [Part 4: i18n by Ecosystem](#part-4-i18n-by-ecosystem)
5. [Part 5: Localization for Non-Code Artifacts](#part-5-localization-for-non-code-artifacts)
6. [Part 6: Community-Driven Localization](#part-6-community-driven-localization)
7. [Part 7: Testing i18n/l10n](#part-7-testing-i18nl10n)
8. [Part 8: i18n/l10n in CI/CD](#part-8-i18nl10n-in-cicd)
9. [Part 9: Templates](#part-9-templates)

---

## Part 1: Why i18n Matters in OSS

### 1.1 Global Reach of Open Source Software

Open source software is inherently global. Unlike proprietary software that may target specific markets, OSS projects attract contributors and users from every country and language background. The numbers are stark:

| Metric | Value | Source |
|--------|-------|--------|
| GitHub users outside US/Europe | ~45% | GitHub Octoverse 2024 |
| Non-English native speakers in OSS | ~70% | Linux Foundation survey |
| Projects with multilingual READMEs | ~15% | CHAOSS metric analysis |
| Users who prefer software in native language | ~75% | Common Sense Advisory |
| OSS projects with i18n support | ~30% | GitHub ecosystem analysis |

The internet has ~5.5 billion users. English speakers account for only ~18% of that population. For every English-speaking user who encounters your OSS project, there are four potential users who would benefit from localized content.

### 1.2 Accessibility for Non-English Speakers

Localization is an accessibility issue. Key barriers for non-English speakers in OSS:

**Language barriers in contribution:**
- Reading and understanding code comments in English
- Writing bug reports and feature requests
- Participating in maintainer discussions
- Understanding documentation and API references
- Navigating build and installation instructions

**Language barriers in usage:**
- CLI help text in English only
- Error messages in English
- GUI menus and labels in English
- Documentation available only in English
- Community support channels in English only

**The "English tax":**
A developer whose native language is not English faces:
- 30-50% slower reading comprehension of technical documentation
- 2-3x time to write a well-formatted bug report
- Reduced participation in real-time discussions (chat, meetings)
- Reluctance to ask questions in public forums
- Higher cognitive load when switching between coding and language processing

### 1.3 OSS Projects from Non-English-Speaking Countries

Many of the world's most successful OSS projects originate in non-English-speaking regions:

| Project | Origin Country | Language(s) | Impact |
|---------|---------------|-------------|--------|
| Vue.js | China | Chinese, English | Most popular JS framework in Asia |
| React | United States | English (40+ translated) | Dominant frontend framework |
| Flutter | United States | English (50+ translated) | Cross-platform UI toolkit |
| GitLab | Netherlands/Ukraine | English (70+ languages) | DevOps platform |
| Django | United States | English (80+ translated) | Python web framework |
| WordPress | United States | English (200+ languages) | CMS market leader |
| NeoVim | Global | English (20+ translated) | Editor extensibility |
| Godot Engine | Argentina/LatAm | Spanish, English (50+) | Game engine |
| GNOME | Global | 190+ languages | Desktop environment |
| KDE | Global | 100+ languages | Desktop environment |
| Blender | Netherlands | English (30+ translated) | 3D creation suite |
| Symfony | France | French, English (30+) | PHP framework |
| Joomla | Global | 74+ languages | CMS |
| Drupal | Global | 90+ languages | CMS |
| Elementary OS | United States | English (55+ translated) | Linux distribution |

### 1.4 Case Studies: Projects That Succeeded/Failed at Internationalization

#### Success: WordPress

WordPress powers ~43% of the web and is translated into 200+ languages. Key factors:
- **Translation platform:** Uses GlotPress (its own tool) for community translations
- **Locale variants:** Supports regional variants (pt_PT vs pt_BR, en_GB vs en_US)
- **Release process:** String freeze before each release, with translation period
- **Community:** 10,000+ active translators across all locales
- **Plugin ecosystem:** Plugin translation via translate.wordpress.org
- **Automatic updates:** Language packs installed automatically
- **RTL support:** Full RTL support with right-to-left language packs

```php
// WordPress i18n example
_e( 'Settings', 'default' );
__( 'Save Changes', 'default' );
esc_html__( 'Dashboard', 'default' );
_n( 'Comment', 'Comments', $count, 'default' );
```

#### Success: GNOME

GNOME Desktop is available in 190+ languages. Key factors:
- **Translation platform:** Damned Lies (custom) + integration with Weblate
- **Release cycle:** String freeze aligned with release schedule
- **Translation teams:** Language-specific teams with coordinators
- **Tooling:** Intltool, gettext, XML translation support
- **Quality process:** Proofreading, translation consistency across modules
- **Infrastructure:** l10n.gnome.org for translation statistics

#### Success: VS Code

Microsoft's VS Code supports 65+ languages in its UI. Key factors:
- **Translation platform:** Crowdin with Microsoft Translation Hub integration
- **Extension ecosystem:** Extension authors can localize their extensions
- **In-product:** Language packs installable from marketplace
- **Quality:** Both machine translation and community review
- **Release cadence:** Translations shipped with monthly releases

#### Failure: Many Small Projects

Common failure patterns in OSS i18n:

**Pattern 1: "We'll add i18n later"**
- Project hardcodes English strings everywhere
- When i18n is finally needed, massive refactoring is required
- String extraction becomes a multi-month effort
- Outcome: i18n is perpetually postponed

**Pattern 2: "English is enough"**
- Project gains traction in non-English markets
- Competitors emerge with localized versions
- Users in key markets choose alternatives
- Outcome: market share capped at English-speaking users

**Pattern 3: "Contributions only in English"**
- Non-English speakers are discouraged from contributing
- Project misses diverse perspectives
- Community remains homogeneous
- Outcome: limited innovation and growth

**Pattern 4: "Machine translation only, no review"**
- Poor quality translations frustrate users
- False confidence that localization is "done"
- Users encounter confusing or offensive translations
- Outcome: users switch to English, defeating the purpose

**Pattern 5: "No locale detection"**
- All users see English by default
- Non-English speakers must navigate in English to find language settings
- Many users never find the language switcher
- Outcome: low adoption of available translations

### 1.5 Legal Requirements for i18n in Some Jurisdictions

Several countries and regions have legal requirements for software localization:

**European Union:**
- EU Regulation 2018/1724: Public sector websites must be available in all official EU languages
- GDPR: Privacy notices must be "concise, transparent, intelligible and easily accessible, using clear and plain language" in the user's language
- Directive (EU) 2019/882 (European Accessibility Act): Products and services must be accessible, including language support
- Consumer rights directives: Software contracts and terms must be in the consumer's language

**Canada:**
- Official Languages Act: Federal institutions must offer services in English and French
- Quebec's Charter of the French Language: Commercial software sold in Quebec must have French-language interfaces
- Regulation respecting the language of commerce and business: French must be "markedly predominant" on signage, including digital

**China:**
- GB 18030: Information technology products must support Chinese character encoding
- Cybersecurity Law: Critical network equipment must have Chinese-language interfaces and documentation
- Personal Information Protection Law (PIPL): Privacy policies must be in Chinese

**Japan:**
- JIS X 0208: Standards for Japanese character encoding
- Act on the Promotion of Procurement of IT Systems: Government IT systems must support Japanese

**India:**
- Official Languages Act: Central government communications in Hindi and English
- State-level requirements: 22 official languages with varying requirements

**Russia:**
- Federal Law No. 53-FZ: State language of the Russian Federation
- Government systems must support Russian
- Consumer protection: Software documentation must be in Russian

**Brazil:**
- Consumer Defense Code: Product information must be in Portuguese
- LGPD (Lei Geral de Proteção de Dados): Privacy notices must be in Portuguese

**France:**
- Law No. 94-665 (Toubon Law): Official publications, commercial communications, and contracts must be in French
- Software sold in France must have a French-language interface option

**Israel:**
- Standard SI 1451: Software must support Hebrew (RTL language)

**United Arab Emirates:**
- Arabic Language Charter: Government entities must prioritize Arabic in digital services

**South Africa:**
- Use of Official Languages Act: Government communication in all 11 official languages

**Key takeaway:**
If your OSS project is used by government agencies, educational institutions, or enterprises in these jurisdictions, legal compliance may require localization. Even for non-commercial OSS, government users and contractors may have legal obligations that push them toward localized software.

---

## Part 2: Internationalization (i18n) Fundamentals

### 2.1 Separating Code from Content

The first law of i18n: **never embed user-facing strings in code**.

**Anti-pattern (strings in code):**

```python
# BAD: English strings hardcoded
def show_error(code):
    if code == 404:
        print("Page not found")
    elif code == 500:
        print("Internal server error")
    else:
        print(f"Error {code}: An unknown error occurred")
```

```javascript
// BAD: Template strings in component
const WelcomeMessage = ({ name }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>You have {count} new messages.</p>
  </div>
);
```

**Pattern (content externalized):**

```python
# GOOD: Strings externalized via gettext
import gettext
_ = gettext.gettext

def show_error(code):
    if code == 404:
        print(_("Page not found"))
    elif code == 500:
        print(_("Internal server error"))
    else:
        print(_("Error {code}: An unknown error occurred").format(code=code))
```

```javascript
// GOOD: Using i18next
import i18next from 'i18next';

const WelcomeMessage = ({ name }) => (
  <div>
    <h1>{i18next.t('welcome.title', { name })}</h1>
    <p>{i18next.t('welcome.message_count', { count: messages.length })}</p>
  </div>
);
```

**Separation principles:**

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| No hardcoded strings | Every user-facing string must go through i18n | Lint rules, code review |
| String IDs over text | Use keys, not English text as IDs | Prevents false positives in search |
| Context for translators | Provide developer comments for each string | ICU message format, comments |
| Dynamic values as placeholders | Never concatenate translated strings | Use positional/named placeholders |
| Markup separation | Don't embed HTML in translation strings | Rich text via placeholders |
| Sentence integrity | Don't split sentences across translations | Complete phrases, not word fragments |

### 2.2 Unicode: UTF-8, Normalization Forms, Character Encoding

**Why Unicode matters for i18n:**

Unicode is the universal character encoding standard that ensures every character in every writing system has a unique code point. Without Unicode, mixing scripts (e.g., Japanese Kanji with Latin characters) would be impossible.

**UTF-8 encoding:**

| Property | Value |
|----------|-------|
| Variable length | 1-4 bytes per character |
| ASCII compatible | First 128 code points are identical to ASCII |
| Most common encoding on the web | ~98% of websites use UTF-8 |
| Self-synchronizing | Byte boundaries can be detected |
| No BOM (usually) | Byte order mark is optional, often omitted |

```
Code point range     UTF-8 encoding
U+0000 - U+007F      0xxxxxxx                  (1 byte, ASCII)
U+0080 - U+07FF      110xxxxx 10xxxxxx         (2 bytes)
U+0800 - U+FFFF      1110xxxx 10xxxxxx 10xxxxxx (3 bytes, BMP)
U+10000 - U+10FFFF   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (4 bytes, supplementary)
```

**Unicode normalization forms:**

Characters can have multiple representations. For example, "e" can be a single code point U+00E9 or a combination of "e" (U+0065) + combining accent (U+0301).

| Form | Full Name | Description | When to use |
|------|-----------|-------------|-------------|
| NFC | Normalization Form C | Canonical composition | Default for most text, recommended for storage |
| NFD | Normalization Form D | Canonical decomposition | Keyboard input, text processing |
| NFKC | Normalization Form KC | Compatibility composition | Identifier matching, search indexing |
| NFKD | Normalization Form KD | Compatibility decomposition | Search, text analysis, lax matching |

```python
import unicodedata

text = "\u00e9"  # e as single code point (NFC)
text2 = "\u0065\u0301"  # e as e + combining accent (NFD)

print(len(text))   # 1
print(len(text2))  # 2

print(unicodedata.normalize('NFC', text2))   # '\u00e9' (1 char)
print(unicodedata.normalize('NFD', text))    # '\u0065\u0301' (2 chars)

# For comparison, always normalize
def strings_equal(a, b):
    return unicodedata.normalize('NFC', a) == unicodedata.normalize('NFC', b)
```

```javascript
// JavaScript normalization
const text = '\u00e9';
const text2 = '\u0065\u0301';

console.log(text.length);   // 1
console.log(text2.length);  // 2

console.log(text === text2);                   // false
console.log(text.normalize() === text2.normalize()); // true (default is NFC)
```

**Common encoding pitfalls:**

| Pitfall | Example | Consequence |
|---------|---------|-------------|
| Latin-1 assumption | `len("cafe")` returns 4 instead of 4 (works, but fails for CJK) | Wrong byte counts |
| Not specifying encoding | `open("file.txt")` in Python 2 | ASCII-only breaks on non-ASCII |
| BOM issues | UTF-8 BOM at start of file | Parser errors, invisible characters |
| Mojibake | "cafe" displayed as "cafÃ©" | UTF-8 bytes interpreted as Latin-1 |
| Overlong sequences | Encoding U+002F as 2-byte UTF-8 | Security vulnerability (path traversal) |

### 2.3 String Externalization: Resource Files, ICU Message Format

**Resource file formats:**

| Format | Extension | Characteristics | Best for |
|--------|-----------|-----------------|----------|
| Gettext PO | `.po` | Plain text, human-readable, supports plural forms | Python, C, PHP, Perl |
| Gettext MO | `.mo` | Binary, compiled from PO, fast runtime lookup | Same as PO, runtime |
| XLIFF 1.2 | `.xliff` | XML-based, industry standard, tool-agnostic | Enterprise, translation tools |
| XLIFF 2.0 | `.xliff` | Improved XLIFF, simpler structure | Modern translation pipelines |
| JSON | `.json` | Web-native, simple structure, nested keys | JavaScript, Node.js |
| YAML | `.yaml` | Human-friendly, hierarchical | Ruby, Python config |
| Android strings | `.xml` | Android native format | Android apps |
| iOS strings | `.strings` | Apple native format | iOS/macOS apps |
| iOS stringsdict | `.stringsdict` | Plist format with plural support | iOS pluralization |
| ICU MessageFormat | `.properties` | Language-agnostic, powerful formatting | Cross-platform |
| Fluent (FTL) | `.ftl` | Mozilla-designed, human-readable, powerful | Modern web apps |
| Java ResourceBundle | `.properties` | Simple key=value format | Java applications |
| ARB | `.arb` | Flutter/Dart resource format | Flutter apps |
| Qt TS | `.ts` | Qt translation XML | Qt/C++ applications |

**Gettext PO file example:**

```po
# German translation for My Project
# Copyright (C) 2024 My Organization
# This file is distributed under the same license as the project.
# Translator: Maria Schmidt <maria@example.com>
#
msgid ""
msgstr ""
"Project-Id-Version: myproject 1.0\n"
"Report-Msgid-Bugs-To: devs@example.com\n"
"POT-Creation-Date: 2024-03-15 10:00+0000\n"
"PO-Revision-Date: 2024-03-16 14:30+0100\n"
"Last-Translator: Maria Schmidt <maria@example.com>\n"
"Language-Team: German <de@li.org>\n"
"Language: de\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"

#: src/main.py:42
msgid "Hello, world!"
msgstr "Hallo, Welt!"

#: src/ui.py:15
#, python-format
msgid "Welcome, %(name)s!"
msgstr "Willkommen, %(name)s!"

#: src/ui.py:88
msgid "You have %d new messages"
msgid_plural "You have %d new messages"
msgstr[0] "%d neue Nachricht"
msgstr[1] "%d neue Nachrichten"
```

**XLIFF 1.2 example:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" target-language="de" datatype="plaintext" original="myapp.properties">
    <header>
      <tool tool-id="babel" tool-name="Babel" tool-version="2.14.0" />
      <note>Translation project: MyApp v1.0</note>
    </header>
    <body>
      <trans-unit id="1" resname="app.title">
        <source>My Application</source>
        <target>Meine Anwendung</target>
        <note>Application title shown in browser tab</note>
      </trans-unit>
      <trans-unit id="2" resname="welcome.message">
        <source>Welcome, {name}!</source>
        <target>Willkommen, {name}!</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

**ICU Message Format:**

ICU (International Components for Unicode) Message Format is the most powerful and widely-adopted cross-platform string formatting system.

```javascript
// ICU MessageFormat syntax
import { MessageFormat } from 'intl-messageformat';

const msg = new MessageFormat(
  `{gender, select,
    male {He}
    female {She}
    other {They}
  } has {count, plural,
    one {# message}
    other {# messages}
  }.`,
  'en'
);

console.log(msg.format({ gender: 'male', count: 1 }));
// "He has 1 message."

console.log(msg.format({ gender: 'female', count: 5 }));
// "She has 5 messages."

console.log(msg.format({ gender: 'other', count: 0 }));
// "They has 0 messages."
```

**ICU syntax elements:**

| Element | Syntax | Example |
|---------|--------|---------|
| Simple argument | `{name}` | `Hello, {name}!` |
| Number formatting | `{count, number}` | `{count, number}` -> "1,234.50" |
| Percent | `{value, number, ::percent}` | `{value, number, ::percent}` -> "75%" |
| Date | `{date, date}` | `{date, date}` -> "Mar 15, 2024" |
| Date with style | `{date, date, long}` | `{date, date, long}` -> "March 15, 2024" |
| Time | `{time, time}` | `{time, time}` -> "10:30:00 AM" |
| Time with style | `{time, time, short}` | `{time, time, short}` -> "10:30 AM" |
| Plural | `{count, plural, one {..} other {..}}` | `{count, plural, one {# item} other {# items}}` |
| Select | `{gender, select, male {..} female {..} other {..}}` | Gender-aware text |
| SelectOrdinal | `{place, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}` | Ordinal numbers |

### 2.4 Date/Time Formatting: Locale-Aware Parsing and Display

```javascript
// JavaScript Intl.DateTimeFormat
const date = new Date('2024-03-15T14:30:00Z');

console.log(new Intl.DateTimeFormat('en-US').format(date));
// "3/15/2024"

console.log(new Intl.DateTimeFormat('en-GB').format(date));
// "15/03/2024"

console.log(new Intl.DateTimeFormat('de-DE').format(date));
// "15.3.2024"

console.log(new Intl.DateTimeFormat('ja-JP').format(date));
// "2024/3/15"

console.log(new Intl.DateTimeFormat('ar-EG').format(date));
// "15/3/2024" (Arabic-Indic digits)

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
console.log(new Intl.DateTimeFormat('en-US', options).format(date));
// "Friday, March 15, 2024"

console.log(new Intl.DateTimeFormat('es-ES', options).format(date));
// "viernes, 15 de marzo de 2024"

console.log(new Intl.DateTimeFormat('zh-CN', options).format(date));
// "2024年3月15日星期五"
```

```python
# Python date formatting with Babel
from babel.dates import format_date, format_datetime, format_time
from datetime import datetime

dt = datetime(2024, 3, 15, 14, 30)

print(format_date(dt, locale='en_US'))
# "Mar 15, 2024"

print(format_date(dt, locale='de_DE'))
# "15.03.2024"

print(format_date(dt, locale='zh_CN'))
# "2024年3月15日"

print(format_date(dt, "full", locale='en_US'))
# "Friday, March 15, 2024"

print(format_date(dt, "full", locale='es_ES'))
# "viernes, 15 de marzo de 2024"

print(format_time(dt, "short", locale='en_US'))
# "2:30 PM"

print(format_time(dt, "short", locale='de_DE'))
# "14:30"
```

**Common date formats by locale:**

| Locale | Short date | Long date | Short time |
|--------|-----------|-----------|------------|
| en-US | 3/15/2024 | Friday, March 15, 2024 | 2:30 PM |
| en-GB | 15/03/2024 | 15 March 2024 | 14:30 |
| de-DE | 15.03.2024 | Freitag, 15. Marz 2024 | 14:30 |
| fr-FR | 15/03/2024 | vendredi 15 mars 2024 | 14:30 |
| it-IT | 15/03/2024 | venerdi 15 marzo 2024 | 14:30 |
| es-ES | 15/3/2024 | viernes, 15 de marzo de 2024 | 14:30 |
| pt-BR | 15/03/2024 | sexta-feira, 15 de marco de 2024 | 14:30 |
| ja-JP | 2024/03/15 | 2024年3月15日金曜日 | 14:30 |
| ko-KR | 2024. 3. 15. | 2024년 3월 15일 금요일 | 14:30 |
| zh-CN | 2024/3/15 | 2024年3月15日星期五 | 14:30 |
| ar-EG | 15/3/2024 | الجمعة، 15 مارس 2024 | 2:30 م |
| ru-RU | 15.03.2024 | пятница, 15 марта 2024 г. | 14:30 |
| hi-IN | 15/3/2024 | शुक्रवार, 15 मार्च 2024 | 2:30 PM |

### 2.5 Number Formatting: Decimals, Currencies, Percentages

```javascript
// JavaScript Intl.NumberFormat
const number = 1234567.89;

console.log(new Intl.NumberFormat('en-US').format(number));
// "1,234,567.89"

console.log(new Intl.NumberFormat('de-DE').format(number));
// "1.234.567,89"

console.log(new Intl.NumberFormat('fr-FR').format(number));
// "1 234 567,89"

console.log(new Intl.NumberFormat('hi-IN').format(number));
// "12,34,567.89" (Indian numbering system)

// Currency formatting
console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number));
// "$1,234,567.89"

console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// "1.234.567,89 EUR"

// Percentage formatting
console.log(new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.75));
// "75%"

console.log(new Intl.NumberFormat('de-DE', { style: 'percent' }).format(0.75));
// "75 %"

console.log(new Intl.NumberFormat('tr-TR', { style: 'percent' }).format(0.75));
// "%75"
```

**Decimal and grouping separators by locale:**

| Locale | Decimal separator | Grouping separator | Example |
|--------|------------------|-------------------|---------|
| en-US | . (period) | , (comma) | 1,234,567.89 |
| en-GB | . (period) | , (comma) | 1,234,567.89 |
| de-DE | , (comma) | . (period) | 1.234.567,89 |
| fr-FR | , (comma) | (space) | 1 234 567,89 |
| es-ES | , (comma) | . (period) | 1.234.567,89 |
| pt-BR | , (comma) | . (period) | 1.234.567,89 |
| it-IT | , (comma) | . (period) | 1.234.567,89 |
| ja-JP | . (period) | , (comma) | 1,234,567.89 |
| zh-CN | . (period) | , (comma) | 1,234,567.89 |
| hi-IN | . (period) | , (comma, 2-digit grouping) | 12,34,567.89 |
| ru-RU | , (comma) | (space) | 1 234 567,89 |

**Currency formatting rules:**

| Currency | Symbol position | Decimal places | Example (en-US) |
|----------|----------------|----------------|-----------------|
| USD | $1,234.56 (before) | 2 | $1,234.56 |
| EUR | 1.234,56 EUR (after) | 2 | EUR 1,234.56 |
| JPY | Y1,235 (before) | 0 | Y1,235 |
| GBP | L1,234.56 (before) | 2 | L1,234.56 |
| INR | Rs 1,234.56 (before) | 2 | Rs 1,234.56 |
| BRL | R$ 1.234,56 (before) | 2 | R$ 1,234.56 |
| RUB | 1 234,56 RUB (after) | 2 | RUB 1,234.56 |
| KRW | W1,235 (before) | 0 | W1,235 |

### 2.6 Pluralization Rules Across Languages (CLDR Plural Rules)

Unicode CLDR defines six plural categories:
| Category | Description | Example languages |
|----------|-------------|-------------------|
| zero | Zero quantity | Arabic (some forms), Latvian |
| one | Singular | English, German, Spanish, French |
| two | Dual | Arabic, Slovenian, Welsh |
| few | Paucal (small number) | Polish, Russian, Czech, Arabic |
| many | Large/indefinite number | Arabic, Polish, Russian |
| other | Everything else (or only form) | Chinese, Japanese, Korean, Thai |

**Plural rules by language family:**

| Language | Rules | Example |
|----------|-------|---------|
| English | one (n=1), other | 1 file, 5 files |
| German | one (n=1), other | 1 Datei, 5 Dateien |
| French | one (n in 0,1), other | 0 fichier, 1 fichier, 5 fichiers |
| Spanish | one (n=1), other | 1 archivo, 5 archivos |
| Russian | one (n mod 10=1, !=11), few (2-4, not 12-14), many (0,5-20), other | 1 файл, 2 файла, 5 файлов |
| Polish | one (n=1), few (n mod 10 in 2-4, not 12-14), many (all else) | 1 plik, 2 pliki, 5 plikow |
| Arabic | zero (0), one (1), two (2), few (3-10), many (11-99), other | 0 ملف, 1 ملف, 2 ملفان, 3 ملفات |
| Czech | one (1), few (2-4), other | 1 soubor, 2 soubory, 5 souboru |
| Japanese | other (only form) | 5ファイル (single form) |
| Chinese | other (only form) | 5个文件 (single form) |
| Korean | other (only form) | 5개 파일 (single form) |

```javascript
// CLDR plural rules with Intl.PluralRules
function getPluralCategory(locale, n) {
  const pluralRules = new Intl.PluralRules(locale);
  return pluralRules.select(n);
}

console.log(getPluralCategory('en', 1));   // "one"
console.log(getPluralCategory('en', 5));   // "other"
console.log(getPluralCategory('ru', 1));   // "one"
console.log(getPluralCategory('ru', 2));   // "few"
console.log(getPluralCategory('ru', 5));   // "many"
console.log(getPluralCategory('ar', 0));   // "zero"
console.log(getPluralCategory('ar', 1));   // "one"
console.log(getPluralCategory('ar', 2));   // "two"
console.log(getPluralCategory('ar', 11));  // "many"
```

### 2.7 Text Direction: LTR, RTL, Bidi Text Handling

**Languages requiring RTL support:**

| Language | Script | Speakers | Countries/Regions |
|----------|--------|----------|-------------------|
| Arabic | Arabic | ~420M | 25+ countries |
| Hebrew | Hebrew | ~9M | Israel |
| Persian (Farsi) | Arabic | ~110M | Iran, Afghanistan, Tajikistan |
| Urdu | Arabic | ~70M | Pakistan, India |
| Pashto | Arabic | ~50M | Afghanistan, Pakistan |
| Kurdish (Sorani) | Arabic | ~8M | Iraq, Iran |
| Sindhi | Arabic | ~30M | Pakistan, India |
| Yiddish | Hebrew | ~1M | Global (Jewish diaspora) |

**HTML/CSS RTL support:**

```html
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>موقعي</title>
</head>
<body>
  <h1>مرحبا بالعالم</h1>
  <p dir="ltr">This is English text inside an RTL page.</p>
</body>
</html>
```

```css
/* RTL-aware CSS using logical properties */
.container {
  margin-inline-start: 1rem;   /* margin-left in LTR, margin-right in RTL */
  margin-inline-end: 1rem;     /* margin-right in LTR, margin-left in RTL */
  padding-inline: 1rem 2rem;   /* logical padding */
  border-inline-start: 2px solid black;
}

.float-start { float: inline-start; }
.float-end { float: inline-end; }

[dir="rtl"] .arrow-icon {
  transform: scaleX(-1);  /* Mirror directional icons */
}
```

**RTL-specific considerations:**

| Aspect | LTR | RTL |
|--------|-----|-----|
| Text alignment | Left-aligned | Right-aligned |
| UI element order | Left to right | Right to left |
| Back button | Left side | Right side |
| Progress bars | Left to right fill | Right to left fill |
| Check marks | On the left | On the right |
| Page layout | Navigation on left | Navigation on right |
| Form labels | Label left, input right | Label right, input left |
| Scrollbar | Right side | Left side (on some systems) |

**Unicode bidi control characters:**

| Character | Code Point | Name | Use |
|-----------|-----------|------|-----|
| LRM | U+200E | Left-to-Right Mark | Embed LTR into RTL context |
| RLM | U+200F | Right-to-Left Mark | Embed RTL into LTR context |
| LRE | U+202A | Left-to-Right Embedding | Start LTR embedded section |
| RLE | U+202B | Right-to-Left Embedding | Start RTL embedded section |
| PDF | U+202C | Pop Directional Formatting | End LRE/RLE section |
| LRI | U+2066 | Left-to-Right Isolate | Isolate LTR from bidi context |
| RLI | U+2067 | Right-to-Left Isolate | Isolate RTL from bidi context |
| PDI | U+2069 | Pop Directional Isolate | End isolation |

```html
<!-- BiDi isolation -->
<p>This text has <span dir="rtl">عربي</span> embedded.</p>
<p>This text has <bdi>عربي</bdi> embedded. <!-- auto-detected direction --></p>

<!-- Using LRM for correct punctuation in RTL -->
<p>الاسم: JOHN_SMITH</p>
<!-- Without LRM, the colon appears on the wrong side -->
<p>الاسم: JOHN_SMITH‎</p>
```

### 2.8 Sorting and Collation: Locale-Aware String Comparison

```javascript
// JavaScript localeCompare
const words = ['apple', 'Apfel', 'Banane', 'baren', 'Cherry', 'cagri'];

// Default sorting (UTF-16 code point order - wrong)
console.log(words.sort());
// ["Banane", "Cherry", "apple", "baren", "cagri", "Apfel"]

// German sorting
console.log(words.sort((a, b) => a.localeCompare(b, 'de')));
// ["apple", "Apfel", "Banane", "baren", "Cherry", "cagri"]

// Swedish sorting (a sorts after z)
console.log(words.sort((a, b) => a.localeCompare(b, 'sv')));
// ["apple", "Banane", "baren", "Cherry", "cagri", "Apfel"]

// Numeric sorting
const versions = ['v2.5', 'v10.0', 'v1.0', 'v3.20'];
console.log(versions.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
// ["v1.0", "v2.5", "v3.20", "v10.0"]

// Case-insensitive
console.log(words.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })));
```

**Collation customization options:**

| Option | Values | Description |
|--------|--------|-------------|
| `locale` | BCP 47 tag | Language region (e.g., 'de-DE', 'zh-CN') |
| `usage` | 'sort', 'search' | Sort for ordering, search for matching |
| `sensitivity` | 'base', 'accent', 'case', 'variant' | What differences matter |
| `ignorePunctuation` | true, false | Ignore punctuation marks |
| `numeric` | true, false | Sort numbers numerically |
| `caseFirst` | 'upper', 'lower', 'false' | Whether upper/lower case sorts first |

### 2.9 Timezone Handling: UTC Storage, Local Display

The golden rule of timezone handling: **always store UTC, convert to local for display**.

```javascript
// JavaScript timezone handling
const now = new Date();

// Format in specific timezone
const options = {
  timeZone: 'America/New_York',
  dateStyle: 'full',
  timeStyle: 'long'
};
console.log(new Intl.DateTimeFormat('en-US', options).format(now));
// "Friday, March 15, 2024 at 10:30:00 AM EST"

// Get user timezone
function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

// Relative time
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-5, 'minute')); // "5 minutes ago"
console.log(rtf.format(2, 'day'));     // "in 2 days"
```

```python
# Python timezone handling
from datetime import datetime, timezone
from zoneinfo import ZoneInfo   # Python 3.9+

utc_now = datetime.now(timezone.utc)
print(utc_now.isoformat())  # 2024-03-15T14:30:00+00:00

eastern = utc_now.astimezone(ZoneInfo("America/New_York"))
print(eastern.isoformat())  # 2024-03-15T10:30:00-04:00

tokyo = utc_now.astimezone(ZoneInfo("Asia/Tokyo"))
print(tokyo.isoformat())    # 2024-03-15T23:30:00+09:00

from babel.dates import format_datetime
dt = datetime(2024, 3, 15, 14, 30, tzinfo=timezone.utc)
print(format_datetime(dt, "full", locale='de_DE', tzinfo=ZoneInfo("Europe/Berlin")))
# "Freitag, 15. Marz 2024 um 15:30:00 Mitteleuropaische Normalzeit"
```

**Best practices for timezone handling:**
1. Store in UTC - Always store timestamps as UTC in databases
2. Use ISO 8601 - Transfer dates in ISO 8601 format with timezone info
3. IANA timezone names - Use "America/New_York" not "EST" or "-05:00"
4. Convert at display - Only convert to local time for display
5. Detect user timezone - Use Intl.DateTimeFormat().resolvedOptions().timeZone
6. Handle DST transitions - Be aware of spring-forward/fall-back ambiguities
7. Future events - Store in local time + timezone, not UTC (timezone rules may change)

---

## Part 3: Localization (l10n) Workflows

### 3.1 Translation Management Systems

**Comparison of major TMS platforms for OSS:**

| Feature | Crowdin | Weblate | Transifex | Lokalise | POEditor |
|---------|---------|---------|-----------|----------|----------|
| OSS-free tier | Yes (unlimited) | Yes (self-hosted, FOSS) | Yes (limited) | No | No |
| Self-hosted | No | Yes | No | No | No |
| Git integration | GitHub, GitLab, Azure | GitHub, GitLab, Gitea | GitHub, GitLab | GitHub, GitLab | GitHub, GitLab |
| MT integration | Google, DeepL, Azure | Google, DeepL, LibreTranslate | Google, DeepL, Amazon | DeepL, Google | DeepL, Google |
| Translation memory | Yes | Yes | Yes | Yes | Yes |
| Glossary/term base | Yes | Yes | Yes | Yes | Yes |
| Screenshots | Yes | Yes | No | Yes | No |
| QA checks | 30+ | 40+ | 15+ | 50+ | 20+ |
| Plural support | CLDR | CLDR, Gettext | CLDR | CLDR | Gettext |
| RTL preview | Yes | Yes | Yes | Yes | Yes |
| API | REST + SDK | REST | REST | REST + SDK | REST |
| File formats | 50+ | 50+ | 30+ | 40+ | 30+ |
| CLI tool | Yes (crowdin) | Yes (wlc) | Yes (tx) | Yes (lokalise2) | Yes (poe) |

**Crowdin setup for OSS projects:**

```yaml
# crowdin.yml
project_id: "123456"
api_token: "%CROWDIN_PERSONAL_TOKEN%"

files:
  - source: /locales/en/*.json
    translation: /locales/%two_letters_code%/**/%original_file_name%
    update_option: update_as_unapproved
    skip_untranslated_strings: true

  - source: /docs/**/*.md
    translation: /docs/%two_letters_code%/**/%original_file_name%
    ignore:
      - /docs/README.md

  - source: /app/src/main/res/values/strings.xml
    translation: /app/src/main/res/values-%android_code%/strings.xml
```

**Weblate setup (self-hosted):**

```yaml
# docker-compose.yml for Weblate
version: '3'
services:
  weblate:
    image: weblate/weblate:latest
    ports:
      - "8080:8080"
    environment:
      - WEBLATE_SITE_DOMAIN=weblate.example.com
      - WEBLATE_ADMIN_PASSWORD=${WEBLATE_ADMIN_PASSWORD}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    volumes:
      - weblate-data:/app/data
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DATABASE=weblate
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data

volumes:
  weblate-data:
  postgres-data:
  redis-data:
```

**Weblate integration example:**

```yaml
# weblate.yml
component:
  name: MyApp
  repo: https://github.com/myorg/myapp.git
  branch: main
  file_format: json-nested
  filemask: locales/*.json
  template: locales/en.json
  new_lang: add
  language_regex: ^[a-z]{2}(_[A-Z]{2})?$
  edit_template: true

autotranslate:
  engine: deepL
  threshold: 80
  filter: translated

discovery:
  workflow: replace_translated_with_approved
```

### 3.2 Translation File Formats

**Gettext PO/MO files:**

```po
msgid ""
msgstr ""
"Project-Id-Version: MyApp 2.0\n"
"POT-Creation-Date: 2024-03-15 10:00+0000\n"
"PO-Revision-Date: 2024-03-20 14:30+0100\n"
"Last-Translator: Anna Schmidt <anna@example.com>\n"
"Language-Team: German <de@li.org>\n"
"Language: de\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"

#: src/app.py:23
msgid "Hello, World!"
msgstr "Hallo, Welt!"

#: src/models.py:67
#, python-format
msgid "You have %d new notification"
msgid_plural "You have %d new notifications"
msgstr[0] "Sie haben %d neue Benachrichtigung"
msgstr[1] "Sie haben %d neue Benachrichtigungen"
```

**Android strings.xml:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">My Application</string>
    <string name="nav_home">Home</string>
    <string name="nav_settings">Settings</string>
    <string name="welcome_title">Welcome to MyApp!</string>
    <string name="welcome_back">Welcome back, %1$s!</string>

    <plurals name="message_count">
        <item quantity="one">%d new message</item>
        <item quantity="other">%d new messages</item>
    </plurals>

    <string-array name="weekdays">
        <item>Monday</item>
        <item>Tuesday</item>
        <item>Wednesday</item>
        <item>Thursday</item>
        <item>Friday</item>
        <item>Saturday</item>
        <item>Sunday</item>
    </string-array>
</resources>
```

**iOS strings + stringsdict:**

```strings
"app_name" = "My Application";
"welcome_title" = "Welcome to MyApp!";
"welcome_back" = "Welcome back, %@!";
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>message_count</key>
    <dict>
        <key>NSStringLocalizedFormatKey</key>
        <string>%#@messages@</string>
        <key>messages</key>
        <dict>
            <key>NSStringFormatSpecTypeKey</key>
            <string>NSStringPluralRuleType</string>
            <key>NSStringFormatValueTypeKey</key>
            <string>d</string>
            <key>one</key>
            <string>%d new message</string>
            <key>other</key>
            <string>%d new messages</string>
        </dict>
    </dict>
</dict>
</plist>
```

**JSON (nested) format:**

```json
{
  "app": {
    "title": "My Application",
    "version": "Version {version}"
  },
  "nav": {
    "home": "Home",
    "settings": "Settings"
  },
  "welcome": {
    "title": "Welcome to MyApp!",
    "back": "Welcome back, {username}!"
  },
  "messages": {
    "count": {
      "one": "{count} new message",
      "other": "{count} new messages"
    }
  }
}
```

**Fluent (FTL) format (Mozilla):**

```ftl
-brand-name = MyApp

app-title = My Application
nav-home = Home
nav-settings = Settings

welcome-title = Welcome to { -brand-name }!
welcome-back = Welcome back, { $username }!

message-count =
    { $count ->
        [one] { $count } new message
       *[other] { $count } new messages
    }

notification =
    { $gender ->
        [male] He sent you a message.
        [female] She sent you a message.
       *[other] They sent you a message.
    }

login-button = Log In
    .title = Click to log in to { -brand-name }
```

**ARB format (Flutter/Dart):**

```json
{
  "@@locale": "en",
  "appTitle": "My Application",
  "@appTitle": {
    "description": "The title of the application"
  },
  "messageCount": "{count, plural, one{{count} message} other{{count} messages}}",
  "@messageCount": {
    "description": "Number of messages",
    "placeholders": {
      "count": {
        "type": "int",
        "example": "5"
      }
    }
  }
}
```

**File format conversion table:**

| Source | Target | Tool |
|--------|--------|------|
| PO | XLIFF | `po2xliff`, `translate-toolkit` |
| XLIFF | PO | `xliff2po`, `translate-toolkit` |
| JSON | PO | `i18next-conv`, `json2po` |
| PO | JSON | `po2json`, `i18next-conv` |
| Android XML | PO | `xml2po`, `android2po` |
| PO | Android XML | `po2android` |
| CSV | PO | `csv2po` |
| PO | CSV | `po2csv` |
| YAML | PO | `yaml2po` |
| PO | YAML | `po2yaml` |
| Properties | XLIFF | `prop2xliff` |
| XLIFF | TMX | `xliff2tmx` |

### 3.3 Machine Translation Integration

**MT engine comparison:**

| Feature | DeepL | Google Translate | MS Translator | Amazon Translate | LibreTranslate |
|---------|-------|-----------------|---------------|-----------------|----------------|
| Free tier | 500K char/mo | 500K char/mo | 2M char/mo | 2M char/mo | Self-hosted free |
| Languages | 31 | 130+ | 130+ | 75+ | 40+ |
| Quality rating | Excellent | Good | Good | Good | Moderate |
| Glossary support | Yes | No | Yes | No | No |
| Formal/informal tone | Yes | No | No | No | No |
| Self-host option | No | No | No | No | Yes |
| HTML handling | Yes | Yes | Yes | No | Yes |
| Document translation | Yes | Yes | Yes | Yes | No |

**DeepL API integration:**

```python
import deepl

auth_key = "YOUR_DEEPL_AUTH_KEY"
translator = deepl.Translator(auth_key)

# Basic translation
result = translator.translate_text("Hello, world!", target_lang="DE")
print(result.text)  # "Hallo, Welt!"

# With formality setting
result = translator.translate_text(
    "Hello, world!",
    target_lang="DE",
    formality="more"
)
print(result.text)  # "Hallo, Welt!" (formal "Sie" form)

# Glossary support
glossary = translator.create_glossary(
    "MyGlossary",
    source_lang="EN",
    target_lang="DE",
    entries={
        "application": "Anwendung",
        "database": "Datenbank",
        "server": "Server"
    }
)

result = translator.translate_text(
    "The application connects to the database server.",
    target_lang="DE",
    glossary=glossary
)
print(result.text)  # "Die Anwendung verbindet sich mit dem Datenbank-Server."

# Batch translation
texts = ["First string", "Second string", "Third string"]
results = translator.translate_text(texts, target_lang="ES")
for r in results:
    print(r.text)
```

**Google Cloud Translation API integration:**

```python
from google.cloud import translate_v2 as translate

client = translate.Client()

result = client.translate("Hello, world!", target_language="de")
print(result["translatedText"])  # "Hallo Welt!"
```

**Weblate auto-translation configuration:**

```python
# Weblate settings.py
MT_DEEPL_KEY = "YOUR_DEEPL_KEY"
MT_GOOGLE_TRANSLATE_KEY = "YOUR_GOOGLE_KEY"
MT_MICROSOFT_TRANSLATOR_KEY = "YOUR_AZURE_KEY"
MT_LIBRETRANSLATE_API_URL = "https://libretranslate.example.com"

AUTOTRANSLATE = {
    "engine": "deepL",
    "threshold": 80,
    "filter": "untranslated"
}
```

### 3.4 Translation Memory

Translation Memory (TM) stores previously translated segments for reuse. TMX is the standard format.

**TMX format example:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<tmx version="1.4">
  <header
    creationtool="MyAppTMTool"
    creationtoolversion="1.0"
    datatype="plaintext"
    segtype="sentence"
    adminlang="en-US"
    srclang="en"
    o-tmf="MyAppTM"
  >
    <note>Translation memory for MyApp project</note>
  </header>
  <body>
    <tu>
      <tuid>1</tuid>
      <prop type="project">MyApp</prop>
      <tuv xml:lang="en">
        <seg>Hello, World!</seg>
      </tuv>
      <tuv xml:lang="de">
        <seg>Hallo, Welt!</seg>
      </tuv>
      <tuv xml:lang="fr">
        <seg>Bonjour, le monde!</seg>
      </tuv>
    </tu>
  </body>
</tmx>
```

**TM matching levels:**

| Match type | Similarity | Description |
|------------|-----------|-------------|
| Exact match | 100% | Identical source text |
| Context match | 100% + context | Same source + same surrounding text |
| Fuzzy match | 70-99% | Similar source text |
| Ice match | 100% | Exact, cannot be changed (locked) |
| No match | 0% | No TM entry found |
| Repetition | N/A | Same source within same file |

**TM best practices:**
1. Clean TM regularly - Remove outdated entries, correct errors
2. Segment at sentence level - Not paragraphs or words
3. Include context - Store domain, project, file reference
4. Version your TM - Update when software version changes
5. TM sharing - Share TMs across related projects
6. TM alignment - Create TM from existing bilingual documents
7. TMX compliance - Use standard TMX 1.4b format for interchange

```bash
# TM management with translate-toolkit
align -i source.txt -j target_de.txt -o aligned_de.tmx
tmserver -a -i existing.tmx -m new.tmx -o merged.tmx
tmserver -c -i merged.tmx -o clean.tmx -r 90
```

### 3.5 Quality Assurance: Consistency Checks, Terminology Management

**Automated QA checks:**

| Check type | Description | Example |
|------------|-------------|---------|
| Placeholder consistency | All format specifiers preserved | `%s`, `{name}` |
| HTML tag consistency | Opening/closing tags match | `<b>...</b>` |
| Length validation | Translation not too long/short | Button text max width |
| Punctuation check | Sentence-ending punctuation matches | `.` vs `।` in Hindi |
| Capitalization check | Starting letter case preserved | "Hello" vs "hallo" |
| Bracket/quote matching | Pairs properly closed | `(...)`, `"..."` |
| Numeric consistency | Numbers preserved | "5 files" -> "5 ficheiros" |
| URL consistency | URLs preserved | "https://..." unchanged |
| Variable check | All variables present | `{name}`, `{count}` |
| ICU syntax validation | ICU message format valid | Proper bracketing |
| Forbidden terms check | Rejected terminology | "Click here" (discouraged) |
| Glossary compliance | Mandatory terms used | Correct brand names |
| Consistency check | Same English -> same translation | "Cancel" always same target |
| Empty translation check | No empty target segments | All must be filled |

**Terminology management example:**

```json
{
  "terms": [
    {
      "term": "application",
      "description": "A software program designed to perform a specific task",
      "context": "General UI reference to the entire software product",
      "forbidden_translations": ["app (colloquial)", "program"],
      "translations": {
        "de": "Anwendung",
        "fr": "application",
        "es": "aplicacion",
        "pt_BR": "aplicativo",
        "ja": "アプリケーション",
        "zh_CN": "应用程序",
        "ar": "تطبيق",
        "ru": "приложение"
      }
    },
    {
      "term": "sign in",
      "description": "The action of authenticating with credentials",
      "context": "Button text and heading for login form",
      "forbidden_translations": ["log in (keep sign in consistent)"],
      "translations": {
        "de": "Anmelden",
        "fr": "Se connecter",
        "es": "Iniciar sesion",
        "ja": "サインイン",
        "zh_CN": "登录",
        "ar": "تسجيل الدخول",
        "ru": "Войти"
      }
    },
    {
      "term": "notification",
      "description": "A message alerting the user about an event",
      "context": "System-generated alerts in the notification center",
      "forbidden_translations": ["alert", "message", "notice"],
      "translations": {
        "de": "Benachrichtigung",
        "fr": "notification",
        "es": "notificacion",
        "ja": "通知",
        "zh_CN": "通知",
        "ar": "إشعار",
        "ru": "уведомление"
      }
    }
  ]
}
```

### 3.6 Translation Review Workflow

**Standard review workflow:**

```
Source String
    |
    v
[Translation Phase]
    |  Translator produces initial translation
    v
[Review Phase 1: Self-review]
    |  Translator reviews own work, checks terminology, formatting
    v
[Review Phase 2: Peer review]
    |  Second translator reviews, flags issues
    v
[Review Phase 3: Expert review]
    |  Language expert or maintainer reviews
    v
[Approval Phase]
    |  Translation approved and committed
    v
[Integration]
    Translation enters codebase
```

**Workflow states:**

| State | Description | Who can change |
|-------|-------------|----------------|
| Untranslated | Source string, no target | N/A |
| Translated | Initial translation exists | Translator |
| Needs Review | Translation complete, needs checking | Translator |
| Reviewed | Peer reviewer approved | Reviewer |
| Approved | Final approval for release | Language manager |
| Final | Locked, cannot be edited | Manager/Admin |

**Crowdin workflow configuration:**

```yaml
workflow_steps:
  - title: Translate
    languages: all
    reviewer_roles:
      - translator
    options:
      tm_suggestions: true
      mt_suggestions: true

  - title: Approve
    languages: all
    reviewer_roles:
      - proofreader
    options:
      min_approvals: 1

  - title: Final review
    languages: [de, fr, es, ja, zh-CN]
    reviewer_roles:
      - manager
    options:
      skip_untranslated_strings: true
```

### 3.7 Managing Translation Contributors in OSS

**Translation contributor roles:**

| Role | Responsibilities | Permissions |
|------|-----------------|-------------|
| Translator | Produces initial translations | Edit untranslated strings |
| Reviewer | Reviews and approves translations | Review, approve, reject |
| Language Coordinator | Manages language-specific workflows | User management, workflow config |
| Glossary Manager | Maintains terminology database | Add/edit terms |
| Developer | Technical strings, code issues | String extraction, commit |
| Project Manager | Overall translation project | Full access |

**Translator onboarding checklist:**

```
[ ] Read the translation style guide
[ ] Set up the translation platform account
[ ] Join the language team (mailing list, chat channel)
[ ] Complete test translation (5-10 strings)
[ ] Review translation memory and glossary
[ ] Understand project-specific terminology
[ ] Know the review workflow and quality standards
[ ] Confirm preferred language variant
[ ] Acknowledge license terms for contributed translations
```

**Recognizing translation contributors:**

```markdown
# TRANSLATORS.md

## Translation Contributors

We gratefully acknowledge the contributions of our translation community.

### Language Coordinators

| Language | Coordinator | Since |
|----------|-------------|-------|
| German (de) | Maria Schmidt | 2023 |
| French (fr) | Pierre Dubois | 2022 |
| Spanish (es) | Carlos Garcia | 2023 |
| Japanese (ja) | Yuki Tanaka | 2024 |
| Arabic (ar) | Ahmed Hassan | 2023 |
| Chinese Simplified (zh-CN) | Wei Li | 2022 |

### Top Contributors (all-time)

| Name | Languages | Strings Translated |
|------|-----------|-------------------|
| Anna Kowalski | de, pl | 12,450 |
| Paulo Santos | pt-BR, es | 9,800 |
| Elena Volkov | ru, uk | 8,200 |
| Hans Mueller | de, nl | 7,500 |

### Hall of Fame (100%+ strings)

- **Marie Curie** - French - 120%
- **Nikola Tesla** - Croatian, Serbian - 115%
- **Ada Lovelace** - English (UK) - 108%

### Badges & Achievements

- [ ] **100K Club**: 100,000+ total translations
- [ ] **Language Lead**: Leads a language team
- [ ] **Reviewer**: Approved reviewer role
- [ ] **Super Translator**: 10,000+ translations in single language
```

---

## Part 4: i18n by Ecosystem

### 4.1 Python: gettext, Babel, Django i18n, Flask-Babel

**gettext (stdlib):**

```python
import gettext

locale_dir = "locales"
lang = "de_DE"
trans = gettext.translation("myapp", locale_dir, languages=[lang])
trans.install()
_ = trans.gettext

print(_("Hello, world!"))       # "Hallo, Welt!"

n_ = trans.ngettext
count = 5
print(n_("%d file", "%d files", count) % count)
```

**Python project i18n setup:**

```bash
pip install Babel

# Extract strings
pybabel extract \
    --input-dirs=. \
    --output-file=locales/messages.pot \
    --project=MyApp \
    --version=1.0 \
    --copyright-holder="My Organization" \
    --msgid-bugs-address=devs@example.com \
    --keywords=_ \
    --keywords=_l:1,2 \
    --keywords=_n:1,2 \
    --keywords=ngettext:1,2 \
    --mapping-file=babel.cfg

# Initialize a new language
pybabel init \
    --input-file=locales/messages.pot \
    --output-dir=locales \
    --locale=de_DE \
    --domain=messages

# Update all languages
pybabel update \
    --input-file=locales/messages.pot \
    --output-dir=locales \
    --domain=messages

# Compile .po files to .mo
pybabel compile \
    --directory=locales \
    --domain=messages \
    --use-fuzzy
```

```ini
# babel.cfg
[python: **.py]
extensions = .py

[jinja2: **.html]
extensions = .html, .j2
```

**Babel:**

```python
from babel import numbers, dates, Locale
from datetime import datetime

locale = Locale.parse('de_DE')
print(locale.display_name)        # "Deutsch (Deutschland)"
print(locale.english_name)        # "German (Germany)"

print(numbers.format_decimal(12345.67, locale='de_DE'))
# "12.345,67"

print(numbers.format_currency(12345.67, 'EUR', locale='de_DE'))
# "12.345,67 EUR"

print(numbers.format_percent(0.25, locale='de_DE'))
# "25 %"

dt = datetime(2024, 3, 15, 14, 30)
print(dates.format_date(dt, locale='de_DE'))
# "15.03.2024"

print(dates.format_datetime(dt, "full", locale='de_DE'))
# "Freitag, 15. Marz 2024 um 15:30:00 Mitteleuropaische Normalzeit"
```

**Django i18n:**

```python
# settings.py
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

from django.utils.translation import gettext_lazy as _

LANGUAGES = [
    ('en', _('English')),
    ('de', _('German')),
    ('fr', _('French')),
    ('es', _('Spanish')),
    ('ja', _('Japanese')),
    ('zh-hans', _('Simplified Chinese')),
    ('ar', _('Arabic')),
]

MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
]

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]
```

```django
{% load i18n %}

<h1>{% trans "Welcome to MyApp" %}</h1>
<p>{% blocktrans %}Hello, {{ username }}!{% endblocktrans %}</p>

{% blocktrans count counter=message_count %}
You have {{ counter }} new message.
{% plural %}
You have {{ counter }} new messages.
{% endblocktrans %}

{% trans "Cancel" as cancel_text %}
<button>{{ cancel_text }}</button>

{# Contextual markers #}
{% trans "View" context "noun" %}
{% trans "View" context "verb" %}

{{ date|date:"SHORT_DATE_FORMAT" }}
{{ value|localize }}
```

```python
from django.utils.translation import (
    gettext as _,
    gettext_lazy as _l,
    ngettext as _n,
    pgettext as _p,
    activate,
    get_language,
)

def my_view(request):
    greeting = _("Hello, world!")
    messages = _n("%d file uploaded", "%d files uploaded", count) % count
    notification = _p("notification", "You have new activity")
    return render(request, 'template.html', {'greeting': greeting})

# Lazy translations
class MyForm(forms.Form):
    name = forms.CharField(label=_l("Your Name"))
    email = forms.EmailField(label=_l("Email Address"))

# URL patterns for language
from django.conf.urls.i18n import i18n_patterns

urlpatterns = i18n_patterns(
    path('', include('myapp.urls')),
)
```

**Flask-Babel:**

```python
from flask import Flask, request
from flask_babel import Babel, gettext as _, ngettext as _n

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

babel = Babel(app)

@babel.localeselector
def get_locale():
    if request.args.get('lang'):
        return request.args.get('lang')
    return request.accept_languages.best_match(['en', 'de', 'fr', 'es', 'ja'])

@babel.timezoneselector
def get_timezone():
    return 'Europe/Berlin'

@app.route('/')
def home():
    return _("Welcome to MyApp!")

@app.route('/files')
def file_list():
    count = File.query.count()
    return _n("%(count)d file found", "%(count)d files found", count, count=count)
```

### 4.2 JavaScript: react-intl, i18next, Intl API

**Native Intl API (no library needed for basic formatting):**

```javascript
// Number formatting
const nf = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});
console.log(nf.format(1234.56)); // "1.234,56 EUR"

// Date formatting
const df = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'full',
  timeStyle: 'long'
});
console.log(df.format(new Date()));

// Relative time
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-5, 'minute')); // "5 minutes ago"
console.log(rtf.format(2, 'day'));     // "in 2 days"

// List formatting
const lf = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
console.log(lf.format(['Alice', 'Bob', 'Charlie']));
// "Alice, Bob, and Charlie"

const lf2 = new Intl.ListFormat('de', { style: 'long', type: 'conjunction' });
console.log(lf2.format(['Alice', 'Bob', 'Charlie']));
// "Alice, Bob und Charlie"

// Display names
const dn = new Intl.DisplayNames('de', { type: 'region' });
console.log(dn.of('US'));  // "Vereinigte Staaten"
console.log(dn.of('JP'));  // "Japan"

// Segmenter (text segmentation)
const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
const segments = segmenter.segment('konnichiha');
for (const seg of segments) {
  console.log(seg.segment);
}

// Collation
const collator = new Intl.Collator('sv', { sensitivity: 'base' });
console.log(collator.compare('a', 'z')); // Positive (a > z in Swedish)
```

**i18next:**

```javascript
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    ns: ['common', 'errors', 'validation'],
    defaultNS: 'common',
    keySeparator: '.',
    nsSeparator: ':',
    saveMissing: true,
    returnObjects: true,
  });

// Usage
i18next.t('welcome.title', { name: 'John' });
i18next.t('messages.count', { count: 5 });

// Change language
i18next.changeLanguage('de');

// Context
i18next.t('email.subject', { context: 'unread' });
// Looks for: email.subject_unread, email.subject

// Plural
i18next.t('key', { count: 5 });
// Looks for: key_5, key_plural, key

// Namespace usage
i18next.t('common:app.title');
i18next.t('errors:server_error');
```

```json
// locales/en/common.json
{
  "app": {
    "title": "My Application",
    "description": "A great application"
  },
  "welcome": {
    "title": "Welcome, {{name}}!",
    "subtitle": "We're glad to have you",
    "message": "You have {{count}} unread {{count, plural, one{message} other{messages}}}"
  },
  "nav": {
    "home": "Home",
    "settings": "Settings",
    "profile": "Profile"
  },
  "messages": {
    "count": "{{count}} new {{count, plural, one{message} other{messages}}}",
    "empty": "No messages",
    "new": "{{name}} sent you a message",
    "actions": {
      "reply": "Reply",
      "forward": "Forward",
      "delete": "Delete"
    }
  },
  "errors": {
    "not_found": "Page not found",
    "server_error": "Internal server error",
    "network": "Network error. Please check your connection.",
    "timeout": "Request timed out."
  },
  "date": {
    "today": "Today",
    "yesterday": "Yesterday",
    "format": "MMM D, YYYY"
  },
  "validation": {
    "required": "{{field}} is required",
    "email": "Please enter a valid email address",
    "minLength": "{{field}} must be at least {{min}} characters"
  },
  "accessibility": {
    "skip_to_main": "Skip to main content",
    "nav_label": "Navigation",
    "close": "Close",
    "loading": "Loading..."
  }
}
```

### 4.3 TypeScript/React: react-intl, next-i18next, LinguiJS

**react-intl (FormatJS):**

```typescript
import { IntlProvider, FormattedMessage, useIntl,
  FormattedNumber, FormattedDate, FormattedRelativeTime,
  FormattedPlural, FormattedList } from 'react-intl';

function App() {
  const [locale, setLocale] = useState('en');
  const messages = {
    en: { 'app.title': 'My Application' },
    de: { 'app.title': 'Meine Anwendung' },
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <MainApp onLocaleChange={setLocale} />
    </IntlProvider>
  );
}

// Using hooks
function Welcome({ name }) {
  const intl = useIntl();
  return (
    <h1>{intl.formatMessage({ id: 'welcome.title' }, { name })}</h1>
  );
}

// Using components
function FileCount({ count }) {
  return (
    <p>
      <FormattedNumber value={count} />{' '}
      <FormattedPlural value={count}
        one="file"
        other="files"
      /> uploaded
    </p>
  );
}

// Date formatting
function DateDisplay({ date }) {
  return <FormattedDate value={date} dateStyle="full" />;
}

// Numbers
function Price({ value, currency }) {
  return (
    <FormattedNumber
      value={value}
      style="currency"
      currency={currency}
    />
  );
}

// Relative time
function TimeAgo({ date }) {
  return <FormattedRelativeTime value={date} numeric="auto" />;
}

// Lists
function UserList({ users }) {
  return <FormattedList type="conjunction" value={users} />;
}

// Rich text
function Terms() {
  return (
    <FormattedMessage
      id="terms"
      values={{
        bold: (chunks) => <b>{chunks}</b>,
        link: (chunks) => <a href="/terms">{chunks}</a>,
      }}
    />
  );
}
```

**Next.js with next-i18next:**

```typescript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es', 'ja', 'zh-CN'],
    localeDetection: true,
  },
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'errors'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
};

// pages/index.tsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t, i18n } = useTranslation('common');

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('welcome.message', { name: 'John' })}</p>
      <button onClick={() => i18n.changeLanguage('de')}>
        Deutsch
      </button>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}
```

**LinguiJS:**

```typescript
// lingui.config.js
module.exports = {
  locales: ['en', 'de', 'fr', 'es', 'ja'],
  sourceLocale: 'en',
  catalogs: [{
    path: '<rootDir>/src/locales/{locale}/messages',
    include: ['src'],
  }],
  format: 'po',
};

// React component
import { Trans, useLingui, Plural } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

function Welcome({ name, count }) {
  const { i18n } = useLingui();

  return (
    <div>
      <h1>
        <Trans>Welcome to MyApp!</Trans>
      </h1>
      <p>
        <Trans id="welcome.user" values={{ name }}>
          Hello, {name}!
        </Trans>
      </p>
      <p>
        <Plural
          value={count}
          one="# new message"
          other="# new messages"
        />
      </p>
      <p>{t(i18n)`You have ${count} items`}</p>
    </div>
  );
}

// Programmatic usage
import { i18n } from '@lingui/core';
import { messages } from './locales/de/messages.js';

i18n.activate('de');
i18n._('app.title'); // "Meine Anwendung"

// Extract strings
// lingui extract
// lingui compile
```

### 4.4 Rust: rust-i18n, Fluent, gettext-rs

**Fluent (Rust):**

```rust
use fluent::{FluentBundle, FluentResource};
use unic_langid::langid;

fn main() {
    let ftl_string = r#"
-brand-name = MyApp

welcome-title = Welcome to { -brand-name }!
message-count = { $count ->
    [one] { $count } new message
   *[other] { $count } new messages
}
"#;

    let res = FluentResource::try_new(ftl_string.to_owned())
        .expect("Failed to parse FTL");

    let langid = langid!("en-US");
    let mut bundle = FluentBundle::new(vec![langid]);
    bundle.add_resource(res).expect("Failed to add resource");

    let msg = bundle.get_message("welcome-title").unwrap();
    let mut errors = vec![];
    let pattern = msg.value().unwrap();
    let value = bundle.format_pattern(pattern, None, &mut errors);
    println!("{}", value); // "Welcome to MyApp!"
}

use rust_i18n::t;

rust_i18n::i18n!("locales");

fn main() {
    println!("{}", t!("hello"));
    println!("{}", t!("messages.count", count = 5));
}
```

### 4.5 Go: golang.org/x/text, go-i18n

```go
package main

import (
    "fmt"
    "golang.org/x/text/language"
    "golang.org/x/text/message"
)

func main() {
    p := message.NewPrinter(language.German)

    p.Printf("Hello, world!\n")          // "Hallo, Welt!"
    p.Printf("You have %d files.\n", 5) // "Sie haben 5 Dateien."

    p.Printf("Total: %d\n", 1234567)
    // "Total: 1.234.567"

    p.Printf("Price: %.2f\n", 1234.56)
    // "Price: 1.234,56"
}
```

```go
package main

import (
    "github.com/nicksnyder/go-i18n/v2/i18n"
    "golang.org/x/text/language"
)

func main() {
    bundle := i18n.NewBundle(language.English)
    bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
    bundle.MustLoadMessageFile("locales/en.json")
    bundle.MustLoadMessageFile("locales/de.json")

    localizer := i18n.NewLocalizer(bundle, "de")

    msg, _ := localizer.Localize(&i18n.LocalizeConfig{
        MessageID: "welcome",
        TemplateData: map[string]string{
            "Name": "John",
        },
    })
    fmt.Println(msg) // "Willkommen, John!" (from de.json)
}
```

### 4.6 Java: ResourceBundle, ICU4J

```java
// ResourceBundle (Java standard library)
import java.util.ResourceBundle;
import java.util.Locale;

public class App {
    public static void main(String[] args) {
        Locale locale = new Locale("de", "DE");
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);

        String welcome = bundle.getString("welcome");
        System.out.println(welcome); // "Willkommen!"

        // With formatting
        String pattern = bundle.getString("welcome.user");
        String formatted = MessageFormat.format(pattern, "John");
        System.out.println(formatted); // "Willkommen, John!"
    }
}
```

```properties
# messages_de_DE.properties
welcome=Willkommen!
welcome.user=Willkommen, {0}!
file.count={0} Datei(en)
```

### 4.7 Mobile: Android (strings.xml), iOS

**Android:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">My Application</string>
    <string name="welcome_message">Welcome to MyApp!</string>
    <string name="welcome_back">Welcome back, %1$s!</string>

    <plurals name="message_count">
        <item quantity="one">%d new message</item>
        <item quantity="other">%d new messages</item>
    </plurals>
</resources>
```

```
# Locale directories:
# res/values/strings.xml (default, English)
# res/values-de/strings.xml (German)
# res/values-fr/strings.xml (French)
# res/values-ja/strings.xml (Japanese)
# res/values-ar/strings.xml (Arabic)
# res/values-zh-rCN/strings.xml (Simplified Chinese)
```

**iOS (Swift):**

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("welcome_title", tableName: "Localizable")
                .font(.title)

            Text("welcome_back \("John")")

            Text("message_count \(5)")
        }
    }
}

// Programmatic
let welcome = NSLocalizedString("welcome_title",
    comment: "Welcome screen title")
let count = String.localizedStringWithFormat(
    NSLocalizedString("message_count", comment: ""), 5)
```

### 4.8 Web Frameworks: Angular i18n, Vue i18n, Svelte i18n

**Angular i18n:**

```html
<!-- Angular i18n built-in -->
<h1 i18n>Welcome to MyApp!</h1>

<p i18n>Hello, {{ username }}!</p>

<p i18n="@@messageCount">
  {count, plural, one {You have one message} other {You have {{count}} messages}}
</p>

<p i18n>
  Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}} minutes ago}}
</p>

<!-- With meaning and description -->
<h1 i18n="site header|An introduction header for this application">
  Welcome to MyApp!
</h1>

<!-- Element attributes -->
<img [src]="logo" i18n-alt="application logo" alt="MyApp Logo" />

<!-- ICU message format -->
<p i18n>
  {gender, select, male {He invited} female {She invited} other {They invited}}
  you to {count, plural, one {a party} other {{{count}} parties}}.
</p>
```

```bash
# Angular i18n extraction
ng extract-i18n --output-path src/locale

# Build for specific locale
ng build --localize --configuration=production

# angular.json configuration
{
  "projects": {
    "myapp": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "de": { "translation": "src/locale/messages.de.xlf" },
          "fr": { "translation": "src/locale/messages.fr.xlf" },
          "ja": { "translation": "src/locale/messages.ja.xlf" }
        }
      },
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "localize": true
            }
          }
        }
      }
    }
  }
}
```

**Vue i18n:**

```typescript
// vue-i18n setup
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: {
        title: 'Welcome to MyApp!',
        message: 'Hello, {name}!',
      },
      messages: {
        count: 'You have {count} new messages | You have {count} new message',
      },
      date: {
        today: 'Today',
        yesterday: 'Yesterday',
      },
    },
    de: {
      welcome: {
        title: 'Willkommen bei MyApp!',
        message: 'Hallo, {name}!',
      },
      messages: {
        count: 'Sie haben {count} neue Nachrichten | Sie haben {count} neue Nachricht',
      },
    },
  },
  pluralizationRules: {
    ru: function(choice, choicesLength) {
      if (choice === 0) return 0;
      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;
      if (!teen && endsWithOne) return 1;
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;
      return choicesLength < 4 ? 2 : 3;
    },
  },
  numberFormats: {
    en: { currency: { style: 'currency', currency: 'USD' } },
    de: { currency: { style: 'currency', currency: 'EUR' } },
  },
  datetimeFormats: {
    en: { short: { dateStyle: 'short' } },
    de: { short: { dateStyle: 'short' } },
  },
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
```

```vue
<template>
  <div>
    <h1>{{ $t('welcome.title') }}</h1>
    <p>{{ $t('welcome.message', { name: username }) }}</p>
    <p>{{ $tc('messages.count', messageCount, { count: messageCount }) }}</p>
    <p>{{ $d(new Date(), 'short') }}</p>
    <p>{{ $n(1234.56, 'currency') }}</p>

    <!-- v-t directive -->
    <p v-t="'welcome.title'"></p>

    <!-- Component syntax (Vue 3) -->
    <i18n-t keypath="welcome.message" tag="p">
      <template #name>
        <b>{{ username }}</b>
      </template>
    </i18n-t>

    <i18n-n :value="1234.56" format="currency"></i18n-n>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale, setLocaleMessage } = useI18n();

const switchLang = () => {
  locale.value = 'de';
};
</script>
```

**Svelte i18n:**

```svelte
<script>
  import { _, locale, locales, init } from 'svelte-i18n';

  // Initialize
  init({
    fallbackLocale: 'en',
    initialLocale: 'en',
  });

  // Load translations
  import('./locales/en.json');
  import('./locales/de.json');

  function switchLocale(lang) {
    $locale = lang;
  }
</script>

<h1>{$_('welcome.title')}</h1>
<p>{$_('welcome.message', { values: { name: 'John' } })}</p>

<!-- Reactive locale -->
<select bind:value={$locale}>
  <option value="en">English</option>
  <option value="de">Deutsch</option>
</select>

<!-- Formatted numbers -->
<p>{$_('messages.count', { count: 5 })}</p>
```

**Library feature comparison table:**

| Feature | react-intl | i18next | LinguiJS | Vue i18n | Angular i18n |
|---------|------------|---------|----------|----------|--------------|
| Bundle size (min+gzip) | ~8 KB | ~7 KB | ~3 KB | ~6 KB | Built-in |
| Format | ICU | i18next | ICU | Custom | ICU |
| Plural support | CLDR | CLDR | CLDR | CLDR | CLDR |
| Select/gender | Yes | Yes | Yes | No | Yes |
| RTL support | Manual CSS | Manual CSS | Manual CSS | Manual CSS | Manual CSS |
| Lazy loading | No | Yes | No | Yes | Built-in |
| TypeScript | Yes | Yes | Yes | Yes | Yes |
| SSR | Via next-intl | Yes | Yes | Yes | Yes |
| Runtime locale change | Yes | Yes | Yes | Yes | No (rebuild required) |
| Extraction tool | @formatjs/cli | i18next-parser | lingui extract | @intlify/unplugin | ng extract-i18n |
| ICU syntax | Full | Plugin needed | Full | Partial | Full |
| Context feature | No | Yes | No | No | No |
| Namespaces | No | Yes | No | No | No |
| Interpolation | Rich text via tags | HTML | JSX | Slots | ICU |
---

## Part 5: Localization for Non-Code Artifacts

### 5.1 Documentation i18n: Managing Translated Docs

Documentation translation presents unique challenges compared to UI strings:

| Challenge | UI Translation | Documentation Translation |
|-----------|---------------|--------------------------|
| String count | Hundreds to thousands | Thousands to millions |
| Update frequency | Per release cycle | Continuous |
| Format | Key-value pairs | Markdown/RST/HTML |
| Context needed | Minimal | Full document context |
| Versioning | Matches software version | May have its own version |
| Reviewer expertise | Language + software | Language + technical domain |

**Documentation translation workflow:**

`yaml
# docs i18n directory structure
docs/
  en/             # Source language
    index.md
    getting-started.md
    installation.md
    configuration.md
    api-reference.md
    tutorials/
      beginner.md
      advanced.md
  de/             # German
  fr/             # French
  es/             # Spanish
  ja/             # Japanese
  zh-CN/          # Simplified Chinese
`

**Tools for documentation translation:**

| Tool | Format | OSS | Features |
|------|--------|-----|----------|
| Sphinx + sphinx-intl | RST | Yes | PO-based, gettext integration |
| Docsify + i18n plugin | Markdown | Yes | Simple, JS-based |
| GitBook | Markdown | Freemium | Visual editor, collaborative |
| Crowdin docs | Any | OSS tier | Branch-based translation |
| Transifex docs | Any | Free tier | Context-aware strings |
| Weblate + docs | Any | Yes | Git integration, versioned |
| mdbook (Rust) | Markdown | Yes | i18n via plugins |
| Hugo + i18n | Markdown | Yes | Multilingual site generation |

**Sphinx documentation i18n:**

`python
# conf.py
locale_dirs = ['locale/']
gettext_compact = False
language = 'en'
`

`ash
# Sphinx i18n workflow
make gettext
sphinx-intl update -p _build/gettext -l de -l fr -l es
make -e SPHINXOPTS="-D language='de'" html
sphinx-intl stat -p _build/gettext -l de
`

## 5.2 README Translation Best Practices

**README translation structure:**
- README.md                    # English (canonical)
- README.de.md                 # German
- README.fr.md                 # French
- README.ja.md                 # Japanese

**Language selector badge row:**

`markdown
<div align="center">
[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![de](https://img.shields.io/badge/lang-de-black.svg)](README.de.md)
[![fr](https://img.shields.io/badge/lang-fr-blue.svg)](README.fr.md)
[![ja](https://img.shields.io/badge/lang-ja-green.svg)](README.ja.md)
</div>
`

**Translation rules:**
1. Keep badges and shields - Replace only the alt text
2. Keep code blocks - Do not translate code
3. Keep links - Update anchors to point to translated files
4. Keep images - Translate image alt text separately
5. Translate ALL prose - Description, features, installation steps
6. Update the language badge - Must show the current language
7. Do NOT translate - Package names, variable names, commands, URLs
---
---

## Part 5: Localization for Non-Code Artifacts

### 5.3 CLI Help Text i18n

**Python CLI with Click and gettext:**

```python
import click
import gettext
_ = gettext.gettext

@click.command()
@click.option('--name', prompt=_('Your name'),
              help=_('Your full name for the greeting'))
def greet(name):
    trans = gettext.translation('myapp', 'locales', languages=['de'])
    trans.install()
    _ = trans.gettext
    click.echo(_('Hello, {name}!').format(name=name))
```

**Node.js CLI with i18next:**

```javascript
import i18next from 'i18next';
await i18next.init({
  lng: process.env.LANG || 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: {} },
    de: { translation: {} },
  },
});
console.log(i18next.t('greeting', { name: 'John' }));
```

### 5.4 Error Message i18n

**Error message best practices:**

| Principle | Bad Example | Good Example |
|-----------|-------------|--------------|
| Use placeholders | File app.js not found | File {filename} not found |
| Complete sentences | Error 404 | The requested page was not found |
| Avoid internal jargon | NullPointerException at 42 | An unexpected error occurred |

**Structured error classes with i18n:**

```python
class LocalizedError(Exception):
    def __init__(self, message_key, **kwargs):
        self.message_key = message_key
        self.kwargs = kwargs
    def __str__(self):
        from django.utils.translation import gettext as _
        return _(self.message_key, **self.kwargs)

class FileNotFoundError(LocalizedError):
    def __init__(self, filename):
        super().__init__('errors.file_not_found', filename=filename)
```

### 5.5 GUI/Menu Text i18n

| UI Element | i18n Concern | Solution |
|------------|-------------|----------|
| Buttons | Text must fit button width | Dynamic width or responsive |
| Menus | Item order may need changing | Logical property ordering |
| Tooltips | May wrap differently by language | Max-width constraints |
| Dialog boxes | Title may overflow | Flexible dialog sizing |
| Tab labels | Multi-line at narrow widths | Icon + text layout |
| Keyboard shortcuts | Letter shortcuts conflict | Configurable shortcuts |

**English to German text expansion ratios:**

| English | German | Expansion |
|---------|--------|-----------|
| Save | Speichern | +50% |
| Delete | Loschen | +13% |
| Settings | Einstellungen | +82% |
| Cancel | Abbrechen | +60% |
| Download | Herunterladen | +100%+ |

### 5.6 Accessibility Texts in Multiple Languages

```typescript
interface AriaLabels {
  skipToMain: string;
  navLabel: string;
  closeButton: string;
  menuButton: string;
  progressLabel: string;
  loadingLabel: string;
  errorAnnouncement: string;
}
const en: AriaLabels = {
  skipToMain: "Skip to main content",
  navLabel: "Main navigation",
  closeButton: "Close dialog",
  menuButton: "Toggle menu",
  progressLabel: "Progress: {percent}% complete",
  loadingLabel: "Content loading, please wait",
  errorAnnouncement: "Error: {message}",
};
```

```html
<nav aria-label="{t(Accessibility.nav_label)}">
  <button aria-label="{t(Accessibility.menu_button)}">
    <span aria-hidden="true">#9776;</span>
  </button>
</nav>
```

---

## Part 6: Community-Driven Localization

### 6.1 Recruiting Translation Contributors

| Channel | Best for | Approach |
|---------|----------|----------|
| GitHub issues | Technical users | Label with help-wanted + i18n |
| Crowdin/Weblate | Dedicated translators | Join existing language teams |
| Community forums | Active users | Post translation calls |
| Social media | Broad reach | Announce new language support |
| Local meetups | Regional focus | Partner with local tech communities |

**Translation call template:**

```markdown
## Help Translate MyApp!

### Priority languages
- German (de) - 60% complete - needs 3 reviewers
- French (fr) - 45% complete - needs 2 translators
- Spanish (es) - 30% complete - needs translators
- Japanese (ja) - 15% complete - needs translators
- Arabic (ar) - 5% complete - needs language coordinator

### How to contribute
1. Create an account on our translation platform
2. Join the language team for your language
3. Start translating! Even 5-10 strings help
4. Review translations from other contributors

### Recognition
- All contributors listed in TRANSLATORS.md
- Top contributors receive project swag
- Language coordinators get maintainer status
```

### 6.2 Reviewer Workflow

**Review process steps:**

1. Translator produces initial translation
2. Self-review for terminology, formatting, length
3. Peer review by second translator
4. Expert review by language lead
5. Final approval and commit

**Workflow states:**

| State | Description | Who can change |
|-------|-------------|----------------|
| Untranslated | Source string, no target | N/A |
| Translated | Initial translation exists | Translator |
| Needs Review | Translation complete, needs checking | Translator |
| Reviewed | Peer reviewer approved | Reviewer |
| Approved | Final approval for release | Language manager |
| Final | Locked, cannot be edited | Admin |

**Review checklist:**

```
## Translation Review Checklist

### Accuracy
[ ] Does translation convey the same meaning?
[ ] Are numbers, dates, placeholders preserved?
[ ] Is tone appropriate (formal vs informal)?

### Language Quality
[ ] Does it read naturally in target language?
[ ] Is grammar correct?
[ ] Are there spelling errors?
[ ] Is punctuation correct for target language?

### Terminology
[ ] Are glossary terms used consistently?
[ ] Are there any forbidden terms?
[ ] Is branding terminology correct?

### Technical
[ ] Are format specifiers preserved?
[ ] Are HTML/XML tags balanced?
[ ] Are variables in correct position?
[ ] Is length within limits?
```

### 6.3 Recognition Programs

| Level | Criteria | Benefits |
|-------|----------|----------|
| Beginner | 100+ strings | Listed in TRANSLATORS.md, sticker |
| Advanced | 1,000+ strings | Listed on website, t-shirt |
| Expert | 10,000+ strings | Language lead eligibility |
| Language Lead | Manages team | Review perms, conf sponsorship |

**Annual awards:**
- Translator of the Year: Most strings translated
- Quality Award: Highest approval rate
- Rising Star: Best newcomer
- Community Builder: Best language team growth
- Polyglot Award: Active in most languages

### 6.4 Translation Sprints

**Sprint planning template:**

```
## Translation Sprint: MyApp v3.0

### Timeline
- Kickoff: March 1
- Translation: March 1-14
- Review: March 14-21
- Final review: March 21-28
- Release: March 30

### Goals
- 100% for top 5 languages (de, fr, es, ja, zh-CN)
- 80% for next 5 languages (pt-BR, ko, ru, ar, it)
- Review all existing translations for top 3 languages
- Update glossary with 20 new terms

### Rewards
- Top translator per language: gift card
- Reviewer bonus for 500+ strings
- All participants: swag + badge
```

### 6.5 Handling Incomplete Translations (Fallback Chains)

**Language resolution with fallbacks:**

```javascript
const LOCALE_FALLBACKS = {
  'en-GB': 'en', 'en-US': 'en',
  'pt-BR': 'pt', 'pt-PT': 'pt',
  'zh-CN': 'zh', 'zh-TW': 'zh',
  'es-MX': 'es', 'es-AR': 'es',
  'fr-CA': 'fr', 'fr-BE': 'fr',
  'de-AT': 'de', 'de-CH': 'de',
};

function resolveLocale(requested, supported) {
  if (supported.includes(requested)) return requested;
  var lang = requested.split('-')[0];
  if (supported.includes(lang)) return lang;
  var fallback = LOCALE_FALLBACKS[requested];
  if (fallback && supported.includes(fallback)) return fallback;
  return 'en';
}
```

### 6.6 Quality Control

| Metric | Target | Calculation |
|--------|--------|-------------|
| Translation coverage | >90% per lang | Translated / total strings |
| Approval rate | >80% | Approved / total translated |
| Consistency score | >90% | Consistent terms / total checked |
| Review turnaround | <7 days | Submission to approval |
| Revert rate | <5% | Reverted / total commits |
| Error density | <1/1000 words | QA errors per thousand words |

**Automated quality gate:**

```python
import re

class TranslationQualityGate:
    def check_placeholders(self, source, translation):
        src = set(re.findall(r'\{(\w+)\}', source))
        trg = set(re.findall(r'\{(\w+)\}', translation))
        missing = src - trg
        return {'pass': len(missing) == 0, 'missing': list(missing)}

    def check_html_tags(self, source, translation):
        def extract(text):
            return re.findall(r'</?(\w+)[^>]*>', text)
        return {'pass': extract(source) == extract(translation)}

    def check_length(self, source, translation, max_ratio=1.5):
        ratio = len(translation) / len(source) if source else 0
        return {'pass': ratio <= max_ratio, 'ratio': ratio}
```

---

## Part 7: Testing i18n/l10n

### 7.1 Testing with Different Locales

**Python test with locale parameterization:**

```python
import pytest
from your_app import format_greeting

LOCALE_TEST_CASES = [
    ('en', 'Hello, World!'),
    ('de', 'Hallo, Welt!'),
    ('fr', 'Bonjour, le monde!'),
    ('es', 'Hola, mundo!'),
    ('ja', 'Kon'nichiwa sekai!'),
    ('ar', 'Marhaban bialalam!'),
    ('ru', 'Zdravstvuy, mir!'),
]

@pytest.mark.parametrize('locale,expected', LOCALE_TEST_CASES)
def test_greeting_translation(locale, expected):
    assert format_greeting(locale) == expected
```

**JavaScript test with Vitest:**

```javascript
import { describe, it, expect } from 'vitest';
import i18next from 'i18next';

describe('i18n translations', () => {
  beforeAll(async () => {
    await i18next.init({
      lng: 'de',
      fallbackLng: 'en',
      resources: {
        en: { translation: { welcome: 'Welcome, {name}!' } },
        de: { translation: { welcome: 'Willkommen, {name}!' } },
      },
    });
  });

  it('should translate welcome message to German', () => {
    expect(i18next.t('welcome', { name: 'John' }))
      .toBe('Willkommen, John!');
  });

  it('should fallback to English for missing translations', () => {
    expect(i18next.t('nonexistent.key'))
      .toBe('nonexistent.key');
  });

  it('should handle plurals correctly', () => {
    expect(i18next.t('items', { count: 1 })).toBe('1 item');
    expect(i18next.t('items', { count: 5 })).toBe('5 items');
  });
});
```

**Locale matrix testing:**

| Test | Locales | What it verifies |
|------|---------|------------------|
| Date formatting | All | Locale-correct date display |
| Number formatting | All | Decimal/grouping separators correct |
| Currency formatting | All | Symbol position, decimal places |
| Plural rules | CLDR test set | Correct plural category selection |
| RTL layout | ar, he, fa | UI elements render correctly |
| Text expansion | de, ru, pl | UI accommodates longer text |
| Collation | sv, de, es | Sorting order correct per locale |
| Timezone conversion | All major tzs | UTC to local conversion correct |
| Encoding | ja, zh, ko | CJK characters display properly |
| Bidirectional | ar, he | Mixed LTR/RTL text reads correctly |

### 7.2 Pseudo-Localization Testing

Pseudo-localization simulates translation to catch i18n bugs before actual translation begins.

**Pseudo-locale transformations:**

| Transformation | Example | Purpose |
|---------------|---------|---------|
| Accent characters | `Hello` -> `Héllö` | Verify Unicode support |
| Text expansion | `Hello` -> `Héllö [XXXXX]` | Test UI overflow |
| RTL simulation | `Hello` -> `[olleH]` | Test RTL layout |
| Character replacement | `a` -> `ä`, `e` -> `é` etc. | Test encoding |
| Padding | Add 30-50% more chars | Test text wrapping |

**Pseudo-localization script:**

```python
import json

ACCENT_MAP = {
    'a': 'ä', 'e': 'é', 'i': 'í', 'o': 'ö', 'u': 'ü',
    'A': 'Ä', 'E': 'É', 'I': 'Í', 'O': 'Ö', 'U': 'Ü',
    'c': 'ç', 'n': 'ñ', 's': 'ß',
}

def pseudo_localize(text, expand_pct=30):
    result = ''
    for char in text:
        result += ACCENT_MAP.get(char, char)
    # Add expansion padding
    padding = ' ' + 'X' * int(len(text) * expand_pct / 100)
    return result + padding

def generate_pseudo_locale(source_file, output_file):
    with open(source_file, 'r', encoding='utf-8') as f:
        source = json.load(f)

    def transform(obj):
        if isinstance(obj, str):
            return pseudo_localize(obj)
        elif isinstance(obj, dict):
            return {k: transform(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [transform(item) for item in obj]
        return obj

    pseudo = transform(source)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(pseudo, f, indent=2, ensure_ascii=False)

generate_pseudo_locale('locales/en.json', 'locales/pseudo.json')
```

**Running pseudo-localization checks:**

```bash
# Set application to pseudo-locale
export LANG=pseudo
npm run dev

# Or in browser tests, set cookie
document.cookie = "lang=pseudo; path=/"

# Screenshot all pages with pseudo-locale
npx playwright test --grep "screenshot"
```

### 7.3 RTL Testing Workflow

```typescript
// RTL testing with Playwright
import { test, expect } from '@playwright/test';

const RTL_LOCALES = [
  { lang: 'ar', name: 'Arabic' },
  { lang: 'he', name: 'Hebrew' },
  { lang: 'fa', name: 'Persian' },
  { lang: 'ur', name: 'Urdu' },
];

for (const locale of RTL_LOCALES) {
  test(`should render correctly in ${locale.name}`, async ({ page }) => {
    await page.goto(`/?lang=${locale.lang}`);

    // Check document direction
    const dir = await page.getAttribute('html', 'dir');
    expect(dir).toBe('rtl');

    // Check text alignment of body
    const alignment = await page.evaluate(() => {
      return getComputedStyle(document.body).textAlign;
    });
    expect(alignment).toBe('start');

    // Check navigation order (right to left)
    const firstNavItem = page.locator('nav a').first();
    const box = await firstNavItem.boundingBox();
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(box.x).toBeGreaterThan(viewportWidth / 2);

    // Take screenshot
    await page.screenshot({ path: `screenshots/rtl-${locale.lang}.png` });
  });
}
```

**RTL visual regression checklist:**

| Check | Method | Pass/Fail |
|-------|--------|-----------|
| Page direction | `<html dir="rtl">` | |
| Text alignment | Right-aligned body text | |
| Navigation order | Menu items RTL | |
| Form labels | Label on right, input on left | |
| Button icons | Arrow icons mirrored | |
| Checkbox/radio | Label on left of control | |
| Progress bars | Fill from right to left | |
| Scrollbar | Left side (platform-dependent) | |
| Time display | Past on right, future on left | |
| Number display | Numbers still LTR within RTL text | |
| Mixed text | LTR text properly isolated | |
| Dropdown menus | Expand to left if needed | |

### 7.4 Character Encoding Tests

```python
import pytest

# Test strings covering major scripts
UNICODE_TEST_STRINGS = [
    # Latin
    ("en", "The quick brown fox jumps over the lazy dog"),
    # Cyrillic
    ("ru", "S'esh' eshchë etikh myagkikh frantsuzskikh bulok da vypey chayu"),
    # CJK
    ("ja", "Konnichiwa sekai"),
    ("zh", "Ni hao shijie"),
    ("ko", "Annyeonghaseyo segye"),
    # Arabic
    ("ar", "Marhaban bialalam"),
    # Hebrew
    ("he", "Shalom olam"),
    # Devanagari
    ("hi", "Namaste duniya"),
    # Thai
    ("th", "Sawasdee lok"),
    # Emoji
    ("en", "Hello World! 🌍🌟🎉"),
    # Mathematical symbols
    ("en", "x + y = z &int; &sum; &pi;"),
]

@pytest.mark.parametrize('locale,text', UNICODE_TEST_STRINGS)
def test_unicode_rendering(locale, text):
    """Verify all Unicode characters pass through cleanly."""
    result = process_text(text, locale)
    assert result == text, f"Unicode corruption for {locale}: {text} -> {result}"

def test_encoding_roundtrip():
    """Test UTF-8 encoding/decoding roundtrip."""
    original = "Café résumé 中文 Español عربي 日本語"
    encoded = original.encode('utf-8')
    decoded = encoded.decode('utf-8')
    assert original == decoded

def test_surrogate_pairs():
    """Test supplementary plane characters (emojis, rare CJK)."""
    emoji = "😀🎉🚀💯⭐"
    assert len(emoji) == 5  # 5 code points, not 10 (JS UTF-16)
```

### 7.5 Translation Completeness Checking

```bash
#!/bin/bash
# Translation coverage checker

echo "=== Translation Coverage Report ==="
echo ""

SOURCE_FILE="locales/en.json"
SOURCE_COUNT=$(python -c "import json; d=json.load(open('$SOURCE_FILE')); print(len([v for v in d.values() if isinstance(v, str)]))")
echo "Source strings: $SOURCE_COUNT"
echo ""

for lang_file in locales/*.json; do
    lang=$(basename "$lang_file" .json)
    [ "$lang" = "en" ] && continue

    TRANS_COUNT=$(python -c "
import json
src = json.load(open('$SOURCE_FILE'))
trg = json.load(open('$lang_file'))
count = sum(1 for k in src if isinstance(src[k], str) and k in trg)
print(count)
")

    COMPLETE=$(python -c "
import json
src = json.load(open('$SOURCE_FILE'))
trg = json.load(open('$lang_file'))
src_keys = [k for k, v in src.items() if isinstance(v, str)]
trg_keys = [k for k, v in trg.items() if isinstance(v, str)]
missing = [k for k in src_keys if k not in trg_keys]
print(f'{\"$TRANS_COUNT/$SOURCE_COUNT\"} - missing: {len(missing)}')
for k in missing[:5]:
    print(f'  - $k')
")

    echo "$lang: $COMPLETE"
done
```

**Coverage thresholds for CI:**

```yaml
# .github/workflows/i18n-check.yml
coverage_thresholds:
  critical_languages:  # Must ship with full translation
    - de
    - fr
    - es
    - ja
    - zh-CN
  threshold_critical: 100%  # Must be complete

  secondary_languages:  # Partial translation acceptable
    - pt-BR
    - ko
    - ru
    - ar
    - it
  threshold_secondary: 80%

  new_languages:  # Early stage
    - nl
    - pl
    - sv
    - tr
  threshold_new: 50%
```

### 7.6 Visual Regression Testing for Localized UI

```typescript
// Playwright screenshot comparison for i18n
import { test, expect } from '@playwright/test';

const LOCALES = ['en', 'de', 'fr', 'es', 'ja', 'zh-CN', 'ar'];

for (const locale of LOCALES) {
  test(`visual regression: ${locale} homepage`, async ({ page }) => {
    await page.goto(`/?lang=${locale}`);
    await page.waitForLoadState('networkidle');

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot(`homepage-${locale}.png`, {
      threshold: 0.02,  // Allow 2% pixel difference for antialiasing
      fullPage: true,
    });
  });
}
```

**Screenshot diff comparison:**

```bash
# Generate screenshots for all locales
npx playwright test --grep "screenshot" --update-snapshots

# Compare current vs. baseline
npx playwright test --grep "screenshot"

# Visual diff report
npx playwright show-report
```

---

## Part 8: i18n/l10n in CI/CD

### 8.1 Automated Translation Extraction

```yaml
# .github/workflows/i18n-extract.yml
name: i18n Extract
on:
  push:
    branches: [main]
    paths:
      - 'src/**/*.py'
      - 'src/**/*.js'
      - 'src/**/*.tsx'

jobs:
  extract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install Babel
        run: pip install Babel

      - name: Extract strings
        run: |
          pybabel extract \
            --input-dirs=src \
            --output-file=locales/messages.pot \
            --project=MyApp \
            --mapping-file=babel.cfg

      - name: Update translations
        run: |
          pybabel update \
            --input-file=locales/messages.pot \
            --output-dir=locales \
            --domain=messages

      - name: Commit updated translations
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore(i18n): update translation source strings'
          file_pattern: locales/*.po locales/*.pot
```

**JavaScript extraction script:**

```yaml
# .github/workflows/i18n-extract-js.yml
jobs:
  i18n-extract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Extract i18n keys
        run: |
          npx i18next-scanner \
            --config i18next-scanner.config.js \
            --output locales \
            'src/**/*.{js,jsx,ts,tsx}'

      - name: Validate extraction
        run: node scripts/validate-i18n.js
```

### 8.2 Translation File Validation in CI

```yaml
# .github/workflows/i18n-validate.yml
name: i18n Validation
on:
  pull_request:
    paths:
      - 'locales/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate PO files
        run: |
          for po in locales/*/LC_MESSAGES/*.po; do
            msgfmt --check-format --check-domain -o /dev/null "$po"
            msgfmt --statistics "$po"
          done

      - name: Validate JSON files
        run: |
          python scripts/validate_translations.py

      - name: Check placeholder consistency
        run: |
          python scripts/check_placeholders.py

      - name: Check for missing translations (critical languages)
        run: |
          python scripts/coverage_check.py --min 100 --langs de,fr,es,ja,zh-CN

      - name: Check for missing translations (secondary)
        run: |
          python scripts/coverage_check.py --min 80 --langs pt-BR,ko,ru,ar,it
```

```python
# scripts/validate_translations.py
import json
import sys
import os

LOCALES_DIR = 'locales'
ERRORS = []

def validate_json_structure(filepath, lang):
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            ERRORS.append(f"{lang}: Invalid JSON - {e}")
            return None
    return data

def check_placeholders(source, translation, lang, key):
    import re
    src_vars = set(re.findall(r'\{(\w+)\}', source))
    trg_vars = set(re.findall(r'\{(\w+)\}', translation))
    missing = src_vars - trg_vars
    if missing:
        ERRORS.append(f"{lang}/{key}: Missing placeholders: {missing}")

def check_html_balance(source, translation, lang, key):
    import re
    tags = re.findall(r'</?(\w+)>', source)
    trg_tags = re.findall(r'</?(\w+)>', translation)
    if tags != trg_tags:
        ERRORS.append(f"{lang}/{key}: HTML tag mismatch")

def main():
    source = validate_json_structure(f'{LOCALES_DIR}/en.json', 'en')
    if not source:
        sys.exit(1)

    for lang_file in os.listdir(LOCALES_DIR):
        if not lang_file.endswith('.json') or lang_file == 'en.json':
            continue
        lang = lang_file.replace('.json', '')
        target = validate_json_structure(f'{LOCALES_DIR}/{lang_file}', lang)
        if not target:
            continue

        for key in source:
            if key not in target:
                ERRORS.append(f"{lang}: Missing key '{key}'")
                continue

            source_val = source[key]
            target_val = target[key]

            if isinstance(source_val, str) and isinstance(target_val, str):
                check_placeholders(source_val, target_val, lang, key)
                check_html_balance(source_val, target_val, lang, key)

    if ERRORS:
        for err in ERRORS:
            print(f"ERROR: {err}")
        sys.exit(1)
    else:
        print("All translation files valid!")

if __name__ == '__main__':
    main()
```

### 8.3 Screenshot-Based Localization Testing

```yaml
# .github/workflows/i18n-visual.yml
name: i18n Visual Tests
on:
  pull_request:
    paths:
      - 'locales/**'
      - 'src/**'

jobs:
  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Generate screenshots for all locales
        run: npx playwright test --grep "screenshot"

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        with:
          name: i18n-screenshots
          path: screenshots/

      - name: Visual diff comparison
        run: |
          npx playwright test --grep "screenshot" \
            --reporter=html
```

### 8.4 Translation Coverage Gates

```yaml
# .github/workflows/i18n-coverage.yml
name: i18n Coverage Check
on:
  pull_request:
    paths:
      - 'locales/**'

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check translation coverage
        run: |
          python scripts/coverage_gate.py

      - name: Comment PR with coverage report
        uses: actions/github-script@v7
        with:
          script: |
            const coverage = require('./coverage-report.json');
            let comment = '## Translation Coverage Report\n\n';
            for (const [lang, stats] of Object.entries(coverage)) {
              const status = stats.passed ? '✅' : '❌';
              comment += `${status} **${lang}**: ${stats.percentage}% `;
              comment += `(${stats.translated}/${stats.total})\n`;
            }
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

```python
#!/usr/bin/env python3
# scripts/coverage_gate.py
import json
import os
import sys

LOCALES_DIR = 'locales'
THRESHOLDS = {
    'de': 100, 'fr': 100, 'es': 100,
    'ja': 100, 'zh-CN': 100,
    'pt-BR': 80, 'ko': 80, 'ru': 80,
    'ar': 80, 'it': 80,
    'nl': 50, 'pl': 50, 'sv': 50,
}

with open(f'{LOCALES_DIR}/en.json') as f:
    source = json.load(f)

source_keys = [k for k, v in source.items() if isinstance(v, str)]
total = len(source_keys)
report = {}
exit_code = 0

for lang, threshold in THRESHOLDS.items():
    filepath = f'{LOCALES_DIR}/{lang}.json'
    if not os.path.exists(filepath):
        report[lang] = {
            'percentage': 0, 'translated': 0, 'total': total,
            'passed': False, 'error': 'File not found'
        }
        exit_code = 1
        continue

    with open(filepath) as f:
        target = json.load(f)

    translated = sum(1 for k in source_keys if k in target)
    pct = (translated / total) * 100
    passed = pct >= threshold

    report[lang] = {
        'percentage': round(pct, 1),
        'translated': translated,
        'total': total,
        'threshold': threshold,
        'passed': passed,
    }

    if not passed:
        exit_code = 1

with open('coverage-report.json', 'w') as f:
    json.dump(report, f, indent=2)

for lang, stats in report.items():
    icon = 'PASS' if stats['passed'] else 'FAIL'
    print(f"[{icon}] {lang}: {stats['percentage']}% ({stats['translated']}/{stats['total']})")

sys.exit(exit_code)
```

---

## Part 9: Templates

### 9.1 i18n Setup Guide Template for New Projects

```markdown
# Internationalization (i18n) Setup Guide

## Overview

This guide walks through adding i18n support to [Project Name].

## Step 1: Choose Your Approach

- **Language/Framework**    : [Python/Django/JS/React/...]
- **i18n Library**          : [gettext/Babel/i18next/react-intl/...]
- **Translation Format**    : [PO/JSON/XLIFF/YAML]
- **Translation Platform**  : [Crowdin/Weblate/Transifex]

## Step 2: Install Dependencies

```bash
# Example for Python/Babel
pip install Babel

# Example for JavaScript/i18next
npm install i18next i18next-http-backend
```

## Step 3: Configure Project Structure

```
project/
  locales/
    en/
      messages.po      # English (source language)
    de/
      messages.po      # German
    fr/
      messages.po      # French
    messages.pot       # Template file (generated)
  babel.cfg            # Babel extraction config
  package.json         # i18n scripts for JS projects
```

## Step 4: Set Up String Extraction

Create extraction configuration and scripts:

```ini
# babel.cfg
[python: **.py]
[html: **.html]
[jinja2: **.j2]
```

```json
// package.json scripts for i18next
{
  "scripts": {
    "i18n:extract": "i18next-scanner --config i18next-scanner.config.js",
    "i18n:compile": "i18next compile-locales"
  }
}
```

## Step 5: Externalize Strings

Replace hardcoded strings with i18n function calls:

```python
# Before
print("Hello, World!")
title = "My Application"

# After
from gettext import gettext as _
print(_("Hello, World!"))
title = _("My Application")

# With variables
print(_("Welcome, {name}!").format(name=user.name))
```

## Step 6: Extract and Translate

```bash
# Extract source strings
pybabel extract -o locales/messages.pot .

# Initialize new language
pybabel init -i locales/messages.pot -d locales -l de

# Update after changes
pybabel update -i locales/messages.pot -d locales

# Compile for production
pybabel compile -d locales
```

## Step 7: Load Translations at Runtime

```python
import gettext

def setup_i18n(language='en'):
    try:
        trans = gettext.translation('messages',
            'locales', languages=[language])
        trans.install()
    except FileNotFoundError:
        gettext.install('messages')
```

## Step 8: Test with Different Locales

1. Set locale environment variable: `export LANG=de_DE.UTF-8`
2. Run application with different languages
3. Verify all strings display correctly
4. Test RTL layout if applicable

## Step 9: Set Up Translation Platform

1. Create project on [Crowdin/Weblate]
2. Upload source files
3. Invite translators
4. Configure automated sync with repository
```

### 9.2 Translation Contributor Guide Template

```markdown
# Translation Contributor Guide

Thank you for contributing translations to [Project Name]!

## Getting Started

1. **Create an account** on [Translation Platform URL]
2. **Join the [Language] team** or request a new language
3. **Read the Style Guide** (see below)
4. **Start translating!**

## Translation Workflow

```
Source String (English)
    |
    v
1. Translate into your language
    |
    v
2. Self-review: check accuracy, grammar, terminology
    |
    v
3. Submit for review
    |
    v
4. Reviewer approves or requests changes
    |
    v
5. Translation goes live!
```

## What to Translate

- User interface strings (buttons, labels, menus)
- Error messages
- Tooltips and help text
- Documentation

## What NOT to Translate

- Code snippets and variable names
- Command names and flags
- URLs and file paths
- Version numbers and dates (format, not values)
- Brand names and trademarks

## Quality Guidelines

### Do
- Use natural language for your locale
- Maintain consistent terminology
- Keep the same meaning as the source
- Use appropriate formality level (formal "Sie" vs informal "du" in German)
- Preserve all placeholders ({name}, {count}, etc.)

### Don't
- Use machine translation without reviewing
- Translate literally when idiom is needed
- Change the meaning or add information
- Leave strings partially translated
- Ignore context comments from developers

## Using the Translation Platform

1. **Filter** untranslated strings first
2. **Search** the translation memory for similar strings
3. **Check** the glossary for approved terminology
4. **Use** the context screenshot if available
5. **Save** frequently to avoid losing work

## Communicating

- Join the [#i18n-language] channel on Discord/Slack
- Tag [Language Coordinator] for questions
- Report bugs in the translation platform
- Suggest glossary additions through the coordinator

## Recognition

All translators are listed in TRANSLATORS.md.
Top contributors receive project swag and badges.
Language coordinators earn maintainer status.
```

### 9.3 Localization Style Guide Template

```markdown
# Localization Style Guide for [Project Name]

## Language: [Language Name] ([Locale Code])

**Maintained by:** [Name]
**Last updated:** [Date]

## Tone and Register

- **Formality level**: [Formal/Informal/Mixed]
- **Target audience**: [End users/Developers/Both]
- **Exceptions**: [When to switch register]

## Terminology

### Approved Translations

| English Term | [Language] Translation | Notes |
|--------------|----------------------|-------|
| Sign In | | |
| Sign Out | | |
| Settings | | |
| Account | | |
| Notification | | |
| Dashboard | | |
| Workspace | | |
| Upload | | |
| Download | | |
| Delete | | |
| Save | | |

### Forbidden Terms

| English Term | Do NOT Use | Use Instead |
|--------------|-----------|-------------|
| Click here | | |
| Log in | | Use "Sign In" |
| Error! | | Use "Error:" |

## Grammar and Style Rules

### Capitalization
- Sentence case for buttons and labels
- Title case for headings
- [Language-specific capitalization rules]

### Numbers and Punctuation
- Decimal separator: [,/./ ]
- Thousands separator: [,/./ ]
- Quotation marks: ["..."/'...'/\u00ab...\u00bb/...]
- List punctuation: [;/./:]

### Dates and Times
- Date format: [DD/MM/YYYY / MM/DD/YYYY / YYYY-MM-DD]
- Time format: [24h / 12h AM/PM]
- First day of week: [Monday/Sunday]

### Currency
- Local currency symbol: [€/$/¥/₽/R$]
- Symbol position: [Before/After amount]
- Space between: [Yes/No]

### Addresses
- Format: [Street City PostalCode Country]
- Phone format: [+XX (XXX) XXX-XXXX]

## Special Cases

### Gender
- [Language] has [masculine/feminine/neuter] gender
- Use [neuter/formal-you/] for UI text when possible
- [How to handle gender-neutral English terms]

### Pluralization
- [Language] has [1/2/3-4/CLDR] plural forms
- Test plural rules: [0, 1, 2, 3, 5, 10, 21, 100]

### Text Direction
- [LTR/RTL]
- [Special RTL considerations]

### Text Expansion
- [Language] text is typically [shorter/same/longer] than English
- Expect expansion of [X%] on average
- Test UI with longest expected strings

## Technical Terms

### Acronyms
- Keep acronyms in English: [Yes/No]
- Translate acronyms: [Yes/No]
- First occurrence: [Spell out in full with acronym in parentheses]

### Code and Commands
- Never translate code, commands, or file names
- Translate only comments and documentation

## Review Checklist

Before approving a translation, verify:

- [ ] Matches source meaning
- [ ] Follows style guide rules
- [ ] Uses approved terminology
- [ ] Grammar is correct
- [ ] Punctuation matches locale rules
- [ ] Placeholders are preserved
- [ ] Text fits UI constraints
- [ ] Consistent with existing translations
```

### 9.4 i18n Testing Checklist

```markdown
# i18n Testing Checklist

## Pre-Release Checklist

### String Externalization
- [ ] No hardcoded user-facing strings in code
- [ ] All strings wrapped in i18n function calls
- [ ] Dynamic values use placeholders, not concatenation
- [ ] Translation files exist for all target languages

### Locale Detection
- [ ] Browser language detection works
- [ ] Manual language switcher works
- [ ] Language preference persists (cookie/localStorage)
- [ ] Fallback to default locale works
- [ ] Invalid locale codes handled gracefully

### Text Rendering
- [ ] All characters display correctly (no mojibake)
- [ ] UTF-8 encoding is used throughout
- [ ] CJK characters render properly
- [ ] Arabic/Hebrew characters render properly
- [ ] Emoji and special characters display correctly
- [ ] Fonts support all required scripts

### Number Formatting
- [ ] Decimal separators correct per locale
- [ ] Grouping separators correct per locale
- [ ] Currency symbols display correctly
- [ ] Currency symbol position correct
- [ ] Negative numbers formatted correctly
- [ ] Percentages formatted per locale

### Date/Time Formatting
- [ ] Short date format correct per locale
- [ ] Long date format correct per locale
- [ ] Time format correct (12h vs 24h)
- [ ] Timezone conversion works correctly
- [ ] Relative time display works ("2 days ago")
- [ ] Calendar first day of week correct

### Pluralization
- [ ] Singular form displays for count = 1
- [ ] Plural form displays for count > 1
- [ ] Zero count handled correctly
- [ ] Special plural rules tested (2, 3-10, 11+)
- [ ] Arabic dual form tested
- [ ] Russian/POL plural forms tested

### RTL Layout
- [ ] Page direction set correctly (`dir="rtl"`)
- [ ] Text is right-aligned
- [ ] Navigation order is RTL
- [ ] Form labels on correct side
- [ ] Icons mirrored correctly
- [ ] Progress bars fill from right
- [ ] Scrollbar position (if applicable)
- [ ] Mixed LTR/RTL text displays correctly

### UI Layout
- [ ] No text truncation in German/Russian
- [ ] No text overflow in buttons
- [ ] Dialog titles fit without wrapping
- [ ] Table columns accommodate longest text
- [ ] Tooltips don't overflow viewport
- [ ] Responsive design works with expanded text

### Functional Testing
- [ ] Forms submit correctly in all locales
- [ ] Search works with non-ASCII characters
- [ ] Sorting works with locale-specific rules
- [ ] Validation messages display in correct language
- [ ] Email notifications localized
- [ ] PDF/document generation localized
- [ ] Error pages localized

### Accessibility
- [ ] ARIA labels translated
- [ ] Screen reader announcements in correct language
- [ ] Focus order correct in RTL
- [ ] Keyboard shortcuts don't conflict
- [ ] Alt text on images translated

### Translation Completeness
- [ ] No untranslated strings in critical languages
- [ ] No empty translations
- [ ] No strings showing key names instead of values
- [ ] Placeholders all present in translations
- [ ] Translation coverage above threshold

## Per-Language Checklist

### German (de)
- [ ] Formal "Sie" used consistently
- [ ] Capitalization rules followed (all nouns capitalized)
- [ ] Date format: DD.MM.YYYY
- [ ] Time format: 24h
- [ ] Decimal: 1.234,56
- [ ] Plural: one/other (n != 1)

### French (fr)
- [ ] Space before colon, semicolon, exclamation
- [ ] Date format: DD/MM/YYYY
- [ ] Time format: 24h
- [ ] Decimal: 1 234,56
- [ ] Plural: one/other (n > 1, includes 0)

### Japanese (ja)
- [ ] No spaces between words
- [ ] Full-width characters for UI text
- [ ] Date format: YYYY/MM/DD
- [ ] Time format: 24h
- [ ] No plural forms (single form for all)
- [ ] Honorific levels appropriate

### Arabic (ar)
- [ ] RTL layout verified
- [ ] Arabic-Indic digits for numbers
- [ ] Date format: DD/MM/YYYY with Arabic names
- [ ] Plural: zero/one/two/few/many/other
- [ ] Kashida not overused
- [ ] URLs and numbers maintain LTR

### Russian (ru)
- [ ] Date format: DD.MM.YYYY
- [ ] Decimal: 1 234,56
- [ ] Plural: one/few/many
- [ ] Capitalization: second language (English) terms lowercase

### Chinese (zh-CN)
- [ ] Simplified characters used (not Traditional)
- [ ] No spaces between words
- [ ] Date format: YYYY/MM/DD
- [ ] No plural forms
- [ ] Technical terms use accepted translations
```

### 9.5 Crowdin/Weblate Project Setup Guide

```markdown
# Translation Platform Setup Guide

## Option 1: Crowdin

### Step 1: Create Project
1. Go to https://crowdin.com and sign up (free for OSS)
2. Click "New Project"
3. Enter project name and description
4. Set source language to English
5. Select target languages
6. Apply for OSS license if project is open source

### Step 2: Configure Project
```yaml
# crowdin.yml
project_id: "YOUR_PROJECT_ID"
api_token: "%CROWDIN_PERSONAL_TOKEN%"

files:
  - source: /locales/en.json
    translation: /locales/%two_letters_code%.json
    update_option: update_as_unapproved

  - source: /docs/en/**/*.md
    translation: /docs/%two_letters_code%/**/%original_file_name%
```

### Step 3: Integrate with GitHub
1. Go to Integrations > GitHub
2. Install the Crowdin GitHub app
3. Select repositories to connect
4. Configure auto-sync (push translations to repo)
5. Set up branch strategy (translate on release branch)

### Step 4: Invite Translators
1. Go to Members > Add Members
2. Invite by email or share join link
3. Assign roles (translator, proofreader, manager)
4. Create language-specific teams

### Step 5: Configure Workflow
1. Set up translation memory
2. Enable machine translation pre-translation
3. Configure QA checks (placeholder, length, etc.)
4. Set up glossary
5. Configure review workflow

## Option 2: Weblate (Self-Hosted)

### Step 1: Deploy Weblate
```yaml
# docker-compose.yml
version: '3'
services:
  weblate:
    image: weblate/weblate
    ports:
      - "8080:8080"
    environment:
      - WEBLATE_SITE_DOMAIN=weblate.example.com
      - WEBLATE_ADMIN_PASSWORD=secure_password
      - POSTGRES_PASSWORD=db_password
      - REDIS_PASSWORD=redis_password
    volumes:
      - weblate-data:/app/data
```

### Step 2: Create Component
1. Log in as admin
2. Create new project
3. Add component with Git repository URL
4. Configure file format (JSON, PO, XLIFF, etc.)
5. Set file mask (locales/*.json)
6. Set monolingual or bilingual mode

### Step 3: Configure Add-ons
1. Enable automatic translation (DeepL/Google)
2. Enable Git export
3. Enable squash merge for commits
4. Enable component discovery for new languages
5. Set up scheduled updates

### Step 4: Translation Workflow
1. Enable voting for quality control
2. Set up automatic acceptance thresholds
3. Configure language teams
4. Set up notification emails
5. Create translation stats dashboard

### Step 5: CI Integration
```yaml
# .github/workflows/weblate-sync.yml
name: Weblate Sync
on:
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Pull translations from Weblate
        run: |
          git remote add weblate https://weblate.example.com/git/myapp/main/
          git fetch weblate
          git merge weblate/main
      - name: Push to GitHub
        run: git push origin main
```

### Workflow Comparison

| Feature | Crowdin (OSS) | Weblate (Self-Hosted) |
|---------|--------------|----------------------|
| Setup effort | Low (SaaS) | Medium (self-host) |
| Cost | Free for OSS | Free (self-host) |
| Control | Limited | Full control |
| Integrations | Built-in Git | via hooks |
| MT engines | DeepL, Google, Azure | DeepL, Google, LibreTranslate |
| Performance | Hosted | Depends on server |
| Backup | Handled | You manage |
| Privacy | Shared infra | Your server |
```

### 9.6 PO File Template

```po
# LANGUAGE translation for PROJECT
# Copyright (C) YEAR ORGANIZATION
# This file is distributed under the same license as the PROJECT package.
# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.
#
msgid ""
msgstr ""
"Project-Id-Version: PROJECT VERSION\n"
"Report-Msgid-Bugs-To: EMAIL@ADDRESS\n"
"POT-Creation-Date: YYYY-MM-DD HH:MM+ZONE\n"
"PO-Revision-Date: YYYY-MM-DD HH:MM+ZONE\n"
"Last-Translator: NAME <EMAIL>\n"
"Language-Team: LANGUAGE <LL@li.org>\n"
"Language: LL\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=INTEGER; plural=EXPRESSION;\n"

#: source/file.py:LINE
#. TRANSLATOR NOTE - context about this string
#, python-format
msgid "Example source string"
msgstr "Example translated string"

#: source/file.py:LINE
msgid "Singular form with %d variable"
msgid_plural "Plural form with %d variable"
msgstr[0] "Translated singular"
msgstr[1] "Translated plural"
msgstr[2] "Translated few form" # Russian/Polish/etc.
```

### 9.7 Translation Review Checklist

```markdown
# Translation Review Checklist

## Pre-Review
- [ ] Translation is complete (no empty strings)
- [ ] Translation memory and glossary have been referenced
- [ ] Machine translation has been reviewed and edited

## Accuracy
- [ ] Translation conveys the exact same meaning as source
- [ ] No information added or removed
- [ ] Technical terms are correctly translated
- [ ] Numbers and measurements are correct
- [ ] Names, brands, and trademarks are preserved
- [ ] Cultural references are appropriate
- [ ] No offensive or misleading content

## Language Quality
- [ ] Grammar is correct for target language
- [ ] Spelling is correct (use spell checker)
- [ ] Punctuation follows target language rules
- [ ] Sentence structure is natural
- [ ] Proper tense and mood used
- [ ] No awkward or unnatural phrasing
- [ ] Appropriate register (formal/informal)
- [ ] Contractions used appropriately

## Terminology
- [ ] All terms match the project glossary
- [ ] Consistent terminology across all strings
- [ ] No forbidden terms used
- [ ] Acronyms handled according to style guide
- [ ] Brand names preserved and correctly formatted

## Technical
- [ ] All placeholders preserved: {name}, %s, {count}
- [ ] Placeholder order is correct for target language syntax
- [ ] HTML/XML/Markdown tags are balanced
- [ ] No broken formatting (bold, italic, links)
- [ ] Line breaks match source
- [ ] Special characters are correct (©, ®, ™)
- [ ] Length is within UI constraints
- [ ] Variables are in correct grammatical position

## Consistency
- [ ] Same English terms translated the same way
- [ ] Different English terms have different translations
- [ ] Style matches existing translations in the project
- [ ] Tone is consistent across all strings
- [ ] Same person/number used throughout

## Locale-Specific
- [ ] Date format matches locale convention
- [ ] Time format matches locale convention
- [ ] Number format matches locale (decimal, grouping)
- [ ] Currency format matches locale
- [ ] Address format matches locale
- [ ] Phone number format matches locale
- [ ] Units of measurement are localized
- [ ] Text direction is correct (LTR/RTL)

## Final Verification
- [ ] Translate the string back to ensure meaning is preserved
- [ ] Test string in actual UI context
- [ ] Check on mobile and desktop viewports
- [ ] Verify with another native speaker
- [ ] Mark as approved only when all checks pass

## Sign-off
- [ ] Reviewed by: ________________________
- [ ] Date: ______________________________
- [ ] Language: __________________________
```

---

## Appendix: Key Resources

### Standards and Specifications
- Unicode Standard: https://unicode.org
- CLDR (Common Locale Data Repository): https://cldr.unicode.org
- ICU (International Components for Unicode): https://icu.unicode.org
- ECMA-402 (Intl API): https://tc39.es/ecma402
- XLIFF 1.2: http://docs.oasis-open.org/xliff/v1.2
- XLIFF 2.0: http://docs.oasis-open.org/xliff/xliff-core/v2.0
- TMX 1.4b: http://www.gala-global.org/tmx-14b
- PO File Format: https://www.gnu.org/software/gettext/manual
- Fluent: https://projectfluent.org
- ISO 639 (Language Codes): https://www.iso.org/iso-639-language-codes
- IANA Timezone Database: https://www.iana.org/time-zones

### Tools
- Crowdin: https://crowdin.com
- Weblate: https://weblate.org
- Transifex: https://transifex.com
- Lokalise: https://lokalise.com
- POEditor: https://poeditor.com
- Babel (Python): https://babel.pocoo.org
- i18next: https://www.i18next.com
- FormatJS (react-intl): https://formatjs.io
- LinguiJS: https://lingui.dev
- Vue I18n: https://vue-i18n.intlify.dev
- Angular i18n: https://angular.io/guide/i18n
- svelte-i18n: https://github.com/kaisermann/svelte-i18n
- Fluent (Rust): https://projectfluent.org
- ICU4J: https://icu.unicode.org
- GNU gettext: https://www.gnu.org/software/gettext
- PyICU: https://gitlab.pyicu.org
- translate-toolkit: https://toolkit.translatehouse.org
- date-fns: https://date-fns.org
- Lingva: https://lingva.ml
- LibreTranslate: https://libretranslate.com

### References and Further Reading
- W3C Internationalization: https://www.w3.org/International
- Unicode Common Locale Data Repository (CLDR): https://cldr.unicode.org
- ICU User Guide: https://unicode-org.github.io/icu/userguide
- Mozilla L10n Guide: https://developer.mozilla.org/en-US/docs/Mozilla/Localization
- Wordpress i18n Handbook: https://developer.wordpress.org/plugins/internationalization
- Django i18n Docs: https://docs.djangoproject.com/en/stable/topics/i18n
- React i18n Guide: https://react.i18next.com
- Android Localization: https://developer.android.com/guide/topics/resources/localization
- Apple Internationalization: https://developer.apple.com/internationalization
- GNOME Translation Project: https://wiki.gnome.org/TranslationProject
- KDE Localization: https://l10n.kde.org
- CLDR Plural Rules: https://cldr.unicode.org/index/cldr-spec/plural-rules
- BCP 47 (Language Tags): https://www.rfc-editor.org/rfc/bcp/bcp47.txt
- GNU gettext manual: https://www.gnu.org/software/gettext/manual
- W3C i18n Checker: https://validator.w3.org/i18n-checker
- IANA Language Subtag Registry: https://www.iana.org/assignments/language-subtag-registry

---

*Generated as a universal reference for OSS internationalization and localization. Last updated: May 2026.*

