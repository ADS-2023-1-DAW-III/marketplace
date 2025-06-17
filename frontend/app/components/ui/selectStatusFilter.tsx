type SelectStatusFilterProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export function SelectStatusFilter({ value, onChange }: SelectStatusFilterProps) {
  return (
    <div className="relative w-full md:w-48">
      <select
        value={value || "Todos"}
        onChange={(e) => onChange(e.target.value === "Todos" ? null : e.target.value)}
        className="appearance-none h-10 w-full rounded-md border border-white bg-[#307B8E] px-3 pr-8 text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <option value="Todos">Todos</option>
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
    </div>
  );
}
