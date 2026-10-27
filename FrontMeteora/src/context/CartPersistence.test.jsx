import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Pages/DefaultPage/Header/Header';
import products from '../data/products';
import { CartProvider, useCart } from './CartContext';
import { CART_STORAGE_KEY } from './cartStorage';

const [firstProduct, secondProduct] = products;

const PersistenceConsumer = () => {
    const { items, addProduct, removeProduct, clearCart } = useCart();

    return (
        <div>
            <output aria-label="itens persistidos">{JSON.stringify(items)}</output>
            <button type="button" onClick={() => addProduct(firstProduct.id)}>
                Adicionar primeiro
            </button>
            <button type="button" onClick={() => addProduct(secondProduct.id, 2)}>
                Adicionar segundo
            </button>
            <button type="button" onClick={() => removeProduct(firstProduct.id)}>
                Remover primeiro
            </button>
            <button type="button" onClick={clearCart}>
                Limpar
            </button>
        </div>
    );
};

const getStoredItems = () =>
    JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY)).items;

beforeEach(() => {
    window.localStorage.clear();
});

afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
});

test('restaura o carrinho após remontar o provider e atualiza o Header', async () => {
    const firstRender = render(
        <CartProvider>
            <PersistenceConsumer />
        </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar primeiro' }));
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar primeiro' }));

    await waitFor(() => {
        expect(getStoredItems()).toEqual([
            { productId: firstProduct.id, quantity: 2 },
        ]);
    });

    firstRender.unmount();

    render(
        <CartProvider>
            <MemoryRouter>
                <Header />
                <PersistenceConsumer />
            </MemoryRouter>
        </CartProvider>
    );

    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument();
    expect(screen.getByLabelText('itens persistidos')).toHaveTextContent(
        JSON.stringify([{ productId: firstProduct.id, quantity: 2 }])
    );
});

test('persiste remoção e limpeza do carrinho', async () => {
    render(
        <CartProvider>
            <PersistenceConsumer />
        </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar primeiro' }));
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar segundo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remover primeiro' }));

    await waitFor(() => {
        expect(getStoredItems()).toEqual([
            { productId: secondProduct.id, quantity: 2 },
        ]);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

    await waitFor(() => {
        expect(getStoredItems()).toEqual([]);
    });
});

test('continua funcionando em memória quando localStorage está indisponível', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('leitura indisponível');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('escrita indisponível');
    });

    render(
        <CartProvider>
            <PersistenceConsumer />
        </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar primeiro' }));

    expect(screen.getByLabelText('itens persistidos')).toHaveTextContent(
        JSON.stringify([{ productId: firstProduct.id, quantity: 1 }])
    );
});
