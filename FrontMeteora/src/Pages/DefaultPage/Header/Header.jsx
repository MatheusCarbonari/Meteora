import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../Assets/img/Logo desktop.png';
import { useCart } from '../../../context';
import style from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const { totalQuantity } = useCart();

    const closeMenu = () => setIsMenuOpen(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
            menuButtonRef.current?.focus();
        }
    };

    return (
        <header className={style.header} onKeyDown={handleKeyDown}>
            <nav className={style.navContainer} aria-label="Navegação principal">
                <NavLink
                    className={style.logoLink}
                    to="/"
                    aria-label="Meteora — página inicial"
                    onClick={closeMenu}
                >
                    <img className={style.logo} src={logo} alt="" />
                </NavLink>

                <button
                    ref={menuButtonRef}
                    className={style.menuButton}
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>

                <div
                    id="primary-navigation"
                    className={`${style.navigationContent} ${isMenuOpen ? style.menuOpen : ''}`}
                >
                    <ul className={style.listMenuContainer}>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${style.navLinkHeader} ${isActive ? style.activeLink : ''}`
                                }
                                to="/"
                                end
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${style.navLinkHeader} ${isActive ? style.activeLink : ''}`
                                }
                                to="/catalogo"
                                onClick={closeMenu}
                            >
                                Produtos
                            </NavLink>
                        </li>
                    </ul>

                    <div className={style.actions} role="group" aria-label="Ações da loja">
                        <div className={style.searchPreview}>
                            <svg aria-hidden="true" viewBox="0 0 24 24">
                                <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                            </svg>
                            <input
                                type="search"
                                aria-label="Busca de produtos disponível em breve"
                                placeholder="Busca em breve"
                                disabled
                            />
                        </div>

                        <NavLink
                            className={({ isActive }) =>
                                `${style.cartLink} ${isActive ? style.activeCartLink : ''}`
                            }
                            to="/carrinho"
                            aria-label={`Carrinho, ${totalQuantity} ${
                                totalQuantity === 1 ? 'item' : 'itens'
                            }`}
                            onClick={closeMenu}
                        >
                            <svg aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6m4 12h.01M17 20h.01" />
                            </svg>
                            <span>Carrinho</span>
                            <span className={style.cartCount} aria-hidden="true">
                                {totalQuantity}
                            </span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
