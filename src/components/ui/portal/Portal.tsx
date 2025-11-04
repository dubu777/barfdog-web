import * as styles from './Portal.css';
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  onClose?: () => void;
}
const Portal = ({ children, onClose }: PortalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setMounted(true);
    return () => {
      document.body.style.overflow = 'unset';
      setMounted(false);
    }
  }, []);
  return mounted ? createPortal(
    <div className={styles.overlayStyle} onClick={onClose ? onClose : undefined}>
      {children}
    </div>
    , document.body) : null;
};

export default Portal;