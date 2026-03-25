import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGame } from "@/context/GameContext";
import { CheckCircle, Loader2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DepositModal({ open, onClose }: Props) {
  const { deposit } = useGame();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeposit = async () => {
    const val = Number.parseFloat(amount);
    if (Number.isNaN(val) || val <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    deposit(val);
    setLoading(false);
    setSuccess(true);
    toast.success(`₹${val.toLocaleString()} deposited successfully!`);
    setTimeout(() => {
      setSuccess(false);
      setAmount("");
      onClose();
    }, 1500);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setAmount("");
          setSuccess(false);
          onClose();
        }
      }}
    >
      <DialogContent
        className="bg-card border-border max-w-sm"
        data-ocid="deposit.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <Wallet className="w-5 h-5 text-gold" /> Deposit INR
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Add funds to your Goapay wallet via UPI
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div
            className="py-8 flex flex-col items-center gap-3"
            data-ocid="deposit.success_state"
          >
            <CheckCircle className="w-12 h-12 text-win-green" />
            <p className="font-semibold text-foreground">Deposit Successful!</p>
            <p className="text-sm text-muted-foreground">
              ₹{Number.parseFloat(amount || "0").toLocaleString()} added to your
              wallet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="deposit-amount"
                className="text-sm text-muted-foreground"
              >
                Amount (₹)
              </label>
              <input
                id="deposit-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-gold/60"
                data-ocid="deposit.input"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(String(a))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    amount === String(a)
                      ? "bg-gold/20 text-gold border-gold/40"
                      : "bg-surface border-border text-muted-foreground hover:border-gold/30"
                  }`}
                  data-ocid="deposit.button"
                >
                  ₹{a.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="bg-surface-raised rounded-lg px-3 py-3 space-y-1 text-xs text-muted-foreground">
              <div className="font-semibold text-foreground text-sm">
                UPI Details
              </div>
              <div>
                UPI ID: <span className="text-foreground">goapay@upi</span>
              </div>
              <div>
                Pay to above UPI ID and funds will be credited within 5 minutes.
              </div>
            </div>
            <Button
              type="button"
              onClick={handleDeposit}
              disabled={loading || !amount || Number.parseFloat(amount) <= 0}
              className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-bold gold-glow-sm"
              data-ocid="deposit.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Confirm Deposit"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
