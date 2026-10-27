import Categorys from './Category';
import Carrousel from './Carrousel';
import ProductGrid from '../../Components/ProductGrid';
import products from '../../data/products';
import style from './Home.module.css';

const Home = () => {
    return (
        <div className={style.mainHomeContainer}>
            <Carrousel />
            <Categorys />

            <section
                className={style.featuredProducts}
                aria-labelledby="featured-products-title"
            >
                <h2
                    className={style.featuredProductsTitle}
                    id="featured-products-title"
                >
                    Produtos em destaque
                </h2>

                <p className={style.carouselHint}>Deslize para ver mais →</p>
                <ProductGrid products={products} layout="carousel" />
            </section>
        </div>
    );
};

export default Home;
