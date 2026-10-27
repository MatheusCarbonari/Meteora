import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { expect, test } from 'vitest';
import products from '../../data/products';
import categories from '../../Json/Categorias.json';
import Catalog from './Catalog';

const LocationDisplay = () => {
    const location = useLocation();
    return <output data-testid="location-search">{location.search}</output>;
};

const renderCatalog = (initialEntry = '/catalogo') =>
    render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Catalog />
            <LocationDisplay />
        </MemoryRouter>
    );

test('agrupa o catálogo sem filtros em carrosséis independentes por categoria', () => {
    renderCatalog();

    categories.forEach(({ id, category }) => {
        const carousel = screen.getByRole('region', {
            name: `Produtos da categoria ${category}`,
        });
        const expectedProducts = products.filter((product) => product.category === id);

        expect(
            screen.getByRole('heading', { level: 2, name: category })
        ).toBeInTheDocument();
        expect(within(carousel).getAllByRole('article')).toHaveLength(
            expectedProducts.length
        );
        expectedProducts.forEach(({ name, slug }) => {
            expect(
                within(carousel).getByRole('link', {
                    name: `Ver detalhes de ${name}`,
                })
            ).toHaveAttribute('href', `/produto/${slug}`);
        });
    });

    expect(screen.getByRole('button', { name: /limpar filtros/i })).toBeDisabled();
});

test('mantém o agrupamento quando ordem original aparece na URL', () => {
    renderCatalog('/catalogo?ordem=original');

    expect(
        screen.getAllByRole('region', { name: /produtos da categoria/i })
    ).toHaveLength(categories.length);
    expect(screen.getByRole('button', { name: /limpar filtros/i })).toBeDisabled();
});

test('usa a grade tradicional quando uma ordenação está ativa', () => {
    renderCatalog('/catalogo?ordem=menor-preco');

    expect(
        screen.queryByRole('region', { name: /produtos da categoria/i })
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(products.length);
});

test('restaura pesquisa, categoria e ordenação a partir da URL', () => {
    renderCatalog('/catalogo?q=OCULOS&categoria=oculos&ordem=maior-preco');
    const glasses = products.filter(({ category }) => category === 'oculos');

    expect(screen.getByRole('searchbox', { name: 'Pesquisar' })).toHaveValue('OCULOS');
    expect(screen.getByRole('combobox', { name: 'Categoria' })).toHaveValue('oculos');
    expect(screen.getByRole('combobox', { name: 'Ordenar por' })).toHaveValue(
        'maior-preco'
    );
    expect(screen.getAllByRole('article')).toHaveLength(glasses.length);
    expect(
        screen.getByText(
            (_, element) =>
                element.tagName === 'P' &&
                element.textContent === `${glasses.length} produtos disponíveis`
        )
    ).toBeInTheDocument();
    glasses.forEach(({ name }) => {
        expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
});

test('sincroniza filtros combinados com os parâmetros da URL', () => {
    renderCatalog();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Pesquisar' }), {
        target: { value: 'jeans' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: 'Categoria' }), {
        target: { value: 'casacos' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: 'Ordenar por' }), {
        target: { value: 'menor-preco' },
    });

    const params = new URLSearchParams(
        screen.getByTestId('location-search').textContent
    );

    expect(params.get('q')).toBe('jeans');
    expect(params.get('categoria')).toBe('casacos');
    expect(params.get('ordem')).toBe('menor-preco');
    expect(screen.getAllByRole('article')).toHaveLength(1);
});

test('exibe estado vazio e permite limpar os filtros', () => {
    renderCatalog('/catalogo?q=produto-inexistente&categoria=bolsas');

    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(
        screen.getByRole('heading', { name: /nenhum produto encontrado/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /limpar filtros/i }));

    expect(screen.getByTestId('location-search')).toHaveTextContent('');
    expect(screen.getAllByRole('article')).toHaveLength(products.length);
});

test('ignora categoria e ordenação inválidas sem quebrar o catálogo', () => {
    renderCatalog('/catalogo?categoria=invalida&ordem=desconhecida');

    expect(screen.getByRole('combobox', { name: 'Categoria' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Ordenar por' })).toHaveValue('original');
    expect(screen.getAllByRole('article')).toHaveLength(products.length);
    expect(
        screen.queryByRole('region', { name: /carrossel de produtos em destaque/i })
    ).not.toBeInTheDocument();
});
