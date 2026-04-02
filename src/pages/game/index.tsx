import styles from "./styles.module.scss";
import { TStatus } from "@/shared/constants/game";
import { JSX, useEffect, useState, type CSSProperties } from "react";
import { EndGame } from "./components/end";
import { useLocation, useNavigate } from "react-router-dom";
import { IGameConfig } from "./model/types";
import { Game } from "./components/game";

export interface IGameComponentProps {
  gameConfig: IGameConfig;
}

const pagesByStatus: Record<
  TStatus,
  ({ gameConfig }: IGameComponentProps) => JSX.Element
> = {
  process: Game,
  win: EndGame,
  lost: EndGame,
};

export const GamePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [gameStatus, setGameStatus] = useState<TStatus>("process");
  const Component = pagesByStatus[gameStatus];

  type PlanetStyle = CSSProperties & { ["--size"]?: string };

  useEffect(() => {
    if (!state?.mode) navigate("/quickplay");

    const handleBeforeUnload = () => navigate("/quickplay");
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, state?.mode]);

  return (
    <div className={styles.container}>
      {/* Фон с планетами и звёздами */}
      <div className={styles.bgPlanets}>
        <div
          className={styles.planet}
          style={
            { ["--size"]: "180px", top: "10%", left: "5%" } as PlanetStyle
          }
        />
        <div
          className={styles.planet}
          style={
            { ["--size"]: "120px", bottom: "15%", right: "10%" } as PlanetStyle
          }
        />
        <div
          className={styles.planet}
          style={
            { ["--size"]: "90px", top: "60%", left: "70%" } as PlanetStyle
          }
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.game}>
          <Component gameConfig={{ gameStatus, setGameStatus }} />
        </div>
      </div>
    </div>
  );
};
