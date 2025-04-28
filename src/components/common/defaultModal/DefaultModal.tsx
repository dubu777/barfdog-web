import * as styles from "./DefaultModal.css";
import { ReactNode } from "react";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import CloseButton from "/public/images/icons/close-black.png";
import Image from "next/image";
import ModalBackground from "../modalBackground/ModalBackground";
import Button from "@/components/common/button/Button";

interface DefaultModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  size: "sm" | "md" | "lg" | "xl";
  type: "alert" | "info";
  cancelText?: string;
  confirmText?: string;
  scroll?: boolean;
  onClickConfirm?: () => void;
  extraButton?: boolean;
  extraButtonText?: string;
  onClickExtraButton?: () => void;
  confirmDisabled?: boolean;
}

export default function DefaultModal({
  children,
  isVisible,
  onClose,
  size,
  type,
  cancelText,
  confirmText,
  scroll,
  onClickConfirm,
  extraButton,
  extraButtonText,
  onClickExtraButton,
  confirmDisabled = false,
}: DefaultModalProps) {
  return (
    <ModalBackground isVisible={isVisible} onClose={onClose}>
      <div
        className={styles.modalContainer({ size, scroll })}
        onClick={(e) => e.stopPropagation()}
      >
        {type === "info" && (
          <div className={styles.closeButtonWrapper}>
            <Image
              onClick={onClose}
              src={CloseButton}
              alt="close button"
              width={10}
              height={10}
            />
          </div>
        )}
        <div className={styles.modalContentWrapper({ scroll })}>{children}</div>
        {type === "alert" && (
          <div className={styles.modalButtonWrapper}>
            <Button variant='outline' size="sm" onClick={onClose} fullWidth>
              {cancelText}
            </Button>
            <Button size="sm" onClick={onClickConfirm} disabled={confirmDisabled} fullWidth>
              {confirmText}
            </Button>
          </div>
        )}
        {extraButton && (
          <DefaultButton size="md" onClick={onClickExtraButton} borderRadius="sm">
            {extraButtonText}
          </DefaultButton>
        )}
      </div>
    </ModalBackground>
  );
}
