import Profile from "~/pages/profile/Profile";
import type { Route } from "./+types/home";
<<<<<<< Updated upstream
import { Welcome } from "../pages/welcome/welcome";
=======
>>>>>>> Stashed changes

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu markteplace de serviços" },
  ];
}

export default function Home() {
<<<<<<< Updated upstream
  return <Welcome />;
=======
  return <Profile />;
>>>>>>> Stashed changes
}
