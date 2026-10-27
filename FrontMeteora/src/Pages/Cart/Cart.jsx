import { Link } from 'react-router-dom';
import { useCart } from '../../context';
import products from '../../data/products';
import formatCurrency from '../../utils/formatCurrency';
import style from './Cart.module.css';

const productById = new Map(products.map((product) => [product.id, product]));

const Cart = () => {
    const {
        items,
        totalQuantity,
        subtotal,
        updateQuantity,
        removeProduct,
        clearCart,
    } = useCart();

    const cartItems = items.flatMap((item) => {
        const product = productById.get(item.productId);
        return product ? [{ ...item, product }] : [];
    });

    if (cartItems.length === 0) {
        return (
            <section className={style.emptyState} aria-labelledby="empty-cart-title">
                <p className={style.eyebrow}>Seu carrinho</p>
                <h1 id="empty-cart-title">O carrinho está vazio</h1>
                <p>Explore o catálogo e escolha as peças que combinam com você.</p>
                <Link className={style.catalogLink} to="/catalogo">
                    Ir para o catálogo
                </Link>
            </section>
        );
    }

    return (
        <div className={style.cartPage}>
            <header className={style.introduction}>
                <p className={style.eyebrow}>Meteora 2.0</p>
                <h1>Seu carrinho</h1>
                <p>
                    {totalQuantity} {totalQuantity === 1 ? 'unidade' : 'unidades'}{' '}
                    selecionada{totalQuantity === 1 ? '' : 's'}
                </p>
            </header>

            <div className={style.cartLayout}>
                <section className={style.itemsSection} aria-label="Itens do carrinho">
                    <ul className={style.itemList}>
                        {cartItems.map(({ productId, quantity, product }) => (
                            <li className={style.item} key={productId}>
                                <img
                                    className={style.itemImage}
                                    src={product.image}
                                    alt={product.imageAlt}
                                />

                                <div className={style.itemContent}>
                                    <div>
                                        <h2>{product.name}</h2>
                                        <p className={style.unitPrice}>
                                            Unitário: {formatCurrency(product.price)}
                                        </p>
                                    </div>

                                    <div
                                        className={style.quantityGroup}
                                        role="group"
                                        aria-label={`Quantidade de ${product.name}`}
                                    >
                                        <button
                                            type="button"
                                            disabled={quantity === 1}
                                            aria-label={`Diminuir quantidade de ${product.name}`}
                                            onClick={() =>
                                                updateQuantity(productId, quantity - 1)
                                            }
                                        >
                                            −
                                        </button>
                                        <output aria-label={`Quantidade atual de ${product.name}`}>
                                            {quantity}
                                        </output>
                                        <button
                                            type="button"
                                            aria-label={`Aumentar quantidade de ${product.name}`}
                                            onClick={() =>
                                                updateQuantity(productId, quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className={style.itemTotal}>
                                        Total: {formatCurrency(product.price * quantity)}
                                    </p>

                                    <button
                                        className={style.removeButton}
                                        type="button"
                                        aria-label={`Remover item ${product.name}`}
                                        onClick={() => removeProduct(productId)}
                                    >
                                        Remover item
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <aside className={style.summary} aria-labelledby="cart-summary-title">
                    <h2 id="cart-summary-title">Resumo</h2>
                    <div className={style.summaryRow}>
                        <span>Subtotal</span>
                        <strong>{formatCurrency(subtotal)}</strong>
                    </div>
                    <p>Valores calculados a partir dos produtos selecionados.</p>
                    <button
                        className={style.clearButton}
                        type="button"
                        onClick={clearCart}
                    >
                        Limpar carrinho
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
