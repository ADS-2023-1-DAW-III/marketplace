import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import SearchFilter from "~/components/ui/SearchFilter";
import ServiceCard from "~/components/ui/ServiceCard";
import { ServicoEmptyState } from "~/components/ui/ServicoEmptyState";
import type { ServicoDetalhadoInterface } from "~/types/Servico";
import { useApi } from "~/hooks/services/api";

export default function ServicosPrestados() {
  const [services, setServices] = useState<ServicoDetalhadoInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();

  const handleSearch = async (queryParams: URLSearchParams) => {
    setIsLoading(true);
    try {
      const response = await api.get("/servicos/prestados", {
        params: queryParams,
      });
      setServices(response.data.servicos);
    } catch (error) {
      console.error("Error searching services:", error);
      // Adicionar um alerta de erro para o usuário
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialParams = new URLSearchParams();
    handleSearch(initialParams);
  }, []);

  const handleAddFirst = () => {
    console.log("Cadastro de serviço ainda não mapeado.");
  };

  return (
    <div className="h-full p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilter
          title="Meus Serviços"
          valorFiltro
          onSearch={handleSearch}
          onFiltersChange={handleSearch}
        />

        <div className="flex items-center justify-between mt-2 mb-10">
          <h2 className="font-poppins font-semibold text-[28px] leading-[100%] tracking-[0%] text-[#366B2B]">
            Serviços Recentes
          </h2>
          <Button
            className="bg-[#103A57] text-white hover:bg-[#103A57] hover:text-white transition-none text-[23.82px] font-medium rounded-[10.21px] px-[27.22px] py-[13.61px]"
            style={{ width: "325.444px", height: "48px", gap: "17.01px" }}
            onClick={handleAddFirst}
          >
            Cadastrar Novo Serviço
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div>Carregando...</div>
          ) : services.length > 0 ? (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.titulo}
                description={service.descricao}
                price={service.preco}
                duration={service.duracao.toString()}
                categoria={service?.categorias[0]}
                isNegotiable
                image={service.caminhoImagem} id={""}              />
            ))
          ) : (
            <ServicoEmptyState message="Você ainda não possui nenhum serviço cadastrado." />
          )}
        </div>
      </div>
    </div>
  );
}
