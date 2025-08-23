import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div>
      <input
        type="text"
        role="searchbox"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}
