import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import products from '../../data/products';
import ProductCard from './ProductCard';

test('apresenta os dados e o preço formatado do produto', () => {
    const product = products[0];

    render(
        <MemoryRouter>
            <ProductCard product={product} />
        </MemoryRouter>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s*120,00/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: product.imageAlt })).toHaveAttribute(
        'src',
        product.image
    );
    expect(
        screen.getByRole('link', { name: `Ver detalhes de ${product.name}` })
    ).toHaveAttribute('href', `/produto/${product.slug}`);
});
