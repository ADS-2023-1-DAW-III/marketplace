"use client";

import { Card, CardContent } from "~/components/ui/card";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import type { Servico } from "~/types/Servico";

const statusColor = {
  PENDENTE: "text-red-500",
  "EM ANDAMENTO": "text-yellow-500",
  CONCLUIDO: "text-green-600",
};

type Props = {
  readonly servico: Servico;
};

export function ServicoCard({ servico }: Props) {
  return (
    <Card className="w-full max-w-sm rounded-xl shadow-md">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-sm font-semibold",
              statusColor[servico.status as keyof typeof statusColor]
            )}
          >
            {servico.status}
          </span>
          <span className="text-sm text-green-700 font-medium">
            {servico.duracao}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800">{servico.titulo}</h3>

        <img
          src={servico.imagem}
          alt={servico.titulo}
          className="h-44 w-full object-cover rounded-lg"
        />
        <p className="text-sm text-gray-600 leading-relaxed">
          {servico.descricao}
        </p>

        <div className="flex items-center gap-3">
          <img
            src={servico.avatar}
            alt={`${servico.nome} avatar`}
            className="rounded-full w-12 h-12 object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{servico.nome}</p>
            <p className="text-sm text-gray-500">Contato: {servico.contato}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-800 mb-2">
            Informações de compra
          </h4>
          <p className="text-sm text-gray-500">Valor: R${servico.preco}</p>
          <div className="flex justify-between items-center text-sm mt-1">
            <p className="text-gray-500">
              Data: {format(servico.data, "dd/MM/yyyy")}
            </p>
            <p className="text-gray-500">Valor pago: R${servico.valorPago}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
