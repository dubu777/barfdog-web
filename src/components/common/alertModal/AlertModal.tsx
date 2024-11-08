import * as styles from './AlertModal.css';
import { motion } from "framer-motion";
import {createPortal} from "react-dom";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string | Element;
}

const AlertModal = ({ isOpen, onClose, onConfirm, message }: AlertModalProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.overlayStyle} onClick={onClose}>
      <motion.div
        className={styles.modalStyle}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.messageStyle}>{message}</div>
        <div className={styles.buttonContainerStyle}>
          <button onClick={onClose} className={styles.cancelButtonStyle}>아니오</button>
          <button onClick={onConfirm} className={styles.confirmButtonStyle}>네</button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default AlertModal;