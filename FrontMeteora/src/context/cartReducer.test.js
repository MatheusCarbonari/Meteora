import { describe, expect, test } from 'vitest';
import products from '../data/products';
import {
    CART_ACTIONS,
    calculateSubtotal,
    calculateTotalQuantity,
    cartReducer,
    initialCartState,
    isValidQuantity,
} from './cartReducer';

const [firstProduct, secondProduct] = products;

const reduce = (state, type, payload) => cartReducer(state, { type, payload });

describe('cartReducer', () => {
    test('adiciona somente productId e quantity e acumula adições repetidas', () => {
        const firstState = reduce(initialCartState, CART_ACTIONS.ADD_PRODUCT, {
            productId: firstProduct.id,
            quantity: 2,
        });
        const secondState = reduce(firstState, CART_ACTIONS.ADD_PRODUCT, {
            productId: firstProduct.id,
        });

        expect(firstState.items).toEqual([
            { productId: firstProduct.id, quantity: 2 },
        ]);
        expect(secondState.items).toEqual([
            { productId: firstProduct.id, quantity: 3 },
        ]);
        expect(firstState.items[0]).toEqual({
            productId: firstProduct.id,
            quantity: 2,
        });
    });

    test('altera a quantidade sem modificar o estado anterior', () => {
        const item = Object.freeze({ productId: firstProduct.id, quantity: 2 });
        const items = Object.freeze([item]);
        const previousState = Object.freeze({ items });

        const nextState = reduce(previousState, CART_ACTIONS.UPDATE_QUANTITY, {
            productId: firstProduct.id,
            quantity: 4,
        });

        expect(nextState).not.toBe(previousState);
        expect(nextState.items).not.toBe(previousState.items);
        expect(nextState.items[0]).not.toBe(previousState.items[0]);
        expect(previousState.items).toEqual([
            { productId: firstProduct.id, quantity: 2 },
        ]);
        expect(nextState.items).toEqual([
            { productId: firstProduct.id, quantity: 4 },
        ]);
    });

    test('remove um produto e limpa o carrinho', () => {
        const state = {
            items: [
                { productId: firstProduct.id, quantity: 1 },
                { productId: secondProduct.id, quantity: 2 },
            ],
        };

        const withoutFirstProduct = reduce(state, CART_ACTIONS.REMOVE_PRODUCT, {
            productId: firstProduct.id,
        });
        const emptyState = reduce(withoutFirstProduct, CART_ACTIONS.CLEAR_CART);

        expect(withoutFirstProduct.items).toEqual([
            { productId: secondProduct.id, quantity: 2 },
        ]);
        expect(emptyState.items).toEqual([]);
        expect(state.items).toHaveLength(2);
    });

    test.each([0, -1, 1.5, NaN, Infinity, -Infinity, '2', null])(
        'ignora a quantidade inválida %s ao adicionar ou alterar',
        (quantity) => {
            const state = {
                items: [{ productId: firstProduct.id, quantity: 1 }],
            };

            expect(
                reduce(state, CART_ACTIONS.ADD_PRODUCT, {
                    productId: firstProduct.id,
                    quantity,
                })
            ).toBe(state);
            expect(
                reduce(state, CART_ACTIONS.UPDATE_QUANTITY, {
                    productId: firstProduct.id,
                    quantity,
                })
            ).toBe(state);
            expect(isValidQuantity(quantity)).toBe(false);
        }
    );

    test('aceita o limite inteiro seguro e rejeita valores acima dele', () => {
        const maximumState = reduce(initialCartState, CART_ACTIONS.ADD_PRODUCT, {
            productId: firstProduct.id,
            quantity: Number.MAX_SAFE_INTEGER,
        });

        expect(maximumState.items[0].quantity).toBe(Number.MAX_SAFE_INTEGER);
        expect(
            reduce(maximumState, CART_ACTIONS.ADD_PRODUCT, {
                productId: firstProduct.id,
                quantity: 1,
            })
        ).toBe(maximumState);
        expect(
            reduce(initialCartState, CART_ACTIONS.ADD_PRODUCT, {
                productId: firstProduct.id,
                quantity: Number.MAX_SAFE_INTEGER + 1,
            })
        ).toBe(initialCartState);
    });

    test('ignora IDs inexistentes e não inclui itens ao alterar quantidade', () => {
        const state = {
            items: [{ productId: firstProduct.id, quantity: 1 }],
        };
        const unknownPayload = { productId: 'product-999', quantity: 2 };

        expect(reduce(state, CART_ACTIONS.ADD_PRODUCT, unknownPayload)).toBe(state);
        expect(reduce(state, CART_ACTIONS.UPDATE_QUANTITY, unknownPayload)).toBe(state);
        expect(
            reduce(state, CART_ACTIONS.REMOVE_PRODUCT, {
                productId: 'product-999',
            })
        ).toBe(state);
        expect(
            reduce(initialCartState, CART_ACTIONS.UPDATE_QUANTITY, {
                productId: firstProduct.id,
                quantity: 2,
            })
        ).toBe(initialCartState);
    });

    test('mantém a referência para ações desconhecidas e limpeza desnecessária', () => {
        expect(cartReducer(initialCartState, { type: 'unknown' })).toBe(
            initialCartState
        );
        expect(reduce(initialCartState, CART_ACTIONS.CLEAR_CART)).toBe(
            initialCartState
        );
    });
});

describe('cálculos do carrinho', () => {
    test('calcula quantidade total e subtotal em centavos pelo catálogo', () => {
        const items = [
            { productId: firstProduct.id, quantity: 2 },
            { productId: secondProduct.id, quantity: 3 },
        ];

        expect(calculateTotalQuantity(items)).toBe(5);
        expect(calculateSubtotal(items)).toBe(
            firstProduct.price * 2 + secondProduct.price * 3
        );
    });

    test('ignora IDs e quantidades inválidas nos cálculos', () => {
        const items = [
            { productId: firstProduct.id, quantity: 2 },
            { productId: 'product-999', quantity: 4 },
            { productId: secondProduct.id, quantity: -1 },
        ];

        expect(calculateTotalQuantity(items)).toBe(2);
        expect(calculateSubtotal(items)).toBe(firstProduct.price * 2);
    });
});
