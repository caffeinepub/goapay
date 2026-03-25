import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameContext";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsAdmin } from "@/hooks/useQueries";
import {
  ArrowLeft,
  CheckCircle,
  Crown,
  Loader2,
  LogIn,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminDashboardProps {
  onBack: () => void;
}

const MOCK_USERS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    balance: 12500,
    totalBets: 24,
    totalWon: 4,
    totalLost: 20,
    role: "Player",
  },
  {
    id: 2,
    name: "Priya Sharma",
    balance: 8750,
    totalBets: 18,
    totalWon: 6,
    totalLost: 12,
    role: "Player",
  },
  {
    id: 3,
    name: "Vikram Singh",
    balance: 32000,
    totalBets: 45,
    totalWon: 12,
    totalLost: 33,
    role: "Player",
  },
  {
    id: 4,
    name: "Anushka Patel",
    balance: 5200,
    totalBets: 10,
    totalWon: 2,
    totalLost: 8,
    role: "Player",
  },
  {
    id: 5,
    name: "Sunil Mehta",
    balance: 91000,
    totalBets: 67,
    totalWon: 21,
    totalLost: 46,
    role: "VIP",
  },
];

type TxStatus = "pending" | "approved" | "rejected";

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    user: "Rajesh Kumar",
    type: "Deposit",
    amount: 5000,
    upi: "rajesh@okaxis",
    status: "approved" as TxStatus,
    time: "10:42 AM",
  },
  {
    id: 2,
    user: "Priya Sharma",
    type: "Withdraw",
    amount: 2000,
    upi: "priya@ybl",
    status: "pending" as TxStatus,
    time: "11:05 AM",
  },
  {
    id: 3,
    user: "Vikram Singh",
    type: "Deposit",
    amount: 10000,
    upi: "vikram@okicici",
    status: "approved" as TxStatus,
    time: "11:30 AM",
  },
  {
    id: 4,
    user: "Anushka Patel",
    type: "Withdraw",
    amount: 1500,
    upi: "anushka@paytm",
    status: "pending" as TxStatus,
    time: "12:15 PM",
  },
  {
    id: 5,
    user: "Sunil Mehta",
    type: "Deposit",
    amount: 25000,
    upi: "sunil@okhdfcbank",
    status: "approved" as TxStatus,
    time: "01:00 PM",
  },
  {
    id: 6,
    user: "Kavya Reddy",
    type: "Withdraw",
    amount: 3000,
    upi: "kavya@oksbi",
    status: "rejected" as TxStatus,
    time: "01:45 PM",
  },
];

