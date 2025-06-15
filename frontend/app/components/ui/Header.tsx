import React from 'react';

const Header = () => {
  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14" 
      style={{ backgroundColor: '#307B8E' }}
    >
      <button className="text-white font-semibold focus:outline-none" aria-label="Menu">
        Icone menu
      </button>

    </header>
  );
};

export default Header;

