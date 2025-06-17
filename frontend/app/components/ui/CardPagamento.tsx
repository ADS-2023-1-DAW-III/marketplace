import React from 'react';

export default function CardPagamento({ user, status }) {

  //Possíveis estados de pagamento dos serviços contratados
  const getStatusInfo = () => {
    switch (status) {
      case 'concluido':
        return { text: 'Concluído', className: 'bg-green-500 text-white' };
      case 'em_andamento':
        return { text: 'Em andamento', className: 'bg-yellow-400 text-white' };
      case 'pendente':
        return { text: 'Pendente', className: 'bg-red-700 text-white' };
      default:
        return { text: 'Desconhecido', className: 'bg-gray-200 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    //Card de pagamento
    <div
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-xl shadow-md bg-white gap-4 text-[#307B8E]"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: '400' }}
    >
      <div className="flex flex-col items-start text-left w-full sm:w-auto ml-2">
        <img
          src={user.imageProfile}
          alt={user.name}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm break-words">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col w-full sm:flex-1 sm:ml-30">
        <p className="font-semibold">{user.servico}</p>
        <p className="text-sm">{user.descricao}</p>
        <p className="text-sm mt-1 text-[#307B8E]">R$ {user.preco}</p>
        <p className="text-sm text-[#307B8E]">Duração: {user.duracao}</p>
      </div>

      <div className="flex flex-col justify-center items-center sm:items-left sm:justify-center w-full sm:w-auto">
        <img
          src={user.image}
          alt="Serviço"
          className="w-full max-w-[100px] h-auto aspect-square object-cover rounded-lg mb-3"
        />
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusInfo.className}`}>
          {statusInfo.text}
        </span>
      </div>
    </div>
  );
}
