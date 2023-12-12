import React, { useState } from "react";
import Modal from "react-modal";

// Make sure to set appElement to avoid accessibility issues
Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
