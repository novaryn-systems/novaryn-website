# AxJedi Website Spec — novaryn.io/axjedi

**Created:** 2026-04-11  
**Status:** Building  
**Purpose:** Customer-facing AxJedi landing page + feature showcase + case studies

---

## Target Audience

**Primary:** AX 2009 developers and their managers — individual devs, team leads, IT directors  
**Secondary:** Consultant houses (Columbus, Optimizers-IT, etc.) who serve AX 2009/2012 clients — partners who can save money by delivering faster  
**Tone:** Professional but not corporate-stiff. Confident. Technical credibility. Zero hype.  
**Key insight:** Old-guard AX devs fear AI replacing them. Frame AxJedi as: "makes YOU faster and more accurate" — not "replaces developers."  
For consultant houses: "deliver solutions quicker and cheaper for your clients."

---

## Site Structure

```
novaryn.io/axjedi/              → Landing page (heavy-hitter punchlines + CTA)
novaryn.io/axjedi/features/     → Feature deep-dive (each answer section, XPO export, visualizer, etc.)
novaryn.io/axjedi/cases/        → Case studies hub (5 real examples)
novaryn.io/axjedi/cases/1/      → Case study 1
novaryn.io/axjedi/cases/2-5/    → Case studies 2-5
```

All pages: static HTML + shared CSS (`axjedi/assets/style.css`), no framework, deploys to Vercel.

---

## Page 1: Landing Page (`axjedi/index.html`)

### Hero Section

**Headline:** "AI That Knows YOUR Axapta Codebase"  
**Subhead:** "AxJedi generates verified X++ code grounded in your actual classes, tables, and methods — not generic guesses."

**Pill bar:**
- Verified Code (Zero Hallucinations)
- Your Codebase, Your Rules
- Frontier AI Models (Sonnet + Opus)
- AX 2009 Ready • AX 2012 Coming Soon

### Heavy-Hitter Punchlines (card grid)

1. **"It Knows Your Code"**  
   AxJedi digests your entire XPO codebase — every class, table, method, enum, form, and relationship. When it suggests code, it references YOUR actual entities, not Stack Overflow examples from a different AX version.

2. **"Zero Hallucinations — Or Your Query Is Free"**  
   Every identifier in every code suggestion is verified against your actual codebase database (500K+ verified identifiers). If we hallucinate, the query doesn't count against your daily limit.

3. **"Five Expert Sections Per Answer"**  
   Every AxJedi response includes: Approach (strategy), Code (verified X++), Codebase Fit (how it fits YOUR system), Explanation (method-by-method breakdown), and Learning Point (design patterns and best practices).

4. **"Export to XPO, Deploy in Minutes"**  
   One click generates a properly formatted XPO file ready for direct import into AX. See exact code changes with diff view. Keep version history of all exports.

5. **"Frontier AI, Purpose-Built"**  
   Powered by Anthropic's Claude Sonnet 4 (fast track) and Claude Opus 4.6 (deep analysis). Auto-escalation: if the fast model can't verify the answer, it automatically escalates to the most powerful model available.

6. **"Made By Developers, For Developers"**
   Hundreds of hours of development went into AxJedi's verification pipeline, codebase intelligence, and agentic orchestration. This isn't a ChatGPT wrapper — it's a purpose-built system that utilizes frontier AI models at the absolute forefront of current agentic AI technology.

7. **"AxJedi vs. ChatGPT"** (comparison mini-section)  
   | | AxJedi | ChatGPT / Copilot |
   |---|---|---|
   | Knows your codebase | ✅ Every class, table, method | ❌ Generic X++ |
   | Verified identifiers | ✅ 500K+ checked | ❌ Hallucinated names |
   | AX version-aware | ✅ Your actual version | ❌ Mixes 2009/2012/D365 |
   | XPO export | ✅ One-click | ❌ Copy-paste |
   | Codebase relationships | ✅ Graph with 180K+ nodes | ❌ No context |

### CTA Section

**Headline:** "Start Your Free Beta Trial"  
**Body:** We're looking for AX 2009 developers and consultant houses to try AxJedi. Getting started takes about 24 hours:

1. We provide the XPO extraction code (simple AX job)
2. You upload your XPO to our secure portal (NDA available)
3. We ingest your codebase (typically overnight)
4. You get 14 days free with 10 queries per day

**Button:** "Apply for Beta Access" → mailto:axjedi@novaryn.io  
**Secondary:** "See It In Action" → link to /axjedi/cases/

### AX 2012 Banner

**Small banner or callout:**  
"AX 2012 support is currently in development. We're also accepting PoC applications for AX 2012 codebases. [Contact us]"

---

## Page 2: Features (`axjedi/features/index.html`)

### The Five Sections of an AxJedi Answer

For each section, show:
- What it is (description)
- Why it matters (value prop)
- Screenshot from actual UI

**Sections:**

1. **Approach** — AxJedi explains its strategy before writing code. What pattern it will use, why, and what alternatives it considered. You understand the "why" before you see the "what."

2. **Code** — Verified X++ code with syntax highlighting. Every identifier checked against your codebase database. Verification badges show pass/fail. Bounce count shows if the AI self-corrected.

3. **Codebase Fit** — How the suggested code fits into YOUR existing codebase. References your actual classes, tables, inheritance hierarchies. Shows you exactly where this code belongs.

