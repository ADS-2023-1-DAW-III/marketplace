import React from "react";
import { maskCardNumber } from "../../lib/PaymentUtils";

export default function CardInfo() {
    const cardNumber = "1234567890151234"
    return(
        <div className="mb-4">
            <p className="text-lg font-medium">{maskCardNumber(cardNumber)}</p>
            <p className="text-sm text-gray-500">MasterCard com final {cardNumber.slice(-4)}</p>
        </div>
    )
}