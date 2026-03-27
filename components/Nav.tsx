'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/framework', label: 'Framework' },
  { href: '/about', label: 'About' },
  { href: '/case-studies', label: 'Case Studies' },
] as const;

function strengthAtDistance(d: number): number {
  if (d === 0) return 1;
  if (d === 1) return 0.5;
  if (d === 2) return 0.12;
  return 0;
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const baseWeight = active ? 600 : 400;

  function getWeight(i: number): number {
    if (hoveredIndex === null) return baseWeight;
    const d = Math.abs(i - hoveredIndex);
    const strength = strengthAtDistance(d);
    return Math.round(baseWeight + strength * (700 - baseWeight));
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-block font-display text-sm uppercase tracking-wider transition-colors duration-200 ${
        active ? 'text-black' : 'text-gray-500 hover:text-black'
      }`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {label.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-[font-weight] duration-300 ease-out"
          style={{ fontWeight: getWeight(i) }}
          onMouseEnter={() => setHoveredIndex(i)}
        >
          {char}
        </span>
      ))}
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {open ? (
        <path d="M18 6L6 18M6 6l12 12" />
      ) : (
        <>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </>
      )}
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  const homeHref = '/';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : ''
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 sm:py-6 lg:px-12"
        aria-label="Main"
      >
        <Link
          href={homeHref}
          className="font-display text-sm font-medium uppercase tracking-wider text-black hover:text-gray-600 transition-colors"
        >
          Elementary Complexity
        </Link>

        {/* Desktop nav — visible from md (768px) up; hamburger only when truly needed */}
        <ul className="ml-auto hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <NavLink
                href={href}
                label={label}
                active={
                  pathname === href ||
                  (href !== '/' && pathname?.startsWith(href))
                }
              />
            </li>
          ))}
        </ul>

        {/* Hamburger — visible below md (768px) */}
        <button
          type="button"
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-black transition-colors md:hidden"
          aria-expanded={drawerOpen}
          aria-controls="nav-drawer"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        >
          <HamburgerIcon open={drawerOpen} />
        </button>
      </nav>

      {/* Drawer overlay — visible below md when open */}
      <div
        id="nav-drawer"
        className={`fixed inset-0 z-40 md:hidden ${
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] transition-opacity duration-200 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeDrawer}
          aria-hidden
        />

        {/* Drawer panel — slides in from right, content-sized (not full viewport height) */}
        <div
          className={`absolute right-0 top-0 w-full max-w-xs border-l border-b border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col divide-y divide-gray-200 px-6 pt-20 pb-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeDrawer}
                className={`block py-4 font-display text-sm uppercase tracking-wider transition-colors duration-200 ${
                  pathname === href || (href !== '/' && pathname?.startsWith(href))
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
