import React, { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  serviceType: string;
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-6xl mx-auto p-6 ${className}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <div className="relative" ref={menuRef}>
          <button 
            className="text-gray-500 hover:text-gray-700 p-1"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
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
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="border-t border-gray-200 my-4"></div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">{price}</span>
          <span className="text-gray-600">{duration}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
            {serviceType}
          </span>
          
          <button 
            className="flex items-center justify-center text-white font-medium rounded-[10.21px] gap-[17.01px]"
            style={{
              width: '155.44px',
              height: '35px',
              background: '#366B2B',
              padding: '13.61px 27.22px'
            }}
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}