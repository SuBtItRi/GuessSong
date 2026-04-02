import { generateStars } from "@/shared/utils/generateStars";
import { useMemo } from "react";

import styles from "./styles.module.scss";

interface Props {
  count?: number;
  heightMultiplier?: number;
}

export const Stars = ({ count = 28, heightMultiplier = 1 }: Props) => {
  const stars = useMemo(
    () => generateStars(count, heightMultiplier),
    [count, heightMultiplier]
  );

  return (
    <div className={styles.starsContainer}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={
            {
              "--x": star.x,
              "--y": star.y,
              "--delay": star.delay,
              "--size-factor": star.sizeFactor,
              "--opacity-base": star.opacityBase,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
