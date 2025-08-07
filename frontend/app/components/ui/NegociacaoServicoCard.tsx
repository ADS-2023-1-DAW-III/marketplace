import React, { useState } from "react";

interface NegociacaoServicoCardProps {
  negociacao: NegociacaoCompleta;
  date: string;
  title: string;
  duration: string;
  description: string;
  name: string;
  email: string;
  originalPrice: number;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  isLoading?: boolean;
}

const NegociacaoServicoCard: React.FC<NegociacaoServicoCardProps> = ({
  negociacao,
  date,
  title,
  duration,
  description,
  name,
  email,
  originalPrice,
  onAccept,
  onReject,
  isLoading = false,
}) => {
  const [actionLoading, setActionLoading] = useState<'accept' | 'reject' | null>(null);

  const handleAccept = async () => {
    if (onAccept && !actionLoading) {
      setActionLoading('accept');
      try {
        await onAccept(negociacao.id);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleReject = async () => {
    if (onReject && !actionLoading) {
      setActionLoading('reject');
      try {
        await onReject(negociacao.id);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const discountPercentage = originalPrice > 0 
    ? Math.round(((originalPrice - negociacao.novo_valor) / originalPrice) * 100)
    : 0;

  return (
    <div className={`
      rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm bg-white w-full 
      transition-all duration-300 hover:shadow-lg hover:border-gray-300
      ${isLoading ? 'opacity-60 pointer-events-none' : ''}
    `}>
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Avatar e Data */}
        <div className="flex sm:flex-col items-center sm:items-center text-gray-700 text-sm min-w-[80px] sm:min-w-[60px]">
          <div className="text-2xl sm:text-3xl bg-gray-100 rounded-full p-2 sm:p-3 flex items-center justify-center">
            👤
          </div>
          <div className="ml-3 sm:ml-0 sm:mt-2 font-medium text-xs sm:text-sm text-center">
            {date}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 space-y-3">
          {/* Header com título e duração */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 leading-tight">
              {title}
            </h2>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 self-start">
              ⏱️ {duration}
            </span>
          </div>

          {/* Descrição */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Informações do cliente */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <div className="text-sm sm:text-base text-slate-800 font-semibold flex items-center">
              <span className="mr-2">👨‍💼</span>
              {name}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 flex items-center">
              <span className="mr-2">📧</span>
              <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">
                {email}
              </a>
            </div>
          </div>

          {/* Preços e Ações */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2">
            {/* Preços */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold text-slate-800">
                  {formatPrice(negociacao.novo_valor)}
                </span>
                {originalPrice > 0 && originalPrice !== negociacao.novo_valor && (
                  <>
                    <span className="text-sm sm:text-base text-gray-500 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    {discountPercentage > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        -{discountPercentage}%
                      </span>
                    )}
                  </>
                )}
              </div>
              {originalPrice > 0 && originalPrice !== negociacao.novo_valor && (
                <p className="text-xs text-green-600 font-medium">
                  Economia de {formatPrice(originalPrice - negociacao.novo_valor)}
                </p>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleAccept}
                disabled={actionLoading !== null}
                className={`
                  flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium text-sm sm:text-base
                  transition-all duration-200 transform hover:scale-105 active:scale-95
                  ${actionLoading === 'accept' 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
                  }
                  text-white shadow-md hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                `}
              >
                {actionLoading === 'accept' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Aceitando...
                  </span>
                ) : (
                  '✅ Aceitar'
                )}
              </button>
              
              <button 
                onClick={handleReject}
                disabled={actionLoading !== null}
                className={`
                  flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium text-sm sm:text-base
                  transition-all duration-200 transform hover:scale-105 active:scale-95
                  ${actionLoading === 'reject' 
                    ? 'bg-red-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                  }
                  text-white shadow-md hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                `}
              >
                {actionLoading === 'reject' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Negando...
                  </span>
                ) : (
                  '❌ Negar'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegociacaoServicoCard;