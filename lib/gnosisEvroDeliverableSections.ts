import type { DeliverableSection } from './gnosisEvroDeliverableTypes';

/**
 * EVRO Capital Deployment landing — `/gnosis/evrodeployment`
 *
 * EVRO deployment copy (marketing). Original mission markdown was archived with Harness / backups.
 */

export const GNOSIS_EVRO_PAGE_MARGINALIA =
  'RaidGuild built EVRO · Elementary Complexity helped · For GnosisDAO and NOCTUA';

export const GNOSIS_EVRO_FOOTER_ATTRIBUTION_LEAD =
  'EVRO was built by RaidGuild. Elementary Complexity supported project management and this page.';

export const GNOSIS_EVRO_DELIVERABLE_SECTIONS: DeliverableSection[] = [
  // ─── §1 What this document is ───────────────────────────────────────────────
  {
    id: 'intro',
    warmth: 'cold',
    copywriterNote: 'Intro: succinct displayLine callout; body from “This page…” index list, Mar 2026.',
    layout: 'intro-about',
    eyebrow: 'Executive orientation',
    displayLine:
      'GnosisDAO inputs liquidity; Noctua runs execution. RaidGuild holds continuity; EVRO DAO steers the interestRouter stream, dynamically.',
    bodyMarkdown: `
This plan is a draft "working map" for the deployment — clear enough to argue from, light enough to read in one pass.

**What's in here (in order):**

**1) How much** — The  Stability Pool / Dex / Branche splits and why those numbers where chosen.

**2) When** — **Foundation** first, **Deepen** after an explicit checkpoint, then **post-launch** rhythm for incentives and continuation. (and a one shot version).

**3) Where** — Stability Pools across **six branches**; EVRO/Euro-e depth on **Balancer v2**; and the governance moves to redirect fees when needed.

**4) Why this shape** — Stabilty Pool depth first testing the protocol mechanics; Balancer for EVRO-EURe liquidity pair to open incentive routing options.

Let's treat this as a step for coordination: I've suggested precise numbers so nothing is fuzzy, but all can be discussed.
`.trim(),
  },

  // ─── §3.3 Methodology paragraph — only verbatim prose from the allocation section ─
  {
    id: 'allocation-logic',
    warmth: 'warm',
    copywriterNote: 'REVERTED — editorialBody = verbatim §3.3 methodology paragraph (only non-table prose in §3). eyebrow and bridgeTail marked NEEDS HUMAN INPUT in sections-plan.md.',
    layout: 'bridge-inverted',
    eyebrow: 'Decision logic',
    editorialBody: `tl:dr: A structured capital allocation plan taking into account all branches, EVRO-EURe liquidity provision, Dex Choice, Governance and incentivization consequences in 2 versions: phased and one-shot mode.`,
    bridgeTail:
      'If this document works as intended, we can move fast without ambiguity. (Sorry that it took a minute to make)',
  },

  // ─── §3.3 methodology paragraph (personal note + methodology) ─────────────
  {
    id: 'methodology-compendium',
    warmth: 'warm',
    copywriterNote: 'Former card-text band with compendium link; compendium route removed — single markdown band.',
    layout: 'markdown-full-width',
    title: 'A note from the human',
    bodyMarkdown: `**Hello Dave and Julian!** Elco here: When tasked with the creation of a plan on a topic that I knew very little about, I did what any sane human would do: I built an agentic consulting company mirroring the way I would go about it and used it to learn as much as I could about the topic. The following plan is the best of my efforts. It is the result of human-machine collaboration, but every word has been **authored**.

Methodology: Gathered documentation and contracts of all the protocols and actors involved and market facts we could verify directly (how the system works, fixed constraints, and market/execution reality). Those facts where retrieved separately from judgment calls (staging, reserve size, and rollout timing), compared options against the same risk and execution criteria, and selected the strongest overall policy. AI support helped speed up synthesis and consistency checks, but final assumptions were reviewed by humans and written in plain language so stakeholders can see what is certain, what is a decision, and what is still open.`,
  },

  // ─── §2 Core assumptions + §3 tables ────────────────────────────────────────
  {
    id: 'assumptions-modes',
    warmth: 'deep',
    copywriterNote: 'VERBATIM — v2 §2 table + §3.1–§3.3 tables.',
    layout: 'markdown-full-width',
    title: 'Core assumptions and allocation modes',
    bodyMarkdown: `
### Core assumptions

| Item                   | Value                                   | Meaning                                                                                                  |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Total capital envelope | EUR 5,000,000                           | Full treasury program size for this deployment scope                                                     |
| Branch set             | WXDAI, GNO, sDAI, wWBTC, osGNO, wstETH | All branches are, of course, taken into account in the deployment architecture                           |
| Interest routing       | 75% SP / 25% interestRouter             | Fixed in code; governance allocates only the 25% stream - But can be used for incentives via the Evro DAO |

### 3.1 Options tested

| Option | Mode                  | SP  | DEX | Reserve | Why this option exists                            |
| ------ | --------------------- | --- | --- | ------- | ------------------------------------------------- |
| A      | Staged                | 72% | 26% | 2%      | More DEX depth with checkpoint control            |
| B      | One-shot balanced     | 74% | 23% | 3%      | Simpler execution with larger buffer              |
| C      | One-shot conservative | 76% | 21% | 3%      | Higher SP and reserve if uncertainty is very high |

### 3.2 Active policy

| Mode                         | SP  | DEX | Reserve | Amounts (EUR)                   |
| ---------------------------- | --- | --- | ------- | ------------------------------- |
| **Default (active): staged** | 72% | 26% | 2%      | 3,600,000 / 1,300,000 / 100,000 |
| **Fallback: one-shot**       | 74% | 23% | 3%      | 3,700,000 / 1,150,000 / 150,000 |

### 3.3 Why split changes by mode
`.trim(),
    containedSheet: true,
    appendCardGrid: [
      {
        question: 'Why reserve differs?',
        stagedAnswer:
          'A checkpoint between phases means the reserve only needs to cover the Foundation window blast radius. Overcommitment risk is bounded — you validate before you deepen.',
        oneshotAnswer:
          'Without a checkpoint, the full deployment is live from day one. The reserve must absorb a full-deployment shock on its own, which is why the buffer is sized larger.',
      },
      {
        question: 'Why DEX differs?',
        stagedAnswer:
          'Once Foundation validates pool behavior, more capital can be committed to DEX depth in Deepen. The checkpoint unlocks deeper liquidity without blind risk.',
        oneshotAnswer:
          'DEX is sized more conservatively because there\'s no checkpoint to catch a routing failure mid-flight. The trim preserves margin against early pool underperformance.',
      },
      {
        question: 'Operational burden?',
        stagedAnswer:
          'More checkpoints, more coordination calls, more recommit actions. The ceremony is intentional — it\'s what limits the blast radius. But it costs attention and time.',
        oneshotAnswer:
          'Fewer meetings, fewer decisions mid-flight. Execute once, monitor, and act only if triggers fire. Lower overhead, higher trust in the preparation.',
      },
      {
        question: 'Main tradeoff?',
        stagedAnswer:
          'Higher process overhead — but if assumptions are wrong, damage is contained at each gate. You catch mistakes before they compound into a full-capital event.',
        oneshotAnswer:
          'Lower process overhead — but if assumptions are wrong, the full deployment is already live. Speed and simplicity at the cost of mid-flight intervention room.',
      },
    ],
  },

  // ─── §4 Position map ────────────────────────────────────────────────────────
  {
    id: 'position-map',
    warmth: 'deep',
    copywriterNote:
      'Unified §4.1 grid: full EUR 5M by position (staged vs one-shot); §4.2 guardrails; §4.3 reserve usage policy.',
    layout: 'markdown-full-width',
    title: 'Position map',
    bodyMarkdown: `
### 4.1 Full deployment by position (EUR 5,000,000)

The table below is the **full capital envelope** by line item. **Staged default** (72% / 26% / 2%) and **one-shot fallback** (74% / 23% / 3%) match canonical policy in §3; SP branch one-shot targets scale the same within-SP weights from EUR 3.6M to EUR 3.7M (× 3.7 / 3.6).

| Position             | Lane     | Staged target | One-shot target | SP share | % of 5M (staged) | % of 5M (one-shot) | Notes                                                                                                                                 |
| -------------------- | -------- | ------------- | --------------- | -------- | ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| \`SP-WXDAI\`          | SP       | EUR 900,000   | EUR 925,000     | 25%      | 18.0%            | 18.5%              | Native stable anchor and lowest-volatility reliability lane                                                                           |
| \`SP-sDAI\`           | SP       | EUR 720,000   | EUR 740,000     | 20%      | 14.4%            | 14.8%              | Stable/yield lane for steady utilization                                                                                              |
| \`SP-GNO\`            | SP       | EUR 630,000   | EUR 647,500     | 17.5%    | 12.6%            | 12.95%             | Ecosystem-relevant collateral with moderated volatility exposure                                                                        |
| \`SP-wstETH\`         | SP       | EUR 540,000   | EUR 555,000     | 15%      | 10.8%            | 11.1%              | High-liquidity diversification beyond Gnosis-native assets                                                                            |
| \`SP-wWBTC\`          | SP       | EUR 450,000   | EUR 462,500     | 12.5%    | 9.0%             | 9.25%              | Non-ETH beta diversification at controlled initial weight                                                                             |
| \`SP-osGNO\`          | SP       | EUR 360,000   | EUR 370,000     | 10%      | 7.2%             | 7.4%               | Ecosystem-aligned staked exposure with correlation control                                                                            |
| \`DEX-EVRO-EURe-CSP\` | DEX      | EUR 1,300,000 | EUR 1,150,000   | —        | 26.0%            | 23.0%              | Primary EVRO <-> Euro-e liquidity venue — in staged mode: EUR 0.8M in Foundation, then EUR 0.5M in Deepen after checkpoint           |
| \`OPS-RESERVE\`       | Reserve  | EUR 100,000   | EUR 150,000     | —        | 2.0%             | 3.0%               | Controlled execution buffer — not a yield lane; release only with rationale, expected effect, replenishment plan                      |
| **Total**            | —        | **EUR 5,000,000** | **EUR 5,000,000** | —    | **100%**         | **100%**           | —                                                                                                                                     |

### 4.2 Branch guardrails

| Guardrail                   | Rule                                                    |
| --------------------------- | ------------------------------------------------------- |
| Single-branch concentration | No branch above 30% of SP total in first 30 days        |
| Correlated GNO exposure     | \`GNO + osGNO\` not above 35% without explicit sign-off   |
| Rebalancing discipline      | Rebalance at scheduled checkpoints or incident triggers |

### 4.3 Reserve usage policy

| Allowed uses                                                                          | Not allowed uses                                                                   |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Emergency rebalance, slippage defense, bridge/timing mismatch, incident stabilization | Discretionary side bets, permanent yield allocation, undocumented ad hoc spending  |
`.trim(),
    containedSheet: true,
  },

  // ─── §5 DEX venue decision ──────────────────────────────────────────────────
  {
    id: 'dex-venue',
    warmth: 'deep',
    copywriterNote: 'VERBATIM — v2 §5 tables + §5.3 conclusion as lead.',
    layout: 'markdown-band',
    eyebrow: 'DEX venue',
    title: 'Balancer v2 vs Curve',
    titlePresentation: { kind: 'syne-calibrated' },
    lead: 'Balancer v2 is the chosen DEX venue because it combines stable-pair fit with better composability and a clearer incentive/governance path for EVRO on Gnosis. This is not a "Curve is bad" claim. It is a "Balancer is better for this mission setup" decision.',
    bodyFullWidthBelow: true,
    bodyMarkdown: `
### 5.1 What matters for this mission

| Decision factor            | Why it matters for EVRO deployment                 |
| -------------------------- | -------------------------------------------------- |
| Pool math fit              | EVRO and EURe are same-currency euro stable assets |
| Composability              | Need routing depth beyond one isolated pair        |
| Incentive path             | Need realistic gauge and vote-routing strategy     |
| Gnosis deployment quality  | Must run on confirmed infra, not assumptions       |
| Governance/onboarding path | Need a practical path to gauge listing             |

### 5.2 Side-by-side comparison

| Factor                           | Balancer v2                                            | Curve                                              | Practical conclusion                                  |
| -------------------------------- | ------------------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------- |
| Stable pair fit                  | Composable Stable Pool (stable-swap style math)        | StableSwap pool                                    | Both fit stable pairs                                 |
| Composability                    | Nestable BPT enables broader routing design            | Less composable structure for this pattern         | Balancer advantage                                    |
| Gnosis deployment/infrastructure | Confirmed Vault/factory/gauge stack                    | Available but less integrated in this mission path | Balancer advantage                                    |
| Incentive routing                | veBAL + gauges + Aura/bribe markets, documented path   | veCRV/Convex ecosystem path                        | Both possible, Balancer path clearer for this mission |
| Partner onboarding               | Documented onboarding path                             | Less structured onboarding path in this workflow   | Balancer advantage                                    |
| BIP19-style upside               | Potential fee-to-bribe reinforcement path if qualified | No direct equivalent in this framing               | Balancer advantage                                    |
`.trim(),
    containedSheet: true,
  },

  // ─── §6 Deployment plans ──────────────────────────────────────────────────────
  {
    id: 'deployment-plans',
    warmth: 'deep',
    copywriterNote: '§6.1 staged table: If gate fails column suppressed; row 2 gate + row 3 labels edited per stakeholder. §6.2 prose + table verbatim. §7 stage gate removed.',
    layout: 'markdown-full-width',
    title: 'Deployment plans by mode',
    bodyMarkdown: `
### 6.1 Staged mode plan (default)

| Phase                  | Window        | Capital actions                                                      | Gate condition                                                       |
| ---------------------- | ------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Foundation             | Days 1-10     | SP: EUR 2.8M across 6 branches; DEX: EUR 0.8M; reserve untouched    | Branch coverage >=4, acceptable pool behavior, no critical incidents |
| Deepen                 | Days 11-21    | Add SP: EUR 0.8M (to 3.6M total); add DEX: EUR 0.5M (to 1.3M total) | Protocol is stable, safe to launch.                                  |
| Post-launch            | Cyclic (TBD)  | Re-evaluate incentive weighting / consider governance incentives      | Growth must outweigh the incentive cost.                             |

### 6.2 One-shot mode plan ("I'm feeling lucky")

One-shot mode is in this plan because staged deployment, while safer, can be a real pain in the ass operationally: more checkpoints, more coordination calls, and more chances to lose momentum in process overhead. One-shot is the lower-ceremony option when we trust the preparation and need to execute in one clean window. We choose it when team bandwidth is constrained, governance timing windows are tight, or the coordination burden is more costly than the value of mid-flight checkpoints. It is not the default, because if assumptions are wrong the blast radius is larger, but it is a valid mode when speed, simplicity, and execution certainty are the priority. Up to Dave.

| Item                    | Policy                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Execution window        | Target 48-72h band                                                                                                              |
| Capital action          | Deploy full SP and DEX targets for selected one-shot split                                                                      |
| Reserve behavior        | Keep untouched unless trigger conditions occur                                                                                  |
| Post-window (days 3-10) | Monitoring and incident handling only; no additional deployment actions                                                         |
| Use one-shot only when  | Team bandwidth is constrained, governance windows are tight, or lower process overhead is preferred over checkpoint flexibility |
`.trim(),
    containedSheet: true,
  },

  // ─── §8 Soft launch cohort ──────────────────────────────────────────────────
  {
    id: 'soft-launch',
    warmth: 'deep',
    copywriterNote: 'VERBATIM §8 opening sentence. 8.1+8.2 absorbed into lead prose (non-prescriptive). 8.3+8.4 remain as sheets.',
    layout: 'markdown-band',
    eyebrow: 'Validation layer',
    title: 'Soft launch cohort policy (suggestion)',
    titlePresentation: { kind: 'syne-calibrated' },
    lead: `Without invited users, you can validate mechanics but not real user behavior. **The soft launch cohort closes this gap before broad awareness.**

Aim for a group that covers the main behavioral lanes — operators who can stress-test execution readiness, LP-oriented participants who'll probe depth and liquidity behavior, and borrower or swap-route testers who exercise the user-facing mechanics.

Somewhere between ten and twenty participants gives enough signal diversity without turning coordination into a project in itself; a leaner group still covers the essentials if participation is constrained.

**Composition matters more than headcount.**

The suggested distribution roughly mirrors the validation priorities: a few operators, a larger LP cluster, and a handful of borrower and swap testers.`,
    bodyMarkdown: `
### 8.1 Invite profile and validation target

| Stakeholder type              | Why invite                          | What they validate                  |
| ----------------------------- | ----------------------------------- | ----------------------------------- |
| Treasury-aligned LPs          | Practical liquidity feedback        | Depth quality under live conditions |
| DeFi-native borrowers         | Collateral/debt behavior experience | Trove usability and branch behavior |
| Market makers/active swappers | Fast execution quality feedback     | Slippage, routing, market function  |
| Ecosystem operators           | Know Gnosis operations context      | Monitoring and escalation readiness |

### 8.2 Expected contribution

| Expected action                                    | Purpose                               |
| -------------------------------------------------- | ------------------------------------- |
| Execute real transactions in defined windows       | Validate actual system behavior       |
| Follow simple scripts (borrow/swap/deposit/unwind) | Standardize comparable results        |
| Report friction quickly                            | Surface operational bottlenecks early |
| Respect risk caps and test-size limits             | Keep launch validation controlled     |
`.trim(),
    containedSheet: true,
  },

  // ─── §9 Timing logic and hypotheses ─────────────────────────────────────────
  {
    id: 'timing',
    warmth: 'deep',
    copywriterNote: '§9 headings: Foundation / Deepen (not Stage A/B). Failure mode rows removed; 9.3 removed. 10-day commentary + Launch conclusion after tables.',
    layout: 'markdown-full-width',
    title: 'Timing logic and hypotheses (what each phase tests)',
    bodyMarkdown: `
### 9.1 Foundation (days 1-10)

| Item            | Summary                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| Hypothesis      | Initial SP + DEX depth should produce stable first behavior without full commitment        |
| Tests           | Execution quality across branches, early routing quality, concentration/peg stress signals |
| Why this window | Long enough for signal, short enough to avoid overcommitment                               |
| Success mode    | Positions live, no critical incidents, acceptable market quality, no persistent peg stress |

### 9.2 Deepen (days 11-21)

| Item            | Summary                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| Hypothesis      | Deepening should improve quality and resilience measurably                       |
| Tests           | Depth delta effect, branch weighting quality, readiness for full target exposure |
| Why this window | Enables pre-deepen vs post-deepen comparison while preserving intervention room  |
| Success mode    | Quality improves, guardrails hold, no critical incidents post-deepen             |

Ten days is a deliberate choice: long enough to observe real market behavior across a complete cycle — including a weekend, when liquidity conditions can differ materially from weekdays. Short enough that if something is wrong, you haven't overcommitted to the observation window before you can act. **Foundation is the stretch that either justifies Deepen or stops it.** The window can be adjusted; what matters is that the gate passes explicitly, not automatically.

Everything behaving according to plan? Early users satisfied, positions live, peg stable? **→ Launch.**
`.trim(),
    containedSheet: true,
  },

  // ─── §9 Governance (markdown-band) ──────────────────────────────────────────
  {
    id: 'governance-summary',
    warmth: 'deep',
    copywriterNote: 'Early liquidity incentives — prose reworked for messaging-human voice (Mar 2026). §11 removed.',
    layout: 'markdown-band',
    eyebrow: 'Governance',
    title: 'Early liquidity incentives',
    titlePresentation: { kind: 'syne-calibrated' },
    lead: `Launch is also when the 25% interestRouter stream starts to matter for how depth gets funded over time. On Balancer, sustained depth runs through gauge listing and the vote economy—where EVRO DAO can eventually point that quarter of borrowing interest. A few governance and coordination moves should line up before and right after go-live: light scaffolding so incentive routing stays legible, owned, and adjustable as the pool and branches prove themselves out.`,
    bodyMarkdown: `
**Know who decides before Foundation starts.**

We (Noctua, RaidGuild, GnosisDAO, and EVRO DAO) do not need a thick playbook — But we do need a shared map of who can commit what, and where execution sits. At Launch, RaidGuild will control 30% and Gnosis, 15% of Governance Power. The remaining 55% are for the DAO to manage - the token, named "RETVRN" hints at the mandate of the DAO: To manage the **interestRouter**

**Post Launch reality for a competitive protocol:**

The numbers in this memo attempt to define the deployment we actually execute with and their rationale. But that's just the beginning. This section is a draft of the governance consequences and how we might help the protocol deepen accrued TVL and volume over time. Balancer was chosen in part because it would couple our pool design with a mature, well-documented emission governance layer (veBAL → gauges), which is a credible long-term liquidity story and here we leverage personal relations already built with Balancer operators. (Our team does not currently have the same access on Curve)

**How the Balancer incentive lane would plug in:**

- **75%** of borrowing interest → **Stability Pool** (immutable in code).
- **25%** → \`**interestRouter**\` → **EVRO DAO** (Moloch v3 / Baal on DAOhaus). Governance **proposes and passes** initiatives that spend this stream—including LP incentive direction.
- Stewardship of the split and the 25% is ongoing DAO work. Early Foundation phases might emphasize direct LP-facing uses of available incentive budget (e.g. how the 25% is deployed, day one). Longer term implies locks, vote-directed liquidity (veBAL / vlAURA), RETVRN utility design, ecosystem partnerships, and treasury participation on Balancer and Aura with bribes (e.g. Hidden Hand / Redacted) where it improves emissions efficiency.
`.trim(),
    containedSheet: false,
  },

  // ─── §10 Shared stewardship (full-width closer) ───────────────────────────
  {
    id: 'shared-stewardship',
    warmth: 'deep',
    copywriterNote: 'RETVRN / interestRouter closer; replaces open-items Mar 2026.',
    layout: 'markdown-full-width',
    title: 'Our Shared Stewardship',
    bodyMarkdown: `
If the euro stable works and attracts TVL, the protocol earns in the obvious ways. Interest, though, is not the whole opportunity (it's the floor). The larger upside for everyone who carries this past launch is RETVRN: how it captures growth, how value accrues in a way holders and contributors can reason about (treasury, locks, fee surfaces, emissions disciplines), and how it stays aligned with usage on Gnosis. The name is a hint at the mandate: stewardship of the interestRouter stream and the decisions that turn a live pool into sustained depth and durable protocol equity.

But the people who lead partnerships, risk, integration, and the unglamorous work of governance, pitching, tokenomics design need to be considered on the next step of our plan for a post launch reality. The 25% is one lever; but RETVRN design and incentives are how we reward the cohort that builds for the long game, not only the quarter where the "peg held".

That is a battle for another day... what y'all think of this deployment plan?
`.trim(),
    containedSheet: false,
    bookingFabAfterBody: 'feedback',
  },
];
