import React, { useState } from "react";
import { Button } from "./button";
import searchIcon from "app/assets/images/search-icon.png";

interface SectionCardProps {
  title: string;
  children?: React.ReactNode;
  onSearch?: (searchTerm: string) => void;
  onCategoryChange?: (category: string) => void;
  onAddService?: () => void;
  categories?: { value: string; label: string }[];
}

export default function SectionCard({ 
  title, 
  onSearch, 
  onCategoryChange, 
  onAddService,
  categories = [{ value: "", label: "Categorias" }]
}: SectionCardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="flex justify-center w-full"> 
      <div className="my-8" style={{ width: '1158px', height: '193px' }}>
        <div 
          className="bg-[#307B8E] text-white rounded-[20px] shadow-md relative"
          style={{
            width: '1158px',
            height: '193px'
          }}
        >
          <div 
            className="absolute flex items-center"
            style={{
              width: '747px',
              height: '38px',
              top: '81px',
              left: '69px',
            }}
          >
            <input
              type="text"
              placeholder=" Digite aqui..."
              className="w-full bg-[#307B8E] text-white-800 pr-10"
              style={{
                height: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                paddingRight: '40px',
                color: 'white'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            
            <button 
              onClick={handleSearchClick}
              className="h-full flex items-center justify-center px-3 absolute right-0 z-10"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <img 
                src={searchIcon} 
                alt="Pesquisar" 
                style={{
                  width: '16px',
                  height: '16px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </button>
          </div>

          <select
            className="absolute bg-[#307B8E] text-white-800 px-4"
            style={{
              width: '222px',
              height: '38px',
              top: '81px',
              left: '866px',
              borderWidth: '1px',
              borderRadius: '4px',
              color: 'white'
            }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <Button
            className="absolute bg-[#103A57] text-white flex items-center justify-center hover:bg-[#103A57] hover:text-white transition-none"
            style={{
              width: '325.444px',
              height: '48px',
              top: '131px',
              left: '416px',
              borderRadius: '10.21px',
              padding: '13.61px 27.22px',
              gap: '17.01px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '23.82px'
            }}
            onClick={onAddService}
          >
            Cadastrar Novo Serviço
          </Button>

          {title && (
            <h2 className="font-poppins font-semibold text-3xl text-center pt-4">
              {title}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}