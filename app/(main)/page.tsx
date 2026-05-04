import { HeroBanner } from '@/components/home/HeroBanner';
import { SocialLinks } from '@/components/home/SocialLinks';
import { TodayUpdates } from '@/components/home/TodayUpdates';
import { SupportButton } from '@/components/home/SupportButton';
import { PageTransition } from '@/components/layout/PageTransition';
import { AppDownloadBanner } from '@/components/home/AppDownloadBanner';

export default function Home() {
  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto md:px-6">
        <AppDownloadBanner />
        <HeroBanner />
        <SocialLinks />
        <TodayUpdates />
        <SupportButton />
      </div>
    </PageTransition>
  );
}