4. **Explanation** — Method-by-method breakdown in table format. What each method does, its key logic, and why it's needed. Developer-ready documentation.

5. **Learning Point** — Design patterns and best practices extracted from the specific scenario. Helps junior devs learn faster and senior devs confirm their instincts.

### Additional Features

6. **XPO Export** — One-click export to properly formatted XPO. Auto-detection of target class/form. Diff view showing exactly what changes. Version history.

7. **Code Verification** — Real-time verification against 500K+ identifiers. Index hints checked against actual table indexes. Method signatures validated. Hallucination detection with fuzzy matching suggestions.

8. **Codebase Visualizer** — Interactive graph of your entire codebase. Search any entity, explore 1-3 hops of relationships. Color-coded connectors (incoming vs outgoing). Export subgraphs.

9. **Token Usage Display** — See exactly how much context window is used. Color-coded meter. Know how much room is left for complex questions.

10. **Session Management** — Multiple named sessions. Pin important conversations. Query history with full context. Session restore.

11. **Security** — TLS 1.3, IP allowlisting, per-user auth (bcrypt), CSRF protection, audit logging, daily query limits.

---

## Page 3: Case Studies Hub (`axjedi/cases/index.html`)

Grid of 5 case study cards, each with:
- Question (1-2 lines)
- Category tag (e.g., "Enum Extension", "COM Integration", "Architecture Analysis")
- Preview of the approach
- Link to full case study

---

## Pages 4-8: Individual Case Studies (`axjedi/cases/1-5/`)

### Selected Case Studies (from real session history)

**Case 1: "Extend the SalesType Enum"** (Jacob's query, id 479)
- Question: "Can you extend the enum 'salestype' with a new outcome 'Cba' and tell me where this would cause issues"
- Shows: Deep impact analysis, multi-file changes, codebase awareness
- Category: Architecture / Impact Analysis

**Case 2: "Call SQL Stored Procedure from X++"** (Jacob's query, id 473)  
- Question: "Want to call SQL stored procedure and get result from X++"
- Shows: Integration pattern, COM automation, error handling
- Category: Integration / External Systems

**Case 3: "Customer Discount Calculation"** (Hans's query, id 467)
- Question: "How can I, in code, see how we calculate a customer discount? What classes or forms or methods are involved?"
- Shows: Codebase exploration, dependency tracing, architecture discovery
- Category: Codebase Discovery

**Case 4: "Create Purchase Order Programmatically"** (stress test, id 344)
- Question: "How do I create a purchase order programmatically and set it up for approval workflow in PurchTable?"
- Shows: Complex business logic, workflow integration, full verified code
- Category: Business Logic / Workflows

**Case 5: "Excel COM Automation with Cleanup"** (stress test, id 346)
- Question: "How do I properly handle Excel COM automation with cleanup to prevent Excel processes from staying in memory?"
- Shows: Common pain point, proper resource cleanup, COM best practices
- Category: COM Integration / Best Practices

### Case Study Template

Each case study page shows:
1. **The Question** — What the developer asked (anonymized)
2. **The Full AxJedi Response** — All 5 sections rendered beautifully
3. **Verification Status** — Pass/fail badge, bounce count
4. **What ChatGPT Would Say** — Brief comparison showing generic vs. grounded
5. **Key Takeaway** — Why this matters for AX developers

---

## Visual Design

- Dark theme matching POC report (--bg: #0f1115, blue accents #4a9eff)
- Shared CSS in `axjedi/assets/style.css`
- Card-based layouts with hover effects
- Section labels (eyebrow text, uppercase, blue)
- Professional typography (Inter or system-ui)
- Responsive (mobile-friendly)
- Print-friendly for the case studies

---

## Screenshots Needed

1. Full query + response (all 5 sections expanded)
2. XPO export dialog with diff view
3. Verification badges (pass + fail examples)
4. Visualizer with a real graph exploration
5. Session management sidebar
6. Token usage meter
7. Rating/feedback UI
8. Login page (showing professional polish)

---

## Anonymization Rules

- Replace "Vestergaard" with "Customer" or "[Company Name]"
- Replace user emails with generic ones
- Keep all AX entity names (SalesTable, PurchTable, etc.) — those are standard AX
- Keep code content — it's generic enough and shows capability
- Replace any business-specific method names if clearly proprietary

---

## File System

```
projects/novaryn/website/
├── index.html                    (existing main site — add nav link to /axjedi/)
├── axjedi/
│   ├── index.html               (landing page)
│   ├── features/
│   │   └── index.html           (features deep-dive)
│   ├── cases/
│   │   ├── index.html           (case studies hub)
│   │   ├── 1/index.html         (SalesType enum extension)
│   │   ├── 2/index.html         (SQL stored procedure)
│   │   ├── 3/index.html         (Customer discount discovery)
│   │   ├── 4/index.html         (Purchase order creation)
│   │   └── 5/index.html         (Excel COM automation)
│   └── assets/
│       ├── style.css            (shared AxJedi design system)
│       └── screenshots/         (captured from live UI)
├── docs/
│   ├── axjedi-poc-report.html   (PRESERVED — never delete)
│   └── axjedi-e7f4c2b9a1/      (existing hidden page)
└── robots.txt
```
