import Header from "../../components/ui/Header";
import ServiceCard from "../../components/ServiceCard";
import Hero from "../../components/ui/Hero";
import SearchFilter from '../../components/SearchFilter';

export default function Home() {
  const services = [
    {
      title: "Suporte Técnico (Hardware e Software)",
      description: "Manutenção de computadores e instalação de software profissional com garantia.",
      price: 100,
      duration: "30min",
      isNegotiable: false,
      rating: 5
    },
    {
      title: "Motorista Particular",
      description: "Transporte seguro para qualquer destino na cidade com veículo confortável.",
      price: 200,
      duration: "1h",
      isNegotiable: true,
      rating: 4
    },
    {
      title: "Organização de Casamentos",
      description: "Planejamento completo desde a decoração até o buffet.",
      price: 1500,
      duration: "Personalizado",
      isNegotiable: true,
      rating: 5
    }
  ];

  return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#307B8E] pb-20">
          <Header />
          <Hero />
        </div>

        <main className="container mx-auto px-4 py-8 -mt-10 relative z-10">
          <div className="mb-12">
            <SearchFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    isNegotiable={service.isNegotiable}
                />
            ))}
          </div>
        </main>
      </div>
  );
}