"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CrisisCard, crisisCards, Season3Result, calcSeason3 } from "@/lib/gameData";

export type Screen =
  | "intro"
  | "facilitator"
  | "roles"
  | "context"
  | "season1"
  | "negotiate"
  | "season3"
  | "debrief";

export interface GameState {
  screen: Screen;
  revealedRoles: Set<number>;
  memberIds: number[];
  crisis: CrisisCard | null;
  season3Results: Season3Result[] | null;
}

interface GameContextValue extends GameState {
  goTo: (screen: Screen) => void;
  revealRole: (id: number) => void;
  setMembers: (ids: number[]) => void;
  confirmSeason3: (ids: number[]) => void;
  reset: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [revealedRoles, setRevealedRoles] = useState<Set<number>>(new Set());
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const [crisis, setCrisis] = useState<CrisisCard | null>(null);
  const [season3Results, setSeason3Results] = useState<Season3Result[] | null>(null);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const revealRole = useCallback((id: number) => {
    setRevealedRoles((prev) => new Set([...prev, id]));
  }, []);

  const setMembers = useCallback((ids: number[]) => {
    setMemberIds(ids);
  }, []);

  const confirmSeason3 = useCallback(
    (ids: number[]) => {
      const drawn = crisisCards[Math.floor(Math.random() * crisisCards.length)];
      setCrisis(drawn);
      setMemberIds(ids);
      const results = calcSeason3(ids, drawn);
      setSeason3Results(results);
      goTo("season3");
    },
    [goTo]
  );

  const reset = useCallback(() => {
    setScreen("intro");
    setRevealedRoles(new Set());
    setMemberIds([]);
    setCrisis(null);
    setSeason3Results(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        screen,
        revealedRoles,
        memberIds,
        crisis,
        season3Results,
        goTo,
        revealRole,
        setMembers,
        confirmSeason3,
        reset,
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
