import NegociacaoServicoCard from "~/components/ui/NegociacaoServicoCard";
import NegociacaoServicoTitle from "~/components/ui/NegociacaoServicoTitle";

export interface PagamentoResponseDto {
  id: string;
  id_abacate: string;
  data: Date;
  status: string;
  valor: number;
  id_pessoa: string;
  id_servico: string;
  url?: string;
}
export default function NegociacaoServicosPrestador() {
  // Dados genéricos para teste
  const mockNegociacao = {
    id: "1",
    pessoaId: "p1",
    servicoId: "s1",
    houve_negociacao: true,
    aceito: false,
    novo_valor: 150.0,
  };

  return (
    <div className="bg-gray-50 px-4 pt-16 pb-8">
      <div className="max-w-5xl mx-auto mt-10">
        <NegociacaoServicoTitle title="Negociações Recebidas" />
        <div className="flex flex-col items-center">
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
          <NegociacaoServicoCard
            negociacao={mockNegociacao}
            date={"29/07/2025"}
            title={"Serviço de Elétrica"}
            duration={"2h"}
            description={"Instalação de tomadas e revisão elétrica."}
            name={"João Silva"}
            email={"joao@email.com"}
            originalPrice={200}
          />
        </div>
      </div>
    </div>
  );
}
