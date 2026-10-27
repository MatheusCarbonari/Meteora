import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Header from './Header';
import { CartProvider } from '../../../context';

const renderHeader = (initialEntries = ['/']) => render(
    <CartProvider>
        <MemoryRouter initialEntries={initialEntries}>
            <Header />
        </MemoryRouter>
    </CartProvider>
);

test('abre e fecha o menu móvel com suporte ao teclado', () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /abrir menu/i });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    expect(screen.getByRole('button', { name: /fechar menu/i })).toHaveAttribute(
        'aria-expanded',
        'true'
    );

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    fireEvent.keyDown(screen.getByRole('link', { name: 'Home' }), { key: 'Escape' });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
});

test('indica o link ativo de acordo com a rota atual', () => {
    renderHeader(['/catalogo']);

    expect(screen.getByRole('link', { name: 'Produtos' })).toHaveAttribute(
        'aria-current',
        'page'
    );
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
        'aria-current'
    );
    expect(screen.getByRole('link', { name: 'Carrinho, 0 itens' })).toHaveAttribute(
        'href',
        '/carrinho'
    );
});
