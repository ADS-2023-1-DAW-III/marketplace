import { Link } from "react-router-dom"; 
import { Button } from "./button";

interface NegotiationCardProps {
  id: string;
  serviceTitle: string;
  negotiatorName: string;
  negotiatorAvatar: string;
  price: string; 
  date: string;
  status: "ACEITO" | "EM_ANALISE"; // Ou outros status 
  onMakePayment: (negotiationId: string) => void;
}

export function NegotiationCard({
  id,
  serviceTitle,
  negotiatorName,
  negotiatorAvatar,
  price,
  date,
  status,
  onMakePayment,
}: NegotiationCardProps) {
  const isAccepted = status === "ACEITO";

  const statusClass = isAccepted
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800"; 

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex items-center space-x-4 flex-grow">
        <img
          src={negotiatorAvatar}
          alt={negotiatorName}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {serviceTitle}
          </h3>
          <p className="text-gray-600">{negotiatorName}</p>
          <p className="text-gray-700 font-medium mt-1">{price}</p>
        </div>
      </div>

      <div className="flex flex-col items-end md:items-center space-y-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
        >
          {status === "ACEITO" ? "Aceito" : "Em Análise"}
        </span>
        {/* Data da negociação */}
        <p className="text-gray-500 text-sm">{date}</p>
        <Button
          onClick={() => onMakePayment(id)}
          disabled={!isAccepted} 
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            isAccepted
              ? "bg-[#307B8E] text-white hover:bg-[#256372]" 
              : "bg-gray-300 text-gray-600 cursor-not-allowed" 
          }`}
        >
          Realizar Pagamento
        </Button>
      </div>
    </div>
  );
}