function DrawControlTab() {
  const { state, drawNumber } = useGame();
  const [selectedDraw, setSelectedDraw] = useState("");
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
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="card-surface border border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground font-display">
            <Crown className="w-5 h-5 text-gold" />
            Draw Winning Number
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Round #{state.currentRound}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card className="card-surface border border-gold/20">
        <CardHeader>
          <CardTitle className="text-foreground font-display">
            Round Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Round</span>
            <span className="font-bold text-gold font-display text-lg">
              #{state.currentRound}
            </span>
          </div>
          {state.lastWinningNumber !== null && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Last Winning Number
              </span>
              <span className="font-display font-bold text-2xl text-gold">
                {String(state.lastWinningNumber).padStart(2, "0")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Total Bets This Round
            </span>
            <span className="font-semibold text-foreground">
              {state.bets.filter((b) => b.round === state.currentRound).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Draw Status</span>
            <Badge
              className={
                state.isDrawing
                  ? "bg-gold/20 text-gold border-gold/30"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }
            >
              {state.isDrawing ? "In Progress" : "Ready"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BetsOverviewTab() {
  const { state } = useGame();
  const [filter, setFilter] = useState<"all" | "pending" | "won" | "lost">(
    "all",
  );

  const filtered =
    filter === "all"
      ? state.bets
      : state.bets.filter((b) => b.status === filter);

  const statusBadge = (status: string) => {
    if (status === "won")
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Won
        </Badge>
      );
    if (status === "lost")
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          Lost
        </Badge>
      );
    return (
      <Badge className="bg-gold/20 text-gold border-gold/30">Pending</Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2" data-ocid="bets.tab">
        {(["all", "pending", "won", "lost"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "ghost"}
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? "bg-gold text-primary-foreground"
                : "text-muted-foreground"
            }
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="card-surface rounded-xl border border-border overflow-hidden">
        <Table data-ocid="bets.table">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Round</TableHead>
              <TableHead className="text-muted-foreground">Numbers</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Payout</TableHead>
              <TableHead className="text-muted-foreground">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="bets.empty_state"
                >
                  No bets found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((bet, i) => (
                <TableRow
                  key={bet.id}
                  className="border-border"
                  data-ocid={`bets.item.${i + 1}`}
                >
                  <TableCell className="text-foreground font-mono">
                    #{bet.round}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {bet.numbers
                      .map((n) => String(n).padStart(2, "0"))
                      .join(", ")}
                  </TableCell>
                  <TableCell className="text-foreground">
                    ₹{bet.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{statusBadge(bet.status)}</TableCell>
                  <TableCell className="text-foreground">
                    {bet.payout ? (
                      <span className="text-emerald-400">
                        ₹{bet.payout.toLocaleString()}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {bet.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="card-surface rounded-xl border border-border overflow-hidden">
      <Table data-ocid="users.table">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">User</TableHead>
            <TableHead className="text-muted-foreground">
              Balance (INR)
            </TableHead>
            <TableHead className="text-muted-foreground">Total Bets</TableHead>
            <TableHead className="text-muted-foreground">Total Won</TableHead>
            <TableHead className="text-muted-foreground">Total Lost</TableHead>
            <TableHead className="text-muted-foreground">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_USERS.map((user, i) => (
            <TableRow
              key={user.id}
              className="border-border"
              data-ocid={`users.item.${i + 1}`}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-xs text-gold font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-foreground font-medium">
                    {user.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-foreground font-mono">
                ₹{user.balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-foreground">
                {user.totalBets}
              </TableCell>
              <TableCell className="text-emerald-400">
                {user.totalWon}
              </TableCell>
              <TableCell className="text-red-400">{user.totalLost}</TableCell>
              <TableCell>
                <Badge
                  className={
                    user.role === "VIP"
                      ? "bg-gold/20 text-gold border-gold/30"
                      : "bg-surface-raised text-muted-foreground border-border"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TransactionsTab() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const updateStatus = (id: number, status: TxStatus) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    );
    toast.success(
      status === "approved" ? "Transaction approved" : "Transaction rejected",
    );
  };

  const typeBadge = (type: string) => {
    if (type === "Deposit")
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Deposit
        </Badge>
      );
    return (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
        Withdraw
      </Badge>
    );
  };

  const statusBadge = (status: TxStatus) => {
    if (status === "approved")
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Approved
        </Badge>
      );
    if (status === "rejected")
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          Rejected
        </Badge>
      );
    return (
      <Badge className="bg-gold/20 text-gold border-gold/30">Pending</Badge>
    );
  };

  return (
    <div className="card-surface rounded-xl border border-border overflow-hidden">
      <Table data-ocid="transactions.table">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">User</TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">Amount</TableHead>
            <TableHead className="text-muted-foreground">UPI ID</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Time</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, i) => (
            <TableRow
              key={tx.id}
              className="border-border"
              data-ocid={`transactions.item.${i + 1}`}
            >
              <TableCell className="text-foreground font-medium">
                {tx.user}
              </TableCell>
              <TableCell>{typeBadge(tx.type)}</TableCell>
              <TableCell className="text-foreground font-mono">
                ₹{tx.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm font-mono">
                {tx.upi}
              </TableCell>
              <TableCell>{statusBadge(tx.status)}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {tx.time}
              </TableCell>
              <TableCell>
                {tx.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(tx.id, "approved")}
                      className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                      data-ocid="transactions.confirm_button"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(tx.id, "rejected")}
                      className="h-7 text-xs bg-red-700 hover:bg-red-600 text-white"
                      data-ocid="transactions.delete_button"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatisticsTab() {
  const { state } = useGame();

  const roundBets = state.bets.filter((b) => b.round === state.currentRound);
  const roundPayout = state.bets
    .filter((b) => b.round === state.currentRound - 1 && b.status === "won")
    .reduce((sum, b) => sum + (b.payout ?? 0), 0);
  const totalWagered = state.bets
    .filter((b) => b.round === state.currentRound - 1)
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const platformRevenue = totalWagered - roundPayout;

  const stats = [
    {
      label: "Active Round",
      value: `#${state.currentRound}`,
      icon: <Crown className="w-5 h-5" />,
      color: "text-gold",
    },
    {
      label: "Total Bets This Round",
      value: roundBets.length.toString(),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-blue-400",
    },
    {
      label: "Total Payout (Last Round)",
      value: `₹${roundPayout.toLocaleString()}`,
      icon: <Wallet className="w-5 h-5" />,
      color: "text-emerald-400",
    },
    {
      label: "Platform Revenue (Last Round)",
      value: `₹${Math.max(0, platformRevenue).toLocaleString()}`,
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          data-ocid={"stats.card"}
        >
          <Card className="card-surface border border-border hover:border-gold/30 transition-colors">
            <CardContent className="pt-6">
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <div className="font-display font-bold text-2xl text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function AdminAccessGate({ onBack }: { onBack: () => void }) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [claiming, setClaiming] = useState(false);
  const isLoggedIn = !!identity;

  const claimAdmin = async () => {
    if (!actor) return;
    setClaiming(true);
    try {
      const success = await actor.claimFirstAdmin();
      if (success) {
        toast.success("Admin access granted! Refreshing...");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(
          "Admin is already assigned. If you are the admin, try refreshing the page.",
        );
      }
    } catch {
      toast.error("Could not claim admin access. Try refreshing.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface border border-gold/20 rounded-2xl p-8 max-w-sm w-full mx-4 space-y-6 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
          <Crown className="w-7 h-7 text-gold" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            Admin Access
          </h2>
          <p className="text-sm text-muted-foreground">
            {isLoggedIn
              ? actorFetching
                ? "Initializing secure session..."
                : "Claim admin access for your account to manage the Goapay platform."
              : "Login with Internet Identity to access the admin panel."}
          </p>
        </div>

        {isLoggedIn ? (
          <Button
            onClick={claimAdmin}
            disabled={claiming || actorFetching}
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold gold-glow-sm"
            data-ocid="admin.primary_button"
          >
            {claiming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Claiming...
              </>
            ) : actorFetching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                Initializing...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" /> Claim Admin Access
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-semibold"
            data-ocid="login.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" /> Login with Internet Identity
              </>
            )}
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Game
        </Button>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const { isFetching: actorFetching } = useActor();
  const { state } = useGame();

  if (isLoading || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminAccessGate onBack={onBack} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-[oklch(0.11_0.012_240/0.95)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground leading-none">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Round #{state.currentRound} • Goapay
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
            data-ocid="admin.secondary_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Tabs defaultValue="draw" className="space-y-6">
          <TabsList
            className="bg-surface-raised border border-border"
            data-ocid="admin.tab"
          >
            <TabsTrigger
              value="draw"
              className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
            >
              Draw Control
            </TabsTrigger>
            <TabsTrigger
              value="bets"
              className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
            >
              Bets Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground"
            >
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="mt-0">
            <DrawControlTab />
          </TabsContent>

          <TabsContent value="bets" className="mt-0">
            <BetsOverviewTab />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <UsersTab />
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <TransactionsTab />
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <StatisticsTab />
          </TabsContent>
        </Tabs>
      </main>
    </motion.div>
  );
}
