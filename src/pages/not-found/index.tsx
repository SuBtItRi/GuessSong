import { Link } from "react-router-dom"; 
import styles from "./styles.module.scss";

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      {/* Фон с частицами/звёздами */}
      <div className={styles.starsLayer} />

      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Космос потерял сигнал</h2>
        <p className={styles.description}>
          Песня, которую ты ищешь, улетела в другую галактику.
          <br />
          Или просто ввёл неправильный адрес... 😏
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            Вернуться на главную
          </Link>
          <Link to="/play" className={styles.btnSecondary}>
            Начать быструю игру
          </Link>
        </div>
      </div>

      {/* Плавающие планеты / астероиды для атмосферы */}
      <div className={styles.floatingPlanets}>
        <div className={`${styles.planet} ${styles.planet1}`} />
        <div className={`${styles.planet} ${styles.planet2}`} />
        <div className={`${styles.planet} ${styles.planet3}`} />
      </div>
    </div>
  );
};
