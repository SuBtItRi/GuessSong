import React, { useState, useRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface SearchWithPopoverProps {
  options: string[];
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounce?: number; // задержка в мс, по умолчанию 500
}

export const SearchWithPopover: React.FC<SearchWithPopoverProps> = ({
  options,
  onSearch,
  placeholder = "Знаешь? Поиск по названию...",
  className = "",
  debounce = 500,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce логика
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, debounce);

    return () => clearTimeout(timer);
  }, [query, debounce]);

  // Закрытие при клике вне
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

  // Фильтрация результатов
  const filteredOptions = useMemo(() => {
    const lowerQuery = debouncedQuery.toLowerCase();
    return options?.filter((opt) => opt.toLowerCase().includes(lowerQuery));
  }, [debouncedQuery, options]);

  const handleSelect = (selected: string) => {
    setQuery(selected);
    onSearch(selected);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setIsOpen(false);
  };

  const showPopover = isOpen;

  return (
    <div
      className={classNames(styles.searchContainer, className)}
      ref={containerRef}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={styles.searchInput}
        />

        {query && (
          <button className={styles.clearBtn} onClick={handleClear}>
            ×
          </button>
        )}
      </div>

      {showPopover && (
        <div className={styles.popover}>
          {filteredOptions.length ? (
            filteredOptions.map((opt, index) => (
              <div
                key={index}
                className={styles.popoverItem}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className={styles.popoverItem}>Ничего не найдено :(</div>
          )}
        </div>
      )}
    </div>
  );
};
