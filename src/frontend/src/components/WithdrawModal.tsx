import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGame } from "@/context/GameContext";
import { ArrowDownToLine, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ open, onClose }: Props) {
  const { state, withdraw } = useGame();
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = async () => {
    const val = Number.parseFloat(amount);
    if (!upiId.trim()) {
      toast.error("Enter your UPI ID");
      return;
    }
    if (Number.isNaN(val) || val <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (val > state.balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (val < 100) {
      toast.error("Minimum withdrawal is ₹100");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    withdraw(val);
    setLoading(false);
    setSuccess(true);
    toast.success(`Withdrawal of ₹${val.toLocaleString()} requested!`);
    setTimeout(() => {
      setSuccess(false);
      setUpiId("");
      setAmount("");
      onClose();
    }, 1500);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setUpiId("");
          setAmount("");
          setSuccess(false);
          onClose();
        }
      }}
    >
      <DialogContent
        className="bg-card border-border max-w-sm"
        data-ocid="withdraw.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-blue-accent" /> Withdraw
            via UPI
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Funds will be transferred to your UPI ID within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div
            className="py-8 flex flex-col items-center gap-3"
            data-ocid="withdraw.success_state"
          >
            <CheckCircle className="w-12 h-12 text-win-green" />
            <p className="font-semibold text-foreground">
              Withdrawal Requested!
            </p>
            <p className="text-sm text-muted-foreground">
              We'll process your request within 24 hours.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-surface-raised rounded-lg px-3 py-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available balance</span>
              <span className="font-bold text-gold">
                ₹{state.balance.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="withdraw-upi"
                className="text-sm text-muted-foreground"
              >
                UPI ID
              </label>
              <input
                id="withdraw-upi"
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-blue-accent/60"
                data-ocid="withdraw.input"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="withdraw-amount"
                className="text-sm text-muted-foreground"
              >
                Amount (₹)
              </label>
              <input
                id="withdraw-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Min ₹100"
                min="100"
                max={state.balance}
                className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-blue-accent/60"
                data-ocid="withdraw.input"
              />
            </div>
            <Button
              type="button"
              onClick={handleWithdraw}
              disabled={
                loading ||
                !upiId.trim() ||
                !amount ||
                Number.parseFloat(amount) <= 0
              }
              className="w-full bg-blue-accent text-white hover:opacity-90 font-bold"
              data-ocid="withdraw.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Request Withdrawal"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
