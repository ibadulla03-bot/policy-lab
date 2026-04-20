"use client";

import { GameProvider, useGame } from "@/components/GameContext";
import IntroScreen from "@/components/screens/IntroScreen";
import FacilitatorScreen from "@/components/screens/FacilitatorScreen";
import RolesScreen from "@/components/screens/RolesScreen";
import ContextScreen from "@/components/screens/ContextScreen";
import Season1Screen from "@/components/screens/Season1Screen";
import NegotiateScreen from "@/components/screens/NegotiateScreen";
import Season3Screen from "@/components/screens/Season3Screen";
import DebriefScreen from "@/components/screens/DebriefScreen";

function GameRouter() {
  const { screen } = useGame();

  const screens = {
    intro: <IntroScreen />,
    facilitator: <FacilitatorScreen />,
    roles: <RolesScreen />,
    context: <ContextScreen />,
    season1: <Season1Screen />,
    negotiate: <NegotiateScreen />,
    season3: <Season3Screen />,
    debrief: <DebriefScreen />,
  };

  return (
    <div key={screen} className="screen-enter min-h-screen">
      {screens[screen]}
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
