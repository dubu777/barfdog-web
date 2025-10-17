import { ORDER_STATUS_STEPS } from '@/constants/mypage/orders';
import { VisibleOrderStatus } from '@/types/mypage/orders';

/**
 * 주문 상태의 단계 번호를 반환
 * @param orderStatus 주문 상태
 * @returns 단계 번호 (0-6, 취소/반품/교환은 0)
 */
export const getOrderStatusStep = (orderStatus: VisibleOrderStatus): number => {
  return ORDER_STATUS_STEPS[orderStatus] ?? 0;
};

/**
 * 현재 주문 상태가 목표 주문 상태 이상인지 확인
 * @param currentStatus 현재 주문 상태
 * @param targetStatus 목표 주문 상태
 * @returns 목표 상태 이상이면 true
 */
export const isOrderStatusStepAbove = (
  currentStatus: VisibleOrderStatus, 
  targetStatus: VisibleOrderStatus
): boolean => {
  return getOrderStatusStep(currentStatus) >= getOrderStatusStep(targetStatus);
};

/**
 * 현재 주문 상태가 목표 주문 상태 이하인지 확인
 * @param currentStatus 현재 주문 상태
 * @param targetStatus 목표 주문 상태
 * @returns 목표 상태 이하이면 true
 */
export const isOrderStatusStepBelow = (
  currentStatus: VisibleOrderStatus, 
  targetStatus: VisibleOrderStatus
): boolean => {
  return getOrderStatusStep(currentStatus) <= getOrderStatusStep(targetStatus);
};

/**
 * 현재 주문 상태가 목표 주문 상태와 같은지 확인
 * @param currentStatus 현재 주문 상태
 * @param targetStatus 목표 주문 상태
 * @returns 목표 상태와 같으면 true
 */
export const isOrderStatusStepEqual = (
  currentStatus: VisibleOrderStatus, 
  targetStatus: VisibleOrderStatus
): boolean => {
  return getOrderStatusStep(currentStatus) === getOrderStatusStep(targetStatus);
};

/**
 * 주문 상태가 정상 진행 단계인지 확인 (취소/반품/교환 제외).
 * @param orderStatus 주문 상태
 * @returns 정상 진행 단계이면 true
 */
export const isNormalOrderStatus = (orderStatus: VisibleOrderStatus): boolean => {
  return getOrderStatusStep(orderStatus) > 0;
};

/**
 * 주문 상태가 취소/반품/교환 관련인지 확인
 * @param orderStatus 주문 상태
 * @returns 취소/반품/교환 관련이면 true
 */
export const isCancelReturnExchangeStatus = (orderStatus: VisibleOrderStatus): boolean => {
  return getOrderStatusStep(orderStatus) === 0;
};

/**
 * 배송 관련 정보를 보여줄 수 있는 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 배송 정보 표시 가능하면 true
 */
export const canShowDeliveryInfo = (orderStatus: VisibleOrderStatus): boolean => {
  return isOrderStatusStepAbove(orderStatus, 'DELIVERY_BEFORE_COLLECTION');
};

/**
 * 생산 관련 정보를 보여줄 수 있는 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 생산 정보 표시 가능하면 true
 */
export const canShowProductionInfo = (orderStatus: VisibleOrderStatus): boolean => {
  return isOrderStatusStepAbove(orderStatus, 'PRODUCING');
};

/**
 * 결제 완료 이후 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 결제 완료 이후면 true
 */
export const isAfterPayment = (orderStatus: VisibleOrderStatus): boolean => {
  return isOrderStatusStepAbove(orderStatus, 'PAYMENT_DONE');
};

/**
 * 배송 완료 이후 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 배송 완료 이후면 true
 */
export const isAfterDelivery = (orderStatus: VisibleOrderStatus): boolean => {
  return isOrderStatusStepAbove(orderStatus, 'DELIVERY_DONE');
};

/**
 * 환불 정보를 보여줄 수 있는 상태인지 확인 (취소/반품/교환 완료)
 * @param orderStatus 주문 상태
 * @returns 환불 정보 표시 가능하면 true
 */
export const canShowRefundInfo = (orderStatus: VisibleOrderStatus): boolean => {
  return [
    'CANCEL_DONE_SELLER',
    'CANCEL_DONE_BUYER',
    'RETURN_DONE_SELLER',
    'RETURN_DONE_BUYER',
    'EXCHANGE_DONE_SELLER',
    'EXCHANGE_DONE_BUYER',
  ].includes(orderStatus);
};

/**
 * 취소 완료 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 취소 완료면 true
 */
export const isCancelCompleted = (orderStatus: VisibleOrderStatus): boolean => {
  return ['CANCEL_DONE_SELLER', 'CANCEL_DONE_BUYER'].includes(orderStatus);
};

/**
 * 반품 완료 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 반품 완료면 true
 */
export const isReturnCompleted = (orderStatus: VisibleOrderStatus): boolean => {
  return ['RETURN_DONE_SELLER', 'RETURN_DONE_BUYER'].includes(orderStatus);
};

/**
 * 교환 완료 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 교환 완료면 true
 */
export const isExchangeCompleted = (orderStatus: VisibleOrderStatus): boolean => {
  return ['EXCHANGE_DONE_SELLER', 'EXCHANGE_DONE_BUYER'].includes(orderStatus);
};

/**
 * 취소/반품/교환 요청 상태인지 확인
 * @param orderStatus 주문 상태
 * @returns 요청 상태면 true
 */
export const isCancelReturnExchangeRequest = (orderStatus: VisibleOrderStatus): boolean => {
  return [
    'CANCEL_REQUEST',
    'RETURN_REQUEST',
    'EXCHANGE_REQUEST',
  ].includes(orderStatus);
};
