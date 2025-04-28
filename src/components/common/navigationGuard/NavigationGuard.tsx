"use client";

import { useState, ReactNode, useCallback, useEffect } from "react";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import { useRouter } from "next/navigation";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";
import Header from "@/components/layout/header/Header";
import { backgroundColors } from "@/components/layout/header/Header.css";

interface NavigationGuardProps {
  children: ReactNode;
  modalTitle?: string;
  modalContent?: string;
  confirmText?: string;
  cancelText?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  centerTitle?: string;
  onBack?: () => void;
  leftElement?: React.ReactNode;
  backgroundColor?: keyof typeof backgroundColors;
  leftSlotGap?: "lg" | "sm";
}

export default function NavigationGuard({
  children,
  modalTitle = "주문 취소",
  modalContent = "주문을 취소하고 나가시겠어요?",
  confirmText = "네",
  cancelText = "아니요",
  showCloseButton = false,
  showBackButton = true,
  centerTitle,
  leftElement,
  backgroundColor = "gray0",
  leftSlotGap = "lg",
  onBack,
}: NavigationGuardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleBack = useCallback(() => {
    setShowModal(true);
  }, []);

  const onConfirm = () => {
    router.push("/");
  };

  const { confirmLeaving, disableGuard } = useNavigationGuard({
    onConfirm,
    isLeaving,
    setIsLeaving,
    setShowModal,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__disableNavigationGuard = disableGuard;
    }
  }, [disableGuard]);

  const handleContinueOrder = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header
        showBackButton={showBackButton}
        showCloseButton={showCloseButton}
        onBack={onBack ?? handleBack}
        onClose={handleBack}
        backgroundColor={backgroundColor}
        leftSlotGap={leftSlotGap}
        {...(centerTitle ? { centerTitle } : {})}
        {...(leftElement ? { leftElement } : {})}
      />
      {children}
      <AlertModal
        isOpen={showModal}
        onClose={handleContinueOrder}
        title={modalTitle}
        content={modalContent}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={confirmLeaving}
        onCancel={handleContinueOrder}
      />
    </>
  );
}
