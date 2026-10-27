import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import products from '../data/products';
import { CartProvider, useCart } from './CartContext';

const product = products[0];

const CartConsumer = () => {
    const {
        items,
        totalQuantity,
        subtotal,
        addProduct,
        updateQuantity,
        removeProduct,
        clearCart,
    } = useCart();

    return (
        <div>
            <output aria-label="itens">{JSON.stringify(items)}</output>
            <output aria-label="quantidade total">{totalQuantity}</output>
            <output aria-label="subtotal">{subtotal}</output>
            <button type="button" onClick={() => addProduct(product.id)}>
                Adicionar
            </button>
            <button type="button" onClick={() => updateQuantity(product.id, 3)}>
                Alterar
            </button>
            <button type="button" onClick={() => removeProduct(product.id)}>
                Remover
            </button>
            <button type="button" onClick={clearCart}>
                Limpar
            </button>
        </div>
    );
};

test('CartProvider disponibiliza estado, cálculos e operações pelo useCart', () => {
    render(
        <CartProvider>
            <CartConsumer />
        </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByLabelText('itens')).toHaveTextContent(
        JSON.stringify([{ productId: product.id, quantity: 1 }])
    );
    expect(screen.getByLabelText('quantidade total')).toHaveTextContent('1');
    expect(screen.getByLabelText('subtotal')).toHaveTextContent(String(product.price));

    fireEvent.click(screen.getByRole('button', { name: 'Alterar' }));

    expect(screen.getByLabelText('quantidade total')).toHaveTextContent('3');
    expect(screen.getByLabelText('subtotal')).toHaveTextContent(
        String(product.price * 3)
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remover' }));

    expect(screen.getByLabelText('itens')).toHaveTextContent('[]');

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

    expect(screen.getByLabelText('itens')).toHaveTextContent('[]');
    expect(screen.getByLabelText('subtotal')).toHaveTextContent('0');
});
