import { CancelSubscriptionProps, ChangePaymentMethodProps } from "@/types/mypage/subscription";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * 주문 관련 액션 훅
 * @returns {Object} 구독 관련 액션 함수들
 * 
 * SUBSCRIBING 상태일 때
 * @returns {Function} onApplyCoupon - 다음 회차 쿠폰 적용
 * @returns {Function} onEditSubscription - 식단 변경
 * @returns {Function} onSkipSubscription - 구독 건너뛰기
 * @returns {Function} onChangePaymentMethod - 결제 수단 변경
 * @returns {Function} onCancelSubscription - 구독 해지
 * 
 * SUBSCRIBING, SUBSCRIBE_PENDING 상태일 때
 * @returns {Function} onGoToDetail - 구독 상세 정보 확인/변경
 * 
 * SUBSCRIBE_PENDING, SUBSCRIBE_CANCEL 상태일 때
 * @returns {Function} onRetryPayment - 결제 수단 변경/재시도
 * 
 * SUBSCRIBE_WILL_CANCEL 상태일 때
 * @returns {Function} onKeepSubscription - 구독 유지하기
 */

export function useSubscriptionActions({ subscriptionId }: { subscriptionId?: number }) {
  const router = useRouter(); 

 // ------------------- 상세 ------------------- 
  const onApplyCoupon = useCallback(() => {
    console.log('다음 회차 쿠폰 적용');
  }, []);
  const onEditSubscription = useCallback(() => {
    console.log('식단 변경');
  }, []);
  const onSkipSubscription = useCallback(() => {
    console.log('구독 건너뛰기');
  }, []);

  const onChangePaymentMethod = useCallback(({
    onSuccess,
    onError,
  }: ChangePaymentMethodProps) => {
    const isSuccess = true;
    console.log('결제 수단 변경');
    if (isSuccess) {  
      onSuccess();
    } else {
      // error
      onError();
    }
  }, [])

  const onCancelSubscription = useCallback((body: CancelSubscriptionProps) => {
    console.log('구독 해지', body);
    router.push(`/mypage/subscription/`);
  }, []);

  // ------------------- 리스트 ------------------- 
  const onGoToDetail = useCallback((id: number) => {
    console.log('상세 정보 확인/변경', id);
    if (!id) return;

    router.push(`/mypage/subscription/${id}`);
  }, []);


  const onRetryPayment = useCallback((id: number) => {
    console.log('결제 수단 변경/재시도', id);
  }, []);


  // TODO: 구독 리스트 id값 인자로 받아서 처리 필요, 리스트 무효화 필요
  const onKeepSubscription = useCallback((id: number) => {
    console.log('구독 유지하기', id);

  }, []);

  return {
    onApplyCoupon,
    onEditSubscription,
    onSkipSubscription,
    onCancelSubscription,
    onRetryPayment,
    onKeepSubscription,
    onChangePaymentMethod,
    onGoToDetail,
  };
}
