import Modal from '../Modal';
import style from './index.module.scss';
import useModal from '../Modal/useModal';
import { ETypeForm } from 'src/App';
import CharacterModal from '../Modal/episodeModal';
import EpisodeModal from '../Modal/episodeModal';
import LocationModal from '../Modal/locationModal';

export interface ICard {
  id: number;
  img: string;
  name: string;
  type: ETypeForm;
}

function Card({ img, name, type, id }: ICard) {
  const { modalIsOpen, openModal, closeModal, afterOpenModal } = useModal();

  const handleClick = () => {
    openModal();
  };

  const getContentModal = () => {
    switch (type) {
      case ETypeForm.characters: {
        return <CharacterModal id={id} />;
      }
      case ETypeForm.episode: {
        return <EpisodeModal id={id} />;
      }
      case ETypeForm.location: {
        return <LocationModal id={id} />;
      }
      default:
        break;
    }
  };

  const currentContentModal = getContentModal();

  return (
    <div>
      <div className={style.card__wrapper} onClick={handleClick}>
        <img className={style.card__img} src={img} alt="img" />
        <div className={style.card__textWrapper}>
          <p className={style.card__text}>{name}</p>
        </div>
      </div>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} afterOpenModal={afterOpenModal}>
        {currentContentModal}
      </Modal>
    </div>
  );
}
export default Card;
