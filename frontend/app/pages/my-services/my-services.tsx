import { Button } from "~/components/ui/button";
import { EmptyState } from "~/components/ui/Empty-State";
import { Input } from "~/components/ui/input";
import { useState } from 'react';
import SearchInput from "~/components/ui/search-input";
import SectionCard from "~/components/ui/section-card";
import SelectInput from "~/components/ui/select-input";
import ServiceCard from "~/components/ui/service-card";

export default function MyServices() {
  const [services, setServices] = useState<any[]>([]); 
  
  const handleAddFirstService = () => {
    console.log("Cadastrar primeiro serviço");
  };
  
  return (
    <div>
      <SectionCard title="Meus Serviços">
        <div className="flex flex-col md:flex-row w-full max-w-3xl gap-4">
          <SearchInput
            placeholder="Digite aqui..."
            onSearch={() => {}}
          />

          <SelectInput
            options={[
              { value: "", label: "Categoria" },
              { value: "design", label: "Design" },
              { value: "programacao", label: "Programação" },
              { value: "marketing", label: "Marketing" },
            ]}
          />

        <Button className="bg-[#103A57] text-white" size="lg">
          Cadastrar Novo Serviço
        </Button>
        </div>
      </SectionCard>

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="font-poppins font-semibold text-[28px] leading-[100%] tracking-[0%] text-[#366B2B]">
          Serviços Recentes
        </h2>

      </div>

      <ServiceCard
        title="Suporte Técnico (Hardware e Software)"
        description="Lorem ipsum dolor sit amet. Quo nobis soluta qui rerum dolore cum quasi laudantium et autem aperiam aut nemo..."
        price="R$100.00"
        duration="30min"
        serviceType="Manutenção"
        className="mb-4"
      />    
      <ServiceCard
        title="Suporte Técnico"
        description="Descrição do serviço..."
        price="R$100,00"
        duration="30min"
        serviceType="Manutenção"
        onEdit={() => console.log("Editar serviço")}
        onDelete={() => console.log("Excluir serviço")}
      />
   
    <div className="flex h-full items-center justify-center p-4">
      <EmptyState
        title="Você ainda não cadastrou nenhum serviço"
        description="Clique em 'Cadastrar Meu Primeiro Serviço' para começar"
        buttonText="Cadastrar Meu Primeiro Serviço"
        onButtonClick={handleAddFirstService}
      />
    </div>

    </div>


  );
}
