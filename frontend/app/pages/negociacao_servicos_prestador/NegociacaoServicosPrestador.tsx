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

export default function NegociacaoServicosPrestador() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoResponse[]>([]);
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
        const response = await api.get("/negociacoes");
        setNegociacoes(response.data || []);
        console.log(response.data)
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
                  date={"2025-07-30"}
                  title={`Serviço ID ${negociacao.servicoId}`}
                  duration={"2 horas"}
                  description={"Descrição simulada para teste"}
                  name={`Prestador ${index + 1}`}
                  email={`prestador${index + 1}@email.com`}
                  originalPrice={negociacao.novo_valor + 50}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
