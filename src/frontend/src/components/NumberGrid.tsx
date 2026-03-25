import { useGame } from "@/context/GameContext";
import { motion } from "motion/react";

export default function NumberGrid() {
  const { state, toggleNumber } = useGame();
  const { selectedNumbers, lastWinningNumber } = state;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Pick Your Numbers
        </h3>
        {selectedNumbers.length > 0 && (
          <span className="text-xs text-gold">
            {selectedNumbers.length} selected
          </span>
        )}
      </div>
      <div className="grid grid-cols-10 gap-1" data-ocid="grid.table">
        {Array.from({ length: 100 }, (_, i) => {
          const isSelected = selectedNumbers.includes(i);
          const isWinner = lastWinningNumber === i;
          return (
            <motion.button
              key={String(i).padStart(2, "0")}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleNumber(i)}
              data-ocid={`grid.item.${i + 1}`}
              className={[
                "aspect-square rounded text-xs font-bold transition-all duration-150 border",
                isSelected
                  ? "number-btn-selected"
                  : isWinner
                    ? "bg-win-green/20 text-win-green border-win-green/50"
                    : "bg-surface border-border text-muted-foreground hover:border-gold/50 hover:text-foreground",
              ].join(" ")}
            >
              {String(i).padStart(2, "0")}
            </motion.button>
          );
        })}
      </div>
      {lastWinningNumber !== null && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded-sm bg-win-green/30 border border-win-green/50" />
          Last winning:{" "}
          <span className="text-win-green font-bold">
            {String(lastWinningNumber).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
