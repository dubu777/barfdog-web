import { MenuList, OrderAction, OrderProgressInfo } from "@/types";

export { ORDER_PROGRESS, ORDER_STATUS_MESSAGES, ORDER_ACTIONS, MENU_LIST, SUBSCRIPTION_ORDER_ACTIONS };

const MENU_LIST: MenuList[] = [
	{
		category: "나의 쇼핑정보",
		menus: [
			{ label: "구독 상품 관리", url: "/my-subscription" },
			{ label: "주문 및 배송조회", url: "/mypage/order-history" },
			{ label: "취소/교환/반품 내역", url: "/returns" },
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
	BEFORE_PAYMENT: [
		{ label: "배송 미루기", url: "/mypage/subscription/delay-shipping" },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PAYMENT_DONE: [
		{ label: "배송 미루기", url: "/mypage/subscription/delay-shipping" },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PAYMENT_BEFORE_SKIP: [
		{ label: "전체구독일정", url: "/delay-shipping" },
		{ label: "식단변경", url: "/edit-meal" },
	],
	PAYMENT_AFTER_SKIP: [
		{ label: "전체구독일정", url: "/delay-shipping" },
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
		{ label: "구매 확정", url: "/confirm-purchase", variants: 'solid' },
	],
	CONFIRM: [
		{ label: "배송조회", url: "/track-shipping" },
		{ label: "리뷰 작성", url: "/mypage/review", variants: 'solid' },
	],
	SUBSCRIBE_PENDING: [
		{ label: "결제 정보 수정", url: "/edit-payment", variants: 'solid' },
	],
	SUBSCRIBE_CANCEL: [
		{ label: "재구독하고 최대 - 할인 혜택 받기", url: "/resubscribe", variants: 'solid' },
	],
};

// 마이페이지 구독관리 카드
const SUBSCRIPTION_ORDER_ACTIONS: Record<string, OrderAction[]> = {
	DELIVERY_DONE: [
		{ label: "구매 확정 하러가기", url: "/confirm-purchase", variants: 'solid' },
	],
	CONFIRM: [
		{ label: "리뷰 쓰러가기", url: "/mypage/review", variants: 'solid' },
	],
	SUBSCRIBE_PENDING: [
		{ label: "결제 정보 수정", url: "/edit-payment", variants: 'solid' },
	],
	SUBSCRIBE_CANCEL: [
		{ label: "재구독하고 최대 - 할인 혜택 받기", url: "/resubscribe", variants: 'solid' },
	],
};
