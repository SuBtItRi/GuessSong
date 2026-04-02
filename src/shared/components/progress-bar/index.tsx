import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props {
  isRandom?: boolean;
  stage?: number;
  time?: number;
  stages: number[];
  onClickProgressBar?: (percentValue: number) => void;
}

const formatTime = (seconds: number) => {
  const formatSeconds = seconds % 60;
  const formatMinutes = Math.floor(seconds / 60);

  return `${formatMinutes ? `${formatMinutes}м` : ``}${
    formatSeconds ? `${formatSeconds}с` : ``
  }`;
};

export const ProgressBar = ({
  isRandom,
  stages,
  time,
  onClickProgressBar,
}: Props) => {
  const isTime = typeof time === "number";
  const lastStage = stages.at(-1) ?? 1;
  const percent = isRandom
    ? Math.floor(Math.random() * 80) + 10
    : isTime
      ? (time / lastStage) * 100
      : 0;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBarWrapper}>
        <div
          className={classNames(styles.progressBar, {
            [styles.clickable]: !!onClickProgressBar,
          })}
          onClick={(e) =>
            onClickProgressBar?.(
              e.nativeEvent.offsetX / e.currentTarget.clientWidth
            )
          }
        >
          {/* Фоновая шкала */}
          <div
            className={styles.progressFill}
            style={{
              width: `${percent}%`,
              ...(isTime && {
                transition: `0.1s`,
              }),
            }}
          />

          {/* Деления (вертикальные линии внутри бара) */}
          <div className={styles.ticks}>
            {stages.map((stage) => (
              <div
                key={`progressBarStage_${stage}`}
                className={styles.tick}
                style={{ left: `${(stage / lastStage) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Метки под баром */}
        <div className={styles.timeLabels}>
          {stages.map((stage) => (
            <span
              key={`progressBarTag_${stage}`}
              style={{ left: `${(stage / lastStage) * 100}%` }}
            >
              {formatTime(stage)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
