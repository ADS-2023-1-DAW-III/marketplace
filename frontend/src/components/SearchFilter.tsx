// components/SearchFilter.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
      <div className="container bg-[#307B8E] rounded-2xl py-8 px-16 text-white w-full max-w-4xl mx-auto mt-20 space-y-6 mb-36">
        <h1 className="text-center text-[36px] font-bold">Busque aqui!</h1>

        {/* Campo de busca com ícone */}
        <div className="flex items-center bg-transparent px-4 py-2 border-1 border-white">
          <input
              type="text"
              placeholder="Digite aqui..."
              className="flex-1 bg-transparent text-white placeholder-white outline-none"
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
