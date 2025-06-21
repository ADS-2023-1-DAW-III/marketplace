type Option = {
  label: string;
  value: string | null;
};

type SelectStatusFilterProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  options: Option[];
};

export function ServicoSelectStatusFilter({
  value,
  onChange,
  options,
}: SelectStatusFilterProps) {
  return (
    <div className="relative w-full md:w-48">
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : e.target.value)
        }
        className="appearance-none h-10 w-full rounded-md border border-white bg-[#307B8E] px-3 pr-8 text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        {options.map((option) => (
          <option key={option.label} value={option.value ?? ""}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
