export const formatTime = (time: number) => {
  const stringTime = String(time);
  const milleseconds = stringTime.split(".")[1] ?? 0;
  const seconds = Math.floor(time) % 60;
  const minutes = Math.floor(Math.floor(time) / 60);

  return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}:${milleseconds}`;
};

export const getTrackName = (name: string) => name.split(" - ").at(-1);
