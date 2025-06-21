"use client";

import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { ServicoSelectStatusFilter } from "./ServicoSelectStatusFilter";

type Props = {
  statusSelecionado: string | null;
  setStatusSelecionado: (status: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const statusOptions = [
  { label: "Todos", value: null },
  { label: "Pendente", value: "Pendente" },
  { label: "Em andamento", value: "Em andamento" },
  { label: "Concluído", value: "Concluído" },
];

export function ServicosFilter({
  statusSelecionado,
  setStatusSelecionado,
  searchTerm,
  setSearchTerm,
}: Props) {
  return (
    <div className="bg-[#307B8E] rounded-lg p-4 mb-8">
      <h1 className="text-2xl font-bold text-center text-white mb-4">
        Serviços contratados
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="relative w-full md:w-auto">
          <Input
            placeholder="Digite aqui..."
            className="pl-4 pr-10 w-full h-10 bg-transparent border border-white text-white placeholder:text-white rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
        </div>

        <ServicoSelectStatusFilter
          value={statusSelecionado}
          onChange={setStatusSelecionado}
          options={statusOptions}
        />
      </div>
    </div>
  );
}
