import ServiceCard from "~/components/ui/ServiceCard";
import Hero from "~/components/ui/Hero";
import SearchFilter from "~/components/ui/SearchFilter";
import type { MetaArgs } from "react-router";
import { useEffect, useState } from "react";
import { useApi } from "~/hooks/services/api";
import { ErrorAlert } from "~/components/ui/AlertMessages";

export function meta(_args: MetaArgs) {
  return [
    { title: "Home" },
    {
      name: "Marketplace",
      content: "Bem vindo ao Home do Marketplace",
    },
  ];
}

type Service = {
  id: string;
  titulo: string;
  preco: string;
  duracao: number;
  id_imagem: string;
  eh_negociavel: boolean;
  descricao: string;
  categoria: {
    nome: string;
    descricao: string;
  };
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const handleSearch = async (queryParams: URLSearchParams) => {
    try {
      const response = await api.get("/servicos", {
        params: queryParams,
      });
      setServices(response.data.sevicos || []);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      ErrorAlert("Erro ao buscar serviços. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get("/servicos");
        setServices(response.data.servicos || []);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        ErrorAlert("Erro ao buscar serviços. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-[#307B8E]">
        <Hero />
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10 pb-20">
        <div className="mb-12">
          <SearchFilter onSearch={handleSearch} />
        </div>

        {loading ? (
          <p className="text-center text-lg font-poppins text-[#307B8E] font-bold">
            Carregando serviços...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.titulo}
                description={service.descricao}
                price={service.preco}
                duration={`${service.duracao}min`}
                isNegotiable={service.eh_negociavel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
