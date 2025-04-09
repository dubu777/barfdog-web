"use client";

import { useState, ReactNode, useCallback, useEffect } from "react";
import Modal from "@/components/common/modal/Modal";
import { useRouter } from "next/navigation";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";
import NewHeader from "@/components/layout/newHeader/NewHeader";

interface OrderNavigationGuardProps {
  children: ReactNode;
  modalTitle?: string;
  modalContent?: string;
  confirmText?: string;
  cancelText?: string;
  fallbackUrl?: string;
}

export default function OrderNavigationGuard({
  children,
  modalTitle = "주문 취소",
  modalContent = "주문을 취소하고 나가시겠어요?",
  confirmText = "네",
  cancelText = "아니요",
  fallbackUrl,
}: OrderNavigationGuardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleBack = useCallback(() => {
    setShowModal(true);
  }, []);

  const onConfirm = () => {
    if (fallbackUrl) {
      router.push(fallbackUrl);
    } else {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
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
      <NewHeader showBackButton centerTitle="결제" onBack={handleBack} />
      {children}
      <Modal
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
