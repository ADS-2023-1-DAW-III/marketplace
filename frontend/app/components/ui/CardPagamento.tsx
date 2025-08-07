import { useEffect, useState } from "react";
import type { Pessoa } from "~/types/Pessoa";
import type { PagamentoInterface } from "~/types/Pagamento";
import { useApi } from "~/hooks/services/api";

type CardPagamentoProps = {
  readonly pagamento: PagamentoInterface;
};

function useImagem(url?: string) {
  const [src, setSrc] = useState<string | undefined>();
  const api = useApi();

  useEffect(() => {
    let isMounted = true;
    if (!url) {
      setSrc(undefined);
      return;
    }
    api
      .get(url, { responseType: "blob" })
      .then((response: any) => {
        if (isMounted) {
          const imageUrl = URL.createObjectURL(response.data);
          setSrc(imageUrl);
        }
      })
      .catch(() => setSrc(undefined));
    return () => {
      isMounted = false;
    };
  }, [url, api]);

  return src;
}

export default function CardPagamento({ pagamento }: CardPagamentoProps) {
  const { servico, valor, status } = pagamento;
  const pessoa: Pessoa | undefined = servico?.pessoa;

  // Imagem do perfil da pessoa
  const pessoaImageUrl = pessoa?.profileImageUrl;
  const pessoaImg = useImagem(pessoaImageUrl);

  // Imagem do serviço
  const servicoImg = useImagem(servico?.imagem);

  // Possíveis estados de pagamento dos serviços contratados
  const getStatusInfo = () => {
    switch (status) {
      case "PAGO":
        return { text: "Concluído", className: "bg-green-500 text-white" };
      case "EM_ANDAMENTO":
        return { text: "Em andamento", className: "bg-yellow-400 text-white" };
      case "PENDENTE":
        return { text: "Pendente", className: "bg-red-700 text-white" };
      default:
        return { text: "Desconhecido", className: "bg-gray-200 text-gray-800" };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-xl shadow-md bg-white gap-4 text-[#307B8E]"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: "400" }}
    >
      <div className="flex flex-col items-start text-left w-full sm:w-auto ml-2">
        <img
          src={pessoaImg}
          alt={pessoa?.nome || "Sem nome"}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            {pessoa?.nome || "Nome não informado"}
          </p>
          <p className="text-sm break-words">
            {pessoa?.email || "Email não informado"}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full sm:flex-1 sm:ml-30">
        <p className="font-semibold">
          {servico?.titulo || "Serviço não informado"}
        </p>
        <p className="text-sm">
          {servico?.descricao || "Descrição não informada"}
        </p>
        <p className="text-sm mt-1 text-[#307B8E]">R$ {valor}</p>
        <p className="text-sm text-[#307B8E]">
          Duração: {servico?.duracao || "-"}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center sm:items-left sm:justify-center w-full sm:w-auto">
        <img
          src={servicoImg}
          alt="Serviço"
          className="w-full max-w-[100px] h-auto aspect-square object-cover rounded-lg mb-3"
        />
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${statusInfo.className}`}
        >
          {statusInfo.text}
        </span>
      </div>
    </div>
  );
}
