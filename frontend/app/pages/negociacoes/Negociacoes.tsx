// src/pages/negociacoes/Negociacoes.tsx (Versão correta e simplificada)
"use client";

import { useState, type JSX } from "react";
import { NegotiationCard } from "~/components/ui/NegotiationCard";

interface Negotiation {
  id: string;
  serviceTitle: string;
  negotiatorName: string;
  negotiatorAvatar: string;
  price: string;
  date: string;
  status: "ACEITO" | "EM_ANALISE";
}

const MOCKED_NEGOTIATIONS: Negotiation[] = [
  {
    id: "neg1",
    serviceTitle: "Reparo Hidráulico",
    negotiatorName: "Laura Morais",
    negotiatorAvatar: "https://via.placeholder.com/60/FFDDC1/808080?text=LM",
    price: "R$ 300,00",
    date: "10/04/2025",
    status: "ACEITO",
  },
  {
    id: "neg2",
    serviceTitle: "Desenvolvimento de Website",
    negotiatorName: "Gabriel Silva",
    negotiatorAvatar: "https://via.placeholder.com/60/D4F1F4/808080?text=GS",
    price: "R$ 3.060,00",
    date: "10/04/2025",
    status: "EM_ANALISE",
  },
];

export default function NegociacoesPage(): JSX.Element {
  const negotiations = MOCKED_NEGOTIATIONS;
  const isLoading = false;

  const handleMakePayment = (negotiationId: string) => {
    console.log(`Realizar pagamento para a negociação com ID: ${negotiationId}`);
    alert(`Funcionalidade de pagamento para ${negotiationId} a ser implementada.`);
  };

  return (
    // Apenas o conteúdo da página, o layout externo é responsabilidade do LayoutHome
    <div className="max-w-4xl mx-auto"> {/* Este é o container interno do conteúdo */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Negociações de Serviços</h1>
      <p className="text-gray-600 mb-8">
        Permitir ao contratante visualizar o andamento das suas negociações de serviço
      </p>

      {isLoading ? (
        <p className="text-center text-lg font-poppins text-[#307B8E] font-bold py-20">
          Carregando negociações...
        </p>
      ) : negotiations.length > 0 ? (
        <div className="space-y-6">
          {negotiations.map((negotiation) => (
            <NegotiationCard
              key={negotiation.id}
              id={negotiation.id}
              serviceTitle={negotiation.serviceTitle}
              negotiatorName={negotiation.negotiatorName}
              negotiatorAvatar={negotiation.negotiatorAvatar}
              price={negotiation.price}
              date={negotiation.date}
              status={negotiation.status}
              onMakePayment={handleMakePayment}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 font-semibold">
            Nenhuma negociação ativa no momento.
          </p>
        </div>
      )}
    </div>
  );
}