import { OSTNav } from './OSTNav';
import { HeroSection } from './HeroSection';
import { PartnersSection } from './PartnersSection';
import { ChessSection } from './ChessSection';
import { CoreThemesSection } from './CoreThemesSection';
import { SpeakersSection } from './SpeakersSection';
import { ScheduleSection } from './ScheduleSection';
import { FAQSection } from './FAQSection';
import { FooterSection } from './FooterSection';

export default function OSTPage() {
  return (
    <>
      <OSTNav />
      <HeroSection />
      <PartnersSection />
      <ChessSection />
      <CoreThemesSection />
      <SpeakersSection />
      <ScheduleSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
