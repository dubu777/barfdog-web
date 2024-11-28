import * as styles from './AlertModal.css';
import { motion } from "framer-motion";
import Portal from "@/components/common/portal/Portal";
import {ReactNode, useEffect} from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  message: string | ReactNode;
  isAutoClose?: boolean;
}

const AlertModal = ({ isOpen, onClose, onConfirm, message, isAutoClose = false }: AlertModalProps) => {
  useEffect(() => {
    if (isOpen && isAutoClose) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, isAutoClose])
  if (!isOpen) return null;
  return (
    <Portal onClose={onClose}>
      <motion.div
        className={styles.modalStyle}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {isAutoClose && <button className={styles.closeButton} /> }
        <div className={styles.messageStyle({ isAutoClose })}>{message}</div>
        <div className={styles.buttonContainerStyle}>
          {!isAutoClose &&
          <>
            <button onClick={onClose} className={styles.cancelButtonStyle}>아니오</button>
            <button onClick={onConfirm} className={styles.confirmButtonStyle}>네</button>
          </>
          }
        </div>
      </motion.div>
    </Portal>
  );
};

export default AlertModal;