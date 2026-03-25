import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function BetCard() {
  const { state, toggleNumber, setBetAmount, placeBet } = useGame();
  const { selectedNumbers, betAmount, balance } = state;
  const amount = Number.parseFloat(betAmount) || 0;
  const total = amount * selectedNumbers.length;
  const potentialPayout = total * 9;

  const handlePlaceBet = () => {
    if (!selectedNumbers.length) {
      toast.error("Select at least one number");
      return;
    }
    if (amount <= 0) {
      toast.error("Enter a valid bet amount");
      return;
    }
    if (total > balance) {
      toast.error("Insufficient balance");
      return;
    }
    const success = placeBet();
    if (success)
      toast.success(
        `Bet placed! ₹${total.toLocaleString()} on ${selectedNumbers.length} number(s)`,
      );
    else toast.error("Failed to place bet");
  };

  return (
    <div className="card-surface rounded-xl p-4 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Your Bet</h3>
        <span className="text-xs text-muted-foreground">
          Round #{state.currentRound}
        </span>
      </div>

      <div className="min-h-[80px]">
        {selectedNumbers.length === 0 ? (
          <div className="h-20 flex items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-xs text-muted-foreground text-center px-2">
              Click numbers on the grid to select
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {[...selectedNumbers]
              .sort((a, b) => a - b)
              .map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleNumber(n)}
                  className="flex items-center gap-1 bg-gold/20 text-gold border border-gold/40 rounded px-2 py-0.5 text-xs font-bold hover:bg-gold/30 transition-colors"
                  data-ocid="bet.button"
                >
                  {String(n).padStart(2, "0")} <X className="w-2.5 h-2.5" />
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="bet-amount" className="text-xs text-muted-foreground">
          Bet per number (₹)
        </label>
        <input
          id="bet-amount"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/60"
          min="1"
          placeholder="100"
          data-ocid="bet.input"
        />
      </div>

      {selectedNumbers.length > 0 && amount > 0 && (
        <div className="space-y-1 bg-surface-raised rounded-lg px-3 py-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Numbers × amount</span>
            <span>
              {selectedNumbers.length} × ₹{amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-foreground font-semibold">
            <span>Total stake</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gold font-bold">
            <span>Potential win</span>
            <span>₹{potentialPayout.toLocaleString()}</span>
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={handlePlaceBet}
        disabled={
          selectedNumbers.length === 0 || amount <= 0 || total > balance
        }
        className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-bold gold-glow-sm disabled:opacity-40"
        data-ocid="bet.submit_button"
      >
        Place Bet
      </Button>
    </div>
  );
}
