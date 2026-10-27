import { describe, expect, test, vi } from 'vitest';
import products from '../data/products';
import { initialCartState } from './cartReducer';
import {
    CART_STORAGE_KEY,
    loadCartState,
    persistCartState,
    sanitizeCartItems,
} from './cartStorage';

const [firstProduct, secondProduct] = products;

const createStorage = (storedValue = null) => ({
    getItem: vi.fn(() => storedValue),
    setItem: vi.fn(),
});

describe('persistência do carrinho', () => {
    test('usa uma chave versionada e persiste somente productId e quantity', () => {
        const storage = createStorage();
        const items = [
            {
                productId: firstProduct.id,
                quantity: 2,
                name: firstProduct.name,
                price: firstProduct.price,
            },
        ];

        expect(persistCartState(items, storage)).toBe(true);
        expect(storage.setItem).toHaveBeenCalledWith(
            CART_STORAGE_KEY,
            JSON.stringify({
                items: [{ productId: firstProduct.id, quantity: 2 }],
            })
        );
        expect(CART_STORAGE_KEY).toBe('meteora-cart-v1');
    });

    test('restaura itens válidos e consolida IDs duplicados', () => {
        const storage = createStorage(
            JSON.stringify({
                items: [
                    { productId: firstProduct.id, quantity: 1 },
                    { productId: secondProduct.id, quantity: 3 },
                    { productId: firstProduct.id, quantity: 2 },
                ],
            })
        );

        expect(loadCartState(storage)).toEqual({
            items: [
                { productId: firstProduct.id, quantity: 3 },
                { productId: secondProduct.id, quantity: 3 },
            ],
        });
    });

    test('descarta produtos inexistentes, quantidades inválidas e itens inesperados', () => {
        const items = [
            { productId: firstProduct.id, quantity: 2 },
            { productId: 'product-999', quantity: 1 },
            { productId: secondProduct.id, quantity: 0 },
            { productId: secondProduct.id, quantity: -1 },
            { productId: secondProduct.id, quantity: 1.5 },
            { productId: secondProduct.id, quantity: '2' },
            null,
            'item',
        ];

        expect(sanitizeCartItems(items)).toEqual([
            { productId: firstProduct.id, quantity: 2 },
        ]);
    });

    test.each([
        '{json-inválido',
        'null',
        '[]',
        '{}',
        '{"items":"inválido"}',
    ])('retorna estado vazio para conteúdo corrompido ou estrutura inesperada: %s', (value) => {
        expect(loadCartState(createStorage(value))).toBe(initialCartState);
    });

    test('retorna estado vazio quando não há valor salvo', () => {
        expect(loadCartState(createStorage(null))).toBe(initialCartState);
    });

    test('tolera falhas de leitura e escrita do armazenamento', () => {
        const unavailableStorage = {
            getItem: vi.fn(() => {
                throw new Error('armazenamento indisponível');
            }),
            setItem: vi.fn(() => {
                throw new Error('armazenamento indisponível');
            }),
        };

        expect(loadCartState(unavailableStorage)).toBe(initialCartState);
        expect(
            persistCartState(
                [{ productId: firstProduct.id, quantity: 1 }],
                unavailableStorage
            )
        ).toBe(false);
    });
});
