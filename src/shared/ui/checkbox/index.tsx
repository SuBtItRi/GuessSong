import React, { MouseEvent } from "react";
import styles from "./styles.module.scss";

interface CustomCheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  onClick,
  label,
  disabled = false,
  name,
  id = `checkbox-${Math.random().toString(36).slice(2)}`,
  className = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`${styles.checkboxWrapper} ${className} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => !!onChange && onChange(e.target.checked)}
        onClick={(e) => !!onClick && onClick(e)}
        disabled={disabled}
        className={styles.hiddenInput}
      />

      <div
        className={`${styles.customCheckbox} ${checked ? styles.checked : ""}`}
      >
        {checked && (
          <svg
            className={styles.checkIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};
