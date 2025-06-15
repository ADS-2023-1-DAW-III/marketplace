import React, { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  placeholder?: string;
  delay?: number;
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
  disabled?: boolean;
}

export default function SearchInput({
  placeholder = "Digite aqui...",
  delay = 500,
  onSearch,
  className = "",
  initialValue = "",
  disabled = false,
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza a busca quando o query muda (com debounce)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSearch(query);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, delay, onSearch]);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      onSearch(query);
    }
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full pl-4 pr-10 py-2 rounded border border-white text-white placeholder-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white pointer-events-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
      </svg>
    </div>
  );
}