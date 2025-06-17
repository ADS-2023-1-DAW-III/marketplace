import React, { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  serviceType: string;
  imageUrl: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  serviceType,
  imageUrl,
  className = '',
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mx-auto ${className}`}
      style={{ width: '1010px', height: '247px', marginTop: '20px' }}
    >
      <div className="flex h-full">
        <div className="w-2/3 m-4 p-4 flex flex-col justify-between items-center text-center">
          <div>
            <h3 className="font-poppins font-semibold text-[20px] leading-[100%] text-[#103A57] text-center">
              {title}
            </h3>
            <p className="font-inter font-normal text-[18px] leading-[100%] text-[#103A57] mt-2 text-center">
              {description}
            </p>
          </div>

          <button
            className="text-white font-inter font-medium text-[23.82px] leading-[40.83px] rounded-md px-6 py-0.9 mt-2"
            style={{ backgroundColor: '#366B2B' }}
          >
            Detalhes
          </button>

          <div className="flex items-center justify-between w-full text-[#103A57] mt-4">
            <div className="flex gap-2 font-poppins font-semibold text-[20px] leading-[100%] text-left">
              <span>{price}</span>
              <span className="text-sm align-text-top-xs">{duration}</span>
            </div>
            <span className="font-poppins font-semibold text-[20px] leading-[100%] text-center">
              {serviceType}
            </span>
          </div>
        </div>

        <div className="m-4 flex flex-col items-end">
          <div className="flex">
            <img
              src={imageUrl}
              alt="Imagem do serviço"
              className="w-[364px] h-[214px] object-cover rounded-md"
            />

            <div className="ml-2 relative" ref={menuRef}>
              <button
                className="text-black bg-white/50 hover:bg-black/20 rounded-full p-1"
                onClick={toggleMenu}
                aria-label="Abrir menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <button
                    onClick={() => {
                      onEdit?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
