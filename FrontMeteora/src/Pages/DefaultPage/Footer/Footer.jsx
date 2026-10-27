import style from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={style.footerContainer}>
            <p className={style.footerText}>2023 © Desenvolvido por Matheus | Projeto fictício sem fins comerciais.</p>
        </footer>
    )
}

export default Footer;