import { Button } from "../../../app/components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">MarketPlace</Link>
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Início</Link>
          <Link to="/produtos" className="text-gray-700 hover:text-blue-500">Produtos</Link>
          <Link to="/sobre" className="text-gray-700 hover:text-blue-500">Sobre</Link>
          <Link to="/contato" className="text-gray-700 hover:text-blue-500">Contato</Link>
        </nav>
        <div className="space-x-2">
          <Button variant="outline">Login</Button>
          <Button>Cadastrar</Button>
        </div>
      </div>
    </header>
  );
}
