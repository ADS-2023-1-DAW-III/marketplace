"use client";

import type { Servico } from "~/types/Servico";
import { ServicoCard } from "./ServicoCard";
import { ServicoEmptyState } from "./ServicoEmptyState";

type Props = {
  servicos: Servico[];
  statusSelecionado: string | null;
  searchTerm: string;
  isLoading: boolean;
};

export function ServicosList({
  servicos,
  statusSelecionado,
  searchTerm,
  isLoading,
}: Props) {
  const servicosFiltrados = servicos.filter((servico) => {
    const statusMatch = !statusSelecionado || servico.status === statusSelecionado;
    const searchMatch =
      servico.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  if (!isLoading && servicosFiltrados.length === 0) return <ServicoEmptyState />;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {servicosFiltrados.map((servico) => (
        <ServicoCard key={servico.id} servico={servico} />
      ))}
    </div>
  );
}
