import classNames from "classnames";
import styles from "../styles.module.scss";
import { SearchWithPopover } from "@/shared/components/search-with-popover";
import { stages } from "@/shared/constants/game";
import { IGameComponentProps } from "..";
import { useLightGame } from "../model/useLightGame";

export const LightGame = ({ gameConfig }: IGameComponentProps) => {
  const { gameStatus, setGameStatus } = gameConfig;
  const {
    currentStage,
    historySelected,
    randomSongLines,

    filteredTracks,
    mode,

    skipTrack,
    setSelectedTrack,
    checkIsCorrectAnswer,
  } = useLightGame({ setGameStatus });

  return (
    <div className={styles.gameCard}>
      <span className={styles.subtitle}>mode: {mode}</span>
      <div className={styles.display}>
        <div className={styles.displayWrapper}>
          {stages.map((_, index) => (
            <div
              key={`trackLine_${index}`}
              className={classNames(styles.line, {
                [styles.lineFall]: index < currentStage,
                [styles.lineCurrent]:
                  index === currentStage && gameStatus !== "win",
                [styles.lineCorrect]:
                  index === currentStage && gameStatus === "win",
              })}
            >
              <span>{historySelected[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.songLines}>
        {randomSongLines.slice(0, (currentStage + 1) * 2).map((line) => (
          <p>{line}</p>
        ))}
      </div>

      <SearchWithPopover
        options={filteredTracks as string[]}
        onSearch={setSelectedTrack}
      />

      <div className={styles.controls}>
        <button className={styles.skipBtn} onClick={() => skipTrack()}>
          {currentStage + 1 !== stages.length ? `NEXT` : "PASS"}
        </button>

        <button
          className={styles.submitBtn}
          onClick={() => checkIsCorrectAnswer()}
        >
          ПРОВЕРИТЬ
        </button>
      </div>
    </div>
  );
};
