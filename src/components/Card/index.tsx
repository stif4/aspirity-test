import Modal from '../Modal';
import style from './index.module.scss';
import useModal from '../Modal/useModal';

export interface ICard {
  id: string;
  img: string;
  name: string;
}

function Card({ img, name }: ICard) {
  const { modalIsOpen, openModal, closeModal, afterOpenModal } = useModal();

  const handleClick = () => {
    openModal();
  };

  return (
    <div>
      <div className={style.card__wrapper} onClick={handleClick}>
        <img className={style.card__img} src={img} alt="img" />
        <div className={style.card__textWrapper}>
          <p className={style.card__text}>{name}</p>
        </div>
      </div>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} afterOpenModal={afterOpenModal}>
        <div>11111</div>
      </Modal>
    </div>
  );
}
export default Card;
