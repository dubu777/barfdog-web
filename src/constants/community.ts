import {ArticleCategory, FAQCategories, NoticeCategory} from "@/types";

export { ARTICLE_CATEGORY, NOTICE_CATEGORY, FAQ_CATEGORIES } ;

const ARTICLE_CATEGORY: Record<ArticleCategory, { label: string }> = {
	ALL: { label: '전체' },
	NUTRITION: { label: '영양' },
	HEALTH: { label: '건강' },
	LIFE: { label: '생애' },
}


const NOTICE_CATEGORY: Record<NoticeCategory, { label: string }> = {
	ALL: { label: '전체' },
	NOTICE: { label: '공지' },
	EVENT: { label: '이벤트' },
	POLICY: { label: '정책' },
}

const FAQ_CATEGORIES: FAQCategories = {
	DELIVERY: {
		label: "배송",
		subcategories: {
			SUBSCRIPTION: {
				label: "정기배송",
				items: [
					{ question: "정기배송 제품 출고일이 어떻게 되나요?", answer: "비밀입니다!!!" },
					{ question: "구독중 상품과 일반상품 묶음 배송이 가능한가요?", answer: "" },
					{ question: "배송일을 변경하고 싶어요", answer: "" },
					{ question: "배송을 잠시 미루고 싶어요", answer: "" },
				],
			},
			GENERAL: {
				label: "일반배송",
				items: [
					{ question: "일반 상품도 정기구독이 가능한가요?", answer: "" },
				],
			},
		},
	},
	ORDER_CANCEL: {
		label: "주문취소",
		subcategories: {
			COMMON: {
				label: "일반",
				items: [
					{ question: "정기구독 중간에 취소가 자유롭나요?", answer: "" },
					{ question: "주문 취소는 어떻게 하나요?", answer: "" },
					{ question: "이미 생산중인 생식 주문을 취소할 수 있나요?", answer: "" },
				],
			},
		},
	},
	EXCHANGE_RETURN: {
		label: "교환/반품",
		subcategories: {
			COMMON: {
				label: "일반",
				items: [
					{ question: "교환/ 반품이 자유롭나요?", answer: "" },
					{ question: "환불은 어떻게 이루어지나요?", answer: "" },
				],
			},
		},
	},
	SERVICE: {
		label: "서비스",
		subcategories: {
			MICROBIOLOGICAL_TEST: {
				label: "미생물 검사",
				items: [
					{ question: "미생물 검사 결과는 어디서 확인가능한가요?", answer: "" },
				],
			},
			INFO_UPDATE: {
				label: "정보 수정",
				items: [
					{ question: "반려견 정보를 수정하고 싶어요", answer: "" },
					{ question: "반려견의 레시피를 변경하고 싶어요", answer: "" },
					{ question: "레시피에 알러지 선택 항목이 반영되나요?", answer: "" },
				],
			},
		},
	},
	ORDER_PAYMENT: {
		label: "주문/결제",
		subcategories: {
			ORDER: {
				label: "주문",
				items: [
					{ question: "구독 전 몇 팩만 구매할 수 있나요?", answer: "" },
				],
			},
			GENERAL_DELIVERY: {
				label: "일반배송",
				items: [
					{ question: "구독 전 몇 팩만 구매할 수 있나요?", answer: "" },
				],
			},
		},
	},
	MEMBER_INFO: {
		label: "회원정보",
		subcategories: {
			LOGIN: {
				label: "로그인",
				items: [
					{ question: "아이디와 비밀번호가 기억나지 않아요", answer: "" },
					{ question: "비밀번호 변경은 어디서 하나요?", answer: "" },
					{ question: "휴대폰 번호를 변경하고 싶어요", answer: "" },
					{ question: "로그아웃 하고 싶어요", answer: "" },
					{ question: "다른 아이디로 재가입하고 싶어요", answer: "" },
				],
			},
			WITHDRAWAL_ETC: {
				label: "탈퇴/기타",
				items: [
					{ question: "회원 탈퇴는 어떻게 하나요?", answer: "" },
				],
			},
		},
	},
	PRODUCT: {
		label: "상품",
		subcategories: {
			SALARY_INQUIRY: {
				label: "급여문의",
				items: [
					{ question: "생식이 처음인데 괜찮을까요?", answer: "" },
					{ question: "고양이가 먹어도 괜찮을까요?", answer: "" },
					{ question: "실온보관했는데 먹어도 괜찮을까요?", answer: "" },
					{ question: "사료와 섞어 먹여도 되나요?", answer: "" },
					{ question: "성장기나 노견이 먹어도 되나요?", answer: "" },
					{ question: "장기급여해도 안전한가요?", answer: "" },
					{ question: "하루 급여량은 얼마인가요?", answer: "" },
					{ question: "급여 방법은 어디서 참고할 수 있나요?", answer: "" },
				],
			},
			PRODUCT_INQUIRY: {
				label: "제품문의",
				items: [
					{ question: "자연식이 무엇인가요?", answer: "" },
					{ question: "생식이 무엇인가요?", answer: "" },
					{ question: "왜 바프독으로 바꿔야 하나요?", answer: "" },
					{ question: "생식은 어떻게 보관하나요?", answer: "" },
					{ question: "화식은 어떻게 보관하나요?", answer: "" },
					{ question: "파우치째 해동해도 안전한가요?", answer: "" },
					{ question: "소분 보관은 어떻게 하나요?", answer: "" },
				],
			},
		},
	},
	BENEFIT: {
		label: "혜택",
		subcategories: {
			POINT: {
				label: "포인트",
				items: [
					{ question: "포인트를 확인하고 싶어요", answer: "" },
					{ question: "환불 시 포인트는 어떻게 반환되나요?", answer: "" },
					{ question: "구매시 사용 가능한 혜택은 어떤 것들이 있나요?", answer: "" },
				],
			},
			COUPON: {
				label: "쿠폰",
				items: [
					{ question: "쿠폰이 등록되지 않아요", answer: "" },
					{ question: "쿠폰은 어디서 등록하나요?", answer: "" },
				],
			},
		},
	},
};