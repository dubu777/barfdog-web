import { ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as styles from "@/components/common/bottomSheet/BottomSheet.css";
import CloseButton from "/public/images/icons/close.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ModalBackground from "../modalBackground/ModalBackground";
import DefaultText from "../defaultText/DefaultText";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  closeOnBackgroundClick?: boolean;
  fullHeight?: boolean;
  className?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackgroundClick = true,
  fullHeight = false,
  className,
}: BottomSheetProps) {
  const initialHeight = fullHeight ? "95vh" : "auto";
  const [sheetHeight, setSheetHeight] = useState(initialHeight);
  // 모바일 더블 탭 감지
  const lastTapRef = useRef<number | null>(null);
  const doubleTapThreshold = 300; // 300ms 이내에 두 번 터치하면 double tap으로 인식

  const handleDoubleClick = () => {
    if (!fullHeight) return;
    setSheetHeight((prev) => (prev === "95vh" ? "60vh" : "95vh"));
  };

  // 모바일용 터치 이벤트 핸들러 (더블 탭 감지)
  const handleTouchEnd = () => {
    if (!fullHeight) return;
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < doubleTapThreshold) {
      setSheetHeight((prev) => (prev === "95vh" ? "60vh" : "95vh"));
      lastTapRef.current = null;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackground
          isVisible={isOpen}
          onClose={onClose}
          closeOnBackgroundClick={closeOnBackgroundClick}
        >
          <motion.div
            className={`${styles.bottomSheetContainer} ${className || ""}`}
            style={{ height: sheetHeight }}
            animate={{ y: "0%", height: sheetHeight }}
            initial={{ y: "100%", height: sheetHeight }}
            exit={{ y: "100%", height: sheetHeight }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={styles.handleWrapper}
              onDoubleClick={handleDoubleClick}
              onTouchEnd={handleTouchEnd}
            >
              <button className={styles.handleButton} />
            </div>
            {title && (
              <div className={styles.bottomSheetHeader}>
                <DefaultText type="title4">{title}</DefaultText>
                <button onClick={onClose}>
                  <SvgIcon src={CloseButton} />
                </button>
              </div>
            )}
            <div className={styles.bottomSheetContentWrapper}>{children}</div>
          </motion.div>
        </ModalBackground>
      )}
    </AnimatePresence>
  );
}
