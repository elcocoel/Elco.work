import Link from 'next/link';
import { Section } from './ui/Section';
import { SectionTitle } from './ui/SectionTitle';

export function DiscoveryCTAv2() {
  return (
    <Section
      variant="cta"
      contained
      aria-labelledby="cta-heading-v2"
    >
      <div className="max-w-reading">
        <SectionTitle
          id="cta-heading-v2"
          className="mb-4"
        >
          Discuss your coordination challenge
        </SectionTitle>
        <p className="text-gray-600 leading-relaxed mb-8">
          A short conversation to map the problem space and explore what&apos;s possible.
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
