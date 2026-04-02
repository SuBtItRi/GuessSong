import { stages, TMode, TStatus } from "@/shared/constants/game";
import { useRef, useState, useMemo, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { getTrackName } from "./utils";

interface IUseGameProps {
  setGameStatus: Dispatch<SetStateAction<TStatus>>;
}

export const useHardMediumGame = ({ setGameStatus }: IUseGameProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    state,
  }: {
    state: {
      mode: TMode;
        filteredTracks: string[];
      randomTrack: {
        albom: string;
        track: string;
        musicant: string;
      };
      alboms: string[];
    };
  } = useLocation();

  const { mode, filteredTracks, randomTrack, alboms } = state || {};

  const [time, setTime] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const audioDuration = audioRef.current?.duration ?? NaN;
  const randomAudioDuration = Math.random() * audioDuration;

  const [historySelected, setHistorySelected] = useState<{
    [key: number]: string;
  }>({});
  const [selectedTrack, setSelectedTrack] = useState("");

  const endTimeMoreDuration =
    randomAudioDuration >= audioDuration - 16
      ? randomAudioDuration - 16
      : randomAudioDuration;

  const musicStartTime = useMemo(() => {
    if (mode !== "medium") return 0;
    if (isNaN(endTimeMoreDuration)) return 0;
    return endTimeMoreDuration;
  }, [mode, endTimeMoreDuration]);

  const skipTrack = (name: string = "skipped") => {
    if (currentStage + 1 === stages.length) return checkIsCorrectAnswer(false);
    setHistorySelected((prev) => ({ ...prev, [currentStage]: name }));
    setCurrentStage((prev) => (prev + 1 >= stages.length ? prev : prev + 1));
  };

  const checkIsCorrectAnswer = (skip?: boolean) => {
    // @ts-expect-error - это поле используется как произвольное хранилище в `location.state`
    state["currentStage"] = currentStage;
    if (!selectedTrack && skip) return;

    if (getTrackName(selectedTrack) === randomTrack.track) {
      setGameStatus("win");
      setHistorySelected((prev) => ({
        ...prev,
        [currentStage]: selectedTrack,
      }));
      return;
    }

    if (currentStage + 1 === stages.length) return setGameStatus("lost");

    skipTrack(selectedTrack);
    return setGameStatus("process");
  };

  return {
    currentStage,
    historySelected,
    time,
    audioRef,
    musicStartTime,

    mode,
    alboms,
    randomTrack,
    filteredTracks,

    skipTrack,
    setSelectedTrack,
    setTime,
    checkIsCorrectAnswer,
  };
};
