import { useLocation } from "react-router-dom";
import { IGameComponentProps } from "..";
import { HardMediumGame } from "./hard-medium-game";
import { LightGame } from "./light-game";

export const Game = ({ gameConfig }: IGameComponentProps) => {
  const { state } = useLocation();
  const { mode } = state ?? {};
  const GameComponent = mode === "light" ? LightGame : HardMediumGame;

  return <GameComponent gameConfig={gameConfig} />;
};
