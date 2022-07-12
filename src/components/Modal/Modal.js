import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, onClose }) => {
  // вешаем и снимаем слушатели
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('Keydown', handleKeyDown);
    };
  });

  // закрываем модалку по Escape
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  // закрываем модалку по клику в бэкдроп
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;

Modal.propsType = {
  onClose: PropTypes.func.isRequired,
};

// class Modal extends React.Component {
//   // вешаем слушатель события (клавиатуры)
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   // снимаем слушатель события (клавиатуры)
//   componentWillUnmount() {
//     window.removeEventListener('Keydown', this.handleKeyDown);
//   }
//   // закрываем модалку по Escape
// handleKeyDown = e => {
//   if (e.code === 'Escape') {
//     this.props.onClose();
//   }
// };
// // закрываем модалку по клику в бэкдроп
// handleBackdropClick = e => {
//   if (e.currentTarget === e.target) {
//     this.props.onClose();
//   }
// };

//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//   };

// render() {
//   return createPortal(
//     <div className={s.Overlay} onClick={this.handleBackdropClick}>
//       <div className={s.Modal}>
//         <img src={this.props.src} alt="" />
//       </div>
//     </div>,
//     modalRoot
//   );
// }
// }
