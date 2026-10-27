import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';
import style from './ProductCard.module.css';

const ProductCard = ({ product, compactOnMobile = false }) => {
    return (
        <article
            className={`${style.card} ${compactOnMobile ? style.compactOnMobile : ''}`}
        >
            <Link
                className={style.cardLink}
                to={`/produto/${product.slug}`}
                aria-label={`Ver detalhes de ${product.name}`}
            >
                <img
                    className={style.image}
                    src={product.image}
                    alt={product.imageAlt}
                />

                <div className={style.content}>
                    <h3 className={style.name}>{product.name}</h3>
                    <p className={style.description}>{product.description}</p>
                    <p className={style.price}>{formatCurrency(product.price)}</p>
                </div>
            </Link>
        </article>
    );
};

export default ProductCard;
