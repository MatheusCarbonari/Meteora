import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';
import products from './data/products';
import { CartProvider } from './context';

vi.mock('./Pages/Home/Carrousel', () => ({
    default: () => <div aria-label="Carrossel" />,
}));

const renderAt = (path) => {
    window.history.pushState({}, '', path);
    return render(
        <CartProvider>
            <App />
        </CartProvider>
    );
};

test('navega da Home para os detalhes de um produto', () => {
    const product = products[0];
    renderAt('/');

    fireEvent.click(
        screen.getByRole('link', { name: `Ver detalhes de ${product.name}` })
    );

    expect(window.location.pathname).toBe(`/produto/${product.slug}`);
    expect(
        screen.getByRole('heading', { level: 1, name: product.name })
    ).toBeInTheDocument();
});

test('navega do catálogo para os detalhes e retorna ao catálogo', () => {
    const product = products[1];
    renderAt('/catalogo');

    fireEvent.click(
        screen.getByRole('link', { name: `Ver detalhes de ${product.name}` })
    );

    expect(window.location.pathname).toBe(`/produto/${product.slug}`);
    expect(
        screen.getByRole('heading', { level: 1, name: product.name })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /voltar ao catálogo/i }));

    expect(window.location.pathname).toBe('/catalogo');
    expect(screen.getByRole('heading', { name: 'Catálogo' })).toBeInTheDocument();
});

test('renderiza diretamente o estado de produto inexistente', () => {
    renderAt('/produto/slug-inexistente');

    expect(
        screen.getByRole('heading', { name: 'Produto não encontrado' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voltar ao catálogo/i })).toHaveAttribute(
        'href',
        '/catalogo'
    );
});
