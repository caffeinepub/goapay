import { Crown } from "lucide-react";
import { SiInstagram, SiTelegram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const cafLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border bg-[oklch(0.10_0.012_240)] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                <Crown className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-gold">
                Goapay
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              India's premier number betting platform. Fast payouts, secure UPI
              transactions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
              >
                <SiX className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
              >
                <SiInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
              >
                <SiTelegram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href="#game"
                  className="hover:text-foreground transition-colors"
                >
                  Play Now
                </a>
              </li>
              <li>
                <a
                  href="#how-to-play"
                  className="hover:text-foreground transition-colors"
                >
                  How to Play
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Payments</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Deposit via UPI</li>
              <li>Instant Withdrawals</li>
              <li>Bank Transfer</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>support@goapay.in</li>
              <li>24/7 Live Chat</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Goapay. All rights reserved. Play responsibly. 18+ only.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={cafLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
