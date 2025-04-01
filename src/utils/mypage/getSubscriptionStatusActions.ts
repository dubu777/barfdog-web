import { OrderAction, SubscriptionOrderStatus, VariantsType } from "@/types";
import { COMMON_ACTIONS } from "@/constants";

// SubscriptionCard status 상태별 actions 정의
export const getSubscriptionStatusActions = (
	status: SubscriptionOrderStatus,
	hasPostpone: boolean,
	actionType: 'mypage' | 'subscription' | 'subscriptionDetail'
): OrderAction[] => {

	const commonActions = {
		MYPAGE_POSTPONE_ACTIONS: [
			{ label: "전체구독일정", ...COMMON_ACTIONS.subscriptionSchedule },
			{ label: "식단변경", ...COMMON_ACTIONS.changeRecipe },
		],
		MYPAGE_PRODUCING_ACTIONS: [
			{ label: "배송조회", ...COMMON_ACTIONS.deliveryTracking },
			{ label: "식단상세", ...COMMON_ACTIONS.recipeDetail },
		],
		SUBSCRIPTION_BASE_ACTIONS: [
			{ label: "전체구독일정", ...COMMON_ACTIONS.subscriptionSchedule },
			{ label: "신청 정보 확인/변경", ...COMMON_ACTIONS.subscriptionDetail },
		],
		SUBSCRIPTION_DETAIL_BASE_ACTIONS: [
			{ label: "전체구독일정", ...COMMON_ACTIONS.subscriptionSchedule },
		],

		COUPON_ACTION: { label: "쿠폰사용", ...COMMON_ACTIONS.usingCoupon },
		CHANGE_RECIPE_ACTION: { label: "식단변경", ...COMMON_ACTIONS.changeRecipe },
		POSTPONE_SHIPPING_ACTION: { label: "배송 미루기", ...COMMON_ACTIONS.postponeShipping },
		DELIVERY_TRACKING_ACTION: { label: "배송조회", ...COMMON_ACTIONS.deliveryTracking },
		REVIEW_ACTION: { label: "리뷰작성", ...COMMON_ACTIONS.review },
		CONFIRM_ACTION: { label: "구매확정", ...COMMON_ACTIONS.confirm },
		RESUBSCRIBE_ACTION: { label: "재구독하고 최대 - 할인 혜택 받기", ...COMMON_ACTIONS.resubscribe },
		CHANGE_PAYMENT_METHOD_ACTION: { label: "결제 정보 수정", ...COMMON_ACTIONS.changePaymentMethod },
	};

	const prePaymentActions = {
		mypage: hasPostpone
			? [...commonActions.MYPAGE_POSTPONE_ACTIONS]
			: [commonActions.COUPON_ACTION, commonActions.CHANGE_RECIPE_ACTION],
		subscription: [
			...commonActions.SUBSCRIPTION_BASE_ACTIONS,
			{ label: "이번 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon, fullWidth: true, variants: 'solid' as VariantsType }
		],
		subscriptionDetail: [
			...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS,
			{ label: "결제 시 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon }
		],
	}

	const postPaymentActions = {
		mypage: hasPostpone
			? [...commonActions.MYPAGE_POSTPONE_ACTIONS]
			: [commonActions.POSTPONE_SHIPPING_ACTION, commonActions.CHANGE_RECIPE_ACTION],
		subscription: [
			...commonActions.SUBSCRIPTION_BASE_ACTIONS,
			{ label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon, fullWidth: true, variants: 'solid' as VariantsType }
		],
		subscriptionDetail: [
			...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS,
			{ label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon }
		],
	}

	const inProductionActions = {
		mypage: [...commonActions.MYPAGE_PRODUCING_ACTIONS],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, { label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon, fullWidth: true, variants: 'solid' as VariantsType }],
		subscriptionDetail: [...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS, { label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon }],
	}

	const deliveryCompleteActions = {
		mypage: [commonActions.DELIVERY_TRACKING_ACTION, commonActions.CONFIRM_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, { label: "구매 확정하러가기", ...COMMON_ACTIONS.confirm, fullWidth: true, variants: 'solid' as VariantsType }],
		subscriptionDetail: [
			...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS,
			{ label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon },
			{ label: "구매 확정하러가기", ...COMMON_ACTIONS.confirm, fullWidth: true, variants: 'solid' as VariantsType }
		],
	}

	const confirmationAction = {
		mypage: [commonActions.DELIVERY_TRACKING_ACTION, commonActions.REVIEW_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, { label: "리뷰 쓰러가기", ...COMMON_ACTIONS.review, fullWidth: true }],
		subscriptionDetail: [
			...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS,
			{ label: "다음 결제 쿠폰 사용", ...COMMON_ACTIONS.usingCoupon },
			{ label: "리뷰 쓰러가기", ...COMMON_ACTIONS.review, fullWidth: true }
		],
	}

	const subscriptionHoldActions = {
		mypage: [commonActions.CHANGE_PAYMENT_METHOD_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, { label: "결제 정보 수정", ...COMMON_ACTIONS.changePaymentMethod, fullWidth: true, variants: 'solid' as VariantsType }],
		subscriptionDetail: [...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS, { label: "결제 정보 수정", ...COMMON_ACTIONS.changePaymentMethod, variants: 'solid' as VariantsType, fullWidth: false }],
	}

	const subscriptionCancelActions = {
		mypage: [commonActions.RESUBSCRIBE_ACTION],
		subscription: [...commonActions.SUBSCRIPTION_BASE_ACTIONS, { label: "재구독하고 최대 - 할인 혜택 받기", ...COMMON_ACTIONS.resubscribe, fullWidth: true, variants: 'solid' as VariantsType }],
		subscriptionDetail: [...commonActions.SUBSCRIPTION_DETAIL_BASE_ACTIONS, { label: "재구독 하기", ...COMMON_ACTIONS.resubscribe, variants: 'solid' as VariantsType, fullWidth: false }],
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