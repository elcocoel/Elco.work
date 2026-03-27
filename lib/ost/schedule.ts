/**
 * One Shared Truth schedule. Source: live site content.
 */
export type ScheduleItem = {
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  panelists?: string[];
  moderator?: string;
  type: 'panel' | 'break' | 'breakout' | 'keynote' | 'meal';
  breakouts?: { title: string; description: string }[];
};

export const schedule: ScheduleItem[] = [
  {
    startTime: '9:00 am',
    endTime: '9:45 am',
    title: 'Continental Breakfast & Networking',
    type: 'meal',
  },
  {
    startTime: '9:45 am',
    endTime: '10:00 am',
    title: 'Opening Remarks',
    description:
      'Master of Ceremonies: Benjamin M. Cole, Ph.D., William J. Loschert Endowed Professorship of Technology Entrepreneurship, Gabelli School of Business & Managing Director, Family Stewardship Council',
    type: 'keynote',
  },
  {
    startTime: '10:00 am',
    endTime: '10:50 am',
    title: 'Panel 1: Arbitrage: Unlocking Market Inefficiencies',
    description:
      'Digital asset markets remain fragmented, creating price gaps and liquidity differences across venues. At the same time, blockchain allows for new ways of creating markets where informational asymmetries exist. Panelists will discuss how professional traders identify and capture arbitrage opportunities, manage risk, and build reliable execution strategies as markets mature.',
    panelists: [
      'John Divine, Head of Digital Asset OTC Trading, BlockFills & Author of Bitcoin Options',
      'Kelly Ye, Deputy Chief Investment Officer, Avenir Group',
      'John Belitsky, Founder & CEO, Hashfire',
    ],
    moderator: 'Jim Hwang, Chief Operating Officer, Firinne Capital',
    type: 'panel',
  },
  {
    startTime: '10:50 am',
    endTime: '11:10 am',
    title: 'Break & Networking',
    type: 'break',
  },
  {
    startTime: '11:10 am',
    endTime: '12:00 pm',
    title: 'Panel 2: Tokenization: Rebuilding Financial Infrastructure',
    description:
      'Tokenization is changing how investors access and trade assets by enabling fractional ownership, faster settlement, and greater liquidity. This discussion will explore the technology, market design, and operational challenges of tokenizing funds, treasuries, real world assets, and private markets — and what it will take for adoption at scale.',
    panelists: [
      'Natalia Karayaneva, CEO, Propy',
      'Michael Hiles, Co-Founder, Conduit Network & Commercium Bank',
      'Olivia Vande Woude, Head of Tokenization, Ava Labs',
    ],
    type: 'panel',
  },
  {
    startTime: '12:00 pm',
    endTime: '12:45 pm',
    title: 'Breakout Sessions',
    type: 'breakout',
    breakouts: [
      {
        title: 'DAO Design Canvas Workshop',
        description:
          'The DAO Design Canvas Breakout utilizes a canvas-like tool designed to guide groups through the process of making the most vital decisions they face in the process of designing a Decentralized Autonomous Organization (DAO)—soft versus hard governance, on versus off chain—no matter what platform.',
      },
      {
        title: 'Building on Chain',
        description:
          'A practical session for developers, founders, and anyone interested in creating scalable, secure blockchain applications. Industry experts will discuss the tools, networks, and design considerations behind modern on-chain systems, featuring insights from projects such as Sui, Ripple and Base.',
      },
      {
        title: 'Women in Blockchain/Crypto',
        description:
          'We are excited to host a dedicated Women in Blockchain/Crypto breakout focused on connection, conversation, and community. This session would bring together women across crypto, blockchain, and finance for meaningful dialogue, relationship-building, and shared experiences in the space. Designed as an intimate and welcoming environment, the breakout would allow attendees to connect organically, exchange ideas, and highlight women contributing to, and shaping, the future of Web3.',
      },
    ],
  },
  {
    startTime: '12:45 pm',
    endTime: '1:45 pm',
    title: 'Lunch',
    type: 'meal',
  },
  {
    startTime: '1:45 pm',
    endTime: '2:35 pm',
    title: 'Panel 3: The Rise of Stables: Stablecoins as a Financial Rail',
    description:
      'Stablecoins have evolved from niche tools to a core part of the financial system. Panelists will examine the design, policy, and institutional use cases for stablecoins, including settlement, risk management, and global liquidity.',
    panelists: [
      'Adam Zarazinski, CEO, Inca Digital',
      'Austin Campbell, Managing Partner & Founder, Zero Knowledge Group',
      'Anthony Apollo, Executive Director, Wyoming Stable Token Initiative (Frontier Token, FRNT)',
    ],
    moderator: 'Markus Veith, Partner, Grant Thornton LLP',
    type: 'panel',
  },
  {
    startTime: '2:35 pm',
    endTime: '3:00 pm',
    title: 'Break & Networking',
    type: 'break',
  },
  {
    startTime: '3:00 pm',
    endTime: '3:50 pm',
    title: 'Panel 4: Investment Exposure in the Ecosystem',
    description:
      'Investing in firms from the blockchain and cryptocurrency ecosystem can be daunting for those new to the jargon, tokenization dynamics, and nontraditional sources of information. This panel will explore how professional investors approach evaluating opportunities and taking on exposure in the ecosystem.',
    panelists: [
      'Elena Obukhova, Founder, Supermoon and Supermoon Ventures',
      'Chris Matturri, Head of Infrastructure, Proof Group',
    ],
    type: 'panel',
  },
  {
    startTime: '3:50 pm',
    endTime: '4:00 pm',
    title: 'Closing Remarks',
    type: 'keynote',
  },
];
