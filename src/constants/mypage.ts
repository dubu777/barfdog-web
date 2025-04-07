import {
	MenuList,
	OrderAction,
	OrderProgressInfo,
	SubscriptionOrderStatus,
} from "@/types";
import { formatDate } from "@/utils";

export {
	MENU_LIST,
	MYPAGE_DATE_FILTERS,
	MYPAGE_SORT_FILTERS,
	MYPAGE_ITEM_TYPE_FILTERS,
	ORDER_ISSUE_TYPE,
	ORDER_ISSUE_STATUS,
	SUBSCRIPTION_ORDER_PROGRESS,
	SUBSCRIPTION_ORDER_STATUS_LABEL,
	SUBSCRIPTION_ORDER_STATUS_MESSAGES,
	SUBSCRIPTION_ORDER_PROGRESS_BASE,
	SUBSCRIPTION_ORDER_STATUSES,
	COMMON_ACTIONS,
};

const MENU_LIST: MenuList[] = [
	{
		category: "나의 쇼핑정보",
		menus: [
			{ label: "구독 상품 관리", url: "/mypage/subscription" },
			{ label: "주문 및 배송조회", url: "/mypage/order-delivery-inquiry" },
			{ label: "취소/교환/반품 내역", url: "/mypage/order-issue-inquiry" },
			{ label: "결제 수단 관리", url: "/payment-methods" },
			{ label: "리뷰 작성 내역", url: "/mypage/review" },
		],
	},
	{
		category: "나의 회원정보",
		menus: [
			{ label: "계정 정보", url: "/mypage/account" },
			{ label: "반려견 정보", url: "/pet-info" },
			{ label: "배송지 관리", url: "/addresses" },
		],
	},
	{
		category: "고객센터",
		menus: [
			{ label: "공지사항", url: "/community/notices" },
			{ label: "자주 묻는 질문", url: "/community/faq" },
			{ label: "문의 내역", url: "/inquiries" },
		],
	},
	{
		category: "바프독",
		menus: [
			{ label: "ABOUT US", url: "/community/about" },
			{ label: "전 성분 보기", url: "/ingredients" },
		],
	},
];

const SUBSCRIPTION_ORDER_STATUSES = [
	'RESERVED_PAYMENT',
	'BEFORE_PAYMENT',
	'PAYMENT_DONE',
	'PRODUCING',
	'DELIVERY_READY',
	'DELIVERY_START',
	'DELIVERY_DONE',
	'CONFIRM',
	'SUBSCRIBE_PENDING',
	'SUBSCRIBE_WILL_CANCEL',
	'SUBSCRIBE_CANCEL',
] as const;

// SubscriptionCard 상단 label 정의
const SUBSCRIPTION_ORDER_STATUS_LABEL: Record<string, string> = {
	...Object.fromEntries(SUBSCRIPTION_ORDER_STATUSES.map(status => [status, '진행중'])),
	SUBSCRIBE_PENDING: '결제실패',
	SUBSCRIBE_WILL_CANCEL: '결제실패',
	SUBSCRIBE_CANCEL: '구독 해지',
}

// SubscriptionCard progressInfo progressbar 수치, label 정의
function getLabel(status: string) {
	const labels: Record<string, string> = {
		PAYMENT_DONE: "생산준비",
		PRODUCING: "생산중",
		DELIVERY_READY: "배송중",
		DELIVERY_START: "배송중",
	};
	return labels[status] ?? "";
}

