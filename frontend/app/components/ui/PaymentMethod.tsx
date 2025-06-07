import React from "react";

export default function PaymentMethod() {
    return(
        <div className="mb-6">
            <h3 className="font-semibold mb-2">Métodos de pagamentos</h3>
            <div className="space-y-2">
                {["Cartão de crédito ou débito", "Pix", "Paypal", "Apple Pay", "Google Pay"].map((method, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                        <input type="radio" name="paymentMethod" defaultChecked={idx===0} />
                        <span>{method}</span>
                    </label>
                ))}

            </div>
        </div>
    )
}