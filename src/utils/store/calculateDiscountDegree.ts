import {DiscountType} from "@/types";

// 할인율 계산
export function calculateDiscountDegree(
	originalPrice: number,
	salePrice: number,
	discountType: DiscountType
) {

	if (discountType === 'FIXED_RATE') {
		return Math.ceil(Number(((1 - salePrice / originalPrice) * 100).toFixed(2)));
	} else {
		return originalPrice - salePrice;
	}
};
