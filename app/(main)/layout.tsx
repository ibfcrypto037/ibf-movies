import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen pb-20 md:pb-0 pt-0 md:pt-4">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
