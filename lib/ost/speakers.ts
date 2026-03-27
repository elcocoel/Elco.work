/**
 * One Shared Truth speakers. Source: live site content.
 * Speaker images: Webflow CDN URLs from onesharedtruth.webflow.io (March 2026).
 */
const SPEAKER_CDN =
  'https://cdn.prod.website-files.com/698b6c7f569de513e1b6c593';

export type Speaker = {
  name: string;
  title: string;
  org: string;
  bio?: string;
  image?: string;
  featured?: boolean;
};

export const speakers: Speaker[] = [
  {
    name: 'John Divine',
    title: 'Head of Digital Asset OTC Trading',
    org: 'BlockFills',
    bio: 'John James Divine is a crypto author, speaker, and market maker specializing in derivatives, structured products, and digital asset execution. With 20,000+ hours of trading experience and $10B+ in notional volume, he has traded at CME and ICE and worked with institutional crypto participants. He is the author of three books on Bitcoin, statistical arbitrage, and futures markets.',
    image: `${SPEAKER_CDN}/698dd59a96e58a4ac7019b26_John%20divine.jpg`,
    featured: true,
  },
  {
    name: 'Kelly Ye',
    title: 'Deputy CIO',
    org: 'Avenir Group',
    bio: 'Kelly Ye is Deputy CIO of Avenir Group, leading multi-strategy digital asset investing and research, and Portfolio Manager and Head of Research at Decentral Park Capital. Previously, she held senior roles at Fidelity Digital Assets and CoinDesk Indices, and spent 15+ years in traditional finance at firms including Goldman Sachs and BNP Paribas. Ye holds degrees from Peking University and MIT and is a CFA charterholder.',
    image: `${SPEAKER_CDN}/698dd7925ec8eaaad45c26c1_Kelly%20Ye.jpg`,
    featured: true,
  },
  {
    name: 'Markus Veith',
    title: 'Partner',
    org: 'Grant Thornton LLP',
    bio: 'Markus is a Partner at Grant Thornton LLP and Principal at Grant Thornton Advisors LLC. He leads the National Digital Assets, Blockchain & web3 Industry and the Northeast Financial Institutions Practice. He has over 25 years of experience in banking and public accounting, and holds an M.B.A., a Dipl. Betriebswirt, and a C.P.A. credential.',
    image: `${SPEAKER_CDN}/69999972ab1d6f06a7336b36_marcus.jpg`,
    featured: true,
  },
  {
    name: 'Austin Campbell',
    title: 'Managing Partner & Founder',
    org: 'Zero Knowledge Group',
    bio: 'Austin Campbell has spent 20 years managing complex financial instruments. At Paxos, he served as Chief Risk Officer and Head of Portfolio Management, overseeing $22B+ in stablecoins under NYDFS regulation with no depegs. Previously, he led digital asset rates trading at Citi and pioneered early U.S. Bitcoin lending strategies at Stone Ridge.',
    image: `${SPEAKER_CDN}/698dd47bc52049c9c529a87c_Austin%20Campbell.jpg`,
  },
  {
    name: 'Michael Hiles',
    title: 'Co-Founder',
    org: 'Conduit Network & Commercium Bank',
    image: `${SPEAKER_CDN}/698dd5c00578b8060318544d_Michael%20Hiles.jpg`,
  },
  {
    name: 'Jim Hwang',
    title: 'Co-Founder and Chief Operating Officer',
    org: 'Firinne Capital',
    bio: 'Jim Hwang is an institutional investor specializing in quantitative strategies and total portfolio design, with experience at CPP Investments, Bosera Asset Management, and Barclays Global Investors across North America and Asia. He holds degrees from MIT and UC Berkeley and is a CFA charterholder.',
    image: `${SPEAKER_CDN}/698dd682f06a15ff27570de3_Jim%20Hwang.jpg`,
  },
  {
    name: 'Anthony Apollo',
    title: 'Executive Director',
    org: 'Wyoming Stable Token Initiative',
    bio: 'Anthony Apollo is the inaugural Executive Director of the Wyoming Stable Token Commission, leading development of the first fully reserved, fiat-backed stable token issued by a U.S. public entity. He brings experience from KPMG and EY, as well as digital asset roles at ConsenSys and Rensa, and has launched multiple blockchain-native financial and IP projects.',
    image: `${SPEAKER_CDN}/698dd32cae5fcf47dc6d22c1_Anthony%20Apollo.jpg`,
  },
  {
    name: 'John Belitsky',
    title: 'Founder & CEO',
    org: 'Hashfire',
    bio: 'John Belitsky is a technologist and entrepreneur with 20+ years of experience across real estate, finance, and blockchain. As co-founder of Balcony, he built blockchain systems enabling governments to migrate critical records on-chain. He focuses on bridging traditional markets with on-chain infrastructure to increase transparency and efficiency.',
    image: `${SPEAKER_CDN}/698dd455b78bcf1ecad1836a_John%20Belitsky.jpg`,
  },
  {
    name: 'Elena Obukhova',
    title: 'Founder',
    org: 'Supermoon & Supermoon Ventures',
    bio: 'Elena Obukhova is a business strategist and co-founder of Supermoon, a global community of 31,000+ founders and 2,500+ investors. With a background in quant finance and venture capital, she drives growth for fintech and web3 companies, specializing in strategy, fundraising, and go-to-market.',
    image: `${SPEAKER_CDN}/698dd71487075bd581204908_Elena%20Obukhova.jpg`,
  },
  {
    name: 'Natalia Karayaneva',
    title: 'CEO',
    org: 'Propy',
    bio: 'Natalia Karayaneva is founder and CEO of Propy, a Silicon Valley company advancing real estate transactions through smart contracts and AI. A WEF pioneer, she is a real estate developer, software engineer, Forbes contributor, and frequent global speaker on web3 and proptech. She holds degrees in Computer Engineering and Sustainable Urban Development from Oxford.',
    image: `${SPEAKER_CDN}/698dd6ae8796725130559d2b_Natalia%20Karayaneva.jpg`,
  },
  {
    name: 'Adam Zarazinski',
    title: 'CEO',
    org: 'Inca Digital',
    bio: 'Adam Zarazinski is CEO of Inca Digital, a firm delivering risk-focused intelligence for crypto, fintech, and banking. He previously served at INTERPOL, the WHO, and as a U.S. Air Force JAG prosecutor and operational law attorney. He is currently an O-4 in the USAF JAG Reserve.',
    image: `${SPEAKER_CDN}/698dd7b67ddd2f1476fa4a8d_Adam%20Zarazinski.jpg`,
  },
  {
    name: 'Chris Matturri',
    title: 'Head of Infrastructure',
    org: 'Proof Group',
    bio: 'Chris Matturri is Head of Infrastructure at Proof Group, a Menlo Park-based digital asset investment firm managing liquid and private strategies. He previously helped launch CME Group\'s digital asset product line and led growth at Validation Cloud. He holds a bachelor\'s from Lafayette College and an MBA from Georgetown\'s McDonough School of Business.',
    image: `${SPEAKER_CDN}/6994a93909d6da4ab7fdabec_chris.jpg`,
  },
  {
    name: 'Olivia Vande Woude',
    title: 'Head of Tokenization',
    org: 'Ava Labs',
    bio: 'Olivia Vande Woude leads Tokenization at Ava Labs, partnering with financial institutions to bring institutional assets on-chain to Avalanche. Previously, she was an associate analyst at T. Rowe Price, investing in small and mid-cap banks.',
    image: `${SPEAKER_CDN}/6994a763eaf1fbba25731df2_Olivia.jpg`,
  },
  {
    name: 'Benjamin Cole, Ph.D.',
    title: 'Managing Director',
    org: 'Family Stewardship Council',
    image: `${SPEAKER_CDN}/698dd55da8fa146cce67ca2f_Benjamin%20Cole.jpg`,
  },
];

export const featuredSpeakers = speakers.filter((s) => s.featured);
export const highlightedSpeakers = speakers.filter((s) => Boolean(s.bio));
