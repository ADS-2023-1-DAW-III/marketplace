"use client";

import { useState, useEffect, type JSX } from "react";
import { ErrorAlert } from "~/components/ui/AlertMessages";
import SearchFilter from "~/components/ui/SearchFilter";
import { ServicosList } from "~/components/ui/ServicosList";
import { useApi } from "~/hooks/services/api";
import type { Servico } from "~/types/Servico";

export default function ServicosContratadosPage(): JSX.Element {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();

  const externalFilters = [
    {
      key: "status",
      value: "",
      placeholder: "Status do Serviço",
      options: [
        { label: "Pendente", value: "PENDENTE" },
        { label: "Em Andamento", value: "EM ANDAMENTO" },
        { label: "Concluído", value: "CONCLUIDO" },
      ],
    },
  ];

  const handleSearch = async (queryParams: URLSearchParams) => {
    setIsLoading(true);
    try {
      const response = await api.get("/servicos/contratados", {
        params: queryParams,
      });
      const servicosData = await handleServico(response.data.servicos);
      setServicos(servicosData || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      ErrorAlert("Erro ao buscar serviços. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleServico = async (servicos: any): Promise<Servico[]> => {
    interface Negociacoes {
      novo_valor: string;
    }

    interface ServicoInput {
      id: string;
      status: string;
      duracao: string;
      titulo: string;
      descricao: string;
      preco: string;
      negociacoes: Negociacoes[];
      id_prestador: string;
      imagem: string;
    }

    interface PessoaResponse {
      data: {
        nome: string;
        contato: string;
        avatar: string;
      };
    }

    try {
      const servicosProcessados = await Promise.all(
        servicos.map(async (servico: ServicoInput): Promise<Servico> => {
          const pessoa: PessoaResponse = await api.get(
            `/pessoas/username/${servico.id_prestador}`
          );

          const newServico: Servico = {
            id: servico.id,
            status: servico.status,
            duracao: servico.duracao,
            titulo: servico.titulo,
            descricao: servico.descricao,
            preco: servico.preco,
            valorPago: servico.negociacoes?.[0]?.novo_valor,
            nome_prestador: pessoa.data.nome,
            contato: pessoa.data.contato,
            data: new Date(), // mudar
            imagem: servico.imagem,
            avatar_prestador: pessoa.data.avatar,
          };

          return newServico;
        })
      );

      return servicosProcessados;
    } catch (error) {
      console.error("Erro ao processar serviços:", error);
      throw error;
    }
  };

  async function fetchServicos() {
    try {
      const response = await api.get("/servicos/contratados");
      const servicosData = await handleServico(response.data.servicos);
      setServicos(servicosData || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar serviços contratados:", error);
      ErrorAlert("Erro ao buscar serviços. Tente novamente.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="h-full p-4 md:p-8">
        <SearchFilter
          onSearch={handleSearch}
          externalFilters={externalFilters}
        />
        <ServicosList servicos={servicos} isLoading={isLoading} />
      </div>
    </div>
  );
}
