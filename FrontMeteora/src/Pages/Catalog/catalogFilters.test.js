import { describe, expect, test } from 'vitest';
import products from '../../data/products';
import { getCatalogResults } from './catalogFilters';

describe('filtros do catálogo', () => {
    test('pesquisa nome e descrição ignorando caixa e acentos', () => {
        const glasses = products.filter(({ category }) => category === 'oculos');

        expect(getCatalogResults(products, { query: 'OCULOS' })).toEqual(glasses);
        expect(getCatalogResults(products, { query: 'Óculos' })).toEqual(glasses);
        expect(getCatalogResults(products, { query: 'composicoes' })).toEqual([
            expect.objectContaining({ slug: 'camiseta-essential-mostarda' }),
        ]);
    });

    test('combina pesquisa e categoria', () => {
        expect(
            getCatalogResults(products, { query: 'jeans', category: 'casacos' })
        ).toEqual([expect.objectContaining({ slug: 'jaqueta-jeans-oversized' })]);
        expect(
            getCatalogResults(products, { query: 'jeans', category: 'bolsas' })
        ).toEqual([]);
    });

    test('ordena por menor preço, maior preço ou ordem original', () => {
        const originalIds = products.map(({ id }) => id);
        const ascendingPrices = getCatalogResults(products, {
            sort: 'menor-preco',
        }).map(({ price }) => price);
        const descendingPrices = getCatalogResults(products, {
            sort: 'maior-preco',
        }).map(({ price }) => price);

        expect(ascendingPrices).toEqual([...ascendingPrices].sort((a, b) => a - b));
        expect(descendingPrices).toEqual([...descendingPrices].sort((a, b) => b - a));
        expect(getCatalogResults(products).map(({ id }) => id)).toEqual(originalIds);
    });
});
