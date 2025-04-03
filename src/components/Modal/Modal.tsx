import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  backText: string;
  nextText: string;
  nextModal?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  backText,
  nextText,
  nextModal,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.body}>{children}</div>
        <div className={styles.buttons}>
          <button className={styles.back} onClick={closeModal}>
            {backText}
          </button>
          <button className={styles.next} onClick={nextModal}>
            {nextText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
