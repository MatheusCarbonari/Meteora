import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';
import { CartProvider } from './context';
import products from './data/products';
import formatCurrency from './utils/formatCurrency';

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

const expectCurrencyText = (text) => {
    expect(
        screen.getByText(
            (_, element) =>
                ['P', 'STRONG'].includes(element.tagName) &&
                element.textContent === text
        )
    ).toBeInTheDocument();
};

test('adiciona, atualiza e remove um produto com indicador e totais sincronizados', () => {
    const product = products[0];
    renderAt(`/produto/${product.slug}`);

    const addButton = screen.getByRole('button', { name: 'Adicionar ao carrinho' });
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByRole('status')).toHaveTextContent(
        `${product.name} adicionado ao carrinho. 2 unidades no carrinho.`
    );
    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Carrinho, 2 itens' }));

    expect(window.location.pathname).toBe('/carrinho');
    expect(screen.getByRole('heading', { level: 1, name: 'Seu carrinho' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: product.imageAlt })).toBeInTheDocument();
    expectCurrencyText(`Total: ${formatCurrency(product.price * 2)}`);
    expectCurrencyText(formatCurrency(product.price * 2));

    fireEvent.click(
        screen.getByRole('button', { name: `Diminuir quantidade de ${product.name}` })
    );

    expect(
        screen.getByLabelText(`Quantidade atual de ${product.name}`)
    ).toHaveTextContent('1');
    expect(
        screen.getByRole('button', { name: `Diminuir quantidade de ${product.name}` })
    ).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Carrinho, 1 item' })).toBeInTheDocument();
    expectCurrencyText(`Total: ${formatCurrency(product.price)}`);

    fireEvent.click(
        screen.getByRole('button', { name: `Aumentar quantidade de ${product.name}` })
    );

    expect(
        screen.getByLabelText(`Quantidade atual de ${product.name}`)
    ).toHaveTextContent('2');
    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument();

    fireEvent.click(
        screen.getByRole('button', { name: `Remover item ${product.name}` })
    );

    expect(
        screen.getByRole('heading', { name: 'O carrinho está vazio' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Carrinho, 0 itens' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir para o catálogo' })).toHaveAttribute(
        'href',
        '/catalogo'
    );
});

test('preserva itens durante a navegação e limpa produtos diferentes', () => {
    const [firstProduct, secondProduct] = products;
    renderAt(`/produto/${firstProduct.slug}`);

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar ao carrinho' }));
    fireEvent.click(screen.getByRole('link', { name: 'Produtos' }));
    fireEvent.click(
        screen.getByRole('link', {
            name: `Ver detalhes de ${secondProduct.name}`,
        })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar ao carrinho' }));
    fireEvent.click(screen.getByRole('link', { name: 'Carrinho, 2 itens' }));

    const itemList = screen.getByRole('region', { name: 'Itens do carrinho' });
    expect(within(itemList).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: firstProduct.name })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: secondProduct.name })).toBeInTheDocument();
    expectCurrencyText(formatCurrency(firstProduct.price + secondProduct.price));

    fireEvent.click(screen.getByRole('button', { name: 'Limpar carrinho' }));

    expect(
        screen.getByRole('heading', { name: 'O carrinho está vazio' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Carrinho, 0 itens' })).toBeInTheDocument();
});
