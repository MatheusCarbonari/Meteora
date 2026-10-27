import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../../data/products';
import categories from '../../Json/Categorias.json';
import { useCart } from '../../context';
import formatCurrency from '../../utils/formatCurrency';
import style from './ProductDetails.module.css';

const categoryNames = new Map(
    categories.map(({ id, category }) => [id, category])
);

const ProductDetails = () => {
    const { slug } = useParams();
    const { addProduct, totalQuantity } = useCart();
    const [confirmation, setConfirmation] = useState('');
    const product = products.find((item) => item.slug === slug);

    const handleAddToCart = () => {
        addProduct(product.id);
        setConfirmation(
            `${product.name} adicionado ao carrinho. ${totalQuantity + 1} ${
                totalQuantity + 1 === 1 ? 'unidade' : 'unidades'
            } no carrinho.`
        );
    };

    if (!product) {
        return (
            <section className={style.notFound} aria-labelledby="product-not-found-title">
                <p className={style.eyebrow}>Produto indisponível</p>
                <h1 id="product-not-found-title">Produto não encontrado</h1>
                <p>
                    O endereço informado não corresponde a um produto do catálogo.
                </p>
                <Link className={style.actionLink} to="/catalogo">
                    Voltar ao catálogo
                </Link>
            </section>
        );
    }

    return (
        <article className={style.productPage}>
            <Link className={style.backLink} to="/catalogo">
                ← Voltar ao catálogo
            </Link>

            <div className={style.details}>
                <div className={style.imageFrame}>
                    <img
                        className={style.image}
                        src={product.image}
                        alt={product.imageAlt}
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>

                <div className={style.content}>
                    <p className={style.category}>
                        {categoryNames.get(product.category)}
                    </p>
                    <h1 className={style.title}>{product.name}</h1>
                    <p className={style.description}>{product.description}</p>
                    <p className={style.price}>{formatCurrency(product.price)}</p>
                    <button
                        className={style.addButton}
                        type="button"
                        onClick={handleAddToCart}
                    >
                        Adicionar ao carrinho
                    </button>
                    <p className={style.confirmation} role="status" aria-live="polite">
                        {confirmation}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ProductDetails;
