import { CartInfo } from "@/types";

// 주문 요약 정보 계산
export const calculateSummary = (cartInfo: CartInfo) => {
	// 할인 금액 (discount),
	// 상품 총 금액 (productTotalPrice)
	// 배송비 (deliveryFee)
	// 최종 주문 금액 (totalOrderPrice)
	// 무료 배송 조건까지 필요한 금액 (diffDeliveryFee)
	const discount = cartInfo.basketDtoList.reduce(
		(sum, item) => sum + (item.itemDto.originalPrice - item.itemDto.salePrice) * item.itemDto.amount,
		0
	);
	const productTotalPrice = cartInfo.basketDtoList.reduce((sum, item) => sum + item.totalPrice, 0) + discount;
	const deliveryFee =
		productTotalPrice >= cartInfo.deliveryConstant.freeCondition
			? 0
			: cartInfo.deliveryConstant.price;
	const totalOrderPrice = productTotalPrice - discount + deliveryFee;
	const diffDeliveryFee =
		productTotalPrice >= cartInfo.deliveryConstant.freeCondition
			? 0
			: cartInfo.deliveryConstant.freeCondition - totalOrderPrice;

	return { productTotalPrice, discount, deliveryFee, totalOrderPrice, diffDeliveryFee };
}