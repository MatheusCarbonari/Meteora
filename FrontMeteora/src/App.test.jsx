import { render, screen, within } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';
import products from './data/products';
import { CartProvider } from './context';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

vi.mock('./Pages/Home/Carrousel', () => ({
  default: () => <div aria-label="Carrossel" />,
}));

test('renderiza o conteúdo principal da Home', () => {
  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  const main = screen.getByRole('main');

  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(
    within(main).getByRole('heading', { name: /busque por categoria/i })
  ).toBeInTheDocument();
  expect(within(main).getByText('Bolsa')).toBeInTheDocument();
  expect(
    within(main).getByRole('heading', { name: /produtos em destaque/i })
  ).toBeInTheDocument();
  expect(
    within(main).getByRole('region', {
      name: /carrossel de produtos em destaque/i,
    })
  ).toHaveAttribute('tabindex', '0');
  expect(within(main).getByText(/deslize para ver mais/i)).toBeInTheDocument();
  expect(within(main).getAllByRole('article')).toHaveLength(products.length);

  products.forEach(({ name, imageAlt, slug }) => {
    expect(within(main).getByRole('heading', { name })).toBeInTheDocument();
    expect(within(main).getByRole('img', { name: imageAlt })).toBeInTheDocument();
    expect(
      within(main).getByRole('link', { name: `Ver detalhes de ${name}` })
    ).toHaveAttribute('href', `/produto/${slug}`);
  });

  const renderedPrices = products.map(({ price }) =>
    currencyFormatter.format(price / 100).replace(/\s+/g, ' ')
  );

  new Set(renderedPrices).forEach((price) => {
    expect(
      within(main).getAllByText(price, {
        normalizer: (content) => content.trim().replace(/\s+/g, ' '),
      })
    ).toHaveLength(
      renderedPrices.filter((renderedPrice) => renderedPrice === price).length
    );
  });
});
