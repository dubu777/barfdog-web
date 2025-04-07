export type { Tier, TierKR, MembershipTier, NextTierRequirements };

type Tier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIA' | 'THE_BARF';
type TierKR = '브론즈' | '실버' | '골드' | '플래티넘' | '다이아' | '더 바프';

interface MembershipTier {
	tier: Tier;
	tierKR: TierKR;
	condition: string;
	description: string;
	image: string;
	benefits: string[];
	subBenefits?: string[];
	minSubscription?: number;
	minPurchase?: number;
	subscriptionDiscount?: number;
}

interface NextTierRequirements {
	additionalSubscription: number;
	additionalPurchase: number;
	nextTier?: Tier;
}