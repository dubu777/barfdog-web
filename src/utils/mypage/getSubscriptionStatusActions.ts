import { OrderAction, SubscriptionOrderStatus } from "@/types";
import { COMMON_ACTIONS } from "@/constants";

// SubscriptionCard status 상태별 actions 정의
export const getSubscriptionStatusActions = (
	status: SubscriptionOrderStatus,
	hasPostpone: boolean,
	actionType: 'mypage' | 'subscription' | 'subscriptionDetail'
): OrderAction[] => {

	const commonActions = {
		MYPAGE_POSTPONE_ACTIONS: [
			{ label: "미루기 적용중", ...COMMON_ACTIONS.postponeShipping },
			{ label: "식단변경", ...COMMON_ACTIONS.changeRecipe },
		],
		MYPAGE_PRODUCING_ACTIONS: [
			{ label: "배송조회", ...COMMON_ACTIONS.deliveryTracking },
			{ label: "식단상세", ...COMMON_ACTIONS.recipeDetail },
		],
		SUBSCRIPTION_BASE_ACTIONS: [
			{ label: "전체구독일정", ...COMMON_ACTIONS.subscriptionSchedule },
			{ label: "상세 정보 확인/변경", ...COMMON_ACTIONS.subscriptionDetail },
		],
		COUPON_ACTION: { label: "쿠폰사용", ...COMMON_ACTIONS.usingCoupon },
		CHANGE_RECIPE_ACTION: { label: "식단변경", ...COMMON_ACTIONS.changeRecipe },
		POSTPONE_SHIPPING_ACTION: { label: "배송 미루기", ...COMMON_ACTIONS.postponeShipping },
		DELIVERY_TRACKING_ACTION: { label: "배송조회", ...COMMON_ACTIONS.deliveryTracking },
		REVIEW_ACTION: { label: "리뷰작성", ...COMMON_ACTIONS.review },
		CONFIRM_ACTION: { label: "구매확정", ...COMMON_ACTIONS.confirm },
		RESUBSCRIBE_ACTION: { label: "재구독하고 최대 - 할인 혜택 받기", ...COMMON_ACTIONS.resubscribe },
		CHANGE_PAYMENT_METHOD_ACTION: { label: "결제 수단 변경/재시도", ...COMMON_ACTIONS.changePaymentMethod },
		SUBSCRIPTION_SCHEDULE_ACTION: { label: "전체구독일정", ...COMMON_ACTIONS.subscriptionSchedule, fullWidth: true },
	};

	const prePaymentActions = {
		mypage: hasPostpone
			? [...commonActions.MYPAGE_POSTPONE_ACTIONS]
			: [commonActions.POSTPONE_SHIPPING_ACTION, commonActions.CHANGE_RECIPE_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS],
		subscriptionDetail: [commonActions.SUBSCRIPTION_SCHEDULE_ACTION],
	}

	const postPaymentActions = {
		mypage: [commonActions.SUBSCRIPTION_SCHEDULE_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS],
		subscriptionDetail: [commonActions.SUBSCRIPTION_SCHEDULE_ACTION],
	}

	const inProductionActions = {
		mypage: [{ ...commonActions.DELIVERY_TRACKING_ACTION, fullWidth: true }],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS],
		subscriptionDetail: [commonActions.SUBSCRIPTION_SCHEDULE_ACTION],
	}

	const deliveryCompleteActions = {
		mypage: [commonActions.DELIVERY_TRACKING_ACTION, commonActions.CONFIRM_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, {...commonActions.CONFIRM_ACTION, fullWidth: true}],
		subscriptionDetail: [{...commonActions.SUBSCRIPTION_SCHEDULE_ACTION, fullWidth: false}, commonActions.CONFIRM_ACTION],
	}

	const confirmationAction = {
		mypage: [commonActions.DELIVERY_TRACKING_ACTION, commonActions.REVIEW_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, {...commonActions.REVIEW_ACTION, fullWidth: true}],
		subscriptionDetail: [{...commonActions.SUBSCRIPTION_SCHEDULE_ACTION, fullWidth: false}, commonActions.REVIEW_ACTION],
	}

	const subscriptionHoldActions = {
		mypage: [commonActions.CHANGE_PAYMENT_METHOD_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, commonActions.CHANGE_PAYMENT_METHOD_ACTION],
		subscriptionDetail: [{...commonActions.SUBSCRIPTION_SCHEDULE_ACTION, fullWidth: false}, { label: "결제 재시도", ...COMMON_ACTIONS.changePaymentMethod, fullWidth: false }],
	}

	const subscriptionCancelActions = {
		mypage: [commonActions.RESUBSCRIBE_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, commonActions.RESUBSCRIBE_ACTION],
		subscriptionDetail: [{...commonActions.SUBSCRIPTION_SCHEDULE_ACTION, fullWidth: false}, {...commonActions.RESUBSCRIBE_ACTION, label: '재구독 하기', fullWidth: false}],
	}

	const baseActionsForStatus = {
		RESERVED_PAYMENT: prePaymentActions,
		BEFORE_PAYMENT: prePaymentActions,
		PAYMENT_DONE: postPaymentActions,
		PRODUCING: inProductionActions,
		DELIVERY_READY: inProductionActions,
		DELIVERY_START: inProductionActions,
		DELIVERY_DONE: deliveryCompleteActions,
		CONFIRM: confirmationAction,
		SUBSCRIBE_PENDING: subscriptionHoldActions,
		SUBSCRIBE_WILL_CANCEL: subscriptionHoldActions,
		SUBSCRIBE_CANCEL: subscriptionCancelActions,
	}
	return baseActionsForStatus[status]?.[actionType] || [];
};