"use client";

import { useState, useEffect, type JSX } from "react";
import { ServicosFilter } from "~/components/ui/ServicosFilter";
import { ServicosList } from "~/components/ui/ServicosList";
import type { Servico } from "~/types/Servico";

export const mockServicos: Servico[] = [
  {
    id: "1",
    status: "Pendente",
    tempo: "45min",
    titulo: "Instalação de Software",
    descricao:
      "Instalação e configuração de software antivírus para proteção do sistema.",
    nome: "Ana Silva",
    contato: "(11) 91234-5678",
    valor: 180.0,
    valorPago: 0.0,
    data: new Date("2025-07-15"),
    imagem:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=740&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    status: "Em andamento",
    tempo: "2h",
    titulo: "Manutenção Preventiva (Hardware)",
    descricao: "Limpeza interna e atualização dos drivers do desktop.",
    nome: "Maria Fernanda",
    contato: "(31) 98765-4321",
    valor: 150.0,
    valorPago: 150.0,
    data: new Date("2025-06-25"),
    imagem:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=740&q=80",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "3",
    status: "Concluído",
    tempo: "30min",
    titulo: "Consultoria de Rede",
    descricao:
      "Avaliação e recomendação para otimização da rede Wi-Fi corporativa.",
    nome: "João Pedro",
    contato: "(41) 91234-9876",
    valor: 300.0,
    valorPago: 0.0,
    data: new Date("2025-08-01"),
    imagem:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=740&q=80",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

export default function ServicosContratadosPage(): JSX.Element {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setServicos(mockServicos);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 md:p-8">
        <ServicosFilter
          statusSelecionado={statusSelecionado}
          setStatusSelecionado={setStatusSelecionado}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ServicosList
          servicos={servicos}
          statusSelecionado={statusSelecionado}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
