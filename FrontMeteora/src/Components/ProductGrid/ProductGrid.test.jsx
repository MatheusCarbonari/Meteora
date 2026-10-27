import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import products from '../../data/products';
import ProductGrid from './ProductGrid';

test('renderiza um card para cada produto recebido', () => {
    render(
        <MemoryRouter>
            <ProductGrid products={products} />
        </MemoryRouter>
    );

    expect(screen.getAllByRole('article')).toHaveLength(products.length);
    products.forEach(({ name }) => {
        expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
});

test('expõe todos os produtos no carrossel focável da Home', () => {
    render(
        <MemoryRouter>
            <ProductGrid products={products} layout="carousel" />
        </MemoryRouter>
    );

    const carousel = screen.getByRole('region', {
        name: 'Carrossel de produtos em destaque',
    });

    expect(carousel).toHaveAttribute('tabindex', '0');
    expect(screen.getAllByRole('article')).toHaveLength(products.length);

    products.forEach(({ name, slug }) => {
        expect(
            screen.getByRole('link', { name: `Ver detalhes de ${name}` })
        ).toHaveAttribute('href', `/produto/${slug}`);
    });
});

test('aceita um rótulo próprio para o carrossel de categoria', () => {
    render(
        <MemoryRouter>
            <ProductGrid
                products={products.slice(0, 2)}
                layout="category-carousel"
                ariaLabel="Produtos da categoria teste"
            />
        </MemoryRouter>
    );

    const carousel = screen.getByRole('region', {
        name: 'Produtos da categoria teste',
    });

    expect(carousel).toHaveAttribute('tabindex', '0');
    expect(screen.getAllByRole('article')).toHaveLength(2);
});
