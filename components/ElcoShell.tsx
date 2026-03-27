'use client';

import { usePathname } from 'next/navigation';
import { Nav } from './Nav';
import { BookingModalProvider } from './booking/BookingModalContext';
import { BookingModal } from './booking/BookingModal';

/**
 * Wraps Elco site chrome (Nav, BookingModal). Renders only children for /ost routes
 * so One Shared Truth has its own layout without Elco branding.
 * When isOSTDomain is true (onesharedtruth.com), omit nav regardless of pathname.
 */
export function ElcoShell({
  children,
  isOSTDomain = false,
}: {
  children: React.ReactNode;
  isOSTDomain?: boolean;
}) {
  const pathname = usePathname();
  const isOST = isOSTDomain || pathname?.startsWith('/ost');

  if (isOST) {
    return <>{children}</>;
  }

  return (
    <BookingModalProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <BookingModal />
    </BookingModalProvider>
  );
}
