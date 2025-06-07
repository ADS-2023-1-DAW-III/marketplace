import React from "react";
import CardInfo from "~/components/ui/CardInfo";
import PaymentMethod from "~/components/ui/PaymentMethod";
import AddressSection from "~/components/ui/AddressSection";
import EmailReceipt from "~/components/ui/EmailReceipt";


export default function Payment() {
    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="text-xl font-semibold">MarketPlace</h1>
                <button className="bg-blue-600 text-white px-4 py-1 rounded">Entrar</button>
            </header>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-1"> Payment</p>
                <div className="w-full bg-gray-200 h-1 mb-5">
                    <div className="bg-blue-600 h-1 w-3/3"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Pagamento</h2>
                <CardInfo/>

                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">Adicionar novo cartão</button>

                <PaymentMethod />
                <AddressSection />
                <EmailReceipt />

                <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">Finalizar</button>
            </div>
        </div>
    );
}