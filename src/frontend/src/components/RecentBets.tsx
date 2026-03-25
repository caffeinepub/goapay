import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/context/GameContext";
import type { Bet } from "@/context/GameContext";

function statusBadge(bet: Bet) {
  if (bet.status === "won")
    return (
      <Badge className="bg-win-green/20 text-win-green border-win-green/40 hover:bg-win-green/20 text-xs">
        Won ₹{(bet.payout ?? 0).toLocaleString()}
      </Badge>
    );
  if (bet.status === "lost")
    return (
      <Badge className="bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive/20 text-xs">
        Lost
      </Badge>
    );
  return (
    <Badge className="bg-gold/10 text-gold border-gold/30 hover:bg-gold/10 text-xs">
      Pending
    </Badge>
  );
}

export default function RecentBets() {
  const { state } = useGame();
  const bets = state.bets.slice(0, 15);

  return (
    <div className="card-surface rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground">
          Recent Bets
        </h3>
        <span className="text-xs text-muted-foreground">
          {bets.length} bets
        </span>
      </div>
      <ScrollArea className="flex-1 scrollbar-thin">
        {bets.length === 0 ? (
          <div
            className="h-32 flex items-center justify-center"
            data-ocid="bets.empty_state"
          >
            <p className="text-sm text-muted-foreground">
              No bets yet. Place your first bet!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {bets.map((bet, idx) => (
              <div
                key={bet.id}
                className="flex items-center justify-between bg-surface-raised rounded-lg px-3 py-2.5 border border-border/50"
                data-ocid={`bets.item.${idx + 1}`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    {bet.numbers.slice(0, 3).map((n) => (
                      <span
                        key={n}
                        className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold bg-surface border border-border text-foreground"
                      >
                        {String(n).padStart(2, "0")}
                      </span>
                    ))}
                    {bet.numbers.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{bet.numbers.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{bet.amountPerNumber}/num · Rnd #{bet.round}
                  </div>
                </div>
                {statusBadge(bet)}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
