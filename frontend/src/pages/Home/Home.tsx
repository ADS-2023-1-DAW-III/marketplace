import Header from "../../components/ui/Header";
import ServiceCard from "../../components/ServiceCard";
import Hero from "../../components/ui/Hero";
import SearchFilter from '../../components/SearchFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#307B8E] h-screen">
          <Header />
        <Hero />
      </div>
      
      <main className="container mx-auto px-4 py-8">

        {/* Sua listagem de serviços aqui */}
        <div className="container mx-auto px-4 py-8">
          <SearchFilter />
        </div>

        {/* Listagem de Serviços */}
        <div className="grid gap-4">
          <ServiceCard
            title="Suporte Técnico"
            description="Manutenção de computadores e instalação de software"
            price={100}
            duration="30min"
            isNegotiable={false}
          />
          <ServiceCard
            title="Motorista Particular"
            description="Transporte seguro para qualquer destino"
            price={200}
            duration="1h"
            isNegotiable={true}
          />
          <ServiceCard
            title="Organização de Eventos"
            description="Planejamento completo para casamentos e festas"
            price={1500}
            duration="Personalizado"
            isNegotiable={true}
          />
        </div>
      </main>
    </div>
  );
}