# Design DNA: Elementary Complexity

**Purpose:** Canonical visual language for this marketing site. All UI components must follow this grammar. Use when building or reviewing components, grids, cards, and layouts.

**Character:** Calm, understated, tactical-luxury. The site never shouts; it reveals on engagement.

---

## 1. Base & Ground

| Signal | Token | Purpose |
|--------|------|---------|
| Page background | `bg-gray-50` | Soft ground, no white assault |
| Body text | `text-neutral-900` | Primary content |
| Section alternation | `bg-white` / `bg-gray-50/30` | Subtle rhythm between sections |

---

## 2. Typography

**Canonical:** `tailwind.config.js` and `.cursor/rules/design-visual-language.mdc` — `font-display` = Syne; `font-accent` = Anton for narrow emphasis (e.g. manifesto verb); booking funnel uses Syne.

| Element | Pattern | Example |
|---------|---------|---------|
| Eyebrows | `font-display text-xs uppercase tracking-widest text-gray-400` | Whisper before the statement |
| Metadata labels | `font-display uppercase tracking-wide text-gray-500` | Role, Client, Year, Domain |
| Headers | `font-display text-2xl font-extrabold uppercase tracking-wide text-black` | Section titles |
| Body / descriptors | `text-gray-600` or `text-gray-700 leading-relaxed` | Content, cards |
| Links (subtle) | `font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors` | "Back to case studies" |
| Booking actions | `font-display` + **`font-medium`** + **`uppercase`** + underline bundle | "Book a discovery call" (renders all caps) |

Eyebrows use `tracking-widest`; section-style headers use `tracking-wide`. Anton (`font-accent`) is **not** `font-display` — use only for rare accent (e.g. manifesto verb).

---

## 3. Containment

Every defined area has structure. There are no floating, undefined "holes."

| Element | Pattern | Purpose |
|---------|---------|---------|
| Cards | `border border-gray-100 rounded-sm` | Delicate containment |
| Section dividers | `border-b border-gray-200` | Visual rhythm |
| Grid gutters | `gap-px bg-gray-100` (or similar) | Outcome grid style |
| Image areas | `rounded-sm border border-gray-100` | Consistent image framing |

---

## 4. Gray Scale Hierarchy

**Do not use `gray-200` for active/selected/filled states.** It reads as generic form-control gray.

| Use | Token | When |
|-----|------|------|
| Dividers | `border-gray-200` | Section boundaries |
| Empty-cell shades | `bg-gray-50`, `bg-gray-100`, `bg-gray-200` | Alternating in grids (e.g. CaseStudyOutcomeGrid) |
| Recessive labels | `text-gray-400`, `text-gray-500` | Eyebrows, metadata |
| Active / emphasis | `bg-gray-500`, `bg-gray-600` (mid-grey) or `bg-black` | Selected, filled — calmer = mid-grey |
| Defined empty | `bg-gray-100` | Empty cells, placeholders — always defined, never hole |
| Primary text | `text-black`, `text-gray-700` | Headers, content |

---

## 5. Interactive / Reveal

The site reveals on engagement. Every interactive element has a hover treatment.

| Pattern | Example |
|---------|---------|
| Link underline | Use only for **files** and **external links**. `border-b border-gray-400 hover:border-black transition-colors` |
| Nav / text | `text-gray-500 hover:text-black transition-colors` (no underline) |
| CTA accent | `border-b-2 border-black hover:border-gray-500 hover:text-gray-600 transition-colors` |
| Images | Grayscale default, color on hover (`.project-image`) |

**Always** include `transition-colors` (or `transition-[filter]` for images) and a clear hover state.

---

## 6. Component Reference

Use these as grammar sources when building new UI:

| Component | Grammar to borrow |
|-----------|-------------------|
| FrameworkGrid | `border-collapse`, `tracking-widest text-gray-400`, `border-b border-gray-200` |
| CaseStudySolutionCard | `border border-gray-100 rounded-sm`, eyebrow `text-gray-500` |
| CaseStudyOutcomeGrid | `gap-px bg-gray-100`, defined empty shades |
| Metadata section | `bg-gray-50/30`, `border-b border-gray-200`, `tracking-widest text-gray-400` |
| CaseStudyFile | `text-gray-600 hover:text-black`, `border-gray-400 group-hover:border-black` — underline for file/external links only |

---

## 7. Tooltip (site standard)

| Property | Value |
|----------|-------|
| Delay | None — shows immediately on hover |
| Animation | Opacity fade-in, 250ms, ease-out |
| Styling | `bg-[#F7F7F7]`, `border border-gray-200`, `rounded-sm`, minimal padding |
| Typography | `text-sm text-gray-600` (body text, normal case, no all-caps) |
| Layout | `whitespace-nowrap` (single line); positioned close to trigger, biased left |
| Component | `components/Tooltip.tsx` |

Use `<Tooltip content="…">` instead of `title` for any hover hint. Supports `placement` (top, bottom, left, right) and `className` on the trigger wrapper.

---

## 8. Motion Patterns

These patterns extend the core reveal behavior (Section 5). All follow the same principle: motion responds to exploration, not to page load.

| Pattern | When to use | Implementation |
|---------|-------------|----------------|
| **Stagger reveal** | Card grids, lists of 3+ items | `StaggerChildren` — `opacity-0 translate-y-4` → `opacity-100 translate-y-0`, 700ms ease-out, 55–80ms step, 100–120ms initial delay. Triggers per item entering viewport. |
| **Section fade** | Full sections, text blocks | `FadeInSection` / `Section reveal="fade"` — `opacity-0 translate-y-8` → `opacity-100 translate-y-0`, 700ms ease-out. Triggers once per section. |
| **Row-by-row reveal** | Dense tables and structured grids (e.g. FrameworkGrid) | Single `IntersectionObserver` on the container. On entry, `setTimeout` per row with 140ms between rows. Rows fade/slide in top-to-bottom, mirroring the logical flow of content. Does not re-trigger. |
| **Invitation flicker** | Information-dense grids where full content is hidden by default | While no cell is hovered: cycle a `TypewriterText` preview through random cells (~1.5s initial delay, ~2s between cycles, ~1.8s hold after completion). On hover: cancel; show full content instantly via opacity transition. On hover exit: resume loop after 800ms. Communicates depth and invites interaction without forcing discovery. |

**Invitation flicker — conceptual note:** Uses `TypewriterText` (same component as the manifesto animation) to create visual continuity between the homepage artifact and the framework grid. The homepage shows the framework *described*; the grid shows it *structured*. Same voice, different register.

---

## 9. Anti-Patterns (avoid)

- **`bg-gray-200` for active/filled** — generic, not part of site hierarchy
- **Undefined empty space** — empty cells with no background; always define (e.g. `bg-gray-100`)
- **`<img>` for icons that need `currentColor`** — use inline SVG so icon inherits text color
- **No hover on interactive elements** — every clickable/hoverable thing reveals on engage
- **Generic Tailwind defaults** — read the existing components before adding new ones

---

**Version:** 2025-03-06. Reference: `components/Tooltip.tsx`, `components/FrameworkGrid.tsx`, `CaseStudySolutionCard.tsx`, `CaseStudyOutcomeGrid.tsx`, `app/case-studies/[slug]/page.tsx` (metadata section).
