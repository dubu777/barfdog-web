import { MenuList, OrderAction, OrderProgressInfo } from "@/types";

export {
	ORDER_PROGRESS,
	ORDER_STATUS_MESSAGES,
	ORDER_ACTIONS, MENU_LIST,
	SUBSCRIPTION_ORDER_ACTIONS,
	MYPAGE_DATE_FILTERS,
	MYPAGE_SORT_FILTERS,
	MYPAGE_ITEM_TYPE_FILTERS,
	ORDER_DELIVERY_INQUIRY_STATUS,
	ORDER_ISSUE_TYPE,
	ORDER_ISSUE_STATUS,
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

// 마이페이지 메인 카드
const ORDER_PROGRESS: Record<string, OrderProgressInfo> = {
	BEFORE_PAYMENT: {
		progress: 0,
		statusText: { payment: '결제예정', delivery: '배송예정' } },
	PAYMENT_DONE: {
		label: "생산예정",
		progress: 25,
		statusText: { payment: '결제완료', delivery: '배송예정' } },
	PRODUCING: {
		label: "생산중",
		progress: 50,
		statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_READY: {
		label: "배송중",
		progress: 75,
		statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_START: {
		label: "배송중",
		progress: 75,
		statusText: { payment: '결제완료', delivery: '배송예정' } },
	DELIVERY_DONE: {
		progress: 100,
		statusText: { payment: '결제예정', delivery: '배송완료' } },
	CONFIRM: {
		progress: 100,
		statusText: { payment: '결제예정', delivery: '배송완료' } },
	SUBSCRIBE_PENDING: {
		progress: 0,
		statusText: { payment: '결제실패', delivery: '' } },
	SUBSCRIBE_CANCEL: {
		progress: 0,
		statusText: { payment: '구독시작', delivery: '구독해지' } },
} as const;


const ORDER_STATUS_MESSAGES: Record<string, (n: number) => string> = {
	BEFORE_PAYMENT: (n) => `${n}회차 정기구독이 시작될 예정입니다!`,
	DELIVERY_DONE: () => "맛있는 식사가 배송되었습니다! 구매 확정 후 리뷰를 작성해보세요!",
	CONFIRM: () => "상품은 어떠셨나요? 리뷰 작성하고 포인트 혜택을 받아보세요!",
	SUBSCRIBE_PENDING: () => "카드 정보를 수정해주세요. 2주 뒤 구독이 자동 해지됩니다.",
	SUBSCRIBE_CANCEL: () => "소중한 우리 아이의 영양관리를 위한 맞춤형 식단을 받아보세요!",
} as const;

// 식단 변경 -> 주문서 페이지
// 배송 미루기 -> 배송 미루기 페이지
const ORDER_ACTIONS: Record<string, OrderAction[]> = {
	PAYMENT_BEFORE_SKIP: [
		{ label: "전체구독일정", url: "/subscription", params: '/schedule' },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PAYMENT_AFTER_SKIP: [
		{ label: "전체구독일정", url: "/subscription", params: '/schedule' },
		{ label: "식단변경", url: "/edit-meal" },
	],
	BEFORE_PAYMENT: [
		{ label: "배송 미루기", url: "/subscription", params: '/delay-shipping' },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PAYMENT_DONE: [
		{ label: "배송 미루기", url: "/subscription", params: '/delay-shipping' },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PRODUCING: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "식단상세", url: "/meal-detail" },
	],
	DELIVERY_READY: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "식단상세", url: "/meal-detail" },
	],
	DELIVERY_START: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "식단상세", url: "/meal-detail" },
	],
	DELIVERY_DONE: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "구매확정", key: 'confirm', variants: 'solid' },
	],
	CONFIRM: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "리뷰 작성", url: "/mypage/review", variants: 'solid' },
	],
	고: [
		{ label: "결제 정보 수정", url: "/edit-payment", variants: 'solid', fullWidth: true  },
	],
	SUBSCRIBE_CANCEL: [
		{ label: "재구독하고 최대 - 할인 혜택 받기", url: "/resubscribe", variants: 'solid', fullWidth: true },
	],
};

// 마이페이지 구독관리 카드
const SUBSCRIPTION_ORDER_ACTIONS: Record<string, OrderAction[]> = {
	BEFORE_PAYMENT: [
		{ label: "이번 결제 쿠폰 사용", url: "/coupon", variants: 'solid', fullWidth: true },
	],
	DELIVERY_DONE: [
		{ label: "구매확정", key: 'confirm', variants: 'solid', fullWidth: true },
	],
	CONFIRM: [
		{ label: "리뷰 쓰러가기", url: "/review", variants: 'solid', fullWidth: true },
	],
	SUBSCRIBE_PENDING: [
		{ label: "결제 정보 수정", url: "/edit-payment", variants: 'solid', fullWidth: true },
	],
	SUBSCRIBE_CANCEL: [
		{ label: "재구독하고 최대 - 할인 혜택 받기", url: "/resubscribe", variants: 'solid', fullWidth: true },
	],
};

const ORDER_ISSUE_TYPE = {
	CANCEL: "취소",
	REFUND: "반품",
	EXCHANGE: "교환",
} as const;


const ORDER_ISSUE_STATUS = {
	REQUESTED: "신청",
	PROGRESSING: "진행중",
	COMPLETED: "완료",
	REJECTED: "미승인",
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

// 마이페이지 주문 배송
const ORDER_DELIVERY_INQUIRY_STATUS: Record<string, {label: string; actions: OrderAction[]}> = {
	BEFORE_PAYMENT: {
		label: "결제예정",
		actions: [
			{ label: "주문조회", url: "/order-delivery-inquiry", variants: 'outline' },
			{ label: "주문취소", key: 'cancel', variants: 'outline' },
		],
	},
	PAYMENT_DONE: {
		label: "결제완료",
		actions: [
			{ label: "주문조회", url: "/order-delivery-inquiry", variants: 'outline' },
			{ label: "주문취소", key: 'cancel', variants: 'outline' },
		],
	},
	PRODUCING: {
		label: "배송준비",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "반품/교환", key: 'refundExchange', variants: 'outline' },
		],
	},
	DELIVERY_READY: {
		label: "배송준비",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "반품/교환", key: 'refundExchange', variants: 'outline' },
		],
	},
	DELIVERY_START: {
		label: "배송중",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "반품/교환", key: 'refundExchange', variants: 'outline' },
		],
	},
	DELIVERY_DONE: {
		label: "배송완료",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "반품/교환", key: 'refundExchange', variants: 'outline' },
			{ label: "구매확정", key: 'confirm', variants: 'solid', fullWidth: true },
		],
	},
	CONFIRM: {
		label: "구매확정",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "리뷰작성", url: "/review", variants: 'solid' },
		],
	},
	REVIEW_SUBMIT: {
		label: "구매확정",
		actions: [
			{ label: "배송조회", url: "/", variants: 'outline' },
			{ label: "전체구독일정", url: "/subscription", params: '/schedule' },
		],
	},
} as const;