import {Link} from "react-router-dom";

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
                                      isNegotiable
                                    }: ServiceCardProps) {
  return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
        {/* Seção Superior */}
        <div className="px-5 py-5 pb-3">
          <div className="flex justify-between items-center mb-3">
            {/* Tag Negociável/Não Negociável */}
            <span className={`inline-flex items-center text-xs font-semibold font-poppins  rounded-full ${
                isNegotiable
                    ? 'text-[#366B2B]'
                    : 'text-red-700'
            }`}>
            {isNegotiable ? 'Negociável' : 'Não negociável'}
          </span>

            {/* Duração */}
            <div className="flex items-center text-[#366B2B] text-xs font-semibold font-poppins">
              <span>{duration}</span>
            </div>
          </div>

          {/* Título do Serviço */}
          <div className="mx-7">
            <h3 className="text-lg font-bold text-[#103A57] mb-2 text-center">{title}</h3>
            <img
                src="app/assets/CardImg.png"
                alt="card"
                className="w-full mb-7"
            />
            {/* Descrição */}
            <p className="text-[#103A57] text-center text-semibold font-inter text-base mx-10 h-[60px]">{description}</p>
          </div>
        </div>

        {/* Seção Inferior */}
        <div className="px-6 py-3 flex justify-between items-center mb-5">
          {/* Preço */}
          <span className="text-xl font-bold text-[#103A57] font-poppins">
          R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>

          {/* Botão */}
          <Link to={"/"} className="text-sm text-center font-poppins font-bold text-white hover:text-[#366B2B] hover:bg-white border-2 border-[#366B2B] transition-colors duration-500 rounded-lg flex items-center cursor-pointer px-5 py-2 bg-[#366B2B]">
            Ver
          </Link>
        </div>
      </div>
  );
}