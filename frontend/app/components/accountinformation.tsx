import React from 'react';

interface AccountInformationProps {
  email: string;
  phone: string;
}

export default function AccountInformation({ email, phone }: AccountInformationProps) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Informações da Conta</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 text-sm mb-1">Email</p>
          <p className="text-gray-600">{email}</p>
        </div>
        <div>
          <p className="text-gray-700 text-sm mb-1">Número de Telefone</p>
          <p className="text-gray-600">{phone}</p>
        </div>
      </div>
    </div>
  );
}