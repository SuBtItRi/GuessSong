import { stages, TMode, TStatus } from "@/shared/constants/game";
import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { getTrackName } from "./utils";
import texts from "@shared/constants/texts.json";

interface IUseGameProps {
  setGameStatus: Dispatch<SetStateAction<TStatus>>;
}

export const useLightGame = ({ setGameStatus }: IUseGameProps) => {
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

  const [currentStage, setCurrentStage] = useState(0);

  const trackName = randomTrack?.track ?? "";

  const songLines = useMemo<string[]>(() => {
    if (!trackName) return [];

    return (
      texts
        .find(({ name }) => name.toLowerCase() === trackName.toLowerCase())
        ?.text?.split("\n") ?? []
    );
  }, [trackName]);

  const randomSongLines = useMemo(() => {
    if (songLines.length === 0) return [];

    const randomLine = Math.random() * songLines.length;
    const randomStartLine =
      randomLine + 12 > songLines.length ? randomLine - 12 : randomLine;

    return songLines.slice(randomStartLine, randomStartLine + 12);
  }, [songLines]);

  const [historySelected, setHistorySelected] = useState<{
    [key: number]: string;
  }>({});
  const [selectedTrack, setSelectedTrack] = useState("");

  const skipTrack = (name: string = "skipped") => {
    if (currentStage + 1 === stages.length) return checkIsCorrectAnswer(false);
    setHistorySelected((prev) => ({ ...prev, [currentStage]: name }));
    setCurrentStage((prev) => (prev + 1 >= stages.length ? prev : prev + 1));
  };

  const checkIsCorrectAnswer = (skip?: boolean) => {
    console.log(currentStage);
    // @ts-expect-error - это поле используется как произвольное хранилище в `location.state`
    state["currentStage"] = currentStage;
    console.log({ selectedTrack, skip });
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
    randomSongLines,

    mode,
    alboms,
    randomTrack,
    filteredTracks,

    skipTrack,
    setSelectedTrack,
    checkIsCorrectAnswer,
  };
};
