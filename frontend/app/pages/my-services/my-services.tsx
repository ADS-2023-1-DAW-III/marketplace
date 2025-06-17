import { EmptyState } from "~/components/ui/Empty-State";
import { useState } from 'react';
import SectionCard from "~/components/ui/section-card";
import ServiceCard from "~/components/ui/service-card";

export default function MyServices() {
  const [services, setServices] = useState<any[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const mockServices = [
    {
      id: 1,
      title: "Suporte Técnico (Hardware e Software)",
      description: "LLorem ipsum dolor sit amet. Aut molestias autem et voluptatum earum qui deleniti quis aut eligendi excepturi. Ea molestias quia ea optio pariatur et iure eaque est saepe molestiae. Et dolorem quam 33 ratione deleniti est quisquam fugiat est debitis veniam. Et ullam dicta non voluptas soluta u...",
      price: "R$100.00",
      duration: "30min",
      serviceType: "Manutenção",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
      category: "dev"
    },
        {
  id: 2,
  title: "Suporte Técnico (Hardware e Software)",
  description: "LLorem ipsum dolor sit amet. Aut molestias autem et voluptatum earum qui deleniti quis aut eligendi excepturi. Ea molestias quia ea optio pariatur et iure eaque est saepe molestiae. Et dolorem quam 33 ratione deleniti est quisquam fugiat est debitis veniam. Et ullam dicta non voluptas soluta u...",
  price: "R$360.00",
  duration: "30min",
  serviceType: "Manutenção",
  imageUrl: "https://cdn-icons-png.flaticon.com/512/4380/4380496.png",
  category: "dev"
    },
  ];

  const handleAddFirstService = () => {
    console.log("Cadastrar primeiro serviço");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Pesquisar:", term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log("Categoria:", category);
  };

  const filteredServices = selectedCategory 
    ? mockServices.filter(service => service.category === selectedCategory)
    : mockServices;

  const getCategoryName = () => {
    if (!selectedCategory) return "Recentes";
    const category = [
      { value: "", label: "Categorias" },
      { value: "design", label: "Design" },
      { value: "dev", label: "Desenvolvimento" }
    ].find(cat => cat.value === selectedCategory);
    return category?.label || "Recentes";
  };

  return (
    <div>
      <SectionCard
        title="Meus Serviços"
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onAddService={handleAddFirstService}
        categories={[
          { value: "", label: "Todas categorias" },
          { value: "design", label: "Design" },
          { value: "dev", label: "Desenvolvimento" },
          { value: "Manutenção", label: "Manutenção" }
        ]}
      />

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-2 mb-10">
        <h2 className="font-poppins font-semibold text-[28px] leading-[100%] tracking-[0%] text-[#366B2B]">
          Serviços {getCategoryName()}
        </h2>
      </div>

      {filteredServices.length > 0 ? (
        filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            duration={service.duration}
            serviceType={service.serviceType}
            imageUrl={service.imageUrl}
            className="mb-4"
          />
        ))
      ) : (
        <div className="flex h-full items-center justify-center p-4">
          <EmptyState
            title={`Nenhum serviço encontrado${selectedCategory ? ` na categoria ${getCategoryName()}` : ''}`}
            description={selectedCategory ? 
              "Tente alterar a categoria ou cadastrar um novo serviço" : 
              "Clique em 'Cadastrar Meu Primeiro Serviço' para começar"}
            buttonText="Cadastrar Novo Serviço"
            onButtonClick={handleAddFirstService}
          />
        </div>
      )}
    </div>
  );
}