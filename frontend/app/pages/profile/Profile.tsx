import React from 'react';

 export default function Profile() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Local Services</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entrar
          </button>
        </div>
      </header>
      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="bg-white rounded p-6 lg:col-span-3 relative">
          <h2 className="text-2xl font-semibold mb-4">Perfil</h2>
          <div className="flex flex-col items-start mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-2"></div>
            <h3 className="text-xl font-semibold text-gray-800">Mateus Tomaz</h3>
            <p className="text-sm text-gray-600">Esperança, Paraíba</p>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-sm mt-2 text-sm">
              Editar Perfil
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Informações da Conta</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 text-sm mb-1">Email</p>
                <p className="text-gray-600">{`mateus@gmail.com`}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-1">Número de Telefone</p>
                <p className="text-gray-600">{`(83) 94002-8922`}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Métodos de Pagamento</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 text-sm mb-1">Cartão de Crédito</p>
                <p className="text-gray-600">{`**** **** **** 1234`}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-1">PayPal</p>
                <p className="text-gray-600">{`(83) 94002-8922`}</p>
              </div>
            </div>
          </div>

        </main>
        
        <div className="absolute bottom-4 right-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            Salvar
        </button>
        </div>

      </div>
    </div>
  );
 }