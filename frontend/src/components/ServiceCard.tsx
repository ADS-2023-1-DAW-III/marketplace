// components/ServiceCard.tsx
import { Clock, AlertCircle } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  price: number;
  duration: string;
  isNegotiable: boolean;
};

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  isNegotiable
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
      {/* Seção Superior */}
      <div className="px-6 pt-5 pb-3">
        <div className="flex justify-between items-center mb-3">
          {/* Tag Negociável/Não Negociável */}
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
            isNegotiable 
              ? 'bg-green-50 text-green-700 border border-green-100' 
              : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            <AlertCircle className="mr-1 h-3 w-3" />
            {isNegotiable ? 'Negociável' : 'Não negociável'}
          </span>
          
          {/* Duração */}
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="mr-1 h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Título do Serviço */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        
        {/* Descrição */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      {/* Divisor */}
      <div className="border-t border-gray-100 mx-6"></div>

      {/* Seção Inferior */}
      <div className="px-6 py-3 flex justify-between items-center bg-gray-50">
        {/* Preço */}
        <span className="text-xl font-bold text-[#307B8E]">
          R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
        
        {/* Botão */}
        <button className="text-sm font-medium text-[#307B8E] hover:text-[#1a5f6e] transition-colors flex items-center">
          Ver
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}