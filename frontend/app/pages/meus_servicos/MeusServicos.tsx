import {Link} from "react-router-dom";
import {Input} from "~/components/ui/input";
import {useCallback, useState} from "react";
import {Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

export default function MeusServicos() {
    const servico = {
        title: "Web Designer",
        description: "Web designer especializado em criar sites modernos, responsivos e focados em conversão. Transformo suas ideias em experiências digitais profissionais e atrativas.",
        price: "200,00",
        isNegotiable: true,
        category: {
            nome: "Programação",
        }
    };

    return(
        <div className="min-h-full bg-[#E5E5E5] p-12">
            <div className={"flex flex-row justify-between"}>
                <div className={"mx-15"}>
                    <div className={"flex flex-row items-center justify-start mb-10 h-1/4"}>
                        <Link to="/">
                            <svg width="67" height="52" viewBox="0 0 67 52" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.5006 41.1666L13.959 25.9999L33.5006 10.8333" stroke="black"
                                      stroke-width="2"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M53.0423 26H13.959" stroke="black" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </Link>

                        <h1 className={"text-center text-3xl text-black font-bold pl-2"}>Detalhes do
                            Serviço</h1>
                    </div>
                    <div className={"bg-white w-full rounded-2xl"}>
                        <div className={"bg-[#307B8E] w-full h-24 rounded-t-2xl"}>
                        </div>
                        <div className={"mx-7"}>
                            <h2 className={"my-7 font-medium text-xl"}>
                                {servico.title}
                            </h2>
                            <p className={"text-center font-medium text-base mb-16"}>{servico.description}</p>
                            <p className={"font-medium text-base mb-10"}>$ Valor base: R${servico.price}</p>
                            <div className={"flex flex-row text-sm mb-24"}>
                                <p className={"mr-7 py-1 px-3 text-white bg-[#307B8E] rounded-2xl  mb-10"}>{servico.category.nome}</p>
                                {
                                    servico.isNegotiable ?
                                        <p className={"py-1 px-3 text-white bg-[#307B8E] rounded-2xl mb-10"}>Negociável</p>
                                        :
                                        <p className={"py-1 px-3 text-white bg-[#307B8E] rounded-2xl mb-10"}>Não
                                            negociável</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <h2 className={"font-medium text-xl mb-5"}>Contratações</h2>
                    <div className={"flex flex-col"}>
                        <div className={"flex"}>
                            <div className={"bg-[#D9D9D9] flex items-center rounded-md flex-1 mr-7"}>
                                <Search
                                    className="text-black cursor-pointer ml-3"
                                    size={20}
                                />
                                <Input
                                    type="text"
                                    placeholder="Pesquisar contratações"
                                    className="border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <div className="flex-1 max-w-1/3">
                                <Select
                                >
                                    <SelectTrigger
                                        className="w-full bg-transparent border-black cursor-pointer"
                                        style={{color: "black"}}
                                    >
                                        <SelectValue placeholder="Status"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="concluido">Concluído</SelectItem>
                                        <SelectItem value="em_andamento">Em andamento</SelectItem>
                                        <SelectItem value="pendente">Pendente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center mt-20"}>
                            <svg width="330" height="330" viewBox="0 0 330 330" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M288.75 41.25H41.25C33.6561 41.25 27.5 47.4061 27.5 55V96.25C27.5 103.844 33.6561 110 41.25 110H288.75C296.344 110 302.5 103.844 302.5 96.25V55C302.5 47.4061 296.344 41.25 288.75 41.25Z"
                                    stroke="#71717A" stroke-width="27.5" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                                <path
                                    d="M55 110V261.25C55 268.543 57.8973 275.538 63.0546 280.695C68.2118 285.853 75.2065 288.75 82.5 288.75H247.5C254.793 288.75 261.788 285.853 266.945 280.695C272.103 275.538 275 268.543 275 261.25V110"
                                    stroke="#71717A" stroke-width="27.5" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                                <path d="M130.625 233.75L199.375 165" stroke="#71717A" stroke-width="27.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M130.625 165L199.375 233.75" stroke="#71717A" stroke-width="27.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className={"font-semibold text-xl text-[#797676]"}>Nenhuma contratação registrada para
                                este serviço</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
/*
*


            </div>
*
* */