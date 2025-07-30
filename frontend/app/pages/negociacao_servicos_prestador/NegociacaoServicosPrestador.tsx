import { useEffect, useState } from "react";
import { ErrorAlert } from "~/components/ui/AlertMessages";
import NegociacaoServicoCard from "~/components/ui/NegociacaoServicoCard";
import NegociacaoServicoTitle from "~/components/ui/NegociacaoServicoTitle";
import { useApi } from "~/hooks/services/api";

interface NegociacaoResponse {
  id: string;
  pessoaId: string;
  servicoId: string;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
}

interface NegociacaoCompleta {
  id: string;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
  data: string;
  pessoa: {
    nome: string;
    email: string;
  };
  servico: {
    id: string;
    titulo: string;
    descricao: string;
    duracao: number;
    preco: number;
  };
}

export default function NegociacaoServicosPrestador() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const handleSearch = async (queryParams: URLSearchParams) => {
    try {
      const response = await api.get("/negociacoes", {
        params: queryParams,
      });
      setNegociacoes(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar negociações:", error);
      ErrorAlert("Erro ao buscar negociações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data: listaIds } = await api.get("/negociacoes");

        const detalhesPromises = listaIds.map((n: NegociacaoResponse) =>
          api.get(`/negociacoes/${n.id}`).then((res) => res.data.negociacao)
        );

        const negociacoesCompletas = await Promise.all(detalhesPromises);
        setNegociacoes(negociacoesCompletas);
      } catch (error) {
        console.error("Erro ao buscar negociações:", error);
        ErrorAlert("Erro ao buscar negociações. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 px-4 pt-16 pb-8">
      <div className="mx-auto mt-10">
        <NegociacaoServicoTitle title="Negociações Recebidas" />
        <div className="flex flex-col items-center w-full">
          {loading ? (
            <p className="text-center text-lg font-poppins text-[#307B8E] font-bold">
              Carregando serviços...
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {negociacoes.map((negociacao, index) => (
                <NegociacaoServicoCard
                  key={negociacao.id}
                  negociacao={negociacao}
                  date={new Date(negociacao.data).toLocaleDateString()}
                  title={negociacao.servico.titulo}
                  duration={`${negociacao.servico.duracao} minutos`}
                  description={negociacao.servico.descricao}
                  name={negociacao.pessoa.nome}
                  email={negociacao.pessoa.email}
                  originalPrice={Number(negociacao.servico.preco)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
