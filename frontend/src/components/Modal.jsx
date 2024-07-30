import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./Modal.style"; 

const Modal = ({ isOpen, onClose, refData }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{refData.ref}</h2>
        <p>
          <strong>Tag:</strong> {refData.tag}
        </p>
        <p>
          <strong>Formato:</strong> {refData.formato}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
