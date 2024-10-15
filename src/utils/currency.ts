export function formatCurrency(amount: number, currencyCode: string = "LKR"): string {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
    });

    return formatter.format(amount);
}

export function addDecimalPoints(amount: number): string {
    const formattedAmount = amount.toFixed(2);
    return formattedAmount;
}