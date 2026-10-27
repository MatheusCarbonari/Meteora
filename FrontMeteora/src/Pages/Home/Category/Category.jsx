import CardsCategory from '../../../Components/CardsCategory';
import style from './Category.module.css';
import categorias from '../../../Json/Categorias.json';
import Bolsa from '../../../Assets/Desktop/Categorias/CategoriaBolsa.png';
import Calçados from '../../../Assets/Desktop/Categorias/Categoria Calçados.png';
import Calça from '../../../Assets/Desktop/Categorias/Categoria calça.png';
import Camiseta from '../../../Assets/Desktop/Categorias/Categoria camiseta.png';
import Casacos from '../../../Assets/Desktop/Categorias/Categoria casacos.png';
import Oculos from '../../../Assets/Desktop/Categorias/CategoriaOculos.png';

const categoryImages = {
    'CategoriaBolsa.png': Bolsa,
    'Categoria calça.png': Calça,
    'Categoria Calçados.png': Calçados,
    'Categoria camiseta.png': Camiseta,
    'Categoria casacos.png': Casacos,
    'CategoriaOculos.png': Oculos,
};

const Categorys = () => {
    const novaCategoria = categorias.map(category => ({
        ...category,
        src: categoryImages[category.src],
    }));

    return (
        <section className={style.categoryContainer}>
            <h2 className={style.categorysTitle}>Busque por Categoria</h2>
            <div className={style.categoryContainerForCards}>

                <CardsCategory
                    listOfCategorys={novaCategoria}
                />

            </div>
        </section>
    );
}

export default Categorys;
