import type { Route } from "./+types/home";
import  PaymentHistory from "~/pages/Payment/PaymentHistory";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu markteplace de serviços" },
  ];
}

export default function Home() {
  return <PaymentHistory />;
}
