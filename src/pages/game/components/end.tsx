import { useHardMediumGame } from "../model/useHardMediumGame";
import styles from "../styles.module.scss";
import { MP3Player } from "@/shared/components/mp3player";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomTack } from "@/shared/utils/getRandomTrack";
import {
  maxPointsFromGame,
  modeMultiplier,
  stages,
  TMode,
} from "@/shared/constants/game";
import classNames from "classnames";
import { IGameComponentProps } from "..";
import { useLightGame } from "../model/useLightGame";

export const EndGame = ({ gameConfig }: IGameComponentProps) => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { mode: TMode; currentStage: number };
  };

  const mode: TMode = state?.mode ?? "hard";
  const currentStage = state?.currentStage ?? 0;

  const { gameStatus, setGameStatus } = gameConfig;
  const hardGame = useHardMediumGame({ setGameStatus });
  const lightGame = useLightGame({ setGameStatus });

  const isLight = mode === "light";
  const { randomTrack, filteredTracks, alboms } = isLight
    ? lightGame
    : hardGame;

  return (
    <div className={styles.gameCard}>
      <div className={styles.display}>
        <div className={styles.displayWrapper}>
          <div>
            <p>
              {randomTrack.musicant} - {randomTrack.track}
            </p>
            <p className={styles.subtitle}>Из альбома "{randomTrack.albom}"</p>
          </div>
          <div className={styles.endGameTrackLines}>
            {stages.map((_, i) => (
              <div
                className={classNames(styles.endGameTrackLine, {
                  [styles.fall]: i <= currentStage,
                  [styles.correct]: i === currentStage && gameStatus === "win",
                })}
              />
            ))}
          </div>
          <span
            className={classNames({
              [styles.lost]: gameStatus === "lost",
              [styles.win]: gameStatus === "win",
            })}
          >
            {gameStatus === "win"
              ? `Вы угадали эту песню с ${stages[currentStage]} секунды!`
              : "Вы не угадали эту песню :("}
          </span>
          <span>
            Получено{" "}
            {gameStatus === "win"
              ? (maxPointsFromGame * modeMultiplier[mode]) / (currentStage + 1)
              : 0}{" "}
            points
          </span>
        </div>
      </div>

      {!isLight && (
        <MP3Player
          audioRef={hardGame.audioRef}
          time={hardGame.time}
          setTime={hardGame.setTime}
          track={randomTrack.track}
          maxTime={hardGame.audioRef.current?.duration}
          showBackBtn
          musicStartTime={hardGame.musicStartTime}
        />
      )}

      <div className={styles.controls}>
        <button
          className={styles.submitBtn}
          onClick={() => {
            setGameStatus("process");
            const { randomTrack } = getRandomTack(alboms);
            navigate("/game", {
              state: {
                mode,
                alboms,
                filteredTracks,
                randomTrack,
              },
            });
          }}
        >
          ИГРАТЬ СНОВА
        </button>
      </div>
    </div>
  );
};
