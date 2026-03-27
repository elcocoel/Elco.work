/**
 * V2 case study content — copy overlay on generated content.
 * Imports PARSED_CASE_STUDIES for images, files, highlights, frameworkCells.
 * Overrides text fields with v2 copy per Messaging Master.
 * Note: metadata.year is canonical in caseStudiesv3; getCaseStudyContentV3 injects it.
 */

import type { CaseStudyContent } from './caseStudyContent';
import { PARSED_CASE_STUDIES } from './caseStudyContent.generated';

interface CopyOverride {
  title?: string;
  subtitle?: string;
  heroEyebrow?: string;
  metadata?: Partial<CaseStudyContent['metadata']>;
  context?: string;
  alignment?: { heading: string; content: string };
  meaning?: { heading: string; content: string };
  embodiment?: { heading: string; content: string };
  outcome?: string;
  artifacts?: string[];
}

const V2_COPY: Record<string, CopyOverride> = {
  'dao-canvas': {
    title: 'DAO Canvas',
    subtitle: 'A governance design framework, funded through on-chain DAO governance, that became widely adopted across the Ethereum ecosystem.',
    heroEyebrow: 'Governance Framework',
    metadata: {
      role: 'Framework design, governance workshops, website design',
    },
    context:
      'Before DAOs had design frameworks, teams building decentralized organizations had no shared language for governance design. Elementary Complexity proposed the DAO Canvas — a governance design tool — to the Genesis DAO through on-chain governance. The proposal was funded by the DAO, and the framework was developed and deployed in workshops across major Ethereum conferences.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The DAO Canvas structured collaborative governance design. Teams used it to align around shared decisions about mechanisms, incentives, roles, and processes. Elementary Complexity facilitated workshops where participants designed institutional systems together — turning abstract governance questions into tangible design choices.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Inspired by the Business Model Canvas, the DAO Canvas translated governance design into a visual conceptual framework. It organized DAO architecture into legible components — governance, incentives, roles, resources, processes — giving teams a shared language for institutional design.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity designed the original DAO Canvas framework, a large-format visual canvas for governance workshops, a dedicated website, and structured workshop formats deployed at Devcon, Consensus, EthDenver, and DAOfest events globally. DAOstack later released a second version with cosmetic refinements while maintaining the same conceptual framework.',
    },
    outcome:
      'The DAO Canvas became widely adopted across the Ethereum ecosystem and inspired multiple derivative versions — including community-created Figma implementations and adaptations by other governance practitioners. A governance design framework, funded through on-chain DAO governance, that proved the studio\'s core approach: identify a coordination gap, design a framework, materialize it as a tool.',
    artifacts: [
      'DAO Canvas framework',
      'Governance workshop format',
      'DAO Canvas website',
      'Governance design materials',
    ],
  },

  'the-daoist': {
    title: 'The DAOist',
    subtitle: 'A multi-city governance conference series that became the early intellectual and cultural home of the DAO ecosystem.',
    heroEyebrow: 'Governance Conference Series',
    metadata: {
      role: 'Founded, conceived, designed events, coordinated ecosystem',
    },
    context:
      'As DAOs emerged across Ethereum, there was no shared forum where builders, researchers, and operators could gather to discuss governance design and institutional experimentation. Elementary Complexity created The DAOist as a platform for the emerging DAO community — a place to explore governance systems, share knowledge, and build relationships across projects.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The DAOist brought together DAO builders and researchers across seven cities. These gatherings created coordination points for the ecosystem — from Berlin to Bogotá — where contributors discussed governance models, coordination challenges, and institutional design. The MetaHub in Lisbon served as a dedicated space for governance research and ongoing community collaboration.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Beyond organizing events, The DAOist defined the intellectual discourse of DAO practitioners. Through talks, discussions, and published materials, the project explored governance experimentation, coordination systems, and the cultural identity of the emerging \'DAOist\' community. These conversations framed DAOs not only as technical systems but as emerging social institutions.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity produced multi-city governance conferences, recorded talks and panels, event aftermovies, the MetaHub governance research space in Lisbon, and written materials exploring DAO governance and institutional experimentation.',
    },
    outcome:
      'The DAOist became the early intellectual and cultural home of the DAO ecosystem — a multi-city governance conference series that brought together contributors from major projects and produced the conversations that shaped how the community thought about institutional design.',
    artifacts: [
      'DAOist conferences (7 cities)',
      'Recorded talks and panels',
      'Event aftermovies',
      'MetaHub research space (Lisbon)',
    ],
  },

  'raidguild': {
    title: 'RaidGuild',
    subtitle: 'Narrative infrastructure, cultural systems, and ongoing facilitation for one of Web3\'s longest-running service DAOs.',
    heroEyebrow: 'Service DAO',
    metadata: {
      role: 'Narrative design, cultural production, facilitation, strategic positioning',
    },
    context:
      'RaidGuild is one of Web3\'s longest-running service DAOs — a decentralized collective of developers, designers, and strategists. As the guild grew, maintaining narrative coherence, internal alignment, and a recognizable cultural identity became the core coordination challenge.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'Elementary Complexity facilitated weekly community calls, guided the guild\'s strategic positioning, and helped maintain alignment among contributors. This ongoing coordination work supported RaidGuild\'s evolution from a loose collective into an organization with a legible identity and sustainable operating culture.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Elementary Complexity built the narrative infrastructure for RaidGuild: a pitch deck defining the guild\'s story and value proposition, BardSchool — a content framework helping members produce narrative content — and the monthly \'The Raid is On\' newsletter documenting guild activity and culture.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'The guild\'s identity was embodied through a range of artifacts: the \'The Raid is On\' video, visual assets, media production, and the ongoing cultural language that gives RaidGuild its distinctive character.',
    },
    outcome:
      'Narrative infrastructure, cultural systems, and ongoing facilitation for one of Web3\'s longest-running service DAOs. The combination strengthened internal culture, clarified external communication, and gave the guild a coherent identity that reflects the quality of the work.',
    artifacts: [
      'RaidGuild pitch deck',
      '\'The Raid is On\' video',
      'BardSchool content framework',
      'Monthly \'The Raid is On\' newsletter',
      'Visual assets and guild media',
    ],
  },

  'endgame-summit': {
    title: 'Endgame Summit',
    subtitle: 'The first developer conference for the Bittensor ecosystem, conceived and directed to create a gathering point for an emerging network.',
    heroEyebrow: 'Ecosystem Conference',
    metadata: {
      role: 'Conference concept, design direction, ecosystem coordination, brand direction',
    },
    context:
      'By 2025, the Bittensor ecosystem was growing rapidly but lacked a dedicated gathering for developers and builders. Elementary Complexity conceived Endgame Summit as the first conference focused specifically on the emerging Bittensor developer community — creating a coordination point where none existed.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'Endgame Summit brought together developers, researchers, and builders from across the Bittensor ecosystem. The event created a coordination point for an emerging network — a place to meet, exchange ideas, and explore collaboration.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'The conference was framed around decentralized intelligence and the emerging culture of the Bittensor network. The \'Endgame\' concept positioned the gathering as a milestone — defining a shared narrative for a developer community that had been building in parallel without a common forum.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity conceptualized the conference and directed the overall brand identity, while execution was carried out with the agency Giga. Artifacts included the conference brand, website, event visuals, and the physical gathering itself.',
    },
    outcome:
      'The first developer conference for the Bittensor ecosystem — conceived and directed to create a gathering point for an emerging network. Endgame Summit demonstrated that creating institutions where none exist is itself a coordination intervention.',
    artifacts: [
      'Endgame Summit conference',
      'Conference brand and visuals',
      'Event website',
      'Talks and presentations',
    ],
  },

  'korbon-visual-identity': {
    title: 'Korbon',
    subtitle: 'A complete visual identity and brand system for a decentralized AI research collective within the Bittensor ecosystem.',
    heroEyebrow: 'Visual Identity',
    metadata: {
      role: 'Brand strategy, visual identity, website design',
    },
    context:
      'Korbon is a decentralized AI research collective within the Bittensor ecosystem. As the team prepared to present their work publicly, they needed a visual identity and brand language that could communicate both their technical seriousness and their vision for decentralized intelligence.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The project required close coordination between the Korbon team and Elementary Complexity to establish a clear identity — one that would serve as a foundation for how the team presents itself to partners, developers, and the wider AI ecosystem.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Elementary Complexity translated ideas about decentralized intelligence and networked computation into a coherent visual and conceptual language. The resulting identity positioned Korbon as technically serious and visually distinctive within the emerging decentralized AI landscape.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'The project produced a complete brand system: logo design, visual identity guidelines, website design, and conceptual visual explorations. These artifacts established the visual language through which Korbon communicates its work.',
    },
    outcome:
      'A complete visual identity and brand system for a decentralized AI research collective. The identity gave Korbon a cohesive public presence and a visual language that matches the seriousness of the work.',
    artifacts: [
      'Logo and symbol system',
      'Visual identity guidelines',
      'Website design',
      'Brand exploration visuals',
    ],
  },

  'nerite-launch-video': {
    title: 'Nerite',
    subtitle: 'A launch video that translated a stablecoin protocol\'s economic logic into a cinematic narrative, supporting a multi-million dollar TVL at launch.',
    heroEyebrow: 'Launch Narrative',
    metadata: {
      role: 'Script, visual direction, editing',
    },
    context:
      'Nerite is a stablecoin protocol built on Liquity-style mechanics for decentralized finance. As the protocol prepared for launch, the team needed a communication artifact that could introduce the system\'s purpose and economic logic to potential users — clearly and cinematically.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'Elementary Complexity coordinated with the protocol team to define the narrative approach — translating complex DeFi mechanics into a story that could reach beyond the technical audience.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'The launch video translated the protocol\'s economic logic into a cinematic narrative. Rather than explaining features, the communication approach told the story of why the protocol exists and what it makes possible.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity wrote the script, directed the visual narrative, and edited the final video. The launch trailer became the primary artifact introducing Nerite to the ecosystem.',
    },
    outcome:
      'A launch video that translated a stablecoin protocol\'s economic logic into a cinematic narrative, supporting a multi-million dollar TVL at launch. The most data-backed case study in the portfolio.',
    artifacts: [
      'Launch trailer',
      'Script',
      'Visual narrative direction',
    ],
  },

  'blood-of-moloch': {
    title: 'Blood of Moloch',
    subtitle: 'A beer can illustration that turned a coordination-theory meme into a drinkable, shareable artifact of DAO culture.',
    heroEyebrow: 'Cultural Artifact',
    metadata: {
      role: 'Illustration, label design',
    },
    context:
      'Blood of Moloch was a beer brewed collaboratively by the RaidGuild ecosystem under the RaidBrood project. The beer embodied the community\'s cultural mythology around \'fighting Moloch\' — a coordination-theory concept describing how groups fail to cooperate despite shared interests.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The RaidGuild community coordinated the creation of the beer as a cultural experiment in decentralized collaboration — from brewing to branding to distribution.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'The project translated \'fighting Moloch\' — a recurring theme in coordination theory and DAO culture — from an abstract concept into a playful, shareable artifact.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity created the illustration and label design for Blood of Moloch. The artwork turned a coordination-theory meme into a visual identity for the beer — a tangible cultural artifact that people could hold, drink, and share.',
    },
    outcome:
      'A beer can illustration that turned a coordination-theory meme into a drinkable, shareable artifact of DAO culture. The playful edge of the portfolio — proof that cultural production includes everyday objects, and that the studio designs beer cans with the same precision as governance frameworks.',
    artifacts: [
      'Beer can illustration',
      'Label design',
      'Packaging visuals',
    ],
  },

  'chutes-merch': {
    title: 'Chutes',
    subtitle: 'Community merchandise designs that turned a decentralized AI project\'s identity into physical cultural artifacts.',
    heroEyebrow: 'Cultural Production',
    metadata: {
      role: 'Illustration, merchandise design',
    },
    context:
      'Chutes.ai emerged within the decentralized AI ecosystem around Bittensor Subnet 64. The project needed visual artifacts that could represent the community in physical contexts — events, meetups, and internal team culture.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The Korbon team, working with Chutes.ai, sought artifacts that could express the culture of the emerging AI subnet community and give contributors something to rally around.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Elementary Complexity translated the project\'s identity into playful and recognizable visual motifs — designs that could be worn and shared by contributors and supporters.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity created a series of merchandise designs: shirts, hats, tote bags, and hoodies. These designs turned the project\'s digital identity into physical cultural artifacts that circulate within the community.',
    },
    outcome:
      'Community merchandise that turned a decentralized AI project\'s identity into physical cultural artifacts. Embodiment in its most tangible form — proof that institutional identity lives in everyday objects.',
    artifacts: [
      'Shirt designs',
      'Hat embroidery designs',
      'Tote bag graphics',
      'Hoodie designs',
    ],
  },

  'one-shared-truth': {
    title: 'One Shared Truth',
    subtitle: 'Conference strategy, brand design, and sponsorship architecture for a gathering on long-horizon capital and institutional innovation, hosted with Fordham University.',
    heroEyebrow: 'Institutional Conference',
    metadata: {
      role: 'Brand design, pricing strategy, sponsorship architecture, website',
    },
    context:
      'One Shared Truth is a conference exploring long-horizon capital, governance, and institutional innovation. Hosted in collaboration with Fordham University\'s Gabelli School of Business, the event required a clear narrative, pricing structure, and sponsorship model to bridge traditional institutional thinking with emergent governance models.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'The project required coordinating multiple stakeholders — academic partners, sponsors, speakers, and participants. Elementary Complexity designed the pricing model and sponsorship structure to align institutional partners around the conference\'s goals.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Elementary Complexity positioned One Shared Truth as a forum for governance, institutional design, and long-term stewardship. The communication architecture clarified the event\'s intellectual focus and its relevance to institutional actors navigating the intersection of traditional and emergent models.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'The strategy and narrative were embodied through the conference brand, sponsorship pitch deck, pricing and sponsorship model, and official website. These artifacts communicated the vision and provided the tools to recruit sponsors and participants.',
    },
    outcome:
      'Conference strategy, brand design, and sponsorship architecture for a gathering on long-horizon capital and institutional innovation, hosted with Fordham University. The project that demonstrates the studio\'s bridge position — DAO governance credibility meets institutional engagement.',
    artifacts: [
      'Conference brand identity',
      'Sponsorship pitch deck',
      'Pricing and sponsorship model',
      'Conference website',
    ],
  },

  'bonkbot': {
    title: 'Bonkbot',
    subtitle: 'Narrative design and high-concept launch media for a Solana trading terminal, turning a product launch into a cinematic story.',
    heroEyebrow: 'Product Narrative',
    metadata: {
      role: 'Narrative design, scriptwriting, storyboarding, creative direction',
    },
    context:
      'Bonkbot was preparing to launch a trading terminal within the Solana ecosystem. The team needed a compelling narrative and media artifacts to introduce the product and differentiate it in a crowded landscape of crypto trading tools.',
    alignment: {
      heading: 'Coordination Systems',
      content:
        'Elementary Complexity collaborated with the communications agency Giga to define the narrative direction and creative concept for the product launch.',
    },
    meaning: {
      heading: 'Communication Architectures',
      content:
        'Elementary Complexity developed a narrative universe for the product — characters, themes, and storytelling structure that could communicate Bonkbot\'s culture and technical ambition beyond a standard product announcement.',
    },
    embodiment: {
      heading: 'Cultural Artifacts',
      content:
        'Elementary Complexity wrote scripts, produced hand-drawn storyboards, and directed the narrative structure of high-concept animated launch videos produced by Giga.',
    },
    outcome:
      'Narrative design and high-concept launch media for a Solana trading terminal. The narrative and visual language shaped the early identity of the product and influenced elements of the Telemetry website — turning a product launch into a cinematic story.',
    artifacts: [
      'Launch videos',
      'Scripts',
      'Storyboards',
      'Narrative concept materials',
    ],
  },
};

