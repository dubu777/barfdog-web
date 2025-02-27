import { MembershipTier, Tier } from "@/types/membership";

const MEMBERSHIP_TIERS: Record<Tier, MembershipTier> =  {
	BRONZE: {
		tier: "BRONZE",
		tierKR: "브론즈",
		condition: "회원가입 완료 고객",
		description: '회원가입 축하 포인트 증정!',
		image: '/images/membership/bronze.png',
		benefits: ["회원가입 축하 포인트 증정!"],
	},
	SILVER: {
		tier: "SILVER",
		tierKR: "실버",
		condition: "정기배송 1회차 이상 진행 중 혹은 9만원 이상 결제 고객",
		description: '적립 0.5% 멤버십 할인 쿠폰',
		image: '/images/membership/silver.png',
		benefits: [
			"적립율 0.5%",
			"플래티넘 멤버십 할인쿠폰 매월 2건 증정",
		],
		subBenefits: [
			"1000원 일반결제 할인 쿠폰 증정 (2만원 이상 결제 시)"
		],
		minSubscription: 1,
		minPurchase: 90000,
	},
	GOLD: {
		tier: "GOLD",
		tierKR: "골드",
		condition: "정기배송 5회차 이상 진행 중 혹은 45만원 이상 결제 고객",
		description: '정기결제 할인 및 적립 1% 멤버십 할인 쿠폰',
		image: '/images/membership/gold.png',
		benefits: [
			"적립율 1%",
			"플래티넘 멤버십 할인쿠폰 매월 2건 증정",
		],
		subBenefits: [
			"1000원 일반결제 할인 쿠폰 증정 (2만원 이상 결제 시)",
			"2000원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)"
		],
		minSubscription: 5,
		minPurchase: 450000,
	},
	PLATINUM: {
		tier: "PLATINUM",
		tierKR: "플래티넘",
		condition: "정기배송 10회차 이상 진행 중 혹은 90만원 이상 결제 고객",
		description: '정기결제 할인 및 적립 1.5% 멤버십 할인 쿠폰',
		image: '/images/membership/platinum.png',
		benefits: [
			"적립율 1.5%",
			"플래티넘 멤버십 할인쿠폰 매월 3건 증정",
		],
		subBenefits: [
			"1000원 일반결제 할인 쿠폰 증정 (2만원 이상 결제 시)",
			"2000원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)",
			"2500원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)"
		],
		minSubscription: 10,
		minPurchase: 900000,
	},
	DIA: {
		tier: "DIA",
		tierKR: "다이아",
		condition: "정기배송 15회차 이상 진행 중 혹은 135만원 이상 결제 고객",
		description: '정기결제 할인 및 적립 2% 멤버십 할인 쿠폰',
		image: '/images/membership/dia.png',
		benefits: [
			"적립율 2%",
			"다이아 멤버십 할인쿠폰 매월 4건 증정",
		],
		subBenefits: [
			"1000원 일반결제 할인 쿠폰 증정 (2만원 이상 결제 시)",
			"2000원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)",
			"2500원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)",
			"3000원 일반결제 할인 쿠폰 증정 (4만원 이상 결제 시)"
		],
		minSubscription: 15,
		minPurchase: 1350000,
	},
	THE_BARF: {
		tier: "THE_BARF",
		tierKR: "더 바프",
		condition: "정기배송 25회차 이상 진행 중 혹은 255만원 이상 결제 고객",
		description: '정기결제 할인 및 적립 3% 멤버십 할인 쿠폰',
		image: '/images/membership/thebarf.png',
		benefits: [
			"적립율 3%",
			"다이아 멤버십 할인쿠폰 매월 5건 증정",
		],
		subBenefits: [
			"1000원 일반결제 할인 쿠폰 증정 (2만원 이상 결제 시)",
			"2000원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)",
			"2500원 일반결제 할인 쿠폰 증정 (3만원 이상 결제 시)",
			"3000원 일반결제 할인 쿠폰 증정 (4만원 이상 결제 시)",
			"4000원 일반결제 할인 쿠폰 증정 (5만원 이상 결제 시)"
		],
		minSubscription: 25,
		minPurchase: 2250000,
	}
} as const;

const MEMBERSHIP_TIERS_LIST: MembershipTier[] = Object.values(MEMBERSHIP_TIERS);


export { MEMBERSHIP_TIERS, MEMBERSHIP_TIERS_LIST };