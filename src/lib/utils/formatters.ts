export function formatCurrency(value: number): string {
  return `£${value.toFixed(2)}`;
}

export function parseCurrencyValue(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}