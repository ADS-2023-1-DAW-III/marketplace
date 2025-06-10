import React from 'react';

interface PaymentMethodProps {
  creditCard: string;
  paypal: string;
}

export default function PaymentMethod({ creditCard, paypal }: PaymentMethodProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Métodos de Pagamento</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 text-sm mb-1">Cartão de Crédito</p>
          <p className="text-gray-600">{creditCard}</p>
        </div>
        <div>
          <p className="text-gray-700 text-sm mb-1">PayPal</p>
          <p className="text-gray-600">{paypal}</p>
        </div>
      </div>
    </div>
  );
}