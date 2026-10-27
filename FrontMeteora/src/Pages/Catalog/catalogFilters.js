const normalizeText = (value) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('pt-BR');

const sortProducts = (products, sort) => {
    if (sort === 'menor-preco') {
        return [...products].sort((first, second) => first.price - second.price);
    }

    if (sort === 'maior-preco') {
        return [...products].sort((first, second) => second.price - first.price);
    }

    return products;
};

export const getCatalogResults = (
    products,
    { query = '', category = '', sort = 'original' } = {}
) => {
    const normalizedQuery = normalizeText(query.trim());

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !category || product.category === category;
        const searchableText = normalizeText(`${product.name} ${product.description}`);
        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

        return matchesCategory && matchesQuery;
    });

    return sortProducts(filteredProducts, sort);
};

export const groupProductsByCategory = (products, categories) =>
    categories.flatMap(({ id, category }) => {
        const categoryProducts = products.filter(
            (product) => product.category === id
        );

        return categoryProducts.length > 0
            ? [{ id, name: category, products: categoryProducts }]
            : [];
    });
