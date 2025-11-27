import * as styles from "./FullModalWrapper.css";
import { backgroundColors } from "@/components/layout/header/Header.css";
import { forwardRef, ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import ModalBackground from "@/components/ui/modalBackground/ModalBackground";
import Header from "@/components/layout/header/Header";

type AnimationType = "slideUp" | "none";

interface FullModalWrapperProps {
  isVisible: boolean;
  handleClose?: () => void;
  handleGoBack?: () => void;
  children: ReactNode;
  headerTitle?: string;
  rightElement?: ReactNode;
  headerBackgroundColor?: keyof typeof backgroundColors;
  className?: string;
  /**
   * 애니메이션 타입
   * - "slideUp": 아래에서 위로 슬라이드 (기본값)
   * - "none": 애니메이션 없음
   */
  animationType?: AnimationType;
}

const animationVariants: Record<AnimationType, Variants> = {
  slideUp: {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "100%" },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

const FullModalWrapper = forwardRef<HTMLDivElement, FullModalWrapperProps>(
  (
    {
      isVisible,
      handleClose,
      handleGoBack,
      children,
      headerTitle,
      rightElement,
      headerBackgroundColor = "gray0",
      className,
      animationType = "slideUp",
    },
    ref
  ) => {
    const animation = animationVariants[animationType];
    return (
      <AnimatePresence>
        {isVisible && (
          <ModalBackground
            isVisible={isVisible}
            onClose={handleClose || handleGoBack}
            closeOnBackgroundClick={false}
            isDimmed={false}
          >
            <motion.div
              ref={ref}
              className={`${styles.modalContainer} ${className || ""}`}
              onClick={(e) => e.stopPropagation()}
              variants={animation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Header
                {...(headerTitle ? { centerTitle: headerTitle } : {})}
                rightElement={rightElement}
                showCloseButton={!!handleClose}
                showBackButton={!!handleGoBack}
                onClose={handleClose}
                onBack={handleGoBack}
                backgroundColor={headerBackgroundColor}
              />
              <div className={styles.modalContent}>{children}</div>
            </motion.div>
          </ModalBackground>
        )}
      </AnimatePresence>
    );
  }
);
FullModalWrapper.displayName = "FullModalWrapper";

export default FullModalWrapper;
