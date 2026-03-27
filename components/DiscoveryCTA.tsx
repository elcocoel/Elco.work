import Link from 'next/link';
import { Section } from './ui/Section';
import { SectionTitle } from './ui/SectionTitle';

export function DiscoveryCTA() {
  return (
    <Section
      variant="cta"
      contained
      aria-labelledby="cta-heading"
    >
      <div className="max-w-reading">
        <SectionTitle
          id="cta-heading"
          className="mb-4"
        >
          Discuss your challenge
        </SectionTitle>
        <p className="text-gray-600 leading-relaxed mb-8">
          A short conversation to map the problem space.
        </p>
        <Link
          href="#"
          className="inline-block font-display text-lg font-medium uppercase tracking-wide text-black border-b-2 border-black pb-1 hover:border-gray-500 hover:text-gray-600 transition-colors"
        >
          Book a discovery call
        </Link>
      </div>
    </Section>
  );
}
