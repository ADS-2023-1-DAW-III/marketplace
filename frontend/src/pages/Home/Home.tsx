import Header from "../../components/ui/Header";
import CategoryFilter from "src/components/Categoryfilter";
import ServiceCard from "../../components/ServiceCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Seção Hero */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EXPLORADOR</h1>
          <p className="text-muted-foreground mt-2">
            Encontre soluções para o dia a dia, divulgue seus serviços e crie uma rede de contatos.
          </p>
        </section>

        {/* Filtros */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <CategoryFilter />
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