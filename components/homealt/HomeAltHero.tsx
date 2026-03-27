'use client';

import {
  HOME_ALT_HERO_LEAD_CLASS,
  EDITORIAL_BODY_COL,
  EDITORIAL_DISPLAY_BODY_CLASS,
  EDITORIAL_EYEBROW_COL,
  EDITORIAL_TEXT_GRID_ROW,
} from '../../lib/homeAltHeroTypography';
import { BookDiscoveryCallTrigger } from '../booking/BookDiscoveryCallTrigger';
import { EditorialWordStagger } from '../editorial/EditorialWordStagger';
import { HomeAltHeroIllustrationStrip } from './HomeAltHeroIllustrationStrip';

/** Left-column kicker (editorial layout). */
const BRAND_LEAD =
  'Elementary Complexity provides strategic advisory for organizations navigating coordination at scale:';

const THESIS_LINE =
  'We explore, design and operate systems through which humans coordinate in an age of intelligent machines.';

/** Full-width illustration strip, two-column grid, centered discovery FAB. Parent supplies section shell on `/`. */
export function HomeAltHero() {
  return (
    <>
      <HomeAltHeroIllustrationStrip />

      <div
        className={`mt-10 sm:mt-12 lg:mt-14 ${EDITORIAL_TEXT_GRID_ROW}`}
      >
        {/* Left: kicker / eyebrow */}
        <div className={EDITORIAL_EYEBROW_COL}>
          <p className={`${HOME_ALT_HERO_LEAD_CLASS} max-w-sm`}>{BRAND_LEAD}</p>
        </div>

        {/* Right: large thesis (page title for a11y / SEO) */}
        <div className={EDITORIAL_BODY_COL}>
          <EditorialWordStagger
            as="h1"
            className={EDITORIAL_DISPLAY_BODY_CLASS}
            text={THESIS_LINE}
            startOn="mount"
          />
        </div>
      </div>

      {/* Tighter band above FAB: −20% vs former mt-10 / sm:12 / lg:14 */}
      <div className="mt-8 flex w-full justify-center sm:mt-[2.4rem] lg:mt-[2.8rem]">
        <BookDiscoveryCallTrigger appearance="fab" />
      </div>
    </>
  );
}
