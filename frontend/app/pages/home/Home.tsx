import ServiceCard from "~/components/ui/ServiceCard";
import Hero from "~/components/ui/Hero";
import SearchFilter from '~/components/ui/SearchFilter';
import type {MetaArgs} from "react-router";
import {useEffect, useState} from "react";

export function meta(_args: MetaArgs) {
    return [
        { title: "Home" },
        {
            name: "Marketplace",
            content: "Bem vindo ao Home do Marketplace",
        },
    ];
}

type Service = {
    id: string;
    titulo: string;
    preco: number;
    duracao: number;
    id_imagem: string;
    eh_negociavel: boolean;
    categoria: {
        nome: string;
        descricao: string;
    };
};

export default function Home() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/servicos")
            .then(res => res.json())
            .then(data => {
                setServices(data.servicos);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar serviços:", error);
                setLoading(false);
            });
    }, []);


    return (
        <div className="min-h-screen bg-white">
            <div className="bg-[#307B8E] pb-20">
                <Hero/>
            </div>

            <main className="container mx-auto px-4 py-8 -mt-10 relative z-10 pb-20">
                <div className="mb-12">
                    <SearchFilter/>
                </div>

                {loading ? (
                    <p className="text-center text-lg font-poppins text-[#307B8E] font-bold">Carregando serviços...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                title={service.titulo}
                                description={service.categoria.descricao}
                                price={service.preco}
                                duration={`${service.duracao}min`}
                                isNegotiable={service.eh_negociavel}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}