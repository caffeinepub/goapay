import { Coins, Hash, Trophy } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Hash,
    step: "01",
    title: "Pick Your Numbers",
    desc: "Browse the 00–99 grid and click to select any numbers you want to bet on. You can select multiple numbers.",
  },
  {
    icon: Coins,
    step: "02",
    title: "Place Your Bet",
    desc: "Enter your bet amount per number and confirm. The total stake is deducted from your wallet instantly.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Win 9x Payout",
    desc: "When the winning number is drawn, matching bets receive 9x their stake — that's 800% profit on your bet!",
  },
];

export default function HowToPlay() {
  return (
    <section id="how-to-play" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">
            How to Play
          </h2>
          <p className="text-muted-foreground">Simple steps to start winning</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-surface rounded-xl p-6 text-center space-y-4 hover:border-gold/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto">
                <s.icon className="w-7 h-7 text-gold" />
              </div>
              <div className="inline-block font-display font-black text-4xl text-gold/20">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
