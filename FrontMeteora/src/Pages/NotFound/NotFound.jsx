import { Link } from 'react-router-dom';
import style from './NotFound.module.css';

const NotFound = () => {
    return (
        <section className={style.notFound}>
            <p className={style.errorCode}>Erro 404</p>
            <h1 className={style.title}>Página não encontrada</h1>
            <p className={style.description}>
                O endereço informado não existe ou não está mais disponível.
            </p>
            <Link className={style.homeLink} to="/">
                Voltar para Home
            </Link>
        </section>
    );
};

export default NotFound;
