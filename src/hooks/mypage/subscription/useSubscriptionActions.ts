import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { 
  ApplyNextPaymentCouponProps, 
  CancelSubscriptionProps, 
  ChangePaymentMethodProps,
} from "@/types/mypage/subscription";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { useApplyNextPaymentCoupon } from "@/api/mypage/subscription/mutations/useApplyNextPaymentCoupon";
import { useCancelAppliedNextPaymentCoupon } from "@/api/mypage/subscription/mutations/useCancelAppliedNextPaymentCoupon";

/**
 * 주문 관련 액션 훅
 * @returns {Object} 구독 관련 액션 함수들
 * 
 * SUBSCRIBING 상태일 때
 * @returns {Function} onApplyNextPaymentCoupon - 다음 회차 쿠폰 적용
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
  const queryClient = useQueryClient();

  const { mutate: applyNextPaymentCouponMutate } = useApplyNextPaymentCoupon();
  const { mutate: cancelAppliedNextPaymentCouponMutate } = useCancelAppliedNextPaymentCoupon();
  const { handleSuccess, handleError } = useApiResponseHandler();

  const invalidateSubscriptionDetail = useCallback((message: string, toastPosition: 'above-button' | 'bottom' = 'bottom') => {
    handleSuccess(message, toastPosition);
    queryClient.invalidateQueries({
      queryKey: [
        queryKeys.MYPAGE.BASE,
        queryKeys.MYPAGE.SUBSCRIPTION.BASE,
        queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
        subscriptionId,
      ],
    });
  }, [subscriptionId, queryClient, handleSuccess]);

 // ------------------- 상세 ------------------- 
  const onApplyNextPaymentCoupon = useCallback((body: ApplyNextPaymentCouponProps) => {
    if (!subscriptionId) return;

    console.log('다음 회차 쿠폰 적용', body);
    applyNextPaymentCouponMutate({
      subscribeId: subscriptionId,
      body,
    }, {
      onSuccess: () => {
        invalidateSubscriptionDetail('쿠폰 적용이 완료됐어요', 'above-button');
      },
      onError: (error) => {
        handleError(error, '쿠폰 적용에 실패했어요. 잠시 후 다시 시도해 주세요.', undefined, 'above-button');
      },
    });
  }, [subscriptionId, applyNextPaymentCouponMutate, invalidateSubscriptionDetail, handleError]);

  const onCancelAppliedNextPaymentCoupon = useCallback((
    body: ApplyNextPaymentCouponProps, 
    onSuccess: () => void, 
    onError: (error) => void,
  ) => {
    if (!subscriptionId) return;

    console.log('다음 회차 쿠폰 적용 취소', body);
    cancelAppliedNextPaymentCouponMutate({
      subscribeId: subscriptionId,
      body,
    }, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    });
  }, [subscriptionId, cancelAppliedNextPaymentCouponMutate]);

  const onEditSubscription = useCallback(() => {
    console.log('식단 변경');
  }, []);

  const onSkipSubscription = useCallback(() => {
    invalidateSubscriptionDetail('건너뛰기 적용이 완료됐어요');
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
      onError();
    }
  }, [])

  const onCancelSubscription = useCallback((body: CancelSubscriptionProps) => {
    console.log('구독 해지', body);
    router.push(`/mypage/subscription/`);
  }, [router]);

  // ------------------- 리스트 ------------------- 
  const onGoToDetail = useCallback((id: number) => {
    console.log('상세 정보 확인/변경', id);
    if (!id) return;

    router.push(`/mypage/subscription/${id}`);
  }, [router]);


  const onRetryPayment = useCallback((id: number) => {
    console.log('결제 수단 변경/재시도', id);
  }, []);


  // TODO: 구독 리스트 id값 인자로 받아서 처리 필요, 리스트 무효화 필요
  const onKeepSubscription = useCallback((id: number) => {
    console.log('구독 유지하기', id);

  }, []);

  return {
    onApplyNextPaymentCoupon,
    onEditSubscription,
    onSkipSubscription,
    onCancelSubscription,
    onRetryPayment,
    onKeepSubscription,
    onChangePaymentMethod,
    onGoToDetail,
    onCancelAppliedNextPaymentCoupon,
  };
}
