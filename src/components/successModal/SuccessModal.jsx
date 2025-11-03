import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, title, message, onClose, buttonText }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal__button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;