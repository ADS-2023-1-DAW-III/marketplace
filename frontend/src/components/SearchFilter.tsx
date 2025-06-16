// components/SearchFilter.tsx
import { useState } from 'react';

type FilterOptions = {
  searchTerm: string;
  category: string;
  priceRange: string;
  rating: string;
};

export default function SearchFilter() {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    category: '',
    priceRange: '',
    rating: ''
  });

  const categories = [
    'Suporte Técnico',
    'Motoristas e Entregadores',
    'Organização de Eventos',
    'Design Gráfico'
  ];

  const ratings = ['5 estrelas', '4 estrelas', '3 estrelas', '2 estrelas', '1 estrela'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filtros aplicados:', filters);
    // Aqui você pode adicionar a lógica para filtrar os serviços
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Busque aqui!</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Campo de Busca */}
        <div>
          <input
            type="text"
            name="searchTerm"
            placeholder="Digite aqui..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#307B8E] focus:border-transparent"
            value={filters.searchTerm}
            onChange={handleInputChange}
          />
        </div>

        {/* Seletor de Categoria */}
        <div>
          <select
            name="category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#307B8E] focus:border-transparent"
            value={filters.category}
            onChange={handleInputChange}
          >
            <option value="">Categoria</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Preço */}
        <div>
          <input
            type="text"
            name="priceRange"
            placeholder="Valor máximo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#307B8E] focus:border-transparent"
            value={filters.priceRange}
            onChange={handleInputChange}
          />
        </div>

        {/* Filtro de Avaliação */}
        <div>
          <select
            name="rating"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#307B8E] focus:border-transparent"
            value={filters.rating}
            onChange={handleInputChange}
          >
            <option value="">Avaliação</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de Ação (opcional) */}
        <div className="md:col-span-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#307B8E] text-white rounded-lg hover:bg-[#1a5f6e] transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}