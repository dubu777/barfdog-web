import {useState, useCallback, useRef, useEffect, ReactNode, CSSProperties} from "react";
import { themeVars } from "@/styles/theme.css";
import { commonLayoutStyle } from "@/styles/common.css";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from '/public/images/icons/close-black.png';
import Image from "next/image";

const parentsModalStyle: CSSProperties = {
  position: 'fixed',
  height: '100vh',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: themeVars.backgroundColors.darkOpacity90,
  zIndex: 10000
}

const childModalStyle: CSSProperties = {
  background: 'white',
  padding: '20px 22px',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  position: 'relative',
}

const closeButtonStyle: CSSProperties = {
  position: 'absolute',
  right: '14px',
  top: '15px',
  cursor: 'pointer',
}

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const Modal = ({ children, className }: { children: ReactNode, className?: string | undefined }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={commonLayoutStyle}
          style={{ ...parentsModalStyle }}
        >
          <motion.div
            className={className ? className : ''}
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={childModalStyle}
          >
            {children}
            <button
              style={closeButtonStyle}
              onClick={onClose}
            >
              <Image src={CloseButton} alt='close button' width={10} height={10} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return {
    isOpen,
    onToggle,
    onClose,
    ref,
    Modal,
  };
}
