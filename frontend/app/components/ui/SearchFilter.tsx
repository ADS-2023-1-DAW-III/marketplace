import { useState, useCallback, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface SearchFilters {
  query: string;
  categoria: string;
  valorMin: string;
  valorMax: string;
  avaliacao: string;
  [key: string]: string;
}

interface AddSelectOption {
  label: string;
  value: string;
}

interface ExternalFilter {
  key: string;
  value: string;
  options: AddSelectOption[];
  placeholder?: string;
}

interface SearchFilterProps {
  onFiltersChange?: (queryParams: URLSearchParams) => void;
  onSearch?: (queryParams: URLSearchParams) => void;
  externalFilters?: ExternalFilter[];
}

export default function SearchFilter({
  onFiltersChange,
  onSearch,
  externalFilters = [],
}: Readonly<SearchFilterProps>) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    categoria: "",
    valorMin: "",
    valorMax: "",
    avaliacao: "",
  });

  useEffect(() => {
    if (externalFilters.length > 0) {
      setFilters((prev) => {
        const newFilters = { ...prev };
        externalFilters.forEach((filter) => {
          if (!(filter.key in newFilters)) {
            newFilters[filter.key] = "";
          }
        });
        return newFilters;
      });
    }
  }, [externalFilters]);

  const createQueryParams = useCallback(
    (currentFilters: SearchFilters): URLSearchParams => {
      const params = new URLSearchParams();

      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value.trim()) {
          params.append(key, value.trim());
        }
      });

      return params;
    },
    []
  );

  const updateFilter = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };

        if (onFiltersChange) {
          const queryParams = createQueryParams(newFilters);
          onFiltersChange(queryParams);
        }

        return newFilters;
      });
    },
    [createQueryParams, onFiltersChange]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      if (value.includes("-")) {
        const [min, max] = value.split("-").map((v) => v.trim());
        setFilters((prev) => {
          const newFilters = {
            ...prev,
            valorMin: min || "",
            valorMax: max || "",
          };

          if (onFiltersChange) {
            const queryParams = createQueryParams(newFilters);
            onFiltersChange(queryParams);
          }

          return newFilters;
        });
      } else {
        updateFilter("valorMin", value);
        updateFilter("valorMax", "");
      }
    },
    [createQueryParams, onFiltersChange, updateFilter]
  );

  const handleSearch = useCallback(() => {
    if (onSearch) {
      const queryParams = createQueryParams(filters);
      onSearch(queryParams);
    }
  }, [createQueryParams, filters, onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="w-full bg-[#307B8E] rounded-2xl py-8 px-6 md:px-10 text-white max-w-7xl mx-auto mt-20 space-y-6 mb-36">
      <h1 className="text-center text-[28px] md:text-[36px] font-bold">
        Busque aqui!
      </h1>

      <div className="flex items-center gap-2 bg-white/10 rounded-md px-4 py-2 border border-white">
        <Input
          type="text"
          placeholder="Digite aqui..."
          className="bg-transparent border-0 text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          value={filters.query}
          onChange={(e) => updateFilter("query", e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Search
          className="text-white cursor-pointer hover:text-white/80 transition-colors"
          size={20}
          onClick={handleSearch}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <Select
            value={filters.categoria}
            onValueChange={(value) => updateFilter("categoria", value)}
          >
            <SelectTrigger
              className="w-full text-violet11 bg-transparent border-white cursor-pointer"
              style={{ color: "white" }}
            >
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="suporte">Suporte Técnico</SelectItem>
              <SelectItem value="motoristas">Motoristas</SelectItem>
              <SelectItem value="eventos">Eventos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Input
            type="text"
            placeholder="Valor (ex: 100 ou 100-500)"
            className="bg-white text-black rounded shadow px-4 py-2"
            value={
              filters.valorMin && filters.valorMax
                ? `${filters.valorMin}-${filters.valorMax}`
                : filters.valorMin
            }
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex-1">
          <Select
            value={filters.avaliacao}
            onValueChange={(value) => updateFilter("avaliacao", value)}
          >
            <SelectTrigger
              className="w-full bg-transparent border-white text-white placeholder-white cursor-pointer"
              style={{ color: "white" }}
            >
              <SelectValue placeholder="Avaliação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 estrelas</SelectItem>
              <SelectItem value="4">4 estrelas</SelectItem>
              <SelectItem value="3">3 estrelas</SelectItem>
              <SelectItem value="2">2 estrelas</SelectItem>
              <SelectItem value="1">1 estrela</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {externalFilters.length > 0 && (
          <div>
            {externalFilters.map((externalFilter) => (
              <div key={externalFilter.key} className="flex-1">
                <Select
                  value={filters[externalFilter.key] || ""}
                  onValueChange={(value) =>
                    updateFilter(externalFilter.key, value)
                  }
                >
                  <SelectTrigger
                    className="w-full bg-transparent border-white text-white placeholder-white cursor-pointer"
                    style={{ color: "white" }}
                  >
                    <SelectValue
                      placeholder={externalFilter.placeholder || "Selecione"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {externalFilter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
