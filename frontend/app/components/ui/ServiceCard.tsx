import { Link } from "react-router-dom";

type ServiceCardProps = {
  title: string;
  description: string;
  price: number;
  duration: string;
  isNegotiable: boolean;
};

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  isNegotiable,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
      <div className="px-4 pt-4 pb-2 flex flex-col items-center">
        <div className="flex justify-between items-center text-xs font-semibold w-full mb-2">
          <span
            className={`${
              isNegotiable ? "text-green-700" : "text-red-600"
            } font-poppins`}
          >
            {isNegotiable ? "Negociável" : "Não negociável"}
          </span>
          <span className="text-[#366B2B]">{duration}</span>
        </div>

        <h3 className="text-center text-[#103A57] font-bold text-base px-2 leading-tight h-[48px] flex items-center justify-center mb-3">
          {title}
        </h3>

        <img
          src="app/assets/CardImg.png"
          alt={title}
          className="rounded-md w-full h-[160px] object-cover mb-4"
        />

        <p className="text-[#103A57] text-center font-inter text-sm mx-4 h-[72px] overflow-hidden">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between px-4 py-4 mt-auto">
        <span className="text-[#103A57] text-lg font-bold font-poppins">
          R${" "}
          {price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <Link
          to="/"
          className="bg-[#366B2B] hover:bg-white hover:text-[#366B2B] hover:border-[#366B2B] transition-colors duration-300 text-white text-sm font-bold font-poppins px-5 py-2 rounded-lg border-2 border-[#366B2B]"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}
