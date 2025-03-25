'use client';
import React, { useEffect } from 'react';
import * as styles from './Toast.css';
import { ellipsis } from "@/styles/common.css";
import CloseButton from '/public/images/icons/close.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from "@/store/useToastStore";
import { toastPosition } from "./Toast.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface ToastProps {
  id: string;
  message: string;
  onClose: () => void;
  duration?: number;
  closeButton?: boolean;
}

const ToastItem = ({
  id,
  message,
  onClose,
  duration = 10000,
  closeButton = false
}: ToastProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`${styles.toast}`}
      >
        <DefaultText type='label3' color='white' className={ellipsis({ lineSize: 'line2' })}>
          {message}
        </DefaultText>
        {closeButton &&
          <button onClick={onClose}>
            <SvgIcon src={CloseButton} />
          </button>
        }
      </motion.div>
    </AnimatePresence>
  );
};

const Toast = () => {
  const { currentToast, removeToast } = useToastStore();

  return (
    <div className={`
      ${styles.toastContainer} 
      ${toastPosition[currentToast?.position || 'bottom']}`
    }>
      {currentToast &&
        <ToastItem
          key={currentToast.id}
          id={currentToast.id}
          message={currentToast.message}
          duration={currentToast.duration}
          onClose={removeToast}
          closeButton={currentToast.closeButton}
        />
      }
    </div>
  );
};

export default Toast;