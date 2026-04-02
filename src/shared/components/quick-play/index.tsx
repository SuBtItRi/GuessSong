import { Select, SelectProps } from "@/shared/ui/select";
import styles from "./styles.module.scss";
import {
  modes,
  musicians,
  requiredError,
  stages,
} from "@/shared/constants/game";
import { useState } from "react";
import { PhoneCall } from "lucide-react";
import { ProgressBar } from "@/shared/components/progress-bar";
import { useNavigate } from "react-router-dom";
import { getRandomTack } from "@/shared/utils/getRandomTrack";

interface Props {
  title?: string;
  isRandom?: boolean;
}

export const QuickPlay = ({ title = "Быстрый старт", isRandom }: Props) => {
  const navigate = useNavigate();

  const [alboms, setAlboms] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("hard");
  const [errors, setErrors] = useState<{
    musicant?: string;
    albom?: string;
    mode?: string;
  }>({});

  const inputs: Record<string, SelectProps> = {
    musicant: {
      label: (
        <>
          <span className={styles.labelIcon}>Т</span> Исполнитель
        </>
      ),
      options: [
        {
          value: "fisenko",
          label: "Максим Фисенко",
        },
      ],
      value: "fisenko",
      onChange: () => {},
    },
    albom: {
      label: (
        <>
          <span className={styles.labelIcon}>Ц</span> Альбомы
        </>
      ),
      options: Object.entries(musicians).map(([value, m]) => ({
        value,
        label: m.name,
        children: m.alboms,
      })),
      value: alboms,
      onChange: (values) => setAlboms(values as string[]),
      multi: true,
      searchable: true,
      error: errors.albom,
    },
    mode: {
      label: (
        <>
          <span className={styles.labelIcon}>К</span> Режим игры
        </>
      ),
      options: modes,
      value: mode,
      onChange: (value) => setMode(value as string),
      error: errors.mode,
    },
  };

  const checkIsFilledInputs = () => {
    let isSomeNotFilledInput = false;

    Object.entries(inputs).map(([name, { value }]) => {
      const isNotFilledInput = !value.length;

      setErrors((prev) => ({
        ...prev,
        [name]: isNotFilledInput && requiredError,
      }));

      if (isNotFilledInput) isSomeNotFilledInput = true;
    });

    return isSomeNotFilledInput;
  };

  const startGame = () => {
    const isNotFilledInputs = checkIsFilledInputs();
    if (isNotFilledInputs) return;

    const { filteredTracks, randomTrack } = getRandomTack(alboms);

    navigate("/game", { state: { mode, alboms, filteredTracks, randomTrack } });
  };

  return (
    <section className={styles.quickPlay}>
      <div className={styles.quickPlayCard}>
        {!!title && <h2 className={styles.quickPlayTitle}>{title}</h2>}

        <div className={styles.upBlock}>
          {Object.values(inputs).map((props) => (
            <div className={styles.formGroup}>
              <Select {...props} />
            </div>
          ))}
        </div>

        <div className={styles.bottomBlock}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Время на угадывание</label>
            <ProgressBar stages={stages} isRandom={isRandom} stage={0} />
          </div>
        </div>

        <button className={styles.startButton} onClick={startGame}>
          Вызов{" "}
          <span className={styles.icon}>
            <PhoneCall />
          </span>
        </button>
      </div>
    </section>
  );
};
