import { HIDDEN_STATUS_LIST, VISIBLE_STATUS_LIST } from '@/constants/mypage/orders';
import { OrderStatus } from '@/types/mypage/orders';

/**
 * 주문 상태가 노출 가능한 상태인지 확인하는 함수
 * @param orderStatus 주문 상태
 * @returns 노출 가능 여부
 */
export const isVisibleOrderStatus = (orderStatus: OrderStatus): boolean => {
  return VISIBLE_STATUS_LIST.includes(orderStatus);
};

/**
 * 주문 상태가 미노출 상태인지 확인하는 함수
 * @param orderStatus 주문 상태
 * @returns 미노출 여부
 */
export const isHiddenOrderStatus = (orderStatus: OrderStatus): boolean => {
  return HIDDEN_STATUS_LIST.includes(orderStatus);
};

/**
 * 주문 목록에서 노출 가능한 주문만 필터링하는 함수
 * @param orders 주문 목록
 * @returns 노출 가능한 주문 목록
 */
export const filterVisibleOrders = <T extends { orderInfo: { orderStatus: OrderStatus } }>(
  orders: T[]
): T[] => {
  return orders.filter(order => isVisibleOrderStatus(order.orderInfo.orderStatus));
};