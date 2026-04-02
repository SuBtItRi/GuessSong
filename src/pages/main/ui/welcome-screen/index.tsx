import { planets } from "../../model/const";
import styles from "./styles.module.scss";

export const WelcomeScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>GuessSong</h1>
        <p className={styles.subtitle}>
          Угадай песню за пару секунд и покажи свои знания.
        </p>

        <div className={styles.planetsContainer}>
          {planets.map((planet) => (
            <div
              key={planet.id}
              className={styles.planet}
              style={
                {
                  "--orbit-angle": `${
                    (planet.id - 1) * 45 + Math.random() * 90
                  }deg`,
                  "--distance": `${80 + Math.max(0.2, Math.random()) * 380}px`,
                  "--size": `${80 + Math.random() * 90}px`,
                  "--delay": `${Math.random() * 8}s`,
                } as React.CSSProperties
              }
            >
              <div className={styles.planetInner}>
                <img
                  src={planet.src}
                  alt="planet photo"
                  className={styles.planetImg}
                />
                <div className={styles.scratchOverlay} />
                <div className={styles.tornEdge} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
