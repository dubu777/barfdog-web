import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import { MembershipTier, NextTierRequirements, Tier } from "@/types/membership";

export const getNextTierRequirements = (currentTier: Tier, currentSubscription?: number, currentPurchase?: number): NextTierRequirements => {
	const currentIndex = MEMBERSHIP_TIERS_LIST.findIndex(tier => tier.tier === currentTier);
	let message = '';
	if (currentIndex === -1 || currentIndex === MEMBERSHIP_TIERS_LIST.length - 1) {
		message = '지정일마다 VIP 선물을 받을 수 있어요! 지금 혜택, 계속 누리세요 ★';
	}

	const nextTier = MEMBERSHIP_TIERS_LIST[currentIndex + 1] as MembershipTier;

	if (!nextTier.minSubscription || !nextTier.minPurchase) {
		message = '조건 없음';
	}

	const additionalSubscription = nextTier.minSubscription && Math.max(0, nextTier.minSubscription - (currentSubscription || 0));
	const additionalPurchase = nextTier.minPurchase && Math.max(0, nextTier.minPurchase - (currentPurchase || 0));

	if (additionalSubscription === 0 && additionalPurchase === 0) {
		message = `${nextTier.tierKR} 등급을 달성했습니다!`;
	}
	return {
		additionalSubscription: additionalSubscription || 0,
		additionalPurchase: additionalPurchase || 0,
		nextTier: nextTier.tier,
		message,
	}
}