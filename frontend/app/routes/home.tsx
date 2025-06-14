import type { Route } from "./+types/home";
import HomeComponent from "../../src/pages/Home/Home"; 

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace" },
    { 
      name: "description", 
      content: "Bem vindo ao seu marketplace de serviços" 
    },
  ];
}

export default function HomeRoute() {
  return <HomeComponent />;
}