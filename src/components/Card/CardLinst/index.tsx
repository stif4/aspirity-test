import Card, { ICard } from '..';
import style from './index.module.scss';

interface ICardList {
  cards: ICard[];
}

function CardList({ cards }: ICardList) {
  return (
    <div className={style.tabelCard}>
      {cards.map((card) => {
        return <Card key={card.id} {...card} />;
      })}
    </div>
  );
}

export default CardList;
