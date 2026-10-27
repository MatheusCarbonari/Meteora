import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../../Components/ProductGrid';
import products from '../../data/products';
import categories from '../../Json/Categorias.json';
import { getCatalogResults, groupProductsByCategory } from './catalogFilters';
import style from './Catalog.module.css';

const validCategoryIds = new Set(categories.map(({ id }) => id));
const validSorts = new Set(['original', 'menor-preco', 'maior-preco']);

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const requestedCategory = searchParams.get('categoria') ?? '';
    const requestedSort = searchParams.get('ordem') ?? 'original';
    const category = validCategoryIds.has(requestedCategory) ? requestedCategory : '';
    const sort = validSorts.has(requestedSort) ? requestedSort : 'original';
    const catalogProducts = getCatalogResults(products, { query, category, sort });
    const hasActiveCriteria = Boolean(
        query.trim() || category || sort !== 'original'
    );
    const categoryGroups = groupProductsByCategory(products, categories);

    const updateParameter = (name, value, defaultValue = '') => {
        const nextParams = new URLSearchParams(searchParams);

        if (!value || value === defaultValue) {
            nextParams.delete(name);
        } else {
            nextParams.set(name, value);
        }

        setSearchParams(nextParams, { replace: true });
    };

    const clearFilters = () => setSearchParams({}, { replace: true });

    return (
        <div className={style.catalogPage}>
            <header className={style.introduction}>
                <p className={style.eyebrow}>Coleção Meteora 2.0</p>
                <h1 className={style.title}>Catálogo</h1>
                <p className={style.description}>
                    Peças essenciais para compor um visual urbano, contemporâneo e autêntico.
                </p>
                <p className={style.productCount} aria-live="polite">
                    <strong>{catalogProducts.length}</strong>{' '}
                    {catalogProducts.length === 1
                        ? 'produto disponível'
                        : 'produtos disponíveis'}
                </p>
            </header>

            <section className={style.filters} aria-labelledby="catalog-filters-title">
                <h2 className={style.filtersTitle} id="catalog-filters-title">
                    Encontre seu próximo look
                </h2>

                <div className={style.controls}>
                    <label className={style.field}>
                        <span>Pesquisar</span>
                        <input
                            type="search"
                            value={query}
                            placeholder="Nome ou descrição"
                            onChange={(event) => updateParameter('q', event.target.value)}
                        />
                    </label>

                    <label className={style.field}>
                        <span>Categoria</span>
                        <select
                            value={category}
                            onChange={(event) =>
                                updateParameter('categoria', event.target.value)
                            }
                        >
                            <option value="">Todas</option>
                            {categories.map(({ id, category: categoryName }) => (
                                <option key={id} value={id}>
                                    {categoryName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={style.field}>
                        <span>Ordenar por</span>
                        <select
                            value={sort}
                            onChange={(event) =>
                                updateParameter('ordem', event.target.value, 'original')
                            }
                        >
                            <option value="original">Ordem original</option>
                            <option value="menor-preco">Menor preço</option>
                            <option value="maior-preco">Maior preço</option>
                        </select>
                    </label>

                    <button
                        className={style.clearButton}
                        type="button"
                        disabled={!hasActiveCriteria}
                        onClick={clearFilters}
                    >
                        Limpar filtros
                    </button>
                </div>
            </section>

            {!hasActiveCriteria ? (
                <div className={style.categoryGroups}>
                    {categoryGroups.map(({ id, name, products: categoryProducts }) => (
                        <section
                            className={style.categoryGroup}
                            aria-labelledby={`catalog-category-${id}`}
                            key={id}
                        >
                            <header className={style.categoryHeader}>
                                <div>
                                    <h2 id={`catalog-category-${id}`}>{name}</h2>
                                    <p>
                                        {categoryProducts.length}{' '}
                                        {categoryProducts.length === 1
                                            ? 'produto'
                                            : 'produtos'}
                                    </p>
                                </div>

                                {categoryProducts.length > 1 && (
                                    <p className={style.carouselHint}>
                                        Deslize para ver mais →
                                    </p>
                                )}
                            </header>

                            <ProductGrid
                                products={categoryProducts}
                                layout="category-carousel"
                                ariaLabel={`Produtos da categoria ${name}`}
                            />
                        </section>
                    ))}
                </div>
            ) : catalogProducts.length > 0 ? (
                <section aria-label="Produtos do catálogo">
                    <ProductGrid products={catalogProducts} />
                </section>
            ) : (
                <section className={style.emptyState} role="status">
                    <h2>Nenhum produto encontrado</h2>
                    <p>
                        Tente alterar a pesquisa ou limpar os filtros para ver o catálogo completo.
                    </p>
                </section>
            )}

        </div>
    );
};

export default Catalog;
