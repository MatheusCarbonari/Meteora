import ProductCard from '../ProductCard';
import style from './ProductGrid.module.css';

const ProductGrid = ({ products, layout = 'grid', ariaLabel }) => {
    const isFeaturedCarousel = layout === 'carousel';
    const isCategoryCarousel = layout === 'category-carousel';
    const isCarousel = isFeaturedCarousel || isCategoryCarousel;
    const carouselLabel = ariaLabel ?? 'Carrossel de produtos em destaque';

    return (
        <div
            className={`${style.grid} ${isCarousel ? style.scrollCarousel : ''} ${
                isFeaturedCarousel ? style.featuredCarousel : ''
            } ${isCategoryCarousel ? style.categoryCarousel : ''}`}
            role={isCarousel ? 'region' : undefined}
            aria-label={isCarousel ? carouselLabel : undefined}
            tabIndex={isCarousel ? 0 : undefined}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    compactOnMobile={isFeaturedCarousel}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
