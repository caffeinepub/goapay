import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Crown, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPanel() {
  const { state, drawNumber } = useGame();
  const [selectedDraw, setSelectedDraw] = useState<string>("");
  const [randomDrawing, setRandomDrawing] = useState(false);

  const handleManualDraw = () => {
    const n = Number.parseInt(selectedDraw);
    if (Number.isNaN(n) || n < 0 || n > 99) {
      toast.error("Enter a number between 00 and 99");
      return;
    }
    drawNumber(n);
    toast.success(`Drawing number ${String(n).padStart(2, "0")}...`);
    setSelectedDraw("");
  };

  const handleRandomDraw = () => {
    setRandomDrawing(true);
    const n = Math.floor(Math.random() * 100);
    setTimeout(() => {
      drawNumber(n);
      toast.success(`🎲 Winning number: ${String(n).padStart(2, "0")}!`);
      setRandomDrawing(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface rounded-xl p-5 border border-gold/30 space-y-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
          <Crown className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">
            Admin Panel
          </h3>
          <p className="text-xs text-muted-foreground">
            Draw winning number for Round #{state.currentRound}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={selectedDraw}
          onChange={(e) => setSelectedDraw(e.target.value)}
          min="0"
          max="99"
          placeholder="00–99"
          className="flex-1 bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/60"
          data-ocid="admin.input"
        />
        <Button
          type="button"
          onClick={handleManualDraw}
          disabled={state.isDrawing}
          className="bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
          data-ocid="admin.primary_button"
        >
          {state.isDrawing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Draw"
          )}
        </Button>
        <Button
          type="button"
          onClick={handleRandomDraw}
          disabled={state.isDrawing || randomDrawing}
          variant="secondary"
          className="bg-blue-accent text-white hover:opacity-90"
          data-ocid="admin.secondary_button"
        >
          <Zap className="w-4 h-4 mr-1" />
          Random
        </Button>
      </div>

      {state.isDrawing && (
        <div
          className="flex items-center gap-2 text-sm text-gold"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Drawing winning number...
        </div>
      )}

      {state.lastWinningNumber !== null && (
        <div className="flex items-center gap-3 bg-surface-raised rounded-lg px-3 py-2">
          <span className="text-xs text-muted-foreground">
            Last winning number:
          </span>
          <span className="font-display font-bold text-xl text-gold">
            {String(state.lastWinningNumber).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">
            (Round #{state.currentRound - 1})
          </span>
        </div>
      )}
    </motion.div>
  );
}
