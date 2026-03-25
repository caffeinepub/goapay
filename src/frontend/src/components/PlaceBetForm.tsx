import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { toast } from "sonner";

export default function PlaceBetForm() {
  const { state, setBetAmount, placeBet } = useGame();
  const { selectedNumbers, betAmount, balance } = state;
  const amount = Number.parseFloat(betAmount) || 0;
  const total = amount * (selectedNumbers.length || 1);
  const payout =
    selectedNumbers.length > 0 ? amount * selectedNumbers.length * 9 : 0;

  const handlePlaceBet = () => {
    if (!selectedNumbers.length) {
      toast.error("Select at least one number from the grid");
      return;
    }
    if (amount <= 0) {
      toast.error("Enter a valid bet amount");
      return;
    }
    if (total > balance) {
      toast.error("Insufficient balance. Please deposit.");
      return;
    }
    const success = placeBet();
    if (success)
      toast.success(
        `🎲 Bet placed on ${selectedNumbers.map((n) => String(n).padStart(2, "0")).join(", ")}!`,
      );
    else toast.error("Failed to place bet");
  };

  return (
    <div className="card-surface rounded-xl p-4 mt-4">
      <h3 className="font-display font-semibold text-foreground mb-3">
        Place Your Bet
      </h3>
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 space-y-1">
          <label
            htmlFor="placebet-amount"
            className="text-xs text-muted-foreground"
          >
            Amount per number (₹)
          </label>
          <input
            id="placebet-amount"
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            min="1"
            placeholder="Enter amount"
            className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/60"
            data-ocid="placebet.input"
          />
        </div>
        <div className="flex-1 space-y-1">
          <label
            htmlFor="placebet-payout"
            className="text-xs text-muted-foreground"
          >
            Potential payout (9x)
          </label>
          <div
            id="placebet-payout"
            className="bg-surface-raised border border-gold/20 rounded-lg px-3 py-2 text-sm font-bold text-gold"
          >
            ₹{payout > 0 ? payout.toLocaleString() : "0"}
          </div>
        </div>
        <Button
          type="button"
          onClick={handlePlaceBet}
          disabled={
            selectedNumbers.length === 0 || amount <= 0 || total > balance
          }
          className="bg-gold text-primary-foreground hover:bg-gold-light font-bold gold-glow-sm px-6 disabled:opacity-40"
          data-ocid="placebet.submit_button"
        >
          Place Bet
        </Button>
      </div>
      {selectedNumbers.length > 0 && amount > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {selectedNumbers.length} number{selectedNumbers.length > 1 ? "s" : ""}{" "}
          selected · Total stake:{" "}
          <span className="text-foreground font-semibold">
            ₹{(amount * selectedNumbers.length).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
