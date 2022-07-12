import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  // вешаем слушатель события (клавиатуры)
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  // снимаем слушатель события (клавиатуры)
  componentWillUnmount() {
    window.removeEventListener('Keydown', this.handleKeyDown);
  }
  // закрываем модалку по Escape
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  // закрываем модалку по клику в бэкдроп
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

// Modal.propsType = {
//   onClose: PropTypes.func.isRequired,
// };
