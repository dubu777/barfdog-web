import { useState } from 'react';

/**
 * 주문 관련 모달 제어 훅
 *
 * @returns {Object} 주문 관련 모달 제어 함수들
 * @returns {Object} modals - 모달 상태
 * @returns {Function} openModal - 모달 열기
 * @returns {Function} closeModal - 모달 닫기
 * @returns {Function} openCancelModal - 주문 취소 모달 열기
 * @returns {Function} openCancelRequestModal - 주문 취소 신청 모달 열기
 * @returns {Function} openCancelRequestSuccessModal - 주문 취소 신청 성공 모달 열기
 * @returns {Function} openConfirmModal - 주문 구매확정 모달 열기
 * @returns {Function} openExchangeReturnGuide - 주문 반품/교환 가이드 모달 열기
 */

export function useOrderModalControl() {
  // 모달 상태 중앙화
  const [modals, setModals] = useState({
    cancelRequest: false,
    cancelRequestSuccess: false,
    cancelConfirm: false,
    purchaseConfirm: false,
    exchangeReturnGuide: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  return {
    modals,
    openModal,
    closeModal,
    openCancelModal: () => openModal('cancelConfirm'),
    openCancelRequestModal: () => openModal('cancelRequest'),
    openCancelRequestSuccessModal: () => openModal('cancelRequestSuccess'),
    openConfirmModal: () => openModal('purchaseConfirm'),
    openExchangeReturnGuide: () => openModal('exchangeReturnGuide'),
  };
}
