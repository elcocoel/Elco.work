/**
 * Case studies for v3 — source of truth for project title and eyebrow (category).
 * Matches the screenshots: case study list, hero, and mini-grid descriptor.
 * Homepage cards use project.descriptor (short). Case study detail uses title/eyebrow from here.
 */

export const CASE_STUDIES_V3 = [
  {
    slug: 'dao-canvas',
    title: 'DAO Canvas',
    category: 'DAO Design Framework',
    descriptor: 'Framework for designing decentralized organizations',
    year: '2018',
  },
  {
    slug: 'the-daoist',
    title: 'The DAOist',
    category: 'Governance Events and Network',
    descriptor: 'Global events and research exploring decentralized governance',
    year: '2019–2023',
  },
  {
    slug: 'raidguild',
    title: 'RaidGuild',
    category: 'Development Collective',
    descriptor: 'Narrative and coordination systems for a decentralized service guild',
    year: '2021–Present',
  },
  {
    slug: 'endgame-summit',
    title: 'Endgame Summit',
    category: 'Developer Conference',
    descriptor: 'First developer conference for the Bittensor ecosystem',
    year: '2025',
  },
  {
    slug: 'korbon-visual-identity',
    title: 'Korbon',
    category: 'Brand Identity',
    descriptor: 'Brand system and identity for an AI research team',
    year: '2024',
  },
  {
    slug: 'nerite-launch-video',
    title: 'Nerite',
    category: 'Launch Video',
    descriptor: 'Launch trailer for a decentralized stablecoin protocol',
    year: '2025',
  },
  {
    slug: 'blood-of-moloch',
    title: 'Blood of Moloch',
    category: 'DAO Brewed Beer',
    descriptor: 'DAO-brewed beer — can illustration',
    year: '2022',
  },
  {
    slug: 'chutes-merch',
    title: 'Chutes',
    category: 'Storytelling and Merch',
    descriptor: 'Community merchandise for a decentralized AI project',
    year: '2026',
  },
  {
    slug: 'one-shared-truth',
    title: 'One Shared Truth',
    category: 'Conference Strategy',
    descriptor: 'Conference strategy & brand system',
    year: '2026',
  },
  {
    slug: 'bonkbot',
    title: 'Bonkbot',
    category: 'Product Positioning and Creatives',
    descriptor: 'Product narrative & launch media',
    year: '2025',
  },
] as const;


export type CaseStudySlugV3 = (typeof CASE_STUDIES_V3)[number]['slug'];
