import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { GnosisEvroDeliverableLanding } from '@/components/gnosis/GnosisEvroDeliverableLanding';
import { GNOSIS_EVRO_PAGE_MARGINALIA } from '@/lib/gnosisEvroDeliverableContent';

export const metadata = {
  title: 'EVRO capital deployment — Gnosis',
  description:
    'EUR 5M GnosisDAO deployment to EVRO (RaidGuild protocol) on Gnosis Chain — allocation, eras, risks, success criteria. Elementary Complexity — delivery.',
};

export default function GnosisEvroDeploymentPage() {
  return (
    <main className="min-h-screen bg-gray-50/30">
      <PageHero
        label="GnosisDAO · EVRO · March 2026"
        title="EVRO capital deployment"
        imagePath="/assets/field.png"
        imagePosition="50% 35%"
      />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2 justify-between items-baseline">
          <p className="font-display text-xs uppercase tracking-widest text-gray-500">
            {GNOSIS_EVRO_PAGE_MARGINALIA}
          </p>
          <p className="font-display text-xs uppercase tracking-widest text-gray-400">March 2026</p>
        </div>
      </div>

      <GnosisEvroDeliverableLanding />

      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed mb-4">
            {`EVRO was built by RaidGuild. Copy on this page is just orientation  for final decision making. Elco has written the whole thing, understood the calls and trade offs - it's way less machine made than you think... so I'll put a joke on the footer:`}
          </p>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed mb-6">
            {`Knock knock. Who's there? Not a model.`}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/"
              className="font-display text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              elco.work
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
