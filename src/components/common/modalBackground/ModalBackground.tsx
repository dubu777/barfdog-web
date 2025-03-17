import modalScroll from "@/utils/modal";
import * as styles from "./ModalBackground.css";
import ModalPortal from "./ModalPortal";
import { useEffect } from "react";

interface ModalBackgroundProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function ModalBackground({ children, isVisible, onClose }: ModalBackgroundProps) {
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
            {children}
          </div>
        </ModalPortal>
      )}
    </>
  );
}
