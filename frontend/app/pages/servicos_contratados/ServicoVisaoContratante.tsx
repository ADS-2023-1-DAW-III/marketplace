"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";

import { useApi } from "~/hooks/services/api";
import { Button } from "~/components/ui/button";
import { ErrorAlert } from "~/components/ui/AlertMessages";
import type { Servico, ServicoDetalhadoInterface } from "~/types/Servico";
import type { AvaliacaoResponse } from "~/types/Avaliacao";
import { Avatar } from "~/components/ui/avatar";
import { AuthContext } from "~/hooks/context/authContext";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const adaptarServicoDetalhado = (data: ServicoDetalhadoInterface): Servico => ({
  id: data.id,
  status: data.status,
  duracao: String(data.duracao),
  titulo: data.titulo,
  descricao: data.descricao,
  preco: data.preco,
  imagem: data.caminhoImagem,
  nome_prestador: data.pessoa?.nome,
  contato: data.pessoa?.email,
  avatar_prestador: "",
  pessoa: data.pessoa,
  data: undefined,
});

export default function ServicoVisaoContratante() {
  const { id: servicoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApi();
  const { username } = useContext(AuthContext);

  const [negociacoes, setNegociacoes] = useState<ServicoDetalhadoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [servico, setServico] = useState<ServicoDetalhadoInterface | null>(null);

  useEffect(() => {
    if (!servicoId) {
      ErrorAlert("ID do serviço não encontrado na URL.");
      return;
    }

    const fetchServicoDetalhado = async () => {

      try {
        const response = await api.get<{ negociacoes: ServicoDetalhadoInterface[] }>(
          `/negociacoes/contratante/${username}`
        );


        setNegociacoes(negociacoes);


        const encontrado = negociacoes.find((item) => item.id === servicoId);

        if (!encontrado) {
          ErrorAlert("Serviço não encontrado.");
        } else {
          setServico(encontrado);
        }
      } catch (err) {
        ErrorAlert("Não foi possível carregar os dados do serviço.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicoDetalhado();
  }, [loading]);

  if (loading) {
    return <div className="p-8 text-center">Carregando detalhes...</div>;
  }

  if (!servico) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Serviço não encontrado.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    );
  }

  const servicoAdaptado = adaptarServicoDetalhado(servico);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <header className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Negociável</h1>
      </header>

      <main>
        <section className="mb-8 p-6 border rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">{servico.titulo}</h2>
          <div className="flex justify-center mb-4">
            <img
              src={servico.caminhoImagem || 'https://www.enroma.com/julio-cesar/'}
              alt={servico.titulo}
              className="rounded-lg max-w-sm w-full object-cover"
            />
          </div>
          <p className="text-gray-600 text-center mb-6">{servico.descricao}</p>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
            <div>
              <span className="text-2xl font-bold text-teal-600">
                R$ {parseFloat(servico.preco).toFixed(2)}
              </span>
              <span className="text-gray-500 ml-2">/ {servico.duracao}h</span>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">Pagar</Button>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {(servico.categorias || []).map((cat) => (
              <span
                key={cat.nome}
                className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {cat.nome}
              </span>
            ))}
          </div>
        </section>

        {/* Prestador */}
        <section className="mb-8 p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Informações do Prestador</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {/* <AvatarFallback>{servico.pessoa.nome.charAt(0)}</AvatarFallback> */}
            </Avatar>
            <div>
              <p className="font-semibold text-lg text-gray-900">{servico.pessoa.nome}</p>
              <p className="text-gray-500">{servico.pessoa.email}</p>
            </div>
          </div>
        </section>

        {/* Negociação */}
        <section className="mb-8 p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Negociação de Valor</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Proponha um novo valor ou envie uma mensagem."
              className="flex-grow border p-2 rounded-md"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">Enviar</Button>
          </div>
        </section>

        {/* Feedback */}
        <section className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Feedback</h3>

          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700">Deixe sua avaliação:</p>
            <StarRating rating={0} />
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Escreva seu comentário..."
                className="flex-grow border p-2 rounded-md"
              />
              <Button className="bg-teal-600 hover:bg-teal-700">Enviar</Button>
            </div>
          </div>

          <div className="space-y-5">
            {(servico.avaliacoes || []).length > 0 ? (
              servico.avaliacoes.map((avaliacao: AvaliacaoResponse) => (
                <div key={avaliacao.id} className="border-t border-gray-200 pt-4">
                  <StarRating rating={avaliacao.estrelas} />
                  <p className="text-gray-600 mt-2">{avaliacao.comentario}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Ainda não há avaliações para este serviço.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}