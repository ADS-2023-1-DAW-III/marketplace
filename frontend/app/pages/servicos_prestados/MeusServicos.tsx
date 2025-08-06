"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Search,
  ArrowLeft,
  ChevronsUpDown,
  CalendarArrowDown,
  ArchiveX,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface Contract {
  id: string;
  nome: string;
  email: string;
  status: "Concluído" | "Em andamento" | "Pendente";
  pagamento: string;
  valor: string;
  data: string;
  dataPagamento: string;
}

const MOCK_CONTRACTS: Contract[] = [
  {
    id: "1",
    nome: "Rafael Almeida",
    email: "rafael.almeida@gmail.com",
    status: "Concluído",
    pagamento: "Visa",
    valor: "R$200,00",
    data: "05/04/2025",
    dataPagamento: "05/04/2025",
  },
  {
    id: "2",
    nome: "Rafael Almeida",
    email: "rafael.almeida@gmail.com",
    status: "Em andamento",
    pagamento: "Pix",
    valor: "R$200,00",
    data: "05/04/2025",
    dataPagamento: "05/04/2025",
  },
  {
    id: "3",
    nome: "Rafael Almeida",
    email: "rafael.almeida@gmail.com",
    status: "Pendente",
    pagamento: "Visa",
    valor: "R$200,00",
    data: "05/04/2025",
    dataPagamento: "05/04/2025",
  },
];

export default function ServiceDetails() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [contracts, setContracts] = useState(MOCK_CONTRACTS);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<Contract["status"]>("Pendente");

  const filteredContracts = contracts.filter(({ nome, status }) => {
    const matchesSearch = nome.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  function openStatusDialog(contract: Contract) {
    setSelectedContract(contract);
    const nextStatus =
      contract.status === "Pendente"
        ? "Em andamento"
        : contract.status === "Em andamento"
        ? "Concluído"
        : "Pendente";
    setUpdatedStatus(nextStatus);
    setIsDialogOpen(true);
  }

  function confirmStatusUpdate() {
    if (!selectedContract) return;
    setContracts((current) =>
      current.map((contract) =>
        contract.id === selectedContract.id ? { ...contract, status: updatedStatus } : contract
      )
    );
    setIsDialogOpen(false);
  }

  function getDialogMessage() {
    if (!selectedContract) return "";
    return `Deseja mudar o status de "${selectedContract.nome}" de "${selectedContract.status}" para "${updatedStatus}"?`;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-4 flex items-center gap-2 text-2xl font-bold text-black">
        <ArrowLeft className="cursor-pointer" size={28} />
        Detalhes do Serviço
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#307B8E] h-24 rounded-t-xl" />
          <div className="p-6">
            <h2 className="mb-1 text-lg font-semibold text-black">Web Designer</h2>
            <p className="mb-4 text-sm text-gray-700">
              Web designer especializado em criar sites modernos, responsivos e focados em conversão.
              Transformo suas ideias em experiências digitais profissionais e atrativas.
            </p>
            <p className="mb-4 text-sm font-medium text-black">
              $ <span className="font-bold">Valor base: R$200,00</span>
            </p>
            <div className="flex gap-2">
              <Badge className="bg-[#307B8E] text-white text-xs px-3 py-1 rounded-full">Programação</Badge>
              <Badge className="bg-[#307B8E] text-white text-xs px-3 py-1 rounded-full">Negociável</Badge>
            </div>
          </div>
        </section>

        <section>
          <h1 className="mb-2 text-lg font-semibold text-black">Contratações</h1>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="relative flex w-full items-center">
              <Search size={18} className="absolute left-3 text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar contratações"
                className="w-full rounded-md border bg-[#E5E5E5] py-2 pl-10 pr-4 text-black placeholder:text-black"
              />
            </div>

            <div className="relative w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-md border border-gray-400 bg-[#E5E5E5] py-2 px-3 pr-10 text-black"
              >
                <option value="">Status</option>
                <option value="Concluído">Concluído</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Pendente">Pendente</option>
              </select>
              <ChevronsUpDown
                size={20}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredContracts.length ? (
              filteredContracts.map((contract) => (
                <div key={contract.id}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-bold text-[#103A57]">
                        {contract.nome.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-black">{contract.nome}</p>
                        <p className="text-sm text-gray-600">{contract.email}</p>
                      </div>
                    </div>

                    <Dialog open={isDialogOpen && selectedContract?.id === contract.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Badge
                          onClick={() => openStatusDialog(contract)}
                          className={`cursor-pointer flex items-center gap-1 rounded-md px-3 py-1 text-sm ${
                            contract.status === "Concluído"
                              ? "bg-green-500 text-black"
                              : contract.status === "Em andamento"
                              ? "bg-yellow-400 text-black"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {contract.status}
                          <ChevronsUpDown size={14} className={contract.status === "Pendente" ? "text-white" : "text-black"} />
                        </Badge>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Alterar status da contratação</DialogTitle>
                          <DialogDescription>{getDialogMessage()}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button
                            onClick={confirmStatusUpdate}
                            className="bg-[#103A57] hover:bg-[#0c2d42] text-white"
                          >
                            Confirmar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex justify-between items-start text-sm text-gray-800">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {contract.data}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-1">
                        <CreditCard size={16} />
                        {contract.pagamento}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarArrowDown size={16} />
                        {contract.dataPagamento}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[#103A57]">
                      <DollarSign size={16} />
                      {contract.valor}
                    </div>
                  </div>

                  <hr className="mt-4 border-gray-300" />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <ArchiveX size={200} className="mb-4 text-gray-400" />
                <p className="text-center text-lg font-semibold">
                  Nenhuma contratação registrada para esse serviço
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
