import { useContext, useEffect, useState } from "react";
import CardPagamento from "~/components/ui/CardPagamento";
import { AuthContext } from "~/hooks/context/authContext";
import { ServicoEmptyState } from "~/components/ui/ServicoEmptyState";
import { useApi } from "~/hooks/services/api";
import type { Servico } from "~/types/Servico";
import type { PagamentoInterface } from "~/types/Pagamento";

export interface PagamentoResponseDto {
  id: string;
  id_abacate: string;
  data: Date;
  status: string;
  valor: number;
  id_pessoa: string;
  id_servico: string;
  url?: string;
}

export default function HistoricoPagamento() {
  const [pagamentos, setPagamentos] = useState<PagamentoInterface[]>();
  const { username } = useContext(AuthContext);
  const api = useApi();

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await api.get(`/pagamentos/historico/JL`);
        const pagamentosData = response.data
          .pagamentos as PagamentoResponseDto[];

        const pagamentosComPessoa: PagamentoInterface[] = await Promise.all(
          pagamentosData.map(async (pagamento) => {
            try {
              const servicoResponse = await api.get(
                `/servicos/${pagamento.id_servico}`
              );
              const servico: Servico = servicoResponse.data;
              return {
                id: pagamento.id,
                data: pagamento.data,
                valor: pagamento.valor,
                servico,
                status: pagamento.status,
                url_abacate: pagamento.url,
              };
            } catch (error) {
              console.error("Erro ao buscar serviço:", error);
              return {
                id: pagamento.id,
                data: pagamento.data,
                valor: pagamento.valor,
                servico: {
                  id: pagamento.id_servico,
                  status: "Indisponível",
                  duracao: "Indisponível",
                  titulo: "Indisponível",
                  descricao: "Indisponível",
                  preco: "0",
                  imagem: "",
                  avatar_prestador: "",
                },
                status: pagamento.status,
              };
            }
          })
        );

        setPagamentos(pagamentosComPessoa);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      }
    };

    fetchPagamentos();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-16 pb-8">
      <div className="max-w-5xl mx-auto mt-10">
        <h1
          className="text-lg text-center mb-14 w-fit px-50 mx-auto text-white py-1 rounded-full"
          style={{
            backgroundColor: "#307B8E",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
          }}
        >
          Histórico de Pagamentos
        </h1>

        {/* Caixa de busca */}

        <div className="bg-white p-4 sm:p-10 rounded-xl shadow-lg space-y-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center sm:items-center mb-4 gap-3"></div>
          {/* Filtro pelo status e caso o mock esteja vazio */}
          <div className="space-y-4">
            {pagamentos && pagamentos.length > 0 ? (
              pagamentos.map((pagamento, index) => (
                <CardPagamento key={index} pagamento={pagamento} />
              ))
            ) : (
              <ServicoEmptyState message="Nenhum serviço contratado até o momento." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
