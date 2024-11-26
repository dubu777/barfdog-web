
import modalScroll from "@/utils/modal";
import * as styles from "./defaultModal.css";
import ModalPortal from "./ModalPortal";
import { useEffect } from "react";

interface IModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function Modal({ children, isVisible, onClose }: IModalProps) {
  const { preventScroll, allowScroll } = modalScroll();

  useEffect(() => {
    if (isVisible) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <>
      {isVisible && (
        <ModalPortal>
          <div className={styles.modalBackground} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}