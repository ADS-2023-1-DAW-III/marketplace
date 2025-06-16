// components/SearchFilter.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-[#307B8E] rounded-2xl p-6 text-white w-full max-w-4xl mx-auto space-y-6">
      <h1 className="text-center text-2xl font-bold">Busque aqui!</h1>

      {/* Campo de busca com ícone */}
      <div className="flex items-center bg-[#2a6a7c] rounded px-4 py-2">
        <input
          type="text"
          placeholder="Digite aqui..."
          className="flex-1 bg-transparent text-white placeholder-white outline-none border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-white" size={20} />
      </div>

      {/* Filtros em linha */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Categoria */}
        <select className="flex-1 bg-transparent border border-white rounded px-4 py-2 text-white placeholder-white outline-none">
          <option className="text-black">Categoria</option>
          <option className="text-black">Suporte Técnico</option>
          <option className="text-black">Motoristas</option>
          <option className="text-black">Eventos</option>
        </select>

        {/* Valor */}
        <input
          type="text"
          placeholder="Valor"
          className="flex-1 bg-white text-black rounded shadow px-4 py-2 outline-none"
        />

        {/* Avaliação */}
        <select className="flex-1 bg-transparent border border-white rounded px-4 py-2 text-white placeholder-white outline-none">
          <option className="text-black">Avaliação</option>
          <option className="text-black">5 estrelas</option>
          <option className="text-black">4 estrelas</option>
          <option className="text-black">3 estrelas</option>
        </select>
      </div>
    </div>
  );
}
