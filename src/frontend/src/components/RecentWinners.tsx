import { useGame } from "@/context/GameContext";
import { Trophy } from "lucide-react";

export default function RecentWinners() {
  const { state } = useGame();
  const winners = state.recentWinners;

  if (winners.length === 0) return null;

  const doubled = [...winners, ...winners];

  return (
    <div className="bg-[oklch(0.14_0.014_240)] border-y border-border py-3 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="shrink-0 flex items-center gap-2 px-4 text-gold">
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Recent Winners
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-6 animate-winner-scroll w-max">
            {doubled.map((w, i) => (
              <div
                key={`winner-${w.username}-${i}`}
                className="flex items-center gap-2 shrink-0"
              >
                <span className="text-xs text-muted-foreground">
                  {w.username}
                </span>
                <span className="font-display font-bold text-sm text-gold">
                  {String(w.number).padStart(2, "0")}
                </span>
                <span className="text-xs text-win-green font-semibold">
                  +₹{w.payout.toLocaleString()}
                </span>
                <span className="text-border">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
