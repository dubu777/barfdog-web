import { OrderAction, OrderDeliveryInquiryStatus, OrderType } from "@/types";
import { COMMON_ACTIONS, ORDER_TYPE } from "@/constants";

// OrderCard status 상태별 label, actions 정의
export const getOrderStatusActions = (
	status: OrderDeliveryInquiryStatus,
	orderType: OrderType,
	actionType: 'orderDeliveryInquiry' | 'orderDetail' | 'orderIssue',
): { label: string; actions: OrderAction[] } => {
	const isSubscriptionOrderType = orderType === ORDER_TYPE.SUBSCRIPTION;

	const paymentActions = [
		actionType === 'orderDeliveryInquiry'
			? { label: '주문조회', ...COMMON_ACTIONS.orderDetail }
			: isSubscriptionOrderType
				? { label: '구독조회', ...COMMON_ACTIONS.subscriptionDetail }
				: { label: '상품 상세', ...COMMON_ACTIONS.itemDetail }
		,
		{ label: orderType === ORDER_TYPE.SUBSCRIPTION ? '구독취소' : '주문취소', ...COMMON_ACTIONS.orderCancel },
	]
	const inProductionActions = [
		{ label: '배송조회', ...COMMON_ACTIONS.deliveryTracking },
		{ label: '반품/교환', ...COMMON_ACTIONS.refundExchange },
	]
	const deliveryCompleteActions = [
		...inProductionActions,
		{ label: '구매확정', ...COMMON_ACTIONS.confirm, fullWidth: true },
	]
	const confirmationActions = [
		{ label: '배송조회', ...COMMON_ACTIONS.deliveryTracking },
		{ label: '리뷰작성', ...COMMON_ACTIONS.review },
	]
	const reviewCompletedActions = [
		{ label: '배송조회', ...COMMON_ACTIONS.deliveryTracking },
		orderType === ORDER_TYPE.SUBSCRIPTION
			? { label: '전체구독일정', ...COMMON_ACTIONS.subscriptionSchedule }
			: { label: '재구매', ...COMMON_ACTIONS.repurchase },
	]

	const baseActionsForStatus = {
		RESERVED_PAYMENT: {
			label: '결제예정',
			actions: paymentActions,
		},
		BEFORE_PAYMENT: {
			label: '결제예정',
			actions: paymentActions,
		},
		PAYMENT_DONE: {
			label: '결제완료',
			actions: paymentActions,
		},
		PRODUCING: {
			label: '배송준비',
			actions: inProductionActions,
		},
		DELIVERY_READY: {
			label: '배송준비',
			actions: inProductionActions,
		},
		DELIVERY_START: {
			label: '배송중',
			actions: inProductionActions,
		},
		DELIVERY_DONE: {
			label: '배송완료',
			actions: deliveryCompleteActions,
		},
		CONFIRM: {
			label: '구매확정',
			actions: confirmationActions,
		},
		REVIEW_SUBMIT: {
			label: '구매확정',
			actions: reviewCompletedActions,
		},
	}
	return baseActionsForStatus[status];
}
