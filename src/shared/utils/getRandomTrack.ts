import { musicians } from "../constants/game";

type TrackOption = {
  musicant: string;
  track: string;
  albom: string;
};

export const getRandomTack = (alboms: string[]) => {
  // `alboms` — это массив значений album.value, которые пришли из UI.
  const selectedAlboms = new Set(alboms);

  const pool: TrackOption[] = [];

  for (const musicianKey of Object.keys(musicians)) {
    const musician = musicians[musicianKey];

    for (const album of musician.alboms) {
      if (!selectedAlboms.has(album.value)) continue;

      for (const track of album.tracks) {
        pool.push({
          musicant: musician.name,
          track,
          albom: album.label,
        });
      }
    }
  }

  if (pool.length === 0) {
    return {
      filteredTracks: [],
      randomTrack: { musicant: "", track: "", albom: "" },
    };
  }

  const randomTrack = pool[Math.floor(Math.random() * pool.length)];

  return {
    // Используется `getTrackName()`, который ожидает формат `${musicant} - ${track}`.
    filteredTracks: pool.map(
      ({ musicant, track, albom }) => `${musicant} - ${albom} - ${track}`,
    ),
    randomTrack,
  };
};
