import type { Route } from "./+types/home";
import Login from "~/pages/auth/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu markteplace de serviços" },
  ];
}

export default function Home() {
  return <Login />;
}