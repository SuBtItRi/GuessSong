import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Stars } from "@/shared/components/stars";
import { AppRoutes, RoutePath } from "@/app/router/const";

const pages = [
  {
    name: "Главная",
    to: RoutePath[AppRoutes.MAIN],
  },
  {
    name: "Играть",
    to: RoutePath[AppRoutes.QUICK_PLAY],
  },
];

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <Stars />

      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            GuessSong
          </Link>

          {pages.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className={classNames(styles.navLink, {
                [styles.highlight]: pathname === to,
              })}
            >
              {name}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <Link to="/login" className={styles.loginBtn}>
            Вход
          </Link>
        </div>
      </div>
    </header>
  );
};
