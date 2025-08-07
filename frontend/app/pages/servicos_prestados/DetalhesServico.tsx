"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  DollarSign,
  Search,
  ArrowLeft,
  ChevronsUpDown,
  ArchiveX,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { useApi } from "~/hooks/services/api";

interface Negotiation {
  id: string;
  aceito: boolean;
  data: string;
  houve_negociacao: boolean;
  novo_valor: string;
}

type Categoria = {
  nome: string;
  descricao: string;
};

type Pessoa = {
  username: string;
  abacate_id: string;
  nome: string;
  email: string;
  contato: string;
  cpf: string;
  profileImageName: string | null;
};

type Servico = {
  id: string;
  caminhoImagem: string;
  titulo: string;
  descricao: string;
  preco: string;
  duracao: number;
  status: string;
  eh_negociavel: boolean;
  categorias: Categoria[];
  pessoa: Pessoa;
  negociacoes: Negotiation[];
};

export default function ServiceDetails() {
  const { id: serviceId } = useParams<{ id: string }>();
  const api = useApi();
  const navigate = useNavigate();

  const [servico, setServico] = useState<Servico | null>(null);
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    if (!serviceId) return;

    async function fetchServiceDetails() {
      try {
        const data = await api.get(`/servicos/${serviceId}`);
        const servico: Servico = data.data;
        setServico(servico);
        fetchNegotiations(servico.pessoa.username);
      } catch (error) {
        console.error("Erro ao buscar serviço:", error);
      }
    }

    async function fetchNegotiations(prestadorId: string) {
      try {
        const response = await api.get(`/negociacoes/prestador/${prestadorId}`);
        const negociacoes = response.data.negociacoes;

        console.log(negociacoes);

        const parsed: Negotiation[] = negociacoes.map((n: any) => ({
          id: n.id,
          aceito: n.aceito,
          data: n.data,
          houve_negociacao: n.houve_negociacao,
          novo_valor: n.novo_valor,
        }));

        setNegotiations(parsed);
      } catch (error) {
        console.error("Erro ao buscar negociações:", error);
      }
    }

    fetchServiceDetails();
  }, [serviceId]);

  async function handleAccept(negociacaoId: string) {
    try {
      await api.put(`/negociacoes/${negociacaoId}/aceitar`);
      const updated = negotiations.map((n) =>
        n.id === negociacaoId ? { ...n, aceito: true } : n
      );
      setNegotiations(updated);
    } catch (error) {
      console.error("Erro ao aceitar negociação:", error);
    }
  }

  async function handleReject(negociacaoId: string) {
    try {
      await api.put(`/negociacoes/${negociacaoId}/negar`);
      const updated = negotiations.map((n) =>
        n.id === negociacaoId ? { ...n, aceito: false } : n
      );
      setNegotiations(updated);
    } catch (error) {
      console.error("Erro ao recusar negociação:", error);
    }
  }

  const filteredNegotiations = negotiations.filter((n) => {
    const matchesSearch = servico?.pessoa.nome
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "todos"
        ? true
        : statusFilter === "aceito"
        ? n.aceito
        : !n.aceito;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-4 flex items-center gap-2 text-2xl font-bold text-black">
        <ArrowLeft
          className="cursor-pointer"
          size={28}
          onClick={() => navigate("/servicos_prestados")}
        />
        Detalhes do Serviço
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
        <section className="bg-white rounded-xl shadow-md overflow-hidden self-start">
          <div className="bg-[#307B8E] h-24 rounded-t-xl" />
          <div className="p-6">
            <h2 className="mb-1 text-lg font-semibold text-black">
              {servico?.titulo}
            </h2>
            <p className="mb-4 text-sm text-gray-700">{servico?.descricao}</p>
            <p className="mb-4 text-sm font-medium text-black">
              Valor base: <span className="font-bold">R${servico?.preco}</span>
            </p>
            <div className="flex gap-2">
              {servico?.categorias?.map((cat) => (
                <Badge
                  key={cat.nome}
                  className="bg-[#307B8E] text-white text-xs px-3 py-1 rounded-full"
                >
                  {cat.nome}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h1 className="mb-2 text-lg font-semibold text-black">Negociações</h1>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="relative flex w-full items-center">
              <Search size={18} className="absolute left-3 text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por nome"
                className="w-full rounded-md border bg-[#E5E5E5] py-2 pl-10 pr-4 text-black placeholder:text-black"
              />
            </div>

            <div className="relative w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-md border border-gray-400 bg-[#E5E5E5] py-2 px-3 pr-10 text-black"
              >
                <option value="todos">Todos</option>
                <option value="aceito">Aceito</option>
                <option value="recusado">Recusado</option>
              </select>
              <ChevronsUpDown
                size={20}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredNegotiations.length ? (
              filteredNegotiations.map((n) => (
                <div key={n.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-black">
                      {servico?.pessoa.nome}
                      <p className="text-sm text-gray-600">
                        {servico?.pessoa.email}
                      </p>
                    </div>

                    <Badge
                      className={`rounded-md px-3 py-1 text-sm ${
                        n.aceito
                          ? "bg-green-500 text-black"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {n.aceito ? "Aceito" : "Recusado"}
                    </Badge>
                  </div>

                  <div className="flex justify-between mt-2 text-sm text-gray-800">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(n.data).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[#103A57]">
                      <DollarSign size={16} />
                      R${n.novo_valor}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAccept(n.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => handleReject(n.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                      Recusar
                    </button>
                  </div>

                  <hr className="mt-4 border-gray-300" />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <ArchiveX size={200} className="mb-4 text-gray-400" />
                <p className="text-center text-lg font-semibold">
                  Nenhuma negociação registrada para esse serviço
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
