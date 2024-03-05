import { Styles } from 'react-modal';

export const MODAL_STYLES: Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    borderRadius: '0.5rem',
    background: 'linear-gradient(180deg, #000014 0%, #00004d 100%)',
    color: '#68c8ff'
  }
};
