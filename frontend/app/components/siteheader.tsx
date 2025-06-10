import React from 'react';

export default function SiteHeader() {
  return (
    <header className="bg-white shadow py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Local Services</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Entrar
        </button>
      </div>
    </header>
  );
}