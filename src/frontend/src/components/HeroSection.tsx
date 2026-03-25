import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onPlayNow: () => void;
}

export default function HeroSection({ onPlayNow }: HeroSectionProps) {
  const floatingNumbers = [
    "07",
    "42",
    "88",
    "13",
    "61",
    "35",
    "99",
    "00",
    "55",
    "27",
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[oklch(0.75_0.12_75/0.04)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            India's #1 Number Betting Game
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Pick Your Number.
            <br />
            <span className="text-gold text-glow-gold">Place Your Bet.</span>
            <br />
            Win Big!
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose from 00 to 99, place your bet, and win{" "}
            <span className="text-gold font-semibold">9x your stake</span> —
            that's 800% profit on every winning number!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={onPlayNow}
              size="lg"
              className="bg-gold text-primary-foreground hover:bg-gold-light font-bold text-base gold-glow px-8"
              data-ocid="hero.primary_button"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-win-green" />
              <span>
                <span className="text-win-green font-semibold">₹1,24,000</span>{" "}
                won today
              </span>
            </div>
          </div>
          <div className="flex gap-6 pt-2">
            <div>
              <div className="font-display font-bold text-2xl text-gold">
                9x
              </div>
              <div className="text-xs text-muted-foreground">
                Payout Multiplier
              </div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="font-display font-bold text-2xl text-foreground">
                100
              </div>
              <div className="text-xs text-muted-foreground">
                Numbers to Pick
              </div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="font-display font-bold text-2xl text-win-green">
                Live
              </div>
              <div className="text-xs text-muted-foreground">
                Instant Results
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Central badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-2 border-gold/40 gold-glow flex flex-col items-center justify-center bg-surface">
                <div className="font-display font-black text-5xl text-gold text-glow-gold">
                  00
                </div>
                <div className="text-muted-foreground text-sm font-semibold tracking-widest">
                  TO
                </div>
                <div className="font-display font-black text-5xl text-gold text-glow-gold">
                  99
                </div>
              </div>
            </div>
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-gold/10" />
            {/* Floating numbers */}
            {floatingNumbers.map((num, i) => {
              const angle = (i / floatingNumbers.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const radius = 155;
              const x = 50 + (radius / 3.84) * Math.cos(rad);
              const y = 50 + (radius / 3.84) * Math.sin(rad);
              return (
                <motion.div
                  key={num}
                  className="absolute w-10 h-10 rounded-lg bg-surface border border-gold/30 flex items-center justify-center font-display font-bold text-sm text-gold"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {num}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
