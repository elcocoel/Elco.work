import { Section } from './ui/Section';
import { SectionTitle } from './ui/SectionTitle';
import { BookDiscoveryCallTrigger } from './booking/BookDiscoveryCallTrigger';

/**
 * V3: Original copy (Discuss your challenge). Opens booking modal.
 */
export function DiscoveryCTAv3() {
  return (
    <Section
      variant="cta"
      contained
      aria-labelledby="cta-heading-v3"
    >
      <div className="max-w-reading">
        <SectionTitle
          id="cta-heading-v3"
          className="mb-4"
        >
          Discuss your challenge
        </SectionTitle>
        <p className="text-gray-600 leading-relaxed mb-8">
          A short conversation to map the problem space.
        </p>
        <BookDiscoveryCallTrigger />
      </div>
    </Section>
  );
}
