import style from './index.module.scss';

export interface ICard {
  id: string;
  img: string;
  name: string;
}

function Card({ img, name }: ICard) {
  return (
    <div className={style.card__wrapper}>
      <img className={style.card__img} src={img} alt="img" />
      <div className={style.card__textWrapper}>
        <p className={style.card__text}>{name}</p>
      </div>
    </div>
  );
}
export default Card;
