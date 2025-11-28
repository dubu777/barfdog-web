import ModalBackground from "../../modalBackground/ModalBackground";
import * as styles from "./AlertModal.css";
import Text from "../../text/Text";
import Button from "../../button/Button";
import { ReactNode, useCallback, useMemo } from "react";

interface ModalProps {
  title: string;
  content: string | ReactNode;
  buttonType?: "default" | "text";
  confirmText?: string;
  cancelText?: string;
  buttonPosition?: "center" | "right";
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
  closeOnBackgroundClick?: boolean;
}

export default function AlertModal({
  title,
  content,
  buttonType = "default",
  confirmText,
  cancelText,
  buttonPosition = "right",
  onConfirm,
  onCancel,
  isOpen,
  onClose,
  closeOnBackgroundClick = true,
}: ModalProps) {
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  const { cancelType, cancelVariant, confirmType, confirmVariant } =
    useMemo(() => {
      if (buttonType === "text") {
        return {
          cancelType: "assistive" as const,
          cancelVariant: "text" as const,
          confirmType: "primary" as const,
          confirmVariant: "text" as const,
        };
      }
      return {
        cancelType: "assistive" as const,
        cancelVariant: "outline" as const,
        confirmType: "primary" as const,
        confirmVariant: "solid" as const,
      };
    }, [buttonType]);

  if (!isOpen) return null;

  return (
    <ModalBackground
      isVisible={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={closeOnBackgroundClick}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContentWrapper}>
          {title && <Text type="title4">{title}</Text>}
          <Text type="body2">{content}</Text>
        </div>
        <div className={styles.modalButtonWrapper}>
          {cancelText && (
            <Button
              intent={cancelType}
              variant={cancelVariant}
              size="sm"
              onClick={handleCancel}
              fullWidth={buttonPosition === "center"}
            >
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button
              intent={confirmType}
              variant={confirmVariant}
              size="sm"
              onClick={handleConfirm}
              fullWidth={buttonPosition === "center"}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </ModalBackground>
  );
}
