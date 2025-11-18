import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import * as styles from "@/components/ui/bottomSheet/BottomSheet.css";
import CloseButton from "/public/images/icons/close.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import ModalBackground from "../modalBackground/ModalBackground";
import Text from "../text/Text";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children: ReactNode;
  closeOnBackgroundClick?: boolean;
  fullHeight?: boolean;
  className?: string;
  showCloseButton?: boolean;
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subTitle,
      children,
      closeOnBackgroundClick = true,
      fullHeight = false,
      className,
      showCloseButton = true,
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

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
              ref={innerRef}
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
                <div
                  className={styles.bottomSheetHeaderWrapper({
                    hasSubTitle: !!subTitle,
                  })}
                >
                  <div
                    className={styles.bottomSheetHeader({
                      hasSubTitle: !!subTitle,
                    })}
                  >
                    <Text type="title4">{title}</Text>
                    {showCloseButton && (
                      <button onClick={onClose}>
                        <SvgIcon src={CloseButton} />
                      </button>
                    )}
                  </div>
                  {subTitle && (
                    <Text type="label4" color="gray600">
                      {subTitle}
                    </Text>
                  )}
                </div>
              )}
              <div className={styles.bottomSheetContentWrapper}>{children}</div>
            </motion.div>
          </ModalBackground>
        )}
      </AnimatePresence>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
