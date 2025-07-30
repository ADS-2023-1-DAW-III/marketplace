
import React from "react";

interface NegociacaoServicoCardProps {
  negociacao: NegociacaoCompleta;
  date: string;
  title: string;
  duration: string;
  description: string;
  name: string;
  email: string;
  originalPrice: number;
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
}) => {
  return (
    <div className="rounded-lg border p-4 shadow-md bg-white w-full">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center text-gray-700 text-sm min-w-[60px]">
          <div className="text-3xl">👤</div>
          <div className="mt-2">{date}</div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <span className="text-green-700 font-bold">{duration}</span>
          </div>

          <p className="text-sm text-gray-600 mt-1">{description}</p>

          <div className="mt-3 text-sm text-slate-800 font-semibold">{name}</div>
          <div className="text-sm text-slate-600">{email}</div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-xl font-bold text-slate-800">
                R${negociacao.novo_valor}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  R${originalPrice}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                Aceitar
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Negar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegociacaoServicoCard;
