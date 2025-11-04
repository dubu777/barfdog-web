"use client";

import { useAlertModalStore } from "@/store/useAlertModalStore";
import AlertModal from "../alertModal/AlertModal";

export default function GlobalAlertModal() {
  const { isOpen, modal, close } = useAlertModalStore();
  if (!modal) return null;

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={close}
      title={modal.title}
      content={modal.content}
      confirmText={modal.confirmText}
      cancelText={modal.cancelText}
      buttonType={modal.buttonType}
      buttonPosition={modal.buttonPosition}
      onConfirm={modal.onConfirm}
      onCancel={modal.onCancel}
      closeOnBackgroundClick={modal.closeOnBackgroundClick ?? false}
    />
  );
}
