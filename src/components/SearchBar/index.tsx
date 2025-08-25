import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className={styles.input}
      />
      <button type="button" onClick={handleClear} className={styles.button}>
        Clear
      </button>
    </div>
  );
}
