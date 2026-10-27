import { fireEvent, render, screen, within } from '@testing-library/react';
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

test('navega da Home para o catálogo e retorna à Home pelo Header', () => {
    renderAt('/');

    fireEvent.click(screen.getByRole('link', { name: 'Produtos' }));

    expect(window.location.pathname).toBe('/catalogo');
    expect(screen.getByRole('heading', { name: 'Catálogo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Produtos' })).toHaveAttribute(
        'aria-current',
        'page'
    );

    fireEvent.click(screen.getByRole('link', { name: 'Home' }));

    expect(window.location.pathname).toBe('/');
    expect(
        screen.getByRole('heading', { name: /busque por categoria/i })
    ).toBeInTheDocument();
});

test('renderiza diretamente o catálogo com os seis produtos', () => {
    renderAt('/catalogo');

    const main = screen.getByRole('main');

    expect(within(main).getByRole('heading', { name: 'Catálogo' })).toBeInTheDocument();
    expect(
        within(main).getByText(
            (_, element) =>
                element.tagName === 'P' && element.textContent === '6 produtos disponíveis'
        )
    ).toBeInTheDocument();
    expect(within(main).getAllByRole('article')).toHaveLength(products.length);

    products.forEach(({ name }) => {
        expect(within(main).getByRole('heading', { name })).toBeInTheDocument();
    });
});

test('exibe a página não encontrada e oferece retorno funcional à Home', () => {
    renderAt('/rota-inexistente');

    expect(
        screen.getByRole('heading', { name: /página não encontrada/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /voltar para home/i }));

    expect(window.location.pathname).toBe('/');
    expect(
        screen.getByRole('heading', { name: /busque por categoria/i })
    ).toBeInTheDocument();
});
