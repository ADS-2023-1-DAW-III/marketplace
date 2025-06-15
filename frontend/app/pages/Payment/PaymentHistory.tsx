import React, { useState } from 'react';
import CardPagamento from '~/components/ui/CardPagamento';
import Header from '~/components/ui/Header';
import { IconSearch } from '~/components/ui/Icons';

export default function PaymentHistory() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('concluido');

    const users = [{
        name: "Ana",
        email: "ana123@gmail",
        imageProfile: 'https://blog.emania.com.br/wp-content/uploads/2016/02/direitos-autorais-e-de-imagem.jpg',
        image: 'https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg',
        status: 'concluido'
    },
    {
        name: "Luis",
        email: "luis.12@gmail",
        imageProfile: 'https://thumbs.dreamstime.com/b/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-desenho-animado-m%C3%ADnimo-166146853.jpg',
        image: 'https://thumbs.dreamstime.com/z/cavalo-na-praia-no-por-do-sol-7115962.jpg',
        status: 'pendente'
    },
    {
        name: "Carlos",
        email: "carlos.99@gmail",
        imageProfile: 'https://randomuser.me/api/portraits/men/99.jpg',
        image: 'https://picsum.photos/id/237/200/300',
        status: 'em_andamento'
    }];

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) &&
        user.status === statusFilter
    );

    return (
        <div className="min-h-screen bg-gray-100 px-4 pt-16 pb-8">
            <Header />
            <div className="max-w-5xl mx-auto mt-8">
                <h1 className="text-xl font-semibold text-center mb-7 w-100 text-white py-2 rounded-full mx-auto" style={{backgroundColor: '#307B8E'}}>
                    Histórico de Pagamentos
                </h1>

                <div className="bg-white p-10 rounded-xl shadow-lg space-y-6 max-w-6xl mx-auto">
                    <div className="flex justify-center items-center mb-4 gap-1">
                        <div className="flex items-center border rounded-md p-2 w-full max-w-md"> 
                            <IconSearch className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-grow bg-transparent focus:outline-none"
                            />
                        </div>
                        <select 
                            className="p-2 border rounded-md min-w-[140px]" 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="concluido">Concluído</option>
                            <option value="pendente">Pendente</option>
                            <option value="em_andamento">Em andamento</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <CardPagamento key={index} user={user} status={user.status} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">Nenhum resultado encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
