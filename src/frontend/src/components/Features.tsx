import { Headphones, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Shield,
    title: "Secure UPI Payments",
    desc: "Deposit and withdraw instantly via UPI. All transactions are encrypted and processed securely.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our dedicated support team is available around the clock to assist you with any queries.",
  },
  {
    icon: Zap,
    title: "Live Draws",
    desc: "Witness live number draws in real-time. Results are announced instantly with automatic payouts.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-[oklch(0.13_0.013_240/0.5)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">
            Why Choose Goapay?
          </h2>
          <p className="text-muted-foreground">
            Trusted by thousands of players across India
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-surface rounded-xl p-6 space-y-4 hover:border-gold/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-accent/10 border border-blue-accent/20 flex items-center justify-center group-hover:bg-blue-accent/20 transition-colors">
                <f.icon className="w-6 h-6 text-blue-accent" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
