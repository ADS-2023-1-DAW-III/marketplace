import { useState } from "react";
import { Button } from "~/components/ui/button";
import SearchFilter from "~/components/ui/SearchFilter";
import ServiceCard from "~/components/ui/ServiceCard";
import { ServicoEmptyState } from "~/components/ui/ServicoEmptyState";
import type { ServicoDetalhadoInterface } from "~/types/Servico";
import { useNavigate } from "react-router-dom";

export default function SericoPrestados() {
    const navigate = useNavigate();
  
  const [services, setServices] = useState<ServicoDetalhadoInterface[]>([]);
  
  const handleAddFirstService = () => {
    navigate("/servicos_prestados/service-registration");
  };

  return (
    <div className="h-full p-4 md:p-8 bg-gray-50">
      <SearchFilter title="Meus Serviços" categoria />

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-2 mb-10">
        <h2 className="font-poppins font-semibold text-[28px] leading-[100%] tracking-[0%] text-[#366B2B]">
          Serviços Recentes
        </h2>
        <Button
          className="bg-[#103A57] text-white flex items-center justify-center hover:bg-[#103A57] hover:text-white transition-none"
          style={{
            width: "325.444px",
            height: "48px",
            top: "131px",
            left: "416px",
            borderRadius: "10.21px",
            padding: "13.61px 27.22px",
            gap: "17.01px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "23.82px",
          }}
          onClick={handleAddFirstService}
        >
          Cadastrar Novo Serviço
        </Button>
      </div>

      {services.length > 0 ? (
        services.map((service) => (
          <ServiceCard
            id={service.id}
            title={service.titulo}
            description={service.descricao}
            price={service.preco}
            duration={service.duracao.toString()}
            categoria={service?.categorias[0]}
            isNegotiable
            image={service.caminhoImagem}
          />
        ))
      ) : (
        <ServicoEmptyState message="Você ainda não possui nenhum serviço cadastrado." />
      )}
    </div>
  );
}
