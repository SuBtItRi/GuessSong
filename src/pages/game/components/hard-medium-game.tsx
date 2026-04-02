import classNames from "classnames";
import styles from "../styles.module.scss";
import { SearchWithPopover } from "@/shared/components/search-with-popover";
import { stages } from "@/shared/constants/game";
import { useHardMediumGame } from "../model/useHardMediumGame";
import { MP3Player } from "@/shared/components/mp3player";
import { IGameComponentProps } from "..";

export const HardMediumGame = ({ gameConfig }: IGameComponentProps) => {
  const { gameStatus, setGameStatus } = gameConfig;
  const {
    currentStage,
    historySelected,
    time,
    setTime,
    audioRef,
    randomTrack,
    filteredTracks,
    musicStartTime,
    mode,

    skipTrack,
    setSelectedTrack,
    checkIsCorrectAnswer,
  } = useHardMediumGame({ setGameStatus });

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

      <MP3Player
        audioRef={audioRef}
        track={randomTrack?.track}
        time={time}
        setTime={setTime}
        maxTime={stages[currentStage]}
        stopToStart
        stages={stages}
        musicStartTime={musicStartTime}
      />

      <SearchWithPopover
        options={filteredTracks as string[]}
        onSearch={setSelectedTrack}
      />

      <div className={styles.controls}>
        <button className={styles.skipBtn} onClick={() => skipTrack()}>
          {currentStage + 1 !== stages.length
            ? `SKIP +${currentStage + 1}s`
            : "PASS"}
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
