import { SUBSCRIPTION_STATUS_STEPS } from '@/constants/mypage/subscription';
import { VisibleSubscribeStatus } from '@/types/mypage/subscription';

/**
 * 구독 상태의 단계 번호를 반환
 * @param subscriptionStatus 구독 상태
 * @returns 단계 번호 (1-4)
 */
export const getSubscriptionStatusStep = (subscriptionStatus: VisibleSubscribeStatus): number => {
  return SUBSCRIPTION_STATUS_STEPS[subscriptionStatus] ?? 0;
};

/**
 * 현재 구독 상태가 목표 구독 상태 이상인지 확인
 * @param currentStatus 현재 구독 상태
 * @param targetStatus 목표 구독 상태
 * @returns 목표 상태 이상이면 true
 */
export const isSubscriptionStatusStepAbove = (
  currentStatus: VisibleSubscribeStatus, 
  targetStatus: VisibleSubscribeStatus
): boolean => {
  return getSubscriptionStatusStep(currentStatus) >= getSubscriptionStatusStep(targetStatus);
};

/**
 * 현재 구독 상태가 목표 구독 상태 이하인지 확인
 * @param currentStatus 현재 구독 상태
 * @param targetStatus 목표 구독 상태
 * @returns 목표 상태 이하이면 true
 */
export const isSubscriptionStatusStepBelow = (
  currentStatus: VisibleSubscribeStatus, 
  targetStatus: VisibleSubscribeStatus
): boolean => {
  return getSubscriptionStatusStep(currentStatus) > 0 && 
    getSubscriptionStatusStep(currentStatus) <= getSubscriptionStatusStep(targetStatus);
};

/**
 * 현재 구독 상태가 목표 구독 상태와 같은지 확인
 * @param currentStatus 현재 구독 상태
 * @param targetStatus 목표 구독 상태
 * @returns 목표 상태와 같으면 true
 */
export const isSubscriptionStatusStepEqual = (
  currentStatus: VisibleSubscribeStatus, 
  targetStatus: VisibleSubscribeStatus
): boolean => {
  return getSubscriptionStatusStep(currentStatus) === getSubscriptionStatusStep(targetStatus);
};
/**
 * 구독 중 상태인지 확인
 * @param subscriptionStatus 구독 상태
 * @returns 구독 해지 상태면 true
 */
export const isSubscribingStatus = (subscriptionStatus: VisibleSubscribeStatus): boolean => {
  return isSubscriptionStatusStepEqual(subscriptionStatus, 'SUBSCRIBING');
};
/**
 * 구독 해지 상태인지 확인
 * @param subscriptionStatus 구독 상태
 * @returns 구독 해지 상태면 true
 */
export const isSubscriptionPendingStatus = (subscriptionStatus: VisibleSubscribeStatus): boolean => {
  return isSubscriptionStatusStepEqual(subscriptionStatus, 'SUBSCRIBE_PENDING');
};

/**
 * 구독 해지 상태인지 확인
 * @param subscriptionStatus 구독 상태
 * @returns 구독 해지 상태면 true
 */
export const isSubscriptionCancelStatus = (subscriptionStatus: VisibleSubscribeStatus): boolean => {
  return isSubscriptionStatusStepEqual(subscriptionStatus, 'SUBSCRIBE_CANCEL');
};

/**
 * 구독 취소 예정 상태인지 확인
 * @param subscriptionStatus 구독 상태
 * @returns 구독 취소 예정 상태면 true
 */
export const isSubscriptionWillCancelStatus = (subscriptionStatus: VisibleSubscribeStatus): boolean => {
  return isSubscriptionStatusStepEqual(subscriptionStatus, 'SUBSCRIBE_WILL_CANCEL');
};
