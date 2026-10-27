const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const formatCurrency = (priceInCents) => currencyFormatter.format(priceInCents / 100);

export default formatCurrency;
