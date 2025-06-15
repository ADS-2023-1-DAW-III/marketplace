import React from 'react';

export default function CardPagamento({ user, status }) {
  const getStatusInfo = () => {
    switch(status) {
      case 'concluido':
        return { text: 'Concluído', className: 'bg-green-200 text-green-800' };
      case 'em_andamento':
        return { text: 'Em andamento', className: 'bg-yellow-200 text-yellow-800' };
      case 'pendente':
        return { text: 'Pendente', className: 'bg-red-200 text-red-800' };
      default:
        return { text: 'Desconhecido', className: 'bg-gray-200 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex justify-between items-center p-4 border rounded-xl shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img src={user.imageProfile} alt={user.name} className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="flex-1 px-6">
        <p className="font-semibold">Suporte Técnico</p>
        <p className="text-sm text-gray-600">Assistência técnica em dispositivos eletrônicos</p>
        <p className="text-sm text-black mt-1">R$ 200</p>
        <p className="text-sm text-gray-500">Duração: 3 horas</p>
      </div>

      <div className="flex flex-col items-center">
        <img src={user.image} alt="Serviço" className="w-20 h-20 object-cover rounded-lg mb-2" />
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusInfo.className}`}>
          {statusInfo.text}
        </span>
      </div>
    </div>
  );
}
