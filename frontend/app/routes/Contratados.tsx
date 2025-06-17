"use client";

import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Search, Menu, CalendarX2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

import { SelectStatusFilter } from "~/components/ui/selectStatusFilter";

type Servico = {
  id: string;
  status: "Pendente" | "Em andamento" | "Concluído";
  tempo: string;
  titulo: string;
  descricao: string;
  nome: string;
  contato: string;
  valor: number;
  valorPago: number;
  data: Date;
  imagem: string;
  avatar: string;
};

// Texto da descrição ajustado para se parecer com a imagem
const mockServicos: Servico[] = [
  {
    id: "1",
    status: "Pendente",
    tempo: "30min",
    titulo: "Suporte Técnico (Hardware e Software)",
    descricao:
      "Lorem ipsum dolor sit amet. Quo nobis soluta qui rerum dolore cum quasi laudantium et autem aperiam aut nemo...",
    nome: "Fulano de tal",
    contato: "(99) 99999-9999",
    valor: 250.0,
    valorPago: 200.0,
    data: new Date("2025-02-23"),
    imagem:
      "https://img.freepik.com/fotos-gratis/fundo-de-microchip-inteligente-em-uma-tecnologia-de-close-up-da-placa-mae_53876-124723.jpg?semt=ais_hybrid&w=740",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Usei um avatar diferente para ficar mais parecido
  },
  {
    id: "2",
    status: "Em andamento",
    tempo: "30min",
    titulo: "Suporte Técnico (Hardware e Software)",
    descricao:
      "Lorem ipsum dolor sit amet. Quo nobis soluta qui rerum dolore cum quasi laudantium et autem aperiam aut nemo...",
    nome: "Fulano de tal",
    contato: "(99) 99999-9999",
    valor: 250.0,
    valorPago: 200.0,
    data: new Date("2025-02-23"),
    imagem:
      "https://img.freepik.com/fotos-gratis/fundo-de-microchip-inteligente-em-uma-tecnologia-de-close-up-da-placa-mae_53876-124723.jpg?semt=ais_hybrid&w=740",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    status: "Concluído",
    tempo: "30min",
    titulo: "Suporte Técnico (Hardware e Software)",
    descricao:
      "Lorem ipsum dolor sit amet. Quo nobis soluta qui rerum dolore cum quasi laudantium et autem aperiam aut nemo...",
    nome: "Fulano de tal",
    contato: "(99) 99999-9999",
    valor: 250.0,
    valorPago: 200.0,
    data: new Date("2025-02-23"),
    imagem:
      "https://img.freepik.com/fotos-gratis/fundo-de-microchip-inteligente-em-uma-tecnologia-de-close-up-da-placa-mae_53876-124723.jpg?semt=ais_hybrid&w=740",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const statusColor = {
  Pendente: "text-red-500",
  "Em andamento": "text-yellow-500",
  Concluído: "text-green-600",
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center mt-16 md:mt-24">
    <CalendarX2 className="h-28 w-28 text-gray-400" aria-hidden="true" />
    <p className="mt-4 text-lg text-gray-500">Nenhum serviço contratado até o momento.</p>
  </div>
);

export default function ServicosContratadosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = () => {
      setTimeout(() => {
        setServicos(mockServicos);
        setIsLoading(false);
      }, 500);
    };

    fetchServicos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#307B8E] shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
          <h1 className="flex font-bold text-xl select-none">
            <span className="bg-[#307B8E] text-white px-2 tracking-widest leading-none">MARKET</span>
            <span className="bg-white text-[#307B8E] px-2 tracking-widest leading-none">PLACE</span>
          </h1>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="bg-[#307B8E] rounded-lg p-4 mb-8">
          <h1 className="text-2xl font-bold text-center text-white mb-4">Serviços contratados</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-auto">
              <Input
                placeholder="Digite aqui..."
                className="pl-4 pr-10 w-full h-10 bg-transparent border border-white text-white placeholder:text-white rounded-md"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
            </div>

            <SelectStatusFilter value={statusSelecionado} onChange={setStatusSelecionado} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {servicos
            .filter((servico) => !statusSelecionado || servico.status === statusSelecionado)
            .map((servico) => (
              <Card key={servico.id} className="w-full max-w-sm rounded-xl shadow-md">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm font-semibold", statusColor[servico.status])}>
                      {servico.status}
                    </span>
                    <span className="text-sm text-green-700 font-medium">{servico.tempo}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">{servico.titulo}</h3>

                  <img
                    src={servico.imagem}
                    alt={servico.titulo}
                    className="h-44 w-full object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">{servico.descricao}</p>

                  <div className="flex items-center gap-3">
                    <img src={servico.avatar} className="rounded-full w-12 h-12 object-cover" />
                    <div>
                      <p className="font-semibold text-gray-800">{servico.nome}</p>
                      <p className="text-sm text-gray-500">Contato: {servico.contato}</p>
                    </div>
                  </div>

                  {/* Divisão para alinhar com o design final */}
                  <div className="border-t pt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Informações de compra</h4>
                    <p className="text-sm text-gray-500">
                      Valor: R${servico.valor.toFixed(2).replace(".", ",")}
                    </p>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <p className="text-gray-500">Data: {format(servico.data, "dd/MM/yyyy")}</p>
                      <p className="text-gray-500">
                        Valor pago: R${servico.valorPago.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {!isLoading && servicos.length === 0 && <EmptyState />}
        </div>
      </main>
    </div>
  );
}