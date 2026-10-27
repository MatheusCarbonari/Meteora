import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import products from '../../data/products';
import categories from '../../Json/Categorias.json';
import formatCurrency from '../../utils/formatCurrency';
import { CartProvider } from '../../context';
import ProductDetails from './ProductDetails';

const categoryNames = new Map(
    categories.map(({ id, category }) => [id, category])
);

const renderProductRoute = (slug) => render(
    <CartProvider>
        <MemoryRouter initialEntries={[`/produto/${slug}`]}>
            <Routes>
                <Route path="produto/:slug" element={<ProductDetails />} />
            </Routes>
        </MemoryRouter>
    </CartProvider>
);

describe('ProductDetails', () => {
    test.each(products)('renderiza o produto $name a partir do slug', (product) => {
        renderProductRoute(product.slug);

        expect(
            screen.getByRole('heading', { level: 1, name: product.name })
        ).toBeInTheDocument();
        expect(screen.getByText(categoryNames.get(product.category))).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(
            screen.getByText(
                (_, element) =>
                    element.tagName === 'P' &&
                    element.textContent === formatCurrency(product.price)
            )
        ).toBeInTheDocument();
        expect(screen.getByRole('img', { name: product.imageAlt })).toHaveAttribute(
            'src',
            product.image
        );
        expect(screen.getByRole('img', { name: product.imageAlt })).toHaveAttribute(
            'loading',
            'eager'
        );
        expect(screen.getByRole('link', { name: /voltar ao catálogo/i })).toHaveAttribute(
            'href',
            '/catalogo'
        );
    });

    test('trata um slug inexistente e oferece retorno ao catálogo', () => {
        renderProductRoute('produto-inexistente');

        expect(
            screen.getByRole('heading', { name: 'Produto não encontrado' })
        ).toBeInTheDocument();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: /voltar ao catálogo/i })).toHaveAttribute(
            'href',
            '/catalogo'
        );
    });
});
