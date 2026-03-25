import type React from "react";
import { createContext, useCallback, useContext, useReducer } from "react";

export type BetStatus = "pending" | "won" | "lost";

export interface Bet {
  id: string;
  numbers: number[];
  amountPerNumber: number;
  totalAmount: number;
  status: BetStatus;
  round: number;
  winningNumber?: number;
  payout?: number;
  timestamp: Date;
}

export interface RecentWinner {
  username: string;
  number: number;
  payout: number;
  timestamp: Date;
}

interface GameState {
  balance: number;
  selectedNumbers: number[];
  betAmount: string;
  bets: Bet[];
  currentRound: number;
  lastWinningNumber: number | null;
  recentWinners: RecentWinner[];
  isDrawing: boolean;
}

type GameAction =
  | { type: "TOGGLE_NUMBER"; number: number }
  | { type: "SET_BET_AMOUNT"; amount: string }
  | { type: "CLEAR_SELECTION" }
  | { type: "PLACE_BET"; bet: Bet }
  | { type: "DRAW_NUMBER"; winningNumber: number }
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "SET_DRAWING"; drawing: boolean };

const initialWinners: RecentWinner[] = [
  {
    username: "Raj***",
    number: 47,
    payout: 8000,
    timestamp: new Date(Date.now() - 300000),
  },
  {
    username: "Pri***",
    number: 12,
    payout: 4000,
    timestamp: new Date(Date.now() - 600000),
  },
  {
    username: "Vik***",
    number: 83,
    payout: 16000,
    timestamp: new Date(Date.now() - 900000),
  },
  {
    username: "Anu***",
    number: 65,
    payout: 8000,
    timestamp: new Date(Date.now() - 1200000),
  },
  {
    username: "Sun***",
    number: 29,
    payout: 24000,
    timestamp: new Date(Date.now() - 1500000),
  },
  {
    username: "Kav***",
    number: 54,
    payout: 4000,
    timestamp: new Date(Date.now() - 1800000),
  },
];

const initialBets: Bet[] = [
  {
    id: "b1",
    numbers: [23],
    amountPerNumber: 500,
    totalAmount: 500,
    status: "won",
    round: 41,
    winningNumber: 23,
    payout: 4500,
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "b2",
    numbers: [67, 45],
    amountPerNumber: 200,
    totalAmount: 400,
    status: "lost",
    round: 41,
    winningNumber: 23,
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "b3",
    numbers: [12],
    amountPerNumber: 1000,
    totalAmount: 1000,
    status: "pending",
    round: 42,
    timestamp: new Date(Date.now() - 60000),
  },
];

const initialState: GameState = {
  balance: 5000,
  selectedNumbers: [],
  betAmount: "100",
  bets: initialBets,
  currentRound: 42,
  lastWinningNumber: 23,
  recentWinners: initialWinners,
  isDrawing: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "TOGGLE_NUMBER":
      return {
        ...state,
        selectedNumbers: state.selectedNumbers.includes(action.number)
          ? state.selectedNumbers.filter((n) => n !== action.number)
          : [...state.selectedNumbers, action.number],
      };
    case "SET_BET_AMOUNT":
      return { ...state, betAmount: action.amount };
    case "CLEAR_SELECTION":
      return { ...state, selectedNumbers: [], betAmount: "100" };
    case "PLACE_BET":
      return {
        ...state,
        balance: state.balance - action.bet.totalAmount,
        bets: [action.bet, ...state.bets],
        selectedNumbers: [],
        betAmount: "100",
      };
    case "DRAW_NUMBER": {
      const winningNumber = action.winningNumber;
      const updatedBets = state.bets.map((bet) => {
        if (bet.status !== "pending" || bet.round !== state.currentRound)
          return bet;
        const isWin = bet.numbers.includes(winningNumber);
        const payout = isWin ? bet.amountPerNumber * 9 : 0;
        return {
          ...bet,
          status: (isWin ? "won" : "lost") as BetStatus,
          winningNumber,
          payout: isWin ? payout : undefined,
        };
      });
      const winBets = updatedBets.filter(
        (b) =>
          b.status === "won" &&
          b.winningNumber === winningNumber &&
          b.round === state.currentRound,
      );
      const totalPayout = winBets.reduce((sum, b) => sum + (b.payout ?? 0), 0);
      const newWinners: RecentWinner[] = winBets.map((b) => ({
        username: "You***",
        number: winningNumber,
        payout: b.payout ?? 0,
        timestamp: new Date(),
      }));
      return {
        ...state,
        balance: state.balance + totalPayout,
        bets: updatedBets,
        lastWinningNumber: winningNumber,
        currentRound: state.currentRound + 1,
        recentWinners: [...newWinners, ...state.recentWinners].slice(0, 10),
        isDrawing: false,
      };
    }
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.amount };
    case "WITHDRAW":
      return { ...state, balance: state.balance - action.amount };
    case "SET_DRAWING":
      return { ...state, isDrawing: action.drawing };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  toggleNumber: (n: number) => void;
  setBetAmount: (amount: string) => void;
  placeBet: () => boolean;
  drawNumber: (n: number) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const toggleNumber = useCallback(
    (n: number) => dispatch({ type: "TOGGLE_NUMBER", number: n }),
    [],
  );
  const setBetAmount = useCallback(
    (amount: string) => dispatch({ type: "SET_BET_AMOUNT", amount }),
    [],
  );

  const placeBet = useCallback((): boolean => {
    const amount = Number.parseFloat(state.betAmount);
    if (!state.selectedNumbers.length || Number.isNaN(amount) || amount <= 0)
      return false;
    const total = amount * state.selectedNumbers.length;
    if (total > state.balance) return false;
    const bet: Bet = {
      id: `b${Date.now()}`,
      numbers: [...state.selectedNumbers],
      amountPerNumber: amount,
      totalAmount: total,
      status: "pending",
      round: state.currentRound,
      timestamp: new Date(),
    };
    dispatch({ type: "PLACE_BET", bet });
    return true;
  }, [
    state.selectedNumbers,
    state.betAmount,
    state.balance,
    state.currentRound,
  ]);

  const drawNumber = useCallback((n: number) => {
    dispatch({ type: "SET_DRAWING", drawing: true });
    setTimeout(() => dispatch({ type: "DRAW_NUMBER", winningNumber: n }), 2000);
  }, []);

  const deposit = useCallback(
    (amount: number) => dispatch({ type: "DEPOSIT", amount }),
    [],
  );
  const withdraw = useCallback(
    (amount: number) => dispatch({ type: "WITHDRAW", amount }),
    [],
  );

  return (
    <GameContext.Provider
      value={{
        state,
        toggleNumber,
        setBetAmount,
        placeBet,
        drawNumber,
        deposit,
        withdraw,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
