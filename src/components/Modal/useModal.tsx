import { useState } from 'react';

function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    return;
  }

  function closeModal() {
    setIsOpen(false);
  }

  return { modalIsOpen, openModal, closeModal, afterOpenModal };
}
export default useModal;
