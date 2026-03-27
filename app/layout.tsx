import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Syne, Anton } from 'next/font/google';
import { ElcoShell } from '../components/ElcoShell';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const anton = Anton({
  weight: '400',
  variable: '--font-anton',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elco.work'),
  title: 'Elementary Complexity',
  description:
    'Strategic studio at the intersection of research and design.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  const isOSTDomain =
    host === 'onesharedtruth.com' || host === 'www.onesharedtruth.com';

  return (
    <html lang="en" className={`${syne.variable} ${anton.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-neutral-900 font-body antialiased">
        <ElcoShell isOSTDomain={isOSTDomain}>{children}</ElcoShell>
      </body>
    </html>
  );
}
