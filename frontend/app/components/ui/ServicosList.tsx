"use client";

import type { Servico } from "~/types/Servico";
import { ServicoCard } from "./ServicoCard";
import { ServicoEmptyState } from "./ServicoEmptyState";

type Props = {
  servicos: Servico[];
  isLoading: boolean;
};

export function ServicosList({ servicos, isLoading }: Readonly<Props>) {
  if (isLoading) {
    return <div className="text-center py-8">Carregando serviços...</div>;
  }

  if (!isLoading && servicos.length === 0) {
    return <ServicoEmptyState />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {servicos.map((servico) => (
        <ServicoCard key={servico.id} servico={servico} />
      ))}
    </div>
  );
}
