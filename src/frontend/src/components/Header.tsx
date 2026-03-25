import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsAdmin } from "@/hooks/useQueries";
import { Crown, LogIn, LogOut, Menu, Settings, Wallet, X } from "lucide-react";
import { useState } from "react";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

interface HeaderProps {
  onScrollTo: (section: string) => void;
  onAdminPanel?: () => void;
}

export default function Header({ onScrollTo, onAdminPanel }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const { state } = useGame();
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = loginStatus === "success" && !!identity;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-[oklch(0.11_0.012_240/0.95)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <Crown className="w-4 h-4 text-primary-foreground" />
            </div>
            <span
              className="font-display font-bold text-xl text-gold text-glow-gold"
              data-ocid="header.link"
            >
              Goapay
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => onScrollTo("game")}
              className="hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              Play Now
            </button>
            <button
              type="button"
              onClick={() => onScrollTo("how-to-play")}
              className="hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              How to Play
            </button>
            <button
              type="button"
              onClick={() => onScrollTo("features")}
              className="hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              Features
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <>
                <span className="flex items-center gap-1 text-xs bg-gold/10 text-gold border border-gold/30 px-2 py-1 rounded-full">
                  <Crown className="w-3 h-3" /> Admin
                </span>
                {onAdminPanel && (
                  <Button
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={onAdminPanel}
                    className="text-gold border border-gold/30 hover:bg-gold/10"
                    data-ocid="admin.open_modal_button"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Admin
                  </Button>
                )}
              </>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-1.5">
                <Wallet className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-foreground">
                  ₹{state.balance.toLocaleString()}
                </span>
              </div>
            )}
            {isLoggedIn ? (
              <>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setDepositOpen(true)}
                  className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold gold-glow-sm"
                  data-ocid="deposit.primary_button"
                >
                  Deposit INR
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => setWithdrawOpen(true)}
                  className="bg-blue-accent text-white hover:opacity-90"
                  data-ocid="withdraw.primary_button"
                >
                  Withdraw UPI
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={clear}
                  className="text-muted-foreground"
                  data-ocid="logout.button"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                type="button"
                onClick={login}
                disabled={loginStatus === "logging-in"}
                className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
                data-ocid="login.primary_button"
              >
                <LogIn className="w-4 h-4 mr-1" />
                {loginStatus === "logging-in" ? "Connecting..." : "Login"}
              </Button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-surface px-4 py-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onScrollTo("game");
                setMobileOpen(false);
              }}
              className="text-left text-sm text-foreground py-2"
            >
              Play Now
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollTo("how-to-play");
                setMobileOpen(false);
              }}
              className="text-left text-sm text-foreground py-2"
            >
              How to Play
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollTo("features");
                setMobileOpen(false);
              }}
              className="text-left text-sm text-foreground py-2"
            >
              Features
            </button>
            {isAdmin && onAdminPanel && (
              <button
                type="button"
                onClick={() => {
                  onAdminPanel();
                  setMobileOpen(false);
                }}
                className="text-left text-sm text-gold py-2 flex items-center gap-2"
                data-ocid="admin.open_modal_button"
              >
                <Settings className="w-4 h-4" /> Admin Dashboard
              </button>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-2 py-2">
                <Wallet className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">
                  ₹{state.balance.toLocaleString()}
                </span>
              </div>
            )}
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    setDepositOpen(true);
                    setMobileOpen(false);
                  }}
                  className="bg-gold text-primary-foreground w-full"
                >
                  Deposit INR
                </Button>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    setWithdrawOpen(true);
                    setMobileOpen(false);
                  }}
                  className="bg-blue-accent text-white w-full"
                >
                  Withdraw UPI
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={clear}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                type="button"
                onClick={login}
                className="bg-gold text-primary-foreground w-full"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </header>

      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
      />
    </>
  );
}
