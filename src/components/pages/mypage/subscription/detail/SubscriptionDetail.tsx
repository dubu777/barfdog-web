'use client';
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import BasicInfo from "./info/basicInfo/BasicInfo";
import PaymentInfo from "./info/paymentInfo/PaymentInfo";
import SubscriptionInfo from "./info/subscriptionInfo/SubscriptionInfo";
import PaymentMethodInfo from "./info/paymentMethodInfo/PaymentMethodInfo";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import ChangePaymentMethodModal from "./modal/ChangePaymentMethodModal";
import CancelSubscriptionModal from "./modal/CancelSubscriptionModal";
import NextPaymentCouponModal from "./modal/NextPaymentCouponModal";
import SkipSubscriptionModal from "./modal/SkipSubscriptionModal";
import CancelNextPaymentCouponBottomSheet from "./bottomSheet/CancelNextPaymentCouponBottomSheet";
import { useGetSubscriptionDetail } from "@/api/mypage/subscription/queries/useGetSubscriptionDetail";
import { useGetPaymentList } from "@/api/mypage/subscription/queries/useGetPaymentList";
import { isSubscribingStatus } from "@/utils/mypage/subscription/subscriptionStatusStep";
import { VisibleSubscribeStatus } from "@/types/mypage/subscription";
import { useSubscriptionActions } from "@/hooks/mypage/subscription/useSubscriptionActions";
import { useSubscriptionModalControl } from "@/hooks/mypage/subscription/useSubscriptionModalControl";
import { canSkipSubscription } from "@/utils/mypage/subscription/subscriptionSkip";

interface SubscriptionDetailProps {
  subscriptionId: number;
}

export default function SubscriptionDetail({ subscriptionId }: SubscriptionDetailProps) {
  const { data } = useGetSubscriptionDetail(subscriptionId);
  const { subscriptionInfo, subscriptionRecipeInfo } = data;
  const subscribeStatus = subscriptionInfo.subscribeStatus as VisibleSubscribeStatus;
  
  const { data: paymentList } = useGetPaymentList();
  const paymentInfo = (paymentList as any[]).find((payment) => payment.subscribeCardDto.subscribeId === subscriptionId);

  const {
    modals,
    closeModal,
    bottomSheets,
    closeBottomSheet,
    openChangePaymentMethodModal,
    openChangePaymentMethodErrorModal,
    openCancelSubscriptionModal,
    openCancelSubscriptionConfirmModal,
    openApplyNextPaymentCouponModal,
    openCancelNextPaymentCouponBottomSheet,
    openSkipSubscriptionErrorModal,
    openSkipSubscriptionModal,
    openSkipSubscriptionConfirmModal,
  } = useSubscriptionModalControl();

  // TODO: 하단 기능 로직 구현 필요
  const { 
    onApplyNextPaymentCoupon, 
    onCancelAppliedNextPaymentCoupon,
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
          openApplyNextPaymentCouponModal={
            isSubscribingStatus(subscribeStatus) 
            ? openApplyNextPaymentCouponModal 
            : undefined
          }
          openCancelNextPaymentCouponBottomSheet={
            isSubscribingStatus(subscribeStatus) 
            ? openCancelNextPaymentCouponBottomSheet 
            : undefined
          }
        />
        <Divider thickness={8} color="gray100" />
        <SubscriptionInfo
          plan={subscriptionInfo.plan}
          canSkipSubscription={canSkipSubscription(subscriptionInfo.nextPaymentDate)}
          subscriptionRecipeInfo={subscriptionRecipeInfo}
          oneMealGramsPerRecipe={subscriptionInfo.oneMealGramsPerRecipe.split(',')}
          subscriptionActions={
            isSubscribingStatus(subscribeStatus)
              ? {
                  onEditSubscription: onEditSubscription,
                  onSkipSubscription: () => {
                    if (canSkipSubscription(subscriptionInfo.nextPaymentDate)) {
                      openSkipSubscriptionModal();
                    } else {
                      openSkipSubscriptionErrorModal();
                    }
                  },
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
          cancelSubscriptionConfirmModal={modals.cancelSubscriptionConfirm ?? false}
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
      {bottomSheets.cancelNextPaymentCoupon &&
        subscriptionInfo.usingMemberCouponId && (
          <CancelNextPaymentCouponBottomSheet
            isOpen={bottomSheets.cancelNextPaymentCoupon}
            onClose={() => closeBottomSheet('cancelNextPaymentCoupon')}
            onCancelAppliedNextPaymentCoupon={onCancelAppliedNextPaymentCoupon}
            openApplyNextPaymentCouponModal={openApplyNextPaymentCouponModal}
            couponInfo={{
              discount: subscriptionInfo.discountCoupon ?? 0,
              memberCouponId: subscriptionInfo.usingMemberCouponId ?? 0,
              overDiscount: subscriptionInfo.overDiscount ?? 0,
              couponName: subscriptionInfo.couponName ?? '',
            }}
          />
      )}
      {modals.skipSubscription && (
        <SkipSubscriptionModal
          isOpen={modals.skipSubscription}
          onClose={() => closeModal('skipSubscription')}
          nextDeliveryDate={subscriptionInfo.nextDeliveryDate}
          plan={subscriptionInfo.plan}
          openSkipSubscriptionConfirmModal={openSkipSubscriptionConfirmModal}
        />
      )}
      {modals.skipSubscriptionError && (
        <AlertModal
          isOpen={modals.skipSubscriptionError}
          onClose={() => closeModal('skipSubscriptionError')}
          title="아직 배송 미루기를 이용할 수 없어요"
          content="배송 미루기는 다음 결제일 5일 전부터 이용하실 수 있어요"
          confirmText="확인"
          buttonPosition="center"
        />
      )}
      {modals.skipSubscriptionConfirm && (
        <AlertModal
          isOpen={modals.skipSubscriptionConfirm}
          onClose={() => closeModal('skipSubscriptionConfirm')}
          title="1주 건너뛰기를 적용할까요?"
          content="미루기를 적용하면 되돌릴 수 없어요. 이번 회차의 배송 일정이 선택하신 기간만큼 늦춰지고 다음 결제 일정도 함께 변경됩니다"
          confirmText="확인"
          cancelText="취소"
          onConfirm={onSkipSubscription}
          buttonPosition="center"
        />
      )}

    </>
  );
}