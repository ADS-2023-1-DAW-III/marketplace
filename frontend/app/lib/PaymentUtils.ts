

export function maskCardNumber(cardNumber: string): string {
    if (!cardNumber || typeof cardNumber !== "string") {
        return "**** **** **** ####";
    }
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
}