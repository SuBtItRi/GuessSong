import styles from "./styles.module.scss";
import { Stars } from "@/shared/components/stars";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Stars count={52} />

      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.logo}>GuessSong</h3>
          <p className={styles.tagline}>
            Угадай трек • Соревнуйся • Поднимайся в топ
          </p>
        </div>

        <div className={styles.section}>
          <h4>О проекте</h4>
          <p className={styles.bio}>
            GuessSong создан фанатом музыки. Вдохновлён творчеством Максима
            Фисенко (Кишлак / АПФС и др. проекты) — эмо-рэпера из Североморска (род.
            14.12.1998), который смешивает альтернатива, рэп, лоу-фай и личные
            переживания в текстах. От «Автостопом по фазе сна» до культовых
            альбомов — его вайб помогает нам делать игру атмосферной и честной.
          </p>
        </div>

        <div className={styles.section}>
          <h4>Контакты</h4>
          <ul className={styles.contacts}>
            <li>Email: support@guesssong.ru</li>
            <li>Telegram: @GuessSongSupport</li>
            <li>VK: vk.com/guesssong</li>
            <li>Discord: discord.gg/guesssong</li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.links}>
            <a href="/">Главная</a>
            <a href="/game">Играть</a>
            <a href="/privacy">Политика конфиденциальности</a>
          </div>

          <div className={styles.copyright}>
            © 2026 GuessSong. Все права не защищены. Inspired by Максим Фисенко
            (Кишлак / АПФС и др. проекты)
          </div>
        </div>
      </div>
    </footer>
  );
};
