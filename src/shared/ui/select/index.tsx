import React, { useState, useRef, useEffect, ReactNode } from "react";
import { CustomCheckbox } from "../checkbox";
import styles from "./styles.module.scss";
import classNames from "classnames";

export interface SelectOption {
  value: string;
  label: string;
  children?: SelectOption[];
}

export interface SelectProps {
  options: SelectOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  label?: string | ReactNode;
  labelIcon?: string;
  multi?: boolean;
  searchable?: boolean;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите значение",
  label,
  labelIcon,
  multi = false,
  searchable = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const isError = !!error && !value.length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фильтрация с учётом групп и детей
  const filteredOptions = options
    .map((opt) => {
      // Если есть поиск
      if (search.trim()) {
        const searchLower = search.toLowerCase();
        const groupMatches = opt.label.toLowerCase().includes(searchLower);

        if (opt.children) {
          const matchedChildren = opt.children.filter((child) =>
            child.label.toLowerCase().includes(searchLower)
          );

          // Показываем группу, если:
          // 1. Сама группа совпадает по названию ИЛИ
          // 2. Хотя бы один ребёнок совпадает
          if (groupMatches || matchedChildren.length > 0) {
            return {
              ...opt,
              children: groupMatches ? opt.children : matchedChildren, // если группа совпадает — все дети, иначе только подходящие
            };
          }
          return null;
        } else {
          // Обычная опция
          return opt.label.toLowerCase().includes(searchLower) ? opt : null;
        }
      }
      // Без поиска — показываем всё как есть
      return opt;
    })
    .filter(Boolean) as SelectOption[];

  // Single mode
  const selectedOption = multi
    ? null
    : options.find((opt) => opt.value === value);

  const handleSingleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // Multi mode
  const selectedValues = multi ? (Array.isArray(value) ? value : []) : [];

  const toggleOption = (val: string) => {
    const newValue = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    onChange(newValue);
  };

  const toggleGroup = (children: SelectOption[]) => {
    const groupValues = children.map((child) => child.value);
    const allSelected = groupValues.every((v) => selectedValues.includes(v));

    let newValue: string[];
    if (allSelected) {
      newValue = selectedValues.filter((v) => !groupValues.includes(v));
    } else {
      newValue = [...new Set([...selectedValues, ...groupValues])];
    }
    onChange(newValue);
  };

  const selectAll = () => {
    const allValues = options.flatMap((opt) =>
      opt.children ? opt.children.map((c) => c.value) : [opt.value]
    );
    if (selectedValues.length === allValues.length) {
      onChange([]);
    } else {
      onChange(allValues);
    }
  };

  const clearSelection = () => {
    onChange(multi ? [] : "");
  };

  const selectedLabels = multi
    ? selectedValues
        .map((v) => {
          for (const opt of options) {
            if (opt.value === v) return opt.label;
            if (opt.children) {
              const child = opt.children.find((c) => c.value === v);
              if (child) return child.label;
            }
          }
          return "";
        })
        .filter(Boolean)
        .join(", ")
    : selectedOption?.label || "";

  const selectedCount = multi ? selectedValues.length : 0;

  const isGroupAllSelected = (children: SelectOption[]) =>
    children.every((child) => selectedValues.includes(child.value));

  return (
    <div className={styles.select} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {labelIcon && <span className={styles.labelIcon}>{labelIcon}</span>}
          {label}
        </label>
      )}

      <div
        className={classNames(styles.selectContainer, {
          [styles.error]: isError,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedDisplay}>
          {multi ? (
            selectedCount > 0 ? (
              <>
                <span className={styles.selectedCount}>
                  Выбрано {selectedCount}
                </span>
                <span className={styles.selectedText}>{selectedLabels}</span>
              </>
            ) : (
              <span className={styles.selectedText}>{placeholder}</span>
            )
          ) : (
            <span className={styles.selectedText}>
              {selectedLabels || placeholder}
            </span>
          )}

          {(multi ? selectedCount > 0 : !!selectedLabels) && (
            <button
              className={styles.clearBtn}
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {searchable && (
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className={styles.optionsList}>
            {multi && (
              <div
                className={`${styles.option} ${styles.selectAll}`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectAll();
                }}
              >
                <span>Выбрать все</span>
                <CustomCheckbox
                  checked={
                    selectedValues.length ===
                    options.flatMap((o) =>
                      o.children ? o.children.map((c) => c.value) : [o.value]
                    ).length
                  }
                  onChange={(checked) => {
                    if (checked) selectAll();
                    else onChange([]);
                  }}
                />
              </div>
            )}

            {filteredOptions.map((option) => (
              <React.Fragment key={option.value}>
                {option.children ? (
                  <>
                    <div
                      className={`${styles.groupHeader} ${styles.option}`}
                      onClick={() => toggleGroup(option.children!)}
                    >
                      <span>{option.label}</span>
                      {multi && (
                        <CustomCheckbox
                          checked={isGroupAllSelected(option.children)}
                        />
                      )}
                    </div>

                    <div className={styles.groupChildren}>
                      {option.children.map((child) => (
                        <div
                          key={child.value}
                          className={`${styles.option} ${styles.childOption}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (multi) {
                              toggleOption(child.value);
                            } else {
                              handleSingleSelect(child.value);
                            }
                          }}
                        >
                          <span className={styles.childLabel}>
                            {child.label}
                          </span>

                          {multi ? (
                            <CustomCheckbox
                              checked={selectedValues.includes(child.value)}
                              onChange={(checked) => {
                                if (checked) {
                                  onChange([...selectedValues, child.value]);
                                } else {
                                  onChange(
                                    selectedValues.filter(
                                      (v) => v !== child.value
                                    )
                                  );
                                }
                              }}
                            />
                          ) : (
                            <div
                              className={`${styles.radioDot} ${
                                child.value === value ? styles.radioChecked : ""
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className={styles.option}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (multi) {
                        toggleOption(option.value);
                      } else {
                        handleSingleSelect(option.value);
                      }
                    }}
                  >
                    <span>{option.label}</span>

                    {multi ? (
                      <CustomCheckbox
                        checked={selectedValues.includes(option.value)}
                        onChange={(checked) => {
                          if (checked) {
                            onChange([...selectedValues, option.value]);
                          } else {
                            onChange(
                              selectedValues.filter((v) => v !== option.value)
                            );
                          }
                        }}
                      />
                    ) : (
                      <div
                        className={`${styles.radioDot} ${
                          option.value === value ? styles.radioChecked : ""
                        }`}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}

            {filteredOptions.length === 0 && search && (
              <div className={styles.noResults}>Ничего не найдено</div>
            )}
          </div>
        </div>
      )}
      {isError && <p className={styles.errorLabel}>{error}</p>}
    </div>
  );
};
