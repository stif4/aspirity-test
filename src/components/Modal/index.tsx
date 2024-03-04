import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { MODAL_STYLES } from './styles';

interface IModal {
  modalIsOpen: boolean;
  afterOpenModal: () => void;
  closeModal: () => void;
  children: ReactNode;
}

function Modal({ modalIsOpen, afterOpenModal, closeModal, children }: IModal) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="Example Modal">
      <button onClick={closeModal}>close</button>
      <div>{children}</div>
    </ReactModal>
  );
}

export default Modal;
