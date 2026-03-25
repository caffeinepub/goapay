import AdminDashboard from "@/components/AdminDashboard";
import BetCard from "@/components/BetCard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowToPlay from "@/components/HowToPlay";
import NumberGrid from "@/components/NumberGrid";
import PlaceBetForm from "@/components/PlaceBetForm";
import RecentBets from "@/components/RecentBets";
import RecentWinners from "@/components/RecentWinners";
import { Toaster } from "@/components/ui/sonner";
import { GameProvider } from "@/context/GameContext";
import { useIsAdmin } from "@/hooks/useQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";

const queryClient = new QueryClient();

function GameLayout() {
  const gameRef = useRef<HTMLDivElement>(null);
  const howToRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { data: isAdmin } = useIsAdmin();
  const [showAdmin, setShowAdmin] = useState(false);

  const scrollTo = (section: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      game: gameRef,
      "how-to-play": howToRef,
      features: featuresRef,
    };
    map[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (showAdmin && isAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onScrollTo={scrollTo} onAdminPanel={() => setShowAdmin(true)} />
      <main className="flex-1">
        <HeroSection onPlayNow={() => scrollTo("game")} />

        {/* Game section */}
        <section id="game" ref={gameRef} className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[280px_1fr_280px] gap-6">
              {/* Left: Bet card */}
              <div>
                <BetCard />
              </div>

              {/* Center: Number grid + place bet form */}
              <div className="space-y-4">
                <div className="card-surface rounded-xl p-5">
                  <NumberGrid />
                  <PlaceBetForm />
                </div>
              </div>

              {/* Right: Recent bets */}
              <div>
                <RecentBets />
              </div>
            </div>
          </div>
        </section>

        <div ref={howToRef}>
          <HowToPlay />
        </div>
        <div ref={featuresRef}>
          <Features />
        </div>
      </main>

      <RecentWinners />
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <GameLayout />
      </GameProvider>
    </QueryClientProvider>
  );
}