const SUBSCRIPTION_ORDER_PROGRESS_BASE: Record<SubscriptionOrderStatus, Omit<OrderProgressInfo, 'label'>> = {
	RESERVED_PAYMENT: { progress: 0, statusText: { payment: '결제예정', delivery: '배송예정' } },
	BEFORE_PAYMENT: { progress: 0, statusText: { payment: '결제예정', delivery: '배송예정' } },
	PAYMENT_DONE: { progress: 25, statusText: { payment: '결제완료', delivery: '배송예정' } },
	PRODUCING: { progress: 50, statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_READY: { progress: 75, statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_START: { progress: 75, statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_DONE: { progress: 100, statusText: { payment: '결제예정', delivery: '배송완료' } },
	CONFIRM: { progress: 100, statusText: { payment: '결제예정', delivery: '배송완료' } },
	SUBSCRIBE_PENDING: { progress: 0, statusText: { payment: '결제실패', delivery: '' } },
	SUBSCRIBE_WILL_CANCEL: { progress: 0, statusText: { payment: '결제실패', delivery: '' } },
	SUBSCRIBE_CANCEL: { progress: 0, statusText: { payment: '구독시작', delivery: '구독해지' } },
}

const SUBSCRIPTION_ORDER_PROGRESS: Record<string, OrderProgressInfo> = {
	...Object.fromEntries(
		Object.entries(SUBSCRIPTION_ORDER_PROGRESS_BASE).map(
			([key, value]) => [key, { ...value, label: getLabel(key) }]
		)
	)
}

// SubscriptionCard progressInfo progress message 정의
function generateSubscriptionMessage(paymentDate: string, count: number) {
	return `${formatDate(paymentDate, 'onlyDateKR')} ${count}회차 정기구독이 시작될 예정입니다!`
}
const SUBSCRIPTION_ORDER_STATUS_MESSAGES: Record<string, (paymentDate: string, count: number) => string> = {
	SUBSCRIBING: generateSubscriptionMessage,
	RESERVED_PAYMENT: generateSubscriptionMessage,
	BEFORE_PAYMENT: generateSubscriptionMessage,
	DELIVERY_DONE: () => '맛있는 식사가 배송되었습니다! 구매 확정 후 리뷰를 작성해보세요!',
	CONFIRM: () => '상품은 어떠셨나요? 리뷰 작성하고 포인트 혜택을 받아보세요!',
	SUBSCRIBE_PENDING: () => '카드 정보를 수정해주세요. 2주 뒤 구독이 자동 해지됩니다.',
	SUBSCRIBE_WILL_CANCEL: () => '카드 정보를 수정해주세요. 2주 뒤 구독이 자동 해지됩니다.',
	SUBSCRIBE_CANCEL: () => '소중한 우리 아이의 영양관리를 위한 맞춤형 식단을 받아보세요!',
}

// SubscriptionCard, OrderCard actions 기능 정의
const COMMON_ACTIONS: Record<string, Omit<OrderAction, 'label'>> = {
	// 공통
	confirm: { id: 'confirm', variants: 'solid' },
	review: { id: 'review', url: "/mypage/review", variants: 'solid' },
	deliveryTracking: { id: 'deliveryTracking', url: "/delivery-tracking", variants: 'outline' },
	subscriptionDetail: { id: 'subscriptionDetail', url: "/subscription", variants: 'outline' },
	subscriptionSchedule: { id: 'subscriptionSchedule', url: "/subscription", params: '/schedule', variants: 'outline' },
	// SubscriptionCard
	changeRecipe: { id: 'changeRecipe', url: "/edit-meal", variants: 'outline' },
	usingCoupon: { id: 'usingCoupon', variants: 'outline' },
	postponeShipping: { id: 'postponeShipping', url: "/subscription", params: '/postpone-shipping', variants: 'outline' },
	recipeDetail: { id: 'recipeDetail', url: "/subscription", params: '/recipe-detail', variants: 'outline' },
	changePaymentMethod: { id: 'changePaymentMethod', fullWidth: true, variants: 'solid' },
	resubscribe: { id: 'resubscribe', fullWidth: true, variants: 'solid' },
	// OrderCard
	orderCancel: { id: 'orderCancel', variants: 'outline' },
	orderDetail: { id: 'orderDetail', url: "/order-delivery-inquiry", variants: 'outline' },
	itemDetail: { id: 'itemDetail', variants: 'outline' },
	refundExchange: { id: 'refundExchange', variants: 'outline' },
	repurchase: { id: 'repurchase', variants: 'outline' },
}

const ORDER_ISSUE_TYPE = {
	CANCEL: "취소",
	REFUND: "반품",
	EXCHANGE: "교환",
} as const;

const ORDER_ISSUE_STATUS = {
	REQUESTED: "신청",
	CANCEL_REQUEST: "신청",
	RETURN_REQUEST: "신청",
	EXCHANGE_REQUEST: "신청",
	PROGRESSING: "진행중",
	COMPLETED: "완료",
	CANCEL_DONE_SELLER: "완료",
	CANCEL_DONE_BUYER: "완료",
	RETURN_DONE_SELLER: "완료",
	RETURN_DONE_BUYER: "완료",
	EXCHANGE_DONE_BUYER: "완료",
	REJECTED: "미승인",
	FAILED: "미승인",
	FAILED_RESERVED_PAYMENT: "미승인",
} as const;

// 마이페이지 구독관리 필터 옵션
const MYPAGE_DATE_FILTERS = {
	"1M": "1개월 전",
	"3M": "3개월 전",
	"6M": "6개월 전",
	"1Y": "1년 전",
	"2Y": "2년 전",
	ALL: "전체기간",
} as const;

const MYPAGE_SORT_FILTERS = {
	latest: "최신순",
	oldest: "오래된순",
	lowPrice: "낮은가격순",
	highPrice: "높은가격순",
} as const;

const MYPAGE_ITEM_TYPE_FILTERS = {
	ALL: "전체유형",
	general: "일반배송",
	subscription: "정기배송",
} as const;
