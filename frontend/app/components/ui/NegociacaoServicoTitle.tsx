import React from "react";

interface NegociacaoServicoTitleProps {
  title: string;
  className?: string;
  subtitle?: string;
  count?: number;
}

export default function NegociacaoServicoTitle({ 
  title, 
  subtitle,
  count,
  className = "" 
}: NegociacaoServicoTitleProps) {
  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-r from-[#2D7B8B] via-[#3A8A9B] to-[#2D7B8B] 
      text-white text-center rounded-2xl w-full max-w-4xl mx-auto mb-6 sm:mb-8
      shadow-lg hover:shadow-xl transition-all duration-300
      ${className}
    `}>
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 py-4 sm:py-6 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Título principal */}
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-white/90 mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Contador (se fornecido) */}
          {count !== undefined && (
            <div className="flex items-center justify-center sm:justify-end">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                <span className="text-sm sm:text-base font-bold">
                  {count} {count === 1 ? 'negociação' : 'negociações'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Indicador visual decorativo */}
        <div className="flex justify-center mt-3 sm:mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Bordas decorativas */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
}
