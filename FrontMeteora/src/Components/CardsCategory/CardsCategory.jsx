import style from './CardsCategory.module.css';

const CardsCategory = ({ listOfCategorys }) => {

    return (
        <div className={style.cardsContainer}>
            {listOfCategorys.map(item => (
                <div className={style.cardContainer} key={item.category}>
                    <img src={item.src} alt={`Categoria ${item.category}`} />
                    <p className={style.cardsText}>{item.category}</p>
                </div>
            ))}
        </div>

    );
}

export default CardsCategory;