function mergeContent(
  base: CaseStudyContent,
  overrides: CopyOverride,
): CaseStudyContent {
  return {
    ...base,
    ...(overrides.title && { title: overrides.title }),
    ...(overrides.subtitle && { subtitle: overrides.subtitle }),
    ...(overrides.heroEyebrow && { heroEyebrow: overrides.heroEyebrow }),
    ...(overrides.context && { context: overrides.context }),
    ...(overrides.alignment && { alignment: overrides.alignment }),
    ...(overrides.meaning && { meaning: overrides.meaning }),
    ...(overrides.embodiment && { embodiment: overrides.embodiment }),
    ...(overrides.outcome && { outcome: overrides.outcome }),
    ...(overrides.artifacts && { artifacts: overrides.artifacts }),
    metadata: {
      ...base.metadata,
      ...(overrides.metadata || {}),
    },
  };
}

export const V2_CASE_STUDY_CONTENT: CaseStudyContent[] =
  PARSED_CASE_STUDIES.map((cs) => {
    const overrides = V2_COPY[cs.slug];
    if (!overrides) return cs;
    return mergeContent(cs, overrides);
  });

const V2_MAP = Object.fromEntries(
  V2_CASE_STUDY_CONTENT.map((c) => [c.slug, c]),
);

export function getCaseStudyContentV2(
  slug: string,
): CaseStudyContent | null {
  return V2_MAP[slug] ?? null;
}

export function getCaseStudyHeroImageV2(
  slug: string,
): { url: string; alt?: string } | null {
  const content = getCaseStudyContentV2(slug);
  if (!content || !content.images?.length) return null;
  const img = content.images[content.heroImageIndex] ?? content.images[0];
  return { url: img.url, alt: img.alt };
}
