import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface ModalBackdropProps {
  handleClick?: () => void;
}

interface ModalOverlayProps {
  children?: React.ReactNode;
}

interface ModalProps {
  handleClick?: () => void;
  children?: React.ReactNode;
}

const ModalBackdrop: React.FC<ModalBackdropProps> = ({ handleClick }) => {
  return <div className={styles.backdrop} onClick={handleClick}></div>;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ handleClick, children }) => {
  const portalElement = document.getElementById("overlays")!;

  return (
    <>
      {createPortal(<ModalBackdrop handleClick={handleClick} />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
