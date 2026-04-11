# Website Update Tasks — April 11, 2026

## Context
- Website repo: ~/novaryn-website/ 
- Deployed via Vercel auto-deploy on push to novaryn-systems/novaryn-website
- Main homepage: index.html (698 lines)
- AxJedi landing: axjedi/index.html (900 lines) 
- AxJedi features: axjedi/features/index.html (697 lines)
- AxJedi apply: axjedi/apply/index.html (866 lines)
- All pages are self-contained HTML with inline CSS

## Company Name
Replace ALL instances of "Novaryn ApS" with "Novaryn Systems" across ALL pages.
Keep "Novaryn" alone where it's just the brand name.

## Task 1: Fix Broken Links (main homepage index.html)

### Footer broken links (href="#")
These link to pages that don't exist yet. For now:
- Privacy → href="/privacy" 
- Security → href="/security"
- Terms → href="/terms" (in footer-bottom)
- Status → href="#" (leave as-is or remove)

### Wrong references in homepage
- Remove OpenClaw docs link (https://docs.openclaw.ai) — not relevant to Novaryn customers
- Remove GitHub OpenClaw link (https://github.com/openclaw) — not relevant
- Remove Discord community link (https://discord.gg/clawd) — this is OpenClaw's Discord, not Novaryn's
- The "Join Our Community" CTA card should be replaced with something else (maybe "See AxJedi in Action" linking to /axjedi/)
- The "Resources" footer section needs rework — remove OpenClaw/GitHub references

### AxJedi landing page (axjedi/index.html)
- /privacy → needs to exist (create page)
- /terms → needs to exist (create page)
- mailto:axjedi@novaryn.io — this is fine (keep)

## Task 2: Create Privacy Page (/privacy/index.html)

Create a proper privacy policy page. Key points to cover:

### Data Architecture — How AxJedi Handles Your Code
- **Your codebase stays on our servers.** The XPO file you provide is stored on Novaryn's dedicated infrastructure, never shared or made publicly accessible.
- **Only query-relevant snippets leave the server.** When you ask AxJedi a question, only the code context directly relevant to your query (typically a few methods/classes) is sent to the AI model. The full codebase never leaves our infrastructure.
- **We use the Anthropic API (Claude).** Anthropic's commercial API terms explicitly state:
  - API data is **NOT used for model training** — ever.
  - API data is retained for only **7 days** for safety monitoring, then deleted.
  - This is contractually guaranteed under Anthropic's Commercial Terms.
  - This is fundamentally different from using ChatGPT or Claude.ai consumer products, where your data CAN be used for training.
- **No third-party data sharing.** Your code is not shared with any third party beyond the AI API call itself.

### Perspective on Code Sensitivity
- We understand code is a business asset. Our architecture is designed to minimize exposure.
- However, we also believe in honest perspective: AX 2009 and AX 2012 codebases implement established business processes on legacy platforms. The implementation patterns are well-known. The real value lies in your people, your processes, and your domain knowledge — not in 15-year-old X++ code.
- If your business processes are so sensitive that no external party can see any part of your code under any circumstances, then a cloud-assisted tool may not be the right fit — and we'd rather be upfront about that than make promises we can't keep.
- For everyone else: AxJedi offers a vastly more secure workflow than copying code into ChatGPT, Claude.ai, or Copilot — because we control exactly what gets sent and what doesn't.

### Comparison with alternatives
- **ChatGPT/Claude.ai (consumer)**: Your full conversation is stored, potentially used for training, retained up to 5 years. You have no control over what code you paste in.
- **AxJedi**: Only query-relevant snippets sent via commercial API. 7-day retention. Never used for training. You see exactly what context is being used (Context Size indicator).

Style: match the existing dark theme design system (--bg: #0f1115, etc.)

## Task 3: Create Terms Page (/terms/index.html)

Basic terms of service. Keep it simple and professional:
- Service provided as-is during beta
- User responsible for reviewing AI suggestions before applying to production
- We don't guarantee compilation (though we verify rigorously)
- Standard limitation of liability
- Contact: hello@novaryn.io
- Company: Novaryn Systems, Denmark

Style: match existing dark theme.

## Task 4: Data Security Section on AxJedi Landing Page

Add a new section to axjedi/index.html (between the features/screenshots area and the CTA). Title: "Your Code, Your Control" or similar.

Key messages:
1. **Your codebase stays on our infrastructure** — we don't upload it anywhere. Only relevant snippets are sent for AI analysis.
2. **Commercial API = enterprise-grade privacy** — Anthropic's API does NOT train on your data. 7-day retention only. Contractually guaranteed.
3. **Better than the alternative** — When developers paste code into ChatGPT or Claude.ai, that code can be stored for years and used for training. AxJedi's architecture gives you control.
4. **Transparent context** — The Context Size indicator shows exactly how much information is being used. You always know what's happening.

## Task 5: Context Size Explanation

In the screenshot descriptions (Task 7) and/or in the data security section, explain the Context Size feature:
- Unlike ChatGPT and other AI tools, AxJedi shows you a real-time "Context Size" indicator
- This shows how much of the AI model's capacity is being used for your query
- As context grows, AI reliability can decrease — AxJedi makes this visible so you know when you're pushing limits
- This transparency is unique — most AI tools hide this completely, leaving you guessing about response quality

## Task 6: Use Cases Section

Add a section to the AxJedi landing page explaining real use cases:

1. **Knowledge Transfer** — When experienced AX developers retire or leave, decades of institutional knowledge walks out the door. AxJedi captures that knowledge in the codebase graph and makes it accessible to anyone.

2. **New Employee Onboarding** — New developers can ask AxJedi to explain unfamiliar code, understand dependencies, and learn patterns from the existing codebase — instead of bothering senior colleagues.

3. **Productivity** — Developers currently spend hours chasing ChatGPT hallucinations — code that looks right but references non-existent methods, wrong field names, or syntax from the wrong AX version. AxJedi eliminates this by verifying every identifier against your real codebase.

4. **Code Quality** — AxJedi suggests code that follows YOUR team's patterns, not generic examples. It knows how your codebase handles inventory, customers, production orders — because it's grounded in your actual implementation.

5. **Legacy System Expertise** — AX 2009/2012 specialists are increasingly rare. AxJedi preserves and amplifies that expertise, making it available on demand.

## Task 7: Screenshot Descriptions

Each screenshot on the AxJedi landing page currently has a very short caption. Expand each to 30+ words:

1. **Question interface**: "Ask your question naturally, with full code context. Paste X++ methods, form code, or describe what you need — AxJedi understands AX 2009/2012 syntax and can work with your specific codebase objects."

2. **Answer view**: "Get comprehensive, verified responses organized into approach, working code, detailed explanation, edge cases, and testing guidance. Every identifier is checked against your real codebase — no hallucinations."

3. **Code diff**: "See exactly what changed with color-coded diffs — green for additions, red for removals. Review modifications line by line before applying anything. Full method context so nothing is lost."

4. **Login**: "Secure access with individual user accounts, IP restriction, and rate limiting. Each developer gets their own session history and usage tracking."

5. **Context display**: "The Context Size indicator shows exactly how much of the AI model's capacity is being used. Unlike other AI tools, AxJedi is transparent about when queries approach the limits of reliable analysis."

6. **Graph explorer**: "Visualize your codebase as an interactive knowledge graph — 180,000+ nodes showing classes, tables, forms, and their relationships. Search any entity and see its full dependency network."

## Task 8: Crop Large Screenshots

The full screenshots (full-answer.jpg at 1.3MB, full-diff.jpg at 912KB) are very tall and take up too much screen space. Use CSS to constrain them:
- In the lightbox/expanded view, set max-height to 80vh with overflow-y: auto (scrollable)
- Or better: re-crop the actual image files to show the most relevant portion (top ~60% of the answer, top ~50% of the diff)
- Thumbnails are fine as-is

## Important Notes
- All pages use inline CSS (no external stylesheets)
- Dark theme with CSS variables
- Responsive design (mobile-first)
- Company name: "Novaryn Systems" (not "Novaryn ApS")
- Contact email: hello@novaryn.io (general) / axjedi@novaryn.io (product)
- Do NOT add any JavaScript frameworks — keep it vanilla HTML/CSS/JS
- Match existing design system exactly (colors, fonts, spacing, card styles)
