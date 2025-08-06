import { useEffect, useState } from "react";
import { ErrorAlert } from "~/components/ui/AlertMessages";
import NegociacaoServicoCard from "~/components/ui/NegociacaoServicoCard";
import NegociacaoServicoTitle from "~/components/ui/NegociacaoServicoTitle";
import { useApi } from "~/hooks/services/api";
import type { NegociacaoCompleta, NegociacaoResponse } from "~/types/Negociacao";

export default function NegociacaoServicosPrestador() {
  const [negociacoes, setNegociacoes] = useState<NegociacaoCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const handleSearch = async (queryParams: URLSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/negociacoes", {
        params: queryParams,
      });
      setNegociacoes(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar negociações:", error);
      setError("Erro ao buscar negociações. Tente novamente.");
      ErrorAlert("Erro ao buscar negociações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptNegotiation = async (negotiationId: string) => {
    try {
      setActionLoading(negotiationId);
      await api.patch(`/negociacoes/${negotiationId}/aceitar`);
      
      // Atualizar a lista removendo a negociação aceita
      setNegociacoes(prev => prev.filter(n => n.id !== negotiationId));
      
      // Mostrar feedback positivo
      SuccessAlert("Negociação aceita com sucesso!");
    } catch (error) {
      console.error("Erro ao aceitar negociação:", error);
      ErrorAlert("Erro ao aceitar negociação. Tente novamente.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectNegotiation = async (negotiationId: string) => {
    try {
      setActionLoading(negotiationId);
      await api.patch(`/negociacoes/${negotiationId}/rejeitar`);
      
      // Atualizar a lista removendo a negociação rejeitada
      setNegociacoes(prev => prev.filter(n => n.id !== negotiationId));
      
      // Mostrar feedback
      InfoAlert("Negociação rejeitada.");
    } catch (error) {
      console.error("Erro ao rejeitar negociação:", error);
      ErrorAlert("Erro ao rejeitar negociação. Tente novamente.");
    } finally {
      setActionLoading(null);
    }
  };

  const refreshNegotiations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: listaIds } = await api.get("/negociacoes");

      const detalhesPromises = listaIds.map((n: NegociacaoResponse) =>
        api.get(`/negociacoes/${n.id}`).then((res) => res.data.negociacao)
      );

      const negociacoesCompletas = await Promise.all(detalhesPromises);
      setNegociacoes(negociacoesCompletas);
    } catch (error) {
      console.error("Erro ao buscar negociações:", error);
      setError("Erro ao buscar negociações. Tente novamente.");
      ErrorAlert("Erro ao buscar negociações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNegotiations();
  }, []);

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex sm:flex-col items-center sm:items-center min-w-[80px] sm:min-w-[60px]">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="ml-3 sm:ml-0 sm:mt-2 w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12 sm:py-16">
      <div className="text-6xl sm:text-8xl mb-4">📋</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
        Nenhuma negociação encontrada
      </h3>
      <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
        Quando você receber negociações de clientes, elas aparecerão aqui para você avaliar.
      </p>
      <button
        onClick={refreshNegotiations}
        className="inline-flex items-center px-4 py-2 bg-[#2D7B8B] text-white rounded-lg hover:bg-[#236670] transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Atualizar
      </button>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12 sm:py-16">
      <div className="text-6xl sm:text-8xl mb-4">⚠️</div>
      <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
        Erro ao carregar negociações
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
        {error || "Ocorreu um erro inesperado. Tente novamente."}
      </p>
      <button
        onClick={refreshNegotiations}
        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Tentar novamente
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header com título e ações */}
          <div className="mb-6 sm:mb-8">
            <NegociacaoServicoTitle 
              title="Negociações Recebidas" 
              subtitle="Gerencie as propostas de negociação dos seus clientes"
              count={negociacoes.length}
            />
            
            {/* Barra de ações */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="inline-flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Última atualização: {new Date().toLocaleTimeString('pt-BR')}
                </span>
              </div>
              
              <button
                onClick={refreshNegotiations}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Atualizando...' : 'Atualizar'}
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="w-full">
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorState />
            ) : negociacoes.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {negociacoes.map((negociacao) => (
                  <NegociacaoServicoCard
                    key={negociacao.id}
                    negociacao={negociacao}
                    date={new Date(negociacao.data).toLocaleDateString('pt-BR')}
                    title={negociacao.servico.titulo}
                    duration={`${negociacao.servico.duracao} minutos`}
                    description={negociacao.servico.descricao}
                    name={negociacao.pessoa.nome}
                    email={negociacao.pessoa.email}
                    originalPrice={Number(negociacao.servico.preco)}
                    onAccept={handleAcceptNegotiation}
                    onReject={handleRejectNegotiation}
                    isLoading={actionLoading === negociacao.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
