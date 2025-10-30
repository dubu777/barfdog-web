import { useState } from 'react';

export function useSubscriptionModalControl() {
  const [modals, setModals] = useState({
    keepSubscription: false,
    changePaymentMethod: false,
    changePaymentMethodError: false,
    cancelSubscription: false,
    cancelSubscriptionConfirm: false,
    applyNextPaymentCoupon: false,
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
    openKeepSubscriptionModal: () => openModal('keepSubscription'),
    openChangePaymentMethodModal: () => openModal('changePaymentMethod'),
    openChangePaymentMethodErrorModal: () => openModal('changePaymentMethodError'),
    openCancelSubscriptionModal: () => openModal('cancelSubscription'),
    openCancelSubscriptionConfirmModal: () => openModal('cancelSubscriptionConfirm'),
    openApplyNextPaymentCouponModal: () => openModal('applyNextPaymentCoupon'),
  };
}
