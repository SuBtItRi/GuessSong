import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";
import {
  AudioLinesIcon,
  CirclePlayIcon,
  SkipBackIcon,
  StopCircleIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { ProgressBar } from "../progress-bar";
import { useDevTools } from "@/app/contexts/DevToolsContext";

export const formatTime = (time: number) => {
  if (time === Infinity || isNaN(time)) return `0:00:0`;
  const stringTime = String(time);
  const milliseconds = stringTime.split(".")[1]?.[0] ?? 0;
  const seconds = Math.floor(time) % 60;
  const minutes = Math.floor(Math.floor(time) / 60);

  return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}:${milliseconds}`;
};

type IStatusMP3Player = "start" | "playing" | "stop";

const TriggerBtnIcon: Record<IStatusMP3Player, ReactNode> = {
  start: <CirclePlayIcon />,
  playing: <AudioLinesIcon />,
  stop: <StopCircleIcon />,
};

interface IMP3Player {
  audioRef: RefObject<HTMLAudioElement | null>;
  track: string;
  stages?: number[];

  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  maxTime?: number;
  musicStartTime?: number;

  stopToStart?: boolean;
  showBackBtn?: boolean;
}

export const MP3Player = ({
  audioRef,
  track,
  stages,

  time,
  setTime,
  maxTime = Infinity,
  musicStartTime = 0,

  stopToStart,
  showBackBtn,
}: IMP3Player) => {
  const { isDevToolsOpen } = useDevTools();

  const [status, setStatus] = useState<IStatusMP3Player>("start");
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("volume")) || 1
  );
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const audio = audioRef.current;

  // Закрытие поповера при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsVolumeOpen(false);
      }
    };
    if (isVolumeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVolumeOpen]);

  // Применяем громкость к audio
  useEffect(() => {
    localStorage.setItem("volume", String(volume));
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  const triggerPlayBtn = () =>
    status === "playing" ? stopMusic() : playMusic();

  const playMusic = () => setStatus("playing");

  const stopMusic = () => setStatus("stop");

  const changeTime = useCallback(
    (time: number) => {
      if (!audio) return;
      audio.currentTime = time;
      setTime(time);
    },
    [audio, setTime]
  );

  const onClickBackBtn = () => {
    changeTime(0);
    setStatus("start");
  };

  const onClickProgressBar = (percentValue: number) => {
    if (!audio) return;
    changeTime(percentValue * audio?.duration);
    if (status === "start") stopMusic();
  };

  const toggleVolumePopover = () => {
    setIsVolumeOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!audio) return;

    setTime(musicStartTime);
    audio.currentTime = musicStartTime;
  }, [audio, musicStartTime, setTime]);

  useEffect(() => {
    if (!audio) return;

    if (status === "start") {
      audio.pause();
      changeTime(musicStartTime);
    }

    if (status === "playing") {
      if (time >= maxTime + musicStartTime) return stopMusic();
      audio.play().catch(() => {}); // на случай блокировки autoplay
      const interval = setInterval(() => {
        setTime((prev) => +(prev + 0.1).toFixed(2));
      }, 100);
      return () => clearInterval(interval);
    }

    if (status === "stop") {
      if (stopToStart && time !== 0) setStatus("start");
      audio.pause();
    }
  }, [
    audio,
    status,
    time,
    maxTime,
    musicStartTime,
    stopToStart,
    changeTime,
    setTime,
  ]);

  return (
    <>
      <ProgressBar
        stages={
          stages
            ? stages
            : [0, audio?.duration ? Math.floor(audio.duration) : 0]
        }
        time={time - musicStartTime}
        {...(!stages && { onClickProgressBar: (pv) => onClickProgressBar(pv) })}
      />

      <div className={styles.mp3player}>
        {!isDevToolsOpen && (
          <audio ref={audioRef} src={`songs/${track}.mp3`} preload="auto" />
        )}

        <span>{formatTime(time - musicStartTime)}</span>

        <div className={styles.btns}>
          {showBackBtn && (
            <button onClick={onClickBackBtn} className={styles.additionalBtn}>
              <SkipBackIcon />
            </button>
          )}

          <button onClick={triggerPlayBtn}>{TriggerBtnIcon[status]}</button>

          {/* Кнопка громкости с поповером */}
          <div className={styles.volumeContainer} ref={popoverRef}>
            <button
              onClick={toggleVolumePopover}
              className={styles.additionalBtn}
            >
              {volume === 0 ? <VolumeXIcon /> : <Volume2Icon />}
            </button>

            {isVolumeOpen && (
              <div className={styles.volumePopover}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className={styles.verticalSlider}
                />
              </div>
            )}
          </div>
        </div>

        <span>{formatTime(maxTime ? maxTime : 0)}</span>
      </div>
    </>
  );
};
