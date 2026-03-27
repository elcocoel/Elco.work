import type { Metadata } from 'next';
import './webflow.css';
import './ost.css';

export const metadata: Metadata = {
  title: 'One Shared Truth Conference 2026 | Fordham Law School',
  description:
    'Join industry leaders March 21, 2026 in NYC for insights on arbitrage, tokenization, stablecoins & digital asset investing. Register now.',
  openGraph: {
    title: 'One Shared Truth Conference 2026 | Fordham Law School',
    description:
      'Join industry leaders March 21, 2026 in NYC for insights on arbitrage, tokenization, stablecoins & digital asset investing. Register now.',
    type: 'website',
  },
};

export default function OSTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="ost-root bg-ost-sand text-ost-coal font-ost-body">{children}</div>;
}
