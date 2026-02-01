import { auth } from '@/auth';
import Features from '@/components/Features';
import HeroSection from '@/components/HeroSection';

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-[calc(100vh-5rem)] text-white">
      <HeroSection isLoggedIn={!!session}  />
      <Features />
    </div>
  );
}
