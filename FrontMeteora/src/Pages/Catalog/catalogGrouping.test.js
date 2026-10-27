import { expect, test } from 'vitest';
import { groupProductsByCategory } from './catalogFilters';

test('preserva categorias com um ou vários produtos e omite categorias vazias', () => {
    const categories = [
        { id: 'categoria-a', category: 'Categoria A' },
        { id: 'categoria-b', category: 'Categoria B' },
        { id: 'categoria-vazia', category: 'Categoria vazia' },
    ];
    const products = [
        { id: 'a-1', category: 'categoria-a' },
        { id: 'a-2', category: 'categoria-a' },
        { id: 'b-1', category: 'categoria-b' },
        { id: 'sem-categoria', category: 'desconhecida' },
    ];

    expect(groupProductsByCategory(products, categories)).toEqual([
        {
            id: 'categoria-a',
            name: 'Categoria A',
            products: [products[0], products[1]],
        },
        {
            id: 'categoria-b',
            name: 'Categoria B',
            products: [products[2]],
        },
    ]);
});
