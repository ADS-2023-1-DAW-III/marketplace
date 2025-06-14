import type { Route } from "./+types/home";
import HomeComponent from "../../src/pages/Home/Home"; // Renomeei o import para evitar conflito

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace" },
    { 
      name: "description", // Alterei para 'description' (padrão SEO)
      content: "Bem vindo ao seu marketplace de serviços" // Corrigi typo em "marketplace"
    },
  ];
}

// Correção crítica: removi a recursão infinita
export default function HomeRoute() {
  return <HomeComponent />; // Agora renderiza o componente real
}