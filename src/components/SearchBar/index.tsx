import { useState } from "react";

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
    <div>
      {/* Using type="search" automatically sets role="searchbox" */}
      <input
        type="search"
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
