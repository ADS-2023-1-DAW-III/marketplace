import React, { useState } from 'react';
import CardPagamento from '~/components/ui/CardPagamento';
import Header from '~/components/ui/Header';
import { IconSearch } from '~/components/ui/Icons';
import { mockPayments } from '~/data/mockData';
import { ClipboardList } from 'lucide-react';

export default function PaymentHistory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

    const filteredUsers = mockPayments.filter(
    (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter ? user.status === statusFilter : true)
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-16 pb-8">
      <Header />

      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-lg text-center mb-14 w-fit px-50 mx-auto text-white py-1 rounded-full" style={{ backgroundColor: '#307B8E', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
            Histórico de Pagamentos
        </h1>

{/* Caixa de busca */}

        <div className="bg-white p-4 sm:p-10 rounded-xl shadow-lg space-y-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center sm:items-center mb-4 gap-3">
            <div className="flex items-center border rounded-md p-2 w-full sm:max-w-md">
              <IconSearch className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow bg-transparent focus:outline-none"
              />
            </div>
            {/* Seletor(Exibir todos("Vazio"), Concluído, Pendente, Em Andamento) */}
            <select
              className="p-2 border rounded-md w-full sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value=""></option>
              <option value="concluido">Concluído</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em andamento</option>
            </select>
          </div>
{/* Filtro pelo status e caso o mock esteja vazio */}
          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <CardPagamento key={index} user={user} status={user.status} />
              ))
            ) : (
                
              <div className="flex flex-col items-center justify-center py-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '400' }}>
                <ClipboardList size={150} className="mb-4" />
                <p className="text-xl font-semibold">Nenhum serviço contratado ainda.</p>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
