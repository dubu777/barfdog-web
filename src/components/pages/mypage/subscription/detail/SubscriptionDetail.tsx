'use client';
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import BasicInfo from "./info/basicInfo/BasicInfo";
import PaymentInfo from "./info/paymentInfo/PaymentInfo";
import SubscriptionInfo from "./info/subscriptionInfo/SubscriptionInfo";
import PaymentMethodInfo from "./info/paymentMethodInfo/PaymentMethodInfo";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import ChangePaymentMethodModal from "./modal/ChangePaymentMethodModal";
import CancelSubscriptionModal from "./modal/CancelSubscriptionModal";
import NextPaymentCouponModal from "./modal/NextPaymentCouponModal";
import { useGetSubscriptionDetail } from "@/api/mypage/subscription/queries/useGetSubscriptionDetail";
import { useGetPaymentList } from "@/api/mypage/subscription/queries/useGetPaymentList";
import { isSubscribingStatus } from "@/utils/mypage/subscription/subscriptionStatusStep";
import { VisibleSubscribeStatus } from "@/types/mypage/subscription";
import { useSubscriptionActions } from "@/hooks/mypage/subscription/useSubscriptionActions";
import { useSubscriptionModalControl } from "@/hooks/mypage/subscription/useSubscriptionModalControl";

interface SubscriptionDetailProps {
  subscriptionId: number;
}

export default function SubscriptionDetail({ subscriptionId }: SubscriptionDetailProps) {
  const { data } = useGetSubscriptionDetail(subscriptionId);
  const { subscriptionInfo, subscriptionRecipeInfo } = data;
  const subscribeStatus = subscriptionInfo.subscribeStatus as VisibleSubscribeStatus;
  
  const { data: paymentList } = useGetPaymentList();
  const paymentInfo = (paymentList as any[]).find((payment) => payment.subscribeCardDto.subscribeId === subscriptionId);

  console.log(data, 'data');
  
  const {
    modals,
    closeModal,
    openChangePaymentMethodModal,
    openChangePaymentMethodErrorModal,
    openCancelSubscriptionModal,
    openCancelSubscriptionConfirmModal,
    openApplyNextPaymentCouponModal,
  } = useSubscriptionModalControl();

  // TODO: 하단 기능 로직 구현 필요
  const { 
    onApplyNextPaymentCoupon, 
    onEditSubscription, 
    onSkipSubscription, 
    onChangePaymentMethod,
    onCancelSubscription, 
    onRetryPayment,
  } = useSubscriptionActions({ subscriptionId });

  if (!data) return null;
  return (
    <>
      <section
        className={commonWrapper({
          direction: 'col',
          align: 'start',
          paddingBottom: 60,
          backgroundColors: 'gray50',
        })}
      >
        <BasicInfo 
          subscriptionId={subscriptionId}
          plan={subscriptionInfo.plan}
          dogName={subscriptionInfo.dogName}
          recipeNames={subscriptionRecipeInfo.map((recipe) => recipe.name).join(', ')}
          status={subscriptionInfo.subscribeStatus}
          onRetryPayment={() => onRetryPayment(subscriptionId)}
        />
        <Divider thickness={8} color="gray100" />
        <PaymentInfo
          usingMemberCouponId={subscriptionInfo.usingMemberCouponId}
          nextPaymentPrice={subscriptionInfo.nextPaymentPrice}
          nextPaymentDate={subscriptionInfo.nextPaymentDate}
          nextDeliveryDate={subscriptionInfo.nextDeliveryDate}
          openApplyNextPaymentCouponModal={isSubscribingStatus(subscribeStatus) ? openApplyNextPaymentCouponModal : undefined}
        />
        <Divider thickness={8} color="gray100" />
        <SubscriptionInfo
          plan={subscriptionInfo.plan}
          subscriptionRecipeInfo={subscriptionRecipeInfo}
          oneMealGramsPerRecipe={subscriptionInfo.oneMealGramsPerRecipe.split(',')}
          subscriptionActions={
            isSubscribingStatus(subscribeStatus)
              ? {
                  onEditSubscription: onEditSubscription,
                  onSkipSubscription: onSkipSubscription,
                }
              : undefined
          }
        />
        <Divider thickness={8} color="gray100" />
        <PaymentMethodInfo 
          paymentMethod={paymentInfo?.paymentMethod}
          openChangePaymentMethodModal={
            isSubscribingStatus(subscribeStatus)
              ? openChangePaymentMethodModal
              : undefined
          }
        />
        {isSubscribingStatus(subscribeStatus) && 
          <button 
            onClick={openCancelSubscriptionModal} 
            className={commonWrapper({ 
              justify: 'start', 
              padding: 20, 
              paddingTop: 16, 
              paddingBottom: 0
            })}
          >
            <Text type="label4" color="gray700">구독 해지하기</Text>
          </button>
        }
      </section>
      {modals.changePaymentMethod && (
        <ChangePaymentMethodModal
          isOpen={modals.changePaymentMethod}
          onClose={() => closeModal('changePaymentMethod')}
          onChangePaymentMethod={onChangePaymentMethod}
          openChangePaymentMethodErrorModal={openChangePaymentMethodErrorModal}
        />
      )}
      {modals.changePaymentMethodError && (
        <AlertModal 
          isOpen={modals.changePaymentMethodError}
          onClose={() => closeModal('changePaymentMethodError')}
          title="결제수단 변경에 실패했어요"
          content="결제수단 변경이 완료되지 않았어요. 필요하실 때 다시 시도해주세요"
          confirmText="확인"
          buttonPosition="center"
          onConfirm={() => closeModal('changePaymentMethodError')}
        />
      )}
      {modals.cancelSubscription && (
        <CancelSubscriptionModal
          isOpen={modals.cancelSubscription}
          onClose={() => closeModal('cancelSubscription')}
          onCancelSubscription={onCancelSubscription}
          cancelSubscriptionConfirmModal={modals.cancelSubscriptionConfirm}
          openCancelSubscriptionConfirmModal={openCancelSubscriptionConfirmModal}
          closeCancelSubscriptionConfirmModal={() => closeModal('cancelSubscriptionConfirm')}
        />
      )}
      {modals.applyNextPaymentCoupon && (
        <NextPaymentCouponModal
          isOpen={modals.applyNextPaymentCoupon}
          onClose={() => closeModal('applyNextPaymentCoupon')}
          nextPaymentPrice={subscriptionInfo.nextPaymentPrice}
          onApplyNextPaymentCoupon={onApplyNextPaymentCoupon}
        />
      )}
    </>
  );
}