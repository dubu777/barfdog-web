import ModalBackground from "../modalBackground/ModalBackground";
import * as styles from "./Modal.css";
import DefaultText from "../defaultText/DefaultText";
import Button from "../button/Button";
import { useCallback, useMemo } from "react";

interface ModalProps {
  title: string;
  content: string;
  buttonType?: "default" | "text";
  confirmText?: string;
  cancelText?: string;
  buttonPosition?: "center" | "right";
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  content,
  buttonType = "default",
  confirmText,
  cancelText,
  buttonPosition = "center",
  onConfirm,
  onCancel,
  isOpen,
  onClose,
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
    <ModalBackground isVisible={isOpen} onClose={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContentWrapper}>
          <DefaultText type="title4">{title}</DefaultText>
          <DefaultText type="body2">{content}</DefaultText>
        </div>
        <div className={styles.modalButtonWrapper}>
          {cancelText && (
            <Button
              type={cancelType}
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
              type={confirmType}
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
