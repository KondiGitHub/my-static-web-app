import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, media }) => {
  if (!isOpen || !media) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {media.type === 'photo' ? (
          <img src={media.src} alt={media.alt} className="full-image" />
        ) : (
          <video controls className="full-video">
            <source src={media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
