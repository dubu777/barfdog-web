'use client';
import React, { useEffect } from 'react';
import * as styles from './Toast.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from "@/store/useToastStore";

interface ToastProps {
  id: string;
  message: string;
  onClose: () => void;
  duration?: number;
  type: 'error' | 'success' | 'warning' | 'info';
}

const ToastItem = ({ id, message, onClose, duration = 10000, type }: ToastProps) => {

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
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className={`${styles.toast({ type })}`} // Apply different styles based on the toast type
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className={styles.toastContainer}>
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          duration={toast.duration}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;