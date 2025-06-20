import {useState} from "react";
import {Search} from "lucide-react";
import {Input} from "~/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

export default function SearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="w-full bg-[#307B8E] rounded-2xl py-8 px-6 md:px-10 text-white max-w-7xl mx-auto mt-20 space-y-6 mb-36">
            <h1 className="text-center text-[28px] md:text-[36px] font-bold">Busque aqui!</h1>

            <div className="flex items-center gap-2 bg-white/10 rounded-md px-4 py-2 border border-white">
                <Input
                    type="text"
                    placeholder="Digite aqui..."
                    className="bg-transparent border-0 text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="text-white cursor-pointer" size={20} />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                    <Select>
                        <SelectTrigger className="w-full text-violet11 bg-transparent border-white cursor-pointer" style={{ color: 'white' }}>
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suporte">Suporte Técnico</SelectItem>
                            <SelectItem value="motoristas">Motoristas</SelectItem>
                            <SelectItem value="eventos">Eventos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Valor"
                        className="bg-white text-black rounded shadow px-4 py-2"
                    />
                </div>

                <div className="flex-1">
                    <Select>
                        <SelectTrigger className="w-full bg-transparent border-white text-white placeholder-white cursor-pointer" style={{ color: 'white' }}>
                            <SelectValue placeholder="Avaliação" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 estrelas</SelectItem>
                            <SelectItem value="4">4 estrelas</SelectItem>
                            <SelectItem value="3">3 estrelas</SelectItem>
                            <SelectItem value="2">2 estrelas</SelectItem>
                            <SelectItem value="1">1 estrela</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
