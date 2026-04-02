import { QuickPlay } from "@/shared/components/quick-play";
import styles from "./styles.module.scss";

export const QuickPlayPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <QuickPlay title="" />
      </div>
    </div>
  );
};
