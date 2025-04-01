import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import {Tier} from "@/types/membership";

export const getNextTierMessage = (currentTier: Tier, currentSubscription: number, currentPurchase: number): string => {
	const currentIndex = MEMBERSHIP_TIERS_LIST.findIndex(tier => tier.tier === currentTier);
	if (currentTier === -1 || currentIndex === MEMBERSHIP_TIERS_LIST.length - 1) {
		return '최고 등급입니다!';
	}

	const nextTier = MEMBERSHIP_TIERS_LIST[currentIndex + 1];

	if (!nextTier.minSubscription || !nextTier.minPurchase) return '조건 없음';

	const additionalSubscription = Math.max(0, nextTier.minSubscription - currentSubscription);
	const additionalPurchase = Math.max(0, nextTier.minPurchase - currentPurchase);

	if (additionalSubscription === 0 && additionalPurchase === 0) {
		return `${nextTier.tierKR} 등급을 달성했습니다!`;
	}

	return `${additionalSubscription > 0 ? `구독 ${additionalSubscription}회 추가 누적` : ''} ${additionalPurchase > 0 ? `혹은 ${additionalPurchase.toLocaleString()}원 추가 구매` : ""} 시 ${nextTier.tier} 달성!`.trim()
}