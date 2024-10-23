export default function formatCurrency(total: number): string {
    return total.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
}