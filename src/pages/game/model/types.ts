import { TStatus } from "@/shared/constants/game";
import { Dispatch, SetStateAction } from "react";

export interface IGameConfig {
  gameStatus: TStatus;
  setGameStatus: Dispatch<SetStateAction<TStatus>>;
}

export interface IPlayMusic {
  maxTime?: number;
  startTime: number;
}
