export const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
