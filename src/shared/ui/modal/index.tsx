import React, { useEffect, ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

type CSSVarStyle = React.CSSProperties & { ["--size"]?: string };

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = "",
}) => {
  // Закрытие по Esc
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={classNames(
          styles.modalContent,
          styles[`size-${size}`],
          className
        )}
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри модалки
      >
        {/* Заголовок и крестик */}
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}

          {showCloseButton && onClose && (
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              ×
            </button>
          )}
        </div>

        {/* Контент */}
        {!!children && <div className={styles.modalBody}>{children}</div>}
      </div>

      {/* Фоновые планеты для атмосферы */}
      <div className={styles.bgPlanets}>
        <div
          className={styles.planet}
          style={
            { ["--size"]: "140px", top: "15%", left: "8%" } as CSSVarStyle
          }
        />
        <div
          className={styles.planet}
          style={
            { ["--size"]: "100px", bottom: "20%", right: "12%" } as CSSVarStyle
          }
        />
      </div>
    </div>
  );
};
